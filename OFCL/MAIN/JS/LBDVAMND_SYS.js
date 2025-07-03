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
**  File Name          : LBDVAMND_SYS.js
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
var fieldNameArray = {"BLK_CONTRACT_MASTER":"CCY~LCYCCY~LCYAMT~AMT~CPTY~PRDTYP~PRD~BRN~CONTREFNO~VALDT~VERNO~REPGMCOUNTNO~TRANREFNO~DRAWDWNNO~SYNDREFNO~MAINCOMP~MATDT~EVNTSEQNO~LASTAVLDT~CONTSTAT~USERDEFSTAT~BROKERCODE~REAMORTDT~CONTREFERNO~LATEVERNO~LATEVNSEQNO~LATREPGMCOUNTNO~LATEVNTDT~CONTCCY~MODCODE~CURREVNTCODE~BRNCH~PRDCODE~PRDTYPE~COUNPTY~NEWCRLINE~DIFFAMNT~VALUEDT~EVNTSNO~CONREFNUM~NEWREVFLAG~VAMIESN~AMENDNTAPPL~ICCFCHANGD~TRANSNDT~TRANREMRK~TRANSEXCLFRMSTAT~AMNDINSTSTAT~NONPRORATA~EXTTRANREFNO~REASCODE~REAMRTDT~LCYEQVFORINDXLCY~SUBSYSSTAT~CPTYNAME~AMNDDT~ORGSTARTDT~RATE~NEWMATDT~UNCOVRAMT~TOTLINKAMT~PRODTYPEDESC~TICKETID~SETTLESEQNO~ORIGRATE~CONTLMATDT~CONTLEFFTDT~PROPDRAWDWN~PRAMESN~PROPGRATION~USERREFNUMBER~AGENTREFNO~FACILITYNAME~TREASYSOURCE~TREASYSOUR~UPDATE_LT_POSITION~REFUND_REQD~PROCESSREFNUM~CHANNELREFNUM~ECAREQSTATUS","BLK_CONTRACT_EVENT_LOG":"RATEREVSTAT~WORKFLOWSTAT~AUTHSTAT~EVNTCODE~EVNTDT~ESN~CK_DTSTAMP~AUTHBY~MK_DTSTAMP~INPUTBY~CONTREFNO~MODULE~REVESN~NEWVERIND~TXNSTAT","BLK_CONTRACT_SCHEDULES":"AMT~FREQUNIT~FREQ~NOOFSCH~STARTDT~SCHTYPE~COMP~ESN~VERNO~CONTREFNO~MONTH_END_IND","BLK_AMOUNT_DUE":"COMPTYPE~CCYAMTDUE~SCHPICKLIQ~MSGESN~SCHLINK~ADJAMT~BASICAMTTAG~INFLOWOUTFLOW~AMTSETTL~CPTY~BRNACCDUE~ACCDUE~AMTDUE~DUEDT~COMP~CONTREFNO","BLK_CONTRACT_REVISION_SCH":"SCHEDLINK~REVAPPL~REVDT~COMP~CONTREFNO","BLK_CONTRACT_PREFERENCE":"MATHOLICCY~MATHOLICHK~INSTALNTLOAN~MSCHSCHMOVE~MSCHMOVACCMNTH~MSCHIGNHOLIDAY~STATCTRL~CASCADESCH~MOVEACCMONTH~DEDUCTTAXONCAPT~AMORTTYPE~IGNHOLIDAY~SCHMOVNT~VERFUNDS~HOLICCY~REVOLCOMMIT~PRINLIQD~LIQBACKVALSCH~CONTSCHTYPE~ESN~VERSNO~CONTREFNO","BLK_CONTRACT_LINKAGES":"LINKTOCCY~CONLINKAMT~EXCHRATE~LINKAMT~LINKTYPE~LOANCCY~LINKVALID~ESN~LINKTOREF~LINKTOBRN~VERSNO~CONTREFNO~AVAILAMT~PROJAVLAMT","BLK_DRAWDOWN_SCHEDULES":"DRAWDWNAPPL~CONTCCY~AMT~PAIDDT~DRADWNDUEDT~COMP~CONTREFNO","BLK_INST_SCHEDULES":"CONTREFNO~CCY~PROCESSTAT~CALCAMT~STARTDT~COMP","BLK_LINK_SUM":"","BLK_CONT_REV_SCH_BTN":"","BLK_CONTRACT_EVENT_ADVICE":"MODUL~PRIORITY~SUPPRESS~MSGTYP~EVSEQUNO~CONTREFNUMBER"};

