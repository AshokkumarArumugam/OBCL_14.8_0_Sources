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
**  File Name          : LBDFPMLM_SYS.js
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
var fieldNameArray = {"BLK_CONTRACT":"MODULE_CODE~CONTRACT_STATUS~CONTRACT_REF_NO~PRODUCT_CODE~PRODUCT_TYPE~CONTRACT_CCY~LATEST_VERSION_NO~BRANCH~LATEST_EVENT_DATE~AUTH_STATUS~BOOK_DATE~USER_REF_NO~CURR_EVENT_CODE~COUNTERPARTY~LATEST_EVENT_SEQ_NO~INT_CUSIP_NO~EXT_CUSIP_NO~PRODUCT_DESCRIPTION~CUST_NAME~FACILITY_NAME","BLK_FPML_ADHOC_MSG":"EFFECTIVE_DATE~NOTC_NAME~ESN_TO_CANCEL~EVENT_SEQ_NO~CONTRACT_REF_NO~TAKE_ON_DEAL_DEF~TAKE_ON_FAC~MAKER_DT_STAMP~MAKER_ID~ONCE_AUTH~MOD_NO~CHECKER_ID~AUTH_STAT~CHECKER_DT_STAMP~RECORD_STAT","BLK_DRAWDOWNS":"TRANCHE_REF_NO~EVENT_SEQ_NO~DRAWDOWN_REF_NO~FACILITY_NAME","BLK_PARTICIPANTS":"TRANCHE_REF_NO~EVENT_SEQ_NO~PARTICIPANT~FACILITY_NAME"};

var multipleEntryPageSize = {"BLK_DRAWDOWNS" :"15" ,"BLK_PARTICIPANTS" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_DD__TAB_MAIN":"BLK_DRAWDOWNS","CVS_PART__TAB_MAIN":"BLK_PARTICIPANTS"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_CONTRACT">MODULE_CODE~CONTRACT_STATUS~CONTRACT_REF_NO~PRODUCT_CODE~PRODUCT_TYPE~CONTRACT_CCY~LATEST_VERSION_NO~BRANCH~LATEST_EVENT_DATE~AUTH_STATUS~BOOK_DATE~USER_REF_NO~CURR_EVENT_CODE~COUNTERPARTY~LATEST_EVENT_SEQ_NO~INT_CUSIP_NO~EXT_CUSIP_NO~PRODUCT_DESCRIPTION~CUST_NAME~FACILITY_NAME</FN>'; 
msgxml += '      <FN PARENT="BLK_CONTRACT" RELATION_TYPE="1" TYPE="BLK_FPML_ADHOC_MSG">EFFECTIVE_DATE~NOTC_NAME~ESN_TO_CANCEL~EVENT_SEQ_NO~CONTRACT_REF_NO~TAKE_ON_DEAL_DEF~TAKE_ON_FAC~MAKER_DT_STAMP~MAKER_ID~ONCE_AUTH~MOD_NO~CHECKER_ID~AUTH_STAT~CHECKER_DT_STAMP~RECORD_STAT</FN>'; 
msgxml += '      <FN PARENT="BLK_FPML_ADHOC_MSG" RELATION_TYPE="N" TYPE="BLK_DRAWDOWNS">TRANCHE_REF_NO~EVENT_SEQ_NO~DRAWDOWN_REF_NO~FACILITY_NAME</FN>'; 
msgxml += '      <FN PARENT="BLK_FPML_ADHOC_MSG" RELATION_TYPE="N" TYPE="BLK_PARTICIPANTS">TRANCHE_REF_NO~EVENT_SEQ_NO~PARTICIPANT~FACILITY_NAME</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_CONTRACT">CONTRACT_REF_NO~USER_REF_NO~CONTRACT_STATUS~PRODUCT_CODE~PRODUCT_TYPE~CONTRACT_CCY~LATEST_VERSION_NO~LATEST_EVENT_DATE~BOOK_DATE~CURR_EVENT_CODE~COUNTERPARTY~LATEST_EVENT_SEQ_NO~AUTH_STATUS~MODULE_CODE</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "LBDFPMLM";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_CONTRACT";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_CONTRACT" : "","BLK_FPML_ADHOC_MSG" : "BLK_CONTRACT~1","BLK_DRAWDOWNS" : "BLK_FPML_ADHOC_MSG~N","BLK_PARTICIPANTS" : "BLK_FPML_ADHOC_MSG~N"}; 

 var dataSrcLocationArray = new Array("BLK_CONTRACT","BLK_FPML_ADHOC_MSG","BLK_DRAWDOWNS","BLK_PARTICIPANTS"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LBDFPMLM.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LBDFPMLM.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_CONTRACT__CONTRACT_REF_NO";
pkFields[0] = "BLK_CONTRACT__CONTRACT_REF_NO";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_FPML_ADHOC_MSG":["AUTH_STAT","CHECKER_DT_STAMP","CHECKER_ID","MAKER_DT_STAMP","MAKER_ID","MOD_NO","RECORD_STAT"]};
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
var lovInfoFlds = {"BLK_CONTRACT__CONTRACT_REF_NO__LOV_CONTRACT":["BLK_CONTRACT__CONTRACT_REF_NO~BLK_CONTRACT__USER_REF_NO~BLK_CONTRACT__COUNTERPARTY~BLK_CONTRACT__CONTRACT_CCY~BLK_CONTRACT__PRODUCT_CODE~BLK_CONTRACT__LATEST_EVENT_SEQ_NO~","","N~N~N~N~N~N",""],"BLK_FPML_ADHOC_MSG__NOTC_NAME__LOV_NOTC_NAME":["BLK_FPML_ADHOC_MSG__NOTC_NAME~~","","N~N",""],"BLK_FPML_ADHOC_MSG__ESN_TO_CANCEL__LOV_NOTC_CANCEL":["~BLK_FPML_ADHOC_MSG__ESN_TO_CANCEL~~","BLK_CONTRACT__CONTRACT_REF_NO!VARCHAR2","N~N~N",""],"BLK_DRAWDOWNS__DRAWDOWN_REF_NO__LOV_DDS":["BLK_DRAWDOWNS__DRAWDOWN_REF_NO~","BLK_CONTRACT__CONTRACT_REF_NO!~BLK_FPML_ADHOC_MSG__EFFECTIVE_DATE!~BLK_CONTRACT__CONTRACT_REF_NO!~BLK_FPML_ADHOC_MSG__EFFECTIVE_DATE!~BLK_DRAWDOWNS__TRANCHE_REF_NO!~BLK_CONTRACT__LATEST_EVENT_SEQ_NO!","N",""]};
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
var multipleEntryIDs = new Array("BLK_DRAWDOWNS","BLK_PARTICIPANTS");
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

ArrFuncOrigin["LBDFPMLM"]="KERNEL";
ArrPrntFunc["LBDFPMLM"]="";
ArrPrntOrigin["LBDFPMLM"]="";
ArrRoutingType["LBDFPMLM"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LBDFPMLM"]="N";
ArrCustomModified["LBDFPMLM"]="N";

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