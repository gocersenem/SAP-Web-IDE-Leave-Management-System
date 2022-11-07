sap.ui.define([
	"sap/ui/core/mvc/Controller", 'sap/ui/core/Fragment', 'sap/ui/model/Filter',
	'sap/ui/model/FilterOperator'
], function(Controller , Fragment, Filter , FilterOperator ) {
	"use strict";
	var oModel;
	return Controller.extend("PersonelP.PersonelP.controller.searchHelp", {
		onInit: function() {
				var s=this.getView().byId("t3");
		},
		Waers_SH: function() {
			if (!this.oDialog) {
				this.oDialog = sap.ui.xmlfragment("PersonelP.PersonelP.view.Waers", this);
			}
			this.getView().addDependent(this.oDialog);
			this.oDialog.open();
			var oModel2 = this.getOwnerComponent().getModel("MainModel");
			var filters = [];
			filters.push(new Filter("Waers", FilterOperator.all, ""));
			oModel = this.getOwnerComponent().getModel();
			var oFilter = [
				new sap.ui.model.Filter({
					filters: filters,
					and: false //filtreler arasına true olursa "ve" mantıksal opretörü  false olurso "veya" mantıksal operatörü ekler.
				})
			];
			oModel.read("/New_SHSet", {
				filters: oFilter,
				success: function(oData) {
					if (oData) {
						oModel2.setProperty("/searchHelp", oData.results);
					}
				},
				error: function(error) {},
				failed: function() {}
			});
		},
		selected:function(oEvent){
			var oModel2 = this.getOwnerComponent().getModel("MainModel");
			var data = oEvent.getSource("selectedItem")._aSelectedPaths[0];
			var index = data.slice("12");
			var obje = oModel2.getProperty("/searchHelp")[index];
			oModel2.setProperty("/Waers", obje.Waers);
			var filters = [];
			filters.push(new Filter("Waers", FilterOperator.EQ, obje.Waers));
			oModel = this.getOwnerComponent().getModel();
			var oFilter = [
				new sap.ui.model.Filter({
					filters: filters,
					and: false //filtreler arasına true olursa "ve" mantıksal opretörü  false olurso "veya" mantıksal operatörü ekler.
				})
			];
			oModel.read("/New_SHSet", {
				filters: oFilter,
				success: function(oData) {
					if (oData) {
						oModel2.setProperty("/Wtable", oData.results);
					}
				},
				error: function(error) {},
				failed: function() {}
			});
			this.close();
		}
		,
		close:function(){
			this.oDialog.close();
		}

	});

});