/***************************************************************************************************************************
 **  This source is part of the FLEXCUBE Software System and is copyrighted by
 **  Oracle Financial Services Software Limited.
 **
 **  All rights reserved.  No part of this work may be reproduced, stored in a retrieval system,
 **  adopted or transmitted in any form or by any means, electronic, mechanical, photographic,
 **  graphic, optic recording or otherwise, translated in any language or computer language,
 **  without the prior written permission of Oracle Financial Services Software Limited.
 **
 **  Oracle Corporation
 **  World Headquarters
 **  500 Oracle Parkway
 **  Redwood Shores, CA 94065
 **  U.S.A.
 **
 **  Copyright © 2008- 2012 by Oracle Financial Services Software Limited.
 **  Oracle Financial Services Software Limited.
 **
 **  Written by         :
 **  Date of creation   :
 **  File Name          : SVDCOSGN_KERNEL.js
 **  Purpose            :
 **  Called From        :
  
  Modified By           : Rishabh Gupta
  Modified On           : 21-Sept-2016
  Modified Reason       : Changes done to disable OK button if no signatures/image is maintained for
							the account Also if no record is maintained for the account, changes done to
							close the screen on alert.
  Search String         : 12_1_RETRO_12_2_23664399
  SFR No.               : 23664399
  
  Modified By           : Saurav
  Modified On           : 30-Aug-2017
  Modified Reason       : Information message is introduced for Signature Verification For FI customer on click of F12
  Search String         : FCUBS_12.5_Financial_Inclusion_changes
  
** Modified By         : Harish Kandriga
** Modified On         : 24-July-2019
** Modified Reason     : Signature verification happening on doing image view(F10).		
						 There was no code available to validate,whther the user is doing image view or signature view.
						 Code changes provided to confirm the signature verification done only on pressing OK on F12 window.
** Retro String        : FCUBS_121_PRASAC_30065013
** Search String       : 9NT1606_14_3_RETRO_12_1_30077599
**
** Modified By           : Venkatamohan K
** Modified On           : 16-Jun-2020
** Modified Reason       : EXCEPTION HANDLING IS NOT PRESENT FOR FNPOSTFOCUS_KERNEL IN SVDCOSGN_KERNEL.JS 
** Search String         : 9NT1606_14_4_RETRO_12_3_31467146
**
** Modified By           : hemlata garg
** Modified On           : 28-Jul-2020
** Modified Reason       : CUSTOMER SIGNATORY NAME IS NOT DISPLAYED IN CUSTOMER SEARCH TAB 
** Search String         : 31589259

  Modified By           : Arunkumar R	
  Modified On           : 31-MAY-2021
  Modified Reason       : Signature not displayed properly on Navigatiob
  Search String         : Fix for 32935810
  
  Modified By           : Suman	
  Modified On           : 19-MAY-2023
  Modified Reason       : Redwood changes
  Search String         : Redwood_changes
 ****************************************************************************************************************************/
//------------------------------------------------------------------------------
// VARIABLE DECLARATIONS
//------------------------------------------------------------------------------
var hz = 1;
var vt = 1;
var parentWin;
var strPath = 'TempForward.jsp?action=FCUBSSignatureServlet';
var currentPage = "";
var totalPage = "";
var okButtonDisabled = true;
var tabCount= 0;
var toAmount = 0;
var signImage;//9NT1606_14_3_RETRO_12_1_30077599
var imageTypeValue; //CP_Changes

function fnPaintCustomSignView_KERNEL(addlArgs) {  //F12 extensible
	if(typeof(addlArgs)!='undefined') {
	if(typeof( addlArgs['LOV_AMT'])=='undefined'){
		document.getElementById("TAB_SIGAMT").style.display="none";
		}
		else{
		document.getElementById('BLK_ACCOUNT_DETAILS__TO_AMT').value = addlArgs['LOV_AMT'];
		toAmount = addlArgs['LOV_AMT'];
		}
		
	}
}

function fnshowImage(e){

if(document.getElementById("BTN_OK").disabled == false)
	okButtonDisabled = false;
 var rowIndex = getRowIndex(e); 
//var cells = document.getElementById("BLK_AMT_GROUP").tBodies[0].rows[rowIndex - 1 ].cells;//Redwood_changes
var cells = getTableObjForBlock("BLK_AMT_GROUP").tBodies[0].rows[rowIndex - 1 ].cells;//Redwood_changes
	for(var i=0; i<cells.length; i++){
		if(typeof(cells[i].children[0].children[1])!= 'undefined') {
				if(typeof(cells[i].children[0].children[1])!='undefined' && cells[i].children[0].children[1].name == "GROUP_ID") {
					var grpId = cells[i].children[0].children[1].value;
					document.getElementById('BLK_ACCOUNT_DETAILS__GROUP_ID').value = grpId;
					//alert(grpId);
					break;
				}
		}
	}
	parentWinParams = new Object();
	parentWinParams.accNo = document.getElementById('BLK_ACCOUNT_DETAILS__CUST_ACC').value;
    parentWinParams.brn = document.getElementById('BLK_ACCOUNT_DETAILS__BRANCH').value ;
    parentWinParams.imgType = 'S';
	parentWinParams.grpId = document.getElementById('BLK_ACCOUNT_DETAILS__GROUP_ID').value;
	
	var addlArgs = new Array();
    fnEventsHandler('fnPreCustomSignViewF12',addlArgs) ;
		var cnt = 0;
        for (var i in addlArgs) {
			cnt++;
        }
        if (cnt > 0)
			parentWinParams.addlArgs = addlArgs;
        mainWin.dispHref1("SVDCOSGN", seqNo);
	
}

