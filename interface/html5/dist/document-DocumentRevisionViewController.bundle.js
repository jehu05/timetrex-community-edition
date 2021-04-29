(self.webpackChunktimetrex=self.webpackChunktimetrex||[]).push([["document-DocumentRevisionViewController"],{4120:(e,t,n)=>{"use strict";n.r(t),n.d(t,{"DocumentRevisionViewController":()=>i});class i extends BaseViewController{constructor(e={}){_.defaults(e,{el:"#document_revision_view_container"}),super(e)}init(e){this.edit_view_tpl="DocumentRevisionEditView.html",this.permission_id="document",this.viewId="DocumentRevision",this.script_name="DocumentRevisionView",this.table_name_key="document_revision",this.context_menu_name=$.i18n._("Revisions"),this.navigation_label=$.i18n._("Revision")+":",this.api=TTAPI.APIDocumentRevision,this.render(),this.sub_view_mode?this.buildContextMenu(!0):this.buildContextMenu(),this.sub_view_mode||this.initData()}getCustomContextMenuModel(){return{groups:{download:{label:$.i18n._("Download"),id:this.script_name+"download"}},exclude:[ContextMenuIconName.export_excel,ContextMenuIconName.mass_edit,ContextMenuIconName.copy],include:[{label:$.i18n._("Download"),id:ContextMenuIconName.download,group:"download",icon:Icons.download},{label:$.i18n._("View"),id:ContextMenuIconName.view_file,group:"download",icon:Icons.view}]}}setDefaultMenu(e){if(this.context_menu_array){Global.isSet(e)&&e||this.selectContextMenu(),this.setTotalDisplaySpan();for(var t=this.context_menu_array.length,n=this.getGridSelectIdArray().length,i=0;i<t;i++){var a=$(this.context_menu_array[i]),o=$(a.find(".ribbon-sub-menu-icon")).attr("id");switch(a.removeClass("invisible-image"),a.removeClass("disable-image"),o){case ContextMenuIconName.add:this.setDefaultMenuAddIcon(a,n);break;case ContextMenuIconName.edit:this.setDefaultMenuEditIcon(a,n);break;case ContextMenuIconName.view:this.setDefaultMenuViewIcon(a,n);break;case ContextMenuIconName.mass_edit:this.setDefaultMenuMassEditIcon(a,n);break;case ContextMenuIconName.copy:this.setDefaultMenuCopyIcon(a,n);break;case ContextMenuIconName.delete_icon:this.setDefaultMenuDeleteIcon(a,n);break;case ContextMenuIconName.delete_and_next:this.setDefaultMenuDeleteAndNextIcon(a,n);break;case ContextMenuIconName.save:this.setDefaultMenuSaveIcon(a,n);break;case ContextMenuIconName.save_and_next:this.setDefaultMenuSaveAndNextIcon(a,n);break;case ContextMenuIconName.save_and_continue:this.setDefaultMenuSaveAndContinueIcon(a,n);break;case ContextMenuIconName.save_and_new:this.setDefaultMenuSaveAndAddIcon(a,n);break;case ContextMenuIconName.save_and_copy:this.setDefaultMenuSaveAndCopyIcon(a,n);break;case ContextMenuIconName.copy_as_new:this.setDefaultMenuCopyAsNewIcon(a,n);break;case ContextMenuIconName.cancel:this.setDefaultMenuCancelIcon(a,n);break;case ContextMenuIconName.download:case ContextMenuIconName.view_file:this.setDefaultMenuDownIcon(a,n)}}this.setContextMenuGroupVisibility()}}setDefaultMenuDownIcon(e,t,n){1===t?e.removeClass("disable-image"):e.addClass("disable-image")}setEditMenu(){this.selectContextMenu();for(var e=this.context_menu_array.length,t=0;t<e;t++){var n=$(this.context_menu_array[t]),i=$(n.find(".ribbon-sub-menu-icon")).attr("id");if(n.removeClass("disable-image"),this.is_mass_editing)switch(i){case ContextMenuIconName.save:this.setEditMenuSaveIcon(n);break;case ContextMenuIconName.cancel:break;default:n.addClass("disable-image")}else switch(i){case ContextMenuIconName.add:this.setEditMenuAddIcon(n);break;case ContextMenuIconName.edit:this.setEditMenuEditIcon(n);break;case ContextMenuIconName.view:this.setEditMenuViewIcon(n);break;case ContextMenuIconName.mass_edit:this.setEditMenuMassEditIcon(n);break;case ContextMenuIconName.copy:this.setEditMenuCopyIcon(n);break;case ContextMenuIconName.delete_icon:this.setEditMenuDeleteIcon(n);break;case ContextMenuIconName.delete_and_next:this.setEditMenuDeleteAndNextIcon(n);break;case ContextMenuIconName.save:this.setEditMenuSaveIcon(n);break;case ContextMenuIconName.save_and_continue:this.setEditMenuSaveAndContinueIcon(n);break;case ContextMenuIconName.save_and_new:this.setEditMenuSaveAndAddIcon(n);break;case ContextMenuIconName.save_and_next:this.setEditMenuSaveAndNextIcon(n);break;case ContextMenuIconName.save_and_copy:this.setEditMenuSaveAndCopyIcon(n);break;case ContextMenuIconName.copy_as_new:this.setEditMenuCopyAndAddIcon(n);break;case ContextMenuIconName.cancel:break;case ContextMenuIconName.download:case ContextMenuIconName.view_file:this.setEditMenuDownloadIcon(n)}}this.setContextMenuGroupVisibility()}onCustomContextClick(e){switch(e){case ContextMenuIconName.download:this.onDownloadClick()}}onAddClick(){var e=this;if(this.setCurrentEditViewState("new"),e.openEditView(),this.sub_view_mode){if("document_id"===this.parent_key){var t=this.parent_value;e.api["get"+e.api.key_name+"DefaultData"](t,{onResult:function(t){e.onAddResult(t)}})}}else e.api["get"+e.api.key_name+"DefaultData"]({onResult:function(t){e.onAddResult(t)}})}setEditMenuDownloadIcon(e,t){this.current_edit_record&&this.current_edit_record.id||e.addClass("disable-image")}handleSaveResult(e,t){var n=!0===e.getResult()&&this.current_edit_record.id?this.current_edit_record.id:e.getResult(),i=this.file_browser.getValue();i?this.api.uploadFile(i,"object_type=document_revision&object_id="+n,{onResult:n=>{super[t](e)}}):super[t](e)}onSaveResult(e){return this.handleSaveResult(e,"onSaveResult")}onSaveAndContinueResult(e){return this.handleSaveResult(e,"onSaveAndContinueResult")}onSaveAndNewResult(e){return this.handleSaveResult(e,"onSaveAndNewResult")}onSaveAndCopyResult(e){return this.handleSaveResult(e,"onSaveAndCopyResult")}onCustomContextClick(e){switch(e){case ContextMenuIconName.download:case ContextMenuIconName.view_file:this.onDownloadClick()}}doFormIFrameCall(){var e=ServiceCaller.getURLByObjectType("file_download")+"&object_type=document&parent_id="+this.current_edit_record.document_id+"&object_id="+this.current_edit_record.id;Global.APIFileDownload(null,null,null,e)}onDownloadClick(){if(this.edit_view&&this.current_edit_record.id)this.doFormIFrameCall();else{var e,t={},n=this.getGridSelectIdArray();n.length>0&&(e=n[0]),t.filter_data={},t.filter_data.id=[e];var i=this.api["get"+this.api.key_name](t,{async:!1}).getResult();i||(i=[]),i=i[0],this.current_edit_record=i,this.doFormIFrameCall()}}buildEditViewUI(){super.buildEditViewUI();var e={"tab_revision":{"label":$.i18n._("Revision")}};this.setTabModel(e),this.navigation.AComboBox({api_class:TTAPI.APIDocumentRevision,id:this.script_name+"_navigation",allow_multiple_selection:!1,layout_name:"global_document_revison",navigation_mode:!0,show_search_inputs:!0}),this.setNavigation();var t=this.edit_view_tab.find("#tab_revision").find(".first-column");this.edit_view_tabs[0]=[],this.edit_view_tabs[0].push(t);var n=Global.loadWidgetByName(FormItemType.TEXT_INPUT);n.TTextInput({field:"revision",width:114}),this.addEditFieldToColumn($.i18n._("Revision"),n,t,""),n=Global.loadWidgetByName(FormItemType.FILE_BROWSER),this.file_browser=n.TImageBrowser({field:"",name:"filedata",accept_filter:"*"}),this.addEditFieldToColumn($.i18n._("File"),n,t,"",null,!1,!0),(n=Global.loadWidgetByName(FormItemType.TEXT_AREA)).TTextArea({field:"change_log"}),this.addEditFieldToColumn($.i18n._("Change Log"),n,t,"",null,!1,!0)}}i.loadSubView=function(e,t,n){Global.loadViewSource("DocumentRevision","SubDocumentRevisionView.html",(function(i){var a=_.template(i);Global.isSet(t)&&t(),Global.isSet(e)&&(e.html(a({})),Global.isSet(n)&&TTPromise.wait("BaseViewController","initialize",(function(){n(sub_document_revision_view_controller)})))}))}}}]);
//# sourceMappingURL=document-DocumentRevisionViewController.bundle.js.map?v=d57a71f76a80ded1bc09