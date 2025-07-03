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
**  File Name          : OLCACRCL_SYS.js
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
var fieldNameArray = {"BLK_PRODUCT_DISCOUNT_ACCRUAL":"PRDCD~PRDDESC~CLASCD~CLASTYP~PRD~CLASDESC","BLK_DISC_ACCR_DETAILS":"PRDCD~DISCACCRREQD~ACCRFREQ~PREPAYTBDTREAT~ACQTYP","BLK_CCY_PREFERENCES":"PRDCD~CCYCODE~CCYNAME~NUMDCNTMET~DENOMDCNTMET"};

var multipleEntryPageSize = {"BLK_CCY_PREFERENCES" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__All":"BLK_CCY_PREFERENCES"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_PRODUCT_DISCOUNT_ACCRUAL">PRDCD~PRDDESC~CLASCD~CLASTYP~PRD~CLASDESC</FN>'; 
msgxml += '      <FN PARENT="BLK_PRODUCT_DISCOUNT_ACCRUAL" RELATION_TYPE="1" TYPE="BLK_DISC_ACCR_DETAILS">PRDCD~DISCACCRREQD~ACCRFREQ~PREPAYTBDTREAT~ACQTYP</FN>'; 
msgxml += '      <FN PARENT="BLK_PRODUCT_DISCOUNT_ACCRUAL" RELATION_TYPE="N" TYPE="BLK_CCY_PREFERENCES">PRDCD~CCYCODE~CCYNAME~NUMDCNTMET~DENOMDCNTMET</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_MAIN";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_PRODUCT_DISCOUNT_ACCRUAL" : "","BLK_DISC_ACCR_DETAILS" : "BLK_PRODUCT_DISCOUNT_ACCRUAL~1","BLK_CCY_PREFERENCES" : "BLK_PRODUCT_DISCOUNT_ACCRUAL~N"}; 

 var dataSrcLocationArray = new Array("BLK_PRODUCT_DISCOUNT_ACCRUAL","BLK_DISC_ACCR_DETAILS","BLK_CCY_PREFERENCES"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLCACRCL.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLCACRCL.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_PRODUCT_DISCOUNT_ACCRUAL__PRDCD";
pkFields[0] = "BLK_PRODUCT_DISCOUNT_ACCRUAL__PRDCD";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_CCY_PREFERENCES":["CCYCODE","CCYNAME","DENOMDCNTMET","NUMDCNTMET","PRDCD"],"BLK_DISC_ACCR_DETAILS":["ACCRFREQ","ACQTYP","DISCACCRREQD","PRDCD","PREPAYTBDTREAT"],"BLK_PRODUCT_DISCOUNT_ACCRUAL":["CLASCD","CLASDESC","CLASTYP","PRD","PRDCD","PRDDESC"]};
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
var lovInfoFlds = {"BLK_PRODUCT_DISCOUNT_ACCRUAL__CLASCD__LOV_CLASS_CODE":["BLK_PRODUCT_DISCOUNT_ACCRUAL__CLASCD~BLK_PRODUCT_DISCOUNT_ACCRUAL__CLASDESC~","","N~N",""],"BLK_CCY_PREFERENCES__CCYCODE__LOV_CCY":["BLK_CCY_PREFERENCES__CCYCODE~BLK_CCY_PREFERENCES__CCYNAME~","","N~N",""]};
var offlineLovInfoFlds = {};
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR TABS *****
//----------------------------------------------------------------------------------------------------------------------
var strHeaderTabId = 'TAB_HEADER';
var strFooterTabId = 'TAB_FOOTER';
var strCurrentTabId = 'All';
//--------------------------------------------
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------
var multipleEntryIDs = new Array("BLK_CCY_PREFERENCES");
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

ArrFuncOrigin["OLCACRCL"]="KERNEL";
ArrPrntFunc["OLCACRCL"]="";
ArrPrntOrigin["OLCACRCL"]="";
ArrRoutingType["OLCACRCL"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLCACRCL"]="N";
ArrCustomModified["OLCACRCL"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_MAIN":"PRDCD~PRDDESC~PRD"};
var scrArgSource = {};
var scrArgVals = {"CVS_MAIN":"~~"};
var scrArgDest = {"CVS_MAIN":"BLK_PRODUCT_DISCOUNT_ACCRUAL__PRDCD~BLK_PRODUCT_DISCOUNT_ACCRUAL__PRDDESC~BLK_PRODUCT_DISCOUNT_ACCRUAL__PRD"};
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
var actStageArry = {"QUERY":"2","NEW":"2","MODIFY":"2","AUTHORIZE":"1","DELETE":"1","CLOSE":"1","REOPEN":"1","REVERSE":"1","ROLLOVER":"1","CONFIRM":"1","LIQUIDATE":"1","SUMMARYQUERY":"1"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------