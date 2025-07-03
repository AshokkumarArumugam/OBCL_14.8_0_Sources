/*----------------------------------------------------------------------------------------------------
**
** File Name    : AuditTrail.js
**
** Module       : FCJWeb
**
** This source is part of the Oracle Flexcube Universal Banking
** Software System and is copyrighted by Oracle Financial Services Software Limited.

** All rights reserved.  No part of this work may be reproduced,
** stored in a retrieval system, adopted or transmitted in any form
** or by any means, electronic, mechanical, photographic, graphic,
** optic recording or otherwise, translated in any language or
** computer language, without the prior written permission  from Oracle Financial Services
** Software Limited.

** Oracle Financial Services Software Limited.,
** 10-11, SDF I, SEEPZ, Andheri (East),
** MUMBAI - 400 096.
** INDIA.

Copyright © 2004-2011   by Oracle Financial Services Software Limited..
----------------------------------------------------------------------------------------------------
        
        Modified On			  : 19-May-2010
		Modified Reason	      : FCUBS 11.1 - ITR1 SFR#2965
		Search String		  : SFR#2965
**
**  Modified By          : Manoj S
**  Modified On          : 23-Jun-2023
**  Modified Reason      : While perparing array provider field Name is replaced when DBC is null 
**  Search String        : REDWOOD_35438955
----------------------------------------------------------------------------------------------------- 
*/
function fn_maintenance_stamp(formName, actionCode){
    var modNo = new Number(document.getElementsByName("MOD_NO")[0].value == '' || document.getElementsByName("MOD_NO")[0].value == null ? 0 : document.getElementsByName("MOD_NO")[0].value);
    modNo = modNo + 1;
    if (actionCode != 'A'){
        debugs("User:" + mainWin.UserId);
        document.getElementsByName("MAKER_ID")[0].value = mainWin.UserId;
        document.getElementsByName("MAKER_ID")[0].setAttribute("CHANGED", "1");
        document.getElementsByName("MOD_NO")[0].value = modNo.valueOf();
        document.getElementsByName("MOD_NO")[0].setAttribute("CHANGED", "1");
        document.getElementsByName("AUTH_STAT")[0].setAttribute("CHANGED", "1");
    }

    fnDisableAuditBlock(document.getElementsByName("MAKER_ID")[0]);
    fnDisableAuditBlock(document.getElementsByName("CHECKER_ID")[0]);
    fnDisableAuditBlock(document.getElementsByName("MAKER_DT_STAMP")[0]);
    fnDisableAuditBlock(document.getElementsByName("CHECKER_DT_STAMP")[0]);
   // fnDisableAuditBlock(document.getElementById("MAKER_DT_STAMPI")); //REDWOOD_CHANGES
   // fnDisableAuditBlock(document.getElementById("CHECKER_DT_STAMPI")); //REDWOOD_CHANGES

    fnDisableAuditBlock(document.getElementsByName("MOD_NO")[0]);
    if (actionCode == 'N'){
        document.getElementsByName("MOD_NO")[0].value = "";
        document.getElementsByName("MAKER_DT_STAMP")[0].value = "";
       // document.getElementById("MAKER_DT_STAMPI").value = "";   //REDWOOD_CHANGES
        document.getElementsByName("RECORD_STAT")[0].value = true;	 //REDWOOD_CHANGES
        document.getElementsByName("RECORD_STAT")[0].setAttribute("CHANGED", "1");
        document.getElementsByName("AUTH_STAT")[0].value = "N";//false;  //REDWOOD_CHANGES//REDWOOD_35438955
        document.getElementsByName("CHECKER_ID")[0].value = '';
        document.getElementsByName("CHECKER_DT_STAMP")[0].value = '';
       // document.getElementById("CHECKER_DT_STAMPI").value = ""; //REDWOOD_CHANGES
    } else if (actionCode == 'C'){
        debugs("Mod No:" + modNo);
       // document.getElementsByName("RECORD_STAT")[0].className = "TEXTAuditReadOnly";	//REDWOOD_CHANGES
       // document.getElementsByName("AUTH_STAT")[0].className = "TEXTAuditReadOnly"; //REDWOOD_CHANGES

        document.getElementsByName("CHECKER_ID")[0].value = "";
        document.getElementsByName("CHECKER_DT_STAMP").value = "";	//REDWOOD_CHANGES

    } else if (actionCode == 'M'){

        document.getElementsByName("AUTH_STAT")[0].value = "N";//false;  //REDWOOD_CHANGES//REDWOOD_35438955
        document.getElementsByName("CHECKER_ID")[0].value = '';
        document.getElementsByName("CHECKER_DT_STAMP")[0].value = '';

        document.getElementsByName("MAKER_DT_STAMP")[0].value = "";
       // document.getElementById("MAKER_DT_STAMPI").value = ""; //REDWOOD_CHANGES
       // document.getElementById("CHECKER_DT_STAMPI").value = '';	 //REDWOOD_CHANGES

        fnDisableAuditBlock(document.getElementsByName("MAKER_ID")[0]);
        fnDisableAuditBlock(document.getElementsByName("CHECKER_ID")[0]);
        fnDisableAuditBlock(document.getElementsByName("MAKER_DT_STAMP")[0]);
        fnDisableAuditBlock(document.getElementsByName("CHECKER_DT_STAMP")[0]);
        fnDisableAuditBlock(document.getElementsByName("RECORD_STAT")[0]);
        fnDisableAuditBlock(document.getElementsByName("MOD_NO")[0]);
        fnDisableAuditBlock(document.getElementsByName("AUTH_STAT")[0]);
        fnDisableAuditBlock(document.getElementsByName("ONCE_AUTH")[0]);

    } else if (actionCode == 'O'){
        debugs("Mod No:" + modNo);
        document.getElementsByName("RECORD_STAT")[0].setAttribute("CHANGED", "1");
    }

}

