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
**  File Name          : OLDPNWVR_SYS.js
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
var fieldNameArray = {"BLK_OLTBS_CONTRACT__SP":"LATEVNSEQNO~USEREFNO~PRDCD~PRDTYPE~CONTCCY~DEPTCODE~TREASURYSOURCE~CURREVENT~TOTEVENT~MODULE~PRODDESC~CUST~CUSTNAME~CUSIP~EXTCUSIP~FACILITYNAME~CURREVENTCODE~CONTREFNO","BLK_OLTBS_CONTRACT_PENALTY_WAIVER":"CONTREFNO~EVENTSEQNO~PENALTYCOMPONENT~GRACEDAYS~PENALTYCALCDT~PENALTYAMTDUE~PENALTYAMTSETTLED~WAIVED~BASISAMTDUE~BASISAMTSETTLED~REMARKS~DUEDATE","BLK_OLTBS_CONTRACT_EVENT_LOG":"AUTHSTAT~TXNSTAT~EVENTSEQNO~CHECKERDTST~CHECKERID~MAKERDTST~MAKERID~CONTREFNO~MODULE~EVENTDATE~EVEVNTCODE~NEWVERSIONINDICATOR~WORKFLOWSTATUS"};

var multipleEntryPageSize = {"BLK_OLTBS_CONTRACT_PENALTY_WAIVER" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_OLTBS_CONTRACT_PENALTY_WAIVER"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTBS_CONTRACT__SP">LATEVNSEQNO~USEREFNO~PRDCD~PRDTYPE~CONTCCY~DEPTCODE~TREASURYSOURCE~CURREVENT~TOTEVENT~MODULE~PRODDESC~CUST~CUSTNAME~CUSIP~EXTCUSIP~FACILITYNAME~CURREVENTCODE~CONTREFNO</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONTRACT__SP" RELATION_TYPE="N" TYPE="BLK_OLTBS_CONTRACT_PENALTY_WAIVER">CONTREFNO~EVENTSEQNO~PENALTYCOMPONENT~GRACEDAYS~PENALTYCALCDT~PENALTYAMTDUE~PENALTYAMTSETTLED~WAIVED~BASISAMTDUE~BASISAMTSETTLED~REMARKS~DUEDATE</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONTRACT__SP" RELATION_TYPE="1" TYPE="BLK_OLTBS_CONTRACT_EVENT_LOG">AUTHSTAT~TXNSTAT~EVENTSEQNO~CHECKERDTST~CHECKERID~MAKERDTST~MAKERID~CONTREFNO~MODULE~EVENTDATE~EVEVNTCODE~NEWVERSIONINDICATOR~WORKFLOWSTATUS</FN>'; 
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
msgxml_sum += '      <FN PARENT="BLK_OLTBS_CONTRACT__SP" RELATION_TYPE="1" TYPE="BLK_OLVW_CONT_SPL_PEN_WVR_SUMMARY">CONTREFNO~ESN~EVENTCODE~AUTHSTAT~PENALTYCOMPONENT~DUEDATE~PENALTYCALCDATE~PENALTYAMTDUE~PENALTYPMTSTAT~PENALTYAMTSETTLED~WAIVED~BASISAMOUNTDUE~GRACEDAYS~BASISAMTSETTLED~REMARKS</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "OLDPNWVR";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_OLVW_CONT_SPL_PEN_WVR_SUMMARY";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_OLTBS_CONTRACT__SP" : "","BLK_OLTBS_CONTRACT_PENALTY_WAIVER" : "BLK_OLTBS_CONTRACT__SP~N","BLK_OLTBS_CONTRACT_EVENT_LOG" : "BLK_OLTBS_CONTRACT__SP~1"}; 

 var dataSrcLocationArray = new Array("BLK_OLTBS_CONTRACT__SP","BLK_OLTBS_CONTRACT_PENALTY_WAIVER","BLK_OLTBS_CONTRACT_EVENT_LOG"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLDPNWVR.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLDPNWVR.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_OLTBS_CONTRACT__SP__CONTREFNO";
pkFields[0] = "BLK_OLTBS_CONTRACT__SP__CONTREFNO";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_OLTBS_CONTRACT_PENALTY_WAIVER":["DUEDATE","PENALTYCOMPONENT","REMARKS","WAIVED"]};
var closeAmendArr = new Array(); 
var reopenAmendArr = new Array(); 
var reverseAmendArr = new Array(); 
var deleteAmendArr = new Array(); 
//***** Fields Amendable while Rollover *****
var rolloverAmendArr = {"BLK_OLTBS_CONTRACT_PENALTY_WAIVER":["WAIVED"]};
var confirmAmendArr = new Array(); 
var liquidateAmendArr = new Array(); 
var queryAmendArr = new Array(); 
var authorizeAmendArr = new Array(); 
//----------------------------------------------------------------------------------------------------------------------

var subsysArr    = new Array(); 

//----------------------------------------------------------------------------------------------------------------------

//***** CODE FOR LOVs *****
//----------------------------------------------------------------------------------------------------------------------
var lovInfoFlds = {"BLK_OLTBS_CONTRACT__SP__CONTREFNO__LOV_CONTRACT":["BLK_OLTBS_CONTRACT__SP__CONTREFNO~BLK_OLTBS_CONTRACT__SP__USEREFNO~BLK_OLTBS_CONTRACT__SP__MODULE~BLK_OLTBS_CONTRACT__SP__CONTCCY~BLK_OLTBS_CONTRACT__SP__DEPTCODE~BLK_OLTBS_CONTRACT__SP__PRDCD~BLK_OLTBS_CONTRACT__SP__CUST~BLK_OLTBS_CONTRACT__SP__FACILITYNAME~BLK_OLTBS_CONTRACT__SP__CUSIP~BLK_OLTBS_CONTRACT__SP__EXTCUSIP~BLK_OLTBS_CONTRACT__SP__TREASURYSOURCE~BLK_OLTBS_CONTRACT__SP__CUSTNAME~BLK_OLTBS_CONTRACT__SP__PRODDESC~","","N~N~N~N~N~N~N~N~N~N~N~N~N",""],"BLK_OLTBS_CONTRACT_PENALTY_WAIVER__PENALTYCOMPONENT__LOV_PENALTY_COMPONENT":["BLK_OLTBS_CONTRACT_PENALTY_WAIVER__PENALTYCOMPONENT~~","BLK_OLTBS_CONTRACT__SP__CONTREFNO!VARCHAR2","N~N",""],"BLK_OLTBS_CONTRACT_PENALTY_WAIVER__DUEDATE__LOV_DATE":["BLK_OLTBS_CONTRACT_PENALTY_WAIVER__DUEDATE~","BLK_OLTBS_CONTRACT__SP__CONTREFNO!VARCHAR2~BLK_OLTBS_CONTRACT_PENALTY_WAIVER__PENALTYCOMPONENT!VARCHAR2~BLK_OLTBS_CONTRACT_PENALTY_WAIVER__EVENTSEQNO!VARCHAR2","N",""]};
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
var multipleEntryIDs = new Array("BLK_OLTBS_CONTRACT_PENALTY_WAIVER");
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

ArrFuncOrigin["OLDPNWVR"]="KERNEL";
ArrPrntFunc["OLDPNWVR"]="";
ArrPrntOrigin["OLDPNWVR"]="";
ArrRoutingType["OLDPNWVR"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLDPNWVR"]="N";
ArrCustomModified["OLDPNWVR"]="N";

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