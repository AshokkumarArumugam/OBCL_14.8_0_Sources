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
**  File Name          : LBDJOBRN_KERNEL.js
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

**  CHANGE LOG         : RAMYA M
**  Last modified on   : 07-04-2023
**  Reason             : On click of start button stp job is not running in front end
**  SEARCH STRING      : BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES

****************************************************************************************************************************/

var  currRowIndex= "";
var SEQ_LST=new Array();
var PR_LST=new Array();
var BRN_LST=new Array();
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
      //  var isChkd = sumTblObj[j].cells[0].getElementsByTagName('oj-input-text')[0].value;//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
      //  if(isChkd)//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
		  if(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[j].cells[0].getElementsByTagName("INPUT")[0].checked==true)//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
		  {
            chkd = true;        
			}
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
    setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/FUNCTIONID"), "LBDJOBRN");
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
                return false;
		    }
		if (msgStatus == "WARNING" || msgStatus == "SUCCESS")
            {
		var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP").xml;
                var returnVal = displayResponse(messageNode,msgStatus,'I');
		    }	
            gAction = g_prev_gAction;
	    fnRefreshSummary();
		return true;
    }
	

}
//Function to Perpare the Body of the Request
function fnPrepareBody() {
        var msgxml_ftclose = "<FCUBS_BODY>";
            msgxml_ftclose += '    <FLD>'; 
            msgxml_ftclose += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_PRJOBRNS">SEQ_LST~BRN_LST~PROCESS_SEQ~BRANCH~JOB_NO~PROCESS_FREQ~PROCESS~STATUS~MODULE~PROCESS_DESCRIPTION~PR_LST~JOB</FN>';                        
            msgxml_ftclose += '    </FLD>';
            msgxml_ftclose += '<REC RECID="1" TYPE="BLK_PRJOBRNS"><FV/></REC></FCUBS_BODY>';
    reqDom=loadXMLDoc(msgxml_ftclose);
    fnGetProcessList();
    var blkCdtSecNd = "";
  
    var blkCdtSecNd = reqDom.createCDATASection(SEQ_LST +"~" + BRN_LST + "~~~~~~~~~" + PR_LST + "~");
  
    selectSingleNode(selectSingleNode(reqDom,"//REC[@RECID='1'][@TYPE='BLK_PRJOBRNS']"),"FV").appendChild(blkCdtSecNd);
    return selectSingleNode(reqDom,"//FCUBS_BODY");

}
//Function to get all the process List which are selected
function fnGetProcessList() { 
      SEQ_LST = "";
      BRN_LST="";
      PR_LST="";
      var j=0;
      len = getTableObjForBlock("TBL_QryRslts").tBodies[0].rows.length;
      var msfm_tchk = 0 ;      
      for(i = 0;i < len; i++) {
        if(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName(("INPUT")[0])){
          if(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked==true ){
             msfm_tchk = msfm_tchk +1;
			 if((getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[2]))!=""){
                            PR_LST = PR_LST + (getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[1])  + ':') ; 
                            BRN_LST = BRN_LST + (getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[6])  + ':') ; 
                            SEQ_LST= SEQ_LST + (getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[3])  + ':') ; 
                         }
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
  msfm_prclist = "" ;
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
        if(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName(("INPUT")[0]))
		{
          if(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked==true )
		  {
                   
                  
              msfm_bulk[i]='Y';
              if (msfm_fchk == -1) {
			   msfm_fchk = i;
			}
				msfm_fchk = msfm_fchk +1;				
				if(len == 1)
				{
					msfm_prclist = msfm_prclist + (getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[1]) + ':') ;
					break;
				}
				else{
					msfm_prclist = msfm_prclist + (getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[1])  +  ':') ;
				}				
          }
		  else
          {
			 msfm_prclist = msfm_prclist + (getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[1]) + ':') ;
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

//	 parent.screenArgs=screenArgs;
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
        if(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName(("INPUT")[0])){//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
          if(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked==true)//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
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
        if(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName(("INPUT")[0]))//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
		{
          if(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked==true)//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
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
  
 


//Function  for start 
function fnStart(){
        fnMultiRowHit('START');
	return true;   
}

//Function  for stop
function fnStop(){
	
	fnMultiRowHit('STOP');
	return true;   
}

//Function  for stop STP Jobs
function fnStopSTPJobs()
{

  fnMultiRowHit('STOP_STP');  	
  return true;

}

//Function  for stop STP/CLP Jobs
function fnStopSTPCLPJobs()
{
	
  fnMultiRowHit('STOP_STPCLP');  	
  return true;

}
//Function  for stop STP ASPAC 
function fnStopSTPASPAC()
{
	
  fnMultiRowHit('STOP_STPASP');  	
  return true;

}
//Function  for stop STP ASPAC Jobs
function fnStopASPACJobs()
{
  fnMultiRowHit('STOP_STPASJBS');  	
  return true;

}




