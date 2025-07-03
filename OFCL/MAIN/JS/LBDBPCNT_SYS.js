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
**  File Name          : LBDBPCNT_SYS.js
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
var fieldNameArray = {"BLK_LBVWS_BORR_TRNSPROC_STATUS":"BORROWER_REF_NO~DEPARTMENT_CODE~BRANCH~TREASURY_SOURCE~B_PROC~B_UPROC~B_WIP~B_FAIL~USER_REF_NO~COUNTERPARTY~COUNTERPARTY_NAME~TRANSACTION_STATUS","BLK_LBTBS_PART_PROC_STAT":"BORROWER_REF_NO~PARTICIPANT_REF_NO~CUSTOMER_REF_NO~COUTERPARTY~TP_STATUS~PARTICIPANT_TYPE~P_PROC~P_UPROC~P_WIP~P_FAIL~ERROR_MESSAGE~COUNTERPARTY_NAME~EVENT_SEQ_NO~EVENT_CODE~ERROR_CODE~MODULE","BLK_BTN":""};

var multipleEntryPageSize = {"BLK_LBTBS_PART_PROC_STAT" :"15" };

var multipleEntrySVBlocks = "BLK_LBTBS_PART_PROC_STAT";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_LBTBS_PART_PROC_STAT"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_LBVWS_BORR_TRNSPROC_STATUS">BORROWER_REF_NO~DEPARTMENT_CODE~BRANCH~TREASURY_SOURCE~B_PROC~B_UPROC~B_WIP~B_FAIL~USER_REF_NO~COUNTERPARTY~COUNTERPARTY_NAME~TRANSACTION_STATUS</FN>'; 
msgxml += '      <FN PARENT="BLK_LBVWS_BORR_TRNSPROC_STATUS" RELATION_TYPE="N" TYPE="BLK_LBTBS_PART_PROC_STAT">BORROWER_REF_NO~PARTICIPANT_REF_NO~CUSTOMER_REF_NO~COUTERPARTY~TP_STATUS~PARTICIPANT_TYPE~P_PROC~P_UPROC~P_WIP~P_FAIL~ERROR_MESSAGE~COUNTERPARTY_NAME~EVENT_SEQ_NO~EVENT_CODE~ERROR_CODE~MODULE</FN>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_BTN"></FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_LBVWS_BORR_TRNSPROC_STATUS">BORROWER_REF_NO~DEPARTMENT_CODE~BRANCH~TREASURY_SOURCE</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "LBDBPCNT";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_LBVWS_BORR_TRNSPROC_STATUS";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_LBVWS_BORR_TRNSPROC_STATUS" : "","BLK_LBTBS_PART_PROC_STAT" : "BLK_LBVWS_BORR_TRNSPROC_STATUS~N","BLK_BTN" : ""}; 

 var dataSrcLocationArray = new Array("BLK_LBVWS_BORR_TRNSPROC_STATUS","BLK_LBTBS_PART_PROC_STAT","BLK_BTN"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LBDBPCNT.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LBDBPCNT.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_LBVWS_BORR_TRNSPROC_STATUS__BORROWER_REF_NO";
pkFields[0] = "BLK_LBVWS_BORR_TRNSPROC_STATUS__BORROWER_REF_NO";
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
var lovInfoFlds = {"BLK_LBVWS_BORR_TRNSPROC_STATUS__BORROWER_REF_NO__LOV_BORR_TRNSPROC_STATUS":["BLK_LBVWS_BORR_TRNSPROC_STATUS__BORROWER_REF_NO~BLK_LBVWS_BORR_TRNSPROC_STATUS__BRANCH~BLK_LBVWS_BORR_TRNSPROC_STATUS__DEPARTMENT_CODE~BLK_LBVWS_BORR_TRNSPROC_STATUS__TREASURY_SOURCE~BLK_LBVWS_BORR_TRNSPROC_STATUS__COUNTERPARTY~BLK_LBVWS_BORR_TRNSPROC_STATUS__COUNTERPARTY_NAME~BLK_LBVWS_BORR_TRNSPROC_STATUS__USER_REF_NO~BLK_LBVWS_BORR_TRNSPROC_STATUS__TRANSACTION_STATUS~","","N~N~N~N~N~N~N~N",""],"BLK_LBVWS_BORR_TRNSPROC_STATUS__BORROWER_REF_NO__LOV_BORR_TRNSPROC_STATUS_S":["BLK_LBVWS_BORR_TRNSPROC_STATUS__BORROWER_REF_NO~~~~~~~~~","","N~N~N~N~N~N~N~N",""],"BLK_LBVWS_BORR_TRNSPROC_STATUS__DEPARTMENT_CODE__LOV_BORR_TRNSPROC_STATUS_S":["BLK_LBVWS_BORR_TRNSPROC_STATUS__BORROWER_REF_NO~~~~~~~~~","","N~N~N~N~N~N~N~N",""],"BLK_LBVWS_BORR_TRNSPROC_STATUS__BRANCH__LOV_BORR_TRNSPROC_STATUS_S":["BLK_LBVWS_BORR_TRNSPROC_STATUS__BORROWER_REF_NO~~~~~~~~~","","N~N~N~N~N~N~N~N",""],"BLK_LBVWS_BORR_TRNSPROC_STATUS__TREASURY_SOURCE__LOV_BORR_TRNSPROC_STATUS_S":["BLK_LBVWS_BORR_TRNSPROC_STATUS__BORROWER_REF_NO~~~~~~~~~","","N~N~N~N~N~N~N~N",""]};
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
var multipleEntryIDs = new Array("BLK_LBTBS_PART_PROC_STAT");
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

ArrFuncOrigin["LBDBPCNT"]="KERNEL";
ArrPrntFunc["LBDBPCNT"]="";
ArrPrntOrigin["LBDBPCNT"]="";
ArrRoutingType["LBDBPCNT"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LBDBPCNT"]="N";
ArrCustomModified["LBDBPCNT"]="N";

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