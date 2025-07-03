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
**  File Name          : LDDCBAUT_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : K.PRIYADARSHINI
**  Last modified on   : 02-DEC-2016
**  Full Version       : OFCL_12.3.0.0.0
**  Reason             : Cahnged the casesensitive function name, added post_exe qry function
****************************************************************************************************************************/
var subScreen='N';
var fcjResponseDOM;
var fcjRequestDOM;
var gprev;
function fnPostExecuteQuery_KERNEL(){
	fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT__BTN_AUTH"));
	document.getElementById("Authorize").style.visibility="hidden";
	  return true;
}
function fnPostLoad_CVS_AUTH_KERNEL(screenArgs){
	 subScreen = 'Y';
    if(!fnProcessAuthOnLoad(screenArgs))
        return false;
	 fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT__BTN_AUTH"));
	return true;
}

function FNAUTH(){
    gprev = gAction;
    gAction = 'AUTH';    
  if (!fnOnlineAuthorize(subScreen)) {		
		var l_msgStat =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
		if (l_msgStat == 'SUCCESS') {

			disableForm();
		}
   
    gAction = gprev;
    return true;
}
}
