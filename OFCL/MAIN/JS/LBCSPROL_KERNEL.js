/***************************************************************************************************************************
**  This source is part of the FLEXCUBE Software Product. 
**  Copyright (c) 2008 ,2017, Oracle and/or its affiliates.
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
**  File Name          : LBCSPROL_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  SRF   : 27346184
**  Last modified on   : 05-JAN-2018
**  search String       : OBCL_27346184
**  Reason             : Added Fetch button inside Rate fixing subscreen and handled call for it.
**  
**  SRF   				: 28608204
**  Last modified on    : 20-JUN-2019
**  search String       : BUG#28608204
**  Reason              : Added code to enable the populate button.

    Changed By		   : ANUSHA K
**  Last modified on   : 07-JUN-2019
**  search String      : OBCL_14.2_SUPP_RABO_#29880326 
**  Reason             : Enabled rtfx and rtsetting button for floating interest types if ratefixing is yes.

**  Changed By		   : Prakash Ravi
**  Last modified on   : 04-NOV-2019
**  search String      : OBCL_14.4.0_PAST_DUE_TRACKING 
**  Reason             : Code to enable liqd princ and int flags.

**  Changed By		   : Ramya
**  Last modified on   : 26-FEB-2019
**  search String      : OBCL_14.3_BASE_BUG#30597643
**  Reason             : Code to enable Interest Parameter Basis

**  Changed By		   : Ramya/Prakash
**  Last modified on   : 06-MAR-2019
**  search String      : OBCL_14.3_BASE_BUG#30597643
**  Reason             : Code to enable BLK_SPROL Block

*  Changed By		   : Arunprasath
**  Last modified on   : 15-Jun-2019
**  search String      : OBCL_14.4_SOFR_SPROL
**  Reason             : Added code for split rollover changes

**Changed By         : Janki
**Date               : 16-SEP-2021
**Change Description : restrict the modification of tranche margin during split rollover
**Search String      : Bug#33333055

**Changed By         : Janki
**Date               : 014-FEB-2021
**Change Description : Fix given to modify the forward dated split rollover details using CAMD
**Search String      : OBCL_145_LS_Rollover_Unlock

**Changed By         : Janki
**Date               : 12-Jul-2021
**Change Description : Interest Screen is not launching while querying the contract
**Search String      : BUG#33823557

**Changed By         : Sowmya Bitra
**Date               : 08-Dec-2022
**Change Description : Changes to enable editing rate fixing required and rate code usage during split rollover
**Search String      : Bug#34823764

**Changed By         :Anusha k
**Date               : 20-jan-2023
**Change Description : Changes done to assign value as Y to desc feild on visting eXchange ratefixing callform
**Search String      : OBCL_14.6_#34968986 CHANGES

**  CHANGE LOG         : RAMYA M
**  Last modified on   : 08-03-2023
**  Reason             : I shouldnt replaced
**  SEARCH STRING      : BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES

**  CHANGE LOG         : RAMYA M
**  Last modified on   : 11-APR-2023
**  Reason             : Divsubsytem changes
**  SEARCH STRING      : BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES

**  CHANGE LOG         : RAMYA M
**  Last modified on   : 28-APR-2023
**  Reason             : Postaddrow function is not working ,the seqno is not generating properly
**  SEARCH STRING      : BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES

**Changed By         : Jayaram N
**Date               : 05-Aug-2023
**Change Description : LBDREPRS - UNHANDLED EXCEPTION ON VISITING INTEREST RATE FIXING CALL FORM
**Search String      : Bug#35425170

    **  Changed By       : Anusha K
  **  Changed On         : 27-DEC-2024
  **  Change Description : commented code disabling subscreens
  **  Search String      : Bug#37226600
****************************************************************************************************************************/
var lAction;
var BtnName;
var Indicator;
var gRollIntStat;

