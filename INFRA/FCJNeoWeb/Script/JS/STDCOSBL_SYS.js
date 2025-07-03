/***************************************************************************************************************************
**  This source is part of the FLEXCUBE Software Product. 
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
**  File Name          : STDCOSBL_SYS.js
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
var fieldNameArray = {"BLK_CUSTBAL":"ACCNO~AC_DESC~CUSTOMER_NO~CCY~CURRBAL~AVLBAL~ACSTATDMT~ACSTATNCR~ACSTATNDR~ACSTATFRZN~STATUS~CUST_NAME~BRANCH~PREV_DAY_BOOK_BAL~CURR_DAY_BOOK_BAL~TOD_LIMIT~ACY_UNCOLLECTED~PREV_RUNBAL_PRINTED_IN_PBK~MIN_REQD_BAL~ACY_BLOCKED_AMOUNT~DRAWING_POWER~SWEEP_IN_ALLOWED~AVL_TOD~CUSTOMER_CATEGORY~PRODUCT~ACCOUNT_CLASS~MODE_OF_OPERATION~OWNERSHIP~AC_STAT_BLOCK~AC_STAT_DE_POST~AC_STAT_STOP_PAY~STATUS_CHANGE_AUTOMATIC~ACY_OPENING_BAL~ACY_TODAY_TOVER_CR~ACY_TODAY_TOVER_DR~NSF_BLACKLIST_STATUS~CURRENT_TOVER~ACCR_INTR_CR~ACCR_INTR_DR~INTREST_DUE~CHARGE_DUE~LAST_INTEREST_DEBIT~LAST_INTEREST_CREDIT~LAST_CR_ACTIVITY~LAST_DR_ACTIVITY~CURRENT_BALANCE~UNCOLLECTED_AMUNT~BLOCKED_AMOUNT~AVAILABLE_BALANCE~OVERDRAFT~TOTAL_BALANCE~ACY_BOOK_BALANCE~SWEEP_ELIGIBLE_BALANCE~AVAILABLE_TOD~AC_OPEN_DATE~SWEEP_IN_ENABLED~NET_BAL~ONSWPELIGBAL~ACSTATDROVD~ACSTATCROVD","BLK_TRANSACTION":"VALUE_DT~TRN_DESC~INSTRUMENT_CODE~ORIG_BRN~BRANCH_LCY~DR_AMOUNT~CR_AMOUNT~EXCH_RATE~LCY_AMOUNT~TRN_REF_NO~TRN_DT~AC_BRANCH~AC_NO~CUST_NO~DRCR_IND~REMARKS","BLK_MEMO":"CUSTOMER_NO~MEMO_ID~BRANCH_CODE~INST_ID~INST_DESC~INST_DATE~INST_EXPR_DATE~CATEGORY~MEMO_DETAIL_ID~DISPLAY_TYPE","BLK_CUST":"CUSTNO~BRANCH~ACCNO"};

var multipleEntryPageSize = {"BLK_TRANSACTION" :"15" ,"BLK_MEMO" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_TRANSACTION~BLK_MEMO"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_CUSTBAL">ACCNO~AC_DESC~CUSTOMER_NO~CCY~CURRBAL~AVLBAL~ACSTATDMT~ACSTATNCR~ACSTATNDR~ACSTATFRZN~STATUS~CUST_NAME~BRANCH~PREV_DAY_BOOK_BAL~CURR_DAY_BOOK_BAL~TOD_LIMIT~ACY_UNCOLLECTED~PREV_RUNBAL_PRINTED_IN_PBK~MIN_REQD_BAL~ACY_BLOCKED_AMOUNT~DRAWING_POWER~SWEEP_IN_ALLOWED~AVL_TOD~CUSTOMER_CATEGORY~PRODUCT~ACCOUNT_CLASS~MODE_OF_OPERATION~OWNERSHIP~AC_STAT_BLOCK~AC_STAT_DE_POST~AC_STAT_STOP_PAY~STATUS_CHANGE_AUTOMATIC~ACY_OPENING_BAL~ACY_TODAY_TOVER_CR~ACY_TODAY_TOVER_DR~NSF_BLACKLIST_STATUS~CURRENT_TOVER~ACCR_INTR_CR~ACCR_INTR_DR~INTREST_DUE~CHARGE_DUE~LAST_INTEREST_DEBIT~LAST_INTEREST_CREDIT~LAST_CR_ACTIVITY~LAST_DR_ACTIVITY~CURRENT_BALANCE~UNCOLLECTED_AMUNT~BLOCKED_AMOUNT~AVAILABLE_BALANCE~OVERDRAFT~TOTAL_BALANCE~ACY_BOOK_BALANCE~SWEEP_ELIGIBLE_BALANCE~AVAILABLE_TOD~AC_OPEN_DATE~SWEEP_IN_ENABLED~NET_BAL~ONSWPELIGBAL~ACSTATDROVD~ACSTATCROVD</FN>'; 
msgxml += '      <FN PARENT="BLK_CUSTBAL" RELATION_TYPE="N" TYPE="BLK_TRANSACTION">VALUE_DT~TRN_DESC~INSTRUMENT_CODE~ORIG_BRN~BRANCH_LCY~DR_AMOUNT~CR_AMOUNT~EXCH_RATE~LCY_AMOUNT~TRN_REF_NO~TRN_DT~AC_BRANCH~AC_NO~CUST_NO~DRCR_IND~REMARKS</FN>'; 
msgxml += '      <FN PARENT="BLK_CUSTBAL" RELATION_TYPE="N" TYPE="BLK_MEMO">CUSTOMER_NO~MEMO_ID~BRANCH_CODE~INST_ID~INST_DESC~INST_DATE~INST_EXPR_DATE~CATEGORY~MEMO_DETAIL_ID~DISPLAY_TYPE</FN>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_CUST">CUSTNO~BRANCH~ACCNO</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_MAIN";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_CUSTBAL" : "","BLK_TRANSACTION" : "BLK_CUSTBAL~N","BLK_MEMO" : "BLK_CUSTBAL~N","BLK_CUST" : ""}; 

 var dataSrcLocationArray = new Array("BLK_CUSTBAL","BLK_TRANSACTION","BLK_MEMO","BLK_CUST"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside STDCOSBL.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside STDCOSBL.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_CUSTBAL__BRANCH";
pkFields[0] = "BLK_CUSTBAL__BRANCH";
queryFields[1] = "BLK_CUSTBAL__ACCNO";
pkFields[1] = "BLK_CUSTBAL__ACCNO";
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
var lovInfoFlds = {"BLK_CUSTBAL__ACCNO__LOV_ACC_NO":["BLK_CUSTBAL__ACCNO~BLK_CUSTBAL__AC_DESC~~","BLK_CUSTBAL__BRANCH!VARCHAR2","N~N~N",""],"BLK_CUSTBAL__BRANCH__LOV_BRANCH":["BLK_CUSTBAL__BRANCH~~","","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_TRANSACTION","BLK_MEMO");
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

ArrFuncOrigin["STDCOSBL"]="KERNEL";
ArrPrntFunc["STDCOSBL"]="";
ArrPrntOrigin["STDCOSBL"]="";
ArrRoutingType["STDCOSBL"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["STDCOSBL"]="N";
ArrCustomModified["STDCOSBL"]="N";

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
var actStageArry = {"QUERY":"2","NEW":"2","MODIFY":"2","AUTHORIZE":"1","DELETE":"1","CLOSE":"1","REOPEN":"1","REVERSE":"1","ROLLOVER":"1","CONFIRM":"1","LIQUIDATE":"1","SUMMARYQUERY":"1"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------