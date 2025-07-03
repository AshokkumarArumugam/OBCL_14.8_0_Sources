/*----------------------------------------------------------------------------------------------------
**
** File Name    : EXTAUTHORIZE.js
**
** Module       : FCJWeb
**
** This source is part of the Oracle Flexcube Universal Banking
** Software System and is copyrighted by Oracle Financial Services Software Limited.

** All rights reserved.  No part of this work may be reproduced,
** stored in a retrieval system, adopted or transmitted in any form
** or by any means, electronic, mechanical, photographic, graphic,
** optic recording or otherwise, translated in any language or
** computer language, without the prior written permission  from Oracle Financial Services
** Software Limited.

** Oracle Financial Services Software Limited.,
** 10-11, SDF I, SEEPZ, Andheri (East),
** MUMBAI - 400 096.
** INDIA.

Copyright © 2004-2015  by Oracle Financial Services Software Limited..

**  Modified By          : Neethu Sreedharan
**  Modified On          : 28-Sep-2016
**  Modified Reason      : Changes done to alert the user to select all modifications during 
                           authorization if the record is tanked and not once authorized.
**  Retro Source         : 9NT1606_12_0_3_MCB_BANK_LTD 
**  Search String        : 9NT1606_12_2_RETRO_12_0_3_23656251

**  Modified By          : Rishabh Gupta
**  Modified On          : 29-Sep-2016
**  Modified Reason      : Changes done to select the corresponding row of the view changes button which the user has clicked.
**  Search String        : 12_0_2_RETRO_12_2_23655623
**  SFR No.				 : 23655623

**  Modified By          : Divyansh Sharma
**  Modified On          : 5th-Apr-2017
**  Modified Reason      : Changes done to remove unnecessary popup button coming in single field record view while
						   checking modifications in auth screen.
**  Search String        : 25673556
**  SFR No.				 : 25673556

**  Modified By          : Divyansh Sharma
**  Modified On          : 5th-Apr-2017
**  Modified Reason      : Changes done for the issue view changes button disabled and not highlighting the screen.
**  Search String        : 25673910
**  SFR No.				 : 25673910
**
**  Modified By          : Neethu Sreedharan
**  Modified On          : 17-Feb-2016
**  Modified Reason      : CHECKER REMARKS IS NOT GETTING UPDATED IN CHANGE LOG SCREEN 
**  Retro Source         : 9NT1606_12_1_BANK_AUDI
**  Search String        : 9NT1606_12_3_RETRO_12_1_25562058
**
**  Modified By          : Neethu Sreedharan
**  Modified On          : 10-Jul-2017 
**  Modified Reason      : Fix added to update checker remarks post authorization. 
**  Retro Source         : 9NT1606_12_2_BANK_MED_SAL	
**  Search String        : 9NT1606_12_4_RETRO_12_2_26229842
**
**  Modified By          : Ambika Selvaraj
**  Modified On          : 03-Jan-2018
**  Modified Reason      : Code changes done to get the field object by using fieldname "ONCEAUTH" 
                           and to enable delete button for tanking modifications
**  Search String        : 9NT1606_14_0_RETRO_12_2_27297039
**
**  Modified By          : Ambika Selvaraj
**  Modified On          : 15-Jun-2018
**  Modified Reason      : Fix provided to enable Maker Remarks field pop up edit button in Authorize 
                           screen
**  Search String        : 9NT1606_14_1_RETRO_12_3_28117930
**
**  Modified By          : Ambika Selvaraj
**  Modified On          : 15-Jun-2018
**  Modified Reason      : Fix provided to enable checker Remarks field pop up edit button in Authorize 
                           screen
**  Search String        : 9NT1606_14_1_RETRO_12_3_28118425 

**  Modified By          : Ambika Selvaraj
**  Modified On          : 20-Jun-2018
**  Modified Reason      : STDCIF- VIEW CHANGES BUTTON IS DISABLED WHEN NAVIGATING IN FIELDS CHANGES
**  Search String        : 9NT1606_14_1_RETRO_12_3_28118823

**      Modified By         : Yathish DC
**      Modified On         : 29-Jan-2021
**      Modified Reason     : Issue  : System is not populating the Account Closure Details tab and Audit Log details onclick of View Changes button during Authorization.
							  Reason : Action code is being passed as VIEWMNTLOG instead of VIEWCHGLOG resulting in fetching the record from cstb_msg_log which won't be updated upon accepting the Overrides, instead of fetching the record from sttb_record_log, hence resulting in the reported issue.
							  Fix 	 : Code changes are done to set gAction as VIEWCHGLOG, since the primary objective is to populate the data and highlight the changes.
**		Search String		: FCUBS_14.1_CNSL_MIZUHO_CORPORATE_BANK_SFR#32306229

**  Modified By          : Girish M
**  Modified On          : 07-Mar-2023
**  Modified Reason      : Redwood Fixes
**  Search String        : redwood_34048496, 
                           redwood_35105569
                           
**  Modified By          : Selvam
**  Modified On          : 19-Apr-2023
**  Modified Reason      : Redwood Fixes ,Auth label was shown for delete screen.
**  Search String        : REDWOOD_35284921 
**
**  Modified By          : Meenakshi K
**  Modified On          : 20-Apr-2023
**  Modified Reason      : Corrected the code as the accept button was disabled .
**  Search String        : 35250516_ODT_REDWOOD_CHANGES
----------------------------------------------------------------------------------------------------
*/

