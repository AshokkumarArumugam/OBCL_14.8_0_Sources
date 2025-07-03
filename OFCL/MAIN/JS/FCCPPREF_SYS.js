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
**  File Name          : FCCPPREF_SYS.js
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
var fieldNameArray = {"BLK_LBTMS_FACILITY_PRODUCT":"PRODUCTCODE~TXT_PRODUCT_DESCRIPTION~BORROWERTRANCHEPRODUCT~BORROWERDRAWDOWNPRODUCT~PREPAYMENTMETHOD~ACCOUNTGL~SETTLEMENTMSG~REKEYSYNAMOUNT~REKEYCCY~REKEYCPARTY~REKEYSTARTDATE~REKEYENDDATE~HOLIDAYCCY~MATHOLIDAYCCY~APPLYFACILITYHOLCCY~MATAPPLYFACILITYHOLCCY~APPLYLOCALHOLCCY~MATAPPLYLOCALHOLCCY~IGNOREHOLIDAYS~SCHCONSIDERBRANCHHOLIDAY~CASCADESCHEDULES~MOVEACROSSMONTHS~SCHEDULEMOVEMENT~MATIGNOREHOLIDAYS~MATCONSIDERBRANCHHOLIDAY~MATMOVEACROSSMONTHS~MATSCHEDULEMOVEMENT~TXT_TRANCHE_PROD_DESC~TXT_DRAWDOWN_PROD_DESC~PARTICIPANTPRODUCT~FACILITYPRODUCTTYPE~DRAWDOWNNOTICEDAY~TXT_PRDCD_DISC~TXT_PRDDESC_DISC~BRNLST~CCYLST~CATGLIS~PRDCD~TAXAPPLCBLE~ALLOWTAXREFND~TAXTYPE~APPLY_FC_HOL_TREATMENT~APPLY_MAT_FC_HOL_TREATMENT~SGEN","BLK_LBTMS_FACILITY_TR_PRODUCT":"BORROWERTRANCHEPRODUCT~TXT_TRANCHE_PROD_DESC~PRODUCTCODE~TXT_PARTICIPANT_PRODUCT~TXT_OFFSET_PRODUCT_DESC","BLK_LBTMS_FACILITY_DD_PRODUCT":"PRODUCTCODE~BORROWERTRANCHEPRODUCT~BORROWERDRAWDOWNPRODUCT~TXT_DRAWDOWN_PRODUCT_DESC~TXT_PARTICIPANT_PRODUCT~TXT_OFFSET_PRODUCT_DESC","BLK_DISCLOSURE":"DISCLOSURECODE~TXT_DISCLOSURE_DESC~PRODUCTCODE~TXT_PRODUCT_DESC","BLK_SYND_PROD_FINCENTRE_SCH":"FIN_CENTRE~FIN_CENTRE_DESC~PRODUCT_CODE~SCHEDULE_TYPE","BLK_SYND_PROD_FINCENTRE_MAT":"FIN_CENTRE~FIN_CENTRE_DESC~PRODUCT_CODE~SCHEDULE_TYPE"};

