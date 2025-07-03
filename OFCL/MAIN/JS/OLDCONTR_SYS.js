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
**  File Name          : OLDCONTR_SYS.js
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
var fieldNameArray = {"BLK_OLTBS_CONTRACT":"UI_CONTRACT_BALANCE~UI_CUSTOMER_NAME~UI_CONTRA_BALANCE~UI_CURRENT_ESN~FUNDREFNO~CONTRACTREFNO~BOOKDATE~SERIALNO~LATESTEVENTSEQNO~USERREFNO~LATESTVERSIONNO~BRANCH~PRODUCTCODE~COUNTERPARTY~CONTRACTSTATUS~AUTHSTATUS~PLATESTATUS~PRODUCTTYPE~CURREVENTCODE~MODULECODE~USERDEFINEDSTATUS~CONTRACTCCY~LATESTEVENTDATE~EXTERNALREFNO~AUTOMANUALFLAG~CUSTOMREFNO~DEPARTMENTCODE~SUPRESSBVPAYMENTMSG~SUPRESSBVPAYMENTMSG1~RESPONSESTAT~LIABILITYCIF~ECASTATUS~LATEST_REPROGRAMCOUNTER_NO~TREASURYSOURCE~RATEREVISIONSTATUS~WORKFLOWSTATUS~DELINQUENCYSTATUS~COMMONREFNO~OVERALLCONFSTAT~CONFPMTLINKSTAT~UNCONFIRMEDSINCE~EVALUATIONDATE~SWIFTREFNO~RELATEDREFNO~ALLOWONLINECONFIRM~NETACROSSDRAWDOWN~ALTERNATEREFNO~UI_TOTAL_EVENT","BLK_CONTRA_BALANCE":"CONTRACTREFNO~EVENTSEQNO~COUNTERPARTY~CURRENCY~STATUS~VALUEDATE~AMOUNTPAID~AMOUNTPAIDLCY~DRACBRANCH~DRAC~CRACBRANCH~CRAC~REMARKS~CONTRAOPERATION~LIQDESN","BLK_EVENT_LOG":"MODULE~CONTRACTREFNO~MAKERID~MAKERDTSTAMP~CHECKERID~CHECKERDTSTAMP~EVENTSEQNO~EVENTDATE~EVENTCODE~CONTRACTSTATUS~AUTHSTATUS~NEWVERSIONINDICATOR~REVERSEDEVENTSEQNO~EVENTVALUEDATE~ECASTATUS~WORKFLOWSTATUS~RATEREVISIONSTATUS~RELEASEBY~RELEASEDTSTAMP~RATEASSIGNEDBY~RATEASSIGNDTTAMP~RATEASSIGNAUTHBY~RATEASSIGNAUTHDTSTAMP~INFORMSTATUS~TRNTYPE~EXTERNALTRANREFNO~UI_REV_MAKER_ID~UI_REV_MAKER_DATE~UI_REV_CHECKER_ID~UI_REV_CHECKER_DATE"};

var multipleEntryPageSize = {};

var multipleEntrySVBlocks = "BLK_EVENT_LOG";

