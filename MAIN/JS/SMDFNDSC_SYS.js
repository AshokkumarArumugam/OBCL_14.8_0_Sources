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
**  File Name          : SMDFNDSC_SYS.js
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
var fieldNameArray = {"BLK_MENUDET":"FUCID~EXENAME~EXETYP~AVAILABLE~AEODAWRE~LOG_EVENT~CUSTACCESS~MODULE~AUTOAUTH~MNUHD~TYPSTR~HO_FUNCTION~DBPLTSKCHK~CNTRLSTR~TANKMOD~USR_FID~DUAL_AUTH_REQD~REMARKSREQD~EXPORTREQD~MULTIBRN_ACCESS~FIELD_LOG_REQD~EXPORT_ALL_REQUIRED~MOD_GRPID~EXEC_CATEGORY~RESTCOPY~RESTRICT_PRINT~EOD_FUNCTION~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH","BLK_FNDESC":"LANGCODE~MAIN_MENU~SUBMNU1~SUBMNU2~BALOONHLP~FNCID~DESC","BLK_DUPLFIELDS":"FUNCTIONID~FLDNAME~ENABLED","BLK_CNTRLSTR":"UDFNEW~UDFCPY~UDFDEL~UDFCLOSE~UDFFUNLK~UDFREOPEN~UDFPRNT~UDFAUTH~UDFREV~UDFROLLOVR~UDFCNFRM~UDFLIQ~UDFHLD~UDFTEMPLTE~UDFVIEW~UDFGENERATE"};

var multipleEntryPageSize = {"BLK_FNDESC" :"15" ,"BLK_DUPLFIELDS" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_FNDESC","CVS_MAIN__TAB_DPLTASK":"BLK_DUPLFIELDS"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_MENUDET">FUCID~EXENAME~EXETYP~AVAILABLE~AEODAWRE~LOG_EVENT~CUSTACCESS~MODULE~AUTOAUTH~MNUHD~TYPSTR~HO_FUNCTION~DBPLTSKCHK~CNTRLSTR~TANKMOD~USR_FID~DUAL_AUTH_REQD~REMARKSREQD~EXPORTREQD~MULTIBRN_ACCESS~FIELD_LOG_REQD~EXPORT_ALL_REQUIRED~MOD_GRPID~EXEC_CATEGORY~RESTCOPY~RESTRICT_PRINT~EOD_FUNCTION~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
msgxml += '      <FN PARENT="BLK_MENUDET" RELATION_TYPE="N" TYPE="BLK_FNDESC">LANGCODE~MAIN_MENU~SUBMNU1~SUBMNU2~BALOONHLP~FNCID~DESC</FN>'; 
msgxml += '      <FN PARENT="BLK_MENUDET" RELATION_TYPE="N" TYPE="BLK_DUPLFIELDS">FUNCTIONID~FLDNAME~ENABLED</FN>'; 
msgxml += '      <FN PARENT="BLK_MENUDET" RELATION_TYPE="1" TYPE="BLK_CNTRLSTR">UDFNEW~UDFCPY~UDFDEL~UDFCLOSE~UDFFUNLK~UDFREOPEN~UDFPRNT~UDFAUTH~UDFREV~UDFROLLOVR~UDFCNFRM~UDFLIQ~UDFHLD~UDFTEMPLTE~UDFVIEW~UDFGENERATE</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_MENUDET">AUTHSTAT~TXNSTAT~EXENAME~EXETYP~FUCID~MNUHD~MODULE~MOD_GRPID</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "SMDFNDSC";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_MENUDET";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_MENUDET" : "","BLK_FNDESC" : "BLK_MENUDET~N","BLK_DUPLFIELDS" : "BLK_MENUDET~N","BLK_CNTRLSTR" : "BLK_MENUDET~1"}; 

 var dataSrcLocationArray = new Array("BLK_MENUDET","BLK_FNDESC","BLK_DUPLFIELDS","BLK_CNTRLSTR"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside SMDFNDSC.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside SMDFNDSC.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_MENUDET__FUCID";
pkFields[0] = "BLK_MENUDET__FUCID";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_CNTRLSTR":["UDFAUTH","UDFCLOSE","UDFCNFRM","UDFCPY","UDFDEL","UDFFUNLK","UDFGENERATE","UDFHLD","UDFLIQ","UDFNEW","UDFPRNT","UDFREOPEN","UDFREV","UDFROLLOVR","UDFTEMPLTE","UDFVIEW"],"BLK_DUPLFIELDS":["ENABLED"],"BLK_FNDESC":["BALOONHLP","DESC","LANGCODE","MAIN_MENU","SUBMNU1","SUBMNU2"],"BLK_MENUDET":["AEODAWRE","AUTOAUTH","AVAILABLE","CUSTACCESS","DBPLTSKCHK","DUAL_AUTH_REQD","EXPORTREQD","EXPORT_ALL_REQUIRED","FIELD_LOG_REQD","HO_FUNCTION","LOG_EVENT","MODULE","MOD_GRPID","MULTIBRN_ACCESS","REMARKSREQD","RESTCOPY","RESTRICT_PRINT","TANKMOD","USR_FID"]};
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
var lovInfoFlds = {"BLK_MENUDET__FUCID__LOV_FUNCTION_ID":["BLK_MENUDET__FUCID~~","","N~N",""],"BLK_MENUDET__MODULE__LOV_MODULE":["BLK_MENUDET__MODULE~~","","N~N",""],"BLK_MENUDET__MOD_GRPID__LOV_MODULE_GRP_ID":["BLK_MENUDET__MOD_GRPID~~","","N~N",""],"BLK_FNDESC__LANGCODE__LOV_LANG_CODE":["BLK_FNDESC__LANGCODE~","","N",""]};
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
var multipleEntryIDs = new Array("BLK_FNDESC","BLK_DUPLFIELDS");
var multipleEntryArray = new Array();
var multipleEntryCells = new Array();
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY VIEW SINGLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR ATTACHED CALLFORMS *****
 //----------------------------------------------------------------------------------------------------------------------

 var CallFormArray= new Array("CSCFNUDF~BLK_MENUDET"); 

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

ArrFuncOrigin["SMDFNDSC"]="KERNEL";
ArrPrntFunc["SMDFNDSC"]="";
ArrPrntOrigin["SMDFNDSC"]="";
ArrRoutingType["SMDFNDSC"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["SMDFNDSC"]="N";
ArrCustomModified["SMDFNDSC"]="N";

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