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
**  File Name          : CFCINTCH_KERNEL.js
**  Purpose            : 
**  Called From        : 
**    	
   Changed By         :  Avinav Seal
   Changed On 	      :  03-06-2016
   Change Description :  New CFCINTCH callform 
   
  **Changed By         : Chandra Achuta
  **Change Description : Rate Fixing changes for OBCL_12.5
  **Search String      : OBCL_12.5_Rate_Fixing for manual
  
  **Changed By         : Chandra Achuta
  **Date               : 04-AUG-2017
  **Change Description : Rate fixing rate is showing incorrectly. 
  **Search String      : OBCL_12.5_26574328

  **Changed By         : Chandra Achuta
  **Date               : 22-AUG-2017
  **Change Description : If user change to floating rate code that vlaue should be effect in rate fixing sub screen. 
  **Search String      : OBCL_12.5_26636176

  **Changed By         : Chandra Achuta
  **Date               : 24-OCT-2019
  **Change Description : In product spread type as slab/tier spread maintenance subscreen should be dusable in OLDVAMND. 
  **Search String      : Bug#30310926

  **Changed By         : Gomathi G
  **Date               : 12-MAR-2020
  **Change Description : In product level  spread type as slab/tier, spread maintenance subscreen should be disable in OLDTRONL for MODIFY action 
  **Search String      : OBCL_14.3_SUPPORT_BUG#31016538
  
    Changed By         : Mohan Pal
    Changed On         : 04-Sep-2023
    Change Description : Backend call with RATEPICKUP action.
    Search String      : Bug#35592744 CHANGES
	
  **Changed By         : Abhinav Kumar
  **Date               : 29-Mar-2024
  **Change Description : Allowing rate type change from Fixed to Floating Periodic Manual as part of VAMI, 
                         Enabling rate fixing subscreen for VAMI if FPM is selected by user. 
  **Search String      : Bug#36345472
  
  **Changed By         : Abhinav Kumar
  **Date               : 24-Oct-2024
  **Change Description : Added code to enable/disable new flag for Back date rate Pickup for Floating Periodic Manual contract as part of VAMI. 
  **Search String      : Bug#36669212	

	Changed By         : Pallavi R
    Changed On         : 19-Nov-2023
    Change Description : Repick up rate should be enabled from ONLINE screens only on unlock before auth
    Search String      : OBCL_14.7_MASH_#37259053 Changes  

