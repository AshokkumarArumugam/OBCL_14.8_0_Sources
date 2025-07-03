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
**  File Name          : STDCRLIB_SYS.js
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
var fieldNameArray = {"BLK_LIABILITY":"ID~LIAB_NO~LIAB_NAME~LIAB_BRANCH~LIAB_CCY~CREDIT_RATING~REVISION_DATE~OVERALL_LIMIT~MAIN_LIAB_ID~SOURCE_SYSTEM~HOST_CODE~SOURCE_SYSTEM_LIAB_NO~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH","BLK_LIAB_ALLOWED_CUST":"ID~LIAB_ID~CUSTOMER_NO~DEFAULT_LIAB~CUSTOMER_NAME1"};

var multipleEntryPageSize = {"BLK_LIAB_ALLOWED_CUST" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_LIAB_ALLOWED_CUSTOMER__TAB_MAIN":"BLK_LIAB_ALLOWED_CUST"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_LIABILITY">ID~LIAB_NO~LIAB_NAME~LIAB_BRANCH~LIAB_CCY~CREDIT_RATING~REVISION_DATE~OVERALL_LIMIT~MAIN_LIAB_ID~SOURCE_SYSTEM~HOST_CODE~SOURCE_SYSTEM_LIAB_NO~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
msgxml += '      <FN PARENT="BLK_LIABILITY" RELATION_TYPE="N" TYPE="BLK_LIAB_ALLOWED_CUST">ID~LIAB_ID~CUSTOMER_NO~DEFAULT_LIAB~CUSTOMER_NAME1</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_LIABILITY">AUTHSTAT~TXNSTAT~ID~LIAB_NO~LIAB_NAME~LIAB_BRANCH~LIAB_CCY~CREDIT_RATING~REVISION_DATE~OVERALL_LIMIT~MAIN_LIAB_ID~HOST_CODE~SOURCE_SYSTEM</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "STDCRLIB";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_LIABILITY";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_LIABILITY" : "","BLK_LIAB_ALLOWED_CUST" : "BLK_LIABILITY~N"}; 

 var dataSrcLocationArray = new Array("BLK_LIABILITY","BLK_LIAB_ALLOWED_CUST"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside STDCRLIB.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside STDCRLIB.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_LIABILITY__ID";
pkFields[0] = "BLK_LIABILITY__ID";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_LIABILITY":["BTN_UDF","CREDIT_RATING","HOST_CODE","LIAB_BRANCH","LIAB_CCY","LIAB_NAME","LIAB_NO","MAIN_LIAB_ID","OVERALL_LIMIT","REVISION_DATEI","SOURCE_SYSTEM","SOURCE_SYSTEM_LIAB_NO"],"BLK_LIAB_ALLOWED_CUST":["CUSTOMER_NAME1","CUSTOMER_NO","DEFAULT_LIAB","ID","LIAB_ID"]};
var closeAmendArr = new Array(); 
var reopenAmendArr = new Array(); 
var reverseAmendArr = new Array(); 
var deleteAmendArr = new Array(); 
var rolloverAmendArr = new Array(); 
var confirmAmendArr = new Array(); 
var liquidateAmendArr = new Array(); 
//***** Fields Amendable while Query *****
var queryAmendArr = {"BLK_LIABILITY":["LIAB_NO"]};
var authorizeAmendArr = new Array(); 
//----------------------------------------------------------------------------------------------------------------------

var subsysArr    = new Array(); 

//----------------------------------------------------------------------------------------------------------------------

//***** CODE FOR LOVs *****
//----------------------------------------------------------------------------------------------------------------------
var lovInfoFlds = {"BLK_LIABILITY__LIAB_BRANCH__LOV_BRANCH":["BLK_LIABILITY__LIAB_BRANCH~","","N",""],"BLK_LIABILITY__LIAB_CCY__LOV_CURRENCY":["BLK_LIABILITY__LIAB_CCY~~","","N~N",""],"BLK_LIABILITY__SOURCE_SYSTEM__LOV_SOURCE_SYSTEM":["BLK_LIABILITY__SOURCE_SYSTEM~","","N",""],"BLK_LIABILITY__HOST_CODE__LOV_HOSTCODE":["BLK_LIABILITY__HOST_CODE~","","N",""]};
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
var multipleEntryIDs = new Array("BLK_LIAB_ALLOWED_CUST");
var multipleEntryArray = new Array();
var multipleEntryCells = new Array();
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY VIEW SINGLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR ATTACHED CALLFORMS *****
 //----------------------------------------------------------------------------------------------------------------------

 var CallFormArray= new Array("CSCFNUDF~BLK_LIABILITY"); 

 var CallFormRelat=new Array(""); 

 var CallRelatType= new Array("1"); 


 var ArrFuncOrigin=new Array();
 var ArrPrntFunc=new Array();
 var ArrPrntOrigin=new Array();
 var ArrRoutingType=new Array();


 // Code for Loading Cluster/Custom js File Starts
 var ArrClusterModified=new Array();
 var ArrCustomModified=new Array();
 // Code for Loading Cluster/Custom js File ends

ArrFuncOrigin["STDCRLIB"]="KERNEL";
ArrPrntFunc["STDCRLIB"]="";
ArrPrntOrigin["STDCRLIB"]="";
ArrRoutingType["STDCRLIB"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["STDCRLIB"]="N";
ArrCustomModified["STDCRLIB"]="N";

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