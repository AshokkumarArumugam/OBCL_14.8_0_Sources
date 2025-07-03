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
**  File Name          : OLCMSPRT_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : Shubhanshu
**  Last modified on   : 24-05-2013
**  Reason             : In view screen exit button should not ask for confirmation as no operation is performed.
**  Search String	   : 9NT1606_CITI120_12.0_16851818

**  Last Modified By   : Shubhanshu
**  Last modified on   : 17-Nov-2014
**  Reason             : System is not spooling/printing the entire statement(Retro-20015451)
**  Search String	   : 9NT1606_CBA_12.0.3_20038003

**  Last Modified By   : Vrunda Pathare
**  Last modified on   : 23-Dec-2014
**  Reason             	: Every message being printed is having two extra tilda in the document. Before it was printing whole response.
								Parsed response and printing only message.
**  Search String	   : 9NT1606_INTERNAL_12.1_DEV0

**   Modified By       :  Chaatravi
**   Modified On       :  13-May-2015
**   Modified Reason   :  Advice Reprint 
**   Search String     :  Reprint changes

**  Last Modified By   : Jayendra Bhaskar
**  Last modified on   : 14-Sep-2016
**  Reason             : User is not able to print any Messages which are generated in OLSOUTBR screen
**  Search String	   : SFR#24294665
****************************************************************************************************************************/

var fcjRequestDOM;
var fcjResponseDOM;
var temp;
var agrArray  = new Array();

/* 
//SFR#24294665 starts
var temp1=''; //9NT1606_INTERNAL_12.1_DEV0	//Reprint Changes
var temp2=''; //9NT1606_INTERNAL_12.1_DEV0	//Reprint Changes
//SFR#24294665 ends
*/
var temp1=""; //SFR#24294665 added
var temp2=""; //SFR#24294665 added

