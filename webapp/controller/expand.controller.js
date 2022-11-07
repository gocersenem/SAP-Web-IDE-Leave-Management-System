sap.ui.define([
	"sap/ui/core/mvc/Controller", 'sap/ui/model/Filter',
	'sap/ui/model/FilterOperator'
], function(Controller, Filter, FilterOperator) {
	"use strict";
	var oModel;
	return Controller.extend("PersonelP.PersonelP.controller.expand", {

		onInit: function() {
			oModel = this.getOwnerComponent().getModel();
			var filters = [];
			filters.push(new Filter("IPernr", FilterOperator.EQ, "00000002"));
			oModel.read("/new_ExpandSet", {
				filters: filters,
				urlParameters: {
					"$expand": "Navnew_ET"
				},
				success: function(oData) {
					if (oData) {

					}
				},
				error: function(error) {},
				failed: function() {}
			});
		}

	});

});