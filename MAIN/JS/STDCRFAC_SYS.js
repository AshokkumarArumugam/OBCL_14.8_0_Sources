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
**  File Name          : STDCRFAC_SYS.js
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
var fieldNameArray = {"BLK_FACILITY":"ID~LINE_CURRENCY~LINE_START_DATE~LINE_EXPIRY_DATE~AVAILABILITY_FLAG~TRANSFER_AMOUNT~MAIN_LINE_ID~BLOCK_AMOUNT~BOOKING_DATE~INTEREST_CALC_ACC~LMT_AMT_BASIS~INTEREST_REQD~LIMIT_AMOUNT~COLLATERAL_CONTRIBUTION~LIAB_BR~BRN~DESCRIPTION~COMMITMENT_REF_NO~COMMITMENT_SETTL_BRN~COMMITMENT_SETTL_ACC~FACILITY_TYPE~PPC_REF_NO~PPC_PROJECT_ID~DSP_EFF_LINE_AMOUNT~BULK_PMT_REQD~UNADVISED~REVOLVING_LINE~LIAB_ID~LINE_CODE~LINE_SERIAL~LIAB_NO~LIAB_NAME~LIAB_BRANCH~LIAB_CCY~OVERALL_LIMIT~SOURCE_SYSTEM_LINE_CODE~SOURCE_SYSTEM_LINE_SERIAL~HOST_CODE~SOURCE_SYSTEM~SOURCE_SYSTEM_LIAB_ID~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH"};

var multipleEntryPageSize = {};

var multipleEntrySVBlocks = "";

