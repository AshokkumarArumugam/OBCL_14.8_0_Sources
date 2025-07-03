/***************************************************************************************************************************
**  This source is part of the FLEXCUBE Software Product. 
**  Copyright (c) 2008 ,2017, Oracle and/or its affiliates.
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
**  File Name          : OLCSPROL_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 

**Changed By         : MOHAN PAL
**Date               : 21-MAY-2021
**Change Description : RFR FIELDS IN SPLIT ROLLOVER CALLFORM
**Search String      : Bug#32902729 

****************************************************************************************************************************/

//Bug#32902729 CHANGES STARTS
function FN_DEFAULT()
{
    var g_prev_gAction = gAction;
    gAction = "DEFCOMPONENT";	
	
    appendData();
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
	
	
   var orgDom = loadXMLDoc(getXMLString(dbDataDOM));
	
	if (fcjResponseDOM) {
        var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
        if (msgStatus == "FAILURE") {
            var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
        } else if (msgStatus == "WARNING" || msgStatus == "SUCCESS") {
              var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
            }
        }
        var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
        setDataXML(getXMLString(pureXMLDOM));
        showData(dbStrRootTableName, 1);
	
    if (dbDataDOM.documentElement.nodeName != dataSrcLocationArray[0]) {
        var blockId = 'BLK_OLTBS_CONTRACT__SR' ;
	 var removeNode = selectNodes(orgDom, getXPathQuery(blockId));  
        for (var i = 0; i < removeNode.length; i++) {
            removeNode[i].parentNode.removeChild(removeNode[i]);
        }
        var parentNode = relationArray[dbDataDOM.documentElement.nodeName]; 
        if(parentNode.indexOf("~") == -1){            
            orgDom.documentElement.appendChild(getCloneDocElement(dbDataDOM.documentElement));
        }else{
            var parentNodename =parentNode.substring(0,parentNode.indexOf("~"));
            var xpathquery = getXPathQuery(parentNodename) ;
            xpathquery = xpathquery + "[@ID=" + dbIndexArray[parentNodename] + "]";            
            selectSingleNode(orgDom,xpathquery).appendChild(getCloneDocElement(dbDataDOM.documentElement));
        }
        dbDataDOM = loadXMLDoc(getXMLString(orgDom));
        showData();
    }
	
	
	
	
    gAction = g_prev_gAction;
	fnSubScreenMain('OLCSPROL', 'OLCSPROL', 'CVS_INT_DTLS', false);
return true;
}

function fnPostLoad_CVS_INT_DTLS_KERNEL(){
getElementsByOjName('BTN_ADD_BLK_CONTRACT_ROLL_INT_RATES')[0].style.visibility = 'hidden';
getElementsByOjName('BTN_REMOVE_BLK_CONTRACT_ROLL_INT_RATES')[0].style.visibility = 'hidden';
return true;
}

function fnPostLoad_CVS_SPROLL_KERNEL(screenArgs){
	
	
	var rowRef=getTableObjForBlock("BLK_CONTRACT_SPLIT_ROLLOVER").tBodies[0].rows;  
		
		var append_index="";
		 for(var rowIndex =0; rowIndex < rowRef.length; rowIndex++)
      {
		  if(rowIndex>0){
			  append_index=rowIndex;
		  }
		if(append_index == ""){
		fnEnableElement(document.getElementById("BLK_CONTRACT_SPLIT_ROLLOVER__BTNDEFAULT"+append_index));
		}else {
			fnEnableElement(document.getElementById("BLK_CONTRACT_SPLIT_ROLLOVER__BTNDEFAULTRC"+append_index));
		}
       }
	   return true;
}
//Bug#32902729 CHANGES ENDS
