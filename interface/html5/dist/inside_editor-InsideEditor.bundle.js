(self.webpackChunktimetrex=self.webpackChunktimetrex||[]).push([["inside_editor-InsideEditor"],{1745:()=>{var e;(e=jQuery).fn.InsideEditor=function(t){Global.addCss("global/widgets/inside_editor/InsideEditor.css");var n,i,r=e.extend({},e.fn.InsideEditor.defaults,t),o=this;return this.rows_widgets_array=null,this.delete_ids=null,this.addRow=null,this.setValue=null,this.getValue=null,this.removeRow=null,this.updateAllRows=null,this.editor_data=null,this.onFormItemChange=null,this.parent_controller=null,this.api=null,this.setValue=function(e){e&&e.length>0?this.setValue(e):this.addRow()},this.getRender=function(){return i},this.getRowRender=function(){return n.clone()},this.clearErrorStyle=function(){},this.getField=function(){},this.setTitle=function(e){o.children().eq(0).text(e)},this.removeLastRowLine=function(){var e=this.find(".inside-editor-render"),t=e.find("tr");e.find("td").removeClass("no-line"),t.eq(t.length-1).find("td").addClass("no-line")},this.removeAllRows=function(t){var n=this.find(".inside-editor-render");n.find("tr"),t?n.find("tr").each((function(){e(this).remove()})):n.find("tr.inside-editor-row").remove(),this.rows_widgets_array=[]},this.setWidgetEnableBaseOnParentController=function(e){this.parent_controller.is_viewing?e.setEnabled(!1):e.setEnabled(!0)},this.addIconsEvent=function(t){var n=t.find(".plus-icon"),r=t.find(".minus-icon");n.click((function(){o.addRow(null,e(this).parents("tr").index(),t)})),r.click((function(){o.removeRow(t),1===i.find("tr").length&&o.addRow()}))},this.getDefaultData=function(e){Global.isSet(this.api)&&this.api["get"+this.api.key_name+"DefaultData"]({onResult:function(t){var n=t.getResult();n.id=!1,n||(n=[]),o.addRow(n,e)}})},this.each((function(){var t=e.meta?e.extend({},r,e(this).data()):r;t.title&&o.setTitle(t.title),t.onFormItemChange&&(o.onFormItemChange=t.onFormItemChange),o.rows_widgets_array=[],o.delete_ids=[],o.addRow=t.addRow,o.removeRow=t.removeRow,o.getValue=t.getValue,o.setValue=t.setValue,o.parent_controller=t.parent_controller,o.api=t.api,o.updateAllRows=t.updateAllRows,i=Global.loadWidget(t.render),n=e(Global.loadWidget(t.row_render));var l=t.render_args,s=_.template(i),d=o.children().eq(1);d.append(s(l)),i=e(d.find(".inside-editor-render"))})),o.bind("formItemChange",(function(e,t){"function"==typeof o.parent_controller.setIsChanged&&o.parent_controller.setIsChanged(t)})),this},e.fn.InsideEditor.defaults={}}}]);
//# sourceMappingURL=inside_editor-InsideEditor.bundle.js.map?v=aaa5e90e38282a068c30