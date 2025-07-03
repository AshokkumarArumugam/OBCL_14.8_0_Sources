    /***************************************************************************************************************************
 **  This source is part of the FLEXCUBE Software Product.
 **  Copyright (c) 2007 ,2013, Oracle and/or its affiliates.
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
 **  Date of creation :
 **  File Name          : PIDECAQU_KERNEL.js
 **  Purpose            :
 **  Called From        :
 **
 **
 **  Changed By         : Divya J
 **  Changed On         : 06-Oct-2021
 **  Change Description : Restircted ECA Reprocessing from PISECAQU for failed transaction from Batch program.
 **  Search String      : OBCL_14.5_SUPPORT_BUG#33372590 

  **Changed By         : Vineeth T M
  **Changed On         : 12-Dec-2022
  **Change Description : Adding Request and Response buttons
  **Search String      : OBCL_14.6_SUPP_BUG#34805116 Changes 
  
  **Changed By         : Akhila Samson
  **Changed on         : 03-Mar-2023
  **Change Description : Redwood changes
  **Search String      : Bug#34958820_Redwood_changes

   
  **Changed By         : Revathi Dharmalingam
  **Changed On         : 04-May-2023
  **Change Description : When the user clicks the RESEND action from PISECAQU, the system does not update the status back to 'U 'in the Oltbs_Eca_Req_Master table.
						As part of bug #34805116, the order of the data blocks' fields in the RAD has been changed, 
						and the process ref no is not being passed to the database layer in the correct order.
  **Search String      : OBCL_14.6_SUPPORT_BUG#35332152	 
  
  **  **  
  **  Last Modified By   : Kavitha Asokan
  **  Last modified on   : 24-May-2024
  **  Search String      : Bug#36619894_1 - REDWOOD ADOPTION CHANGES	 
  **  Reason             : Not able to authorize as override block length is returning value even when there are no overrides. 
						 Modified the code to get the length from getOjTableRowsLength instead of fetching it from getTableObjForBlock. 
 ****************************************************************************************************************************/

var  currRowIndex= "";
var DCN_LIST;

function fn_Cancel() {
	var som = SingleOrMultiCheck();
	if (som == 0) {
		showErrorAlerts("IN-HEAR-206");
		return false;
	} else if (som > 1) {
		showErrorAlerts("IN-HEAR-205");
		return false;
	}
	fnMultiRowHit("ECA_CANCEL");
	return true;
}

function fn_Approve() {
	var som = SingleOrMultiCheck();
	if (som == 0) {
		showErrorAlerts("IN-HEAR-206");
		return false;
	} else if (som > 1) {
		showErrorAlerts("IN-HEAR-205");
		return false;
	}
	fnMultiRowHit("ECA_APPROVE");
	return true;
}

function fn_Resend() {
	var som = SingleOrMultiCheck();
	if (som == 0) {
		showErrorAlerts("IN-HEAR-206");
		return false;
	} else if (som > 1) {
		showErrorAlerts("IN-HEAR-205");
		return false;
	}
	fnMultiRowHit("ECA_RESEND");
	return true;
}

function SingleOrMultiCheck() {
	var selected_row = 0;
	var lbob_tchk = 0;
	currRowIndex = 0;
	//Bug#36619894_1 changes starts
	//len = getTableObjForBlock("TBL_QryRslts").tBodies[0].rows.length; //Bug#34958820_Redwood_changes
	len = getOjTableRowsLength("TBL_QryRslts");
	//Bug#36619894_1 changes ends 
	temp = 0;
	for (i = 0; i < len; i++) {
		if (getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0]) {  //Bug#34958820_Redwood_changes
			if (getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked) {  //Bug#34958820_Redwood_changes
				lbob_tchk = lbob_tchk + 1;
				selected_row = i;
				temp = i;
			}
		} else {
			break;
		}
	}
	return lbob_tchk;
}


