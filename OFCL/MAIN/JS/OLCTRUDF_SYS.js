/***************************************************************************************************************************
**  This source is part of the Oracle Banking Software Product. 
**  Copyright (c) 2008 ,2025, Oracle and/or its affiliates.
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
**  File Name          : OLCTRUDF_SYS.js
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
var criteriaSearch  = '';
//----------------------------------------------------------------------------------------------------------------------
//***** FCJ XML FOR THE SCREEN *****
//----------------------------------------------------------------------------------------------------------------------
var fieldNameArray = {"BLK_TXN_FLD_MASTER":"CONTREFNO~LATVERNO","BLK_TXN_UDF_DETAILS":"CONTREFNO~VERNO~FLDNAME~FLDVAL~SOURCECODE~EXTREFNO~DATATYPE~VALTYPE~EXTSEQNO~BRNCODE~FLDDESC~MANDATORY~FLDVALDESC","BLK_OLVWS_CONT_UDF_UPLOAD_DETAIL_NUM":"BRANCH_CODE~CONTRACT_REF_NO~DATA_TYPE~EXTERNAL_REF_NO~EXT_SEQ_NO~FIELD_DESCRIPTION~FIELD_NAME~FIELD_VAL~FIELD_VAL_DESC~MANDATORY~SOURCE_CODE~VAL_TYPE~VERSION_NO","BLK_OLVWS_CONT_UDF_UPLOAD_DETAIL_DATE":"BRANCH_CODE~CONTRACT_REF_NO~DATA_TYPE~EXTERNAL_REF_NO~EXT_SEQ_NO~FIELD_DESCRIPTION~FIELD_NAME~FIELD_VAL~FIELD_VAL_DESC~MANDATORY~SOURCE_CODE~VAL_TYPE~VERSION_NO"};

var multipleEntryPageSize = {"BLK_TXN_UDF_DETAILS" :"15" ,"BLK_OLVWS_CONT_UDF_UPLOAD_DETAIL_DATE" :"15" ,"BLK_OLVWS_CONT_UDF_UPLOAD_DETAIL_NUM" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_UDF__TAB_MAIN":"BLK_TXN_UDF_DETAILS~BLK_OLVWS_CONT_UDF_UPLOAD_DETAIL_DATE~BLK_OLVWS_CONT_UDF_UPLOAD_DETAIL_NUM"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_TXN_FLD_MASTER">CONTREFNO~LATVERNO</FN>'; 
msgxml += '      <FN PARENT="BLK_TXN_FLD_MASTER" RELATION_TYPE="N" TYPE="BLK_TXN_UDF_DETAILS">CONTREFNO~VERNO~FLDNAME~FLDVAL~SOURCECODE~EXTREFNO~DATATYPE~VALTYPE~EXTSEQNO~BRNCODE~FLDDESC~MANDATORY~FLDVALDESC</FN>'; 
msgxml += '      <FN PARENT="BLK_TXN_FLD_MASTER" RELATION_TYPE="N" TYPE="BLK_OLVWS_CONT_UDF_UPLOAD_DETAIL_NUM">BRANCH_CODE~CONTRACT_REF_NO~DATA_TYPE~EXTERNAL_REF_NO~EXT_SEQ_NO~FIELD_DESCRIPTION~FIELD_NAME~FIELD_VAL~FIELD_VAL_DESC~MANDATORY~SOURCE_CODE~VAL_TYPE~VERSION_NO</FN>'; 
msgxml += '      <FN PARENT="BLK_TXN_FLD_MASTER" RELATION_TYPE="N" TYPE="BLK_OLVWS_CONT_UDF_UPLOAD_DETAIL_DATE">BRANCH_CODE~CONTRACT_REF_NO~DATA_TYPE~EXTERNAL_REF_NO~EXT_SEQ_NO~FIELD_DESCRIPTION~FIELD_NAME~FIELD_VAL~FIELD_VAL_DESC~MANDATORY~SOURCE_CODE~VAL_TYPE~VERSION_NO</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_UDF";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_TXN_FLD_MASTER" : "","BLK_TXN_UDF_DETAILS" : "BLK_TXN_FLD_MASTER~N","BLK_OLVWS_CONT_UDF_UPLOAD_DETAIL_NUM" : "BLK_TXN_FLD_MASTER~N","BLK_OLVWS_CONT_UDF_UPLOAD_DETAIL_DATE" : "BLK_TXN_FLD_MASTER~N"}; 

 var dataSrcLocationArray = new Array("BLK_TXN_FLD_MASTER","BLK_TXN_UDF_DETAILS","BLK_OLVWS_CONT_UDF_UPLOAD_DETAIL_NUM","BLK_OLVWS_CONT_UDF_UPLOAD_DETAIL_DATE"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLCTRUDF.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLCTRUDF.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_TXN_FLD_MASTER__CONTREFNO";
pkFields[0] = "BLK_TXN_FLD_MASTER__CONTREFNO";
queryFields[1] = "BLK_TXN_FLD_MASTER__LATVERNO";
pkFields[1] = "BLK_TXN_FLD_MASTER__LATVERNO";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_OLVWS_CONT_UDF_UPLOAD_DETAIL_DATE":["FIELD_VALI"],"BLK_OLVWS_CONT_UDF_UPLOAD_DETAIL_NUM":["FIELD_VAL"],"BLK_TXN_UDF_DETAILS":["FLDVAL"]};
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
var lovInfoFlds = {"BLK_TXN_UDF_DETAILS__FLDVAL__LOV_UDF":["BLK_TXN_UDF_DETAILS__FLDVAL~BLK_TXN_UDF_DETAILS__FLDVALDESC~","BLK_TXN_UDF_DETAILS__FLDNAME!VARCHAR2","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_TXN_UDF_DETAILS","BLK_OLVWS_CONT_UDF_UPLOAD_DETAIL_DATE","BLK_OLVWS_CONT_UDF_UPLOAD_DETAIL_NUM");
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

ArrFuncOrigin["OLCTRUDF"]="KERNEL";
ArrPrntFunc["OLCTRUDF"]="";
ArrPrntOrigin["OLCTRUDF"]="";
ArrRoutingType["OLCTRUDF"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLCTRUDF"]="N";
ArrCustomModified["OLCTRUDF"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_UDF":"CONTREFNO~LATVERNO"};
var scrArgSource = {};
var scrArgVals = {"CVS_UDF":"~"};
var scrArgDest = {"CVS_UDF":"BLK_TXN_FLD_MASTER__CONTREFNO~BLK_TXN_FLD_MASTER__LATVERNO"};
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