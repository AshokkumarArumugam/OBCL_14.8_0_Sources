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
**  File Name          : LBDSTPIB_SYS.js
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
var fieldNameArray = {"BLK_LBTB_STP_INTERFACE_BROWSER":"EXPENSE_CODE~PRODUCT_CODE~PLACEMENT_RATE~FUNDING_METHOD~BORR_REF_NO~BORR_ESN~PART_REF_NO~PART_ESN~PROCESSING_DATE~LD_REF_NO~LD_ESN~LD_EVENT_CODE~PROCESSING_STATUS~RECORD_STAT~AUTHSTAT~MOD_NO~MAKERID~MAKERSTAMP~CHECKERID~CHECKERSTAMP~ONCE_AUTH~LS_EVENT_CODE~INTERFACE_TYPE~LD_BRANCH~PARTICIPANT~EVENT_VALUE_DATE~TRANCHE_REF_NO~FACILITY_NAME~CCY~SELF_PARTICIPANT~DESK_CODE~BRANCH_CODE~TXNSTAT","BLK_LBTBS_STP_EXCEPTION":"ORA_MESSAGE~ERROR_CODE","BLK_LBVWS_STP_TR_DD_SUMMARY":"BORROWER_REF_NO~BORROWER_ESN~PARTICIPANT_REF_NO~PARTICIPANT_ESN~BORROWER_TRANCHE_REF_NO~PROCESS_STATUS~LD_CONTRACT_REF_NO","BLK_STP_INTERFACE_POS":"OLCOMPONENT~LBCOMPONENT~LDCCY~LBPOSITION~OLPOSITION~ACQ_INTEREST~LSCCY~BORR_REF_NO~PART_REF_NO~BORR_ESN~LD_REF_NO","BLK_LBTBS_STP_STATUS_LOG":"CHECKER_DT_STAMP~MAKER_DT_STAMP~CHECKER_ID~MAKER_ID~PREV_STATUS~LB_MAKERID"};

