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
**  File Name          : TLCSWUPL_SYS.js
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
var fieldNameArray = {"BLK_TRD_DET":"FCCREF~USRREFNO~PARENTREFNO~POSID~POSQUA~CUSIP~BRN~DESKCD~TKTID~EXPENSECD~PORTFOLIO~PORTDESC~VERNO~UPLD~SRCCD~CCY","BLK_SWP_DET":"SW_SWAPID~SW_CNPTY~SW_CCY~SW_AMT~SW_OASYSID~SW_REF_NO~SW_FCCREF~SW_SRCCD~SW_BRN~SW_VERNO~SW_TKTID"};

var multipleEntryPageSize = {"BLK_SWP_DET" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_SWAP__TAB_MAIN":"BLK_SWP_DET"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_TRD_DET">FCCREF~USRREFNO~PARENTREFNO~POSID~POSQUA~CUSIP~BRN~DESKCD~TKTID~EXPENSECD~PORTFOLIO~PORTDESC~VERNO~UPLD~SRCCD~CCY</FN>'; 
msgxml += '      <FN PARENT="BLK_TRD_DET" RELATION_TYPE="N" TYPE="BLK_SWP_DET">SW_SWAPID~SW_CNPTY~SW_CCY~SW_AMT~SW_OASYSID~SW_REF_NO~SW_FCCREF~SW_SRCCD~SW_BRN~SW_VERNO~SW_TKTID</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_SWAP";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_TRD_DET" : "","BLK_SWP_DET" : "BLK_TRD_DET~N"}; 

 var dataSrcLocationArray = new Array("BLK_TRD_DET","BLK_SWP_DET"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside TLCSWUPL.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside TLCSWUPL.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_TRD_DET__FCCREF";
pkFields[0] = "BLK_TRD_DET__FCCREF";
queryFields[1] = "BLK_TRD_DET__SRCCD";
pkFields[1] = "BLK_TRD_DET__SRCCD";
queryFields[2] = "BLK_TRD_DET__BRN";
pkFields[2] = "BLK_TRD_DET__BRN";
queryFields[3] = "BLK_TRD_DET__VERNO";
pkFields[3] = "BLK_TRD_DET__VERNO";
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
var multipleEntryIDs = new Array("BLK_SWP_DET");
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

ArrFuncOrigin["TLCSWUPL"]="KERNEL";
ArrPrntFunc["TLCSWUPL"]="";
ArrPrntOrigin["TLCSWUPL"]="";
ArrRoutingType["TLCSWUPL"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["TLCSWUPL"]="N";
ArrCustomModified["TLCSWUPL"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_SWAP":"FCCRE~VERNO~SRCCD~BRN"};
var scrArgSource = {};
var scrArgVals = {"CVS_SWAP":"~~~"};
var scrArgDest = {"CVS_SWAP":"BLK_TRD_DET__FCCREF~BLK_TRD_DET__VERNO~BLK_TRD_DET__SRCCD~BLK_TRD_DET__BRN"};
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