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
**  File Name          : LPCRCMNT_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Modified By   : Divya J
**  Modified on   : 23-Nov-2018
**  Search String : OBCL_14.1_Bug#29588601
**  Reason        : MARGIN REVISION IS NOT WORKING AS EXPECTED 
**	
**  Modified By   : Akhila Samson
**  Modified on   : 03-Mar-2023
**  Search String : Bug#34958820_Redwood_changes
**  Reason        : Redwood changes
****************************************************************************************************************************/
//OBCL_14.1_Bug#29588601 Starts
function fnPostLoad_CVS_PARTICIPANT_KERNEL(screenArgs){
	fnDisableElement(document.getElementById("BLK_PARTICIPANT__TXT_PRODUCT"));
	fnDisableElement(document.getElementById("BLK_PART_MARGIN_COMPONENT__CONTRACTREFNO"));
	fnDisableElement(document.getElementById("BLK_PART_MARGIN_COMPONENT__CUSTOMERNO"));
	fnDisableElement(document.getElementById("BLK_PART_MARGIN_COMPONENT__COMPONENT"));
	fnDisableElement(document.getElementById("BLK_PART_MARGIN_COMPONENT__SLABTIER"));
	fnDisableElement(document.getElementById("BLK_PART_MARGIN_COMPONENT__SLABTIER2"));
	fnDisableElement(document.getElementById("BLK_PART_MARGIN_COMPONENT__SLABTIER3"));
	fnDisableElement(document.getElementById("BLK_PART_MARGIN_COMPONENT__AMTORPERCENT"));
	fnDisableElement(document.getElementById("BLK_PART_MARGIN_COMPONENT__AMTORPERCENT2"));
	if (parent.functionId = 'FCDRCMNT'){
		getElementsByOjName("BTN_ADD_BLK_PART_MARGIN_COMPONENT")[0].className="BTNhide"; //Bug#34958820_Redwood_changes
		getElementsByOjName("BTN_REMOVE_BLK_PART_MARGIN_COMPONENT")[0].className="BTNhide"; //Bug#34958820_Redwood_changes
	}
	return true;	
}
//OBCL_14.1_Bug#29588601 Ends