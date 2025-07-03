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
**  File Name          : LFCFESCH_SYS.js
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
var fieldNameArray = {"BLK_OLTBS_CONTRACT_SCHEDULES_FESCH":"VERSIONNO~SCHEDULETYPE~CONTRACTREFNO~COMPONENT~STARTDATE~TXTUSERREFNO~TXTCUSTOMER~TXTCUSTNAME~TXTFACILITYNAME~TXTPRODCODE~TXTPRODDESC~TXTPRODTYPE~TXTCONTREFNO1~TXTPRODCODE1~TXTPRODDESC1~TXTUSERREFNO1~TXTCUSTOMER1~TXTCUSTNAME1~CONTCCY~ORGACTCOD~ONCEAUTH_FLAG","BLK_OLTBS_CONTRACT_SCHEDULES_MULTI":"VERSIONNUMBER~SCHTYPE~CONTREFNO~COMP~STDATE~ENDDT~NOOFSCHEDULES~FREQUENCY~FREQUENCYUNIT~AMOUNT~SCHFLAG","BLK_LBVWS_SCHEDULE_SUMMARY":"DUEDT~CONTRREFNO~CURRENCY_AMT_DUE~TXTTOTALAMOUNTDUE~TXTTOTALAMTSETTLED~TXTTOTALAMTADJUSTED~TXTEXPECTEDBALANCE~TOTAL_ADJUSTED_AMOUNT~TOTAL_AMOUNT_SETTLED~TOTAL_AMOUNT_DUE","BLK_LBVWS_PAYBYDT_SCHEDULE_SUMMARY":"PAY_BY_DATE~CONTRACT_REF_NO~CURRENCY_AMT_DUE~TXTTOTALAMOUNTDUE~TXTTOTALAMTSETTLED~TXTTOTALAMTADJUSTED~TXTEXPECTEDBALANCE~TOTAL_ADJUSTED_AMOUNT~TOTAL_AMOUNT_SETTLED~TOTAL_AMOUNT_DUE","BLK_OLTBS_AMOUNT_DUE":"CONREFNUM~CURRENCY_AMT_DUE~CONTCCY~DUEDAT~COMPO~ADJAMT~AMTSETT~AMTDUE~TXTEXPECTEDBALANC~PAY_BY_DATE","BLK_OLVWS_AMOUNT_SETTLED":"CONTRAREF~PAIDDATE~LCY~CURRENCY_SETTLED~TXTINPUTDATE~TXTLCYEQUASETT~AMNTSETTLED~MAKER_DT_STAMP~LCY_EQUIVALENT_SETTLED~COMPONENT~DUE_DATE","BLK_LBTBS_SYNDICATION_MASTER_FESCH":"CONTREFNO~COUNTERPARTY~CURRENCY~AMOUNT~BRANCH~FACSTDT~FACENDT~INTAGENCYID~AGENCYTYPE~AGENTCIF~TRSTDT~TRENDT~MINAMT~MAXTRCAMT~CUSIPNO~EVENTSEQNO~VERSIONNO~USRDEFSTAT~SUBSYSSTAT","BLK_LFTBS_CONTRACT_FEE_FESCH":"CONTRACTREFNO~COMPONENT~CURRENCY~COMPSTATUS~ASSOCIATIONDATE~STARTDATE~ENDDATE~BILLINGNOTICEDAYS~BILLINGNOTICEREQUIRED~DISCACCRAPPLICABLE~FEECOLLECTIONMODE~FEEREVERSED~FEERULE~INTERESTBASIS~LIQDPREFERENCE~EVENTSEQNO","BLK_LFTBS_FAS91_FEE_MASTER_FESCH":"CONTRACTREFNO~EVENTSEQNO~COMPONENT~FEESTOAMORTIZE~FEESTORECOGNIZE~ORIGINATOR~ORIGINATORMISCODE~PASSACCTENTRY~TOTALCITIFEES~TOTALNONCITIFEES~WTDAVERAGEYIELD"};

