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
**  File Name          : LBDPCMAP_SYS.js
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
var fieldNameArray = {"BLK_LBTMS_STP_PRODUCT_MAP":"LSCCY~LDBRANCH~LDPRODUCT~LDPRDCTDESC~LSPRODUCT~LSBRANCH~SELFPARTICIPANT~ADVBOOKINGAPPLICABLE~DFLTPRODUCTCODE~DFLTEXPENSECODE~DFLTTREASURYSOURCE~INTERFACETYPE~AGENCYDESC~SELFPARTICIPANTDESC~CCYDESC~BRANCH~DESKCODE~TRDSTNDRD~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH","BLK_LBTMS_STP_COMPONENT":"LDCOMPONENT~COMPONENTTYPE~LSCOMPONENT~LDCOMPONENTDESCRIPTION~DESCRIPTION~LSBRANCH~LSPRODUCT~SELF_PARTICIPANT~LDBRANCH~LDPRODUCT~LS_CCY~TRDSTNDRD"};

var multipleEntryPageSize = {"BLK_LBTMS_STP_COMPONENT" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_PRODCTMAP__TAB_MAIN":"BLK_LBTMS_STP_COMPONENT"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_LBTMS_STP_PRODUCT_MAP">LSCCY~LDBRANCH~LDPRODUCT~LDPRDCTDESC~LSPRODUCT~LSBRANCH~SELFPARTICIPANT~ADVBOOKINGAPPLICABLE~DFLTPRODUCTCODE~DFLTEXPENSECODE~DFLTTREASURYSOURCE~INTERFACETYPE~AGENCYDESC~SELFPARTICIPANTDESC~CCYDESC~BRANCH~DESKCODE~TRDSTNDRD~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
msgxml += '      <FN PARENT="BLK_LBTMS_STP_PRODUCT_MAP" RELATION_TYPE="N" TYPE="BLK_LBTMS_STP_COMPONENT">LDCOMPONENT~COMPONENTTYPE~LSCOMPONENT~LDCOMPONENTDESCRIPTION~DESCRIPTION~LSBRANCH~LSPRODUCT~SELF_PARTICIPANT~LDBRANCH~LDPRODUCT~LS_CCY~TRDSTNDRD</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_PRODCTMAP";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** FCJ XML FOR SUMMARY SCREEN *****
//----------------------------------------------------------------------------------------------------------------------
var msgxml_sum=""; 
msgxml_sum += '    <FLD>'; 
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_LBTMS_STP_PRODUCT_MAP">AUTHSTAT~TXNSTAT~LSBRANCH~LSPRODUCT~SELFPARTICIPANT~LSCCY~LDPRODUCT~LDBRANCH~TRDSTNDRD</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "LBDPCMAP";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_LBTMS_STP_PRODUCT_MAP";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_LBTMS_STP_PRODUCT_MAP" : "","BLK_LBTMS_STP_COMPONENT" : "BLK_LBTMS_STP_PRODUCT_MAP~N"}; 

 var dataSrcLocationArray = new Array("BLK_LBTMS_STP_PRODUCT_MAP","BLK_LBTMS_STP_COMPONENT"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside LBDPCMAP.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside LBDPCMAP.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_LBTMS_STP_PRODUCT_MAP__LSCCY";
pkFields[0] = "BLK_LBTMS_STP_PRODUCT_MAP__LSCCY";
queryFields[1] = "BLK_LBTMS_STP_PRODUCT_MAP__LDBRANCH";
pkFields[1] = "BLK_LBTMS_STP_PRODUCT_MAP__LDBRANCH";
queryFields[2] = "BLK_LBTMS_STP_PRODUCT_MAP__SELFPARTICIPANT";
pkFields[2] = "BLK_LBTMS_STP_PRODUCT_MAP__SELFPARTICIPANT";
queryFields[3] = "BLK_LBTMS_STP_PRODUCT_MAP__LSPRODUCT";
pkFields[3] = "BLK_LBTMS_STP_PRODUCT_MAP__LSPRODUCT";
queryFields[4] = "BLK_LBTMS_STP_PRODUCT_MAP__LSBRANCH";
pkFields[4] = "BLK_LBTMS_STP_PRODUCT_MAP__LSBRANCH";
queryFields[5] = "BLK_LBTMS_STP_PRODUCT_MAP__TRDSTNDRD";
pkFields[5] = "BLK_LBTMS_STP_PRODUCT_MAP__TRDSTNDRD";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_LBTMS_STP_COMPONENT":["COMPONENTTYPE","LDCOMPONENT"],"BLK_LBTMS_STP_PRODUCT_MAP":["LDPRDCTDESC","LDPRODUCT"]};
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
var lovInfoFlds = {"BLK_LBTMS_STP_PRODUCT_MAP__LSCCY__LOV_LS_CCY":["BLK_LBTMS_STP_PRODUCT_MAP__LSCCY~BLK_LBTMS_STP_PRODUCT_MAP__CCYDESC~","","N~N",""],"BLK_LBTMS_STP_PRODUCT_MAP__LDPRODUCT__LOV_LD_PRODUCT":["BLK_LBTMS_STP_PRODUCT_MAP__LDPRODUCT~BLK_LBTMS_STP_PRODUCT_MAP__LDPRDCTDESC~","BLK_LBTMS_STP_PRODUCT_MAP__LSPRODUCT!VARCHAR2~BLK_LBTMS_STP_PRODUCT_MAP__TRDSTNDRD!VARCHAR2~BLK_LBTMS_STP_PRODUCT_MAP__TRDSTNDRD!VARCHAR2","N~N",""],"BLK_LBTMS_STP_PRODUCT_MAP__LSPRODUCT__LOV_LS_PRODUCT":["BLK_LBTMS_STP_PRODUCT_MAP__LSPRODUCT~BLK_LBTMS_STP_PRODUCT_MAP__AGENCYDESC~","","N~N",""],"BLK_LBTMS_STP_PRODUCT_MAP__LSBRANCH__LOV_LS_BRANCH":["BLK_LBTMS_STP_PRODUCT_MAP__LSBRANCH~~","","N~N",""],"BLK_LBTMS_STP_PRODUCT_MAP__SELFPARTICIPANT__LOV_SELF_PARTICIPANT":["BLK_LBTMS_STP_PRODUCT_MAP__SELFPARTICIPANT~BLK_LBTMS_STP_PRODUCT_MAP__BRANCH~BLK_LBTMS_STP_PRODUCT_MAP__DESKCODE~BLK_LBTMS_STP_PRODUCT_MAP__SELFPARTICIPANTDESC~","","N~N~N~N",""],"BLK_LBTMS_STP_PRODUCT_MAP__DFLTPRODUCTCODE__LOV_DEFPRDCODE":["~BLK_LBTMS_STP_PRODUCT_MAP__DFLTPRODUCTCODE~","","N~N",""],"BLK_LBTMS_STP_PRODUCT_MAP__DFLTEXPENSECODE__LOV_DEFLTEXPENSECODE":["~BLK_LBTMS_STP_PRODUCT_MAP__DFLTEXPENSECODE~","","N~N",""],"BLK_LBTMS_STP_PRODUCT_MAP__DFLTTREASURYSOURCE__LOV_DFLT_TREASURY":["BLK_LBTMS_STP_PRODUCT_MAP__DFLTTREASURYSOURCE~~~","","N~N~N",""],"BLK_LBTMS_STP_COMPONENT__LDCOMPONENT__LOV_LDCOMPONENT":["BLK_LBTMS_STP_COMPONENT__LDCOMPONENT~BLK_LBTMS_STP_COMPONENT__LDCOMPONENTDESCRIPTION~","BLK_LBTMS_STP_PRODUCT_MAP__LDPRODUCT!VARCHAR2~BLK_LBTMS_STP_PRODUCT_MAP__LDPRODUCT!VARCHAR2~BLK_LBTMS_STP_PRODUCT_MAP__LDPRODUCT!VARCHAR2~BLK_LBTMS_STP_PRODUCT_MAP__LDPRODUCT!VARCHAR2","N~N",""],"BLK_LBTMS_STP_COMPONENT__LSCOMPONENT__LOV_LSCOMPONENT":["BLK_LBTMS_STP_COMPONENT__LSCOMPONENT~BLK_LBTMS_STP_COMPONENT__DESCRIPTION~","BLK_LBTMS_STP_PRODUCT_MAP__LSPRODUCT!VARCHAR2~BLK_LBTMS_STP_PRODUCT_MAP__LSPRODUCT!VARCHAR2~BLK_LBTMS_STP_PRODUCT_MAP__LSPRODUCT!VARCHAR2~BLK_LBTMS_STP_PRODUCT_MAP__LSPRODUCT!VARCHAR2","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_LBTMS_STP_COMPONENT");
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

ArrFuncOrigin["LBDPCMAP"]="KERNEL";
ArrPrntFunc["LBDPCMAP"]="";
ArrPrntOrigin["LBDPCMAP"]="";
ArrRoutingType["LBDPCMAP"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["LBDPCMAP"]="N";
ArrCustomModified["LBDPCMAP"]="N";

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
var actStageArry = {"QUERY":"2","NEW":"2","MODIFY":"2","AUTHORIZE":"2","DELETE":"2","CLOSE":"2","REOPEN":"2","REVERSE":"1","ROLLOVER":"1","CONFIRM":"1","LIQUIDATE":"1","SUMMARYQUERY":"2"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------