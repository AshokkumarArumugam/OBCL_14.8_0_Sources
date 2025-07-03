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
**  File Name          : SMDROLDF_SYS.js
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
var fieldNameArray = {"BLK_ROLEMASTER":"ROLEIDENTIFICATION~MASTERROLEDESC~BRANCHROLE~BRANCHROLECAT~BRANCHROLELEVEL~BRANCHPWDRESETFREQ~AUTHORISERROLE~BRANCHVLTROLE~BRANCHESALLOWED~ACCCLASSALLOWED~CENTRALISATIONROLE~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH","BLK_ROLEDETAIL":"ROLEID~CONTROLSTRING~ROLEFUN~CONTROL1~CONTROL2~CONTROL3~CONTROL4~CONTROL5~CONTROL6~CONTROL7~CONTROL8~CONTROL9~CONTROL10~CONTROL11~CONTROL12~CONTROL13~CONTROL14~CONTROL15~CONTROL16~ATHSTAT~BRNCHCODE","BLK_ROLEDETAILB":"ROLEID1~CNTRLSTR~ROLEFUN~CONT1~CONT2~CONT3~CONT4~CONT5~CONT6~CONT7~CONT8~CONT9~CONT10~CONT11~CONT12~CONT13~CONT14~CONT15~CONT16~ATHATAT~BRHCODE","BLK_ROLEDETAILC":"ROLEID2~CNTRLSTR~ROLEFUN~CNTRL1~CNTRL2~CNTRL3~CNTRL4~CNTRL5~CNTRL6~CNTRL7~CNTRL8~CNTRL9~CNTRL10~CNTRL11~CNTRL12~CNTRL13~CNTRL14~CNTRL15~CNTRL16~ATHSTAT~BRNCHCODE","BLK_ROLEDETAILD":"ROLEID3~CNTRLSTRING~ROLEFUN~CNTRL1~CNTRL2~CNTRL3~CNTRL4~CNTRL5~CNTRL6~CNTRL7~CNTRL8~CNTRL9~CNTRL10~CNTRL11~CNTRL12~CNTRL13~CNTRL14~CNTRL15~CNTRL16~BRHCODE","BLK_ROLEBRANCHES":"ROLEID4~BRANCH~BRNNAME","BLK_ROLEACCCLASS":"ROLEID5~ACCCLS~DESCRIPTION","BLK_MSGCRIGHTS":"USRROLID~USRROLFLAG~CNL~CHGNODE~REL~CHGMEDIA~BRNMOV~HLD~TSTINP~CHGADDR~REINS~CHGPRIOR~CNLAUTH~CHGNODEAUTH~RELAUTH~CHGMEDIAAUTH~BRNMOVAUTH~HLDAUTH~TSTINPAUTH~CHGADDRAUTH~REINSAUTH~CHGPRIORAUTH~GEN~TSTCHK~LNKCONT~CHGBRNIN~CHGMSG~CHGFORCRELFUND~SUPPRESS~DELMSG~PRNT~FTUPL~MOVQ~CHGADDRIN~CHGMSGAUTH~AUTHRGHTS~CHGFORCCOVMATCH","BLK_QUEUERIGHTS":"QUSRROLID~QUSRROLFLAG~QUEUE","BLK_ROLEDETAILE":"ROLEFUN~BRANCHCODE~EDITABLE~CNTRLSTR~AUTH_STAT~CONTROL_1~CONTROL_10~CONTROL_11~CONTROL_12~CONTROL_13~CONTROL_14~CONTROL_15~CONTROL_16~CONTROL_2~CONTROL_3~CONTROL_4~CONTROL_6~CONTROL_7~CONTROL_8~CONTROL_9~ROLE_ID","BLK_ROLEDETAILF":"ROLEID~ROLEFUN~CNTRLSTR~CNTRL1~CNTRL10~CNTRL11~CNTRL12~CNTRL13~CNTRL14~CNTRL15~CNTRL16~CNTRL2~CNTRL3~CNTRL4~CNTRL5~CNTRL6~CNTRL7~CNTRL8~CNTRL9~ATHSTAT~BRNCHCODE"};

