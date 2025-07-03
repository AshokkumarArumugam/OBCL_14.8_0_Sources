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
**  File Name          : LPCPRATE_SYS.js
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
var fieldNameArray = {"BLK_PART_SUMM":"CUSTOMERNAME~CONTRACT_REF_NO~BRANCH~MODULE_CODE~PRODUCT~AUTH_STATUS~CONTRACT_STATUS~COUNTERPARTY~AMOUNT~CURRENCY~PARTY_FACILITY_REF_NO~BORROWER_FACILITY_REF_NO~BORROWER_CONTRACT_REF_NO~BORROWER_TRANCHE_REF_NO~PRODUCT_TYPE~PARTY_TRANCHE_REF_NO~PARTY_DRAWDOWN_NO~VALUE_DATE~MATURITY_DATE~DEPARTMENT_CODE~TREASURY_SOURCE~SHORT_NAME~PARTICIPANTNAME","BLK_PART_SUMM_ALIAS":"CUSTOMERNAME~CONTRACT_REF_NO~BRANCH~MODULE_CODE~PRODUCT~AUTH_STATUS~CONTRACT_STATUS~COUNTERPARTY~CURRENCY~AMOUNT~PARTY_FACILITY_REF_NO~BORROWER_FACILITY_REF_NO~BORROWER_CONTRACT_REF_NO~BORROWER_TRANCHE_REF_NO~PRODUCT_TYPE~PARTY_TRANCHE_REF_NO~PARTY_DRAWDOWN_NO~VALUE_DATE~MATURITY_DATE~DEPARTMENT_CODE~TREASURY_SOURCE~SHORT_NAME~PARTICIPANTNAME","BLK_INT_MASTER":"CONTRACT_REF_NO~COMPONENT~COMPONENT_SERIAL_NO~PICKUP_EVENT_CODE~SHOWN_IN_CONTRACT_MAIN_SCREEN~RULE~BASIS_AMOUNT_TYPE~BASIS_AMOUNT_CATEGORY~RATE_FIXING_REQD~PROPAGATION_REQD~SKIM_COMPONENT~RECALC_REQD~RECALC_START_DATE~LAST_CALC_TIMESTAMP~PENALTY_TYPE~UNFUND_COMPONENT~TXTCOMPDESC","BLK_INT_DET":"CONTRACT_REF_NO~COMPONENT~VALUE_DATE~RATE_TYPE~FIXED_RATE_TYPE~RATE_CODE_USAGE~RATE_CODE~BORROW_LEND_IND~BASE_RATE~SPREAD~MARGIN~FINAL_RATE~ADJUSTMENT_RATE~BORROWER_CONTRACT_REF_NO~PARTICIPANT","BLK_MARGIN_RATES":"CONTRACT_REF_NO~COMPONENT~MARGIN_COMPONENT~VALUE_DATE~EVENT_SEQ_NO~MARGIN_RATE~BORROWER_CONTRACT_REF_NO~TXTMARGINBASIS","BLK_PART_MARGIN_MASTER":"TXTCOMPDESC~MAR_COMP~CONTRACT_REF_NO~MARGIN_COMPONENT~MARGIN_BASIS~CUSTOMER_NO~MARGIN_RULE_REF_NO~SEQ_NO~REPICKUP_REQD~REPICKUP_FROM_DATE~LAST_CHANGE_TIMESTAMP","BLK_MARGIN_MASTER_ALIAS":"CONTRACT_REF_NO~COMPONENT~MARGIN_COMPONENT~MARGIN_BASIS~CUSTOMER_NO~MARGIN_RULE_REF_NO~SEQ_NO~REPICKUP_REQD~REPICKUP_FROM_DATE~LAST_CHANGE_TIMESTAMP~TXTMARGINCOMPDESC","BLK_MARGIN_RATES_ALIAS":"CONTRACT_REF_NO~COMPONENT~MARGIN_COMPONENT~VALUE_DATE~EVENT_SEQ_NO~MARGIN_RATE~BORROWER_CONTRACT_REF_NO"};