function fnInTab_TAB_SIGAMT_KERNEL() {

    gAction = "EXECUTEQUERY";
    fnExecuteQuery();    
}
var isPostLoadDone = false;
function fnPostLoad_KERNEL() {
    if (parentSeqNo != "" && parentSeqNo != "null") {
        //var parentWin = "";
        for (var i = 0;i < mainWin.arrChildWindows.length;i++) {
            if (mainWin.arrChildWindows[i].id == parentSeqNo) {
                parentWin = mainWin.arrChildWindows[i].children[0].contentWindow;
                break;
            }
        }
if(mainWin.parentWinParams.CDBHY == 'Y')  parentWin = mainWin; //Fix for 31589259
    
        var brn = parentWin.parentWinParams.brn;
        var accNo = parentWin.parentWinParams.accNo;
        var imgType = parentWin.parentWinParams.imgType;
		var ccy=parentWin.parentWinParams.ccy; 
		
		fnEventsHandler('fnPaintCustomSignView',parentWin.parentWinParams.addlArgs) ;     //F12 extensible
		
		
		if((typeof(parentWin.parentWinParams.grpId)!= "undefined") || document.getElementById('BLK_ACCOUNT_DETAILS__TO_AMT').value=="" || imgType != 'S') {
			document.getElementById('BLK_ACCOUNT_DETAILS__GROUP_ID').value = parentWin.parentWinParams.grpId;
			//disableTabs("TAB_MAIN"); Bug_36924146 Changes
			  hideTabs("TAB_MAIN"); //Bug_36924146 Changes
		}
		if(mainWin.brnHostLinkStatus=='OFFLINE' && document.getElementById('BLK_ACCOUNT_DETAILS__TO_AMT').value != ""){
				document.getElementById('BLK_ACCOUNT_DETAILS__LOV_ID').value="LOV_SIG_AMT_OFFLINE";
			}
			else{
				document.getElementById('BLK_ACCOUNT_DETAILS__LOV_ID').value="LOV_SIG_OFFLINE"; //21505318 
				if(document.getElementById('BLK_ACCOUNT_DETAILS__TO_AMT').value == ""|| document.getElementById('BLK_ACCOUNT_DETAILS__TO_AMT').value == null) {//21800342  //Bug_36924146 Changes Added null check
					//disableTabs("TAB_MAIN"); Bug_36924146 Changes
					hideTabs("TAB_MAIN"); //Bug_36924146 Changes
				}
			}
			
			if(typeof(parentWin.parentWinParams.grpId)!= "undefined" && parentWin.parentWinParams.grpId != "") {
				document.getElementById('BLK_ACCOUNT_DETAILS__LOV_ID').value="LOV_GRPSIG_OFFLINE";
			}
			
			if(typeof(parentWin.parentWinParams.grpId)== "undefined" ){
			document.getElementById('BLK_ACCOUNT_DETAILS__GROUP_ID').value = "";
			}
		
		//document.getElementById('BLK_ACCOUNT_DETAILS__LOV_ID').value="LOV_SIG_OFFLINE"; //21505318 
        document.getElementById('BLK_ACCOUNT_DETAILS__BRANCH').value = brn;
        document.getElementById('BLK_ACCOUNT_DETAILS__CUST_ACC').value = accNo;
        document.getElementById('BLK_ACCOUNT_DETAILS__IMAGE_TYPE').value = imgType;
		signImage = imgType;//9NT1606_14_3_RETRO_12_1_30077599
		if(typeof(parentWin.parentWinParams.ccy)!= "undefined" && parentWin.parentWinParams.ccy != "") {
		document.getElementById('BLK_ACCOUNT_DETAILS__ACC_CCY').value = ccy;
		}
		

		
		if(typeof(parentWin.parentWinParams.grpId)!= "undefined"  || document.getElementById('BLK_ACCOUNT_DETAILS__TO_AMT').value=="" || document.getElementById('BLK_ACCOUNT_DETAILS__TO_AMT').value == null || imgType != 'S' ) { //Bug_36924146 Changes Added null check
			expandcontent('TAB_MAIN_1');
         }
		createDOM(dbStrRootTableName);
        gAction = "EXECUTEQUERY";
        fnExecuteQuery();
	//12.1.1_Decentralised Changes added starts
		if(mainWin.brnHostLinkStatus=='OFFLINE' && selectSingleNode(fcjResponseDOM, "//ERROR") != null){				
			var errorCodeMsg = getNodeText(selectSingleNode(fcjResponseDOM, "//ERROR"));
			if(errorCodeMsg != null && errorCodeMsg.indexOf('OF-4088') > -1){ //22467398 Other error messages should be treated in the same way as that of Online
        mask();
            var message = errorCodeMsg.substr(0,errorCodeMsg.indexOf(' ')); 
			var errCode = errorCodeMsg.substr(errorCodeMsg.indexOf(' ')+1);
            var alertResp = "<FCUBS_ERROR_RESP>";
                alertResp = alertResp + "<ERROR><ECODE>";
                alertResp = alertResp + message;
                alertResp = alertResp + "</ECODE><EDESC>";
                alertResp = alertResp + errCode;
                alertResp = alertResp + "</EDESC></ERROR>";
				alertResp = alertResp + "</FCUBS_ERROR_RESP>";
				customAlertAction = "CLOSESIGWIN";
				showBranchAlerts(alertResp, 'E');
				return;
				}
            }
	    //12.1.1_Decentralised Changes ends
		//FCUBS_12.5_Financial_Inclusion_changes STARTS
		if(selectSingleNode(fcjResponseDOM, "//WARNING") != null){		
			errorCodeMsg = getNodeText(selectSingleNode(fcjResponseDOM, "//WARNING"));
			if(errorCodeMsg != null && errorCodeMsg.indexOf('ST-SIG-001') > -1){ 
              //mask();
            message = errorCodeMsg.substr(0,errorCodeMsg.indexOf(' ')); 
			errCode = errorCodeMsg.substr(errorCodeMsg.indexOf(' ')+1);
            alertResp = "<FCUBS_WARNING_RESP>";
                alertResp = alertResp + "<WARNING><WCODE>";
                alertResp = alertResp + 'ST-SIG-001';
                alertResp = alertResp + "</WCODE><WDESC>";
                alertResp = alertResp + 'Signature verification is not applicable for Financial Inclusion Customers ';
                alertResp = alertResp + "</WDESC></WARNING>";
				alertResp = alertResp + "</FCUBS_WARNING_RESP>";
				customAlertAction = "CLOSESIGWIN";
				//document.getElementById("BTN_OK").disabled = false; 
				showBranchAlerts(alertResp, 'I');				
				return;
				}
				}
		//FCUBS_12.5_Financial_Inclusion_changes ENDS
		
		//12_1_RETRO_12_2_23664399 Starts
		if(selectSingleNode(fcjResponseDOM, "//ERROR") != null){
			customAlertAction = "CLOSESIGWIN";
		}
		//12_1_RETRO_12_2_23664399 Ends
        gAction = "";
		isPostLoadDone = true;
		fnEnableMEBlock('BLK_SIGNATURE_DETAILS', false);
		//disableMESVFields('BLK_SIGNATURE');
		//var eleArray = new Array("INPUT", "SELECT", "TEXTAREA", "BUTTON"); //21814655 
		//var fldSetElem = document.getElementsByTagName("fieldset"); //21814655 
		//disableMESVBlockFields(eleArray, fldSetElem[5]) ;   //21814655 
	    fnEnableSignButtons();
			//Fix for 22530929 
            if((document.getElementById('BLK_ACCOUNT_DETAILS__GROUP_ID').value== "" || document.getElementById('BLK_ACCOUNT_DETAILS__GROUP_ID').value == "undefined" ) && selectSingleNode(dbDataDOM, "//BLK_SIGNATURE_DETAILS[@ID=1]")){
               document.getElementById("BTN_OK").disabled = false;  
            }
		
    }
	showToolbar("", "", "");
	if(mainWin.brnHostLinkStatus=='OFFLINE'){
		document.getElementById("DIVSubSystem").children[0].children[1].style.display="none";  // all image should not display for offline
	}
	
    return true;
}
function fnPostRow_onClick_BLK_AMT_SIG_KERNEL() {
fnEnableSignButtons();
}
//12.1.1_Decentralised Changes starts
function fnCloseAlertWin_CLOSESIGWIN(event){
	gAction = "";
	fnExitAll('', event);
}
//12.1.1_Decentralised Changes ends
function fnEnableSignButtons(){
    //var tableRef = document.getElementById("BLK_AMT_GROUP");//Redwood_changes
	var tableRef = getTableObjForBlock("BLK_AMT_GROUP");//Redwood_changes
    var rows = tableRef.tBodies[0].rows;
    for(var i=0;i<rows.length;i++){
       //document.getElementsByName("BTN_IMAGE_VIEW")[i].disabled = false;//Redwood_changes
	   getElementsByOjName("BTN_IMAGE_VIEW")[i].disabled = false;//Redwood_changes
    }
}

