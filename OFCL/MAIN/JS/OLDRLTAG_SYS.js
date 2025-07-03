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
**  File Name          : OLDRLTAG_SYS.js
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
var fieldNameArray = {"BLK_MODULES":"MODULE_DESC~MODULE_ID~AC_CLASS_APPLICABLE~ARC_APPLICABLE~CB_CLASS_APPLICABLE~CH_CLASS_APPLICABLE~CR_CLASS_APPLICABLE~DISC_ACCR_APPLICABLE~FA_BATCH_ENABLED~FA_ENABLED~INSTALLED~IN_CLASS_APPLICABLE~LICENSE~PURGE_AVAILABLE~RH_CLASS_APPLICABLE~TA_CLASS_APPLICABLE~USER_DEFINED_MODULE~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH","BLK_AMOUNTTAG":"ACCTENTRYDEFNALLOWED~AMOUNTTAG~AMOUNTTAGTYPE~CHARGEALLOWED~COMMISSIONALLOWED~DESCRIPTION~INTERESTALLOWED~ISSRTAXALLOWED~LANGUAGECODE~MODULE~TAXALLOWED~TRACKRECEIVABLES~TRANTAXALLOWED~USERDEFINED","BLK_AMOUNTTAG_DRV":"AMOUNTRULETYPE~AMOUNTTAG~CCYRULETYPE~DRVAMOUNTRULE~DRVCCYRULE~MODULECODE~CCYERRTXT~AMTERRTXT","BLK_ACCROLE":"ALLOWTRANSFERGL~MODULE~ROLECODE~ROLEDESCRIPTION~ROLETYPE~USERDEFINED","BLK_AMOUNT_TAG_DRV_TXT":"AMTERRTXT~CCYERRTXT~MODIDERRTXT"};

var multipleEntryPageSize = {"BLK_AMOUNTTAG" :"15" ,"BLK_ACCROLE" :"15" };

var multipleEntrySVBlocks = "BLK_AMOUNTTAG_DRV";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_AMOUNTTAG","CVS_MAIN__TAB_AMTROLE":"BLK_ACCROLE"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_MODULES">MODULE_DESC~MODULE_ID~AC_CLASS_APPLICABLE~ARC_APPLICABLE~CB_CLASS_APPLICABLE~CH_CLASS_APPLICABLE~CR_CLASS_APPLICABLE~DISC_ACCR_APPLICABLE~FA_BATCH_ENABLED~FA_ENABLED~INSTALLED~IN_CLASS_APPLICABLE~LICENSE~PURGE_AVAILABLE~RH_CLASS_APPLICABLE~TA_CLASS_APPLICABLE~USER_DEFINED_MODULE~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
msgxml += '      <FN PARENT="BLK_MODULES" RELATION_TYPE="N" TYPE="BLK_AMOUNTTAG">ACCTENTRYDEFNALLOWED~AMOUNTTAG~AMOUNTTAGTYPE~CHARGEALLOWED~COMMISSIONALLOWED~DESCRIPTION~INTERESTALLOWED~ISSRTAXALLOWED~LANGUAGECODE~MODULE~TAXALLOWED~TRACKRECEIVABLES~TRANTAXALLOWED~USERDEFINED</FN>'; 
msgxml += '      <FN PARENT="BLK_AMOUNTTAG" RELATION_TYPE="N" TYPE="BLK_AMOUNTTAG_DRV">AMOUNTRULETYPE~AMOUNTTAG~CCYRULETYPE~DRVAMOUNTRULE~DRVCCYRULE~MODULECODE~CCYERRTXT~AMTERRTXT</FN>'; 
msgxml += '      <FN PARENT="BLK_MODULES" RELATION_TYPE="N" TYPE="BLK_ACCROLE">ALLOWTRANSFERGL~MODULE~ROLECODE~ROLEDESCRIPTION~ROLETYPE~USERDEFINED</FN>'; 
msgxml += '      <FN PARENT="BLK_MODULES" RELATION_TYPE="N" TYPE="BLK_AMOUNT_TAG_DRV_TXT">AMTERRTXT~CCYERRTXT~MODIDERRTXT</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_MODULES">AUTHSTAT~TXNSTAT~MODULE_ID~MODULE_DESC</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "OLDRLTAG";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_MODULES";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_MODULES" : "","BLK_AMOUNTTAG" : "BLK_MODULES~N","BLK_AMOUNTTAG_DRV" : "BLK_AMOUNTTAG~N","BLK_ACCROLE" : "BLK_MODULES~N","BLK_AMOUNT_TAG_DRV_TXT" : "BLK_MODULES~N"}; 

 var dataSrcLocationArray = new Array("BLK_MODULES","BLK_AMOUNTTAG","BLK_AMOUNTTAG_DRV","BLK_ACCROLE","BLK_AMOUNT_TAG_DRV_TXT"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLDRLTAG.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLDRLTAG.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_MODULES__MODULE_ID";
pkFields[0] = "BLK_MODULES__MODULE_ID";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_ACCROLE":["MODULE","ROLECODE","ROLEDESCRIPTION","ROLETYPE"],"BLK_AMOUNTTAG_DRV":["AMOUNTRULETYPE","BTN_DEFAULT","BTN_DFLT","BTN_ERR","BTN_ERRORS","BTN_EXE","BTN_EXECUTE","CCYRULETYPE","DRVAMOUNTRULE","DRVCCYRULE","MODULECODE"],"BLK_AMOUNTTAG":["ACCTENTRYDEFNALLOWED","AMOUNTTAG","BTN_DERIVATION","CHARGEALLOWED","MODULE","TRANTAXALLOWED"],"BLK_AMOUNT_TAG_DRV_TXT":["AMTERRTXT","CCYERRTXT"]};
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
var lovInfoFlds = {"BLK_MODULES__MODULE_ID__LOV_MODULES":["BLK_MODULES__MODULE_ID~BLK_MODULES__MODULE_DESC~","","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_AMOUNTTAG","BLK_ACCROLE");
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

ArrFuncOrigin["OLDRLTAG"]="KERNEL";
ArrPrntFunc["OLDRLTAG"]="";
ArrPrntOrigin["OLDRLTAG"]="";
ArrRoutingType["OLDRLTAG"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLDRLTAG"]="N";
ArrCustomModified["OLDRLTAG"]="N";

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
var actStageArry = {"QUERY":"2","NEW":"2","MODIFY":"2","AUTHORIZE":"2","DELETE":"2","CLOSE":"2","REOPEN":"2","REVERSE":"1","ROLLOVER":"1","CONFIRM":"1","LIQUIDATE":"1","SUMMARYQUERY":"2"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------