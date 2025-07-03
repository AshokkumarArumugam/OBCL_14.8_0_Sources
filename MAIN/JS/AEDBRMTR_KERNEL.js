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
**  File Name          : AEDBRMTR_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 
** Changed By          : Vinodkumar Subramaniam
** Changed On          : 03-Aug-2011
** Change Desc         : --9NT1466 IUT SFR#643 VINOD Changes
** Search Tag         :  --9NT1466 IUT SFR#643 VINOD 

** Changed By          : Arumugam S
** Changed On          : 08-Dec-2011
** Change Desc         : 9NT1462 -ITR2 -BUG 13463684 To Enable rerun Batch
** Search Tag         :  9NT1462 -ITR2 -BUG 13463684

**  Modified By           : Saurabh
**  Modified On           : 27-Mar-2012
**  Modified Reason       : 9NT1501 :: FC UBS 12.0.0 : Copyright clause updation of source units

   Changed By         : Anoop R
   Change Description : Exception Handing is done.
   Change Date        : 11-Nov-2013 
   Search String      : 1202_17774863
  0Date                 : 25/09/2014
  Updated By           : Anmol
  Bug Number           : 19686385 
  Change Description   : LOGGEDDuring EOD if any batch fails, then in AEDBRMTR screen on selecting that batch and
                         clicking re run, system throws and error
                         system was not updating the session id and serial number.code changes done to handle the same
  Search Tag           : 1202_17774863
  
  **Modified By          : Vanitha P
  **Modified On          : 2-Feb-2022
  **Modified reason      : Redwood changes
  **Search string        : Redwood
  
  **Modified By          : Selvam Manickam
  **Modified On          : 17-May-2023
  **Modified reason      : For Multi Entry have editable fields when post execute query
  **Search string        : Redwood_35399055  
****************************************************************************************************************************/
var fcjRequestDOM;
var fcjResponseDOM;
var QMode = "N";
var gErrCodes = "";
var completed ='f3ffe8';
var aborted ='#ffefdd';
var yet_to_run ='EEEEEE';
var running ='#e9f3ff';
var rerun='#ddd3dd';
var deleteindex=0;
var tempvar;
var l_tempIndex;
var batchIndex;
var runchartIndex;

function fnPostLoad_KERNEL() {
	//getElementsByOjName("BTN_RERUN_STAGE")[0].style.visibility = "hidden";  //9NT1462 -ITR2 -BUG 13463684//Redwood
        getElementsByOjName("BTN_RERUN_STAGE")[0].style.display="none"  //Redwood
        document.getElementById('TAB_MAIN__SEC_3__PART1').style.display="none";
	return true;
}


function fnPostEnterQuery_KERNEL()
{
	//getElementsByOjName('BLK_EOC_MONITOR__BRNCD')[0].value="";//Redwood
        getElementsByOjName('BRNCD')[0].value="";//Redwood
	return true;
}

function fnPostExecuteQuery_KERNEL()
{
	setTimeout(function() {//Redwood_35399055
	disableForm();	//Redwood_35399055
	fnEnableElement(getElementsByOjName('BTN_REFRESH')[0]);//9NT1466 IUT SFR#643 VINOD added
    fnEnableElement(getElementsByOjName('BTN_RERUN_BATCH')[0]);  //9NT1462 -ITR2 -BUG 13463684
	fnStatusColorChange();
       //fnEnableElement(getElementsByOjName('BTN_REFRESH')[0]);//9NT1466 IUT SFR#643 VINOD commented
	fnPostShowDescendants_BLK_EOC_RUNCHART_KERNEL();
	return true;
	},0);//Redwood_35399055
}


function fnRefresh() {
	gAction='EXECUTEQUERY';
       fnExecuteQuery();
       gAction='';
}

function fnPostShowDescendants_BLK_EOC_RUNCHART_KERNEL(){
	fnStatusColorChangeBlkPrograms();
	return true;
}

