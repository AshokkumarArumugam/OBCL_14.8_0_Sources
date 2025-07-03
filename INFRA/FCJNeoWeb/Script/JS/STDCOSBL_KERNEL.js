/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright © 2011 - 2013  Oracle and/or its affiliates.  All rights reserved.
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
**  File Name          : STDCOSBL_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 
   Changed By        :    Vimalp
   Changed On        : 19-Feb-2010
   Change Desc       : FCUBS V.UM 11.1.0.0.0.0.0 Enhancement (Alert On Dormant)
   Search Tag        : 9NT1368: FC11.1 AOD
   
   Changed By        : Kumar Vaibhav Upadhyay   
   Changed On        : 05-Mar-2010
   Change Desc       : FCUBS V.UM 11.1.0.0.0.0.0 Enhancement (Mashreq Gold)
   Search Tag        : 9NT1368: FCUBS11.1 MB0661
   
      Changed By        : Achelal 
   Changed On        : 14-Oct-2011
   Change Desc       : Execute query happening on load restricted
   Search Tag        : 9NT1466 itr1 sfr#13070210 
   
    Changed By        : Surendra
   Changed On        : 26-Mar-2012
   Change Desc       : Execute query not happening on chrome and Safari browsers
   Search Tag        : 9NT1501 itr1 sfr#13887179 

   Changed By        : Ravi Ranjan   
   Changed On        : 21-Oct-2014
   Change Desc       : Execute query not happening on IE 10 and IE 11, Commented the manual alignment of field width
   Search Tag        : 9NT1606_12.0.3_RETRO_19856006
   
** Modified By       : Preethika R
** Modified on       : 13-Jun-2015
** Reason            : CASA Landing page changes
** Search String     : 12.1_RETRO_CASA_Landing_page_Dev
****************************************************************************************************************************/
  
function fnPostLoad_KERNEL(){     
	

	//fnEnterQuery(); 9NT1466 itr1 sfr#13070210 changes
	
    var parentWin = fnGetParentWin();
	//9NT1501 Changes for account snapshot starts
	var elem = document.getElementById("TBLPageTAB_MAIN");
		elem = elem.children[1].children[1].children;
		var len = elem.length;
		//9NT1606_12.0.3_RETRO_19856006 starts
		/*for (var i = 0; i < len; i++) {
		elem[i].style.marginBottom = "0";
		elem[i].style.padding = "0";
		var tab = elem[i].children[1].firstChild;
	    //9NT1501 itr1 sfr#13887179  starts   
		tab.style.width = "100%";
		tab.children[0].children[0].children[0].style.width = "50%";	*/	
		//9NT1606_12.0.3_RETRO_19856006 ends
		/*tab.setAttribute("width", "100%");
		tab.firstChild.firstChild.firstChild.setAttribute("width", "50%");*/
		//9NT1501 itr1 sfr#13887179  ends
		//} //9NT1606_12.0.3_RETRO_19856006
	//9NT1501 Changes for account snapshot starts
    if (parentWin != "") {
	fnEnterQuery();
        document.getElementById('BLK_CUSTBAL__ACCNO').value = parentWin.parentWinParams.accno;  //9NT1501 Changes for account snapshot
        document.getElementById('BLK_CUSTBAL__BRANCH').value = parentWin.parentWinParams.branch;//9NT1501 Changes for account snapshot
		
    gAction = "EXECUTEQUERY";  
	
    fnExecuteQuery();	
    } else {
        document.getElementById('BLK_CUSTBAL__ACCNO').value = "";//9NT1501 Changes for account snapshot
    }
	
	/*   9NT1466 itr1 sfr#13070210 changes starts
	gAction = "EXECUTEQUERY";  
	
    fnExecuteQuery();	*/ //9NT1466 itr1 sfr#13070210 changes ends
	//12.1_RETRO_CASA_Landing_page_Dev starts
  if((typeof(mainWin.gCustInfo["AccntNo"]) != 'undefined' && mainWin.gCustInfo["AccntNo"]!='') && (typeof(mainWin.gCustInfo["Branch"])!= 'undefined' && mainWin.gCustInfo["Branch"]!='') && (mainWin.gCustInfo["FunctionId"]=='STDCUDEM'))
  {
    gAction ='ENTERQUERY';  
    fnEnterQuery();	
    document.getElementById("BLK_CUSTBAL__ACCNO").value=mainWin.gCustInfo["AccntNo"];
    document.getElementById("BLK_CUSTBAL__BRANCH").value  = mainWin.gCustInfo["Branch"];
    gAction ='EXECUTEQUERY';
    fnExecuteQuery();
  }
//12.1_RETRO_CASA_Landing_page_Dev ends   
   
   
  return true;
  
}


