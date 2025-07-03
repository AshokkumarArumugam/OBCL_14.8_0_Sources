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
**  File Name          : LBDTXRFC_SYS.js
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
var fieldNameArray = {"BLK_INVESTOR_REFUND_MASTER":"CUSTOMERNO~REFUNDSTATUS~REVMAKERDTSTAMP~MODNO~REVCHECKERDTSTAMP~ONCEAUTH~REFUNDNO~REVMAKERID~CHECKERID~RECORDSTAT~REFUNDPERCENTAGE~AUTHSTAT~MAKERID~CHECKERDTSTAMP~REVCHECKERID~MAKERDTSTAMP~TXT_CUSTOMER","BLK_INVESTOR_REFUND_DETAIL":"CURRENCY~REFUNDAMOUNT~TAXAMOUNT~BORROWERCONTRACTREFNO~PARTICIPANTREFNO~REFUNDNO~CUSTOMERNO~EVENTSEQNO~APPLYREFUND~PROCSTATUS","BLK_INVESTOR_REFUND_COMP":"PARTICIPANTREFNO~BORROWERCONTRACTREFNO~BASISCOMPONENT~CUSTOMERNO~CURRENCY~REFUNDNO~TAXRULE~TAXAMOUNT","BLK_INVESTOR_REFUNC_SCH":"CUSTOMERNO~PARTICIPANTREFNO~CURRENCY~AMOUNTDUE~TAXRULE~TAXCOLLECTIONDATE~REFUNDNO~TAXDUEDATE~AMOUNTSETTLED~BORROWERCONTRACTREFNO"};

var multipleEntryPageSize = {"BLK_INVESTOR_REFUND_DETAIL" :"15" ,"BLK_INVESTOR_REFUND_COMP" :"15" ,"BLK_INVESTOR_REFUNC_SCH" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_LBDTXRFC__TAB_MAIN":"BLK_INVESTOR_REFUND_DETAIL~BLK_INVESTOR_REFUND_COMP~BLK_INVESTOR_REFUNC_SCH"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_INVESTOR_REFUND_MASTER">CUSTOMERNO~REFUNDSTATUS~REVMAKERDTSTAMP~MODNO~REVCHECKERDTSTAMP~ONCEAUTH~REFUNDNO~REVMAKERID~CHECKERID~RECORDSTAT~REFUNDPERCENTAGE~AUTHSTAT~MAKERID~CHECKERDTSTAMP~REVCHECKERID~MAKERDTSTAMP~TXT_CUSTOMER</FN>'; 
msgxml += '      <FN PARENT="BLK_INVESTOR_REFUND_MASTER" RELATION_TYPE="N" TYPE="BLK_INVESTOR_REFUND_DETAIL">CURRENCY~REFUNDAMOUNT~TAXAMOUNT~BORROWERCONTRACTREFNO~PARTICIPANTREFNO~REFUNDNO~CUSTOMERNO~EVENTSEQNO~APPLYREFUND~PROCSTATUS</FN>'; 
msgxml += '      <FN PARENT="BLK_INVESTOR_REFUND_DETAIL" RELATION_TYPE="N" TYPE="BLK_INVESTOR_REFUND_COMP">PARTICIPANTREFNO~BORROWERCONTRACTREFNO~BASISCOMPONENT~CUSTOMERNO~CURRENCY~REFUNDNO~TAXRULE~TAXAMOUNT</FN>'; 
msgxml += '      <FN PARENT="BLK_INVESTOR_REFUND_COMP" RELATION_TYPE="N" TYPE="BLK_INVESTOR_REFUNC_SCH">CUSTOMERNO~PARTICIPANTREFNO~CURRENCY~AMOUNTDUE~TAXRULE~TAXCOLLECTIONDATE~REFUNDNO~TAXDUEDATE~AMOUNTSETTLED~BORROWERCONTRACTREFNO</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_LBDTXRFC";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_INVESTOR_REFUND_MASTER" : "","BLK_INVESTOR_REFUND_DETAIL" : "BLK_INVESTOR_REFUND_MASTER~N","BLK_INVESTOR_REFUND_COMP" : "BLK_INVESTOR_REFUND_DETAIL~N","BLK_INVESTOR_REFUNC_SCH" : "BLK_INVESTOR_REFUND_COMP~N"}; 

 var dataSrcLocationArray = new Array("BLK_INVESTOR_REFUND_MASTER","BLK_INVESTOR_REFUND_DETAIL","BLK_INVESTOR_REFUND_COMP","BLK_INVESTOR_REFUNC_SCH"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LBDTXRFC.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LBDTXRFC.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_INVESTOR_REFUND_MASTER__REFUNDNO";
pkFields[0] = "BLK_INVESTOR_REFUND_MASTER__REFUNDNO";
queryFields[1] = "BLK_INVESTOR_REFUND_MASTER__CUSTOMERNO";
pkFields[1] = "BLK_INVESTOR_REFUND_MASTER__CUSTOMERNO";
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
var lovInfoFlds = {"BLK_INVESTOR_REFUND_MASTER__CUSTOMERNO__LOV_COUNTERPARTY":["BLK_INVESTOR_REFUND_MASTER__CUSTOMERNO~BLK_INVESTOR_REFUND_MASTER__TXT_CUSTOMER~","","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_INVESTOR_REFUND_DETAIL","BLK_INVESTOR_REFUND_COMP","BLK_INVESTOR_REFUNC_SCH");
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

ArrFuncOrigin["LBDTXRFC"]="KERNEL";
ArrPrntFunc["LBDTXRFC"]="";
ArrPrntOrigin["LBDTXRFC"]="";
ArrRoutingType["LBDTXRFC"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LBDTXRFC"]="N";
ArrCustomModified["LBDTXRFC"]="N";

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
var actStageArry = {"QUERY":"2","NEW":"2","MODIFY":"2","AUTHORIZE":"1","DELETE":"1","CLOSE":"1","REOPEN":"1","REVERSE":"1","ROLLOVER":"1","CONFIRM":"1","LIQUIDATE":"1","SUMMARYQUERY":"2"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------