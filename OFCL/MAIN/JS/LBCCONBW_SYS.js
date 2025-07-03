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
**  File Name          : LBCCONBW_SYS.js
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
var criteriaSearch  = '';
//----------------------------------------------------------------------------------------------------------------------
//***** FCJ XML FOR THE SCREEN *****
//----------------------------------------------------------------------------------------------------------------------
var fieldNameArray = {"BLK_HEADER_CONBW":"CONTRACT_REF_NO~LATEST_EVENT_SEQ_NO~LATEST_VERSION_NO~MODULE_CODE~PRODUCT_CODE~USER_REF_NO~COUNTERPARTY~DRAWDOWN_NO~PRODUCT_TYPE~CONTRACT_CCY","BLK_CONBW":"CONTRACT_REF_NO~EVENT_SEQ_NO~CUSTOMER_NO~VERSION_NO~BLOCKED~PRODUCT_RESTRICTION~CONTRACTUAL~SSI_COUNTERPARTY~NETTING_PREF~UI_BWR_NAME~UI_CPRTY_NAME~UI_CUSTOMER~UI_PRM_BORR_ALLOWED_EDIT","BLK_BORR_SETT_CURR_DETAILS":"CONTRACT_REF_NO~VERSION_NO~CURRENCY~SSI_COUNTERPARTY~CUSTOMER_NO~SSI_MNEMONIC~SETTLEMENT_SEQ_NO","BLK_BORR_DD_PROD":"CONTRACT_REF_NO~VERSION_NO~LIMIT_TYPE~CUSTOMER_NO~DD_PRODUCT_CODE~UI_DD_PRD_DESC","BLK_BORR_ENTITIES":"CONTRACT_REF_NO~ENTITY~DRAWDOWN_NO~CUSTOMER_NO~PRIMARY~VERSION_NO~UI_ENTITY_DESC","BLK_BORR_PROD_LMT":"EVENT_SEQ_NO~VERSION_NO~FRONTING_RECALC_REQD~DRAWDOWN_PRODUCT~CCY_CODE~LIMIT_AMT~BORROWER~TRANCHE_REF_NO~LIMIT_TYPE~UI_CCY","BLK_SYND_BORR_LIM":"AVAILABLE_LIMIT~BORROWER~BORROWER_LIMIT~CCY_CODE~CONTRACT_REF_NO~EVENT_SEQ_NO~MATURED_LIMIT~UTILIZED_LIMIT~VERSION_NO"};

