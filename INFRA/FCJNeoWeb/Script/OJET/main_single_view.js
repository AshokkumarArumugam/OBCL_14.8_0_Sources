require(['ojs/ojbootstrap','knockout', 'ojs/ojbutton', 'ojs/ojswitch', 'ojs/ojselectsingle', 'ojs/ojdialog', 'ojs/ojinputnumber','ojs/ojdatetimepicker','ojs/ojvalidation-datetime'], 
    function (Bootstrap, ko) {
        Bootstrap.whenDocumentReady().then(
          function () { 
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
            
            singleViewKo = ko;
            
            setTimeout(function(){
            ko.applyBindings();
            fnDisplaySingleViewRecord('FIRST');
            setMESVScreenHeights();
            
//            singleViewKo.cleanNode(document.getElementById("DIVWNDContainer"));
//            singleViewKo.applyBindings( {},document.getElementById("DIVWNDContainer"));
            }, 1000)
            
            

            
          });              
    });
    
var singleViewKo;