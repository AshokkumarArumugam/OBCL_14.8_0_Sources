define(['jquery', 'ojs/ojcore', 'knockout', 'ojs/ojarraydataprovider', 'ojs/ojpagingdataproviderview', "ojs/ojconverter-number", 'ojs/ojinputtext', 'ojs/ojdialog','ojs/ojnavigationlist', 'ojs/ojradioset', 'ojs/ojtable', 'ojs/ojswitcher', 'ojs/ojselectsingle', 'ojs/ojselectcombobox', 'ojs/ojarraytabledatasource', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojswitch', "ojs/ojlabelvalue", "ojs/ojbutton", "ojs/ojswitch", 'ojs/ojnavigationlist', 'ojs/ojconveyorbelt', 'ojs/ojcollapsible'], function ($, oj, ko, ArrayDataProvider, PagingDataProviderView, ojconverter_number_1) {

    function mainContentViewModel(context) {
    };
    $(document).ready(function () {
        var model = new mainContentViewModel();
        try {
            screenKo = ko;
            ojconverter_number = ojconverter_number_1;
            tempArrayDataProvider = ArrayDataProvider;
            pagingDataProviderView = PagingDataProviderView;
            showTable = ko.observable(true);
            dbStrRootTableName = dataSrcLocationArray[0];
            dayFormatter = ko.observable((dateInfo) => {
                  var month = dateInfo.month, date = dateInfo.date, fullYear = dateInfo.fullYear;
                 var key =fullYear+"~"+month;
                  var holidayList =  mainWin.cahedCalendarData[key];
                  if(typeof(holidayList)=="undefined"){
                      holidayList = getHolidayList(fullYear,month) ;
                      mainWin.cahedCalendarData[key] = holidayList;
                  }
                  
                  if(holidayList!=""){
                      if (holidayList.charAt(date-1)=="H") {
                      return {
                          className: "calendar-holiday"
                      };
                  }
                   
                  }
                  return null;
              }); 
            setTimeout(function () {
           // multipleEntryFieldList=parent.multipleEntryFieldList;
                fnLoad()
                //ko.cleanNode(document.getElementById("DIVWNDContainer"));
                ko.applyBindings();
                //parent.mask();
                
                
                 setTimeout(function () {
                       try {
        //eval('fnPostLoad_' + screenName + '(parent.screenArgs);');
                  
       
    } catch(e) {
    console.log(e);
    }

              //  appendData();
                document.getElementById("BTN_EXIT_IMG").focus();
                 
                 },0);
                
              
            },
            0);
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