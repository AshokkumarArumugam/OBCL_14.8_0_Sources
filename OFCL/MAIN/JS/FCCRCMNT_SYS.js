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
**  File Name          : FCCRCMNT_SYS.js
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
var fieldNameArray = {"BLK_CONTRA_MARGIN":"CONTRACTREFNUM~TXPRDCTCODE~TXPRDCTDESC~TXCUSTOMER~TXTCUSTNAME~TXFACILITYNAME~TXUSERREFNO~LATESTVERSION~TXTTOTAL~TXTPRODLIST","BLK_MARGIN_COMPONENT":"BRANCHCODE~CONTRACTREFNO~CUSTOMERNO~COMPONENT~CURRENCY~SLABTIER~AMTORPERCENT~TXT_USER_REF_NO~TXT_CUSTOMER_NAME~TXT_COMPONENT_DESCRIPTION~MODNO~ONCEAUTH~RECORDSTAT~AUTHSTAT~MAKERID~MAKERDTSTAMP~CHECKERID~CHECKERDTSTAMP~LASTCHANGESTMP~PROCESSSTAT~PROCESSTMSTMP","BLK_MARGIN_CCY":"CCY~BRANCHCODE~CUSTOMERNO~CONTRACTREFNO~COMPONENT~TXT_CCY_DESC","BLK_MARGIN_EFFDATE":"BRANCHCODE~CUSTOMERNO~COMPONENT~CONTRACTREFNO~CCY~LASTCHAGETIMESTAMP~RECALCREQD~EFFECTIVEDATE","BLK_MARGIN_RATE":"MARGIN~COMPONENT~EFFECTIVEDATE~CUSTOMERNO~MARGINRATE~CCY~FROMBASISAMT~CONTRACTREFNO~TOBASISAMT~BRANCHCODE~SEQ_NO~MARGINRECORDSTATUS~TXTPARTMAR","BLK_PARTICIPANT_MARGIN":"BRNCODE~FRMBASISAMT~CUSTOMER~MARGINRAT~EFFECTDATE~CCY~MARGIN~PARTICIPANT~COMPONENT~CONTRACTREFNUM~TXTPARTNAME~TXTASSETRATIO~TXTTOTAL~TOBASISAMT","BLK_PARTICIPANTDATA":"CONTRACT_REF_NO~SSI_MNEMONIC~EVENT_SEQ_NO~DRAWDOWN_NO~OPERATION~CONTRACT_TYPE~SELF_PARTICIPATION~SETTLEMENT_SEQ_NO~PARTICIPANT~ORIGINATOR~ASSET_RATIO~VALUE_DATE~VERSION_NO~NETTING_PREF"};

var multipleEntryPageSize = {"BLK_MARGIN_CCY" :"15" ,"BLK_MARGIN_EFFDATE" :"15" ,"BLK_MARGIN_RATE" :"15" ,"BLK_PARTICIPANT_MARGIN" :"15" };

var multipleEntrySVBlocks = "BLK_MARGIN_COMPONENT";

