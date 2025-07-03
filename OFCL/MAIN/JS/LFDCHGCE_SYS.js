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
**  File Name          : LFDCHGCE_SYS.js
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
var fieldNameArray = {"BLK_OLTMS_CLASS":"MODULE~CLASSCODE~CLASSTYPE~MODULEID~MODULEDESC~CLASDESC~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH","BLK_LFTMS_CHARGE_CLASS":"MODULE1~CLASSCODE1~CLASSTYPE1~THIRDPARTYTYPE~DRORCRTYPE~NETCONSINDI~NETCONSPLUS~SWIFTQUALIFIER~EVTFORASS~EVNTFORAPP~EVNTFORLIQD~DEFAULTRULE~DEFLTSETTLEMENT~DEFAULTWAIVER~ALLOWRULEAMND~AMNDAFTERASS~ALLOWAMTAMND~AMNDAFTERAPP~DISCACCRAPPLICABLE~PROPREQD~ACCURALEQD~CCYCODE~CCYNAME~MODULEA~EVENTCODEA~MODULEB~EVENTCODEB~MODULEC~EVENTCODEC~SWIFTCHARGE~REPAIRCHARGE~RESETFREQUENCY~RESETBASISMONTH~DERIVCHGRULE~RATECODE~RATETYPE~ROLETOHEADCLASS~EVENTCLASS~CHARGEFREQUENCY~CHARGEMODE~BASISMONTH~CHARGELIQDAY~CHGLIQVALDAY~CHARGESTMTREQD~CHGCONSTYP~PRIORITY~MISGROUP~CHGCONSBASIS~TXTRULEDESC~BASISAMOUNTTAG~ASSEVNTDESC~APPEVNTDESC~LIQEVNTDESC~AMTTAGDESC~AMTTAG~MODULE2~LANGCODE"};

var multipleEntryPageSize = {};

var multipleEntrySVBlocks = "";

