/*------------------------------------------------------------------------------------------
**
** This source is part of the Oracle FLEXCUBE Software Product.
** Copyright (R) 2016-2018 , Oracle and/or its affiliates.  All rights reserved
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
---------------------------------------------------------------------------------------
 Caution Don't Delete this. This is used by the Version control utility.

 
**  Last Modified By   : Anjali 
**  Last modified on   : 17-Jul-2013
**  Reason             : Code modified so as to call enrich functionality during save if enrich button is not pressed and modified the code for enrich functionality. 
**  Search String      : 1202_17175103

**  Last Modified By   : Pankaj
**  Last modified on   : 15-Jul-2015
**  Reason             : Code modified so as to call enrich functionality during save if enrich button is not pressed and modified the code so that enrich button should be enabled. 
**  Search String      : 1210_21447166

**  Last Modified By   : Vipan Kumar
**  Last modified on   : 02-Aug-2017
**  Reason             : Code added to hide the branch code field from the detailed screen (CYDRATEE) since the same in present in the summary screen.
**  Search String      : 9NT1606_12_4_RETRO_12_2_26384453

**Modified By            : Akshara Jorigal
** Modified On           : 1-Nov-2017
** Modified Reason       : Assigning the current branch on post load of the function
** Retro String          : 
** Search String         : 9NT1606_12_4_RETRO_12_2_26818218

** Modified By      : Poornima Ramasami
** Modified On      : 23-Mar-2018
** Modified Reason  : After save of CYDRATEE by a non auto auth user the modified data was not shown on screen
** Retro Bug        : 26112249
** Search String    : JC_TO_MINICORE

**	Modified By   :	Aiswarya Donthi
** 	Modified on   : 7-Feb-2022
** 	Description   : Redwood Changes done 
** 	Search String : redwood_changes

**	Modified By   :	Vijeta S
** 	Modified on   : 29-Sept-2023
** 	Description   : Redwood Changes done 
** 	Search String : Bug#35760072

*/


//------------------------------------------------------------------------------
// VARIABLE DECLARATIONS
//------------------------------------------------------------------------------

//1202_17175103 starts
/* var flag = false; */ //1210_21447166 commented

//9NT1606_12_4_RETRO_12_2_26384453 Starts
function fnPostLoad_KERNEL() {
	//document.getElementById("BLK_CCY_RATE_MASTER__BRNCD").parentNode.style.display = "none";  //9NT1606_12_4_RETRO_12_2_26818218 commented	
	document.getElementById("BLK_CCY_RATE_MASTER__BRNCD").value = mainWin.CurrentBranch;//9NT1606_12_4_RETRO_12_2_26818218
}
//9NT1606_12_4_RETRO_12_2_26384453 Ends

function fnPreUnlock_KERNEL() {
	var unlock = true;
	 /* flag = false; */ //1210_21447166 commented
	return true;
} 
//1202_17175103 ends


//9NT1606_12_4_RETRO_12_2_26818218 changes starts
function fnPostEnterQuery_KERNEL() {
	document.getElementById("BLK_CCY_RATE_MASTER__BRNCD").value = mainWin.CurrentBranch;
	document.getElementById("BLK_CCY_RATE_MASTER__BRNCD").setAttribute("readOnly",true);
}
//9NT1606_12_4_RETRO_12_2_26818218 changes ends

function fnPostUnlock_KERNEL()
{   
//fnEnableElement(document.getElementById("BTNENRICH")[0]); //1202_17175103
fnEnableElement(getElementsByOjName("BTNENRICH")[0]);//1202_17175103  //redwood_changes
}
//1202_17175103 starts
function fnPreSave_KERNEL() {
//1210_21447166 commented
/*    if(flag == false)
	 {
	  fn_enrich();
	  }  */ 
//1210_21447166 commented
      fn_enrich();    //1210_21447166 addded
	return isValid;
}
//1202_17175103 ends

