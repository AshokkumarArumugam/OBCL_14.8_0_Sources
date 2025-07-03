/*----------------------------------------------------------------------------------------------------
**
**
** File Name    : CustDetail.js
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

Copyright © 2007-2014 by Oracle Financial Services Software Limited.. 

 **  Modified By          : Neethu Sreedharan
 **  Modified On          : 07-Oct-2016
 **  Modified Reason      : The error seems to be due to network issue. Fix is provide to show the error 
                             to user as alert and on click of Ok button on alert window, screen will be 
                             unmasked and user can try the action again.
 **  Retro Source         : 9NT1606_12_0_3_INTERNAL
 **  Search String        : 9NT1606_12_2_RETRO_12_0_3_21182929

---------------------------------------------------------------------------------------------------------*/
var objHTTP = null;
var  LOVResponseDOM = null;
var  LOVAccResponseDOM = null;
var accountData;
var customerData;
var branchCode;
var accountNumber;
var accountObject; 
var customerObject;
var brnCode = ""; //Fix for 18556668
var mainWin   = parent;
var serverURL = "BranchServlet";
var SessionDetails = "";
var timeout_responseXML = '<RESP>TIMEOUT</RESP>';
var timeout_responseText = 'TIMEOUT';
var xref = 'BRDUMMYCUSTQUERY';
var func = 'QRYC';
var brnStat = "";
var dataDOMMAIN = null;
var objHTTP= null;
var ns = "xmlns:fcubs='http://fcubs.iflex.com'";
var strImgInfo = "";
var strSigInfo = "";
var gcurrpage="1";
var cell1;
var cell2;
var cell3;
var cell4;
var next="next";
var prev="prev";
var grecpage="1";
var accountData = new Array;
var custData = new Array;
var accDataArray = new Array;
var strCustData = "";
var strAccData = "";
var gCurrPage_Cust = "1";
var gCurrPage_Acc = "1";
//var brnCode = ""; //Fix for 18556668
//12.1 Dashboard changes --start
var custDetails ="";
var listOfAcc = "";
//12.1 Dashboard changes --end
var gCustDataArr = new Array();
var gAccDataArr  = new Array();

function fnCSrchKeyEvents(event) {
    var event = window.event || event;
    if (event.keyCode == 13) {
        var eventElem = getEventSourceElement(event);
        if (eventElem.name != "LinkedCustomers") {
            fnCustomerQuery();
            preventpropagate(event);
            return false;
        }
    }
    if (event.keyCode == 120) {
      var eventElem = getEventSourceElement(event);
      if (eventElem.tagName == "INPUT" && eventElem.type.toUpperCase() == 'TEXT') {
        if (typeof (eventElem.parentNode.getElementsByTagName("BUTTON")[0]) != 'undefined') {
          eventElem.parentNode.getElementsByTagName("BUTTON")[0].click();
          preventpropagate(event);
          return false;
        }
      }
    }
}

//SNORAS#000780 Starts
function fnEscape(p_Value)
{
	var l_Value=p_Value;
	var dquote = new RegExp("\"", "g");
	var squote = new RegExp("\'", "g");
	var newLine = new RegExp("\n", "g");
	l_Value=l_Value.replace(dquote,"&dq");
	l_Value=l_Value.replace(squote,"&sq");
	l_Value=l_Value.replace(newLine,"&nl");
	return l_Value;
}
function fnUnEscape(p_Value)
{
	var l_Value=p_Value;
	l_Value=l_Value.replace(/&dq/g,"\"");
	l_Value=l_Value.replace(/&sq/g,"\'");
	l_Value=l_Value.replace(/&nl/g,"\n");
	return l_Value;
}
//SNORAS#000780 Ends
//05012012

// 12.0.2 changes for customer tab starts
//added a new parameter status for search type
/*
function fnCustomerQuery(myflag,status,currpage) 
{
    if(mainWin.CustomerObj != null)
	{
      alert(mainWin.getItemDesc("LBL_END_PREV_CUST_SESSION"));
      return;
    }
    gCurrPage_Cust = 1;
    chkflag = true;
    //12.1 Dashboard changes --start
   // if(typeof(myflag) != "undefined")
//	{
	// document.getElementById('ListofAccDiv').innerHTML = listOfAcc;
   //   var arr =  document.getElementById('DIVTabContentDBoardCustomer'+pos).getElementsByTagName("iframe");
   
   //  for(var i =0 ; i< arr.length; i++ )
	// {
    //  arr[i].contentWindow.clearData();
  //   }
 //   }
    //document.getElementById('ListofAccDiv').innerHTML = "";

    //document.getElementById("DIVTabContent"+currentTab+pos).style.visibility = "hidden";   
    
 //12.1 Dashboard changes --end
 // if( document.getElementById('DIVTabContentDBoardCustomer'+pos)){
    document.getElementById('vTabDB_DASHBOARD').style.display = 'none';
 // }
	 
    strImgInfo = "";
    strSigInfo = "";
    var labelListOfAcc = mainWin.getItemDesc("LBL_LIST_OF_ACC");
    var labelAccNumber = mainWin.getItemDesc("LBL_ACC_NUMBER");
    var labelBranchCode = mainWin.getItemDesc("LBL_BRANCH_CODE");
    var labelSearchResult = mainWin.getItemDesc("LBL_SEARCH_RESULT");
    var labelCustSearchResult = mainWin.getItemDesc("LBL_CUST_SEARCH_RESULT");
    var labelCustNumber = mainWin.getItemDesc("LBL_CUST_NUMBER");
    var labelCustName = mainWin.getItemDesc("LBL_CUST_NAME");

    var msgType = "NONWORKFLOW";
    var name = document.getElementById("CustName").value;
    var cfid = document.getElementById("CFid").value;
   var custidval = document.getElementById("CustIdentifier").value;
    var custacno = document.getElementById("CustAccountNo").value;
    var brnacno = document.getElementById("CustBrn").value;
    if (document.getElementById("LinkedCustomers").checked == true) 
	{
        var LinkedCust = 'Y';
    } 
	else 
	{
        var LinkedCust = 'N';
    }      
    objHTTP = createHTTPActiveXObject();
	if(typeof(status)!=="undefined")
    {
		if(status=="true")
		{    
			fnCustSearchPost(msgType,cfid);
		}
		else
		{
			if (custacno == "%")
			{
				if(typeof(myflag)!=="undefined" && myflag!=="true")
				{
					if(myflag=='next')
					{
						gCurrPage_Cust  = parseInt(currpage)+1; 
					}
					else
					{
						gCurrPage_Cust  = parseInt(currpage)-1; 
					}
				}
				else
				{
					gCurrPage_Cust = gCurrPage_Cust;  
				}
				if(typeof(myflag)!=="undefined" && typeof(status)!=="undefined")
				{
					fnCustSearchPost(msgType,cfid,name,brnacno,LinkedCust,myflag,gCurrPage_Cust);
				}
				else
				{
					fnCustSearchPost(msgType,cfid,name,brnacno,LinkedCust);
				}
			}
			else 
			{
			if(typeof(myflag)!=="undefined" && myflag!=="true")
				{
					if(myflag=='next')
					{
						gCurrPage_Acc  = parseInt(currpage)+1; 
					}
					else
					{
						gCurrPage_Acc  = parseInt(currpage)-1; 
					}
				}
				else
				{
					gCurrPage_Acc = gCurrPage_Acc;  
				}
				if(typeof(myflag)!=="undefined")
				{
					fnBranchQueryPostforAccount('%', custacno, brnacno, myflag, gCurrPage_Acc);
				}
				else
				{
					fnBranchQueryPostforAccount('%', custacno, brnacno); 
				}
			}
		}
    }
     var dataXML = getXMLString(dataDOM);
     var html = '';	
	 
	if(typeof(status)!=="undefined")
    {
		if(status=="true")
		{ 
		   if (objHTTP.status == 200)
			{
			if(window.ActiveXObject) dataDOM.setProperty("SelectionNamespaces", ns);
            var quote = new RegExp("\"", "g");
            dataXML = dataXML.replace(quote, "\\'");
            var newLine = new RegExp("\n", "g");
            dataXML = dataXML.replace(newLine, "");
            var html = '<div class=\'SearchCaption\' id=\'DIVcaptionSR\' style=\'position:static; margin:0\'><h4 class="hh4">' + labelSearchResult + '</h4></div>';
            html += '<div id=\'DIVresultsTBL1\' style=\'display:block; height:150px; overflow:auto\'>';
            html += '<TABLE id = \"CustQueryResults\" border=\'0\' width=\'100%\' style=\'table-layout:fixed \' cellpadding=\'3\' cellspacing=\'0\' class=\'TBLone\' summary=\'' + labelCustSearchResult + '\' >';
            html += '<thead><tr><th scope=\'col\' class=\'THgrid\'><SPAN class=SPNtext>' + labelCustNumber + '</a></th><th scope=\'col\' class=\'THgrid\'><SPAN class=SPNtext>' + labelCustName + '</a></th></tr></thead>';
            html += '<tbody>';
            html += '<div id=\'CustSec1\'>'
            try {
                var data = getNodeText(selectSingleNode(dataDOM, "//FCUBS_RES_ENV"));
                data = trimTildaAtEnd(data); //trim the last ~, if the data endswith ~.
                data = data.substring(0, data.lastIndexOf("!"));
                var dataarray = data.split("~");
                if (trim(data) != "") {
                    for (var i = 0; i < dataarray.length - 1; i += 4) {
                        dataarray[i] = dataarray[i].replace('!', '');
                        if (i % 8 == 0) html += '<tr class=\'TBLoneTR\'>';
                        else html += '<tr class=\'TBLoneTRalt\'>';
                        var custinfo = dataarray[i] + "~" + dataarray[i + 1];
                        custinfo=fnEscape(custinfo);                                        //SNORAS#000780
                        html += '<td scope=\'row\' onkeydown="return handleCustQueryKeyDownEvents(event)">';
                        quote = new RegExp("\'", "g");  
                        custinfo=custinfo.replace(quote, "&apos;");
                        //html += '<a class=\'Astd\' HREF=\'#;javascript:getCustomerRecords( \"' + custinfo + '\")\'>' + dataarray[i] + '</a></td>';
                        //Fixed for 15841254 
                        html += '<a class=\'Astd\' HREF=\'#\' onclick=\'getCustomerRecords( \"' + custinfo + '\",event, \"true\")\'>' + dataarray[i] + '</a></td>';
                        html += '<td onkeydown="return handleCustQueryKeyDownEvents(event)"><span class=\'SPNtext\' tabindex=0>' + dataarray[i + 1] + '</span></td>';
                        html += '</tr>';
                    }
                }
            } catch(e) {}
             html += '</div>';
            html += '</tbody>';
            html += '</table>';
            html += '</div>';
             html += "<div class=\"DIVLinkBar\">";
            html += "<A id = 'previousCust' class='ASearchBar' onmouseover= \" if(!this.disabled) this.className=\'ASearchover\'\" onmouseout=\"if(!this.disabled) this.className=\'ASearchBar\'\" onfocus=\"if(!this.disabled) this.className=\'ASearchover\'\" onclick=\"fnCustomerQuery( \'" + prev + "\',"+gCurrPage_Cust+")\" href=\'#\'>" + mainWin.getItemDesc("LBL_PREVIOUS") + "</A>&nbsp;&nbsp;";
            html += "<A id = 'nextCust' class='ASearchBar' onmouseover=\" if(!this.disabled) this.className=\'ASearchover\'\" onmouseout=\"if(!this.disabled) this.className=\'ASearchBar\'\" onfocus=\"if(!this.disabled) this.className=\'ASearchover\'\" onclick=\"fnCustomerQuery( \'" + next + "\',"+gCurrPage_Cust+")\" href=\'#\'>" + mainWin.getItemDesc("LBL_NEXT") + "</A>&nbsp;&nbsp;";
            html += "</div>";
            //document.getElementById("DetailTable").style.display = "block";
            document.getElementById('CUSTDETAILS').innerHTML = "";
            document.getElementById('CUSTDETAILS').innerHTML = html;
            document.getElementById('searchResultDiv').style.display = "block";
            document.getElementById('ListofAccDiv').innerHTML = "";
             document.getElementById("SearchBarDisplayDiv").style.display = "none"; 
        }
		}
		else
		{
			if (custacno == "%")
				{
				  if (objHTTP.status == 200)
				  {
           if(window.ActiveXObject) dataDOM.setProperty("SelectionNamespaces", ns);
            var quote = new RegExp("\"", "g");
            dataXML = dataXML.replace(quote, "\\'");
            var newLine = new RegExp("\n", "g");
            dataXML = dataXML.replace(newLine, "");
            var html = '<div class=\'SearchCaption\' id=\'DIVcaptionSR\' style=\'position:static; margin:0\'><h4 class="hh4">' + labelSearchResult + '</h4></div>';
            html += '<div id=\'DIVresultsTBL1\' style=\'display:block; height:150px; overflow:auto\'>';
            html += '<TABLE id = \"CustQueryResults\" border=\'0\' width=\'100%\' style=\'table-layout:fixed \' cellpadding=\'3\' cellspacing=\'0\' class=\'TBLone\' summary=\'' + labelCustSearchResult + '\' >';
            html += '<thead><tr><th scope=\'col\' class=\'THgrid\'><SPAN class=SPNtext>' + labelCustNumber + '</a></th><th scope=\'col\' class=\'THgrid\'><SPAN class=SPNtext>' + labelCustName + '</a></th></tr></thead>';
            html += '<tbody>';
             html += '<div id=\'CustSec2\'>'
            try {
                var data = getNodeText(selectSingleNode(dataDOM, "//FCUBS_RES_ENV"));
                data = trimTildaAtEnd(data); //trim the last ~, if the data endswith ~.
                data = data.substring(0, data.lastIndexOf("!"));
                var dataarray = data.split("~");
                if (trim(data) != "") {
                    for (var i = 0; i < dataarray.length - 1; i += 4) {
                        dataarray[i] = dataarray[i].replace('!', '');
                        if (i % 8 == 0) html += '<tr class=\'TBLoneTR\'>';
                        else html += '<tr class=\'TBLoneTRalt\'>';
                        var custinfo = dataarray[i] + "~" + dataarray[i + 1];
                        custinfo=fnEscape(custinfo);                                        //SNORAS#000780
                        html += '<td scope=\'row\' onkeydown="return handleCustQueryKeyDownEvents(event)">';
                        quote = new RegExp("\'", "g");  
                        custinfo=custinfo.replace(quote, "&apos;");
                        //html += '<a class=\'Astd\' HREF=\'#;javascript:getCustomerRecords( \"' + custinfo + '\")\'>' + dataarray[i] + '</a></td>';
                        //Fixed for 15841254 
                        html += '<a class=\'Astd\' HREF=\'#\' onclick=\'getCustomerRecords( \"' + custinfo + '\",event, \"true\")\'>' + dataarray[i] + '</a></td>';
                        html += '<td onkeydown="return handleCustQueryKeyDownEvents(event)"><span class=\'SPNtext\' tabindex=0>' + dataarray[i + 1] + '</span></td>';
                        html += '</tr>';
                    }
                }
            } catch(e) {}
            html += '</div>';
            html += '</tbody>';
            html += '</table></div>';
             html += "<div class=\"DIVLinkBar\">";
            html += "<A id = 'previousCust' class='ASearchBar' onmouseover= \" if(!this.disabled) this.className=\'ASearchover\'\" onmouseout=\"if(!this.disabled) this.className=\'ASearchBar\'\" onfocus=\"if(!this.disabled) this.className=\'ASearchover\'\" onclick=\"fnCustomerQuery( \'" + prev + "\',"+gCurrPage_Cust+")\" href=\'#\'>" + mainWin.getItemDesc("LBL_PREVIOUS") + "</A>&nbsp;&nbsp;";
            html += "<A id = 'nextCust' class='ASearchBar' onmouseover=\" if(!this.disabled) this.className=\'ASearchover\'\" onmouseout=\"if(!this.disabled) this.className=\'ASearchBar\'\" onfocus=\"if(!this.disabled) this.className=\'ASearchover\'\" onclick=\"fnCustomerQuery( \'" + next + "\',"+gCurrPage_Cust+")\" href=\'#\'>" + mainWin.getItemDesc("LBL_NEXT") + "</A>&nbsp;&nbsp;";
            html += "</div>";
            // document.getElementById("DetailTable").style.display = "block";
            document.getElementById('ListofAccDiv').innerHTML = "";
            document.getElementById('CUSTDETAILS').innerHTML = "";
            document.getElementById('CUSTDETAILS').innerHTML = html;
            document.getElementById('searchResultDiv').style.display = "block";
             document.getElementById("SearchBarDisplayDiv").style.display = "none"; 
        }
				}
			else
				{	
				     if (objHTTP.status == 200) 
        {
        if(window.ActiveXObject)  dataDOM.setProperty("SelectionNamespaces", ns);
        
        var data = getNodeText(selectSingleNode(dataDOM, "//FCUBS_RES_ENV"));
        data = trimTildaAtEnd(data);
        data = data.substring(0, data.lastIndexOf("!"));
       
        html = '<div class=\'SearchCaption\' id=\'DIVcaptionSR\' style=\'position:static; margin:0\'><h4 class="hh4">' + labelListOfAcc + '</h4></div>';
	html += '<div id=\'DIVresultsTBL2\' style=\'display:block; height:150px; overflow:auto\'>';
        html += '<TABLE id = \'CustomerRecordsTable\'width="100%"  class="TBLone" summary="' + labelListOfAcc + '" border="0" cellspacing="0" cellpadding="0"><THEAD>';        
        html += '<thead><tr><th scope=\'col\' class=\'THgrid\'><span class=\'SPNtext\'>' + labelAccNumber + '</span></th><th scope=\'col\' class=\'THgrid\'><span class=\'SPNtext\'>' + labelBranchCode + '</span></th></tr></thead>';
        html += '<tbody>';
        html += '<div id=\'CustSec3\'>'
        var dataarray = data.split("~");
 	
        if (trim(data) != "") {
            for (var i = 0; i < dataarray.length - 1; i=i+4){
                dataarray[i] = dataarray[i].replace('!', '');
                if (i % 8 == 0) html += '<tr class=\'TBLoneTR\'>';
                else html += '<tr class=\'TBLoneTRalt\'>';
                html += "<td onkeydown = \'return handleCustRecKeyDownEvents(event)\'><A class=\"Astd\" HREF=\'#\' onclick=\"showCustAccDetails(\'" + dataarray[i] + "\', \'" + dataarray[i + 1] + "\', \'" + dataarray[i + 2] + "\' , \'" + dataarray[i + 3] + "\',  event)\" >" + dataarray[i + 1] + "</A></td>";
                html += '<td onkeydown = \'return handleCustRecKeyDownEvents(event)\'><span class="SPNtext" tabindex=0>' + dataarray[i + 2] + '</span></td>';
                html += '</tr>';
            }
        }
        html += '</div>';
        html += "</tbody>";
       
        html += "</TABLE></div>";
        html += "<div class=\"DIVLinkBar\">";
        html += "<A id='previousCustAcc' class='ASearchBar' onmouseover=\"if(!this.disabled) this.className=\'ASearchover\'\" onmouseout=\"if(!this.disabled) this.className=\'ASearchBar\'\" onfocus= \"if(!this.disabled) this.className=\'ASearchover\'\" onclick=\"fnCustomerQuery( \'" + prev + "\',"+gCurrPage_Acc+")\" href=\'#\'>" + mainWin.getItemDesc("LBL_PREVIOUS") + "</A>&nbsp;&nbsp;";
        html += "<A id='nextCustAcc' class='ASearchBar' onmouseover=\"if(!this.disabled) this.className=\'ASearchover\'\" onmouseout=\"if(!this.disabled) this.className=\'ASearchBar\'\" onfocus=\"if(!this.disabled) this.className=\'ASearchover\'\" onclick=\"fnCustomerQuery( \'" + next + "\',"+gCurrPage_Acc+")\" href=\'#\'>" + mainWin.getItemDesc("LBL_NEXT") + "</A>&nbsp;&nbsp;";
        html += "</div>";
      //  document.getElementById("DetailTable").style.display = "block";
        document.getElementById('CUSTDETAILS').innerHTML = "";
        document.getElementById('ListofAccDiv').innerHTML = "";
        document.getElementById('ListofAccDiv').innerHTML = html;
        document.getElementById('searchResultDiv').style.display = "block";
         document.getElementById("SearchBarDisplayDiv").style.display = "none"; 
		if(gCurrPage_Acc == 1 && document.getElementById('previousCustAcc')!=null ){
           if(document.getElementById('previousCustAcc'))
            document.getElementById('previousCustAcc').disabled = "true";
            document.getElementById('previousCustAcc').removeAttribute("onclick");
            document.getElementById('previousCustAcc').className = 'ASearchD';
        }
        if(gCurrPage_Acc >= parseInt(getNodeText(selectSingleNode(dataDOM, "/FCUBS_RES_ENV/TOTALPAGES"))) && document.getElementById('nextCustAcc')!=null){
          if(document.getElementById('nextCustAcc'))
          document.getElementById('nextCustAcc').disabled = "true";
          document.getElementById('nextCustAcc').removeAttribute("onclick");
          document.getElementById('nextCustAcc').className = 'ASearchD';
        }
				}
				}
		}
	}
 if(gCurrPage_Cust == 1 && document.getElementById('previousCust')!=null ){
           if(document.getElementById('previousCust'))
            document.getElementById('previousCust').disabled = "true";
            document.getElementById('previousCust').removeAttribute("onclick");
            document.getElementById('previousCust').className = 'ASearchD';
        }
        if(gCurrPage_Cust >= parseInt(getNodeText(selectSingleNode(dataDOM, "/FCUBS_RES_ENV/TOTALPAGES"))) && document.getElementById('nextCust')!=null){
          if(document.getElementById('nextCust'))
          document.getElementById('nextCust').disabled = "true";
          document.getElementById('nextCust').removeAttribute("onclick");
          document.getElementById('nextCust').className = 'ASearchD';
        }
		//12.1 Dashboard changes --start
		 if(typeof(myflag) == "undefined"){
            document.getElementById('nextCust').disabled = "true";
            document.getElementById('nextCust').removeAttribute("onclick");
            document.getElementById('nextCust').className = "ASearchD";
            getCustomerRecords();
} 
}
*/



