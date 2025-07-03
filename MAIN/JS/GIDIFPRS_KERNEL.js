/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright © 2010 - 2020  Oracle and/or its affiliates.  All rights reserved.
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
**  Written by         : Sudheer
**  Date of creation   : 01-FEB-2018
**  File Name          : GIDIFPRS_KERNEL.js
**  Purpose            : Kernel JS file for Extensible Screen 
**  Called From        : GIDIFPRC_SYS.js
**  Modify Reason	   : RETRO
**
**
** Modified By      : Alam
** Modified On      : 18-Jun-2019
** Modified Reason  : Pickup ALL Files
** Search String    : JCROFC_Minicore_IntegrationBug#29865879
**
** Modified By      : Alam
** Modified On      : 12-Jul-2019
** Modified Reason  : Retro Changes for 22173204 
** Search String    : JCROFC_Minicore_Integration_Remediation_Fix2

** Modified By      : Pradnya ANap
** Modified On      : 06-Jun-2022
** Modified Reason  : While converting GIDIFPRS from non-ext to extensible, retro of screen exit function not done properly, hence corrected the same.
** Search String    : Bug_34113318
****************************************************************************************************************************/

//------------------------------------------------------------------------------
// VARIABLE DECLARATIONS
//------------------------------------------------------------------------------

var fcjRequestDOM;
var fcjResponseDOM;
var isValidated= "true";
var gErrCodes = "";
var msgStatus = "";//16891409
customAlertAction = "";
function fnPreLoad_KERNEL() {
	debugs("In fnPreLoad", "A");
  return true;
}
function fnPostLoad_KERNEL() {
    //enableForm();
  	//DisableToolbar_buttons("New");
	//DisableToolbar_buttons("EnterQuery");
    //document.getElementById('BLK_GITM_INTERFACE_TRIGGER__BRANCH_CODE').value=mainWin.CurrentBranch; //#18894884 changes
    //var dbDataDOM=createDOM(dbStrRootTableName);
	//gAction='CUSTOM'; //Fix for FCUBS_12.2_SUPPORT_23656977
    //debugs("In fnPostLoad", "A");
	//document.getElementById('BLK_GITM_INTERFACE_TRIGGER__FILE_PATH').parentElement.style.display="none";
  //document.getElementById("EnterQuery").style.display = "none";  
  document.getElementById("EnterQuery").style.display = "none";//JCROFC_Minicore_Integration_Bug#29865879
  fnFileMask_KERNEL(); //JCROFC_Minicore_Integration_Bug#29865879
return true;        
}
function fnPreNew_KERNEL() {
      //document.getElementById('GITM_INTERFACE_TRIGGER__BRANCH_CODE').value=mainWin.CurrentBranch;  //#18894884 changes
      var newAction = true;
	debugs("In fnPreNew", "A");
	document.getElementById("BLK_GITM_INTERFACE_TRIGGER__INTERFACE_CODE").focus();//JCROFC_Minicore_Integration_Remediation_Fix2
	return newAction;  
	//document.getElementById("BLK_GITM_INTERFACE_TRIGGER__INTERFACE_CODE").focus();//JCROFC_Minicore_Integration_Remediation_Fix2
}
function fnPostNew() {
 //document.getElementById('GITM_INTERFACE_TRIGGER__BRANCH_CODE').value=mainWin.CurrentBranch;  //#18894884 changes
	debugs("In fnPostNew", "A");	
  document.getElementById("Save").style.display = "none";
  fnFileMask_KERNEL();//JCROFC_Minicore_Integration_Bug#29865879
  return true;
}
//added by Ria
function fnEnableDisable_KERNEL() {
	if(document.getElementById("BLK_GITM_INTERFACE_TRIGGER__INTERFACE_TYPE").value=='O') {
		document.getElementById("BLK_GITM_INTERFACE_TRIGGER__FILE_NAME").value='';
		fnDisableElement(document.getElementById("BLK_GITM_INTERFACE_TRIGGER__FILE_NAME"));
		fnDisableElement(document.getElementById("BLK_GITM_INTERFACE_TRIGGER__PROCESS_CODE"));
                
	}
	else {
		fnEnableElement(document.getElementById("BLK_GITM_INTERFACE_TRIGGER__FILE_NAME"));
		fnEnableElement(document.getElementById("BLK_GITM_INTERFACE_TRIGGER__PROCESS_CODE"));
		fnFileMask_KERNEL();//JCROFC_Minicore_Integration_Remediation_Fix2		
	}
}
function fnPreSave_KERNEL() {
	if(!fnValidate_KERNEL())
        return false;

	debugs("In fnPreSave", "A");	
	var isValid = true;
		
	
	if (!isValid) {		
		var msg = buildMessage(gErrCodes);
		alertMessage(msg);
		return false;
	}
	
	return isValid;	
}
//Scheduling of uploads Begin
function fnFileUpload_KERNEL(){

    if (!fnValidateMandatory()) {
        mask();
        showAlerts(fnBuildAlertXML(gErrCodes.substring(0, gErrCodes.length - 1), 'I', '', replaceStr.substring(0, replaceStr.length - 1)), 'I');
        alertAction = "UNMASK";
        gErrCodes = "";
        replaceStr = "";
        return false;
    }
    if (document.getElementById("BLK_GITM_INTERFACE_TRIGGER__FILE_NAME").value == ""){
        mask();
        showErrorAlerts('GI-INF-20','I');
        return false;
    }
     
    var title = mainWin.getItemDesc("LBL_FILE_UPLOAD");      // "Image Upload"
    var upload = mainWin.getItemDesc("LBL_UPLOAD");
    var filepath = document.getElementById("BLK_GITM_INTERFACE_TRIGGER__FILE_PATH").value;
    var Infilename = document.getElementById("BLK_GITM_INTERFACE_TRIGGER__FILE_NAME").value;
    var Infilemask = document.getElementById("BLK_GITM_INTERFACE_TRIGGER__FILE_MASK").value;
    var InterfacCode = document.getElementById("BLK_GITM_INTERFACE_TRIGGER__INTERFACE_CODE").value;
    var l_Params = "title=" + title;
    l_Params += "&upload=" + upload;
     l_Params += "&filepath=" + filepath;
     l_Params += "&inFilename=" + Infilename;
     l_Params += "&inFilemask=" + Infilemask;
     l_Params += "&interfacCode=" + InterfacCode;
    loadSubScreenDIV("ChildWin", "FileUpload.jsp?" + l_Params);

}//Scheduling of uploads End

