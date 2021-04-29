(self.webpackChunktimetrex=self.webpackChunktimetrex||[]).push([["developer_tools-GridTestViewController","filebrowser-TImage","filebrowser-TImageAdvBrowser"],{1469:()=>{!function(e){e.fn.TImage=function(t){Global.addCss("global/widgets/filebrowser/TImageBrowser.css");var i,a=e.extend({},e.fn.TImage.defaults,t);return this.clearErrorStyle=function(){},this.getField=function(){return i},this.getValue=function(){return null},this.setValue=function(e){if(e){var t=new Date;this.attr("src",e+"&t="+t.getTime())}else this.attr("src","")},this.each((function(){var t=e.meta?e.extend({},a,e(this).data()):a;i=t.field})),this},e.fn.TImage.defaults={},e(document).on("mouseover",".file-browser img",(function(t){var i=e(t.target).parents(".file-browser");if(!e(".file_browser_overlay")[0]&&1==e(t.target).attr("enable-delete")){var a=e(t.target).height(),r=(a-32)/2,s=e('<div class="file_browser_overlay"><img src="theme/default/images/delete-512.png" style="position:absolute;width:32px;height:32px;top:'+r+"px;left:"+r+'px;"></div>');s.css("position","absolute"),s.css("top","0px"),s.css("left","0"),s.css("cursor","pointer"),s.css("height",a+"px"),s.css("width","100%"),s.css("background","rgba(255,255,255,0.85)"),e(t.target).parents(".file-browser").append(s),e(document).on("click",".file_browser_overlay",(function(t){e(t.target).parent().find("img").attr("src");TAlertManager.showConfirmAlert(e.i18n._("This will permanently delete the image. Are you sure?"),"",(function(e){if(e){var t={type:"deleteClick",message:"Delete image clicked.",time:new Date};i.trigger(t)}}))})),e(document).on("mouseleave",".file-browser",(function(){(e(document).off("click",".file_browser_overlay"),e(".file_browser_overlay")[0])&&e(this).find(".file_browser_overlay").off().remove()}))}}))}(jQuery)},8243:()=>{!function(e){e.fn.TImageAdvBrowser=function(t){Global.addCss("global/widgets/filebrowser/TImageBrowser.css");var i,a,r,s=e.extend({},e.fn.TImageAdvBrowser.defaults,t),n=this,o="",l=177,d=42,h=null;return this.setEnable=function(e){e;var t=this.children().eq(1);e?t.show():t.hide()},this.clearErrorStyle=function(){},this.getField=function(){return i},this.getValue=function(){return r},this.setImage=function(e){if(!e)return a.attr("src",""),void a.hide();var t=new Date;a.hide(),a.attr("src",e+"&t="+t.getTime()+"&X-CSRF-Token="+getCookie("CSRF-Token")),a.css("height","auto"),a.css("width","auto")},this.onImageLoad=function(t){var i=e(t).height()>0?e(t).height():t.naturalHeight,a=e(t).width()>0?e(t).width():t.naturalWidth;i>d&&e(t).css("height",d),a>l&&(e(t).css("width",l),e(t).css("height","auto")),n.trigger("setSize"),i<5?e(t).hide():e(t).show()},this.setValue=function(e){e||(e="")},this.setEnableDelete=function(e){var t=n.find(".image");e?t.attr("enable-delete",1):t.removeAttr("enable-delete")},this.each((function(){var t=e.meta?e.extend({},s,e(this).data()):s;i=t.field;e(this).find("#upload_image").text(e.i18n._("Upload Image")),t.callBack&&(h=t.callBack),!1===t.show_browser&&e(this).children().eq(1).hide(),t.default_width>0&&(l=t.default_width),t.default_height>0&&(d=t.default_height),Global.isSet(t.name)&&t.name,Global.isSet(o)&&(o=t.accept_filter),Global.isSet(t.deleteImageHandler)&&n.find(".file-browser").on("deleteClick",(function(){t.deleteImageHandler()})),e(this).children().eq(1).bind("click",(function(){IndexViewController.openWizard("UserPhotoWizard",null,(function(e){h&&h(e),r=e}))})),(a=e(this).children().eq(0)).on("load",(function(){n.onImageLoad(this)})),a.hide()})),this},e.fn.TImageAdvBrowser.defaults={}}(jQuery)},5477:(e,t,i)=>{"use strict";i.r(t),i.d(t,{"GridTestViewController":()=>a});i(1469),i(8243);class a extends BaseViewController{constructor(e={}){_.defaults(e,{el:"#grid_test_view_container",user_api:null,user_group_api:null,company_api:null,user_id_array:null,grid_container_id:null}),super(e)}init(e){this.edit_view_tpl="GridTestEditView.html",this.permission_id="user",this.viewId="GridTest",this.script_name="GridTestView",this.table_name_key="grid_test",this.context_menu_name=$.i18n._("Grid Test"),this.navigation_label=$.i18n._("AwesomBox Test")+":",this.api=TTAPI.APIUser,this.select_company_id=LocalCacheData.getCurrentCompany().id,this.user_group_api=TTAPI.APIUserGroup,this.company_api=TTAPI.APICompany,this.user_id_array=[],this.edit_view_grid_array=[],this.grid_container_id=TTUUID.generateUUID(),this.render(),this.buildContextMenu(),this.initData()}setCurrentEditRecordData(){this.collectUIDataToCurrentEditRecord(),this.setEditViewDataDone()}clearEditViewData(){return!1}buildEditViewUI(){var e={"tab_employee":{"label":$.i18n._("AWESOMEBOX TESTING VIEW")}};this.setTabModel(e);var t=this.edit_view_tab.find("#tab_employee").find(".first-column");this.edit_view_tabs[0]=[],this.edit_view_tabs[0].push(t);var i=$('<div id="'+this.grid_container_id+'">');t.append(i);var a=this.addGrid(1);i.append(a),a.setData(this.getFakeData(1));a=this.addGrid(6,["column name","column name2","column name3","column name4","column name5","column name6"]);i.append(a),a.setData(this.getFakeData(6,!0));a=this.addGrid(12);i.append(a),a.setData(this.getFakeData(12));a=this.addGrid(40);i.append(a),a.setData(this.getFakeData(40));for(var r=0;r<this.edit_view_grid_array.length;r++)this.edit_view_grid_array[r].setGridColumnsWidth();TTPromise.resolve("Gridtest","init")}getGridSetup(){return{container_selector:".edit-view-tab",sub_grid_mode:!0,onResizeGrid:!0,onSelectRow:function(){},onCellSelect:function(){},onSelectAll:function(){},ondblClickRow:function(e){},onRightClickRow:function(e){},height:200}}addGrid(e,t){var i="test_grid_"+e;$("#"+this.grid_container_id).append($('<table id="'+i+'" >'));for(var a=[],r=0;r<e;r++){var s=(r+10).toString(36),n="Column "+s;t&&(n=t[r]),a.push({name:s,index:s,label:n,width:100,sortable:!1,title:!1})}var o=new TTGrid(i,this.getGridSetup(),a);return this.edit_view_grid_array.push(o),o}getFakeData(e,t){for(var i=[],a=0;a<4;a++){for(var r={},s=0;s<e;s++){var n=(s+10).toString(36);r[n]=t?TTUUID.generateUUID():"content"}i.push(r)}return i}buildSearchFields(){super.buildSearchFields(),this.search_fields=[]}getCustomContextMenuModel(){return{exclude:["default"],include:[ContextMenuIconName.edit,ContextMenuIconName.cancel]}}search(){var e=JSON.parse('[{"id":"11e85213-a799-d200-b041-123456abcdef","status":"Active","employee_number":100,"first_name":"Mr.","last_name":"FAKE","full_name":"Administrator, Mr.","home_phone":"471-438-3900","is_owner":true,"is_child":false},{"id":"11e85213-ad34-e0e0-8541-123456abcdef","status":"Active","employee_number":13,"first_name":"Tristen","last_name":"Braun","full_name":"FAKE Braun, Tristen","home_phone":"527-500-4852","is_owner":false,"is_child":true},{"id":"11e85213-af64-d0e0-9b00-123456abcdef","status":"Active","employee_number":20,"first_name":"Jane","last_name":"Doe","full_name":"FAKE Doe, Jane","home_phone":"477-443-9650","is_owner":false,"is_child":true},{"id":"11e85213-ac44-1830-9908-123456abcdef","status":"Active","employee_number":10,"first_name":"John","last_name":"Doe","full_name":"FAKE Doe, John","home_phone":"464-547-9452","is_owner":false,"is_child":true}]');this.user_id_array=e,e=this.processResultData(e),this.grid.setData(e),this.grid.setGridColumnsWidth(),this.current_edit_record=e[0],this.setCurrentEditViewState("edit"),TTPromise.add("Gridtest","init");var t=this;TTPromise.wait("Gridtest","init",(function(){t.initEditView()})),this.initEditViewUI(this.viewId,this.edit_view_tpl)}setEditViewDataDone(){var e=this;setTimeout((function(){e.setTabOVisibility(!0),$(".edit-view-tab-bar").css("opacity",1)}),2500)}}}}]);
//# sourceMappingURL=developer_tools-GridTestViewController.bundle.js.map?v=2d9f5af87a39101c8b2c