function fnDisableAuditBlock(auditElement){
    if (!auditElement) return;
    auditElement.readOnly = true;			 
//REDWOOD_CHANGES
    auditElement.setAttribute("readOnly",true);
   // if(auditElement.name == "MOD_NO")
   //     auditElement.className = "TEXTAuditReadOnly numeric";
   /// else
     //   auditElement.className = "TEXTAuditReadOnly";	
//REDWOOD_CHANGES
    return true;
}

function fnEnableAuditBlock(auditElement){
    auditElement.readOnly = false;
    auditElement.setAttribute("readOnly",false);	 //REDWOOD_CHANGES
   // auditElement.className = "TEXTAudit";	//REDWOOD_CHANGES
    return true;
}

function fnFormatTimeStamp(elem) {
    var objDtStamp = elem;
    if (objDtStamp && objDtStamp.value) {
        var objDtStampValue = objDtStamp.value;
        var datePart = objDtStampValue.substring(0, 10);
        var timePart = objDtStampValue.substring(10);
        var mb3Date = new MB3Date(datePart, gDateFormatDSO);
        var formattedTS = mb3Date.getShortDate() + timePart;
        //document.getElementById(objDtStamp.name + "I").value = formattedTS;
        getNextSibling(objDtStamp).value = formattedTS;
    }else if (objDtStamp && objDtStamp.value == "") {
        //document.getElementById(objDtStamp.name + "I").value = "";
        getNextSibling(objDtStamp).value = "";
    }
    return;
}

function getCurrentDateTime(){
    var dateTime = getDateObject();
    return getCurrentDate(dateTime) + ' ' + getCurrentTime(dateTime);
}

function getCurrentDate(dt){
    var day = dt.getDay();
    var month = dt.getMonth() + 1;
    var year = dt.getYear();
    day = day + "";
    month = month + "";

    if (month.length == 1) month = "0" + month;
    if (day.length == 1) day = "0" + day;
    return year + "-" + month + "-" + day;
}

function getCurrentTime(dt){
    if (dt == null) dt = getDateObject();
    var hours = dt.getHours();
    var minutes = dt.getMinutes();
    var seconds = dt.getSeconds();

    hours = hours + "";
    minutes = minutes + "";
    seconds = seconds + "";
    if (hours.length == 1) hours = "0" + hours;
    if (minutes.length == 1) minutes = "0" + minutes;
    if (seconds.length == 1) seconds = "0" + seconds;
    return hours + ":" + minutes + ":" + seconds;
}