var multipleEntryPageSize = {"BLK_OLTBS_CONTRACT_SCHEDULES_MULTI" :"15" ,"BLK_LBVWS_PAYBYDT_SCHEDULE_SUMMARY" :"15" ,"BLK_OLTBS_AMOUNT_DUE" :"15" ,"BLK_OLVWS_AMOUNT_SETTLED" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_FEESCH__TAB_MAIN":"BLK_OLTBS_CONTRACT_SCHEDULES_MULTI","CVS_PAY_SCH__TAB_MAIN":"BLK_LBVWS_PAYBYDT_SCHEDULE_SUMMARY~BLK_OLTBS_AMOUNT_DUE~BLK_OLVWS_AMOUNT_SETTLED"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTBS_CONTRACT_SCHEDULES_FESCH">VERSIONNO~SCHEDULETYPE~CONTRACTREFNO~COMPONENT~STARTDATE~TXTUSERREFNO~TXTCUSTOMER~TXTCUSTNAME~TXTFACILITYNAME~TXTPRODCODE~TXTPRODDESC~TXTPRODTYPE~TXTCONTREFNO1~TXTPRODCODE1~TXTPRODDESC1~TXTUSERREFNO1~TXTCUSTOMER1~TXTCUSTNAME1~CONTCCY~ORGACTCOD~ONCEAUTH_FLAG</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONTRACT_SCHEDULES_FESCH" RELATION_TYPE="N" TYPE="BLK_OLTBS_CONTRACT_SCHEDULES_MULTI">VERSIONNUMBER~SCHTYPE~CONTREFNO~COMP~STDATE~ENDDT~NOOFSCHEDULES~FREQUENCY~FREQUENCYUNIT~AMOUNT~SCHFLAG</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONTRACT_SCHEDULES_MULTI" RELATION_TYPE="N" TYPE="BLK_LBVWS_SCHEDULE_SUMMARY">DUEDT~CONTRREFNO~CURRENCY_AMT_DUE~TXTTOTALAMOUNTDUE~TXTTOTALAMTSETTLED~TXTTOTALAMTADJUSTED~TXTEXPECTEDBALANCE~TOTAL_ADJUSTED_AMOUNT~TOTAL_AMOUNT_SETTLED~TOTAL_AMOUNT_DUE</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONTRACT_SCHEDULES_MULTI" RELATION_TYPE="N" TYPE="BLK_LBVWS_PAYBYDT_SCHEDULE_SUMMARY">PAY_BY_DATE~CONTRACT_REF_NO~CURRENCY_AMT_DUE~TXTTOTALAMOUNTDUE~TXTTOTALAMTSETTLED~TXTTOTALAMTADJUSTED~TXTEXPECTEDBALANCE~TOTAL_ADJUSTED_AMOUNT~TOTAL_AMOUNT_SETTLED~TOTAL_AMOUNT_DUE</FN>'; 
msgxml += '      <FN PARENT="BLK_LBVWS_PAYBYDT_SCHEDULE_SUMMARY" RELATION_TYPE="N" TYPE="BLK_OLTBS_AMOUNT_DUE">CONREFNUM~CURRENCY_AMT_DUE~CONTCCY~DUEDAT~COMPO~ADJAMT~AMTSETT~AMTDUE~TXTEXPECTEDBALANC~PAY_BY_DATE</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_AMOUNT_DUE" RELATION_TYPE="N" TYPE="BLK_OLVWS_AMOUNT_SETTLED">CONTRAREF~PAIDDATE~LCY~CURRENCY_SETTLED~TXTINPUTDATE~TXTLCYEQUASETT~AMNTSETTLED~MAKER_DT_STAMP~LCY_EQUIVALENT_SETTLED~COMPONENT~DUE_DATE</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONTRACT_SCHEDULES_FESCH" RELATION_TYPE="1" TYPE="BLK_LBTBS_SYNDICATION_MASTER_FESCH">CONTREFNO~COUNTERPARTY~CURRENCY~AMOUNT~BRANCH~FACSTDT~FACENDT~INTAGENCYID~AGENCYTYPE~AGENTCIF~TRSTDT~TRENDT~MINAMT~MAXTRCAMT~CUSIPNO~EVENTSEQNO~VERSIONNO~USRDEFSTAT~SUBSYSSTAT</FN>'; 
msgxml += '      <FN PARENT="BLK_LBTBS_SYNDICATION_MASTER_FESCH" RELATION_TYPE="N" TYPE="BLK_LFTBS_CONTRACT_FEE_FESCH">CONTRACTREFNO~COMPONENT~CURRENCY~COMPSTATUS~ASSOCIATIONDATE~STARTDATE~ENDDATE~BILLINGNOTICEDAYS~BILLINGNOTICEREQUIRED~DISCACCRAPPLICABLE~FEECOLLECTIONMODE~FEEREVERSED~FEERULE~INTERESTBASIS~LIQDPREFERENCE~EVENTSEQNO</FN>'; 
msgxml += '      <FN PARENT="BLK_LFTBS_CONTRACT_FEE_FESCH" RELATION_TYPE="N" TYPE="BLK_LFTBS_FAS91_FEE_MASTER_FESCH">CONTRACTREFNO~EVENTSEQNO~COMPONENT~FEESTOAMORTIZE~FEESTORECOGNIZE~ORIGINATOR~ORIGINATORMISCODE~PASSACCTENTRY~TOTALCITIFEES~TOTALNONCITIFEES~WTDAVERAGEYIELD</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_FEESCH";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_OLTBS_CONTRACT_SCHEDULES_FESCH" : "","BLK_OLTBS_CONTRACT_SCHEDULES_MULTI" : "BLK_OLTBS_CONTRACT_SCHEDULES_FESCH~N","BLK_LBVWS_SCHEDULE_SUMMARY" : "BLK_OLTBS_CONTRACT_SCHEDULES_MULTI~N","BLK_LBVWS_PAYBYDT_SCHEDULE_SUMMARY" : "BLK_OLTBS_CONTRACT_SCHEDULES_MULTI~N","BLK_OLTBS_AMOUNT_DUE" : "BLK_LBVWS_PAYBYDT_SCHEDULE_SUMMARY~N","BLK_OLVWS_AMOUNT_SETTLED" : "BLK_OLTBS_AMOUNT_DUE~N","BLK_LBTBS_SYNDICATION_MASTER_FESCH" : "BLK_OLTBS_CONTRACT_SCHEDULES_FESCH~1","BLK_LFTBS_CONTRACT_FEE_FESCH" : "BLK_LBTBS_SYNDICATION_MASTER_FESCH~N","BLK_LFTBS_FAS91_FEE_MASTER_FESCH" : "BLK_LFTBS_CONTRACT_FEE_FESCH~N"}; 

 var dataSrcLocationArray = new Array("BLK_OLTBS_CONTRACT_SCHEDULES_FESCH","BLK_OLTBS_CONTRACT_SCHEDULES_MULTI","BLK_LBVWS_SCHEDULE_SUMMARY","BLK_LBVWS_PAYBYDT_SCHEDULE_SUMMARY","BLK_OLTBS_AMOUNT_DUE","BLK_OLVWS_AMOUNT_SETTLED","BLK_LBTBS_SYNDICATION_MASTER_FESCH","BLK_LFTBS_CONTRACT_FEE_FESCH","BLK_LFTBS_FAS91_FEE_MASTER_FESCH"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LFCFESCH.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LFCFESCH.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_OLTBS_CONTRACT_SCHEDULES_FESCH__CONTRACTREFNO";
pkFields[0] = "BLK_OLTBS_CONTRACT_SCHEDULES_FESCH__CONTRACTREFNO";
queryFields[1] = "BLK_OLTBS_CONTRACT_SCHEDULES_FESCH__VERSIONNO";
pkFields[1] = "BLK_OLTBS_CONTRACT_SCHEDULES_FESCH__VERSIONNO";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_OLTBS_CONTRACT_SCHEDULES_MULTI":["AMOUNT","COMP","ENDDTI","FREQUENCY","FREQUENCYUNIT","NOOFSCHEDULES","STDATEI"]};
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
var lovInfoFlds = {"BLK_OLTBS_CONTRACT_SCHEDULES_MULTI__COMP__LOV_COMPONENT":["BLK_OLTBS_CONTRACT_SCHEDULES_MULTI__COMP~~~","BLK_OLTBS_CONTRACT_SCHEDULES_FESCH__TXTPRODCODE!VARCHAR2","N~N~N",""]};
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
var multipleEntryIDs = new Array("BLK_OLTBS_CONTRACT_SCHEDULES_MULTI","BLK_LBVWS_PAYBYDT_SCHEDULE_SUMMARY","BLK_OLTBS_AMOUNT_DUE","BLK_OLVWS_AMOUNT_SETTLED");
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

ArrFuncOrigin["LFCFESCH"]="KERNEL";
ArrPrntFunc["LFCFESCH"]="";
ArrPrntOrigin["LFCFESCH"]="";
ArrRoutingType["LFCFESCH"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LFCFESCH"]="N";
ArrCustomModified["LFCFESCH"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_FEESCH":"CONTRACTREFNO","CVS_PAY_SCH":"TXTCONTREFNO1~TXTUSERREFNO1~TXTPRODCODE1~TXTPRODDESC1~TXTCUSTOMER1~TXTCUSTNAME1"};
var scrArgSource = {"CVS_PAY_SCH":"BLK_OLTBS_CONTRACT_SCHEDULES_FESCH__CONTRACTREFNO~BLK_OLTBS_CONTRACT_SCHEDULES_FESCH__TXTUSERREFNO~BLK_OLTBS_CONTRACT_SCHEDULES_FESCH__TXTPRODCODE~BLK_OLTBS_CONTRACT_SCHEDULES_FESCH__TXTPRODDESC~BLK_OLTBS_CONTRACT_SCHEDULES_FESCH__TXTCUSTOMER~BLK_OLTBS_CONTRACT_SCHEDULES_FESCH__TXTCUSTNAME"};
var scrArgVals = {"CVS_FEESCH":"","CVS_PAY_SCH":"~~~~~"};
var scrArgDest = {"CVS_FEESCH":"BLK_OLTBS_CONTRACT_SCHEDULES_FESCH__CONTRACTREFNO","CVS_PAY_SCH":"BLK_OLTBS_CONTRACT_SCHEDULES_FESCH__TXTCONTREFNO1~BLK_OLTBS_CONTRACT_SCHEDULES_FESCH__TXTUSERREFNO1~BLK_OLTBS_CONTRACT_SCHEDULES_FESCH__TXTPRODCODE1~BLK_OLTBS_CONTRACT_SCHEDULES_FESCH__TXTPRODDESC1~BLK_OLTBS_CONTRACT_SCHEDULES_FESCH__TXTCUSTOMER1~BLK_OLTBS_CONTRACT_SCHEDULES_FESCH__TXTCUSTNAME1"};
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