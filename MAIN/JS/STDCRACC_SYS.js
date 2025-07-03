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
**  File Name          : STDCRACC_SYS.js
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
var fieldNameArray = {"BLK_ECA_CIF_ACC":"CUSTOMER_NO~CUST_AC_CCY~CUST_AC_IBAN~DESCRIPTION~CUST_NAME~BRN_DESC~CUST_AC_NAME~AC_OPEN_DATE~AC_STAT_NO_CR~AC_STAT_NO_DR~GL_STAT_BLOCKED~AC_STAT_FROZEN~AC_STAT_DORMANT~ACCOUNT_CLASS~CUST_ACCOUNT_NO~HOST_CODE~SOURCE_SYSTEM~SOURCE_SYSTEM_ACC_NO~SOURCE_SYSTEM_ACC_BRN~ECA_CHECK_REQ~ADDRESS1~ADDRESS2~ADDRESS3~ADDRESS4~COUNTRY_CODE~ENTITLEMENT_GROUP_BRANCH~ENTITLEMENT_GROUP_PAYMENT~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH"};

var multipleEntryPageSize = {};

var multipleEntrySVBlocks = "";

var tabMEBlks = {};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_ECA_CIF_ACC">CUSTOMER_NO~CUST_AC_CCY~CUST_AC_IBAN~DESCRIPTION~CUST_NAME~BRN_DESC~CUST_AC_NAME~AC_OPEN_DATE~AC_STAT_NO_CR~AC_STAT_NO_DR~GL_STAT_BLOCKED~AC_STAT_FROZEN~AC_STAT_DORMANT~ACCOUNT_CLASS~CUST_ACCOUNT_NO~HOST_CODE~SOURCE_SYSTEM~SOURCE_SYSTEM_ACC_NO~SOURCE_SYSTEM_ACC_BRN~ECA_CHECK_REQ~ADDRESS1~ADDRESS2~ADDRESS3~ADDRESS4~COUNTRY_CODE~ENTITLEMENT_GROUP_BRANCH~ENTITLEMENT_GROUP_PAYMENT~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_STVWS_STTM_CORE_ACCOUNT">AUTHSTAT~TXNSTAT~CUST_ACCOUNT_NO~CUST_AC_NAME~CUSTOMER_NO~SOURCE_SYSTEM_ACC_BRN~SOURCE_SYSTEM~SOURCE_SYSTEM_ACC_NO~CUST_AC_CCY~CUST_AC_IBAN~ENTITLEMENT_GROUP_PAYMENT~ENTITLEMENT_GROUP_BRANCH</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "STDCRACC";
var defaultWhereClause = "HOST_CODE = Global.Host_Code AND CUSTOMER_NO IN (select a.customer_no from sttm_core_customer a where (a.access_group is not null and exists (select 1 from stvw_user_access b where b.user_id = GLOBAL.user_id and b.access_group= a.access_group)) OR a.access_group is null) AND customer_no NOT IN (SELECT z.customer_no FROM sttms_cust_forget_detail z WHERE z.process_status = 'P')";
var defaultOrderByClause ="";
var multiBrnWhereClause ="customer_no NOT IN (SELECT z.customer_no FROM sttms_cust_forget_detail z WHERE z.process_status = 'P')";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_STVWS_STTM_CORE_ACCOUNT";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_ECA_CIF_ACC" : ""}; 

 var dataSrcLocationArray = new Array("BLK_ECA_CIF_ACC"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside STDCRACC.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside STDCRACC.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_ECA_CIF_ACC__CUST_ACCOUNT_NO";
pkFields[0] = "BLK_ECA_CIF_ACC__CUST_ACCOUNT_NO";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_ECA_CIF_ACC":["AC_OPEN_DATEI","AC_STAT_DORMANT","AC_STAT_FROZEN","AC_STAT_NO_CR","AC_STAT_NO_DR","ADDRESS1","ADDRESS2","ADDRESS3","ADDRESS4","COUNTRY_CODE","CUSTOMER_NO","CUST_AC_IBAN","CUST_AC_NAME","ECA_CHECK_REQ","ENTITLEMENT_GROUP_BRANCH","ENTITLEMENT_GROUP_PAYMENT","GL_STAT_BLOCKED"],"BLK_STVWS_STTM_CORE_ACCOUNT":["CUST_AC_IBAN"]};
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
var lovInfoFlds = {"BLK_ECA_CIF_ACC__CUSTOMER_NO__LOV_CUST_NO":["BLK_ECA_CIF_ACC__CUSTOMER_NO~BLK_ECA_CIF_ACC__CUST_NAME~","","N~N",""],"BLK_ECA_CIF_ACC__CUST_AC_CCY__LOV_AC_CCY":["BLK_ECA_CIF_ACC__CUST_AC_CCY~~","","N~N",""],"BLK_ECA_CIF_ACC__SOURCE_SYSTEM__LOV_ECA_SYSTEM":["BLK_ECA_CIF_ACC__SOURCE_SYSTEM~BLK_ECA_CIF_ACC__DESCRIPTION~","","N~N",""],"BLK_ECA_CIF_ACC__SOURCE_SYSTEM_ACC_BRN__LOV_AC_BRN":["BLK_ECA_CIF_ACC__SOURCE_SYSTEM_ACC_BRN~BLK_ECA_CIF_ACC__BRN_DESC~","","N~N",""],"BLK_ECA_CIF_ACC__COUNTRY_CODE__LOV_COUNTRY_CODE":["BLK_ECA_CIF_ACC__COUNTRY_CODE~","","N",""]};
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

ArrFuncOrigin["STDCRACC"]="KERNEL";
ArrPrntFunc["STDCRACC"]="";
ArrPrntOrigin["STDCRACC"]="";
ArrRoutingType["STDCRACC"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["STDCRACC"]="N";
ArrCustomModified["STDCRACC"]="N";

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