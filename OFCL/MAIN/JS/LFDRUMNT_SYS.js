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
**  File Name          : LFDRUMNT_SYS.js
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
var fieldNameArray = {"BLK_LFTMS_RULE":"CUSTOMER_TYPE~MIN_MAX_CCY~BRANCH~ACCOUNT_NO~ACCT_CATEGORY~TYPE~CUST_GROUP~CASCADE_AMOUNT~BOOKING_CCY~TIERED_TENOR~RATE_CODE_TYPE~RATE_CODE~BASIS_AMOUNT_CCY~CUMULATIVE~FLAT_AMOUNT_CURRENCY~MAXIMUM_AMOUNT~MINIMUM_AMOUNT~RATE_TYPE~CUSTOMER~CURRENCY2~CURRENCY~DESCRIPTION~RULE~TENOR_BASIS~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH","BLK_LFTMS_BRACKET":"MAXIMUM_AMOUNT~MINIMUM_AMOUNT~FLOOR_AMOUNT~FLOOR_BASIS_AMOUNT~AMOUNT~RATE~BASIS_AMOUNT_TO~BASIS_AMOUNT_FROM~PART_THEREOF","BLK_LFTMS_BRACKET_TENOR":"RATE~TENOR_TO~TENOR_FROM~AMOUNT"};

