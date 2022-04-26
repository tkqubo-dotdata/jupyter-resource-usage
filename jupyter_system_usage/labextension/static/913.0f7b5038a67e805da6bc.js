"use strict";(self.webpackChunk_jupyter_server_system_usage=self.webpackChunk_jupyter_server_system_usage||[]).push([[913],{913:(t,e,s)=>{s.r(e),s.d(e,{default:()=>I});var r=s(117),i=s(468),n=s(321),a=s(294),o=s(959),m=s(598),l=s(271),_=s.n(l);const u=(0,s(632).style)({fontSize:"var(--jp-ui-font-size1)",fontFamily:"var(--jp-ui-font-family)"},{backgroundColor:"#FFD2D2",color:"#D8000C"});class M extends n.VDomRenderer{constructor(t){super(new M.Model({refreshRate:5e3})),this.translator=t||i.nullTranslator,this._trans=this.translator.load("jupyterlab")}render(){if(!this.model)return _().createElement("div",null);let t;return t=null===this.model.memoryLimit?this._trans.__("Mem: %1 %2",this.model.currentMemory.toFixed(c.DECIMAL_PLACES),this.model.units):this._trans.__("Mem: %1 / %2 %3",this.model.currentMemory.toFixed(c.DECIMAL_PLACES),this.model.memoryLimit.toFixed(c.DECIMAL_PLACES),this.model.units),this.model.usageWarning?_().createElement(r.TextItem,{title:this._trans.__("Current memory usage"),source:t,className:u}):_().createElement(r.TextItem,{title:this._trans.__("Current memory usage"),source:t})}}var c;!function(t){class e extends n.VDomModel{constructor(t){super(),this._currentMemory=0,this._memoryLimit=null,this._metricsAvailable=!1,this._units="B",this._warn=!1,this._poll=new m.Poll({factory:()=>c.factory(),frequency:{interval:t.refreshRate,backoff:!0},name:"@jupyterlab/statusbar:MemoryUsage#metrics"}),this._poll.ticked.connect((t=>{const{payload:e,phase:s}=t.state;if("resolved"!==s){if("rejected"===s){const t=this._metricsAvailable;return this._metricsAvailable=!1,this._currentMemory=0,this._memoryLimit=null,this._units="B",void(t&&this.stateChanged.emit())}}else this._updateMetricsValues(e)}))}get metricsAvailable(){return this._metricsAvailable}get currentMemory(){return this._currentMemory}get memoryLimit(){return this._memoryLimit}get units(){return this._units}get usageWarning(){return this._warn}dispose(){super.dispose(),this._poll.dispose()}_updateMetricsValues(t){const e=this._metricsAvailable,s=this._currentMemory,r=this._memoryLimit,i=this._units,n=this._warn;if(null===t)this._metricsAvailable=!1,this._currentMemory=0,this._memoryLimit=null,this._units="B",this._warn=!1;else{const e=t.rss,s=t.limits.memory?t.limits.memory.rss:null,[r,i]=c.convertToLargestUnit(e),n=!!t.limits.memory&&t.limits.memory.warn;this._metricsAvailable=!0,this._currentMemory=r,this._units=i,this._memoryLimit=s?s/c.MEMORY_UNIT_LIMITS[i]:null,this._warn=n}this._currentMemory===s&&this._units===i&&this._memoryLimit===r&&this._metricsAvailable===e&&this._warn===n||this.stateChanged.emit(void 0)}}t.Model=e}(M||(M={})),function(t){t.DECIMAL_PLACES=2,t.MEMORY_UNIT_LIMITS={B:1,KB:1024,MB:1048576,GB:1073741824,TB:1099511627776,PB:0x4000000000000},t.convertToLargestUnit=function(e){return e<t.MEMORY_UNIT_LIMITS.KB?[e,"B"]:t.MEMORY_UNIT_LIMITS.KB===e||e<t.MEMORY_UNIT_LIMITS.MB?[e/t.MEMORY_UNIT_LIMITS.KB,"KB"]:t.MEMORY_UNIT_LIMITS.MB===e||e<t.MEMORY_UNIT_LIMITS.GB?[e/t.MEMORY_UNIT_LIMITS.MB,"MB"]:t.MEMORY_UNIT_LIMITS.GB===e||e<t.MEMORY_UNIT_LIMITS.TB?[e/t.MEMORY_UNIT_LIMITS.GB,"GB"]:t.MEMORY_UNIT_LIMITS.TB===e||e<t.MEMORY_UNIT_LIMITS.PB?[e/t.MEMORY_UNIT_LIMITS.TB,"TB"]:[e/t.MEMORY_UNIT_LIMITS.PB,"PB"]};const e=o.ServerConnection.makeSettings(),s=a.URLExt.join(e.baseUrl,"api/metrics/v1");t.factory=async function(){const t=o.ServerConnection.makeRequest(s,{},e),r=await t;return await r.json()}}(c||(c={}));const h={id:"@jupyter-server/system-usage:memory-status-item",autoStart:!0,requires:[r.IStatusBar,i.ITranslator],activate:(t,e,s)=>{const r=new M(s);e.registerStatusItem(h.id,{item:r,align:"left",rank:2,isActive:()=>r.model.metricsAvailable,activeStateChanged:r.model.stateChanged})}},I=h}}]);