var ExecQ_RequestDOM ="";
var ExecQ_ResponseDOM="";
var FcjViewMntResDom ="";
var parentAction = "";
var deleteFlag = "Auth";

function fnPostLoad_CVS_AUTHORIZE(screenArgs) {   
     var label_auth=mainWin.getItemDesc("LBL_AUTHORIZED"); //Changes for Bug No:16321567 
     var label_unauth=mainWin.getItemDesc("LBL_UN_AUTH_FLG"); //Changes for Bug No:16321567 
     var label_rejected=mainWin.getItemDesc("LBL_REJECTED"); //Changes for Bug No:16321567 
    var flag = false;
    for (var i=0;i<dataSrcLocationArray.length;i++) {
        if (dataSrcLocationArray[i] == "BLK_AUDIT_LOG") {
            flag = true;
            break;
        }
    }
    if (!flag) {
        dataSrcLocationArray[dataSrcLocationArray.length] = "BLK_AUDIT_LOG";
        dataSrcLocationArray[dataSrcLocationArray.length] = "BLK_OVERRIDE_DETAILS"; 
        dataSrcLocationArray[dataSrcLocationArray.length] = "BLK_OVERRIDE_MASTER";              
        dataSrcLocationArray[dataSrcLocationArray.length] = "BLK_FIELD_LOG";
    }
    
    relationArray["BLK_AUDIT_LOG"] = dataSrcLocationArray[0]+"~N";
    relationArray['BLK_OVERRIDE_MASTER'] = "BLK_AUDIT_LOG~N"; 
    //relationArray['BLK_OVERRIDE_DETAILS'] = "BLK_OVERRIDE_MASTER~N"; 
    relationArray['BLK_OVERRIDE_DETAILS'] = "BLK_AUDIT_LOG~N"; 
    relationArray['BLK_FIELD_LOG'] = "BLK_AUDIT_LOG~N";
    //SVBFLDLOG End
	showDescendants("BLK_AUDIT_LOG");//#14184591 MakerOvd changes
    debugs("calling fnProcessAuthOnLoad", ""); 
    if(!fnProcessAuthOnLoad(screenArgs))
        return false;
        
    //FCUBS11.0- Extensible Maitanance Tanking Changes Start
    parentAction = screenArgs['PARENTACTION'];
    /*Fix for 17793806 basebug - 16045136 */
    /*if (gAction=="AUTHQUERY" || gAction=="CHANGELOG") { // Fix For 16227376
        if(document.getElementsByName("MODNO")[0].value == 1)
            document.getElementsByName("BTN_VIEW")[0].disabled = true;
        else
            document.getElementsByName("BTN_VIEW")[0].disabled = false;
    }*/
    /*Fix for 17793806 basebug -  16045136 */
   	
   // logging reqd flag N issue
   /*Fix for 19767144 starts*/
setTimeout(function () { //redwood_34048496
    if (getElementsByOjName("MODNO")[0].value == 1) { //REDWOOD_CHANGES
       // getElementsByOjName("BTN_VIEW")[0].disabled = true;	//REDWOOD_CHANGES
       getElementsByOjName("BTN_VIEW")[0].setAttribute('disabled',true);  //REDWOOD_CHANGES
    }/*Fix for 19767144 ends*/
   var divbtn = getElementsByOjName("BTN_VIEW")	//REDWOOD_CHANGES
   var num = divbtn.length;
        if(parent.loggingReqd=='N' || parent.loggingReqd =='') {
		for(i=0;i<num;i++){
       //getElementsByOjName("BTN_VIEW")[i].disabled = true;   	 //REDWOOD_CHANGES
       getElementsByOjName("BTN_VIEW")[i].setAttribute('disabled',true); //REDWOOD_CHANGES  
    }}
},100);
	// logging reqd flag N issue	 
//REDWOOD_CHANGES
   /* var l_length = getTableObjForBlock("BLK_AUDIT_LOG").tBodies[0].rows.length;  //REDWOOD_CHANGES
    for(i=0;i<l_length;i++){
        if (document.getElementsByName("AUTHSTAT")[i].value == "U") 
            document.getElementsByName("AUTHSTAT")[i].value = label_unauth; //Changes for Bug No:16321567 
        else if (document.getElementsByName("AUTHSTAT")[i].value == "A") 
            document.getElementsByName("AUTHSTAT")[i].value = label_auth; //Changes for Bug No:16321567
        else if (document.getElementsByName("AUTHSTAT")[i].value == "R") 
            document.getElementsByName("AUTHSTAT")[i].value = label_rejected; //Changes for Bug No:16321567 
    }
    */	   
//REDWOOD_CHANGES
    document.title=mainWin.getItemDesc("LBL_AUTHORIZE");	
    if(gAction=="CHANGELOG"){
         setInnerText(document.getElementsByTagName("H3")[0],mainWin.getItemDesc("LBL_VIEW")); //REDWOOD_35284921 
//REDWOOD_CHANGES
         //document.getElementsByName("BTN_OK")[0].disabled = true;
         //document.getElementsByName("BTN_REJECT")[0].disabled = true;
         getElementsByOjName("BTN_OK")[0].setAttribute('disabled',true); 
         getElementsByOjName("BTN_REJECT")[0].setAttribute('disabled',true); 
//REDWOOD_CHANGES
         deleteFlag="ViewLog";
    }
    if(gAction=="DELETEQUERY"){
          deleteFlag="Delete";
          setInnerText(document.getElementsByTagName("H3")[0],mainWin.getItemDesc("LBL_DELETE")); //REDWOOD_35284921 
//REDWOOD_CHANGES
         // document.getElementsByName("BTN_REJECT")[0].disabled = true;
          getElementsByOjName("BTN_REJECT")[0].setAttribute('disabled',true); 
          getTableObjForBlock("BLK_AUDIT_LOG").tBodies[0].rows[0].cells[0].children[0].checked=false;
          getTableObjForBlock("BLK_AUDIT_LOG").tBodies[0].rows[l_length-1].cells[0].children[0].checked=true;
//REDWOOD_CHANGES
    }
    //Fix for 16654235 Start
    /*if(gAction == "AUTHQUERY"){
        document.getElementById("BLK_OVERRIDE_MASTER__CHECKERREMARKSI").readOnly =false;
        document.getElementById("BLK_OVERRIDE_MASTER__CHECKERREMARKSI").className ='TXTstd';
    }*/
    //Fix for 16654235 End
    //FCUBS11.0- Extensible Maitanance Tanking Changes End
    /* HTML5 Changes 6/OCT/2016 Start*/
    //document.getElementById("BLK_AUDIT_LOGHeader_CHK_ME").className ='hidden';    //21033559
   // document.getElementById("BLK_AUDIT_LOGHeader_CHK_ME").parentNode.className=document.getElementById("BLK_AUDIT_LOGHeader_CHK_ME").parentNode.className+" LBLinv";//REDWOOD_CHANGES
    /* HTML5 Changes 6/OCT/2016 End*/
    remarksReq = screenArgs["remarksReq"];
    /*if(remarksReq=="N"){
        document.getElementById("BLK_OVERRIDE_MASTER__MAKEROVDREMARKS").className ='hidden';  
        document.getElementById("BLK_OVERRIDE_MASTER__CHECKERREMARKS").className ='hidden';  
        document.getElementById("dataContainer_BLK_OVERRIDE_DETAILS").className ='hidden';   		
    }*/
    
    document.getElementById('BTN_OK').label = mainWin.getItemDesc("LBL_ACCEPT");//REDWOOD_CHANGES
    
    debugs("calling showDescendants", ""); 
    showDescendants("BLK_AUDIT_LOG");
	//}
	//11.1 Remarks Changes - Ends Here
	// Fix for Bug 16700498 - start
	var warningDesc = getElementsByOjName("WDESC");//REDWOOD_CHANGES
	for(var i = 0; i < warningDesc.length; i++) {
		fnDisableElement(warningDesc[i]);
	}
	// Fix for Bug 16700498 - end
    //Fix for 16654235 starts
	//document.getElementById("BLK_OVERRIDE_MASTER__CHECKERREMARKSI").readOnly =true; //redwood_35105569
	//document.getElementById("BLK_OVERRIDE_MASTER__CHECKERREMARKSI").className ='TXTro'; //redwood_35105569	
         fnDisableElement(document.getElementById("BLK_OVERRIDE_MASTER__CHECKERREMARKSI")); //redwood_35105569	
    if(gAction == "AUTHQUERY"){
       // document.getElementById("BLK_OVERRIDE_MASTER__CHECKERREMARKSI").readOnly =false;//redwood_35105569	
        //document.getElementById("BLK_OVERRIDE_MASTER__CHECKERREMARKSI").className ='TXTstd';//redwood_35105569	
       fnEnableElement(document.getElementById("BLK_OVERRIDE_MASTER__CHECKERREMARKSI")); //redwood_35105569	
    }
	//Fix for 16654235 Ends
	//Fix for 14380846 -Hiding Reject Button for Non tanking FunnctionID
	tankModifications = screenArgs["tankModifications"];
	if (!(typeof (tankModifications) != "undefined" && tankModifications == "Y")){
		document.getElementsByName("BTN_REJECT")[0].className = "hidden";
	}
	//Fix for 14380846 -Hiding Reject Button for Non tanking FunnctionID
    fnSetExitButton();
    return true;    
}

