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
**  File Name          : LBDMTPRC_KERNEL.js
**  Purpose            : 
**  Called From        : 

****************************************************************************************************************************/
var gPrevAction;


function fnPreAuthorize_KERNEL() {
    authFunction   = 'LBDMTAUT';
    authUixml      = 'LBDMTAUT';
    authScreenName = 'CVS_AUTHVAMI';
    gAction = 'EXECUTEQUERY';
    ArrFuncOrigin['LBDMTAUT']="KERNEL";
    ArrPrntFunc['LBDMTAUT'] = "";
    ArrPrntOrigin['LBDMTAUT'] ="";
    return true;
}

function fnPostAuthorize_KERNEL() {
	gAction = "EXECUTEQUERY";
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
    //var pureXMLDOM  = fnGetDataXMLFromFCJXML(fcjResponseDOM,1);
    //setDataXML(getXMLString(pureXMLDOM));
   // showData(dbStrRootTableName, 1);
    fnSetExitButton(false);
	debugs("In fnPostAuthorize ", "A");
}