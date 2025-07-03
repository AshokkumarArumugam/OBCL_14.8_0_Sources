/***************************************************************************************************************************
 **  This source is part of the FLEXCUBE Software Product.
 **  Copyright (c) 2007 ,2013, Oracle and/or its affiliates.
 **  All rights reserved.
 **
 **  No part of this work may be reproduced, stored in a retrieval system,
 **  adopted or transmitted in any form or by any means, electronic, mechanical, photographic,
 **  graphic, optic recording or otherwise, translated in any language or computer language,
 **  without the prior written permission of Oracle and/or its affiliates.
 **
 **  Oracle Financial Services Software Limited.
 **  Oracle Park, Off Western Express Highway,
 **  Goregaon (East),
 **  Mumbai - 400 063,
 **  India.
 **
 **  Written by         :SUSHIL PANDEY
 **  Date of creation :
 **  File Name          : LBDAGYIB_KERNEL.js
 **  Purpose            :
 **  Called From        :
 **
 ****************************************************************************************************************************/
var  currRowIndex= "";
var AGN_ID;
var AGN_ESN;
var msob_tchk=0;
window.screenToOpen="RL";

function fnRowHit(gActionCode) {

    var sumTblObj = getTableObjForBlock("TBL_QryRslts").tBodies[0].rows;
    var chkd = false;
    for(var j = 0; j < sumTblObj.length; j++){
        var isChkd = sumTblObj[j].cells[0].getElementsByTagName('oj-input-text')[0].value;
	
        if(isChkd)
            chkd = true; 
			msob_tchk=msob_tchk+1;
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
    setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/FUNCTIONID"), "LBDAGYIB");
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
            msgxml_ftclose += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_AGENCY_WRAPPER_BROWSER">PROCESSING_DATE~PARTICIPANT~AGENCY_ESN~WRAPPER_PARTICIPANT~EXPENSE_CODE~PRODUCT_CODE~WRAPPER_REF_NO~EVENT_VALUE_DATE~PROCESSING_STATUS~AGENCY_REF_NO~AGENCY_EVENT_CODE~WRAPPER_EVENT_CODE~WRAPPER_ESN~TXT_CURRENCY~TXT_BRANCH_CODE~TXT_SILENT_PART~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>';                        
            msgxml_ftclose += '    </FLD>';
            msgxml_ftclose += '<REC RECID="1" TYPE="BLK_AGENCY_WRAPPER_BROWSER"><FV/></REC></FCUBS_BODY>';
    reqDom=loadXMLDoc(msgxml_ftclose);
    fnGetAgnIDList();
    var blkCdtSecNd = "";
    var blkCdtSecNd = reqDom.createCDATASection("~~" + AGN_ESN+ "~~~~~~~"+AGN_ID+"~~~~~~~~~~~~~~");
    //var blkCdtSecNd = reqDom.createCDATASection("~~" + AGN_ID+ "~"+AGN_ESN+"~~~~~~~~~");
    selectSingleNode(selectSingleNode(reqDom,"//REC[@RECID='1'][@TYPE='BLK_AGENCY_WRAPPER_BROWSER']"),"FV").appendChild(blkCdtSecNd);
    return selectSingleNode(reqDom,"//FCUBS_BODY");

}
//Function to get the TxnID Record which is selected
function fnGetAgnIDList() { 
      AGN_ID = "";
	  AGN_ESN="";
      len = getTableObjForBlock("TBL_QryRslts").tBodies[0].rows.length;
      var msob_tchk = 0 ;      
      for(i = 0;i < len; i++) {
        if(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0]){
          if(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked ){
             msob_tchk = msob_tchk +1;
			 if((getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[3]))!=""){
                     AGN_ID = AGN_ID + (getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[3])) ; 
		     AGN_ESN =  AGN_ESN + (getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[4])) ; 
                         }
           }
         }
	  }
      if (msob_tchk == 0 ) {         
		 showErrorAlerts('IN-HEAR-206');
         proc =0;
         return false ; 
	  }     
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
        if(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0]){
          if(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked)
          {
            var processingStatus=getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[13]);
            if(processingStatus!='Failed'){
               alert("Select Records with processing  status as 'Failed'");
               return;
            }
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
 
function fnReprocess(){
	fnRowHit('REPROC');
}

function fnRelatedContracts(){
       SingleCheck();
    
       if (currRowIndex == 0)
    {
        return false;
    }
         g_prev_gAction = gAction;
	 gAction='EXECUTEQUERY';
	 screenArgs['AGENCY_REF_NO']=getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[currRowIndex-1].cells[3]);
         screenArgs['AGENCY_ESN']=getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[currRowIndex-1].cells[4]);
//         screenArgs['FCCREF']=getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[currRowIndex-1].cells[3]);
//	 screenArgs['OPERATION']='View';
         screenArgs['ACTION']='EXECUTEQUERY';
	 var detailPk = g_DetPkArray[currRowIndex-1];
	 detailWinParams.ShowSummary = "TRUE";
	 detailWinParams.DetailPkVals = detailPk;
        // document.getElementById("BLK_AGENCY_WRAPPER_BROWSER__EXPENSE_CODE").style.visibility = 'hidden';  

         mainWin.dispHref1('LBDAGYIB', seqNo);  
         //fnSubScreenMain('LBDFPMBR', 'LBDFPMBR', 'CVS_ERR', false);
         parent.screenArgs=screenArgs;  
 return true;
}

function fnExceptionLog(){
         SingleCheck();
      
       if (currRowIndex == 0)
    {
        return false;
    }
         g_prev_gAction = gAction;
	 gAction='EXECUTEQUERY';
	 screenArgs['AGENCY_REF_NO']=getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[currRowIndex-1].cells[3]);
         screenArgs['AGENCY_ESN']=getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[currRowIndex-1].cells[4]);
//         screenArgs['FCCREF']=getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[currRowIndex-1].cells[3]);
	 screenArgs['OPERATION']='View';
         screenArgs['ACTION']='EXECUTEQUERY';
	 var detailPk = g_DetPkArray[currRowIndex-1];
	 detailWinParams.ShowSummary = "TRUE";
	 detailWinParams.DetailPkVals = detailPk;
        
//	 detailWinParams.sumTxnBranch = sumTxnBranch;
	 mainWin.dispHref1('LBDAGYIB', seqNo);  
         //fnSubScreenMain('LBDFPMBR', 'LBDFPMBR', 'CVS_ERR', false);
         parent.screenArgs=screenArgs;  
 return true;
}