function fnPostExecuteQuery_KERNEL() {
    gAction = "LOADFULLDOM";
    fnBuildFullDOM();
   fnRestrictResponse();
   fnDisplaySignature();
   //fnCalcCustSignViewHgt();
	fnEnableMEBlock('BLK_SIGNATURE_DETAILS', false);
	disableMESVFields('BLK_SIGNATURE');
	showToolbar("", "", "");
	


}

function fnDisplaySignature() {
    if(tabCount == 1 ){
    var fldset = document.getElementById('TAB_MAIN_1__SEC_3__PAR1__FST_IMGFLDSET');
	                                     //fldset.innerHTML = "";
    var custRecNode = selectSingleNode(dbDataDOM, "//BLK_SIGNATURE_DETAILS[@ID=1]");
    if (custRecNode != null && selectSingleNode(custRecNode, "//BLK_SIGNATURE") != null) {
        var signRecNode = selectSingleNode(custRecNode, "//BLK_SIGNATURE[@ID=1]");
        var zoomin = mainWin.getItemDesc("LBL_ZOOMIN");
        var zoomout = mainWin.getItemDesc("LBL_ZOOMOUT");
        var rcwise = mainWin.getItemDesc("LBL_RCWISE");
        var racwise = mainWin.getItemDesc("LBL_RACWISE");
        var horiz = mainWin.getItemDesc("LBL_HORIZONTAL");
        var vert = mainWin.getItemDesc("LBL_VERTICAL");
		var custsig= mainWin.getItemDesc("LBL_CUSTOMER_SIGN_VIEW");

        var imageHTML = '<div class="widgetonecontainer" style="width:99%" id="dataEntryDiv_SIGNATURE" role="group" aria-labelledby="dataEntryDiv">';
        imageHTML += '<div class="DIVpage" style="width:99.4%"><span class="DIVpageH">&nbsp;&nbsp;</span><span class="SPNpageH">';
        imageHTML += '<input id="rotateAngle" value="0" type="hidden">';
        imageHTML += '<input id="hz" value="1" type="hidden">';
        imageHTML += '<input id="vt" value="1" type="hidden">';
        imageHTML += '<button class="BTNicon2" title="' + zoomin + '" name="incSize"  id="incSize" onClick="enlargeImage(\'IMAGEDISPLAY\');"><span tabindex="-1" class="ICOzoomin"><span class="LBLinv">' + zoomin + '</span></span></button>';
        imageHTML += '<button class="BTNicon2" title="' + zoomout + '" name="decSize"  id="decSize" onClick="dropImage(\'IMAGEDISPLAY\');"><span tabindex="-1" class="ICOzoomout"><span class="LBLinv">' + zoomout + '</span></span></button>';
        imageHTML += '<button class="BTNicon2" title="' + rcwise + '" name="rotate"  id="rotatec" onClick="fnCrotate(\'IMAGEDISPLAY\');" ><span tabindex="-1" class="ICOrotateclk"><span class="LBLinv">' + rcwise + '</span></span></button>';
        imageHTML += '<button class="BTNicon2" title="' + racwise + '" name="rotate"  id="rotatea" onClick="fnArotate(\'IMAGEDISPLAY\');" ><span tabindex="-1" class="ICOrotateanticlk"><span class="LBLinv">' + racwise + '</span></span></button>';
        imageHTML += '<button class="BTNicon2" title="' + horiz + '" name="flipH"  id="flipH" onClick="fnFlipH(\'IMAGEDISPLAY\');"><span tabindex="-1" class="ICOfliph"><span class="LBLinv">' + horiz + '</span></span></button>';
        imageHTML += '<button class="BTNicon2" title="' + vert + '" name="flipV"  id="flipV" onClick="fnFlipV(\'IMAGEDISPLAY\');"><span tabindex="-1" class="ICOflipv"><span class="LBLinv">' + vert + '</span></span></button></span></div>';
        imageHTML += '<div class="DIVText" id="IMAGEDIV"> <iframe height="300px" width="100%" class="IMGButton" id="IMAGEDISPLAY" onload = "fnSetInit(event);" style="border:2px solid #cccccc;min-height:11em;width:100%;overflow:auto; src="" alt="No image" title= "'+custsig+'"></iframe><INPUT TYPE=\'HIDDEN\'ID=\'X-CSRFTOKEN\'  NAME=\'X-CSRFTOKEN\'   class=\'hidden\'><canvas id="canvas"  style="overflow:auto;display:none;height:300px; width:100%;"></canvas>';//21624301
        if (navigator.userAgent.indexOf("MSIE ") !=  - 1) {
            imageHTML += '<style>.IMGButton{cursor: default; FILTER: progid:DXImageTransform.Microsoft.Matrix(sizingmethod=\'auto expand\') flipv flipv fliph fliph }</style>';
        }
        imageHTML += '<LABEL class="LABELNormal" for=""></LABEL>';
        imageHTML += '</div></div>';
        fldset.innerHTML = fldset.innerHTML + imageHTML;
        document.getElementById("X-CSRFTOKEN").value = mainWin.CSRFtoken;
        document.getElementById("IMAGEDISPLAY").src = strPath + '&fileName=' + getNodeText(selectSingleNode(signRecNode, "FILE_TYPE")) + '&actionType=READ';
        dbIndexArray['BLK_SIGNATURE_DETAILS'] = 1;
		dbIndexArray['BLK_SIGNATURE'] = 1;//Fix for 21515423
        showData();

        if (selectNodes(custRecNode, "BLK_SIGNATURE")) {
            setInnerText(document.getElementById("TotPageSV__BLK_SIGNATURE"), selectNodes(custRecNode, "BLK_SIGNATURE").length);
        }
        fnUpdateSEPgBtn("BLK_SIGNATURE");
		fldset = "" ;
    }
}
return true;
}

