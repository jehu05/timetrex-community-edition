(self.webpackChunktimetrex=self.webpackChunktimetrex||[]).push([["reports-t4a_summary-T4ASummaryReportViewController"],{9994:(e,t,o)=>{"use strict";o.r(t),o.d(t,{"T4ASummaryReportViewController":()=>n});class n extends ReportBaseViewController{constructor(e={}){_.defaults(e,{type_array:null}),super(e)}initReport(e){this.script_name="T4ASummaryReport",this.viewId="T4ASummaryReport",this.context_menu_name=$.i18n._("T4A Summary"),this.navigation_label=$.i18n._("Saved Report")+":",this.view_file="T4ASummaryReportView.html",this.api=TTAPI.APIT4ASummaryReport,this.include_form_setup=!0}getCustomContextMenuModel(){var e={groups:{form:{label:$.i18n._("Form"),id:this.viewId+"Form"}},exclude:[],include:[{label:$.i18n._("eFile"),id:ContextMenuIconName.e_file_xml,group:"form",icon:Icons.e_file},{label:$.i18n._("Save Setup"),id:ContextMenuIconName.save_setup,group:"form",icon:Icons.save_setup}]},t={label:$.i18n._("View"),id:ContextMenuIconName.view_print,group:"form",icon:"view-35x35.png",type:RibbonSubMenuType.NAVIGATION,items:[{label:$.i18n._("Government (Multiple Employees/Page)"),id:"pdf_form_government"},{label:$.i18n._("Employee (One Employee/Page)"),id:"pdf_form"}],permission_result:!0,permission:!0};return Global.getProductEdition()>=15&&t.items.push({label:$.i18n._("Publish Employee Forms"),id:"pdf_form_publish_employee"}),e.include.unshift(t),e}initOptions(e){var t=this;this.initDropDownOptions([{option_name:"page_orientation"},{option_name:"font_size"},{option_name:"chart_display_mode"},{option_name:"chart_type"},{option_name:"templates"},{option_name:"setup_fields"},{option_name:"type"},{option_name:"auto_refresh"}],(function(_){TTAPI.APICompany.getOptions("province","CA",{onResult:function(o){t.province_array=Global.buildRecordArray(o.getResult()),e(_)}})}))}onCustomContextClick(e){switch(e){case ContextMenuIconName.e_file_xml:this.onViewClick("efile_xml");break;default:return!1}return!0}onReportMenuClick(e){this.onViewClick(e)}buildFormSetupUI(){var e=this,t=this.edit_view_tab.find("#tab_form_setup").find(".first-column");this.edit_view_tabs[3]=[],this.edit_view_tabs[3].push(t);var _=Global.loadWidgetByName(FormItemType.COMBO_BOX);_.TComboBox({field:"status_id",set_empty:!1}),_.setSourceData(e.type_array),this.addEditFieldToColumn($.i18n._("Status"),_,t);var o=$("<div class='v-box'></div>");(_=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({api_class:TTAPI.APIPayStubEntryAccount,allow_multiple_selection:!0,layout_name:"global_PayStubAccount",show_search_inputs:!0,set_empty:!0,field:"pension_include_pay_stub_entry_account"});var n=this.putInputToInsideFormItem(_,$.i18n._("Include"));o.append(n),o.append("<div class='clear-both-div'></div>");var i=Global.loadWidgetByName(FormItemType.AWESOME_BOX);i.AComboBox({api_class:TTAPI.APIPayStubEntryAccount,allow_multiple_selection:!0,layout_name:"global_PayStubAccount",show_search_inputs:!0,set_empty:!0,field:"pension_exclude_pay_stub_entry_account"}),n=this.putInputToInsideFormItem(i,$.i18n._("Exclude")),o.append(n),this.addEditFieldToColumn($.i18n._("Pension Or Superannuation (Box: 16)"),[_,i],t,"",o,!1,!0),o=$("<div class='v-box'></div>"),(_=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({api_class:TTAPI.APIPayStubEntryAccount,allow_multiple_selection:!0,layout_name:"global_PayStubAccount",show_search_inputs:!0,set_empty:!0,field:"lump_sum_payment_include_pay_stub_entry_account"}),n=this.putInputToInsideFormItem(_,$.i18n._("Include")),o.append(n),o.append("<div class='clear-both-div'></div>"),(i=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({api_class:TTAPI.APIPayStubEntryAccount,allow_multiple_selection:!0,layout_name:"global_PayStubAccount",show_search_inputs:!0,set_empty:!0,field:"lump_sum_payment_exclude_pay_stub_entry_account"}),n=this.putInputToInsideFormItem(i,$.i18n._("Exclude")),o.append(n),this.addEditFieldToColumn($.i18n._("Lump-sum Payments (Box: 18)"),[_,i],t,"",o,!1,!0),o=$("<div class='v-box'></div>"),(_=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({api_class:TTAPI.APIPayStubEntryAccount,allow_multiple_selection:!0,layout_name:"global_PayStubAccount",show_search_inputs:!0,set_empty:!0,field:"self_employed_commission_include_pay_stub_entry_account"}),n=this.putInputToInsideFormItem(_,$.i18n._("Include")),o.append(n),o.append("<div class='clear-both-div'></div>"),(i=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({api_class:TTAPI.APIPayStubEntryAccount,allow_multiple_selection:!0,layout_name:"global_PayStubAccount",show_search_inputs:!0,set_empty:!0,field:"self_employed_commission_exclude_pay_stub_entry_account"}),n=this.putInputToInsideFormItem(i,$.i18n._("Exclude")),o.append(n),this.addEditFieldToColumn($.i18n._("Self-Employed Commisions  (Box: 20)"),[_,i],t,"",o,!1,!0),o=$("<div class='v-box'></div>"),(_=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({api_class:TTAPI.APIPayStubEntryAccount,allow_multiple_selection:!0,layout_name:"global_PayStubAccount",show_search_inputs:!0,set_empty:!0,field:"income_tax_include_pay_stub_entry_account"}),n=this.putInputToInsideFormItem(_,$.i18n._("Include")),o.append(n),o.append("<div class='clear-both-div'></div>"),(i=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({api_class:TTAPI.APIPayStubEntryAccount,allow_multiple_selection:!0,layout_name:"global_PayStubAccount",show_search_inputs:!0,set_empty:!0,field:"income_tax_exclude_pay_stub_entry_account"}),n=this.putInputToInsideFormItem(i,$.i18n._("Exclude")),o.append(n),this.addEditFieldToColumn($.i18n._("Income Tax Deducted (Box 22)"),[_,i],t,"",o,!1,!0),o=$("<div class='v-box'></div>"),(_=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({api_class:TTAPI.APIPayStubEntryAccount,allow_multiple_selection:!0,layout_name:"global_PayStubAccount",show_search_inputs:!0,set_empty:!0,field:"annuities_include_pay_stub_entry_account"}),n=this.putInputToInsideFormItem(_,$.i18n._("Include")),o.append(n),o.append("<div class='clear-both-div'></div>"),(i=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({api_class:TTAPI.APIPayStubEntryAccount,allow_multiple_selection:!0,layout_name:"global_PayStubAccount",show_search_inputs:!0,set_empty:!0,field:"annuities_exclude_pay_stub_entry_account"}),n=this.putInputToInsideFormItem(i,$.i18n._("Exclude")),o.append(n),this.addEditFieldToColumn($.i18n._("Annuities (Box 24)"),[_,i],t,"",o,!1,!0),o=$("<div class='v-box'></div>"),(_=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({api_class:TTAPI.APIPayStubEntryAccount,allow_multiple_selection:!0,layout_name:"global_PayStubAccount",show_search_inputs:!0,set_empty:!0,field:"service_fees_include_pay_stub_entry_account"}),n=this.putInputToInsideFormItem(_,$.i18n._("Include")),o.append(n),o.append("<div class='clear-both-div'></div>"),(i=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({api_class:TTAPI.APIPayStubEntryAccount,allow_multiple_selection:!0,layout_name:"global_PayStubAccount",show_search_inputs:!0,set_empty:!0,field:"service_fees_exclude_pay_stub_entry_account"}),n=this.putInputToInsideFormItem(i,$.i18n._("Exclude")),o.append(n),this.addEditFieldToColumn($.i18n._("Fees for Services (Box: 48)"),[_,i],t,"",o,!1,!0),o=$("<div class='v-box'></div>"),(_=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({api_class:TTAPI.APIPayStubEntryAccount,allow_multiple_selection:!0,layout_name:"global_PayStubAccount",show_search_inputs:!0,set_empty:!0,field:"box_0_include_pay_stub_entry_account"}),n=this.putInputToInsideFormItem(_,$.i18n._("Include")),o.append(n),o.append("<div class='clear-both-div'></div>"),(i=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({api_class:TTAPI.APIPayStubEntryAccount,allow_multiple_selection:!0,layout_name:"global_PayStubAccount",show_search_inputs:!0,set_empty:!0,field:"box_0_exclude_pay_stub_entry_account"}),n=this.putInputToInsideFormItem(i,$.i18n._("Exclude")),o.append(n);var u=$("<div class='h-box'></div>"),c=$('<span class="edit-view-form-item-label"></span>'),a=Global.loadWidgetByName(FormItemType.TEXT_INPUT);a.TTextInput({field:"box_0_box",width:50}),a.css("float","right"),a.bind("formItemChange",(function(t,_){e.onFormItemChange(_)})),c.text($.i18n._("Box")),this.edit_view_ui_dic[a.getField()]=a,u.append(a),u.append(c),this.addEditFieldToColumn($.i18n._("Box"),[_,i],t,"",o,!1,!0,!1,!1,u),o=$("<div class='v-box'></div>"),(_=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({api_class:TTAPI.APIPayStubEntryAccount,allow_multiple_selection:!0,layout_name:"global_PayStubAccount",show_search_inputs:!0,set_empty:!0,field:"box_1_include_pay_stub_entry_account"}),n=this.putInputToInsideFormItem(_,$.i18n._("Include")),o.append(n),o.append("<div class='clear-both-div'></div>"),(i=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({api_class:TTAPI.APIPayStubEntryAccount,allow_multiple_selection:!0,layout_name:"global_PayStubAccount",show_search_inputs:!0,set_empty:!0,field:"box_1_exclude_pay_stub_entry_account"}),n=this.putInputToInsideFormItem(i,$.i18n._("Exclude")),o.append(n),u=$("<div class='h-box'></div>"),c=$('<span class="edit-view-form-item-label"></span>'),(a=Global.loadWidgetByName(FormItemType.TEXT_INPUT)).TTextInput({field:"box_1_box",width:50}),a.css("float","right"),a.bind("formItemChange",(function(t,_){e.onFormItemChange(_)})),c.text($.i18n._("Box")),this.edit_view_ui_dic[a.getField()]=a,u.append(a),u.append(c),this.addEditFieldToColumn($.i18n._("Box"),[_,i],t,"",o,!1,!0,!1,!1,u),o=$("<div class='v-box'></div>"),(_=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({api_class:TTAPI.APIPayStubEntryAccount,allow_multiple_selection:!0,layout_name:"global_PayStubAccount",show_search_inputs:!0,set_empty:!0,field:"box_2_include_pay_stub_entry_account"}),n=this.putInputToInsideFormItem(_,$.i18n._("Include")),o.append(n),o.append("<div class='clear-both-div'></div>"),(i=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({api_class:TTAPI.APIPayStubEntryAccount,allow_multiple_selection:!0,layout_name:"global_PayStubAccount",show_search_inputs:!0,set_empty:!0,field:"box_2_exclude_pay_stub_entry_account"}),n=this.putInputToInsideFormItem(i,$.i18n._("Exclude")),o.append(n),u=$("<div class='h-box'></div>"),c=$('<span class="edit-view-form-item-label"></span>'),(a=Global.loadWidgetByName(FormItemType.TEXT_INPUT)).TTextInput({field:"box_2_box",width:50}),a.css("float","right"),a.bind("formItemChange",(function(t,_){e.onFormItemChange(_)})),c.text($.i18n._("Box")),this.edit_view_ui_dic[a.getField()]=a,u.append(a),u.append(c),this.addEditFieldToColumn($.i18n._("Box"),[_,i],t,"",o,!1,!0,!1,!1,u),o=$("<div class='v-box'></div>"),(_=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({api_class:TTAPI.APIPayStubEntryAccount,allow_multiple_selection:!0,layout_name:"global_PayStubAccount",show_search_inputs:!0,set_empty:!0,field:"box_3_include_pay_stub_entry_account"}),n=this.putInputToInsideFormItem(_,$.i18n._("Include")),o.append(n),o.append("<div class='clear-both-div'></div>"),(i=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({api_class:TTAPI.APIPayStubEntryAccount,allow_multiple_selection:!0,layout_name:"global_PayStubAccount",show_search_inputs:!0,set_empty:!0,field:"box_3_exclude_pay_stub_entry_account"}),n=this.putInputToInsideFormItem(i,$.i18n._("Exclude")),o.append(n),u=$("<div class='h-box'></div>"),c=$('<span class="edit-view-form-item-label"></span>'),(a=Global.loadWidgetByName(FormItemType.TEXT_INPUT)).TTextInput({field:"box_3_box",width:50}),a.css("float","right"),a.bind("formItemChange",(function(t,_){e.onFormItemChange(_)})),c.text($.i18n._("Box")),this.edit_view_ui_dic[a.getField()]=a,u.append(a),u.append(c),this.addEditFieldToColumn($.i18n._("Box"),[_,i],t,"",o,!1,!0,!1,!1,u),o=$("<div class='v-box'></div>"),(_=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({api_class:TTAPI.APIPayStubEntryAccount,allow_multiple_selection:!0,layout_name:"global_PayStubAccount",show_search_inputs:!0,set_empty:!0,field:"box_4_include_pay_stub_entry_account"}),n=this.putInputToInsideFormItem(_,$.i18n._("Include")),o.append(n),o.append("<div class='clear-both-div'></div>"),(i=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({api_class:TTAPI.APIPayStubEntryAccount,allow_multiple_selection:!0,layout_name:"global_PayStubAccount",show_search_inputs:!0,set_empty:!0,field:"box_4_exclude_pay_stub_entry_account"}),n=this.putInputToInsideFormItem(i,$.i18n._("Exclude")),o.append(n),u=$("<div class='h-box'></div>"),c=$('<span class="edit-view-form-item-label"></span>'),(a=Global.loadWidgetByName(FormItemType.TEXT_INPUT)).TTextInput({field:"box_4_box",width:50}),a.css("float","right"),a.bind("formItemChange",(function(t,_){e.onFormItemChange(_)})),c.text($.i18n._("Box")),this.edit_view_ui_dic[a.getField()]=a,u.append(a),u.append(c),this.addEditFieldToColumn($.i18n._("Box"),[_,i],t,"",o,!1,!0,!1,!1,u),(_=Global.loadWidgetByName(FormItemType.TEXT_INPUT)).TTextInput({field:"remittances_paid",width:120}),this.addEditFieldToColumn($.i18n._("Remittances Paid in Year"),_,t)}getFormSetupData(){var e={};return e.pension={include_pay_stub_entry_account:this.current_edit_record.pension_include_pay_stub_entry_account,exclude_pay_stub_entry_account:this.current_edit_record.pension_exclude_pay_stub_entry_account},e.lump_sum_payment={include_pay_stub_entry_account:this.current_edit_record.lump_sum_payment_include_pay_stub_entry_account,exclude_pay_stub_entry_account:this.current_edit_record.lump_sum_payment_exclude_pay_stub_entry_account},e.self_employed_commission={include_pay_stub_entry_account:this.current_edit_record.self_employed_commission_include_pay_stub_entry_account,exclude_pay_stub_entry_account:this.current_edit_record.self_employed_commission_exclude_pay_stub_entry_account},e.income_tax={include_pay_stub_entry_account:this.current_edit_record.income_tax_include_pay_stub_entry_account,exclude_pay_stub_entry_account:this.current_edit_record.income_tax_exclude_pay_stub_entry_account},e.annuities={include_pay_stub_entry_account:this.current_edit_record.annuities_include_pay_stub_entry_account,exclude_pay_stub_entry_account:this.current_edit_record.annuities_exclude_pay_stub_entry_account},e.service_fees={include_pay_stub_entry_account:this.current_edit_record.service_fees_include_pay_stub_entry_account,exclude_pay_stub_entry_account:this.current_edit_record.service_fees_exclude_pay_stub_entry_account},e.other_box=[],e.other_box.push({box:this.current_edit_record.box_0_box,include_pay_stub_entry_account:this.current_edit_record.box_0_include_pay_stub_entry_account,exclude_pay_stub_entry_account:this.current_edit_record.box_0_exclude_pay_stub_entry_account}),e.other_box.push({box:this.current_edit_record.box_1_box,include_pay_stub_entry_account:this.current_edit_record.box_1_include_pay_stub_entry_account,exclude_pay_stub_entry_account:this.current_edit_record.box_1_exclude_pay_stub_entry_account}),e.other_box.push({box:this.current_edit_record.box_2_box,include_pay_stub_entry_account:this.current_edit_record.box_2_include_pay_stub_entry_account,exclude_pay_stub_entry_account:this.current_edit_record.box_2_exclude_pay_stub_entry_account}),e.other_box.push({box:this.current_edit_record.box_3_box,include_pay_stub_entry_account:this.current_edit_record.box_3_include_pay_stub_entry_account,exclude_pay_stub_entry_account:this.current_edit_record.box_3_exclude_pay_stub_entry_account}),e.other_box.push({box:this.current_edit_record.box_4_box,include_pay_stub_entry_account:this.current_edit_record.box_4_include_pay_stub_entry_account,exclude_pay_stub_entry_account:this.current_edit_record.box_4_exclude_pay_stub_entry_account}),e.status_id=this.current_edit_record.status_id,e.remittances_paid=this.current_edit_record.remittances_paid,e}setFormSetupData(e){e||(this.show_empty_message=!0),e&&(e.pension&&(this.edit_view_ui_dic.pension_exclude_pay_stub_entry_account.setValue(e.pension.exclude_pay_stub_entry_account),this.edit_view_ui_dic.pension_include_pay_stub_entry_account.setValue(e.pension.include_pay_stub_entry_account),this.current_edit_record.pension_include_pay_stub_entry_account=e.pension.include_pay_stub_entry_account,this.current_edit_record.pension_exclude_pay_stub_entry_account=e.pension.exclude_pay_stub_entry_account),e.lump_sum_payment&&(this.edit_view_ui_dic.lump_sum_payment_exclude_pay_stub_entry_account.setValue(e.lump_sum_payment.exclude_pay_stub_entry_account),this.edit_view_ui_dic.lump_sum_payment_include_pay_stub_entry_account.setValue(e.lump_sum_payment.include_pay_stub_entry_account),this.current_edit_record.lump_sum_payment_include_pay_stub_entry_account=e.lump_sum_payment.include_pay_stub_entry_account,this.current_edit_record.lump_sum_payment_exclude_pay_stub_entry_account=e.lump_sum_payment.exclude_pay_stub_entry_account),e.self_employed_commission&&(this.edit_view_ui_dic.self_employed_commission_exclude_pay_stub_entry_account.setValue(e.self_employed_commission.exclude_pay_stub_entry_account),this.edit_view_ui_dic.self_employed_commission_include_pay_stub_entry_account.setValue(e.self_employed_commission.include_pay_stub_entry_account),this.current_edit_record.self_employed_commission_include_pay_stub_entry_account=e.self_employed_commission.include_pay_stub_entry_account,this.current_edit_record.self_employed_commission_exclude_pay_stub_entry_account=e.self_employed_commission.exclude_pay_stub_entry_account),e.income_tax&&(this.edit_view_ui_dic.income_tax_exclude_pay_stub_entry_account.setValue(e.income_tax.exclude_pay_stub_entry_account),this.edit_view_ui_dic.income_tax_include_pay_stub_entry_account.setValue(e.income_tax.include_pay_stub_entry_account),this.current_edit_record.income_tax_include_pay_stub_entry_account=e.income_tax.include_pay_stub_entry_account,this.current_edit_record.income_tax_exclude_pay_stub_entry_account=e.income_tax.exclude_pay_stub_entry_account),e.annuities&&(this.edit_view_ui_dic.annuities_exclude_pay_stub_entry_account.setValue(e.annuities.exclude_pay_stub_entry_account),this.edit_view_ui_dic.annuities_include_pay_stub_entry_account.setValue(e.annuities.include_pay_stub_entry_account),this.current_edit_record.annuities_include_pay_stub_entry_account=e.annuities.include_pay_stub_entry_account,this.current_edit_record.annuities_exclude_pay_stub_entry_account=e.annuities.exclude_pay_stub_entry_account),e.service_fees&&(this.edit_view_ui_dic.service_fees_exclude_pay_stub_entry_account.setValue(e.service_fees.exclude_pay_stub_entry_account),this.edit_view_ui_dic.service_fees_include_pay_stub_entry_account.setValue(e.service_fees.include_pay_stub_entry_account),this.current_edit_record.service_fees_include_pay_stub_entry_account=e.service_fees.include_pay_stub_entry_account,this.current_edit_record.service_fees_exclude_pay_stub_entry_account=e.service_fees.exclude_pay_stub_entry_account),e.status_id&&(this.edit_view_ui_dic.status_id.setValue(e.status_id),this.current_edit_record.status_id=e.status_id),e.remittances_paid&&(this.edit_view_ui_dic.remittances_paid.setValue(e.remittances_paid),this.current_edit_record.remittances_paid=e.remittances_paid),e.other_box&&(e.other_box[0]&&(this.edit_view_ui_dic.box_0_box.setValue(e.other_box[0].box),this.edit_view_ui_dic.box_0_exclude_pay_stub_entry_account.setValue(e.other_box[0].exclude_pay_stub_entry_account),this.edit_view_ui_dic.box_0_include_pay_stub_entry_account.setValue(e.other_box[0].include_pay_stub_entry_account),this.current_edit_record.box_0_box=e.other_box[0].box,this.current_edit_record.box_0_include_pay_stub_entry_account=e.other_box[0].include_pay_stub_entry_account,this.current_edit_record.box_0_exclude_pay_stub_entry_account=e.other_box[0].exclude_pay_stub_entry_account),e.other_box[1]&&(this.edit_view_ui_dic.box_1_box.setValue(e.other_box[1].box),this.edit_view_ui_dic.box_1_exclude_pay_stub_entry_account.setValue(e.other_box[1].exclude_pay_stub_entry_account),this.edit_view_ui_dic.box_1_include_pay_stub_entry_account.setValue(e.other_box[1].include_pay_stub_entry_account),this.current_edit_record.box_1_box=e.other_box[1].box,this.current_edit_record.box_1_include_pay_stub_entry_account=e.other_box[1].include_pay_stub_entry_account,this.current_edit_record.box_1_exclude_pay_stub_entry_account=e.other_box[1].exclude_pay_stub_entry_account),e.other_box[2]&&(this.edit_view_ui_dic.box_2_box.setValue(e.other_box[2].box),this.edit_view_ui_dic.box_2_exclude_pay_stub_entry_account.setValue(e.other_box[2].exclude_pay_stub_entry_account),this.edit_view_ui_dic.box_2_include_pay_stub_entry_account.setValue(e.other_box[2].include_pay_stub_entry_account),this.current_edit_record.box_2_box=e.other_box[2].box,this.current_edit_record.box_2_include_pay_stub_entry_account=e.other_box[2].include_pay_stub_entry_account,this.current_edit_record.box_2_exclude_pay_stub_entry_account=e.other_box[2].exclude_pay_stub_entry_account),e.other_box[3]&&(this.edit_view_ui_dic.box_3_box.setValue(e.other_box[3].box),this.edit_view_ui_dic.box_3_exclude_pay_stub_entry_account.setValue(e.other_box[3].exclude_pay_stub_entry_account),this.edit_view_ui_dic.box_3_include_pay_stub_entry_account.setValue(e.other_box[3].include_pay_stub_entry_account),this.current_edit_record.box_3_box=e.other_box[3].box,this.current_edit_record.box_3_include_pay_stub_entry_account=e.other_box[3].include_pay_stub_entry_account,this.current_edit_record.box_3_exclude_pay_stub_entry_account=e.other_box[3].exclude_pay_stub_entry_account),e.other_box[4]&&(this.edit_view_ui_dic.box_4_box.setValue(e.other_box[4].box),this.edit_view_ui_dic.box_4_exclude_pay_stub_entry_account.setValue(e.other_box[4].exclude_pay_stub_entry_account),this.edit_view_ui_dic.box_4_include_pay_stub_entry_account.setValue(e.other_box[4].include_pay_stub_entry_account),this.current_edit_record.box_4_box=e.other_box[4].box,this.current_edit_record.box_4_include_pay_stub_entry_account=e.other_box[4].include_pay_stub_entry_account,this.current_edit_record.box_4_exclude_pay_stub_entry_account=e.other_box[4].exclude_pay_stub_entry_account),e.other_box[5]&&(this.edit_view_ui_dic.box_5_box.setValue(e.other_box[5].box),this.edit_view_ui_dic.box_5_exclude_pay_stub_entry_account.setValue(e.other_box[5].exclude_pay_stub_entry_account),this.edit_view_ui_dic.box_5_include_pay_stub_entry_account.setValue(e.other_box[5].include_pay_stub_entry_account),this.current_edit_record.box_5_box=e.other_box[5].box,this.current_edit_record.box_5_include_pay_stub_entry_account=e.other_box[5].include_pay_stub_entry_account,this.current_edit_record.box_5_exclude_pay_stub_entry_account=e.other_box[5].exclude_pay_stub_entry_account)))}}}}]);
//# sourceMappingURL=reports-t4a_summary-T4ASummaryReportViewController.bundle.js.map?v=397d45a1f022a2d31c28