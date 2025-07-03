/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright © 2008 - 2013  Oracle and/or its affiliates.  All rights reserved.
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
**  Written by         : 
**  Date of creation   : 
**  File Name          : MSCMEMGE_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  Last Modified By   : Kavitha Asokan
**  Last modified on   : 23-Feb-2023
**  Reason             : REDWOOD_ADOPTION changes
**  Search String      : Bug#34958820
*****************************************************************************************************************************/
function fnPostExecuteQuery_KERNEL(screenArgs){
	fnEnableElement(document.getElementById("BLK_CONTRACT__BTNPRNT"));
	local_dom =null;
   local_dom=loadXMLDoc(getXMLString(fcjResponseDOM));
	return true;
}
function fnPrint_new(screenArgs){
  var winParams = new Object();
  winParams.mainWin = parent.window;
  parentWinParams = new Object();
  SingleChecked ();
  if (currRowIndex == 0){
  return false;}
  var QryTable = getTableObjForBlock("BLK_CONTRACT")
  var rowInfo = QryTable.rows[currRowIndex];
  var er = fnGetDataXMLFromFCJXML(local_dom,currRowIndex);
  dbDataDOM = er;
  screenArgs = new Array();
  screenArgs['SCREEN_NAME'] = 'CVS_MSCMSPRT';
  screenArgs['FUNCTION_ID'] = 'MSCMSPRT';
  screenArgs['MODULE'] = 'OL';
  screenArgs['LANG'] = mainWin.LangCode;
  screenArgs['UI_XML'] = 'MSCMSPRT';
  screenArgs['DESCRIPTION'] = 'Print';
  screenArgs['OPERATION'] = 'Print';
  //Bug#34958820 - REDWOOD_ADOPTION changes starts
  //screenArgs['CONTREF'] = document.getElementsByName("CONTRACTREFNO").value;
  //screenArgs['LATVERNO'] = document.getElementsByName("LATEVNSEQNO").value;
  screenArgs['CONTREF'] = document.getElementsByOjName("CONTRACTREFNO").value;
  screenArgs['LATVERNO'] = document.getElementsByOjName("LATEVNSEQNO").value;
 
  //screenArgs['DCN'] =  document.getElementsByName("PRDCN")[currRowIndex-1].value;
  screenArgs['DCN'] =  document.getElementsByOjName("PRDCN")[currRowIndex-1].value;
   //Bug#34958820 - REDWOOD_ADOPTION changes ends
  screenArgs['DBSTRROOTTABLENAME'] = dbStrRootTableName;
  
  parent.screenArgs=screenArgs;
  mainWin.dispHref1('MSCMSPRT',seqNo);
 
 } 
 
