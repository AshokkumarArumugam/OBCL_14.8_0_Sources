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
**  File Name          : OLDSCSCH_SYS.js
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
var fieldNameArray = {"BLK_CONTRACT_MASTER":"CONTREFNO~USERREFNO~ROWUI~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH","BLK_DISCLOSURE_DETAILS":"CONTREFNO~DISCLOCODE~DISCLOSDESC~PARDISCLOCODE","BLK_SCHEDULES":"CONTREFNO~DISCLOCODE~STDATE~PERENDDT~NOOFSCHED~FREQ~FREQUNIT","BLK_NOTES_MASTER":"","BLK_NOTES":"CONTREFNO~DISCLOCODE~SEQNO~NOTES~USERNAME~PROPFUTSCHED","BLK_SCH_MASTER":"CONTRACTREFNO2~DISCLOSURECODE2~MODNO2~ONCEAUTH2~AUTHSTAT2~RECORDSTAT2~CHECKERDTSTAMP2~CHECKERID2~MAKERDTSTAMP2~MAKERID2","BLK_DUE_DT":"CONTREFNO~DISCLOCODE~DUEDT~CLOSDT~CLOSFLAG~PERENDDT~SCHEDDT"};

var multipleEntryPageSize = {"BLK_DISCLOSURE_DETAILS" :"15" ,"BLK_SCHEDULES" :"15" ,"BLK_NOTES" :"15" ,"BLK_DUE_DT" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_DISCLOSURE_DETAILS~BLK_SCHEDULES","CVS_NOTES__TAB_MAIN":"BLK_NOTES","CVS_SCH__TAB_MAIN":"BLK_DUE_DT"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_CONTRACT_MASTER">CONTREFNO~USERREFNO~ROWUI~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
msgxml += '      <FN PARENT="BLK_CONTRACT_MASTER" RELATION_TYPE="N" TYPE="BLK_DISCLOSURE_DETAILS">CONTREFNO~DISCLOCODE~DISCLOSDESC~PARDISCLOCODE</FN>'; 
msgxml += '      <FN PARENT="BLK_DISCLOSURE_DETAILS" RELATION_TYPE="N" TYPE="BLK_SCHEDULES">CONTREFNO~DISCLOCODE~STDATE~PERENDDT~NOOFSCHED~FREQ~FREQUNIT</FN>'; 
msgxml += '      <FN PARENT="BLK_DISCLOSURE_DETAILS" RELATION_TYPE="1" TYPE="BLK_NOTES_MASTER"></FN>'; 
msgxml += '      <FN PARENT="BLK_DISCLOSURE_DETAILS" RELATION_TYPE="N" TYPE="BLK_NOTES">CONTREFNO~DISCLOCODE~SEQNO~NOTES~USERNAME~PROPFUTSCHED</FN>'; 
msgxml += '      <FN PARENT="BLK_CONTRACT_MASTER" RELATION_TYPE="1" TYPE="BLK_SCH_MASTER">CONTRACTREFNO2~DISCLOSURECODE2~MODNO2~ONCEAUTH2~AUTHSTAT2~RECORDSTAT2~CHECKERDTSTAMP2~CHECKERID2~MAKERDTSTAMP2~MAKERID2</FN>'; 
msgxml += '      <FN PARENT="BLK_SCH_MASTER" RELATION_TYPE="N" TYPE="BLK_DUE_DT">CONTREFNO~DISCLOCODE~DUEDT~CLOSDT~CLOSFLAG~PERENDDT~SCHEDDT</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_CONTRACT_MASTER">AUTHSTAT~TXNSTAT~CONTREFNO</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "OLDSCSCH";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_CONTRACT_MASTER";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_CONTRACT_MASTER" : "","BLK_DISCLOSURE_DETAILS" : "BLK_CONTRACT_MASTER~N","BLK_SCHEDULES" : "BLK_DISCLOSURE_DETAILS~N","BLK_NOTES_MASTER" : "BLK_DISCLOSURE_DETAILS~1","BLK_NOTES" : "BLK_DISCLOSURE_DETAILS~N","BLK_SCH_MASTER" : "BLK_CONTRACT_MASTER~1","BLK_DUE_DT" : "BLK_SCH_MASTER~N"}; 

 var dataSrcLocationArray = new Array("BLK_CONTRACT_MASTER","BLK_DISCLOSURE_DETAILS","BLK_SCHEDULES","BLK_NOTES_MASTER","BLK_NOTES","BLK_SCH_MASTER","BLK_DUE_DT"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLDSCSCH.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLDSCSCH.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_CONTRACT_MASTER__CONTREFNO";
pkFields[0] = "BLK_CONTRACT_MASTER__CONTREFNO";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_CONTRACT_MASTER":["BTNEXPSCH","ROWUI"],"BLK_DISCLOSURE_DETAILS":["BTNFETCH","BTNNOTES","DISCLOCODE","PARDISCLOCODE"],"BLK_DUE_DT":["CLOSDTI","CLOSFLAG","CONTREFNO","DISCLOCODE","DUEDTI","PERENDDTI","SCHEDDTI"],"BLK_NOTES":["CONTREFNO","DISCLOCODE","NOTES","PROPFUTSCHED","SEQNO","USERNAME"],"BLK_SCHEDULES":["CONTREFNO","DISCLOCODE","FREQ","FREQUNIT","NOOFSCHED","PERENDDTI","STDATEI"],"BLK_SCH_MASTER":["AUTHSTAT2","CHECKERDTSTAMP2","CHECKERID2","CONTRACTREFNO2","DISCLOSURECODE2","MAKERDTSTAMP2","MAKERID2","MODNO2","ONCEAUTH2","RECORDSTAT2","USERREFNO"]};
var closeAmendArr = new Array(); 
var reopenAmendArr = new Array(); 
var reverseAmendArr = new Array(); 
var deleteAmendArr = new Array(); 
var rolloverAmendArr = new Array(); 
var confirmAmendArr = new Array(); 
var liquidateAmendArr = new Array(); 
//***** Fields Amendable while Query *****
var queryAmendArr = {"BLK_CONTRACT_MASTER":["BTNEXPSCH"],"BLK_DISCLOSURE_DETAILS":["BTNNOTES"]};
var authorizeAmendArr = new Array(); 
//----------------------------------------------------------------------------------------------------------------------

var subsysArr    = new Array(); 

//----------------------------------------------------------------------------------------------------------------------

//***** CODE FOR LOVs *****
//----------------------------------------------------------------------------------------------------------------------
var lovInfoFlds = {"BLK_CONTRACT_MASTER__CONTREFNO__LOV_CONTRACT_REF_NO":["BLK_CONTRACT_MASTER__CONTREFNO~BLK_CONTRACT_MASTER__USERREFNO~","","N~N",""],"BLK_DISCLOSURE_DETAILS__DISCLOCODE__LOV_DISCLOSURE_CODE":["BLK_DISCLOSURE_DETAILS__DISCLOCODE~BLK_DISCLOSURE_DETAILS__DISCLOSDESC~","BLK_CONTRACT_MASTER__CONTREFNO!~BLK_CONTRACT_MASTER__CONTREFNO!","N~N",""],"BLK_DISCLOSURE_DETAILS__PARDISCLOCODE__LOV_PARENT_DISCLOSURE":["BLK_DISCLOSURE_DETAILS__PARDISCLOCODE~~","BLK_CONTRACT_MASTER__CONTREFNO!","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_DISCLOSURE_DETAILS","BLK_SCHEDULES","BLK_NOTES","BLK_DUE_DT");
var multipleEntryArray = new Array();
var multipleEntryCells = new Array();
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY VIEW SINGLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR ATTACHED CALLFORMS *****
 //----------------------------------------------------------------------------------------------------------------------

 var CallFormArray= new Array("CSCFNUDF~BLK_CONTRACT_MASTER"); 

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

ArrFuncOrigin["OLDSCSCH"]="KERNEL";
ArrPrntFunc["OLDSCSCH"]="";
ArrPrntOrigin["OLDSCSCH"]="";
ArrRoutingType["OLDSCSCH"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLDSCSCH"]="N";
ArrCustomModified["OLDSCSCH"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_MAIN":"CONTRACT_REF_NO~USERREFNO~DISCCODE~DISCLOSDESC","CVS_NOTES":"USERREFNO~DISCLOSDESC~CONTRACT_REF_NO~DISCLOCODE","CVS_SCH":"USERREFNO~CONTRACTREFNO","CSCFNUDF":""};
var scrArgSource = {"CVS_NOTES":"BLK_CONTRACT_MASTER__USERREFNO~BLK_DISCLOSURE_DETAILS__DISCLOSDESC~BLK_CONTRACT_MASTER__CONTREFNO~BLK_DISCLOSURE_DETAILS__DISCLOCODE","CVS_SCH":"BLK_CONTRACT_MASTER__USERREFNO~BLK_CONTRACT_MASTER__CONTREFNO","CSCFNUDF":""};
var scrArgVals = {"CVS_MAIN":"~~~","CVS_NOTES":"~~~","CVS_SCH":"~","CSCFNUDF":""};
var scrArgDest = {"CVS_MAIN":"BLK_CONTRACT_MASTER__CONTREFNO~BLK_CONTRACT_MASTER__USERREFNO~BLK_DISCLOSURE_DETAILS__DISCCODE~BLK_DISCLOSURE_DETAILS__DISCLOSDESC","CVS_NOTES":"BLK_NOTES_MASTER__USEREFNO~BLK_NOTES_MASTER__DISCLOSDESC~BLK_NOTES_MASTER__CONTREFNO~BLK_NOTES_MASTER__DISCLOCODE","CVS_SCH":"BLK_SCH_MASTER__USERREFNO~BLK_SCH_MASTER__CONTRACTREFNO2"};
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