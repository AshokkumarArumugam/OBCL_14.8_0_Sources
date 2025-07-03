/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright © 2004 - 2013  Oracle and/or its affiliates.  All rights reserved.
** 												
** No part of this work may be reproduced, stored in a retrieval system,
** adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise,
** translated in any language or computer language,
** without the prior written permission of Oracle and/or its affiliates.
** 
** 
** Oracle Financial Services Software Limited.
** Oracle Park, Off Western Express Highway,
** Goregaon (East),
** Mumbai - 400 063, India.
------------------------------------------------------------------------------------------
*/
/*

**  Last Modified By	: Geeta Adhikari
**  Last modified on  	: 20-nOV-2017
**  Reason              : Issue:Base date field was not getting updated to system date as the assignment was done for BASEDATE while the field name is BASEDATEI 
                          Fix:Correct assignment is done now.
**  Search String      	: Fcubs_SWEDBANK SHANGHAI BRANCH_BUG#27142458
**
** 	Modified By     	: Rajesh Kona
** 	Modified On     	: 28-Mar-2022
** 	Modified Reason 	: OJET Redwood Adoption 
** 	Search string   	: Bug#35120301_OBTR_14.7.1_Redwood_Changes
**
**  Changed By          : Sreekanth K
**  Changed on          : 01-Jul-2023
**  Change Description  : Moved from OBTR to 14.8 common core
**  Search String       : NA
---------------------------------------------------------------------------------------
*/

 function fnPostNew_KERNEL()
{      //Fcubs_SWEDBANK SHANGHAI BRANCH_BUG#27142458 starts
       //document.getElementsByName('BASEDATE')[0].value = mainWin.AppDate;
	   //document.getElementsByName('BASEDATEI')[0].value = mainWin.AppDate;//Bug#35120301_OBTR_14.7.1_Redwood_Changes Commented
	   getElementsByOjName('BASEDATE')[0].value = mainWin.AppDate;//Bug#35120301_OBTR_14.7.1_Redwood_Changes Added
	   //Fcubs_SWEDBANK SHANGHAI BRANCH_BUG#27142458 ends
	//document.getElementsByName("ACTION")[0].value = 'NEW';//Bug#35120301_OBTR_14.7.1_Redwood_Changes Commented
	getElementsByOjName("ACTION")[0].value = 'NEW';//Bug#35120301_OBTR_14.7.1_Redwood_Changes Added
	return true;
}
 function fnPostExecuteQuery_KERNEL()
{
	//document.getElementsByName('BASEDATEI')[0].value = mainWin.AppDate;//Bug#35120301_OBTR_14.7.1_Redwood_Changes Commented
	getElementsByOjName('BASEDATE')[0].value = mainWin.AppDate;//Bug#35120301_OBTR_14.7.1_Redwood_Changes Added
	return true;
}



function fnPostEnterQuery_KERNEL()
 {
	//document.getElementsByName("ACTION")[0].value = 'QUERY';//Bug#35120301_OBTR_14.7.1_Redwood_Changes Commented
	getElementsByOjName("ACTION")[0].value = 'QUERY';//Bug#35120301_OBTR_14.7.1_Redwood_Changes Added
	return true;
}