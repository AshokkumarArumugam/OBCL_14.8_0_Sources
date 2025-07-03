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
**  File Name          : SMDUSRDF_SYS.js
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
var fieldNameArray = {"BLK_USR":"STRTDATE~USRNAME~ENDDT~USRLANG~HOMEBRN~TIMELEVEL~AUTOAUTH~CUSTNO~USRID~USRCATEG~BRNSALLOW~PRDSALLOW~PRDSACCESALLOW~AMOUNT_FORMAT~DATE_FORMAT~MULTIBRN_ACCESS~OTHR_RMCUST_RESTR~USR_MANAGER~USER_MANAGER_NAME~ALERTS_ON_HOME~NUMBER_FORMAT_MASK~DASHBOARD_REQD~ACCCLSALLOW~FRONTEND_DEBUG_ENABLED~ACCESS_CONTROL~EXTN_ALERTS~GLALLOW~DEPT_CODE~DEPT_DESC~TAX_IDENTIFIER~STAFFACCRESTR~F10_REQD~F11_REQD~F12_REQD~MFI_USER~PIIALLOWED~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH","BLK_MSGSRIGHTS":"GEN~HLD~CNL~TSTINP~CHGNODE~CHGADDR~REL~REINS~CHGMEDIA~CHGPRIOR~BRNMOV~PRNT~TSTCHK~HLDAUTH~CNLAUTH~TSTINPAUTH~CHGNODEAUTH~CHGADDRAUTH~RELAUTH~REINSAUTH~CHGMEDIAAUTH~BRNMOVAUTH~CHGPRIORAUTH~FTUPL~CHGBRNIN~LNKCONT~CHGADDRIN~MOVQ~AUTHRGHTS~CHGMSG~CHGMSGAUTH~SUPPRESS~USRROLID~USRROLFLAG~CHGFORCCOVMATCH~CHGFORCRELFUND~DELMSG","BLK_USERACCCLASS":"ACCCLSUSRID~ACCCLS","BLK_USERBRANCHES":"BRNSBRN~BRNSUSRID~BRNSAUTHSTAT~BRNNAME","BLK_USERPRODUCTS":"PRODUSRID~PRDPRDCD~PRDDESC","BLK_USERACCESSPRODUCTS":"PRDACCESSUSRID~PRDACCESSPRDCD~PRDDESC","BLK_USERFUNCDISALLOW":"FUNCDISALLOWUSRID~FUNCDISALLOWFUNCID","BLK_USERROLE":"ROLEUSRID~ROLEAUTHSTAT~ROLEBRNCD~USRROLEID~MASTERROLEDESC","BLK_USERSFUNCTIONS":"USERFUNCUSRID~USERFUNCROLEID~USERFUNCBRNCD~USERFUNCFUNCID~USERFUNCSCTRL1~USERFUNCSCTRL2~USERFUNCSCTRL3~USERFUNCSCTRL4~USERFUNCSCTRL5~USERFUNCSCTRL6~USERFUNCSCTRL7~USERFUNCSCTRL8~USERFUNCSCTRL9~USERFUNCSCTRL10~USERFUNCSCTRL11~USERFUNCSCTRL12~USERFUNCSCTRL13~USERFUNCSCTRL14~USERFUNCSCTRL15~USERFUNCSCTRL16~USERFUNCSAUTHSTAT~USERFUNCSCTRSTR","BLK_CENTRALISATION":"CENROLEID~CENUSERID~CENROLDESC","BLK_DSHMST":"USRID~USRNAME","BLK_DSHDET":"ROLFNID~DESCRIPTION~SEQUENCE_NO~DBWHERECLAUSE~SHOW_IN_DASHBOARD~USER_ID","BLK_QUEUERIGHTS":"QUSRROLID~QUSRROLFLAG~QUEUE","BLK_WHERE_MASTER":"FUNCTION_ID~COLUMN_NAME~WHERE_CL~CONT","BLK_GROUP_RESTRICTION":"ACCESS_GROUP_ALLOWED","BLK_ACCESS_GROUP":"ACCESS_GROUP~USER_ID~GROUP_DESCRIPTION"};

