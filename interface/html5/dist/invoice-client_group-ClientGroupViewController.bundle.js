(self.webpackChunktimetrex=self.webpackChunktimetrex||[]).push([["invoice-client_group-ClientGroupViewController"],{6510:(e,t,n)=>{"use strict";n.r(t),n.d(t,{"ClientGroupViewController":()=>i});class i extends BaseTreeViewController{constructor(e={}){_.defaults(e,{el:"#client_group_view_container",tree_mode:null,grid_table_name:null,grid_select_id_array:null}),super(e)}init(e){this.edit_view_tpl="ClientGroupEditView.html",this.permission_id="client",this.viewId="ClientGroup",this.script_name="ClientGroupView",this.table_name_key="client_group",this.context_menu_name=$.i18n._("Client Groups"),this.grid_table_name=$.i18n._("Client Group"),this.navigation_label=$.i18n._("Client Group")+":",this.tree_mode=!0,this.primary_tab_label=$.i18n._("Client Group"),this.primary_tab_key="tab_client_group",this.api=TTAPI.APIClientGroup,this.grid_select_id_array=[],this.render(),this.buildContextMenu(),this.initData(),this.setSelectRibbonMenuIfNecessary()}getCustomContextMenuModel(){return{exclude:[ContextMenuIconName.copy,ContextMenuIconName.mass_edit,ContextMenuIconName.delete_and_next,ContextMenuIconName.save_and_continue,ContextMenuIconName.save_and_next,ContextMenuIconName.export_excel],include:[]}}}}}]);
//# sourceMappingURL=invoice-client_group-ClientGroupViewController.bundle.js.map?v=13bbbc483c4f9961e88d