function authorize(){
    
    var t = getDateObject();
    inTime= t.getTime();
    if (screenType == 'M') {
        var Function_id = mainWin.document.getElementById("fastpath").value;
        var uiXML = mainWin.gActiveWindow.uiXML;
        var title = mainWin.getItemDesc("LBL_AUTHORIZE");
        
        var l_Params  = "title="       + title;       
            l_Params += "&functionid=" + Function_id;
            l_Params += "&uiName=" + uiXML;
            l_Params += "&inTime=" + inTime;//Performance Changes
       // mask(); //REDWOOD_CHANGES
        loadSubScreenDIV("ChildWin", "Authorize.jsp?"+l_Params);
    } else {
        var screenArgs = new Array();
        var userLanguageCode = mainWin.LangCode;
        screenArgs['SCREEN_NAME'] = 'CVS_AUTHORIZE'; //mAKE THE SCREEN NAME AS CVS_AUTHORIZE
         screenArgs['INTIME']=inTime//Performance Changes
        screenArgs['FUNCTION_ID'] = mainWindocument.getElementById("fastpath").value;
        var functionId = screenArgs['FUNCTION_ID'];
        screenArgs['LANG'] = userLanguageCode;
        if (document.getElementsByName("MAKER_ID")[0]) screenArgs['MAKER_ID'] = document.getElementsByName("MAKER_ID")[0].value;

        if (document.getElementsByName("MAKERID")[0]) screenArgs['MAKER_ID'] = document.getElementsByName("MAKERID")[0].value;

        screenArgs['UI_XML'] = mainWin.document.getElementById("fastpath").value;
        appendData(document.getElementById('TBLPage' + strCurrentTabID));
        screenArgs['DESCRIPTION'] = fnGetSubScreenTitle('UIXML/' + userLanguageCode + '/' + functionId + '.xml', screenArgs['SCREEN_NAME']);
        
        fnShowSubScreen(screenArgs);

    }
}