function fnPreSave_CVS_AUTHORIZE() {
	//9NT1606_12_2_RETRO_12_0_3_23656251 starts	
//REDWOOD_CHANGES
	if (typeof (tankModifications) != "undefined" && tankModifications == "Y" && parent.getOnceAuth() == "N"){ //9NT1606_14_0_RETRO_12_2_27297039
        for(var i = 0; i < getTableObjForBlock("BLK_AUDIT_LOG").tBodies[0].rows.length; i++) {
            if(!getTableObjForBlock("BLK_AUDIT_LOG").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked){
//REDWOOD_CHANGES
                alert(mainWin.getItemDesc("LBL_TANKING_ONCEAUTH"));
                return false;
            }                           
        }
    }
   //9NT1606_12_2_RETRO_12_0_3_23656251 ends 
    //FCUBS11.0- Extensible Maitanance Tanking Changes
    gAction = parentAction;
    processingAction = "MaintAuth";
    fcjResponseDOM = getFcjAuthRes();
    //fcjResponseDOM = dlgArg.mainWin.loadXML("d:\\SuccessRes.xml");
    //goToRec(1);
    if (fcjResponseDOM == null)
            return false;
    /*if (fnProcessResponse() == "FAILURE") 
        return false;*/
    //11.1 Remarks Changes - Starts Here
    if(remarksReq == "Y"){
        checkerRemarks = document.getElementById("BLK_OVERRIDE_MASTER__CHECKERREMARKSI").value;        
    }
	if(typeof(parent.fieldNameArray) != "undefined"){ //fix for AUTH start
		for(var blkname in parent.fieldNameArray){
			fieldNameArray[blkname] = parent.fieldNameArray[blkname];
		}
	}//fix for AUTH end
	//11.1 Remarks Changes - Ends Here
    var msgStatus = fnProcessResponse();
    fnPostProcessResponse(msgStatus);     
}
//REDWOOD_CHANGES
function fnGetDetails(event) {
    fnMulipleEntryRow_onClick(event);
    setTimeout(function () {
    fnGetDetails_ojet(event);
   }, 0);
}

