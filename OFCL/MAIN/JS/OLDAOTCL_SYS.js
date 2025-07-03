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
**  File Name          : OLDAOTCL_SYS.js
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
var fieldNameArray = {"BLK_OLTM_CLASS":"CLASSCODE~CLASSDESCRIPTION~MODULE~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH","BLK_OLTM_EVENT_CLASS":"CLASSCODE~EVENTCODE~EVENTDESC~ACBTDEFN~ENTRYDEFN~MODULE","BLK_OLTM_EVENT_ACCT_ENTRY_CLASS":"DRCR~TRANSACTION_ODE~MODULE~AMTTAG~ACCOUNTROLECODE~MISHEAD~NETTINGINDICATOR~ROLETYPE~ROLEDESC~TAGTYPE~MODULEDESC~EVENTCD~CLASSCD","BLK_OLTM_EVENT_ADVICE_CLASS":"CLASS_CODE~EVENT_CODE~GENERATION_TIME~PRIORITY~SUPPRESS~MODULE~MSGTYPE"};

var multipleEntryPageSize = {"BLK_OLTM_EVENT_CLASS" :"15" ,"BLK_OLTM_EVENT_ACCT_ENTRY_CLASS" :"15" ,"BLK_OLTM_EVENT_ADVICE_CLASS" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_OLTM_EVENT_CLASS","CVS_ACCNT__TAB_MAIN":"BLK_OLTM_EVENT_ACCT_ENTRY_CLASS","CVS_ADVICES__TAB_MAIN":"BLK_OLTM_EVENT_ADVICE_CLASS"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTM_CLASS">CLASSCODE~CLASSDESCRIPTION~MODULE~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTM_CLASS" RELATION_TYPE="N" TYPE="BLK_OLTM_EVENT_CLASS">CLASSCODE~EVENTCODE~EVENTDESC~ACBTDEFN~ENTRYDEFN~MODULE</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTM_EVENT_CLASS" RELATION_TYPE="N" TYPE="BLK_OLTM_EVENT_ACCT_ENTRY_CLASS">DRCR~TRANSACTION_ODE~MODULE~AMTTAG~ACCOUNTROLECODE~MISHEAD~NETTINGINDICATOR~ROLETYPE~ROLEDESC~TAGTYPE~MODULEDESC~EVENTCD~CLASSCD</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTM_EVENT_CLASS" RELATION_TYPE="N" TYPE="BLK_OLTM_EVENT_ADVICE_CLASS">CLASS_CODE~EVENT_CODE~GENERATION_TIME~PRIORITY~SUPPRESS~MODULE~MSGTYPE</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTM_CLASS">AUTHSTAT~TXNSTAT~CLASSCODE~MODULE</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "OLDAOTCL";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_OLTM_CLASS";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_OLTM_CLASS" : "","BLK_OLTM_EVENT_CLASS" : "BLK_OLTM_CLASS~N","BLK_OLTM_EVENT_ACCT_ENTRY_CLASS" : "BLK_OLTM_EVENT_CLASS~N","BLK_OLTM_EVENT_ADVICE_CLASS" : "BLK_OLTM_EVENT_CLASS~N"}; 

 var dataSrcLocationArray = new Array("BLK_OLTM_CLASS","BLK_OLTM_EVENT_CLASS","BLK_OLTM_EVENT_ACCT_ENTRY_CLASS","BLK_OLTM_EVENT_ADVICE_CLASS"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLDAOTCL.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLDAOTCL.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_OLTM_CLASS__CLASSCODE";
pkFields[0] = "BLK_OLTM_CLASS__CLASSCODE";
queryFields[1] = "BLK_OLTM_CLASS__MODULE";
pkFields[1] = "BLK_OLTM_CLASS__MODULE";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_CTRL_ACCT_ENTRY":["TXTCLASSCODDES","TXTCLASSCODE","TXTEVNTCODE","TXTEVNTDESC"],"BLK_CTRL_EVNT_ADV":["TXTCLASSCD","TXTCLASSCDDES","TXTEVNTCD","TXTEVNTCDDES"],"BLK_OLTM_CLASS":["BRTN_UDFCSCFNUDF","BTN_ADVICES","BTN_UDF","CLASSCODE","CLASSDESCRIPTION","MODULE","MODULEDESC"],"BLK_OLTM_EVENT_ACCT_ENTRY_CLASS":["ACCOUNTROLECODE","AMTTAG","CLASSCD","DRCR","EVENTCD","HEADDESC","MISHEAD","MODULE","MODULEDESC","NETTINGINDICATOR","ROLEDESC","ROLETYPE","TAGDESC","TAGTYPE","TRANSACTION_ODE","TRNDESC"],"BLK_OLTM_EVENT_ADVICE_CLASS":["CLASS_CODE","EVENT_CODE","GENERATION_TIME","MODULE","MSGTYPE","PRIORITY","SUPPRESS"],"BLK_OLTM_EVENT_CLASS":["ACBTDEFN","CLASSCODE","ENTRYDEFN","EVENTCODE","EVENTDESC","MODULE"]};
var closeAmendArr = new Array(); 
var reopenAmendArr = new Array(); 
var reverseAmendArr = new Array(); 
var deleteAmendArr = new Array(); 
var rolloverAmendArr = new Array(); 
var confirmAmendArr = new Array(); 
var liquidateAmendArr = new Array(); 
//***** Fields Amendable while Query *****
var queryAmendArr = {"BLK_OLTM_EVENT_ACCT_ENTRY_CLASS":["ACCOUNTROLECODE","AMTTAG","DRCR","HEADDESC","MISHEAD","MODULE","MODULEDESC","NETTINGINDICATOR","ROLEDESC","ROLETYPE","TAGDESC","TAGTYPE","TRANSACTION_ODE","TRNDESC"],"BLK_OLTM_EVENT_ADVICE_CLASS":["EVENT_CODE","GENERATION_TIME","MODULE","MSGTYPE","PRIORITY","SUPPRESS"]};
var authorizeAmendArr = new Array(); 
//----------------------------------------------------------------------------------------------------------------------

var subsysArr    = new Array(); 

//----------------------------------------------------------------------------------------------------------------------

//***** CODE FOR LOVs *****
//----------------------------------------------------------------------------------------------------------------------
var lovInfoFlds = {"BLK_OLTM_CLASS__MODULE__LOV_MODULE":["BLK_OLTM_CLASS__MODULE~BLK_OLTM_CLASS__MODULEDESC~","","N~N",""],"BLK_OLTM_EVENT_CLASS__EVENTCODE__LOV_EVENTS":["BLK_OLTM_EVENT_CLASS__EVENTCODE~BLK_OLTM_EVENT_CLASS__EVENTDESC~BLK_OLTM_EVENT_CLASS__ENTRYDEFN~BLK_OLTM_EVENT_CLASS__ACBTDEFN~","BLK_OLTM_CLASS__MODULE!VARCHAR2","N~N~N~N",""],"BLK_OLTM_EVENT_ACCT_ENTRY_CLASS__TRANSACTION_ODE__LOV_TXN_CODE":["BLK_OLTM_EVENT_ACCT_ENTRY_CLASS__TRANSACTION_ODE~BLK_OLTM_EVENT_ACCT_ENTRY_CLASS__TRNDESC~","","N~N",""],"BLK_OLTM_EVENT_ACCT_ENTRY_CLASS__MODULE__LOV_MODULE":["BLK_OLTM_EVENT_ACCT_ENTRY_CLASS__MODULEDESC~BLK_OLTM_EVENT_ACCT_ENTRY_CLASS__MODULEDESC~","","N~N",""],"BLK_OLTM_EVENT_ACCT_ENTRY_CLASS__AMTTAG__LOV_AMT_TAG":["BLK_OLTM_EVENT_ACCT_ENTRY_CLASS__AMTTAG~BLK_OLTM_EVENT_ACCT_ENTRY_CLASS__TAGDESC~BLK_OLTM_EVENT_ACCT_ENTRY_CLASS__TAGTYPE~","BLK_OLTM_CLASS__MODULE!VARCHAR2","N~N~N",""],"BLK_OLTM_EVENT_ACCT_ENTRY_CLASS__ACCOUNTROLECODE__LOV_ACC_ROLES":["BLK_OLTM_EVENT_ACCT_ENTRY_CLASS__ACCOUNTROLECODE~BLK_OLTM_EVENT_ACCT_ENTRY_CLASS__ROLEDESC~BLK_OLTM_EVENT_ACCT_ENTRY_CLASS__ROLETYPE~","BLK_OLTM_CLASS__MODULE!VARCHAR2","N~N~N",""],"BLK_OLTM_EVENT_ACCT_ENTRY_CLASS__MISHEAD__LOV_MIS_HEAD":["BLK_OLTM_EVENT_ACCT_ENTRY_CLASS__MISHEAD~BLK_OLTM_EVENT_ACCT_ENTRY_CLASS__HEADDESC~","","N~N",""],"BLK_OLTM_EVENT_ACCT_ENTRY_CLASS__TRNDESC__LOV_TXN_CODE":["BLK_OLTM_EVENT_ACCT_ENTRY_CLASS__TRANSACTION_ODE~BLK_OLTM_EVENT_ACCT_ENTRY_CLASS__TRNDESC~","","N~N","N"],"BLK_OLTM_EVENT_ACCT_ENTRY_CLASS__HEADDESC__LOV_MIS_HEAD":["BLK_OLTM_EVENT_ACCT_ENTRY_CLASS__MISHEAD~BLK_OLTM_EVENT_ACCT_ENTRY_CLASS__HEADDESC~","","N~N","N"],"BLK_OLTM_EVENT_ADVICE_CLASS__MSGTYPE__LOV_ADVICES":["BLK_OLTM_EVENT_ADVICE_CLASS__MSGTYPE~BLK_OLTM_EVENT_ADVICE_CLASS__DESCRIPTION~BLK_OLTM_EVENT_ADVICE_CLASS__PRIORITY~BLK_OLTM_EVENT_ADVICE_CLASS__GENERATION_TIME~","BLK_OLTM_CLASS__MODULE!VARCHAR2","N~N~N~N",""]};
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
var multipleEntryIDs = new Array("BLK_OLTM_EVENT_CLASS","BLK_OLTM_EVENT_ACCT_ENTRY_CLASS","BLK_OLTM_EVENT_ADVICE_CLASS");
var multipleEntryArray = new Array();
var multipleEntryCells = new Array();
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY VIEW SINGLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR ATTACHED CALLFORMS *****
 //----------------------------------------------------------------------------------------------------------------------

 var CallFormArray= new Array("CSCFNUDF~BLK_OLTM_CLASS"); 

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

ArrFuncOrigin["OLDAOTCL"]="KERNEL";
ArrPrntFunc["OLDAOTCL"]="";
ArrPrntOrigin["OLDAOTCL"]="";
ArrRoutingType["OLDAOTCL"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLDAOTCL"]="N";
ArrCustomModified["OLDAOTCL"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_ACCNT":"CLASSCODE~CLASSDESCRIPTION~EVENTCODE~EVENTDESC","CVS_ADVICES":"CLASSCODE~CLASSDESCRIPTION~EVENTCODE~EVENTDESC","CSCFNUDF":""};
var scrArgSource = {"CVS_ACCNT":"BLK_OLTM_CLASS__CLASSCODE~BLK_OLTM_CLASS__CLASSDESCRIPTION~BLK_OLTM_EVENT_CLASS__EVENTCODE~BLK_OLTM_EVENT_CLASS__EVENTDESC","CVS_ADVICES":"BLK_OLTM_CLASS__CLASSCODE~BLK_OLTM_CLASS__CLASSDESCRIPTION~BLK_OLTM_EVENT_CLASS__EVENTCODE~BLK_OLTM_EVENT_CLASS__EVENTDESC","CSCFNUDF":""};
var scrArgVals = {"CVS_ACCNT":"~~~","CVS_ADVICES":"~~~","CSCFNUDF":""};
var scrArgDest = {"CVS_ACCNT":"BLK_CTRL_ACCT_ENTRY__TXTCLASSCODE~BLK_CTRL_ACCT_ENTRY__TXTCLASSCODDES~BLK_CTRL_ACCT_ENTRY__TXTEVNTCODE~BLK_CTRL_ACCT_ENTRY__TXTEVNTDESC","CVS_ADVICES":"BLK_CTRL_EVNT_ADV__TXTCLASSCD~BLK_CTRL_EVNT_ADV__TXTCLASSCDDES~BLK_CTRL_EVNT_ADV__TXTEVNTCD~BLK_CTRL_EVNT_ADV__TXTEVNTCDDES"};
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