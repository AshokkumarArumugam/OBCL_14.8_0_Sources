require(['ojs/ojbootstrap','knockout', 'ojs/ojbutton', 'ojs/ojswitch', 'ojs/ojselectsingle', 'ojs/ojdialog', 'ojs/ojinputnumber'], 
    function (Bootstrap, ko) {
        Bootstrap.whenDocumentReady().then(
          function () { 
            
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
            }, 0)
            
            

            
          });              
    });
    
var singleViewKo;