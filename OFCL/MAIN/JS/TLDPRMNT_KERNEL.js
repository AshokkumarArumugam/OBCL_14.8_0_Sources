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
**  Written by         : K.PRIYADARSHINI
**  Date of creation   : 15-DEC-2016
**  File Name          : TLDPRMNT_KERNEL.js
**  Purpose            : 
**  Called From        : TLDPRMNT
**  
**	Changed By         : Jayaram Namburaj
**	Date               : 16-OCT-2019
**	Change Description : Ticket Settlement Message Director
**  Search String      : SFR#29959798 OBCL_14.4_Ticket_Settlement_Message_Director
****************************************************************************************************************************/
function fnDisableBtn() {
    try {
        var x = getElementsByOjName("PRODUCTTYPE").length;
        for (var index = 0; index < x; index++) {
            if (getElementsByOjName("PRODUCTTYPE")[index].value) {
                if (getElementsByOjName("PRODUCTTYPE")[index].value == "P") {
                    var len = document.getElementById("DIVSubSystem").children[0].children.length;
                    for (var idx = 0; idx < len; idx++) {
                        if (document.getElementById("DIVSubSystem").children[0].children[idx].getElementsByTagName("li")[0].id == "OLCPDFDM" || document.getElementById("DIVSubSystem").children[0].children[idx].getElementsByTagName("li")[0].id == "CVS_FEES") {
                            fnDisableSubSysButtons(document.getElementById("DIVSubSystem").children[0].children[idx].getElementsByTagName("li")[0].getElementsByClassName("Abutton")[0]);
                        }
                    }
                }
				if (getElementsByOjName("PRODUCTTYPE")[index].value == "T") {
                    var len = document.getElementById("DIVSubSystem").children[0].children.length;
                    for (var idx = 0; idx < len; idx++) {
                        if (document.getElementById("DIVSubSystem").children[0].children[idx].getElementsByTagName("li")[0].id == "OLCPDFDM" || document.getElementById("DIVSubSystem").children[0].children[idx].getElementsByTagName("li")[0].id == "CVS_FEES") {
                            fnEnableSubSysButtons(document.getElementById("DIVSubSystem").children[0].children[idx].getElementsByTagName("li")[0].getElementsByClassName("AbuttonH")[0]);
                        }
                    }
                }
				
            }

        }
    } catch (e) {}
    return true;
}

/* Added for SFR#29959798 OBCL_14.4_Ticket_Settlement_Message_Director - Start */
function fnPostCopy_KERNEL() 
{
	setNodeText(selectSingleNode(dbDataDOM, "//BLK_TLTMS_PRODUCT_MASTER/SUPRSTCKTSTTLMNT"), 'N');
	return true;
}
/* Added for SFR#29959798 OBCL_14.4_Ticket_Settlement_Message_Director - End */