function fnCustomerQuery(myflag,currpage) {
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    if(mainWin.CustomerObj != null){
      alert(mainWin.getItemDesc("LBL_END_PREV_CUST_SESSION"));
      return;
    }
    gCurrPage_Cust = 1;
    clearDisplayedTabs();

    strImgInfo = "";
    strSigInfo = "";
    var labelListOfAcc = mainWin.getItemDesc("LBL_LIST_OF_ACC");
    var labelAccNumber = mainWin.getItemDesc("LBL_ACC_NUMBER");
    var labelBranchCode = mainWin.getItemDesc("LBL_BRANCH_CODE");
    var labelSearchResult = mainWin.getItemDesc("LBL_SEARCH_RESULT");
    var labelCustSearchResult = mainWin.getItemDesc("LBL_CUST_SEARCH_RESULT");
    var labelCustNumber = mainWin.getItemDesc("LBL_CUST_NUMBER");
    var labelCustName = mainWin.getItemDesc("LBL_CUST_NAME");
    var labelAccClass = mainWin.getItemDesc("LBL_ACC_CLASS");
	// fix for bug: 19060316 starts 
    var labelAccCcy =""; 
    var labelDftAcc = "";
    var KatakanaCustName = "";
    var HiraganaCustName =  "";
    var multiCurrAccno = "";
    var KanjiCustName = "";
    if(mainWin.applicationExt == "JP") {
        labelAccCcy = mainWin.getItemDesc("LBL_ACCNT_CCY"); 
        labelDftAcc = mainWin.getItemDesc("LBL_DFT_ACC");
        KanjiCustName = document.getElementById("KanjiCustName").value;
        KatakanaCustName = document.getElementById("KatakanaCustName").value;
        HiraganaCustName = document.getElementById("HiraganaCustName").value;
        multiCurrAccno = document.getElementById("MultiCurrAccNo").value;
    }
	// fix for bug: 19060316 ends
    
    var msgType = "NONWORKFLOW";
    var name = document.getElementById("CustName").value;
    var cfid = document.getElementById("CFid").value;
    var custidval = document.getElementById("CustIdentifier").value;
    var custacno = document.getElementById("CustAccountNo").value;
    var brnacno = document.getElementById("CustBrn").value;
    /*Fix for 17864406 starts*/
	// fix for bug: 19060316 starts
	if(mainWin.applicationExt == "JP") {
        if(name == "%" && cfid == "%" &&  custidval =="%"  && custacno=="%" && brnacno =="%" && document.getElementById("Pid").value=="%" && KanjiCustName =="%" && KatakanaCustName == "%" && HiraganaCustName == "%" && multiCurrAccno=="%"){
          alert(mainWin.getItemDesc("LBL_ENTER_SEARCHCRITERIA"));
          return;      
        }
    } // fix for bug: 19060316 ends
    else if(name == "%" && cfid == "%" &&  custidval =="%"  && custacno=="%" && brnacno =="%"){
      alert(mainWin.getItemDesc("LBL_ENTER_SEARCHCRITERIA"));
      return;      
    }
	// fix for bug: 19060316 starts
    var pidSearch = "N"; 
    if(mainWin.applicationExt == "JP") {
        if (document.getElementById("Pid").value != ''&&document.getElementById("Pid").value != '%' ) {
            pidSearch = 'Y';
        } 
    }
    
    var multiccyacSearch="N";
    if(mainWin.applicationExt == "JP") {
        if(document.getElementById("MultiCurrAccNo").value != '' && document.getElementById("MultiCurrAccNo").value != '%'){
            multiccyacSearch='Y';
        }
    }
    // fix for bug: 19060316 ends 
    
    if (document.getElementById("LinkedCustomers").checked == true) {
        var LinkedCust = 'Y';
    } else {
        var LinkedCust = 'N';
    }      
    objHTTP = createHTTPActiveXObject();
    if (custacno == "%" && multiccyacSearch!='Y') { //fix for 19203110
            if(myflag=='next'){
                gCurrPage_Cust  = parseInt(currpage)+1; 
            }else if(myflag=='prev'){
                gCurrPage_Cust  = parseInt(currpage)-1; 
            }

        
        if(typeof(myflag)!="undefined"){
			fnCustSearchPost(msgType, name, cfid, custidval,brnacno,LinkedCust,pidSearch,multiccyacSearch,myflag,gCurrPage_Cust); //fix for bug: 19060316
        }else{
             fnCustSearchPost(msgType, name, cfid, custidval,brnacno,LinkedCust,pidSearch,multiccyacSearch); //fix for bug: 19060316
        }
		// Fix for 18364751 starts 
        if(dataDOM == null){
            return;
        }
        // Fix for 18364751 ends
		var dataXML = getXMLString(dataDOM);
        if (objHTTP.status == 200) {
            if (selectSingleNode(objHTTP.responseXML, "//SESSION") != null && getNodeText(selectSingleNode(objHTTP.responseXML, "//SESSION")) == "EXPIRED") { //session expiry change  start
                mainWin.mask(); 
                mainWin.sessionTimeOut = true;
                mainWin.showAlerts(fnBuildAlertXML("", "I", mainWin.getItemDesc("LBL_SESSION_EXPIRED")), "S");
                return false;
            }//session expiry change  end
           if(getBrowser().indexOf("IE") != -1) dataDOM.setProperty("SelectionNamespaces", ns);//ie11 changes
            var quote = new RegExp("\"", "g");
            dataXML = dataXML.replace(quote, "\\'");
            var newLine = new RegExp("\n", "g");
            dataXML = dataXML.replace(newLine, "");
            fnCreateCustomerHtml(gCurrPage_Cust);            
            var data = getNodeText(selectSingleNode(dataDOM, "//FCUBS_RES_ENV"));
            data = trimTildaAtEnd(data); //trim the last ~, if the data endswith ~.
            data = data.substring(0, data.lastIndexOf("!"));
             
            try {
            data = trim(data);
            data = trimTildaAtEnd(data);
                var dataarray = data.split("~");
                var index = 0;
                var resultTable= document.getElementById('CustQueryResults');
                var tBodyElem = resultTable.tBodies[0];
                var rowLength =  resultTable.tBodies[0].rows.length;
                if (dataarray.length >= rowLength) {
                    document.getElementById('custTabBtnPrev1').disabled = false;
                    addEvent(document.getElementById('custTabBtnPrev1'), "onclick", "fnCustomerQuery( '" + prev + "'," + gCurrPage_Cust + ")");
                    document.getElementById('custTabBtnNext1').disabled = false;
                    addEvent(document.getElementById('custTabBtnNext1'), "onclick", "fnCustomerQuery( '" + next + "'," + gCurrPage_Cust + ")");
                }
                for(var rowCnt  = 0 ; rowCnt < rowLength ; rowCnt++){
                    if(dataarray.length > index && data != ""){
                    dataarray[index] = dataarray[index].replace('!', '');;
                    var custinfo = dataarray[index] + "~" + dataarray[index + 1];
                    custinfo=fnEscape(custinfo); 
                    addEvent(tBodyElem.rows[rowCnt].cells[0],"onkeydown", "return handleCustQueryKeyDownEvents(event)");
                    quote = new RegExp("\'", "g");  
                    custinfo=custinfo.replace(quote, "&apos;");
                    tBodyElem.rows[rowCnt].cells[0].innerHTML = "<a class='Astd' HREF='#' onclick='getCustomerRecords( \"" + custinfo + "\",event, \"true\")\'>" + dataarray[index] + "</a>";
                    addEvent(tBodyElem.rows[rowCnt].cells[1],"onkeydown", "return handleCustQueryKeyDownEvents(event)");
                    tBodyElem.rows[rowCnt].cells[1].innerHTML = "<span class='SPNtext' tabindex=0>" + dataarray[index + 1] + "</span>"
					//fix for bug: 19060316 starts
                    if(mainWin.applicationExt == "JP") {
                            tBodyElem.rows[rowCnt].cells[2].innerHTML = "<span class='SPNtext' tabindex=0>" + dataarray[index + 4] + "</span>"
                            tBodyElem.rows[rowCnt].cells[3].innerHTML = "<span class='SPNtext' tabindex=0>" + dataarray[index + 5] + "</span>"
                            tBodyElem.rows[rowCnt].cells[4].innerHTML = "<span class='SPNtext' tabindex=0>" + dataarray[index + 6] + "</span>"
                            tBodyElem.rows[rowCnt].cells[5].innerHTML = "<input type='checkbox' class='TXTstd'  id='rd_" + dataarray[index] +"'>";
                            addEvent(tBodyElem.rows[rowCnt].cells[5],"onkeydown", "return handleCustQueryKeyDownEvents(event)");
                    } else {  
					//fix for bug: 19060316 ends
						tBodyElem.rows[rowCnt].cells[2].innerHTML = "<input type='checkbox' class='TXTstd'  id='rd_" + dataarray[index] +"'>";
						addEvent(tBodyElem.rows[rowCnt].cells[2],"onkeydown", "return handleCustQueryKeyDownEvents(event)");
					}
					}
                    //fix for bug: 19060316 starts			
	                    if(mainWin.applicationExt == "JP") 
	                        index += 7; 
                        //fix for bug: 19060316 ends
	                    else index += 4;

                }
                
            } catch(e) {}

              
            document.getElementById('btnDivCust').style.visibility = ''; 
           if(gCurrPage_Cust == 1  ){
            document.getElementById('custTabBtnPrev1').disabled = true;
            document.getElementById('custTabBtnPrev1').removeAttribute("onclick");
        }
        if(gCurrPage_Cust >= parseInt(getNodeText(selectSingleNode(dataDOM, "/FCUBS_RES_ENV/TOTALPAGES")))){
          document.getElementById('custTabBtnNext1').disabled = true;
          document.getElementById('custTabBtnNext1').removeAttribute("onclick");
        }
        if(trim(data) == ""){
          document.getElementById('btnDivCust').style.visibility = 'hidden';
          document.getElementById('DIVcaptionSR1').getElementsByTagName("H2")[0].innerHTML += "<span>" + mainWin.getItemDesc("LBL_CUSTTAB_NO_RSLTS") + "</span>";
        }
            document.getElementById('searchCustResultDiv').style.visibility = "";
            if(document.getElementById('CustomerRecordsTable')){
            var tdArr = document.getElementById('CustomerRecordsTable').getElementsByTagName("TD");
            for(var tdCnt = 0; tdCnt < tdArr.length ; tdCnt++){
              tdArr[tdCnt].innerHTML = "&nbsp;";
              tdArr[tdCnt].removeAttribute("onkeydown");
              
            }
            document.getElementById('btnDivAcc').style.visibility = "hidden";
            }
        }
   } 
    else {
        if(typeof(myflag)!=="undefined" && myflag!=="true"){
            if(myflag=='next'){
                gCurrPage_Acc  = parseInt(currpage)+1; 
            }else{
                gCurrPage_Acc  = parseInt(currpage)-1; 
            }
         }else{
            gCurrPage_Acc = gCurrPage_Acc;  
        }
        if(typeof(myflag)!=="undefined"){
            fnBranchQueryPostforAccount('%',custacno, brnacno,'N', myflag, gCurrPage_Acc,multiccyacSearch); //fix for 19203110 
        }else{
            fnBranchQueryPostforAccount('%',custacno, brnacno,'N',multiccyacSearch);  //fix for 19203110 
        }
        //gCurrPage_Acc=gCurrPage_Acc;
        //fnBranchQueryPostforAccount('%', custacno, brnacno, myflag, gCurrPage_Acc);
        var html = '';
        if (objHTTP.status == 200) {
          if (selectSingleNode(objHTTP.responseXML, "//SESSION") != null && getNodeText(selectSingleNode(objHTTP.responseXML, "//SESSION")) == "EXPIRED") { //session expiry change  start
            mainWin.mask(); 
            mainWin.sessionTimeOut = true;
            mainWin.showAlerts(fnBuildAlertXML("", "I", mainWin.getItemDesc("LBL_SESSION_EXPIRED")), "S");
            return false;
        }//session expiry change  end
        if(getBrowser().indexOf("IE") != -1)//ie11 changes
        dataDOM.setProperty("SelectionNamespaces", ns);
        var data = getNodeText(selectSingleNode(dataDOM, "//FCUBS_RES_ENV"));
        data = trimTildaAtEnd(data);
        data = data.substring(0, data.lastIndexOf("!"));
    if(document.getElementById('AccountTable')){
      var tdArr = document.getElementById('DIVresultsTBL1').getElementsByTagName('TD');
        for (var tdCnt = 0;tdCnt < tdArr.length;tdCnt++) {
            tdArr[tdCnt].innerHTML = "&nbsp;";
            tdArr[tdCnt].removeAttribute("onkeydown");

        }
        if (document.getElementById('DIVcaptionSR1')) {
            var h2Elem = document.getElementById('DIVcaptionSR1').getElementsByTagName("H2")[0];
            var spanElem = h2Elem.getElementsByTagName('SPAN')[0];
            if (spanElem) {
                h2Elem.removeChild(spanElem);
            }
        }
    }else{
    html = '<div class=\'DIVmultiplebox\' id=\'DIVcaptionSR1\' tabindex=\"0\" onkeydown=\"return handleCustQueryKeyDownEvents(event)\"><h2 class="hh4dash">' + labelListOfAcc + '</h2>';
    html += "<DIV style=\"PADDING-BOTTOM: 3px; FLOAT: right;\" id=btnDivCust>";
    html +="<BUTTON id=custTabBtnPrev1 class=Abut onclick=\"fnCustomerQuery( \'" + prev + "\',"+gCurrPage_Acc+")\" type=submit disabled>" ;
    html +="<span title=\"Previous\" class=\"WidgetonePrevious\"></span></BUTTON><BUTTON id=custTabBtnNext1 class=Abut  onclick=\"fnCustomerQuery( \'" + next + "\',"+gCurrPage_Acc+")\" type=submit disabled><span class=\"WidgetoneNext\" title=Next></span>" ;
    html +="</BUTTON><BUTTON id=btnrefreshd class=Abut onclick=fnRefreshData() type=submit style=\"display:none;\"><span class=\"WidgetoneRefresh\" title=\"Refresh\"></span></BUTTON>" ;
    html +="</DIV>";
    html += '<div id=\'DIVresultsTBL1\' class=\'DIVMultipleSmallInner\' style=\'display:block;clear:both;overflow:auto;\' >';
    html += "</div></div>";
    document.getElementById('CUSTDETAILS').innerHTML = "";
    document.getElementById('CUSTDETAILS').innerHTML = html;      
    document.getElementById('searchCustResultDiv').style.visibility = "hidden";
    document.getElementById('searchCustResultDiv').style.display = "block";
    var tempObj = document.getElementById('DIVcaptionSR1');
    setWidthHeight(tempObj);
    tempObj = document.getElementById('DIVresultsTBL1');
    tempObj.style.width = tempObj.parentNode.offsetWidth  - 2+ 'px';
    tempObj.style.height = document.getElementById('DIVcaptionSR1').offsetHeight - (document.getElementById('btnDivCust').offsetHeight + 10) +'px';
    // fix for bug: 19060316 starts 
	if(mainWin.applicationExt == "JP") {
         html ='<TABLE  id = \'AccountTable\' style=\"width:100%\" class="TBLone" summary="' + labelListOfAcc + '" border="0" cellspacing="0" cellpadding="0">';        labelAccCcy
         html += '<thead><tr><th scope=\'col\' class=\'THgrid\'><span class=\'SPNtext\'>' + labelAccNumber + '</span></th><th scope=\'col\' class=\'THgrid\'><span class=\'SPNtext\'>' + labelAccCcy + '</span></th><th scope=\'col\' class=\'THgrid\'><span class=\'SPNtext\'>' + labelAccClass + '</span></th><th scope=\'col\' class=\'THgrid\'><span class=\'SPNtext\'>' + labelBranchCode + '</span></th><th scope=\'col\' class=\'THgrid\'><span class=\'SPNtext\'>' + labelDftAcc + '</span></th></tr></thead>'; 
         html += '<tbody>';
         for(var rowCnt = 0 ; rowCnt < 5 ; rowCnt++){
          if (rowCnt % 2 == 0) html += '<tr class=\'TBLoneTR\'>';
          else html += '<tr class=\'TBLoneTRalt\'>';
          html += "<td>&nbsp;</td>";
          html += '<td>&nbsp;</td>';
          html += '<td>&nbsp;</td>';
          html += '<td>&nbsp;</td>'; 
          html += '<td>&nbsp;</td>';
          html += '</tr>';
        } 
    } else {
	 // fix for bug: 19060316 ends
     html ='<TABLE  id = \'AccountTable\' style=\"width:100%\" class="TBLone" summary="' + labelListOfAcc + '" border="0" cellspacing="0" cellpadding="0">';        
     html += '<thead><tr><th scope=\'col\' class=\'THgrid\'><span class=\'SPNtext\'>' + labelAccNumber + '</span></th><th scope=\'col\' class=\'THgrid\'><span class=\'SPNtext\'>' + labelAccClass + '</span></th><th scope=\'col\' class=\'THgrid\'><span class=\'SPNtext\'>' + labelBranchCode + '</span></th></tr></thead>';
     html += '<tbody>';
     for(var rowCnt = 0 ; rowCnt < 5 ; rowCnt++){
      if (rowCnt % 2 == 0) html += '<tr class=\'TBLoneTR\'>';
      else html += '<tr class=\'TBLoneTRalt\'>';
      html += "<td>&nbsp;</td>";
			html += '<td>&nbsp;</td>';
      html += '<td>&nbsp;</td>';
			html += '</tr>';
		}
	}
     html += "</tbody></TABLE>";
     document.getElementById('DIVresultsTBL1').innerHTML = html;
    }
    data = trim(data);
    data = trimTildaAtEnd(data);
    var dataarray = data.split("~");
    if(dataarray.length > 0){
      var resultTable= document.getElementById('AccountTable');
      var tBodyElem = resultTable.tBodies[0];
      var rowLength =  resultTable.tBodies[0].rows.length;
      var i = 0;
      if(dataarray.length >= rowLength){
          document.getElementById('custTabBtnPrev1').disabled = false;
          addEvent(document.getElementById('custTabBtnPrev1'), "onclick", "fnCustomerQuery( \'" + prev + "\',"+gCurrPage_Acc+")");
          document.getElementById('custTabBtnNext1').disabled = false;
          addEvent(document.getElementById('custTabBtnNext1'), "onclick", "fnCustomerQuery( \'" + next + "\',"+gCurrPage_Acc+")");
        }
      for (var rowCnt = 0 ; rowCnt < rowLength ; rowCnt++){
        if(dataarray.length > i && data != ""){
        dataarray[i] = dataarray[i].replace('!', '');
        tBodyElem.rows[rowCnt].cells[0].onkeydown = "return handleCustRecKeyDownEvents(event)";
        //Fix for 17169292 
        //19198882 starts
        var isActive = ""; 
        //if(typeof(dataarray[i+9]) != "undefined")
        if(typeof(dataarray[i+9]) != "undefined" && multiccyacSearch == 'Y') //retro bug 19394000 
            isActive  = dataarray[i+9];
        tBodyElem.rows[rowCnt].cells[0].innerHTML = "<A class=\"Astd\" HREF='#' onclick=\"showCustAccDetails('"+ dataarray[i] + "', '" + dataarray[i + 1] + "', '"+ dataarray[i + 2] + "', '" + dataarray[i + 5] + "',event ,'"+isActive +"' )\" > "+ dataarray[i + 1] + "</A>"; 
        //19198882 ends
        //tBodyElem.rows[rowCnt].cells[0].innerHTML = "<A class=\"Astd\" HREF='#' onclick=\"showCustAccDetails('"+ dataarray[i] + "', '" + dataarray[i + 1] + "', '"+ dataarray[i + 2] + "', '" + dataarray[i + 5] + "',event)\" > "+ dataarray[i + 1] + "</A>";
		//fix for bug: 19060316 starts
        if(mainWin.applicationExt == "JP") {
            tBodyElem.rows[rowCnt].cells[1].innerHTML = "<span class=\"SPNtext\" tabindex=0>" + dataarray[i + 7] + "</span>"; 
            tBodyElem.rows[rowCnt].cells[2].innerHTML = "<span class=\"SPNtext\" tabindex=1>" + dataarray[i + 4] + "</span>";
            tBodyElem.rows[rowCnt].cells[2].onkeydown = "return handleCustRecKeyDownEvents(event)";
            tBodyElem.rows[rowCnt].cells[3].innerHTML = "<span class=\"SPNtext\" tabindex=2>" + dataarray[i + 2] + "</span>";
           
            if(dataarray[i + 6] =="Y")
                    tBodyElem.rows[rowCnt].cells[4].innerHTML = "<input type='checkbox' class='TXTstd'  id='rd_"+rowCnt+"_" + dataarray[i] +"'disabled  checked >";
            else
                tBodyElem.rows[rowCnt].cells[4].innerHTML = "<input type='checkbox' class='TXTstd'  id='rd_" +rowCnt+"_"+ dataarray[i]+" ' disabled  >";   
            
        } else {
		//fix for bug: 19060316 ends 
        tBodyElem.rows[rowCnt].cells[1].innerHTML = "<span class=\"SPNtext\" tabindex=0>" + dataarray[i + 4] + "</span>";
        tBodyElem.rows[rowCnt].cells[2].onkeydown = "return handleCustRecKeyDownEvents(event)";
        tBodyElem.rows[rowCnt].cells[2].innerHTML = "<span class=\"SPNtext\" tabindex=0>" + dataarray[i + 2] + "</span>";
		}
        }
        //retro bug 19394000 STARTS 
       if(mainWin.applicationExt == "JP") {
            if(multiccyacSearch == 'Y') i +=10; else i+=8;
       
        
       } else i +=6; //fix for bug: 19198882 
       
       //retro bug 19394000 ENDS 
       
      }
            if(gCurrPage_Acc == 1  ){
            document.getElementById('custTabBtnPrev1').disabled = "true";
            document.getElementById('custTabBtnPrev1').removeAttribute("onclick");
        }
        if(gCurrPage_Acc >= parseInt(getNodeText(selectSingleNode(dataDOM, "/FCUBS_RES_ENV/TOTALPAGES")))){
          document.getElementById('custTabBtnNext1').disabled = "true";
          document.getElementById('custTabBtnNext1').removeAttribute("onclick");
        }
        }
        else{
          document.getElementById('DIVcaptionSR1').getElementsByTagName("H2")[0].innerHTML += "<span>" + mainWin.getItemDesc("LBL_CUSTTAB_NO_RSLTS") + "</span>";
        }

        document.getElementById('searchCustResultDiv').style.visibility = "";
        document.getElementById('ListofAccDiv').innerHTML = "";

	}
}
    functionId = "COMMON";
    //fnpostAction('ACCOUNTSEARCH',dataDOM);
    
}

  function showtable(divid,event,flag) 
{
    if(divid=='DIVresultsTBL1') {
        if(flag==true) {
           document.getElementById('CustSec1').style.display = "block"; 
           document.getElementById('CustSec2').style.display = "none"; 
           document.getElementById('CustSec3').style.display = "none"; 
        }
        else
        {
             document.getElementById('CustSec2').style.display = "block"; 
           document.getElementById('CustSec1').style.display = "none"; 
           document.getElementById('CustSec3').style.display = "none";
    }
    } else {
         document.getElementById('CustSec3').style.display = "block"; 
           document.getElementById('CustSec2').style.display = "none"; 
           document.getElementById('CustSec1').style.display = "none";
    }

}