function fn_Enable_Disable_Fld(){
	if (lAction != 'POPULATE'){

fnEnableElement(document.getElementById("BLK_SPROL__INT_RTFIX_DATE")); //ANKK
fnEnableElement(document.getElementById("BLK_SPROL__INT_PRM_BASIS"));//OBCL_14.3_BASE_BUG#30597643
		if (document.getElementById("BLK_SPROL_MAS__ED_CASH_INT_AMT").value == 'N'){
			fnDisableElement(document.getElementById("BLK_SPROL__CASH_INT_AMT"));	
			fnEnDis_SubsysBtn('CVS_PART_INT_SHARE','D');
		}
		else{
			fnEnableElement(document.getElementById("BLK_SPROL__CASH_INT_AMT"));
			fnEnDis_SubsysBtn('CVS_PART_INT_SHARE','E');	
		}
		if (document.getElementById("BLK_SPROL_MAS__PRM_EXFX_REQ").value == 'N'){
			fnDisableElement(document.getElementById("BLK_SPROL__EXCH_RTFIX_DATE"));		
		}
		else{
			fnEnableElement(document.getElementById("BLK_SPROL__EXCH_RTFIX_DATE"));	
		}
		//if (document.getElementById("BLK_SPROL_MAS__PRM_IRFX_REQ").value == 'N'){
			//fnDisableElement(document.getElementById("BLK_SPROL__INT_RTFIX_DATE"));		
		//}
		//else{
		//	fnEnableElement(document.getElementById("BLK_SPROL__INT_RTFIX_DATE"));	
		//}
		var l_Rol_Instr_Stat = document.getElementById("BLK_SPROL__ROL_INST_STATA").value;
		if (l_Rol_Instr_Stat != ""){
			//start: OBCL_145_LS_Rollover_Unlock
			//if ((l_Rol_Instr_Stat != 'I') ||(l_Rol_Instr_Stat != 'D') ||(l_Rol_Instr_Stat != 'P')){
			if ((l_Rol_Instr_Stat == 'I') ||(l_Rol_Instr_Stat== 'D') ||(l_Rol_Instr_Stat == 'P')){
			}
			else{
			//END: OBCL_145_LS_Rollover_Unlock
				disableForm();
			}
			if (l_Rol_Instr_Stat == 'D'){
				fnDisableScreenElement("TAB_MAIN__SEC_SPROL_DET");		
				fnDisableScreenElement("TAB_MAIN__SEC_SPROL_INT");	
				fnDisableScreenElement("TAB_MAIN__SEC_SPROL_MAR");
				fnDisableScreenElement("TAB_MAIN__SEC_2__P1__FST_MAS_PREF");		
			} 
		}
		if (document.getElementById("BLK_SPROL_MAS__ED_LQI").value == 'N'){//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
			fnDisableElement(document.getElementById("BLK_SPROL__LIQD_INT"));		
		}
		else{
			fnEnableElement(document.getElementById("BLK_SPROL__LIQD_INT"));	
		}
		if (document.getElementById("BLK_SPROL_MAS__ED_LQP").value == 'N'){
			fnDisableElement(document.getElementById("BLK_SPROL__ILIQD_PRINCE"));		
		}
		else{
			fnEnableElement(document.getElementById("BLK_SPROL__LIQD_PRINCE"));	
		}
		if (document.getElementById("BLK_SPROL_MAS__ED_RROL").value == 'N'){
			fnDisableElement(document.getElementById("BLK_SPROL_MAS__RMVROL"));		
		}
		else{
			fnEnableElement(document.getElementById("BLK_SPROL_MAS__RMVROL"));	
		}
		fn_Chg_Dfront();
		fnEnableIntDetBtn();  //OBCL_14.4_SOFR_SPROL
	}
	/*
	else{	
		fn_Chg_Rt_ty();
		}
	*/  //OBCL_14.4_SOFR_SPROL commented	
	return true;
}
function fnEnDis_SubsysBtn(BtnName,Indicator){
	//var len = document.getElementById("DIVSubSystem").children[0].children.length;
var len = document.getElementById("subSystemConveyorBelt").getElementsByClassName("oj-button").length;
	for (var idx = 0; idx < len; idx++) {
		document.getElementById("subSystemConveyorBelt").getElementsByClassName("oj-button")[idx].id == "OLCPDFDM"

		//if (document.getElementById("DIVSubSystem").children[0].children[idx].getElementsByTagName("li")[0].id == BtnName)  {//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
		if	(document.getElementById("subSystemConveyorBelt").getElementsByClassName("oj-button")[idx].id == BtnName)  {//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
			//var BtnLink =BtnLink = document.getElementById("DIVSubSystem").children[0].children[idx].getElementsByTagName("li")[0].getElementsByClassName("Abutton")[0];//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
		
			var BtnLink = document.getElementById("subSystemConveyorBelt").getElementsByClassName("oj-button")[idx];//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
			if(BtnLink==undefined){
			//	BtnLink = document.getElementById("DIVSubSystem").children[0].children[idx].getElementsByTagName("li")[0].getElementsByClassName("Abutton")[0];//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
	
				BtnLink = document.getElementById("subSystemConveyorBelt").getElementsByClassName("oj-button")[idx];//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
			}
			if (Indicator == 'D'){
				fnDisableSubSysButtons(BtnLink);
			}
			else{
				fnEnableSubSysButtons(BtnLink);
			}	
		}
	}		
	
	return true;
}
function fn_Chg_Rt_ty(){
	var noRows = getTableObjForBlock("BLK_SPROL_INT").tBodies[0].rows.length;
		for (var rowIndex = 0;rowIndex < noRows;rowIndex++) {
			if (getElementsByOjName("SPIN_RTTYPE")[rowIndex].value =='X'){
				fnEnableElement(getElementsByOjName("SPIN_FIX_RTTYPE")[rowIndex]);	
				fnDisableElement(getElementsByOjName("SPIN_RTCD")[rowIndex]);	
				fnDisableElement(getElementsByOjName("SPIN_SPREAD")[rowIndex]);
				if (getElementsByOjName("SPIN_FIX_RTTYPE")[rowIndex].value =='U'){
					if (parent.document.getElementById("BLK_SPROL_MAS__ED_RT_CD").value == 'N'){    //OBCL_14.4_SOFR_SPROL
						fnDisableElement(getElementsByOjName("SPIN_FIX_RTCD")[rowIndex]);		
					}
					else{
						fnEnableElement(getElementsByOjName("SPIN_FIX_RTCD")[rowIndex]);
					}
				}
				else{
					fnDisableElement(getElementsByOjName("SPIN_RT")[rowIndex]);
					fnEnableElement(getElementsByOjName("SPIN_FIX_RTCD")[rowIndex]);
				}
				if (getElementsByOjName("SPIN_COMP")[rowIndex].value == parent.document.getElementById("BLK_SPROL_MAS__PRM_ICCF_COMPONENT").value){    //OBCL_14.4_SOFR_SPROL
					if (parent.document.getElementById("BLK_SPROL_MAS__PRM_IRFX_REQ").value == 'Y'){   //OBCL_14.4_SOFR_SPROL
						//fnEnableElement(parent.getElementsByOjName("BTN_RATESET")[rowIndex]);
						//fnEnableElement(parent.getElementsByOjName("BTN_RATEFIX")[rowIndex]);
						fnEnDis_SubsysBtn('CVS_INT_DTLS','E');   //OBCL_14.4_SOFR_SPROL
					}
					else{
						//fnDisableElement(parent.getElementsByOjName("BTN_RATESET")[rowIndex]);
						//fnDisableElement(parent.getElementsByOjName("BTN_RATEFIX")[rowIndex]);
						fnEnDis_SubsysBtn('CVS_INT_DTLS','D');   //OBCL_14.4_SOFR_SPROL
					}
				}
			}
			else{
				fnDisableElement(getElementsByOjName("SPIN_FIX_RTTYPE")[rowIndex]);	
				fnDisableElement(getElementsByOjName("SPIN_FIX_RTCD")[rowIndex]);
				fnDisableElement(getElementsByOjName("SPIN_RT")[rowIndex]);
				fnEnableElement(getElementsByOjName("SPIN_RTCD")[rowIndex]);	
				fnEnableElement(getElementsByOjName("SPIN_SPREAD")[rowIndex]);
				//OBCL_14.2_SUPP_RABO_#29880326 starts
				//fnDisableElement(getElementsByOjName("BTN_RATESET")[rowIndex]);
				//fnDisableElement(getElementsByOjName("BTN_RATEFIX")[rowIndex]);
				//Check once in RATE_TYPE
					if (getElementsByOjName("SPIN_COMP")[rowIndex].value == parent.document.getElementById("BLK_SPROL_MAS__PRM_ICCF_COMPONENT").value){
					if (parent.document.getElementById("BLK_SPROL_MAS__PRM_IRFX_REQ").value == 'Y'){
						//fnEnableElement(parent.getElementsByOjName("BTN_RATESET")[rowIndex]);
						//fnEnableElement(parent.getElementsByOjName("BTN_RATEFIX")[rowIndex]);
						fnEnDis_SubsysBtn('CVS_INT_DTLS','E');   //OBCL_14.4_SOFR_SPROL
					}
					else{
						//fnDisableElement(parent.getElementsByOjName("BTN_RATESET")[rowIndex]);
						//fnDisableElement(parent.getElementsByOjName("BTN_RATEFIX")[rowIndex]);
						fnEnDis_SubsysBtn('CVS_INT_DTLS','D');   //OBCL_14.4_SOFR_SPROL
					}
					//OBCL_14.2_SUPP_RABO_#29880326 ends
				}
			}		
		}
		fn_Chg_Mar();
	return true;
}
function fn_Chg_Mar(){
	//fnDisableScreenElement("TAB_MAIN__SEC_SPROL_MAR");  //OBCL_14.4_SOFR_SPROL commented
    fnDisableScreenElement("TAB_MAIN__SEC_4");  	//OBCL_14.4_SOFR_SPROL
	var noRows = getTableObjForBlock("BLK_SPROL_MARGIN").tBodies[0].rows.length;
	for (var rowIndex = 0;rowIndex < noRows;rowIndex++) {
		if (getElementsByOjName("MAR_BASIS")[rowIndex].value =='D'){
			fnEnableElement(getElementsByOjName("MAR_RT")[rowIndex]);	
		}
		else{
			fnDisableElement(getElementsByOjName("MAR_RT")[rowIndex]);
		}		
	}
	return true;
}
function fn_Chg_Dfront(){
	var L_Front;
	var radioButtons = getElementsByOjName("DEFL_FRONT");
	for (var x = 0; x < radioButtons.length; x ++) {
		  if (radioButtons[x].value) {
		   L_Front = radioButtons[x].value;
		 }
     }
	if (L_Front == 'N'){		
		var noRows = getTableObjForBlock("BLK_SPROL_DET").tBodies[0].rows.length;
		for (var rowIndex = 0;rowIndex < noRows;rowIndex++) {
			fnEnableElement(getElementsByOjName("SP_CON_FOR_SPLIT")[rowIndex]);		
		}
	}
	else{
		var noRows = getTableObjForBlock("BLK_SPROL_DET").tBodies[0].rows.length;
		for (var rowIndex = 0;rowIndex < noRows;rowIndex++) {
			fnDisableElement(getElementsByOjName("SP_CON_FOR_SPLIT")[rowIndex]);		
		}
	}
	return true;
}
function fnOnSprol(){
	
	if (lAction != 'POPULATE'){   //OBCL_14.4_SOFR_SPROL	
	var noRows = getTableObjForBlock("BLK_SPROL_DET").tBodies[0].rows.length;
		for (var rowIndex = 0;rowIndex < noRows;rowIndex++) {
			if (gAction != ''){
				if (getTableObjForBlock("BLK_SPROL_DET").tBodies[0].rows[rowIndex].cells[0].getElementsByTagName("INPUT")[0].checked == true) {
					fn_Enable_Disable_Fld();
				}
			}	
			if (document.getElementById("BLK_SPROL_MAS__PRM_EXFX_REQ").value == 'Y'){
				fnEnableElement(getElementsByOjName("BTN_EXRATE")[rowIndex]);	
			}	
			else{
				fnDisableElement(getElementsByOjName("BTN_EXRATE")[rowIndex]);	
			}
				
		}	
	}	
	/*if ((gAction != 'DEFAULT') && (gAction != '')){
		fn_Chg_Rt_ty();
	}*/  //OBCL_14.4_SOFR_SPROL commented	
	return true;
}
function fnOnInt(){
	var noRows = getTableObjForBlock("BLK_SPROL_INT").tBodies[0].rows.length;
		for (var rowIndex = 0;rowIndex < noRows;rowIndex++) {
			if (getTableObjForBlock("BLK_SPROL_INT").tBodies[0].rows[rowIndex].cells[0].getElementsByTagName("INPUT")[0].checked=true){
				//if (getElementsByOjName("SPIN_FCCREF")[rowIndex].value == 'Y'){//OBCL_14.3_BASE_BUG#30597643
					if (getElementsByOjName("SPIN_FCCREF")[rowIndex].value != ''){//OBCL_14.3_BASE_BUG#30597643

					//fnEnableElement(parent.getElementsByOjName("BTN_RATESET")[rowIndex]);
					//fnEnableElement(parent.getElementsByOjName("BTN_RATEFIX")[rowIndex]);
					fnEnDis_SubsysBtn('CVS_INT_DTLS','E');   //OBCL_14.4_SOFR_SPROL
				}
				else{
					//fnDisableElement(parent.getElementsByOjName("BTN_RATESET")[rowIndex]);
					//fnDisableElement(parent.getElementsByOjName("BTN_RATEFIX")[rowIndex]);
					fnEnDis_SubsysBtn('CVS_INT_DTLS','D');   //OBCL_14.4_SOFR_SPROL
				}
			}	
		}
	if (gAction != ''){	
		fn_Chg_Rt_ty();
	}
	return true;
}
function fnPostAddRow_BLK_SPROL_DET_KERNEL(arg) {
	/*rowIndex = dbIndexArray["BLK_SPROL_DET"];
    getElementsByOjName("SP_NO")[rowIndex - 1].value = rowIndex;*///BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
	
	var noofRows =getTableObjForBlock("BLK_SPROL_DET").tBodies[0].rows.length;//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
	 for (var rowIndex = 0;rowIndex < noofRows;rowIndex++) {//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
        getElementsByOjName("SP_NO")[rowIndex].value = rowIndex + 1;//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
	//	getElementsByOjName("SP_NOI")[rowIndex].value = rowIndex + 1;//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
    }
//	getElementsByOjName("SP_NOI")[rowIndex - 1].value = rowIndex;//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
    return true;
}
function fnPostDeleteRow_BLK_SPROL_DET_KERNEL() {
	var noRows = getTableObjForBlock("BLK_SPROL_DET").tBodies[0].rows.length;
    for (var rowIndex = 0;rowIndex < noRows;rowIndex++) {
        getElementsByOjName("SP_NO")[rowIndex].value = rowIndex + 1;
	//	getElementsByOjName("SP_NOI")[rowIndex].value = rowIndex + 1;//BUG#34958820_OBCL_14.8_LS_REDWOOD_CHANGES
    }
    return true;
}
function fnRecompute(){
	lAction = 'RECOMPUTE';
	fnClassDefault("BLK_SPROL_MAS");
	return true;
}
function  fnPostLoad_CVS_SPROL_KERNEL(){
	if (gAction != ''){
		//getElementsByOjName("cmdAddRow_BLK_SPROL_INT")[0].style.visibility = "hidden"; //sowmya commented
		//getElementsByOjName("cmdDelRow_BLK_SPROL_INT")[0].style.visibility = "hidden"; //sowmya commented	
		fnDisableElement(document.getElementById("BLK_SPROL__BTN_RECOMPUTE"));	
		//fnEnableElement(document.getElementById("BLK_SPROL_MAS__BTN_POPULATE")); //BUG#28608204  //OBCL_14.4_SOFR_SPROL commented
	    fnEnableScreenElement("TAB_MAIN__SEC_SPROL_DET");	//BUG#28608204
		fn_Enable_Disable_Fld();	
		//fnDisableSubSysButtons();//Bug#37226600 Commented fn disabling subsystem
	}
	addEvent(document.getElementById("BLK_SPROL_DET"), "onclick", "fnOnSprol()"); //Adding event on click of BLK_LFTBS_CONTRACT_FEE_MULTI
	//addEvent(document.getElementById("BLK_SPROL_INT"), "onclick", "fnOnInt()"); //Adding event on click of BLK_LFTBS_CONTRACT_FEE_MULTI //OBCL_14.4_SOFR_SPROL commented
	//fnEnableElement(document.getElementById("BLK_SPROL__BTN_RATEFIX"));	//OBCL_27346184 //OBCL_14.4_SOFR_SPROL
	//fnEnableElement(document.getElementById("BLK_SPROL__BTN_RATESET"));	//OBCL_27346184 //OBCL_14.4_SOFR_SPROL
	//fnEnDis_SubsysBtn('CVS_INT_DTLS','E');   //OBCL_14.4_SOFR_SPROL
	if (gAction == 'NEW' || gAction == 'SUBSYSPKP_NEW' || gAction == 'MODIFY' || gAction == 'SUBSYSPKP_MODIFY' ){ //OBCL_14.3_BASE_BUG#30597643
    fnEnableScreenElement("TAB_MAIN__SEC_2__P1__FST_MAS_PREF"); //OBCL_14.3_BASE_BUG#30597643
    fnEnableScreenElement("TAB_MAIN__SEC_2__P2__FST_MAS_AMT");	//OBCL_14.3_BASE_BUG#30597643
	fnEnDis_Recompute();
	}
	
	fnEnableIntDetBtn();   //OBCL_14.4_SOFR_SPROL
	return true;
}
function fnPopulate(){
    if (gAction == 'NEW' || gAction == 'SUBSYSPKP_NEW' || gAction == 'MODIFY' || gAction == 'SUBSYSPKP_MODIFY' ){  //OBCL_14.4_SOFR_SPROL
	    lAction = 'POPULATE';
	    fnClassDefault("BLK_SPROL_MAS");
	}
    if (gAction=='') {
	console.log('in queryy');
	fnSubScreenMain('LBCSPROL', 'LBCSPROL', 'CVS_INT_DTLS', false);//OBCL_14.5_Supp_SMTB_#33454468 Changes  //BUG#33823557 uncommented
	}    //    BUG#33823557 added condition for query       
	return true;
}
function  fnPreClassDefault_CVS_SPROL_KERNEL(){
	if (lAction == 'RECOMPUTE'){
		gAction = 'PRDDFLT';
	}	
	return true;
}
function  fnPostClassDefault_CVS_SPROL_KERNEL(){
	if (lAction == 'POPULATE'){
		var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
		if (msgStatus != "FAILURE" ){
			fnDisableScreenElement("TAB_MAIN__SEC_1");
			fnDisableScreenElement("TAB_MAIN__SEC_2");
			//fnDisableScreenElement("TAB_MAIN__SEC_SPROL_DET");	  //OBCL_14.4_SOFR_SPROL commented
			fn_Enable_Disable_Fld();	  
            fnEnableElement(document.getElementById("BLK_SPROL__LIQD_INT"));//OBCL_14.4.0_PAST_DUE_TRACKING
            fnEnableElement(document.getElementById("BLK_SPROL__LIQD_PRINCE"));	//OBCL_14.4.0_PAST_DUE_TRACKING	
			//fnEnableElement(document.getElementById("BLK_SPROL__INT_PRM_BASIS"));	//	OBCL_14.3_BASE_BUG#30597643	 
			//fnDisableElement(document.getElementById("BLK_SPROL_MAS__BTN_POPULATE"));   //OBCL_14.4_SOFR_SPROL commented
			/*var radioButtons = getElementsByOjName("ROL_AMT_TYPE");
			for (var x = 0; x < radioButtons.length; x ++) {
				if (radioButtons[x].value) {
					var l_Rol_Amt_type = radioButtons[x].value;
				}
			}
			if (l_Rol_Amt_type != 'I'){
				fnEnableElement(document.getElementById("BLK_SPROL__BTN_RECOMPUTE"));	
			}*///replaced with fnEnDis_Recompute OBCL_14.3_BASE_BUG#30597643
			fnEnDis_Recompute();//OBCL_14.3_BASE_BUG#30597643
			fnEnableSubSysButtons();						
			fnOnSprol();
			var messageNode = getXMLString(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP"));  
			var returnVal = displayResponse(messageNode,msgStatus,'I');
			//OBCL_14.5_Supp_SMTB_#33454468 Changes Starts
			fnSubScreenMain('LBCSPROL', 'LBCSPROL', 'CVS_INT_DTLS', false);  
			return true;
		}
		else{		
			return true;
			//OBCL_14.5_Supp_SMTB_#33454468 Changes Ends
		}	
	}
	return true;
}
//Ex_Rate
function fnExrate() {
	fnSubScreenMain('LBCSPROL', 'LBCSPROL', 'CVS_EXRT_FIX', false);
    return true;
}
function fnPreLoad_CVS_EXRT_FIX_KERNEL(){
	var noRows = getTableObjForBlock("BLK_SPROL_DET").tBodies[0].rows.length;
		for (var rowIndex = 0;rowIndex < noRows;rowIndex++) {
			if (getTableObjForBlock("BLK_SPROL_DET").tBodies[0].rows[rowIndex].cells[0].getElementsByTagName("INPUT")[0].checked==true){
				screenArgs["FCCREF"] = getElementsByOjName("SP_FCCREF")[rowIndex].value;
				screenArgs["SPNO"] = getElementsByOjName("SP_NO")[rowIndex].value;
			}	
		}
	return true;
}
function fnPostLoad_CVS_EXRT_FIX_KERNEL(){
	if (gAction != ''){
		enableForm();
	}
	//OBCL_14.6_#34968986 CHANGES STARTS
		fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
	var RecnodeList = selectNodes(fcjResponseDOM, '//REC[@TYPE="BLK_EXRT_DET"]/FV');
	if(RecnodeList.length>0){
		var RecnodeListLen = RecnodeList.length;
		for(var i = 0; i < RecnodeListLen; i++){
			var TextContents = mySplit(getText(RecnodeList[i]),"~");
			
			document.getElementById("BLK_EXRT_DET__TXT_EXRT_VISITED").value = 'Y';
			
		}
	}
	//OBCL_14.6_#34968986 CHANGES ENDS
	return true;
}
//Rate Fixing
function fnRtFix() {
	fnSubScreenMain('LBCSPROL', 'LBCSPROL', 'CVS_RATE_FIX', false);
    return true;
}
function fnPreLoad_CVS_RATE_FIX_KERNEL(){
	//var noRows = getTableObjForBlock("BLK_SPROL_INT").tBodies[0].rows.length;
		//for (var rowIndex = 0;rowIndex < noRows;rowIndex++) {
			//if (getTableObjForBlock("BLK_SPROL_INT").tBodies[0].rows[rowIndex].cells[0].getElementsByTagName("oj-input-text")[0].value==true){
				screenArgs["RTFX_FCCREF"] = getElementsByOjName("SPIN_FCCREF").value;
				screenArgs["RTFX_SPNO"] = getElementsByOjName("SPIN_SPNO").value;				
				screenArgs["RTFX_COOMP"] = getElementsByOjName("SPIN_COMP").value;
			//}	
		//}
	parent.getElementsByOjName("SEL_RTFX_SPNO")[0].value = screenArgs["RTFX_SPNO"] ;  
	parent.getElementsByOjName("SEL_RTFX_COMP")[0].value = screenArgs["RTFX_COOMP"] ; 
	return true;
}
function fnPostLoad_CVS_RATE_FIX_KERNEL(){
	if (gAction != ''){
		lAction = 'POPRTEX';
		fnClassDefault("BLK_SPROL_MAS");  //OBCL_14.4_SOFR_SPROL commented //Bug#34823764 uncommented
		enableForm();
	}
	return true;
}
function  fnPreClassDefault_CVS_RATE_FIX_KERNEL(){
	gAction = lAction;	
	gDispAlertOnSuccess = 'N';
	return true;
}
function  fnPostClassDefault_CVS_RATE_FIX_KERNEL(){
	var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
	if (msgStatus != "FAILURE" ){
		gDispAlertOnSuccess = 'Y';
		enableForm();
	}
	return true;
}
//OBCL_27346184 starts
var screenArguments = new Array(); 
function mySplit(str, ch) {
    var pos, start = 0, result = [];
    while ((pos = str.indexOf(ch, start)) != -1) {
        result.push(str.substring(start, pos));
        start = pos + 1;
    }
    result.push(str.substr(start));
    return(result);    
}
function getText(elem) {
	if (getBrowser().indexOf("IE") != -1) {
		return elem.text;
	}else{
		return elem.textContent;
	}
}
function fnFetch(){
	var g_prev_gAction = gAction;
	var splitRowNo;//Bug#35425170:Added
    gAction = "FETCH";
    appendData();
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
	if (fcjResponseDOM) {
        var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
        if (msgStatus == "FAILURE") {
            var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
        } else if (msgStatus == "WARNING" || msgStatus == "SUCCESS") {
              var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
            }
        }
       if (fcjResponseDOM) {
    var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
        if (msgStatus == "FAILURE") {
            var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
        } else if (msgStatus == "WARNING" || msgStatus == "SUCCESS") {
              var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
        }
    }
	if (msgStatus == "FAILURE") {
        var returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'E');
		var RecnodeList = selectNodes(fcjResponseDOM, '//REC[@TYPE="BLK_INT_RATE_FIXING"]/FV');
		if(RecnodeList.length>0){
			var RecnodeListLen = RecnodeList.length;
			for(var i = 0; i < RecnodeListLen; i++){
				var TextContents = mySplit(getText(RecnodeList[i]),"~");			
					document.getElementById("BLK_INT_RATE_FIXING__RATE").value = '';  
					document.getElementById("BLK_RTFX_DET__RTFXD_RT").value = ''; //OBCL_27360130 
		 					
			}
		}
		 gAction = g_prev_gAction;		 
        return false;
    }
	
	/*var RecnodeList = selectNodes(fcjResponseDOM, '//REC[@TYPE="BLK_RTFX_DET"]/FV');
	if(RecnodeList.length>0){
		var RecnodeListLen = RecnodeList.length;
		for(var i = 0; i < RecnodeListLen; i++){
			var TextContents = mySplit(getText(RecnodeList[i]),"~");			
			    document.getElementById("BLK_RTFX_DET__RTFXD_RT").value = TextContents[7];  //OBCL_27360130 
				document.getElementById("BLK_RTFX_DET__RTFXD_RTI").value = TextContents[7]; //OBCL_27360130 
		}
	}*///Bug#35425170:Commented
	
	//Bug#35425170:Changes Starts here
	try
	{
		var data_blk = "BLK_SPROL_DET";
		var len = parent.parent.document.getElementById(data_blk).tBodies[0].rows.length;
		for (var index = 0; index <= len; index++) 
		{
            if (parent.parent.document.getElementById(data_blk).tBodies[0].rows[index].cells[0].getElementsByTagName("INPUT")[0].checked == true) 
				splitRowNo = index;			
		}
	} 
	catch (e) {}	
	
	var RecnodeList = selectNodes(fcjResponseDOM, '//REC[@TYPE="BLK_RTFX_DET"]/FV');
	if(RecnodeList.length>0)
	{
		var RecnodeListLen = RecnodeList.length;
		for(var i = 0; i < RecnodeListLen; i++)
		{
				var TextContents = mySplit(getText(RecnodeList[i]),"~");	
				if (TextContents[1] == splitRowNo+1)
				{
					document.getElementById("BLK_RTFX_DET__RTFXD_RT").value = TextContents[7];  
					document.getElementById("BLK_RTFX_DET__RTFXD_RTI").value = TextContents[7]; 
				}
			    
		}
			
	}
	//Bug#35425170:Changes Starts here
	
	return true;
}

