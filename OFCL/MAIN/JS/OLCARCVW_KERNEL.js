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
**  
**  Written by         : 
**  Date of creation   : 
**  File Name          : OLCARCVW_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
****************************************************************************************************************************/

var fcjRequestDOM;
var fcjResponseDOM;
var temp;
var agrArray  = new Array();


var temp1=""; 
var temp2="";

function fnPostLoad_KERNEL(screenArgs) {
   screenArgs = parent.screenArgs;
    debugs("fnPostLoad_KERNEL");
   document.getElementById("BLK_ARCHIVE_OUT__FCCREF").value = parent.screenArgs['FCCREF'];
   document.getElementById("BLK_ARCHIVE_OUT__DCN").value = parent.screenArgs['DCN'];
    var oprn = parent.screenArgs['OPERATION'];
	
	debugs("BLK_ARCHIVE_OUT__FCCREF", document.getElementById('BLK_ARCHIVE_OUT__FCCREF').value);
	debugs("BLK_ARCHIVE_OUT__DCN", document.getElementById('BLK_ARCHIVE_OUT__DCN').value);
	debugs("OPERATION", oprn);

    createDOM(dbStrRootTableName);
		if(oprn == 'Print' )
			gAction = "PRINT_QRY";
		else
		    gAction = "VIEW_QRY";

    appendTextFieldValue(getElementsByOjName('FCCREF')[0], 1, 'BLK_ARCHIVE_OUT');
    appendTextFieldValue(getElementsByOjName('DCN')[0], 1, 'BLK_ARCHIVE_OUT');
    fcjRequestDOM = buildUBSXml();
    servletURL = "FCClientHandler";
    fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);

    if(fcjResponseDOM) {
        var msgStatus   =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
        var messageNode = selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
        var pureXMLDOM  = fnGetDataXMLFromFCJXML(fcjResponseDOM,1);
		debugs("msgStatus", msgStatus);
        if (msgStatus == 'SUCCESS'){
            if (oprn != 'Print'&&(oprn !='Spool')){       
                setDataXML(getXMLString(pureXMLDOM));
                showData(dbStrRootTableName, 1);	
                temp =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/REC/REC[@TYPE='BLK_ARCHIVE_OUT_N']/FV"));
                temp = temp.replace(/#gt;/,">");
                if ( temp.substr(((temp.length)-1),temp.length) == '~'){
                    temp = temp.substr(0,(temp.length)-1);
                }
                getElementsByOjName('MESSAGE')[0].value =temp;		
            }else{
			debugs("else1", msgStatus);
                setDataXML(getXMLString(pureXMLDOM));
                showData(dbStrRootTableName, 1);	
				temp =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/REC/REC[@TYPE='BLK_ARCHIVE_OUT_N']/FV"));
				
				var l_tot_page = selectNodes(dbDataDOM, getXPathQuery('BLK_ARCHIVE_OUT_N')).length;
				for (i=1; i<= l_tot_page; i++)
				{
					
					temp1=getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/REC/REC[@TYPE='BLK_ARCHIVE_OUT_N'] [" +  i + "]/FV")).split('~');
					debugs("temp1", temp1);
					temp2=temp2+temp1[2];
				}
				temp = temp2; 
			debugs("temp", temp);
				
                temp = temp.replace(/#gt;/,">");
                if ( temp.substr(((temp.length)-1),temp.length) == '~'){
                    temp = temp.substr(0,(temp.length)-1);
                }                                        
                getElementsByOjName('MESSAGE')[0].value =temp;		
				debugs("else2", getElementsByOjName('MESSAGE')[0].value);
                var w = window.open("",'MyWindow',"width=850,height=600,resizable=yes,scrollbars=yes,status=1,toolbar=yes");
                var text1 =getElementsByOjName('MESSAGE')[0].value; 
                if ( text1.substr(((text1.length)-1),text1.length) == '~'){ 
                    text1 = text1.substr(0,(text1.length)-1); 
                }
                
                w.document.write("<HTML><BODY><pre rows='60' cols='100'>"+text1+"</pre></BODY></html>"); 
                
                
                w.document.close();
				if (oprn == 'Print')
		{
		
		debugs("oprnPrint", oprn);
		document.getElementById("BTN_EXIT_IMG").focus();
                w.print();
				}
									else if(oprn == 'Spool')
									{
									w.document.execCommand('SaveAs','1',getElementsByOjName('DCN')[0].value+".html");
									}
                w.close();
       
            }  
        }
        else if (msgStatus == 'FAILURE'){
            var returnVal = displayResponse(messageNode);					
        }
    }
      fnDisableElement(getElementsByOjName("MESSAGE")[0]);	

	  setDataXML(getXMLString(pureXMLDOM));
	  showData("BLK_ARCHIVE_OUT_M", 1);
    function fnPostLoad_CVS_OLCARCVW_KERNEL(screenArgs) {
       return true;	  
        }
		getElementsByOjName("BTN_ADD_BLK_ARCHIVE_OUT_N")[0].disabled = true; 		
        getElementsByOjName("BTN_REMOVE_BLK_ARCHIVE_OUT_N")[0].disabled = true;		//Reprint Changes	
    return true;
}

function fnExitAll(v_scrName, e) 
{
    var e = window.event || e;
    var srcElement = getEventSourceElement(e);
    if(srcElement.disabled) return;
    debugs("FunctionId~ScreenName", functionId+"~"+v_scrName);
   //Reprint Changes starts
	var Reprint_Check = document.getElementById('BLK_CSTBS_UI_COLUMNS__CHAR_FIELD8').value; 
	debugs("Reprint_Check : ", document.getElementById('BLK_CSTBS_UI_COLUMNS__CHAR_FIELD8').value);
	if (gAction == "PRINT_QRY" && Reprint_Check == 'Y')
	{		
	    var ret = confirmAction('Print Successful..?');
	    if(ret)
		{
			gAction = 'PRSUC';
	        var fcjRequestDOM = buildUBSXml();
			fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
			var msgStatus   =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
			if (msgStatus!='')
			{
			  dbDataDOM = null;
              isExitTriggered = true;
              var winObj = mainWin.document.getElementById(seqNo);
              mainWin.fnExit(winObj);			
			}
	    }else
		 {	
			dbDataDOM = null;
            isExitTriggered = true;
            var winObj = mainWin.document.getElementById(seqNo);
            mainWin.fnExit(winObj);
	     }		
	}else
	 {	
		dbDataDOM = null;
        isExitTriggered = true;
        var winObj = mainWin.document.getElementById(seqNo);
        mainWin.fnExit(winObj);	
	 }
	
    e.cancelBubble = true;
} 
function confirmAction(message)
{
     retVal = window.confirm(message);
    return retVal;
}
