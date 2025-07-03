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
**  File Name          : OLDBRMNT_SYS.js
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
var fieldNameArray = {"BLK_CORBRANCH":"APPLYHOLDRELCRITERIA~BANKCODE~BRANCHCODE~BRANCHNAME~CLDCODEUSDPAY~CLEARINGNETWRK~ECASUSPENSEBRN~ECASUSPENSERELCUST~ECAALLOWED~ECAQAUTOAUTH~ECASUSPENSEGL~ECASUSPENSEMISGROUP~CONTINGENTSUSPENSEGLSL~TXTSUSGLSLCONT~CONTSUSPENSEGLFCY~TXTSUSCONTFCY~COUNTRYOFFICE~CURRENTCYCLE~CURRENTPERIOD~CUSTOMERACCMSK~DEFAULTCHANNEL~DEFBANKOPERCODE~DELINQUENCYTRACKINGREQUIRED~EODTRNCODE~EODMISGRP~EODWASHGL~BACKVALUEDAYS~GENMT103~GICHKFORMSGSREQD~INTERDICTCHECKRQD~INTERDICTTIMEOUT~MULTIPLECHANNELS~NETTINGSUSPENSEGL~UINETTINGSUSPENSEGL~ONLINECIF~OPERATIONSCIF~PARTICIPANTPROCESSMETHOD~PNLSUSPENSEGLSL~PNLSUSPENSEGLSLFCY~PREVEODSTATUS~REPRICESUSPENSEGL~REVRCURREXDT~REVRCURREXRT~RTGSSERVICEIDENTIFIER~RTGSACCNTCIF~RTGSACCOUNT~RTGSMEMBER~SUPPRESSLCYMSG~SUSPENSEGLSL~SUSPENSEGLFCY~TXTSUSGLSLREAL~TXTSUSREALFCY~TELEXADDR~TIMEZONE~TREASURYCIF~TRADINGCIF~ECACUTOFFTIME~REFINANCEUNITBALANCES~WALKINCUST~DELETEUNAUTH~REF_GEN_PROCESS~CONTRACT_REF_FORMAT~PROCESS_REF_FORMAT~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH"};

var multipleEntryPageSize = {};

var multipleEntrySVBlocks = "";

