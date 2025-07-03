/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright © 2008 - 2013  Oracle and/or its affiliates.  All rights reserved.
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
**  Written by         : Neeraj.Krishna
**  Date of creation   : 26-AUG-16
**  File Name          : LDDJRNOL_KERNEL.js
**  Purpose            : 
**  Called From        : 

****************************************************************************************************************************/
screenArgs = new Array();
var g_prevAction = "";
var batchNo;
var currNo;
var dr_ent_total;
var cr_ent_total
var refRegen = 0;
var dbDataDOM_old;
var g_msgStatus ="";//Bug#16944743
 var gCloseAction =0; // Bug#17764966
function fnPostNew_KERNEL() 
{
var success = false;
g_msgStatus ="";//Bug#16944743
	if (refRegen == 0) {
		while(!success) { 
			fnSubScreenMain('OLCBATOP', 'OLCBATOP', 'CVS_BATCH_OP',false);
			if(screenArgs['EXITVAL'] == 'S') {
				if( fnCreateRef() )
					success = true;
				//document.getElementsByName("DEVWS_JRNL_LOG__BRN")[0].value = mainWin.CurrentBranch;
			}
			else {
				success = true;
			}
		} //end while
	}
	else 
	{
		fnCreateRef();
	}
	debugs("In fnPostNew", "A");
    return true; 	
	
}

function fnPostClose_CVS_BATCH_OP_KERNEL(screenArgs)
{
	if(!fn_populateBatch())
	{
	  	gAction=''; 
		disableForm();
		document.getElementById("BLK_JRNL_LOG__BATCHNO").value = '';	
 		fnExitAll('',event);
        return true;
	}
   	return true;
}

function fn_populateBatch() 
{
	if(screenArgs['EXITVAL'] == 'S')
	{
		document.getElementById("BLK_JRNL_LOG__BRANCHCODE").value = mainWin.CurrentBranch;
		document.getElementById("BLK_JRNL_LOG__BATCHNO").value = screenArgs['BATCH'];
		document.getElementById("BLK_JRNL_LOG__DESCRIPTION").value = screenArgs['DESC'];
		document.getElementById("BLK_JRNL_LOG__BTBAL").value = screenArgs['BAL'];
		document.getElementById("BLK_JRNL_LOG__DRCHKTOTAL").value = screenArgs['DEBIT'];
		document.getElementById("BLK_JRNL_LOG__CRCHKTOTAL").value = screenArgs['CREDIT'];
		appendData();
        if(!fnCreateRef())
		{
		 return false;
		}		
    }	
  	return true;  
}

function fnCreateRef()
{
  var g_prevAction = gAction;
  gAction = "PRD_DFLT";
  	fnCallPkg();
	var msg_stat =getNodeText( selectSingleNode(fcjResponseDOM,'//MSGSTAT'));
	if(msg_stat == 'FAILURE') {
		return false;
	}
	showTabData(strCurrentTabId);
return true;
}

function fnCallPkg()
{
 if(refRegen==0)
 {
 dbDataDOM_old=dbDataDOM;
 }
 if(refRegen==1)
{
document.getElementById("BLK_JRNL_LOG__BATCHNO").value = batchNo;  
document.getElementById("BLK_JRNL_LOG__BRANCHCODE").value = mainWin.CurrentBranch;
 dbDataDOM=dbDataDOM_old;
 setNodeText(selectSingleNode(dbDataDOM,"//BLK_JRNL_LOG/BATCHNO"), batchNo);
 setNodeText(selectSingleNode(dbDataDOM,"//BLK_JRNL_LOG/BRN"), mainWin.CurrentBranch);
 setNodeText(selectSingleNode(dbDataDOM,"//BLK_JRNL_LOG/DR_ENT_TOT"), dr_ent_total);
 setNodeText(selectSingleNode(dbDataDOM,"//BLK_JRNL_LOG/CR_ENT_TOT"), cr_ent_total);
}
 fcjRequestDOM = buildUBSXml();
 fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
 fnSetExitButton(false);
 gAction ="NEW";
 showToolbar(functionId, '', '');
 refRegen = 0;
 var msgStatus = fnProcessResponse();
  g_msgStatus = msgStatus;//Bug#16944743
 enableForm();
}

function fnPostSave_KERNEL()
{
var msg_stat =getNodeText( selectSingleNode(fcjResponseDOM,'//MSGSTAT'));
  if(msg_stat == 'SUCCESS')
  {
    batchNo = document.getElementById("BLK_JRNL_LOG__BATCHNO").value;
	currno = document.getElementById("BLK_JRNL_LOG__CURRNO").value;
	description =document.getElementById("BLK_JRNL_LOG__DESCRIPTION").value;
	dr_ent_total = document.getElementById("BLK_JRNL_LOG__DRENTTOTAL").value;
	cr_ent_total = document.getElementById("BLK_JRNL_LOG__CRENTTOTAL").value;
	enableForm();
	refRegen = 1;
	fnPostNew_KERNEL();
  }
return true;  
 }
 
 function fnPreEnterQuery_KERNEL()
{
    fnEnableElement(document.getElementById("BLK_JRNL_LOG__BATCHNO"));
	fnEnableElement(document.getElementById("BLK_JRNL_LOG__CURRNOI"));
	document.getElementById("BLK_JRNL_LOG__BATCHNO").focus();
	document.getElementById("BLK_JRNL_LOG__CURRNO").readOnly = false;  
    document.getElementById("BLK_JRNL_LOG__BATCHNO").tabIndex = 1;
    document.getElementById("BLK_JRNL_LOG__CURRNO").tabIndex= 2;  
	return true;
}
function fnBatch_Close()
{
  appendData();
  g_prevAction = gAction;
  gAction='BTCLS';
  fcjRequestDOM = buildUBSXml();
  fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
  processingAction = "";
  var msgStatus = fnProcessResponse();
  fnPostProcessResponse(msgStatus); // Bug#17764966 Added
   gAction=g_prevAction;
   if (msgStatus=='SUCCESS')
   {
   resetElements();
   disableForm();
   gAction="";
   fnSetExitButton(false);
   }
   // Bug#17764966 Starts
   else if (msgStatus=='WARNING')
   {
   customAlertAction = "BTCLOSE";
   gCloseAction = 1;
   }
   // Bug#17764966 Ends
}

