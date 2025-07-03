/*------------------------------------------------------------------------------------------
**
** This source is part of the Oracle FLEXCUBE Software Product.
** Copyright (R) 2016 , Oracle and/or its affiliates.  All rights reserved
**
**
** No part of this work may be reproduced, stored in a retrieval system, adopted
** or transmitted in any form or by any means, electronic, mechanical,
** photographic, graphic, optic recording or otherwise, translated in any
** language or computer language, without the prior written permission of
** Oracle and/or its affiliates.
**
** Oracle Financial Services Software Limited.
** Oracle Park, Off Western Express Highway,
** Goregaon (East),
** Mumbai - 400 063, India
** India
------------------------------------------------------------------------------------------
*/
/*
**  
**  Written by         : 
**  Date of creation   : 
**  File Name          : AEDSTART_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : Yogesh Sharma
**  Last modified on   : 27 May 2013
**  Full Version       : FCUBS 12.0.2 development
**  Reason             : When the screen is launched, it is showing the operation code as Save instead of Enter Query.
						 To rectify this the fix is given.
**  Search String      : FCUBS 12.0.2 PID-9NT1587 DEV

**  Last Modified By   : Vamsi Krishna
**  Last modified on   : 27-Dec-2013
**  Search String      : Bug#18008775
**  Reason             : return staement missed in  fnPostLoad_KERNEL.

**  Last Modified By   : Ajai
**  Last modified on   : 4-Sept-2015
**  Search String      : Bug#21696790
**  Reason             : Screen issues.

  **Modified By          : Vanitha P
  **Modified On          : 2-Feb-2022
  **Modified reason      : Redwood changes
  **Search string        : Redwood

**  Last Modified By   : Arunadevi Rajendran
**  Last modified on   : 23-May-2022
**  Search String      : Bug_34199039
**  Reason             : NEW button disabled in toolbar  
****************************************************************************************************************************/
//------------------------------------------------------------------------------
// VARIABLE DECLARATIONS
//------------------------------------------------------------------------------
var fcjRequestDOM;
var fcjResponseDOM;
var objHTTP;
var gErrCodes = "";

function fnPostLoad_KERNEL() {
   DisableToolbar_buttons("NEW");//Bug_34199039
   gAction = "NEW";
   createDOM(dbStrRootTableName);
   fnCallBE("PREPROCESS");
   enableForm();
  // showToolbar("", "", "");   // FCUBS 12.0.2 PID-9NT1587 DEV  Bug#21696790 commneted
   return true; //Bug#18008775
}
function fnCallBE(Action) {
	var old_action=gAction;
	gAction = "NEW";
	appendData();
	gAction = Action;
	//Bug#21696790 starts
	if(gAction == 'SUBMIT'){
		fnBuildFullDOM();
		}
    //Bug#21696790	ends
	
	fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
	
	if (gAction != 'BATCHEODSTARTASYNC') {
		if(fcjResponseDOM) 
		{
			var msgStatus   =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
			if (msgStatus == 'FAILURE')
			{
			   var messageNode = selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP").xml;
			   //var returnVal = displayResponse(messageNode,msgStatus);
			   //msgStatus    = returnVal[2];
			   //messageNode  = returnVal[3];
			   fnProcessResponse();
			   fnPostProcessResponse(msgStatus);
			}
			else if (msgStatus == 'SUCCESS')
			{
			  var act = gAction;
			  //gAction = '';
			  //gDispAlertOnSuccess = "N";
			  if (gAction != 'SUBMIT'){
				//gAction = '';  //Bug#21696790 commneted
				gDispAlertOnSuccess = "N";
			  }
			  else{
				gDispAlertOnSuccess = "Y";
			  }
			  //var messageNode = selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP").xml;
			  fnProcessResponse();
			  //Bug#21696790 starts
			   if (gAction != 'SUBMIT'){
				
				gDispAlertOnSuccess = "N";
			  }
			  //Bug#21696790 ends
			  fnPostProcessResponse(msgStatus);
			  
			  disableForm();
			  fnEnableElement(getElementsByOjName("BTN_RESET")[0] );
			  fnEnableElement(getElementsByOjName('BTN_DEF_GRP_BRNS')[0]);
			  fnEnableElement(getElementsByOjName("EOCTYPE")[0] );
			  fnEnableElement(getElementsByOjName("GROUPCD")[0] );
			  fnEnableElement(getElementsByOjName("MAXTHREADS")[0] );
			  fnEnableElement(getElementsByOjName("TARGETSTAGE")[0] );
			  fnEnableElement(getElementsByOjName("RUNMOD")[0] );
			  
			  if (getElementsByOjName("EOCTYPE")[0].value == "ASN" ){
				  if (act == 'SUBMIT'){
					gAction = 'BATCHEODSTARTASYNC';
					dbDataDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM,1);
					fcjRequestDOM = buildUBSXml();
					//fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
					fnPostAsync(fcjRequestDOM,servletURL,functionId);
					act = '';
				  }
			  }
			}
			else if (msgStatus == 'WARNING')
			{
				var messageNode = selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP").xml;
				gDispAlertOnSuccess = "Y";
				
				fnProcessResponse();
				fnPostProcessResponse(msgStatus);
			}
		}  
	}
	gAction = old_action;
	//Bug#21696790 starts
	DisableToolbar_buttons("EnterQuery");
    DisableToolbar_buttons("Save");
   //Bug#21696790 ends      
}

