'use strict'; // NO I18N

const Cliq = require('zcatalyst-integ-cliq'); // NO I18N
const widget = Cliq.widget();

widget.viewHandler(async (req, res) => {
    res.type = 'applet';

    const catalystTab = res.newWidgetTab('catalystTab', 'Zoho Catalyst'); // NO I18N
    const cliqTab = res.newWidgetTab('cliqTab', 'Zoho Cliq'); // NO I18N
    const infoTab = res.newWidgetTab('infoTab', 'Empty view'); // NO I18N
    const buttonTab = res.newWidgetTab('buttonTab', 'Button types'); // NO I18N

    res.addTab(catalystTab, cliqTab, infoTab, buttonTab);
    res.active_tab = catalystTab.id;

    if(comp(req.event, 'load') || comp(req.event, 'tab_click') && comp(req.target.id, 'catalystTab') || comp(req.event, 'refresh') && comp(req.target.id, 'catalystTab')) {

        // Datastore
        const datastoreSection = res.newWidgetSection();
        datastoreSection.id = '1';

        const divider = datastoreSection.newWidgetElement(); // common divider
        divider.type = 'divider';
        
        const dsTitle = datastoreSection.newWidgetElement();
        dsTitle.type = 'title';
        dsTitle.text = 'Datastore'; // NO I18N
        const dsButton = dsTitle.newWidgetButton();
        dsButton.type = 'open.url';
        dsButton.label = 'Link'; // NO I18N
        dsButton.url = 'https://www.zoho.com/catalyst/help/data-store.html'; // NO I18N
        dsTitle.addWidgetButton(dsButton);

        const dsText = datastoreSection.newWidgetElement();
        dsText.type = 'text';
        dsText.text = 'The Data Store in Catalyst is a cloud-based relational database management system which stores the persistent data of your application.'; // NO I18N

        datastoreSection.addElement(dsTitle, dsText, divider);

        // Functions
        const functionSection = res.newWidgetSection();
        functionSection.id = '2';

        const fnTitle = functionSection.newWidgetElement();
        fnTitle.type = 'title';
        fnTitle.text = 'Functions'; // NO I18N
        const fnButton = fnTitle.newWidgetButton();
        fnButton.type = 'invoke.function';
        fnButton.label = 'Click here'; // NO I18N
        fnButton.name = 'appletFunction';// ** ENTER YOUR WIDGET FUNCTION
											// NAME ** //NO I18N
        fnButton.id = 'widgetFn';
        fnTitle.addWidgetButton(fnButton);

        const fnText = functionSection.newWidgetElement();
        fnText.type = 'text';
        fnText.text = 'Catalyst Functions are custom-built coding structures which contain the intense business logic of your application.'; // NO I18N

        functionSection.addElement(fnTitle, fnText, divider);

        // AutoML
        const autoMLSection = res.newWidgetSection();
        autoMLSection.id = '3';

        const autoMLTitle = autoMLSection.newWidgetElement();
        autoMLTitle.type = 'title';
        autoMLTitle.text = 'AutoML'; // NO I18N

        const autoMLText = autoMLSection.newWidgetElement();
        autoMLText.type = 'text';
        autoMLText.text = 'AutoML (Automated Machine Learning) is the process of automating the end-to-end traditional machine learning model and applying it to solve the real-world problems.'; // NO I18N

        autoMLSection.addElement(autoMLTitle, autoMLText);

        res.addSection(datastoreSection, functionSection, autoMLSection);

    }
    else if(comp(req.event, 'tab_click') || comp(req.event, 'refresh')) {
        const target = req.target.id;

        res.active_tab = target;
        if(comp(target, 'infoTab')) {
            res.data_type = 'info'; // NO I18N
            const info = res.newWidgetInfo();
            info.title = 'Sorry! No tables found.'; // NO I18N
            info.description = 'Catalyst Datastore can be used to create and manage tables to store persistent data of your applications!'; // NO I18N
            info.image_url = 'https://www.zohowebstatic.com/sites/default/files/styles/product-home-page/public/catalyst-icon.png'; // NO I18N

            const linkBtn = info.newWidgetButton();
            linkBtn.label = 'Visit Zoho Catalyst'; // NO I18N
            linkBtn.type = 'open.url';
            linkBtn.url = 'https://console.catalyst.zoho.com'; // NO I18N
            info.button = linkBtn;
            res.info = info;

            return res;
        }
        else if (comp(target, 'cliqTab')) {
            
            // Bot
            const botSection = res.newWidgetSection();
            botSection.id = 4;

            const divider = botSection.newWidgetElement(); // common divider
            divider.type = 'divider';

            const botTitle = botSection.newWidgetElement();
            botTitle.type = 'title';
            botTitle.text = 'Bot'; // NO I18N

            const botText = botSection.newWidgetElement()
            botText.type = 'text';
            botText.text =  'Bot is your system powered contact or your colleague with which you can interact with as you do with any other person.' // NO I18N
                            +' The bot can be programmed to respond to your queries, to perform action on your behalf and to notify you for any important event.'; // NO I18N

            botSection.addElement(botTitle, botText, divider);

            // widget
            const widgetSection = res.newWidgetSection();
            widgetSection.id = '5';

            const widgetTitle = widgetSection.newWidgetElement();
            widgetTitle.type = 'title';
            widgetTitle.text = 'Widgets'; // NO I18N

            const widgetText = widgetSection.newWidgetElement();
            widgetText.type = 'text';
            widgetText.text =  'Widgets are a great way to customize your Cliq home screen. Imagine having a custom view of all the important data and functionality from the different apps that you use every day.'; // NO I18N

            widgetSection.addElement(widgetTitle, widgetText, divider);

            // Connections
            const connectionSection = res.newWidgetSection();
            connectionSection.id = '6';

            const connectionTitle = connectionSection.newWidgetElement();
            connectionTitle.type = 'title';
            connectionTitle.text = 'Connections'; // NO I18N

            const connectionText = connectionSection.newWidgetElement();
            connectionText.type = 'text';
            connectionText.text = 'Connections is an interface to integrate third party services with your Zoho Service, in this case, Cliq.' // NO I18N
                                  +' These connections are used in an URL invocation task to access authenticated data.' // NO I18N
                                  +' To establish a connection, it is necessary to provide a Connection Name, Authentication Type amongst other details.'; // NO I18N

            connectionSection.addElement(connectionTitle, connectionText, divider);

            res.addSection(botSection, widgetSection, connectionSection);

        }
        else if(comp(target, 'buttonTab')) {
            // Time
            const titleSection = res.newWidgetSection();
            titleSection.id = '100';

            const time = titleSection.newWidgetElement();
            time.type = 'subtext';
            time.text = 'Target:buttons\nTime : ' + new Date().toISOString().replace('T', ' ').replace('Z', ''); // NO I18N

            titleSection.addElement(time);

            // Buttons - Row1
            const buttonSection = res.newWidgetSection();

            const title = buttonSection.newWidgetElement();
            title.type = 'title';
            title.text = 'Buttons'; // NO I18N

            const buttonElement1 = buttonSection.newWidgetElement();
            buttonElement1.type = 'buttons';
            const buttonsList1 = [];

            const button1 = buttonElement1.newWidgetButton();
            button1.label = 'link'; // NO I18N
            button1.type = 'open.url';
            button1.url = 'https://www.zoho.com'; // NO I18N

            const button2 = buttonElement1.newWidgetButton();
            button2.label = 'Applet Button'; // NO I18N
            button2.type = 'invoke.function';
            button2.name = 'appletFunction';
            button2.id = 'banner';

            const button3 = buttonElement1.newWidgetButton();
            button3.label = 'Open Channel'; // NO I18N
            button3.type = 'system.api';
            button3.setApi('joinchannel/{{id}}', 'CD_1283959962893705602_14598233');// ** ENTER YOUR CHANNEL ID HERE ** // NO I18N

            const button4 = buttonElement1.newWidgetButton();
            button4.label = 'Preview'; // NO I18N
            button4.type = 'preview.url';
            button4.url = 'https://www.zoho.com/catalyst/features.html'; // NO I18N

            buttonsList1.push(button1, button2, button3, button4);

            buttonElement1.addWidgetButton(...buttonsList1);

            // Buttons - Row2

            const buttonElement2 = buttonSection.newWidgetElement();
            buttonElement2.type = 'buttons';

            const button5 = buttonElement2.newWidgetButton();
            button5.label = 'Edit Section'; // NO I18N
            button5.type = 'invoke.function';
            button5.name = 'appletFunction';
            button5.id = 'section';

            const button6 = buttonElement2.newWidgetButton();
            button6.label = 'Form Edit Section'; // NO I18N
            button6.type = 'invoke.function';
            button6.name = 'appletFunction';
            button6.id = 'formsection';

            const button7 = buttonElement2.newWidgetButton();
            button7.label = 'Banner'; // NO I18N
            button7.type = 'invoke.function';
            button7.name = 'appletFunction';
            button7.id = 'banner';

            const button8 = buttonElement2.newWidgetButton();
            button8.label = 'Edit Whole Tab'; // NO I18N
            button8.type = 'invoke.function';
            button8.name = 'appletFunction';
            button8.id = 'tab';

            const button9 = buttonElement2.newWidgetButton();
            button9.label = 'Form Edit Tab'; // NO I18N
            button9.type = 'invoke.function';
            button9.name = 'appletFunction';
            button9.id = 'formTab';

            buttonElement2.addWidgetButton(button5, button6, button7, button8, button9);

            buttonSection.addElement(title, buttonElement1, buttonElement2);
            buttonSection.id = '101';

            res.addSection(titleSection, buttonSection);
        }
    }

    let firstNav = {};
    firstNav.label = 'Page : 1'; //NO I18N
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
        title : 'Header 1', //NO I18N
        navigation : 'new', //NO I18N
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
});

function comp(var1, var2) {
    return var1.toUpperCase() === var2.toUpperCase();
}
