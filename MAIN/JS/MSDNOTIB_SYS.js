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
**  File Name          : MSDNOTIB_SYS.js
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
var fieldNameArray = {"BLK_MESSAGE_NOTIFICATION":"BRAN~DCN1~SENDR~SWIFTMSGTY~BRANDT~MAKERID~MAKERDTSTAMP~MSG~RUNNINGNO~PROCESSSTATUS~CHECKERDTSTAMP~CHECKERID~ONCEAUTH~MIR1~RECEVR~MUR1~MODNO~REFERENCENO~AUTHSTAT~RECORDSTAT~ERROR_CODE~ACK_NACK_RECEIVE_DATE~ACK_NACK_TYPE~DELIVERY_NOTIF~DELIVERY_NOTIF_RECEIVE_DATE~NON_DELIVERY_NOTIF~NON_DELIVERY_RECEIVE_DATE~ACK_MESSAGE_FORMAT~FAILED_DELIVERY_NOTIF~FAILED_DELIVERY_NOTIF_REF~FAILED_DLVRY_RCV_DTTM~FAILED_DLVRY_STATUS~MEDIA~MSG_IDENTIFIER~RECONCILIATION_REFERENCE"};

var multipleEntryPageSize = {};

var multipleEntrySVBlocks = "";

var tabMEBlks = {};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_MESSAGE_NOTIFICATION">BRAN~DCN1~SENDR~SWIFTMSGTY~BRANDT~MAKERID~MAKERDTSTAMP~MSG~RUNNINGNO~PROCESSSTATUS~CHECKERDTSTAMP~CHECKERID~ONCEAUTH~MIR1~RECEVR~MUR1~MODNO~REFERENCENO~AUTHSTAT~RECORDSTAT~ERROR_CODE~ACK_NACK_RECEIVE_DATE~ACK_NACK_TYPE~DELIVERY_NOTIF~DELIVERY_NOTIF_RECEIVE_DATE~NON_DELIVERY_NOTIF~NON_DELIVERY_RECEIVE_DATE~ACK_MESSAGE_FORMAT~FAILED_DELIVERY_NOTIF~FAILED_DELIVERY_NOTIF_REF~FAILED_DLVRY_RCV_DTTM~FAILED_DLVRY_STATUS~MEDIA~MSG_IDENTIFIER~RECONCILIATION_REFERENCE</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_MESSAGE_NOTIFICATION">BRAN~DCN1~REFERENCENO~MIR1~MUR1~SWIFTMSGTY~ACK_NACK_TYPE~DELIVERY_NOTIF~NON_DELIVERY_NOTIF~ACK_NACK_RECEIVE_DATE~DELIVERY_NOTIF_RECEIVE_DATE~NON_DELIVERY_RECEIVE_DATE~RECEVR~BRANDT~AUTHSTAT~MAKERDTSTAMP~RUNNINGNO~PROCESSSTATUS~ACK_MESSAGE_FORMAT~RECONCILIATION_REFERENCE~MEDIA~FAILED_DLVRY_STATUS~FAILED_DLVRY_RCV_DTTM~FAILED_DELIVERY_NOTIF</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "MSDNOTIB";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =4;
var g_SummaryBlock ="BLK_MESSAGE_NOTIFICATION";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_MESSAGE_NOTIFICATION" : ""}; 

 var dataSrcLocationArray = new Array("BLK_MESSAGE_NOTIFICATION"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside MSDNOTIB.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside MSDNOTIB.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_MESSAGE_NOTIFICATION__DCN1";
pkFields[0] = "BLK_MESSAGE_NOTIFICATION__DCN1";
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

ArrFuncOrigin["MSDNOTIB"]="KERNEL";
ArrPrntFunc["MSDNOTIB"]="";
ArrPrntOrigin["MSDNOTIB"]="";
ArrRoutingType["MSDNOTIB"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["MSDNOTIB"]="N";
ArrCustomModified["MSDNOTIB"]="N";

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
var actStageArry = {};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------