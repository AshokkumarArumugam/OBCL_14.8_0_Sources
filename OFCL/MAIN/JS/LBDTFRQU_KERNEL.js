/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product
** Copyright ? 2008 - 2011  Oracle and/or its affiliates.  All rights reserved.
** 												
** No part of this work may be reproduced, stored in a retrieval system,
** adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise,
** translated in any language or computer language,
** without the prior written permission of Oracle and/or its affiliates.
**
**
** Oracle Financial Services Software Limited.
** Oracle Park, Off Western Express Highway,
** Goregaon (East),
** Mumbai - 400 063, India.
------------------------------------------------------------------------------------------
*/
/*
**  
**  Written by         : 
**  Date of creation   : 
**  File Name          : LBDTFRQU_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 
***************************************************************************************************************************
*/

//------------------------------------------------------------------------------
// VARIABLE DECLARATIONS
//------------------------------------------------------------------------------
var fcjRequestDOM;
var fcjResponseDOM;


function fnPostLoad_KERNEL(){
  fnEnableElement(document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLS_PROCESS"));
 
     return true;
}

function fnPostNew_KERNEL(){


        return true;
}
//
function fnPreUnlock_KERNEL(){
    

    
    return true;
}

function fnPostUnlock_KERNEL(){

                       //Code Fix for Bug No: 17070676 Ends
    return true;
}



function fnPreSave_KERNEL(){
    
        
   
       
    return true;
}

function fnPostSave_KERNEL()
{
    
    return true;
}


function fnSubmitPram() {
       
     
    
    var g_prev_gAction = gAction;
    appendData(document.getElementById("TBLPage" + strCurrentTabId));    
    if (gAction == "NEW" || gAction == "MODIFY") {
        if (selectNodes(dbDataDOM,"//UDTBS_FUNC_UDF_UPLOAD_DETAIL").length == 0) {
            gAction = "SUBMIT";
            fcjRequestDOM = buildUBSXml();
            fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);    
            if (fcjResponseDOM) {
                var msgStatus =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
                if (msgStatus == 'FAILURE') {
                    var messageNode = selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
                }else if (msgStatus == "WARNING" || msgStatus == "SUCCESS" ) {
                    var messageNode = selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
                }    
                var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
                setDataXML(getXMLString(pureXMLDOM));
                showData(dbStrRootTableName, 1);
                gAction = g_prev_gAction;
            }
            if(!fnProcessResponse())
                return false;    
        }
    }   
  
    return true;
}

function fnProcessChange() {
   
    return true;
}




      