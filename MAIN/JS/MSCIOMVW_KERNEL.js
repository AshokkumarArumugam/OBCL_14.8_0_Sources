/***************************************************************************************************************************
** This source is part of the Oracle FLEXCUBE Software Product.
** Copyright © 2008,2013 , Oracle and/or its affiliates.  All rights reserved
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
**  
**  Written by         : 
**  Date of creation   : 
**  File Name          : MSCIOMVW_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
** Modified By          : Vanitha P
** Modified On          : 2-Feb-2022
** Modified reason      : Redwood changes
** Search string        : Redwood

****************************************************************************************************************************/

var fcjRequestDOM;
var fcjResponseDOM;
var temp;
var agrArray  = new Array();

function fnPostLoad_KERNEL(screenArgs) {
    screenArgs = parent.screenArgs;
    
    document.getElementById("BLK_MESSAGE__FILE_REF_ID").value = parent.screenArgs['FILEREFID'];
    var oprn = parent.screenArgs['OPERATION'];
	
	
    createDOM(dbStrRootTableName);
	if(oprn == 'Print' )
		gAction = "PRINT_QRY";
	else
	    gAction = "VIEW_QRY";

    appendTextFieldValue(getElementsByOjName('FILE_REF_ID')[0], 1, 'BLK_MESSAGE');
    fcjRequestDOM = buildUBSXml();
    servletURL = "FCClientHandler";
    fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
    
    

	

    if(fcjResponseDOM) {
        var msgStatus   =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
        var messageNode = selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
        var pureXMLDOM  = fnGetDataXMLFromFCJXML(fcjResponseDOM,1);
		
        if (msgStatus == 'SUCCESS'){    
            if (oprn != 'Print'&&(oprn !='Spool')){       
                setDataXML(getXMLString(pureXMLDOM));
                //showData(dbStrRootTableName, 1);	
                temp =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/REC/REC[@TYPE='BLK_MESSAGE']/FV"));
                temp = temp.replace(/#gt;/,">");
               /* if (temp == "")
		      	  {
		      		  showErrorAlerts('FM-VW001');
		      		  return false;
		      	  } */               
                if ( temp.substr(((temp.length)-1),temp.length) == '~'){
                    temp = temp.substr(0,(temp.length)-1);
                }
                getElementsByOjName('MSG')[0].value =temp;		
            }else{
				
                setDataXML(getXMLString(pureXMLDOM));
                showData(dbStrRootTableName, 1);	
				temp =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/REC/REC[@TYPE='BLK_MESSAGE_DTL']/FV"));
				
				/*if (temp == "")
		      	  {
		      		  showErrorAlerts('FM-VW001');
		      		  return false;
		      	  } */
				
                temp = temp.replace(/#gt;/,">");
                if ( temp.substr(((temp.length)-1),temp.length) == '~'){
                    temp = temp.substr(0,(temp.length)-1);
                }                                       
                getElementsByOjName('MSG')[0].value =temp;		
				
                var w = window.open("",'MyWindow',"width=850,height=600,resizable=yes,scrollbars=yes,status=1,toolbar=yes");
                var text1 =getElementsByOjName('MSG')[0].value; 
                if ( text1.substr(((text1.length)-1),text1.length) == '~'){ 
                    text1 = text1.substr(0,(text1.length)-1); 
                }
                w.document.write("<HTML><BODY><pre rows='60' cols='100'>"+text1+"</pre></BODY></html>"); 
                
                w.document.close();
				if (oprn == 'Print'){
					
					w.print();
				}
				else if(oprn == 'Spool'){
					w.document.execCommand('SaveAs','1',getElementsByOjName('MSGID1')[0].value+".html");
				}
                w.close();
            }  
			gAction="DEFAULT";
			fnDisableElement(getElementsByOjName("MSG")[0]);	
			var msgStatus = fnProcessResponse();
			showAllData();
			//setDataXML(getXMLString(pureXMLDOM));
			//showData("BLK_FMVWS_MSG_MAIN", 1);
        }
        else if (msgStatus == 'FAILURE'){
				gAction="DEFAULT";
				var msgStatus = fnProcessResponse();
				showAllData();
            //var returnVal = displayResponse(messageNode);		
		   return true;
        }
    }
    
    return true;
}
function fnExitAll(v_scrName, e) {
    var e = window.event || e;
    var srcElement = getEventSourceElement(e);
    if(srcElement.disabled) return;
    
	dbDataDOM = null;
    isExitTriggered = true;
    var winObj = mainWin.document.getElementById(seqNo);
    mainWin.fnExit(winObj);
	e.cancelBubble = true;
} 
