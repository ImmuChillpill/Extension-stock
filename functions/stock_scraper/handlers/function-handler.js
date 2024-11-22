'use strict'; //NO I18N
const Cliq = require('zcatalyst-integ-cliq'); //NO I18N
const functionHandler = Cliq.CliqFunction();

functionHandler.buttonFunctionHandler(async (req, res) => {
    res.setText('Button function executed'); //NO I18N
    return res;
});

functionHandler.formSubmitHandler(async (req, res) => {

    const values = req.form.values;

    const type = values.type;
    if(type !== undefined) {
        if(comp(type, 'formtab')) {
            const widgetResponse = functionHandler.newWidgetResponse();
            widgetResponse.type = 'applet';

            const titleSection = widgetResponse.newWidgetSection();
            titleSection.id = '100';

            const editedBy = titleSection.newWidgetElement();
            editedBy.type = 'title';
            editedBy.text = 'Edited by ' + values.text + ' :wink:'; //NO I18N

            const time = titleSection.newWidgetElement();
            time.type = 'subtext';
            time.text = 'Target:buttons\nTime : ' + new Date().toISOString().replace('T', ' ').replace('Z', ''); //NO I18N

            titleSection.addElement(editedBy, time);
            widgetResponse.addSection(titleSection, getButtonSection());
            return widgetResponse;
        }
        else if (comp(type, 'formsection')) {
            const section = functionHandler.newWidgetResponse().newWidgetSection();
            section.id = '102';
            section.type = 'section';

            const editedBy = section.newWidgetElement();
            editedBy.type = 'title';
            editedBy.text = 'Edited by ' + values.text + ' :wink:'; //NO I18N

            section.addElement(editedBy);

            return section;
        }
        else {
            const msg = functionHandler.newHandlerResponse().newMessage();
            msg.text = 'Applet Button executed successfully'; //NO I18N
            msg.type = 'banner';
            msg.status = 'success'; //NO I18N
            return msg;
        }
    }

    const text = `Hi ${values.username}, thanks for raising your request. Your request will be processed based on the device availability.`;
    res.setText(text);
    const card = res.newCard();
    card.title = 'Asset Request'; //NO I18N
    res.card = card;

    const slide = res.newSlide();
    slide.type = 'label';
    slide.title = '';

    const dataArr = [];
    const obj1 = {
        'Asset type': values['asset-type'].label //NO I18N
    };
    dataArr.push(obj1);
    if(comp(values['asset-type'].value, 'mobile')) {
        const obj2= {
            'Preferred OS': values['mobile-os'].label //NO I18N
        }
        dataArr.push(obj2);
        const obj3 = {
            'Preferred Devices': values['mobile-list'].label //NO I18N
        }
        dataArr.push(obj3);
    }
    else {
        const obj2 = {
            'Device Preferred': values['os-type'].label //NO I18N
        }
        dataArr.push(obj2);
    }
    slide.data = dataArr;
    res.addSlide(slide);
    return res;
});

