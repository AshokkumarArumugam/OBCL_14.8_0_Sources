/***************************************************************************************************************************
**  This source is part of the Oracle Banking Software Product. 
**  Copyright (c) 2008 ,2025, Oracle and/or its affiliates.
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
**  File Name          : OLDFFMCU_SYS.js
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
var fieldNameArray = {"BLK_FFMCU_MAS":"FFMTREFNO~COUNTERPARTY~INDUSTRY_CODE~MSGMODULE~CONTRACTREFNO~RECEIVERTYPE~ENTITYTYPE~NAME~MESSAGETYPE~HOLD~RELEVENT~RELEVENTDESC~BILLINGDATE~PROPERTYCODE~TEMPLATECODE~MESSAGE~MAKERID~MAKERDTSTAMP~CHECKERID~CHECKERDTSTAMP~TXNSTAT~AUTHSTAT~FACILITYREFNO~TRANCHEREF~PRODTYPE~BRANCH~MSG_TYPE~NODE~NO_OF_COPIES~PRIORITY~PRODUCT~TESTING_STATUS~TESTWORD_STATUS~NAMED_AGENT~ESN~SUBSYSSTAT~LOCATION~ORIGACTION~BORROWER_LINKED~DIARY_EVENT_SEQ_NO~DIARY_LINKED~CCY","BLK_BORR_DET":"BRR_COUNTERPARTY~BRR_CNPTY_NAME~BRR_PARTYMSGFLG~BRR_FFTREFNO~BRR_CONTREF","BLK_ENT_DET":"ENTITY~ENT_NAME~ENT_MEDIA~ENT_PRIMARY~ENT_MSG_FLG~ENT_CONTREF~ENT_COUNTERPARTY~ENT_FFTREFNO","BLK_MSG_PREVIEW_MAS":"PRVWM_FFMTREF~PRVWM_CONTREF~PRVWM_ESN","BLK_MSG_PREVIEW":"PRVW_DCN~PRVW_BRROWER~PRVW_MSG~PRVW_ESN~PRVW_REF","BLK_FFMTBR_SUMMARY":"AUTHSTAT~CONTRACTREFNO~COUNTERPARTY~EMAIL~ENTITYTYPE~EVENTSEQNO~FFMTREFNO~HOLD~MESSAGETYPE~MSGMODULE~RECEIVERTYPE~RELEVENT~SUMBRN"};

var multipleEntryPageSize = {"BLK_BORR_DET" :"15" ,"BLK_ENT_DET" :"15" };

var multipleEntrySVBlocks = "BLK_MSG_PREVIEW";

var tabMEBlks = {"CVS_FFMCU__TAB_MAIN":"BLK_BORR_DET~BLK_ENT_DET"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_FFMCU_MAS">FFMTREFNO~COUNTERPARTY~INDUSTRY_CODE~MSGMODULE~CONTRACTREFNO~RECEIVERTYPE~ENTITYTYPE~NAME~MESSAGETYPE~HOLD~RELEVENT~RELEVENTDESC~BILLINGDATE~PROPERTYCODE~TEMPLATECODE~MESSAGE~MAKERID~MAKERDTSTAMP~CHECKERID~CHECKERDTSTAMP~TXNSTAT~AUTHSTAT~FACILITYREFNO~TRANCHEREF~PRODTYPE~BRANCH~MSG_TYPE~NODE~NO_OF_COPIES~PRIORITY~PRODUCT~TESTING_STATUS~TESTWORD_STATUS~NAMED_AGENT~ESN~SUBSYSSTAT~LOCATION~ORIGACTION~BORROWER_LINKED~DIARY_EVENT_SEQ_NO~DIARY_LINKED~CCY</FN>'; 
msgxml += '      <FN PARENT="BLK_FFMCU_MAS" RELATION_TYPE="N" TYPE="BLK_BORR_DET">BRR_COUNTERPARTY~BRR_CNPTY_NAME~BRR_PARTYMSGFLG~BRR_FFTREFNO~BRR_CONTREF</FN>'; 
msgxml += '      <FN PARENT="BLK_BORR_DET" RELATION_TYPE="N" TYPE="BLK_ENT_DET">ENTITY~ENT_NAME~ENT_MEDIA~ENT_PRIMARY~ENT_MSG_FLG~ENT_CONTREF~ENT_COUNTERPARTY~ENT_FFTREFNO</FN>'; 
msgxml += '      <FN PARENT="BLK_FFMCU_MAS" RELATION_TYPE="1" TYPE="BLK_MSG_PREVIEW_MAS">PRVWM_FFMTREF~PRVWM_CONTREF~PRVWM_ESN</FN>'; 
msgxml += '      <FN PARENT="BLK_MSG_PREVIEW_MAS" RELATION_TYPE="N" TYPE="BLK_MSG_PREVIEW">PRVW_DCN~PRVW_BRROWER~PRVW_MSG~PRVW_ESN~PRVW_REF</FN>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_FFMTBR_SUMMARY">AUTHSTAT~CONTRACTREFNO~COUNTERPARTY~EMAIL~ENTITYTYPE~EVENTSEQNO~FFMTREFNO~HOLD~MESSAGETYPE~MSGMODULE~RECEIVERTYPE~RELEVENT~SUMBRN</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_FFMCU";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** FCJ XML FOR SUMMARY SCREEN *****
//----------------------------------------------------------------------------------------------------------------------
var msgxml_sum=""; 
msgxml_sum += '    <FLD>'; 
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_FFMTBR_SUMMARY">AUTHSTAT~MSGMODULE~HOLD~EMAIL~FFMTREFNO~CONTRACTREFNO~EVENTSEQNO~MESSAGETYPE~COUNTERPARTY~RELEVENT~RECEIVERTYPE~ENTITYTYPE~SUMBRN</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "OLDFFMCU";
var defaultWhereClause = "BRANCH = GLOBAL.CURRENT_BRANCH";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_FFMTBR_SUMMARY";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_FFMCU_MAS" : "","BLK_BORR_DET" : "BLK_FFMCU_MAS~N","BLK_ENT_DET" : "BLK_BORR_DET~N","BLK_MSG_PREVIEW_MAS" : "BLK_FFMCU_MAS~1","BLK_MSG_PREVIEW" : "BLK_MSG_PREVIEW_MAS~N","BLK_FFMTBR_SUMMARY" : ""}; 

 var dataSrcLocationArray = new Array("BLK_FFMCU_MAS","BLK_BORR_DET","BLK_ENT_DET","BLK_MSG_PREVIEW_MAS","BLK_MSG_PREVIEW","BLK_FFMTBR_SUMMARY"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLDFFMCU.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLDFFMCU.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_FFMCU_MAS__CONTRACTREFNO";
pkFields[0] = "BLK_FFMCU_MAS__CONTRACTREFNO";
queryFields[1] = "BLK_FFMCU_MAS__FFMTREFNO";
pkFields[1] = "BLK_FFMCU_MAS__FFMTREFNO";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
var modifyAmendArr = new Array(); 
var closeAmendArr = new Array(); 
var reopenAmendArr = new Array(); 
var reverseAmendArr = new Array(); 
var deleteAmendArr = new Array(); 
var rolloverAmendArr = new Array(); 
var confirmAmendArr = new Array(); 
var liquidateAmendArr = new Array(); 
//***** Fields Amendable while Query *****
var queryAmendArr = {"BLK_FFMCU_MAS":["BTN_MSG_PREVIEW"]};
var authorizeAmendArr = new Array(); 
//----------------------------------------------------------------------------------------------------------------------

var subsysArr    = new Array(); 

//----------------------------------------------------------------------------------------------------------------------

//***** CODE FOR LOVs *****
//----------------------------------------------------------------------------------------------------------------------
var lovInfoFlds = {"BLK_FFMCU_MAS__COUNTERPARTY__LOV_CNPTY":["BLK_FFMCU_MAS__COUNTERPARTY~BLK_FFMCU_MAS__NAME~","","N~N",""],"BLK_FFMCU_MAS__ENTITYTYPE__LOV_ENTITY_TYPE":["BLK_FFMCU_MAS__ENTITYTYPE~","BLK_FFMCU_MAS__COUNTERPARTY!VARCHAR2","N",""],"BLK_FFMCU_MAS__RELEVENT__LOV_EVENT":["BLK_FFMCU_MAS__RELEVENT~BLK_FFMCU_MAS__RELEVENTDESC~","","N~N",""],"BLK_FFMCU_MAS__PROPERTYCODE__LOV_PROPERTY_CODE":["BLK_FFMCU_MAS__PROPERTYCODE~","BLK_FFMCU_MAS__CONTRACTREFNO!VARCHAR2","N",""],"BLK_FFMCU_MAS__TEMPLATECODE__LOV_TEMPLATE":["BLK_FFMCU_MAS__TEMPLATECODE~~BLK_FFMCU_MAS__MESSAGE~","BLK_FFMCU_MAS__MESSAGETYPE!VARCHAR2~BLK_FFMCU_MAS__RELEVENT!VARCHAR2~BLK_FFMCU_MAS__NAMED_AGENT!VARCHAR2~BLK_FFMCU_MAS__NAMED_AGENT!VARCHAR2~BLK_FFMCU_MAS__NAMED_AGENT!VARCHAR2","N~N~N",""],"BLK_BORR_DET__BRR_COUNTERPARTY__LOV_BRR_NAME":["BLK_BORR_DET__BRR_COUNTERPARTY~BLK_BORR_DET__BRR_CNPTY_NAME~","BLK_FFMCU_MAS__CONTRACTREFNO!VARCHAR2~BLK_FFMCU_MAS__CONTRACTREFNO!VARCHAR2~BLK_FFMCU_MAS__CONTRACTREFNO!VARCHAR2~BLK_FFMCU_MAS__FFMTREFNO!VARCHAR2~BLK_FFMCU_MAS__MSGMODULE!VARCHAR2~BLK_FFMCU_MAS__CONTRACTREFNO!VARCHAR2~BLK_FFMCU_MAS__CONTRACTREFNO!VARCHAR2~BLK_FFMCU_MAS__CONTRACTREFNO!VARCHAR2~BLK_FFMCU_MAS__MSGMODULE!VARCHAR2","N~N",""],"BLK_ENT_DET__ENTITY__LOV_ENTITY":["BLK_ENT_DET__ENTITY~BLK_ENT_DET__ENT_NAME~~BLK_ENT_DET__ENT_PRIMARY~","BLK_FFMCU_MAS__COUNTERPARTY!VARCHAR2~BLK_FFMCU_MAS__RECEIVERTYPE!VARCHAR2~BLK_FFMCU_MAS__RECEIVERTYPE!VARCHAR2~BLK_FFMCU_MAS__ENTITYTYPE!VARCHAR2","N~N~N~N",""],"BLK_ENT_DET__ENT_MEDIA__LOV_MEDIA":["BLK_ENT_DET__ENT_MEDIA~~","","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_BORR_DET","BLK_ENT_DET");
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

ArrFuncOrigin["OLDFFMCU"]="KERNEL";
ArrPrntFunc["OLDFFMCU"]="";
ArrPrntOrigin["OLDFFMCU"]="";
ArrRoutingType["OLDFFMCU"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLDFFMCU"]="N";
ArrCustomModified["OLDFFMCU"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_PREVIEW":"FFMTREF~CONTREF~ESN"};
var scrArgSource = {"CVS_PREVIEW":"BLK_FFMCU_MAS__FFMTREFNO~BLK_FFMCU_MAS__CONTRACTREFNO~BLK_FFMCU_MAS__ESN"};
var scrArgVals = {"CVS_PREVIEW":"~~"};
var scrArgDest = {"CVS_PREVIEW":"BLK_MSG_PREVIEW_MAS__PRVWM_FFMTREF~BLK_MSG_PREVIEW_MAS__PRVWM_CONTREF~BLK_MSG_PREVIEW_MAS__PRVWM_ESN"};
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