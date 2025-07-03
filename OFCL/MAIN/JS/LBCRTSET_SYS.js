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
**  File Name          : LBCRTSET_SYS.js
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
var fieldNameArray = {"BLK_RATE_SETTING":"CONTRACT_REF_NO~COMPONENT~SPLIT_SERIAL_NO~SPLIT_NUMBER~EVENT_SEQ_NO~ROUNDING_RULE~ROUNDING_UNIT~TENOR~TXTPRD~TXTPRDDESC~TXTUSERREF~TXTCOUNTERPARTY~TXTCUSTNAME~TXTFACILITYNAME~TXTPRDTYPE~TXTROLLPRD~TXTPRINCIPALROLLAMT~TXTINTROLLAMT~TXTTOTALROLLAMT~TXTMATURITYDATE~TXTINTRATEFIXINGDATE~TXTDRIVERCONTRACT"};

var multipleEntryPageSize = {};

var multipleEntrySVBlocks = "";

var tabMEBlks = {};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_RATE_SETTING">CONTRACT_REF_NO~COMPONENT~SPLIT_SERIAL_NO~SPLIT_NUMBER~EVENT_SEQ_NO~ROUNDING_RULE~ROUNDING_UNIT~TENOR~TXTPRD~TXTPRDDESC~TXTUSERREF~TXTCOUNTERPARTY~TXTCUSTNAME~TXTFACILITYNAME~TXTPRDTYPE~TXTROLLPRD~TXTPRINCIPALROLLAMT~TXTINTROLLAMT~TXTTOTALROLLAMT~TXTMATURITYDATE~TXTINTRATEFIXINGDATE~TXTDRIVERCONTRACT</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_INT_SET";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_RATE_SETTING" : ""}; 

 var dataSrcLocationArray = new Array("BLK_RATE_SETTING"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LBCRTSET.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LBCRTSET.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_RATE_SETTING__CONTRACT_REF_NO";
pkFields[0] = "BLK_RATE_SETTING__CONTRACT_REF_NO";
queryFields[1] = "BLK_RATE_SETTING__COMPONENT";
pkFields[1] = "BLK_RATE_SETTING__COMPONENT";
queryFields[2] = "BLK_RATE_SETTING__SPLIT_SERIAL_NO";
pkFields[2] = "BLK_RATE_SETTING__SPLIT_SERIAL_NO";
queryFields[3] = "BLK_RATE_SETTING__SPLIT_NUMBER";
pkFields[3] = "BLK_RATE_SETTING__SPLIT_NUMBER";
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

ArrFuncOrigin["LBCRTSET"]="KERNEL";
ArrPrntFunc["LBCRTSET"]="";
ArrPrntOrigin["LBCRTSET"]="";
ArrRoutingType["LBCRTSET"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LBCRTSET"]="N";
ArrCustomModified["LBCRTSET"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_INT_SET":"CONTRACT_REF_NO~MATURITY_DATE~AMOUNT~SPLIT_NO~PRODUCT_CODE~INT_RATE_FIXING_DATE~EVENT_SEQ_NO~SPLIT_SERIAL_NO~TXTDRIVERCONTRACT~COMPONENT"};
var scrArgSource = {};
var scrArgVals = {"CVS_INT_SET":"~~~~~~~~~"};
var scrArgDest = {"CVS_INT_SET":"BLK_RATE_SETTING__CONTRACT_REF_NO~BLK_RATE_SETTING__TXTMATURITYDATE~BLK_RATE_SETTING__TXTTOTALROLLAMT~BLK_RATE_SETTING__SPLIT_NUMBER~BLK_RATE_SETTING__TXTROLLPRD~BLK_RATE_SETTING__TXTINTRATEFIXINGDATE~BLK_RATE_SETTING__EVENT_SEQ_NO~BLK_RATE_SETTING__SPLIT_SERIAL_NO~BLK_RATE_SETTING__TXTDRIVERCONTRACT~BLK_RATE_SETTING__COMPONENT"};
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