function fnGetDetails_ojet(event) 
//REDWOOD_CHANGES
{
	//fnMulipleEntryRow_onClick(event); //12_0_2_RETRO_12_2_23655623	//REDWOOD_CHANGES
    //inDate = setActionTime();//Performance Changes
    /*Fix for 16720375 and 16785057 starts*/
    var gPrevAction = gAction;
    preventpropagate(event);
    /*Fix for 16720375 and 16785057 Ends*/
   //FCUBS_14.1_CNSL_MIZUHO_CORPORATE_BANK_SFR#32306229 changes starts
   /*
   if(parentAction =="CHANGELOG")
        gAction = "VIEWCHGLOG";
    else
        gAction="VIEWMNTLOG";
   */
	gAction = "VIEWCHGLOG";
//FCUBS_14.1_CNSL_MIZUHO_CORPORATE_BANK_SFR#32306229 changes ends	
    var FcjViewMntReqDom = getFcjAuthReq(event);
	//Fix for 21626009
	/*if(getXMLString(FcjViewMntResDom) == ""){
		alert(mainWin.getItemDesc("LBL_EMPTY_RESPONSE"));
        return false;
	}
	//Fix for 25673910 This code is no longer required//
	*/
    parent.VIEWMAINT = "TRUE";
    parent.viewMntWinParams.FcjViewMntReqDom = FcjViewMntReqDom;
    parent.viewMntWinParams.action = gAction;
    mainWin.Authdom = FcjViewMntResDom;
    //fnpostAction(gAction, FcjViewMntResDom);
    mainWin.dispHref1(functionId, parent.seqNo, 'TRUE');
    gAction = gPrevAction; /*Fix for 16720375 and 16785057 */

}