// 12.0.2 changes for customer tab starts
function fnCustSearchPost(msgType, name, cfid, custidval, brnacno, LinkedCust,pidSearch,multiccyacSearch, myflag, currpageno) {//fix for bug: 19060316
    //SNORAS#000780 Starts
      if (typeof(name) !== "undefined")
       {
	name=name.replace(/\'/g,"%");//if Name has Single quote then query fails.
       }//SNORAS#000780 Ends
    var actionType = "CustSearch";
    var requestString = '';
    //var redCriteria = "1>" + cfid + "%~2>" + name + "%~3>" + custidval + "%";
/* security fixes for WF starts*/
    name= replaceChar(name);
    cfid= replaceChar(cfid);
    custidval= replaceChar(custidval);
    brnacno= replaceChar(brnacno);
    //fix for bug: 19060316 starts
     //var redCriteria = "1|"+name+"!2|"+cfid+"!3|"+custidval+"!4|"+brnacno;
    var redCriteria = "";
    var KanjiCustName = "";
    var KatakanaCustName = "";
    var HiraganaCustName = "";
    if(mainWin.applicationExt == "JP") {
        KanjiCustName = document.getElementById("KanjiCustName").value; 
        KatakanaCustName = document.getElementById("KatakanaCustName").value;
        HiraganaCustName = document.getElementById("HiraganaCustName").value;
        KanjiCustName= replaceChar(KanjiCustName);
        KatakanaCustName= replaceChar(KatakanaCustName);
        HiraganaCustName= replaceChar(HiraganaCustName);
        redCriteria = "1!"+name+"|2!"+cfid+"|3!"+custidval+"|4!"+brnacno+"|5!"+KanjiCustName+"|6!"+KatakanaCustName+"|7!"+HiraganaCustName;
     }else { //fix for bug: 19060316 ends 
      redCriteria = "1!"+name+"|2!"+cfid+"|3!"+custidval+"|4!"+brnacno;
      
     }
      //fix for bug: 19060316 starts
     if(pidSearch == 'Y'){ 
         redCriteria ="1!"+document.getElementById("Pid").value;
     }
     if(multiccyacSearch == 'Y'){
         redCriteria="1!"+document.getElementById("MultiCurrAccNo").value;
     }
      //fix for bug: 19060316 ends
     //var redCriteria = "1>"+name+"~2>"+cfid+"~3>"+custidval+"~4>"+brnacno;
/* security fixes for WF ends */
    if(typeof(myflag)!=="undefined"){
     //SNORAS#000804-- my change-customer details
         if(myflag=='next'){           
           //gcurrpage=parseInt(currpageno)+1;
           gcurrpage = parseInt(currpageno);
           objHTTP.open("POST", serverURL + "?funcid=" + func + "&msgType=" + msgType + "&actionType=" + actionType + "&XREF=" + xref + "&name=" + name + "&cfid=" + cfid + "&LinkedCust=" + LinkedCust + "&RedFldNames=" + escape(redCriteria).replace(/\+/g, '%2B').replace(/\'"'/g, '%22').replace(/\"'"/g, '%27') + "&fetchSize=1000" + "&TotalPages=" + "&CurPage="+gcurrpage, false); // Open the Connection to the Server  
         }else{
         if(currpageno > 1){
           gcurrpage=parseInt(currpageno);          
         } else if(currpageno == '1'){
             gcurrpage = parseInt(currpageno);
         }
          objHTTP.open("POST", serverURL + "?funcid=" + func + "&msgType=" + msgType + "&actionType=" + actionType + "&XREF=" + xref + "&name=" + name + "&cfid=" + cfid + "&LinkedCust=" + LinkedCust + "&RedFldNames=" + escape(redCriteria).replace(/\+/g, '%2B').replace(/\'"'/g, '%22').replace(/\"'"/g, '%27') + "&fetchSize=1000" + "&TotalPages=" + "&CurPage="+gcurrpage, false); // Open the Connection to the Server  
         }
    }else{
      objHTTP.open("POST", serverURL + "?funcid=" + func + "&msgType=" + msgType + "&actionType=" + actionType + "&XREF=" + xref + "&name=" + name + "&cfid=" + cfid + "&LinkedCust=" + LinkedCust + "&RedFldNames=" + escape(redCriteria).replace(/\+/g, '%2B').replace(/\'"'/g, '%22').replace(/\"'"/g, '%27') + "&fetchSize=1000" + "&TotalPages=" + "&CurPage=1", false); // Open the Connection to the Server   
    }
    objHTTP.setRequestHeader("Content-Type", "application/xml");
    /* Added encoding charset for NLS Support & sending search data thru request body*/
    objHTTP.setRequestHeader("charset", "utf-8");
    objHTTP.setRequestHeader("X-CSRFTOKEN", mainWin.CSRFtoken);
    requestString += "<CUSTNAME>" + name + "</CUSTNAME>";
    requestString += "<CIFID>" + cfid + "</CIFID>";
    requestString += "<CUSTIDVAL>" + custidval + "</CUSTIDVAL>";
    requestString += "<CRITERIA>" + redCriteria + "</CRITERIA>";//FCUBS_11.3.0_P01_FC11.0_IMPSUPP_198 changes
     var t = getDateObject();
    // if(gAction != 'RELEASELOCK')
    posttime = (t.getHours() * (3600 * 1000)) + (t.getMinutes() * (60 * 1000)) + (t.getSeconds() * 1000) + t.getMilliseconds();
    //Performance Changes
	try{ //9NT1606_12_2_RETRO_12_0_3_21182929 changes
    objHTTP.send(requestString);
	} //9NT1606_12_2_RETRO_12_0_3_21182929 changes start
     catch(exp){
          mainWin.handleNetWorkErr(exp);
        } //9NT1606_12_2_RETRO_12_0_3_21182929 changes end
    t = getDateObject();
    //if(gAction != 'RELEASELOCK')
    afterposttime = (t.getHours() * (3600 * 1000)) + (t.getMinutes() * (60 * 1000)) + (t.getSeconds() * 1000) + t.getMilliseconds();
    //Performance Changes
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
            mainWin.mask(); 
            mainWin.sessionTimeOut = true;
            mainWin.showAlerts(fnBuildAlertXML("", "I", mainWin.getItemDesc("LBL_SESSION_EXPIRED")), "S");
            return false;
        }//session expiry change  end
		// Fix for 18364751 starts 
        else if((selectSingleNode(objHTTP.responseXML, "//ERROR")!= null) && (getNodeText(selectSingleNode(objHTTP.responseXML, "//ERROR")))) {
            alert(getNodeText(selectSingleNode(objHTTP.responseXML, "//ERROR")));
        }
        // Fix for 18364751 ends
		else {
            dataDOM = objHTTP.responseXML;
           /* var respTxt = getXMLString(dataDOM);
            if (respTxt.indexOf("<FCUBS_DEBUG_RESP>") !=  - 1) {
                appendDebug(dataDOM);
                var start = respTxt.substring(0, respTxt.indexOf("<FCUBS_DEBUG_RESP>"));
                var end = respTxt.substring(respTxt.indexOf("</FCUBS_DEBUG_RESP>") + 19, respTxt.length);
                respTxt = start + end;
                dataDOM = loadXMLDoc(respTxt);
            }*/
            if(getBrowser().indexOf("IE") != -1)//ie11 changes
                dataDOM.setProperty("SelectionNamespaces", ns);
        }
    } else {
        alert(mainWin.getItemDesc("LBL_TRANS_FAILED"));
    }
}
// 12.0.2 changes for customer tab ends
function fnCustReset() {
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    document.getElementById("CustName").value = "%";
    document.getElementById("CFid").value = "%";
    document.getElementById("CustIdentifier").value = "%";
    document.getElementById("CustAccountNo").value = "%";
    document.getElementById("CustBrn").value = "%";
	// fix for bug: 19060316 starts
	if(mainWin.applicationExt == "JP") {
        document.getElementById("Pid").value = "%"; 
        document.getElementById("KanjiCustName").value = "%"; 
        document.getElementById("KatakanaCustName").value = "%";
        document.getElementById("HiraganaCustName").value= "%";
        document.getElementById("MultiCurrAccNo").value= "%";
    } // fix for bug: 19060316 ends
	  document.getElementById("LinkedCustomers").checked = false;
   var tdArr = document.getElementById('ContentCustomerSearch').getElementsByTagName('TD');
   for(var tdCnt = 0; tdCnt < tdArr.length ; tdCnt++){
     tdArr[tdCnt].innerHTML = "&nbsp;";
      tdArr[tdCnt].removeAttribute("onkeydown");
     
   }
    if(document.getElementById('btnDivCust'))document.getElementById('btnDivCust').style.visibility = 'hidden';
    if(document.getElementById('btnDivAcc'))document.getElementById('btnDivAcc').style.visibility = 'hidden';
    if( document.getElementById('DIVcaptionSR1')){
    var h2Elem = document.getElementById('DIVcaptionSR1').getElementsByTagName("H2")[0];
    var spanElem = h2Elem.getElementsByTagName('SPAN')[0];
    if(spanElem){
    h2Elem.removeChild(spanElem);
    }
    }
    if( document.getElementById('DIVcaptionSR2')){
    var h2Elem = document.getElementById('DIVcaptionSR2').getElementsByTagName("H2")[0];
    var spanElem = h2Elem.getElementsByTagName('SPAN')[0];
    if(spanElem){
    h2Elem.removeChild(spanElem);
    }
    }
    
    
    clearDisplayedTabs();

}



function showCustomerImage(branchCode, customerInformationArray) {
    var confirmFlag = false;
    var customerObject = new Object();
    var customerNumber = "";
    var customerName = "";
    var customerAddress = "";

    var customerInformation = customerInformationArray.split("~");

    customerNumber = customerInformation[0];
    customerName = customerInformation[1];
    customerAddress = customerInformation[2];
    confirmFlag = confirm(mainWin.getItemDesc("LBL_SET_CUSTNO_DETAILS"));
    if (confirmFlag) {
        customerObject = mainWin.getCustomer(custId, custName, custAddr, branchCode); //Fix for 18556668 passing branch code as a argument
        alert(mainWin.getItemDesc("LBL_CUSTNO_SET_SESSION") + ' ' + customerNumber);
    } else {
        confirmFlag = false;
    }
}

/**
 * Function to cancel/unlock transaction
 */

function fnCancel() {
    var confirmFlag = confirm(mainWin.getItemDesc("LBL_DO_CANCEL_TRANSACTION"));
    if (confirmFlag) {
        window.close();
    }
}

function fnReset() {
    document.getElementById("REL_CUSTOMER").value = "";
    document.getElementById("CUSTOMER_NAME").value = "";
    document.getElementById("UNIQUE_VALUE").value = "";
    deleteAllRows(multipleEntryIDs[0]);
}

/*function getCustomerRecords(customerInformationArray) {
    var labelListOfAcc = mainWin.getItemDesc("LBL_LIST_OF_ACC");
    var labelAccNumber = mainWin.getItemDesc("LBL_ACC_NUMBER");
    var labelBranchCode = mainWin.getItemDesc("LBL_BRANCH_CODE");
    
    customerInformationArray=fnUnEscape(customerInformationArray);
    var customerInformation = customerInformationArray.split("~");

    var customerNumber = customerInformation[0];
    var branchCode = customerInformation[1];
    
    var customerName = customerInformation[2];
    var customerAddress = customerInformation[3];
    var birthDate = customerInformation[4];
    if (birthDate != null && birthDate != "") {
        birthDate = birthDate.split("-", -1);
        birthDate = getSystemShortDate(parseInt(birthDate[0], 10), parseInt(birthDate[1], 10), parseInt(birthDate[2], 10));
    }
  	customerInformationArray=fnEscape(customerInformationArray);
    var uniqueValue = customerInformation[5];
    var custData = customerNumber + "~" + customerName + "~" + customerAddress + "~" + birthDate + "~" + uniqueValue;
    
    var html = '';
    fnBranchQueryPostforAccount(customerNumber, branchCode);
    if (objHTTP.status == 200) {
        if(window.ActiveXObject)
        dataDOM.setProperty("SelectionNamespaces", ns);
        var data = getNodeText(selectSingleNode(dataDOM, "//FCUBS_RES_ENV"));
        data = trimTildaAtEnd(data);
        data = data.substring(0, data.lastIndexOf("!"));
        html += '<TABLE id = \'CustomerRecordsTable\'width="100%"  class="TBLtwo" summary="' + labelListOfAcc + '" border="0" cellspacing="0" cellpadding="0"><THEAD>';
        html += '<tr><th scope="col"><span class="SPNtbltwoH">' + labelAccNumber + '</span></th>';
        html += '<th scope="col"><span class="SPNtbltwoH">' + labelBranchCode + '</span></th></tr>';
        html += '</THEAD><tbody>';
        var dataarray = data.split("~");
        if (trim(data) != "") {
            for (var i = 0; i < dataarray.length - 1; i += 16) // FCUBS 11.0 Customer Search Changes
            {
                var accountData = "";
                for (var j = i; j < i + 16; j++) // FCUBS 11.0 Customer Search Changes
                {
                    accountData += trimTildataAtFront(dataarray[j]) + "~";
                }
                accountData = trimTildaAtEnd(accountData);
                accountData=fnEscape(accountData);//SNORAS#000780

                html += '<tr>';
                html += "<td onkeydown = \'return handleCustRecKeyDownEvents(event)\'><A class=\"Astd\" HREF=\'#\' onclick=\"fnShowDBoardCustDetails(\'" + custData + "\', \'" + accountData + "\')\" >" + dataarray[i + 6] + "</A></td>";
                html += '<td onkeydown = \'return handleCustRecKeyDownEvents(event)\'><span class="SPNtext" tabindex=0>' + dataarray[i + 7] + '</span></td>';
                html += '</tr>';
            }
        }
        html += "</tbody>";
        html += "</TABLE>";
        html += "<div style=\"background-color:gray;padding-bottom:1px\">";
        html += "<table summary=\'\' style=\'margin: 0px 5px 5px 0px\' border = \"0\" cellpadding = \"0\" cellspacing = \"0\">";
        html += "<tbody><tr><td>&nbsp;</td>";
        html += "<td valign = \'middle\'><button class = \'Abut\' title = \'Previous\'><img src=\'Images/widgetonePrevious.gif\' alt = \'Previous\' title = \'Previous\'></button></td>";
        html += "<td>&nbsp;</td>";
        html += "<td valign = \'middle\'><button class = \'Abut\' title = \'Next\'><img src = \'Images/widgetoneNext.gif\' alt = \'Next\' title = \'Next\'></button></td>";
        html += "<td>&nbsp;</td>";
        html += "</tr></tbody></table>";
        html += "</div>";
        document.getElementById('ListofAccDiv').innerHTML = html;
        document.getElementById('ListofAccDiv').style.display = "block";
        //document.getElementById('ListofAccDiv').getElementsByTagName("TABLE")[0].getElementsByTagName("TBODY")[0].getElementsByTagName("TR")[0].getElementsByTagName("A")[0].focus();
        if (document.getElementById('CustomerRecordsTable').tBodies[0].rows.length > 0)
            document.getElementById('CustomerRecordsTable').tBodies[0].rows[0].getElementsByTagName("A")[0].focus();
        else
            document.getElementById('CustomerRecordsTable').tHead.rows[0].getElementsByTagName("TH")[0].focus();
    }
}*/

function getCustomerRecords(customerInformationArray, e, recflag, currpage) {
   gCurrPage_Acc = 1;

	 if(typeof(e) != 'undefined'){
    var event = window.event || e;
   var eventElem = getEventSourceElement(event);
   var custLinks = getCustLinks();
   if(eventElem.tagName== "A"){
   highlightCustrec(eventElem,custLinks);
   setTimeout(function(){eventElem.focus();},0);
   }
  }

    if (mainWin.CustomerObj != null) {
        alert(mainWin.getItemDesc("LBL_CUST_SESSION_OPENED_AC") + ":" + accountNumber  +  ". "+mainWin.getItemDesc("LBL_END_PREV_CUST_SESSION"));
        return;
     }
    unmask();
    var labelListOfAcc = mainWin.getItemDesc("LBL_LIST_OF_ACC");
    var labelAccNumber = mainWin.getItemDesc("LBL_ACC_NUMBER");
    var labelBranchCode = mainWin.getItemDesc("LBL_BRANCH_CODE");
    var labelAccClass=mainWin.getItemDesc("LBL_ACC_CLASS");
   if(typeof(recflag)!="undefined"){
    customerInformationArray=fnUnEscape(customerInformationArray);
    var customerInformation = customerInformationArray.split("~");
    var customerNumber = customerInformation[0];
    var localBranchCode = customerInformation[2];
    var custAccNo = '%';
  }
  if(typeof(recflag)!="undefined" && recflag!="true"){

        if(recflag=='next'){
            gCurrPage_Acc  = parseInt(currpage)+1; 
        }else{
            gCurrPage_Acc  = parseInt(currpage)-1; 
        }
     }else{
           clearDisplayedTabs(); 
     }   
    var html = '';
   
   
     if (document.getElementById("rd_"+customerNumber).checked == true) {
        var RelatedCust = 'Y';
    } else {
        var RelatedCust = 'N';
    } 
    if(typeof(recflag)!="undefined"){
        fnBranchQueryPostforAccount(customerNumber,'%', '%',RelatedCust, recflag, gCurrPage_Acc); 
    }else{
       fnBranchQueryPostforAccount(customerNumber,'%', '%',RelatedCust); 
    }
    if (objHTTP.status == 200) {
        if(getBrowser().indexOf("IE") != -1)//ie11 changes
        dataDOM.setProperty("SelectionNamespaces", ns);
if(typeof(recflag) != "undefined"){
        var data = getNodeText(selectSingleNode(dataDOM, "//FCUBS_RES_ENV"));
        data = trimTildaAtEnd(data);
        data = data.substring(0, data.lastIndexOf("!"));
}
        fnCreateAccountHtml(recflag, customerInformationArray);
        
       if(typeof(recflag) != "undefined"){
        data = trim(data);
        data = trimTildaAtEnd(data);
        var dataarray = data.split("~");
        var index = 0;
        var resultTable= document.getElementById('CustomerRecordsTable');
        var tBodyElem = resultTable.tBodies[0];
        var rowLength =  resultTable.tBodies[0].rows.length;
        
        if(dataarray.length >= rowLength){
          document.getElementById('custTabBtnPrev2').disabled = false;
          addEvent(document.getElementById('custTabBtnPrev2'), "onclick", "getCustomerRecords( '" + customerInformationArray +  "',event,'"+ prev +  "'," + gCurrPage_Acc + ")");
          document.getElementById('custTabBtnNext2').disabled = false;
          addEvent(document.getElementById('custTabBtnNext2'), "onclick", "getCustomerRecords( '" + customerInformationArray +  "',event,'"+ next +  "'," + gCurrPage_Acc + ")");
        }
        for(var rowCnt = 0 ; rowCnt < rowLength ; rowCnt++){
       if(dataarray.length > index && data != ""){
        tBodyElem.rows[rowCnt].cells[0].onkeydown = "return handleCustRecKeyDownEvents(event)";
        //Fix for 17169292 
        tBodyElem.rows[rowCnt].cells[0].innerHTML = "<A class=\"Astd\" HREF='#' onclick=\"showCustAccDetails('"+ customerNumber + "', '" + dataarray[index + 1] + "', '"+ dataarray[index + 2] + "', '" + dataarray[index + 5] + "',event)\" > "+ dataarray[index + 1] + "</A>";
        //html += "<td onkeydown = \'return handleCustRecKeyDownEvents(event)\'><A class=\"Astd\" HREF=\'#\' onclick=\"showCustAccDetails(\'" + customerNumber + "\', \'" + dataarray[index + 1] + "\', \'" + dataarray[index + 2] + "\', \'" + dataarray[index + 3] + "\', event)\" >" + dataarray[index + 1] + "</A></td>";
        // fix for bug: 19060316 starts 
		if(mainWin.applicationExt == "JP") {
            tBodyElem.rows[rowCnt].cells[1].innerHTML = "<span class=\"SPNtext\" tabindex=0>" + dataarray[index + 7] + "</span>"; 
            tBodyElem.rows[rowCnt].cells[2].innerHTML = "<span class=\"SPNtext\" tabindex=1>" + dataarray[index + 4] + "</span>";
            tBodyElem.rows[rowCnt].cells[2].onkeydown = "return handleCustRecKeyDownEvents(event)";
            tBodyElem.rows[rowCnt].cells[3].innerHTML = "<span class=\"SPNtext\" tabindex=2>" + dataarray[index + 2] + "</span>";
            
            if(dataarray[index + 6] =="Y")
                    tBodyElem.rows[rowCnt].cells[4].innerHTML = "<input type='checkbox' class='TXTstd'  id='rd_"+rowCnt+"_" + dataarray[index] +"'disabled  checked >";
            else
                tBodyElem.rows[rowCnt].cells[4].innerHTML = "<input type='checkbox' class='TXTstd'  id='rd_" +rowCnt+"_"+ dataarray[index]+" ' disabled  >";   
        }else { // fix for bug: 19060316 ends  
			tBodyElem.rows[rowCnt].cells[1].innerHTML = "<span class=\"SPNtext\" tabindex=0>" + dataarray[index + 4] + "</span>";
	        tBodyElem.rows[rowCnt].cells[2].onkeydown = "return handleCustRecKeyDownEvents(event)";
	        tBodyElem.rows[rowCnt].cells[2].innerHTML = "<span class=\"SPNtext\" tabindex=0>" + dataarray[index + 2] + "</span>";
		}
        //html += '<td onkeydown = \'return handleCustRecKeyDownEvents(event)\'><span class="SPNtext" tabindex=0>' + dataarray[index + 2] + '</span></td>';
               
        }
         if(mainWin.applicationExt == "JP") index += 8; else index += 6; // fix for bug: 19060316  
        }

        }
        document.getElementById('btnDivAcc').style.visibility = '';
       if(gCurrPage_Acc == 1){
            document.getElementById('custTabBtnPrev2').disabled = "true";
            document.getElementById('custTabBtnPrev2').removeAttribute("onclick");
        }
        if(gCurrPage_Acc >= parseInt(getNodeText(selectSingleNode(dataDOM, "/FCUBS_RES_ENV/TOTALPAGES")))){
          document.getElementById('custTabBtnNext2').disabled = "true";
         document.getElementById('custTabBtnNext2').removeAttribute("onclick");
        }  
        }
        
        if(data == ""){
          document.getElementById('btnDivAcc').style.visibility = 'hidden';
          document.getElementById('DIVcaptionSR2').getElementsByTagName("H2")[0].innerHTML += "<span>" + mainWin.getItemDesc("LBL_CUSTTAB_NO_RSLTS") + "</span>";
     
        }

        document.getElementById('ListofAccDiv').style.visibility = "";
        if(typeof(recflag) == 'undefined'){
             dispCustImageDB("true");
            }
        functionId = "COMMON";    
        //fnpostAction('ACCOUNTSEARCH',dataDOM);
        
  }

