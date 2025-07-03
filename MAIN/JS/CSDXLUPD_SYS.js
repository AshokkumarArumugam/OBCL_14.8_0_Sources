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
**  File Name          : CSDXLUPD_SYS.js
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
var fieldNameArray = {"BLK_XLUPLDMSTR":"FUNCID~BATCHREFNO~USERID~NOUPLDED~NOSUCCFUL~NOFAILED~FILENAME~OVRDACT~PSTUPDSTS~GENORUPLD~SOURCE~ACTION","BLK_XLUPLDDTLS":"BATCHREFNO~RECID~RECKEY~UPLOADSTS~ERRS~RECNO","BLK_XLUPLDBLKDTLS":"BATCHREFNO~BLKNAME~XSDND~PARENTBLK~RELATION~RELATIONTYP~FLDNAMES1~FLDNAMES2~FLDNAMES3~FLDNAMES4~FLDNAMES5~FLDDESC1~FLDDESC2~FLDDESC3~FLDDESC4~FLDDESC5~FLDDESC6~FLDDESC7~FLDDESC8~FLDDESC9~FLDDESC10~BLKTITLE","BLK_XLUPLDBLKDATA":"BATCHREFNO~BLKNAME~RECNO~RECID~ACTCODE~PRECID~FLDVALS1~FLDVALS2~FLDVALS3~FLDVALS4~FLDVALS5~FLDVALS6~FLDVALS7~FLDVALS8~FLDVALS9~FLDVALS10~FLDVALS11~FLDVALS12~FLDVALS13~FLDVALS14~FLDVALS15~FLDVALS16~FLDVALS17~FLDVALS18~FLDVALS19~FLDVALS20~FLDVALS21~FLDVALS22~FLDVALS23~FLDVALS24~FLDVALS25~FLDVALS26~FLDVALS27~FLDVALS28~FLDVALS29~FLDVALS30~FLDVALS31~FLDVALS32~FLDVALS33~FLDVALS34~FLDVALS35~FLDVALS36~FLDVALS37~FLDVALS38~FLDVALS39~FLDVALS40~FLDVALS41~FLDVALS42~FLDVALS43~FLDVALS44~FLDVALS45~FLDVALS46~FLDVALS47~FLDVALS48~FLDVALS49~FLDVALS50~PRECNO","BLK_XLUPLDERRORS":"BATCHREFNO~RECID~RECKEY~ERRNO~ERRCD~ERRPARAM~ERRMSG~RECNO","BLK_XLUPLDDICTIONARY":"MAXLEN~MAXDEC~FLDDESC~BLKNO~BLKNAME~XSDNODE~FLDNAME~XSDTAG~MAND~READONLY~DATATYP~BATCHREFNO"};

var multipleEntryPageSize = {"BLK_XLUPLDDTLS" :"15" ,"BLK_XLUPLDERRORS" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_XLUPLDDTLS~BLK_XLUPLDERRORS"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_XLUPLDMSTR">FUNCID~BATCHREFNO~USERID~NOUPLDED~NOSUCCFUL~NOFAILED~FILENAME~OVRDACT~PSTUPDSTS~GENORUPLD~SOURCE~ACTION</FN>'; 
msgxml += '      <FN PARENT="BLK_XLUPLDMSTR" RELATION_TYPE="N" TYPE="BLK_XLUPLDDTLS">BATCHREFNO~RECID~RECKEY~UPLOADSTS~ERRS~RECNO</FN>'; 
msgxml += '      <FN PARENT="BLK_XLUPLDMSTR" RELATION_TYPE="N" TYPE="BLK_XLUPLDBLKDTLS">BATCHREFNO~BLKNAME~XSDND~PARENTBLK~RELATION~RELATIONTYP~FLDNAMES1~FLDNAMES2~FLDNAMES3~FLDNAMES4~FLDNAMES5~FLDDESC1~FLDDESC2~FLDDESC3~FLDDESC4~FLDDESC5~FLDDESC6~FLDDESC7~FLDDESC8~FLDDESC9~FLDDESC10~BLKTITLE</FN>'; 
msgxml += '      <FN PARENT="BLK_XLUPLDBLKDTLS" RELATION_TYPE="N" TYPE="BLK_XLUPLDBLKDATA">BATCHREFNO~BLKNAME~RECNO~RECID~ACTCODE~PRECID~FLDVALS1~FLDVALS2~FLDVALS3~FLDVALS4~FLDVALS5~FLDVALS6~FLDVALS7~FLDVALS8~FLDVALS9~FLDVALS10~FLDVALS11~FLDVALS12~FLDVALS13~FLDVALS14~FLDVALS15~FLDVALS16~FLDVALS17~FLDVALS18~FLDVALS19~FLDVALS20~FLDVALS21~FLDVALS22~FLDVALS23~FLDVALS24~FLDVALS25~FLDVALS26~FLDVALS27~FLDVALS28~FLDVALS29~FLDVALS30~FLDVALS31~FLDVALS32~FLDVALS33~FLDVALS34~FLDVALS35~FLDVALS36~FLDVALS37~FLDVALS38~FLDVALS39~FLDVALS40~FLDVALS41~FLDVALS42~FLDVALS43~FLDVALS44~FLDVALS45~FLDVALS46~FLDVALS47~FLDVALS48~FLDVALS49~FLDVALS50~PRECNO</FN>'; 
msgxml += '      <FN PARENT="BLK_XLUPLDDTLS" RELATION_TYPE="N" TYPE="BLK_XLUPLDERRORS">BATCHREFNO~RECID~RECKEY~ERRNO~ERRCD~ERRPARAM~ERRMSG~RECNO</FN>'; 
msgxml += '      <FN PARENT="BLK_XLUPLDMSTR" RELATION_TYPE="N" TYPE="BLK_XLUPLDDICTIONARY">MAXLEN~MAXDEC~FLDDESC~BLKNO~BLKNAME~XSDNODE~FLDNAME~XSDTAG~MAND~READONLY~DATATYP~BATCHREFNO</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_MAIN";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_XLUPLDMSTR" : "","BLK_XLUPLDDTLS" : "BLK_XLUPLDMSTR~N","BLK_XLUPLDBLKDTLS" : "BLK_XLUPLDMSTR~N","BLK_XLUPLDBLKDATA" : "BLK_XLUPLDBLKDTLS~N","BLK_XLUPLDERRORS" : "BLK_XLUPLDDTLS~N","BLK_XLUPLDDICTIONARY" : "BLK_XLUPLDMSTR~N"}; 

 var dataSrcLocationArray = new Array("BLK_XLUPLDMSTR","BLK_XLUPLDDTLS","BLK_XLUPLDBLKDTLS","BLK_XLUPLDBLKDATA","BLK_XLUPLDERRORS","BLK_XLUPLDDICTIONARY"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside CSDXLUPD.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside CSDXLUPD.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_XLUPLDMSTR__BATCHREFNO";
pkFields[0] = "BLK_XLUPLDMSTR__BATCHREFNO";
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
var lovInfoFlds = {"BLK_XLUPLDMSTR__FUNCID__LOV_FUNCTIONID":["BLK_XLUPLDMSTR__FUNCID~","","N",""]};
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
var multipleEntryIDs = new Array("BLK_XLUPLDDTLS","BLK_XLUPLDERRORS");
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

ArrFuncOrigin["CSDXLUPD"]="KERNEL";
ArrPrntFunc["CSDXLUPD"]="";
ArrPrntOrigin["CSDXLUPD"]="";
ArrRoutingType["CSDXLUPD"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["CSDXLUPD"]="N";
ArrCustomModified["CSDXLUPD"]="N";

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