/*Function For Viewing changes in maintainence screen before Authorize*/
function fnGetModNos(event)
{
    //var userId = dlgArg.mainWin.frames["Global"].UserId;
    var authRowsRef = getTableObjForBlock("BLK_AUDIT_LOG").tBodies[0].rows;//REDWOOD_CHANGES
    var authRowsRefLen = getOjTableRowsLength("BLK_AUDIT_LOG"); //authRowsRef.length;//35250516_ODT_REDWOOD_CHANGES
    var modCnt = 0;
    var isChecked;
    var currModNo =0;
    var currRow =0;
    var isValid = true;
    for (var rowIndex = 0; rowIndex < authRowsRefLen; rowIndex++)
    {
        isChecked = authRowsRef[rowIndex].cells[0].getElementsByTagName("INPUT")[0].checked;
        if (isChecked)
        {
            currRow = rowIndex;
            currModNo = authRowsRef[rowIndex].cells[1].getElementsByTagName("INPUT")[0].value;
            //FCUBS11.0- Extensible Maitanance Tanking Changes
            if(gAction=="DELETE")
                return currRow + "~" + currModNo;
        }
    }
    return currRow + "~" + currModNo;
}

function getFcjAuthRes(event) {
        //Selected mod no
    var l_det = fnGetModNos(event);
    var modNoPos = 0;
    rowIndex = l_det.split("~")[0];
    selectedMod = l_det.split("~")[1];
    if(selectedMod == 0){
        mask();
        showAlerts(fnBuildAlertXML('','I',mainWin.getItemDesc("LBL_NO_RECORDS_SEL")), 'I');
        alertAction = "MAINTAUTH_F";
        return null;
    }
	//9NT1606_12_3_RETRO_12_1_25562058 starts 
    //var FcjAuthReqDom = ExecQ_RequestDOM;
	var FcjAuthReqDom = loadXMLDoc(getXMLString(ExecQ_RequestDOM));
	//9NT1606_12_3_RETRO_12_1_25562058 ends
    var fnNode = selectSingleNode(FcjAuthReqDom, "//FN");
    var fvNode = selectSingleNode(FcjAuthReqDom, "//FV");
    
    var l_NewfvValue ="";
        
    var fvVals = getNodeText(fvNode).split("~");
    var fnVals = getNodeText(fnNode).split("~");
        
        for (var i=0;i<fnVals.length;i++) {
        
            if (fnVals[i] == "MODNO") {
                fvVals[i] = selectedMod;
            }
            
            l_NewfvValue = l_NewfvValue + fvVals[i] + "~";
    }
   
    //l_NewfvValue = "<![CDATA[" + l_NewfvValue + "]]>";
    
    //FcjViewMntReqDom.selectSingleNode("//FV").text = l_NewfvValue;
    var fvNode = selectSingleNode(FcjAuthReqDom, "//FV");
    selectSingleNode(FcjAuthReqDom, "//REC").removeChild(fvNode);
    
    var newFVNode = FcjAuthReqDom.createElement("FV");
    var cDataNode = FcjAuthReqDom.createCDATASection(l_NewfvValue);
    newFVNode.appendChild(cDataNode);
    selectSingleNode(FcjAuthReqDom, "//REC").appendChild(newFVNode);
    
    setNodeText(selectSingleNode(FcjAuthReqDom,"//ACTION"), gAction);
    if(remarksReq=="Y"){
         //setNodeText(FcjAuthReqDom.documentElement.childNodes[0].childNodes[15], document.getElementById("BLK_OVERRIDE_MASTER__CHECKERREMARKSI").value); //Fix for 17241562 //9NT1606_12_4_RETRO_12_2_26229842 commented 
		 setNodeText(FcjAuthReqDom.documentElement.childNodes[0].childNodes[16], document.getElementById("BLK_OVERRIDE_MASTER__CHECKERREMARKSI").value); //Fix for 17241562 //9NT1606_12_4_RETRO_12_2_26229842 added 
    }
	
    FcjAuthReqDom = fnPost(FcjAuthReqDom, servletURL, functionId);
    return FcjAuthReqDom;
}