function fnPostLoad_KERNEL(screenArgs) {
   screenArgs = parent.screenArgs;
    debugs("fnPostLoad_KERNEL");
   document.getElementById("BLK_OLVWS_MSG_MAIN__FCCREF").value = parent.screenArgs['FCCREF'];
   document.getElementById("BLK_OLVWS_MSG_MAIN__DCN").value = parent.screenArgs['DCN'];
    var oprn = parent.screenArgs['OPERATION'];
	
	debugs("BLK_OLVWS_MSG_MAIN__FCCREF", document.getElementById('BLK_OLVWS_MSG_MAIN__FCCREF').value);
	debugs("BLK_OLVWS_MSG_MAIN__DCN", document.getElementById('BLK_OLVWS_MSG_MAIN__DCN').value);
	debugs("OPERATION", oprn);

    createDOM(dbStrRootTableName);
		if(oprn == 'Print' )
			gAction = "PRINT_QRY";
		else
		    gAction = "VIEW_QRY";

    appendTextFieldValue(getElementsByOjName('FCCREF')[0], 1, 'BLK_OLVWS_MSG_MAIN');
    appendTextFieldValue(getElementsByOjName('DCN')[0], 1, 'BLK_OLVWS_MSG_MAIN');
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
                temp =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/REC/REC[@TYPE='BLK_OLVWS_MESSAGE']/FV"));
                temp = temp.replace(/#gt;/,">");
                if ( temp.substr(((temp.length)-1),temp.length) == '~'){
                    temp = temp.substr(0,(temp.length)-1);
                }
                getElementsByOjName('MESSAGE')[0].value =temp;		
            }else{
			debugs("else1", msgStatus);
                setDataXML(getXMLString(pureXMLDOM));
                showData(dbStrRootTableName, 1);	
				temp =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/REC/REC[@TYPE='BLK_OLVWS_MESSAGE']/FV"));
				//9NT1606_CBA_12.0.3_20038003 changes starts
				var l_tot_page = selectNodes(dbDataDOM, getXPathQuery('BLK_OLVWS_MESSAGE')).length;
				for (i=1; i<= l_tot_page; i++)
				{
					// 9NT1606_INTERNAL_12.1_DEV0 starts
					/*
					var temp;
					var temp1;
					if (i == 1) {
						temp = getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/REC/REC[@TYPE='BLK_OLVWS_MESSAGE'] [" +  i + "]/FV"));
					}
					else {
						temp1= getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/REC/REC[@TYPE='BLK_OLVWS_MESSAGE'] [" +  i + "]/FV"));
						if ( temp1.substr(((temp1.length)-1),temp1.length) == '~')
						{
							temp1 = temp1.substr(0,(temp1.length)-1);
						} 
			
						if ( temp1.substr(0,1) == '~')
						{		
							temp1= temp1.substr(1,(temp1.length));
						} 
			
						temp = temp + temp1;

					}*/
					//9NT1606_INTERNAL_12.1_DEV0 ends
					temp1=getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/REC/REC[@TYPE='BLK_OLVWS_MESSAGE'] [" +  i + "]/FV")).split('~');//9NT1606_INTERNAL_12.1_DEV0 ends
					debugs("temp1", temp1);
					temp2=temp2+temp1[2];//9NT1606_INTERNAL_12.1_DEV0 ends
				}
				temp = temp2; //9NT1606_INTERNAL_12.1_DEV0
			debugs("temp", temp);
				//9NT1606_CBA_12.0.3_20038003 changes ends
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
                //SFR#24294665 starts Commented
				/*
                w.document.write("<HTML><BODY onbeforeprint='PutInDiv();' onafterprint='putBack();'>");
                w.document.write(" \n <script language=javascript>");
                w.document.write("\n	var TA = document.all.tags('TEXTAREA');");  
                w.document.write("\n	function PutInDiv() {   ");                             
                w.document.write("\n	for (i = 0; i < TA.length; i++){");
                w.document.write("\n		var newDiv = document.createElement('DIV'); ");
                w.document.write("\n		newDiv.style.width = TA(i).clientWidth; ");
                w.document.write("\n		newDiv.style.height = TA(i).clientHeight; ");					
                w.document.write("\n		newDiv.id = TA(i).uniqueID + '_div'; ");					
                w.document.write("\n		var temp = TA(i).value;");                                        
                w.document.write("\n		var re = new RegExp('\\n','g');");
                w.document.write("\n		temp = temp.replace(re,'<BR>');");    
                w.document.write("\n		temp = temp.replace(/\s\s/gi,'&#xa0;&#xa0;'); ");					
                w.document.write("\n		newDiv.innerHTML = temp;");
                w.document.write("\n		TA(i).parentNode.insertBefore(newDiv, TA(i)); ");
                w.document.write("\n		TA(i).style.display = 'none'; ");
                w.document.write("\n		newDiv = null;	");
                w.document.write("\n	} ");
                w.document.write("\n   } ");
                
                w.document.write("\n function putBack(){ ");               
                w.document.write("\n	for (i = 0; i < TA.length; i++) { ");
                w.document.write("\n		var newDivR = document.all(TA(i).uniqueID + '/_div/'); ");
                w.document.write("\n		if (newDivR != null){ ");
                w.document.write("\n			newDivR.removeNode(true); ");
                w.document.write("\n		}");
                w.document.write("\n		TA(i).style.display = ''; ");
                w.document.write("\n	} ");	
                w.document.write("\n   } ");	
              	
                w.document.write("\n </SCRIPT>");
				*/
				// SFR#24294665 ends
                w.document.write("<HTML><BODY><pre rows='60' cols='100'>"+text1+"</pre></BODY></html>"); 
                
                //w.document.write("</BODY></html>");//SFR#24294665 commented
                w.document.close();
				if (oprn == 'Print')
		{
		
		debugs("oprnPrint", oprn);
		document.getElementById("BTN_EXIT_IMG").focus();//9NT1587_12.0.2_Message_Preview_IUT#33
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
	  showData("BLK_OLVWS_MSG_MAIN_M", 1);
    function fnPostLoad_CVS_OLCMSPRT_KERNEL(screenArgs) {
       return true;	  
        }
		getElementsByOjName("BTN_ADD_BLK_OLVWS_MESSAGE")[0].disabled = true; 		//Reprint Changes
        getElementsByOjName("BTN_REMOVE_BLK_OLVWS_MESSAGE")[0].disabled = true;		//Reprint Changes	
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
	//9NT1606_CITI120_12.0_16851818 
        /*if (gAction != "") {
            mask();
            showAlerts(fnBuildAlertXML("", "I", mainWin.getItemDesc("LBL_CANCEL_DESC")), "C");
            alertAction = "EXITACTION";
        } else {
            dbDataDOM = null;
            isExitTriggered = true;
            //fnFocus();
           // mainWin.showToolbar("", "", "");
            var winObj = mainWin.document.getElementById(seqNo);
            mainWin.fnExit(winObj);
        }*/
	//9NT1606_CITI120_12.0_16851818
    e.cancelBubble = true;
} 
function confirmAction(message)
{
     retVal = window.confirm(message);
    return retVal;
}
