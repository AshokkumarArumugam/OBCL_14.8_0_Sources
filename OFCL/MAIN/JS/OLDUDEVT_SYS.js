/***************************************************************************************************************************
**  This source is part of the Oracle Banking Software Product. 
**  Copyright (c) 2008 ,2025, Oracle and/or its affiliates.
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
**  File Name          : OLDUDEVT_SYS.js
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
var fieldNameArray = {"BLK_OLVWS_CONTRACT_EVENT":"AMTCHECK~MODULECODE~COUNTERPARTY~CONTCCY~LATEVNTSEQNO~CONTSTATUS~DISCONTSTATUS~BRANCH~SUBSYSTEMSTAT~FCCREF~CURRENT_EVENT_UI~TOTAL_EVENT_UI~AUTHSTAT","BLK_OLVWS_CONTRACT_LIQ_SUMMARY":"VALUEDATE~PAYREMARK~EVNTCODE~EVENTDESC~ESN~FCCREF","BLK_OLVWS_CONTRACT_LIQ":"CCY~AMTPAID~COMPONENT~ESN~FCCREF~UI_DESCRIPTION","BLK_AUDIT":"REVRCHECKERSTAMP~MAKERID~CHECKERID~REVRCHECKERID~REVRMAKERID~REVRMAKERSTAMP~CHECKERSTAMP~MAKERSTAMP~AUTHSTAT~TXNSTAT"};

var multipleEntryPageSize = {"BLK_OLVWS_CONTRACT_LIQ" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_EVENT__TAB_MAIN":"BLK_OLVWS_CONTRACT_LIQ"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLVWS_CONTRACT_EVENT">AMTCHECK~MODULECODE~COUNTERPARTY~CONTCCY~LATEVNTSEQNO~CONTSTATUS~DISCONTSTATUS~BRANCH~SUBSYSTEMSTAT~FCCREF~CURRENT_EVENT_UI~TOTAL_EVENT_UI~AUTHSTAT</FN>'; 
msgxml += '      <FN PARENT="BLK_OLVWS_CONTRACT_EVENT" RELATION_TYPE="1" TYPE="BLK_OLVWS_CONTRACT_LIQ_SUMMARY">VALUEDATE~PAYREMARK~EVNTCODE~EVENTDESC~ESN~FCCREF</FN>'; 
msgxml += '      <FN PARENT="BLK_OLVWS_CONTRACT_EVENT" RELATION_TYPE="N" TYPE="BLK_OLVWS_CONTRACT_LIQ">CCY~AMTPAID~COMPONENT~ESN~FCCREF~UI_DESCRIPTION</FN>'; 
msgxml += '      <FN PARENT="BLK_OLVWS_CONTRACT_EVENT" RELATION_TYPE="1" TYPE="BLK_AUDIT">REVRCHECKERSTAMP~MAKERID~CHECKERID~REVRCHECKERID~REVRMAKERID~REVRMAKERSTAMP~CHECKERSTAMP~MAKERSTAMP~AUTHSTAT~TXNSTAT</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_EVENT";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** FCJ XML FOR SUMMARY SCREEN *****
//----------------------------------------------------------------------------------------------------------------------
var msgxml_sum=""; 
msgxml_sum += '    <FLD>'; 
msgxml_sum += '      <FN PARENT="BLK_OLVWS_CONTRACT_EVENT" RELATION_TYPE="1" TYPE="BLK_SUMMARY">AUTHSTA~CONTSTATUS~FCCREF~CCY1~CPTY1~CUSTNAME1~BRANCH1~PAYMENTSTATUS1~MODCODE~EVENTSEQNO1</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "OLDUDEVT";
var defaultWhereClause = "BRANCH=GLOBAL.CURRENT_BRANCH";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_SUMMARY";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_OLVWS_CONTRACT_EVENT" : "","BLK_OLVWS_CONTRACT_LIQ_SUMMARY" : "BLK_OLVWS_CONTRACT_EVENT~1","BLK_OLVWS_CONTRACT_LIQ" : "BLK_OLVWS_CONTRACT_EVENT~N","BLK_AUDIT" : "BLK_OLVWS_CONTRACT_EVENT~1"}; 

 var dataSrcLocationArray = new Array("BLK_OLVWS_CONTRACT_EVENT","BLK_OLVWS_CONTRACT_LIQ_SUMMARY","BLK_OLVWS_CONTRACT_LIQ","BLK_AUDIT"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLDUDEVT.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLDUDEVT.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_OLVWS_CONTRACT_EVENT__FCCREF";
pkFields[0] = "BLK_OLVWS_CONTRACT_EVENT__FCCREF";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_OLVWS_CONTRACT_EVENT":["AMTCHECK","CONTCCY","CONTSTATUS","COUNTERPARTY","DISCONTSTATUS"],"BLK_OLVWS_CONTRACT_LIQ_SUMMARY":["PAYREMARK","VALUEDATEI"],"BLK_OLVWS_CONTRACT_LIQ":["AMTPAID","CCY"]};
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
var lovInfoFlds = {"BLK_OLVWS_CONTRACT_EVENT__FCCREF__LOV_REFERENCE":["BLK_OLVWS_CONTRACT_EVENT__FCCREF~BLK_OLVWS_CONTRACT_EVENT__CONTCCY~BLK_OLVWS_CONTRACT_EVENT__COUNTERPARTY~~BLK_OLVWS_CONTRACT_EVENT__CONTSTATUS~BLK_OLVWS_CONTRACT_EVENT__MODULECODE~","BLK_UDVWS_CONTRACT_EVENT__BRANCH!VARCHAR2","N~N~N~N~N~N",""],"BLK_OLVWS_CONTRACT_LIQ_SUMMARY__EVNTCODE__LOV_EVENT":["BLK_OLVWS_CONTRACT_LIQ_SUMMARY__EVNTCODE~BLK_OLVWS_CONTRACT_LIQ_SUMMARY__EVENTDESC~","BLK_OLVWS_CONTRACT_EVENT__FCCREF!VARCHAR2","N~N",""],"BLK_OLVWS_CONTRACT_LIQ__CCY__LOV_CCY_CODE":["BLK_OLVWS_CONTRACT_LIQ__CCY~~","","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_OLVWS_CONTRACT_LIQ");
var multipleEntryArray = new Array();
var multipleEntryCells = new Array();
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY VIEW SINGLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR ATTACHED CALLFORMS *****
 //----------------------------------------------------------------------------------------------------------------------

 var CallFormArray= new Array("OLCTRMIS~BLK_OLVWS_CONTRACT_EVENT","OLCONDET~BLK_OLVWS_CONTRACT_EVENT","TXCTRTAX~BLK_OLVWS_CONTRACT_EVENT","LFCTRCHG~BLK_OLVWS_CONTRACT_EVENT","OLCTRUDF~BLK_OLVWS_CONTRACT_EVENT"); 

 var CallFormRelat=new Array("OLVWS_CONTRACT_EVENT.FCCREF = OLTBS_CONTRACT__MIS.CONTRACT_REF_NO","OLVWS_CONTRACT_EVENT.FCCREF = OLTBS_CONTRACT__SETT.CONTRACT_REF_NO AND OLVWS_CONTRACT_EVENT.LATEVNTSEQNO = OLTBS_CONTRACT__SETT.LATEST_EVENT_SEQ_NO","OLVWS_CONTRACT_EVENT.FCCREF = OLTBS_CONTRACT__TAX.CONTRACT_REF_NO","OLVWS_CONTRACT_EVENT.FCCREF = OLTBS_CONTRACT__CHG.CONTRACT_REF_NO","OLVWS_CONTRACT_EVENT.FCCREF = OLTBS_CONTRACT__FLD.CONTRACT_REF_NO"); 

 var CallRelatType= new Array("1","1","1","1","1"); 


 var ArrFuncOrigin=new Array();
 var ArrPrntFunc=new Array();
 var ArrPrntOrigin=new Array();
 var ArrRoutingType=new Array();


 // Code for Loading Cluster/Custom js File Starts
 var ArrClusterModified=new Array();
 var ArrCustomModified=new Array();
 // Code for Loading Cluster/Custom js File ends

ArrFuncOrigin["OLDUDEVT"]="KERNEL";
ArrPrntFunc["OLDUDEVT"]="";
ArrPrntOrigin["OLDUDEVT"]="";
ArrRoutingType["OLDUDEVT"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLDUDEVT"]="N";
ArrCustomModified["OLDUDEVT"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"OLCTRMIS":"CONTREF~ESN~PRDCD~BRNCD","OLCONDET":"CONREFNO~ESN","TXCTRTAX":"CONTREF~ESN","LFCTRCHG":"CONTREF~ESN~MODULECODE","OLCTRUDF":"","OLDEVENT":"CONTREF~ACTION_CODE~"};
var scrArgSource = {"OLCTRMIS":"BLK_OLVWS_CONTRACT_EVENT__FCCREF~BLK_OLVWS_CONTRACT_EVENT__LATEVNTSEQNO~~BLK_OLVWS_CONTRACT_EVENT__BRANCH","OLCONDET":"BLK_OLVWS_CONTRACT_EVENT__FCCREF~BLK_OLVWS_CONTRACT_EVENT__LATEVNTSEQNO","TXCTRTAX":"BLK_OLVWS_CONTRACT_EVENT__FCCREF~BLK_OLVWS_CONTRACT_EVENT__LATEVNTSEQNO","LFCTRCHG":"BLK_OLVWS_CONTRACT_EVENT__FCCREF~BLK_OLVWS_CONTRACT_EVENT__LATEVNTSEQNO~BLK_OLVWS_CONTRACT_EVENT__MODULECODE","OLCTRUDF":"","OLDEVENT":"BLK_OLVWS_CONTRACT_EVENT__FCCREF~~"};
var scrArgVals = {"OLCTRMIS":"~~~","OLCONDET":"~","TXCTRTAX":"~","LFCTRCHG":"~~","OLCTRUDF":"","OLDEVENT":"~EXECUTEQUERY~"};
var scrArgDest = {};
//***** CODE FOR SUB-SYSTEM DEPENDENT  FIELDS   *****
//----------------------------------------------------------------------------------------------------------------------
var dpndntOnFlds = {"OLCTRMIS":"","OLCONDET":"","TXCTRTAX":"","LFCTRCHG":"","OLCTRUDF":""};
var dpndntOnSrvs = {"OLCTRMIS":"","OLCONDET":"","TXCTRTAX":"","LFCTRCHG":"","OLCTRUDF":""};
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