function getCustLinks(){
    var custacobj = document.getElementById('CUSTDETAILS');
    var custacobjlinks = custacobj.getElementsByTagName("A");
    return custacobjlinks;
}

function highlightCustrec(acustobject,tabobjlinks){
for (i = 0; i < tabobjlinks.length; i++) {
        addEvent(tabobjlinks[i], "class", "Astd");
        //tabobjlinks[i].removeAttribute("title");        
    }
    addEvent(acustobject, "class","Astdselected");
    //document.getElementById("WFTab_"+aobject).setAttribute("title","selected");   
}

function fnBranchQueryPostforAccount(customerNumber, custAccNo, branchCode,RelatedCust, recflag, currpageno,multiccyacSearch) { //fix for 19203110 

    var msgType = "NONWORKFLOW";
    var accountClass="";
    var actionType = "RecordSearch";
    /* security fixes for WF starts*/
    //var redCriteria = "1>" + customerNumber + "%";
    //var redCriteria = "1>"+customerNumber+"~2>"+custAccNo+"~3>"+branchCode;
                  customerNumber= replaceChar(customerNumber);
                  custAccNo= replaceChar(custAccNo);
                  branchCode= replaceChar(branchCode);
    //var redCriteria = "1|"+customerNumber+"!2|"+custAccNo+"!3|"+branchCode;
    //var redCriteria = "1!"+customerNumber+"|2!"+custAccNo+"|3!"+branchCode;
	var redCriteria = ""; //fix for 19203110
	// fix for 19203110 starts
	if(multiccyacSearch == 'Y'){  
         redCriteria="1!"+document.getElementById("MultiCurrAccNo").value;
    }else
        redCriteria = "1!"+customerNumber+"|2!"+custAccNo+"|3!"+branchCode;
	//fix for 19203110 ends
/* security fixes for WF ends*/
    var requestString = '';
    if(typeof(recflag)!=="undefined"){     
         if(recflag=='next'){           
           grecpage=parseInt(currpageno);           
         }else{
           grecpage=parseInt(currpageno);           
         }
        objHTTP.open("POST", serverURL + "?funcid=" + func + "&msgType=" + msgType + "&actionType=" + actionType + "&XREF=" + xref + "&customerNumber=" + customerNumber + "&custAccNo=" + custAccNo + "&branchCode=" + branchCode + "&relatedCust=" + RelatedCust + "&RedFldNames=" + escape(redCriteria).replace(/\+/g, '%2B').replace(/\'"'/g, '%22').replace(/\"'"/g, '%27') + "&fetchSize=1000" + "&TotalPages=" + "&CurPage="+grecpage, false);            
    }else{
        objHTTP.open("POST", serverURL + "?funcid=" + func + "&msgType=" + msgType + "&actionType=" + actionType + "&XREF=" + xref + "&customerNumber=" + customerNumber+"&custAccNo=" + custAccNo + "&branchCode=" + branchCode + "&relatedCust=" + RelatedCust + "&multiccyacSearch="+multiccyacSearch+  "&RedFldNames=" + escape(redCriteria).replace(/\+/g, '%2B').replace(/\'"'/g, '%22').replace(/\"'"/g, '%27') + "&fetchSize=1000" + "&TotalPages=" + "&CurPage=1", false); // Open the Connection to the Server //fix for 19203110  
    }
    objHTTP.setRequestHeader("Content-Type", "application/xml");
    objHTTP.setRequestHeader("charset", "utf-8");
    objHTTP.setRequestHeader("X-CSRFTOKEN", mainWin.CSRFtoken);
    var t = getDateObject();
    // if(gAction != 'RELEASELOCK')
    posttime = (t.getHours() * (3600 * 1000)) + (t.getMinutes() * (60 * 1000)) + (t.getSeconds() * 1000) + t.getMilliseconds();
    try{ //9NT1606_12_2_RETRO_12_0_3_21182929 changes 
    objHTTP.send(requestString);
	} //9NT1606_12_2_RETRO_12_0_3_21182929 changes start 
     catch(exp){
          mainWin.handleNetWorkErr(exp);
        } //9NT1606_12_2_RETRO_12_0_3_21182929 changes end 
    t = getDateObject();
    //if(gAction != 'RELEASELOCK')
    afterposttime = (t.getHours() * (3600 * 1000)) + (t.getMinutes() * (60 * 1000)) + (t.getSeconds() * 1000) + t.getMilliseconds();
    //Performance Changes
    if (objHTTP.status != 200) //200 - OK
    {
        alert(mainWin.getItemDesc("LBL_QRY_FAIL_ERR_DESC") + "\"" + objHTTP.status + ":" + objHTTP.statusText + "\"");
    } else if (objHTTP.responseText == timeout_responseXML) {
        msgStat = 'F';
        openTimeOutPage();
    } else if (getXMLString(objHTTP.responseXML) != '') {        
        mainWin.inactiveTime = 0;
        if (selectSingleNode(objHTTP.responseXML, "//SESSION") != null && getNodeText(selectSingleNode(objHTTP.responseXML, "//SESSION")) == "EXPIRED") {//session expiry change  start
            mainWin.mask(); 
            mainWin.sessionTimeOut = true;
            mainWin.showAlerts(fnBuildAlertXML("", "I", mainWin.getItemDesc("LBL_SESSION_EXPIRED")), "S");
            return false;
        }//session expiry change  end
        if((selectSingleNode(objHTTP.responseXML, "//ERROR")!= null) && (getNodeText(selectSingleNode(objHTTP.responseXML, "//ERROR")))) {//12.1 session expiry fix 2
            alert(getNodeText(selectSingleNode(objHTTP.responseXML, "//ERROR")));
        }
        dataDOM = objHTTP.responseXML;
         /*var respTxt = getXMLString(dataDOM);
            if (respTxt.indexOf("<FCUBS_DEBUG_RESP>") !=  - 1) { 
                appendDebug(dataDOM);
                var start = respTxt.substring(0, respTxt.indexOf("<FCUBS_DEBUG_RESP>"));
                var end = respTxt.substring(respTxt.indexOf("</FCUBS_DEBUG_RESP>") + 19, respTxt.length);
                respTxt = start + end;
                dataDOM = loadXMLDoc(respTxt);
            }*/
        if(getBrowser().indexOf("IE") != -1)//ie11 changes
            dataDOM.setProperty("SelectionNamespaces", ns);
    } else {
        alert(mainWin.getItemDesc("LBL_TRANS_FAIL"));
    }
}
// FCUBS 11.4.0 - Search based on account no - Changes start (Bibilu)
function fnQueryDirectAccount(customerNumber,custacno, branchCode) {
    var msgType = "NONWORKFLOW";
    var actionType = "DirectAccountSearch";
    //var redCriteria = "1>" + customerNumber + "%";
	var redCriteria = "1>"+customerNumber+"~2>"+custacno+"~3>"+branchCode;
	
    var requestString = '';
	var reqURL = serverURL + "?funcid=" + func + "&msgType=" + msgType + "&actionType=" + actionType + "&XREF=" + xref + "&customerNumber=" + customerNumber + "&branchCode=" + branchCode + "&custacno=" + custacno + "&RedFldNames=" + redCriteria + "&fetchSize=1000" + "&TotalPages=0" + "&CurPage=1"; // Fix for SFR # 13512484 - ITR2
    //objHTTP.open("POST", serverURL + "?funcid=" + func + "&msgType=" + msgType + "&actionType=" + actionType + "&XREF=" + xref + "&customerNumber=" + customerNumber + "&branchCode=" + branchCode + "&custacno=" + custacno + "&RedFldNames=" + escape(redCriteria).replace(/\+/g, '%2B').replace(/\'"'/g, '%22').replace(/\"'"/g, '%27') + "&fetchSize=1000" + "&TotalPages=0" + "&CurPage=1", false); // Open the Connection to the Server
	objHTTP.open("POST", encodeURI(reqURL), false); // Fix for SFR # 13512484 - ITR2
    objHTTP.setRequestHeader("Content-Type", "application/xml");
    objHTTP.setRequestHeader("charset", "utf-8");
    objHTTP.setRequestHeader("X-CSRFTOKEN", mainWin.CSRFtoken);
	try{//9NT1606_12_2_RETRO_12_0_3_21182929 changes 
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
        if (selectSingleNode(objHTTP.responseXML, "//SESSION") != null && getNodeText(selectSingleNode(objHTTP.responseXML, "//SESSION")) == "EXPIRED") { //session expiry change  start
            mainWin.mask(); 
            mainWin.sessionTimeOut = true;
            mainWin.showAlerts(fnBuildAlertXML("", "I", mainWin.getItemDesc("LBL_SESSION_EXPIRED")), "S");
            return false;
        }//session expiry change  end
        dataDOM = objHTTP.responseXML;
        /*var respTxt = getXMLString(dataDOM);
            if (respTxt.indexOf("<FCUBS_DEBUG_RESP>") !=  - 1) { 
                appendDebug(dataDOM);
                var start = respTxt.substring(0, respTxt.indexOf("<FCUBS_DEBUG_RESP>"));
                var end = respTxt.substring(respTxt.indexOf("</FCUBS_DEBUG_RESP>") + 19, respTxt.length);
                respTxt = start + end;
                dataDOM = loadXMLDoc(respTxt);
            }*/
        if(getBrowser().indexOf("IE") != -1)//ie11 changes
            dataDOM.setProperty("SelectionNamespaces", ns);
    } else {
        alert(mainWin.getItemDesc("LBL_TRANS_FAIL"));
    }
}
// FCUBS 11.4.0 - Search based on account no - Changes end (Bibilu)

function showAccountInfo(customerInformationArray, accountInformationArray) {
    strImgInfo = "";
    strSigInfo = "";
    var labelSelectedAccDetails = mainWin.getItemDesc("LBL_SEL_ACC_DETAILS");
    var labelProduct = mainWin.getItemDesc("LBL_PRODUCT");
    var labelAccCcy = mainWin.getItemDesc("LBL_ACC_CCY");
    var labelStatus = mainWin.getItemDesc("LBL_STATUS");
    var labelUncollectedFunds = mainWin.getItemDesc("LBL_UNCOLLECTED_FUNDS");
    var labelCurrBalance = mainWin.getItemDesc("LBL_CURRENT_BAL");
    var labelAvailableBalance = mainWin.getItemDesc("LBL_AVAILABLE_BAL");
    /* FCUBS 11.0 Customer Search Changes starts here */
    var labelLoanProduct = mainWin.getItemDesc("LBL_LOAN_PRODUCT");
    var labelAmountFinanaced = mainWin.getItemDesc("LBL_AMOUNT_FINANCED");
    var labelAmountDisbursed = mainWin.getItemDesc("LBL_AMOUNT_DISBURSED");
    /* FCUBS 11.0 Customer Search Changes ends here */
    //SNORAS#000780 Starts
	customerInformationArray=fnUnEscape(customerInformationArray);
	accountInformationArray=fnUnEscape(accountInformationArray);
    //SNORAS#000780 Ends
    var accountData = accountInformationArray.split("~");
    var accountType = accountData[15]; //FCUBS 11.0 Customer Search
    // FC10.5 SFR 4356 STARTS
    var CurrBalanceAmount = new MB3Amount(accountData[11], true, accountData[12]);
    var UncollectedFundsAmount = new MB3Amount(accountData[9], true, accountData[12]);
    var AvailableBalanceAmount = new MB3Amount(accountData[10], true, accountData[12]);
    var totalAmountFinanced = new MB3Amount(accountData[9], true, accountData[12]);
    var totalAmountDisbursed = new MB3Amount(accountData[11], true, accountData[12]);
    if (CurrBalanceAmount.isValid()) {
        accountData[11] = CurrBalanceAmount.getInputAmount();
    }
    if (UncollectedFundsAmount.isValid()) {
        accountData[9] = UncollectedFundsAmount.getInputAmount();
    }
    if (AvailableBalanceAmount.isValid()) {
        accountData[10] = AvailableBalanceAmount.getInputAmount();
    }
    /*  FCUBS 11.0 Customer Search Changes starts here*/
    if (totalAmountFinanced.isValid()) {
        accountData[9] = totalAmountFinanced.getInputAmount();
    }
    if (totalAmountDisbursed.isValid()) {
        accountData[11] = totalAmountDisbursed.getInputAmount();
    }
   
   if (accountType == "L") {
       var custHTML = '';
       custHTML += "<div class=\"widgetonecontainer\" id=\"widgetonecontainer3\" role=\"group\" aria-labelledby=\"widgetoneheading3\">";
       custHTML += '<h2 class=\"widgetoneheading\" id=\"widgetoneheading3\">Selected Account: <span>' + accountData[6] + ' (' + accountData[7] + ')' + '</span></h2>';
       custHTML += "<div class = \'csc\' id=\"csc\"><span class=\"tr\"></span>";
       custHTML += "<div class=\"widgetonetblbox\">";
       custHTML += '<table summary="' + labelSelectedAccDetails + '" class=\"TBLlyt\" width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">';
       custHTML += '<tbody><tr>';
       custHTML += '<th WIDTH="40%" valign="top" scope="row" ><span class="SPNtext">' + labelLoanProduct + ': </span></th>';
       custHTML += '<td ><span class="SPNtext">' + accountData[14] + '</span></td>';
       custHTML += '</tr>';
       custHTML += '<tr>';
       custHTML += '<th  WIDTH="40%" valign="top" scope="row" ><span class="SPNtext">' + labelAccCcy + ': </span></th>';
       custHTML += '<td ><span class="SPNtext">' + accountData[12] + '</span></td>';
       custHTML += '</tr>';
       custHTML += '<tr>';
       custHTML += '<th WIDTH="40%"  valign="top" scope="row" ><span class="SPNtext">' + labelStatus + ': </span></th>';
       custHTML += '<td ><span class="SPNtext">' + accountData[8] + '</span></td>';
       custHTML += '</tr>';
       custHTML += '<tr>';
       custHTML += '<th WIDTH="40%"  valign="top" scope="row" ><span class="SPNtext">' + labelAmountFinanaced + ': </span></th>';
       custHTML += '<td><span class="SPNtext numeric" style="width:99%">' + accountData[9] + '</span></td>';
       custHTML += '</tr>';
       custHTML += '<tr>';
       custHTML += '<th WIDTH="40%" valign="top" scope="row" ><span class="SPNtext">' + labelAmountDisbursed + ': </span></th>';
       custHTML += '<td><span class="SPNtext numeric" style="width:99%">' + accountData[11] + '</span></td>';
       custHTML += '</tr>';
       custHTML += '<tr><th valign=\"top\" scope=\"row\"><span class=\"LBLinv\">Customer Session</span></th>';
       custHTML += '<td>';
   }
   else{
       var custHTML = '';
       custHTML += "<div class=\"widgetonecontainer\" id=\"widgetonecontainer3\" role=\"group\" aria-labelledby=\"widgetoneheading3\">";
       custHTML += '<h2 class=\"widgetoneheading\" id=\"widgetoneheading3\">Selected Account: <span>' + accountData[6] + ' (' + accountData[7] + ')' + '</span></h2>';
       custHTML += "<div class = \'csc\' id=\"csc\"><span class=\"tr\"></span>";
       custHTML += "<div class=\"widgetonetblbox\">";
       custHTML += '<table summary="' + labelSelectedAccDetails + '" class=\"TBLlyt\" width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">';
       custHTML += '<tbody><tr>';
       custHTML += '<th WIDTH="40%" valign="top" scope="row" ><span class="SPNtext">' + labelProduct + ': </span></th>';
       custHTML += '<td ><span class="SPNtext">' + accountData[14] + '</span></td>';
       custHTML += '</tr>';
       custHTML += '<tr>';
       custHTML += '<th  WIDTH="40%" valign="top" scope="row" ><span class="SPNtext">' + labelAccCcy + ': </span></th>';
       custHTML += '<td ><span class="SPNtext">' + accountData[12] + '</span></td>';
       custHTML += '</tr>';
       custHTML += '<tr>';
       custHTML += '<th WIDTH="40%"  valign="top" scope="row" ><span class="SPNtext">' + labelStatus + ': </span></th>';
       custHTML += '<td ><span class="SPNtext">' + accountData[8] + '</span></td>';
       custHTML += '</tr>';
       custHTML += '<tr>';
       custHTML += '<th WIDTH="40%"  valign="top" scope="row" ><span class="SPNtext">' + labelUncollectedFunds + ': </span></th>';
       custHTML += '<td><span class="SPNtext numeric" style="width:99%">' + accountData[9] + '</span></td>';
       custHTML += '</tr>';
       custHTML += '<tr>';
       custHTML += '<th WIDTH="40%" valign="top" scope="row" ><span class="SPNtext">' + labelCurrBalance + ': </span></th>';
       custHTML += '<td><span class="SPNtext numeric" style="width:99%">' + accountData[11] + '</span></td>';
       custHTML += '</tr>';
       custHTML += '<tr>';
       custHTML += '<th WIDTH="40%"  valign="top" scope="row" ><span class="SPNtext">' + labelAvailableBalance + ': </span></th>';
       custHTML += '<td><span class="SPNtext numeric" style="width:99%" >' + accountData[10] + '</span></td>';
       custHTML += '</tr>';
       custHTML += '<tr><th valign=\"top\" scope=\"row\"><span class=\"LBLinv\">Customer Session</span></th>';
       custHTML += '<td>';
   }
   if (mainWin.CustomerObj == null) {
        //SNORAS#000780 Starts
		customerInformationArray=fnEscape(customerInformationArray);
		accountInformationArray=fnEscape(accountInformationArray);
		//SNORAS#000780  Ends
        custHTML += '<button class="BTNimg" onblur="this.className=\'BTNimg\'" onmouseover="this.className=\'BTNimgH\'" onfocus="this.className=\'BTNimgH\'" onmouseout="this.className=\'BTNimg\'"id="CUSTSESSIONSTART" accesskey="O" onClick="fnStartCustomerSession(\'' + customerInformationArray + '\',\'' + accountInformationArray + '\');" title="' + mainWin.getItemDesc("LBL_START_CUST_SESSION") + '"><span tabindex="-1" id = "CustSessionIMG" class="ICOsessionstart"></span></button>';
        custHTML += '</td>';
        custHTML += '</tr>';
    } else {
        custHTML += '<button class="BTNimg" onblur="this.className=\'BTNimg\'" onmouseover="this.className=\'BTNimgH\'" onfocus="this.className=\'BTNimgH\'" onmouseout="this.className=\'BTNimg\'" id="CUSTSESSIONSTART" accesskey="O" onClick="fnEndCustomerSession();" title="' + mainWin.getItemDesc("LBL_END_CUST_SESSION") + '"><span tabindex="-1" id = "CustSessionIMG" class="ICOsessionend"></span></button>';
        custHTML += '<button class="BTNimg" onblur="this.className=\'BTNimg\'" onmouseover="this.className=\'BTNimgH\'" onfocus="this.className=\'BTNimgH\'" onmouseout="this.className=\'BTNimg\'" onClick="fnLoadActiveSession()" title="' + mainWin.getItemDesc("LBL_VIEW_ACTIVE_SESSION") + '"><span tabindex="-1" id = "CustSessionIMG" class="ICOsessionwho"></span></button>';
        custHTML += '</td>';
        custHTML += '</tr>';
    }
    custHTML += '</table></div><span class=\"bl\"></span> <span class=\"br\"></span></div></div>';
    var imageHTML = showAccountImage(accountData[6], accountData[7],accountInformationArray.split("~")[0]);
    var tblDiv = document.getElementById('DIVCustomerDetails');
    var divStr = tblDiv.innerHTML;
    tblDiv.innerHTML = divStr.substring(0, divStr.indexOf("<TR></TR>") + 4) + escape(imageHTML) + "</TR>" + divStr.substring(divStr.lastIndexOf("</TBODY>"), divStr.length);
}

