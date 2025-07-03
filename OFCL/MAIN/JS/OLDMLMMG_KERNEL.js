/***************************************************************************************************************************
**  This source is part of the Oracle Banking Software Product. 
**  Copyright (c) 2008 ,2020, Oracle and/or its affiliates.
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
**  File Name          : OLDMLMMG_SYS.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   :
**  Full Version       : 
**  Reason             : 

**  Last Modified By   :Rashmi B V 
**  Last modified on   :17-02-23 
**	Description        :Changes W.R.T REDWOOD ADOPTION
**	Search String      :Bug#34958820_REDWOOD_ADOPTION 
 
****************************************************************************************************************************/
function fnPostFocus_KERNEL() {
	//var tableRef = document.getElementById('BLK_ML_TRAIN_PERF_MAS');
    var tableRef = getTableObjForBlock('BLK_ML_TRAIN_PERF_MAS');//Bug#34958820_REDWOOD_ADOPTION
    var noOfRows = tableRef.tBodies[0].rows;
    for (rowIndex = 0;rowIndex < noOfRows.length;rowIndex++) {
		//fnEnableElement(document.getElementsByName("BTN_TAGS")[rowIndex]);
        fnEnableElement(getElementsByOjName("BTN_TAGS")[rowIndex]);//Bug#34958820_REDWOOD_ADOPTION
    }
    return true;
}