var multipleEntryPageSize = {"BLK_LBTBS_STP_EXCEPTION" :"15" ,"BLK_LBVWS_STP_TR_DD_SUMMARY" :"15" ,"BLK_STP_INTERFACE_POS" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_EXCEPT":"BLK_LBTBS_STP_EXCEPTION","CVS_MAIN__TAB_RL_CONT":"BLK_LBVWS_STP_TR_DD_SUMMARY","CVS_MAIN__TAB_MAIN":"BLK_STP_INTERFACE_POS"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_LBTB_STP_INTERFACE_BROWSER">EXPENSE_CODE~PRODUCT_CODE~PLACEMENT_RATE~FUNDING_METHOD~BORR_REF_NO~BORR_ESN~PART_REF_NO~PART_ESN~PROCESSING_DATE~LD_REF_NO~LD_ESN~LD_EVENT_CODE~PROCESSING_STATUS~RECORD_STAT~AUTHSTAT~MOD_NO~MAKERID~MAKERSTAMP~CHECKERID~CHECKERSTAMP~ONCE_AUTH~LS_EVENT_CODE~INTERFACE_TYPE~LD_BRANCH~PARTICIPANT~EVENT_VALUE_DATE~TRANCHE_REF_NO~FACILITY_NAME~CCY~SELF_PARTICIPANT~DESK_CODE~BRANCH_CODE~TXNSTAT</FN>'; 
msgxml += '      <FN PARENT="BLK_LBTB_STP_INTERFACE_BROWSER" RELATION_TYPE="N" TYPE="BLK_LBTBS_STP_EXCEPTION">ORA_MESSAGE~ERROR_CODE</FN>'; 
msgxml += '      <FN PARENT="BLK_LBTB_STP_INTERFACE_BROWSER" RELATION_TYPE="N" TYPE="BLK_LBVWS_STP_TR_DD_SUMMARY">BORROWER_REF_NO~BORROWER_ESN~PARTICIPANT_REF_NO~PARTICIPANT_ESN~BORROWER_TRANCHE_REF_NO~PROCESS_STATUS~LD_CONTRACT_REF_NO</FN>'; 
msgxml += '      <FN PARENT="BLK_LBTB_STP_INTERFACE_BROWSER" RELATION_TYPE="N" TYPE="BLK_STP_INTERFACE_POS">OLCOMPONENT~LBCOMPONENT~LDCCY~LBPOSITION~OLPOSITION~ACQ_INTEREST~LSCCY~BORR_REF_NO~PART_REF_NO~BORR_ESN~LD_REF_NO</FN>'; 
msgxml += '      <FN PARENT="BLK_LBTB_STP_INTERFACE_BROWSER" RELATION_TYPE="1" TYPE="BLK_LBTBS_STP_STATUS_LOG">CHECKER_DT_STAMP~MAKER_DT_STAMP~CHECKER_ID~MAKER_ID~PREV_STATUS~LB_MAKERID</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_LBTB_STP_INTERFACE_BROWSER">BORR_REF_NO~BORR_ESN~LS_EVENT_CODE~PART_REF_NO~PART_ESN~LD_REF_NO~LD_ESN~LD_EVENT_CODE~PROCESSING_STATUS~PROCESSING_DATE</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "LBDSTPIB";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="B";
var g_SummaryBtnCount =1;
var g_SummaryBlock ="BLK_LBTB_STP_INTERFACE_BROWSER";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_LBTB_STP_INTERFACE_BROWSER" : "","BLK_LBTBS_STP_EXCEPTION" : "BLK_LBTB_STP_INTERFACE_BROWSER~N","BLK_LBVWS_STP_TR_DD_SUMMARY" : "BLK_LBTB_STP_INTERFACE_BROWSER~N","BLK_STP_INTERFACE_POS" : "BLK_LBTB_STP_INTERFACE_BROWSER~N","BLK_LBTBS_STP_STATUS_LOG" : "BLK_LBTB_STP_INTERFACE_BROWSER~1"}; 

 var dataSrcLocationArray = new Array("BLK_LBTB_STP_INTERFACE_BROWSER","BLK_LBTBS_STP_EXCEPTION","BLK_LBVWS_STP_TR_DD_SUMMARY","BLK_STP_INTERFACE_POS","BLK_LBTBS_STP_STATUS_LOG"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LBDSTPIB.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LBDSTPIB.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_LBTB_STP_INTERFACE_BROWSER__BORR_REF_NO";
pkFields[0] = "BLK_LBTB_STP_INTERFACE_BROWSER__BORR_REF_NO";
queryFields[1] = "BLK_LBTB_STP_INTERFACE_BROWSER__BORR_ESN";
pkFields[1] = "BLK_LBTB_STP_INTERFACE_BROWSER__BORR_ESN";
queryFields[2] = "BLK_LBTB_STP_INTERFACE_BROWSER__PART_REF_NO";
pkFields[2] = "BLK_LBTB_STP_INTERFACE_BROWSER__PART_REF_NO";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_LBTB_STP_INTERFACE_BROWSER":["EXPENSE_CODE","FUNDING_METHOD","PLACEMENT_RATE","PROCESSING_STATUS","PRODUCT_CODE"]};
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
var lovInfoFlds = {"BLK_LBTB_STP_INTERFACE_BROWSER__EXPENSE_CODE__LOV_EXPENSE_CODE":["BLK_LBTB_STP_INTERFACE_BROWSER__EXPENSE_CODE~~","BLK_LBTB_STP_INTERFACE_BROWSER__SELF_PARTICIPANT!~BLK_LBTB_STP_INTERFACE_BROWSER__SELF_PARTICIPANT!","N~N",""],"BLK_LBTB_STP_INTERFACE_BROWSER__PRODUCT_CODE__LOV_PRODUCT_CODE":["BLK_LBTB_STP_INTERFACE_BROWSER__PRODUCT_CODE~~~","","N~N~N",""]};
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
var multipleEntryIDs = new Array("BLK_LBTBS_STP_EXCEPTION","BLK_LBVWS_STP_TR_DD_SUMMARY","BLK_STP_INTERFACE_POS");
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

ArrFuncOrigin["LBDSTPIB"]="KERNEL";
ArrPrntFunc["LBDSTPIB"]="";
ArrPrntOrigin["LBDSTPIB"]="";
ArrRoutingType["LBDSTPIB"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LBDSTPIB"]="N";
ArrCustomModified["LBDSTPIB"]="N";

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