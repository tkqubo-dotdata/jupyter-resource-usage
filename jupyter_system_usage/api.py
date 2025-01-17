import json
from concurrent.futures import ThreadPoolExecutor

import psutil
from jupyter_server.base.handlers import APIHandler
from tornado import web
from tornado.concurrent import run_on_executor

try:
    # Traitlets >= 4.3.3
    from traitlets import Callable
except ImportError:
    from .utils import Callable


class ApiHandler(APIHandler):
    executor = ThreadPoolExecutor(max_workers=5)

    @web.authenticated
    async def get(self):
        """
        Calculate and return current resource usage metrics
        """
        config = self.settings["jupyter_system_usage_display_config"]

        virtual_memory = psutil.virtual_memory()
        cur_process = psutil.Process()
        all_processes = [cur_process] + cur_process.children(recursive=True)

        # Get memory information
        rss = virtual_memory.used

        mem_limit = virtual_memory.total

        limits = {"memory": {"rss": mem_limit}}
        if mem_limit and config.mem_warning_threshold != 0:
            limits["memory"]["warn"] = (mem_limit - rss) < (
                mem_limit * config.mem_warning_threshold
            )

        metrics = {"rss": rss, "limits": limits}

        # Optionally get CPU information
        if config.track_cpu_percent:
            cpu_count = psutil.cpu_count()
            cpu_percent = await self._get_cpu_percent(all_processes)

            if config.cpu_limit != 0:
                limits["cpu"] = {"cpu": config.cpu_limit}
                if config.cpu_warning_threshold != 0:
                    limits["cpu"]["warn"] = (config.cpu_limit - cpu_percent) < (
                        config.cpu_limit * config.cpu_warning_threshold
                    )

            metrics.update(cpu_percent=cpu_percent, cpu_count=cpu_count)

        self.write(json.dumps(metrics))

    @run_on_executor
    def _get_cpu_percent(self, all_processes):
        def get_cpu_percent(p):
            try:
                return p.cpu_percent(interval=0.05)
            # Avoid littering logs with stack traces complaining
            # about dead processes having no CPU usage
            except:
                return 0

        return sum([get_cpu_percent(p) for p in all_processes])
