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
**  File Name          : SSDUSRDF_SYS.js
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
var fieldNameArray = {"BLK_USER":"SCREEN_SAVER_TIMEOUT~BRANCH_USRPWD~LDAP_USER~PWD_CHANGED_ON~USER_ID~USER_EMAIL~USER_PASSWORD~SALT~FORCE_PASSWD_CHANGE~USER_NAME~HOME_ENTITY~MFA_ENBLD~MFA_ID~USER_STATUS~STATUS_CHANGED_ON~REFERENCE_NO~START_DATE~END_DATE~IS_FORGOTTEN~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH","BLK_RESTRICTIVE_PASS":"PASSWORD~ID~CATEGORY~BRANCH","BLK_USER_ENTITY":"ENTITY_ID~USER_ID~DESCR","BLK_USERLOG_DETAILS":"NO_SUCCESSIVE_LOGINS~NO_CUMULATIVE_LOGINS~LAST_SIGNED_ON~USER_ID"};

var multipleEntryPageSize = {"BLK_RESTRICTIVE_PASS" :"15" ,"BLK_USER_ENTITY" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_RESTR_PWD__TAB_MAIN":"BLK_RESTRICTIVE_PASS","CVS_MAIN__TAB_MAIN":"BLK_USER_ENTITY"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_USER">SCREEN_SAVER_TIMEOUT~BRANCH_USRPWD~LDAP_USER~PWD_CHANGED_ON~USER_ID~USER_EMAIL~USER_PASSWORD~SALT~FORCE_PASSWD_CHANGE~USER_NAME~HOME_ENTITY~MFA_ENBLD~MFA_ID~USER_STATUS~STATUS_CHANGED_ON~REFERENCE_NO~START_DATE~END_DATE~IS_FORGOTTEN~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN>'; 
msgxml += '      <FN PARENT="BLK_USER" RELATION_TYPE="N" TYPE="BLK_RESTRICTIVE_PASS">PASSWORD~ID~CATEGORY~BRANCH</FN>'; 
msgxml += '      <FN PARENT="BLK_USER" RELATION_TYPE="N" TYPE="BLK_USER_ENTITY">ENTITY_ID~USER_ID~DESCR</FN>'; 
msgxml += '      <FN PARENT="BLK_USER" RELATION_TYPE="1" TYPE="BLK_USERLOG_DETAILS">NO_SUCCESSIVE_LOGINS~NO_CUMULATIVE_LOGINS~LAST_SIGNED_ON~USER_ID</FN>'; 
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
msgxml_sum += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_STVW_SSTB_USER">AUTHSTAT~TXNSTAT~USER_ID~USER_NAME~USER_EMAIL~LDAP_USER~PWD_CHANGED_ON~FORCE_PASSWD_CHANGE~HOME_ENTITY</FN>'; 
msgxml_sum += '    </FLD>'; 

var detailFuncId = "SSDUSRDF";
var defaultWhereClause = "NOT EXISTS (SELECT 1 FROM sstb_user_forget_detail FU WHERE FU.process_status = 'P' AND FU.user_id = STVW_SSTB_USER.user_id)";
var defaultOrderByClause ="";
var multiBrnWhereClause ="NOT EXISTS (SELECT 1 FROM sstb_user_forget_detail FU WHERE FU.process_status = 'P' AND FU.user_id = STVW_SSTB_USER.user_id)";
var g_SummaryType ="S";
var g_SummaryBtnCount =0;
var g_SummaryBlock ="BLK_STVW_SSTB_USER";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_USER" : "","BLK_RESTRICTIVE_PASS" : "BLK_USER~N","BLK_USER_ENTITY" : "BLK_USER~N","BLK_USERLOG_DETAILS" : "BLK_USER~1"}; 

 var dataSrcLocationArray = new Array("BLK_USER","BLK_RESTRICTIVE_PASS","BLK_USER_ENTITY","BLK_USERLOG_DETAILS"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside SSDUSRDF.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside SSDUSRDF.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_USER__USER_ID";
pkFields[0] = "BLK_USER__USER_ID";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_RESTRICTIVE_PASS":["PASSWORD"],"BLK_USER_ENTITY":["DESCR","ENTITY_ID"],"BLK_USER":["END_DATEI","HOME_ENTITY","LDAP_USER","MFA_ENBLD","SCREEN_SAVER_TIMEOUT","START_DATEI","USER_EMAIL","USER_NAME","USER_PASSWORD","USER_STATUS"]};
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
var lovInfoFlds = {"BLK_USER__HOME_ENTITY__LOV_ENTITY":["BLK_USER__HOME_ENTITY~~","","N~N",""],"BLK_USER_ENTITY__ENTITY_ID__LOV_ENTITY":["BLK_USER_ENTITY__ENTITY_ID~BLK_USER_ENTITY__DESCR~","","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_RESTRICTIVE_PASS","BLK_USER_ENTITY");
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

ArrFuncOrigin["SSDUSRDF"]="KERNEL";
ArrPrntFunc["SSDUSRDF"]="";
ArrPrntOrigin["SSDUSRDF"]="";
ArrRoutingType["SSDUSRDF"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["SSDUSRDF"]="N";
ArrCustomModified["SSDUSRDF"]="N";

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
var actStageArry = {"QUERY":"2","NEW":"2","MODIFY":"2","AUTHORIZE":"2","DELETE":"2","CLOSE":"1","REOPEN":"1","REVERSE":"1","ROLLOVER":"1","CONFIRM":"1","LIQUIDATE":"1","SUMMARYQUERY":"2"};
//***** CODE FOR IMAGE FLDSET *****
//----------------------------------------------------------------------------------------------------------------------