function fn_transaction_stamp(actionCode){
    var dateTime = getDateObject();
    var currentDateTime = getCurrentDate(dateTime) + ' ' + getCurrentTime(dateTime);

    if (document.getElementsByName("MAKER_ID")[0]){
        document.getElementsByName("MAKER_ID")[0].readOnly = true;
    }

    if (document.getElementsByName("MAKERID")[0]){
        document.getElementsByName("MAKERID")[0].readOnly = true;
    }
    if (document.getElementsByName("CHECKERID")[0]){
        document.getElementsByName("CHECKERID")[0].readOnly = true;
    }
    if (document.getElementsByName("CHECKER_ID")[0]){
        document.getElementsByName("CHECKERID")[0].readOnly = true;
    }
    if (document.getElementsByName("MAKERSTAMP")[0]){
        document.getElementsByName("MAKERSTAMP")[0].readOnly = true; //REDWOOD_CHANGES
    }
    if (document.getElementsByName("MAKER_DT_STAMP")[0]){
        document.getElementsByName("MAKER_DT_STAMP")[0].readOnly = true; //REDWOOD_CHANGES
    }
    if (document.getElementsByName("CHECKERSTAMP")[0]){
        document.getElementsByName("CHECKERSTAMP")[0].readOnly = true;	//REDWOOD_CHANGES
    }
    if (document.getElementsByName("CHECKER_DT_STAMP")[0]){
        document.getElementsByName("CHECKER_DT_STAMP")[0].readOnly = true;//REDWOOD_CHANGES
    }
    if (document.getElementsByName("CONTSTAT")[0]){
        document.getElementsByName("CONTSTAT")[0].readOnly = true;
    }
    if (document.getElementsByName("REVR_MAKERID")[0]){
        document.getElementsByName("REVR_MAKERID")[0].readOnly = true;
    }
    if (document.getElementsByName("REVR_MAKERSTAMP")[0]){
        document.getElementsByName("REVR_MAKERSTAMP")[0].readOnly = true;
    }
    if (document.getElementsByName("REVR_CHECKERID")[0]){
        document.getElementsByName("REVR_CHECKERID")[0].readOnly = true;
        //document.forms[0].CONTSTAT.className = "TEXTAuditReadOnly";
    }
    if (document.getElementsByName("REVR_CHECKERSTAMP")[0]){
        document.getElementsByName("REVR_CHECKERSTAMP")[0].readOnly = true;
        //document.forms[0].CONTSTAT.className = "TEXTAuditReadOnly";
    }
    if (document.getElementsByName("REVR_CHECKERSTAMP")[0]){	//REDWOOD_CHANGES
        document.getElementsByName("REVR_CHECKERSTAMP")[0].readOnly = true;//REDWOOD_CHANGES
        //document.forms[0].CONTSTAT.className = "TEXTAuditReadOnly";
    }
    if (document.getElementsByName("REVR_MAKERSTAMP")[0]){		  //REDWOOD_CHANGES
        document.getElementsByName("REVR_MAKERSTAMP")[0].readOnly = true;  //REDWOOD_CHANGES
        //document.forms[0].CONTSTAT.className = "TEXTAuditReadOnly";
    }

    if (actionCode != 'A'){
        debugs("User:" + mainWin.UserId);
        if (document.getElementsByName("MAKER_ID")[0]){
            document.getElementsByName("MAKER_ID")[0].value = mainWin.UserId;
            document.getElementsByName("MAKER_ID")[0].setAttribute("CHANGED", "1");
        }

        if (document.getElementsByName("MAKERID")[0]){
            document.getElementsByName("MAKERID")[0].value = mainWin.UserId;
            document.getElementsByName("MAKERID")[0].setAttribute("CHANGED", "1");
        }

        if (document.getElementsByName("AUTH_STAT")[0]) 
            document.getElementsByName("AUTH_STAT")[0].setAttribute("CHANGED", "1");
    }

    if (actionCode == 'N'){
        if (document.getElementsByName("RECORD_STAT")[0]){
            document.getElementsByName("RECORD_STAT")[0].value = true;//REDWOOD_CHANGES
            document.getElementsByName("RECORD_STAT")[0].setAttribute("CHANGED", "1");
        }
        if (document.getElementsByName("AUTH_STAT")[0]) 
            document.getElementsByName("AUTH_STAT")[0].value = "N";//false;  //REDWOOD_CHANGES//REDWOOD_35438955

        if (document.getElementsByName("MAKER_ID")[0]) 
            document.getElementsByName("MAKER_ID")[0].value = mainWin.UserId;

        if (document.getElementsByName("MAKERID")[0]) 
            document.getElementsByName("MAKERID")[0].value = mainWin.UserId;

        if (document.getElementsByName("MAKER_DT_STAMP")[0]) 
            document.getElementsByName("MAKER_DT_STAMP")[0].value = "";

        if (document.getElementsByName("MAKERSTAMP")[0]) 
            document.getElementsByName("MAKERSTAMP")[0].value = "";

    } else if (actionCode == 'C'){
        
        if (document.getElementsByName("RECORD_STAT")[0]) 
            document.getElementsByName("RECORD_STAT")[0].className = "TEXTAuditReadOnly";
        if (document.getElementsByName("AUTH_STAT")[0]) 
            document.getElementsByName("AUTH_STAT")[0].className = "TEXTAuditReadOnly";
        }else if (actionCode == 'M'){
        if (document.getElementsByName("CHECKER_ID")[0]){
            document.getElementsByName("CHECKER_ID")[0].value = "";
        }
        if (document.getElementsByName("CHECKERID")[0]){
            document.getElementsByName("CHECKERID")[0].value = "";
        }

        if (document.getElementsByName("CHECKER_DT_STAMP")[0]){
            document.getElementsByName("CHECKER_DT_STAMP")[0].value = ""; //REDWOOD_CHANGES
        }

        if (document.getElementsByName("CHECKERSTAMP")[0]){
            document.getElementsByName("CHECKERSTAMP")[0].value = ""; //REDWOOD_CHANGES
        }

        if (document.getElementsByName("RECORDSTAT")[0]){
            document.getElementsByName("RECORDSTAT")[0].value = true; //REDWOOD_CHANGES
            //document.forms[0].RECORD_STAT.CHANGED ="1";
        }
        if (document.getElementsByName("AUTHSTAT")[0]) document.getElementsByName("AUTHSTAT")[0].value = "N";//false; //REDWOOD_CHANGES//REDWOOD_35438955

        if (document.getElementsByName("MAKER_ID")[0]){
            document.getElementsByName("MAKER_ID")[0].value = mainWin.UserId;
        }

        if (document.getElementsByName("MAKERID")[0]){
            document.getElementsByName("MAKERID")[0].value = mainWin.UserId;
        }

        if (document.getElementsByName("MAKER_DT_STAMP")[0]){
            document.getElementsByName("MAKER_DT_STAMP")[0].value = "";	 //REDWOOD_CHANGES
        }

        if (document.getElementsByName("MAKERSTAMP")[0]){
            document.getElementsByName("MAKERSTAMP")[0].value = "";	  //REDWOOD_CHANGES
        }
        if (document.getElementsByName("CONTSTAT")[0]){
            holdStatus = document.getElementsByName("CONTSTAT")[0].value;
            document.getElementsByName("CONTSTAT")[0].value = "";
        }
        if (document.getElementsByName("PROCESSTAT")[0]){
            document.getElementsByName("PROCESSTAT")[0].value = "";
        }
    }

    return true;
}
