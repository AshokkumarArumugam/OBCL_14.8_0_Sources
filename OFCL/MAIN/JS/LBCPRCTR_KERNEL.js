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
**  File Name          : LBCPRCTR_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 
**  CHANGE LOG         : RAMYA M
**  Last modified on   : 04-04-2023
**  Reason             : OBCL_14.8_LS_REDWOOD_CHANGES
**  SEARCH STRING      : BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES


****************************************************************************************************************************/
function fnPostLoad_CVS_CONSOL_TRNFR_HIST1_KERNEL(screenArgs) {

	document.getElementById("cmdDelRow_BLK_CONSOL").style.visibility = 'hidden';
	document.getElementById("cmdAddRow_BLK_CONSOL").style.visibility = 'hidden';
 
	
    return true;
}

  
function fnPostLoad_CVS_TRNFR_HIST_KERNEL(screenArgs){  
	if (screenArgs['INSTRTYPE']=='Y'){
			try{
			//var len = document.getElementById("DIVSubSystem").children[0].children.length;//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
			var len = document.getElementById("subSystemConveyorBelt").getElementsByClassName("oj-conveyorbelt-content-container")[0].getElementsByTagName("oj-button").length;////BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES

			for (var idx = 0; idx < len; idx++) {
				//if (document.getElementById("DIVSubSystem").children[0].children[idx].getElementsByTagName("li")[0].id == "CVS_CONSOL_TRNFR_HIST1") {////BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
					if  (document.getElementById("subSystemConveyorBelt").getElementsByClassName("oj-conveyorbelt-content-container")[0].getElementsByTagName("oj-button")[idx].id == "CVS_CONSOL_TRNFR_HIST1")////BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
					{
				//	fnDisableSubSysButtons(document.getElementById("DIVSubSystem").children[0].children[idx].getElementsByTagName("li")[0].getElementsByClassName("Abutton")[0]);
				fnDisableSubSysButtons(document.getElementById("subSystemConveyorBelt").getElementsByClassName("oj-conveyorbelt-content-container")[0].getElementsByTagName("oj-button")[idx]);////BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
	
				}
			}
			} catch (e) {}
		}
		else
		{
			try{
			//var len = document.getElementById("DIVSubSystem").children[0].children.length;//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
			var len = document.getElementById("subSystemConveyorBelt").getElementsByClassName("oj-conveyorbelt-content-container")[0].getElementsByTagName("oj-button").length;////BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES

			for (var idx = 0; idx < len; idx++) {
				//if (document.getElementById("DIVSubSystem").children[0].children[idx].getElementsByTagName("li")[0].id == "CVS_CONSOL_TRNFR_HIST1") {
						if  (document.getElementById("subSystemConveyorBelt").getElementsByClassName("oj-conveyorbelt-content-container")[0].getElementsByTagName("oj-button")[idx].id == "CVS_CONSOL_TRNFR_HIST1")////BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
						{
					//fnEnableSubSysButtons(document.getElementById("DIVSubSystem").children[0].children[idx].getElementsByTagName("li")[0].getElementsByClassName("AbuttonH")[0]);//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
					fnDisableSubSysButtons(document.getElementById("subSystemConveyorBelt").getElementsByClassName("oj-conveyorbelt-content-container")[0].getElementsByTagName("oj-button")[idx]);//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
	
				}
			}
			} catch (e) {}
		} 

document.getElementById("cmdAddRow_BLK_PARTIC_PRCD").style.visibility = 'hidden';
document.getElementById("cmdDelRow_BLK_PARTIC_PRCD").style.visibility = 'hidden';
  
	return true;
}