function getFcjAuthReq(event) {
    var l_det = fnGetModNos(event);
    rowIndex = l_det.split("~")[0];
    selectedMod = l_det.split("~")[1];
    if(selectedMod == 0){
        mask();
        showAlerts(fnBuildAlertXML('','I',mainWin.getItemDesc("LBL_NO_RECORDS_SEL")), 'I');
        alertAction = "MAINTAUTH_F";
        return null;
    }
    var FcjAuthReqDom = loadXMLDoc(getXMLString(ExecQ_RequestDOM));
    
    var fnNode = selectSingleNode(FcjAuthReqDom, "//FN");
    var fvNode = selectSingleNode(FcjAuthReqDom, "//FV");
    
    var l_NewfvValue ="";
        
    var fvVals = getNodeText(fvNode).split("~");
    var fnVals = getNodeText(fnNode).split("~");
        
        for (var i=0;i<fnVals.length;i++) {
        
            if (fnVals[i] == "MODNO") {
                fvVals[i] = selectedMod;
            }
            
            l_NewfvValue = l_NewfvValue + fvVals[i] + "~";
    }
   
    //l_NewfvValue = "<![CDATA[" + l_NewfvValue + "]]>";
    
    //FcjViewMntReqDom.selectSingleNode("//FV").text = l_NewfvValue;
    var fvNode = selectSingleNode(FcjAuthReqDom, "//FV");
    selectSingleNode(FcjAuthReqDom, "//REC").removeChild(fvNode);
    
    var newFVNode = FcjAuthReqDom.createElement("FV");
    var cDataNode = FcjAuthReqDom.createCDATASection(l_NewfvValue);
    newFVNode.appendChild(cDataNode);
    selectSingleNode(FcjAuthReqDom, "//REC").appendChild(newFVNode);
    
    setNodeText(selectSingleNode(FcjAuthReqDom,"//ACTION"), gAction);
    if(remarksReq=="Y"){
         //setNodeText(FcjAuthReqDom.documentElement.childNodes[0].childNodes[15], document.getElementById("BLK_OVERRIDE_MASTER__CHECKERREMARKSI").value); //Fix for 17241562 //9NT1606_12_4_RETRO_12_2_26229842 commented 
         setNodeText(FcjAuthReqDom.documentElement.childNodes[0].childNodes[16], document.getElementById("BLK_OVERRIDE_MASTER__CHECKERREMARKSI").value); //Fix for 17241562 //9NT1606_12_4_RETRO_12_2_26229842 changes 
	}
    //View Changes Starts Here
    /*var fldNode = selectSingleNode(FcjAuthReqDom, "//FLD");
    if( fldNode!= null)
        selectSingleNode(FcjAuthReqDom, "//FCUBS_BODY").removeChild(fldNode);*/
    //View Changes Ends Here	
    //FcjAuthReqDom = fnPost(FcjAuthReqDom, servletURL, functionId);
    return FcjAuthReqDom;
}

