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
**  File Name          : MIDGRPMT_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 
****************************************************************************************************************************/


function fnPostNew_KERNEL() {
    debugs("In fnPostNew", "A");
   fnPopulateLabels_KERNEL();
     debugs("In fnPostNew", "A");
    return true;	
}



function fnPopulateLabels_KERNEL() {
    var old_action = gAction;
    //appendData(document.getElementById("TBLPage" + strCurrentTabID));
	 debugs("In Get Label", "A");
    if (selectNodes(dbDataDOM,"//UDTBS_FUNC_UDF_UPLOAD_DETAIL").length == 0) {
        gAction = "SHOWMIS";
        fcjRequestDOM = buildUBSXml();
        gAction = old_action ;

        fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
	
	 debugs("In about to enter loop", "A");

        if (fcjResponseDOM) {

		 debugs("In Loop", "A");

            var msgStatus =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));

            if (msgStatus == 'FAILURE') {
                var messageNode = getXMLString(selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP"));
            }
            else if (msgStatus == "WARNING" || msgStatus == "SUCCESS" ) {
                //var messageNode = getXMLString(selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP"));
		  var messageNode = getXMLString(selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV"));

            }


            var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
            setDataXML(getXMLString(pureXMLDOM));
            showData(dbStrRootTableName, 1);
        }
		var returnVal = displayResponse(messageNode, msgStatus, 'I','');
        if (msgStatus == 'FAILURE') {
            var returnVal = displayResponse(messageNode, msgStatus, 'I','');//displayResponse(messageNode);
            return false;
        }
        else {
            return true;
        }
    }
}
