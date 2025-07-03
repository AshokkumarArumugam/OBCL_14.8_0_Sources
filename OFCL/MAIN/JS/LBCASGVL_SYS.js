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
**  File Name          : LBCASGVL_SYS.js
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
var fieldNameArray = {"BLK_ASIGNMNT_VALIDATIONS":"CONTREFNO~VERSIONNO~TXTPRD~TXTPRDDESC~TXTPRDTYPE~TXTUSRREFNO~TXTCUST~TXTCUSTNAME~TXTFACILITY~AGNTCONSNTREQ~ACCEPTAFFILETRS~APLYTRFRAMTVALID~TXTCONTCCY~MINTRFRAMT~MINAMTAFTERTRFR~AMTINMULTIOF~WAIVEFORLEND~WAIVEFORAFFIL~WAIVEWITHAGENTCON~WAIVEWITHBORRCONS~WAIVEWHENCMPLTRFR~VALIDBRRCNSNT~BCNSNTFOROLDINVST~BCNSNTFORNEWINVEST~BCNSNTFOROLDAFFIL~BCONSENT_FOR_ALL~VALIDISSUEBANKCNSNT~IBCNSNTFOROLDINVET~IBCNSNTFORNEWINVST~IBCNSNTFOROLDAFFIL~IBCNSNTFORALL~VALIDATESWINBNKCNSNT~SLCNSNTFOROLDINVT~SLCNSNTFORNEWINV~SLCNSNTFOROLDAFFILI~SLCNSNTFORALL~NOTIFYBORROWER~REQSIMULTTXFROFDEAL~ISSBANKSUBLIMIT~SWINSUBLIMIT~SPECIALCASES~SECTNO~BRRCNSNTDAYS~DEFLENDLANGPR~TRANCWITHMINTRFRAMT~TRANTRADTO~REMARKS~TXTASIGNFEE~TXTCCY","BLK_ISSUING_BANKS":"CONTREFNO~VERSIONNO~BANKTYPE~BANK","BLK_SWINGING_LENDERS":"CONTREFNO~VERSIONNO~BANKTYPE~BANK","BLK_SIMUL_TRASFER_TRNCH":"CONTREFNO~VERSIONNO~TRANCHETYPE~OTHERTRANREFNO","BLK_TRNCH_UNDER_LENDER_STAT":"CONTREFNO~VERSIONNO~TRANCHETYPE~OTHERTRANCHREFNO"};

