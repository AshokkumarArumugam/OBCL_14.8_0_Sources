/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright © 2007 - 2012  Oracle and/or its affiliates.  All rights reserved.
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
**  File Name          : OLCONLAU_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 
****************************************************************************************************************************/

var fcjRequestDOM;
var fcjResponseDOM;
    servletURL = "FCClientHandler";

var gErrCodes = "";
var dcn;

/*
 * Called to perform some neccessary operation after the fnSave() Action event
 * Specific to the functionid 
 */

function fnPostLoad_KERNEL(screenArgs)
{
                 gAction = "DEFAULT"; //FC11.1 ITR2 SFR#367
				 enableForm();
				 document.getElementById("BLK_USER__DCN").value = parent.screenArgs['DCN'];
                createDOM(dbStrRootTableName);   
  }

function fnPreSave_CVS_OLCONLAU_KERNEL(screenArgs){
             var gprev=gAction;
            if( document.getElementById("BLK_USER__USER_ID").value=='' || document.getElementById("BLK_USER__PASSWORD").value == '')
             {
             //alert('UserId/ Password Cannot be Blank');
			 showErrorAlerts('IN-HEAR-336');//NLS change -Removal of hardcoded alerts
              return false;
             }
             else
             {
             relationArray['BLK_USER'] = "";  
             dataSrcLocationArray[0] = "BLK_USER";
			 appendTextFieldValue(getElementsByOjName('USER_ID')[0], 1, 'BLK_USER');
             appendTextFieldValue(getElementsByOjName('PASSWORD')[0], 1, 'BLK_USER');
             appendTextFieldValue(getElementsByOjName('DCN')[0], 1, 'BLK_USER'); 
          
              gAction = "DEFAULT";
              fcjRequestDOM = buildUBSXml(); 
              fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
               if(fcjResponseDOM) {

                                     var msgStatus   =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
									 debugs("msgStatus--------------ssss", msgStatus);
                                     //var messageNode = selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
									//  var messageNode = selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
                                     var pureXMLDOM  = fnGetDataXMLFromFCJXML(fcjResponseDOM,1);
                                     if (msgStatus == 'SUCCESS')
                                     if (msgStatus == 'SUCCESS')
                                                {
                                                 // dlgArg.msonlaut_stat = "Y";
                                               parent.screenArgs['DCN']="Y";
											  // alert('Request Successfully Processed');//FC11.1 ITR2 SFR#367
											   showErrorAlerts('IN-HEAR-337');//NLS change -Removal of hardcoded alerts
												fnDisableElement(getElementsByOjName('BTN_OK')[0]);//FC11.1 ITR2 SFR#367
                                                 //self.close();//FC11.1 ITR2 SFR#367
                                                  }                                               
                                      if (msgStatus == 'FAILURE')
                                                 {	
										debugs("msgStatus----------------FFF>", msgStatus);	
						var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP").xml;
						var returnVal = displayResponse(messageNode,msgStatus,'E');										
										//var  returnVal = displayResponse(messageNode);
                                        document.getElementById("BLK_USER__PASSWORD").value='';
                                                 }
                         }
            }
                  
      //  gAction=gprev;
	 return true;
}

function fnExitAll(v_scrName, e) {
    var e = window.event || e;
    var srcElement = getEventSourceElement(e);
    if(srcElement.disabled) return;
    debugs("FunctionId~ScreenNameeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", functionId+"~"+v_scrName);
        if (gAction != "") {
            mask();
            showAlerts(fnBuildAlertXML("", "I", mainWin.getItemDesc("LBL_CANCEL_DESC")), "C");
            alertAction = "EXITACTION";
        } else {
            dbDataDOM = null;
            isExitTriggered = true;
           // fnFocus();
            //mainWin.showToolbar("", "", "");
            var winObj = mainWin.document.getElementById(seqNo);
            mainWin.fnExit(winObj);
        }

    e.cancelBubble = true;
} 

