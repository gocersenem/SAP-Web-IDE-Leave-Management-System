sap.ui.define([
		"PersonelP/PersonelP/controller/BaseController"
	], function (BaseController) {
		"use strict";

		return BaseController.extend("PersonelP.PersonelP.controller.NotFound", {

			/**
			 * Navigates to the worklist when the link is pressed
			 * @public
			 */
			onLinkPressed : function () {
				this.getRouter().navTo("worklist");
			}

		});

	}
);