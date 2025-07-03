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
**  File Name          : SMDMASKD_SYS.js
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
var fieldNameArray = {"BLK_PII_PROP_MASTER":"MASKTYPE~PII_GROUP~ERROR_DESC~PROCESS_FLAG~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH","BLK_STVWS_PII_PROP_DET":"CHAR_FIELD1~CHAR_FIELD2~CHAR_FIELD3","BLK_PII_PROP_DET":"COLUMN_NAME~DATA_LENGTH~DATA_TYPE~ERROR_DESC~FROM_POSITION~MASKVALUE~MASK_TYPE~PII_GROUP~TABLE_NAME~TOKENIZE~TO_POSITION~PROCESS_FLAG"};

var multipleEntryPageSize = {"BLK_STVWS_PII_PROP_DET" :"15" ,"BLK_PII_PROP_DET" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_STVWS_PII_PROP_DET~BLK_PII_PROP_DET"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_PII_PROP_MASTER">MASKTYPE~PII_GROUP~ERROR_DESC~PROCESS_FLAG~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
msgxml += '      <FN PARENT="BLK_PII_PROP_MASTER" RELATION_TYPE="N" TYPE="BLK_STVWS_PII_PROP_DET">CHAR_FIELD1~CHAR_FIELD2~CHAR_FIELD3</FN>'; 
msgxml += '      <FN PARENT="BLK_STVWS_PII_PROP_DET" RELATION_TYPE="N" TYPE="BLK_PII_PROP_DET">COLUMN_NAME~DATA_LENGTH~DATA_TYPE~ERROR_DESC~FROM_POSITION~MASKVALUE~MASK_TYPE~PII_GROUP~TABLE_NAME~TOKENIZE~TO_POSITION~PROCESS_FLAG</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_PII_PROP_MASTER">AUTHSTAT~TXNSTAT~MASKTYPE~PII_GROUP</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "SMDMASKD";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_PII_PROP_MASTER";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_PII_PROP_MASTER" : "","BLK_STVWS_PII_PROP_DET" : "BLK_PII_PROP_MASTER~N","BLK_PII_PROP_DET" : "BLK_STVWS_PII_PROP_DET~N"}; 

 var dataSrcLocationArray = new Array("BLK_PII_PROP_MASTER","BLK_STVWS_PII_PROP_DET","BLK_PII_PROP_DET"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside SMDMASKD.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside SMDMASKD.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_PII_PROP_MASTER__MASKTYPE";
pkFields[0] = "BLK_PII_PROP_MASTER__MASKTYPE";
queryFields[1] = "BLK_PII_PROP_MASTER__PII_GROUP";
pkFields[1] = "BLK_PII_PROP_MASTER__PII_GROUP";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_PII_PROP_DET":["FROM_POSITION","MASKVALUE","TO_POSITION"]};
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
var lovInfoFlds = {"BLK_STVWS_PII_PROP_DET__CHAR_FIELD1__LOV_TABLE_NAME":["BLK_STVWS_PII_PROP_DET__CHAR_FIELD1~","BLK_PII_PROP_MASTER__PII_GROUP!VARCHAR2","N~N",""],"BLK_PII_PROP_DET__COLUMN_NAME__LOV_COLUMN_NAME":["BLK_PII_PROP_DET__TABLE_NAME~BLK_PII_PROP_DET__COLUMN_NAME~BLK_PII_PROP_DET__DATA_TYPE~BLK_PII_PROP_DET__DATA_LENGTH~","BLK_STVWS_PII_PROP_DET__CHAR_FIELD1!VARCHAR2~BLK_PII_PROP_MASTER__PII_GROUP!VARCHAR2","N~N~N~N",""]};
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
var multipleEntryIDs = new Array("BLK_STVWS_PII_PROP_DET","BLK_PII_PROP_DET");
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

ArrFuncOrigin["SMDMASKD"]="KERNEL";
ArrPrntFunc["SMDMASKD"]="";
ArrPrntOrigin["SMDMASKD"]="";
ArrRoutingType["SMDMASKD"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["SMDMASKD"]="N";
ArrCustomModified["SMDMASKD"]="N";

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