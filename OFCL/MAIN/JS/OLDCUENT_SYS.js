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
**  File Name          : OLDCUENT_SYS.js
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
var fieldNameArray = {"BLK_OLTMS_CUSTOMER_ENTITY":"CUSTOMERNO~TXTCUSTOMERNAME~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH","BLK_OLTMS_CUSTOMER_ENTITY_DETAILS":"CUSTLEVELMSGGEN~AFFILIATION~PHONENOCOUNTRY~TITLE~SENDFPML~SENDBYEMAIL~EMAIL~SENDBYFAX~FAXNO~PHONENO~ENTITYTYPE~ENTITYNAME~ENTITY~CUSTNO","BLK_DISPLAY":"ETY~CUSTOMNO","BLK_CUST_ENTITY_MEDIA_ORDER":"MEDIA~MEDIAORDER~ENTY~CUSNO"};

var multipleEntryPageSize = {"BLK_OLTMS_CUSTOMER_ENTITY_DETAILS" :"15" ,"BLK_CUST_ENTITY_MEDIA_ORDER" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_OLTMS_CUSTOMER_ENTITY_DETAILS","CVS_MEDIA_ORDER__TAB_MAIN":"BLK_CUST_ENTITY_MEDIA_ORDER"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTMS_CUSTOMER_ENTITY">CUSTOMERNO~TXTCUSTOMERNAME~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTMS_CUSTOMER_ENTITY" RELATION_TYPE="N" TYPE="BLK_OLTMS_CUSTOMER_ENTITY_DETAILS">CUSTLEVELMSGGEN~AFFILIATION~PHONENOCOUNTRY~TITLE~SENDFPML~SENDBYEMAIL~EMAIL~SENDBYFAX~FAXNO~PHONENO~ENTITYTYPE~ENTITYNAME~ENTITY~CUSTNO</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTMS_CUSTOMER_ENTITY_DETAILS" RELATION_TYPE="1" TYPE="BLK_DISPLAY">ETY~CUSTOMNO</FN>'; 
msgxml += '      <FN PARENT="BLK_DISPLAY" RELATION_TYPE="N" TYPE="BLK_CUST_ENTITY_MEDIA_ORDER">MEDIA~MEDIAORDER~ENTY~CUSNO</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTMS_CUSTOMER_ENTITY">AUTHSTAT~TXNSTAT~CUSTOMERNO</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "OLDCUENT";
var defaultWhereClause = "CUSTOMER_NO IN (select a.customer_no from sttm_core_customer a where (a.access_group is not null and exists (select 1 from stvw_user_access b where b.user_id = GLOBAL.user_id and b.access_group = a.access_group)) OR a.access_group is null) AND (SMPKS_MASK_USER.pr_setusrctx(global.user_id,'OLSCUENT') IN ('N','Y')) AND NVL(IS_FORGOTTEN,'N') = 'N'";
var defaultOrderByClause ="";
var multiBrnWhereClause ="CUSTOMER_NO IN (select a.customer_no from sttm_core_customer a where (a.access_group is not null and exists (select 1 from stvw_user_access b where b.user_id = GLOBAL.user_id and b.access_group = a.access_group)) OR a.access_group is null) AND (SMPKS_MASK_USER.pr_setusrctx(global.user_id,'OLSCUENT') IN ('N','Y')) AND NVL(IS_FORGOTTEN,'N') = 'N'";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_OLTMS_CUSTOMER_ENTITY";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_OLTMS_CUSTOMER_ENTITY" : "","BLK_OLTMS_CUSTOMER_ENTITY_DETAILS" : "BLK_OLTMS_CUSTOMER_ENTITY~N","BLK_DISPLAY" : "BLK_OLTMS_CUSTOMER_ENTITY_DETAILS~1","BLK_CUST_ENTITY_MEDIA_ORDER" : "BLK_DISPLAY~N"}; 

 var dataSrcLocationArray = new Array("BLK_OLTMS_CUSTOMER_ENTITY","BLK_OLTMS_CUSTOMER_ENTITY_DETAILS","BLK_DISPLAY","BLK_CUST_ENTITY_MEDIA_ORDER"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLDCUENT.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLDCUENT.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_OLTMS_CUSTOMER_ENTITY__CUSTOMERNO";
pkFields[0] = "BLK_OLTMS_CUSTOMER_ENTITY__CUSTOMERNO";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_CUST_ENTITY_MEDIA_ORDER":["MEDIA"],"BLK_OLTMS_CUSTOMER_ENTITY_DETAILS":["AFFILIATION","BTNMEDIAORDER","CUSTLEVELMSGGEN","EMAIL","ENTITYNAME","ENTITYTYPE","FAXNO","PHONENO","PHONENOCOUNTRY","SENDBYEMAIL","SENDBYFAX","SENDFPML","TITLE","TXTCTRYNAME","TXTTYPEDESC"]};
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
var lovInfoFlds = {"BLK_OLTMS_CUSTOMER_ENTITY__CUSTOMERNO__LOV_CUSTOMERS":["BLK_OLTMS_CUSTOMER_ENTITY__CUSTOMERNO~BLK_OLTMS_CUSTOMER_ENTITY__TXTCUSTOMERNAME~","","N~N",""],"BLK_OLTMS_CUSTOMER_ENTITY_DETAILS__PHONENOCOUNTRY__LOV_COUNTRY":["BLK_OLTMS_CUSTOMER_ENTITY_DETAILS__PHONENOCOUNTRY~BLK_OLTMS_CUSTOMER_ENTITY_DETAILS__TXTCTRYNAME~","","N~N","N"],"BLK_OLTMS_CUSTOMER_ENTITY_DETAILS__ENTITYTYPE__LOV_ENTITY_TYPE":["BLK_OLTMS_CUSTOMER_ENTITY_DETAILS__ENTITYTYPE~BLK_OLTMS_CUSTOMER_ENTITY_DETAILS__TXTTYPEDESC~","","N~N",""],"BLK_CUST_ENTITY_MEDIA_ORDER__MEDIA__LOV_MEDIA":["BLK_CUST_ENTITY_MEDIA_ORDER__MEDIA~","BLK_STTMS_CUSTOMER_ENTITY_DETAILS__SENDBYFAX!~BLK_STTMS_CUSTOMER_ENTITY_DETAILS__SENDBYEMAIL!~BLK_STTMS_CUSTOMER_ENTITY_DETAILS__SENDFPML!","N",""]};
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
var multipleEntryIDs = new Array("BLK_OLTMS_CUSTOMER_ENTITY_DETAILS","BLK_CUST_ENTITY_MEDIA_ORDER");
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

ArrFuncOrigin["OLDCUENT"]="KERNEL";
ArrPrntFunc["OLDCUENT"]="";
ArrPrntOrigin["OLDCUENT"]="";
ArrRoutingType["OLDCUENT"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLDCUENT"]="N";
ArrCustomModified["OLDCUENT"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_MAIN":"entity~custno~entity1~customerno","CVS_MEDIA_ORDER":"entity~entity1~customerno~custno"};
var scrArgSource = {"CVS_MAIN":"BLK_OLTMS_CUSTOMER_ENTITY_DETAILS__ENTITY~BLK_OLTMS_CUSTOMER_ENTITY__CUSTOMERNO~BLK_OLTMS_CUSTOMER_ENTITY_DETAILS__ENTITY~BLK_OLTMS_CUSTOMER_ENTITY__CUSTOMERNO","CVS_MEDIA_ORDER":"BLK_OLTMS_CUSTOMER_ENTITY_DETAILS__ENTITY~BLK_OLTMS_CUSTOMER_ENTITY_DETAILS__ENTITY~BLK_OLTMS_CUSTOMER_ENTITY_DETAILS__CUSTNO~BLK_OLTMS_CUSTOMER_ENTITY_DETAILS__CUSTNO"};
var scrArgVals = {"CVS_MAIN":"~~~","CVS_MEDIA_ORDER":"~~~"};
var scrArgDest = {"CVS_MAIN":"BLK_DISPLAY__ETY~BLK_DISPLAY__CUSTOMNO~BLK_CUST_ENTITY_MEDIA_ORDER__ENTY~BLK_CUST_ENTITY_MEDIA_ORDER__CUSNO","CVS_MEDIA_ORDER":"BLK_DISPLAY__ETY~BLK_CUST_ENTITY_MEDIA_ORDER__ENTY~BLK_DISPLAY__CUSTOMNO~BLK_CUST_ENTITY_MEDIA_ORDER__CUSNO"};
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