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
**  File Name          : OLDININS_SYS.js
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
var fieldNameArray = {"BLK_INSURANCE_MASTER":"EXTREFNO~ORIGINALINSURANCESEQNO~CANCELLATIONDATE~FLOODZONE~MODIFYDATE~VERSIONNO~BLANKET~FORCE~PENDINGLOSS~SETTLEMENTSEQNO~PROPERTYCODE~BILLINGSTATUS~EXPIRYDATE~NEXTREMITDATE~EFFECTIVEDATE~PREMIUMCURRENCY~PREMIUMAMOUNT~INSURANCEAGENT~SERVICEPROVIDER~POLICYNUMBER~INSURANCETYPE~ESCROWTYPE~SEQNO~BRANCHCODE~CONTRACTREFNO~CUSTNAME~PRINCIPALBALANCE~POLSTATCHANGEDATE~POLICYSTATUS~HANDOFFSTATUS~CANCELLATIONCODE~NEWPOLICYNUMBER~INSURANCEDESC~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH","BLK_INS_NOTES_MASTER":"PROPCDE~SERVPROV~POLNO~INSTYP~CREFNO~INSEQNO~NOTSEQNO~CROSEQNO~REM1~REM2~VERSNO","BLK_INS_COVERAGE_MASTER":"PRPCDE~SRVCPRVDR~PLCYNUM~INRNCTYPE~CREFNUMBER~INSQNO~CVRGSEQNO~PRETRM~VRNO~CCY1~REPAMT~DEDTYP~DEDAMT~COINSRNCPER~LMT~CVRGTYP","BLK_INSURANCE_HISTORY":"AUDDATE~VERNUMBER~BLNKT~FRC~PNDNGLOSS~SETTLESEQNUM~PROPERCODE~BILLSTAT~EXPDT~NXTREMDT~EFFDT~PRECCY~PREAMT~INSAGNT~SERVICEPRVDR~POLICYNUMB~INSURNCTYP~INSURNCSEQNO~CONTRCTRFNO","BLK_INS_NOTES_HISTORY":"CROSSREFNO~REMARKS2~REMARKS1~NOTESSEQNO~VNO","BLK_INS_COVERAGE_HISTORY":"PREMTERM~CCY2~REPLAMT~DEDUCTYP~DEDUCAMT~COINSURAPERCENT~LMTS~CVRGTYP~CVRGSEQNUM~VRSNO"};

