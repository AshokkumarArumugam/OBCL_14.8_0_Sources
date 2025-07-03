/***************************************************************************************************************************
**  This source is part of the FLEXCUBE Software Product. 
**  Copyright (c) 2008 ,2021, Oracle and/or its affiliates.
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
**  File Name          : STDAPPDP_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**	Modified By          :  Akshay Suresh
**  Modified On          :  25-May-2021
**  Modified Reason      :  Performance Diagnostic Plug-in - fn_traceselect() to disable the values in dropdown based on Function ID selected on screen.
**	Referance Bug	 	 :	Bug#30849943
**  Search string        :  FCUBS-Database Performance Diagnostic Plugin
**
**  Last Modified By   	: Vishakha Agrawal
**  Last modified on   	: 09-APR-2023
**  Reason       	   	: Redwood changes
**  Search String      	: REDWOOD 
****************************************************************************************************************************/
function fn_traceselect(){
	setTimeout(function(){
	var function_id  = document.getElementById("BLK_USER_FUCNTION_TRACE__FUNCTION_ID").value;
	var routing_type = document.getElementById("BLK_USER_FUCNTION_TRACE__ROUTING_TYPE").value;
	var type_string  = document.getElementById("BLK_USER_FUCNTION_TRACE__TYPE_STRING").value;
	if ((function_id.substring(2,3) == 'S') ||
		((routing_type == 'X' ) && 
	    ((type_string == 'SM') || (type_string == 'SMR') || (type_string == 'ELM') || (type_string == 'ELR')))
	   ){
		var elem = document.getElementById("BLK_USER_FUCNTION_TRACE__TRACE");
	//	var options = document.getElementById("BLK_USER_FUCNTION_TRACE__TRACE").getElementsByTagName('OPTION'); 
	 var options = document.getElementById("BLK_USER_FUCNTION_TRACE__TRACE").data.data;
			for(var j=0; j<options.length; j++) {
				if(options[j].value == '1'|| options[j].value == '2'|| options[j].value == '3'||options[j].value == '7') {
				//	elem.removeChild(options[j]);
				options.splice(i,1);
					j--;
				}
			}
   }
   },0);
return true;
}
function fnPostFocus_KERNEL()
{
  fn_traceselect();
  return true;
}