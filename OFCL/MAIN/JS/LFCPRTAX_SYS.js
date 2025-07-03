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
**  File Name          : LFCPRTAX_SYS.js
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
var fieldNameArray = {"BLK_PRODUCT_TAX":"PRDCD~PRDDESC~MODU~PRDTYP~SCHM~SCHMDESC","BLK_TAX_DETAILS":"PROD~SCHM~RUL~AMTTAG~TAXCATG~BASAMTTAG~COMPEVNT~TYPE~ECA_CHK_REQD"};

var multipleEntryPageSize = {"BLK_TAX_DETAILS" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_PRODUCT_TAX__TAB_MAIN":"BLK_TAX_DETAILS"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_PRODUCT_TAX">PRDCD~PRDDESC~MODU~PRDTYP~SCHM~SCHMDESC</FN>'; 
msgxml += '      <FN PARENT="BLK_PRODUCT_TAX" RELATION_TYPE="N" TYPE="BLK_TAX_DETAILS">PROD~SCHM~RUL~AMTTAG~TAXCATG~BASAMTTAG~COMPEVNT~TYPE~ECA_CHK_REQD</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_PRODUCT_TAX";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_PRODUCT_TAX" : "","BLK_TAX_DETAILS" : "BLK_PRODUCT_TAX~N"}; 

 var dataSrcLocationArray = new Array("BLK_PRODUCT_TAX","BLK_TAX_DETAILS"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LFCPRTAX.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LFCPRTAX.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_PRODUCT_TAX__PRDCD";
pkFields[0] = "BLK_PRODUCT_TAX__PRDCD";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_PRODUCT_TAX":["BTNDEFSCHM","SCHM"],"BLK_TAX_DETAILS":["BASAMTTAG","COMPEVNT","ECA_CHK_REQD","SCHM","TAXCATG","TYPE"]};
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
var lovInfoFlds = {"BLK_PRODUCT_TAX__SCHM__LOV_TAX_SCHEME":["BLK_PRODUCT_TAX__SCHM~BLK_PRODUCT_TAX__SCHMDESC~","","N~N","N"],"BLK_TAX_DETAILS__TAXCATG__LOV_TAX_CATEGORY":["BLK_TAX_DETAILS__TAXCATG~~","","N~N",""],"BLK_TAX_DETAILS__BASAMTTAG__LOV_TAX_AMOUNTTAG":["BLK_TAX_DETAILS__BASAMTTAG~~~","BLK_PRODUCT_TAX__MODU!~BLK_TAX_DETAILS__COMPEVNT!","N~N~N",""],"BLK_TAX_DETAILS__COMPEVNT__LOV_EVENT":["BLK_TAX_DETAILS__COMPEVNT~~","BLK_PRODUCT_TAX__MODU!","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_TAX_DETAILS");
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

ArrFuncOrigin["LFCPRTAX"]="KERNEL";
ArrPrntFunc["LFCPRTAX"]="";
ArrPrntOrigin["LFCPRTAX"]="";
ArrRoutingType["LFCPRTAX"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LFCPRTAX"]="N";
ArrCustomModified["LFCPRTAX"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_PRODUCT_TAX":"PRDCD~PRDDESC~MODU~PRDTYP"};
var scrArgSource = {};
var scrArgVals = {"CVS_PRODUCT_TAX":"~~~"};
var scrArgDest = {"CVS_PRODUCT_TAX":"BLK_PRODUCT_TAX__PRDCD~BLK_PRODUCT_TAX__PRDDESC~BLK_PRODUCT_TAX__MODU~BLK_PRODUCT_TAX__PRDTYP"};
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