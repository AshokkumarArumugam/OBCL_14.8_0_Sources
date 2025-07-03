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
**  File Name          : LBCPARAT_SYS.js
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
var fieldNameArray = {"BLK_MST":"CONTRACT_REF_NO~LATEST_EVENT_SEQ_NO~LATEST_VERSION_NO~MODULE_CODE","BLK_CONTRACT_MS":"CONTRACT_REF_NO~EVENT_SEQ_NO~VERSION_NO~PRODUCT~PRODUCT_TYPE~USER_REF_NO~COUNTERPARTY~PURPOSE_OF_SYNDICATION~FACILITY_NAME~UI_CUST_NAME~UI_PRM_DISP_COMP_RATIO~UI_CONTR_TYPE~DRAWDOWN_NO~TRANCHE_REF_NO~UI_SYND_REF~CURRENCY~UI_BA_PRODUCT~UI_TREASURY~UI_AGENT~UI_ROUNDING_UNIT~UI_ROUNDING_RULE~UI_MAX_RATE","BLK_CON_PARAT":"CONTRACT_REF_NO~EVENT_SEQ_NO~VERSION_NO~OPERATION~VALUE_DATE~SSI_MNEMONIC~NETTING_PREF~ORIGINATOR~CONTRACT_TYPE~DRAWDOWN_NO~PARTICIPANT~ASSET_RATIO~SETTLEMENT_SEQ_NO~SELF_PARTICIPATION~UI_PARAT_TYPE~UI_PARAT_NAME~UI_ASSET_AMT~UI_PRINCIPAL~UI_BRANCH~UI_DESCODEC~UI_POSITIONQ~ASSETAMT~LMALSPARTICIPATION~SWINGLINE_PARTICIPANT","BLK_SETT_CURR_DET":"RECORD_STAT~SSI_MNEMONIC~EVENT_SEQ_NO~DRAWDOWN_NO~CONTRACT_TYPE~SETTELMENT_SEQ_NO~CURRENCY~PARTICIPANT~CONTRACT_REF_NO~UI_PART_SETT","BLK_MNEMONIC":"CONTRACT_REF_NO~SSI_MNEMONIC~VALUE_DATE~COMPONENT~COMPONENT_TYPE~CUSTOMER_NO~DRAWDOWN_NO~CONTRACT_TYPE~EVENT_SEQ_NO~UI_CCY~SETTLEMENT_SEQ_NO","BLK_ENTITY_PARAT":"RECORD_STAT~ENTITY_ID~DRAWDOWN_NO~EVENT_SEQ_NO~PRIMARY_ENTITY~CUSTOMER_NO~REMARKS~CONTRACT_REF_NO~CONTRACT_TYPE~UI_ENTITY_NAME~UI_PART_ENT","BLK_PARAT_VIEW":"CONTRACT_REF_NO~EVENT_SEQ_NO~CONTRACT_TYPE~VALUE_DATE~DRAWDOWN_NO~PARTICIPANT~UI_COMP~UI_FEE_PART","BLK_SSI_ERR":"CONTRACT_REF_NO~EVENT_SEQ_NO~UI_PARAT~UI_CCY~UI_SSI","BLK_PART_BA_DTLS":"AGENT_RATE~BA_BROKER_PROD~COF_AMT~CONTRACT_REF_NO~DISCOUNTED~DISCOUNTED_AMT~DISCOUNTED_PRICE~DISCOUNT_RATE~DISC_PRICE_ROUNDING_RULE~DISC_PRICE_ROUNDING_UNIT~EVENT_SEQ_NO~INTEREST_DAY_BASIS~NET_BORROWING_AMT~PARTICIPANT~PNL_AMT~SPLIT_NUMBER~SPLIT_SERIAL_NO~STAMPING_FEE_AMT~STAMPING_FEE_RATE~TREASURY_RATE~VERSION_NO~MAX_RATE","BLK_PART_BA_MAS":"BA_CCY~BA_CONTRACT"};

var multipleEntryPageSize = {"BLK_CON_PARAT" :"15" ,"BLK_MNEMONIC" :"15" ,"BLK_SETT_CURR_DET" :"15" ,"BLK_ENTITY_PARAT" :"15" ,"BLK_PARAT_VIEW" :"15" ,"BLK_SSI_ERR" :"15" };

var multipleEntrySVBlocks = "BLK_PART_BA_DTLS";

