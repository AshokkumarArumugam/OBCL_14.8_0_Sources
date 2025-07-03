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
**  File Name          : TXDRLHIS_SYS.js
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
var fieldNameArray = {"BLK_RULEHISTORY":"CUSTOMER~CURRENCY~RULECODE~COUNTRY~CUSTTAXGROUP~VERSIONNO~EFFENDDATE~NATIONALITY~EFFECTIVEDATE~CUREENCYDE~COUNTRYDESC~NATIONALITYDESC~CUSTGROUP~CUSTDESC~LINKEDTOGROUP~CALCROUNDMTHD~RULEMETHOD~CCYRATETYPE~CCYBUYSELL~FORMSTATUS~SPECIALTAXTYPE~CALCDECIMALS~ROUNDMTHD~MAXAMOUNT~INVOICEREQD~ROUNDDECIMALS~ROUNDUNIT~ROUNDOPT~CALCBUSELL~CUMULATIVE~MINAMOUNT~REFCCY~CALCROUND_OPT~DESCRIPTION~CALCCCY~TAXGROUP~CALCROUNDUNIT~CALCCCYRATETYPE~CALCCCYOPT~CCYOPT~OF~MAXVERNUM~CURVERNUM~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH","BLK_SLAB":"BASISAMTTO~FLOORCHARGE~FLOORAMT~FLATAMT~BASISAMTFROM~RATE~CCY"};

var multipleEntryPageSize = {"BLK_SLAB" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_SLAB"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_RULEHISTORY">CUSTOMER~CURRENCY~RULECODE~COUNTRY~CUSTTAXGROUP~VERSIONNO~EFFENDDATE~NATIONALITY~EFFECTIVEDATE~CUREENCYDE~COUNTRYDESC~NATIONALITYDESC~CUSTGROUP~CUSTDESC~LINKEDTOGROUP~CALCROUNDMTHD~RULEMETHOD~CCYRATETYPE~CCYBUYSELL~FORMSTATUS~SPECIALTAXTYPE~CALCDECIMALS~ROUNDMTHD~MAXAMOUNT~INVOICEREQD~ROUNDDECIMALS~ROUNDUNIT~ROUNDOPT~CALCBUSELL~CUMULATIVE~MINAMOUNT~REFCCY~CALCROUND_OPT~DESCRIPTION~CALCCCY~TAXGROUP~CALCROUNDUNIT~CALCCCYRATETYPE~CALCCCYOPT~CCYOPT~OF~MAXVERNUM~CURVERNUM~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="N" TYPE="BLK_SLAB">BASISAMTTO~FLOORCHARGE~FLOORAMT~FLATAMT~BASISAMTFROM~RATE~CCY</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_MAIN";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_RULEHISTORY" : "","BLK_SLAB" : ""}; 

 var dataSrcLocationArray = new Array("BLK_RULEHISTORY","BLK_SLAB"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside TXDRLHIS.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside TXDRLHIS.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_RULEHISTORY__EFFECTIVEDATE";
pkFields[0] = "BLK_RULEHISTORY__EFFECTIVEDATE";
queryFields[1] = "BLK_RULEHISTORY__RULECODE";
pkFields[1] = "BLK_RULEHISTORY__RULECODE";
queryFields[2] = "BLK_RULEHISTORY__VERSIONNO";
pkFields[2] = "BLK_RULEHISTORY__VERSIONNO";
queryFields[3] = "BLK_RULEHISTORY__COUNTRY";
pkFields[3] = "BLK_RULEHISTORY__COUNTRY";
queryFields[4] = "BLK_RULEHISTORY__CUSTOMER";
pkFields[4] = "BLK_RULEHISTORY__CUSTOMER";
queryFields[5] = "BLK_RULEHISTORY__CUSTTAXGROUP";
pkFields[5] = "BLK_RULEHISTORY__CUSTTAXGROUP";
queryFields[6] = "BLK_RULEHISTORY__CURRENCY";
pkFields[6] = "BLK_RULEHISTORY__CURRENCY";
queryFields[7] = "BLK_RULEHISTORY__NATIONALITY";
pkFields[7] = "BLK_RULEHISTORY__NATIONALITY";
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
var lovInfoFlds = {"BLK_RULEHISTORY__CUSTOMER__LOV_CUSTOMER":["BLK_RULEHISTORY__CUSTOMER~BLK_RULEHISTORY__CUSTDESC~","","N~N",""],"BLK_RULEHISTORY__CURRENCY__LOV_CCY":["BLK_RULEHISTORY__CURRENCY~BLK_RULEHISTORY__CUREENCYDE~","","N~N",""],"BLK_RULEHISTORY__RULECODE__LOV_RULE":["BLK_RULEHISTORY__RULECODE~","","N",""],"BLK_RULEHISTORY__COUNTRY__LOV_COUNTRY":["BLK_RULEHISTORY__COUNTRY~BLK_RULEHISTORY__COUNTRYDESC~","","N~N",""],"BLK_RULEHISTORY__CUSTTAXGROUP__LOV_CUSTTAX":["BLK_RULEHISTORY__CUSTTAXGROUP~BLK_RULEHISTORY__CUSTGROUP~","","N~N",""],"BLK_RULEHISTORY__NATIONALITY__LOV_NATIONALITY":["BLK_RULEHISTORY__NATIONALITY~BLK_RULEHISTORY__NATIONALITYDESC~","","N~N",""],"BLK_RULEHISTORY__REFCCY__LOV_CCY":["BLK_RULEHISTORY__REFCCY~BLK_RULEHISTORY__REFCCYDESC~","","N~N",""],"BLK_RULEHISTORY__CALCCCY__LOV_CCY":["BLK_RULEHISTORY__CALCCCY~BLK_RULEHISTORY__CALCCYDESC~","","N~N",""],"BLK_RULEHISTORY__CALCCCYRATETYPE__LOV_CALCCCYRATETYPE1":["BLK_RULEHISTORY__CALCCCYRATETYPE~BLK_RULEHISTORY__CCYRATETYPEDESC~","","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_SLAB");
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

ArrFuncOrigin["TXDRLHIS"]="KERNEL";
ArrPrntFunc["TXDRLHIS"]="";
ArrPrntOrigin["TXDRLHIS"]="";
ArrRoutingType["TXDRLHIS"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["TXDRLHIS"]="N";
ArrCustomModified["TXDRLHIS"]="N";

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