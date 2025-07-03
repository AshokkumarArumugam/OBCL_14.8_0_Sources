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
**  File Name          : TLDPRMNT_SYS.js
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
var fieldNameArray = {"BLK_OLTM_PRODUCT":"PRODUCTSLOGAN~PRODUCTSTARTDATE~PRODUCTCODE~WAREHOUSECODE~CATEGORIESLIST~MODULE~FORMATNAME~PRODUCTDESCRIPTION~PRODUCTTYPE~CURRENCIESLIST~PRODUCTENDDATE~PRODUCTGROUP~PRODUCTREMARKS~MODULE_DESC~PROD_GRP_DESC~MODULE_DISPLAY~BRNLST~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH","BLK_TLTMS_PRODUCT_MASTER":"IGNOREHOLIDAYS~HFSTRANSFER~TRADEDATEACCT~ALLOW_AMENDEMENTNONACCRUAL~REKEYTRADEAMOUNT~REKEYCCY~CUSTOMERRESTRICTIONS~HOLIDAYCCY~REKEYCOUNTERPARTY~SETTLEMENTDAYS~INTERNALDEAL~FUNDINGMEMOREQD~DCFACCRUALREQD~APPLYCONTRACTHOLCCY~DCFACCRUALFREQ~REKEYMATURITYDATE~REKEYTRADEDATE~BROKERAGEAPPLICABLE~CONSIDERBRANCHHOLIDAY~REKEYTRADEPRICE~PRODUCT~PRODUCTTYPE~REKEYREQD~DCFSTARTMONTH~DCFSTARTDAY~APPLYLOCALHOLCCY~CCYRESTRICTIONS~BRANCHRESTRICTIONS~PROD_DESC~AMENDFEACRUALREQD~SUPRSTCKTSTTLMNT~LMALSPARTICIPATION~APPYFINCENTREHOLDY~ASSGN_FEE_REQUIRED","BLK_FEES":"PRODUCTCD~COMPONENT~COMPONENTDESCRIPTION~FEETYPE~DCFCATEGORY~FEECALCBASIS~FEEBASIS~STOPASSOCIATION~STATUSTRACKINGREQD","BLK_FEES_HEADER":"HOLIDAYCHECK~TXT_PROD~TXT_PROD_DESC~PRODUCT~CLASSCODE~CLASSTYPE","BLK_PROD_FINCENTRE":"FIN_CENTRE~FIN_CENTRE_DESC~PRODUCT_CODE~SCHEDULE_TYPE"};

var multipleEntryPageSize = {"BLK_PROD_FINCENTRE" :"15" };

var multipleEntrySVBlocks = "BLK_FEES";

