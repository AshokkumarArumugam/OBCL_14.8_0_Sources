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
**  File Name          : LDBFPMBR_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 

**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             :
**  Search String   : 



****************************************************************************************************************************/

var  currRowIndex= "";
//var DCN_LIST;
var DCN_LIST=new Array();
var msfm_bulk = new Array();
var local_dom = "" ;
var gTsname = '';
var gTsvalue = '';

function fnPreShowDetail_Sum_KERNEL()
{ 
 return true; 
}




//Function Common for multiple row selection Starts
//Function to Hit Backend with a Specifiec Action Code
function fnMultiRowHit(gActionCode) {
    bulk_check();
    var sumTblObj = getTableObjForBlock("TBL_QryRslts").tBodies[0].rows;
    var chkd = false;
    for(var j = 0; j < sumTblObj.length; j++){
        var isChkd = sumTblObj[j].cells[0].getElementsByTagName('oj-input-text')[0].value;
        if(isChkd)
            chkd = true;        
    }
    if(!chkd){
        mask();
        showAlerts(fnBuildAlertXML('','I',mainWin.getItemDesc("LBL_NO_RECORDS_SEL")), 'I');
        alertAction = "UNMASK";
        return;
    }
    var g_prev_gAction = gAction;
    gAction = gActionCode;

    var headerNode = '<FCUBS_REQ_ENV><FCUBS_HEADER><SOURCE/><UBSCOMP/><USERID/><BRANCH/><SERVICE/><OPERATION/><MULTITRIPID/>';
    headerNode += '<FUNCTIONID/><ACTION/><MSGSTAT/><MODULEID/><ENTITY/><MSGID/></FCUBS_HEADER><FCUBS_BODY/></FCUBS_REQ_ENV>';
    exlRequestDOM =loadXMLDoc(headerNode);
    setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/SOURCE"), "FLEXCUBE");
    setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/UBSCOMP"), "FCUBS");
    setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/USERID"),mainWin.UserId);
    setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/BRANCH"), mainWin.CurrentBranch);
    setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/FUNCTIONID"), "LBDFPMBR");
    setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/ACTION"),gActionCode);
    setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/MODULEID"),"LB");
    setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/ENTITY"),mainWin.entity);
    var bodyReq = fnPrepareBody();
    var node = selectSingleNode(exlRequestDOM,"//FCUBS_BODY");
    node.parentNode.replaceChild(bodyReq.cloneNode(true), node);
    fcjResponseDOM = fnPost(exlRequestDOM, servletURL, functionId);
    
	if (fcjResponseDOM) 
	{ 
	    var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
		if (msgStatus == 'FAILURE')
            {
		var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP").xml;
        var returnVal = displayResponse(messageNode,msgStatus,'E');
		    }
		if (msgStatus == "WARNING" || msgStatus == "SUCCESS")
            {
		var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP").xml;
                var returnVal = displayResponse(messageNode,msgStatus,'I');
		    }	
            gAction = g_prev_gAction;
	    fnRefreshSummary();
		
    }
	

}
//Function to Perpare the Body of the Request
function fnPrepareBody() {
        var msgxml_ftclose = "<FCUBS_BODY>";
            msgxml_ftclose += '    <FLD>'; 
            msgxml_ftclose += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_FPML_MSG_OUT">HANDOFF_STATUS~REFERENCE_NO~MESSAGE~EVENT_VALUE_DATE~DCN~NOTC_NAME~BRANCH_DATE~ACK_STATUS~BRANCH_CODE~MSG_STATUS~EVENT_CODE~ESN~DCN_LIST</FN>';                        
            msgxml_ftclose += '    </FLD>';
            msgxml_ftclose += '<REC RECID="1" TYPE="BLK_FPML_MSG_OUT"><FV/></REC></FCUBS_BODY>';
    reqDom=loadXMLDoc(msgxml_ftclose);
    fnGetDCNList();
    var blkCdtSecNd = "";
   // var blkCdtSecNd = reqDom.createCDATASection("~~~~001MSOG1224000TR~~~~~~~~");
    var blkCdtSecNd = reqDom.createCDATASection("~~~~~~~~~~~~"+DCN_LIST);
  
    selectSingleNode(selectSingleNode(reqDom,"//REC[@RECID='1'][@TYPE='BLK_FPML_MSG_OUT']"),"FV").appendChild(blkCdtSecNd);
    return selectSingleNode(reqDom,"//FCUBS_BODY");

}
//Function to get all the DCN List which are selected
function fnGetDCNList() { 
      DCN_LIST = "";
      var j=0;
      len = getTableObjForBlock("TBL_QryRslts").tBodies[0].rows.length;
      var msfm_tchk = 0 ;      
      for(i = 0;i < len; i++) {
        if(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0]){
          if(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked ){
             msfm_tchk = msfm_tchk +1;
			 if((getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[2]))!="")
                           DCN_LIST = DCN_LIST + (getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[2])  + ':') ; 
                       //  DCN_LIST = DCN_LIST + (getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[2])) ; 
                       
           }
         }
	  }
      if (msfm_tchk == 0 ) {         
		 showErrorAlerts('IN-HEAR-206');
         proc =0;
         return false ; 
	  }     
}