var tabMEBlks = {};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTMS_CLASS">MODULE~CLASSCODE~CLASSTYPE~MODULEID~MODULEDESC~CLASDESC~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTMS_CLASS" RELATION_TYPE="1" TYPE="BLK_LFTMS_CHARGE_CLASS">MODULE1~CLASSCODE1~CLASSTYPE1~THIRDPARTYTYPE~DRORCRTYPE~NETCONSINDI~NETCONSPLUS~SWIFTQUALIFIER~EVTFORASS~EVNTFORAPP~EVNTFORLIQD~DEFAULTRULE~DEFLTSETTLEMENT~DEFAULTWAIVER~ALLOWRULEAMND~AMNDAFTERASS~ALLOWAMTAMND~AMNDAFTERAPP~DISCACCRAPPLICABLE~PROPREQD~ACCURALEQD~CCYCODE~CCYNAME~MODULEA~EVENTCODEA~MODULEB~EVENTCODEB~MODULEC~EVENTCODEC~SWIFTCHARGE~REPAIRCHARGE~RESETFREQUENCY~RESETBASISMONTH~DERIVCHGRULE~RATECODE~RATETYPE~ROLETOHEADCLASS~EVENTCLASS~CHARGEFREQUENCY~CHARGEMODE~BASISMONTH~CHARGELIQDAY~CHGLIQVALDAY~CHARGESTMTREQD~CHGCONSTYP~PRIORITY~MISGROUP~CHGCONSBASIS~TXTRULEDESC~BASISAMOUNTTAG~ASSEVNTDESC~APPEVNTDESC~LIQEVNTDESC~AMTTAGDESC~AMTTAG~MODULE2~LANGCODE</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_CHARGE_CLASS_SUMMARY">AUTHSTAT~TXNSTAT~MODULE~CLASSCODE~CLASSDESCRIPTION~THIRDPARTYTYP~DRCR</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "LFDCHGCE";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_CHARGE_CLASS_SUMMARY";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_OLTMS_CLASS" : "","BLK_LFTMS_CHARGE_CLASS" : "BLK_OLTMS_CLASS~1"}; 

 var dataSrcLocationArray = new Array("BLK_OLTMS_CLASS","BLK_LFTMS_CHARGE_CLASS"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LFDCHGCE.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LFDCHGCE.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_OLTMS_CLASS__MODULE";
pkFields[0] = "BLK_OLTMS_CLASS__MODULE";
queryFields[1] = "BLK_OLTMS_CLASS__CLASSCODE";
pkFields[1] = "BLK_OLTMS_CLASS__CLASSCODE";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_LFTMS_CHARGE_CLASS":["ACCURALEQD","ALLOWAMTAMND","ALLOWRULEAMND","AMNDAFTERAPP","AMNDAFTERASS","BASISMONTH","CCYCODE","CHARGEFREQUENCY","CHARGELIQDAY","CHARGEMODE","CHARGESTMTREQD","CHGCONSBASIS","CHGCONSTYP","CHGLIQVALDAY","CLASSTYPE1","DEFAULTRULE","DEFAULTWAIVER","DEFLTSETTLEMENT","DERIVCHGRULE","DISCACCRAPPLICABLE","DRORCRTYPE","EVENTCLASS","EVNTFORAPP","EVNTFORLIQD","EVTFORASS","MISGROUP","NETCONSINDI","NETCONSPLUS","PRIORITY","PROPREQD","RATECODE","RATETYPE","REPAIRCHARGE","RESETBASISMONTH","RESETFREQUENCY","ROLETOHEADCLASS","SWIFTCHARGE","SWIFTQUALIFIER","THIRDPARTYTYPE"]};
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
var lovInfoFlds = {"BLK_OLTMS_CLASS__MODULE__LOV_MODULE":["BLK_OLTMS_CLASS__MODULE~BLK_OLTMS_CLASS__MODULEDESC~","","N~N",""],"BLK_LFTMS_CHARGE_CLASS__THIRDPARTYTYPE__LOV_PARTY_TYPE":["BLK_LFTMS_CHARGE_CLASS__THIRDPARTYTYPE~","BLK_CSTMS_CLASS__MODULE!","N",""],"BLK_LFTMS_CHARGE_CLASS__EVTFORASS__LOV_ASSOCIATION_EVENT":["BLK_LFTMS_CHARGE_CLASS__EVTFORASS~BLK_LFTMS_CHARGE_CLASS__ASSEVNTDESC~","BLK_CSTMS_CLASS__MODULE!","N~N",""],"BLK_LFTMS_CHARGE_CLASS__EVNTFORAPP__LOV_APPLICATION_EVENT":["BLK_LFTMS_CHARGE_CLASS__EVNTFORAPP~BLK_LFTMS_CHARGE_CLASS__APPEVNTDESC~","BLK_CSTMS_CLASS__MODULE!","N~N",""],"BLK_LFTMS_CHARGE_CLASS__EVNTFORLIQD__LOV_LIQ_EVENT":["BLK_LFTMS_CHARGE_CLASS__EVNTFORLIQD~BLK_LFTMS_CHARGE_CLASS__LIQEVNTDESC~","BLK_CSTMS_CLASS__MODULE!","N~N",""],"BLK_LFTMS_CHARGE_CLASS__DEFAULTRULE__LOV_RULE":["BLK_LFTMS_CHARGE_CLASS__DEFAULTRULE~BLK_LFTMS_CHARGE_CLASS__TXTRULEDESC~","","N~N",""],"BLK_LFTMS_CHARGE_CLASS__DEFLTSETTLEMENT__LOV_CURRENCY":["BLK_LFTMS_CHARGE_CLASS__DEFLTSETTLEMENT~BLK_LFTMS_CHARGE_CLASS__CCYNAME~","","N~N",""],"BLK_LFTMS_CHARGE_CLASS__RATETYPE__LOV_RATE_TYPE":["BLK_LFTMS_CHARGE_CLASS__RATETYPE~~","","N~N",""],"BLK_LFTMS_CHARGE_CLASS__ROLETOHEADCLASS__LOV_ROLE_TO_HEAD_CLASS":["BLK_LFTMS_CHARGE_CLASS__ROLETOHEADCLASS~~","BLK_CSTMS_CLASS__MODULE!","N~N",""],"BLK_LFTMS_CHARGE_CLASS__EVENTCLASS__LOV_EVENT_CLASS":["BLK_LFTMS_CHARGE_CLASS__EVENTCLASS~","BLK_CSTMS_CLASS__MODULE!","N","N"],"BLK_LFTMS_CHARGE_CLASS__MISGROUP__LOV_MIS_GROUP":["BLK_LFTMS_CHARGE_CLASS__MISGROUP~","","N",""],"BLK_LFTMS_CHARGE_CLASS__BASISAMOUNTTAG__LOV_AMOUNT_TAG":["BLK_LFTMS_CHARGE_CLASS__BASISAMOUNTTAG~BLK_LFTMS_CHARGE_CLASS__AMTTAGDESC~","BLK_CSTMS_CLASS__MODULE!","N~N",""]};
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

 var CallFormArray= new Array("CSCFNUDF~BLK_OLTMS_CLASS"); 

 var CallFormRelat=new Array(""); 

 var CallRelatType= new Array("N"); 


 var ArrFuncOrigin=new Array();
 var ArrPrntFunc=new Array();
 var ArrPrntOrigin=new Array();
 var ArrRoutingType=new Array();


 // Code for Loading Cluster/Custom js File Starts
 var ArrClusterModified=new Array();
 var ArrCustomModified=new Array();
 // Code for Loading Cluster/Custom js File ends

ArrFuncOrigin["LFDCHGCE"]="KERNEL";
ArrPrntFunc["LFDCHGCE"]="";
ArrPrntOrigin["LFDCHGCE"]="";
ArrRoutingType["LFDCHGCE"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LFDCHGCE"]="N";
ArrCustomModified["LFDCHGCE"]="N";

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
var actStageArry = {"QUERY":"2","NEW":"2","MODIFY":"2","AUTHORIZE":"1","DELETE":"1","CLOSE":"1","REOPEN":"1","REVERSE":"1","ROLLOVER":"1","CONFIRM":"1","LIQUIDATE":"1","SUMMARYQUERY":"1"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------