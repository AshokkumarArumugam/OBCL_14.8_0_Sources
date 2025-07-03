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
**  File Name          : OLDDRYST_SYS.js
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
var fieldNameArray = {"BLK_OLTBS_CONT_DIARY_STATUS":"DIARYEVENTCODE~EFFECTIVEDATE~INTERNALEVENT~GEN_MESSAGE~COMPLETED~DIARYSEQNO~DIARYSUBSEQNO~DATESENT~DATERECEIVED~TREASURYSOURCE~DEPARTMENT~BRANCH~MESSAGE~STATUS~DOCSENTTOPARTICIPANT~DOCSENTDATE~DOCRECEIVEDATE~CONTRACTREFNO~USERREFNO~MODULE_CODE~EVENT_DESC~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH","BLK_RECEIVERS":"TXTCUSTOMER~CONTRACTREFNO~DIARYEVENTSEQNO~RECEIVER~DIARYEVENTSUBSEQNO","BLK_ENTITY":"ENTITYNAME~CONTRACTREFNO~DIARYEVENTSEQNO~RECEIVER~ENTITY~PRIMARY~DIARYEVENTSUBSEQNO","BLK_DIARY_EVENT":"NARRATIVE5~NARRATIVE4~NARRATIVE3~NARRATIVE2~NARRATIVE1~DIARYEVENTSEQNO~CONTRACTREFNO","BLK_OLTWS_FIELDS_TEMP":"FUNCTIONID~CONTRACTREFNO~DIARYEVENTSEQNO~FIELDNO~FIELDTAGNAME~FIELDTAGVAL","BLK_OLTWS_UDF_TEMP":"FUNCTIONID~CONTRACTREFNO~DIARYEVENTSEQNO~FIELDNO~FIELDTAGNAME~FIELDTAGVAL","BLK_OLTBS_CONTRACT_MASTER":"CONTRACTREFNO~VERSIONNO~USERREFNO~COUNTERPARTY~CURRENCY~AMOUNT~EVENTSEQNO","BLK_OLTBS_DLY_MSG_OUT":"AMOUNT~CCY~CONTRACTREFNO~COUNTERPARTY~USERREFNO~DCN~ESN~REFERENCENO~RUNNINGNO","BLK_MSVWS_DLY_MSG":"BRANCH~DCN~MESSAGE~RUNNINGNO~REFERENCENO","BLK_MSVWS_FPML_MSG":"MESSAGE~RUNNINGNO~DCN~BRANCH~INOUT"};

var multipleEntryPageSize = {"BLK_OLTWS_FIELDS_TEMP" :"15" ,"BLK_RECEIVERS" :"15" ,"BLK_ENTITY" :"15" ,"BLK_OLTWS_UDF_TEMP" :"15" };

var multipleEntrySVBlocks = "BLK_MSVWS_DLY_MSG";

