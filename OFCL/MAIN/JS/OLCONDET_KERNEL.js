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
**  File Name          : OLCONDET_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : Ashokkumar Arumugam
**  Last modified on   : 28-SEP-2018
**  Search String      : OBCL_14.2_28532051_Changes
**  Change Description : Added code to restrict the multiple split settlement amendment for OLDVAMND and OLDPMNT
**
**  CHANGE LOG
**  Last Modified By   : Aruna Devi Rajendran
**  Last modified on   : 11-FEB-2019
**  Search String      : OBCL_14.3_RolloverSettlement
**  Change Description : Commented the disable form for rollover action
**
**Changed By         : Pallavi R
**Changed On         : 19-Apr-2019
**Change Description : Dsbr Changes
**Search String      : OBCL_14.3_#29632685 Changes

 Last Modified By      : ANUSHA K
**  Last modified on   : 28-SEP-2018
**  Search String      : OBCL_14.3_SUPP_#29588545_Changes
**  Change Description : Added code to restrict the multiple split settlement amendment for OLDVAMND and OLDPMNT(fwd PORT FROM 14.2 BUG NO : 28532051 )

 Last Modified By      : ANUSHA K
**  Last modified on   : 20-NOV-2018
**  Search String      : OBCL_14.3_SUPP_#29959798 _Changes
**  Change Description : changes done to enable rate code field in settlements callform

 Last Modified By      : Reghuraj
**  Last modified on   : 03-JAN-2020
**  Search String      : OBCL_14.3.0.0#30660363 _Changes
**  Change Description : changes done to save spread values  field in settlements callform

 Last Modified By      : Revathi A
**  Last modified on   : 09-JAN-2019
**  Search String      : OBCL_14.4_LS_SPLIT_SETTL_CHANGES
**  Change Description : changes done for Split Settlements Issues for LS in settlements callform


** 	Changed On   		: 14-May-2020
** 	Changed By         	: Manivel Ganesan
** 	Change Description 	: Added a code for Component field population in header section respectively for each row click on Settlement Details multigird
** 	Search String      	: OBCL_14.3_SUPPORT_Bug#31301751 

** 	Changed On   		: 27-Jun-2020
** 	Changed By         	: ArunaDevi Rajendran
** 	Change Description 	: Enabled settlement for OLDMNDSB and OLDVAMND
** 	Search String      	: OBCL_14.4_DSBR_SplitSettlementAmount

** 	Changed On   		: 09-Aug-2021
** 	Changed By         	: Reghuraj
** 	Change Description 	: Disabled settlement for OLDMNDSB.
** 	Search String      	: BUG#33168498

** 	Changed On   		: 17-Dec-2021
** 	Changed By         	: Divya J
** 	Change Description 	: Enabled Split settlement for OLDTROIC and OLDTROSI
** 	Search String      	: OBCL_14.5_Bug#33679062 

** 	Changed On   		: 28-Dec-2021
** 	Changed By         	: Divya J
** 	Change Description 	: Enabled Split settlement for OLDPMNT
** 	Search String      	: OBCL_14.5_Bug#33677962
**
**	Changed By         : Pallavi R
**	Changed On         : 06-Jun-2022
**	Change Description : Fields are editable on Query action
**	Search String      : OBCL_RABO_14.5_#34240625 Changes
**
**	Changed By         : Arunprasath
**	Changed On         : 12-Jul-2022
**	Change Description : Syntax error corrected
**	Search String      : Bug#34240625

**	Changed By         : Abhinav Bhasker
**	Changed On         : 27-Sep-2022
**	Change Description : Enabled Multi Settlement +/- for LBDPYMNT
**	Search String      : Bug#34635926

**  Changed By         : Balaji Gopal
**  Changed On         : 18-Nov-2022
**  Search String      : Bug#34688266    
**  Change Reason      : For the existing settlement entries,Pay Parties and others tab values are retained after clicked the Plus Symbol in the split settlement details

