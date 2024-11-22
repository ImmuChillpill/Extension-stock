'use strict'; // NO I18N

const Cliq = require('zcatalyst-integ-cliq'); // NO I18N
const messageActionHandler = Cliq.messageAction();

messageActionHandler.executionHandler(async (req, res) => {
    let text = '';

    const msgType = req.message.type;
    text = `Hey ${req.user ? req.user.first_name : 'user'}, You have performed an action on a *${msgType}*. ` // NO I18N
            + 'Manipulate the message variable and perform your own action.'; // NO I18N
    res.setText(text);
    return res;
});
