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
**  File Name          : LBDNETCF_SYS.js
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
var fieldNameArray = {"BLK_LBTBS_CASHFLOW_NETTING_MASTER":"NETTINGREFNO~NETCFLOWDIRECTION~CUSTOMERNO~TRANCHEREFNO~BRANCHCODE~VALUEDATE~CCYCODE~TOTALCFLOWAMT~SETTLEMENTDATE~NETCFLOWCONFAMT~FTCONREFNO~CUSTOMERNAME~CCYNAME~SETTLEMENTACCT~BTN_RESOLVE~BTN_MESSAGE~BTN_EVENTS~NETTINGSTATUS~TOTALUNCFCASH~SSIMNEMONIC~TOTALCASHFLOWS~AUTHSTAT~SETTLESEQNO~CUSTOMERTYPE~TOTALCONFCFLOWS~NETCFLOWUNCFAMT","BLK_LBTBS_CASHFLOW_NETTING_DETAIL":"VALUEDATE~COMPONENTTYPE~CASHFLOWAMT~CONTRACTREFNO~COMPONENT~CFLOWDIRECTION~NETTINGREFNO~CCYCODE~CFLOWNETSTATUS~CFLOWCONFSTATUS~SETTLEDSTATUS","BLK_LBTBS_CASHFLOW_NETTING_OTHER":"VALUEDATE~COMPONENTTYPE~CASHFLOWAMT~CONTRACTREFNO~NETTINGREFNO~CONPONENT~CFLOWDIRECTION~CFLOWNETSTATUS~CFLOWCONFSTATUS~SETTLEDSTATUS","BLK_SUMMARY":"BRANCHCODE~AUTHSTAT~CUSTOMERTYPE~DEPARTMENTCODE~VALUEDATE~CUSTOMERNO~NETTINGSTATUS~CCYCODE~TRANCHEREFNO~TREASURYSOURCE~NETTINGREFNO~TOTALCFLOWAMT~NETCFLOWDIRECTION"};

