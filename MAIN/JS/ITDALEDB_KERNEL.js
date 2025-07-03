/***************************************************************************************************************************
**  This source is part of the FLEXCUBE Software Product. 
**  Copyright (c) 2008 ,2014, Oracle and/or its affiliates.
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
**  File Name          : ITDALEDB_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : Sriram Ramani
**  Last modified on   : 03-July-2015
**  Full Version       : 21363898
**  Reason             : Before sending the ajax request for dismiss button setting the function id to CODTYPES for ELCM
						and then assigning back the actual functionid

**  Last Modified By   : Harish Kandriga
**  Last modified on   : 19-Sep-2019
**  Fix Description    : "DISMISS" link is not working for alerts. Code handling is missing to Dismiss the alert when Dismiss link is clicked.
						 Fix provided such that when dismiss is clicked it will go through ITREMNDA function and updates the process status in kernel package.
**  Search String      : 9NT1606_14_3_30324966

**	Modified By   :	Aiswarya Donthi
** 	Modified on   : 7-Feb-2022
** 	Description   : Redwood Changes done 
** 	Search String : redwood_changes

****************************************************************************************************************************/

function fnCallDetail_ITSALEDB_KERNEL(screenArgs) {
	//9NT1606_14_3_30324966 starts
	    /*if(screenArgs.OBJECT.innerHTML == 'DISMISS') {
        var sumTblObj = document.getElementById("Innertable_ITSALEDB").tBodies[0].rows;
        /*var chkd = false;
        /*for (var j = 0; j < sumTblObj.length; j++) {
            var isChkd = sumTblObj[j].cells[3].getElementsByTagName('input')[0].checked;
            if (isChkd) chkd = true;
        }
        if (!chkd) {
            alert("No records are selected");
            return true;
        }*/
	
        /*var g_prev_gAction = gAction;
        gAction = "DISMISS";

        var headerNode = '<FCUBS_REQ_ENV><FCUBS_HEADER><SOURCE/><UBSCOMP/><USERID/><BRANCH/><SERVICE/><OPERATION/><MULTITRIPID/>';
        headerNode += '<FUNCTIONID/><ACTION/><MSGSTAT/><MODULEID/><MSGID/></FCUBS_HEADER></FCUBS_REQ_ENV>';
        exlRequestDOM = loadXMLDoc(headerNode);
        setNodeText(selectSingleNode(exlRequestDOM, "FCUBS_REQ_ENV/FCUBS_HEADER/SOURCE"), "FLEXCUBE");
        setNodeText(selectSingleNode(exlRequestDOM, "FCUBS_REQ_ENV/FCUBS_HEADER/UBSCOMP"), "FCUBS");
        setNodeText(selectSingleNode(exlRequestDOM, "FCUBS_REQ_ENV/FCUBS_HEADER/USERID"), mainWin.UserId);
        setNodeText(selectSingleNode(exlRequestDOM, "FCUBS_REQ_ENV/FCUBS_HEADER/BRANCH"), mainWin.CurrentBranch);
        setNodeText(selectSingleNode(exlRequestDOM, "FCUBS_REQ_ENV/FCUBS_HEADER/FUNCTIONID"), "CODTYPES");
        setNodeText(selectSingleNode(exlRequestDOM, "FCUBS_REQ_ENV/FCUBS_HEADER/ACTION"), "SUBSCRPICKUP_ALERTDISMISS");
        setNodeText(selectSingleNode(exlRequestDOM, "FCUBS_REQ_ENV/FCUBS_HEADER/MODULEID"), "EL");
    
        var bodyReq = loadXMLDoc("<FCUBS_BODY><FLD><FN PARENT=\"\" RELATION_TYPE=\"1\" TYPE=\"BLK_STATIC_TYPE\">ID~TYPE~TYPE_NAME~TYPE_VALUE~SOURCE~ADDITIONAL_FIELD1~ADDITIONAL_FIELD2~ADDITIONAL_FIELD3~ADDITIONAL_FIELD4~ADDITIONAL_FIELD5~ADDITIONAL_FIELD6~ADDITIONAL_FIELD7~ADDITIONAL_FIELD8~ADDITIONAL_FIELD9~ADDITIONAL_FIELD10~ADDITIONAL_DATE1~ADDITIONAL_DATE2~ADDITIONAL_DATE3~ADDITIONAL_DATE4~ADDITIONAL_DATE5~MAKER~MAKERSTAMP~CHECKER~CHECKERSTAMP~MODNO~TXNSTAT~AUTHSTAT~ONCEAUTH</FN></FLD></FCUBS_BODY>");
        //var bodyReq = loadXMLDoc("<FCUBS_BODY><FLD><FN PARENT=\"\" RELATION_TYPE=\"1\" TYPE=\"BLK_MAIN\">STRTCOMID~ENDCOMID~COMMID</FN><FN PARENT=\"BLK_MAIN\" RELATION_TYPE=\"N\" TYPE=\"BLK_DETAILS\">SUBJECT~MSG~EFFDATE~STATUS~COMMID</FN></FLD><REC ID=\"1\" TYPE=\"BLK_MAIN\"><FV>~~~~</FV></REC></FCUBS_BODY>");
        len = sumTblObj.length;
        var count = 1;
        /*for (var i = 0; i < len; i++) {
            if (document.getElementById("Innertable_ITSALEDB").tBodies[0].rows[i].cells[3].getElementsByTagName("INPUT")[0]) {
               if (document.getElementById("Innertable_ITSALEDB").tBodies[0].rows[i].cells[3].getElementsByTagName("INPUT")[0].checked) {
                    var tabObj = document.getElementById("Innertable_ITSALEDB").tBodies[0].rows[i];*/
                    /*var ClmnValNode = exlRequestDOM.createElement("REC");
                    ClmnValNode.setAttribute("RECID", count);
                    ClmnValNode.setAttribute("TYPE", "BLK_STATIC_TYPE");
                    var clmValChldNode = exlRequestDOM.createElement("FV");
                    ClmnValNode.appendChild(clmValChldNode);
                    var cdatasect = exlRequestDOM.createCDATASection(screenArgs["NODEVALUES"].split("~")[5]+"~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                    selectSingleNode(ClmnValNode, "FV").appendChild(cdatasect);
                    //selectSingleNode(bodyReq, "//REC[@TYPE='BLK_STATIC_TYPE']").appendChild(ClmnValNode);
                    selectSingleNode(bodyReq, "//FCUBS_BODY").appendChild(ClmnValNode);
                    //selectSingleNode(bodyReq).appendChild(ClmnValNode);
                    count++;
                /*}
            }
        }*/
	/*selectSingleNode(exlRequestDOM, "//FCUBS_REQ_ENV").appendChild(selectSingleNode(bodyReq, "//FCUBS_BODY"));
		var dummyFn = functionId;//21363898
		functionId = "CODTYPES";//21363898
        fcjResponseDOM = fnPost(exlRequestDOM, servletURL, functionId);
        gDispAlertOnSuccess = 'N';
		functionId = dummyFn;//21363898
	//fnClearTable("Innertable_ITSALEDB");
	fnRefreshData();
    }*/
	if(screenArgs.OBJECT.innerHTML == 'DISMISS') {
        var sumTblObj = getTableObjForBlock("Innertable_ITSALEDB").tBodies[0].rows;  //redwood_changes
        var g_prev_gAction = gAction;
        gAction = "DISMISS";

        var headerNode = '<FCUBS_REQ_ENV><FCUBS_HEADER><SOURCE/><UBSCOMP/><USERID/><BRANCH/><SERVICE/><OPERATION/><MULTITRIPID/>';
        headerNode += '<FUNCTIONID/><ACTION/><MSGSTAT/><MODULEID/><MSGID/></FCUBS_HEADER></FCUBS_REQ_ENV>';
        exlRequestDOM = loadXMLDoc(headerNode);
        setNodeText(selectSingleNode(exlRequestDOM, "FCUBS_REQ_ENV/FCUBS_HEADER/SOURCE"), "FLEXCUBE");
        setNodeText(selectSingleNode(exlRequestDOM, "FCUBS_REQ_ENV/FCUBS_HEADER/UBSCOMP"), "FCUBS");
        setNodeText(selectSingleNode(exlRequestDOM, "FCUBS_REQ_ENV/FCUBS_HEADER/USERID"), mainWin.UserId);
        setNodeText(selectSingleNode(exlRequestDOM, "FCUBS_REQ_ENV/FCUBS_HEADER/BRANCH"), mainWin.CurrentBranch);
        setNodeText(selectSingleNode(exlRequestDOM, "FCUBS_REQ_ENV/FCUBS_HEADER/FUNCTIONID"), "ITREMNDA");
        setNodeText(selectSingleNode(exlRequestDOM, "FCUBS_REQ_ENV/FCUBS_HEADER/ACTION"), "DISMISS");
        setNodeText(selectSingleNode(exlRequestDOM, "FCUBS_REQ_ENV/FCUBS_HEADER/MODULEID"), "IT");

        var bodyReq = loadXMLDoc("<FCUBS_BODY><FLD><FN PARENT=\"\" RELATION_TYPE=\"1\" TYPE=\"BLK_MAIN\">STRTCOMID~ENDCOMID~COMMID</FN><FN PARENT=\"BLK_MAIN\" RELATION_TYPE=\"N\" TYPE=\"BLK_DETAILS\">SUBJECT~MSG~EFFDATE~STATUS~COMMID</FN></FLD><REC ID=\"1\" TYPE=\"BLK_MAIN\"><FV>~~~~</FV></REC></FCUBS_BODY>");
        len = sumTblObj.length;
        var count = 1;

		var ClmnValNode = exlRequestDOM.createElement("REC");
		ClmnValNode.setAttribute("RECID", count);
        ClmnValNode.setAttribute("TYPE", "BLK_DETAILS");
        var clmValChldNode = exlRequestDOM.createElement("FV");
        ClmnValNode.appendChild(clmValChldNode);
        var cdatasect = exlRequestDOM.createCDATASection("~~~~"+screenArgs["NODEVALUES"].split("~")[5]);
        selectSingleNode(ClmnValNode, "FV").appendChild(cdatasect);
        selectSingleNode(bodyReq, "//REC[@TYPE='BLK_MAIN']").appendChild(ClmnValNode);
        //selectSingleNode(bodyReq, "//FCUBS_BODY").appendChild(ClmnValNode);
        //selectSingleNode(bodyReq).appendChild(ClmnValNode);
        count++;

		selectSingleNode(exlRequestDOM, "//FCUBS_REQ_ENV").appendChild(selectSingleNode(bodyReq, "//FCUBS_BODY"));
        fcjResponseDOM = fnPost(exlRequestDOM, servletURL, functionId);

    }
	//9NT1606_14_3_30324966 ends
	else if(screenArgs.OBJECT.innerHTML == 'REVIEW') {
        screenArgs['CHANNEL'] = 'FCELCMALERTS';
        screenArgs['SCREENID'] = functionId;
        screenArgs['CHANNELREFNO'] = screenArgs["NODEVALUES"].split("~")[5];
        screenArgs['LIMITID'] = screenArgs["NODEVALUES"].split("~")[3];
        parent.screenArgs = screenArgs;
        mainWin.dispHref1(screenArgs["NODEVALUES"].split("~")[4], "");
    }
    fnRefreshData();
    return true;
}