//Function to Hit Backend with a Specifiec Action Code
function fnMultiRowHit(gActionCode) {
	
    var sumTblObj = getTableObjForBlock("TBL_QryRslts").tBodies[0].rows;  //Bug#34958820_Redwood_changes
    var chkd = false;
    for(var j = 0; j < sumTblObj.length; j++){
		//var isChkd = sumTblObj[j].cells[0].getElementsByTagName('INPUT')[0].value; //Bug#34958820_Redwood_changes
        var isChkd = sumTblObj[j].cells[0].getElementsByTagName('oj-input-text')[0].value; //Bug#34958820_Redwood_changes
        if(isChkd)
            chkd = true;        
    }
    if(!chkd){
        mask();
        showAlerts(fnBuildAlertXML('','I',mainWin.getItemDesc("LBL_NO_RECORDS_SEL")), 'I');
        alertAction = "UNMASK";
        return;
    }
    var g_prev_gAction = gAction;
    gAction = gActionCode;

    var headerNode = '<FCUBS_REQ_ENV><FCUBS_HEADER><SOURCE/><UBSCOMP/><USERID/><BRANCH/><SERVICE/><OPERATION/><MULTITRIPID/>';
    headerNode += '<FUNCTIONID/><ACTION/><MSGSTAT/><MODULEID/><ENTITY/><MSGID/></FCUBS_HEADER><FCUBS_BODY/></FCUBS_REQ_ENV>';
    exlRequestDOM =loadXMLDoc(headerNode);
    setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/SOURCE"), "FLEXCUBE");
    setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/UBSCOMP"), "FCUBS");
    setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/USERID"),mainWin.UserId);
    setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/BRANCH"), mainWin.CurrentBranch);
    setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/FUNCTIONID"), "PIDECAQU");
    setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/ACTION"),gActionCode);
    setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/MODULEID"),"PI");
    setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/ENTITY"),mainWin.entity);

    var bodyReq = fnPrepareBody();
    
    
	var node = selectSingleNode(exlRequestDOM,"//FCUBS_BODY");
    node.parentNode.replaceChild(bodyReq.cloneNode(true), node);
    fcjResponseDOM = fnPost(exlRequestDOM, servletURL, functionId);
    
	if (fcjResponseDOM) 
	{ 
	    var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
		if (msgStatus == 'FAILURE')
            {
		
			//OBCL_14.5_SUPPORT_BUG#33372590 Starts
			//var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP").xml; 
			//var returnVal = displayResponse(messageNode,msgStatus,'E');
			var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
			var returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'E');
			//OBCL_14.5_SUPPORT_BUG#33372590 Ends
		    }
		if (msgStatus == "WARNING" ||msgStatus == "SUCCESS")
            {
			//OBCL_14.5_SUPPORT_BUG#33372590 Starts    	
			//var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP").xml;
			//var returnVal = displayResponse(messageNode,msgStatus,'I');
			var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
			var returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'I');
			//OBCL_14.5_SUPPORT_BUG#33372590 Ends
		    }	
        gAction = g_prev_gAction;
		//fnRefreshSummary(event);//Refresh The Summary After Execution.//16177338_USDWFNA_12.0
		fnRefreshSummary();//16177338_USDWFNA_12.0
		
    }
	

}
//Function to Perpare the Body of the Request
function fnPrepareBody() {
        var msgxml_lbreprocess = "<FCUBS_BODY>";
            msgxml_lbreprocess += '    <FLD>'; 
			// OBCL_14.6_SUPPORT_BUG#35332152 Changes Starts
            // msgxml_lbreprocess += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_ECA_QUEUE">AMOUNT_REQUESTED~BLOCK_NO~BRANCH_CODE~CCY~CONTRACT_REF_NO~CUSTOMER_NO~DESTINATION_SOURCE~ECA_SYSTEM_CODE~EVENT_CODE~EXT_CUSTAC_NO~HOST_CODE~MODULE~PROCESS_REF_NO~REMARKS~REQ_DATE~SERVICE_CODE~STATUS</FN>';                        
            msgxml_lbreprocess += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_ECA_QUEUE">CONTRACT_REF_NO~PROCESS_REF_NO~BRANCH_CODE~EXT_CUSTAC_NO~CCY~AMOUNT_REQUESTED~BLOCK_NO~DESTINATION_SOURCE~SERVICE_CODE~STATUS~MODULE~CUSTOMER_NO~HOST_CODE~EVENT_CODE~REQ_DATE~ECA_SYSTEM_CODE~REMARKS~MESSAGE~STATUS</FN>';
            //OBCL_14.6_SUPPORT_BUG#35332152	Ends           
		   msgxml_lbreprocess += '    </FLD>';
            msgxml_lbreprocess += '<REC RECID="1" TYPE="BLK_ECA_QUEUE"><FV/></REC></FCUBS_BODY>';
    reqDom=loadXMLDoc(msgxml_lbreprocess);
    fnGetDCNList();
    var blkCdtSecNd = "";
	// OBCL_14.6_SUPPORT_BUG#35332152 Changes Starts
    //var blkCdtSecNd = reqDom.createCDATASection("~~~~~~~~~~~~" + DCN_LIST+"~~~~");
	var blkCdtSecNd = reqDom.createCDATASection("~" + DCN_LIST+"~~~~~~~~~~~~~~~~~");
	 //OBCL_14.6_SUPPORT_BUG#35332152	Ends 
    selectSingleNode(selectSingleNode(reqDom,"//REC[@RECID='1'][@TYPE='BLK_ECA_QUEUE']"),"FV").appendChild(blkCdtSecNd);
    return selectSingleNode(reqDom,"//FCUBS_BODY");

}

