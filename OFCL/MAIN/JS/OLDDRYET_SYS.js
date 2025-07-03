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
**  File Name          : OLDDRYET_SYS.js
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
var fieldNameArray = {"BLK_CONTRACT_DETAILS":"CONREFNUM~DESN~EVENTTYP~TEMPLT~STARTDT~ENDDT~FREQ~NARRATIVE1~NARRATIVE2~NARRATIVE3~NARRATIVE4~NARRATIVE5~FRQUNIT~NOOFEVE~USERSN~MESSAGECD~CREFNO~USERREFNO~BRAN~DEPT~TRSOURCE~INTEVNT~FACILITREFNO~DRWDWNNO~TRANCHEREFNO~DRWDWNREFNO~DIARYEVENT~EVNTDESC~FIELD_TAG_LIST~AVAILABILITY_FLAG~CONTREFNO~MODULECODE~PRODUCTTYPE~DEPARTMENTCODE~TREASURYSOURCE~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH","BLK_RECEIVER_DETAILS":"CONTRACTNO~DRYSEQNO~RECV~DESSN~RECNAME","BLK_ENTITY_DETAILS":"CONTREFNO~DIARYSSN~RECVR~ENT~PRM~DIARYSUBSEQNO~ENTITYNAME","BLK_OLTWS_FIELDS_TEMP":"FUNCTIONID~CONTRACTREFNO~DIARYEVENTSEQNO~FIELDNO~FIELDTAGNAME~FIELDTAGVAL","BLK_OLTWS_UDF_TEMP":"FUNCTIONID2~CONTRACTREFNO2~DIARYEVENTSEQNO2~FIELDNO2~FIELDTAGNAME2~FIELDTAGVAL2"};

