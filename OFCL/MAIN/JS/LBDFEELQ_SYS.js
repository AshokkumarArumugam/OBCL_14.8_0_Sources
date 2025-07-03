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
**  File Name          : LBDFEELQ_SYS.js
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
var fieldNameArray = {"BLK_OLTBS_CONTRACT_PAY":"CONREFNO~USEREFNO~PRDCD~PRODDESC~PRODTYPDESC~CPTY~CPTYNAME~FACNAME~BRN~TREASUR~VALDT~VALUE_DATE~LIMITDT~LIMIT_DATE~CURRPMNT~TOTPAMNT~SCHEDULEDATE~EXTERNALTRANREFNO~EVENTSEQNO~REMARKS~FEEBPSRATE~TXTVERSON~PRDTYPE~MODULE~CONTRACTSTAT~LATESTEVENTSEQNO~CONTRENO~COMPO~LATESTVERNO~SUBSYSSTAT~TXTTOTCOMPRATIO~TXTTOTCOMPAMT~ECAREQSTATUS","BLK_LFTBS_CONTRACT_LIQ_SUMMARY_MULTI":"WAIVER~CASHPROP~CMP~CCY~LIQDPREF~WAIVERAMT~AMTDUE~AMTPAID~CONRENO~EVESEQNO~TXTTOTCOMPRATIO~TXTTOTCOMPAMT","BLK_LFTBS_CONTRACT_LIQ":"DUEDT~AMOUNTDUE~AMOUNTPAID~REFNO~COMPON~EVSEQNO~TXTPENDINGAMTDUE","BLK_LBTBS_PARTICIPANT_RATIO":"CUSTNO~CUSTNAME~COMPRATIO~COMPAMT~FEEBPSRT~FEEBPSRTAPP~CONRNO~ESNO~CONTTYPE~DRAWDOWNNO~COMPTYPE~COMPON~VALUEDAT~SSIMNEMONIC~SSIPICKUP_AT~SETTLEMENTSEQNO","BLK_OLTBS_CONTRACT_EVENT_LOG":"MAKERID~MAKERDTSTAMP~CHKID~CHKDTSTAMP~CONTSTAT~AUTHSTAT~PARTPROCSTAT~REVMAKID~REVMAKDT~REVCHKID~REVCHKDTSTAMP~CONTRFNO~EVSENO"};

var multipleEntryPageSize = {"BLK_LFTBS_CONTRACT_LIQ_SUMMARY_MULTI" :"15" ,"BLK_LFTBS_CONTRACT_LIQ" :"15" ,"BLK_LBTBS_PARTICIPANT_RATIO" :"15" };

