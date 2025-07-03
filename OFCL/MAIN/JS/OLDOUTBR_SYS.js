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
**  File Name          : OLDOUTBR_SYS.js
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
var fieldNameArray = {"BLK_MSVWSMSSOUBRS":"NAME~LOCATION~ADDRESS1~ADDRESS2~ADDRESS3~ADDRESS4~NODE~BRANCH~MEDIA~SWIFTMSGTYPE~PRIORITY~HOLDMAIL~DCN~REFERENCENO~MODULE~MSGTYPE~RECEIVER~CCY~AMOUNT~MSGSTATUS~REPAIRREASON~RUNNINGNO~HOLDSTATUS~ACKNACKSTATUS~EXTERNALREFNO~DELIVERYBY~RTGSNETWORK~TESTWORD~TESTAMOUNT~TESTDATE~TESTCURRENCY~TESTNARRATIVE~DCNLIST~BULK~SELECTED~TESTING_STATUS~ANYORORG~ORGDCN~DVDNVDSTATUS~AUTHSTAT~MAKERID~MAKERDTSTAMP~CHECKERID~CHECKERDTSTAMP~ONCEAUTH~MODNO~MESSAGE~TO_DATE~FROM_DATE~ENTITY~SWIFT_MX_TYPE"};

var multipleEntryPageSize = {};

var multipleEntrySVBlocks = "";

var tabMEBlks = {};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_MSVWSMSSOUBRS">NAME~LOCATION~ADDRESS1~ADDRESS2~ADDRESS3~ADDRESS4~NODE~BRANCH~MEDIA~SWIFTMSGTYPE~PRIORITY~HOLDMAIL~DCN~REFERENCENO~MODULE~MSGTYPE~RECEIVER~CCY~AMOUNT~MSGSTATUS~REPAIRREASON~RUNNINGNO~HOLDSTATUS~ACKNACKSTATUS~EXTERNALREFNO~DELIVERYBY~RTGSNETWORK~TESTWORD~TESTAMOUNT~TESTDATE~TESTCURRENCY~TESTNARRATIVE~DCNLIST~BULK~SELECTED~TESTING_STATUS~ANYORORG~ORGDCN~DVDNVDSTATUS~AUTHSTAT~MAKERID~MAKERDTSTAMP~CHECKERID~CHECKERDTSTAMP~ONCEAUTH~MODNO~MESSAGE~TO_DATE~FROM_DATE~ENTITY~SWIFT_MX_TYPE</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_MSVWSMSSOUBRS">BRANCH~DCN~REFERENCENO~MODULE~MSGTYPE~RECEIVER~CCY~AMOUNT~MEDIA~SWIFTMSGTYPE~SWIFT_MX_TYPE~NODE~PRIORITY~NAME~ADDRESS1~ADDRESS2~ADDRESS3~ADDRESS4~LOCATION~MSGSTATUS~TESTWORD~REPAIRREASON~RUNNINGNO~HOLDSTATUS~TESTAMOUNT~TESTDATE~TESTCURRENCY~TESTNARRATIVE~ACKNACKSTATUS~HOLDMAIL~EXTERNALREFNO~DELIVERYBY~RTGSNETWORK~MAKERID~MAKERDTSTAMP~CHECKERID~CHECKERDTSTAMP~AUTHSTAT~ONCEAUTH~MODNO~DCNLIST~BULK~SELECTED~TESTING_STATUS~ANYORORG~ORGDCN~DVDNVDSTATUS~FROM_DATE~TO_DATE</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "OLDOUTBR";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="B";
var g_SummaryBtnCount =24;
var g_SummaryBlock ="BLK_MSVWSMSSOUBRS";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_MSVWSMSSOUBRS" : ""}; 

 var dataSrcLocationArray = new Array("BLK_MSVWSMSSOUBRS"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLDOUTBR.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLDOUTBR.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_MSVWSMSSOUBRS__DCN";
pkFields[0] = "BLK_MSVWSMSSOUBRS__DCN";
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
var lovInfoFlds = {"BLK_MSVWSMSSOUBRS__NODE__LOV_NODE":["BLK_MSVWSMSSOUBRS__NODE~","","N",""],"BLK_MSVWSMSSOUBRS__BRANCH__LOV_BRANCH":["BLK_MSVWSMSSOUBRS__BRANCH~~","","N~N",""],"BLK_MSVWSMSSOUBRS__MEDIA__LOV_MEDIA":["BLK_MSVWSMSSOUBRS__MEDIA~~","","N~N",""],"BLK_MSVWSMSSOUBRS__SWIFTMSGTYPE__LOV_SWIFTMESSAGE":["BLK_MSVWSMSSOUBRS__SWIFTMSGTYPE~~","","N~N",""],"BLK_MSVWSMSSOUBRS__MODULE__LOV_MODULE":["BLK_MSVWSMSSOUBRS__MODULE~~","","N~N",""],"BLK_MSVWSMSSOUBRS__MSGTYPE__LOV_MSGTYPE":["BLK_MSVWSMSSOUBRS__MSGTYPE~~","","N~N",""],"BLK_MSVWSMSSOUBRS__ENTITY__LOV_ENTITY":["~~","BLK_MSVWSMSSOUBRS__REFERENCENO!~BLK_MSVWSMSSOUBRS__RECEIVER!~BLK_MSVWSMSSOUBRS__REFERENCENO!~BLK_MSVWSMSSOUBRS__RECEIVER!~BLK_MSVWSMSSOUBRS__MODULE!~BLK_MSVWSMSSOUBRS__REFERENCENO!~BLK_MSVWSMSSOUBRS__RECEIVER!~BLK_MSVWSMSSOUBRS__REFERENCENO!~BLK_MSVWSMSSOUBRS__RECEIVER!~BLK_MSVWSMSSOUBRS__MODULE!","N~N",""]};
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

ArrFuncOrigin["OLDOUTBR"]="KERNEL";
ArrPrntFunc["OLDOUTBR"]="";
ArrPrntOrigin["OLDOUTBR"]="";
ArrRoutingType["OLDOUTBR"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLDOUTBR"]="N";
ArrCustomModified["OLDOUTBR"]="N";

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
var actStageArry = {"QUERY":"2","NEW":"2","MODIFY":"2","AUTHORIZE":"1","DELETE":"1","CLOSE":"1","REOPEN":"1","REVERSE":"1","ROLLOVER":"1","CONFIRM":"1","LIQUIDATE":"1","SUMMARYQUERY":"1"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------