//12.2_SUPPORT_RETRO_23656836 starts
function fnPostSave_KERNEL()
{
   fnPopUnAuthDetails(); //JC_TO_MINICORE ADDED
   gPrevAction = gAction;
   gAction = 'EXECUTEQUERY';
	setTimeout( function(){ //Bug#35760072
   fnExecuteQuery();
	},0);	//Bug#35760072 changes added
   return true;
}
//12.2_SUPPORT_RETRO_23656836 ends
function fnPostExecuteQuery_KERNEL() {
		//document.getElementById("BLK_CCY_RATE_MASTER__BRNCD").value = mainWin.CurrentBranch; //9NT1606_12_4_RETRO_12_2_26818218 commented	

		var tableRef = getTableObjForBlock("BLK_CCY_RATE_DETAILS");  //redwood_changes
	    var noOfRows = getOjTableRowsLength("BLK_CCY_RATE_DETAILS"); //redwood_changes
	  //FCUBS 10.5 STR1 SFR#5282
     /*if (noOfRows.length > 0)
     {
		document.getElementById('RATE_DT').value = document.getElementById("RATE_DATE")[0][0].value;
		document.getElementById('RATE_SEQ').value = document.getElementById("RATE_SERIAL")[0][0].value;
	 }*/
	for(  rowIndex = 0 ; rowIndex < noOfRows ; rowIndex ++ )  //redwood_changes
	 {
		if (getElementsByOjName("INTAUTHSTAT")[rowIndex].value == 'U')  //redwood_changes
		{
          getElementsByOjName("MIDRATE")[rowIndex].value = getElementsByOjName("UNAUTHMIDRATE")[rowIndex].value;  //redwood_changes
         fireHTMLEvent(getElementsByOjName("MIDRATE")[rowIndex], "onpropertychange"); //added for fcubs11.1,sfr#266,itr-2 //redwood_changes
         getElementsByOjName("BUYSPRD")[rowIndex].value = getElementsByOjName("UNAUTHBUYSPRD")[rowIndex].value; //redwood_changes
         fireHTMLEvent(getElementsByOjName("BUYSPRD")[rowIndex], "onpropertychange"); //added for fcubs11.1,sfr#266,itr-2 //redwood_changes
         getElementsByOjName("SALESPRD")[rowIndex].value = getElementsByOjName("UNAUTHSALESPRD")[rowIndex].value;  //redwood_changes
         fireHTMLEvent(getElementsByOjName("SALESPRD")[rowIndex], "onpropertychange"); //added for fcubs11.1,sfr#266,itr-2  //redwood_changes
         getElementsByOjName("BUYRATE")[rowIndex].value = getElementsByOjName("UNAUTHBUYRATE")[rowIndex].value;  //redwood_changes
         fireHTMLEvent(getElementsByOjName("BUYRATE")[rowIndex], "onpropertychange"); //added for fcubs11.1,sfr#266,itr-2  //redwood_changes
         getElementsByOjName("SALERATE")[rowIndex].value = getElementsByOjName("UNAUTHSALERATE")[rowIndex].value;  //redwood_changes
         fireHTMLEvent(getElementsByOjName("SALERATE")[rowIndex], "onpropertychange"); //added for fcubs11.1,sfr#266,itr-2  //redwood_changes

        }
	 }
	return true;
}


////1202_17175103 starts
/*
function fn_enrich(){
g_prev_gAction = gAction;
gAction = 'DEFAULT';
fcjRequestDOM = buildUBSXml();
servletURL = "FCClientHandler";
fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
gAction = '';
if(!fnProcessResponse()){
   gAction=g_prev_gAction;
   return false;
}
gAction=g_prev_gAction;
}*/

function fn_enrich(){
   gPrevAction = gAction;
  gAction = "DEFAULT";
  functionId='CYDRATEE';
  appendData(document.getElementById('TBLPage'+strCurrentTabId ));
  fcjRequestDOM = buildUBSXml();
  servletURL = "FCClientHandler";
  fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
  if(fcjResponseDOM) {
                           var msgStatus   =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
							  if (msgStatus == 'FAILURE')
							   {
                                var messageNode = selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
                                var returnVal = displayResponse(messageNode);
                               }
                              if(msgStatus == 'SUCCESS')
                               {
                                 var pureXMLDOM  = fnGetDataXMLFromFCJXML(fcjResponseDOM,1);
                                  setDataXML(getXMLString(pureXMLDOM));
                                  showData(dbStrRootTableName, 1);
								  /* getElementsByOjName("BTNENRICH")[0].disabled  = true;  // 113_16606055_IGBPFBN */ //1210_21447166 commented
												  /* flag = true;//113_16606055_IGBPFBN */  //1210_21447166 commented
                               }
							}
gAction = gPrevAction;
					appendData(document.getElementById('TBLPage' + strCurrentTabId));
}
//1202_17175103 starts ends

//JC_TO_MINICORE STARTS
function fnPopUnAuthDetails(){

		document.getElementById("BLK_CCY_RATE_MASTER__BRNCD").value = mainWin.CurrentBranch;
		var tableRef = getTableObjForBlock("BLK_CCY_RATE_DETAILS");  //redwood_changes
	    var noOfRows = getOjTableRowsLength("BLK_CCY_RATE_DETAILS"); //redwood_changes
	for(  rowIndex = 0 ; rowIndex < noOfRows ; rowIndex ++ )  //redwood_changes
	 {
		if (getElementsByOjName("INTAUTHSTAT")[rowIndex].value == 'U')  //redwood_changes
		{
          getElementsByOjName("MIDRATE")[rowIndex].value = getElementsByOjName("UNAUTHMIDRATE")[rowIndex].value; //redwood_changes
         fireHTMLEvent(getElementsByOjName("MIDRATE")[rowIndex], "onpropertychange");  //redwood_changes
         getElementsByOjName("BUYSPRD")[rowIndex].value = getElementsByOjName("UNAUTHBUYSPRD")[rowIndex].value;  //redwood_changes
         fireHTMLEvent(getElementsByOjName("BUYSPRD")[rowIndex], "onpropertychange");  //redwood_changes
         getElementsByOjName("SALESPRD")[rowIndex].value = getElementsByOjName("UNAUTHSALESPRD")[rowIndex].value;  //redwood_changes
         fireHTMLEvent(getElementsByOjName("SALESPRD")[rowIndex], "onpropertychange");  //redwood_changes
         getElementsByOjName("BUYRATE")[rowIndex].value = getElementsByOjName("UNAUTHBUYRATE")[rowIndex].value;  //redwood_changes
         fireHTMLEvent(getElementsByOjName("BUYRATE")[rowIndex], "onpropertychange");   //redwood_changes
         getElementsByOjName("SALERATE")[rowIndex].value = getElementsByOjName("UNAUTHSALERATE")[rowIndex].value;  //redwood_changes
         fireHTMLEvent(getElementsByOjName("SALERATE")[rowIndex], "onpropertychange");  //redwood_changes

        }
	 }
return true;
}
//JC_TO_MINICORE ENDS
