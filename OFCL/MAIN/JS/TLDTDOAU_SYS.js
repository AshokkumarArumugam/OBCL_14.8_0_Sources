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
**  File Name          : TLDTDOAU_SYS.js
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
var fieldNameArray = {"BLK_TDOAU":"FCCREF~EVENT_FCCREF~EVENT_CD~EVENT_INPUBY~EVENT_DT","BLK_REKEY":"RK_FCCREF~RK_VER~RK_CPTY~RK_TRD_DT~RK_EXPT_SETTL_DT~RK_CCY~RK_TRD_AMT~RK_TRD_PRICE~TXTCPTY~TXTCCY~TXTTRD_AMT~TXTTRD_PRICE~TXTTRD_DT~TXTEXPT_STL_DT","BLK_CHANGE_LOG":"CL_FCCREF~CL_FIELD_DESC~CL_OLD_VAL~CL_NEW_VAL","BLK_TDOAU_OVD":"OVD_FCCREF~OVD_ESN~OVD_SEQNO~OVD_ERRCD~OVD_CONFIRMED~OVD_DESC~OVD_AUTHSTAT~OVD_AUTHBY~OVD_AUTHDT"};

var multipleEntryPageSize = {"BLK_CHANGE_LOG" :"15" ,"BLK_TDOAU_OVD" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_TDOAU__TAB_MAIN":"BLK_CHANGE_LOG~BLK_TDOAU_OVD"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_TDOAU">FCCREF~EVENT_FCCREF~EVENT_CD~EVENT_INPUBY~EVENT_DT</FN>'; 
msgxml += '      <FN PARENT="BLK_TDOAU" RELATION_TYPE="1" TYPE="BLK_REKEY">RK_FCCREF~RK_VER~RK_CPTY~RK_TRD_DT~RK_EXPT_SETTL_DT~RK_CCY~RK_TRD_AMT~RK_TRD_PRICE~TXTCPTY~TXTCCY~TXTTRD_AMT~TXTTRD_PRICE~TXTTRD_DT~TXTEXPT_STL_DT</FN>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="N" TYPE="BLK_CHANGE_LOG">CL_FCCREF~CL_FIELD_DESC~CL_OLD_VAL~CL_NEW_VAL</FN>'; 
msgxml += '      <FN PARENT="BLK_TDOAU" RELATION_TYPE="N" TYPE="BLK_TDOAU_OVD">OVD_FCCREF~OVD_ESN~OVD_SEQNO~OVD_ERRCD~OVD_CONFIRMED~OVD_DESC~OVD_AUTHSTAT~OVD_AUTHBY~OVD_AUTHDT</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_TDOAU";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_TDOAU" : "","BLK_REKEY" : "BLK_TDOAU~1","BLK_CHANGE_LOG" : "","BLK_TDOAU_OVD" : "BLK_TDOAU~N"}; 

 var dataSrcLocationArray = new Array("BLK_TDOAU","BLK_REKEY","BLK_CHANGE_LOG","BLK_TDOAU_OVD"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside TLDTDOAU.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside TLDTDOAU.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_TDOAU__FCCREF";
pkFields[0] = "BLK_TDOAU__FCCREF";
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
var multipleEntryIDs = new Array("BLK_CHANGE_LOG","BLK_TDOAU_OVD");
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

ArrFuncOrigin["TLDTDOAU"]="KERNEL";
ArrPrntFunc["TLDTDOAU"]="";
ArrPrntOrigin["TLDTDOAU"]="";
ArrRoutingType["TLDTDOAU"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["TLDTDOAU"]="N";
ArrCustomModified["TLDTDOAU"]="N";

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