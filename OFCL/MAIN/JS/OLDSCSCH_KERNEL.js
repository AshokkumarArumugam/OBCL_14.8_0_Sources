/***************************************************************************************************************************
**  This source is part of the FLEXCUBE Software Product. 
**  Copyright (c) 2008 ,2016, Oracle and/or its affiliates.
**  All rights reserved.
**  
**  No part of this work may be reproduced, stored in a retrieval system, 
**  adopted or transmitted in any form or by any means, electronic, mechanical, photographic, 
**  graphic, optic recording or otherwise, translated in any language or computer language, 
**  without the prior written permission of Oracle and/or its affiliates.
**  
**  Oracle Financial Services Software Limited.
**  Oracle Park, Off Western Express Highway,
**  Goregaon (East),
**  Mumbai - 400 063,
**  India.
**  
**  Written by         : K.PRIYADARSHINI
**  Date of creation   : 19-AUG-2016
**  File Name          : LDDSCSCH_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 
****************************************************************************************************************************/
var fcjResponseDOM;
var fcjRequestDOM;

function fnPreLoad_CVS_SCH_KERNEL() {
  fnbtnexpsch();
  return true;
}

function fnbtnexpsch()
{
	 var strtdate = document.getElementById("BLK_SCHEDULES__STDATE").value;
	if(strtdate != ''){
	 var g_prev_gAction = gAction;
    gAction = 'EXP_SCH';
    appendData(document.getElementById("TBLPageAll"));
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
    if (fcjResponseDOM) {
        var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
        if (msgStatus == "FAILURE") {
            var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
        } else if (msgStatus == "WARNING" || msgStatus == "SUCCESS") {
              var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
            }
        }
        var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
        setDataXML(getXMLString(pureXMLDOM));
        showData(dbStrRootTableName, 1);
    
    if (msgStatus == "FAILURE") {
        var returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'E');
        return false;
    }
	else if (msgStatus == "WARNING")
			{
				var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
				var returnVal = displayResponse(getXMLString(messageNode), msgStatus, "O", "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
	}
	//fnSubScreenMain('OLDSCSCH', 'OLDSCSCH', 'CVS_SCH'); 
    gAction = g_prev_gAction;		
	return true;
	}
}


function fnfetch(){
    var g_prev_gAction = gAction;
    gAction = 'FETCH';
	
	var row = getRowIndex();
	document.getElementById("BLK_CONTRACT_MASTER__ROWU").value = row;
	
    appendData(document.getElementById("TBLPageAll"));
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
    if (fcjResponseDOM) {
        var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
        if (msgStatus == "FAILURE") {
            var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
        } else if (msgStatus == "WARNING" || msgStatus == "SUCCESS") {
              var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
            }
        }
        var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
        setDataXML(getXMLString(pureXMLDOM));
        showData(dbStrRootTableName, 1);
    
    if (msgStatus == "FAILURE") {
        var returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'E');
        return false;
    }
	else if (msgStatus == "WARNING")
			{
				var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
				var returnVal = displayResponse(getXMLString(messageNode), msgStatus, "O", "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
	}
	
    gAction = g_prev_gAction;
    return true;
}

//code for notes seq no
function fnPostAddRow_BLK_NOTES_KERNEL(){
	fnUpdateNoteSeqno();
}
function fnPostDeleteRow_BLK_NOTES_KERNEL(){
	fnUpdateNoteSeqno();
}
function fnUpdateNoteSeqno(){
	var cnt = getTableObjForBlock('BLK_NOTES').tBodies[0].rows.length;
	for(var i=1;i<=cnt;i++){
	   if (i == 1){
	        var blkfld = 'BLK_NOTES__SEQNO';
	        var blkfldI = 'BLK_NOTES__SEQNOI';
	    }
		else{
	       var blkfld = 'BLK_NOTES__SEQNO'.concat(i-1);
	       var blkfldI = 'BLK_NOTES__SEQNOI'.concat(i-1);
	}
	document.getElementById(blkfld).value = i;
	document.getElementById(blkfldI).value = i;
	}
}

function fnPreLoad_CVS_NOTES_KERNEL(screenArgs) {
	var cnt=SingleCheck (screenArgs);    
		 if (cnt > 1 || cnt==0 )
        {
		   showErrorAlerts('IN-HEAR-221');
           return false;;
           }	
 
    
    return true;
}
function fnPostLoad_CVS_NOTES_KERNEL(screenArgs) {
    
    return true;
}


function SingleCheck (screenArgs)	 
  {   
   var count=0;
  
   len = getTableObjForBlock("BLK_DISCLOSURE_DETAILS").tBodies[0].rows.length;
     for(i = 0;i < len; i++)
      {
          if(getTableObjForBlock("BLK_DISCLOSURE_DETAILS").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0])
		  {
			  
			  if(getTableObjForBlock("BLK_DISCLOSURE_DETAILS").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked)
			  {
				count = count +1; 
				
			  } 
         }        
       }
	   return count;                   
   }
