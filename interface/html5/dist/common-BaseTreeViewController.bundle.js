(self.webpackChunktimetrex=self.webpackChunktimetrex||[]).push([["common-BaseTreeViewController"],{1838:(e,t,i)=>{"use strict";i.r(t),i.d(t,{"BaseTreeViewController":()=>a});class a extends BaseViewController{setSelectLayout(e){Global.isSet(this.grid)||($(this.el).find("#grid").attr("id",this.ui_id+"_grid"),$(this.el).find("#"+this.ui_id+"_grid"));var t=[];this.select_layout||(this.select_layout={id:""},this.select_layout.data={filter_data:{},filter_sort:{}},this.select_layout.data.display_columns=this.default_display_columns);var i=this.select_layout.data;i.display_columns.length<1&&(i.display_columns=this.default_display_columns);var a=this.buildDisplayColumns(i.display_columns);a.length;Global.isSet(e);var s=a[0],l={name:s.value,index:s.value,label:this.grid_table_name,width:100,sortable:!1,title:!1};t.push(l),this.grid&&(this.grid.jqGrid("GridUnload"),this.grid=null),this.grid=new TTGrid(this.ui_id+"_grid",{multiselect:!1,winMultiSelect:!1,tree_mode:!0,onSelectRow:$.proxy(this.onGridSelectRow,this)},t),this.bindGridColumnEvents(),this.setGridHeaderStyle(),this.filter_data=this.select_layout.data.filter_data,this.showGridBorders(),this.setGridSize()}search(e,t,i){var a=this;Global.isSet(e)||(e=!0);var s={filter_data:{},filter_sort:{}};s.filter_columns=this.getFilterColumnsFromDisplayColumns(),s.filter_items_per_page=0,this.sub_view_mode&&this.parent_key&&(this.select_layout.data.filter_data[this.parent_key]=this.parent_value,Global.isSet(this.getSubViewFilter)&&(this.select_layout.data.filter_data=this.getSubViewFilter(this.select_layout.data.filter_data))),this.last_select_ids=this.getGridSelectIdArray(),s.filter_data=Global.convertLayoutFilterToAPIFilter(this.select_layout),s.filter_sort=this.select_layout.data.filter_sort,this.api["get"+this.api.key_name](s,!1,!1,{onResult:function(t){var i=t.getResult();i=Global.buildTreeRecord(i),a.grid_current_page_items=i,Global.isArray(i)?a.removeNoResultCover():a.showNoResultCover(),a.reSetGridTreeData(i),a.setGridSize(),ProgressBar.closeOverlay(),e&&a.setDefaultMenu(),0===LocalCacheData.paging_type&&(!a.pager_data||a.pager_data.is_last_page?a.paging_widget.css("display","none"):a.paging_widget.css("display","block")),a.reSelectLastSelectItems(),a.autoOpenEditViewIfNecessary(),a.searchDone()}})}reSetGridTreeData(e){var t=this,i=this.grid.getGridParam("colModel");this.grid.grid.jqGrid("GridUnload"),this.grid=null,this.grid=new TTGrid(this.ui_id+"_grid",{multiselect:!1,winMultiSelect:!1,datastr:e,datatype:"jsonstring",sortable:!1,onSelectRow:function(e){$("#ribbon_view_container .context-menu:visible a").click(),t.grid_select_id_array=[e],t.setDefaultMenu()},ondblClickRow:function(){t.onGridDblClickRow()},gridview:!0,treeGrid:!0,treeGridModel:"adjacency",treedatatype:"local",ExpandColumn:"name"},i)}getGridSelectIdArray(){return this.grid_select_id_array}initLayout(){var e=this;this.real_this=this.constructor.__super__,e.getDefaultDisplayColumns((function(){e.setSelectLayout(),e.search()}))}getAllColumns(e){var t=this;this.api.getOptions("columns",{onResult:function(i){var a=i.getResult();t.all_columns=Global.buildColumnArray(a),e&&e()}})}setCurrentEditRecordData(){for(var e in this.current_edit_record){var t=this.edit_view_ui_dic[e];if(Global.isSet(t))switch(e){case"parent_id":t.setSourceData(this.grid_current_page_items),t.setValue(this.current_edit_record[e]);break;default:t.setValue(this.current_edit_record[e])}}this.collectUIDataToCurrentEditRecord(),this.setEditViewDataDone()}setEditViewData(){if(this.is_changed=!1,!this.edit_only_mode){var e=this.edit_view.find(".navigation-div");if(Global.isSet(this.current_edit_record.id)&&this.current_edit_record.id){if(e.css("display","block"),!this.navigation.getSourceData()){this.navigation.setSourceData(this.grid_current_page_items);var t={};t.filter_data=Global.convertLayoutFilterToAPIFilter(this.select_layout),t.filter_sort=this.select_layout.data.filter_sort,this.navigation.setDefaultArgs(t)}this.navigation.setValue(this.current_edit_record)}else e.css("display","none")}for(var i in this.edit_view_ui_dic)Global.isSet(this.current_edit_record[i])||this.is_mass_editing||(this.current_edit_record[i]=!1);this.setNavigationArrowsStatus(),this.setCurrentEditRecordData(),this.edit_view.find(".save-and-continue-div").SaveAndContinueBox({related_view_controller:this}),this.edit_view.find(".save-and-continue-div").css("display","none"),1===this.edit_view_tab.tabs("option","active")&&(this.current_edit_record.id?(this.edit_view_tab.find("#tab_audit").find(".first-column-sub-view").css("display","block"),this.initSubLogView("tab_audit")):(this.edit_view_tab.find("#tab_audit").find(".first-column-sub-view").css("display","none"),this.edit_view.find(".save-and-continue-div").css("display","block"))),this.switchToProperTab()}addIdFieldToNavigation(e){return $.each(e,(function(e,t){$(t).each((function(e,t){t.id=t._id_}))})),e}doViewAPICall(e){return super.doViewAPICall(e,[e,!1,!1])}handleViewAPICallbackResult(e){return this.handleAPICallbackResult(e)}handleAPICallbackResult(e){var t=e.getResult(),i=this.getCurrentSelectedRecord();(t=(t=Global.getParentIdByTreeRecord(Global.buildTreeRecord(t),i))[0]).id=i,super.handleViewAPICallbackResult(t)}handleEditAPICallbackResult(e){return this.handleAPICallbackResult(e)}onDeleteDone(e){this.grid_select_id_array=[],this.setDefaultMenu(),this.removeDeletedRows()}onSaveDone(e){this.grid_select_id_array=[]}doEditAPICall(e){return super.doEditAPICall(e,[e,!1,!1])}_continueDoCopyAsNew(){var e=this;if(LocalCacheData.current_doing_context_action="copy_as_new",Global.isSet(this.edit_view)){this.current_edit_record.id="",this.edit_view.find(".navigation-div").css("display","none"),this.setEditMenu(),this.setTabStatus(),this.is_changed=!1,ProgressBar.closeOverlay()}else{var t={},i=this.getGridSelectIdArray();if(!(i.length>0))return void TAlertManager.showAlert($.i18n._("No selected record"));var a=i[0];t.filter_data={},this.api["get"+this.api.key_name](t,!1,!1,{onResult:function(t){var i=t.getResult();if(i=Global.buildTreeRecord(i),!(i=Global.getParentIdByTreeRecord(i,a)))return TAlertManager.showAlert($.i18n._("Record does not exist")),void e.onCancelClick();e.openEditView(),i=i[0],e.sub_view_mode&&e.parent_key&&(i[e.parent_key]=e.parent_value),e.current_edit_record=i,e.current_edit_record.id="",e.initEditView()}})}}buildEditViewUI(){var e=this;if(!this.edit_only_mode){var t=this.edit_view.find(".navigation-div"),i=t.find(".navigation-label"),a=t.find(".navigation-widget-div");this.navigation=Global.loadWidgetByName(FormItemType.AWESOME_BOX),i.text(this.navigation_label),a.append(this.navigation)}this.edit_view_close_icon=this.edit_view.find(".close-icon"),this.edit_view_close_icon.hide(),this.edit_view_close_icon.click((function(){e.onCloseIconClick()}));var s=Array();s[this.primary_tab_key]={"label":this.primary_tab_label},s.tab_audit={"label":$.i18n._("Audit"),"init_callback":"initSubLogView","display_on_mass_edit":!1,"display_on_add":!1},this.setTabModel(s),this.navigation.AComboBox({id:this.script_name+"_navigation",tree_mode:!0,allow_multiple_selection:!1,layout_name:"global_tree_column",navigation_mode:!0,show_search_inputs:!1,on_tree_grid_row_select:function(t,i){e.onTreeGridNavigationRowSelect(t,i)}});var l=t.find(".left-click"),r=t.find(".right-click");l.attr("src",Global.getRealImagePath("images/left_arrow.png")),r.attr("src",Global.getRealImagePath("images/right_arrow.png")),this.setNavigation();var d=this.edit_view_tab.find("#"+this.primary_tab_key).find(".first-column");this.edit_view_tabs[0]=[],this.edit_view_tabs[0].push(d);var o=Global.loadWidgetByName(FormItemType.AWESOME_BOX);o.AComboBox({tree_mode:!0,allow_multiple_selection:!1,layout_name:"global_tree_column",set_empty:!0,field:"parent_id"}),this.addEditFieldToColumn($.i18n._("Parent"),o,d,""),(o=Global.loadWidgetByName(FormItemType.TEXT_INPUT)).TTextInput({field:"name",width:"100%"}),this.addEditFieldToColumn($.i18n._("Name"),o,d,""),o.parent().width("45%")}}}}]);
//# sourceMappingURL=common-BaseTreeViewController.bundle.js.map?v=5e3819a46dd740484cb2