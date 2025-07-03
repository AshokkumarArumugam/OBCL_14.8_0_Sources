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
**  File Name          : OLDPMNT_SYS.js
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
var fieldNameArray = {"BLK_OLVWS_PAYMENT_SUMMARY":"CCY~PAYMNTREM~PREPMTADJAMT2~PREPMTADJAMT1~PREPMTPENAMT~PREPMTPENRATE~LIQDFACEVAL~LIMITAMT~DISCRATE~TOTPAID~OSBAL~STATUS~CPTY~EVENTSEQNO~FCCREF_OLD~XREF~BRANCH~DEPARTCODE~TREASSOURCE~OVDMEMOPOSTING~DDAADVREQ~INTWAIVERAMT~INTWAIVER~PAYSCHDPROCESS~EXTTRNREFNO~LIQDDEP~REAPPINTPREPAIDAMT~REAPPINTOUTAMT~LIQDINTPREPAIDPRIN~PREPAIDPRINTRATE~ALLOWTAXREFUND~OSBALREP~MODULECODE~PRODCODE~LATEVNTSEQNO~CURREVNTSEQNO~LATVERNO~CURRVERUI~TOTVERNOUI~NETAMTDUE~LCYEQVTTOTPAID~LCYEQVTLIMITAMT~LCYEQVTLIQDFACEVALUE~SUBSYSSTAT~NEGATIVEAMOUNTSETTLED~VALDT~LIMITDT~TOTPAMNT~CURRPMNT~LIQDORDER~LCY_CCY~LCYTOTAL~LCYPREPAID~LCYLIMIT~ECAREQSTATUS~MAT_DATE_UI~PAYMENTSTATUSUI~RESID_FLAG~REDTENOR~CONTRACTSTATUSUI~CPTYNAME~MATDT~ACTION_UI~INTREFREQ~CONTRACTREFNOP~PROCESSREFNUM~CHANNELREFNUM~CLOSE_RVLNG_LOAN~PAYMENT_CCY~SPOT_RATE~CURR_ACTION_CODE~VALUE_DATE_UI~LIMIT_DATE_UI~PREPAIDPRINAMT~UI_NETPAID~UI_NETWAIVED~UI_LCYEQVNETPAID~UI_LCYEQVNETWAIVED~UI_NETCAP~UI_LCYEQVNETCAP","BLK_OLVWS_PAYMENT_BREAKUP":"FCCREF~COMP~AMTDUE~OVERDUE~AMTPAID~TAXPAID~PAY_RECEIVE~EVENTSEQNO~AMTWAIVED~AMTCAPITALIZED","BLK_AUDITTRIAL":"TRNTYPE~WRKFLWSTATUS~AUTHSTAT~TXNSTAT~EVENTCODE~EVENTDATE~EVNTSEQNO~CHKDTSTAMP~CHKID~MAKDTSTAMP~MAKID~CONTREFNO~MODULE~CONTSTATUSUI~AUTHSTATUSUI~WRKFLWSTATUSUI","BLK_SCH_DTLS":"BASIS_AMOUNT~AMOUNT_SETTLED~EVENT_SEQ_NO~PAID_DATE~DUE_DATE~COMPONENT~CONTRACT_REF_NO","BLK_AMOUNT_SCH_DTLS":"AMTCCY~COMPTNT~CONTREFNO~DUEDATE~COMPDESC~OVERDUEAMT~DUEAMOUNT~EXPECTED_BALANCE","BLK_OLTBS_CONTRACT_CONTROL":"CONTRACTREFNO~ENTRYBY~PROCESSCODE","BLK_TRAN":"ACBRN~ACCCY~ACNO~AMTTAG~DRCRIND~EVENTSRNO~LCYAMT~RELREF~TRNREFNO~TXINITDATE","BLK_SCHBREAKUP_HDR":"","BLK_OLVWS_PAYMENT_REFUND":"CONTRACT_REF_NO~EVENT_SEQ_NO~AMOUNT_DUE~REFUND_AMT"};

