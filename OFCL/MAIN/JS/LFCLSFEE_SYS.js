/***************************************************************************************************************************
**  This source is part of the Oracle Banking Software Product. 
**  Copyright (c) 2008 ,2025, Oracle and/or its affiliates.
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
**  File Name          : LFCLSFEE_SYS.js
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
var fieldNameArray = {"BLK_PRODUCT_FEE":"PROD~PRODDESC~MODU~PRODTYPE~CLASTYPE~CLASCODE~CLASSDESC","BLK_FEE_DETAILS":"PRD~COMPNT~COMPNTDESC~BASISAMOUNT~BASISAMOUNTDESC~FEETYPE~FRULE~RULEDESC~ACCRUALREQD~ACCRUALMETD~ACCRUALFREQCY~ACCRFREQUNIT~ALLOWSTARTDATE~ALLOWENDDATE~ALLOWRULEAMEND~STOPASSOCIAN~PARTYPROPAGATION~FEEMODE~AUTOLIQDDAY~BILLNOTICEREQD~BILLDAYS~ALLOWAMNTAMEND~LIQDPREF~AGECYFEE~INTRSTBASIS~FASFEE~PARTYDRIVENFEE~APLYREPRICE~DISCACCRAPPLN~PAYMNTTYPE~PAYMNTDESC~BPSRATEAPPLN~FEE_PERIOD_BASIS~EXPENSEFEE~CALC_AMT_FOR_SCH~PYMNT_DELAY~IMMD_BD_FEE_ADJ~BORROWER_STAND_BY_FEE~PARTICIPANT_STAND_BY_FEE~ECA_CHK_REQD"};

var multipleEntryPageSize = {};

var multipleEntrySVBlocks = "BLK_FEE_DETAILS";

var tabMEBlks = {};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_PRODUCT_FEE">PROD~PRODDESC~MODU~PRODTYPE~CLASTYPE~CLASCODE~CLASSDESC</FN>'; 
msgxml += '      <FN PARENT="BLK_PRODUCT_FEE" RELATION_TYPE="N" TYPE="BLK_FEE_DETAILS">PRD~COMPNT~COMPNTDESC~BASISAMOUNT~BASISAMOUNTDESC~FEETYPE~FRULE~RULEDESC~ACCRUALREQD~ACCRUALMETD~ACCRUALFREQCY~ACCRFREQUNIT~ALLOWSTARTDATE~ALLOWENDDATE~ALLOWRULEAMEND~STOPASSOCIAN~PARTYPROPAGATION~FEEMODE~AUTOLIQDDAY~BILLNOTICEREQD~BILLDAYS~ALLOWAMNTAMEND~LIQDPREF~AGECYFEE~INTRSTBASIS~FASFEE~PARTYDRIVENFEE~APLYREPRICE~DISCACCRAPPLN~PAYMNTTYPE~PAYMNTDESC~BPSRATEAPPLN~FEE_PERIOD_BASIS~EXPENSEFEE~CALC_AMT_FOR_SCH~PYMNT_DELAY~IMMD_BD_FEE_ADJ~BORROWER_STAND_BY_FEE~PARTICIPANT_STAND_BY_FEE~ECA_CHK_REQD</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_MAIN";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_PRODUCT_FEE" : "","BLK_FEE_DETAILS" : "BLK_PRODUCT_FEE~N"}; 

 var dataSrcLocationArray = new Array("BLK_PRODUCT_FEE","BLK_FEE_DETAILS"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LFCLSFEE.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LFCLSFEE.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_PRODUCT_FEE__PROD";
pkFields[0] = "BLK_PRODUCT_FEE__PROD";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_FEE_DETAILS":["ACCRFREQUNIT","ACCRUALFREQCY","ACCRUALMETD","ACCRUALREQD","AGECYFEE","ALLOWAMNTAMEND","ALLOWENDDATE","ALLOWRULEAMEND","ALLOWSTARTDATE","APLYREPRICE","AUTOLIQDDAY","BASISAMOUNT","BASISAMOUNTDESC","BILLDAYS","BILLNOTICEREQD","BORROWER_STAND_BY_FEE","BPSRATEAPPLN","DISCACCRAPPLN","ECA_CHK_REQD","EXPENSEFEE","FASFEE","FEEMODE","FEETYPE","FEE_PERIOD_BASIS","FRULE","INTRSTBASIS","LIQDPREF","PARTICIPANT_STAND_BY_FEE","PARTYDRIVENFEE","PARTYPROPAGATION","PAYMNTDESC","PAYMNTTYPE","PYMNT_DELAY","RULEDESC","STOPASSOCIAN"]};
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
var lovInfoFlds = {"BLK_PRODUCT_FEE__CLASCODE__LOV_FEE_CLASS":["BLK_PRODUCT_FEE__CLASCODE~BLK_PRODUCT_FEE__CLASSDESC~","BLK_PRODUCT_FEE__MODU!VARCHAR2","N~N",""],"BLK_FEE_DETAILS__COMPNT__LOV_FEE_CLASS":["BLK_FEE_DETAILS__COMPNT~","BLK_PRODUCT_FEE__MODU!VARCHAR2","N~N",""],"BLK_FEE_DETAILS__BASISAMOUNT__LOV_AMT_TAG":["BLK_FEE_DETAILS__BASISAMOUNT~BLK_FEE_DETAILS__BASISAMOUNTDESC~","BLK_PRODUCT_FEE__MODU!","N~N",""],"BLK_FEE_DETAILS__FRULE__LOV_FEE_COMP":["BLK_FEE_DETAILS__FRULE~BLK_FEE_DETAILS__RULEDESC~","BLK_FEE_DETAILS__FEETYPE!VARCHAR2","N~N",""],"BLK_FEE_DETAILS__PAYMNTTYPE__LOV_PAY_TYPE":["BLK_FEE_DETAILS__PAYMNTTYPE~BLK_FEE_DETAILS__PAYMNTDESC~","","N~N",""]};
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

ArrFuncOrigin["LFCLSFEE"]="KERNEL";
ArrPrntFunc["LFCLSFEE"]="";
ArrPrntOrigin["LFCLSFEE"]="";
ArrRoutingType["LFCLSFEE"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LFCLSFEE"]="N";
ArrCustomModified["LFCLSFEE"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_MAIN":"PROD~PRODDESC~MODU~PRODTYPE"};
var scrArgSource = {};
var scrArgVals = {"CVS_MAIN":"~~~"};
var scrArgDest = {"CVS_MAIN":"BLK_PRODUCT_FEE__PROD~BLK_PRODUCT_FEE__PRODDESC~BLK_PRODUCT_FEE__MODU~BLK_PRODUCT_FEE__PRODTYPE"};
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