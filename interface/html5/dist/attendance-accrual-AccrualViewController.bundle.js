(self.webpackChunktimetrex=self.webpackChunktimetrex||[]).push([["attendance-accrual-AccrualViewController"],{1629:(e,t,i)=>{"use strict";i.r(t),i.d(t,{"AccrualViewController":()=>a});class a extends BaseViewController{constructor(e={}){_.defaults(e,{el:"#accrual_view_container",type_array:null,user_group_api:null,user_group_array:null,user_type_array:null,system_type_array:null,delete_type_array:null,date_api:null,edit_enabled:!1,delete_enabled:!1,is_trigger_add:!1,sub_view_grid_data:null,hide_search_field:!1}),super(e)}init(e){this.edit_view_tpl="AccrualEditView.html",this.permission_id="accrual",this.viewId="Accrual",this.script_name="AccrualView",this.table_name_key="accrual",this.context_menu_name=$.i18n._("Accruals"),this.navigation_label=$.i18n._("Accrual")+":",this.api=TTAPI.APIAccrual,this.initPermission(),this.render(),this.sub_view_mode?this.buildContextMenu(!0):this.buildContextMenu(),this.sub_view_mode||this.initData(),this.setSelectRibbonMenuIfNecessary("Accrual"),TTPromise.resolve("AccrualViewController","init")}initPermission(){super.initPermission(),PermissionManager.validate(this.permission_id,"view")||PermissionManager.validate(this.permission_id,"view_child")?this.hide_search_field=!1:this.hide_search_field=!0}initOptions(){var e=this;this.initDropDownOption("user_type",null,null,(function(t){var i=t.getResult();e.user_type_array=i})),this.initDropDownOption("delete_type",null,null,(function(t){var i=t.getResult();e.delete_type_array=i})),this.initDropDownOption("type",null,null,(function(t){var i=t.getResult();e.system_type_array=i,!e.sub_view_mode&&e.basic_search_field_ui_dic.type_id&&e.basic_search_field_ui_dic.type_id.setSourceData(Global.buildRecordArray(i))})),TTAPI.APIUserGroup.getUserGroup("",!1,!1,{onResult:function(t){t=t.getResult(),t=Global.buildTreeRecord(t),!e.sub_view_mode&&e.basic_search_field_ui_dic.group_id&&e.basic_search_field_ui_dic.group_id.setSourceData(t),e.user_group_array=t}})}buildEditViewUI(){super.buildEditViewUI();var e={"tab_accrual":{"label":$.i18n._("Accrual")},"tab_audit":!0};this.setTabModel(e),this.navigation.AComboBox({api_class:TTAPI.APIAccrual,id:this.script_name+"_navigation",allow_multiple_selection:!1,layout_name:"global_accrual_accrual",navigation_mode:!0,show_search_inputs:!0}),this.setNavigation();var t,i=this.edit_view_tab.find("#tab_accrual").find(".first-column");if(this.edit_view_tabs[0]=[],this.edit_view_tabs[0].push(i),this.sub_view_mode)(t=Global.loadWidgetByName(FormItemType.TEXT)).TText({field:"full_name"}),this.addEditFieldToColumn($.i18n._("Employee"),t,i,"");else{(t=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({api_class:TTAPI.APIUser,allow_multiple_selection:!0,layout_name:"global_user",show_search_inputs:!0,set_empty:!0,field:"user_id"});var a={permission_section:"accrual"};t.setDefaultArgs(a),this.addEditFieldToColumn($.i18n._("Employee"),t,i,"")}this.sub_view_mode?((t=Global.loadWidgetByName(FormItemType.TEXT)).TText({field:"accrual_policy_account"}),this.addEditFieldToColumn($.i18n._("Accrual Account"),t,i)):((t=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({api_class:TTAPI.APIAccrualPolicyAccount,allow_multiple_selection:!1,layout_name:"global_accrual_policy_account",show_search_inputs:!0,set_empty:!0,field:"accrual_policy_account_id"}),this.addEditFieldToColumn($.i18n._("Accrual Account"),t,i)),(t=Global.loadWidgetByName(FormItemType.COMBO_BOX)).TComboBox({field:"type_id"}),t.setSourceData(this.user_type_array),this.addEditFieldToColumn($.i18n._("Type"),t,i),(t=Global.loadWidgetByName(FormItemType.TEXT_INPUT)).TTextInput({field:"amount",need_parser_sec:!0,mode:"time_unit"}),this.addEditFieldToColumn($.i18n._("Amount"),t,i,"",null),(t=Global.loadWidgetByName(FormItemType.DATE_PICKER)).TDatePicker({field:"time_stamp"}),this.addEditFieldToColumn($.i18n._("Date"),t,i,"",null),(t=Global.loadWidgetByName(FormItemType.TEXT_AREA)).TTextArea({field:"note"}),this.addEditFieldToColumn($.i18n._("Note"),t,i,"",null,null,!0)}buildSearchFields(){super.buildSearchFields();var e={permission_section:"accrual"};this.search_fields=[new SearchField({label:$.i18n._("Employee"),field:"user_id",in_column:1,default_args:e,layout_name:"global_user",api_class:TTAPI.APIUser,multiple:!0,basic_search:!this.hide_search_field,adv_search:!1,form_item_type:FormItemType.AWESOME_BOX}),new SearchField({label:$.i18n._("Accrual Account"),field:"accrual_policy_account_id",in_column:1,layout_name:"global_accrual_policy_account",api_class:TTAPI.APIAccrualPolicyAccount,multiple:!0,basic_search:!0,adv_search:!1,form_item_type:FormItemType.AWESOME_BOX}),new SearchField({label:$.i18n._("Type"),in_column:1,field:"type_id",multiple:!0,basic_search:!0,adv_search:!1,layout_name:"global_option_column",form_item_type:FormItemType.AWESOME_BOX}),new SearchField({label:$.i18n._("Group"),in_column:1,multiple:!0,field:"group_id",layout_name:"global_tree_column",tree_mode:!0,basic_search:!this.hide_search_field,adv_search:!1,form_item_type:FormItemType.AWESOME_BOX}),new SearchField({label:$.i18n._("Default Branch"),in_column:2,field:"default_branch_id",layout_name:"global_branch",api_class:TTAPI.APIBranch,multiple:!0,basic_search:!this.hide_search_field,adv_search:!1,form_item_type:FormItemType.AWESOME_BOX}),new SearchField({label:$.i18n._("Default Department"),in_column:2,field:"default_department_id",layout_name:"global_department",api_class:TTAPI.APIDepartment,multiple:!0,basic_search:!this.hide_search_field,adv_search:!1,form_item_type:FormItemType.AWESOME_BOX}),new SearchField({label:$.i18n._("Created By"),in_column:2,field:"created_by",layout_name:"global_user",api_class:TTAPI.APIUser,multiple:!0,basic_search:!this.hide_search_field,adv_search:!1,form_item_type:FormItemType.AWESOME_BOX}),new SearchField({label:$.i18n._("Updated By"),in_column:2,field:"updated_by",layout_name:"global_user",api_class:TTAPI.APIUser,multiple:!0,basic_search:!this.hide_search_field,adv_search:!1,form_item_type:FormItemType.AWESOME_BOX})]}setEditViewData(){if(this.is_viewing?this.edit_view_ui_dic.type_id.setSourceData(this.system_type_array):this.edit_view_ui_dic.type_id.setSourceData(this.user_type_array),super.setEditViewData(),!this.sub_view_mode){var e=this.edit_view_ui_dic.user_id;this.current_edit_record&&this.current_edit_record.id||this.is_mass_editing?e.setAllowMultipleSelection(!1):e.setAllowMultipleSelection(!0)}}uniformVariable(e){var t=[];if("array"===$.type(e.user_id)){if(0===e.user_id.length)return e.user_id=!1,e;for(var i in e.user_id){var a=Global.clone(e);a.user_id=e.user_id[i],t.push(a)}}return t.length>0&&(e=t),e}setCurrentEditRecordData(){for(var e in this.current_edit_record){var t=this.edit_view_ui_dic[e];if(Global.isSet(t))switch(e){case"full_name":this.current_edit_record.first_name&&t.setValue(this.current_edit_record.first_name+" "+this.current_edit_record.last_name);break;default:t.setValue(this.current_edit_record[e])}}this.collectUIDataToCurrentEditRecord(),this.setEditViewDataDone()}getFilterColumnsFromDisplayColumns(){var e={type_id:!0};return this.sub_view_mode&&(e.accrual_policy_account=!0,e.accrual_policy_account_id=!0,e.user_id=!0),this._getFilterColumnsFromDisplayColumns(e,!0)}onGridSelectAll(){this.edit_enabled=this.editEnabled(),this.delete_enabled=this.deleteEnabled(),this.setDefaultMenu()}deleteEnabled(){var e=this.getGridSelectIdArray();if(e.length>0)for(var t=e.length-1;t>=0;t--){var i=this.getRecordFromGridById(e[t]);if(Global.isSet(this.delete_type_array[i.type_id]))return!0}return!1}editEnabled(){var e=this.getGridSelectIdArray();if(e.length>0)for(var t=e.length-1;t>=0;t--){var i=this.getRecordFromGridById(e[t]);if(Global.isSet(this.user_type_array[i.type_id]))return!0}return!1}onGridSelectRow(){var e=this.getGridSelectIdArray();e.length>0&&(this.getRecordFromGridById(e[0]),this.edit_enabled=this.editEnabled(),this.delete_enabled=this.deleteEnabled()),this.setDefaultMenu()}setDefaultMenuEditIcon(e,t,i){this.editPermissionValidate(i)&&!this.edit_only_mode||e.addClass("invisible-image"),1===t&&this.editOwnerOrChildPermissionValidate(i)&&this.edit_enabled?e.removeClass("disable-image"):e.addClass("disable-image")}setDefaultMenuMassEditIcon(e,t,i){this.editPermissionValidate(i)&&!this.edit_only_mode||e.addClass("invisible-image"),t>1&&this.edit_enabled?e.removeClass("disable-image"):e.addClass("disable-image")}setDefaultMenuDeleteIcon(e,t,i){this.deletePermissionValidate(i)&&!this.edit_only_mode||e.addClass("invisible-image"),t>=1&&this.deleteOwnerOrChildPermissionValidate(i)&&this.delete_enabled?e.removeClass("disable-image"):e.addClass("disable-image")}setEditMenuEditIcon(e,t){this.editPermissionValidate(t)&&!this.edit_only_mode||e.addClass("invisible-image"),this.edit_enabled&&this.editOwnerOrChildPermissionValidate(t)?(e.removeClass("disable-image"),this.is_viewing||e.addClass("disable-image")):e.addClass("disable-image")}setEditMenuDeleteIcon(e,t){this.deletePermissionValidate(t)&&!this.edit_only_mode||e.addClass("invisible-image"),this.delete_enabled&&this.deleteOwnerOrChildPermissionValidate(t)?e.removeClass("disable-image"):e.addClass("disable-image")}setEditMenuDeleteAndNextIcon(e,t){this.deletePermissionValidate(t)&&!this.edit_only_mode||e.addClass("invisible-image"),this.delete_enabled&&this.deleteOwnerOrChildPermissionValidate(t)?e.removeClass("disable-image"):e.addClass("disable-image")}getCustomContextMenuModel(){return{exclude:[ContextMenuIconName.save_and_continue],include:[{label:$.i18n._("TimeSheet"),id:ContextMenuIconName.timesheet,group:"navigation",icon:Icons.timesheet},{label:$.i18n._("Import"),id:ContextMenuIconName.import_icon,group:"other",icon:Icons.import_icon,sort_order:8e3}]}}getGridSetup(){var e=this;return{container_selector:this.sub_view_mode?".edit-view-tab":".view",sub_grid_mode:this.sub_view_mode,onSelectRow:function(){e.onGridSelectRow()},onCellSelect:function(){e.onGridSelectRow()},onSelectAll:function(){e.onGridSelectAll()},ondblClickRow:function(t){e.onGridDblClickRow(t)},onRightClickRow:function(t){e.getGridSelectIdArray().indexOf(t)<0&&(e.grid.grid.resetSelection(),e.grid.grid.setSelection(t),e.onGridSelectRow())}}}onCustomContextClick(e){switch(e){case ContextMenuIconName.timesheet:this.onNavigationClick();break;case ContextMenuIconName.import_icon:this.onImportClick()}}onImportClick(){var e=this;IndexViewController.openWizard("ImportCSVWizard","Accrual",(function(){e.search()}))}setDefaultMenu(e){if(this.context_menu_array){Global.isSet(e)&&e||this.selectContextMenu(),this.setTotalDisplaySpan();for(var t=this.context_menu_array.length,i=this.getGridSelectIdArray().length,a=0;a<t;a++){var n=$(this.context_menu_array[a]),s=$(n.find(".ribbon-sub-menu-icon")).attr("id");switch(n.removeClass("invisible-image"),n.removeClass("disable-image"),s){case ContextMenuIconName.add:this.setDefaultMenuAddIcon(n,i);break;case ContextMenuIconName.edit:this.setDefaultMenuEditIcon(n,i);break;case ContextMenuIconName.view:this.setDefaultMenuViewIcon(n,i);break;case ContextMenuIconName.mass_edit:this.setDefaultMenuMassEditIcon(n,i);break;case ContextMenuIconName.copy:this.setDefaultMenuCopyIcon(n,i);break;case ContextMenuIconName.delete_icon:this.setDefaultMenuDeleteIcon(n,i);break;case ContextMenuIconName.delete_and_next:this.setDefaultMenuDeleteAndNextIcon(n,i);break;case ContextMenuIconName.save:this.setDefaultMenuSaveIcon(n,i);break;case ContextMenuIconName.save_and_next:this.setDefaultMenuSaveAndNextIcon(n,i);break;case ContextMenuIconName.save_and_new:this.setDefaultMenuSaveAndAddIcon(n,i);break;case ContextMenuIconName.save_and_copy:this.setDefaultMenuSaveAndCopyIcon(n,i);break;case ContextMenuIconName.copy_as_new:this.setDefaultMenuCopyAsNewIcon(n,i);break;case ContextMenuIconName.cancel:this.setDefaultMenuCancelIcon(n,i);break;case ContextMenuIconName.timesheet:this.setDefaultMenuViewIcon(n,i,"punch");break;case ContextMenuIconName.import_icon:this.setDefaultMenuImportIcon(n,i);break;case ContextMenuIconName.export_excel:this.setDefaultMenuExportIcon(n,i)}}this.setContextMenuGroupVisibility()}}setEditMenu(){this.selectContextMenu();for(var e=this.context_menu_array.length,t=0;t<e;t++){var i=$(this.context_menu_array[t]),a=$(i.find(".ribbon-sub-menu-icon")).attr("id");if(i.removeClass("disable-image"),this.is_mass_editing)switch(a){case ContextMenuIconName.save:this.setEditMenuSaveIcon(i);break;case ContextMenuIconName.cancel:break;default:i.addClass("disable-image")}else switch(a){case ContextMenuIconName.add:this.setEditMenuAddIcon(i);break;case ContextMenuIconName.edit:this.setEditMenuEditIcon(i);break;case ContextMenuIconName.view:this.setEditMenuViewIcon(i);break;case ContextMenuIconName.mass_edit:this.setEditMenuMassEditIcon(i);break;case ContextMenuIconName.copy:this.setEditMenuCopyIcon(i);break;case ContextMenuIconName.delete_icon:this.setEditMenuDeleteIcon(i);break;case ContextMenuIconName.delete_and_next:this.setEditMenuDeleteAndNextIcon(i);break;case ContextMenuIconName.save:this.setEditMenuSaveIcon(i);break;case ContextMenuIconName.save_and_new:this.setEditMenuSaveAndAddIcon(i);break;case ContextMenuIconName.save_and_next:this.setEditMenuSaveAndNextIcon(i);break;case ContextMenuIconName.save_and_copy:this.setEditMenuSaveAndCopyIcon(i);break;case ContextMenuIconName.copy_as_new:this.setEditMenuCopyAndAddIcon(i);break;case ContextMenuIconName.cancel:break;case ContextMenuIconName.timesheet:this.setDefaultMenuViewIcon(i,"punch");break;case ContextMenuIconName.export_excel:this.setDefaultMenuExportIcon(i)}}this.setContextMenuGroupVisibility()}onNavigationClick(){var e=this,t={filter_data:{}},i=this.sub_view_mode?$.i18n._("Accrual Balances"):$.i18n._("Accruals");if(Global.isSet(this.current_edit_record))t.user_id=this.current_edit_record.user_id,t.base_date=this.current_edit_record.time_stamp,Global.addViewTab(this.viewId,i,window.location.href),IndexViewController.goToView("TimeSheet",t);else{var a={},n=this.getGridSelectIdArray();if(n.length>0){var s=n[0];a.filter_data={},a.filter_data.id=[s],TTAPI.APIAccrual.getAccrual(a,{onResult:function(a){var n=a.getResult();n||(n=[]),n=n[0],t.user_id=n.user_id,t.base_date=n.time_stamp,Global.addViewTab(e.viewId,i,window.location.href),IndexViewController.goToView("TimeSheet",t)}})}}}getSubViewFilter(e){return this.parent_edit_record&&this.parent_edit_record.user_id&&this.parent_edit_record.accrual_policy_account_id&&(e.user_id=this.parent_edit_record.user_id,e.accrual_policy_account_id=this.parent_edit_record.accrual_policy_account_id),e}onAddResult(e){var t=this,i=e.getResult();i||(i=[]),i.company=LocalCacheData.current_company.name,t.sub_view_mode&&(i.user_id=t.parent_edit_record.user_id,i.first_name=t.parent_edit_record.first_name,i.last_name=t.parent_edit_record.last_name,i.accrual_policy_account_id=t.parent_edit_record.accrual_policy_account_id,i.accrual_policy_account=t.parent_edit_record.accrual_policy_account),t.current_edit_record=i,t.initEditView()}searchDone(){var e=this;if(Global.isSet(e.is_trigger_add)&&e.is_trigger_add&&(e.onAddClick(),e.is_trigger_add=!1),this.sub_view_mode){TTPromise.resolve("initSubAccrualView","init");var t=this.grid.getGridParam("data");(!Global.isArray(t)||t.length<1)&&(this.onCancelClick(),this.parent_view_controller&&this.parent_view_controller.search())}super.searchDone()}}a.loadView=function(){Global.loadViewSource("Accrual","AccrualView.html",(function(e){TTPromise.wait("BaseViewController","initialize",(function(){var t=_.template(e);Global.contentContainer().html(t({}))}))}))},a.loadSubView=function(e,t,i){Global.loadViewSource("Accrual","SubAccrualView.html",(function(a){var n=_.template(a);Global.isSet(t)&&t(),Global.isSet(e)&&(e.html(n({})),Global.isSet(i)&&(TTPromise.add("AccrualViewController","init"),TTPromise.wait("AccrualViewController","init",(function(){i(sub_accrual_view_controller)}))))}))}}}]);
//# sourceMappingURL=attendance-accrual-AccrualViewController.bundle.js.map?v=617a9db4addb17e3b6fd