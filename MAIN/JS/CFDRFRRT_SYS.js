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
**  File Name          : CFDRFRRT_SYS.js
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
var fieldNameArray = {"BLK_CFTMS_RFR_MASTER":"BRANCH_CODE~RATE_CODE~RATE_DESCR~FL_BR_RATE_PROP~TYPE~RATE_CODE_TYPE~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH","BLK_CFTMS_RFR_CCY":"BRANCH_CODE~CCY_CODE~RATE_CODE~CCY_DESC","BLK_CFTMS_RFR_DETAIL":"BRANCH_CODE~CCY_CODE~EFFECTIVE_DATE~INT_RATE~RATE_CODE~NUM_VOLUME~PERCNTL_1ST~PERCNTL_25TH~PERCNTL_75TH~PERCNTL_99TH~RATE_RCVD_DATE~RATE_APPLICABLE_DAYS~RATE_CAPTURE_DATE"};

var multipleEntryPageSize = {"BLK_CFTMS_RFR_CCY" :"15" ,"BLK_CFTMS_RFR_DETAIL" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_CFTMS_RFR_CCY~BLK_CFTMS_RFR_DETAIL"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_CFTMS_RFR_MASTER">BRANCH_CODE~RATE_CODE~RATE_DESCR~FL_BR_RATE_PROP~TYPE~RATE_CODE_TYPE~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
msgxml += '      <FN PARENT="BLK_CFTMS_RFR_MASTER" RELATION_TYPE="N" TYPE="BLK_CFTMS_RFR_CCY">BRANCH_CODE~CCY_CODE~RATE_CODE~CCY_DESC</FN>'; 
msgxml += '      <FN PARENT="BLK_CFTMS_RFR_CCY" RELATION_TYPE="N" TYPE="BLK_CFTMS_RFR_DETAIL">BRANCH_CODE~CCY_CODE~EFFECTIVE_DATE~INT_RATE~RATE_CODE~NUM_VOLUME~PERCNTL_1ST~PERCNTL_25TH~PERCNTL_75TH~PERCNTL_99TH~RATE_RCVD_DATE~RATE_APPLICABLE_DAYS~RATE_CAPTURE_DATE</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_CFTMS_RFR_MASTER">AUTHSTAT~TXNSTAT~BRANCH_CODE~RATE_CODE~RATE_DESCR</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "CFDRFRRT";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_CFTMS_RFR_MASTER";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_CFTMS_RFR_MASTER" : "","BLK_CFTMS_RFR_CCY" : "BLK_CFTMS_RFR_MASTER~N","BLK_CFTMS_RFR_DETAIL" : "BLK_CFTMS_RFR_CCY~N"}; 

 var dataSrcLocationArray = new Array("BLK_CFTMS_RFR_MASTER","BLK_CFTMS_RFR_CCY","BLK_CFTMS_RFR_DETAIL"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside CFDRFRRT.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside CFDRFRRT.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_CFTMS_RFR_MASTER__BRANCH_CODE";
pkFields[0] = "BLK_CFTMS_RFR_MASTER__BRANCH_CODE";
queryFields[1] = "BLK_CFTMS_RFR_MASTER__RATE_CODE";
pkFields[1] = "BLK_CFTMS_RFR_MASTER__RATE_CODE";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_CFTMS_RFR_DETAIL":["EFFECTIVE_DATEI","INT_RATE","NUM_VOLUME","PERCNTL_1ST","PERCNTL_25TH","PERCNTL_75TH","PERCNTL_99TH","RATE_APPLICABLE_DAYS","RATE_CAPTURE_DATE","RATE_RCVD_DATEI"],"BLK_CFTMS_RFR_MASTER":["FL_BR_RATE_PROP"]};
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
var lovInfoFlds = {"BLK_CFTMS_RFR_MASTER__BRANCH_CODE__LOV_BRANCH":["BLK_CFTMS_RFR_MASTER__BRANCH_CODE~~","","N~N",""],"BLK_CFTMS_RFR_MASTER__RATE_CODE__LOV_RATE":["BLK_CFTMS_RFR_MASTER__RATE_CODE~BLK_CFTMS_RFR_MASTER__RATE_DESCR~BLK_CFTMS_RFR_MASTER__RATE_CODE_TYPE~","","N~N~N",""],"BLK_CFTMS_RFR_CCY__CCY_CODE__LOV_CCY":["BLK_CFTMS_RFR_CCY__CCY_CODE~~","","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_CFTMS_RFR_CCY","BLK_CFTMS_RFR_DETAIL");
var multipleEntryArray = new Array();
var multipleEntryCells = new Array();
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY VIEW SINGLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR ATTACHED CALLFORMS *****
 //----------------------------------------------------------------------------------------------------------------------

 var CallFormArray= new Array("CSCFNUDF~BLK_CFTMS_RFR_MASTER"); 

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

ArrFuncOrigin["CFDRFRRT"]="KERNEL";
ArrPrntFunc["CFDRFRRT"]="";
ArrPrntOrigin["CFDRFRRT"]="";
ArrRoutingType["CFDRFRRT"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["CFDRFRRT"]="N";
ArrCustomModified["CFDRFRRT"]="N";

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
var actStageArry = {"QUERY":"2","NEW":"2","MODIFY":"2","AUTHORIZE":"2","DELETE":"2","CLOSE":"2","REOPEN":"2","REVERSE":"1","ROLLOVER":"1","CONFIRM":"1","LIQUIDATE":"1","SUMMARYQUERY":"2"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------