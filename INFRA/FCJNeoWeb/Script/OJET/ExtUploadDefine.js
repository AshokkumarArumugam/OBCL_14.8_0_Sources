define(['jquery', 'ojs/ojcore', 'knockout', 'ojs/ojarraydataprovider','ojs/ojpagingdataproviderview','ojs/ojdialog',"ojs/ojselectcombobox","ojs/ojselectsingle", "ojs/ojinputsearch", 'ojs/ojinputtext', 'ojs/ojselectsingle', 'ojs/ojselectcombobox', 'ojs/ojarraytabledatasource', 'ojs/ojpagingtabledatasource', 'ojs/ojswitch', "ojs/ojlabelvalue", "ojs/ojbutton", 'ojs/ojpopup','ojs/ojtable','ojs/ojfilepicker'], function ($, oj, ko, ArrayDataProvider) {

    function mainContentViewModel(context) {
    };
    $(document).ready(function () {
        try {
            mainWinKo = ko;
           
            ko.applyBindings();
            setHeights();
            setTimeout(function () {
            fnPostLoadImageScr(mainWinKo);
            },0);
        }
        catch (e) { 
            //console.log(e);
        }
    });
});