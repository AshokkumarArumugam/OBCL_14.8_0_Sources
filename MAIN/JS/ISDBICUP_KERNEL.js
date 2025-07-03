/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
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
**  SFR Number         : Bug#34046081
**  Written by         : Debanjan M 
**  Date of creation   : 18-Apr-2022
**  File Name          : ISDBICUP_KERNEL.js
**  Purpose            : Conversion of Non-Extensible screen(ISDBICPU) to Extensible screen(ISDBICUP)

****************************************************************************************************************************/
//------------------------------------------------------------------------------
// VARIABLE DECLARATIONS
//------------------------------------------------------------------------------

var fcjRequestDOM;
var fcjResponseDOM;
var gErrCodes = "";


function fnPostLoad_KERNEL() {
	DisableToolbar_buttons('ENTERQUERY');
	document.getElementById("EnterQuery").style.visibility= "hidden";
}

function fnPostNew_KERNEL() {
	          fnDisableElement(document.getElementsByName("BTN_SUBMIT_BATCH")[0]);
			  DisableToolbar_buttons('Save');
}

function fnSubmitParams()
{
 	appendData(document.getElementById("TBLPageTAB_MAIN"));

	gAction = "SUBMIT_PARAM";
	fcjRequestDOM = buildUBSXml();
	fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);	   
	   
  	if(fcjResponseDOM) 
	{
			var msgStatus   =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
			if (msgStatus == 'FAILURE')
			{
			   var messageNode = selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP").xml;
			   fnProcessResponse();
			   fnPostProcessResponse(msgStatus);
			}
			else if (msgStatus == "WARNING" || msgStatus == "SUCCESS")
			{
				
			var messageNode = selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
			var act = gAction;
			if (gAction != 'SUBMIT'){
				gDispAlertOnSuccess = "N";
			  }
			  else{
				gDispAlertOnSuccess = "Y";
			  }	
			}
			
			if(msgStatus == 'SUCCESS')
			{
				 disableForm();

				 fnProcessResponse();
			     fnPostProcessResponse(msgStatus); 	
				 
				 fnDisableElement(document.getElementsByName("BTN_SUBMIT_PARAMS")[0]);		 			 
				 fnEnableElement(document.getElementsByName("BTN_EXIT")[0]);
				 fnEnableElement(document.getElementsByName("BTN_SUBMIT_BATCH")[0]);	 
				 gAction = "";
				 showToolbar(functionId, '', '');
                 DisableToolbar_buttons('ENTERQUERY');					 
				 fnSetExitButton(false);
			}
			else 
			{
				fnSetExitButton(true);
				showToolbar(functionId, '', '');
			} 		  
 	}
	else
	{
    	showErrorAlerts('IN-HEAR-120');
		return;
	}	
}

function fnSubmitBatch()
{
       appendData(document.getElementById("TBLPageTAB_MAIN"));
  	   gAction = "SUBMITBATCH";
	      

       fcjRequestDOM = buildUBSXml(); 
	   showErrorAlerts('IN-HEAR-157');	 
	   fnPostAsync(fcjRequestDOM,servletURL,functionId);
	   disableForm();
	   DisableToolbar_buttons('ENTERQUERY'); 
	   fnEnableElement(document.getElementsByName("BTN_EXIT")[0]);
}


