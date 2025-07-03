/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright © 2008 - 2015  Oracle and/or its affiliates.  All rights reserved.
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
**  File Name          : CSDCOINS_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : Shubhanshu 
**  Last modified on   : 12-Apr-2012
**  Bug No			   :13943389
**  Reason             :Disabling of operational icon

 **  Modified By           : Ajai
 **  Modified On           : 08-Apr-2015
 **  Modified Reason       : FCUBS12.1dev_MEMOINSTRCTN
 
 **  Modified By           : Zawid Khan
 **  Modified On           : 22-Mar-2017
 **  Modified Reason       : Code Commented to restrict Account No field not to Display undefined on launching CSDCOINS screen.
 **  Modified Reason       : FCUBS_12.4_ITR1_25737134
 
   Modified By          : Vipan Kumar
  Modified On           : 06-SEP-2018
  Modified Reason       : Changes done to display instruction details maintained for account.
  Retro String          : 28486456 
  Search String         : 9NT1606_14_1_RETRO_12_3_28591548

 **  Modified By           : Ambika S
 **  Modified On           : 16-Nov-2018
 **  Modified Reason       : Changes done to display account level instruction details in F12 screen when 
                             pressed on Instruction Details/F6 key
 **  Modified Reason       : 9NT1606_14_1_RETRO_12_4_28913035
**
** Modified By         : Shayam Sundar Ragunathan
** Modified Date       : 26-Aug-2020
** Modified Reason     : Removed branch code condition
** Search string       : 9NT1606_14_4_OFSS_CONSULTING_31795163
**
** Modified By         : Meenakshi K
** Modified Date       : 07-Sep-2021
** Modified Reason     : Disabling of Enter/Execute query is handled in post focus. Commented the same.
** Search string       : Bug#33133338
****************************************************************************************************************************/
function fnPostLoad_KERNEL(){
    var parentWin = fnGetParentWin();
    if (parentWin == 'undefined' || parentWin == '')
    {
	fnEnterQuery();
        //document.getElementById('BLK_INSTR_MASTER__CUSTOMERNO').value = mainWin.parentWinParams.custno;//FCUBS_12.4_ITR1_25737134
        gAction = 'EXECUTEQUERY';
        fnExecuteQuery();
	
    }
else
{
    //9NT1606_14_1_RETRO_12_4_28913035 Starts
	if(parentWin.functionId == 'SVDIMGVW') {
		fnEnterQuery();
		document.getElementById('BLK_INSTR_MASTER__CUSTACNO').value = parentWin.parentWin.parentWinParams.accNo;
		document.getElementById('BLK_INSTR_MASTER__BRNCD').value = parentWin.parentWin.parentWinParams.brn;
        gAction = 'EXECUTEQUERY';
        fnExecuteQuery();
		return true;
	}
	//9NT1606_14_1_RETRO_12_4_28913035 Ends
	if (typeof(parentWin.parentWinParams.custno) !='undefined' && parentWin.parentWinParams.custno !="" && parentWin.parentWinParams.custno !=null) {
        fnEnterQuery();
        document.getElementById('BLK_INSTR_MASTER__CUSTOMERNO').value = parentWin.parentWinParams.custno;
		document.getElementById('BLK_INSTR_MASTER__MODULE').value = parentWin.parentWinParams.moduleid; //FCUBS12.1dev_MEMOINSTRCTN
        gAction = 'EXECUTEQUERY';
        fnExecuteQuery();
    //} else if((typeof(parentWin.parentWinParams.accno) !='undefined' && typeof(parentWin.parentWinParams.branch) !='undefined') && (parentWin.parentWinParams.accno !="" && parentWin.parentWinParams.branch !="") && (parentWin.parentWinParams.accno !=null && parentWin.parentWinParams.branch !=null)) { //9NT1606_14_4_OFSS_CONSULTING_31795163 -Commented
    } else if((typeof(parentWin.parentWinParams.accno) !='undefined') && (parentWin.parentWinParams.accno !="") && (parentWin.parentWinParams.accno !=null)) {//9NT1606_14_4_OFSS_CONSULTING_31795163
        fnEnterQuery();
        document.getElementById('BLK_INSTR_MASTER__CUSTOMERNO').value = parentWin.parentWinParams.accno;//Bug_36924146 Changes
		document.getElementById('BLK_INSTR_MASTER__CUSTACNO').value = parentWin.parentWinParams.accno;
	    //document.getElementById('BLK_INSTR_MASTER__BRNCD').value = parentWin.parentWinParams.branch;//9NT1606_14_4_OFSS_CONSULTING_31795163 -Commented
	    document.getElementById('BLK_INSTR_MASTER__MODULE').value = parentWin.parentWinParams.moduleid;//FCUBS12.1dev_MEMOINSTRCTN
        gAction = 'EXECUTEQUERY';
        fnExecuteQuery();
    } else if (parentWin.parentWinParams.contrefno !=""  && typeof(parentWin.parentWinParams.contrefno) !='undefined' && parentWin.parentWinParams.contrefno !=null) {
        fnEnterQuery();
        document.getElementById('BLK_INSTR_MASTER__CONTREFNO').value = parentWin.parentWinParams.contrefno;
		document.getElementById('BLK_INSTR_MASTER__MODULE').value = parentWin.parentWinParams.moduleid;//FCUBS12.1dev_MEMOINSTRCTN
        gAction = 'EXECUTEQUERY';
        fnExecuteQuery();
    }
  //9NT1606_14_1_RETRO_12_3_28591548   starts
  else if (typeof(parentWin.parentWin.parentWinParams) !='undefined' && parentWin.parentWin.parentWinParams.accNo !=""  && typeof(parentWin.parentWin.parentWinParams.accNo) !='undefined') {
        fnEnterQuery();
        document.getElementById('BLK_INSTR_MASTER__CUSTOMERNO').value = parentWin.parentWin.parentWinParams.accNo;
		document.getElementById('BLK_INSTR_MASTER__BRNCD').value = parentWin.parentWin.parentWinParams.brn;
        gAction = 'EXECUTEQUERY';
        fnExecuteQuery();
    } 
    //9NT1606_14_1_RETRO_12_3_28591548   ends
}
    return true;
}
//Bug#33133338 Starts
/*
function fnPostFocus_KERNEL(){
        document.getElementById("EnterQuery").disabled = true;
        document.getElementById("EnterQuery").style.display = "none";
        document.getElementById("ExecuteQuery").disabled = true;
        document.getElementById("ExecuteQuery").style.display = "none";
 return true;
}
*/
//Bug#33133338 Ends
/*
function fnPreExit_KERNEL(){
parent.custno="";
parent.accno="";
parent.branch="";
parent.contrefno="";
 return true;
}
*/

