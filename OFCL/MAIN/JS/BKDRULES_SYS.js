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
**  File Name          : BKDRULES_SYS.js
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
var fieldNameArray = {"BLK_BKTMS_RULE":"RATE~BOOKING_METHOD~ROUND_UNIT~ROUND_RULE~UNIT_VALUE~UNIT_BASED~RATE_TYPE~BOOKING_FREQUENCY~RULE_TYPE~AGGR_GROUP~THRESHOLD_AMT~APPLY_TENOR_DISCOUNT~TENOR_BASIS~TENOR_BASED~SLAB_BASIS~DEAL_CCY~DESCRIPTION~MAX_AMOUNT~MIN_AMOUNT~SLAB_CUMULATIVE~REF_CCY~METHOD~RULE~UNIT_CCY~CCY~CCYOPT~AGGRGROUPDESC~RATETYPEDESC~CCYDESC~REFCCYDESC~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH","BLK_BKTM_TENOR_SLAB":"DISCOUNT_RATE~TENOR_DAYS~RULE","BLK_BKTMS_RULE_SLAB":"FLOOR_BASIS_AMOUNT~FLOOR_CHARGE~MIN_RATE~BROK_AMT_RATE~BASIS_SLAB_FROM~BASIS_SLAB_TO~RULE"};

var multipleEntryPageSize = {"BLK_BKTMS_RULE_SLAB" :"15" ,"BLK_BKTM_TENOR_SLAB" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_BKTMS_RULE_SLAB","CVS_MAIN__TAB_TENOR":"BLK_BKTM_TENOR_SLAB"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_BKTMS_RULE">RATE~BOOKING_METHOD~ROUND_UNIT~ROUND_RULE~UNIT_VALUE~UNIT_BASED~RATE_TYPE~BOOKING_FREQUENCY~RULE_TYPE~AGGR_GROUP~THRESHOLD_AMT~APPLY_TENOR_DISCOUNT~TENOR_BASIS~TENOR_BASED~SLAB_BASIS~DEAL_CCY~DESCRIPTION~MAX_AMOUNT~MIN_AMOUNT~SLAB_CUMULATIVE~REF_CCY~METHOD~RULE~UNIT_CCY~CCY~CCYOPT~AGGRGROUPDESC~RATETYPEDESC~CCYDESC~REFCCYDESC~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
msgxml += '      <FN PARENT="BLK_BKTMS_RULE" RELATION_TYPE="N" TYPE="BLK_BKTM_TENOR_SLAB">DISCOUNT_RATE~TENOR_DAYS~RULE</FN>'; 
msgxml += '      <FN PARENT="BLK_BKTMS_RULE" RELATION_TYPE="N" TYPE="BLK_BKTMS_RULE_SLAB">FLOOR_BASIS_AMOUNT~FLOOR_CHARGE~MIN_RATE~BROK_AMT_RATE~BASIS_SLAB_FROM~BASIS_SLAB_TO~RULE</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_BKTMS_RULE">AUTHSTAT~TXNSTAT~RULE~DESCRIPTION~REF_CCY~METHOD</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "BKDRULES";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_BKTMS_RULE";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_BKTMS_RULE" : "","BLK_BKTM_TENOR_SLAB" : "BLK_BKTMS_RULE~N","BLK_BKTMS_RULE_SLAB" : "BLK_BKTMS_RULE~N"}; 

 var dataSrcLocationArray = new Array("BLK_BKTMS_RULE","BLK_BKTM_TENOR_SLAB","BLK_BKTMS_RULE_SLAB"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside BKDRULES.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside BKDRULES.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_BKTMS_RULE__RULE";
pkFields[0] = "BLK_BKTMS_RULE__RULE";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_BKTMS_RULE_SLAB":["BASIS_SLAB_FROM","BASIS_SLAB_TO","FLOOR_BASIS_AMOUNT","FLOOR_CHARGE","MIN_RATE"],"BLK_BKTMS_RULE":["AGGR_GROUP","CCYOPT","SLAB_BASIS"]};
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
var lovInfoFlds = {"BLK_BKTMS_RULE__RATE_TYPE__LOV_LOV_RATE_TYPE":["BLK_BKTMS_RULE__RATE_TYPE~BLK_BKTMS_RULE__RATETYPEDESC~","","N~N",""],"BLK_BKTMS_RULE__AGGR_GROUP__LOV_AGGR_GROUP":["BLK_BKTMS_RULE__AGGR_GROUP~BLK_BKTMS_RULE__AGGRGROUPDESC~","","N~N",""],"BLK_BKTMS_RULE__DEAL_CCY__LOV_DEAL_CCY":["BLK_BKTMS_RULE__DEAL_CCY~BLK_BKTMS_RULE__CCY~","","N~N",""],"BLK_BKTMS_RULE__REF_CCY__LOV_REF_CCY":["BLK_BKTMS_RULE__REF_CCY~BLK_BKTMS_RULE__RATETYPEDESC~","","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_BKTMS_RULE_SLAB","BLK_BKTM_TENOR_SLAB");
var multipleEntryArray = new Array();
var multipleEntryCells = new Array();
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY VIEW SINGLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR ATTACHED CALLFORMS *****
 //----------------------------------------------------------------------------------------------------------------------

 var CallFormArray= new Array("CSCFNUDF~BLK_BKTMS_RULE"); 

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

ArrFuncOrigin["BKDRULES"]="KERNEL";
ArrPrntFunc["BKDRULES"]="";
ArrPrntOrigin["BKDRULES"]="";
ArrRoutingType["BKDRULES"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["BKDRULES"]="N";
ArrCustomModified["BKDRULES"]="N";

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