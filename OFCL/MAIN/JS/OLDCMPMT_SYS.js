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
**  File Name          : OLDCMPMT_SYS.js
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
var fieldNameArray = {"BLK_LFTM_COMP_RATE_CODE_MASTER":"BORROWLENDIND~COMPRATECODEDESC~BRANCHCODE~CCY~COMPRATECODE~COMPRATEFUNCTION~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH","BLK_LFTM_COMP_RATE_CODE_DETAIL":"RATECODE~ADDLRATE~ADDLRATEINDICATOR"};

var multipleEntryPageSize = {"BLK_LFTM_COMP_RATE_CODE_DETAIL" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_LFTM_COMP_RATE_CODE_DETAIL"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_LFTM_COMP_RATE_CODE_MASTER">BORROWLENDIND~COMPRATECODEDESC~BRANCHCODE~CCY~COMPRATECODE~COMPRATEFUNCTION~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
msgxml += '      <FN PARENT="BLK_LFTM_COMP_RATE_CODE_MASTER" RELATION_TYPE="N" TYPE="BLK_LFTM_COMP_RATE_CODE_DETAIL">RATECODE~ADDLRATE~ADDLRATEINDICATOR</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_LFTM_COMP_RATE_CODE_MASTER">AUTHSTAT~TXNSTAT~COMPRATECODE~COMPRATECODEDESC~CCY~BRANCHCODE~COMPRATEFUNCTION~BORROWLENDIND</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "OLDCMPMT";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_LFTM_COMP_RATE_CODE_MASTER";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_LFTM_COMP_RATE_CODE_MASTER" : "","BLK_LFTM_COMP_RATE_CODE_DETAIL" : "BLK_LFTM_COMP_RATE_CODE_MASTER~N"}; 

 var dataSrcLocationArray = new Array("BLK_LFTM_COMP_RATE_CODE_MASTER","BLK_LFTM_COMP_RATE_CODE_DETAIL"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLDCMPMT.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLDCMPMT.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_LFTM_COMP_RATE_CODE_MASTER__COMPRATECODE";
pkFields[0] = "BLK_LFTM_COMP_RATE_CODE_MASTER__COMPRATECODE";
queryFields[1] = "BLK_LFTM_COMP_RATE_CODE_MASTER__CCY";
pkFields[1] = "BLK_LFTM_COMP_RATE_CODE_MASTER__CCY";
queryFields[2] = "BLK_LFTM_COMP_RATE_CODE_MASTER__BRANCHCODE";
pkFields[2] = "BLK_LFTM_COMP_RATE_CODE_MASTER__BRANCHCODE";
queryFields[3] = "BLK_LFTM_COMP_RATE_CODE_MASTER__BORROWLENDIND";
pkFields[3] = "BLK_LFTM_COMP_RATE_CODE_MASTER__BORROWLENDIND";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_LFTM_COMP_RATE_CODE_DETAIL":["ADDLRATE","ADDLRATEINDICATOR"],"BLK_LFTM_COMP_RATE_CODE_MASTER":["COMPRATECODEDESC"]};
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
var lovInfoFlds = {"BLK_LFTM_COMP_RATE_CODE_MASTER__CCY__LOV_CCY":["BLK_LFTM_COMP_RATE_CODE_MASTER__CCY~~","","N~N",""],"BLK_LFTM_COMP_RATE_CODE_MASTER__COMPRATECODE__LOV_CMP_RATE_CODE":["BLK_LFTM_COMP_RATE_CODE_MASTER__COMPRATECODE~BLK_LFTM_COMP_RATE_CODE_MASTER__COMPRATECODEDESC~","","N~N",""],"BLK_LFTM_COMP_RATE_CODE_DETAIL__RATECODE__LOV_RATE_CODE":["BLK_LFTM_COMP_RATE_CODE_DETAIL__RATECODE~","BLK_CFTM_COMP_RATE_CODE_MASTER__CCY!","N",""]};
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
var multipleEntryIDs = new Array("BLK_LFTM_COMP_RATE_CODE_DETAIL");
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

ArrFuncOrigin["OLDCMPMT"]="KERNEL";
ArrPrntFunc["OLDCMPMT"]="";
ArrPrntOrigin["OLDCMPMT"]="";
ArrRoutingType["OLDCMPMT"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLDCMPMT"]="N";
ArrCustomModified["OLDCMPMT"]="N";

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