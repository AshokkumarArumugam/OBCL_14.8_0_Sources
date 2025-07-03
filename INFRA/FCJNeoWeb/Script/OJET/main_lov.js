require(['ojs/ojbootstrap','knockout','ojs/ojarraydataprovider','JS/Alert', 'ExtJS/ExtLov','ExtJS/ExtUIUtil','ExtJS/ExtUtil', 'ojs/ojtable', 'ojs/ojlabelvalue', 'ojs/ojcollapsible'], 
    function (Bootstrap, ko, ArrayDataProvider) {
        Bootstrap.whenDocumentReady().then(
          function () {
            
            
            lovDataProvider = ArrayDataProvider;  
            dataProvider = ko.observable(new lovDataProvider([]));
            currentpage = ko.observable(1);
            
            displayMiniCharInfo();
            if (parent.redValue) {
                redValue = replaceAll(parent.redValue, "_SLH_", "/");
				//REDWOOD_35691870 start
				redValue = replaceAll(redValue,  "_HASH_",   "#");
				redValue = replaceAll(redValue,  "_AMP_",    "&");
				redValue = replaceAll(redValue,  "_COMMA_",  ",");
				redValue = replaceAll(redValue,  "_OPARAN_", "(");
				redValue = replaceAll(redValue,  "_CPARAN_", ")");
				redValue = replaceAll(redValue,  "_PLUS_",   "+");
				//REDWOOD_35691870 end
            }
            
            parseLovOnLoad();
            
            
            setHeights();          
            selectedRowIndex = ko.observable("");
            
            dayFormatter = ko.observable((dateInfo) => {//debugger;
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
            
            selectedChangedListener = (event) => {
                  let selectionText = "";                 
                  const row = event.detail.value.row;
                  if (row.values().size > 0) {
                      row.values().forEach(function (key) {
                          selectionText += selectionText.length === 0 ? key : ", " + key;
                      });
                      selectionText;
                  }                     
                  
                  this.selectedRowIndex(selectionText);
                  returnValToParent(undefined, selectionText);
              };    
            
            ko.applyBindings();
          });              
    });
    
var lovDataProvider;
var dataProvider;
var currentpage;
var selectedChangedListener;
var selectedRowIndex;
var dayFormatter;