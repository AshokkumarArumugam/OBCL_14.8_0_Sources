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
**  File Name          : LBDOLOVD_SYS.js
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
var fieldNameArray = {"BLK_OLTBS_CONTRACT_MASTER":"VERSION_NO~CONTRACT_REF_NO~CURRENCY~TRANCHE_REF_NO~CUSIP_NO~FACILITY_NAME~SUM_COLL_OPENING_BAL~SUM_COLL_CLOSING_BAL~SUM_OVERRIDE_COLL_BAL~SUM_CURRENT_DAY_ACTION~PRODUCT_CODE~PRODUCT_DESC~PROD_TYPE_DESC~UI_CHECKER_ID~UI_AUTH_STAT~UI_MAKER_DT_STAMP~UI_MOD_NO~UI_ONCE_AUTH~UI_MAKER_ID~UI_RECORD_STAT~UI_CHECKER_DT_STAMP","BLK_LBTBS_COLL_OVD":"PARITICIPANT~VERSION_NO~CONTRACT_REF_NO~OVERRIDE_COLL_BAL~OVERRIDE~CHECKER_ID~AUTH_STAT~MAKER_DT_STAMP~MOD_NO~ONCE_AUTH~MAKER_ID~RECORD_STAT~CHECKER_DT_STAMP~TRANCHE_REF_NO~COLL_OPENING_BAL~COLL_CLOSING_BAL~OLD_OVERRIDE_COLL_BAL~CURRENT_DAY_ACTION"};

var multipleEntryPageSize = {"BLK_LBTBS_COLL_OVD" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_LBTBS_COLL_OVD"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTBS_CONTRACT_MASTER">VERSION_NO~CONTRACT_REF_NO~CURRENCY~TRANCHE_REF_NO~CUSIP_NO~FACILITY_NAME~SUM_COLL_OPENING_BAL~SUM_COLL_CLOSING_BAL~SUM_OVERRIDE_COLL_BAL~SUM_CURRENT_DAY_ACTION~PRODUCT_CODE~PRODUCT_DESC~PROD_TYPE_DESC~UI_CHECKER_ID~UI_AUTH_STAT~UI_MAKER_DT_STAMP~UI_MOD_NO~UI_ONCE_AUTH~UI_MAKER_ID~UI_RECORD_STAT~UI_CHECKER_DT_STAMP</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONTRACT_MASTER" RELATION_TYPE="N" TYPE="BLK_LBTBS_COLL_OVD">PARITICIPANT~VERSION_NO~CONTRACT_REF_NO~OVERRIDE_COLL_BAL~OVERRIDE~CHECKER_ID~AUTH_STAT~MAKER_DT_STAMP~MOD_NO~ONCE_AUTH~MAKER_ID~RECORD_STAT~CHECKER_DT_STAMP~TRANCHE_REF_NO~COLL_OPENING_BAL~COLL_CLOSING_BAL~OLD_OVERRIDE_COLL_BAL~CURRENT_DAY_ACTION</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTBS_CONTRACT_MASTER">CONTRACT_REF_NO~VERSION_NO</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "LBDOLOVD";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_OLTBS_CONTRACT_MASTER";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_OLTBS_CONTRACT_MASTER" : "","BLK_LBTBS_COLL_OVD" : "BLK_OLTBS_CONTRACT_MASTER~N"}; 

 var dataSrcLocationArray = new Array("BLK_OLTBS_CONTRACT_MASTER","BLK_LBTBS_COLL_OVD"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LBDOLOVD.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LBDOLOVD.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_OLTBS_CONTRACT_MASTER__CONTRACT_REF_NO";
pkFields[0] = "BLK_OLTBS_CONTRACT_MASTER__CONTRACT_REF_NO";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_LBTBS_COLL_OVD":["AUTH_STAT","CHECKER_DT_STAMP","CHECKER_ID","CURRENT_DAY_ACTION","MAKER_DT_STAMP","MAKER_ID","MOD_NO","ONCE_AUTH","OVERRIDE","OVERRIDE_COLL_BAL","RECORD_STAT"]};
var closeAmendArr = new Array(); 
var reopenAmendArr = new Array(); 
var reverseAmendArr = new Array(); 
var deleteAmendArr = new Array(); 
var rolloverAmendArr = new Array(); 
var confirmAmendArr = new Array(); 
var liquidateAmendArr = new Array(); 
var queryAmendArr = new Array(); 
//***** Fields Amendable while Authorize *****
var authorizeAmenArr = {"BLK_LBTBS_COLL_OVD":["AUTH_STAT","CHECKER_DT_STAMP","CHECKER_ID","MAKER_DT_STAMP","MAKER_ID","MOD_NO","ONCE_AUTH","OVERRIDE","OVERRIDE_COLL_BAL","RECORD_STAT"]};
//----------------------------------------------------------------------------------------------------------------------

var subsysArr    = new Array(); 

//----------------------------------------------------------------------------------------------------------------------

//***** CODE FOR LOVs *****
//----------------------------------------------------------------------------------------------------------------------
var lovInfoFlds = {};
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
var multipleEntryIDs = new Array("BLK_LBTBS_COLL_OVD");
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

ArrFuncOrigin["LBDOLOVD"]="KERNEL";
ArrPrntFunc["LBDOLOVD"]="";
ArrPrntOrigin["LBDOLOVD"]="";
ArrRoutingType["LBDOLOVD"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LBDOLOVD"]="N";
ArrCustomModified["LBDOLOVD"]="N";

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