//Function to find Bulk Check is selected or Not
function bulk_check()
{
  var emptyRows = 0;
  len = getTableObjForBlock("TBL_QryRslts").tBodies[0].rows.length;
  var rows = getTableObjForBlock("TBL_QryRslts").tBodies[0].rows;
  msfm_dcnlist = "" ;
  msfm_fchk= -1 ;
  msfm_tchk = 0 ;
   len = getTableObjForBlock("TBL_QryRslts").tBodies[0].rows.length;
    for(i = 0;i <= len; i++){
        msfm_bulk[i]='N';
	}    
    var newDOM =null;
    var tempDOM =null;
    for(i = 0;i < len; i++)
      {
        if(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0])
		{
          if(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked )
		  {
                   var msgStatus=getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[3]);
                  if(msgStatus !='G' && msgStatus !='R'){
                alert("Select Records with message status as 'G' or 'R'");
                return;
            }
                  
              msfm_bulk[i]='Y';
              if (msfm_fchk == -1) {
			   msfm_fchk = i;
			}
				msfm_fchk = msfm_fchk +1;				
				if(len == 1)
				{
					msfm_dcnlist = msfm_dcnlist + (getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[2]) + ':') ;
					break;
				}
				else{
					msfm_dcnlist = msfm_dcnlist + (getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[2])  +  ':') ;
				}				
          }
		  else
          {
			 msfm_dcnlist = msfm_dcnlist + (getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[2]) + ':') ;
          }
        }
          else if (msfm_fchk == 0 ) {                 
				  showErrorAlerts('IN-HEAR-206');
                  return false ; }
        else
          break;
      }
  msfm_fchk = msfm_fchk;
  return true;
} 
//Function Common for multiple row selection Ends

//Function Common for Single row Selection starts
function fnSingleRowHit(gActionCode,gOperation)
{
	SingleCheck();
    if (currRowIndex == 0)
    {
        return false;
    }
	 g_prev_gAction = gAction;
	 gAction=gActionCode;
	 screenArgs['OPERATION']=gOperation;
	 var detailPk = g_DetPkArray[currRowIndex-1];
	 detailWinParams.ShowSummary = "TRUE";
	 detailWinParams.DetailPkVals = detailPk;
	 detailWinParams.sumTxnBranch = sumTxnBranch;
	 mainWin.dispHref1('LBDFPMBR', seqNo);  
	 parent.screenArgs=screenArgs;
   return true;
}

//Function to Check whether Single row is selected or multiple row
function SingleCheck()
  {
   var selected_row = 0 ;
   var msfm_tchk = 0 ;
   currRowIndex = 0 ;
   len = getTableObjForBlock("TBL_QryRslts").tBodies[0].rows.length;
   temp = 0 ;


     for(i = 0;i < len; i++)
      {
        if(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0]){
          if(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked)
          {
            msfm_tchk = msfm_tchk +1;
            selected_row = i ;
            temp=i ;
            }
         }
        else
          break;
       }

                 if (msfm_tchk > 1 ) {                  
				  showErrorAlerts('IN-HEAR-205');
                  return false ;
                  }
                 else if (msfm_tchk == 0 ) {                  
				  showErrorAlerts('IN-HEAR-206');
                  return false ;  }
                 else {
                  currRowIndex = selected_row +1 ;  }
  }
 
//Function Common for Single row Selection Ends
 
