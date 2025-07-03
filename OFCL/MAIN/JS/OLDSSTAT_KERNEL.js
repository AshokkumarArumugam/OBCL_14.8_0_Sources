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
**  File Name          : LDDSSTAT_KERNEL.js
**  Purpose            : 
**  Called From        : OLDSSTAT
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 
****************************************************************************************************************************/
function fnPostAddRow_BLK_NOTES_KERNEL(){
	fnUpdateNoteSeqno();
}
function fnPostDeleteRow_BLK_NOTES_KERNEL(){
	fnUpdateNoteSeqno();
}
function fnUpdateNoteSeqno(){
	var cnt = getTableObjForBlock('BLK_NOTES').tBodies[0].rows.length;
	for(var i=1;i<=cnt;i++){
	   if (i == 1){
	        var blkfld = 'BLK_NOTES__SEQNO';
	        var blkfldI = 'BLK_NOTES__SEQNOI';
	    }
		else{
	       var blkfld = 'BLK_NOTES__SEQNO'.concat(i-1);
	       var blkfldI = 'BLK_NOTES__SEQNOI'.concat(i-1);
	}
	document.getElementById(blkfld).value = i;
	document.getElementById(blkfldI).value = i;
	}
}

function fnPreLoad_CVS_NOTES_KERNEL(screenArgs) {
	var cnt=SingleCheck (screenArgs);    
		 if (cnt > 1 || cnt==0 )
        {
		   showErrorAlerts('IN-HEAR-221');
           return false;;
           }	
 
    
    return true;
}
function fnPostLoad_CVS_NOTES_KERNEL(screenArgs) {
    
    return true;
}


function SingleCheck (screenArgs)	 
  {   
   var count=0;
  
   len = getTableObjForBlock("BLK_SCHEDULE_STATUS_DETAIL").tBodies[0].rows.length;
     for(i = 0;i < len; i++)
      {
          if(getTableObjForBlock("BLK_SCHEDULE_STATUS_DETAIL").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0])
		  {
			  
			  if(getTableObjForBlock("BLK_SCHEDULE_STATUS_DETAIL").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked)
			  {
				count = count +1; 
				
				  if (count == 1){
					  screenArgs['DUEDATE'] = getTableObjForBlock("BLK_SCHEDULE_STATUS_DETAIL").tBodies[0].rows[i].cells[1].getElementsByTagName("oj-input-text")[0].value;
				  }
				
			  } 
         }        
       }
	   return count;                   
   }
   
function fnPostLoad_KERNEL(){   
document.getElementById("cmdAddRow_BLK_SCHEDULE_STATUS_DETAIL").style.visibility = 'hidden';
	return true;
}