var multipleEntryPageSize = {"BLK_CONTRACT_SCHEDULES" :"15" ,"BLK_CONTRACT_LINKAGES" :"15" ,"BLK_AMOUNT_DUE" :"15" ,"BLK_CONTRACT_REVISION_SCH" :"15" ,"BLK_DRAWDOWN_SCHEDULES" :"15" ,"BLK_INST_SCHEDULES" :"15" ,"BLK_CONTRACT_EVENT_ADVICE" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_VAMI__TAB_SCHD":"BLK_CONTRACT_SCHEDULES","CVS_VAMI__TAB_LINK":"BLK_CONTRACT_LINKAGES","CVS_PTMTDET__TAB_MAIN":"BLK_AMOUNT_DUE","CVS_REVSCHD__TAB_MAIN":"BLK_CONTRACT_REVISION_SCH","CVS_DRAWDOWNSCH__TAB_MAIN":"BLK_DRAWDOWN_SCHEDULES","CVS_INSTSCHED__TAB_MAIN":"BLK_INST_SCHEDULES","CVS_ADVICE__TAB_MAIN":"BLK_CONTRACT_EVENT_ADVICE"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_CONTRACT_MASTER">CCY~LCYCCY~LCYAMT~AMT~CPTY~PRDTYP~PRD~BRN~CONTREFNO~VALDT~VERNO~REPGMCOUNTNO~TRANREFNO~DRAWDWNNO~SYNDREFNO~MAINCOMP~MATDT~EVNTSEQNO~LASTAVLDT~CONTSTAT~USERDEFSTAT~BROKERCODE~REAMORTDT~CONTREFERNO~LATEVERNO~LATEVNSEQNO~LATREPGMCOUNTNO~LATEVNTDT~CONTCCY~MODCODE~CURREVNTCODE~BRNCH~PRDCODE~PRDTYPE~COUNPTY~NEWCRLINE~DIFFAMNT~VALUEDT~EVNTSNO~CONREFNUM~NEWREVFLAG~VAMIESN~AMENDNTAPPL~ICCFCHANGD~TRANSNDT~TRANREMRK~TRANSEXCLFRMSTAT~AMNDINSTSTAT~NONPRORATA~EXTTRANREFNO~REASCODE~REAMRTDT~LCYEQVFORINDXLCY~SUBSYSSTAT~CPTYNAME~AMNDDT~ORGSTARTDT~RATE~NEWMATDT~UNCOVRAMT~TOTLINKAMT~PRODTYPEDESC~TICKETID~SETTLESEQNO~ORIGRATE~CONTLMATDT~CONTLEFFTDT~PROPDRAWDWN~PRAMESN~PROPGRATION~USERREFNUMBER~AGENTREFNO~FACILITYNAME~TREASYSOURCE~TREASYSOUR~UPDATE_LT_POSITION~REFUND_REQD~PROCESSREFNUM~CHANNELREFNUM~ECAREQSTATUS</FN>'; 
msgxml += '      <FN PARENT="BLK_CONTRACT_MASTER" RELATION_TYPE="1" TYPE="BLK_CONTRACT_EVENT_LOG">RATEREVSTAT~WORKFLOWSTAT~AUTHSTAT~EVNTCODE~EVNTDT~ESN~CK_DTSTAMP~AUTHBY~MK_DTSTAMP~INPUTBY~CONTREFNO~MODULE~REVESN~NEWVERIND~TXNSTAT</FN>'; 
msgxml += '      <FN PARENT="BLK_CONTRACT_MASTER" RELATION_TYPE="N" TYPE="BLK_CONTRACT_SCHEDULES">AMT~FREQUNIT~FREQ~NOOFSCH~STARTDT~SCHTYPE~COMP~ESN~VERNO~CONTREFNO~MONTH_END_IND</FN>'; 
msgxml += '      <FN PARENT="BLK_CONTRACT_MASTER" RELATION_TYPE="N" TYPE="BLK_AMOUNT_DUE">COMPTYPE~CCYAMTDUE~SCHPICKLIQ~MSGESN~SCHLINK~ADJAMT~BASICAMTTAG~INFLOWOUTFLOW~AMTSETTL~CPTY~BRNACCDUE~ACCDUE~AMTDUE~DUEDT~COMP~CONTREFNO</FN>'; 
msgxml += '      <FN PARENT="BLK_CONTRACT_MASTER" RELATION_TYPE="N" TYPE="BLK_CONTRACT_REVISION_SCH">SCHEDLINK~REVAPPL~REVDT~COMP~CONTREFNO</FN>'; 
msgxml += '      <FN PARENT="BLK_CONTRACT_MASTER" RELATION_TYPE="1" TYPE="BLK_CONTRACT_PREFERENCE">MATHOLICCY~MATHOLICHK~INSTALNTLOAN~MSCHSCHMOVE~MSCHMOVACCMNTH~MSCHIGNHOLIDAY~STATCTRL~CASCADESCH~MOVEACCMONTH~DEDUCTTAXONCAPT~AMORTTYPE~IGNHOLIDAY~SCHMOVNT~VERFUNDS~HOLICCY~REVOLCOMMIT~PRINLIQD~LIQBACKVALSCH~CONTSCHTYPE~ESN~VERSNO~CONTREFNO</FN>'; 
msgxml += '      <FN PARENT="BLK_CONTRACT_MASTER" RELATION_TYPE="N" TYPE="BLK_CONTRACT_LINKAGES">LINKTOCCY~CONLINKAMT~EXCHRATE~LINKAMT~LINKTYPE~LOANCCY~LINKVALID~ESN~LINKTOREF~LINKTOBRN~VERSNO~CONTREFNO~AVAILAMT~PROJAVLAMT</FN>'; 
msgxml += '      <FN PARENT="BLK_CONTRACT_MASTER" RELATION_TYPE="N" TYPE="BLK_DRAWDOWN_SCHEDULES">DRAWDWNAPPL~CONTCCY~AMT~PAIDDT~DRADWNDUEDT~COMP~CONTREFNO</FN>'; 
msgxml += '      <FN PARENT="BLK_CONTRACT_MASTER" RELATION_TYPE="N" TYPE="BLK_INST_SCHEDULES">CONTREFNO~CCY~PROCESSTAT~CALCAMT~STARTDT~COMP</FN>'; 
msgxml += '      <FN PARENT="BLK_CONTRACT_MASTER" RELATION_TYPE="1" TYPE="BLK_LINK_SUM"></FN>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_CONT_REV_SCH_BTN"></FN>'; 
msgxml += '      <FN PARENT="BLK_CONTRACT_MASTER" RELATION_TYPE="N" TYPE="BLK_CONTRACT_EVENT_ADVICE">MODUL~PRIORITY~SUPPRESS~MSGTYP~EVSEQUNO~CONTREFNUMBER</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_VAMI";
var qryReqd = "Y";
var txnBranchFld = "BLK_CONTRACT_MASTER__BRN" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** FCJ XML FOR SUMMARY SCREEN *****
//----------------------------------------------------------------------------------------------------------------------
var msgxml_sum=""; 
msgxml_sum += '    <FLD>'; 
msgxml_sum += '      <FN PARENT="BLK_CONTRACT_MASTER" RELATION_TYPE="1" TYPE="BLK_VAMI_SUMMARY">CONTREFNO~ESNSUM~VALDTSUM~DIFFAMTSUM~NEWMATDTSUM~TRNDTSUM~AUTHSTATSUM~CONTSTATSUM</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "LBDVAMND";
var defaultWhereClause = "sypks_utils.get_branch(CONTRACT_REF_NO) =GLOBAL.CURRENT_BRANCH";
var defaultOrderByClause ="";
var multiBrnWhereClause ="Branch IN (SELECT BRANCH_CODE FROM SMVW_USER_BRANCHES WHERE USER_ID = GLOBAL.USER_ID INTERSECT SELECT BRANCH_CODE FROM SMTB_USER_ROLE WHERE USER_ID = GLOBAL.USER_ID UNION SELECT BRANCH_CODE FROM SMVWS_USER_CENTRAL_ROLES WHERE USER_ID = GLOBAL.USER_ID)";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_VAMI_SUMMARY";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_CONTRACT_MASTER" : "","BLK_CONTRACT_EVENT_LOG" : "BLK_CONTRACT_MASTER~1","BLK_CONTRACT_SCHEDULES" : "BLK_CONTRACT_MASTER~N","BLK_AMOUNT_DUE" : "BLK_CONTRACT_MASTER~N","BLK_CONTRACT_REVISION_SCH" : "BLK_CONTRACT_MASTER~N","BLK_CONTRACT_PREFERENCE" : "BLK_CONTRACT_MASTER~1","BLK_CONTRACT_LINKAGES" : "BLK_CONTRACT_MASTER~N","BLK_DRAWDOWN_SCHEDULES" : "BLK_CONTRACT_MASTER~N","BLK_INST_SCHEDULES" : "BLK_CONTRACT_MASTER~N","BLK_LINK_SUM" : "BLK_CONTRACT_MASTER~1","BLK_CONT_REV_SCH_BTN" : "","BLK_CONTRACT_EVENT_ADVICE" : "BLK_CONTRACT_MASTER~N"}; 

 var dataSrcLocationArray = new Array("BLK_CONTRACT_MASTER","BLK_CONTRACT_EVENT_LOG","BLK_CONTRACT_SCHEDULES","BLK_AMOUNT_DUE","BLK_CONTRACT_REVISION_SCH","BLK_CONTRACT_PREFERENCE","BLK_CONTRACT_LINKAGES","BLK_DRAWDOWN_SCHEDULES","BLK_INST_SCHEDULES","BLK_LINK_SUM","BLK_CONT_REV_SCH_BTN","BLK_CONTRACT_EVENT_ADVICE"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LBDVAMND.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LBDVAMND.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_CONTRACT_MASTER__CONTREFNO";
pkFields[0] = "BLK_CONTRACT_MASTER__CONTREFNO";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_CONTRACT_LINKAGES":["CONLINKAMT","EXCHRATE","LINKAMT","LINKTOBRN","LINKTOCCY","LINKTOREF","LINKTYP","LINKTYPE","LINKVALID","LOANCCY"],"BLK_CONTRACT_MASTER":["AMENDNTAPPL","AMNDDTI","AMNDINSTSTAT","DIFFAMNT","EXTTRANREFNO","ICCFCHANGD","LCYEQVFORINDXLCY","NEWCRLINE","NEWMATDTI","NEWREVFLAG","NONPRORATA","PROPDRAWDWN","PROPGRATION","REAMRTDTI","REASCODE","REFUND_REQD","TRANREMRK","TRANSEXCLFRMSTAT","TRANSNDTI","UPDATE_LT_POSITION","VALUEDTI"],"BLK_CONTRACT_SCHEDULES":["AMT","COMP","FREQ","FREQUNIT","NOOFSCH","SCHTYPE","STARTDTI"]};
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
var lovInfoFlds = {"BLK_CONTRACT_MASTER__BRN__LOV_BRANCH":["BLK_CONTRACT_MASTER__BRN~~~~","","N~N~N~N",""],"BLK_CONTRACT_MASTER__CONTREFNO__LOV_CONTRACTREF":["BLK_CONTRACT_MASTER__CONTREFNO~","BLK_CONTRACT_MASTER__BRN!VARCHAR2","N",""],"BLK_CONTRACT_MASTER__REASCODE__LOV_REASON_CODE":["BLK_CONTRACT_MASTER__REASCODE~~","","N~N",""]};
var offlineLovInfoFlds = {};
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR TABS *****
//----------------------------------------------------------------------------------------------------------------------
var strHeaderTabId = 'TAB_HEADER';
var strFooterTabId = 'TAB_FOOTER';
var strCurrentTabId = 'TAB_AMEND';
//--------------------------------------------
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------
var multipleEntryIDs = new Array("BLK_CONTRACT_SCHEDULES","BLK_CONTRACT_LINKAGES","BLK_AMOUNT_DUE","BLK_CONTRACT_REVISION_SCH","BLK_DRAWDOWN_SCHEDULES","BLK_INST_SCHEDULES","BLK_CONTRACT_EVENT_ADVICE");
var multipleEntryArray = new Array();
var multipleEntryCells = new Array();
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY VIEW SINGLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR ATTACHED CALLFORMS *****
 //----------------------------------------------------------------------------------------------------------------------

 var CallFormArray= new Array("LFCTRCHG~BLK_CONTRACT_MASTER","OLCONDET~BLK_CONTRACT_MASTER","TXCTRTAX~BLK_CONTRACT_MASTER","OLCTRMIS~BLK_CONTRACT_MASTER","OLCTRUDF~BLK_CONTRACT_MASTER","LBCADVIC~BLK_CONTRACT_MASTER","LBCFPMLS~BLK_CONTRACT_MASTER","LBCNPRAT~BLK_CONTRACT_MASTER","LBCINTRS~BLK_CONTRACT_MASTER"); 

 var CallFormRelat=new Array("OLTBS_CONTRACT_MASTER.CONTRACT_REF_NO=OLTBS_CONTRACT__CHG.CONTRACT_REF_NO AND OLTBS_CONTRACT_MASTER.EVENT_SEQ_NO=OLTBS_CONTRACT__CHG.LATEST_EVENT_SEQ_NO","OLTBS_CONTRACT_MASTER.CONTRACT_REF_NO=OLTBS_CONTRACT__SETT.CONTRACT_REF_NO","OLTBS_CONTRACT_MASTER.CONTRACT_REF_NO=OLTBS_CONTRACT__TAX.CONTRACT_REF_NO AND OLTBS_CONTRACT_MASTER.EVENT_SEQ_NO=OLTBS_CONTRACT__TAX.LATEST_EVENT_SEQ_NO","OLTBS_CONTRACT_MASTER.CONTRACT_REF_NO=OLTBS_CONTRACT__MIS.CONTRACT_REF_NO","OLTBS_CONTRACT_MASTER.CONTRACT_REF_NO=OLTBS_CONTRACT__FLD.CONTRACT_REF_NO AND OLTBS_CONTRACT_MASTER.EVENT_SEQ_NO= OLTBS_CONTRACT__FLD.LATEST_EVENT_SEQ_NO","OLTBS_CONTRACT_MASTER.CONTRACT_REF_NO=OLTBS_GTEMP_EVENT_ADVICE.CONTRACT_REF_NO AND OLTBS_CONTRACT_MASTER.EVENT_SEQ_NO= OLTBS_GTEMP_EVENT_ADVICE.EVENT_SEQ_NO","OLTBS_CONTRACT_MASTER.CONTRACT_REF_NO=LBTBS_CONT_MEDIA_FOR_ALL_PART.CONTRACT_REF_NO AND OLTBS_CONTRACT_MASTER.EVENT_SEQ_NO= LBTBS_CONT_MEDIA_FOR_ALL_PART.EVENT_SEQ_NO","OLTBS_CONTRACT_MASTER.CONTRACT_REF_NO = OLTBS_CONTRACT__CNPR.CONTRACT_REF_NO","OLTBS_CONTRACT.CONTRACT_REF_NO = OLTBS_CONTRACT__INT.CONTRACT_REF_NO AND OLTBS_CONTRACT.LATEST_EVENT_SEQ_NO= OLTBS_CONTRACT__INT.LATEST_EVENT_SEQ_NO"); 

 var CallRelatType= new Array("1","1","1","1","1","1","1","1","1"); 


 var ArrFuncOrigin=new Array();
 var ArrPrntFunc=new Array();
 var ArrPrntOrigin=new Array();
 var ArrRoutingType=new Array();


 // Code for Loading Cluster/Custom js File Starts
 var ArrClusterModified=new Array();
 var ArrCustomModified=new Array();
 // Code for Loading Cluster/Custom js File ends

ArrFuncOrigin["LBDVAMND"]="KERNEL";
ArrPrntFunc["LBDVAMND"]="";
ArrPrntOrigin["LBDVAMND"]="";
ArrRoutingType["LBDVAMND"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LBDVAMND"]="N";
ArrCustomModified["LBDVAMND"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"LFCTRCHG":"CONTREF~ESN","OLCONDET":"CONREFNO~ESN","TXCTRTAX":"CONTREF~ESN","OLCTRMIS":"CONTREF~ESN~PRDCD~BRNCD","OLCTRUDF":"CONTREFNO~LATVERNO","LBCADVIC":"CONTREFNO~EVNTSEQNO","LBCFPMLS":"CONTRACT_REF_NO~EVENT_SEQ_NO","LBCNPRAT":"CONTRACTRFNO~EVENTSEQNO~TXTPRMAMOUNT~LATESTVERSIONNO~TXTVALUEDATE","LBCINTRS":"CONTRACTREFNO~MODULE~EVENTSEQNO","OLDMSPRV":"CONTREF~ESN~MODULE~PARENTFUNCTION~ACTION_CODE"};
var scrArgSource = {"LFCTRCHG":"BLK_CONTRACT_MASTER__CONTREFNO~BLK_CONTRACT_MASTER__EVNTSEQNO","OLCONDET":"BLK_CONTRACT_MASTER__CONTREFNO~BLK_CONTRACT_MASTER__EVNTSEQNO","TXCTRTAX":"BLK_CONTRACT_MASTER__CONTREFNO~BLK_CONTRACT_MASTER__EVNTSEQNO","OLCTRMIS":"BLK_CONTRACT_MASTER__CONTREFNO~BLK_CONTRACT_MASTER__EVNTSEQNO~BLK_CONTRACT_MASTER__PRD~","OLCTRUDF":"BLK_CONTRACT_MASTER__CONTREFNO~BLK_CONTRACT_MASTER__EVNTSEQNO","LBCADVIC":"BLK_CONTRACT_MASTER__CONTREFNO~BLK_CONTRACT_MASTER__LATEVNSEQNO","LBCFPMLS":"BLK_CONTRACT_MASTER__CONTREFNO~BLK_CONTRACT_MASTER__LATEVNSEQNO","LBCNPRAT":"BLK_CONTRACT_MASTER__CONTREFNO~BLK_CONTRACT_MASTER__LATEVNSEQNO~BLK_CONTRACT_MASTER__DIFFAMNT~BLK_CONTRACT_MASTER__LATEVERNO~BLK_CONTRACT_MASTER__VALUEDT","LBCINTRS":"BLK_CONTRACT_MASTER__CONTREFNO~BLK_CONTRACT_MASTER__MODCODE~BLK_CONTRACT_MASTER__LATEVNSEQNO","OLDMSPRV":"BLK_CONTRACT_MASTER__CONTREFNO~~~~"};
var scrArgVals = {"LFCTRCHG":"~","OLCONDET":"~","TXCTRTAX":"~","OLCTRMIS":"~~~","OLCTRUDF":"~","LBCADVIC":"~","LBCFPMLS":"~","LBCNPRAT":"~~~~","LBCINTRS":"~'LB'~","OLDMSPRV":"~~LB~LBDVAMND~EXECUTEQUERY"};
var scrArgDest = {};
//***** CODE FOR SUB-SYSTEM DEPENDENT  FIELDS   *****
//----------------------------------------------------------------------------------------------------------------------
var dpndntOnFlds = {"LFCTRCHG":"","OLCONDET":"","TXCTRTAX":"","OLCTRMIS":"","OLCTRUDF":"","LBCADVIC":"","LBCFPMLS":"","LBCNPRAT":"","LBCINTRS":""};
var dpndntOnSrvs = {"LFCTRCHG":"","OLCONDET":"","TXCTRTAX":"","OLCTRMIS":"","OLCTRUDF":"","LBCADVIC":"","LBCFPMLS":"","LBCNPRAT":"","LBCINTRS":""};
//***** CODE FOR TAB DEPENDENT  FIELDS   *****
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR CALLFORM TABS *****
//----------------------------------------------------------------------------------------------------------------------
var callformTabArray = new Array(); 
//***** CODE FOR ACTION STAGE DETAILS *****
//----------------------------------------------------------------------------------------------------------------------
var actStageArry = {"QUERY":"2","NEW":"1","MODIFY":"2","AUTHORIZE":"2","DELETE":"2","CLOSE":"1","REOPEN":"1","REVERSE":"2","ROLLOVER":"1","CONFIRM":"1","LIQUIDATE":"1","SUMMARYQUERY":"2"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------