/*function fnPostShowDescendants_BLK_AMT_GROUP_KERNEL(arg) {
if(okButtonDisabled)
        document.getElementById("BTN_OK").disabled = true;  
else
        document.getElementById("BTN_OK").disabled = false;  
            
}
*/
function fnPostFocus_KERNEL() {
    showToolbar("", "", "");
	//12_1_RETRO_12_2_23664399 Starts
/*if(typeof(document.getElementById('BLK_ACCOUNT_DETAILS__GROUP_ID'))== "undefined" || document.getElementById('BLK_ACCOUNT_DETAILS__GROUP_ID').value== "" ){
               document.getElementById("BTN_OK").disabled = false;  
            }*/
   try{ //9NT1606_14_4_RETRO_12_3_31467146
    if((document.getElementById('BLK_ACCOUNT_DETAILS__GROUP_ID').value== "" || document.getElementById('BLK_ACCOUNT_DETAILS__GROUP_ID').value == "undefined" ) && selectSingleNode(dbDataDOM, "//BLK_SIGNATURE_DETAILS[@ID=1]")){
	   document.getElementById("BTN_OK").disabled = false;  
	}else{
	   document.getElementById("BTN_OK").disabled = true;  
	}
     }
	catch(e){}   //9NT1606_14_4_RETRO_12_3_31467146
	//12_1_RETRO_12_2_23664399 Ends
        return true;  //9NT1606_14_4_RETRO_12_3_31467146
}

function fnSetInit(event) {
    angle = 0;
    deg2rad = Math.PI / 180;
    var myIFrame = document.getElementById('IMAGEDISPLAY');
	 addEvent(myIFrame.contentWindow.document.documentElement, "lang", langISOMap);
    if (myIFrame.contentWindow.document.getElementsByTagName("IMG").length  > 0) {
        var imgTagObj = myIFrame.contentWindow.document.getElementsByTagName("IMG")[0];
		imgTagObj.setAttribute("id", "uploadImg");
        if (navigator.userAgent.indexOf("MSIE ") ==  - 1 || (navigator.userAgent.indexOf("Trident") ==  - 1 && navigator.userAgent.indexOf("rv") ==  - 1)) {//Fix for 21515423
            //ie11 changes               
            img = document.getElementById('IMAGEDISPLAY');
            imgh = document.getElementById('IMAGEDISPLAY').height;
            objCanvas = document.getElementById('canvas');
            if (objCanvas!= null && (objCanvas || objCanvas.getContext)) {
                objCanvas.style.display = 'none';
            }
            else {
                //imgTagObj.style.visibility = 'hidden';//Fix for 21515423
            }
        }
        else {
            /*fnCrotate();
            fnFlipH();
            fnFlipV();
            document.getElementById("IMAGEDIV").innerHTML = "<LABEL class=LABELNormal for=\"\"></LABEL><iframe id=IMAGEDISPLAY style=\"overflow:hidden\"  scrolling=\"NO\" onload=\"this.style.height=IMAGEDISPLAY.document.body.scrollHeight + 5;this.style.width=IMAGEDISPLAY.document.body.scrollWidth + 5;\" frameborder=\'0\' NAME=\"IMAGEDISPLAY\" SRC=\"\"> "*/

        }
    }
}

function getUploadImageObj() {
    imgIFrame = document.getElementById('IMAGEDISPLAY');
	
	if (navigator.userAgent.indexOf("MSIE ") ==  - 1 || (navigator.userAgent.indexOf("Trident") ==  - 1 && navigator.userAgent.indexOf("rv") ==  - 1)) {
            //ie11 changes               
 			if(objCanvas!=null && (objCanvas || objCanvas.getContext)){
            objCanvas.style.display = "none";
			}
		}//Fix for 21534763
    if (imgIFrame.contentWindow.document.getElementsByTagName("IMG").length > 0) {
        var imgObj = imgIFrame.contentWindow.document.getElementsByTagName("IMG")[0];
        imgObj.setAttribute("id", "uploadImg");
    }
    uploadedImgObj = imgIFrame.contentWindow.document.getElementById("uploadImg");
}

function enlargeImage() {
    getUploadImageObj();
    document.getElementById("IMAGEDISPLAY").style.display = '';
    uploadedImgObj.style.display = '';
    if (navigator.userAgent.indexOf("Opera") !=  - 1) {
      //  alert(mainWin.getItemDesc("LBL_NSUPPORT"))
        return;
    }
    if (navigator.userAgent.indexOf("MSIE ") ==  - 1 || (navigator.userAgent.indexOf("Trident") ==  - 1 && navigator.userAgent.indexOf("rv") ==  - 1)) {//Fix for 21534763
        //ie11 changes 
        objCanvas = document.getElementById('canvas');
        document.getElementById("IMAGEDISPLAY").className = "IMGBUTTON";
        objCanvas.style.display = 'none';//Fix for 21534763
    }
    if (uploadedImgObj.height < 1000) {
        if (navigator.userAgent.indexOf("MSIE ") ==  - 1 || (navigator.userAgent.indexOf("Trident") ==  - 1 && navigator.userAgent.indexOf("rv") ==  - 1)) {//Fix for 21534763
            //ie11 changes
            uploadedImgObj.width = uploadedImgObj.width + 100;
            document.getElementById("IMAGEDISPLAY").width = document.getElementById("IMAGEDISPLAY").width + 100;
        }
        uploadedImgObj.height = parseInt(uploadedImgObj.height) + 100;
        document.getElementById("decSize").disabled = false;
    }
    else {
        document.getElementById("incSize").disabled = true;
    }
}

