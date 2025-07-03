/***************************************************************************************************************************
**  This source is part of the FLEXCUBE Software Product. 
**  Copyright (c) 2008 ,2016, Oracle and/or its affiliates.
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
**  File Name          : LBCSKMTR_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  
	Changed By         : Akhila Samson
	Changed On         : 18-Oct-2020
	Search String      : Bug#32141652 
	Change Reason      : Added the code to display the participant details after click on the default button.
	
**  CHANGE LOG         : RAMYA M
**  Last modified on   : 28-02-2023
**  Reason             : OBCL_14.8_LS_REDWOOD_CHANGES
**  SEARCH STRING      : BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
****************************************************************************************************************************/
var fcjResponseDOM;
var fcjRequestDOM;
var gPrevAction;


function mySplit(str, ch) {
    var pos, start = 0, result = [];
    while ((pos = str.indexOf(ch, start)) != -1) {
        result.push(str.substring(start, pos));
        start = pos + 1;
    }
    result.push(str.substr(start));
    return(result);    
}
function getText(elem) {
	if (getBrowser().indexOf("IE") != -1) {
		return elem.text;
	}else{
		return elem.textContent;
	}
}
function fnfetch() {
 appendData(document.getElementById("TBLPageAll"));		
 gPrevAction=gAction;
 gAction='FETCH';
 fcjRequestDOM = buildUBSXml();
 fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
     if (fcjResponseDOM) {
        var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
        if (msgStatus == "FAILURE") {
            var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
        } else if (msgStatus == "WARNING" || msgStatus == "SUCCESS") {
              var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
            }
        }
        //var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
        //setDataXML(getXMLString(pureXMLDOM));
        //showData(dbStrRootTableName, 1);
    
    if (msgStatus == "FAILURE") {
        var returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'E');
        return false;
    }  
 gAction=gPrevAction;
 deleteAllRows('BLK_TRANCHE_SKIM_DTLS');//Bug#32141652 
var RecnodeList = selectNodes(fcjResponseDOM, '//REC[@TYPE="BLK_TRANCHE_SKIM_DTLS"]/FV');
if(RecnodeList.length>0){
		var RecnodeListLen = RecnodeList.length;
		for(var i = 0; i < RecnodeListLen; i++){
			var TextContents = mySplit(getText(RecnodeList[i]),"~");
			fnAddRow('BLK_TRANCHE_SKIM_DTLS');
			//if(TextContents[6]==document.getElementById("BLK_TRANCHE_SKIM_DTLS__CONTRACTREF_NO").value) 
			//{  
		
		      /* Bug#32141652 starts
			    document.getElementById("BLK_TRANCHE_SKIM_DTLS__PAYERPARTICIPANT").value = TextContents[5]; 
				document.getElementById("BLK_TRANCHE_SKIM_DTLS__PAYERCOMPONENT").value = TextContents[3]; 
				document.getElementById("BLK_TRANCHE_SKIM_DTLS__RECEVRPARTICIPANT").value = TextContents[8];
				document.getElementById("BLK_TRANCHE_SKIM_DTLS__RECVRCOMPONENT").value = TextContents[1]; 
				document.getElementById("BLK_TRANCHE_SKIM_DTLS__DEFAULTSKIM_RATEI").value = TextContents[7]; 				
				document.getElementById("BLK_TRANCHE_SKIM_DTLS__VERSIONNOI").value = TextContents[4]; 
				document.getElementById("BLK_TRANCHE_SKIM_DTLS__CONTRACTREF_NO").value = TextContents[6]; 
				document.getElementById("BLK_TRANCHE_SKIM_DTLS__DDPRODUCTCODE").value = TextContents[2];*/
                getTableObjForBlock("BLK_TRANCHE_SKIM_DTLS").tBodies[0].rows[i].cells[1].getElementsByTagName("oj-input-text")[0].value=TextContents[5];//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
                getTableObjForBlock("BLK_TRANCHE_SKIM_DTLS").tBodies[0].rows[i].cells[2].getElementsByTagName("oj-input-text")[0].value=TextContents[3];//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
				getTableObjForBlock("BLK_TRANCHE_SKIM_DTLS").tBodies[0].rows[i].cells[3].getElementsByTagName("oj-input-text")[0].value=TextContents[8];//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
				getTableObjForBlock("BLK_TRANCHE_SKIM_DTLS").tBodies[0].rows[i].cells[4].getElementsByTagName("oj-input-text")[0].value=TextContents[1];//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
				getTableObjForBlock("BLK_TRANCHE_SKIM_DTLS").tBodies[0].rows[i].cells[5].getElementsByTagName("oj-input-text")[0].value=TextContents[7];//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
				getTableObjForBlock("BLK_TRANCHE_SKIM_DTLS").tBodies[0].rows[i].cells[5].getElementsByTagName("oj-input-text")[1].value=TextContents[7];//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES				
				//Bug#32141652 Ends
			//}
		}
	}
 return true;
}

