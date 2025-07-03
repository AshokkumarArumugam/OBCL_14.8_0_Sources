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
**  File Name          : OLDAFMAP_SYS.js
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
var fieldNameArray = {"BLK_AUTO_FUND_MAPPING":"BRNCODE~CCYCODE~FUNDINGMETHOD~OFSBRNCODE~OFS_CUST_NO~OFSPRD~OFSTRS~OFSTRSTYPE~PRINLIQ~PRD~REFNO~TRSSRC~TRSTYPE~TXNMIS~TXT_BRN_DESC~TXT_PRD_DESC~TXT_CCYDESC~TXT_OFSBRNDESC~TXT_OFSPRDDESC~TXT_OFSCPTYDESC~DEPCODE~TXT_TRS_DESC~CUST_NO~TXT_CPTYDESC~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH","BLK_BTN":""};

var multipleEntryPageSize = {};

var multipleEntrySVBlocks = "";

var tabMEBlks = {};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_AUTO_FUND_MAPPING">BRNCODE~CCYCODE~FUNDINGMETHOD~OFSBRNCODE~OFS_CUST_NO~OFSPRD~OFSTRS~OFSTRSTYPE~PRINLIQ~PRD~REFNO~TRSSRC~TRSTYPE~TXNMIS~TXT_BRN_DESC~TXT_PRD_DESC~TXT_CCYDESC~TXT_OFSBRNDESC~TXT_OFSPRDDESC~TXT_OFSCPTYDESC~DEPCODE~TXT_TRS_DESC~CUST_NO~TXT_CPTYDESC~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_BTN"></FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_AUTOFND";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** FCJ XML FOR SUMMARY SCREEN *****
//----------------------------------------------------------------------------------------------------------------------
var msgxml_sum=""; 
msgxml_sum += '    <FLD>'; 
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_AUTO_FUND_MAPPING">AUTHSTAT~TXNSTAT~BRNCODE~TRSTYPE~PRD~CCYCODE~TRSSRC~CUST_NO</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "OLDAFMAP";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_AUTO_FUND_MAPPING";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_AUTO_FUND_MAPPING" : "","BLK_BTN" : ""}; 

 var dataSrcLocationArray = new Array("BLK_AUTO_FUND_MAPPING","BLK_BTN"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLDAFMAP.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLDAFMAP.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_AUTO_FUND_MAPPING__CCYCODE";
pkFields[0] = "BLK_AUTO_FUND_MAPPING__CCYCODE";
queryFields[1] = "BLK_AUTO_FUND_MAPPING__PRD";
pkFields[1] = "BLK_AUTO_FUND_MAPPING__PRD";
queryFields[2] = "BLK_AUTO_FUND_MAPPING__TRSTYPE";
pkFields[2] = "BLK_AUTO_FUND_MAPPING__TRSTYPE";
queryFields[3] = "BLK_AUTO_FUND_MAPPING__BRNCODE";
pkFields[3] = "BLK_AUTO_FUND_MAPPING__BRNCODE";
queryFields[4] = "BLK_AUTO_FUND_MAPPING__TRSSRC";
pkFields[4] = "BLK_AUTO_FUND_MAPPING__TRSSRC";
queryFields[5] = "BLK_AUTO_FUND_MAPPING__CUST_NO";
pkFields[5] = "BLK_AUTO_FUND_MAPPING__CUST_NO";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_AUTO_FUND_MAPPING":["FUNDINGMETHOD","OFSBRNCODE","OFSPRD","OFS_CUST_NO","PRINLIQ","TXNMIS"]};
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
var lovInfoFlds = {"BLK_AUTO_FUND_MAPPING__BRNCODE__LOV_BRNCODE":["BLK_AUTO_FUND_MAPPING__BRNCODE~BLK_AUTO_FUND_MAPPING__TXT_BRN_DESC~BLK_AUTO_FUND_MAPPING__TRSTYPE~","","N~N~N",""],"BLK_AUTO_FUND_MAPPING__CCYCODE__LOV_CCYCODE":["BLK_AUTO_FUND_MAPPING__CCYCODE~BLK_AUTO_FUND_MAPPING__TXT_CCYDESC~","","N~N",""],"BLK_AUTO_FUND_MAPPING__OFSBRNCODE__LOV_OFSBRN_CODE":["BLK_AUTO_FUND_MAPPING__OFSBRNCODE~BLK_AUTO_FUND_MAPPING__TXT_OFSBRNDESC~","","N~N",""],"BLK_AUTO_FUND_MAPPING__OFS_CUST_NO__LOV_OFS_CPARTY":["BLK_AUTO_FUND_MAPPING__OFS_CUST_NO~BLK_AUTO_FUND_MAPPING__TXT_OFSCPTYDESC~","","N~N",""],"BLK_AUTO_FUND_MAPPING__OFSPRD__LOV_OFS_PRD_CODE":["BLK_AUTO_FUND_MAPPING__OFSPRD~BLK_AUTO_FUND_MAPPING__TXT_OFSPRDDESC~","","N~N",""],"BLK_AUTO_FUND_MAPPING__PRD__LOV_PRD_CODE":["BLK_AUTO_FUND_MAPPING__PRD~BLK_AUTO_FUND_MAPPING__TXT_PRD_DESC~","","N~N",""],"BLK_AUTO_FUND_MAPPING__TRSSRC__LOV_TRS_SRC":["BLK_AUTO_FUND_MAPPING__TRSSRC~BLK_AUTO_FUND_MAPPING__TXT_TRS_DESC~","BLK_AUTO_FUND_MAPPING__TRSTYPE!","N~N",""],"BLK_AUTO_FUND_MAPPING__DEPCODE__LOV_DEP":["BLK_AUTO_FUND_MAPPING__DEPCODE~BLK_AUTO_FUND_MAPPING__TXT_DEPT_DESC~","","N~N",""],"BLK_AUTO_FUND_MAPPING__CUST_NO__LOV_OFS_CPARTY":["BLK_AUTO_FUND_MAPPING__CUST_NO~BLK_AUTO_FUND_MAPPING__TXT_CPTYDESC~","","N~N",""]};
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

ArrFuncOrigin["OLDAFMAP"]="KERNEL";
ArrPrntFunc["OLDAFMAP"]="";
ArrPrntOrigin["OLDAFMAP"]="";
ArrRoutingType["OLDAFMAP"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLDAFMAP"]="N";
ArrCustomModified["OLDAFMAP"]="N";

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