/***************************************************************************************************************************
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
**  
**  Written by         : 
**  Date of creation   : 
**  File Name          : OLDADVFM_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : Niranjana R
**  Last modified on   : 04-OCT-2011
**  Reason             : 9NT1476 :Extensibility Migration
****************************************************************************************************************************/
//9NT1476 :Extensibility Migration
function fnPostUnlock_KERNEL() {
	enableForm();
  
	debugs("In fnPostUnlock", "A");
}

function fnFilePickup()
{
	appendTabData(document.getElementById("TBLPage" + strCurrentTabId));
	
    g_prevAction = gAction;
    gAction='DEFAULT';
	
   fcjRequestDOM = buildUBSXml();
    servletURL = "FCClientHandler";
    fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
        if(fcjResponseDOM)
        {
                var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
               if (msgStatus == 'FAILURE') {
	            // var messageNode = selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
			     //var returnVal = displayResponse(messageNode,msgStatus,'E',"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
				// var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP").xml; As discussed with ashok
				var messageNode = getXMLString(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP"));
				var returnVal = displayResponse(messageNode,msgStatus,'E');
				 
				 }
				 if (msgStatus == "WARNING" ||msgStatus == "SUCCESS")
            {
	       var pureXMLDOM  = fnGetDataXMLFromFCJXML(fcjResponseDOM,1);
	          setDataXML(getXMLString(pureXMLDOM));
	          showData(dbStrRootTableName, 1);
			  }
          }
gAction = g_prevAction;  
 return true;
}

//9NT1476 :Extensibility Migration
