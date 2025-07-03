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
**  File Name          : LFDAMTRT_SYS.js
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
var fieldNameArray = {"BLK_AMT_RATES_MASTER":"BRANCHCODE~RATECODE~CURRENCYCODE~BRANCHDESC~RATEDESC~CCYDESC~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH","BLK_AMT_RATES_EFFDT":"EFFECTIVEDATE","BLK_AMT_RATE_DETAIL":"AMOUNT~CURRENCYCODE~SPREAD"};

var multipleEntryPageSize = {"BLK_AMT_RATES_EFFDT" :"15" ,"BLK_AMT_RATE_DETAIL" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_AMT_RATES_EFFDT~BLK_AMT_RATE_DETAIL"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_AMT_RATES_MASTER">BRANCHCODE~RATECODE~CURRENCYCODE~BRANCHDESC~RATEDESC~CCYDESC~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
msgxml += '      <FN PARENT="BLK_AMT_RATES_MASTER" RELATION_TYPE="N" TYPE="BLK_AMT_RATES_EFFDT">EFFECTIVEDATE</FN>'; 
msgxml += '      <FN PARENT="BLK_AMT_RATES_EFFDT" RELATION_TYPE="N" TYPE="BLK_AMT_RATE_DETAIL">AMOUNT~CURRENCYCODE~SPREAD</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_AMT_RATES_MASTER">AUTHSTAT~TXNSTAT~BRANCHCODE~RATECODE~CURRENCYCODE</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "LFDAMTRT";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_AMT_RATES_MASTER";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_AMT_RATES_MASTER" : "","BLK_AMT_RATES_EFFDT" : "BLK_AMT_RATES_MASTER~N","BLK_AMT_RATE_DETAIL" : "BLK_AMT_RATES_EFFDT~N"}; 

 var dataSrcLocationArray = new Array("BLK_AMT_RATES_MASTER","BLK_AMT_RATES_EFFDT","BLK_AMT_RATE_DETAIL"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LFDAMTRT.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LFDAMTRT.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_AMT_RATES_MASTER__BRANCHCODE";
pkFields[0] = "BLK_AMT_RATES_MASTER__BRANCHCODE";
queryFields[1] = "BLK_AMT_RATES_MASTER__RATECODE";
pkFields[1] = "BLK_AMT_RATES_MASTER__RATECODE";
queryFields[2] = "BLK_AMT_RATES_MASTER__CURRENCYCODE";
pkFields[2] = "BLK_AMT_RATES_MASTER__CURRENCYCODE";
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
var lovInfoFlds = {"BLK_AMT_RATES_MASTER__BRANCHCODE__LOV_BRANCH_CODE":["BLK_AMT_RATES_MASTER__BRANCHCODE~BLK_AMT_RATES_MASTER__BRANCHDESC~","","N~N",""],"BLK_AMT_RATES_MASTER__RATECODE__LOV_RATE_CODE":["BLK_AMT_RATES_MASTER__RATECODE~BLK_AMT_RATES_MASTER__RATEDESC~","","N~N",""],"BLK_AMT_RATES_MASTER__CURRENCYCODE__LOV_CCY_CODE":["BLK_AMT_RATES_MASTER__CURRENCYCODE~BLK_AMT_RATES_MASTER__CCYDESC~","BLK_AMT_RATES_MASTER__RATECODE!VARCHAR2~BLK_AMT_RATES_MASTER__BRANCHCODE!VARCHAR2","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_AMT_RATES_EFFDT","BLK_AMT_RATE_DETAIL");
var multipleEntryArray = new Array();
var multipleEntryCells = new Array();
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY VIEW SINGLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR ATTACHED CALLFORMS *****
 //----------------------------------------------------------------------------------------------------------------------

 var CallFormArray= new Array("CSCFNUDF~BLK_AMT_RATES_MASTER"); 

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

ArrFuncOrigin["LFDAMTRT"]="KERNEL";
ArrPrntFunc["LFDAMTRT"]="";
ArrPrntOrigin["LFDAMTRT"]="";
ArrRoutingType["LFDAMTRT"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LFDAMTRT"]="N";
ArrCustomModified["LFDAMTRT"]="N";

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
var actStageArry = {};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------