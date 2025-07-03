/*
require(['ojs/ojbootstrap','knockout','ExtJS/ExtUIUtil', 'ojs/ojbootstrap', 'ojs/ojknockout','ojs/ojinputtext', "ojs/ojbutton", "ojs/ojlabel"], 
    function (Bootstrap, ko) {
        Bootstrap.whenDocumentReady().then(
          function () {
            ko.applyBindings();
          });              
    });
 */


require(['JS/Alert','JS/SmmdiFrm','JS/TaskList','JS/CcyDenomUtil','JS/GlobalConstants','ExtJS/ExtUIUtil','JS/SmhTlBar','JS/UserAlerts'], function () {
    require(['ojs/ojbootstrap','knockout','ExtJS/ExtUIUtil', 'ojs/ojbootstrap', 'ojs/ojknockout','ojs/ojinputtext', "ojs/ojbutton", "ojs/ojlabel" ], function (Bootstrap, ko) {
        Bootstrap.whenDocumentReady().then(
          function () {
          checkErr();
          checkMFAEnabled();
            ko.applyBindings();
          }
        );
    });
 });   
 

 