var multipleEntryPageSize = {"BLK_LFTMS_BRACKET_TENOR" :"15" ,"BLK_LFTMS_BRACKET" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_TENOR_DETAILS":"BLK_LFTMS_BRACKET_TENOR~BLK_LFTMS_BRACKET"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_LFTMS_RULE">CUSTOMER_TYPE~MIN_MAX_CCY~BRANCH~ACCOUNT_NO~ACCT_CATEGORY~TYPE~CUST_GROUP~CASCADE_AMOUNT~BOOKING_CCY~TIERED_TENOR~RATE_CODE_TYPE~RATE_CODE~BASIS_AMOUNT_CCY~CUMULATIVE~FLAT_AMOUNT_CURRENCY~MAXIMUM_AMOUNT~MINIMUM_AMOUNT~RATE_TYPE~CUSTOMER~CURRENCY2~CURRENCY~DESCRIPTION~RULE~TENOR_BASIS~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
msgxml += '      <FN PARENT="BLK_LFTMS_RULE" RELATION_TYPE="N" TYPE="BLK_LFTMS_BRACKET">MAXIMUM_AMOUNT~MINIMUM_AMOUNT~FLOOR_AMOUNT~FLOOR_BASIS_AMOUNT~AMOUNT~RATE~BASIS_AMOUNT_TO~BASIS_AMOUNT_FROM~PART_THEREOF</FN>'; 
msgxml += '      <FN PARENT="BLK_LFTMS_BRACKET" RELATION_TYPE="N" TYPE="BLK_LFTMS_BRACKET_TENOR">RATE~TENOR_TO~TENOR_FROM~AMOUNT</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_LFTMS_RULE">AUTHSTAT~TXNSTAT~RULE~TYPE~CURRENCY~BRANCH~CUST_GROUP~CUSTOMER~ACCT_CATEGORY~ACCOUNT_NO~DESCRIPTION~CURRENCY2</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "LFDRUMNT";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_LFTMS_RULE";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_LFTMS_RULE" : "","BLK_LFTMS_BRACKET" : "BLK_LFTMS_RULE~N","BLK_LFTMS_BRACKET_TENOR" : "BLK_LFTMS_BRACKET~N"}; 

 var dataSrcLocationArray = new Array("BLK_LFTMS_RULE","BLK_LFTMS_BRACKET","BLK_LFTMS_BRACKET_TENOR"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LFDRUMNT.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LFDRUMNT.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_LFTMS_RULE__RULE";
pkFields[0] = "BLK_LFTMS_RULE__RULE";
queryFields[1] = "BLK_LFTMS_RULE__CURRENCY";
pkFields[1] = "BLK_LFTMS_RULE__CURRENCY";
queryFields[2] = "BLK_LFTMS_RULE__CURRENCY2";
pkFields[2] = "BLK_LFTMS_RULE__CURRENCY2";
queryFields[3] = "BLK_LFTMS_RULE__CUSTOMER";
pkFields[3] = "BLK_LFTMS_RULE__CUSTOMER";
queryFields[4] = "BLK_LFTMS_RULE__CUST_GROUP";
pkFields[4] = "BLK_LFTMS_RULE__CUST_GROUP";
queryFields[5] = "BLK_LFTMS_RULE__ACCT_CATEGORY";
pkFields[5] = "BLK_LFTMS_RULE__ACCT_CATEGORY";
queryFields[6] = "BLK_LFTMS_RULE__ACCOUNT_NO";
pkFields[6] = "BLK_LFTMS_RULE__ACCOUNT_NO";
queryFields[7] = "BLK_LFTMS_RULE__BRANCH";
pkFields[7] = "BLK_LFTMS_RULE__BRANCH";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_LFTMS_BRACKET_TENOR":["AMOUNT","RATE","TENOR_FROM"],"BLK_LFTMS_BRACKET":["AMOUNT","FLOOR_AMOUNT","FLOOR_BASIS_AMOUNT","MAXIMUM_AMOUNT","MINIMUM_AMOUNT","PART_THEREOF","RATE"],"BLK_LFTMS_RULE":["BASIS_AMOUNT_CCY","BOOKING_CCY","BRANCH","CASCADE_AMOUNT","CUMULATIVE","CURRENCY2","DESCRIPTION","FLAT_AMOUNT_CURRENCY","MAXIMUM_AMOUNT","MINIMUM_AMOUNT","MIN_MAX_CCY","RATE_CODE","RATE_CODE_TYPE","RATE_TYPE","TENOR_BASIS","TIERED_TENOR"]};
var closeAmendArr = new Array(); 
var reopenAmendArr = new Array(); 
var reverseAmendArr = new Array(); 
var deleteAmendArr = new Array(); 
var rolloverAmendArr = new Array(); 
var confirmAmendArr = new Array(); 
var liquidateAmendArr = new Array(); 
var queryAmendArr = new Array(); 
//***** Fields Amendable while Authorize *****
var authorizeAmenArr = {"BLK_LFTMS_BRACKET_TENOR":["AMOUNT","RATE","TENOR_FROM"],"BLK_LFTMS_BRACKET":["AMOUNT","BASIS_AMOUNT_FROM","FLOOR_AMOUNT","FLOOR_BASIS_AMOUNT","MAXIMUM_AMOUNT","MINIMUM_AMOUNT","PART_THEREOF","RATE"],"BLK_LFTMS_RULE":["ACCOUNT_NO","ACCT_CATEGORY","BASIS_AMOUNT_CCY","BOOKING_CCY","BRANCH","CASCADE_AMOUNT","CUMULATIVE","CUSTOMER_TYPE","CUST_GROUP","DESCRIPTION","FLAT_AMOUNT_CURRENCY","MAXIMUM_AMOUNT","MINIMUM_AMOUNT","MIN_MAX_CCY","RATE_CODE","RATE_CODE_TYPE","RATE_TYPE","TENOR_BASIS","TIERED_TENOR","TYPE"]};
//----------------------------------------------------------------------------------------------------------------------

var subsysArr    = new Array(); 

//----------------------------------------------------------------------------------------------------------------------

//***** CODE FOR LOVs *****
//----------------------------------------------------------------------------------------------------------------------
var lovInfoFlds = {"BLK_LFTMS_RULE__MIN_MAX_CCY__LOV_CCY_MAINT":["BLK_LFTMS_RULE__MIN_MAX_CCY~~","","N~N",""],"BLK_LFTMS_RULE__BRANCH__LOV_BRANCH":["BLK_LFTMS_RULE__BRANCH~","","N",""],"BLK_LFTMS_RULE__ACCOUNT_NO__LOV_ACCOUNT":["BLK_LFTMS_RULE__ACCOUNT_NO~","","N",""],"BLK_LFTMS_RULE__ACCT_CATEGORY__LOV_AC_CATEGORY":["BLK_LFTMS_RULE__ACCT_CATEGORY~","","N",""],"BLK_LFTMS_RULE__CUST_GROUP__LOV_CUST_GROUP":["BLK_LFTMS_RULE__CUST_GROUP~","BLK_LFTMS_RULE__TYPE!CHAR","N",""],"BLK_LFTMS_RULE__RATE_CODE__LOV_RATE_CODE":["BLK_LFTMS_RULE__RATE_CODE~","","N",""],"BLK_LFTMS_RULE__BASIS_AMOUNT_CCY__LOV_CCY_MAINT":["BLK_LFTMS_RULE__BASIS_AMOUNT_CCY~~","","N~N",""],"BLK_LFTMS_RULE__FLAT_AMOUNT_CURRENCY__LOV_CCY_MAINT":["BLK_LFTMS_RULE__FLAT_AMOUNT_CURRENCY~~","","N~N",""],"BLK_LFTMS_RULE__CUSTOMER__LOV_CUSTOMER":["BLK_LFTMS_RULE__CUSTOMER~~","","N~N",""],"BLK_LFTMS_RULE__CURRENCY__LOV_CCY":["~~","","N~N",""],"BLK_LFTMS_RULE__RULE__LOV_RULEID":["BLK_LFTMS_RULE__RULE~BLK_LFTMS_RULE__DESCRIPTION~BLK_LFTMS_RULE__TYPE~","","N~N~N",""]};
var offlineLovInfoFlds = {};
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR TABS *****
//----------------------------------------------------------------------------------------------------------------------
var strHeaderTabId = 'TAB_HEADER';
var strFooterTabId = 'TAB_FOOTER';
var strCurrentTabId = 'TAB_RATE_DETAILS';
//--------------------------------------------
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------
var multipleEntryIDs = new Array("BLK_LFTMS_BRACKET_TENOR","BLK_LFTMS_BRACKET");
var multipleEntryArray = new Array();
var multipleEntryCells = new Array();
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY VIEW SINGLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR ATTACHED CALLFORMS *****
 //----------------------------------------------------------------------------------------------------------------------

 var CallFormArray= new Array("CSCFNUDF~BLK_LFTMS_RULE"); 

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

ArrFuncOrigin["LFDRUMNT"]="KERNEL";
ArrPrntFunc["LFDRUMNT"]="";
ArrPrntOrigin["LFDRUMNT"]="";
ArrRoutingType["LFDRUMNT"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LFDRUMNT"]="N";
ArrCustomModified["LFDRUMNT"]="N";

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
var actStageArry = {"QUERY":"2","NEW":"2","MODIFY":"2","AUTHORIZE":"1","DELETE":"1","CLOSE":"1","REOPEN":"1","REVERSE":"1","ROLLOVER":"1","CONFIRM":"1","LIQUIDATE":"1","SUMMARYQUERY":"2"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------