function dropImage() {
    getUploadImageObj();
    document.getElementById("IMAGEDISPLAY").style.display = '';
    uploadedImgObj.style.display = '';
    if (navigator.userAgent.indexOf("Opera") !=  - 1) {
      //  alert(mainWin.getItemDesc("LBL_NSUPPORT"))
        return;
    }
    if (navigator.userAgent.indexOf("MSIE ") ==  - 1 || (navigator.userAgent.indexOf("Trident") ==  - 1 && navigator.userAgent.indexOf("rv") ==  - 1)) {//Fix for 21534763
        //ie11 changes  
        objCanvas = document.getElementById('canvas');
        document.getElementById("IMAGEDISPLAY").className = "IMGBUTTON";
       objCanvas.style.display = 'none';////Fix for 21534763
    }
    if (uploadedImgObj.height > 100) {
        uploadedImgObj.height = uploadedImgObj.height - 100;
        if (navigator.userAgent.indexOf("MSIE ") ==  - 1 || (navigator.userAgent.indexOf("Trident") ==  - 1 && navigator.userAgent.indexOf("rv") ==  - 1)) {//Fix for 21534763
            //ie11 changes 
            uploadedImgObj.width = uploadedImgObj.width - 100;
        }
        document.getElementById("incSize").disabled = false;
    }
    else {
        document.getElementById("decSize").disabled = true;
    }
}

function fnCrotate() {
    angle += 90;
    if (angle > 359) {
        angle = 0;
    }
    SetRotation(angle);
}

function fnArotate() {
    angle -= 90;
    if (angle < 0) {
        angle = 360;
    }
    SetRotation(angle);
}

function fnFlipH() {
    getUploadImageObj();
    if (navigator.userAgent.indexOf("Opera") !=  - 1) {
      //  alert(mainWin.getItemDesc("LBL_NSUPPORT"))
        return;
    }
    fnFlipHorizontal(uploadedImgObj);
}

function fnFlipV() {
    getUploadImageObj();
    if (navigator.userAgent.indexOf("Opera") !=  - 1) {
      //  alert(mainWin.getItemDesc("LBL_NSUPPORT"));
        return;
    }

    fnFlipVerticalal(uploadedImgObj);
}

function SetRotation(deg) {
    getUploadImageObj();
    uploadedImgObj.style.filter = "progid:DXImageTransform.Microsoft.Matrix(M11='1.0', sizingmethod='auto expand')";
    if (navigator.userAgent.indexOf("Opera") !=  - 1) {
      //  alert(mainWin.getItemDesc("LBL_NSUPPORT"))
        return;
    }
    fnRotateImage(uploadedImgObj, deg);
}

function fnShowLaunchForm(a, b, launchFormName) {
    if (launchFormName == 'SVDCONVW') {
        if (typeof (seqNo) != "undefined") {
            parentWinParams = new Object();
			if(typeof(b)!= 'undefined' && b=='GROUPSEARCH') {
				parentWinParams.brn = document.getElementById("BLK_ACCOUNT_DETAILS__BRANCH").value;
				parentWinParams.acc = document.getElementById("BLK_ACCOUNT_DETAILS__CUST_ACC").value;
				parentWinParams.grpId = document.getElementById("BLK_ACCOUNT_DETAILS__GROUP_ID").value;
				parentWinParams.ccy = document.getElementById("BLK_ACCOUNT_DETAILS__ACC_CCY").value;
				parentWinParams.grpSearch = true;
			}else {
			   
				parentWinParams.brn = document.getElementById("BLK_ACCOUNT_DETAILS__BRANCH").value;
				parentWinParams.acc = document.getElementById("BLK_ACCOUNT_DETAILS__CUST_ACC").value;
				parentWinParams.adesc = document.getElementById("BLK_ACCOUNT_DETAILS__ACC_DESC").value;
				parentWinParams.ccy = document.getElementById("BLK_ACCOUNT_DETAILS__ACC_CCY").value;
				parentWinParams.sigid = '';
				var custValues = "";
			    var sigValues = "";
				parentWinParams.pageLength = "1";
				if(dbDataDOM != null) {
					var signDetails = selectNodes(dbDataDOM, "//BLK_SIGNATURE_DETAILS");
					if(signDetails != null) {
					for (var i = 0;i < signDetails.length;i++ ) {
					//if (i != document.getElementsByName('SIGN_ID').length - 1){//Redwood_changes
					if (i != getElementsByOjName('SIGN_ID').length - 1){//Redwood_changes
						sigValues = sigValues +  getNodeText(selectSingleNode(signDetails[i], "SIGN_ID")) +"~";
						custValues = custValues + getNodeText(selectSingleNode(signDetails[i], "CUST_ID")) +"~";
						}
						else
						{
						sigValues = sigValues +  getNodeText(selectSingleNode(signDetails[i], "SIGN_ID"));
						custValues = custValues + getNodeText(selectSingleNode(signDetails[i], "CUST_ID"));
						}
						
					}
					parentWinParams.pageLength = signDetails.length;
				}
			}
			     parentWinParams.custno = custValues;		
			     parentWinParams.sigid  = sigValues;	
				/*for (i = 0;i < document.getElementsByName('SIGN_ID').length;i++) {
					if (i != document.getElementsByName('SIGN_ID').length - 1)
						parentWinParams.sigid += document.getElementsByName('SIGN_ID')[i].value + "~";
					else 
						parentWinParams.sigid += document.getElementsByName('SIGN_ID')[i].value;
				}*/
				
				parentWinParams.imageType = document.getElementById("BLK_SIGNATURE__IMG_TYPE").value;
			}
        mainWin.dispHref1("SVDCONVW", seqNo);
        }
    }
    else {
        var brn = document.getElementById('BLK_ACCOUNT_DETAILS__BRANCH').value;
        var accNo = document.getElementById('BLK_ACCOUNT_DETAILS__CUST_ACC').value;
        fndispNotepadDet(accNo, 'CUST_ACC', '', brn);
    }
}

function uncheckOtherChkBoxes(currRowNum) {
    //var chkBoxes = document.getElementsByName("chkDeleteRow");//Redwood_changes
	var chkBoxes = getElementsByOjName("chkDeleteRow");//Redwood_changes
    for (var i = 0;i < chkBoxes.length;++i) {
        if (chkBoxes[i].parentNode.parentNode.rowIndex != currRowNum) {
            chkBoxes[i].checked = false;
        }
    }
}

