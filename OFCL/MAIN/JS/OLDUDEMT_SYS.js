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
**  File Name          : OLDUDEMT_SYS.js
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
var fieldNameArray = {"BLK_EVENT":"ACCT_ENTRY_DEFN~ADVICES_DEFN~ALLOW_APPLICATION_OF_CHARGE~ALLOW_APPLICATION_OF_TRAN_TAX~ALLOW_ASSOCIATION_OF_CHARGE~ALLOW_ASSOCIATION_OF_INTEREST~ALLOW_ASSOCIATION_OF_ISSR_TAX~ALLOW_ASSOCIATION_OF_TRAN_TAX~ALLOW_LIQUIDATION_OF_CHARGE~ALLOW_LIQUIDATION_OF_TRAN_TAX~CHARGE_ALLOWED~COMMISSION_ALLOWED~EVENT_CODE~EVENT_DESCR~INTEREST_ALLOWED~MODULE~OCCURRENCE_ONCE_IN_A_LIFETIME~PROPAGATION_REQD~RATE_ASSIGN_REQD~RELEASE_REQD~SYS_INITIATED~TAX_ALLOWED~USER_DEFINED~USER_INITIATED~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH","BLK_EVENT_TRIGGER":"DRV_VALUE_DT_RULE~EVENT_CODE~EVENT_PROCESS~EVENT_PS_RULE_TYPE~EVENT_TRIGGER~MODULE_CODE~VALUE_DT_RULE_TYPE~VAL_RULE","BLK_EVENT_ERROR":"EVENT_CODE~MODULE_CODE~SUBSYSTEMSTAT~TXT_ERROR_EVNT~TXT_ERROR_VAL","BLK_EVNT_PROCESS":"EVENT_CODE~MODULE_CODE~SUBSYSTEMSTAT~TXT_ERROR_EVNT~TXT_ERROR_VAL"};

var multipleEntryPageSize = {};

var multipleEntrySVBlocks = "";

