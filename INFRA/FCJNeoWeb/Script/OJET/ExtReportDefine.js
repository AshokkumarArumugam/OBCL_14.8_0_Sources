define(['jquery', 'ojs/ojcore', 'knockout', 'ojs/ojarraydataprovider', 'ojs/ojpagingdataproviderview', "ojs/ojconverter-number","ojs/ojcontext",'ojs/ojinputtext', 'ojs/ojnavigationlist', 'ojs/ojradioset', 'ojs/ojtable', 'ojs/ojswitcher', 'ojs/ojselectsingle', 'ojs/ojselectcombobox', 'ojs/ojarraytabledatasource', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojswitch', "ojs/ojlabelvalue", "ojs/ojbutton", "ojs/ojswitch", 'ojs/ojnavigationlist', 'ojs/ojconveyorbelt', 'ojs/ojpopup', 'ojs/ojcollapsible','ojs/ojdatetimepicker','ojs/ojvalidation-datetime'], function ($, oj, ko, ArrayDataProvider, PagingDataProviderView, ojconverter_number_1,Context) {

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
            var dateConverterFactory = oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME);
            var dateFormat =mainWin.systemDateFormat.toLowerCase();
            dateFormat = dateFormat.replace(/(m{2,4})/g, (match, p1) => { return p1.toUpperCase();})
            dateConverter = dateConverterFactory.createConverter({pattern: dateFormat});
            dayFormatter = ko.observable((dateInfo) => {
                  var month = dateInfo.month, date = dateInfo.date, fullYear = dateInfo.fullYear;
                 var key =fullYear+"~"+month;
                  var holidayList =  mainWin.cahedCalendarData[key];
                  var myDate = new Date(fullYear, month-1, date);
                  var isWeekend = (myDate.getDay() === 6 || myDate.getDay() === 0);
                  if(typeof(holidayList)=="undefined"){
                      holidayList = getHolidayList(fullYear,month) ;
                      mainWin.cahedCalendarData[key] = holidayList;
                  }
                  
                  if(holidayList!="" || isWeekend){
                      if (isWeekend || holidayList.charAt(date-1)=="H") {
                      return {
                          className: "calendar-holiday"
                      };
                  }
                   
                  }
                  return null;
              }); 
            setTimeout(function () {
                 fnLoad(xmlFileName, xslFileName,''); 
                 parent.unmask();
               ko.cleanNode(document.getElementById("DIVWNDContainer"));
             ko.applyBindings(model, document.getElementById("DIVWNDContainer"));
             fnCalcHgt();
            fnNew();
            fnDefaultReport();
            fnSetExitButton(true);
           // document.getElementById("BTN_EXIT_IMG").focus();
            p_Action = gAction;
            gAction = "NEW";
                //Fix for 17205256  start
            //showToolbar(functionId, '', '');
                showToolbar('', '', '');
                //Fix for 17205256  end 
           // gAction = p_Action; commented for 17078745 
            // fnSetReportParam();
              setTimeout(function () {
            if (!fnPostLoadMain()) return false;
              },0);
            
            },
            0);
        }
        catch (e) {
        }

    });
});