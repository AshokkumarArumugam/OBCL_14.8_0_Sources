/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Oracle Banking Corporate Lending  Software Product.   Copyright © 2018.  All rights reserved.
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
 
**  Written by         : 
**  Date of creation   : 
**  File Name          :  LBCRATIO_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**	Changed By           : JayaramN                                           
**	Date                 : 23-Jul-2020                                         
**	Change Description   : OBCL_14.4_SUPPORT_CASCADE_PARTICIPATION_IN_LS
**	Search String        : SFR#31659522:SUPPORT_CASCADE_PARTICIPATION_IN_LS

**  CHANGE LOG         : RAMYA M
**  Last modified on   : 27-02-2023
**  Reason             : OBCL_14.8_LS_REDWOOD_CHANGES
**  SEARCH STRING      : BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
****************************************************************************************************************************/
/*
function fn_ratio_calc() {
    g_prev_gAction = gAction;
	gAction = 'DEFAULT';
	appendData(document.getElementById('TBLPageAll'));
    fcjRequestDOM = buildUBSXml(); 
    fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
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
 gAction = g_prev_gAction; 
    return true;
}
*/  //SFR#31659522:SUPPORT_CASCADE_PARTICIPATION_IN_LS - Commented
//SFR#31659522:SUPPORT_CASCADE_PARTICIPATION_IN_LS - Starts here
function fn_ratio_calc()
{
	l_prev_gAction=gAction;
	gAction = "DEFAULT";
	fnClassDefault("BLK_CONTROL");
	gAction = l_prev_gAction;
	
return true;	
}

function fnPostLoad_CVS_PRATIO_KERNEL(screenArgs) {
	
	 fnEnableElement(getTableObjForBlock("BLK_CONTROL__BTN_CALCULATE"));//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES

	return true;
}

function fnPreClassDefault_CVS_PRATIO_KERNEL(){
	gAction = 'DEFAULT';
	return true;
}
//SFR#31659522:SUPPORT_CASCADE_PARTICIPATION_IN_LS - Ends here
