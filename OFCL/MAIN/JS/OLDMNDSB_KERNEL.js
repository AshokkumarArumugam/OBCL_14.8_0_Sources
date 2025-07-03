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
**  File Name          : OLDMNDSB_KERNEL.js
**  Purpose            : 
**  Called From        : 

  **Changed By         : Mohan Pal
   **DATE               : 04-Jun-2020
   **Change Description : Added version number in the screen. 
   **Search String      : OBCL_14.4_support_Bug#31408484 

**  Last Modified By   :Rashmi B V 
**  Last modified on   :17-02-23 
**	Description        :Changes W.R.T REDWOOD ADOPTION
**	Search String      :Bug#34958820_REDWOOD_ADOPTION 
****************************************************************************************************************************/

function fnPreAuthorize_KERNEL(){
    authFunction = 'OLDMDAUT';
    authUixml = 'OLDMDAUT';
    authScreenName = 'CVS_AUTH';
    gAction = 'EXECUTEQUERY';
    ArrFuncOrigin['OLDMDAUT'] = "KERNEL";
    ArrPrntFunc['OLDMDAUT'] = "";
    ArrPrntOrigin['OLDMDAUT'] = "";
    return true;
}
function fnPostAuthorize_KERNEL(){
	debugs("In fnPostAuthorize", "A");
	DisableToolbar_buttons("Authorize");
    gAction = "EXECUTEQUERY";
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
    fnSetExitButton(false);
    debugs("In fnPostAuthorize ", "A");
	return true;
}
function fnPostProductPickup_KERNEL() {
	if (!(document.getElementById("BLK_MDSB_MAS__TYPE").value == 'M')) {
		fnDisableElement(document.getElementById("BLK_MDSB_MAS__DSBRDT"));
		fnDisableElement(document.getElementById("BLK_MDSB_MAS__AMT"));
		
	} 
	return true; 	
}
/* OBCL_14.4_Changes :: Starts */
function fnPostFocus_KERNEL() {
    var obj = document.getElementById("BLK_MDSB_MAS__CONTREF");
    if ((gAction == 'ENTERQUERY') || (gAction == 'EXECUTEQUERY') || (gAction == 'NEW') || (gAction == 'MODIFY')) {
        if ((gAction == 'ENTERQUERY') || (gAction == 'EXECUTEQUERY')) {
            obj.removeAttribute("pickup_product");
            obj.removeAttribute("onchange");
            obj.setAttribute("onchange", "disp_auto_lov('OLDMNDSB','BLK_MDSB_MAS','CONTREF','"+ obj.getAttribute("label_value") +"','LOV_CONTREF','','','','', this, event);");
            appendData();
        }
        else {
            obj.removeAttribute("onchange");
            obj.setAttribute("pickup_product", "");
            obj.setAttribute("onchange", "fnToUppercase(this, event);disp_auto_lov('OLDMNDSB','BLK_MDSB_MAS','CONTREF','"+ obj.getAttribute("label_value") +"','LOV_CONTREF','','','','', this, event);");
            appendData();
        }
    }
    return true;
}
/* OBCL_14.4_Changes :: Ends */



function fnPostExecuteQuery_KERNEL() {
	debugs("In fnPostExecuteQuery", "A");
	//disableForm();
	//fnEnableElement(document.getElementsByName("FCCREF")[0]);
    fnEnableElement(getElementsByOjName("FCCREF")[0]); //Bug#34958820_REDWOOD_ADOPTION
	//fnDisableTBar();
	//fnEnableElement(document.getElementsByName("BTN_PREV")[0]);//OBCL_14.4_support_Bug#31408484 
	//fnEnableElement(document.getElementsByName("BTN_NEXT")[0]);//OBCL_14.4_support_Bug#31408484 
	fnEnableElement(getElementsByOjName("BTN_PREV")[0]);//OBCL_14.4_support_Bug#31408484 //Bug#34958820_REDWOOD_ADOPTION
	fnEnableElement(getElementsByOjName("BTN_NEXT")[0]);//OBCL_14.4_support_Bug#31408484 //Bug#34958820_REDWOOD_ADOPTION
	
	
	return true; 
}


function  fnOnClick_BTN_NEXT_VER(){//OBCL_14.4_support_Bug#31408484 

	
	var verNo=Number(document.getElementById("BLK_MDSB_MAS__CURRVERUI").value); //BLK_MDSB_MAS__CURRVERUI
	var VERNOCount=Number(document.getElementById("BLK_MDSB_MAS__TOTVERNOUI").value); //BLK_MDSB_MAS__TOTVERNOUI
	
	if(verNo == VERNOCount){
		showAlerts(fnBuildAlertXML("IN-PR0011","E"),"E"); //Already in the last record
	}

	if(VERNOCount>verNo)
	{
		verNo++;
		document.getElementById("BLK_MDSB_MAS__CURRVERUI").value=verNo; //Bug#17414862 change from BLK_PYMNT_SUMM__VERNO to BLK_PYMNT_SUMM__CURRPMNT
		document.getElementById("BLK_MDSB_MAS__CURRVERUI").value=verNo;  //OFCL_12.3.0.0.0_24936916
		//appendData(document.getElementById("TBLPageTAB_MAIN"));
		g_prev_gAction=gAction;
		gAction='EXECUTEQUERY';
              //appendData(document.getElementById("TBLPageTAB_MAIN"));		
		fnExecuteQuery();
		//EnableDisableAuthBtn(); //OFCL_12.3.0.0.0_25026150 //BUG#27190209_Commented
		gAction=g_prev_gAction;
	}
	return true;
}



function  fnOnClick_BTN_PREV_VER(){//OBCL_14.4_support_Bug#31408484 


	var verNo=Number(document.getElementById("BLK_MDSB_MAS__CURRVERUI").value);  
	var VERNOCount=Number(document.getElementById("BLK_MDSB_MAS__TOTVERNOUI").value);  
	if(verNo == 1){
		showAlerts(fnBuildAlertXML("IN-PR0012","E"),"E"); //Already in the first record
	}
	//verNo--;//Ashok commented
	//if(verNo>0)
       if(verNo>1)
	{	
		verNo--; //Ashok added	
		document.getElementById("BLK_MDSB_MAS__CURRVERUI").value=verNo; //Bug#17414862 change from BLK_PYMNT_SUMM__VERNO to BLK_PYMNT_SUMM__CURRPMNT
		document.getElementById("BLK_MDSB_MAS__CURRVERUI").value=verNo; //OFCL_12.3.0.0.0_24936916
		//appendData(document.getElementById("TBLPageTAB_MAIN"));
		g_prev_gAction=gAction;
		gAction='EXECUTEQUERY';		
		//appendData(document.getElementById("TBLPageTAB_MAIN"));
		fnExecuteQuery();
		//EnableDisableAuthBtn(); //OFCL_12.3.0.0.0_25026150 //BUG#27190209_Commented
		gAction=g_prev_gAction;
	}
	return true;
}

function fnPostSave_KERNEL() {//OBCL_14.4_support_Bug#31408484 
  fnEnableElement(document.getElementById("BLK_MDSB_MAS__BTN_PREV"));
  fnEnableElement(document.getElementById("BLK_MDSB_MAS__BTN_NEXT"));
 
  return true;
}