function showAccountSearchInfo(customerInformationArray, accountInformationArray) {
    strImgInfo = "";
    strSigInfo = "";
    var labelSelectedAccDetails = mainWin.getItemDesc("LBL_SEL_ACC_DETAILS");
    var labelProduct = mainWin.getItemDesc("LBL_PRODUCT");
    var labelAccCcy = mainWin.getItemDesc("LBL_ACC_CCY");
    var labelStatus = mainWin.getItemDesc("LBL_STATUS");
    var labelUncollectedFunds = mainWin.getItemDesc("LBL_UNCOLLECTED_FUNDS");
    var labelCurrBalance = mainWin.getItemDesc("LBL_CURRENT_BAL");
    var labelAvailableBalance = mainWin.getItemDesc("LBL_AVAILABLE_BAL");
    /* FCUBS 11.0 Customer Search Changes starts here */
    var labelLoanProduct = mainWin.getItemDesc("LBL_LOAN_PRODUCT");
    var labelAmountFinanaced = mainWin.getItemDesc("LBL_AMOUNT_FINANCED");
    var labelAmountDisbursed = mainWin.getItemDesc("LBL_AMOUNT_DISBURSED");
    /* FCUBS 11.0 Customer Search Changes ends here */
    //SNORAS#000780 Starts
	customerInformationArray=fnUnEscape(customerInformationArray);
	accountInformationArray=fnUnEscape(accountInformationArray);
    //SNORAS#000780 Ends
    var accountData = accountInformationArray.split("~");
    var accountType = accountData[15]; //FCUBS 11.0 Customer Search
    // FC10.5 SFR 4356 STARTS
    var CurrBalanceAmount = new MB3Amount(accountData[11], true, accountData[12]);
    var UncollectedFundsAmount = new MB3Amount(accountData[9], true, accountData[12]);
    var AvailableBalanceAmount = new MB3Amount(accountData[10], true, accountData[12]);
    var totalAmountFinanced = new MB3Amount(accountData[9], true, accountData[12]);
    var totalAmountDisbursed = new MB3Amount(accountData[11], true, accountData[12]);
    if (CurrBalanceAmount.isValid()) {
        accountData[11] = CurrBalanceAmount.getInputAmount();
    }
    if (UncollectedFundsAmount.isValid()) {
        accountData[9] = UncollectedFundsAmount.getInputAmount();
    }
    if (AvailableBalanceAmount.isValid()) {
        accountData[10] = AvailableBalanceAmount.getInputAmount();
    }
    /*  FCUBS 11.0 Customer Search Changes starts here*/
    if (totalAmountFinanced.isValid()) {
        accountData[9] = totalAmountFinanced.getInputAmount();
    }
    if (totalAmountDisbursed.isValid()) {
        accountData[11] = totalAmountDisbursed.getInputAmount();
    }
   
   if (accountType == "L") {
       var custHTML = '';
       custHTML += "<div class=\"widgetonecontainer\" id=\"widgetonecontainer3\" role=\"group\" aria-labelledby=\"widgetoneheading3\">";
       custHTML += '<h2 class=\"widgetoneheading\" id=\"widgetoneheading3\">Selected Account: <span>' + accountData[6] + ' (' + accountData[7] + ')' + '</span></h2>';
       custHTML += "<div class = \'csc\' id=\"csc\"><span class=\"tr\"></span>";
       custHTML += "<div class=\"widgetonetblbox\">";
       custHTML += '<table summary="' + labelSelectedAccDetails + '" class=\"TBLlyt\" width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">';
       custHTML += '<tbody><tr>';
       custHTML += '<th WIDTH="40%" valign="top" scope="row" ><span class="SPNtext">' + labelLoanProduct + ': </span></th>';
       custHTML += '<td ><span class="SPNtext">' + accountData[14] + '</span></td>';
       custHTML += '</tr>';
       custHTML += '<tr>';
       custHTML += '<th  WIDTH="40%" valign="top" scope="row" ><span class="SPNtext">' + labelAccCcy + ': </span></th>';
       custHTML += '<td ><span class="SPNtext">' + accountData[12] + '</span></td>';
       custHTML += '</tr>';
       custHTML += '<tr>';
       custHTML += '<th WIDTH="40%"  valign="top" scope="row" ><span class="SPNtext">' + labelStatus + ': </span></th>';
       custHTML += '<td ><span class="SPNtext">' + accountData[8] + '</span></td>';
       custHTML += '</tr>';
       custHTML += '<tr>';
       custHTML += '<th WIDTH="40%"  valign="top" scope="row" ><span class="SPNtext">' + labelAmountFinanaced + ': </span></th>';
       custHTML += '<td><span class="SPNtext numeric" style="width:99%">' + accountData[9] + '</span></td>';
       custHTML += '</tr>';
       custHTML += '<tr>';
       custHTML += '<th WIDTH="40%" valign="top" scope="row" ><span class="SPNtext">' + labelAmountDisbursed + ': </span></th>';
       custHTML += '<td><span class="SPNtext numeric" style="width:99%">' + accountData[11] + '</span></td>';
       custHTML += '</tr>';
       custHTML += '<tr><th valign=\"top\" scope=\"row\"><span class=\"LBLinv\">Customer Session</span></th>';
       custHTML += '<td>';
   }
   else{
       var custHTML = '';
       custHTML += "<div class=\"widgetonecontainer\" id=\"widgetonecontainer3\" role=\"group\" aria-labelledby=\"widgetoneheading3\">";
       custHTML += '<h2 class=\"widgetoneheading\" id=\"widgetoneheading3\">Selected Account: <span>' + accountData[6] + ' (' + accountData[7] + ')' + '</span></h2>';
       custHTML += "<div class = \'csc\' id=\"csc\"><span class=\"tr\"></span>";
       custHTML += "<div class=\"widgetonetblbox\">";
       custHTML += '<table summary="' + labelSelectedAccDetails + '" class=\"TBLlyt\" width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">';
       custHTML += '<tbody><tr>';
       custHTML += '<th WIDTH="40%" valign="top" scope="row" ><span class="SPNtext">' + labelProduct + ': </span></th>';
       custHTML += '<td ><span class="SPNtext">' + accountData[14] + '</span></td>';
       custHTML += '</tr>';
       custHTML += '<tr>';
       custHTML += '<th  WIDTH="40%" valign="top" scope="row" ><span class="SPNtext">' + labelAccCcy + ': </span></th>';
       custHTML += '<td ><span class="SPNtext">' + accountData[12] + '</span></td>';
       custHTML += '</tr>';
       custHTML += '<tr>';
       custHTML += '<th WIDTH="40%"  valign="top" scope="row" ><span class="SPNtext">' + labelStatus + ': </span></th>';
       custHTML += '<td ><span class="SPNtext">' + accountData[8] + '</span></td>';
       custHTML += '</tr>';
       custHTML += '<tr>';
       custHTML += '<th WIDTH="40%"  valign="top" scope="row" ><span class="SPNtext">' + labelUncollectedFunds + ': </span></th>';
       custHTML += '<td><span class="SPNtext numeric" style="width:99%">' + accountData[9] + '</span></td>';
       custHTML += '</tr>';
       custHTML += '<tr>';
       custHTML += '<th WIDTH="40%" valign="top" scope="row" ><span class="SPNtext">' + labelCurrBalance + ': </span></th>';
       custHTML += '<td><span class="SPNtext numeric" style="width:99%">' + accountData[11] + '</span></td>';
       custHTML += '</tr>';
       custHTML += '<tr>';
       custHTML += '<th WIDTH="40%"  valign="top" scope="row" ><span class="SPNtext">' + labelAvailableBalance + ': </span></th>';
       custHTML += '<td><span class="SPNtext numeric" style="width:99%" >' + accountData[10] + '</span></td>';
       custHTML += '</tr>';
       custHTML += '<tr><th valign=\"top\" scope=\"row\"><span class=\"LBLinv\">Customer Session</span></th>';
       custHTML += '<td>';
   }
   if (mainWin.CustomerObj == null) {
        //SNORAS#000780 Starts
		customerInformationArray=fnEscape(customerInformationArray);
		accountInformationArray=fnEscape(accountInformationArray);
		//SNORAS#000780  Ends
        custHTML += '<button class="BTNimg" onblur="this.className=\'BTNimg\'" onmouseover="this.className=\'BTNimgH\'" onfocus="this.className=\'BTNimgH\'" onmouseout="this.className=\'BTNimg\'"id="CUSTSESSIONSTART" accesskey="O" onClick="fnStartCustomerSession(\'' + customerInformationArray + '\',\'' + accountInformationArray + '\');" title="' + mainWin.getItemDesc("LBL_START_CUST_SESSION") + '"><span tabindex="-1" id = "CustSessionIMG" class="ICOsessionstart"></span></button>';
        custHTML += '</td>';
        custHTML += '</tr>';
    } else {
        custHTML += '<button class="BTNimg" onblur="this.className=\'BTNimg\'" onmouseover="this.className=\'BTNimgH\'" onfocus="this.className=\'BTNimgH\'" onmouseout="this.className=\'BTNimg\'" id="CUSTSESSIONSTART" accesskey="O" onClick="fnEndCustomerSession();" title="' + mainWin.getItemDesc("LBL_END_CUST_SESSION") + '"><span tabindex="-1" id = "CustSessionIMG" class="ICOsessionend"></span></button>';
        custHTML += '<button class="BTNimg" onblur="this.className=\'BTNimg\'" onmouseover="this.className=\'BTNimgH\'" onfocus="this.className=\'BTNimgH\'" onmouseout="this.className=\'BTNimg\'" onClick="fnLoadActiveSession()" title="' + mainWin.getItemDesc("LBL_VIEW_ACTIVE_SESSION") + '"><span tabindex="-1" id = "CustSessionIMG" class="ICOsessionwho"></span></button>';
        custHTML += '</td>';
        custHTML += '</tr>';
    }
    custHTML += '</table></div><span class=\"bl\"></span> <span class=\"br\"></span></div></div>';
    
    document.getElementById('dashtable').tBodies[0].rows[0].cells[1].innerHTML = '';
    document.getElementById('dashtable').tBodies[0].rows[0].cells[1].innerHTML = custHTML;   
    
    if(document.getElementById('dashtable').tBodies[0].rows[1].cells[1]){
        document.getElementById('dashtable').tBodies[0].rows[1].cells[1].innerHTML ='';
        document.getElementById('dashtable').tBodies[0].rows[1].removeChild(document.getElementById('dashtable').tBodies[0].rows[1].cells[1]);
    }
    
    if(document.getElementById('dashtable').tBodies[0].rows[1].cells[0]){
        document.getElementById('dashtable').tBodies[0].rows[1].cells[0].innerHTML ='';
        document.getElementById('dashtable').tBodies[0].rows[1].removeChild(document.getElementById('dashtable').tBodies[0].rows[1].cells[0]);
    }
    
    
    var imageHTML = showAccountImage(accountData[6], accountData[7],accountInformationArray.split("~")[0]);
    var tblDiv = document.getElementById('DIVCustomerDetails');
    var divStr = tblDiv.innerHTML;
    tblDiv.innerHTML = divStr.substring(0, divStr.indexOf("<TR></TR>") + 4) + escape(imageHTML) + "</TR>" + divStr.substring(divStr.lastIndexOf("</TBODY>"), divStr.length);
    //document.getElementById('dashtable').tBodies[0].rows[1].innerHTML = '';
    //document.getElementById('dashtable').tBodies[0].rows[1].innerHTML = imageHTML;   
}

/*
 * Customer Query Related Functions
 *
 */

function showAccountImage(accountNumber, branchCode,cifId) {

    var request = '';
    //var sequenceNum = getSeqNo(); 
    var server = serverURL + "?funcid=" + func + "&msgType=IMAGE&actionType=acctQuery&actNo=" + accountNumber + "&branchCode=" + branchCode + "&XREF=" + xref + "&langCode=" + mainWin.LangCode+"&cifId="+cifId;
    objHTTP.open("POST", server, false); // Open the Connection to the Server
    objHTTP.setRequestHeader("Content-Type", "application/xml");
    objHTTP.setRequestHeader("charset", "utf-8");
    objHTTP.setRequestHeader("X-CSRFTOKEN", mainWin.CSRFtoken);
    //objHTTP.setRequestHeader("SEQNO",sequenceNum);
	try{//9NT1606_12_2_RETRO_12_0_3_21182929 changes 
    objHTTP.send(request);
	} //9NT1606_12_2_RETRO_12_0_3_21182929 changes start 
     catch(exp){
          mainWin.handleNetWorkErr(exp);
        } //9NT1606_12_2_RETRO_12_0_3_21182929 changes end
    if (objHTTP.status != 200) {
        alert(mainWin.getItemDesc("LBL_QRY_FAILED_NOT_GET_SIGN"));
    }
    if (objHTTP.responseText == timeout_responseXML) {
        openTimeOutPage();
        return '';
    } else if (selectSingleNode(objHTTP.responseXML, "//SESSION") != null && getNodeText(selectSingleNode(objHTTP.responseXML, "//SESSION")) == "EXPIRED") {//session expiry change  start
        mainWin.mask(); 
        mainWin.sessionTimeOut = true;
        mainWin.showAlerts(fnBuildAlertXML("", "I", mainWin.getItemDesc("LBL_SESSION_EXPIRED")), "S");
        return false;
    } //session expiry change  end
    else {
        mainWin.inactiveTime = 0;
        return objHTTP.responseText;
    }

}

function changeImages() {
    var imageNames = document.getElementById('signatory').value.split("!");
    var pImages = imageNames[0].split("~");
    var sImages = imageNames[1].split("~");
    if (pImages[0] == ""){
        document.getElementById('CustPic').src = 'Images/NoPhoto.gif';
    }else{ 
        //document.getElementById('CustPic').src = 'Images/Signature/' + pImages[0];
        document.getElementById('CustPic').src = "\TempForward.jsp?action=FCUBSSignatureServlet&actionType=READ&fileName="+ pImages[0];
    }
    document.getElementById('CustSign').src = 'Images/Signature/' + sImages[0];
}

function fnStartCustomerSessionAction() {
    accountObject = new Object();
    customerObject = new Object();
    //accountObject = mainWin.setAccountDetails(accountNumber);
    accountObject = mainWin.setAccountDetails(mainWin.accDataArray[0]);
    //customerObject = mainWin.getCustomer(mainWin.custData[0], mainWin.custData[2], mainWin.custData[3], branchCode); //FCUBS 10.5 WebBranch Changes
    customerObject = mainWin.getCustomer(mainWin.custData[0], mainWin.custData[1], mainWin.custData[2], mainWin.brnCode);	//Fix for 18556668 replaced mainWin.accountData[1] with mainWin.brnCode as mainWin.accountData[1] is null
    if (mainWin.CustomerObj == null) {
        mainWin.CustomerObj = customerObject;
        alert(mainWin.getItemDesc("LBL_CUST_SESSION_OPENED_AC") + ":" + mainWin.accDataArray[0] + ", " + mainWin.getItemDesc("LBL_CUST_NO") + ": " + mainWin.custData[0].split("~")[0]);
        setInnerText(document.getElementById('BLK_B1__PRODUCT_LIST'), 'End');
        document.getElementById("BLK_B1__PRODUCT_LIST").onclick = fnEndCustomerSessionAction;
        //fnSaveActiveSession();
    } else {
        alert(mainWin.getItemDesc("LBL_END_PREV_CUST_SESSION"));
        return;
    }
}

/*function fnStartCustomerSession(customerInformationArray, accountInformationArray) {
    //SNORAS#000780 starts
	customerInformationArray=fnUnEscape(customerInformationArray);
	accountInformationArray=fnUnEscape(accountInformationArray);
    //SNORAS#000780 Ends
    accountData = accountInformationArray.split("~");
    customerData = customerInformationArray.split("~");
    branchCode = accountData[7];
    accountNumber = accountData[6];
    if (mainWin.CustomerObj != null) {
        alert(mainWin.getItemDesc("LBL_END_PREV_CUST_SESSION"));
        return;
    }
    mask();
    alertAction = "SETCUSTDETAILS";
    showBranchAlerts(fnBuildAlertXML("", "C", mainWin.getItemDesc("LBL_SET_ACNO_CUST_DETAILS")), "C");
    return;
}*/

function fnStartCustomerSession() {
    if (mainWin.CustomerObj != null) {
        alert(mainWin.getItemDesc("LBL_END_PREV_CUST_SESSION"));
        return;
    }
    mask();
    alertAction = "SETCUSTDETAILS";
    showBranchAlerts(fnBuildAlertXML("", "C", mainWin.getItemDesc("LBL_SET_ACNO_CUST_DETAILS")), "C");
    return;
}
// For saving Active Customer Session Details (for subsequent Viewing and Ending Session)

function fnSaveActiveSession() {
    SessionDetails = document.getElementById('CUSTDETAILS').innerHTML;
}
// For Loading Active Customer Session Details (for Ending Session)

function fnLoadActiveSession() {
    document.getElementById('CUSTDETAILS').innerHTML = SessionDetails;
    document.getElementById("CUSTSESSIONSTART").onclick = fnEndCustomerSession;
}
// For ending Customer Session

function fnEndCustomerSession() {  
    if (mainWin.CustomerObj != null) {
        if (mainWin.accountNumber != null) {
            parent.mask();
            parent.alertAction = "ENDCUSTSESSION";
            parent.showBranchAlerts(fnBuildAlertXML("", "C", mainWin.getItemDesc("LBL_END_SESSION_ACC")), "C");
            return;
        }
    } else {
        alert(mainWin.getItemDesc("LBL_NO_ACTIVE_CUST_SESSIONS"));
    }
}

function fnEndCustomerSessionAction() {   
    if (mainWin.mainWin.accDataArray[0] != null) {
        alert(mainWin.getItemDesc("LBL_CUST_SESSION_ENDED_AC") + ":" + mainWin.accDataArray[0] + ", " + mainWin.getItemDesc("LBL_CUST_NO") + ": " + mainWin.custData[0].split("~")[0]);
        mainWin.mainWin.accDataArray[0] = null;
        //document.getElementById("DivAccountDetails").innerHTML = '';
        //document.getElementById("SignatoryDetailsDiv").innerHTML = '';
    }
    mainWin.CustomerObj = null;
    setInnerText(document.getElementById('BLK_B1__PRODUCT_LIST'), 'Start');
    document.getElementById("BLK_B1__PRODUCT_LIST").onclick = fnStartCustomerSessionAction;
    //fnSaveActiveSession();
}

function getNextSignature(event, strData) {
    var e = window.event || event;
    var srcElem = getEventSourceElement(e)
    var buttonId = srcElem.id;
    var currentDisplayedTab = buttonId.substring(8, buttonId.length);
    if (typeof(strData) == "undefined")
        return;
    if (strSigInfo != "")
        strData = strSigInfo;
    var imageValue = document.getElementById("SIGNATURE"+currentDisplayedTab).value;
    var  nextImageData="";
    if(imageValue.indexOf(strData)!= -1){
        var imgArr = imageValue.split("~");
        for (var i=0;i<imgArr.length;i++) {
            if (imgArr[i] == strData && typeof(imgArr[i+1]) != "undefined") {
                nextImageData = imgArr[i+1];
                strSigInfo = imgArr[i+1];
                break;
            }
        }
    }
    fnPostCustSignDisplay(i+2, currentDisplayedTab);
    var  dataArray=nextImageData.split("##");
    if (nextImageData != "") {   
        /*document.getElementById('signatory1').options[0].value = dataArray[4];
        document.getElementById('signatory1').selectedIndex = 0;*/
        document.getElementById('signName'+currentDisplayedTab).value = dataArray[4];
        document.getElementById('CustSign'+currentDisplayedTab).src = "TempForward.jsp?action=CustomerImageReaderServlet&actionType=READ&cifId="+dataArray[0]+"&fileName="+ dataArray[1]+"&cifSigId="+dataArray[2]+"&specimenNo="+dataArray[3]+"&sigType=S";
    }else {
        return;
        //document.getElementById("CustSign").src = 'Images/Photo/NoPhoto.gif';
    }
}

