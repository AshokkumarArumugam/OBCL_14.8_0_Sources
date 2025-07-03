/***************************************************************************************************************************
**  This source is part of the FLEXCUBE Software System and is copyrighted by 
**  Oracle Financial Services Software Limited.
**  
**  All rights reserved.  No part of this work may be reproduced, stored in a retrieval system, 
**  adopted or transmitted in any form or by any means, electronic, mechanical, photographic, 
**  graphic, optic recording or otherwise, translated in any language or computer language, 
**  without the prior written permission of Oracle Financial Services Software Limited.
**  
**  Oracle Financial Services Software Limited.
**  10-11, SDF I, SEEPZ, Andheri (East),
**  Mumbai - 400 096.
**  India.
**  
**  Copyright ? 2008 - 2015 by Oracle Financial Services Software Limited. All rights reserved.
**  
**  Written by         : 
**  Date of creation   : 
**  File Name          : CLRU.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 

 **  Modified By          : Neethu Sreedharan
 **  Modified On          : 07-Oct-2016
 **  Modified Reason      : The error seems to be due to network issue. Fix is provide to show the error 
                             to user as alert and on click of Ok button on alert window, screen will be 
                             unmasked and user can try the action again.
 **  Retro Source         : 9NT1606_12_0_3_INTERNAL
 **  Search String        : 9NT1606_12_2_RETRO_12_0_3_21182929
 
 **  Modified By          : Ambika Selvaraj
 **  Modified On          : 12-Sep-2017
 **  Modified Reason      : Code changes done to retain the search criteria and to fetch the results 
							based on the search criteria.
 **  Retro Source         : 9NT1606_12_3_COOPERATIVE_RABOBANK_U.A.
 **  Search String        : 9NT1606_12_4_RETRO_12_3_26780556
 
**
**  Modified By          : Selvam Manickam
**  Modified On          : 22-June-2023
**  Reason               : Added parameter to function
**  Search String        : REDWOOD_35250290
****************************************************************************************************************************/

var lovInfoFlds ={};
function fnLoadCLRU(xmlFileName, xslFileName)
{    
        var html = ShowXML(xmlFileName, xslFileName, strScreenName);
        if(getBrowser().indexOf("IE") != -1) {//ie11 changes
            document.getElementById("ResTree").insertAdjacentHTML("beforeEnd",html);
        } else {
            document.getElementById("ResTree").appendChild(html);
        }  
//REDWOOD_CHANGES
    if (getBrowser().indexOf("FIREFOX") != -1) {
        document.getElementById("ResTree").querySelectorAll('template').forEach((elem) => elem.remove());
        document.getElementById("ResTree").innerHTML = document.getElementById("ResTree").innerHTML.replace(new RegExp("template_tmp", 'g'), "template");
          
    }else{
         document.getElementById("ResTree").querySelectorAll('template_tmp').forEach((elem) => elem.remove());
    }
    document.getElementById("ResTree").innerHTML = document.getElementById("ResTree").innerHTML.replace(new RegExp("meid", 'g'), ":id").replace(new RegExp("readonly_temp", 'g'), "readonly");
    //var htmlContent = document.getElementById("ResTree").innerHTML;        
    fnBindScreenElements();
    //document.getElementById("BTN_OK").value = mainWin.getItemDesc("LBL_CLEAR");
    document.getElementById("BTN_OK").setAttribute("label",mainWin.getItemDesc("LBL_CLEAR"));
    document.getElementById("BTN_OK").removeAttribute("on-oj-action");
    //addEvent(document.getElementById("BTN_OK"), "onclick", "fnClearUser()");
    document.getElementById("BTN_OK").setAttribute("on-oj-action","[[fnClearUser.bind(null,'')]]");
//REDWOOD_CHANGES
    debugs("Inner Html", html);
    //fnBuildMultipleEntryArray();   //REDWOOD_CHANGES
    mainWin.loadChildWindow(mainWin.document.getElementById(seqNo), window);
    mainWin.fnAddWindowMenu(seqNo, functionId, screenTitle);
    setTimeout(function(){fnCalcHgt();},0);	//REDWOOD_CHANGES
    fnPostLoad();
    //document.getElementById("BTN_EXIT_IMG").focus();   
   /* if(mainWin.DebugWindowFlg == "Y") {
        mainWin.serverDebugStmt =webDbg + "\n\n"+appDbg+"\n\n"+dbDbg;
    }debug revert*/
    document.getElementById("BLK_USER__USRID").focus(); //21537541 
 } 

