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
**  File Name          : LFDTRSRM_SYS.js
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
var fieldNameArray = {"BLK_LFTM_TREAS_RATE_MASTER":"TREASURYGROUP~RATECODE~CCYCODE~EFFECTIVEDATE~RATECODEUSAGE~RATERECORDSTATUS~TXTTREASURYDESC~TXTRATEDESC~TXTCURRNAME~TXTRTCDUSADESC~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH","BLK_LFTM_TREAS_RATE_DETAIL":"TREASURGROUP~RATECOD~CCYCOD~EFFECTIVEDT~STARTDATE~ENDDATE~RATE~RATERECSTAT~TENORTYP~TENORCD~TENORUNIT"};

var multipleEntryPageSize = {"BLK_LFTM_TREAS_RATE_DETAIL" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_LFTM_TREAS_RATE_DETAIL"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_LFTM_TREAS_RATE_MASTER">TREASURYGROUP~RATECODE~CCYCODE~EFFECTIVEDATE~RATECODEUSAGE~RATERECORDSTATUS~TXTTREASURYDESC~TXTRATEDESC~TXTCURRNAME~TXTRTCDUSADESC~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
msgxml += '      <FN PARENT="BLK_LFTM_TREAS_RATE_MASTER" RELATION_TYPE="N" TYPE="BLK_LFTM_TREAS_RATE_DETAIL">TREASURGROUP~RATECOD~CCYCOD~EFFECTIVEDT~STARTDATE~ENDDATE~RATE~RATERECSTAT~TENORTYP~TENORCD~TENORUNIT</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_LFTM_TREAS_RATE_MASTER">AUTHSTAT~TXNSTAT~TREASURYGROUP~RATECODE~CCYCODE~EFFECTIVEDATE~RATECODEUSAGE~RATERECORDSTATUS</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "LFDTRSRM";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_LFTM_TREAS_RATE_MASTER";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_LFTM_TREAS_RATE_MASTER" : "","BLK_LFTM_TREAS_RATE_DETAIL" : "BLK_LFTM_TREAS_RATE_MASTER~N"}; 

 var dataSrcLocationArray = new Array("BLK_LFTM_TREAS_RATE_MASTER","BLK_LFTM_TREAS_RATE_DETAIL"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LFDTRSRM.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LFDTRSRM.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_LFTM_TREAS_RATE_MASTER__TREASURYGROUP";
pkFields[0] = "BLK_LFTM_TREAS_RATE_MASTER__TREASURYGROUP";
queryFields[1] = "BLK_LFTM_TREAS_RATE_MASTER__RATECODE";
pkFields[1] = "BLK_LFTM_TREAS_RATE_MASTER__RATECODE";
queryFields[2] = "BLK_LFTM_TREAS_RATE_MASTER__CCYCODE";
pkFields[2] = "BLK_LFTM_TREAS_RATE_MASTER__CCYCODE";
queryFields[3] = "BLK_LFTM_TREAS_RATE_MASTER__EFFECTIVEDATE";
pkFields[3] = "BLK_LFTM_TREAS_RATE_MASTER__EFFECTIVEDATE";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_LFTM_TREAS_RATE_DETAIL":["ENDDATEI","RATE","STARTDATEI","TENORCD","TENORTYP","TENORUNIT"]};
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
var lovInfoFlds = {"BLK_LFTM_TREAS_RATE_MASTER__TREASURYGROUP__LOV_TREASURY_CODE":["BLK_LFTM_TREAS_RATE_MASTER__TREASURYGROUP~BLK_LFTM_TREAS_RATE_MASTER__TXTTREASURYDESC~","","N~N",""],"BLK_LFTM_TREAS_RATE_MASTER__RATECODE__LOV_RATE_CODE":["BLK_LFTM_TREAS_RATE_MASTER__RATECODE~BLK_LFTM_TREAS_RATE_MASTER__TXTRATEDESC~BLK_LFTM_TREAS_RATE_MASTER__TXTRTCDUSADESC~","BLK_CFTM_TREAS_RATE_MASTER__TREASURYGROUP!","N~N~N",""],"BLK_LFTM_TREAS_RATE_MASTER__CCYCODE__LOV_CCY_CODE":["BLK_LFTM_TREAS_RATE_MASTER__CCYCODE~BLK_LFTM_TREAS_RATE_MASTER__TXTCURRNAME~","BLK_CFTM_TREAS_RATE_MASTER__TREASURYGROUP!~BLK_CFTM_TREAS_RATE_MASTER__RATECODE!","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_LFTM_TREAS_RATE_DETAIL");
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

ArrFuncOrigin["LFDTRSRM"]="KERNEL";
ArrPrntFunc["LFDTRSRM"]="";
ArrPrntOrigin["LFDTRSRM"]="";
ArrRoutingType["LFDTRSRM"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LFDTRSRM"]="N";
ArrCustomModified["LFDTRSRM"]="N";

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