function fnPreShowDescendants_BLK_SIGNATURE_DETAILS_KERNEL() {
    setInnerText(document.getElementById("CurrPageSV__BLK_SIGNATURE"), 1);
}

function fnPostShowDescendants_BLK_SIGNATURE_DETAILS_KERNEL(evnt) {
    var e = window.event || evnt;
    var chkBoxEle = getEventSourceElement(e);
    var dbt = chkBoxEle.parentDBT;
    /*Multiple signature changes Start*/
    var rowNum;
    var trElement = chkBoxEle;
    while (trElement.tagName != "TR") {
        trElement = trElement.parentNode;
    }
	//Fix for 32935810 Starts
    //rowNum = trElement.rowIndex + 1;
	rowNum = dbIndexArray['BLK_SIGNATURE_DETAILS'] ;
	//Fix for 32935810 Ends
    showAccountDet(dbt, rowNum, e);
    uncheckOtherChkBoxes(rowNum);
    chkBoxEle.checked = true;
    if (selectNodes(dbDataDOM, "//BLK_SIGNATURE_DETAILS[@ID=" + rowNum + "]/BLK_SIGNATURE")) {
        setInnerText(document.getElementById("TotPageSV__BLK_SIGNATURE"), selectNodes(dbDataDOM, "//BLK_SIGNATURE_DETAILS[@ID=" + rowNum + "]/BLK_SIGNATURE").length);
    }
    fnUpdateSEPgBtn("BLK_SIGNATURE");
	if(document.getElementById('BLK_ACCOUNT_DETAILS__GROUP_ID').value == "undefined" || document.getElementById('BLK_ACCOUNT_DETAILS__GROUP_ID').value== "" ){
               document.getElementById("BTN_OK").disabled = false;  
            }
	var eleArray = new Array("INPUT", "SELECT", "TEXTAREA");
	var fldSetElem = document.getElementsByTagName("fieldset");
	disableMESVBlockFields(eleArray, fldSetElem[5]) ;
}

function showAccountDet(dbt, rowNum, e) {
    var accRecNode = selectNodes(dbDataDOM, "//BLK_SIGNATURE")[rowNum - 1];
    var signRecNode = selectSingleNode(dbDataDOM, "//BLK_SIGNATURE_DETAILS[@ID=" + rowNum + "]");
    if (signRecNode) {
        acRecNum = rowNum
        document.getElementById("BLK_SIGNATURE__SPECIMAN_NOI").value = 1;
        var signNode = selectSingleNode(signRecNode, "BLK_SIGNATURE[SPECIMAN_NO=1]");
        document.getElementById("BLK_SIGNATURE__FILE_TYPE").value = getNodeText(selectSingleNode(signNode, "FILE_TYPE"));
        document.getElementById("BLK_SIGNATURE__IMG_TYPE").value = getNodeText(selectSingleNode(signNode, "IMG_TYPE"));
        document.getElementById("IMAGEDISPLAY").src = strPath + '&fileName=' + getNodeText(selectSingleNode(signNode, "FILE_TYPE")) + '&actionType=READ';
		//Redwood_changes starts
        //document.getElementsByName("BTN_ADD_BLK_SIGNATURE")[0].style.visibility = "hidden";
        //document.getElementsByName("BTN_REMOVE_BLK_SIGNATURE")[0].style.visibility = "hidden";
		getElementsByOjName("BTN_ADD_BLK_SIGNATURE")[0].style.visibility = "hidden";
        getElementsByOjName("BTN_REMOVE_BLK_SIGNATURE")[0].style.visibility = "hidden";
		//Redwood_changes ends
        document.getElementById('IMAGEDISPLAY').style.display = '';
        document.getElementById("IMAGEDISPLAY").className = "IMGBUTTON";
    }
}

function fnPreMoveNext_BLK_SIGNATURE_KERNEL() {
    currentPage = Number(getInnerText(document.getElementById("CurrPageSV__BLK_SIGNATURE")));
    totalPage = Number(getInnerText(document.getElementById("TotPageSV__BLK_SIGNATURE")));
    gAction = 'DUMMY';
}

function fnPostMoveNext_BLK_SIGNATURE_KERNEL() {

    if (currentPage < totalPage) {

        var custRecNode = selectSingleNode(dbDataDOM, "//BLK_SIGNATURE_DETAILS[@ID=" + dbIndexArray['BLK_SIGNATURE_DETAILS'] + "]");
        if (custRecNode != null && selectSingleNode(custRecNode, "BLK_SIGNATURE") != null) {
            var signRecNode = selectSingleNode(custRecNode, "BLK_SIGNATURE[@ID=" + dbIndexArray['BLK_SIGNATURE'] + "]");
            document.getElementById("X-CSRFTOKEN").value = mainWin.CSRFtoken;
            document.getElementById("IMAGEDISPLAY").src = strPath + '&fileName=' + getNodeText(selectSingleNode(signRecNode, "FILE_TYPE")) + '&actionType=READ';
            if (selectNodes(custRecNode, "BLK_SIGNATURE")) {
                setInnerText(document.getElementById("TotPageSV__BLK_SIGNATURE"), selectNodes(custRecNode, "BLK_SIGNATURE").length);
            }
            fnUpdateSEPgBtn("BLK_SIGNATURE");
        }
    }
		fnEnableMEBlock('BLK_SIGNATURE_DETAILS', false);
		var eleArray = new Array("INPUT", "SELECT", "TEXTAREA");
		var fldSetElem = document.getElementsByTagName("fieldset");
		//disableMESVFields('BLK_SIGNATURE');
		disableMESVBlockFields(eleArray, fldSetElem[5]) ;
    gAction = "";
}

function fnPreMovePrev_BLK_SIGNATURE_KERNEL() {
    currentPage = Number(getInnerText(document.getElementById("CurrPageSV__BLK_SIGNATURE")));
    totalPage = Number(getInnerText(document.getElementById("TotPageSV__BLK_SIGNATURE")));
    gAction = 'DUMMY';
}