function fnChangeColor()
{
    var l_TblObj = getTableObjForBlock("BLK_AUDIT_LOG"); //REDWOOD_CHANGES
    if (l_TblObj == null) return;
    var l_RowIdx = getRowIndex() - 1;
    var l_Rows = l_TblObj.tBodies[0].rows;
    for (var l_Cnt = 0; l_Cnt < l_Rows.length; l_Cnt++)
    {
        if (l_Cnt != l_RowIdx)
        {
            //l_Rows[l_Cnt].className = "";
            for (var l_Idx = 0; l_Idx < l_Rows[l_Cnt].cells.length; l_Idx++)
            {
                l_Rows[l_Cnt].cells[l_Idx].className = "TBODYTDMultiple"
            } //for
        } //if    

        if (l_Cnt == l_RowIdx)
        {
            //l_Rows[l_Cnt].className = "TDHighlightedSumRow";
            for (var l_Idx = 0; l_Idx < l_Rows[l_Cnt].cells.length; l_Idx++)
            {
                l_Rows[l_Cnt].cells[l_Idx].className = "TBODYTDMultipleHighlighted"
            } //for

        } //if  

    }
}

function fnPostShowDescendants(){
	fnEnableMEBlock("BLK_FIELD_LOG",false); //fix for 25673556 
    var index = dbIndexArray["BLK_AUDIT_LOG"]; 
//REDWOOD_CHANGES
    document.getElementById("BLK_OVERRIDE_MASTER__MAKER_REMARKS").value  =getTableObjForBlock("BLK_AUDIT_LOG").tBodies[0].rows[index-1].cells[12].children[0].children[0].value;
    document.getElementById("BLK_OVERRIDE_MASTER__FIRST_CHECKERREMARKS").value =getTableObjForBlock("BLK_AUDIT_LOG").tBodies[0].rows[index-1].cells[13].children[0].children[0].value;
    document.getElementById("BLK_OVERRIDE_MASTER__CHECKERREMARKSI").value =getTableObjForBlock("BLK_AUDIT_LOG").tBodies[0].rows[index-1].cells[14].children[0].children[0].value;    
//REDWOOD_CHANGES
	
    fnEnableElement(document.getElementById("BLK_OVERRIDE_MASTER__MAKER_REMARKS")); //9NT1606_14_1_RETRO_12_3_28117930
	fnEnableElement(document.getElementById("BLK_OVERRIDE_MASTER__CHECKERREMARKSI")); //9NT1606_14_1_RETRO_12_3_28118425
    if(gAction=="AUTHQUERY"){
		//document.getElementById("BLK_OVERRIDE_MASTER__CHECKERREMARKSI").readOnly =false;
		//document.getElementById("BLK_OVERRIDE_MASTER__CHECKERREMARKSI").className ='TXTstd';
                fnEnableElement(document.getElementById("BLK_OVERRIDE_MASTER__CHECKERREMARKSI")); //redwood_35105569	
	}else{ //Fix for 19536209
		//document.getElementById("BLK_OVERRIDE_MASTER__CHECKERREMARKSI").readOnly =true;
		//document.getElementById("BLK_OVERRIDE_MASTER__CHECKERREMARKSI").className ='TXTro';	
               fnDisableElement(document.getElementById("BLK_OVERRIDE_MASTER__CHECKERREMARKSI")); //redwood_35105569	
 
	}
	//changes for 24367821 starts
	var rows = getTableObjForBlock("BLK_OVERRIDE_DETAILS").tBodies[0].rows; //REDWOOD_CHANGES
	for (var i = 0; i < rows.length; i++) {
        fnDisableElement(getTableObjForBlock("BLK_OVERRIDE_DETAILS").tBodies[0].rows[i].cells[3].children[0].children[0]); //REDWOOD_CHANGES
    }
	//changes for 24367821 ends
}
function fnRejectAll(scrName, evnt){
    gAction = 'REJECT';
    processingAction = "RejectAuth";
    fcjResponseDOM = getFcjAuthRes();    
    var msgStatus = fnProcessResponse();
    fnPostProcessResponse(msgStatus);    
}

