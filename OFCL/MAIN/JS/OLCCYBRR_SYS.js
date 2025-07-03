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
**  File Name          : OLCCYBRR_SYS.js
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
var fieldNameArray = {"BLK_BRANCH_CCY_RESTRICTIONS":"MODULE~PRDTYP~PRDCD~CCYLST~BRNLST~PRDDESC~CLASCD~CLASTYP~PRD~CLASSDESC","BLK_BRANCH_LIST":"PRDCD~BRNDISALOW~BRNNAME","BLK_CCY_LIST":"BGTDLCCY~PRODCD~SOLDCCY~CCYNAME","BLK_RESD_CCY":"CCY~NEG_RESD~PRODCOD~RESD_AMT"};

var multipleEntryPageSize = {"BLK_BRANCH_LIST" :"15" ,"BLK_CCY_LIST" :"15" ,"BLK_RESD_CCY" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_BRN_CCY_DISALLOW__All":"BLK_BRANCH_LIST~BLK_CCY_LIST~BLK_RESD_CCY"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_BRANCH_CCY_RESTRICTIONS">MODULE~PRDTYP~PRDCD~CCYLST~BRNLST~PRDDESC~CLASCD~CLASTYP~PRD~CLASSDESC</FN>'; 
msgxml += '      <FN PARENT="BLK_BRANCH_CCY_RESTRICTIONS" RELATION_TYPE="N" TYPE="BLK_BRANCH_LIST">PRDCD~BRNDISALOW~BRNNAME</FN>'; 
msgxml += '      <FN PARENT="BLK_BRANCH_CCY_RESTRICTIONS" RELATION_TYPE="N" TYPE="BLK_CCY_LIST">BGTDLCCY~PRODCD~SOLDCCY~CCYNAME</FN>'; 
msgxml += '      <FN PARENT="BLK_BRANCH_CCY_RESTRICTIONS" RELATION_TYPE="N" TYPE="BLK_RESD_CCY">CCY~NEG_RESD~PRODCOD~RESD_AMT</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_BRN_CCY_DISALLOW";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_BRANCH_CCY_RESTRICTIONS" : "","BLK_BRANCH_LIST" : "BLK_BRANCH_CCY_RESTRICTIONS~N","BLK_CCY_LIST" : "BLK_BRANCH_CCY_RESTRICTIONS~N","BLK_RESD_CCY" : "BLK_BRANCH_CCY_RESTRICTIONS~N"}; 

 var dataSrcLocationArray = new Array("BLK_BRANCH_CCY_RESTRICTIONS","BLK_BRANCH_LIST","BLK_CCY_LIST","BLK_RESD_CCY"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLCCYBRR.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLCCYBRR.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_BRANCH_CCY_RESTRICTIONS__PRDCD";
pkFields[0] = "BLK_BRANCH_CCY_RESTRICTIONS__PRDCD";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_BRANCH_CCY_RESTRICTIONS":["BRNLST","CCYLST","CLASCD"],"BLK_BRANCH_LIST":["BRNDISALOW"],"BLK_CCY_LIST":["BGTDLCCY"],"BLK_RESD_CCY":["CCY","NEG_RESD","RESD_AMT"]};
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
var lovInfoFlds = {"BLK_BRANCH_CCY_RESTRICTIONS__CLASCD__LOV_CLASS":["BLK_BRANCH_CCY_RESTRICTIONS__CLASCD~BLK_BRANCH_CCY_RESTRICTIONS__CLASSDESC~","BLK_BRANCH_CCY_RESTRICTIONS__MODULE!STRING","N~N",""],"BLK_BRANCH_LIST__BRNDISALOW__LOV_BRANCH":["BLK_BRANCH_LIST__BRNDISALOW~BLK_BRANCH_LIST__BRNNAME~","","N~N",""],"BLK_CCY_LIST__BGTDLCCY__LOV_CCY":["BLK_CCY_LIST__BGTDLCCY~BLK_CCY_LIST__CCYNAME~","","N~N",""],"BLK_RESD_CCY__CCY__LOV_CCY":["BLK_RESD_CCY__CCY~~","","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_BRANCH_LIST","BLK_CCY_LIST","BLK_RESD_CCY");
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

ArrFuncOrigin["OLCCYBRR"]="KERNEL";
ArrPrntFunc["OLCCYBRR"]="";
ArrPrntOrigin["OLCCYBRR"]="";
ArrRoutingType["OLCCYBRR"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLCCYBRR"]="N";
ArrCustomModified["OLCCYBRR"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_BRN_CCY_DISALLOW":"PRDCD~PRD~PRDDESC~MODULE~PRDTYP"};
var scrArgSource = {};
var scrArgVals = {"CVS_BRN_CCY_DISALLOW":"~~~~"};
var scrArgDest = {"CVS_BRN_CCY_DISALLOW":"BLK_BRANCH_CCY_RESTRICTIONS__PRDCD~BLK_BRANCH_CCY_RESTRICTIONS__PRD~BLK_BRANCH_CCY_RESTRICTIONS__PRDDESC~BLK_BRANCH_CCY_RESTRICTIONS__MODULE~BLK_BRANCH_CCY_RESTRICTIONS__PRDTYP"};
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