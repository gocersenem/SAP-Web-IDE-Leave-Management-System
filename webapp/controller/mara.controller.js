sap.ui.define([
	"sap/ui/core/mvc/Controller", 'sap/ui/core/Fragment', 'sap/ui/model/Filter',
	'sap/ui/model/FilterOperator'
], function(Controller, Fragment, Filter, FilterOperator) {
	"use strict";

	var oModel;

	return Controller.extend("PersonelP.PersonelP.controller.mara", {

		onInit: function() {
			oModel = this.getOwnerComponent().getModel("service");
	
		},
		onProducts: function() {
			if (!this.pDialog) {
				this.pDialog = sap.ui.xmlfragment("PersonelP.PersonelP.view.table", this);
			}
			this.getView().addDependent(this.pDialog);
			this.pDialog.open();
			var oModel2 = this.getOwnerComponent().getModel("MainModel");
			var filters = [];

			filters.push(new Filter("Matnr", FilterOperator.all, ""));
			oModel = this.getOwnerComponent().getModel("service");
			var oFilter = [
				new sap.ui.model.Filter({
					filters: filters,
					and: false //filtreler arasına true olursa "ve" mantıksal opretörü  false olurso "veya" mantıksal operatörü ekler.
				})
			];
			oModel.read("/ZsearchSet", {
				filters: oFilter,
				success: function(oData) {
					if (oData) {
						oModel2.setProperty("/materialsh", oData.results);
					}
				},
				error: function(error) {},
				failed: function() {}
			});

		},
		selectedMate: function(oEvent) {var oTable = this.getView().byId("t4");
			var oTable2 = this.getView().byId("t1");
			oTable.setVisible(false);
			oTable2.setVisible(true);
			var oModel2 = this.getOwnerComponent().getModel("MainModel");
			var data = oEvent.getSource("selectedItem")._aSelectedPaths[0];

			var index = data.slice("12");

			var obje = oModel2.getProperty("/materialsh")[index];

			oModel2.setProperty("/valueNR", obje.Matnr);
			oModel2.setProperty("/valueKL", obje.Matkl);
			this.close();

		},
		onCurrency: function() {

		},
		search: function() {	var oTable = this.getView().byId("t4");
			var oTable2 = this.getView().byId("t1");
			oTable.setVisible(true);
			oTable2.setVisible(false);
			if (!this.oDialog) {
				this.oDialog = sap.ui.xmlfragment("PersonelP.PersonelP.view.sh", this);
			}
			this.getView().addDependent(this.oDialog);
			this.oDialog.open();
			var oModel2 = this.getOwnerComponent().getModel("MainModel");
			var filters = [];

			filters.push(new Filter("Waers", FilterOperator.all, ""));
			oModel = this.getOwnerComponent().getModel("service");
			var oFilter = [
				new sap.ui.model.Filter({
					filters: filters,
					and: false //filtreler arasına true olursa "ve" mantıksal opretörü  false olurso "veya" mantıksal operatörü ekler.
				})
			];
			oModel.read("/search_helpSet", {
				filters: oFilter,
				success: function(oData) {
					if (oData) {
						oModel2.setProperty("/sh", oData.results);
					}
				},
				error: function(error) {},
				failed: function() {}
			});

		},
		selected: function(oEvent) {
		
			var oModel2 = this.getOwnerComponent().getModel("MainModel");
			var data = oEvent.getSource("selectedItem")._aSelectedPaths[0];
			var index = data.slice("4");
			var obje = oModel2.getProperty("/sh")[index];
			var filters = [];
			filters.push(new Filter("Waers", FilterOperator.EQ, obje.Waers));
			oModel = this.getOwnerComponent().getModel("service");
			var oFilter = [
				new sap.ui.model.Filter({
					filters: filters,
					and: false //filtreler arasına true olursa "ve" mantıksal opretörü  false olurso "veya" mantıksal operatörü ekler.
				})
			];
			oModel.read("/search_helpSet", {
				filters: oFilter,
				success: function(oData) {
					if (oData) {
						oModel2.setProperty("/currensh", oData.results);
					}
				},
				error: function(error) {},
				failed: function() {}
			});
			oModel2.setProperty("/valueWE", obje.Waers);
			this.closeC();
		},
		close: function() {
			this.pDialog.close();

		},
		closeC: function() {
			this.oDialog.close();

		},
		searchProduct: function(oEvent) {
			var oModel2 = this.getOwnerComponent().getModel("MainModel");

			var matnr = oModel2.getProperty("/valueNR");
			var matkl = oModel2.getProperty("/valueKL");
			var filters = [];

			if (matkl) {
				filters.push(new Filter("Matkl", FilterOperator.EQ, matkl));
			}
			if (matnr) {
				filters.push(new Filter("Matnr", FilterOperator.EQ, matnr));
			}

			oModel = this.getOwnerComponent().getModel("service");
			var oFilter = [
				new sap.ui.model.Filter({
					filters: filters,
					and: false //filtreler arasına true olursa "ve" mantıksal opretörü  false olurso "veya" mantıksal operatörü ekler.
				})
			];
			oModel.read("/MaraSet", {
				filters: oFilter,
				success: function(oData) {
					if (oData) {
						oModel2.setProperty("/material", oData.results);
					}
				},
				error: function(error) {},
				failed: function() {}
			});
			this.close();
		}

	});

});