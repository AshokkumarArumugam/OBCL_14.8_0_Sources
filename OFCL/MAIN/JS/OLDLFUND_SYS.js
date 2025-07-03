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
**  File Name          : OLDLFUND_SYS.js
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
var fieldNameArray = {"BLK_LONG_TERM_FUNDING":"BRANCH~CURRENCY~MATURITYDATE~EXPGRP~SEQNO~AMOUNT~PLACEMENTID~VALUEDATE~DEALID~RATE~BRANCHDESC~CCYDESC~EXPGRPDESC~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH"};

var multipleEntryPageSize = {};

var multipleEntrySVBlocks = "";

var tabMEBlks = {};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_LONG_TERM_FUNDING">BRANCH~CURRENCY~MATURITYDATE~EXPGRP~SEQNO~AMOUNT~PLACEMENTID~VALUEDATE~DEALID~RATE~BRANCHDESC~CCYDESC~EXPGRPDESC~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_LONG_TERM_FUNDING">AUTHSTAT~TXNSTAT~BRANCH~CURRENCY~MATURITYDATE~EXPGRP~SEQNO~PLACEMENTID</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "OLDLFUND";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_LONG_TERM_FUNDING";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_LONG_TERM_FUNDING" : ""}; 

 var dataSrcLocationArray = new Array("BLK_LONG_TERM_FUNDING"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLDLFUND.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLDLFUND.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_LONG_TERM_FUNDING__BRANCH";
pkFields[0] = "BLK_LONG_TERM_FUNDING__BRANCH";
queryFields[1] = "BLK_LONG_TERM_FUNDING__CURRENCY";
pkFields[1] = "BLK_LONG_TERM_FUNDING__CURRENCY";
queryFields[2] = "BLK_LONG_TERM_FUNDING__MATURITYDATE";
pkFields[2] = "BLK_LONG_TERM_FUNDING__MATURITYDATE";
queryFields[3] = "BLK_LONG_TERM_FUNDING__EXPGRP";
pkFields[3] = "BLK_LONG_TERM_FUNDING__EXPGRP";
queryFields[4] = "BLK_LONG_TERM_FUNDING__SEQNO";
pkFields[4] = "BLK_LONG_TERM_FUNDING__SEQNO";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_LONG_TERM_FUNDING":["AMOUNT","PLACEMENTID","VALUEDATEI"]};
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
var lovInfoFlds = {"BLK_LONG_TERM_FUNDING__EXPGRP__LOV_EXPGRP":["BLK_LONG_TERM_FUNDING__EXPGRP~BLK_LONG_TERM_FUNDING__EXPGRPDESC~","BLK_LONG_TERM_FUNDING__BRANCH!VARCHAR2","N~N",""],"BLK_LONG_TERM_FUNDING__PLACEMENTID__LOV_PLACEMENT_REF_NO":["BLK_LONG_TERM_FUNDING__PLACEMENTID~BLK_LONG_TERM_FUNDING__BRANCH~BLK_LONG_TERM_FUNDING__CURRENCY~BLK_LONG_TERM_FUNDING__AMOUNT~BLK_LONG_TERM_FUNDING__VALUEDATE~BLK_LONG_TERM_FUNDING__MATURITYDATE~BLK_LONG_TERM_FUNDING__CCYDESC~BLK_LONG_TERM_FUNDING__BRANCHDESC~","","N~N~N~N~N~N~N~N",""]};
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

ArrFuncOrigin["OLDLFUND"]="KERNEL";
ArrPrntFunc["OLDLFUND"]="";
ArrPrntOrigin["OLDLFUND"]="";
ArrRoutingType["OLDLFUND"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLDLFUND"]="N";
ArrCustomModified["OLDLFUND"]="N";

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