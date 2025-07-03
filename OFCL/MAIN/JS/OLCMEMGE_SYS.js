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
**  File Name          : OLCMEMGE_SYS.js
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
var fieldNameArray = {"BLK_CONTRACT":"MODULECODE~LATEVNSEQNO~CONTRACTREFNO~PRDCN~PDCNCOUNT~USERREF_NO~COUNTERPARTY~CURRENCY~AMOUNT~CONTRACTREFNUM~PRDAIRYESNO~PRDAIRYSUBESNO~PRFFMTREFNO~PRRELEVENT"};

var multipleEntryPageSize = {};

var multipleEntrySVBlocks = "";

var tabMEBlks = {};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_CONTRACT">MODULECODE~LATEVNSEQNO~CONTRACTREFNO~PRDCN~PDCNCOUNT~USERREF_NO~COUNTERPARTY~CURRENCY~AMOUNT~CONTRACTREFNUM~PRDAIRYESNO~PRDAIRYSUBESNO~PRFFMTREFNO~PRRELEVENT</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_MAIN";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_CONTRACT" : ""}; 

 var dataSrcLocationArray = new Array("BLK_CONTRACT"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLCMEMGE.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLCMEMGE.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_CONTRACT__CONTRACTREFNO";
pkFields[0] = "BLK_CONTRACT__CONTRACTREFNO";
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

 var CallFormArray= new Array("OLCVWMSG~BLK_CONTRACT"); 

 var CallFormRelat=new Array("OLTBS_CONTRACT.CONTRACT_REF_NO=CSTBS_UI_COLUMNS.CHAR_FIELD1"); 

 var CallRelatType= new Array("1"); 


 var ArrFuncOrigin=new Array();
 var ArrPrntFunc=new Array();
 var ArrPrntOrigin=new Array();
 var ArrRoutingType=new Array();


 // Code for Loading Cluster/Custom js File Starts
 var ArrClusterModified=new Array();
 var ArrCustomModified=new Array();
 // Code for Loading Cluster/Custom js File ends

ArrFuncOrigin["OLCMEMGE"]="KERNEL";
ArrPrntFunc["OLCMEMGE"]="";
ArrPrntOrigin["OLCMEMGE"]="";
ArrRoutingType["OLCMEMGE"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLCMEMGE"]="N";
ArrCustomModified["OLCMEMGE"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_MAIN":"MODULECODE~CONTRACTREFNO~LATEVNSEQNO~PRDCN~PDCNCOUNT~PRDAIRYESNO~PRDAIRYSUBESNO~PRFFMTREFNO~PRRELEVENT","OLCVWMSG":"DCN~PRMTOTDCN~PRMMSGACC~PRMMSGTYPE~PRMARCHVAL~OUT~PRMPAGECNT"};
var scrArgSource = {"OLCVWMSG":"BLK_CONTRACT__PRDCN~BLK_CONTRACT__PDCNCOUNT~~~~~"};
var scrArgVals = {"CVS_MAIN":"~~~~~~~~","OLCVWMSG":"~~~~~~"};
var scrArgDest = {"CVS_MAIN":"BLK_CONTRACT__MODULECODE~BLK_CONTRACT__CONTRACTREFNO~BLK_CONTRACT__LATEVNSEQNO~BLK_CONTRACT__PRDCN~BLK_CONTRACT__PDCNCOUNT~BLK_CONTRACT__PRDAIRYESNO~BLK_CONTRACT__PRDAIRYSUBESNO~BLK_CONTRACT__PRFFMTREFNO~BLK_CONTRACT__PRRELEVENT"};
//***** CODE FOR SUB-SYSTEM DEPENDENT  FIELDS   *****
//----------------------------------------------------------------------------------------------------------------------
var dpndntOnFlds = {"OLCVWMSG":""};
var dpndntOnSrvs = {"OLCVWMSG":""};
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