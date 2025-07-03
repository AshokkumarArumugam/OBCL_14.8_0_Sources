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
**  File Name          : OLDPSUPL_SYS.js
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
var fieldNameArray = {"BLK_SCHEDULE_MASTER":"AUTHSTAT~CHECKER_DT_STAMP~CHECKER_ID~FILE_NAME~MAKER_DT_STAMP~MAKER_ID~MOD_NO~ONCE_AUTH~TXNSTAT~REFERENCE_NO","BLK_SCHEDULE_UPLOAD":"CURRENCY~AMOUNT~AUTH_STAT~BRANCH~CHECKER_DT_STAMP~CHECKER_ID~COMPONENT~CONTRACT_REF_NO~FILE_NAME~FREQUENCY~FREQUENCY_UNIT~MAKER_DT_STAMP~MAKER_ID~RECORD_STAT~REFERENCE_NO~START_DATE","BLK_SCHEDULE_SUMMARY":"AUTH_STAT~CHECKER_ID~MAKER_ID~FILE_NAME~REFERENCE_NO","BLK_SCHEDULE_MASTER_EXP":"REFERENCE_NO","BLK_SCHEDULE_EXCEPTION":"ERROR_CODE~ERROR_PARAMETERS~SOURCE_REF~TXTEXP"};

var multipleEntryPageSize = {"BLK_SCHEDULE_UPLOAD" :"15" ,"BLK_SCHEDULE_EXCEPTION" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_SCHEDULE_UPLOAD","CVS_ERROR_LOG__TAB_MAIN":"BLK_SCHEDULE_EXCEPTION"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_SCHEDULE_MASTER">AUTHSTAT~CHECKER_DT_STAMP~CHECKER_ID~FILE_NAME~MAKER_DT_STAMP~MAKER_ID~MOD_NO~ONCE_AUTH~TXNSTAT~REFERENCE_NO</FN>'; 
msgxml += '      <FN PARENT="BLK_SCHEDULE_MASTER" RELATION_TYPE="N" TYPE="BLK_SCHEDULE_UPLOAD">CURRENCY~AMOUNT~AUTH_STAT~BRANCH~CHECKER_DT_STAMP~CHECKER_ID~COMPONENT~CONTRACT_REF_NO~FILE_NAME~FREQUENCY~FREQUENCY_UNIT~MAKER_DT_STAMP~MAKER_ID~RECORD_STAT~REFERENCE_NO~START_DATE</FN>'; 
msgxml += '      <FN PARENT="BLK_SCHEDULE_MASTER" RELATION_TYPE="1" TYPE="BLK_SCHEDULE_SUMMARY">AUTH_STAT~CHECKER_ID~MAKER_ID~FILE_NAME~REFERENCE_NO</FN>'; 
msgxml += '      <FN PARENT="BLK_SCHEDULE_MASTER" RELATION_TYPE="1" TYPE="BLK_SCHEDULE_MASTER_EXP">REFERENCE_NO</FN>'; 
msgxml += '      <FN PARENT="BLK_SCHEDULE_MASTER_EXP" RELATION_TYPE="N" TYPE="BLK_SCHEDULE_EXCEPTION">ERROR_CODE~ERROR_PARAMETERS~SOURCE_REF~TXTEXP</FN>'; 
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
msgxml_sum += '      <FN PARENT="BLK_SCHEDULE_MASTER" RELATION_TYPE="1" TYPE="BLK_SCHEDULE_SUMMARY">REFERENCE_NO~AUTH_STAT~MAKER_ID~CHECKER_ID~FILE_NAME</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "OLDPSUPL";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_SCHEDULE_SUMMARY";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_SCHEDULE_MASTER" : "","BLK_SCHEDULE_UPLOAD" : "BLK_SCHEDULE_MASTER~N","BLK_SCHEDULE_SUMMARY" : "BLK_SCHEDULE_MASTER~1","BLK_SCHEDULE_MASTER_EXP" : "BLK_SCHEDULE_MASTER~1","BLK_SCHEDULE_EXCEPTION" : "BLK_SCHEDULE_MASTER_EXP~N"}; 

 var dataSrcLocationArray = new Array("BLK_SCHEDULE_MASTER","BLK_SCHEDULE_UPLOAD","BLK_SCHEDULE_SUMMARY","BLK_SCHEDULE_MASTER_EXP","BLK_SCHEDULE_EXCEPTION"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLDPSUPL.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLDPSUPL.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_SCHEDULE_MASTER__REFERENCE_NO";
pkFields[0] = "BLK_SCHEDULE_MASTER__REFERENCE_NO";
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
var lovInfoFlds = {"BLK_SCHEDULE_SUMMARY__REFERENCE_NO__LOV_REFERENCE_NO":["~","","N",""]};
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
var multipleEntryIDs = new Array("BLK_SCHEDULE_UPLOAD","BLK_SCHEDULE_EXCEPTION");
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

ArrFuncOrigin["OLDPSUPL"]="KERNEL";
ArrPrntFunc["OLDPSUPL"]="";
ArrPrntOrigin["OLDPSUPL"]="";
ArrRoutingType["OLDPSUPL"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLDPSUPL"]="N";
ArrCustomModified["OLDPSUPL"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_ERROR_LOG":"REFNO"};
var scrArgSource = {"CVS_ERROR_LOG":"BLK_SCHEDULE_MASTER__REFERENCE_NO"};
var scrArgVals = {"CVS_ERROR_LOG":""};
var scrArgDest = {"CVS_ERROR_LOG":"BLK_SCHEDULE_MASTER_EXP__REFERENCE_NO"};
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