/***************************************************************************************************************************
**  This source is part of the Oracle Banking Software Product. 
**  Copyright (c) 2008 ,2019, Oracle and/or its affiliates.
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
**  File Name          : OLDEACER_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**	Changed By         : Sowmya Bitra
**	Date               : 15-Nov-2021
** 	Change Description : Error Details Subscreen added
** 	Search String      : OBCL_14.5_SUPPORT_BUG#33570019
****************************************************************************************************************************/

//OBCL_14.5_SUPPORT_BUG#33570019 Changes start
function fnPostLoad_KERNEL(){
  var parentWin = fnGetParentWin();
  if (parent.screenArgs!=undefined && parent.screenArgs['ACTION']=='LAUNCH')
  {
	fnEnterQuery();
	getElementsByOjName("CONTRACT_REF_NO")[0].value = parent.screenArgs['CONTRACT_REF_NO'];
	getElementsByOjName("EXTERNAL_REF_NO")[0].value = parent.screenArgs['EXTERNAL_REF_NO'];
	gAction = 'EXECUTEQUERY';
	appendData();
	fnExecuteQuery(); 
	parent.screenArgs = undefined;
	showToolbar('', '', '', '');
	}
	return true;
}
//OBCL_14.5_SUPPORT_BUG#33570019 Changes end