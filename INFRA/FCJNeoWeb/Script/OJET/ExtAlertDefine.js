define(['jquery', 'ojs/ojcore', 'knockout','ojs/ojarraydataprovider', "ojs/ojcontext",'ojs/ojdialog','ojs/ojtable','ojs/ojlabelvalue','ojs/ojinputtext',"ojs/ojbutton"], function ($, oj, ko, ArrayDataProvider,Context) {

    alert_context=Context;
    function mainContentViewModel(context) {
    };
    $(document).ready(function () {
        var model = new mainContentViewModel();
        try {
            //mainWinKo = ko;debugger;
             
             alertHeaders = ko.observableArray([]);
             alerMessages = ko.observableArray([]);
             alertDataprovider = new ArrayDataProvider(alerMessages);
             chkErr();
              ko.applyBindings();  
            
            const busyContext = alert_context.getContext(document.getElementById("alertFooter")).getBusyContext();
            busyContext.whenReady().then(function() {
             var btns = document.getElementById("alertFooter").getElementsByTagName("OJ-BUTTON");
//                if (alertType != "I" && alertType != "E")
//                    btns[btns.length-2].focus();
//                else
                btns[btns.length-1].focus();
                
               // document.getElementById('BTN_OK').focus();
             //resize_iframe();
             // document.getElementById("wndwidth").style.width = document.getElementById("wndtitle").offsetWidth - 10+"px" ;//alert related changes
            }
        );
          //  setTimeout("fnSyncAlertTableWidth();", 10);
//            setTimeout(function () {
//                
//                chkErr();
//             ko.applyBindings();
//               setTimeout(function () {
//              // document.querySelector("#scrollingDialog").open();
//               },
//            0);
//            },
//            0);
        }
        catch (e) {
        console.log(e)
        }

    });
});