//Function for Post Load Of LBDFPMBR Screen
/*
function fnPostLoad_KERNEL() {

	  var parentWin = fnGetParentWin();
	  if (parentWin != "") 
	  {
	          if (parent.screenArgs['OPERATION']== 'N') //Change Node
			  {
			    gAction="MBOS_CN";
				getElementsByOjName("TXTACTION")[0].value="MBOS_CN";				
				fnEnableElement(getElementsByOjName('NODE')[0]);
				fnEnableElement(getElementsByOjName('BTN_OK')[0]);
              }
			  if (parent.screenArgs['OPERATION']== 'A') //Change Address
			  {	
				gAction="MBOS_CA";
				getElementsByOjName("TXTACTION")[0].value="MBOS_CA";
				getElementsByOjName("ANYORORG")[0].style.visibility = "hidden";
				getElementsByOjName("ANYORORG")[0].parentElement.style.visibility='hidden';
				fnEnableElement(getElementsByOjName('ADDRESS1')[0]);
				fnEnableElement(getElementsByOjName('ADDRESS2')[0]);
				fnEnableElement(getElementsByOjName('ADDRESS3')[0]);
				fnEnableElement(getElementsByOjName('ADDRESS4')[0]);
				fnEnableElement(getElementsByOjName('BTN_OK')[0]);
              }
			  if (parent.screenArgs['OPERATION']== 'P') //Change Priority
			  {	
				gAction="MBOS_CP";
				getElementsByOjName("TXTACTION")[0].value="MBOS_CP";
				getElementsByOjName("ANYORORG")[0].style.visibility = "hidden";    
				getElementsByOjName("ANYORORG")[0].parentElement.style.visibility='hidden';
				fnEnableElement(getElementsByOjName('PRIORITY')[0]);
				fnEnableElement(getElementsByOjName('BTN_OK')[0]);         
              }
			  //ravali
			  if (parent.screenArgs['OPERATION']== 'E') //Change Entity
			  {	
				gAction="MBOS_CE";
				getElementsByOjName("TXTACTION")[0].value="MBOS_CE";
				getElementsByOjName("ANYORORG")[0].style.visibility = "hidden";    
				getElementsByOjName("ANYORORG")[0].parentElement.style.visibility='hidden';
				fnEnableElement(getElementsByOjName('ENTITY')[0]);
				fnEnableElement(getElementsByOjName('BTN_OK')[0]);         
              }
			  //ravali
			  if (parent.screenArgs['OPERATION']== 'M')  //Change Mode
			  {	
				gAction="MBOS_CM";
				getElementsByOjName("TXTACTION")[0].value="MBOS_CM";
				getElementsByOjName("ANYORORG")[0].style.visibility = "hidden";
				getElementsByOjName("ANYORORG")[0].parentElement.style.visibility='hidden';
				fnEnableElement(getElementsByOjName('MEDIA')[0]);
				fnEnableElement(getElementsByOjName('BTN_OK')[0]);				
				getElementsByOjName('MEDIA')[0].value  = getElementsByOjName('MEDIA')[0].value.toUpperCase();
              }
			  if (parent.screenArgs['OPERATION']== 'B')  //Change Branch
			  {	
				gAction="MBOS_CB";
				getElementsByOjName("TXTACTION")[0].value="MBOS_CB";
				getElementsByOjName("ANYORORG")[0].style.visibility = "hidden";
     			getElementsByOjName("ANYORORG")[0].parentElement.style.visibility='hidden';
				fnEnableElement(getElementsByOjName('BRANCH')[0]);
				fnEnableElement(getElementsByOjName('BTN_OK')[0]);				
              }
			  
			  if (parent.screenArgs['OPERATION']== 'D')  //Details
			  {	
				gAction="EXECUTEQUERY";	
				getElementsByOjName("TXTACTION")[0].value="MBOS_D";
              }
			  
			  if (parent.screenArgs['OPERATION']== 'C')  //Copy
			  {	
				gAction="MBOS_CY";
				getElementsByOjName("TXTACTION")[0].value="MBOS_CY";
				fnEnableElement(getElementsByOjName('NAME')[0]);
				fnEnableElement(getElementsByOjName('ADDRESS1')[0]);
				fnEnableElement(getElementsByOjName('ADDRESS2')[0]);
				fnEnableElement(getElementsByOjName('ADDRESS3')[0]);
				fnEnableElement(getElementsByOjName('ADDRESS4')[0]);
				fnEnableElement(getElementsByOjName('MEDIA')[0]);
				fnEnableElement(getElementsByOjName('LOCATION')[0]);
				fnEnableElement(getElementsByOjName('ANYORORG')[0]);
				fnEnableElement(getElementsByOjName('BTN_OK')[0]);					   
              }
			  
			  if (parent.screenArgs['OPERATION']== 'T')  //TW-Input
			  {	
				gAction="MBOS_TI";
				getElementsByOjName("TXTACTION")[0].value="MBOS_TI";
				getElementsByOjName("ANYORORG")[0].style.visibility = "hidden";
				getElementsByOjName("ANYORORG")[0].parentElement.style.visibility='hidden';
				fnEnableElement(getElementsByOjName('TESTWORD')[0]);
				fnEnableElement(getElementsByOjName('TESTAMOUNT')[0]);
				fnEnableElement(getElementsByOjName('TESTDATE')[0]);
				fnEnableElement(getElementsByOjName('TESTCURRENCY')[0]);
				fnEnableElement(getElementsByOjName('TESTNARRATIVE')[0]);
				fnEnableElement(getElementsByOjName('BTN_OK')[0]);								   
              }
			  
			  
			  if(parentWin.parentWinParams.DCN)
			  			fnEnterQuery();
			  getElementsByOjName("DCN")[0].value=screenArgs['DCN'].value;
			  gAction = "EXECUTEQUERY";
			  fnExecuteQuery();
			  gAction = g_prev_gAction; 
	 }
	 return true; 
}*/
 
