(self.webpackChunktimetrex=self.webpackChunktimetrex||[]).push([["invoice-invoice-InvoiceViewController"],{4585:(e,t,i)=>{"use strict";i.r(t),i.d(t,{"InvoiceViewController":()=>n});class n extends BaseViewController{constructor(e={}){_.defaults(e,{status_array:null,client_group_array:null,client_group_api:null,client_api:null,client_contact_api:null,product_api:null,transaction_api:null,el:"#invoice_view_container",sub_client_contact_view_controller:null,sub_client_payment_view_controller:null,sub_transaction_view_controller:null,total_data_render:null,total_data_row_render:null,owing_amount:null,transaction_paid_data:null,history:null,editor:null}),super(e)}init(e){this.edit_view_tpl="InvoiceEditView.html",this.permission_id="invoice",this.viewId="Invoice",this.script_name="InvoiceView",this.table_name_key="invoice",this.context_menu_name=$.i18n._("Invoices"),this.navigation_label=$.i18n._("Invoice")+":",this.api=TTAPI.APIInvoice,this.client_group_api=TTAPI.APIClientGroup,this.client_api=TTAPI.APIClient,this.product_api=TTAPI.APIProduct,this.transaction_api=TTAPI.APITransaction,this.client_contact_api=TTAPI.APIClientContact,this.render(),this.buildContextMenu(),this.sub_view_mode||this.initData(),this.setSelectRibbonMenuIfNecessary("Invoice")}getCustomContextMenuModel(){var e={groups:{payments:{label:$.i18n._("Payments"),id:"payments"}},exclude:[ContextMenuIconName.mass_edit],include:[{label:$.i18n._("Packing<br>Slip"),id:ContextMenuIconName.packing_slip,group:"editor",icon:Icons.packing_slip,sort_order:1012},{label:$.i18n._("Payment"),id:ContextMenuIconName.payment,group:"payments",icon:Icons.payment_method}]};return this.sub_view_mode||(e.include.push({label:$.i18n._("Edit<br>Client"),id:ContextMenuIconName.edit_client,group:"navigation",icon:Icons.client}),e.include.push({label:$.i18n._("Clients"),id:ContextMenuIconName.client,group:"navigation",icon:"client_groups-35x35.png"}),e.include.push({label:$.i18n._("Client<br>Contacts"),id:ContextMenuIconName.client_contact,group:"navigation",icon:Icons.client_contact}),e.include.push({label:$.i18n._("Transactions"),id:ContextMenuIconName.transaction,group:"navigation",icon:Icons.transaction}),e.include.push({label:$.i18n._("Payment<br>Methods"),id:ContextMenuIconName.payment_method,group:"navigation",icon:Icons.payment_method})),e}setDefaultMenu(e){if(this.context_menu_array){Global.isSet(e)&&e||this.selectContextMenu(),this.setTotalDisplaySpan();for(var t=this.context_menu_array.length,i=this.getGridSelectIdArray().length,n=0;n<t;n++){var a=$(this.context_menu_array[n]),o=$(a.find(".ribbon-sub-menu-icon")).attr("id");switch(a.removeClass("invisible-image"),a.removeClass("disable-image"),o){case ContextMenuIconName.view:this.setDefaultMenuViewIcon(a,i);break;case ContextMenuIconName.packing_slip:this.setDefaultMenuPackingSlipIcon(a,i);break;case ContextMenuIconName.add:this.setDefaultMenuAddIcon(a,i);break;case ContextMenuIconName.edit:this.setDefaultMenuEditIcon(a,i);break;case ContextMenuIconName.delete_icon:this.setDefaultMenuDeleteIcon(a,i);break;case ContextMenuIconName.delete_and_next:this.setDefaultMenuDeleteAndNextIcon(a,i);break;case ContextMenuIconName.copy:this.setDefaultMenuCopyIcon(a,i);break;case ContextMenuIconName.copy_as_new:this.setDefaultMenuCopyAsNewIcon(a,i);break;case ContextMenuIconName.save:this.setDefaultMenuSaveIcon(a,i);break;case ContextMenuIconName.save_and_continue:this.setDefaultMenuSaveAndContinueIcon(a,i);break;case ContextMenuIconName.save_and_new:this.setDefaultMenuSaveAndAddIcon(a,i);break;case ContextMenuIconName.save_and_copy:this.setDefaultMenuSaveAndCopyIcon(a,i);break;case ContextMenuIconName.save_and_next:this.setDefaultMenuSaveAndNextIcon(a,i);break;case ContextMenuIconName.cancel:this.setDefaultMenuCancelIcon(a,i);break;case ContextMenuIconName.payment:this.setDefaultMenuPaymentIcon(a,i);break;case ContextMenuIconName.edit_client:this.setDefaultMenuEditClientIcon(a,i);break;case ContextMenuIconName.client:this.setDefaultMenuClientIcon(a,i);break;case ContextMenuIconName.client_contact:this.setDefaultMenuClientContactIcon(a,i);break;case ContextMenuIconName.transaction:this.setDefaultMenuTransactionIcon(a,i);break;case ContextMenuIconName.payment_method:this.setDefaultMenuPaymentMethodIcon(a,i);break;case ContextMenuIconName.export_excel:this.setDefaultMenuExportIcon(a)}}this.setContextMenuGroupVisibility()}}setEditMenu(){this.selectContextMenu();for(var e=this.context_menu_array.length,t=0;t<e;t++){var i=$(this.context_menu_array[t]),n=$(i.find(".ribbon-sub-menu-icon")).attr("id");if(i.removeClass("disable-image"),this.is_mass_editing)switch(n){case ContextMenuIconName.save:this.setEditMenuSaveIcon(i);break;case ContextMenuIconName.cancel:break;default:i.addClass("disable-image")}else switch(n){case ContextMenuIconName.add:this.setEditMenuAddIcon(i);break;case ContextMenuIconName.edit:this.setEditMenuEditIcon(i);break;case ContextMenuIconName.view:this.setEditMenuViewIcon(i);break;case ContextMenuIconName.mass_edit:this.setEditMenuMassEditIcon(i);break;case ContextMenuIconName.copy:this.setEditMenuCopyIcon(i);break;case ContextMenuIconName.delete_icon:this.setEditMenuDeleteIcon(i);break;case ContextMenuIconName.delete_and_next:this.setEditMenuDeleteAndNextIcon(i);break;case ContextMenuIconName.save:this.setEditMenuSaveIcon(i);break;case ContextMenuIconName.save_and_continue:this.setEditMenuSaveAndContinueIcon(i);break;case ContextMenuIconName.save_and_new:this.setEditMenuSaveAndAddIcon(i);break;case ContextMenuIconName.save_and_next:this.setEditMenuSaveAndNextIcon(i);break;case ContextMenuIconName.save_and_copy:this.setEditMenuSaveAndCopyIcon(i);break;case ContextMenuIconName.copy_as_new:this.setEditMenuCopyAndAddIcon(i);break;case ContextMenuIconName.cancel:break;case ContextMenuIconName.import_icon:this.setEditMenuImportIcon(i);break;case ContextMenuIconName.packing_slip:this.setEditMenuPackingSlipIcon(i);break;case ContextMenuIconName.payment:this.setEditMenuPaymentIcon(i);break;case ContextMenuIconName.export_excel:this.setDefaultMenuExportIcon(i)}}this.setContextMenuGroupVisibility()}setEditMenuViewIcon(e,t){this.viewPermissionValidate(t)&&!this.edit_only_mode||e.addClass("invisible-image"),this.current_edit_record&&this.current_edit_record.id||e.addClass("disable-image")}setEditMenuPackingSlipIcon(e,t){this.current_edit_record&&this.current_edit_record.id||e.addClass("disable-image")}setEditMenuPaymentIcon(e,t){this.current_edit_record&&this.current_edit_record.id||e.addClass("disable-image")}setDefaultMenuViewIcon(e,t,i){this.viewPermissionValidate(i)&&!this.edit_only_mode||e.addClass("invisible-image"),t>0&&this.viewOwnerOrChildPermissionValidate()?e.removeClass("disable-image"):e.addClass("disable-image")}setDefaultMenuPackingSlipIcon(e,t,i){t>0?e.removeClass("disable-image"):e.addClass("disable-image")}setDefaultMenuPaymentIcon(e,t,i){e.addClass("disable-image")}setDefaultMenuEditClientIcon(e,t,i){t>0?e.removeClass("disable-image"):e.addClass("disable-image")}setDefaultMenuClientIcon(e,t,i){e.removeClass("disable-image")}setDefaultMenuClientContactIcon(e,t,i){e.removeClass("disable-image")}setDefaultMenuTransactionIcon(e,t,i){e.removeClass("disable-image")}setDefaultMenuPaymentMethodIcon(e,t,i){e.removeClass("disable-image")}getFilterColumnsFromDisplayColumns(){var e={is_owner:!0,id:!0,is_child:!0,in_use:!0,first_name:!0,last_name:!0,client_id:!0},t=[];if(this.grid&&(t=this.grid.getGridParam("colModel")),t)for(var i=t.length,n=0;n<i;n++){e[t[n].name]=!0}return e}onCustomContextClick(e){switch(e){case ContextMenuIconName.edit_client:case ContextMenuIconName.client:case ContextMenuIconName.client_contact:case ContextMenuIconName.transaction:case ContextMenuIconName.payment_method:case ContextMenuIconName.payment:case ContextMenuIconName.view:case ContextMenuIconName.packing_slip:this.onNavigationClick(e)}}onViewClick(){return this.onNavigationClick(ContextMenuIconName.view)}onNavigationClick(e){var t,i,n,a=this,o={filter_data:{}},r=[],l=[];a.edit_view?(a.current_edit_record.client_id&&l.push(a.current_edit_record.client_id),n=a.current_edit_record.currency_id,a.current_edit_record.id&&(i=a.current_edit_record.id,r.push(a.current_edit_record.id))):(t=this.getGridSelectIdArray(),$.each(t,(function(e,t){var i=a.getRecordFromGridById(t);r.push(i.id),l.push(i.client_id)}))),o.filter_data.client_id=l;var _,c={filter_data:{id:r}};switch(e){case ContextMenuIconName.edit_client:l.length>0&&IndexViewController.openEditView(this,"Client",l[0]);break;case ContextMenuIconName.payment:i&&IndexViewController.openEditView(this,"InvoiceTransaction",{type_id:20,invoice_id:i,client_id:l[0],currency_id:n,owing_amount:this.owing_amount});break;case ContextMenuIconName.client:o.filter_data.id=o.filter_data.client_id,delete o.filter_data.client_id,Global.addViewTab(a.viewId,$.i18n._("Invoices"),window.location.href),IndexViewController.goToView("Client",o);break;case ContextMenuIconName.client_contact:Global.addViewTab(a.viewId,$.i18n._("Invoices"),window.location.href),IndexViewController.goToView("ClientContact",o);break;case ContextMenuIconName.transaction:Global.addViewTab(a.viewId,$.i18n._("Invoices"),window.location.href),IndexViewController.goToView("InvoiceTransaction",o);break;case ContextMenuIconName.payment_method:Global.addViewTab(a.viewId,$.i18n._("Invoices"),window.location.href),IndexViewController.goToView("ClientPayment",o);break;case ContextMenuIconName.view:_={0:c,1:!1,2:"pdf"},this.doFormIFrameCall(_);break;case ContextMenuIconName.packing_slip:_={0:c,1:!1,2:"pdf_packing_slip"},this.doFormIFrameCall(_)}}doFormIFrameCall(e){Global.APIFileDownload(this.api.className,"get"+this.api.key_name,e)}initOptions(){var e=this;this.initDropDownOption("status"),this.client_group_api.getClientGroup("",!1,!1,{onResult:function(t){t=t.getResult(),t=Global.buildTreeRecord(t),e.edit_only_mode||e.sub_view_mode||(e.basic_search_field_ui_dic.client_group_id.setSourceData(t),e.adv_search_field_ui_dic.client_group_id.setSourceData(t)),e.client_group_array=t}})}buildEditViewUI(){super.buildEditViewUI();this.edit_view.children().eq(0).css("min-width",1050);var e={"tab_invoice":{"label":$.i18n._("Invoice")},"tab_client_contacts":{"label":$.i18n._("Client Contacts"),"init_callback":"initSubClientContactView","display_on_mass_edit":!1},"tab_payment_methods":{"label":$.i18n._("Payment Methods"),"init_callback":"initSubClientPaymentView","display_on_mass_edit":!1},"tab_transactions":{"label":$.i18n._("Transactions"),"init_callback":"initSubTransactionView","display_on_mass_edit":!1},"tab_audit":!0};this.setTabModel(e),this.navigation.AComboBox({api_class:TTAPI.APIInvoice,id:this.script_name+"_navigation",allow_multiple_selection:!1,layout_name:"global_invoice",navigation_mode:!0,show_search_inputs:!0}),this.setNavigation();var t,i,n,a=this.edit_view_tab.find("#tab_invoice"),o=a.find(".first-column"),r=a.find(".second-column"),l=a.find(".third-column");this.edit_view_tabs[0]=[],this.edit_view_tabs[0].push(o),this.edit_view_tabs[0].push(r),this.edit_view_tabs[0].push(l),(t=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({api_class:TTAPI.APIClient,allow_multiple_selection:!1,layout_name:"global_client",show_search_inputs:!0,set_empty:!0,field:"client_id"}),this.addEditFieldToColumn($.i18n._("Client"),t,o,"",null,!0),(t=Global.loadWidgetByName(FormItemType.TEXT)).TText({field:"client"}),this.addEditFieldToColumn($.i18n._("Client"),t,o,"",null,!0),(t=Global.loadWidgetByName(FormItemType.COMBO_BOX)).TComboBox({field:"status_id"}),t.setSourceData(this.status_array),this.addEditFieldToColumn($.i18n._("Status"),t,o),(t=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({api_class:TTAPI.APIClientContact,allow_multiple_selection:!1,layout_name:"global_client_contact",show_search_inputs:!0,set_empty:!0,field:"billing_contact_id"}),this.addEditFieldToColumn($.i18n._("Billing Contact"),t,o),(t=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({api_class:TTAPI.APIClientContact,allow_multiple_selection:!1,layout_name:"global_client_contact",show_search_inputs:!0,set_empty:!0,field:"shipping_contact_id"}),this.addEditFieldToColumn($.i18n._("Shipping Contact"),t,o),(t=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({api_class:TTAPI.APIClientContact,allow_multiple_selection:!1,layout_name:"global_client_contact",show_search_inputs:!0,set_empty:!0,field:"other_contact_id"}),this.addEditFieldToColumn($.i18n._("Other Contact"),t,o),(t=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({api_class:TTAPI.APICurrency,allow_multiple_selection:!1,layout_name:"global_currency",show_search_inputs:!0,field:"currency_id"}),this.addEditFieldToColumn($.i18n._("Currency"),t,o),(t=Global.loadWidgetByName(FormItemType.TEXT_INPUT)).TTextInput({field:"po_number",width:100}),this.addEditFieldToColumn($.i18n._("PO Number"),t,o),(t=Global.loadWidgetByName(FormItemType.TAG_INPUT)).TTagInput({field:"tag",object_type_id:910}),this.addEditFieldToColumn($.i18n._("Tags"),t,o,"",null,null,!0),(t=Global.loadWidgetByName(FormItemType.TEXT)).TText({field:"invoice_number"}),this.addEditFieldToColumn($.i18n._("Invoice #"),t,r,""),(t=Global.loadWidgetByName(FormItemType.DATE_PICKER)).TDatePicker({field:"invoice_date"}),this.addEditFieldToColumn($.i18n._("Invoice Date"),t,r),(t=Global.loadWidgetByName(FormItemType.DATE_PICKER)).TDatePicker({field:"order_date"}),this.addEditFieldToColumn($.i18n._("Order Date"),t,r),(t=Global.loadWidgetByName(FormItemType.DATE_PICKER)).TDatePicker({field:"required_date"}),this.addEditFieldToColumn($.i18n._("Payment Required"),t,r),(t=Global.loadWidgetByName(FormItemType.DATE_PICKER)).TDatePicker({field:"shipped_date"}),this.addEditFieldToColumn($.i18n._("Shipped Date"),t,r),(t=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({api_class:TTAPI.APIUser,allow_multiple_selection:!1,layout_name:"global_user",show_search_inputs:!0,set_empty:!0,field:"sales_contact_id"}),this.addEditFieldToColumn($.i18n._("Sales Rep"),t,r),(t=Global.loadWidgetByName(FormItemType.TEXT_INPUT)).TTextInput({field:"tracking_number"}),this.addEditFieldToColumn($.i18n._("Tracking Number"),t,r),(t=Global.loadWidgetByName(FormItemType.COMBO_BOX)).TComboBox({field:"combined_shipping_policy_id"}),this.addEditFieldToColumn($.i18n._("Shipping Policy"),t,r,"");var _=a.find(".inside-editor-div"),c={product:$.i18n._("Product"),description:$.i18n._("Description"),qty:$.i18n._("QTY"),price:$.i18n._("Price"),prorate:$.i18n._("ProRate"),total:$.i18n._("Total")};this.editor=Global.loadWidgetByName(FormItemType.INSIDE_EDITOR),this.editor.InsideEditor({addRow:this.insideEditorAddRow,removeRow:this.insideEditorRemoveRow,getValue:this.insideEditorGetValue,setValue:this.insideEditorSetValue,parent_controller:this,api:this.transaction_api,render:"views/invoice/invoice/ProductViewInsideEditorRender.html",render_args:c,row_render:"views/invoice/invoice/ProductViewInsideEditorRow.html"}),_.append(this.editor),(t=Global.loadWidgetByName(FormItemType.TEXT_AREA)).TTextArea({field:"private_note",width:800,height:50}),this.addEditFieldToColumn($.i18n._("Note(private)"),t,l,"",null,null,!0),(t=Global.loadWidgetByName(FormItemType.TEXT_AREA)).TTextArea({field:"public_note",width:500,height:50}),this.addEditFieldToColumn($.i18n._("Note(public)"),t,l,"",null,null,!0),i=$("<div class='widget-h-box'></div>");var d=Global.loadWidgetByName(FormItemType.CHECKBOX);d.TCheckbox({field:"email_invoice"}),i.append(d),n=$("<span class='widget-right-label'> "+$.i18n._("CC")+"</span>"),i.append(n);var s=Global.loadWidgetByName(FormItemType.TEXT_INPUT);s.TTextInput({field:"email_other_cc",width:200}),i.append(s),this.addEditFieldToColumn($.i18n._("Email Invoice To Contact(s)"),[d,s],l,"",i)}buildSearchFields(){super.buildSearchFields(),this.search_fields=[new SearchField({label:$.i18n._("Status"),in_column:1,field:"status_id",multiple:!0,basic_search:!0,adv_search:!0,layout_name:"global_option_column",form_item_type:FormItemType.AWESOME_BOX}),new SearchField({label:$.i18n._("Client"),in_column:1,field:"client_id",layout_name:"global_client",api_class:TTAPI.APIClient,multiple:!0,basic_search:!0,adv_search:!0,form_item_type:FormItemType.AWESOME_BOX}),new SearchField({label:$.i18n._("Client Group"),in_column:1,multiple:!0,field:"client_group_id",layout_name:"global_tree_column",tree_mode:!0,basic_search:!0,adv_search:!0,form_item_type:FormItemType.AWESOME_BOX}),new SearchField({label:$.i18n._("Invoice Number"),in_column:1,field:"invoice_number",multiple:!0,basic_search:!0,adv_search:!0,form_item_type:FormItemType.TEXT_INPUT}),new SearchField({label:$.i18n._("PO Number"),in_column:1,field:"po_number",multiple:!0,basic_search:!1,adv_search:!0,form_item_type:FormItemType.TEXT_INPUT}),new SearchField({label:$.i18n._("Sales Rep"),in_column:2,field:"sales_contact_id",layout_name:"global_user",api_class:TTAPI.APIUser,multiple:!0,basic_search:!0,adv_search:!0,form_item_type:FormItemType.AWESOME_BOX}),new SearchField({label:$.i18n._("Billing Contact"),in_column:2,field:"billing_contact_id",layout_name:"global_client_contact",api_class:TTAPI.APIClientContact,multiple:!0,basic_search:!1,adv_search:!0,form_item_type:FormItemType.AWESOME_BOX}),new SearchField({label:$.i18n._("Shipping Contact"),in_column:2,field:"shipping_contact_id",layout_name:"global_client_contact",api_class:TTAPI.APIClientContact,multiple:!0,basic_search:!1,adv_search:!0,form_item_type:FormItemType.AWESOME_BOX}),new SearchField({label:$.i18n._("Other Contact"),in_column:2,field:"other_contact_id",layout_name:"global_client_contact",api_class:TTAPI.APIClientContact,multiple:!0,basic_search:!1,adv_search:!0,form_item_type:FormItemType.AWESOME_BOX}),new SearchField({label:$.i18n._("Tags"),field:"tag",basic_search:!0,adv_search:!0,in_column:2,object_type_id:910,form_item_type:FormItemType.TAG_INPUT})]}setSelectLayout(){this.sub_view_mode?super.setSelectLayout(["client"]):super.setSelectLayout()}_continueDoCopyAsNew(){(this.setCurrentEditViewState("new"),LocalCacheData.current_doing_context_action="copy_as_new",Global.isSet(this.edit_view))?(this.current_edit_record.id="",this.edit_view.find(".navigation-div").css("display","none"),this.setEditMenu(),this.setTabStatus(),this.detachElement("client"),this.attachElement("client_id"),this.edit_view_ui_dic.invoice_number.setValue($.i18n._("N/A")),this.is_changed=!1,ProgressBar.closeOverlay()):super._continueDoCopyAsNew()}setCurrentEditRecordData(){for(var e in this.current_edit_record)if(this.current_edit_record.hasOwnProperty(e)){var t=this.edit_view_ui_dic[e];if(Global.isSet(t))switch(e){case"client_id":t.setValue(this.current_edit_record[e]),this.edit_view_ui_dic.billing_contact_id.setSourceData(null),this.edit_view_ui_dic.shipping_contact_id.setSourceData(null),this.edit_view_ui_dic.other_contact_id.setSourceData(null),this.current_edit_record&&this.current_edit_record.id?this.getClient(this.current_edit_record[e],!0):this.getClient(this.current_edit_record[e]);break;case"combined_shipping_policy_id":break;case"currency_id":this.current_edit_record[e]||(this.current_edit_record[e]=LocalCacheData.getLoginUser().currency_id),t.setValue(this.current_edit_record[e]);break;case"invoice_number":!this.current_edit_record[e]||this.copied_record_id?t.setValue($.i18n._("N/A")):t.setValue(this.current_edit_record[e]);break;default:t.setValue(this.current_edit_record[e])}}this.collectUIDataToCurrentEditRecord(),this.setEditViewDataDone()}showClientColumn(){this.is_edit?(this.attachElement("client"),this.detachElement("client_id")):this.is_add&&(this.detachElement("client"),this.attachElement("client_id"))}setPaymentIconDisabled(){var e=$(this.context_menu_array[14]);this.setDefaultMenuPaymentIcon(e)}onFormItemChange(e,t){this.setPaymentIconDisabled(),this.setMassEditingFieldsWhenFormChange(e),this.setIsChanged(e);var i=e.getField(),n=e.getValue();switch(this.current_edit_record[i]=e.getValue(),i){case"client_id":this.edit_view_ui_dic.billing_contact_id.setSourceData(null),this.edit_view_ui_dic.shipping_contact_id.setSourceData(null),this.edit_view_ui_dic.other_contact_id.setSourceData(null),this.edit_view_ui_dic.billing_contact_id.setValue(!1),this.edit_view_ui_dic.shipping_contact_id.setValue(!1),this.edit_view_ui_dic.other_contact_id.setValue(!1),this.current_edit_record.billing_contact_id=!1,this.current_edit_record.shipping_contact_id=!1,this.current_edit_record.other_contact_id=!1,this.getClient(n);break;case"billing_contact_id":this.current_edit_record.billing_contact_id?this.setDefaultCurrency():this.getInvoiceTotalData()}switch(i){case"currency_id":case"shipping_contact_id":this.getInvoiceTotalData(),this.getShippingOptions();break;case"combined_shipping_policy_id":this.getInvoiceTotalData()}t||this.validate()}setDefaultCurrency(){var e=this,t={filter_data:{}};t.filter_data.id=this.current_edit_record.billing_contact_id,this.client_contact_api["get"+this.client_contact_api.key_name](t,{onResult:function(t){var i=t.getResult()[0];e.edit_view_ui_dic&&e.current_edit_record&&(i?(e.current_edit_record.currency_id=i.currency_id,e.edit_view_ui_dic.currency_id.setValue(i.currency_id)):(e.current_edit_record.currency_id=LocalCacheData.getLoginUser().currency_id,e.edit_view_ui_dic.currency_id.setValue(LocalCacheData.getLoginUser().currency_id))),e.getInvoiceTotalData()}})}getClient(e,t){var i=this,n={};n.filter_data={"id":e},n.filter_columns={"invoice_number":!0,"default_other_contact_id":!0,"client":!0,"default_billing_contact_id":!0,"invoice_date":!0,"status":!0,"default_shipping_contact_id":!0},e?this.client_api["get"+this.client_api.key_name](n,{onResult:function(n){if(i.edit_view){var a=n.getResult();if(Global.isArray(a)){var o=a[0];if(!t){var r=o.default_billing_contact_id,l=o.default_shipping_contact_id,_=o.default_other_contact_id;i.edit_view_ui_dic.billing_contact_id.setValue(r),i.edit_view_ui_dic.shipping_contact_id.setValue(l),i.edit_view_ui_dic.other_contact_id.setValue(_),i.current_edit_record.billing_contact_id=r,i.current_edit_record.shipping_contact_id=l,i.current_edit_record.other_contact_id=_,i.setDefaultCurrency(),i.getShippingOptions()}i.edit_view_ui_dic.billing_contact_id.setDefaultArgs({"filter_data":{"client_id":e}}),i.edit_view_ui_dic.shipping_contact_id.setDefaultArgs({"filter_data":{"client_id":e}}),i.edit_view_ui_dic.other_contact_id.setDefaultArgs({"filter_data":{"client_id":e}})}}}}):t||(this.getInvoiceTotalData(),this.getShippingOptions())}setEditViewDataDone(){super.setEditViewDataDone(),this.showClientColumn(),this.initInsideEditorData()}initInsideEditorData(e){var t=this,i=this.current_edit_record.id?this.current_edit_record.id:this.copied_record_id;if(this.copied_record_id="",i){var n={filter_data:{}};n.filter_data.invoice_id=i,n.filter_data.type_id=10,n.filter_data.product_type_id=[10,20],this.transaction_api["get"+this.transaction_api.key_name](n,!0,{onResult:function(a){var o=a.getResult();n.filter_data={},n.filter_columns={type_id:!0,status_id:!0,payment_type:!0,confirm_number:!0,id:!0,client_id:!0,invoice_id:!0,amount:!0,status:!0,client_payment:!0},n.filter_data.type_id=20,n.filter_data.invoice_id=i,t.transaction_api["get"+t.transaction_api.key_name](n,!0,{onResult:function(i){if(t.edit_view){Global.isSet(e)&&t.updateStatus();var n=i.getResult();t.transaction_paid_data=!0===n?null:n,t.editor.setValue(o),t.getInvoiceTotalData(o),t.getShippingOptions(o),t.setTransactionHistoryData()}}})}})}else this.transaction_paid_data=null,t.editor.removeAllRows(),t.editor.getDefaultData(),this.total_data_render&&(this.total_data_render.remove(),this.total_data_render=null,this.total_data_row_render=null),this.history&&(this.history.remove(),this.history=null),t.getInvoiceTotalData(),t.getShippingOptions()}insideEditorSetValue(e){var t=e.length;if(this.removeAllRows(),t>0){for(var i=0;i<e.length;i++)if(Global.isSet(e[i])){var n=e[i];this.addRow(n)}}else this.getDefaultData()}getInvoiceTotalData(e){var t,i=this;if(i.edit_view){if(t=Global.isSet(e)?e:this.editor.getValue(),this.transaction_paid_data){var n=[];$.each(t,(function(e,t){n.push(t)})),$.each(this.transaction_paid_data,(function(e,t){n.push(t)})),t=n}this.api.getInvoiceTotalData(t,this.current_edit_record,!1,{onResult:function(e){var t=e.getResult();i.setInvoiceTotalData(t)}})}}setTransactionHistoryData(){if(this.transaction_paid_data){this.history&&this.history.remove();var e=this.edit_view_tab.find("#tab_invoice").find(".inside-transaction-history-div"),t=Global.loadWidget("views/invoice/invoice/HistoryViewInsideEditorRender.html"),i=Global.loadWidget("views/invoice/invoice/HistoryViewInsideEditorRow.html"),n={status:$.i18n._("Status"),payment_type:$.i18n._("Payment Type"),client_payment:$.i18n._("Payment Method"),confirm_number:$.i18n._("Confirmation Number"),amount:$.i18n._("Amount")},a=Global.loadWidgetByName(FormItemType.INSIDE_EDITOR),o=_.template(t),r=a.children().eq(1);for(var l in r.append(o(n)),t=$(r.find(".inside-editor-render")),this.transaction_paid_data){var c=this.transaction_paid_data[l];$.each(c,(function(e,t){c[e]=t||"--"}));var d=_.template(i);t.append(d(c))}e.append(t),this.history=$(t)}}setInvoiceTotalData(e){if(this.edit_view){Global.isSet(this.total_data_render)&&(this.total_data_render.remove(),this.total_data_render=null);var t=this.edit_view_tab.find("#tab_invoice").find(".inside-total-data-editor-div");this.total_data_row_render=Global.loadWidget("views/invoice/invoice/InvoiceTotalDataEditorRow.html"),this.total_data_render=$(Global.loadWidget("views/invoice/invoice/InvoiceTotalDataEditorRender.html"));var i=this.viewTotalDataUI(Global.removeSortPrefixFromArray(e));Global.isSet(i)&&t.append(this.total_data_render)}}viewTotalDataUI(e){var t=null;for(var i in e){var n=e[i];if("object"==typeof n)if("owing"===i&&(this.owing_amount=n.amount),Global.isSet(n.amount)&&(0!==parseFloat(n.amount)||"owing"===i&&0===parseFloat(e.paid.amount)&&0!==parseFloat(e.previous_balance.amount))){t={label:n.name,value:n.amount};var a=_.template(this.total_data_row_render);this.total_data_render.append(a(t))}else this.viewTotalDataUI(n)}return t}getShippingOptions(e){var t,i=this;if(t=Global.isSet(e)?e:this.editor.getValue(),this.transaction_paid_data){var n=[];$.each(t,(function(e,t){n.push(t)})),$.each(this.transaction_paid_data,(function(e,t){n.push(t)})),t=n}this.api.getShippingOptions(t,this.current_edit_record,{onResult:function(e){if(i.edit_view){var t=e.getResult(),n=i.current_edit_record.combined_shipping_policy_id;i.edit_view_ui_dic.combined_shipping_policy_id.setSourceData(Global.buildRecordArray(t)),i.edit_view_ui_dic.combined_shipping_policy_id.setValue(n)}}})}updateStatus(){var e=this;this.api.updateStatus(this.current_edit_record.id,{onResult:function(t){if(t.isValid()){var i=t.getResult();e.edit_view_ui_dic.status_id.setValue(i)}}})}initSubClientContactView(){var e=this;if(this.current_edit_record.id){if(this.sub_client_contact_view_controller)return this.sub_client_contact_view_controller.buildContextMenu(!0),this.sub_client_contact_view_controller.setDefaultMenu(),e.sub_client_contact_view_controller.parent_key="client_id",e.sub_client_contact_view_controller.parent_value=e.current_edit_record.client_id,e.sub_client_contact_view_controller.parent_edit_record=e.current_edit_record,void e.sub_client_contact_view_controller.initData();Global.loadScript("views/invoice/client_contact/ClientContactViewController.js",(function(){var n=e.edit_view_tab.find("#tab_client_contacts").find(".first-column-sub-view");Global.trackView("SubClientContactView"),ClientContactViewController.loadSubView(n,t,i)}))}else TTPromise.resolve("BaseViewController","onTabShow");function t(){}function i(t){e.sub_client_contact_view_controller=t,e.sub_client_contact_view_controller.parent_key="client_id",e.sub_client_contact_view_controller.parent_value=e.current_edit_record.client_id,e.sub_client_contact_view_controller.parent_edit_record=e.current_edit_record,e.sub_client_contact_view_controller.parent_view_controller=e,e.sub_client_contact_view_controller.postInit=function(){this.initData()}}}initSubClientPaymentView(){var e=this;if(this.current_edit_record.id){if(this.sub_client_payment_view_controller)return this.sub_client_payment_view_controller.buildContextMenu(!0),this.sub_client_payment_view_controller.setDefaultMenu(),e.sub_client_payment_view_controller.parent_key="client_id",e.sub_client_payment_view_controller.parent_value=e.current_edit_record.client_id,e.sub_client_payment_view_controller.parent_edit_record=e.current_edit_record,void e.sub_client_payment_view_controller.initData();Global.loadScript("views/invoice/client_payment/ClientPaymentViewController.js",(function(){var n=e.edit_view_tab.find("#tab_payment_methods").find(".first-column-sub-view");Global.trackView("SubClientPaymentView"),ClientPaymentViewController.loadSubView(n,t,i)}))}else TTPromise.resolve("BaseViewController","onTabShow");function t(){}function i(t){e.sub_client_payment_view_controller=t,e.sub_client_payment_view_controller.parent_key="client_id",e.sub_client_payment_view_controller.parent_value=e.current_edit_record.client_id,e.sub_client_payment_view_controller.parent_edit_record=e.current_edit_record,e.sub_client_payment_view_controller.parent_view_controller=e,e.sub_client_payment_view_controller.postInit=function(){this.initData()}}}initSubTransactionView(){var e=this;if(this.current_edit_record.id){if(this.sub_transaction_view_controller)return this.sub_transaction_view_controller.buildContextMenu(!0),this.sub_transaction_view_controller.setDefaultMenu(),e.sub_transaction_view_controller.parent_key="invoice_id",e.sub_transaction_view_controller.parent_value=e.current_edit_record.id,e.sub_transaction_view_controller.parent_edit_record=e.current_edit_record,void e.sub_transaction_view_controller.initData();Global.loadScript("views/invoice/invoice_transaction/InvoiceTransactionViewController.js",(function(){var n=e.edit_view_tab.find("#tab_transactions").find(".first-column-sub-view");Global.trackView("SubInvoiceTransactionView"),InvoiceTransactionViewController.loadSubView(n,t,i)}))}else TTPromise.resolve("BaseViewController","onTabShow");function t(){}function i(t){e.sub_transaction_view_controller=t,e.sub_transaction_view_controller.parent_key="invoice_id",e.sub_transaction_view_controller.parent_value=e.current_edit_record.id,e.sub_transaction_view_controller.parent_edit_record=e.current_edit_record,e.sub_transaction_view_controller.parent_view_controller=e,e.sub_transaction_view_controller.postInit=function(){this.initData()}}}removeEditView(){super.removeEditView(),this.history=null,this.editor=null,this.total_data_render=null,this.total_data_row_render=null,this.transaction_paid_data=null,this.sub_client_contact_view_controller=null,this.sub_client_payment_view_controller=null,this.sub_transaction_view_controller=null}insideEditorAddRow(e,t){var i,n,a=this.getRowRender(),o=this.getRender(),r={},l=this;if(e){r.current_edit_item=e;var _={filter_data:{}};_.filter_data.type_id=[10,20],(i=Global.loadWidgetByName(FormItemType.AWESOME_BOX)).AComboBox({width:203,is_static_width:!0,api_class:TTAPI.APIProduct,allow_multiple_selection:!1,layout_name:"global_product",show_search_inputs:!0,set_empty:!0,field:"product_id"}),i.setDefaultArgs(_),i.setValue(e.product_id?e.product_id:""),r[i.getField()]=i,a.children().eq(0).append(i),this.setWidgetEnableBaseOnParentController(i),i.bind("formItemChange",(function(e,t){l.parent_controller.onRowChanges($(this).parent().parent().index()-1,t)})),(i=Global.loadWidgetByName(FormItemType.TEXT_INPUT)).TTextInput({field:"description",width:500}),i.setValue(e.description?e.description:""),r[i.getField()]=i,a.children().eq(1).append(i),this.setWidgetEnableBaseOnParentController(i),(i=Global.loadWidgetByName(FormItemType.TEXT_INPUT)).TTextInput({field:"quantity",width:50,no_validate_timer_sec:100}),i.setValue(e.quantity?e.quantity:""),i.bind("formItemChange",(function(e,t,i){i&&l.parent_controller.onRowChanges($(this).parent().parent().index()-1,t)})),r[i.getField()]=i,a.children().eq(2).append(i),this.setWidgetEnableBaseOnParentController(i),(i=Global.loadWidgetByName(FormItemType.TEXT_INPUT)).TTextInput({field:"unit_price",width:50,no_validate_timer_sec:100}),i.setValue(e.unit_price?e.unit_price:""),i.bind("formItemChange",(function(e,t,i){i&&l.parent_controller.onRowChanges($(this).parent().parent().index()-1,t)})),r[i.getField()]=i,a.children().eq(3).append(i),this.setWidgetEnableBaseOnParentController(i),n=$("<div class='widget-h-box'></div>"),(i=Global.loadWidgetByName(FormItemType.TEXT_INPUT)).TTextInput({field:"pro_rate_numerator",width:50,no_validate_timer_sec:100}),i.setValue(e.pro_rate_numerator?e.pro_rate_numerator:1),i.attr("maxlength",3),i.bind("formItemChange",(function(e,t,i){i&&l.parent_controller.onRowChanges($(this).parent().parent().parent().index()-1,t)})),r[i.getField()]=i,n.append(i);var c=$("<span class='widget-right-label'>/</span>");n.append(c),this.setWidgetEnableBaseOnParentController(i),(i=Global.loadWidgetByName(FormItemType.TEXT_INPUT)).TTextInput({field:"pro_rate_denominator",width:50,no_validate_timer_sec:100}),i.setValue(e.pro_rate_denominator?e.pro_rate_denominator:1),i.attr("maxlength",3),i.bind("formItemChange",(function(e,t,i){i&&l.parent_controller.onRowChanges($(this).parent().parent().parent().index()-1,t)})),r[i.getField()]=i,n.append(i),a.children().eq(4).append(n),this.setWidgetEnableBaseOnParentController(i),(i=Global.loadWidgetByName(FormItemType.TEXT_INPUT)).TTextInput({field:"amount",width:100}),i.setValue(e.amount?e.amount:""),i.setReadOnly(!0),r[i.getField()]=i,a.children().eq(5).append(i),void 0!==t?(a.insertAfter($(o).find("tr").eq(t)),this.rows_widgets_array.splice(t,0,r)):($(o).append(a),this.rows_widgets_array.push(r)),this.parent_controller.is_viewing&&a.find(".control-icon").hide(),this.setWidgetEnableBaseOnParentController(i);var d=a.find(".plus-icon"),s=a.find(".minus-icon");d.click((function(){l.parent_controller.setPaymentIconDisabled(),l.addRow(null,$(this).parent().parent().index())})),s.click((function(){l.parent_controller.setPaymentIconDisabled(),l.removeRow(a),1===o.find("tr").length&&l.addRow()})),this.removeLastRowLine()}else this.getDefaultData(t);if(e&&TTUUID.isUUID(e.product_id)&&e.product_id!=TTUUID.zero_id){var u={filter_data:{}};u.filter_data.id=e.product_id,u.filter_columns={id:!0,price_locked:!0,description_locked:!0},this.parent_controller.product_api["get"+this.parent_controller.product_api.key_name](u,{onResult:function(e){var t=e.getResult()[0];r.description.setReadOnly(t.description_locked),r.unit_price.setReadOnly(t.price_locked)}})}}insideEditorRemoveRow(e){var t=e[0].rowIndex-1,i=this.rows_widgets_array[t].current_edit_item.id;TTUUID.isUUID(i)&&i!=TTUUID.zero_id&&i!=TTUUID.not_exist_id&&this.delete_ids.push(i),e.remove(),this.rows_widgets_array.splice(t,1),this.parent_controller.getInvoiceTotalData(),this.removeLastRowLine()}onRowChanges(e,t){this.setPaymentIconDisabled();var i=this,n=this.editor.rows_widgets_array[e],a=t.getField(),o=t.getValue(),r={filter_data:{},filter_columns:{}};switch(r.filter_columns.description=!0,r.filter_columns.name=!0,r.filter_columns.part_number=!0,r.filter_columns.type_id=!0,r.filter_columns.currency_id=!0,r.filter_columns.id=!0,r.filter_columns.price_locked=!0,r.filter_columns.description_locked=!0,a){case"quantity":case"product_id":var l,_;"product_id"===a?(_=1,l=o):(_=o,l=n.product_id.getValue()),TTUUID.isUUID(l)&&l!=TTUUID.zero_id&&(r.filter_data.id=l,this.product_api["get"+this.product_api.key_name](r,{onResult:function(t){var o=t.getResult()[0];"product_id"===a&&(n.description.setValue(o.description),n.description.setReadOnly(o.description_locked),n.unit_price.setReadOnly(o.price_locked),n.current_edit_item.product_type_id=o.type_id,n.current_edit_item.product_name=o.name,n.current_edit_item.product_part_number=o.part_number),o.id&&i.current_edit_record&&i.current_edit_record.currency_id&&i.product_api.getProductQuantityUnitPrice(o.id,_,i.current_edit_record.currency_id,{onResult:function(t){var o=t.getResult();if("product_id"===a&&n.quantity.setValue(_),n.unit_price.setValue(o),i.calcTransactionRowTotal(n),i.editor&&i.editor.rows_widgets_array){i.editor.rows_widgets_array[e]=n;var r=i.editor.getValue();i.getInvoiceTotalData(r),i.getShippingOptions(r)}}})}}));break;case"pro_rate_numerator":case"pro_rate_denominator":case"unit_price":this.calcTransactionRowTotal(n);var c=i.editor.getValue();this.getInvoiceTotalData(c),this.getShippingOptions(c)}}calcTransactionRowTotal(e){var t=0,i=parseFloat(e.pro_rate_numerator.getValue()),n=parseFloat(e.pro_rate_denominator.getValue()),a=parseFloat(e.quantity.getValue()),o=parseFloat(e.unit_price.getValue());!isNaN(a)&&isFinite(a)&&!isNaN(o)&&isFinite(o)&&(t=a*o),!isNaN(i)&&isFinite(i)&&!isNaN(n)&&isFinite(n)&&(t*=i/n),e.amount.setValue(parseFloat(t).toFixed(2))}insideEditorGetValue(e){for(var t=this.rows_widgets_array.length,i=[],n=0;n<t;n++){var a=this.rows_widgets_array[n],o={};o.status_id=a.current_edit_item.status_id,o.product_part_number=a.current_edit_item.product_part_number,o.id=a.current_edit_item.id,o.description=a.current_edit_item.description,o.product_name=a.current_edit_item.product_name,o.amount=a.current_edit_item.amount,o.unit_price=a.current_edit_item.unit_price,o.product_type_id=a.current_edit_item.product_type_id,o.type_id=a.current_edit_item.type_id,o.pro_rate_denominator=a.current_edit_item.pro_rate_denominator,o.client_id=a.current_edit_item.client_id,o.quantity=a.current_edit_item.quantity,o.product_id=a.current_edit_item.product_id,o.invoice_id=a.current_edit_item.invoice_id,o.pro_rate_numerator=a.current_edit_item.pro_rate_numerator,o.effective_date=a.current_edit_item.effective_date;var r=a.product_id.getValue();void 0===e||""!==e&&!1!==e||(o.id="",o.invoice_id="",o.type_id=10,o.effective_date=(new Date).format()),void 0===o.effective_date&&(o.effective_date=(new Date).format()),void 0===o.type_id&&(o.type_id=10),TTUUID.isUUID(r)&&r!=TTUUID.zero_id&&(o.product_id=r,o.quantity=a.quantity.getValue(),o.pro_rate_numerator=a.pro_rate_numerator.getValue(),o.description=a.description.getValue(),o.pro_rate_denominator=a.pro_rate_denominator.getValue(),o.amount=a.amount.getValue(),o.unit_price=a.unit_price.getValue(),o.client_id=this.parent_controller.current_edit_record.client_id,i.push(o))}return i}uniformVariable(e){Global.isSet(e)||(e={});var t=this.editor.getValue(this.current_edit_record.id);return t.length>0&&(e.transactions=t),e}onCopyAsNewResult(e){var t=this,i=e.getResult();if(!i)return TAlertManager.showAlert($.i18n._("Record does not exist")),void t.onCancelClick();t.openEditView(),i=i[0],this.copied_record_id=i.id,i.id="",t.sub_view_mode&&t.parent_key&&(i[t.parent_key]=t.parent_value),t.current_edit_record=i,t.initEditView()}}n.loadSubView=function(e,t,i){Global.loadViewSource("Invoice","SubInvoiceView.html",(function(n){var a=_.template(n);Global.isSet(t)&&t(),Global.isSet(e)&&(e.html(a({})),Global.isSet(i)&&i(sub_invoice_view_controller))}))}}}]);
//# sourceMappingURL=invoice-invoice-InvoiceViewController.bundle.js.map?v=8bb228afeb68bc1d1c4f