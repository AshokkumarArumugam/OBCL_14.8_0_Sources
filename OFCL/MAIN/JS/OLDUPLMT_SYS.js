/***************************************************************************************************************************
**  This source is part of the Oracle Banking Software Product. 
**  Copyright (c) 2008 ,2025, Oracle and/or its affiliates.
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
**  File Name          : OLDUPLMT_SYS.js
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
var fieldNameArray = {"BLK_UPLOAD_MASTER":"UPLOADID~FUNCTIONID~STATUS~UPLOADDATE~UPLOADED~ACTIONCODE~UPLOADSTATUS~TOBEUPLOADED~ERRORCODE~SOURCECODE~BRANCH~USERID","BLK_EXT_CONTRACT_STAT":"BRANCH~SOURCE~PRODUCT~COUNTERPARTY~EXTERNALINITDATE~MODULE~EXTERNALREFNO~IMPORTSTATUS~CITICUBE_REF_NO~POSTIMPORTSTATUS~EXPORTSTATUS~USERID~JOBNO~CONTRACTREFNO~ERRCODE~ACTIONCODE~FUNCTION~EXTERNALSEQNO~UPLOAD_ID~ERRORMESG","BLK_UPLOAD_ST_MASTER":"USERID~ACTIONCODE~UPLOADID~MAINTSEQNO~BRANCHCD~SOURCECD~MAINTTYPE~UPLDSTATUS~UPLDINITDATE~SOURCCESEQNO","BLK_UPLOAD_EXCEPTION_CS_C":"SOURCEREF~ERRCODETYPE~BRN~UPLOADID1~ERRSERNO~ERRCODE~SOURCECD~SOURCESEQ~ERRPARAM","BLK_UPLOAD_EXCEPTION_CS_M":"SOURCEREF1~ERRCODETYPE1~BRN1~UPLOADID2~ERRSRLNO~ERRCOD~SOURCE1~SOURCESEQNO~ERRPARAM"};

var multipleEntryPageSize = {"BLK_EXT_CONTRACT_STAT" :"15" ,"BLK_UPLOAD_ST_MASTER" :"15" ,"BLK_UPLOAD_EXCEPTION_CS_C" :"15" ,"BLK_UPLOAD_EXCEPTION_CS_M" :"15" };

var multipleEntrySVBlocks = "";

var tabMEBlks = {"CVS_MAIN__TAB_MAIN":"BLK_EXT_CONTRACT_STAT~BLK_UPLOAD_EXCEPTION_CS_C","CVS_MAIN__TAB_2":"BLK_UPLOAD_ST_MASTER~BLK_UPLOAD_EXCEPTION_CS_M"};

var msgxml=""; 
msgxml += '    <FLD>'; 
msgxml += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_UPLOAD_MASTER">UPLOADID~FUNCTIONID~STATUS~UPLOADDATE~UPLOADED~ACTIONCODE~UPLOADSTATUS~TOBEUPLOADED~ERRORCODE~SOURCECODE~BRANCH~USERID</FN>'; 
msgxml += '      <FN PARENT="BLK_UPLOAD_MASTER" RELATION_TYPE="N" TYPE="BLK_EXT_CONTRACT_STAT">BRANCH~SOURCE~PRODUCT~COUNTERPARTY~EXTERNALINITDATE~MODULE~EXTERNALREFNO~IMPORTSTATUS~CITICUBE_REF_NO~POSTIMPORTSTATUS~EXPORTSTATUS~USERID~JOBNO~CONTRACTREFNO~ERRCODE~ACTIONCODE~FUNCTION~EXTERNALSEQNO~UPLOAD_ID~ERRORMESG</FN>'; 
msgxml += '      <FN PARENT="BLK_UPLOAD_MASTER" RELATION_TYPE="N" TYPE="BLK_UPLOAD_ST_MASTER">USERID~ACTIONCODE~UPLOADID~MAINTSEQNO~BRANCHCD~SOURCECD~MAINTTYPE~UPLDSTATUS~UPLDINITDATE~SOURCCESEQNO</FN>'; 
msgxml += '      <FN PARENT="BLK_EXT_CONTRACT_STAT" RELATION_TYPE="N" TYPE="BLK_UPLOAD_EXCEPTION_CS_C">SOURCEREF~ERRCODETYPE~BRN~UPLOADID1~ERRSERNO~ERRCODE~SOURCECD~SOURCESEQ~ERRPARAM</FN>'; 
msgxml += '      <FN PARENT="BLK_UPLOAD_ST_MASTER" RELATION_TYPE="N" TYPE="BLK_UPLOAD_EXCEPTION_CS_M">SOURCEREF1~ERRCODETYPE1~BRN1~UPLOADID2~ERRSRLNO~ERRCOD~SOURCE1~SOURCESEQNO~ERRPARAM</FN>'; 
msgxml += '    </FLD>'; 

var strScreenName = "CVS_MAIN";
var qryReqd = "Y";
var txnBranchFld = "" ;
var originSystem = "";
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR DATABINDING *****
//----------------------------------------------------------------------------------------------------------------------
 var relationArray = {"BLK_UPLOAD_MASTER" : "","BLK_EXT_CONTRACT_STAT" : "BLK_UPLOAD_MASTER~N","BLK_UPLOAD_ST_MASTER" : "BLK_UPLOAD_MASTER~N","BLK_UPLOAD_EXCEPTION_CS_C" : "BLK_EXT_CONTRACT_STAT~N","BLK_UPLOAD_EXCEPTION_CS_M" : "BLK_UPLOAD_ST_MASTER~N"}; 

 var dataSrcLocationArray = new Array("BLK_UPLOAD_MASTER","BLK_EXT_CONTRACT_STAT","BLK_UPLOAD_ST_MASTER","BLK_UPLOAD_EXCEPTION_CS_C","BLK_UPLOAD_EXCEPTION_CS_M"); 
 // Array of all Data Sources used in the screen 
//----------------------------------------------------------------------------------------------------------------------
//***** CODE FOR QUERY MODE *****
//----------------------------------------------------------------------------------------------------------------------
var detailRequired = true ;
var intCurrentQueryResultIndex = 0;
var intCurrentQueryRecordCount = 0;

var queryFields = new Array();    //Values should be set inside OLDUPLMT.js, in "BlockName__FieldName" format
var pkFields    = new Array();    //Values should be set inside OLDUPLMT.js, in "BlockName__FieldName" format
queryFields[0] = "BLK_UPLOAD_MASTER__UPLOADID";
pkFields[0] = "BLK_UPLOAD_MASTER__UPLOADID";
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
var lovInfoFlds = {"BLK_UPLOAD_MASTER__UPLOADID__LOV_UPLOAD_ID":["BLK_UPLOAD_MASTER__UPLOADID~~","","N~N",""]};
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
var multipleEntryIDs = new Array("BLK_EXT_CONTRACT_STAT","BLK_UPLOAD_ST_MASTER","BLK_UPLOAD_EXCEPTION_CS_C","BLK_UPLOAD_EXCEPTION_CS_M");
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

ArrFuncOrigin["OLDUPLMT"]="KERNEL";
ArrPrntFunc["OLDUPLMT"]="";
ArrPrntOrigin["OLDUPLMT"]="";
ArrRoutingType["OLDUPLMT"]="X";


 // Code for Loading Cluster/Custom js File Starts
ArrClusterModified["OLDUPLMT"]="N";
ArrCustomModified["OLDUPLMT"]="N";

 // Code for Loading Cluster/Custom js File ends


 /* Code For OBIEE functionalities */ 
var obScrArgName  = new Array(); 
var obScrArgSource  = new Array(); 
//***** CODE FOR SCREEN ARGS *****
//----------------------------------------------------------------------------------------------------------------------
var scrArgName = {"CVS_MAIN":"UPLOADID~ACTION_CODE"};
var scrArgSource = {};
var scrArgVals = {"CVS_MAIN":"~EXECUTEQUERY"};
var scrArgDest = {"CVS_MAIN":"BLK_UPLOAD_MASTER__UPLOADID~"};
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