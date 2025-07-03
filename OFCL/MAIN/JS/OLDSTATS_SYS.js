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
**  File Name          : OLDSTATS_SYS.js
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
var fieldNameArray = {"BLK_OLTMS_PRODUCT_STATUS_MASTER":"TRANSACTIONCD~STPACCRUALS~STATUSSEQ~STATUS~REVERSEACCRUALS~PRD~DERVTNRUL~AUTOREVERSE~AUTOFRWD~PRODDESC~TRANSDESC~CONTRAGL~CONTRAACCOUNTING~AUTOREVALBACKWARD~STOPACCRUALFEE~MEMOACCRUALS~FUTURESCHEDULES~PASTSCHEDULES~ADVERSESTATUS~CREDITACCN~DEACCN~LIQ_COMP_DATES_FLAG~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH","BLK_OLTMS_PRODUCT_STATUS_ADVICES":"STATUS~PRODUCT~MESSAGECODE~DESC","BLK_OLTMS_PRODUCT_STATUS_GL":"UPWARDTRANSFERFROMGL~TRANSFERGL~STATUS~PRODUCT~DOWNWARDTRANSFERTOGL~DOWNWARDTRANSFERFROMGL~ACCOUNTROLE~APPLYHISTORICRATE~REVERSALGL~GLAMTTFR~DESC~MAP_TYPE","BLK_OLTMS_PRODUCT_LIQ_ORDER":"PROD~PRODDES","BLK_OLTMS_PRODUCT_LIQ_ORDER_MULTI":"STATUS~GENMESSAGE~COMPAUTOLIQ~LIQORDER~COMPONENT~PRODUCT","BLK_STATUS_ROLE_MAP":"ACCOUNTING_ROLE~ACCOUNT_HEAD~COND~PRODUCT_CODE~RULE_NO~STATUS","BLK_CONDITION_BUILDER":""};