function fnPreSave_CVS_RATE_FIX_KERNEL(screenArgs)
{
	if (document.getElementById("BLK_RTFX_DET__RTFXD_RT").value != ''){
		/*var data_blk = "BLK_SPROL_INT";
		try{
		var len = parent.getTableObjForBlock(data_blk).tBodies[0].rows.length;
		for (var index = 0; index <= len; index++) {
            if (parent.getTableObjForBlock(data_blk).tBodies[0].rows[index].cells[0].getElementsByTagName("INPUT")[0].checked == true) {	
				
					parent.getTableObjForBlock(data_blk).tBodies[0].rows[index].cells[5].getElementsByTagName("oj-input-text")[0].value = getTableObjForBlock("BLK_RTFX_DET__RTFXD_CD").value;
					parent.getTableObjForBlock(data_blk).tBodies[0].rows[index].cells[6].getElementsByTagName("oj-input-text")[0].value = getTableObjForBlock("BLK_RTFX_DET__RTFXD_RT").value;
					fireHTMLEvent(parent.getTableObjForBlock(data_blk).tBodies[0].rows[index].cells[5].getElementsByTagName("oj-input-text")[0], "onpropertychange");
					fireHTMLEvent(parent.getTableObjForBlock(data_blk).tBodies[0].rows[index].cells[6].getElementsByTagName("oj-input-text")[0], "onpropertychange");
				
			}
		}
		} catch (e) {
			
		}*/
		
	try{   
		   parent.document.getElementById("BLK_SPROL_INT__SPIN_RTCD").value = document.getElementById("BLK_RTFX_DET__RTFXD_CD").value;
		   parent.document.getElementById("BLK_SPROL_INT__SPIN_RT").value = document.getElementById("BLK_RTFX_DET__RTFXD_RT").value;
		   fireHTMLEvent(parent.document.getElementById("BLK_SPROL_INT__SPIN_RTCD"),"onpropertychange");
		   fireHTMLEvent(parent.document.getElementById("BLK_SPROL_INT__SPIN_RT"),"onpropertychange");
	      
		} catch (e) {}
		
		}
	
	

	return true;
}


