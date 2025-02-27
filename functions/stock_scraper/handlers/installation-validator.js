'use strict' // NO I18N
const Cliq = require('zcatalyst-integ-cliq'); // NO I18N
const installationValidator = Cliq.installationValidator();

installationValidator.validateInstallation(async (req, res) => {
    if(comp(req.user.first_name, '**INVALID_USER**') && comp(req.app_info.type, 'upgrade')) {
        res.status = 400;
        res.title = 'Update not allowed !'; // NO I18N
        res.message = 'Sorry. Update not allowed for the current app. Please contact admin.'; // NO I18N
    } else {
        res.status = 200;
    }
    return res;
});

function comp(var1, var2) {
    return var1.toUpperCase() === var2.toUpperCase();
}