function fnFocus(){    
    mainWin.setActiveWindow(mainWin.document.getElementById(seqNo), window);
    if(userFuncId!='' && userFuncId!='null'){
        mainWin.document.getElementById("fastpath").value = userFuncId;
    }else{
        mainWin.document.getElementById("fastpath").value = functionId;
    }   
}

//function fnExitAll(){ //redwood_35250290
function fnExitAll(v_scrName, e) { //redwood_35250290
    dbDataDOM = null;                
    isExitTriggered = true;
    //mainWin.showToolbar("", "", "");
    var winObj = mainWin.document.getElementById(seqNo);
    mainWin.fnExit(winObj);
}

function fnPostLoad() {
	mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/document.getElementById("BTN_SINGLE_VIEW_"+dataSrcLocationArray[1]).style.visibility='hidden'; 
        fnEnableElement(document.getElementById("BLK_USER__USRID"));
/* Fix for 16883299 -Adding User and Branch field in CLRU  Starts*/
		    fnEnableElement(document.getElementById("BLK_USER__BRNCODE"));
        fnEnableElement(document.getElementById("BLK_USER__BTN_FETCH"));
        gAction ="";
        debugs("In fnPostLoad", "A");
        createDOM(dbStrRootTableName);   
        //retflds["BLK_USER__BRNCODE__LOV_BRANCH"]="BLK_USER__BRNCODE~~";
        //bndFlds["BLK_USER__BRNCODE__LOV_BRANCH"]="";
          lovInfoFlds["BLK_USER__BRNCODE__LOV_BRANCH"]=["BLK_USER__BRNCODE~~",""];/*12.0.4 UI performance changes */
        
}
 /*9NT1606_12_4_RETRO_12_3_26780556 Starts*/
var fetchUsr = "";
var fetchBrn = "";
 /*9NT1606_12_4_RETRO_12_3_26780556 Ends*/
function fnPostLoadFetch() {
	
        document.getElementById("BTN_SINGLE_VIEW_"+dataSrcLocationArray[1]).style.visibility='hidden';
        debugs("In fnPostLoad", "A");
         /*9NT1606_12_4_RETRO_12_3_26780556 Starts*/
        fetchUsr = document.getElementById("BLK_USER__USRID").value;
        fetchBrn = document.getElementById("BLK_USER__BRNCODE").value;
         /*9NT1606_12_4_RETRO_12_3_26780556 Ends*/
        //Fix for 28405100 Commented
        /*if(fetchBrn == "" && fetchUsr == "" ){
            return false;
        }*/
        createDOM(dbStrRootTableName);        
        gAction = "EXECUTEQUERY";
        var serverURL = "ExtCLRUServlet";
        fcjRequestDOM = buildUBSXml();

        var objHTTP = createHTTPActiveXObject();
		try{ //9NT1606_12_2_RETRO_12_0_3_21182929 changes 
        objHTTP.open("POST", serverURL+"?debugFlag="+mainWin.DebugWindowFlg, false);
        objHTTP.setRequestHeader("Content-Type", "application/xml");
        objHTTP.setRequestHeader("charset", "utf-8");
        objHTTP.setRequestHeader("FETCHLIST", "Y");
        objHTTP.setRequestHeader("FETCHUSR", fetchUsr);
        objHTTP.setRequestHeader("FETCHBRN", fetchBrn);
        objHTTP.setRequestHeader("SEQNO", seqNo);
        objHTTP.setRequestHeader("X-CSRFTOKEN", mainWin.CSRFtoken);
        objHTTP.send(fcjRequestDOM);
		} //9NT1606_12_2_RETRO_12_0_3_21182929 starts
         catch(exp){
          mainWin.handleNetWorkErr(exp);
        }  //9NT1606_12_2_RETRO_12_0_3_21182929 ends 
        if (objHTTP.status == 200){
            mainWin.inactiveTime = 0;
            if (selectSingleNode(objHTTP.responseXML, "//SESSION") != null && getNodeText(selectSingleNode(objHTTP.responseXML, "//SESSION")) == "EXPIRED") {//session expiry change  start
                mainWin.mask(); 
                mainWin.sessionTimeOut = true;
                mainWin.showAlerts(fnBuildAlertXML("", "I", mainWin.getItemDesc("LBL_SESSION_EXPIRED")), "S");
                return false;
            }//session expiry change  end
            updateUserList(objHTTP);
            gAction = "";
            return true;
        }
}
/* Fix for 16883299 -Adding User and Branch field in CLRU  Ends*/