var multipleEntryPageSize = {"BLK_LBTBS_CASHFLOW_NETTING_DETAIL" :"15" ,"BLK_LBTBS_CASHFLOW_NETTING_OTHER" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_NETTING__TAB_MAIN":"BLK_LBTBS_CASHFLOW_NETTING_DETAIL","CVS_NETTING__TAB_OTHER":"BLK_LBTBS_CASHFLOW_NETTING_OTHER"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_LBTBS_CASHFLOW_NETTING_MASTER">NETTINGREFNO~NETCFLOWDIRECTION~CUSTOMERNO~TRANCHEREFNO~BRANCHCODE~VALUEDATE~CCYCODE~TOTALCFLOWAMT~SETTLEMENTDATE~NETCFLOWCONFAMT~FTCONREFNO~CUSTOMERNAME~CCYNAME~SETTLEMENTACCT~BTN_RESOLVE~BTN_MESSAGE~BTN_EVENTS~NETTINGSTATUS~TOTALUNCFCASH~SSIMNEMONIC~TOTALCASHFLOWS~AUTHSTAT~SETTLESEQNO~CUSTOMERTYPE~TOTALCONFCFLOWS~NETCFLOWUNCFAMT</FN>'; 
msgxml += '      <FN PARENT="BLK_LBTBS_CASHFLOW_NETTING_MASTER" RELATION_TYPE="N" TYPE="BLK_LBTBS_CASHFLOW_NETTING_DETAIL">VALUEDATE~COMPONENTTYPE~CASHFLOWAMT~CONTRACTREFNO~COMPONENT~CFLOWDIRECTION~NETTINGREFNO~CCYCODE~CFLOWNETSTATUS~CFLOWCONFSTATUS~SETTLEDSTATUS</FN>'; 
msgxml += '      <FN PARENT="BLK_LBTBS_CASHFLOW_NETTING_MASTER" RELATION_TYPE="N" TYPE="BLK_LBTBS_CASHFLOW_NETTING_OTHER">VALUEDATE~COMPONENTTYPE~CASHFLOWAMT~CONTRACTREFNO~NETTINGREFNO~CONPONENT~CFLOWDIRECTION~CFLOWNETSTATUS~CFLOWCONFSTATUS~SETTLEDSTATUS</FN>'; 
msgxml += '      <FN PARENT="BLK_LBTBS_CASHFLOW_NETTING_MASTER" RELATION_TYPE="1" TYPE="BLK_SUMMARY">BRANCHCODE~AUTHSTAT~CUSTOMERTYPE~DEPARTMENTCODE~VALUEDATE~CUSTOMERNO~NETTINGSTATUS~CCYCODE~TRANCHEREFNO~TREASURYSOURCE~NETTINGREFNO~TOTALCFLOWAMT~NETCFLOWDIRECTION</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_NETTING";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** FCJ XML FOR SUMMARY SCREEN *****
//----------------------------------------------------------------------------------------------------------------------
var msgxml_sum=""; 
msgxml_sum += '    <FLD>'; 
msgxml_sum += '      <FN PARENT="BLK_LBTBS_CASHFLOW_NETTING_MASTER" RELATION_TYPE="1" TYPE="BLK_SUMMARY">AUTHSTAT~NETTINGSTATUS~NETCFLOWDIRECTION~TRANCHEREFNO~BRANCHCODE~DEPARTMENTCODE~TREASURYSOURCE~CUSTOMERNO~CUSTOMERTYPE~CCYCODE~TOTALCFLOWAMT~VALUEDATE~NETTINGREFNO</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "LBDNETCF";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_SUMMARY";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_LBTBS_CASHFLOW_NETTING_MASTER" : "","BLK_LBTBS_CASHFLOW_NETTING_DETAIL" : "BLK_LBTBS_CASHFLOW_NETTING_MASTER~N","BLK_LBTBS_CASHFLOW_NETTING_OTHER" : "BLK_LBTBS_CASHFLOW_NETTING_MASTER~N","BLK_SUMMARY" : "BLK_LBTBS_CASHFLOW_NETTING_MASTER~1"}; 

 var dataSrcLocationArray = new Array("BLK_LBTBS_CASHFLOW_NETTING_MASTER","BLK_LBTBS_CASHFLOW_NETTING_DETAIL","BLK_LBTBS_CASHFLOW_NETTING_OTHER","BLK_SUMMARY"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LBDNETCF.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LBDNETCF.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_LBTBS_CASHFLOW_NETTING_MASTER__NETTINGREFNO";
pkFields[0] = "BLK_LBTBS_CASHFLOW_NETTING_MASTER__NETTINGREFNO";
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
//***** Fields Amendable while Query *****
var queryAmendArr = {"BLK_LBTBS_CASHFLOW_NETTING_MASTER":["BTN_RESOLVE"]};
var authorizeAmendArr = new Array(); 
//----------------------------------------------------------------------------------------------------------------------

var subsysArr    = new Array(); 

//----------------------------------------------------------------------------------------------------------------------

//***** CODE FOR LOVs *****
//----------------------------------------------------------------------------------------------------------------------
var lovInfoFlds = {"BLK_SUMMARY__TRANCHEREFNO__LOV_TRANCHEREFNO":["~~","","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_LBTBS_CASHFLOW_NETTING_DETAIL","BLK_LBTBS_CASHFLOW_NETTING_OTHER");
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

ArrFuncOrigin["LBDNETCF"]="KERNEL";
ArrPrntFunc["LBDNETCF"]="";
ArrPrntOrigin["LBDNETCF"]="";
ArrRoutingType["LBDNETCF"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LBDNETCF"]="N";
ArrCustomModified["LBDNETCF"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"OLDMSGVW":"CONTREF~ESN~EVNTCD~ACTION_CODE~","OLDEVENT":"CONTREF~ACTION_CODE~"};
var scrArgSource = {"OLDMSGVW":"BLK_LBTBS_CASHFLOW_NETTING_MASTER__FTCONREFNO~~~~","OLDEVENT":"BLK_LBTBS_CASHFLOW_NETTING_MASTER__FTCONREFNO~~"};
var scrArgVals = {"OLDMSGVW":"~1~~EXECUTEQUERY~","OLDEVENT":"~EXECUTEQUERY~"};
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