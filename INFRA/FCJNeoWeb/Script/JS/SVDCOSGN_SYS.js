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
**  File Name          : SVDCOSGN_SYS.js
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
var fieldNameArray = {"BLK_ACCOUNT_DETAILS":"CUST_ACC~BRANCH~ACCMSG~ACC_DESC~ACC_CCY~IMAGE_TYPE~TO_AMT~LOV_ID~GROUP_ID","BLK_SIGNATURE_DETAILS":"CUST_ID~JOINT_TYPE~SIGN_ID~SIG_NAME~SIGN_TYPE~APPR_LIMIT~SIGN_MSG~SOLO_SUFFICIENT","BLK_AMT_SIG":"REMK~CO_ID~TOAMOUNT","BLK_SIGNATURE":"SPECIMAN_NO~FILE_TYPE~IMG_TYPE~SIGTEXT","BLK_AMT_GROUP":"GROUP_ID~REQ_NO_SIG"};

var multipleEntryPageSize = {"BLK_SIGNATURE_DETAILS" :"15" ,"BLK_AMT_SIG" :"15" ,"BLK_AMT_GROUP" :"15" };

var multipleEntrySVBlocks = "BLK_SIGNATURE";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN_1":"BLK_SIGNATURE_DETAILS"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_ACCOUNT_DETAILS">CUST_ACC~BRANCH~ACCMSG~ACC_DESC~ACC_CCY~IMAGE_TYPE~TO_AMT~LOV_ID~GROUP_ID</FN>'; 
msgxml += '      <FN PARENT="BLK_ACCOUNT_DETAILS" RELATION_TYPE="N" TYPE="BLK_SIGNATURE_DETAILS">CUST_ID~JOINT_TYPE~SIGN_ID~SIG_NAME~SIGN_TYPE~APPR_LIMIT~SIGN_MSG~SOLO_SUFFICIENT</FN>'; 
msgxml += '      <FN PARENT="BLK_SIGNATURE_DETAILS" RELATION_TYPE="N" TYPE="BLK_AMT_SIG">REMK~CO_ID~TOAMOUNT</FN>'; 
msgxml += '      <FN PARENT="BLK_SIGNATURE_DETAILS" RELATION_TYPE="N" TYPE="BLK_SIGNATURE">SPECIMAN_NO~FILE_TYPE~IMG_TYPE~SIGTEXT</FN>'; 
msgxml += '      <FN PARENT="BLK_AMT_SIG" RELATION_TYPE="N" TYPE="BLK_AMT_GROUP">GROUP_ID~REQ_NO_SIG</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_MAIN";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_ACCOUNT_DETAILS" : "","BLK_SIGNATURE_DETAILS" : "BLK_ACCOUNT_DETAILS~N","BLK_AMT_SIG" : "BLK_SIGNATURE_DETAILS~N","BLK_SIGNATURE" : "BLK_SIGNATURE_DETAILS~N","BLK_AMT_GROUP" : "BLK_AMT_SIG~N"}; 

 var dataSrcLocationArray = new Array("BLK_ACCOUNT_DETAILS","BLK_SIGNATURE_DETAILS","BLK_AMT_SIG","BLK_SIGNATURE","BLK_AMT_GROUP"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside SVDCOSGN.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside SVDCOSGN.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_ACCOUNT_DETAILS__CUST_ACC";
pkFields[0] = "BLK_ACCOUNT_DETAILS__CUST_ACC";
queryFields[1] = "BLK_ACCOUNT_DETAILS__BRANCH";
pkFields[1] = "BLK_ACCOUNT_DETAILS__BRANCH";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_AMT_GROUP":["BTN_IMAGE_VIEW"]};
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
var multipleEntryIDs = new Array("BLK_SIGNATURE_DETAILS","BLK_AMT_SIG","BLK_AMT_GROUP");
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

ArrFuncOrigin["SVDCOSGN"]="KERNEL";
ArrPrntFunc["SVDCOSGN"]="";
ArrPrntOrigin["SVDCOSGN"]="";
ArrRoutingType["SVDCOSGN"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["SVDCOSGN"]="N";
ArrCustomModified["SVDCOSGN"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CSDCOINS":"","SVDCONVW":""};
var scrArgSource = {"CSDCOINS":"","SVDCONVW":""};
var scrArgVals = {"CSDCOINS":"","SVDCONVW":""};
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
var actStageArry = {"QUERY":"2","NEW":"2","MODIFY":"2","AUTHORIZE":"2","DELETE":"2","CLOSE":"2","REOPEN":"2","REVERSE":"2","ROLLOVER":"2","CONFIRM":"2","LIQUIDATE":"2","SUMMARYQUERY":"2"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------
var imageFldset_TAB_MAIN_1= new Array(); 
imageFldset_TAB_MAIN_1[0]="TAB_MAIN_1__SEC_3__PAR1__FST_IMGFLDSET";