sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/ui/core/Fragment', "../model/formatter"
], function(Controller, Fragment, formatter) {
	"use strict";
	var oModel;
	var permissions = [];
	var perm;
	return Controller.extend("PersonelP.PersonelP.controller.PersonelIzin", {
		formatter: formatter,
		onInit: function() {
			oModel = this.getOwnerComponent().getModel("MainModel");
			var d = new Date();
			oModel.setProperty("/startdate", d);
			oModel.setProperty("/enddate", d);
			var tm = {
				"TP1": {
					"value": "09:00",
					"format": "HH:mm",
					"placeholder": "Enter meeting start time"
				},
				"TP2": {
					"value": "09:00",
					"format": "HH:mm",
					"placeholder": "Enter meeting start time"
				}
			};
			oModel.setProperty("/timePickers", tm);
		},

		addPermission: function() {
			oModel = this.getOwnerComponent().getModel("MainModel");
			var sDate = oModel.getProperty("/sDate");
			var eDate = oModel.getProperty("/eDate");
			var sTime = oModel.getProperty("/timePickers/TP1/value");
			var eTime = oModel.getProperty("/timePickers/TP2/value");
			var per = this.getView().byId("Permissions").getSelectedItem().getText();
			var perkey = this.getView().byId("Permissions").getSelectedItem().getKey();
			var plac = oModel.getProperty("/place");
			var des = oModel.getProperty("/description");
			var permission = {
				sDate: sDate,
				eDate: eDate,
				eTime: eTime,
				sTime: sTime,
				permis: per,
				permiskey: perkey,
				place: plac,
				status: "01",
				description: des
			};
			permissions.push(permission);
			var i = permissions.length - 1;

			oModel.setProperty("/index", i);
			oModel.setProperty("/permission", permissions);

		},
		clearPermission: function() {
			this.onInit();
			this.getView().byId("Permissions").setSelectedKey("0");
			oModel.setProperty("/place", " ");
			oModel.setProperty("/description", " ");
		},
		confirmPermission: function(oEvent) {
			var oItem = oEvent.getSource().getParent();
			var oTable = oItem.getParent();
			var index = oTable.indexOfItem(oItem);
			var i = parseInt(index);
			var permis = {
				sDate: permissions[i].sDate,
				eDate: permissions[i].eDate,
				eTime: permissions[i].eTime,
				sTime: permissions[i].sTime,
				permis: permissions[i].permis,
				place: permissions[i].plac,
				status: "02",
				description: permissions[i].des
			};
			permissions.splice(i, 1, permis);
			oModel.setProperty("/permission", permissions);
			oModel.setProperty("/index", i);
			oTable.getItems()[i].getCells()[5].setState("Success");
			oTable.getItems()[i].getCells()[5].setText("02");
			oTable.getItems()[i].getCells()[5].setIcon("sap-icon://sys-enter-2");
		},
		onEdit: function(oEvent) {
			var oTable = oEvent.getSource().getParent().getParent();
			oTable.setMode("SingleSelect");
			this.byId("editButton").setVisible(false);
			this.getView().byId("saveButton").setVisible(true);

		},
		selected: function(oEvent) {
			if (this.byId("saveButton").getVisible()) {

				var oTable = oEvent.getSource();
				var item = oTable.getSelectedItem();
				var i = oTable.indexOfItem(item);
				perm = {
					index: i,
					sDate: permissions[i].sDate,
					eDate: permissions[i].eDate,
					eTime: permissions[i].eTime,
					sTime: permissions[i].sTime,
					permis: permissions[i].permis,
					permiskey: permissions[i].permiskey,
					place: permissions[i].place,
					status: permissions[i].status,
					description: permissions[i].description
				};
				if (perm.status === "01") {

					oModel.setProperty("/sDate", perm.sDate);
					oModel.setProperty("/eDate", perm.eDate);
					oModel.setProperty("/timePickers/TP1/value}", perm.sTime);
					oModel.setProperty("/timePickers/TP2/value}", perm.eTime);
					oModel.setProperty("/description", perm.description);
					oModel.setProperty("/place", perm.place);
					this.byId("Permissions").setSelectedKey(perm.permiskey);
				} else if (perm.status === "02") {
					sap.m.MessageBox.show("Onaylı izinler düzenlenemez");
				}
			}
		},
		onSave: function(oEvent) {
				var oTable = oEvent.getSource().getParent().getParent();
				oTable.setMode("SingleSelectMaster");

				var item = oTable.getSelectedItem();
				var i = oTable.indexOfItem(item);
				perm = {
					index: i,
					sDate: permissions[i].sDate,
					eDate: permissions[i].eDate,
					eTime: permissions[i].eTime,
					sTime: permissions[i].sTime,
					permis: permissions[i].permis,
					permiskey: permissions[i].permiskey,
					place: permissions[i].place,
					status: permissions[i].status,
					description: permissions[i].description
				};
				if (perm.status === "01") {
					i = perm.index;
					var sDate = oModel.getProperty("/sDate");
					var eDate = oModel.getProperty("/eDate");
					var sTime = oModel.getProperty("/timePickers/TP1/value");
					var eTime = oModel.getProperty("/timePickers/TP2/value");
					var per = this.getView().byId("Permissions").getSelectedItem().getText();
					var perkey = this.getView().byId("Permissions").getSelectedItem().getKey();
					var plac = oModel.getProperty("/place");
					var des = oModel.getProperty("/description");
					var permission = {
						sDate: sDate,
						eDate: eDate,
						eTime: eTime,
						sTime: sTime,
						permis: per,
						permiskey: perkey,
						place: plac,
						status: "01",
						description: des
					};
					permissions.splice(i, 1, permission);
					oModel.setProperty("/permission", permissions);
				}

				this.byId("editButton").setVisible(true);
				this.byId("saveButton").setVisible(false);
			}
	});

});