var tabMEBlks = {};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_CORBRANCH">APPLYHOLDRELCRITERIA~BANKCODE~BRANCHCODE~BRANCHNAME~CLDCODEUSDPAY~CLEARINGNETWRK~ECASUSPENSEBRN~ECASUSPENSERELCUST~ECAALLOWED~ECAQAUTOAUTH~ECASUSPENSEGL~ECASUSPENSEMISGROUP~CONTINGENTSUSPENSEGLSL~TXTSUSGLSLCONT~CONTSUSPENSEGLFCY~TXTSUSCONTFCY~COUNTRYOFFICE~CURRENTCYCLE~CURRENTPERIOD~CUSTOMERACCMSK~DEFAULTCHANNEL~DEFBANKOPERCODE~DELINQUENCYTRACKINGREQUIRED~EODTRNCODE~EODMISGRP~EODWASHGL~BACKVALUEDAYS~GENMT103~GICHKFORMSGSREQD~INTERDICTCHECKRQD~INTERDICTTIMEOUT~MULTIPLECHANNELS~NETTINGSUSPENSEGL~UINETTINGSUSPENSEGL~ONLINECIF~OPERATIONSCIF~PARTICIPANTPROCESSMETHOD~PNLSUSPENSEGLSL~PNLSUSPENSEGLSLFCY~PREVEODSTATUS~REPRICESUSPENSEGL~REVRCURREXDT~REVRCURREXRT~RTGSSERVICEIDENTIFIER~RTGSACCNTCIF~RTGSACCOUNT~RTGSMEMBER~SUPPRESSLCYMSG~SUSPENSEGLSL~SUSPENSEGLFCY~TXTSUSGLSLREAL~TXTSUSREALFCY~TELEXADDR~TIMEZONE~TREASURYCIF~TRADINGCIF~ECACUTOFFTIME~REFINANCEUNITBALANCES~WALKINCUST~DELETEUNAUTH~REF_GEN_PROCESS~CONTRACT_REF_FORMAT~PROCESS_REF_FORMAT~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_CORBRANCH">AUTHSTAT~TXNSTAT~BRANCHCODE</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "OLDBRMNT";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_CORBRANCH";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_CORBRANCH" : ""}; 

 var dataSrcLocationArray = new Array("BLK_CORBRANCH"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLDBRMNT.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLDBRMNT.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_CORBRANCH__BRANCHCODE";
pkFields[0] = "BLK_CORBRANCH__BRANCHCODE";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_CORBRANCH":["APPLYHOLDRELCRITERIA","BANKCODE","CLDCODEUSDPAY","CLEARINGNETWRK","CONTINGENTSUSPENSEGLSL","CONTSUSPENSEGLFCY","COUNTRYOFFICE","CURRENTCYCLE","CURRENTPERIOD","CUSTOMERACCMSK","DEFAULTCHANNEL","DEFBANKOPERCODE","DELETEUNAUTH","DELINQUENCYTRACKINGREQUIRED","ECAALLOWED","ECACUTOFFTIMEI","ECAQAUTOAUTH","ECASUSPENSEBRN","ECASUSPENSEGL","ECASUSPENSEMISGROUP","ECASUSPENSERELCUST","EODMISGRP","EODTRNCODE","EODWASHGL","GENMT103","GICHKFORMSGSREQD","INTERDICTCHECKRQD","INTERDICTTIMEOUT","MULTIPLECHANNELS","NETTINGSUSPENSEGL","ONLINECIF","OPERATIONSCIF","PARTICIPANTPROCESSMETHOD","PNLSUSPENSEGLSL","PNLSUSPENSEGLSLFCY","PREVEODSTATUS","REFINANCEUNITBALANCES","REPRICESUSPENSEGL","REVRCURREXDTI","REVRCURREXRT","RTGSACCNTCIF","RTGSACCOUNT","RTGSMEMBER","RTGSSERVICEIDENTIFIER","SUPPRESSLCYMSG","SUSPENSEGLFCY","SUSPENSEGLSL","TELEXADDR","TIMEZONE","TRADINGCIF","TREASURYCIF","TXTSUSCONTFCY","TXTSUSGLSLCONT","TXTSUSGLSLREAL","TXTSUSREALFCY","UINETTINGSUSPENSEGL"]};
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
var lovInfoFlds = {"BLK_CORBRANCH__BRANCHCODE__LOV_BRANCH":["BLK_CORBRANCH__BRANCHCODE~BLK_CORBRANCH__BRANCHNAME~","","N~N",""],"BLK_CORBRANCH__CONTINGENTSUSPENSEGLSL__LOV_GLSL_CNT":["BLK_CORBRANCH__CONTINGENTSUSPENSEGLSL~BLK_CORBRANCH__TXTSUSGLSLCONT~","","N~N",""],"BLK_CORBRANCH__CONTSUSPENSEGLFCY__LOV_GL_CONT_FCY":["BLK_CORBRANCH__CONTSUSPENSEGLFCY~BLK_CORBRANCH__TXTSUSCONTFCY~","","N~N",""],"BLK_CORBRANCH__DEFAULTCHANNEL__LOV_DEFAULT_CHANNEL":["BLK_CORBRANCH__DEFAULTCHANNEL~~","","N~N",""],"BLK_CORBRANCH__EODTRNCODE__LOV_EOD_TRN_CODE":["BLK_CORBRANCH__EODTRNCODE~~","","N~N",""],"BLK_CORBRANCH__EODMISGRP__LOV_EOR_MIS_GRP":["BLK_CORBRANCH__EODMISGRP~~","","N~N",""],"BLK_CORBRANCH__EODWASHGL__LOV_WASH_GL":["BLK_CORBRANCH__EODWASHGL~","","N",""],"BLK_CORBRANCH__NETTINGSUSPENSEGL__LOV_SUSPENSE_GL":["BLK_CORBRANCH__NETTINGSUSPENSEGL~BLK_CORBRANCH__UINETTINGSUSPENSEGL~","","N~N",""],"BLK_CORBRANCH__ONLINECIF__LOV_ONLINE_CIF":["BLK_CORBRANCH__ONLINECIF~~","","N~N",""],"BLK_CORBRANCH__OPERATIONSCIF__LOV_OPERATIONS_CIF":["BLK_CORBRANCH__OPERATIONSCIF~~","","N~N",""],"BLK_CORBRANCH__REPRICESUSPENSEGL__LOV_REPRICE_SUSPENSE_GL":["BLK_CORBRANCH__REPRICESUSPENSEGL~~","","N~N",""],"BLK_CORBRANCH__SUSPENSEGLSL__LOV_GLSL":["BLK_CORBRANCH__SUSPENSEGLSL~BLK_CORBRANCH__TXTSUSGLSLREAL~","","N~N",""],"BLK_CORBRANCH__SUSPENSEGLFCY__LOV_GL_FCY":["BLK_CORBRANCH__SUSPENSEGLFCY~BLK_CORBRANCH__TXTSUSREALFCY~","","N~N",""],"BLK_CORBRANCH__TIMEZONE__LOV_TIME_ZONE":["BLK_CORBRANCH__TIMEZONE~~","","N~N",""],"BLK_CORBRANCH__TREASURYCIF__LOV_TREASURY_CIF":["BLK_CORBRANCH__TREASURYCIF~~","","N~N",""],"BLK_CORBRANCH__TRADINGCIF__LOV_TRADING_CIF":["BLK_CORBRANCH__TRADINGCIF~~","","N~N",""],"BLK_CORBRANCH__WALKINCUST__LOV_WALKINCUST":["BLK_CORBRANCH__WALKINCUST~~~","","N~N~N",""],"BLK_CORBRANCH__CONTRACT_REF_FORMAT__LOV_CONTRACT_FORMAT":["BLK_CORBRANCH__CONTRACT_REF_FORMAT~~","","N~N",""],"BLK_CORBRANCH__PROCESS_REF_FORMAT__LOV_PROCESS_FORMAT":["BLK_CORBRANCH__PROCESS_REF_FORMAT~~","","N~N",""]};
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

ArrFuncOrigin["OLDBRMNT"]="KERNEL";
ArrPrntFunc["OLDBRMNT"]="";
ArrPrntOrigin["OLDBRMNT"]="";
ArrRoutingType["OLDBRMNT"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLDBRMNT"]="N";
ArrCustomModified["OLDBRMNT"]="N";

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