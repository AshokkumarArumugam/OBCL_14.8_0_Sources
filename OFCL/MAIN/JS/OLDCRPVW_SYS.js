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
**  File Name          : OLDCRPVW_SYS.js
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
var fieldNameArray = {"BLK_CORP_SUMMARY":"CUSTOMERNO~CUSTOMERNAME~CURRENCY~TOTALCOMITTMENT~TOTALLOAN~TOTALSYNDICATION~SELECTED_INDEX","BLK_LOAN_DETAILS":"CURRENCY~AMOUNT~AMOUNTFINANCED~BOOKDATE~BRANCH~CONTRACTREFNO~CONTRACTSTATUS~CUSTOMER~MATURITYDATE~MODULE~OUSTANDING~PRODUCT~PRODUCTDESC~PRODUCTTYPE~USERDEFSTATUS~VALUEDATE","BLK_COMITTMENT_DETAILS":"CURRENCY~AMOUNTFINANCED~AMOUNT~BOOKDATE~BRANCH~CONTRACTREFNO~CONTRACTSTATUS~CUSTOMER~MATURITYDATE~MODULE~OUTSTANDING~PRODUCT~PRODUCTDESC~PRODUCTTYPE~USERDEFSTATUS~VALUEDATE","BLK_SYNDICATION_DETAILS":"CURRENCY~AMOUNTFINANCED~AMOUNT~BOOKDATE~BRANCH~CONTRACTREFNO~CONTRACTSTATUS~CUSTOMER~MATURITYDATE~MODULE~OUTSTANDING~PRODUCT~PRODUCTDESC~PRODUCTTYPE~USERDEFSTATUS~VALUEDATE","BLK_LOAN_COMP_DET":"CONTRACTREFNO~BRANCH~COMPONENTCCY~COMPONENT~ADVANCE~EXPECTED~LATESTINTRATE~OUTSTANDING~OVERDUE~OVERDUEDAYS~COMPONENTTYPE","BLK_LOAN_COMP_SCHD":"CONTRACTREFNO~COMPONENTCCY~AMOUNTDUE~AMOUNTSETTLED~ACCRUEDAMT~BRANCH~COMPONENT~DUEDATE~EMIAMOUNT","BLK_COMT_COMP_DETAILS":"CONTRACTREFNO~BRANCH~COMPONENTCCY~COMPONENT~ADVANCE~EXPECTED~LATESTINTRATE~OUTSTANDING~OVERDUE~OVERDUEDAYS~COMPONENTTYPE","BLK_COMT_COMP_SCHD":"CONTRACTREFNO~COMPONENTCCY~AMOUNTDUE~AMOUNTSETTLED~ACCRUEDAMT~BRANCH~COMPONENT~DUEDATE~EMIAMOUNT","BLK_SYND_COMP_DETAILS":"CONTRACTREFNO~BRANCH~COMPONENTCCY~COMPONENT~ADVANCE~EXPECTED~LATESTINTRATE~OUTSTANDING~OVERDUE~OVERDUEDAYS~COMPONENTTYPE","BLK_SYND_COMP_SCHD":"CONTRACTREFNO~COMPONENTCCY~AMOUNTDUE~AMOUNTSETTLED~ACCRUEDAMT~BRANCH~COMPONENT~DUEDATE~EMIAMOUNT"};

