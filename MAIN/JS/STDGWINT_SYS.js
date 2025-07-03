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
**  File Name          : STDGWINT_SYS.js
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
var fieldNameArray = {"BLK_GWTMS_MT_TASK_INITIATION":"BRANCH_CODE~EXT_SYSTEM~MODULE_CODE~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH","BLK_GWTBS_MULT_TASK_INITIATION":"BRANCH_CODE~EXT_SYSTEM~MODULE_CODE~SERVICE_NAME~OPERATION_CODE~TASK_INIT_REQD~EFFECTIVE_DATE"};

var multipleEntryPageSize = {"BLK_GWTBS_MULT_TASK_INITIATION" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_GWTBS_MULT_TASK_INITIATION"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_GWTMS_MT_TASK_INITIATION">BRANCH_CODE~EXT_SYSTEM~MODULE_CODE~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
msgxml += '      <FN PARENT="BLK_GWTMS_MT_TASK_INITIATION" RELATION_TYPE="N" TYPE="BLK_GWTBS_MULT_TASK_INITIATION">BRANCH_CODE~EXT_SYSTEM~MODULE_CODE~SERVICE_NAME~OPERATION_CODE~TASK_INIT_REQD~EFFECTIVE_DATE</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_GWTMS_MT_TASK_INITIATION">AUTHSTAT~TXNSTAT~BRANCH_CODE~EXT_SYSTEM~MODULE_CODE</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "STDGWINT";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_GWTMS_MT_TASK_INITIATION";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_GWTMS_MT_TASK_INITIATION" : "","BLK_GWTBS_MULT_TASK_INITIATION" : "BLK_GWTMS_MT_TASK_INITIATION~N"}; 

 var dataSrcLocationArray = new Array("BLK_GWTMS_MT_TASK_INITIATION","BLK_GWTBS_MULT_TASK_INITIATION"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside STDGWINT.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside STDGWINT.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_GWTMS_MT_TASK_INITIATION__BRANCH_CODE";
pkFields[0] = "BLK_GWTMS_MT_TASK_INITIATION__BRANCH_CODE";
queryFields[1] = "BLK_GWTMS_MT_TASK_INITIATION__EXT_SYSTEM";
pkFields[1] = "BLK_GWTMS_MT_TASK_INITIATION__EXT_SYSTEM";
queryFields[2] = "BLK_GWTMS_MT_TASK_INITIATION__MODULE_CODE";
pkFields[2] = "BLK_GWTMS_MT_TASK_INITIATION__MODULE_CODE";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_GWTBS_MULT_TASK_INITIATION":["EFFECTIVE_DATEI","OPERATION_CODE","SERVICE_NAME","TASK_INIT_REQD"]};
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
var lovInfoFlds = {"BLK_GWTMS_MT_TASK_INITIATION__BRANCH_CODE__LOV_BRANCH":["BLK_GWTMS_MT_TASK_INITIATION__BRANCH_CODE~~","","N~N",""],"BLK_GWTMS_MT_TASK_INITIATION__EXT_SYSTEM__LOV_EXT_SYS":["BLK_GWTMS_MT_TASK_INITIATION__EXT_SYSTEM~~","","N~N",""],"BLK_GWTMS_MT_TASK_INITIATION__MODULE_CODE__LOV_MODULE_CODE":["BLK_GWTMS_MT_TASK_INITIATION__MODULE_CODE~~","","N~N",""],"BLK_GWTBS_MULT_TASK_INITIATION__SERVICE_NAME__LOV_SERVICE_NAME":["BLK_GWTBS_MULT_TASK_INITIATION__SERVICE_NAME~","BLK_GWTMS_MT_TASK_INITIATION__MODULE_CODE!STRING","N",""],"BLK_GWTBS_MULT_TASK_INITIATION__OPERATION_CODE__LOV_OPERATION_CODE":["BLK_GWTBS_MULT_TASK_INITIATION__OPERATION_CODE~","BLK_GWTBS_MULT_TASK_INITIATION__SERVICE_NAME!STRING~BLK_GWTMS_MT_TASK_INITIATION__MODULE_CODE!STRING","N",""]};
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
var multipleEntryIDs = new Array("BLK_GWTBS_MULT_TASK_INITIATION");
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

ArrFuncOrigin["STDGWINT"]="KERNEL";
ArrPrntFunc["STDGWINT"]="";
ArrPrntOrigin["STDGWINT"]="";
ArrRoutingType["STDGWINT"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["STDGWINT"]="N";
ArrCustomModified["STDGWINT"]="N";

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
var actStageArry = {"QUERY":"","NEW":"","MODIFY":"","AUTHORIZE":"","DELETE":"","CLOSE":"","REOPEN":"","REVERSE":"","ROLLOVER":"","CONFIRM":"","LIQUIDATE":"","SUMMARYQUERY":"1"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------