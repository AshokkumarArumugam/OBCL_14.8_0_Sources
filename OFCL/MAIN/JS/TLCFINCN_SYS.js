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
**  File Name          : TLCFINCN_SYS.js
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
var fieldNameArray = {"BLK_TLTBS_UPLOAD_MASTER_FINCNTR":"EXT_CONTRACT_REF_NO~PORTFOLIO~TRADE_REF_NO~VERSION_NO~PRODUCT_CODE~BRANCH~SOURCE_CODE","BLK_FIN_CENTRES":"APPLIED_FIN_CENTRE~EXT_CONTRACT_REF_NO~FIN_CENTRE~PRODUCT_CODE~VERSION_NO~FIN_CENTRE_DESC"};

var multipleEntryPageSize = {"BLK_FIN_CENTRES" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_FINCENTER__TAB_MAIN":"BLK_FIN_CENTRES"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_TLTBS_UPLOAD_MASTER_FINCNTR">EXT_CONTRACT_REF_NO~PORTFOLIO~TRADE_REF_NO~VERSION_NO~PRODUCT_CODE~BRANCH~SOURCE_CODE</FN>'; 
msgxml += '      <FN PARENT="BLK_TLTBS_UPLOAD_MASTER_FINCNTR" RELATION_TYPE="N" TYPE="BLK_FIN_CENTRES">APPLIED_FIN_CENTRE~EXT_CONTRACT_REF_NO~FIN_CENTRE~PRODUCT_CODE~VERSION_NO~FIN_CENTRE_DESC</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_FINCENTER";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_TLTBS_UPLOAD_MASTER_FINCNTR" : "","BLK_FIN_CENTRES" : "BLK_TLTBS_UPLOAD_MASTER_FINCNTR~N"}; 

 var dataSrcLocationArray = new Array("BLK_TLTBS_UPLOAD_MASTER_FINCNTR","BLK_FIN_CENTRES"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside TLCFINCN.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside TLCFINCN.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_TLTBS_UPLOAD_MASTER_FINCNTR__BRANCH";
pkFields[0] = "BLK_TLTBS_UPLOAD_MASTER_FINCNTR__BRANCH";
queryFields[1] = "BLK_TLTBS_UPLOAD_MASTER_FINCNTR__VERSION_NO";
pkFields[1] = "BLK_TLTBS_UPLOAD_MASTER_FINCNTR__VERSION_NO";
queryFields[2] = "BLK_TLTBS_UPLOAD_MASTER_FINCNTR__EXT_CONTRACT_REF_NO";
pkFields[2] = "BLK_TLTBS_UPLOAD_MASTER_FINCNTR__EXT_CONTRACT_REF_NO";
queryFields[3] = "BLK_TLTBS_UPLOAD_MASTER_FINCNTR__SOURCE_CODE";
pkFields[3] = "BLK_TLTBS_UPLOAD_MASTER_FINCNTR__SOURCE_CODE";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_FIN_CENTRES":["APPLIED_FIN_CENTRE","EXT_CONTRACT_REF_NO","FIN_CENTRE","FIN_CENTRE_DESC","PRODUCT_CODE","VERSION_NO"]};
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
var lovInfoFlds = {"BLK_FIN_CENTRES__FIN_CENTRE__LOV_FINCENTRE":["BLK_FIN_CENTRES__FIN_CENTRE~BLK_FIN_CENTRES__FIN_CENTRE_DESC~","","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_FIN_CENTRES");
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

ArrFuncOrigin["TLCFINCN"]="KERNEL";
ArrPrntFunc["TLCFINCN"]="";
ArrPrntOrigin["TLCFINCN"]="";
ArrRoutingType["TLCFINCN"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["TLCFINCN"]="N";
ArrCustomModified["TLCFINCN"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_FINCENTER":"EXT_CONTRACT_REF_NO~VERSION_NO"};
var scrArgSource = {};
var scrArgVals = {"CVS_FINCENTER":"~"};
var scrArgDest = {"CVS_FINCENTER":"BLK_TLTBS_UPLOAD_MASTER_FINCNTR__EXT_CONTRACT_REF_NO~BLK_TLTBS_UPLOAD_MASTER_FINCNTR__VERSION_NO"};
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