//Function to get all the DCN List which are selected
function fnGetDCNList() { 
      DCN_LIST = "";
      len = getTableObjForBlock("TBL_QryRslts").tBodies[0].rows.length;
      var msob_tchk = 0 ;      
      for(i = 0;i < len; i++) {
        if(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0]){  //Bug#34958820_Redwood_changes
          if(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked ){  //Bug#34958820_Redwood_changes
             msob_tchk = msob_tchk +1;
			 if((getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[2]))!="")   //Bug#34958820_Redwood_changes
             DCN_LIST = DCN_LIST + (getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[2])) ;   //Bug#34958820_Redwood_changes
           }
         }
	  }
      if (msob_tchk == 0 ) {         
		 showErrorAlerts('IN-HEAR-206');
         proc =0;
         return false ; 
	  }     
}

//Manikandan V Starts (Common Browser Screen)
function fnPostLoad_Sum_KERNEL(e){
	if (typeof(parent.screenArgs) != 'undefined') {
		 document.getElementById("BLK_ECA_QUEUE__CONTRACT_REF_NO").value = parent.screenArgs['CONTRACT_REF_NO'];
		 document.getElementById("BLK_ECA_QUEUE__BRANCH_CODE").value = parent.screenArgs['BRANCH_CODE'];	
	    fnExecuteQuery_sum('Y', e);
		parent.screenArgs = undefined;
   }
   //OBCL_14.6_SUPP_BUG#34805116 Changes start 
   addEvent(document.getElementById("BTN_REQUEST"), "onclick", "fnSetAction('REQSTMSG');fnSubScreenMain('PIDECAQU', 'PIDECAQU', 'CVS_MSG_BROWSER', false);");
   addEvent(document.getElementById("BTN_RESPONSE"), "onclick", "fnSetAction('RESPMSG');fnSubScreenMain('PIDECAQU', 'PIDECAQU', 'CVS_MSG_BROWSER', false);");
   //OBCL_14.6_SUPP_BUG#34805116 Changes end
	
return true;	
 }
 //Manikandan V End for get data from parent screen
 
 //OBCL_14.6_SUPP_BUG#34805116 Changes start
 function fnPreLoad_CVS_MSG_BROWSER_KERNEL() {
    SingleCheck();
    if (currRowIndex == 0) {
        return false;
    }
    var QryTable = getTableObjForBlock('TBL_QryRslts'); //Bug#34958820_Redwood_changes
    var rowInfo = QryTable.rows[currRowIndex];
    var er = fnGetDataXMLFromFCJXML(fcjResponseDOM, currRowIndex);
    dbDataDOM = er;
    var detailPk = g_DetPkArray[currRowIndex - 1];
    detailWinParams.ShowSummary = 'TRUE';
    detailWinParams.DetailPkVals = detailPk;
    screenArgs['REQ_DATE'] = getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[currRowIndex - 1].cells[15]); //Bug#34958820_Redwood_changes
    screenArgs['PROCESS_REF_NO'] = getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[currRowIndex - 1].cells[2]); //Bug#34958820_Redwood_changes
    screenArgs['CONTRACT_REF_NO'] = getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[currRowIndex - 1].cells[1]); //Bug#34958820_Redwood_changes
    process_status = getInnerText(getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[currRowIndex - 1].cells[10]); //Bug#34958820_Redwood_changes
	if (process_status == 'Processed') {
        screenArgs['STATUS'] = 'P';
    }
    else if (process_status == 'Error Message') {
        screenArgs['STATUS'] = 'E';
    }
    else if (process_status == 'Work In Progress') {
        screenArgs['STATUS'] = 'W';
    }
	else if (process_status == 'Unprocessed') {
        screenArgs['STATUS'] = 'U';
    }
	else if (process_status == 'Time Out') {
        screenArgs['STATUS'] = 'T';
    }
	else if (process_status == 'Approved') {
        screenArgs['STATUS'] = 'A';
    }
    else {
        screenArgs['STATUS'] = 'R';
    }
    screenArgs['ACTION'] = actionCode;
    parent.screenArgs = screenArgs;
    return true;
}

 function fnPostLoad_CVS_MSG_BROWSER_KERNEL() {
    if (parent.screenArgs != null && parent.screenArgs['ACTION'] != null) {
        document.getElementById("BLK_ECA_QUEUE__REQ_DATE").value = parent.screenArgs['REQ_DATE'];
        document.getElementById("BLK_ECA_QUEUE__PROCESS_REF_NO").value = parent.screenArgs['PROCESS_REF_NO'];
        document.getElementById("BLK_ECA_QUEUE__CONTRACT_REF_NO").value = parent.screenArgs['CONTRACT_REF_NO'];
        document.getElementById("BLK_ECA_QUEUE__STATUS").value = parent.screenArgs['STATUS'];
		document.getElementById("BLK_ECA_QUEUE__MESSAGE").value = '';
        setNodeText(selectSingleNode(dbDataDOM, "//BLK_ECA_QUEUE/REQ_DATE"), parent.screenArgs['REQ_DATE']);
        setNodeText(selectSingleNode(dbDataDOM, "//BLK_ECA_QUEUE/PROCESS_REF_NO"), parent.screenArgs['PROCESS_REF_NO']);
        setNodeText(selectSingleNode(dbDataDOM, "//BLK_ECA_QUEUE/CONTRACT_REF_NO"), parent.screenArgs['CONTRACT_REF_NO']);
        setNodeText(selectSingleNode(dbDataDOM, "//BLK_ECA_QUEUE/STATUS"), parent.screenArgs['STATUS']);
        setNodeText(selectSingleNode(dbDataDOM, "//BLK_ECA_QUEUE/MESSAGE"), '');		
        g_prev_gAction = gAction;
        gAction = parent.screenArgs['ACTION'];
        fcjRequestDOM = buildUBSXml();
        fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
        if (fcjResponseDOM) {
            var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
            var messageNode;
            if (msgStatus == "FAILURE") {
                messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
				var returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'E');
				gAction = g_prev_gAction;
				return false;
            }
            else if (msgStatus == "WARNING" || msgStatus == "SUCCESS") {
                messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
            }
        }
        var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
        setDataXML(getXMLString(pureXMLDOM));
        showData(dbStrRootTableName, 1);

        if (document.getElementById("BLK_ECA_QUEUE__MESSAGE").value != '') {
            try {
                var XMLMessage = formatXML(document.getElementById("BLK_ECA_QUEUE__MESSAGE").value, '\t');
                if (XMLMessage != '') {
                    document.getElementById("BLK_ECA_QUEUE__MESSAGE").value = XMLMessage;
                }
            }
            catch (e) {
                XMLMessage = '';
            }

        }
        parent.screenArgs = null;
        showToolbar('', '', '', '');
    }
    return true;
}

