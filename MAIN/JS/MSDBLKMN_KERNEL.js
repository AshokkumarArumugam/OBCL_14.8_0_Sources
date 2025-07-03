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
**  File Name          : MSDBLKMN_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 
****************************************************************************************************************************/
var fcjRequestDOM;
var fcjResponseDOM;

function fn_regenerate() {
    //var g_prevAction = gAction;
	if ((document.getElementById("BLK_BULK_FILE_DTS__ERR_CODE").value == '') && (document.getElementById("BLK_BULK_FILE_DTS__ERR_DESC").value == '') && (document.getElementById("BLK_BULK_FILE_DTS__ERR_PARAM").value == ''))
	{
	alert('Click on regenerate only if there are any errors in file generation');
	}
else
{
    gAction = "REGENERATE";
    appendData();
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
    showProcessMsg = true;
    var l_resp_code = fnProcessResponse();
    var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
    //gAction = "DEFAULT";
    setDataXML(getXMLString(pureXMLDOM));
    showData(dbStrRootTableName, 1);
    //gAction = g_prevAction;
    return true;
	}
}
function fn_adhocbulking() {
    //var g_prevAction = gAction;

    gAction = "ADHOCBULKING";
    appendData();
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
    showProcessMsg = true;
    var l_resp_code = fnProcessResponse();
    var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
    //gAction = "DEFAULT";
    setDataXML(getXMLString(pureXMLDOM));
    showData(dbStrRootTableName, 1);
    //gAction = g_prevAction;
    return true;
}
function fnPostLoad_KERNEL()
{
fnEnableElement(document.getElementById("BLK_BULK_FILE_DTS__REGENERATE"));
fnEnableElement(document.getElementById("BLK_BULK_FILE_DTS__ADHOCBULKING"));
}




