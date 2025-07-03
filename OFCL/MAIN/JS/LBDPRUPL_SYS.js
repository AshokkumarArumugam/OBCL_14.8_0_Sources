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
**  File Name          : LBDPRUPL_SYS.js
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
var fieldNameArray = {"BLK_LBTBS_PAY_RECV_UPL_MASTER":"REFERENCE_NO~FILE_NAME~AUTHSTAT~TXNSTAT~MOD_NO~ONCE_AUTH~MAKER_ID~MAKER_DT_STAMP~CHECKER_ID~CHECKER_DT_STAMP","BLK_LBTBS_PAY_RECV_UPLOAD":"CONTRACT_REF_NO~COMPONENT~DUE_DATE~PAY_REV_AMOUNT~BRANCH~REFERENCE_NO~RECORD_STAT~AUTH_STAT~MAKER_ID~MAKER_DT_STAMP~CHECKER_ID~CHECKER_DT_STAMP~FILE_NAME","BLK_LBTBS_PAY_RECV_UPL_MASTER__EX":"REFERENCE_NO","BLK_OLTBS_UPLOAD_EXCEPTION_CS":"ERROR_CODE~MESSAGE~ERROR_PARAMETERS~SOURCE_REF"};

var multipleEntryPageSize = {"BLK_LBTBS_PAY_RECV_UPLOAD" :"15" ,"BLK_OLTBS_UPLOAD_EXCEPTION_CS" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_LBTBS_PAY_RECV_UPLOAD","CVS_ERRORS__TAB_MAIN":"BLK_OLTBS_UPLOAD_EXCEPTION_CS"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_LBTBS_PAY_RECV_UPL_MASTER">REFERENCE_NO~FILE_NAME~AUTHSTAT~TXNSTAT~MOD_NO~ONCE_AUTH~MAKER_ID~MAKER_DT_STAMP~CHECKER_ID~CHECKER_DT_STAMP</FN>'; 
msgxml += '      <FN PARENT="BLK_LBTBS_PAY_RECV_UPL_MASTER" RELATION_TYPE="N" TYPE="BLK_LBTBS_PAY_RECV_UPLOAD">CONTRACT_REF_NO~COMPONENT~DUE_DATE~PAY_REV_AMOUNT~BRANCH~REFERENCE_NO~RECORD_STAT~AUTH_STAT~MAKER_ID~MAKER_DT_STAMP~CHECKER_ID~CHECKER_DT_STAMP~FILE_NAME</FN>'; 
msgxml += '      <FN PARENT="BLK_LBTBS_PAY_RECV_UPL_MASTER" RELATION_TYPE="1" TYPE="BLK_LBTBS_PAY_RECV_UPL_MASTER__EX">REFERENCE_NO</FN>'; 
msgxml += '      <FN PARENT="BLK_LBTBS_PAY_RECV_UPL_MASTER__EX" RELATION_TYPE="N" TYPE="BLK_OLTBS_UPLOAD_EXCEPTION_CS">ERROR_CODE~MESSAGE~ERROR_PARAMETERS~SOURCE_REF</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_LBTBS_PAY_RECV_UPL_MASTER">REFERENCE_NO~AUTHSTAT~MAKER_ID~MAKER_DT_STAMP~CHECKER_ID~CHECKER_DT_STAMP~TXNSTAT</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "LBDPRUPL";
var defaultWhereClause = "exists (Select 1 From OLVW_USER_ACCESS_PRODUCTS Where PRODUCT_CODE = sypks_utils.get_product(REFERENCE_NO) AND USER_ID = global.user_id)";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_LBTBS_PAY_RECV_UPL_MASTER";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_LBTBS_PAY_RECV_UPL_MASTER" : "","BLK_LBTBS_PAY_RECV_UPLOAD" : "BLK_LBTBS_PAY_RECV_UPL_MASTER~N","BLK_LBTBS_PAY_RECV_UPL_MASTER__EX" : "BLK_LBTBS_PAY_RECV_UPL_MASTER~1","BLK_OLTBS_UPLOAD_EXCEPTION_CS" : "BLK_LBTBS_PAY_RECV_UPL_MASTER__EX~N"}; 

 var dataSrcLocationArray = new Array("BLK_LBTBS_PAY_RECV_UPL_MASTER","BLK_LBTBS_PAY_RECV_UPLOAD","BLK_LBTBS_PAY_RECV_UPL_MASTER__EX","BLK_OLTBS_UPLOAD_EXCEPTION_CS"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LBDPRUPL.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LBDPRUPL.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_LBTBS_PAY_RECV_UPL_MASTER__REFERENCE_NO";
pkFields[0] = "BLK_LBTBS_PAY_RECV_UPL_MASTER__REFERENCE_NO";
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
var multipleEntryIDs = new Array("BLK_LBTBS_PAY_RECV_UPLOAD","BLK_OLTBS_UPLOAD_EXCEPTION_CS");
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

ArrFuncOrigin["LBDPRUPL"]="KERNEL";
ArrPrntFunc["LBDPRUPL"]="";
ArrPrntOrigin["LBDPRUPL"]="";
ArrRoutingType["LBDPRUPL"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LBDPRUPL"]="N";
ArrCustomModified["LBDPRUPL"]="N";

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
var actStageArry = {};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------