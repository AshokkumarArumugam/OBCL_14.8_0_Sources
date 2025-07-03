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
**  File Name          : OLDOUTBR_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : Gouri
**  Last modified on   : 21-Jan-2013
**  Full Version       : 
**  Reason             : 16177338_USDWFNA_12.0

**  CHANGE LOG
**  Last Modified By   : VRUNDAP
**  Last modified on   : 12-FEB-2013
**  Full Version       : 
**  Reason             :On double click of a record, The Outgoing Message Browser screen(OLDOUTBR) for the concerned record was not getting displayed
**  Search String   : 9NT1525_12.0.1_USDWFDP_16315144

**  Last Modified By   : Vidyad
**  Last modified on   : 16-May-2013
** Search String : 9NT1606_12.0.2_INTERNAL_16825017 (Retro: 16700247) 


**  Modified By   		: Chaatravi
**  Modified on   		: 02-June-2015
**	Modified Reason	   	: On click of search, let us display current branch records only. If user has rights
						  to other branch, he can filter records through branch option available in this function.	
						  Defaulted branch to mainWin.CurrentBranch on load of summary screen.						 
**  Search String      	: 9NT1606_12.1_RETRO_21096396	

**  Modified By   		: Shishirkumar Aithal
**  Modified on   		: 23-Nov-2017
**	Modified Reason	   	: Added code to make the fucntion operations name same as given in rad 		 
**  Bug no     			: OFCL12.3_26984000  	 
**  Modified By   		: Kavitha Asokan 
**  Modified on   		: 22-07-2024
**	Modified Reason	   	: Unable to select record after selecting the row - checkbox selection fix. 	 
**  Bug no     			: Bug#36850522  

****************************************************************************************************************************/

var  currRowIndex= "";
var DCN_LIST;
var msob_bulk = new Array();
var local_dom = "" ;
var gTsname = '';
var gTsvalue = '';

function fnPreShowDetail_Sum_KERNEL()
{ 
 //return false; --9NT1525_12.0.1_USDWFDP_16315144
 return true; //9NT1525_12.0.1_USDWFDP_16315144
}

