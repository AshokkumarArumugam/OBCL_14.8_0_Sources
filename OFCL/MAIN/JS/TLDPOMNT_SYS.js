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
**  File Name          : TLDPOMNT_SYS.js
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
var fieldNameArray = {"BLK_TLTMS_PORTFOLIO":"PORTFOLIO~PORTFOLIO_DESC~BRANCH~DESK_CODE~COSTING_METHOD~INTERFACE_TYPE~POSITION_PRODUCT_CODE~REVAL_REQD~REVAL_FREQUENCY~REVAL_START_MONTH~REVAL_START_DAY~RESERVE_CALC_REQD~RESERVE_DAYS~RESERVE_CALC_FREQUENCY~AUTO_GEN_POSN_ID~POSN_ID_FORMAT~DEFAULT_PORTFOLIO~FIRM_ACCT_MNEMONIC~LMAPARTICIPATION~UNFRONTED~LINKED_UNFRONTED_PORTFOLIO~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH"};

var multipleEntryPageSize = {};

var multipleEntrySVBlocks = "";

var tabMEBlks = {};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_TLTMS_PORTFOLIO">PORTFOLIO~PORTFOLIO_DESC~BRANCH~DESK_CODE~COSTING_METHOD~INTERFACE_TYPE~POSITION_PRODUCT_CODE~REVAL_REQD~REVAL_FREQUENCY~REVAL_START_MONTH~REVAL_START_DAY~RESERVE_CALC_REQD~RESERVE_DAYS~RESERVE_CALC_FREQUENCY~AUTO_GEN_POSN_ID~POSN_ID_FORMAT~DEFAULT_PORTFOLIO~FIRM_ACCT_MNEMONIC~LMAPARTICIPATION~UNFRONTED~LINKED_UNFRONTED_PORTFOLIO~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_TLTMS_PORTFOLIO">AUTHSTAT~TXNSTAT~PORTFOLIO~PORTFOLIO_DESC~BRANCH~DESK_CODE~COSTING_METHOD~INTERFACE_TYPE~POSITION_PRODUCT_CODE~REVAL_REQD~REVAL_FREQUENCY~REVAL_START_MONTH~REVAL_START_DAY~RESERVE_CALC_REQD~RESERVE_DAYS~RESERVE_CALC_FREQUENCY~AUTO_GEN_POSN_ID~POSN_ID_FORMAT~DEFAULT_PORTFOLIO~FIRM_ACCT_MNEMONIC</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "TLDPOMNT";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_TLTMS_PORTFOLIO";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_TLTMS_PORTFOLIO" : ""}; 

 var dataSrcLocationArray = new Array("BLK_TLTMS_PORTFOLIO"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside TLDPOMNT.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside TLDPOMNT.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_TLTMS_PORTFOLIO__PORTFOLIO";
pkFields[0] = "BLK_TLTMS_PORTFOLIO__PORTFOLIO";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_TLTMS_PORTFOLIO":["AUTO_GEN_POSN_ID","BRANCH","COSTING_METHOD","DEFAULT_PORTFOLIO","DESK_CODE","FIRM_ACCT_MNEMONIC","INTERFACE_TYPE","LINKED_UNFRONTED_PORTFOLIO","PORTFOLIO","POSITION_PRODUCT_CODE","POSN_ID_FORMAT","RESERVE_CALC_FREQUENCY","RESERVE_CALC_REQD","RESERVE_DAYS","REVAL_FREQUENCY","REVAL_REQD","REVAL_START_DAY","REVAL_START_MONTH"]};
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
var lovInfoFlds = {"BLK_TLTMS_PORTFOLIO__PORTFOLIO__LOV_PORTFOLIO":["BLK_TLTMS_PORTFOLIO__PORTFOLIO~BLK_TLTMS_PORTFOLIO__PORTFOLIO_DESC~","","N~N",""],"BLK_TLTMS_PORTFOLIO__BRANCH__LOV_BRANCH_CODE":["BLK_TLTMS_PORTFOLIO__BRANCH~~","","N~N",""],"BLK_TLTMS_PORTFOLIO__DESK_CODE__LOV_DESK_CODE":["BLK_TLTMS_PORTFOLIO__DESK_CODE~~~","","N~N~N",""],"BLK_TLTMS_PORTFOLIO__POSITION_PRODUCT_CODE__LOV_PRODUCT_CODE":["BLK_TLTMS_PORTFOLIO__POSITION_PRODUCT_CODE~~","","N~N",""],"BLK_TLTMS_PORTFOLIO__POSN_ID_FORMAT__LOV_POSITION_FORMAT":["BLK_TLTMS_PORTFOLIO__POSN_ID_FORMAT~~","","N~N",""],"BLK_TLTMS_PORTFOLIO__FIRM_ACCT_MNEMONIC__LOV_FIRM_ACCOUNT_MNEMONIC":["BLK_TLTMS_PORTFOLIO__FIRM_ACCT_MNEMONIC~","","N",""],"BLK_TLTMS_PORTFOLIO__LINKED_UNFRONTED_PORTFOLIO__LOV_LINK_UNFRONT_PORTFOLIO":["BLK_TLTMS_PORTFOLIO__LINKED_UNFRONTED_PORTFOLIO~","","N",""]};
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
var multipleEntryIDs = new Array();
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

ArrFuncOrigin["TLDPOMNT"]="KERNEL";
ArrPrntFunc["TLDPOMNT"]="";
ArrPrntOrigin["TLDPOMNT"]="";
ArrRoutingType["TLDPOMNT"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["TLDPOMNT"]="N";
ArrCustomModified["TLDPOMNT"]="N";

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
var actStageArry = {"QUERY":"2","NEW":"2","MODIFY":"2","AUTHORIZE":"2","DELETE":"2","CLOSE":"2","REOPEN":"2","REVERSE":"2","ROLLOVER":"2","CONFIRM":"2","LIQUIDATE":"2","SUMMARYQUERY":"1"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------