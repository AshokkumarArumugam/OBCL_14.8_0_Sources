/***************************************************************************************************************************
**  This source is part of the FLEXCUBE Software Product. 
**  Copyright (c) 2008 ,2017, Oracle and/or its affiliates.
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
**  Written by         : 
**  Date of creation   : 
**  File Name          : OLDUPLOD_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 
****************************************************************************************************************************/

function fnPreSave_KERNEL(){


var old_action= gAction;
	
	appendData();
   
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
    if(fcjResponseDOM)
    {
		var msgStatus   =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
        if (msgStatus == 'FAILURE') {
			var messageNode = selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP").xml;
			 fnProcessResponse();
			   fnPostProcessResponse(msgStatus);
        }       	
		else if (msgStatus == 'WARNING')
			{
				var messageNode = selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP").xml;
				gDispAlertOnSuccess = "Y";
				
				fnProcessResponse();
				fnPostProcessResponse(msgStatus);
			}
						
        //var pureXMLDOM  = fnGetDataXMLFromFCJXML(fcjResponseDOM,1);	
	//var returnVal = displayResponse(messageNode);
	else if (msgStatus == 'SUCCESS')
			{
			  
			gDispAlertOnSuccess = "Y";
			  	  fnProcessResponse();			 
			  fnPostProcessResponse(msgStatus);			  
			  disableForm();		
					gAction = 'CVD_ASY';
					dbDataDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM,1);
					fcjRequestDOM = buildUBSXml();
					//fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
					fnPostAsync(fcjRequestDOM,servletURL,functionId);
			}
	}
	gAction="";
	gAction = old_action;
	disableForm();
   

}
/*
// Asynchronous Function

try{
//As part of cross browser compatibility, ActiveXObject creation removed
}catch(e){
//As part of cross browser compatibility, ActiveXObject creation removed
}
*/

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
