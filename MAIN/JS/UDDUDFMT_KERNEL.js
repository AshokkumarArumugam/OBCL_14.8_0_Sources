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
**  File Name          : UDDUDFMT_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : Guruprasad Bhat
**  Last modified on   : 16/07/2013
**  Full Version       : -
**  Reason             : Description Value in LOV subscreen was not storing the modified values.
**  Search String      : Fix for Bug# 17046592
**
**  Last Modified By   : Guruprasad Bhat
**  Last modified on   : 07/08/2013
**  Full Version       : -
**  Reason             : Action Code was not changing to Cube on click of cube entity subsystem
**  Search String      : Fix for Bug#17040616

**  Last Modified By   : Anoop R
**  Last modified on   : 08-Jul-2014
**  Reason             : Fix given for no values shown in cube entity type udf.
**  Search String      : 1203_19172237

**  Last Modified By   : Girish M
**  Last modified on   : 09-FEB-2022
**  Reason             : REDWOOD CHANGES
**  Search String      : REDWOOD_CHANGES
****************************************************************************************************************************/
function fnExecuteVal(){
  appendData(document.getElementById('TBLPage'+strCurrentTabId));
  var val_rule = document.getElementById('BLK_UDF_VAL_RULE__VALRLE').value;
  gAction = 'XVAL';
  fnCallBackEnd(gAction);
  var msgStatus   =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
		if (msgStatus == 'FAILURE') {
			//var messageNode = selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP/ERROR/EDESC").text;        //FCUBS_12.2.0.0.0_SUPPORT_23664181 commented
			var messageNode = getNodeText(selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP/ERROR/EDESC"));  //FCUBS_12.2.0.0.0_SUPPORT_23664181 added
			document.getElementById('BLK_UDF_VAL_RULE__VALERR').value = messageNode;
		}
		else
		{
		document.getElementById('BLK_UDF_VAL_RULE__VALERR').value = document.getElementById('BLK_UDF_VAL_RULE__VALRLE').value;
		}
		
		document.getElementById('BLK_UDF_VAL_RULE__VALRLE').value = val_rule;
  appendData(document.getElementById('TBLPage'+strCurrentTabId));
}
function fnErrorVal(){
appendData(document.getElementById('TBLPage'+strCurrentTabId));
  gAction = 'EVAL';
  var val_rule = document.getElementById('BLK_UDF_VAL_RULE__VALRLE').value;
  fnCallBackEnd(gAction);
  var msgStatus   =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
		if (msgStatus == 'FAILURE') {
			var messageNode = selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP/ERROR/EDESC").text; 
			document.getElementById('BLK_UDF_VAL_RULE__VALERR').value = messageNode;
		}
		else
		{
		document.getElementById('BLK_UDF_VAL_RULE__VALERR').value = document.getElementById('BLK_UDF_VAL_RULE__VALRLE').value;
		}		
		document.getElementById('BLK_UDF_VAL_RULE__VALRLE').value = val_rule;
  appendData(document.getElementById('TBLPage'+strCurrentTabId));
}
function fnExecuteDrv(){
  appendData(document.getElementById('TBLPage'+strCurrentTabId));
  var drv_rule = document.getElementById('BLK_UDF_DRV_RULE__DRVRLE').value;
  gAction = 'XDRV';
  fnCallBackEnd(gAction);
  var msgStatus   =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
		if (msgStatus == 'FAILURE') {
			var messageNode = selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP/ERROR/EDESC").text; 
			document.getElementById('BLK_UDF_DRV_RULE__DRVERR').value = messageNode;
		}
		else
		{
		document.getElementById('BLK_UDF_DRV_RULE__DRVERR').value = document.getElementById('BLK_UDF_DRV_RULE__DRVRLE').value;
		}
		document.getElementById('BLK_UDF_DRV_RULE__DRVRLE').value = drv_rule;
  appendData(document.getElementById('TBLPage'+strCurrentTabId));
}
function fnErrorDrv(){
  appendData(document.getElementById('TBLPage'+strCurrentTabId));
  var drv_rule = document.getElementById('BLK_UDF_DRV_RULE__DRVRLE').value;
  gAction = 'EDRV';
  fnCallBackEnd(gAction);
  var msgStatus   =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
		if (msgStatus == 'FAILURE') {
			var messageNode = selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP/ERROR/EDESC").text; 
			document.getElementById('BLK_UDF_DRV_RULE__DRVERR').value = messageNode;
		}
		else
		{
		document.getElementById('BLK_UDF_DRV_RULE__DRVERR').value = document.getElementById('BLK_UDF_DRV_RULE__DRVRLE').value;
		}
		document.getElementById('BLK_UDF_DRV_RULE__DRVRLE').value = drv_rule;
  appendData(document.getElementById('TBLPage'+strCurrentTabId));
}

//REDWOOD_CHANGES Overriden Function
function fnCallBackEnd(actionCd){
    gAction = actionCd;
	fcjRequestDOM = buildUBSXml();
	fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
	var pureXMLDOM  = fnGetDataXMLFromFCJXML(fcjResponseDOM,1);
	setDataXML(getXMLString(pureXMLDOM));
	showData(dbStrRootTableName, 1);
}

function fnPreSave_CVS_LOV_KERNEL(){

 var old_action = gAction;
  gAction = "LOV";
        appendData(); // Fix for Bug# 17046592
		fcjRequestDOM = buildUBSXml();
		
        gAction = old_action ;
		
        fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);		 

        if (fcjResponseDOM) {		

            var msgStatus =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));

            if (msgStatus == 'FAILURE') {
                var messageNode = getXMLString(selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP"));
            }
            else if (msgStatus == "WARNING" || msgStatus == "SUCCESS" ) {              
		  var messageNode = getXMLString(selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV"));
            }
            var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
            setDataXML(getXMLString(pureXMLDOM));
            showData(dbStrRootTableName, 1);
        }
		//var returnVal = displayResponse(messageNode, msgStatus, 'I','');
        if (msgStatus == 'FAILURE') {
            var returnVal = displayResponse(messageNode, msgStatus, 'E','');//displayResponse(messageNode);
            return false;
        }
        else {
            return true;
        }
    }
   
//function fnPreSave_CVS_CUBEKERNEL(){ Code Commented as Part of Fix for Bug#17040616
function fnPreSave_CVS_CUBE_KERNEL(){  // Code added as part of Fix for Bug#17040616
 var old_action = gAction;
  gAction = "CUBE";
  appendData(); //1203_19172237
        fcjRequestDOM = buildUBSXml();
        gAction = old_action ;

        fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);		 

        if (fcjResponseDOM) {		

            var msgStatus =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));

            if (msgStatus == 'FAILURE') {
                var messageNode = getXMLString(selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP"));
            }
            else if (msgStatus == "WARNING" || msgStatus == "SUCCESS" ) {              
		  var messageNode = getXMLString(selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV"));
            }
            var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
            setDataXML(getXMLString(pureXMLDOM));
            showData(dbStrRootTableName, 1);
        }
		//var returnVal = displayResponse(messageNode, msgStatus, 'I','');
        if (msgStatus == 'FAILURE') {
            var returnVal = displayResponse(messageNode, msgStatus, 'E','');//displayResponse(messageNode);
            return false;
        }
        else {
            return true;
        }
    }
   

