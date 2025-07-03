define(['jquery', 'ojs/ojcore', 'knockout', 'ojs/ojarraydataprovider','ojs/ojpagingdataproviderview', "ojs/ojoffcanvas",'ojs/ojdialog',"ojs/ojselectcombobox", "ojs/ojoffcanvas","ojs/ojselectsingle", "ojs/ojinputsearch","ojs/ojconverter-number", "ojs/ojmenu","ojs/ojoption", 'ojs/ojinputtext', 'ojs/ojnavigationlist', 'ojs/ojradioset', 'ojs/ojtable', 'ojs/ojswitcher', 'ojs/ojselectsingle', 'ojs/ojselectcombobox', 'ojs/ojarraytabledatasource', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojswitch', "ojs/ojlabelvalue", "ojs/ojbutton", "ojs/ojswitch", 'ojs/ojnavigationlist', 'ojs/ojconveyorbelt', 'ojs/ojpopup', 'ojs/ojcollapsible', 'ojs/ojconveyorbelt', "ojs/ojselector"], function ($, oj, ko, ArrayDataProvider, PagingDataProviderView,OffcanvasUtils, ojconverter_number_1) {

    function mainContentViewModel(context) {
    };
    $(document).ready(function () {
        var model = new mainContentViewModel();
        try {
            landingKo = ko;
            mainWinOffcanvasUtils = OffcanvasUtils;
            menuItems = ko.observableArray([]);        
            fastPastFids = ko.observableArray([]);
            menuSearchList = ko.observableArray([]);
            tempArrayDataProvider = ArrayDataProvider;
            pagingDataProviderView = PagingDataProviderView;
            
              setTimeout(function () {//Redwood_37288324
                fnLoadDashboard(xmlFileName,xslFileName);
                ko.cleanNode(document.getElementById("containerFldset"));
                ko.applyBindings(model, document.getElementById("containerFldset"));
              },0); //Redwood_37288324
        } 
        catch (e) {
            console.log(e);
        }

    });
});

var tempArrayDataProvider;
var pagingDataProviderView;
var selectControl={};
var selectArrayProvider={};
var multipleEntryFieldList=[];
var meArrayForAddDelete = {};
