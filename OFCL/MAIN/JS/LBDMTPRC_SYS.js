/***************************************************************************************************************************
**  This source is part of the Oracle Banking Software Product. 
**  Copyright (c) 2008 ,2024, Oracle and/or its affiliates.
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
**  Written by         : 
**  Date of creation   : 
**  File Name          : LBDMTPRC_SYS.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 
****************************************************************************************************************************/

//***** Code for criteria Search *****
var criteriaSearch  = 'N';
//----------------------------------------------------------------------------------------------------------------------
//***** FCJ XML FOR THE SCREEN *****
//----------------------------------------------------------------------------------------------------------------------
var fieldNameArray = {"BLK_BORROWER_DETAIL":"BORROWREFNO~EVNTSEQNO~FUNDSIGHT~CONTREFNUM1~CONTSTAT9~LATESN~TREASOURCE~LATVERNO~BRNCH~AUTHSTATUS~CUREVNT~CONTREFNO10~CK_DTSTAMP~AUTHSTAT~WORKFLOWSTAT~AUTHBY~TXNSTAT~ESN10~EVNTCODE~INPUTBY~MODULE~MK_DTSTAMP~NEWVERSIND~DFTPAYMENTDT~DFTRECEIPTDT~DFTFUNDSSIGHTED~DEFLTFRONT~CURRENCY~TOTFUNDAMT1~CONTREFNOFUNHIS~PARTICIPANTFUNHIS~TOTFUNAMTFUNHIST","BLK_BORROWER_FRONTING":"CONREFNO1~ESN1~CONTRYPE1~FUNDSIGHT~FUNDDT~CCY~AMOUNT~BORROWFRONTYPE~PAYDT~TRANSEVNT~ACTUALRECPDT~VALDT~INVESTFRONTTYP~CLASSIFICATION~COUNTPARTY~COUNTPARTYNAME","BLK_PARTICIPANT_FRONTING":"RECALLDT~CCY1~VALDT1~FRONTTYPE~BORRCONTREFNO1~TRANSEVNT1~ACTRECEIPTDT1~CONTREFNO2~PAYDT1~AMOUNT1~FUNDSTAT1~BORRESN1~CLASSIFICATION1~ESN2~COUNTERPARTY1~COUNTERPTYNAME1","BLK_INVESTOR_FUNDING_DETAILS":"COUNTERPARTY3~VALDT3~FRONTTYPE3~UNFUNDAMT3~CONTREFENO3~BORRCONTREFNO2~COUNTPARTYNAME3~ACTRECPTDT3~FUNDAMT3~BORRCONTREFNO4~COUNTPARTY4~FUNDT4~CONTREFNO4~FUNDSSIGHTED","BLK_PAYMENT_HISTORY":"CURRENCY~FUNAMT4~BORROWCONTREFNO5~PAYDT5~COUNTPARTY5","BLK_PAYMENT_HISTORY_DETAILS":"PAYDT6~FRONTYP6~BORRCONTREFNO6~CONTREFNO6~PAYESN6~BORROWESN6~CURRENCY~FUNAMT6~COUNTRPART","BLK_FUNDING_HISTORY":"BORRCONTREFNO9~ACTRECPTDT9~CURRENCY~FUNDAMT9~FUNDESN9~FUNDT9~CONTREFNO9","BLK_PART_ORR_MISMATCH":"BORRREFNO10~FRONTINGTYP10~RATING~FRONTSTAT10~COUNTERPART10~CONTPARTYNAME","BLK_BORR_ORR_MISMATCH":"FRONTSTAT~RATNG~BORRFRONTTYP~CONTREFNO12~COUNTPARTY11~RATECODE11~BORRWRNAME"};

