/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright � 2011 � 2016  Oracle and/or its affiliates.  All rights reserved.
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
**  File Name          : OLDMSGVW_KERNEL.js
**  Purpose            : 
**  Called From        : 

**  Search String      : FCUBS_11.3.0_P01_FC11.1_IMPSUPP_513
**  Last Modified By   : Thirumoorthy S
**  Last modified on   : 12-09-2011
**  Reason             : FCUBS11.1_IMPSUPP-ADB:#SFR#513 : Earlier versions of Flexcube used to have the option to see/print advices from within the Teller transaction screen. In FCUBS 11.1, the print functionality seems to be missing. If the same is required, could you please let us know if this is a bug in FCUBS 11.1 or if it is to be taken up as a customization.

**  Search String      : 9NT1462 -ITR1-Bug 13115926
**  Last Modified By   : Arumugam S
**  Last modified on   : 31-10-2011
**  Reason             : 9NT1462 -ITR1-Bug 13115926 -System displays unhandled exception when open the screen without query

**  Search String      :  9NT1587 12.0.2 Usability Changes for Messages
**  Last Modified By   : Praveen Kumar V
**  Last modified on   : 30-04-2013
**  Reason             : 9NT1587 12.0.2 Usability Changes for Messages - On direct query in CSDMSGVW the event code will be null. Hence query was not happening. Restricted the same using the parent seq  number.

**  Search String        : 9NT1606_ALLUBT_12.0.3_18972162
**  Last Modified By    : Vrunda Pathare
**  Last modified on    : 13-JUN-2014
**  Reason                  : Print Option was not Getting Enabled for OLDMSGVW

**   Modified By       :  Chaatravi
**   Modified On       :  13-May-2015
**   Modified Reason   :  Advice Reprint 
**   Search String     :  Reprint changes
 
*  Search String        : OBCL_14.4_SUPPORT_BUG#32685648
**  Last Modified By    : Yuvaraj K
**  Last modified on    : 07-Apr-2021
**  Reason              : Print option is enabled for block of BLK_VW_MESSAGE_DETAILS (OLDMSGVW)


****************************************************************************************************************************/
//FCUBS_11.3.0_P01_FC11.1_IMPSUPP_513 Start

var currRowIndex = "";
var local_dom = "" ;
var len = 0;
var msob_tchk = 0 ;
var temp = 0;
var l_currRow ="";

function fnPrint_new(screenArgs){
  var winParams = new Object();  
  winParams.mainWin = parent.window;
  parentWinParams = new Object();
   
  SingleChecked ();
 if (currRowIndex == 0){
  return false;}
 // var QryTable = document.getElementById("BLK_MESSAGE_DETAILS")  // OBCL_14.4_SUPPORT_BUG#32685648 commented
	var QryTable = getTableObjForBlock("BLK_VW_MESSAGE_DETAILS"); // OBCL_14.4_SUPPORT_BUG#32685648	added
  var rowInfo = QryTable.rows[currRowIndex];
  var er = fnGetDataXMLFromFCJXML(local_dom,currRowIndex);
  dbDataDOM = er;
  screenArgs = new Array();	//Reprint Changes added
  //screenArgs['SCREEN_NAME'] = 'CVS_MSCVWMSG';	//Reprint Changes commented
  /*screenArgs['SCREEN_NAME'] = 'CVS_MSCMSPRT';	//Reprint Changes added	*/ //OBCL_14.4_SUPPORT_BUG#32685648 commented
	screenArgs['SCREEN_NAME'] = 'CVS_OLCMSPRT'; //OBCL_14.4_SUPPORT_BUG#32685648 added
  //screenArgs['FUNCTION_ID'] = 'OLDMSGVW';	//Reprint Changes commented
  //screenArgs['FUNCTION_ID'] = 'MSCMSPRT';	//Reprint Changes added
	screenArgs['FUNCTION_ID'] = 'OLCMSPRT'; // OBCL_14.4_SUPPORT_BUG#32685648 added
  screenArgs['MODULE'] = 'OL';
  screenArgs['LANG'] = mainWin.LangCode;
  //screenArgs['UI_XML'] = 'MSCHSMSG';	//Reprint Changes commented
 /* screenArgs['UI_XML'] = 'MSCMSPRT';	//Reprint Changes added	 */	 //OBCL_14.4_SUPPORT_BUG#32685648 commented
	screenArgs['UI_XML'] = 'OLCMSPRT'; //OBCL_14.4_SUPPORT_BUG#32685648 added
  screenArgs['DESCRIPTION'] = 'Print';
  screenArgs['OPERATION'] = 'Print';
  //screenArgs['CONREFNO'] = document.getElementById("BLK_MESSAGE_DETAILS__CONREFNO").value;
  //screenArgs['LATVERNO'] = document.getElementById("BLK_MESSAGE_DETAILS__ESN").value;
  //screenArgs['DCN'] =  document.getElementById("BLK_MESSAGE_DETAILS__DCN").value;
  //screenArgs['CONREFNO'] = getElementsByOjName("CONREFNO")[currRowIndex - 1].value;	//Reprint Changes commented
  screenArgs['FCCREF'] = getElementsByOjName("CONREFNO")[currRowIndex - 1].value;	//Reprint Changes added
  screenArgs['LATVERNO'] = getElementsByOjName("ESN")[currRowIndex - 1].value;
  screenArgs['DCN'] =  getElementsByOjName("DCN")[currRowIndex - 1].value;
  screenArgs['DBSTRROOTTABLENAME'] = dbStrRootTableName;
  //fnSubScreenMain('MSDVWMSG', 'MSDVWMSG', 'CVS_MESSAGE',false);	//Reprint Changes commented
  parent.screenArgs=screenArgs;	//Reprint Changes added
  /* mainWin.dispHref1('MSCMSPRT',seqNo);  	//Reprint Changes added	 */	//OBCL_14.4_SUPPORT_BUG#32685648 commented
     mainWin.dispHref1('OLCMSPRT',seqNo); //OBCL_14.4_SUPPORT_BUG#32685648 added
  return true;
 } 