**  Changed By         : Rashmi B V
**  Changed On         : 21-Nov-2022
**  Search String      : Bug#34808565    
**  Change Reason      : Enabled Multi Settlement +/- for LBDVAMND

**  Changed By         : Sowmya Bitra
**  Changed On         : 22-Nov-2022
**  Search String      : Bug#34808624   
**  Change Reason      : Enabled Multi Settlement +/- for LBDFEELQ

**  Changed By         : Balaji Gopal
**  Changed On         : 22-May-2024
**  Search String      : Bug#36619242   
**  Change Reason      : Enabled Multi Settlement +/- for OLDUDEVT
****************************************************************************************************************************/
var lAction;
var parentFunctionId; /* OBCL_14.2_28532051_Changes */
function fnPostLoad_CVS_SETTLEMENTS_KERNEL(screenArgs){
	/* OBCL_14.2_28532051_Changes :: Starts */
	try{   
		parentFunctionId = parent.functionId;
	}catch(e){}
	fnScreenEnableDisable();
	var NavArr = document.getElementById("paging_BLK_STL_SPLIT_MASTER").getElementsByTagName('A');
	for (i=0; i<NavArr.length; i++)
	{
		var title = NavArr[i].title;
		switch (title.toUpperCase()){
			case "FIRST": 
			addEvent(NavArr[i], "onclick", "Navigate(N_FIRST,'BLK_STL_SPLIT_MASTER');fnPostMovePrevNextFirstLast()");
			break;
			case "PREVIOUS":
			addEvent(NavArr[i], "onclick",	"Navigate(N_PREVIOUS,'BLK_STL_SPLIT_MASTER');fnPostMovePrevNextFirstLast()");
			break;
			case "NEXT":
			addEvent(NavArr[i], "onclick", "Navigate(N_NEXT,'BLK_STL_SPLIT_MASTER');fnPostMovePrevNextFirstLast()");
			break;
			case "LAST":
			addEvent(NavArr[i], "onclick", "Navigate(N_LAST,'BLK_STL_SPLIT_MASTER');fnPostMovePrevNextFirstLast()");
			break;
		}
			
		
	 //addEvent(document.getElementById("nFirst__BLK_STL_SPLIT_MASTER"), "onclick", "Navigate(N_FIRST,'BLK_STL_SPLIT_MASTER');fnPostMovePrevNextFirstLast()");
	 //addEvent(document.getElementById("nPrev__BLK_STL_SPLIT_MASTER"), "onclick",	"Navigate(N_PREVIOUS,'BLK_STL_SPLIT_MASTER');fnPostMovePrevNextFirstLast()");
	// addEvent(document.getElementById("nNext__BLK_STL_SPLIT_MASTER"), "onclick", "Navigate(N_NEXT,'BLK_STL_SPLIT_MASTER');fnPostMovePrevNextFirstLast()");
	// addEvent(document.getElementById("nLast__BLK_STL_SPLIT_MASTER"), "onclick", "Navigate(N_LAST,'BLK_STL_SPLIT_MASTER');fnPostMovePrevNextFirstLast()");
	}
	
	/* OBCL_14.2_28532051_Changes :: Ends */
	fnDisableElement(getElementsByOjName("BTN_GI")[0]);
	document.getElementById('cmdAddRow_BLK_STL_SPLIT_MASTER').style.visibility='hidden';
	document.getElementById('cmdDelRow_BLK_STL_SPLIT_MASTER').style.visibility='hidden';
	document.getElementById('BLK_SETTLEMENTS__COMPNT').value=getTableObjForBlock("BLK_STL_SPLIT_MASTER").tBodies[0].rows[0].cells[4].getElementsByTagName("oj-input-text")[0].value;  //OBCL_14.3_SUPPORT_Bug#31301751
	setTimeout( function(){ //REDWOOD_CHANGES
	var rowLength=getTableObjForBlock("BLK_STL_SPLIT_MASTER").tBodies[0].rows.length;
	for(var i=0;i<rowLength;i++){			
		addEvent(document.getElementById("BLK_STL_SPLIT_MASTER"), "onclick", "fnOn_StlMas(event)");
	}
	},400);
	/*if (gAction == 'ROLLOVER'){
		disableForm();
	}*///OBCL_14.3_RolloverSettlement
	expandcontent('TAB_MSGDET');
    expandcontent('TAB_MSGDET1');
    expandcontent('TAB_PAYPART');
    expandcontent('TAB_PAYPART1');
    expandcontent('TAB_RECEVNOT');
    expandcontent('TAB_DDPARTIES');
    expandcontent('TAB_DDPARTIES');
    expandcontent('TAB_MAIN');
	return true;
}
function fnOn_StlMas(event){
	
	//OBCL_14.3_SUPPORT_Bug#31301751 Start
	acctTableRowTracker=getRowIndex(event)-1;
    document.getElementById('BLK_SETTLEMENTS__COMPNT').value=getTableObjForBlock("BLK_STL_SPLIT_MASTER").tBodies[0].rows[acctTableRowTracker].cells[4].getElementsByTagName("oj-input-text")[0].value;       
	var blkSettlementRowCnt=getTableObjForBlock("BLK_STL_SPLIT_MASTER").tBodies[0].rows.length;
	var l_component_name = getTableObjForBlock("BLK_STL_SPLIT_MASTER").tBodies[0].rows[acctTableRowTracker].cells[4].getElementsByTagName("oj-input-text")[0].value;
	for(var i=0;i<blkSettlementRowCnt;i++)
		{
			if((getTableObjForBlock("BLK_STL_SPLIT_MASTER").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked==true)
				&&((getTableObjForBlock("BLK_STL_SPLIT_MASTER").tBodies[0].rows[i].cells[4].getElementsByTagName("oj-input-text")[0].value) != l_component_name))
			{
				getTableObjForBlock("BLK_STL_SPLIT_MASTER").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked = false;
			}
		}	
	//OBCL_14.3_SUPPORT_Bug#31301751 End
    var rowLength=getTableObjForBlock("BLK_OLTBS_SETTLEMENTS_CONIS").tBodies[0].rows.length;
	for(var i=0;i<rowLength;i++){			
		addEvent(document.getElementById("BLK_OLTBS_SETTLEMENTS_CONIS"), "onclick", "fnOn_SplitStl(event)");
	}	
	/*if (gAction == 'ROLLOVER'){
		disableForm();
	}*///OBCL_14.3_RolloverSettlement
	fnScreenEnableDisable(); /* OBCL_14.2_28532051_Changes */

    // Below functions are added as part of the Bug#34688266 Starts Here
    fnMulipleEntryRow_onClick(event);
    expandcontent('TAB_MSGDET');
    expandcontent('TAB_MSGDET1'); 
    expandcontent('TAB_PAYPART');
    expandcontent('TAB_PAYPART1');
    expandcontent('TAB_RECEVNOT');
    expandcontent('TAB_DDPARTIES');
    expandcontent('TAB_DDPARTIES');
    expandcontent('TAB_MAIN');
    //  Below functions are added as part of the Bug#34688266 Ends Here
}

	//OBCL_14.3_SUPPORT_Bug#31301751 Start
