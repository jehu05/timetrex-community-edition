(self.webpackChunktimetrex=self.webpackChunktimetrex||[]).push([["policy-holiday-HolidayViewController"],{677:(i,e,t)=>{"use strict";t.r(e),t.d(e,{"HolidayViewController":()=>a});class a extends BaseViewController{constructor(i={}){_.defaults(i,{el:"#holiday_view_container"}),super(i)}init(i){this.edit_view_tpl="HolidayEditView.html",this.permission_id="holiday_policy",this.viewId="Holiday",this.script_name="HolidayView",this.table_name_key="holidays",this.context_menu_name=$.i18n._("Holiday"),this.navigation_label=$.i18n._("Holiday")+":",this.api=TTAPI.APIHoliday,this.render(),this.sub_view_mode?this.buildContextMenu(!0):this.buildContextMenu(),this.sub_view_mode||this.initData()}getCustomContextMenuModel(){return{exclude:[ContextMenuIconName.mass_edit],include:[]}}buildEditViewUI(){super.buildEditViewUI();var i={"tab_holiday":{"label":$.i18n._("Holiday")},"tab_audit":!0};this.setTabModel(i),this.navigation.AComboBox({api_class:TTAPI.APIHoliday,id:this.script_name+"_navigation",allow_multiple_selection:!1,layout_name:"global_holiday_holoday",navigation_mode:!0,show_search_inputs:!0}),this.setNavigation();var e=this.edit_view_tab.find("#tab_holiday").find(".first-column");this.edit_view_tabs[0]=[],this.edit_view_tabs[0].push(e);var t=Global.loadWidgetByName(FormItemType.TEXT_INPUT);t.TTextInput({field:"name",width:"100%"}),this.addEditFieldToColumn($.i18n._("Name"),t,e,""),t.parent().width("45%"),(t=Global.loadWidgetByName(FormItemType.DATE_PICKER)).TDatePicker({field:"date_stamp"}),this.addEditFieldToColumn($.i18n._("Date"),t,e,"")}}a.loadSubView=function(i,e,t){Global.loadViewSource("Holiday","SubHolidayView.html",(function(a){var l=_.template(a);Global.isSet(e)&&e(),Global.isSet(i)&&(i.html(l({})),Global.isSet(t)&&TTPromise.wait("BaseViewController","initialize",(function(){t(sub_holiday_view_controller)})))}))}}}]);
//# sourceMappingURL=policy-holiday-HolidayViewController.bundle.js.map?v=336551a430e37e43e444