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
**  File Name          : OLDCUSMT_SYS.js
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
var fieldNameArray = {"BLK_SYTMS_STTM_CUSTOMER":"CUSTOMERNO~CUSTOMERNAME2~DEFAULTMEDIA~EGNUMBER~WATCHLISTREMARKS~WATCHLISTCUSTOMER~OBLIGORRISKRATING~GFCID~CUSTINTGROUP~DEPARTMENTCODE~CUSTTAXGROUP~CLASSIFICATION~SICCODE~PRIMARYBIC~SSN~CUSTGROUP~ATTENTION~ZIPCODE~TXTCUSTNAME~CLUSTERID~MEI_CODE~LOCAL_BRANCH~CUSTCATEG~HASACTIVECONTRACT~LASTACTIVITYDATE~CIFSTATUS~CIFSTATUSSINCE~LOCALGRPSTATPROC~EXTGRPSTATPROC~RP_CUSTOMER~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH"};

var multipleEntryPageSize = {};

var multipleEntrySVBlocks = "";

var tabMEBlks = {};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_SYTMS_STTM_CUSTOMER">CUSTOMERNO~CUSTOMERNAME2~DEFAULTMEDIA~EGNUMBER~WATCHLISTREMARKS~WATCHLISTCUSTOMER~OBLIGORRISKRATING~GFCID~CUSTINTGROUP~DEPARTMENTCODE~CUSTTAXGROUP~CLASSIFICATION~SICCODE~PRIMARYBIC~SSN~CUSTGROUP~ATTENTION~ZIPCODE~TXTCUSTNAME~CLUSTERID~MEI_CODE~LOCAL_BRANCH~CUSTCATEG~HASACTIVECONTRACT~LASTACTIVITYDATE~CIFSTATUS~CIFSTATUSSINCE~LOCALGRPSTATPROC~EXTGRPSTATPROC~RP_CUSTOMER~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
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
msgxml_sum += '      <FN PARENT="BLK_SYTMS_STTM_CUSTOMER" RELATION_TYPE="1" TYPE="BLK_SUMMARY">AUTHSTAT~TXNSTAT~CUSTOMERNO</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "OLDCUSMT";
var defaultWhereClause = "CUSTOMER_NO IN (select a.customer_no from sttm_core_customer a where (a.access_group is not null and exists (select 1 from stvw_user_access b where b.user_id = GLOBAL.user_id and b.access_group= a.access_group)) OR a.access_group is null) AND (SMPKS_MASK_USER.pr_setusrctx(global.user_id,'OLSCUSMT') IN ('N','Y')) AND NVL(IS_FORGOTTEN,'N') = 'N'";
var defaultOrderByClause ="";
var multiBrnWhereClause ="CUSTOMER_NO IN (select a.customer_no from sttm_core_customer a where (a.access_group is not null and exists (select 1 from stvw_user_access b where b.user_id = GLOBAL.user_id and b.access_group= a.access_group)) OR a.access_group is null) AND (SMPKS_MASK_USER.pr_setusrctx(global.user_id,'OLSCUSMT') IN ('N','Y')) AND NVL(IS_FORGOTTEN,'N') = 'N'";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_SUMMARY";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_SYTMS_STTM_CUSTOMER" : ""}; 

 var dataSrcLocationArray = new Array("BLK_SYTMS_STTM_CUSTOMER"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLDCUSMT.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLDCUSMT.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_SYTMS_STTM_CUSTOMER__CUSTOMERNO";
pkFields[0] = "BLK_SYTMS_STTM_CUSTOMER__CUSTOMERNO";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_SYTMS_STTM_CUSTOMER":["ATTENTION","BTN_UDF","CLASSIFICATION","CLUSTERID","CUSTCATEG","CUSTGROUP","CUSTINTGROUP","CUSTOMERNAME2","CUSTTAXGROUP","DEFAULTMEDIA","DEPARTMENTCODE","EGNUMBER","EXTGRPSTATPROC","GFCID","LOCALGRPSTATPROC","LOCAL_BRANCH","MEI_CODE","OBLIGORRISKRATING","PRIMARYBIC","RP_CUSTOMER","SICCODE","SSN","TXTCUSTNAME","WATCHLISTCUSTOMER","WATCHLISTREMARKS","ZIPCODE"]};
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
var lovInfoFlds = {"BLK_SYTMS_STTM_CUSTOMER__CUSTOMERNO__LOV_CUST_NUMBER":["BLK_SYTMS_STTM_CUSTOMER__CUSTOMERNO~BLK_SYTMS_STTM_CUSTOMER__TXTCUSTNAME~BLK_SYTMS_STTM_CUSTOMER__EGNUMBER~BLK_SYTMS_STTM_CUSTOMER__GFCID~","","N~N~N~N",""],"BLK_SYTMS_STTM_CUSTOMER__DEFAULTMEDIA__LOV_DEFAULT_MEDIA":["BLK_SYTMS_STTM_CUSTOMER__DEFAULTMEDIA~~","","N~N",""],"BLK_SYTMS_STTM_CUSTOMER__CUSTINTGROUP__LOV_INT_GROUP":["BLK_SYTMS_STTM_CUSTOMER__CUSTINTGROUP~","","N",""],"BLK_SYTMS_STTM_CUSTOMER__CUSTTAXGROUP__LOV_TAX_GROUP":["BLK_SYTMS_STTM_CUSTOMER__CUSTTAXGROUP~","","N",""],"BLK_SYTMS_STTM_CUSTOMER__CLASSIFICATION__LOV_CLASSIFICATION":["BLK_SYTMS_STTM_CUSTOMER__CLASSIFICATION~~","","N~N",""],"BLK_SYTMS_STTM_CUSTOMER__SICCODE__LOV_SIC_CODE":["BLK_SYTMS_STTM_CUSTOMER__SICCODE~~","BLK_SYTMS_STTM_CUSTOMER__CUSTOMERNO!varchar2","N~N",""],"BLK_SYTMS_STTM_CUSTOMER__PRIMARYBIC__LOV_PRIMARY_BIC":["BLK_SYTMS_STTM_CUSTOMER__PRIMARYBIC~~","","N~N",""],"BLK_SYTMS_STTM_CUSTOMER__CUSTGROUP__LOV_CUST_GROUP":["BLK_SYTMS_STTM_CUSTOMER__CUSTGROUP~","","N",""],"BLK_SYTMS_STTM_CUSTOMER__CUSTCATEG__LOV_CUST_CATEG":["BLK_SYTMS_STTM_CUSTOMER__CUSTCATEG~~","","N~N",""]};
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

 var CallFormArray= new Array("CSCFNUDF~BLK_SYTMS_STTM_CUSTOMER"); 

 var CallFormRelat=new Array(""); 

 var CallRelatType= new Array("1"); 


 var ArrFuncOrigin=new Array();
 var ArrPrntFunc=new Array();
 var ArrPrntOrigin=new Array();
 var ArrRoutingType=new Array();


 // Code for Loading Cluster/Custom js File Starts
 var ArrClusterModified=new Array();
 var ArrCustomModified=new Array();
 // Code for Loading Cluster/Custom js File ends

ArrFuncOrigin["OLDCUSMT"]="KERNEL";
ArrPrntFunc["OLDCUSMT"]="";
ArrPrntOrigin["OLDCUSMT"]="";
ArrRoutingType["OLDCUSMT"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLDCUSMT"]="N";
ArrCustomModified["OLDCUSMT"]="N";

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