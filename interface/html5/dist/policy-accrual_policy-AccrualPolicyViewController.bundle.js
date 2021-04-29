(self.webpackChunktimetrex=self.webpackChunktimetrex||[]).push([["policy-accrual_policy-AccrualPolicyViewController"],{5594:(e,i,t)=>{"use strict";t.r(i),t.d(i,{"AccrualPolicyViewController":()=>a});class a extends BaseViewController{constructor(e={}){_.defaults(e,{el:"#accrual_policy_view_container",type_array:null,apply_frequency_array:null,month_of_year_array:null,day_of_month_array:null,day_of_week_array:null,month_of_quarter_array:null,length_of_service_unit_array:null,date_api:null,accrual_policy_milestone_api:null,accrual_policy_user_modifier_api:null,sub_accrual_policy_user_modifier_view_controller:null}),super(e)}init(e){this.edit_view_tpl="AccrualPolicyEditView.html",this.permission_id="accrual_policy",this.viewId="AccrualPolicy",this.script_name="AccrualPolicyView",this.table_name_key="accrual_policy",this.context_menu_name=$.i18n._("Accrual Policy"),this.navigation_label=$.i18n._("Accrual Policy")+":",this.api=TTAPI.APIAccrualPolicy,this.date_api=TTAPI.APITTDate,this.accrual_policy_milestone_api=TTAPI.APIAccrualPolicyMilestone,this.accrual_policy_user_modifier_api=TTAPI.APIAccrualPolicyUserModifier,this.month_of_quarter_array=Global.buildRecordArray({1:1,2:2,3:3}),this.render(),this.buildContextMenu(),this.initData(),this.setSelectRibbonMenuIfNecessary("AccrualPolicy")}onCustomContextClick(e){switch(e){case ContextMenuIconName.re_calculate_accrual:this.onReCalAccrualClick()}}onReCalAccrualClick(){var e={},i=this;this.edit_view?e.accrual_policy_id=[this.current_edit_record.id]:e.accrual_policy_id=this.getGridSelectIdArray(),IndexViewController.openWizard("ReCalculateAccrualWizard",e,(function(){i.search()}))}getCustomContextMenuModel(){return{exclude:[],include:[{label:$.i18n._("ReCalculate<br>Accrual"),id:ContextMenuIconName.re_calculate_accrual,group:"other",icon:Icons.re_cal_timesheet,permission_result:!0,permission:null}]}}initOptions(){var e=this;this.initDropDownOption("type"),this.initDropDownOption("apply_frequency"),this.initDropDownOption("length_of_service_unit","length_of_service_unit_id",this.accrual_policy_milestone_api),this.date_api.getMonthOfYearArray({onResult:function(i){i=i.getResult(),e.month_of_year_array=i}}),this.date_api.getDayOfMonthArray({onResult:function(i){i=i.getResult(),e.day_of_month_array=i}}),this.date_api.getDayOfWeekArray({onResult:function(i){i=i.getResult(),e.day_of_week_array=i}})}setDefaultMenu(e){if(this.context_menu_array){super.setDefaultMenu(e);for(var i=this.context_menu_array.length,t=this.getGridSelectIdArray().length,a=0;a<i;a++){var l=$(this.context_menu_array[a]);switch($(l.find(".ribbon-sub-menu-icon")).attr("id")){case ContextMenuIconName.re_calculate_accrual:this.setDefaultMenuReCalAccrualWizardIcon(l,t)}}this.setContextMenuGroupVisibility()}}setEditMenu(){super.setEditMenu();for(var e=this.context_menu_array.length,i=0;i<e;i++){var t=$(this.context_menu_array[i]);switch($(t.find(".ribbon-sub-menu-icon")).attr("id")){case ContextMenuIconName.re_calculate_accrual:this.setEditMenuReCalAccrualWizardIcon(t)}}this.setContextMenuGroupVisibility()}setEditMenuReCalAccrualWizardIcon(e){PermissionManager.validate("accrual_policy","enabled")&&(PermissionManager.validate("accrual_policy","edit")||PermissionManager.validate("accrual_policy","edit_child")||PermissionManager.validate("accrual_policy","edit_own"))?e.removeClass("invisible-image"):e.addClass("invisible-image"),this.current_edit_record.id?e.removeClass("disable-image"):e.addClass("disable-image")}setDefaultMenuReCalAccrualWizardIcon(e,i){PermissionManager.validate("accrual_policy","enabled")&&(PermissionManager.validate("accrual_policy","edit")||PermissionManager.validate("accrual_policy","edit_child")||PermissionManager.validate("accrual_policy","edit_own"))?e.removeClass("invisible-image"):e.addClass("invisible-image"),i>=1?e.removeClass("disable-image"):e.addClass("disable-image")}buildEditViewUI(){super.buildEditViewUI();var e=this,i={"tab_accrual_policy":{"label":$.i18n._("Accrual Policy")},"tab_length_of_service_milestones":{"label":$.i18n._("Length Of Service Milestones")},"tab_employee_settings":{"label":$.i18n._("Employee Settings"),"init_callback":"initSubAccrualPolicyUserModifier","display_on_mass_edit":!1},"tab_audit":!0};this.setTabModel(i),this.navigation.AComboBox({api_class:TTAPI.APIAccrualPolicy,id:this.script_name+"_navigation",allow_multiple_selection:!1,layout_name:"global_accrual",navigation_mode:!0,show_search_inputs:!0}),this.setNavigation();var t,a,l,r=this.edit_view_tab.find("#tab_accrual_policy"),o=this.edit_view_tab.find("#tab_length_of_service_milestones"),_=r.find(".first-column"),n=o.find(".first-column");this.edit_view_tabs[0]=[],this.edit_view_tabs[0].push(_),(t=Global.loadWidgetByName(FormItemType.TEXT_INPUT)).TTextInput({field:"name",width:"100%"}),this.addEditFieldToColumn($.i18n._("Name"),t,_,""),t.parent().width("45%"),(t=Global.loadWidgetByName(FormItemType.TEXT_AREA)).TTextArea({field:"description",width:"100%"}),this.addEditFieldToColumn($.i18n._("Description"),t,_,"",null,null,!0),t.parent().width("45%"),(t=Global.loadWidgetByName(FormItemType.COMBO_BOX)).TComboBox({field:"type_id",set_empty:!1}),t.setSourceData(e.type_array),this.addEditFieldToColumn($.i18n._("Type"),t,_),(t=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({api_class:TTAPI.APIContributingShiftPolicy,allow_multiple_selection:!1,layout_name:"global_contributing_shift_policy",show_search_inputs:!0,set_empty:!0,set_default:!0,field:"contributing_shift_policy_id"}),this.addEditFieldToColumn($.i18n._("Contributing Shift Policy"),t,_,"",null,!0),(t=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({api_class:TTAPI.APIAccrualPolicyAccount,allow_multiple_selection:!1,layout_name:"global_accrual_policy_account",show_search_inputs:!0,set_empty:!0,set_default:!0,field:"accrual_policy_account_id"}),this.addEditFieldToColumn($.i18n._("Accrual Account"),t,_),(t=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({api_class:TTAPI.APIContributingPayCodePolicy,allow_multiple_selection:!1,layout_name:"global_contributing_pay_code_policy",show_search_inputs:!0,set_empty:!0,set_default:!0,field:"length_of_service_contributing_pay_code_policy_id"}),this.addEditFieldToColumn($.i18n._("Length Of Service Hours Based On"),t,n,"",null,!0),(t=Global.loadWidgetByName(FormItemType.SEPARATED_BOX)).SeparatedBox({label:$.i18n._("Milestone Rollover Based On")}),this.addEditFieldToColumn(null,t,_,"",null,!0,!1,"separated_2"),(t=Global.loadWidgetByName(FormItemType.CHECKBOX)).TCheckbox({field:"milestone_rollover_hire_date"}),this.addEditFieldToColumn($.i18n._("Employee's Hire Date"),t,_,"",null,!0),(t=Global.loadWidgetByName(FormItemType.COMBO_BOX)).TComboBox({field:"milestone_rollover_month"}),t.setSourceData(e.month_of_year_array),this.addEditFieldToColumn($.i18n._("Month"),t,_,"",null,!0),(t=Global.loadWidgetByName(FormItemType.COMBO_BOX)).TComboBox({field:"milestone_rollover_day_of_month"}),t.setSourceData(e.day_of_month_array),this.addEditFieldToColumn($.i18n._("Day of Month"),t,_,"",null,!0);var s=r.find(".second-column");this.edit_view_tabs[0].push(s),(t=Global.loadWidgetByName(FormItemType.SEPARATED_BOX)).SeparatedBox({label:$.i18n._("Frequency In Which To Apply Time to Employee Records")}),this.addEditFieldToColumn(null,t,s,"",null,!0,!1,"separated_1"),(t=Global.loadWidgetByName(FormItemType.COMBO_BOX)).TComboBox({field:"apply_frequency_id",set_empty:!1}),t.setSourceData(e.apply_frequency_array),this.addEditFieldToColumn($.i18n._("Frequency"),t,s,"",null,!0),(t=Global.loadWidgetByName(FormItemType.CHECKBOX)).TCheckbox({field:"apply_frequency_hire_date"}),this.addEditFieldToColumn($.i18n._("Employee's Hire Date"),t,s,"",null,!0),(t=Global.loadWidgetByName(FormItemType.COMBO_BOX)).TComboBox({field:"apply_frequency_month"}),t.setSourceData(e.month_of_year_array),this.addEditFieldToColumn($.i18n._("Month"),t,s,"",null,!0),(t=Global.loadWidgetByName(FormItemType.COMBO_BOX)).TComboBox({field:"apply_frequency_day_of_month"}),t.setSourceData(e.day_of_month_array),this.addEditFieldToColumn($.i18n._("Day of Month"),t,s,"",null,!0),(t=Global.loadWidgetByName(FormItemType.COMBO_BOX)).TComboBox({field:"apply_frequency_day_of_week"}),t.setSourceData($.extend({},e.day_of_week_array)),this.addEditFieldToColumn($.i18n._("Day Of Week"),t,s,"",null,!0),(t=Global.loadWidgetByName(FormItemType.COMBO_BOX)).TComboBox({field:"apply_frequency_quarter_month",set_empty:!1}),t.setSourceData(e.month_of_quarter_array),this.addEditFieldToColumn($.i18n._("Month of Quarter"),t,s,"",null,!0),(t=Global.loadWidgetByName(FormItemType.TEXT_INPUT)).TTextInput({field:"minimum_employed_days",width:30}),this.addEditFieldToColumn($.i18n._("After Minimum Employed Days"),t,s,"",null,!0),(t=Global.loadWidgetByName(FormItemType.CHECKBOX)).TCheckbox({field:"enable_opening_balance"}),a=$("<div class='widget-h-box'></div>"),l=$("<span class='widget-right-label'> "+$.i18n._("(Applies Initial Accrual Amount on Hire Date)")+"</span>"),a.append(t),a.append(l),this.addEditFieldToColumn($.i18n._("Enable Opening Balance"),t,s,"",a,!0),(t=Global.loadWidgetByName(FormItemType.CHECKBOX)).TCheckbox({field:"enable_pro_rate_initial_period"}),a=$("<div class='widget-h-box'></div>"),l=$("<span class='widget-right-label'> "+$.i18n._("(Based on Hire Date)")+"</span>"),a.append(t),a.append(l),this.addEditFieldToColumn($.i18n._("Prorate Initial Accrual Amount"),t,s,"",a,!0);var d=(o=this.edit_view_tab.find("#tab_length_of_service_milestones")).find(".inside-editor-div"),c={length_of_service:$.i18n._("Length Of Service"),accrual_rate:$.i18n._("Accrual Rate/Year"),accrual_total_maximum:$.i18n._("Accrual Maximum Balance"),annual_maximum_rollover:$.i18n._("Annual Maximum Rollover"),annual_maximum_time:$.i18n._("Annual Accrual Maximum")};this.editor=Global.loadWidgetByName(FormItemType.INSIDE_EDITOR),this.editor.InsideEditor({addRow:this.insideEditorAddRow,removeRow:this.insideEditorRemoveRow,getValue:this.insideEditorGetValue,setValue:this.insideEditorSetValue,render:"views/policy/accrual_policy/AccrualPolicyInsideEditorRender.html",render_args:c,row_render:"views/policy/accrual_policy/AccrualPolicyInsideEditorRow.html",parent_controller:this}),d.append(this.editor)}onMilestoneRolloverHireDate(){!0===this.current_edit_record.milestone_rollover_hire_date?(this.detachElement("milestone_rollover_month"),this.detachElement("milestone_rollover_day_of_month")):!1===this.current_edit_record.milestone_rollover_hire_date&&(this.attachElement("milestone_rollover_month"),this.attachElement("milestone_rollover_day_of_month")),this.editFieldResize()}onApplyFrequencyHireDate(){20==this.current_edit_record.apply_frequency_id&&(this.attachElement("apply_frequency_hire_date"),!0===this.current_edit_record.apply_frequency_hire_date?(this.detachElement("apply_frequency_month"),this.detachElement("apply_frequency_day_of_month")):(this.attachElement("apply_frequency_month"),this.attachElement("apply_frequency_day_of_month")),this.editFieldResize())}onApplyFrequencyChange(e){Global.isSet(e)||(Global.isSet(this.current_edit_record.apply_frequency_id)||(this.current_edit_record.apply_frequency_id=10),e=this.current_edit_record.apply_frequency_id),this.detachElement("apply_frequency_hire_date"),this.detachElement("apply_frequency_month"),this.detachElement("apply_frequency_day_of_month"),this.detachElement("apply_frequency_day_of_week"),this.detachElement("apply_frequency_quarter_month"),20==e?this.onApplyFrequencyHireDate():30==e?this.attachElement("apply_frequency_day_of_month"):40==e?this.attachElement("apply_frequency_day_of_week"):25==e&&(this.attachElement("apply_frequency_day_of_month"),this.attachElement("apply_frequency_quarter_month")),this.editFieldResize()}onTypeChange(){Global.isSet(this.current_edit_record.type_id)||(this.current_edit_record.type_id=20),20==this.current_edit_record.type_id?(this.is_mass_editing||($(this.edit_view_tab.find("ul li")[1]).show(),$(this.edit_view_tab.find("ul li")[2]).show()),this.edit_view_tab.find("#tab_accrual_policy").find(".second-column").css("display","block"),this.edit_view_tab.find("#tab_accrual_policy").find(".first-column").removeClass("full-width-column"),this.attachElement("separated_1"),this.attachElement("apply_frequency_id"),this.attachElement("minimum_employed_days"),this.detachElement("contributing_shift_policy_id"),this.attachElement("enable_opening_balance"),this.attachElement("enable_pro_rate_initial_period"),this.onApplyFrequencyChange(),this.onApplyFrequencyHireDate()):30==this.current_edit_record.type_id&&(this.is_mass_editing||($(this.edit_view_tab.find("ul li")[1]).show(),$(this.edit_view_tab.find("ul li")[2]).show()),this.edit_view_tab.find("#tab_accrual_policy").find(".second-column").css("display","block"),this.edit_view_tab.find("#tab_accrual_policy").find(".first-column").removeClass("full-width-column"),this.attachElement("contributing_shift_policy_id"),this.attachElement("separated_1"),this.attachElement("minimum_employed_days"),this.detachElement("enable_opening_balance"),this.detachElement("enable_pro_rate_initial_period"),this.detachElement("apply_frequency_id"),this.onApplyFrequencyChange(!1)),this.editFieldResize(),this.setAccrualRageFormat()}setAccrualRageFormat(e){for(var i=this.editor.rows_widgets_array.length,t=0;t<i;t++){var a=this.editor.rows_widgets_array[t];30==this.current_edit_record.type_id?(a.accrual_rate_hourly.show(),a.accrual_rate_yearly.hide()):(a.accrual_rate_yearly.show(),a.accrual_rate_hourly.hide())}var l=$(".inside-editor-render").children().eq(0).children().eq(0).children().eq(1);30==this.current_edit_record.type_id?(l.text($.i18n._("Accrual Rate/Hour")),$(".annual-maximum-time-td").show()):(l.text($.i18n._("Accrual Rate/Year")),$(".annual-maximum-time-td").hide())}onFormItemChange(e,i){this.setIsChanged(e),this.setMassEditingFieldsWhenFormChange(e);var t=e.getField(),a=e.getValue();this.current_edit_record[t]=a,"type_id"===t&&this.onTypeChange(),"apply_frequency_id"===t&&this.onApplyFrequencyChange(),"apply_frequency_hire_date"===t&&this.onApplyFrequencyHireDate(),"milestone_rollover_hire_date"===t&&this.onMilestoneRolloverHireDate(),i||this.validate()}isDisplayLengthOfServiceHoursBasedOn(){for(var e=this.editor.rows_widgets_array.length,i=0,t=0;t<e;t++){50==this.editor.rows_widgets_array[t].length_of_service_unit_id.getValue()&&i++}0===i?(this.detachElement("length_of_service_contributing_pay_code_policy_id"),this.edit_view_tab.find("#tab_length_of_service_milestones").find(".first-column").css("border","none")):(this.attachElement("length_of_service_contributing_pay_code_policy_id"),this.edit_view_tab.find("#tab_length_of_service_milestones").find(".first-column").css("border","1px solid #c7c7c7"))}insideEditorSetValue(e){e.length;this.removeAllRows();for(var i=0;i<e.length;i++)if(Global.isSet(e[i])){var t=e[i];Global.isSet(this.parent_id)&&(t.id=""),this.addRow(t)}}insideEditorAddRow(e,i){e||(e={});var t,a,l=e.id&&this.parent_controller.current_edit_record.id?e.id:TTUUID.generateUUID(),r=this,o=this.getRowRender(),_=this.getRender(),n={};a=$("<div class='widget-h-box'></div>");var s=$("<span class='widget-right-label'> "+$.i18n._("After")+":  </span>"),d=$("<span class='widget-right-label'>&nbsp;</span>");(t=Global.loadWidgetByName(FormItemType.TEXT_INPUT)).TTextInput({field:"length_of_service",width:30}),t.setValue(e.length_of_service?e.length_of_service:0),t.attr("milestone_id",l),this.setWidgetEnableBaseOnParentController(t);var c=Global.loadWidgetByName(FormItemType.COMBO_BOX);c.TComboBox({field:"length_of_service_unit_id"}),c.setSourceData(this.parent_controller.length_of_service_unit_array),c.setValue(e.length_of_service_unit_id?e.length_of_service_unit_id:10),c.bind("formItemChange",(function(e,i){r.parent_controller.isDisplayLengthOfServiceHoursBasedOn()})),this.setWidgetEnableBaseOnParentController(t),this.setWidgetEnableBaseOnParentController(c),a.append(s),a.append(t),a.append(d),a.append(c),n[t.getField()]=t,n[c.getField()]=c,o.children().eq(0).append(a),t=Global.loadWidgetByName(FormItemType.TEXT_INPUT),a=$("<div class='widget-h-box'></div>"),t.TTextInput({field:"accrual_rate_hourly",width:90,need_parser_sec:!1}),t.setPlaceHolder(""),t.setValue(e.accrual_rate?e.accrual_rate:"0.000"),a.append(t),n[t.getField()]=t,o.children().eq(1).append(a),this.setWidgetEnableBaseOnParentController(t),a=$("<div class='widget-h-box'></div>"),(t=Global.loadWidgetByName(FormItemType.TEXT_INPUT)).TTextInput({field:"accrual_rate_yearly",width:90,mode:"time_unit",need_parser_sec:!0}),t.setValue(e.accrual_rate?e.accrual_rate:"0"),a.append(t),n[t.getField()]=t,o.children().eq(1).append(a),this.setWidgetEnableBaseOnParentController(t),30==e.type_id?(n.accrual_rate_hourly.show(),n.accrual_rate_yearly.hide()):(n.accrual_rate_yearly.show(),n.accrual_rate_hourly.hide()),(t=Global.loadWidgetByName(FormItemType.TEXT_INPUT)).TTextInput({field:"annual_maximum_time",width:90,mode:"time_unit",need_parser_sec:!0}),t.setValue(e.annual_maximum_time?e.annual_maximum_time:"0"),n[t.getField()]=t,o.children().eq(2).append(t),this.setWidgetEnableBaseOnParentController(t),(t=Global.loadWidgetByName(FormItemType.TEXT_INPUT)).TTextInput({field:"maximum_time",width:90,mode:"time_unit",need_parser_sec:!0}),t.setValue(e.maximum_time?e.maximum_time:"0"),n[t.getField()]=t,o.children().eq(3).append(t),this.setWidgetEnableBaseOnParentController(t),(t=Global.loadWidgetByName(FormItemType.TEXT_INPUT)).TTextInput({field:"rollover_time",width:90,mode:"time_unit",need_parser_sec:!0}),t.setValue(e.rollover_time?e.rollover_time:"0"),n[t.getField()]=t,o.children().eq(4).append(t),this.setWidgetEnableBaseOnParentController(t),void 0!==i?(o.insertAfter($(_).find("tr").eq(i)),this.rows_widgets_array.splice(i,0,n)):($(_).append(o),this.rows_widgets_array.push(n)),this.parent_controller.is_viewing&&o.find(".control-icon").hide(),this.addIconsEvent(o),this.removeLastRowLine(),this.parent_controller.setAccrualRageFormat()}insideEditorRemoveRow(e){var i=e[0].rowIndex-1,t=this.rows_widgets_array[i].length_of_service.attr("milestone_id");t&&TTUUID.isUUID(t)&&t!=TTUUID.not_exist_id&&t!=TTUUID.zero_id&&this.delete_ids.push(t),e.remove(),this.rows_widgets_array.splice(i,1),this.removeLastRowLine(),this.parent_controller.isDisplayLengthOfServiceHoursBasedOn()}insideEditorGetValue(e){for(var i=this.rows_widgets_array.length,t=[],a=0;a<i;a++){var l=this.rows_widgets_array[a],r=0;r=30==this.parent_controller.current_edit_record.type_id?l.accrual_rate_hourly.getValue():l.accrual_rate_yearly.getValue();var o={length_of_service:l.length_of_service.getValue(),length_of_service_unit_id:l.length_of_service_unit_id.getValue(),accrual_rate:r,maximum_time:l.maximum_time.getValue(),rollover_time:l.rollover_time.getValue()};30==this.parent_controller.current_edit_record.type_id&&(o.annual_maximum_time=l.annual_maximum_time.getValue()),o.id=l.length_of_service.attr("milestone_id"),o.accrual_policy_id=e,t.push(o)}return t}setEditViewDataDone(){super.setEditViewDataDone(),this.onApplyFrequencyChange(),this.onTypeChange(),this.onMilestoneRolloverHireDate(),this.initInsideEditorData()}initInsideEditorData(){var e=this,i={filter_data:{}};!this.mass_edit&&(this.current_edit_record&&this.current_edit_record.id||this.copied_record_id)?(i.filter_data.accrual_policy_id=this.current_edit_record.id?this.current_edit_record.id:this.copied_record_id,this.copied_record_id="",this.accrual_policy_milestone_api.getAccrualPolicyMilestone(i,!0,{onResult:function(i){if(e.edit_view){var t=i.getResult();!0===t?e.editor.addRow():t.length>0&&e.editor.setValue(t),e.isDisplayLengthOfServiceHoursBasedOn()}}})):(e.editor.removeAllRows(),e.editor.addRow(),e.isDisplayLengthOfServiceHoursBasedOn())}saveInsideEditorData(e,i){var t=this,a=this.editor.getValue(this.refresh_id),l=t.editor.delete_ids;l.length>0&&t.accrual_policy_milestone_api.deleteAccrualPolicyMilestone(l,{onResult:function(e){e.isValid()&&(t.editor.delete_ids=[])}}),t.accrual_policy_milestone_api.setAccrualPolicyMilestone(a,{onResult:function(i){i.getResult();Global.isSet(e)&&e()}})}onSaveResult(e){if(e.isValid()){var i=e.getResult();if(!0===i?this.refresh_id=this.current_edit_record.id:i&&TTUUID.isUUID(i)&&i!=TTUUID.not_exist_id&&i!=TTUUID.zero_id&&(this.refresh_id=i),0==this.is_mass_editing){var t=this;t.saveInsideEditorData((function(){t.search(),t.onSaveDone(e),t.removeEditView()}))}else this.search(),this.onSaveDone(e),this.removeEditView()}else this.setErrorMenu(),this.setErrorTips(e)}removeEditView(){super.removeEditView(),this.sub_accrual_policy_user_modifier_view_controller=null}onSaveAndCopyResult(e){var i=this;if(e.isValid()){var t=e.getResult();!0===t?i.refresh_id=i.current_edit_record.id:t&&TTUUID.isUUID(t)&&t!=TTUUID.not_exist_id&&t!=TTUUID.zero_id&&(i.refresh_id=t),i.saveInsideEditorData((function(){i.search(!1),i.onCopyAsNewClick()}))}else i.setErrorTips(e),i.setErrorMenu()}_continueDoCopyAsNew(){if(LocalCacheData.current_doing_context_action="copy_as_new",this.is_add=!0,Global.isSet(this.edit_view))for(var e=0;e<this.editor.rows_widgets_array.length;e++)this.editor.rows_widgets_array[e].length_of_service.attr("milestone_id","");super._continueDoCopyAsNew()}onCopyAsNewResult(e){var i=this,t=e.getResult();if(!t)return TAlertManager.showAlert($.i18n._("Record does not exist")),void i.onCancelClick();i.openEditView(),t=t[0],this.copied_record_id=t.id,t.id="",i.sub_view_mode&&i.parent_key&&(t[i.parent_key]=i.parent_value),i.current_edit_record=t,i.initEditView()}buildSearchFields(){super.buildSearchFields(),this.search_fields=[new SearchField({label:$.i18n._("Name"),in_column:1,field:"name",multiple:!0,basic_search:!0,adv_search:!1,form_item_type:FormItemType.TEXT_INPUT}),new SearchField({label:$.i18n._("Type"),in_column:1,field:"type_id",multiple:!0,basic_search:!0,adv_search:!1,layout_name:"global_option_column",form_item_type:FormItemType.AWESOME_BOX}),new SearchField({label:$.i18n._("Created By"),in_column:2,field:"created_by",layout_name:"global_user",api_class:TTAPI.APIUser,multiple:!0,basic_search:!0,adv_search:!1,form_item_type:FormItemType.AWESOME_BOX}),new SearchField({label:$.i18n._("Updated By"),in_column:2,field:"updated_by",layout_name:"global_user",api_class:TTAPI.APIUser,multiple:!0,basic_search:!0,adv_search:!1,form_item_type:FormItemType.AWESOME_BOX})]}initSubAccrualPolicyUserModifier(){var e=this;if(Global.getProductEdition()<=10?(this.edit_view_tab.find("#tab_employee_settings").find(".first-column-sub-view").css("display","none"),this.edit_view.find(".save-and-continue-div").css("display","none"),this.edit_view.find(".permission-defined-div").css("display","block"),this.edit_view.find(".permission-message").html(Global.getUpgradeMessage())):(this.edit_view_tab.find("#tab_employee_settings").find(".first-column-sub-view").css("display","block"),this.edit_view.find(".permission-defined-div").css("display","none")),this.current_edit_record.id){if(this.sub_accrual_policy_user_modifier_view_controller)return this.sub_accrual_policy_user_modifier_view_controller.buildContextMenu(!0),this.sub_accrual_policy_user_modifier_view_controller.setDefaultMenu(),e.sub_accrual_policy_user_modifier_view_controller.parent_key="accrual_policy_id",e.sub_accrual_policy_user_modifier_view_controller.parent_value=e.current_edit_record.id,e.sub_accrual_policy_user_modifier_view_controller.parent_edit_record=e.current_edit_record,void e.sub_accrual_policy_user_modifier_view_controller.initData();Global.getProductEdition()>=15&&Global.loadScript("views/policy/accrual_policy/AccrualPolicyUserModifierViewController.js",(function(){var a=e.edit_view_tab.find("#tab_employee_settings").find(".first-column-sub-view");Global.trackView("SubAccrualPolicyUserModifierView"),AccrualPolicyUserModifierViewController.loadSubView(a,i,t)}))}else TTPromise.resolve("BaseViewController","onTabShow");function i(e){return{template:_.template(e),args:{parent_view:"accrual_policy"}}}function t(i){e.sub_accrual_policy_user_modifier_view_controller=i,e.sub_accrual_policy_user_modifier_view_controller.parent_key="accrual_policy_id",e.sub_accrual_policy_user_modifier_view_controller.parent_value=e.current_edit_record.id,e.sub_accrual_policy_user_modifier_view_controller.parent_edit_record=e.current_edit_record,e.sub_accrual_policy_user_modifier_view_controller.parent_view_controller=e,TTPromise.wait("BaseViewController","initialize",(function(){e.sub_accrual_policy_user_modifier_view_controller.initData()}))}}}}}]);
//# sourceMappingURL=policy-accrual_policy-AccrualPolicyViewController.bundle.js.map?v=bb42f3360f031f11df05