var multipleEntryPageSize = {"BLK_OLVWS_PAYMENT_BREAKUP" :"15" ,"BLK_SCH_DTLS" :"15" ,"BLK_AMOUNT_SCH_DTLS" :"15" ,"BLK_TRAN" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_OLVWS_PAYMENT_BREAKUP","CVS_SCHBREAKUP__TAB_MAIN":"BLK_SCH_DTLS","CVS_SCHDETAILS__TAB_MAIN":"BLK_AMOUNT_SCH_DTLS","CVS_TRAN__TAB_MAIN":"BLK_TRAN"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLVWS_PAYMENT_SUMMARY">CCY~PAYMNTREM~PREPMTADJAMT2~PREPMTADJAMT1~PREPMTPENAMT~PREPMTPENRATE~LIQDFACEVAL~LIMITAMT~DISCRATE~TOTPAID~OSBAL~STATUS~CPTY~EVENTSEQNO~FCCREF_OLD~XREF~BRANCH~DEPARTCODE~TREASSOURCE~OVDMEMOPOSTING~DDAADVREQ~INTWAIVERAMT~INTWAIVER~PAYSCHDPROCESS~EXTTRNREFNO~LIQDDEP~REAPPINTPREPAIDAMT~REAPPINTOUTAMT~LIQDINTPREPAIDPRIN~PREPAIDPRINTRATE~ALLOWTAXREFUND~OSBALREP~MODULECODE~PRODCODE~LATEVNTSEQNO~CURREVNTSEQNO~LATVERNO~CURRVERUI~TOTVERNOUI~NETAMTDUE~LCYEQVTTOTPAID~LCYEQVTLIMITAMT~LCYEQVTLIQDFACEVALUE~SUBSYSSTAT~NEGATIVEAMOUNTSETTLED~VALDT~LIMITDT~TOTPAMNT~CURRPMNT~LIQDORDER~LCY_CCY~LCYTOTAL~LCYPREPAID~LCYLIMIT~ECAREQSTATUS~MAT_DATE_UI~PAYMENTSTATUSUI~RESID_FLAG~REDTENOR~CONTRACTSTATUSUI~CPTYNAME~MATDT~ACTION_UI~INTREFREQ~CONTRACTREFNOP~PROCESSREFNUM~CHANNELREFNUM~CLOSE_RVLNG_LOAN~PAYMENT_CCY~SPOT_RATE~CURR_ACTION_CODE~VALUE_DATE_UI~LIMIT_DATE_UI~PREPAIDPRINAMT~UI_NETPAID~UI_NETWAIVED~UI_LCYEQVNETPAID~UI_LCYEQVNETWAIVED~UI_NETCAP~UI_LCYEQVNETCAP</FN>'; 
msgxml += '      <FN PARENT="BLK_OLVWS_PAYMENT_SUMMARY" RELATION_TYPE="N" TYPE="BLK_OLVWS_PAYMENT_BREAKUP">FCCREF~COMP~AMTDUE~OVERDUE~AMTPAID~TAXPAID~PAY_RECEIVE~EVENTSEQNO~AMTWAIVED~AMTCAPITALIZED</FN>'; 
msgxml += '      <FN PARENT="BLK_OLVWS_PAYMENT_SUMMARY" RELATION_TYPE="1" TYPE="BLK_AUDITTRIAL">TRNTYPE~WRKFLWSTATUS~AUTHSTAT~TXNSTAT~EVENTCODE~EVENTDATE~EVNTSEQNO~CHKDTSTAMP~CHKID~MAKDTSTAMP~MAKID~CONTREFNO~MODULE~CONTSTATUSUI~AUTHSTATUSUI~WRKFLWSTATUSUI</FN>'; 
msgxml += '      <FN PARENT="BLK_OLVWS_PAYMENT_SUMMARY" RELATION_TYPE="N" TYPE="BLK_SCH_DTLS">BASIS_AMOUNT~AMOUNT_SETTLED~EVENT_SEQ_NO~PAID_DATE~DUE_DATE~COMPONENT~CONTRACT_REF_NO</FN>'; 
msgxml += '      <FN PARENT="BLK_OLVWS_PAYMENT_SUMMARY" RELATION_TYPE="N" TYPE="BLK_AMOUNT_SCH_DTLS">AMTCCY~COMPTNT~CONTREFNO~DUEDATE~COMPDESC~OVERDUEAMT~DUEAMOUNT~EXPECTED_BALANCE</FN>'; 
msgxml += '      <FN PARENT="BLK_OLVWS_PAYMENT_SUMMARY" RELATION_TYPE="1" TYPE="BLK_OLTBS_CONTRACT_CONTROL">CONTRACTREFNO~ENTRYBY~PROCESSCODE</FN>'; 
msgxml += '      <FN PARENT="BLK_OLVWS_PAYMENT_SUMMARY" RELATION_TYPE="N" TYPE="BLK_TRAN">ACBRN~ACCCY~ACNO~AMTTAG~DRCRIND~EVENTSRNO~LCYAMT~RELREF~TRNREFNO~TXINITDATE</FN>'; 
msgxml += '      <FN PARENT="BLK_OLVWS_PAYMENT_SUMMARY" RELATION_TYPE="1" TYPE="BLK_SCHBREAKUP_HDR"></FN>'; 
msgxml += '      <FN PARENT="BLK_OLVWS_PAYMENT_SUMMARY" RELATION_TYPE="1" TYPE="BLK_OLVWS_PAYMENT_REFUND">CONTRACT_REF_NO~EVENT_SEQ_NO~AMOUNT_DUE~REFUND_AMT</FN>'; 
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
msgxml_sum += '      <FN PARENT="BLK_OLVWS_PAYMENT_SUMMARY" RELATION_TYPE="1" TYPE="BLK_SUMMARY">AUTHSTATUS~CONTRACTSTATUS~CONTRACTREFNOP~VALDT~LIMITDT~TOTPAID~CCY~PRODCODE~CPTY~CUST_NAME1~BOOKDATE~MATDT~MODULECODE~EVENTSEQNO~PAYMENTSTATUS</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "OLDPMNT";
var defaultWhereClause = "sypks_utils.get_branch(FCCREF)=GLOBAL.CURRENT_BRANCH AND MODULECODE = 'OL'";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_SUMMARY";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_OLVWS_PAYMENT_SUMMARY" : "","BLK_OLVWS_PAYMENT_BREAKUP" : "BLK_OLVWS_PAYMENT_SUMMARY~N","BLK_AUDITTRIAL" : "BLK_OLVWS_PAYMENT_SUMMARY~1","BLK_SCH_DTLS" : "BLK_OLVWS_PAYMENT_SUMMARY~N","BLK_AMOUNT_SCH_DTLS" : "BLK_OLVWS_PAYMENT_SUMMARY~N","BLK_OLTBS_CONTRACT_CONTROL" : "BLK_OLVWS_PAYMENT_SUMMARY~1","BLK_TRAN" : "BLK_OLVWS_PAYMENT_SUMMARY~N","BLK_SCHBREAKUP_HDR" : "BLK_OLVWS_PAYMENT_SUMMARY~1","BLK_OLVWS_PAYMENT_REFUND" : "BLK_OLVWS_PAYMENT_SUMMARY~1"}; 

 var dataSrcLocationArray = new Array("BLK_OLVWS_PAYMENT_SUMMARY","BLK_OLVWS_PAYMENT_BREAKUP","BLK_AUDITTRIAL","BLK_SCH_DTLS","BLK_AMOUNT_SCH_DTLS","BLK_OLTBS_CONTRACT_CONTROL","BLK_TRAN","BLK_SCHBREAKUP_HDR","BLK_OLVWS_PAYMENT_REFUND"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLDPMNT.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLDPMNT.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_OLVWS_PAYMENT_SUMMARY__CONTRACTREFNOP";
pkFields[0] = "BLK_OLVWS_PAYMENT_SUMMARY__CONTRACTREFNOP";
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
var lovInfoFlds = {"BLK_OLVWS_PAYMENT_SUMMARY__LIMITDT__LOV_LIMIT_DATE":["BLK_OLVWS_PAYMENT_SUMMARY__LIMITDT~","BLK_OLVWS_PAYMENT_SUMMARY__CONTRACTREFNOP!VARCHAR2~BLK_OLVWS_PAYMENT_SUMMARY__FCCREF_OLD!VARCHAR2","N","N"],"BLK_OLVWS_PAYMENT_SUMMARY__CONTRACTREFNOP__LOV_CONT_REFNO":["BLK_OLVWS_PAYMENT_SUMMARY__CONTRACTREFNOP~BLK_OLVWS_PAYMENT_SUMMARY__CCY~BLK_OLVWS_PAYMENT_SUMMARY__CPTY~BLK_OLVWS_PAYMENT_SUMMARY__MATDT~~~BLK_OLVWS_PAYMENT_SUMMARY__STATUS~BLK_OLVWS_PAYMENT_SUMMARY__BRANCH~BLK_OLVWS_PAYMENT_SUMMARY__DEPARTCODE~BLK_OLVWS_PAYMENT_SUMMARY__TREASSOURCE~BLK_OLVWS_PAYMENT_SUMMARY__EVENTSEQNO~BLK_OLVWS_PAYMENT_SUMMARY__CPTYNAME~","","N~N~N~N~N~N~N~N~N~N~N~N",""],"BLK_SUMMARY__CONTRACTSTATUS__LOV_CUST_NAME_S":["BLK_SUMMARY__CPTY~BLK_SUMMARY__CUST_NAME1~~","","N~N",""],"BLK_SUMMARY__CPTY__LOV_CUST_NAME_S":["BLK_SUMMARY__CPTY~BLK_SUMMARY__CUST_NAME1~~","","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_OLVWS_PAYMENT_BREAKUP","BLK_SCH_DTLS","BLK_AMOUNT_SCH_DTLS","BLK_TRAN");
var multipleEntryArray = new Array();
var multipleEntryCells = new Array();
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY VIEW SINGLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR ATTACHED CALLFORMS *****
 //----------------------------------------------------------------------------------------------------------------------

 var CallFormArray= new Array("OLCONDET~BLK_OLVWS_PAYMENT_SUMMARY","TXCTRTAX~BLK_OLVWS_PAYMENT_SUMMARY","OLCTRMIS~BLK_OLVWS_PAYMENT_SUMMARY","LFCTRCHG~BLK_OLVWS_PAYMENT_SUMMARY","OLCTRADV~BLK_OLVWS_PAYMENT_SUMMARY"); 

 var CallFormRelat=new Array("OLVWS_PAYMENT_SUMMARY.FCCREF=OLTBS_CONTRACT__SETT.CONTRACT_REF_NO AND OLVWS_PAYMENT_SUMMARY.EVENTSEQNO = OLTBS_CONTRACT__SETT.LATEST_EVENT_SEQ_NO","OLVWS_PAYMENT_SUMMARY.FCCREF=OLTBS_CONTRACT__TAX.CONTRACT_REF_NO AND OLVWS_PAYMENT_SUMMARY.EVENTSEQNO = OLTBS_CONTRACT__TAX.LATEST_EVENT_SEQ_NO","OLVWS_PAYMENT_SUMMARY.FCCREF=OLTBS_CONTRACT__MIS.CONTRACT_REF_NO AND OLVWS_PAYMENT_SUMMARY.EVENTSEQNO=OLTBS_CONTRACT__MIS.LATEST_EVENT_SEQ_NO","OLVWS_PAYMENT_SUMMARY.FCCREF=OLTBS_CONTRACT__CHG.CONTRACT_REF_NO AND OLVWS_PAYMENT_SUMMARY.EVENTSEQNO = OLTBS_CONTRACT__CHG.LATEST_EVENT_SEQ_NO","OLVWS_PAYMENT_SUMMARY.FCCREF=OLTBS_CONTRACT__ADV.CONTRACT_REF_NO AND OLVWS_PAYMENT_SUMMARY.EVENTSEQNO = OLTBS_CONTRACT__ADV.LATEST_EVENT_SEQ_NO"); 

 var CallRelatType= new Array("1","1","1","1","1"); 


 var ArrFuncOrigin=new Array();
 var ArrPrntFunc=new Array();
 var ArrPrntOrigin=new Array();
 var ArrRoutingType=new Array();


 // Code for Loading Cluster/Custom js File Starts
 var ArrClusterModified=new Array();
 var ArrCustomModified=new Array();
 // Code for Loading Cluster/Custom js File ends

ArrFuncOrigin["OLDPMNT"]="KERNEL";
ArrPrntFunc["OLDPMNT"]="";
ArrPrntOrigin["OLDPMNT"]="";
ArrRoutingType["OLDPMNT"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLDPMNT"]="N";
ArrCustomModified["OLDPMNT"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"OLCONDET":"CONREFNO~ESN","TXCTRTAX":"CONTREF~ESN","OLCTRMIS":"CONTREF~ESN~PRDCD~BRNCD","LFCTRCHG":"CONTREF~ESN~MODULECODE","OLCTRADV":"CONTREF~ESN","OLDEVENT":"CONTREF~ACTION_CODE","OLDMSPRV":"CONTREF~ESN~MODULE~PARENTFUNCTION~ACTION_CODE"};
var scrArgSource = {"OLCONDET":"BLK_OLVWS_PAYMENT_SUMMARY__FCCREF_OLD~BLK_OLVWS_PAYMENT_SUMMARY__EVENTSEQNO","TXCTRTAX":"BLK_OLVWS_PAYMENT_SUMMARY__FCCREF_OLD~BLK_OLVWS_PAYMENT_SUMMARY__EVENTSEQNO","OLCTRMIS":"BLK_OLVWS_PAYMENT_SUMMARY__FCCREF_OLD~BLK_OLVWS_PAYMENT_SUMMARY__EVENTSEQNO~~","LFCTRCHG":"BLK_OLVWS_PAYMENT_SUMMARY__FCCREF_OLD~BLK_OLVWS_PAYMENT_SUMMARY__EVENTSEQNO~BLK_OLVWS_PAYMENT_SUMMARY__MODULECODE","OLCTRADV":"BLK_OLVWS_PAYMENT_SUMMARY__FCCREF_OLD~BLK_OLVWS_PAYMENT_SUMMARY__EVENTSEQNO","OLDEVENT":"BLK_OLVWS_PAYMENT_SUMMARY__FCCREF_OLD~","OLDMSPRV":"BLK_OLVWS_PAYMENT_SUMMARY__FCCREF_OLD~~~~"};
var scrArgVals = {"OLCONDET":"~","TXCTRTAX":"~","OLCTRMIS":"~~~","LFCTRCHG":"~~","OLCTRADV":"~","OLDEVENT":"~EXECUTEQUERY","OLDMSPRV":"~~OL~OLDPMNT~EXECUTEQUERY"};
var scrArgDest = {};
//***** CODE FOR SUB-SYSTEM DEPENDENT  FIELDS   *****
//----------------------------------------------------------------------------------------------------------------------
var dpndntOnFlds = {"OLCONDET":"","TXCTRTAX":"","OLCTRMIS":"","LFCTRCHG":"","OLCTRADV":""};
var dpndntOnSrvs = {"OLCONDET":"","TXCTRTAX":"","OLCTRMIS":"","LFCTRCHG":"","OLCTRADV":""};
//***** CODE FOR TAB DEPENDENT  FIELDS   *****
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR CALLFORM TABS *****
//----------------------------------------------------------------------------------------------------------------------
var callformTabArray = new Array(); 
//***** CODE FOR ACTION STAGE DETAILS *****
//----------------------------------------------------------------------------------------------------------------------
var actStageArry = {"QUERY":"2","NEW":"2","MODIFY":"1","AUTHORIZE":"2","DELETE":"2","CLOSE":"1","REOPEN":"1","REVERSE":"2","ROLLOVER":"1","CONFIRM":"1","LIQUIDATE":"1","SUMMARYQUERY":"2"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------