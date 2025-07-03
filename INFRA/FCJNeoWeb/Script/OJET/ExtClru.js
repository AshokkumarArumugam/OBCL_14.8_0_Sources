define(['jquery', 'ojs/ojcore', 'knockout', 'ojs/ojarraydataprovider', 'ojs/ojpagingdataproviderview', 'ojs/ojinputtext', 'ojs/ojnavigationlist', 'ojs/ojtable', 'ojs/ojswitcher',  'ojs/ojarraytabledatasource', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource',  "ojs/ojlabelvalue", "ojs/ojbutton", 'ojs/ojnavigationlist', 'ojs/ojpopup', 'ojs/ojcollapsible'], function ($, oj, ko, ArrayDataProvider, PagingDataProviderView) {

    function mainContentViewModel(context) {
    };
    $(document).ready(function () {
        var model = new mainContentViewModel();
        try {
            screenKo = ko;
            tempArrayDataProvider = ArrayDataProvider;
            pagingDataProviderView = PagingDataProviderView;
            showTable = ko.observable(true);
            dbStrRootTableName = dataSrcLocationArray[0];
            
            setTimeout(function () {
                fnLoadCLRU(xmlFileName, xslFileName);
                ko.cleanNode(document.getElementById("DIVWNDContainer"));
                ko.applyBindings(model, document.getElementById("DIVWNDContainer"));
                parent.unmask();
                 
                setTimeout(function () {
					//redwood_35357384 start
                     /*  if(document.getElementById("BTN_EXIT")){
                            document.getElementById("BTN_EXIT").focus();
                       } */					   
					   if(document.getElementById("BTN_EXIT_IMG")){
                            document.getElementById("BTN_EXIT_IMG").focus();
                       }
					//redwood_35357384 end   
                    fnPostLoadMain();
                },
                0);
            },
            0);
        }
        catch (e) {
        }

    });
});

