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
**  File Name          : LBDTRFEE_SYS.js
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
var fieldNameArray = {"BLK_LBTBS_TRANSFER_FEE_MASTER":"CONTREFNO~ESN~VALDT~TXTCUSTNO~TXTCUSTNAME~TXTUSEREFNO~TXTFACILITYREFNO~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH","BLK_LBTBS_TRANSFER_FEE_DETAIL":"EVENTSEQNO~PARTICIPANT~FEECCY~FEEAMT~PAYMENTSTAT~CONTRACTREFNO~TXTPARTICIOANTNAME"};

var multipleEntryPageSize = {"BLK_LBTBS_TRANSFER_FEE_DETAIL" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_LBTBS_TRANSFER_FEE_DETAIL"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_LBTBS_TRANSFER_FEE_MASTER">CONTREFNO~ESN~VALDT~TXTCUSTNO~TXTCUSTNAME~TXTUSEREFNO~TXTFACILITYREFNO~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
msgxml += '      <FN PARENT="BLK_LBTBS_TRANSFER_FEE_MASTER" RELATION_TYPE="N" TYPE="BLK_LBTBS_TRANSFER_FEE_DETAIL">EVENTSEQNO~PARTICIPANT~FEECCY~FEEAMT~PAYMENTSTAT~CONTRACTREFNO~TXTPARTICIOANTNAME</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_MAIN";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** FCJ XML FOR SUMMARY SCREEN *****
//----------------------------------------------------------------------------------------------------------------------
var msgxml_sum=""; 
msgxml_sum += '    <FLD>'; 
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_LBTBS_TRANSFER_FEE_MASTER">AUTHSTAT~TXNSTAT~CONTREFNO~ESN~VALDT</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "LBDTRFEE";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_LBTBS_TRANSFER_FEE_MASTER";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_LBTBS_TRANSFER_FEE_MASTER" : "","BLK_LBTBS_TRANSFER_FEE_DETAIL" : "BLK_LBTBS_TRANSFER_FEE_MASTER~N"}; 

 var dataSrcLocationArray = new Array("BLK_LBTBS_TRANSFER_FEE_MASTER","BLK_LBTBS_TRANSFER_FEE_DETAIL"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LBDTRFEE.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LBDTRFEE.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_LBTBS_TRANSFER_FEE_MASTER__CONTREFNO";
pkFields[0] = "BLK_LBTBS_TRANSFER_FEE_MASTER__CONTREFNO";
queryFields[1] = "BLK_LBTBS_TRANSFER_FEE_MASTER__ESN";
pkFields[1] = "BLK_LBTBS_TRANSFER_FEE_MASTER__ESN";
queryFields[2] = "BLK_LBTBS_TRANSFER_FEE_MASTER__VALDT";
pkFields[2] = "BLK_LBTBS_TRANSFER_FEE_MASTER__VALDT";
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
var lovInfoFlds = {"BLK_LBTBS_TRANSFER_FEE_MASTER__CONTREFNO__LOV_TRANSFERS":["BLK_LBTBS_TRANSFER_FEE_MASTER__CONTREFNO~BLK_LBTBS_TRANSFER_FEE_MASTER__TXTUSEREFNO~BLK_LBTBS_TRANSFER_FEE_MASTER__VALDT~BLK_LBTBS_TRANSFER_FEE_MASTER__ESN~BLK_LBTBS_TRANSFER_FEE_MASTER__TXTCUSTNO~BLK_LBTBS_TRANSFER_FEE_MASTER__TXTCUSTNAME~","","N~N~N~N~N~N",""],"BLK_LBTBS_TRANSFER_FEE_DETAIL__FEECCY__LOV_CCY":["BLK_LBTBS_TRANSFER_FEE_DETAIL__FEECCY~","","N",""]};
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
var multipleEntryIDs = new Array("BLK_LBTBS_TRANSFER_FEE_DETAIL");
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

ArrFuncOrigin["LBDTRFEE"]="KERNEL";
ArrPrntFunc["LBDTRFEE"]="";
ArrPrntOrigin["LBDTRFEE"]="";
ArrRoutingType["LBDTRFEE"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LBDTRFEE"]="N";
ArrCustomModified["LBDTRFEE"]="N";

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
var actStageArry = {};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------