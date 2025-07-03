require(['ojs/ojbootstrap','knockout','ExtJS/ExtUIUtil', 'JS/Alert', 'ExtJS/ExtUtil', 'ojs/ojdialog', 'ojs/ojformlayout','ojs/ojlabelvalue','ojs/ojinputtext',"ojs/ojbutton"], 
    function (Bootstrap, ko) {
        Bootstrap.whenDocumentReady().then(
          function () {
            setTimeout(function() { fnCalcTxnBranchHgt(); }, 50); //redwood_35321745 0 to 50 to forming the data
            
            ko.applyBindings();
          });              
    });
    
    