define(['jquery', 'ojs/ojcore', 'knockout', 'ojs/ojarraydataprovider', 'ojs/ojpagingdataproviderview', "ojs/ojconverter-number", 'ojs/ojinputtext', 'ojs/ojdialog','ojs/ojnavigationlist', 'ojs/ojradioset', 'ojs/ojtable', 'ojs/ojswitcher', 'ojs/ojselectsingle', 'ojs/ojselectcombobox', 'ojs/ojarraytabledatasource', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojswitch', "ojs/ojlabelvalue", "ojs/ojbutton", "ojs/ojswitch", 'ojs/ojnavigationlist', 'ojs/ojconveyorbelt', 'ojs/ojcollapsible', "ojs/ojlistitemlayout", 'ojs/ojlistview','ojs/ojdatetimepicker','ojs/ojvalidation-datetime'], function ($, oj, ko, ArrayDataProvider, PagingDataProviderView, ojconverter_number_1) {

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
            if(scrName == 'CVS_ADVANCED'){
            advHeaderObj = [{ 'field': "queryFieldName" , 'headerStyle':'display:none', 'style':'display:none', 'sortable':'disabled'}, { 'headerText':  mainWin.getItemDesc('LBL_FIELDS'), 'field': "queryField" ,'sortable':'disabled' },{ 'headerText':   mainWin.getItemDesc('LBL_OPERATOR'), 'field': "queryOperator" ,'sortable':'disabled' },{ 'headerText':   mainWin.getItemDesc('LBL_VALUE'),'field': "queryValue",'sortable':'disabled'}];
                        advOrderByHeaderObj = [{ 'headerText':  mainWin.getItemDesc('LBL_FIELDS'), 'field': "orderByField" ,'sortable':'disabled' },{ 'headerText':   mainWin.getItemDesc('LBL_VALUE'),'field': "orderByValue",'sortable':'disabled'}];
                        multipleEntryFieldList['advQuery']={'queryFieldName':'','queryField':'','queryOperator':'','queryValue':''};
                        multipleEntryFieldList['advOrderBy']={'orderByField':'','orderByValue':''};
                        meArrayForAddDelete['advQuery'] = screenKo.observableArray([]);
                        meArrayForAddDelete['advOrderBy'] = screenKo.observableArray([]);
                        advQuerydataprovider=screenKo.observable( new tempArrayDataProvider( meArrayForAddDelete['advQuery']));
                        advOrderBydataprovider=screenKo.observable( new tempArrayDataProvider( meArrayForAddDelete['advOrderBy']));
                        var orderBy = [
                          { value: " ASC", 'label': mainWin.getItemDesc('LBL_ASCENDING') },
                          { value: " DESC", 'label':mainWin.getItemDesc('LBL_DESCENDING') }];
                        advOrderBySelectProvider = new ArrayDataProvider(orderBy, { keyAttributes: "value"});
                        var dateOperatorArr = [{"label":mainWin.getItemDesc("LBL_EQUAL"),"value":" = "},{"label":mainWin.getItemDesc("LBL_NOTEQUAL"),"value":" <> "},{"label":mainWin.getItemDesc("LBL_GREATER_EQUAL"),"value":" >= "},{"label":mainWin.getItemDesc("LBL_LESS_EQUAL"),"value":" <= "},{"label":mainWin.getItemDesc("LBL_GREATER"),"value":" > "},{"label":mainWin.getItemDesc("LBL_LESS"),"value":" < "},{"label":mainWin.getItemDesc("LBL_BETWEEN"),"value":" between "}];
                        var selectOperatorArr = [{"label":mainWin.getItemDesc("LBL_EQUAL"),"value":" = "},{"label":mainWin.getItemDesc("LBL_NOTEQUAL"),"value":" <> "},{"label":mainWin.getItemDesc("LBL_LIKE"),"value":" Like "},{"label":mainWin.getItemDesc("LBL_NOTLIKE"),"value":" NOT Like "}];
                        advDateOperatorArrayProvider = new ArrayDataProvider(dateOperatorArr, { keyAttributes: "value"});
                        advSelectOperatorArrayProvider = new ArrayDataProvider(selectOperatorArr, { keyAttributes: "value"});
            }
                fnLoadSubScreen(xmlFileName, xslFileName,scrName);
                //ko.cleanNode(document.getElementById("DIVWNDContainer"));
                if(scrName == 'CVS_ADVANCED') {
                    //storeAdvancedSearchListView();
                  }
                ko.applyBindings();
            },0);
                //parent.mask();
                
                setTimeout(function () {
                    if(scrName == 'CVS_ADVANCED') {
                        if (parent.screenArg["ACTION"] == "EDITQUERY") {            
                            fnPopulateAdvQueryData();
                            parent.screenArg["ACTION"] = ""
                        }
                    }
                }, 0);
                
                 setTimeout(function () {
                       try {
        //eval('fnPostLoad_' + screenName + '(parent.screenArgs);');
        //var fnEval = new Function('fnPostLoad_' + screenName + '(parent.screenArgs);');  //REDWOOD_35282887 - Commented
        var fnEval = new Function('fnPostLoad_' + scrName + '(parent.screenArgs);'); //REDWOOD_35282887
        fnEval();
        if (gAction == 'VIEWMNTLOG') {
            showTabData_Viewchg();
            viewModeAction = true;
            disableAllElements("INPUT");
            viewModeAction =false;          
            fnEnableElement(document.getElementById("BTN_EXIT_IMG"));            
        }
    } catch(e) {
        showTabData();// sudipta
        if (gAction == 'VIEWMNTLOG') {
            showTabData_Viewchg();
            viewModeAction = true;
            disableAllElements("INPUT");
            viewModeAction =false;            
            fnEnableElement(document.getElementById("BTN_EXIT_IMG"));   
        } else if (gAction == 'MODIFY') {
            if (screenType == 'O') {
                enableForm();
            } else {
                if(onceAuthObj){
                    if(onceAuthObj.value == 'Y'){
                        enableForm();
                        disableElements("OJ-INPUT-TEXT");
                        //disableElements("OJ-SELECT-SINGLE");
                        disableElements("OJ-TEXTAREA");
                    } else {
                        enableForm();
                    }
                } else {
                    enableForm();
                    disableElements("OJ-INPUT");
                   // disableElements("OJ-SELECT-SINGLE");
                    disableElements("OJ-TEXTAREA");
                }
            }
        }
    }

              //  appendData();
                document.getElementById("BTN_EXIT_IMG").focus();
                 
                 },0);
                
              
//            },
//            0);
        }
        catch (e) {
        }

    });
});
