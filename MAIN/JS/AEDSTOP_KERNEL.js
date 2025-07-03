/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright © 2008 - 2010  Oracle and/or its affiliates.  All rights reserved.
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
**  
**  Written by         : 
**  Date of creation   : 
**  File Name          : AEDSTOP_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : Anmol
**  Last modified on   : 17-Jun-2014
**  Search String      : 19001052
**  Reason             : Once "Stop" Check box is checked for one branch, the other branches checkbox
**                       also became disabled. 

**  Last Modified By   : Vipan Kumar
**  Last modified on   : 26-Jul-2017
**  Search String      : 9NT1606_12_4_RETRO_12_1_26524979
**  Reason             : Enter Query should not be visible on screen launch, as it is not required.

**  Last Modified By        : Akshita
**  Last Modified Reason    : Redwood Changes
**  Search String           : Redwood_Changes
****************************************************************************************************************************/
function fnPostLoad_KERNEL() {
	 document.getElementById("cmdAddRow_BLK_RUNNING_BRANCHES").style.visibility="hidden";
     document.getElementById("cmdDelRow_BLK_RUNNING_BRANCHES").style.visibility="hidden";
     document.getElementById("BTN_SINGLE_VIEW_BLK_RUNNING_BRANCHES").style.visibility="hidden";
	 	 document.getElementById("EnterQuery").style.visibility="hidden"; //9NT1606_12_4_RETRO_12_1_26524979
     fnEnterQuery();
     gAction = 'EXECUTEQUERY';
     fnExecuteQuery();
     var len = getTableObjForBlock("BLK_RUNNING_BRANCHES").tBodies[0].rows.length; //Redwood_Changes
     disableForm();
     for (i=0;i<len;i++)
      {
      fnEnableElement(getElementsByOjName("EOCSTATUS")[i]); //Redwood_Changes
      }
      	fnEnableElement(getElementsByOjName('BTN_STOP')[0]); //Redwood_Changes
	fnEnableElement(getElementsByOjName('BTN_REFRESH')[0]); //Redwood_Changes
      	fnEnableElement(getElementsByOjName('BTN_EXIT')[0]); //Redwood_Changes
      gAction = "";
     return true;
}
//19001052 starts
function fnPostRow_onClick_BLK_RUNNING_BRANCHES_KERNEL()
{
    var len = getTableObjForBlock("BLK_RUNNING_BRANCHES").tBodies[0].rows.length; //Redwood_Changes
     for (i=0;i<len;i++)
      {
     fnEnableElement(getElementsByOjName("EOCSTATUS")[i]); //Redwood_Changes
      }
}
//19001052 ends
function fnRefresh() {
	 document.getElementById("cmdAddRow_BLK_RUNNING_BRANCHES").style.visibility="hidden";
     document.getElementById("cmdDelRow_BLK_RUNNING_BRANCHES").style.visibility="hidden";
     document.getElementById("BTN_SINGLE_VIEW_BLK_RUNNING_BRANCHES").style.visibility="hidden";
     fnEnterQuery();
     gAction = 'EXECUTEQUERY';
     fnExecuteQuery();
     var len = getTableObjForBlock("BLK_RUNNING_BRANCHES").tBodies[0].rows.length; //Redwood_Changes
     disableForm();
     for (i=0;i<len;i++)
      {
      fnEnableElement(getElementsByOjName("EOCSTATUS")[i]); //Redwood_Changes
      }
      	fnEnableElement(getElementsByOjName('BTN_STOP')[0]); //Redwood_Changes
	fnEnableElement(getElementsByOjName('BTN_REFRESH')[0]); //Redwood_Changes
      	fnEnableElement(getElementsByOjName('BTN_EXIT')[0]); //Redwood_Changes
      gAction = "";
     return true;
}

function fnStop() {
	var old_action= gAction;
    gAction = 'MODIFY';
    appendData();
    gAction ='EODSTOP';
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
    if(fcjResponseDOM) 
    {
     var msgStatus   =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
	if (msgStatus != 'undefined' || msgStatus != ''){     		
		if (msgStatus == 'SUCCESS'){
			fnProcessResponse();
			fnPostProcessResponse(msgStatus);
			disableForm();
			fnEnableElement(getElementsByOjName('BTN_REFRESH')[0]); //Redwood_Changes
			fnEnableElement(getElementsByOjName('BTN_EXIT')[0]); //Redwood_Changes
		}
		else {
			fnProcessResponse();
			fnPostProcessResponse(msgStatus);
		}
	}
    }
    gAction = '';
    return true;
}