var multipleEntryPageSize = {"BLK_LOAN_DETAILS" :"15" ,"BLK_COMITTMENT_DETAILS" :"15" ,"BLK_SYNDICATION_DETAILS" :"15" ,"BLK_LOAN_COMP_DET" :"15" ,"BLK_LOAN_COMP_SCHD" :"15" ,"BLK_COMT_COMP_DETAILS" :"15" ,"BLK_COMT_COMP_SCHD" :"15" ,"BLK_SYND_COMP_DETAILS" :"15" ,"BLK_SYND_COMP_SCHD" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_LOAN_DETAILS~BLK_COMITTMENT_DETAILS~BLK_SYNDICATION_DETAILS","CVS_COMP__TAB_MAIN":"BLK_LOAN_COMP_DET~BLK_LOAN_COMP_SCHD","CVS_COMT_COMP__TAB_MAIN":"BLK_COMT_COMP_DETAILS~BLK_COMT_COMP_SCHD","CVS_SYND_COMP__TAB_MAIN":"BLK_SYND_COMP_DETAILS~BLK_SYND_COMP_SCHD"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_CORP_SUMMARY">CUSTOMERNO~CUSTOMERNAME~CURRENCY~TOTALCOMITTMENT~TOTALLOAN~TOTALSYNDICATION~SELECTED_INDEX</FN>'; 
msgxml += '      <FN PARENT="BLK_CORP_SUMMARY" RELATION_TYPE="N" TYPE="BLK_LOAN_DETAILS">CURRENCY~AMOUNT~AMOUNTFINANCED~BOOKDATE~BRANCH~CONTRACTREFNO~CONTRACTSTATUS~CUSTOMER~MATURITYDATE~MODULE~OUSTANDING~PRODUCT~PRODUCTDESC~PRODUCTTYPE~USERDEFSTATUS~VALUEDATE</FN>'; 
msgxml += '      <FN PARENT="BLK_CORP_SUMMARY" RELATION_TYPE="N" TYPE="BLK_COMITTMENT_DETAILS">CURRENCY~AMOUNTFINANCED~AMOUNT~BOOKDATE~BRANCH~CONTRACTREFNO~CONTRACTSTATUS~CUSTOMER~MATURITYDATE~MODULE~OUTSTANDING~PRODUCT~PRODUCTDESC~PRODUCTTYPE~USERDEFSTATUS~VALUEDATE</FN>'; 
msgxml += '      <FN PARENT="BLK_CORP_SUMMARY" RELATION_TYPE="N" TYPE="BLK_SYNDICATION_DETAILS">CURRENCY~AMOUNTFINANCED~AMOUNT~BOOKDATE~BRANCH~CONTRACTREFNO~CONTRACTSTATUS~CUSTOMER~MATURITYDATE~MODULE~OUTSTANDING~PRODUCT~PRODUCTDESC~PRODUCTTYPE~USERDEFSTATUS~VALUEDATE</FN>'; 
msgxml += '      <FN PARENT="BLK_LOAN_DETAILS" RELATION_TYPE="N" TYPE="BLK_LOAN_COMP_DET">CONTRACTREFNO~BRANCH~COMPONENTCCY~COMPONENT~ADVANCE~EXPECTED~LATESTINTRATE~OUTSTANDING~OVERDUE~OVERDUEDAYS~COMPONENTTYPE</FN>'; 
msgxml += '      <FN PARENT="BLK_LOAN_COMP_DET" RELATION_TYPE="N" TYPE="BLK_LOAN_COMP_SCHD">CONTRACTREFNO~COMPONENTCCY~AMOUNTDUE~AMOUNTSETTLED~ACCRUEDAMT~BRANCH~COMPONENT~DUEDATE~EMIAMOUNT</FN>'; 
msgxml += '      <FN PARENT="BLK_COMITTMENT_DETAILS" RELATION_TYPE="N" TYPE="BLK_COMT_COMP_DETAILS">CONTRACTREFNO~BRANCH~COMPONENTCCY~COMPONENT~ADVANCE~EXPECTED~LATESTINTRATE~OUTSTANDING~OVERDUE~OVERDUEDAYS~COMPONENTTYPE</FN>'; 
msgxml += '      <FN PARENT="BLK_COMT_COMP_DETAILS" RELATION_TYPE="N" TYPE="BLK_COMT_COMP_SCHD">CONTRACTREFNO~COMPONENTCCY~AMOUNTDUE~AMOUNTSETTLED~ACCRUEDAMT~BRANCH~COMPONENT~DUEDATE~EMIAMOUNT</FN>'; 
msgxml += '      <FN PARENT="BLK_SYNDICATION_DETAILS" RELATION_TYPE="N" TYPE="BLK_SYND_COMP_DETAILS">CONTRACTREFNO~BRANCH~COMPONENTCCY~COMPONENT~ADVANCE~EXPECTED~LATESTINTRATE~OUTSTANDING~OVERDUE~OVERDUEDAYS~COMPONENTTYPE</FN>'; 
msgxml += '      <FN PARENT="BLK_SYND_COMP_DETAILS" RELATION_TYPE="N" TYPE="BLK_SYND_COMP_SCHD">CONTRACTREFNO~COMPONENTCCY~AMOUNTDUE~AMOUNTSETTLED~ACCRUEDAMT~BRANCH~COMPONENT~DUEDATE~EMIAMOUNT</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_MAIN";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_CORP_SUMMARY" : "","BLK_LOAN_DETAILS" : "BLK_CORP_SUMMARY~N","BLK_COMITTMENT_DETAILS" : "BLK_CORP_SUMMARY~N","BLK_SYNDICATION_DETAILS" : "BLK_CORP_SUMMARY~N","BLK_LOAN_COMP_DET" : "BLK_LOAN_DETAILS~N","BLK_LOAN_COMP_SCHD" : "BLK_LOAN_COMP_DET~N","BLK_COMT_COMP_DETAILS" : "BLK_COMITTMENT_DETAILS~N","BLK_COMT_COMP_SCHD" : "BLK_COMT_COMP_DETAILS~N","BLK_SYND_COMP_DETAILS" : "BLK_SYNDICATION_DETAILS~N","BLK_SYND_COMP_SCHD" : "BLK_SYND_COMP_DETAILS~N"}; 

 var dataSrcLocationArray = new Array("BLK_CORP_SUMMARY","BLK_LOAN_DETAILS","BLK_COMITTMENT_DETAILS","BLK_SYNDICATION_DETAILS","BLK_LOAN_COMP_DET","BLK_LOAN_COMP_SCHD","BLK_COMT_COMP_DETAILS","BLK_COMT_COMP_SCHD","BLK_SYND_COMP_DETAILS","BLK_SYND_COMP_SCHD"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLDCRPVW.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLDCRPVW.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_CORP_SUMMARY__CUSTOMERNO";
pkFields[0] = "BLK_CORP_SUMMARY__CUSTOMERNO";
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
var lovInfoFlds = {"BLK_CORP_SUMMARY__CUSTOMERNO__LOV_CUSTNO":["BLK_CORP_SUMMARY__CUSTOMERNO~BLK_CORP_SUMMARY__CUSTOMERNAME~","","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_LOAN_DETAILS","BLK_COMITTMENT_DETAILS","BLK_SYNDICATION_DETAILS","BLK_LOAN_COMP_DET","BLK_LOAN_COMP_SCHD","BLK_COMT_COMP_DETAILS","BLK_COMT_COMP_SCHD","BLK_SYND_COMP_DETAILS","BLK_SYND_COMP_SCHD");
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

ArrFuncOrigin["OLDCRPVW"]="KERNEL";
ArrPrntFunc["OLDCRPVW"]="";
ArrPrntOrigin["OLDCRPVW"]="";
ArrRoutingType["OLDCRPVW"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLDCRPVW"]="N";
ArrCustomModified["OLDCRPVW"]="N";

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