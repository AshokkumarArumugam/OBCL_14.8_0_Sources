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
**  File Name          : LBCCYRST_SYS.js
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
var fieldNameArray = {"BLK_OLTBS_CONTRACT_CCYR":"CONTRACTREFNO~TXTPRODUCT~TXTPRODUCTDESC~TXTUSERREFNO~TXTCUSTOMER~TXTCUSTOMERNAME~TXTFACILITYN~LATESTVERSIONNO~CONTRACTCCY~TXTLCFRONTING~TXTGLOBALLCSUBLIMIT~TXTPARTICIPANTS","BLK_CCY_RESTR_MASTER":"CONREFNO~VALDATE~CURRCY~VERSNO~LIMITTYPE~TXTCCYDESC","BLK_CCY_RESTR_DETAIL":"CONTRAREFNO~VERNO~LCISSUE~CURR~LIMIAMT~PARTICIPANT~LIMITYPE~VALDATE~TXTPARTNAME~TXTTRCCY~SLPERCENT"};

var multipleEntryPageSize = {"BLK_CCY_RESTR_MASTER" :"15" ,"BLK_CCY_RESTR_DETAIL" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_CCYRST__TAB_MAIN":"BLK_CCY_RESTR_MASTER~BLK_CCY_RESTR_DETAIL"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTBS_CONTRACT_CCYR">CONTRACTREFNO~TXTPRODUCT~TXTPRODUCTDESC~TXTUSERREFNO~TXTCUSTOMER~TXTCUSTOMERNAME~TXTFACILITYN~LATESTVERSIONNO~CONTRACTCCY~TXTLCFRONTING~TXTGLOBALLCSUBLIMIT~TXTPARTICIPANTS</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_CONTRACT_CCYR" RELATION_TYPE="N" TYPE="BLK_CCY_RESTR_MASTER">CONREFNO~VALDATE~CURRCY~VERSNO~LIMITTYPE~TXTCCYDESC</FN>'; 
msgxml += '      <FN PARENT="BLK_CCY_RESTR_MASTER" RELATION_TYPE="N" TYPE="BLK_CCY_RESTR_DETAIL">CONTRAREFNO~VERNO~LCISSUE~CURR~LIMIAMT~PARTICIPANT~LIMITYPE~VALDATE~TXTPARTNAME~TXTTRCCY~SLPERCENT</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_CCYRST";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_OLTBS_CONTRACT_CCYR" : "","BLK_CCY_RESTR_MASTER" : "BLK_OLTBS_CONTRACT_CCYR~N","BLK_CCY_RESTR_DETAIL" : "BLK_CCY_RESTR_MASTER~N"}; 

 var dataSrcLocationArray = new Array("BLK_OLTBS_CONTRACT_CCYR","BLK_CCY_RESTR_MASTER","BLK_CCY_RESTR_DETAIL"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LBCCYRST.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LBCCYRST.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_OLTBS_CONTRACT_CCYR__CONTRACTREFNO";
pkFields[0] = "BLK_OLTBS_CONTRACT_CCYR__CONTRACTREFNO";
queryFields[1] = "BLK_OLTBS_CONTRACT_CCYR__LATESTVERSIONNO";
pkFields[1] = "BLK_OLTBS_CONTRACT_CCYR__LATESTVERSIONNO";
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
var lovInfoFlds = {"BLK_CCY_RESTR_MASTER__CURRCY__LOV_CURRENCY":["BLK_CCY_RESTR_MASTER__CURRCY~BLK_CCY_RESTR_MASTER__TXTCCYDESC~","BLK_CCY_RESTR_MASTER__LIMITTYPE!VARCHAR2~BLK_CCY_RESTR_MASTER__LIMITTYPE!VARCHAR2","N~N",""],"BLK_CCY_RESTR_DETAIL__PARTICIPANT__LOV_PARTICIPANT":["BLK_CCY_RESTR_DETAIL__PARTICIPANT~BLK_CCY_RESTR_DETAIL__TXTPARTNAME~","BLK_OLTBS_CONTRACT_CCYR__TXTPARTICIPANTS!VARCHAR2~BLK_OLTBS_CONTRACT_CCYR__TXTPARTICIPANTS!VARCHAR2","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_CCY_RESTR_MASTER","BLK_CCY_RESTR_DETAIL");
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

ArrFuncOrigin["LBCCYRST"]="KERNEL";
ArrPrntFunc["LBCCYRST"]="";
ArrPrntOrigin["LBCCYRST"]="";
ArrRoutingType["LBCCYRST"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LBCCYRST"]="N";
ArrCustomModified["LBCCYRST"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_CCYRST":"CONTRACTREFNO~LATESTVERSIONNO~CONTRACTCCY"};
var scrArgSource = {};
var scrArgVals = {"CVS_CCYRST":"~~"};
var scrArgDest = {"CVS_CCYRST":"BLK_OLTBS_CONTRACT_CCYR__CONTRACTREFNO~BLK_OLTBS_CONTRACT_CCYR__LATESTVERSIONNO~BLK_OLTBS_CONTRACT_CCYR__CONTRACTCCY"};
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