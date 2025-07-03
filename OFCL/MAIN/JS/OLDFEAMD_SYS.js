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
**  File Name          : OLDFEAMD_SYS.js
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
var fieldNameArray = {"BLK_OLTBS_CONTRACT_FEAMD":"CONTRACTREFNO~PRODUCTCODE~BRANCH~USERREFNO~COUNTERPARTY~TXTPRODDESC~TXTCUSTNAME~LATESTEVENTSEQNO~MODULECODE~LATESTVERSIONNO~CONTSTATUS~PRODTYPE","BLK_LFTBS_CONTARCT_FEE":"COMPONENT~ASSOCIATIONDATE~DISCACCRAPPLICABLE~LIQDPREFERENCE~FEEREVERSED~COMPONENTCCY~STARTDATE~ENDDATE~FEERULE~BILLINGNOTICEREQUIRED~INTERESTBASIS~BILLINGNOTICEDAYS~TXTCOMPSTATUS~TXTTOTALFEEAMOUNT~TXTTILLDATEACCRUAL~CONTR~EVENTSQN~FEECOLLECTIONMODE","BLK_OLTBS_CONTRACT_EVENT_LOG":"CHECKERDTST~AUTHSTAT~CHECKERID~TXNSTAT~CONTREFNO~ESNO~MAKERID~MAKERDTST","BLK_OLTBS_CONTRACT_SCHEDULES":"STDATE~COMPON~CONTREFNUMBER~SCHTYP~VERSIONNUM~NOOFSCHEDULES~AMT~FREQUENCYUNIT~FREQUENCY~TXTENDDT","BLK_OLTBS_AMOUNT_DUE_CS":"DUEDAT~CONREFNUMBR~COMPNEN~AMTSETTLED~AMTDUE~SCHLINKAGE","BLK_NRM_SUBSYS":"NRMCONTREFNO~SUBSYSSTAT~TXTCONTREFNO~TXTCOMPONENT~TXTCCY~TXTFEERULE~TXTSTARTDATE~TXTENDDATE~TXTCOLLMODE~TXTBASISAMTTAG"};