var multipleEntryPageSize = {"BLK_LBTMS_FACILITY_TR_PRODUCT" :"15" ,"BLK_LBTMS_FACILITY_DD_PRODUCT" :"15" ,"BLK_DISCLOSURE" :"15" ,"BLK_SYND_PROD_FINCENTRE_SCH" :"15" ,"BLK_SYND_PROD_FINCENTRE_MAT" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_PROD_PREF__TAB_MAIN":"BLK_LBTMS_FACILITY_TR_PRODUCT~BLK_LBTMS_FACILITY_DD_PRODUCT","CVS_DISCLOSURE__TAB_MAIN":"BLK_DISCLOSURE","CVS_PROD_PREF__TAB_HOLIDAY_PREFERENCES":"BLK_SYND_PROD_FINCENTRE_SCH~BLK_SYND_PROD_FINCENTRE_MAT"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_LBTMS_FACILITY_PRODUCT">PRODUCTCODE~TXT_PRODUCT_DESCRIPTION~BORROWERTRANCHEPRODUCT~BORROWERDRAWDOWNPRODUCT~PREPAYMENTMETHOD~ACCOUNTGL~SETTLEMENTMSG~REKEYSYNAMOUNT~REKEYCCY~REKEYCPARTY~REKEYSTARTDATE~REKEYENDDATE~HOLIDAYCCY~MATHOLIDAYCCY~APPLYFACILITYHOLCCY~MATAPPLYFACILITYHOLCCY~APPLYLOCALHOLCCY~MATAPPLYLOCALHOLCCY~IGNOREHOLIDAYS~SCHCONSIDERBRANCHHOLIDAY~CASCADESCHEDULES~MOVEACROSSMONTHS~SCHEDULEMOVEMENT~MATIGNOREHOLIDAYS~MATCONSIDERBRANCHHOLIDAY~MATMOVEACROSSMONTHS~MATSCHEDULEMOVEMENT~TXT_TRANCHE_PROD_DESC~TXT_DRAWDOWN_PROD_DESC~PARTICIPANTPRODUCT~FACILITYPRODUCTTYPE~DRAWDOWNNOTICEDAY~TXT_PRDCD_DISC~TXT_PRDDESC_DISC~BRNLST~CCYLST~CATGLIS~PRDCD~TAXAPPLCBLE~ALLOWTAXREFND~TAXTYPE~APPLY_FC_HOL_TREATMENT~APPLY_MAT_FC_HOL_TREATMENT~SGEN</FN>'; 
msgxml += '      <FN PARENT="BLK_LBTMS_FACILITY_PRODUCT" RELATION_TYPE="N" TYPE="BLK_LBTMS_FACILITY_TR_PRODUCT">BORROWERTRANCHEPRODUCT~TXT_TRANCHE_PROD_DESC~PRODUCTCODE~TXT_PARTICIPANT_PRODUCT~TXT_OFFSET_PRODUCT_DESC</FN>'; 
msgxml += '      <FN PARENT="BLK_LBTMS_FACILITY_TR_PRODUCT" RELATION_TYPE="N" TYPE="BLK_LBTMS_FACILITY_DD_PRODUCT">PRODUCTCODE~BORROWERTRANCHEPRODUCT~BORROWERDRAWDOWNPRODUCT~TXT_DRAWDOWN_PRODUCT_DESC~TXT_PARTICIPANT_PRODUCT~TXT_OFFSET_PRODUCT_DESC</FN>'; 
msgxml += '      <FN PARENT="BLK_LBTMS_FACILITY_PRODUCT" RELATION_TYPE="N" TYPE="BLK_DISCLOSURE">DISCLOSURECODE~TXT_DISCLOSURE_DESC~PRODUCTCODE~TXT_PRODUCT_DESC</FN>'; 
msgxml += '      <FN PARENT="BLK_LBTMS_FACILITY_PRODUCT" RELATION_TYPE="N" TYPE="BLK_SYND_PROD_FINCENTRE_SCH">FIN_CENTRE~FIN_CENTRE_DESC~PRODUCT_CODE~SCHEDULE_TYPE</FN>'; 
msgxml += '      <FN PARENT="BLK_LBTMS_FACILITY_PRODUCT" RELATION_TYPE="N" TYPE="BLK_SYND_PROD_FINCENTRE_MAT">FIN_CENTRE~FIN_CENTRE_DESC~PRODUCT_CODE~SCHEDULE_TYPE</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_PROD_PREF";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_LBTMS_FACILITY_PRODUCT" : "","BLK_LBTMS_FACILITY_TR_PRODUCT" : "BLK_LBTMS_FACILITY_PRODUCT~N","BLK_LBTMS_FACILITY_DD_PRODUCT" : "BLK_LBTMS_FACILITY_TR_PRODUCT~N","BLK_DISCLOSURE" : "BLK_LBTMS_FACILITY_PRODUCT~N","BLK_SYND_PROD_FINCENTRE_SCH" : "BLK_LBTMS_FACILITY_PRODUCT~N","BLK_SYND_PROD_FINCENTRE_MAT" : "BLK_LBTMS_FACILITY_PRODUCT~N"}; 

 var dataSrcLocationArray = new Array("BLK_LBTMS_FACILITY_PRODUCT","BLK_LBTMS_FACILITY_TR_PRODUCT","BLK_LBTMS_FACILITY_DD_PRODUCT","BLK_DISCLOSURE","BLK_SYND_PROD_FINCENTRE_SCH","BLK_SYND_PROD_FINCENTRE_MAT"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside FCCPPREF.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside FCCPPREF.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_LBTMS_FACILITY_PRODUCT__PRODUCTCODE";
pkFields[0] = "BLK_LBTMS_FACILITY_PRODUCT__PRODUCTCODE";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_DISCLOSURE":["DISCLOSURECODE","PRODUCTCODE","TXT_DISCLOSURE_DESC","TXT_PRODUCT_DESC"],"BLK_LBTMS_FACILITY_DD_PRODUCT":["BORROWERDRAWDOWNPRODUCT","BORROWERTRANCHEPRODUCT","PRODUCTCODE","TXT_DRAWDOWN_PRODUCT_DESC","TXT_OFFSET_PRODUCT_DESC","TXT_PARTICIPANT_PRODUCT"],"BLK_LBTMS_FACILITY_PRODUCT":["ACCOUNTGL","ALLOWTAXREFND","APPLYFACILITYHOLCCY","APPLYLOCALHOLCCY","APPLY_FC_HOL_TREATMENT","APPLY_MAT_FC_HOL_TREATMENT","BTN_DISCLOSURE","CASCADESCHEDULES","DRAWDOWNNOTICEDAY","FACILITYPRODUCTTYPE","HOLIDAYCCY","IGNOREHOLIDAYS","MATAPPLYFACILITYHOLCCY","MATAPPLYLOCALHOLCCY","MATCONSIDERBRANCHHOLIDAY","MATHOLIDAYCCY","MATIGNOREHOLIDAYS","MATMOVEACROSSMONTHS","MATSCHEDULEMOVEMENT","MOVEACROSSMONTHS","PREPAYMENTMETHOD","REKEYCCY","REKEYCPARTY","REKEYENDDATE","REKEYSTARTDATE","REKEYSYNAMOUNT","SCHCONSIDERBRANCHHOLIDAY","SCHEDULEMOVEMENT","SETTLEMENTMSG","SGEN","TAXAPPLCBLE","TAXTYPE","TXT_DRAWDOWN_PROD_DESC","TXT_PRDCD_DISC","TXT_PRDDESC_DISC","TXT_TRANCHE_PROD_DESC"],"BLK_LBTMS_FACILITY_TR_PRODUCT":["BORROWERTRANCHEPRODUCT","PRODUCTCODE","TXT_OFFSET_PRODUCT_DESC","TXT_PARTICIPANT_PRODUCT","TXT_TRANCHE_PROD_DESC"],"BLK_SYND_PROD_FINCENTRE_MAT":["FIN_CENTRE","FIN_CENTRE_DESC","PRODUCT_CODE","SCHEDULE_TYPE"],"BLK_SYND_PROD_FINCENTRE_SCH":["FIN_CENTRE","FIN_CENTRE_DESC","PRODUCT_CODE","SCHEDULE_TYPE"]};
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
var lovInfoFlds = {"BLK_LBTMS_FACILITY_PRODUCT__ACCOUNTGL__LOV_SETTLE_ACCOUNT":["BLK_LBTMS_FACILITY_PRODUCT__ACCOUNTGL~~~","","N~N~N",""],"BLK_LBTMS_FACILITY_PRODUCT__HOLIDAYCCY__LOV_CCY":["BLK_LBTMS_FACILITY_PRODUCT__HOLIDAYCCY~~","","N~N",""],"BLK_LBTMS_FACILITY_PRODUCT__MATHOLIDAYCCY__LOV_CCY":["BLK_LBTMS_FACILITY_PRODUCT__MATHOLIDAYCCY~~","","N~N",""],"BLK_LBTMS_FACILITY_TR_PRODUCT__BORROWERTRANCHEPRODUCT__LOV_BCP":["BLK_LBTMS_FACILITY_TR_PRODUCT__BORROWERTRANCHEPRODUCT~BLK_LBTMS_FACILITY_TR_PRODUCT__TXT_TRANCHE_PROD_DESC~BLK_LBTMS_FACILITY_TR_PRODUCT__TXT_PARTICIPANT_PRODUCT~BLK_LBTMS_FACILITY_TR_PRODUCT__TXT_OFFSET_PRODUCT_DESC~","","N~N~N~N",""],"BLK_LBTMS_FACILITY_DD_PRODUCT__BORROWERDRAWDOWNPRODUCT__LOV_BLP":["BLK_LBTMS_FACILITY_DD_PRODUCT__BORROWERDRAWDOWNPRODUCT~BLK_LBTMS_FACILITY_DD_PRODUCT__TXT_DRAWDOWN_PRODUCT_DESC~BLK_LBTMS_FACILITY_DD_PRODUCT__TXT_PARTICIPANT_PRODUCT~BLK_LBTMS_FACILITY_DD_PRODUCT__TXT_OFFSET_PRODUCT_DESC~","","N~N~N~N",""],"BLK_DISCLOSURE__DISCLOSURECODE__LOV_DISCLOSURE_CODE":["BLK_DISCLOSURE__DISCLOSURECODE~BLK_DISCLOSURE__TXT_DISCLOSURE_DESC~","","N~N",""],"BLK_SYND_PROD_FINCENTRE_SCH__FIN_CENTRE__LOV_FINCENTRE":["BLK_SYND_PROD_FINCENTRE_SCH__FIN_CENTRE~BLK_SYND_PROD_FINCENTRE_SCH__FIN_CENTRE_DESC~","","N~N",""],"BLK_SYND_PROD_FINCENTRE_SCH__FIN_CENTRE_DESC__LOV_FINCENTRE":["BLK_SYND_PROD_FINCENTRE_SCH__FIN_CENTRE~BLK_SYND_PROD_FINCENTRE_SCH__FIN_CENTRE_DESC~","","N~N",""],"BLK_SYND_PROD_FINCENTRE_MAT__FIN_CENTRE__LOV_FINCENTRE":["BLK_SYND_PROD_FINCENTRE_MAT__FIN_CENTRE~BLK_SYND_PROD_FINCENTRE_MAT__FIN_CENTRE_DESC~","","N~N",""]};
var offlineLovInfoFlds = {};
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR TABS *****
//----------------------------------------------------------------------------------------------------------------------
var strHeaderTabId = 'TAB_LINKAGE';
var strFooterTabId = 'TAB_FOOTER';
var strCurrentTabId = 'TAB_MAIN';
//--------------------------------------------
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------
var multipleEntryIDs = new Array("BLK_LBTMS_FACILITY_TR_PRODUCT","BLK_LBTMS_FACILITY_DD_PRODUCT","BLK_DISCLOSURE","BLK_SYND_PROD_FINCENTRE_SCH","BLK_SYND_PROD_FINCENTRE_MAT");
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

ArrFuncOrigin["FCCPPREF"]="KERNEL";
ArrPrntFunc["FCCPPREF"]="";
ArrPrntOrigin["FCCPPREF"]="";
ArrRoutingType["FCCPPREF"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["FCCPPREF"]="N";
ArrCustomModified["FCCPPREF"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_PROD_PREF":"PRODUCTCODE~PRODUCTDESCRIPTION","CVS_DISCLOSURE":"PRODUCTCODE~PRODUCTDESCRIPTION"};
var scrArgSource = {"CVS_DISCLOSURE":"BLK_LBTMS_FACILITY_PRODUCT__PRODUCTCODE~BLK_LBTMS_FACILITY_PRODUCT__TXT_PRODUCT_DESCRIPTION"};
var scrArgVals = {"CVS_PROD_PREF":"~","CVS_DISCLOSURE":"~"};
var scrArgDest = {"CVS_PROD_PREF":"BLK_LBTMS_FACILITY_PRODUCT__PRODUCTCODE~BLK_LBTMS_FACILITY_PRODUCT__TXT_PRODUCT_DESCRIPTION","CVS_DISCLOSURE":"BLK_LBTMS_FACILITY_PRODUCT__TXT_PRDCD_DISC~BLK_LBTMS_FACILITY_PRODUCT__TXT_PRDDESC_DISC"};
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