//changing the color of the prorams mutiple entry blkbased on the stage  status
function fnStatusColorChange()
{
var colorIndex;

var selindex;
var drpLstobj;
var tabObj;
var color;
if (document.getElementById("BLK_EOC_RUNCHART"))
      {
	   //tabObj= document.getElementById("BLK_EOC_RUNCHART").tBodies[0];//Redwood
	   tabObj= getTableObjForBlock("BLK_EOC_RUNCHART").tBodies[0];//Redwood
       len = tabObj.rows.length;
	   //setTimeout( function(){ //Redwood
       for(colorIndex = 0;colorIndex < len; colorIndex++)
            {
	     //drpLstobj=tabObj.rows[colorIndex].cells(5).getElementsByTagName('SELECT')[0];//Redwood  
		//drpLstobj=tabObj.rows[colorIndex].cells(5).getElementsByTagName('oj-select-single')[0];//Redwood
              drpLstobj=tabObj.rows[colorIndex].cells[5].getElementsByTagName('oj-select-single')[0];//Redwood changed cells(5) to cells[5]
            //selindex=drpLstobj.options.selectedIndex; // Redwood
            if (drpLstobj.value == "C")//Redwood options[selindex] removed
             color=completed;
            if (drpLstobj.value == "N")//Redwood options[selindex] removed
             color=yet_to_run;
            if (drpLstobj.value == "W")//Redwood options[selindex] removed
             color=running;
            if (drpLstobj.value == "A")//Redwood options[selindex] removed
             color=aborted;
			 if (drpLstobj.value == "")//Redwood options[selindex] removed
             color=aborted;
//9NT1462 -ITR2 -BUG 13463684 Starts
/* 
            document.getElementsByName("BLK_EOC_RUNCHART__EOCREFNO")[colorIndex].style.background=color;
            document.getElementsByName("BLK_EOC_RUNCHART__SESSION")[colorIndex].style.background=color;
            document.getElementsByName("BLK_EOC_RUNCHART__EOCSEQUENCE")[colorIndex].style.background=color;
            document.getElementsByName("BLK_EOC_RUNCHART__BRNDATE")[colorIndex].style.background=color;
            document.getElementsByName("BLK_EOC_RUNCHART__EOCSTAGESTATUS")[colorIndex].style.background=color;
            document.getElementsByName("BLK_EOC_RUNCHART__EOCSTAGE")[colorIndex].style.background=color;
            document.getElementsByName("BLK_EOC_RUNCHART__ERROCDE")[colorIndex].style.background=color
*/
            getElementsByOjName("EOCREFNO")[colorIndex].style.background=color;
            getElementsByOjName("SESSION")[colorIndex].style.background=color;
            getElementsByOjName("EOCSEQUENCE")[colorIndex].style.background=color;
            getElementsByOjName("BRNDATE")[colorIndex].style.background=color;
            getElementsByOjName("EOCSTAGESTATUS")[colorIndex].style.background=color;
            getElementsByOjName("EOCSTAGE")[colorIndex].style.background=color;
            getElementsByOjName("ERROCDE")[colorIndex].style.background=color
//9NT1462 -ITR2 -BUG 13463684 Ends
            }
			//},0);//Redwood
       }
}

// changing the color of the programs mutiple entry blkbased on the status
function fnStatusColorChangeBlkPrograms()
{
try{ //1202_17774863
if (document.getElementById("BLK_EOC_PROGRAMS"))
      {
        var color;
		var prgColorIndex;
		var prgselindex;
		var prgdrpLstobj;
		var prgtabObj;

		//prgtabObj=document.getElementById("BLK_EOC_PROGRAMS").tBodies[0]; //Redwood
		prgtabObj=getTableObjForBlock("BLK_EOC_PROGRAMS").tBodies[0]; //Redwood
	       len = prgtabObj.rows.length;
	       for(prgColorIndex = 0;prgColorIndex < len; prgColorIndex++)
	            {
		     //prgdrpLstobj=prgtabObj.rows[prgColorIndex].cells(6).getElementsByTagName('SELECT')[0]; //Redwood 
			 prgdrpLstobj=prgtabObj.rows[prgColorIndex].cells[6].getElementsByTagName('oj-select-single')[0]; //Redwood
                   //prgselindex=prgdrpLstobj.options.selectedIndex;//Redwood
	            if (prgdrpLstobj.value == "C")//Redwood options[selindex] removed
	             color=completed;
	            if (prgdrpLstobj.value == "N")//Redwood options[selindex] removed
	             color=yet_to_run;
	            if (prgdrpLstobj.value == "W")//Redwood options[selindex] removed
	             color=running;
	            if (prgdrpLstobj.value == "A")//Redwood options[selindex] removed
	             color=aborted;
	            if (prgdrpLstobj.value == "R")//Redwood options[selindex] removed
	             color=rerun;
				if (prgdrpLstobj.options[prgselindex].value == "")//Redwood options[selindex] removed
	              color=aborted;

	             getElementsByOjName("BLK_EOC_PROGRAMS__EOCBATCHSTATUS")[prgColorIndex].style.background=color;
	             getElementsByOjName("BLK_EOC_PROGRAMS__EOCBATCH")[prgColorIndex].style.background=color;
				 //Redwood
	             //document.getElementById("BLK_EOC_PROGRAMS").tBodies[0].rows[prgColorIndex].cells[7].getElementsByTagName("INPUT")[0].style.background=color;
	             //document.getElementById("BLK_EOC_PROGRAMS").tBodies[0].rows[prgColorIndex].cells[9].getElementsByTagName("INPUT")[0].style.background=color;
				 getTableObjForBlock("BLK_EOC_PROGRAMS").tBodies[0].rows[prgColorIndex].cells[7].getElementsByTagName("oj-input-text")[0].style.background=color;
	             getTableObjForBlock("BLK_EOC_PROGRAMS").tBodies[0].rows[prgColorIndex].cells[9].getElementsByTagName("oj-input-text")[0].style.background=color;
				 //Redwood
	            }
      }
	  	}catch(e) {} //1202_17774863
}

