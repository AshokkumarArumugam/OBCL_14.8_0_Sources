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
**  File Name          : CYDCDEFE_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 

**    Changed By         :  Ajai  
**    Changed on		 :  20-sep-2013
**    Change Description :  Code modified so as to throw error on modification itself if the Currency is CLS
**    search String      :  1202_17487450

**    Changed By         :  Anmol 
**    Changed on		 :  31-Feb-2014
**    Change Description :  Code modified so as to throw error on modification itself if the Currency is CLS
**    search String      :  20284969

**    Changed By         :  Himabindu patil
**    Changed on		 :  27-Apr-2015
**    Change Description :  Maintenancy country fields assigned values from parent screen
**    search String      :  12.1 Changes

** Modified By          : Vanitha P
** Modified On          : 2-Feb-2022
** Modified reason      : Redwood changes
** Search string        : Redwood
****************************************************************************************************************************/
	
     
//------------------------------------------------------------------------------
// VARIABLE DECLARATIONS
//------------------------------------------------------------------------------

var fcjRequestDOM;
var fcjResponseDOM;

var gErrCodes = "";
/*
 * Called to perform some neccessary operation after the fnNew() Window event
 * Specific to the functionid
 */
function fnPostLoad_KERNEL() {
	debugs("In fnPostLoad", "A");

	if (parent.screenArgs['PARENT_FUNC_ID'] == "STDBRREF") 
	{
		fnPostLoad_CVS_MAIN_VIEWLOG();
    }
}

function fnPostLoad_CVS_MAIN_VIEWLOG_KERNEL() {

	 var codes = new Array();

	 createDOM(dbStrRootTableName);

	 codes = parent.screenArgs['KEY'].split("|");

	 if (codes.length > 0)
	 {
		  getElementsByOjName("CCY_CODE")[0].value = codes[0];
		 
	 }
     getElementsByOjName("MOD_NO")[0].value = parent.screenArgs['MOD_NO'];
	 
	  gAction = 'VIEWMNTLOG';
	  functionId = 'CYDCDEFN' ;
	var relationArray = new Array(); 
	relationArray['CYTMS_CCY_DEFN'] = "";
	relationArray['STTMS_COUNTRY'] = "CYTMS_CCY_DEFN~1";
	relationArray['CYTMS_CCY_COUNTRY_MAPPING'] = "CYTMS_CCY_DEFN~N";
	relationArray['UDTBS_FUNC_UDF_UPLOAD_DETAIL'] = "CYTMS_CCY_DEFN~N";

	var dataSrcLocationArray = new Array();
	dataSrcLocationArray[0] = "CYTMS_CCY_DEFN";
	dataSrcLocationArray[1] = "STTMS_COUNTRY";
	dataSrcLocationArray[2] = "CYTMS_CCY_COUNTRY_MAPPING";
	dataSrcLocationArray[3] = "UDTBS_FUNC_UDF_UPLOAD_DETAIL";

	 
	//appendData(document.getElementById("TBLPageAll"));
	appendTextFieldValue(getElementsByOjName('CCY_CODE')[0], 1, 'CYTMS_CCY_DEFN');	
	appendTextFieldValue(getElementsByOjName('MOD_NO')[0], 1, 'CYTMS_CCY_DEFN');	



  fcjRequestDOM = buildUBSXml();

  // Post the XML to Server
  fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);

  if(fcjResponseDOM) {
              var msgStatus   =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));

   if (msgStatus == 'FAILURE') {
     var messageNode = selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
     var returnVal = displayResponse(messageNode);
     }


            if(msgStatus == 'SUCCESS')
            {
                        var pureXMLDOM  = fnGetDataXMLFromFCJXML(fcjResponseDOM,1);
						setDataXML(getXMLString(pureXMLDOM));
			            showTabData_Viewchg();
            }
  }

 disableForm();
  fnEnableElement(getElementsByOjName('BTN_EXIT')[0]);
}

 function fnPostLoad_CVS_CTRY_MAPPING_KERNEL(screenArgs)
{


    getElementsByOjName("CCY_CODE_CTRY_MAP")[0].value = parent.document.getElementById("BLK_CYTMS_CCY_DEFN_MASTER__CCY_CODE").value ;
     getElementsByOjName("CCY_DESC_CTRY_MAP")[0].value =  parent.document.getElementById("BLK_CYTMS_CCY_DEFN_MASTER__CCY_NAME").value ;
      //12.1 changes start
      getElementsByOjName("MAINT_COUNTRY_CTRY_MAP")[0].value = parent.document.getElementById("BLK_CYTMS_CCY_DEFN_MASTER__MAINT_COUNTRY").value ;
     getElementsByOjName("MAINT_CNTRY_DESC_CTRY_MAP")[0].value =  parent.document.getElementById("BLK_CYTMS_CCY_DEFN_MASTER__MAINT_COUNTRY_NAME").value ;
     //12.1 changes end
 return true;

}

// 1202_17487450 starts
function fnPreUnlock_KERNEL() {
//20284969 starts
//var clschecked = document.getElementById("BLK_CYTMS_CCY_DEFN_MASTER__CLS_CCY").checked;//Redwood
var clschecked = document.getElementById("BLK_CYTMS_CCY_DEFN_MASTER__CLS_CCY").value;//Redwood
 if (clschecked == true )
   { //20284969 ends
  gAction = 'CLSCHK';
  fnCallBackEnd(gAction);
   var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
		if (msgStatus == 'FAILURE') {
			 var messageNode = getXMLString(selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP"));
		    //var returnVal = displayResponse(messageNode, msgStatus, 'E','');
			showErrorAlerts('ST-BRN-L001');
			return false;
		}
	}	//20284969 
    return true;
}


function fnCallBackEnd(actionCd){
    gAction = actionCd;
	fcjRequestDOM = buildUBSXml();
	fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
	var pureXMLDOM  = fnGetDataXMLFromFCJXML(fcjResponseDOM,1);
	setDataXML(getXMLString(pureXMLDOM));
	showData(dbStrRootTableName, 1);
}

//1202_17487450 ends