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
**  File Name          : OLDMLMMG_SYS.js
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
var fieldNameArray = {"BLK_ML_NLP_MOD_MNG_MAS":"ID~USECASENAME~UNATTENDED~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH","BLK_ML_TRAIN_PERF_MAS":"ID~RUNREF~USECASENAME~PRECISION~RECALL~F1SCORE~MODELTYPE~CORPUSSIZE~ENTITYNUMTOT~ISOCOUNTRY~TRAINDT~TRAINTIMEMIN~MODID~MODRUNREF~MODUSECASENAME~ACTIVE","BLK_ML_TRAIN_PERF_HDR":"","BLK_ML_TRAIN_PERF_DET":"ID~RUNREF~ENTITYTAG~PRECISION~RECALL~ACCURACY~F1SCORE"};

var multipleEntryPageSize = {"BLK_ML_TRAIN_PERF_MAS" :"15" ,"BLK_ML_TRAIN_PERF_DET" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_ML_TRAIN_PERF_MAS","CVS_TAGS__TAB_MAIN":"BLK_ML_TRAIN_PERF_DET"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_ML_NLP_MOD_MNG_MAS">ID~USECASENAME~UNATTENDED~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
msgxml += '      <FN PARENT="BLK_ML_NLP_MOD_MNG_MAS" RELATION_TYPE="N" TYPE="BLK_ML_TRAIN_PERF_MAS">ID~RUNREF~USECASENAME~PRECISION~RECALL~F1SCORE~MODELTYPE~CORPUSSIZE~ENTITYNUMTOT~ISOCOUNTRY~TRAINDT~TRAINTIMEMIN~MODID~MODRUNREF~MODUSECASENAME~ACTIVE</FN>'; 
msgxml += '      <FN PARENT="BLK_ML_TRAIN_PERF_MAS" RELATION_TYPE="1" TYPE="BLK_ML_TRAIN_PERF_HDR"></FN>'; 
msgxml += '      <FN PARENT="BLK_ML_TRAIN_PERF_MAS" RELATION_TYPE="N" TYPE="BLK_ML_TRAIN_PERF_DET">ID~RUNREF~ENTITYTAG~PRECISION~RECALL~ACCURACY~F1SCORE</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_ML_NLP_MOD_MNG_MAS">AUTHSTAT~TXNSTAT~ID~USECASENAME~UNATTENDED</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "OLDMLMMG";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_ML_NLP_MOD_MNG_MAS";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_ML_NLP_MOD_MNG_MAS" : "","BLK_ML_TRAIN_PERF_MAS" : "BLK_ML_NLP_MOD_MNG_MAS~N","BLK_ML_TRAIN_PERF_HDR" : "BLK_ML_TRAIN_PERF_MAS~1","BLK_ML_TRAIN_PERF_DET" : "BLK_ML_TRAIN_PERF_MAS~N"}; 

 var dataSrcLocationArray = new Array("BLK_ML_NLP_MOD_MNG_MAS","BLK_ML_TRAIN_PERF_MAS","BLK_ML_TRAIN_PERF_HDR","BLK_ML_TRAIN_PERF_DET"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLDMLMMG.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLDMLMMG.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_ML_NLP_MOD_MNG_MAS__USECASENAME";
pkFields[0] = "BLK_ML_NLP_MOD_MNG_MAS__USECASENAME";
queryFields[1] = "BLK_ML_NLP_MOD_MNG_MAS__ID";
pkFields[1] = "BLK_ML_NLP_MOD_MNG_MAS__ID";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_ML_TRAIN_PERF_MAS":["ACTIVE"]};
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
var lovInfoFlds = {"BLK_ML_NLP_MOD_MNG_MAS__USECASENAME__LOV_USECASE":["BLK_ML_NLP_MOD_MNG_MAS__ID~BLK_ML_NLP_MOD_MNG_MAS__USECASENAME~BLK_ML_NLP_MOD_MNG_MAS__UNATTENDED~","","N~N~N",""]};
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
var multipleEntryIDs = new Array("BLK_ML_TRAIN_PERF_MAS","BLK_ML_TRAIN_PERF_DET");
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

ArrFuncOrigin["OLDMLMMG"]="KERNEL";
ArrPrntFunc["OLDMLMMG"]="";
ArrPrntOrigin["OLDMLMMG"]="";
ArrRoutingType["OLDMLMMG"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLDMLMMG"]="N";
ArrCustomModified["OLDMLMMG"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_TAGS":"USECASENAME~MODELTYPE~RUNREFERENCE"};
var scrArgSource = {"CVS_TAGS":"BLK_ML_NLP_MOD_MNG_MAS__USECASENAME~BLK_ML_TRAIN_PERF_MAS__MODELTYPE~BLK_ML_TRAIN_PERF_MAS__RUNREF"};
var scrArgVals = {"CVS_TAGS":"~~"};
var scrArgDest = {"CVS_TAGS":"BLK_ML_TRAIN_PERF_HDR__MODELNAME~BLK_ML_TRAIN_PERF_HDR__MODELTYPE~BLK_ML_TRAIN_PERF_HDR__RUNREFERENCE"};
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