var multipleEntryPageSize = {"BLK_ISSUING_BANKS" :"15" ,"BLK_SIMUL_TRASFER_TRNCH" :"15" ,"BLK_SWINGING_LENDERS" :"15" ,"BLK_TRNCH_UNDER_LENDER_STAT" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_ASIGN__TAB_MAIN":"BLK_ISSUING_BANKS~BLK_SIMUL_TRASFER_TRNCH~BLK_SWINGING_LENDERS~BLK_TRNCH_UNDER_LENDER_STAT"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_ASIGNMNT_VALIDATIONS">CONTREFNO~VERSIONNO~TXTPRD~TXTPRDDESC~TXTPRDTYPE~TXTUSRREFNO~TXTCUST~TXTCUSTNAME~TXTFACILITY~AGNTCONSNTREQ~ACCEPTAFFILETRS~APLYTRFRAMTVALID~TXTCONTCCY~MINTRFRAMT~MINAMTAFTERTRFR~AMTINMULTIOF~WAIVEFORLEND~WAIVEFORAFFIL~WAIVEWITHAGENTCON~WAIVEWITHBORRCONS~WAIVEWHENCMPLTRFR~VALIDBRRCNSNT~BCNSNTFOROLDINVST~BCNSNTFORNEWINVEST~BCNSNTFOROLDAFFIL~BCONSENT_FOR_ALL~VALIDISSUEBANKCNSNT~IBCNSNTFOROLDINVET~IBCNSNTFORNEWINVST~IBCNSNTFOROLDAFFIL~IBCNSNTFORALL~VALIDATESWINBNKCNSNT~SLCNSNTFOROLDINVT~SLCNSNTFORNEWINV~SLCNSNTFOROLDAFFILI~SLCNSNTFORALL~NOTIFYBORROWER~REQSIMULTTXFROFDEAL~ISSBANKSUBLIMIT~SWINSUBLIMIT~SPECIALCASES~SECTNO~BRRCNSNTDAYS~DEFLENDLANGPR~TRANCWITHMINTRFRAMT~TRANTRADTO~REMARKS~TXTASIGNFEE~TXTCCY</FN>'; 
msgxml += '      <FN PARENT="BLK_ASIGNMNT_VALIDATIONS" RELATION_TYPE="N" TYPE="BLK_ISSUING_BANKS">CONTREFNO~VERSIONNO~BANKTYPE~BANK</FN>'; 
msgxml += '      <FN PARENT="BLK_ASIGNMNT_VALIDATIONS" RELATION_TYPE="N" TYPE="BLK_SWINGING_LENDERS">CONTREFNO~VERSIONNO~BANKTYPE~BANK</FN>'; 
msgxml += '      <FN PARENT="BLK_ASIGNMNT_VALIDATIONS" RELATION_TYPE="N" TYPE="BLK_SIMUL_TRASFER_TRNCH">CONTREFNO~VERSIONNO~TRANCHETYPE~OTHERTRANREFNO</FN>'; 
msgxml += '      <FN PARENT="BLK_ASIGNMNT_VALIDATIONS" RELATION_TYPE="N" TYPE="BLK_TRNCH_UNDER_LENDER_STAT">CONTREFNO~VERSIONNO~TRANCHETYPE~OTHERTRANCHREFNO</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_ASIGN";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_ASIGNMNT_VALIDATIONS" : "","BLK_ISSUING_BANKS" : "BLK_ASIGNMNT_VALIDATIONS~N","BLK_SWINGING_LENDERS" : "BLK_ASIGNMNT_VALIDATIONS~N","BLK_SIMUL_TRASFER_TRNCH" : "BLK_ASIGNMNT_VALIDATIONS~N","BLK_TRNCH_UNDER_LENDER_STAT" : "BLK_ASIGNMNT_VALIDATIONS~N"}; 

 var dataSrcLocationArray = new Array("BLK_ASIGNMNT_VALIDATIONS","BLK_ISSUING_BANKS","BLK_SWINGING_LENDERS","BLK_SIMUL_TRASFER_TRNCH","BLK_TRNCH_UNDER_LENDER_STAT"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LBCASGVL.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LBCASGVL.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_ASIGNMNT_VALIDATIONS__CONTREFNO";
pkFields[0] = "BLK_ASIGNMNT_VALIDATIONS__CONTREFNO";
queryFields[1] = "BLK_ASIGNMNT_VALIDATIONS__VERSIONNO";
pkFields[1] = "BLK_ASIGNMNT_VALIDATIONS__VERSIONNO";
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
var lovInfoFlds = {"BLK_ISSUING_BANKS__BANK__LOV_ISSUING_BANKS":["BLK_ISSUING_BANKS__BANK~~","BLK_ASIGNMNT_VALIDATIONS__CONTREFNO!~BLK_ASIGNMNT_VALIDATIONS__CONTREFNO!~BLK_ASIGNMNT_VALIDATIONS__VERSIONNO!","N~N",""],"BLK_SWINGING_LENDERS__BANK__LOV_SWINGING_LENDERS":["BLK_SWINGING_LENDERS__BANK~~","BLK_ASIGNMNT_VALIDATIONS__CONTREFNO!~BLK_ASIGNMNT_VALIDATIONS__CONTREFNO!~BLK_ASIGNMNT_VALIDATIONS__VERSIONNO!","N~N",""],"BLK_SIMUL_TRASFER_TRNCH__OTHERTRANREFNO__LOV_SIMUL_TRANSFER_TRANCHE":["BLK_SIMUL_TRASFER_TRNCH__OTHERTRANREFNO~~","BLK_ASIGNMNT_VALIDATIONS__CONTREFNO!~BLK_ASIGNMNT_VALIDATIONS__VERSIONNO!","N~N",""],"BLK_TRNCH_UNDER_LENDER_STAT__OTHERTRANCHREFNO__LOV_TRNCH_UNDER_LENDER_STAT":["BLK_TRNCH_UNDER_LENDER_STAT__OTHERTRANCHREFNO~~","BLK_ASIGNMNT_VALIDATIONS__CONTREFNO!~BLK_ASIGNMNT_VALIDATIONS__VERSIONNO!","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_ISSUING_BANKS","BLK_SIMUL_TRASFER_TRNCH","BLK_SWINGING_LENDERS","BLK_TRNCH_UNDER_LENDER_STAT");
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

ArrFuncOrigin["LBCASGVL"]="KERNEL";
ArrPrntFunc["LBCASGVL"]="";
ArrPrntOrigin["LBCASGVL"]="";
ArrRoutingType["LBCASGVL"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LBCASGVL"]="N";
ArrCustomModified["LBCASGVL"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_ASIGN":"CONTREFNO~VERSIONNO"};
var scrArgSource = {};
var scrArgVals = {"CVS_ASIGN":"~"};
var scrArgDest = {"CVS_ASIGN":"BLK_ASIGNMNT_VALIDATIONS__CONTREFNO~BLK_ASIGNMNT_VALIDATIONS__VERSIONNO"};
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