var tabMEBlks = {};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_EVENT">ACCT_ENTRY_DEFN~ADVICES_DEFN~ALLOW_APPLICATION_OF_CHARGE~ALLOW_APPLICATION_OF_TRAN_TAX~ALLOW_ASSOCIATION_OF_CHARGE~ALLOW_ASSOCIATION_OF_INTEREST~ALLOW_ASSOCIATION_OF_ISSR_TAX~ALLOW_ASSOCIATION_OF_TRAN_TAX~ALLOW_LIQUIDATION_OF_CHARGE~ALLOW_LIQUIDATION_OF_TRAN_TAX~CHARGE_ALLOWED~COMMISSION_ALLOWED~EVENT_CODE~EVENT_DESCR~INTEREST_ALLOWED~MODULE~OCCURRENCE_ONCE_IN_A_LIFETIME~PROPAGATION_REQD~RATE_ASSIGN_REQD~RELEASE_REQD~SYS_INITIATED~TAX_ALLOWED~USER_DEFINED~USER_INITIATED~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
msgxml += '      <FN PARENT="BLK_EVENT" RELATION_TYPE="1" TYPE="BLK_EVENT_TRIGGER">DRV_VALUE_DT_RULE~EVENT_CODE~EVENT_PROCESS~EVENT_PS_RULE_TYPE~EVENT_TRIGGER~MODULE_CODE~VALUE_DT_RULE_TYPE~VAL_RULE</FN>'; 
msgxml += '      <FN PARENT="BLK_EVENT_TRIGGER" RELATION_TYPE="1" TYPE="BLK_EVENT_ERROR">EVENT_CODE~MODULE_CODE~SUBSYSTEMSTAT~TXT_ERROR_EVNT~TXT_ERROR_VAL</FN>'; 
msgxml += '      <FN PARENT="BLK_EVENT_TRIGGER" RELATION_TYPE="1" TYPE="BLK_EVNT_PROCESS">EVENT_CODE~MODULE_CODE~SUBSYSTEMSTAT~TXT_ERROR_EVNT~TXT_ERROR_VAL</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_UDE";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** FCJ XML FOR SUMMARY SCREEN *****
//----------------------------------------------------------------------------------------------------------------------
var msgxml_sum=""; 
msgxml_sum += '    <FLD>'; 
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_EVENT">AUTHSTAT~TXNSTAT~MODULE~EVENT_CODE~EVENT_DESCR</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "OLDUDEMT";
var defaultWhereClause = "user_defined = 'Y'";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_EVENT";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_EVENT" : "","BLK_EVENT_TRIGGER" : "BLK_EVENT~1","BLK_EVENT_ERROR" : "BLK_EVENT_TRIGGER~1","BLK_EVNT_PROCESS" : "BLK_EVENT_TRIGGER~1"}; 

 var dataSrcLocationArray = new Array("BLK_EVENT","BLK_EVENT_TRIGGER","BLK_EVENT_ERROR","BLK_EVNT_PROCESS"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLDUDEMT.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLDUDEMT.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_EVENT__MODULE";
pkFields[0] = "BLK_EVENT__MODULE";
queryFields[1] = "BLK_EVENT__EVENT_CODE";
pkFields[1] = "BLK_EVENT__EVENT_CODE";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_EVENT_TRIGGER":["DRV_VALUE_DT_RULE","EVENT_PROCESS","EVENT_PS_RULE_TYPE","EVENT_TRIGGER","VALUE_DT_RULE_TYPE","VAL_RULE"],"BLK_EVENT":["ACCT_ENTRY_DEFN","ADVICES_DEFN","ALLOW_APPLICATION_OF_CHARGE","ALLOW_APPLICATION_OF_TRAN_TAX","ALLOW_ASSOCIATION_OF_CHARGE","ALLOW_ASSOCIATION_OF_INTEREST","ALLOW_ASSOCIATION_OF_ISSR_TAX","ALLOW_ASSOCIATION_OF_TRAN_TAX","ALLOW_LIQUIDATION_OF_CHARGE","ALLOW_LIQUIDATION_OF_TRAN_TAX"]};
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
var lovInfoFlds = {"BLK_EVENT__MODULE__LOV_MODULE":["BLK_EVENT__MODULE~~","","N~N",""]};
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
var multipleEntryIDs = new Array();
var multipleEntryArray = new Array();
var multipleEntryCells = new Array();
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY VIEW SINGLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR ATTACHED CALLFORMS *****
 //----------------------------------------------------------------------------------------------------------------------

 var CallFormArray= new Array("CSCFNUDF~BLK_EVENT"); 

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

ArrFuncOrigin["OLDUDEMT"]="KERNEL";
ArrPrntFunc["OLDUDEMT"]="";
ArrPrntOrigin["OLDUDEMT"]="";
ArrRoutingType["OLDUDEMT"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLDUDEMT"]="N";
ArrCustomModified["OLDUDEMT"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_DEFAULT":"MODULE~EVENT_CODE","CVS_VALUE_DT_DERIV":"MODULE_CODE~EVENT_CODE","CVS_EVENT_PROCESS":"MODULE_CODE~EVENT_CODE","CSCFNUDF":""};
var scrArgSource = {"CVS_DEFAULT":"BLK_EVENT__MODULE~BLK_EVENT__EVENT_CODE","CVS_VALUE_DT_DERIV":"BLK_EVENT_TRIGGER__MODULE_CODE~BLK_EVENT_TRIGGER__EVENT_CODE","CVS_EVENT_PROCESS":"BLK_EVENT_TRIGGER__MODULE_CODE~BLK_EVENT_TRIGGER__EVENT_CODE","CSCFNUDF":""};
var scrArgVals = {"CVS_DEFAULT":"~","CVS_VALUE_DT_DERIV":"~","CVS_EVENT_PROCESS":"~","CSCFNUDF":""};
var scrArgDest = {"CVS_DEFAULT":"BLK_EVENT_TRIGGER__MODULE_CODE~BLK_EVENT_TRIGGER__EVENT_CODE","CVS_VALUE_DT_DERIV":"BLK_EVENT_ERROR__MODULE_CODE~BLK_EVENT_ERROR__EVENT_CODE","CVS_EVENT_PROCESS":"BLK_EVNT_PROCESS__MODULE_CODE~BLK_EVNT_PROCESS__EVENT_CODE"};
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
var actStageArry = {"QUERY":"2","NEW":"2","MODIFY":"2","AUTHORIZE":"2","DELETE":"2","CLOSE":"2","REOPEN":"2","REVERSE":"1","ROLLOVER":"1","CONFIRM":"1","LIQUIDATE":"1","SUMMARYQUERY":"2"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------