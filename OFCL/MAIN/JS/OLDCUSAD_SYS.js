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
**  File Name          : OLDCUSAD_SYS.js
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
var fieldNameArray = {"BLK_CUST_ADDR_MASTER":"ENTITY~MEDIA~LOCATION~CUSTOMERNO~LATESTVERSIONNO~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH","BLK_CUST_ADDR":"SENDBYFAX~VERSIONNO~ENTITY2~DELIVERYBY~ZIPCODE~TESTREQUIRED~ANSWERBACK~NAME~COUNTRY~TESTKEYWORD~LANGUAGE~ADDRESS4~ADDRESS3~ADDRESS2~ADDRESS1~MEDIA2~LOCATION2~CUSTOMERNO2~TOBEEMAILED~NAME2~FAXNO","BLK_MSG_ADDR":"VERSIONNO2~ENTITY3~CUSTOMERNO3~MEDIA3~LOCATION3~BRANCH~MODULE~MSGTYPE~NOOFCOPIES~FORMAT~CUSTACNO~PRIMARYADDRESS~CONFMATCHING"};

var multipleEntryPageSize = {"BLK_MSG_ADDR" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_CUST_ADDR__TAB_MAIN":"BLK_MSG_ADDR"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_CUST_ADDR_MASTER">ENTITY~MEDIA~LOCATION~CUSTOMERNO~LATESTVERSIONNO~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
msgxml += '      <FN PARENT="BLK_CUST_ADDR_MASTER" RELATION_TYPE="1" TYPE="BLK_CUST_ADDR">SENDBYFAX~VERSIONNO~ENTITY2~DELIVERYBY~ZIPCODE~TESTREQUIRED~ANSWERBACK~NAME~COUNTRY~TESTKEYWORD~LANGUAGE~ADDRESS4~ADDRESS3~ADDRESS2~ADDRESS1~MEDIA2~LOCATION2~CUSTOMERNO2~TOBEEMAILED~NAME2~FAXNO</FN>'; 
msgxml += '      <FN PARENT="BLK_CUST_ADDR" RELATION_TYPE="N" TYPE="BLK_MSG_ADDR">VERSIONNO2~ENTITY3~CUSTOMERNO3~MEDIA3~LOCATION3~BRANCH~MODULE~MSGTYPE~NOOFCOPIES~FORMAT~CUSTACNO~PRIMARYADDRESS~CONFMATCHING</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_CUST_ADDR";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** FCJ XML FOR SUMMARY SCREEN *****
//----------------------------------------------------------------------------------------------------------------------
var msgxml_sum=""; 
msgxml_sum += '    <FLD>'; 
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_CUST_ADDR_MASTER">AUTHSTAT~TXNSTAT~LOCATION~CUSTOMERNO~ENTITY~MEDIA</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "OLDCUSAD";
var defaultWhereClause = "CUSTOMER_NO IN (select a.customer_no from sttm_core_customer a where (a.access_group is not null and exists (select 1 from stvw_user_access b where b.user_id = GLOBAL.user_id and b.access_group = a.access_group)) OR a.access_group is null) AND (SMPKS_MASK_USER.pr_setusrctx(global.user_id,'OLSCUSAD') IN ('N','Y')) AND NVL(IS_FORGOTTEN,'N') = 'N'";
var defaultOrderByClause ="";
var multiBrnWhereClause ="CUSTOMER_NO IN (select a.customer_no from sttm_core_customer a where (a.access_group is not null and exists (select 1 from stvw_user_access b where b.user_id = GLOBAL.user_id and b.access_group = a.access_group)) OR a.access_group is null) AND (SMPKS_MASK_USER.pr_setusrctx(global.user_id,'OLSCUSAD') IN ('N','Y')) AND NVL(IS_FORGOTTEN,'N') = 'N'";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_CUST_ADDR_MASTER";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_CUST_ADDR_MASTER" : "","BLK_CUST_ADDR" : "BLK_CUST_ADDR_MASTER~1","BLK_MSG_ADDR" : "BLK_CUST_ADDR~N"}; 

 var dataSrcLocationArray = new Array("BLK_CUST_ADDR_MASTER","BLK_CUST_ADDR","BLK_MSG_ADDR"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLDCUSAD.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLDCUSAD.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_CUST_ADDR_MASTER__CUSTOMERNO";
pkFields[0] = "BLK_CUST_ADDR_MASTER__CUSTOMERNO";
queryFields[1] = "BLK_CUST_ADDR_MASTER__MEDIA";
pkFields[1] = "BLK_CUST_ADDR_MASTER__MEDIA";
queryFields[2] = "BLK_CUST_ADDR_MASTER__LOCATION";
pkFields[2] = "BLK_CUST_ADDR_MASTER__LOCATION";
queryFields[3] = "BLK_CUST_ADDR_MASTER__ENTITY";
pkFields[3] = "BLK_CUST_ADDR_MASTER__ENTITY";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_CUST_ADDR":["ADDRESS1","ADDRESS2","ADDRESS3","ADDRESS4","ANSWERBACK","COUNTRY","DELIVERYBY","FAXNO","NAME","NAME2","TESTKEYWORD","TESTREQUIRED","TOBEEMAILED","ZIPCODE"],"BLK_MSG_ADDR":["BRANCH","CONFMATCHING","CUSTACNO","FORMAT","MODULE","MSGTYPE","NOOFCOPIES","PRIMARYADDRESS"]};
var closeAmendArr = new Array(); 
var reopenAmendArr = new Array(); 
var reverseAmendArr = new Array(); 
var deleteAmendArr = new Array(); 
var rolloverAmendArr = new Array(); 
var confirmAmendArr = new Array(); 
var liquidateAmendArr = new Array(); 
//***** Fields Amendable while Query *****
var queryAmendArr = {"BLK_CUST_ADDR_MASTER":["CUSTOMERNO","ENTITY","LOCATION","MEDIA"]};
var authorizeAmendArr = new Array(); 
//----------------------------------------------------------------------------------------------------------------------

var subsysArr    = new Array(); 

//----------------------------------------------------------------------------------------------------------------------

//***** CODE FOR LOVs *****
//----------------------------------------------------------------------------------------------------------------------
var lovInfoFlds = {"BLK_CUST_ADDR_MASTER__ENTITY__LOV_ENTITY":["BLK_CUST_ADDR_MASTER__ENTITY~~~","BLK_CUST_ADDR_MASTER__CUSTOMERNO!VARCHAR2","N~N~N",""],"BLK_CUST_ADDR_MASTER__MEDIA__LOV_MEDIA":["BLK_CUST_ADDR_MASTER__MEDIA~~","","N~N",""],"BLK_CUST_ADDR_MASTER__CUSTOMERNO__LOV_CUST":["BLK_CUST_ADDR_MASTER__CUSTOMERNO~~~~","","N~N~N~N",""],"BLK_CUST_ADDR__DELIVERYBY__LOV_DELIVERY":["BLK_CUST_ADDR__DELIVERYBY~~","","N~N",""],"BLK_CUST_ADDR__COUNTRY__LOV_COUNTRY":["BLK_CUST_ADDR__COUNTRY~~","","N~N",""],"BLK_CUST_ADDR__LANGUAGE__LOV_LANG":["BLK_CUST_ADDR__LANGUAGE~~","","N~N",""],"BLK_MSG_ADDR__BRANCH__LOV_BRANCH":["BLK_MSG_ADDR__BRANCH~~","","N~N",""],"BLK_MSG_ADDR__MODULE__LOV_MODULE":["BLK_MSG_ADDR__MODULE~~","BLK_CUST_ADDR_MASTER__MEDIA!~BLK_CUST_ADDR_MASTER__CUSTOMERNO!~BLK_CUST_ADDR_MASTER__CUSTOMERNO!~BLK_CUST_ADDR_MASTER__CUSTOMERNO!","N~N",""],"BLK_MSG_ADDR__MSGTYPE__LOV_MSG_TYPE":["BLK_MSG_ADDR__MSGTYPE~","BLK_CUST_ADDR_MASTER__CUSTOMERNO!~BLK_CUST_ADDR_MASTER__CUSTOMERNO!~BLK_CUST_ADDR_MASTER__MEDIA!~BLK_MSG_ADDR__MODULE!~BLK_MSG_ADDR__MODULE!~BLK_CUST_ADDR_MASTER__CUSTOMERNO!","N",""],"BLK_MSG_ADDR__FORMAT__LOV_FORMAT":["BLK_MSG_ADDR__FORMAT~","BLK_CUST_ADDR_MASTER__CUSTOMERNO!~BLK_CUST_ADDR_MASTER__CUSTOMERNO!","N",""],"BLK_MSG_ADDR__CUSTACNO__LOV_ACC_NO":["BLK_MSG_ADDR__CUSTACNO~","BLK_CUST_ADDR_MASTER__CUSTOMERNO!~BLK_CUST_ADDR_MASTER__CUSTOMERNO!~BLK_CUST_ADDR_MASTER__MEDIA!~BLK_CUST_ADDR_MASTER__LOCATION!~BLK_MSG_ADDR__MSGTYPE!~BLK_MSG_ADDR__BRANCH!~BLK_MSG_ADDR__MODULE!~BLK_CUST_ADDR_MASTER__CUSTOMERNO!~BLK_CUST_ADDR_MASTER__MEDIA!~BLK_CUST_ADDR_MASTER__LOCATION!~BLK_MSG_ADDR__MSGTYPE!~BLK_MSG_ADDR__BRANCH!~BLK_MSG_ADDR__MODULE!","N",""]};
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
var multipleEntryIDs = new Array("BLK_MSG_ADDR");
var multipleEntryArray = new Array();
var multipleEntryCells = new Array();
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY VIEW SINGLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR ATTACHED CALLFORMS *****
 //----------------------------------------------------------------------------------------------------------------------

 var CallFormArray= new Array("CSCFNUDF~BLK_CUST_ADDR_MASTER"); 

 var CallFormRelat=new Array(""); 

 var CallRelatType= new Array("N"); 


 var ArrFuncOrigin=new Array();
 var ArrPrntFunc=new Array();
 var ArrPrntOrigin=new Array();
 var ArrRoutingType=new Array();


 // Code for Loading Cluster/Custom js File Starts
 var ArrClusterModified=new Array();
 var ArrCustomModified=new Array();
 // Code for Loading Cluster/Custom js File ends

ArrFuncOrigin["OLDCUSAD"]="KERNEL";
ArrPrntFunc["OLDCUSAD"]="";
ArrPrntOrigin["OLDCUSAD"]="";
ArrRoutingType["OLDCUSAD"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLDCUSAD"]="N";
ArrCustomModified["OLDCUSAD"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CSCFNUDF":""};
var scrArgSource = {"CSCFNUDF":""};
var scrArgVals = {"CSCFNUDF":""};
var scrArgDest = {};
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
var actStageArry = {"QUERY":"2","NEW":"2","MODIFY":"2","AUTHORIZE":"2","DELETE":"2","CLOSE":"2","REOPEN":"2","REVERSE":"1","ROLLOVER":"1","CONFIRM":"1","LIQUIDATE":"1","SUMMARYQUERY":"2"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------