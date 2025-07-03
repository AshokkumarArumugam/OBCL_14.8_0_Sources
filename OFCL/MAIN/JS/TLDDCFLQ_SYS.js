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
**  File Name          : TLDDCFLQ_SYS.js
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
var fieldNameArray = {"BLK_TLTB_DCF_LIQD_AGENCY_MASTER":"SSI_MNEMONIC~CURRENCY~BRANCH~TOTAL_AMOUNT_PAYABLE~CUSIP_NO~PAYMENT_DATE~EVENT_SEQ_NO~LIQUIDATION_REF_NO~COUNTERPARTY~AGENCY_REF_NO~UI_CURR_VER~UI_TOTAL_VER~UI_MAX_ESN~UI_TOT_AMT_PAYABLE_DISP~UI_ENTITY_LQ_REF_NO~UI_ENTITY_AG_REF_NO~UI_ENTITY_E_S_N~UI_ENTITY_COUNTERPARTY","BLK_TLTB_DCF_LIQD_TRADE_DETAIL":"REQUIRED~CURRENCY~CUSIP_NO~TRADE_REF_NO~EVENT_SEQ_NO~LIQUIDATION_REF_NO~COUNTERPARTY~AGENCY_REF_NO~UI_BUY_SELL","BLK_TLTB_DCF_LIQD_COMP_DETAIL":"REQUIRED~CURRENCY~AMOUNT_PAID~AMOUNT_PAYABLE~COMPONENT~TRADE_REF_NO~EVENT_SEQ_NO~LIQUIDATION_REF_NO~COUNTERPARTY~AGENCY_REF_NO","BLK_OLTBS_CONTRACT_EVENT_LOG":"MODULE~CONTRACT_REF_NO~EVENT_SEQ_NO~EVENT_DATE~EVENT_CODE~CONTRACT_STATUS~AUTH_STATUS~NEW_VERSION_INDICATOR~REVERSED_EVENT_SEQ_NO~MAKERID~MAKERDTSTAMP~CHECKERID~CHECKERDTSTAMP","BLK_TLTB_DCF_LIQD_ENTITY_DETAIL":"LIQUIDATION_REF_NO~EVENT_SEQ_NO~ENTITY_ID~PRIMARY_ENTITY~AGENCY_REF_NO~COUNTERPARTY~UI_ENTITY_NAME"};