function fnClearUser(){
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    var serverURL = "ExtCLRUServlet";
    var users = "";
//REDWOOD_CHANGES
    var l_tblObj = getTableObjForBlock("BLK_USER_LIST").tBodies[0];
    for(var j=0;j<getOjTableRowsLength("BLK_USER_LIST");j++){
        if(l_tblObj.rows[j].cells[0].children[0].children[0].children[0].checked){
           // users += getNextSibling(l_tblObj.rows[j].cells[2].children[0].children[0]).value+"~";
            users += l_tblObj.rows[j].cells[2].children[0].children[0].value+"~";
//REDWOOD_CHANGES
        }
    }
    if(users!="") {
        fcjRequestDOM = buildUBSXml();
        var objHTTP = createHTTPActiveXObject();
		 try{ //9NT1606_12_2_RETRO_12_0_3_21182929 changes 
        objHTTP.open("POST", serverURL+"?debugFlag="+mainWin.DebugWindowFlg, false);
        objHTTP.setRequestHeader("Content-Type", "application/xml");
        objHTTP.setRequestHeader("charset", "utf-8");
        objHTTP.setRequestHeader("CLEARUSERS", users);
        objHTTP.setRequestHeader("SEQNO", seqNo);
        objHTTP.setRequestHeader("X-CSRFTOKEN", mainWin.CSRFtoken);
        objHTTP.send(fcjRequestDOM);
		} //9NT1606_12_2_RETRO_12_0_3_21182929 changes start
         catch(exp){
          mainWin.handleNetWorkErr(exp);
        } //9NT1606_12_2_RETRO_12_0_3_21182929 changes end
        if (objHTTP.status == 200){
            mainWin.inactiveTime = 0;
            if (selectSingleNode(objHTTP.responseXML, "//SESSION") != null && getNodeText(selectSingleNode(objHTTP.responseXML, "//SESSION")) == "EXPIRED") {//session expiry change  start
                mainWin.mask(); 
                mainWin.sessionTimeOut = true;
                mainWin.showAlerts(fnBuildAlertXML("", "I", mainWin.getItemDesc("LBL_SESSION_EXPIRED")), "S");
                return false;
            }//session expiry change  end
            updateUserList(objHTTP);
            alert(clearLbl);
        }
        fnPostLoadFetch();  //9NT1606_12_4_RETRO_12_3_26780556	
    }
}
function updateUserList(objHTTP) {
  if (objHTTP.status == 200){
    var csrfNode = selectSingleNode(objHTTP.responseXML,"//CSRF");
  if(csrfNode != null && getNodeText(csrfNode) == "SM-00420"){
    alert(getNodeText(csrfNode)+mainWin.getItemDesc("LBL_REQUEST_TAMPERED"));
  } else {
        fcjRequestDOM = buildUBSXml();
        fcjResponseDOM = loadXMLDoc(getXMLString(objHTTP.responseXML));
        var tempRes = fcjResponseDOM;
    
        if(fcjResponseDOM){
          fcjResponseDOM = loadXMLDoc(getXMLString(fcjRequestDOM));
          var xml = getXMLString(fcjResponseDOM).toString();
          xml = xml.replace("<FCUBS_REQ_ENV","<FCUBS_RES_ENV").replace("</FCUBS_REQ_ENV","</FCUBS_RES_ENV");
          fcjResponseDOM = loadXMLDoc(xml);
    
          var bodyNode = selectSingleNode(fcjResponseDOM,"//FCUBS_BODY");
          var msg = fcjResponseDOM.createTextNode("SUCCESS");
          var msgNode = selectSingleNode(fcjResponseDOM,"//MSGSTAT");
          msgNode.appendChild(msg);
          
          var emptyRecNode = selectNodes(fcjResponseDOM,"//FCUBS_BODY/REC");
          
          if(emptyRecNode.length>0){
            for(var k=0;k<emptyRecNode.length;k++){
              bodyNode.removeChild(emptyRecNode[k]);
            }
          }
    
          var recNodeList = selectNodes(tempRes,"//REC");
          var tblUsrNodeList  = selectNodes(tempRes,"//USERS_FRM_TBL");
          
          var tblUsrNodeArr = getNodeText(tblUsrNodeList[0]).split("~");
          if(tblUsrNodeArr.length == 1 && tblUsrNodeArr[0] == "null"){
            alertAction = "UNMASK";
            mask();
            showAlerts(fnBuildAlertXML('SM-CLR001','E'), 'E');
            return ;
          }
          var recNodeArr = new Array();
        
          for(var k=0;k<recNodeList.length;k++){
            recNodeArr[k] = getNodeText(recNodeList[k]).split("~")[0];
          }
        
          var userFlag=true; var userCount=0;
          var userNotInSession = new Array();
          for(var t=0;t<tblUsrNodeArr.length;t++){
            for(var u=0;u<recNodeArr.length;u++){
              if(tblUsrNodeArr[t].split("!")[0]==recNodeArr[u]){
                userFlag=true;
                break;
              }
              userFlag=false;
            }
            if(userFlag==false){
              userNotInSession[userCount]=tblUsrNodeArr[t];
              userCount++;
              userFlag=true;
            }
          }
    
          if(recNodeList && fcjRequestDOM){
            if(!selectSingleNode(fcjResponseDOM,"//REC")){                            
              var ParentRecNode = fcjResponseDOM.createElement("REC");
              ParentRecNode.setAttribute("ID",j+1);
              ParentRecNode.setAttribute("TYPE",dataSrcLocationArray[0]);
              var mDataNode = fcjResponseDOM.createCDATASection(mainWin.UserId);
              var fvNode = fcjResponseDOM.createElement("FV");
              fvNode.appendChild(mDataNode);
              ParentRecNode.appendChild(fvNode);
              bodyNode.appendChild(ParentRecNode);
            }                            
            for(var j=0;j<userNotInSession.length;j++){
              if(userNotInSession[j].split("!")[1]){
                var fvNode = fcjResponseDOM.createElement("FV");
                var cDataNode = fcjResponseDOM.createCDATASection(userNotInSession[j].split("!")[2] +"~"+userNotInSession[j].split("!")[0] +"~"+ userNotInSession[j].split("!")[1]);
                var recNode = fcjResponseDOM.createElement("REC");
                recNode.setAttribute("ID",j+1);
                recNode.setAttribute("TYPE",dataSrcLocationArray[1]);
                fvNode.appendChild(cDataNode);
                recNode.appendChild(fvNode);
                ParentRecNode.appendChild(recNode);                                   
              }
            }
          }
          if (!fnProcessResponse()) {
            gAction = "";
            return false;
          }
          /*9NT1606_12_4_RETRO_12_3_26780556 Starts*/
          document.getElementById("BLK_USER__USRID").value = fetchUsr;
		  document.getElementById("BLK_USER__BRNCODE").value = fetchBrn;
          /*9NT1606_12_4_RETRO_12_3_26780556 ends*/
      }
    }
    //HTML5 Changes  // Code is moved from fnLoadCLRU to updateUserList.
    /* Fix for 16496337*/
    try{   
//REDWOOD_CHANGES
           // var l_tblObj = document.getElementById("BLK_USER_LIST");
            var l_tblObj = getTableObjForBlock("BLK_USER_LIST");
            //for(var j=0;j<l_tblObj.tBodies[0].rows.length;j++){
            for(var j=0;j<getOjTableRowsLength("BLK_USER_LIST");j++){
              if(l_tblObj.tBodies[0].rows[j].cells[0].children[0].children[0].children[0].checked){   			
                    l_tblObj.tBodies[0].rows[j].cells[0].children[0].children[0].children[0].checked = false;
              }
            }
    }catch(e){
        console.log(e);
              }
            }
}
//REDWOOD_CHANGES