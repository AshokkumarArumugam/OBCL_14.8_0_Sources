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
**  File Name          : OLDDIAEV_SYS.js
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
var fieldNameArray = {"BLK_DIARY_MASTER":"MODULE~MODULEDESC~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH","BLK_DIARY_EVENT_DEFN":"EVENT~EVENTDESCRIPTION~OCCURENCE~USERGROUP~INTERNALEVENT","BLK_DIARY_MSG":"MSGDESCRIPTION~MSGTYPE","BLK_DIARY_TAGS1":"FIELDTAG1~FIELDTAG2~FIELDTAG3~FIELDTAG4~FIELDTAG5~FIELDTAG6~FIELDTAG7~FIELDTAG8~FIELDTAG9~FIELDTAG10~FIELDTAG11~FIELDTAG12~FIELDTAG13~FIELDTAG14~FIELDTAG15","BLK_DIARY_TAGS2":"FIELDTAG16~FIELDTAG17~FIELDTAG18~FIELDTAG19~FIELDTAG20~FIELDTAG21~FIELDTAG22~FIELDTAG23~FIELDTAG24~FIELDTAG25~FIELDTAG26~FIELDTAG27~FIELDTAG28~FIELDTAG29~FIELDTAG30","BLK_DAIRY_UDF":"FIELDNO~TAGNAME~TAGDATATYPE~TAGDATEFORMAT"};

var multipleEntryPageSize = {"BLK_DIARY_EVENT_DEFN" :"15" ,"BLK_DIARY_MSG" :"15" ,"BLK_DAIRY_UDF" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_DIARY_MASTER__TAB_EVENTS":"BLK_DIARY_EVENT_DEFN~BLK_DIARY_MSG","CVS_DIARY_MASTER__TAB_MSG_FIELDS":"BLK_DAIRY_UDF"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_DIARY_MASTER">MODULE~MODULEDESC~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
msgxml += '      <FN PARENT="BLK_DIARY_MASTER" RELATION_TYPE="N" TYPE="BLK_DIARY_EVENT_DEFN">EVENT~EVENTDESCRIPTION~OCCURENCE~USERGROUP~INTERNALEVENT</FN>'; 
msgxml += '      <FN PARENT="BLK_DIARY_MASTER" RELATION_TYPE="N" TYPE="BLK_DIARY_MSG">MSGDESCRIPTION~MSGTYPE</FN>'; 
msgxml += '      <FN PARENT="BLK_DIARY_MASTER" RELATION_TYPE="1" TYPE="BLK_DIARY_TAGS1">FIELDTAG1~FIELDTAG2~FIELDTAG3~FIELDTAG4~FIELDTAG5~FIELDTAG6~FIELDTAG7~FIELDTAG8~FIELDTAG9~FIELDTAG10~FIELDTAG11~FIELDTAG12~FIELDTAG13~FIELDTAG14~FIELDTAG15</FN>'; 
msgxml += '      <FN PARENT="BLK_DIARY_MASTER" RELATION_TYPE="N" TYPE="BLK_DIARY_TAGS2">FIELDTAG16~FIELDTAG17~FIELDTAG18~FIELDTAG19~FIELDTAG20~FIELDTAG21~FIELDTAG22~FIELDTAG23~FIELDTAG24~FIELDTAG25~FIELDTAG26~FIELDTAG27~FIELDTAG28~FIELDTAG29~FIELDTAG30</FN>'; 
msgxml += '      <FN PARENT="BLK_DIARY_MASTER" RELATION_TYPE="N" TYPE="BLK_DAIRY_UDF">FIELDNO~TAGNAME~TAGDATATYPE~TAGDATEFORMAT</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_DIARY_MASTER";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** FCJ XML FOR SUMMARY SCREEN *****
//----------------------------------------------------------------------------------------------------------------------
var msgxml_sum=""; 
msgxml_sum += '    <FLD>'; 
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_DIARY_MASTER">AUTHSTAT~TXNSTAT~MODULE</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "OLDDIAEV";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_DIARY_MASTER";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_DIARY_MASTER" : "","BLK_DIARY_EVENT_DEFN" : "BLK_DIARY_MASTER~N","BLK_DIARY_MSG" : "BLK_DIARY_MASTER~N","BLK_DIARY_TAGS1" : "BLK_DIARY_MASTER~1","BLK_DIARY_TAGS2" : "BLK_DIARY_MASTER~N","BLK_DAIRY_UDF" : "BLK_DIARY_MASTER~N"}; 

 var dataSrcLocationArray = new Array("BLK_DIARY_MASTER","BLK_DIARY_EVENT_DEFN","BLK_DIARY_MSG","BLK_DIARY_TAGS1","BLK_DIARY_TAGS2","BLK_DAIRY_UDF"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLDDIAEV.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLDDIAEV.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_DIARY_MASTER__MODULE";
pkFields[0] = "BLK_DIARY_MASTER__MODULE";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_DAIRY_UDF":["FIELDNO","TAGDATATYPE","TAGDATEFORMAT","TAGNAME"],"BLK_DIARY_EVENT_DEFN":["EVENT","EVENTDESCRIPTION","INTERNALEVENT","OCCURENCE","USERGROUP"],"BLK_DIARY_MSG":["MSGDESCRIPTION","MSGTYPE"],"BLK_DIARY_TAGS1":["FIELDTAG1","FIELDTAG10","FIELDTAG11","FIELDTAG12","FIELDTAG13","FIELDTAG14","FIELDTAG15","FIELDTAG2","FIELDTAG3","FIELDTAG4","FIELDTAG5","FIELDTAG6","FIELDTAG7","FIELDTAG8","FIELDTAG9"],"BLK_DIARY_TAGS2":["FIELDTAG16","FIELDTAG17","FIELDTAG18","FIELDTAG19","FIELDTAG20","FIELDTAG21","FIELDTAG22","FIELDTAG23","FIELDTAG24","FIELDTAG25","FIELDTAG26","FIELDTAG27","FIELDTAG28","FIELDTAG29","FIELDTAG30"]};
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
var lovInfoFlds = {"BLK_DIARY_MASTER__MODULE__LOV_MODULE":["BLK_DIARY_MASTER__MODULE~BLK_DIARY_MASTER__MODULEDESC~","","N~N",""],"BLK_DIARY_EVENT_DEFN__USERGROUP__LOV_USR_GROUP":["BLK_DIARY_EVENT_DEFN__USERGROUP~~","","N",""]};
var offlineLovInfoFlds = {};
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR TABS *****
//----------------------------------------------------------------------------------------------------------------------
var strHeaderTabId = 'TAB_HEADER';
var strFooterTabId = 'TAB_FOOTER';
var strCurrentTabId = 'TAB_EVENTS';
//--------------------------------------------
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------
var multipleEntryIDs = new Array("BLK_DIARY_EVENT_DEFN","BLK_DIARY_MSG","BLK_DAIRY_UDF");
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

ArrFuncOrigin["OLDDIAEV"]="KERNEL";
ArrPrntFunc["OLDDIAEV"]="";
ArrPrntOrigin["OLDDIAEV"]="";
ArrRoutingType["OLDDIAEV"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLDDIAEV"]="N";
ArrCustomModified["OLDDIAEV"]="N";

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