functionHandler.formChangeHandler(async (req, res) => {
    const target = req.target.name;
    const values = req.form.values;
    const fieldValue = values['asset-type'].value; //NO I18N

    if(comp(target, 'asset-type')) {

        if(fieldValue !== undefined && comp(fieldValue, 'laptop')) {
            const selectBoxAction = res.newFormModificationAction();
            selectBoxAction.type = 'add_after';
            selectBoxAction.name = 'asset-type';

            const os = selectBoxAction.newFormInput();
            os.trigger_on_change = true;
            os.type = 'select';
            os.name = 'os-type';
            os.label = 'Laptop Type'; //NO I18N
            os.hint = 'Choose your preferred OS type'; //NO I18N
            os.placeholder = 'Ubuntu'; //NO I18N
            os.mandatory = true;

            const mac = os.newFormValue();
            mac.label = 'Mac OS X'; //NO I18N
            mac.value = 'mac'; //NO I18N

            const windows = os.newFormValue();
            windows.label = 'Windows'; //NO I18N
            windows.value = 'windows'; //NO I18N

            const ubuntu = os.newFormValue();
            ubuntu.label = 'Ubuntu'; //NO I18N
            ubuntu.value = 'ubuntu';//NO I18N

            os.addOption(mac, windows, ubuntu);
            selectBoxAction.input = os;

            const removeMobileOSAction = res.newFormModificationAction();
            removeMobileOSAction.type = 'remove';
            removeMobileOSAction.name = 'mobile-os';

            const removeMobileListAction = res.newFormModificationAction();
            removeMobileListAction.type = 'remove';
            removeMobileListAction.name = 'mobile-list';

            res.addAction(selectBoxAction, removeMobileOSAction, removeMobileListAction);

        }
        else if (fieldValue !== undefined && comp(fieldValue,'mobile')) {
            const selectBoxAction = res.newFormModificationAction();
            selectBoxAction.type = 'add_after';
            selectBoxAction.name = 'asset-type';

            const os = selectBoxAction.newFormInput();
            os.trigger_on_change = true;
            os.type = 'select';
            os.name = 'mobile-os';
            os.label = 'Mobile OS'; //NO I18N
            os.hint = 'Choose your preferred mobile OS'; //NO I18N
            os.placeholder = 'Android'; //NO I18N
            os.mandatory = true;

            const android = os.newFormValue();
            android.label = 'Android'; //NO I18N
            android.value = 'android'; //NO I18N

            const ios = os.newFormValue();
            ios.label = 'iOS'; //NO I18N
            ios.value = 'ios'; //NO I18N

            os.addOption(android, ios);
            selectBoxAction.input = os;

            const removeOSTypeAction = res.newFormModificationAction();
            removeOSTypeAction.type = 'remove';
            removeOSTypeAction.name = 'os-type';

            res.addAction(selectBoxAction, removeOSTypeAction);
        }
    }
    else if (comp(target, 'mobile-os')) {
        if(fieldValue !== undefined) {
            const mobileListAction = res.newFormModificationAction();
            mobileListAction.type = 'add_after';
            mobileListAction.name = 'mobile-os';

            const listInput = mobileListAction.newFormInput();
            listInput.type = 'dynamic_select';
            listInput.name = 'mobile-list';
            listInput.label = 'Mobile Device'; //NO I18N
            listInput.placeholder = 'Choose your preferred mobile device'; //NO I18N
            listInput.mandatory = true;
            mobileListAction.input = listInput;

            res.addAction(mobileListAction);
        }
        else {
            const removeMobileListAction = res.newFormModificationAction();
            removeMobileListAction.type = 'remove';
            removeMobileListAction.name = 'mobile-list';

            res.addAction(removeMobileListAction);
        }
    }

    return res;
});

functionHandler.formDynamicFieldHandler(async (req, res) => {
    const target = req.target;
    let query = target.query;
    const values = req.form.values;

    if(comp(target.name, 'mobile-list') && values['mobile-os'] !== undefined) {
        const device = values['mobile-os'].value; //NO I18N
        if(comp(device, 'android')) {
            const arr = ['One Plus 6T', 'One Plus 6', 'Google Pixel 3', 'Google Pixel 2XL']; //NO I18N
            arr.filter((phone) => phone.match(new RegExp(query, 'i'))).
            forEach((phone) => res.addOption(res.newFormValue(phone, phone.toLowerCase().replace(new RegExp(' ', 'g'), '_'))));
        }
        else if (comp(device, 'ios')){
            const arr = ['IPhone XR', 'IPhone XS', 'IPhone X', 'IPhone 8 Plus']; //NO I18N
            arr.filter((phone) => phone.match(new RegExp(query,'i')))
            .forEach((phone) => res.addOption(res.newFormValue(phone, phone.toLowerCase().replace(new RegExp(' ', 'g'), '_'))));
        }
    }
    return res;
});

