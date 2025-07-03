require(['ojs/ojbootstrap','knockout','ExtJS/ExtUtil', 'ExtJS/ExtUIUtil', 'ojs/ojdialog', 'ojs/ojformlayout','ojs/ojlabelvalue','ojs/ojinputtext',"ojs/ojbutton"], 
    function (Bootstrap, ko) {
        Bootstrap.whenDocumentReady().then(
          function () {
            setTimeout(function() { setHeights(); }, 0);
            
            ko.applyBindings();
          });              
    });
    
    