function ONSELECTANYORORIGINAL()
{
	if (getElementsByOjName("ANYORORG")[0].value =="O")
	{
	 fnDisableElement(getElementsByOjName("NAME")[0]);
	 fnDisableElement(getElementsByOjName("ADDRESS1")[0]);
	 fnDisableElement(getElementsByOjName("ADDRESS2")[0]);
	 fnDisableElement(getElementsByOjName("ADDRESS3")[0]);
	 fnDisableElement(getElementsByOjName("ADDRESS4")[0]);
	 fnDisableElement(getElementsByOjName("MEDIA")[0]);
	 fnDisableElement(getElementsByOjName("LOCATION")[0]);
	}
	else
	{
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
}

//Function Common for multiple row selection Starts
//Function to Hit Backend with a Specifiec Action Code
function fnMultiRowHit(gActionCode) {
	bulk_check();
    var sumTblObj = getTableObjForBlock("TBL_QryRslts").tBodies[0].rows;
    var chkd = false;
    for(var j = 0; j < sumTblObj.length; j++){
        var isChkd = sumTblObj[j].cells[0].getElementsByTagName('INPUT')[0].checked;
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
    setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/FUNCTIONID"), "OLDOUTBR");
    setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/ACTION"),gActionCode);
    setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/MODULEID"),"OL");
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
		var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
        //var returnVal = displayResponse(messageNode,msgStatus,'E');
		var returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'E');
		return false;
		    }
		if (msgStatus == "WARNING" ||msgStatus == "SUCCESS")
            {
		var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP").xml;
        var returnVal = displayResponse(messageNode,msgStatus,'I');
		    }	
        gAction = g_prev_gAction;
		//fnRefreshSummary(event);//Refresh The Summary After Execution.//16177338_USDWFNA_12.0
		fnRefreshSummary();//16177338_USDWFNA_12.0
		
    }
	

}
//Function to Perpare the Body of the Request
function fnPrepareBody() {
        var msgxml_ftclose = "<FCUBS_BODY>";
            msgxml_ftclose += '    <FLD>'; 
            msgxml_ftclose += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_MSVWSMSSOUBRS">NAME~LOCATION~ADDRESS1~ADDRESS2~ADDRESS3~ADDRESS4~NODE~BRANCH~MEDIA~SWIFTMSGTYPE~PRIORITY~HOLDMAIL~DCN~REFERENCENO~MODULE~MSGTYPE~RECEIVER~CCY~AMOUNT~MSGSTATUS~REPAIRREASON~RUNNINGNO~HOLDSTATUS~ACKNACKSTATUS~EXTERNALREFNO~DELIVERYBY~RTGSNETWORK~TESTWORD~TESTAMOUNT~TESTDATE~TESTCURRENCY~TESTNARRATIVE~DCNLIST</FN>';                        
            msgxml_ftclose += '    </FLD>';
            msgxml_ftclose += '<REC RECID="1" TYPE="BLK_MSVWSMSSOUBRS"><FV/></REC></FCUBS_BODY>';
    reqDom=loadXMLDoc(msgxml_ftclose);
    fnGetDCNList();
    var blkCdtSecNd = "";
    var blkCdtSecNd = reqDom.createCDATASection("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~" + DCN_LIST);
    selectSingleNode(selectSingleNode(reqDom,"//REC[@RECID='1'][@TYPE='BLK_MSVWSMSSOUBRS']"),"FV").appendChild(blkCdtSecNd);
    return selectSingleNode(reqDom,"//FCUBS_BODY");

}
//Function to get all the DCN List which are selected
function fnGetDCNList() { 
      DCN_LIST = "";
      len = getTableObjForBlock("TBL_QryRslts").tBodies[0].rows.length;
      var msob_tchk = 0 ;      
      for(i = 0;i < len; i++) {
		   //Bug#36850522 changes
        //if(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("oj-input-text")[0]){
         // if(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("oj-input-text")[0].checked ){
			  
			  if(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0]){
              if(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked ){
			  //Bug#36850522 changes 
             msob_tchk = msob_tchk +1;
			 if((getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[2]))!="")
             DCN_LIST = DCN_LIST + (getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[2])  + ':') ; 
           }
         }
	  }
      if (msob_tchk == 0 ) {         
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
  msob_dcnlist = "" ;
  msob_fchk= -1 ;
  msob_tchk = 0 ;
   len = getTableObjForBlock("TBL_QryRslts").tBodies[0].rows.length;
    for(i = 0;i <= len; i++){
        msob_bulk[i]='N';
	}    
    var newDOM =null;
    var tempDOM =null;
    for(i = 0;i < len; i++)
      {//Bug#36850522 changes 
        //if(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("oj-input-text")[0])
		//{
        //  if(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("oj-input-text")[0].checked )
	    
			  if(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0]){
              if(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked )
			  //Bug#36850522 changes 
		  {
            msob_bulk[i]='Y';
            if (msob_fchk == -1) {
			   msob_fchk = i;
			}
				msob_tchk = msob_tchk +1;				
				if(len == 1)
				{
					msob_dcnlist = msob_dcnlist + (getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[2])  + '-' + getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[0].cells[39]) + '-' + 'Y' + ':') ;
					break;
				}
				else{
					msob_dcnlist = msob_dcnlist + (getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[2])  + '-' + getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[1].cells[39]) + '-' + 'Y' + ':') ;
				}				
          }
		  else
          {
			 msob_dcnlist = msob_dcnlist + (getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[2]) +'-'+ getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[1].cells[39]) + '-' + 'N' + ':') ;
          }
        }
          else if (msob_tchk == 0 ) {                 
				  showErrorAlerts('IN-HEAR-206');
                  return false ; }
        else
          break;
      }
  msob_fchk = msob_fchk;
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
	 mainWin.dispHref1('OLDOUTBR', seqNo);  
	 parent.screenArgs=screenArgs;
   return true;
}