function formatXML(input, indent) {
    indent = indent || '\t';//you can set/define other ident than tabs
    //PART 1: Add \n where necessary
    xmlString = input.replace(/^\s+|\s+$/g, '');//trim it (just in case) {method trim() not working in IE8}
    xmlString = input.replace(/(<([a-zA-Z]+\b)[^>]*>)(?!<\/\2>|[\w\s])/g, "$1\n")//add \n after tag if not followed by the closing tag of pair or text node
					 .replace(/(<\/[a-zA-Z]+[^>]*>)/g, "$1\n")//add \n after closing tag
					 .replace(/>\s+(.+?)\s+<(?!\/)/g, ">\n$1\n<")//add \n between sets of angled brackets and text node between them
					 .replace(/>(.+?)<([a-zA-Z])/g, ">\n$1\n<$2")//add \n between angled brackets and text node between them
					 .replace(/\?></, "?>\n<")//detect a header of XML
    xmlArr = xmlString.split('\n');//split it into an array (for analise each line separately)
    //PART 2: indent each line appropriately
    var tabs = '';//store the current indentation
    var start = 0;//starting line
    if (/^<[?]xml/.test(xmlArr[0]))
        start++;//if the first line is a header, ignore it
    for (var i = start;i < xmlArr.length;i++)//for each line
    {
        var line = xmlArr[i].replace(/^\s+|\s+$/g, '');//trim it (just in case)
        if (/^<[\/]/.test(line))//if the line is a closing tag
        {
            tabs = tabs.replace(indent, '');//remove one indent from the store
            xmlArr[i] = tabs + line;//add the tabs at the beginning of the line
        }
        else if (/<.*>.*<\/.*>|<.*[^>]\/>/.test(line))//if the line contains an entire node
        {
            //leave the store as is
            xmlArr[i] = tabs + line;//add the tabs at the beginning of the line
        }
        else if (/<.*>/.test(line))//if the line starts with an opening tag and does not contain an entire node
        {
            xmlArr[i] = tabs + line;//add the tabs at the beginning of the line
            tabs += indent;//and add one indent to the store
        }
        else //if the line contain a text node
        {
            xmlArr[i] = tabs + line;// add the tabs at the beginning of the line
        }
    }
    //PART 3: return formatted string (source)
    return xmlArr.join('\n');//rejoin the array to a string and return it
}
 
 function SingleCheck() {
    var selected_row = 0;
    var msob_tchk = 0;
    currRowIndex = 0;
    len = getTableObjForBlock("TBL_QryRslts").tBodies[0].rows.length; //Bug#34958820_Redwood_changes
    var temp = 0;
    for (i = 0;i < len;i++) {
        if (getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0]) {  //Bug#34958820_Redwood_changes
            if (getTableObjForBlock("TBL_QryRslts").tBodies[0].rows[i].cells[0].getElementsByTagName("INPUT")[0].checked) { //Bug#34958820_Redwood_changes
                msob_tchk = msob_tchk + 1;
                selected_row = i;
                temp = i;
            }
        }
        else 
            break;
    }
    if (msob_tchk > 1) {
        showErrorAlerts('IN-HEAR-205');
        return false;
    }
    else if (msob_tchk == 0) {
        showErrorAlerts('IN-HEAR-206');
        return false;
    }
    else {
        currRowIndex = selected_row + 1;
    }
}

function fnPostExecuteQuery_sum_KERNEL(arg) {
	addEvent(document.getElementById("BTN_REQUEST"), "onclick", "fnSetAction('REQSTMSG');fnSubScreenMain('PIDECAQU', 'PIDECAQU', 'CVS_MSG_BROWSER', false);");
    addEvent(document.getElementById("BTN_RESPONSE"), "onclick", "fnSetAction('RESPMSG');fnSubScreenMain('PIDECAQU', 'PIDECAQU', 'CVS_MSG_BROWSER', false);");
    return false;
}

function fnSetAction(lAction) {
    actionCode = lAction;
    return true;
}
//OBCL_14.6_SUPP_BUG#34805116 Changes end
