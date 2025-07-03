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
**  File Name          : OLDXLUPD_SYS.js
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
var fieldNameArray = {"BLK_OLTBS_UPLOAD_XLDTLS":"BATCH_NO~BOOK_DATE~XL_PATH~TOTAL_CNT~ERR_CNT~MAKER_ID~MAKER_DT_STAMP~CHECKER_ID~CHECKER_DT_STAMP","BLK_OLTB_UPLOAD_ADJUSTMENT":"CONTRACT_REF_NO~BATCH_NO~BOOK_DATE~BRANCH~CURRENCY~CCY~ADJ_VALUE_DATE~ADJUSTMENT_AMOUNT~DR_GL_AC~CR_GL_AC~STATUS~MAKER_ID~MAKER_DT_STAMP~SERIAL_NO~DR_ACC_BRANCH~CR_ACC_BRANCH~ADJUSTMENT_TYPE~REVERSAL~REMARKS~REVERSAL_STATUS~REVERSAL_ESN~RECON_ID~INSTRUMENT_NO~COMPONENT~UPLOAD_DATE~S2_ADJUSTMENT~SOURCE_CODE~STATUS_DESC~EXPENSE_CODE~CUSIP_NO~FIRM_ACCT_MNEMONIC","BLK_OLTBS_UPLOAD_ADJ_EXCEPTION":"RCE_CODE~CONTRACT_REF_NO~BATCH_NO~BOOK_DATE~ERROR_CODE~ERROR_CODE_TYPE~ERROR_PARAMETERS~UPL_ROWID~MESSAGES"};