function fnPostNavigate_BLK_EOC_RUNCHART_KERNEL(){
	fnStatusColorChange();
	return true;
}
//9NT1462 -ITR2 -BUG 13463684 Starts

// FUNCTION TO RERUN THE BATCH

function fnRerunBatch()
{


            var old_action= gAction;
            gAction='NEW';
            appendData(document.getElementById('TBLPage'+"All"));
            //FCUBS 10.5 STR1 SFR-2123 Starts
            var newdbDataDOM;
            try
            {
//As part of cross browser compatibility, ActiveXObject creation removed
			} catch(e)
			{
//As part of cross browser compatibility, ActiveXObject creation removed
			}
			//FCUBS 10.5 STR1 SFR-2123 Ends
            fcjRequestDOM = buildUBSXml();
			gAction='RERUNBATCHS';  //1202_17774863
setNodeText(selectSingleNode(fcjRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/ACTION"),'RERUNBATCHS');
            fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);

             if(fcjResponseDOM)
               {

                   var msgStatus   =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
                   if (msgStatus == 'FAILURE')
                   var messageNode = getXMLString(selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP"));
                   if (msgStatus == 'WARNING')
                   var messageNode = getXMLString(selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP"));
                   if (msgStatus == 'SUCCESS')
                   var messageNode = getXMLString(selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP"));
                   if((msgStatus == 'FAILURE')||(msgStatus == 'WARNING')) {
                   /*var returnVal = displayResponse_EOC(messageNode,msgStatus); commented for FCJ11.1 ITR1 SFR 4288
                   msgStatus = returnVal[2];
                   messageNode = returnVal[3];*/
                   //added the following FCJ11.1 ITR1 SFR 4288
                   processingAction = "RERUNBATCHS";
                    displayResponse(messageNode, msgStatus,'I');
                  }
                }
            // this is getting called only on synchronous success

                if (msgStatus == "SUCCESS"){
                    var pureXMLDOM    = fnGetDataXMLFromFCJXML(fcjResponseDOM,1);
                    setDataXML(getXMLString(pureXMLDOM));
		    showData(dbStrRootTableName, 1);
                    disableForm();
 //                   document.getElementById("BLK_EOC_RUNCHART").tBodies[0].rows[runchartIndex-1].cells[0].getElementsByTagName("INPUT")[0].checked =true;
   //                 document.getElementById("BLK_EOC_PROGRAMS").tBodies[0].rows[batchIndex-1].cells[0].getElementsByTagName("INPUT")[0].checked=true;
                    fnStatusColorChangeBlkPrograms();
                    fnStatusColorChange();
                    gAction='NEW';
                    appendData(document.getElementById('TBLPage'+"All"));
                    fcjRequestDOM = buildUBSXml();
					gAction='RERUNBATCHA'; // 1202_17774863
setNodeText(selectSingleNode(fcjRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/ACTION"),'RERUNBATCHA');
                    fnPostAsync(fcjRequestDOM,servletURL,functionId);
                    fnEnableElement(getElementsByOjName('BTN_RERUN_BATCH')[0]);
                    fnEnableElement(getElementsByOjName('BTN_EXIT')[0]);
                    fnEnableElement(getElementsByOjName('BTN_REFRESH')[0]);
                    var returnVal = displayResponse(messageNode,msgStatus,'I');
                    gAction="";
                    }

             if (gAction == "RERUNBATCHS"){
                 gAction =old_action;
                 }

                  fnEnableElement(getElementsByOjName('BTN_EXIT')[0]);
}

function fnMouseDownEvents(event){
  var tableRef,totalRows,rowRef;
  var evnt = window.event || e;
  var srcElement = getEventSourceElement(evnt); 
  var eventSrc = srcElement.id.substr(0,16).toUpperCase();
  try{
	  if(srcElement.tagName.toUpperCase() == 'INPUT'){
		  if(eventSrc == 'BLK_EOC_RUNCHART')
			  //tableRef =document.getElementById("BLK_EOC_RUNCHART");//Redwood
		      tableRef =getTableObjForBlock("BLK_EOC_RUNCHART");//Redwood
			  //else if(eventSrc == 'BLK_EOC_PROGRAMS') tableRef =document.getElementById("BLK_EOC_PROGRAMS");//Redwood
			  else if(eventSrc == 'BLK_EOC_PROGRAMS') tableRef =getTableObjForBlock("BLK_EOC_PROGRAMS");//Redwood
			  else return true;
			  //totalRows = tableRef.tBodies[0].rows.length;//Redwood
                          totalRows = getOjTableRowsLength("BLK_EOC_RUNCHART");//Redwood
			  rowRef = tableRef.tBodies[0].rows;
				for( i=0 ; i < totalRows ; i++ ) 
					{	   
						//rowRef[i].cells[0].getElementsByTagName("INPUT")[0].checked = false;//Redwood
						rowRef[i].cells[0].getElementsByTagName("oj-input-text")[0].value = false;//Redwood
					}
			}
	  }catch(err){}
  return true;

}
//9NT1462 -ITR2 -BUG 13463684 Ends
