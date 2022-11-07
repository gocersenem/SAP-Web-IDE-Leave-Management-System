sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/ui/model/Filter',
	'sap/ui/model/FilterOperator',
	'sap/ui/core/Fragment'

], function(Controller, Filter, FilterOperator, Fragment) {
	"use strict";
	var oModel;
	var base;
	var odataModel;

	return Controller.extend("PersonelP.PersonelP.controller.Sorgulama", {

		onInit: function() {

			oModel = this.getOwnerComponent().getModel("MainModel");

		},
		searchEmployee: function(oEvent) {
			var value = oModel.getProperty("/value");
			base = this;

			odataModel = base.getOwnerComponent().getModel("service");
			base.getOwnerComponent().setModel(odataModel);
			var filters = [];
			filters.push(new Filter("IPernr", FilterOperator.EQ, value));

			var oFilter = [
				new sap.ui.model.Filter({
					filters: filters,
					and: true
				})
			];
			odataModel.read("/ListSet", {
				filters: oFilter,
				success: function(oData) {
					if (oData) {
						var persons = oData.results;
						oModel = base.getOwnerComponent().getModel("MainModel");
						oModel.setProperty("/persons", persons);
						base.getOwnerComponent().setModel(persons, oModel);
					
					}
				},
				error: function(error) {},
				failed: function() {}
			});
		},
		handleSearch:function(oEvent){
			var sValue = oEvent.getParameter("value");
			var oFilter = new Filter("no", FilterOperator.Contains, sValue);
			var oBinding = oEvent.getSource().getBinding("items");
			oBinding.filter([oFilter]);
		},
		handleValueHelp: function() {

		
			var perno = [{
				no: "2"
			}, {
				no: "3"
			}, {
				no: "4"
			}, {
				no: "5"
			}, {
				no: "6"
			}, {
				no: "7"
			}, {
				no: "8"
			}, {
				no: "9"
			}];
			oModel.setProperty("/pernos", perno);
			if (!this.oDialog) {
				this.oDialog = sap.ui.xmlfragment("PersonelP.PersonelP.view.Personel", this);
			}
			this.getView().addDependent(this.oDialog);
			this.oDialog.open();
		},
		
		handleValueHelpClose: function(oEvent) {

			oModel = this.getOwnerComponent().getModel("MainModel");
			var aProducts = oModel.getProperty("/pernos");
			var spath = oEvent.getSource()._oTable._aSelectedPaths[0];
			var index = spath.slice("8");
			var item = parseInt(index);
			var value = aProducts[item].no;
			oModel.setProperty("/value", value);
		}
	});

});