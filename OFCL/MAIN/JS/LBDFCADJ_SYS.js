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
**  File Name          : LBDFCADJ_SYS.js
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
var criteriaSearch  = 'N';
//----------------------------------------------------------------------------------------------------------------------
//***** FCJ XML FOR THE SCREEN *****
//----------------------------------------------------------------------------------------------------------------------
var fieldNameArray = {"BLK_FLRCLG_ADJ_SUMMARY":"FACILITYNAME~EVENTCODE~NEWRATEEFFECTFLRCLG~MARGINRATE~MARGINAFTRFLRCLGPROP~EVENTSEQ_NO~PROPSTATUS~PROPMODE~EXTERNALCUSIPNO~TOTALADJRATE~EFFECTIVEDATE~CONTRACTREFNO~USERINPUTRATE~ADJUSTEDRATEONALLINRATE~ALLINRATE~ADJUSTEDRATE~TRANCHEREFNO~ADJMARGINCOMP"};

var multipleEntryPageSize = {};

var multipleEntrySVBlocks = "";

 var tabMEBlks = {};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_FLRCLG_ADJ_SUMMARY">FACILITYNAME~EVENTCODE~NEWRATEEFFECTFLRCLG~MARGINRATE~MARGINAFTRFLRCLGPROP~EVENTSEQ_NO~PROPSTATUS~PROPMODE~EXTERNALCUSIPNO~TOTALADJRATE~EFFECTIVEDATE~CONTRACTREFNO~USERINPUTRATE~ADJUSTEDRATEONALLINRATE~ALLINRATE~ADJUSTEDRATE~TRANCHEREFNO~ADJMARGINCOMP</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_SUMMARY";
var qryReqd = "N";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** FCJ XML FOR SUMMARY SCREEN *****
//----------------------------------------------------------------------------------------------------------------------
var msgxml_sum=""; 
msgxml_sum += '    <FLD>'; 
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_FLRCLG_ADJ_SUMMARY">CONTRACTREFNO~TRANCHEREFNO~FACILITYNAME~EXTERNALCUSIPNO~EVENTSEQ_NO~EVENTCODE~EFFECTIVEDATE~PROPMODE~PROPSTATUS~ADJMARGINCOMP~USERINPUTRATE~MARGINAFTRFLRCLGPROP~ADJUSTEDRATE~ALLINRATE~NEWRATEEFFECTFLRCLG~MARGINRATE~ADJUSTEDRATEONALLINRATE~TOTALADJRATE</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "LBDFCADJ";
var defaultWhereClause = "";
var defaultOrderByClause ="contract_ref_no,event_seq_no";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_FLRCLG_ADJ_SUMMARY";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_FLRCLG_ADJ_SUMMARY" : ""}; 

 var dataSrcLocationArray = new Array("BLK_FLRCLG_ADJ_SUMMARY"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = false ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LBDFCADJ.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LBDFCADJ.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_FLRCLG_ADJ_SUMMARY__CONTRACTREFNO";
pkFields[0] = "BLK_FLRCLG_ADJ_SUMMARY__CONTRACTREFNO";
queryFields[1] = "BLK_FLRCLG_ADJ_SUMMARY__EVENTSEQ_NO";
pkFields[1] = "BLK_FLRCLG_ADJ_SUMMARY__EVENTSEQ_NO";
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

ArrFuncOrigin["LBDFCADJ"]="KERNEL";
ArrPrntFunc["LBDFCADJ"]="";
ArrPrntOrigin["LBDFCADJ"]="";
ArrRoutingType["LBDFCADJ"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LBDFCADJ"]="N";
ArrCustomModified["LBDFCADJ"]="N";

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