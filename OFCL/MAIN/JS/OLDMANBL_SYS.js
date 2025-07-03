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
**  File Name          : OLDMANBL_SYS.js
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
var fieldNameArray = {"BLK_MANUAL_BILLING_MASTER":"CONTRACTREFNO~PERIODIND~BILLINGESN","BLK_MANUAL_BILLING_DETAIL":"CONTRACTREFNO~EVENTSEQNO~COMPONENT~STARTDATE~ENDDATE~BILLINGDATE~BILLINGESN","BLK_CONTRACT_EVENT_LOG":"MODULE~CONTRACTREFNO~MAKERID~MAKERDTSTAMP~CHECKERID~CHECKERDTSTAMP~EVENTSEQNO~EVENTDATE~EVENTCODE~CONTRACTSTATUS~AUTHSTATUS~NEWVERSIONINDICATOR~REVERSEDEVENTSEQNO~EVENTVALUEDATE~ECASTATUS~WORKFLOWSTATUS"};

var multipleEntryPageSize = {"BLK_MANUAL_BILLING_DETAIL" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_CONTRACT__TAB_MAIN":"BLK_MANUAL_BILLING_DETAIL"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_MANUAL_BILLING_MASTER">CONTRACTREFNO~PERIODIND~BILLINGESN</FN>'; 
msgxml += '      <FN PARENT="BLK_MANUAL_BILLING_MASTER" RELATION_TYPE="N" TYPE="BLK_MANUAL_BILLING_DETAIL">CONTRACTREFNO~EVENTSEQNO~COMPONENT~STARTDATE~ENDDATE~BILLINGDATE~BILLINGESN</FN>'; 
msgxml += '      <FN PARENT="BLK_MANUAL_BILLING_MASTER" RELATION_TYPE="1" TYPE="BLK_CONTRACT_EVENT_LOG">MODULE~CONTRACTREFNO~MAKERID~MAKERDTSTAMP~CHECKERID~CHECKERDTSTAMP~EVENTSEQNO~EVENTDATE~EVENTCODE~CONTRACTSTATUS~AUTHSTATUS~NEWVERSIONINDICATOR~REVERSEDEVENTSEQNO~EVENTVALUEDATE~ECASTATUS~WORKFLOWSTATUS</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_CONTRACT";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** FCJ XML FOR SUMMARY SCREEN *****
//----------------------------------------------------------------------------------------------------------------------
var msgxml_sum=""; 
msgxml_sum += '    <FLD>'; 
msgxml_sum += '      <FN PARENT="BLK_MANUAL_BILLING_MASTER" RELATION_TYPE="1" TYPE="BLK_OLVWS_CONT_MAN_BILL_GEN_SUMMARY">CONTRACTREFNO~CONTSTAT~BILLINGESN~AUTHSTAT</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "OLDMANBL";
var defaultWhereClause = "sypks_utils.get_branch(CONTRACT_REF_NO)=GLOBAL.CURRENT_BRANCH";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_OLVWS_CONT_MAN_BILL_GEN_SUMMARY";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_MANUAL_BILLING_MASTER" : "","BLK_MANUAL_BILLING_DETAIL" : "BLK_MANUAL_BILLING_MASTER~N","BLK_CONTRACT_EVENT_LOG" : "BLK_MANUAL_BILLING_MASTER~1"}; 

 var dataSrcLocationArray = new Array("BLK_MANUAL_BILLING_MASTER","BLK_MANUAL_BILLING_DETAIL","BLK_CONTRACT_EVENT_LOG"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLDMANBL.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLDMANBL.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_MANUAL_BILLING_MASTER__BILLINGESN";
pkFields[0] = "BLK_MANUAL_BILLING_MASTER__BILLINGESN";
queryFields[1] = "BLK_MANUAL_BILLING_MASTER__CONTRACTREFNO";
pkFields[1] = "BLK_MANUAL_BILLING_MASTER__CONTRACTREFNO";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_MANUAL_BILLING_DETAIL":["ENDDATEI"]};
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
var lovInfoFlds = {"BLK_MANUAL_BILLING_MASTER__CONTRACTREFNO__LOV_CONTRACT":["BLK_MANUAL_BILLING_MASTER__CONTRACTREFNO~","","N",""]};
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
var multipleEntryIDs = new Array("BLK_MANUAL_BILLING_DETAIL");
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

ArrFuncOrigin["OLDMANBL"]="KERNEL";
ArrPrntFunc["OLDMANBL"]="";
ArrPrntOrigin["OLDMANBL"]="";
ArrRoutingType["OLDMANBL"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLDMANBL"]="N";
ArrCustomModified["OLDMANBL"]="N";

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