var tabMEBlks = {"CVS_MARGIN__TAB_MAIN":"BLK_MARGIN_CCY~BLK_MARGIN_EFFDATE~BLK_MARGIN_RATE~BLK_PARTICIPANT_MARGIN"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_CONTRA_MARGIN">CONTRACTREFNUM~TXPRDCTCODE~TXPRDCTDESC~TXCUSTOMER~TXTCUSTNAME~TXFACILITYNAME~TXUSERREFNO~LATESTVERSION~TXTTOTAL~TXTPRODLIST</FN>'; 
msgxml += '      <FN PARENT="BLK_CONTRA_MARGIN" RELATION_TYPE="N" TYPE="BLK_MARGIN_COMPONENT">BRANCHCODE~CONTRACTREFNO~CUSTOMERNO~COMPONENT~CURRENCY~SLABTIER~AMTORPERCENT~TXT_USER_REF_NO~TXT_CUSTOMER_NAME~TXT_COMPONENT_DESCRIPTION~MODNO~ONCEAUTH~RECORDSTAT~AUTHSTAT~MAKERID~MAKERDTSTAMP~CHECKERID~CHECKERDTSTAMP~LASTCHANGESTMP~PROCESSSTAT~PROCESSTMSTMP</FN>'; 
msgxml += '      <FN PARENT="BLK_MARGIN_COMPONENT" RELATION_TYPE="N" TYPE="BLK_MARGIN_CCY">CCY~BRANCHCODE~CUSTOMERNO~CONTRACTREFNO~COMPONENT~TXT_CCY_DESC</FN>'; 
msgxml += '      <FN PARENT="BLK_MARGIN_CCY" RELATION_TYPE="N" TYPE="BLK_MARGIN_EFFDATE">BRANCHCODE~CUSTOMERNO~COMPONENT~CONTRACTREFNO~CCY~LASTCHAGETIMESTAMP~RECALCREQD~EFFECTIVEDATE</FN>'; 
msgxml += '      <FN PARENT="BLK_MARGIN_EFFDATE" RELATION_TYPE="N" TYPE="BLK_MARGIN_RATE">MARGIN~COMPONENT~EFFECTIVEDATE~CUSTOMERNO~MARGINRATE~CCY~FROMBASISAMT~CONTRACTREFNO~TOBASISAMT~BRANCHCODE~SEQ_NO~MARGINRECORDSTATUS~TXTPARTMAR</FN>'; 
msgxml += '      <FN PARENT="BLK_MARGIN_RATE" RELATION_TYPE="N" TYPE="BLK_PARTICIPANT_MARGIN">BRNCODE~FRMBASISAMT~CUSTOMER~MARGINRAT~EFFECTDATE~CCY~MARGIN~PARTICIPANT~COMPONENT~CONTRACTREFNUM~TXTPARTNAME~TXTASSETRATIO~TXTTOTAL~TOBASISAMT</FN>'; 
msgxml += '      <FN PARENT="BLK_CONTRA_MARGIN" RELATION_TYPE="N" TYPE="BLK_PARTICIPANTDATA">CONTRACT_REF_NO~SSI_MNEMONIC~EVENT_SEQ_NO~DRAWDOWN_NO~OPERATION~CONTRACT_TYPE~SELF_PARTICIPATION~SETTLEMENT_SEQ_NO~PARTICIPANT~ORIGINATOR~ASSET_RATIO~VALUE_DATE~VERSION_NO~NETTING_PREF</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_MARGIN";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_CONTRA_MARGIN" : "","BLK_MARGIN_COMPONENT" : "BLK_CONTRA_MARGIN~N","BLK_MARGIN_CCY" : "BLK_MARGIN_COMPONENT~N","BLK_MARGIN_EFFDATE" : "BLK_MARGIN_CCY~N","BLK_MARGIN_RATE" : "BLK_MARGIN_EFFDATE~N","BLK_PARTICIPANT_MARGIN" : "BLK_MARGIN_RATE~N","BLK_PARTICIPANTDATA" : "BLK_CONTRA_MARGIN~N"}; 

 var dataSrcLocationArray = new Array("BLK_CONTRA_MARGIN","BLK_MARGIN_COMPONENT","BLK_MARGIN_CCY","BLK_MARGIN_EFFDATE","BLK_MARGIN_RATE","BLK_PARTICIPANT_MARGIN","BLK_PARTICIPANTDATA"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside FCCRCMNT.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside FCCRCMNT.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_CONTRA_MARGIN__CONTRACTREFNUM";
pkFields[0] = "BLK_CONTRA_MARGIN__CONTRACTREFNUM";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_MARGIN_CCY":["CCY","TXT_CCY_DESC"],"BLK_MARGIN_EFFDATE":["EFFECTIVEDATEI"],"BLK_MARGIN_RATE":["FROMBASISAMT","MARGINRATE","TOBASISAMT"]};
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
var lovInfoFlds = {"BLK_MARGIN_COMPONENT__CUSTOMERNO__LOV_CUSTOMER":["BLK_MARGIN_COMPONENT__CUSTOMERNO~BLK_MARGIN_COMPONENT__TXT_CUSTOMER_NAME~","BLK_MARGIN_COMPONENT__CONTRACTREFNO!VARCHAR2~BLK_MARGIN_COMPONENT__CONTRACTREFNO!VARCHAR2","N~N",""],"BLK_MARGIN_COMPONENT__COMPONENT__LOV_COMPONENT":["BLK_MARGIN_COMPONENT__COMPONENT~BLK_MARGIN_COMPONENT__TXT_COMPONENT_DESCRIPTION~","BLK_CONTRA_MARGIN__TXTPRODLIST!VARCHAR2~BLK_CONTRA_MARGIN__TXTPRODLIST!VARCHAR2","N~N",""],"BLK_MARGIN_CCY__CCY__LOV_CCY":["BLK_MARGIN_CCY__CCY~BLK_MARGIN_CCY__TXT_CCY_DESC~","BLK_MARGIN_COMPONENT__CONTRACTREFNO!VARCHAR2~BLK_MARGIN_COMPONENT__CONTRACTREFNO!VARCHAR2~BLK_MARGIN_COMPONENT__CUSTOMERNO!VARCHAR2~BLK_MARGIN_COMPONENT__COMPONENT!VARCHAR2~BLK_MARGIN_COMPONENT__CONTRACTREFNO!VARCHAR2~BLK_MARGIN_COMPONENT__CONTRACTREFNO!VARCHAR2","N~N",""],"BLK_PARTICIPANT_MARGIN__PARTICIPANT__LOV_PARTICIPANT":["BLK_PARTICIPANT_MARGIN__PARTICIPANT~BLK_PARTICIPANT_MARGIN__TXTPARTNAME~","BLK_MARGIN_COMPONENT__CONTRACTREFNO!VARCHAR2","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_MARGIN_CCY","BLK_MARGIN_EFFDATE","BLK_MARGIN_RATE","BLK_PARTICIPANT_MARGIN");
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

ArrFuncOrigin["FCCRCMNT"]="KERNEL";
ArrPrntFunc["FCCRCMNT"]="";
ArrPrntOrigin["FCCRCMNT"]="";
ArrRoutingType["FCCRCMNT"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["FCCRCMNT"]="N";
ArrCustomModified["FCCRCMNT"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_MARGIN":"CONTRACTREFNUM~LATESTVERSION"};
var scrArgSource = {};
var scrArgVals = {"CVS_MARGIN":"~"};
var scrArgDest = {"CVS_MARGIN":"BLK_CONTRA_MARGIN__CONTRACTREFNUM~BLK_CONTRA_MARGIN__LATESTVERSION"};
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