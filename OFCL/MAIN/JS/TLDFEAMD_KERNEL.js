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
**  File Name          : TLDFEAMD_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 
****************************************************************************************************************************/
function fnPostExecuteQuery_KERNEL()
{	
	fnDisableElement(document.getElementById('cmdAddRow_BLK_TLTBS_CONTRACT_FEE'));
	fnDisableElement(document.getElementById('cmdDelRow_BLK_TLTBS_CONTRACT_FEE'));
	return true;
}
function fnPostUnlock_KERNEL()
{
	fnDisableElement(document.getElementById('cmdAddRow_BLK_TLTBS_CONTRACT_FEE'));
	fnDisableElement(document.getElementById('cmdDelRow_BLK_TLTBS_CONTRACT_FEE'));	
	fnDisableChecks(); 
	return true;
}
function fnPreAuthorize_KERNEL(){
    authFunction = 'TLDFEAUT';
    authUixml = 'TLDFEAUT';
    authScreenName = 'CVS_AUTH';
    gAction = 'EXECUTEQUERY';
    ArrFuncOrigin['TLDFEAUT'] = "KERNEL";
    ArrPrntFunc['TLDFEAUT'] = "";
    ArrPrntOrigin['TLDFEAUT'] = "";
    return true;
}
function fnPostAuthorize_KERNEL(){
	debugs("In fnPostAuthorize", "A");
	DisableToolbar_buttons("Authorize");
    gAction = "EXECUTEQUERY";
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
    fnSetExitButton(false);
    debugs("In fnPostAuthorize ", "A");
	return true;
}