!function(t,e,i){var o=function(i,o){"use strict";var s=function(t,e){var o=this;if(!(!this instanceof s)){"undefined"==typeof e&&(e={}),i.fn.dataTable.camelToHungarian&&i.fn.dataTable.camelToHungarian(s.defaults,e);var l=i.fn.dataTable.Api?new i.fn.dataTable.Api(t).settings()[0]:t.fnSettings();this.s={dt:l,iTableColumns:l.aoColumns.length,aiOuterWidths:[],aiInnerWidths:[]},this.dom={scroller:null,header:null,body:null,footer:null,grid:{wrapper:null,dt:null,left:{wrapper:null,head:null,body:null,foot:null},right:{wrapper:null,head:null,body:null,foot:null}},clone:{left:{header:null,body:null,footer:null},right:{header:null,body:null,footer:null}}},l._oFixedColumns=this,l._bInitComplete?this._fnConstruct(e):l.oApi._fnCallbackReg(l,"aoInitComplete",function(){o._fnConstruct(e)},"FixedColumns")}};return s.prototype={fnUpdate:function(){this._fnDraw(!0)},fnRedrawLayout:function(){this._fnColCalc(),this._fnGridLayout(),this.fnUpdate()},fnRecalculateHeight:function(t){delete t._DTTC_iHeight,t.style.height="auto"},fnSetRowHeight:function(t,e){t.style.height=e+"px"},fnGetPosition:function(t){var e,o=this.s.dt.oInstance;if(i(t).parents(".DTFC_Cloned").length){if("tr"===t.nodeName.toLowerCase())return e=i(t).index(),o.fnGetPosition(i("tr",this.s.dt.nTBody)[e]);var s=i(t).index();e=i(t.parentNode).index();var l=o.fnGetPosition(i("tr",this.s.dt.nTBody)[e]);return[l,s,o.oApi._fnVisibleToColumnIndex(this.s.dt,s)]}return o.fnGetPosition(t)},_fnConstruct:function(o){var l=this;if("function"==typeof this.s.dt.oInstance.fnVersionCheck&&this.s.dt.oInstance.fnVersionCheck("1.8.0")===!0){if(""===this.s.dt.oScroll.sX)return void this.s.dt.oInstance.oApi._fnLog(this.s.dt,1,"FixedColumns is not needed (no x-scrolling in DataTables enabled), so no action will be taken. Use 'FixedHeader' for column fixing when scrolling is not enabled");this.s=i.extend(!0,this.s,s.defaults,o);var n=this.s.dt.oClasses;this.dom.grid.dt=i(this.s.dt.nTable).parents("div."+n.sScrollWrapper)[0],this.dom.scroller=i("div."+n.sScrollBody,this.dom.grid.dt)[0],this._fnColCalc(),this._fnGridSetup();var r;i(this.dom.scroller).on("mouseover.DTFC touchstart.DTFC",function(){r="main"}).on("scroll.DTFC",function(){"main"===r&&(l.s.iLeftColumns>0&&(l.dom.grid.left.liner.scrollTop=l.dom.scroller.scrollTop),l.s.iRightColumns>0&&(l.dom.grid.right.liner.scrollTop=l.dom.scroller.scrollTop))});var d="onwheel"in e.createElement("div")?"wheel.DTFC":"mousewheel.DTFC";l.s.iLeftColumns>0&&i(l.dom.grid.left.liner).on("mouseover.DTFC touchstart.DTFC",function(){r="left"}).on("scroll.DTFC",function(){"left"===r&&(l.dom.scroller.scrollTop=l.dom.grid.left.liner.scrollTop,l.s.iRightColumns>0&&(l.dom.grid.right.liner.scrollTop=l.dom.grid.left.liner.scrollTop))}).on(d,function(t){var e="wheel"===t.type?-t.originalEvent.deltaX:t.originalEvent.wheelDeltaX;l.dom.scroller.scrollLeft-=e}),l.s.iRightColumns>0&&i(l.dom.grid.right.liner).on("mouseover.DTFC touchstart.DTFC",function(){r="right"}).on("scroll.DTFC",function(){"right"===r&&(l.dom.scroller.scrollTop=l.dom.grid.right.liner.scrollTop,l.s.iLeftColumns>0&&(l.dom.grid.left.liner.scrollTop=l.dom.grid.right.liner.scrollTop))}).on(d,function(t){var e="wheel"===t.type?-t.originalEvent.deltaX:t.originalEvent.wheelDeltaX;l.dom.scroller.scrollLeft-=e}),i(t).on("resize.DTFC",function(){l._fnGridLayout.call(l)});var h=!0,a=i(this.s.dt.nTable);a.on("draw.dt.DTFC",function(){l._fnDraw.call(l,h),h=!1}).on("column-sizing.dt.DTFC",function(){l._fnColCalc(),l._fnGridLayout(l)}).on("column-visibility.dt.DTFC",function(){l._fnColCalc(),l._fnGridLayout(l),l._fnDraw(!0)}).on("destroy.dt.DTFC",function(){a.off("column-sizing.dt.DTFC destroy.dt.DTFC draw.dt.DTFC"),i(l.dom.scroller).off("scroll.DTFC mouseover.DTFC"),i(t).off("resize.DTFC"),i(l.dom.grid.left.liner).off("scroll.DTFC mouseover.DTFC "+d),i(l.dom.grid.left.wrapper).remove(),i(l.dom.grid.right.liner).off("scroll.DTFC mouseover.DTFC "+d),i(l.dom.grid.right.wrapper).remove()}),this._fnGridLayout(),this.s.dt.oInstance.fnDraw(!1)}},_fnColCalc:function(){var t=this,e=0,o=0;this.s.aiInnerWidths=[],this.s.aiOuterWidths=[],i.each(this.s.dt.aoColumns,function(s,l){var n,r=i(l.nTh);if(r.filter(":visible").length){var d=r.outerWidth();0===t.s.aiOuterWidths.length&&(n=i(t.s.dt.nTable).css("border-left-width"),d+="string"==typeof n?1:parseInt(n,10)),t.s.aiOuterWidths.length===t.s.dt.aoColumns.length-1&&(n=i(t.s.dt.nTable).css("border-right-width"),d+="string"==typeof n?1:parseInt(n,10)),t.s.aiOuterWidths.push(d),t.s.aiInnerWidths.push(r.width()),s<t.s.iLeftColumns&&(e+=d),t.s.iTableColumns-t.s.iRightColumns<=s&&(o+=d)}else t.s.aiInnerWidths.push(0),t.s.aiOuterWidths.push(0)}),this.s.iLeftWidth=e,this.s.iRightWidth=o},_fnGridSetup:function(){var t,e=this._fnDTOverflow();this.dom.body=this.s.dt.nTable,this.dom.header=this.s.dt.nTHead.parentNode,this.dom.header.parentNode.parentNode.style.position="relative";var o=i('<div class="DTFC_ScrollWrapper" style="position:relative; clear:both;"><div class="DTFC_LeftWrapper" style="position:absolute; top:0; left:0;"><div class="DTFC_LeftHeadWrapper" style="position:relative; top:0; left:0; overflow:hidden;"></div><div class="DTFC_LeftBodyWrapper" style="position:relative; top:0; left:0; overflow:hidden;"><div class="DTFC_LeftBodyLiner" style="position:relative; top:0; left:0; overflow-y:scroll;"></div></div><div class="DTFC_LeftFootWrapper" style="position:relative; top:0; left:0; overflow:hidden;"></div></div><div class="DTFC_RightWrapper" style="position:absolute; top:0; left:0;"><div class="DTFC_RightHeadWrapper" style="position:relative; top:0; left:0;"><div class="DTFC_RightHeadBlocker DTFC_Blocker" style="position:absolute; top:0; bottom:0;"></div></div><div class="DTFC_RightBodyWrapper" style="position:relative; top:0; left:0; overflow:hidden;"><div class="DTFC_RightBodyLiner" style="position:relative; top:0; left:0; overflow-y:scroll;"></div></div><div class="DTFC_RightFootWrapper" style="position:relative; top:0; left:0;"><div class="DTFC_RightFootBlocker DTFC_Blocker" style="position:absolute; top:0; bottom:0;"></div></div></div></div>')[0],s=o.childNodes[0],l=o.childNodes[1];this.dom.grid.dt.parentNode.insertBefore(o,this.dom.grid.dt),o.appendChild(this.dom.grid.dt),this.dom.grid.wrapper=o,this.s.iLeftColumns>0&&(this.dom.grid.left.wrapper=s,this.dom.grid.left.head=s.childNodes[0],this.dom.grid.left.body=s.childNodes[1],this.dom.grid.left.liner=i("div.DTFC_LeftBodyLiner",o)[0],o.appendChild(s)),this.s.iRightColumns>0&&(this.dom.grid.right.wrapper=l,this.dom.grid.right.head=l.childNodes[0],this.dom.grid.right.body=l.childNodes[1],this.dom.grid.right.liner=i("div.DTFC_RightBodyLiner",o)[0],t=i("div.DTFC_RightHeadBlocker",o)[0],t.style.width=e.bar+"px",t.style.right=-e.bar+"px",this.dom.grid.right.headBlock=t,t=i("div.DTFC_RightFootBlocker",o)[0],t.style.width=e.bar+"px",t.style.right=-e.bar+"px",this.dom.grid.right.footBlock=t,o.appendChild(l)),this.s.dt.nTFoot&&(this.dom.footer=this.s.dt.nTFoot.parentNode,this.s.iLeftColumns>0&&(this.dom.grid.left.foot=s.childNodes[2]),this.s.iRightColumns>0&&(this.dom.grid.right.foot=l.childNodes[2]))},_fnGridLayout:function(){var t,e=this.dom.grid,o=i(e.wrapper).width(),s=i(this.s.dt.nTable.parentNode).outerHeight(),l=i(this.s.dt.nTable.parentNode.parentNode).outerHeight(),n=this._fnDTOverflow(),r=this.s.iLeftWidth,d=this.s.iRightWidth;n.x&&(s-=n.bar),e.wrapper.style.height=l+"px",this.s.iLeftColumns>0&&(e.left.wrapper.style.width=r+"px",e.left.wrapper.style.height="1px",e.left.body.style.height=s+"px",e.left.foot&&(e.left.foot.style.top=(n.x?n.bar:0)+"px"),e.left.liner.style.width=r+n.bar+"px",e.left.liner.style.height=s+"px"),this.s.iRightColumns>0&&(t=o-d,n.y&&(t-=n.bar),e.right.wrapper.style.width=d+"px",e.right.wrapper.style.left=t+"px",e.right.wrapper.style.height="1px",e.right.body.style.height=s+"px",e.right.foot&&(e.right.foot.style.top=(n.x?n.bar:0)+"px"),e.right.liner.style.width=d+n.bar+"px",e.right.liner.style.height=s+"px",e.right.headBlock.style.display=n.y?"block":"none",e.right.footBlock.style.display=n.y?"block":"none")},_fnDTOverflow:function(){var t=this.s.dt.nTable,e=t.parentNode,i={x:!1,y:!1,bar:this.s.dt.oScroll.iBarWidth};return t.offsetWidth>e.clientWidth&&(i.x=!0),t.offsetHeight>e.clientHeight&&(i.y=!0),i},_fnDraw:function(t){this._fnGridLayout(),this._fnCloneLeft(t),this._fnCloneRight(t),null!==this.s.fnDrawCallback&&this.s.fnDrawCallback.call(this,this.dom.clone.left,this.dom.clone.right),i(this).trigger("draw.dtfc",{leftClone:this.dom.clone.left,rightClone:this.dom.clone.right})},_fnCloneRight:function(t){if(!(this.s.iRightColumns<=0)){var e,i=[];for(e=this.s.iTableColumns-this.s.iRightColumns;e<this.s.iTableColumns;e++)this.s.dt.aoColumns[e].bVisible&&i.push(e);this._fnClone(this.dom.clone.right,this.dom.grid.right,i,t)}},_fnCloneLeft:function(t){if(!(this.s.iLeftColumns<=0)){var e,i=[];for(e=0;e<this.s.iLeftColumns;e++)this.s.dt.aoColumns[e].bVisible&&i.push(e);this._fnClone(this.dom.clone.left,this.dom.grid.left,i,t)}},_fnCopyLayout:function(t,e){for(var o=[],s=[],l=[],n=0,r=t.length;n<r;n++){var d=[];d.nTr=i(t[n].nTr).clone(!0,!0)[0];for(var h=0,a=this.s.iTableColumns;h<a;h++)if(i.inArray(h,e)!==-1){var f=i.inArray(t[n][h].cell,l);if(f===-1){var p=i(t[n][h].cell).clone(!0,!0)[0];s.push(p),l.push(t[n][h].cell),d.push({cell:p,unique:t[n][h].unique})}else d.push({cell:s[f],unique:t[n][h].unique})}o.push(d)}return o},_fnClone:function(t,e,o,s){var l,n,r,d,h,a,f,p,c,u,g=this;if(s){for(null!==t.header&&t.header.parentNode.removeChild(t.header),t.header=i(this.dom.header).clone(!0,!0)[0],t.header.className+=" DTFC_Cloned",t.header.style.width="100%",e.head.appendChild(t.header),p=this._fnCopyLayout(this.s.dt.aoHeader,o),c=i(">thead",t.header),c.empty(),l=0,n=p.length;l<n;l++)c[0].appendChild(p[l].nTr);this.s.dt.oApi._fnDrawHead(this.s.dt,p,!0)}else for(p=this._fnCopyLayout(this.s.dt.aoHeader,o),u=[],this.s.dt.oApi._fnDetectHeader(u,i(">thead",t.header)[0]),l=0,n=p.length;l<n;l++)for(r=0,d=p[l].length;r<d;r++)u[l][r].cell.className=p[l][r].cell.className,i("span.DataTables_sort_icon",u[l][r].cell).each(function(){this.className=i("span.DataTables_sort_icon",p[l][r].cell)[0].className});this._fnEqualiseHeights("thead",this.dom.header,t.header),"auto"==this.s.sHeightMatch&&i(">tbody>tr",g.dom.body).css("height","auto"),null!==t.body&&(t.body.parentNode.removeChild(t.body),t.body=null),t.body=i(this.dom.body).clone(!0)[0],t.body.className+=" DTFC_Cloned",t.body.style.paddingBottom=this.s.dt.oScroll.iBarWidth+"px",t.body.style.marginBottom=2*this.s.dt.oScroll.iBarWidth+"px",null!==t.body.getAttribute("id")&&t.body.removeAttribute("id"),i(">thead>tr",t.body).empty(),i(">tfoot",t.body).remove();var m=i("tbody",t.body)[0];if(i(m).empty(),this.s.dt.aiDisplay.length>0){var y=i(">thead>tr",t.body)[0];for(f=0;f<o.length;f++){h=o[f],a=i(this.s.dt.aoColumns[h].nTh).clone(!0)[0],a.innerHTML="";var C=a.style;C.paddingTop="0",C.paddingBottom="0",C.borderTopWidth="0",C.borderBottomWidth="0",C.height=0,C.width=g.s.aiInnerWidths[h]+"px",y.appendChild(a)}i(">tbody>tr",g.dom.body).each(function(t){var e=this.cloneNode(!1);e.removeAttribute("id");var s=g.s.dt.oFeatures.bServerSide===!1?g.s.dt.aiDisplay[g.s.dt._iDisplayStart+t]:t;for(f=0;f<o.length;f++){var l=g.s.dt.aoData[s].anCells||g.s.dt.oApi._fnGetTdNodes(g.s.dt,s);h=o[f],l.length>0&&(a=i(l[h]).clone(!0,!0)[0],e.appendChild(a))}m.appendChild(e)})}else i(">tbody>tr",g.dom.body).each(function(t){a=this.cloneNode(!0),a.className+=" DTFC_NoData",i("td",a).html(""),m.appendChild(a)});if(t.body.style.width="100%",t.body.style.margin="0",t.body.style.padding="0",s&&"undefined"!=typeof this.s.dt.oScroller&&e.liner.appendChild(this.s.dt.oScroller.dom.force.cloneNode(!0)),e.liner.appendChild(t.body),this._fnEqualiseHeights("tbody",g.dom.body,t.body),null!==this.s.dt.nTFoot){if(s){null!==t.footer&&t.footer.parentNode.removeChild(t.footer),t.footer=i(this.dom.footer).clone(!0,!0)[0],t.footer.className+=" DTFC_Cloned",t.footer.style.width="100%",e.foot.appendChild(t.footer),p=this._fnCopyLayout(this.s.dt.aoFooter,o);var T=i(">tfoot",t.footer);for(T.empty(),l=0,n=p.length;l<n;l++)T[0].appendChild(p[l].nTr);this.s.dt.oApi._fnDrawHead(this.s.dt,p,!0)}else{p=this._fnCopyLayout(this.s.dt.aoFooter,o);var v=[];for(this.s.dt.oApi._fnDetectHeader(v,i(">tfoot",t.footer)[0]),l=0,n=p.length;l<n;l++)for(r=0,d=p[l].length;r<d;r++)v[l][r].cell.className=p[l][r].cell.className}this._fnEqualiseHeights("tfoot",this.dom.footer,t.footer)}var b=this.s.dt.oApi._fnGetUniqueThs(this.s.dt,i(">thead",t.header)[0]);i(b).each(function(t){h=o[t],this.style.width=g.s.aiInnerWidths[h]+"px"}),null!==g.s.dt.nTFoot&&(b=this.s.dt.oApi._fnGetUniqueThs(this.s.dt,i(">tfoot",t.footer)[0]),i(b).each(function(t){h=o[t],this.style.width=g.s.aiInnerWidths[h]+"px"}))},_fnGetTrNodes:function(t){for(var e=[],i=0,o=t.childNodes.length;i<o;i++)"TR"==t.childNodes[i].nodeName.toUpperCase()&&e.push(t.childNodes[i]);return e},_fnEqualiseHeights:function(t,e,o){if("none"!=this.s.sHeightMatch||"thead"===t||"tfoot"===t){var s,l,n,r,d,h=e.getElementsByTagName(t)[0],a=o.getElementsByTagName(t)[0],f=i(">"+t+">tr:eq(0)",e).children(":first"),p=(f.outerHeight()-f.height(),this._fnGetTrNodes(h)),c=this._fnGetTrNodes(a),u=[];for(s=0,l=c.length;s<l;s++)r=p[s].offsetHeight,d=c[s].offsetHeight,n=d>r?d:r,"semiauto"==this.s.sHeightMatch&&(p[s]._DTTC_iHeight=n),u.push(n);for(s=0,l=c.length;s<l;s++)c[s].style.height=u[s]+"px",p[s].style.height=u[s]+"px"}}},s.defaults={iLeftColumns:1,iRightColumns:0,fnDrawCallback:null,sHeightMatch:"semiauto"},s.version="3.0.2",i.fn.dataTable.FixedColumns=s,i.fn.DataTable.FixedColumns=s,s};"function"==typeof define&&define.amd?define(["jquery","datatables"],o):"object"==typeof exports?o(require("jquery"),require("datatables")):jQuery&&!jQuery.fn.dataTable.FixedColumns&&o(jQuery,jQuery.fn.dataTable)}(window,document);