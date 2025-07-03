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
**  File Name          : IFDCREXS_SYS.js
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
var fieldNameArray = {"BLK_MAIN":"EXTERNAL_SYSTEM~EXTSYS_USERID~EXTERNAL_DESC~MAX_RETRY_COUNT~READ_TIMEOUT~CONN_TIMEOUT~EXTERNAL_SYSTEM_APPID~EXTERNAL_SYSTEM_TYPE~REST_SSL_ENABLED~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH","BLK_DETAILS":"EXTERNAL_SYSTEM~REST_CONTEXT~REST_IP~REST_PATTERN~REST_PORT~SERVICE_NAME~TYPE~WS_ENDPOINT_URL"};

var multipleEntryPageSize = {"BLK_DETAILS" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_DETAILS"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_MAIN">EXTERNAL_SYSTEM~EXTSYS_USERID~EXTERNAL_DESC~MAX_RETRY_COUNT~READ_TIMEOUT~CONN_TIMEOUT~EXTERNAL_SYSTEM_APPID~EXTERNAL_SYSTEM_TYPE~REST_SSL_ENABLED~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
msgxml += '      <FN PARENT="BLK_MAIN" RELATION_TYPE="N" TYPE="BLK_DETAILS">EXTERNAL_SYSTEM~REST_CONTEXT~REST_IP~REST_PATTERN~REST_PORT~SERVICE_NAME~TYPE~WS_ENDPOINT_URL</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_MAIN">AUTHSTAT~TXNSTAT~EXTERNAL_SYSTEM~EXTSYS_USERID~MAX_RETRY_COUNT~READ_TIMEOUT~CONN_TIMEOUT</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "IFDCREXS";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_MAIN";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_MAIN" : "","BLK_DETAILS" : "BLK_MAIN~N"}; 

 var dataSrcLocationArray = new Array("BLK_MAIN","BLK_DETAILS"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside IFDCREXS.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside IFDCREXS.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_MAIN__EXTERNAL_SYSTEM";
pkFields[0] = "BLK_MAIN__EXTERNAL_SYSTEM";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_DETAILS":["EXTERNAL_SYSTEM","REST_CONTEXT","REST_IP","REST_PATTERN","REST_PORT","SERVICE_NAME","TYPE","WS_ENDPOINT_URL"],"BLK_MAIN":["CONN_TIMEOUT","EXTERNAL_SYSTEM_APPID","EXTERNAL_SYSTEM_TYPE","EXTSYS_USERID","MAX_RETRY_COUNT","READ_TIMEOUT","REST_SSL_ENABLED"]};
var closeAmendArr = new Array(); 
var reopenAmendArr = new Array(); 
var reverseAmendArr = new Array(); 
var deleteAmendArr = new Array(); 
var rolloverAmendArr = new Array(); 
var confirmAmendArr = new Array(); 
var liquidateAmendArr = new Array(); 
//***** Fields Amendable while Query *****
var queryAmendArr = {"BLK_DETAILS":["EXTERNAL_SYSTEM","REST_CONTEXT","REST_IP","REST_PATTERN","REST_PORT","SERVICE_NAME","TYPE","WS_ENDPOINT_URL"],"BLK_MAIN":["EXTERNAL_SYSTEM_APPID","EXTERNAL_SYSTEM_TYPE","EXTSYS_USERID"]};
var authorizeAmendArr = new Array(); 
//----------------------------------------------------------------------------------------------------------------------

var subsysArr    = new Array(); 

//----------------------------------------------------------------------------------------------------------------------

//***** CODE FOR LOVs *****
//----------------------------------------------------------------------------------------------------------------------
var lovInfoFlds = {"BLK_MAIN__EXTERNAL_SYSTEM__LOV_EXT":["BLK_MAIN__EXTERNAL_SYSTEM~BLK_MAIN__EXTERNAL_DESC~","","N~N",""],"BLK_DETAILS__SERVICE_NAME__LOV_SERV_CODE":["BLK_DETAILS__SERVICE_NAME~","","N",""]};
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
var multipleEntryIDs = new Array("BLK_DETAILS");
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

ArrFuncOrigin["IFDCREXS"]="KERNEL";
ArrPrntFunc["IFDCREXS"]="";
ArrPrntOrigin["IFDCREXS"]="";
ArrRoutingType["IFDCREXS"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["IFDCREXS"]="N";
ArrCustomModified["IFDCREXS"]="N";

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