var tabMEBlks = {"CVS_PARAT__TAB_MAIN":"BLK_CON_PARAT~BLK_SETT_CURR_DET~BLK_ENTITY_PARAT","CVS_MNEMONIC__TAB_MAIN":"BLK_MNEMONIC","CVS_PARAT__TAB_VIEW":"BLK_PARAT_VIEW","CVS_PARAT__TAB_ERR":"BLK_SSI_ERR"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_MST">CONTRACT_REF_NO~LATEST_EVENT_SEQ_NO~LATEST_VERSION_NO~MODULE_CODE</FN>'; 
msgxml += '      <FN PARENT="BLK_MST" RELATION_TYPE="1" TYPE="BLK_CONTRACT_MS">CONTRACT_REF_NO~EVENT_SEQ_NO~VERSION_NO~PRODUCT~PRODUCT_TYPE~USER_REF_NO~COUNTERPARTY~PURPOSE_OF_SYNDICATION~FACILITY_NAME~UI_CUST_NAME~UI_PRM_DISP_COMP_RATIO~UI_CONTR_TYPE~DRAWDOWN_NO~TRANCHE_REF_NO~UI_SYND_REF~CURRENCY~UI_BA_PRODUCT~UI_TREASURY~UI_AGENT~UI_ROUNDING_UNIT~UI_ROUNDING_RULE~UI_MAX_RATE</FN>'; 
msgxml += '      <FN PARENT="BLK_CONTRACT_MS" RELATION_TYPE="N" TYPE="BLK_CON_PARAT">CONTRACT_REF_NO~EVENT_SEQ_NO~VERSION_NO~OPERATION~VALUE_DATE~SSI_MNEMONIC~NETTING_PREF~ORIGINATOR~CONTRACT_TYPE~DRAWDOWN_NO~PARTICIPANT~ASSET_RATIO~SETTLEMENT_SEQ_NO~SELF_PARTICIPATION~UI_PARAT_TYPE~UI_PARAT_NAME~UI_ASSET_AMT~UI_PRINCIPAL~UI_BRANCH~UI_DESCODEC~UI_POSITIONQ~ASSETAMT~LMALSPARTICIPATION~SWINGLINE_PARTICIPANT</FN>'; 
msgxml += '      <FN PARENT="BLK_CON_PARAT" RELATION_TYPE="N" TYPE="BLK_SETT_CURR_DET">RECORD_STAT~SSI_MNEMONIC~EVENT_SEQ_NO~DRAWDOWN_NO~CONTRACT_TYPE~SETTELMENT_SEQ_NO~CURRENCY~PARTICIPANT~CONTRACT_REF_NO~UI_PART_SETT</FN>'; 
msgxml += '      <FN PARENT="BLK_CON_PARAT" RELATION_TYPE="N" TYPE="BLK_MNEMONIC">CONTRACT_REF_NO~SSI_MNEMONIC~VALUE_DATE~COMPONENT~COMPONENT_TYPE~CUSTOMER_NO~DRAWDOWN_NO~CONTRACT_TYPE~EVENT_SEQ_NO~UI_CCY~SETTLEMENT_SEQ_NO</FN>'; 
msgxml += '      <FN PARENT="BLK_CON_PARAT" RELATION_TYPE="N" TYPE="BLK_ENTITY_PARAT">RECORD_STAT~ENTITY_ID~DRAWDOWN_NO~EVENT_SEQ_NO~PRIMARY_ENTITY~CUSTOMER_NO~REMARKS~CONTRACT_REF_NO~CONTRACT_TYPE~UI_ENTITY_NAME~UI_PART_ENT</FN>'; 
msgxml += '      <FN PARENT="BLK_CON_PARAT" RELATION_TYPE="N" TYPE="BLK_PARAT_VIEW">CONTRACT_REF_NO~EVENT_SEQ_NO~CONTRACT_TYPE~VALUE_DATE~DRAWDOWN_NO~PARTICIPANT~UI_COMP~UI_FEE_PART</FN>'; 
msgxml += '      <FN PARENT="BLK_CON_PARAT" RELATION_TYPE="N" TYPE="BLK_SSI_ERR">CONTRACT_REF_NO~EVENT_SEQ_NO~UI_PARAT~UI_CCY~UI_SSI</FN>'; 
msgxml += '      <FN PARENT="BLK_CON_PARAT" RELATION_TYPE="1" TYPE="BLK_PART_BA_DTLS">AGENT_RATE~BA_BROKER_PROD~COF_AMT~CONTRACT_REF_NO~DISCOUNTED~DISCOUNTED_AMT~DISCOUNTED_PRICE~DISCOUNT_RATE~DISC_PRICE_ROUNDING_RULE~DISC_PRICE_ROUNDING_UNIT~EVENT_SEQ_NO~INTEREST_DAY_BASIS~NET_BORROWING_AMT~PARTICIPANT~PNL_AMT~SPLIT_NUMBER~SPLIT_SERIAL_NO~STAMPING_FEE_AMT~STAMPING_FEE_RATE~TREASURY_RATE~VERSION_NO~MAX_RATE</FN>'; 
msgxml += '      <FN PARENT="BLK_MST" RELATION_TYPE="1" TYPE="BLK_PART_BA_MAS">BA_CCY~BA_CONTRACT</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_PARAT";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_MST" : "","BLK_CONTRACT_MS" : "BLK_MST~1","BLK_CON_PARAT" : "BLK_CONTRACT_MS~N","BLK_SETT_CURR_DET" : "BLK_CON_PARAT~N","BLK_MNEMONIC" : "BLK_CON_PARAT~N","BLK_ENTITY_PARAT" : "BLK_CON_PARAT~N","BLK_PARAT_VIEW" : "BLK_CON_PARAT~N","BLK_SSI_ERR" : "BLK_CON_PARAT~N","BLK_PART_BA_DTLS" : "BLK_CON_PARAT~1","BLK_PART_BA_MAS" : "BLK_MST~1"}; 

 var dataSrcLocationArray = new Array("BLK_MST","BLK_CONTRACT_MS","BLK_CON_PARAT","BLK_SETT_CURR_DET","BLK_MNEMONIC","BLK_ENTITY_PARAT","BLK_PARAT_VIEW","BLK_SSI_ERR","BLK_PART_BA_DTLS","BLK_PART_BA_MAS"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LBCPARAT.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LBCPARAT.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_MST__CONTRACT_REF_NO";
pkFields[0] = "BLK_MST__CONTRACT_REF_NO";
queryFields[1] = "BLK_MST__LATEST_EVENT_SEQ_NO";
pkFields[1] = "BLK_MST__LATEST_EVENT_SEQ_NO";
queryFields[2] = "BLK_MST__LATEST_VERSION_NO";
pkFields[2] = "BLK_MST__LATEST_VERSION_NO";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_CON_PARAT":["ASSET_RATIO","CONTRACT_TYPE","DRAWDOWN_NO","NETTING_PREF","ORIGINATOR","PARTICIPANT","SELF_PARTICIPATION","SETTLEMENT_SEQ_NO","SSI_MNEMONIC"],"BLK_ENTITY_PARAT":["CONTRACT_TYPE","CUSTOMER_NO","DRAWDOWN_NO","ENTITY_ID","PRIMARY_ENTITY","REMARKS"],"BLK_MNEMONIC":["COMPONENT","COMPONENT_TYPE","CUSTOMER_NO","SSI_MNEMONIC","VALUE_DATE"],"BLK_PART_BA_DTLS":["AGENT_RATE","BA_BROKER_PROD","DISCOUNTED","DISCOUNTED_AMT","DISCOUNTED_PRICE","DISCOUNT_RATE","DISC_PRICE_ROUNDING_RULE","DISC_PRICE_ROUNDING_UNIT","INTEREST_DAY_BASIS","MAX_RATE","NET_BORROWING_AMT","PARTICIPANT","STAMPING_FEE_AMT","STAMPING_FEE_RATE","TREASURY_RATE","VERSION_NO"],"BLK_SETT_CURR_DET":["CONTRACT_TYPE","CURRENCY","DRAWDOWN_NO","PARTICIPANT","SETTELMENT_SEQ_NO","SSI_MNEMONIC"]};
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
var lovInfoFlds = {"BLK_CONTRACT_MS__UI_BA_PRODUCT__LOV_BA_BROKER":["BLK_CONTRACT_MS__UI_BA_PRODUCT~~","","N~N","N"],"BLK_CON_PARAT__PARTICIPANT__LOV_PARAT":["BLK_CON_PARAT__PARTICIPANT~BLK_CON_PARAT__UI_PARAT_NAME~","","N~N",""],"BLK_SETT_CURR_DET__SSI_MNEMONIC__LOV_SSI":["BLK_SETT_CURR_DET__SSI_MNEMONIC~BLK_SETT_CURR_DET__SETTELMENT_SEQ_NO~~~~~~","BLK_CON_PARAT__PARTICIPANT!VARCHAR2~BLK_MST__MODULE_CODE!VARCHAR2~BLK_CONTRACT_MS__PRODUCT!VARCHAR2~BLK_SETT_CURR_DET__CURRENCY!VARCHAR2~BLK_CONTRACT_MS__PRODUCT!VARCHAR2","N~N~N~N~N~N~N",""],"BLK_SETT_CURR_DET__CURRENCY__LOV_CCY":["BLK_SETT_CURR_DET__CURRENCY~~","","N~N",""],"BLK_MNEMONIC__SSI_MNEMONIC__LOV_PARTSSI":["BLK_MNEMONIC__SSI_MNEMONIC~BLK_MNEMONIC__SETTLEMENT_SEQ_NO~~~~~~","BLK_MNEMONIC__CUSTOMER_NO!VARCHAR2~BLK_MST__MODULE_CODE!VARCHAR2~BLK_CONTRACT_MS__PRODUCT!VARCHAR2~BLK_MNEMONIC__UI_CCY!VARCHAR2~BLK_CONTRACT_MS__PRODUCT!VARCHAR2","N~N~N~N~N~N~N",""],"BLK_ENTITY_PARAT__ENTITY_ID__LOV_ENTITY":["BLK_ENTITY_PARAT__ENTITY_ID~BLK_ENTITY_PARAT__UI_ENTITY_NAME~~~~~","BLK_CONTRACT_MS__UI_CONTR_TYPE!VARCHAR2~BLK_CONTRACT_MS__UI_SYND_REF!VARCHAR2~BLK_CONTRACT_MS__TRANCHE_REF_NO!VARCHAR2~BLK_MST__CONTRACT_REF_NO!VARCHAR2~BLK_CONTRACT_MS__UI_CONTR_TYPE!VARCHAR2~BLK_CONTRACT_MS__UI_SYND_REF!VARCHAR2~BLK_CONTRACT_MS__TRANCHE_REF_NO!VARCHAR2~BLK_MST__CONTRACT_REF_NO!VARCHAR2~BLK_CONTRACT_MS__UI_CONTR_TYPE!VARCHAR2~BLK_CONTRACT_MS__UI_CONTR_TYPE!VARCHAR2~BLK_CON_PARAT__PARTICIPANT!VARCHAR2~BLK_MST__CONTRACT_REF_NO!VARCHAR2~BLK_MST__LATEST_EVENT_SEQ_NO!NUMBER~BLK_CONTRACT_MS__UI_CONTR_TYPE!VARCHAR2~BLK_CONTRACT_MS__DRAWDOWN_NO!NUMBER~BLK_CON_PARAT__PARTICIPANT!VARCHAR2~BLK_CON_PARAT__PARTICIPANT!VARCHAR2~BLK_MST__CONTRACT_REF_NO!VARCHAR2~BLK_MST__LATEST_EVENT_SEQ_NO!NUMBER~BLK_CONTRACT_MS__UI_CONTR_TYPE!VARCHAR2~BLK_CONTRACT_MS__DRAWDOWN_NO!NUMBER~BLK_CON_PARAT__PARTICIPANT!VARCHAR2","N~N~N~N~N~N",""]};
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
var multipleEntryIDs = new Array("BLK_CON_PARAT","BLK_MNEMONIC","BLK_SETT_CURR_DET","BLK_ENTITY_PARAT","BLK_PARAT_VIEW","BLK_SSI_ERR");
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

ArrFuncOrigin["LBCPARAT"]="KERNEL";
ArrPrntFunc["LBCPARAT"]="";
ArrPrntOrigin["LBCPARAT"]="";
ArrRoutingType["LBCPARAT"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LBCPARAT"]="N";
ArrCustomModified["LBCPARAT"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_PARAT":"fccref~esn~verno","CVS_MNEMONIC":"FCCREF~PARTICIPANT","CVS_PART_BA_DTLS":"FCCREF~CCY"};
var scrArgSource = {"CVS_MNEMONIC":"BLK_CONTRACT_MS__CONTRACT_REF_NO~BLK_CON_PARAT__PARTICIPANT","CVS_PART_BA_DTLS":"BLK_CONTRACT_MS__CONTRACT_REF_NO~BLK_CONTRACT_MS__CURRENCY"};
var scrArgVals = {"CVS_PARAT":"~~","CVS_MNEMONIC":"~","CVS_PART_BA_DTLS":"~"};
var scrArgDest = {"CVS_PARAT":"BLK_MST__CONTRACT_REF_NO~BLK_MST__LATEST_EVENT_SEQ_NO~BLK_MST__LATEST_VERSION_NO","CVS_MNEMONIC":"BLK_MNEMONIC__CONTRACT_REF_NO~BLK_MNEMONIC__CUSTOMER_NO","CVS_PART_BA_DTLS":"BLK_PART_BA_MAS__BA_CONTRACT~BLK_PART_BA_MAS__BA_CCY"};
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