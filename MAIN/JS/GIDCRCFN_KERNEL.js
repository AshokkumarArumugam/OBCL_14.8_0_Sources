/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright © 2008 - 2010  Oracle and/or its affiliates.  All rights reserved.
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
**  File Name          : GIDCRFN_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 
****************************************************************************************************************************/

function fnPostNew_KERNEL(){

	debugs("In fnPostNew", "A");	
      
     //   if((document.getElementById("GITM_CRC_CHECKSUM__CRC_TYPE").value =='Java')||(document.getElementById("GITM_CRC_CHECKSUM__CRC_TYPE").value=='PLSQL'))
	// {
		   
	  document.getElementById("BLK_GITM_CRC_CHECKSUM__DEFAULT_CRC").value=
	"Declare"+"\n"+
	    "l_abs_file_path        varchar2(400);"+"\n"+
	    "l_crc_value        varchar2(30);"+"\n"+
	 "Begin"+"\n"+
	 "return;"+"\n"+
	 "Exception"+"\n"+
	 "WHEN OTHERS THEN"+"\n"+
	 "debug.pr_debug('**','In when other values for CRC Type');"+"\n"+
	"return;"+"\n"+
	"END;"+"\n";
	appendData();
 	
 //}
 }