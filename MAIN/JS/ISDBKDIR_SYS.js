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
**  File Name          : ISDBKDIR_SYS.js
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
var fieldNameArray = {"BLK_ISTB_LOCAL_BANK_DIR":"NW_DIR_KEY~BANK_CODE~BANK_NAME~CLEARING_SYSTEM_CODE~CLEARING_SYSTEM_PROP~NETWORK_PARTICIPATION~DIRECT_BANK_CODE~VALID_FROM~VALID_TO~BIC_CODE~BIC_NAME~ADDRESS_LINE_1~ADDRESS_LINE_2~ADDRESS_LINE_3~ADDRESS_LINE_4~ADDRESS_LINE_5~ADDRESS_LINE_6~ADDRESS_LINE_7~ADDRESS_DEPT~ADDRESS_SUB_DEPT~ADDRESS_STREET_NAME~ADDRESS_BLDG_NO~ADDRESS_BLDG_NAME~ADDRESS_FLOOR~ADDRESS_POST_BOX~ADDRESS_ROOM~ADDRESS_POST_CODE~ADDRESS_TOWN_NAME~ADDRESS_TOWN_LCTN_NAME~ADDRESS_DISTRICT_NAME~ADDRESS_COUNTRY_SUB_DIVISION~ADDRESS_COUNTRY~ADDRESS_TP_CODE~ADDRESS_TP_PRTRY_ID~ADDRESS_TP_PRTRY_ISSR~ADDRESS_TP_PRTRY_SCHME_NM~AUTH_STATUS~CHECKER_DT_STAMP~MAKER_DT_STAMP~RECORD_STAT~TXN_ARCH_DT~CHECKER_ID~MAKER_ID~MOD_NO"};

var multipleEntryPageSize = {};

var multipleEntrySVBlocks = "";

var tabMEBlks = {};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_ISTB_LOCAL_BANK_DIR">NW_DIR_KEY~BANK_CODE~BANK_NAME~CLEARING_SYSTEM_CODE~CLEARING_SYSTEM_PROP~NETWORK_PARTICIPATION~DIRECT_BANK_CODE~VALID_FROM~VALID_TO~BIC_CODE~BIC_NAME~ADDRESS_LINE_1~ADDRESS_LINE_2~ADDRESS_LINE_3~ADDRESS_LINE_4~ADDRESS_LINE_5~ADDRESS_LINE_6~ADDRESS_LINE_7~ADDRESS_DEPT~ADDRESS_SUB_DEPT~ADDRESS_STREET_NAME~ADDRESS_BLDG_NO~ADDRESS_BLDG_NAME~ADDRESS_FLOOR~ADDRESS_POST_BOX~ADDRESS_ROOM~ADDRESS_POST_CODE~ADDRESS_TOWN_NAME~ADDRESS_TOWN_LCTN_NAME~ADDRESS_DISTRICT_NAME~ADDRESS_COUNTRY_SUB_DIVISION~ADDRESS_COUNTRY~ADDRESS_TP_CODE~ADDRESS_TP_PRTRY_ID~ADDRESS_TP_PRTRY_ISSR~ADDRESS_TP_PRTRY_SCHME_NM~AUTH_STATUS~CHECKER_DT_STAMP~MAKER_DT_STAMP~RECORD_STAT~TXN_ARCH_DT~CHECKER_ID~MAKER_ID~MOD_NO</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_ISTB_LOCAL_BANK_DIR">AUTH_STATUS~RECORD_STAT~BANK_CODE~NW_DIR_KEY~CLEARING_SYSTEM_CODE~CLEARING_SYSTEM_PROP~BANK_NAME~NETWORK_PARTICIPATION~DIRECT_BANK_CODE~VALID_FROM~VALID_TO~BIC_CODE~BIC_NAME~ADDRESS_LINE_1~ADDRESS_LINE_2~ADDRESS_LINE_3~ADDRESS_LINE_4~ADDRESS_LINE_5~ADDRESS_LINE_6~ADDRESS_LINE_7~ADDRESS_DEPT~ADDRESS_SUB_DEPT~ADDRESS_STREET_NAME~ADDRESS_BLDG_NO~ADDRESS_BLDG_NAME~ADDRESS_FLOOR~ADDRESS_POST_BOX~ADDRESS_ROOM~ADDRESS_POST_CODE~ADDRESS_TOWN_NAME~ADDRESS_TOWN_LCTN_NAME~ADDRESS_DISTRICT_NAME~ADDRESS_COUNTRY_SUB_DIVISION~ADDRESS_COUNTRY~ADDRESS_TP_CODE~ADDRESS_TP_PRTRY_ID~ADDRESS_TP_PRTRY_ISSR~ADDRESS_TP_PRTRY_SCHME_NM~MOD_NO~TXN_ARCH_DT</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "ISDBKDIR";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_ISTB_LOCAL_BANK_DIR";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_ISTB_LOCAL_BANK_DIR" : ""}; 

 var dataSrcLocationArray = new Array("BLK_ISTB_LOCAL_BANK_DIR"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside ISDBKDIR.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside ISDBKDIR.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_ISTB_LOCAL_BANK_DIR__NW_DIR_KEY";
pkFields[0] = "BLK_ISTB_LOCAL_BANK_DIR__NW_DIR_KEY";
queryFields[1] = "BLK_ISTB_LOCAL_BANK_DIR__BANK_CODE";
pkFields[1] = "BLK_ISTB_LOCAL_BANK_DIR__BANK_CODE";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_ISTB_LOCAL_BANK_DIR":["ADDRESS_BLDG_NAME","ADDRESS_BLDG_NO","ADDRESS_COUNTRY","ADDRESS_COUNTRY_SUB_DIVISION","ADDRESS_DEPT","ADDRESS_DISTRICT_NAME","ADDRESS_FLOOR","ADDRESS_LINE_1","ADDRESS_LINE_2","ADDRESS_LINE_3","ADDRESS_LINE_4","ADDRESS_LINE_5","ADDRESS_LINE_6","ADDRESS_LINE_7","ADDRESS_POST_BOX","ADDRESS_POST_CODE","ADDRESS_ROOM","ADDRESS_STREET_NAME","ADDRESS_SUB_DEPT","ADDRESS_TOWN_LCTN_NAME","ADDRESS_TOWN_NAME","ADDRESS_TP_CODE","ADDRESS_TP_PRTRY_ID","ADDRESS_TP_PRTRY_ISSR","ADDRESS_TP_PRTRY_SCHME_NM","BANK_NAME","BIC_CODE","BIC_NAME","CLEARING_SYSTEM_CODE","CLEARING_SYSTEM_PROP","DIRECT_BANK_CODE","NETWORK_PARTICIPATION","VALID_FROM","VALID_TO"]};
//***** Fields Amendable while Close *****
var closeAmendArr = {"BLK_ISTB_LOCAL_BANK_DIR":["RECORD_STAT"]};
//***** Fields Amendable while Reopen *****
var reopenAmendArr = {"BLK_ISTB_LOCAL_BANK_DIR":["RECORD_STAT"]};
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

ArrFuncOrigin["ISDBKDIR"]="KERNEL";
ArrPrntFunc["ISDBKDIR"]="";
ArrPrntOrigin["ISDBKDIR"]="";
ArrRoutingType["ISDBKDIR"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["ISDBKDIR"]="N";
ArrCustomModified["ISDBKDIR"]="N";

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