var multipleEntryPageSize = {"BLK_CONBW" :"15" ,"BLK_BORR_SETT_CURR_DETAILS" :"15" ,"BLK_BORR_ENTITIES" :"15" ,"BLK_BORR_DD_PROD" :"15" ,"BLK_BORR_PROD_LMT" :"15" ,"BLK_SYND_BORR_LIM" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_LBCCONBW__TAB_HEADER":"BLK_CONBW","CVS_LBCCONBW__TAB_MAIN":"BLK_BORR_SETT_CURR_DETAILS~BLK_BORR_ENTITIES~BLK_BORR_DD_PROD~BLK_BORR_PROD_LMT","CVS_LBCCONBW__TAB_BORR_LIM":"BLK_SYND_BORR_LIM"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_HEADER_CONBW">CONTRACT_REF_NO~LATEST_EVENT_SEQ_NO~LATEST_VERSION_NO~MODULE_CODE~PRODUCT_CODE~USER_REF_NO~COUNTERPARTY~DRAWDOWN_NO~PRODUCT_TYPE~CONTRACT_CCY</FN>'; 
msgxml += '      <FN PARENT="BLK_HEADER_CONBW" RELATION_TYPE="N" TYPE="BLK_CONBW">CONTRACT_REF_NO~EVENT_SEQ_NO~CUSTOMER_NO~VERSION_NO~BLOCKED~PRODUCT_RESTRICTION~CONTRACTUAL~SSI_COUNTERPARTY~NETTING_PREF~UI_BWR_NAME~UI_CPRTY_NAME~UI_CUSTOMER~UI_PRM_BORR_ALLOWED_EDIT</FN>'; 
msgxml += '      <FN PARENT="BLK_CONBW" RELATION_TYPE="N" TYPE="BLK_BORR_SETT_CURR_DETAILS">CONTRACT_REF_NO~VERSION_NO~CURRENCY~SSI_COUNTERPARTY~CUSTOMER_NO~SSI_MNEMONIC~SETTLEMENT_SEQ_NO</FN>'; 
msgxml += '      <FN PARENT="BLK_CONBW" RELATION_TYPE="N" TYPE="BLK_BORR_DD_PROD">CONTRACT_REF_NO~VERSION_NO~LIMIT_TYPE~CUSTOMER_NO~DD_PRODUCT_CODE~UI_DD_PRD_DESC</FN>'; 
msgxml += '      <FN PARENT="BLK_CONBW" RELATION_TYPE="N" TYPE="BLK_BORR_ENTITIES">CONTRACT_REF_NO~ENTITY~DRAWDOWN_NO~CUSTOMER_NO~PRIMARY~VERSION_NO~UI_ENTITY_DESC</FN>'; 
msgxml += '      <FN PARENT="BLK_BORR_DD_PROD" RELATION_TYPE="N" TYPE="BLK_BORR_PROD_LMT">EVENT_SEQ_NO~VERSION_NO~FRONTING_RECALC_REQD~DRAWDOWN_PRODUCT~CCY_CODE~LIMIT_AMT~BORROWER~TRANCHE_REF_NO~LIMIT_TYPE~UI_CCY</FN>'; 
msgxml += '      <FN PARENT="BLK_CONBW" RELATION_TYPE="N" TYPE="BLK_SYND_BORR_LIM">AVAILABLE_LIMIT~BORROWER~BORROWER_LIMIT~CCY_CODE~CONTRACT_REF_NO~EVENT_SEQ_NO~MATURED_LIMIT~UTILIZED_LIMIT~VERSION_NO</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_LBCCONBW";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_HEADER_CONBW" : "","BLK_CONBW" : "BLK_HEADER_CONBW~N","BLK_BORR_SETT_CURR_DETAILS" : "BLK_CONBW~N","BLK_BORR_DD_PROD" : "BLK_CONBW~N","BLK_BORR_ENTITIES" : "BLK_CONBW~N","BLK_BORR_PROD_LMT" : "BLK_BORR_DD_PROD~N","BLK_SYND_BORR_LIM" : "BLK_CONBW~N"}; 

 var dataSrcLocationArray = new Array("BLK_HEADER_CONBW","BLK_CONBW","BLK_BORR_SETT_CURR_DETAILS","BLK_BORR_DD_PROD","BLK_BORR_ENTITIES","BLK_BORR_PROD_LMT","BLK_SYND_BORR_LIM"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LBCCONBW.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LBCCONBW.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_HEADER_CONBW__CONTRACT_REF_NO";
pkFields[0] = "BLK_HEADER_CONBW__CONTRACT_REF_NO";
queryFields[1] = "BLK_HEADER_CONBW__LATEST_EVENT_SEQ_NO";
pkFields[1] = "BLK_HEADER_CONBW__LATEST_EVENT_SEQ_NO";
queryFields[2] = "BLK_HEADER_CONBW__LATEST_VERSION_NO";
pkFields[2] = "BLK_HEADER_CONBW__LATEST_VERSION_NO";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_BORR_DD_PROD":["DD_PRODUCT_CODE","LIMIT_TYPE"],"BLK_BORR_ENTITIES":["ENTITY","PRIMARY"],"BLK_BORR_PROD_LMT":["CCY_CODE","LIMIT_AMT"],"BLK_BORR_SETT_CURR_DETAILS":["CURRENCY","SSI_MNEMONIC"],"BLK_CONBW":["BLOCKED","CONTRACTUAL","CUSTOMER_NO","NETTING_PREF","SSI_COUNTERPARTY"]};
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
var lovInfoFlds = {"BLK_CONBW__CUSTOMER_NO__LOV_CUST":["BLK_CONBW__CUSTOMER_NO~~BLK_CONBW__UI_BWR_NAME~~","BLK_HEADER_CONBW__CONTRACT_REF_NO!VARCHAR2~BLK_HEADER_CONBW__LATEST_VERSION_NO!VARCHAR2~BLK_HEADER_CONBW__PRODUCT_TYPE!VARCHAR2~BLK_HEADER_CONBW__CONTRACT_REF_NO!VARCHAR2~BLK_HEADER_CONBW__LATEST_VERSION_NO!VARCHAR2~BLK_HEADER_CONBW__PRODUCT_TYPE!VARCHAR2~BLK_HEADER_CONBW__PRODUCT_CODE!VARCHAR2","N~N~N~N",""],"BLK_CONBW__SSI_COUNTERPARTY__LOV_SSI_CPRTY":["BLK_CONBW__SSI_COUNTERPARTY~~BLK_CONBW__UI_CPRTY_NAME~~","","N~N~N~N",""],"BLK_BORR_SETT_CURR_DETAILS__CURRENCY__LOV_CCY_MNEMONIC":["BLK_BORR_SETT_CURR_DETAILS__CURRENCY~~","","N~N",""],"BLK_BORR_SETT_CURR_DETAILS__SSI_MNEMONIC__LOV_SSI_MNEMONIC":["BLK_BORR_SETT_CURR_DETAILS__SSI_MNEMONIC~BLK_BORR_SETT_CURR_DETAILS__SETTLEMENT_SEQ_NO~~~~~~","BLK_CONBW__SSI_COUNTERPARTY!VARCHAR2~BLK_CONBW__CUSTOMER_NO!VARCHAR2~BLK_CONBW__SSI_COUNTERPARTY!VARCHAR2~BLK_CONBW__CUSTOMER_NO!VARCHAR2~BLK_HEADER_CONBW__PRODUCT_CODE!VARCHAR2~BLK_HEADER_CONBW__PRODUCT_CODE!VARCHAR2~BLK_BORR_SETT_CURR_DETAILS__CURRENCY!VARCHAR2~BLK_HEADER_CONBW__PRODUCT_CODE!VARCHAR2","N~N~N~N~N~N~N",""],"BLK_BORR_DD_PROD__DD_PRODUCT_CODE__LOV_DD_PROD":["BLK_BORR_DD_PROD__DD_PRODUCT_CODE~BLK_BORR_DD_PROD__UI_DD_PRD_DESC~","BLK_HEADER_CONBW__PRODUCT_CODE!VARCHAR2","N~N",""],"BLK_BORR_ENTITIES__ENTITY__LOV_ENTITY":["BLK_BORR_ENTITIES__ENTITY~BLK_BORR_ENTITIES__UI_ENTITY_DESC~~~~~","BLK_CONBW__CUSTOMER_NO!VARCHAR2~BLK_CONBW__CUSTOMER_NO!VARCHAR2~BLK_HEADER_CONBW__CONTRACT_REF_NO!VARCHAR2~BLK_HEADER_CONBW__LATEST_VERSION_NO!NUMBER~BLK_HEADER_CONBW__DRAWDOWN_NO!NUMBER~BLK_HEADER_CONBW__PRODUCT_TYPE!VARCHAR2~BLK_HEADER_CONBW__CONTRACT_REF_NO!VARCHAR2~BLK_CONBW__CUSTOMER_NO!VARCHAR2~BLK_HEADER_CONBW__CONTRACT_REF_NO!VARCHAR2~BLK_CONBW__CUSTOMER_NO!VARCHAR2~BLK_HEADER_CONBW__CONTRACT_REF_NO!VARCHAR2~BLK_HEADER_CONBW__LATEST_VERSION_NO!NUMBER~BLK_CONBW__CUSTOMER_NO!VARCHAR2~BLK_HEADER_CONBW__DRAWDOWN_NO!NUMBER~BLK_HEADER_CONBW__PRODUCT_TYPE!VARCHAR2","N~N~N~N~N~N",""],"BLK_BORR_PROD_LMT__CCY_CODE__LOV_TR_CCY_CODE":["BLK_BORR_PROD_LMT__CCY_CODE~BLK_BORR_PROD_LMT__UI_CCY~","BLK_BORR_DD_PROD__LIMIT_TYPE!VARCHAR2~BLK_BORR_DD_PROD__LIMIT_TYPE!VARCHAR2","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_CONBW","BLK_BORR_SETT_CURR_DETAILS","BLK_BORR_ENTITIES","BLK_BORR_DD_PROD","BLK_BORR_PROD_LMT","BLK_SYND_BORR_LIM");
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

ArrFuncOrigin["LBCCONBW"]="KERNEL";
ArrPrntFunc["LBCCONBW"]="";
ArrPrntOrigin["LBCCONBW"]="";
ArrRoutingType["LBCCONBW"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LBCCONBW"]="N";
ArrCustomModified["LBCCONBW"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_LBCCONBW":"fccref~esn~ver","LBDBRLMT":"CONTREF~ACTION_CODE","LBDINSVW":"CUSREFNO~ACTION_CODE","LBDFBRLM":"CONTREF~ACTION_CODE"};
var scrArgSource = {"LBDBRLMT":"BLK_HEADER_CONBW__CONTRACT_REF_NO~","LBDINSVW":"BLK_CONBW__CUSTOMER_NO~","LBDFBRLM":"BLK_HEADER_CONBW__CONTRACT_REF_NO~"};
var scrArgVals = {"CVS_LBCCONBW":"~~","LBDBRLMT":"~EXECUTEQUERY","LBDINSVW":"~EXECUTEQUERY","LBDFBRLM":"~EXECUTEQUERY"};
var scrArgDest = {"CVS_LBCCONBW":"BLK_HEADER_CONBW__CONTRACT_REF_NO~BLK_HEADER_CONBW__LATEST_EVENT_SEQ_NO~BLK_HEADER_CONBW__LATEST_VERSION_NO"};
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