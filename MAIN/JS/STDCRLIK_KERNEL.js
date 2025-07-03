/***************************************************************************************************************************
**  This source is part of the FLEXCUBE Software System and is copyrighted by 
**  Oracle Financial Services Software Limited.
**  
**  All rights reserved.  No part of this work may be reproduced, stored in a retrieval system, 
**  adopted or transmitted in any form or by any means, electronic, mechanical, photographic, 
**  graphic, optic recording or otherwise, translated in any language or computer language, 
**  without the prior written permission of Oracle Financial Services Software Limited.
**  
**  Oracle Financial Services Software Limited.
**  10-11, SDF I, SEEPZ, Andheri (East),
**  Mumbai - 400 096.
**  India.
**  
**  Copyright (c) 2008 - 2011 by Oracle Financial Services Software Limited. All rights reserved.
**  
**  Written by         : 
**  Date of creation   : 
**  File Name          : STDCRLIK_KERNEL.js
**  Purpose            : 
**  Called From        : 

**   Modified By        : Vijeta S
**   Modified On        : 05-September-2022
**   Modified Reason    : Fix provided to display "ID and Liability ID" only in advance search , not in Summary Field Set and Maintenance Screen.
**   Search String      : Bug#34516337
**
** Modified  By         : Manoj
** Modified  On         : 08-feb-2023
** Modified Reason      : Redwood Changes done 
** Search String        : redwood_changes
** Bug Number			: 
****************************************************************************************************************************/
function fnPostNew_KERNEL() {
	debugs( "In fnPostNew", "A");
	document.getElementById("BLK_LIAB_CUST__BRANCH_CODE").value=mainWin.CurrentBranch;	
    return true;	
}

function fnPostUnlock_KERNEL() {
	fnDisableElement(document.getElementById("BLK_LIAB_CUST__CUSTOMER_NO"));
	debugs( "In fnPostUnlock", "A");
	return true;
}
function fnPostCopy_KERNEL() {
	debugs( "In fnPostCopy", "A");
	document.getElementById('BLK_LIAB_CUST__CUSTOMER_NO').value = "";
    return true;
}

function fnPreEnterQuery_KERNEL() {
	fnEnableElement(document.getElementById("BLK_LIAB_CUST__CUSTOMER_NO"));
	debugs( "In fnPreEnterQuery", "A");
	return true;
}

function fnPostEnterQuery_KERNEL() {
	document.getElementById('BLK_LIAB_CUST__BRANCH_CODE').value=mainWin.CurrentBranch;
	debugs( "In fnPostEnterQuery", "A");
	return true;
}
//Bug#34516337 starts
function fnPostLoad_Sum_KERNEL(){
   debugs( "In fnPostLoad_Sum_kernel", "A");
   document.getElementById('TH_BLK_LIAB_CUST__ID').style.display = 'none';
   document.getElementById('TH_BLK_LIAB_CUST__LIAB_ID').style.display = 'none';
   return true;
}
function fnPostExecuteQuery_sum_KERNEL() {
   debugs( "In fnPostExecuteQuery_sum_KERNEL", "A");
   var colsToHide = ['ID','LIAB_ID'];
   for(var i=0;i<colsToHide.length;i++){
        //    var rows = document.getElementsByName(colsToHide[i]);//redwood_changes
		var rows = getElementsByOjName(colsToHide[i]);//redwood_changes
      for(var j=0;j<rows.length;j++){
         rows[j].style.display='none';
      }
   }
   return true;
}
function fnPostLoad_KERNEL() {
   debugs( "In fnPostLoad_KERNEL", "A");
   var colsToHide = ['IDI','LIAB_IDI'];
   for(var i=0;i<colsToHide.length;i++){
      var rows = document.getElementsByName(colsToHide[i]);//redwood_changes
	var rows = getElementsByOjName(colsToHide[i]);//redwood_changes
      for(var j=0;j<rows.length;j++){
         rows[j].style.display='none';
      }
   }
   var labels = document.getElementsByTagName('label'), l = labels.length, label, i;
   for (i = 0; i < l; i++) {
      label = labels[i];
      if (label.htmlFor == 'IDI' || label.htmlFor == 'LIAB_IDI') {
         label.style.display = 'none';
      }
   }
   return true;
}
//Bug#34516337 ends