var tabMEBlks = {"CVS_STATUS__TAB_FIELDTAGS":"BLK_OLTWS_FIELDS_TEMP","CVS_STATUS__TAB_RECEIVER":"BLK_RECEIVERS~BLK_ENTITY","CVS_STATUS__TAB_UDFS":"BLK_OLTWS_UDF_TEMP"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTBS_CONT_DIARY_STATUS">DIARYEVENTCODE~EFFECTIVEDATE~INTERNALEVENT~GEN_MESSAGE~COMPLETED~DIARYSEQNO~DIARYSUBSEQNO~DATESENT~DATERECEIVED~TREASURYSOURCE~DEPARTMENT~BRANCH~MESSAGE~STATUS~DOCSENTTOPARTICIPANT~DOCSENTDATE~DOCRECEIVEDATE~CONTRACTREFNO~USERREFNO~MODULE_CODE~EVENT_DESC~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONT_DIARY_STATUS" RELATION_TYPE="N" TYPE="BLK_RECEIVERS">TXTCUSTOMER~CONTRACTREFNO~DIARYEVENTSEQNO~RECEIVER~DIARYEVENTSUBSEQNO</FN>'; 
msgxml += '      <FN PARENT="BLK_RECEIVERS" RELATION_TYPE="N" TYPE="BLK_ENTITY">ENTITYNAME~CONTRACTREFNO~DIARYEVENTSEQNO~RECEIVER~ENTITY~PRIMARY~DIARYEVENTSUBSEQNO</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONT_DIARY_STATUS" RELATION_TYPE="1" TYPE="BLK_DIARY_EVENT">NARRATIVE5~NARRATIVE4~NARRATIVE3~NARRATIVE2~NARRATIVE1~DIARYEVENTSEQNO~CONTRACTREFNO</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONT_DIARY_STATUS" RELATION_TYPE="N" TYPE="BLK_OLTWS_FIELDS_TEMP">FUNCTIONID~CONTRACTREFNO~DIARYEVENTSEQNO~FIELDNO~FIELDTAGNAME~FIELDTAGVAL</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONT_DIARY_STATUS" RELATION_TYPE="N" TYPE="BLK_OLTWS_UDF_TEMP">FUNCTIONID~CONTRACTREFNO~DIARYEVENTSEQNO~FIELDNO~FIELDTAGNAME~FIELDTAGVAL</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONT_DIARY_STATUS" RELATION_TYPE="1" TYPE="BLK_OLTBS_CONTRACT_MASTER">CONTRACTREFNO~VERSIONNO~USERREFNO~COUNTERPARTY~CURRENCY~AMOUNT~EVENTSEQNO</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONT_DIARY_STATUS" RELATION_TYPE="1" TYPE="BLK_OLTBS_DLY_MSG_OUT">AMOUNT~CCY~CONTRACTREFNO~COUNTERPARTY~USERREFNO~DCN~ESN~REFERENCENO~RUNNINGNO</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_DLY_MSG_OUT" RELATION_TYPE="N" TYPE="BLK_MSVWS_DLY_MSG">BRANCH~DCN~MESSAGE~RUNNINGNO~REFERENCENO</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_DLY_MSG_OUT" RELATION_TYPE="N" TYPE="BLK_MSVWS_FPML_MSG">MESSAGE~RUNNINGNO~DCN~BRANCH~INOUT</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_STATUS";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** FCJ XML FOR SUMMARY SCREEN *****
//----------------------------------------------------------------------------------------------------------------------
var msgxml_sum=""; 
msgxml_sum += '    <FLD>'; 
msgxml_sum += '      <FN PARENT="BLK_OLTBS_CONT_DIARY_STATUS" RELATION_TYPE="1" TYPE="BLK_SUMMARYDETAILS">AUTHSTAT~TXNSTAT~CONTRACTREFNO~DIARYSUBSEQNO~DIARYSEQNO</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "OLDDRYST";
var defaultWhereClause = "sypks_utils.get_branch(CONTRACT_REF_NO) = GLOBAL.CURRENT_BRANCH and exists (Select 1 From OLVW_USER_ACCESS_PRODUCTS Where PRODUCT_CODE = sypks_utils.get_product(CONTRACT_REF_NO) AND USER_ID = global.user_id)";
var defaultOrderByClause ="";
var multiBrnWhereClause ="sypks_utils.get_branch(CONTRACT_REF_NO) IN (SELECT BRANCH_CODE FROM SMVW_USER_BRANCHES WHERE USER_ID = GLOBAL.USER_ID INTERSECT SELECT BRANCH_CODE FROM SMTB_USER_ROLE WHERE USER_ID = GLOBAL.USER_ID UNION SELECT BRANCH_CODE FROM SMVWS_USER_CENTRAL_ROLES WHERE USER_ID = GLOBAL.USER_ID) and exists (Select 1 From OLVW_USER_ACCESS_PRODUCTS Where PRODUCT_CODE = sypks_utils.get_product(CONTRACT_REF_NO) AND USER_ID = global.user_id)";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_SUMMARYDETAILS";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_OLTBS_CONT_DIARY_STATUS" : "","BLK_RECEIVERS" : "BLK_OLTBS_CONT_DIARY_STATUS~N","BLK_ENTITY" : "BLK_RECEIVERS~N","BLK_DIARY_EVENT" : "BLK_OLTBS_CONT_DIARY_STATUS~1","BLK_OLTWS_FIELDS_TEMP" : "BLK_OLTBS_CONT_DIARY_STATUS~N","BLK_OLTWS_UDF_TEMP" : "BLK_OLTBS_CONT_DIARY_STATUS~N","BLK_OLTBS_CONTRACT_MASTER" : "BLK_OLTBS_CONT_DIARY_STATUS~1","BLK_OLTBS_DLY_MSG_OUT" : "BLK_OLTBS_CONT_DIARY_STATUS~1","BLK_MSVWS_DLY_MSG" : "BLK_OLTBS_DLY_MSG_OUT~N","BLK_MSVWS_FPML_MSG" : "BLK_OLTBS_DLY_MSG_OUT~N"}; 

 var dataSrcLocationArray = new Array("BLK_OLTBS_CONT_DIARY_STATUS","BLK_RECEIVERS","BLK_ENTITY","BLK_DIARY_EVENT","BLK_OLTWS_FIELDS_TEMP","BLK_OLTWS_UDF_TEMP","BLK_OLTBS_CONTRACT_MASTER","BLK_OLTBS_DLY_MSG_OUT","BLK_MSVWS_DLY_MSG","BLK_MSVWS_FPML_MSG"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLDDRYST.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLDDRYST.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_OLTBS_CONT_DIARY_STATUS__CONTRACTREFNO";
pkFields[0] = "BLK_OLTBS_CONT_DIARY_STATUS__CONTRACTREFNO";
queryFields[1] = "BLK_OLTBS_CONT_DIARY_STATUS__DIARYSEQNO";
pkFields[1] = "BLK_OLTBS_CONT_DIARY_STATUS__DIARYSEQNO";
queryFields[2] = "BLK_OLTBS_CONT_DIARY_STATUS__DIARYSUBSEQNO";
pkFields[2] = "BLK_OLTBS_CONT_DIARY_STATUS__DIARYSUBSEQNO";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_DIARY_EVENT":["CONTRACTREFNO","DIARYEVENTSEQNO","NARRATIVE1","NARRATIVE2","NARRATIVE3","NARRATIVE4","NARRATIVE5"],"BLK_ENTITY":["CONTRACTREFNO","DIARYEVENTSEQNO","DIARYEVENTSUBSEQNO","ENTITY","ENTITYNAME","PRIMARY","RECEIVER"],"BLK_OLTBS_CONT_DIARY_STATUS":["COMPLETED","DATERECEIVEDI","DATESENTI","DOCRECEIVEDATE","DOCSENTDATE","DOCSENTTOPARTICIPANT","GEN_MESSAGE","STATUS"],"BLK_OLTWS_FIELDS_TEMP":["CONTRACTREFNO","DIARYEVENTSEQNO","FIELDNO","FIELDTAGNAME","FIELDTAGVAL","FUNCTIONID"],"BLK_OLTWS_UDF_TEMP":["CONTRACTREFNO","DIARYEVENTSEQNO","FIELDNO","FIELDTAGNAME","FIELDTAGVAL","FUNCTIONID"],"BLK_RECEIVERS":["CONTRACTREFNO","DIARYEVENTSEQNO","DIARYEVENTSUBSEQNO","RECEIVER","TXTCUSTOMER"]};
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
var lovInfoFlds = {"BLK_OLTBS_CONT_DIARY_STATUS__CONTRACTREFNO__LOV_USER":["BLK_OLTBS_CONT_DIARY_STATUS__CONTRACTREFNO~BLK_OLTBS_CONT_DIARY_STATUS__DIARYSEQNO~BLK_OLTBS_CONT_DIARY_STATUS__DIARYSUBSEQNO~BLK_OLTBS_CONT_DIARY_STATUS__TREASURYSOURCE~BLK_OLTBS_CONT_DIARY_STATUS__DEPARTMENT~","BLK_OLTBS_CONT_DIARY_STATUS__BRANCH!VARCHAR2","N~N~N~N~N",""],"BLK_RECEIVERS__RECEIVER__LOV_RECEIVER":["BLK_RECEIVERS__RECEIVER~~BLK_RECEIVERS__TXTCUSTOMER~","","N~N~N",""],"BLK_ENTITY__ENTITY__LOV_ENTITY":["BLK_ENTITY__ENTITY~BLK_ENTITY__ENTITYNAME~~","BLK_RECEIVERS__RECEIVER!VARCHAR2","N~N~N",""],"BLK_SUMMARYDETAILS__CONTRACTREFNO__LOV_SUMMARY":["BLK_SUMMARYDETAILS__CONTRACTREFNO~BLK_SUMMARYDETAILS__DIARYSEQNO~BLK_SUMMARYDETAILS__DIARYSUBSEQNO~","","N~N~N",""],"BLK_SUMMARYDETAILS__CONTRACTREFNO__LOV_SUMMARY_S":["BLK_SUMMARYDETAILS__CONTRACTREFNO~BLK_SUMMARYDETAILS__DIARYSEQNO~BLK_SUMMARYDETAILS__DIARYSUBSEQNO~~","","N~N~N",""]};
var offlineLovInfoFlds = {};
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR TABS *****
//----------------------------------------------------------------------------------------------------------------------
var strHeaderTabId = 'TAB_HEADER';
var strFooterTabId = 'TAB_FOOTER';
var strCurrentTabId = 'TAB_FIELDTAGS';
//--------------------------------------------
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------
var multipleEntryIDs = new Array("BLK_OLTWS_FIELDS_TEMP","BLK_RECEIVERS","BLK_ENTITY","BLK_OLTWS_UDF_TEMP");
var multipleEntryArray = new Array();
var multipleEntryCells = new Array();
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY VIEW SINGLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR ATTACHED CALLFORMS *****
 //----------------------------------------------------------------------------------------------------------------------

 var CallFormArray= new Array("OLCMESVW~BLK_OLTBS_CONT_DIARY_STATUS"); 

 var CallFormRelat=new Array("OLTBS_CONTRACT_DIARY_STATUS.CONTRACT_REF_NO=OLTBS_DLY_MSG_OUT.REFERENCE_NO"); 

 var CallRelatType= new Array("1"); 


 var ArrFuncOrigin=new Array();
 var ArrPrntFunc=new Array();
 var ArrPrntOrigin=new Array();
 var ArrRoutingType=new Array();


 // Code for Loading Cluster/Custom js File Starts
 var ArrClusterModified=new Array();
 var ArrCustomModified=new Array();
 // Code for Loading Cluster/Custom js File ends

ArrFuncOrigin["OLDDRYST"]="KERNEL";
ArrPrntFunc["OLDDRYST"]="";
ArrPrntOrigin["OLDDRYST"]="";
ArrRoutingType["OLDDRYST"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLDDRYST"]="N";
ArrCustomModified["OLDDRYST"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_MESSAGE":"CONTRACTREFNO","OLCMESVW":"CONTREFNO~"};
var scrArgSource = {"CVS_MESSAGE":"BLK_OLTBS_CONT_DIARY_STATUS__CONTRACTREFNO","OLCMESVW":"BLK_OLTBS_CONT_DIARY_STATUS__CONTRACTREFNO~"};
var scrArgVals = {"CVS_MESSAGE":"","OLCMESVW":"~"};
var scrArgDest = {"CVS_MESSAGE":"BLK_OLTBS_DLY_MSG_OUT__REFERENCENO"};
//***** CODE FOR SUB-SYSTEM DEPENDENT  FIELDS   *****
//----------------------------------------------------------------------------------------------------------------------
var dpndntOnFlds = {"OLCMESVW":""};
var dpndntOnSrvs = {"OLCMESVW":""};
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