****************************************************************************************************************************/
//OBCL_12.5_26636176   changes starts
var screenArguments = new Array();
var v_spread;  //Bug#30310926   code added
function mySplit(str, ch) {
    var pos, start = 0, result = [];
    while ((pos = str.indexOf(ch, start)) != -1) {
        result.push(str.substring(start, pos));
        start = pos + 1;
    }
    result.push(str.substr(start));
    return(result);    
}
function getText(elem) {
	if (getBrowser().indexOf("IE") != -1) {
		return elem.text;
	}else{
		return elem.textContent;
	}
}
//OBCL_12.5_26636176  changes ends
function fnPostLoad_CVS_INTEREST_KERNEL(){
	getElementsByOjName('BTN_ADD_BLK_LFTBS_CONTRACT_INTEREST')[0].style.visibility = 'hidden';
	getElementsByOjName('BTN_REMOVE_BLK_LFTBS_CONTRACT_INTEREST')[0].style.visibility = 'hidden';
	//Bug#30310926  changes starts
	//if(document.getElementById('BLK_MASTER_INT__TXTMAINFUNCTION').value =='OLDVAMND' &&  document.getElementById('BLK_MASTER_INT__TXTSPREADTYPE').value =='S'){
		if((document.getElementById('BLK_MASTER_INT__TXTMAINFUNCTION').value =='OLDVAMND' &&  document.getElementById('BLK_MASTER_INT__TXTSPREADTYPE').value =='S') || (document.getElementById('BLK_MASTER_INT__TXTMAINFUNCTION').value =='OLDTRONL' && gAction == 'MODIFY')){  //OBCL_14.3_SUPPORT_BUG#31016538
		//v_spread=document.getElementById("DIVSubSystem").children[0].children[0].getElementsByTagName("li")[0].getElementsByClassName("Abutton")[0];
        v_spread=document.getElementById("subSystemConveyorBelt").getElementsByClassName("conveyorBeltItem")[0];		
		fnDisableSubSysButtons(v_spread);
	}
	//Bug#30310926  changes ends	
        // SOFR changes start
	if (gAction == 'NEW'){
	fnClassDefault('BLK_MASTER_INT'); // master block
	}
	//SOFR changes end 
	
	//Bug#35592744 STARTS
	if (document.getElementById('BLK_MASTER_INT__TXTMAINFUNCTION').value =='OLDTRONL' && gAction == 'MODIFY' && document.getElementById("BLK_MASTER_INT__ONCE_AUTH").value == 'Y'){////OBCL_14.7_MASH_#37259053 Changes,Added ONCE_AUTH
			fnDisableElement(document.getElementById("BLK_MASTER_INT__BTN_INT"));
	}
	
	if (document.getElementById('BLK_MASTER_INT__TXTMAINFUNCTION').value =='OLDVAMND' && gAction == 'MODIFY'){
			fnEnableElement(document.getElementById("BLK_MASTER_INT__BTN_INT"));
			fnEnableElement(document.getElementById("BLK_LFTBS_CONTRACT_INTEREST__BKDT_VAMI_RTPK_FG"));  //Bug#36669212
	}
	//Bug#35592744 ENDS
	//Bug#36669212 Starts
	if (document.getElementById('BLK_MASTER_INT__TXTMAINFUNCTION').value =='OLDTRONL'){
			fnDisableElement(document.getElementById("BLK_LFTBS_CONTRACT_INTEREST__BKDT_VAMI_RTPK_FG"));
	}
	//Bug#36669212 Ends
	return true;
}
//OBCL_12.5_26636176  changes starts
function fnPreLoad_CVS_RATEFIX_KERNEL(){
    screenArguments["FLOATING_RATE_CODE"] = document.getElementById("BLK_LFTBS_CONTRACT_INTEREST__RATECODE").value; 
    screenArguments["RATEREVISION_METHOD"] = document.getElementById("BLK_LFTBS_CONTRACT_INTEREST__RATEREVISIONMETHOD").value;
    //parent.screenArguments = screenArguments;
	//Bug#36345472 Changes Starts
	screenArguments["COMPONENT"] = document.getElementById("BLK_LFTBS_CONTRACT_INTEREST__COMPONENT").value;
	screenArguments["CURRENCY"] = document.getElementById("BLK_LFTBS_CONTRACT_INTEREST__CURRENCY").value;
	screenArguments["CURRESETDT"] = document.getElementById("BLK_LFTBS_CONTRACT_INTEREST__TRANSACTIONDATE").value;
	screenArguments["RESETVALDT"] = document.getElementById("BLK_LFTBS_CONTRACT_INTEREST__VALUEDATE").value;
	screenArguments["NXTRESETDT"] = '';
	screenArguments["MAINFUNCTION"] = document.getElementById('BLK_MASTER_INT__TXTMAINFUNCTION').value;
	//Bug#36345472 Changes Ends
	return true;
}
//OBCL_12.5_26636176  changes ends
function fnPostLoad_CVS_RATEFIX_KERNEL(){
        //OBCL_12.5_26636176  changes starts
        /* Checking Rate Revision Method Manual or Auto */
	if (parent.screenArguments['RATEREVISION_METHOD'] == 'M' && parent.screenArguments["FLOATING_RATE_CODE"] != 'undefined' ) {
		document.getElementById("BLK_RATEFIX__RATECODE").value = parent.screenArguments["FLOATING_RATE_CODE"];
    //Bug#36345472 Changes Starts
		if (parent.screenArguments['MAINFUNCTION'] =='OLDVAMND' && gAction == 'MODIFY')	
		{
	    document.getElementById("BLK_RATEFIX__COMPONENT").value = parent.screenArguments["COMPONENT"];
		document.getElementById("BLK_RATEFIX__CURRENCY").value = parent.screenArguments["CURRENCY"];
		document.getElementById("BLK_RATEFIX__CURRESETDT").value = parent.screenArguments["CURRESETDT"];
		document.getElementById("BLK_RATEFIX__RESETVALDT").value = parent.screenArguments["RESETVALDT"];
		fnEnableElement(document.getElementById("BLK_RATEFIX__BTN_FETCH"));
		fnEnableElement(document.getElementById("BLK_RATEFIX__RATE"));
		fnEnableElement(document.getElementById("BLK_RATEFIX__SPREAD"));
		fnEnableElement(document.getElementById("BLK_RATEFIX__FINALRATE"));
		fnEnableElement(document.getElementById("BLK_RATEFIX__NXTRESETDT"));
		}
	//Bug#36345472 Changes Ends
	}
        //OBCL_12.5_26636176  changes ends
	getElementsByOjName('BTN_ADD_BLK_RATEFIX')[0].style.visibility = 'hidden';
	getElementsByOjName('BTN_REMOVE_BLK_RATEFIX')[0].style.visibility = 'hidden';
        //OBCL_12.5_26636176  changes starts
        /* Resetting screenArguments[] Parameters */
        parent.screenArguments['RATEREVISION_METHOD'] == '';  
	parent.screenArguments['FLOATING_RATE_CODE'] == '';
	/* Resetting screenArguments[] Parameters */
        //OBCL_12.5_26636176  changes ends
	return true;
}
function fn_validate_rate() {
	return true;
}
//OBCL_12.5_Rate_Fixing_for_manual starts
function fnFetch(){
	var gPrevAction=gAction;
	gAction='FETCH';
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
	if (msgStatus == "FAILURE") {
        var returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'E');
		var RecnodeList = selectNodes(fcjResponseDOM, '//REC[@TYPE="BLK_RATEFIX"]/FV');
		if(RecnodeList.length>0){
			var RecnodeListLen = RecnodeList.length;
			for(var i = 0; i < RecnodeListLen; i++){
				var TextContents = mySplit(getText(RecnodeList[i]),"~");			
					document.getElementById("BLK_RATEFIX__RATE").value = '';  
					document.getElementById("BLK_RATEFIX__RATE").value = '';				 
					document.getElementById("BLK_RATEFIX__SPREAD").value = '';  
					document.getElementById("BLK_RATEFIX__SPREAD").value = '';
					document.getElementById("BLK_RATEFIX__FINALRATE").value = '';  					
			}
		}
		 gAction = g_prev_gAction;
        return false;
    }
	
	var RecnodeList = selectNodes(fcjResponseDOM, '//REC[@TYPE="BLK_RATEFIX"]/FV');
	if(RecnodeList.length>0){
		var RecnodeListLen = RecnodeList.length;
		for(var i = 0; i < RecnodeListLen; i++){
			var TextContents = mySplit(getText(RecnodeList[i]),"~");			
			    document.getElementById("BLK_RATEFIX__RATE").value = TextContents[9]; //OBCL_12.5_26574328  changes 
				document.getElementById("BLK_RATEFIX__RATE").value = TextContents[9];	
				//Bug#36345472
				if (parent.screenArguments['MAINFUNCTION'] =='OLDVAMND' && parent.screenArguments['RATEREVISION_METHOD'] == 'M')	
                {		
				document.getElementById("BLK_RATEFIX__NXTRESETDT").value = '';
				}
                //Bug#36345472					
				var RATE = 0;
				var SPREAD = 0;
				var FINAL = 0;
				RATE=Number(document.getElementById("BLK_RATEFIX__RATE").value);
				SPREAD=Number(document.getElementById("BLK_RATEFIX__SPREAD").value);
				FINAL=RATE+SPREAD;
				document.getElementById("BLK_RATEFIX__FINALRATE").value = FINAL; 					
		}
	}
	return true;
}
//OBCL_12.5_Rate_Fixing_for_manual ends
//Bug#35592744 STARTS
function fn_rate_pickup()
{
    var g_prev_gAction = gAction;
    gAction = "RATEPICKUP";	
	
    appendData();
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
	
	
   var orgDom = loadXMLDoc(getXMLString(dbDataDOM));
	
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
	
    if (dbDataDOM.documentElement.nodeName != dataSrcLocationArray[0]) {
        var blockId = 'BLK_MASTER_INT' ;
	 var removeNode = selectNodes(orgDom, getXPathQuery(blockId));  
        for (var i = 0; i < removeNode.length; i++) {
            removeNode[i].parentNode.removeChild(removeNode[i]);
        }
        var parentNode = relationArray[dbDataDOM.documentElement.nodeName]; 
        if(parentNode.indexOf("~") == -1){            
            orgDom.documentElement.appendChild(getCloneDocElement(dbDataDOM.documentElement));
        }else{
            var parentNodename =parentNode.substring(0,parentNode.indexOf("~"));
            var xpathquery = getXPathQuery(parentNodename) ;
            xpathquery = xpathquery + "[@ID=" + dbIndexArray[parentNodename] + "]";            
            selectSingleNode(orgDom,xpathquery).appendChild(getCloneDocElement(dbDataDOM.documentElement));
        }
        dbDataDOM = loadXMLDoc(getXMLString(orgDom));
        showData();
    }
	
	
	
	fnClassDefault('BLK_MASTER_INT'); 
	
    gAction = g_prev_gAction;
return true;
}

//Bug#35592744 ENDS