var multipleEntryPageSize = {"BLK_LFTBS_CONTARCT_FEE" :"15" ,"BLK_OLTBS_CONTRACT_SCHEDULES" :"15" ,"BLK_OLTBS_AMOUNT_DUE_CS" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_LFTBS_CONTARCT_FEE","CVS_FESCH__TAB_MAIN":"BLK_OLTBS_CONTRACT_SCHEDULES~BLK_OLTBS_AMOUNT_DUE_CS"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTBS_CONTRACT_FEAMD">CONTRACTREFNO~PRODUCTCODE~BRANCH~USERREFNO~COUNTERPARTY~TXTPRODDESC~TXTCUSTNAME~LATESTEVENTSEQNO~MODULECODE~LATESTVERSIONNO~CONTSTATUS~PRODTYPE</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONTRACT_FEAMD" RELATION_TYPE="N" TYPE="BLK_LFTBS_CONTARCT_FEE">COMPONENT~ASSOCIATIONDATE~DISCACCRAPPLICABLE~LIQDPREFERENCE~FEEREVERSED~COMPONENTCCY~STARTDATE~ENDDATE~FEERULE~BILLINGNOTICEREQUIRED~INTERESTBASIS~BILLINGNOTICEDAYS~TXTCOMPSTATUS~TXTTOTALFEEAMOUNT~TXTTILLDATEACCRUAL~CONTR~EVENTSQN~FEECOLLECTIONMODE</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONTRACT_FEAMD" RELATION_TYPE="1" TYPE="BLK_OLTBS_CONTRACT_EVENT_LOG">CHECKERDTST~AUTHSTAT~CHECKERID~TXNSTAT~CONTREFNO~ESNO~MAKERID~MAKERDTST</FN>'; 
msgxml += '      <FN PARENT="BLK_LFTBS_CONTARCT_FEE" RELATION_TYPE="N" TYPE="BLK_OLTBS_CONTRACT_SCHEDULES">STDATE~COMPON~CONTREFNUMBER~SCHTYP~VERSIONNUM~NOOFSCHEDULES~AMT~FREQUENCYUNIT~FREQUENCY~TXTENDDT</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONTRACT_SCHEDULES" RELATION_TYPE="N" TYPE="BLK_OLTBS_AMOUNT_DUE_CS">DUEDAT~CONREFNUMBR~COMPNEN~AMTSETTLED~AMTDUE~SCHLINKAGE</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONTRACT_FEAMD" RELATION_TYPE="1" TYPE="BLK_NRM_SUBSYS">NRMCONTREFNO~SUBSYSSTAT~TXTCONTREFNO~TXTCOMPONENT~TXTCCY~TXTFEERULE~TXTSTARTDATE~TXTENDDATE~TXTCOLLMODE~TXTBASISAMTTAG</FN>'; 
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
msgxml_sum += '      <FN PARENT="BLK_OLTBS_CONTRACT_FEAMD" RELATION_TYPE="1" TYPE="BLK_FEAMND_SUMMARY">AUTHSTAT~CONTSTAT~CONTRACTREFNO~BRANCH~MODCODE</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "OLDFEAMD";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_FEAMND_SUMMARY";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_OLTBS_CONTRACT_FEAMD" : "","BLK_LFTBS_CONTARCT_FEE" : "BLK_OLTBS_CONTRACT_FEAMD~N","BLK_OLTBS_CONTRACT_EVENT_LOG" : "BLK_OLTBS_CONTRACT_FEAMD~1","BLK_OLTBS_CONTRACT_SCHEDULES" : "BLK_LFTBS_CONTARCT_FEE~N","BLK_OLTBS_AMOUNT_DUE_CS" : "BLK_OLTBS_CONTRACT_SCHEDULES~N","BLK_NRM_SUBSYS" : "BLK_OLTBS_CONTRACT_FEAMD~1"}; 

 var dataSrcLocationArray = new Array("BLK_OLTBS_CONTRACT_FEAMD","BLK_LFTBS_CONTARCT_FEE","BLK_OLTBS_CONTRACT_EVENT_LOG","BLK_OLTBS_CONTRACT_SCHEDULES","BLK_OLTBS_AMOUNT_DUE_CS","BLK_NRM_SUBSYS"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLDFEAMD.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLDFEAMD.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_OLTBS_CONTRACT_FEAMD__CONTRACTREFNO";
pkFields[0] = "BLK_OLTBS_CONTRACT_FEAMD__CONTRACTREFNO";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_OLTBS_CONTRACT_SCHEDULES":["AMT","FREQUENCY","FREQUENCYUNIT","NOOFSCHEDULES","STDATEI"]};
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
var lovInfoFlds = {"BLK_OLTBS_CONTRACT_FEAMD__CONTRACTREFNO__LOV_CONTRACT":["BLK_OLTBS_CONTRACT_FEAMD__CONTRACTREFNO~BLK_OLTBS_CONTRACT_FEAMD__USERREFNO~BLK_OLTBS_CONTRACT_FEAMD__PRODUCTCODE~BLK_OLTBS_CONTRACT_FEAMD__TXTPRODDESC~BLK_OLTBS_CONTRACT_FEAMD__COUNTERPARTY~BLK_OLTBS_CONTRACT_FEAMD__TXTCUSTNAME~BLK_OLTBS_CONTRACT_FEAMD__BRANCH~","","N~N~N~N~N~N~N",""],"BLK_LFTBS_CONTARCT_FEE__COMPONENT__LOV_COMPONENT":["BLK_LFTBS_CONTARCT_FEE__COMPONENT~~~~","BLK_OLTBS_CONTRACT_FEAMD__PRODUCTCODE!VARCHAR2~BLK_OLTBS_CONTRACT_FEAMD__CONTRACTREFNO!VARCHAR2~BLK_OLTBS_CONTRACT_FEAMD__PRODUCTCODE!VARCHAR2~BLK_OLTBS_CONTRACT_FEAMD__CONTRACTREFNO!VARCHAR2","N~N~N~N",""],"BLK_LFTBS_CONTARCT_FEE__COMPONENTCCY__LOV_CURRENCIES":["BLK_LFTBS_CONTARCT_FEE__COMPONENTCCY~~","BLK_OLTBS_CONTRACT_FEAMD__PRODUCTCODE!VARCHAR2","N~N",""],"BLK_LFTBS_CONTARCT_FEE__FEERULE__LOV_FEE_RULE":["BLK_LFTBS_CONTARCT_FEE__FEERULE~~","","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_LFTBS_CONTARCT_FEE","BLK_OLTBS_CONTRACT_SCHEDULES","BLK_OLTBS_AMOUNT_DUE_CS");
var multipleEntryArray = new Array();
var multipleEntryCells = new Array();
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY VIEW SINGLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR ATTACHED CALLFORMS *****
 //----------------------------------------------------------------------------------------------------------------------

 var CallFormArray= new Array("OLCONDET~BLK_OLTBS_CONTRACT_FEAMD"); 

 var CallFormRelat=new Array("OLTBS_CONTRACT__FEAMD.CONTRACT_REF_NO=OLTBS_CONTRACT__SETT.CONTRACT_REF_NO"); 

 var CallRelatType= new Array("1"); 


 var ArrFuncOrigin=new Array();
 var ArrPrntFunc=new Array();
 var ArrPrntOrigin=new Array();
 var ArrRoutingType=new Array();


 // Code for Loading Cluster/Custom js File Starts
 var ArrClusterModified=new Array();
 var ArrCustomModified=new Array();
 // Code for Loading Cluster/Custom js File ends

ArrFuncOrigin["OLDFEAMD"]="KERNEL";
ArrPrntFunc["OLDFEAMD"]="";
ArrPrntOrigin["OLDFEAMD"]="";
ArrRoutingType["OLDFEAMD"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLDFEAMD"]="N";
ArrCustomModified["OLDFEAMD"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_FESCH":"TXTCONTREFNO~TXTCOMPONENT~TXTCCY~TXTFEERULE~TXTSTARTDATE~TXTENDDATE~TXTCOLLMODE","OLCONDET":"CONREFNO~ESN","OLDEVENT":"CONTREF~ACTION_CODE~"};
var scrArgSource = {"CVS_FESCH":"BLK_LFTBS_CONTARCT_FEE__CONTR~BLK_LFTBS_CONTARCT_FEE__COMPONENT~BLK_LFTBS_CONTARCT_FEE__COMPONENTCCY~BLK_LFTBS_CONTARCT_FEE__FEERULE~BLK_LFTBS_CONTARCT_FEE__STARTDATE~BLK_LFTBS_CONTARCT_FEE__ENDDATE~BLK_LFTBS_CONTARCT_FEE__FEECOLLECTIONMODE","OLCONDET":"BLK_OLTBS_CONTRACT_FEAMD__CONTRACTREFNO~BLK_OLTBS_CONTRACT_FEAMD__LATESTEVENTSEQNO","OLDEVENT":"BLK_OLTBS_CONTRACT_FEAMD__CONTRACTREFNO~~"};
var scrArgVals = {"CVS_FESCH":"~~~~~~","OLCONDET":"~","OLDEVENT":"~EXECUTEQUERY~"};
var scrArgDest = {"CVS_FESCH":"BLK_NRM_SUBSYS__TXTCONTREFNO~BLK_NRM_SUBSYS__TXTCOMPONENT~BLK_NRM_SUBSYS__TXTCCY~BLK_NRM_SUBSYS__TXTFEERULE~BLK_NRM_SUBSYS__TXTSTARTDATE~BLK_NRM_SUBSYS__TXTENDDATE~BLK_NRM_SUBSYS__TXTCOLLMODE"};
//***** CODE FOR SUB-SYSTEM DEPENDENT  FIELDS   *****
//----------------------------------------------------------------------------------------------------------------------
var dpndntOnFlds = {"OLCONDET":""};
var dpndntOnSrvs = {"OLCONDET":""};
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