//OBCL_27346184 ends

//RateSetting
function fnRtSet() {
	fnSubScreenMain('LBCSPROL', 'LBCSPROL', 'CVS_RATE_SETTING', false);
    return true;
}
function fnEnDisRateSet_RndUn(){
	var noRows = getTableObjForBlock("BLK_RTSET").tBodies[0].rows.length;
		for (var rowIndex = 0;rowIndex < noRows;rowIndex++) {
			if (getTableObjForBlock("BLK_RTSET").tBodies[0].rows[rowIndex].cells[0].getElementsByTagName("INPUT")[0].checked==true){
				if ((getElementsByOjName("RTST_RNDRL")[rowIndex].value != 'N')||(getElementsByOjName("RTST_RNDRL")[rowIndex].value != 'M')){
					fnEnableElement(getElementsByOjName("RTST_RNDUN")[rowIndex]);
				}
				else{
					fnDisableElement(getElementsByOjName("RTST_RNDUN")[rowIndex]);
				}
			}	
		}
	return true;
}
function fnPreLoad_CVS_RATE_SETTING_KERNEL(){
	// noRows = getTableObjForBlock("BLK_SPROL_INT").tBodies[0].rows.length;
		//for (var rowIndex = 0;rowIndex < noRows;rowIndex++) {
			//if (getTableObjForBlock("BLK_SPROL_INT").tBodies[0].rows[rowIndex].cells[0].getElementsByTagName("oj-input-text")[0].value==true){
				screenArgs["RTST_FCCREF"] = getElementsByOjName("SPIN_FCCREF").value;
				screenArgs["RTST_SPNO"] = getElementsByOjName("SPIN_SPNO").value;				
				screenArgs["RTST_COMP"] = getElementsByOjName("SPIN_COMP").value;
			//}	
		//}
	getElementsByOjName("SEL_RTST_SPNO")[0].value = screenArgs["RTST_SPNO"] ;  
	getElementsByOjName("SEL_RTST_COMP")[0].value = screenArgs["RTST_COMP"] ;  
	return true;
}
function fnPostLoad_CVS_RATE_SETTING_KERNEL(){
	if (gAction != ''){
		lAction = 'POPRTST';
		//fnClassDefault("BLK_SPROL_MAS");  //OBCL_14.4_SOFR_SPROL
		enableForm();
	}
	return true;
}
function  fnPreClassDefault_CVS_RATE_SETTING_KERNEL(){
	gAction = lAction;	
	gDispAlertOnSuccess = 'N';
	return true;
}
function  fnPostClassDefault_CVS_RATE_SETTING_KERNEL(){
	var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
	if (msgStatus != "FAILURE" ){
		enableForm();
		gDispAlertOnSuccess = 'Y';
		fnEnDisRateSet_RndUn();
	}
	return true;
}
//Adv

