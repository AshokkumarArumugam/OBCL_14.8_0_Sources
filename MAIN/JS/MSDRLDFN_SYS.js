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
**  File Name          : MSDRLDFN_SYS.js
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
var fieldNameArray = {"BLK_MSTM_RULE_EXPRESSION":"RULE_NAME~RULE_DESCRIPTION~FINALEXPRESSION~EXPRESSION_PARAMETER~CUSTOM_PARAMETERS~SYS_PARAMETERS~RULE_PRIORITY~QUEUE_NAME~FOLDER_NAME~SWIFTNET_CONNECTIVITY~DESTINATION_TYPE~PROTOCOL_NAME~RULE_GRP_NAME~PROTOCOL_TYPE~BULK_RULE_NAME~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH","BLK_MSTM_EMS_ROUTING_RULE_DETAIL":"RULENAME~EXPRESSIONSECTION~SCOPSTART~LOPTYPE~LOPDATATYPE~LEFTOPERANT~OPERATO~ROPTYPE~ROPDATATYPE~LOGICALOPERATOR~SCOPEEND~RIGHTOPERANT~LOPPARAMDEF~ROPPARAMDEF~LOPEXP_PARAMETERS~ROPEXP_PARAMETERS","BLK_BLOCK3":""};

var multipleEntryPageSize = {"BLK_MSTM_EMS_ROUTING_RULE_DETAIL" :"15" ,"BLK_BLOCK3" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_MSTM_EMS_ROUTING_RULE_DETAIL~BLK_BLOCK3"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_MSTM_RULE_EXPRESSION">RULE_NAME~RULE_DESCRIPTION~FINALEXPRESSION~EXPRESSION_PARAMETER~CUSTOM_PARAMETERS~SYS_PARAMETERS~RULE_PRIORITY~QUEUE_NAME~FOLDER_NAME~SWIFTNET_CONNECTIVITY~DESTINATION_TYPE~PROTOCOL_NAME~RULE_GRP_NAME~PROTOCOL_TYPE~BULK_RULE_NAME~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
msgxml += '      <FN PARENT="BLK_MSTM_RULE_EXPRESSION" RELATION_TYPE="N" TYPE="BLK_MSTM_EMS_ROUTING_RULE_DETAIL">RULENAME~EXPRESSIONSECTION~SCOPSTART~LOPTYPE~LOPDATATYPE~LEFTOPERANT~OPERATO~ROPTYPE~ROPDATATYPE~LOGICALOPERATOR~SCOPEEND~RIGHTOPERANT~LOPPARAMDEF~ROPPARAMDEF~LOPEXP_PARAMETERS~ROPEXP_PARAMETERS</FN>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="N" TYPE="BLK_BLOCK3"></FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_MSTM_RULE_EXPRESSION">AUTHSTAT~TXNSTAT~RULE_NAME~RULE_DESCRIPTION~RULE_GRP_NAME~DESTINATION_TYPE</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "MSDRLDFN";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_MSTM_RULE_EXPRESSION";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_MSTM_RULE_EXPRESSION" : "","BLK_MSTM_EMS_ROUTING_RULE_DETAIL" : "BLK_MSTM_RULE_EXPRESSION~N","BLK_BLOCK3" : ""}; 

 var dataSrcLocationArray = new Array("BLK_MSTM_RULE_EXPRESSION","BLK_MSTM_EMS_ROUTING_RULE_DETAIL","BLK_BLOCK3"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside MSDRLDFN.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside MSDRLDFN.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_MSTM_RULE_EXPRESSION__RULE_NAME";
pkFields[0] = "BLK_MSTM_RULE_EXPRESSION__RULE_NAME";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_BLOCK3":["PARAMNAME","PARAMTYPE","PARAMVALUE"],"BLK_MSTM_EMS_ROUTING_RULE_DETAIL":["EXPRESSIONSECTION","LEFTOPERANT","LOGICALOPERATOR","LOPDATATYPE","LOPEXP_PARAMETERS","LOPPARAMDEF","LOPTYPE","OPERATO","RIGHTOPERANT","ROPDATATYPE","ROPEXP_PARAMETERS","ROPPARAMDEF","ROPTYPE","SCOPEEND","SCOPSTART"],"BLK_MSTM_RULE_EXPRESSION":["BUILDEXPRESSION","BULK_RULE_NAME","CUSTOM_PARAMETERS","DESTINATION_TYPE","EDIT_LEFTOPERAND","EDIT_RIGHTOPERAND","EXPRESSION_PARAMETER","EXPRSSIONFOR","FINALEXPRESSION","FOLDER_NAME","PREDEFINEDFUNCTIONS","PROTOCOL_NAME","PROTOCOL_TYPE","QUEUE_NAME","RULE_DESCRIPTION","RULE_GRP_NAME","SWIFTNET_CONNECTIVITY","SYS_PARAMETERS"]};
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
var lovInfoFlds = {"BLK_MSTM_RULE_EXPRESSION__SWIFTNET_CONNECTIVITY__LOV_SWIFTNETCON":["BLK_MSTM_RULE_EXPRESSION__SWIFTNET_CONNECTIVITY~","BLK_MSTM_RULE_EXPRESSION__PROTOCOL_TYPE!","N",""],"BLK_MSTM_RULE_EXPRESSION__PROTOCOL_NAME__LOV_PROTOCOL_NAME":["BLK_MSTM_RULE_EXPRESSION__PROTOCOL_NAME~~","BLK_MSTM_RULE_EXPRESSION__PROTOCOL_TYPE!","N~N",""],"BLK_MSTM_RULE_EXPRESSION__RULE_GRP_NAME__LOV_RL_GRP":["BLK_MSTM_RULE_EXPRESSION__RULE_GRP_NAME~","","N",""],"BLK_MSTM_RULE_EXPRESSION__BULK_RULE_NAME__LOV_BULK_RULE":["BLK_MSTM_RULE_EXPRESSION__BULK_RULE_NAME~","","N",""],"BLK_MSTM_EMS_ROUTING_RULE_DETAIL__LEFTOPERANT__LOV_PARAM_VAL":["BLK_MSTM_EMS_ROUTING_RULE_DETAIL__LEFTOPERANT~","BLK_MSTM_EMS_ROUTING_RULE_DETAIL__LOPTYPE!","N","N"],"BLK_MSTM_EMS_ROUTING_RULE_DETAIL__RIGHTOPERANT__LOV_PARAM_VAL":["BLK_MSTM_EMS_ROUTING_RULE_DETAIL__RIGHTOPERANT~","BLK_MSTM_EMS_ROUTING_RULE_DETAIL__ROPTYPE!","N","N"],"BLK_BLOCK3__PARAMVALUE__LOV_PARAM_VAL":["BLK_BLOCK3__PARAMVALUE~","BLK_BLOCK3__PARAMTYPE!","N","N"]};
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
var multipleEntryIDs = new Array("BLK_MSTM_EMS_ROUTING_RULE_DETAIL","BLK_BLOCK3");
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

ArrFuncOrigin["MSDRLDFN"]="KERNEL";
ArrPrntFunc["MSDRLDFN"]="";
ArrPrntOrigin["MSDRLDFN"]="";
ArrRoutingType["MSDRLDFN"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["MSDRLDFN"]="N";
ArrCustomModified["MSDRLDFN"]="N";

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