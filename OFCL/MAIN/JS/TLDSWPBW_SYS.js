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
**  File Name          : TLDSWPBW_SYS.js
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
var fieldNameArray = {"BLK_OLTBS_LT_SWAPALLOC_MASTER":"SOURCECODE~TRANSID","BLK_OLTBS_LT_SWAPALLOC_MASTER_AL":"TRANSID~SOURCECODE~TRANSACTION~TICKETID~UPLOADSTATUS~TXT_PROCESSED~TXT_UNPROCESSED~TXT_FAILED~TXT_REJECT~TXT_WORK","BLK_OLTBS_LT_SWAPALLOC":"TRANSID~SOURCECODE~SWAPTRADEID~SWAPTRADEVERSION~STATUS~SWAPID~CUSIPNO~PORTFOLIOID~QUANTITY","BLK_SWAP_LINK":"TRANSID~SOURCECODE~TICKETID~CUSIPNO~TRADEID~TRADEVERSION~PROCESSSTATUS~TRADESTATUS~TRADEAMOUNT~EXTCONTRACTREFNO~BRANCH","BLK_LOG":"TRANSID~TRANSTYPE~TRANSACTION~SOURCECODE~TRANSRECTYPE~TRANSKEY~TRANSDATA~TRANSXML"};

var multipleEntryPageSize = {"BLK_OLTBS_LT_SWAPALLOC_MASTER_AL" :"15" ,"BLK_LOG" :"15" ,"BLK_SWAP_LINK" :"15" ,"BLK_OLTBS_LT_SWAPALLOC" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_OLTBS_LT_SWAPALLOC_MASTER_AL~BLK_OLTBS_LT_SWAPALLOC","CVS_MSG__TAB_MAIN":"BLK_LOG","CVS_SWAPLINK__TAB_MAIN":"BLK_SWAP_LINK"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTBS_LT_SWAPALLOC_MASTER">SOURCECODE~TRANSID</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_LT_SWAPALLOC_MASTER" RELATION_TYPE="N" TYPE="BLK_OLTBS_LT_SWAPALLOC_MASTER_AL">TRANSID~SOURCECODE~TRANSACTION~TICKETID~UPLOADSTATUS~TXT_PROCESSED~TXT_UNPROCESSED~TXT_FAILED~TXT_REJECT~TXT_WORK</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_LT_SWAPALLOC_MASTER" RELATION_TYPE="N" TYPE="BLK_OLTBS_LT_SWAPALLOC">TRANSID~SOURCECODE~SWAPTRADEID~SWAPTRADEVERSION~STATUS~SWAPID~CUSIPNO~PORTFOLIOID~QUANTITY</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_LT_SWAPALLOC_MASTER" RELATION_TYPE="N" TYPE="BLK_SWAP_LINK">TRANSID~SOURCECODE~TICKETID~CUSIPNO~TRADEID~TRADEVERSION~PROCESSSTATUS~TRADESTATUS~TRADEAMOUNT~EXTCONTRACTREFNO~BRANCH</FN>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="N" TYPE="BLK_LOG">TRANSID~TRANSTYPE~TRANSACTION~SOURCECODE~TRANSRECTYPE~TRANSKEY~TRANSDATA~TRANSXML</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTBS_LT_SWAPALLOC_MASTER">SOURCECODE~TRANSID</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "TLDSWPBW";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_OLTBS_LT_SWAPALLOC_MASTER";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_OLTBS_LT_SWAPALLOC_MASTER" : "","BLK_OLTBS_LT_SWAPALLOC_MASTER_AL" : "BLK_OLTBS_LT_SWAPALLOC_MASTER~N","BLK_OLTBS_LT_SWAPALLOC" : "BLK_OLTBS_LT_SWAPALLOC_MASTER~N","BLK_SWAP_LINK" : "BLK_OLTBS_LT_SWAPALLOC_MASTER~N","BLK_LOG" : ""}; 

 var dataSrcLocationArray = new Array("BLK_OLTBS_LT_SWAPALLOC_MASTER","BLK_OLTBS_LT_SWAPALLOC_MASTER_AL","BLK_OLTBS_LT_SWAPALLOC","BLK_SWAP_LINK","BLK_LOG"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside TLDSWPBW.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside TLDSWPBW.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_OLTBS_LT_SWAPALLOC_MASTER__SOURCECODE";
pkFields[0] = "BLK_OLTBS_LT_SWAPALLOC_MASTER__SOURCECODE";
queryFields[1] = "BLK_OLTBS_LT_SWAPALLOC_MASTER__TRANSID";
pkFields[1] = "BLK_OLTBS_LT_SWAPALLOC_MASTER__TRANSID";
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
var queryAmendArr = new Array(); 
var authorizeAmendArr = new Array(); 
//----------------------------------------------------------------------------------------------------------------------

var subsysArr    = new Array(); 

//----------------------------------------------------------------------------------------------------------------------

//***** CODE FOR LOVs *****
//----------------------------------------------------------------------------------------------------------------------
var lovInfoFlds = {"BLK_OLTBS_LT_SWAPALLOC_MASTER__SOURCECODE__LOV_SOURCE":["BLK_OLTBS_LT_SWAPALLOC_MASTER__SOURCECODE~","","N",""],"BLK_OLTBS_LT_SWAPALLOC_MASTER__TRANSID__LOV_TRANSID":["BLK_OLTBS_LT_SWAPALLOC_MASTER__TRANSID~","BLK_OLTBS_LT_SWAPALLOC_MASTER__SOURCECODE!Varchar2","N",""]};
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
var multipleEntryIDs = new Array("BLK_OLTBS_LT_SWAPALLOC_MASTER_AL","BLK_LOG","BLK_SWAP_LINK","BLK_OLTBS_LT_SWAPALLOC");
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

ArrFuncOrigin["TLDSWPBW"]="KERNEL";
ArrPrntFunc["TLDSWPBW"]="";
ArrPrntOrigin["TLDSWPBW"]="";
ArrRoutingType["TLDSWPBW"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["TLDSWPBW"]="N";
ArrCustomModified["TLDSWPBW"]="N";

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