function getPrevSignature(event, strData) {
    var e = window.event || event;
    var srcElem = getEventSourceElement(e)
     var buttonId = srcElem.id;
    var currentDisplayedTab = buttonId.substring(8, buttonId.length);
    if (typeof(strData) == "undefined")
        return;
    if (strSigInfo != "")
        strData = strSigInfo;
    var imageValue = document.getElementById("SIGNATURE"+currentDisplayedTab).value;
    var  prevImageData="";    
    if(imageValue.indexOf(strData)!= -1){
        var imgArr = imageValue.split("~");
        for (var i=0;i<imgArr.length;i++) {
            if (imgArr[i] == strData && typeof(imgArr[i-1]) != "undefined") {
                prevImageData = imgArr[i-1];
                strSigInfo = imgArr[i-1];
                break;
            }
        }
    }
    fnPostCustSignDisplay(i, currentDisplayedTab);
    var  dataArray=prevImageData.split("##");
    if (prevImageData != "") {  
        /*document.getElementById('signatory1').options[0].value = dataArray[4];
        document.getElementById('signatory1').selectedIndex = 0;*/
        document.getElementById('signName'+currentDisplayedTab).value = dataArray[4];
        document.getElementById('CustSign'+currentDisplayedTab).src = "TempForward.jsp?action=CustomerImageReaderServlet&actionType=READ&cifId="+dataArray[0]+"&fileName="+ dataArray[1]+"&cifSigId="+dataArray[2]+"&specimenNo="+dataArray[3]+"&sigType=S";
    }else 
        return;
        //document.getElementById("CustSign").src = 'Images/Photo/NoPhoto.gif';


}
function getNextPhoto(event, strData) {
    var e = window.event || event;
    var srcElem = getEventSourceElement(e)
     var buttonId = srcElem.id;
    var currentDisplayedTab = buttonId.substring(8, buttonId.length);
    if (typeof(strData) == "undefined")
        return;
    if (strImgInfo != "")
        strData = strImgInfo;
    var imageValue = document.getElementById("PHOTOS"+currentDisplayedTab).value;
    var  nextImageData="";
    if(imageValue.indexOf(strData)!= -1){
        var imgArr = imageValue.split("~");
        for (var i=0;i<imgArr.length;i++) {
            if (imgArr[i] == strData && typeof(imgArr[i+1]) != "undefined") {
                nextImageData = imgArr[i+1];
                strImgInfo = imgArr[i+1];
                break;
            }
        }
    }
    fnPostCustImageDisplay(i+2, currentDisplayedTab);
    var  dataArray=nextImageData.split("##");
    if (nextImageData != "") { 
        /*document.getElementById('signatory').options[0].value = dataArray[4];
        document.getElementById('signatory').selectedIndex = 0;*/
        document.getElementById('imageName'+currentDisplayedTab).value = dataArray[4];
        document.getElementById('CustPic'+currentDisplayedTab).src = "TempForward.jsp?action=CustomerImageReaderServlet&actionType=READ&cifId="+dataArray[0]+"&fileName="+ dataArray[1]+"&cifSigId="+dataArray[2]+"&specimenNo="+dataArray[3]+"&sigType=P";
    }else 
         return;
        //document.getElementById("CustPic").src = 'Images/Photo/NoPhoto.gif';

}

function getPrevPhoto(event, strData) {
    var e = window.event || event;
    var srcElem = getEventSourceElement(e)
     var buttonId = srcElem.id;
    var currentDisplayedTab = buttonId.substring(8, buttonId.length);
    if (typeof(strData) == "undefined")
        return;
    if (strImgInfo != "")
        strData = strImgInfo;
    var imageValue = document.getElementById("PHOTOS"+currentDisplayedTab).value;
    var  prevImageData="";    
    if(imageValue.indexOf(strData)!= -1){
        var imgArr = imageValue.split("~");
       for (var i=0;i<imgArr.length;i++) {
            if (imgArr[i] == strData && typeof(imgArr[i-1]) != "undefined") {
                prevImageData = imgArr[i-1];
                strImgInfo = imgArr[i-1];
                break;
            }
        }
    }
    fnPostCustImageDisplay(i, currentDisplayedTab);
    var  dataArray=prevImageData.split("##");
    if (prevImageData != "") {     
        /*document.getElementById('signatory').options[0].value = dataArray[4];
        document.getElementById('signatory').selectedIndex = 0;*/
        document.getElementById('imageName'+currentDisplayedTab).value = dataArray[4];
        document.getElementById('CustPic'+currentDisplayedTab).src = "TempForward.jsp?action=CustomerImageReaderServlet&actionType=READ&cifId="+dataArray[0]+"&fileName="+ dataArray[1]+"&cifSigId="+dataArray[2]+"&specimenNo="+dataArray[3]+"&sigType=P";
    }else 
         return;

}
function openTimeOutPage() {
    mainWin.openTimeOutPage();
}
//trim the last ~, if the data endswith ~.


function trimTildaAtEnd(data) {
    if (data.substring(data.length, data.length - 1) == '~') {
        data = data.substring(0, data.length - 1);
    }
    return data;
}

function trimTildataAtFront(data) {
   
    if (typeof(data)!='undefined' && data != "" && data.substring(0, 1) == '!') {
        data = data.substring(1, data.length);
    }
    return data;
    
}

function handleCustQueryKeyDownEvents(evnt) {
	var e = window.event || evnt;
	var srcEle = getEventSourceElement(e);
	if (e.keyCode == 9) {//tab keyd
	if(srcEle.id == 'btnCustomerReset'){
		if((document.getElementById("CustQueryResults")) &&  (document.getElementById("CustQueryResults").getElementsByTagName("A")[0])){
			setTimeout(function(){document.getElementById("CustQueryResults").getElementsByTagName("A")[0].focus();},0);			
		}
		else{
			document.getElementById("hTab_DBoardCustomer").getElementsByTagName("A")[0].focus();
		}
		preventpropagate(e);
		return false;
	}
	else if((srcEle.parentNode.parentNode.parentNode.parentNode.id == "CustQueryResults") && (document.getElementById("CustomerRecordsTable")) && (document.getElementById("CustomerRecordsTable").getElementsByTagName("A")[0])){
		setTimeout(function(){document.getElementById("CustomerRecordsTable").getElementsByTagName("A")[0].focus();},0);
		preventpropagate(e);
		return false;
         }
        else if(srcEle.id == 'btnCustomerSearch'){
		document.getElementById("btnCustomerReset").focus();
		preventpropagate(e);
		return false;
	}
	else {
		document.getElementById("hTab_DBoardCustomer").getElementsByTagName("A")[0].focus();
		preventpropagate(e);
		return false;
	}
	preventpropagate(e);
	return false;
	} 
	else if (e.keyCode == 37) {//left arrow
		if(srcEle.tagName.toUpperCase() != "TD") {
			srcEle = srcEle.parentNode;
		}
		if (getToolBarPreviousSibling(srcEle) && getToolBarPreviousSibling(srcEle).tagName.toUpperCase() == "TD") {	
			if(getToolBarPreviousSibling(srcEle).childNodes[0]){
				getToolBarPreviousSibling(srcEle).childNodes[0].focus();
			}
		}
		preventpropagate(e);
		return false
	} 
	else if (e.keyCode == 39) {//right arrow
		if (srcEle.tagName.toUpperCase() != "TD") {
			srcEle = srcEle.parentNode;
		}
		if (getToolBarNextSibling(srcEle) && getToolBarNextSibling(srcEle).tagName.toUpperCase() == "TD") {
		    if(getToolBarNextSibling(srcEle).childNodes[0]){
				getToolBarNextSibling(srcEle).childNodes[0].focus();
			}		
		}
		preventpropagate(e);
		return false
	} 
	else if (e.keyCode == 38) {//up arrow
		if (srcEle.tagName.toUpperCase() != 'TD') {
		srcEle = srcEle.parentNode;
		}
		if (srcEle.parentNode.tagName.toUpperCase() == "TR" && (getToolBarPreviousSibling(srcEle.parentNode) && getToolBarPreviousSibling(srcEle.parentNode).children[0].tagName.toUpperCase() == "TD")) {
			if (getToolBarNextSibling(srcEle)) {
				getToolBarPreviousSibling(srcEle.parentNode).getElementsByTagName("A")[0].focus();
			} else {
				getToolBarPreviousSibling(srcEle.parentNode).getElementsByTagName("SPAN")[0].focus();
			}
		}
		preventpropagate(e);
		return false
	} 
	else if (e.keyCode == 40) {//down arrow
		if (srcEle.tagName.toUpperCase() != 'TD') {
			srcEle = srcEle.parentNode;
		}
		if (srcEle.parentNode.tagName.toUpperCase() == "TR" && getNextSibling(srcEle.parentNode)) {
			if (getToolBarNextSibling(srcEle)) {
				getToolBarNextSibling(srcEle.parentNode).getElementsByTagName("A")[0].focus();
			} 
			else {
				getToolBarNextSibling(srcEle.parentNode).getElementsByTagName("SPAN")[0].focus();
			}
		}
		preventpropagate(e);
		return false
	} 
	else if (e.keyCode == 13) {//enter key
		//if (srcEle.tagName.toUpperCase() != "A" && srcEle.tagName.toUpperCase() != "SPAN") {
		if(srcEle.id != "btnCustomerReset"){
		if (srcEle.tagName.toUpperCase() != "TD" ) {
			srcEle = srcEle.parentNode.parentNode.getElementsByTagName("A")[0];
		}
		else{
			srcEle = srcEle.parentNode.getElementsByTagName("A")[0];
		}
		}
		if (srcEle.tagName.toUpperCase() == "A" || srcEle.tagName.toUpperCase() == 'BUTTON'){
			setTimeout(function(){srcEle.focus();},0);
			if(getIEVersionNumber() > 0)
				fireHTMLEvent(srcEle,"onclick");
			else {
				var fnEval = new Function("event",srcEle.getAttribute("onclick"));  
				fnEval(e);
			}
		}
		
		preventpropagate(e);
		return false
	}//Customer Accessibilty start
        else if (e.ctrlKey == true && e.shiftKey == true && e.keyCode == 33) {
            mainWin.fnNavigateTabsCust('backward', tab_arr, tab_ids);
            fnDisableBrowserKey(e);
            return false;
        }else if (e.ctrlKey == true && e.shiftKey == true && e.keyCode == 34) {
            mainWin.fnNavigateTabsCust('forward', tab_arr, tab_ids);
            fnDisableBrowserKey(e);
            return false;
        }//Customer Accessibilty end
	else if(e.ctrlKey == true && e.keyCode == 33) {
		if( getToolBarPreviousSibling(document.getElementById("DBoardCustomer").parentNode)){
			var prevElem = getToolBarPreviousSibling(document.getElementById("DBoardCustomer").parentNode).getElementsByTagName("A")[0];
			prevElem.focus();
			if(getIEVersionNumber() > 0)
				fireHTMLEvent(prevElem,"onclick");
			else {
				var fnEval = new Function("event",prevElem.getAttribute("onclick"));  
				fnEval(e);
			}
            }
		preventpropagate(e);
		return false
	}
	else if(e.ctrlKey == true && e.keyCode == 34) {
		if( getToolBarNextSibling(document.getElementById("DBoardCustomer").parentNode)){
			var nextElem = getToolBarNextSibling(document.getElementById("DBoardCustomer").parentNode).getElementsByTagName("A")[0];
			nextElem.focus();
			if(getIEVersionNumber() > 0)
				fireHTMLEvent(nextElem,"onclick");
			else {
				var fnEval = new Function("event",nextElem.getAttribute("onclick"));  
				fnEval(e);
			}
		}
		preventpropagate(e);
		return false
	}
	else if(e.keyCode == 33){//page up
		if((document.getElementById("btnDivCust").style.visibility != "hidden") && (document.getElementById("custTabBtnPrev1").disabled == false)){
			document.getElementById("DIVcaptionSR1").focus();
			fireHTMLEvent(document.getElementById("custTabBtnPrev1"), "onclick");
		}
	preventpropagate(e);
	return false
	}
    else if(evnt.keyCode == 34){//page down
		if((document.getElementById("btnDivCust").style.visibility != "hidden") && (document.getElementById("custTabBtnNext1").disabled == false)){
			document.getElementById("DIVcaptionSR1").focus();
			fireHTMLEvent(document.getElementById("custTabBtnNext1"), "onclick");
		}
	preventpropagate(e);
	return false
	} 
}

function handleCustRecKeyDownEvents(evnt) {
    var e = window.event || evnt;
    var srcEle = getEventSourceElement(e);
    if (e.keyCode == 37 || e.keyCode == 39 || e.keyCode == 38 || e.keyCode == 40 || e.keyCode == 9) {
		handleCustQueryKeyDownEvents(e);
		preventpropagate(e);
        return false;
    } else if (e.keyCode == 13) {
        if (srcEle.tagName.toUpperCase() != "A" && srcEle.tagName.toUpperCase() != "SPAN") {
            srcEle = srcEle.children[0];
        }
        if (srcEle.tagName.toUpperCase() == "A"){
            if(getIEVersionNumber() > 0)
                fireHTMLEvent(srcEle,"onclick");
            else
               { 
                var fnEval = new Function("e",srcEle.getAttribute("onclick"));  
                fnEval(e);
                }
        }
    }
     else if(e.keyCode == 33){//page up
      if((document.getElementById("btnDivAcc").style.visibility != "hidden") && (document.getElementById("custTabBtnPrev2").disabled == false))
        document.getElementById("DIVcaptionSR2").focus();
        if(getIEVersionNumber() > 0)
                fireHTMLEvent(document.getElementById("custTabBtnPrev2"),"onclick");
            else
               {   
                var fnEval = new Function("event", document.getElementById("custTabBtnPrev2").getAttribute("onclick"));  
                fnEval(e);
                }
    }
    else if(evnt.keyCode == 34){//page down
    if((document.getElementById("btnDivAcc").style.visibility != "hidden") && (document.getElementById("custTabBtnNext2").disabled == false))
       document.getElementById("DIVcaptionSR2").focus();
        if(getIEVersionNumber() > 0)
                fireHTMLEvent(document.getElementById("custTabBtnNext2"),"onclick");
            else
               {   
                var fnEval = new Function("event", document.getElementById("custTabBtnNext2").getAttribute("onclick"));  
                fnEval(e);
                }
        
    }
    preventpropagate(e);
    return false;
}

function showCustAccDetails(customerNo, accountNo, branchCode, accountType, e,isActive){//19198882
//inDate = setActionTime();
var joint_type ="";
if(typeof(isActive)=='undefined') //19198882
    isActive = "";//19198882
//12.1 Dashboard changes --start
if(typeof(e) != 'undefined'){
    var event = window.event || e;
    var eventElem = getEventSourceElement(event);
    var custacLinks = getCustacLinks();
    if(eventElem.tagName== "A"){
    highlightCustac(eventElem,custacLinks);
    }
   } 
   if (document.getElementById(customerNo + "_" + accountNo)){
   
   fnToggleDisplay(document.getElementById(customerNo + "_" + accountNo).parentNode.id);
   return ; 
   
   }
//12.1 Dashboard changes --end
    fnCustAccountDetailsPost(customerNo, accountNo, branchCode, accountType,isActive); //19198882
    brnCode = branchCode;
    if (objHTTP.status == 200) {
        if(getBrowser().indexOf("IE") != -1)//ie11 changes
        dataDOM.setProperty("SelectionNamespaces", ns);
        var data = getNodeText(selectSingleNode(dataDOM, "//FCUBS_RES_ENV"));
        data = trimTildaAtEnd(data);
        data = data.substring(0, data.lastIndexOf("!"));
		//Fix for 19274411
		var reg1 = new RegExp('&amp;', "g");
        data = data.replace(reg1, "&");
        var dataarray = data.split("~");
    }
    accountNumber = dataarray[11];
    var custAddress = new Array;
    if (dataarray[3]){
        //Fix for 17873619
        //custAddress = dataarray[3].split('@');
        custAddress = dataarray[3].split('#ADD#');
        if(custAddress[1] == undefined) custAddress[1] = "";//Fix for 17772239  
    }
    //var custAddress1 = custAddress[0] +","+ custAddress[1];
    //var custAddress2 = custAddress[2] +","+ custAddress[3];
    //Fix for 16950478 added uniqueid and unique name & 17873619
	 // fix for bug: 19060316 starts 	
	var customerDetails = "";
    if(mainWin.applicationExt == "JP")
        customerDetails = dataarray[0] +"~"+ dataarray[2] +"~"+ dataarray[4]+"~"+dataarray[24] +"~"+ custAddress[0] +"~"+ dataarray[25]+"~"+dataarray[5] +"~"+ dataarray[6] +"~"+ dataarray[7] +"~"+ dataarray[8]+"~"+ dataarray[21]+"~"+ dataarray[10];
	 // fix for bug: 19060316 starts     
	else    
 		customerDetails = dataarray[0] +"~"+ dataarray[2] +"~"+ dataarray[4] +"~"+ custAddress[0] +"~"+custAddress[1] +"~"+custAddress[2] +"~"+custAddress[3] +"~"+ dataarray[5] +"~"+ dataarray[6] +"~"+ dataarray[7] +"~"+ dataarray[8]+"~"+ dataarray[21]+"~"+ dataarray[10];
    //var customerDetails = dataarray[0] +"~"+ dataarray[2] +"~"+ dataarray[4] +"~"+ custAddress[0] +"~"+ custAddress[1] +"~"+ dataarray[5] +"~"+ dataarray[6] +"~"+ dataarray[7] +"~"+ dataarray[8]+"~"+ dataarray[21] +"~"+ dataarray[10];
    custData = customerDetails.split("~");  
  //  var labelJointType = mainWin.getItemDesc("LBL_JOINT_TYPE_"+dataarray[43]);
  //Fix for 17169292 
    if(dataarray[20]=='J' && (accountType == 'J') )//Fixes for 16929551
    {
    joint_type = mainWin.getItemDesc("LBL_JOINT_TYPE_" + dataarray[21]);
   
    }
    else if (dataarray[20]=='J' && (accountType == 'A'))
    {
       joint_type = mainWin.getItemDesc("LBL_PRIMARY_CUSTOMER");
    }
    else
	{
		joint_type = mainWin.getItemDesc("LBL_SOLE_OWNER");
    }
    //Fix for 17065640 end\
    //Fix for 16950478 ADDED AL_AC_NO FIELD 
     // fix for bug: 19060316 starts 
	var accountDetails = "";
    if(mainWin.applicationExt == "JP")
        accountDetails = dataarray[11] +"~"+ dataarray[20] +"~"+ dataarray[17] +"~"+ dataarray[13] +"~"+ dataarray[16] +"~"+ dataarray[15]+"~"+ dataarray[22]+"~"+dataarray[23]+"~"+joint_type; //Fix for 19233673,19489517
	 // fix for bug: 19060316 ends     
	else accountDetails = dataarray[11] +"~"+ dataarray[20] +"~"+ dataarray[17] +"~"+ dataarray[13] +"~"+ dataarray[16] +"~"+ dataarray[15]+"~"+ dataarray[22]+"~"+joint_type; //Fix for 19233673,19489517
    
    accDataArray = accountDetails.split("~");
    dashboardParams = new Object();
    dashboardParams.accPkVals = branchCode + "~" + accountNo;
    dashboardParams.custno = customerNo;
	 //12.1 Dashboard changes --start
  

     //document.getElementById('DIVTabContentDBoardCustomer'+pos).style.display = 'block';
  // document.getElementById("searchResultDiv").style.display = "none";
    //  document.getElementById("SearchBarDisplayDiv").style.display = "block";
   
    
    //document.getElementById("dashboardTabDBoardCustomer").innerHTML = "A/C No. "+accountNo;
    if(document.getElementById('hTab_DBoardCustomer').getElementsByTagName("A").length > 1){
      curPage++;
    }
    gCustDataArr["CustomerAccTab" + curPage] = custData;
    gAccDataArr["CustomerAccTab" + curPage] = accDataArray;
    
    var liElem =  document.createElement("LI");
    var anchorElem = document.createElement("a");
    anchorElem.id = "CustomerAccTab" + curPage;
    addEvent(anchorElem, "onclick", "fnToggleDisplay('CustomerAccTab"+ curPage +"')");
       anchorElem.tabIndex = '0';
         addEvent(anchorElem, "onkeydown", "return handleTabKeys(this,event)");
       
    
   // anchorElem.onclick = function(){
      //fnToggleDisplay(this.id);
   //};
   // anchorElem.setAttribute("onclick", "fnToggleDisplay('CustomerAccTab"+ curPage +"')");
    var spanElem = document.createElement("span");
    spanElem.className  = "DBoardHeadDivSpanSel";
    spanElem.id =  customerNo + "_" + accountNo;
    //Prevent propogate
    //Added close button image
    //1202 nls
    spanElem.innerHTML = mainWin.getItemDesc("LBL_CUSTTAB_ACC_NO")+ "&nbsp;" + accountNo +  "<span class=\"DBoardHeadClose\" onclick=\"closeCurrentTab(this.parentNode.parentNode,event)\"><span class=\"tabClosedGIF\"></span></span>";
    // var closeButtonHTML = "<div class=\"WNDbuttons\" style=\"height:auto;margin-left:3px;\">"
    //closeButtonHTML += "<a onkeydown=\"closeCurrentTab(this.parentNode.parentNode)\" onclick=\"if(this.disabled) return false; closeCurrentTab(this.parentNode.parentNode)\" title=\"Close\"  href=\"#\" id=\"WNDbuttons\" class=\"WNDclsH\" style=\"height:15px;\">";
    //closeButtonHTML += "<span class=\"LBLinv\">Close</span>";
    //closeButtonHTML += "</a></div>";
    //spanElem.innerHTML  = accountNo + closeButtonHTML;
    anchorElem.appendChild(spanElem);
    liElem.appendChild(anchorElem);
    document.getElementById('CustomerSearch').getElementsByTagName("SPAN")[0].className = 'DBoardHeadDivSpanDeSel';
    document.getElementById('hTab_DBoardCustomer').getElementsByTagName("UL")[0].appendChild(liElem);
    anchorElem.focus();
    var dboardDiv = document.createElement("DIV");
    dboardDiv.id = "ContentCustomerAccTab" + curPage;
    dboardDiv.style.height =document.getElementById('vTabDB_DASHBOARD').offsetHeight - (document.getElementById('hTab_DBoardCustomer').offsetHeight +4) + "px";
    dboardDiv.innerHTML = "<a id=\"href" + anchorElem.id + "\" ></a>"

    document.getElementById('hTabCN_Customer').appendChild(dboardDiv);
    document.getElementById('ContentCustomerSearch').style.display = 'none';
    fnShowDboardFuncs(custDBoardArray, "ContentCustomerAccTab");
  
   
   // }
   // else{
      // document.getElementById('DIVTabContentDBoardCustomer'+pos).style.display = 'block';
       // fnRefreshDashBoardData1(event);
   // }
    
     // fntableshowhide() ;
  //   document.getElementById('DIVTabContentDBoardCustomer'+pos).style.height = document.getElementById('vTabDB_DASHBOARD').offsetHeight - 
      //  (document.getElementById('CUSTSEARCHBAR').offsetHeight + 2) + 'px'
   //   document.getElementById('DIVTabContentDBoardCustomer'+pos).style.overflow = 'auto';
     functionId = "COMMON";
     //fnpostAction('ACCOUNTDETAIL',dataDOM);
     dispCustImageDB();
     
     //document.getElementById('DIVTabContentDBoardCustomer'+pos).style.visibility = "visible";
     //12.1 Dashboard changes --end
}

