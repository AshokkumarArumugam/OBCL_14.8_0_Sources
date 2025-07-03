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
**  File Name          : LFCPRCHG_SYS.js
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
var fieldNameArray = {"BLK_PRODUCT_CHARGES":"PRDCD~PRDDESC~PRDTYP~MODULE","BLK_CHARGE_DETAILS":"PRODUCT~COMPONENT~CHARGETYPE~THIRDPARTYTYPE~DEBITORCREDITTYPE~NETCONSINDICATOR~NETCONSPLUSORMINUS~SWIFTQUALIFIER~EVENTFORASSOCIATION~EVENTFORAPPLICATION~EVENTFORLIQUIDATION~BASISAMOUNTTAG~DEFAULTRULE~SETTLEMENTCCY~DEFAULTWAIVER~ALLOWRULEAMENDMENT~AMENDAFTERASSOCIATION~ALLOWAMOUNTAMENDMENT~AMENDAFTERAPPLICATION~STOPASSOCIATION~COMPONENTONCEAUTH~MODULE~COMPONENTNO~PROPAGATIONREQD~CHARGEMODE~DERIVATIONOFCHARGERULE~CHARGECONSOLIDATIONTYPE~PRIORITY~SWIFTCHARGE~REPAIRCHARGE~DISCACCRAPPLICABLE~CHARGECONSOLIDATIONBASIS~CAPITALIZE~COMPONENTDESCUI~EVENTFORASSODESCUI~EVENTFORAPPLDESCUI~EVENTFORLIQDDESCUI~BASISAMTDESCUI~DEFAULTRULEDESCUI~ACCRREQUIREDUI~CURRENT_COMP~ECA_CHK_REQD"};

var multipleEntryPageSize = {};

var multipleEntrySVBlocks = "BLK_CHARGE_DETAILS";

var tabMEBlks = {};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_PRODUCT_CHARGES">PRDCD~PRDDESC~PRDTYP~MODULE</FN>'; 
msgxml += '      <FN PARENT="BLK_PRODUCT_CHARGES" RELATION_TYPE="N" TYPE="BLK_CHARGE_DETAILS">PRODUCT~COMPONENT~CHARGETYPE~THIRDPARTYTYPE~DEBITORCREDITTYPE~NETCONSINDICATOR~NETCONSPLUSORMINUS~SWIFTQUALIFIER~EVENTFORASSOCIATION~EVENTFORAPPLICATION~EVENTFORLIQUIDATION~BASISAMOUNTTAG~DEFAULTRULE~SETTLEMENTCCY~DEFAULTWAIVER~ALLOWRULEAMENDMENT~AMENDAFTERASSOCIATION~ALLOWAMOUNTAMENDMENT~AMENDAFTERAPPLICATION~STOPASSOCIATION~COMPONENTONCEAUTH~MODULE~COMPONENTNO~PROPAGATIONREQD~CHARGEMODE~DERIVATIONOFCHARGERULE~CHARGECONSOLIDATIONTYPE~PRIORITY~SWIFTCHARGE~REPAIRCHARGE~DISCACCRAPPLICABLE~CHARGECONSOLIDATIONBASIS~CAPITALIZE~COMPONENTDESCUI~EVENTFORASSODESCUI~EVENTFORAPPLDESCUI~EVENTFORLIQDDESCUI~BASISAMTDESCUI~DEFAULTRULEDESCUI~ACCRREQUIREDUI~CURRENT_COMP~ECA_CHK_REQD</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_CHARGE_CLASS";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_PRODUCT_CHARGES" : "","BLK_CHARGE_DETAILS" : "BLK_PRODUCT_CHARGES~N"}; 

 var dataSrcLocationArray = new Array("BLK_PRODUCT_CHARGES","BLK_CHARGE_DETAILS"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LFCPRCHG.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LFCPRCHG.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_PRODUCT_CHARGES__PRDCD";
pkFields[0] = "BLK_PRODUCT_CHARGES__PRDCD";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_CHARGE_DETAILS":["ALLOWAMOUNTAMENDMENT","ALLOWRULEAMENDMENT","AMENDAFTERAPPLICATION","AMENDAFTERASSOCIATION","CHARGETYPE","COMPONENT","COMPONENTNO","DEBITORCREDITTYPE","DEFAULTRULE","DEFAULTWAIVER","DISCACCRAPPLICABLE","ECA_CHK_REQD","PROPAGATIONREQD","SETTLEMENTCCY","STOPASSOCIATION","SWIFTQUALIFIER","THIRDPARTYTYPE"]};
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
var lovInfoFlds = {"BLK_CHARGE_DETAILS__COMPONENT__LOV_COMPONENT":["BLK_CHARGE_DETAILS__COMPONENT~BLK_CHARGE_DETAILS__COMPONENTDESCUI~","BLK_PRODUCT_CHARGES__MODULE!VARCHAR","N~N",""],"BLK_CHARGE_DETAILS__DEFAULTRULE__LOV_RULE":["BLK_CHARGE_DETAILS__DEFAULTRULE~BLK_CHARGE_DETAILS__DEFAULTRULEDESCUI~","","N~N","N"],"BLK_CHARGE_DETAILS__SETTLEMENTCCY__LOV_SETTLEMENT_CCY":["BLK_CHARGE_DETAILS__SETTLEMENTCCY~~","","N~N","N"]};
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

ArrFuncOrigin["LFCPRCHG"]="KERNEL";
ArrPrntFunc["LFCPRCHG"]="";
ArrPrntOrigin["LFCPRCHG"]="";
ArrRoutingType["LFCPRCHG"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LFCPRCHG"]="N";
ArrCustomModified["LFCPRCHG"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_CHARGE_CLASS":"PROD~PRODDESC~MODU~PRODTYPE~MOD"};
var scrArgSource = {};
var scrArgVals = {"CVS_CHARGE_CLASS":"~~~~"};
var scrArgDest = {"CVS_CHARGE_CLASS":"BLK_PRODUCT_CHARGES__PRDCD~BLK_PRODUCT_CHARGES__PRDDESC~BLK_PRODUCT_CHARGES__MODULE~BLK_PRODUCT_CHARGES__PRDTYP~BLK_CHARGE_DETAILS__MODULE"};
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