var tabMEBlks = {"CVS_PRODUCT_PREFERENCE__TAB_MAIN":"BLK_PROD_FINCENTRE"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTM_PRODUCT">PRODUCTSLOGAN~PRODUCTSTARTDATE~PRODUCTCODE~WAREHOUSECODE~CATEGORIESLIST~MODULE~FORMATNAME~PRODUCTDESCRIPTION~PRODUCTTYPE~CURRENCIESLIST~PRODUCTENDDATE~PRODUCTGROUP~PRODUCTREMARKS~MODULE_DESC~PROD_GRP_DESC~MODULE_DISPLAY~BRNLST~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTM_PRODUCT" RELATION_TYPE="1" TYPE="BLK_TLTMS_PRODUCT_MASTER">IGNOREHOLIDAYS~HFSTRANSFER~TRADEDATEACCT~ALLOW_AMENDEMENTNONACCRUAL~REKEYTRADEAMOUNT~REKEYCCY~CUSTOMERRESTRICTIONS~HOLIDAYCCY~REKEYCOUNTERPARTY~SETTLEMENTDAYS~INTERNALDEAL~FUNDINGMEMOREQD~DCFACCRUALREQD~APPLYCONTRACTHOLCCY~DCFACCRUALFREQ~REKEYMATURITYDATE~REKEYTRADEDATE~BROKERAGEAPPLICABLE~CONSIDERBRANCHHOLIDAY~REKEYTRADEPRICE~PRODUCT~PRODUCTTYPE~REKEYREQD~DCFSTARTMONTH~DCFSTARTDAY~APPLYLOCALHOLCCY~CCYRESTRICTIONS~BRANCHRESTRICTIONS~PROD_DESC~AMENDFEACRUALREQD~SUPRSTCKTSTTLMNT~LMALSPARTICIPATION~APPYFINCENTREHOLDY~ASSGN_FEE_REQUIRED</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTM_PRODUCT" RELATION_TYPE="N" TYPE="BLK_FEES">PRODUCTCD~COMPONENT~COMPONENTDESCRIPTION~FEETYPE~DCFCATEGORY~FEECALCBASIS~FEEBASIS~STOPASSOCIATION~STATUSTRACKINGREQD</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTM_PRODUCT" RELATION_TYPE="1" TYPE="BLK_FEES_HEADER">HOLIDAYCHECK~TXT_PROD~TXT_PROD_DESC~PRODUCT~CLASSCODE~CLASSTYPE</FN>'; 
msgxml += '      <FN PARENT="BLK_TLTMS_PRODUCT_MASTER" RELATION_TYPE="N" TYPE="BLK_PROD_FINCENTRE">FIN_CENTRE~FIN_CENTRE_DESC~PRODUCT_CODE~SCHEDULE_TYPE</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_PRODUCT";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** FCJ XML FOR SUMMARY SCREEN *****
//----------------------------------------------------------------------------------------------------------------------
var msgxml_sum=""; 
msgxml_sum += '    <FLD>'; 
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTM_PRODUCT">AUTHSTAT~TXNSTAT~PRODUCTCODE~PRODUCTDESCRIPTION~PRODUCTGROUP~PRODUCTSLOGAN~PRODUCTSTARTDATE~PRODUCTENDDATE~PRODUCTTYPE</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "TLDPRMNT";
var defaultWhereClause = "module = 'TL'";
var defaultOrderByClause ="";
var multiBrnWhereClause ="module = 'TL'";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_OLTM_PRODUCT";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_OLTM_PRODUCT" : "","BLK_TLTMS_PRODUCT_MASTER" : "BLK_OLTM_PRODUCT~1","BLK_FEES" : "BLK_OLTM_PRODUCT~N","BLK_FEES_HEADER" : "BLK_OLTM_PRODUCT~1","BLK_PROD_FINCENTRE" : "BLK_TLTMS_PRODUCT_MASTER~N"}; 

 var dataSrcLocationArray = new Array("BLK_OLTM_PRODUCT","BLK_TLTMS_PRODUCT_MASTER","BLK_FEES","BLK_FEES_HEADER","BLK_PROD_FINCENTRE"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside TLDPRMNT.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside TLDPRMNT.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_OLTM_PRODUCT__PRODUCTCODE";
pkFields[0] = "BLK_OLTM_PRODUCT__PRODUCTCODE";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_FEES":["COMPONENTDESCRIPTION","DCFCATEGORY","FEEBASIS","FEECALCBASIS","STATUSTRACKINGREQD","STOPASSOCIATION"],"BLK_OLTM_PRODUCT":["CATEGORIESLIST","CURRENCIESLIST","FORMATNAME","PRODUCTDESCRIPTION","PRODUCTENDDATEI","PRODUCTGROUP","PRODUCTREMARKS","PRODUCTSLOGAN","PRODUCTSTARTDATEI","PROD_GRP_DESC","WAREHOUSECODE"],"BLK_PROD_FINCENTRE":["FIN_CENTRE","FIN_CENTRE_DESC","PRODUCT_CODE","SCHEDULE_TYPE"],"BLK_TLTMS_PRODUCT_MASTER":["AMENDFEACRUALREQD","APPLYCONTRACTHOLCCY","APPLYLOCALHOLCCY","APPYFINCENTREHOLDY","ASSGN_FEE_REQUIRED","BRANCHRESTRICTIONS","BROKERAGEAPPLICABLE","CCYRESTRICTIONS","CONSIDERBRANCHHOLIDAY","CUSTOMERRESTRICTIONS","DCFACCRUALFREQ","DCFACCRUALREQD","DCFSTARTDAY","DCFSTARTMONTH","FUNDINGMEMOREQD","HOLIDAYCCY","IGNOREHOLIDAYS","INTERNALDEAL","LMALSPARTICIPATION","REKEYCCY","REKEYCOUNTERPARTY","REKEYMATURITYDATE","REKEYREQD","REKEYTRADEAMOUNT","REKEYTRADEDATE","REKEYTRADEPRICE","SETTLEMENTDAYS","SUPRSTCKTSTTLMNT"]};
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
var lovInfoFlds = {"BLK_OLTM_PRODUCT__FORMATNAME__LOV_FORMAT_NAME":["BLK_OLTM_PRODUCT__FORMATNAME~~","","N~N",""],"BLK_OLTM_PRODUCT__PRODUCTGROUP__LOV_GROUPS":["BLK_OLTM_PRODUCT__PRODUCTGROUP~BLK_OLTM_PRODUCT__PROD_GRP_DESC~","","N~N",""],"BLK_TLTMS_PRODUCT_MASTER__HOLIDAYCCY__LOV_HOLIDAY_CCY":["BLK_TLTMS_PRODUCT_MASTER__HOLIDAYCCY~~","","N~N",""],"BLK_FEES__COMPONENT__LOV_COMPONENT":["BLK_FEES__COMPONENT~BLK_FEES__COMPONENTDESCRIPTION~","","N~N",""],"BLK_PROD_FINCENTRE__FIN_CENTRE__LOV_FINCENTRE":["BLK_PROD_FINCENTRE__FIN_CENTRE~BLK_PROD_FINCENTRE__FIN_CENTRE_DESC~","","N~N",""],"BLK_OLTM_PRODUCT__PRODUCTGROUP__LOV_GROUPS_S":["BLK_OLTM_PRODUCT__PRODUCTGROUP~~~","","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_PROD_FINCENTRE");
var multipleEntryArray = new Array();
var multipleEntryCells = new Array();
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY VIEW SINGLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR ATTACHED CALLFORMS *****
 //----------------------------------------------------------------------------------------------------------------------

 var CallFormArray= new Array("OLCACRHM~BLK_OLTM_PRODUCT","OLCACADD~BLK_OLTM_PRODUCT","OLCPRMNT~BLK_OLTM_PRODUCT","OLCPDFDM~BLK_OLTM_PRODUCT"); 

 var CallFormRelat=new Array("OLTMS_PRODUCT.PRODUCT_CODE = OLTMS_PRODUCT__RH.PRODUCT_CODE","OLTMS_PRODUCT.PRODUCT_CODE=CSTM_PRODUCT__AC.PRODUCT_CODE","OLTMS_PRODUCT.PRODUCT_CODE=OLTMS_PRODUCT__MI.PRODUCT_CODE","OLTMS_PRODUCT.PRODUCT_CODE=CSTM_PRODUCT__CD.PRODUCT_CODE"); 

 var CallRelatType= new Array("1","1","1","1"); 


 var ArrFuncOrigin=new Array();
 var ArrPrntFunc=new Array();
 var ArrPrntOrigin=new Array();
 var ArrRoutingType=new Array();


 // Code for Loading Cluster/Custom js File Starts
 var ArrClusterModified=new Array();
 var ArrCustomModified=new Array();
 // Code for Loading Cluster/Custom js File ends

ArrFuncOrigin["TLDPRMNT"]="KERNEL";
ArrPrntFunc["TLDPRMNT"]="";
ArrPrntOrigin["TLDPRMNT"]="";
ArrRoutingType["TLDPRMNT"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["TLDPRMNT"]="N";
ArrCustomModified["TLDPRMNT"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_PRODUCT_PREFERENCE":"PROD~PROD_DESC","CVS_FEES":"PRODCODE~PRODDESC","OLCACRHM":"MODULE~PRDCD~PRDDESC~PRDTYP~PRD","OLCACADD":"MODULE~PRDCD~PRDDESC~PRDTYP","OLCPRMNT":"PRDCD","OLCPDFDM":"PRDCD~PRDDESC"};
var scrArgSource = {"CVS_PRODUCT_PREFERENCE":"BLK_OLTM_PRODUCT__PRODUCTCODE~BLK_OLTM_PRODUCT__PRODUCTDESCRIPTION","CVS_FEES":"BLK_OLTM_PRODUCT__PRODUCTCODE~BLK_OLTM_PRODUCT__PRODUCTDESCRIPTION","OLCACRHM":"BLK_OLTM_PRODUCT__MODULE~BLK_OLTM_PRODUCT__PRODUCTCODE~BLK_OLTM_PRODUCT__PRODUCTDESCRIPTION~BLK_OLTM_PRODUCT__PRODUCTTYPE~BLK_OLTM_PRODUCT__PRODUCTCODE","OLCACADD":"BLK_OLTM_PRODUCT__MODULE~BLK_OLTM_PRODUCT__PRODUCTCODE~BLK_OLTM_PRODUCT__PRODUCTDESCRIPTION~BLK_OLTM_PRODUCT__PRODUCTTYPE","OLCPRMNT":"BLK_OLTM_PRODUCT__PRODUCTCODE","OLCPDFDM":"BLK_OLTM_PRODUCT__PRODUCTCODE~BLK_OLTM_PRODUCT__PRODUCTDESCRIPTION"};
var scrArgVals = {"CVS_PRODUCT_PREFERENCE":"~","CVS_FEES":"~","OLCACRHM":"~~~~","OLCACADD":"~~~","OLCPRMNT":"","OLCPDFDM":"~"};
var scrArgDest = {"CVS_PRODUCT_PREFERENCE":"BLK_TLTMS_PRODUCT_MASTER__PRODUCT~BLK_TLTMS_PRODUCT_MASTER__PROD_DESC","CVS_FEES":"BLK_FEES_HEADER__TXT_PROD~BLK_FEES_HEADER__TXT_PROD_DESC"};
//***** CODE FOR SUB-SYSTEM DEPENDENT  FIELDS   *****
//----------------------------------------------------------------------------------------------------------------------
var dpndntOnFlds = {"OLCACRHM":"","OLCACADD":"","OLCPRMNT":"","OLCPDFDM":""};
var dpndntOnSrvs = {"OLCACRHM":"","OLCACADD":"","OLCPRMNT":"","OLCPDFDM":""};
//***** CODE FOR TAB DEPENDENT  FIELDS   *****
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR CALLFORM TABS *****
//----------------------------------------------------------------------------------------------------------------------
var callformTabArray = new Array(); 
//***** CODE FOR ACTION STAGE DETAILS *****
//----------------------------------------------------------------------------------------------------------------------
var actStageArry = {"QUERY":"2","NEW":"2","MODIFY":"2","AUTHORIZE":"2","DELETE":"2","CLOSE":"2","REOPEN":"2","REVERSE":"1","ROLLOVER":"1","CONFIRM":"1","LIQUIDATE":"1","SUMMARYQUERY":"2"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------