(self.webpackChunktimetrex=self.webpackChunktimetrex||[]).push([["document-DocumentGroupViewController"],{1359:(e,t,n)=>{"use strict";n.r(t),n.d(t,{"DocumentGroupViewController":()=>o});class o extends BaseTreeViewController{constructor(e={}){_.defaults(e,{el:"#document_group_view_container",tree_mode:null,grid_table_name:null,grid_select_id_array:null}),super(e)}init(e){this.edit_view_tpl="DocumentGroupEditView.html",this.permission_id="document",this.viewId="DocumentGroup",this.script_name="DocumentGroupView",this.table_name_key="document_group",this.context_menu_name=$.i18n._("Document Groups"),this.grid_table_name=$.i18n._("Document Groups"),this.navigation_label=$.i18n._("Document Group")+":",this.tree_mode=!0,this.primary_tab_label=$.i18n._("Document Group"),this.primary_tab_key="tab_document_group",this.api=TTAPI.APIDocumentGroup,this.grid_select_id_array=[],this.render(),this.buildContextMenu(),this.initData(),this.setSelectRibbonMenuIfNecessary()}getCustomContextMenuModel(){return{exclude:[ContextMenuIconName.copy,ContextMenuIconName.mass_edit,ContextMenuIconName.delete_and_next,ContextMenuIconName.save_and_continue,ContextMenuIconName.save_and_next,ContextMenuIconName.export_excel],include:["default"]}}}}}]);
//# sourceMappingURL=document-DocumentGroupViewController.bundle.js.map?v=3ed272f479039cacec72