function fnCustAccountDetailsPost(customerNo, accountNo, branchCode, accountType,isActive) {//19198882

    var msgType = "NONWORKFLOW";
    var actionType = "CustAccDetails";
/* security fixes for WF starts */
    customerNo=replaceChar(customerNo);
    branchCode=replaceChar(branchCode);
    accountNo=replaceChar(accountNo);
    //var redCriteria = "1|"+customerNo+"!2|"+branchCode+"!3|"+accountNo;
    var redCriteria = "1!"+customerNo+"|2!"+branchCode+"|3!"+accountNo;
    //var redCriteria = "1>"+customerNo+"~2>"+branchCode+"~3>"+accountNo;
/* security fixes for WF ends */
    var requestString = '';
    objHTTP.open("POST", serverURL + "?funcid=" + func + "&msgType=" + msgType + "&actionType=" + actionType + "&accountType=" + accountType + "&XREF=" + xref + "&customerNumber=" + customerNo + "&accountNumber=" + accountNo + "&branchCode=" + branchCode+"&isActive="+isActive+ "&RedFldNames=" + escape(redCriteria).replace(/\+/g, '%2B').replace(/\'"'/g, '%22').replace(/\"'"/g, '%27') + "&fetchSize=1000" + "&TotalPages=" + "&CurPage=1", false); // Open the Connection to the Server   19198882
    objHTTP.setRequestHeader("Content-Type", "application/xml");
    objHTTP.setRequestHeader("charset", "utf-8");
    objHTTP.setRequestHeader("X-CSRFTOKEN", mainWin.CSRFtoken);
     var t = getDateObject();
    // if(gAction != 'RELEASELOCK')
    posttime = (t.getHours() * (3600 * 1000)) + (t.getMinutes() * (60 * 1000)) + (t.getSeconds() * 1000) + t.getMilliseconds();
    //Performance Changes
	try{ //9NT1606_12_2_RETRO_12_0_3_21182929 changes
    objHTTP.send(requestString);
	} //9NT1606_12_2_RETRO_12_0_3_21182929 changes start 
     catch(exp){
          mainWin.handleNetWorkErr(exp);
        } //9NT1606_12_2_RETRO_12_0_3_21182929 changes end
    t = getDateObject();
    //if(gAction != 'RELEASELOCK')
    afterposttime = (t.getHours() * (3600 * 1000)) + (t.getMinutes() * (60 * 1000)) + (t.getSeconds() * 1000) + t.getMilliseconds();
    //Performance Changes
    if (objHTTP.status != 200){              //200 - OK
        alert(mainWin.getItemDesc("LBL_QRY_FAIL_ERR_DESC") + "\"" + objHTTP.status + ":" + objHTTP.statusText + "\"");
    } else if (objHTTP.responseText == timeout_responseXML) {
        msgStat = 'F';
        openTimeOutPage();
    } else if (getXMLString(objHTTP.responseXML) != '') {        
        mainWin.inactiveTime = 0;
        dataDOM = objHTTP.responseXML;
        /*var respTxt = getXMLString(dataDOM);
            if (respTxt.indexOf("<FCUBS_DEBUG_RESP>") !=  - 1) { 
                appendDebug(dataDOM);
                var start = respTxt.substring(0, respTxt.indexOf("<FCUBS_DEBUG_RESP>"));
                var end = respTxt.substring(respTxt.indexOf("</FCUBS_DEBUG_RESP>") + 19, respTxt.length);
                respTxt = start + end;
                dataDOM = loadXMLDoc(respTxt);
            }*/
        if(getBrowser().indexOf("IE") != -1) //ie11 changes
            dataDOM.setProperty("SelectionNamespaces", ns);
    } else {
        alert(mainWin.getItemDesc("LBL_TRANS_FAIL"));
    }
}

function getCustacLinks(){
    var custacobj = document.getElementById('ListofAccDiv');
    var custacobjlinks = custacobj.getElementsByTagName("A");
    return custacobjlinks;
}

function highlightCustac(acustobject,tabobjlinks){
for (i = 0; i < tabobjlinks.length; i++) {
        addEvent(tabobjlinks[i], "class", "Astd");
        //tabobjlinks[i].removeAttribute("title");        
    }
    addEvent(acustobject, "class","Astdselected");
    //document.getElementById("WFTab_"+aobject).setAttribute("title","selected");   
}

function dashboardCustDetails(dFuncId) {    
    this.funcId = dFuncId;
    this.xmlFile = "";
    this.scrType = 'S';
}

function fnShowDBoardCustDetails(custDataStr, accountDataStr) {
    if (mainWin.CustomerObj != null) {
        alert(mainWin.getItemDesc("LBL_CUST_SESSION_OPENED_AC") + ":" + accountNumber + ", " + mainWin.getItemDesc("LBL_CUST_NO") + ": " + customerData[0].split("~")[0] + ". "+mainWin.getItemDesc("LBL_END_PREV_CUST_SESSION"));
        return;
     } 
        unmask();
    var labelListOfAcc = mainWin.getItemDesc("LBL_LIST_OF_ACC");
    var labelAccNumber = mainWin.getItemDesc("LBL_ACC_NUMBER");
      var labelAccClass = mainWin.getItemDesc("LBL_ACC_CLASS");
    
    var labelBranchCode = mainWin.getItemDesc("LBL_BRANCH_CODE");
    var labelSelCustDetails = mainWin.getItemDesc("LBL_SEL_CUST_DETAILS");
    var labelCifId = mainWin.getItemDesc("LBL_CIFID");
    var labelCustName = mainWin.getItemDesc("LBL_CUST_NAME");
    var labelBirthDate = mainWin.getItemDesc("LBL_BIRTH_DATE");
    var labelUniqueId = mainWin.getItemDesc("LBL_UNIQUE_ID");
    var labelAddress = mainWin.getItemDesc("LBL_ADDRESS");
    
    var labelProduct = mainWin.getItemDesc("LBL_PRODUCT");
    var labelAccCcy = mainWin.getItemDesc("LBL_ACC_CCY");
    var labelStatus = mainWin.getItemDesc("LBL_STATUS");
    var labelUncollectedFunds = mainWin.getItemDesc("LBL_UNCOLLECTED_FUNDS");
    var labelCurrBalance = mainWin.getItemDesc("LBL_CURRENT_BAL");
    var labelAvailableBalance = mainWin.getItemDesc("LBL_AVAILABLE_BAL");
    /* FCUBS 11.0 Customer Search Changes starts here */
    var labelLoanProduct = mainWin.getItemDesc("LBL_LOAN_PRODUCT");
    var labelAmountFinanaced = mainWin.getItemDesc("LBL_AMOUNT_FINANCED");
    var labelAmountDisbursed = mainWin.getItemDesc("LBL_AMOUNT_DISBURSED");
    /* FCUBS 11.0 Customer Search Changes ends here */

    var custData = custDataStr.split("~");
    var customerNumber = custData[0];
    var branchCode = "";
    var customerName = custData[1];
    var customerAddress = custData[2];
    var birthDate = custData[8];
    //var uniqueValue = custData[4];
    var custtype=custData[3];
    var telephone=custData[4];
    var mail=custData[5];
    var mobile=custData[6];
    var passportno=custData[7];
    
  var html="";
  html  +="<div class=\'TwoColSectionContainer\' style=\'width=52em\'>"
  html  +="<div class=\'DIVColumnOne\' id=\'DIVCustomerDetails\'  style=\'DISPLAY: none;width=25.2em\'></div>";
  html  +="<div class=\'DIVColumnOne\' id=\'DivAccountDetails\'  style=\'DISPLAY: none;width=25.2em\'></div>";
  html  +="</div";
  html  +="<div class=\'TwoColSectionContainer\' style=\'width=52em\'>"
  html  +="<div class=\'DIVColumnOne\' id=\'DivInstructionDetails\'  style=\'DISPLAY: none;width=25.2em\'></div>";
  html  +="<div class=\'DIVColumnOne\' id=\'DivsignphotoDetails\'  style=\'DISPLAY: none;width=25.2em\'></div>";
  html  +="</div";
  html  +="<div class=\'TwoColSectionContainer\' style=\'width=52em\'>";
  html  +="<div class=\'DIVColumnDouble\' id=\'DivTransactiondetails\'  style=\'DISPLAY: none;width=25.2em\'></div>";
  html  +="</div";
  
  //12.1 Dashboard changes --start
 // document.getElementById("DIVTabContent").innerHTML = "";
  //document.getElementById("DIVTabContent").innerHTML = html;
//12.1 Dashboard changes --end
  var customerHtml = "";
  customerHtml +="<fieldset class=\'FSTstd\' block=\'BLK_CUSTOMER\' type=\'SE\' view=\'SE\'><legend>Customer Details</legend>";
  customerHtml +="<div class=\'DIVText\'><label class=\'LBLstd\' FOR=\'BLK_CUSTOMER__CUSTID\'>"+labelCifId+"</label>";
  customerHtml +="<input type=\'text\' class=\'TXTro\' viewMode=\'Y\' readOnly=\'true\'   value='"+ customerNumber+"'  size=\'12\'  /></div>";
  customerHtml +="<div class=\'DIVText\'><label class=\'LBLstd\' FOR=\'BLK_CUSTOMER__FULLNAME\'>"+labelCustName+"</label>";
  customerHtml +="<input type=\'text\' class=\'TXTro\' viewMode=\'Y\' readOnly=\'true\'   value='"+ customerName+"'  size=\'12\'  /></div>";
  customerHtml +="<div class=\'DIVText\'><label class=\'LBLstd\' FOR=\'BLK_CUSTOMER__CUSTTYPE\'>Customer Type</label>";
  customerHtml +="<input type=\'text\' class=\'TXTro\' viewMode=\'Y\' readOnly=\'true\'   value='"+custtype+"'  size=\'12\'  /></div>";
  customerHtml +="<div class=\'DIVText\'><label class=\'LBLstd\' FOR=\'BLK_CUSTOMER__ADDR\'>Address</label>";
  customerHtml +="<textArea type=\'text\' class=\'TXAro\' viewMode=\'Y\' readOnly=\'true\'  SIZE='12'  MAXLENGTH='12' />"+customerAddress+"</textArea><span" + "class='LBLinv'></span></div>";
  customerHtml +="<div class=\'DIVText\'><label class=\'LBLstd\' FOR=\'BLK_CUSTOMER__TELEPHONE\'>Telephone Number</label>";
  customerHtml +="<input type=\'text\' class=\'TXTro\' viewMode=\'Y\' readOnly=\'true\'   value='"+telephone+"'  size=\'12\'  /></div>";
  customerHtml +="<div class=\'DIVText\'><label class=\'LBLstd\' FOR=\'BLK_CUSTOMER__EMAIL\'>Email</label>";
  customerHtml +="<input type=\'text\' class=\'TXTro\' viewMode=\'Y\' readOnly=\'true\'   value='"+mail+"'  size=\'26\'  /></div>";
  customerHtml +="<div class=\'DIVText\'><label class=\'LBLstd\' FOR=\'BLK_CUSTOMER__MOBILE\'>Mobile Number</label>";
  customerHtml +="<input type=\'text\' class=\'TXTro\' viewMode=\'Y\' readOnly=\'true\'   value='"+mobile+"'  size=\'12\'  /></div>";
  customerHtml +="<div class=\'DIVText\'><label class=\'LBLstd\' FOR=\'BLK_CUSTOMER__PASSPORTNO\'>Passport Number</label>";
  customerHtml +="<input type=\'text\' class=\'TXTro\' viewMode=\'Y\' readOnly=\'true\'   value='"+passportno+"'  size=\'12\'  /></div>";
  customerHtml +="</fieldset>";
  
  var accountData = accountDataStr.split("~");
  var accountType = accountData[15]; //FCUBS 11.0 Customer Search
  var CurrBalanceAmount = new MB3Amount(accountData[11], true, accountData[12]);
  var UncollectedFundsAmount = new MB3Amount(accountData[9], true, accountData[12]);
  var AvailableBalanceAmount = new MB3Amount(accountData[10], true, accountData[12]);
  var totalAmountFinanced = new MB3Amount(accountData[9], true, accountData[12]);
  var totalAmountDisbursed = new MB3Amount(accountData[11], true, accountData[12]);
  if (CurrBalanceAmount.isValid()) {
      accountData[11] = CurrBalanceAmount.getInputAmount();
  }
  if (UncollectedFundsAmount.isValid()) {
      accountData[9] = UncollectedFundsAmount.getInputAmount();
  }
  if (AvailableBalanceAmount.isValid()) {
      accountData[10] = AvailableBalanceAmount.getInputAmount();
  }
  if (totalAmountFinanced.isValid()) {
      accountData[9] = totalAmountFinanced.getInputAmount();
  }
  if (totalAmountDisbursed.isValid()) {
      accountData[11] = totalAmountDisbursed.getInputAmount();
  }
  if(accountData[15]=='A'){
      var acctype='Active';
  }else{
      var acctype='Linked';
  }
  
  var accountHtml = "";  
  accountHtml +="<fieldset class=\'FSTstd\' block=\'BLK_CUSTOMER\' type=\'SE\' view=\'SE\'><legend>Account Details</legend>";
  accountHtml +="<div class=\'DIVText\'><label class=\'LBLstd\' FOR=\'BLK_ACC__BRN\'>"+labelBranchCode+"</label>";
  accountHtml +="<input type=\'text\' class=\'TXTro\' viewMode=\'Y\' readOnly=\'true\'   value='"+ accountData[1]+"'  size=\'12\'  /></div>";
  accountHtml +="<div class=\'DIVText\'><label class=\'LBLstd\' FOR=\'BLK_ACC__ACCTYPE\'>Account Type</label>";
  accountHtml +="<input type=\'text\' class=\'TXTro\' viewMode=\'Y\' readOnly=\'true\'   value='"+ acctype+"'  size=\'12\'  /></div>";
  accountHtml +="<div class=\'DIVText\'><label class=\'LBLstd\' FOR=\'BLK_ACC__ACCNO\'>Account Number</label>";
  accountHtml +="<input type=\'text\' class=\'TXTro\' viewMode=\'Y\' readOnly=\'true\'   value='"+accountData[6]+"'  size=\'12\'  /></div>";
  accountHtml +="<div class=\'DIVText\'><label class=\'LBLstd\' FOR=\'BLK_ACC__CCY\'>"+labelAccCcy+"</label>";
  accountHtml +="<input type=\'text\' class=\'TXTro\' viewMode=\'Y\' readOnly=\'true\'   value='"+accountData[12]+"'  size=\'12\'  /></div>"; 
  accountHtml +="<div class=\'DIVText\'><label class=\'LBLstd\' FOR=\'BLK_ACC__ACCSTAT\'>"+labelStatus+"</label>";
  accountHtml +="<input type=\'text\' class=\'TXTro\' viewMode=\'Y\' readOnly=\'true\'   value='"+accountData[8]+"'  size=\'12\'  /></div>";
  accountHtml +="<div class=\'DIVText\'><label class=\'LBLstd\' FOR=\'BLK_ACC__ACCCURBAL\'>"+labelAmountFinanaced+"</label>";
  accountHtml +="<input type=\'text\' class=\'TXTro\' viewMode=\'Y\' readOnly=\'true\'   value='"+accountData[9]+"'  size=\'26\'  /></div>";
  accountHtml +="<div class=\'DIVText\'><label class=\'LBLstd\' FOR=\'BLK_ACC__ACCAVLBAL\'>"+labelAvailableBalance+"</label>";
  accountHtml +="<input type=\'text\' class=\'TXTro\' viewMode=\'Y\' readOnly=\'true\'   value='"+accountData[10]+"'  size=\'12\'  /></div>";
  accountHtml +="<div class=\'DIVText\'><label class=\'LBLstd\' FOR=\'BLK_ACC__ACCLOCBAL\'>Account Local currency Balance</label>";
  accountHtml +="<input type=\'text\' class=\'TXTro\' viewMode=\'Y\' readOnly=\'true\'   value='"+accountData[11]+"'  size=\'12\'  /></div>";
  accountHtml +="<div class=\'DIVText\'><label class=\'LBLstd\' FOR=\'BLK_ACC__BRN\'>Joint Account Details</label>";
  accountHtml +="<A class='' style='Text-decoration:underline' HREF=\'#\' onclick=\"fnShowDBoardCustDetails(\'" + custDataStr + "\', \'" + accountDataStr + "\')\" >View</A>" ;
  accountHtml +="<div class=\'DIVText\'><label class=\'LBLstd\' FOR=\'BLK_ACC__BRN\'>Linked Customer Details</label>";
  accountHtml +="<A class='' style='Text-decoration:underline' HREF=\'#\' onclick=\"fnShowDBoardCustDetails(\'" + custDataStr + "\', \'" + accountDataStr + "\')\" >View</A>" ;
  accountHtml +="<div class=\'DIVText\'><label class=\'LBLstd\' FOR=\'BLK_ACC__BRN\'>Customer Session</label>";
        accountHtml += "<A class='' id='spanStartCustSession' style='Text-decoration:underline' HREF=\'#\' onClick=\"fnStartCustomerSession(\'" + custDataStr + "\',\'" + accountDataStr + "\')\" >Start</A>";
  accountHtml +="</fieldset>";
 /* accountHtml += "<h2 class = \'widgetoneheading current\' id = \'widgetoneheading1\'>&nbsp;Account Details</h2>";
  accountHtml += "<div class = \'csc\' id = \'cscAcctDetails\'><span class = \'tr\'></span>";
  accountHtml += "<div class = \'widgetonetblbox\' style=\'height:100%\'>";
  accountHtml += "<div style=\'overflow: auto; display: block; height:100%\' id = \'DIVresultsTBL2\'>";
  
  if (accountType == "L") {
    accountHtml += '<table id=\"AcctInfoTbl\" class=\"TBLlyt\" style=\"clear: both;\" 	width=\"99%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0">';
    accountHtml += '<tbody>';
    accountHtml += '<tr><th WIDTH="40%" valign="top" scope="row"><span class="SPNtext">' + labelProduct + ': </span></th>';
    accountHtml += '<td ><span class="SPNtext">' + accountData[14] + '</span></td></tr>';
    accountHtml += '<tr><th WIDTH="40%" valign="top" scope="row"><span class="SPNtext">' + labelAccCcy + ': </span></th>';
    accountHtml += '<td ><span class="SPNtext">' + accountData[12] + '</span></td></tr>';
    accountHtml += '<tr><th WIDTH="40%" valign="top" scope="row"><span class="SPNtext">' + labelStatus + ': </span></th>';
    accountHtml += '<td ><span class="SPNtext">' + accountData[8] + '</span></td></tr>';
    accountHtml += '<tr><th WIDTH="40%" valign="top" scope="row" ><span class="SPNtext">' + labelAmountFinanaced + ': </span></th>';
    accountHtml += '<td ><span class="SPNtext">' + accountData[9] + '</span></td></tr>';
    accountHtml += '<tr><th WIDTH="40%" valign="top" scope="row" ><span class="SPNtext">' + labelAmountDisbursed + ': </span></th>';
    accountHtml += '<td ><span class="SPNtext">' + accountData[11] + '</span></td></tr>';
    accountHtml += '<tr><th WIDTH="40%" valign="top" scope="row" ><span class="SPNtext">Customer Session: </span></th>';
    accountHtml += '<td ><span class="SPNtext"></span></td></tr>';
  } else {
    accountHtml += '<table id=\"AcctInfoTbl\" class=\"TBLlyt\" style=\"clear: both;\" 	width=\"99%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0">';
    accountHtml += '<tbody>';
    accountHtml += '<tr><th WIDTH="40%" valign="top" scope="row"><span class="SPNtext">' + labelProduct + ': </span></th>';
    accountHtml += '<td ><span class="SPNtext">' + accountData[14] + '</span></td></tr>';
    accountHtml += '<tr><th WIDTH="40%" valign="top" scope="row"><span class="SPNtext">' + labelAccCcy + ': </span></th>';
    accountHtml += '<td ><span class="SPNtext">' + accountData[12] + '</span></td></tr>';
    accountHtml += '<tr><th WIDTH="40%" valign="top" scope="row"><span class="SPNtext">' + labelStatus + ': </span></th>';
    accountHtml += '<td ><span class="SPNtext">' + accountData[8] + '</span></td></tr>';
    accountHtml += '<tr><th WIDTH="40%" valign="top" scope="row" ><span class="SPNtext">' + labelUncollectedFunds + ': </span></th>';
    accountHtml += '<td ><span class="SPNtext">' + accountData[9] + '</span></td></tr>';
    accountHtml += '<tr><th WIDTH="40%" valign="top" scope="row" ><span class="SPNtext">' + labelAvailableBalance + ': </span></th>';
    accountHtml += '<td ><span class="SPNtext">' + accountData[10] + '</span></td></tr>';
    accountHtml += '<tr><th WIDTH="40%" valign="top" scope="row" ><span class="SPNtext">Customer Session: </span></th>';
    accountHtml += '<td ><button class="BTNimg" style="vertical-align:none" onblur="this.className=\'BTNimg\'" onmouseover="this.className=\'BTNimgH\'" onfocus="this.className=\'BTNimgH\'" onmouseout="this.className=\'BTNimg\'"id="CUSTSESSIONSTART" accesskey="O" onClick="fnStartCustomerSession(\'' + custDataStr + '\',\'' + accountDataStr + '\');" title="' + mainWin.getItemDesc("LBL_START_CUST_SESSION") + '"><span tabindex="-1" id = "CustSessionIMG" class="ICOsessionstart"></span></button><span id=\'spanStartCustSession\' class=\'SPNtext\'>'+mainWin.getItemDesc("LBL_START_CUST_SESSION")+'</span></td></tr>';
    //accountHtml += '<tr><th WIDTH="40%" valign="top" scope="row" ></th>';
    //accountHtml += '<td ><button>End Session</button></td></tr>';    
  }
  accountHtml += '</tbody></table>';

  accountHtml += "</div></div>";
  accountHtml += "<span class=\"bl\"></span><span class=\"br\"></span></div>";
  
  var linkedCustHtml = "";
  linkedCustHtml += "<h2 class = \'widgetoneheading current\' id = \'widgetoneheading1\'>&nbsp;Linked Customer Details</h2>";
  linkedCustHtml += "<div class = \'csc\' id = \'cscLinkedCustDetails\'><span class = \'tr\'></span>";
  linkedCustHtml += "<div class = \'widgetonetblbox\'>";
  linkedCustHtml += "<div style=\'overflow: auto; display: block\' id = \'DIVresultsTBL1\'>";
  linkedCustHtml += '<TABLE id = \"LinkedCustRecs\" border=\'0\' width=\'100%\' style=\'table-layout:fixed \' cellpadding=\'3\' cellspacing=\'0\' class=\'TBLone\' summary=\'LinkedCustSearchResult\'>';
  linkedCustHtml += '<thead><tr>';
  linkedCustHtml += '<th scope=\'col\' class=\'TBLoneTH\'><a class=\'Astd\'>Branch</a></th>';
  linkedCustHtml += '<th scope=\'col\' class=\'TBLoneTH\'><a class=\'Astd\'>Account</a></th>'
  linkedCustHtml += '<th scope=\'col\' class=\'TBLoneTH\'><a class=\'Astd\'>Currency</a></th>'
  linkedCustHtml += '<th scope=\'col\' class=\'TBLoneTH\'><a class=\'Astd\'>Balance</a></th>'
  linkedCustHtml += '</tr></thead>';
  linkedCustHtml += '<tbody>';
  linkedCustHtml += '<tr class=\'TBLoneTRalt\'>';
  linkedCustHtml += "<td onkeydown = \'return handleCustRecKeyDownEvents(event)\'><span class=\"SPNtext\" tabindex=0>000</span></td>";
  linkedCustHtml += '<td onkeydown = \'return handleCustRecKeyDownEvents(event)\'><span class=\"SPNtext\" tabindex=0>00012021001</span></td>';
  linkedCustHtml += "<td onkeydown = \'return handleCustRecKeyDownEvents(event)\'><span class=\"SPNtext\" tabindex=0>GBP</span></td>";
  linkedCustHtml += '<td onkeydown = \'return handleCustRecKeyDownEvents(event)\'><span class=\"SPNtext\" tabindex=0>450000.00</span></td>';
  linkedCustHtml += '</tr>';
  linkedCustHtml += '<tr class=\'TBLoneTR\'>';
  linkedCustHtml += "<td onkeydown = \'return handleCustRecKeyDownEvents(event)\'><span class=\"SPNtext\" tabindex=0>001</span></td>";
  linkedCustHtml += '<td onkeydown = \'return handleCustRecKeyDownEvents(event)\'><span class=\"SPNtext\" tabindex=0>00012021002</span></td>';
  linkedCustHtml += "<td onkeydown = \'return handleCustRecKeyDownEvents(event)\'><span class=\"SPNtext\" tabindex=0>USD</span></td>";
  linkedCustHtml += '<td onkeydown = \'return handleCustRecKeyDownEvents(event)\'><span class=\"SPNtext\" tabindex=0>150000.00</span></td>';
  linkedCustHtml += '</tr>';
  linkedCustHtml += '<tr class=\'TBLoneTRalt\'>';
  linkedCustHtml += "<td onkeydown = \'return handleCustRecKeyDownEvents(event)\'><span class=\"SPNtext\" tabindex=0>002</span></td>";
  linkedCustHtml += '<td onkeydown = \'return handleCustRecKeyDownEvents(event)\'><span class=\"SPNtext\" tabindex=0>00012021003</span></td>';
  linkedCustHtml += "<td onkeydown = \'return handleCustRecKeyDownEvents(event)\'><span class=\"SPNtext\" tabindex=0>AUD</span></td>";
  linkedCustHtml += '<td onkeydown = \'return handleCustRecKeyDownEvents(event)\'><span class=\"SPNtext\" tabindex=0>550000.00</span></td>';
  linkedCustHtml += '</tr>';
  linkedCustHtml += '<tr class=\'TBLoneTR\'>';
  linkedCustHtml += "<td onkeydown = \'return handleCustRecKeyDownEvents(event)\'><span class=\"SPNtext\" tabindex=0>003</span></td>";
  linkedCustHtml += '<td onkeydown = \'return handleCustRecKeyDownEvents(event)\'><span class=\"SPNtext\" tabindex=0>00012021004</span></td>';
  linkedCustHtml += "<td onkeydown = \'return handleCustRecKeyDownEvents(event)\'><span class=\"SPNtext\" tabindex=0>INR</span></td>";
  linkedCustHtml += '<td onkeydown = \'return handleCustRecKeyDownEvents(event)\'><span class=\"SPNtext\" tabindex=0>150000.00</span></td>';
  linkedCustHtml += '</tr>';
  linkedCustHtml += '<tr class=\'TBLoneTRalt\'>';
  linkedCustHtml += "<td onkeydown = \'return handleCustRecKeyDownEvents(event)\'><span class=\"SPNtext\" tabindex=0>004</span></td>";
  linkedCustHtml += '<td onkeydown = \'return handleCustRecKeyDownEvents(event)\'><span class=\"SPNtext\" tabindex=0>00012021005</span></td>';
  linkedCustHtml += "<td onkeydown = \'return handleCustRecKeyDownEvents(event)\'><span class=\"SPNtext\" tabindex=0>GBP</span></td>";
  linkedCustHtml += '<td onkeydown = \'return handleCustRecKeyDownEvents(event)\'><span class=\"SPNtext\" tabindex=0>250000.00</span></td>';
  linkedCustHtml += '</tr>';
  linkedCustHtml += "</tbody>";
  linkedCustHtml += "</TABLE>";
  linkedCustHtml += "</div></div>";
  linkedCustHtml += "<div style=\"background-color:gray;padding-bottom:1px\">";
  linkedCustHtml += "<table summary=\'\' style=\'margin: 0px 5px 5px 0px\' border = \"0\" cellpadding = \"0\" cellspacing = \"0\">";
  linkedCustHtml += "<tbody><tr><td>&nbsp;</td>";
  linkedCustHtml += "<td valign = \'middle\'><button class = \'Abut\' title = \'Previous\'><img src=\'Images/widgetonePrevious.gif\' alt = \'Previous\' title = \'Previous\'></button></td>";
  linkedCustHtml += "<td>&nbsp;</td>";
  linkedCustHtml += "<td valign = \'middle\'><button class = \'Abut\' title = \'Next\'><img src = \'Images/widgetoneNext.gif\' alt = \'Next\' title = \'Next\'></button></td>";
  linkedCustHtml += "<td>&nbsp;</td>";
  linkedCustHtml += "</tr></tbody></table>";
  linkedCustHtml += "</div>";
  linkedCustHtml += "</div>";
  linkedCustHtml += "<span class=\"bl\"></span><span class=\"br\"></span></div>";
  
  var photoSigCustHtml = "";
  photoSigCustHtml += "<h2 class = \'widgetoneheading current\' id = \'widgetoneheading1\'>&nbsp;Photo & Signature Details</h2>";
  photoSigCustHtml += "<div class = \'csc\' id = \'cscPhotoSigCustDetails\'><span class = \'tr\'></span>";
  photoSigCustHtml += "<div class = \'widgetonetblbox\' style=\'height:100%\'>";
  photoSigCustHtml += "<div style=\'overflow: auto; display: block; height:100%\' id = \'DIVresultsTBL1\'>";
  photoSigCustHtml += '<table id=\"PhotoSignInfoTbl\" class=\"TBLlyt\"	width=\"99%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0">';
  var imageHTML = showAccountImage(accountData[6], accountData[7], accountData[0]);
  photoSigCustHtml += imageHTML;
  photoSigCustHtml += '</tbody></table>';
  photoSigCustHtml += "</div></div>";
  photoSigCustHtml += "<span class=\"bl\"></span><span class=\"br\"></span></div>";
  
  document.getElementById('dashtable').tBodies[0].rows[0].cells[0].innerHTML = '';
  document.getElementById('dashtable').tBodies[0].rows[0].cells[1].innerHTML = '';
  document.getElementById('dashtable').tBodies[0].rows[1].cells[0].innerHTML = '';
  document.getElementById('dashtable').tBodies[0].rows[1].cells[1].innerHTML = '';*/
  
  document.getElementById('DIVCustomerDetails').innerHTML = customerHtml;
  document.getElementById('DivAccountDetails').innerHTML = accountHtml; 
  document.getElementById('DIVCustomerDetails').style.display='block';
  document.getElementById('DivAccountDetails').style.display='block';
  
  //var cscHeight = document.getElementById("DIVTabContent").offsetHeight / 3;
  //document.getElementById("cscCustDetails").style.height = cscHeight + "px";
  //document.getElementById("cscAcctDetails").style.height = cscHeight + "px";
  //document.getElementById("cscLinkedCustDetails").style.height = cscHeight + "px";
  //document.getElementById("cscPhotoSigCustDetails").style.height = cscHeight + "px";
}