function fnPostNavigate_BLK_STL_SPLIT_MASTER_KERNEL(){
	document.getElementById('BLK_SETTLEMENTS__COMPNT').value=getTableObjForBlock("BLK_STL_SPLIT_MASTER").tBodies[0].rows[0].cells[4].getElementsByTagName("oj-input-text")[0].value;
	return true;
}	
	//OBCL_14.3_SUPPORT_Bug#31301751 End
	
function fnOn_SplitStl(event){
	acctTableRowTracker=getRowIndex(event)-1;
    document.getElementById('BLK_SETTLEMENTS__COMPNT').value=getTableObjForBlock("BLK_OLTBS_SETTLEMENTS_CONIS").tBodies[0].rows[acctTableRowTracker].cells[2].getElementsByTagName("oj-input-text")[0].value;       
	var blkSettlementRowCnt=getTableObjForBlock("BLK_OLTBS_SETTLEMENTS_CONIS").tBodies[0].rows.length;
	var l_component_name = getTableObjForBlock("BLK_OLTBS_SETTLEMENTS_CONIS").tBodies[0].rows[acctTableRowTracker].cells[2].getElementsByTagName("oj-input-text")[0].value;
	for(var i=0;i<blkSettlementRowCnt;i++)
		{
			if((getTableObjForBlock("BLK_OLTBS_SETTLEMENTS_CONIS").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked==true)&&((getTableObjForBlock("BLK_OLTBS_SETTLEMENTS_CONIS").tBodies[0].rows[i].cells[2].getElementsByTagName("INPUT")[0].checked) != l_component_name)){
				getTableObjForBlock("BLK_OLTBS_SETTLEMENTS_CONIS").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked = false;
			}
		}	
	/*if (gAction == 'ROLLOVER'){
		disableForm();
	}*///OBCL_14.3_RolloverSettlement	
	fnScreenEnableDisable(); /* OBCL_14.2_28532051_Changes */	 
}
function fnPostAddRow_BLK_OLTBS_SETTLEMENTS_CONIS_KERNEL() {
	setTimeout( function(){ //REDWOOD_CHANGES
	rowIndex = dbIndexArray["BLK_OLTBS_SETTLEMENTS_CONIS"];
	
	for(var i=0;i<rowIndex;i++){
		var l_order = getElementsByOjName("SPL_ORDER")[i].value ;
		 if (l_order == '' || l_order == null){ //REDWOOD_CHANGES
			 l_order = i+1;
			 getElementsByOjName("SPL_ORDER")[i].value = l_order;			
		 }
		l_tag = getElementsByOjName("DET_BASIS_AMT_TAG")[0].value+l_order;			 
		getElementsByOjName("AMTTAG")[i].value = l_tag;	
		getElementsByOjName("PAYRECEIVE")[i].value = getElementsByOjName("PAYRECEIVE")[0].value;
	}
	},400); //REDWOOD_CHANGES
	fnOn_StlMas(event);
    return true;
}
function fnPostDeleteRow_BLK_OLTBS_SETTLEMENTS_CONIS_KERNEL() {
    return true;
}
function fnDfltStl(){
	lAction = 'DFLT_STL';
	fnClassDefault("BLK_SETTLEMENTS");
	return true;
}
function  fnPreClassDefault_CVS_SETTLEMENTS_KERNEL(){
	if (lAction == 'DFLT_STL'){
		gAction = 'PRDDFLT';
	}	
	gDispAlertOnSuccess = 'N';
	return true;
}
function  fnPostClassDefault_CVS_SETTLEMENTS_KERNEL(){
	var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
	if (msgStatus != "FAILURE" ){
		gDispAlertOnSuccess = 'Y';
		enableForm();
	}
	fnScreenEnableDisable(); /* OBCL_14.2_28532051_Changes */
	return true;
}
/* OBCL_14.2_28532051_Changes :: Starts */
function fnScreenEnableDisable(){
	if (gAction == 'NEW' || gAction == 'MODIFY' || gAction =='ROLLOVER'){//Bug#34240625
		/*if ((parentFunctionId == 'OLDVAMND') || (parentFunctionId == 'OLDPMNT')|| (parentFunctionId == 'OLDMNDSB')||(parentFunctionId == 'LBDVAMND') || (parentFunctionId == 'LBDPYMNT')){//Added condition for OBCL_14.3_#29632685 Changes       OBCL_14.4_LS_SPLIT_SETTL_CHANGES */
		/*if ((parentFunctionId != 'OLDTRONL') || (parentFunctionId != 'FCDTRONL')|| (parentFunctionId != 'LBDTRONL')||(parentFunctionId != 'LBDDDONL')||(parentFunctionId != 'OLDMNDSB')||(parentFunctionId != 'OLDVAMND')) { // Added Condition for OBCL_14.4_LS_SPLIT_SETTL_CHANGES//OBCL_14.4_DSBR_SplitSettlementAmount added OLDMNDSB and OLDVAMND to enable settlement amendment*/
		//OBCL_14.5_Bug#33679062 added OLDTROIC and OLDTROSI to enable settlement amendment
		//OBCL_14.5_Bug#33677962 added OLDPMNT to enable settlement amendment
		//Bug#34808565  Enable +/- for LBDVAMND
		if ((parentFunctionId != 'OLDTRONL') || (parentFunctionId != 'FCDTRONL')|| (parentFunctionId != 'LBDTRONL')||(parentFunctionId != 'LBDDDONL')||(parentFunctionId != 'OLDMNDSB')||(parentFunctionId != 'OLDVAMND')||(parentFunctionId != 'OLDTROIC')||(parentFunctionId != 'OLDTROSI')||(parentFunctionId != 'OLDPMNT')||(parentFunctionId != 'LBDPYMNT')||(parentFunctionId != 'LBDVAMND')
		||(parentFunctionId != 'LBDFEELQ')	//Bug#34808624
        ||(parentFunctionId != 'OLDUDEVT')  //Bug#36619242
		) { // Added Condition for OBCL_14.4_LS_SPLIT_SETTL_CHANGES//OBCL_14.4_DSBR_SplitSettlementAmount added OLDMNDSB and OLDVAMND to enable settlement amendment// Bug#34635926  
			fnDisableScreenElement("TAB_MAIN__SEC_BODY__BODY__FST_ACCT_DET");
		  
			var rowLength = getTableObjForBlock("BLK_OLTBS_SETTLEMENTS_CONIS").tBodies[0].rows.length;
			for (var i = 0;i < rowLength;i++) {
				if (rowLength > 1) {
					fnEnableElement(getTableObjForBlock("BLK_OLTBS_SETTLEMENTS_CONIS").tBodies[0].rows[i].cells[10].getElementsByTagName("oj-input-text")[0]); //SPLIT_RATIO
					fnEnableElement(getTableObjForBlock("BLK_OLTBS_SETTLEMENTS_CONIS").tBodies[0].rows[i].cells[9].getElementsByTagName("oj-input-text")[0]);
					//SPLIT_AMOUNT//OBCL_14.4_DSBR_SplitSettlementAmount
				}
		/*OBCL_14.3_SUPP_#29588545_Changes STARTS */
				fnEnableElement(getTableObjForBlock("BLK_OLTBS_SETTLEMENTS_CONIS").tBodies[0].rows[i].cells[8].getElementsByTagName("oj-input-text")[0]); //account
				fnEnableElement(getTableObjForBlock("BLK_OLTBS_SETTLEMENTS_CONIS").tBodies[0].rows[i].cells[7].getElementsByTagName("oj-input-text")[0]); //account ccy
				//fnEnableElement(getTableObjForBlock("BLK_OLTBS_SETTLEMENTS_CONIS").tBodies[0].rows[i].cells[11].getElementsByTagName("oj-input-text")[0]); //rate code OBCL_14.3_SUPP_#29959798 _Changes
				fnEnableElement(getTableObjForBlock("BLK_OLTBS_SETTLEMENTS_CONIS").tBodies[0].rows[i].cells[11].getElementsByTagName("oj-select-single")[0]);//ratecode OBCL_14.3_SUPP_#29959798 _Changes
				fnEnableElement(getTableObjForBlock("BLK_OLTBS_SETTLEMENTS_CONIS").tBodies[0].rows[i].cells[12].getElementsByTagName("oj-input-text")[0]); //exchange rate
				fnEnableElement(getTableObjForBlock("BLK_OLTBS_SETTLEMENTS_CONIS").tBodies[0].rows[i].cells[13].getElementsByTagName("oj-input-text")[0]); //ERICCY
				fnEnableElement(getTableObjForBlock("BLK_OLTBS_SETTLEMENTS_CONIS").tBodies[0].rows[i].cells[14].getElementsByTagName("oj-input-text")[0]); //ERIAMT
				fnEnableElement(getTableObjForBlock("BLK_OLTBS_SETTLEMENTS_CONIS").tBodies[0].rows[i].cells[22].getElementsByTagName("oj-input-text")[0]); //TAG CCY
					   /* OBCL_14.3.0.0#30660363 _Changes start*/
				fnEnableElement(getTableObjForBlock("BLK_OLTBS_SETTLEMENTS_CONIS").tBodies[0].rows[i].cells[23].getElementsByTagName("oj-input-text")[0]); //SPRED
				/*OBCL_14.3.0.0#30660363 _Changes end*/
				/*OBCL_14.3_SUPP_#29588545_Changes ENDS */

				
			}
		}
		 if ((gAction != "") && gAction!=undefined ){
			  console.log('IN loop..');
		 // OBCL_14.4_LS_SPLIT_SETTL_CHANGES Starts		
		 //OBCL_14.4_DSBR_SplitSettlementAmount added OLDMNDSB AND OLDVAMND to enable settlement amendment
		//BUG#33168498 removed (parentFunctionId == 'OLDMNDSB')||	
		//OBCL_14.5_Bug#33679062 added OLDTROIC and OLDTROSI to enable settlement amendment
		 //OBCL_14.5_Bug#33677962 added OLDPMNT to enable settlement amendment
		 //Enable +/- for LBDPYMNT as part of Bug#34635926
		 //Bug#34808565 Enable +/- for LBDVAMND
			if((parentFunctionId == 'OLDTRONL')||(parentFunctionId == 'FCDTRONL')||(parentFunctionId == 'LBDTRONL')||(parentFunctionId == 'LBDDDONL')||(parentFunctionId == 'OLDMNDSB')||(parentFunctionId == 'OLDVAMND')||(parentFunctionId == 'OLDTROIC')||(parentFunctionId == 'OLDTROSI')||(parentFunctionId == 'OLDPMNT')||(parentFunctionId == 'LBDPYMNT')||(parentFunctionId == 'LBDVAMND')
				||(parentFunctionId == 'LBDFEELQ') 	//Bug#34808624	
                ||(parentFunctionId == 'OLDUDEVT')  //Bug#36619242
			){
				fnEnableScreenElement("TAB_MAIN__SEC_BODY__BODY__FST_ACCT_DET");
			}
			//OBCL_14.4_LS_SPLIT_SETTL_CHANGES Ends
		 }	
	}//OBCL_RABO_14.5_#34240625 Changes 
	return true;
}
function fnPostMovePrevNextFirstLast()
{	
	fnScreenEnableDisable();	
	return true;
}
function fnInTab_TAB_MAIN_KERNEL() 
{	
	fnScreenEnableDisable();
	return true;
}
function fnInTab_TAB_MSGDET_KERNEL() 
{	
	fnScreenEnableDisable();
	return true;
}
function fnInTab_TAB_MSGDET1_KERNEL() 
{	
	fnScreenEnableDisable();
	return true;
}
function fnInTab_TAB_PAYPART_KERNEL() 
{	
	fnScreenEnableDisable();
	return true;
}
function fnInTab_TAB_PAYPART1_KERNEL() 
{	
	fnScreenEnableDisable();
	return true;
}
function fnInTab_TAB_RECEVNOT_KERNEL() 
{	
	fnScreenEnableDisable();
	return true;
}
function fnInTab_TAB_DDPARTIES_KERNEL() 
{	
	fnScreenEnableDisable();
	return true;
}
/* OBCL_14.2_28532051_Changes :: Ends */