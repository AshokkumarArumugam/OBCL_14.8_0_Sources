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
**  File Name          : LFDFRMNT_SYS.js
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
var fieldNameArray = {"BLK_LFTMS_FEE_COMPONENT":"COMPONENT~FEERULEDESC~CUST~CUSTDESC~CONTREFNO~MODULE~MODDESC~FACREFNO~USERREFNO~BOOKDATE~VALUEDATE~COMPTYPE~RATEORAMT~BRN~AMTORPCT~COMPTYP","BLK_LFTMS_FEE_CCY":"CCY~CCYNAME~COMPONENT~CUST~CONTREFNO~MODULE~BRN","BLK_LFTMS_FEE_CCY_EFFDATE":"EFFDATE~CCY~COMPONENT~CUST~CONTREFNO~MODULE~RECALCREQD","BLK_LFTMS_FEE_RATE":"FEEAMT~FEERATE~CCY~TOBASISAMT~FROMBASISAMT~COMPONENT~CUST~CONTREFNO~MODULE~EFFDT","BLK_EVENT_LOG":"CHECKERSTAMP~CHECKERID~TXNSTAT~MAKERSTAMP~MAKERID~AUTHSTAT~ESN_FCCREF~ESN_ESN"};

var multipleEntryPageSize = {"BLK_LFTMS_FEE_CCY" :"15" ,"BLK_LFTMS_FEE_CCY_EFFDATE" :"15" ,"BLK_LFTMS_FEE_RATE" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_LFTMS_FEE_CCY~BLK_LFTMS_FEE_CCY_EFFDATE~BLK_LFTMS_FEE_RATE"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_LFTMS_FEE_COMPONENT">COMPONENT~FEERULEDESC~CUST~CUSTDESC~CONTREFNO~MODULE~MODDESC~FACREFNO~USERREFNO~BOOKDATE~VALUEDATE~COMPTYPE~RATEORAMT~BRN~AMTORPCT~COMPTYP</FN>'; 
msgxml += '      <FN PARENT="BLK_LFTMS_FEE_COMPONENT" RELATION_TYPE="N" TYPE="BLK_LFTMS_FEE_CCY">CCY~CCYNAME~COMPONENT~CUST~CONTREFNO~MODULE~BRN</FN>'; 
msgxml += '      <FN PARENT="BLK_LFTMS_FEE_CCY" RELATION_TYPE="N" TYPE="BLK_LFTMS_FEE_CCY_EFFDATE">EFFDATE~CCY~COMPONENT~CUST~CONTREFNO~MODULE~RECALCREQD</FN>'; 
msgxml += '      <FN PARENT="BLK_LFTMS_FEE_CCY_EFFDATE" RELATION_TYPE="N" TYPE="BLK_LFTMS_FEE_RATE">FEEAMT~FEERATE~CCY~TOBASISAMT~FROMBASISAMT~COMPONENT~CUST~CONTREFNO~MODULE~EFFDT</FN>'; 
msgxml += '      <FN PARENT="BLK_LFTMS_FEE_COMPONENT" RELATION_TYPE="1" TYPE="BLK_EVENT_LOG">CHECKERSTAMP~CHECKERID~TXNSTAT~MAKERSTAMP~MAKERID~AUTHSTAT~ESN_FCCREF~ESN_ESN</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_LFVWS_FEE_COMP_SUMMARY">CONTREFNO~BRN~MODULE~CUST~COMPONENT~AUTHSTAT~TXNSTAT</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "LFDFRMNT";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_LFVWS_FEE_COMP_SUMMARY";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_LFTMS_FEE_COMPONENT" : "","BLK_LFTMS_FEE_CCY" : "BLK_LFTMS_FEE_COMPONENT~N","BLK_LFTMS_FEE_CCY_EFFDATE" : "BLK_LFTMS_FEE_CCY~N","BLK_LFTMS_FEE_RATE" : "BLK_LFTMS_FEE_CCY_EFFDATE~N","BLK_EVENT_LOG" : "BLK_LFTMS_FEE_COMPONENT~1"}; 

 var dataSrcLocationArray = new Array("BLK_LFTMS_FEE_COMPONENT","BLK_LFTMS_FEE_CCY","BLK_LFTMS_FEE_CCY_EFFDATE","BLK_LFTMS_FEE_RATE","BLK_EVENT_LOG"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LFDFRMNT.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LFDFRMNT.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_LFTMS_FEE_COMPONENT__MODULE";
pkFields[0] = "BLK_LFTMS_FEE_COMPONENT__MODULE";
queryFields[1] = "BLK_LFTMS_FEE_COMPONENT__CONTREFNO";
pkFields[1] = "BLK_LFTMS_FEE_COMPONENT__CONTREFNO";
queryFields[2] = "BLK_LFTMS_FEE_COMPONENT__CUST";
pkFields[2] = "BLK_LFTMS_FEE_COMPONENT__CUST";
queryFields[3] = "BLK_LFTMS_FEE_COMPONENT__COMPONENT";
pkFields[3] = "BLK_LFTMS_FEE_COMPONENT__COMPONENT";
queryFields[4] = "BLK_LFTMS_FEE_COMPONENT__BRN";
pkFields[4] = "BLK_LFTMS_FEE_COMPONENT__BRN";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_LFTMS_FEE_CCY_EFFDATE":["CCY","EFFDATEI","RECALCREQD"],"BLK_LFTMS_FEE_CCY":["CCY","CCYNAME"],"BLK_LFTMS_FEE_RATE":["CCY","EFFDT","FEEAMT","FEERATE","FROMBASISAMT","TOBASISAMT"]};
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
var lovInfoFlds = {"BLK_LFTMS_FEE_COMPONENT__COMPONENT__LOV_COMPONENT":["BLK_LFTMS_FEE_COMPONENT__COMPONENT~BLK_LFTMS_FEE_COMPONENT__FEERULEDESC~","BLK_LFTMS_FEE_COMPONENT__CONTREFNO!VARCHAR2~BLK_LFTMS_FEE_COMPONENT__CONTREFNO!VARCHAR2~BLK_LFTMS_FEE_COMPONENT__CONTREFNO!VARCHAR2~BLK_LFTMS_FEE_COMPONENT__CONTREFNO!VARCHAR2~BLK_LFTMS_FEE_COMPONENT__CONTREFNO!VARCHAR2","N~N",""],"BLK_LFTMS_FEE_COMPONENT__CUST__LOV_CUST":["BLK_LFTMS_FEE_COMPONENT__CUST~BLK_LFTMS_FEE_COMPONENT__CUSTDESC~","BLK_LFTMS_FEE_COMPONENT__CONTREFNO!VARCHAR2~BLK_LFTMS_FEE_COMPONENT__CONTREFNO!VARCHAR2~BLK_LFTMS_FEE_COMPONENT__CUST!VARCHAR2~BLK_LFTMS_FEE_COMPONENT__CONTREFNO!VARCHAR2","N~N",""],"BLK_LFTMS_FEE_COMPONENT__CONTREFNO__LOV_CONTRACT":["BLK_LFTMS_FEE_COMPONENT__CONTREFNO~BLK_LFTMS_FEE_COMPONENT__USERREFNO~BLK_LFTMS_FEE_COMPONENT__BRN~BLK_LFTMS_FEE_COMPONENT__BOOKDATE~BLK_LFTMS_FEE_COMPONENT__VALUEDATE~BLK_LFTMS_FEE_COMPONENT__FACREFNO~","BLK_LFTMS_FEE_COMPONENT__MODULE!VARCHAR2~BLK_LFTMS_FEE_COMPONENT__MODULE!VARCHAR2~BLK_LFTMS_FEE_COMPONENT__MODULE!VARCHAR2","N~N~N~N~N~N",""],"BLK_LFTMS_FEE_COMPONENT__MODULE__LOV_MODULE":["BLK_LFTMS_FEE_COMPONENT__MODULE~BLK_LFTMS_FEE_COMPONENT__MODDESC~","","N~N",""],"BLK_LFTMS_FEE_CCY__CCY__LOV_FEECCY":["BLK_LFTMS_FEE_CCY__CCY~BLK_LFTMS_FEE_CCY__CCYNAME~","BLK_LFTMS_FEE_COMPONENT__CONTREFNO!VARCHAR2~BLK_LFTMS_FEE_COMPONENT__CONTREFNO!VARCHAR2","N~N",""],"BLK_LFVWS_FEE_COMP_SUMMARY__COMPONENT__LOV_COMPONENT":["~~","__!~__!~__!~__!~__!","N~N",""],"BLK_LFVWS_FEE_COMP_SUMMARY__CONTREFNO__LOV_CONTRACT":["~~~~~~","__!~__!~__!","N~N~N~N~N~N",""],"BLK_LFVWS_FEE_COMP_SUMMARY__CUST__LOV_CUST":["~~","__!~__!~__!~__!","N~N",""],"BLK_LFVWS_FEE_COMP_SUMMARY__MODULE__LOV_MODULE":["~~","","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_LFTMS_FEE_CCY","BLK_LFTMS_FEE_CCY_EFFDATE","BLK_LFTMS_FEE_RATE");
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

ArrFuncOrigin["LFDFRMNT"]="KERNEL";
ArrPrntFunc["LFDFRMNT"]="";
ArrPrntOrigin["LFDFRMNT"]="";
ArrRoutingType["LFDFRMNT"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LFDFRMNT"]="N";
ArrCustomModified["LFDFRMNT"]="N";

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
var actStageArry = {"QUERY":"2","NEW":"2","MODIFY":"2","AUTHORIZE":"2","DELETE":"2","CLOSE":"1","REOPEN":"1","REVERSE":"1","ROLLOVER":"1","CONFIRM":"1","LIQUIDATE":"1","SUMMARYQUERY":"2"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------