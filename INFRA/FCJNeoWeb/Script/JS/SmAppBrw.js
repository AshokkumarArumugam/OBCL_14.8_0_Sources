/*----------------------------------------------------------------------------------------------------
**
** File Name    : SmAppBrw.js
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

Copyright © 2004-2016   by Oracle Financial Services Software Limited..
---------------------------------------------------------------------------------------------------------
**	Modified By   : Hitesh Verma
** 	Modified on   : 07/09/2016
** 	Description   : HTML5 Changes
** 	Search String : HTML5 Changes

  Modified By           : Rishabh Gupta
  Modified On           : 26-Sept-2016
  Modified Reason       : Changes done to update the session time in HH24:MI60:SS60 format 
  Search String         : 12_0_3_RETRO_12_2_23652566
  SFR No.               : 23652566
  
**  Modified By          : Neethu Sreedharan
**  Modified On          : 30-Sep-2016
**  Modified Reason      : Code modified to display alert message only when a customer account is 
                           queried upon and the user attempts to change to other tabs from Customer tab. 
                           When no query criteria is searched upon and when user attempts to change tab, 
                           alert message is not shown.
**  Retro Source         : 9NT1606_12_0_3_HEARTLAND_BANK_LIMITED
**  Search String        : 9NT1606_12_2_RETRO_12_0_3_23655640

**  Modified By           : Neethu Sreedharan
**  Modified On           : 06-Oct-2016
**  Modified Reason       : The status code for the XMLHttpRequestObject check is done for status 
                            codes other than 200 
**  Retro Source          : 9NT1606_12_0_3_COMMONWEALTH_BANK_OF_AUSTRALIA
**  Search String         : 9NT1606_12_2_RETRO_12_0_3_23656268

**  Modified By          : Neethu Sreedharan
**  Modified On          : 07-Oct-2016
**  Modified Reason      : The error seems to be due to network issue. Fix is provide to show the error 
                           to user as alert and on click of Ok button on alert window, screen will be 
                           unmasked and user can try the action again.
**  Retro Source         : 9NT1606_12_0_3_INTERNAL
**  Search String        : 9NT1606_12_2_RETRO_12_0_3_21182929
**
**  Modified By        : Nalandhan G
**  Modified On        : 19-Nov-2016
**  Modified Reason    : Filter Column for ACQUIREDBY
**  Retro  String      : 22886104
**  Search String      : 9NT1606_12_2_RETRO_12_0_3_23658452
**   
**  Modified By          : Rishabh Gupta
**  Modified On          : 26-Dec-2016
**  Modified Reason      : Retro for 16491903
**  Search String        : CPU_JAN17_D_25214120  

**  Modified By          : Ananth Raj B
**  Modified On          : 04-Apr-2017
**  Modified Reason      : Stage status screen is not loading to view the BPM flow diagram.
**  Search String        : 25750614

**  Modified By          : Vignesh MG
**  Modified On          : 23-Jan-2020
**  Change Description   : INFRA CHANGES FOR OBTR 14.4 ENHANCEMENTS
**  Search String        : 30620131  

**
** Modified  By         : Manjunath N
** Modified  On         : 02-Nov-2021
** Modified Reason      : user is fetching the customer info using the search criteria of STDCULND screen, post which the user visits the loans tab
	                      and verifies the loan data. 
						  The user comes back to the landing page screen and clicks on collaterals tab, on doing this the system just launches the external collateral summary
						  screen without assigning any search criteria as the mainWin.gCustInfo["LiabNo"] is null post visiting the loans screen.
						  Code changes made, not to reset the liabno.
** Search String        : Bug#33442569 

**  Modified By          : Nagendra Satrasala
**  Modified On          : 05-Apr-2022
**  Change Description   : Branch Deprecation changes
**  Search String        : FCUBS_Branch_Deprecation 
**
**  Modified By         : Shayam Sundar Ragunathan
**  Modified On         : 02-Sep-2022
**  Modified Reason     : Added Changes to restrict dashboard function ids from fast path
**  Search String       : 9NT1606_14_5_PROTEGO_TRUST_34569395
----------------------------------------------------------------------------------------------------
*/

//var closefolder     = new Image();
//var openfolder      = new Image();
var resetAlert      = "";			//12.1 Retro_Changes
var list            = new Image();
var list2           = new Image();//FC 11.4 NLS Changes
var PrveClassElem   = "";
var imgPath         = theme_imagesPath; 
var curTab = "EXPLORE";

//closefolder         = theme_imagesPath + "/Icons/taskclosed.gif";
//openfolder          = theme_imagesPath + "/Icons/taskopen.gif";
list                = theme_imagesPath + "/Icons/list.gif";
list2               = theme_imagesPath + "/Icons/list2.gif"; //FC 11.4 NLS Changes
var calendarImg     = theme_imagesPath + "/Icons/calendar.gif";
var loadImg         = theme_imagesPath + "/Icons/loader.gif";
var spaceImg        = theme_imagesPath + "/Icons/spacer.gif";
var applicationName = parent.applicationName;
var bpelEnabled     = parent.bpelEnabled;
var bpelTaskList    = false;
var taskSearchFieldName = "";
var fetchSize = 4; //REDWOOD_CHANGES
var pos = 0;
var curPage = 1;
var dashboardParams = new Object();
var dashboardFuncsHome='';
var currentTab = 'DBoardHome';
var custImageDiv = "custImageContentDiv";
var prevPos = -1;

var workflowTableHtml = "";
var chkflag = true;
//12.0.2 SOATEAM Changes Starts
var tabTableContent = new Array();
var winIdContent = new Array();	
var isRefresh = false;	
var isApplytoAll = false;
//12.0.2 SOATEAM Changes Ends
var custDBoardArray = new Array();
//12.0.2 changed the order of Dashboards
custDBoardArray[0] = 'SMDCSDDB';
custDBoardArray[1] = 'CUSTIMAGE';
custDBoardArray[2] = 'SMDACDDB';
custDBoardArray[3] = 'SMSINSDB';
custDBoardArray[4] = 'SMSTRNDB';

//12.0.2 changes starts
var count =0;
var isDetailedTabDisplayed = true;
var sessionTime =setInterval(function(){fnUpdateSessionTime(1000)},1000);


var descSearchResult = new Array();
var funcIdSearchResult=new Array();
var rightsSearchResult=new Array();
//apr25
var breadCrumbsMenuSearch =  new Array();
var nguiURL =  new Array();
var nguiPrd =  new Array();
var tmpPageNo;
var  pages;
var pageNo = 0;
var interval = 10;
var start = 0;
var usrDetails = "";
var gAccArr = new Array();
var alertFlag = true;

function fnUpdateSessionTime(seconds) {
    var currentTime = new Date().getTime();  //REDWOOD_CHANGES
    var diffInTime =currentTime - gLoginTime; //REDWOOD_CHANGES
    seconds =  parseInt((diffInTime/1000)); 
    var hours =parseInt (seconds/3600 ) % 24;  //REDWOOD_CHANGES
    var minutes =  parseInt(seconds /60) %60; //if(minutes >= 60) minutes-=60;  //12_0_3_RETRO_12_2_23652566 //REDWOOD_CHANGES
    seconds = seconds % 60; 
    var hhMMSS = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds  < 10 ? "0" + seconds : seconds);  //REDWOOD_CHANGES
    document.getElementById('sesTime').innerHTML = hhMMSS;
     }
//12.0.2 changes ends

function ShowMenu(xmlFile, scrnName, xslName) {

    var xmlDOM = loadXMLDoc(xmlFile);
    var leafNodes = selectNodes(xmlDOM, "//*/LEAF[contains(@TYPSTR,'MSP')]");
    if (leafNodes && leafNodes.length>0) {
        for (var index = 0; index < leafNodes.length; index++) {
            leafNodes[index].parentNode.removeChild(leafNodes[index]);
        }
    }    
    var xslDOM = loadXSLFile(xslName);
    var params = new Array();
    params["screen"] =  scrnName;
    params["imgPath"] = imgPath;
    var html = transform(xmlDOM, xslDOM, params);
    return html;
}

function fnHideProcessWait() {
    if (parent.frames['FrameMenu'])
    {
        var t = setTimeout(" parent.frames['FrameMenu'].fnHideProcess();", 25);
    } else
    {
        setTimeout("fnHideProcessWait", 25);
    }
}



function fnonMouseOverAppBrw(currElem){
    PrveClassElem = currElem.className;
    currElem.className = 'Vtabover'; 
}


function fnonMouseOutAppBrw(currElem){ 
    if(currElem.className!='Vtabsel')
        currElem.className =  PrveClassElem;
}

function fnCustomer()
{
    fnToggleDisplay('CustomerSearch');
    if(document.getElementById("ContentCustomerSearch")== null){
    document.getElementById("hTabCN_Customer").innerHTML = getCustomerHtml();
    calContainersize(document.getElementById('ContentCustomerSearch'));
     }

    unmask();
}


/*
//12.0.2 changes for customer tab , HTML modified  starts
function getCustomerHtml()
{
    var labelCustName = getItemDesc("LBL_CUST_NAME");
    var labelCifId = getItemDesc("LBL_CIFID");
    var labelIdentifierVal = getItemDesc("LBL_IDENTIFIER_VAL");
    // FCUBS 11.4.0 - Search based on account no - Changes start (Bibilu)
    var labelAcBranch = getItemDesc("LBL_BRANCH");
    var labelCustAcNo = getItemDesc("LBL_ACC_NUMBER");
    // FCUBS 11.4.0 - Search based on account no - Changes end (Bibilu)
    var labelSearch = getItemDesc("LBL_SEARCH");
    var labelCustSearch = getItemDesc("LBL_CUST_SEARCH");
    var labelLinkedCustomers = getItemDesc("LBL_LINKED_CUSTOMERS");
    var labelJointCustomers =  getItemDesc("LBL_JOINT_CUSTOMERS");
    var labelListOfAcc = mainWin.getItemDesc("LBL_LIST_OF_ACC");
    var customerHtml = "";
    customerHtml = customerHtml + "<div id=\'CUSTSEARCHBAR\' class=\'DIVCustSearchBar\'>";
    customerHtml = customerHtml + "<div id=\'CUSTSEARCH\' class=\'DIVCustSearch\' onkeydown=\'return fnHTLBarKeyEvents(event);\' onmousedown=\'return fnHTLBarKeyEvents(event);\'>";
    customerHtml = customerHtml + "<table ><tr >";
    customerHtml = customerHtml + "<td align=\'left\'>";
    customerHtml = customerHtml + "<div class=\'DIVText\'>";
    customerHtml = customerHtml + "<label class=\'LBLstd\' for=\'CustName\'>" + labelCustName + "</label>";
    customerHtml = customerHtml + "<input class=\'TXTstd\' NAME=\'CustName\' ID=\'CustName\' type='text' size='11' value =\'%\' onkeydown=\'return fnCSrchKeyEvents(event)\'>";
    customerHtml = customerHtml + "</div></td>";
    customerHtml = customerHtml + "<td align=\'left\' colspan=\'2\'>";
    customerHtml = customerHtml + "<div class=\'DIVText\'>";
      customerHtml = customerHtml + "<label for=\'CustAccountNo\' class=\'LBLstd\'>" + labelCustAcNo + "</label>";
    customerHtml = customerHtml + "<input name=\'CustAccountNo\' ID=\'CustAccountNo\' type=\'text\' value =\'%\' size=\'11\' class=\'TXTstd\' onkeydown=\'return fnCSrchKeyEvents(event)\'>";
    customerHtml = customerHtml + "<button tabindex='-1' class='BTNimg' onclick='disp_lov(\"COMMON\", \"CUSTSEARCH\", \"CustAccountNo\", \"Account Number\", \"LOV_ACCOUNT_CUSTOMER\", \"\", \"\", \"\", \"\", event)'";
    customerHtml = customerHtml + 'onblur=\"this.className=\'BTNimg\'\" onmouseover=\"this.className=\'BTNimgH\'\" onfocus=\"this.className=\'BTNimgH\'\" ';
    customerHtml = customerHtml + 'onmouseout=\"this.className=\'BTNimg\'\">';
    customerHtml = customerHtml + '<span tabindex=\"-1\" class=\"ICOlov\"></span>';
    customerHtml = customerHtml + '<span class="LBLinv">List Of Values</span>';
    customerHtml = customerHtml + '</button> ';
    customerHtml = customerHtml + "</div></td>";
    customerHtml = customerHtml + "</tr>";
    customerHtml = customerHtml + "<tr >";
    customerHtml = customerHtml + "<td align=\'left\'>";
    customerHtml = customerHtml + "<div class=\'DIVText\'>";
    customerHtml = customerHtml + "<label for=\'CFid\' class=\'LBLstd\'>" + labelCifId + "</label>";
    customerHtml = customerHtml + "<input name=\'CFid\' ID=\'CFid\' type=\'text\' size=\'11\' class=\'TXTstd\' value =\'%\' onkeydown=\'return fnCSrchKeyEvents(event)\'>";
   customerHtml = customerHtml + "<button tabindex='-1' class='BTNimg' onclick='disp_lov(\"COMMON\", \"CUSTSEARCH\", \"CIF_ID\", \"Customer Number\", \"LOV_CIFID_CUSTOMER\", \"\", \"\", \"\", \"\", event)'";
   customerHtml = customerHtml + 'onblur=\"this.className=\'BTNimg\'\" onmouseover=\"this.className=\'BTNimgH\'\" onfocus=\"this.className=\'BTNimgH\'\" ';
    customerHtml = customerHtml + 'onmouseout=\"this.className=\'BTNimg\'\">';
   customerHtml = customerHtml + '<span tabindex="-1" class="ICOlov"></span>';
   customerHtml = customerHtml + '<span class="LBLinv">List Of Values</span>';
    customerHtml = customerHtml + "</button></div></td>";
    customerHtml = customerHtml + "<td align=\'left\'>";
    customerHtml = customerHtml + "<div class=\'DIVText\'>";
    customerHtml = customerHtml + "<label for=\'CustIdentifier\' class=\'LBLstd\'>" + labelIdentifierVal + "</label>";
    customerHtml = customerHtml + "<input name=\'CustIdentifier\' ID=\'CustIdentifier\' type=\'text\' value =\'%\' size=\'11\' class=\'TXTstd\' onkeydown=\'return fnCSrchKeyEvents(event)\'>";
    customerHtml = customerHtml + "</td></div>";
   customerHtml = customerHtml + "<tr ><td>";
    customerHtml = customerHtml + "<div class=\'DIVText\'>";
      customerHtml = customerHtml + "<label for=\'AccountBranch\' class=\'LBLstd\'>" + labelAcBranch + "</label>";
    customerHtml = customerHtml + "<input name=\'CustBrn\' ID=\'CustBrn\' type=\'text\' value =\'"+mainWin.CurrentBranch+"\' size=\'11\' class=\'TXTstd\' onkeydown=\'return fnCSrchKeyEvents(event)\'>";
    customerHtml = customerHtml + "<button tabindex='-1' class='BTNimg' onclick='disp_lov(\"COMMON\", \"CUSTSEARCH\", \"BRANCH\", \"Branch\", \"LOV_BRANCH_CUSTOMER\", \"\", \"\", \"\", \"\", event)'";
    customerHtml = customerHtml + 'onblur=\"this.className=\'BTNimg\'\" onmouseover=\"this.className=\'BTNimgH\'\" onfocus=\"this.className=\'BTNimgH\'\" ';
    customerHtml = customerHtml + 'onmouseout=\"this.className=\'BTNimg\'\">';
    customerHtml = customerHtml + '<span tabindex="-1" class="ICOlov"></span>';
    customerHtml = customerHtml + '<span class="LBLinv">List Of Values</span>';
    customerHtml = customerHtml + '</button> ';
    customerHtml = customerHtml + "</div></td>";
    customerHtml = customerHtml + "<td align=\'left\'><div class=\'DIVText\'>";
    customerHtml = customerHtml + "<div><input name=\'LinkedCustomers\' ID=\'LinkedCustomers\' type=\'checkbox\' size=\'11\' class=\'TXTstd\' onkeydown=\'return fnCSrchKeyEvents(event)\'>";
   customerHtml = customerHtml + "<label for=\'LinkedCustomers\' class=\'LBLstd\'>" + labelLinkedCustomers + "</label>";
   customerHtml = customerHtml + "</div><div><input name=\'JointCustomers\' ID=\'JointCustomers\' type=\'checkbox\' size=\'11\' class=\'TXTstd\'>";
    customerHtml = customerHtml + "<label for=\'JointCustomers\' class=\'LBLstd\'>" + labelJointCustomers + "</label></div>";
    customerHtml = customerHtml + "</div></td></tr>";
  customerHtml += "<tr><td  colspan=\"2\" align=\'left\'><div id=\"custSearchButtonDiv\">";
   customerHtml = customerHtml+ "<button onClick=\'fnCustomerQuery(\"true\",\"false\")\' href=\'#\' class='BTNtext' >" + mainWin.getItemDesc("LBL_SEARCH") + "</button>&nbsp;&nbsp;";
    customerHtml = customerHtml+  "<button onClick=\'fnCustReset()\' href=\'#\' class='BTNtext' >" + mainWin.getItemDesc("LBL_RESET") + "</button>&nbsp;&nbsp;";  
    customerHtml = customerHtml + "</div></td>";
    customerHtml = customerHtml + "</tr>";
    customerHtml = customerHtml + "</table></div>";
    customerHtml += "</div>";
    customerHtml +="<div id=\'searchResultDiv\' style=\'display:none; width:50%;\'>"
    customerHtml += "<div id=\'CUSTDETAILS\' ></div>";
    customerHtml += "<div id=\'ListofAccDiv\' ></div>";
    customerHtml +="</div>";
    return customerHtml;
}

*/

function fnGenerateCustSeq() {
   // if(typeof(custSeqNo) == "undefined" || custSeqNo == '') {
         var serverURL = "BranchServlet";
         var objHTTP = createHTTPActiveXObject();
         var actionType = "CustSeqGeneration";
         var funcid = "QRYC";
         var msgType = "NONWORKFLOW";
         var xref = 'BRDUMMYCUSTQUERY';
         objHTTP.open("POST", serverURL + "?actionType=" + actionType+"&funcid="+funcid+"&msgType="+msgType+ "&XREF=" + xref,false  ); 
         objHTTP.setRequestHeader("Content-Type", "application/xml");
         /* Added encoding charset for NLS Support & sending search data thru request body*/
         objHTTP.setRequestHeader("charset", "utf-8");
         objHTTP.setRequestHeader("X-CSRFTOKEN", mainWin.CSRFtoken);
        
         objHTTP.send(" ");
         if (objHTTP.status == 200) {
            if (selectSingleNode(objHTTP.responseXML, "//SQNO") != null ) { //session expiry change  start
            tempSeqNo = getNodeText(selectSingleNode(objHTTP.responseXML, "//SQNO")) ;
            }
        }
   // }else {
   //     seqNo = custSeqNo;
  //  }
}
function getCustomerHtml()
{
   // fnGenerateCustSeq();
    var labelCustomer = getItemDesc("LBL_CUSTOMER");
    var labelCustName = getItemDesc("LBL_CUST_NAME");
    var labelCifId = getItemDesc("LBL_CIFID");
    var labelIdentifierVal = getItemDesc("LBL_IDENTIFIER_VAL");
	// FCUBS 11.4.0 - Search based on account no - Changes start (Bibilu)
	var labelAcBranch = getItemDesc("LBL_BRANCH");
	var labelCustAcNo = getItemDesc("LBL_ACC_NUMBER");
	// FCUBS 11.4.0 - Search based on account no - Changes end (Bibilu)
    var labelSearch = getItemDesc("LBL_SEARCH");
    var labelCustSearch = getItemDesc("LBL_CUST_SEARCH");
    var labelLinkedCustomers = getItemDesc("LBL_LINKED_CUSTOMERS");
    // fix for bug: 19060316 starts
    var labelPID = "";
    var labelKanji = "";
    var labelKatakana = "";
    var labelHiragana = "";
    var labelMultiCurrAccNo = "";
    if(mainWin.applicationExt == "JP") {
        labelPID = getItemDesc("LBL_PID");
        labelKanji = getItemDesc("LBL_KANJI_NAME");
        labelKatakana = getItemDesc("LBL_KATAKANA_NAME");
        labelHiragana = getItemDesc("LBL_HIRAGANA_NAME");
        labelMultiCurrAccNo = getItemDesc("LBL_MULTI_CCY_AC_NO");
    }
    //fix for bug: 19060316 ends

    var customerHtml = "";
    //customerHtml = customerHtml + "<a name=\'href"+labelCustomer+"\'></a>";
    customerHtml = customerHtml + "<div id=\"ContentCustomerSearch\" class=\"ContentTabSearch\"><div class=\"DIVThreeColSectionContainer DIVSmallRowContainer\"  onkeydown=\'return fnHTLBarKeyEvents(event);\' onmousedown=\'return fnHTLBarKeyEvents(event);\'><div class=\"DIVColumnOne\" > <fieldset class=\'FSTcell\'>";
   
    customerHtml = customerHtml + "<legend class=\'invisible\'>" + labelCustSearch + "</legend>";
   // customerHtml = customerHtml + "<div>";
    customerHtml = customerHtml + "<div class=\'DIVText\'>";
    customerHtml = customerHtml + "<label class=\'LBLstd\' for=\'CustName\'>" + labelCustName + "</label>";
    customerHtml = customerHtml + "<input class=\'TXTstd\' NAME=\'CustName\' ID=\'CustName\' type='text' size='11' value =\'%\' onkeydown=\'return fnCSrchKeyEvents(event)\'>";
    customerHtml = customerHtml + "</div>";
    //fix for bug: 19060316 starts
    if(mainWin.applicationExt == "JP") {
        customerHtml = customerHtml + "<div class=\'DIVText\'>"; 
        customerHtml = customerHtml + "<label class=\'LBLstd\' for=\'KanjiCustName\'>" + labelKanji + "</label>";
        customerHtml = customerHtml + "<input class=\'TXTstd\' NAME=\'KanjiCustName\' ID=\'KanjiCustName\' type='text' size='11' value =\'%\' onkeydown=\'\'>";
        customerHtml = customerHtml + "</div>";
    }//fix for bug: 19060316 ends
    customerHtml = customerHtml + "<div class=\'DIVText\'>";
    customerHtml = customerHtml + "<label for=\'CFid\' class=\'LBLstd\'>" + labelCifId + "</label>";
    customerHtml = customerHtml + "<input name=\'CFid\' ID=\'CFid\' type=\'text\' size=\'11\' class=\'TXTstd\' value =\'%\' onkeydown=\'return fnCSrchKeyEvents(event)\'>";
    if('ONLINE' == brnHostLinkStatus)customerHtml = customerHtml + "<button tabindex='-1' class='BTNimg' onclick='disp_lov(\"COMMON\", \"CUSTSEARCH\", \"CIF_ID\", \"Customer Number\", \"LOV_CIFID_CUSTOMER\", \"\", \"\", \"\", \"\", event)'";
    else customerHtml = customerHtml + "<button tabindex='-1' class='BTNimg' onclick='disp_lov(\"COMMON\", \"CUSTSEARCH\", \"CIF_ID\", \"Customer Number\", \"LOV_CIFID_CUSTOMER_OFFLINE\", \"\", \"\", \"\", \"\", event)'";
    customerHtml = customerHtml + 'onblur=\"this.className=\'BTNimg\'\" onmouseover=\"this.className=\'BTNimgH\'\" onfocus=\"this.className=\'BTNimgH\'\" ';
    customerHtml = customerHtml + 'onmouseout=\"this.className=\'BTNimg\'\">';
    customerHtml = customerHtml + '<span tabindex="-1" class="ICOlov"></span>';
    customerHtml = customerHtml + '<span class="LBLinv">List Of Values</span>';
    customerHtml = customerHtml + '</button> ';
    customerHtml = customerHtml + "</div>";
    //customerHtml = customerHtml + "<div class=\'DIVText\'>";
   // customerHtml = customerHtml + "<label for=\'LinkedCustomers\' class=\'LBLstd\'>" + labelLinkedCustomers + "</label>";
    //customerHtml = customerHtml + "<input name=\'LinkedCustomers\' ID=\'LinkedCustomers\' type=\'checkbox\' size=\'11\' class=\'TXTstd\' onkeydown=\'return fnCSrchKeyEvents(event)\'>";
    //customerHtml = customerHtml + "</div>";
    ////fix for bug: 19060316 starts
     if(mainWin.applicationExt == "JP") {
        customerHtml = customerHtml + "<div class=\'DIVText\'>";
        customerHtml = customerHtml + "<label for=\'Pid\' class=\'LBLstd\'>" + labelPID + "</label>";
        customerHtml = customerHtml + "<input name=\'Pid\' ID=\'Pid\' type=\'text\' size=\'11\' class=\'TXTstd\' value =\'%\' onkeydown=\'return fnCSrchKeyEvents(event)\'>";
        if('ONLINE' == brnHostLinkStatus)customerHtml = customerHtml + "<button tabindex='-1' class='BTNimg' onclick='disp_lov(\"COMMON\", \"CUSTSEARCH\", \"PID\", \"PID No\", \"LOV_PID\", \"\", \"\", \"\", \"\", event)'";
        else customerHtml = customerHtml + "<button tabindex='-1' class='BTNimg' onclick='disp_lov(\"COMMON\", \"CUSTSEARCH\", \"PID\", \"PID No\", \"LOV_PID_OFFLINE\", \"\", \"\", \"\", \"\", event)'";
        customerHtml = customerHtml + 'onblur=\"this.className=\'BTNimg\'\" onmouseover=\"this.className=\'BTNimgH\'\" onfocus=\"this.className=\'BTNimgH\'\" ';
        customerHtml = customerHtml + 'onmouseout=\"this.className=\'BTNimg\'\">';
        customerHtml = customerHtml + '<span tabindex="-1" class="ICOlov"></span>';
        customerHtml = customerHtml + '<span class="LBLinv">List Of Values</span>';
        customerHtml = customerHtml + '</button> ';
        customerHtml = customerHtml + "</div>";
     }
    //fix for bug: 19060316 ends
   customerHtml = customerHtml +  "</fieldset></div>" ;
    customerHtml = customerHtml +"<div class=\"DIVColumnOne\" > <fieldset class=\'FSTcell\'>";
    customerHtml = customerHtml + "<div class=\'DIVText\'>";
    customerHtml = customerHtml + "<label for=\'CustIdentifier\' class=\'LBLstd\'>" + labelIdentifierVal + "</label>";
    customerHtml = customerHtml + "<input name=\'CustIdentifier\' ID=\'CustIdentifier\' type=\'text\' value =\'%\' size=\'29\' class=\'TXTstd\' onkeydown=\'return fnCSrchKeyEvents(event)\'>";//Fix for 18407538 --changed the size to 29
    customerHtml = customerHtml + "</div>";
    //fix for bug: 19060316 starts
    if(mainWin.applicationExt == "JP") {
        customerHtml = customerHtml + "<div class=\'DIVText\'>"; 
        customerHtml = customerHtml + "<label for=\'KatakanaCustName\' class=\'LBLstd\'>" + labelKatakana + "</label>";
        customerHtml = customerHtml + "<input name=\'KatakanaCustName\' ID=\'KatakanaCustName\' type=\'text\' value =\'%\' size=\'11\' class=\'TXTstd\' onkeydown=\'\'>";
        customerHtml = customerHtml + "</div>";
     }
     //fix for bug: 19060316 ends
	// FCUBS 11.4.0 - Search based on account no - Changes start (Bibilu)
    customerHtml = customerHtml + "<div class=\'DIVText\'>";
    customerHtml = customerHtml + "<label for=\'AccountBranch\' class=\'LBLstd\'>" + labelAcBranch + "</label>";
    customerHtml = customerHtml + "<input name=\'CustBrn\' ID=\'CustBrn\' type=\'text\' value =\'%\' size=\'11\' class=\'TXTstd\' onkeydown=\'return fnCSrchKeyEvents(event)\'>";
     if('ONLINE' == brnHostLinkStatus)customerHtml = customerHtml + "<button tabindex='-1' class='BTNimg' onclick='disp_lov(\"COMMON\", \"CUSTSEARCH\", \"BRANCH\", \"Branch\", \"LOV_BRANCH_CUSTOMER\", \"\", \"\", \"\", \"\", event)'";
    else customerHtml = customerHtml + "<button tabindex='-1' class='BTNimg' onclick='disp_lov(\"COMMON\", \"CUSTSEARCH\", \"BRANCH\", \"Branch\", \"LOV_BRANCH_CUSTOMER_OFFLINE\", \"\", \"\", \"\", \"\", event)'";
    customerHtml = customerHtml + 'onblur=\"this.className=\'BTNimg\'\" onmouseover=\"this.className=\'BTNimgH\'\" onfocus=\"this.className=\'BTNimgH\'\" ';
    customerHtml = customerHtml + 'onmouseout=\"this.className=\'BTNimg\'\">';
    customerHtml = customerHtml + '<span tabindex="-1" class="ICOlov"></span>';
    customerHtml = customerHtml + '<span class="LBLinv">List Of Values</span>';
    customerHtml = customerHtml + '</button> ';
    customerHtml = customerHtml + "</div>";
   /* customerHtml = customerHtml + "<div class=\'DIVText\'>";
    customerHtml = customerHtml + "<label for=\'CustAccountNo\' class=\'LBLstd\'>" + labelCustAcNo + "</label>";
    customerHtml = customerHtml + "<input name=\'CustAccountNo\' ID=\'CustAccountNo\' type=\'text\' value =\'%\' size=\'11\' class=\'TXTstd\' onkeydown=\'return fnCSrchKeyEvents(event)\'>";
    customerHtml = customerHtml + "<button tabindex='-1' class='BTNimg' onclick='disp_lov(\"COMMON\", \"CUSTSEARCH\", \"CustAccountNo\", \"Account Number\", \"LOV_ACCOUNT_CUSTOMER\", \"\", \"\", \"\", \"\", event)'";
    customerHtml = customerHtml + 'onblur=\"this.className=\'BTNimg\'\" onmouseover=\"this.className=\'BTNimgH\'\" onfocus=\"this.className=\'BTNimgH\'\" ';
    customerHtml = customerHtml + 'onmouseout=\"this.className=\'BTNimg\'\">';
    customerHtml = customerHtml + '<span tabindex="-1" class="ICOlov"></span>';
    customerHtml = customerHtml + '<span class="LBLinv">List Of Values</span>';
    customerHtml = customerHtml + '</button> ';
    customerHtml = customerHtml + "</div>*/
    customerHtml = customerHtml + "</fieldset></div><div class=\"DIVColumnOne\" ><fieldset  class=\'FSTcell\'>";
    customerHtml = customerHtml + "<div class=\'DIVText\'>";
    //fix for bug: 19060316 starts
      if(mainWin.applicationExt == "JP") {
        customerHtml = customerHtml + "<label for=\'MultiCurrAccNo\' class=\'LBLstd\'>"+ labelMultiCurrAccNo + "</label>";
        customerHtml = customerHtml + "<input name=\'MultiCurrAccNo\' ID=\'MultiCurrAccNo\' type=\'text\' value=\'%\' size=\'11\' class=\'TXTstd\' onkeydown=\'return fnCSrchKeyEvents(event)\'>";
            customerHtml = customerHtml + "<button tabindex='-1' class='BTNimg' onclick='disp_lov(\"COMMON\", \"CUSTSEARCH\", \"MultiCurrAccNo\", \"Multicurrency Account Number\", \"LOV_MULTI_CCY_AC_NO\", \"\", \"\", \"\", \"\", event)'";
        customerHtml = customerHtml + 'onblur=\"this.className=\'BTNimg\'\" onmouseover=\"this.className=\'BTNimgH\'\" onfocus=\"this.className=\'BTNimgH\'\" ';
        customerHtml = customerHtml + 'onmouseout=\"this.className=\'BTNimg\'\">';
        customerHtml = customerHtml + '<span tabindex="-1" class="ICOlov"></span>';
        customerHtml = customerHtml + '<span class="LBLinv">List Of Values</span>';
        customerHtml = customerHtml + '</button> ';
        customerHtml = customerHtml + "</div>"
           
        customerHtml = customerHtml + "<div class=\'DIVText\'>";
      }
    // fix for bug: 19060316 ends 
    customerHtml = customerHtml + "<label for=\'CustAccountNo\' class=\'LBLstd\'>" + labelCustAcNo + "</label>";
    customerHtml = customerHtml + "<input name=\'CustAccountNo\' ID=\'CustAccountNo\' type=\'text\' value =\'%\' size=\'11\' class=\'TXTstd\' onkeydown=\'return fnCSrchKeyEvents(event)\'>";
     if('ONLINE' == brnHostLinkStatus)customerHtml = customerHtml + "<button tabindex='-1' class='BTNimg' onclick='disp_lov(\"COMMON\", \"CUSTSEARCH\", \"CustAccountNo\", \"Account Number\", \"LOV_ACCOUNT_CUSTOMER\", \"\", \"\", \"\", \"\", event)'";
    else customerHtml = customerHtml + "<button tabindex='-1' class='BTNimg' onclick='disp_lov(\"COMMON\", \"CUSTSEARCH\", \"CustAccountNo\", \"Account Number\", \"LOV_ACCOUNT_CUSTOMER_OFFLINE\", \"\", \"\", \"\", \"\", event)'";
    customerHtml = customerHtml + 'onblur=\"this.className=\'BTNimg\'\" onmouseover=\"this.className=\'BTNimgH\'\" onfocus=\"this.className=\'BTNimgH\'\" ';
    customerHtml = customerHtml + 'onmouseout=\"this.className=\'BTNimg\'\">';
    customerHtml = customerHtml + '<span tabindex="-1" class="ICOlov"></span>';
    customerHtml = customerHtml + '<span class="LBLinv">List Of Values</span>';
    customerHtml = customerHtml + '</button> ';
    customerHtml = customerHtml + "</div>"
    // fix for bug: 19060316 starts
    if(mainWin.applicationExt == "JP") {
        customerHtml = customerHtml + "<div class=\'DIVText\'>"; 
        customerHtml = customerHtml + "<label for=\'HiraganaCustName\' class=\'LBLstd\'>" + labelHiragana + "</label>";
        customerHtml = customerHtml + "<input name=\'HiraganaCustName\' ID=\'HiraganaCustName\' type=\'text\' size=\'11\' class=\'TXTstd\' value =\'%\'  onkeydown=\'\'>";
        customerHtml = customerHtml + "</div>" ;
     }    
     // fix for bug: 19060316 ends
    customerHtml = customerHtml + "<div class=\'DIVText\'>";
    customerHtml = customerHtml + "<label for=\'LinkedCustomers\' class=\'LBLstd\'>" + labelLinkedCustomers + "</label>";
    customerHtml = customerHtml + "<input name=\'LinkedCustomers\' ID=\'LinkedCustomers\' type=\'checkbox\' size=\'11\' class=\'TXTstd\' onkeydown=\'return fnCSrchKeyEvents(event)\'>";
    customerHtml = customerHtml + "</div>" ;
    customerHtml += "<div style=\"DIVText\"><label class=\'LBLstd\'></label>";
    //Fixed for 15841254
     customerHtml = customerHtml+ "<button id=\"btnCustomerSearch\" tabindex=\"0\" onClick=\'fnCustomerQuery(\"true\",\"false\")\' onkeydown=\"fireOnclickEvnt(event)\" href=\'#\' class='BTNtext' onmouseout=\"this.className='BTNtext'\"  onmouseover=\"this.className='BTNtextH'\" onblur=\"this.className='BTNtext'\" onfocus=\"this.className='BTNtextH'\">" + mainWin.getItemDesc("LBL_SEARCH") + "</button>&nbsp;&nbsp;";
    customerHtml = customerHtml+  "<button id=\"btnCustomerReset\" tabindex=\"0\"  onClick=\'fnCustReset()\' onkeydown=\"handleCustQueryKeyDownEvents(event)\" href=\'#\' class='BTNtext' onmouseout=\"this.className='BTNtext'\"  onblur=\"this.className='BTNtext'\" onmouseover=\"this.className='BTNtextH'\"  onfocus=\"this.className='BTNtextH'\" >" + mainWin.getItemDesc("LBL_RESET") + "</button>&nbsp;&nbsp;";  
    
     customerHtml = customerHtml+"</div>";
     customerHtml = customerHtml+"</fieldset>";
      
    //customerHtml += "<div class=\'DIVLinkBar\'>";
    //Fixed for 15841254
     //customerHtml = customerHtml+ "<button onClick=\'fnCustomerQuery(\"true\",\"false\")\' href=\'#\' class='BTNtext' >" + mainWin.getItemDesc("LBL_SEARCH") + "</button>&nbsp;&nbsp;";
   // customerHtml = customerHtml+  "<button onClick=\'fnCustReset()\' href=\'#\' class='BTNtext' >" + mainWin.getItemDesc("LBL_RESET") + "</button>&nbsp;&nbsp;";  
    
    //customerHtml = customerHtml+ "<A onClick=\'fnCustomerQuery(\"true\")\' href=\'#\' class='ASearchBar' onmouseover=\"this.className=\'ASearchover\'\" onmouseout=\"this.className=\'ASearchBar\'\" onfocus=\"this.className=\'ASearchover\'\">" + mainWin.getItemDesc("LBL_SEARCH") + "</A>&nbsp;&nbsp;";
   // customerHtml = customerHtml+ "<A onClick=\'fnCustReset()\' href=\'#\' class='ASearchBar' onmouseover=\"this.className=\'ASearchover\'\" onmouseout=\"this.className=\'ASearchBar\'\" onfocus=\"this.className=\'ASearchover\'\">" + mainWin.getItemDesc("LBL_RESET") + "</A>&nbsp;&nbsp;";   
    //customerHtml += "<input id=\'btnSearch\' class = \'BTNfooter\' onClick=\'fnCustomerQuery()\' value=\'Search\' type=\'button\' name=\'btnSearch\'>";
    //customerHtml += "<input id=\'btnReset\' class=\'BTNfooter\' onClick=\'fnCustReset()\' value=\'Reset\' type=\'button\' name = \'btnReset\'>";
    customerHtml += "</div></div>";
        customerHtml +="<div  class=\"DIVThreeColSectionContainer DIVBigRowContainer\" id=\'searchCustResultDiv\' >"
    customerHtml += "<div class=\"DIVColumnTriple\"><fieldset class=\"FSTcell\" id=\"containerFldset\" type=\"ME\" view=\"ME\" ><div id=\'CUSTDETAILS\' class=\"DIVMultipleBig\" style=\"width:auto;\" ></div></fieldset></div></div>";
    customerHtml += "<div  class=\"DIVThreeColSectionContainer DIVMediumRowContainer\" id=\"searchAccResultDiv\"><div class=\"DIVColumnTriple\"><fieldset class=\"FSTcell\" id=\"containerFldset\" type=\"ME\" view=\"ME\" ><div   class=\"DIVMultipleBig\"  id=\'ListofAccDiv\' style=\"width:auto;\"></div></fieldset></div></div>";
    customerHtml +="</div>";
    return customerHtml; 

}



//12.0.2 changes for customer tab ends 
function alert(message) 
{
    ////mask();	 //REDWOOD_CHANGES
    showAlerts(fnBuildAlertXML('','I',message), 'I');
    alertAction = "UNMASK";
}

function createNewNode(nodeName, className) 
{
    if (typeof(nodeName) != "undefined") {
        var newNode = document.createElement(nodeName);
        if (typeof(className) != "undefined") 
            newNode.setAttribute("CLASS", className);
    }
    return newNode;
}

function getTaskSearch(processCode) {
    var bpelTaskSearch = parent.bpelTaskSearch;
    var tempDoc = loadXMLDoc(bpelTaskSearch);
    var TaskTable = document.getElementById("TBTaskSearch");
    TaskTable.setAttribute("STYLE", "clear:both; padding:4px");
    var searchDiv = document.getElementById("TBLPageidCustomSearch");
    searchDiv.style.display = "block";
    if (searchDiv.childNodes[2]) 
        searchDiv.removeChild(searchDiv.childNodes[2]);
    TaskTable.innerHTML = "";
    var fldSet = createNewNode("fieldset", "FSTdiv");
    var legend = createNewNode("legend");
    setInnerText(legend, getItemDesc("LBL_TASKLIST_SEARCH"));
    fldSet.appendChild(legend);
    var j = 0;
    var processCodesArr = new Array();
    processCodesArr[0] = 'ALL';
    if (processCode != 'ALL') {
        processCodesArr[1] = processCode;
    }
    var newColumnDiv = createNewNode("div", "DIVColumnMin");
    //This variable keeps a track of the number of label tags in divs whose class name will be DIVList
    var DIVListContains = 0;
    for (index = 0; index < processCodesArr.length; index++) {
        if (processCodesArr[index] == "") continue;
        for (i = 0; i < selectSingleNode(tempDoc, "PROCESS_CODES/" + processCodesArr[index]).childNodes.length; i++) {
            if (j == 4) {
                j = 0;
                fldSet.appendChild(newColumnDiv);
                var newColumnDiv = createNewNode("div", "DIVColumnMin");
            }
            var tempArray = getNodeText(selectSingleNode(tempDoc, "PROCESS_CODES/" + processCodesArr[index]).childNodes[i]).split("~");
            /*1. When ever the number of label codes in a div whose class is 'DIVList' is 2, a new div should get created.
             *2. The count of label tags will be reset to '0' as the new div will be created
             *3. When the new cell contains a table, it indicates that it is for a date field. In such a case,
             * a new div will be created after that new cell, without validating for the number of label tags in the new cell
             * that contains the table.
             * */
            if (DIVListContains % 2 == 0 || newCellDiv.children[1].tagName.toUpperCase() == "TABLE") {
                var newCellDiv = createNewNode("div", "DIVList");
                DIVListContains = 0;
            }
            /*For a date field, the label will have 'b' tag instead of the label tag.*/
            if (tempArray[0] != "CREATEDDATE" && tempArray[0] != "DATE") {
                var newLabelnode = createNewNode("label", "LBLstd");
                ++DIVListContains;
            } else {
                /*This is to create a 'b' tag instead of a label tag for a date field.*/
                var newLabelnode = createNewNode("b", "LBLstd");
                ++DIVListContains;
            }
            setInnerText(newLabelnode, mainWin.getItemDesc(tempArray[1]));
            if (tempArray[2] == 'null' && tempArray[3] == 'null') {
                newLabelnode.setAttribute("for", tempArray[0]);
                taskSearchFieldName = tempArray[0];
                switch (tempArray[0]) {
                case 'INSTANCEID':
                    tempArray[2] = 'NUMBER';
                    break;
                case 'BRANCH':
                    tempArray[2] = 'TEXT';
                    break;
                case 'PROCESSNAME':
                    tempArray[2] = 'TEXT';
                    break;
                case 'ASSIGNEEGROUPS':
                    tempArray[2] = 'TEXT';
                    break;
                case 'ASSIGNEEUSERS':
                    tempArray[2] = 'TEXT';
                    break;
                case 'CREATEDDATE':
                    tempArray[2] = 'DATE';
                    break;
                case 'TITLE':
                    tempArray[2] = 'TEXT';
                    break;
                case 'PRIORITY':
                    tempArray[2] = 'TEXT';
                    break;
                //9NT1606_12_2_RETRO_12_0_3_23658452 Changes Starts
                case 'ACQUIREDBY':
                    tempArray[2] = 'TEXT';
                    break;
                //9NT1606_12_2_RETRO_12_0_3_23658452 Changes Ends
                }
            } else {
                newLabelnode.setAttribute("for", tempArray[2] + 'ATTRIBUTE' + tempArray[3]);
                taskSearchFieldName = tempArray[2] + 'ATTRIBUTE' + tempArray[3];
            }
            if (tempArray[0] == 'TXN_PRIORITY') {
                tempArray[2] = 'SELECT';
            }
            newCellDiv.appendChild(newLabelnode);
            newColumnDiv.appendChild(newCellDiv);
            if (tempArray[2] == 'NUMBER' || tempArray[2] == 'PROTECTEDNUMBER') {
                var cellSelect = createNewNode("select", "SELstd");
                cellSelect.id = taskSearchFieldName;
                var optNew = createNewNode("option");
                setNodeText(optNew, "=");
                optNew.value = "=";
                try {
                    cellSelect.add(optNew, null);
                } catch(e) {
                    cellSelect.add(optNew);
                }
                var optNew = createNewNode("option");
                setNodeText(optNew, ">");
                optNew.value = "GT";
                try {
                    cellSelect.add(optNew, null);
                } catch(e) {
                    cellSelect.add(optNew);
                }
                var optNew = createNewNode("option");
                setNodeText(optNew, "<");
                optNew.value = "LT";
                try {
                    cellSelect.add(optNew, null);
                } catch(e) {
                    cellSelect.add(optNew);
                }
                var optNew = createNewNode("option");
                setNodeText(optNew, "<=");
                optNew.value = "LTE";
                try {
                    cellSelect.add(optNew, null);
                } catch(e) {
                    cellSelect.add(optNew);
                }
                var optNew = createNewNode("option");
                setNodeText(optNew, ">=");
                optNew.value = "GTE";
                try {
                    cellSelect.add(optNew, null);
                } catch(e) {
                    cellSelect.add(optNew);
                }
                var optNew = createNewNode("option");
                setNodeText(optNew, "!=");
                optNew.value = "NE";
                try {
                    cellSelect.add(optNew, null);
                } catch(e) { //IE
                    cellSelect.add(optNew);
                }
                if (DIVListContains % 2 == 0) {
                    var newCellDiv = createNewNode("div", "DIVList");
                }++DIVListContains;
                newCellDiv.appendChild(cellSelect);
                var newCellLabel = createNewNode("LABEL", "LBLinv");
                newCellLabel.setAttribute("for", taskSearchFieldName);
                setInnerText(newCellLabel, 'Value');
                newCellDiv.appendChild(newCellLabel);
                var cellInput = createNewNode("input", "TXTstd");
                cellInput.id = taskSearchFieldName;
                cellInput.setAttribute("size", '10');
                cellInput.setAttribute("title", mainWin.getItemDesc(tempArray[1]));
                newCellDiv.appendChild(cellInput);
                newColumnDiv.appendChild(newCellDiv);
            } else if (tempArray[2] == 'TEXT' || tempArray[2] == 'PROTECTEDTEXT') {
                var cellSelect = createNewNode("select", "SELstd");
                cellSelect.id = taskSearchFieldName;
                var optNew = createNewNode("option");
                optNew.value = "=";
                setNodeText(optNew, "=");
                try {
                    cellSelect.add(optNew, null);
                } catch(e) {
                    cellSelect.add(optNew);
                }
                var optNew = createNewNode("option");
                optNew.value = "CONTAINS";
                setNodeText(optNew, "CONTAINS");
                try {
                    cellSelect.add(optNew, null);
                } catch(e) {
                    cellSelect.add(optNew);
                }
                if (DIVListContains % 2 == 0) {
                    var newCellDiv = createNewNode("div", "DIVList");
                }++DIVListContains;
                newCellDiv.appendChild(cellSelect);
                var newCellLabel = createNewNode("LABEL", "LBLinv");
                newCellLabel.setAttribute("for", taskSearchFieldName);
                setInnerText(newCellLabel, 'Value');
                newCellDiv.appendChild(newCellLabel);
                var cellInput = createNewNode("input", "TXTstd");
                cellInput.id = taskSearchFieldName;
                cellInput.setAttribute("size", '10');
                cellInput.setAttribute("title", mainWin.getItemDesc(tempArray[1]));
                newCellDiv.appendChild(cellInput);
                newColumnDiv.appendChild(newCellDiv);
            } else if (tempArray[2] == 'DATE' || tempArray[2] == 'PROTECTEDDATE') {
                var newcellTable = createNewNode("table");
                newcellTable.setAttribute('cellpadding', '0');
                newcellTable.setAttribute('cellspacing', '0');
                newcellTable.setAttribute('border', '0');
                var newcellTablerow = createNewNode("tr");
                var newcellTablerowCell = createNewNode("td");
                var newcellTablerowCellLabel = createNewNode("LABEL", "LBLinv");
                setInnerText(newcellTablerowCellLabel, mainWin.getItemDesc('LBL_FROM'));
                newcellTablerowCell.appendChild(newcellTablerowCellLabel);
                newcellTablerow.appendChild(newcellTablerowCell);
                var newcellTablerowCell = createNewNode("td");
                /*For adding a lable element before the input element.*/
                var cellLbl = createNewNode("LABEL", "LBLinv");
                newcellTablerowCell.appendChild(cellLbl);
                var cellInput = createNewNode("input");
                tempArray[0] = 'DT' + tempArray[0];
                var tempName = tempArray[0] + 'I';
                cellInput.setAttribute("type", "hidden");
                cellInput.setAttribute("name", tempArray[0]);
                cellInput.setAttribute("id", 'DT' + taskSearchFieldName); //FCUBS_12.0_PS_01 
                addEvent(cellInput, "onpropertychange", "displayDate(this)");
                newcellTablerowCell.appendChild(cellInput);
                newcellTablerow.appendChild(newcellTablerowCell);
                /*For adding a lable element before the input element.*/
                var cellLbl = createNewNode("LABEL", "LBLinv");
                newcellTablerowCell.appendChild(cellLbl);
                var cellInput = createNewNode("input", "TXTro");
                cellInput.setAttribute("type", "text");
                cellInput.setAttribute("name", tempName);
                cellInput.setAttribute("textname", tempArray[0]);
                cellInput.setAttribute("id", 'DT' + taskSearchFieldName + 'I');//FCUBS_12.0_PS_01 
                cellInput.setAttribute("title", mainWin.getItemDesc('LBL_FROM'));
                addEvent(cellInput, "onblur", "validateInputDate(this.id,event)");
                cellInput.size = 8;
                newcellTablerowCell.appendChild(cellInput);
                var newcellTablerowCell = createNewNode("td");
                var cellInput = createNewNode("button", "BTNimg");
                cellInput.setAttribute("TNAME", tempArray[0]);
                cellInput.setAttribute("INAME", tempName);
                cellInput.setAttribute("oldClassName", "BTNimg");
                cellInput.setAttribute("title", mainWin.getItemDesc('LBL_FROM'));
                addEvent(cellInput, "onclick", "disp_calBPEL(this.getAttribute('TNAME'),event)");
                var cellImg = createNewNode("SPAN", "ICOcalendar");
                cellImg.setAttribute("tabIndex", "-1");
                cellInput.appendChild(cellImg);
                newcellTablerowCell.appendChild(cellInput);
                newcellTablerow.appendChild(newcellTablerowCell);
                var newcellTablerowCell = createNewNode("td");
                var newcellTablerowCellLabel = createNewNode("label", "LBLinv");
                setInnerText(newcellTablerowCellLabel, mainWin.getItemDesc('LBL_TO'));
                newcellTablerowCell.appendChild(newcellTablerowCellLabel);
                newcellTablerow.appendChild(newcellTablerowCell);
                var newcellTablerowCell = createNewNode("td");
                /*For adding a lable element before the input element.*/
                var cellLbl = createNewNode("label", "LBLinv");
                newcellTablerowCell.appendChild(cellLbl);
                var cellInput = createNewNode("input");
                tempArray[0] = 'TO_' + tempArray[0];
                var tempName = tempArray[0] + 'I';
                cellInput.setAttribute("type", "hidden");
                cellInput.setAttribute("name", tempArray[0]);
                cellInput.setAttribute("id", tempArray[0]);
                addEvent(cellInput, "onpropertychange", "displayDate(this)");
                newcellTablerowCell.appendChild(cellInput);
                newcellTablerow.appendChild(newcellTablerowCell);

                /*For adding a lable element before the input element.*/
                var cellLbl = createNewNode("LABEL", "LBLinv");
                newcellTablerowCell.appendChild(cellLbl);
                var cellInput = createNewNode("input", "TXTro");
                cellInput.setAttribute("type", "text");
                cellInput.setAttribute("name", tempName);
                cellInput.setAttribute("textname", tempArray[0]);
                cellInput.setAttribute("id", tempName);
                cellInput.setAttribute("title", mainWin.getItemDesc('LBL_TO'));
                addEvent(cellInput, "onblur", "validateInputDate(this.id,event)");
                cellInput.size = 8;
                newcellTablerowCell.appendChild(cellInput);
                var newcellTablerowCell = createNewNode("td");
                var cellInput = createNewNode("button", "BTNimg");
                cellInput.setAttribute("TNAME", tempArray[0]);
                cellInput.setAttribute("INAME", tempName);
                cellInput.setAttribute("oldClassName", "BTNimg");
                cellInput.setAttribute("title", mainWin.getItemDesc('LBL_TO'));
                addEvent(cellInput, "onclick", "disp_calBPEL(this.getAttribute('TNAME'),event)");
                var cellImg = createNewNode("SPAN", "ICOcalendar");
                cellImg.setAttribute("tabIndex", "-1");
                cellInput.appendChild(cellImg);
                newcellTablerowCell.appendChild(cellInput);
                newcellTablerow.appendChild(newcellTablerowCell);
                newcellTable.appendChild(newcellTablerow);
                newCellDiv.appendChild(newcellTable);
                newColumnDiv.appendChild(newCellDiv);
            } else if (tempArray[2] == 'SELECT') {
                var cellSelect = createNewNode("select", "SELstd");
                cellSelect.id = taskSearchFieldName;
                var optNew = createNewNode("option");
                optNew.value = "=";
                setNodeText(optNew, "=");
                try {
                    cellSelect.add(optNew, null);
                } catch(e) {
                    cellSelect.add(optNew);
                }
                if (DIVListContains % 2 == 0) {
                    var newCellDiv = createNewNode("div", "DIVList");
                }++DIVListContains;
                newCellDiv.appendChild(cellSelect);
                var newCellLabel = createNewNode("LABEL", "LBLinv");
                newCellLabel.setAttribute("for", taskSearchFieldName);
                setInnerText(newCellLabel, 'Value');
                newCellDiv.appendChild(newCellLabel);
                var cellSelect = createNewNode("select", "SELstd");
                var optNew = createNewNode("option");
                optNew.value = "";
                setNodeText(optNew, "");
                try {
                    cellSelect.add(optNew, null);
                } catch(e) {
                    cellSelect.add(optNew);
                }
                var optNew = createNewNode("option");
                optNew.value = "1";
                setNodeText(optNew, "Normal");
                try {
                    cellSelect.add(optNew, null);
                } catch(e) {
                    cellSelect.add(optNew);
                }
                var optNew = createNewNode("option");
                optNew.value = "2";
                setNodeText(optNew, "High");
                try {
                    cellSelect.add(optNew, null);
                } catch(e) {
                    cellSelect.add(optNew);
                }
                newCellDiv.appendChild(cellSelect);
                newColumnDiv.appendChild(newCellDiv);
            }
            j++;
        }
    }
    fldSet.appendChild(newColumnDiv);
    newColumnDiv = createNewNode("DIV", "DIVColumnMin");
    newCellDiv = createNewNode("DIV", "DIVList");
    spanEle = createNewNode("SPAN", "Fright");
    spanEle.setAttribute("STYLE", "margin:0 1.3em 1 2.3em");
    var newButton = createNewNode("button", "BTNtext");
    addEvent(newButton, "onclick", "fnSearch()");
    setInnerText(newButton, mainWin.getItemDesc("LBL_SEARCH"));
    spanEle.appendChild(newButton);
    newCellDiv.appendChild(spanEle);
    newColumnDiv.appendChild(newCellDiv);
    fldSet.appendChild(newColumnDiv);
    TaskTable.appendChild(fldSet);
}

var dlgArg = new Object();
dlgArg.mainWin = parent;

var gCalDSODate = null;
var gCalBtn = null;

function disp_calBPEL(idDate,event)
{
    var currUser = parent.UserId;

    gCalBtn = getEventSourceElement(event);
    if (gCalBtn.parentNode.tagName.toUpperCase() == "NOBR" || gCalBtn.parentNode.tagName.toUpperCase() == "DIV") 
	getInpElem(gCalBtn.parentNode.parentNode.parentNode, idDate);
    else gCalDSODate = getInpElem(gCalBtn.parentNode.parentNode, idDate);
    var calString;
    var processDate = "";
    var dlgLeft = 400;
    var dlgTop = window.screenTop;

    var currentBranch = parent.CurrentBranch;
    var date = parent.AppDate;
    var nCurrYear = null;
    var nCurrMonth = null;

    if (gCalDSODate && gCalDSODate != '' && gCalDSODate.value && (gCalDSODate.value != ''))
    {
        var curDate = gCalDSODate.value;
        if (gDateFormatDSO == "yyyy-MM-dd")
        {
            nCurrYear = curDate.substr(0, 4);
            nCurrMonth = curDate.substr(5, 2);
            if (nCurrMonth.length > 1 && nCurrMonth.substr(0, 1) == '0') nCurrMonth = nCurrMonth.substr(1, 1);

        } else
        {
            nCurrYear = curDate.substr(0, 4);
            nCurrMonth = curDate.substr(4, 2);
            if (nCurrMonth.length > 1 && nCurrMonth.substr(0, 1) == '0') nCurrMonth = nCurrMonth.substr(1, 1);
        }
    } else
    {
        var l_date = date.split("-");
        nCurrYear = l_date[0];
        if (parseInt(nCurrYear) < 1000) parseInt(nCurrYear) += 1900;
        nCurrMonth = l_date[1];
        if (nCurrMonth.length > 1 && nCurrMonth.substr(0, 1) == '0') nCurrMonth = nCurrMonth.substr(1, 1);
    }
var l_Params   = "&Year=" + nCurrYear;
    l_Params  += "&Month=" + nCurrMonth;
    l_Params  += "&Brn=" + currentBranch;
    l_Params  += "&currUser=" + currUser;
    l_Params +="&txnBranch="      +g_txnBranch;
    l_Params +="&txnBranchDate="  +date;
    	//mask(); //REDWOOD_CHANGES
    loadSubScreenDIV("ChildWin", "ExtCalendar.jsp?"+l_Params);
}

function disablehelp()
{
    if (event.keyCode == 112)
    {
        document.onhelp = new Function("return false;");
        flexcubeHelp();
        return;
    }
}


function createTree(treeid, enablepersist, persistdays) {
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    var ultags = document.getElementById(treeid).getElementsByTagName("ul");
    var litags = document.getElementById(treeid).getElementsByTagName("li");
    for(var j=0; j<litags.length; j++){
        if((litags[j].parentNode.parentNode.id == "vTabCN_EXPLORE" || litags[j].parentNode.parentNode.id == "vTabCN_CENTRAL_PROCESSPart1") && litags[j].getElementsByTagName("ul").length == 0){ //12.0.2 SOATEAM
            //litags[j].style.backgroundImage="url("+list+")";
            litags[j].className = "ImgList";//Data Uri Change
            //litags[j].style.backgroundRepeat='no-repeat';
            addEvent(litags[j].children[0], "onkeydown", "return fnHandleMenuTree(event)");
        }
    }
    for (var i = 0; i < ultags.length; i++) {
        buildSubTree(treeid, ultags[i], i);
    }
}

function buildSubTree(treeid, ulelement, index) {
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    ulelement.parentNode.className = "submenu";
    if (ulelement.getAttribute("rel") == null || ulelement.getAttribute("rel") == false) 
        ulelement.setAttribute("rel", "closed");
    else if (ulelement.getAttribute("rel") == "open")
        expandSubTree(treeid, ulelement);

    ulelement.parentNode.onclick = function(e){
        mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
        e = window.event || e;
        var submenu = this.getElementsByTagName("ul")[0];
        if (treeid == 'treemenu2'){
			//12.0.2 SOATEAM Changes Starts
                        document.getElementById('btnnext').disabled = true; //1203_OR_CHANGES
                        document.getElementById('btnprev').disabled = true;//1203_OR_CHANGES
                        document.getElementById('btnrefresh').disabled = true;//1203_OR_CHANGES
			if(document.getElementById("tasksDiv")==null) {
				//fnShowDBoardTasks();
				document.getElementById("DIVTabContent"+currentTab).innerHTML = getBPELTaskHTML();
			}
            //12.0.2 SOATEAM Changes Ends
            var menuId = this.getElementsByTagName("a")[0].getAttribute("menuid"); //CTCB5.0 Perf Changes
            fnRefreshMenu(submenu,menuId);
           //12.0.2 SOATEAM Changes Starts
			if(currentTaskTab!='' && getEventSourceElement(e).tagName =='A')
				fnShowQueue(currentTaskTab); 
          //12.0.2 SOATEAM Changes Ends
        }        
        if (submenu.getAttribute("rel") == "closed"){
            submenu.style.display = "block";
            submenu.setAttribute("rel", "open");    
            //ulelement.parentNode.style.backgroundImage = "url(" + openfolder + ")";
            ulelement.parentNode.className = "submenu ImgTaskOpen"; //Data Uri Changes
            for (var i=0; i< ulelement.children.length ;i++){                 
                if (getNextSibling(ulelement.children[i])!= null){
                    for(var nodeIndex=0; nodeIndex<ulelement.children.length; nodeIndex++){
                        if(ulelement.children[nodeIndex].children.length == 1){
                            if(mainWin.LangCode == "ARB"){
                                    ulelement.children[nodeIndex].style.backgroundImage="url("+list2+")";
                                    ulelement.children[nodeIndex].style.backgroundRepeat='no-repeat';
                                    ulelement.children[nodeIndex].style.backgroundPosition='right center';
                            }else{
                                    //ulelement.children[nodeIndex].style.backgroundImage="url("+list+")";
                                    //ulelement.children[nodeIndex].style.backgroundRepeat='no-repeat';
                                    ulelement.children[nodeIndex].className = "ImgList"; //Data Uri change
                            }
                        }else{
                        if(ulelement.children[nodeIndex].getElementsByTagName("ul")[0].getAttribute("rel")=="open"){
                          //ulelement.children[nodeIndex].style.backgroundImage="url("+openfolder+")";
                          ulelement.children[nodeIndex].className = "submenu ImgTaskOpen"; //Data Uri Changes
                        }else{
                            //ulelement.children[nodeIndex].style.backgroundImage="url("+closefolder+")";
                            ulelement.children[nodeIndex].className ="submenu ImgTaskClosed";//Data Uri Change
                        }
                        ulelement.children[nodeIndex].style.backgroundRepeat='no-repeat';
                        }
                    }                
                    for(var nodeIndex=0; nodeIndex<ulelement.children.length; nodeIndex++){
                        if(ulelement.childNodes[nodeIndex].childNodes.length == 1){
                            //FC 11.4  NLS Changes
                            if(mainWin.LangCode == "ARB"){
                                    ulelement.children[nodeIndex].style.backgroundImage="url("+list2+")";
                                    ulelement.children[nodeIndex].style.backgroundRepeat='no-repeat';
                                    ulelement.children[nodeIndex].style.backgroundPosition='right center';
                            }else{
                                    //ulelement.children[nodeIndex].style.backgroundImage="url("+list+")";
                                    //ulelement.children[nodeIndex].style.backgroundRepeat='no-repeat';
                                    ulelement.children[nodeIndex].className = "ImgList"; //Data Uri change
                            }
                        }
                    }               
                }
                if(ulelement.children[i].children.length>1){
                    //ulelement.style.backgroundImage = "url(" + closefolder + ")";
                    ulelement.className ="submenu ImgTaskClosed";//Data Uri Change
                }else{
                    //FC 11.4 NLS Changes
                    if(mainWin.LangCode == "ARB"){
                            ulelement.style.backgroundImage = "url(" + list2 + ")";
                            ulelement.style.backgroundPosition='right center';
                    }else{
                            //ulelement.style.backgroundImage = "url(" + list + ")";
                            ulelement.className = "ImgList"; //Data Uri change
                    }                    
                }
            }   
            if(ulelement.children[0].children.length == 1){      
                //FC 11.4 NLS Changes
                if(mainWin.LangCode == "ARB"){
                        ulelement.style.backgroundImage = "url(" + list2  + ")";
                        ulelement.style.backgroundPosition='right center';
                }else{
                        //ulelement.style.backgroundImage = "url(" + list + ")";
                        ulelement.className = "ImgList"; //Data Uri change
                } 
            }else{
                //ulelement.style.backgroundImage = "url(" + closefolder + ")";
                ulelement.className ="submenu ImgTaskClosed";//Data Uri Change
            }
            ulelement.getElementsByTagName("A")[0].focus();
        } else if (submenu.getAttribute("rel") == "open") {
            submenu.style.display = "none";
            submenu.setAttribute("rel", "closed");
            //ulelement.parentNode.style.backgroundImage = "url(" + closefolder + ")"; 
            ulelement.parentNode.className ="submenu ImgTaskClosed";//Data Uri Change
            ulelement.parentNode.getElementsByTagName("A")[0].focus();
        }
        ulelement.style.backgroundRepeat = 'no-repeat';
        ulelement.parentNode.style.backgroundRepeat = 'no-repeat';
        preventpropagate(e);
    }

    ulelement.parentNode.onkeydown = function(e){
		mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
        var submenu = this.getElementsByTagName("ul")[0];
        e = window.event || e;
        var elem = getEventSourceElement(e);
        if(e.shiftKey && e.keyCode == 9){
            document.getElementById("vTab_Heading").focus();
            preventpropagate(e);
            return false; 
        }
        if (e.keyCode == 9) {
            //12.0.3 changes  starts.
            if (document.getElementById("MINwinds").getElementsByTagName("li").length>0) {//Fix for 18380388
                document.getElementById("MINwinds").getElementsByTagName("A")[0].focus();
                //preventpropogate(e);
                return false;
            }
            //12.0.3 changes  ends.
            else if(document.getElementById("DIVTabContent" + currentTab).innerHTML != "") {

                if (document.getElementsByTagName("iframe")[0]) {
                    document.getElementsByTagName("iframe")[0].contentWindow.focus();
                    return false;
                }
            }else{
                document.getElementById("nav").getElementsByTagName("LI")[0].focus();//HTML5 Changes 6/OCT/2016
                document.getElementById("nav").getElementsByTagName("LI")[0].className = document.getElementById("nav").getElementsByTagName("LI")[0].className + " selected";//HTML5 Changes 6/OCT/2016
                preventpropagate(e);
                return false;
            }
            /*if (!bpelTaskList) {
                document.getElementById("vTabLN_EXPLORE").getElementsByTagName("A")[0].focus();
                preventpropagate(e);
                return false; 
            } else {
                document.getElementById("vTabLN_CENTRAL_PROCESS").getElementsByTagName("A")[0].focus();
                preventpropagate(e);
                return false; 
            }      */      
        }
        if(e.keyCode == 13){
            if(elem.href.indexOf("dispHref") != -1){                
                //eval(elem.getAttribute("href").substring(11));
                var fnEval = new Function(elem.getAttribute("href").substring(11));  
                fnEval();
                fnDisableBrowserKey(e);
                preventpropagate(e);
                return false; 
            }
        }
        if(e.keyCode == 39){
            submenu.style.display = "block";
            submenu.setAttribute("rel", "open");    
            //ulelement.parentNode.style.backgroundImage = "url(" + openfolder + ")";    
            ulelement.parentNode.className = "submenu ImgTaskOpen"; //Data Uri Changes
           
            for (var i=0; i< ulelement.children.length ;i++){                 
                if (getNextSibling(ulelement.children[i]) != null){
                    for(var nodeIndex=0; nodeIndex<ulelement.children.length; nodeIndex++){
                        if(ulelement.children[nodeIndex].children.length == 1){
                            //ulelement.children[nodeIndex].style.backgroundImage="url("+list+")";
                            //ulelement.children[nodeIndex].style.backgroundRepeat='no-repeat';
                            ulelement.children[nodeIndex].className = "ImgList"; //Data Uri change
                        }else{
                            //ulelement.children[nodeIndex].style.backgroundImage="url("+closefolder+")";
                            ulelement.children[nodeIndex].className ="submenu ImgTaskClosed";//Data Uri Change
                            //ulelement.children[nodeIndex].style.backgroundRepeat='no-repeat';
                        }
                    }
                    for(var nodeIndex=0; nodeIndex<ulelement.children.length; nodeIndex++){
                        if(ulelement.childNodes[nodeIndex].childNodes.length == 1){
                            //ulelement.children[nodeIndex].style.backgroundImage="url("+list+")";
                            //ulelement.children[nodeIndex].style.backgroundRepeat='no-repeat';
                            ulelement.children[nodeIndex].className = "ImgList"; //Data Uri change
                        }
                    }               
                }
                if(ulelement.children[i].children.length>1){
                    //ulelement.style.backgroundImage = "url(" + closefolder + ")";
                    ulelement.className ="submenu ImgTaskClosed";//Data Uri Change
                }else{
                    //ulelement.style.backgroundImage = "url(" + list + ")";
                    ulelement.className = "ImgList"; //Data Uri change
                }
            }   
            if(ulelement.children[0].children.length == 1){      
                //ulelement.style.backgroundImage = "url(" + list + ")";
                ulelement.className = "ImgList"; //Data Uri change
            }else{
                //ulelement.style.backgroundImage = "url(" + closefolder + ")";
                ulelement.className ="submenu ImgTaskClosed";//Data Uri Change
            }
            submenu.getElementsByTagName("A")[0].focus();
        }else if (e.keyCode == 37){
            if(submenu.getAttribute("rel") == "closed"){
                var elemA = document.getElementById("treemenu1").getElementsByTagName("A");
                if (bpelTaskList) {
                    elemA = document.getElementById("treemenu2").getElementsByTagName("A");
                }
                if(ulelement.parentNode.parentNode.getElementsByTagName("A")[0] == elemA[0]){
                }else{
                    ulelement.parentNode.parentNode.style.display = "none"; 
                    ulelement.parentNode.parentNode.setAttribute("rel", "closed");
                    //ulelement.parentNode.parentNode.parentNode.style.backgroundImage = "url(" + closefolder + ")"; 
                    ulelement.parentNode.parentNode.parentNode.className ="submenu ImgTaskClosed";//Data Uri Change
                    getPreviousSibling(ulelement.parentNode.parentNode).focus();
                }
            }else{
                submenu.style.display = "none";
                submenu.setAttribute("rel", "closed");
                //ulelement.parentNode.style.backgroundImage = "url(" + closefolder + ")";   
                ulelement.parentNode.className ="submenu ImgTaskClosed";//Data Uri Change
                getPreviousSibling(submenu).focus();
            }
        }else if(e.keyCode == 40){
            var elemLI = document.getElementById("treemenu1").getElementsByTagName("LI");
            if (bpelTaskList) {
                elemLI = document.getElementById("treemenu2").getElementsByTagName("LI");
            }
            if(elem.parentNode.className.indexOf("ImgList")!= -1){/*Fix For Bug 17356684*/
                if(elemLI[elemLI.length-1] == elem.parentNode){                    
                }else if (getNextSibling(elem.parentNode) != null)
                    getNextSibling(elem.parentNode).getElementsByTagName("A")[0].focus();
                else if(getNextSibling(elem.parentNode.parentNode.parentNode)!= null)
                    getNextSibling(elem.parentNode.parentNode.parentNode).getElementsByTagName("A")[0].focus();
                else
                    getNextSibling(elem.parentNode.parentNode.parentNode.parentNode.parentNode).getElementsByTagName("A")[0].focus();
            }else{ 
                if(getNextSibling(elem.parentNode)!= null && elem.parentNode.className.indexOf("submenu") != -1){   //Data Uri Change
                    if(elem.parentNode.getElementsByTagName("UL") && elem.parentNode.getElementsByTagName("UL")[0].getAttribute("rel") == "open"){
                        elem.parentNode.getElementsByTagName("UL")[0].getElementsByTagName("A")[0].focus();
                    }else{
                        getToolBarNextSibling(elem.parentNode).getElementsByTagName("A")[0].focus();
                    }
                }else if(getNextSibling(elem.parentNode)== null && elem.parentNode.className.indexOf("submenu")  != -1){
                    if(elem.parentNode.getElementsByTagName("UL") && elem.parentNode.getElementsByTagName("UL")[0].getAttribute("rel") == "open"){
                        elem.parentNode.getElementsByTagName("UL")[0].getElementsByTagName("A")[0].focus();
                    }else{
                        if(getNextSibling(elem.parentNode.parentNode.parentNode).getElementsByTagName("A").length != 0)
                            getNextSibling(elem.parentNode.parentNode.parentNode).getElementsByTagName("A")[0].focus();
                    }
                }else{
                    var elemUL = document.getElementById("treemenu1").getElementsByTagName("UL");
                    if(getPreviousSibling(elemUL[elemUL.length-1]) == elem){
                        if(elem.parentNode.getElementsByTagName("UL")[0].getAttribute("rel")== "open"){
                            elem.parentNode.getElementsByTagName("A")[1].focus();
                        }else{}
                    }else {
                        if(document.getElementById("treemenu1").className == elem.parentNode.parentNode.className){
                            if(elem.parentNode.getElementsByTagName("UL")[0].getAttribute("rel")== "open"){
                                elem.parentNode.getElementsByTagName("A")[1].focus();
                            }else{}   
                        }else {
                            getNextSibling(elem.parentNode.parentNode.parentNode).getElementsByTagName("A")[0].focus();
                        }
                    }
                }
            }            
        }else if(e.keyCode == 38){
             if(elem.parentNode.className.indexOf("ImgList")!= -1){/*Fix For Bug 17356684 Start */
                if (getPreviousSibling(elem.parentNode) != null)
                    getPreviousSibling(elem.parentNode).getElementsByTagName("A")[0].focus();
                else
                    elem.parentNode.parentNode.parentNode.getElementsByTagName("A")[0].focus();
            }else{
                if(getToolBarPreviousSibling(elem.parentNode) != null && elem.parentNode.className.indexOf("submenu") != -1){   //Data Uri Changes             
                    var elemUL = getToolBarPreviousSibling(elem.parentNode).getElementsByTagName("UL");
                    var elemA = getToolBarPreviousSibling(elem.parentNode).getElementsByTagName("A");
                    if(elemUL.length > 0){
                        if(elemUL[0].getAttribute("rel") == "open"){
                            if(elemUL[elemUL.length-1].getAttribute("rel") == "open"){                        
                                elemA[elemA.length-1].focus();
                            }else{
                                elemUL[elemUL.length-1].parentNode.children[0].focus();                        
                            }
                        }else{
                            elemA[0].focus();
                        }
                    }else{
                        elemA[0].focus();                        
                    }
                }else if(elem.parentNode.parentNode.className == "treeview"){
                    
                }else{
                    getToolBarPreviousSibling(elem.parentNode.parentNode).focus();  
                }
            }
        }
        ulelement.style.backgroundRepeat = 'no-repeat';
        ulelement.parentNode.style.backgroundRepeat = 'no-repeat';
        preventpropagate(e);
        fnDisableBrowserKey(e);
        return false;/*Fix For Bug 17356684 Start */
    }
    
    ulelement.onclick = function(e){
        preventpropagate(e);
    }
    return false;/*Fix For Bug 17356684 Start */
}

function fnHandleMenuTree(e){
    e = window.event || e;
    var elem = getEventSourceElement(e);
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    if(e.shiftKey && e.keyCode == 9){
        document.getElementById("vTab_Heading").focus();
        preventpropagate(e);
        return false; 
    }
    if(e.keyCode == 9){
        document.getElementById("vTabLN_EXPLORE").getElementsByTagName("A")[0].focus();
        preventpropagate(e);
        return false;    
    }else if(e.keyCode == 40){
        if(getToolBarNextSibling(elem.parentNode) != null){
            getToolBarNextSibling(elem.parentNode).getElementsByTagName("A")[0].focus();
        }
    }else if(e.keyCode == 38){
        if(getToolBarPreviousSibling(elem.parentNode) != null){
            getToolBarPreviousSibling(elem.parentNode).getElementsByTagName("A")[0].focus();
        }
    }
}

function expandSubTree(treeid, ulelement) { 
  var rootnode = document.getElementById(treeid);
    var currentnode = ulelement;
    currentnode.style.display = "block";
    //currentnode.parentNode.style.backgroundImage = "url(" + openfolder + ")";
    currentnode.parentNode.className = "submenu ImgTaskOpen"; //Data Uri Changes
    currentnode.parentNode.style.backgroundRepeat = 'no-repeat';

    while (currentnode != rootnode) {
        if (currentnode.tagName == "UL") {   
            currentnode.style.display = "block";
            currentnode.setAttribute("rel", "open") 
            //currentnode.parentNode.style.backgroundImage = "url(" + openfolder + ")";
            currentnode.parentNode.className = "submenu ImgTaskOpen"; //Data Uri Changes
            currentnode.parentNode.style.backgroundRepeat = 'no-repeat';
        }
        currentnode = currentnode.parentNode
    }
}

function handleBrowserKeys(browserObj,e) {
    e = window.event || e;
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    if(e.shiftKey && e.keyCode == 9){
        document.getElementById("vTab_Heading").focus();
        preventpropagate(e);
        return false; 
    }
    if(e.keyCode == 9){
        if(document.getElementById("MINwinds").childNodes.length > 0){
            document.getElementById("MINwinds").childNodes[0].getElementsByTagName("A")[0].focus();
            preventpropagate(e);
            return false;
        }else{
            if(document.getElementById("TlBarOper").className == "dispNone"){
                document.getElementById("nav").getElementsByTagName("A")[0].focus();
                preventpropagate(e);
                return false;
            }else{
                var elemBtn = document.getElementById("TlBarOper").getElementsByTagName("BUTTON");
                for(var i=0; i<elemBtn.length; i++){ 
                    if(!elemBtn[i].disabled ){
                        elemBtn[i].focus();
                        preventpropagate(e);
                        return false;
                    }
                }
            }
        }
    }else if(e.keyCode == 40){
        if(getToolBarNextSibling(browserObj.parentNode) != null)
            if(getToolBarNextSibling(browserObj.parentNode).style.display == "none"){
                var elemLI = browserObj.parentNode.parentNode.getElementsByTagName("LI");
                for(var i=2; i<elemLI.length-1; i++){
                    if(elemLI[i].style.display == "none"){
                        elemLI[i+1].getElementsByTagName("A")[0].focus(); 
                        break;
                    }                        
                }
            }else{
                getToolBarNextSibling(browserObj.parentNode).getElementsByTagName("A")[0].focus();        
            }
    }else if(e.keyCode == 38){
        if(getToolBarPreviousSibling(browserObj.parentNode) != null)
            if(getToolBarPreviousSibling(browserObj.parentNode).style.display == "none"){
                var elemLI = browserObj.parentNode.parentNode.getElementsByTagName("LI");
                for(var i=elemLI.length-1; i>0; i--){
                    if(elemLI[i].style.display == "none"){
                        elemLI[i-1].getElementsByTagName("A")[0].focus(); 
                        break;
                    }
                }  
            }else{
                getToolBarPreviousSibling(browserObj.parentNode).getElementsByTagName("A")[0].focus();    
            }
    }
    return true;
}

function handleActionKeys(actionObj,e) {
    e = window.event || e;
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    if(e.shiftKey && e.keyCode == 9){
        if(actionObj.id == "btnSignOff" || actionObj.id == "btnExit")
            document.getElementById("btnGo").focus();
        else
            document.getElementById("vTabLN_EXPLORE").getElementsByTagName("A")[0].focus();
        preventpropagate(e);
        return false; 
    }
    if(e.keyCode == 9){
        if(actionObj.id == "btnSignOff" || actionObj.id == "btnExit" || actionObj.id == "btnGo")
           // document.getElementById("vTab_Heading").focus();     
            document.getElementById("DBoardHome").focus();     
        /*else if(actionObj.id == "btnMenuSearch"){HTML5 Changes 6/OCT/2016 Start
            document.getElementById("minimizer").focus(); 
        }
        else if(actionObj.id == "minimizer"){ //Added for navigating to menu list
            var menuList =  document.getElementById("treemenu1").getElementsByTagName("A");
            if(menuList.length > 0){
                menuList[0].focus();
                }
                else{
                  document.getElementById("nav").getElementsByTagName("A")[0].focus(); 
                }
        }
        else 
            document.getElementById("nav").getElementsByTagName("A")[0].focus(); */ 
        else if (actionObj.id == "btnMenuSearch") {
            var menuList =  document.getElementById("treemenu1").getElementsByTagName("A");
            if(menuList.length > 0){
                menuList[0].focus();
            }else{
                  document.getElementById("nav").getElementsByTagName("LI")[0].focus(); 
            }
        } else {
            document.getElementById("nav").getElementsByTagName("LI")[0].focus();
        }//HTML5 Changes 6/OCT/2016 End
        preventpropagate(e);
        return false;  
    }else if(e.keyCode == 39){
        if(actionObj.id == "btnSignOff"){
            document.getElementById("btnExit").focus();        
        }else if(actionObj.id == "btnExit"){            
        }else{
            var elemBtn = document.getElementById("TlBarOper").getElementsByTagName("BUTTON");
            if(getNextSibling(actionObj) != null){
                for(var i=0; i<elemBtn.length; i++){
                    if(elemBtn[i].title == actionObj.title){
                        for(var j=i+1; j<elemBtn.length;j++){                
                            if(elemBtn[j].disabled == false){
                                elemBtn[j].focus();
                                break;
                            }
                        }
                    }
                }
            }
        }
    }else if(e.keyCode == 37){
        if(actionObj.id == "btnSignOff"){             
        }else if(actionObj.id == "btnExit"){
            document.getElementById("btnSignOff").focus(); 
        }else{
            var elemBtn = document.getElementById("TlBarOper").getElementsByTagName("BUTTON");
            if(getNextSibling(actionObj) != null){
                for(var i=elemBtn.length-1; i>=0; i--){
                    if(elemBtn[i].title == actionObj.title){
                        for(var j=i-1; j>=0;j--){                
                            if(elemBtn[j].disabled == false){
                                elemBtn[j].focus();
                                break;
                            }
                        }
                    }
                }
            }
        }
    }
}


function showBrowser(action, e) {
    //document.getElementById("vTabDB_DASHBOARD").innerHTML = "";
    /*if(action == 'CUSTOMER' || action == 'TELLER') {
        fnGenerateCustSeq(); //For generating sequence number for customer tab
    }*/
        
        
    if(!(curTab==action)) {
        if(action == 'CENTRAL_PROCESS') { //idBpelBrw
            bpelTaskList = true;
            if(gNumChildWindows > 0) {
                alertAction = "UNMASK";
                //mask();//REDWOOD_CHANGES
                showAlerts(fnBuildAlertXML("", "I", getItemDesc("LBL_CLOSE_ALL")), "I");
                return;
            }
            document.getElementById("vTabDB_CENTRAL_PROCESS").style.display = 'block';
            document.getElementById("vTabDB_CENTRAL_PROCESS").innerHTML = getBPELTaskHTML();
            mainWin.document.getElementById("fastpath").value = '';
            mainWin.document.getElementById("fastpath").setAttribute("readonly", "readonly");
            document.getElementById("TBLPageidCustomSearch").style.display = 'none'; 
            document.getElementById("DIVTaskContent").style.display = 'none';		 
            document.getElementById("idBrwRefresh").setAttribute("onclick", "fnBpelRefresh()");
            document.getElementById("vTabDB_TELLER").innerHTML = "";
            if(document.getElementById('TASKLIST_CAP1'))
             document.getElementById('TASKLIST_CAP1').style.display = 'none';
            //document.getElementById("vTabDB_DASHBOARD").innerHTML = "";
            //document.getElementById("vTabDB_DASHBOARD").innerHTML = "";
        } else if(action == 'CUSTOMER') { 
            bpelTaskList = false;
            mainWin.document.getElementById("fastpath").removeAttribute("readonly");
            fnCustomer();
           // document.getElementById("idBrwRefresh").setAttribute("onclick", "fnCustomer()");
        } else if(action == 'TELLER') { 
            bpelTaskList = false;
            mainWin.document.getElementById("fastpath").removeAttribute("readonly");            
        } else if(action == 'DASHBOARD') { 
            bpelTaskList = false;
            mainWin.document.getElementById("fastpath").removeAttribute("readonly");
            mainWin.document.getElementById("tasksDiv").style.display = 'none';
            mainWin.document.getElementById("TBLPageidCustomSearch").style.display = 'none';
            mainWin.document.getElementById("DIVTaskContent").style.display = 'none'; 
            fnShowUserAlerts();
             if(document.getElementById('TASKLIST_CAP1'))
             document.getElementById('TASKLIST_CAP1').style.display = 'none';
            document.getElementById("vTabDB_TELLER").innerHTML = "";	//FCUBS11.1 CROSSBROWSER Changes
            //document.getElementById("vTabDB_DASHBOARD").innerHTML = "";
            addEvent(document.getElementById("idBrwRefresh"), "onclick", "fnShowUserAlerts()");
        } else if(action== 'USERSETTINGS'){
            bpelTaskList = false;
        }
        else {
            bpelTaskList = false;
            mainWin.document.getElementById("fastpath").removeAttribute("readonly");           
        }
        var tempAction = action;
        if(action.toUpperCase() == "EXPLORE") tempAction = "MENU";
       // document.getElementById("vTab_Heading").children[0].innerHTML = getItemDesc("LBL_"+tempAction);
       // document.getElementById("vTabCN_"+action).style.display="block";
       // document.getElementById("vTabCN_"+curTab).style.display="none";
        curTab = action;
    }
    var evnt = window.event || e;
    preventpropagate(evnt);
    return false;
}

function fnHandleTellerKeys(e){
    var evnt = window.event || e;
    var srcElement = getEventSourceElement(evnt);
    if(evnt.shiftKey && evnt.keyCode == 9){
        document.getElementById("vTab_Heading").focus();
        preventpropagate(e);
        return false; 
    }
    if(evnt.keyCode == 9){
        document.getElementById("vTabLN_TELLER").getElementsByTagName("A")[0].focus();
        preventpropagate(evnt);
        return false; 
    }else if(evnt.keyCode == 40){
        if(getNextSibling(srcElement.parentNode)!= null)
            getNextSibling(srcElement.parentNode).children[0].focus();
    }else if(evnt.keyCode == 38){
        if(getPreviousSibling(srcElement.parentNode)!= null)
            getPreviousSibling(srcElement.parentNode).children[0].focus();
    }
}

function fnHandleDashboardKeys(e){
    var evnt = window.event || e;
    var srcElement = getEventSourceElement(evnt);
    if(evnt.shiftKey && evnt.keyCode == 9){
        document.getElementById("vTab_Heading").focus();
        preventpropagate(e);
        return false; 
    }
    if(evnt.keyCode == 9){
        document.getElementById("vTabLN_DASHBOARD").getElementsByTagName("A")[0].focus();
        preventpropagate(evnt);
        return false; 
    }else if(evnt.keyCode == 40){
        if(getNextSibling(srcElement.parentNode)!= null)
            getToolBarNextSibling(srcElement.parentNode).children[0].focus();
    }else if(evnt.keyCode == 38){
        if(getToolBarPreviousSibling(srcElement.parentNode)!= null && !getToolBarPreviousSibling(srcElement.parentNode).children[0].disabled)
            getToolBarPreviousSibling(srcElement.parentNode).children[0].focus();
    }
}

function getBPELTaskHTML() {
    var lblTasklistSearch=getItemDesc("LBL_TASKLIST_SEARCH");
    var labelTaskList = getItemDesc("LBL_TASKLIST");
    var labelAcquire = getItemDesc("LBL_ACQUIRE");
    var labelRelease =getItemDesc("LBL_RELEASE");
    var labelResume = getItemDesc("LBL_RESUME");
    var labelReassign = getItemDesc("LBL_REASSIGN");
    var labelEscalate = getItemDesc("LBL_ESCALATE"); //12.0.2 SOATEAM Changes
    var labelTaskHistory = getItemDesc("LBL_TASKHISTORY");
    var labelOf = getItemDesc("LBL_OF");
    var lblFilters = getItemDesc("LBL_FILTERS"); //12.0.2 SOATEAM Changes 
    var browsermenuHTML = "";
	//12.0.2 SOATEAM Starts
    browsermenuHTML +="<div id=\"hTab_DBoardTasks\" class=\"DBoardHeadDiv\" style=\"display:none\">";
    browsermenuHTML +="<a id='A_FILTER' onclick='fnShowFilters(event)' style=\"display:'none';\">";
    browsermenuHTML +="<span class='' id='SPAN_FILTER'>";
    //browsermenuHTML +="<label style='margin-left:10px;margin-top:2px;margin-bottom:2px;' for='Checkbox'>";
    browsermenuHTML +="<input id='showFilterChkBox' class='CHKStd' type='CHECKBOX' onclick='fnShowFilters(event)'>";
    browsermenuHTML +=getItemDesc("LBL_APPLY_FILTERS");
    browsermenuHTML +="</input></span></a>";
    //browsermenuHTML +="</input></label>";
    browsermenuHTML +="</div>";
    //12.0.2 SOATEAM Ends
    browsermenuHTML +="<div class=\'DIVdash\' id=\'DIVTaskArea\' style=\'overflow:hidden\'>"; 
    browsermenuHTML +="<div id=\'DIVTaskTAB\'  class=\'DIVtab\' style=\'display:none\'></div>"; //12.0.2 SOATEAM Changes
    browsermenuHTML +="<div id=\'DIVTaskContent\' style=\'display:none\'></div>"; 
    browsermenuHTML +="<div style=\'display:none\'></div>"; 
    browsermenuHTML +="<div id=\'idBpelTaskDetails\'>"; 

    browsermenuHTML +="<div  id=\'TBLPageidCustomSearch\' style=\'display:none;\'>";
    browsermenuHTML +="<div class=\'DIVpage\' id=\'TaskSearchHeader\' style=\'width:99.5%\'><h2 class=\'SPNpageH\' accesskey=\"4\" tabindex=\"0\">"+lblTasklistSearch+"</h2></div>";
    browsermenuHTML +="<div id=\"TBTaskSearch\" class=\"DIVtasksearch\" style=\"clear:both;padding:4px\">";
    browsermenuHTML +="<fieldset class=\"FSTdiv\"><legend>"+lblTasklistSearch+"</legend></div></div>";
//12.0.2 SOATEAM Changes Starts
	browsermenuHTML +="<div  id=\'TBLPageidFilters\' style=\'display:none;\'>";
    browsermenuHTML +="<div class=\'DIVpage\' id=\'TaskFiltersHeader\' style=\'width:99.5%;\'><h2 class=\'SPNpageH\' accesskey=\"4\" tabindex=\"0\">"+lblFilters+"</h2></div>";
    browsermenuHTML +="<div id=\"TBTaskFilters\" class=\"DIVtasksearch\" style=\"clear:both;padding:4px\">";
    browsermenuHTML +="<fieldset class=\"FSTdiv\"><legend>"+lblFilters+"</legend></div></div>";	
//12.0.2 SOATEAM Changes Ends
    browsermenuHTML += getBPELTaskDetailHTML();
    return browsermenuHTML;
}

function getBPELTaskDetailHTML(){
    var labelTaskList = getItemDesc("LBL_TASKLIST");
    var labelAcquire = getItemDesc("LBL_ACQUIRE");
    var labelRelease =getItemDesc("LBL_RELEASE");
    var labelResume = getItemDesc("LBL_RESUME");
    var labelReassign = getItemDesc("LBL_REASSIGN");
    var labelEscalate = getItemDesc("LBL_ESCALATE");//12.0.2 SOATEAM Changes
    var labelTaskHistory = getItemDesc("LBL_TASKHISTORY");
    var labelOf = getItemDesc("LBL_OF");
    var labelPage = getItemDesc("LBL_PAGE");
    var browsermenuHTML = "";
//FCUBS_12.0_PS_01 Starts
    var labelRenew = getItemDesc("LBL_RENEW");
	var labelCopy = getItemDesc("LBL_COPY");
	var labelDepict = getItemDesc("LBL_STAGE_STATUS");//12.0.2 SOATEAM Changes
//FCUBS_12.0_PS_01 Ends
//12.0.2 SOATEAMChanges Starts
	var labelhistory = getItemDesc("LBL_HISTORY");
	var labeldocs = getItemDesc("LBL_DOCS");
	var labeladvices = getItemDesc("LBL_ADVICES");
        var labelSchedule = getItemDesc("LBL_APPSCHEDULE");
	var labelInteractions = getItemDesc("LBL_INTERACTIONS");
        var recalcSch         = getItemDesc("LBL_RECALC_SCH"); //12.1 Changes
//12.0.2 SOATEAM Changes Ends
    browsermenuHTML +="<div id=\'tasksDiv\' style=\'overflow:auto;display:none;clear:both;width:100%\'>";
    browsermenuHTML +="<div style=\"clear:both; width:99%;background:none \" class=\"DIVpage\"><h2 id =\"tasksDivHeading\" class=\"SPNpageH\"><a accesskey=\"2\" name=\"#\">"+labelTaskList+"</a></h2></div>";  //12.0.2 SOATEAM Changes
    browsermenuHTML +="<div id=\'BPELTaskHeader\' class=\"TASKLIST_CAP\"><div class=\'DIVcaption1\' id=\'HeaderSummary\' style=\"padding:0px; margin:0px\">";

    browsermenuHTML +="<table class=\'TBLlyt\' summary=\'\' cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr>";
    browsermenuHTML +="<td><button class=\'BTNtext\' id =\'BTNAcquireTask\' onclick=\'fnAcquireTasks()\'>"+labelAcquire+"</button></td>";
    browsermenuHTML +="<td><button class=\'BTNtext\' id =\'BTNReleaseTask\' onclick=\'fnReleaseTasks()\'>"+labelRelease+"</button></td>";
    browsermenuHTML +="<td><button class=\'BTNtext\' id =\'BTNResumeTask\' onclick=\'fnResumeTasks()\'>"+labelResume+"</button></td>";
    browsermenuHTML +="<td><button class=\'BTNtext\' id =\'BTNRenewTask\' onclick=\'fnRenewTasks()\'>"+labelRenew+"</button></td>";//FCUBS_12.0_PS_01 
    browsermenuHTML +="<td><button class=\'BTNtext\' id =\'BTNReassignTask\' onclick=\'fnReassignTasks()\'>"+labelReassign+"</button></td>";
    browsermenuHTML +="<td><button class=\'BTNtext\' id =\'BTNEscalateTask\' onclick=\'fnEscalateTasks()\'>"+labelEscalate+"</button></td>";//12.0.2 SOATEAM Changes 
	browsermenuHTML +="<td><button class=\'BTNtext\' id =\'BTNCopyTask\' onclick=\'fnCopyTasks()\'>"+labelCopy+"</button></td>";//FCUBS_12.0_PS_01 
	browsermenuHTML +="<td><button class=\'BTNtext\' id =\'BTNDepictTask\' onclick=\'fnDepictTasks()\'>"+labelDepict+"</button></td>";//12.0.2 SOATEAM Changes  
    browsermenuHTML +="<td>&nbsp;&nbsp;</td>";
    browsermenuHTML +="<td><BUTTON class=\'BTNicon2\' title=First  onclick=\'displayFirstPage()\' name=navFirst id=\'navFirst\'><span tabindex=\'-1\' class=\'ICOfirst2\'></BUTTON></td>" ;
    browsermenuHTML +="<td><BUTTON class=\'BTNicon2\' title=Previous  onclick=\'displayPrevPage()\' name=navPrev id=\'navPrev\'><span tabindex=\'-1\' class=\'ICOprevious\'></BUTTON></td>" ;
    
    browsermenuHTML +="<td><span class=\'SPNtext\' title=\'Records\'>"+labelPage+"</span></td>";//12.0.2 SOATEAM
    browsermenuHTML +="<td><span class=\'SPNtext\' readOnly type=number size=1 id=currPage name=currPage></span></td>";
    browsermenuHTML +="<td><span class=\'SPNtext\' readOnly value=of name=of>" + labelOf + "</span></td>" ;
    browsermenuHTML +="<td><span class=\'SPNtext\' readOnly type=number size=1 id=totalPages name=totalPages></span></td>";

    browsermenuHTML +='<td><BUTTON class=\'BTNicon2\' onclick=\'displayNextPage()\' title=Next  onMouseOver="' + 'this.className=' + "'BTNicon2H'" + '"' + 'onMouseOut=' + '"this.className=' + "'BTNicon2'" + '"' + 'onFocus="this.className=' + "'BTNicon2H'" + '"' + 'onBlur="this.className=' + "'BTNicon2'" + '" name=\'navNext\' id=\'navNext\'>';
    browsermenuHTML +="<span tabindex=\'-1\' class=\'ICOnext\'></BUTTON></td>";
    browsermenuHTML +='<td><BUTTON class=\'BTNicon2\' onclick=\'displayLastPage()\' title=Last  onMouseOver="' + 'this.className=' + "'BTNicon2H'" + '"' + 'onMouseOut=' + '"this.className=' + "'BTNicon2'" + '"' + 'onFocus="this.className=' + "'BTNicon2H'" + '"' + 'onBlur="this.className=' + "'BTNicon2'" + '" name=\'navLast\' id=\'navLast\'>';
    browsermenuHTML +="<span tabindex=\'-1\' class=\'ICOlast2\'></BUTTON></td>";

    browsermenuHTML +="<input type=\'hidden\' id=\'currentCriteria\' value=\'\'>";
    browsermenuHTML +="<td><IMG height=\'1\' alt=\'\'  src="+spaceImg+" width=\'10\'></td><td><span class=\'SPNtext\' for=\'gotopage\' >Jump to page</span></td>";
    browsermenuHTML +="<td><label class=\'LBLinv\' for=\'goto\'></label><INPUT class=\'TXTstd\' id=\'goto\' size=\'1\' name=\'gotopage\'></td>";
    browsermenuHTML +='<td><BUTTON class=\'BTNtext\' onclick=\'goToPage()\' title=Reset  onMouseOver="' + 'this.className=' + "'BTNtextH'" + '"' + 'onMouseOut=' + '"this.className=' + "'BTNtext'" + '"' + 'onFocus="this.className=' + "'BTNtextH'" + '"' + 'onBlur="this.className=' + "'BTNtext'" + '" name=go value=\'Go\'>';
    browsermenuHTML +="Go</BUTTON></td></tr></table></div></DIV>";

    browsermenuHTML +="<div class=\'DIVtblbox1\' id=\'BPELTaskDetails\' style=\'overflow:auto;width:100%; height: 200px;\'>";
    browsermenuHTML +="<table class=\'TBLone\' name=\'taskdetails\' id=\'tblTaskList\' summary=\'\' style='width:100%'><thead id=\'hdrTaskList\'></thead>"; //12.0.2 SOATEAM
    browsermenuHTML +="<tbody id=\'bdyTaskList\' onkeydown=\"return fnHandlexBPELTaskListOnKeyDown(event)\"></tbody></table></div>";
//12.0.2 SOATEAM Changes Starts
    browsermenuHTML +="<DIV id=\'BPELTaskhistoryHeader\' class=\"TASKLIST_CAP\" >";
//browsermenuHTML +="<div class=\'DIVcaption1\' id=\'HeaderSummary\' style=\"height:0.8em\">"; //18501338 Changes
browsermenuHTML +="<div class=\'DIVcaption1\' id=\'HistoryHeaderSummary\' style=\"height:0.8em\">"; //18501338 Changes
browsermenuHTML += '<div id="taskdboardHistorytablistDiv" class="DBoardHeadDiv">';
browsermenuHTML +='<a id="taskdboardHistorytablistHistory" title="'+labelhistory+'" onclick="doHistoryTabActions(\'History\',event)">';
browsermenuHTML +='<span class="DBoardHeadDivSpanSel">&nbsp;'+labelhistory+'</span>';
browsermenuHTML +='</a>';
browsermenuHTML +='<a id="taskdboardHistorytablistInteractions"  title="'+labelInteractions+'" onclick="doHistoryTabActions(\'Interactions\',event)" >';
browsermenuHTML +='<span class="DBoardHeadDivSpanDeSel">&nbsp;'+labelInteractions+'</span>';
browsermenuHTML +='</a>';
browsermenuHTML +='<a id="taskdboardHistorytablistDocuments"  title="'+labeldocs+'" onclick="doHistoryTabActions(\'Documents\',event)">';
browsermenuHTML +='<span class="DBoardHeadDivSpanDeSel">&nbsp;'+labeldocs+'</span>';
browsermenuHTML +='</a>';
browsermenuHTML +='<a id="taskdboardHistorytablistAdvices" title="'+labeladvices+'" onclick="doHistoryTabActions(\'Advices\',event)" >';
browsermenuHTML +='<span class="DBoardHeadDivSpanDeSel">&nbsp;'+labeladvices+'</span>';
browsermenuHTML +='</a>';
//12.1 Changes Starts
browsermenuHTML +='<a id="taskdboardHistorytablistSchedule" title="'+labelSchedule+'" onclick="doHistoryTabActions(\'Schedule\',event)" >';
browsermenuHTML +='<span class="DBoardHeadDivSpanDeSel">&nbsp;'+labelSchedule+'</span>';
browsermenuHTML +='</a>';
//12.1 Changes Ends
browsermenuHTML +='</div>';	
browsermenuHTML +='<div style="clear:both; width:99%;background:none" class="DIVpage"><h2 id="workflowRefNo" class="SPNpageH"></h2><button class="BTNtext" id="BTNrecalcSchedule" onclick="reCalcSchedule(undefined,\'HISTORY\');" style="float:right;display:none">'+recalcSch+'</button></div>';	
//    browsermenuHTML +="<h2 class=\"SPNpageH\" style=\"margin:0px 3px 0px 3px\">"+labelTaskHistory+"</h2></div></div>";
	browsermenuHTML +="</div></div>";
//12.0.2 SOATEAM Changes Ends
    browsermenuHTML +="<div class=\"DIVtblbox1\" id=\"BPELTaskHistoryDetails\" style=\"overflow: auto; width: 100%;\">";
    browsermenuHTML +="<table  name=\'tblTaskHistory\' id=\'tblTaskHistory\'  class=\'TBLone\' style=\'width:99%\' summary=\'\'>";
    browsermenuHTML +="<thead id=\'hdrTaskHistory\'></thead><tbody id=\'bdyTaskHistory\' onkeydown=\"return fnHandlexBPELTaskHistoryOnKeyDown(event)\"></tbody></table></div></div></div></div>";
    return browsermenuHTML;
}

var ParentArgs = "";
var dashboardArgs = "";

function dispHref1Dashboard(funcid,parentSeqNo) {
    dashboardArgs = parentSeqNo;
     dispHref(funcid, '', '', '','');
     
}

function dispHref1(funcid,parentSeqNo, fromSummary) {
    ParentArgs = parentSeqNo;
    dispHref(funcid, '', '', '', '', '', fromSummary);
}

//function dispHref(funcid, uiName, finalRights, drillDownQry, fromMDB,txnstatus, fromSummary) { //9NT1606_14_5_PROTEGO_TRUST_34569395 - Commented
function dispHref(funcid, uiName, finalRights, drillDownQry, fromMDB,txnstatus, fromSummary, fromFastPath) { //9NT1606_14_5_PROTEGO_TRUST_34569395
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    //mask(); /*To mask when system is processing*/	 //REDWOOD_CHANGES
	  if(!isMenuBuilt){ //citi uichange start
      postLoginDetails();
      isMenuBuilt = true;
    }//citi ui change end
    //document.getElementById("vTabDB_DASHBOARD").innerHTML = "";	
    var numeric="";    
    funcid = funcid.replace(/\s/g,'');
    document.getElementById("fastpath").value = funcid;
	/*Fix for BugNo:17588723 starts*/
     if(funcid.indexOf(" ") != -1 || funcid.length >8) {
        var message = getCommonErrorList()["ST-COM040"];
        message = message.substring(0, message.lastIndexOf("~"));
        alertAction = "INVFUNC";
        //mask(); //REDWOOD_CHANGES
        showAlerts(fnBuildAlertXML("ST-COM040", "E", message), "E");
        return false;
    } 
    /*Fix for BugNo:17588723 ends*/
    if (funcid != "" && funcid != "null") {
		//Fix for 	17173879 	start
		if (/[^A-Z|0-9|%]/.test(funcid)) {
              var message = getCommonErrorList()["IR-4003"];
              message = message.substring(0, message.lastIndexOf("~"));
                alertAction = "INVFUNC";
                //mask(); //REDWOOD_CHANGES
                showAlerts(fnBuildAlertXML("IR-4003", "E", message), "E");
                return false;
           
          }
		  //Fix for 	17173879 end
        var xmlDOM = loadXMLDoc(gXmlMenu);
        var tmpFunc = selectSingleNode(xmlDOM, "//*[@FNID = '" + funcid + "']"); 
		/*Fix for 17003695 Starts*/
        var tmpFunc = selectSingleNode(xmlDOM, "//*[@FNID = '" + funcid + "']");       		
        if (tmpFunc == null || typeof(tmpFunc) == 'undefined' ||tmpFunc.getAttribute("TYPSTR") == 'D') {
            numeric = selectSingleNode(xmlDOM, "//*[@USER_FNID = '" + funcid + "']");
            if(numeric !=null && typeof(numeric) !='undefined') {    /*Fix for 17043229*/           
                funcid = numeric.getAttribute("FNID");
                numeric = numeric.getAttribute("USER_FNID");
            }
            //9NT1606_14_5_PROTEGO_TRUST_34569395 Starts
            else if (fromFastPath == 'FP') {
                var message = getCommonErrorList()["ST-COM040"];
                message = message.substring(0, message.lastIndexOf("~"));
                alertAction = "INVFUNC";
                mask();
                showAlerts(fnBuildAlertXML("ST-COM040", "E", message), "E");
                return false;

	       }
           //9NT1606_14_5_PROTEGO_TRUST_34569395 Ends
        }
		/*Fix for 17003695 Ends*/
       /* if (tmpFunc == null || typeof(tmpFunc) == 'undefined' ||tmpFunc.getAttribute("TYPSTR") == 'D') {
            numeric = selectSingleNode(xmlDOM, "//*[@USER_FNID = '" + funcid + "']");
            if(numeric==null || typeof(numeric)=='undefined') {
                var message = getCommonErrorList()["ST-COM040"];
                message = message.substring(0, message.lastIndexOf("~"));
                alertAction = "INVFUNC";
                //mask(); //REDWOOD_CHANGES
                showAlerts(fnBuildAlertXML("ST-COM040", "E", message), "E");
                return false;
            } else {
                funcid = numeric.getAttribute("FNID");
                numeric = numeric.getAttribute("USER_FNID");
            }
        }*/
        var uiNameNode;
        if (funcid == 'CLRU') {
            var timeStamp = getDateObject();
            var title = "Clear user";
            /*var newWin = parent.showModelessDialog("ExtCLRUServlet?funcid=CLRU&uiName=CLRU.xml&timestamp=" + timeStamp.getTime() + "&description=" + title + "&numeric="+ numeric, winParams, "dialogTop:80px;dialogLeft:253px; dialogHeight:240px; dialogWidth:640px; help:yes; resizable:yes; scroll:no; status:no");
            parent.window.loadChildWindow(newWin);*/
            openWindow("testwin", "TempForward.jsp?action=ExtCLRUServlet&funcid=CLRU&uiName=CLRU.xml&timestamp=" + timeStamp.getTime() + "&description=" + title + "&numeric="+ numeric+"&debugFlag="+mainWin.DebugWindowFlg);
            return;
        }         

        var Function =  funcid;               
        if (funcid.substring(2, 3).toUpperCase() == 'S') {
            var Function = funcid.substring(0, 2) + "D" + funcid.substring(3, funcid.length);
        }
        uiNameNode = selectSingleNode(xmlDOM, "//*[@FNID = '" + Function + "']");
		//30620131 -- start
		if(uiNameNode == null && uiName == "") { uiNameNode = selectSingleNode(xmlDOM, "//*[@FNID = '" + funcid + "']"); }
		//30620131 --end
        if (uiNameNode) {
            for (var i = 0; i < uiNameNode.attributes.length; i++) {
                if (uiNameNode.attributes[i].nodeName == "UINAME") {
                    uiName = getNodeText(uiNameNode.attributes[i]);
                    break;
                } 
                if (uiNameNode.attributes[i].nodeName == "OFFLINEALLOWED"){
                    gOfflineAllowed = uiNameNode.getAttribute("OFFLINEALLOWED");
                    break;
                }
            }
        }
        var msgType = "WORKFLOW";
        var actionType = "initiate";
        if (gTxn != undefined && gTxn != null) {
            gTxn = '';
            gStage = '';
        }
	var timeStamp = getDateObject();
        var t = getDateObject();
        //var inTime=(t.getHours()*(3600*1000))+(t.getMinutes()*(60*1000))+(t.getSeconds()*1000)+t.getMilliseconds();
        var inTime= t.getTime();
        //Ashok Commented this as part of 12.1 , moved to SMSStartLogServlet
        //if(isSessionActive()) {
            if(multiBranchFunctions.indexOf(funcid) != -1 && multiBranchOperation == 'Y' && multiBrnScrOpened == false){
                fnOpenTxnBrnScreen("", funcid, uiName, finalRights, drillDownQry);
            }else{
                var txnBrn = "";
                multiBrnScrOpened = false;
                if (typeof(g_txnBranch) != "undefined" && g_txnBranch!="" )//21777011 
                    txnBrn = g_txnBranch;
                /*Customer changes start*/
                if(funcid == 'STDCULND'){
                  showCustomerTab("hTabCN_Customer", "TempForward.jsp?action=SMSStartLogServlet&funcid=" + funcid + "&uiName=" + uiName + "&msgType=" + msgType + "&actionType=" + actionType + "&timestamp=" + timeStamp.getTime() + "&numeric=" + numeric +"&parentArgs="+ ParentArgs+"&dashboardArgs="+ dashboardArgs + "&inTime=" + inTime+ "&txnBranch=" +txnBrn);  //Debug revert
                }/*Customer changes end*/
                else if(dashboardArgs != "" && dashboardArgs != undefined){
                    var dashboardWin = parent.document.getElementById(dashboardArgs).children[0].contentWindow;                    
                    openWindow("testwin", "TempForward.jsp?action=SMSStartLogServlet&funcid=" + funcid + "&uiName=" + uiName + "&msgType=" + msgType + "&actionType=" + actionType + "&timestamp=" + timeStamp.getTime() + "&numeric=" + numeric +"&parentArgs="+ ParentArgs+"&dashboardArgs="+ dashboardArgs + "&inTime=" + inTime+ "&txnBranch=" +txnBrn);  //Debug revert
                 }else{
                    if(typeof(fromSummary) == 'undefined'){
                        openWindow("testwin", "TempForward.jsp?action=SMSStartLogServlet&funcid=" + funcid + "&uiName=" + uiName + "&msgType=" + msgType + "&actionType=" + actionType + "&timestamp=" + timeStamp.getTime() + "&numeric=" + numeric +"&parentArgs="+ ParentArgs+"&dashboardArgs="+ dashboardArgs + "&inTime=" + inTime+ "&txnBranch=" +txnBrn);//Debug revert
                    }else{
                        openWindow("testwin", "TempForward.jsp?action=SMSStartLogServlet&funcid=" + funcid + "&uiName=" + uiName + "&msgType=" + msgType + "&actionType=" + actionType + "&timestamp=" + timeStamp.getTime() + "&numeric=" + numeric +"&parentArgs="+ ParentArgs+"&dashboardArgs="+ dashboardArgs + "&inTime=" + inTime+ "&txnBranch=" +txnBrn + "&fromSummary="+ fromSummary);//debug revert
                    }
                }
                ParentArgs = "";
                dashboardArgs = "";
				g_txnBranch = "";//21777011 
            }
        //}
    }
}

function openWindow(winId, src) {
    src = mainWin.addIframeReqParam(src); //session expiry change      
    var customWin       = document.createElement("div");
    customWin.id        = winId;
	/*25750614 starts*/
    //customWin.className = "dhtmlwindow functionCont";//HTML5 Changes
    customWin.className = "dhtmlwindow functionCont show";//HTML5 Changes
	/*25750614 ends*/
    customWin.style.position = "absolute";
    customWin.style.zIndex = 10;
    customWin.style.width = "100%";	//REDWOOD_CHANGES
    //customWin.style.top = document.getElementById("IFlauncher").style.top;//HTML5 Changes
    //setHorizontalPosition(customWin, false, (document.getElementById("vtab").offsetWidth + 2));//REDWOOD_CHANGES
    var customWinData = '<iframe id="ifr_LaunchWin"  style="width:100%" class="frames" src="'+ src +'" allowtransparency="true" frameborder="0" scrolling="no" title="" style="z-index:10"></iframe>';//REDWOOD_CHANGES
    customWin.innerHTML = customWinData;
    document.getElementById("IFlauncher").appendChild(customWin);
 //REDWOOD_CHANGES   
//    var mainDiv = null;
//   if(  parseInt(document.getElementById("dashboard").offsetHeight) > 0){
//   mainDiv =  document.getElementById("dashboard");
//   }
//   else{
//   mainDiv =  document.getElementById("MenuSearchDiv");
//   }
//   if (document.getElementById("vtab").style.display == "none") {
//        customWin.style.height =mainDiv.offsetHeight - 4 + "px";
//        customWin.children[0].style.height = mainDiv.offsetHeight - 4 + "px";
//        //customWin.style.width = x-document.getElementById("vtabMin").offsetWidth - 20 + "px";citi ui change start
//          customWin.style.width = x- 20 + "px";
//		//customWin.children[0].style.width = x-document.getElementById("vtabMin").offsetWidth - 20 + "px";   
//		customWin.children[0].style.width = x - 20 + "px";	//citi ui change end	
// }else{
//        customWin.style.height = mainDiv.offsetHeight - 4 + "px";
//        customWin.children[0].style.height =mainDiv.offsetHeight - 4 + "px";
//        customWin.style.width = x-document.getElementById("vtab").offsetWidth - 20 + "px";
//        customWin.children[0].style.width = x-document.getElementById("vtab").offsetWidth - 20 + "px";    
//    }		
//REDWOOD_CHANGES
    var winObj = document.getElementById(winId);
    winObj.style.visibility="visible";
    winObj.style.display="block";
    return winObj;
}

//FCUBS12.0.1 Fix for Bug 14761667 starts
function dispHrefDashboard(funcid, uiName, finalRights, drillDownQry, timestamp, srcType) {
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
//FCUBS12.0.1 Fix for Bug 14761667 ends    
    //mask(); /*To mask when system is processing*/	 //REDWOOD_CHANGES
    //document.getElementById("vTabDB_DASHBOARD").innerHTML = "";
	if(!isMenuBuilt){ //citi uichange start
      postLoginDetails();
      isMenuBuilt = true;
    }
    var numeric="";
    if (funcid != "" && funcid != "null") {
        var xmlDOM = loadXMLDoc(gXmlMenu);
        /*var tmpFunc = selectSingleNode(xmlDOM, "//*[@FNID = '" + funcid + "']");
        if (tmpFunc == null || typeof(tmpFunc) == 'undefined') {
            numeric = selectSingleNode(xmlDOM, "//*[@USER_FNID = '" + funcid + "']");
            if(numeric==null || typeof(numeric)=='undefined') {
                var message = getCommonErrorList()["ST-COM040"];
                message = message.substring(0, message.lastIndexOf("~"));
                alertAction = "INVFUNC";
                //mask(); //REDWOOD_CHANGES
                showAlerts(fnBuildAlertXML("ST-COM040", "E", message), "E");
                return false;
            } else {
                funcid = numeric.getAttribute("FNID");
                numeric = numeric.getAttribute("USER_FNID");
            }
        }*/
        var uiNameNode;
        var Function =  funcid;               
        if (funcid.substring(2, 3).toUpperCase() == 'S') {
            var Function = funcid.substring(0, 2) + "D" + funcid.substring(3, funcid.length);
        }
        uiNameNode = selectSingleNode(xmlDOM, "//*[@FNID = '" + Function + "']");
        if (uiNameNode) {
            for (var i = 0; i < uiNameNode.attributes.length; i++) {
                if (uiNameNode.attributes[i].nodeName == "UINAME") {
                    uiName = getNodeText(uiNameNode.attributes[i]);
                    break;
                } 
                if (uiNameNode.attributes[i].nodeName == "OFFLINEALLOWED"){
                    gOfflineAllowed = uiNameNode.getAttribute("OFFLINEALLOWED");
                    break;
                }
            }
        }
	//var timeStamp = getDateObject();
        var t = getDateObject();
        var inTime=(t.getHours()*(3600*1000))+(t.getMinutes()*(60*1000))+(t.getSeconds()*1000)+t.getMilliseconds();
      //  if(isSessionActive()) { //session expiry change  
            var txnBrn = "";
            multiBrnScrOpened = false;
            if (typeof(g_txnBranch) != "undefined" && g_txnBranch!= "") //21777011
                txnBrn = g_txnBranch;            
            //Fix for 29046893 starts
            if (typeof(msgType) == "undefined") {
                msgType = "";
            }
            if (typeof(actionType) == "undefined") {
                actionType = "";
            }
            //Fix for 29046893 ends
            //FCUBS12.0.1 Fix for Bug 14761667 starts
            openWindowDashboard("divpart"+funcid+timestamp.getTime(), "TempForward.jsp?srcType=" +srcType+"&action=SMSStartLogServlet&funcid=" + funcid + "&uiName=" + uiName + "&msgType=" + msgType + "&actionType=" + actionType + "&timestamp=" + timestamp.getTime() + "&numeric=" + numeric +"&parentArgs="+ ParentArgs + "&inTime=" + inTime+ "&txnBranch=" +txnBrn, funcid);//debug revert
            //FCUBS12.0.1 Fix for Bug 14761667 ends
            ParentArgs = "";       
			g_txnBranch = "" ;//21777011			
       // } //session expiry change  
    }
}

function dispCustImageDB(flag) {

    var customerNo = mainWin.custData[0];
    var accountNo = mainWin.accDataArray[0];
    var imageHTML = showAccountImage(accountNo, mainWin.brnCode, customerNo);
    var custImageDBhtml = "<fieldset class=\"FSTstd\"><legend>"+ getItemDesc("LBL_SIGNATORY_DETAILS") +"</legend><table id=\"tableImageSign" + curPage + "\">";
    custImageDBhtml += (imageHTML) + "</fieldset></table>";  /*12.0.2 Security*/ //Fix for 16906908 
    document.getElementById(custImageDiv+curPage).innerHTML = custImageDBhtml;
    document.getElementById('tableCustImage').id = 'tableCustImage'+curPage;
    document.getElementById('imageName').id = 'imageName'+curPage;
    document.getElementById('CustPic').id = 'CustPic'+curPage;
    document.getElementById('CustPrev').id = 'CustPrev'+curPage;
    document.getElementById('CustNext').id = 'CustNext'+curPage;
    document.getElementById('PHOTOS').id = 'PHOTOS'+curPage;
    
    document.getElementById('tableCustSign').id = 'tableCustSign'+curPage;
    document.getElementById('signName').id = 'signName'+curPage;
    document.getElementById('CustSign').id = 'CustSign'+curPage;
    document.getElementById('SignPrev').id = 'SignPrev'+curPage;
    document.getElementById('SignNext').id = 'SignNext'+curPage;
    document.getElementById('SIGNATURE').id = 'SIGNATURE'+curPage;
    fnCalcHgtCustomer(custImageDiv+curPage);
    fnPostCustImageDisplay(1, curPage);
    fnPostCustSignDisplay(1, curPage);
    unmask();
}

function fnPostCustImageDisplay(curImage, curDisaplyedTab){
    var imageValue = document.getElementById("PHOTOS"+curDisaplyedTab).value;
    var imgArr = imageValue.split("~");
    var totPage = imgArr.length;
    try {
        var prevBtn = document.getElementById("CustPrev"+curDisaplyedTab);
        var nextBtn = document.getElementById("CustNext"+curDisaplyedTab);
        //var curPage = Number(getInnerText(document.getElementById("CurrPageSV__" + pstrBlockID)));
        
        if (curImage == totPage && curImage != 1) {
            prevBtn.className = "BTNicon2";
            prevBtn.disabled = false;
            nextBtn.className = "BTNicon2D";
            nextBtn.disabled = true;
            return;
        } else if (totPage > 1 && curImage == 1) {
            prevBtn.className = "BTNicon2D";
            prevBtn.disabled = true;
            nextBtn.className = "BTNicon2";
            nextBtn.disabled = false;
        } else if (totPage > 1 && curImage > 1) {
            prevBtn.className = "BTNicon2";
            prevBtn.disabled = false;
            nextBtn.className = "BTNicon2";
            nextBtn.disabled = false;
        } else {
            prevBtn.className = "BTNicon2D";
            prevBtn.disabled = true;
            nextBtn.className = "BTNicon2D";
            nextBtn.disabled = true;
        }
    } catch (e) {}
    
}

function fnPostCustSignDisplay(curImage, curDisaplyedTab){
    var imageValue = document.getElementById("SIGNATURE"+curDisaplyedTab).value;
    var imgArr = imageValue.split("~");
    var totPage = imgArr.length;
    try {
        var prevBtn = document.getElementById("SignPrev"+curDisaplyedTab);
        var nextBtn = document.getElementById("SignNext"+curDisaplyedTab);
        //var curPage = Number(getInnerText(document.getElementById("CurrPageSV__" + pstrBlockID)));
        
        if (curImage == totPage && curImage != 1) {
            prevBtn.className = "BTNicon2";
            prevBtn.disabled = false;
            nextBtn.className = "BTNicon2D";
            nextBtn.disabled = true;
            return;
        } else if (totPage > 1 && curImage == 1) {
            prevBtn.className = "BTNicon2D";
            prevBtn.disabled = true;
            nextBtn.className = "BTNicon2";
            nextBtn.disabled = false;
        } else if (totPage > 1 && curImage > 1) {
            prevBtn.className = "BTNicon2";
            prevBtn.disabled = false;
            nextBtn.className = "BTNicon2";
            nextBtn.disabled = false;
        } else {
            prevBtn.className = "BTNicon2D";
            prevBtn.disabled = true;
            nextBtn.className = "BTNicon2D";
            nextBtn.disabled = true;
        }
    } catch (e) {}
    
}

function fnCalcHgtCustomer(winId){
var fieldsetNode = document.getElementById(winId).childNodes[0];
    document.getElementById(winId).style.height = parent.document.getElementById(winId).parentNode.offsetHeight + "px";
    document.getElementById(winId).style.width = parent.document.getElementById(winId).parentNode.offsetWidth/2 - 4 + "px";
    fieldsetNode.style.height = document.getElementById(winId).offsetHeight + "px";
    fieldsetNode.style.width = document.getElementById(winId).offsetWidth + "px";
    document.getElementById(winId).getElementsByTagName("TABLE")[0].style.height = "100%";
    document.getElementById(winId).getElementsByTagName("TABLE")[0].style.width = "100%";
}

function openWindowDashboard(winId, src, funcid) {
    src = mainWin.addIframeReqParam(src); //session expiry change  
    var customWinData = '<iframe id="ifr_LaunchWin" src="'+src+'" allowtransparency="true" frameborder="0" scrolling="no" title=""></iframe>';
    //document.getElementById(winId).innerHTML = customWinData;
    document.getElementById(winId).insertAdjacentHTML("beforeEnd", customWinData);
    //document.getElementById("ifr_LaunchWin").style.width = document.getElementById(winId).offsetWidth + "px";
}

function getHomeDashboard(xmlFile, xslName, func_Id) {

    var xmlDOM = loadXMLFile(xmlFile);
    var xslDOM = loadXSLFile(xslName);
    var params = new Array();
	params["funcId"] =  func_Id;
        params["tablename"] =  "Innertable_" + func_Id;
    var dashHTML = transform(xmlDOM, xslDOM, params);
    return dashHTML;
}


var isMenuBuilt = false; //citi ui change start
function showHideVtab(event) {
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    var menusearchDiv = document.getElementById("MenuSearchDiv");
	
	if(!isMenuBuilt){
      postLoginDetails(event);
      isMenuBuilt = true;
    }//HTML5 Changes Start
    if(document.getElementById("vtab").style.display == "none") {
        document.getElementById("divmenusearch").style.display = "block";
        document.getElementById("collapsedMenuHeader").style.display = "none";
        document.getElementById("vtab").style.display = "block";
        document.getElementById("leftpanel").className = "sPanl show";
        //document.getElementById("menuExpandCollapse").className = "hamMenu selected"; //REDWOOD_CHANGES
		document.getElementById("menuExpandCollapse").title = labelCollapseMenu;//HTML5 changes 24/OCT/2016 Fix for 24942196
/*       if('ONLINE' == brnHostLinkStatus && currentTab == "DBoardCustomer"){
            document.getElementById("vtab").style.zIndex = "1";
            document.getElementById("vtab").style.position  = 'absolute';
            //document.getElementById("vtab").style.top  = '75px';    
        }else{
            //document.getElementById("dashboard").style.width = x - document.getElementById("vtab").offsetWidth - 2 + "px";
            //document.getElementById("dashboard").style.marginTop = -(document.getElementById("vtab").offsetHeight + 2) + "px";
            //setHorizontalPosition(document.getElementById("dashboard"), true, (document.getElementById("vtab").offsetWidth + 2));
        }*/
        //menusearchDiv.style.width = x-(document.getElementById("vtab").offsetWidth+3)+"px";
        //menusearchDiv.style.marginTop =-(document.getElementById("vtab").offsetHeight + 1) + "px";
        //setHorizontalPosition(menusearchDiv, true, (document.getElementById("vtab").offsetWidth + 2));
        //document.getElementById("DIVTabContent"+currentTab).className = "DIVTwoColLyt";
    } else {
        document.getElementById("divmenusearch").style.display = "none";
//        document.getElementById("collapsedMenuHeader").style.display = "block"; //REDWOOD_CHANGES
        document.getElementById("vtab").style.display = "none";
        document.getElementById("leftpanel").className = "sPanl";
       // document.getElementById("menuExpandCollapse").className = "hamMenu"; //REDWOOD_CHANGES
		document.getElementById("menuExpandCollapse").title = labelExpandMenu;//HTML5 changes 24/OCT/2016 Fix for 24942196
        //document.getElementById("dashboard").style.width = x - 2 + "px";
        //document.getElementById("dashboard").style.marginTop = 2 + "px";
        //setHorizontalPosition(document.getElementById("dashboard"), true, 2);
        //menusearchDiv.style.width = x- 2+"px";
        //menusearchDiv.style.marginTop = 2 + "px";
        //setHorizontalPosition(menusearchDiv, true, 2);
        //document.getElementById("DIVTabContent"+currentTab).className = "DIVThreeColLyt";
    }//HTML5 Changes End
	/*if('ONLINE' == brnHostLinkStatus && currentTab == "DBoardCustomer"){
        document.getElementById('vtabMinCust').style.display = 'block';
    }	*/
    if (currentTab == "DBoardHome") {
        //document.getElementById("vtabMin").style.display = "block";
        document.getElementById("vTabCN_EXPLORE").style.display = "block";//12.0.2 SOATEAM
        document.getElementById("vTabCN_CENTRAL_PROCESS").style.display = "none";//12.0.2 SOATEAM        
        if((document.getElementById("DIVTabContent"+currentTab+curPage)) && (menusearchDiv.style.display != 'block')){
        document.getElementById("DIVTabContent"+currentTab+curPage).style.display = "block";
        //resetDBoardHeight();//HTML5 Changes
        }
    }
    //12.0.2 SOATEAM SOATEAM Starts
    else  if (currentTab == "DBoardTasks") {
        //document.getElementById("vtabMin").style.display = "block";
        document.getElementById("vTabCN_EXPLORE").style.display = "none";
        document.getElementById("vTabCN_CENTRAL_PROCESS").style.display = "block";
        if((document.getElementById("DIVTabContent"+currentTab)) && (menusearchDiv.style.display != 'block')){
          document.getElementById("DIVTabContent"+currentTab).style.display = "block";
          //resetDBoardHeight(); //REDWOOD_CHANGES
          //reCalcHeight();
        }
    }//12.0.2 SOATEAM SOATEAM Ends
    else {
        if (document.getElementById("vtab").style.display == "none") {
            //document.getElementById("vtabMin").style.display = "none";
            document.getElementById("dashboard").style.marginTop = 2 + "px";
            //document.getElementById("dashboard").style.marginLeft = 2 + "px";
            setHorizontalPosition( document.getElementById("dashboard"), true, 2);
            document.getElementById("dashboard").style.width = x - 2 + "px";
        }
    }
}
//citi ui change end
//REDWOOD_CHANGES
function toggleNavigation(state){
    if(!isMenuBuilt){
      postLoginDetails(event);
      isMenuBuilt = true;
      }
     return mainWinOffcanvasUtils[state]( {
                  displayMode: "overlay",
                  selector: "#leftpanel",
                  content: "#mainContent",
                  autoDismiss: "none"
              })
}
 //REDWOOD_CHANGES

 //12.1 Dashboard changes --start
function resetDBoardHeight() {
	//12.0.2 SOATEAM   Starts
	if (document.getElementById("DIVTabContent" + currentTab + curPage) || (currentTab == "DBoardTasks" && document.getElementById("DIVTabContent" + currentTab))) {
		var dashboardSec;
		if (document.getElementById("DIVTabContent" + currentTab + curPage))
			dashboardSec = document.getElementById("DIVTabContent" + currentTab + curPage).children;
		else 
			dashboardSec = document.getElementById("DIVTabContent" + currentTab).children;
		//12.0.2 SOATEAM Ends
    for (var i=0;i<dashboardSec.length;i++) {
    if(dashboardSec[i].id != 'hTab_DBoardTasks'){  //12.0.2 SOATEAM
        if (document.getElementById("vtab").style.display == "block")  {
            dashboardSec[i].className = "DIVTwoColSectionContainer";
        } else {
            dashboardSec[i].className = "DIVThreeColSectionContainer";
        }
        dashboardSec[i].style.width = document.getElementById("dashboard").offsetWidth - 4 + "px";
	var secId =dashboardSec[i].id;
			if (dashboardSec[i].id != 'hTab_DBoardTasks' && dashboardSec[i].id != 'DIVTaskArea' &&secId.indexOf('ChildWinfilter') == -1) { //12.0.2 SOATEAM
        var dashboardPart = dashboardSec[i].children;
        for (var j=0;j<dashboardPart.length;j++) {
        

                
              
	if(currentTab != "DBoardTasks" || dashboardPart[j].className != "DIVColumnDouble")
                  dashboardPart[j].className = "DIVColumnOne";
    //if ((document.getElementById("vtab").style.display == "none") && (currentTab != "DBoardMyDashBoard")) {
    if ((document.getElementById("vtab").style.display == "none") && (currentTab != "DBoardMyDashBoard") && (currentTab != "DBoardTasks" || dashboardPart[j].className != "DIVColumnDouble")) {
        dashboardPart[j].className = "DIVColumnOneAndHalf";
    }
    
    if(dashboardPart[j].id == 'custImageDiv'+curPage){
  
    
        continue;
    }
    
    var iframeDiv = dashboardPart[j].children[0];
    
      var srcType = iframeDiv.contentWindow.srcType;
    if(srcType == "M") {
        dashboardPart[j].className = "DIVColumnDouble";
        if ((document.getElementById("vtab").style.display == "none")&& (currentTab != "DBoardMyDashBoard")) {
            dashboardPart[j].className = "DIVColumnTriple";
        }
    } else if(srcType == "L") {
        dashboardPart[j].className = "DIVColumnTriple";
    }
    
    
    
        
            if(dashboardPart[j].children[0])
            
            if( currentTab != 'DBoardMyDashBoard' ){
                dashboardPart[j].children[0].contentWindow.fnCalcHgtDashboard();
            }
            else{
               dashboardPart[j].children[0].contentWindow.fnCalcHgtNonHomeDashboard();
            }
        }
    }
			}//12.0.2 SOATEAM
}
}
}
 //12.1 Dashboard changes --end
function reCalcHeight() {
    var dashboardSec = document.getElementById("DIVTabContent").children;
    for (var i=0;i<dashboardSec.length;i++) {
        if (document.getElementById("vtab").style.display == "block") {
            dashboardSec[i].className = "DIVTwoColSectionContainer";
        } else {
            dashboardSec[i].className = "DIVThreeColSectionContainer";
        }
        dashboardSec[i].style.width = document.getElementById("dashboard").offsetWidth - 4 + "px";
        var dashboardPart = dashboardSec[i].children;
        for (var j=0;j<dashboardPart.length;j++) {
            if (document.getElementById("vtab").style.display == "block") {
                if (dashboardPart[j].className == "DIVColumnTripple") {
                    dashboardPart[j].className = "DIVColumnDouble";
                } else {
                    dashboardPart[j].className = "DIVColumnOne";
                }
            } else {
                if (dashboardPart[j].className == "DIVColumnDouble") {
                    dashboardPart[j].className = "DIVColumnTripple";
                } else {
                    dashboardPart[j].className = "DIVColumnOneAndHalf";
                }
            }
            if(dashboardPart[j].children[0]){
                if(currentTab == "DBoardMyDashBoard"){
                dashboardPart[j].children[0].contentWindow.fnCalcHgtNonHomeDashboard();
                }else if (dashboardPart[j].id == "idBpelTaskDetails") {	 //12.0.2 SOATEAM  Starts
				     fnCalcBPELWinSize(); 
                }else{	//12.0.2 SOATEAM Ends
                dashboardPart[j].children[0].contentWindow.fnCalcHgtDashboard();
                }
            }
        }
    }
	if(document.getElementById("DIVTabContentDBoardTasks").children.namedItem('ChildWinDetail')) //12.0.2 SOATEAM
		document.getElementById("DIVTabContentDBoardTasks").children.namedItem('ChildWinDetail').children[0].contentWindow.fnCalcHgtDashboard();//12.0.2 SOATEAM
}

function getDBoardTabHTML(){/*HTML5 Changes Start*/
    var lablehome=mainWin.getItemDesc("LBL_HOME");
    var lablecustomer=mainWin.getItemDesc("LBL_CUSTOMER");
    var lableworkflow=mainWin.getItemDesc("LBL_WORKFLOW");
    var labletasks=mainWin.getItemDesc("LBL_TASKS");
    var lablemydashboard=mainWin.getItemDesc("LBL_DASHBOARD");
    var dashhtml="<div class=\'DIVdash\' id=\'DIVTaskAreaDashboard\' style=\'overflow:hidden\'>";
    dashhtml+="<div id='SYS_TBL_TABS' class='DIVtab tabbg2' style='clear:both'>";
    dashhtml+="<ul id='dboardtablist'>";
    dashhtml+="<li id=''>";
    dashhtml+="<a id='DBoardHome' selected='true' class='Htabsel' href='#hrefDBoardHome' tabindex='0' onkeydown='return handleTabKeys(this,event)' onmouseover='setTabClass(this,\"onmouseover\")' onblur='setTabClass(this,\"onblur\")' onmouseout='setTabClass(this,\"onmouseout\")' objclicked='true'  objvisited='true' title='(selected)' onclick='showDBoardTabs(\"DBoardHome\",event)'><span>&nbsp;"+lablehome+"</span></a></li>";
    dashhtml+="<li id=''>";
    dashhtml+="<a id='DBoardCustomer' selected='false' class='Htaball' href='#hrefDBoardCustomer' tabindex='0' onkeydown='return handleTabKeys(this,event)' onmouseover='setTabClass(this,\"onmouseover\")' onblur='setTabClass(this,\"onblur\")' onmouseout='setTabClass(this,\"onmouseout\")' objclicked='false'  objvisited='true' onclick='showDBoardTabs(\"DBoardCustomer\",event)'><span>&nbsp;"+lablecustomer+"</span></a></li>";
	/*FCUBS_Branch_Deprecation starts*/
    /*dashhtml+="<li id=''>";
	dashhtml+="<a id='DBoardWorkFlow' selected='false' class='Htaball' href='#hrefDBoardWorkFlow' tabindex='0' onkeydown='return handleTabKeys(this,event)' onmouseover='setTabClass(this,\"onmouseover\")' onblur='setTabClass(this,\"onblur\")' onmouseout='setTabClass(this,\"onmouseout\")' objclicked='false'   objvisited='true' onclick='showDBoardTabs(\"DBoardWorkFlow\",event)'><span>&nbsp;"+lableworkflow+"</span></a></li>";*/ //FCUBS_Branch_Deprecation ends
    dashhtml+="<li id=''>";
    dashhtml+="<a id='DBoardTasks' selected='false' class='Htaball' href='#hrefDBoardTasks' tabindex='0' onkeydown='return handleTabKeys(this,event)' onmouseover='setTabClass(this,\"onmouseover\")' onblur='setTabClass(this,\"onblur\")' onmouseout='setTabClass(this,\"onmouseout\")' objclicked='false'  objvisited='true' onclick='showDBoardTabs(\"DBoardTasks\",event)'><span>&nbsp;"+labletasks+"</span></a></li>";
    dashhtml+="<li id=''>";
    dashhtml+="<a id='DBoardMyDashBoard' selected='false' class='Htaball' href='#hrefDBoardMyDashBoard' tabindex='0' onkeydown='return handleTabKeys(this,event)' onmouseover='setTabClass(this,\"onmouseover\")' onblur='setTabClass(this,\"onblur\")' onmouseout='setTabClass(this,\"onmouseout\")' objclicked='false'  objvisited='true' onclick='showDBoardTabs(\"DBoardMyDashBoard\",event)'><span>&nbsp;"+lablemydashboard+"</span></a></li>";
    dashhtml+="</ul>";
    dashhtml+="</div>";
    dashhtml+="<div id='DIVTabContent'></div>";
    return dashhtml;
}/*HTML5 Changes End*/
//12.1 Retro_Changes Starts
function fnControlNavButtons()
{
 if(curPage == Math.ceil((gQueueNamesArr.split("!").length-1)/gNumOfPartition))
       document.getElementById('btnnext').disabled = true;
       else
       document.getElementById('btnnext').disabled = false;
     if(curPage == 1 )
       document.getElementById('btnprev').disabled = true;
     else
       document.getElementById('btnprev').disabled = false;
    return true;
}
//12.1 Retro_Changes Ends
function fnUpdateNavButtons(type,event){ //added event for cross browser issue 19972350
//12.1 Retro_Changes Starts
if (currentTab== "DBoardTasks")
{
    if (type == "NEXT")
    {
        curPage = curPage+1;
        displayDashboardQueue(gQueueNamesArr,gQueueTypesArr,gBamURLsArr,gFiledListsArr,gActionsArr,gDescArr,event);
    }
    if (type == "PREVIOUS")
    {
        curPage = curPage-1;
          displayDashboardQueue(gQueueNamesArr,gQueueTypesArr,gBamURLsArr,gFiledListsArr,gActionsArr,gDescArr,event);
    }
    fnControlNavButtons();
    return true;
}
//12.1 Retro_Changes ends
    var noOfDashboards = fetchSize;
    if(dashboardFuncsHome != "" && (dashboardFuncsHome.length-1 == dashboardFuncsHome.lastIndexOf("!"))){
        dashboardFuncsHome = dashboardFuncsHome.substring(0,dashboardFuncsHome.length-1);
    }
    var dBoardFuncArr = dashboardFuncsHome.split("!");
	dBoardFuncArr = elimDup(dBoardFuncArr);
    var dBoardArrLength = dBoardFuncArr.length;
    if(WokflowArr[fetchSize]=="SMSTXNDB"){
      fetchSize =3;
      dBoardFuncArr = WokflowArr;
      dBoardArrLength = dBoardFuncArr.length
    }
    if (dBoardArrLength <= fetchSize) 
        noOfDashboards = dBoardArrLength;
        prevPos  =pos;//Fix for 16958871 start
        var divId = "DIVTabContent"+currentTab;
		//FCUBS_Branch_Deprecation starts
    	/*if(currentTab == 'DBoardWorkFlow'){
      		divId = "ContentTransactionTab"+curWfTab;
    	}Fix for 16958871 end FCUBS_Branch_Deprecation ends */

        document.getElementById(divId+curPage).style.display = "none";
 //12.1 Dashboard changes --start
     
 //12.1 Dashboard changes --end
    switch (type) {
        case "PREVIOUS": {
            curPage = curPage-1;
            pos = (curPage * noOfDashboards) - noOfDashboards;
            break;
        }
        case "NEXT": {
            curPage = curPage+1;
            pos = ((curPage - 1) * noOfDashboards);
            break;
        }
        default:        
            return;
    }
    //12.1 Dashboard changes --start
    fnEnableNavbuttons();
   // if(prevPos != -1){
        //document.getElementById("DIVTabContent"+currentTab+prevPos).style.display = "none";
   // }
  
    	
      if(!(document.getElementById(divId+curPage))){//Fix for 16958871 
       
 
       fnShowDboardFuncs(dBoardFuncArr, divId );
      
      
      }
      else{

          document.getElementById(divId+curPage).style.display = "block";
          //  resetDBoardHeight();  /*umakant Changes Start*/  //REDWOOD_CHANGES
          fnRefreshDashBoardData1();
      }
     //12.1 Dashboard changes --end
    //Tuning Starts
    //unmask();	 //REDWOOD_CHANGES
    //Tuning Ends
}

function fnEnableNavbuttons(){
    if(dashboardFuncsHome != "" && (dashboardFuncsHome.length-1 == dashboardFuncsHome.lastIndexOf("!"))){
        dashboardFuncsHome = dashboardFuncsHome.substring(0,dashboardFuncsHome.length-1);
    }
    var dBoardFuncArr = dashboardFuncsHome.split("!");
    dBoardFuncArr = elimDup(dBoardFuncArr);
     if(WokflowArr[fetchSize]=="SMSTXNDB"){
      fetchSize = 3;
      dBoardFuncArr = WokflowArr;
      dBoardArrLength = dBoardFuncArr.length
    }
    var noOfPages = parseInt(dBoardFuncArr.length/fetchSize);
    if ((dBoardFuncArr.length%fetchSize) != 0 )
        noOfPages = noOfPages + 1;
    if (dBoardFuncArr.length > fetchSize) {
        document.getElementById('btnnext').disabled = false;
        if (curPage == 1) {
            document.getElementById('btnprev').disabled = true;
            document.getElementById('btnnext').disabled = false;
        }else if (curPage == noOfPages) {
            document.getElementById('btnprev').disabled = false;
            document.getElementById('btnnext').disabled = true;
        }else {
            document.getElementById('btnprev').disabled = false;
            document.getElementById('btnnext').disabled = false;
        }
    }
}

function fnShowDBoardHome(event, flag) {
    fetchSize = 4; //REDWOOD_CHANGES
	 if(gXmlMenu == "" &&  dashboardReqd == 'Y'){ //citi ui change start
      gXmlMenu = getmenuxml();
      } //citi ui change end
    if(!(document.getElementById('DIVTabContentDBoardHome'+curPage))){
        //Changed for HOME tab DashBoard loading --start
        dashboardFuncsHome='';
        if(mainWin.alerthomeReqd=='Y'){
            dashboardFuncsHome = "ITSREMNB!ITSALEDB!"+dashboardFuncs; 
             if(document.getElementById("DBoardMessages")){ //Added for 16983108
				document.getElementById("DBoardMessages").style.display = 'none';
			}
        }else{
            dashboardFuncsHome = dashboardFuncs;
//			 if(document.getElementById("DBoardMessages")){ //Added for 16983108  //REDWOOD_CHANGES
//				document.getElementById("DBoardMessages").style.display = 'block'; //REDWOOD_CHANGES
//			}
        }
        /*if(mainWin.nguiHomeReqd=='Y'){
            if(dashboardFuncsHome != '') {
                dashboardFuncsHome = "CSSNGUID!"+dashboardFuncsHome; 
            } else {
                dashboardFuncsHome = "CSSNGUID!"+dashboardFuncs;
            }
             if(document.getElementById("DBoardNextGenUI")){ //Added for 16983108
				document.getElementById("DBoardNextGenUI").style.display = 'none';
			}
        }else{
            dashboardFuncsHome = dashboardFuncs;
			 if(document.getElementById("DBoardNextGenUI")){ //Added for 16983108
				document.getElementById("DBoardNextGenUI").style.display = 'block';
			}
        } */       
        var dBoardFuncArr = dashboardFuncsHome.split("!");
        //feb8
        dBoardFuncArr = elimDup(dBoardFuncArr);
        //FCUBS12.0.1 Fix for Bug 14761667 starts
        pos = 0;
        if(dBoardFuncArr[0] == "" || dashboardReqd != 'Y'){
            document.getElementById("btnrefresh").disabled = true;
        } else {    
            fnShowDboardFuncs(dBoardFuncArr, 'DIVTabContentDBoardHome');
            fnEnableNavbuttons();          
        } 
    } else {
        pos = 0;
        if( dashboardReqd != 'Y'){
            document.getElementById("btnrefresh").disabled = true;
            return;
        }
        showBrowser("EXPLORE", event);
        document.getElementById('DIVTabContentDBoardHome'+curPage).style.display = 'block';
        //resetDBoardHeight();/*umakant Changes Start*/	 //REDWOOD_CHANGES
        fnEnableNavbuttons();
        fnRefreshDashBoardData1();
        
    }
    if(alertAction != "LOGIN")
    unmask();
}
dashboardFuncDetails.prototype.setSecDIV = setSecDIV;
dashboardFuncDetails.prototype.getPartDIV = getPartDIV;
dashboardCustDetails.prototype.setSecDIV = setSecDIV;
dashboardCustDetails.prototype.getPartDIV = getPartDIV;

function dashboardFuncDetails(dFuncId) {
    var parentFunction = dFuncId;
    var thirdChar = parentFunction.substring(2,3);
    if (thirdChar == "S") {
        parentFunction = parentFunction.substring(0,2) + "D" + parentFunction.substring(3,parentFunction.length);
    }
    this.funcId = dFuncId;
    if(dFuncId != "CUSTIMAGE"){
        this.xmlFile = loadXMLFile(UIXmlPath+"/"+LangCode+"/"+parentFunction+".xml");
        if(this.xmlFile ==null || typeof(this.xmlFile )=='undefined' || (getXMLString(this.xmlFile) == "")){
            var message = getCommonErrorList()["ST-COM040"];
            message = message.substring(0, message.lastIndexOf("~"));
            alertAction = "INVFUNC";
            //mask();//REDWOOD_CHANGES
            showAlerts(fnBuildAlertXML("ST-COM040", "E", message), "E");
            return false;
        }
        if(selectSingleNode(this.xmlFile, "FORM/SCREEN[@MAIN_WIN = 'Y']/@TMP_SCR_TYPE") == null){
            return false;
        }else{    
            this.scrType = getNodeText(selectSingleNode(this.xmlFile, "FORM/SCREEN[@MAIN_WIN = 'Y']/@TMP_SCR_TYPE"));
        }
    }else{
        this.xmlFile = "";
        this.scrType = 'S';
    }
}

function setSecDIV(divTabContent, partDIV) {
    var sectionClass = "DIVTwoColSectionContainer";
    if (document.getElementById("vtab").style.display == "none") {
        sectionClass = "DIVThreeColSectionContainer";
    }
    var secDiv = document.createElement("div");
    secDiv.className = sectionClass;
    secDiv.style.width = document.getElementById("dashboard").offsetWidth - 4 + "px";
    //12.0.2
    secDiv.style.height = document.getElementById("vTabDB_DASHBOARD").offsetHeight/3 - 4 + "px";
   
    secDiv.appendChild(partDIV);
    divTabContent.appendChild(secDiv);
}

function getPartDIV(timestamp) {
    var partDiv = document.createElement("div");
    partDiv.id = "divpart"+this.funcId+timestamp.getTime();
    partDiv.className = "DIVColumnOne";
    if (document.getElementById("vtab").style.display == "none") {
        partDiv.className = "DIVColumnOneAndHalf";
    }
    if(this.scrType == "M") {
        partDiv.className = "DIVColumnDouble";
        if (document.getElementById("vtab").style.display == "none") {
            partDiv.className = "DIVColumnTriple";
        }
    } else if(this.scrType == "L") {
        partDiv.className = "DIVColumnTriple";
    }
    return partDiv;
}


//preferences changes
function secContainer(divTabContent){

  this.divColSingleCnt = 0;
  this.divColDoubleCnt = 0;
  this.divColTripleCnt = 0;
  this.partDivDetailsArr = new Array();
  this.dBoardCnt  = 0;

  
 //REDWOOD_CHANGES 
   var sectionClass = "oj-sm-width-full oj-flex";
//    if (document.getElementById("vtab").style.display == "none") {
//        sectionClass = "DIVThreeColSectionContainer";
//    }	 
//REDWOOD_CHANGES
    this.secDiv = document.createElement("div");
    this.secDiv.className = sectionClass;
    //this.secDiv.style.width = document.getElementById("dashboard").offsetWidth - 4 + "px";//REDWOOD_CHANGES
    //this.secDiv.style.height = document.getElementById("vTabDB_DASHBOARD").offsetHeight/3 - 4 + "px";
    this.secDiv.style.height = divTabContent.getBoundingClientRect().height/2 + "px";	//REDWOOD_CHANGES
    divTabContent.appendChild(this.secDiv);
}

//preferences changes
secContainer.prototype.appendPartDiv = function(dBoardDivObj){

  this.secDiv.appendChild( dBoardDivObj.partDiv);
  this.partDivDetailsArr[ ++this.dBoardCnt] = dBoardDivObj.functionDetails;
   var currentscrType = dBoardDivObj.functionDetails.scrType ;
   if(currentscrType == 'S'){
    this.divColSingleCnt++;
   }
   else if(currentscrType == 'M'){
    this.divColDoubleCnt++;
   }
   else{
   this.divColTripleCnt++;
   }
}

//preferences changes
 function createPartDiv(functionId, timestamp){
 
  var partDiv = document.createElement("div");
 if(functionId == "CUSTIMAGE"){
 
	this.functionDetails = new dashboardCustDetails(functionId);
  partDiv.id = custImageDiv+curPage;
 }
 else{

    this.functionDetails = new dashboardFuncDetails(functionId);
    partDiv.id = "divpart"+this.functionDetails.funcId+timestamp.getTime();
 }


    
    if(currentTab == 'DBoardHome' || currentTab == 'DBoardMessages'){	//REDWOOD_CHANGES
    
     if(this.functionDetails.scrType == "S") {	
//REDWOOD_CHANGES
    partDiv.className = "oj-sm-width-1/2";
   
//    if( (document.getElementById("vtab").style.display == "none") && (currentTab != 'DBoardMyDashBoard')){
//        partDiv.className = "DIVColumnOneAndHalf";
//      
//    }		
//REDWOOD_CHANGES

    }
    
    if(this.functionDetails.scrType == "M") {		
//REDWOOD_CHANGES
        partDiv.className = "oj-sm-width-2/3";
//        if (document.getElementById("vtab").style.display == "none") {
//            partDiv.className = "DIVColumnTriple";
//           
//        }	  
//REDWOOD_CHANGES

    } else if(this.functionDetails.scrType == "L") {
        partDiv.className = "oj-sm-width-full";	 //REDWOOD_CHANGES

        }
        
    }
    else{
    if(this.functionDetails.scrType == "S") {
       partDiv.className = "oj-sm-width-1/3";  //REDWOOD_CHANGES
    }
    else if(this.functionDetails.scrType == "M") {
       partDiv.className = "oj-sm-width-2/3";	//REDWOOD_CHANGES
    }
    else if(this.functionDetails.scrType == "L") {
       partDiv.className = "oj-sm-width-full"; //REDWOOD_CHANGES

    }
    
    }
    this.partDiv = partDiv;

}

secContainer.prototype.getPartDiv = function(partDivPosition){

    return this.secDiv.childNodes[partDivPosition];

}





function setSecDIV(divTabContent, partDIV) {
    var sectionClass = "DIVTwoColSectionContainer";
    if (document.getElementById("vtab").style.display == "none") {
        sectionClass = "DIVThreeColSectionContainer";
    }
    var secDiv = document.createElement("div");
    secDiv.className = sectionClass;
    secDiv.style.width = document.getElementById("dashboard").offsetWidth - 4 + "px";
    //12.0.2
    secDiv.style.height = document.getElementById("vTabDB_DASHBOARD").offsetHeight/3 - 4 + "px";
   
    secDiv.appendChild(partDIV);
    divTabContent.appendChild(secDiv);
}

//preferences changes
function getPartDIV(timestamp) {
    var partDiv = document.createElement("div");
    partDiv.id = "divpart"+this.funcId+timestamp.getTime();
    if(currentTab == 'DBoardHome'){
    partDiv.className = "DIVColumnOne";
    if( (document.getElementById("vtab").style.display == "none") && (currentTab != 'DBoardMyDashBoard')){
        partDiv.className = "DIVColumnOneAndHalf";
    }
    
    if(this.scrType == "M") {
        partDiv.className = "DIVColumnDouble";
        if (document.getElementById("vtab").style.display == "none") {
            partDiv.className = "DIVColumnTriple";
        }
    } else if(this.scrType == "L") {
        partDiv.className = "DIVColumnTriple";
        }
        
    }
    else{
    if(this.scrType == "S") {
     partDiv.className = "DIVColumnOne";
    }
    
    else if(this.scrType == "M") {
    
     partDiv.className = "DIVColumnOneAndHalf";
    }
    else if(this.scrType == "L") {
    
     partDiv.className = "DIVColumnTriple";
    }
    
    }
    return partDiv;
}

//preferences changes
function fnShowDboardFuncs(dBoardFuncArr, dBoardId) {

    var divTabContent = null;
    if(!(document.getElementById(dBoardId+curPage))){
        divTabContent = document.createElement("div");
        divTabContent.setAttribute("id", dBoardId+curPage);
        ///Fix for 16958871 
		//FCUBS_Branch_Deprecation start
        //if(currentTab != 'DBoardWorkFlow'){ 
        document.getElementById(dBoardId).appendChild(divTabContent);
		
        /*}
        else{
        document.getElementById("ContentMainTransactionTab" + curWfTab).appendChild(divTabContent);
        }*/ 
		//FCUBS_Branch_Deprecation ends	   


 //REDWOOD_CHANGES
        divTabContent.style.height =  document.getElementById("mainContent").getBoundingClientRect().height + 'px'; 
        divTabContent.style.overflow = 'auto';
       // divTabContent.style.width =  document.getElementById("mainContent").offsetWidth  - 2+ 'px';
//REDWOOD_CHANGES
        
        
    } else{
        divTabContent = document.getElementById(dBoardId+curPage);
    }
    var j=0;
    if(dBoardFuncArr[0]=='SMSTXNDB'){
      fetchSize = 3;
    }
    var lastRecPos = pos + fetchSize;
    if((lastRecPos > dBoardFuncArr.length) || (currentTab == 'DBoardMyDashBoard')){
        lastRecPos = dBoardFuncArr.length;
    }
    
    if(lastRecPos < dBoardFuncArr.length && dBoardFuncArr[fetchSize]=='SMSTXNDB'){
          document.getElementById("btnnext").disabled=false;
        
    }
    if (dBoardFuncArr.length != 0) {
     var currentSecContainer = null;
     for(var i=pos;i<lastRecPos;i++) {     
        var timestamp = getDateObject();
            if (dBoardFuncArr[i] != "") {
                 var partDivObj = new createPartDiv(dBoardFuncArr[i] ,timestamp);
                 if(i == pos){
                  currentSecContainer = new secContainer(divTabContent);
                 }
                if(dBoardFuncArr[i] != "CUSTIMAGE"){
                  if(partDivObj.functionDetails.xmlFile == null || partDivObj.functionDetails.xmlFile.lastChild.tagName == "parsererror"){
                        continue;
                  }
                
                }
                if(currentSecContainer.divColSingleCnt ==0 && currentSecContainer.divColTripleCnt == 0 && currentSecContainer.divColDoubleCnt == 0){
                         currentSecContainer.appendPartDiv(partDivObj);
                  }
                else{
                   if(currentTab != 'DBoardMyDashBoard'){
                   
					   if(currentSecContainer.divColSingleCnt <=1 && (partDivObj.partDiv.className == 'oj-sm-width-1/2' || partDivObj.partDiv.className == 'oj-sm-width-1/3')) //citi ui change //REDWOOD_CHANGES
                        {
                            currentSecContainer.appendPartDiv(partDivObj);
                        } else {
                            currentSecContainer = new secContainer(divTabContent);
                            currentSecContainer.appendPartDiv(partDivObj);
                        }
                        }
                    else{
                      if((partDivObj.partDiv.className == 'oj-sm-width-full') || (currentSecContainer.divColTripleCnt ==1) ){//REDWOOD_CHANGES
                        currentSecContainer = new secContainer(divTabContent);
                        currentSecContainer.appendPartDiv(partDivObj);
                      }  
                      else if(partDivObj.partDiv.className == 'oj-sm-width-1/2' || partDivObj.partDiv.className == 'oj-sm-width-1/3'){//REDWOOD_CHANGES
                        if((currentSecContainer.divColDoubleCnt == 1 && currentSecContainer.divColSingleCnt == 0) || (currentSecContainer.divColDoubleCnt  == 0 && currentSecContainer.divColSingleCnt < 3)){
                          currentSecContainer.appendPartDiv(partDivObj);
                        }
                        else {
                          currentSecContainer = new secContainer(divTabContent);
                          currentSecContainer.appendPartDiv(partDivObj);
                        }
                     }
                     else if(partDivObj.partDiv.className == 'oj-sm-width-2/3'){//REDWOOD_CHANGES
                        if((currentSecContainer.divColDoubleCnt == 1) || (currentSecContainer.divColSingleCnt  > 1)){
                          currentSecContainer = new secContainer(divTabContent);
                          currentSecContainer.appendPartDiv(partDivObj);
                        }
                        else {
                          currentSecContainer.appendPartDiv(partDivObj);
                        }
                     }
                         
                    }
                  }
                  if(dBoardFuncArr[i] != "CUSTIMAGE"){
                  WrkResp[timestamp.getTime()] = WrkResp[i]; //To copy the value to timestamp location in the array
                  dispHrefDashboard(dBoardFuncArr[i], '', '', '',  timestamp, currentSecContainer.partDivDetailsArr[currentSecContainer.dBoardCnt].scrType);
                  sleep(1000); //REDWOOD_CHANGES
                  }
              }
              j=j+1;
            }
          }
}					
//REDWOOD_CHANGES
function sleep(milliseconds) {
  const date = Date.now();
  var currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}		
//REDWOOD_CHANGES
function fnShowDBoardCustomer(event) {    
    document.getElementById('btnprev').disabled = true;
    document.getElementById('btnnext').disabled = true;
    document.getElementById("btnrefresh").disabled = true;
    if('OFFLINE' == brnHostLinkStatus){
        showBrowser("CUSTOMER", event);
        unmask(); 
    }else{
        dispHref('STDCULND', "", "", "");
    }
}
//FCUBS_Branch_Deprecation starts
/*function fnShowDBoardWorkFlow(event){

    showBrowser("TELLER", event);
    fnToggleDisplay('WorkflowSearch');
    document.getElementById('btnprev').disabled = true;
    document.getElementById('btnnext').disabled = true;
    if(document.getElementById('ContentMainWorkflowSearch')== null ){
        var html=fnShowWorkFlowContent();
        document.getElementById("hTabCN_WORKFLOW").innerHTML = html;  
        document.getElementById('hTab_DBoardWorkFlow').style.display = 'block';
        calContainersize(document.getElementById('ContentMainWorkflowSearch'));
        doSearch2('','',event);
        getGroupcnt(mainWin.getItemDesc("LBL_PENDING"),'','load','',event); //Fix for 24570115
    }
         
    if(document.getElementById("btnrefresh").className == "Astdselected"){
       document.getElementById("btnrefresh").setAttribute("CLASS", "Abut");
    }
    unmask();

}*/ 
//FCUBS_Branch_Deprecation ends
//12.0.2 SOATEAM Starts
//12.1 Retro_Changes starts
var alertsEnabled = true;
var alertInterval=20;
var reminderAlertArray =new Array();
var toBeRemindedArray =new Array();
var remindedArray =new Array(); //RND Changes
var fnUpdateReminders = null;	
//12.1 Retro_Changes ends
function fnShowDBoardTasks(event){
    fnUpdateReminders = null;	 
	fnShowDBoardTasksTask(event);
	curr_page = 0;
	fnQuickViewShowDb(0);
        fnShowLandingPageDashBoard();
	//if (!is_bam_logged_in)
		//fn_login_bam();		
}
var curr_page = 0;
function fnEnableQuickNavi(type)
{
if(type == "P")
{
curr_page = curr_page - 1;
fnQuickViewShowDb(curr_page);
}
if(type == "N")
{
curr_page = curr_page + 1;
	fnQuickViewShowDb(curr_page);
}
}
function fnQuickViewShowDb(temp)
{
	var TEMPBPELDBXML = loadXMLDoc(parent.bpelDashBoardMenuXml);
	var queueNamesArr = new Array();
	var queueTypesArr = new Array();
	var bamURLsArr = new Array();
	var filedListsArr = new Array();
	var actionsArr = new Array();
	var descArr = new Array();
	var nodeArr = selectNodes(TEMPBPELDBXML,"//LEAF[@defaultId='Y' and @roleType='U']");
	var node ;
	if(nodeArr.length >0){
		node = nodeArr[0];
	}else {
		node = selectNodes(TEMPBPELDBXML,"//LEAF[@defaultId='Y' and @roleType='R']")[0];
	}
	if(node == null)
		return;
	queueNames = node.getAttribute('queueNames');
	queueTypes = node.getAttribute('queueTypes');
	bamURLs = node.getAttribute('bamUrl');
	filedLists = node.getAttribute('filedList');
	actions = node.getAttribute('actions');
	desc = node.getAttribute('desc');
	queueNamesArr = queueNames.split('!');
	queueTypesArr = queueTypes.split('!');
	bamURLsArr = bamURLs.split('!');
	filedListsArr = filedLists.split('!');
	actionsArr = actions.split('!');
	descArr = desc.split('!');
	temp_len = queueNamesArr.length;
	for(var j=0 ;j < (temp_len+1);j++)
	{
		if(queueNamesArr[j] != "")
		{
			que_len = j;
		}
		else if (queueNamesArr[j] == "")
		{	
			que_len = j-1;
			break;
		}
	}
	//if (que_len > 1 )
	if (que_len > 0 )
	{
    document.getElementById('btnnextqv').disabled = false;
		if (temp == 0) {
            document.getElementById('btnprevqv').disabled = true;
            document.getElementById('btnnextqv').disabled = false;
        }else if (temp == que_len) {
            document.getElementById('btnprevqv').disabled = false;
            document.getElementById('btnnextqv').disabled = true;
        }else {
            document.getElementById('btnprevqv').disabled = false;
            document.getElementById('btnnextqv').disabled = false;
        }
	}
		//document.getElementById("vTabCN_CENTRAL_PROCESSPart3").innerHTML='';
		dispDBQueue("vTabCN_CENTRAL_PROCESSPart3",queueNamesArr[temp],queueTypesArr[temp],bamURLsArr[temp],filedListsArr[temp],actionsArr[temp],descArr[temp]);
}
function fnShowDBoardTasksTask(event){
    /*
    document.getElementById("navDIV").style.display = 'block';
    document.getElementById("vTabCN_EXPLORE").style.display = 'none';
    document.getElementById("vTabCN_CUSTOMER").style.display = 'none';
    document.getElementById("vTabCN_TELLER").style.display = 'none';
    document.getElementById("vTabCN_CENTRAL_PROCESS").style.display = 'block';
    document.getElementById("vTabCN_PREFERENCES").style.display = 'none';
    //document.getElementById('vTab_HeadingTop').innerHTML = "Tasks";
  //  document.getElementById('vTab_HeadingTop').innerHTML = mainWin.getItemDesc("LBL_TASKS");
    */
    //21374072 Changes Starts
    document.getElementById("vTabCN_EXPLORE").style.display = 'none';
    document.getElementById("vTabCN_CENTRAL_PROCESS").style.display = 'block';
    //21374072 Changes Ends
	isTaskSearch =false;
	isFilterTask=false;
    //12.0.2 SOATEAM Ends
    document.getElementById("vTabCN_CENTRAL_PROCESS").innerHTML = "";    
    buildTaskArea();
    document.getElementById("DIVTabContent"+currentTab).innerHTML = getBPELTaskHTML();
    //12.1 Retro_Changes starts
    //document.getElementById('btnDiv12').style.display = "none"; 
    //document.getElementById('btnDiv').style.display = "none";
    document.getElementById('btnrefresh').disabled = true;
    document.getElementById('btnprev').disabled = true;
    document.getElementById('btnnext').disabled = true;
    //12.1 Retro_Changes Ends
    //document.getElementById("idBrwRefresh").setAttribute("onclick", "fnShowDBoardTasks(event)");  //12.0.2 SOATEAM
   //Tuning Starts
    unmask();
    //Tuning Ends
}

function fnShowDBoardMyDashBoard(event){
	//Prefrences changes
   //document.getElementById("DIVTabContentDBoardMyDashBoard").innerHTML = fnShowDetails();
   var actionType = "SEARCH_USER";
   usrDetails = fnUserPrefrenceSearch(actionType);
   if(usrDetails != null)usrDetails = usrDetails.split('~');
   if(usrDetails[1]=="null")usrDetails[1]="";//Fix for 17023412
   if(usrDetails[7]=="null")usrDetails[7]=""; //Fix for 22882946
   var userDBoardArray = new Array();
   userDBoardArray[0] = 'SMDUSRD1';
   userDBoardArray[1] = 'SMDUSRD2';
   userDBoardArray[2] = 'SMDUSRD3';
   userDBoardArray[3] = 'SMSUBRDB';
   userDBoardArray[4] = 'SMSULRDB';
   userDBoardArray[5] = 'SMSUBBDB';
   userDBoardArray[6] = 'SMSUABDB';
   document.getElementById('btnprev').disabled = true;
   document.getElementById('btnnext').disabled = true;
     if(!(document.getElementById('DIVTabContent'+currentTab+curPage))){
        //feb8
        fnShowDboardFuncs(userDBoardArray, 'DIVTabContentDBoardMyDashBoard');     
     }
     else{
     document.getElementById('DIVTabContent'+currentTab+curPage).style.display = 'block';
        fnRefreshDashBoardData1();
        //resetDBoardHeight();//REDWOOD_CHANGES
     }
  function fnUserPrefrenceSearch(userActionType){
        mainWin.fnUpdateScreenSaverInterval();
        var serverURL = "FCUserSearchServlet";
        var requestStr = '';
        requestStr = "<?xml version='1.0'?><FCUBS_REQ_ENV><FCUBS_HEADER><SOURCE>FLEXCUBE</SOURCE><UBSCOMP>FCUBS</UBSCOMP><USERID>" 
                        + mainWin.UserId + "</USERID><BRANCH/><DEPARTMENT/><SERVICE/><OPERATION/><MULTITRIPID/><FUNCTIONID/><ACTION>" + userActionType + "</ACTION>" +
                        "<MSGSTAT/><MODULEID>INFRA</MODULEID><MSGID/><ADDL><PARAM><NAME/><VALUE/></PARAM></ADDL></FCUBS_HEADER><FCUBS_BODY><REC/></FCUBS_BODY></FCUBS_REQ_ENV>";
        //var userSearchReqDom = loadXMLDoc(requestStr);
        //var strSearchData = getXMLString(userSearchReqDom);
        objHTTP = createHTTPActiveXObject(); 
		try{//9NT1606_12_2_RETRO_12_0_3_21182929 changes 
        objHTTP.open("POST", serverURL, false);
        objHTTP.setRequestHeader("Content-Type", "application/xml");
        objHTTP.setRequestHeader("charset", "utf-8");
        objHTTP.setRequestHeader("X-CSRFTOKEN", mainWin.CSRFtoken);
        objHTTP.send(requestStr);
		} //9NT1606_12_2_RETRO_12_0_3_21182929 changes start
         catch(exp){
          mainWin.handleNetWorkErr(exp);
        } //9NT1606_12_2_RETRO_12_0_3_21182929 changes end
        
        if (objHTTP.status != 200) //200 - OK
        {
            alert(mainWin.getItemDesc("LBL_QRY_FAIL_ERR_DESC") + "\"" + objHTTP.status + ":" + objHTTP.statusText + "\"");
        } else if (objHTTP.responseText == timeout_responseXML) {
            msgStat = 'F';
            openTimeOutPage();
        } else if (getXMLString(objHTTP.responseXML) != '') {        
            mainWin.inactiveTime = 0;
            var csrfNode = selectSingleNode(objHTTP.responseXML, "//CSRF");
            if (csrfNode != null && getNodeText(csrfNode) == "SM-00420") {
                alert(getNodeText(csrfNode) + mainWin.getItemDesc("LBL_REQUEST_TAMPERED"));
            }
             else if (selectSingleNode(objHTTP.responseXML, "//SESSION") != null && getNodeText(selectSingleNode(objHTTP.responseXML, "//SESSION")) == "EXPIRED") {//session expiry change  start
                //mainWin.mask(); //REDWOOD_CHANGES
                mainWin.sessionTimeOut = true;
                mainWin.showAlerts(fnBuildAlertXML("", "I", mainWin.getItemDesc("LBL_SESSION_EXPIRED")), "S");
                return false;
            }//session expiry change  end
            else {
                dataDOM = objHTTP.responseXML;
               
                if(getBrowser().indexOf("IE") != -1)//ie11 changes
                    dataDOM.setProperty("SelectionNamespaces", ns);
            }
        } else {
            alert(mainWin.getItemDesc("LBL_TRANS_FAILED"));
        }
        var detailStr = dataDOM.getElementsByTagName("REC")[0].childNodes[0].nodeValue;
        return detailStr;
    }  
   
   //Tuning Starts
    unmask();
    //Tuning Ends
}

function fnShowDBoardMessages(event){  
    document.getElementById('btnprev').disabled = true;
    document.getElementById('btnnext').disabled = true;    
    if(document.getElementById('DIVTabContentDBoardMessages'+curPage) == null){   
        var interactionDBoardArray = new Array(); 
        interactionDBoardArray[0] = 'ITSREMNB'; 
        interactionDBoardArray[1] = 'ITSALEDB'; 
        interactionDBoardArray[2] = 'ITSINTRD'; 
        pos=0; 
        //document.getElementById("vtab").style.display = 'none'; //REDWOOD_CHANGES 
        //document.getElementById("vtabMin").style.display = 'none';  citi ui change
        //feb8
        fnShowDboardFuncs(interactionDBoardArray, 'DIVTabContentDBoardMessages');
        unmask(); 
    } else{ 
        document.getElementById('DIVTabContent'+currentTab+curPage).style.display  = "block"; 
        //resetDBoardHeight(); //REDWOOD_CHANGES
        fnRefreshDashBoardData1(event); 
    } 
}

function fnShowDBoardNextGenUI(event) {
    document.getElementById('btnprev').disabled = true;
    document.getElementById('btnnext').disabled = true;    
    if(document.getElementById('DIVTabContentDBoardNextGenUI'+curPage) == null){   
        var nextGenUiDBoardArray = new Array(); 
        nextGenUiDBoardArray[0] = 'CSSNGUID'; 
        pos=0; 
        //document.getElementById("vtab").style.display = 'none'; //REDWOOD_CHANGES 
        //document.getElementById("vtabMin").style.display = 'none';  citi ui change
        //feb8
        fnShowDboardFuncs(nextGenUiDBoardArray, 'DIVTabContentDBoardNextGenUI');
        //unmask(); //REDWOOD_CHANGES
    } else{ 
        document.getElementById('DIVTabContent'+currentTab+curPage).style.display  = "block"; 
        //resetDBoardHeight(); //REDWOOD_CHANGES
        fnRefreshDashBoardData1(event); 
    } 
}
/*
function fnShowDetails(){
//12.1 Dashboard changes --start
   // document.getElementById("DIVTabContent").innerHTML = "";
   //12.1 Dashboard changes --end
    var actionType = "SEARCH_USER";
    var usrDetails = fnUserSearchPost(UserId, actionType);
    var detailArray = usrDetails.split("~");
   // var actionHTML = fnShowActionHTML();
    var userHTML = "<table width=\"100%\" cellspacing=\"0\"><tr>"
   userHTML += "<td><div id=\'fldstUserDetails\' class=FSTstd >";
    userHTML += "<legend>" + mainWin.getItemDesc("LBL_PERSONAL_DETAILS") + "</legend>";
    for (i = 0; i < detailArray.length; i++){
        if(i%2 == 0){  
            if(i == 12){
            userHTML += "</div></td>";
              userHTML += "<td><div id=\'fldstUserDetails\'  class=FSTstd>";
              userHTML += "<legend>" + mainWin.getItemDesc("LBL_SETTINGS") + "</legend>";  
            }
            if(i == 26){
                userHTML += "</div></td>";
              userHTML += " <td><div id=\'fldstUserDetails\'  class=FSTstd>";
              userHTML += "<legend>" +  mainWin.getItemDesc("LBL_LOGIN_DETAILS") + "</legend>";  
            }
            userHTML += "<div class=\'DIVText\'>";
            userHTML += "<label class=\'LBLstd\'  for='"+detailArray[i]+"'>" + detailArray[i] + "</label>";
            
        }
        else{            
                if (detailArray[i] != "null"){
                    if(i == 27){
                      var displayTS = fnFormatTimeStampString(detailArray[i]);
                      userHTML += "<input class='DashTXTro' readOnly=\'readonly\' type='text' size='8' value ='"+displayTS+"' onkeydown=\'return fnCSrchKeyEvents(event)\'>";
                    }else{
                      userHTML += "<input class='DashTXTro' readOnly=\'readonly\' type='text' size='8' value ='"+detailArray[i]+"' onkeydown=\'return fnCSrchKeyEvents(event)\'>";
                    }
                }else{
                    userHTML += "<input class='DashTXTro' readOnly=\'readonly\' type='text' size='8' value ='\'\ onkeydown=\'return fnCSrchKeyEvents(event)\'>";
                }
                userHTML += "</div>";            
        }
    }
    userHTML += "</div></td>";
   // userHTML += "<td>"+actionHTML +"</td></tr></table>";
   userHTML += "</tr></table>";
    return userHTML;
}
*/

function fnShowDetails(){
//12.1 Dashboard changes --start
   // document.getElementById("DIVTabContent").innerHTML = "";
   //12.1 Dashboard changes --end
    var actionType = "SEARCH_USER";
    var usrDetails = fnUserSearchPost(UserId, actionType);
    var detailArray = usrDetails.split("~");
   // var actionHTML = fnShowActionHTML();
    var userHTML = "<div class=\"DIVThreeColSectionContainer\" >"
   userHTML += "<div class=\"DIVColumnOne\"><fieldset  class=\'FSTcell\'>";
    userHTML += "<legend>" + mainWin.getItemDesc("LBL_PERSONAL_DETAILS") + "</legend>";
    for (i = 0; i < detailArray.length; i++){
        if(i%2 == 0){  
            if(i == 12){
            userHTML += "</fieldset></div>";
              userHTML += "<div class=\"DIVColumnOne\"><fieldset  class=\'FSTcell\'>";
              userHTML += "<legend>" + mainWin.getItemDesc("LBL_SETTINGS") + "</legend>";  
            }
            if(i == 26){
                userHTML += "</fieldset></div>";
              userHTML += " <div class=\"DIVColumnOne\" ><fieldset  class=\'FSTcell\'>";
              userHTML += "<legend>" +  mainWin.getItemDesc("LBL_LOGIN_DETAILS") + "</legend>";  
            }
            userHTML += "<div class=\'DIVText\'>";
            userHTML += "<label class=\'LBLstd\'  for='"+detailArray[i]+"'>" + detailArray[i] + "</label>";
            
        }
        else{            
                if (detailArray[i] != "null"){
                    if(i == 27){
                      var displayTS = fnFormatTimeStampString(detailArray[i]);
                      userHTML += "<input class='DashTXTro' readOnly=\'readonly\' type='text' size='8' value ='"+displayTS+"' onkeydown=\'return fnCSrchKeyEvents(event)\'>";
                    }else{
                      userHTML += "<input class='DashTXTro' readOnly=\'readonly\' type='text' size='8' value ='"+detailArray[i]+"' onkeydown=\'return fnCSrchKeyEvents(event)\'>";
                    }
                }else{
                    userHTML += "<input class='DashTXTro' readOnly=\'readonly\' type='text' size='8' value ='\'\ onkeydown=\'return fnCSrchKeyEvents(event)\'>";
                }
                userHTML += "</div>";            
        }
    }
    userHTML += "</fieldset></div>";
   // userHTML += "<td>"+actionHTML +"</td></tr></table>";
   userHTML += "</div>";
    return userHTML;
}



function fnShowActionHTML(){

   // var html = '<div class=\'SearchCaption\' id=\'DIVcaptionSR\' style=\'position:static; margin:0\'><h4 class="hh4"></h4></div>';
   var  html = '<div id=\'DIVresultsTBL1\' style=\'display:block; \'>';
    html += '<TABLE id = \"UserActions\" border=\'1 pt solid #00000\' width=\'100%\' style=cellpadding=\'3\' cellspacing=\'0\' class=\'TBLone\' summary=\'\' >';
    html += '<thead><tr><th scope=\'col\' class=\'TBLoneTH\'><a class=\'Astd\'>' + mainWin.getItemDesc("LBL_USER_ACTION") + '</a></th>';
    html += '<tr class=\'TBLoneTR\'>';
    html += '<td scope=\'row\' class=\'TDgrid\' onkeydown="return handleCustQueryKeyDownEvents(event)">';
    html += '<a class=\'Afoot\' style=\'text-decoration: underline\' HREF=\'#\' onclick=\'dispHref( \"SMDHOTKY\", \"\", \"\", \"\")\'>'+mainWin.getItemDesc("LBL_USER_HOTKEY")+'</a></td>';
    html += '</tr>';
    html += '<tr class=\'TBLoneTR\'>';
    html += '<td scope=\'row\' class=\'TDgrid\' onkeydown="return handleCustQueryKeyDownEvents(event)">';
    html += '<a class=\'Afoot\' style=\'text-decoration: underline\' HREF=\'#\' onclick=\'showChangePassword( \"SMUSRSET.jsp\")\'>'+mainWin.getItemDesc("LBL_DATE_AMOUNT_THEME")+'</a></td>';
    html += '</tr>';
    html += '<tr class=\'TBLoneTR\'>';
    html += '<td scope=\'row\' class=\'TDgrid\' onkeydown="return handleCustQueryKeyDownEvents(event)">';
    html += '<a class=\'Afoot\' style=\'text-decoration: underline\' HREF=\'#\' onclick=\'showChangePassword( \"SMCHGPWD.jsp\")\'>'+mainWin.getItemDesc("LBL_CHANGE_PASS")+'</a></td>';
    html += '</tr>';
    html += '<tr class=\'TBLoneTR\'>';
    html += '<td scope=\'row\' class=\'TDgrid\' onkeydown="return handleCustQueryKeyDownEvents(event)">';
    html += '<a class=\'Afoot\' style=\'text-decoration: underline\' HREF=\'#\' onclick=\'dispHref( \"SMDMBEAN\", \"\", \"\", \"\")\'>'+mainWin.getItemDesc("LBL_MBEAN_SHORTCUTS")+'</a></td>';
    html += '</tr>';
    html += '<tr class=\'TBLoneTR\'>';
    html += '<td scope=\'row\' class=\'TDgrid\' onkeydown="return handleCustQueryKeyDownEvents(event)">';
    html += '<a class=\'Afoot\' style=\'text-decoration: underline\' HREF=\'#\' onclick=\'dispHref( \"CLRU\", \"\", \"\", \"\")\'>'+mainWin.getItemDesc("LBL_CLEAR_USER")+'</a></td>';
    html += '</tr>';
    html += '</tbody></table></div>';
    return html;
}


function getMyDashboardHtml(){
    var MyDBoardHtml = "";
    //MyDBoardHtml += "<a name=\'User Search\'></a>";
    MyDBoardHtml += "<fieldset class=\'FSTcell\'>";
    MyDBoardHtml += "<legend class=\'invisible\'>" + "UserSearch" + "</legend>";
    MyDBoardHtml += "<div id=\'USERSEARCH\' class=\'DIVCustSearch\' style=\'height:8em\' onkeydown=\'return fnHTLBarKeyEvents(event);\' onmousedown=\'return fnHTLBarKeyEvents(event);\'>";
    MyDBoardHtml += "<div class=\'DIVText\'>";
    MyDBoardHtml += "<label class=\'LBLstd\' for=\'UserId\'>" + "User ID" + "</label>";
    MyDBoardHtml += "<input class=\'TXTstd\' NAME=\'UserId\' ID=\'UserId\' type='text' size='11' value = \'%\' onkeydown=\'return fnCSrchKeyEvents(event)\'>";
    MyDBoardHtml += "<button tabindex='-1' class='BTNimg' onclick='disp_lov(\"COMMON\", \"USERSEARCH\", \"USRID\", \"User Identification\", \"LOV_USRID_PREFERENCES\", \"\", \"\", \"\", \"\", event)' ";
    MyDBoardHtml +='onblur=\"this.className=\'BTNimg\'\" onmouseover=\"this.className=\'BTNimgH\'\" onfocus=\"this.className=\'BTNimgH\'\" ';
    MyDBoardHtml +='onmouseout=\"this.className=\'BTNimg\'\">';
    MyDBoardHtml +='<span tabindex="-1" class="ICOlov"></span>';
    MyDBoardHtml +='<span class="LBLinv">List Of Values</span>';
    MyDBoardHtml +='</button> ';
    MyDBoardHtml += "</div>";
    MyDBoardHtml += "<div class=\'DIVText\'>";
    MyDBoardHtml += "<label class=\'LBLstd\' for=\'UserName\'>User Name</label>";
    MyDBoardHtml += "<input class=\'TXTstd\' NAME=\'UserName\' ID=\'UserName\' type='text' size='11' value =\'%\' onkeydown=\'return fnCSrchKeyEvents(event)\'>";
    MyDBoardHtml += "</div>";
    /*MyDBoardHtml += "<div class=\'DIVText\'>";
    MyDBoardHtml += "<label class=\'LBLstd\' for=\'BrnCode\'>Branch Code</label>";
    MyDBoardHtml += "<input class=\'TXTstd\' NAME=\'BrnCode\' ID=\'BrnCode\' type='text' size='11' value =\'%\' onkeydown=\'return fnCSrchKeyEvents(event)\'>";
    MyDBoardHtml += "</div>";*/
    MyDBoardHtml += "<div class=\'DIVText\'>";
    MyDBoardHtml += "<label for=\'UserStat\' class=\'LBLstd\'>User Status</label>";
    MyDBoardHtml += "<input name=\'UserStat\' ID=\'UserStat\' type=\'text\' size=\'11\' class=\'TXTstd\' value =\'%\' onkeydown=\'return fnCSrchKeyEvents(event)\'>";
    MyDBoardHtml += "</div>";
    MyDBoardHtml += "<div class=\'DIVText\'>";
    MyDBoardHtml += "<label for=\'HomeBrn\' class=\'LBLstd\'>Home Branch</label>";
    MyDBoardHtml += "<input name=\'HomeBrn\' ID=\'HomeBrn\' type=\'text\' size=\'11\' class=\'TXTstd\' value =\'%\' onkeydown=\'return fnCSrchKeyEvents(event)\'>";
    MyDBoardHtml += "<button tabindex='-1' class='BTNimg' onclick='disp_lov(\"COMMON\", \"USERSEARCH\", \"HOME_BRN\", \"Home Branch\", \"LOV_HOMEBRN_PREFERENCES\", \"\", \"\", \"\", \"\", event)'";
    MyDBoardHtml +='onblur=\"this.className=\'BTNimg\'\" onmouseover=\"this.className=\'BTNimgH\'\" onfocus=\"this.className=\'BTNimgH\'\" ';
    MyDBoardHtml +='onmouseout=\"this.className=\'BTNimg\'\">';
    MyDBoardHtml +='<span tabindex="-1" class="ICOlov"></span>';
    MyDBoardHtml +='<span class="LBLinv">List Of Values</span>';
    MyDBoardHtml +='</button> ';
    MyDBoardHtml += "</div>";
    MyDBoardHtml += "<div class=\'DIVText\'>";
    MyDBoardHtml += "<label for=\'AutoAuth\' class=\'LBLstd\'>Auto Auth</label>";
    MyDBoardHtml += "<input name=\'AutoAuth\' ID=\'AutoAuth\' type=\'checkbox\' size=\'11\' class=\'CHKstd\' onkeydown=\'return fnCSrchKeyEvents(event)\'>";
    MyDBoardHtml += "</div>";
    MyDBoardHtml += "<div class=\'DIVText\'>";
    MyDBoardHtml += "<label for=\'MultiBrnAccess\' class=\'LBLstd\'>MultiBranch Access</label>";
    MyDBoardHtml += "<input name=\'MultiBrnAccess\' ID=\'MultiBrnAccess\' type=\'checkbox\' size=\'11\' class=\'CHKstd\' onkeydown=\'return fnCSrchKeyEvents(event)\'>";
    MyDBoardHtml += "</div>";
    MyDBoardHtml += "</div>";
    MyDBoardHtml += "<div style=\'height:1.3em; BACKGROUND-COLOR: #004eb4;text-align:right\'>";
    MyDBoardHtml += "<input id=\'btnSearch\' class = \'BTNfooter\' onClick=\'fnUserQuery()\' value=\'Search\' type=\'button\' name=\'btnSearch\'>";
    MyDBoardHtml += "<input id=\'btnReset\' class=\'BTNfooter\' value=\'Reset\' type=\'button\' name = \'btnReset\'>";
    MyDBoardHtml += "</div>";
    //MyDBoardHtml += "<fieldset class=\'FSTcell\'>";
    MyDBoardHtml += "<div id=\'USERDETAILS\' class=\'DIVCustSearch\'></div></fieldset>";
    return MyDBoardHtml;
    
}

function fnUserQuery(){
   
    var usrid = document.getElementById("UserId").value; 
    var actionType = "SEARCH_LOV";
    document.getElementById("DIVTabContent").innerHTML = "";
    var usrDetails = fnUserSearchPost(usrid, actionType);
    //var detailArray = usrDetails.split("~");
    var searchHTML = fnShowUserRecords(usrDetails, actionType);
    var actionHTML = fnShowActionHTML();
    var html = searchHTML + actionHTML;
    document.getElementById("USERDETAILS").innerHTML = "";
    document.getElementById("USERDETAILS").innerHTML = html;
}
    

function fnUserSearchPost(usrid, actionType){
   mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    var serverURL = "FCUserSearchServlet";
    if(actionType == 'SEARCH_LOV'){
        var usrname = document.getElementById("UserName").value;
        //var brncode = document.getElementById("BrnCode").value;
        var userstat = document.getElementById("UserStat").value;
        var homebrn = document.getElementById("HomeBrn").value;
        if (document.getElementById("AutoAuth").checked == true) {
            var AutoAuth = 'Y';
        } else {
            var AutoAuth = 'N';
        }
        if (document.getElementById("MultiBrnAccess").checked == true) {
            var MultiBrnAccess = 'Y';
        } else {
            var MultiBrnAccess = 'N';
        }
        var timeout_responseXML = '<RESP>TIMEOUT</RESP>';
        var xref = 'BRDUMMYCUSTQUERY';
        var func = 'QRYC';
        // CPU_JAN17_D_25214120 starts
        // var redCriteria = "1>"+usrid+"~2>"+usrname+"~3>"+userstat+"~4>"+homebrn+"~5>"+AutoAuth+"~6>"+MultiBrnAccess;
        var redCriteria = "1!"+usrid+"|2!"+usrname+"|3!"+userstat+"|4!"+homebrn+"|5!"+AutoAuth+"|6!"+MultiBrnAccess;
        // CPU_JAN17_D_25214120 ends
        var requestString = '';
        requestString += "<USRNAME>" + usrname + "</USRNAME>";
        requestString += "<USRTOSEARCH>" + usrid + "</USRTOSEARCH>";
        //requestString += "<BRNCODE>" + brncode + "</BRNCODE>";
        requestString += "<USRSTAT>" + userstat + "</USRSTAT>";
        requestString += "<HOMEBRN>" + homebrn + "</HOMEBRN>";
        requestString += "<AUTOAUTH>" + AutoAuth + "</AUTOAUTH>";
        requestString += "<MULTIBRNACCESS>" + MultiBrnAccess + "</MULTIBRNACCESS>";
        requestString += "<CRITERIA>" + redCriteria + "</CRITERIA>";
        requestString += "<ACTION>" + actionType + "</ACTION>";
        var reqURL = serverURL + "?funcid=" + func + "&actionType=" + actionType + "&XREF=" + xref + "&RedFldNames=" + redCriteria + "&fetchSize=5" + "&TotalPages=0" + "&CurPage=1";
        objHTTP = createHTTPActiveXObject(); 
		try{//9NT1606_12_2_RETRO_12_0_3_21182929 changes 
        objHTTP.open("POST", encodeURI(reqURL), false);
        objHTTP.setRequestHeader("Content-Type", "application/xml");
        objHTTP.setRequestHeader("charset", "utf-8");
        objHTTP.setRequestHeader("X-CSRFTOKEN", mainWin.CSRFtoken);
        objHTTP.send(requestString);
        } //9NT1606_12_2_RETRO_12_0_3_21182929 changes start
         catch(exp){
          mainWin.handleNetWorkErr(exp);
        } //9NT1606_12_2_RETRO_12_0_3_21182929 changes end
        if (objHTTP.status != 200) //200 - OK
        {
            alert(mainWin.getItemDesc("LBL_QRY_FAIL_ERR_DESC") + "\"" + objHTTP.status + ":" + objHTTP.statusText + "\"");
        } else if (objHTTP.responseText == timeout_responseXML) {
            msgStat = 'F';
            openTimeOutPage();
        } else if (getXMLString(objHTTP.responseXML) != '') {        
            mainWin.inactiveTime = 0;
            var csrfNode = selectSingleNode(objHTTP.responseXML, "//CSRF");
            if (csrfNode != null && getNodeText(csrfNode) == "SM-00420") {
                alert(getNodeText(csrfNode) + mainWin.getItemDesc("LBL_REQUEST_TAMPERED"));
            }
            else if (selectSingleNode(objHTTP.responseXML, "//SESSION") != null && getNodeText(selectSingleNode(objHTTP.responseXML, "//SESSION")) == "EXPIRED") {//session expiry change  start
                //mainWin.mask();//REDWOOD_CHANGES 
                mainWin.sessionTimeOut = true;
                mainWin.showAlerts(fnBuildAlertXML("", "I", mainWin.getItemDesc("LBL_SESSION_EXPIRED")), "S");
                return false;
            } //session expiry change  end
            else {
                dataDOM = objHTTP.responseXML;
                
                if(getBrowser().indexOf("IE") != -1)//ie11 changes
                    dataDOM.setProperty("SelectionNamespaces", ns);
            }
        } else {
            alert(mainWin.getItemDesc("LBL_TRANS_FAILED"));
        }
        var dataXML = getXMLString(dataDOM);
        var quote = new RegExp("\"", "g");
        dataXML = dataXML.replace(quote, "\\'");
        var newLine = new RegExp("\n", "g");
        dataXML = dataXML.replace(newLine, "");
        var detailStr = getNodeText(selectSingleNode(dataDOM, "//FCUBS_RES_ENV"));
        return detailStr;
    }
    else if(actionType == 'SEARCH_USER'){
        var requestStr = '';
        requestStr = "<?xml version='1.0'?><FCUBS_REQ_ENV><FCUBS_HEADER><SOURCE>FLEXCUBE</SOURCE><UBSCOMP>FCUBS</UBSCOMP><USERID>" 
                        + mainWin.UserId + "</USERID><USERTOSEARCH>" + usrid + "</USERTOSEARCH><BRANCH/><DEPARTMENT/><SERVICE/><OPERATION/><MULTITRIPID/><FUNCTIONID/><ACTION>" + actionType + "</ACTION>" +
                        "<MSGSTAT/><MODULEID>INFRA</MODULEID><MSGID/><ADDL><PARAM><NAME/><VALUE/></PARAM></ADDL></FCUBS_HEADER><FCUBS_BODY><REC/></FCUBS_BODY></FCUBS_REQ_ENV>";
        //var userSearchReqDom = loadXMLDoc(requestStr);
        //var strSearchData = getXMLString(userSearchReqDom);
        objHTTP = createHTTPActiveXObject();
        try{//9NT1606_12_2_RETRO_12_0_3_21182929 changes 		
        objHTTP.open("POST", serverURL, false);
        objHTTP.setRequestHeader("Content-Type", "application/xml");
        objHTTP.setRequestHeader("charset", "utf-8");
        objHTTP.setRequestHeader("X-CSRFTOKEN", mainWin.CSRFtoken);
        objHTTP.send(requestStr);
        } //9NT1606_12_2_RETRO_12_0_3_21182929 changes start
         catch(exp){
          mainWin.handleNetWorkErr(exp);
        } //9NT1606_12_2_RETRO_12_0_3_21182929 changes end 
        if (objHTTP.status != 200) //200 - OK
        {
            alert(mainWin.getItemDesc("LBL_QRY_FAIL_ERR_DESC") + "\"" + objHTTP.status + ":" + objHTTP.statusText + "\"");
        } else if (objHTTP.responseText == timeout_responseXML) {
            msgStat = 'F';
            openTimeOutPage();
        } else if (getXMLString(objHTTP.responseXML) != '') {        
            mainWin.inactiveTime = 0;
            var csrfNode = selectSingleNode(objHTTP.responseXML, "//CSRF");
            if (csrfNode != null && getNodeText(csrfNode) == "SM-00420") {
                alert(getNodeText(csrfNode) + mainWin.getItemDesc("LBL_REQUEST_TAMPERED"));
            }
            else if (selectSingleNode(objHTTP.responseXML, "//SESSION") != null && getNodeText(selectSingleNode(objHTTP.responseXML, "//SESSION")) == "EXPIRED") {//session expiry change  start
                //mainWin.mask(); //REDWOOD_CHANGES
                mainWin.sessionTimeOut = true;
                mainWin.showAlerts(fnBuildAlertXML("", "I", mainWin.getItemDesc("LBL_SESSION_EXPIRED")), "S");
                return false;
            } //session expiry change  end
            else {
                dataDOM = objHTTP.responseXML;
               
                if(getBrowser().indexOf("IE") != -1)//ie11 changes
                    dataDOM.setProperty("SelectionNamespaces", ns);
            }
        } else {
            alert(mainWin.getItemDesc("LBL_TRANS_FAILED"));
        }
        var detailStr = dataDOM.getElementsByTagName("REC")[0].childNodes[0].nodeValue;
        return detailStr;
    }
    
}


function fnShowUserRecords(data){
    
    var html = '<div class=\'SearchCaption\' id=\'DIVcaptionSR\' style=\'position:static; margin:0\'><h4 class="hh4">mainWin.getItemDesc("LBL_SEARCH_RESULTS")</h4></div>';
    html += '<div id=\'DIVresultsTBL1\' style=\'display:block; height:150ppx; overflow:auto\'>';
    html += '<TABLE id = \"UserQueryResults\" border=\'0\' width=\'100%\' style=\'table-layout:fixed \' cellpadding=\'3\' cellspacing=\'0\' class=\'TBLone\' summary=\'\' >';
    html += '<thead><tr><th scope=\'col\' class=\'TBLoneTH\'><a class=\'Astd\'>User Id</a></th>';
    html += '<th scope=\'col\' class=\'TBLoneTH\'><a class=\'Astd\'>User Name</a></th></tr></thead><tbody>';
    
        //var data = dataDOM.text;
        //var data = getNodeText(selectSingleNode(dataDOM, "//FCUBS_RES_ENV"));
        data = data.substring(0, data.length - 1);
        data = data.substring(0, data.lastIndexOf("!"));
        var dataarray = data.split("~");
        var firstUserInfo = "";
        if (trim(data) != "") {
            for (var i = 0; i < dataarray.length - 1; i += 6) {
                dataarray[i] = dataarray[i].replace('!', '');
                if (i % 12 == 0)
                html += '<tr class=\'TBLoneTR\'>';
                else
                html += '<tr class=\'TBLoneTRalt\'>';
                var userinfo = dataarray[i] + "~" + dataarray[i + 1] + "~" + dataarray[i + 2] + "~" + dataarray[i + 3] + "~" + dataarray[i + 4] + "~" + dataarray[i + 5];
                userinfo=fnEscape(userinfo);
                if(i == 0) firstUserInfo = userinfo;
                html += '<td scope=\'row\' onkeydown="return handleCustQueryKeyDownEvents(event)">';
                quote = new RegExp("\'", "g");  
                userinfo=userinfo.replace(quote, "&apos;");
                html += '<a class=\'Astd\' HREF=\'#\' onclick=\'getUserDetails( \"' + userinfo + '\")\'>' + dataarray[i] + '</a></td>';
                html += '<td onkeydown="return handleCustQueryKeyDownEvents(event)"><span class=\'SPNtext\' tabindex=0>' + dataarray[i + 1] + '</span></td>';
                html += '</tr>';
                }
            }
        html += "</tbody></TABLE></div>";
        html += "<div style=\"background-color:#004eb4;padding-bottom:1px; height:1.3em\">";
        html += "<table summary=\'\' style=\'margin: 0px 5px 5px 0px\' border = \"0\" cellpadding = \"0\" cellspacing = \"0\">";
        html += "<tbody><tr><td>&nbsp;</td>";
        html += "<td valign = \'middle\'><button class = \'Abut\' title = \'Previous\'><span title=\"Previous\" class=\"WidgetonePrevious\"></span></button></td>";
        html += "<td>&nbsp;</td>";
        html += "<td valign = \'middle\'><button class = \'Abut\' title = \'Next\'><span class=\"WidgetoneNext\" title=Next></span></button></td>";
        html += "<td>&nbsp;</td>";
        html += "</tr></tbody></table>";
        html += "</div>";
        return html;
}

function getUserDetails(userInformationArray){

    userInformationArray=fnUnEscape(userInformationArray);
    var userInformation = userInformationArray.split("~");
    var userId = userInformation[0];
    var userName = userInformation[1];
    var homeBranch = userInformation[2];
    var multiBrnAccess = userInformation[3];
    var actionType = "SEARCH_USER";
    var usrDetails = fnUserSearchPost(userId, actionType);
    var detailArray = usrDetails.split("~");
	var userHTML = '<div id = "dashboardContainer" style="overflow:hidden;">';
        userHTML += '<table id="dashtable" summary="" style="width:100%" border="0" cellpadding="0" cellspacing="7"><tbody>';
        userHTML += "<tr><td valign = \'top\' width = \'33.3%\'>";
        userHTML += "<div class=\'widgetonecontainer\'  id=\'widgetonecontainer2\' role=\'group\' aria-labelledby=\'widgetoneheading2\'>";
        userHTML += "<h2 class=\'widgetoneheading\' id=\'widgetoneheading1\'>&nbsp;User Details</h2>";
        userHTML += "<div class=\'csc\'><span class=\'tr\'></span>";
        userHTML += "<div class=\'widgetonetblbox\'>";
        userHTML += "<table summary=\'User Details\' class=\'TBLlyt\' width=\'100%\' border=\'0\' cellpadding=\'0\' cellspacing=\'0\'><tbody>";
        for (i = 0; i < detailArray.length; i++){
        if(i%2 == 0){
            //userHTML += "<div class=\'DIVText\'>";
            userHTML += "<tr><td>";
            userHTML += "<label class=\'LBLstd\' for=\'UserId\'>" + detailArray[i] + "</label>";
        }
        else{
            userHTML += "<input class='TXTro' NAME='UserDetail' ID=\'UserId\' type='text' size='11' value ='"+detailArray[i]+"' onkeydown=\'return fnCSrchKeyEvents(event)\'>";
            userHTML += "</td></tr>";
            //userHTML += "</div>";
        }
    }
	userHTML += "</tbody></table>";
	userHTML += "</div><span class=\'bl\'></span><span class=\'br\'></span></div></div>";	
	userHTML += "</td><td valign = \'top\' width = \'33.3%\'></td></tr>";
        userHTML += "</tbody></table></div>";
	document.getElementById('DIVTabContent').innerHTML = userHTML;
}


/*function fnShowCustSearch(searchType){
    
    var labelCustomer = getItemDesc("LBL_CUSTOMER");
    var labelCustName = getItemDesc("LBL_CUST_NAME");
    var labelCifId = getItemDesc("LBL_CIFID");
    var labelIdentifierVal = getItemDesc("LBL_IDENTIFIER_VAL");
	// FCUBS 11.4.0 - Search based on account no - Changes start (Bibilu)
	var labelAcBranch = getItemDesc("LBL_BRANCH");
	var labelCustAcNo = getItemDesc("LBL_ACC_NUMBER");
	// FCUBS 11.4.0 - Search based on account no - Changes end (Bibilu)
    var labelSearch = getItemDesc("LBL_SEARCH");
    var labelCustSearch = getItemDesc("LBL_CUST_SEARCH");
    
    var html = '';
    html += "<table id = \'dashtable\' role = \'presentation\' width = \'100%\' border = \"0\" cellpadding = \"0\" cellspacing = \"7\">";
    html += "<tbody>";
    html += "<tr><td valign = \'top\' width = \'33.3%\'></td>";
    html += "<td valign = \'top\' width = \'33.3%\'></td></tr>";
    html += "<tr></tr>";
    //html += "<tr><td valign = \'top\' width = \'33.3%\'></td>";
    //html += "<td valign = \'top\' width = \'33.3%\'></td></tr>";
    html += "</tbody></table>";    
    
    document.getElementById('DIVCustomerDetails').innerHTML = "";
    document.getElementById('DIVCustomerDetails').innerHTML = html;
    document.getElementById('DIVCustomerDetails').style.height = document.getElementById('dashboard').offsetHeight - document.getElementById('SYS_TBL_TABS').offsetHeight - document.getElementById('DIVM_Customer').offsetHeight - 4 + "px";
    
    if(searchType == 'Customer'){
    
    addEvent(document.getElementById('CustAccount'), "class","TBitem");
    addEvent(document.getElementById('CustDetails'), "class","TBitem current4");
    
    var customerHtml = '';
    customerHtml += "<div class = \'csc\' id = \'csc\'><span class = \'tr\'></span>";
    customerHtml += "<table border = \"0\" cellspacing = \"5\" cellpadding = \"0\" role = \'presentation\' id=\'CustQuery\'>";
    customerHtml += "<tr><td><label for = \'CustName\' class = \'LBLauto\'>" + labelCustName + "</label></td>";
    customerHtml += "<td><label class = \'LBLauto\' for = \'CFid\'>" + labelCifId + "</label></td>";
    customerHtml += "<td>&nbsp;</td></tr>";
    customerHtml += "<tr><td><input value = \'%\' size = \'11\' id = \'CustName\' name = \'CustName\' class = \'TXTstd\' type = \'text\'></td>";
    customerHtml += "<td><input value = \'%\' class = \'TXTstd\' size = \'11\' id = \'CFid\' name = \'CFid\' type = \'text\'></td>";
    customerHtml += "<td><button title=\' " + labelCustSearch + " \' onClick=\'fnCustomerQuery(\"Customer\")\' onblur=this.className = \'BTNtext\' onfocus=this.className = \'BTNtextH\' onmouseout=this.className=\'BTNtext\' onmouseover=this.className=\'BTNtextH\' class = \'BTNtext\' id = \'btnSearch\'>" + labelSearch + "</button></td></tr>";
    customerHtml += "<tr><td>&nbsp;</td>";
    customerHtml += "<td><label class = \'LBLauto\' for = \'CustIdentifier\'>" + labelIdentifierVal + "</label></td>";
    customerHtml += "<td>&nbsp;</td></tr>";
    customerHtml += "<tr><td><label class = \'LBLauto\' for = \'LinkedCustomers\'>Linked Customers<input class = \'CHKstd\' size = \'11\' id = \'LinkedCustomers\' name = \'LinkedCustomers\' type =\'checkbox\'></label></td>";
    customerHtml += "<td><input class = \'TXTstd\' size = \"11\" value = \'%\' id = \'CustIdentifier\' name = \'CustIdentifier\' type = \'text\'></td>";
    customerHtml += "<td>&nbsp;</td></tr>";
    customerHtml += "</table>";
    customerHtml += "<div class = \'widgetonecontainer\' id = \'CustResults\' role = \'group\' aria-labelledby = \'widgetoneheading1\'></div><span class=\"bl\"></span><span class=\"br\"></span></div>";
    }
    else if(searchType == 'Account'){
    
        addEvent(document.getElementById('CustDetails'), "class","TBitem");
        addEvent(document.getElementById('CustAccount'), "class","TBitem current4");
    
        var customerHtml = '';
        customerHtml += "<div class = \'csc\' id = \'csc\'><span class = \'tr\'></span>";
        customerHtml += "<table border = \"0\" cellspacing = \"5\" cellpadding = \"0\" role = \'presentation\'>";
        customerHtml += "<tr><td><label class = \'LBLauto\' for = \'AccountBranch\'>" + labelAcBranch + "</label></td>";
        customerHtml += "<td><label class = \'LBLauto\' for = \'CustAccountNo\'>" + labelCustAcNo + "</label></td>";
        customerHtml += "<td>&nbsp;</td></tr>";
        customerHtml += "<tr><td><input class = \'TXTstd\' size = \"11\" value = \'%\' id = \'CustBrn\' name = \'CustBrn\' type = \'text\'></td>";
        customerHtml += "<td><input class = \'TXTstd\' size = \'11\' value = \'%\' id = \'CustAccountNo\' name = \'CustAccountNo\' type = \'text\'></td>";
        customerHtml += "<td><button title=\' Account Search \' onClick=\'fnCustomerQuery(\"Account\")\' onblur=this.className = \'BTNtext\' onfocus=this.className = \'BTNtextH\' onmouseout=this.className=\'BTNtext\' onmouseover=this.className=\'BTNtextH\' class = \'BTNtext\' id = \'btnSearch\'>" + labelSearch + "</button></td></tr>";
        customerHtml += "</table>";
        customerHtml += "<div class = \'widgetonecontainer\' id = \'CustResults\' role = \'group\' aria-labelledby = \'widgetoneheading1\'></div><span class=\"bl\"></span><span class=\"br\"></span></div>";
    }
    document.getElementById('dashtable').tBodies[0].rows[0].cells[0].innerHTML = '';
    document.getElementById('dashtable').tBodies[0].rows[0].cells[1].innerHTML = '';
    if(document.getElementById('dashtable').tBodies[0].rows[1].cells[1]){
        document.getElementById('dashtable').tBodies[0].rows[1].cells[1].innerHTML ='';
        document.getElementById('dashtable').tBodies[0].rows[1].removeChild(document.getElementById('dashtable').tBodies[0].rows[1].cells[1]);
    }
    
    if(document.getElementById('dashtable').tBodies[0].rows[1].cells[0]){
        document.getElementById('dashtable').tBodies[0].rows[1].cells[0].innerHTML ='';
        document.getElementById('dashtable').tBodies[0].rows[1].removeChild(document.getElementById('dashtable').tBodies[0].rows[1].cells[0]);
    }
    //document.getElementById('dashtable').tBodies[0].rows[1].cells[0].innerHTML = '';
    //document.getElementById('dashtable').tBodies[0].rows[1].cells[1].innerHTML = '';
    document.getElementById('dashtable').tBodies[0].rows[0].cells[0].innerHTML = customerHtml;      
    document.getElementById('csc').style.height = (document.getElementById('DIVCustomerDetails').offsetHeight) / 2;
}
*/

function fnShowSearchTabWF() {
    //document.getElementById('WorkFlow_Tabs').style.display = "none";
    var html = fnShowSearchTaskList();
    //var target = document.getElementById('vTabDB_TELLER');
    //target.insertAdjacentHTML("beforeEnd", html);
    document.getElementById('WorkFlow_SearchTasks').innerHTML= html;
}

function fnShowWorkFlow(){
    var tabcnt = autopullerWFTab();
    var html= '';
    html=fnShowWorkFlowContent(tabcnt);
 //12.1 Dashboard changes start
    //document.getElementById('DIVTabContent').innerHTML=html;
    document.getElementById('DIVTabContent'+currentTab+pos).innerHTML=html;
//12.1 Dashboard changes end
showWFTabResult("Pending");       
}

function getDBoardTabLinks(){
    var tabobj = document.getElementById('dboardtablist');
    var tabobjlinks = tabobj.getElementsByTagName("A");
    return tabobjlinks;
}



function showDBoardTabs(tabid, event) {
	if('ONLINE' == brnHostLinkStatus){ 
//REDWOOD_CHANGES
        if(tabid != currentTab) {
            mainWin.document.getElementById(currentTab).parentNode.classList.remove("oj-selected");
            mainWin.document.getElementById(tabid).parentNode.classList.add("oj-selected");
        }  
//REDWOOD_CHANGES
    if(currentTab=="DBoardCustomer" && alertFlag==true){
        var tabLinkArr = mainWin.document.getElementById("CustomerSearch").parentNode.parentNode.getElementsByTagName("A")
        var activeTab;
        for(var cnt = 0; cnt < tabLinkArr.length; cnt++){
            if(tabLinkArr[cnt].getAttribute("objclicked") && tabLinkArr[cnt].getAttribute("objclicked")=="true"){
                activeTab = tabLinkArr[cnt].id;
            }
        }
        var iFrameObj = document.getElementById("Content"+activeTab).children[0].children[0];
		//Fix for 20894212 start
        if(iFrameObj.contentWindow.document.getElementById("ResTree") != null){
	        iFrameObj.contentWindow.showErrorAlerts('ST-CULN-005','C','',iFrameObj.parentNode.id);
	        iFrameObj.contentWindow.customAlertAction = "SWITCH_TAB";
	        iFrameObj.contentWindow.tabid = tabid; 
	        return;
		}
		//Fix for 20894212 end
    }
    alertFlag=false; //9NT1606_12_2_RETRO_12_0_3_23655640 changes 
    }
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    if(mainWin.CustomerObj != null){
        alert(mainWin.getItemDesc("LBL_END_PREV_CUST_SESSION"));
        return;
    }
    if(tabid == currentTab){
        return;
    }  
//REDWOOD_CHANGES
//    document.getElementById('MenuSearch').value  = "";
//    if(document.getElementById('MenuSearchDiv').style.display == 'block'){
//      document.getElementById('MenuSearchDiv').style.display = 'none';
//      document.getElementById('dashboard').style.display = 'block';
//    }
		   
//REDWOOD_CHANGES
	if('ONLINE' == brnHostLinkStatus && currentTab=="DBoardCustomer"){ 
        document.getElementById("ContentCustomerSearch").style.display = 'block';
        document.getElementById("CustomerSearch").setAttribute("objClicked", "true");//Customer Accessibilty
        document.getElementById("ContentCustomerSearch").children[0].id = 'testwin_cust';
        document.getElementById("ContentCustomerSearch").children[0].innerHTML = '';
		fnResetCustDetails(event); //Fix for 20850159 20856882 
		//Fix for 20856953 start
		gCustInfo = new Array();
        gNumCustWindows = 0;    
        arrCustWindows = new Array();
		//Fix for 20856953 end
		//document.getElementById("vtab").style.display = "none";	 
//REDWOOD_CHANGES
         //document.getElementById("vtab").style.position = "static";
         //document.getElementById("MenuSearchDiv").style.position = "relative";
         //document.getElementById("MenuSearchDiv").style.zIndex = "0";
//         if(document.getElementById("vtab").offsetWidth>0){
//             document.getElementById("dashboard").style.width = x - document.getElementById("vtab").offsetWidth - 2 + "px";
//             document.getElementById("dashboard").style.marginTop = -(document.getElementById("vtab").offsetHeight + 2) + "px";
//             setHorizontalPosition(document.getElementById("dashboard"), true, (document.getElementById("vtab").offsetWidth + 2));
//         }	
//REDWOOD_CHANGES
    }
    document.getElementById('DIVTabContent'+currentTab).style.height = "0px";
    if(document.getElementById('DIVTabContent'+currentTab+curPage)){
        document.getElementById('DIVTabContent'+currentTab+curPage).style.display = "none";
    }
    document.getElementById('DIVTabContent'+currentTab).style.display = "none";
    document.getElementById('DIVTabContent'+tabid).style.display = "block";
    document.getElementById('DIVTabContent'+tabid).style.height = document.getElementById("dashboard").offsetHeight + "px";
    //21374072 Changes Starts
    if  (currentTab=='DBoardTasks') {
            document.getElementById("vTabCN_EXPLORE").style.display = 'block';
         document.getElementById("vTabCN_CENTRAL_PROCESS").style.display = 'none';
    }
    //21374072 Changes Ends

    currentTab = tabid;
    pos = 0;
    curPage =1;
    document.getElementById('btnDiv12').style.display = "block";
    document.getElementById('btnDiv').style.display = "block";
    //if(currentTab == "DBoardHome"){//12.0.2 SOATEAM
   /* if(currentTab == "DBoardHome" || currentTab == "DBoardTasks" ){ //12.0.2 SOATEAM
        document.getElementById("vtab").style.display = "none";
		   document.getElementById("menuHeaderDiv").style.display = "block";//citi ui change
        document.getElementById("vtab").style.display = "block";
		 document.getElementById("menuHeaderDiv").style.display = "none";//citi ui change
    }Fixing citi issue*/
    
      //if(currentTab == "DBoardHome" || currentTab == "DBoardTasks" ){ //12.0.2 SOATEAM
        //document.getElementById("vtab").style.display = "none";
		// document.getElementById("menuHeaderDiv").style.display = "block";//Fix for 21110307 Fixing citi issue
    //} else {
       // document.getElementById("vtab").style.display = "block";
		 //document.getElementById("menuHeaderDiv").style.display = "none";//Fix for 21110307 Fixing citi issue
  //  }
    
    //showHideVtab();
    document.getElementById("btnrefresh").disabled = false;
    var tablinks = getDBoardTabLinks();
    var tabObj = document.getElementById(tabid);
    fnSetTabAttributes(tabObj, tablinks);
    //FCUBS12.0.1 Fix for Bug 14761667 starts
   // try {
        //eval('fnShow'+tabid+'(event)');
        var fnEval = new Function('event','fnShow'+tabid+'(event)');  
        fnEval(event);
   // } catch (e) {}
}

function getPrevDBTab(tabobjlinks){
     var prevtab;
    for (i = 0; i < tabobjlinks.length; i++) {
     if (tabobjlinks[i].getAttribute("objClicked") == "true") {
         prevtab=tabobjlinks[i].id;
     }
    }
    return prevtab;
}

function fnShowMDBTabContent(mdbtab){
    var MDBTablinks = getMDBTabs();
    highlightMDBTab(mdbtab,MDBTablinks);
    showMDBTabResult(mdbtab);     
}

function highlightMDBTab(aobject,tabobjlinks){
    for (i = 0; i < tabobjlinks.length; i++) {
        tabobjlinks[i].parentNode.id = "";
        addEvent(tabobjlinks[i], "class", "TBitem");
        tabobjlinks[i].removeAttribute(title);
    }
    addEvent(document.getElementById("MDBTab_"+aobject), "class","TBitem current4");
}

function getMDBTabs(){
    var tabobj = document.getElementById('MDBTabs');
    var tabobjlinks = tabobj.getElementsByTagName("A");
    return tabobjlinks;
}

function showMDBTabResult(tabid){
    try {
        tabid = tabid.toUpperCase()
        switch (tabid) {
            case "USERSETTINGS":
            {
                showUserSettings();
                break;
            }
            case "USERALERT":
            {
                updateUserAlertHtml();
                break;
            }             
        }
    } catch(e) {}
}

/*function showUserSettings(){
    var html = '<div style=\"overflow: auto; clear: both;\" id=\"dashboardContainer\">';
    html += '<a name=\"hrefMyDashBoard\"></a>';
    html += '<table width=\"100%\" cellspacing=\"7\" cellpadding=\"0\" border=\"0\" id=\"dashtable\" role=\"presentation\">';
    html += '<tbody></tbody>';
    html += '</table></div>';
    
    document.getElementById("MDBTabContent").innerHTML = "";
    document.getElementById("MDBTabContent").innerHTML = html;
    document.getElementById("dashboardContainer").style.height = document.getElementById("dashboard").offsetHeight - (document.getElementById("SYS_TBL_TABS").offsetHeight + document.getElementById("MDBTabs").offsetHeight) + "px";
    document.getElementById("dashboardContainer").style.width = document.getElementById("dashboard").offsetWidth + "px";
    updateUserSettingsHtml();
}

function updateUserSettingsHtml(){
    var title       = getItemDesc("LBL_USER_SETTINGS");
    var amtFmt      = getItemDesc("LBL_AMOUNT_FORMAT");
    var amtFormat1  = getItemDesc("LBL_DOTCOMMA");
    var amtFormat2  = getItemDesc("LBL_COMMADOT");
    var amtFormat3  = getItemDesc("LBL_COMMASPACE");
    var dtFmt       = getItemDesc("LBL_DATE_FORMAT");
    var dateFormat1 = getItemDesc("LBL_DATE_FORMAT1");
    var dateFormat2 = getItemDesc("LBL_DATE_FORMAT2");
    var dateFormat3 = getItemDesc("LBL_DATE_FORMAT3");
    var dateFormat4 = getItemDesc("LBL_DATE_FORMAT4");
    var dateFormat5 = getItemDesc("LBL_DATE_FORMAT5");
    var dateFormat6 = getItemDesc("LBL_DATE_FORMAT6");
    var dateFormat7 = getItemDesc("LBL_DATE_FORMAT7");
    var dateFormat8 = getItemDesc("LBL_DATE_FORMAT8");
    var theme       = getItemDesc("LBL_THEME");    
    var save        = getItemDesc("LBL_ACTION_SAVE");   
    var arrdefaultstyle = defaultstyle.split("!");
    var defaultStyleIndex    = -1;
    for(var i = 0; i < arrdefaultstyle.length; i++){
        if(arrdefaultstyle[i].indexOf("~D") != -1){
            defaultStyleIndex = i;
            break;
        }
    }
    var trElem = document.createElement("tr");
    trElem.id = "trElem"; 
    var tdElem = document.createElement("td");
    tdElem.style.width = "33.3%";
    tdElem.vAlign = "top";
    trElem.appendChild(tdElem);
    
    var userSettingHtml = '<div class=\"widgetonecontainer\" id=\"widgetonecontainer1\" role=\"group\" aria-labelledby=\"widgetoneheading1\">';
    //userSettingHtml += '<h2 class=\"widgetoneheading\" id=\"widgetoneheading1\">&nbsp;'+ title +'</h2>';
    userSettingHtml += '<div class=\"csc\" id=\"csc1\">';
    userSettingHtml += '<span class=\"tr\"></span>';
    userSettingHtml += '<div class=\"widgetonetblbox\" id=\"widgetonetblbox\">'; 
    userSettingHtml += '<table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" role=\"presentation\" id=\"TBLTABlist2\" class=\"TBLTABlist2\">';
    userSettingHtml += '<tbody><tr><td>';
    userSettingHtml += '<h2 class=\"widgetoneheading\" id=\"widgetoneheading\">&nbsp;'+ title +'</h2>';
    userSettingHtml += '</td>';
    userSettingHtml += '<td class=\"TDAuditButton\">';
    userSettingHtml += '<div style=\"width: auto;\" id=\"DIVTABlist1\" class=\"DIVTABlist1\">';
    userSettingHtml += '<ul class=\"TABlist2\">';
    userSettingHtml += '<li><a href=\"#&quot;\" onClick=\"saveUserSettings()\" class=\"TBitem\">'+save+'</a></li>';
    userSettingHtml += '</ul></div></td></tr></tbody></table>';
    userSettingHtml += '<div class=\"DIVColumnOne\" id=\"WNDcontent\">';
    userSettingHtml += '<br>';
    userSettingHtml += '<div class=\"DIVText\">';
    userSettingHtml += '<label class=\"LBLstd\" for=\"amtFmt\">'+ amtFmt +'</label>';
    userSettingHtml += '<select NAME=\"amtFmt\" ID=\"amtFmt\" onkeydown=\"return fnHandleScreenBtn(event)\">';
    userSettingHtml += '<option value=\".,\" selected>'+ amtFormat1 +'</option>';
    userSettingHtml += '<option value=\",.\" selected>'+ amtFormat2 +'</option>';
    userSettingHtml += '<option value=\", \">'+ amtFormat3 +'</option>';
    userSettingHtml += '</select></div>';
    userSettingHtml += '<div class=\"DIVText\">';
    userSettingHtml += '<label class=\"LBLstd\" for=\"dtFmt\">'+ dtFmt +'</label>';
    userSettingHtml += '<select NAME=\"dtFmt\" id=\"dtFmt\">';
    userSettingHtml += '<option value=\"M/d/yyyy\" selected>'+ dateFormat1 +'</option>';
    userSettingHtml += '<option value=\"M/d/yy\">'+ dateFormat2 +'</option>';
    userSettingHtml += '<option value=\"MM/dd/yy\">'+dateFormat3+'</option>';
    userSettingHtml += '<option value=\"MM/dd/yyyy\">'+dateFormat4+'</option>';
    userSettingHtml += '<option value=\"yy/MM/dd\">'+dateFormat5+'</option>';
    userSettingHtml += '<option value=\"yyyy-MM-dd\">'+dateFormat6+'</option>';
    userSettingHtml += '<option value=\"dd-MMM-yy\">'+dateFormat7+'</option>';
    userSettingHtml += '<option value=\"dd-MMM-yyyy\" selected>'+dateFormat8+'</option>';
    userSettingHtml += '</select></div>';
    userSettingHtml += '<div class=\"DIVText\">';
    userSettingHtml += '<label class=\"LBLstd\" for=\"cssStyle\">'+ theme +'</label>';
    userSettingHtml += '<select ID=\"theme\" Name=\"theme\">';
    for(var i = 0; i < arrdefaultstyle.length; i++){
        if(i==defaultStyleIndex){
            var styleValue = arrdefaultstyle[i].substring(0,arrdefaultstyle[i].indexOf("~D"));
            userSettingHtml += '<option value="'+ styleValue +'"  SELECTED>'+ getItemDesc("LBL_"+styleValue.toUpperCase()) +'</option>';
        }else{
            userSettingHtml += '<option value="'+ arrdefaultstyle[i] +'">'+ getItemDesc("LBL_"+arrdefaultstyle[i].toUpperCase()) +'</option>';
        }
    }
    userSettingHtml += '</select></div>';
    userSettingHtml += '<br>';
    //userSettingHtml += '<div class=\"DIVText\" style=\"margin-bottom:10px\">';
    //userSettingHtml += '<label class="LBLstd" for="">&nbsp;</label>';
    //userSettingHtml += '<button id=\"BTN_SAVE\" Title="'+save+'" onClick=\"saveUserSettings()\" class=\"BTNtext\" onkeydown=\"return fnHandleScreenBtn(event)\">'+save+'</button>&nbsp;';
    userSettingHtml += '</div></div><span class="bl"></span><span class="br"></span></div>';    
   
    tdElem.innerHTML = userSettingHtml;
    document.getElementById("dashtable").tBodies[0].appendChild(trElem);
    document.getElementById("widgetonecontainer1").style.width = (document.getElementById("dashboardContainer").offsetWidth)/2 + "px";
    document.getElementById("widgetonecontainer1").style.height = (document.getElementById("dashboardContainer").offsetHeight)/3 + "px";
    document.getElementById("csc1").style.width = document.getElementById("widgetonecontainer1").offsetWidth - 8 + "px";
    document.getElementById("csc1").style.height = document.getElementById("widgetonecontainer1").offsetHeight - 8 + "px";
    document.getElementById("widgetonetblbox").style.width = document.getElementById("widgetonecontainer1").offsetWidth - 8 + "px";
    document.getElementById("widgetonetblbox").style.height = document.getElementById("widgetonecontainer1").offsetHeight - 8 + "px";
    document.getElementById("WNDcontent").style.width = document.getElementById("TBLTABlist2").offsetWidth + "px";
    document.getElementById("WNDcontent").style.height = document.getElementById("widgetonetblbox").offsetHeight -  document.getElementById("TBLTABlist2").offsetHeight + "px";
    fnShowMDBFunctions('SMDHOTKY');
    fnShowMDBFunctions('SMDMBEAN');
    return false;
}*/

function fnShowMDBFunctions(funcid){     
    var trNull = document.createElement("tr");
    var trElem1 = document.createElement("tr");
    var tdElem = document.createElement("td");
    //tdElem.colSpan = "2";
    tdElem.vAlign = "top";
        
    if(funcid == "SMDHOTKY"){
        tdElem.innerHTML = '<div class=\"widgetonecontainer\" id=\"widgetonecontainer'+funcid+'\" role=\"group\" aria-labelledby=\"widgetoneheading3\"></div>';
        document.getElementById("trElem").appendChild(tdElem);
    }else{
        tdElem.innerHTML = '<div class=\"widgetonecontainer\" id=\"widgetonecontainer'+funcid+'\" role=\"group\" aria-labelledby=\"widgetoneheading4\"></div>';
        trElem1.appendChild(tdElem);
        document.getElementById("dashtable").tBodies[0].appendChild(trNull);
        document.getElementById("dashtable").tBodies[0].appendChild(trElem1);
    }    
    dispHrefDashboard(funcid,'','','');
}

function fnShowUserDetailData() {
    var dBoardFuncArr = ["SMSRLMDB","SMSHKYDB","SMSUSADB","SMSRACDB",""];
    fnShowDboardFuncs(dBoardFuncArr);
}

function fnRefreshDashBoardData(event) {
 var tabid = "";
    //12.1 Dashboard changes start
    if(document.getElementById("DBoardHome") != null && document.getElementById("DBoardHome").getAttribute("selected") == "true"){
     tabid = "DBoardHome";     
    } else if(document.getElementById("DBoardCustomer").getAttribute("selected")== "true"){
    tabid = "DBoardCustomer";   
    }//FCUBS_Branch_Deprecation starts
	/* else if(document.getElementById("DBoardWorkFlow").getAttribute("selected")== "true"){
    tabid = "DBoardWorkFlow"; 
    } */ //FCUBS_Branch_Deprecation ends
    else if(document.getElementById("DBoardTasks").getAttribute("selected")== "true"){
    tabid = "DBoardTasks"; 
    } else if(document.getElementById("DBoardMyDashBoard").getAttribute("selected")== "true"){
    tabid = "DBoardMyDashBoard"; 
    } else if(document.getElementById("DBoardMessages").getAttribute("selected")== "true"){
    tabid = "DBoardMessages"; 
    } else if(document.getElementById("DBoardNextGenUI").getAttribute("selected")== "true"){
    tabid = "DBoardNextGenUI"; 
    }
    //12.1 Dashboard changes end
    if(tabid =="") tabid = "DBoardHome";     
    showDBoardTabs(tabid, event);
    if(tabid == "DBoardHome" ) /* || tabid == "DBoardWorkFlow") */ //FCUBS_Branch_Deprecation
        fnEnableNavbuttons();
}


function fnRefreshDashBoardData1(){
            //12.1 Retro_Changes starts
            if (currentTab == "DBoardTasks") {
                displayDashboardQueue(gQueueNamesArr, gQueueTypesArr, gBamURLsArr, gFiledListsArr, gActionsArr, gDescArr, event);
                fnControlNavButtons();
                return true;
            }
            //12.1 Retro_Changes ends
  document.getElementById("vTabDB_DASHBOARD").style.display = 'block';
  var dashBoardDiv = null;
  //FCUBS_Branch_Deprecation starts
  /*if(currentTab == 'DBoardWorkFlow'){
    //Fix for 18976403 Starts
    //dashBoardDiv = document.getElementById("Content"+document.getElementById(transactionLabel).parentNode.id+curWfTab);
	refreshTransactionData(transactionLabel);
    return;
	//Fix for 18976403 Ends
  }
 else{*/  //FCUBS_Branch_Deprecation ends
    dashBoardDiv =  document.getElementById("DIVTabContent"+currentTab+curPage);
 /*} FCUBS_Branch_Deprecation*/


if(dashBoardDiv != null){
    var dashBoardIframeArr = dashBoardDiv.getElementsByTagName("iframe");
    var iframeDiv= null;
    for(var iframeCount = 0; iframeCount < dashBoardIframeArr.length ; iframeCount++){
    
    iframeDiv = dashBoardIframeArr[iframeCount];
        if( iframeDiv.contentWindow.isDetailed  ){
          if( currentTab == 'DBoardMyDashBoard'){
            if(usrDetails.length > 0){
            var startIndex = 0;   
            if(iframeDiv.contentWindow.functionId == 'SMDUSRD2') startIndex =6;
            if(iframeDiv.contentWindow.functionId == 'SMDUSRD3') startIndex = 13;
            iframeDiv.contentWindow.setCustTableData(mainWin.usrDetails, startIndex);
          }

          }
          else {
          iframeDiv.contentWindow.setCustTableData();
        }       
        }
        
        else{
         iframeDiv.contentWindow.fnRefreshData();
         }
         }
         if(dashBoardDiv.id == "ContentMainWorkflowSearch"){
          refreshTransactionData(transactionLabel);
        }
         }
    
}
  //12.1 Dashboard changes start
function dispHrefDBoard(funcid, uiName, finalRights, drillDownQry, fromMDB,txnstatus) {
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    //mask();
    var numeric="";
    var status = true;
    if (funcid != "" && funcid != "null") {
        var xmlDOM = loadXMLDoc(gXmlMenu);
        var uiNameNode;
        var Function =  funcid;               
        if (funcid.substring(2, 3).toUpperCase() == 'D') {
            var funcid = funcid.substring(0, 2) + "S" + funcid.substring(3, funcid.length);
        }
        uiNameNode = selectSingleNode(xmlDOM, "//*[@FNID = '" + Function + "']");
        if (uiNameNode) {
            for (var i = 0; i < uiNameNode.attributes.length; i++) {
                if (uiNameNode.attributes[i].nodeName == "UINAME") { 
                    uiName = getNodeText(uiNameNode.attributes[i]);
                    break;
                } 
                if (uiNameNode.attributes[i].nodeName == "OFFLINEALLOWED"){
                    gOfflineAllowed = uiNameNode.getAttribute("OFFLINEALLOWED");
                    break;
                }
            }
        }
        var msgType = "WORKFLOW";
        var actionType = "initiate";
        if (gTxn != undefined && gTxn != null) {
            gTxn = '';
            gStage = '';
        }
	var timeStamp = getDateObject();
        var t = getDateObject();
        var inTime=(t.getHours()*(3600*1000))+(t.getMinutes()*(60*1000))+(t.getSeconds()*1000)+t.getMilliseconds();
       // if(isSessionActive()) { //session expiry change
                var txnBrn = "";
                multiBrnScrOpened = false;
                if (typeof(g_txnBranch) != "undefined" && g_txnBranch != "") //21777011
                    txnBrn = g_txnBranch;
                    openWindow("testwin", "TempForward.jsp?action=SMSStartLogServlet&funcid=" + funcid + "&uiName=" + uiName + "&msgType=" + msgType + "&actionType=" + actionType + "&timestamp=" + timeStamp.getTime() + "&numeric=" + numeric +"&parentArgs="+ ParentArgs+"&dashboardArgs="+ dashboardArgs + "&inTime=" + inTime+ "&txnBranch=" +txnBrn + "&status=" +status);//debug revert
                ParentArgs = "";
                dashboardArgs = "";
				g_txnBranch = "" ;//21777011
           // }session expiry change
        }
}

function getFuncIdDetails(obj){

var funcId = document.getElementById('fastpath').value;

 dispHref(funcId, "", "", "");
}


function fnQuickSearch1(){
  mainWin.fnUpdateScreenSaverInterval();

  document.getElementById('MenuSearchHeaderDiv').getElementsByTagName("A")[0].id = 'WNDbuttons';
  document.getElementById('dashboard').style.display = 'none';

  var menusearchDiv = document.getElementById("MenuSearchDiv");

  menusearchDiv.style.height = document.getElementById("leftpanel").offsetHeight + "px";
  menusearchDiv.style.width = x-(document.getElementById("vtab").offsetWidth+3)+"px";

    menusearchDiv.style.top = document.getElementById('masthead').offsetHeight - 3 +'px';
    menusearchDiv.style.position = 'absolute';
    menusearchDiv.style.zIndex = '1';

  setHorizontalPosition(menusearchDiv, true, document.getElementById("vtab").offsetWidth + 2);

  menusearchDiv.style.display='block';

  descSearchResult.length=0;
  funcIdSearchResult.length=0;
  rightsSearchResult.length=0;
  breadCrumbsMenuSearch.length=0;
  nguiURL.length = 0;
  nguiPrd.length = 0;
  pageNoStartIndex = 0;
  var tempLbl = "";
  var tempBrdcrumbsArr = new Array();
  var tempBrdcrumbsArrCnt = 0;

      var xmlDOM = loadXMLDoc(mainWin.gXmlMenu);
      var leafNodes = selectNodes(xmlDOM, "//*/LEAF[contains(@TYPSTR,'MSP')]");
      if (leafNodes){
           for (var index = 0; index < leafNodes.length; index++)
                  {
                      descSearchResult[index] =leafNodes[index].getAttribute("LABEL") ;
                      funcIdSearchResult[index]=leafNodes[index].getAttribute("FNID") ;
                      rightsSearchResult[index]=leafNodes[index].getAttribute("RIGHTS");
					  breadCrumbsMenuSearch[index] = "";
                                          nguiURL[index] = leafNodes[index].getAttribute("NGUIURL") ;
                                          nguiPrd[index] = leafNodes[index].getAttribute("NGUIPRD") ;
					  tempLbl = "";
					  tempBrdcrumbsArr.length = 0;
					  tempBrdcrumbsArrCnt = 0;
					  var tempParentNode = leafNodes[index].parentNode;
					  while(tempParentNode.nodeName.toUpperCase() != "MENU"){
							tempLbl = tempParentNode.getAttribute("LABEL");
							if(tempLbl != ""){
								tempBrdcrumbsArr[ tempBrdcrumbsArrCnt++ ] = tempLbl;
							}
							tempParentNode = tempParentNode.parentNode;
							if(!tempParentNode){
								break;
							}
					  }
					  for(var cnt = tempBrdcrumbsArr.length - 1 ; cnt >= 0; cnt-- ){
							breadCrumbsMenuSearch[index] = breadCrumbsMenuSearch[index] + tempBrdcrumbsArr[cnt] ;
							if(cnt != 0){
								breadCrumbsMenuSearch[index] = breadCrumbsMenuSearch[index] + 	"<span style=\"padding-left:5px;padding-right:5px;\">\><\/span>";
							}else {		//REDWOOD_CHANGES
                                breadCrumbsMenuSearch[index] = breadCrumbsMenuSearch[index] + " / " + leafNodes[index].getAttribute("LABEL")//REDWOOD_CHANGES
							}
					  }
                                           
                    }
                                 
                 }       

    Paging(10);
    fnQuickSearchDisplay1(0);//HTML5 Changes Start

    document.getElementById("resultDiv").style.height = menusearchDiv.offsetHeight - (document.getElementById("MenuSearchHeaderDiv").offsetHeight + document.getElementById("pageDiv").offsetHeight + document.getElementById("menuSearchFooter").offsetHeight) + "px";
    document.getElementById("resultDiv").getElementsByTagName("UL")[0].style.height = menusearchDiv.offsetHeight - (document.getElementById("MenuSearchHeaderDiv").offsetHeight + document.getElementById("pageDiv").offsetHeight + document.getElementById("menuSearchFooter").offsetHeight) + "px";
    document.getElementById("BTN_MENU_SEARCH_EXIT").focus();
//HTML5 Changes End
}

function fnQuickSearchDisplay1(tmpPageNo){  
    mainWin.fnUpdateScreenSaverInterval();
    var newDiv=document.getElementById('resultDiv');
    newDiv.innerHTML = "<span id=\"searchResulttxt\">" + mainWin.getItemDesc("LBL_FASTPATH_SEARCH_RES") + "<\/span><span id=\"searchResult\"><\/span>";
    document.getElementById('searchResult').innerHTML=descSearchResult.length;
    pageNo = parseInt(tmpPageNo);
    if(pages > 0 && pages <= 5) {
        if(document.getElementById('pgNext')) 
        fnDisableAnchor(document.getElementById('pgNext'));
        if(document.getElementById('pgPrev')) 
        fnDisableAnchor(document.getElementById('pgPrev'));
        for(var i = pages+1 ; i<=5 ; i++) {
            fnDisableAnchor(document.getElementById('pageDiv').getElementsByTagName("A")[i]);
        }
        if(tmpPageNo != 0)
        pageNo = parseInt(tmpPageNo-1);
    } else{
        if(funcIdSearchResult.length > 5 && pageNo+1 > 3 ) {
            pageNoStartIndex = pageNo - 2;
        }
        if(pageNo+1 <= 3) { 
             pageNoStartIndex = 0;
        }
        Paging(10);
    }
    start = pageNo * interval;
    var ulElem=document.createElement("ul");
    var tempbrdCrmbs = "";
    var tempDescSearchResult = "";
    for(var i=start  ;i<(interval +(start));i++){
        if(i >=funcIdSearchResult.length){
            break;
        }
	tempbrdCrmbs = "";
	tempDescSearchResult = "";
        var liElem=document.createElement("li");
        if(rightsSearchResult[i]=="null"){
            rightsSearchResult[i]='';
        }
        liElem.id="linkIcon"+i;
        liElem.className="linkIcon";
        if(breadCrumbsMenuSearch[i] != ""){
            tempbrdCrmbs = "<div class=\"LBLmenustd\">" + breadCrumbsMenuSearch[i] +  "</div>";
        }
        var searchTxt = document.getElementById('MenuSearch').value;
        var startIndex = descSearchResult[i].toUpperCase().indexOf(searchTxt.toUpperCase()) ;
        var endIndex = startIndex + searchTxt.length ;
        tempDescSearchResult = descSearchResult[i].substring(0, startIndex )  + "<em style=\"font-weight:bold;font-style:normal;\">"+ descSearchResult[i].substring(startIndex, endIndex) + "</em>" + descSearchResult[i].substring(endIndex, descSearchResult[i].length);
        liElem.innerHTML="<a  id=resultsLink"+i+"  href=\"javascript:mainWin.openPlatoWindow('"+nguiURL[i]+"');\">" +tempDescSearchResult+"&nbsp-&nbsp"+nguiPrd[i]+"</a>" + tempbrdCrmbs;//HTML5 changes 2/NOV/2016 fix for 24942117
        ulElem.appendChild(liElem);
    }
    newDiv.appendChild(ulElem);
    start = start +interval;
    if(pages > 0) {
        addEvent(document.getElementById('pageDiv').getElementsByTagName('A')[ (Math.abs(pageNo  - pageNoStartIndex)) + 1], "class","Astdselected");
    }
    if(document.getElementById('pgPrev') && document.getElementById('pgNext')) {
        if(pages==0 || pages <= 5){
            fnDisableAnchor(document.getElementById('pgPrev'));
            fnDisableAnchor(document.getElementById('pgNext'));
        } else if((pageNo<(pages -1)) && (pageNo>0)){
            fnEnableAnchor(document.getElementById('pgPrev'));
            fnEnableAnchor(document.getElementById('pgNext'));
        } else if(pageNo == 0){
            fnDisableAnchor(document.getElementById('pgPrev'));
            fnEnableAnchor(document.getElementById('pgNext'));
        } else{
            fnEnableAnchor(document.getElementById('pgPrev'));
            fnDisableAnchor(document.getElementById('pgNext'));
        }
    }
}

function fnQuickSearch(){ 
//REDWOOD_CHANGES
  mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
   //fix for 17014727
  
  descSearchResult.length=0;
  funcIdSearchResult.length=0;
  rightsSearchResult.length=0;
  breadCrumbsMenuSearch.length=0;
  pageNoStartIndex = 0;
  var tempLbl = "";
  var tempBrdcrumbsArr = new Array();
  var tempBrdcrumbsArrCnt = 0;
  //if(funcDesc){
   //   funcDesc = funcDesc.toLowerCase();
      var xmlDOM = loadXMLDoc(mainWin.gXmlMenu);
    //menu search changes starts
    var leafNodes = selectNodes(xmlDOM, "//*/LEAF  | //NODE/NODE/LEAF  | //NODE/NODE/LEAF  | //NODE/LEAF  " );
    
//    if (mainWin.applicationName == 'FCIS') {
//		leafNodes = selectNodes(xmlDOM, "//*/LEAF  | //NODE/NODE/LEAF  | //NODE/NODE/LEAF  | //NODE/LEAF  " ); //Fix for 22982267
//                //leafNodes = selectNodes(xmlDOM, "//*/LEAF[contains(translate(@LABEL,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'),'"+funcDesc+"')] | //NODE/NODE[contains(translate(@LABEL,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'),'"+funcDesc+"')]/LEAF  | //NODE[contains(translate(@LABEL,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'),'"+funcDesc+"')]/NODE/LEAF  | //NODE[contains(translate(@LABEL,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'),'"+funcDesc+"')]/LEAF  " ); //Fix for 22982267
//    }else {
//        leafNodes = selectNodes(xmlDOM, "//*/LEAF[contains(translate(@LABEL,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'),'"+funcDesc+"')]");
//    }	  
    //menu search changes ends     
      if (leafNodes){
           for (var index = 0; index < leafNodes.length; index++)
                  {
if (leafNodes[index].getAttribute("TYPSTR") != "D") { // 23066990 - SEARCH OPTION :: SEARCH OF 'UNIT' UTDUNUH/UTSUNUH NOT ABLE TO VIEW                       
					  descSearchResult[index] =leafNodes[index].getAttribute("LABEL") ;
                      funcIdSearchResult[index]=leafNodes[index].getAttribute("FNID") ;
                      rightsSearchResult[index]=leafNodes[index].getAttribute("RIGHTS");
					  breadCrumbsMenuSearch[index] = "";
					  tempLbl = "";
					  tempBrdcrumbsArr.length = 0;
					  tempBrdcrumbsArrCnt = 0;
					  var tempParentNode = leafNodes[index].parentNode;
					  while(tempParentNode.nodeName.toUpperCase() != "MENU"){
							tempLbl = tempParentNode.getAttribute("LABEL");
							if(tempLbl != ""){
								tempBrdcrumbsArr[ tempBrdcrumbsArrCnt++ ] = tempLbl;
							}
							tempParentNode = tempParentNode.parentNode;
							if(!tempParentNode){
								break;
							}
					  }
					  for(var cnt = tempBrdcrumbsArr.length - 1 ; cnt >= 0; cnt-- ){
							breadCrumbsMenuSearch[index] = breadCrumbsMenuSearch[index] + tempBrdcrumbsArr[cnt] ;
							if(cnt != 0){
								breadCrumbsMenuSearch[index] = breadCrumbsMenuSearch[index] + 	"/";
							}
					  }
					}     // 23066990 - SEARCH OPTION :: SEARCH OF 'UNIT' UTDUNUH/UTSUNUH NOT ABLE TO VIEW                                             
                    }
                                 
                 }       
        //}  
  //  Paging(10);
    fnQuickSearchDisplay(0);//HTML5 Changes Start
    /*if (document.getElementById("resultDiv").getElementsByTagName("UL")[0].offsetHeight < 400) {
        document.getElementById("resultDiv").style.height = "400px";
    } else {
        document.getElementById("resultDiv").style.height = document.getElementById("resultDiv").getElementsByTagName("UL")[0].offsetHeight + 10 + "px";
    }
    document.getElementById("MenuSearchResultDiv").style.height = document.getElementById("resultDiv").offsetHeight + (document.getElementById("MenuSearchHeaderDiv").offsetHeight + document.getElementById("pageDiv").offsetHeight + document.getElementById("menuSearchFooter").offsetHeight) + 5 + "px";
    if (document.getElementById("MenuSearchResultDiv").offsetHeight > document.getElementById("MenuSearchDiv").offsetHeight) {
        document.getElementById("resultDiv").style.height = document.getElementById("MenuSearchDiv").offsetHeight - (document.getElementById("MenuSearchHeaderDiv").offsetHeight + document.getElementById("pageDiv").offsetHeight + document.getElementById("menuSearchFooter").offsetHeight + 5) + "px";
        document.getElementById("MenuSearchResultDiv").style.height = document.getElementById("MenuSearchDiv").offsetHeight + "px";
    } else {
        document.getElementById("resultDiv").style.height = document.getElementById("MenuSearchResultDiv").offsetHeight - (document.getElementById("MenuSearchHeaderDiv").offsetHeight + document.getElementById("pageDiv").offsetHeight + document.getElementById("menuSearchFooter").offsetHeight + 5) + "px";
    }*/
//    document.getElementById("resultDiv").style.height = menusearchDiv.offsetHeight - (document.getElementById("MenuSearchHeaderDiv").offsetHeight + document.getElementById("pageDiv").offsetHeight + document.getElementById("menuSearchFooter").offsetHeight) + "px";
  //  document.getElementById("resultDiv").getElementsByTagName("UL")[0].style.height = menusearchDiv.offsetHeight - (document.getElementById("MenuSearchHeaderDiv").offsetHeight + document.getElementById("pageDiv").offsetHeight + document.getElementById("menuSearchFooter").offsetHeight) + "px";
    //document.getElementById("BTN_MENU_SEARCH_EXIT").focus();
//HTML5 Changes End
}
var menuSearchArr = [];
function fnQuickSearchDisplay(tmpPageNo){  
  mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
  pageNo = parseInt(tmpPageNo);
  /* code modified by ketki to incorporate cases when pages less than 5 start*/

 // if((funcIdSearchResult.length > 5)  && (parseInt( document.getElementById('pageDiv').getElementsByTagName("A")[3].innerHTML) < pageNo + 1)){
		
	//	pageNoStartIndex = pageNo - 2;
	//	 Paging(10);
	//}
  start = pageNo * interval;
   
  var tempbrdCrmbs = "";
  var tempDescSearchResult = "";
  var tempCrumbsMenuSearch = "";//FCIS 12.1 Patchset
  
	for(var i=start  ;i<(funcIdSearchResult.length);i++){
        var obj={};
    if(i >=funcIdSearchResult.length){
      break;
    }
	tempbrdCrmbs = "";
	tempDescSearchResult = "";
     if(rightsSearchResult[i]=="null"){
      rightsSearchResult[i]='';
    }
    if(breadCrumbsMenuSearch[i] != ""){
	   //tempbrdCrmbs = "<div class=\"LBLmenustd\">" + breadCrumbsMenuSearch[i] +  "</div>";//FCIS_12.4.0_INTERNAL_27101427
//	   if (mainWin.applicationName == 'FCIS') { //FCIS 12.1 Patchset start		
//            searchTxt = document.getElementById('MenuSearch').value;
//			//startIndex = tempbrdCrmbs.toUpperCase().indexOf(searchTxt.toUpperCase()) ;
//            startIndex = breadCrumbsMenuSearch[i].toUpperCase().indexOf(searchTxt.toUpperCase()) ;//FCIS_12.4.0_INTERNAL_27101427
//            endIndex = startIndex + searchTxt.length ;        
//            if (startIndex > -1 )
//				//tempCrumbsMenuSearch = tempbrdCrmbs.substring(0, startIndex )  + "<strong style=\"font-weight:bold;font-style:normal;\">"+ tempbrdCrmbs.substring(startIndex, endIndex) + "</strong>" + tempbrdCrmbs.substring(endIndex, tempbrdCrmbs.length);
//                tempbrdCrmbs = breadCrumbsMenuSearch[i].substring(0, startIndex )  + "<strong style=\"font-weight:bold;font-style:normal;\">"+ breadCrumbsMenuSearch[i].substring(startIndex, endIndex) + "</strong>" + breadCrumbsMenuSearch[i].substring(endIndex, breadCrumbsMenuSearch[i].length);//FCIS_12.4.0_INTERNAL_27101427
//            else
//                //tempCrumbsMenuSearch = tempbrdCrmbs;	
//                tempbrdCrmbs = breadCrumbsMenuSearch[i];	//FCIS_12.4.0_INTERNAL_27101427
//        }
 tempbrdCrmbs = breadCrumbsMenuSearch[i];
		tempCrumbsMenuSearch =  tempbrdCrmbs  ;//FCIS_12.4.0_INTERNAL_27101427
   }//FCIS 12.1 Patchset end
   
//   var searchTxt = document.getElementById('MenuSearch').value;
//   var startIndex = descSearchResult[i].toUpperCase().indexOf(searchTxt.toUpperCase()) ;
//   var endIndex = startIndex + searchTxt.length ;
//   if (startIndex > -1 )
//   tempDescSearchResult = descSearchResult[i].substring(0, startIndex )  + "<em style=\"font-weight:bold;font-style:normal;\">"+ descSearchResult[i].substring(startIndex, endIndex) + "</em>" + descSearchResult[i].substring(endIndex, descSearchResult[i].length);
//   else
        if (mainWin.applicationName != 'FCIS') {
            tempDescSearchResult = "/" + descSearchResult[i];
        }
//   liElem.innerHTML="<a  id=resultsLink"+i+"  href=\"javascript:mainWin.dispHref('"+funcIdSearchResult[i]+"', '', '"+rightsSearchResult[i]+"', '');\">" +tempDescSearchResult+"&nbsp-&nbsp"+funcIdSearchResult[i]+"</a>" + tempbrdCrmbs;//HTML5 changes 2/NOV/2016 fix for 24942117
//   if (mainWin.applicationName == 'FCIS' )//FCIS 12.1 Patchset
//   liElem.innerHTML="<a  id=resultsLink  href=\"javascript:mainWin.dispHref('"+funcIdSearchResult[i]+"', '', '"+rightsSearchResult[i]+"', '');\">" +tempDescSearchResult+"&nbsp-&nbsp"+funcIdSearchResult[i]+"</a>" + tempCrumbsMenuSearch; //+ tempbrdCrmbs FCIS 12.1 Patchset   ulElem.appendChild(liElem);
//  //ulElem.appendChild(liElem);  
  obj['label'] = tempbrdCrmbs+tempDescSearchResult+" - "+funcIdSearchResult[i];
  obj['value'] = funcIdSearchResult[i];
  obj['menu_click'] = "mainWin.dispHref('"+funcIdSearchResult[i]+"', '', '"+rightsSearchResult[i]+"', '');";
  menuSearchList.push(obj) ;
  }
//console.log(JSON.stringify(menuSearchList()));
//  newDiv.appendChild(ulElem);
//  start = start +interval;
//   if(pages > 0)
//   addEvent(document.getElementById('pageDiv').getElementsByTagName('A')[ (Math.abs(pageNo  - pageNoStartIndex)) + 1], "class","Astdselected");
/* code modified by ketki to incorporate cases when pages less than 5 start*/
/* if(pages==0 || pages <= 5){
    document.getElementById('pgPrev').style.visibility='hidden';
    document.getElementById('pgNext').style.visibility='hidden';
  }
  else if((pageNo<(pages -1)) && (pageNo>0)){
    document.getElementById('pgPrev').style.visibility='';
    document.getElementById('pgNext').style.visibility='';
  }
  else if(pageNo == 0){
   // addEvent(document.getElementById('pageDiv').getElementsByTagName('A')[pageNo + 1], "class","Astdselected");
    document.getElementById('pgPrev').style.visibility='hidden';
    document.getElementById('pgNext').style.visibility='';
  }
  else{
    document.getElementById('pgPrev').style.visibility='';
    document.getElementById('pgNext').style.visibility='hidden';
  } */
//  if(document.getElementById('pgPrev') && document.getElementById('pgNext'))
//  {if(pages==0 || pages <= 5){
//    //fix for bug 17023261 start
//    //document.getElementById('pgPrev').disabled="true";
//    fnDisableAnchor(document.getElementById('pgPrev'));
//    //document.getElementById('pgNext').disabled="true";
//    fnDisableAnchor(document.getElementById('pgNext'));
//	//fix for bug 17023261 end
//  }
//  else if((pageNo<(pages -1)) && (pageNo>0)){
//	//fix for bug 17023261 start
//    //document.getElementById('pgPrev').enabled="true";
//    fnEnableAnchor(document.getElementById('pgPrev'));
//    //document.getElementById('pgNext').enabled="true";
//    fnEnableAnchor(document.getElementById('pgNext'));
//	//fix for bug 17023261 end
//  }
//  else if(pageNo == 0){
//	//fix for bug 17023261 start
//    //document.getElementById('pgPrev').disabled="true";
//    fnDisableAnchor(document.getElementById('pgPrev'));
//    //document.getElementById('pgNext').enabled="true";
//    fnEnableAnchor(document.getElementById('pgNext'));
//	//fix for bug 17023261 end
//  }
//  else{
//	//fix for bug 17023261 start
//    //document.getElementById('pgPrev').enabled="true";
//    fnEnableAnchor(document.getElementById('pgPrev'));
//    //document.getElementById('pgNext').disabled="true";
//    fnDisableAnchor(document.getElementById('pgNext'));
//	//fix for bug 17023261 end
//  }}
/* code modified by ketki to incorporate cases when pages less than 5 end*/
}

function fnQuickSearch_old(){	  
//REDWOOD_CHANGES
    mainWin.fnUpdateScreenSaverInterval();
    document.getElementById('MenuSearchHeaderDiv').getElementsByTagName("A")[0].id = 'WNDbuttons';
    document.getElementById('dashboard').style.display = 'none';
    var funcDesc= document.getElementById('MenuSearch').value;
    if (funcDesc.match("[<>;*#^!]+")){
	return false;
    }
    document.getElementById('displaySearchTitle').innerHTML = funcDesc;
    var menusearchDiv = document.getElementById("MenuSearchDiv");
    menusearchDiv.style.height = document.getElementById("leftpanel").offsetHeight + "px";
    menusearchDiv.style.width = x-(document.getElementById("vtab").offsetWidth+3)+"px";
    menusearchDiv.style.top = document.getElementById('masthead').offsetHeight - 3 +'px';
    menusearchDiv.style.position = 'absolute';
    menusearchDiv.style.zIndex = '1';
    setHorizontalPosition(menusearchDiv, true, document.getElementById("vtab").offsetWidth + 2);
    menusearchDiv.style.display='block';
    descSearchResult.length=0;
    funcIdSearchResult.length=0;
    rightsSearchResult.length=0;
    breadCrumbsMenuSearch.length=0;
    pageNoStartIndex = 0;
    var tempLbl = "";
    var tempBrdcrumbsArr = new Array();
    var tempBrdcrumbsArrCnt = 0;
    if(funcDesc){
        funcDesc = funcDesc.toLowerCase();
        var xmlDOM = loadXMLDoc(mainWin.gXmlMenu);
        var leafNodes = selectNodes(xmlDOM, "//*/LEAF[contains(translate(@LABEL,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'),'"+funcDesc+"')]");
        if (leafNodes){
            for (var index = 0; index < leafNodes.length; index++)
                  {
                      descSearchResult[index] =leafNodes[index].getAttribute("LABEL") ;
                      funcIdSearchResult[index]=leafNodes[index].getAttribute("FNID") ;
                      rightsSearchResult[index]=leafNodes[index].getAttribute("RIGHTS");
					  breadCrumbsMenuSearch[index] = "";
					  tempLbl = "";
					  tempBrdcrumbsArr.length = 0;
					  tempBrdcrumbsArrCnt = 0;
					  var tempParentNode = leafNodes[index].parentNode;
					  while(tempParentNode.nodeName.toUpperCase() != "MENU"){
							tempLbl = tempParentNode.getAttribute("LABEL");
							if(tempLbl != ""){
								tempBrdcrumbsArr[ tempBrdcrumbsArrCnt++ ] = tempLbl;
							}
							tempParentNode = tempParentNode.parentNode;
							if(!tempParentNode){
								break;
							}
					  }
					  for(var cnt = tempBrdcrumbsArr.length - 1 ; cnt >= 0; cnt-- ){
							breadCrumbsMenuSearch[index] = breadCrumbsMenuSearch[index] + tempBrdcrumbsArr[cnt] ;
							if(cnt != 0){
								breadCrumbsMenuSearch[index] = breadCrumbsMenuSearch[index] + 	"<span style=\"padding-left:5px;padding-right:5px;\">\><\/span>";
							}
					  }
                                           
                    }
                                 
                 }       
        }  
    Paging(10);
    fnQuickSearchDisplay(0);//HTML5 Changes Start
    /*if (document.getElementById("resultDiv").getElementsByTagName("UL")[0].offsetHeight < 400) {
        document.getElementById("resultDiv").style.height = "400px";
    } else {
        document.getElementById("resultDiv").style.height = document.getElementById("resultDiv").getElementsByTagName("UL")[0].offsetHeight + 10 + "px";
    }
    document.getElementById("MenuSearchResultDiv").style.height = document.getElementById("resultDiv").offsetHeight + (document.getElementById("MenuSearchHeaderDiv").offsetHeight + document.getElementById("pageDiv").offsetHeight + document.getElementById("menuSearchFooter").offsetHeight) + 5 + "px";
    if (document.getElementById("MenuSearchResultDiv").offsetHeight > document.getElementById("MenuSearchDiv").offsetHeight) {
        document.getElementById("resultDiv").style.height = document.getElementById("MenuSearchDiv").offsetHeight - (document.getElementById("MenuSearchHeaderDiv").offsetHeight + document.getElementById("pageDiv").offsetHeight + document.getElementById("menuSearchFooter").offsetHeight + 5) + "px";
        document.getElementById("MenuSearchResultDiv").style.height = document.getElementById("MenuSearchDiv").offsetHeight + "px";
    } else {
        document.getElementById("resultDiv").style.height = document.getElementById("MenuSearchResultDiv").offsetHeight - (document.getElementById("MenuSearchHeaderDiv").offsetHeight + document.getElementById("pageDiv").offsetHeight + document.getElementById("menuSearchFooter").offsetHeight + 5) + "px";
    }*/
    document.getElementById("resultDiv").style.height = menusearchDiv.offsetHeight - (document.getElementById("MenuSearchHeaderDiv").offsetHeight + document.getElementById("pageDiv").offsetHeight + document.getElementById("menuSearchFooter").offsetHeight) + "px";
    document.getElementById("resultDiv").getElementsByTagName("UL")[0].style.height = menusearchDiv.offsetHeight - (document.getElementById("MenuSearchHeaderDiv").offsetHeight + document.getElementById("pageDiv").offsetHeight + document.getElementById("menuSearchFooter").offsetHeight) + "px";
    document.getElementById("BTN_MENU_SEARCH_EXIT").focus();
//HTML5 Changes End
}

function fnQuickSearchDisplay_old(tmpPageNo){  //REDWOOD_CHANGES
  mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
  var newDiv=document.getElementById('resultDiv');
 
  newDiv.innerHTML = "<span id=\"searchResulttxt\">" + mainWin.getItemDesc("LBL_FASTPATH_SEARCH_RES") + "<\/span><span id=\"searchResult\"><\/span>";
  document.getElementById('searchResult').innerHTML=descSearchResult.length;
  pageNo = parseInt(tmpPageNo);
  /* code modified by ketki to incorporate cases when pages less than 5 start*/
  if(pages > 0 && pages <= 5) 
  {
      if(document.getElementById('pgNext')) 
      //document.getElementById('pgNext').disabled=true;
      fnDisableAnchor(document.getElementById('pgNext'));//fix for bug 17023261
      if(document.getElementById('pgPrev')) 
      //document.getElementById('pgPrev').disabled=true;
       fnDisableAnchor(document.getElementById('pgPrev'));//fix for bug 17023261
        for(var i = pages+1 ; i<=5 ; i++) {
          //document.getElementById('pageDiv').getElementsByTagName("A")[i].disabled=true;
          fnDisableAnchor(document.getElementById('pageDiv').getElementsByTagName("A")[i]);//fix for bug 17023261
        }
        if(tmpPageNo != 0)
        pageNo = parseInt(tmpPageNo-1);
  }

 else{
        if(funcIdSearchResult.length > 5 && pageNo+1 > 3 )
            pageNoStartIndex = pageNo - 2;
  

        if(pageNo+1 <= 3) 
             pageNoStartIndex = 0;
        
        Paging(10);
 
    }  /* code modified by ketki to incorporate cases when pages less than 5 end*/
 // if((funcIdSearchResult.length > 5)  && (parseInt( document.getElementById('pageDiv').getElementsByTagName("A")[3].innerHTML) < pageNo + 1)){
		
	//	pageNoStartIndex = pageNo - 2;
	//	 Paging(10);
	//}
  start = pageNo * interval;
  var ulElem=document.createElement("ul");
  var tempbrdCrmbs = "";
  var tempDescSearchResult = "";
  for(var i=start  ;i<(interval +(start));i++){
    if(i >=funcIdSearchResult.length){
      break;
    }
	tempbrdCrmbs = "";
	tempDescSearchResult = "";
    var liElem=document.createElement("li");
    if(rightsSearchResult[i]=="null"){
      rightsSearchResult[i]='';
    }
    liElem.id="linkIcon"+i;//HTML5 changes 2/NOV/2016 fix for 24942117
    liElem.className="linkIcon";//HTML5 changes 2/NOV/2016 fix for 24942117
   if(breadCrumbsMenuSearch[i] != ""){
		tempbrdCrmbs = "<div class=\"LBLmenustd\">" + breadCrumbsMenuSearch[i] +  "</div>";
   }
   var searchTxt = document.getElementById('MenuSearch').value;
   var startIndex = descSearchResult[i].toUpperCase().indexOf(searchTxt.toUpperCase()) ;
   var endIndex = startIndex + searchTxt.length ;
   tempDescSearchResult = descSearchResult[i].substring(0, startIndex )  + "<em style=\"font-weight:bold;font-style:normal;\">"+ descSearchResult[i].substring(startIndex, endIndex) + "</em>" + descSearchResult[i].substring(endIndex, descSearchResult[i].length);
   
   liElem.innerHTML="<a  id=resultsLink"+i+"  href=\"javascript:mainWin.dispHref('"+funcIdSearchResult[i]+"', '', '"+rightsSearchResult[i]+"', '');\">" +tempDescSearchResult+"&nbsp-&nbsp"+funcIdSearchResult[i]+"</a>" + tempbrdCrmbs;//HTML5 changes 2/NOV/2016 fix for 24942117
   ulElem.appendChild(liElem);
  }
  newDiv.appendChild(ulElem);
  start = start +interval;
   if(pages > 0)
   addEvent(document.getElementById('pageDiv').getElementsByTagName('A')[ (Math.abs(pageNo  - pageNoStartIndex)) + 1], "class","Astdselected");
/* code modified by ketki to incorporate cases when pages less than 5 start*/
/* if(pages==0 || pages <= 5){
    document.getElementById('pgPrev').style.visibility='hidden';
    document.getElementById('pgNext').style.visibility='hidden';
  }
  else if((pageNo<(pages -1)) && (pageNo>0)){
    document.getElementById('pgPrev').style.visibility='';
    document.getElementById('pgNext').style.visibility='';
  }
  else if(pageNo == 0){
   // addEvent(document.getElementById('pageDiv').getElementsByTagName('A')[pageNo + 1], "class","Astdselected");
    document.getElementById('pgPrev').style.visibility='hidden';
    document.getElementById('pgNext').style.visibility='';
  }
  else{
    document.getElementById('pgPrev').style.visibility='';
    document.getElementById('pgNext').style.visibility='hidden';
  } */
  if(document.getElementById('pgPrev') && document.getElementById('pgNext'))
  {if(pages==0 || pages <= 5){
    //fix for bug 17023261 start
    //document.getElementById('pgPrev').disabled="true";
    fnDisableAnchor(document.getElementById('pgPrev'));
    //document.getElementById('pgNext').disabled="true";
    fnDisableAnchor(document.getElementById('pgNext'));
	//fix for bug 17023261 end
  }
  else if((pageNo<(pages -1)) && (pageNo>0)){
	//fix for bug 17023261 start
    //document.getElementById('pgPrev').enabled="true";
    fnEnableAnchor(document.getElementById('pgPrev'));
    //document.getElementById('pgNext').enabled="true";
    fnEnableAnchor(document.getElementById('pgNext'));
	//fix for bug 17023261 end
  }
  else if(pageNo == 0){
	//fix for bug 17023261 start
    //document.getElementById('pgPrev').disabled="true";
    fnDisableAnchor(document.getElementById('pgPrev'));
    //document.getElementById('pgNext').enabled="true";
    fnEnableAnchor(document.getElementById('pgNext'));
	//fix for bug 17023261 end
  }
  else{
	//fix for bug 17023261 start
    //document.getElementById('pgPrev').enabled="true";
    fnEnableAnchor(document.getElementById('pgPrev'));
    //document.getElementById('pgNext').disabled="true";
    fnDisableAnchor(document.getElementById('pgNext'));
	//fix for bug 17023261 end
  }}
/* code modified by ketki to incorporate cases when pages less than 5 end*/
}

//fix for bug 17023261 start
function fnDisableAnchor(anchorElem) {
            anchorElem.disabled = true;
            if (anchorElem.getAttribute("href")) {
                anchorElem.setAttribute("href_old", anchorElem.getAttribute("href"));
                anchorElem.removeAttribute("href");
            }
            if (anchorElem.getAttribute("onclick")) {
                anchorElem.setAttribute("onclick_old", anchorElem.getAttribute("onclick"));
                anchorElem.removeAttribute("onclick");
            }
            anchorElem.className = 'Astd AstdDisabled';
}

function fnEnableAnchor(anchorElem) {
            anchorElem.disabled = false;
            if (anchorElem.getAttribute("href_old")) {
                anchorElem.setAttribute("href", anchorElem.getAttribute("href_old"));
                anchorElem.removeAttribute("href_old");
            }
            if (anchorElem.getAttribute("onclick_old")) {
                anchorElem.setAttribute("onclick", anchorElem.getAttribute("onclick_old"));
                anchorElem.removeAttribute("onclick_old");
            }
            anchorElem.className = 'Astd';
}
//fix for bug 17023261 end

var pageNoStartIndex = 0;
function Paging(noOfRows) {
/* code modified by ketki to incorporate cases when pages less than 5 start*/
    var disabled1 = false;     
    var disabled2 = false;
/* code modified by ketki to incorporate cases when pages less than 5 end */
    var pageDiv=document.getElementById('pageDiv');
    displayedPagecnt=0;
    pageDiv.innerHTML = "";
    pages=Math.ceil((descSearchResult.length)/noOfRows);
    /* code modified by ketki to incorporate cases when pages less than 5 start*/
    if(pages > 0)
    {
    /* code modified by ketki to incorporate cases when pages less than 5 end */
    var prevbutton=document.createElement("span");
   
    prevbutton.innerHTML="<a id=pgPrev class=Astd  onclick=fnResetHighlightedPageNo(event,'pageDiv'); href=\"javascript:navigateSearchPage(-1);\">"+mainWin.getItemDesc("LBL_PREVIOUS")+"<\/a>";      
    pageDiv.appendChild(prevbutton);	
    /* code modified by ketki to incorporate cases when pages less than 5 start*/
    if(pages <= 5) {
        for(var i = 1 ; i<=5 ; i++) {
            var pageSpan=document.createElement("span");
            pageSpan.innerHTML+="<a class=Astd  onclick=fnResetHighlightedPageNo(event,'pageDiv'); name=pageNo href=\"javascript:fnQuickSearchDisplay('"+i+"');\">"+i+"\<\/a>";//Fix for 21828391 
            pageDiv.appendChild(pageSpan);

        }
    }
    else{
    if ((pages - (pageNoStartIndex+1)) < 5 ){
    pageNoStartIndex = pages - 5 ; 
    disabled1 = true;
    }
    if(pageNoStartIndex==0)
    disabled2 = true;
    /* code modified by ketki to incorporate cases when pages less than 5 end */
    for(tmpPageNo=pageNoStartIndex;tmpPageNo<pages;tmpPageNo++)
    {
        var pagenumber ;
        if(displayedPagecnt == 5)break;
        var pageSpan=document.createElement("span");
      
        pagenumber=tmpPageNo+1;
        pageSpan.innerHTML+="<a class=Astd  onclick=fnResetHighlightedPageNo(event,'pageDiv'); name=pageNo href=\"javascript:fnQuickSearchDisplay('"+tmpPageNo+"');\">"+pagenumber+"\<\/a>";//Fix for 21828391 
    /*  if(pages==pagenumber){
        pageSpan.innerHTML+="";
      }
     else{
        pageSpan.innerHTML+="&nbsp;|&nbsp;";
      }*/
      displayedPagecnt++;

        pageDiv.appendChild(pageSpan);
    }  
    /* code modified by ketki to incorporate cases when pages less than 5 start */
   }
   /* code modified by ketki to incorporate cases when pages less than 5 end */
    var nextbutton=document.createElement("span");
    nextbutton.innerHTML="<a id=pgNext class=Astd  onclick=fnResetHighlightedPageNo(event,'pageDiv'); href=\"javascript:navigateSearchPage(1);\">"+mainWin.getItemDesc("LBL_NEXT")+"<\/a>";        
    pageDiv.appendChild(nextbutton);
    /* code modified by ketki to incorporate cases when pages less than 5 start */
    if(disabled1)
    document.getElementById('pgNext').disabled="true";
    if(disabled2)
    document.getElementById('pgPrev').disabled="true";
    /* code modified by ketki to incorporate cases when pages less than 5 end */
    }   
}
       

function fnExitSearch()
{
  //fix for 17014727
  document.getElementById('MenuSearchHeaderDiv').getElementsByTagName("A")[0].id = "";
  document.getElementById('MenuSearchDiv').style.display='none';

 document.getElementById('dashboard').style.display = 'block';
 if(document.getElementById("DIVTabContent"+currentTab+curPage) && (document.getElementById('vtab').style.display == 'none')){
        document.getElementById("DIVTabContent"+currentTab+curPage).style.display = "block";
        //resetDBoardHeight();	//REDWOOD_CHANGES
 }
 if(currentTab == "DBoardCustomer"){
    document.getElementById('masthead').style.marginTop = '0px';
 }
  document.getElementById('MenuSearch').focus();
}

function navigateSearchPage(index)
{

	 pageNo += index;
	 if (pageNo > 1 && pageNo - 1 != parseInt( document.getElementById('pageDiv').getElementsByTagName("A")[1].innerHTML) ){
		pageNoStartIndex = pageNo - 2;
		 Paging(10);
	 }

	 fnQuickSearchDisplay(pageNo);

}


function fnResetHighlightedPageNo(e,divId)
{
    var event = window.event || e;
    var eventElem = getEventSourceElement(event); 
    var clickedDivObj = document.getElementById(divId);
    var clickedDivObjLinks = clickedDivObj.getElementsByTagName("A");
        for (i =1; i < clickedDivObjLinks.length-1; i++) {
            addEvent(clickedDivObjLinks[i], "class", "Astd");
        }
           //apr25 addEvent(eventElem, "class","Astdselected");
    
}

function fnToggleDisplay(divId){
	if('ONLINE' == brnHostLinkStatus){
    if((currentTab == 'DBoardCustomer') && (divId != 'CustomerSearch') && alertFlag==true) {
        var tabLinkArr = mainWin.document.getElementById("CustomerSearch").parentNode.parentNode.getElementsByTagName("A")
        var activeTab;
        for(var cnt = 0; cnt < tabLinkArr.length; cnt++){
            if(tabLinkArr[cnt].getAttribute("objclicked") && tabLinkArr[cnt].getAttribute("objclicked")=="true"){
                activeTab = tabLinkArr[cnt].id;
            }
        }
        if(activeTab!="CustomerSearch" && activeTab!=divId){
        var iFrameObj = document.getElementById("Content"+activeTab).children[0].children[0];
        iFrameObj.contentWindow.showErrorAlerts('ST-CULN-006','C','',iFrameObj.parentNode.id);
        iFrameObj.contentWindow.customAlertAction = "SWITCH_ACC";
        iFrameObj.contentWindow.divId = divId; 
        return;
        }
    }
    alertFlag=true;
    }
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/    
    if(mainWin.CustomerObj != null){
        alert(mainWin.getItemDesc("LBL_END_PREV_CUST_SESSION"));
        return;
    }
    var contentDivId = "Content";
	//FCUBS_Branch_Deprecation starts
    /*if(currentTab == "DBoardWorkFlow"){
      contentDivId = "ContentMain";
    }*/ //FCUBS_Branch_Deprecation ends
    var tabobj = document.getElementById(divId).parentNode.parentNode;
    var tabLinkArr = tabobj.getElementsByTagName("A");
  
  for(var cnt = 0; cnt < tabLinkArr.length; cnt++){
  if('ONLINE' == brnHostLinkStatus){
       if(tabLinkArr[cnt].getAttribute("objclicked") && tabLinkArr[cnt].getAttribute("objclicked")=="true"){
           tabLinkArr[cnt].setAttribute("objclicked", "false");
       }
   }   
//REDWOOD_CHANGES
//  if(tabLinkArr[cnt].getElementsByTagName("SPAN")[0].className == "DBoardHeadDivSpanSel") {
//    tabLinkArr[cnt].getElementsByTagName("SPAN")[0].className = "DBoardHeadDivSpanDeSel";
//    document.getElementById(contentDivId+ tabLinkArr[cnt].id).style.display = "none";
//    break;
//  }
     if(tabLinkArr[cnt].getElementsByTagName("SPAN")[0].getAttribute("selectedElm")=="Y") {
    tabLinkArr[cnt].getElementsByTagName("SPAN")[0].setAttribute("selectedElm","N");
//REDWOOD_CHANGES
    document.getElementById(contentDivId+ tabLinkArr[cnt].id).style.display = "none";
    break;
  }
    
  }
  if('ONLINE' == brnHostLinkStatus){
    document.getElementById(divId).setAttribute("objclicked","true");
    document.getElementById(divId).focus();//Customer Accessibilty
  }
  //document.getElementById(divId).getElementsByTagName("SPAN")[0]. className = "DBoardHeadDivSpanSel"; //REDWOOD_CHANGES
 
  document.getElementById(divId).getElementsByTagName("SPAN")[0]. setAttribute("selectedElm",'Y');	//REDWOOD_CHANGES
  if( document.getElementById(contentDivId+divId)){
    document.getElementById(contentDivId+divId).style.display = "block";
    var iframeArr = document.getElementById(contentDivId+divId).getElementsByTagName("IFRAME");
    for(var iframeCnt = 0; iframeCnt < iframeArr.length; iframeCnt++){
      if(((iframeArr[iframeCnt].id).indexOf("CustPic") != -1) && ((iframeArr[iframeCnt].id).indexOf("CustSign") != -1)){
        iframeArr[iframeCnt].contentWindow.fnCalcHgtDashboard();
      }
    }
  } 

  if('OFFLINE' == brnHostLinkStatus && (currentTab == 'DBoardCustomer') && (divId != 'CustomerSearch')) {
    custData = gCustDataArr[divId];
    accDataArray = gAccDataArr[divId];
  }else if((currentTab == 'DBoardCustomer') && (divId != 'CustomerSearch')) {
    var custArr = gAccArr[document.getElementById(divId).children[0].children[0].id].split('~'); //REDWOOD_CHANGES
    //fnReplaceGlobalParams(custArr[0],custArr[1],custArr[2],custArr[3]); //Fix for 35693068 Commented
	fnReplaceGlobalParams(custArr[0],custArr[1],custArr[2],custArr[3],custArr[4],custArr[5],custArr[6],custArr[7],custArr[8],custArr[9],custArr[10]); //Fix for 35693068
  }else if((currentTab == 'DBoardCustomer') && (divId == 'CustomerSearch')) {//Fix for 20827884
	gCustInfo["PFunctionId"] = ''; 
    gCustInfo["FunctionId"] = ''; 
    gCustInfo["Branch"] = ''; 
    gCustInfo["AccntNo"] = '';
    //gCustInfo["LiabNo"] = '';//Bug#33442569 
    gCustInfo["AccDesc"] = '';
    gCustInfo["Ccy"] = ''; 
    gCustInfo["Amount"] = ''; 
  }
  //FCUBS_Branch_Deprecation starts
  /*if(currentTab == 'DBoardWorkFlow'){
    if(document.getElementById('ContentMainWorkflowSearch')){
      transactionLabel = document.getElementById(divId).getElementsByTagName("SPAN")[0].id;
      refreshTransactionData(transactionLabel);
    }
    
  }*/ //FCUBS_Branch_Deprecation ends


}

function closeCurrentTab(anchorNode,event){
  var  divId = "Content";
  //FCUBS_Branch_Deprecation starts
  /*if(currentTab == 'DBoardWorkFlow'){
    divId = "ContentMain";
  }*/ //FCUBS_Branch_Deprecation ends
  
  var contentDiv = document.getElementById(divId+anchorNode.parentNode.id);//REDWOOD_CHANGES
  if('ONLINE' == brnHostLinkStatus && contentDiv.id.indexOf("ContentCustomerAccTab")!=-1){
    for(j=0;j<contentDiv.children[0].children[0].contentWindow.document.getElementsByTagName('IFRAME').length;j++){
        if(contentDiv.children[0].children[0].contentWindow.document.getElementsByTagName('IFRAME')[j].parentNode.id !='testwin'){
            fnExit_Cust(contentDiv.children[0].children[0].contentWindow.document.getElementsByTagName('IFRAME')[j].parentNode);
        }
     }   
      gCustInfo["PFunctionId"] = ''; 
      gCustInfo["FunctionId"] = ''; 
      gCustInfo["Branch"] = ''; 
      gCustInfo["AccntNo"] = '';
      //gCustInfo["LiabNo"] = '';//Bug#33442569 
      gCustInfo["AccDesc"] = '';
      gCustInfo["Ccy"] = ''; 
      gCustInfo["Amount"] = ''; 	
     //Fix for 20863863 start
     var count=0;
     for(i in gAccArr){
         count++;
     }
     if(count==1)    {
         gAccArr = new Array();
     }else{
       // gAccArr.splice(anchorNode.children[0].id,1);
	   delete gAccArr[anchorNode.children[0].id]; //20856982
     }
     //Fix for 20863863 end
  }
  //feb 15
  //var searchContentDivId = anchorNode.parentNode.parentNode.children[0].children[0].id;//REDWOOD_CHANGES
  var searchContentDivId = anchorNode.parentNode.parentNode.parentNode.children[0].children[0].id;	//REDWOOD_CHANGES
  contentDiv.parentNode.removeChild(contentDiv);
  anchorNode.parentNode.parentNode.parentNode.removeChild( anchorNode.parentNode.parentNode); //REDWOOD_CHANGES
  if(typeof(event) != 'undefined'){
  fnToggleDisplay(searchContentDivId);
  preventpropagate(event);
  }
}
  

  
  function calContainersize(containerMainDiv){
  var divContainerNodes = containerMainDiv.childNodes;
  
  var dBoardContainerHeight =  document.getElementById('vTabDB_DASHBOARD').offsetHeight - (document.getElementById('hTab_'+currentTab).offsetHeight +4) - 10;
  var dBoardContainerWidth =  document.getElementById('dashboard').offsetWidth - 10;
  for(var cnt = 0 ; cnt < divContainerNodes.length; cnt++){
    if(divContainerNodes[cnt].className == 'DIVThreeColSectionContainer DIVSmallRowContainer'){ //15 50 35
      divContainerNodes[cnt].style.width = dBoardContainerWidth  + 'px';
      divContainerNodes[cnt].style.height = (0.15 * dBoardContainerHeight) - 2 + 'px';
      
    }
    if(divContainerNodes[cnt].className == 'DIVThreeColSectionContainer DIVMediumRowContainer'){ 
      divContainerNodes[cnt].style.width = dBoardContainerWidth  + 'px';
      divContainerNodes[cnt].style.height = (0.35 * dBoardContainerHeight) -2  + 'px';
      
    }
    if(divContainerNodes[cnt].className == 'DIVThreeColSectionContainer DIVBigRowContainer'){ 
      divContainerNodes[cnt].style.width = dBoardContainerWidth  + 'px';
      divContainerNodes[cnt].style.height = (0.5 * dBoardContainerHeight)- 2  + 'px';
      
    }
    var divInnerChildNodes = divContainerNodes[cnt].childNodes;
    for(var divInnerChldCnt = 0 ; divInnerChldCnt < divInnerChildNodes.length ;  divInnerChldCnt++){
    divInnerChildNodes[divInnerChldCnt].style.margin = 0 +'px'
     if(divInnerChildNodes[divInnerChldCnt].className == 'DIVColumnOne'){
      divInnerChildNodes[divInnerChldCnt].style.width = (divContainerNodes[cnt].offsetWidth/3)   + 'px';
      divInnerChildNodes[divInnerChldCnt].style.height = divContainerNodes[cnt].offsetHeight + 'px';
      
    }
    else if(divInnerChildNodes[divInnerChldCnt].className == 'DIVColumnTriple'){
      divInnerChildNodes[divInnerChldCnt].style.width = divContainerNodes[cnt].offsetWidth  + 'px';
      divInnerChildNodes[divInnerChldCnt].style.height = divContainerNodes[cnt].offsetHeight + 'px';
      
      
    }
    var tempChildNodes = divInnerChildNodes[divInnerChldCnt].childNodes;
    var cntTemp = 0 ;
    while(tempChildNodes.length > cntTemp){
      if((tempChildNodes[cntTemp].nodeName == 'DIV' || tempChildNodes[cntTemp].nodeName == 'FIELDSET') ){
      tempChildNodes[cntTemp].style.width = tempChildNodes[cntTemp].parentNode.offsetWidth  + 'px';
      tempChildNodes[cntTemp].style.height = tempChildNodes[cntTemp].parentNode.offsetHeight  + 'px';
      
      if(tempChildNodes[cntTemp].nodeName == 'FIELDSET') {
        break;
      }
      else{
       cntTemp ++;
      }
    }
    else{
      cntTemp ++;
    }
    }
    
  }
  }
  if(currentTab == 'DBoardCustomer' ){
  var tempObj = null;
  tempObj = document.getElementById('CUSTDETAILS');
  setWidthHeight(tempObj);
  tempObj = document.getElementById('ListofAccDiv');
  setWidthHeight(tempObj);
  }
  }
  
function setWidthHeight(divObj){
  divObj.style.width = divObj.parentNode.offsetWidth  + 'px';
  divObj.style.height = divObj.parentNode.offsetHeight  + 'px';
  divObj.style.margin = 0+'px';
  }
  
  function clearDisplayedTabs(){
  var tabArr = document.getElementById("hTab_"+currentTab).getElementsByTagName("A");
  
  var contentDiv = null;
  var anchorTab = null;
  var parentDiv  = null;
  for(var tabCnt = 1 ; tabCnt < tabArr.length; ){
    anchorTab = tabArr[tabCnt];
    contentDiv =  document.getElementById("Content"+anchorTab.id);
    parentDiv = contentDiv.parentNode;
    parentDiv.removeChild(contentDiv);
    parentDiv = anchorTab.parentNode;
    parentDiv.removeChild(anchorTab);
  }
  curPage = 1;
  
}
                 
  


        
            
                  
   
      
      
        

//12.1 Dashboard changes ends
//12.0.2 SOATEAM Changes Starts
taskDashboardFuncDetails.prototype.setDashboardSecDIV = setDashboardSecDIV;
taskDashboardFuncDetails.prototype.getDashboardPartDIV = getDashboardPartDIV;
function taskDashboardFuncDetails(dFuncId,dbCount) {
    var parentFunction = dFuncId;
    this.funcId = dFuncId;
	this.dCount = dbCount;
    this.xmlFile = "";
    this.scrType = 'L';
}
function setDashboardSecDIV(divTabContent, partDIV) {
    var sectionClass = "DIVTwoColSectionContainer";
    if (document.getElementById("vtab").style.display == "none") {
        sectionClass = "DIVThreeColSectionContainer";
    }
    var secDiv = document.createElement("div");
    secDiv.className = sectionClass;
    secDiv.style.width = document.getElementById("dashboard").offsetWidth - 4 + "px";
    //secDiv.style.height = document.getElementById("vTabDB_DASHBOARD").offsetHeight/3 - 4 + "px";
	if(this.dCount <= 3)
	{
	   secDiv.style.height = document.getElementById("vTabDB_DASHBOARD").offsetHeight/this.dCount - 4 + "px";
	}
	else if (this.dCount == 4)
	{
	secDiv.style.height = document.getElementById("vTabDB_DASHBOARD").offsetHeight/2 - 4 + "px";
	}
	else
	{
	secDiv.style.height = (document.getElementById("vTabDB_DASHBOARD").offsetHeight/3) - 4 + "px";
	}
    secDiv.appendChild(partDIV);
    divTabContent.appendChild(secDiv);
}
function getDashboardPartDIV(timestamp) {
    var partDiv = document.createElement("div");
    partDiv.id = "divpart"+this.funcId.replace(/\s/g, '')+timestamp.getTime();
    //partDiv.className = "DIVColumnOne";
	//partDiv.style.width = document.getElementById("dashboard").offsetWidth/2 - 4 + "px";
	//partDiv.style.height = document.getElementById("vTabDB_DASHBOARD").offsetHeight/3 - 4 + "px";
	if(this.dCount <= 3)
	{
		//partDiv.className = "DIVColumnTriple";
		partDiv.className = "DIVColumnDouble";
	}
	else
	{
		partDiv.className = "DIVColumnOne";
	}
    /*if (document.getElementById("vtab").style.display == "none") {
        partDiv.className = "DIVColumnOneAndHalf";
    }
    if(this.scrType == "M") {
        partDiv.className = "DIVColumnDouble";
        if (document.getElementById("vtab").style.display == "none") {
            partDiv.className = "DIVColumnTriple";
        }
    } else if(this.scrType == "M") {
        partDiv.className = "DIVColumnTriple";
    }
*/    return partDiv;
}
function dispDBQueue(winId,qName,qType,reportId,filedLists,actions,desc,time) {
	var src;
	var SortField = tabTableContent[winId+'SortField']; 
	var SortOrder = tabTableContent[winId+'SortOrder'] ;
	var page =tabTableContent[winId+'page'];
	var gotoVal =tabTableContent[winId+'goto'];
	var totPageTemp = tabTableContent[winId+'totPageTemp'];
	currPage = tabTableContent[winId+'currPage'] ;
    if (!page || page == '' || page == null || page == undefined) {
        page = 'FIRST';
        currPage = 1;
    } else if (page == 'GOTOPAGE') {
        if (gotoVal != '' && gotoVal > 0 && gotoVal <= tabTableContent[winId+'totalPages']) {
            page = page + "!" + gotoVal;
        } else {
           alert(mainWin.getItemDesc("LBL_ENTERVALIDNUM"))
            return false;
        }
    }
	
	if (!qType || qType == '' || qType == null || qType == undefined) {
		qType = tabTableContent[winId+'qType'];
	}

	if (!SortField || SortField == '' || SortField == null || SortField == undefined) {
        if(qType =='D')	      //12.1 Retro_Changes Starts
            SortField = '';	   
        else				  
        SortField = 'CREATEDDATE';
    }
    if (!SortOrder || SortOrder == '' || SortOrder == null || SortOrder == undefined) {
        if(qType =='D')			  
            SortOrder = '';		   
        else					   //12.1 Retro_Changes Ends
        SortOrder = 'ASCENDING';
    }
	if (!qName || qName == '' || qName == null || qName == undefined) {
	qName = tabTableContent[winId+'qName'];
	}
	/*
	if (!qType || qType == '' || qType == null || qType == undefined) {
		qType = tabTableContent[winId+'qType'];
	}*/ // Moved few lines above
	
	if (!filedLists || filedLists == '' || filedLists == null || filedLists == undefined) {
	filedLists = tabTableContent[winId+'filedLists'];
	}
	if (!actions || actions == '' || actions == null || actions == undefined) {
	actions = tabTableContent[winId+'actions'];
	}
	if (!desc || desc == '' || desc == null || desc == undefined) {
	desc = tabTableContent[winId+'desc'];
	}	
	if (!reportId || reportId == '' || reportId == null || reportId == undefined) {
	reportId = tabTableContent[winId+'reportId'];
	}
	if(totPageTemp == undefined){
		totPageTemp = 1;
	}
	page = page + "," + currPage + "," + totPageTemp ;
	if(qName =='SUPACQUIRED')
		pCode = 'SUPV';	
	else 
		pCode ='ALL';
	var taskRequestXml = getTaskRequestXml(qName, page, SortField, SortOrder);
	var customWinData ="";
	var tasksDom ;
	tabTableContent[winId+'qName']=qName;
	tabTableContent[winId+'actions']=actions;
	tabTableContent[winId+'qType']=qType;
	tabTableContent[winId+'filedLists']=filedLists;
	tabTableContent[winId+'desc']=desc;
	tabTableContent[winId+'reportId']=reportId;
	if(qType =='Q'){
			tasksDom = getTasksDom(taskRequestXml, 'ALL');
			tabTableContent[winId+'TASKDOM'] = tasksDom ;
			/*//var startTag="<TABLE id='"+winId+"Table"+"' class='TBLgrid' cellspacing='0' cellpadding='0' border='0' role='presentation' type='ME' style='overflow:auto;width:100%;' ><THEAD id='"+winId+"THead"+"'></THEAD><TBODY id='"+winId+"TBody"+"'></TBODY></TABLE>";
			document.getElementById(winId).innerHTML='';
			document.getElementById(winId).insertAdjacentHTML("beforeEnd", startTag);
			document.getElementById(winId).innerHTML='';
			document.getElementById(winId).insertAdjacentHTML("beforeEnd", startTag);*/
            //populateDashBoardHTML(tasksDom,winId,qName,filedLists,false);
			tabTableContent[winId+'TABLE'] = populateDashBoardHTML(tasksDom,winId,qName,filedLists,false);
			//tabTableContent[winId+'TABLE'] = document.getElementById(winId).innerHTML;
			//tabTableContent[winId+'TABLE'] = document.getElementById(winId).innerHTML;
			tabTableContent[winId+'ACTIONS'] =actions;
			/*document.getElementById(winId).innerHTML='';
			document.getElementById(winId).insertAdjacentHTML("beforeEnd", startTag);*/
            //populateDashBoardHTML(tasksDom,winId,qName,filedLists,true);
			tabTableContent[winId+'DETAILTABLE'] = populateDashBoardHTML(tasksDom,winId,qName,filedLists,true);
			if(!isRefresh||tabTableContent[winId+'INITIALIZEREF']==undefined)
			{
			document.getElementById(winId).innerHTML='';
			customWinData ="<iframe id='ifr_LaunchWin"+winId+"' src='BpelDashboard.jsp?winId="+winId+"&qType="+qType+"&qDesc="+desc+"' allowtransparency='true' frameborder='0' scrolling='no' title='' ></iframe>";
			document.getElementById(winId).insertAdjacentHTML("beforeEnd", customWinData);
			}
			else
			{
			//initializeRef();
			tabTableContent[winId+'INITIALIZEREF']();
			isRefresh = false;
			}		
	}else if(qType =='B'){
                if(!is_bam_logged_in){	//12.1 Retro_Changes
                    fn_login_bam();   	 //12.1 Retro_Changes
                }						 //12.1 Retro_Changes
	    document.getElementById(winId).innerHTML='';
		tabTableContent[winId+'TABLE'] = '<iframe id="bam_LaunchWin" src="DispReport.jsp?winId='+winId+'&reportId='+reportId+'" allowtransparency="true" frameborder="0" scrolling="no" title="" ></iframe>';
		tabTableContent[winId+'DETAILTABLE'] = '<iframe id="bam_LaunchWin" src="DispReport.jsp?winId='+winId+'&reportId='+reportId+'" allowtransparency="true" frameborder="0" scrolling="no" title="" ></iframe>';
		customWinData = "<iframe id='ifr_LaunchWin"+winId+"' src='BpelDashboard.jsp?winId="+winId+"&qType="+qType+"&qDesc="+desc+"' allowtransparency='true' frameborder='0' scrolling='no' title='' ></iframe>";
		document.getElementById(winId).insertAdjacentHTML("beforeEnd", customWinData);
	}else if(qType =='C'){	   //12.1 Retro_Changes
			//document.getElementById(winId).innerHTML='';
			getTaskCountHTML(reportId,filedLists,winId,qType,qName,desc,actions);
			/*var startTag="<TABLE id='QuickViewCountTable"+"' class='TBLgrid' cellspacing='0' cellpadding='0' border='0' role='presentation' type='ME' style='overflow:auto;width:100%;' >";
			tabTableContent[winId+'TABLE'] =getTaskCountHTML(startTag,reportId,filedLists);
			tabTableContent[winId+'ACTIONS'] =actions;
			tabTableContent[winId+'DETAILTABLE'] =getTaskCountHTML(startTag,reportId,filedLists);
			customWinData ="<iframe id='ifr_LaunchWin"+winId+"' src='BpelDashboard.jsp?winId="+winId+"&qType="+qType+"&qDesc="+qName+"' allowtransparency='true' frameborder='0' scrolling='yes' title='' ></iframe>";
			document.getElementById(winId).insertAdjacentHTML("beforeEnd", customWinData);*/
	}else if(qType =='RAD'){	//12.1 Retro_Changes
			var srcType ='M';
			var uiName ='';
			var msgType ='';
			var actionType ='';
			var numeric ='';
           		var txnBrn = "";
            		//multiBrnScrOpened = false;
		        var t = getDateObject();
		        var inTime=(t.getHours()*(3600*1000))+(t.getMinutes()*(60*1000))+(t.getSeconds()*1000)+t.getMilliseconds();
           		if (typeof(g_txnBranch) != "undefined")
                		txnBrn = g_txnBranch;    
			 //25081813 starts
                        //var src = "SMSStartLogServlet?funcid=" + qName+ "&uiName=" + uiName + "&msgType=" + msgType + "&actionType=" + actionType + "&timestamp=" + time + "&numeric=" + numeric +"&parentArgs="+ ParentArgs + "&inTime=" + inTime+ "&X-CSRFTOKEN=" + mainWin.CSRFtoken+ "&txnBranch=" +txnBrn;//debug revert
                        var src = "TempForward.jsp?action=SMSStartLogServlet?funcid=" + qName+ "&uiName=" + uiName + "&msgType=" + msgType + "&actionType=" + actionType + "&timestamp=" + time + "&numeric=" + numeric +"&parentArgs="+ ParentArgs + "&inTime=" + inTime+ "&txnBranch=" +txnBrn;
                        //25081813 ends
    			var customWinData = '<iframe id="ifr_LaunchWin" src="'+src+'" allowtransparency="true" frameborder="0" scrolling="no" title=""></iframe>';
			document.getElementById(winId).insertAdjacentHTML("beforeEnd", customWinData);
//12.1 Retro_Changesstarts
	}else if(qType =='D'){
			tasksDom = getDashBoardSummaryRecords(reportId, page, SortField, SortOrder);
			tabTableContent[winId+'TASKDOM'] = tasksDom ;
			tabTableContent[winId+'TABLE'] = getSummaryDashBoardHTML(tasksDom,winId);
			tabTableContent[winId+'ACTIONS'] =actions;
			tabTableContent[winId+'DETAILTABLE'] = tabTableContent[winId+'TABLE'];
			if(!isRefresh||tabTableContent[winId+'INITIALIZEREF']==undefined)
			{
                            document.getElementById(winId).innerHTML='';
                            customWinData ="<iframe id='ifr_LaunchWin"+winId+"' src='BpelDashboard.jsp?winId="+winId+"&qType="+qType+"&qDesc="+desc+"' allowtransparency='true' frameborder='0' scrolling='no' title='' ></iframe>";
                            document.getElementById(winId).insertAdjacentHTML("beforeEnd", customWinData);
			}
			else
			{
                            tabTableContent[winId+'INITIALIZEREF']();
                            isRefresh = false;
			}		
	}
//12.1 Retro_Changes ends	
}  
//12.1 Retro_Changes starts
function fn_login_bam(){
    var winId ="divpartBamLoginWindow";
    var divTabContent = document.getElementById("vTabCN_CENTRAL_PROCESSPart3"); //Changes done for proper display of dashboards
    var partDiv = document.createElement("div");
    partDiv.id = winId;
    divTabContent.appendChild(partDiv);
    document.getElementById(winId).innerHTML='';
    customWinData = '<iframe id="bam_LaunchWin" src="DispReport.jsp?winId='+winId+'&reporType=BL" allowtransparency="true" frameborder="0" scrolling="no" title="" onreadystatechange ="fn_close_Bam()" style="display:none"></iframe>';
    document.getElementById(winId).insertAdjacentHTML("beforeEnd", customWinData);
    is_bam_logged_in =true;
}
//12.1 Retro_Changes ends
function populateDashBoardHTML(tasksDom,winId,qName,filedLists,isDetail) {
    var tasks = selectNodes(tasksDom, "//TaskMsg/Tasks/Task");
    var taskLength = tasks.length;
    //var tableRef = document.getElementById(winId+"Table").tBodies[0];
    //var tableHeader = document.getElementById(winId+"Table").tHead; // CTCB
	//var tableStart = document.createElement("<TABLE id='"+winId+"Table"+"' class='TBLgrid' cellspacing='0' cellpadding='0' border='0' role='presentation' type='ME' style='overflow:auto;width:100%;' ><THEAD id='"+winId+"THead"+"'></THEAD><TBODY id='"+winId+"TBody"+"'></TBODY></TABLE>");
	var tableStart;
	var tableHeader;
	var tableRef;
	tableStart = document.createElement("TABLE");
	tableStart.setAttribute("ID", winId+'Table');
	tableStart.setAttribute("CLASS", 'TBLgrid');
	tableStart.setAttribute("CELLSPACING", '0');
	tableStart.setAttribute("CELLPADDING", '0');
	tableStart.setAttribute("BORDER", '0');
	tableStart.setAttribute("ROLE", 'presentation');
	tableStart.setAttribute("TYPE", 'ME');
	tableStart.setAttribute("STYLE", 'overflow:auto;width:100%;');	
	tableHeader = document.createElement("THEAD");
	tableHeader.setAttribute("ID", winId+'THead');
	tableStart.appendChild(tableHeader);
	tableRef = document.createElement("TBODY");
	tableHeader.setAttribute("ID", winId+'TBody');
	tableStart.appendChild(tableRef);
	//var tableHeader = document.createElement(document.getElementById(winId+"Table").tHead);
	//var tableRef = document.createElement(document.getElementById(winId+"Table").tBodies[0]);
	var filedListsArr = new Array();
	var tempArr = new Array();
	tabTableContent[winId+'taskCount']=0;
	if(filedLists != 'null'&&!isDetail){
		tempArr = filedLists.split(',');
		for(i=0;i<tempArr.length;i++){
			filedListsArr[tempArr[i]]=tempArr[i];
		}
	}
    var processCodesArr = new Array();
    processCodesArr[0] = 'ALL';
    if (isTaskSearch) {
        if (pCode != 'ALL') 
            processCodesArr[1] = pCode;
    }
	if(qName =='SUPACQUIRED')
		processCodesArr[1] = pCode;
    var bpelTaskSearch = parent.bpelTaskSearch;
    var tempDoc = loadXMLDoc(bpelTaskSearch);
    var newCell;
    var newRow = document.createElement("TR");
    tableHeader.appendChild(newRow);
    var headerColArr = new Array();
	var tooltipHeaderArr = new Array();
	newRow = document.createElement("TR");
	tableHeader.appendChild(newRow);
    newCell = document.createElement("TH");
    newCell.setAttribute("CLASS", 'TBLoneTH1');
    newCell.innerHTML = '<label class="LBLinv" for="Checkbox1">'+mainWin.getItemDesc("LBL_SELECT_ALL")+'</label><INPUT TYPE="CHECKBOX" id="Checkbox1" CLASS = "CHKStd"/>';
    addEvent(newCell, 'onclick', 'fnCheckAllTasks()');
    newRow.appendChild(newCell);
			var tooltipheaderColMap =new Array();
			var headerColMap =new Array();
    for (index = 0,col=0; index < processCodesArr.length; index++) {
        if (processCodesArr[index] != "" ) {
            for (i = 0; i < selectSingleNode(tempDoc, "PROCESS_CODES/" + processCodesArr[index]).childNodes.length; i++,col++) {
                var tempArray = getNodeText(selectSingleNode(tempDoc, "PROCESS_CODES/" + processCodesArr[index]).childNodes[i]).split("~");
				if (tempArray[5] == 'Y') {
					if( tempArray[1] != undefined){
							tooltipHeaderArr[tooltipHeaderArr.length] = mainWin.getItemDesc(tempArray[1]);
							tooltipheaderColMap[tooltipHeaderArr.length]=col;
						}				
						if( tempArray[1] != undefined && filedListsArr[tempArray[0]] != undefined || tempArr.length == 0){
						var headerCount = headerColArr.length;			 
						headerColArr[headerCount] = tempArray[1];
						headerColMap[headerCount] = col;
						var headText = mainWin.getItemDesc(tempArray[1]);
						newCell = document.createElement("TH");
						newCell.className = "TBLoneTH";
						newCell.innerHTML = "<A CLASS=Astd><span class=\"SPNup hide\">&nbsp;&nbsp;&nbsp;&nbsp;</span>" + headText + "</A>";
						addEvent(newCell, "onclick", "FnSortTask(event)");
						if (tempArray[2] == 'null' && tempArray[3] == 'null') {
							newCell.id = tempArray[0];
						} else {
							newCell.id = tempArray[2] + 'ATTRIBUTE' + tempArray[3];
						}
						if (tasksDom && selectSingleNode(tasksDom, "//TaskMsg")!=null && selectSingleNode(tasksDom, "//TaskMsg").getAttribute("sortField") == newCell.id) {
							var image = document.createElement("img");
							if (selectSingleNode(tasksDom, "//TaskMsg").getAttribute("sortOrder") == "ASCENDING") 
								image.setAttribute("src", mainWin.theme_imagesPath+"/Icons/up.gif");
							else 
								image.setAttribute("src", mainWin.theme_imagesPath+"/Icons/down.gif");
							newCell.appendChild(image);
						}
						newRow.appendChild(newCell);
				}
			}
			}
        }
    }
    if (taskLength == 0) 
        //return tableStart.outerHTML;//return false;
		return getOuterHTML_TXADisp(tableStart);
    newRow = null;
    for (var taskIndex = 0; taskIndex < taskLength; taskIndex++) {
        rowHTML = '';
		var toolTipHtml='<div id="tooltipDiv" class="WNDcontainerModal" style="overflow:none;border:1px solid black"><TABLE class="TBLgrid" cellspacing="0" cellpadding="0" border="0" role="presentation" type="ME" style="overflow:auto;width:100%;" >';
        taskId = tasks[taskIndex].getAttribute("ID");
        funcId = tasks[taskIndex].getAttribute("FID");
        var workflowRefNo = tasks[taskIndex].getAttribute("WFREFNO");
		var instanceId = tasks[taskIndex].getAttribute("INSTANCEID");
        statusNode = selectSingleNode(tasks[taskIndex], "TaskActions").getAttribute("Status");
        if (funcId != 'PRDEXCEP') {
            newRow = document.createElement("TR");
            if (taskIndex % 2 == 1) {
                newRow.className = "TBLoneTRalt";
            } else 
            newRow.className = "TBLoneTR";
            newRow.setAttribute("FUNCID", funcId);
            newRow.setAttribute("STATUS", statusNode);
            newRow.setAttribute("TASKID", taskId);
            newRow.setAttribute("INSTANCEID", instanceId);
            newRow.setAttribute("WFREFNO", workflowRefNo); 
			//addEvent(newRow, "onmouseout", "hideToolTip(event)");
			//newRow.title='header=[First row] body=[second row]';
//			if(curBpmTab=="TASK") addEvent(newRow, "onclick", "fnViewTaskHistory(event)");
//			else if(curBpmTab=="PROCESSTRACK") addEvent(newRow, "onclick", "fnViewflowdiagram(event)");
            if(isDetail)
                addEvent(newRow, "onclick", "fnViewTaskHistory(event)");
            tableRef.appendChild(newRow);
            var colLen = tasks[taskIndex].childNodes.length;
            var cellNum = 0;
            newRow.insertCell(-1);
            tableRef.rows[taskIndex].cells[0].setAttribute("CLASS", 'TBLoneTD1');
            //tableRef.rows[taskIndex].cells[0].innerHTML = '<span CLASS="SPNtext" >' + (taskIndex+1) + '</span>';
			tableRef.rows[taskIndex].cells[0].innerHTML = '<label class="LBLinv" for="Checkbox2'+taskIndex+'">'+taskIndex+'</label><INPUT TYPE="CHECKBOX" id="Checkbox2'+taskIndex+'" CLASS="CHKStd" />';
            cellNum++;
			var tooltooltipRow=1;
            for (var taskColumnCnt = 0; taskColumnCnt < colLen; taskColumnCnt++) {
                try {
                    if (taskColumnCnt < colLen - 1) {
						var value = checkForNull(getNodeText(tasks[taskIndex].childNodes[taskColumnCnt]));
if(tasks[taskIndex].childNodes[taskColumnCnt].nodeName == 'TEXTATTRIBUTE8'){
 if(value=='H')
 {
	value =mainWin.getItemDesc("LBL_HIGH");
 }else if(value=='M'){
	value =mainWin.getItemDesc("LBL_MEDIUM");
 }else{
	value =mainWin.getItemDesc("LBL_LOW");
  }
}
						if(taskColumnCnt==tooltipheaderColMap[tooltooltipRow]){
							if (taskColumnCnt % 2 == 1) {
								toolTipHtml +='<TR class="TBLoneTR">';
							} else 
							toolTipHtml +='<TR class="TBLoneTRalt">';
							toolTipHtml +='<TD><a class="Astd"><span class="SPNup hide">&nbsp;&nbsp;&nbsp;&nbsp;</span>'+tooltipHeaderArr[tooltooltipRow-1]+'</a></TD><TD><span class="SPNtext"><span class="SPNup hide">&nbsp;&nbsp;&nbsp;&nbsp;</span>'+value+'</span></TD></TR>';
							tooltooltipRow++;
							}	
                        if (taskColumnCnt==headerColMap[cellNum-1] ) {
                            newRow.insertCell(-1);
						if (value == '') value = '&nbsp';
                            if (tasks[taskIndex].childNodes[taskColumnCnt].nodeName.indexOf("NUMBER") != -1) {
                                if (Number(value) != 0) {
                                    //tableRef.rows[taskIndex].cells[cellNum].innerHTML = '<span CLASS="SPNtext" tabIndex='+taskColumnCnt+'>' + Number(value) + '</span>';
                                    tableRef.rows[taskIndex].cells[cellNum].innerHTML = '<a class="Astd" tabindex="-1" alt='+taskColumnCnt+' href="#;return false" style="color:#000">' + Number(value) + '</a>';
                                }
                            } else if (tasks[taskIndex].childNodes[taskColumnCnt].nodeName.indexOf("DATE") != -1) {
                                var dateTime = value.split(" ");
                                var date = dateTime[0].split("-");
                                value = format(date[0], date[1] - 1, date[2]);
                                //tableRef.rows[taskIndex].cells[cellNum].innerHTML = '<span class="SPNtext" tabIndex='+taskColumnCnt+'>' + value + ' ' + dateTime[1] + ' ' + dateTime[2] + '</span>';
                                tableRef.rows[taskIndex].cells[cellNum].innerHTML = '<a class="Astd" tabindex="-1" alt='+taskColumnCnt+' href="#;return false" style="color:#000">' + value + ' ' + dateTime[1] + ' ' + dateTime[2] + '</a>';
                            } else {
                                if (taskColumnCnt == 0 || taskColumnCnt == 1) {
                                    tableRef.rows[taskIndex].cells[cellNum].innerHTML = '<a class="Astd" href=\"#\" onclick="showFunctionId(' + taskIndex + ', event);"  onmouseout="parent.hideToolTip(event);">' + value + '</a>';
                                } else {
                                    //tableRef.rows[taskIndex].cells[cellNum].innerHTML = '<span CLASS="SPNtext" tabIndex='+taskColumnCnt+'>' + value + '</span>';
                                    tableRef.rows[taskIndex].cells[cellNum].innerHTML = '<a class="Astd" tabindex="-1" alt='+taskColumnCnt+' href="#;return false" style="color:#000">' + value + '</a>';
                                }
                            }
                            cellNum++;
                        }
                    } else {
                        var actions = checkForNull(getNodeText(tasks[taskIndex].childNodes[taskColumnCnt]));
                        newRow.setAttribute("OUTCOMES", actions);
                    }
                } catch(e) {}
            }
			toolTipHtml +='</TABLE></div>';
			addEvent(tableRef.rows[taskIndex].cells[1].getElementsByTagName("A")[0] , "onmouseover", "parent.showToolTip(event,'"+toolTipHtml+"')");
        }
    }
	    var totalTasks = getTotalTasks(tasksDom);
		tabTableContent[winId+'totalTasks'] =totalTasks;
		tabTableContent[winId+'taskCount']=selectSingleNode(tasksDom, "//TaskMsg").getAttribute("taskCount");
		var pageSize =10;
        var currPage = selectSingleNode(tasksDom, "//TaskMsg").getAttribute("currentPage");
		if (currPage ==0)
         if(selectSingleNode(tasksDom, "//TaskMsg").getAttribute("taskCount") > 0 )
          currPage=1;
		setDashBoardPageInfo(winId,currPage, totalTasks, pageSize);
        //fnshowNavigationbutton(currPage, pageSize, totalTasks);
    //return tableStart.outerHTML;
	return getOuterHTML_TXADisp(tableStart);
}
//12.1 Retro_Changes starts
function getSummaryDashBoardHTML(tasksDom,winId) {
    var records = selectNodes(tasksDom, "//FCUBS_RES_ENV/FCUBS_BODY/REC");
    var recordLength = records.length;
    var tableStart;
    var tableHeader;
    var tableRef;
    tableStart = document.createElement("TABLE");
    tableStart.setAttribute("ID", winId+'Table');
    tableStart.setAttribute("CLASS", 'TBLgrid');
    tableStart.setAttribute("CELLSPACING", '0');
    tableStart.setAttribute("CELLPADDING", '0');
    tableStart.setAttribute("BORDER", '0');
    tableStart.setAttribute("ROLE", 'presentation');
    tableStart.setAttribute("TYPE", 'ME');
    tableStart.setAttribute("STYLE", 'overflow:auto;width:100%;');	
    tableHeader = document.createElement("THEAD");
    tableHeader.setAttribute("ID", winId+'THead');
    tableStart.appendChild(tableHeader);
    tableRef = document.createElement("TBODY");
    tableHeader.setAttribute("ID", winId+'TBody');
    tableStart.appendChild(tableRef);
    var newCell;
    var newRow = document.createElement("TR");
    tableHeader.appendChild(newRow);
    newRow = document.createElement("TR");
    tableHeader.appendChild(newRow);
    newCell = document.createElement("TH");
    newCell.setAttribute("CLASS", 'TBLoneTH1');
    newCell.innerHTML = '<label class="LBLinv" for="Checkbox1">'+mainWin.getItemDesc("LBL_SELECT_ALL")+'</label><INPUT TYPE="CHECKBOX" id="Checkbox1" CLASS = "CHKStd"/>';
    addEvent(newCell, 'onclick', 'fnCheckAllTasks()');
    newRow.appendChild(newCell);
    var collHeaderArr = getNodeText(selectSingleNode(tasksDom, "//FCUBS_RES_ENV/FCUBS_HEADER/COL_NAME")).split("~");
    var collHeaderLabelArr = getNodeText(selectSingleNode(tasksDom, "//FCUBS_RES_ENV/FCUBS_HEADER/COL_LBL")).split("~");
    var collHeaderSortArr = getNodeText(selectSingleNode(tasksDom, "//FCUBS_RES_ENV/FCUBS_HEADER/SORT")).split("~");
    var collHeaderCollTypeArr = getNodeText(selectSingleNode(tasksDom, "//FCUBS_RES_ENV/FCUBS_HEADER/COL_TYPE")).split("~");
    var collHeaderisHidden = getNodeText(selectSingleNode(tasksDom, "//FCUBS_RES_ENV/FCUBS_HEADER/HIDDEN")).split("~");
    for (index = 0,col=0; index < collHeaderArr.length; index++) {
        newCell = document.createElement("TH");
        newCell.className = "TBLoneTH";
        newCell.innerHTML = "<A CLASS=Astd><span class=\"SPNup hide\">&nbsp;&nbsp;&nbsp;&nbsp;</span>" + collHeaderLabelArr[index] + "</A>";
        addEvent(newCell, "onclick", "FnSortTask(event)");
        newCell.id = collHeaderArr[index];
        //if(collHeaderisHidden[index]=='Y'){
        //if(collHeaderisHidden.indexOf(collHeaderArr[index])!=-1){
	if(collHeaderisHidden.join().indexOf(collHeaderArr[index])!=-1){
            newCell.style.display ='none';
        }
        if (collHeaderSortArr[index]=='A' || collHeaderSortArr[index]=='D') {
                var image = document.createElement("img");
                if (collHeaderSortArr[index]=='A') 
                        image.setAttribute("src", mainWin.theme_imagesPath+"/Icons/up.gif");
                else 
                        image.setAttribute("src", mainWin.theme_imagesPath+"/Icons/down.gif");
                newCell.appendChild(image);
        }
        newRow.appendChild(newCell);
    }
    if (recordLength == 0) 
		return getOuterHTML_TXADisp(tableStart);
    newRow = null;
    for (var recordIndex = 0; recordIndex < recordLength; recordIndex++) {
        rowHTML = '';
           newRow = document.createElement("TR");
            if (recordIndex % 2 == 1) {
                newRow.className = "TBLoneTRalt";
            } else 
            newRow.className = "TBLoneTR";
            tableRef.appendChild(newRow);
            var cellNum = 0;
            newRow.insertCell(-1);
            tableRef.rows[recordIndex].cells[0].setAttribute("CLASS", 'TBLoneTD1');
            tableRef.rows[recordIndex].cells[0].innerHTML = '<label class="LBLinv" for="Checkbox2'+recordIndex+'">'+recordIndex+'</label><INPUT TYPE="CHECKBOX" id="Checkbox2'+recordIndex+'" CLASS="CHKStd" />';
            cellNum++;
            var recDetailsArr = checkForNull(getNodeText(records[recordIndex])).split('~');
            for (var taskColumnCnt = 0; taskColumnCnt < collHeaderArr.length; taskColumnCnt++) {
                try {
                        var value = recDetailsArr[taskColumnCnt];
                            newRow.insertCell(-1);
                            if (value == '') value = '&nbsp';
                            if (collHeaderCollTypeArr[taskColumnCnt]=="NUMBER") {
                                if (Number(value) != 0) {
                                    //tableRef.rows[recordIndex].cells[cellNum].innerHTML = '<span CLASS="SPNtext" tabIndex='+taskColumnCnt+'>' + Number(value) + '</span>';
                                    tableRef.rows[recordIndex].cells[cellNum].innerHTML = '<a class="Astd" tabindex="-1" alt='+taskColumnCnt+' href="#;return false" style="color:#000">' + Number(value) + '</a>';
                                }
                            } else if (collHeaderCollTypeArr[taskColumnCnt]=="DATE") {
                                //tableRef.rows[recordIndex].cells[cellNum].innerHTML = '<span class="SPNtext" tabIndex='+taskColumnCnt+'>' + value +'</span>';
                                tableRef.rows[recordIndex].cells[cellNum].innerHTML = '<a class="Astd" tabindex="-1" alt='+taskColumnCnt+' href="#;return false" style="color:#000">' + value +'</a>';
                            } else {
                                /*if (taskColumnCnt == 0 || taskColumnCnt == 1) {
                                    tableRef.rows[recordIndex].cells[cellNum].innerHTML = '<a class="Astd" href=\"#\" onclick="showFunctionId(' + recordIndex + ', event);"  onmouseout="parent.hideToolTip(event);">' + value + '</a>';
                                } else {*/
                                    //tableRef.rows[recordIndex].cells[cellNum].innerHTML = '<span CLASS="SPNtext" tabIndex='+taskColumnCnt+'>' + value + '</span>';
                                    tableRef.rows[recordIndex].cells[cellNum].innerHTML = '<a class="Astd" tabindex="-1" alt='+taskColumnCnt+' href="#;return false" style="color:#000">' + value +'</a>';
                                //}
                            }
                            //if(collHeaderisHidden[taskColumnCnt]=='Y'){
                            //if(collHeaderisHidden.indexOf(collHeaderArr[taskColumnCnt])!=-1){
				if(collHeaderisHidden.join().indexOf(collHeaderArr[taskColumnCnt])!=-1){
                               tableRef.rows[recordIndex].cells[cellNum].style.display ='none';
                               //tableRef.rows[recordIndex].setAttribute(collHeaderArr[taskColumnCnt],value);
                            }    
							tableRef.rows[recordIndex].setAttribute(collHeaderArr[taskColumnCnt],value);						
                            cellNum++;
                } catch(e) {}
            }
    }
var totalTasks = getNodeText(selectSingleNode(tasksDom, "//FCUBS_RES_ENV/FCUBS_HEADER/TOTAL_COUNT"));
tabTableContent[winId+'totalTasks'] =totalTasks;
tabTableContent[winId+'taskCount']=getNodeText(selectSingleNode(tasksDom, "//FCUBS_RES_ENV/FCUBS_HEADER/TOTAL_COUNT"));
var pageSize =10;
var currPage = getNodeText(selectSingleNode(tasksDom, "//FCUBS_RES_ENV/FCUBS_HEADER/CURR_PAGE"));;
if (currPage ==0)
 if(recordLength > 0 )
  currPage=1;
setDashBoardPageInfo(winId,currPage, totalTasks, pageSize);
return getOuterHTML_TXADisp(tableStart);
} 
//12.1 Retro_Changes Ends
function setDashBoardPageInfo(winId,currPage, totalTasks, pageSize){
	if (tabTableContent[winId+'taskCount'].indexOf("+") != -1){
		if(currPage ==1){
			tabTableContent[winId+'totalPages'] =Math.ceil(totalTasks / pageSize)+'..';
			tabTableContent[winId+'currPage'] =currPage;
		}else if(currPage == Math.ceil(totalTasks / pageSize)){
			tabTableContent[winId+'totalPages'] =Math.ceil(totalTasks / pageSize);
			tabTableContent[winId+'currPage'] ='..'+currPage;				
		}else{
			tabTableContent[winId+'totalPages'] =Math.ceil(totalTasks / pageSize)+'..';
			tabTableContent[winId+'currPage'] ='..'+currPage;				
		}
	}else{
		tabTableContent[winId+'totalPages'] =Math.ceil(totalTasks / pageSize);
		tabTableContent[winId+'currPage'] =currPage;
	}	
}
function showToolTip(e,text){
    //if(document.all)e = event; 
	var event = window.event || e;
	if(document.getElementById("bubble_tooltip") ==null){
		var customWin = document.createElement("fieldset");
		customWin.id = "bubble_tooltip";
		customWin.className = "FSTcell";
		customWin.type ="ME"
		customWin.view ="ME"
		customWin.style.position = "absolute";
		customWin.innerHTML ='<div id="bubble_tooltip_content">';
		document.getElementById("vTabDB_DASHBOARD").appendChild(customWin);
	}
        var obj = document.getElementById('bubble_tooltip');
        var obj2 = document.getElementById('bubble_tooltip_content');
		obj2.innerHTML = text;
        obj.style.display = 'block';
        var st = Math.max(document.body.scrollTop,document.documentElement.scrollTop);
        if(getBrowser().indexOf('SAFARI') >= 0)st=0; //ie11 changes
        var leftPos = event.clientX-2;
        if(leftPos<0)leftPos = 0;
        obj.style.left = leftPos+20 + 'px';
       //obj.style.bottom = event.clientY-obj.offsetHeight+2+st+ 'px';
       obj.style.top = event.clientY+50 + 'px';
}       
function hideToolTip(e)
{
    if(document.getElementById('bubble_tooltip')!=null)    
		document.getElementById('bubble_tooltip').style.display = 'none';
}
function showQueueTabs(queues,isDashboard,event)
{
var labelApplyFilter = getItemDesc("LBL_APPLY_FILTERS");
	try{
	clearLandingPage();
	}catch(e){
	}
	//isFilterTask = false; //TAB Always Shown
	//document.getElementById("TBLPageidFilters").style.display='none';//TAB Always Shown
	if(isDashboard||queues==''){
		//document.getElementById("btnDiv").style.display='';
	//	document.getElementById("btnDiv12").style.display='';
	//	if(document.getElementById("SYS_TBL_TASK_TABS")!=null)
		//	document.getElementById("SYS_TBL_TASK_TABS").style.display='none';
    document.getElementById("hTab_DBoardTasks").style.display='none';
		currentTaskTab ='';
		return true;
	}
	var queueDetails = queues.split('!');
	//var taskTabHTML = '<div id="TEMPDIV">';
	//taskTabHTML += '<button id="btntabrefresh" class="Abut" onclick="fnRefreshDashBoardData(event)" accesskey="1" style="float: right; margin-right: 50px;margin-top:2px;margin-bottom:2px;">';
	//taskTabHTML += '<img src="Images/widgetoneRefresh1.gif" alt="Refresh">';
	//taskTabHTML += '</button>';
	//taskTabHTML +='</div>';
	//if(document.getElementById("SYS_TBL_TASK_TABS")!=null){
	//	document.getElementById("SYS_TBL_TASK_TABS").style.display='';
    document.getElementById("hTab_DBoardTasks").style.display='block';
		//document.getElementById("SYS_TBL_TASK_TABS").innerHTML =taskTabHTML;
//	}
	//else {
	//	taskTabHTML = '<div id="SYS_TBL_TASK_TABS" style="float:left;width:100%">'+taskTabHTML;
	//	taskTabHTML +='</div>';
  //  document.getElementById("hTab_DBoardTasks").style.display='block';
  //  document.getElementById("hTab_DBoardTasks").insertAdjacentHTML("beforeEnd",taskTabHTML);//12.0.2 SOATEAM
	//}
	for(i=0;i<queueDetails.length&&queueDetails[i]!='';i++){
		var queueId =queueDetails[i].split('~');
    if(document.getElementById("A_"+queueId[1]) == undefined){
      var anchorElem = document.createElement("a");
      anchorElem.id = "A_"+queueId[1];
      addEvent(anchorElem, "onclick", "fnShowQueue('"+queueId[1]+"',event)");
      var spanElem = document.createElement("span");
      spanElem.className = "DBoardHeadDivSpanDeSel";
      spanElem.id = 'SPAN_'+queueId[1];
      spanElem.innerHTML = queueId[0] + "<span class=\"DBoardHeadClose\" onclick=\"closeQueueTab(this.parentNode.parentNode,event)\"><span class=\"tabClosedGIF\"></span></span>";
      anchorElem.appendChild(spanElem); 
      //document.getElementById("TEMPDIV").appendChild(anchorElem);
      //document.getElementById("hTab_DBoardTasks").appendChild(anchorElem);
      document.getElementById("hTab_DBoardTasks").insertBefore(anchorElem,document.getElementById("hTab_DBoardTasks").lastChild);
    }
	}
	currentTaskTab = queueDetails[0].split('~')[1];
	//fnShowQueue(queueDetails[0].split('~')[1],event);
    return true;
}
function closeQueueTab(tempNode,event){
  var currQueue =tempNode.id;
  currQueue = currQueue.substring(2,currQueue.length);
  var contentDiv = document.getElementById(tempNode.id);
  var pNode =contentDiv.parentNode;
  pNode.removeChild(contentDiv);
  if(pNode.getElementsByTagName("A").length >1)
    var firstQueueID = pNode.getElementsByTagName("A")[0].id;
  if(typeof(event) != 'undefined'){
    if(firstQueueID != undefined && firstQueueID != "" && firstQueueID !='FILTER'){
      firstQueueID = firstQueueID.substring(2,firstQueueID.length);
      if(currentTaskTab == currQueue)
        fnShowQueue(firstQueueID,event);
    }else{
      clearLandingPage();
      document.getElementById("TBLPageidFilters").style.display='none';
      document.getElementById('A_FILTER').style.display = "none";
      document.getElementById("showFilterChkBox").checked=false;
    }
    preventpropagate(event);
  }
}
function fnShowFilters(event){
	if(document.getElementById("showFilterChkBox").checked==true)
		showFilterFields('ALL', event);
	else{
		isFilterTask = false;
		if(currentTaskTab!='')
			fnShowQueue(currentTaskTab,event);
			document.getElementById("TBLPageidFilters").style.display='none';
	}
}
function showFilterFields(queueId) {
    getFilters(queueId);
    document.getElementById("TBLPageidFilters").style.display = 'block';
}
function getFilters(queueId,winId,filterType) {
	var processCode ='ALL';
    var bpelTaskSearch = parent.bpelTaskSearch;
    var tempDoc = loadXMLDoc(bpelTaskSearch);
    var TaskTable ;
	if(winId!=null&&winId!=undefined&&winId!='')
		TaskTable = document.getElementById(winId+"TBTaskFilters");
	else
		TaskTable = document.getElementById("TBTaskFilters");
    TaskTable.setAttribute("STYLE", "clear:both; padding:4px");
    var searchDiv ;
	if(winId!=null&&winId!=undefined&&winId!='')
		searchDiv = document.getElementById(winId+"TBLPageidFilters");
	else
		searchDiv = document.getElementById("TBLPageidFilters");
    searchDiv.style.display = "block";
    if (searchDiv.childNodes[2]) 
        searchDiv.removeChild(searchDiv.childNodes[2]);
    TaskTable.innerHTML = "";
    var fldSet = createNewNode("fieldset", "FSTdiv");
    var legend = createNewNode("legend");
    setInnerText(legend, getItemDesc("LBL_FILTERS"));
    fldSet.appendChild(legend);
    var j = 0;
    var processCodesArr = new Array();
    processCodesArr[0] = 'ALL';
    if (processCode != 'ALL') {
        processCodesArr[1] = processCode;
    }
    var newColumnDiv = createNewNode("div", "DIVColumnMin");
	if (filterType == "D")
		newColumnDiv.style.width = "100%";
    //This variable keeps a track of the number of label tags in divs whose class name will be DIVList
    var DIVListContains = 0;
    for (index = 0; index < processCodesArr.length; index++) {
        if (processCodesArr[index] == "") continue;
        for (i = 0; i < selectSingleNode(tempDoc, "PROCESS_CODES/" + processCodesArr[index]).childNodes.length; i++) {
        var tempArray = getNodeText(selectSingleNode(tempDoc, "PROCESS_CODES/" + processCodesArr[index]).childNodes[i]).split("~");
		if (tempArray[5] == 'Y') {
            if (j == 4) {
                j = 0;
                fldSet.appendChild(newColumnDiv);
                var newColumnDiv = createNewNode("div", "DIVColumnMin");
				if (filterType == "D")
				newColumnDiv.style.width = "100%";
            }
            /*1. When ever the number of label codes in a div whose class is 'DIVList' is 2, a new div should get created.
             *2. The count of label tags will be reset to '0' as the new div will be created
             *3. When the new cell contains a table, it indicates that it is for a date field. In such a case,
             * a new div will be created after that new cell, without validating for the number of label tags in the new cell
             * that contains the table.
             * */
            if (DIVListContains % 2 == 0 || newCellDiv.children[1].tagName.toUpperCase() == "TABLE") {
                var newCellDiv = createNewNode("div", "DIVList");
                DIVListContains = 0;
            }
            /*For a date field, the label will have 'b' tag instead of the label tag.*/
            if (tempArray[0] != "CREATEDDATE" && tempArray[0] != "DATE") {
                var newLabelnode = createNewNode("label", "LBLstd");
                ++DIVListContains;
            } else {
                /*This is to create a 'b' tag instead of a label tag for a date field.*/
                var newLabelnode = createNewNode("b", "LBLstd");
                ++DIVListContains;
            }
            setInnerText(newLabelnode, mainWin.getItemDesc(tempArray[1]));
            if (tempArray[2] == 'null' && tempArray[3] == 'null') {
                newLabelnode.setAttribute("for", tempArray[0]);
                taskSearchFieldName = tempArray[0];
                switch (tempArray[0]) {
                case 'INSTANCEID':
                    tempArray[2] = 'NUMBER';
                    break;
                case 'BRANCH':
                    tempArray[2] = 'TEXT';
                    break;
                case 'PROCESSNAME':
                    tempArray[2] = 'TEXT';
                    break;
                case 'ASSIGNEEGROUPS':
                    tempArray[2] = 'TEXT';
                    break;
                case 'ASSIGNEEUSERS':
                    tempArray[2] = 'TEXT';
                    break;
                case 'CREATEDDATE':
                    tempArray[2] = 'DATE';
                    break;
                case 'TITLE':
                    tempArray[2] = 'TEXT';
                    break;
                case 'PRIORITY':
                    tempArray[2] = 'TEXT';
                    break;
                //9NT1606_12_2_RETRO_12_0_3_23658452 Changes Starts
                case 'ACQUIREDBY':
                    tempArray[2] = 'TEXT';
                    break;
                //9NT1606_12_2_RETRO_12_0_3_23658452 Changes Ends
                }
            } else {
                newLabelnode.setAttribute("for", tempArray[2] + 'ATTRIBUTE' + tempArray[3]);
                taskSearchFieldName = tempArray[2] + 'ATTRIBUTE' + tempArray[3];
            }
            if (tempArray[0] == 'TXN_PRIORITY') {
                tempArray[2] = 'SELECT';
            }
            newCellDiv.appendChild(newLabelnode);
            newColumnDiv.appendChild(newCellDiv);
            if (tempArray[2] == 'NUMBER' || tempArray[2] == 'PROTECTEDNUMBER') {
                var cellSelect = createNewNode("select", "SELstd");
                cellSelect.id = taskSearchFieldName;
                var optNew = createNewNode("option");
                setNodeText(optNew, "=");
                optNew.value = "=";
                try {
                    cellSelect.add(optNew, null);
                } catch(e) {
                    cellSelect.add(optNew);
                }
                var optNew = createNewNode("option");
                setNodeText(optNew, ">");
                optNew.value = "GT";
                try {
                    cellSelect.add(optNew, null);
                } catch(e) {
                    cellSelect.add(optNew);
                }
                var optNew = createNewNode("option");
                setNodeText(optNew, "<");
                optNew.value = "LT";
                try {
                    cellSelect.add(optNew, null);
                } catch(e) {
                    cellSelect.add(optNew);
                }
                var optNew = createNewNode("option");
                setNodeText(optNew, "<=");
                optNew.value = "LTE";
                try {
                    cellSelect.add(optNew, null);
                } catch(e) {
                    cellSelect.add(optNew);
                }
                var optNew = createNewNode("option");
                setNodeText(optNew, ">=");
                optNew.value = "GTE";
                try {
                    cellSelect.add(optNew, null);
                } catch(e) {
                    cellSelect.add(optNew);
                }
                var optNew = createNewNode("option");
                setNodeText(optNew, "!=");
                optNew.value = "NE";
                try {
                    cellSelect.add(optNew, null);
                } catch(e) { //IE
                    cellSelect.add(optNew);
                }
                if (DIVListContains % 2 == 0) {
                    var newCellDiv = createNewNode("div", "DIVList");
                }++DIVListContains;
                newCellDiv.appendChild(cellSelect);
                var newCellLabel = createNewNode("LABEL", "LBLinv");
                newCellLabel.setAttribute("for", taskSearchFieldName);
                setInnerText(newCellLabel, 'Value');
                newCellDiv.appendChild(newCellLabel);
                var cellInput = createNewNode("input", "TXTstd");
                cellInput.id = taskSearchFieldName;
                cellInput.setAttribute("size", '10');
                cellInput.setAttribute("title", mainWin.getItemDesc(tempArray[1]));
                newCellDiv.appendChild(cellInput);
                newColumnDiv.appendChild(newCellDiv);
            } else if (tempArray[2] == 'TEXT' || tempArray[2] == 'PROTECTEDTEXT') {
                var cellSelect = createNewNode("select", "SELstd");
                cellSelect.id = taskSearchFieldName;
                var optNew = createNewNode("option");
                optNew.value = "=";
                setNodeText(optNew, "=");
                try {
                    cellSelect.add(optNew, null);
                } catch(e) {
                    cellSelect.add(optNew);
                }
                var optNew = createNewNode("option");
                optNew.value = "CONTAINS";
                setNodeText(optNew, "CONTAINS");
                try {
                    cellSelect.add(optNew, null);
                } catch(e) {
                    cellSelect.add(optNew);
                }
                if (DIVListContains % 2 == 0) {
                    var newCellDiv = createNewNode("div", "DIVList");
                }++DIVListContains;
                newCellDiv.appendChild(cellSelect);
                var newCellLabel = createNewNode("LABEL", "LBLinv");
                newCellLabel.setAttribute("for", taskSearchFieldName);
                setInnerText(newCellLabel, 'Value');
                newCellDiv.appendChild(newCellLabel);
                var cellInput = createNewNode("input", "TXTstd");
                cellInput.id = taskSearchFieldName;
                cellInput.setAttribute("size", '10');
                cellInput.setAttribute("title", mainWin.getItemDesc(tempArray[1]));
                newCellDiv.appendChild(cellInput);
                newColumnDiv.appendChild(newCellDiv);
            } else if (tempArray[2] == 'DATE' || tempArray[2] == 'PROTECTEDDATE') {
                var newcellTable = createNewNode("table");
                newcellTable.setAttribute('cellpadding', '0');
                newcellTable.setAttribute('cellspacing', '0');
                newcellTable.setAttribute('border', '0');
                var newcellTablerow = createNewNode("tr");
                var newcellTablerowCell = createNewNode("td");
                var newcellTablerowCellLabel = createNewNode("LABEL", "LBLinv");
                setInnerText(newcellTablerowCellLabel, mainWin.getItemDesc('LBL_FROM'));
                newcellTablerowCell.appendChild(newcellTablerowCellLabel);
                newcellTablerow.appendChild(newcellTablerowCell);
                var newcellTablerowCell = createNewNode("td");
                /*For adding a lable element before the input element.*/
                var cellLbl = createNewNode("LABEL", "LBLinv");
                newcellTablerowCell.appendChild(cellLbl);
                var cellInput = createNewNode("input");
                tempArray[0] = 'DT' + tempArray[0];
                var tempName = tempArray[0] + 'I';
                cellInput.setAttribute("type", "hidden");
                cellInput.setAttribute("name", tempArray[0]);
                cellInput.setAttribute("id", 'DT' + taskSearchFieldName); //FCUBS_12.0_PS_01 
                addEvent(cellInput, "onpropertychange", "displayDate(this)");
                newcellTablerowCell.appendChild(cellInput);
                newcellTablerow.appendChild(newcellTablerowCell);
                /*For adding a lable element before the input element.*/
                var cellLbl = createNewNode("LABEL", "LBLinv");
                newcellTablerowCell.appendChild(cellLbl);
                var cellInput = createNewNode("input", "TXTro");
                cellInput.setAttribute("type", "text");
                cellInput.setAttribute("name", tempName);
                cellInput.setAttribute("textname", tempArray[0]);
                cellInput.setAttribute("id", 'DT' + taskSearchFieldName + 'I');//FCUBS_12.0_PS_01 
                cellInput.setAttribute("title", mainWin.getItemDesc('LBL_FROM'));
                addEvent(cellInput, "onblur", "validateInputDate(this.id,event)");
                cellInput.size = 8;
                newcellTablerowCell.appendChild(cellInput);
                var newcellTablerowCell = createNewNode("td");
                var cellInput = createNewNode("button", "BTNimg");
                cellInput.setAttribute("TNAME", tempArray[0]);
                cellInput.setAttribute("INAME", tempName);
                cellInput.setAttribute("oldClassName", "BTNimg");
                cellInput.setAttribute("title", mainWin.getItemDesc('LBL_FROM'));
                addEvent(cellInput, "onclick", "disp_calBPEL(this.getAttribute('TNAME'),event)");
                var cellImg = createNewNode("SPAN", "ICOcalendar");
                cellImg.setAttribute("tabIndex", "-1");
                cellInput.appendChild(cellImg);
                newcellTablerowCell.appendChild(cellInput);
                newcellTablerow.appendChild(newcellTablerowCell);
                var newcellTablerowCell = createNewNode("td");
                var newcellTablerowCellLabel = createNewNode("label", "LBLinv");
                setInnerText(newcellTablerowCellLabel, mainWin.getItemDesc('LBL_TO'));
                newcellTablerowCell.appendChild(newcellTablerowCellLabel);
                newcellTablerow.appendChild(newcellTablerowCell);
                var newcellTablerowCell = createNewNode("td");
                /*For adding a lable element before the input element.*/
                var cellLbl = createNewNode("label", "LBLinv");
                newcellTablerowCell.appendChild(cellLbl);
                var cellInput = createNewNode("input");
                tempArray[0] = 'TO_' + tempArray[0];
                var tempName = tempArray[0] + 'I';
                cellInput.setAttribute("type", "hidden");
                cellInput.setAttribute("name", tempArray[0]);
                cellInput.setAttribute("id", tempArray[0]);
                addEvent(cellInput, "onpropertychange", "displayDate(this)");
                newcellTablerowCell.appendChild(cellInput);
                newcellTablerow.appendChild(newcellTablerowCell);
                /*For adding a lable element before the input element.*/
                var cellLbl = createNewNode("LABEL", "LBLinv");
                newcellTablerowCell.appendChild(cellLbl);
                var cellInput = createNewNode("input", "TXTro");
                cellInput.setAttribute("type", "text");
                cellInput.setAttribute("name", tempName);
                cellInput.setAttribute("textname", tempArray[0]);
                cellInput.setAttribute("id", tempName);
                cellInput.setAttribute("title", mainWin.getItemDesc('LBL_TO'));
                addEvent(cellInput, "onblur", "validateInputDate(this.id,event)");
                cellInput.size = 8;
                newcellTablerowCell.appendChild(cellInput);
                var newcellTablerowCell = createNewNode("td");
                var cellInput = createNewNode("button", "BTNimg");
                cellInput.setAttribute("TNAME", tempArray[0]);
                cellInput.setAttribute("INAME", tempName);
                cellInput.setAttribute("oldClassName", "BTNimg");
                cellInput.setAttribute("title", mainWin.getItemDesc('LBL_TO'));
                addEvent(cellInput, "onclick", "disp_calBPEL(this.getAttribute('TNAME'),event)");
                var cellImg = createNewNode("SPAN", "ICOcalendar");
                cellImg.setAttribute("tabIndex", "-1");
                cellInput.appendChild(cellImg);
                newcellTablerowCell.appendChild(cellInput);
                newcellTablerow.appendChild(newcellTablerowCell);
                newcellTable.appendChild(newcellTablerow);
                newCellDiv.appendChild(newcellTable);
                newColumnDiv.appendChild(newCellDiv);
            } else if (tempArray[2] == 'SELECT') {
                var cellSelect = createNewNode("select", "SELstd");
                cellSelect.id = taskSearchFieldName;
                var optNew = createNewNode("option");
                optNew.value = "=";
                setNodeText(optNew, "=");
                try {
                    cellSelect.add(optNew, null);
                } catch(e) {
                    cellSelect.add(optNew);
                }
                if (DIVListContains % 2 == 0) {
                    var newCellDiv = createNewNode("div", "DIVList");
                }++DIVListContains;
                newCellDiv.appendChild(cellSelect);
                var newCellLabel = createNewNode("LABEL", "LBLinv");
                newCellLabel.setAttribute("for", taskSearchFieldName);
                setInnerText(newCellLabel, 'Value');
                newCellDiv.appendChild(newCellLabel);
                var cellSelect = createNewNode("select", "SELstd");
                var optNew = createNewNode("option");
                optNew.value = "";
                setNodeText(optNew, "");
                try {
                    cellSelect.add(optNew, null);
                } catch(e) {
                    cellSelect.add(optNew);
                }
                var optNew = createNewNode("option");
                optNew.value = "1";
                setNodeText(optNew, "Normal");
                try {
                    cellSelect.add(optNew, null);
                } catch(e) {
                    cellSelect.add(optNew);
                }
                var optNew = createNewNode("option");
                optNew.value = "2";
                setNodeText(optNew, "High");
                try {
                    cellSelect.add(optNew, null);
                } catch(e) {
                    cellSelect.add(optNew);
                }
                newCellDiv.appendChild(cellSelect);
                newColumnDiv.appendChild(newCellDiv);
            }
            j++;
        }
        }
    }
    fldSet.appendChild(newColumnDiv);
    newColumnDiv = createNewNode("DIV", "DIVColumnMin");
    newCellDiv = createNewNode("DIV", "DIVList");
    spanEle = createNewNode("SPAN", "Fright");
    spanEle.setAttribute("STYLE", "margin:0 1.3em 1 2.3em");
    if(filterType=="D")
	{
		var newButton = createNewNode("button", "BTNtext");
		var newButton1 = createNewNode("button", "BTNtext");
		var newButton2 = createNewNode("button", "BTNtext");	
		var newButton3 = createNewNode("button", "BTNtext");	
		var newButton4 = createNewNode("button", "BTNtext");
		addEvent(newButton, "onclick", "fnFilterTasks('"+winId+"')");		
		addEvent(newButton1, "onclick", "fnApplyFilterAllDboard('"+winId+"')");
		addEvent(newButton2, "onclick", "fnSaveFilterDboard('"+winId+"')");
		addEvent(newButton3, "onclick", "fnRetrieveFilterDboard('"+winId+"')");
		addEvent(newButton4, "onclick", "fnExitFilterDboard('"+winId+"')");
		setInnerText(newButton, mainWin.getItemDesc("LBL_FILTERS"));
		setInnerText(newButton1, mainWin.getItemDesc("LBL_APPLY_TO_ALL"));
		setInnerText(newButton2, mainWin.getItemDesc("LBL_ACTION_SAVE"));
		setInnerText(newButton3, mainWin.getItemDesc("LBL_ACTION_RETRIEVE"));
		setInnerText(newButton4, mainWin.getItemDesc("LBL_EXIT"));
		spanEle.appendChild(newButton);
		spanEle.appendChild(newButton1);
		spanEle.appendChild(newButton2);
		spanEle.appendChild(newButton3);
		spanEle.appendChild(newButton4);
	}
	else
	{
	    var newButton = createNewNode("button", "BTNtext");
    /*if(winId==undefined) 
		addEvent(newButton, "onclick", "fnFilterTasks()");
	else*/
		addEvent(newButton, "onclick", "fnFilterTasks()");
    setInnerText(newButton, mainWin.getItemDesc("LBL_FILTERS"));
    spanEle.appendChild(newButton);
	}
    newCellDiv.appendChild(spanEle);
    newColumnDiv.appendChild(newCellDiv);
    fldSet.appendChild(newColumnDiv);
    TaskTable.appendChild(fldSet);
    //Jeev Changes Start Here
    var clientHeight = document.body.clientHeight;
    if(document.getElementById("TaskFiltersHeader")!=null && document.getElementById("TaskFiltersHeader") != undefined){
    	var filterSearchHeight = document.getElementById("TaskFiltersHeader").offsetHeight + document.getElementById("TBTaskFilters").offsetHeight;
	var taskDetailsHeight  = document.getElementById("BPELTaskDetails").offsetHeight + document.getElementById("BPELTaskHeader").offsetHeight;
    	document.getElementById("BPELTaskHistoryDetails").style.display = "block";
    	document.getElementById("BPELTaskHistoryDetails").style.height = (clientHeight - (taskDetailsHeight + filterSearchHeight + 105)) + 'px';
    }
    //Jeev Changes End Here
}
//12.1 Retro_Changes Starts
function getSummaryFilters(winId,fieldLabel,fieldNames,fieldTypes,filterType) {
    var TaskTable ;
	if(winId!=null&&winId!=undefined&&winId!='')
		TaskTable = document.getElementById(winId+"TBTaskFilters");
	else
		TaskTable = document.getElementById("TBTaskFilters");
    TaskTable.setAttribute("STYLE", "clear:both; padding:4px");
    var searchDiv ;
	if(winId!=null&&winId!=undefined&&winId!='')
		searchDiv = document.getElementById(winId+"TBLPageidFilters");
	else
		searchDiv = document.getElementById("TBLPageidFilters");
    searchDiv.style.display = "block";
    if (searchDiv.childNodes[2]) 
        searchDiv.removeChild(searchDiv.childNodes[2]);
    TaskTable.innerHTML = "";
    var fldSet = createNewNode("fieldset", "FSTdiv");
    var legend = createNewNode("legend");
    setInnerText(legend, getItemDesc("LBL_FILTERS"));
    fldSet.appendChild(legend);
    var j = 0;
    var newColumnDiv = createNewNode("div", "DIVColumnMin");
	if (filterType == "D")
		newColumnDiv.style.width = "100%";
    var DIVListContains = 0;
       for (i = 0; i < fieldNames.length; i++) {
            if (j == 4) {
                j = 0;
                fldSet.appendChild(newColumnDiv);
                var newColumnDiv = createNewNode("div", "DIVColumnMin");
                if (filterType == "D")
                    newColumnDiv.style.width = "100%";
            }
            if (DIVListContains % 2 == 0 || newCellDiv.children[1].tagName.toUpperCase() == "TABLE") {
                var newCellDiv = createNewNode("div", "DIVList");
                DIVListContains = 0;
            }
            /*For a date field, the label will have 'b' tag instead of the label tag.*/
            if (fieldTypes[i] != "DATE") {
                var newLabelnode = createNewNode("label", "LBLstd");
                ++DIVListContains;
            } else {
                /*This is to create a 'b' tag instead of a label tag for a date field.*/
                var newLabelnode = createNewNode("b", "LBLstd");
                ++DIVListContains;
            }
            setInnerText(newLabelnode, fieldLabel[i]);
            newLabelnode.setAttribute("for", fieldNames[i]);
            taskSearchFieldName = fieldNames[i];
            newCellDiv.appendChild(newLabelnode);
            newColumnDiv.appendChild(newCellDiv);
            if (fieldTypes[i] == 'NUMBER') {
                var cellSelect = createNewNode("select", "SELstd");
                cellSelect.id = taskSearchFieldName;
                var optNew = createNewNode("option");
                setNodeText(optNew, "=");
                optNew.value = "=";
                try {
                    cellSelect.add(optNew, null);
                } catch(e) {
                    cellSelect.add(optNew);
                }
                var optNew = createNewNode("option");
                setNodeText(optNew, ">");
                optNew.value = "GT";
                try {
                    cellSelect.add(optNew, null);
                } catch(e) {
                    cellSelect.add(optNew);
                }
                var optNew = createNewNode("option");
                setNodeText(optNew, "<");
                optNew.value = "LT";
                try {
                    cellSelect.add(optNew, null);
                } catch(e) {
                    cellSelect.add(optNew);
                }
                var optNew = createNewNode("option");
                setNodeText(optNew, "<=");
                optNew.value = "LTE";
                try {
                    cellSelect.add(optNew, null);
                } catch(e) {
                    cellSelect.add(optNew);
                }
                var optNew = createNewNode("option");
                setNodeText(optNew, ">=");
                optNew.value = "GTE";
                try {
                    cellSelect.add(optNew, null);
                } catch(e) {
                    cellSelect.add(optNew);
                }
                var optNew = createNewNode("option");
                setNodeText(optNew, "!=");
                optNew.value = "NE";
                try {
                    cellSelect.add(optNew, null);
                } catch(e) { //IE
                    cellSelect.add(optNew);
                }
                if (DIVListContains % 2 == 0) {
                    var newCellDiv = createNewNode("div", "DIVList");
                }++DIVListContains;
                newCellDiv.appendChild(cellSelect);
                var newCellLabel = createNewNode("LABEL", "LBLinv");
                newCellLabel.setAttribute("for", taskSearchFieldName);
                setInnerText(newCellLabel, 'Value');
                newCellDiv.appendChild(newCellLabel);
                var cellInput = createNewNode("input", "TXTstd");
                cellInput.id = taskSearchFieldName;
                cellInput.setAttribute("size", '10');
                cellInput.setAttribute("title", fieldLabel[i]);
                newCellDiv.appendChild(cellInput);
                newColumnDiv.appendChild(newCellDiv);
            } else if (fieldTypes[i] == 'VARCHAR2') {
                var cellSelect = createNewNode("select", "SELstd");
                cellSelect.id = taskSearchFieldName;
                var optNew = createNewNode("option");
                optNew.value = "=";
                setNodeText(optNew, "=");
                try {
                    cellSelect.add(optNew, null);
                } catch(e) {
                    cellSelect.add(optNew);
                }
                var optNew = createNewNode("option");
                optNew.value = "CONTAINS";
                setNodeText(optNew, "CONTAINS");
                try {
                    cellSelect.add(optNew, null);
                } catch(e) {
                    cellSelect.add(optNew);
                }
                if (DIVListContains % 2 == 0) {
                    var newCellDiv = createNewNode("div", "DIVList");
                }++DIVListContains;
                newCellDiv.appendChild(cellSelect);
                var newCellLabel = createNewNode("LABEL", "LBLinv");
                newCellLabel.setAttribute("for", taskSearchFieldName);
                setInnerText(newCellLabel, 'Value');
                newCellDiv.appendChild(newCellLabel);
                var cellInput = createNewNode("input", "TXTstd");
                cellInput.id = taskSearchFieldName;
                cellInput.setAttribute("size", '10');
                cellInput.setAttribute("title", fieldLabel[i]);
                newCellDiv.appendChild(cellInput);
                newColumnDiv.appendChild(newCellDiv);
            } else if (fieldTypes[i] == 'DATE') {
                var newcellTable = createNewNode("table");
                newcellTable.setAttribute('cellpadding', '0');
                newcellTable.setAttribute('cellspacing', '0');
                newcellTable.setAttribute('border', '0');
                var newcellTablerow = createNewNode("tr");
                var newcellTablerowCell = createNewNode("td");
                var newcellTablerowCellLabel = createNewNode("LABEL", "LBLinv");
                setInnerText(newcellTablerowCellLabel, mainWin.getItemDesc('LBL_FROM'));
                newcellTablerowCell.appendChild(newcellTablerowCellLabel);
                newcellTablerow.appendChild(newcellTablerowCell);
                var newcellTablerowCell = createNewNode("td");
                /*For adding a lable element before the input element.*/
                var cellLbl = createNewNode("LABEL", "LBLinv");
                newcellTablerowCell.appendChild(cellLbl);
                var cellInput = createNewNode("input");
                fieldNames[i] = 'DT' + fieldNames[i];
                var tempName =  fieldNames[i] + 'I';
                cellInput.setAttribute("type", "hidden");
                cellInput.setAttribute("name", fieldNames[i]);
                cellInput.setAttribute("id", 'DT' + taskSearchFieldName); //FCUBS_12.0_PS_01 
                addEvent(cellInput, "onpropertychange", "displayDate(this)");
                newcellTablerowCell.appendChild(cellInput);
                newcellTablerow.appendChild(newcellTablerowCell);
                /*For adding a lable element before the input element.*/
                var cellLbl = createNewNode("LABEL", "LBLinv");
                newcellTablerowCell.appendChild(cellLbl);
                var cellInput = createNewNode("input", "TXTro");
                cellInput.setAttribute("type", "text");
                cellInput.setAttribute("name", tempName);
                cellInput.setAttribute("textname", fieldNames[i]);
                cellInput.setAttribute("id", 'DT' + taskSearchFieldName + 'I');//FCUBS_12.0_PS_01 
                cellInput.setAttribute("title", mainWin.getItemDesc('LBL_FROM'));
                addEvent(cellInput, "onblur", "validateInputDate(this.id,event)");
                cellInput.size = 8;
                newcellTablerowCell.appendChild(cellInput);
                var newcellTablerowCell = createNewNode("td");
                var cellInput = createNewNode("button", "BTNimg");
                cellInput.setAttribute("TNAME",  fieldNames[i]);
                cellInput.setAttribute("INAME", tempName);
                cellInput.setAttribute("oldClassName", "BTNimg");
                cellInput.setAttribute("title", mainWin.getItemDesc('LBL_FROM'));
                addEvent(cellInput, "onclick", "disp_calBPEL(this.getAttribute('TNAME'),event)");
                var cellImg = createNewNode("SPAN", "ICOcalendar");
                cellImg.setAttribute("tabIndex", "-1");
                cellInput.appendChild(cellImg);
                newcellTablerowCell.appendChild(cellInput);
                newcellTablerow.appendChild(newcellTablerowCell);
                var newcellTablerowCell = createNewNode("td");
                var newcellTablerowCellLabel = createNewNode("label", "LBLinv");
                setInnerText(newcellTablerowCellLabel, mainWin.getItemDesc('LBL_TO'));
                newcellTablerowCell.appendChild(newcellTablerowCellLabel);
                newcellTablerow.appendChild(newcellTablerowCell);
                var newcellTablerowCell = createNewNode("td");
                /*For adding a lable element before the input element.*/
                var cellLbl = createNewNode("label", "LBLinv");
                newcellTablerowCell.appendChild(cellLbl);
                var cellInput = createNewNode("input");
                fieldNames[i] = 'TO_' + fieldNames[i];
                var tempName = fieldNames[i] + 'I';
                cellInput.setAttribute("type", "hidden");
                cellInput.setAttribute("name",  fieldNames[i]);
                cellInput.setAttribute("id",  fieldNames[i]);
                addEvent(cellInput, "onpropertychange", "displayDate(this)");
                newcellTablerowCell.appendChild(cellInput);
                newcellTablerow.appendChild(newcellTablerowCell);
                /*For adding a lable element before the input element.*/
                var cellLbl = createNewNode("LABEL", "LBLinv");
                newcellTablerowCell.appendChild(cellLbl);
                var cellInput = createNewNode("input", "TXTro");
                cellInput.setAttribute("type", "text");
                cellInput.setAttribute("name", tempName);
                cellInput.setAttribute("textname",  fieldNames[i]);
                cellInput.setAttribute("id", tempName);
                cellInput.setAttribute("title", mainWin.getItemDesc('LBL_TO'));
                addEvent(cellInput, "onblur", "validateInputDate(this.id,event)");
                cellInput.size = 8;
                newcellTablerowCell.appendChild(cellInput);
                var newcellTablerowCell = createNewNode("td");
                var cellInput = createNewNode("button", "BTNimg");
                cellInput.setAttribute("TNAME", fieldNames[i]);
                cellInput.setAttribute("INAME", tempName);
                cellInput.setAttribute("oldClassName", "BTNimg");
                cellInput.setAttribute("title", mainWin.getItemDesc('LBL_TO'));
                addEvent(cellInput, "onclick", "disp_calBPEL(this.getAttribute('TNAME'),event)");
                var cellImg = createNewNode("SPAN", "ICOcalendar");
                cellImg.setAttribute("tabIndex", "-1");
                cellInput.appendChild(cellImg);
                newcellTablerowCell.appendChild(cellInput);
                newcellTablerow.appendChild(newcellTablerowCell);
                newcellTable.appendChild(newcellTablerow);
                newCellDiv.appendChild(newcellTable);
                newColumnDiv.appendChild(newCellDiv);
            }
            j++;
        }
    fldSet.appendChild(newColumnDiv);
    newColumnDiv = createNewNode("DIV", "DIVColumnMin");
    newCellDiv = createNewNode("DIV", "DIVList");
    spanEle = createNewNode("SPAN", "Fright");
    spanEle.setAttribute("STYLE", "margin:0 1.3em 1 2.3em");
    if(filterType=="D")
	{
		var newButton = createNewNode("button", "BTNtext");
		var newButton4 = createNewNode("button", "BTNtext");
		addEvent(newButton, "onclick", "fnFilterTasks('"+winId+"')");		
		addEvent(newButton4, "onclick", "fnExitFilterDboard('"+winId+"')");
		setInnerText(newButton, mainWin.getItemDesc("LBL_FILTERS"));
		setInnerText(newButton4, mainWin.getItemDesc("LBL_EXIT"));
		spanEle.appendChild(newButton);
		spanEle.appendChild(newButton4);
	}
	else
	{
	    var newButton = createNewNode("button", "BTNtext");
    /*if(winId==undefined) 
		addEvent(newButton, "onclick", "fnFilterTasks()");
	else*/
		addEvent(newButton, "onclick", "fnFilterTasks()");
    setInnerText(newButton, mainWin.getItemDesc("LBL_FILTERS"));
    spanEle.appendChild(newButton);
	}
    newCellDiv.appendChild(spanEle);
    newColumnDiv.appendChild(newCellDiv);
    fldSet.appendChild(newColumnDiv);
    TaskTable.appendChild(fldSet);
    //Jeev Changes Start Here
    var clientHeight = document.body.clientHeight;
    if(document.getElementById("TaskFiltersHeader")!=null && document.getElementById("TaskFiltersHeader") != undefined){
    	var filterSearchHeight = document.getElementById("TaskFiltersHeader").offsetHeight + document.getElementById("TBTaskFilters").offsetHeight;
	var taskDetailsHeight  = document.getElementById("BPELTaskDetails").offsetHeight + document.getElementById("BPELTaskHeader").offsetHeight;
    	document.getElementById("BPELTaskHistoryDetails").style.display = "block";
    	document.getElementById("BPELTaskHistoryDetails").style.height = (clientHeight - (taskDetailsHeight + filterSearchHeight + 105)) + 'px';
    }
}
//12.1 Retro_Changes Ends
function getTaskCountHTML(menuLabel,queueIds,winId,qType,qName,desc,queueLabels) {
	var bpelXml = parent.bpelMenuXml;
	var serverURL = "FCClientHandler";
	var objHTTP = createHTTPActiveXObject();
	taskSearchXML = "<TaskRequest OP = 'TASKCOUNT'>";
	var bpelXmlDeclRemoved = bpelXml;
	if(bpelXml.substring(0,21).toLowerCase() == '<?xml version="1.0"?>'){
		bpelXmlDeclRemoved = bpelXml.substring(21);
	}
	var tmpDOM = loadXMLDoc(bpelXmlDeclRemoved); 
	var tnode;
	//var queuesArr =queueIds.split(','); //12.1 Retro_Changes
	//var queueLabelsArr =queueLabels.split(','); //12.1 Retro_Changes
	if(menuLabel != 'null' && menuLabel !=''){
		tnode =selectSingleNode(tmpDOM,"//NODE[@LABEL='"+menuLabel+"']");
		bpelXmlDeclRemoved = getXMLString(tnode);		
	}else if(queueIds != 'null' && queueIds !=''){
		var queuesArr =queueIds.split(','); //12.1 Retro_Changes
		var queueLabelsArr =queueLabels.split(','); //12.1 Retro_Changes
		bpelXmlDeclRemoved ='<NODE>';
		for(indx=0;indx<queuesArr.length;indx++){
			bpelXmlDeclRemoved +='<LEAF ISDASHBOARD="N" taskCount="" LABEL="';
			tnode =selectSingleNode(tmpDOM,"//LEAF[@queueId='"+queuesArr[indx]+"']");
			if(tnode!=null)
				bpelXmlDeclRemoved +=tnode.getAttribute("LABEL");
			else
				bpelXmlDeclRemoved +=queueLabelsArr[indx];
			bpelXmlDeclRemoved +='" queueId="';
			bpelXmlDeclRemoved +=queuesArr[indx];
			bpelXmlDeclRemoved +='"/>';
			//bpelXmlDeclRemoved += getXMLString(tnode);
		}
		bpelXmlDeclRemoved +='</NODE>';
	}
	taskSearchXML = taskSearchXML + bpelXmlDeclRemoved;
	taskSearchXML = taskSearchXML + "</TaskRequest>";
	var objHTTP = getXmlHttpObj(serverURL, "", "BPELACTION");	
    objHTTP.onreadystatechange = function () {
		if (objHTTP.readyState == 4) {
			var taskCountHTML="<TABLE id='QuickViewCountTable"+"' class='TBLgrid' cellspacing='0' cellpadding='0' border='0' role='presentation' type='ME' style='overflow:auto;width:100%;' >";		
			taskCountHTML +='<THEAD><TH class="TBLoneTH"><A class="Astd">'+mainWin.getItemDesc("LBL_QUEUE_NAME")+'</A></TH><TH CLASS="TBLoneTH"><A class="Astd">'+mainWin.getItemDesc("LBL_COUNT")+'<A><TH></THEAD><TBODY>';
			taskListXML = objHTTP.responseXML;
			var csrfNode = selectSingleNode(taskListXML, "//CSRF");
			if (csrfNode != null && getNodeText(csrfNode) == "SM-00420") {
				alert(getNodeText(csrfNode) + mainWin.getItemDesc("LBL_REQUEST_TAMPERED"));
			} else {
				var bpelXml;
				if (getXMLString(taskListXML) != "")
				bpelXml = getXMLString(taskListXML.documentElement.lastChild);
				if (bpelXml != "") {
					var leafNodes = selectNodes(taskListXML, "//NODE/LEAF[@ISDASHBOARD = 'N']");
					var queueName = "";
					for (var i = 0; i < leafNodes.length; i++) {
						if (i % 2 == 1) 
							taskCountHTML +='<TR class="TBLoneTR" QUEUEID="';
						else
							taskCountHTML +='<TR class="TBLoneTRalt" QUEUEID="';
						taskCountHTML +=leafNodes[i].getAttribute("queueId");
            var queueLabel =leafNodes[i].getAttribute("LABEL").substring(0,leafNodes[i].getAttribute("LABEL").indexOf('('));
						taskCountHTML +='"><TD><a class="Astd"  onclick="parent.displayQueueTasksProxy(\''+leafNodes[i].getAttribute("queueId")+'\',\''+queueLabel+'\', \'event\')">';
						taskCountHTML +=leafNodes[i].getAttribute("LABEL").substring(0,leafNodes[i].getAttribute("LABEL").indexOf('('));
						taskCountHTML +='</a></TD><TD><span class="SPNtext">';
						taskCountHTML +=leafNodes[i].getAttribute("taskCountSize");
						taskCountHTML +='</span></TD></TR>';
						queueName = leafNodes[i].getAttribute("queueId");
						if (document.getElementById(queueName)) {
							document.getElementById(queueName).childNodes[0].nodeValue = " " + leafNodes[i].getAttribute("LABEL");
						}
					}
				}
			}
			taskCountHTML +='</TBODY></TABLE>';
			tabTableContent[winId+'TABLE'] =taskCountHTML;
			//tabTableContent[winId+'ACTIONS'] =actions;
			tabTableContent[winId+'DETAILTABLE'] =taskCountHTML;
			if(!isRefresh)
			{
			document.getElementById(winId).innerHTML='';
			customWinData ="<iframe id='ifr_LaunchWin"+winId+"' src='BpelDashboard.jsp?winId="+winId+"&qType="+qType+"&qDesc="+desc+"' allowtransparency='true' frameborder='0' scrolling='yes' title='' ></iframe>";
			document.getElementById(winId).insertAdjacentHTML("beforeEnd", customWinData);			
			}
			else
			{
			tabTableContent[winId+'INITIALIZEREF']();
			isRefresh = false;
			}	
		}
    }
	objHTTP.send(taskSearchXML);	
return true;	
}
function fnShowLandingPageDashBoard()
{
	var tempbpelxml = loadXMLDoc(parent.bpelDashBoardMenuXml);
	var nodeArr = selectNodes(tempbpelxml,"//LEAF[@LandingPage='Y' and @roleType='U']");
	var node ;
	if(nodeArr.length >0){
		node = nodeArr[0];
	}else {
		node = selectNodes(tempbpelxml,"//LEAF[@LandingPage='Y' and @roleType='R']")[0];
	}
	if(node == null)
		return;
        //displayDashboardQueue(node.getAttribute('queueNames'),node.getAttribute('queueTypes'),node.getAttribute('bamUrl'),node.getAttribute('filedList'),node.getAttribute('actions'),node.getAttribute('desc'));		  //12.1 Retro_Changes
        displayDashBoardPage(node.getAttribute('queueNames'),node.getAttribute('queueTypes'),node.getAttribute('bamUrl'),node.getAttribute('filedList'),node.getAttribute('actions'),node.getAttribute('desc'),node.getAttribute('PartPerPage')); //12.1 Retro_Changes
}
//12.0.2 SOATEAM Changes Ends 
function addIframeReqParam(src)
{
    if(src.indexOf("?")> -1 ){
        src =  src + "&iframeLaunch=true";
    }
    else{
         src =  src + "?iframeLaunch=true";
    }
    return src;
}
/*Customer changes start*/
function showCustomerTab(winId, src) {
    //document.getElementById('divmenusearch').style.display = 'none';
    //document.getElementById('dashboard').style.display = 'block';//REDWOOD_CHANGES
    //document.getElementById("vtab").style.display = "block";//REDWOOD_CHANGES
    currentTab = "DBoardCustomer";
    toggleNavigation('close');	//REDWOOD_CHANGES

    src = mainWin.addIframeReqParam(src);
    if(document.getElementById(winId).children[0].children[0].innerHTML == ""){
    var customWinData = '<iframe id="ifr_CustomerWin"  class="frames" src="'+ src +'" allowtransparency="true" frameborder="0" scrolling="no" title="" style="z-index:10;height:100%;width:100%"></iframe>';//REDWOOD_CHANGES
    document.getElementById(winId).children[0].children[0].insertAdjacentHTML("beforeEnd", customWinData);
    document.getElementById("DIVTabContentDBoardCustomer").style.display = "block";
    //document.getElementById('DIVTabContentDBoardCustomer').style.height = document.getElementById("dashboard").offsetHeight + "px";//REDWOOD_CHANGES
    }
    unmask();    
    
}

/*function showHideVtab_Cust() {
    mainWin.fnUpdateScreenSaverInterval();
    var menusearchDiv = document.getElementById("MenuSearchDiv");
    if(document.getElementById("vtab").style.display == "none") {
        document.getElementById("vtabMinCust").style.display = 'none';
        document.getElementById("vtab").style.display = "block";
        document.getElementById("vtab").style.zIndex = "1";
        document.getElementById("vtab").style.position  = 'absolute';
        document.getElementById("vtab").style.top  = '75px';
        document.getElementById("vtabMinCust").style.display = "none";        
        document.getElementById("vtabMin").style.display = "block";
        document.getElementById("vtabMin").getElementsByTagName("button")[0].setAttribute("title", mainWin.getItemDesc("LBL_COLLAPSE_MENU"));
        document.getElementById("vtabMin").style.top = document.getElementById("masthead").offsetHeight + 25 + "px";
        document.getElementById("vtabMin").getElementsByTagName("span")[1].className = "ICObrwMinimizer";
        setHorizontalPosition(document.getElementById("vtabMin"), false, (document.getElementById("divmenusearch").offsetWidth - document.getElementById("vtabMin").offsetWidth));
        menusearchDiv.style.width = x-(document.getElementById("vtab").offsetWidth+2)+"px";
        menusearchDiv.style.marginTop =-(document.getElementById("vtab").offsetHeight + 1) + "px";
        setHorizontalPosition(menusearchDiv, true, (document.getElementById("vtab").offsetWidth + 2));
        
    }
}*/

function fnReplaceGlobalParams(PFunctionId,FunctionId,brn, custNo, accntNo, liabNo, accDesc, sname, custname, ccy, amount){   

    if(typeof(PFunctionId)!='undefined'){
      mainWin.gCustInfo["PFunctionId"] = PFunctionId;
    }else{
      mainWin.gCustInfo["PFunctionId"] = ''; 
    }
     if(typeof(FunctionId)!='undefined'){
      mainWin.gCustInfo["FunctionId"] = FunctionId;
    }else{
      mainWin.gCustInfo["FunctionId"] = ''; 
    }
     if(typeof(brn)!='undefined'){
      mainWin.gCustInfo["Branch"] = brn;
    }else{
      mainWin.gCustInfo["Branch"] = ''; 
    }
    if(typeof(custNo)!='undefined'){
      mainWin.gCustInfo["CustNo"] = custNo;
    }else{
      mainWin.gCustInfo["CustNo"] = ''; 
    }
    if(typeof(accntNo)!='undefined'){
      mainWin.gCustInfo["AccntNo"] = accntNo;
    }else{
      mainWin.gCustInfo["AccntNo"] = ''; 
    }
    if(typeof(liabNo)!='undefined'){
      mainWin.gCustInfo["LiabNo"] = liabNo;
    }
	//Bug#33442569 starts
	/*else{
      mainWin.gCustInfo["LiabNo"] = ''; 
    }*/
	//Bug#33442569 ends
     if(typeof(accDesc)!='undefined'){
      mainWin.gCustInfo["AccDesc"] = accDesc;
    }else{
      mainWin.gCustInfo["AccDesc"] = ''; 
    }
     if(typeof(sname)!='undefined'){
      mainWin.gCustInfo["CustSname"] = sname;
    }else{
      mainWin.gCustInfo["CustSname"] = ''; 
    }
     if(typeof(custname)!='undefined'){
      mainWin.gCustInfo["CustName"] = custname;
    }else{
      mainWin.gCustInfo["CustName"] = ''; 
    }
     if(typeof(ccy)!='undefined'){
      mainWin.gCustInfo["Ccy"] = ccy;
    }else{
      mainWin.gCustInfo["Ccy"] = ''; 
    }
     if(typeof(amount)!='undefined'){
      mainWin.gCustInfo["Amount"] = amount;
    }else{
      mainWin.gCustInfo["Amount"] = ''; 
    }
    
}

//Fix for 20850159 
function fnResetCustDetails(event){//Fix for 20856882
    for(var i in gAccArr) {
         closeCurrentTab(document.getElementById(i).parentNode,event);
    }         
}


/*Customer changes end*/
//citi ui change start         
function getmenuxml(){
     var objHTTP = createHTTPActiveXObject(); 
	 var menuXml = "";//9NT1606_12_2_RETRO_12_0_3_21182929 changes starts
    try{ //9NT1606_12_2_RETRO_12_0_3_21182929 changes ends 
        objHTTP.open("POST", "FCUtilityServlet", false);
        objHTTP.setRequestHeader("Content-Type", "application/xml");
        objHTTP.setRequestHeader("charset", "utf-8");
        objHTTP.setRequestHeader("X-CSRFTOKEN", mainWin.CSRFtoken);
        objHTTP.send(null);
		} //9NT1606_12_2_RETRO_12_0_3_21182929 changes start
        catch(exp){
          handleNetWorkErr(exp);
        } //9NT1606_12_2_RETRO_12_0_3_21182929 changes end 
      if ( (objHTTP.status == 200) && getXMLString(objHTTP.responseXML) != '') {        
                //return getXMLString(objHTTP.responseXML); //9NT1606_12_2_RETRO_12_0_3_21182929 commented
				menuXml = getXMLString(objHTTP.responseXML); //9NT1606_12_2_RETRO_12_0_3_21182929 changes 
        }
	  else if(objHTTP.status != 200) {//9NT1606_12_2_RETRO_12_0_3_23656268 changes start
             mainWin.displayTimeOutErrDiv(objHTTP.status + "~" +   mainWin.getCommonErrorList()["SM-NE002"].split("~")[0].split(",")[0] + "<br>" +objHTTP.statusText  );
            throw newError(  mainWin.getCommonErrorList()["SM-NE002"].split("~")[0].split(",")[0]+ '. '+ objHTTP.statusText);
        }	//9NT1606_12_2_RETRO_12_0_3_23656268 changes end
		
		return menuXml;//9NT1606_12_2_RETRO_12_0_3_21182929 changes 
}
//citi ui change end


//Customer Accessibilty start
function fnNavigateTabsCust(l_event, tab_arr, tab_ids) {
    fnTabDetailsCust();
    if (mainWin.document.getElementById("tabListCust")) {
        if (l_event == 'backward') {
            mainWin.tablist_curr_id--;
            if (mainWin.tablist_curr_id < 0) {
                mainWin.tablist_curr_id = mainWin.tab_arr.length - 1;
            }            
            if (!mainWin.document.getElementById(mainWin.tab_ids[mainWin.tablist_curr_id]).disabled) {
                mainWin.fnToggleDisplay(mainWin.tab_ids[mainWin.tablist_curr_id]);
            }
        }
        if (l_event == 'forward') {
            mainWin.tablist_curr_id++;
            if (mainWin.tablist_curr_id > mainWin.tab_arr.length - 1) {
                mainWin.tablist_curr_id = 0;
            }            
            if (!mainWin.document.getElementById(mainWin.tab_ids[mainWin.tablist_curr_id]).disabled) {
                mainWin.fnToggleDisplay(mainWin.tab_ids[mainWin.tablist_curr_id]);
            }
        }
    }
}


function fnTabDetailsCust() {
    var tab_obj = document.getElementById("tabListCust");
    var lSafIndx = 0;
    if (document.getElementById("tabListCust")) {
        if (tab_obj.childNodes.length > 0) {
            if (tab_obj.childNodes[0].nodeType == '3')
            {
                for (var i = 0;i < tab_obj.childNodes.length;i++) {
                    if (tab_obj.childNodes[i].nodeType != '3')
                    {
                        tab_arr[lSafIndx] = tab_obj.childNodes[i].childNodes[0];
                        tab_ids[lSafIndx] = tab_obj.childNodes[i].childNodes[0].id;
                        lSafIndx = lSafIndx + 1;
                    }
                }
            }
            else 
            {
                for (var i = 0;i < tab_obj.childNodes.length;i++) {
                    tab_arr[i] = tab_obj.childNodes[i].childNodes[0];
                    tab_ids[i] = tab_obj.childNodes[i].childNodes[0].id;
                }
            }
        }
    }
}
//Customer Accessibilty end