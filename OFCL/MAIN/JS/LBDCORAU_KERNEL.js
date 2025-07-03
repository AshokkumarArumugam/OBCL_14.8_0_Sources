/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product
** Copyright ? 2008 - 2011  Oracle and/or its affiliates.  All rights reserved.
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
**  File Name          : LBDCORAU_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 

**  Last Modified By   : Kavitha Asokan
**  Last modified on   : 24-May-2024
**  Search String      : Bug#36619894 - REDWOOD ADOPTION CHANGES	 
**  Reason             : Not able to authorize as override block length is returning value even when there are no overrides. 
                         Modified the code to get the length from getOjTableRowsLength instead of fetching it from getTableObjForBlock. 
***************************************************************************************************************************
*/

//------------------------------------------------------------------------------
// VARIABLE DECLARATIONS
//------------------------------------------------------------------------------
var fcjRequestDOM;
var fcjResponseDOM;

var subScreen='N';
function fnPostLoad_CVS_AUTH_KERNEL(screenArgs) {
	subScreen = 'Y';
		
if(!fnProcessAuthOnLoad(screenArgs))
        return false;
	   fnEnableElement(document.getElementById("BLK_CONTRACT__BTN_AUTH"));	
	   fnEnableElement(document.getElementById("BLK_CONTRACT__BTN_VW_MSG"));
           
           
	   gAction = 'AUTH';
	   return true;
		
	

	
}

/*function fnPreAuthorize_KERNEL(){
    authFunction = 'LBDCORAU';
    authUixml = 'LBDCORAU';
    authScreenName = 'CVS_AUTH';
    gAction = 'EXECUTEQUERY';

    ArrFuncOrigin['LBDCORAU'] = "KERNEL";
    ArrPrntFunc['LBDCORAU'] = "";
    ArrPrntOrigin['LBDCORAU'] = "";

    return true;
}
function fnPostAuthorize_KERNEL(){
	debugs("In fnPostAuthorize", "A");
	DisableToolbar_buttons("Authorize");
    gAction = "EXECUTEQUERY";
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
    fnSetExitButton(false);
    debugs("In fnPostAuthorize ", "A");
}*/


function fnPostLoad_KERNEL(){

   
 
     return true;
}

function fnPostNew_KERNEL(){


        return true;
}
//
function fnPreUnlock_KERNEL(){
    

    
    return true;
}

function fnPostUnlock_KERNEL(){

                       //Code Fix for Bug No: 17070676 Ends
    return true;
}



function fnPreSave_KERNEL(){
    
        
   
       
    return true;
}

function fnPostSave_KERNEL()
{
    
    return true;
}

 function fnPostExecuteQuery_KERNEL() {
	
		DisableToolbar_buttons('Authorize'); 
	
	var data_blk = "BLK_CONSOL_DETAIL";
var len = 0;
//Bug#36619894 changes starts
//len = getTableObjForBlock("BLK_CONSOL_DETAIL").tBodies[0].rows.length;
len = getOjTableRowsLength("BLK_CONSOL_DETAIL");
//Bug#36619894 changes ends 

		for(i = 0;i < len; i++)
			{
				fnEnableElement(getElementsByOjName("BTN_PART_SHARE")[i]); 
				fnEnableElement(getElementsByOjName("BTN_PART_SHARE")[i]); 
			}
			
		

   
	return true;
}
 


function fn_viewMsg(){

	return true;
}

function fn_authorise(){
    var gprev = gAction;
    gAction = 'AUTH';   
       if (!fnOnlineAuthorize(subScreen)) {		
		var l_msgStat =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
		if (l_msgStat == 'SUCCESS') {		  
	            fnDisableElement(document.getElementById("BLK_CONTRACT__BTN_AUTH"));        
			disableForm();
		}	
        return true;
    }
}

//function fn_authorise(){
//
//
//           var g_prev_gAction = gAction;
//          appendData(document.getElementById("TBLPage" + strCurrentTabId));    
//
//        if (selectNodes(dbDataDOM,"//UDTBS_FUNC_UDF_UPLOAD_DETAIL").length == 0) {
//            gAction = "AUTH";
//            fcjRequestDOM = buildUBSXml();
//            fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);    
//            if (fcjResponseDOM) {
//                var msgStatus =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
//                if (msgStatus == 'FAILURE') {
//                    var messageNode = selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
//            
//          
//		//var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP").xml;
//                //var returnVal = displayResponse(messageNode,msgStatus,'E');
//		    
//                }else if (msgStatus == "WARNING" || msgStatus == "SUCCESS" ) {
//                // var messageNode = selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");  
//		 var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
//                 var returnVal = displayResponse(getXMLString(messageNode), msgStatus, "I", "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
//               //  return true;
//                 
//              // return true;
//                }    
//                var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
//                setDataXML(getXMLString(pureXMLDOM));
//                showData(dbStrRootTableName, 1);
//                gAction = g_prev_gAction;
//            }
//             disableForm();
//
////            if(!fnProcessResponse())
////                return false;        
//
//        }   
// 
//
//	return true;
//    
//}

function fn_partIntShare(){

	return true;
}




      