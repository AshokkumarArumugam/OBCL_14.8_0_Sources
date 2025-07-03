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
**  File Name          : LDDCOCDT_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**Changed By         : Gomathi G
**Date               : 11-JUN-2020
**Change Description : To change Date format as per user preference
**Search String      : OBCL_14.3_Support_Bug#31400838
**Changed By         : Gomathi G
**Date               : 14-MAY-2021
**Change Description : Asigning mainWin.AppDate to format the date as per user preference 
**Search String      : Bug#31400838 
****************************************************************************************************************************/
/* To Check if Read only Radio btn is RAD bug */
function fnPostNew_KERNEL(){   
fnDisableElement(document.getElementById("BLK_OLTB_CONTRACT_COC__COCVALUATIONSTATUS"));
fnDisableElement(document.getElementById("BLK_OLTB_CONTRACT_COC__COCVALUATIONSTATUS2"));
fnDisableElement(document.getElementById("BLK_OLTB_CONTRACT_COC__COCVALUATIONSTATUS3"));
//OBCL_14.3_SUPPORT_BUG#31400838 CHANGES STARTS 
   // fireHTMLEvent(document.getElementById("BLK_OLTB_CONTRACT_COC__EFFECTIVEDATE"), "onpropertychange"); commented as part og bug#31400838
	//OBCL_14.1_SUPPORT_BUG#31400838 CHANGES STARTS 
	return true;
}

function fnPostEnterQuery_KERNEL(){
	fnEnableElement(document.getElementById("BLK_OLTB_CONTRACT_COC__COMMITMENTREFNO"));
	//BUG#31400838 STARTS 
	document.getElementById("BLK_OLTB_CONTRACT_COC__EFFECTIVEDATE").value = mainWin.AppDate;	//Bug#30716636
    fireHTMLEvent(document.getElementById("BLK_OLTB_CONTRACT_COC__EFFECTIVEDATE"), "onpropertychange");
	document.getElementById("BLK_OLTB_CONTRACT_COC__RAPIDEFFECTIVEDATE").value = mainWin.AppDate;	//Bug#30716636
    fireHTMLEvent(document.getElementById("BLK_OLTB_CONTRACT_COC__RAPIDEFFECTIVEDATE"), "onpropertychange");
	//BUG#31400838 CHANGES STARTS 
	return true;
}