var multipleEntryPageSize = {"BLK_OLTMS_PRODUCT_STATUS_ADVICES" :"15" ,"BLK_OLTMS_PRODUCT_STATUS_GL" :"15" ,"BLK_OLTMS_PRODUCT_LIQ_ORDER" :"15" ,"BLK_OLTMS_PRODUCT_LIQ_ORDER_MULTI" :"15" ,"BLK_STATUS_ROLE_MAP" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_ADVICE__TAB_MAIN":"BLK_OLTMS_PRODUCT_STATUS_ADVICES","CVS_GLS__TAB_MAIN":"BLK_OLTMS_PRODUCT_STATUS_GL","CVS_PRODUCT_LIQ_ORDER__TAB_MAIN":"BLK_OLTMS_PRODUCT_LIQ_ORDER~BLK_OLTMS_PRODUCT_LIQ_ORDER_MULTI","CVS_STATUS_ROLE_MAP__TAB_MAIN":"BLK_STATUS_ROLE_MAP"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTMS_PRODUCT_STATUS_MASTER">TRANSACTIONCD~STPACCRUALS~STATUSSEQ~STATUS~REVERSEACCRUALS~PRD~DERVTNRUL~AUTOREVERSE~AUTOFRWD~PRODDESC~TRANSDESC~CONTRAGL~CONTRAACCOUNTING~AUTOREVALBACKWARD~STOPACCRUALFEE~MEMOACCRUALS~FUTURESCHEDULES~PASTSCHEDULES~ADVERSESTATUS~CREDITACCN~DEACCN~LIQ_COMP_DATES_FLAG~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTMS_PRODUCT_STATUS_MASTER" RELATION_TYPE="N" TYPE="BLK_OLTMS_PRODUCT_STATUS_ADVICES">STATUS~PRODUCT~MESSAGECODE~DESC</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTMS_PRODUCT_STATUS_MASTER" RELATION_TYPE="N" TYPE="BLK_OLTMS_PRODUCT_STATUS_GL">UPWARDTRANSFERFROMGL~TRANSFERGL~STATUS~PRODUCT~DOWNWARDTRANSFERTOGL~DOWNWARDTRANSFERFROMGL~ACCOUNTROLE~APPLYHISTORICRATE~REVERSALGL~GLAMTTFR~DESC~MAP_TYPE</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTMS_PRODUCT_STATUS_MASTER" RELATION_TYPE="1" TYPE="BLK_OLTMS_PRODUCT_LIQ_ORDER">PROD~PRODDES</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTMS_PRODUCT_STATUS_MASTER" RELATION_TYPE="N" TYPE="BLK_OLTMS_PRODUCT_LIQ_ORDER_MULTI">STATUS~GENMESSAGE~COMPAUTOLIQ~LIQORDER~COMPONENT~PRODUCT</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTMS_PRODUCT_STATUS_GL" RELATION_TYPE="N" TYPE="BLK_STATUS_ROLE_MAP">ACCOUNTING_ROLE~ACCOUNT_HEAD~COND~PRODUCT_CODE~RULE_NO~STATUS</FN>'; 
msgxml += '      <FN PARENT="BLK_STATUS_ROLE_MAP" RELATION_TYPE="1" TYPE="BLK_CONDITION_BUILDER"></FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_STATUS";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** FCJ XML FOR SUMMARY SCREEN *****
//----------------------------------------------------------------------------------------------------------------------
var msgxml_sum=""; 
msgxml_sum += '    <FLD>'; 
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTMS_PRODUCT_STATUS_MASTER">AUTHSTAT~TXNSTAT~PRD~STATUS</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "OLDSTATS";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_OLTMS_PRODUCT_STATUS_MASTER";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_OLTMS_PRODUCT_STATUS_MASTER" : "","BLK_OLTMS_PRODUCT_STATUS_ADVICES" : "BLK_OLTMS_PRODUCT_STATUS_MASTER~N","BLK_OLTMS_PRODUCT_STATUS_GL" : "BLK_OLTMS_PRODUCT_STATUS_MASTER~N","BLK_OLTMS_PRODUCT_LIQ_ORDER" : "BLK_OLTMS_PRODUCT_STATUS_MASTER~1","BLK_OLTMS_PRODUCT_LIQ_ORDER_MULTI" : "BLK_OLTMS_PRODUCT_STATUS_MASTER~N","BLK_STATUS_ROLE_MAP" : "BLK_OLTMS_PRODUCT_STATUS_GL~N","BLK_CONDITION_BUILDER" : "BLK_STATUS_ROLE_MAP~1"}; 

 var dataSrcLocationArray = new Array("BLK_OLTMS_PRODUCT_STATUS_MASTER","BLK_OLTMS_PRODUCT_STATUS_ADVICES","BLK_OLTMS_PRODUCT_STATUS_GL","BLK_OLTMS_PRODUCT_LIQ_ORDER","BLK_OLTMS_PRODUCT_LIQ_ORDER_MULTI","BLK_STATUS_ROLE_MAP","BLK_CONDITION_BUILDER"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLDSTATS.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLDSTATS.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_OLTMS_PRODUCT_STATUS_MASTER__PRD";
pkFields[0] = "BLK_OLTMS_PRODUCT_STATUS_MASTER__PRD";
queryFields[1] = "BLK_OLTMS_PRODUCT_STATUS_MASTER__STATUS";
pkFields[1] = "BLK_OLTMS_PRODUCT_STATUS_MASTER__STATUS";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_CONDITION_BUILDER":["BTN_ACCEPT","BTN_AND","BTN_CLR_COND","BTN_OR","CONDITIONS","FIELDS","MATHEMATICAL_OP","OPERATOR","VALUE"],"BLK_OLTMS_PRODUCT_LIQ_ORDER_MULTI":["COMPAUTOLIQ","COMPONENT","GENMESSAGE","LIQORDER"],"BLK_OLTMS_PRODUCT_STATUS_ADVICES":["MESSAGECODE"],"BLK_OLTMS_PRODUCT_STATUS_GL":["ACCOUNTROLE","APPLYHISTORICRATE","BTN_RULE","DESC","GLAMTTFR","REVERSALGL","TRANSFERGL"],"BLK_OLTMS_PRODUCT_STATUS_MASTER":["ADVERSESTATUS","AUTOFRWD","AUTOREVALBACKWARD","AUTOREVERSE","BTN_ADVICES","BTN_GLS","BTN_LIQ_ORDER","CONTRAACCOUNTING","CONTRAGL","CREDITACCN","DEACCN","DERVTNRUL","ELEMENTS","FUTURESCHEDULES","LIQ_COMP_DATES_FLAG","LOGICALOPERATORS","MEMOACCRUALS","OPERATORS","PASTSCHEDULES","REVERSEACCRUALS","STOPACCRUALFEE","STPACCRUALS","TRANSACTIONCD"],"BLK_STATUS_ROLE_MAP":["ACCOUNTING_ROLE","ACCOUNT_HEAD","BTN_CONDITION","COND","PRODUCT_CODE","RULE_NO","STATUS"]};
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
var lovInfoFlds = {"BLK_OLTMS_PRODUCT_STATUS_MASTER__TRANSACTIONCD__LOV_TRNCODE":["BLK_OLTMS_PRODUCT_STATUS_MASTER__TRANSACTIONCD~BLK_OLTMS_PRODUCT_STATUS_MASTER__TRANSDESC~","","N~N",""],"BLK_OLTMS_PRODUCT_STATUS_MASTER__STATUS__LOV_STATUS":["BLK_OLTMS_PRODUCT_STATUS_MASTER__STATUS~","BLK_CSTMS_PRODUCT_STATUS_MASTER__PRD!VARCHAR2","N",""],"BLK_OLTMS_PRODUCT_STATUS_MASTER__PRD__LOV_PROD":["BLK_OLTMS_PRODUCT_STATUS_MASTER__PRD~BLK_OLTMS_PRODUCT_STATUS_MASTER__PRODDESC~","","N~N",""],"BLK_OLTMS_PRODUCT_STATUS_MASTER__CONTRAGL__LOV_CONTRA_GL":["BLK_OLTMS_PRODUCT_STATUS_MASTER__CONTRAGL~~","","N~N",""],"BLK_OLTMS_PRODUCT_STATUS_ADVICES__MESSAGECODE__LOV_STATUS_ADVICE":["BLK_OLTMS_PRODUCT_STATUS_ADVICES__MESSAGECODE~BLK_OLTMS_PRODUCT_STATUS_ADVICES__DESC~","BLK_CSTMS_PRODUCT_STATUS_MASTER__PRD!VARCHAR2~BLK_CSTMS_PRODUCT_STATUS_MASTER__PRD!VARCHAR2~BLK_CSTMS_PRODUCT_STATUS_MASTER__STATUS!VARCHAR2~BLK_CSTMS_PRODUCT_STATUS_MASTER__PRD!VARCHAR2~BLK_CSTMS_PRODUCT_STATUS_MASTER__STATUS!VARCHAR2","N~N",""],"BLK_OLTMS_PRODUCT_STATUS_GL__TRANSFERGL__LOV_STATUS_ACC_HEAD":["BLK_OLTMS_PRODUCT_STATUS_GL__TRANSFERGL~BLK_OLTMS_PRODUCT_STATUS_GL__DESC~","","N~N",""],"BLK_OLTMS_PRODUCT_STATUS_GL__ACCOUNTROLE__LOV_STATUS_ACCROLE":["BLK_OLTMS_PRODUCT_STATUS_GL__ACCOUNTROLE~~BLK_OLTMS_PRODUCT_STATUS_GL__MAP_TYPE~","BLK_CSTMS_PRODUCT_STATUS_MASTER__PRD!VARCHAR2~BLK_CSTMS_PRODUCT_STATUS_MASTER__PRD!VARCHAR2~BLK_CSTMS_PRODUCT_STATUS_MASTER__STATUS!VARCHAR2","N~N~N",""],"BLK_OLTMS_PRODUCT_STATUS_GL__REVERSALGL__LOV_REV_GL_ACC_HEAD":["BLK_OLTMS_PRODUCT_STATUS_GL__REVERSALGL~~","","N~N",""],"BLK_OLTMS_PRODUCT_LIQ_ORDER_MULTI__COMPONENT__LOV_LIQ_COMPONENT":["BLK_OLTMS_PRODUCT_LIQ_ORDER_MULTI__COMPONENT~~~","BLK_CSTMS_PRODUCT_STATUS_MASTER__PRD!VARCHAR2~BLK_CSTMS_PRODUCT_STATUS_MASTER__PRD!VARCHAR2~BLK_CSTMS_PRODUCT_STATUS_MASTER__STATUS!VARCHAR2","N~N~N",""],"BLK_STATUS_ROLE_MAP__ACCOUNT_HEAD__LOV_STATUS_ACCHEAD":["BLK_STATUS_ROLE_MAP__ACCOUNT_HEAD~","","N",""],"BLK_CONDITION_BUILDER__FIELDS__LOV_FIELDS":["BLK_CONDITION_BUILDER__FIELDS~","BLK_CONDITION_BUILDER__PRODUCT!VARCHAR2","N","N"]};
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
var multipleEntryIDs = new Array("BLK_OLTMS_PRODUCT_STATUS_ADVICES","BLK_OLTMS_PRODUCT_STATUS_GL","BLK_OLTMS_PRODUCT_LIQ_ORDER_MULTI","BLK_STATUS_ROLE_MAP");
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

ArrFuncOrigin["OLDSTATS"]="KERNEL";
ArrPrntFunc["OLDSTATS"]="";
ArrPrntOrigin["OLDSTATS"]="";
ArrRoutingType["OLDSTATS"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLDSTATS"]="N";
ArrCustomModified["OLDSTATS"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_PRODUCT_LIQ_ORDER":"PRD~PRODDES","CVS_STATUS_ROLE_MAP":"productcode~accountrole~status","CVS_CONDITON_BUILDER":"productcode"};
var scrArgSource = {"CVS_PRODUCT_LIQ_ORDER":"BLK_OLTMS_PRODUCT_STATUS_MASTER__PRD~BLK_OLTMS_PRODUCT_STATUS_MASTER__PRODDESC","CVS_STATUS_ROLE_MAP":"BLK_OLTMS_PRODUCT_STATUS_GL__PRODUCT~BLK_OLTMS_PRODUCT_STATUS_GL__ACCOUNTROLE~BLK_OLTMS_PRODUCT_STATUS_GL__STATUS","CVS_CONDITON_BUILDER":"BLK_STATUS_ROLE_MAP__PRODUCT_CODE"};
var scrArgVals = {"CVS_PRODUCT_LIQ_ORDER":"~","CVS_STATUS_ROLE_MAP":"~~","CVS_CONDITON_BUILDER":""};
var scrArgDest = {"CVS_PRODUCT_LIQ_ORDER":"BLK_OLTMS_PRODUCT_LIQ_ORDER__PROD~BLK_OLTMS_PRODUCT_LIQ_ORDER__PRODDES","CVS_STATUS_ROLE_MAP":"BLK_STATUS_ROLE_MAP__PRODUCT_CODE~BLK_STATUS_ROLE_MAP__ACCOUNTING_ROLE~BLK_STATUS_ROLE_MAP__STATUS","CVS_CONDITON_BUILDER":"BLK_CONDITION_BUILDER__PRODUCT"};
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
var actStageArry = {"QUERY":"2","NEW":"2","MODIFY":"2","AUTHORIZE":"2","DELETE":"2","CLOSE":"2","REOPEN":"2","REVERSE":"1","ROLLOVER":"1","CONFIRM":"1","LIQUIDATE":"1","SUMMARYQUERY":"2"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------