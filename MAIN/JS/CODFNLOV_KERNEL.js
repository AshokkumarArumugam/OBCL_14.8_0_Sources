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
**  File Name          : CODFNLOV_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 

**	Modified By   :	Aiswarya Donthi
** 	Modified on   : 7-Feb-2022
** 	Description   : Redwood Changes done 
** 	Search String : redwood_changes

****************************************************************************************************************************/
var g_oldexttype="";
function fnPostReturnValToParent_LOV_FUNCTIONID_KERNEL()
{
fnDefault();
return true;
}
function fnDefault()
{
if(getElementsByOjName("EXT_TYPE")[0].value=='I')  //redwood_changes
{
	document.getElementById("BLK_MAIN__KEY_ID").value=document.getElementById("BLK_MAIN__FUNCTION_ID").value;
	fnDisableElement(document.getElementById("BLK_MAIN__KEY_ID")); 
	g_oldexttype=getElementsByOjName("EXT_TYPE")[0].value;//F  //redwood_changes
}
else if(getElementsByOjName("EXT_TYPE")[1].value=='I')  //redwood_changes
{
	document.getElementById("BLK_MAIN__KEY_ID").value="";
	fnEnableElement(document.getElementById("BLK_MAIN__KEY_ID"));
	g_oldexttype=getElementsByOjName("EXT_TYPE")[1].value;//L  //redwood_changes
}
return true;
}
//On change of ext type radio button
function fnChange()
{
if ((getElementsByOjName("EXT_TYPE")[0].value=='I' && g_oldexttype==getElementsByOjName("EXT_TYPE")[0].value)||  //redwood_changes
  (getElementsByOjName("EXT_TYPE")[1].value=='I' && g_oldexttype==getElementsByOjName("EXT_TYPE")[1].value))  //redwood_changes
{
return true;
}
document.getElementById("BLK_MAIN__KEY_ID").value="";
if(getElementsByOjName("EXT_TYPE")[0].value=='I')  //redwood_changes
{
	fnDisableElement(document.getElementById("BLK_MAIN__KEY_ID")); 
	g_oldexttype=getElementsByOjName("EXT_TYPE")[0].value;//F  //redwood_changes
}
else if(getElementsByOjName("EXT_TYPE")[1].value=='I')  //redwood_changes
{
	fnEnableElement(document.getElementById("BLK_MAIN__KEY_ID"));
	g_oldexttype=getElementsByOjName("EXT_TYPE")[1].value;//L  //redwood_changes
}
return true;
}
function fnPostEnterQuery_KERNEL()
{
fnEnableElement(document.getElementById("BLK_MAIN__EXT_TYPE"));
return true;
}