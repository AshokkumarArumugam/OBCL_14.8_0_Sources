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
**  File Name          : OLDRHCLM_SYS.js
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
var fieldNameArray = {"BLK_OLTMS_CLASS":"MOD~CLASCD~CLASDESC~CLASSTYP~MODULEDESC~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH","BLK_OLTMS_ROLE_TO_HEAD_CLASS":"MODULE~ROLECLASSCODE~ACCOUNTINGROLE~USERDEFINEDSTATUS~ACCOUNTHEAD~ROLEDESCRIPTION~GLDESC"};

var multipleEntryPageSize = {"BLK_OLTMS_ROLE_TO_HEAD_CLASS" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_S1__TAB_MAIN":"BLK_OLTMS_ROLE_TO_HEAD_CLASS"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTMS_CLASS">MOD~CLASCD~CLASDESC~CLASSTYP~MODULEDESC~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTMS_CLASS" RELATION_TYPE="N" TYPE="BLK_OLTMS_ROLE_TO_HEAD_CLASS">MODULE~ROLECLASSCODE~ACCOUNTINGROLE~USERDEFINEDSTATUS~ACCOUNTHEAD~ROLEDESCRIPTION~GLDESC</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_S1";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** FCJ XML FOR SUMMARY SCREEN *****
//----------------------------------------------------------------------------------------------------------------------
var msgxml_sum=""; 
msgxml_sum += '    <FLD>'; 
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTMS_CLASS">AUTHSTAT~TXNSTAT~MOD~CLASCD~CLASDESC~CLASSTYP</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "OLDRHCLM";
var defaultWhereClause = "CLASS_TYPE = 'RH'";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_OLTMS_CLASS";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_OLTMS_CLASS" : "","BLK_OLTMS_ROLE_TO_HEAD_CLASS" : "BLK_OLTMS_CLASS~N"}; 

 var dataSrcLocationArray = new Array("BLK_OLTMS_CLASS","BLK_OLTMS_ROLE_TO_HEAD_CLASS"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLDRHCLM.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLDRHCLM.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_OLTMS_CLASS__MOD";
pkFields[0] = "BLK_OLTMS_CLASS__MOD";
queryFields[1] = "BLK_OLTMS_CLASS__CLASCD";
pkFields[1] = "BLK_OLTMS_CLASS__CLASCD";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_OLTMS_CLASS":["CLASDESC"],"BLK_OLTMS_ROLE_TO_HEAD_CLASS":["ACCOUNTHEAD","ACCOUNTINGROLE","ROLECLASSCODE","ROLEDESCRIPTION"]};
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
var lovInfoFlds = {"BLK_OLTMS_CLASS__MOD__LOV_MODULE":["BLK_OLTMS_CLASS__MOD~BLK_OLTMS_CLASS__MODULEDESC~","","N~N",""],"BLK_OLTMS_ROLE_TO_HEAD_CLASS__ACCOUNTINGROLE__LOV_ROLE":["BLK_OLTMS_ROLE_TO_HEAD_CLASS__ACCOUNTINGROLE~BLK_OLTMS_ROLE_TO_HEAD_CLASS__ROLEDESCRIPTION~","BLK_CSTMS_CLASS__MOD!Varchar2","N~N",""],"BLK_OLTMS_ROLE_TO_HEAD_CLASS__ACCOUNTHEAD__LOV_HEAD":["BLK_OLTMS_ROLE_TO_HEAD_CLASS__ACCOUNTHEAD~BLK_OLTMS_ROLE_TO_HEAD_CLASS__GLDESC~","BLK_CSTMS_CLASS__MOD!Varchar2~BLK_CSTMS_CLASS__MOD!Varchar2","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_OLTMS_ROLE_TO_HEAD_CLASS");
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

ArrFuncOrigin["OLDRHCLM"]="KERNEL";
ArrPrntFunc["OLDRHCLM"]="";
ArrPrntOrigin["OLDRHCLM"]="";
ArrRoutingType["OLDRHCLM"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLDRHCLM"]="N";
ArrCustomModified["OLDRHCLM"]="N";

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
var actStageArry = {"QUERY":"2","NEW":"2","MODIFY":"2","AUTHORIZE":"2","DELETE":"2","CLOSE":"2","REOPEN":"2","REVERSE":"1","ROLLOVER":"1","CONFIRM":"1","LIQUIDATE":"1","SUMMARYQUERY":"1"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------