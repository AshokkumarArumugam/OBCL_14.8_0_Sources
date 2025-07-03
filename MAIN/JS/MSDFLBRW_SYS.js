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
**  File Name          : MSDFLBRW_SYS.js
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
var fieldNameArray = {"BLK_MSTB_EMS_FILE_MSG_OUT":"FOLDER_PATH~FILE_TYPE~NO_OF_TXN~GENERATED_DATE_TIME~HANDOFF_STATUS~RECEIVER_BIC~SENDER_BIC~PROTOCOL_TYPE~FILE_FORMAT~FILE_STATUS~ERROR_DESC~HOST_CODE~ERROR_CODE~MEDIA~NO_OF_BULKS~SWIFTNET_CONNECTIVITY~FILE_REF_ID~NETWORK_CODE~FILE_NAME~ERROR_PARAM~SOURCE~MODULE~EXTERNAL_REFERENCE_NO~FILE_SIZE"};

var multipleEntryPageSize = {};

var multipleEntrySVBlocks = "";

 var tabMEBlks = {};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_MSTB_EMS_FILE_MSG_OUT">FOLDER_PATH~FILE_TYPE~NO_OF_TXN~GENERATED_DATE_TIME~HANDOFF_STATUS~RECEIVER_BIC~SENDER_BIC~PROTOCOL_TYPE~FILE_FORMAT~FILE_STATUS~ERROR_DESC~HOST_CODE~ERROR_CODE~MEDIA~NO_OF_BULKS~SWIFTNET_CONNECTIVITY~FILE_REF_ID~NETWORK_CODE~FILE_NAME~ERROR_PARAM~SOURCE~MODULE~EXTERNAL_REFERENCE_NO~FILE_SIZE</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_MSTB_EMS_FILE_MSG_OUT">FILE_REF_ID~FILE_TYPE~GENERATED_DATE_TIME~HANDOFF_STATUS~RECEIVER_BIC~SENDER_BIC~FILE_FORMAT~FILE_STATUS~MEDIA~NETWORK_CODE~FILE_NAME~SOURCE~MODULE~EXTERNAL_REFERENCE_NO</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "MSDFLBRW";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =1;
var g_SummaryBlock ="BLK_MSTB_EMS_FILE_MSG_OUT";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_MSTB_EMS_FILE_MSG_OUT" : ""}; 

 var dataSrcLocationArray = new Array("BLK_MSTB_EMS_FILE_MSG_OUT"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = false ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside MSDFLBRW.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside MSDFLBRW.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_MSTB_EMS_FILE_MSG_OUT__FILE_REF_ID";
pkFields[0] = "BLK_MSTB_EMS_FILE_MSG_OUT__FILE_REF_ID";
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

ArrFuncOrigin["MSDFLBRW"]="KERNEL";
ArrPrntFunc["MSDFLBRW"]="";
ArrPrntOrigin["MSDFLBRW"]="";
ArrRoutingType["MSDFLBRW"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["MSDFLBRW"]="N";
ArrCustomModified["MSDFLBRW"]="N";

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