var multipleEntryPageSize = {"BLK_USERTILLS" : "20 ","BLK_USERACCCLASS" : "20 ","BLK_USERBRANCHES" : "20 ","BLK_USERPRODUCTS" :"15" ,"BLK_QUEUERIGHTS" :"15" ,"BLK_USERACCESSPRODUCTS" :"15" ,"BLK_USERFUNCDISALLOW" : "20 ","BLK_USERROLE" : "20 ","BLK_USERSFUNCTIONS" : "20 ","BLK_CENTRALISATION" : "20 ","BLK_DSHDET" :"15" ,"BLK_ACCESS_GROUP" : "20 "};

var multipleEntrySVBlocks = "";

var tabMEBlks = {"__TAB_MAIN":"BLK_USERTILLS","CVS_ACC_CLASS__TAB_MAIN":"BLK_USERACCCLASS","CVS_BRANCHES__TAB_MAIN":"BLK_USERBRANCHES","CVS_PRODUCTS__TAB_MAIN":"BLK_USERPRODUCTS~BLK_USERACCESSPRODUCTS","CVS_RIGHTS__TAB_MAIN":"BLK_QUEUERIGHTS","CVS_FUNC_DISALOW__TAB_MAIN":"BLK_USERFUNCDISALLOW","CVS_ROLES__TAB_MAIN":"BLK_USERROLE","CVS_FUNCTIONS__TAB_MAIN":"BLK_USERSFUNCTIONS","CVS_CENTRALISATION__TAB_MAIN":"BLK_CENTRALISATION","CVS_DSHBD__TAB_MAIN":"BLK_DSHDET","CVS_ACCESS_GROUP__TAB_MAIN":"BLK_ACCESS_GROUP"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_USR">STRTDATE~USRNAME~ENDDT~USRLANG~HOMEBRN~TIMELEVEL~AUTOAUTH~CUSTNO~USRID~USRCATEG~BRNSALLOW~PRDSALLOW~PRDSACCESALLOW~AMOUNT_FORMAT~DATE_FORMAT~MULTIBRN_ACCESS~OTHR_RMCUST_RESTR~USR_MANAGER~USER_MANAGER_NAME~ALERTS_ON_HOME~NUMBER_FORMAT_MASK~DASHBOARD_REQD~ACCCLSALLOW~FRONTEND_DEBUG_ENABLED~ACCESS_CONTROL~EXTN_ALERTS~GLALLOW~DEPT_CODE~DEPT_DESC~TAX_IDENTIFIER~STAFFACCRESTR~F10_REQD~F11_REQD~F12_REQD~MFI_USER~PIIALLOWED~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
msgxml += '      <FN PARENT="BLK_USR" RELATION_TYPE="1" TYPE="BLK_MSGSRIGHTS">GEN~HLD~CNL~TSTINP~CHGNODE~CHGADDR~REL~REINS~CHGMEDIA~CHGPRIOR~BRNMOV~PRNT~TSTCHK~HLDAUTH~CNLAUTH~TSTINPAUTH~CHGNODEAUTH~CHGADDRAUTH~RELAUTH~REINSAUTH~CHGMEDIAAUTH~BRNMOVAUTH~CHGPRIORAUTH~FTUPL~CHGBRNIN~LNKCONT~CHGADDRIN~MOVQ~AUTHRGHTS~CHGMSG~CHGMSGAUTH~SUPPRESS~USRROLID~USRROLFLAG~CHGFORCCOVMATCH~CHGFORCRELFUND~DELMSG</FN>'; 
msgxml += '      <FN PARENT="BLK_USR" RELATION_TYPE="N" TYPE="BLK_USERACCCLASS">ACCCLSUSRID~ACCCLS</FN>'; 
msgxml += '      <FN PARENT="BLK_USR" RELATION_TYPE="N" TYPE="BLK_USERBRANCHES">BRNSBRN~BRNSUSRID~BRNSAUTHSTAT~BRNNAME</FN>'; 
msgxml += '      <FN PARENT="BLK_USR" RELATION_TYPE="N" TYPE="BLK_USERPRODUCTS">PRODUSRID~PRDPRDCD~PRDDESC</FN>'; 
msgxml += '      <FN PARENT="BLK_USR" RELATION_TYPE="N" TYPE="BLK_USERACCESSPRODUCTS">PRDACCESSUSRID~PRDACCESSPRDCD~PRDDESC</FN>'; 
msgxml += '      <FN PARENT="BLK_USR" RELATION_TYPE="N" TYPE="BLK_USERFUNCDISALLOW">FUNCDISALLOWUSRID~FUNCDISALLOWFUNCID</FN>'; 
msgxml += '      <FN PARENT="BLK_USR" RELATION_TYPE="N" TYPE="BLK_USERROLE">ROLEUSRID~ROLEAUTHSTAT~ROLEBRNCD~USRROLEID~MASTERROLEDESC</FN>'; 
msgxml += '      <FN PARENT="BLK_USR" RELATION_TYPE="N" TYPE="BLK_USERSFUNCTIONS">USERFUNCUSRID~USERFUNCROLEID~USERFUNCBRNCD~USERFUNCFUNCID~USERFUNCSCTRL1~USERFUNCSCTRL2~USERFUNCSCTRL3~USERFUNCSCTRL4~USERFUNCSCTRL5~USERFUNCSCTRL6~USERFUNCSCTRL7~USERFUNCSCTRL8~USERFUNCSCTRL9~USERFUNCSCTRL10~USERFUNCSCTRL11~USERFUNCSCTRL12~USERFUNCSCTRL13~USERFUNCSCTRL14~USERFUNCSCTRL15~USERFUNCSCTRL16~USERFUNCSAUTHSTAT~USERFUNCSCTRSTR</FN>'; 
msgxml += '      <FN PARENT="BLK_USR" RELATION_TYPE="N" TYPE="BLK_CENTRALISATION">CENROLEID~CENUSERID~CENROLDESC</FN>'; 
msgxml += '      <FN PARENT="BLK_USR" RELATION_TYPE="1" TYPE="BLK_DSHMST">USRID~USRNAME</FN>'; 
msgxml += '      <FN PARENT="BLK_DSHMST" RELATION_TYPE="N" TYPE="BLK_DSHDET">ROLFNID~DESCRIPTION~SEQUENCE_NO~DBWHERECLAUSE~SHOW_IN_DASHBOARD~USER_ID</FN>'; 
msgxml += '      <FN PARENT="BLK_MSGSRIGHTS" RELATION_TYPE="N" TYPE="BLK_QUEUERIGHTS">QUSRROLID~QUSRROLFLAG~QUEUE</FN>'; 
msgxml += '      <FN PARENT="BLK_DSHDET" RELATION_TYPE="1" TYPE="BLK_WHERE_MASTER">FUNCTION_ID~COLUMN_NAME~WHERE_CL~CONT</FN>'; 
msgxml += '      <FN PARENT="BLK_USR" RELATION_TYPE="1" TYPE="BLK_GROUP_RESTRICTION">ACCESS_GROUP_ALLOWED</FN>'; 
msgxml += '      <FN PARENT="BLK_USR" RELATION_TYPE="N" TYPE="BLK_ACCESS_GROUP">ACCESS_GROUP~USER_ID~GROUP_DESCRIPTION</FN>'; 
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
msgxml_sum += '      <FN PARENT="BLK_USR" RELATION_TYPE="1" TYPE="BLK_SUMMARY">AUTHSTAT~TXNSTAT~ENDDT~HOMEBRN~STRTDATE~TIMELEVEL~USRCATG~USRID~USRLANG~USRNAME</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "SMDUSRDF";
var defaultWhereClause = "NOT EXISTS (SELECT 1 FROM smtb_user U WHERE U.is_forgotten = 'Y' AND U.user_id = STVW_SMTB_USER.user_id) AND (SMPKS_MASK_USER.pr_setusrctx(global.user_id,'STSCIF') IN ('N','Y'))";
var defaultOrderByClause ="";
var multiBrnWhereClause ="NOT EXISTS (SELECT 1 FROM smtb_user U WHERE U.is_forgotten = 'Y' AND U.user_id = STVW_SMTB_USER.user_id) AND (SMPKS_MASK_USER.pr_setusrctx(global.user_id,'STSCIF') IN ('N','Y'))";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_SUMMARY";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_USR" : "","BLK_MSGSRIGHTS" : "BLK_USR~1","BLK_USERACCCLASS" : "BLK_USR~N","BLK_USERBRANCHES" : "BLK_USR~N","BLK_USERPRODUCTS" : "BLK_USR~N","BLK_USERACCESSPRODUCTS" : "BLK_USR~N","BLK_USERFUNCDISALLOW" : "BLK_USR~N","BLK_USERROLE" : "BLK_USR~N","BLK_USERSFUNCTIONS" : "BLK_USR~N","BLK_CENTRALISATION" : "BLK_USR~N","BLK_DSHMST" : "BLK_USR~1","BLK_DSHDET" : "BLK_DSHMST~N","BLK_QUEUERIGHTS" : "BLK_MSGSRIGHTS~N","BLK_WHERE_MASTER" : "BLK_DSHDET~1","BLK_GROUP_RESTRICTION" : "BLK_USR~1","BLK_ACCESS_GROUP" : "BLK_USR~N"}; 

 var dataSrcLocationArray = new Array("BLK_USR","BLK_MSGSRIGHTS","BLK_USERACCCLASS","BLK_USERBRANCHES","BLK_USERPRODUCTS","BLK_USERACCESSPRODUCTS","BLK_USERFUNCDISALLOW","BLK_USERROLE","BLK_USERSFUNCTIONS","BLK_CENTRALISATION","BLK_DSHMST","BLK_DSHDET","BLK_QUEUERIGHTS","BLK_WHERE_MASTER","BLK_GROUP_RESTRICTION","BLK_ACCESS_GROUP"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside SMDUSRDF.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside SMDUSRDF.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_USR__USRID";
pkFields[0] = "BLK_USR__USRID";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_ACCESS_GROUP":["ACCESS_GROUP"],"BLK_CENTRALISATION":["CENROLEID"],"BLK_DSHDET":["BTN_CLAUSE","DBWHERECLAUSE","SEQUENCE_NO","SHOW_IN_DASHBOARD"],"BLK_DSHMST":["USRID","USRNAME"],"BLK_GROUP_RESTRICTION":["ACCESS_GROUP_ALLOWED"],"BLK_MSGSRIGHTS":["AUTHRGHTS","BRNMOV","BRNMOVAUTH","CHGADDR","CHGADDRAUTH","CHGADDRIN","CHGBRNIN","CHGFORCCOVMATCH","CHGFORCRELFUND","CHGMEDIA","CHGMEDIAAUTH","CHGMSG","CHGMSGAUTH","CHGNODE","CHGNODEAUTH","CHGPRIOR","CHGPRIORAUTH","CNL","CNLAUTH","DELMSG","FTUPL","GEN","HLD","HLDAUTH","LNKCONT","MOVQ","PRNT","REINS","REINSAUTH","REL","RELAUTH","SUPPRESS","TSTCHK","TSTINP","TSTINPAUTH"],"BLK_QUEUERIGHTS":["QUEUE"],"BLK_USERACCCLASS":["ACCCLS"],"BLK_USERACCESSPRODUCTS":["PRDACCESSPRDCD"],"BLK_USERBRANCHES":["BRNSBRN"],"BLK_USERFUNCDISALLOW":["FUNCDISALLOWFUNCID"],"BLK_USERPRODUCTS":["PRDPRDCD"],"BLK_USERROLE":["ROLEBRNCD","USRROLEID"],"BLK_USERSFUNCTIONS":["USERFUNCBRNCD","USERFUNCFUNCID","USERFUNCSCTRL1","USERFUNCSCTRL10","USERFUNCSCTRL11","USERFUNCSCTRL12","USERFUNCSCTRL13","USERFUNCSCTRL14","USERFUNCSCTRL15","USERFUNCSCTRL16","USERFUNCSCTRL2","USERFUNCSCTRL3","USERFUNCSCTRL4","USERFUNCSCTRL5","USERFUNCSCTRL6","USERFUNCSCTRL7","USERFUNCSCTRL8","USERFUNCSCTRL9","USERFUNCSCTRSTR"],"BLK_USR":["ACCCLSALLOW","ACCESS_CONTROL","ALERTS_ON_HOME","AUTOAUTH","BRNSALLOW","BTN_ACCESS_GROUP","CUSTNO","DASHBOARD_REQD","DEPT_CODE","ENDDTI","EXTN_ALERTS","F10_REQD","F11_REQD","F12_REQD","FRONTEND_DEBUG_ENABLED","GLALLOW","HOMEBRN","MFI_USER","MULTIBRN_ACCESS","OTHR_RMCUST_RESTR","PIIALLOWED","PRDSACCESALLOW","PRDSALLOW","STAFFACCRESTR","STRTDATEI","TAX_IDENTIFIER","TIMELEVEL","USER_MANAGER_NAME","USRCATEG","USRLANG","USR_MANAGER"]};
var closeAmendArr = new Array(); 
var reopenAmendArr = new Array(); 
var reverseAmendArr = new Array(); 
var deleteAmendArr = new Array(); 
var rolloverAmendArr = new Array(); 
var confirmAmendArr = new Array(); 
var liquidateAmendArr = new Array(); 
//***** Fields Amendable while Query *****
var queryAmendArr = {"BLK_USR":["ALERTS_ON_HOME","DASHBOARD_REQD"]};
var authorizeAmendArr = new Array(); 
//----------------------------------------------------------------------------------------------------------------------

var subsysArr    = new Array(); 

//----------------------------------------------------------------------------------------------------------------------

//***** CODE FOR LOVs *****
//----------------------------------------------------------------------------------------------------------------------
var lovInfoFlds = {"BLK_USR__USRLANG__LOV_LANGUAGE":["BLK_USR__USRLANG~~","","N~N",""],"BLK_USR__HOMEBRN__LOV_HOME_BRANCH":["BLK_USR__HOMEBRN~~","","N~N",""],"BLK_USR__CUSTNO__LOV_CUSTOMER":["BLK_USR__CUSTNO~~~","","N~N~N",""],"BLK_USR__USRID__LOV_USERID":["BLK_USR__USRID~BLK_USR__USRNAME~","","N~N",""],"BLK_USR__USR_MANAGER__LOV_USER":["BLK_USR__USR_MANAGER~BLK_USR__USER_MANAGER_NAME~","BLK_USR__USRID!VARCHAR2~BLK_USR__USRID!VARCHAR2~BLK_USR__USRNAME!VARCHAR2","N~N",""],"BLK_USR__DEPT_CODE__LOV_DEPT_CODE":["BLK_USR__DEPT_CODE~BLK_USR__DEPT_DESC~","","N~N",""],"BLK_USERACCCLASS__ACCCLS__LOV_ACC_CLASS":["BLK_USERACCCLASS__ACCCLS~~","","N~N",""],"BLK_USERBRANCHES__BRNSBRN__LOV_BRANCHES":["BLK_USERBRANCHES__BRNSBRN~BLK_USERBRANCHES__BRNNAME~","","N~N",""],"BLK_USERPRODUCTS__PRDPRDCD__LOV_PRODUCTS":["BLK_USERPRODUCTS__PRDPRDCD~BLK_USERPRODUCTS__PRDDESC~","","N~N",""],"BLK_USERACCESSPRODUCTS__PRDACCESSPRDCD__LOV_ACCESS_PRODUCTS":["BLK_USERACCESSPRODUCTS__PRDACCESSPRDCD~BLK_USERACCESSPRODUCTS__PRDDESC~","","N~N",""],"BLK_USERFUNCDISALLOW__FUNCDISALLOWFUNCID__LOV_FUNC_DISALLOW":["BLK_USERFUNCDISALLOW__FUNCDISALLOWFUNCID~~","","N~N",""],"BLK_USERROLE__ROLEBRNCD__LOV_ROLE_BRANCH":["BLK_USERROLE__ROLEBRNCD~~","","N~N",""],"BLK_USERROLE__USRROLEID__LOV_ROLE":["BLK_USERROLE__USRROLEID~BLK_USERROLE__MASTERROLEDESC~","","N~N",""],"BLK_USERSFUNCTIONS__USERFUNCBRNCD__LOV_FUNC_BRANCH":["BLK_USERSFUNCTIONS__USERFUNCBRNCD~~","","N~N",""],"BLK_USERSFUNCTIONS__USERFUNCFUNCID__LOV_USER_FUNC":["BLK_USERSFUNCTIONS__USERFUNCFUNCID~~","","N~N",""],"BLK_CENTRALISATION__CENROLEID__LOV_CENTRAL_ROLES":["BLK_CENTRALISATION__CENROLEID~BLK_CENTRALISATION__CENROLDESC~","","N~N",""],"BLK_QUEUERIGHTS__QUEUE__LOV_QUEUES":["BLK_QUEUERIGHTS__QUEUE~~","","N~N",""],"BLK_WHERE_MASTER__COLUMN_NAME__LOV_FIELD_NAME":["BLK_WHERE_MASTER__COLUMN_NAME~","BLK_WHERE_MASTER__FUNCTION_ID!","N",""],"BLK_ACCESS_GROUP__ACCESS_GROUP__LOV_ACCESS_ACCESS_GROUP":["BLK_ACCESS_GROUP__ACCESS_GROUP~BLK_ACCESS_GROUP__GROUP_DESCRIPTION~","","N~N",""],"BLK_SUMMARY__HOMEBRN__LOV_HOME_BRANCH":["BLK_USR__HOMEBRN~~","","N~N",""],"BLK_SUMMARY__USRID__LOV_USERID":["BLK_USR__USRID~BLK_USR__USRNAME~","","N~N",""],"BLK_SUMMARY__USRLANG__LOV_LANGUAGE":["BLK_USR__USRLANG~~","","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_USERTILLS","BLK_USERACCCLASS","BLK_USERBRANCHES","BLK_USERPRODUCTS","BLK_QUEUERIGHTS","BLK_USERACCESSPRODUCTS","BLK_USERFUNCDISALLOW","BLK_USERROLE","BLK_USERSFUNCTIONS","BLK_CENTRALISATION","BLK_DSHDET","BLK_ACCESS_GROUP");
var multipleEntryArray = new Array();
var multipleEntryCells = new Array();
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY VIEW SINGLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR ATTACHED CALLFORMS *****
 //----------------------------------------------------------------------------------------------------------------------

 var CallFormArray= new Array("CSCFNUDF~BLK_USR"); 

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

ArrFuncOrigin["SMDUSRDF"]="KERNEL";
ArrPrntFunc["SMDUSRDF"]="";
ArrPrntOrigin["SMDUSRDF"]="";
ArrRoutingType["SMDUSRDF"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["SMDUSRDF"]="N";
ArrCustomModified["SMDUSRDF"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_DSHBD":"USRID~USRNAME","CVS_CLAUSE":"ROLFNID~DBWHERECLAUSE","CSCFNUDF":""};
var scrArgSource = {"CVS_DSHBD":"BLK_USR__USRID~BLK_USR__USRNAME","CVS_CLAUSE":"BLK_DSHDET__ROLFNID~BLK_DSHDET__DBWHERECLAUSE","CSCFNUDF":""};
var scrArgVals = {"CVS_DSHBD":"~","CVS_CLAUSE":"~","CSCFNUDF":""};
var scrArgDest = {"CVS_DSHBD":"BLK_DSHMST__USRID~BLK_DSHMST__USRNAME","CVS_CLAUSE":"BLK_WHERE_MASTER__FUNCTION_ID~BLK_WHERE_MASTER__WHERE_CL"};
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