//Function to Check Whether One Or More Rows Selected
function SingleOrMultiCheck()
  {
   var selected_row = 0 ;
   var msfm_tchk = 0 ;
   currRowIndex = 0 ;
   len = getTableObjForBlock("TBL_QryRslts").tBodies[0].rows.length;
   temp = 0 ;
     for(i = 0;i < len; i++)
      {
        if(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0])
		{
          if(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked)
          {
            var msgStatus=getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[3]);
            if(msgStatus !='F' && msgStatus !='N'){
                alert("Select Records with message status as 'F' or 'N'");
                return;
            }
            msfm_tchk = msfm_tchk +1;
            selected_row = i ;
            temp=i ;
          }
       }
        else
          break;
     }
	 return msfm_tchk;
  }
  
 


//Function  for ReGenerate 
function fnRegenerate(){
	var som =SingleOrMultiCheck();
	if (som == 0 ) 
	 {                  
	  showErrorAlerts('IN-HEAR-206');
	  return false ;
	 }
	 fnMultiRowHit('FMBR_GI');
	return true;   
}

//Function  for Handoff
function fnHandOff(){
	fnMultiRowHit('FMBR_HO');
	return true;   
}



function fnViewError()
{
	SingleCheck();
    if (currRowIndex == 0)
    {
        return false;
    }

  
	 g_prev_gAction = gAction;
	 gAction='EXECUTEQUERY';
	 screenArgs['DCN']=getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[currRowIndex-1].cells[2]);
//         screenArgs['FCCREF']=getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[currRowIndex-1].cells[3]);
	 screenArgs['OPERATION']='View';
          screenArgs['ACTION']='EXECUTEQUERY';
	 var detailPk = g_DetPkArray[currRowIndex-1];
	 detailWinParams.ShowSummary = "TRUE";
	 detailWinParams.DetailPkVals = detailPk;
        
//	 detailWinParams.sumTxnBranch = sumTxnBranch;
	 mainWin.dispHref1('LBDFPMBR', seqNo);  
         //fnSubScreenMain('LBDFPMBR', 'LBDFPMBR', 'CVS_ERR', false);
         parent.screenArgs=screenArgs;  
 return true;

}

