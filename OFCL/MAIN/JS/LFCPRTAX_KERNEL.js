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
**  File Name          : CFCPRTAX_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 

	**Changed By         : Vigneshram S
	**Date               : 18-FEB-2019
	**Change Description : Added code to hidden the value plus button on tax details.
	**Search String      : Bug#29359335
****************************************************************************************************************************/
function fnDefaultFromScheme()
{
    var g_prev_gAction = gAction;
    gAction = "DFTFRSCM";
    appendData();
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
    var orgDom = loadXMLDoc(getXMLString(dbDataDOM));
    if (!fnProcessResponse()) {
        gAction = g_prev_gAction;
        dbDataDOM = loadXMLDoc(getXMLString(orgDom));
        return false;
    }
    if (dbDataDOM.documentElement.nodeName != dataSrcLocationArray[0]) {
        var blockId = 'BLK_TAX_DETAILS'
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
return true;
}
//Bug#29359335 starts
function fnPostLoad_CVS_PRODUCT_TAX_KERNEL(){

getElementsByOjName('cmdAddRow_BLK_TAX_DETAILS')[0].style.visibility = 'hidden';

   return true;

}
//Bug#29359335 ends
