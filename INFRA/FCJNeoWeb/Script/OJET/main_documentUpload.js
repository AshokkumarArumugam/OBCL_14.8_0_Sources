require(['ojs/ojbootstrap','knockout','ojs/ojbootstrap',  'ojs/ojdialog', 'ojs/ojformlayout','ojs/ojinputtext', 'ojs/ojbutton', 'ojs/ojlabel', 'ojs/ojfilepicker','ExtJS/ExtensibleMEUtil','JS/Alert','JS/UIUtil'], 
   function (Bootstrap, ko) {
        Bootstrap.whenDocumentReady().then(
          function () {
           setTimeout(function() { setWindowWidth(); }, 0);
            ko.applyBindings();
          });              
    });