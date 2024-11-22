'use strict'; // NO I18N
const Cliq = require('zcatalyst-integ-cliq'); // NO I18N
const installationHandler = Cliq.installationHandler();

installationHandler.handleInstallation(async (req, res) => {
    /*
	 * // Logic for installation post handling {
	 *  }
	 */

   res.status = 200;
   return res;
});