function fnRowHit(gActionCode) {
    var msfm_tchk=0;
    var sumTblObj = getTableObjForBlock("TBL_QryRslts").tBodies[0].rows;
    var chkd = false;
    for(var j = 0; j < sumTblObj.length; j++){
        var isChkd = sumTblObj[j].cells[0].getElementsByTagName('oj-input-text')[0].value;
	
        if(isChkd)
            chkd = true; 
			msfm_tchk=msfm_tchk+1;
    }
    if(!chkd){
        mask();
        showAlerts(fnBuildAlertXML('','I',mainWin.getItemDesc("LBL_NO_RECORDS_SEL")), 'I');
        alertAction = "UNMASK";
        return;
    }

    SingleCheck();
    var g_prev_gAction = gAction;
    gAction = gActionCode;

    var headerNode = '<FCUBS_REQ_ENV><FCUBS_HEADER><SOURCE/><UBSCOMP/><USERID/><BRANCH/><SERVICE/><OPERATION/><MULTITRIPID/>';
    headerNode += '<FUNCTIONID/><ACTION/><MSGSTAT/><MODULEID/><ENTITY/><MSGID/></FCUBS_HEADER><FCUBS_BODY/></FCUBS_REQ_ENV>';
    exlRequestDOM =loadXMLDoc(headerNode);
    setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/SOURCE"), "FLEXCUBE");
    setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/UBSCOMP"), "FCUBS");
    setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/USERID"),mainWin.UserId);
    setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/BRANCH"), mainWin.CurrentBranch);
    setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/FUNCTIONID"), "LBDFPMBR");
    setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/ACTION"),gActionCode);
    setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/MODULEID"),"LB");
    setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/ENTITY"),mainWin.entity);
    var bodyReq = fnPrepareViewBody();
    var node = selectSingleNode(exlRequestDOM,"//FCUBS_BODY");
    node.parentNode.replaceChild(bodyReq.cloneNode(true), node);
    fcjResponseDOM = fnPost(exlRequestDOM, servletURL, functionId);
   
	if (fcjResponseDOM) 
	{ 
	    var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
		if (msgStatus == 'FAILURE')
            {
		var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP").xml;
                 var returnVal = displayResponse(messageNode,msgStatus,'E');
		    }
		if (msgStatus == "WARNING" ||msgStatus == "SUCCESS")
            {
		var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP").xml;
                
                var returnVal = displayResponse(messageNode,msgStatus,'I');
		    }	
                
                
                
                 
                 
                 gAction = g_prev_gAction;
		 //fnRefreshSummary(event);//Refresh The Summary After Execution.//16177338_USDWFNA_12.0
		// fnRefreshSummary();//16177338_USDWFNA_12.0
		
    }
	

}

function fnPrepareViewBody() {
        var msgxml_ftclose = "<FCUBS_BODY>";
            msgxml_ftclose += '    <FLD>'; 
            msgxml_ftclose += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_FPML_MSG_OUT">HANDOFF_STATUS~REFERENCE_NO~MESSAGE~EVENT_VALUE_DATE~DCN~NOTC_NAME~BRANCH_DATE~ACK_STATUS~BRANCH_CODE~MSG_STATUS~EVENT_CODE~ESN~DCN_LIST</FN>'; 
            msgxml_ftclose += '      <FN PARENT="BLK_FPML_MSG_OUT" RELATION_TYPE="N" TYPE="BLK_FPML_MSG_DETAIL">ERR_STRING~DCN~ERR_MSGNAME~ERR_LOCATION~ERR_DETAIL~ERR_CODE~SEQ_NO</FN>';
            msgxml_ftclose += '    </FLD>';
            msgxml_ftclose += '<REC RECID="1" TYPE="BLK_FPML_MSG_OUT"><FV/><REC TYPE="BLK_FPML_MSG_DETAIL"><FV/></REC></REC></FCUBS_BODY>';
    reqDom=loadXMLDoc(msgxml_ftclose);
    fnGetViewDCNList();
    var blkCdtSecNd = "";
   // var blkCdtSecNd = reqDom.createCDATASection("~~~~001MSOG1224000TR~~~~~~~~");
    var blkCdtSecNd = reqDom.createCDATASection("~~~~~~~~~~~~"+DCN_LIST);
    var blkChildCdtSecNd="";
    var blkChildCdtSecNd =reqDom.createCDATASection("~~~~~~~");
    selectSingleNode(selectSingleNode(reqDom,"//REC[@RECID='1'][@TYPE='BLK_FPML_MSG_OUT']"),"FV").appendChild(blkCdtSecNd);
    selectSingleNode(selectSingleNode(reqDom,"//REC[@TYPE='BLK_FPML_MSG_DETAIL']"),"FV").appendChild(blkChildCdtSecNd);
    return selectSingleNode(reqDom,"//FCUBS_BODY");

}

function fnGetViewDCNList() { 
      DCN_LIST = "";
      var j=0;
      len = getTableObjForBlock("TBL_QryRslts").tBodies[0].rows.length;
      var msfm_tchk = 0 ;      
      for(i = 0;i < len; i++) {
        if(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0]){
          if(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked ){
             msfm_tchk = msfm_tchk +1;
			 if((getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[2]))!="")
                           DCN_LIST = DCN_LIST + (getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[2])) ; 
                       //  DCN_LIST = DCN_LIST + (getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[2])) ; 
                       
           }
         }
	  }
      if (msfm_tchk == 0 ) {         
		 showErrorAlerts('IN-HEAR-206');
         proc =0;
         return false ; 
	  }     
}


