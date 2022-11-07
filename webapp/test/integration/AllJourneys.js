/*global QUnit*/

jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
QUnit.config.autostart = false;

sap.ui.require([
	"sap/ui/test/Opa5",
	"PersonelP/PersonelP/test/integration/pages/Common",
	"sap/ui/test/opaQunit",
	"PersonelP/PersonelP/test/integration/pages/Worklist",
	"PersonelP/PersonelP/test/integration/pages/Object",
	"PersonelP/PersonelP/test/integration/pages/NotFound",
	"PersonelP/PersonelP/test/integration/pages/Browser",
	"PersonelP/PersonelP/test/integration/pages/App"
], function (Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "PersonelP.PersonelP.view."
	});

	sap.ui.require([
		"PersonelP/PersonelP/test/integration/WorklistJourney",
		"PersonelP/PersonelP/test/integration/ObjectJourney",
		"PersonelP/PersonelP/test/integration/NavigationJourney",
		"PersonelP/PersonelP/test/integration/NotFoundJourney",
		"PersonelP/PersonelP/test/integration/FLPIntegrationJourney"
	], function () {
		QUnit.start();
	});
});