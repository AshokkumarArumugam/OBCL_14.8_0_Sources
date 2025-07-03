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
**  File Name          : CFDFLTRI_SYS.js
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
var fieldNameArray = {"BLK_RATE_CODE":"RATE_CODE~RATE_DESC~BRANCH_CODE~QUOTE_BASIS~FL_BR_RATE_PROP~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH","BLK_RATE_CCY":"RATE_CODE~CCY_CODE~BRANCH_CODE","BLK_FLOAD_RATE":"RATE_CODE~CCY_CODE~AMOUNT_SLAB~EFFECTIVE_DATE~RATE_RECORD_STATUS~PREV_AMOUNT_SLAB~NEXT_EFFECTIVE_DATE~BRANCH_CODE~BORROW_LEND_NO","BLK_FLTRATE_DETAIL":"RATE_CODE~CCY_CODE~AMOUNT_SLAB~EFFECTIVE_DATE~BRANCH_CODE~BORROW_LEND_IND~TENOR_FROM~TENOR_TO~INT_RATE~UNIT~PICKEDUPRATECD"};

var multipleEntryPageSize = {"BLK_RATE_CCY" :"15" ,"BLK_FLOAD_RATE" :"15" ,"BLK_FLTRATE_DETAIL" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_RATE_CCY~BLK_FLOAD_RATE~BLK_FLTRATE_DETAIL"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_RATE_CODE">RATE_CODE~RATE_DESC~BRANCH_CODE~QUOTE_BASIS~FL_BR_RATE_PROP~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
msgxml += '      <FN PARENT="BLK_RATE_CODE" RELATION_TYPE="N" TYPE="BLK_RATE_CCY">RATE_CODE~CCY_CODE~BRANCH_CODE</FN>'; 
msgxml += '      <FN PARENT="BLK_RATE_CCY" RELATION_TYPE="N" TYPE="BLK_FLOAD_RATE">RATE_CODE~CCY_CODE~AMOUNT_SLAB~EFFECTIVE_DATE~RATE_RECORD_STATUS~PREV_AMOUNT_SLAB~NEXT_EFFECTIVE_DATE~BRANCH_CODE~BORROW_LEND_NO</FN>'; 
msgxml += '      <FN PARENT="BLK_FLOAD_RATE" RELATION_TYPE="N" TYPE="BLK_FLTRATE_DETAIL">RATE_CODE~CCY_CODE~AMOUNT_SLAB~EFFECTIVE_DATE~BRANCH_CODE~BORROW_LEND_IND~TENOR_FROM~TENOR_TO~INT_RATE~UNIT~PICKEDUPRATECD</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_RATE_CODE">AUTHSTAT~TXNSTAT~RATE_CODE~BRANCH_CODE~RATE_DESC</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "CFDFLTRI";
var defaultWhereClause = "BRANCH_CODE=global.current_branch";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_RATE_CODE";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_RATE_CODE" : "","BLK_RATE_CCY" : "BLK_RATE_CODE~N","BLK_FLOAD_RATE" : "BLK_RATE_CCY~N","BLK_FLTRATE_DETAIL" : "BLK_FLOAD_RATE~N"}; 

 var dataSrcLocationArray = new Array("BLK_RATE_CODE","BLK_RATE_CCY","BLK_FLOAD_RATE","BLK_FLTRATE_DETAIL"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside CFDFLTRI.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside CFDFLTRI.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_RATE_CODE__RATE_CODE";
pkFields[0] = "BLK_RATE_CODE__RATE_CODE";
queryFields[1] = "BLK_RATE_CODE__BRANCH_CODE";
pkFields[1] = "BLK_RATE_CODE__BRANCH_CODE";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_FLOAD_RATE":["BORROW_LEND_NO"],"BLK_FLTRATE_DETAIL":["INT_RATE","PICKEDUPRATECD","UNIT"],"BLK_RATE_CODE":["FL_BR_RATE_PROP","QUOTE_BASIS","RATE_DESC"]};
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
var lovInfoFlds = {"BLK_RATE_CODE__RATE_CODE__LOV_RATE_CODE":["BLK_RATE_CODE__RATE_CODE~BLK_RATE_CODE__RATE_DESC~","","N~N",""],"BLK_RATE_CCY__CCY_CODE__LOV_CCY_1202":["BLK_RATE_CCY__CCY_CODE~~","","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_RATE_CCY","BLK_FLOAD_RATE","BLK_FLTRATE_DETAIL");
var multipleEntryArray = new Array();
var multipleEntryCells = new Array();
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY VIEW SINGLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR ATTACHED CALLFORMS *****
 //----------------------------------------------------------------------------------------------------------------------

 var CallFormArray= new Array("CSCFNUDF~BLK_RATE_CODE"); 

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

ArrFuncOrigin["CFDFLTRI"]="KERNEL";
ArrPrntFunc["CFDFLTRI"]="";
ArrPrntOrigin["CFDFLTRI"]="";
ArrRoutingType["CFDFLTRI"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["CFDFLTRI"]="N";
ArrCustomModified["CFDFLTRI"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CSCFNUDF":""};
var scrArgSource = {"CSCFNUDF":""};
var scrArgVals = {"CSCFNUDF":""};
var scrArgDest = {};
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
var actStageArry = {"QUERY":"2","NEW":"2","MODIFY":"2","AUTHORIZE":"2","DELETE":"2","CLOSE":"2","REOPEN":"2","REVERSE":"1","ROLLOVER":"1","CONFIRM":"1","LIQUIDATE":"1","SUMMARYQUERY":"1"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------