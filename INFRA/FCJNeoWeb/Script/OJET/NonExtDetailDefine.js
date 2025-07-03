define(['jquery', 'ojs/ojcore', 'knockout', 'ojs/ojarraydataprovider', 'ojs/ojpagingdataproviderview', "ojs/ojconverter-number", 'ojs/ojinputtext', 'ojs/ojnavigationlist', 'ojs/ojradioset', 'ojs/ojtable', 'ojs/ojswitcher', 'ojs/ojselectsingle', 'ojs/ojselectcombobox', 'ojs/ojarraytabledatasource', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojswitch', "ojs/ojlabelvalue", "ojs/ojbutton", "ojs/ojswitch", 'ojs/ojnavigationlist', 'ojs/ojconveyorbelt', 'ojs/ojpopup', 'ojs/ojcollapsible','ojs/ojdatetimepicker','ojs/ojvalidation-datetime'], function ($, oj, ko, ArrayDataProvider, PagingDataProviderView, ojconverter_number_1) {

    function mainContentViewModel(context) {
    };
    $(document).ready(function () {
        var model = new mainContentViewModel();
        try {
            screenKo = ko;
            ojconverter_number = ojconverter_number_1;
            tempArrayDataProvider = ArrayDataProvider;
            pagingDataProviderView = PagingDataProviderView;
            arrProviderAuditLegend = ArrayDataProvider;
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
            //BigNumber = bignumber;debugger;
//            amtConverter = {
//            format: function (value) {
//                if (!value) {
//                    value = 0;
//                }
//
//                const amount = new BigNumber(value),
//                    format = {
//                       
//                        decimalSeparator: ".",
//                        groupSeparator: ",",
//                        groupSize: 3,
//                        secondaryGroupSize: 0,
//                        fractionGroupSeparator: "",
//                        fractionGroupSize: 0
//                    };
//
//                BigNumber.config({
//                    FORMAT: format
//                });
//
//                return amount.toFormat().toString();
//            },
//            parse: function (value) {
//                return value.replace(/[a-zA-Z\s,]/g, "");
//            }
//        };
            currentFldOptionsArr = [];
            selectAll = [];
            lockColumnData = [
              { value: '0', label: '0' },
              { value: '1', label: '1' },
              { value: '2', label: '2' },
              { value: '3', label: '3' },
              { value: '4', label: '4' }
            ];
             recordsPerPageData = [
              { value: '15', label: '15' },
              { value: '25', label: '25' },
              { value: '50', label: '50' }
            ];
            lockColumnDataProvider = new ArrayDataProvider(lockColumnData, { keyAttributes: 'value' });
            recordsPerPageDataProvider = new ArrayDataProvider(recordsPerPageData, { keyAttributes: 'value' });
           
            
            setTimeout(function () {
                fnLoad(xmlFileName, xslFileName,'');
                ko.cleanNode(document.getElementById("DIVWNDContainer"));
                recordsPerPage = ko.observable("15");
                lockColumn = ko.observable("0");
                ko.applyBindings(model, document.getElementById("DIVWNDContainer"));
                parent.unmask();
                 
                setTimeout(function () {
                      if(document.getElementById("BTN_EXIT")){
                            document.getElementById("BTN_EXIT").focus();
                       }
                    //fnPostLoadMain();
                },
                0);
            },
            //0);
			100);//2nd time only screen was launching 
        }
        catch (e) {
        }

    });
});

var currentFldValue;
var currentFldOptionsArr;
var selectAll;