var multipleEntryPageSize = {"BLK_RECEIVER_DETAILS" :"15" ,"BLK_ENTITY_DETAILS" :"15" ,"BLK_OLTWS_FIELDS_TEMP" :"15" ,"BLK_OLTWS_UDF_TEMP" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_RECEIVER":"BLK_RECEIVER_DETAILS~BLK_ENTITY_DETAILS","CVS_MAIN__TAB_FIELDS":"BLK_OLTWS_FIELDS_TEMP","CVS_MAIN__TAB_UDF":"BLK_OLTWS_UDF_TEMP"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_CONTRACT_DETAILS">CONREFNUM~DESN~EVENTTYP~TEMPLT~STARTDT~ENDDT~FREQ~NARRATIVE1~NARRATIVE2~NARRATIVE3~NARRATIVE4~NARRATIVE5~FRQUNIT~NOOFEVE~USERSN~MESSAGECD~CREFNO~USERREFNO~BRAN~DEPT~TRSOURCE~INTEVNT~FACILITREFNO~DRWDWNNO~TRANCHEREFNO~DRWDWNREFNO~DIARYEVENT~EVNTDESC~FIELD_TAG_LIST~AVAILABILITY_FLAG~CONTREFNO~MODULECODE~PRODUCTTYPE~DEPARTMENTCODE~TREASURYSOURCE~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
msgxml += '      <FN PARENT="BLK_CONTRACT_DETAILS" RELATION_TYPE="N" TYPE="BLK_RECEIVER_DETAILS">CONTRACTNO~DRYSEQNO~RECV~DESSN~RECNAME</FN>'; 
msgxml += '      <FN PARENT="BLK_RECEIVER_DETAILS" RELATION_TYPE="N" TYPE="BLK_ENTITY_DETAILS">CONTREFNO~DIARYSSN~RECVR~ENT~PRM~DIARYSUBSEQNO~ENTITYNAME</FN>'; 
msgxml += '      <FN PARENT="BLK_CONTRACT_DETAILS" RELATION_TYPE="N" TYPE="BLK_OLTWS_FIELDS_TEMP">FUNCTIONID~CONTRACTREFNO~DIARYEVENTSEQNO~FIELDNO~FIELDTAGNAME~FIELDTAGVAL</FN>'; 
msgxml += '      <FN PARENT="BLK_CONTRACT_DETAILS" RELATION_TYPE="N" TYPE="BLK_OLTWS_UDF_TEMP">FUNCTIONID2~CONTRACTREFNO2~DIARYEVENTSEQNO2~FIELDNO2~FIELDTAGNAME2~FIELDTAGVAL2</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_SUMMARY_DETAILS">AUTHSTAT~TXNSTAT~CONREFNUM~DESN~DEVENT~START_DATE~END_DATE~FREQUENCY</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "OLDDRYET";
var defaultWhereClause = "sypks_utils.get_branch(CONTRACT_REF_NO) = GLOBAL.CURRENT_BRANCH and exists (Select 1 From OLVW_USER_ACCESS_PRODUCTS Where PRODUCT_CODE = sypks_utils.get_product(CONTRACT_REF_NO) AND USER_ID = global.user_id)";
var defaultOrderByClause ="";
var multiBrnWhereClause ="sypks_utils.get_branch(CONTRACT_REF_NO) IN (SELECT BRANCH_CODE FROM SMVW_USER_BRANCHES WHERE USER_ID = GLOBAL.USER_ID INTERSECT SELECT BRANCH_CODE FROM SMTB_USER_ROLE WHERE USER_ID = GLOBAL.USER_ID UNION SELECT BRANCH_CODE FROM SMVWS_USER_CENTRAL_ROLES WHERE USER_ID = GLOBAL.USER_ID) and exists (Select 1 From OLVW_USER_ACCESS_PRODUCTS Where PRODUCT_CODE = sypks_utils.get_product(CONTRACT_REF_NO) AND USER_ID = global.user_id)";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_SUMMARY_DETAILS";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_CONTRACT_DETAILS" : "","BLK_RECEIVER_DETAILS" : "BLK_CONTRACT_DETAILS~N","BLK_ENTITY_DETAILS" : "BLK_RECEIVER_DETAILS~N","BLK_OLTWS_FIELDS_TEMP" : "BLK_CONTRACT_DETAILS~N","BLK_OLTWS_UDF_TEMP" : "BLK_CONTRACT_DETAILS~N"}; 

 var dataSrcLocationArray = new Array("BLK_CONTRACT_DETAILS","BLK_RECEIVER_DETAILS","BLK_ENTITY_DETAILS","BLK_OLTWS_FIELDS_TEMP","BLK_OLTWS_UDF_TEMP"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLDDRYET.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLDDRYET.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_CONTRACT_DETAILS__CONREFNUM";
pkFields[0] = "BLK_CONTRACT_DETAILS__CONREFNUM";
queryFields[1] = "BLK_CONTRACT_DETAILS__DESN";
pkFields[1] = "BLK_CONTRACT_DETAILS__DESN";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_CONTRACT_DETAILS":["AVAILABILITY_FLAG","BTN_POPULATE","ENDDTI","FIELD_TAG_LIST","FRQUNIT","NARRATIVE1","NARRATIVE2","NARRATIVE3","NARRATIVE4","NARRATIVE5","NOOFEVE"],"BLK_ENTITY_DETAILS":["CONTREFNO","DIARYSSN","DIARYSUBSEQNO","ENT","ENTITYNAME","PRM","RECVR"],"BLK_OLTWS_FIELDS_TEMP":["CONTRACTREFNO","DIARYEVENTSEQNO","FIELDNO","FIELDTAGNAME","FIELDTAGVAL","FUNCTIONID"],"BLK_OLTWS_UDF_TEMP":["CONTRACTREFNO2","DIARYEVENTSEQNO2","FIELDNO2","FIELDTAGNAME2","FIELDTAGVAL2","FUNCTIONID2"],"BLK_RECEIVER_DETAILS":["CONTRACTNO","DESSN","DRYSEQNO","RECNAME","RECV"]};
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
var lovInfoFlds = {"BLK_CONTRACT_DETAILS__CONREFNUM__LOV_REFNO":["BLK_CONTRACT_DETAILS__CONREFNUM~BLK_CONTRACT_DETAILS__USERREFNO~~~~","","N~N~N~N~N",""],"BLK_CONTRACT_DETAILS__TEMPLT__LOV_TEMPLATE":["BLK_CONTRACT_DETAILS__TEMPLT~~","","N~N",""],"BLK_CONTRACT_DETAILS__DIARYEVENT__LOV_EVENT":["BLK_CONTRACT_DETAILS__DIARYEVENT~BLK_CONTRACT_DETAILS__EVNTDESC~","BLK_CONTRACT_DETAILS__CONREFNUM!VARCHAR2~BLK_CONTRACT_DETAILS__CONREFNUM!VARCHAR2","N~N",""],"BLK_RECEIVER_DETAILS__RECV__LOV_RECEIVER":["BLK_RECEIVER_DETAILS__RECV~~BLK_RECEIVER_DETAILS__RECNAME~","","N~N~N",""],"BLK_ENTITY_DETAILS__ENT__LOV_ENTITY":["BLK_ENTITY_DETAILS__ENT~BLK_ENTITY_DETAILS__ENTITYNAME~~","BLK_RECEIVER_DETAILS__RECV!","N~N~N",""]};
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
var multipleEntryIDs = new Array("BLK_RECEIVER_DETAILS","BLK_ENTITY_DETAILS","BLK_OLTWS_FIELDS_TEMP","BLK_OLTWS_UDF_TEMP");
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

ArrFuncOrigin["OLDDRYET"]="KERNEL";
ArrPrntFunc["OLDDRYET"]="";
ArrPrntOrigin["OLDDRYET"]="";
ArrRoutingType["OLDDRYET"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLDDRYET"]="N";
ArrCustomModified["OLDDRYET"]="N";

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