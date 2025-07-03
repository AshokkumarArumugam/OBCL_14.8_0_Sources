require(['ojs/ojbootstrap','knockout','JS/Alert','ExtJS/ExtensibleMEUtil','ExtJS/ExtEditor','ExtJS/ExtUtil', 'ExtJS/ExtUIUtil', 'ojs/ojinputtext','ojs/ojdialog', 'ojs/ojformlayout'], 
    function (Bootstrap, ko) {
        Bootstrap.whenDocumentReady().then(
          function () {
            fnDisplayEditor();
            setTimeout(function() { setHeights(); }, 0);
            
            ko.applyBindings();
          });              
    });
    
    