function fnupdateRemarks(){   
    var l = getTableObjForBlock("BLK_AUDIT_LOG").tBodies[0].rows.length; //REDWOOD_CHANGES
    for(var i =0;i<l;i++){
      //  document.getElementById("BLK_AUDIT_LOG").tBodies[0].rows[i].cells[9].children[0].value =document.getElementById("BLK_OVERRIDE_MASTER__CHECKERREMARKSI").value;   
      getTableObjForBlock("BLK_AUDIT_LOG").tBodies[0].rows[i].cells[14].children[0].children[0].value =document.getElementById("BLK_OVERRIDE_MASTER__CHECKERREMARKSI").value; /*Fix for 16720375 and 16785057 */ //REDWOOD_CHANGES
    }
}
//9NT1606_14_1_RETRO_12_3_28118823 ADDED NEW Function
function fnPostNavigate_BLK_FIELD_LOG_KERNEL() {	
//REDWOOD_CHANGES
	 if (getElementsByOjName("MODNO")[0].value == 1) {
        //document.getElementsByName("BTN_VIEW")[0].disabled = true;
         getElementsByOjName("BTN_VIEW")[0].setAttribute('disabled',true); 	 
//REDWOOD_CHANGES
    }
}
//9NT1606_14_1_RETRO_12_3_28118823 ADDED ENDS