function SingleChecked ()
   {
	var selected_row = 0 ;
	var msob_tchk = 0 ;
	l_currRow = 0 ;
	currRowIndex = 0 ;
	
	//len = getTableObjForBlock("BLK_MESSAGE_DETAILS").tBodies[0].rows.length; OBCL_14.4_SUPPORT_BUG#32685648 commented
	  len = getTableObjForBlock("BLK_VW_MESSAGE_DETAILS").tBodies[0].rows.length;   //OBCL_14.4_SUPPORT_BUG#32685648 added
	temp = 0 ;
	for(i = 0;i < len; i++)
	{
		//if(getTableObjForBlock("BLK_MESSAGE_DETAILS").tBodies[0].rows[i].cells[0].getElementsByTagName("oj-input-text")[0])	OBCL_14.4_SUPPORT_BUG#32685648 commented
		  if(getTableObjForBlock("BLK_VW_MESSAGE_DETAILS").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0])  //OBCL_14.4_SUPPORT_BUG#32685648 added
		{
			//if(getTableObjForBlock("BLK_MESSAGE_DETAILS").tBodies[0].rows[i].cells[0].getElementsByTagName("oj-input-text")[0].value) OBCL_14.4_SUPPORT_BUG#32685648 commented
			  if(getTableObjForBlock("BLK_VW_MESSAGE_DETAILS").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked)//OBCL_14.4_SUPPORT_BUG#32685648 added
			
			{
			    l_currRow = i;
			    msob_tchk = msob_tchk +1;
				selected_row = i ;
				temp=i ;
			}
		}
		else
		break;
	}
	if (msob_tchk > 1 )
	{
	    //9NT1525_12.0.1NLS_INTERNAL_16321819 Starts
		//alert ( 'Bulk Operation is Not supported ');
		showErrorAlerts('CS-MSVW-01');
		//9NT1525_12.0.1NLS_INTERNAL_16321819 Ends
		return false ;
	}
	else if (msob_tchk == 0 )
	{
	    //9NT1525_12.0.1NLS_INTERNAL_16321819 Starts
		//alert ( 'Please Select a Record');
		showErrorAlerts('CS-MSVW-02');
		//9NT1525_12.0.1NLS_INTERNAL_16321819 Ends
		return false ;
	}
	else
	{
	currRowIndex = selected_row +1 ;
	return true;
	}
}

function fnPostExecuteQuery_KERNEL() 
{ 
//fnEnableElement(document.getElementById("BLK_MESSAGE__BTN_PRINT"));  // 9NT1606_ALLUBT_12.0.3_18972162
fnEnableElement(getElementsByOjName("BTN_PRINT")[0]); // 9NT1606_ALLUBT_12.0.3_18972162

//FCUBS_11.3.0_P01_FC11.1_IMPSUPP_513 - 08-09-2011 - Starts
local_dom =null;
      
local_dom=loadXMLDoc(getXMLString(fcjResponseDOM));

//FCUBS_11.3.0_P01_FC11.1_IMPSUPP_513 - 08-09-2011 - Ends
   return true; 
} 

// FCUBS_11.3.0_P01_FC11.1_IMPSUPP_513 End.
//9NT1462 -ITR1-Bug 13115926 Starts
function fnPreExecuteQuery_KERNEL(){
   //PNTFLX01011_12.2.0.0.0_Document Registration changes starts
   var parentWin = fnGetParentWin();
   if (parentWin.detailFuncId== "LCDREGIN" ||
       parentWin.detailFuncId== "LIDREGIN" ||
       parentWin.detailFuncId== "LCDAMREG" ||
       parentWin.detailFuncId== "LIDAMREG" ||
       parentWin.detailFuncId== "BCDTRGON" ||
       parentWin.detailFuncId== "IBDTRGON")
   {	
      document.getElementById("BLK_MESSAGE__EVNTCD").previousSibling.style.visibility="hidden";
      document.getElementById("BLK_MESSAGE__LATEVNSEQNOI").previousSibling.style.visibility="hidden";
      document.getElementById("BLK_MESSAGE__EVNTCD").style.visibility="hidden";
      document.getElementById("BLK_MESSAGE__LATEVNSEQNOI").style.visibility="hidden";	  
   }
   //PNTFLX01011_12.2.0.0.0_Document Registration changes ends
	//9NT1587 12.0.2 Usability Changes for Messages Starts
	//if(document.getElementById("BLK_MESSAGE__EVNTCD").value =='')
	if(document.getElementById("BLK_MESSAGE__EVNTCD").value == '' && parentSeqNo !='')
	//9NT1587 12.0.2 Usability Changes for Messages Ends
	return false;
	return true;
}
//9NT1462 -ITR1-Bug 13115926 Ends
