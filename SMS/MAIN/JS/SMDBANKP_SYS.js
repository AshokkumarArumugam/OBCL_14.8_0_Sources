/***************************************************************************************************************************
**  This source is part of the FLEXCUBE Software Product. 
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
**  File Name          : SMDBANKP_SYS.js
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
var fieldNameArray = {"BLK_BANK_PARAMETERS":"HEAD_OFFICE~SITE_CODE~ACTIVATION_KEY~INVALID_LOGINS_CUM~INVALID_LOGINS_SUC~PWD_PREVENT_REUSE~PWD_CHANGE_AFTER~MAX_PWD_LENGTH~MIN_PWD_LENGTH~PWD_EXPIRY_MSG_DAYS~ARCHIVAL_PERIOD~CONCHAR_PWD_NUM~FREQ_PWD_CHG~MIN_PWD_NUMERIC_LENGTH~LEGAL_NOTICE~DORMANCY_DAYS~DISPLAY_LEGAL_NOTICE~MIN_SPECIALCHAR_LENGTH~MIN_LOWERCASE_CHAR~MIN_UPPERCASE_CHAR~SCREENSAVERREQUIRED~SCREENSAVERTIMEOUTINSECONDS~SCREENSAVERMODIFIABLEBYUSER~PASSWORDEXTERNAL~MASKVALUE~NO_OF_DAYS_TO_FORGET_USER~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH","BLK_BANK_RESTRICTIVE_PASSWD":"CATEGORY~PASSWORD~ID~BRANCH"};

var multipleEntryPageSize = {"BLK_BANK_RESTRICTIVE_PASSWD" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_PASSWD_REST__TAB_MAIN":"BLK_BANK_RESTRICTIVE_PASSWD"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_BANK_PARAMETERS">HEAD_OFFICE~SITE_CODE~ACTIVATION_KEY~INVALID_LOGINS_CUM~INVALID_LOGINS_SUC~PWD_PREVENT_REUSE~PWD_CHANGE_AFTER~MAX_PWD_LENGTH~MIN_PWD_LENGTH~PWD_EXPIRY_MSG_DAYS~ARCHIVAL_PERIOD~CONCHAR_PWD_NUM~FREQ_PWD_CHG~MIN_PWD_NUMERIC_LENGTH~LEGAL_NOTICE~DORMANCY_DAYS~DISPLAY_LEGAL_NOTICE~MIN_SPECIALCHAR_LENGTH~MIN_LOWERCASE_CHAR~MIN_UPPERCASE_CHAR~SCREENSAVERREQUIRED~SCREENSAVERTIMEOUTINSECONDS~SCREENSAVERMODIFIABLEBYUSER~PASSWORDEXTERNAL~MASKVALUE~NO_OF_DAYS_TO_FORGET_USER~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
msgxml += '      <FN PARENT="BLK_BANK_PARAMETERS" RELATION_TYPE="N" TYPE="BLK_BANK_RESTRICTIVE_PASSWD">CATEGORY~PASSWORD~ID~BRANCH</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_BANK_PARAMETERS">AUTHSTAT~TXNSTAT~HEAD_OFFICE~SITE_CODE</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "SMDBANKP";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_BANK_PARAMETERS";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_BANK_PARAMETERS" : "","BLK_BANK_RESTRICTIVE_PASSWD" : "BLK_BANK_PARAMETERS~N"}; 

 var dataSrcLocationArray = new Array("BLK_BANK_PARAMETERS","BLK_BANK_RESTRICTIVE_PASSWD"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside SMDBANKP.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside SMDBANKP.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_BANK_PARAMETERS__SITE_CODE";
pkFields[0] = "BLK_BANK_PARAMETERS__SITE_CODE";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_BANK_PARAMETERS":["ARCHIVAL_PERIOD","CONCHAR_PWD_NUM","DISPLAY_LEGAL_NOTICE","DORMANCY_DAYS","FREQ_PWD_CHG","INVALID_LOGINS_CUM","INVALID_LOGINS_SUC","LEGAL_NOTICE","MASKVALUE","MAX_PWD_LENGTH","MIN_LOWERCASE_CHAR","MIN_PWD_LENGTH","MIN_PWD_NUMERIC_LENGTH","MIN_SPECIALCHAR_LENGTH","MIN_UPPERCASE_CHAR","NO_OF_DAYS_TO_FORGET_USER","PASSWORDEXTERNAL","PWD_CHANGE_AFTER","PWD_EXPIRY_MSG_DAYS","PWD_PREVENT_REUSE","SCREENSAVERMODIFIABLEBYUSER","SCREENSAVERREQUIRED","SCREENSAVERTIMEOUTINSECONDS"],"BLK_BANK_RESTRICTIVE_PASSWD":["PASSWORD"]};
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
var lovInfoFlds = {};
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
var multipleEntryIDs = new Array("BLK_BANK_RESTRICTIVE_PASSWD");
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

ArrFuncOrigin["SMDBANKP"]="KERNEL";
ArrPrntFunc["SMDBANKP"]="";
ArrPrntOrigin["SMDBANKP"]="";
ArrRoutingType["SMDBANKP"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["SMDBANKP"]="N";
ArrCustomModified["SMDBANKP"]="N";

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