function fnPreLoad_CVS_ADV_KERNEL(){
	screenArgs["ADV_FCCREF"] = document.getElementById("BLK_SPROL__ROL_FCCREF").value;
	screenArgs["ADV_ESN"] = document.getElementById("BLK_SPROL__ROL_ESN").value;				
	return true;
}
function fnPostLoad_CVS_ADV_KERNEL(){
	if (gAction != ''){
		lAction = 'POPADV';
		fnClassDefault("BLK_SPROL_MAS");
		//enableForm(); //Bug#37226600 commented code as already call for enabling form is there in fnclassdefault
		
	}
	return true;
}
function  fnPreClassDefault_CVS_ADV_KERNEL(){
	gAction = lAction;	
	gDispAlertOnSuccess = 'N';
	return true;
}
function  fnPostClassDefault_CVS_ADV_KERNEL(){
	var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
	if (msgStatus != "FAILURE" ){
		enableForm();
		gDispAlertOnSuccess = 'N';
		getElementsByOjName("cmdAddRow_BLK_ADV")[0].style.visibility = "hidden"; 
		getElementsByOjName("cmdDelRow_BLK_ADV")[0].style.visibility = "hidden"; 	
	}
	return true;
}
//PIS
function fnPreLoad_CVS_PART_INT_SHARE_KERNEL(){
	screenArgs["PIS_FCCREF"] = document.getElementById("BLK_SPROL__ROL_FCCREF").value;
	screenArgs["PIS_ESN"] = document.getElementById("BLK_SPROL__ROL_ESN").value;		
	gRollIntStat = 	document.getElementById("BLK_SPROL__ROL_INST_STATA").value;	
	return true;
}
function fnPostLoad_CVS_PART_INT_SHARE_KERNEL(){
	if (gAction != ''){
		lAction = 'POPPIS';
		fnClassDefault("BLK_SPROL_MAS");
		enableForm();
	}
	return true;
}
function  fnPreClassDefault_CVS_PART_INT_SHARE_KERNEL(){
	gAction = lAction;	
    gDispAlertOnSuccess = 'N';
	return true;
}
/*Starts OBCL_14.3_BASE_BUG#30597643*/
function fnEnDis_Recompute()
{
		//	if (document.getElementById("BLK_SPROL__ROL_AMT_TYPE2").checked==true)
		//	{
			//	fnEnableElement(document.getElementById("BLK_SPROL__BTN_RECOMPUTE"));
			fnDisableElement(document.getElementById("BLK_SPROL__BTN_RECOMPUTE"));
		//	}
		//	else
		//	{
		//		fnDisableElement(document.getElementById("BLK_SPROL__BTN_RECOMPUTE"));
		//	}
							
			
return true;	
}
/*ends OBCL_14.3_BASE_BUG#30597643*/
function  fnPostClassDefault_CVS_PART_INT_SHARE_KERNEL(){
	var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
	if (msgStatus != "FAILURE" ){
		gDispAlertOnSuccess = 'N';
		var noRows = getTableObjForBlock("BLK_PART_SHR_DET").tBodies[0].rows.length;
		for (var rowIndex = 0;rowIndex < noRows;rowIndex++) {
			if ((getElementsByOjName("PRS_PARTREF")[rowIndex].value !='') && (gRollIntStat != 'I')){
				fnEnableElement(getElementsByOjName("PRS_AMT_PAID")[rowIndex]); 
			}	
			else{
				fnDisableElement(getElementsByOjName("PRS_AMT_PAID")[rowIndex]); 
			}
		}	
	}	
	return true;
}

