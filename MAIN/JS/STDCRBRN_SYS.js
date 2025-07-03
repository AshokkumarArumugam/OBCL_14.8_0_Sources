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
**  File Name          : STDCRBRN_SYS.js
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
var fieldNameArray = {"BLK_CORE_BRANCH":"BRANCH_CODE~HOST_CODE~COUNTRY_CODE~BRANCH_NAME~BRANCH_ADDR1~BRANCH_ADDR2~BRANCH_ADDR3~BRANCH_LCY~WALKIN_CUSTOMER~WEEK_HOL1~WEEK_HOL2~AUTO_AUTH~HOST_NAME~REPORT_DSN~SOURCE_SYSTEM~SOURCE_BRANCH_CODE~HOEXRATE~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH","BLK_CORE_SWIFT_ADDR":"DEFAULT_BIC~SWIFT_ADDRESS~BRANCH_CODE"};

var multipleEntryPageSize = {"BLK_CORE_SWIFT_ADDR" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_SWIFT_ADD__TAB_MAIN":"BLK_CORE_SWIFT_ADDR"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_CORE_BRANCH">BRANCH_CODE~HOST_CODE~COUNTRY_CODE~BRANCH_NAME~BRANCH_ADDR1~BRANCH_ADDR2~BRANCH_ADDR3~BRANCH_LCY~WALKIN_CUSTOMER~WEEK_HOL1~WEEK_HOL2~AUTO_AUTH~HOST_NAME~REPORT_DSN~SOURCE_SYSTEM~SOURCE_BRANCH_CODE~HOEXRATE~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
msgxml += '      <FN PARENT="BLK_CORE_BRANCH" RELATION_TYPE="N" TYPE="BLK_CORE_SWIFT_ADDR">DEFAULT_BIC~SWIFT_ADDRESS~BRANCH_CODE</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_CORE_BRANCH">AUTHSTAT~TXNSTAT~BRANCH_CODE~HOST_CODE~COUNTRY_CODE~BRANCH_NAME~BRANCH_ADDR1~BRANCH_ADDR2~BRANCH_ADDR3~BRANCH_LCY~WALKIN_CUSTOMER~WEEK_HOL1~WEEK_HOL2~SOURCE_SYSTEM</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "STDCRBRN";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_CORE_BRANCH";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_CORE_BRANCH" : "","BLK_CORE_SWIFT_ADDR" : "BLK_CORE_BRANCH~N"}; 

 var dataSrcLocationArray = new Array("BLK_CORE_BRANCH","BLK_CORE_SWIFT_ADDR"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside STDCRBRN.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside STDCRBRN.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_CORE_BRANCH__BRANCH_CODE";
pkFields[0] = "BLK_CORE_BRANCH__BRANCH_CODE";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_CORE_BRANCH":["AUTO_AUTH","BRANCH_ADDR1","BRANCH_ADDR2","BRANCH_ADDR3","BRANCH_NAME","HOEXRATE","REPORT_DSN","SOURCE_BRANCH_CODE","SOURCE_SYSTEM","WALKIN_CUSTOMER","WEEK_HOL1","WEEK_HOL2"],"BLK_CORE_SWIFT_ADDR":["DEFAULT_BIC","SWIFT_ADDRESS"]};
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
var lovInfoFlds = {"BLK_CORE_BRANCH__HOST_CODE__LOV_HOSTCODE":["BLK_CORE_BRANCH__HOST_CODE~~BLK_CORE_BRANCH__COUNTRY_CODE~","","N~N~N",""],"BLK_CORE_BRANCH__BRANCH_LCY__LOV_BRANCH_LCY":["BLK_CORE_BRANCH__BRANCH_LCY~~","BLK_CORE_BRANCH__COUNTRY_CODE!VARCHAR2","N~N",""],"BLK_CORE_BRANCH__WALKIN_CUSTOMER__LOV_WALKIN_CUST":["BLK_CORE_BRANCH__WALKIN_CUSTOMER~~~","","N~N~N",""],"BLK_CORE_BRANCH__SOURCE_SYSTEM__LOV_SOURCE_SYSTEM":["BLK_CORE_BRANCH__SOURCE_SYSTEM~","","N",""],"BLK_CORE_SWIFT_ADDR__SWIFT_ADDRESS__LOV_BIC_CODE":["BLK_CORE_SWIFT_ADDR__SWIFT_ADDRESS~~","","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_CORE_SWIFT_ADDR");
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

ArrFuncOrigin["STDCRBRN"]="KERNEL";
ArrPrntFunc["STDCRBRN"]="";
ArrPrntOrigin["STDCRBRN"]="";
ArrRoutingType["STDCRBRN"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["STDCRBRN"]="N";
ArrCustomModified["STDCRBRN"]="N";

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