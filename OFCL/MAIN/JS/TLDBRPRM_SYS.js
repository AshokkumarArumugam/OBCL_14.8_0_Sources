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
**  File Name          : TLDBRPRM_SYS.js
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
var fieldNameArray = {"BLK_TLTMS_BRANCH_PARAM":"BRANCHCODE~TRDLVLSETACKTOLQT~TKTSETTLEMENTREQD~PROCESSTILL~FORWARDPROCARCHDAYS~FORWARDPROCREQD~PMTMSG~TKTTRADESTLMNTALLOWED~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH","BLK_TLTMS_CCY_BRN_ACCOUNTS":"CCY~BRANCH~CUSTACNO~CUSTACBRANCH~DEPARTMENT"};

var multipleEntryPageSize = {"BLK_TLTMS_CCY_BRN_ACCOUNTS" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_CCY_BRN_ACCOUNTS__TAB_MAIN":"BLK_TLTMS_CCY_BRN_ACCOUNTS"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_TLTMS_BRANCH_PARAM">BRANCHCODE~TRDLVLSETACKTOLQT~TKTSETTLEMENTREQD~PROCESSTILL~FORWARDPROCARCHDAYS~FORWARDPROCREQD~PMTMSG~TKTTRADESTLMNTALLOWED~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
msgxml += '      <FN PARENT="BLK_TLTMS_BRANCH_PARAM" RELATION_TYPE="N" TYPE="BLK_TLTMS_CCY_BRN_ACCOUNTS">CCY~BRANCH~CUSTACNO~CUSTACBRANCH~DEPARTMENT</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_TLTMS_BRANCH_PARAM">AUTHSTAT~TXNSTAT~BRANCHCODE</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "TLDBRPRM";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_TLTMS_BRANCH_PARAM";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_TLTMS_BRANCH_PARAM" : "","BLK_TLTMS_CCY_BRN_ACCOUNTS" : "BLK_TLTMS_BRANCH_PARAM~N"}; 

 var dataSrcLocationArray = new Array("BLK_TLTMS_BRANCH_PARAM","BLK_TLTMS_CCY_BRN_ACCOUNTS"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside TLDBRPRM.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside TLDBRPRM.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_TLTMS_BRANCH_PARAM__BRANCHCODE";
pkFields[0] = "BLK_TLTMS_BRANCH_PARAM__BRANCHCODE";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_TLTMS_BRANCH_PARAM":["FORWARDPROCARCHDAYS","FORWARDPROCREQD","PMTMSG","PROCESSTILL","TKTTRADESTLMNTALLOWED","TRDLVLSETACKTOLQT"],"BLK_TLTMS_CCY_BRN_ACCOUNTS":["BRANCH","CCY","CUSTACBRANCH","CUSTACNO","DEPARTMENT"]};
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
var lovInfoFlds = {"BLK_TLTMS_BRANCH_PARAM__BRANCHCODE__LOV_BRANCH_CODE":["BLK_TLTMS_BRANCH_PARAM__BRANCHCODE~BLK_TLTMS_BRANCH_PARAM__TXT_BRANCH_DESCRIPTION~","","N~N",""],"BLK_TLTMS_CCY_BRN_ACCOUNTS__CCY__LOV_CCY_LIST":["BLK_TLTMS_CCY_BRN_ACCOUNTS__CCY~~","","N~N",""],"BLK_TLTMS_CCY_BRN_ACCOUNTS__BRANCH__LOV_BRANCH_CODE":["BLK_TLTMS_CCY_BRN_ACCOUNTS__BRANCH~~","","N~N",""],"BLK_TLTMS_CCY_BRN_ACCOUNTS__CUSTACNO__LOV_CUST_ACC":["BLK_TLTMS_CCY_BRN_ACCOUNTS__CUSTACNO~BLK_TLTMS_CCY_BRN_ACCOUNTS__CUSTACBRANCH~","","N~N",""],"BLK_TLTMS_CCY_BRN_ACCOUNTS__DEPARTMENT__LOV_DEPART":["BLK_TLTMS_CCY_BRN_ACCOUNTS__DEPARTMENT~~","","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_TLTMS_CCY_BRN_ACCOUNTS");
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

ArrFuncOrigin["TLDBRPRM"]="KERNEL";
ArrPrntFunc["TLDBRPRM"]="";
ArrPrntOrigin["TLDBRPRM"]="";
ArrRoutingType["TLDBRPRM"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["TLDBRPRM"]="N";
ArrCustomModified["TLDBRPRM"]="N";

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