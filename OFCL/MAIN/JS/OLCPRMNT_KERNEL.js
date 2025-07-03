/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright ? 2008 - 2010  Oracle and/or its affiliates.  All rights reserved.
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
**  
**  Written by         : 
**  Date of creation   : 
**  File Name          : MICPRMNT_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG

**  Last Modified By   : UDAY
**  Last modified on   : 30-APR-2010
**  Search String     	 : ITR1 - SFR 956
**  Reason             		: FCUBS_KERNEL11.1 ITR1 - SFR 956 - Fix given for Disabling the Muliple block Add and Remove Buttons

**  Last Modified By   : Paranthaman Rajendran
**  Last modified on   : 06-May-2010
**  Search String    	 : SFR#1231
**  Reason             		: LOV bind variables value not picked according to the row of in which LOV persist.

**  Last Modified By   : Ganesh N
**  Last modified on   : 03-Jun-2010
**  Search String      : ITR1 - SFR 1107
**  Reason             : FCUBS_KERNEL11.1 ITR1 - SFR 1107 - Fix given for Hiding the Muliple block Add and Remove Buttons

****************************************************************************************************************************/
// FCUBS_KERNEL11.1 ITR1 - SFR 956 Changes Starts
 function fnPostLoad_CVS_MIS_PRODUCT_KERNEL(screenArgs)
 {
	debugs( "In fnPostLoad", "A");
	//FCUBS_KERNEL11.1 ITR1 - SFR 1107 Starts
	//document.getElementById("cmdAddRow_BLK_DEFAULT_MIS_CODES").disabled=true;
	//document.getElementById("cmdDelRow_BLK_DEFAULT_MIS_CODES").disabled=true;
	document.getElementById("cmdAddRow_BLK_DEFAULT_MIS_CODES").style.visibility="hidden";
	document.getElementById("cmdDelRow_BLK_DEFAULT_MIS_CODES").style.visibility="hidden";
	//FCUBS_KERNEL11.1 ITR1 - SFR 1107 Ends
	return true;
 }
// FCUBS_KERNEL11.1 ITR1 - SFR 956 Changes Ends


//9NT1368: ITR1 SFR#1231 - by  Paranthaman  on 27-Apr-2010 Start
function fnPreDispLov_LOV_MIS_CLASS_KERNEL(e)
{
    try
    {
           var blockId;
           try
           {
		   if (  event.srcElement.parentNode.childNodes[0] != null )
		   {
			      var scr_id = event.srcElement.parentNode.childNodes[0].id;
			      blockId = scr_id.substring(0 , scr_id.lastIndexOf("__") );

		   }
		   else
		    		blockId ="BLK_DEFAULT_MIS_CODES";
		   
  	    }catch(es)
  	    {
  	    		blockId ="BLK_DEFAULT_MIS_CODES";
  	    }
  	   
           var currPg = Number(getInnerText(document.getElementById("paging_"+blockId + "_nav_input")));
           var pgSize = getPgSize(blockId);
           dbIndexArray[blockId] = (currPg-1) * pgSize + event.srcElement.parentNode.parentNode.rowIndex;
    }catch(e){}
   return true;
}
//9NT1368: ITR1 SFR#1231 - by  Paranthaman  on 27-Apr-2010 Ends
