'use strict'; // NO I18N

const cliq = require('zcatalyst-integ-cliq'); // NO I18N
const command = cliq.command();
const https = require('https'); // NO I18N

command.executionHandler(async (req, res) => {
    let text;
    const commandName = req.name;
    if (comp(commandName, 'catalystresource')) {
        const suggestions = req.selections;
        if(suggestions === undefined || suggestions.length === 0) {
            text = 'Please select a suggestion from the command'; // NO I18N
        }
        else {
            const prefix = 'Take a look at our '; // NO I18N
            if(comp(suggestions[0].title, 'API doc')) {
                text = prefix + '[API Documentation](https://www.zoho.com/catalyst/help/api/introduction/overview.html)';
            }
            else if (comp(suggestions[0].title, 'CLI doc')) {
                text = prefix + '[CLI Documentation](https://www.zoho.com/catalyst/help/cli-command-reference.html)';
            }
            else {
                text = prefix + '[help documentation](https://www.zoho.com/catalyst/help/)';
            }
        }
    }
    else if(comp(commandName, 'getform')) {      
        return getForm();
    }
    else {
        text = 'Command executed successfully!'; // NO I18N
    }
    res.text = text;
    return res;
});

command.suggestionHandler(async (req, res) => {
    if(comp(req.name,'catalystresource')) {
        const suggestion1 = command.newCommandSugestion();
        suggestion1.title = 'API doc'; // NO I18N
        suggestion1.description = 'Catalyst API documentation'; // NO I18N
        suggestion1.imageurl = 'https://www.zohowebstatic.com/sites/default/files/styles/product-home-page/public/catalyst-icon.png'; // NO I18N

        const suggestion2 = command.newCommandSugestion();
        suggestion2.title = 'CLI doc'; // NO I18N
        suggestion2.description = 'Catalyst CLI documentation'; // NO I18N
        suggestion2.imageurl = 'https://www.zohowebstatic.com/sites/default/files/styles/product-home-page/public/catalyst-icon.png'; // NO I18N

        const suggestion3 = command.newCommandSugestion();
        suggestion3.title = 'Help docs'; // NO I18N
        suggestion3.description = 'Catalyst help documentation'; // NO I18N
        suggestion3.imageurl = 'https://www.zohowebstatic.com/sites/default/files/styles/product-home-page/public/catalyst-icon.png'; // NO I18N

        res.push(suggestion1,suggestion2,suggestion3);
        return res;
    }
});

function getForm() {
    const form = command.newHandlerResponse().newForm();
    form.title = 'Asset Request'; // NO I18N
    form.hint = 'Raise your asset request'; // NO I18N
    form.name = 'ID';
    form.button_label = 'Raise Request'; // NO I18N
    form.version = 1;

    const actions = form.newFormActionsObject();
    actions.submit = actions.newFormAction('formFunctionLatest');// ** ENTER YOUR FORM FUNCTION NAME HERE ** //NO I18N
    form.actions = actions;

    const userName = form.newFormInput();
    userName.type = 'text';
    userName.name = 'username';
    userName.label = 'Name'; // NO I18N
    userName.hint = 'Please enter your name'; // NO I18N
    userName.placeholder = 'John Reese'; // NO I18N
    userName.mandatory = true;
    userName.value = 'Harold Finch'; // NO I18N
    form.addInputs(userName);

    const email = form.newFormInput();
    email.type = 'text';
    email.format = 'email'; // NO I18N
    email.name = 'email';
    email.label = 'Email'; // NO I18N
    email.hint = 'Enter your email address'; // NO I18N
    email.placeholder = "johnreese@poi.com"; // NO I18N
    email.mandatory = true;
    email.value = "haroldfinch@samaritan.com"; // NO I18N
    
    const assetType = form.newFormInput();
    assetType.type = 'select';
    assetType.trigger_on_change = true;
    assetType.name = 'asset-type';
    assetType.label = "Asset Type"; // NO I18N
    assetType.hint = "Choose your request asset type"; // NO I18N
    assetType.placeholder = "Mobile"; // NO I18N
    assetType.mandatory = true;   
    assetType.addOption(assetType.newFormValue('Laptop', 'laptop'));
    assetType.addOption(assetType.newFormValue('Mobile', 'mobile'));
    
    form.addInputs(email, assetType);
    return form;
}

function comp(var1, var2) {
    return var1.toUpperCase() === var2.toUpperCase();
}