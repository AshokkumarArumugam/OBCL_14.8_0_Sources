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
**  File Name          : TLJOBPRC_SYS.js
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
var criteriaSearch  = '';
//----------------------------------------------------------------------------------------------------------------------
//***** FCJ XML FOR THE SCREEN *****
//----------------------------------------------------------------------------------------------------------------------
var fieldNameArray = {"BLK_BRANCH_PARAMETERS":"BRANCH_CODE~TXT_TLS_PROCESS~TXT_PROCESS_NAME~TXT_REF_NO~TXT_USER_ID~TXT_TR_FILE_NAME~TXT_LBTL_PROC~TXT_TRADE_TLS~TXT_TLS_REF_NO~TXT_TLLB_IFACE~TXT_REDN_HOFF~TXT_TICKET_ID"};

var multipleEntryPageSize = {};

var multipleEntrySVBlocks = "";

var tabMEBlks = {};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_BRANCH_PARAMETERS">BRANCH_CODE~TXT_TLS_PROCESS~TXT_PROCESS_NAME~TXT_REF_NO~TXT_USER_ID~TXT_TR_FILE_NAME~TXT_LBTL_PROC~TXT_TRADE_TLS~TXT_TLS_REF_NO~TXT_TLLB_IFACE~TXT_REDN_HOFF~TXT_TICKET_ID</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_MAIN";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_BRANCH_PARAMETERS" : ""}; 

 var dataSrcLocationArray = new Array("BLK_BRANCH_PARAMETERS"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside TLJOBPRC.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside TLJOBPRC.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_BRANCH_PARAMETERS__BRANCH_CODE";
pkFields[0] = "BLK_BRANCH_PARAMETERS__BRANCH_CODE";
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
var lovInfoFlds = {"BLK_BRANCH_PARAMETERS__TXT_REF_NO__LOV_TRANS_ID":["BLK_BRANCH_PARAMETERS__TXT_REF_NO~","","N","N"],"BLK_BRANCH_PARAMETERS__TXT_USER_ID__LOV_USERID":["BLK_BRANCH_PARAMETERS__TXT_USER_ID~","","N","N"],"BLK_BRANCH_PARAMETERS__TXT_LBTL_PROC__LOV_LBTL_PROC":["BLK_BRANCH_PARAMETERS__TXT_LBTL_PROC~","","N","N"],"BLK_BRANCH_PARAMETERS__TXT_TRADE_TLS__LOV_TRADE_TLS":["BLK_BRANCH_PARAMETERS__TXT_TRADE_TLS~","","N","N"],"BLK_BRANCH_PARAMETERS__TXT_TLS_REF_NO__LOV_TLS_REFNO":["BLK_BRANCH_PARAMETERS__TXT_TLS_REF_NO~","","N","N"],"BLK_BRANCH_PARAMETERS__TXT_TLLB_IFACE__LOV_TLLB_IFACE":["BLK_BRANCH_PARAMETERS__TXT_TLLB_IFACE~","","N","N"],"BLK_BRANCH_PARAMETERS__TXT_REDN_HOFF__LOV_REDN_HOFF":["BLK_BRANCH_PARAMETERS__TXT_REDN_HOFF~","","N","N"],"BLK_BRANCH_PARAMETERS__TXT_TICKET_ID__LOV_TICKET_ID":["BLK_BRANCH_PARAMETERS__TXT_TICKET_ID~","","N","N"]};
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

ArrFuncOrigin["TLJOBPRC"]="KERNEL";
ArrPrntFunc["TLJOBPRC"]="";
ArrPrntOrigin["TLJOBPRC"]="";
ArrRoutingType["TLJOBPRC"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["TLJOBPRC"]="N";
ArrCustomModified["TLJOBPRC"]="N";

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