function fnCreateCustomerHtml(){
    var labelSearchResult = mainWin.getItemDesc("LBL_SEARCH_RESULT");
    var labelCustNumber = mainWin.getItemDesc("LBL_CUST_NUMBER");
    var labelRelatedCust =mainWin.getItemDesc("LBL_REL_CUSTOMER");
    var labelCustName = mainWin.getItemDesc("LBL_CUST_NAME");
     // fix for bug: 19060316 starts 
	var labelKanji = "";
    var labelKatakana = "";
    var labelHiragana = "";
    if(mainWin.applicationExt == "JP") {
        labelKanji = getItemDesc("LBL_KANJI_NAME");
        labelKatakana = getItemDesc("LBL_KATAKANA_NAME");
        labelHiragana = getItemDesc("LBL_HIRAGANA_NAME");
    }
     // fix for bug: 19060316 ends
    var labelCustSearchResult = mainWin.getItemDesc("LBL_CUST_SEARCH_RESULT");
    if (document.getElementById('CustQueryResults')) {
        var tdArr = document.getElementById('DIVresultsTBL1').getElementsByTagName('TD');
        for (var tdCnt = 0;tdCnt < tdArr.length;tdCnt++) {
            tdArr[tdCnt].innerHTML = "&nbsp;";
            tdArr[tdCnt].removeAttribute("onkeydown");

        }
        if (document.getElementById('DIVcaptionSR1')) {
            var h2Elem = document.getElementById('DIVcaptionSR1').getElementsByTagName("H2")[0];
            var spanElem = h2Elem.getElementsByTagName('SPAN')[0];
            if (spanElem) {
                h2Elem.removeChild(spanElem);
            }
        }
    }
    else {
    var html = '<div class=\'DIVmultiplebox\' tabindex=\"0\" id=\'DIVcaptionSR1\' onkeydown=\"return handleCustQueryKeyDownEvents(event)\" ><h2 class=\"hh4dash\">' + labelSearchResult + '</h2>';
    html += "<DIV style=\"PADDING-BOTTOM: 3px; FLOAT: right;\" id=btnDivCust>"; 
    html +="<BUTTON id=custTabBtnPrev1 class=Abut  onclick=\"fnCustomerQuery( \'" + prev + "\',"+gCurrPage_Cust+")\" type=submit>" ;
    html +="<span title=\"Previous\" class=\"WidgetonePrevious\"></span></BUTTON><BUTTON id=custTabBtnNext1 class=Abut  onclick=\"fnCustomerQuery( \'" + next + "\',"+gCurrPage_Cust+")\" type=submit><span class=\"WidgetoneNext\" title=Next></span>" ;
    html +="</BUTTON><BUTTON id=btnrefreshd class=Abut onclick=fnRefreshData() type=submit style=\"display:none;\"><span class=\"WidgetoneRefresh\" title=\"Refresh\"></span></BUTTON>" ;
    html +="</DIV>";
    html += '<div id=\'DIVresultsTBL1\' class=\'DIVMultipleSmallInner\' style=\'display:block;clear:both;overflow:auto;\'>';
    html += '</div></div>';
    document.getElementById('CUSTDETAILS').innerHTML = "";
    document.getElementById('CUSTDETAILS').innerHTML = html;      
    document.getElementById('searchCustResultDiv').style.visibility = "hidden";
    document.getElementById('searchCustResultDiv').style.display = "block";
    var tempObj = document.getElementById('DIVcaptionSR1');
    setWidthHeight(tempObj);
    tempObj = document.getElementById('DIVresultsTBL1');
    tempObj.style.width = tempObj.parentNode.offsetWidth  - 2+ 'px';
    tempObj.style.height = document.getElementById('DIVcaptionSR1').offsetHeight - (document.getElementById('btnDivCust').offsetHeight + 10) +'px';
	html = "";
	html += '<TABLE id = \"CustQueryResults\"  style=\"width: 100%\" cellpadding=\'3\' cellspacing=\'0\' class=\'TBLone\' summary=\'' + labelCustSearchResult + '\' >';
    html += '<thead><tr><th scope=\'col\' class=\'THgrid\'><SPAN class=SPNtext>' + labelCustNumber + '</SPAN></th><th scope=\'col\' class=\'THgrid\'><SPAN class=SPNtext>' + labelCustName + '</SPAN></th><th scope=\'col\' class=\'THgrid\'><SPAN class=SPNtext>' + labelRelatedCust + '</SPAN></th></tr></thead>';
    html += '<tbody>';
	for(var rowCnt  = 0 ; rowCnt < 12 ; rowCnt++){
		if (rowCnt % 2 == 0) html += '<tr class=\'TBLoneTR\'>';
		else html += '<tr class=\'TBLoneTRalt\'>';
		html += '<td scope=\'row\'>&nbsp;</td>';
		html += '<td>&nbsp;</td>';
                html += '<td>&nbsp;</td>';
		html += '</tr>';
	}
	html += '</tbody>';
    html += '</table>';
	document.getElementById('DIVresultsTBL1').innerHTML = html;
    }
}

function fnCreateAccountHtml(recflag, customerInformationArray){
  var labelListOfAcc = mainWin.getItemDesc("LBL_LIST_OF_ACC");
  var labelAccNumber = mainWin.getItemDesc("LBL_ACC_NUMBER");
   var labelAccClass = mainWin.getItemDesc("LBL_ACC_CLASS");
  var labelBranchCode = mainWin.getItemDesc("LBL_BRANCH_CODE");
   if (document.getElementById('CustomerRecordsTable')) {
        var tdArr = document.getElementById('DIVresultsTBL2').getElementsByTagName('TD');
        for (var tdCnt = 0;tdCnt < tdArr.length;tdCnt++) {
            tdArr[tdCnt].innerHTML = "&nbsp;";
            tdArr[tdCnt].removeAttribute("onkeydown");

        }
        if (document.getElementById('DIVcaptionSR2')) {
            var h2Elem = document.getElementById('DIVcaptionSR2').getElementsByTagName("H2")[0];
            var spanElem = h2Elem.getElementsByTagName('SPAN')[0];
            if (spanElem) {
                h2Elem.removeChild(spanElem);
            }
        }
    }
    else {
	html = '<div class=\'DIVmultiplebox\' id=\'DIVcaptionSR2\' tabindex=\"0\" onkeydown=\"return handleCustRecKeyDownEvents(event)\"><h2 class="hh4dash">' + labelListOfAcc + '</h2>';
    html += "<DIV style=\"PADDING-BOTTOM: 3px; FLOAT: right;\" id=btnDivAcc>" 
    html +="<BUTTON id=custTabBtnPrev2 class=Abut  onclick=\"getCustomerRecords(\'" +customerInformationArray+ "\',event,'"+ prev + "\',"+gCurrPage_Acc+")\" type=submit disabled>" 
    html +="<span title=\"Previous\" class=\"WidgetonePrevious\"></span></BUTTON><BUTTON id=custTabBtnNext2 class=Abut  onclick=\"getCustomerRecords(\'" +customerInformationArray+ "\',event,'"+ next + "\',"+gCurrPage_Acc+")\" type=submit disabled><span class=\"WidgetoneNext\" title=Next></span>" 
    html +="</BUTTON><BUTTON id=btnrefreshd class=Abut onclick=fnRefreshData() type=submit style=\"display:none;\"><span class=\"WidgetoneRefresh\" title=\"Refresh\"></span></BUTTON>" 
    html +="</DIV>";
    html += '<div class=\"DIVMultipleSmallInner\" id =\"DIVresultsTBL2\" style=\"clear:both;overflow:auto;\">';
    html += '<TABLE style=\" width: 100%; \" id = \'CustomerRecordsTable\' class="TBLone" summary="' + labelListOfAcc + '" border="0" cellspacing="0" cellpadding="0">';       
    html += "</div></div>";
	document.getElementById('ListofAccDiv').innerHTML = html;
    document.getElementById('ListofAccDiv').style.visibility = "hidden";
    document.getElementById('ListofAccDiv').style.display = "block"; 
    var tempObj = document.getElementById('DIVcaptionSR2');
    setWidthHeight(tempObj);
    tempObj = document.getElementById('DIVresultsTBL2');
    tempObj.style.width = tempObj.parentNode.offsetWidth  - 2+ 'px';
    tempObj.style.height = document.getElementById('DIVcaptionSR2').offsetHeight - (document.getElementById('btnDivAcc').offsetHeight + 10) +'px';
    html = "";
    html += '<TABLE style=\" width: 100%; \" id = \'CustomerRecordsTable\' class="TBLone" summary="' + labelListOfAcc + '" border="0" cellspacing="0" cellpadding="0">';        
    html += '<thead><tr><th scope=\'col\' class=\'THgrid\'><span class=\'SPNtext\'>' + labelAccNumber + '</span></th><th scope=\'col\' class=\'THgrid\'><span class=\'SPNtext\'>' + labelAccClass + '</span></th><th scope=\'col\' class=\'THgrid\'><span class=\'SPNtext\'>' + labelBranchCode + '</span></th></tr></thead>';
    html += '<tbody>';
	 if(typeof(recflag) != "undefined"){
		for(var rowCnt = 0 ; rowCnt < 5 ; rowCnt++){
			if (rowCnt % 2 == 0) html += '<tr class=\'TBLoneTR\'>';
			else html += '<tr class=\'TBLoneTRalt\'>';
			html += "<td>&nbsp;</td>";
			html += '<td>&nbsp;</td>';
                        html += '<td>&nbsp;</td>';
			html += '</tr>';
		}
	 }
   html += "</tbody></TABLE>";
    document.getElementById('DIVresultsTBL2').innerHTML = html;
    }
}
//Fix for 18433312 starts.
function resizeImage(event) {
	var sourceElement = getEventSourceElement(event);
    var iframe = document.getElementById(sourceElement.id);
    try {
        var doc = iframe.contentDocument || iframe.contentWindow.document;
        if (doc.getElementsByTagName("IMG")[0] != undefined) {
            if(doc.getElementsByTagName("IMG")[0].naturalHeight>iframe.offsetHeight){
            iframe.style.overflow="auto";
        }else{
            iframe.style.height=doc.getElementsByTagName("IMG")[0].naturalHeight;
        }
        if(doc.getElementsByTagName("IMG")[0].naturalWidth>iframe.offsetWidth){
            iframe.style.overflow="auto";
        }else{
            iframe.style.width=doc.getElementsByTagName("IMG")[0].naturalWidth;
        }
    } 
    }catch(ex) { 
    }
}//Fix for 18433312 ends.    