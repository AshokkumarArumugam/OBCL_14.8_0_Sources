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
**  File Name          : TLDLDIFB_SYS.js
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
var fieldNameArray = {"BLK_TLTB_LS_INTERFACE_BROWSER":"EVENTSEQNO~TRADEREFNO~CUSIPNO~TICKETREFNO~LS_EVENTCODE~ACTIONCODE~ACTUALSETTLDATE~POSITION_DENTIFIER~EXPENSECODE~PROCESSINGDATE~LTEVENTCODE~AGENCYREFNO~SOURCECODE~SEQNO~LSEVENTSEQNO~NO_OF_PARTICIPANTS~PROCESSING_STATUS~EXPENSCODE~TICKETID~DESKCODE~BRANCH~DEALTYPE~TXTCONTCCY~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH","BLK_TLTB_LS_INTERFACE_EXCEPTION":"ERRORCODE~CONTRACTREFNO~ERRSEQNO~EVENTSEQNO~SOURCECODE~MSG","BLK_LBTBS_TRADE_PROCESSING_QUEUE":"TRANCHEREFNO~TRANSFEROR~TRADEREFNO~TRANSFEREE~EXTTRADEID~TRANSFERAMOUNT"};

var multipleEntryPageSize = {"BLK_TLTB_LS_INTERFACE_EXCEPTION" :"15" ,"BLK_LBTBS_TRADE_PROCESSING_QUEUE" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_ERRDTLS":"BLK_TLTB_LS_INTERFACE_EXCEPTION","CVS_MAIN__TAB_TRNSFRDTLS":"BLK_LBTBS_TRADE_PROCESSING_QUEUE"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_TLTB_LS_INTERFACE_BROWSER">EVENTSEQNO~TRADEREFNO~CUSIPNO~TICKETREFNO~LS_EVENTCODE~ACTIONCODE~ACTUALSETTLDATE~POSITION_DENTIFIER~EXPENSECODE~PROCESSINGDATE~LTEVENTCODE~AGENCYREFNO~SOURCECODE~SEQNO~LSEVENTSEQNO~NO_OF_PARTICIPANTS~PROCESSING_STATUS~EXPENSCODE~TICKETID~DESKCODE~BRANCH~DEALTYPE~TXTCONTCCY~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
msgxml += '      <FN PARENT="BLK_TLTB_LS_INTERFACE_BROWSER" RELATION_TYPE="N" TYPE="BLK_TLTB_LS_INTERFACE_EXCEPTION">ERRORCODE~CONTRACTREFNO~ERRSEQNO~EVENTSEQNO~SOURCECODE~MSG</FN>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="N" TYPE="BLK_LBTBS_TRADE_PROCESSING_QUEUE">TRANCHEREFNO~TRANSFEROR~TRADEREFNO~TRANSFEREE~EXTTRADEID~TRANSFERAMOUNT</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_TLTB_LS_INTERFACE_BROWSER">AUTHSTAT~TXNSTAT~EVENTSEQNO~TRADEREFNO~CUSIPNO</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "TLDLDIFB";
var defaultWhereClause = "sypks_utils.get_branch(TRADE_REF_NO) = GLOBAL.CURRENT_BRANCH";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_TLTB_LS_INTERFACE_BROWSER";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_TLTB_LS_INTERFACE_BROWSER" : "","BLK_TLTB_LS_INTERFACE_EXCEPTION" : "BLK_TLTB_LS_INTERFACE_BROWSER~N","BLK_LBTBS_TRADE_PROCESSING_QUEUE" : ""}; 

 var dataSrcLocationArray = new Array("BLK_TLTB_LS_INTERFACE_BROWSER","BLK_TLTB_LS_INTERFACE_EXCEPTION","BLK_LBTBS_TRADE_PROCESSING_QUEUE"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside TLDLDIFB.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside TLDLDIFB.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_TLTB_LS_INTERFACE_BROWSER__TRADEREFNO";
pkFields[0] = "BLK_TLTB_LS_INTERFACE_BROWSER__TRADEREFNO";
queryFields[1] = "BLK_TLTB_LS_INTERFACE_BROWSER__EVENTSEQNO";
pkFields[1] = "BLK_TLTB_LS_INTERFACE_BROWSER__EVENTSEQNO";
queryFields[2] = "BLK_TLTB_LS_INTERFACE_BROWSER__CUSIPNO";
pkFields[2] = "BLK_TLTB_LS_INTERFACE_BROWSER__CUSIPNO";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_TLTB_LS_INTERFACE_BROWSER":["PROCESSING_STATUS"]};
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
var lovInfoFlds = {"BLK_TLTB_LS_INTERFACE_BROWSER__EVENTSEQNO__LOV_ESN":["BLK_TLTB_LS_INTERFACE_BROWSER__EVENTSEQNO~","BLK_TLTB_LS_INTERFACE_BROWSER__TRADEREFNO!Varchar2","N",""],"BLK_TLTB_LS_INTERFACE_BROWSER__TRADEREFNO__LOV_TRADE":["BLK_TLTB_LS_INTERFACE_BROWSER__TRADEREFNO~","","N",""],"BLK_TLTB_LS_INTERFACE_BROWSER__CUSIPNO__LOV_CUSIP":["BLK_TLTB_LS_INTERFACE_BROWSER__CUSIPNO~","BLK_TLTB_LS_INTERFACE_BROWSER__TRADEREFNO!Varchar2","N",""]};
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
var multipleEntryIDs = new Array("BLK_TLTB_LS_INTERFACE_EXCEPTION","BLK_LBTBS_TRADE_PROCESSING_QUEUE");
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

ArrFuncOrigin["TLDLDIFB"]="KERNEL";
ArrPrntFunc["TLDLDIFB"]="";
ArrPrntOrigin["TLDLDIFB"]="";
ArrRoutingType["TLDLDIFB"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["TLDLDIFB"]="N";
ArrCustomModified["TLDLDIFB"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {};
var scrArgSource = {};
var scrArgVals = {};
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