var multipleEntrySVBlocks = "BLK_LFTBS_CONTRACT_LIQ_SUMMARY_MULTI";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_LFTBS_CONTRACT_LIQ_SUMMARY_MULTI~BLK_LFTBS_CONTRACT_LIQ","CVS_MAIN__TAB_MAIN1":"BLK_LBTBS_PARTICIPANT_RATIO"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTBS_CONTRACT_PAY">CONREFNO~USEREFNO~PRDCD~PRODDESC~PRODTYPDESC~CPTY~CPTYNAME~FACNAME~BRN~TREASUR~VALDT~VALUE_DATE~LIMITDT~LIMIT_DATE~CURRPMNT~TOTPAMNT~SCHEDULEDATE~EXTERNALTRANREFNO~EVENTSEQNO~REMARKS~FEEBPSRATE~TXTVERSON~PRDTYPE~MODULE~CONTRACTSTAT~LATESTEVENTSEQNO~CONTRENO~COMPO~LATESTVERNO~SUBSYSSTAT~TXTTOTCOMPRATIO~TXTTOTCOMPAMT~ECAREQSTATUS</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONTRACT_PAY" RELATION_TYPE="N" TYPE="BLK_LFTBS_CONTRACT_LIQ_SUMMARY_MULTI">WAIVER~CASHPROP~CMP~CCY~LIQDPREF~WAIVERAMT~AMTDUE~AMTPAID~CONRENO~EVESEQNO~TXTTOTCOMPRATIO~TXTTOTCOMPAMT</FN>'; 
msgxml += '      <FN PARENT="BLK_LFTBS_CONTRACT_LIQ_SUMMARY_MULTI" RELATION_TYPE="N" TYPE="BLK_LFTBS_CONTRACT_LIQ">DUEDT~AMOUNTDUE~AMOUNTPAID~REFNO~COMPON~EVSEQNO~TXTPENDINGAMTDUE</FN>'; 
msgxml += '      <FN PARENT="BLK_LFTBS_CONTRACT_LIQ_SUMMARY_MULTI" RELATION_TYPE="N" TYPE="BLK_LBTBS_PARTICIPANT_RATIO">CUSTNO~CUSTNAME~COMPRATIO~COMPAMT~FEEBPSRT~FEEBPSRTAPP~CONRNO~ESNO~CONTTYPE~DRAWDOWNNO~COMPTYPE~COMPON~VALUEDAT~SSIMNEMONIC~SSIPICKUP_AT~SETTLEMENTSEQNO</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONTRACT_PAY" RELATION_TYPE="1" TYPE="BLK_OLTBS_CONTRACT_EVENT_LOG">MAKERID~MAKERDTSTAMP~CHKID~CHKDTSTAMP~CONTSTAT~AUTHSTAT~PARTPROCSTAT~REVMAKID~REVMAKDT~REVCHKID~REVCHKDTSTAMP~CONTRFNO~EVSENO</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_LFVWS_PYMNT_SMRY">AUTHSTATUS~CONTRACTSTATUS~CONREFNO~VALDT~LIMITDT~CPTY~CUSTNAME~BOOKDATE~CCY~AMTPAID</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "LBDFEELQ";
var defaultWhereClause = "sypks_utils.get_branch(CONREFNO)=GLOBAL.CURRENT_BRANCH and MODULECODE<>'OL'";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_LFVWS_PYMNT_SMRY";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_OLTBS_CONTRACT_PAY" : "","BLK_LFTBS_CONTRACT_LIQ_SUMMARY_MULTI" : "BLK_OLTBS_CONTRACT_PAY~N","BLK_LFTBS_CONTRACT_LIQ" : "BLK_LFTBS_CONTRACT_LIQ_SUMMARY_MULTI~N","BLK_LBTBS_PARTICIPANT_RATIO" : "BLK_LFTBS_CONTRACT_LIQ_SUMMARY_MULTI~N","BLK_OLTBS_CONTRACT_EVENT_LOG" : "BLK_OLTBS_CONTRACT_PAY~1"}; 

 var dataSrcLocationArray = new Array("BLK_OLTBS_CONTRACT_PAY","BLK_LFTBS_CONTRACT_LIQ_SUMMARY_MULTI","BLK_LFTBS_CONTRACT_LIQ","BLK_LBTBS_PARTICIPANT_RATIO","BLK_OLTBS_CONTRACT_EVENT_LOG"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LBDFEELQ.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LBDFEELQ.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_OLTBS_CONTRACT_PAY__CONREFNO";
pkFields[0] = "BLK_OLTBS_CONTRACT_PAY__CONREFNO";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
var modifyAmendArr = new Array(); 
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
var lovInfoFlds = {"BLK_OLTBS_CONTRACT_PAY__CONREFNO__LOV_CONTRACT":["BLK_OLTBS_CONTRACT_PAY__CONREFNO~BLK_OLTBS_CONTRACT_PAY__USEREFNO~BLK_OLTBS_CONTRACT_PAY__PRDCD~BLK_OLTBS_CONTRACT_PAY__PRODDESC~BLK_OLTBS_CONTRACT_PAY__CPTY~BLK_OLTBS_CONTRACT_PAY__CPTYNAME~BLK_OLTBS_CONTRACT_PAY__BRN~BLK_OLTBS_CONTRACT_PAY__FACNAME~","","N~N~N~N~N~N~N~N",""],"BLK_LFVWS_PYMNT_SMRY__CPTY__LOV_CUSTNAME_S":["BLK_LFVWS_PYMNT_SMRY__CPTY~BLK_LFVWS_PYMNT_SMRY__CUSTNAME~~","","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_LFTBS_CONTRACT_LIQ_SUMMARY_MULTI","BLK_LFTBS_CONTRACT_LIQ","BLK_LBTBS_PARTICIPANT_RATIO");
var multipleEntryArray = new Array();
var multipleEntryCells = new Array();
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY VIEW SINGLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR ATTACHED CALLFORMS *****
 //----------------------------------------------------------------------------------------------------------------------

 var CallFormArray= new Array("OLCONDET~BLK_OLTBS_CONTRACT_PAY","LBCADVIC~BLK_OLTBS_CONTRACT_PAY","LBCPRTAX~BLK_OLTBS_CONTRACT_PAY"); 

 var CallFormRelat=new Array("OLTBS_CONTRACT__PAY.CONTRACT_REF_NO=OLTBS_CONTRACT__SETT.CONTRACT_REF_NO","OLTBS_CONTRACT__PAY.CONTRACT_REF_NO=OLTBS_GTEMP_EVENT_ADVICE.CONTRACT_REF_NO AND OLTBS_CONTRACT__PAY.LATEST_EVENT_SEQ_NO=OLTBS_GTEMP_EVENT_ADVICE.EVENT_SEQ_NO","OLTBS_CONTRACT__PAY.CONTRACT_REF_NO=OLTBS_CONTRACT__TAX.CONTRACT_REF_NO"); 

 var CallRelatType= new Array("1","1","1"); 


 var ArrFuncOrigin=new Array();
 var ArrPrntFunc=new Array();
 var ArrPrntOrigin=new Array();
 var ArrRoutingType=new Array();


 // Code for Loading Cluster/Custom js File Starts
 var ArrClusterModified=new Array();
 var ArrCustomModified=new Array();
 // Code for Loading Cluster/Custom js File ends

ArrFuncOrigin["LBDFEELQ"]="KERNEL";
ArrPrntFunc["LBDFEELQ"]="";
ArrPrntOrigin["LBDFEELQ"]="";
ArrRoutingType["LBDFEELQ"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LBDFEELQ"]="N";
ArrCustomModified["LBDFEELQ"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"OLCONDET":"CONREFNO~ESN","LBCADVIC":"CONTREFNO~EVNTSEQNO","LBCPRTAX":"CONTRACTREFNO~","OLDEVENT":"CONTREF~ACTION_CODE"};
var scrArgSource = {"OLCONDET":"BLK_OLTBS_CONTRACT_PAY__CONREFNO~BLK_OLTBS_CONTRACT_PAY__LATESTEVENTSEQNO","LBCADVIC":"BLK_OLTBS_CONTRACT_PAY__CONREFNO~BLK_OLTBS_CONTRACT_PAY__LATESTEVENTSEQNO","LBCPRTAX":"BLK_OLTBS_CONTRACT_PAY__CONREFNO~","OLDEVENT":"BLK_OLTBS_CONTRACT_PAY__CONREFNO~"};
var scrArgVals = {"OLCONDET":"~","LBCADVIC":"~","LBCPRTAX":"~","OLDEVENT":"~EXECUTEQUERY"};
var scrArgDest = {};
//***** CODE FOR SUB-SYSTEM DEPENDENT  FIELDS   *****
//----------------------------------------------------------------------------------------------------------------------
var dpndntOnFlds = {"OLCONDET":"","LBCADVIC":"","LBCPRTAX":""};
var dpndntOnSrvs = {"OLCONDET":"","LBCADVIC":"","LBCPRTAX":""};
//***** CODE FOR TAB DEPENDENT  FIELDS   *****
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR CALLFORM TABS *****
//----------------------------------------------------------------------------------------------------------------------
var callformTabArray = new Array(); 
//***** CODE FOR ACTION STAGE DETAILS *****
//----------------------------------------------------------------------------------------------------------------------
var actStageArry = {"QUERY":"2","NEW":"2","MODIFY":"2","AUTHORIZE":"2","DELETE":"2","CLOSE":"1","REOPEN":"1","REVERSE":"2","ROLLOVER":"1","CONFIRM":"1","LIQUIDATE":"1","SUMMARYQUERY":"2"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------