//Function to Check whether Single row is selected or multiple row
function SingleCheck()
  {
   var selected_row = 0 ;
   var msob_tchk = 0 ;
   currRowIndex = 0 ;
   len = getTableObjForBlock("TBL_QryRslts").tBodies[0].rows.length;
   temp = 0 ;


     for(i = 0;i < len; i++)
      {
		   //Bug#36850522 STARTS changes 
        //if(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("oj-input-text")[0]){
        //  if(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("oj-input-text")[0].checked)
			  
			   if(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0]){
              if(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked )
			  //Bug#36850522 changes 
          {
            msob_tchk = msob_tchk +1;
            selected_row = i ;
            temp=i ;
            }
         }
        else
          break;
       }

                 if (msob_tchk > 1 ) {                  
				  showErrorAlerts('IN-HEAR-205');
                  return false ;
                  }
                 else if (msob_tchk == 0 ) {                  
				  showErrorAlerts('IN-HEAR-206');
                  return false ;  }
                 else {
                  currRowIndex = selected_row +1 ;  }
  }
 
//Function Common for Single row Selection Ends
 
//Function for Post Load Of OLDOUTBR Screen
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
}
 
//Function to Check Whether One Or More Rows Selected
function SingleOrMultiCheck()
  {
   var selected_row = 0 ;
   var msob_tchk = 0 ;
   currRowIndex = 0 ;
   len = getTableObjForBlock("TBL_QryRslts").tBodies[0].rows.length;
   temp = 0 ;
     for(i = 0;i < len; i++)
      {
		//Bug#36850522 changes STARTS
       // if(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("oj-input-text")[0])
		//{
         // if(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("oj-input-text")[0].checked)
			
			  if(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0]){
              if(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked )
			  //Bug#36850522 changes 
          {
            msob_tchk = msob_tchk +1;
            selected_row = i ;
            temp=i ;
          }
       }
        else
          break;
     }
	 return msob_tchk;
  }
  
 
//Function to Change Node
function FNCHANGENODE()
{
   fnSingleRowHit('MBOS_CN','N');	
   return true;
}

//Function to Change Address
function FNCHANGEADDRESS()
{
	fnSingleRowHit('MBOS_CA','A');	
    return true;   
}

//Function to Change Priority
function FNCHANGEPRIORITY()
{
	fnSingleRowHit('MBOS_CP','P');	
    return true;	
}

//ravali
//Function to Change Entity
function FNCHANGEENTITY()
{
	fnSingleRowHit('MBOS_CE','E');	
    return true;	
}	
//ravali

//Function to Change Media
function FNCHANGEMEDIA()
{
	fnSingleRowHit('MBOS_CM','M');	
    return true;	
}

//Function to Change Branch
function FNCHANGEBRANCH()
{
	fnSingleRowHit('MBOS_CB','B');	
    return true;	
}

//Function for Details
function FNDETAILS()
{
	fnSingleRowHit('EXECUTEQUERY','D');	
    return true;	
}

//Function to Copy
function FNCOPY()
{
	fnSingleRowHit('MBOS_CY','C');	
    return true;	
}

//Function to TW Input
function FNTWINPUT()
{
	fnSingleRowHit('MBOS_TI','T');	
    return true;	
}

//Function  for Generate 
function FNGENERATE(){
	var som =SingleOrMultiCheck();
	if (som == 0 ) 
	 {                  
	  showErrorAlerts('IN-HEAR-206');
	  return false ;
	 }
	 
	 // if (som == 1 ) 
	 // {                  
		// fnMultiRowHit('MBOS_GI');
     // }
	 // else if (som > 1 )
	 // {
		// fnMultiRowHit('MBOS_BATCH');
	 // }
	 
	 fnMultiRowHit('MBOS_GI');
	return true;   
}

//Function  for TW Auth
function FNTWAUTH(){
	fnMultiRowHit('MBOS_TA');
	return true;   
}

//Function  for Undo
function FNUNDO(){
	fnMultiRowHit('MBOS_U');
	return true;   
}

//Function  for Reinstate
function FNREINSTATE(){
	fnMultiRowHit('MBOS_RE');
	return true;   
}

