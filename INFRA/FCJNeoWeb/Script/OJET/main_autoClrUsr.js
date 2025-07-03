require(['ojs/ojbootstrap','knockout','ojs/ojbootstrap',  'ojs/ojdialog', 'ojs/ojformlayout','ojs/ojinputtext', 'ojs/ojbutton', 'ojs/ojlabel', 'ExtJS/ExtUIUtil','JS/Alert'], 
    function (Bootstrap, ko) {
        Bootstrap.whenDocumentReady().then(
          function () {
           setTimeout(function() { setWindowWidth(); }, 0);
            ko.applyBindings();
          });              
    });