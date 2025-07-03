/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product
** Copyright © 2004 - 2015  Oracle and/or its affiliates.  All rights reserved.
**                                              
** No part of this work may be reproduced, stored in a retrieval system,
** adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise,
** translated in any language or computer language,
** without the prior written permission of Oracle and/or its affiliates.
**
**
** Oracle Financial Services Software Limited.
** Oracle Park, Off Western Express Highway,
** Goregaon (East),
** Mumbai - 400 063, India.
------------------------------------------------------------------------------------------
*/
/*
--------------------------------------------------------------------------------------- 
    CHANGE HISTORY:

     SFR Number     :FC 11.0 ITR1 742
    Changed By      :Bharat Kumar.K
    Change History  :For  ActiveXObject Craetion Try,Catch Block added.
    Search String : FC 11.0 ITR1 742
    
    
Changed By         :  Kundan Verma
Description        :  Changed language code while searching from ertb_msgs
Search String      :  FC_UBS_V.UM_11.3.0.0.0.0.0 NLS Changes

Changed By         :  Guruprasad Bhat
Description        :  Job Status Not changing in Firefox and Opera browsers
Search String      :  Fix for Bug#17201817 

** Changed by 	 : Vrishti Ghosh
	** Changed on 	 : 7-Jan-2017
	** Description	 : FCUBS_12.3.0.0.0_SUPPORT MERGEACTIVITY
	** Search String : 25339616

** Changed by 	 : Manoj S
	** Changed on 	 : 13-Apr-2023
	** Description	 : Redwood Changes
	** Search String : Redwood_Changes
*/

//------------------------------------------------------------------------------
// VARIABLE DECLARATIONS
//------------------------------------------------------------------------------

var fcjRequestDOM;
var fcjResponseDOM;
var gErrCodes = "";
var servletURL = "FCClientHandler";
var msob_bulk = new Array();
var msob_fchk = -1 ;
var msob_tchk = 0 ;
var msob_dcnlist = "";
var len = 0;
var package_visted = 'N'; 
var local_dom = "" ; 
var temp = 0;
var l_currRow ="";


function fnPreLoad() {
    debugs("In fnPreLoad", "A");
}

function fnPostLoad() {
    debugs("In fnPostLoad", "A");
}

function fnPreNew() {
    var newAction = true;
    debugs("In fnPreNew", "A");
    return newAction;
}

function fnPostNew() {
    debugs("In fnPostNew", "A");    
}

function fnPreUnlock() {
    var unlock = true;
    debugs("In fnPreUnlock", "A");
    return unlock;
}

function fnPostUnlock() {
    debugs("In fnPostUnlock", "A");
}

function fnPreAuthorize() {
    var authorize = true;
    debugs("In fnPreAuthorize", "A");
    return authorize;
}

function fnPostAuthorize() {
    debugs("In fnPostAuthorize", "A");
}

function fnPreCopy() {
    var copy = true;
    debugs("In fnPreCopy", "A");
    return copy;
}

function fnPostCopy() {
    debugs("In fnPostCopy", "A");
}

function fnPreClose() {
    var close = true;
    debugs("In fnPreClose", "A");
    return close;
}

function fnPostClose() {
    debugs("In fnPostClose", "A");
}

function fnPreReOpen() {
    var reOpen = true;
    debugs("In fnPreReOpen", "A");
    return reOpen;
}

function fnPostReOpen() {
    debugs("In fnPostReOpen", "A");
}

function fnPreDelete() {
    var deleteAction = true;
    debugs("In fnPreDelete", "A");
    return deleteAction;
}

function fnPostDelete() {
    debugs("In fnPostDelete", "A");
}

function fnPreEnterQuery() {
    var execute = true;
    debugs("In fnPreEnterQuery", "A");
    return execute;
}

function fnPostEnterQuery() {
    debugs("In fnPostEnterQuery", "A");
}

function fnPreExecuteQuery() {
    var execute = true;
    debugs("In fnPreExecuteQuery", "A");
    return execute;
}

function fnPostExecuteQuery() {
    debugs("In fnPostExecuteQuery", "A");
}

