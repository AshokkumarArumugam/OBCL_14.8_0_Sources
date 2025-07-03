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
**  File Name          : LBDINSVW_SYS.js
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
var fieldNameArray = {"BLK_MST":"CUSTOMER_NO","BLK_INSVW":"PRODUCT_CODE~SETTLEMENT_SEQ_NO~SSI_MNEMONIC~BRANCH~MODULE~COUNTERPARTY~CURRENCY~PAY_ACCOUNT~RECV_ACCOUNT~PAY_AC_BRANCH~RECV_AC_BRANCH~PAY_ACCOUNT_CCY~RECV_ACCOUNT_CCY~COVER_REQUIRED~CHARGES_DETAILS"};

var multipleEntryPageSize = {"BLK_INSVW" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_INSVW__TAB_MAIN":"BLK_INSVW"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_MST">CUSTOMER_NO</FN>'; 
msgxml += '      <FN PARENT="BLK_MST" RELATION_TYPE="N" TYPE="BLK_INSVW">PRODUCT_CODE~SETTLEMENT_SEQ_NO~SSI_MNEMONIC~BRANCH~MODULE~COUNTERPARTY~CURRENCY~PAY_ACCOUNT~RECV_ACCOUNT~PAY_AC_BRANCH~RECV_AC_BRANCH~PAY_ACCOUNT_CCY~RECV_ACCOUNT_CCY~COVER_REQUIRED~CHARGES_DETAILS</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_INSVW";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_MST" : "","BLK_INSVW" : "BLK_MST~N"}; 

 var dataSrcLocationArray = new Array("BLK_MST","BLK_INSVW"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LBDINSVW.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LBDINSVW.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_MST__CUSTOMER_NO";
pkFields[0] = "BLK_MST__CUSTOMER_NO";
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
var multipleEntryIDs = new Array("BLK_INSVW");
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

ArrFuncOrigin["LBDINSVW"]="KERNEL";
ArrPrntFunc["LBDINSVW"]="";
ArrPrntOrigin["LBDINSVW"]="";
ArrRoutingType["LBDINSVW"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LBDINSVW"]="N";
ArrCustomModified["LBDINSVW"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_INSVW":"CUSREFNO~ACTION_CODE"};
var scrArgSource = {};
var scrArgVals = {"CVS_INSVW":"~EXECUTEQUERY"};
var scrArgDest = {"CVS_INSVW":"BLK_MST__CUSTOMER_NO~"};
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