var multipleEntryPageSize = {"BLK_INS_COVERAGE_MASTER" :"15" ,"BLK_INSURANCE_HISTORY" :"15" ,"BLK_INS_NOTES_HISTORY" :"15" ,"BLK_INS_COVERAGE_HISTORY" :"15" ,"BLK_INS_NOTES_MASTER" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_COVERAGE__TAB_MAIN":"BLK_INS_COVERAGE_MASTER","CVS_CHANGES__TAB_MAIN":"BLK_INSURANCE_HISTORY~BLK_INS_NOTES_HISTORY~BLK_INS_COVERAGE_HISTORY","CVS_NOTES__TAB_MAIN":"BLK_INS_NOTES_MASTER"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_INSURANCE_MASTER">EXTREFNO~ORIGINALINSURANCESEQNO~CANCELLATIONDATE~FLOODZONE~MODIFYDATE~VERSIONNO~BLANKET~FORCE~PENDINGLOSS~SETTLEMENTSEQNO~PROPERTYCODE~BILLINGSTATUS~EXPIRYDATE~NEXTREMITDATE~EFFECTIVEDATE~PREMIUMCURRENCY~PREMIUMAMOUNT~INSURANCEAGENT~SERVICEPROVIDER~POLICYNUMBER~INSURANCETYPE~ESCROWTYPE~SEQNO~BRANCHCODE~CONTRACTREFNO~CUSTNAME~PRINCIPALBALANCE~POLSTATCHANGEDATE~POLICYSTATUS~HANDOFFSTATUS~CANCELLATIONCODE~NEWPOLICYNUMBER~INSURANCEDESC~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
msgxml += '      <FN PARENT="BLK_INSURANCE_MASTER" RELATION_TYPE="N" TYPE="BLK_INS_NOTES_MASTER">PROPCDE~SERVPROV~POLNO~INSTYP~CREFNO~INSEQNO~NOTSEQNO~CROSEQNO~REM1~REM2~VERSNO</FN>'; 
msgxml += '      <FN PARENT="BLK_INSURANCE_MASTER" RELATION_TYPE="N" TYPE="BLK_INS_COVERAGE_MASTER">PRPCDE~SRVCPRVDR~PLCYNUM~INRNCTYPE~CREFNUMBER~INSQNO~CVRGSEQNO~PRETRM~VRNO~CCY1~REPAMT~DEDTYP~DEDAMT~COINSRNCPER~LMT~CVRGTYP</FN>'; 
msgxml += '      <FN PARENT="BLK_INSURANCE_MASTER" RELATION_TYPE="N" TYPE="BLK_INSURANCE_HISTORY">AUDDATE~VERNUMBER~BLNKT~FRC~PNDNGLOSS~SETTLESEQNUM~PROPERCODE~BILLSTAT~EXPDT~NXTREMDT~EFFDT~PRECCY~PREAMT~INSAGNT~SERVICEPRVDR~POLICYNUMB~INSURNCTYP~INSURNCSEQNO~CONTRCTRFNO</FN>'; 
msgxml += '      <FN PARENT="BLK_INSURANCE_HISTORY" RELATION_TYPE="N" TYPE="BLK_INS_NOTES_HISTORY">CROSSREFNO~REMARKS2~REMARKS1~NOTESSEQNO~VNO</FN>'; 
msgxml += '      <FN PARENT="BLK_INSURANCE_HISTORY" RELATION_TYPE="N" TYPE="BLK_INS_COVERAGE_HISTORY">PREMTERM~CCY2~REPLAMT~DEDUCTYP~DEDUCAMT~COINSURAPERCENT~LMTS~CVRGTYP~CVRGSEQNUM~VRSNO</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_INSURANCE_MASTER">AUTHSTAT~TXNSTAT~CONTRACTREFNO~SEQNO~BRANCHCODE~SERVICEPROVIDER~POLICYNUMBER~INSURANCETYPE~BILLINGSTATUS~PROPERTYCODE</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "OLDININS";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_INSURANCE_MASTER";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_INSURANCE_MASTER" : "","BLK_INS_NOTES_MASTER" : "BLK_INSURANCE_MASTER~N","BLK_INS_COVERAGE_MASTER" : "BLK_INSURANCE_MASTER~N","BLK_INSURANCE_HISTORY" : "BLK_INSURANCE_MASTER~N","BLK_INS_NOTES_HISTORY" : "BLK_INSURANCE_HISTORY~N","BLK_INS_COVERAGE_HISTORY" : "BLK_INSURANCE_HISTORY~N"}; 

 var dataSrcLocationArray = new Array("BLK_INSURANCE_MASTER","BLK_INS_NOTES_MASTER","BLK_INS_COVERAGE_MASTER","BLK_INSURANCE_HISTORY","BLK_INS_NOTES_HISTORY","BLK_INS_COVERAGE_HISTORY"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLDININS.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLDININS.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_INSURANCE_MASTER__CONTRACTREFNO";
pkFields[0] = "BLK_INSURANCE_MASTER__CONTRACTREFNO";
queryFields[1] = "BLK_INSURANCE_MASTER__INSURANCETYPE";
pkFields[1] = "BLK_INSURANCE_MASTER__INSURANCETYPE";
queryFields[2] = "BLK_INSURANCE_MASTER__POLICYNUMBER";
pkFields[2] = "BLK_INSURANCE_MASTER__POLICYNUMBER";
queryFields[3] = "BLK_INSURANCE_MASTER__SEQNO";
pkFields[3] = "BLK_INSURANCE_MASTER__SEQNO";
queryFields[4] = "BLK_INSURANCE_MASTER__SERVICEPROVIDER";
pkFields[4] = "BLK_INSURANCE_MASTER__SERVICEPROVIDER";
queryFields[5] = "BLK_INSURANCE_MASTER__PROPERTYCODE";
pkFields[5] = "BLK_INSURANCE_MASTER__PROPERTYCODE";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_INSURANCE_MASTER":["BILLINGSTATUS","BLANKET","CANCELLATIONCODE","CANCELLATIONDATEI","EFFECTIVEDATEI","EXPIRYDATEI","FORCE","MODIFYDATEI","NEXTREMITDATEI","PENDINGLOSS","POLICYSTATUS","POLSTATCHANGEDATEI","PREMIUMAMOUNT","PROPERTYCODE","SERVICEPROVIDER"],"BLK_INS_COVERAGE_MASTER":["COINSRNCPER","CVRGTYP","DEDAMT","DEDTYP","LMT","REPAMT"],"BLK_INS_NOTES_MASTER":["REM1","REM2"]};
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
var lovInfoFlds = {"BLK_INSURANCE_MASTER__FLOODZONE__LOV_FLOOD_ZONE":["BLK_INSURANCE_MASTER__FLOODZONE~~","","N~N",""],"BLK_INSURANCE_MASTER__SETTLEMENTSEQNO__LOV_SETTLEMENT_SEQ":["BLK_INSURANCE_MASTER__SETTLEMENTSEQNO~~~~~~","BLK_INSURANCE_MASTER__SERVICEPROVIDER!VARCHAR2~BLK_INSURANCE_MASTER__CONTRACTREFNO!VARCHAR2","N~N~N~N~N~N",""],"BLK_INSURANCE_MASTER__PROPERTYCODE__LOV_PROPERTY_CODE":["BLK_INSURANCE_MASTER__PROPERTYCODE~~","BLK_INSURANCE_MASTER__CONTRACTREFNO!VARCHAR2","N~N",""],"BLK_INSURANCE_MASTER__SERVICEPROVIDER__LOV_SERVICE_PROVIDER":["BLK_INSURANCE_MASTER__SERVICEPROVIDER~~","","N~N",""],"BLK_INSURANCE_MASTER__INSURANCETYPE__LOV_INSURANCE_TYPE":["BLK_INSURANCE_MASTER__INSURANCETYPE~BLK_INSURANCE_MASTER__INSURANCEDESC~","","N~N",""],"BLK_INSURANCE_MASTER__CONTRACTREFNO__LOV_REF_NO":["BLK_INSURANCE_MASTER__CONTRACTREFNO~BLK_INSURANCE_MASTER__BRANCHCODE~~BLK_INSURANCE_MASTER__PREMIUMCURRENCY~~","","N~N~N~N~N",""],"BLK_INSURANCE_MASTER__CANCELLATIONCODE__LOV_CANCELLATION_CODE":["BLK_INSURANCE_MASTER__CANCELLATIONCODE~~","","N~N",""],"BLK_INS_COVERAGE_MASTER__CVRGTYP__LOV_COVERAGE_TYPE":["BLK_INS_COVERAGE_MASTER__CVRGTYP~~","","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_INS_COVERAGE_MASTER","BLK_INSURANCE_HISTORY","BLK_INS_NOTES_HISTORY","BLK_INS_COVERAGE_HISTORY","BLK_INS_NOTES_MASTER");
var multipleEntryArray = new Array();
var multipleEntryCells = new Array();
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY VIEW SINGLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR ATTACHED CALLFORMS *****
 //----------------------------------------------------------------------------------------------------------------------

 var CallFormArray= new Array("CSCFNUDF~BLK_INSURANCE_MASTER"); 

 var CallFormRelat=new Array("ONE TO ONE"); 

 var CallRelatType= new Array("1"); 


 var ArrFuncOrigin=new Array();
 var ArrPrntFunc=new Array();
 var ArrPrntOrigin=new Array();
 var ArrRoutingType=new Array();


 // Code for Loading Cluster/Custom js File Starts
 var ArrClusterModified=new Array();
 var ArrCustomModified=new Array();
 // Code for Loading Cluster/Custom js File ends

ArrFuncOrigin["OLDININS"]="KERNEL";
ArrPrntFunc["OLDININS"]="";
ArrPrntOrigin["OLDININS"]="";
ArrRoutingType["OLDININS"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLDININS"]="N";
ArrCustomModified["OLDININS"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_NOTES":"CONTRACTREFNO~INSURANCETYPE~SERVICEPROVIDER~SEQNO~PROPERTYCODE~POLICYNUMBER","CVS_COVERAGE":"CONTRACTREFNO~INSURANCETYPE~SERVICEPROVIDER~SEQNO~POLICYNUMBER~PROPERTYCODE~PREMIUMCURRENCY","CVS_CHANGES":"CONTRACTREFNO~INSURANCETYPE~SERVICEPROVIDER~SEQNO~POLICYNUMBER~PREMIUMCURRENCY","CSCFNUDF":""};
var scrArgSource = {"CVS_NOTES":"BLK_INSURANCE_MASTER__CONTRACTREFNO~BLK_INSURANCE_MASTER__INSURANCETYPE~BLK_INSURANCE_MASTER__SERVICEPROVIDER~BLK_INSURANCE_MASTER__SEQNO~BLK_INSURANCE_MASTER__PROPERTYCODE~BLK_INSURANCE_MASTER__POLICYNUMBER","CVS_COVERAGE":"BLK_INSURANCE_MASTER__CONTRACTREFNO~BLK_INSURANCE_MASTER__INSURANCETYPE~BLK_INSURANCE_MASTER__SERVICEPROVIDER~BLK_INSURANCE_MASTER__SEQNO~BLK_INSURANCE_MASTER__POLICYNUMBER~BLK_INSURANCE_MASTER__PROPERTYCODE~BLK_INSURANCE_MASTER__PREMIUMCURRENCY","CVS_CHANGES":"BLK_INSURANCE_MASTER__CONTRACTREFNO~BLK_INSURANCE_MASTER__INSURANCETYPE~BLK_INSURANCE_MASTER__SERVICEPROVIDER~BLK_INSURANCE_MASTER__SEQNO~BLK_INSURANCE_MASTER__POLICYNUMBER~BLK_INSURANCE_MASTER__PREMIUMCURRENCY","CSCFNUDF":""};
var scrArgVals = {"CVS_NOTES":"~~~~~","CVS_COVERAGE":"~~~~~~","CVS_CHANGES":"~~~~~","CSCFNUDF":""};
var scrArgDest = {"CVS_NOTES":"BLK_INS_NOTES_MASTER__CREFNO~BLK_INS_NOTES_MASTER__INSTYP~BLK_INS_NOTES_MASTER__SERVPROV~BLK_INS_NOTES_MASTER__INSEQNO~BLK_INS_NOTES_MASTER__PROPCDE~BLK_INS_NOTES_MASTER__POLNO","CVS_COVERAGE":"BLK_INS_COVERAGE_MASTER__CREFNUMBER~BLK_INS_COVERAGE_MASTER__INRNCTYPE~BLK_INS_COVERAGE_MASTER__SRVCPRVDR~BLK_INS_COVERAGE_MASTER__INSQNO~BLK_INS_COVERAGE_MASTER__PLCYNUM~BLK_INS_COVERAGE_MASTER__PRPCDE~BLK_INS_COVERAGE_MASTER__CCY1","CVS_CHANGES":"BLK_INSURANCE_HISTORY__CONTRCTRFNO~BLK_INSURANCE_HISTORY__INSURNCTYP~BLK_INSURANCE_HISTORY__SERVICEPRVDR~BLK_INSURANCE_HISTORY__INSURNCSEQNO~BLK_INSURANCE_HISTORY__POLICYNUMB~BLK_INS_COVERAGE_HISTORY__CCY2"};
//***** CODE FOR SUB-SYSTEM DEPENDENT  FIELDS   *****
//----------------------------------------------------------------------------------------------------------------------
var dpndntOnFlds = {"CSCFNUDF":""};
var dpndntOnSrvs = {"CSCFNUDF":""};
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