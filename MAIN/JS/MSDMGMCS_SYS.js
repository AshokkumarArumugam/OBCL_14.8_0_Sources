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
**  File Name          : MSDMGMCS_SYS.js
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
var fieldNameArray = {"BLK_MSTMS_MCS":"FLDNODE~MEDIACTRLSYS~FLDMEDIA~STAT~OUTDIRECTORY~INACKDIRECTORY~OUTACKDIRECTORY~INDIRECTORY~OUTFNC~FILEPRFIX~UNXINDIR~UNXOUTDIR~UNXSWIFTSERVER~INQUENAME~OUTQUENAME~MQSAFLG~QUETYP~CODPRT~CODSERVIP~DLVRY_NOTIFICATION_RQD~IS_DATAPDU_RQD~IS_SWIFTLAU_REQUIRED~FILE_TYPE~INCOMING_KEY_FIRST_PART~INCOMING_KEY_SECOND_PART~LAU_TYPE~OUTGOING_KEY_FIRST_PART~OUTGOING_KEY_SECOND_PART~XMLV2_REVISION~XSD_PATH~HEADER_PROFILE_ID~REST_ENDPOINT_URL~SERVICE_PROFILE_ID~WRAP_MESSAGE~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH"};

var multipleEntryPageSize = {};

var multipleEntrySVBlocks = "";

var tabMEBlks = {};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_MSTMS_MCS">FLDNODE~MEDIACTRLSYS~FLDMEDIA~STAT~OUTDIRECTORY~INACKDIRECTORY~OUTACKDIRECTORY~INDIRECTORY~OUTFNC~FILEPRFIX~UNXINDIR~UNXOUTDIR~UNXSWIFTSERVER~INQUENAME~OUTQUENAME~MQSAFLG~QUETYP~CODPRT~CODSERVIP~DLVRY_NOTIFICATION_RQD~IS_DATAPDU_RQD~IS_SWIFTLAU_REQUIRED~FILE_TYPE~INCOMING_KEY_FIRST_PART~INCOMING_KEY_SECOND_PART~LAU_TYPE~OUTGOING_KEY_FIRST_PART~OUTGOING_KEY_SECOND_PART~XMLV2_REVISION~XSD_PATH~HEADER_PROFILE_ID~REST_ENDPOINT_URL~SERVICE_PROFILE_ID~WRAP_MESSAGE~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_MSTMS_MCS">AUTHSTAT~TXNSTAT~FLDNODE~MEDIACTRLSYS~FLDMEDIA~STAT</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "MSDMGMCS";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_MSTMS_MCS";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_MSTMS_MCS" : ""}; 

 var dataSrcLocationArray = new Array("BLK_MSTMS_MCS"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside MSDMGMCS.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside MSDMGMCS.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_MSTMS_MCS__FLDNODE";
pkFields[0] = "BLK_MSTMS_MCS__FLDNODE";
queryFields[1] = "BLK_MSTMS_MCS__MEDIACTRLSYS";
pkFields[1] = "BLK_MSTMS_MCS__MEDIACTRLSYS";
queryFields[2] = "BLK_MSTMS_MCS__FLDMEDIA";
pkFields[2] = "BLK_MSTMS_MCS__FLDMEDIA";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_MSTMS_MCS":["DLVRY_NOTIFICATION_RQD","FILEPRFIX","FILE_TYPE","INCOMING_KEY_FIRST_PART","INCOMING_KEY_SECOND_PART","INDIRECTORY","INQUENAME","IS_DATAPDU_RQD","IS_SWIFTLAU_REQUIRED","LAU_TYPE","MQSAFLG","OUTDIRECTORY","OUTGOING_KEY_FIRST_PART","OUTGOING_KEY_SECOND_PART","OUTQUENAME","QUETYP","STAT","UNXINDIR","UNXOUTDIR","UNXSWIFTSERVER","XMLV2_REVISION"]};
//***** Fields Amendable while Close *****
var closeAmendArr = {"BLK_MSTMS_MCS":["FILEPRFIX","INDIRECTORY","INQUENAME","MQSAFLG","OUTDIRECTORY","OUTQUENAME","QUETYP","STAT","UNXINDIR","UNXOUTDIR","UNXSWIFTSERVER"]};
//***** Fields Amendable while Reopen *****
var reopenAmendArr = {"BLK_MSTMS_MCS":["FILEPRFIX","INDIRECTORY","INQUENAME","MQSAFLG","OUTDIRECTORY","OUTQUENAME","QUETYP","STAT","UNXINDIR","UNXOUTDIR","UNXSWIFTSERVER"]};
var reverseAmendArr = new Array(); 
//***** Fields Amendable while Delete *****
var deleteAmendArr = {"BLK_MSTMS_MCS":["FILEPRFIX","INDIRECTORY","INQUENAME","MQSAFLG","OUTDIRECTORY","OUTQUENAME","QUETYP","STAT","UNXINDIR","UNXOUTDIR","UNXSWIFTSERVER"]};
var rolloverAmendArr = new Array(); 
var confirmAmendArr = new Array(); 
var liquidateAmendArr = new Array(); 
//***** Fields Amendable while Query *****
var queryAmendArr = {"BLK_MSTMS_MCS":["FILEPRFIX","INDIRECTORY","INQUENAME","MQSAFLG","OUTDIRECTORY","OUTQUENAME","QUETYP","STAT","UNXINDIR","UNXOUTDIR","UNXSWIFTSERVER"]};
//***** Fields Amendable while Authorize *****
var authorizeAmenArr = {"BLK_MSTMS_MCS":["FILEPRFIX","INDIRECTORY","INQUENAME","MQSAFLG","OUTDIRECTORY","OUTQUENAME","QUETYP","STAT","UNXINDIR","UNXOUTDIR","UNXSWIFTSERVER"]};
//----------------------------------------------------------------------------------------------------------------------

var subsysArr    = new Array(); 

//----------------------------------------------------------------------------------------------------------------------

//***** CODE FOR LOVs *****
//----------------------------------------------------------------------------------------------------------------------
var lovInfoFlds = {"BLK_MSTMS_MCS__FLDNODE__LOV_NODE":["BLK_MSTMS_MCS__FLDNODE~","","N",""],"BLK_MSTMS_MCS__FLDMEDIA__LOV_MEDIA":["BLK_MSTMS_MCS__FLDMEDIA~~","","N~N",""],"BLK_MSTMS_MCS__HEADER_PROFILE_ID__LOV_HEADER_PROFILE":["BLK_MSTMS_MCS__HEADER_PROFILE_ID~","","N",""],"BLK_MSTMS_MCS__SERVICE_PROFILE_ID__LOV_RS_PROFILE":["~","","N",""]};
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

 var CallFormArray= new Array("CSCFNUDF~BLK_MSTMS_MCS"); 

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

ArrFuncOrigin["MSDMGMCS"]="KERNEL";
ArrPrntFunc["MSDMGMCS"]="";
ArrPrntOrigin["MSDMGMCS"]="";
ArrRoutingType["MSDMGMCS"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["MSDMGMCS"]="N";
ArrCustomModified["MSDMGMCS"]="N";

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
var actStageArry = {"QUERY":"2","NEW":"2","MODIFY":"2","AUTHORIZE":"1","DELETE":"1","CLOSE":"1","REOPEN":"1","REVERSE":"1","ROLLOVER":"1","CONFIRM":"1","LIQUIDATE":"1","SUMMARYQUERY":"1"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------