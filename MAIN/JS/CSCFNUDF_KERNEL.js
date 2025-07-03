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
--------------------------------------------------------------------------------------------
 Caution Don't Delete this. This is used by the Version control utility.

	********************************** START OF LOG HISTORY **************************************
	$Log: Template.js.v $
	Revision 1.2  2005/02/22 09:30:48  IDSENTHILL
	1.2:Relesing to vercon

	Revision 1.1.1.0  2005/02/22 09:02:34  IDSENTHILL
	All the preAction functions should return a flag indicating the caller to proceed or not.

	Revision 1.1  2005/02/08 12:33:59  IDSENTHILL
	1.1:Relesing to vercon

	Revision 1.0.1.0  2005/02/07 07:39:16  IDSENTHILL
	Usage of AVCS Begin.

	Revision 1.0  2005/02/02 08:10:26  IDSENTHILL
	Initial Checkin

	Change Description  : To populate LOV for cube entity
      SFR No              : SNORAS RETRO SFR#4056
      Search Tag          : SNORAS RETRO SFR#4056
	  
	 Modified By        : Guruprasad Bhat
     Modified On        : 24-July-2014
     Modified Reason    : Date Validations where not working. Date Format was not specified if it was wrong.
     Search String      : Fix for Bug#18999384
	 
**  Modified By          : Pooja Kamath
**  Modified On          : 10-Apr-2023
**  Modified Reason      : Redwood changes
**  Search string        : REDWOOD_Changes

	********************************** END   OF LOG HISTORY **************************************

*/
//------------------------------------------------------------------------------
// VARIABLE DECLARATIONS
//------------------------------------------------------------------------------




 function fnPostLoad_CVS_UDF_KERNEL(screenArgs) {
	//Fix for Bug#18999384 Starts
	//var l = document.getElementById("BLK_UDF_DETAILS").tBodies[0].rows.length;
	var l = getTableObjForBlock("BLK_UDF_DETAILS").tBodies[0].rows.length; //REDWOOD_Changes
	for (var k=0;k<l;k++){        
	//fireHTMLEvent(document.getElementById("BLK_UDF_DETAILS_VIEW__FLDVAL"+k),"onpropertychange");
	fireHTMLEvent(getTableObjForBlock("BLK_UDF_DETAILS_VIEW__FLDVAL"+k),"onpropertychange"); //REDWOOD_Changes
	if (getBrowser().indexOf("IE") >=0 && getBrowser().indexOf("11") == -1 && getBrowser().indexOf("10") == -1){
	//document.getElementById("BLK_UDF_DETAILS_VIEW__FLDVAL"+k).fireEvent("onpropertychange");
	getTableObjForBlock("BLK_UDF_DETAILS_VIEW__FLDVAL"+k).fireEvent("onpropertychange"); //REDWOOD_Changes
		}
    }
	//Fix for Bug#18999384 Ends
	
    document.getElementById("cmdAddRow_BLK_UDF_DETAILS").style.visibility="hidden";
    document.getElementById("cmdDelRow_BLK_UDF_DETAILS").style.visibility="hidden";
    document.getElementById("BTN_SINGLE_VIEW_BLK_UDF_DETAILS").style.visibility="hidden";
	fnsetLovDate();
    if (gAction == ""){
        disableAllElements("INPUT");
        enableAllElements("BUTTON");
    }
	
       return true;
}

// Function to set the lov n date to the value field.
function fnsetLovDate(){



          //var misTable1 = document.getElementById("BLK_UDF_DETAILS");
		  var misTable1 = getTableObjForBlock("BLK_UDF_DETAILS"); //REDWOOD_Changes
          var misRows1 = misTable1.tBodies[0].rows;
          var rowIndex = 0;

           for(var nodeIndex = 0; nodeIndex <  misRows1.length; nodeIndex++) {
			//FCUBS 10.5 SFR#2136 Changed cells[6] below to cells[4] 21-07-2009
		/*SNORAS RETRO SFR#4056 10-FEB-2011 ARUNA STARTS
            if (misRows1[nodeIndex].cells[4].getElementsByTagName("INPUT")[0].value != "V"){
                 misRows1[nodeIndex].cells[2].getElementsByTagName("INPUT")[0].nextSibling.style.visibility="hidden";
            }
 		SNORAS RETRO SFR#4056 10-FEB-2011 ARUNA ENDS */
		//SNORAS RETRO SFR#4056 10-FEB-2011 ARUNA STARTS
		//if (misRows1[nodeIndex].cells[3].getElementsByTagName("INPUT")[0].value=='N'){//Number Field
		if (misRows1[nodeIndex].cells[3].getElementsByTagName("oj-input-text")[0].value=='N'){//Number Field //REDWOOD_Changes
			//fnChangeToUDFNumberField(misRows1[nodeIndex].cells[2].getElementsByTagName("INPUT")[0]);
			fnChangeToUDFNumberField(misRows1[nodeIndex].cells[2].getElementsByTagName("oj-input-text")[0]); //REDWOOD_Changes
		}
		//if (misRows1[nodeIndex].cells[3].getElementsByTagName("INPUT")[0].value=='D'){//Date Field
		if (misRows1[nodeIndex].cells[3].getElementsByTagName("oj-input-text")[0].value=='D'){//Date Field //REDWOOD_Changes
			//fnChangeToUDFDateField(misRows1[nodeIndex].cells[2].getElementsByTagName("INPUT")[0]);
			fnChangeToUDFDateField(misRows1[nodeIndex].cells[2].getElementsByTagName("oj-input-text")[0]); //REDWOOD_Changes
		}
		//SNORAS RETRO SFR#4056 10-FEB-2011 ARUNA ENDS

           // misRows1[nodeIndex].cells[1].getElementsByTagName("INPUT")[0].readOnly = true;
		   misRows1[nodeIndex].cells[1].getElementsByTagName("oj-input-text")[0].readOnly = true; //REDWOOD_Changes
          }
    }
//Fix for 17040616 start
function  fnPreDispLov_LOV_UDF_KERNEL(lovSrcElem)
{
  var lovId= lovSrcElem.getAttribute("LABEL_VALUE");
  if((lovId != undefined) && (lovId != null) && (lovId != "")){
    
    var cubeEntity = getNodeText(selectSingleNode(dbDataDOM, "//BLK_UDF_DETAILS[FLDNAM =\""+lovId+"\"]/DATATYP"));
          if(cubeEntity != null && cubeEntity == "C"){
              lovScreenArgs["CUBE_ENTITY"] = true;
          }
  }
  return true;
}
//Fix for 17040616 end