function fnPostExecuteQuery_Summary(e){ //12_1_RETRO_12_2_23740628 25339616 chnages
      // alert('hi');
      // var len = document.getElementById("TBL_QryRslts").tBodies[0].rows.length;
       //var oldHtm = document.getElementById("TBL_QryRslts").rows[0].cells[4].innerHTML;
      // document.getElementById("TBL_QryRslts").rows[0].cells[4].innerHTML = document.getElementById("TBL_QryRslts").rows[0].cells[4].innerHTML+ " isssssssssssssssssssssssssssdd fgf ";
        //for(i = 0;i <= len; i++){
       /* for(i = 0;i < len; i++){
            var longDate = getDateObject();
            var currTime=getInnerText(document.getElementById("TBL_QryRslts").tBodies[0].rows[i].cells[4]);
                //longDate.setTime(getInnerText(document.getElementById("TBL_QryRslts").tBodies[0].rows[i].cells[4]));
            longDate.setTime(currTime);
         //alert(document.getElementById("TBL_QryRslts").tBodies[0].rows[i].cells[4].innerText);
                /* document.getElementById("TBL_QryRslts").tBodies[0].rows[i].cells[4].setAttribute("offsetwidth","200");
         document.getElementById("TBL_QryRslts").tBodies[0].rows[i].cells[4].setAttribute("offsetheight","21");*/
        // document.getElementById("TBL_QryRslts").tBodies[0].rows[i].cells[4].style.width="200px";
            //  document.getElementById("TBL_QryRslts").tBodies[0].rows[i].cells[4].setAttribute("offsetwidth","200");
         //document.getElementById("TBL_QryRslts").tBodies[0].rows[i].cells[4].firstChild.innerHTML = longDate.toLocaleString();
        /*if(currTime !=0)
            setNodeText(document.getElementById("TBL_QryRslts").tBodies[0].rows[i].cells[4].getElementsByTagName('span')[0],longDate.toLocaleString());
        else
            setNodeText(document.getElementById("TBL_QryRslts").tBodies[0].rows[i].cells[4].getElementsByTagName('span')[0],'');
        }*/
var l_ValueNodes = selectNodes(fcjResponseDOM, "//REC/FV");
for(i = 0;i < l_ValueNodes.length; i++){
    var longDate = getDateObject();
    var tempVals=getNodeText(l_ValueNodes[i]).split('~');
    var currTime=tempVals[3];
    longDate.setTime(currTime);
    if(currTime !=0)
        tempVals[3] =longDate.toLocaleString();
    else
        tempVals[3] ='';
    setNodeText(l_ValueNodes[i],tempVals.join('~'));
}
fnShowSummaryData(null, e); // 12_1_RETRO_12_2_23740628 25339616 change
}

function fnPreSave() {
    if(!fnValidate())
        return false;

    debugs("In fnPreSave", "A");    
    var isValid = true;
        
    
    if (!isValid) {     
        var msg = buildMessage(gErrCodes);
        alertMessage(msg);
        return false;
    }
    
    return isValid; 
}

function fnPostSave() {
    debugs("In fnPostSave", "A");
}


function fnPreGoToRec() {
    var navigate = true;
    return navigate;
}

function fnPostGoToRec() {
    
}
 