var tabMEBlks = {};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTBS_CONTRACT">UI_CONTRACT_BALANCE~UI_CUSTOMER_NAME~UI_CONTRA_BALANCE~UI_CURRENT_ESN~FUNDREFNO~CONTRACTREFNO~BOOKDATE~SERIALNO~LATESTEVENTSEQNO~USERREFNO~LATESTVERSIONNO~BRANCH~PRODUCTCODE~COUNTERPARTY~CONTRACTSTATUS~AUTHSTATUS~PLATESTATUS~PRODUCTTYPE~CURREVENTCODE~MODULECODE~USERDEFINEDSTATUS~CONTRACTCCY~LATESTEVENTDATE~EXTERNALREFNO~AUTOMANUALFLAG~CUSTOMREFNO~DEPARTMENTCODE~SUPRESSBVPAYMENTMSG~SUPRESSBVPAYMENTMSG1~RESPONSESTAT~LIABILITYCIF~ECASTATUS~LATEST_REPROGRAMCOUNTER_NO~TREASURYSOURCE~RATEREVISIONSTATUS~WORKFLOWSTATUS~DELINQUENCYSTATUS~COMMONREFNO~OVERALLCONFSTAT~CONFPMTLINKSTAT~UNCONFIRMEDSINCE~EVALUATIONDATE~SWIFTREFNO~RELATEDREFNO~ALLOWONLINECONFIRM~NETACROSSDRAWDOWN~ALTERNATEREFNO~UI_TOTAL_EVENT</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONTRACT" RELATION_TYPE="1" TYPE="BLK_CONTRA_BALANCE">CONTRACTREFNO~EVENTSEQNO~COUNTERPARTY~CURRENCY~STATUS~VALUEDATE~AMOUNTPAID~AMOUNTPAIDLCY~DRACBRANCH~DRAC~CRACBRANCH~CRAC~REMARKS~CONTRAOPERATION~LIQDESN</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONTRACT" RELATION_TYPE="1" TYPE="BLK_EVENT_LOG">MODULE~CONTRACTREFNO~MAKERID~MAKERDTSTAMP~CHECKERID~CHECKERDTSTAMP~EVENTSEQNO~EVENTDATE~EVENTCODE~CONTRACTSTATUS~AUTHSTATUS~NEWVERSIONINDICATOR~REVERSEDEVENTSEQNO~EVENTVALUEDATE~ECASTATUS~WORKFLOWSTATUS~RATEREVISIONSTATUS~RELEASEBY~RELEASEDTSTAMP~RATEASSIGNEDBY~RATEASSIGNDTTAMP~RATEASSIGNAUTHBY~RATEASSIGNAUTHDTSTAMP~INFORMSTATUS~TRNTYPE~EXTERNALTRANREFNO~UI_REV_MAKER_ID~UI_REV_MAKER_DATE~UI_REV_CHECKER_ID~UI_REV_CHECKER_DATE</FN>'; 
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
msgxml_sum += '      <FN PARENT="BLK_OLTBS_CONTRACT" RELATION_TYPE="1" TYPE="BLK_CONTRA_BALANCE">CONTRACTREFNO~COUNTERPARTY~CURRENCY~STATUS~VALUEDATE~AMOUNTPAID~DRACBRANCH~DRAC~CRACBRANCH~EVENTSEQNO</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "OLDCONTR";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_CONTRA_BALANCE";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_OLTBS_CONTRACT" : "","BLK_CONTRA_BALANCE" : "BLK_OLTBS_CONTRACT~1","BLK_EVENT_LOG" : "BLK_OLTBS_CONTRACT~1"}; 

 var dataSrcLocationArray = new Array("BLK_OLTBS_CONTRACT","BLK_CONTRA_BALANCE","BLK_EVENT_LOG"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLDCONTR.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLDCONTR.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_OLTBS_CONTRACT__CONTRACTREFNO";
pkFields[0] = "BLK_OLTBS_CONTRACT__CONTRACTREFNO";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_CONTRA_BALANCE":["AMOUNTPAID","AMOUNTPAIDLCY","CONTRACTREFNO","CONTRAOPERATION","COUNTERPARTY","CRAC","CRACBRANCH","CURRENCY","DRAC","DRACBRANCH","EVENTSEQNO","LIQDESN","REMARKS","STATUS","VALUEDATEI"],"BLK_EVENT_LOG":["AUTHSTATUS","CHECKERDTSTAMP","CHECKERID","CONTRACTREFNO","CONTRACTSTATUS","ECASTATUS","EVENTCODE","EVENTDATE","EVENTSEQNO","EVENTVALUEDATE","EXTERNALTRANREFNO","INFORMSTATUS","MAKERDTSTAMP","MAKERID","MODULE","NEWVERSIONINDICATOR","RATEASSIGNAUTHBY","RATEASSIGNAUTHDTSTAMP","RATEASSIGNDTTAMP","RATEASSIGNEDBY","RATEREVISIONSTATUS","RELEASEBY","RELEASEDTSTAMP","REVERSEDEVENTSEQNO","TRNTYPE","UI_REV_CHECKER_DATEI","UI_REV_CHECKER_ID","UI_REV_MAKER_DATEI","UI_REV_MAKER_ID","WORKFLOWSTATUS"]};
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
var lovInfoFlds = {"BLK_OLTBS_CONTRACT__CONTRACTREFNO__LOV_CONTRACTREFNO":["BLK_OLTBS_CONTRACT__CONTRACTREFNO~BLK_OLTBS_CONTRACT__LATESTEVENTSEQNO~","","N~N",""],"BLK_CONTRA_BALANCE__DRACBRANCH__LOV_BRANCH":["BLK_CONTRA_BALANCE__DRACBRANCH~~","","N~N",""],"BLK_CONTRA_BALANCE__DRAC__LOV_ACCOUNT":["BLK_CONTRA_BALANCE__DRAC~~~","BLK_CONTRA_BALANCE__DRACBRANCH!~BLK_OLTBS_CONTRACT__PRODUCTCODE!","N~N~N",""],"BLK_CONTRA_BALANCE__CRACBRANCH__LOV_BRANCH":["BLK_CONTRA_BALANCE__CRACBRANCH~~","","N~N",""],"BLK_CONTRA_BALANCE__CRAC__LOV_ACCOUNT":["BLK_CONTRA_BALANCE__CRAC~~~","BLK_CONTRA_BALANCE__CRACBRANCH!~BLK_OLTBS_CONTRACT__PRODUCTCODE!","N~N~N",""],"BLK_CONTRA_BALANCE__CONTRACTREFNO__LOV_CONTRACTREFNO_S":["BLK_CONTRA_BALANCE__CONTRACTREFNO~~~","","N~N",""]};
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

ArrFuncOrigin["OLDCONTR"]="KERNEL";
ArrPrntFunc["OLDCONTR"]="";
ArrPrntOrigin["OLDCONTR"]="";
ArrRoutingType["OLDCONTR"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLDCONTR"]="N";
ArrCustomModified["OLDCONTR"]="N";

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
var actStageArry = {"QUERY":"2","NEW":"2","MODIFY":"2","AUTHORIZE":"1","DELETE":"1","CLOSE":"1","REOPEN":"1","REVERSE":"1","ROLLOVER":"1","CONFIRM":"1","LIQUIDATE":"1","SUMMARYQUERY":"2"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------