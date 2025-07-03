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
**  File Name          : OLDIFPTD_SYS.js
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
var fieldNameArray = {"BLK_PMNT_HDR":"LIMITDATE~REFNO~TOTPAID~VALDATE~NETAMTPAID~CCY~ESN~STATUS~STATUS_DESCRIPTION~IS_WORST_STATUS","BLK_PMNT_DETAIL":"REFNO~COMP~COMPTYPE~AMTDUE~AMTPAID~TAXPAID","BLK_TRAN":"ACROLE~ACBRN~ACCY~ACNO~AMTTAG~DRCRIND~LCYAMT~RELREF~REFNO~TXNINITDATE~EVENTSRNO"};

var multipleEntryPageSize = {"BLK_PMNT_DETAIL" :"15" ,"BLK_TRAN" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_PMNT_DETAIL","CVS_TRAN__TAB_MAIN":"BLK_TRAN"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_PMNT_HDR">LIMITDATE~REFNO~TOTPAID~VALDATE~NETAMTPAID~CCY~ESN~STATUS~STATUS_DESCRIPTION~IS_WORST_STATUS</FN>'; 
msgxml += '      <FN PARENT="BLK_PMNT_HDR" RELATION_TYPE="N" TYPE="BLK_PMNT_DETAIL">REFNO~COMP~COMPTYPE~AMTDUE~AMTPAID~TAXPAID</FN>'; 
msgxml += '      <FN PARENT="BLK_PMNT_HDR" RELATION_TYPE="N" TYPE="BLK_TRAN">ACROLE~ACBRN~ACCY~ACNO~AMTTAG~DRCRIND~LCYAMT~RELREF~REFNO~TXNINITDATE~EVENTSRNO</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_MAIN";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_PMNT_HDR" : "","BLK_PMNT_DETAIL" : "BLK_PMNT_HDR~N","BLK_TRAN" : "BLK_PMNT_HDR~N"}; 

 var dataSrcLocationArray = new Array("BLK_PMNT_HDR","BLK_PMNT_DETAIL","BLK_TRAN"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLDIFPTD.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLDIFPTD.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_PMNT_HDR__REFNO";
pkFields[0] = "BLK_PMNT_HDR__REFNO";
queryFields[1] = "BLK_PMNT_HDR__ESN";
pkFields[1] = "BLK_PMNT_HDR__ESN";
queryFields[2] = "BLK_PMNT_HDR__VALDATE";
pkFields[2] = "BLK_PMNT_HDR__VALDATE";
queryFields[3] = "BLK_PMNT_HDR__LIMITDATE";
pkFields[3] = "BLK_PMNT_HDR__LIMITDATE";
queryFields[4] = "BLK_PMNT_HDR__TOTPAID";
pkFields[4] = "BLK_PMNT_HDR__TOTPAID";
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
var multipleEntryIDs = new Array("BLK_PMNT_DETAIL","BLK_TRAN");
var multipleEntryArray = new Array();
var multipleEntryCells = new Array();
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY VIEW SINGLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR ATTACHED CALLFORMS *****
 //----------------------------------------------------------------------------------------------------------------------

 var CallFormArray= new Array("OLCONDET~BLK_PMNT_HDR"); 

 var CallFormRelat=new Array("OLVW_LIQ_SUMMARY.REFNO = OLTBS_CONTRACT__SETT.CONTRACT_REF_NO AND OLVW_LIQ_SUMMARY.ESN = OLTBS_CONTRACT__SETT.LATEST_EVENT_SEQ_NO"); 

 var CallRelatType= new Array("1"); 


 var ArrFuncOrigin=new Array();
 var ArrPrntFunc=new Array();
 var ArrPrntOrigin=new Array();
 var ArrRoutingType=new Array();


 // Code for Loading Cluster/Custom js File Starts
 var ArrClusterModified=new Array();
 var ArrCustomModified=new Array();
 // Code for Loading Cluster/Custom js File ends

ArrFuncOrigin["OLDIFPTD"]="KERNEL";
ArrPrntFunc["OLDIFPTD"]="";
ArrPrntOrigin["OLDIFPTD"]="";
ArrRoutingType["OLDIFPTD"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLDIFPTD"]="N";
ArrCustomModified["OLDIFPTD"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"OLCONDET":"CONREFNO~ESN"};
var scrArgSource = {"OLCONDET":"BLK_PMNT_HDR__REFNO~BLK_PMNT_HDR__ESN"};
var scrArgVals = {"OLCONDET":"~"};
var scrArgDest = {};
//***** CODE FOR SUB-SYSTEM DEPENDENT  FIELDS   *****
//----------------------------------------------------------------------------------------------------------------------
var dpndntOnFlds = {"OLCONDET":""};
var dpndntOnSrvs = {"OLCONDET":""};
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