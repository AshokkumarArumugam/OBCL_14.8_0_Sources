define(['jquery', 'ojs/ojcore', 'knockout', 'ojs/ojarraydataprovider','ojs/ojpagingdataproviderview', "ojs/ojoffcanvas",'ojs/ojdialog',"ojs/ojselectcombobox", "ojs/ojnavigationlist","ojs/ojoffcanvas","ojs/ojselectsingle", "ojs/ojinputsearch","ojs/ojconverter-number", "ojs/ojmenu","ojs/ojoption", 'ojs/ojinputtext', 'ojs/ojnavigationlist', 'ojs/ojradioset', 'ojs/ojtable', 'ojs/ojswitcher', 'ojs/ojselectsingle', 'ojs/ojselectcombobox', 'ojs/ojarraytabledatasource', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojswitch', "ojs/ojlabelvalue", "ojs/ojbutton", "ojs/ojswitch", 'ojs/ojnavigationlist', 'ojs/ojconveyorbelt', 'ojs/ojpopup', 'ojs/ojcollapsible', 'ojs/ojconveyorbelt'], function ($, oj, ko, ArrayDataProvider, PagingDataProviderView,OffcanvasUtils, ojconverter_number_1) {

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
            wizardArray = ko.observableArray([]);
            selectedMenuValue = ko.observable();
            
            alertHeadersScreenSaver =  ko.observableArray([]);
            alerMessagesScreenSaver = ko.observableArray([]);
            alertScreenSaverDataprovider = new ArrayDataProvider(alerMessagesScreenSaver);
            
            alertHeadersTimeOut =  ko.observableArray([]);
            alertMessagesTimeOut = ko.observableArray([]);
            alertTimeOutDataprovider = new ArrayDataProvider(alertMessagesTimeOut);
            
              fastPathDataProvider = new ArrayDataProvider(fastPastFids, {
                  keyAttributes: "value"
              });
             custHeaderTabArray =  ko.observableArray([]);
             custHeaderTabArray.push({'id':'CustomerSearch','label':mainWin.getItemDesc('LBL_CUSTOMER_DETAILS'),'methodName':"fnToggleDisplay('CustomerSearch')"});
            custDataProvider = new ArrayDataProvider(custHeaderTabArray);
              
           maximizeWiz = function(wiz) {
                if (typeof wiz == "string") {
                    wiz = JSON.parse(wiz);
                   
                }
                
                if (!wiz.active) {
                     wiz.active = ko.observable(true)
                }
                
                
                
                var wizId = wiz.id.replace("li_", "");
                var winObj = document.getElementById(wizId);
                if (winObj) {
                    winObj.setAttribute("minimized", "false");
                    winObj.style.visibility = "visible";  
                    setTimeout(function(){
                    setActiveWindow(winObj, window, false);
                    },0);
                }
                
                for (var i=0; i<wizardArray().length;i++) {
                    if (wizardArray()[i].id != wiz.id) {
                        wizardArray()[i].active(false);
                        var otherWizId = wizardArray()[i].id.replace("li_", "");
                        var otherWinObj = document.getElementById(otherWizId);
                        otherWinObj.setAttribute("minimized", "false");
                        otherWinObj.style.visibility = "hidden";
                    }
                }
                
                for (var j=0; j<wizardArray().length;j++) {
                    if (wizardArray()[j].id == wiz.id) {
                          wizardArray.splice(j, 1);
                        break;
                    }
                }
                
                var childDivs = [...document.getElementById('IFlauncher').children];
                var activeDiv = childDivs.filter(dv => dv.id == wizId)[0];
                for (var k=0;k< childDivs.length;k++) {
                     if(activeDiv.style.zIndex < childDivs[k].style.zIndex) {
                        activeDiv.style.zIndex = childDivs[k].style.zIndex + 1;
                     }
                    
                }
                
                
            }
              
              // create ListDataProviderView with dataMapping
              menuSearchProvider = new ArrayDataProvider(menuSearchList,  { keyAttributes: "value" });
               
//              menuSearchProvider = new ListDataProviderView(new ArrayDataProvider(menuList,  {
//                  'dataMapping': dataMapping
//              }));
            displayLoginDetails();
           
            ko.applyBindings();
            setTimeout(function(){
            setHeights();
            if(document.getElementById("DBoardHome")){
                document.getElementById("DBoardHome").click();
            }
            
              if (typeof(Storage) !== "undefined") {//HTML5 changes 15/DEC/2016 - adding launched function id in fastpath datalist start  //OJET Migration
                    var fnids = localStorage.getItem(UserId+"fpFnids");
                    if(fnids) {
                        var fnid = fnids.split("~");
                        
                        for(var i=0;i<fnid.length;i++) {
                             var obj={'label':fnid[i],'value':fnid[i]};
                            fastPastFids.push(obj);
                        }
                    }
                }//HTML5 changes 15/DEC/2016 - adding launched function id in fastpath datalist end
		fnShowDBoardHome('TRUE',true);	
            },0);
        }
        catch (e) {
        
        }

    });
});