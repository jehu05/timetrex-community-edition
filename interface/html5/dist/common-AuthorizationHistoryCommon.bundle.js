(self.webpackChunktimetrex=self.webpackChunktimetrex||[]).push([["common-AuthorizationHistoryCommon"],{5533:(i,t,o)=>{"use strict";o.r(t),o.d(t,{"AuthorizationHistory":()=>r});var r={authorization_api:null,authorization_history_columns:[],authorization_history_default_display_columns:[],host_view_controller:null,init:function(i){if($(".authorization-grid-div").hide(),!i.is_add){var t=$(".authorization-grid-div .grid-title");t.html("");var o=Global.loadWidgetByName(FormItemType.SEPARATED_BOX);o.SeparatedBox({label:$.i18n._("Authorization History")}),o.attr("id","authorization_history"),i.addEditFieldToColumn(null,o,t),this.host_view_controller=i,this.authorization_api=TTAPI.APIAuthorization;var r=this;return this.getAuthorizationHistoryColumns((function(){r.initAuthorizationHistoryLayout((function(){r.setAuthorizationGridSize()}))})),r}},initAuthorizationHistoryLayout:function(i){var t=this;this.getAuthorizationHistoryDefaultDisplayColumns((function(){t.host_view_controller.edit_view&&(t.setAuthorizationHistorySelectLayout(),t.initAuthorizationHistoryData(),i&&i())}))},initAuthorizationHistoryData:function(i){var t={filter_data:{},filter_columns:{"created_by":!0,"created_date":!0,"authorized":!0}};t.filter_data.object_id=[this.host_view_controller.current_edit_record.id],t.filter_data.object_type_id=this.host_view_controller.hierarchy_type_id?this.host_view_controller.hierarchy_type_id:this.host_view_controller.current_edit_record.hierarchy_type_id;var o=this;this.authorization_api["get"+this.authorization_api.key_name](t,{onResult:function(i){if(o.host_view_controller.edit_view){var t=i.getResult();i.isValid()&&Global.isArray(t)&&t.length>=1?(t=Global.formatGridData(t,o.authorization_api.key_name),o.authorization_history_grid.setData(t),$(o.host_view_controller.edit_view.find(".authorization-grid-div")).show(),o.showAuthorizationHistoryGridBorders(),o.setAuthorizationGridSize()):$(o.host_view_controller.edit_view.find(".authorization-grid-div")).hide()}}})},setAuthorizationGridSize:function(){var i;this.authorization_history_grid&&this.authorization_history_grid.grid.is(":visible")&&((i=this.authorization_history_grid.getData().length)>5&&(i=5),this.authorization_history_grid.grid.setGridWidth($(this.host_view_controller.edit_view.find("#authorization_history")).width()),this.authorization_history_grid.grid.setGridHeight(25*i))},buildAuthorizationDisplayColumns:function(i){for(var t=this.authorization_history_columns.length,o=i.length,r=[],a=0;a<o;a++)for(var e=0;e<t;e++)i[a]===this.authorization_history_columns[e].value&&r.push(this.authorization_history_columns[e]);return r},showAuthorizationHistoryGridBorders:function(){var i=this.host_view_controller.edit_view.find(".grid-top-border"),t=this.host_view_controller.edit_view.find(".grid-bottom-border");i.css("display","block"),t.css("display","block")},getAuthorizationHistoryDefaultDisplayColumns:function(i){var t=this;this.authorization_api.getOptions("default_display_columns",{onResult:function(o){var r=o.getResult();t.authorization_history_default_display_columns=r,i&&i()}})},getAuthorizationHistoryColumns:function(i){var t=this;this.authorization_api.getOptions("columns",{onResult:function(o){var r=o.getResult();t.authorization_history_columns=Global.buildColumnArray(r),i&&i()}})},setAuthorizationHistorySelectLayout:function(i){var t=this.host_view_controller.edit_view.find("#grid");t&&t.attr("id","authorization_history_grid");for(var o=[],r=this.buildAuthorizationDisplayColumns(this.authorization_history_default_display_columns),a=r.length,e=0;e<a;e++){var n=r[e],h={name:n.value,index:n.value,label:n.label,width:100,sortable:!1,title:!1};o.push(h)}this.authorization_history_grid&&(this.authorization_history_grid.grid.jqGrid("GridUnload"),this.authorization_history_grid=null),this.authorization_history_grid=new TTGrid("authorization_history_grid",{onResizeGrid:!1,winMultiselect:!1,multiselect:!1,width:this.host_view_controller.edit_view.find(".edit-view-tab").width()},o)}}}}]);
//# sourceMappingURL=common-AuthorizationHistoryCommon.bundle.js.map?v=21ab7fb9d353f8465e76