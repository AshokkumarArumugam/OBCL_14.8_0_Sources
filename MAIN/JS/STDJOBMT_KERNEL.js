/*------------------------------------------------------------------------------------------
**
** This source is part of the Oracle FLEXCUBE Software Product.
** Copyright (R) 2016 , Oracle and/or its affiliates.  All rights reserved
**
**
** No part of this work may be reproduced, stored in a retrieval system, adopted
** or transmitted in any form or by any means, electronic, mechanical,
** photographic, graphic, optic recording or otherwise, translated in any
** language or computer language, without the prior written permission of
** Oracle and/or its affiliates.
**
** Oracle Financial Services Software Limited.
** Oracle Park, Off Western Express Highway,
** Goregaon (East),
** Mumbai - 400 063, India
** India
------------------------------------------------------------------------------------------
*/
/*
**  
**  Written by         : 
**  Date of creation   : 
**  File Name          : STDJOBMT_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 

Changed By         :  Kundan Verma
Description        :  Changed language code while searching from ertb_msgs
Search String      :  FC_UBS_V.UM_11.3.0.0.0.0.0 NLS Changes


**  Last Modified By   : Girish M
**  Last modified on   : 02-FEB-2022
**  Reason             : REDWOOD CHANGES
**  Search String      : REDWOOD_CHANGES
****************************************************************************************************************************/
function fnPostLoad_KERNEL()
{
getElementsByOjName('SCHED')[0].value='SchedulerFactory';	 //REDWOOD_CHANGES
return true;
}
function fnPostNew_KERNEL()
{
getElementsByOjName('SCHED')[0].value='SchedulerFactory';	//REDWOOD_CHANGES
return true;
}


function fnValidateJob() {
  var ret = bulk_check();
 	 var prevgAction=gAction;
try{ 
  gAction='DUMMY';
  var fcjRequest =  '<FCJMSG SRC="FLEXCUBE" BRANCH="'+mainWin.CurrentBranch+'" USERID="'+mainWin.UserId +'">';
	fcjRequest +=        '<MAINTQRY TYPE="N" ROOTTABLE="SMVW_JOB_SCHEDULE" QUERYFROM="" QUERYORDERBY="">';
        fcjRequest +=        '<OP>VALIDATEJOB</OP>';
        fcjRequest +=		         '<TABLE ID="SMVW_JOB_SCHEDULE">:'+ret+'</TABLE>';          
	fcjRequest +=        '</MAINTQRY>';
  fcjRequest +=      '</FCJMSG>' ;
  fcjRequestDOM=loadXMLDoc(fcjRequest);
  fcjResponseDOM 	= fnPost(fcjRequestDOM, servletURL, functionId);
  
   if (fcjResponseDOM) {
        debugs(getXMLString(fcjResponseDOM), "P");
		
	var msgStatus   = selectSingleNode(fcjResponseDOM,"FCJMSG/MSG").getAttribute("MSGSTATUS");
	var messageNode = selectSingleNode(fcjResponseDOM,"FCJMSG/MSG/RESPONSE");
	
	if(msgStatus != 'SUCCESS') {
            
			
			showErrorAlerts('CO-VAL-054');  // FC_UBS_V.UM_11.3.0.0.0.0.0 NLS Changes
			
			//alert('Failed Err: '+messageNode.text);               
                
     }  
 
}
}catch(e)
	{
	 gAction = prevgAction; 
	}

   gAction = prevgAction; 
}

function bulk_check()
{ 
//REDWOOD_CHANGES Starts
	//sched~trgType~jobNature~cronexpr~interval~class
/*var str = NVLCHK(document.getElementsByName("SCHED")[0].value," ") + "~"+ NVLCHK(document.getElementsByName("TRGTYP")[0].value," ") +
	"~"+NVLCHK(document.getElementsByName("JOBTYP")[0].value," ") + "~"+NVLCHK(document.getElementsByName("CRONEXPR")[0].value," ")
	+	"~"+NVLCHK(document.getElementsByName("SMPTRGFREQ")[0].value,0) + "~"+NVLCHK(document.getElementsByName("JOBCLSPROC")[0].value," ") + "~";
*/	
var str = NVLCHK(getElementsByOjName("SCHED")[0].value," ") + "~"+ NVLCHK(getElementsByOjName("TRGTYP")[0].value," ") +
	"~"+NVLCHK(getElementsByOjName("JOBTYP")[0].value," ") + "~"+NVLCHK(getElementsByOjName("CRONEXPR")[0].value," ")
	+	"~"+NVLCHK(getElementsByOjName("SMPTRGFREQ")[0].value,0) + "~"+NVLCHK(getElementsByOjName("JOBCLSPROC")[0].value," ") + "~";
 //REDWOOD_CHANGES Ends
  return str;
}

function NVLCHK(strToCheck, defaultValue)
{

    var lDefaultValue = "";
    if (arguments.length == 2)
    {
        lDefaultValue = defaultValue;
    }
    return (strToCheck == "" ? lDefaultValue: strToCheck);
}