//OBCL_14.4_SOFR_SPROL start
function fnPostLoad_CVS_INT_DTLS_KERNEL(){	
    //Bug#34823764 Changes Start
	getElementsByOjName('BTN_ADD_BLK_SPROL_INT')[0].style.visibility = 'hidden';
	getElementsByOjName('BTN_REMOVE_BLK_SPROL_INT')[0].style.visibility = 'hidden';
	//Bug#34823764 Changes End
	fnDisableElement(document.getElementById("cmdAddRow_BLK_SPROL_MARGIN"));
	fnDisableElement(document.getElementById("cmdDelRow_BLK_SPROL_MARGIN"));
    if (gAction == 'NEW' || gAction == 'SUBSYSPKP_NEW' || gAction == 'MODIFY' || gAction == 'SUBSYSPKP_MODIFY' ){
      enableForm();
	   fn_Chg_Mar(); //Bug#33333055
    }
    return true;
}

function fnEnableIntDetBtn(){
	var noRows = getTableObjForBlock("BLK_SPROL_DET").tBodies[0].rows.length;
	for (var rowIndex = 0;rowIndex < noRows;rowIndex++) {
		fnEnableElement(getElementsByOjName("BTN_INTDETLS")[rowIndex]);					
    }
}
//OBCL_14.4_SOFR_SPROL end