function fnPauseJob(event) { 
 //debugger;                                       //Fix for Bug#17201817  
  var ret = bulk_check();
  if (ret)
  {
  gAction='PAUSEJOB';
  var fcjRequest =  '<FCJMSG SRC="FLEXCUBE" BRANCH="'+mainWin.CurrentBranch+'" USERID="'+mainWin.UserId +'" ENTITY="'+mainWin.entity+'">';  //SMSStandalone12.3 Scheduler changes 
    fcjRequest +=        '<MAINTQRY TYPE="N" ROOTTABLE="SMVW_JOB_SCHEDULE" QUERYFROM="" QUERYORDERBY="">';
        fcjRequest +=        '<OP>PAUSEJOB</OP>';
        fcjRequest +=                '<TABLE ID="SMVW_JOB_SCHEDULE">:'+msob_dcnlist+'</TABLE>';          
    fcjRequest +=        '</MAINTQRY>';
  fcjRequest +=      '</FCJMSG>' ;
  fcjRequestDOM=loadXMLDoc(fcjRequest);
  fcjResponseDOM    = fnPost(fcjRequestDOM, servletURL, functionId);
  
   if (fcjResponseDOM) {
        debugs(getXMLString(fcjResponseDOM), "P");
        
    var msgStatus   = selectSingleNode(fcjResponseDOM,"FCJMSG/MSG").getAttribute("MSGSTATUS");
    var messageNode = selectSingleNode(fcjResponseDOM,"FCJMSG/MSG/RESPONSE");
    
    if(msgStatus != 'SUCCESS') {
            
            
            showErrorAlerts('SMS-VAL-001',getNodeText(messageNode));  // FC_UBS_V.UM_11.3.0.0.0.0.0 NLS Changes
            
            //alert('Pause job failed with '+messageNode.text);               
                
        }  else {
            gAction='EXECUTEQUERY';
            //fnExecuteQuery();                                     //Commented as part of Fix for Bug#17201817
            fnExecuteQuery(undefined,event);                                //Fix for Bug#17201817  
        }
  }
}


}

function fnJobDetails() {
    var ret = bulk_check_report();
    //window.open("JobsDetails.jsp?"+"jobs="+msob_dcnlist);
    var dlgLeft = 50;
    var dlgTop = 50;
    
/*Commented by CB Utility.Please check with INFRA for info.*/
/*    w = window.showModalDialog("JobsDetails.jsp?jobs="+msob_dcnlist+"&description="+ mainWin.getItemDesc("LBL_JOB_DTLS"),
                     parent, "center:yes; dialogHeight:400px; dialogWidth:750px; help:no; resizable:no; scrollbar:no; status:no;");*/
}

function fnResumeJob(event) {                                   //Fix for Bug#17201817
var ret = bulk_check();
  if (ret)
  {
  gAction='RESUMEJOB';
  var fcjRequest =  '<FCJMSG SRC="FLEXCUBE" BRANCH="'+mainWin.CurrentBranch+'" USERID="'+mainWin.UserId +'" ENTITY="'+mainWin.entity+'">';  //SMSStandalone12.3 Scheduler changes 
    fcjRequest +=        '<MAINTQRY TYPE="N" ROOTTABLE="SMVW_JOB_SCHEDULE" QUERYFROM="" QUERYORDERBY="">';
        fcjRequest +=        '<OP>RESUMEJOB</OP>';
        fcjRequest +=                '<TABLE ID="SMVW_JOB_SCHEDULE">:'+msob_dcnlist+'</TABLE>';          
    fcjRequest +=        '</MAINTQRY>';
  fcjRequest +=      '</FCJMSG>' ;
  fcjRequestDOM=loadXMLDoc(fcjRequest);
  fcjResponseDOM    = fnPost(fcjRequestDOM, servletURL, functionId);
  
   if (fcjResponseDOM) {
        debugs(getXMLString(fcjResponseDOM), "P");
        
    var msgStatus   = selectSingleNode(fcjResponseDOM,"FCJMSG/MSG").getAttribute("MSGSTATUS");
    var messageNode = selectSingleNode(fcjResponseDOM,"FCJMSG/MSG/RESPONSE");
    
    if(msgStatus != 'SUCCESS') {
            
            
            showErrorAlerts('SMS-VAL-002',getNodeText(messageNode));  // FC_UBS_V.UM_11.3.0.0.0.0.0 NLS Changes
            
            //alert('resume job failed with '+messageNode.text);                 
                
        }  else {
             gAction='EXECUTEQUERY';
            //fnExecuteQuery();                                 //Commented as part of Fix for Bug#17201817
            fnExecuteQuery(undefined,event);                    //Fix for Bug#17201817                      
        }
  }
}
}