var multipleEntryPageSize = {"BLK_PART_SUMM_ALIAS" :"15" ,"BLK_INT_MASTER" :"15" ,"BLK_INT_DET" :"15" ,"BLK_MARGIN_RATES" :"15" ,"BLK_PART_MARGIN_MASTER" :"15" ,"BLK_MARGIN_MASTER_ALIAS" :"15" ,"BLK_MARGIN_RATES_ALIAS" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_PART_RATE__TAB_MAIN":"BLK_PART_SUMM_ALIAS~BLK_INT_MASTER~BLK_INT_DET~BLK_MARGIN_RATES","CVS_MARGIN_HISTORY__TAB_MAIN":"BLK_PART_MARGIN_MASTER~BLK_MARGIN_MASTER_ALIAS~BLK_MARGIN_RATES_ALIAS"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_PART_SUMM">CUSTOMERNAME~CONTRACT_REF_NO~BRANCH~MODULE_CODE~PRODUCT~AUTH_STATUS~CONTRACT_STATUS~COUNTERPARTY~AMOUNT~CURRENCY~PARTY_FACILITY_REF_NO~BORROWER_FACILITY_REF_NO~BORROWER_CONTRACT_REF_NO~BORROWER_TRANCHE_REF_NO~PRODUCT_TYPE~PARTY_TRANCHE_REF_NO~PARTY_DRAWDOWN_NO~VALUE_DATE~MATURITY_DATE~DEPARTMENT_CODE~TREASURY_SOURCE~SHORT_NAME~PARTICIPANTNAME</FN>'; 
msgxml += '      <FN PARENT="BLK_PART_SUMM" RELATION_TYPE="N" TYPE="BLK_PART_SUMM_ALIAS">CUSTOMERNAME~CONTRACT_REF_NO~BRANCH~MODULE_CODE~PRODUCT~AUTH_STATUS~CONTRACT_STATUS~COUNTERPARTY~CURRENCY~AMOUNT~PARTY_FACILITY_REF_NO~BORROWER_FACILITY_REF_NO~BORROWER_CONTRACT_REF_NO~BORROWER_TRANCHE_REF_NO~PRODUCT_TYPE~PARTY_TRANCHE_REF_NO~PARTY_DRAWDOWN_NO~VALUE_DATE~MATURITY_DATE~DEPARTMENT_CODE~TREASURY_SOURCE~SHORT_NAME~PARTICIPANTNAME</FN>'; 
msgxml += '      <FN PARENT="BLK_PART_SUMM" RELATION_TYPE="N" TYPE="BLK_INT_MASTER">CONTRACT_REF_NO~COMPONENT~COMPONENT_SERIAL_NO~PICKUP_EVENT_CODE~SHOWN_IN_CONTRACT_MAIN_SCREEN~RULE~BASIS_AMOUNT_TYPE~BASIS_AMOUNT_CATEGORY~RATE_FIXING_REQD~PROPAGATION_REQD~SKIM_COMPONENT~RECALC_REQD~RECALC_START_DATE~LAST_CALC_TIMESTAMP~PENALTY_TYPE~UNFUND_COMPONENT~TXTCOMPDESC</FN>'; 
msgxml += '      <FN PARENT="BLK_INT_MASTER" RELATION_TYPE="1" TYPE="BLK_INT_DET">CONTRACT_REF_NO~COMPONENT~VALUE_DATE~RATE_TYPE~FIXED_RATE_TYPE~RATE_CODE_USAGE~RATE_CODE~BORROW_LEND_IND~BASE_RATE~SPREAD~MARGIN~FINAL_RATE~ADJUSTMENT_RATE~BORROWER_CONTRACT_REF_NO~PARTICIPANT</FN>'; 
msgxml += '      <FN PARENT="BLK_INT_DET" RELATION_TYPE="N" TYPE="BLK_MARGIN_RATES">CONTRACT_REF_NO~COMPONENT~MARGIN_COMPONENT~VALUE_DATE~EVENT_SEQ_NO~MARGIN_RATE~BORROWER_CONTRACT_REF_NO~TXTMARGINBASIS</FN>'; 
msgxml += '      <FN PARENT="BLK_INT_MASTER" RELATION_TYPE="N" TYPE="BLK_PART_MARGIN_MASTER">TXTCOMPDESC~MAR_COMP~CONTRACT_REF_NO~MARGIN_COMPONENT~MARGIN_BASIS~CUSTOMER_NO~MARGIN_RULE_REF_NO~SEQ_NO~REPICKUP_REQD~REPICKUP_FROM_DATE~LAST_CHANGE_TIMESTAMP</FN>'; 
msgxml += '      <FN PARENT="BLK_INT_MASTER" RELATION_TYPE="N" TYPE="BLK_MARGIN_MASTER_ALIAS">CONTRACT_REF_NO~COMPONENT~MARGIN_COMPONENT~MARGIN_BASIS~CUSTOMER_NO~MARGIN_RULE_REF_NO~SEQ_NO~REPICKUP_REQD~REPICKUP_FROM_DATE~LAST_CHANGE_TIMESTAMP~TXTMARGINCOMPDESC</FN>'; 
msgxml += '      <FN PARENT="BLK_MARGIN_MASTER_ALIAS" RELATION_TYPE="N" TYPE="BLK_MARGIN_RATES_ALIAS">CONTRACT_REF_NO~COMPONENT~MARGIN_COMPONENT~VALUE_DATE~EVENT_SEQ_NO~MARGIN_RATE~BORROWER_CONTRACT_REF_NO</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_PART_RATE";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_PART_SUMM" : "","BLK_PART_SUMM_ALIAS" : "BLK_PART_SUMM~N","BLK_INT_MASTER" : "BLK_PART_SUMM~N","BLK_INT_DET" : "BLK_INT_MASTER~1","BLK_MARGIN_RATES" : "BLK_INT_DET~N","BLK_PART_MARGIN_MASTER" : "BLK_INT_MASTER~N","BLK_MARGIN_MASTER_ALIAS" : "BLK_INT_MASTER~N","BLK_MARGIN_RATES_ALIAS" : "BLK_MARGIN_MASTER_ALIAS~N"}; 

 var dataSrcLocationArray = new Array("BLK_PART_SUMM","BLK_PART_SUMM_ALIAS","BLK_INT_MASTER","BLK_INT_DET","BLK_MARGIN_RATES","BLK_PART_MARGIN_MASTER","BLK_MARGIN_MASTER_ALIAS","BLK_MARGIN_RATES_ALIAS"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LPCPRATE.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LPCPRATE.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_PART_SUMM__CONTRACT_REF_NO";
pkFields[0] = "BLK_PART_SUMM__CONTRACT_REF_NO";
queryFields[1] = "BLK_PART_SUMM__BORROWER_CONTRACT_REF_NO";
pkFields[1] = "BLK_PART_SUMM__BORROWER_CONTRACT_REF_NO";
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
var queryAmendArr = new Array(); 
var authorizeAmendArr = new Array(); 
//----------------------------------------------------------------------------------------------------------------------

var subsysArr    = new Array(); 

//----------------------------------------------------------------------------------------------------------------------

//***** CODE FOR LOVs *****
//----------------------------------------------------------------------------------------------------------------------
var lovInfoFlds = {};
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
var multipleEntryIDs = new Array("BLK_PART_SUMM_ALIAS","BLK_INT_MASTER","BLK_INT_DET","BLK_MARGIN_RATES","BLK_PART_MARGIN_MASTER","BLK_MARGIN_MASTER_ALIAS","BLK_MARGIN_RATES_ALIAS");
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

ArrFuncOrigin["LPCPRATE"]="KERNEL";
ArrPrntFunc["LPCPRATE"]="";
ArrPrntOrigin["LPCPRATE"]="";
ArrRoutingType["LPCPRATE"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LPCPRATE"]="N";
ArrCustomModified["LPCPRATE"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_PART_RATE":"COMPONENT~CONTRACT_REF_NO","CVS_MARGIN_HISTORY":"COMP"};
var scrArgSource = {"CVS_PART_RATE":"BLK_INT_MASTER__COMPONENT~","CVS_MARGIN_HISTORY":"BLK_INT_MASTER__COMPONENT"};
var scrArgVals = {"CVS_PART_RATE":"~","CVS_MARGIN_HISTORY":""};
var scrArgDest = {"CVS_PART_RATE":"BLK_PART_MARGIN_MASTER__COMPONENT~BLK_PART_SUMM__BORROWER_CONTRACT_REF_NO","CVS_MARGIN_HISTORY":"BLK_PART_MARGIN_MASTER__MAR_COMP"};
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
var actStageArry = {};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------