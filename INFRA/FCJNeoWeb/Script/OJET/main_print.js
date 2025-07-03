//var fromExtensible = document.getElementById('fromExtensible').value;
//var printJsFile = fromExtensible === 'yes' ? 'ExtJS/ExtPrint': 'JS/Print';

require(['ojs/ojbootstrap','knockout', 'ExtJS/ExtUIUtil','ExtJS/ExtUtil', 'ojs/ojcheckboxset',  'ojs/ojinputtext', 'ojs/ojbutton'], 
    function (Bootstrap, ko) {
        Bootstrap.whenDocumentReady().then(
          function () {
          currentFldOptionsArr = parent.currentFldOptionsArr;
          selectAll = parent.selectAll;
           fnPrnLoad();
            ko.applyBindings();
            setTimeout(function(){fnCalcHgt()},0);
          });              
    });
    
  
