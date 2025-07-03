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
**  File Name          : OLDCUCCL_SYS.js
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
var fieldNameArray = {"BLK_OLTMS_CLASS":"MOD_MAS~MODDESC~CLASSCD_MAS~CLSCDDESC_MAS~CLSTYPE_MAS~RESTRICTION_TYPE~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH","BLK_CATG_RESTRICTIONS_CLASS":"CATEGORYDISALLOW~CATDESC~CLASSCODE~MODULE","BLK_CUST_ACCESS_CLASS":"CUSTOMERID~CUSTNAME~ALLOWED~CLASSCODE~MODULE"};

var multipleEntryPageSize = {"BLK_CATG_RESTRICTIONS_CLASS" :"15" ,"BLK_CUST_ACCESS_CLASS" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_CATG_RESTRICTIONS_CLASS~BLK_CUST_ACCESS_CLASS"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTMS_CLASS">MOD_MAS~MODDESC~CLASSCD_MAS~CLSCDDESC_MAS~CLSTYPE_MAS~RESTRICTION_TYPE~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTMS_CLASS" RELATION_TYPE="N" TYPE="BLK_CATG_RESTRICTIONS_CLASS">CATEGORYDISALLOW~CATDESC~CLASSCODE~MODULE</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTMS_CLASS" RELATION_TYPE="N" TYPE="BLK_CUST_ACCESS_CLASS">CUSTOMERID~CUSTNAME~ALLOWED~CLASSCODE~MODULE</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTMS_CLASS">AUTHSTAT~TXNSTAT~MOD_MAS~CLASSCD_MAS</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "OLDCUCCL";
var defaultWhereClause = "CLASS_TYPE='CR'";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_OLTMS_CLASS";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_OLTMS_CLASS" : "","BLK_CATG_RESTRICTIONS_CLASS" : "BLK_OLTMS_CLASS~N","BLK_CUST_ACCESS_CLASS" : "BLK_OLTMS_CLASS~N"}; 

 var dataSrcLocationArray = new Array("BLK_OLTMS_CLASS","BLK_CATG_RESTRICTIONS_CLASS","BLK_CUST_ACCESS_CLASS"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLDCUCCL.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLDCUCCL.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_OLTMS_CLASS__MOD_MAS";
pkFields[0] = "BLK_OLTMS_CLASS__MOD_MAS";
queryFields[1] = "BLK_OLTMS_CLASS__CLASSCD_MAS";
pkFields[1] = "BLK_OLTMS_CLASS__CLASSCD_MAS";
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
var lovInfoFlds = {"BLK_OLTMS_CLASS__MOD_MAS__LOV_MODULE":["BLK_OLTMS_CLASS__MOD_MAS~BLK_OLTMS_CLASS__MODDESC~BLK_OLTMS_CLASS__CLASSCD_MAS~BLK_OLTMS_CLASS__CLSCDDESC_MAS~BLK_OLTMS_CLASS__RESTRICTION_TYPE~","","N~N~N~N~N",""],"BLK_OLTMS_CLASS__CLASSCD_MAS__LOV_CLASSCODE":["BLK_OLTMS_CLASS__CLASSCD_MAS~BLK_OLTMS_CLASS__CLSCDDESC_MAS~BLK_OLTMS_CLASS__RESTRICTION_TYPE~","BLK_OLTMS_CLASS__MOD_MAS!VARCHAR2","N~N~N",""],"BLK_CATG_RESTRICTIONS_CLASS__CATEGORYDISALLOW__LOV_CUST_CATGEGORY":["BLK_CATG_RESTRICTIONS_CLASS__CATEGORYDISALLOW~BLK_CATG_RESTRICTIONS_CLASS__CATDESC~","","N~N",""],"BLK_CUST_ACCESS_CLASS__CUSTOMERID__LOV_CUSTOMER":["BLK_CUST_ACCESS_CLASS__CUSTOMERID~BLK_CUST_ACCESS_CLASS__CUSTCAT~~BLK_CUST_ACCESS_CLASS__CUSTNAME~","","N~N~N~N",""]};
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
var multipleEntryIDs = new Array("BLK_CATG_RESTRICTIONS_CLASS","BLK_CUST_ACCESS_CLASS");
var multipleEntryArray = new Array();
var multipleEntryCells = new Array();
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY VIEW SINGLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR ATTACHED CALLFORMS *****
 //----------------------------------------------------------------------------------------------------------------------

 var CallFormArray= new Array("CSCFNUDF~BLK_OLTMS_CLASS"); 

 var CallFormRelat=new Array("ONE TO ONE"); 

 var CallRelatType= new Array("1"); 


 var ArrFuncOrigin=new Array();
 var ArrPrntFunc=new Array();
 var ArrPrntOrigin=new Array();
 var ArrRoutingType=new Array();


 // Code for Loading Cluster/Custom js File Starts
 var ArrClusterModified=new Array();
 var ArrCustomModified=new Array();
 // Code for Loading Cluster/Custom js File ends

ArrFuncOrigin["OLDCUCCL"]="KERNEL";
ArrPrntFunc["OLDCUCCL"]="";
ArrPrntOrigin["OLDCUCCL"]="";
ArrRoutingType["OLDCUCCL"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLDCUCCL"]="N";
ArrCustomModified["OLDCUCCL"]="N";

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