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
**  File Name          : OLCESCAM_SYS.js
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
var fieldNameArray = {"BLK_OLTBS_CONTRACT_ESCRO":"CONTRACTREFNO~LATESTVERSIONNO","BLK_OLTBS_CONTRACT_ESCROW_LINKAGES":"CONTRAREFNO~ACGNO~ESCROWTYPE~ESCROWBALANCE~LASTUPDDATE~TXTACCDESC"};

var multipleEntryPageSize = {"BLK_OLTBS_CONTRACT_ESCROW_LINKAGES" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_ESCROW__TAB_MAIN":"BLK_OLTBS_CONTRACT_ESCROW_LINKAGES"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTBS_CONTRACT_ESCRO">CONTRACTREFNO~LATESTVERSIONNO</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONTRACT_ESCRO" RELATION_TYPE="N" TYPE="BLK_OLTBS_CONTRACT_ESCROW_LINKAGES">CONTRAREFNO~ACGNO~ESCROWTYPE~ESCROWBALANCE~LASTUPDDATE~TXTACCDESC</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_ESCROW";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_OLTBS_CONTRACT_ESCRO" : "","BLK_OLTBS_CONTRACT_ESCROW_LINKAGES" : "BLK_OLTBS_CONTRACT_ESCRO~N"}; 

 var dataSrcLocationArray = new Array("BLK_OLTBS_CONTRACT_ESCRO","BLK_OLTBS_CONTRACT_ESCROW_LINKAGES"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLCESCAM.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLCESCAM.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_OLTBS_CONTRACT_ESCRO__CONTRACTREFNO";
pkFields[0] = "BLK_OLTBS_CONTRACT_ESCRO__CONTRACTREFNO";
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
var lovInfoFlds = {"BLK_OLTBS_CONTRACT_ESCROW_LINKAGES__ACGNO__LOV_ESC_ACC":["BLK_OLTBS_CONTRACT_ESCROW_LINKAGES__ACGNO~BLK_OLTBS_CONTRACT_ESCROW_LINKAGES__TXTACCDESC~~BLK_OLTBS_CONTRACT_ESCROW_LINKAGES__ESCROWTYPE~","BLK_OLTBS_CONTRACT_ESCRO__CONTRACTREFNO!VARCHAR","N~N~N~N",""]};
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
var multipleEntryIDs = new Array("BLK_OLTBS_CONTRACT_ESCROW_LINKAGES");
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

ArrFuncOrigin["OLCESCAM"]="KERNEL";
ArrPrntFunc["OLCESCAM"]="";
ArrPrntOrigin["OLCESCAM"]="";
ArrRoutingType["OLCESCAM"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLCESCAM"]="N";
ArrCustomModified["OLCESCAM"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_ESCROW":"CONTRACTREFNO~LATESTVERSIONNO"};
var scrArgSource = {};
var scrArgVals = {"CVS_ESCROW":"~"};
var scrArgDest = {"CVS_ESCROW":"BLK_OLTBS_CONTRACT_ESCRO__CONTRACTREFNO~BLK_OLTBS_CONTRACT_ESCRO__LATESTVERSIONNO"};
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