var multipleEntryPageSize = {"BLK_BORROWER_FRONTING" :"15" ,"BLK_PARTICIPANT_FRONTING" :"15" ,"BLK_INVESTOR_FUNDING_DETAILS" :"15" ,"BLK_PAYMENT_HISTORY" :"15" ,"BLK_PAYMENT_HISTORY_DETAILS" :"15" ,"BLK_FUNDING_HISTORY" :"15" ,"BLK_PART_ORR_MISMATCH" :"15" ,"BLK_BORR_ORR_MISMATCH" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_BORROWER_FRONTING","CVS_MAIN__TAB_EVENT":"BLK_PARTICIPANT_FRONTING","CVS_MAIN__TAB_INVEST":"BLK_INVESTOR_FUNDING_DETAILS","CVS_PAYMENT__TAB_MAIN":"BLK_PAYMENT_HISTORY~BLK_PAYMENT_HISTORY_DETAILS","CVS_FUND_HIST__TAB_MAIN":"BLK_FUNDING_HISTORY","CVS_MIS_INVEST__TAB_MAIN":"BLK_PART_ORR_MISMATCH","CVS_MISMATCH_BORR__TAB_MAIN":"BLK_BORR_ORR_MISMATCH"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_BORROWER_DETAIL">BORROWREFNO~EVNTSEQNO~FUNDSIGHT~CONTREFNUM1~CONTSTAT9~LATESN~TREASOURCE~LATVERNO~BRNCH~AUTHSTATUS~CUREVNT~CONTREFNO10~CK_DTSTAMP~AUTHSTAT~WORKFLOWSTAT~AUTHBY~TXNSTAT~ESN10~EVNTCODE~INPUTBY~MODULE~MK_DTSTAMP~NEWVERSIND~DFTPAYMENTDT~DFTRECEIPTDT~DFTFUNDSSIGHTED~DEFLTFRONT~CURRENCY~TOTFUNDAMT1~CONTREFNOFUNHIS~PARTICIPANTFUNHIS~TOTFUNAMTFUNHIST</FN>'; 
msgxml += '      <FN PARENT="BLK_BORROWER_DETAIL" RELATION_TYPE="N" TYPE="BLK_BORROWER_FRONTING">CONREFNO1~ESN1~CONTRYPE1~FUNDSIGHT~FUNDDT~CCY~AMOUNT~BORROWFRONTYPE~PAYDT~TRANSEVNT~ACTUALRECPDT~VALDT~INVESTFRONTTYP~CLASSIFICATION~COUNTPARTY~COUNTPARTYNAME</FN>'; 
msgxml += '      <FN PARENT="BLK_BORROWER_FRONTING" RELATION_TYPE="N" TYPE="BLK_PARTICIPANT_FRONTING">RECALLDT~CCY1~VALDT1~FRONTTYPE~BORRCONTREFNO1~TRANSEVNT1~ACTRECEIPTDT1~CONTREFNO2~PAYDT1~AMOUNT1~FUNDSTAT1~BORRESN1~CLASSIFICATION1~ESN2~COUNTERPARTY1~COUNTERPTYNAME1</FN>'; 
msgxml += '      <FN PARENT="BLK_BORROWER_DETAIL" RELATION_TYPE="N" TYPE="BLK_INVESTOR_FUNDING_DETAILS">COUNTERPARTY3~VALDT3~FRONTTYPE3~UNFUNDAMT3~CONTREFENO3~BORRCONTREFNO2~COUNTPARTYNAME3~ACTRECPTDT3~FUNDAMT3~BORRCONTREFNO4~COUNTPARTY4~FUNDT4~CONTREFNO4~FUNDSSIGHTED</FN>'; 
msgxml += '      <FN PARENT="BLK_BORROWER_FRONTING" RELATION_TYPE="N" TYPE="BLK_PAYMENT_HISTORY">CURRENCY~FUNAMT4~BORROWCONTREFNO5~PAYDT5~COUNTPARTY5</FN>'; 
msgxml += '      <FN PARENT="BLK_PAYMENT_HISTORY" RELATION_TYPE="N" TYPE="BLK_PAYMENT_HISTORY_DETAILS">PAYDT6~FRONTYP6~BORRCONTREFNO6~CONTREFNO6~PAYESN6~BORROWESN6~CURRENCY~FUNAMT6~COUNTRPART</FN>'; 
msgxml += '      <FN PARENT="BLK_INVESTOR_FUNDING_DETAILS" RELATION_TYPE="N" TYPE="BLK_FUNDING_HISTORY">BORRCONTREFNO9~ACTRECPTDT9~CURRENCY~FUNDAMT9~FUNDESN9~FUNDT9~CONTREFNO9</FN>'; 
msgxml += '      <FN PARENT="BLK_BORROWER_FRONTING" RELATION_TYPE="N" TYPE="BLK_PART_ORR_MISMATCH">BORRREFNO10~FRONTINGTYP10~RATING~FRONTSTAT10~COUNTERPART10~CONTPARTYNAME</FN>'; 
msgxml += '      <FN PARENT="BLK_BORROWER_FRONTING" RELATION_TYPE="N" TYPE="BLK_BORR_ORR_MISMATCH">FRONTSTAT~RATNG~BORRFRONTTYP~CONTREFNO12~COUNTPARTY11~RATECODE11~BORRWRNAME</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_MAIN";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** FCJ XML FOR SUMMARY SCREEN *****
//----------------------------------------------------------------------------------------------------------------------
var msgxml_sum=""; 
msgxml_sum += '    <FLD>'; 
msgxml_sum += '      <FN PARENT="BLK_BORROWER_DETAIL" RELATION_TYPE="1" TYPE="BLK_PAYMENT_PROCESSING_SUMMARY">BORROWREFNO~PRODUCT~BRANCH</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "LBDMTPRC";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_PAYMENT_PROCESSING_SUMMARY";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_BORROWER_DETAIL" : "","BLK_BORROWER_FRONTING" : "BLK_BORROWER_DETAIL~N","BLK_PARTICIPANT_FRONTING" : "BLK_BORROWER_FRONTING~N","BLK_INVESTOR_FUNDING_DETAILS" : "BLK_BORROWER_DETAIL~N","BLK_PAYMENT_HISTORY" : "BLK_BORROWER_FRONTING~N","BLK_PAYMENT_HISTORY_DETAILS" : "BLK_PAYMENT_HISTORY~N","BLK_FUNDING_HISTORY" : "BLK_INVESTOR_FUNDING_DETAILS~N","BLK_PART_ORR_MISMATCH" : "BLK_BORROWER_FRONTING~N","BLK_BORR_ORR_MISMATCH" : "BLK_BORROWER_FRONTING~N"}; 

 var dataSrcLocationArray = new Array("BLK_BORROWER_DETAIL","BLK_BORROWER_FRONTING","BLK_PARTICIPANT_FRONTING","BLK_INVESTOR_FUNDING_DETAILS","BLK_PAYMENT_HISTORY","BLK_PAYMENT_HISTORY_DETAILS","BLK_FUNDING_HISTORY","BLK_PART_ORR_MISMATCH","BLK_BORR_ORR_MISMATCH"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LBDMTPRC.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LBDMTPRC.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_BORROWER_DETAIL__BORROWREFNO";
pkFields[0] = "BLK_BORROWER_DETAIL__BORROWREFNO";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_BORROWER_DETAIL":["BORROWREFNO","BTN_BORR_MISMATCH","BTN_EVENTS","BTN_PART_MISMATCH","CONTREFNOFUNHIS","DEFLTFRONT","DFTFUNDSSIGHTED","DFTPAYMENTDTI","DFTRECEIPTDTI","PARTICIPANTFUNHIS"],"BLK_BORROWER_FRONTING":["ACTUALRECPDTI","BORROWFRONTYPE","FUNDSIGHT","INVESTFRONTTYP"],"BLK_INVESTOR_FUNDING_DETAILS":["BTN_BORR_PAY_HIS","BTN_FUND_HIS","FUNDSSIGHTED"],"BLK_PARTICIPANT_FRONTING":["ACTRECEIPTDT1I","FRONTTYPE","RECALLDTI"]};
var closeAmendArr = new Array(); 
var reopenAmendArr = new Array(); 
var reverseAmendArr = new Array(); 
var deleteAmendArr = new Array(); 
var rolloverAmendArr = new Array(); 
var confirmAmendArr = new Array(); 
var liquidateAmendArr = new Array(); 
var queryAmendArr = new Array(); 
var authorizeAmendArr = new Array(); 
//----------------------------------------------------------------------------------------------------------------------

var subsysArr    = new Array(); 

//----------------------------------------------------------------------------------------------------------------------

//***** CODE FOR LOVs *****
//----------------------------------------------------------------------------------------------------------------------
var lovInfoFlds = {"BLK_BORROWER_DETAIL__BORROWREFNO__LOV_BORROWER_REF_NO":["BLK_BORROWER_DETAIL__BORROWREFNO~","","N",""]};
var offlineLovInfoFlds = {};
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR TABS *****
//----------------------------------------------------------------------------------------------------------------------
var strHeaderTabId = 'TAB_HEADER';
var strFooterTabId = 'TAB_FOOTER';
var strCurrentTabId = 'TAB_MAIN';
//--------------------------------------------
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------
var multipleEntryIDs = new Array("BLK_BORROWER_FRONTING","BLK_PARTICIPANT_FRONTING","BLK_INVESTOR_FUNDING_DETAILS","BLK_PAYMENT_HISTORY","BLK_PAYMENT_HISTORY_DETAILS","BLK_FUNDING_HISTORY","BLK_PART_ORR_MISMATCH","BLK_BORR_ORR_MISMATCH");
var multipleEntryArray = new Array();
var multipleEntryCells = new Array();
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY VIEW SINGLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR ATTACHED CALLFORMS *****
 //----------------------------------------------------------------------------------------------------------------------

 var CallFormArray= new Array(); 

 var CallFormRelat=new Array(); 

 var CallRelatType= new Array(); 


 var ArrFuncOrigin=new Array();
 var ArrPrntFunc=new Array();
 var ArrPrntOrigin=new Array();
 var ArrRoutingType=new Array();


 // Code for Loading Cluster/Custom js File Starts
 var ArrClusterModified=new Array();
 var ArrCustomModified=new Array();
 // Code for Loading Cluster/Custom js File ends

ArrFuncOrigin["LBDMTPRC"]="KERNEL";
ArrPrntFunc["LBDMTPRC"]="";
ArrPrntOrigin["LBDMTPRC"]="";
ArrRoutingType["LBDMTPRC"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LBDMTPRC"]="N";
ArrCustomModified["LBDMTPRC"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"OLDEVENT":"CONTREF~ACTION_CODE"};
var scrArgSource = {"OLDEVENT":"BLK_BORROWER_DETAIL__BORROWREFNO~"};
var scrArgVals = {"OLDEVENT":"~EXECUTEQUERY"};
var scrArgDest = {};
//***** CODE FOR SUB-SYSTEM DEPENDENT  FIELDS   *****
//----------------------------------------------------------------------------------------------------------------------
var dpndntOnFlds = {};
var dpndntOnSrvs = {};
//***** CODE FOR TAB DEPENDENT  FIELDS   *****
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR CALLFORM TABS *****
//----------------------------------------------------------------------------------------------------------------------
var callformTabArray = new Array(); 
//***** CODE FOR ACTION STAGE DETAILS *****
//----------------------------------------------------------------------------------------------------------------------
var actStageArry = {"QUERY":"2","NEW":"2","MODIFY":"2","AUTHORIZE":"1","DELETE":"1","CLOSE":"1","REOPEN":"1","REVERSE":"1","ROLLOVER":"1","CONFIRM":"1","LIQUIDATE":"1","SUMMARYQUERY":"2"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------