//Subsystem
// Bug#17764966 Starts
function fnCloseAlertWin_BTCLOSE()
{
     if (gCloseAction == 1)
	 {
          msgStatus = 'SUCCESS';
          fnPostProcessResponse(msgStatus);
      }
resetElements();
disableForm();
gAction="";
fnSetExitButton(false);
unmask();
}
function fnExitAlertWin_BTCLOSE()
{
gCloseAction = 1;
unmask();
}
// Bug#17764966 Ends
function fnPreLoad_CVS_ACCSIG_KERNEL(screenArgs )
{
	if ( document.getElementById("BLK_JRNL_LOG__FCCREF").value == '')
	{
		if (document.getElementById("BLK_JRNL_LOG__FCCREF").value == '' && gAction == 'NEW')
		{
	       showErrorAlerts('IN-HEAR-505');
		//alert('Account Not allowed for Upload');
	       return false;
		}
		screenArgs['ACC'] ="";
		screenArgs['CUSTNO'] ="";
		screenArgs['ACTION'] ="";
		screenArgs['BRN'] ="";
		screenArgs['ACDESC'] ="";
		screenArgs['CUSTNAME'] = ""; 
	}
	else
	{
		screenArgs['ACTION'] ='LAUNCH';
       	screenArgs['BRN'] = document.getElementById("BLK_JRNL_LOG__BRN").value;
		screenArgs['ACC'] = document.getElementById("BLK_JRNL_LOG__ACCNO").value;
       	screenArgs['CUSTNO'] = document.getElementById("BLK_JRNL_LOG__RELCUST").value;
       	screenArgs['ACDESC']  = document.getElementById("BLK_JRNL_LOG__ACCDESC").value;
		screenArgs['CUSTNAME'] = "";    
	}
return true;
}


function fnPreAuthorize_KERNEL()
{
    authFunction   = 'OLDJRAUT';
	authUixml      = 'OLDJRAUT';
	authScreenName = 'CVS_AUTH';    
	gAction = 'EXECUTEQUERY';
	ArrFuncOrigin['OLDJRAUT']="KERNEL";
	ArrPrntFunc['OLDJRAUT'] = "";
	ArrPrntOrigin['OLDJRAUT'] ="";
	return true;
	
}

function fnPostClose_CVS_AUTH_KERNEL(screenArgs)
{
gAction = "EXECUTEQUERY";
fnExecuteQuery();
return;
}
function fnCalculate()
{
  appendData();
  g_prevAction = gAction;
  gAction='CALC';
  fcjRequestDOM = buildUBSXml();
  fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
  var msgStatus = fnProcessResponse();
  processingAction="";
  fnPostProcessResponse(msgStatus);
  gAction=g_prevAction;
}//Bug#16944743 starts
function fnExitSubScreen(parentScrID, launcherDIVWidth, launcherIFWidth, launcherDIVHeight, launcherIFHeight, launcherResTreeWidth, launcherResTreeHeight, launcherHeaderWidth, launcherLeft) {
    parent.document.getElementById(parentScrID).style.width = launcherDIVWidth;
    parent.document.getElementById(parentScrID).children[0].style.width = launcherIFWidth;
    parent.document.getElementById(parentScrID).style.height = launcherDIVHeight;
    parent.document.getElementById(parentScrID).children[0].style.height = launcherIFHeight;
    parent.document.getElementById(parentScrID).style.left = launcherLeft;
    document.getElementById("DIVScrContainer").style.width = launcherResTreeWidth;
    document.getElementById("DIVScrContainer").style.height = launcherResTreeHeight;
    document.getElementById("DIVWNDContainer").style.width = launcherHeaderWidth;
	var childDivObj = document.getElementById("ChildWin");
    if (navigator.userAgent.toLowerCase().indexOf("opera") != -1) 
        childDivObj.parentNode.removeChild(childDivObj); 
        //setOuterHTML(document.getElementById("ChildWin"), "");
    else {        
        childDivObj.getElementsByTagName("IFRAME")[0].src = "";
        document.getElementById("Div_ChildWin").removeChild(childDivObj);
    }
    if (!fromRemarksReqd) {
        if (typeof (unmaskTitle) != "undefined") {
            unmask(unmaskTitle);
            unmaskTitle = false;
            fnFocus();
        } else {
            unmask();
        }
    } else {
        fromRemarksReqd = false;
    }
    document.getElementById("BTN_EXIT_IMG").focus();
	//Bug#17818714  starts
	//if(g_msgStatus !='SUCCESS'){ 
	 if (g_msgStatus !='SUCCESS' && gAction =='NEW'){
     //Bug#17818714 ends	
    resetDOM();
    resetElements();
    disableForm();
    gAction = "";
    fnSetExitButton();
    showToolbar(functionId, '', '');
    fnCalcHgt();
	}
}
//Bug#16944743 ends