function fnPostAsync(fcjMsgDOM, servletURL, functionID)
{  
  if (fcjMsgDOM != null )  {
    var strFormData = getXMLString(fcjMsgDOM);   
	objHTTP = createHTTPActiveXObject();
    objHTTP.open("POST", servletURL, true); // Open the Connection to the Server in Asynchronous mode
    //objHTTP.setRequestHeader("Content-Type","application/x-www-form-urlencoded");      
    objHTTP.setRequestHeader("FUNCTIONID", functionID); 
    objHTTP.setRequestHeader("OPERATION", gAction);
	objHTTP.setRequestHeader("X-CSRFTOKEN", mainWin.CSRFtoken);
    if(strFormData.indexOf("<ATTACHMENTS>")>-1){
        objHTTP.setRequestHeader("HASATTACHMENTS", "TRUE");
    }
    else{
        objHTTP.setRequestHeader("HASATTACHMENTS", "FALSE");
     }
     objHTTP.send(strFormData);    
  } 
}

function fnAddBranches(){
	fnCallBE("ADDBRANCHES");
	gAction = "NEW";
	enableForm();
	
}

function fnSubmitEoc(){
	fnCallBE("SUBMIT");
	gAction = "NEW";
	}

function fnReset(){
 /*   // Bug#21696790 commneted starts
 /* 	/* len = document.getElementById("BLK_EOC_BRANCHES").tBodies[0].rows.length; 

	for(i = 0;i < len; i++)
      {
       document.getElementById("BLK_EOC_BRANCHES").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked=true;
      }
	fnDeleteRowForMultipleEntry('BLK_EOC_BRANCHES','AETB_EOC_BRANCHES')
	document.getElementsByName("EOCREFNO")[0].value=""; */
	
	/*len = document.getElementById("BLK_EOC_GROUPS").tBodies[0].rows.length;   
	 // Bug#21696790 commneted ends
	temp = 0 ;
	for(i = 0;i < len; i++)
      {
		fnEnableElement(document.getElementsByName("chkDeleteRow")[i]);
	    document.getElementsByName("chkDeleteRow")[i].checked=false;
	    document.getElementsByName("chkDeleteRow")[i].value='N';
		
		document.getElementById("BLK_EOC_GROUPS").tBodies[0].rows[i].cells[3].getElementsByTagName("INPUT")[0].checked=false;
		document.getElementById("BLK_EOC_GROUPS").tBodies[0].rows[i].cells[3].getElementsByTagName("INPUT")[0].value='N';
      }*/
 
    // Bug#21696790  added starts
   
    var noOfNodes = selectSingleNode(dbDataDOM, "//BLK_EOC_MASTER").childNodes.length;
	try
	{

	while(noOfNodes>0)
     {			
        
		noOfNodes =  noOfNodes - 1;
		selectSingleNode(dbDataDOM, "//BLK_EOC_MASTER").removeChild(selectSingleNode(dbDataDOM, "//BLK_EOC_MASTER").childNodes.item(noOfNodes));	   
		
	  
	}
	}
	catch(e)
	{
		showData();
	}
	
	showData(); 
	getElementsByOjName("EOCREFNO")[0].value="";
	document.getElementById("BLK_EOC_GROUPS__GROUP_DESC").value="";
	  // Bug#21696790  added ends
	fnEnableElement(document.getElementById('BLK_EOC_MASTER__TARGETSTAGE'));
	fnEnableElement(getElementsByOjName('RUNMOD')[0]);
	fnEnableElement(getElementsByOjName('BTN_DEF_GRP_BRNS')[0]);
	fnEnableElement(getElementsByOjName('BTN_SUBMIT')[0]);
	fnEnableElement(document.getElementById("cmdAddRow_BLK_EOC_BRANCHES"));
    fnEnableElement(document.getElementById("cmdDelRow_BLK_EOC_BRANCHES"));


  return true;
}