function bulk_check()
{ 
  var emptyRows = 0;
  //len = document.getElementById("TBL_QryRslts").tBodies[0].rows.length;//Redwood_Changes Commented
  len = getTableObjForBlock("TBL_QryRslts").tBodies[0].rows.length;////Redwood_Changes
  var rows = getTableObjForBlock("TBL_QryRslts").tBodies[0].rows;//Redwood_Changes
  msob_dcnlist = "" ;
  msob_fchk= -1 ;
  msob_tchk = 0 ; 
   //len = document.getElementById("TBL_QryRslts").tBodies[0].rows.length;//Redwood_Changes Commented
   len =getTableObjForBlock("TBL_QryRslts").tBodies[0].rows.length;//Redwood_Changes
      for(i = 0;i <= len; i++){
        msob_bulk[i]='N';
    }
      
    for(i = 0;i < len; i++)
      {
        //if(document.getElementById("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0]){ ////Redwood_Change Commenteds
        //  if(document.getElementById("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked ){//Redwood_Change Commenteds
        if(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0]){//Redwood_Change 
          if(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked ){//Redwood_Change 
            msob_bulk[i]='Y'; 
            if (msob_fchk == -1) {
            msob_fchk = i;      }
            msob_tchk = msob_tchk +1;
             msob_dcnlist = msob_dcnlist + 
             (//getInnerText(document.getElementById("TBL_QryRslts").tBodies[0].rows[i].cells[1]) + '~' + 
              //getInnerText(document.getElementById("TBL_QryRslts").tBodies[0].rows[i].cells[2])+ '~' + 
              //getInnerText(document.getElementById("TBL_QryRslts").tBodies[0].rows[i].cells[5]) + ':') ;
              getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[1]) + '~' + 
              getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[2])+ '~' + 
              getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[5]) + ':') ;
            }
           
        }
          else if (msob_tchk == 0 ) {
                  //alert ( 'Please Select a Record');
                  showErrorAlerts('IN-HEAR-206');//NLS change -Removal of hardcoded alerts
                  return false ; } 
        else
          break;
      }
  msob_fchk = msob_fchk;
  return true;
}

function bulk_check_report()
{ 
  var emptyRows = 0;
  //len = getTableObjForBlock("TBL_QryRslts").tBodies[0].rows.length;//Redwood_Change Commenteds
////  var rows = document.getElementById("TBL_QryRslts").tBodies[0].rows;//Redwood_Change 
  len = getTableObjForBlock("TBL_QryRslts").tBodies[0].rows.length;//Redwood_Change 
  var rows = getTableObjForBlock("TBL_QryRslts").tBodies[0].rows;//Redwood_Change Commenteds
  msob_dcnlist = "" ;
  msob_fchk= -1 ;
  msob_tchk = 0 ; 
  // len = getTableObjForBlock("TBL_QryRslts").tBodies[0].rows.length;//Redwood_Change Commenteds
  len = getTableObjForBlock("TBL_QryRslts").tBodies[0].rows.length;//Redwood_Change
      for(i = 0;i <= len; i++){
        msob_bulk[i]='N';
    }
   
    for(i = 0;i < len; i++){
       // if(document.getElementById("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0][0]){//Redwood_Change Commenteds
       //     if(document.getElementById("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0][0].checked ){//Redwood_Change Commenteds
            if(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0][0]){//Redwood_Change
            if(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0][0].checked ){//Redwood_Change
                msob_bulk[i]='Y'; 
                if (msob_fchk == -1) {
                    msob_fchk = i;      
                }
                msob_tchk = msob_tchk +1;
                msob_dcnlist = msob_dcnlist + (document.getElementsByName("TBL_QryRslts")[0].tBodies[0].rows[i].cells[1].innerText  + '~' + document.getElementsByName("TBL_QryRslts")[0].tBodies[0].rows[i].cells[2].innerText + ':') ;
            }
        } else if (msob_tchk == 0 ) {
          //alert ( 'Please Select a Record');
                  showErrorAlerts('IN-HEAR-206');//NLS change -Removal of hardcoded alerts
          return false ; } 
        else
          break;
    }
    msob_fchk = msob_fchk;
    return true;
}