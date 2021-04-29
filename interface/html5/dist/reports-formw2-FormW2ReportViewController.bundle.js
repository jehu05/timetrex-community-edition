(self.webpackChunktimetrex=self.webpackChunktimetrex||[]).push([["reports-formw2-FormW2ReportViewController"],{7705:(e,t,c)=>{"use strict";c.r(t),c.d(t,{"FormW2ReportViewController":()=>n});class n extends ReportBaseViewController{constructor(e={}){_.defaults(e,{kind_of_employer_array:null,form_type_array:null}),super(e)}initReport(e){this.script_name="FormW2Report",this.viewId="FormW2Report",this.context_menu_name=$.i18n._("Form W2/W3"),this.navigation_label=$.i18n._("Saved Report")+":",this.view_file="FormW2ReportView.html",this.api=TTAPI.APIFormW2Report,this.include_form_setup=!0}getCustomContextMenuModel(){var e={groups:{form:{label:$.i18n._("Form"),id:this.viewId+"Form"}},exclude:[],include:[{label:$.i18n._("eFile"),id:ContextMenuIconName.e_file,group:"form",icon:Icons.e_file},{label:$.i18n._("Save Setup"),id:ContextMenuIconName.save_setup,group:"form",icon:Icons.save_setup}]},t={label:$.i18n._("View"),id:ContextMenuIconName.view_print,group:"form",icon:"view-35x35.png",type:RibbonSubMenuType.NAVIGATION,items:[{label:$.i18n._("Government (Multiple Employees/Page)"),id:"pdf_form_government"},{label:$.i18n._("Employee (One Employee/Page)"),id:"pdf_form"}],permission_result:!0,permission:!0};return Global.getProductEdition()>=15&&t.items.push({label:$.i18n._("Publish Employee Forms"),id:"pdf_form_publish_employee"}),e.include.unshift(t),e}initOptions(e){this.initDropDownOptions([{option_name:"page_orientation"},{option_name:"font_size"},{option_name:"chart_display_mode"},{option_name:"chart_type"},{option_name:"templates"},{option_name:"setup_fields"},{option_name:"kind_of_employer"},{option_name:"form_type"},{option_name:"auto_refresh"}],(function(t){e(t)}))}onReportMenuClick(e){this.onViewClick(e)}buildFormSetupUI(){var e=this,t=this.edit_view_tab.find("#tab_form_setup").find(".first-column");this.edit_view_tabs[3]=[],this.edit_view_tabs[3].push(t),(i=Global.loadWidgetByName(FormItemType.COMBO_BOX)).TComboBox({field:"form_type",set_empty:!1}),i.setSourceData(e.form_type_array),this.addEditFieldToColumn($.i18n._("Form"),i,t),(i=Global.loadWidgetByName(FormItemType.COMBO_BOX)).TComboBox({field:"kind_of_employer",set_empty:!1}),i.setSourceData(e.kind_of_employer_array),this.addEditFieldToColumn($.i18n._("Kind of Employer"),i,t);var _=$("<div class='v-box'></div>");(i=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({api_class:TTAPI.APIPayStubEntryAccount,allow_multiple_selection:!0,layout_name:"global_PayStubAccount",show_search_inputs:!0,set_empty:!0,field:"l1_include_pay_stub_entry_account"});var c=this.putInputToInsideFormItem(i,$.i18n._("Include"));_.append(c),_.append("<div class='clear-both-div'></div>");var n=Global.loadWidgetByName(FormItemType.AWESOME_BOX);n.AComboBox({api_class:TTAPI.APIPayStubEntryAccount,allow_multiple_selection:!0,layout_name:"global_PayStubAccount",show_search_inputs:!0,set_empty:!0,field:"l1_exclude_pay_stub_entry_account"}),c=this.putInputToInsideFormItem(n,$.i18n._("Exclude")),_.append(c),this.addEditFieldToColumn($.i18n._("Wages, Tips, Other Compensation (Box 1)"),[i,n],t,"",_,!1,!0),_=$("<div class='v-box'></div>"),(i=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({api_class:TTAPI.APIPayStubEntryAccount,allow_multiple_selection:!0,layout_name:"global_PayStubAccount",show_search_inputs:!0,set_empty:!0,field:"l2_include_pay_stub_entry_account"}),c=this.putInputToInsideFormItem(i,$.i18n._("Include")),_.append(c),_.append("<div class='clear-both-div'></div>"),(n=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({api_class:TTAPI.APIPayStubEntryAccount,allow_multiple_selection:!0,layout_name:"global_PayStubAccount",show_search_inputs:!0,set_empty:!0,field:"l2_exclude_pay_stub_entry_account"}),c=this.putInputToInsideFormItem(n,$.i18n._("Exclude")),_.append(c),this.addEditFieldToColumn($.i18n._("Federal Income Tax Withheld (Box 2)"),[i,n],t,"",_,!1,!0),_=$("<div class='v-box'></div>"),(i=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({api_class:TTAPI.APIPayStubEntryAccount,allow_multiple_selection:!0,layout_name:"global_PayStubAccount",show_search_inputs:!0,set_empty:!0,field:"l3_include_pay_stub_entry_account"}),c=this.putInputToInsideFormItem(i,$.i18n._("Include")),_.append(c),_.append("<div class='clear-both-div'></div>"),(n=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({api_class:TTAPI.APIPayStubEntryAccount,allow_multiple_selection:!0,layout_name:"global_PayStubAccount",show_search_inputs:!0,set_empty:!0,field:"l3_exclude_pay_stub_entry_account"}),c=this.putInputToInsideFormItem(n,$.i18n._("Exclude")),_.append(c),this.addEditFieldToColumn($.i18n._("Social Security Wages (Box 3)"),[i,n],t,"",_,!1,!0),_=$("<div class='v-box'></div>"),(i=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({api_class:TTAPI.APIPayStubEntryAccount,allow_multiple_selection:!0,layout_name:"global_PayStubAccount",show_search_inputs:!0,set_empty:!0,field:"l4_include_pay_stub_entry_account"}),c=this.putInputToInsideFormItem(i,$.i18n._("Include")),_.append(c),_.append("<div class='clear-both-div'></div>"),(n=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({api_class:TTAPI.APIPayStubEntryAccount,allow_multiple_selection:!0,layout_name:"global_PayStubAccount",show_search_inputs:!0,set_empty:!0,field:"l4_exclude_pay_stub_entry_account"}),c=this.putInputToInsideFormItem(n,$.i18n._("Exclude")),_.append(c),this.addEditFieldToColumn($.i18n._("Social Security Tax Withheld (Box 4)"),[i,n],t,"",_,!1,!0),_=$("<div class='v-box'></div>"),(i=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({api_class:TTAPI.APIPayStubEntryAccount,allow_multiple_selection:!0,layout_name:"global_PayStubAccount",show_search_inputs:!0,set_empty:!0,field:"l5_include_pay_stub_entry_account"}),c=this.putInputToInsideFormItem(i,$.i18n._("Include")),_.append(c),_.append("<div class='clear-both-div'></div>"),(n=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({api_class:TTAPI.APIPayStubEntryAccount,allow_multiple_selection:!0,layout_name:"global_PayStubAccount",show_search_inputs:!0,set_empty:!0,field:"l5_exclude_pay_stub_entry_account"}),c=this.putInputToInsideFormItem(n,$.i18n._("Exclude")),_.append(c),this.addEditFieldToColumn($.i18n._("Medicare Wages and Tips (Box 5)"),[i,n],t,"",_,!1,!0),_=$("<div class='v-box'></div>"),(i=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({api_class:TTAPI.APIPayStubEntryAccount,allow_multiple_selection:!0,layout_name:"global_PayStubAccount",show_search_inputs:!0,set_empty:!0,field:"l6_include_pay_stub_entry_account"}),c=this.putInputToInsideFormItem(i,$.i18n._("Include")),_.append(c),_.append("<div class='clear-both-div'></div>"),(n=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({api_class:TTAPI.APIPayStubEntryAccount,allow_multiple_selection:!0,layout_name:"global_PayStubAccount",show_search_inputs:!0,set_empty:!0,field:"l6_exclude_pay_stub_entry_account"}),c=this.putInputToInsideFormItem(n,$.i18n._("Exclude")),_.append(c),this.addEditFieldToColumn($.i18n._("Medicare Tax Withheld (Box 6)"),[i,n],t,"",_,!1,!0),_=$("<div class='v-box'></div>"),(i=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({api_class:TTAPI.APIPayStubEntryAccount,allow_multiple_selection:!0,layout_name:"global_PayStubAccount",show_search_inputs:!0,set_empty:!0,field:"l7_include_pay_stub_entry_account"}),c=this.putInputToInsideFormItem(i,$.i18n._("Include")),_.append(c),_.append("<div class='clear-both-div'></div>"),(n=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({api_class:TTAPI.APIPayStubEntryAccount,allow_multiple_selection:!0,layout_name:"global_PayStubAccount",show_search_inputs:!0,set_empty:!0,field:"l7_exclude_pay_stub_entry_account"}),c=this.putInputToInsideFormItem(n,$.i18n._("Exclude")),_.append(c),this.addEditFieldToColumn($.i18n._("Social Security Tips (Box 7)"),[i,n],t,"",_,!1,!0),_=$("<div class='v-box'></div>"),(i=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({api_class:TTAPI.APIPayStubEntryAccount,allow_multiple_selection:!0,layout_name:"global_PayStubAccount",show_search_inputs:!0,set_empty:!0,field:"l8_include_pay_stub_entry_account"}),c=this.putInputToInsideFormItem(i,$.i18n._("Include")),_.append(c),_.append("<div class='clear-both-div'></div>"),(n=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({api_class:TTAPI.APIPayStubEntryAccount,allow_multiple_selection:!0,layout_name:"global_PayStubAccount",show_search_inputs:!0,set_empty:!0,field:"l8_exclude_pay_stub_entry_account"}),c=this.putInputToInsideFormItem(n,$.i18n._("Exclude")),_.append(c),this.addEditFieldToColumn($.i18n._("Allocated Tips (Box 8)"),[i,n],t,"",_,!1,!0),_=$("<div class='v-box'></div>"),(i=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({api_class:TTAPI.APIPayStubEntryAccount,allow_multiple_selection:!0,layout_name:"global_PayStubAccount",show_search_inputs:!0,set_empty:!0,field:"l10_include_pay_stub_entry_account"}),c=this.putInputToInsideFormItem(i,$.i18n._("Include")),_.append(c),_.append("<div class='clear-both-div'></div>"),(n=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({api_class:TTAPI.APIPayStubEntryAccount,allow_multiple_selection:!0,layout_name:"global_PayStubAccount",show_search_inputs:!0,set_empty:!0,field:"l10_exclude_pay_stub_entry_account"}),c=this.putInputToInsideFormItem(n,$.i18n._("Exclude")),_.append(c),this.addEditFieldToColumn($.i18n._("Dependent Care Benefits (Box 10)"),[i,n],t,"",_,!1,!0),_=$("<div class='v-box'></div>"),(i=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({api_class:TTAPI.APIPayStubEntryAccount,allow_multiple_selection:!0,layout_name:"global_PayStubAccount",show_search_inputs:!0,set_empty:!0,field:"l11_include_pay_stub_entry_account"}),c=this.putInputToInsideFormItem(i,$.i18n._("Include")),_.append(c),_.append("<div class='clear-both-div'></div>"),(n=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({api_class:TTAPI.APIPayStubEntryAccount,allow_multiple_selection:!0,layout_name:"global_PayStubAccount",show_search_inputs:!0,set_empty:!0,field:"l11_exclude_pay_stub_entry_account"}),c=this.putInputToInsideFormItem(n,$.i18n._("Exclude")),_.append(c),this.addEditFieldToColumn($.i18n._("Nonqualified Plans (Box 11)"),[i,n],t,"",_,!1,!0),_=$("<div class='v-box'></div>"),(i=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({api_class:TTAPI.APIPayStubEntryAccount,allow_multiple_selection:!0,layout_name:"global_PayStubAccount",show_search_inputs:!0,set_empty:!0,field:"l12a_include_pay_stub_entry_account"}),c=this.putInputToInsideFormItem(i,$.i18n._("Include")),_.append(c),_.append("<div class='clear-both-div'></div>"),(n=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({api_class:TTAPI.APIPayStubEntryAccount,allow_multiple_selection:!0,layout_name:"global_PayStubAccount",show_search_inputs:!0,set_empty:!0,field:"l12a_exclude_pay_stub_entry_account"}),c=this.putInputToInsideFormItem(n,$.i18n._("Exclude")),_.append(c);var a=$("<div class='h-box'></div>"),u=$('<span class="edit-view-form-item-label"></span>'),l=Global.loadWidgetByName(FormItemType.TEXT_INPUT);l.TTextInput({field:"l12a_code",width:50}),l.css("float","right"),l.bind("formItemChange",(function(t,_){e.onFormItemChange(_,!0)})),u.text($.i18n._("Box 12a: Code")+": "),this.edit_view_ui_dic[l.getField()]=l,a.append(l),a.append(u),this.addEditFieldToColumn($.i18n._("Box"),[i,n],t,"",_,!1,!0,!1,!1,a),_=$("<div class='v-box'></div>"),(i=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({api_class:TTAPI.APIPayStubEntryAccount,allow_multiple_selection:!0,layout_name:"global_PayStubAccount",show_search_inputs:!0,set_empty:!0,field:"l12b_include_pay_stub_entry_account"}),c=this.putInputToInsideFormItem(i,$.i18n._("Include")),_.append(c),_.append("<div class='clear-both-div'></div>"),(n=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({api_class:TTAPI.APIPayStubEntryAccount,allow_multiple_selection:!0,layout_name:"global_PayStubAccount",show_search_inputs:!0,set_empty:!0,field:"l12b_exclude_pay_stub_entry_account"}),c=this.putInputToInsideFormItem(n,$.i18n._("Exclude")),_.append(c),a=$("<div class='h-box'></div>"),u=$('<span class="edit-view-form-item-label"></span>'),(l=Global.loadWidgetByName(FormItemType.TEXT_INPUT)).TTextInput({field:"l12b_code",width:50}),l.css("float","right"),l.bind("formItemChange",(function(t,_){e.onFormItemChange(_,!0)})),u.text($.i18n._("Box 12b: Code")+": "),this.edit_view_ui_dic[l.getField()]=l,a.append(l),a.append(u),this.addEditFieldToColumn($.i18n._("Box"),[i,n],t,"",_,!1,!0,!1,!1,a),_=$("<div class='v-box'></div>"),(i=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({api_class:TTAPI.APIPayStubEntryAccount,allow_multiple_selection:!0,layout_name:"global_PayStubAccount",show_search_inputs:!0,set_empty:!0,field:"l12c_include_pay_stub_entry_account"}),c=this.putInputToInsideFormItem(i,$.i18n._("Include")),_.append(c),_.append("<div class='clear-both-div'></div>"),(n=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({api_class:TTAPI.APIPayStubEntryAccount,allow_multiple_selection:!0,layout_name:"global_PayStubAccount",show_search_inputs:!0,set_empty:!0,field:"l12c_exclude_pay_stub_entry_account"}),c=this.putInputToInsideFormItem(n,$.i18n._("Exclude")),_.append(c),a=$("<div class='h-box'></div>"),u=$('<span class="edit-view-form-item-label"></span>'),(l=Global.loadWidgetByName(FormItemType.TEXT_INPUT)).TTextInput({field:"l12c_code",width:50}),l.css("float","right"),l.bind("formItemChange",(function(t,_){e.onFormItemChange(_,!0)})),u.text($.i18n._("Box 12c: Code")+": "),this.edit_view_ui_dic[l.getField()]=l,a.append(l),a.append(u),this.addEditFieldToColumn($.i18n._("Box"),[i,n],t,"",_,!1,!0,!1,!1,a),_=$("<div class='v-box'></div>"),(i=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({api_class:TTAPI.APIPayStubEntryAccount,allow_multiple_selection:!0,layout_name:"global_PayStubAccount",show_search_inputs:!0,set_empty:!0,field:"l12d_include_pay_stub_entry_account"}),c=this.putInputToInsideFormItem(i,$.i18n._("Include")),_.append(c),_.append("<div class='clear-both-div'></div>"),(n=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({api_class:TTAPI.APIPayStubEntryAccount,allow_multiple_selection:!0,layout_name:"global_PayStubAccount",show_search_inputs:!0,set_empty:!0,field:"l12d_exclude_pay_stub_entry_account"}),c=this.putInputToInsideFormItem(n,$.i18n._("Exclude")),_.append(c),a=$("<div class='h-box'></div>"),u=$('<span class="edit-view-form-item-label"></span>'),(l=Global.loadWidgetByName(FormItemType.TEXT_INPUT)).TTextInput({field:"l12d_code",width:50}),l.css("float","right"),l.bind("formItemChange",(function(t,_){e.onFormItemChange(_,!0)})),u.text($.i18n._("Box 12d: Code")+": "),this.edit_view_ui_dic[l.getField()]=l,a.append(l),a.append(u),this.addEditFieldToColumn($.i18n._("Box"),[i,n],t,"",_,!1,!0,!1,!1,a);var i=Global.loadWidgetByName(FormItemType.COMBO_BOX);(i=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({api_class:TTAPI.APICompanyDeduction,allow_multiple_selection:!0,layout_name:"global_deduction",show_search_inputs:!0,set_empty:!0,field:"l13b_company_deduction"}),this.addEditFieldToColumn($.i18n._("Retirement Plans (Box 13)"),i,t),_=$("<div class='v-box'></div>"),(i=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({api_class:TTAPI.APIPayStubEntryAccount,allow_multiple_selection:!0,layout_name:"global_PayStubAccount",show_search_inputs:!0,set_empty:!0,field:"l14a_include_pay_stub_entry_account"}),c=this.putInputToInsideFormItem(i,$.i18n._("Include")),_.append(c),_.append("<div class='clear-both-div'></div>"),(n=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({api_class:TTAPI.APIPayStubEntryAccount,allow_multiple_selection:!0,layout_name:"global_PayStubAccount",show_search_inputs:!0,set_empty:!0,field:"l14a_exclude_pay_stub_entry_account"}),c=this.putInputToInsideFormItem(n,$.i18n._("Exclude")),_.append(c),a=$("<div class='h-box'></div>"),u=$('<span class="edit-view-form-item-label"></span>'),(l=Global.loadWidgetByName(FormItemType.TEXT_INPUT)).TTextInput({field:"l14a_name",width:50}),l.css("float","right"),l.bind("formItemChange",(function(t,_){e.onFormItemChange(_,!0)})),u.text($.i18n._("Box 14 (Other): Name")+": "),this.edit_view_ui_dic[l.getField()]=l,a.append(l),a.append(u),this.addEditFieldToColumn($.i18n._("Box"),[i,n],t,"",_,!1,!0,!1,!1,a),_=$("<div class='v-box'></div>"),(i=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({api_class:TTAPI.APIPayStubEntryAccount,allow_multiple_selection:!0,layout_name:"global_PayStubAccount",show_search_inputs:!0,set_empty:!0,field:"l14b_include_pay_stub_entry_account"}),c=this.putInputToInsideFormItem(i,$.i18n._("Include")),_.append(c),_.append("<div class='clear-both-div'></div>"),(n=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({api_class:TTAPI.APIPayStubEntryAccount,allow_multiple_selection:!0,layout_name:"global_PayStubAccount",show_search_inputs:!0,set_empty:!0,field:"l14b_exclude_pay_stub_entry_account"}),c=this.putInputToInsideFormItem(n,$.i18n._("Exclude")),_.append(c),a=$("<div class='h-box'></div>"),u=$('<span class="edit-view-form-item-label"></span>'),(l=Global.loadWidgetByName(FormItemType.TEXT_INPUT)).TTextInput({field:"l14b_name",width:50}),l.css("float","right"),l.bind("formItemChange",(function(t,_){e.onFormItemChange(_,!0)})),u.text($.i18n._("Box 14 (Other): Name")+": "),this.edit_view_ui_dic[l.getField()]=l,a.append(l),a.append(u),this.addEditFieldToColumn($.i18n._("Box"),[i,n],t,"",_,!1,!0,!1,!1,a),_=$("<div class='v-box'></div>"),(i=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({api_class:TTAPI.APIPayStubEntryAccount,allow_multiple_selection:!0,layout_name:"global_PayStubAccount",show_search_inputs:!0,set_empty:!0,field:"l14c_include_pay_stub_entry_account"}),c=this.putInputToInsideFormItem(i,$.i18n._("Include")),_.append(c),_.append("<div class='clear-both-div'></div>"),(n=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({api_class:TTAPI.APIPayStubEntryAccount,allow_multiple_selection:!0,layout_name:"global_PayStubAccount",show_search_inputs:!0,set_empty:!0,field:"l14c_exclude_pay_stub_entry_account"}),c=this.putInputToInsideFormItem(n,$.i18n._("Exclude")),_.append(c),a=$("<div class='h-box'></div>"),u=$('<span class="edit-view-form-item-label"></span>'),(l=Global.loadWidgetByName(FormItemType.TEXT_INPUT)).TTextInput({field:"l14c_name",width:50}),l.css("float","right"),l.bind("formItemChange",(function(t,_){e.onFormItemChange(_,!0)})),u.text($.i18n._("Box 14 (Other): Name")+": "),this.edit_view_ui_dic[l.getField()]=l,a.append(l),a.append(u),this.addEditFieldToColumn($.i18n._("Box"),[i,n],t,"",_,!1,!0,!1,!1,a),_=$("<div class='v-box'></div>"),(i=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({api_class:TTAPI.APIPayStubEntryAccount,allow_multiple_selection:!0,layout_name:"global_PayStubAccount",show_search_inputs:!0,set_empty:!0,field:"l14d_include_pay_stub_entry_account"}),c=this.putInputToInsideFormItem(i,$.i18n._("Include")),_.append(c),_.append("<div class='clear-both-div'></div>"),(n=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({api_class:TTAPI.APIPayStubEntryAccount,allow_multiple_selection:!0,layout_name:"global_PayStubAccount",show_search_inputs:!0,set_empty:!0,field:"l14d_exclude_pay_stub_entry_account"}),c=this.putInputToInsideFormItem(n,$.i18n._("Exclude")),_.append(c),a=$("<div class='h-box'></div>"),u=$('<span class="edit-view-form-item-label"></span>'),(l=Global.loadWidgetByName(FormItemType.TEXT_INPUT)).TTextInput({field:"l14d_name",width:50}),l.css("float","right"),l.bind("formItemChange",(function(t,_){e.onFormItemChange(_,!0)})),u.text($.i18n._("Box 14 (Other): Name")+": "),this.edit_view_ui_dic[l.getField()]=l,a.append(l),a.append(u),this.addEditFieldToColumn($.i18n._("Box"),[i,n],t,"",_,!1,!0,!1,!1,a)}getFormSetupData(){var e={};return e.form_type=this.current_edit_record.form_type,e.kind_of_employer=this.current_edit_record.kind_of_employer,e.l1={include_pay_stub_entry_account:this.current_edit_record.l1_include_pay_stub_entry_account,exclude_pay_stub_entry_account:this.current_edit_record.l1_exclude_pay_stub_entry_account},e.l2={include_pay_stub_entry_account:this.current_edit_record.l2_include_pay_stub_entry_account,exclude_pay_stub_entry_account:this.current_edit_record.l2_exclude_pay_stub_entry_account},e.l3={include_pay_stub_entry_account:this.current_edit_record.l3_include_pay_stub_entry_account,exclude_pay_stub_entry_account:this.current_edit_record.l3_exclude_pay_stub_entry_account},e.l4={include_pay_stub_entry_account:this.current_edit_record.l4_include_pay_stub_entry_account,exclude_pay_stub_entry_account:this.current_edit_record.l4_exclude_pay_stub_entry_account},e.l5={include_pay_stub_entry_account:this.current_edit_record.l5_include_pay_stub_entry_account,exclude_pay_stub_entry_account:this.current_edit_record.l5_exclude_pay_stub_entry_account},e.l6={include_pay_stub_entry_account:this.current_edit_record.l6_include_pay_stub_entry_account,exclude_pay_stub_entry_account:this.current_edit_record.l6_exclude_pay_stub_entry_account},e.l7={include_pay_stub_entry_account:this.current_edit_record.l7_include_pay_stub_entry_account,exclude_pay_stub_entry_account:this.current_edit_record.l7_exclude_pay_stub_entry_account},e.l8={include_pay_stub_entry_account:this.current_edit_record.l8_include_pay_stub_entry_account,exclude_pay_stub_entry_account:this.current_edit_record.l8_exclude_pay_stub_entry_account},e.l10={include_pay_stub_entry_account:this.current_edit_record.l10_include_pay_stub_entry_account,exclude_pay_stub_entry_account:this.current_edit_record.l10_exclude_pay_stub_entry_account},e.l11={include_pay_stub_entry_account:this.current_edit_record.l11_include_pay_stub_entry_account,exclude_pay_stub_entry_account:this.current_edit_record.l11_exclude_pay_stub_entry_account},e.l12a={include_pay_stub_entry_account:this.current_edit_record.l12a_include_pay_stub_entry_account,exclude_pay_stub_entry_account:this.current_edit_record.l12a_exclude_pay_stub_entry_account},e.l12b={include_pay_stub_entry_account:this.current_edit_record.l12b_include_pay_stub_entry_account,exclude_pay_stub_entry_account:this.current_edit_record.l12b_exclude_pay_stub_entry_account},e.l12c={include_pay_stub_entry_account:this.current_edit_record.l12c_include_pay_stub_entry_account,exclude_pay_stub_entry_account:this.current_edit_record.l12c_exclude_pay_stub_entry_account},e.l12d={include_pay_stub_entry_account:this.current_edit_record.l12d_include_pay_stub_entry_account,exclude_pay_stub_entry_account:this.current_edit_record.l12d_exclude_pay_stub_entry_account},e.l13b={company_deduction:this.current_edit_record.l13b_company_deduction},e.l14a={include_pay_stub_entry_account:this.current_edit_record.l14a_include_pay_stub_entry_account,exclude_pay_stub_entry_account:this.current_edit_record.l14a_exclude_pay_stub_entry_account},e.l14b={include_pay_stub_entry_account:this.current_edit_record.l14b_include_pay_stub_entry_account,exclude_pay_stub_entry_account:this.current_edit_record.l14b_exclude_pay_stub_entry_account},e.l14c={include_pay_stub_entry_account:this.current_edit_record.l14c_include_pay_stub_entry_account,exclude_pay_stub_entry_account:this.current_edit_record.l14c_exclude_pay_stub_entry_account},e.l14d={include_pay_stub_entry_account:this.current_edit_record.l14d_include_pay_stub_entry_account,exclude_pay_stub_entry_account:this.current_edit_record.l14d_exclude_pay_stub_entry_account},e.l12a_code=this.current_edit_record.l12a_code,e.l12b_code=this.current_edit_record.l12b_code,e.l12c_code=this.current_edit_record.l12c_code,e.l12d_code=this.current_edit_record.l12d_code,e.l14a_name=this.current_edit_record.l14a_name,e.l14b_name=this.current_edit_record.l14b_name,e.l14c_name=this.current_edit_record.l14c_name,e.l14d_name=this.current_edit_record.l14d_name,e}setFormSetupData(e){e||(this.show_empty_message=!0),e&&(e.form_type&&(this.edit_view_ui_dic.form_type.setValue(e.form_type),this.current_edit_record.form_type=e.form_type),e.kind_of_employer&&(this.edit_view_ui_dic.kind_of_employer.setValue(e.kind_of_employer),this.current_edit_record.kind_of_employer=e.kind_of_employer),e.l1&&(this.edit_view_ui_dic.l1_exclude_pay_stub_entry_account.setValue(e.l1.exclude_pay_stub_entry_account),this.edit_view_ui_dic.l1_include_pay_stub_entry_account.setValue(e.l1.include_pay_stub_entry_account),this.current_edit_record.l1_include_pay_stub_entry_account=e.l1.include_pay_stub_entry_account,this.current_edit_record.l1_exclude_pay_stub_entry_account=e.l1.exclude_pay_stub_entry_account),e.l2&&(this.edit_view_ui_dic.l2_exclude_pay_stub_entry_account.setValue(e.l2.exclude_pay_stub_entry_account),this.edit_view_ui_dic.l2_include_pay_stub_entry_account.setValue(e.l2.include_pay_stub_entry_account),this.current_edit_record.l2_include_pay_stub_entry_account=e.l2.include_pay_stub_entry_account,this.current_edit_record.l2_exclude_pay_stub_entry_account=e.l2.exclude_pay_stub_entry_account),e.l3&&(this.edit_view_ui_dic.l3_exclude_pay_stub_entry_account.setValue(e.l3.exclude_pay_stub_entry_account),this.edit_view_ui_dic.l3_include_pay_stub_entry_account.setValue(e.l3.include_pay_stub_entry_account),this.current_edit_record.l3_include_pay_stub_entry_account=e.l3.include_pay_stub_entry_account,this.current_edit_record.l3_exclude_pay_stub_entry_account=e.l3.exclude_pay_stub_entry_account),e.l4&&(this.edit_view_ui_dic.l4_exclude_pay_stub_entry_account.setValue(e.l4.exclude_pay_stub_entry_account),this.edit_view_ui_dic.l4_include_pay_stub_entry_account.setValue(e.l4.include_pay_stub_entry_account),this.current_edit_record.l4_include_pay_stub_entry_account=e.l4.include_pay_stub_entry_account,this.current_edit_record.l4_exclude_pay_stub_entry_account=e.l4.exclude_pay_stub_entry_account),e.l5&&(this.edit_view_ui_dic.l5_exclude_pay_stub_entry_account.setValue(e.l5.exclude_pay_stub_entry_account),this.edit_view_ui_dic.l5_include_pay_stub_entry_account.setValue(e.l5.include_pay_stub_entry_account),this.current_edit_record.l5_include_pay_stub_entry_account=e.l5.include_pay_stub_entry_account,this.current_edit_record.l5_exclude_pay_stub_entry_account=e.l5.exclude_pay_stub_entry_account),e.l6&&(this.edit_view_ui_dic.l6_exclude_pay_stub_entry_account.setValue(e.l6.exclude_pay_stub_entry_account),this.edit_view_ui_dic.l6_include_pay_stub_entry_account.setValue(e.l6.include_pay_stub_entry_account),this.current_edit_record.l6_include_pay_stub_entry_account=e.l6.include_pay_stub_entry_account,this.current_edit_record.l6_exclude_pay_stub_entry_account=e.l6.exclude_pay_stub_entry_account),e.l7&&(this.edit_view_ui_dic.l7_exclude_pay_stub_entry_account.setValue(e.l7.exclude_pay_stub_entry_account),this.edit_view_ui_dic.l7_include_pay_stub_entry_account.setValue(e.l7.include_pay_stub_entry_account),this.current_edit_record.l7_include_pay_stub_entry_account=e.l7.include_pay_stub_entry_account,this.current_edit_record.l7_exclude_pay_stub_entry_account=e.l7.exclude_pay_stub_entry_account),e.l8&&(this.edit_view_ui_dic.l8_exclude_pay_stub_entry_account.setValue(e.l8.exclude_pay_stub_entry_account),this.edit_view_ui_dic.l8_include_pay_stub_entry_account.setValue(e.l8.include_pay_stub_entry_account),this.current_edit_record.l8_include_pay_stub_entry_account=e.l8.include_pay_stub_entry_account,this.current_edit_record.l8_exclude_pay_stub_entry_account=e.l8.exclude_pay_stub_entry_account),e.l10&&(this.edit_view_ui_dic.l10_exclude_pay_stub_entry_account.setValue(e.l10.exclude_pay_stub_entry_account),this.edit_view_ui_dic.l10_include_pay_stub_entry_account.setValue(e.l10.include_pay_stub_entry_account),this.current_edit_record.l10_include_pay_stub_entry_account=e.l10.include_pay_stub_entry_account,this.current_edit_record.l10_exclude_pay_stub_entry_account=e.l10.exclude_pay_stub_entry_account),e.l11&&(this.edit_view_ui_dic.l11_exclude_pay_stub_entry_account.setValue(e.l11.exclude_pay_stub_entry_account),this.edit_view_ui_dic.l11_include_pay_stub_entry_account.setValue(e.l11.include_pay_stub_entry_account),this.current_edit_record.l11_include_pay_stub_entry_account=e.l11.include_pay_stub_entry_account,this.current_edit_record.l11_exclude_pay_stub_entry_account=e.l11.exclude_pay_stub_entry_account),e.l12a&&(this.edit_view_ui_dic.l12a_exclude_pay_stub_entry_account.setValue(e.l12a.exclude_pay_stub_entry_account),this.edit_view_ui_dic.l12a_include_pay_stub_entry_account.setValue(e.l12a.include_pay_stub_entry_account),this.current_edit_record.l12a_include_pay_stub_entry_account=e.l12a.include_pay_stub_entry_account,this.current_edit_record.l12a_exclude_pay_stub_entry_account=e.l12a.exclude_pay_stub_entry_account),e.l12b&&(this.edit_view_ui_dic.l12b_exclude_pay_stub_entry_account.setValue(e.l12b.exclude_pay_stub_entry_account),this.edit_view_ui_dic.l12b_include_pay_stub_entry_account.setValue(e.l12b.include_pay_stub_entry_account),this.current_edit_record.l12b_include_pay_stub_entry_account=e.l12b.include_pay_stub_entry_account,this.current_edit_record.l12b_exclude_pay_stub_entry_account=e.l12b.exclude_pay_stub_entry_account),e.l12c&&(this.edit_view_ui_dic.l12c_exclude_pay_stub_entry_account.setValue(e.l12c.exclude_pay_stub_entry_account),this.edit_view_ui_dic.l12c_include_pay_stub_entry_account.setValue(e.l12c.include_pay_stub_entry_account),this.current_edit_record.l12c_include_pay_stub_entry_account=e.l12c.include_pay_stub_entry_account,this.current_edit_record.l12c_exclude_pay_stub_entry_account=e.l12c.exclude_pay_stub_entry_account),e.l12d&&(this.edit_view_ui_dic.l12d_exclude_pay_stub_entry_account.setValue(e.l12d.exclude_pay_stub_entry_account),this.edit_view_ui_dic.l12d_include_pay_stub_entry_account.setValue(e.l12d.include_pay_stub_entry_account),this.current_edit_record.l12d_include_pay_stub_entry_account=e.l12d.include_pay_stub_entry_account,this.current_edit_record.l12d_exclude_pay_stub_entry_account=e.l12d.exclude_pay_stub_entry_account),e.l13b&&(this.edit_view_ui_dic.l13b_company_deduction.setValue(e.l13b.company_deduction),this.current_edit_record.l13b_company_deduction=e.l13b.company_deduction),e.l14a&&(this.edit_view_ui_dic.l14a_exclude_pay_stub_entry_account.setValue(e.l14a.exclude_pay_stub_entry_account),this.edit_view_ui_dic.l14a_include_pay_stub_entry_account.setValue(e.l14a.include_pay_stub_entry_account),this.current_edit_record.l14a_include_pay_stub_entry_account=e.l14a.include_pay_stub_entry_account,this.current_edit_record.l14a_exclude_pay_stub_entry_account=e.l14a.exclude_pay_stub_entry_account),e.l14b&&(this.edit_view_ui_dic.l14b_exclude_pay_stub_entry_account.setValue(e.l14b.exclude_pay_stub_entry_account),this.edit_view_ui_dic.l14b_include_pay_stub_entry_account.setValue(e.l14b.include_pay_stub_entry_account),this.current_edit_record.l14b_include_pay_stub_entry_account=e.l14b.include_pay_stub_entry_account,this.current_edit_record.l14b_exclude_pay_stub_entry_account=e.l14b.exclude_pay_stub_entry_account),e.l14c&&(this.edit_view_ui_dic.l14c_exclude_pay_stub_entry_account.setValue(e.l14c.exclude_pay_stub_entry_account),this.edit_view_ui_dic.l14c_include_pay_stub_entry_account.setValue(e.l14c.include_pay_stub_entry_account),this.current_edit_record.l14c_include_pay_stub_entry_account=e.l14c.include_pay_stub_entry_account,this.current_edit_record.l14c_exclude_pay_stub_entry_account=e.l14c.exclude_pay_stub_entry_account),e.l14d&&(this.edit_view_ui_dic.l14d_exclude_pay_stub_entry_account.setValue(e.l14d.exclude_pay_stub_entry_account),this.edit_view_ui_dic.l14d_include_pay_stub_entry_account.setValue(e.l14d.include_pay_stub_entry_account),this.current_edit_record.l14d_include_pay_stub_entry_account=e.l14d.include_pay_stub_entry_account,this.current_edit_record.l14d_exclude_pay_stub_entry_account=e.l14d.exclude_pay_stub_entry_account),e.l12a_code&&(this.edit_view_ui_dic.l12a_code.setValue(e.l12a_code),this.current_edit_record.l12a_code=e.l12a_code),e.l12a_code&&(this.edit_view_ui_dic.l12b_code.setValue(e.l12b_code),this.current_edit_record.l12b_code=e.l12b_code),e.l12c_code&&(this.edit_view_ui_dic.l12c_code.setValue(e.l12c_code),this.current_edit_record.l12c_code=e.l12c_code),e.l12d_code&&(this.edit_view_ui_dic.l12d_code.setValue(e.l12d_code),this.current_edit_record.l12d_code=e.l12d_code),e.l14a_name&&(this.edit_view_ui_dic.l14a_name.setValue(e.l14a_name),this.current_edit_record.l14a_name=e.l14a_name),e.l14b_name&&(this.edit_view_ui_dic.l14b_name.setValue(e.l14b_name),this.current_edit_record.l14b_name=e.l14b_name),e.l14c_name&&(this.edit_view_ui_dic.l14c_name.setValue(e.l14c_name),this.current_edit_record.l14c_name=e.l14c_name),e.l14d_name&&(this.edit_view_ui_dic.l14d_name.setValue(e.l14d_name),this.current_edit_record.l14d_name=e.l14d_name))}}}}]);
//# sourceMappingURL=reports-formw2-FormW2ReportViewController.bundle.js.map?v=317f50c68a2e05c946c4