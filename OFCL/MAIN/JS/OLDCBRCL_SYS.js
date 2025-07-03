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
**  File Name          : OLDCBRCL_SYS.js
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
var fieldNameArray = {"BLK_OLTMS_CLASS":"MOD~MODULEDESC~CLSCD~CLSCDDESC~CLSTYPE_MAS~RESTRICTION_TYPE~RESTRICTION_TYPE2~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH","BLK_OLTMS_BRN_RESTRICTIONS_CLASS":"MODULE~CLASSCODE~CCYALLOWED~BRNCHCODE~BRNCHDESC~BRNDISALLOW","BLK_OLTMS_CCY_RESTRICTIONS_CLASS":"MODULE~CLASS_CODE~BOUGHT_DEAL_CCY~SOLD_CCY~CCYCODE~DESC","BLK_OLTM_CCY_BALANCES_CLASS":"MODULE~CLASSCODE~CCYCODE~ATMCASHLIMIT~RESIDUALAMOUNT~NEGESIDUEAMOUNT~EMIROUNDUPTO~EMIROUNDUPDOWN~IRR_NUMERDCOUNTMETHOD~IRR_DENOMDCOUNTMETHOD~CCYDESC~ROUNDING"};

var multipleEntryPageSize = {"BLK_OLTMS_BRN_RESTRICTIONS_CLASS" :"15" ,"BLK_OLTMS_CCY_RESTRICTIONS_CLASS" :"15" ,"BLK_OLTM_CCY_BALANCES_CLASS" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_OLTMS_BRN_RESTRICTIONS_CLASS~BLK_OLTMS_CCY_RESTRICTIONS_CLASS~BLK_OLTM_CCY_BALANCES_CLASS"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTMS_CLASS">MOD~MODULEDESC~CLSCD~CLSCDDESC~CLSTYPE_MAS~RESTRICTION_TYPE~RESTRICTION_TYPE2~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTMS_CLASS" RELATION_TYPE="N" TYPE="BLK_OLTMS_BRN_RESTRICTIONS_CLASS">MODULE~CLASSCODE~CCYALLOWED~BRNCHCODE~BRNCHDESC~BRNDISALLOW</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTMS_CLASS" RELATION_TYPE="N" TYPE="BLK_OLTMS_CCY_RESTRICTIONS_CLASS">MODULE~CLASS_CODE~BOUGHT_DEAL_CCY~SOLD_CCY~CCYCODE~DESC</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTMS_CLASS" RELATION_TYPE="N" TYPE="BLK_OLTM_CCY_BALANCES_CLASS">MODULE~CLASSCODE~CCYCODE~ATMCASHLIMIT~RESIDUALAMOUNT~NEGESIDUEAMOUNT~EMIROUNDUPTO~EMIROUNDUPDOWN~IRR_NUMERDCOUNTMETHOD~IRR_DENOMDCOUNTMETHOD~CCYDESC~ROUNDING</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTMS_CLASS">AUTHSTAT~TXNSTAT~MOD~CLSCD</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "OLDCBRCL";
var defaultWhereClause = "CLASS_TYPE='CB'";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_OLTMS_CLASS";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_OLTMS_CLASS" : "","BLK_OLTMS_BRN_RESTRICTIONS_CLASS" : "BLK_OLTMS_CLASS~N","BLK_OLTMS_CCY_RESTRICTIONS_CLASS" : "BLK_OLTMS_CLASS~N","BLK_OLTM_CCY_BALANCES_CLASS" : "BLK_OLTMS_CLASS~N"}; 

 var dataSrcLocationArray = new Array("BLK_OLTMS_CLASS","BLK_OLTMS_BRN_RESTRICTIONS_CLASS","BLK_OLTMS_CCY_RESTRICTIONS_CLASS","BLK_OLTM_CCY_BALANCES_CLASS"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLDCBRCL.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLDCBRCL.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_OLTMS_CLASS__MOD";
pkFields[0] = "BLK_OLTMS_CLASS__MOD";
queryFields[1] = "BLK_OLTMS_CLASS__CLSCD";
pkFields[1] = "BLK_OLTMS_CLASS__CLSCD";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_OLTMS_BRN_RESTRICTIONS_CLASS":["BRNCHCODE","BRNCHDESC","BRNDISALLOW","CCYALLOWED"],"BLK_OLTMS_CCY_RESTRICTIONS_CLASS":["BOUGHT_DEAL_CCY","CCYCODE","CURRENCYREST","DESC","SOLD_CCY"],"BLK_OLTM_CCY_BALANCES_CLASS":["ATMCASHLIMIT","CCYCODE","CCYDESC","EMIROUNDUPDOWN","EMIROUNDUPTO","IRR_DENOMDCOUNTMETHOD","IRR_NUMERDCOUNTMETHOD","NEGESIDUEAMOUNT","RESIDUALAMOUNT","ROUNDING"]};
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
var lovInfoFlds = {"BLK_OLTMS_CLASS__MOD__LOV_MODULE":["BLK_OLTMS_CLASS__MOD~BLK_OLTMS_CLASS__MODULEDESC~BLK_OLTMS_CLASS__CLSCD~BLK_OLTMS_CLASS__CLSCDDESC~BLK_OLTMS_CLASS__RESTRICTION_TYPE~BLK_OLTMS_CLASS__RESTRICTION_TYPE2~","","N~N~N~N~N~N",""],"BLK_OLTMS_CLASS__CLSCD__LOV_CLASSCODE":["BLK_OLTMS_CLASS__CLSCD~BLK_OLTMS_CLASS__CLSCDDESC~BLK_OLTMS_CLASS__RESTRICTION_TYPE~BLK_OLTMS_CLASS__RESTRICTION_TYPE2~","BLK_OLTMS_CLASS__MOD!VARCHAR2","N~N~N~N",""],"BLK_OLTMS_BRN_RESTRICTIONS_CLASS__BRNCHCODE__LOV_BRANCH":["BLK_OLTMS_BRN_RESTRICTIONS_CLASS__BRNCHCODE~BLK_OLTMS_BRN_RESTRICTIONS_CLASS__BRNCHDESC~","","N~N","N"],"BLK_OLTMS_BRN_RESTRICTIONS_CLASS__BRNDISALLOW__LOV_BRANCH":["BLK_OLTMS_BRN_RESTRICTIONS_CLASS__BRNDISALLOW~BLK_OLTMS_BRN_RESTRICTIONS_CLASS__BRNCHDESC~","","N~N",""],"BLK_OLTMS_CCY_RESTRICTIONS_CLASS__BOUGHT_DEAL_CCY__LOV_CURRENCY":["BLK_OLTMS_CCY_RESTRICTIONS_CLASS__BOUGHT_DEAL_CCY~BLK_OLTMS_CCY_RESTRICTIONS_CLASS__DESC~","","N~N",""],"BLK_OLTMS_CCY_RESTRICTIONS_CLASS__CCYCODE__LOV_CURRENCY":["BLK_OLTMS_CCY_RESTRICTIONS_CLASS__CCYCODE~BLK_OLTMS_CCY_RESTRICTIONS_CLASS__DESC~","","N~N","N"],"BLK_OLTM_CCY_BALANCES_CLASS__CCYCODE__LOV_BALCCY":["BLK_OLTM_CCY_BALANCES_CLASS__CCYCODE~BLK_OLTM_CCY_BALANCES_CLASS__CCYDESC~","","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_OLTMS_BRN_RESTRICTIONS_CLASS","BLK_OLTMS_CCY_RESTRICTIONS_CLASS","BLK_OLTM_CCY_BALANCES_CLASS");
var multipleEntryArray = new Array();
var multipleEntryCells = new Array();
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY VIEW SINGLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR ATTACHED CALLFORMS *****
 //----------------------------------------------------------------------------------------------------------------------

 var CallFormArray= new Array("CSCFNUDF~BLK_OLTMS_CLASS"); 

 var CallFormRelat=new Array(""); 

 var CallRelatType= new Array("1"); 


 var ArrFuncOrigin=new Array();
 var ArrPrntFunc=new Array();
 var ArrPrntOrigin=new Array();
 var ArrRoutingType=new Array();


 // Code for Loading Cluster/Custom js File Starts
 var ArrClusterModified=new Array();
 var ArrCustomModified=new Array();
 // Code for Loading Cluster/Custom js File ends

ArrFuncOrigin["OLDCBRCL"]="KERNEL";
ArrPrntFunc["OLDCBRCL"]="";
ArrPrntOrigin["OLDCBRCL"]="";
ArrRoutingType["OLDCBRCL"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLDCBRCL"]="N";
ArrCustomModified["OLDCBRCL"]="N";

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