function fnPostMovePrev_BLK_SIGNATURE_KERNEL() {
    if (totalPage > 1 && currentPage <= totalPage) {
        var custRecNode = selectSingleNode(dbDataDOM, "//BLK_SIGNATURE_DETAILS[@ID=" + dbIndexArray['BLK_SIGNATURE_DETAILS'] + "]");
        if (custRecNode != null && selectSingleNode(custRecNode, "BLK_SIGNATURE") != null) {
            var signRecNode = selectSingleNode(custRecNode, "BLK_SIGNATURE[@ID=" + dbIndexArray['BLK_SIGNATURE'] + "]");
            document.getElementById("X-CSRFTOKEN").value = mainWin.CSRFtoken;
            document.getElementById("IMAGEDISPLAY").src = strPath + '&fileName=' + getNodeText(selectSingleNode(signRecNode, "FILE_TYPE")) + '&actionType=READ';
            if (selectNodes(custRecNode, "BLK_SIGNATURE")) {
                setInnerText(document.getElementById("TotPageSV__BLK_SIGNATURE"), selectNodes(custRecNode, "BLK_SIGNATURE").length);
            }
            fnUpdateSEPgBtn("BLK_SIGNATURE");
        }
    }
    document.getElementById('IMAGEDISPLAY').style.display = '';
    document.getElementById("IMAGEDISPLAY").className = "IMGBUTTON";
	fnEnableMEBlock('BLK_SIGNATURE_DETAILS', false);
	var eleArray = new Array("INPUT", "SELECT", "TEXTAREA");
	var fldSetElem = document.getElementsByTagName("fieldset");
	//disableMESVFields('BLK_SIGNATURE');
	disableMESVBlockFields(eleArray, fldSetElem[5]) ;
    gAction = "";
}

function fnRestrictResponse() {
    //var imgType = document.getElementById('BLK_ACCOUNT_DETAILS__IMAGE_TYPE').value;//Bug_36924146 Changes
    var imgType = parentWin.parentWinParams.imgType;//Bug_36924146 Changes 
	var custRecNode = selectNodes(dbDataDOM, "//BLK_ACCOUNT_DETAILS[@ID=1]/BLK_SIGNATURE_DETAILS");
    var countDet = custRecNode.length;
    for (var i = 1;i <= countDet;i++) {
        var signRecNode = selectNodes(dbDataDOM, "//BLK_SIGNATURE_DETAILS[@ID=" + i + "]/BLK_SIGNATURE");
        var signCount = signRecNode.length;
        for (k = 1;k <= signCount;k++) {
            var signDataNode = selectSingleNode(dbDataDOM, "//BLK_SIGNATURE_DETAILS[@ID=" + i + "]/BLK_SIGNATURE[@ID=" + k + "]");
            if (getNodeText(signDataNode.getElementsByTagName("IMG_TYPE")[0]) == 'S' && imgType == 'I') {
                dbIndexArray['BLK_SIGNATURE_DETAILS'] = i;
                dbIndexArray['BLK_SIGNATURE'] = k;
                deleteData('BLK_SIGNATURE');
                k--;
                signCount--;

            }
            else if (getNodeText(signDataNode.getElementsByTagName("IMG_TYPE")[0]) == 'I' && imgType == 'S') {
                dbIndexArray['BLK_SIGNATURE_DETAILS'] = i;
                dbIndexArray['BLK_SIGNATURE'] = k;
                deleteData('BLK_SIGNATURE');
                k--;
                signCount--;
            }
        }
    }
    // Bug_36924146 Changes Starts
	/*for (var i = 1;i <= countDet;i++) {
        var signRecNode = selectSingleNode(dbDataDOM, "//BLK_SIGNATURE_DETAILS[@ID=" + i + "]/BLK_SIGNATURE");
		var amountBased = selectSingleNode(dbDataDOM, "//BLK_SIGNATURE_DETAILS[@ID=" + i + "]/BLK_AMT_SIG");
        if (signRecNode == null && amountBased == null) {
            dbIndexArray['BLK_SIGNATURE_DETAILS'] = i;
            //deleteData('BLK_SIGNATURE_DETAILS');  //12_1_RETRO_12_2_23664399 commented
			deleteData('BLK_SIGNATURE'); //12_1_RETRO_12_2_23664399 added
            i--;
            countDet--;
        }
    }*/
	
	var custRecNodeNew = selectNodes(dbDataDOM, "//BLK_ACCOUNT_DETAILS[@ID=1]/BLK_SIGNATURE_DETAILS");
	var countDetNew = custRecNodeNew.length;
    for (var i = 1;i <= countDetNew;i++) {
		var signRecNodeNew = selectNodes(dbDataDOM, "//BLK_SIGNATURE_DETAILS[@ID=" + i + "]/BLK_SIGNATURE");
        var signCount = signRecNodeNew.length;
		if(signCount != null && signCount == 0){
			dbIndexArray['BLK_ACCOUNT_DETAILS'] = 1;
			dbIndexArray['BLK_SIGNATURE_DETAILS'] = i;
            deleteData('BLK_SIGNATURE_DETAILS');
			i--;
			countDetNew--;
		}
	}	
	//Bug_36924146 Ends
}

function fnSaveAll(arg, event) {
//Fix for 21327889  
	//9NT1606_14_3_RETRO_12_1_30077599 starts
    //if (parentWin.screenType == 'WB') {	
	if (parentWin.screenType == 'WB' && signImage == "S" &&  document.getElementById('dataEntryDiv_SIGNATURE') ) {	
		if (signImage =='S')
	//9NT1606_14_3_RETRO_12_1_30077599 added
        parentWin.fnSetSignOKDetails();
    }
    else {
        parentWin.sigView = true;
    }
    fnExitAll('', event);
}

