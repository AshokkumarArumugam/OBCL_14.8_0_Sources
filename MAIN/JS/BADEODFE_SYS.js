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
**  File Name          : BADEODFE_SYS.js
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
var fieldNameArray = {"BLK_AETBS_FUNC_MASTER":"BRANCH_CODE~FUNCTION_ID~EOC_GROUP~ORIENTATION~DESCRIPTION~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH","BLK_AETBS_FUNC_DETAIL":"BRANCH_CODE_DET~FUNCTION_ID_DET~EOC_GROUP_DET~PARAM_NAME~PARAM_TYPE~PARAM_VALUE~DATE_FORMAT"};

var multipleEntryPageSize = {"BLK_AETBS_FUNC_DETAIL" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_AETBS_FUNC_DETAIL"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_AETBS_FUNC_MASTER">BRANCH_CODE~FUNCTION_ID~EOC_GROUP~ORIENTATION~DESCRIPTION~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
msgxml += '      <FN PARENT="BLK_AETBS_FUNC_MASTER" RELATION_TYPE="N" TYPE="BLK_AETBS_FUNC_DETAIL">BRANCH_CODE_DET~FUNCTION_ID_DET~EOC_GROUP_DET~PARAM_NAME~PARAM_TYPE~PARAM_VALUE~DATE_FORMAT</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_AETBS_FUNC_MASTER">AUTHSTAT~TXNSTAT~BRANCH_CODE~FUNCTION_ID~EOC_GROUP</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "BADEODFE";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_AETBS_FUNC_MASTER";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_AETBS_FUNC_MASTER" : "","BLK_AETBS_FUNC_DETAIL" : "BLK_AETBS_FUNC_MASTER~N"}; 

 var dataSrcLocationArray = new Array("BLK_AETBS_FUNC_MASTER","BLK_AETBS_FUNC_DETAIL"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside BADEODFE.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside BADEODFE.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_AETBS_FUNC_MASTER__BRANCH_CODE";
pkFields[0] = "BLK_AETBS_FUNC_MASTER__BRANCH_CODE";
queryFields[1] = "BLK_AETBS_FUNC_MASTER__FUNCTION_ID";
pkFields[1] = "BLK_AETBS_FUNC_MASTER__FUNCTION_ID";
queryFields[2] = "BLK_AETBS_FUNC_MASTER__EOC_GROUP";
pkFields[2] = "BLK_AETBS_FUNC_MASTER__EOC_GROUP";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_AETBS_FUNC_DETAIL":["DATE_FORMAT","PARAM_NAME","PARAM_TYPE","PARAM_VALUE"],"BLK_AETBS_FUNC_MASTER":["ORIENTATION"]};
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
var lovInfoFlds = {"BLK_AETBS_FUNC_MASTER__BRANCH_CODE__LOV_BRANCH_CODE":["BLK_AETBS_FUNC_MASTER__BRANCH_CODE~","","N",""],"BLK_AETBS_FUNC_MASTER__FUNCTION_ID__LOV_FUNCTION_ID":["BLK_AETBS_FUNC_MASTER__FUNCTION_ID~BLK_AETBS_FUNC_MASTER__DESCRIPTION~","","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_AETBS_FUNC_DETAIL");
var multipleEntryArray = new Array();
var multipleEntryCells = new Array();
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY VIEW SINGLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR ATTACHED CALLFORMS *****
 //----------------------------------------------------------------------------------------------------------------------

 var CallFormArray= new Array("CSCFNUDF~BLK_AETBS_FUNC_MASTER"); 

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

ArrFuncOrigin["BADEODFE"]="KERNEL";
ArrPrntFunc["BADEODFE"]="";
ArrPrntOrigin["BADEODFE"]="";
ArrRoutingType["BADEODFE"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["BADEODFE"]="N";
ArrCustomModified["BADEODFE"]="N";

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
var actStageArry = {"QUERY":"2","NEW":"2","MODIFY":"2","AUTHORIZE":"1","DELETE":"1","CLOSE":"1","REOPEN":"1","REVERSE":"1","ROLLOVER":"1","CONFIRM":"1","LIQUIDATE":"1","SUMMARYQUERY":"1"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------