var tabMEBlks = {};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_FACILITY">ID~LINE_CURRENCY~LINE_START_DATE~LINE_EXPIRY_DATE~AVAILABILITY_FLAG~TRANSFER_AMOUNT~MAIN_LINE_ID~BLOCK_AMOUNT~BOOKING_DATE~INTEREST_CALC_ACC~LMT_AMT_BASIS~INTEREST_REQD~LIMIT_AMOUNT~COLLATERAL_CONTRIBUTION~LIAB_BR~BRN~DESCRIPTION~COMMITMENT_REF_NO~COMMITMENT_SETTL_BRN~COMMITMENT_SETTL_ACC~FACILITY_TYPE~PPC_REF_NO~PPC_PROJECT_ID~DSP_EFF_LINE_AMOUNT~BULK_PMT_REQD~UNADVISED~REVOLVING_LINE~LIAB_ID~LINE_CODE~LINE_SERIAL~LIAB_NO~LIAB_NAME~LIAB_BRANCH~LIAB_CCY~OVERALL_LIMIT~SOURCE_SYSTEM_LINE_CODE~SOURCE_SYSTEM_LINE_SERIAL~HOST_CODE~SOURCE_SYSTEM~SOURCE_SYSTEM_LIAB_ID~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_FACILITY_SUMMARY">AUTHSTAT~TXNSTAT~LINE_CODE~LINE_SERIAL~LINE_CURRENCY~LINE_START_DATE~LINE_EXPIRY_DATE~ID~AVAILABILITY_FLAG~BRN~LIMIT_AMOUNT~HOST_CODE~SOURCE_SYSTEM~LIAB_NO</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "STDCRFAC";
var defaultWhereClause = "BRN = GLOBAL.CURRENT_BRANCH";
var defaultOrderByClause ="";
var multiBrnWhereClause ="EXISTS (SELECT BRANCH_CODE FROM SMVW_USER_BRANCHES WHERE USER_ID = GLOBAL.USER_ID)";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_FACILITY_SUMMARY";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_FACILITY" : ""}; 

 var dataSrcLocationArray = new Array("BLK_FACILITY"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside STDCRFAC.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside STDCRFAC.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_FACILITY__ID";
pkFields[0] = "BLK_FACILITY__ID";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_FACILITY":["AVAILABILITY_FLAG","BLOCK_AMOUNT","BOOKING_DATE","BRN","BTN_FIELDS","BULK_PMT_REQD","COLLATERAL_CONTRIBUTION","DESCRIPTION","DSP_EFF_LINE_AMOUNT","FACILITY_TYPE","HOST_CODE","INTEREST_CALC_ACC","INTEREST_REQD","LIAB_BR","LIAB_BRANCH","LIAB_CCY","LIAB_ID","LIAB_NAME","LIAB_NO","LIMIT_AMOUNT","LINE_CODE","LINE_CURRENCY","LINE_EXPIRY_DATEI","LINE_SERIAL","LINE_START_DATEI","LMT_AMT_BASIS","MAIN_LINE_ID","OVERALL_LIMIT","REVOLVING_LINE","SOURCE_SYSTEM","SOURCE_SYSTEM_LIAB_ID","SOURCE_SYSTEM_LINE_CODE","SOURCE_SYSTEM_LINE_SERIAL","TRANSFER_AMOUNT","UNADVISED"]};
var closeAmendArr = new Array(); 
var reopenAmendArr = new Array(); 
var reverseAmendArr = new Array(); 
var deleteAmendArr = new Array(); 
var rolloverAmendArr = new Array(); 
var confirmAmendArr = new Array(); 
var liquidateAmendArr = new Array(); 
//***** Fields Amendable while Query *****
var queryAmendArr = {"BLK_FACILITY":["LIAB_NO","LINE_CODE","LINE_SERIAL"]};
var authorizeAmendArr = new Array(); 
//----------------------------------------------------------------------------------------------------------------------

var subsysArr    = new Array(); 

//----------------------------------------------------------------------------------------------------------------------

//***** CODE FOR LOVs *****
//----------------------------------------------------------------------------------------------------------------------
var lovInfoFlds = {"BLK_FACILITY__LINE_CURRENCY__LOV_LINE_CURRENCY":["BLK_FACILITY__LINE_CURRENCY~~","","N~N",""],"BLK_FACILITY__INTEREST_CALC_ACC__LOV_ICAC":["BLK_FACILITY__INTEREST_CALC_ACC~~~~~~","BLK_FACILITY__LIAB_ID!~BLK_FACILITY__LINE_CURRENCY!~BLK_FACILITY__BRN!","N~N~N~N~N~N",""],"BLK_FACILITY__BRN__LOV_BRANCH_CODE":["BLK_FACILITY__BRN~~","","N~N",""],"BLK_FACILITY__LIAB_NO__LOV_LIAB_ID":["BLK_FACILITY__LIAB_NO~BLK_FACILITY__LIAB_NAME~BLK_FACILITY__LIAB_ID~","","N~N~N",""],"BLK_FACILITY__HOST_CODE__LOV_HOSTCODE":["BLK_FACILITY__HOST_CODE~","","N",""],"BLK_FACILITY__SOURCE_SYSTEM__LOV_SOURCE_SYSTEM":["BLK_FACILITY__SOURCE_SYSTEM~","","N",""]};
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
var multipleEntryIDs = new Array();
var multipleEntryArray = new Array();
var multipleEntryCells = new Array();
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY VIEW SINGLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR ATTACHED CALLFORMS *****
 //----------------------------------------------------------------------------------------------------------------------

 var CallFormArray= new Array("CSCFNUDF~BLK_FACILITY"); 

 var CallFormRelat=new Array(""); 

 var CallRelatType= new Array("N"); 


 var ArrFuncOrigin=new Array();
 var ArrPrntFunc=new Array();
 var ArrPrntOrigin=new Array();
 var ArrRoutingType=new Array();


 // Code for Loading Cluster/Custom js File Starts
 var ArrClusterModified=new Array();
 var ArrCustomModified=new Array();
 // Code for Loading Cluster/Custom js File ends

ArrFuncOrigin["STDCRFAC"]="KERNEL";
ArrPrntFunc["STDCRFAC"]="";
ArrPrntOrigin["STDCRFAC"]="";
ArrRoutingType["STDCRFAC"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["STDCRFAC"]="N";
ArrCustomModified["STDCRFAC"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CSCFNUDF":""};
var scrArgSource = {"CSCFNUDF":""};
var scrArgVals = {"CSCFNUDF":""};
var scrArgDest = {};
//***** CODE FOR SUB-SYSTEM DEPENDENT  FIELDS   *****
//----------------------------------------------------------------------------------------------------------------------
var dpndntOnFlds = {"CSCFNUDF":""};
var dpndntOnSrvs = {"CSCFNUDF":""};
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