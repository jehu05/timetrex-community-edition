(self.webpackChunktimetrex=self.webpackChunktimetrex||[]).push([["attendance-job_item-JobItemGroupViewController"],{5677:(e,t,n)=>{"use strict";n.r(t),n.d(t,{"JobItemGroupViewController":()=>i});class i extends BaseTreeViewController{constructor(e={}){_.defaults(e,{el:"#job_item_group_view_container",tree_mode:null,grid_table_name:null,grid_select_id_array:null}),super(e)}init(e){this.edit_view_tpl="JobItemGroupEditView.html",this.permission_id="job_item",this.viewId="JobItemGroup",this.script_name="JobItemGroupView",this.table_name_key="job_item_group",this.context_menu_name=$.i18n._("Task Groups"),this.grid_table_name=$.i18n._("Task Group"),this.navigation_label=$.i18n._("Task Group")+":",this.tree_mode=!0,this.primary_tab_label=$.i18n._("Task Group"),this.primary_tab_key="tab_task_group",this.api=TTAPI.APIJobItemGroup,this.grid_select_id_array=[],this.render(),this.buildContextMenu(),this.initData(),this.setSelectRibbonMenuIfNecessary()}getCustomContextMenuModel(){return{exclude:[ContextMenuIconName.copy,ContextMenuIconName.mass_edit,ContextMenuIconName.delete_and_next,ContextMenuIconName.save_and_continue,ContextMenuIconName.save_and_next,ContextMenuIconName.export_excel],include:[]}}}}}]);
//# sourceMappingURL=attendance-job_item-JobItemGroupViewController.bundle.js.map?v=ad67d4b35899bc75a8ea