//Function  for Release
function FNRELEASE(){
		//fnMultiRowHit('MBOS_RE');//16177338_USDWFNA_12.0
	fnMultiRowHit('MBOS_R');//16177338_USDWFNA_12.0
	return true;   
}

//Function  for Resend
function FNRESEND(){
	fnMultiRowHit('MBOS_RS');
	return true;   
}

//Function  for Cancel
function FNCANCEL(){
	fnMultiRowHit('MBOS_C');
	return true;   
}

//Function  for Hold
function FNHOLD(){
	fnMultiRowHit('MBOS_H');
	return true;   
}

//Function  for Carry Forward
function FNCARRYFORWARD(){
	fnMultiRowHit('MBOS_CF');
	return true;   
}

//Function  for Handoff
function FNHANDOFF(){
	fnMultiRowHit('MBOS_HO');
	return true;   
}

//Function  for Auth
function FNAUTH(){
	fnMultiRowHit('MBOS_AO');
	return true;   
}

//Function  for On-Line Auth
function FNONLINEAUTH(){
	SingleCheck ();
    if (currRowIndex == 0)
    {
		return false;
    }
    var maker_id ;
    var current_user = mainWin.UserId;
    maker_id= getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[currRowIndex-1].cells[33]);
    if ( current_user == maker_id) 
	{
		SingleCheck();
			if (currRowIndex == 0)
			{
				return false;
			}		
		screenArgs['DCN']=getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[currRowIndex-1].cells[2]);
		var detailPk = maker_id;
		detailWinParams.ShowSummary = "TRUE";
		detailWinParams.DetailPkVals = detailPk;
		detailWinParams.sumTxnBranch = sumTxnBranch;
		mainWin.dispHref1('OLCONLAU', seqNo);  
		parent.screenArgs=screenArgs;  
	}
	else 
	{
		fnMultiRowHit('MBOS_OA','X');
	}
	  return true;
} 

//Function  for View
function FNVIEW()
{
	SingleCheck();
    if (currRowIndex == 0)
    {
        return false;
    }
	 g_prev_gAction = gAction;
	 gAction='EXECUTEQUERY';
	 screenArgs['DCN']=getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[currRowIndex-1].cells[2]);
     screenArgs['FCCREF']=getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[currRowIndex-1].cells[3]);
	 screenArgs['OPERATION']='View';
	 var detailPk = g_DetPkArray[currRowIndex-1];
	 detailWinParams.ShowSummary = "TRUE";
	 detailWinParams.DetailPkVals = detailPk;
	 detailWinParams.sumTxnBranch = sumTxnBranch;
	 mainWin.dispHref1('OLCMSPRT', seqNo);  
	 parent.screenArgs=screenArgs;       
 return true;

}

//Function for BIP Advice
function FNBIPADV()
{
	 SingleCheck ();
	 if (currRowIndex == 0)
	{
		
		alert(currRowIndex)
		return false;
	}
	var QryTable = getTableObjForBlock("TBL_QryRslts")
	var rowInfo = QryTable.rows[currRowIndex];
	var er = fnGetDataXMLFromFCJXML(fcjResponseDOM,currRowIndex-1);
	dbDataDOM = er;
	gTsname = "P_DCN";  
	
    gTsvalue = getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[currRowIndex-1].cells[2]);	
	fnDownloadAdvice(gTsvalue);
	return true;

}

