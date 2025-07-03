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
**  File Name          : OLCACADD_SYS.js
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
var criteriaSearch  = '';
//----------------------------------------------------------------------------------------------------------------------
//***** FCJ XML FOR THE SCREEN *****
//----------------------------------------------------------------------------------------------------------------------
var fieldNameArray = {"BLK_PRODUCT_EVENTS":"PRDCD~MODULE~PRDTYP~PRD~CLASTYP~CLASCD~PRDDESC~CLASDESC","BLK_EVENT_DETAILS":"EVNTCD~ENVNTDESC","BLK_ACCOUNTING_RULES":"RULENUM~COND~EVTCODE~PRDCODE","BLK_ACCOUNTING_ENTRIES":"ACCRLCD~AMTTAG~DRCRINDICTR~TRNCD~NETINDICTR~MISHD~REVALREQD~PRDCD~EVNTCD~ROLTYP~AMTTAGTYP~GLUPDFLAG~MISSPRD~MSGNETTIND~RULENO","BLK_ADVICES":"MSGTYP~DESC~GENTIME~SUPRS~PRIOR","BLK_CONDITON_BUILDER":""};

var multipleEntryPageSize = {"BLK_EVENT_DETAILS" :"15" ,"BLK_ACCOUNTING_ENTRIES" :"15" ,"BLK_ADVICES" :"15" ,"BLK_ACCOUNTING_RULES" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_EVENTS__All":"BLK_EVENT_DETAILS","CVS_ENTRIES__All":"BLK_ACCOUNTING_ENTRIES~BLK_ACCOUNTING_RULES","CVS_ADVICES__All":"BLK_ADVICES"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_PRODUCT_EVENTS">PRDCD~MODULE~PRDTYP~PRD~CLASTYP~CLASCD~PRDDESC~CLASDESC</FN>'; 
msgxml += '      <FN PARENT="BLK_PRODUCT_EVENTS" RELATION_TYPE="N" TYPE="BLK_EVENT_DETAILS">EVNTCD~ENVNTDESC</FN>'; 
msgxml += '      <FN PARENT="BLK_EVENT_DETAILS" RELATION_TYPE="N" TYPE="BLK_ACCOUNTING_RULES">RULENUM~COND~EVTCODE~PRDCODE</FN>'; 
msgxml += '      <FN PARENT="BLK_ACCOUNTING_RULES" RELATION_TYPE="N" TYPE="BLK_ACCOUNTING_ENTRIES">ACCRLCD~AMTTAG~DRCRINDICTR~TRNCD~NETINDICTR~MISHD~REVALREQD~PRDCD~EVNTCD~ROLTYP~AMTTAGTYP~GLUPDFLAG~MISSPRD~MSGNETTIND~RULENO</FN>'; 
msgxml += '      <FN PARENT="BLK_EVENT_DETAILS" RELATION_TYPE="N" TYPE="BLK_ADVICES">MSGTYP~DESC~GENTIME~SUPRS~PRIOR</FN>'; 
msgxml += '      <FN PARENT="BLK_ACCOUNTING_RULES" RELATION_TYPE="1" TYPE="BLK_CONDITON_BUILDER"></FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_EVENTS";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_PRODUCT_EVENTS" : "","BLK_EVENT_DETAILS" : "BLK_PRODUCT_EVENTS~N","BLK_ACCOUNTING_RULES" : "BLK_EVENT_DETAILS~N","BLK_ACCOUNTING_ENTRIES" : "BLK_ACCOUNTING_RULES~N","BLK_ADVICES" : "BLK_EVENT_DETAILS~N","BLK_CONDITON_BUILDER" : "BLK_ACCOUNTING_RULES~1"}; 

 var dataSrcLocationArray = new Array("BLK_PRODUCT_EVENTS","BLK_EVENT_DETAILS","BLK_ACCOUNTING_RULES","BLK_ACCOUNTING_ENTRIES","BLK_ADVICES","BLK_CONDITON_BUILDER"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLCACADD.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLCACADD.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_PRODUCT_EVENTS__PRDCD";
pkFields[0] = "BLK_PRODUCT_EVENTS__PRDCD";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_ACCOUNTING_ENTRIES":["ACCRLCD","AMTTAG","DRCRINDICTR","MISHD","MSGNETTIND","NETINDICTR","REVALREQD","TRNCD"],"BLK_ACCOUNTING_RULES":["BTN_CONDITION","COND","RULENUM"],"BLK_ADVICES":["MSGTYP","PRIOR","SUPRS"],"BLK_CONDITON_BUILDER":["BTN_ACCEPT","BTN_AND","BTN_CLR_COND","BTN_OR","CONDITION","FIELDS","MATHEMATICAL_OP","OPERATOR","VALUE"],"BLK_EVENT_DETAILS":["EVNTCD"],"BLK_PRODUCT_EVENTS":["CLASCD"]};
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
var lovInfoFlds = {"BLK_PRODUCT_EVENTS__CLASCD__LOV_CLASS_CODE":["BLK_PRODUCT_EVENTS__CLASCD~BLK_PRODUCT_EVENTS__CLASDESC~","BLK_PRODUCT_EVENTS__MODULE!STRING","N~N",""],"BLK_EVENT_DETAILS__EVNTCD__LOV_EVENTS":["BLK_EVENT_DETAILS__EVNTCD~BLK_EVENT_DETAILS__ENVNTDESC~","BLK_PRODUCT_EVENTS__MODULE!STRING","N~N",""],"BLK_ACCOUNTING_ENTRIES__ACCRLCD__LOV_ACCROLE":["BLK_ACCOUNTING_ENTRIES__ACCRLCD~BLK_ACCOUNTING_ENTRIES__ROLTYP~~","BLK_PRODUCT_EVENTS__MODULE!STRING","N~N~N",""],"BLK_ACCOUNTING_ENTRIES__AMTTAG__LOV_AMOUNT_TAG":["BLK_ACCOUNTING_ENTRIES__AMTTAG~~BLK_ACCOUNTING_ENTRIES__AMTTAGTYP~","BLK_PRODUCT_EVENTS__MODULE!STRING~BLK_PRODUCT_EVENTS__MODULE!STRING~BLK_PRODUCT_EVENTS__MODULE!STRING~BLK_PRODUCT_EVENTS__MODULE!STRING","N~N~N",""],"BLK_ACCOUNTING_ENTRIES__TRNCD__LOV_TRN_CODE":["BLK_ACCOUNTING_ENTRIES__TRNCD~~","","N~N",""],"BLK_ACCOUNTING_ENTRIES__MISHD__LOV_MIS_HEAD":["BLK_ACCOUNTING_ENTRIES__MISHD~~","","N~N",""],"BLK_ADVICES__MSGTYP__LOV_MSG_TYPES":["BLK_ADVICES__MSGTYP~BLK_ADVICES__DESC~BLK_ADVICES__PRIOR~","BLK_PRODUCT_EVENTS__MODULE!STRING~BLK_PRODUCT_EVENTS__PRDCD!STRING","N~N~N",""],"BLK_CONDITON_BUILDER__FIELDS__LOV_SDE":["BLK_CONDITON_BUILDER__FIELDS~","","N","N"]};
var offlineLovInfoFlds = {};
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR TABS *****
//----------------------------------------------------------------------------------------------------------------------
var strHeaderTabId = 'TAB_HEADER';
var strFooterTabId = 'TAB_FOOTER';
var strCurrentTabId = 'All';
//--------------------------------------------
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------
var multipleEntryIDs = new Array("BLK_EVENT_DETAILS","BLK_ACCOUNTING_ENTRIES","BLK_ADVICES","BLK_ACCOUNTING_RULES");
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

ArrFuncOrigin["OLCACADD"]="KERNEL";
ArrPrntFunc["OLCACADD"]="";
ArrPrntOrigin["OLCACADD"]="";
ArrRoutingType["OLCACADD"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLCACADD"]="N";
ArrCustomModified["OLCACADD"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_EVENTS":"MODULE~PRDCD~PRDDESC~PRDTYP","CVS_ENTRIES":"EVNTCD~EVNDDESC","CVS_ADVICES":"EVNTCD~EVNTDESC"};
var scrArgSource = {"CVS_ENTRIES":"BLK_EVENT_DETAILS__EVNTCD~BLK_EVENT_DETAILS__ENVNTDESC","CVS_ADVICES":"BLK_EVENT_DETAILS__EVNTCD~BLK_EVENT_DETAILS__ENVNTDESC"};
var scrArgVals = {"CVS_EVENTS":"~~~","CVS_ENTRIES":"~","CVS_ADVICES":"~"};
var scrArgDest = {"CVS_EVENTS":"BLK_PRODUCT_EVENTS__MODULE~BLK_PRODUCT_EVENTS__PRDCD~BLK_PRODUCT_EVENTS__PRDDESC~BLK_PRODUCT_EVENTS__PRDTYP","CVS_ENTRIES":"BLK_CONTROL_ACCT_ENTRY__TXTEVNTCD~BLK_CONTROL_ACCT_ENTRY__TXTEVNTDESCACC","CVS_ADVICES":"BLK_CONTROL_ADVICES__TXTEVNTCDADV~BLK_CONTROL_ADVICES__TXTEVNTDESCADV"};
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
var actStageArry = {"QUERY":"2","NEW":"2","MODIFY":"2","AUTHORIZE":"1","DELETE":"1","CLOSE":"1","REOPEN":"1","REVERSE":"1","ROLLOVER":"1","CONFIRM":"1","LIQUIDATE":"1","SUMMARYQUERY":"1"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------