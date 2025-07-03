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
**  File Name          : LBDFWDPR_SYS.js
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
var fieldNameArray = {"BLK_MSSFWDPR":"CONTRACT_REF_NO~VALUE_DATE~PMNT_VALUE_DT~EVENT_CODE~CURRENCY~SANCTION_CHECKED~CONFIRM~USER_REF_NO~HOLD_TRANSACTION~AMOUNT~PROCESS_STATUS~COUNTERPARTY~SC_NA~TXT_FROM_DATE~TXT_TO_DATE~TXT_BRANCH~TXT_DEPARTMENT_CODE~TXT_TREASURY_SOURCE~TXT_BORROWER_NAME~TXT_EVENT_DESCRIPTION~TXT_PROCESS_STATUS~TXT_MODULE_CODE~SEQ_NO~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH","BLK_FWD_MSG_QUEUE":"ESN~AMOUNT~DCN~PARTICIPANT~EVENT_CODE~PARTICIPANT_NAME~RUNNING_NO~CONFIRM~DCN_REFNO~CURRENCY~VALUE_DATE~STATUS_CODE~CONTRACT_REF_NO~TXT_STATUS_CODE~RESENDTOSC","BLK_FWD_MSG_QUEUE_LT":"ESN~AMOUNT~DCN~PARTICIPANT~EVENT_CODE~PARTICIPANT_NAME~RUNNING_NO~CONFIRM~DCN_REFNO~CURRENCY~VALUE_DATE~STATUS_CODE~CONTRACT_REF_NO~TEXT_STATUS_CODE~RESENDTOSC"};

var multipleEntryPageSize = {"BLK_FWD_MSG_QUEUE" :"15" ,"BLK_FWD_MSG_QUEUE_LT" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_FWDMSG__TAB_MAIN":"BLK_FWD_MSG_QUEUE","CVS_GWDMSG_LT__TAB_MAIN":"BLK_FWD_MSG_QUEUE_LT"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_MSSFWDPR">CONTRACT_REF_NO~VALUE_DATE~PMNT_VALUE_DT~EVENT_CODE~CURRENCY~SANCTION_CHECKED~CONFIRM~USER_REF_NO~HOLD_TRANSACTION~AMOUNT~PROCESS_STATUS~COUNTERPARTY~SC_NA~TXT_FROM_DATE~TXT_TO_DATE~TXT_BRANCH~TXT_DEPARTMENT_CODE~TXT_TREASURY_SOURCE~TXT_BORROWER_NAME~TXT_EVENT_DESCRIPTION~TXT_PROCESS_STATUS~TXT_MODULE_CODE~SEQ_NO~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
msgxml += '      <FN PARENT="BLK_MSSFWDPR" RELATION_TYPE="N" TYPE="BLK_FWD_MSG_QUEUE">ESN~AMOUNT~DCN~PARTICIPANT~EVENT_CODE~PARTICIPANT_NAME~RUNNING_NO~CONFIRM~DCN_REFNO~CURRENCY~VALUE_DATE~STATUS_CODE~CONTRACT_REF_NO~TXT_STATUS_CODE~RESENDTOSC</FN>'; 
msgxml += '      <FN PARENT="BLK_MSSFWDPR" RELATION_TYPE="N" TYPE="BLK_FWD_MSG_QUEUE_LT">ESN~AMOUNT~DCN~PARTICIPANT~EVENT_CODE~PARTICIPANT_NAME~RUNNING_NO~CONFIRM~DCN_REFNO~CURRENCY~VALUE_DATE~STATUS_CODE~CONTRACT_REF_NO~TEXT_STATUS_CODE~RESENDTOSC</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_MSSFWDPR">AUTHSTAT~TXNSTAT~CONTRACT_REF_NO~USER_REF_NO~VALUE_DATE~PMNT_VALUE_DT~EVENT_CODE~CURRENCY~AMOUNT~COUNTERPARTY~PROCESS_STATUS~SANCTION_CHECKED~HOLD_TRANSACTION~CONFIRM~SC_NA</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "LBDFWDPR";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_MSSFWDPR";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_MSSFWDPR" : "","BLK_FWD_MSG_QUEUE" : "BLK_MSSFWDPR~N","BLK_FWD_MSG_QUEUE_LT" : "BLK_MSSFWDPR~N"}; 

 var dataSrcLocationArray = new Array("BLK_MSSFWDPR","BLK_FWD_MSG_QUEUE","BLK_FWD_MSG_QUEUE_LT"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LBDFWDPR.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LBDFWDPR.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_MSSFWDPR__CONTRACT_REF_NO";
pkFields[0] = "BLK_MSSFWDPR__CONTRACT_REF_NO";
queryFields[1] = "BLK_MSSFWDPR__EVENT_CODE";
pkFields[1] = "BLK_MSSFWDPR__EVENT_CODE";
queryFields[2] = "BLK_MSSFWDPR__VALUE_DATE";
pkFields[2] = "BLK_MSSFWDPR__VALUE_DATE";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_MSSFWDPR":["CONFIRM","HOLD_TRANSACTION","SANCTION_CHECKED","SC_NA"]};
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
var lovInfoFlds = {"BLK_MSSFWDPR__CONTRACT_REF_NO__LOV_CONTRACT":["BLK_MSSFWDPR__CONTRACT_REF_NO~BLK_MSSFWDPR__COUNTERPARTY~BLK_MSSFWDPR__EVENT_CODE~BLK_MSSFWDPR__CURRENCY~BLK_MSSFWDPR__VALUE_DATE~","BLK_MSSFWDPR__CONTRACT_REF_NO!VARCHAR2","N~N~N~N~N",""]};
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
var multipleEntryIDs = new Array("BLK_FWD_MSG_QUEUE","BLK_FWD_MSG_QUEUE_LT");
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

ArrFuncOrigin["LBDFWDPR"]="KERNEL";
ArrPrntFunc["LBDFWDPR"]="";
ArrPrntOrigin["LBDFWDPR"]="";
ArrRoutingType["LBDFWDPR"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LBDFWDPR"]="N";
ArrCustomModified["LBDFWDPR"]="N";

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