function fnDownloadAdvice(adviceFileName)
{
    try
	{
        var fileInputField = document.getElementById("ResTree");
        var parent = fileInputField.parentElement;
        var iFrameBody = "";
		var type="DOWNLOAD";  // 9NT1606_12.0.1_IUSDCAN_16700247
		
        iFrameBody += '<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Frameset//EN\" \"http://www.w3.org/TR/html4/frameset.dtd\"><html><head>';
        iFrameBody += '<meta http-equiv="Content-Type" content="application/x-unknown;charset=utf-8">';
        iFrameBody += '</head><body style=\" display:inline; padding:0px; margin:0px; border:0px none; \">';
        //iFrameBody += "<FORM id='fileUploadForm' method='post' action=FCReportHandleRequest?fileName="+fileUrl1+"&TYPE=DOWNLOAD enctype='multipart/form-data'>";
      //  iFrameBody += "<FORM id='fileUploadForm' method='post' action=FCReportHandleRequest?fileName="+adviceFileName+".pdf&X-CSRFTOKEN="+mainWin.CSRFtoken+"&TYPE=DOWNLOAD&Advice=Y";  // 9NT1606_12.0.2_INTERNAL_16825017
       // iFrameBody+=" enctype='multipart/form-data'>"; // 9NT1606_12.0.2_INTERNAL_16825017
	   
	   //iFrameBody += "<FORM id='fileUploadForm' method='post' action='FCReportHandleRequest?fileName="+adviceFileName+".pdf&TYPE="+type+"&Advice=Y' enctype='multipart/form-data'>"; // 9NT1606_12.0.2_INTERNAL_16825017
	   iFrameBody += "<FORM id='fileUploadForm' method='post' action='OBCLReportHandleRequest?fileName="+adviceFileName+".pdf&TYPE="+type+"&Advice=Y' enctype='multipart/form-data'>"; // BIP Advice generation for Outgoing browser
		iFrameBody += "<input type=\"hidden\" name=\"X-CSRFTOKEN\" value=\""+mainWin.CSRFtoken+"\" />"; // 9NT1606_12.0.2_INTERNAL_16825017
		
	   
        iFrameBody += "</FORM></body></html>";
        
        var iFrameHeight = fileInputField.offsetHeight;
        var iFrameWidth =  fileInputField.offsetWidth;
        
        var requestIFrame = createRequestIFrame(iFrameHeight+5,iFrameWidth+50);
        parent.appendChild(requestIFrame);
        var iRequestFrameID = 'RequestFrame';
        if(self.frames[iRequestFrameID].name != iRequestFrameID){
                /* *** IMPORTANT: This is a BUG FIX for Internet Explorer *** */
                self.frames[iRequestFrameID].name = iRequestFrameID;
        }
        document.getElementById('RequestFrame').contentWindow.document.open();
        document.getElementById('RequestFrame').contentWindow.document.write(iFrameBody);
        document.getElementById('RequestFrame').contentWindow.document.close();
        var responseIFrame = createResponseIFrame();
        parent.appendChild(responseIFrame);
        var iResponseFrameID = 'ResponseFrame';
        if(self.frames[iResponseFrameID].name != iResponseFrameID){
                /* *** IMPORTANT: This is a BUG FIX for Internet Explorer *** */
                self.frames[iResponseFrameID].name = iResponseFrameID;
        }
        var iFrameFormDocument = document.getElementById('RequestFrame').contentWindow.document;
        iFrameFormDocument.getElementById('fileUploadForm').target = 'ResponseFrame';
        iFrameFormDocument.getElementById("fileUploadForm").submit();
    }catch(e){
        // do Nothing
    }
}

function createRequestIFrame(height,width)
 {
        var requestIFrame = document.createElement('iframe');
        requestIFrame.setAttribute('id','RequestFrame');
        requestIFrame.setAttribute('name','RequestFrame');
        requestIFrame.setAttribute('class','TextNormal');
        requestIFrame.setAttribute('src','');
        requestIFrame.setAttribute('frameBorder','0');
        requestIFrame.setAttribute('height',height+'px');
        requestIFrame.setAttribute('width',width+'px');
        requestIFrame.setAttribute('scrolling','no');
        requestIFrame.style.border='0px none';
        requestIFrame.style.margin='0px';
        requestIFrame.style.padding='0px';
        return requestIFrame;
}
function createResponseIFrame()
{
    var responseFrameContainer = document.createElement('div');
    responseFrameContainer.setAttribute('id','responseContainer');
    var iFrameID = 'ResponseFrame';
    var iFrameBody = '<iframe id=\"' + iFrameID + '\"' 
                                    + ' name=\"' + iFrameID + '\"'
                                    + ' src=\"\" scrolling=\"no\" frameBorder=\"0\" onLoad=\"\" style=\"border:0px none; width:1px; height: 1px;\"><\/iframe>';
    responseFrameContainer.innerHTML = iFrameBody;
    return responseFrameContainer;
}

