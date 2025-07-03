/***************************************************************************************************************************
**  This source is part of the FLEXCUBE Software Product. 
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
**  File Name          : SMRBASTA_SYS.js
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
var fieldNameArray = {"BLK_CSTBS_UI_COLUMNS":"RPTDATE~PM_STARTDATE~PM_ENDDATE~PM_BRANCH~PM_BATCH~TSNAME~TSVALUE","BLK_REPORT_OPTIONS":"REPREF~REPFID~FILEPATH~FILENAME~GENMODE~REPFMT~REPOUTPUT~PRINTAT~PRINTER~PARAMNAMES~PARAMVALS~PARAMTYPES"};

var multipleEntryPageSize = {};

var multipleEntrySVBlocks = "";

var tabMEBlks = {};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_CSTBS_UI_COLUMNS">RPTDATE~PM_STARTDATE~PM_ENDDATE~PM_BRANCH~PM_BATCH~TSNAME~TSVALUE</FN>'; 
msgxml +='<FN PARENT= "BLK_CSTBS_UI_COLUMNS"  RELATION_TYPE="1" TYPE="BLK_REPORT_OPTIONS">REPREF~REPFID~FILEPATH~FILENAME~GENMODE~REPFMT~REPOUTPUT~PRINTAT~PRINTER~PARAMNAMES~PARAMVALS~PARAMTYPES</FN>';
msgxml += '    </FLD>'; 

var strScreenName = "CVS_MAIN";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_CSTBS_UI_COLUMNS" : "","BLK_REPORT_OPTIONS":"BLK_CSTBS_UI_COLUMNS~1"}; 

 var dataSrcLocationArray = new Array("BLK_CSTBS_UI_COLUMNS","BLK_REPORT_OPTIONS"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside SMRBASTA.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside SMRBASTA.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_CSTBS_UI_COLUMNS__PM_BRANCH";
pkFields[0] = "BLK_CSTBS_UI_COLUMNS__PM_BRANCH";
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
var lovInfoFlds = {"BLK_CSTBS_UI_COLUMNS__PM_BRANCH__LOV_BRN":["BLK_CSTBS_UI_COLUMNS__PM_BRANCH~","BLK_CSTBS_UI_COLUMNS__PM_BATCH!","N",""],"BLK_CSTBS_UI_COLUMNS__PM_BATCH__LOV_BATCH":["BLK_CSTBS_UI_COLUMNS__PM_BATCH~","","N",""],"BLK_REPORT_OPTIONS__PRINTER__LOV_EXTRPT_PRINTER":["BLK_REPORT_OPTIONS__PRINTER~","","N~",""]};
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

ArrFuncOrigin["SMRBASTA"]="KERNEL";
ArrPrntFunc["SMRBASTA"]="";
ArrPrntOrigin["SMRBASTA"]="";
ArrRoutingType["SMRBASTA"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["SMRBASTA"]="N";
ArrCustomModified["SMRBASTA"]="N";

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
var actStageArry = {};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------