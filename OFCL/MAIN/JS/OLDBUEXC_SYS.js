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
**  File Name          : OLDBUEXC_SYS.js
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
var fieldNameArray = {"BLK_EXT_CONTRACT_STAT":"ACTION_CODE~BRANCH_CODE~CITICUBE_REF_NO~CONTRACT_REF_NO~COUNTERPARTY~DEPARTMENT_CODE~ERR_CODE~ERR_MSG~EXPORT_STATUS~EXTERNAL_INIT_DATE~EXTERNAL_REF_NO~EXTERNAL_SEQ_NO~FUNCTION_ID~IMPORT_STATUS~JOBNO~MODULE~POST_IMPORT_STATUS~PRODUCT_CODE~SEQ_NO~SOURCE~TRANS_OUC~TREASURY_SOURCE~UPLOAD_ID~UPLOAD_REF~USER_ID","BLK_UPLOAD_EXCEPTION_CS":"BRANCH_CODE~ERROR_CODE~ERROR_CODE_TYPE~ERROR_PARAMETERS~ERR_SERIAL_NO~SOURCE_CODE~SOURCE_REF~SOURCE_SEQ_NO~UPLOAD_ID~UI_ERROR"};

var multipleEntryPageSize = {"BLK_UPLOAD_EXCEPTION_CS" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_UPLOAD_EXCEPTION_CS"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_EXT_CONTRACT_STAT">ACTION_CODE~BRANCH_CODE~CITICUBE_REF_NO~CONTRACT_REF_NO~COUNTERPARTY~DEPARTMENT_CODE~ERR_CODE~ERR_MSG~EXPORT_STATUS~EXTERNAL_INIT_DATE~EXTERNAL_REF_NO~EXTERNAL_SEQ_NO~FUNCTION_ID~IMPORT_STATUS~JOBNO~MODULE~POST_IMPORT_STATUS~PRODUCT_CODE~SEQ_NO~SOURCE~TRANS_OUC~TREASURY_SOURCE~UPLOAD_ID~UPLOAD_REF~USER_ID</FN>'; 
msgxml += '      <FN PARENT="BLK_EXT_CONTRACT_STAT" RELATION_TYPE="N" TYPE="BLK_UPLOAD_EXCEPTION_CS">BRANCH_CODE~ERROR_CODE~ERROR_CODE_TYPE~ERROR_PARAMETERS~ERR_SERIAL_NO~SOURCE_CODE~SOURCE_REF~SOURCE_SEQ_NO~UPLOAD_ID~UI_ERROR</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_EXT_CONTRACT_STAT">BRANCH_CODE~SOURCE~PRODUCT_CODE~COUNTERPARTY~EXTERNAL_INIT_DATE~MODULE~EXTERNAL_REF_NO~IMPORT_STATUS~CITICUBE_REF_NO~ERR_CODE~ERR_MSG</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "OLDBUEXC";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_EXT_CONTRACT_STAT";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_EXT_CONTRACT_STAT" : "","BLK_UPLOAD_EXCEPTION_CS" : "BLK_EXT_CONTRACT_STAT~N"}; 

 var dataSrcLocationArray = new Array("BLK_EXT_CONTRACT_STAT","BLK_UPLOAD_EXCEPTION_CS"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLDBUEXC.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLDBUEXC.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_EXT_CONTRACT_STAT__SOURCE";
pkFields[0] = "BLK_EXT_CONTRACT_STAT__SOURCE";
queryFields[1] = "BLK_EXT_CONTRACT_STAT__BRANCH_CODE";
pkFields[1] = "BLK_EXT_CONTRACT_STAT__BRANCH_CODE";
queryFields[2] = "BLK_EXT_CONTRACT_STAT__EXTERNAL_REF_NO";
pkFields[2] = "BLK_EXT_CONTRACT_STAT__EXTERNAL_REF_NO";
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
var lovInfoFlds = {};
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
var multipleEntryIDs = new Array("BLK_UPLOAD_EXCEPTION_CS");
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

ArrFuncOrigin["OLDBUEXC"]="KERNEL";
ArrPrntFunc["OLDBUEXC"]="";
ArrPrntOrigin["OLDBUEXC"]="";
ArrRoutingType["OLDBUEXC"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLDBUEXC"]="N";
ArrCustomModified["OLDBUEXC"]="N";

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