var multipleEntryPageSize = {"BLK_TLTB_DCF_LIQD_TRADE_DETAIL" :"15" ,"BLK_TLTB_DCF_LIQD_COMP_DETAIL" :"15" ,"BLK_TLTB_DCF_LIQD_ENTITY_DETAIL" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_TLTB_DCF_LIQD_TRADE_DETAIL~BLK_TLTB_DCF_LIQD_COMP_DETAIL","CVS_ENTITY__TAB_MAIN":"BLK_TLTB_DCF_LIQD_ENTITY_DETAIL"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_TLTB_DCF_LIQD_AGENCY_MASTER">SSI_MNEMONIC~CURRENCY~BRANCH~TOTAL_AMOUNT_PAYABLE~CUSIP_NO~PAYMENT_DATE~EVENT_SEQ_NO~LIQUIDATION_REF_NO~COUNTERPARTY~AGENCY_REF_NO~UI_CURR_VER~UI_TOTAL_VER~UI_MAX_ESN~UI_TOT_AMT_PAYABLE_DISP~UI_ENTITY_LQ_REF_NO~UI_ENTITY_AG_REF_NO~UI_ENTITY_E_S_N~UI_ENTITY_COUNTERPARTY</FN>'; 
msgxml += '      <FN PARENT="BLK_TLTB_DCF_LIQD_AGENCY_MASTER" RELATION_TYPE="N" TYPE="BLK_TLTB_DCF_LIQD_TRADE_DETAIL">REQUIRED~CURRENCY~CUSIP_NO~TRADE_REF_NO~EVENT_SEQ_NO~LIQUIDATION_REF_NO~COUNTERPARTY~AGENCY_REF_NO~UI_BUY_SELL</FN>'; 
msgxml += '      <FN PARENT="BLK_TLTB_DCF_LIQD_TRADE_DETAIL" RELATION_TYPE="N" TYPE="BLK_TLTB_DCF_LIQD_COMP_DETAIL">REQUIRED~CURRENCY~AMOUNT_PAID~AMOUNT_PAYABLE~COMPONENT~TRADE_REF_NO~EVENT_SEQ_NO~LIQUIDATION_REF_NO~COUNTERPARTY~AGENCY_REF_NO</FN>'; 
msgxml += '      <FN PARENT="BLK_TLTB_DCF_LIQD_AGENCY_MASTER" RELATION_TYPE="1" TYPE="BLK_OLTBS_CONTRACT_EVENT_LOG">MODULE~CONTRACT_REF_NO~EVENT_SEQ_NO~EVENT_DATE~EVENT_CODE~CONTRACT_STATUS~AUTH_STATUS~NEW_VERSION_INDICATOR~REVERSED_EVENT_SEQ_NO~MAKERID~MAKERDTSTAMP~CHECKERID~CHECKERDTSTAMP</FN>'; 
msgxml += '      <FN PARENT="BLK_TLTB_DCF_LIQD_AGENCY_MASTER" RELATION_TYPE="N" TYPE="BLK_TLTB_DCF_LIQD_ENTITY_DETAIL">LIQUIDATION_REF_NO~EVENT_SEQ_NO~ENTITY_ID~PRIMARY_ENTITY~AGENCY_REF_NO~COUNTERPARTY~UI_ENTITY_NAME</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_TLTB_DCF_LIQD_AGENCY_MASTER">SSI_MNEMONIC~CURRENCY~BRANCH~TOTAL_AMOUNT_PAYABLE~CUSIP_NO~PAYMENT_DATE~LIQUIDATION_REF_NO~COUNTERPARTY~AGENCY_REF_NO</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "TLDDCFLQ";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_TLTB_DCF_LIQD_AGENCY_MASTER";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_TLTB_DCF_LIQD_AGENCY_MASTER" : "","BLK_TLTB_DCF_LIQD_TRADE_DETAIL" : "BLK_TLTB_DCF_LIQD_AGENCY_MASTER~N","BLK_TLTB_DCF_LIQD_COMP_DETAIL" : "BLK_TLTB_DCF_LIQD_TRADE_DETAIL~N","BLK_OLTBS_CONTRACT_EVENT_LOG" : "BLK_TLTB_DCF_LIQD_AGENCY_MASTER~1","BLK_TLTB_DCF_LIQD_ENTITY_DETAIL" : "BLK_TLTB_DCF_LIQD_AGENCY_MASTER~N"}; 

 var dataSrcLocationArray = new Array("BLK_TLTB_DCF_LIQD_AGENCY_MASTER","BLK_TLTB_DCF_LIQD_TRADE_DETAIL","BLK_TLTB_DCF_LIQD_COMP_DETAIL","BLK_OLTBS_CONTRACT_EVENT_LOG","BLK_TLTB_DCF_LIQD_ENTITY_DETAIL"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside TLDDCFLQ.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside TLDDCFLQ.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_TLTB_DCF_LIQD_AGENCY_MASTER__AGENCY_REF_NO";
pkFields[0] = "BLK_TLTB_DCF_LIQD_AGENCY_MASTER__AGENCY_REF_NO";
queryFields[1] = "BLK_TLTB_DCF_LIQD_AGENCY_MASTER__COUNTERPARTY";
pkFields[1] = "BLK_TLTB_DCF_LIQD_AGENCY_MASTER__COUNTERPARTY";
queryFields[2] = "BLK_TLTB_DCF_LIQD_AGENCY_MASTER__LIQUIDATION_REF_NO";
pkFields[2] = "BLK_TLTB_DCF_LIQD_AGENCY_MASTER__LIQUIDATION_REF_NO";
queryFields[3] = "BLK_TLTB_DCF_LIQD_AGENCY_MASTER__EVENT_SEQ_NO";
pkFields[3] = "BLK_TLTB_DCF_LIQD_AGENCY_MASTER__EVENT_SEQ_NO";
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
var lovInfoFlds = {"BLK_TLTB_DCF_LIQD_AGENCY_MASTER__SSI_MNEMONIC__LOV_SSI":["BLK_TLTB_DCF_LIQD_AGENCY_MASTER__SSI_MNEMONIC~BLK_TLTB_DCF_LIQD_AGENCY_MASTER__CURRENCY~~~~~BLK_TLTB_DCF_LIQD_AGENCY_MASTER__BRANCH~","BLK_TLTB_DCF_LIQD_AGENCY_MASTER__COUNTERPARTY!VARCHAR2","N~N~N~N~N~N~N",""],"BLK_TLTB_DCF_LIQD_AGENCY_MASTER__LIQUIDATION_REF_NO__LOV_LIQ_REF_NO":["BLK_TLTB_DCF_LIQD_AGENCY_MASTER__LIQUIDATION_REF_NO~","","N",""],"BLK_TLTB_DCF_LIQD_AGENCY_MASTER__COUNTERPARTY__LOV_COUNTERPARTY":["BLK_TLTB_DCF_LIQD_AGENCY_MASTER__COUNTERPARTY~","BLK_TLTB_DCF_LIQD_AGENCY_MASTER__CUSIP_NO!VARCHAR2","N",""],"BLK_TLTB_DCF_LIQD_AGENCY_MASTER__AGENCY_REF_NO__LOV_AGENCY_REF_NO":["BLK_TLTB_DCF_LIQD_AGENCY_MASTER__AGENCY_REF_NO~BLK_TLTB_DCF_LIQD_AGENCY_MASTER__CUSIP_NO~BLK_TLTB_DCF_LIQD_AGENCY_MASTER__CURRENCY~BLK_TLTB_DCF_LIQD_AGENCY_MASTER__BRANCH~","","N~N~N~N",""],"BLK_TLTB_DCF_LIQD_ENTITY_DETAIL__ENTITY_ID__LOV_ENTITY_ID":["BLK_TLTB_DCF_LIQD_ENTITY_DETAIL__ENTITY_ID~BLK_TLTB_DCF_LIQD_ENTITY_DETAIL__UI_ENTITY_NAME~~~~~","BLK_TLTB_DCF_LIQD_AGENCY_MASTER__COUNTERPARTY!VARCHAR2","N~N~N~N~N~N",""]};
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
var multipleEntryIDs = new Array("BLK_TLTB_DCF_LIQD_TRADE_DETAIL","BLK_TLTB_DCF_LIQD_COMP_DETAIL","BLK_TLTB_DCF_LIQD_ENTITY_DETAIL");
var multipleEntryArray = new Array();
var multipleEntryCells = new Array();
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY VIEW SINGLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR ATTACHED CALLFORMS *****
 //----------------------------------------------------------------------------------------------------------------------

 var CallFormArray= new Array("LBCADVIC~BLK_TLTB_DCF_LIQD_AGENCY_MASTER"); 

 var CallFormRelat=new Array("TLTB_DCF_LIQD_AGENCY_MASTER__TLLAM.LIQUIDATION_REF_NO = OLTBS_GTEMP_EVENT_ADVICE.LIQUIDATION_REF_NO AND TLTB_DCF_LIQD_AGENCY_MASTER__TLLAM.EVENT_SEQ_NO = OLTBS_GTEMP_EVENT_ADVICE.EVENT_SEQ_NO"); 

 var CallRelatType= new Array("1"); 


 var ArrFuncOrigin=new Array();
 var ArrPrntFunc=new Array();
 var ArrPrntOrigin=new Array();
 var ArrRoutingType=new Array();


 // Code for Loading Cluster/Custom js File Starts
 var ArrClusterModified=new Array();
 var ArrCustomModified=new Array();
 // Code for Loading Cluster/Custom js File ends

ArrFuncOrigin["TLDDCFLQ"]="KERNEL";
ArrPrntFunc["TLDDCFLQ"]="";
ArrPrntOrigin["TLDDCFLQ"]="";
ArrRoutingType["TLDDCFLQ"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["TLDDCFLQ"]="N";
ArrCustomModified["TLDDCFLQ"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_ENTITY":"UI_ENTITY_LQ_REF_NO~UI_ENTITY_AG_REF_NO~UI_ENTITY_E_S_N~UI_ENTITY_COUNTERPARTY","LBCADVIC":"CONTREFNO~EVNTSEQNO~","OLDEVENT":"CONTREF~ACTION_CODE"};
var scrArgSource = {"CVS_ENTITY":"BLK_TLTB_DCF_LIQD_AGENCY_MASTER__LIQUIDATION_REF_NO~BLK_TLTB_DCF_LIQD_AGENCY_MASTER__AGENCY_REF_NO~BLK_TLTB_DCF_LIQD_AGENCY_MASTER__EVENT_SEQ_NO~BLK_TLTB_DCF_LIQD_AGENCY_MASTER__COUNTERPARTY","LBCADVIC":"BLK_TLTB_DCF_LIQD_AGENCY_MASTER__LIQUIDATION_REF_NO~BLK_TLTB_DCF_LIQD_AGENCY_MASTER__EVENT_SEQ_NO~","OLDEVENT":"BLK_TLTB_DCF_LIQD_AGENCY_MASTER__LIQUIDATION_REF_NO~"};
var scrArgVals = {"CVS_ENTITY":"~~~","LBCADVIC":"~~","OLDEVENT":"~EXECUTEQUERY"};
var scrArgDest = {"CVS_ENTITY":"BLK_TLTB_DCF_LIQD_AGENCY_MASTER__UI_ENTITY_LQ_REF_NO~BLK_TLTB_DCF_LIQD_AGENCY_MASTER__UI_ENTITY_AG_REF_NO~BLK_TLTB_DCF_LIQD_AGENCY_MASTER__UI_ENTITY_E_S_N~BLK_TLTB_DCF_LIQD_AGENCY_MASTER__UI_ENTITY_COUNTERPARTY"};
//***** CODE FOR SUB-SYSTEM DEPENDENT  FIELDS   *****
//----------------------------------------------------------------------------------------------------------------------
var dpndntOnFlds = {"LBCADVIC":""};
var dpndntOnSrvs = {"LBCADVIC":""};
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