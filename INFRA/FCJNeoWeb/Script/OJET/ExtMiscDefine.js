define(['jquery', 'ojs/ojcore', 'knockout', 'ojs/ojarraydataprovider','ojs/ojpagingdataproviderview','ojs/ojdialog',"ojs/ojselectcombobox","ojs/ojselectsingle", "ojs/ojinputsearch", 'ojs/ojinputtext', 'ojs/ojselectsingle', 'ojs/ojselectcombobox', 'ojs/ojarraytabledatasource', 'ojs/ojpagingtabledatasource', 'ojs/ojswitch', "ojs/ojlabelvalue", "ojs/ojbutton", 'ojs/ojpopup','ojs/ojtable','ojs/ojfilepicker'], function ($, oj, ko, ArrayDataProvider) {

    function mainContentViewModel(context) {
    };
    $(document).ready(function () {
        try {
            mainWinKo = ko;
            amtFormatData = [{value : '.,', label : '.,'},{value : ',.', label : ',.'},{value : ', ', label : ', '}];
            dateDelimiterData = [{value : 'N', label : 'N'},{value : 'Y', label : 'Y'}];
            yesNoData = [{value : 'N', label : 'N'},{value : 'Y', label : 'Y'}];
            dateFormatData = [{value : 'M/d/yyyy', label : 'M/D/YYYY'},{value : 'MM/dd/yyyy', label : 'MM/DD/YYYY'},{value : 'yyyy-MM-dd', label : 'YYYY-MM-DD'},{value : 'dd-MMM-yyyy', label : 'DD-MMM-YYYY'},{value : 'dd-MM-yyyy', label : 'DD-MM-YYYY'},{value : 'dd.MM.yyyy', label : 'DD.MM.YYYY'}];
            numFormatMaskData= [{value : 'M', label : 'XXX,XXX,XXX,XXX'},{value : 'L', label : 'XX,XX,XX,XX,XXX'}];
            numFormatMaskDataProvider = new ArrayDataProvider(numFormatMaskData, 
            {
                keyAttributes : 'value'
            });
            amtFormatDataProvider = new ArrayDataProvider(amtFormatData, 
            {
                keyAttributes : 'value'
            });
            dateFormatDataProvider = new ArrayDataProvider(dateFormatData, 
            {
                keyAttributes : 'value'
            });
            yesNoDataProvider = new ArrayDataProvider(yesNoData, 
            {
                keyAttributes : 'value'
            });
            
            dateDelimiterDataProvider = new ArrayDataProvider(dateDelimiterData, { keyAttributes: 'value' });
             debugHeaders = ko.observableArray([]);
            if(mainWin.getItemDesc){ 
                debugHeaders = [{headerText : mainWin.getItemDesc("LBL_NO"), field : "Sno"},{headerText : mainWin.getItemDesc("LBL_FID"), field : "FID"},{headerText : mainWin.getItemDesc("LBL_TIME"), field : "Tim"},{headerText : mainWin.getItemDesc("LBL_FNAME"), field : "fnam"},{headerText : mainWin.getItemDesc("LBL_DEBUG_STMT"), field : "Debugstmt", maxWidth : "30rem"},{headerText : mainWin.getItemDesc("LBL_VALUE"), field : "val", template : "showDataCellTemplate"}];
            }
             parent.debugData = ko.observableArray();
             debugDataprovider = new ArrayDataProvider(parent.debugData);
             parent.debugDataCount=0;


            ko.applyBindings();
  	
            setHeights();
           
        }
        catch (e) {
        console.log(e);
        }

    });
});