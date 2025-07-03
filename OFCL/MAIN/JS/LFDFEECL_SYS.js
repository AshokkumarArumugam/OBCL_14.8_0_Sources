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
**  File Name          : LFDFEECL_SYS.js
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
var fieldNameArray = {"BLK_FEE_DETAILS":"BASISAMOUNT~RULETYPE~FRULE~ACCRUALREQD~ACCRUALMETD~ALLOWSTARTDATE~ALLOWENDDATE~ALLOWRULEAMEND~PARTICIPANT~FEEMODE~BILLNOTICEREQD~ALLOWAMNTAMEND~LIQDPREF~AGENYFEE~FASFEE~PARTYDRIVENFEE~PAYMNTFEE~BPSRATEAPPLN~AMOUNTDESC~FEEDESC~MODU~CLASCODE~CLASSDESC~MODULEDESC~EXPENSEFEE~CALC_AMT_FOR_SCH~PYMT_DELAY~IMMD_BD_FEE_ADJ~BORROWER_STAND_BY_FEE~PARTICIPANT_STAND_BY_FEE~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH"};

var multipleEntryPageSize = {};

var multipleEntrySVBlocks = "";

var tabMEBlks = {};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_FEE_DETAILS">BASISAMOUNT~RULETYPE~FRULE~ACCRUALREQD~ACCRUALMETD~ALLOWSTARTDATE~ALLOWENDDATE~ALLOWRULEAMEND~PARTICIPANT~FEEMODE~BILLNOTICEREQD~ALLOWAMNTAMEND~LIQDPREF~AGENYFEE~FASFEE~PARTYDRIVENFEE~PAYMNTFEE~BPSRATEAPPLN~AMOUNTDESC~FEEDESC~MODU~CLASCODE~CLASSDESC~MODULEDESC~EXPENSEFEE~CALC_AMT_FOR_SCH~PYMT_DELAY~IMMD_BD_FEE_ADJ~BORROWER_STAND_BY_FEE~PARTICIPANT_STAND_BY_FEE~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_FEE_DETAILS">AUTHSTAT~TXNSTAT~CLASCODE~MODU</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "LFDFEECL";
var defaultWhereClause = "CLASS_TYPE = 'FE'";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_FEE_DETAILS";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_FEE_DETAILS" : ""}; 

 var dataSrcLocationArray = new Array("BLK_FEE_DETAILS"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LFDFEECL.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LFDFEECL.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_FEE_DETAILS__CLASCODE";
pkFields[0] = "BLK_FEE_DETAILS__CLASCODE";
queryFields[1] = "BLK_FEE_DETAILS__MODU";
pkFields[1] = "BLK_FEE_DETAILS__MODU";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_FEE_DETAILS":["ACCRUALMETD","ACCRUALREQD","AGENYFEE","ALLOWAMNTAMEND","ALLOWENDDATE","ALLOWRULEAMEND","ALLOWSTARTDATE","AMOUNTDESC","BASISAMOUNT","BILLNOTICEREQD","BORROWER_STAND_BY_FEE","BPSRATEAPPLN","CALC_AMT_FOR_SCH","CLASSDESC","EXPENSEFEE","FASFEE","FEEDESC","FEEMODE","FRULE","IMMD_BD_FEE_ADJ","LIQDPREF","PARTICIPANT","PARTICIPANT_STAND_BY_FEE","PARTYDRIVENFEE","PAYMNTFEE","PYMT_DELAY","RULETYPE"]};
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
var lovInfoFlds = {"BLK_FEE_DETAILS__BASISAMOUNT__LOV_AMOUNTTAG":["BLK_FEE_DETAILS__BASISAMOUNT~BLK_FEE_DETAILS__AMOUNTDESC~","BLK_FEE_DETAILS__MODU!","N~N",""],"BLK_FEE_DETAILS__FRULE__LOV_FEE_RULE":["BLK_FEE_DETAILS__FRULE~BLK_FEE_DETAILS__FEEDESC~","BLK_FEE_DETAILS__RULETYPE!~BLK_FEE_DETAILS__RULETYPE!","N~N",""],"BLK_FEE_DETAILS__PAYMNTFEE__LOV_PAYMENTTYPE":["BLK_FEE_DETAILS__PAYMNTFEE~BLK_FEE_DETAILS__PAYDESC~","","N~N",""],"BLK_FEE_DETAILS__MODU__LOV_MODULE":["BLK_FEE_DETAILS__MODU~BLK_FEE_DETAILS__MODULEDESC~","","N~N",""]};
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

 var CallFormArray= new Array("CSCFNUDF~BLK_FEE_DETAILS"); 

 var CallFormRelat=new Array(""); 

 var CallRelatType= new Array("N"); 


 var ArrFuncOrigin=new Array();
 var ArrPrntFunc=new Array();
 var ArrPrntOrigin=new Array();
 var ArrRoutingType=new Array();


 // Code for Loading Cluster/Custom js File Starts
 var ArrClusterModified=new Array();
 var ArrCustomModified=new Array();
 // Code for Loading Cluster/Custom js File ends

ArrFuncOrigin["LFDFEECL"]="KERNEL";
ArrPrntFunc["LFDFEECL"]="";
ArrPrntOrigin["LFDFEECL"]="";
ArrRoutingType["LFDFEECL"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LFDFEECL"]="N";
ArrCustomModified["LFDFEECL"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CSCFNUDF":""};
var scrArgSource = {"CSCFNUDF":""};
var scrArgVals = {"CSCFNUDF":""};
var scrArgDest = {};
//***** CODE FOR SUB-SYSTEM DEPENDENT  FIELDS   *****
//----------------------------------------------------------------------------------------------------------------------
var dpndntOnFlds = {"CSCFNUDF":""};
var dpndntOnSrvs = {"CSCFNUDF":""};
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