function fnValidate_KERNEL(){
var prevgAction;

    prevgAction=gAction;
    gAction='DEFAULT';
    appendData(document.getElementById("TBLPage" + strCurrentTabId));
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
    gAction=prevgAction;
          
      if(fcjResponseDOM) 
         {
             //16891409 changes
			 if(selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP")){
                msgStatus = 'FAILURE';
             }else{
                msgStatus   =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
             }
             if (msgStatus == 'FAILURE') {
              var messageNode = selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
              var pureXMLDOM  = fnGetDataXMLFromFCJXML(fcjResponseDOM,1);
                    setDataXML(getXMLString(pureXMLDOM));
            showData();
                    isValidated="false";
              //var returnVal = displayResponse(messageNode,'FAILURE');//16891409 changes
			  var returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'E', "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");

             }
             else if (msgStatus == "WARNING" ||msgStatus == "SUCCESS" )       {
               var messageNode = selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
                var pureXMLDOM  = fnGetDataXMLFromFCJXML(fcjResponseDOM,1);
                    setDataXML(getXMLString(pureXMLDOM));
            showData();
             } 
                   
         }
          disableForm();
}
function fnProcess_KERNEL(){
	
	customAlertAction = "process";
        var prevgAction;
        var isValid = true;
                isValid = isValid & fnValidate_KERNEL();
                if (!isValid) {		
                         if (isValidated=="false"){
                                //var msg = buildMessage(gErrCodes);
                                fnEnableElement(document.getElementsByName("BTN_EXIT")[0]);
                                isValidated="false";
                                return false;
                                }
                        }
                        
        if(isValidated="true") {
			 mask();
			showAlerts(fnBuildAlertXML("", "I", mainWin.getItemDesc("LBL_INIT_DESC")), "C");
            //var ok = confirm("Validation is Successfull!! Do you want to Initiate the Process....?");
            }
        fnEnableElement(document.getElementsByName("BTN_EXIT")[0]); //9NT1428 - ITR1 - SFR#866
}
function fnCloseAlertWin_process() {
	
	/*alert(retrieveMessage('GI-PRS-013','')); 16891409 changes*/
    
    if (isValidated == "true") {
	  
	alertAction = "UNMASK";
	prevgAction=gAction;
	gAction='CUSTOM';
	appendData(document.getElementById("TBLPage" + strCurrentTabId));
	fcjRequestDOM = buildUBSXml();
	fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
	//16891409 changes start
	if(fcjResponseDOM) 
         {
            if(selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP")){
                msgStatus = 'FAILURE';
             }else{
                msgStatus   =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
             }
			 if(msgStatus == 'FAILURE') {
              var messageNode = selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
              var pureXMLDOM  = fnGetDataXMLFromFCJXML(fcjResponseDOM,1);
                    setDataXML(getXMLString(pureXMLDOM));
                showData();
                //var returnVal = displayResponse(messageNode,'FAILURE');
                var returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'E', "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
             }
             else if (msgStatus == "WARNING" ||msgStatus == "SUCCESS" ) {
               showAlerts(fnBuildAlertXML('GI-PRS-013',"I", ""), "I");
             } 
                   
         } //16891409 changes end	

    }
    //isValidated="true"
	gAction='';
	unmask();
	customAlertAction = "";//JCROFC_Minicore_Integration_Remediation_Fix2

}
//9NT1606_12_4_RETRO_12_0_2_26913072 starts
function fnExitAlertWin_process(event)
{	
	//Bug_34113318 starts
	gAction ="";
	fnExitAll('',event);
	//fnExit(event);
	//Bug_34113318 ends
}
//9NT1606_12_4_RETRO_12_0_2_26913072 ends
//starts JCROFC_Minicore_Integration_Bug#29865879
function fnFileMask_KERNEL() {
    if (document.getElementById("BLK_GITM_INTERFACE_TRIGGER__FILE_MASK").value == 'ALL') {
        fnEnableElement(document.getElementById("BLK_GITM_INTERFACE_TRIGGER__ALL_CHECK"));
        document.getElementById("BLK_GITM_INTERFACE_TRIGGER__FILE_NAME").value = ''; 
        fnDisableElement(document.getElementById("BLK_GITM_INTERFACE_TRIGGER__FILE_NAME")); 
        fnFilemaskALL_KERNEL();
    }
    else {
        fnDisableElement(document.getElementById("BLK_GITM_INTERFACE_TRIGGER__ALL_CHECK"));
        fnDisableElement(document.getElementById("BLK_GITM_INTERFACE_TRIGGER__ALL_FILE_NAME"));
    }

}
//Ends JCROFC_Minicore_Integration_Bug#29865879
//JCROFC_Minicore_Integration_Remediation_Fix2 STARTS
function fnFilemaskALL_KERNEL() {
    if (document.getElementById("BLK_GITM_INTERFACE_TRIGGER__ALL_CHECK").checked == true) {
        document.getElementById("BLK_GITM_INTERFACE_TRIGGER__ALL_FILE_NAME").value = '';
        fnDisableElement(document.getElementById("BLK_GITM_INTERFACE_TRIGGER__ALL_FILE_NAME"));
    }
    else {
        fnEnableElement(document.getElementById("BLK_GITM_INTERFACE_TRIGGER__ALL_FILE_NAME"));
    }

}
//JCROFC_Minicore_Integration_Remediation_Fix2 ENDS