functionHandler.widgetButtonHandler(async (req, res) => {
    const id = req.target.id;
    switch(id) {
        case 'tab': {
            res.type = 'applet';

            const titleSection = res.newWidgetSection();
            titleSection.id = '100';

            const time = titleSection.newWidgetElement();
            time.type = 'subtext';
            time.text = 'Target:buttons\nTime : ' + new Date().toISOString().replace('T', ' ').replace('Z', ''); //NO I18N

            titleSection.addElement(time);
            res.addSection(titleSection, getButtonSection());

            return res;
        }
        case 'section' : {
            const section = res.newWidgetSection();
            section.id = '102';
            section.type = 'section';
            const element = section.newWidgetElement();
            element.type = 'title';
            element.text = 'Edited :wink: '; //NO I18N

            section.addElement(element);
            return section;
        }
        case 'formTab':
        case 'formsection': {
            const form = functionHandler.newHandlerResponse().newForm();
            form.title = 'Zylker Annual Marathon'; //NO I18N
            form.name = 'a';
            form.hint = 'Register yourself for the Zylker Annual Marathon'; //NO I18N
            form.button_label = 'Submit'; //NO I18N

            const input1 = form.newFormInput();
            input1.type = 'text';
            input1.name = 'text';
            input1.label = 'Name'; //NO I18N
            input1.placeholder = 'Scott Fischer'; //NO I18N
            input1.min_length = '0';
            input1.max_length = '25';
            input1.mandatory = true;

            const input2 = form.newFormInput();
            input2.type = 'hidden';
            input2.name = 'type';
            input2.value = id;

            form.addInputs(input1, input2);
            form.action = form.newFormAction('appletForm');// ** ENTER YOUR FORM FUNCTION NAME HERE **
            return form;
        }
        case 'breadcrumbs': {
            let page = parseInt(req.target.label.split("Page : ")[1].trim()) + 1;

            res.type = 'applet'; //NO I18N
            let section = res.newWidgetSection();
            section.id = '12345'; //NO I18N

            let elem = section.newWidgetElement();
            elem.type = 'subtext';
            elem.text = 'Page : ' + page; //NO I18N
            section.addElement(elem);
            res.addSection(section);

            let firstNav = {};
            firstNav.label = 'Page : ' + page; //NO I18N
            firstNav.type = 'invoke.function';
            firstNav.name = 'appletFunction';
            firstNav.id = 'breadcrumbs';

            let linkButton = {};
            linkButton.label = 'Link'; //NO I18N
            linkButton.type = 'open.url';
            linkButton.url = 'https://www.zoho.com'; //NO I18N

            let bannerButton = {};
            bannerButton.label = 'Banner'; //NO I18N
            bannerButton.type = 'invoke.function';
            bannerButton.name = 'appletFunction';
            bannerButton.id = 'banner';

            let headerButtons = [];
            headerButtons.push(firstNav, linkButton, bannerButton);
            let header = {
                title : 'Header ' + page, //NO I18N
                navigation : 'continue', //NO I18N
                buttons : headerButtons
            };
            res.header = header;

            let footerButtons = [];
            footerButtons.push(linkButton, bannerButton);
            let footer = {
                text : 'Footer text', //NO I18N
                buttons : footerButtons
            };
            res.footer = footer;

            return res;
        }
        default: {
            const msg = functionHandler.newHandlerResponse().newMessage();
            msg.text = 'Applet Button executed successfully'; //NO I18N
            msg.type = 'banner';
            msg.status = 'success'; //NO I18N
            return msg;
        }
    }
});

function getButtonSection() {
    const widgetResponse = functionHandler.newWidgetResponse();

    const buttonSection = widgetResponse.newWidgetSection();

    const title = buttonSection.newWidgetElement();
    title.type = 'title';
    title.text = 'Buttons'; //NO I18N

    const buttonElement1 = buttonSection.newWidgetElement();
    buttonElement1.type = 'buttons';
    const buttonsList1 = [];

    const button1 = buttonElement1.newWidgetButton();
    button1.label = 'link'; //NO I18N
    button1.type = 'open.url';
    button1.url = 'https://www.zoho.com'; //NO I18N

    const button2 = buttonElement1.newWidgetButton();
    button2.label = 'Banner'; //NO I18N
    button2.type = 'invoke.function';
    button2.name = 'appletFunction';
    button2.id = 'banner';

    const button3 = buttonElement1.newWidgetButton();
    button3.label = 'Open Channel'; //NO I18N
    button3.type = 'system.api';
    button3.setApi('joinchannel/{{id}}', 'CD_1283959962893705602_14598233');// ** ENTER YOUR CHANNEL ID HERE ** //NO I18N

    const button4 = buttonElement1.newWidgetButton();
    button4.label = 'Preview'; //NO I18N
    button4.type = 'preview.url';
    button4.url = 'https://www.zoho.com/catalyst/features.html'; //NO I18N

    buttonsList1.push(button1, button2, button3, button4);

    buttonElement1.addWidgetButton(...buttonsList1);

    //Buttons - Row2

    const buttonElement2 = buttonSection.newWidgetElement();
    buttonElement2.type = 'buttons';

    const button5 = buttonElement2.newWidgetButton();
    button5.label = 'Edit Section'; //NO I18N
    button5.type = 'invoke.function';
    button5.name = 'appletFunction';
    button5.id = 'section';

    const button6 = buttonElement2.newWidgetButton();
    button6.label = 'Form Edit Section'; //NO I18N
    button6.type = 'invoke.function';
    button6.name = 'appletFunction';
    button6.id = 'formsection';

    const button7 = buttonElement2.newWidgetButton();
    button7.label = 'Banner'; //NO I18N
    button7.type = 'invoke.function';
    button7.name = 'appletFunction';
    button7.id = 'banner';

    const button8 = buttonElement2.newWidgetButton();
    button8.label = 'Edit Whole Tab'; //NO I18N
    button8.type = 'invoke.function';
    button8.name = 'appletFunction';
    button8.id = 'tab';

    const button9 = buttonElement2.newWidgetButton();
    button9.label = 'Form Edit Tab'; //NO I18N
    button9.type = 'invoke.function';
    button9.name = 'appletFunction';
    button9.id = 'formTab';

    buttonElement2.addWidgetButton(button5, button6, button7, button8, button9);

    buttonSection.addElement(title, buttonElement1, buttonElement2);
    buttonSection.id = '101';

    return buttonSection;
}

function comp(var1, var2) {
    return var1.toUpperCase() === var2.toUpperCase();
}