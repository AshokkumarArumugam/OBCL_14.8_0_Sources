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
**  File Name          : EIDMANPE_SYS.js
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
var fieldNameArray = {"BLK_EITMS_MODULES_INSTALLED":"BRANCH_CODE~FUNCTION_ID~MODULE_ID~FREQUENCY~NO_DAYS~HOLIDAY_RULE~RUN_DATE~SEQ_NO~EOC_GROUP~ERR_HANDLING~JOB_CODE~EXECUTION_LAYER~ERROR_HANDLING~EXTERNAL_IND~EOC_GROUP_STAGE~FUNC_DESCRIPTION~JOB_DESCRIPTION~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH","BLK_EITMS_MODULES_PREDECESSORS":"BRANCH_CODE~EOC_GROUP~MODULE_ID~FUNCTION_ID~PREDECESSOR"};

var multipleEntryPageSize = {"BLK_EITMS_MODULES_PREDECESSORS" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_EITMS_MODULES_PREDECESSORS"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_EITMS_MODULES_INSTALLED">BRANCH_CODE~FUNCTION_ID~MODULE_ID~FREQUENCY~NO_DAYS~HOLIDAY_RULE~RUN_DATE~SEQ_NO~EOC_GROUP~ERR_HANDLING~JOB_CODE~EXECUTION_LAYER~ERROR_HANDLING~EXTERNAL_IND~EOC_GROUP_STAGE~FUNC_DESCRIPTION~JOB_DESCRIPTION~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
msgxml += '      <FN PARENT="BLK_EITMS_MODULES_INSTALLED" RELATION_TYPE="N" TYPE="BLK_EITMS_MODULES_PREDECESSORS">BRANCH_CODE~EOC_GROUP~MODULE_ID~FUNCTION_ID~PREDECESSOR</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_EITMS_MODULES_INSTALLED">AUTHSTAT~TXNSTAT~BRANCH_CODE~FUNCTION_ID~MODULE_ID~EOC_GROUP</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "EIDMANPE";
var defaultWhereClause = "BRANCH_CODE = global.current_branch";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_EITMS_MODULES_INSTALLED";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_EITMS_MODULES_INSTALLED" : "","BLK_EITMS_MODULES_PREDECESSORS" : "BLK_EITMS_MODULES_INSTALLED~N"}; 

 var dataSrcLocationArray = new Array("BLK_EITMS_MODULES_INSTALLED","BLK_EITMS_MODULES_PREDECESSORS"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside EIDMANPE.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside EIDMANPE.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_EITMS_MODULES_INSTALLED__BRANCH_CODE";
pkFields[0] = "BLK_EITMS_MODULES_INSTALLED__BRANCH_CODE";
queryFields[1] = "BLK_EITMS_MODULES_INSTALLED__MODULE_ID";
pkFields[1] = "BLK_EITMS_MODULES_INSTALLED__MODULE_ID";
queryFields[2] = "BLK_EITMS_MODULES_INSTALLED__FUNCTION_ID";
pkFields[2] = "BLK_EITMS_MODULES_INSTALLED__FUNCTION_ID";
queryFields[3] = "BLK_EITMS_MODULES_INSTALLED__EOC_GROUP";
pkFields[3] = "BLK_EITMS_MODULES_INSTALLED__EOC_GROUP";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_EITMS_MODULES_INSTALLED":["EOC_GROUP_STAGE","EXECUTION_LAYER","FREQUENCY","HOLIDAY_RULE","JOB_CODE","NO_DAYS","RUN_DATEI","SEQ_NO"]};
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
var lovInfoFlds = {"BLK_EITMS_MODULES_INSTALLED__FUNCTION_ID__LOV_FUNCTION_NAME":["BLK_EITMS_MODULES_INSTALLED__FUNCTION_ID~BLK_EITMS_MODULES_INSTALLED__FUNC_DESCRIPTION~","BLK_EITMS_MODULES_INSTALLED__MODULE_ID!VARCHAR2","N",""],"BLK_EITMS_MODULES_INSTALLED__MODULE_ID__LOV_MODULE":["BLK_EITMS_MODULES_INSTALLED__MODULE_ID~~","","N~N",""],"BLK_EITMS_MODULES_INSTALLED__JOB_CODE__LOV_JOBCODE":["BLK_EITMS_MODULES_INSTALLED__JOB_CODE~BLK_EITMS_MODULES_INSTALLED__JOB_DESCRIPTION~","","N~N",""],"BLK_EITMS_MODULES_PREDECESSORS__PREDECESSOR__LOV_PREDECESSOR":["BLK_EITMS_MODULES_PREDECESSORS__PREDECESSOR~~","BLK_EITMS_MODULES_PREDECESSORS__EOC_GROUP!CHAR~BLK_EITMS_MODULES_PREDECESSORS__BRANCH_CODE!VARCHAR2~BLK_EITMS_MODULES_PREDECESSORS__FUNCTION_ID!VARCHAR2","N",""]};
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
var multipleEntryIDs = new Array("BLK_EITMS_MODULES_PREDECESSORS");
var multipleEntryArray = new Array();
var multipleEntryCells = new Array();
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY VIEW SINGLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR ATTACHED CALLFORMS *****
 //----------------------------------------------------------------------------------------------------------------------

 var CallFormArray= new Array("CSCFNUDF~BLK_EITMS_MODULES_INSTALLED"); 

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

ArrFuncOrigin["EIDMANPE"]="KERNEL";
ArrPrntFunc["EIDMANPE"]="";
ArrPrntOrigin["EIDMANPE"]="";
ArrRoutingType["EIDMANPE"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["EIDMANPE"]="N";
ArrCustomModified["EIDMANPE"]="N";

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