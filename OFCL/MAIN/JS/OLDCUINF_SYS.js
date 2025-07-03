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
**  File Name          : OLDCUINF_SYS.js
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
var fieldNameArray = {"BLK_CUSTOMER":"CUSTID~CUSTNAME~CONTRACT_REF_NO~BRANCH~PRODUCT~CURRENCY~DSBR_FROM_DATE~DSBR_TO_DATE~LOAN_AMT_FROM~LOAN_AMT_TO~MATURITY_FROM_DATE~MATURITY_TO_DATE~USER_REF_NO~BILL_REF_NO~TRADELOANTYPE~CURR_APPLN_DATE","BLK_CONT_DETAILS":"FCCREF~CURRENCY~AMT~BRN~STAT~CUSID~EVNTSQENO~MATDT~PROD~TENOR~VALDT~VERSN~PRINCIPAL_OS_BAL~PRODUCT_TYPE~PROD_DESC~MODULE~PAYMENT_METHOD~INTEREST_RATE~PRINCIPAL_ARREARS~INTEREST_ARREARS~FEES~CHARGES~AMOUNT_PREPAID~AMOUNT_FINANCED~PRINCIPAL_OS_BAL_LCY~INTEREST_OS_BAL_LCY~TOTAL_OS_BAL~TOTAL_OS_BAL_LCY~BILL_REF_NO","BLK_ACC_COLL_LINK_DTLS":"CONTRACT_REF_NO~LINKAGE_TYPE~LINKED_PERCENT_NUMBER~LINKED_REFERENCE_NO~VERSION_NO~BRANCH_CODE","BLK_AMOUNT_DUE":"ACCOUNT_DUE~ADJUSTED_AMOUNT~AMOUNT_DUE~AMOUNT_SETTLED~COMPONENT~CONTRACT_REF_NO~DUE_DATE~COMP_TYPE~COMPDESC~OVERDUEDAYS","BLK_SETTLEMENTS":"ACCOUNT~ACC_BRANCH~ACC_CCY~AMOUNT_TAG~BASIS_AMOUNT_TAG~CONTRACT_REF_NO~EVENT_SEQ_NO","BLK_CONTRACT_SCHEDULES":"COMPONENT~CONTRACT_REF_NO~FREQUENCY~FREQUENCY_UNIT~NO_OF_SCHEDULES~VERSION_NO~SCHEDULE_TYPE~START_DATE~END_DATE"};

var multipleEntryPageSize = {"BLK_CONTRACT_SCHEDULES" :"15" ,"BLK_AMOUNT_DUE" :"15" ,"BLK_SETTLEMENTS" :"15" ,"BLK_ACC_COLL_LINK_DTLS" :"15" };

var multipleEntrySVBlocks = "BLK_CONT_DETAILS";