//Function  for Print/Spool
/*function fnPrintSpool()
{
	SingleCheck();
    if (currRowIndex == 0)
    {
        return false;
    }
	 g_prev_gAction = gAction;
	 parentWinParams.DCN=getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[currRowIndex-1].cells[2]).value;
	 var detailPk = g_DetPkArray[currRowIndex-1];
	 detailWinParams.ShowSummary = "TRUE";
	 detailWinParams.DetailPkVals = detailPk;
	 detailWinParams.sumTxnBranch = sumTxnBranch;
	 mainWin.dispHref1('MSROUBRS', seqNo);  
	 parent.screenArgs=screenArgs;       
 return true;

}*/


function FNPRINT(screenArgs)
{
   SingleCheck();
  if (currRowIndex == 0)
  {
    return false;
  }
  var QryTable = getTableObjForBlock("TBL_QryRslts")
  var rowInfo = QryTable.rows[currRowIndex];
  var er =fnGetDataXMLFromFCJXML(fcjResponseDOM, currRowIndex);
  dbDataDOM = er;
  var detailPk = g_DetPkArray[currRowIndex-1];
  detailWinParams.ShowSummary = "TRUE";
  detailWinParams.DetailPkVals = detailPk;
  screenArgs = new Array();
  
  screenArgs['SCREEN_NAME'] = 'CVS_OLCMSPRT';
  screenArgs['FUNCTION_ID'] = 'OLCMSPRT';
  screenArgs['MODULE'] = 'OL';
  screenArgs['LANG'] = mainWin.LangCode;
  screenArgs['UI_XML'] = 'OLCMSPRT'; 

  screenArgs['DESCRIPTION'] = 'Print';
  screenArgs['OPERATION'] = 'Print';
  screenArgs['DCN']=getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[currRowIndex-1].cells[2]);
  screenArgs['FCCREF']=getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[currRowIndex-1].cells[3]);
  screenArgs['RUNNING_NO']=getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[currRowIndex-1].cells[17]);
  parent.screenArgs=screenArgs;
  mainWin.dispHref1('OLCMSPRT',seqNo);    
 
}


function FNSPOOL(screenArgs)
{
   SingleCheck();
  if (currRowIndex == 0)
  {
    return false;
  }
  var QryTable = getTableObjForBlock("TBL_QryRslts")
  var rowInfo = QryTable.rows[currRowIndex];
  var er =fnGetDataXMLFromFCJXML(fcjResponseDOM, currRowIndex);
  dbDataDOM = er;
  var detailPk = g_DetPkArray[currRowIndex-1];
  detailWinParams.ShowSummary = "TRUE";
  detailWinParams.DetailPkVals = detailPk;
  screenArgs = new Array();
  
  screenArgs['SCREEN_NAME'] = 'CVS_OLCMSPRT';
  screenArgs['FUNCTION_ID'] = 'OLCMSPRT';
  screenArgs['MODULE'] = 'OL';
  screenArgs['LANG'] = mainWin.LangCode;
  screenArgs['UI_XML'] = 'OLCMSPRT'; 

  screenArgs['DESCRIPTION'] = 'Spool';
  screenArgs['OPERATION'] = 'Spool';
  screenArgs['DCN']=getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[currRowIndex-1].cells[2]);
  screenArgs['FCCREF']=getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[currRowIndex-1].cells[3]);
  screenArgs['RUNNING_NO']=getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[currRowIndex-1].cells[17]);
  parent.screenArgs=screenArgs;
  mainWin.dispHref1('OLCMSPRT',seqNo);    
 
}
//9NT1606_12.1_RETRO_21096396 changes start
function fnPostLoad_Sum_KERNEL(){
	  getElementsByOjName("BRANCH")[0].value= mainWin.CurrentBranch; 
}
//9NT1606_12.1_RETRO_21096396 changes end 
