sap.ui.define(['sap/ui/core/mvc/Controller'], function() {
	"use strict";

	return {
		textFormat: function(sValue) {
			if (sValue === "02") {
				return "onaylandı";
			} else if (sValue === "01") {
				return "onay sürecinde";
			}
		}

	};

});