var multipleEntryPageSize = {"BLK_ROLEDETAIL" :"15" ,"BLK_ROLEDETAILB" :"15" ,"BLK_ROLEDETAILC" :"15" ,"BLK_ROLEDETAILD" :"15" ,"BLK_ROLEBRANCHES" :"15" ,"BLK_ROLEACCCLASS" :"15" ,"BLK_QUEUERIGHTS" :"15" ,"BLK_ROLEDETAILE" :"15" ,"BLK_ROLEDETAILF" : "30 "};

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAINTENANCE__TAB_MAIN":"BLK_ROLEDETAIL","CVS_REPORT__TAB_MAIN":"BLK_ROLEDETAILB","CVS_BATCH__TAB_MAIN":"BLK_ROLEDETAILC","CVS_ON_LINE__TAB_MAIN":"BLK_ROLEDETAILD","CVS_BRANCH_RESTRICTION__TAB_MAIN":"BLK_ROLEBRANCHES","CVS_ACCCLASS_RESTRICTION__TAB_MAIN":"BLK_ROLEACCCLASS","CVS_RIGHTS__TAB_MAIN":"BLK_QUEUERIGHTS","CVS_PROCESS__TAB_MAIN":"BLK_ROLEDETAILE","CVS_WEB_BRANCH__TAB_MAIN":"BLK_ROLEDETAILF"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_ROLEMASTER">ROLEIDENTIFICATION~MASTERROLEDESC~BRANCHROLE~BRANCHROLECAT~BRANCHROLELEVEL~BRANCHPWDRESETFREQ~AUTHORISERROLE~BRANCHVLTROLE~BRANCHESALLOWED~ACCCLASSALLOWED~CENTRALISATIONROLE~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
msgxml += '      <FN PARENT="BLK_ROLEMASTER" RELATION_TYPE="N" TYPE="BLK_ROLEDETAIL">ROLEID~CONTROLSTRING~ROLEFUN~CONTROL1~CONTROL2~CONTROL3~CONTROL4~CONTROL5~CONTROL6~CONTROL7~CONTROL8~CONTROL9~CONTROL10~CONTROL11~CONTROL12~CONTROL13~CONTROL14~CONTROL15~CONTROL16~ATHSTAT~BRNCHCODE</FN>'; 
msgxml += '      <FN PARENT="BLK_ROLEMASTER" RELATION_TYPE="N" TYPE="BLK_ROLEDETAILB">ROLEID1~CNTRLSTR~ROLEFUN~CONT1~CONT2~CONT3~CONT4~CONT5~CONT6~CONT7~CONT8~CONT9~CONT10~CONT11~CONT12~CONT13~CONT14~CONT15~CONT16~ATHATAT~BRHCODE</FN>'; 
msgxml += '      <FN PARENT="BLK_ROLEMASTER" RELATION_TYPE="N" TYPE="BLK_ROLEDETAILC">ROLEID2~CNTRLSTR~ROLEFUN~CNTRL1~CNTRL2~CNTRL3~CNTRL4~CNTRL5~CNTRL6~CNTRL7~CNTRL8~CNTRL9~CNTRL10~CNTRL11~CNTRL12~CNTRL13~CNTRL14~CNTRL15~CNTRL16~ATHSTAT~BRNCHCODE</FN>'; 
msgxml += '      <FN PARENT="BLK_ROLEMASTER" RELATION_TYPE="N" TYPE="BLK_ROLEDETAILD">ROLEID3~CNTRLSTRING~ROLEFUN~CNTRL1~CNTRL2~CNTRL3~CNTRL4~CNTRL5~CNTRL6~CNTRL7~CNTRL8~CNTRL9~CNTRL10~CNTRL11~CNTRL12~CNTRL13~CNTRL14~CNTRL15~CNTRL16~BRHCODE</FN>'; 
msgxml += '      <FN PARENT="BLK_ROLEMASTER" RELATION_TYPE="N" TYPE="BLK_ROLEBRANCHES">ROLEID4~BRANCH~BRNNAME</FN>'; 
msgxml += '      <FN PARENT="BLK_ROLEMASTER" RELATION_TYPE="N" TYPE="BLK_ROLEACCCLASS">ROLEID5~ACCCLS~DESCRIPTION</FN>'; 
msgxml += '      <FN PARENT="BLK_ROLEMASTER" RELATION_TYPE="1" TYPE="BLK_MSGCRIGHTS">USRROLID~USRROLFLAG~CNL~CHGNODE~REL~CHGMEDIA~BRNMOV~HLD~TSTINP~CHGADDR~REINS~CHGPRIOR~CNLAUTH~CHGNODEAUTH~RELAUTH~CHGMEDIAAUTH~BRNMOVAUTH~HLDAUTH~TSTINPAUTH~CHGADDRAUTH~REINSAUTH~CHGPRIORAUTH~GEN~TSTCHK~LNKCONT~CHGBRNIN~CHGMSG~CHGFORCRELFUND~SUPPRESS~DELMSG~PRNT~FTUPL~MOVQ~CHGADDRIN~CHGMSGAUTH~AUTHRGHTS~CHGFORCCOVMATCH</FN>'; 
msgxml += '      <FN PARENT="BLK_ROLEMASTER" RELATION_TYPE="N" TYPE="BLK_QUEUERIGHTS">QUSRROLID~QUSRROLFLAG~QUEUE</FN>'; 
msgxml += '      <FN PARENT="BLK_ROLEMASTER" RELATION_TYPE="N" TYPE="BLK_ROLEDETAILE">ROLEFUN~BRANCHCODE~EDITABLE~CNTRLSTR~AUTH_STAT~CONTROL_1~CONTROL_10~CONTROL_11~CONTROL_12~CONTROL_13~CONTROL_14~CONTROL_15~CONTROL_16~CONTROL_2~CONTROL_3~CONTROL_4~CONTROL_6~CONTROL_7~CONTROL_8~CONTROL_9~ROLE_ID</FN>'; 
msgxml += '      <FN PARENT="BLK_ROLEMASTER" RELATION_TYPE="N" TYPE="BLK_ROLEDETAILF">ROLEID~ROLEFUN~CNTRLSTR~CNTRL1~CNTRL10~CNTRL11~CNTRL12~CNTRL13~CNTRL14~CNTRL15~CNTRL16~CNTRL2~CNTRL3~CNTRL4~CNTRL5~CNTRL6~CNTRL7~CNTRL8~CNTRL9~ATHSTAT~BRNCHCODE</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_ROLEMASTER">AUTHSTAT~TXNSTAT~ROLEIDENTIFICATION~MASTERROLEDESC</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "SMDROLDF";
var defaultWhereClause = "";
var defaultOrderByClause ="";
var multiBrnWhereClause ="";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_ROLEMASTER";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_ROLEMASTER" : "","BLK_ROLEDETAIL" : "BLK_ROLEMASTER~N","BLK_ROLEDETAILB" : "BLK_ROLEMASTER~N","BLK_ROLEDETAILC" : "BLK_ROLEMASTER~N","BLK_ROLEDETAILD" : "BLK_ROLEMASTER~N","BLK_ROLEBRANCHES" : "BLK_ROLEMASTER~N","BLK_ROLEACCCLASS" : "BLK_ROLEMASTER~N","BLK_MSGCRIGHTS" : "BLK_ROLEMASTER~1","BLK_QUEUERIGHTS" : "BLK_ROLEMASTER~N","BLK_ROLEDETAILE" : "BLK_ROLEMASTER~N","BLK_ROLEDETAILF" : "BLK_ROLEMASTER~N"}; 

 var dataSrcLocationArray = new Array("BLK_ROLEMASTER","BLK_ROLEDETAIL","BLK_ROLEDETAILB","BLK_ROLEDETAILC","BLK_ROLEDETAILD","BLK_ROLEBRANCHES","BLK_ROLEACCCLASS","BLK_MSGCRIGHTS","BLK_QUEUERIGHTS","BLK_ROLEDETAILE","BLK_ROLEDETAILF"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside SMDROLDF.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside SMDROLDF.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_ROLEMASTER__ROLEIDENTIFICATION";
pkFields[0] = "BLK_ROLEMASTER__ROLEIDENTIFICATION";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_MSGCRIGHTS":["AUTHRGHTS","BRNMOV","BRNMOVAUTH","CHGADDR","CHGADDRAUTH","CHGADDRIN","CHGBRNIN","CHGFORCCOVMATCH","CHGFORCRELFUND","CHGMEDIA","CHGMEDIAAUTH","CHGMSG","CHGMSGAUTH","CHGNODE","CHGNODEAUTH","CHGPRIOR","CHGPRIORAUTH","CNL","CNLAUTH","DELMSG","FTUPL","GEN","HLD","HLDAUTH","LNKCONT","MOVQ","PRNT","REINS","REINSAUTH","REL","RELAUTH","SUPPRESS","TSTCHK","TSTINP","TSTINPAUTH"],"BLK_QUEUERIGHTS":["QUEUE"],"BLK_ROLEACCCLASS":["ACCCLS"],"BLK_ROLEBRANCHES":["BRANCH"],"BLK_ROLEDETAILB":["ATHATAT","BRHCODE","CNTRLSTR","CONT1","CONT10","CONT11","CONT12","CONT13","CONT14","CONT15","CONT16","CONT2","CONT3","CONT4","CONT5","CONT6","CONT7","CONT8","CONT9","ROLEFUN"],"BLK_ROLEDETAILC":["ATHSTAT","CNTRL1","CNTRL10","CNTRL11","CNTRL12","CNTRL13","CNTRL14","CNTRL15","CNTRL16","CNTRL2","CNTRL3","CNTRL4","CNTRL5","CNTRL6","CNTRL7","CNTRL8","CNTRL9","CNTRLSTR","ROLEFUN"],"BLK_ROLEDETAILD":["CNTRL1","CNTRL10","CNTRL11","CNTRL12","CNTRL13","CNTRL14","CNTRL15","CNTRL16","CNTRL2","CNTRL3","CNTRL4","CNTRL5","CNTRL6","CNTRL7","CNTRL8","CNTRL9","CNTRLSTRING","ROLEFUN"],"BLK_ROLEDETAILE":["CNTRLSTR","CONTROL_1","CONTROL_10","CONTROL_11","CONTROL_12","CONTROL_13","CONTROL_14","CONTROL_15","CONTROL_16","CONTROL_2","CONTROL_3","CONTROL_4","CONTROL_6","CONTROL_7","CONTROL_8","CONTROL_9","EDITABLE","ROLEFUN"],"BLK_ROLEDETAILF":["CNTRL1","CNTRL10","CNTRL11","CNTRL12","CNTRL13","CNTRL14","CNTRL15","CNTRL16","CNTRL2","CNTRL3","CNTRL4","CNTRL5","CNTRL6","CNTRL7","CNTRL8","CNTRL9","CNTRLSTR","ROLEFUN"],"BLK_ROLEDETAIL":["ATHSTAT","BRNCHCODE","CONTROL1","CONTROL10","CONTROL11","CONTROL12","CONTROL13","CONTROL14","CONTROL15","CONTROL16","CONTROL2","CONTROL3","CONTROL4","CONTROL5","CONTROL6","CONTROL7","CONTROL8","CONTROL9","CONTROLSTRING","ROLEFUN"],"BLK_ROLEMASTER":["ACCCLASSALLOWED","AUTHORISERROLE","BRANCHESALLOWED","BRANCHPWDRESETFREQ","BRANCHROLE","BRANCHROLELEVEL","BRANCHVLTROLE"]};
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
var lovInfoFlds = {"BLK_ROLEMASTER__ROLEIDENTIFICATION__LOV_ROLEID":["BLK_ROLEMASTER__ROLEIDENTIFICATION~BLK_ROLEMASTER__MASTERROLEDESC~","","N~N",""],"BLK_ROLEMASTER__UDF__LOV_LIMIT":["~~","BLK_ROLEMASTER__ROLEIDENTIFICATION!STRING","N~N",""],"BLK_ROLEDETAIL__ROLEFUN__LOV_MAINTENANCE":["BLK_ROLEDETAIL__ROLEFUN~~","","N~N",""],"BLK_ROLEDETAILB__ROLEFUN__LOV_REPORTS":["BLK_ROLEDETAILB__ROLEFUN~~","","N~N",""],"BLK_ROLEDETAILC__ROLEFUN__LOV_BATCH":["BLK_ROLEDETAILC__ROLEFUN~~","","N~N",""],"BLK_ROLEDETAILD__ROLEFUN__LOV_ON_LINE":["BLK_ROLEDETAILD__ROLEFUN~~","","N~N",""],"BLK_ROLEBRANCHES__BRANCH__LOV_BRANCH_RESTRICTION":["BLK_ROLEBRANCHES__BRANCH~BLK_ROLEBRANCHES__BRNNAME~","","N~N",""],"BLK_ROLEACCCLASS__ACCCLS__LOV_ACCCLASS_RESTRICTION":["BLK_ROLEACCCLASS__ACCCLS~BLK_ROLEACCCLASS__DESCRIPTION~","","N~N",""],"BLK_QUEUERIGHTS__QUEUE__LOV_QUEUES":["BLK_QUEUERIGHTS__QUEUE~~","","N~N",""],"BLK_ROLEDETAILE__ROLEFUN__LOV_PROCESS":["BLK_ROLEDETAILE__ROLEFUN~~~","","N~N~N",""],"BLK_ROLEDETAILF__ROLEFUN__LOV_WEB_BRANCH":["BLK_ROLEDETAILF__ROLEFUN~~~","","N~N~N",""]};
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
var multipleEntryIDs = new Array("BLK_ROLEDETAIL","BLK_ROLEDETAILB","BLK_ROLEDETAILC","BLK_ROLEDETAILD","BLK_ROLEBRANCHES","BLK_ROLEACCCLASS","BLK_QUEUERIGHTS","BLK_ROLEDETAILE","BLK_ROLEDETAILF");
var multipleEntryArray = new Array();
var multipleEntryCells = new Array();
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY VIEW SINGLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR ATTACHED CALLFORMS *****
 //----------------------------------------------------------------------------------------------------------------------

 var CallFormArray= new Array("CSCFNUDF~BLK_ROLEMASTER"); 

 var CallFormRelat=new Array(""); 

 var CallRelatType= new Array("N"); 


 var ArrFuncOrigin=new Array();
 var ArrPrntFunc=new Array();
 var ArrPrntOrigin=new Array();
 var ArrRoutingType=new Array();


 // Code for Loading Cluster/Custom js File Starts
 var ArrClusterModified=new Array();
 var ArrCustomModified=new Array();
 // Code for Loading Cluster/Custom js File ends

ArrFuncOrigin["SMDROLDF"]="KERNEL";
ArrPrntFunc["SMDROLDF"]="";
ArrPrntOrigin["SMDROLDF"]="";
ArrRoutingType["SMDROLDF"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["SMDROLDF"]="N";
ArrCustomModified["SMDROLDF"]="N";

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