var tabMEBlks = {"CVS_MAIN_SCRN__TAB_SCH":"BLK_CONTRACT_SCHEDULES","CVS_MAIN_SCRN__TAB_AMOUNT_DUE":"BLK_AMOUNT_DUE","CVS_MAIN_SCRN__TAB_SETTLE":"BLK_SETTLEMENTS","CVS_MAIN_SCRN__TAB_LINK_DTLS":"BLK_ACC_COLL_LINK_DTLS"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_CUSTOMER">CUSTID~CUSTNAME~CONTRACT_REF_NO~BRANCH~PRODUCT~CURRENCY~DSBR_FROM_DATE~DSBR_TO_DATE~LOAN_AMT_FROM~LOAN_AMT_TO~MATURITY_FROM_DATE~MATURITY_TO_DATE~USER_REF_NO~BILL_REF_NO~TRADELOANTYPE~CURR_APPLN_DATE</FN>'; 
msgxml += '      <FN PARENT="BLK_CUSTOMER" RELATION_TYPE="N" TYPE="BLK_CONT_DETAILS">FCCREF~CURRENCY~AMT~BRN~STAT~CUSID~EVNTSQENO~MATDT~PROD~TENOR~VALDT~VERSN~PRINCIPAL_OS_BAL~PRODUCT_TYPE~PROD_DESC~MODULE~PAYMENT_METHOD~INTEREST_RATE~PRINCIPAL_ARREARS~INTEREST_ARREARS~FEES~CHARGES~AMOUNT_PREPAID~AMOUNT_FINANCED~PRINCIPAL_OS_BAL_LCY~INTEREST_OS_BAL_LCY~TOTAL_OS_BAL~TOTAL_OS_BAL_LCY~BILL_REF_NO</FN>'; 
msgxml += '      <FN PARENT="BLK_CONT_DETAILS" RELATION_TYPE="N" TYPE="BLK_ACC_COLL_LINK_DTLS">CONTRACT_REF_NO~LINKAGE_TYPE~LINKED_PERCENT_NUMBER~LINKED_REFERENCE_NO~VERSION_NO~BRANCH_CODE</FN>'; 
msgxml += '      <FN PARENT="BLK_CONT_DETAILS" RELATION_TYPE="N" TYPE="BLK_AMOUNT_DUE">ACCOUNT_DUE~ADJUSTED_AMOUNT~AMOUNT_DUE~AMOUNT_SETTLED~COMPONENT~CONTRACT_REF_NO~DUE_DATE~COMP_TYPE~COMPDESC~OVERDUEDAYS</FN>'; 
msgxml += '      <FN PARENT="BLK_CONT_DETAILS" RELATION_TYPE="N" TYPE="BLK_SETTLEMENTS">ACCOUNT~ACC_BRANCH~ACC_CCY~AMOUNT_TAG~BASIS_AMOUNT_TAG~CONTRACT_REF_NO~EVENT_SEQ_NO</FN>'; 
msgxml += '      <FN PARENT="BLK_CONT_DETAILS" RELATION_TYPE="N" TYPE="BLK_CONTRACT_SCHEDULES">COMPONENT~CONTRACT_REF_NO~FREQUENCY~FREQUENCY_UNIT~NO_OF_SCHEDULES~VERSION_NO~SCHEDULE_TYPE~START_DATE~END_DATE</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_MAIN_SCRN";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_CUSTOMER" : "","BLK_CONT_DETAILS" : "BLK_CUSTOMER~N","BLK_ACC_COLL_LINK_DTLS" : "BLK_CONT_DETAILS~N","BLK_AMOUNT_DUE" : "BLK_CONT_DETAILS~N","BLK_SETTLEMENTS" : "BLK_CONT_DETAILS~N","BLK_CONTRACT_SCHEDULES" : "BLK_CONT_DETAILS~N"}; 

 var dataSrcLocationArray = new Array("BLK_CUSTOMER","BLK_CONT_DETAILS","BLK_ACC_COLL_LINK_DTLS","BLK_AMOUNT_DUE","BLK_SETTLEMENTS","BLK_CONTRACT_SCHEDULES"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLDCUINF.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLDCUINF.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_CUSTOMER__CUSTID";
pkFields[0] = "BLK_CUSTOMER__CUSTID";
queryFields[1] = "BLK_CUSTOMER__BRANCH";
pkFields[1] = "BLK_CUSTOMER__BRANCH";
queryFields[2] = "BLK_CUSTOMER__CONTRACT_REF_NO";
pkFields[2] = "BLK_CUSTOMER__CONTRACT_REF_NO";
queryFields[3] = "BLK_CUSTOMER__CURRENCY";
pkFields[3] = "BLK_CUSTOMER__CURRENCY";
queryFields[4] = "BLK_CUSTOMER__DSBR_FROM_DATE";
pkFields[4] = "BLK_CUSTOMER__DSBR_FROM_DATE";
queryFields[5] = "BLK_CUSTOMER__DSBR_TO_DATE";
pkFields[5] = "BLK_CUSTOMER__DSBR_TO_DATE";
queryFields[6] = "BLK_CUSTOMER__LOAN_AMT_FROM";
pkFields[6] = "BLK_CUSTOMER__LOAN_AMT_FROM";
queryFields[7] = "BLK_CUSTOMER__LOAN_AMT_TO";
pkFields[7] = "BLK_CUSTOMER__LOAN_AMT_TO";
queryFields[8] = "BLK_CUSTOMER__MATURITY_FROM_DATE";
pkFields[8] = "BLK_CUSTOMER__MATURITY_FROM_DATE";
queryFields[9] = "BLK_CUSTOMER__MATURITY_TO_DATE";
pkFields[9] = "BLK_CUSTOMER__MATURITY_TO_DATE";
queryFields[10] = "BLK_CUSTOMER__PRODUCT";
pkFields[10] = "BLK_CUSTOMER__PRODUCT";
queryFields[11] = "BLK_CUSTOMER__USER_REF_NO";
pkFields[11] = "BLK_CUSTOMER__USER_REF_NO";
queryFields[12] = "BLK_CUSTOMER__BILL_REF_NO";
pkFields[12] = "BLK_CUSTOMER__BILL_REF_NO";
queryFields[13] = "BLK_CUSTOMER__TRADELOANTYPE";
pkFields[13] = "BLK_CUSTOMER__TRADELOANTYPE";
queryFields[14] = "BLK_CUSTOMER__CURR_APPLN_DATE";
pkFields[14] = "BLK_CUSTOMER__CURR_APPLN_DATE";
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
var lovInfoFlds = {"BLK_CUSTOMER__CUSTID__LOV_CUSTID":["BLK_CUSTOMER__CUSTID~BLK_CUSTOMER__CUSTNAME~","","N~N",""],"BLK_CUSTOMER__BRANCH__LOV_BRANCH":["BLK_CUSTOMER__BRANCH~","","N","N"]};
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
var multipleEntryIDs = new Array("BLK_CONTRACT_SCHEDULES","BLK_AMOUNT_DUE","BLK_SETTLEMENTS","BLK_ACC_COLL_LINK_DTLS");
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

ArrFuncOrigin["OLDCUINF"]="KERNEL";
ArrPrntFunc["OLDCUINF"]="";
ArrPrntOrigin["OLDCUINF"]="";
ArrRoutingType["OLDCUINF"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLDCUINF"]="N";
ArrCustomModified["OLDCUINF"]="N";

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
var actStageArry = {"QUERY":"2","NEW":"1","MODIFY":"1","AUTHORIZE":"1","DELETE":"1","CLOSE":"1","REOPEN":"1","REVERSE":"1","ROLLOVER":"1","CONFIRM":"1","LIQUIDATE":"1","SUMMARYQUERY":"2"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------