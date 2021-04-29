(self.webpackChunktimetrex=self.webpackChunktimetrex||[]).push([["policy-contributing_shift_policy-ContributingShiftPolicyViewController"],{4362:(e,i,t)=>{"use strict";t.r(i),t.d(i,{"ContributingShiftPolicyViewController":()=>o});class o extends BaseViewController{constructor(e={}){_.defaults(e,{el:"#contributing_shift_policy_view_container",type_array:null,include_holiday_type_array:null,include_shift_type_array:null,branch_selection_type_array:null,department_selection_type_array:null,job_group_selection_type_array:null,job_selection_type_array:null,job_group_array:null,job_item_group_array:null,job_item_group_selection_type_array:null,job_item_selection_type_array:null,job_group_api:null,job_item_group_api:null,date_api:null}),super(e)}init(e){this.edit_view_tpl="ContributingShiftPolicyEditView.html",this.permission_id="contributing_shift_policy",this.viewId="ContributingShiftPolicy",this.script_name="ContributingShiftPolicyView",this.table_name_key="contributing_shift_policy",this.context_menu_name=$.i18n._("Contributing Shift Policy"),this.navigation_label=$.i18n._("Contributing Shift Policy")+":",this.api=TTAPI.APIContributingShiftPolicy,Global.getProductEdition()>=20&&(this.job_group_api=TTAPI.APIJobGroup,this.job_item_group_api=TTAPI.APIJobItemGroup),this.date_api=TTAPI.APITTDate,this.render(),this.buildContextMenu(),this.initData(),this.setSelectRibbonMenuIfNecessary()}initOptions(){var e=this;this.initDropDownOption("type"),this.initDropDownOption("include_holiday_type"),this.initDropDownOption("include_shift_type"),this.initDropDownOption("branch_selection_type"),this.initDropDownOption("department_selection_type"),this.initDropDownOption("job_group_selection_type"),this.initDropDownOption("job_selection_type"),this.initDropDownOption("job_item_group_selection_type"),this.initDropDownOption("job_item_selection_type"),Global.getProductEdition()>=20&&(this.job_group_api.getJobGroup("",!1,!1,{onResult:function(i){i=i.getResult(),i=Global.buildTreeRecord(i),e.job_group_array=i}}),this.job_item_group_api.getJobItemGroup("",!1,!1,{onResult:function(i){i=i.getResult(),i=Global.buildTreeRecord(i),e.job_item_group_array=i}}))}buildEditViewUI(){super.buildEditViewUI();var e=this,i={"tab_contributing_shift_policy":{"label":$.i18n._("Contributing Shift Policy")},"tab_date_criteria":{"label":$.i18n._("Date/Time Criteria"),"init_callback":"initSubDateCriteriaView"},"tab_differential_criteria":{"label":$.i18n._("Differential Criteria"),"init_callback":"initSubDifferentialCriteriaView"},"tab_audit":!0};this.setTabModel(i),this.navigation.AComboBox({api_class:TTAPI.APIContributingShiftPolicy,id:this.script_name+"_navigation",allow_multiple_selection:!1,layout_name:"global_over_time",navigation_mode:!0,show_search_inputs:!0}),this.setNavigation();var t=this.edit_view_tab.find("#tab_contributing_shift_policy").find(".first-column");this.edit_view_tabs[0]=[],this.edit_view_tabs[0].push(t),(o=Global.loadWidgetByName(FormItemType.TEXT_INPUT)).TTextInput({field:"name",width:"100%"}),this.addEditFieldToColumn($.i18n._("Name"),o,t,""),o.parent().width("45%"),(o=Global.loadWidgetByName(FormItemType.TEXT_AREA)).TTextArea({field:"description",width:"100%"}),this.addEditFieldToColumn($.i18n._("Description"),o,t,"",null,null,!0),o.parent().width("45%"),(o=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({api_class:TTAPI.APIContributingPayCodePolicy,allow_multiple_selection:!1,layout_name:"global_contributing_pay_code_policy",show_search_inputs:!0,set_empty:!0,field:"contributing_pay_code_policy_id"}),this.addEditFieldToColumn($.i18n._("Contributing Pay Code Policy"),o,t);var o,a,l,n=this.edit_view_tab.find("#tab_date_criteria").find(".first-column");this.edit_view_tabs[1]=[],this.edit_view_tabs[1].push(n),(o=Global.loadWidgetByName(FormItemType.DATE_PICKER)).TDatePicker({field:"filter_start_date"}),a=$("<div class='widget-h-box'></div>"),l=$("<span class='widget-right-label'> "+$.i18n._("(Leave blank for no start date)")+"</span>"),a.append(o),a.append(l),this.addEditFieldToColumn($.i18n._("Start Date"),o,n,"",a),(o=Global.loadWidgetByName(FormItemType.DATE_PICKER)).TDatePicker({field:"filter_end_date"}),a=$("<div class='widget-h-box'></div>"),l=$("<span class='widget-right-label'> "+$.i18n._("(Leave blank for no end date)")+"</span>"),a.append(o),a.append(l),this.addEditFieldToColumn($.i18n._("End Date"),o,n,"",a),(o=Global.loadWidgetByName(FormItemType.TIME_PICKER)).TTimePicker({field:"filter_start_time"}),a=$("<div class='widget-h-box'></div>"),l=$("<span class='widget-right-label'> "+$.i18n._("(Leave blank for no start time)")+"</span>"),a.append(o),a.append(l),this.addEditFieldToColumn($.i18n._("Start Time"),o,n,"",a),(o=Global.loadWidgetByName(FormItemType.TIME_PICKER)).TTimePicker({field:"filter_end_time"}),a=$("<div class='widget-h-box'></div>"),l=$("<span class='widget-right-label'> "+$.i18n._("(Leave blank for no end time)")+"</span>"),a.append(o),a.append(l),this.addEditFieldToColumn($.i18n._("End Time"),o,n,"",a);var d=Global.loadWidgetByName(FormItemType.CHECKBOX);d.TCheckbox({field:"sun"});var _=Global.loadWidgetByName(FormItemType.CHECKBOX);_.TCheckbox({field:"mon"});var s=Global.loadWidgetByName(FormItemType.CHECKBOX);s.TCheckbox({field:"tue"});var p=Global.loadWidgetByName(FormItemType.CHECKBOX);p.TCheckbox({field:"wed"});var r=Global.loadWidgetByName(FormItemType.CHECKBOX);r.TCheckbox({field:"thu"});var c=Global.loadWidgetByName(FormItemType.CHECKBOX);c.TCheckbox({field:"fri"});var m=Global.loadWidgetByName(FormItemType.CHECKBOX);m.TCheckbox({field:"sat"}),a=$("<div class=''></div>");var b=$("<span class='widget-top-label'> "+$.i18n._("Sun")+" <br>  </span>"),u=$("<span class='widget-top-label'> "+$.i18n._("Mon")+" <br>  </span>"),h=$("<span class='widget-top-label'> "+$.i18n._("Tue")+" <br>  </span>"),y=$("<span class='widget-top-label'> "+$.i18n._("Wed")+" <br>  </span>"),g=$("<span class='widget-top-label'> "+$.i18n._("Thu")+" <br>  </span>"),T=$("<span class='widget-top-label'> "+$.i18n._("Fri")+" <br>  </span>"),I=$("<span class='widget-top-label'> "+$.i18n._("Sat")+" <br>  </span>");b.append(d),u.append(_),h.append(s),y.append(p),g.append(r),T.append(c),I.append(m),a.append(b),a.append(u),a.append(h),a.append(y),a.append(g),a.append(T),a.append(I),this.addEditFieldToColumn($.i18n._("Effective Days"),[d,_,s,p,r,c,m],n,"",a,!1,!0),(o=Global.loadWidgetByName(FormItemType.COMBO_BOX)).TComboBox({field:"include_holiday_type_id",set_empty:!1}),o.setSourceData(e.include_holiday_type_array),this.addEditFieldToColumn($.i18n._("Holidays"),o,n),(o=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({api_class:TTAPI.APIHolidayPolicy,allow_multiple_selection:!0,layout_name:"global_holiday",show_search_inputs:!0,set_empty:!0,field:"holiday_policy"}),this.addEditFieldToColumn($.i18n._("Holiday Policies"),o,n,"",null,!0),(o=Global.loadWidgetByName(FormItemType.COMBO_BOX)).TComboBox({field:"include_shift_type_id",set_empty:!1}),o.setSourceData(e.include_shift_type_array),a=$("<div class='widget-h-box'></div>"),l=$("<span class='widget-right-label'> "+$.i18n._("(Between above start/end times)")+"</span>"),a.append(o),a.append(l),this.addEditFieldToColumn($.i18n._("Shift Criteria"),o,n,"",a);var C=this.edit_view_tab.find("#tab_differential_criteria").find(".first-column");this.edit_view_tabs[2]=[],this.edit_view_tabs[2].push(C);var f=$("<div class='v-box'></div>");(o=Global.loadWidgetByName(FormItemType.COMBO_BOX)).TComboBox({field:"branch_selection_type_id",set_empty:!1}),o.setSourceData(e.branch_selection_type_array),w=this.putInputToInsideFormItem(o,"Selection Type"),f.append(w),f.append("<div class='clear-both-div'></div>");var v=Global.loadWidgetByName(FormItemType.AWESOME_BOX);v.AComboBox({api_class:TTAPI.APIBranch,allow_multiple_selection:!0,layout_name:"global_branch",show_search_inputs:!0,set_empty:!0,field:"branch"});var w=this.putInputToInsideFormItem(v,"Selection");f.append(w);var E=Global.loadWidgetByName(FormItemType.CHECKBOX);E.TCheckbox({field:"exclude_default_branch"}),w=this.putInputToInsideFormItem(E,"Exclude Default"),f.append(w),this.addEditFieldToColumn($.i18n._("Branches"),[o,v,E],C,"",f,!1,!0),f=$("<div class='v-box'></div>"),(o=Global.loadWidgetByName(FormItemType.COMBO_BOX)).TComboBox({field:"department_selection_type_id",set_empty:!1}),o.setSourceData(e.department_selection_type_array),w=this.putInputToInsideFormItem(o,"Selection Type"),f.append(w),f.append("<div class='clear-both-div'></div>"),(v=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({api_class:TTAPI.APIDepartment,allow_multiple_selection:!0,layout_name:"global_department",show_search_inputs:!0,set_empty:!0,field:"department"}),w=this.putInputToInsideFormItem(v,"Selection"),f.append(w),(E=Global.loadWidgetByName(FormItemType.CHECKBOX)).TCheckbox({field:"exclude_default_department"}),w=this.putInputToInsideFormItem(E,"Exclude Default"),f.append(w),this.addEditFieldToColumn($.i18n._("Departments"),[o,v,E],C,"",f,!1,!0),Global.getProductEdition()>=20&&(f=$("<div class='v-box'></div>"),(o=Global.loadWidgetByName(FormItemType.COMBO_BOX)).TComboBox({field:"job_group_selection_type_id",set_empty:!1}),o.setSourceData(e.job_group_selection_type_array),w=this.putInputToInsideFormItem(o,"Selection Type"),f.append(w),f.append("<div class='clear-both-div'></div>"),(v=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({tree_mode:!0,allow_multiple_selection:!0,layout_name:"global_tree_column",set_empty:!0,field:"job_group"}),v.setSourceData(e.job_group_array),w=this.putInputToInsideFormItem(v,"Selection"),f.append(w),this.addEditFieldToColumn($.i18n._("Job Groups"),[o,v],C,"",f,!1,!0),f=$("<div class='v-box'></div>"),(o=Global.loadWidgetByName(FormItemType.COMBO_BOX)).TComboBox({field:"job_selection_type_id",set_empty:!1}),o.setSourceData(e.job_selection_type_array),w=this.putInputToInsideFormItem(o,"Selection Type"),f.append(w),f.append("<div class='clear-both-div'></div>"),(v=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({api_class:TTAPI.APIJob,allow_multiple_selection:!0,layout_name:"global_job",show_search_inputs:!0,set_empty:!0,field:"job"}),w=this.putInputToInsideFormItem(v,"Selection"),f.append(w),(E=Global.loadWidgetByName(FormItemType.CHECKBOX)).TCheckbox({field:"exclude_default_job"}),w=this.putInputToInsideFormItem(E,"Exclude Default"),f.append(w),this.addEditFieldToColumn($.i18n._("Jobs"),[o,v,E],C,"",f,!1,!0),f=$("<div class='v-box'></div>"),(o=Global.loadWidgetByName(FormItemType.COMBO_BOX)).TComboBox({field:"job_item_group_selection_type_id",set_empty:!1}),o.setSourceData(e.job_item_group_selection_type_array),w=this.putInputToInsideFormItem(o,"Selection Type"),f.append(w),f.append("<div class='clear-both-div'></div>"),(v=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({tree_mode:!0,allow_multiple_selection:!0,layout_name:"global_tree_column",set_empty:!0,field:"job_item_group"}),v.setSourceData(e.job_item_group_array),w=this.putInputToInsideFormItem(v,"Selection"),f.append(w),this.addEditFieldToColumn($.i18n._("Task Groups"),[o,v],C,"",f,!1,!0),f=$("<div class='v-box'></div>"),(o=Global.loadWidgetByName(FormItemType.COMBO_BOX)).TComboBox({field:"job_item_selection_type_id",set_empty:!1}),o.setSourceData(e.job_item_selection_type_array),w=this.putInputToInsideFormItem(o,"Selection Type"),f.append(w),f.append("<div class='clear-both-div'></div>"),(v=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({api_class:TTAPI.APIJobItem,allow_multiple_selection:!0,layout_name:"global_job_item",show_search_inputs:!0,set_empty:!0,field:"job_item"}),w=this.putInputToInsideFormItem(v,"Selection"),f.append(w),(E=Global.loadWidgetByName(FormItemType.CHECKBOX)).TCheckbox({field:"exclude_default_job_item"}),w=this.putInputToInsideFormItem(E,"Exclude Default"),f.append(w),this.addEditFieldToColumn($.i18n._("Tasks"),[o,v,E],C,"",f,!1,!0))}onFormItemChange(e){this.is_changed=!0,this.setMassEditingFieldsWhenFormChange(e);var i=e.getField(),t=e.getValue();this.current_edit_record[i]=t,"include_holiday_type_id"===i&&this.onIncludeHolidayTypeChange(),"branch_selection_type_id"===i&&this.onBranchSelectionTypeChange(),"department_selection_type_id"===i&&this.onDepartmentSelectionTypeChange(),"job_group_selection_type_id"===i&&this.onJobGroupSelectionTypeChange(),"job_selection_type_id"===i&&this.onJobSelectionTypeChange(),"job_item_group_selection_type_id"===i&&this.onJobItemGroupSelectionTypeChange(),"job_item_selection_type_id"===i&&this.onJobItemSelectionTypeChange(),this.validate()}setCurrentEditRecordData(){for(var e in this.setDefaultData({"branch_selection_type_id":10,"department_selection_type_id":10,"job_group_selection_type_id":10,"job_selection_type_id":10,"job_item_group_selection_type_id":10,"job_item_selection_type_id":10,"include_holiday_type_id":10}),this.current_edit_record){var i=this.edit_view_ui_dic[e];Global.isSet(i)&&i.setValue(this.current_edit_record[e])}this.onBranchSelectionTypeChange(),this.onDepartmentSelectionTypeChange(),this.onJobGroupSelectionTypeChange(),this.onJobSelectionTypeChange(),this.onJobItemGroupSelectionTypeChange(),this.onJobItemSelectionTypeChange(),this.collectUIDataToCurrentEditRecord(),this.onIncludeHolidayTypeChange(),this.setEditViewDataDone()}onIncludeHolidayTypeChange(){10==this.current_edit_record.include_holiday_type_id?this.detachElement("holiday_policy"):this.attachElement("holiday_policy"),this.editFieldResize()}onBranchSelectionTypeChange(){10==this.current_edit_record.branch_selection_type_id?this.edit_view_ui_dic.branch.setEnabled(!1):this.edit_view_ui_dic.branch.setEnabled(!0)}onDepartmentSelectionTypeChange(){10==this.current_edit_record.department_selection_type_id?this.edit_view_ui_dic.department.setEnabled(!1):this.edit_view_ui_dic.department.setEnabled(!0)}onJobGroupSelectionTypeChange(){Global.getProductEdition()>=20&&(10==this.current_edit_record.job_group_selection_type_id||this.is_viewing?this.edit_view_ui_dic.job_group.setEnabled(!1):this.edit_view_ui_dic.job_group.setEnabled(!0))}onJobSelectionTypeChange(){Global.getProductEdition()>=20&&(10==this.current_edit_record.job_selection_type_id||this.is_viewing?this.edit_view_ui_dic.job.setEnabled(!1):this.edit_view_ui_dic.job.setEnabled(!0))}onJobItemGroupSelectionTypeChange(){Global.getProductEdition()>=20&&(10==this.current_edit_record.job_item_group_selection_type_id||this.is_viewing?this.edit_view_ui_dic.job_item_group.setEnabled(!1):this.edit_view_ui_dic.job_item_group.setEnabled(!0))}onJobItemSelectionTypeChange(){Global.getProductEdition()>=20&&(10==this.current_edit_record.job_item_selection_type_id||this.is_viewing?this.edit_view_ui_dic.job_item.setEnabled(!1):this.edit_view_ui_dic.job_item.setEnabled(!0))}initSubDateCriteriaView(){Global.getProductEdition()>=15?(this.edit_view_tab.find("#tab_date_criteria").find(".first-column").css("display","block"),this.edit_view.find(".permission-defined-div").css("display","none"),this.buildContextMenu(!0),this.setEditMenu()):(this.edit_view_tab.find("#tab_date_criteria").find(".first-column").css("display","none"),this.edit_view.find(".permission-defined-div").css("display","block"),this.edit_view.find(".permission-message").html(Global.getUpgradeMessage()))}initSubDifferentialCriteriaView(){Global.getProductEdition()>=15?(this.edit_view_tab.find("#tab_differential_criteria").find(".first-column").css("display","block"),this.edit_view.find(".permission-defined-div").css("display","none"),this.buildContextMenu(!0),this.setEditMenu()):(this.edit_view_tab.find("#tab_differential_criteria").find(".first-column").css("display","none"),this.edit_view.find(".permission-defined-div").css("display","block"),this.edit_view.find(".permission-message").html(Global.getUpgradeMessage()))}buildSearchFields(){super.buildSearchFields(),this.search_fields=[new SearchField({label:$.i18n._("Name"),in_column:1,field:"name",multiple:!0,basic_search:!0,adv_search:!1,form_item_type:FormItemType.TEXT_INPUT}),new SearchField({label:$.i18n._("Contributing Pay Code"),in_column:1,field:"contributing_pay_code_policy_id",layout_name:"global_contributing_pay_code_policy",api_class:TTAPI.APIContributingPayCodePolicy,multiple:!0,basic_search:!0,adv_search:!1,form_item_type:FormItemType.AWESOME_BOX}),new SearchField({label:$.i18n._("Created By"),in_column:2,field:"created_by",layout_name:"global_user",api_class:TTAPI.APIUser,multiple:!0,basic_search:!0,adv_search:!1,form_item_type:FormItemType.AWESOME_BOX}),new SearchField({label:$.i18n._("Updated By"),in_column:2,field:"updated_by",layout_name:"global_user",api_class:TTAPI.APIUser,multiple:!0,basic_search:!0,adv_search:!1,form_item_type:FormItemType.AWESOME_BOX})]}}}}]);
//# sourceMappingURL=policy-contributing_shift_policy-ContributingShiftPolicyViewController.bundle.js.map?v=238b302aaf82d3c53aa4