var multipleEntryPageSize = {"BLK_OLTB_UPLOAD_ADJUSTMENT" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_OLTB_UPLOAD_ADJUSTMENT"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_OLTBS_UPLOAD_XLDTLS">BATCH_NO~BOOK_DATE~XL_PATH~TOTAL_CNT~ERR_CNT~MAKER_ID~MAKER_DT_STAMP~CHECKER_ID~CHECKER_DT_STAMP</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTBS_UPLOAD_XLDTLS" RELATION_TYPE="N" TYPE="BLK_OLTB_UPLOAD_ADJUSTMENT">CONTRACT_REF_NO~BATCH_NO~BOOK_DATE~BRANCH~CURRENCY~CCY~ADJ_VALUE_DATE~ADJUSTMENT_AMOUNT~DR_GL_AC~CR_GL_AC~STATUS~MAKER_ID~MAKER_DT_STAMP~SERIAL_NO~DR_ACC_BRANCH~CR_ACC_BRANCH~ADJUSTMENT_TYPE~REVERSAL~REMARKS~REVERSAL_STATUS~REVERSAL_ESN~RECON_ID~INSTRUMENT_NO~COMPONENT~UPLOAD_DATE~S2_ADJUSTMENT~SOURCE_CODE~STATUS_DESC~EXPENSE_CODE~CUSIP_NO~FIRM_ACCT_MNEMONIC</FN>'; 
msgxml += '      <FN PARENT="BLK_OLTB_UPLOAD_ADJUSTMENT" RELATION_TYPE="1" TYPE="BLK_OLTBS_UPLOAD_ADJ_EXCEPTION">RCE_CODE~CONTRACT_REF_NO~BATCH_NO~BOOK_DATE~ERROR_CODE~ERROR_CODE_TYPE~ERROR_PARAMETERS~UPL_ROWID~MESSAGES</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_MAIN";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_OLTBS_UPLOAD_XLDTLS" : "","BLK_OLTB_UPLOAD_ADJUSTMENT" : "BLK_OLTBS_UPLOAD_XLDTLS~N","BLK_OLTBS_UPLOAD_ADJ_EXCEPTION" : "BLK_OLTB_UPLOAD_ADJUSTMENT~1"}; 

 var dataSrcLocationArray = new Array("BLK_OLTBS_UPLOAD_XLDTLS","BLK_OLTB_UPLOAD_ADJUSTMENT","BLK_OLTBS_UPLOAD_ADJ_EXCEPTION"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLDXLUPD.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLDXLUPD.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_OLTBS_UPLOAD_XLDTLS__BATCH_NO";
pkFields[0] = "BLK_OLTBS_UPLOAD_XLDTLS__BATCH_NO";
queryFields[1] = "BLK_OLTBS_UPLOAD_XLDTLS__BOOK_DATE";
pkFields[1] = "BLK_OLTBS_UPLOAD_XLDTLS__BOOK_DATE";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR AMENDABLE/SUBSYSTEM Fields *****
//----------------------------------------------------------------------------------------------------------------------
//***** Fields Amendable while Modification *****
var modifyAmendArr = {"BLK_OLTBS_UPLOAD_ADJ_EXCEPTION":["BATCH_NO","BOOK_DATEI","CONTRACT_REF_NO","ERROR_CODE","ERROR_CODE_TYPE","ERROR_PARAMETERS","MESSAGES","RCE_CODE","UPL_ROWID"],"BLK_OLTBS_UPLOAD_XLDTLS":["BATCH_NO","BOOK_DATEI","BTN_BROWSE","BTN_ERROR","CHECKER_DT_STAMP","CHECKER_ID","ERR_CNT","MAKER_DT_STAMP","MAKER_ID","TOTAL_CNT","XL_PATH"],"BLK_OLTB_UPLOAD_ADJUSTMENT":["ADJUSTMENT_AMOUNT","ADJUSTMENT_TYPE","ADJ_VALUE_DATEI","BATCH_NO","BOOK_DATEI","BRANCH","CCY","COMPONENT","CONTRACT_REF_NO","CR_ACC_BRANCH","CR_GL_AC","CURRENCY","CUSIP_NO","DR_ACC_BRANCH","DR_GL_AC","EXPENSE_CODE","FIRM_ACCT_MNEMONIC","INSTRUMENT_NO","MAKER_DT_STAMPI","MAKER_ID","RECON_ID","REMARKS","REVERSAL","REVERSAL_ESN","REVERSAL_STATUS","S2_ADJUSTMENT","SERIAL_NO","SOURCE_CODE","STATUS","STATUS_DESC","UPLOAD_DATEI"]};
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
var lovInfoFlds = {};
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
var multipleEntryIDs = new Array("BLK_OLTB_UPLOAD_ADJUSTMENT");
var multipleEntryArray = new Array();
var multipleEntryCells = new Array();
//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR MULTIPLE ENTRY VIEW SINGLE ENTRY BLOCKS *****
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//***** SCRIPT FOR ATTACHED CALLFORMS *****
 //----------------------------------------------------------------------------------------------------------------------

 var CallFormArray= new Array("OLCERONL~BLK_OLTBS_UPLOAD_XLDTLS"); 

 var CallFormRelat=new Array("OLTBS_UPLOAD_XLDTLS.BATCH_NO=OLTBS_UPLOAD_XLDTLS.BATCH_NO AND OLTBS_UPLOAD_XLDTLS.BOOK_DATE=OLTBS_UPLOAD_XLDTLS.BOOK_DATE"); 

 var CallRelatType= new Array("1"); 


 var ArrFuncOrigin=new Array();
 var ArrPrntFunc=new Array();
 var ArrPrntOrigin=new Array();
 var ArrRoutingType=new Array();


 // Code for Loading Cluster/Custom js File Starts
 var ArrClusterModified=new Array();
 var ArrCustomModified=new Array();
 // Code for Loading Cluster/Custom js File ends

ArrFuncOrigin["OLDXLUPD"]="KERNEL";
ArrPrntFunc["OLDXLUPD"]="";
ArrPrntOrigin["OLDXLUPD"]="";
ArrRoutingType["OLDXLUPD"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLDXLUPD"]="N";
ArrCustomModified["OLDXLUPD"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_MAIN":"BATCH_NO~BOOK_DATE","OLCERONL":"BATCH_NO~BOOK_DATE"};
var scrArgSource = {"OLCERONL":"BLK_OLTBS_UPLOAD_XLDTLS__BATCH_NO~BLK_OLTBS_UPLOAD_XLDTLS__BOOK_DATE"};
var scrArgVals = {"CVS_MAIN":"~","OLCERONL":"~"};
var scrArgDest = {"CVS_MAIN":"BLK_OLTBS_UPLOAD_XLDTLS__BATCH_NO~BLK_OLTBS_UPLOAD_XLDTLS__BOOK_DATE"};
//***** CODE FOR SUB-SYSTEM DEPENDENT  FIELDS   *****
//----------------------------------------------------------------------------------------------------------------------
var dpndntOnFlds = {"OLCERONL":""};
var dpndntOnSrvs = {"OLCERONL":""};
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