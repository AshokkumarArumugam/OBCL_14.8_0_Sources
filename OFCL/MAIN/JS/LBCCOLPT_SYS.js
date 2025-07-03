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
**  File Name          : LBCCOLPT_SYS.js
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
var fieldNameArray = {"BLK_OLTBS_CONTRACT_CLP":"CUSTOM_REF_NO~MODULE_CODE~CONTRACT_STATUS~FUND_REF_NO~CONF_PMT_LINK_STAT~CONTRACT_REF_NO~SERIAL_NO~TREASURY_SOURCE~PRODUCT_CODE~PRODUCT_TYPE~RELATED_REF_NO~NET_ACROSS_DRAWDOWN~EVALUATION_DATE~CONTRACT_CCY~LATEST_VERSION_NO~SUPRESS_BV_PAYMENT_MSG~BRANCH~OVERALL_CONF_STAT~DEPARTMENT_CODE~WORKFLOW_STATUS~LATEST_EVENT_DATE~AUTH_STATUS~UNCONFIRMED_SINCE~SOURCE~SWIFT_REF_NO~TEMPLATE_STATUS~AUTO_MANUAL_FLAG~EXTERNAL_REF_NO~ALTERNATE_REF_NO~COMMON_REF_NO~BOOK_DATE~SUPRESS_BV_PAYMENT_MSG1~USER_REF_NO~DELINQUENCY_STATUS~RATE_REVISION_STATUS~LIABILITY_CIF~CURR_EVENT_CODE~RESPONSE_STAT~ECA_STATUS~ALLOW_ONLINE_CONFIRM~COUNTERPARTY~LATEST_REPROGRAM_COUNTER_NO~USER_DEFINED_STATUS~LATEST_EVENT_SEQ_NO~TXT_CUSTOMER_NAME~TXT_PRODUCT_DESC~TXT_PROD_TYPE_DESC~TXT_FACILITY_NAME~TRANCHE_AMOUNT","BLK_LBTBS_COLL_PARTICIPANT":"EVENT_SEQ_NO~COLLATERAL_PERCENTAGE~OASYS_MNEMONIC~CONTRACT_REF_NO~VALUE_DATE~PARTICIPANT~TXT_PARTICIPANT_NAME~COLLATERAL_AMOUNT"};

var multipleEntryPageSize = {"BLK_LBTBS_COLL_PARTICIPANT" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_COLLPRT__TAB_MAIN":"BLK_LBTBS_COLL_PARTICIPANT"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTBS_CONTRACT_CLP">CUSTOM_REF_NO~MODULE_CODE~CONTRACT_STATUS~FUND_REF_NO~CONF_PMT_LINK_STAT~CONTRACT_REF_NO~SERIAL_NO~TREASURY_SOURCE~PRODUCT_CODE~PRODUCT_TYPE~RELATED_REF_NO~NET_ACROSS_DRAWDOWN~EVALUATION_DATE~CONTRACT_CCY~LATEST_VERSION_NO~SUPRESS_BV_PAYMENT_MSG~BRANCH~OVERALL_CONF_STAT~DEPARTMENT_CODE~WORKFLOW_STATUS~LATEST_EVENT_DATE~AUTH_STATUS~UNCONFIRMED_SINCE~SOURCE~SWIFT_REF_NO~TEMPLATE_STATUS~AUTO_MANUAL_FLAG~EXTERNAL_REF_NO~ALTERNATE_REF_NO~COMMON_REF_NO~BOOK_DATE~SUPRESS_BV_PAYMENT_MSG1~USER_REF_NO~DELINQUENCY_STATUS~RATE_REVISION_STATUS~LIABILITY_CIF~CURR_EVENT_CODE~RESPONSE_STAT~ECA_STATUS~ALLOW_ONLINE_CONFIRM~COUNTERPARTY~LATEST_REPROGRAM_COUNTER_NO~USER_DEFINED_STATUS~LATEST_EVENT_SEQ_NO~TXT_CUSTOMER_NAME~TXT_PRODUCT_DESC~TXT_PROD_TYPE_DESC~TXT_FACILITY_NAME~TRANCHE_AMOUNT</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONTRACT_CLP" RELATION_TYPE="N" TYPE="BLK_LBTBS_COLL_PARTICIPANT">EVENT_SEQ_NO~COLLATERAL_PERCENTAGE~OASYS_MNEMONIC~CONTRACT_REF_NO~VALUE_DATE~PARTICIPANT~TXT_PARTICIPANT_NAME~COLLATERAL_AMOUNT</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_COLLPRT";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_OLTBS_CONTRACT_CLP" : "","BLK_LBTBS_COLL_PARTICIPANT" : "BLK_OLTBS_CONTRACT_CLP~N"}; 

 var dataSrcLocationArray = new Array("BLK_OLTBS_CONTRACT_CLP","BLK_LBTBS_COLL_PARTICIPANT"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LBCCOLPT.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LBCCOLPT.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_OLTBS_CONTRACT_CLP__CONTRACT_REF_NO";
pkFields[0] = "BLK_OLTBS_CONTRACT_CLP__CONTRACT_REF_NO";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_LBTBS_COLL_PARTICIPANT":["COLLATERAL_AMOUNT","COLLATERAL_PERCENTAGE","OASYS_MNEMONIC","PARTICIPANT"]};
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
var lovInfoFlds = {"BLK_LBTBS_COLL_PARTICIPANT__PARTICIPANT__LOV_PARTICIPANT":["BLK_LBTBS_COLL_PARTICIPANT__PARTICIPANT~BLK_LBTBS_COLL_PARTICIPANT__TXT_PARTICIPANT_NAME~","","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_LBTBS_COLL_PARTICIPANT");
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

ArrFuncOrigin["LBCCOLPT"]="KERNEL";
ArrPrntFunc["LBCCOLPT"]="";
ArrPrntOrigin["LBCCOLPT"]="";
ArrRoutingType["LBCCOLPT"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LBCCOLPT"]="N";
ArrCustomModified["LBCCOLPT"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_COLLPRT":"CONTRACT_REF_NO~LATEST_EVENT_SEQ_NO"};
var scrArgSource = {};
var scrArgVals = {"CVS_COLLPRT":"~"};
var scrArgDest = {"CVS_COLLPRT":"BLK_OLTBS_CONTRACT_CLP__CONTRACT_REF_NO~BLK_OLTBS_CONTRACT_CLP__LATEST_EVENT_SEQ_NO"};
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
var actStageArry = {"QUERY":"2","NEW":"2","MODIFY":"2","AUTHORIZE":"2","DELETE":"2","CLOSE":"2","REOPEN":"2","REVERSE":"1","ROLLOVER":"1","CONFIRM":"1","LIQUIDATE":"1","SUMMARYQUERY":"1"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------