function fnInTab_TAB_MAIN_1_KERNEL(){
      /* if(document.getElementById('BLK_ACCOUNT_DETAILS__GROUP_ID').value== "" || typeof(document.getElementById('BLK_ACCOUNT_DETAILS__GROUP_ID').value)== "undefined"){
              document.getElementById("BTN_OK").disabled = false; 
        }*/  
		
        if(mainWin.brnHostLinkStatus=='OFFLINE' && isPostLoadDone){
		 var brn = parentWin.parentWinParams.brn;
        var accNo = parentWin.parentWinParams.accNo;
        var imgType = parentWin.parentWinParams.imgType;
		var ccy=parentWin.parentWinParams.ccy;
		document.getElementById('BLK_ACCOUNT_DETAILS__LOV_ID').value="LOV_SIG_OFFLINE"; //21505318 
        document.getElementById('BLK_ACCOUNT_DETAILS__BRANCH').value = brn;
        document.getElementById('BLK_ACCOUNT_DETAILS__CUST_ACC').value = accNo;
        document.getElementById('BLK_ACCOUNT_DETAILS__IMAGE_TYPE').value = imgType;
		document.getElementById('BLK_ACCOUNT_DETAILS__ACC_DESC').value = "";
		// document.getElementById('BLK_ACCOUNT_DETAILS__ACC_CCY').value = "";
		document.getElementById('BLK_ACCOUNT_DETAILS__ACC_CCY').value = ccy;   //SDL
		
		createDOM(dbStrRootTableName);
        gAction = "EXECUTEQUERY";
        fnExecuteQuery();
        gAction = "";
        }		
		var eleArray = new Array("INPUT", "SELECT", "TEXTAREA", "BUTTON");
		var fldSetElem = document.getElementsByTagName("fieldset");
		disableMESVBlockFields(eleArray, fldSetElem[5]) ;
	    fnEnableSignButtons();
		//Redwood_changes starts
		//document.getElementsByName("BTN_ADD_BLK_SIGNATURE")[0].style.visibility = "hidden";
        //document.getElementsByName("BTN_REMOVE_BLK_SIGNATURE")[0].style.visibility = "hidden";
		getElementsByOjName("BTN_ADD_BLK_SIGNATURE")[0].style.visibility = "hidden";
        getElementsByOjName("BTN_REMOVE_BLK_SIGNATURE")[0].style.visibility = "hidden";
		//Redwood_changes ends
		document.getElementById("BTN_OK").disabled = false; 
		dbIndexArray['BLK_SIGNATURE_DETAILS'] = 1;
        dbIndexArray['BLK_SIGNATURE'] = 1;
		tabCount++ ;
		fnDisplaySignature(); 			
			
}


function fnInTab_TAB_MAIN_KERNEL(){
     /*  if(document.getElementById('BLK_ACCOUNT_DETAILS__GROUP_ID').value== "" || typeof(document.getElementById('BLK_ACCOUNT_DETAILS__GROUP_ID').value)== "undefined"){
               document.getElementById("BTN_OK").disabled = false;  
            }*/
			if(mainWin.brnHostLinkStatus=='OFFLINE' &&isPostLoadDone){
		 var brn = parentWin.parentWinParams.brn;
        var accNo = parentWin.parentWinParams.accNo;
        var imgType = parentWin.parentWinParams.imgType;
		var ccy=parentWin.parentWinParams.ccy;
		document.getElementById('BLK_ACCOUNT_DETAILS__LOV_ID').value="LOV_SIG_AMT_OFFLINE"; //21505318 
        document.getElementById('BLK_ACCOUNT_DETAILS__BRANCH').value = brn;
        document.getElementById('BLK_ACCOUNT_DETAILS__CUST_ACC').value = accNo;
		document.getElementById('BLK_ACCOUNT_DETAILS__TO_AMT').value = toAmount;
        document.getElementById('BLK_ACCOUNT_DETAILS__IMAGE_TYPE').value = imgType;
		createDOM(dbStrRootTableName);
        gAction = "EXECUTEQUERY";
        fnExecuteQuery();
        gAction = "";
        }		
			document.getElementById("BTN_OK").disabled = false; 
			fnEnableSignButtons();
}

function fnCalcCustSignViewHgt() {
    containerDIV = seqNo;
    var scrWidth = document.getElementById("DIVWNDContainer").offsetWidth;
    var scrHeight = parseInt(document.getElementById("DIVWNDContainer").offsetHeight);

    if (scrWidth > mainWin.x)
        scrWidth = mainWin.x - 8;
    if (scrHeight > parseInt(mainWin.document.getElementById("vtab").offsetHeight))
        scrHeight = parseInt(mainWin.document.getElementById("vtab").offsetHeight);
    parent.document.getElementById(containerDIV).style.width = document.getElementById("DIVScrContainer").offsetWidth + "px";
    parent.document.getElementById(containerDIV).children[0].style.width = document.getElementById("DIVScrContainer").offsetWidth + "px";

    parent.document.getElementById(containerDIV).style.height = scrHeight + "px";
    parent.document.getElementById(containerDIV).children[0].style.height = scrHeight + "px";

    document.getElementById("DIVScrContainer").style.width = scrWidth + "px";
    document.getElementById("DIVScrContainer").style.height = scrHeight + "px";

    document.getElementById("DIVWNDContainer").style.width = parent.document.getElementById(containerDIV).offsetWidth + "px";
    var l_DivFooter = document.getElementById("DIVFooter").offsetHeight;
    var l_DivTmpHgt = parseInt(scrHeight) - parseInt(l_DivFooter) - document.getElementById("WNDtitlebar").offsetHeight;
    document.getElementById("DIVMainTmp").style.height = parseInt(l_DivTmpHgt) + 'px';
    if (document.getElementById("toolbar")) {
        l_DivTmpHgt = parseInt(scrHeight) - parseInt(l_DivFooter) - document.getElementById("WNDtitlebar").offsetHeight - document.getElementById("toolbar").offsetHeight;
    }
    else {
        l_DivTmpHgt = parseInt(scrHeight) - parseInt(l_DivFooter) - document.getElementById("WNDtitlebar").offsetHeight;
    }
    document.getElementById("DIVMainTmp").style.height = parseInt(l_DivTmpHgt) + 'px';
    var divMainTmpChildren = document.getElementById("DIVMainTmp").children;
    var tempContainerHgt = 0;
    document.getElementById("mainTabContainer").style.height = document.getElementById("DIVMainTmp").offsetHeight - tempContainerHgt + "px";
    parent.document.getElementById(containerDIV).style.top = mainWin.document.getElementById("masthead").offsetHeight + 4 + "px";
    parent.parent.document.getElementById("ifr_LaunchWin").title = getInnerText(document.getElementById("DIVWNDContainer").getElementsByTagName("H1")[0]);
    parent.mask();
}
// Bug_36924146 Changes Starts
function setTabDisplayStyle(idTabs, strSeparator, displayStyle){

    var arrTabs = idTabs.split(strSeparator);
    for (var loopIndex = 0; loopIndex < arrTabs.length; loopIndex++){
        if (arrTabs[loopIndex] != null && arrTabs[loopIndex] != ""){
            var elem = document.getElementById(arrTabs[loopIndex]);
            elem.style.display = displayStyle;
        }

    }
}

function hideTabs(idTabs, strSeparator){
    if (arguments.length < 2){
        strSeparator = ",";
    }

    setTabDisplayStyle(idTabs, strSeparator, "none");
}
// Bug_36924146 Changes Ends
