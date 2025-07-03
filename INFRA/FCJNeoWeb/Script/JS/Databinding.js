/*----------------------------------------------------------------------------------------------------
**
** File Name    : Databinding.js
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

 **  Modified By          : Neethu Sreedharan
 **  Modified On          : 07-Oct-2016
 **  Modified Reason      : The error seems to be due to network issue. Fix is provide to show the error 
                            to user as alert and on click of Ok button on alert window, screen will be 
                            unmasked and user can try the action again.
 **  Retro Source         : 9NT1606_12_0_3_INTERNAL
 **  Search String        : 9NT1606_12_2_RETRO_12_0_3_21182929

**  Modified By           : Shayam Sundar Ragunathan
**  Modified On           : 11-Aug-2017
**  Modified Reason       : Fix provided for LDDCONON screen as suggested which gets hanged on visiting the subsystems
**  Search String         : 9NT1606_12_4_RETRO_12_0_3_26231107

**  Modified By           : Karthiga
**  Modified On           : 05-Oct-2017 
**  Modified Reason       : Code changes done to handle display of data in popup editor of Multiple entry block
**  Retro Source          : 9NT1606_12_4_RETRO_12_3_26780570
**  Search String         : Bug#26896721
  **  Modified By           : Niranjan Prajapati
  **  Modified On           : 19-June-2018
  **  Modified Reason       : CHANGES (COLOR CODE) ON COLLATERAL NOT REFLECTED PROPERLY 
  **  Retro Source          : Bug_28018410
  **  Search String         : 9NT1606_12_5_RETRO_12_3_28176165
  
  Modified By           : Partha Sarmah
  Modified On           : 12-June-2019
  Modified Reason       : Issue:Using of brackets as identifier for identifying old/new values is displaying incorrect content on click of view changes button
						  Fix:Modification done so that different unique identifier is used for identifying old/new values instead of brackets
  Search String         : FCUBS_14.1_UNICREDIT S.P.A._BUG_29596225_RETRO_19394034
  
  Modified By         : SIVA
  Modified On           : 19-04-2023
  Modified Reason       : Redwood issue. 
  Search String         : REDWOOD_35264640
  
**
**	Modified By          : Arunkumar R
** 	Modified on          : 20-Apr-2023
** 	Modified Reason      : Code changes for Script error occured from summary screens in Redwood
** 	Search String        : bug#35262971
**
**  Modified By          : Avneesh
**  Modified On          : 04-May-2023
**  Reason               : Changes done to show the data when click on View Changes
**  Search String        : REDWOOD_35357537 
**
**  Modified By          : Shayam Sundar Ragunathan
**  Modified On          : 11-May-2023
**  Reason               : Added setTimeout() function to assign values after screen loading
**  Search String        : REDWOOD_35381225
**
**  Modified By          : Selvam Manickam
**  Modified On          : 12-June-2023
**  Reason               : Added Promise() function to prepare data
**  Search String        : REDWOOD_35404293
**
**  Modified By          : Manoj S
**  Modified On          : 20-June-2023
**  Reason               : Added Promise() function to prepare data
						   After Populate outstanding button rebuilding all the table should execute proper
**  Search String        : REDWOOD_35503982
						   Redwood_35438955
**
**  Modified By          : Manoj S
**  Modified On          : 14-July-2023
**  Reason               :	MultiGrid Focus on first or current record selection. and selecting missing tag value from child node.  
**  Search String        : REDWOOD_35313042
**
**  Modified By          : Manoj S
**  Modified On          : 24-July-2023
**  Reason               : Bug 35381225 changes are removed 
**  Search String        : REDWOOD_35409931
**
**  Modified By          : Manoj S
**  Modified On          : 04-Oct-2023
**  Reason               : 1.The code that assigns the AUTHSTAT value in the AUDIT field has been added.
						   2.Handle the code to convert the amount when object value is not null. 
**  Search String        : REDWOOD_35851541
						   Redwood_35850089
**
**  Modified By          : Manoj S
**  Modified On          : 18-Oct-2023
**  Reason               : 1.The code added to handle append data rows wise
						               2.Handled IsME condition for multi entry
**  Search String        : REDWOOD_35903742
						               redwood_35894402 

**
**  Modified By          : Manoj S
**  Modified On          : 18-Nov-2023
**  Reason               : Corrected code for populating child table data properly.
**  Search String        : redwood_35944380		

**  Last Modified By   : Ramalingam R
**  Last modified on   : 05-June-2024
**  Reason             : Data are not getting populated into Multi entry blocks("Component Schedule" and "Schedules") under Components section due to childnode length issue.
**  Search String      : 9NT1606_14_7_2_STORYBOARD_36647436
----------------------------------------------------------------------------------------------------
*/

// the following code has been added to remove Msxml object dependency on sys file

var fcjRequestDOM = null;
var fcjResponseDOM = null; 
var processingAction = "";
var forOnlineAuth = false;
var forMaintAuth = false;
var forLiquidate = false;
var newAmountFormat = mainWin.nlsAmountFormat;
var decimalSymbol = newAmountFormat.substr(0, 1);
var replaceStr ="";

var CHECK_B0X_SELECTED_VALUE = 'Y';
var CHECK_B0X_UNSELECTED_VALUE = 'N';
var RADIO_BUTTON_SELECTED_VALUE = 'Y';
var RADIO_BUTTON_UNSELECTED_VALUE = 'N';

var dbDataDOM = null;
var dbStrRecords = "";

/* Added for pagination of multiple entry block */
var meCalledAction	= 'SAVE';
//var dbStrRootTableName = dataSrcLocationArray[0];//REDWOOD_CHANGES
var dbIndexArray = new Array(); // Array to Store the current Indexes of all the tables. 
//var dbAuditChangeFlag  = false;
/*changes done for query on non primary key fields for summary screen - Sankarganesh - 02/03/2005 */
var dbAuthFlag = false;
var dbRecFlag = false;
/*----------------------------------------------------------------------------------------------- */
var dbFCJDOM;
var debugFlg = false;		   
//REDWOOD_CHANGES
//var Added = '#0aaF03'; //'f3ffe8';
//var deleted = '#FF364e'; //'#ffefdd';
//var modified = '#0ca8ff';//'#1f77FF'; //'#e9f3ff';- 12_0_3_RETRO_12_2_23653023
var Added = 'viewchanges-added';
var deleted = 'viewchanges-deleted';
var modified = "viewchanges-modified"; 
//REDWOOD_CHANGES
var xsdDom = "";
var xsdFile = "";

var gXmlFileName = "";
var gScreenName = "";
var gXslFileName = "";
var viewMode = false;

/* THIS VARIABLE IS REQUIRED FOR ERROR HANDLING */
var type = "S";
//Performance Changes
var posttime="";
var afterposttime="";
//Performance Changes
//Array used for navigation purpose.
/*var dbArrNavStat = new Array(gcNUM_NAV_BUTTONS);
dbArrNavStat[gcNAV_FIRST] = false;
dbArrNavStat[gcNAV_PREVIOUS] = false;
dbArrNavStat[gcNAV_GOTO] = false;
dbArrNavStat[gcNAV_NEXT] = false;
dbArrNavStat[gcNAV_LAST] = false;*/

var fileAttachments = new Array(); //stores the attachments

var viewModeAction = false;
var isResponseProcessed = false; //21301992
var isDeletRow=false; //REDWOOD_35313042
var isNav =false; //REDWOOD_35313042
/**
  * This function will create the initial dbDataDOM object. A new
  * XML DOM document will be created and a node will be created for
  * the root element[the top most table in the hierarchy].
  */
function createDOM(rootTableName)
{
    var dataXML = "<?xml version='1.0' encoding='UTF-8'?>";
    dataXML = "<" + rootTableName + " ID='1' Type='SINGLE'></" + rootTableName + ">";
    dbDataDOM = loadXMLDoc(dataXML);
    //dbDataDOM.loadXML(dataXML);
    resetIndex(); // Set all the table indexes to 1.
}

function resetDOM() {
    resetIndex();
    dbDataDOM = null;
}

/** * Prompt the contents of dbDataDOM object. */
function fnShowDom()
{}

function isMultipleEntry(dataSrc)
{
    for (var i = 0; i < multipleEntryIDs.length; i++)
    {
        if (multipleEntryIDs[i] == dataSrc)
        {
            return true;
        }
    }
    return false;
}

function showData(rootName, index, isAuth)
{
    //setTimeout( function () { //REDWOOD_35381225  REDWOOD_35409931 commented 
    isformat =false;
    buildIsQuery();
    buildIsControl(); // 16/09/08 Added for isControl Datasource
    debugs("rootName", rootName);
    dbIndexArray[rootName] = index;
    var startTime = getDateObject().valueOf();
    for (var arrayIndex = 0; arrayIndex < dataSrcLocationArray.length; arrayIndex++) {
        for (var i = 0; i < multipleEntryIDs.length; i++) {
            if (multipleEntryIDs[i] == "BLK_" + dataSrcLocationArray[arrayIndex]) {
                if (isQuery[dataSrcLocationArray[arrayIndex]] == "1") {
                    continue;
                }
                if (isControl[dataSrcLocationArray[arrayIndex]] == "1") {
                    continue;
                }
            }
        }

        var tableName = dataSrcLocationArray[arrayIndex];
        var query = "";
        if (isAuth && isAuth == true)
        {
            // If the screen is Auth then 
            // uses the current node's index for AUTH_TABLE table.	
            if ("AUTH_TABLE" == tableName) {
                query = getQueryWithId(tableName);
            } else {
                query = getXPathQuery(tableName);
            }
        } else {
            query = getXPathQuery(tableName);
        }
        var nodeList = null;
        if(dbDataDOM != null)
            nodeList = selectNodes(dbDataDOM,query);
        //Code to clear the row in the multiple entry block added by Senthil -14/04/05
        var htmlTableName = "BLK_" + tableName;
        var htmlTableObj = document.getElementById(htmlTableName);

        if (htmlTableObj) {
            if (htmlTableObj.getAttribute("VIEW")) {
                if (nodeList!= null && nodeList.length > 0) {
                    //	Reset The current dbIndexArray to 1 as the first record will be displayed.
                    dbIndexArray[tableName] = 1;
                    setDataInSE(tableName + "__", nodeList[0]);
                    continue;
                }
            }
        }

		if (htmlTableObj) {	
			if (htmlTableObj.tagName=='OJ-TABLE') {//Redwood_35438955
				deleteAllRows(htmlTableName);
			}
			else{			//Redwood_35438955
				continue;	//Redwood_35438955
			}				//Redwood_35438955
		}

        if (nodeList) { // If data exist for this node.
		    /* Added for pagination of multiple entry block -- start */
		    if ("Y" == getPagenationReq()) {
		        setDataInPageME(htmlTableName, nodeList,htmlTableName);	//REDWOOD_CHANGES
		    } else {
		        setDataInME(htmlTableName, nodeList);
		    }
            /*var rowIndex = 0;
            for (var nodeIndex = 0; nodeIndex < nodeList.length; nodeIndex++)
            {
                var currNode = nodeList.item(nodeIndex);
                var currNodeName = currNode.nodeName;
                if (htmlTableObj)
                {
                    var newRow = addNewRow(htmlTableName);
                    setRowData(htmlTableObj.tBodies[0].rows[rowIndex], currNode);
                    rowIndex++;
                } else
                {
                    for (var childIndex = 0; childIndex < currNode.childNodes.length; childIndex++)
                    {
                        var childNode = currNode.childNodes.item(childIndex);
                        var childNodeName = childNode.nodeName;
                        if (!isNodeATable(childNode))
                        {
                            var object = document.getElementById(currNodeName + "__" + childNodeName);
                            var data = "";
                            if (childNode.childNodes.length == 1)
                            {
                                data = childNode.childNodes.item(0).nodeValue;
                            }
                            setFieldData(object, data);
                        }
                    }
                    break;
                }

            }*/
            /* Added for pagination of multiple entry block -- end */
        }
    }
    var endTime = getDateObject().valueOf();
    return;
    //},0);//REDWOOD_35381225 REDWOOD_35409931 commented
}

/* Added for pagination of multiple entry block */
function setDataInME(htmlTableName, nodeList) {
    var rowIndex = 0;
    var htmlTableObj = document.getElementById(htmlTableName);	   
//REDWOOD_CHANGES
    if (htmlTableObj) {
       meArrayForAddDelete[htmlTableName]([]);
    if(nodeList.length>0){
    //setTimeout(function () { //REDWOOD_35264640
        addRowsFromDOM(htmlTableObj, htmlTableName, nodeList);
      //  },
        //0);
        //setTimeout(function () {
      try{
            updateAmountOrNumberConverter(htmlTableName);
       }catch(e)
         {
           
          }
    //},
    //0);
       
    }else{
		//35262971 starts
		//document.getElementById(htmlTableName).refresh();
		 setTimeout(function(){
		 document.getElementById(htmlTableName).refresh();
		 },0);
		 //35262971 ends
    }
    
      }else{	  
//REDWOOD_CHANGES
    for (var nodeIndex = 0; nodeIndex < nodeList.length; nodeIndex++) {
        var currNode = nodeList[nodeIndex];
//REDWOOD_CHANGES
        var currNodeName = currNode.nodeName;/*
        if (htmlTableObj) {
            var newRow = addNewRow(htmlTableName);
            setRowData(htmlTableObj.tBodies[0].rows[rowIndex], currNode);
            rowIndex++;
        } else {*/	  
//REDWOOD_CHANGES
            for (var childIndex = 0; childIndex < currNode.childNodes.length; childIndex++) {
                var childNode = currNode.childNodes[childIndex];
                var childNodeName = childNode.nodeName;
                if (!isNodeATable(childNode)) {
                    var object = document.getElementById(currNodeName + "__" + childNodeName);
                    var data = "";
                    if (childNode.childNodes.length == 1) {
                        data = childNode.childNodes[0].nodeValue;
                    } else if(childNode.childNodes.length > 1) {//Mozilla case added
                        data = getNodeText(childNode);
                    }
                    setFieldData(object, data);
                }
            }
            break;
        }
    }
}

/* Added for pagination of multiple entry block */
function setDataInPageME(htmlTableName, nodeList) {
    var rowIndex = 0;
    var htmlTableObj = document.getElementById(htmlTableName);
    for (var nodeIndex = 0; nodeIndex < nodeList.length; nodeIndex++) {
        var currNode = nodeList[nodeIndex];
        var currNodeName = currNode.nodeName;
        var i_actionFlag = "";
        if (htmlTableObj) {
			try{//Fix for 16904739
				var fnEval = new Function("pre_Navigate('" + htmlTableName + "', '" + i_actionFlag + "')");
				fnEval();
			}catch(e){}//Fix for 16904739
		    /* Added for pagination of multiple entry block */
		    if (typeof(meCalledAction) != 'undefined' && meCalledAction.toUpperCase() == 'SAVE') {
				setInnerText(document.getElementById("CurrPage__"+htmlTableName).children[0], 1);
			}
            var pgNumber = +getInnerText(document.getElementById("CurrPage__" + htmlTableName));
            /*var pgSize      = +document.getElementById("PageSize__"+htmlTableName).value */
            /* TO SPECIFY THE PAGE SIZE AT THE FUNCTION ID LEVEL */
            var pgSize = getPageSize(htmlTableName);
            var totalNoOfPgs = Math.ceil(nodeList.length / pgSize);
            setInnerText(document.getElementById("TotPage__" + htmlTableName).children[0],totalNoOfPgs);
            fnSetNavButtons(htmlTableName, pgNumber, totalNoOfPgs);
            var endIndex = pgNumber * pgSize;
            var startIndex = (htmlTableObj.tBodies[0].rows.length) + (pgNumber - 1) * pgSize;
            rowIndex = htmlTableObj.tBodies[0].rows.length;
            for (var nodeIndexME = startIndex; nodeIndexME < endIndex; nodeIndexME++) {
                if (nodeList[nodeIndexME] && htmlTableObj.tBodies[0].rows.length < pgSize) {
                    var newRow = addNewRow(htmlTableName);
                    setRowData(htmlTableObj.tBodies[0].rows[rowIndex], nodeList[nodeIndexME]);
                    rowIndex++;
                } else {
					try{//Fix for 16904739
						var fnEval = new Function("post_Navigate('" + htmlTableName + "', '" + i_actionFlag + "')");
						fnEval();
					}catch(e){}//Fix for 16904739
					/* Added for pagination of multiple entry block */
					meCalledAction	= 'SAVE';
                    return;
                }
            }
			/* Added for pagination of multiple entry block */
			meCalledAction	= 'SAVE';
			try{//Fix for 16904739
				var fnEval = new Function("post_Navigate('" + htmlTableName + "', '" + i_actionFlag + "')");
				fnEval();
			}catch(e){}//Fix for 16904739
            return;
        }
        else {
            for (var childIndex = 0; childIndex < currNode.childNodes.length; childIndex++) {
                var childNode = currNode.childNodes[childIndex];
                var childNodeName = childNode.nodeName;
                if (!isNodeATable(childNode)) {
                    var object = document.getElementById(currNodeName + "__" + childNodeName);
                    var data = "";
                    if (childNode.childNodes.length == 1) {
                        data = childNode.childNodes[0].nodeValue;
                    }
                    setFieldData(object, data);
                }
            }
            break;
        }
    }
}

/* Added for pagination of multiple entry block */
function getPageSize(htmlTableName) {
    try {
        var fnEval = new Function("return "+ htmlTableName + "__PageSize");  
        var tmpPgSize = fnEval();
    } catch(e) {
        try {
            //var tmpPgSize = eval("globalPagesize");
            var tmpPgSize = window["globalPagesize"];
        } catch(e) {
            var tmpPgSize = +document.getElementById("PageSize__" + htmlTableName).value;
        }
    }
    return tmpPgSize;
}

function showTabData(locationArray, paramDBDataDOM)
{
    isformat =false;
    if (arguments.callee.caller.toString())
    {
        if (arguments.callee.caller.toString().indexOf("fnInTab_") != -1) return;
    }

    //Changed By Vinitha for Subscreens in product

    buildIsQuery();
    buildIsControl(); // 16/09/08 Added for isControl DataSouce

    if (!locationArray)
    {
        locationArray = dataSrcLocationArray;
        paramDBDataDOM = dbDataDOM;
    }

    //dbDataDOM = paramDBDataDOM;
    for (var arrayIndex = 0; arrayIndex < locationArray.length; arrayIndex++) {
        if (isQuery[locationArray[arrayIndex]] == "1") {
            var parentSource = relationArray[locationArray[arrayIndex]].substring(0, relationArray[locationArray[arrayIndex]].indexOf("~"));
            if (document.getElementById("BLK_" + parentSource)) continue;
        }
        // 16/09/08  Added for isControl Data Source
        if (isControl[locationArray[arrayIndex]] == "1") {
            continue;
        }
        var tableName = locationArray[arrayIndex];
        var htmlTableName = "BLK_" + tableName;
        var htmlTable = document.getElementById(htmlTableName);
        var query = "";

        if (htmlTable) {
            query = getXPathQuery(tableName);
            if (htmlTable.getAttribute("VIEW")) { // If ME Block then Delete all rows... Added By Malaiah, On June 22,2005.
                ;
            } else {
                /*if(isQuery[locationArray[arrayIndex]] == "1") {
                                continue;
                            }*/
                deleteAllRows(htmlTableName);
            }
        } else {
            query = getQueryWithId(tableName);
        }
        var nodeList = null;
        if(paramDBDataDOM != null)
            nodeList = selectNodes(paramDBDataDOM,query);

        // If data is being displayed in ME block which is SE View 
        // Added By Malaiah , On June 22 , 2005
        if (htmlTable) {
            if (htmlTable.getAttribute("VIEW")) {
                if (nodeList!= null && nodeList.length > 0) {
                    //	Reset The current dbIndexArray to 1 as the first record will be displayed.
                    dbIndexArray[tableName] = 1;
                    setDataInSE(tableName + "__", nodeList[0]);
                    continue;
                }
            }
        }

        if (nodeList) { // If data exist for this node.
			/* Added for pagination of multiple entry block -- start */
                if ("Y" == getPagenationReq()) {
                    setDataInPageME(htmlTableName, nodeList);
                } else {
                    setDataInME(htmlTableName, nodeList);
                }
            /*var rowIndex = 0;
            for (var nodeIndex = 0; nodeIndex < nodeList.length; nodeIndex++)
            {
                var currNode = nodeList.item(nodeIndex);
                var currNodeName = currNode.nodeName;
                var htmlTableName = "BLK_" + currNode.nodeName;
                var htmlTableObj = document.getElementById(htmlTableName);
                if (htmlTableObj)
                {
                    if (nodeIndex == 0)
                    {
                        // First time clear the existing rows in the table.
                        deleteAllRows(htmlTableName);
                    }
                    var newRow = addNewRow(htmlTableName);
                    setRowData(htmlTableObj.tBodies[0].rows[rowIndex], currNode);
                    rowIndex++;
                } else
                {
                    for (var childIndex = 0; childIndex < currNode.childNodes.length; childIndex++)
                    {
                        var childNode = currNode.childNodes.item(childIndex);
                        var childNodeName = childNode.nodeName;
                        if (!isNodeATable(childNode))
                        {
                            var object = document.getElementById(currNodeName + "__" + childNodeName);
                            var data = "";
                            if (childNode.childNodes.length == 1)
                            {
                                data = childNode.childNodes.item(0).nodeValue;
                            }
                            setFieldData(object, data);
                        }
                    }
                    break;
                }

            }*/
			/* Added for pagination of multiple entry block -- end */
        }
    }
    return;
}

function showDescandants(currentTable)
{
    var childTable = findDescandants(currentTable);
    childTable = childTable.substring(0, childTable.length - 1);
    var childArray = childTable.split("~");

    if (childArray && childArray.length > 0)
    {
        /*setDataInMETable("BLK_" + childArray[0], currentTable, dbIndexArray[currentTable]);*/
		/* Added for pagination of multiple entry block */
        if (paginationReq == 'Y') {
            setDataInPageMETable("BLK_"+childArray[0], currentTable, dbIndexArray[currentTable]);
        } else{
            setDataInMETable("BLK_"+childArray[0], currentTable, dbIndexArray[currentTable]);
        }
        for (var index = 1; index < childArray.length; index++)
        {
            var parentTableName = getParentTableName(childArray[index]);
            var relationName = relationArray[childArray[index]];
            var relation = relationName.substring(relationName.length - 1);
            var tableObj = document.getElementById('BLK_' + childArray[index]);
            if (tableObj != null)
            {
                if (relation == '1' || fnIsSingleView(childArray[index]))
                {
                    var node = getNode(childArray[index], 1);
                    setDataInSE(childArray[index] + "__", node);
                } else
                {
                    /*setDataInMETable("BLK_" + childArray[index], parentTableName, dbIndexArray[parentTableName]);*/
					/* Added for pagination of multiple entry block */
                    if (paginationReq == 'Y') {
                        setDataInPageMETable("BLK_"+childArray[index], parentTableName, dbIndexArray[parentTableName]);
                    } else{
                        setDataInMETable("BLK_"+childArray[index], parentTableName, dbIndexArray[parentTableName]);
                    }
                }
            }
        }
    }
    return;
}

function fnIsSingleView(tableName)
{
    for (var i = 0; i < multipleEntryIDs.length; i++)
    {
        if (multipleEntryIDs[i] == 'BLK_' + tableName) return false;
    }
    return true;
}

function setFieldData(object, data)
{

    if (data && data != undefined)
    {
        if (object)
        {
            if (data.indexOf("\n") == 0) {
                data = data.substring(1,data.length);
            }
            setData(object, data);
        }
    } else
    {
        if (object)
        {
            setData(object, "");
        }
    }
}

function setData(currObject, value)
{
    var tagName = currObject.tagName;
    //value = gDecodeQuery(value);

    switch (tagName.toUpperCase())
    {	   
//REDWOOD_CHANGES
    case "OJ-INPUT-TEXT": //OJET Migration
    case "OJ-INPUT-PASSWORD":
    case "OJ-RADIOSET":
    case "OJ-TEXT-AREA":  
//REDWOOD_CHANGES
        {
            var DBC = NVL(currObject.getAttribute("DBC"));
            if (DBC) {		 
//REDWOOD_CHANGES
            currObject.value = value;
            if (value == "") {
                if (currObject.getAttribute("HIDDEN_TYPE")&& currObject.getAttribute("DEFAULT")) {
                    currObject.value = currObject.getAttribute("DEFAULT");
                }	   
//REDWOOD_CHANGES
                        }
                        break;
                    }
//REDWOOD_CHANGES        
}
//    case 'INPUT':
//        {
//            var DBC = NVL(currObject.getAttribute("DBC"));
//            if (DBC) {
//                var type = currObject.type;
//                switch (type.toUpperCase()) {
//                case 'TEXT':
//                    {
//                        if (currObject.getAttribute("DBC") == 'CONTSTAT') {
//                            var l_ContractAuditDesc = fnGetContractAuditDesc(value);
//                            if (l_ContractAuditDesc) currObject.value = l_ContractAuditDesc;
//                            else currObject.value = value;
//                        } else if (currObject.getAttribute("DBC") == 'PROCESSTAT') {
//                            var l_ProcessAuditDesc = fnGetProcessAuditDesc(value);
//                            if (l_ProcessAuditDesc) currObject.value = l_ProcessAuditDesc;
//                            else currObject.value = value;
//                        } else currObject.value = value;
//                        /* added by sandeep 23,Sept 2005.. 
//							Check if corresponding img or file is available and set the data accordingly.							
//						*/
//                        if (document.getElementsByName("IMG_" + DBC)[0] != null) {
//                            if (value.indexOf("\\") == -1 && value.lastIndexOf("_") > 0) { //the image at the web server.                        
//                                document.getElementsByName("IMG_" + DBC)[0].src = "Sign_Images/" + value;
//                                currObject.value = value.substring(value.lastIndexOf("_") + 1, value.length);
//                            } else if (value.indexOf("\\") > 0) //the image at the local m/c
//                            document.getElementsByName("IMG_" + DBC)[0].src = value;
//
//                            document.getElementsByName("IMG_" + DBC)[0].style.width = "75px";
//                            document.getElementsByName("IMG_" + DBC)[0].style.height = "75px";
//                            //currObject.value = value.substring(value.lastIndexOf("_"),value.length);
//                        } else if (document.getElementsByName("FILE_" + DBC)[0] != null) {
//                            document.getElementsByName("FILE_" + DBC)[0].href = "Sign_Images/" + value;
//                            setInnerText(document.getElementsByName("FILE_" + DBC)[0], value);
//                        }
//                        break;
//                    }
//
//                case 'HIDDEN':
//                    {
//                        currObject.value = value;
//                        if (getOuterHTML(currObject).indexOf("displayAmount") != -1) {
//                            currObject.value = value.replace(decimalSymbol, gDecimalSymbol);
//                            fireHTMLEvent(currObject, "onpropertychange");
//                        } else if (getOuterHTML(currObject).indexOf("displayFormattedNumber") != -1) {
//                            currObject.value = value.replace(decimalSymbol, ".");
//                            fireHTMLEvent(currObject, "onpropertychange");
//                        } else if (getOuterHTML(currObject).indexOf("displayDate") != -1) {
//                            fireHTMLEvent(currObject, "onpropertychange");
//                        } else if (getOuterHTML(currObject).indexOf("fnFormatTimeStamp") != -1) {
//                            fireHTMLEvent(currObject, "onpropertychange");
//                        }
//
//                        break;
//                    }
//                case 'PASSWORD':
//                    {
//                        currObject.value = value;
//                        break;
//                    }
//                case 'CHECKBOX':
//                    {
//                        if(value =="") { //ashok added this as part of 10.3
//                            currObject.checked = false;
//                            return;
//                        }
//                        if (currObject.getAttribute("ON")) {
//                            if (value == currObject.getAttribute("ON")) {
//                                currObject.checked = true;
//                            }
//                        } else {
//                            if (value == CHECK_B0X_SELECTED_VALUE) {
//                                currObject.checked = true;
//                            }
//                        }
//
//                        if (currObject.getAttribute("OFF")) {
//                            if (value == currObject.getAttribute("OFF")) {
//                                currObject.checked = false;
//                            }
//                        } else if (value == CHECK_B0X_UNSELECTED_VALUE) {
//                            currObject.checked = false;
//                        }
//
//                        showAuditData(currObject, value);
//                        break;
//                    }
//
//                case 'RADIO':
//                    {
//                        setRadioButtonData(currObject, value);
//                        break;
//                    }
//                }
//                break;
//            }
//        }
        case "OJ-SELECT-SINGLE": {
            var DBC = NVL(currObject.getAttribute("DBC"));
            if (DBC) {
                if (value != "") {	
//REDWOOD_CHANGES
                        currObject.value = value;
                }	  //REDWOOD_CHANGES
            }  //REDWOOD_CHANGES
                        break;
        }			
//REDWOOD_CHANGES
        case 'INPUT': {
            if (currObject.type.toUpperCase() == 'HIDDEN') {
                if (value == "") {
                    if (currObject.getAttribute("DEFAULT")) {
                        currObject.value = currObject.getAttribute("DEFAULT");	 
//REDWOOD_CHANGES
                            }
                        } else {
                    currObject.value = value;  //REDWOOD_CHANGES
                }	  //REDWOOD_CHANGES
            }
                        break;
        }
    case 'SELECT':
        {
            var DBC = NVL(currObject.getAttribute("DBC"));
            if (DBC) {
                setSelectedIndex(currObject, value);
            }		
//REDWOOD_CHANGES
            break;
        }
        case "OJ-INPUT-DATE-TIME":
        case "OJ-INPUT-DATE":{
            var DBC = NVL(currObject.getAttribute("DBC"));
   
               if (DBC) {
               
                    currObject.value =value;
                }
            
            break;
          }
        case "OJ-INPUT-NUMBER": {
         var DBC = NVL(currObject.getAttribute("DBC"));
            if (DBC) {
                if(value == ""){
                   // currObject.value = null;
                }else{
                    currObject.value =Number(value);
                }
            }
            break;
        }
        case 'OJ-SWITCH': {
            if (value == "") {
                if (currObject.getAttribute("DEFAULT"))
                    currObject.value = true;
                else 
                    currObject.value = false;
                break;
            }
            if (currObject.getAttribute("ON")) {
                if (value == currObject.getAttribute("ON")) {
                    currObject.value = true;
                }
            }
            else {
                if (value == CHECK_B0X_SELECTED_VALUE) {
                    currObject.value = true;
                }
            }
            if (currObject.getAttribute("OFF")) {
                if (value == currObject.getAttribute("OFF")) {
                    currObject.value = false;
                }
            }
            else if (value == CHECK_B0X_UNSELECTED_VALUE) {
                currObject.checked = false;
            }
            showAuditData(currObject, value);	
//REDWOOD_CHANGES
            break;
        }
    case 'TEXTAREA':
        {
            var DBC = NVL(currObject.getAttribute("DBC"));
            if (DBC) {
                currObject.value = value;
            }
            break;
        }
    case 'LABEL':
        {
            var DBC = NVL(currObject.getAttribute("DBC"));
            if (DBC) {
                currObject.innerHTML = value;
            }
        }

    }

}  
//REDWOOD_CHANGES
function updateAmountOrNumberConverter(parentNodeName) {
    //debugger;
    var ojTableObj = getTableObjForBlock(parentNodeName);

       if(!ojTableObj.tBodies[0].rows[0] || (ojTableObj.tBodies[0].rows[0] && ojTableObj.tBodies[0].rows[0].cells.length == 1 )){
              setTimeout(function(){updateAmountOrNumberConverter(parentNodeName);},100);
              return;
       }

    if (ojTableObj.tBodies[0].rows.length > 0) {
        for (var i = 0;i < ojTableObj.tBodies[0].rows.length;i++) {
            var ojText = ojTableObj.tBodies[0].rows[i].getElementsByTagName('OJ-INPUT-TEXT');
            for (k = 0;k < ojText.length;k++) {
                if (ojText[k].getAttribute("converter") != null) {
                    var converterName = ojText[k].getAttribute("converter");
                    if (converterName.includes("numberConverter")) {
                        var formattedValue = displayFormattedNumber(ojText[k], ojText[k].value);
                        ojText[k].value = formattedValue;
                    }
                    if (converterName.includes("amountConverter")) {
						if  (ojText[k].value !="" && ojText[k].value !=null ){//REDWOOD_35850089
                        var ccy = getCurrencyValue(ojText[k],  ojText[k].getAttribute("related_field"), false, true);
                        var mb3Amount = new MB3Amount( ojText[k].value, true, ccy);
                        if (mb3Amount.valid) {
                            ojText[k].value = mb3Amount.getDisplayAmount();
                        }
                         } //REDWOOD_35850089
                    }
                    //                   var converterName = ojText[k].getAttribute("converter");
                    //                   if(converterName.indexOf("numberConverter")!= -1){
                    //                        var id = ojText[k].getAttribute(":id").replace("'+ row.index]]","").replace("[['","").replace("RC","");
                    //                    converterName = "numberConverter"+id;
                    //                    var fnEval = new Function( converterName+i+"=getDefaultNumberConverter('"+id+"RC"+i+"',  false,'"+ ojText[k].getAttribute("name")+"');"+  converterName+i+".index="+i);
                    //                    fnEval();
                    //                    ojText[k].setAttribute("converter","{{numberConverter"+id+i+"}}");
                    //                   }
                }
            }

        }

    }

}	 
//REDWOOD_CHANGES

function getFieldData(currObject)
{
    var fieldValue = "";
    var tagName = currObject.tagName;

    switch (tagName.toUpperCase())
    {
    case 'INPUT':
        {
            var DBC = NVL(currObject.getAttribute("DBC"));
            var type = currObject.type;
            switch (type.toUpperCase())
            {
            case 'TEXT':
                {
                    fieldValue = currObject.value
                    break;
                }
            case 'HIDDEN':
                {
                    fieldValue = currObject.value;
                    if ( getOuterHTML(currObject).indexOf("displayAmount") != -1) {
                        fieldValue = fieldValue.replace(gDecimalSymbol,decimalSymbol);
                    }else if (getOuterHTML(currObject).indexOf("displayFormattedNumber") != -1) {
                        fieldValue = fieldValue.replace(".",decimalSymbol);
                    }
                    break;
                }
            case 'PASSWORD':
                {
                    fieldValue = currObject.value;
                    break;
                }
            case 'CHECKBOX':
                {
                    if (currObject.checked) {
                        if (currObject.getAttribute("ON")) {
                            fieldValue = currObject.getAttribute("ON");
                        } else {
                            fieldValue = CHECK_B0X_SELECTED_VALUE;
                        }
                    } else {
                        if (currObject.getAttribute("OFF")) {
                            fieldValue = currObject.getAttribute("OFF");
                        } else {
                            fieldValue = CHECK_B0X_UNSELECTED_VALUE;
                        }
                    }

                    break;
                }
            case 'RADIO':

                {
                    fieldValue = getRadioButtonData(currObject);
                    break;
                }
            }
            break;
        }
    case 'SELECT':
        {
            fieldValue = getSelectedIndexValue(currObject);
            break;
        }
    case 'TEXTAREA':
        {
            fieldValue = currObject.value;
            break;
        }		
//REDWOOD_CHANGES
        case 'OJ-SWITCH': {
                    if (currObject.value) {
                        if (currObject.getAttribute("ON")) {
                            fieldValue = currObject.getAttribute("ON");
                        }
                        else {
                            fieldValue = CHECK_B0X_SELECTED_VALUE;
                        }
                    }
                    else {
                        if (currObject.getAttribute("OFF")) {
                            fieldValue = currObject.getAttribute("OFF");
                        }
                        else {
                            fieldValue = CHECK_B0X_UNSELECTED_VALUE;
                        }
                    }

                    break;
                }
        case 'OJ-INPUT-NUMBER': 
        case 'OJ-INPUT-DATE': 
        case 'OJ-SELECT-SINGLE': 
        case 'OJ-RADIOSET': 
        case 'OJ-TEXT-AREA': 
        case 'OJ-INPUT-DATE-TIME':
        case 'OJ-INPUT-PASSWORD':
        case 'OJ-INPUT-TEXT': { //OJET Migration
            fieldValue = currObject.value;
            if(fieldValue==null || fieldValue== ""){
                fieldValue = currObject.getAttribute("value") || currObject.rawValue ;
            }
            break;
        } 
//REDWOOD_CHANGES
    }
    return fieldValue;
}

function getBranchIdforMultipleEntry(curObject, isMultiple, id)
{
    if (typeof(screenType) != 'undefined' && curObject && screenType == 'WB' && isMultiple)
    {
        var parentTagObj = curObject.parentNode.parentNode.parentNode;
        if (curObject.type == "hidden") parentTagObj = curObject.parentNode.parentNode;
        var parentTagName = parentTagObj.tagName;
        if (parentTagName == 'TD')
        {
            parentTagObj = parentTagObj.parentNode;
        }
        return parentTagObj.sectionRowIndex + 1;
    } else return id;
}

function appendData(tabObject) {

    var tabArray = new Array();
    if (tabObject) {
        tabArray[tabArray.length] = tabObject;
    }

    if (typeof(l_HeaderTabId) != 'undefined' && l_HeaderTabId != "") {
        if (document.getElementById("TBLPage" + l_HeaderTabId)) tabArray[tabArray.length] = document.getElementById("TBLPage" + l_HeaderTabId);
    }
	//REDWOOD_CHANGES
  /*  if (typeof(gIsAuditExist) != 'undefined' && gIsAuditExist) {
        if (document.getElementById("DIV_BLK_AUDIT")) tabArray[tabArray.length] = document.getElementById("DIV_BLK_AUDIT");
    }*/	 
//REDWOOD_CHANGES

    for (var tabCnt = 0; tabCnt < tabArray.length; tabCnt++) {
        var operation = gAction;

        if (operation == 'NEW' || operation == 'MODIFY' || operation == 'COPY' || operation == 'CLOSE' || operation == 'REOPEN' || operation == 'POPULATERENOG' || operation == 'DEFAULT' || operation == 'LIQUIDATE' || operation == 'LIQUIDATE_QRY' || operation == 'PRD_DFLT' || operation == 'AUTH_QRY' || operation == 'ALLOCATERENOG' || operation == 'AUTH' || operation == 'HOLD' || operation == 'REVERSE' || operation == 'ROLLOVER' || operation == 'CONFIRM_QRY' || operation == 'CONFIRM' || operation == 'RUNCLBATCH' || operation == 'CHARGESQUERY' || operation == 'CURRSTATQRY' || operation == 'ACTIVATEINA' || operation == 'POPULATE' || operation == 'POPULATEDUE' || operation == 'MATQUERY' || operation == 'EXPLODE' || operation == 'VIEWDETAILRENOG' || operation == 'MOD_DEFAULT' || operation == 'ALLOCATE' || operation == 'DEFAULTRENOG' || operation == 'CREATEAMND' || operation == 'VIEWMODVAMI' || operation == 'EDITSCHEDULES' || operation == 'POPULATEROLL' || operation == 'ALLOCATEROLL' || operation == 'DEFAULTROLL' || operation == 'ACTIVEROLL' || operation == 'VIEWDETAILROLL' || operation == 'LINKLINE' || operation == 'PROMOTION' || operation == 'SG_DEFAULT' || operation == 'GETSCORE' || operation == 'TMP_DFLT' || operation =='INIT') { //Fix for Bug No: 19710048

            var inputElements = tabArray[tabCnt].getElementsByTagName("INPUT");
            var selectElements = tabArray[tabCnt].getElementsByTagName("SELECT");
            var textAreaElements = tabArray[tabCnt].getElementsByTagName("TEXTAREA");
            var tableElements = tabArray[tabCnt].getElementsByTagName("OJ-TABLE");//REDWOOD_CHANGES
            var isME=false;
//REDWOOD_CHANGES
            //appendInputData(inputElements, '', 1, isME);
            appendOJInputData(tabArray[tabCnt], '', 1, isME);
            //appendSelectData(selectElements, '', 1, isME);
            //appendOJInputData(selectElements, '', 1, isME);
            //appendTextAreaData(textAreaElements, '', 1, isME);
            //appendOJInputData(textAreaElements, '', 1, isME);	  
//REDWOOD_CHANGES
			//redwood_35404293 start
            //appendTableData(tableElements, '', 1, isME);
			if(tableElements.length>0){//REDWOOD_35503982
				let myPromise = new Promise(function(myResolve, myReject) {
						   myResolve(appendTableData(tableElements, '', 1, isME));
				});
			}
			//redwood_35404293	end		
        }
    } //end of looping the tabArray
}

//Added by sandeep -Aug 24,2005
function appendFileData(textObject, id, DBT)
{

    //alert('inside DataBinding.js->appendFileData()');
    var DBC = textObject.getAttribute("DBC");
    //var value    = NVL(textObject.value);
    var value = NVL(textObject.src); // From src wil take. TODO
    value = gEncodeData(value);
    var seqNo = "";

    if (DBC != null)
    {
        var rootNode = getNode(DBT, id);
        var fileContent = "";
        if (gAction != "EXECUTEQUERY")
        {
            fileContent = sendBinaryData(value); // Using Binary Reading ADODB Stream
        }
        value = value.substring(value.lastIndexOf('\\') + 1, value.length);
        var recID = getNodeText(selectSingleNode(dbDataDOM,"//" + DBT).attributes[0]);
        if (fileContent != '')
        {
            seqNo = getNodeText(selectNodes(dbDataDOM,"//" + DBT + "/SPECIMENNO")[recID - 1]);
            var attachmentIndex = DBT + '__' + DBC;
            fileAttachments[attachmentIndex] = "<ATTACHMENT TYPE=\"" + DBT + "\"  ID=\"" + recID + "\"  COLNAME=\"" + DBC + "\"  FNAME=\"" + value + "\">" + "<SPECIMENNO>" + seqNo + "</SPECIMENNO>" + "<VALUE>" + "<![CDATA[ " + fileContent + "]]>" + "</VALUE>" + "</ATTACHMENT>";

        } else
        //alert("Unable to read file or the file content is empty");
        alert(mainWin.getItemDesc("LBL_ READ_FILE"));
    }
    return;
}

//Sandeep Aug 14,2007
function sendBinaryData(value)
{

    var attachXML = "<ATTACHMENT></ATTACHMENT>";
    var dom=loadXMLDoc(attachXML);
    var img = dom.createElement("IMAGE");
    dom.documentElement.appendChild(img);
    img.dataType = "bin.base64";
    var stream = new ActiveXObject("ADODB.Stream");
    stream.type = 1;
    stream.open();
    if (value != "") stream.loadFromFile(value);
    var contents = stream.read;
    img.nodeTypedValue = contents;
    var content = getNodeText(selectSingleNode(dom,"//ATTACHMENT/IMAGE"));
    stream.close();
    return content;

}	  
//REDWOOD_CHANGES
function getPgSize(blockId) {
    /*12.0.4 UI performance changes starts*/
    if (typeof (multipleEntryPageSize) != "undefined")// Else Should remove
        return Number(multipleEntryPageSize[blockId]);
    else {
        var tableObj = getTableObjForBlock(blockId);
        return Number(tableObj.getAttribute("pgsize"));
    }
    /*12.0.4 UI performance changes ends*/
}
function appendTableValue(tableObject, id, DBT) {//OJET Migration
    var rowList = tableObject.tBodies[0].rows;
    var tblId = tableObject.parentNode.parentNode.id;//OJET-Arun
    
    var cPage = Number(document.getElementById('paging_'+tblId+'_nav_input').value) - 1;//OJET-Arun
    if (cPage ==  - 1) {
        cPage = 0;
    }
    var rowIndx = 0;
    //var pgsize = Number(tableObject.getAttribute("pgsize"));
    var pgsize = getPgSize(tblId);/*12.0.4 UI performance changes */
    for (var rowIndex = 0;rowIndex < meArrayForAddDelete[tblId]().length;rowIndex++) {
        var currRow = rowList[rowIndex];
        var isME = true;
        rowIndx = (pgsize * cPage) + rowIndex;
        if(currRow){
        appendOJInputData(currRow, DBT, rowIndx + 1, isME); //OJET Migration
        }
        
       /* appendInputData(currRow, DBT, rowIndx + 1, isME);
        appendSelectData(currRow, DBT, rowIndx + 1, isME);
        appendTextAreaData(currRow, DBT, rowIndx + 1, isME);*/
    }
}
function appendTableValue_0ld(tableObject, id, DBT) {
    var rowList = tableObject.tBodies[0].rows;
     var tblId = tableObject.parentNode.parentNode.id;//OJET-Arun
    
    var cPage = Number(document.getElementById('paging_'+tblId+'_nav_input').value) - 1;//OJET-Arun
 //REDWOOD_CHANGES 
    for (var rowIndex = 0; rowIndex < rowList.length; rowIndex++) {
        var currRow = rowList[rowIndex];
       /*var elementList = currRow.all;*/
        var isME = true;
        appendInputData(currRow.getElementsByTagName("INPUT"), DBT, rowIndex+1, isME);
        appendSelectData(currRow.getElementsByTagName("SELECT"), DBT, rowIndex+1, isME);
        appendTextAreaData(currRow.getElementsByTagName("TEXTAREA"), DBT, rowIndex+1, isME);
    }
}

/*function appendInputData(elementList, isME, dataBaseTable) {*/
function appendInputData(elementList, dataBaseTable, id, isME) {
    for (var elementIndex = 0; elementIndex < elementList.length; elementIndex++) {
            var currObject = elementList[elementIndex];
            var type = currObject.type;
        var isMultiple = isME;
        var DBT = "";
        var DBC = "";
        if (typeof(dataBaseTable) != 'undefined' && dataBaseTable != "") {
            DBT = dataBaseTable;
        } else {
        DBT = currObject.getAttribute("DBT");
        }
        DBC = currObject.getAttribute("DBC");
        if (DBT && DBT != "") {
            DBT = DBT.toUpperCase();
        }
        if (isME == false) {
            id = dbIndexArray[DBT];
        }
        if (DBC && DBC != "") {
            DBC = DBC.toUpperCase();
        }
        if(isME){
             if (DBC == null || typeof(DBC) == 'undefined') 
                continue;
        }else{
            if ((DBT == null || typeof(DBT) == 'undefined') && (DBC == null || typeof(DBC) == 'undefined')) 
                continue;
        }
        if (DBT && DBT != "") {
            //condition to continue if currentobject isQuery is 1 by Senthil - 29/03/05
            if (isQuery[DBT] == "1") {
                continue;
            }
            //condition to continue if currentobject isControl is 1 16/09/08
            buildIsControl();
            if (isControl[DBT] == "1") {
                continue;
            }
        }
        /* Commented by Hitesh -- Not Required
        // if field is disabled then we should not append the value 
        // Added by Malaiah on June 14, 2005
        if (currObject.disabled == true) {
            // The fields ONCE_AUTH, AUTH_STAT, RECORD_STAT are always disabled, we have to append these.
            if (DBC) {
                if (!(DBC == "ONCE_AUTH" || DBC == "AUTH_STAT" || DBC == "RECORD_STAT")) {
                continue;
            }
            }
        }
        */
        if (typeof(screenType) != 'undefined' && screenType == 'WB') {
            try {
                for (var i = 0; i < multipleEntryIDs.length; i++) {
                    if (multipleEntryIDs[i] == ('BLK_' + DBT)) {
                        isMultiple = true;
                        break;
                    }
                }
            } catch(e) {}
        }
        /*var id = dbIndexArray[DBT];*/
        switch (type.toUpperCase()) {
                    case 'TEXT':
                        {
                if (DBT && DBT != "") {
                    id = getBranchIdforMultipleEntry(currObject, isMultiple, id);
                    appendTextFieldValue(currObject, id, DBT);
                }
                            break;
                        }

                    case 'HIDDEN':
                        {
                if (DBT && DBT != "") {
                    id = getBranchIdforMultipleEntry(currObject, isMultiple, id);
                    appendTextFieldValue(currObject, id, DBT);
                        }
                            break;
                        }
        case 'PASSWORD':
                        {
                if (DBT && DBT != "") {
                    id = getBranchIdforMultipleEntry(currObject, isMultiple, id);
                    appendTextFieldValue(currObject, id, DBT);
                            }
                            break;
                        }
        case 'CHECKBOX':
            {
                if (DBT && DBT != "") {
                    id = getBranchIdforMultipleEntry(currObject, isMultiple, id);
                    appendCheckBoxValue(currObject, id, DBT);
                    }
                    break;
                }
        case 'RADIO':
                {
                if (DBT && DBT != "") {
                    if (currObject.checked) {
                        //Kirti 31-Jan starts
                        id = getBranchIdforMultipleEntry(currObject, isMultiple, id);
                        //Kirti 31-Jan Ends
                        appendRadioValue(currObject, id, DBT);
                    }
                }
                    break;
                }
            }
    }
}
    
function appendSelectData(elementList, dataBaseTable, id, isME) {
    for (var elementIndex = 0; elementIndex < elementList.length; elementIndex++) {
        var currObject = elementList[elementIndex];
        var type = currObject.type;
        var isMultiple = isME;
        var DBT = "";
        var DBC = "";
        if (typeof(dataBaseTable) != 'undefined' && dataBaseTable != "") {
            DBT = dataBaseTable;
        } else {
            DBT = currObject.getAttribute("DBT");
        }
        DBC = currObject.getAttribute("DBC");
        if (DBT && DBT != "") {
            DBT = DBT.toUpperCase();
        }
        if (isME == false) {
            id = dbIndexArray[DBT];
        }
        if (DBC && DBC != "") {
            DBC = DBC.toUpperCase();
        }
            if(isME){
             if (DBC == null || typeof(DBC) == 'undefined') 
                    continue;
            }else{
            if ((DBT == null || typeof(DBT) == 'undefined') && (DBC == null || typeof(DBC) == 'undefined')) 
                continue;
        }
        if (DBT && DBT != "") {
            //condition to continue if currentobject isQuery is 1 by Senthil - 29/03/05
            if (isQuery[DBT] == "1") {
                continue;
            }
            //condition to continue if currentobject isControl is 1 16/09/08
            buildIsControl();
            if (isControl[DBT] == "1") {
                continue;
            }
        }
        /* Commented by Hitesh -- Not Required
        // if field is disabled then we should not append the value 
        // Added by Malaiah on June 14, 2005
        if (currObject.disabled == true) {
            // The fields ONCE_AUTH, AUTH_STAT, RECORD_STAT are always disabled, we have to append these.
            if (DBC) {
                if (!(DBC == "ONCE_AUTH" || DBC == "AUTH_STAT" || DBC == "RECORD_STAT")) {
                    continue;
             }
                }
                    }
        */
        if (typeof(screenType) != 'undefined' && screenType == 'WB') {
            try {
                for (var i = 0; i < multipleEntryIDs.length; i++) {
                    if (multipleEntryIDs[i] == ('BLK_' + DBT)) {
                        isMultiple = true;
                    break;
                }                
                }
            } catch(e) {}
            }
        /*var id = dbIndexArray[DBT];*/
        if (DBT && DBT != "") {
            id = getBranchIdforMultipleEntry(currObject, isMultiple, id);
            appendSelectFieldValue(currObject, id, DBT);
        }
        }
    }

function appendTextAreaData(elementList, dataBaseTable, id, isME) {
    for (var elementIndex = 0; elementIndex < elementList.length; elementIndex++) {
        var currObject = elementList[elementIndex];
        var type = currObject.type;
        var isMultiple = isME;
        var DBT = "";
        var DBC = "";
        if (typeof(dataBaseTable) != 'undefined' && dataBaseTable != "") {
            DBT = dataBaseTable;
        } else {
            DBT = currObject.getAttribute("DBT");
        }
        DBC = currObject.getAttribute("DBC");
        if (DBT && DBT != "") {
            DBT = DBT.toUpperCase();
        }
        if (isME == false) {
            id = dbIndexArray[DBT];
        }
        if (DBC && DBC != "") {
            DBC = DBC.toUpperCase();
        }
            if(isME){
             if (DBC == null || typeof(DBC) == 'undefined') 
                    continue;
            }else{
            if ((DBT == null || typeof(DBT) == 'undefined') && (DBC == null || typeof(DBC) == 'undefined')) 
                continue;
        }
        if (DBT && DBT != "") {
            //condition to continue if currentobject isQuery is 1 by Senthil - 29/03/05
            if (isQuery[DBT] == "1") {
                    continue;
             }
            //condition to continue if currentobject isControl is 1 16/09/08
            buildIsControl();
            if (isControl[DBT] == "1") {
                continue;
            }
        }
        /* Commented by Hitesh -- Not Required
        // if field is disabled then we should not append the value 
        // Added by Malaiah on June 14, 2005
        if (currObject.disabled == true) {
            // The fields ONCE_AUTH, AUTH_STAT, RECORD_STAT are always disabled, we have to append these.
            if (DBC) {
                if (!(DBC == "ONCE_AUTH" || DBC == "AUTH_STAT" || DBC == "RECORD_STAT")) {
                    continue;
                }
            }
        }
        */
        var isMultiple = false;
        if (typeof(screenType) != 'undefined' && screenType == 'WB') {
            try {
                for (var i = 0; i < multipleEntryIDs.length; i++) {
                    if (multipleEntryIDs[i] == ('BLK_' + DBT)) {
                        isMultiple = true;
                        break;
                    }
                }
            } catch(e) {}
        }
        /*var id = dbIndexArray[DBT];*/
        if (DBT && DBT != "") {
            appendTextFieldValue(currObject, id, DBT);
        }
    }
}

function appendTableData(elementList, dataBaseTable, id, isME) {
    for (var elementIndex = 0; elementIndex < elementList.length; elementIndex++) {
 //REDWOOD_CHANGES
 var currObject = getTableObjForBlock(elementList[elementIndex].getAttribute("ID"));
// var currObject = elementList[elementIndex];
 
 if (typeof(dataBaseTable) != 'undefined' && dataBaseTable != "") {
            DBT = dataBaseTable;
        } else {
            DBT = elementList[elementIndex].getAttribute("DBT");
        }
   if (typeof(currObject) != 'undefined' && currObject!= "") { ////redwood_35404293 
    appendTableValue(currObject, id, DBT);
	}////redwood_35404293
 }
}

function appendTableData_old(elementList, dataBaseTable, id, isME) {
    for (var elementIndex = 0; elementIndex < elementList.length; elementIndex++) {
//REDWOOD_CHANGES
        var currObject = elementList[elementIndex];
        var type = currObject.type;
        var isMultiple = isME;
        var DBT = "";
        var DBC = "";
        if (typeof(dataBaseTable) != 'undefined' && dataBaseTable != "") {
            DBT = dataBaseTable;
        } else {
            DBT = currObject.getAttribute("DBT");
        }
        DBC = currObject.getAttribute("DBC");
        if (DBT && DBT != "") {
            DBT = DBT.toUpperCase();
        }
        if (DBC && DBC != "") {
            DBC = DBC.toUpperCase();
        }
            if(isME){
             if (DBC == null || typeof(DBC) == 'undefined') 
                    continue;
            }else{
            if ((DBT == null || typeof(DBT) == 'undefined') && (DBC == null || typeof(DBC) == 'undefined')) 
                continue;
        }
        if (DBT && DBT != "") {
            //condition to continue if currentobject isQuery is 1 by Senthil - 29/03/05
            if (isQuery[DBT] == "1") {
                continue;
            }
            //condition to continue if currentobject isControl is 1 16/09/08
            buildIsControl();
            if (isControl[DBT] == "1") {
                    continue;
}
        }
        /* Commented by Hitesh -- Not Required
        // if field is disabled then we should not append the value 
        // Added by Malaiah on June 14, 2005
        if (currObject.disabled == true) {
            // The fields ONCE_AUTH, AUTH_STAT, RECORD_STAT are always disabled, we have to append these.
            if (DBC) {
                if (!(DBC == "ONCE_AUTH" || DBC == "AUTH_STAT" || DBC == "RECORD_STAT")) {
                    continue;
                }
            }
        }
        */
        if (typeof(screenType) != 'undefined' && screenType == 'WB') {
            try {
                for (var i = 0; i < multipleEntryIDs.length; i++) {
                    if (multipleEntryIDs[i] == ('BLK_' + DBT)) {
                        isMultiple = true;
                        break;
                    }
                }
            } catch(e) {}
        }
        /*var id = 1;*/
        if (DBT && DBT != "") {
            appendTableValue(currObject, id, DBT);
        }
    }
}
function appendSelectFieldValue(selectObject, id, DBT)
{
    var DBC = selectObject.getAttribute("DBC");
    var selectedInd = selectObject.selectedIndex;
    var value = "";

    if (DBC != null)
    {
        DBC = DBC.toUpperCase(); //Changed By Kirti 13-Jan-08
        if (selectedInd != -1)
        {
            value = NVL(selectObject.options[selectedInd].value);
            value = gEncodeData(value);
        }
		/* Added for pagination of multiple entry block -- 'SELECT' type field Starts..*/
		if (paginationReq == 'Y') {
		
			if(document.getElementById("PageSize__BLK_"+DBT)){
				var pgSize      = getPageSize("BLK_"+DBT);
				var pgNumber    = + getInnerText(document.getElementById("CurrPage__BLK_"+DBT));
				var newId = (((pgNumber - 1)*pgSize) + id);
			}
			if(newId){
				var rootNode = getNode(DBT, newId);
			}else{
				var rootNode = getNode(DBT, id);
			}
		} else {
			/* Added for pagination of multiple entry block -- 'SELECT' type field Ends..*/
			var rootNode = getNode(DBT, id);
		}
        var currNode = selectSingleNode(rootNode,DBC);
        if (currNode)
        {
            setNodeText(currNode, value);
        } else
        {
            //Enclosing value with the CDATASection by Sankarganesh on 18/03/05.
            var newNode = dbDataDOM.createElement(DBC);
            var cDataNode = dbDataDOM.createCDATASection(value);
            newNode.appendChild(cDataNode);
            rootNode.appendChild(newNode);

        }
    }
    return;
}

function appendTextFieldValue(textObject, id, DBT)
{

    var DBC = textObject.getAttribute("DBC"); 
//REDWOOD_CHANGES
    var value = '';
    var formatter = textObject.getAttribute('day-formatter');
    var converterType = textObject.getAttribute('converter');
    if ((formatter && formatter.includes('dayFormatter')) || (converterType && (converterType.includes("numberConverter") || converterType.includes("amountConverter"))) || (textObject.tagName && textObject.tagName.toUpperCase() == "OJ-RADIOSET" || textObject.tagName.toUpperCase() == "OJ-SELECT-SINGLE")) {
        value = NVL(textObject.value);
    } else {
        value = NVL(textObject.rawValue);
    }		
//REDWOOD_CHANGES
    var value = NVL(textObject.value);	   
//REDWOOD_CHANGES
    var txtObjHTML = getOuterHTML(textObject);
    if (txtObjHTML.indexOf("amountConverter") !=  - 1 || txtObjHTML.indexOf("numberConverter") !=  - 1){
       var re = new RegExp(gDigitGroupingSymbol, "g");
        if (typeof value == "string") {
            value = value.replace(re, "");
        }     
    }
//    if (getOuterHTML(textObject).indexOf("displayAmount") != -1) value = value.replace(".", decimalSymbol);
//    if (getOuterHTML(textObject).indexOf("displayFormattedNumber") != -1) 
//        value = value.replace(".", decimalSymbol);   
//REDWOOD_CHANGES
   
    if (gAction == "EXECUTEQUERY")
    {
        value = gEncodeData(value);
    }

    if (DBC != null && DBC != "")
    {
        DBC = DBC.toUpperCase();
		/* Added for pagination of multiple entry block */
		/* The get the exact id of node */
		if(document.getElementById("PageSize__BLK_"+DBT)){
			/*var pgSize      = +document.getElementById("PageSize__BLK_"+DBT).value;*/
			var pgSize      = getPageSize("BLK_"+DBT);
			var pgNumber    = +getInnerText(document.getElementById("CurrPage__BLK_"+DBT));
			var newId = (((pgNumber - 1)*pgSize) + id);
		}
		if(newId){
			var rootNode = getNode(DBT, newId);
		}else{
			var rootNode = getNode(DBT, id);
		}
        var currNode = selectSingleNode(rootNode,DBC);
         if(value!=null && textObject.tagName.toUpperCase() == 'OJ-INPUT-DATE-TIME'){ //REDWOOD_CHANGES
          // value=value.replace('T', ' ').replace('Z', ''); 	  //REDWOOD_CHANGES
		  value = value.substring(0, 10); //REDWOOD_35903742
        }
        if (currNode)
        {
            if (currNode.nodeName == 'CONTSTAT')
            {
                var l_ContractAuditVal = fnGetContractAuditValue(value);
                if (l_ContractAuditVal) setNodeText(currNode, l_ContractAuditVal);
                else setNodeText(currNode, value);
            } else if (currNode.nodeName == 'PROCESSTAT')
            {
                var l_ProcessAuditVal = fnGetProcessAuditValue(value);
                if (l_ProcessAuditVal) setNodeText(currNode, l_ProcessAuditVal);
                else setNodeText(currNode ,value);
            } else
            {
                if (textObject.tagName == 'OJ-TEXT-AREA')  //REDWOOD_CHANGES
                {
                    if (currNode.childNodes)
                    {
                        if (currNode.childNodes.length > 0)
                        {
                            if(currNode.childNodes.length == 1) {//Mozilla case added
                            currNode.removeChild(currNode.childNodes[0]);
                            var cDataNode = dbDataDOM.createCDATASection(value);
                            currNode.appendChild(cDataNode);
                            } else {//Mozilla case added
                                setNodeText(currNode, value);
                            }
                        } else
                        {
                            rootNode.removeChild(currNode);
                            var newNode = dbDataDOM.createElement(DBC);
                            var cDataNode = dbDataDOM.createCDATASection(value);
                            newNode.appendChild(cDataNode);
                            rootNode.appendChild(newNode);
                        }
                    }
                } else setNodeText(currNode, value);
            }
        } else
        {
            //Enclosing value with the CDATASection by Sankarganesh on 18/03/05.
            var newNode = dbDataDOM.createElement(DBC);
            var cDataNode = dbDataDOM.createCDATASection(value);
            newNode.appendChild(cDataNode);
            rootNode.appendChild(newNode);
        }
    }
    return;
}

function appendRadioValue(radioObject, id, DBT)
{

    //var DBC  = radioObject.DBC;
    var DBC = getDBCForRadioObject(radioObject);
    var value = NVL(radioObject.value);
    if (DBC != null)
    {
        DBC = DBC.toUpperCase(); //Changed By Kirti 13-Jan-08
        var rootNode = getNode(DBT, id);
        var currNode = selectSingleNode(rootNode,DBC);
        if (currNode)
        {
            setNodeText(currNode, value);
        } else
        {
            var newNode = dbDataDOM.createElement(DBC);
            setNodeText(newNode, value);
            rootNode.appendChild(newNode);
        }
    }
    return;
}

function getDBCForRadioObject(radioObject)
{
    var DBC = "";
    var radioElements = document.getElementsByName(radioObject.name);
    for (var elementIndex = 0; elementIndex < radioElements.length; elementIndex++)
    {
        if (radioElements[elementIndex].getAttribute("DBC"))
        {
            DBC = radioElements[elementIndex].getAttribute("DBC");
            break;
        }
    }
    return DBC;
}

function appendCheckBoxValue(checkBoxObject, id, DBT)
{

    var DBC = checkBoxObject.getAttribute("DBC");
    var value = NVL(checkBoxObject.value);
    if (DBC != null)
    {
        DBC = DBC.toUpperCase(); //Changed By Kirti 13-Jan-08
		 //Bug 14779188  Changes Starts
        if(document.getElementById("PageSize__BLK_"+DBT)){
			/*var pgSize      = +document.getElementById("PageSize__BLK_"+DBT).value;*/
			var pgSize      = getPageSize("BLK_"+DBT);
			//fix for 14785947 starts
			//var pgNumber = +document.getElementById("CurrPage__BLK_"+DBT).innerText;
			var pgNumber    = +getInnerText(document.getElementById("CurrPage__BLK_" + DBT));
			//fix for 14785947 ends
			var newId = (((pgNumber - 1)*pgSize) + id);
		}
         if(newId){
			var rootNode = getNode(DBT, newId);
		}else{
			var rootNode = getNode(DBT, id);
		}
		//fix for 14785947 starts
		 //var currNode = rootNode.selectSingleNode(DBC);
         var currNode = selectSingleNode(rootNode,DBC);
		 //fix for 14785947 ends
        //Bug 14779188  Changes Ends
         //Bug 14779188  Changes Starts
        if(document.getElementById("PageSize__BLK_"+DBT)){
			/*var pgSize      = +document.getElementById("PageSize__BLK_"+DBT).value;*/
			var pgSize      = getPageSize("BLK_"+DBT);
			//fix for 14785947 starts
			//var pgNumber = +document.getElementById("CurrPage__BLK_"+DBT).innerText;
			var pgNumber    = +getInnerText(document.getElementById("CurrPage__BLK_" + DBT));
			//fix for 14785947 ends
			var newId = (((pgNumber - 1)*pgSize) + id);
		}
         if(newId){
			var rootNode = getNode(DBT, newId);
		}else{
			var rootNode = getNode(DBT, id);
		}
		//fix for 14785947 starts
		 //var currNode = rootNode.selectSingleNode(DBC);
         var currNode = selectSingleNode(rootNode,DBC);
		 //fix for 14785947 ends
        //Bug 14779188  Changes Ends
         if (value)	  //REDWOOD_CHANGES
        {
            //added to include user defined value for checkbox
            if (checkBoxObject.getAttribute("ON"))
            {
                value = checkBoxObject.getAttribute("ON");
            } else
            {
                value = CHECK_B0X_SELECTED_VALUE;
            }
        } else
        {
            if (checkBoxObject.getAttribute("OFF")) value = checkBoxObject.getAttribute("OFF");
            else value = CHECK_B0X_UNSELECTED_VALUE;
        }
        var tempValue = getAuditData(checkBoxObject, DBT);
        if (!tempValue == "")
        {
            value = tempValue;
        }

        //var rootNode = getNode(DBT, id);//Bug 14779188  Changes
        //var currNode = selectSingleNode(rootNode,DBC);//Bug 14779188  Changes
        if (currNode)
        {
            setNodeText(currNode, value);
        } else
        {
            var newNode = dbDataDOM.createElement(DBC);
            setNodeText(newNode, value);
            rootNode.appendChild(newNode);
        }
    }
    return;
}

function getNode(DBT, id)
{
    var query = getXPathQuery(DBT);
    var rootNode = selectSingleNode(dbDataDOM,query + "[@ID=" + id + "]");

    var parentTableName = relationArray[DBT];
    var relation = "1";
    if (parentTableName)
    {
        relation = parentTableName.substring(parentTableName.length - 1);
        parentTableName = parentTableName.substring(0, parentTableName.length - 2);

        if (id >= 1 && relation == 'N')
        {
            if (rootNode == null)
            {
                var parentNode = selectSingleNode(dbDataDOM,getQueryWithId(parentTableName));
                if (parentNode == null)
                {
                    parentNode = getNode(parentTableName, 1);
                }
                var newNode = dbDataDOM.createElement(DBT);
                newNode.setAttribute("ID", id);
                newNode.setAttribute("Type", "MULTIPLE");
                parentNode.appendChild(newNode);
                rootNode = newNode;
            }
        } else if (id == 1 && relation == '1')
        {
            if (rootNode == null)
            {
                var parentNode = selectSingleNode(dbDataDOM,getQueryWithId(parentTableName));
                if (!parentNode)
                {
                    parentNode = getNode(parentTableName, dbIndexArray[parentTableName]);
                }
                var newNode = dbDataDOM.createElement(DBT);
                newNode.setAttribute("ID", id);
                newNode.setAttribute("Type", "SINGLE");
                parentNode.appendChild(newNode);
                rootNode = newNode;
            }
        } else
        {
            rootNode = selectSingleNode(dbDataDOM,"//" + DBT + "[@ID=" + 1 + "]");
        }
    }
    return rootNode;
}

function displayNextData(tableName)
{
    dbIndexArray[tableName] = dbIndexArray[tableName] + 1;
    var node = getData(tableName, dbIndexArray[tableName]);
    if (node == null)
    {
        dbIndexArray[tableName] = dbIndexArray[tableName] - 1;
        //alert("You are at the last record ");
        alert(mainWin.getItemDesc("LBL_LAST_RECORD"));
        return;
    }
    resetChildIndex(tableName);
    displayData(tableName, node);
    return;
}

function displayPrevData(tableName)
{
    dbIndexArray[tableName] = dbIndexArray[tableName] - 1;
    var node = getData(tableName, dbIndexArray[tableName]);
    if (node == null)
    {
        dbIndexArray[tableName] = dbIndexArray[tableName] + 1;
        //alert("You are at the first record ");
        alert(mainWin.getItemDesc("LBL_FIRST_RECORD"));
        return;
    }
    resetChildIndex(tableName);
    displayData(tableName, node);
    return;
}

function displayDataAtIndex(tableName, index)
{

    var prevIndex = dbIndexArray[tableName];
    dbIndexArray[tableName] = index;
    var node = getData(tableName, dbIndexArray[tableName]);
    if (node == null)
    {
        return;
    }
    resetChildIndex(tableName);
    displayData(tableName, node);
    return;

}

function resetChildIndex(tableName)
{
    var childTable = findDescandants(tableName);
    childTable = childTable.substring(0, childTable.length - 1);
    var childArray = childTable.split("~");
    for (var index = 0; index < childArray.length; index++)
    {
        dbIndexArray[childArray[index]] = 1;
    }
    return;
}

function deleteChildTableRows(tableName)
{
    var childTable = findDescandants(tableName);
    childTable = childTable.substring(0, childTable.length - 1);
    if (childTable && childTable != "")
    {
        var childArray = childTable.split("~");
        for (var index = 0; index < childArray.length; index++)
        {
            deleteAllRows("BLK_" + childArray[index]);
        }
    }
    return;
}

function findDescandants(tableName)
{
    var index = 0;
    var childTable = "";
    while (index < dataSrcLocationArray.length)
    {
        var indexTable = dataSrcLocationArray[index];
        var relation = relationArray[indexTable];
        relation = relation.substring(0, relation.length - 2);
        if (relation == tableName)
        {
            childTable = childTable + indexTable + "~";
            var desc = findDescandants(indexTable);
            if (desc != "") childTable = childTable + desc;
        }
        index++;
    }
    return childTable;
}

function getParentTableName(tableName)
{
    var parentTableName = relationArray[tableName];
    parentTableName = parentTableName.substring(0, parentTableName.length - 2);
    return parentTableName;
}

function getData(tableName, seq)
{
    var query = getXPathQuery(tableName);
    var node = selectSingleNode(dbDataDOM,query + "[@ID=" + seq + "]");
    return node;
}

function setDataInSE(idPrefix, dataNode)
{

    var childNode = null;
    //if (dataNode)//9NT1606_14_7_2_STORYBOARD_36647436 commented
	if (dataNode && dataNode.childNodes != undefined)//9NT1606_14_7_2_STORYBOARD_36647436 added
    {
        for (var nodeIndex = 0; nodeIndex < dataNode.childNodes.length; nodeIndex++)
        {
            childNode = dataNode.childNodes[nodeIndex];
            if (isNodeATable(childNode))
            {
				 var childnodeList = selectNodes(childNode,getXPathQuery(childNode.nodeName)); //redwood_35944380 
         displayData(childNode.nodeName, childnodeList,1);//redwood_35944380 
				//displayData(childNode.nodeName, childNode,1);//redwood_35944380 commented
            } else
            {
                if (document.getElementById(idPrefix + childNode.nodeName) != null)
                {
                    if (document.getElementById(idPrefix + childNode.nodeName).type.toUpperCase() != 'RADIO')
                    {
                        document.getElementById(idPrefix + childNode.nodeName).value = "";
                    }
                    setFieldData(document.getElementById(idPrefix + childNode.nodeName), getNodeText(childNode));
                }
            }
        }
    }
    return;
}

function displayData(DBT, node, option)
{
    var tableObject = document.getElementById("BLK_" + DBT);

    if (tableObject)
    { // It's a multiple entry with table
        if (tableObject.getAttribute("VIEW"))
        { // if VIEW attribute is specified means relation is 1:N but view is SE. 
            setDataInSE(DBT + "__", node);
        } else
        {	  
//REDWOOD_CHANGES
		 //   if(node && getXMLString(node) && typeof(option)!=undefined && option==1 && gAction != "AUTHQUERY")
		//	{ 
			   	//setTableData(tableObject,node);
		//	}
		//	else
		//	{		
            var parentName = relationArray[DBT].substring(0, relationArray[DBT].length - 2);
            
          //  setDataInMETable("BLK_" + DBT, parentName, dbIndexArray[parentName]);
            setDataInME("BLK_" + DBT, node );
        //}		
//REDWOOD_CHANGES
			
        }
    } else
    { // It's a single entry or multiple entry without table
        setDataInSE(DBT + "__", node);
    }
}

function setTableData(tableObject,currentNode)
{
	if(tableObject) 
	{
        var newRow = addNewRow(tableObject.id);
		var rowLength=tableObject.tBodies[0].rows.length;
        setRowData(tableObject.tBodies[0].rows[rowLength-1],currentNode);
    }
}

function getQueryWithId(nodeName)
{
    var query = getXPathQuery(nodeName);
    query = query + "[@ID=" + dbIndexArray[nodeName] + "]";
    return query;
}

function getXPathQuery(nodeName)
{
    var xPathQuery = "/";
    var parent = relationArray[nodeName];

    if (nodeName == "STTB_FIELD_LOG")
    {
        var xPathQuery = "//";
    } else
    {
        var xPathQuery = "/";
    }

    var query = "/" + nodeName;
    // Find the immediate parent.
    if (parent)
    {
        parent = parent.substring(0, parent.length - 2);
        query = parent + "[@ID=" + dbIndexArray[parent] + "]" + query;
    }

    while (parent)
    {
        parent = relationArray[parent];
        if (parent)
        {
            parent = parent.substring(0, parent.length - 2);
            query = parent + "[@ID=" + dbIndexArray[parent] + "]" + "/" + query;
        }
    }

    xPathQuery = xPathQuery + query;
    return xPathQuery;
}

function modifyNode(nodeName, elementName, value)
{
    var query = getXPathQuery(nodeName);
    //prompt("qyery", query + "/" + elementName);
    var node = selectSingleNode(dbDataDOM,query + "/" + elementName);
    setNodeText(node, value);
}

function getNodevalue(nodeName, elementName)
{
    var query = getQueryWithId(nodeName);
    var node = selectSingleNode(dbDataDOM,query + "/" + elementName);
    if (node)
    {
        return getNodeText(node);
    } else
    {
        return "";
    }
}

function deleteData(DBT)
{

    var currDeletionIndex = dbIndexArray[DBT];
    var query = getQueryWithId(DBT);
    var node = selectSingleNode(dbDataDOM,query);

    if (!node)
    {
        disableAllBlockElements("BLK_" + DBT, true, true);
        return;
    }

    var parent = node.parentNode;
    parent.removeChild(node);

    query = getXPathQuery(DBT);
    var nodeList = selectNodes(dbDataDOM,query);

    if (nodeList.length == 0)
    {
        disableAllBlockElements("BLK_" + DBT, true, true);
        return;
    }

    if (nodeList)
    {
        resetNodeIdAttributes(nodeList);
    }

    var currNodeIndex = 0;
    if (currDeletionIndex == 1)
    { // Display Next
        dbIndexArray[DBT] = 0;
        displayNextData(DBT);
    } else
    { // Display Prev
        displayPrevData(DBT);
    }
    return;
}

function resetNodeIdAttributes(nodeList)
{

    var currNode = null;
    var idAttrValue = 0;
    for (var nodeIndex = 0; nodeIndex < nodeList.length; nodeIndex++)
    {
        idAttrValue = nodeIndex + 1;
        currNode = nodeList[nodeIndex];
        currNode.setAttribute("ID", idAttrValue);
    }
    return;
}
 //REDWOOD_CHANGES
function addNewRow_old(tableName)
{
    //var tableObj = document.getElementById(tableName);
     var tableObj = getTableObjForBlock(tableName);
       
    if(document.querySelector("#"+tableName+" .oj-table-body")){
        document.querySelector("#"+tableName+" .oj-table-body").scrollIntoView(false);
        document.querySelector("#"+tableName).scrollIntoView(false);
    }
 //REDWOOD_CHANGES   
    if(!tableObj) {
        return;
    }
    var newRow =null;
    var tableBodyRef = tableObj.tBodies[0];

    //if(tableBodyRef.rows.length >0) {
        //newRow = tableBodyRef.rows[0].cloneNode(true);
    //} else {
        buildStyleCellArray(tableName);
        newRow   = document.createElement("TR");
        for(var i = 0; i < rowArr.length; ++i) {
            if(rowArr[i] != null) {
                newCell = document.createElement("TD");
                //newCell.setAttribute("class",styleArray[i].className);
                addEvent(newCell, "class", styleArray[i].className);
                newCell.setAttribute("nowrap","nowrap");
                 if(i == 0){
                    newCell.setAttribute("scope", "row");
                }
                var index = tableBodyRef.rows.length;
                var selRow = mainWin.getItemDesc("LBL_SELECT_ROW");
                var rowHTML = rowArr[i].replace(selRow,selRow+index);
                newCell.innerHTML = rowHTML;
                
               
                if(index > 0){
                    var labelElem = newCell.getElementsByTagName("LABEL");
                    setObjId(labelElem, index);
                    var inputElem = newCell.getElementsByTagName("INPUT");
                    setObjId(inputElem, index);
                    var selectElem = newCell.getElementsByTagName("SELECT");
                    setObjId(selectElem, index);
                    var textareaElem = newCell.getElementsByTagName("TEXTAREA");
                    setObjId(textareaElem, index);
                    var buttonElem = newCell.getElementsByTagName("BUTTON");
                    setObjId(buttonElem, index);
                }
                
                fnSetReferenceFiledValueAsDefaultVal(newCell);
                newRow.appendChild(newCell);
                fnSetReferenceFiledValueAsDefaultVal(newCell);
            }
        }        
        if (gAction == '' || gAction == 'EXECUTEQUERY' || gAction == 'AUTHQUERY') disableRowElements(newRow); //Fix for 17452934 
    //}
    tableBodyRef.appendChild(newRow);


    /*for (var index = 0; index < currArr.length; index++)
    {
        var newCell = newRow.insertCell();
        newCell.insertAdjacentHTML("afterBegin", currArr[index]);
        newCell.setAttribute("className",arrCells[index].className);
        
        for (var i = 0; i < arrCells[index].attributes.length; i++)
        {
            if (arrCells[index].attributes.item(i).specified)
            {
                if (arrCells[index].attributes.item(i).name == "class")
                {
                    newCell.setAttribute("className", arrCells[index].attributes.item(i).value, 0);
                } else
                {
                    newCell.setAttribute(arrCells[index].attributes.item(i).name, arrCells[index].attributes.item(i).value, 0);
                }
            }
        }
        
        fnSetReferenceFiledValueAsDefaultVal(newCell);
    }*/

    //if (gAction == '' || gAction == 'EXECUTEQUERY') disableRowElements(newRow);

    //Added for Tool Integration
    if (mainWin.toolIdentifier)
    {
        try
        {
            //eval("fnPostAddRow_" + tableName + "(newRow)");
            var fnEval = new Function("fnPostAddRow_" + tableName + "(newRow)");  
            fnEval();
        } catch(e)
        {}
    }

    return newRow;
}	
//REDWOOD_CHANGES

function addNewRow(tableName, index) {//OJET Migration
    var l_tableObj = getTableObjForBlock(tableName);
       
    if(document.querySelector("#"+tableName+" .oj-table-body")){
        document.querySelector("#"+tableName+" .oj-table-body").scrollIntoView(false);
        document.querySelector("#"+tableName).scrollIntoView(false);
    }
    
    if (!l_tableObj)
        return;
    if (gAction != '' && gAction != 'EXECUTEQUERY' && gAction != 'REVERSE' && gAction != 'REMOTEAUTH' && gAction != 'VIEW' && gAction != 'AUTH') {
        multipleEntryFieldList[tableName]['readOnly']=false;
    }
    showTable(false);
    var  cloneObj = Object.assign({}, multipleEntryFieldList[tableName]);
    cloneObj.readOnly = false;
    meArrayForAddDelete[tableName].push(cloneObj);
    showTable(true);//debugger;
    var rowIndex =l_tableObj.tBodies[0].rows.length;
   // l_tableObj.tBodies[0].rows[rowIndex-1].cells[0].focus();
    // document.getElementById(tableName).refresh();
   // newRow = callAddNewRow(tableName, index);
   
   // document.getElementById(tableName).refresh();
     setTimeout(function(){ 
    var rowIndex =getTableObjForBlock(tableName).tBodies[0].rows.length;
    var btns = getTableObjForBlock(tableName).tBodies[0].rows[rowIndex-1].getElementsByTagName('OJ-BUTTON');
    for(var i = 0;i<btns.length;i++){
        if( btns[i]){
             btns[i].removeAttribute('disabled');
             //btns[i].refresh();
        }
    }
    
	//REDWOOD_35903742 starts
    var selectField = getTableObjForBlock(tableName).tBodies[0].rows[rowIndex-1].getElementsByTagName('OJ-SELECT-SINGLE');
    for(var i = 0;i<selectField.length;i++){
        if( selectField[i]){
             if (selectField[i].getAttribute("defaultsel")==null) {
				 var selectedValue = "";
				 for (var index = 0;index < selectField[i].data.data.length;index++) {
							if (selectField[i].data.data[index].defaultValue!=undefined) {
								selectedValue = index;
								break;
							}
						}
					if(selectedValue==""){
				 selectField[i].value=selectField[i].data.data[0].value;
					}
				 }
        }
    }
	var timer=0;
	if(getTableObjForBlock(tableName).tBodies[0].rows[rowIndex-1].cells[0].innerHTML =='No data to display.'){
		 timer=50;
	}
	
   //if (gAction=="MODIFY" ){
	if (gAction != '' && gAction != 'EXECUTEQUERY' && gAction != 'REVERSE' && gAction != 'REMOTEAUTH' && gAction != 'VIEW' && gAction != 'AUTH')//REDWOOD_35303668
	{
		setTimeout(function(){			enableRowElements(getTableObjForBlock(tableName).tBodies[0].rows[rowIndex-1]);
	   },timer);
	}	//REDWOOD_35903742 Ends
   // if( meArrayForAddDelete[tableName]().length > getPgSize(tableName))
            var ele = document.getElementById('paging_'+tableName).getElementsByTagName('a');
            if(typeof ele[ele.length-1]!='undefined' &&  ele[ele.length-1].className.includes("oj-pagingcontrol-nav-last")){
            if(!ele[ele.length-1].getAttribute("aria-disabled")) { // && ele[ele.length-1].getAttribute("aria-disabled") != "true") {
                ele[ele.length-1].click();
            }
        }
        try {
     
        fnEventsHandler('fnPostAddNewRow_' + tableName, l_tableObj.tBodies[0].rows[rowIndex-1]);
    }
    catch (e) {
    console.log(e);
    }
    
    },10);
     
   // return newRow;
}
//REDWOOD_CHANGES
function setObjId(elem, index){
    for(var i=0; i<elem.length; i++){
        if(elem[i].getAttribute("for") && elem[i].getAttribute("for") != ""){
            //Bug#26896721 Retro from 25985217 Starts
            //elem[i].setAttribute("for", elem[i].getAttribute("for") + index + "RC"); //Fix for 25985217
            elem[i].setAttribute("for", elem[i].getAttribute("for")+ "RC" + index ); 
            //Bug#26896721 Retro from 25985217 Ends
        }else if(elem[i].id && elem[i].id != ""){
            //Bug#26896721 Retro from 25985217 Starts
            //elem[i].id = elem[i].id + index + "RC"; //Fix for 25985217
            elem[i].id = elem[i].id + "RC"+ index ; 
            //Bug#26896721 Retro from 25985217 Ends
        }
    }
}

function buildStyleCellArray(tableName) {
    rowArr = new Array();
    styleArray = multipleEntryCells[tableName];
    var tBodyHTML = multipleEntryArray[tableName];
    if(tBodyHTML) {
        for (var j=0;j<tBodyHTML.length;j++) {
                if(tBodyHTML[j] == ""){
                        continue;
                }
                rowArr[j] = tBodyHTML[j];
        }
    }
}

function deleteSelectedRows(tableName)
{
    var tableObject = getTableObjForBlock(tableName);	 //REDWOOD_CHANGES
    var DBT = document.getElementById(tableName).getAttribute("DBT"); //REDWOOD_CHANGES
    var numRows = tableObject.tBodies[0].rows.length;
	/* Added for pagination of multiple entry block */
	if ("Y" == getPagenationReq()) {
		var pgSize      = getPageSize(tableName);
		var pgNumber    = + getInnerText(document.getElementById("CurrPage__"+tableName));
	}
    var count = 0;
    var query = getXPathQuery(DBT);
    for (var index = numRows - 1; index >= 0; index--)
    {
        if (tableObject.tBodies[0].rows[index].cells[0].getElementsByTagName("INPUT")[0].checked == true)
        {
           // tableObject.tBodies[0].deleteRow(index);	 //REDWOOD_CHANGES
            count++;
             meArrayForAddDelete[tableName].splice((index) ,1);	 //REDWOOD_CHANGES
            if (index < numRows)
            {
				/* Added for pagination of multiple entry block */
				var domRecordNumber = index+1;
				if ("Y" == getPagenationReq()) {
					domRecordNumber = ((pgNumber - 1)*pgSize) + (index+1);
				}
				var currentNode = selectSingleNode(dbDataDOM,query + "[@ID=" + (domRecordNumber) + "]");
                if (currentNode)
                {
                    var parentNode = currentNode.parentNode;
                    parentNode.removeChild(currentNode);
                }
            }
        }
    }

    deleteChildTableRows(tableName.substring(4, tableName.length));

    // Reset the ID attributes.
    var nodeList = selectNodes(dbDataDOM,query);
    if (nodeList)
    {
        resetNodeIdAttributes(nodeList);
    }
	/* Added for pagination of multiple entry block */
	if ("Y" == getPagenationReq()) {
		setDataInPageME(tableName, nodeList);
	}
    return count;
}

function deleteAllRows(tableName) {
    //var tableObject = document.all[tableName];
    var tableObject = document.getElementById(tableName);
    if (tableObject) {
      //  if (!tableObject.getAttribute("VIEW")) { //REDWOOD_CHANGES
            /*var numRows = tableObject.tBodies[0].rows.length;
            tableObject.removeChild(tableObject.childNodes[1]);
            tableObject.appendChild(document.createElement("<tbody>"));*/ 
//REDWOOD_CHANGES
           // setInnerText(tableObject.tBodies[0], "");
           meArrayForAddDelete[tableName]([]);
		   //35262971 starts
		   setTimeout(function(){
            document.getElementById(tableName).refresh();
		   },0);
		   //35262971 ends
      //  }				
//REDWOOD_CHANGES
    }
}

function setDataInMETable(tableId, parentTableName, parentIndex)
{

    var tableName = tableId.substring(4, tableId.length);
    // Delete All the rows in the given table.[To Refresh the View]
    deleteAllRows(tableId);

    if (gAction == "AUTHQUERY")
    {
        var node = getNode_auth(parentTableName, parentIndex);
    } else
    {
        var node = getNode(parentTableName, parentIndex);
    }

    if (node)
    {
        var rowIndex = 0;
        for (var nodeIndex = 0; nodeIndex < node.childNodes.length; nodeIndex++)
        {
            var currNode = node.childNodes[nodeIndex];
            if (isNodeATable(currNode) && currNode.nodeName == tableName)
            {
                //tableObject = document.getElementById(tableId);//REDWOOD_35313042
				tableObject = getTableObjForBlock(tableId);//REDWOOD_35313042
                if (tableObject)
                {
                    if (currNode.childNodes.length > 0)
                    {
                        addNewRow(tableId);
						setRowData(tableObject.tBodies[0].rows[rowIndex], currNode);
				    //Bug no:14476825 Changes
				    if (gAction == "AUTHQUERY")
					tableObject.tBodies[0].rows[rowIndex].cells[0].getElementsByTagName("INPUT")[0].disabled=true; //Bug no:14476825 Changes
						 rowIndex++;
						
                    }
					
                }
            } else
            {
                // setDatainSe
                //displayData(currNode.nodeName, currNode);
            }
        }
    }

}

/* Added for pagination of multiple entry block */
function setDataInPageMETable(tableId, parentTableName, parentIndex) {

	var tableName = tableId.substring(4, tableId.length);
    var htmlTableObj = document.getElementById(tableId);
    // Delete All the rows in the given table.[To Refresh the View]
    deleteAllRows(tableId);
    if (gAction == "AUTHQUERY"){
            var node = getNode_auth(parentTableName, parentIndex);
    } else {
            var node = getNode(parentTableName, parentIndex);
    }
    var i_actionFlag = "";
    if(node) {
        if(htmlTableObj) {
            var nodeQuery	= getXPathQuery(tableName);
            var nodeList	= selectNodes(dbDataDOM,nodeQuery);
            setInnerText(document.getElementById("CurrPage__"+tableId).children[0], 1);
            setInnerText(document.getElementById("TotPage__"+tableId).children[0], 1);
            for(var nodeIndex = 0; nodeIndex < nodeList.length; nodeIndex++) {
				try{//Fix for 16904739
					var fnEval = new Function("pre_Navigate('" + tableId + "', '" + i_actionFlag + "')");
					fnEval();
				}catch(e){}//Fix for 16904739
                var rowIndex = 0;
                var pgNumber    = 1;
                var pgSize      = getPageSize(tableId);
                var endIndex    = pgNumber*pgSize;
                var startIndex  = (htmlTableObj.tBodies[0].rows.length) + (pgNumber-1)*pgSize;
                rowIndex        = htmlTableObj.tBodies[0].rows.length;
                for(var l_nodeIndex = startIndex; l_nodeIndex < endIndex; l_nodeIndex++) {
                    var totalNoOfPgs    = Math.ceil(nodeList.length/pgSize);
                    setInnerText(document.getElementById("TotPage__"+tableId).children[0], totalNoOfPgs);
                    fnSetNavButtons(tableId, pgNumber, totalNoOfPgs);
                    var currNode = nodeList[l_nodeIndex];
                    if(isNodeATable(currNode) && currNode.nodeName == tableName) {
                        if(currNode.childNodes.length > 0 ) {
                            if(htmlTableObj.tBodies[0].rows.length < pgSize){
                                addNewRow(tableId);
                                setRowData(htmlTableObj.tBodies[0].rows[rowIndex], currNode);
                                rowIndex++;
                            }else{
								try{//Fix for 16904739
									var fnEval = new Function("post_Navigate('" + tableId + "', '" + i_actionFlag + "')");
									fnEval();
								}catch(e){}//Fix for 16904739
                                return;
                            }
                        }
                    }
                }
				try{//Fix for 16904739
					var fnEval = new Function("post_Navigate('" + tableId + "', '" + i_actionFlag + "')");
					fnEval();
				}catch(e){}//Fix for 16904739
                return;
            }
        }
    }
}

function setRowData(rowObject, currNode)
{
    var cells = rowObject.cells;
    //for(cellObject in cells) {
    for (var cellIndex = 0; cellIndex < cells.length; cellIndex++)
    {
        setCellData(cells[cellIndex], currNode);
    }
}

function setCellData(cellObject, currNode)
{
    //var elementList = cellObject.all;
        var inputElem = cellObject.getElementsByTagName("INPUT");
        setTableInputData(inputElem, currNode);
        var inputElem = cellObject.getElementsByTagName("OJ-INPUT-TEXT");//REDWOOD_CHANGES
        //setTableInputData(inputElem, currNode, color, action);	//REDWOOD_CHANGES//REDWOOD_35313042
		setTableInputData(inputElem, currNode);	//REDWOOD_CHANGES//REDWOOD_35313042
        var selectElem = cellObject.getElementsByTagName("SELECT");
        setTableSelectData(selectElem, currNode);
        var textareaElem = cellObject.getElementsByTagName("TEXTAREA");
        setTableTextAreaData(textareaElem,currNode);

  /*  for (var elementIndex = 0; elementIndex < elementList.length; elementIndex++)
    {
        var currObject = elementList[elementIndex];
        var tagName = currObject.tagName;

        switch (tagName.toUpperCase())
        {
        case 'INPUT':
            {
                var DBC = NVL(currObject.getAttribute("DBC"));
                if (DBC)
                {
                    DBC = DBC.toUpperCase(); // changed by amit
                    var type = currObject.type;
                    var nodeValue = NVL(selectSingleNode(currNode,DBC));

                    if (selectSingleNode(currNode,DBC) == null)
                    {
                        if (selectSingleNode(currNode,"./*[@Type='SINGLE']"))
                        {
                            if (selectSingleNode(currNode,"./*[@Type='SINGLE']/" + DBC)) nodeValue = selectSingleNode(currNode,"./*[@Type='SINGLE']/" + DBC);
                        }
                    }
                    if (!nodeValue)
                    {
                        continue;
                    }
                    var fieldValue = "";
                    if (nodeValue.childNodes[0])
                    {
                        fieldValue = nodeValue.childNodes[0].nodeValue;
                    }
                    switch (type.toUpperCase())
                    {
                    case 'TEXT':
                        {
                            currObject.value = fieldValue;
                            break;
                        }

                    case 'HIDDEN':
                        {
                            currObject.value = fieldValue;
                            if (getOuterHTML(currObject).indexOf("displayAmount") != -1)
                            {
                                currObject.value = fieldValue.replace(decimalSymbol, gDecimalSymbol);
                            }else if (getOuterHTML(currObject).indexOf("displayFormattedNumber") != -1) {
                                currObject.value = fieldValue.replace(decimalSymbol, ".");
                                                                
                            }

                            break;
                        }

                    case 'CHECKBOX':
                        {

                            if (currObject.getAttribute("ON"))
                            {
                                if (fieldValue == currObject.getAttribute("ON"))
                                {
                                    currObject.checked = true;
                                }
                            } else
                            {
                                if (fieldValue == CHECK_B0X_SELECTED_VALUE)
                                {
                                    currObject.checked = true;
                                }
                            }

                            if (currObject.getAttribute("OFF"))
                            {
                                if (fieldValue == currObject.getAttribute("OFF"))
                                {
                                    currObject.checked = false;
                                }
                            } else if (fieldValue == CHECK_B0X_UNSELECTED_VALUE)
                            {
                                currObject.checked = false;
                            }
                            break;
                        }

                    case 'RADIO':
                        {
                            if (fieldValue == RADIO_BUTTON_SELECTED_VALUE)
                            {
                                currObject.checked = true;
                            } else
                            {
                                currObject.checked = false;
                            }
                            break;
                        }
                    }
                    break;
                }
                break; //Murali Tunning Changes
            }

        case 'SELECT':
            {
                var DBC = NVL(currObject.getAttribute("DBC"));
                if (DBC)
                {
                    DBC = DBC.toUpperCase(); //KIRTI 02-Feb-08
                    var nodeValue = NVL(selectSingleNode(currNode,DBC));
                    var fieldValue = getNodeText(nodeValue);
                    setSelectedIndex(currObject, fieldValue);
                }
                return; //murali tunning changes.
                break;
            }
        case 'TEXTAREA':
            {
                var DBC = NVL(currObject.getAttribute("DBC"));
                if (DBC)
                {
                    var nodeValue = NVL(selectSingleNode(currNode,DBC));
                    var fieldValue = getNodeText(nodeValue);
                    currObject.value = fieldValue;
                }
                break;
            }
        }

    }*/

}
function setTableInputData(inputElem, currNode) {
    for (var elementIndex = 0; elementIndex < inputElem.length; elementIndex++)
        {
        var currObject = inputElem[elementIndex];
        var tagName = currObject.tagName;
//REDWOOD_35903742 ends
        if(currObject.tagName.toUpperCase() == "OJ-INPUT-DATE-TIME" || currObject.tagName.toUpperCase() == "OJ-INPUT-DATE" || currObject.tagName.toUpperCase() == "OJ-INPUT-NUMBER" || currObject.tagName.toUpperCase() == "OJ-INPUT-TEXT" || currObject.tagName.toUpperCase() == "OJ-SELECT-SINGLE"|| currObject.tagName.toUpperCase() == "OJ-SWITCH" || currObject.tagName.toUpperCase() == "OJ-INPUT-PASSWORD" ){//OJET Migration
			currObject.type = "TEXT";
		}
//REDWOOD_35903742 ends
                var DBC = NVL(currObject.getAttribute("DBC"));
                if (DBC) {
                    DBC = DBC.toUpperCase(); // changed by amit
                    var type = currObject.type;
                    var nodeValue = NVL(selectSingleNode(currNode,DBC));
        
                    if (selectSingleNode(currNode,DBC) == null) {
                        if (selectSingleNode(currNode,"./*[@Type='SINGLE']")) {
                            if (selectSingleNode(currNode,"./*[@Type='SINGLE']/" + DBC)) nodeValue = selectSingleNode(currNode,"./*[@Type='SINGLE']/" + DBC);
                        }
                    }
                    if (!nodeValue) {
                        continue;
                    }
                    var fieldValue = "";
                    if (nodeValue.childNodes[0]) {
                        fieldValue = nodeValue.childNodes[0].nodeValue;
                        if (fieldValue.indexOf("\n") == 0) {
                            fieldValue = fieldValue.substring(1,fieldValue.length);
                        }
                    }

                    switch (type.toUpperCase()) {
                    case 'TEXT': {
                    currObject.value = fieldValue;
                            break;
                }
        
                    case 'HIDDEN': {
                            currObject.value = fieldValue;
                            if (getOuterHTML(currObject).indexOf("displayAmount") != -1) {
                                currObject.value = fieldValue.replace(decimalSymbol, gDecimalSymbol);
                            }else if (getOuterHTML(currObject).indexOf("displayFormattedNumber") != -1) {
                                currObject.value = fieldValue.replace(decimalSymbol, ".");
                            }
                            fireHTMLEvent(currObject, "onpropertychange");
        
                break;
            }
        
                    case 'CHECKBOX': {
                             if (currObject.getAttribute("ON")) {
                                if (fieldValue == currObject.getAttribute("ON")) {
                                    currObject.checked = true;
                                }
                            } else {
                                if (fieldValue == CHECK_B0X_SELECTED_VALUE) {
                                    currObject.checked = true;
                                }
        }

                            if (currObject.getAttribute("OFF")) {
                                if (fieldValue == currObject.getAttribute("OFF")) {
                                    currObject.checked = false;
                                }
                            } else if (fieldValue == CHECK_B0X_UNSELECTED_VALUE) {
                                currObject.checked = false;
                            }
                            break;
    }

                    case 'RADIO':  {
                            if (fieldValue == RADIO_BUTTON_SELECTED_VALUE) {
                                currObject.checked = true;
                            } else {
                                currObject.checked = false;
                            }
                            break;
                        }
                    }
                    break;
                }
}

}
function setTableSelectData(selectElem, currNode) {
    for (var elementIndex = 0; elementIndex < selectElem.length; elementIndex++) {
        var currObject = selectElem[elementIndex];
        var tagName = currObject.tagName;
      
        var DBC = NVL(currObject.getAttribute("DBC"));
        if (DBC) {
            DBC = DBC.toUpperCase(); 
            var nodeValue = NVL(selectSingleNode(currNode,DBC));
			//Fix for 21798446 Starts
            var fieldValue = "";
            if (nodeValue.childNodes[0]) {
                fieldValue = nodeValue.childNodes[0].nodeValue;
                if (fieldValue.indexOf("\n") == 0) {
                    fieldValue = fieldValue.substring(1,fieldValue.length);
                }
            }
            //var fieldValue = getNodeText(nodeValue);
            //Fix for 21798446 ends
            setSelectedIndex(currObject, fieldValue);
        }
    }
}
function setTableTextAreaData(textareaElem, currNode) {
    for (var elementIndex = 0; elementIndex < textareaElem.length; elementIndex++) {
        var currObject = textareaElem[elementIndex];
        var tagName = currObject.tagName;
        var DBC = NVL(currObject.getAttribute("DBC"));
        if (DBC) {
            var nodeValue = NVL(selectSingleNode(currNode,DBC));
            var fieldValue = getNodeText(nodeValue);
            currObject.value = fieldValue;
        }
    }
}
function getSelectedIndexValue(selectObject)
{
    var selectedValue;
    for (var index = 0; index < selectObject.options.length; index++)
    {
        if (selectObject.options[index].selected)
        {
            selectedValue = selectObject.options[index].value
            break;
        }
    }
    return selectedValue;
}

function setSelectedIndex(selectObject, value)
{
    var option;
    //for (var index = 0; index < selectObject.options.length; index++) //REDWOOD_35357537 Commented
	for (var index = 0; index < selectObject.data.data.length; index++) // REDWOOD_35357537 Added
    {
        //if (selectObject.options[index].value == value) //REDWOOD_35357537 Commented
		if (selectObject.data.data[index].value == trim(value)) //REDWOOD_35357537 Added
        {
            //selectObject.selectedIndex = index; //REDWOOD_35357537 Commented
			selectObject.value = selectObject.data.data[index].value; //REDWOOD_35357537 Added
        }
    }
}

function getRadioButtonData(radioObject)
{
    var radioValue = "";
    //var radioObjects = document.form1.elements[radioObject.name];
    var radioObjects = document.getElementsByName(radioObject.name);
    for (var index = 0; index < radioObjects.length; index++)
    {
        if (radioObjects[index].checked)
        {
            radioValue = radioObjects[index].value;
            break;
        }
    }
    return radioValue;
}

function setRadioButtonData(radioObject, value)
{
   // var radioObjects = document.form1.elements[radioObject.name];
   value = value.replace(new RegExp("\n", "g"), "");
    var radioObjects = document.getElementsByName(radioObject.name);
    for (var index = 0; index < radioObjects.length; index++)
    {
        if (value == radioObjects[index].value)
        {
            radioObjects[index].checked = true;
            break;
        }
    }
}

function isNodeATable(currNode)
{
    //alert(currNode.xml);
    if (currNode && currNode.nodeType != 3)
    {
        var type = currNode.getAttribute("Type");
        if (type && (type == 'SINGLE' || type == 'MULTIPLE'))
        {
            //alert('if');
            return true;
        } else
        {
            return false;
        }
    } else
    {
        return false;
    }
}

function setChildElementValue(tableName, fldName)
{
    var value = getNodevalue(tableName, fldName);
    var childTable = findDescandants(tableName);
    childTable = childTable.substring(0, childTable.length - 1);
    var childArray = childTable.split("~");
    for (var index = 0; index < childArray.length; index++)
    {
        //var nodeList = dbDataDOM.selectNodes("//"+childArray[index]);
        var nodeList = selectNodes(dbDataDOM,getXPathQuery(childArray[index]));
        if (nodeList)
        {
            for (var nodeIndex = 0; nodeIndex < nodeList.length; nodeIndex++)
            {
                var node = nodeList[nodeIndex];
                if (node)
                {
                    var element = selectSingleNode(node,fldName);
                    if (element) setNodeText(element, value);
                }
            }
        }
    }

}

function createFV(dataNode, DBT)
{
    var fvStr = "";
    if (selectSingleNode(dbFCJDOM,"//FLD/FN[@TYPE=\"" + DBT + "\"]"))
    { // STDFCJGN PHASE1

        if (!selectSingleNode(dbFCJDOM,"//FLD/FN[@TYPE=\"" + DBT + "\"]").childNodes[0])
        {
            return fvStr;
        }
        var fnNames = selectSingleNode(dbFCJDOM,"//FLD/FN[@TYPE=\"" + DBT + "\"]").childNodes[0].nodeValue;

        fvStr = fvStr + "<FV><![CDATA[";

        var tslValue = "";
        var fnArray = fnNames.split("~");
        for (var index = 0; index < fnArray.length; index++)
        {
            var fieldName = fnArray[index];
            if (fieldName && fieldName != "")
            {
                var currNode = selectSingleNode(dataNode,fieldName);
                var text = "";
                if (currNode)
                {
                    if (currNode.childNodes.length == 1)
                    {
                        text = currNode.childNodes[0].nodeValue;
                        if(text.indexOf("\n") == 0) {
                            text = text.substring(1);
                        }
                    }
                }
                tslValue = tslValue + text + "~";
            }
        }

        fvStr = fvStr + tslValue;

        fvStr = fvStr + "]]></FV>";
    }
    return fvStr;
}

function fnCheckForNullValues(node)
{
    var childNodes = node.childNodes;
    if (childNodes.length > 0)
    {
        for (index = 0; index < childNodes.length; index++)
        {
            if (getNodeText(childNodes[index]) == "")
            {
                if (index == childNodes.length - 1) return true;
            } else
            {
                return false;
            }
        }
    } else return true;
}

function fnCheckforSingleView(type)
{
    var blockId = "BLK_" + type;
    for (var i = 0; i < multipleEntryIDs.length; i++)
    {
        if (multipleEntryIDs[i] == blockId)
        {
            return false;
        } else
        {
            continue;
        }
    }
    return true;
}

function processNode(node)
{
	
    dbFCJDOM = loadXMLDoc(msgxml);
    var type = node.nodeName;
    var havingNull = false;
    if (typeof(relationArray[type]) != 'undefined')
    {
        if ((relationArray[type]).indexOf("~N") != -1)
        {
            var isSingleView = fnCheckforSingleView(type);
            if (isSingleView)
            {
                if (dbIndexArray[type] == '1')
                {
                    var dataEntered = fnCheckForNullValues(node);
                    if (dataEntered) havingNull = true;
                }
            }
        }
    }

    if (isQuery[type]) return;
    if (isControl[type]) return;
    if (!havingNull)
    {
        dbStrRecords = dbStrRecords + "<REC TYPE=\"" + type + "\"";
        if (dataSrcLocationArray[0] == type)
        {
            dbStrRecords = dbStrRecords + " RECID='1'";
        }
        dbStrRecords = dbStrRecords + ">";
        var strFV = createFV(node, type);
        dbStrRecords = dbStrRecords + strFV;
    }
    var childNodes = node.childNodes;
    for (var index = 0; index < childNodes.length; index++)
    {
        var currNode = childNodes[index];
        if (isNodeATable(currNode))
        {
            processNode(currNode);
        }
    }
    if (!havingNull) dbStrRecords = dbStrRecords + "</REC>";
}

//----------------------------------------------------------------------------------------------------------------------
function fnGetDataXMLFromFCJXML(pobjFCJXMLDOM, pintRecNumber)
{
    if (!pobjFCJXMLDOM) return;
    var objRootDataNode, objFCJXMLRecNode, objReturnDataDOM;

    

    if (pintRecNumber == null || typeof(pintRecNumber) == "undefined")
    {
        pintRecNumber = 1;
    }

    if (selectSingleNode(pobjFCJXMLDOM,"//FCUBS_BODY/REC[position()=" + pintRecNumber + "]"))
    {
        objFCJXMLRecNode = selectSingleNode(pobjFCJXMLDOM,"//FCUBS_BODY/REC[position()=" + pintRecNumber + "]");
    } else
    {
        objFCJXMLRecNode = selectSingleNode(pobjFCJXMLDOM,"//MSG/REC[position()=" + pintRecNumber + "]");
    }

    if (objFCJXMLRecNode != null)
    {
        objRootDataNode = fnProcessFCJRecNode(objFCJXMLRecNode, pobjFCJXMLDOM, objReturnDataDOM, true);
        objRootDataNode.setAttribute("ID", "1");
        objRootDataNode.setAttribute("Type", "SINGLE");
        //Attributes RECID and STATUS added for master level REC- by Sankarganesh 06/07/05
        if (objFCJXMLRecNode.getAttribute("RECID") != null) objRootDataNode.setAttribute("RECID", objFCJXMLRecNode.getAttribute("RECID"));
        if (objFCJXMLRecNode.getAttribute("STATUS") != null) objRootDataNode.setAttribute("STATUS", objFCJXMLRecNode.getAttribute("STATUS"));
        if (objFCJXMLRecNode.getAttribute("STATUS_VAL") != null) objRootDataNode.setAttribute("STATUS_VAL", objFCJXMLRecNode.getAttribute("STATUS_VAL"));
        var objReturnDataDOM = loadXMLDoc(getXMLString(objRootDataNode));
    }
    return objReturnDataDOM;
}

//----------------------------------------------------------------------------------------------------------------------
function fnGetFCJXMLFromDataXML(pobjDataXMLDOM, pobjCurrentFCJXMLDOM)
{
    var objRecNodeList, objRecNode;

    objRecNodeList = selectNodes(pobjCurrentFCJXMLDOM,"//*/REC");
    if (objRecNodeList != null)
    {
        //objRecNodeList.removeAll();
        for(var i=0; i < objRecNodeList.length; i++){
            objRecNodeList[i].parentNode.removeChild(removeNode[i]);
        }
    }

    objRecNode = fnGetFCJRecNodeForDataNode(pobjDataXMLDOM.documentElement, pobjCurrentFCJXMLDOM);
    selectSingleNode(pobjCurrentFCJXMLDOM,"FCJMSG/MSG").appendChild(objRecNode);
    pobjCurrentFCJXMLDOM = fnUpdateFCJMsgAttributes(pobjCurrentFCJXMLDOM);
    return pobjCurrentFCJXMLDOM;
}
//----------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------
function fnProcessFCJRecNode(pobjFCJXMLRecNode, pobjFCJXMLDOM, pobjDataDOM, pblnRecursive)
{
    var objFVNode, objRecChildNodes, objNewChildNode, objNodesOfThisType;
    var arrFieldValues, arrFieldNames, strRecType, intID;
    var objReturnDataRecNode;

    arrFieldValues = new Array();
    arrFieldNames = new Array();

    objFVNode = selectSingleNode(pobjFCJXMLRecNode,"FV");
    arrFieldValues = getNodeText(objFVNode).split("~");
    if (selectSingleNode(pobjFCJXMLDOM,"//FCUBS_BODY/FLD/FN[@TYPE='" + pobjFCJXMLRecNode.getAttribute("TYPE") + "']"))
    {
        arrFieldNames = getNodeText(selectSingleNode(pobjFCJXMLDOM,"//FCUBS_BODY/FLD/FN[@TYPE='" + pobjFCJXMLRecNode.getAttribute("TYPE") + "']")).split("~");
    } else if (selectSingleNode(pobjFCJXMLDOM,"//MSG/FLD/FN"))
    {
        arrFieldNames = getNodeText(selectSingleNode(pobjFCJXMLDOM,"//MSG/FLD/FN")).split("~");
    }
    if (typeof(pobjDataDOM) == "undefined") {
        pobjDataDOM = loadXMLDoc("<"+pobjFCJXMLRecNode.getAttribute("TYPE")+"/>");
        objReturnDataRecNode = pobjDataDOM.createElement(pobjFCJXMLRecNode.getAttribute("TYPE"));
    } else {
    objReturnDataRecNode = pobjDataDOM.createElement(pobjFCJXMLRecNode.getAttribute("TYPE"));
    }
    /* To get Action Attribute from FCJ Response xml and set it to Data xml
           for Viewing changes in Maintainences Screen-Muthu*/
    var Action = pobjFCJXMLRecNode.getAttribute("ACTION");
    if (Action) objReturnDataRecNode.setAttribute("ACTION", Action)
    //Ends 

    for (var i = 0; i < arrFieldNames.length; i++)

    {
        if (arrFieldNames[i] != "")
        {
            if (typeof(dbDataDOM) == "undefined" || (typeof(dbDataDOM) != "undefined" && dbDataDOM == null)){
                dbDataDOM = loadXMLDoc("<"+arrFieldNames[i]+"/>");
            objNewChildNode = dbDataDOM.createElement(arrFieldNames[i]);
            }else{
                objNewChildNode = dbDataDOM.createElement(arrFieldNames[i]);
            }
            //setNodeText(objNewChildNode, arrFieldValues[i].replace(new RegExp("\n", "g"), ""));
            setNodeText(objNewChildNode, arrFieldValues[i]);
            objReturnDataRecNode.appendChild(objNewChildNode);
        }
    }

    if (pblnRecursive)
    {
        objRecChildNodes = selectNodes(pobjFCJXMLRecNode,"REC");

        if (objRecChildNodes != null)
        {
            for (var j = 0; j < objRecChildNodes.length; j++)
            {
                objNewChildNode = fnProcessFCJRecNode(objRecChildNodes[j], pobjFCJXMLDOM, pobjDataDOM, true); //----> Recursive

                if (selectNodes(pobjFCJXMLRecNode,"REC[@TYPE='" + objRecChildNodes[j].getAttribute("TYPE") + "']").length > 1)
                {
                    strRecType = "MULTIPLE";
                } else
                {
                    strRecType = "SINGLE";
                }

                objNodesOfThisType = selectNodes(objReturnDataRecNode,objNewChildNode.nodeName);
                if (objNodesOfThisType != null)
                {
                    intID = objNodesOfThisType.length + 1;
                } else
                {
                    intID = 1;
                }

                objNewChildNode.setAttribute("ID", intID);
                objNewChildNode.setAttribute("Type", strRecType);

                if (objRecChildNodes[j].getAttribute("RECID") != null) objNewChildNode.setAttribute("RECID", objRecChildNodes[j].getAttribute("RECID"));

                if (objRecChildNodes[j].getAttribute("STATUS") != null) objNewChildNode.setAttribute("STATUS", objRecChildNodes[j].getAttribute("STATUS"));

                if (objRecChildNodes[j].getAttribute("STATUS_VAL") != null) objNewChildNode.setAttribute("STATUS_VAL", objRecChildNodes[j].getAttribute("STATUS_VAL"));

                objReturnDataRecNode.appendChild(objNewChildNode);
            }
        }
    }

    return objReturnDataRecNode;
}

function fnProcessFCJRecNodeSummary(pobjFCJXMLRecNode, pobjFCJXMLDOM, pobjDataDOM, pblnRecursive)
{
    var objFVNode, objRecChildNodes, objNewChildNode, objNodesOfThisType;
    var arrFieldValues, arrFieldNames, strRecType, intID;
    var objReturnDataRecNode;

    arrFieldValues = new Array();
    arrFieldNames = new Array();

    objFVNode = selectSingleNode(pobjFCJXMLRecNode,"FV");
    arrFieldValues = getNodeText(objFVNode).split("~");

    //Added bY Saidul neophase2.
    arrFieldNames = getNodeText(selectSingleNode(pobjFCJXMLDOM,"//MSG/FLD/FN")).split("~");

    objReturnDataRecNode = pobjDataDOM.createElement(pobjFCJXMLRecNode.getAttribute("TYPE"));

    for (var i = 0; i < arrFieldNames.length; i++)
    {
        if (arrFieldNames[i] != "")
        {
            objNewChildNode = dbDataDOM.createElement(arrFieldNames[i]);
            setNodeText(objNewChildNode, arrFieldValues[i]);
            objReturnDataRecNode.appendChild(objNewChildNode);
        }
    }

    if (pblnRecursive)
    {
        objRecChildNodes = selectNodes(pobjFCJXMLRecNode,"REC");

        if (objRecChildNodes != null)
        {
            for (var j = 0; j < objRecChildNodes.length; j++)
            {
                objNewChildNode = fnProcessFCJRecNodeSummary(objRecChildNodes[j], pobjFCJXMLDOM, pobjDataDOM, true); //----> Recursive

                if (selectNodes(pobjFCJXMLRecNode,"REC[@TYPE='" + objRecChildNodes[j].getAttribute("TYPE") + "']").length > 1)
                {
                    strRecType = "MULTIPLE";
                } else
                {
                    strRecType = "SINGLE";
                }

                objNodesOfThisType = selectNodes(objReturnDataRecNode,objNewChildNode.nodeName);
                if (objNodesOfThisType != null)
                {
                    intID = objNodesOfThisType.length + 1;
                } else
                {
                    intID = 1;
                }

                objNewChildNode.setAttribute("ID", intID);
                objNewChildNode.setAttribute("Type", strRecType);

                if (objRecChildNodes[j].getAttribute("RECID") != null) objNewChildNode.setAttribute("RECID", objRecChildNodes[j].getAttribute("RECID"));

                if (objRecChildNodes[j].getAttribute("STATUS") != null) objNewChildNode.setAttribute("STATUS", objRecChildNodes[j].getAttribute("STATUS"));

                if (objRecChildNodes[j].getAttribute("STATUS_VAL") != null) objNewChildNode.setAttribute("STATUS_VAL", objRecChildNodes[j].getAttribute("STATUS_VAL"));

                objReturnDataRecNode.appendChild(objNewChildNode);
            }
        }
    }

    return objReturnDataRecNode;
}

function fnGetFCJRecNodeForDataNode(pobjDataDOMNode, pobjCurrentFCJXMLDOM)
{

    var objReturnRecNode, objFNDefinitionForDataNode, strDataDOMNodeName, arrFieldNames, strFieldValue, objFieldNode, objFVNode;

    strDataDOMNodeName = pobjDataDOMNode.nodeName;
    objReturnRecNode = pobjCurrentFCJXMLDOM.createElement("REC");
    objReturnRecNode.setAttribute("TYPE", strDataDOMNodeName);
    objFNDefinitionForDataNode = selectSingleNode(pobjCurrentFCJXMLDOM,"//*/FN[@TYPE='" + strDataDOMNodeName + "']");
    if (objFNDefinitionForDataNode != null)
    {
        arrFieldNames = getNodeText(objFNDefinitionForDataNode).split("~");
    }
    strFieldValue = "";
    for (var i = 0; i < arrFieldNames.length; i++)
    {
        if (arrFieldNames[i] != "")
        {
            objFieldNode = selectSingleNode(pobjDataDOMNode, arrFieldNames[i]);
            if (objFieldNode != null)
            {
                strFieldValue += getNodeText(objFieldNode);
            }
            if (i + 1 < arrFieldNames.length)
            {
                strFieldValue += "~";
            }
        }
    }
    objFVNode = pobjCurrentFCJXMLDOM.createElement("FV");
    setNodeText(objFVNode, strFieldValue);
    objReturnRecNode.appendChild(objFVNode);

    for (var i = 0; i < pobjDataDOMNode.childNodes.length; i++)
    {
        if (pobjDataDOMNode.childNodes[i].childNodes.length > 0)
        {
            if (pobjDataDOMNode.childNodes[i].childNodes.length == 1)
            {
                if (pobjDataDOMNode.childNodes[i].childNodes[0].nodeType == 1)
                {
                    objReturnRecNode.appendChild(fnGetFCJRecNodeForDataNode(pobjDataDOMNode.childNodes[i], pobjCurrentFCJXMLDOM));
                }
            } else
            {
                objReturnRecNode.appendChild(fnGetFCJRecNodeForDataNode(pobjDataDOMNode.childNodes[i], pobjCurrentFCJXMLDOM));
            }
        }
    }
    return objReturnRecNode;
}

//----------------------------------------------------------------------------------------------------------------------
function fnUpdateFCJMsgAttributes(pobjFCJXMLDOM)
{
    var strAuthorization, strMessageStatus, strMessageType, strOP, strStage, strTimeStamp, strUserID, strWorkFlow;
    var objFCJMSGNode;

    strAuthorization = "";
    strMessageStatus = "REQUEST";
    strMessageType = "";
    strOP = document.getElementById("OP").value;
    strTimeStamp = "";
    strUserID = "";
    strWorkFlow = "DE";

    objFCJMSGNode = selectSingleNode(pobjFCJXMLDOM,"FCJMSG/MSG");

    objFCJMSGNode.setAttribute("AUTHORIZATION", strAuthorization);
    objFCJMSGNode.setAttribute("MSGSTATUS", strMessageStatus);
    objFCJMSGNode.setAttribute("MSGTYPE", strMessageType);
    objFCJMSGNode.setAttribute("OP", strOP);
    objFCJMSGNode.setAttribute("STAGE", strStage);
    objFCJMSGNode.setAttribute("TIMESTAMP", strTimeStamp);
    objFCJMSGNode.setAttribute("USERID", strUserID);
    objFCJMSGNode.setAttribute("WORKFLOW", strWorkFlow);

    return pobjFCJXMLDOM;
}

function fnPost(fcjMsgDOM, serverURL, functionID) {
    mainWin.fnUpdateScreenSaverInterval();/*12.0.2 Screen Saver Changes*/
    debugs("serverURL", serverURL);
    debugs("Request Message", getXMLString(fcjMsgDOM));
    if (fcjMsgDOM != null) {
        //mask();  //REDWOOD_CHANGES
        /*To mask when system is processing - start*/
        if (getBrowser().indexOf("IE") >= 0) {
            //ie11 changes
            window.showModelessDialog("Processing.html", null, "status:no;resizable:no;dialogHeight:0px;dialogWidth:0px;dialogLeft:0px;dialogTop:0px");
        }
        /*To mask when system is processing - end*/
        var strFormData = getXMLString(fcjMsgDOM).replace(/\s\/>/g, '/>');;
        var objHTTP = createHTTPActiveXObject();
		try{//9NT1606_12_2_RETRO_12_0_3_21182929 changes 
        objHTTP.open("POST", serverURL, false);
        objHTTP.setRequestHeader("Content-Type", "application/xml");
        objHTTP.setRequestHeader("charset", "utf-8");

        objHTTP.setRequestHeader("FUNCTIONID", functionID);
        objHTTP.setRequestHeader("OPERATION", gAction);
        objHTTP.setRequestHeader("TXNBRANCH", g_txnBranch);

        if (typeof (seqNo) != 'undefined') {
            // 21258435 starts
            objHTTP.setRequestHeader("SEQNO", seqNo);
        } else if (typeof (parent.seqNo) != 'undefined') {
            objHTTP.setRequestHeader("SEQNO", parent.seqNo);
        } else if (typeof (parent.parent.seqNo) != 'undefined') {
            objHTTP.setRequestHeader("SEQNO", parent.parent.seqNo);
        }
        // 21258435 ends
        //9NT1606_12_4_RETRO_12_0_3_26231107 start
		else if (typeof(parent.parent.parent.seqNo) != 'undefined') {
			objHTTP.setRequestHeader("SEQNO", parent.parent.parent.seqNo);
		}
		//9NT1606_12_4_RETRO_12_0_3_26231107 end
        objHTTP.setRequestHeader("X-CSRFTOKEN", mainWin.CSRFtoken);
        if (typeof (g_SummaryType) != 'undefined') {
            if (g_SummaryType == "U")
                objHTTP.setRequestHeader("DBUPLOAD", "TRUE");
            else 
                objHTTP.setRequestHeader("DBUPLOAD", "FALSE");
        } else {
            objHTTP.setRequestHeader("DBUPLOAD", "FALSE");
        }

        if (strFormData.indexOf("<ATTACHMENTS>") >  - 1) {
            objHTTP.setRequestHeader("HASATTACHMENTS", "TRUE");
        } else {
            objHTTP.setRequestHeader("HASATTACHMENTS", "FALSE");
        }
        //ends here --sandeep
        //Performance Changes  
        var isException = false;
        var t = getDateObject();
        // if(gAction != 'RELEASELOCK')
        posttime = (t.getHours() * (3600 * 1000)) + (t.getMinutes() * (60 * 1000)) + (t.getSeconds() * 1000) + t.getMilliseconds();
        var clientTime = (t.getHours() * (3600)) + (t.getMinutes() * (60)) + (t.getSeconds());
        //Performance Changes
        if (getBrowser().indexOf("SAFARI") !=  - 1) {
            objHTTP.setRequestHeader("SAFARIREQ", "TRUE");
        } else {
            objHTTP.setRequestHeader("SAFARIREQ", "FALSE");
        }
        if (typeof(safariReqSentOnce)!= "undefined" && safariReqSentOnce == true) {
            objHTTP.setRequestHeader("SAFARIREQSENTONCE","TRUE");
        } else {
            objHTTP.setRequestHeader("SAFARIREQSENTONCE","FALSE");
        }
        objHTTP.setRequestHeader("CLIENTTIME",clientTime);
        safariReqSentOnce = false;
        //try { //9NT1606_12_2_RETRO_12_0_3_21182929 changes 
            objHTTP.send(strFormData);
        } catch(e) {
            if (getBrowser().indexOf("SAFARI") != -1) {
                if ((e.code && e.code == 101 && e.message && e.message.indexOf("NETWORK_ERR") != -1) || (e.code && e.code == 23 && e.message && e.message.indexOf("DOM Exception") != -1)) {
                    isException = true;
                }
            }
			else //9NT1606_12_2_RETRO_12_0_3_21182929 starts
			{
				mainWin.handleNetWorkErr(e);
			} //9NT1606_12_2_RETRO_12_0_3_21182929 ends 
        }
        //Performance Changes
        t = getDateObject();
        //if(gAction != 'RELEASELOCK')
        afterposttime = (t.getHours() * (3600 * 1000)) + (t.getMinutes() * (60 * 1000)) + (t.getSeconds() * 1000) + t.getMilliseconds();
        //Performance Changes
        var response = null;
        if (!isException) {
            if (objHTTP.status != 200) {
                //200 - OK
                //BUG: No hard coded message this alert will never arrive so ignore!!!!LBL_ERR_DESC
                alert(mainWin.getItemDesc("LBL_ERR_DESC") + objHTTP.status + ":" + objHTTP.statusText);
    
            } else {
                mainWin.inactiveTime = 0;
                var csrfNode = selectSingleNode(objHTTP.responseXML, "//CSRF");
                if (csrfNode != null && getNodeText(csrfNode) == "SM-00420") {
                    alert(getNodeText(csrfNode) + mainWin.getItemDesc("LBL_REQUEST_TAMPERED"));
                } else if (selectSingleNode(objHTTP.responseXML, "//SESSION") != null && getNodeText(selectSingleNode(objHTTP.responseXML, "//SESSION")) == "EXPIRED") {
                    //session expiry change  start
                    mainWin.mask();
                    mainWin.sessionTimeOut = true;
                    mainWin.showAlerts(fnBuildAlertXML("", "I", mainWin.getItemDesc("LBL_SESSION_EXPIRED")), "S");
                    return false;
                }
                response = objHTTP.responseXML;
                if(selectSingleNode(objHTTP.responseXML, "//SAFARIREQ") != null && getNodeText(selectSingleNode(objHTTP.responseXML, "//SAFARIREQ")) == "TRUE") {
                    fnSetDelay(2000);
                    safariReqSentOnce = true;
                    isException = false;
                    response = fnPost(fcjMsgDOM, servletURL, functionId);
                    return response;
                }
                if (response == null || getXMLString(response) == "") {
                    //BUG: No hard coded message
                    response = null;
                    alert(mainWin.getItemDesc("LBL_SERVER_FAILED"));
                }
            }
            //debug revert
            if (mainWin.DebugWindowFlg == 'Y') {
                if (!mainWin.debugWindow.closed) {
                    var clientServerString = getXMLString(fcjMsgDOM);
                    var finalRequest = formatString(clientServerString);
                    debugs("RequestXML", finalRequest);
                    if (response) {
                        var finalResponse = formatString(getXMLString(response));
                        debugs("ResponseXML", finalResponse);
                    }
                }
            } else 
                debugFlg = false;
            unmask();
            var l_dbDebugPath = "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_DEBUG_RESP";
            // Fix for 16400255 
            if (response) {
                if (selectSingleNode(response, l_dbDebugPath))
                    mainWin.serverDebugStmt = getXMLString(selectSingleNode(response, l_dbDebugPath));
            }
            var respTxt = getXMLString(response);
            if (respTxt.indexOf("<FCUBS_DEBUG_RESP>") !=  - 1) {
                var start = respTxt.substring(0, respTxt.indexOf("<FCUBS_DEBUG_RESP>"));
                var end = respTxt.substring(respTxt.indexOf("</FCUBS_DEBUG_RESP>") + 19, respTxt.length);
                respTxt = start + end;
                response = loadXMLDoc(respTxt);
            }
            return response;
        } else {
            fnSetDelay(2000);
            safariReqSentOnce = true;
            isException = false;
            response = fnPost(fcjMsgDOM, servletURL, functionId);
            return response;
        }
    }

}
function formatString(clientServerString)
{
    var finalString = "";
    var tabCnt = 0;
    var str = "</";
    for (var i = 0; i < clientServerString.length; i++)
    {
        if (clientServerString.charAt(i) == "<") //find occurrence of "<" character in the request or response XML
        {
            if (clientServerString.charAt(i + 1) == "/") //find occurrence of "/" character in the request or response XML
            {
                if (tabCnt == 0) // if "/" found and tabCnt if zero append to finalString the final XML Response or request.
                {
                    finalString = finalString + '\n' + clientServerString.charAt(i);
                    tabCnt++;
                } else // if "/" found and decrement tabCnt and append to finalString the final XML Response or request.
                {
                    finalString = finalString + '\n';
                    for (var j = 0; j < tabCnt - 1; j++) finalString = finalString + '\t';
                    finalString = finalString + clientServerString.charAt(i);
                    tabCnt--;
                }
            } else if (clientServerString.charAt(i + 1) == "!") // if "!" found leave the tabCnt counter as such append to finalString the final XML Response or request.
            {
                finalString = finalString + '\n';
                for (var j = 0; j < tabCnt - 1; j++) finalString = finalString + '\t';
                finalString = finalString + clientServerString.charAt(i);
            } else // if "<" found increment the tabCnt counter and if not zero append to finalString with the require tabs left or else increment tabCnt and append to finalString the final XML Response or request.
            {
                if (tabCnt == 0)
                {
                    finalString = finalString + '\n' + clientServerString.charAt(i);
                    tabCnt++;
                } else
                {
                    finalString = finalString + '\n';
                    for (var j = 0; j < tabCnt; j++) finalString = finalString + '\t';
                    finalString = finalString + clientServerString.charAt(i);
                    tabCnt++;
                }
            }
        } else // if none of (<,/,!) found append to finalString the final XML Response or request.
        finalString = finalString + clientServerString.charAt(i);
    }

    return finalString;
}

function setDataXML(dataXML)
{
    dbDataDOM = loadXMLDoc(dataXML);
}

function getDataXML()
{
    return dbDataDOM;
}

function displayResponse(messageNode, msgStatus) {

    if (!msgStatus || typeof(msgStatus) == 'undefined') {
        var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
    }

    if(messageNode!= null){
    if(msgStatus == 'SUCCESS') {
        alertAction = "SUCCESS";
        type = "I";
    } else if (msgStatus == 'WARNING') {
        alertAction = "OVERRIDE";
        type = "O";
    } else if (msgStatus == 'FAILURE') {
        alertAction = "ERROR";
        type = "E";
    }
    mask();
    showAlerts(getXMLString(messageNode), type);
    /*  TODO to be done by branch team
    if (typeof(screenType) != 'undefined' && screenType == 'WB') //Changed By Amit. 09-Jan-08
    return returnVal;
    */
    } else {
        mask();
        //showAlerts(fnBuildAlertXML('ST-COM036','E'),'E');
        showAlerts(fnBuildAlertXML("", "E", mainWin.getItemDesc("LBL_SERVER_FAILED")), "E");
        alertAction = "UNMASK";
        return "FAILURE";
    }
                }

function fnPostProcessResponse(msgStatus) {
    try {
    if (msgStatus == "SUCCESS") {
        //eval("fn" + processingAction + "Success()");
        var fnEval = new Function("fn" + processingAction + "Success()");  
        fnEval();
    } else {
        //eval("fn" + processingAction + "Failure()");
        var fnEval = new Function("fn" + processingAction + "Failure()");  
        fnEval();
            return;
        }
    } catch(e) {
        //WRITE CODE APPROPRIATELY
    }
}

function showAuditData(currObject, value)
{
    var DBC = currObject.getAttribute("DBC");

    if (DBC.toUpperCase() == "AUTH_STAT" || DBC.toUpperCase() == "AUTHSTAT") //REDWOOD_35851541 
    {
        if (value == "A")
        {
            //currObject.checked = true; //REDWOOD_CHANGES
            currObject.value = true; //REDWOOD_CHANGES
        } else if (value == "U")
        { // Else change the state of the checkbox
            //currObject.checked = false; //REDWOOD_CHANGES
            currObject.value = false;  //REDWOOD_CHANGES
        }

    } else if (DBC.toUpperCase() == "RECORD_STAT")
    {
        if (value == "C") currObject.value = false;	//REDWOOD_CHANGES
        else if (value == "O") currObject.value = true;	  //REDWOOD_CHANGES
    } else if (DBC.toUpperCase() == "ONCE_AUTH")
    { // Once Auth also needs to be checked.
        if (value == "N" || value == "")
        {
            currObject.value = false;//REDWOOD_CHANGES
        } else if (value == "Y")
        {
            currObject.value = true;  //REDWOOD_CHANGES
        }
    }
}

function getAuditData(currObject, DBT)
{
    var DBC = currObject.getAttribute("DBC");
    var value = "";
    if (DBT == dbStrRootTableName)
    {
        if (DBC == undefined)
        {
            return;
        }
        if (DBC.toUpperCase() == "RECORD_STAT")
        {
            if (currObject.value)//REDWOOD_CHANGES
            {
                value = "O";
            } else
            {
                value = "C";
            }
        }
        if (DBC.toUpperCase() == "AUTH_STAT")
        {
            if (currObject.value)	//REDWOOD_CHANGES
            {
                value = "A";
            } else
            {
                value = "U";
            }
        }
    }
    return value;
}

function fnWhenAuditChange()
{
    var srcElem = getEventSourceElement(event);
    curAuditElement = srcElem.name;
    if (curAuditElement == "AUTH_STAT")
    {
        dbAuthFlag = true;
    }
    if (curAuditElement == "RECORD_STAT")
    {
        dbRecFlag = true;
    }
}

function getNodeList(parentNode, nodeName)
{
    var query = getQueryWithId(parentNode);
    var nodeList = selectNodes(dbDataDOM,query + "/" + nodeName);
    return nodeList;
}

function doNavigate(type)
{
    switch (type)
    {
    case gcNAV_FIRST:
        {
            fnFirst();
            break;
        }
    case gcNAV_PREVIOUS:
        {
            fnPrev();
            break;
        }
    case gcNAV_NEXT:
        {
            fnNext();
            break;
        }
    case gcNAV_LAST:
        {
            fnLast();
            break;
        }
    default:
        {
            debugs("Program Error:STDBRANC.jsp doNavigate doesn't handle this action", "");
        }
    }
}

function goToRec(recNum)
{

    if (!fnPreGoToRec())
    {
        return;
    }
    var pureXMLDOM;

    if (intCurrentQueryRecordCount > 0)
    {
        if (recNum < 1 || recNum > intCurrentQueryRecordCount)
        {
            alert(mainWin.getItemDesc("LBL_OUT_RANGE") + " " + intCurrentQueryRecordCount);
            return;
        } else
        {
            intCurrentQueryResultIndex = recNum;
            pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, intCurrentQueryResultIndex);
            if (gIsAuditExist)
            {			
//REDWOOD_CHANGES
                if (document.getElementsByName("CHECKER_DT_STAMP")[0]) 
                    document.getElementsByName("CHECKER_DT_STAMP")[0].value = '';
                if (document.getElementsByName("CHECKERSTAMP")[0]) 
                    document.getElementsByName("CHECKERSTAMP")[0].value = '';	 
//REDWOOD_CHANGES
                if (document.getElementsByName("CHECKER_ID")[0]) 
                    document.getElementsByName("CHECKER_ID")[0].value = '';
                if (document.getElementsByName("CHECKERID")[0]) 
                    document.getElementsByName("CHECKERID")[0].value = '';
            }
            debugs("pureXMLDOM", getXMLString(pureXMLDOM));
            setDataXML(getXMLString(pureXMLDOM));
            showData(dbStrRootTableName, 1);
        }
    }
    fnPostGoToRec();
}

function fnGetTxnStatus(pureXMLDOM)
{
    var l_ModNO = selectSingleNode(pureXMLDOM,"//MOD_NO");
    var l_IsMaintScr = true;
    var l_TxtStat = "//RECORD_STAT";
    var l_Auth_Stat = "//AUTH_STAT";
    var l_TxnStat_Val = "";
    var l_Auth_Stat_Val = "";

    if (l_ModNO == null)
    {
        l_IsMaintScr = false;
        l_TxtStat = "//CONTRACT_STATUS";
        l_Auth_Stat = "//AUTH_STATUS";
    } //if   

    if (selectSingleNode(pureXMLDOM, l_TxtStat)) l_TxnStat_Val = getNodeText(selectSingleNode(pureXMLDOM, l_TxtStat));
    if (selectSingleNode(pureXMLDOM, l_Auth_Stat)) l_Auth_Stat_Val = getNodeText(selectSingleNode(pureXMLDOM, l_Auth_Stat));

    return (l_TxnStat_Val + "~" + l_Auth_Stat_Val);

}

function fnFirst()
{
    goToRec(1);
}

function fnPrev()
{
    goToRec(intCurrentQueryResultIndex - 1);
}

function fnNext()
{
    goToRec(intCurrentQueryResultIndex + 1);
}

function fnLast()
{
    goToRec(intCurrentQueryRecordCount);
}

function toolbarActions()
{
    mainWin.disableActionsInToolbar();
}

function toolbarReset()
{
    mainWin.enableActionsInToolbar();
}

function fnDisableSaveForSummary()
{
    mainWin.disableSaveInToolbarForSummary();
}

function fnDisableDeleteForSummary()
{
    mainWin.disableDeleteInToolbarForSummary();
}

function getHasMoreRecordsindicator()
{
    if (typeof(getXMLString(fcjResponseDOM)) != "unknown" && typeof(getXMLString(fcjResponseDOM)) != "undefined")
    {
        if (selectSingleNode(fcjResponseDOM, "FCJMSG/MSG"))
        {
            var hasMore = selectSingleNode(fcjResponseDOM, "FCJMSG/MSG").getAttribute("HAS_MORE");
            if (hasMore && hasMore == 'Y') //enable some Indicator to show that there are some more unfetched recoreds in f8.  
            return "<font color='Red'>+</font>";
            else return "";
        } else return "";
    } else return "";
}

function getCurrentRecord()
{
    var pureXMLDOM;

    if (intCurrentQueryResultIndex == 0)
    {
        intCurrentQueryResultIndex = 1;
    }
    pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, intCurrentQueryResultIndex);
    return pureXMLDOM;
}

function showDataForSummary()
{
    showData("SUMMARY", 1);
    var objResultTable = document.getElementById("BLK_" + dbStrRootTableName);
    var objTableRows = objResultTable.tBodies[0].rows;
    if (objTableRows != null && typeof(objTableRows) != "undefined")
    {
        for (var i = 0; i < objTableRows.length; i++)
        {
            //objTableRows[i].setAttribute("ondblclick", "fnDetailScreen(event)");
            addeEvent(objTableRows[i], "ondblclick", "fnDetailScreen(event)");
            addeEvent(objTableRows[i], "ontouchstart", "fnDetailScreenDevice(event)");//HTML5 Changes
        }
    }
}

function GetDataDOMForSummary(pobjFCJDOM)
{
    var objReturnDataDOM, objRecNodeList, objDataNodeForRecord;
    var strSummaryXML = "";

    objRecNodeList = selectNodes(pobjFCJDOM, "//FCUBS_BODY/REC")

    for (var i = 0; i < objRecNodeList.length; i++)
    {
        objDataNodeForRecord = fnProcessFCJRecNode(objRecNodeList[i], pobjFCJDOM, objReturnDataDOM, false);
        strSummaryXML += getXMLString(objDataNodeForRecord);
    }

    objReturnDataDOM = loadXMLDoc("<SUMMARY ID='1'>" + strSummaryXML + "</SUMMARY>");
    return objReturnDataDOM;
}

/*HTML5 Changes Start*/
var doubleTap = false;
function fnDetailScreenDevice(event) {
    var evnt = window.event || event;
    if(!doubleTap) {
        doubleTap = true;
        setTimeout( function() { doubleTap = false; }, 500 );
        return false;
    }
    preventpropagate(evnt);
    fnDetailScreen(event);
}
/*HTML5 Changes End*/

var focusDetailReq =  false;//Fix for 18549211
function fnDetailScreen(e)
{
 inDate=setActionTime(); //Performance Changes
    try{
        fnPreDetailScreen(e);
    }catch(e){    }
    
    fnDisableDeleteForSummary();

    if (typeof(detailRequired) != 'undefined' && !detailRequired)
    {
        return false;
        //End Added By Saidul
    }

    var rowIndex = getRowIndex(e); //static header change
    if (document.getElementsByName("Records")[0] && document.getElementsByName("CurPage")[0])
    {
        rowIndex = (document.getElementsByName("Records")[0].value * (getInnerText(document.getElementsByName("CurPage")[0]) - 1)) + rowIndex;
    }

    /* THESE VARIABLE WILL BE UESD IN EXECUTEQUERY WHEN THE DETAILED SCREEN IS LAUNCED FORM SUMMARY */
    detailWinParams.ShowSummary = "TRUE";
    detailWinParams.sumTxnBranch = sumTxnBranch;
    detailWinParams.CurrentRecNum = rowIndex;
    detailWinParams.lastRequestTS = lastRequestTS;
    detailWinParams.inDate  = inDate.getTime();
    ShowSummary = "TRUE";
    var fromSummary = 'TRUE';

     /*Non extensible summary to detail fix start*/
    gAction = "EXECUTEQUERY";
     /*Non extensible summary to detail fix end*/
    /*dlgArg.ShowSummary = "TRUE";
    dlgArg.CurrentRecNum = rowIndex;
    dlgArg.sourceWin = window;
    dlgArg.lastRequestTS = lastRequestTS;
    dlgArg.sumTxnBranch = sumTxnBranch;
    */

    var recNode = selectSingleNode(fcjResponseDOM, "//MSG/REC[position()=" + rowIndex + "]");
    var recID = selectSingleNode(fcjResponseDOM, "//MSG/REC[position()=" + rowIndex + "]").getAttribute("RECID");
    var recTYPE = selectSingleNode(fcjResponseDOM, "//MSG/REC[position()=" + rowIndex + "]").getAttribute("TYPE");

    var l_IsView = true;
    if (recTYPE == dataSrcLocationArray[0]) l_IsView = false;

    recTYPE = dataSrcLocationArray[0];

    var fcjRequestSummDOM = buildSummaryUBSXml(recTYPE, recID);
    var fcjResponseDOM_Temp = "";
    if(ShowSummary =="TRUE"){
        fcjResponseDOM_Temp = fnPost(fcjRequestSummDOM, servletURL+"?fromSummary="+ShowSummary, functionId);
     }else{
        fcjResponseDOM_Temp = fnPost(fcjRequestSummDOM, servletURL, functionId);
    }
    detailWinParams.posttime  = posttime;
    detailWinParams.afterposttime  = afterposttime;
   // var fcjResponseDOM_Temp = fnPost(fcjRequestSummDOM, servletURL, functionId);
  
	/*Non extensible summary to detail fix start*/
    gAction="";
     /*Non extensible summary to detail fix end*/
    if (!fcjResponseDOM_Temp) return;

    //dlgArg.SummaryResultFCJXML = fcjResponseDOM_Temp; TODO
    /*SAMPATH*/
    detailWinParams.response = fcjResponseDOM_Temp;
    dbDataDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM_Temp, 1);
    focusDetailReq = true;//Fix for 18549211
    
    var xmlDOM = loadXMLDoc(mainWin.getXmlMenu());
    var uiNameNode;
    uiNameNode = selectSingleNode(xmlDOM,"//*[@FNID = '" + parentFunc + "']");
    var uiName = "";
    if (uiNameNode)
    {
        for (var i = 0; i < uiNameNode.attributes.length; i++)
        {
            if (uiNameNode.attributes[i].nodeName == "UINAME")
            {
                uiName = getNodeText(uiNameNode.attributes[i]);
                break;
            }
        }
    }

    var timeStamp = getDateObject();
    var numeric='';
    //var newwin = dlgArg.mainWin.showModelessDialog("SMSStartLogServlet?funcid=" + parentFunc + "&uiName=" + uiName + "&timestamp=" + timeStamp.getTime()+ "&numeric="+numeric, dlgArg, "dialogTop:85px;dialogLeft:253px; dialogHeight:480px; dialogWidth:640px; help:yes; resizable:yes; scroll:no; status:no");
    //Performance Changes        
    //fnpostAction('EXECUTEQUERY',fcjResponseDOM_Temp );
    fnCalcHgt();
    
    mainWin.dispHref1(parentFunc, seqNo,fromSummary);

    //dlgArg.mainWin.loadChildWindow(newwin);//TODO

}

function getCurrentRow(e)  //11.2 ITR1 SFR#123 cross browser issue event parameter added
{
    var event = window.event || e; //11.2 ITR1 SFR#123
    var objTR;
    if (event != null) {
        objTR = getEventSourceElement(event);
        try {
            while (objTR.tagName != "TR") {
                objTR = objTR.parentNode;
            }
        } catch(e)
        {}
    }
    return objTR;
}			  
//REDWOOD_CHANGES
function getRowIndex(e) {//debugger;
    var objTR;
    var rowIndex =  - 1;
    var event = window.event || e;
    if (event != null) {
        objTR = getEventSourceElement(event);
        if (objTR.tagName.toUpperCase() == 'BUTTON' && typeof(objTR.getAttribute("id"))!= "undefined" && objTR.getAttribute("id")!=""&& objTR.getAttribute("id")!= null) {//Only for Button in ME
            objTR =   document.getElementById(objTR.getAttribute("id"));
        } //21354309 
        try {
            while (objTR.tagName != "TR") {
                objTR = objTR.parentNode;
            }
            rowIndex = objTR.rowIndex;
            //rowIndex = rowIndex + 1; //OJET Migration

        }
        catch (e) {
        }
    }
    return rowIndex;
}
function getRowIndex_old(e)	  
//REDWOOD_CHANGES
{
    var event = window.event || e;
    var objTR;
    var rowIndex = -1;

    if (event != null)
    {
       // objTR = event.srcElement;
        objTR = getEventSourceElement(event);
        try //SFR 2095
        {
            while (objTR.tagName != "TR")
            {
                objTR = objTR.parentNode;
            }
            rowIndex = objTR.rowIndex;
			/* Added for pagination of multiple entry block */
	        if ("Y" == getPagenationReq()) {
	            rowIndex = getRowIndexTableId(rowIndex, objTR);
	        }
                rowIndex = rowIndex +1;
        } catch(e)
        {}
    }
    return rowIndex;
}

/* Added for pagination of multiple entry block */
function getRowIndexTableId(l_rowIndex, objTR) {
    while (objTR.tagName.toUpperCase() != "TABLE") {
        objTR = objTR.parentNode;
    }
    if (document.getElementById("CurrPage__" +objTR.id)) {
        var l_pageSize = getPageSize(objTR.id);
        var l_currPage = +getInnerText(document.getElementById("CurrPage__" +objTR.id));
        l_rowIndex = ((l_currPage-1) * l_pageSize) + l_rowIndex;                
    }
    return l_rowIndex;
}

function parseSummaryResponse(responseDOM)
{

    var msgStatus = selectSingleNode(responseDOM, "FCJMSG/MSG").getAttribute("MSGSTATUS");
    var messageNode = selectSingleNode(responseDOM, "FCJMSG/MSG/RESPONSE");
    displayResponse(messageNode);
}

function getRecord(recNum)
{
    return fnGetDataXMLFromFCJXML(fcjResponseDOM, recNum);
}

function fnGetPKInfo()
{
    var pk = "";

    for (var loopIndex = 0; loopIndex < pkFields.length; loopIndex++)
    {
        if (loopIndex > 0) pk += "~";
        pk += pkFields[loopIndex].substr(pkFields[loopIndex].indexOf("__") + 2);
        pk += ":";
        pk += document.getElementById(pkFields[loopIndex]).value;
    }

    return pk;
}

function fnGetPKValues()
{
    var pk = "";

    for (var loopIndex = 0; loopIndex < pkFields.length; loopIndex++)
    {
        if (loopIndex > 0) pk += "~";
        pk += document.getElementById(pkFields[loopIndex]).value;
    }
    return pk;
}

function fnClearPKFields()
{

    for (var fieldIndex = 0; fieldIndex < pkFields.length; fieldIndex++)
    {

        if (document.getElementById(pkFields[fieldIndex]))
        {
            if (document.getElementById(pkFields[fieldIndex]).type.toUpperCase() == 'RADIO')
            {
                var elemName = document.getElementById(pkFields[fieldIndex]).name;
                if (elemName)
                {
                    var radioElem = document.getElementsByName(elemName);
                    if (radioElem.length > 0)
                    {
                        for (var elemCnt = 0; elemCnt < radioElem.length; elemCnt++)
                        {
                            if (radioElem[elemCnt].getAttribute("DEFAULT") == 'yes') radioElem[elemCnt].checked = true;
                            else radioElem[elemCnt].checked = false;
                        }
                    } else
                    {
                        radioElem.checked = false;
                    }
                }
            } else if (document.getElementById(pkFields[fieldIndex]).tagName.toUpperCase() == 'SELECT')
            {
                var tmpElem = document.getElementById(pkFields[fieldIndex]);
                var selOptions = tmpElem.options;
                var anySelected = false;
                for (var optnCnt = 0; optnCnt < selOptions.length; optnCnt++)
                {
                    if (selOptions[optnCnt].getAttribute("DEFAULT"))
                    {
                        anySelected = true;
                        tmpElem.value = selOptions[optnCnt].getAttribute("DEFAULT");
                    }
                }
                if (!anySelected) tmpElem.value = selOptions[0].value;

            } else if (document.getElementById(pkFields[fieldIndex]).type.toUpperCase() == 'CHECKBOX')
            {
                var tmpElem = document.getElementById(pkFields[fieldIndex]);
                if (tmpElem.DEFAULT == 'yes') tmpElem.checked = true;
                else tmpElem.checked = false;
            } else
            {
                document.getElementById(pkFields[fieldIndex]).value = "";
                var object = document.getElementById(pkFields[fieldIndex]);
                var indexDate = getOuterHTML(object).indexOf("displayDate");
                var indexAmount = getOuterHTML(object).indexOf("displayAmount");
                var indexNumber = getOuterHTML(object).indexOf("displayFormattedNumber");
                if (indexDate > 0 || indexAmount > 0 || indexNumber > 0){
                    getNextSibling(getNextSibling(object)).value ="";
                }
            }
        }
    }

}

function fnIsColPK(fieldName)
{
    var isColPK = false;
    for (var fieldIndex = 0; fieldIndex < pkFields.length; fieldIndex++)
    {
        if (pkFields[fieldIndex] == fieldName)
        {
            isColPK = true;
            break;
        }
    }
    return isColPK;
}

var AUDIT_COLS = new Array();
//kals on July 3 maker_id names are different for M and T screens
//var l_Form = document.forms[0];

AUDIT_COLS[0] = "RECORD_STAT";
AUDIT_COLS[1] = "ONCE_AUTH";

AUDIT_COLS[2] = "AUTH_STAT";
AUDIT_COLS[3] = "MOD_NO";
AUDIT_COLS[4] = "MAKER_ID";
AUDIT_COLS[5] = "MAKER_DT_STAMP";
AUDIT_COLS[6] = "CHECKER_ID";
AUDIT_COLS[7] = "CHECKER_DT_STAMP";
AUDIT_COLS[8] = "MAKER_DT_STAMP";
AUDIT_COLS[9] = "CONTSTAT";
AUDIT_COLS[10] = "PROCESSTAT";

AUDIT_COLS[11] = "AUTHSTAT";
AUDIT_COLS[12] = "MAKERID";
AUDIT_COLS[13] = "MAKERSTAMP";
AUDIT_COLS[14] = "CHECKERID";
AUDIT_COLS[15] = "CHECKERSTAMP";
AUDIT_COLS[16] = "MAKERSTAMP";

function fnIsAuditBlockColumn(fieldName)
{
    var isAuditField = false;
    for (var fieldIndex = 0; fieldIndex < AUDIT_COLS.length; fieldIndex++)
    {
        if (AUDIT_COLS[fieldIndex] == fieldName)
        {
            isAuditField = true;
            break;
        }
    }
    return isAuditField;
}

function fnClearAuditFields()
{
    var elements = document.getElementById("DIV_BLK_AUDIT").getElementsByTagName("INPUT");
    for (var loopIndex = 0; loopIndex < elements.length; loopIndex++)
    {
        var tmpElem = elements[loopIndex];
        switch (tmpElem.type.toUpperCase())
        {
        case "TEXT":
            tmpElem.value = "";
            break;
        case "HIDDEN":
            tmpElem.value = "";
            break;
        case "CHECKBOX":
            tmpElem.checked = false;
            break;
        }
    }
}

function fnProcessResponse()
{

    if (!fcjResponseDOM)
    {
        if (getXMLString(fcjResponseDOM) == "") return;
        return;
    }

    debugs("fcjResponseDOM", getXMLString(fcjResponseDOM))

    var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
    var messageNode = ""
    if (msgStatus == 'FAILURE')
    {
        messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");

    } else if (msgStatus == "WARNING" || msgStatus == "SUCCESS")
    {
        messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
    }

    var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
    setDataXML(getXMLString(pureXMLDOM));
    showData(dbStrRootTableName, 1);

    var stage = "";
    if ((msgStatus == 'WARNING') & (stage == 'COMPLETE'))
    {
        fnSetExitButton(false);
        disableForm();
        document.getElementById("BTN_EXIT").disabled = true;
    }

    if ( msgStatus == 'SUCCESS' )//Fix for 17001239 
    {

        if (isDetailed)
        { // If the the Screen is Detailed then disble it after response received.
            disableForm(); // If Summary disable not required.. By C Malaiah
            gAction = "";
            //document.getElementById("BTN_EXIT_IMG").src = cache1.src;
			
			// fnSetExitButton(false);
           // dlgArg.mainWin.frames["FrameToolbar"].showToolbar(functionId, '', '');
		   
		    //fix for 16361568 starts
			//eval('fnPost' + gAction + '()');
			//fix for 16361568 ends

            var returnVal = displayResponse(messageNode, msgStatus);
        } else
        {

            fnSetExitButton(true);
            var returnVal = displayResponse(messageNode, msgStatus);
            if (msgStatus == 'FAILURE')
            {
                fnSetExitButton(true);
            }
            return;
        }

    } else
    { //if msgStatus == 'FAILURE'
        var returnVal = displayResponse(messageNode, msgStatus);
        fnSetExitButton(true);
    }

}

function fnClearMultipleEntryBlocks() {
    for (var iLoop = 0; iLoop < multipleEntryIDs.length; iLoop++) {	  
//REDWOOD_CHANGES
        //deleteAllRows(multipleEntryIDs[iLoop]);
         try {
            if (meArrayForAddDelete[multipleEntryIDs[iLoop]]) {
                meArrayForAddDelete[multipleEntryIDs[iLoop]]([]);
                if (document.getElementById(multipleEntryIDs[iLoop])) {
                    document.getElementById(multipleEntryIDs[iLoop]).refresh();
                }
            }
        }
        catch (e) {
        }		
//REDWOOD_CHANGES
    }
}

function fnBuildMultipleEntryArray()
{
    if (typeof(functionId) != 'undefined' && functionId.substring(2, 3) == "S")
    {
        multipleEntryIDs.length = 1;
        var sumfldTag = msgxml_sum.substring(msgxml_sum.indexOf("<FN"), msgxml_sum.indexOf("</FN>"));
        var sumType = sumfldTag.substring(sumfldTag.indexOf("TYPE") + 6, sumfldTag.indexOf(">") - 1);
        var sumBlockId = "BLK_" + sumType;
    }
     for (var l = 0; l < tab_arr.length; l++) { //Static header change
        document.getElementById(tab_ids[l]).style.display = "block";
     }
    var k = 0;
    for (var i = 0; i < multipleEntryIDs.length; i++)
    {
        if (typeof(functionId) != 'undefined' && functionId.substring(2, 3) == "S")
        {
            var objMultipleEntryTable = document.getElementById(sumBlockId);            
            
        } else
        {
            var objMultipleEntryTable = document.getElementById(multipleEntryIDs[i]);
        }
        if (objMultipleEntryTable)
        {
           var objMultipleEntryTableHeader = document.getElementById(objMultipleEntryTable.id+"Header");//Static Header change
            var objLabelRow = objMultipleEntryTableHeader.tBodies[0].rows[0];
            var objFirstRow = objMultipleEntryTable.tBodies[0].rows[0];
            var rowArr = new Array();
            var arrCells = new Array();
            objMultipleEntryTableHeader.parentNode.style.width = objMultipleEntryTable.parentNode.clientWidth + "px";//Static Header change
            for (var j = 0; j < objLabelRow.cells.length; j++)
            {
            if(j!=0){
                var w = Math.max(objLabelRow.cells[j].children[0].offsetWidth,objFirstRow.cells[j].children[0].offsetWidth);
                objLabelRow.cells[j].children[0].style.width =  w +"px";
                //objFirstRow.cells[j].children[0].style.width =  w + parseInt(window.getComputedStyle(objLabelRow.cells[j].children[0], null).getPropertyValue('padding-right'))+ "px";
               
                  objFirstRow.cells[j].children[0].style.width =  w + 12 + "px";
            }
                rowArr[j] = objFirstRow.cells[j].innerHTML;
                arrCells[j] = objFirstRow.cells[j];
                /*if(j!= 0){
                    for (var tag=0;tag<tagName.length;tag++) {
                        try{
                            if(arrCells[j].getElementsByTagName(tagName[tag])[0].getAttribute("LABEL_VALUE")){
                                var w =0.71*(arrCells[j].getElementsByTagName(tagName[tag])[0].getAttribute("LABEL_VALUE").length)+'em';
                            objLabelRow.cells[j].children[0].style.width = w;
                        }
                    }catch(e){}
                    }
                }*/
            
            }
            multipleEntryArray[objMultipleEntryTable.id] = rowArr;
            multipleEntryCells[objMultipleEntryTable.id] = arrCells;
            objMultipleEntryTable.tBodies[0].deleteRow(0);
            objMultipleEntryTable.style.width = objMultipleEntryTableHeader.offsetWidth + "px";//static header change
            objMultipleEntryTableHeader.parentNode.style.width = objMultipleEntryTable.parentNode.clientWidth + "px";//Static Header change
            
            
        }
    }
    
     for (var l = 0; l < tab_arr.length; l++) { //Static header change
     if(tab_ids[l]=="TBLPage"+strCurrentTabID)continue;
        document.getElementById(tab_ids[l]).style.display = "none";
     }
}

function fnShowSummaryResult(pobjSummaryResultDOM, pintRecordNumber, pintNumberOfRecords)
{
    fcjResponseDOM = pobjSummaryResultDOM;
    intCurrentQueryRecordCount = pintNumberOfRecords;
    goToRec(pintRecordNumber);
    disableAfterQuery();
    gAction = "";
    //setNavButtons();
    fnSetExitButton(false);
    fnDisableElement(document.getElementsByName("AUTH_STAT")[0]);
    fnDisableElement(document.getElementsByName("RECORD_STAT")[0]);
}

function fnDeleteChildTables()
{

    var rootNode = selectSingleNode(dbDataDOM, dbStrRootTableName);
    // Remove All the table nodes except the Root Table.
    for (var tableIndex = 1; tableIndex < dataSrcLocationArray.length; tableIndex++)
    {
        var nodeList = selectNodes(dbDataDOM, getXPathQuery(dataSrcLocationArray[tableIndex]));
        for (var nodeIndex = 0; nodeIndex < nodeList.length; nodeIndex++)
        {
            rootNode.removeChild(nodeList[nodeIndex]);
        }
    }
}

function setChildKeyValues(tablename, masterColName, childColName)
{
    var parentNodeList;
    var objNodeList;
    var value;

    try
    {
        var childTable = findDescandants(tablename);
        childTable = childTable.substring(0, childTable.length - 1);
        var childArray = childTable.split("~");

        if (childArray && childArray.length > 0)
        {
            parentNodeList = dbDataDOM.getElementsByTagName(tablename);
            for (var iCnt = 0; iCnt < parentNodeList.length; iCnt++)
            {
                value = getNodeText(selectSingleNode(parentNodeList[iCnt], masterColName));
                for (var index = 0; index < childArray.length; index++)
                {
                    objNodeList = parentNodeList[iCnt].getElementsByTagName(childArray[index]);
                    for (var iCnt1 = 0; iCnt1 < objNodeList.length; iCnt1++)
                    {
                        if (selectSingleNode(objNodeList[iCnt1],childColName))
                        {
                            setNodeText(selectSingleNode(objNodeList[iCnt1], childColName), value);
                        }
                    }
                }
            }
        }
    } catch(e)
    {
        debugs("Error in setChildKeyValues", e.message);
        //debug(dlgArg.mainWin, "Error in setChildKeyValues " + e.message, "A");	
    }
}

function fnGetSelectedRecordsDOM()
{

    var resultTabTableRef = null;
    var selectedRowIndex = new Array();
    var fcjMsgXml = new String();
    var nRows = 0;
    var checkBoxRef = null;
    var arrayIndex = 0;
    var nodeList = null;
    var fcjSelectedRowsDOM = null;

    resultTabTableRef = document.getElementById("BLK_" + dataSrcLocationArray[0]);
    nRows = resultTabTableRef.tBodies[0].rows.length;

    for (var iRowIndex = 0; iRowIndex < nRows; iRowIndex++)
    {
        checkBoxRef = resultTabTableRef.tBodies[0].rows[iRowIndex].cells[0].getElementsByTagName("INPUT")[0];
        if (checkBoxRef != null)
        {
            if (checkBoxRef.checked) selectedRowIndex[arrayIndex++] = iRowIndex;
        }
    }

    fcjMsgXml = '<FCUBS_RES_ENV>' + getXMLString(selectSingleNode(fcjResponseDOM, "//FCUBS_HEADER")) + '<FCUBS_BODY> ' + getXMLString(selectSingleNode(fcjResponseDOM, "//FLD"));

    nodeList = selectNodes(fcjResponseDOM, "//REC"); // Select all REC Nodes.

    for (var iArrayIndex = 0; iArrayIndex < selectedRowIndex.length; iArrayIndex++)
    {
        fcjMsgXml += getXMLString(nodeList[selectedRowIndex[iArrayIndex]]);
    }

    fcjMsgXml += '</FCUBS_BODY></FCUBS_RES_ENV>';
    fcjSelectedRowsDOM = loadXMLDoc(fcjMsgXml);

    // Set the Number of Records to display on the Tool Bar.
    dlgArg.NumberOfRecords = selectedRowIndex.length;

    return fcjSelectedRowsDOM;

}
/*
function selectNodes(tableName)
{
    var nodeList = selectNodes(dbDataDOM, getXPathQuery(tableName));
    return nodeList;
}

function selectSingleNode(tableName)
{
    var singleNode = selectSingleNode(dbDataDOM, getXPathQuery(tableName));
    return singleNode;
}
*/
function fnSetBlockIndex(tableName)
{
    dbIndexArray[tableName] = getRowIndex();
    var currentRow = getCurrentRow();
    if (currentRow)
    {
        fnMulipleEntryRow_onClick();
    }
}

function fnAppendHeaderData()
{
    try
    {
        appendData(document.getElementById("TBLPage" + l_HeaderTabId));
    } catch(e)
    {}
}

function buildIsQuery()
{
    var operation = gAction;
    if (! (operation.indexOf("AUTH") != -1))
    {
        dbFCJDOM = loadXMLDoc(msgxml);
        isQuery = new Array();
        if (selectNodes(dbFCJDOM, "//FN[@ISQUERY=1]"))
        {
            var queryDataSources = selectNodes(dbFCJDOM, "//FN[@ISQUERY=1]");
            for (var i = 0; i < queryDataSources.length; i++)
            {
                isQuery[queryDataSources[i].getAttribute("TYPE")] = 1;
            }
        }
    } else isQuery = new Array();
}

function showTabData_Viewchg(locationArray, paramDBDataDOM)
{

    if (arguments.callee.caller.toString())
    {
        if (arguments.callee.caller.toString().indexOf("fnInTab_") != -1) return;
    }

    buildIsQuery();
    buildIsControl();
    if (!locationArray)
    {
        locationArray = dataSrcLocationArray;
        paramDBDataDOM = dbDataDOM;
    }

    for (var arrayIndex = 0; arrayIndex < locationArray.length; arrayIndex++)
    {
        var tableName = locationArray[arrayIndex];
        var htmlTableName = "BLK_" + tableName;
        var htmlTable = document.getElementById(htmlTableName);
        var query = "";

        if (htmlTable)
        {
            query = getXPathQuery(tableName);
            if (htmlTable.getAttribute("VIEW"))
            { // If ME Block then Delete all rows... Added By Malaiah, On June 22,2005.
                ;
            } else
            {
                if (isQuery[locationArray[arrayIndex]] == "1")
                {
                    continue;
                }
                // 16/09/08 Added for isContro Datasource.
                if (isControl[locationArray[arrayIndex]] == "1")
                {
                    continue;
                }
                //deleteAllRows(htmlTableName);	  //REDWOOD_CHANGES
            }
        } else
        {
            query = getQueryWithId(tableName);
        }
        var nodeList = selectNodes(paramDBDataDOM, query);

        // If data is being displayed in ME block which is SE View 
        // Added By Malaiah , On June 22 , 2005
        if (htmlTable)
        {
            if (htmlTable.getAttribute("VIEW"))
            {
                if (nodeList.length > 0)
                {
                    //	Reset The current dbIndexArray to 1 as the first record will be displayed.
                    dbIndexArray[tableName] = 1;
                    setDataInSE(tableName + "__", nodeList[0]);
                    continue;
                }
            }
        }

        if (nodeList)
        { // If data exist for this node.		  
//REDWOOD_CHANGES
       // var currNode = nodeList[nodeIndex];
               // var currNodeName = currNode.nodeName;
                //var htmlTableName = "BLK_" + currNode.nodeName;
                 //htmlTableName = "BLK_" + htmlTableName;
                var htmlTableObj = document.getElementById(htmlTableName);
                if (htmlTableObj)
                {
                    if (nodeIndex == 0)
                    {
                        // First time clear the existing rows in the table.
                        //deleteAllRows(htmlTableName);
                    }
       //// if (htmlTableObj) {
            meArrayForAddDelete[htmlTableName]([]);
                if(nodeList.length>0){
                //setTimeout(function () {
                    addRowsFromDOM(htmlTableObj, htmlTableName, nodeList);
                   // },
                  //  0);
//setTimeout(function () {
                        updateAmountOrNumberConverter(htmlTableName);
               // },
               // 0);
       
                }else{
                    document.getElementById(htmlTableName).refresh();
                }
           // var rowIndex = 0;
           /* for (var nodeIndex = 0; nodeIndex < nodeList.length; nodeIndex++)	  

            {
                var currNode = nodeList[nodeIndex];
                var currNodeName = currNode.nodeName;
                var htmlTableName = "BLK_" + currNode.nodeName;
                var htmlTableObj = document.getElementById(htmlTableName);
                if (htmlTableObj)
                {
                    if (nodeIndex == 0)
                    {
                        // First time clear the existing rows in the table.
                        deleteAllRows(htmlTableName);
                    }
                    var newRow = addNewRow(htmlTableName);
                    setRowDataViewchg(htmlTableObj.tBodies[0].rows[rowIndex], currNode);
                    rowIndex++;*/  
//REDWOOD_CHANGES
                } else
                { 
//REDWOOD_CHANGES
                 for (var nodeIndex = 0; nodeIndex < nodeList.length; nodeIndex++)
                { 
                var currNode = nodeList[nodeIndex];
                var currNodeName = currNode.nodeName; 
//REDWOOD_CHANGES
                    for (var childIndex = 0; childIndex < currNode.childNodes.length; childIndex++)
                    {
                        var childNode = currNode.childNodes[childIndex];
                        var childNodeName = childNode.nodeName;
                        if (!isNodeATable(childNode))
                        {
                            var object = document.getElementById(currNodeName + "__" + childNodeName);
                            var data = "";
                            if (childNode.childNodes.length == 1)
                            {
                                data = childNode.childNodes[0].nodeValue;

                            }
                            setFieldDataViewchg(object, data);
                        }
                    }
                    break;
                }

            }
        }
    }

    return;
}

function setFieldDataViewchg(object, data)
{
    if (typeof(object) != undefined && typeof(isQuery) != undefined)
    {
        for (index = 0; index < isQuery.length; index++)
        {
            if (isQuery[object.getAttribute("DBT")] == '1')
            {
                if (data == "")
                {
                    return;
                }
            }
        }
    }

    if (typeof(object) != undefined && typeof(isControl) != undefined)
    {
        for (index = 0; index < isControl.length; index++)
        {
            if (isControl[object.getAttribute("DBT")] == '1')
            {
                if (data == "")
                {
                    return;
                }
            }
        }
    }

    if (data && data != undefined)
    {
        if (object)
        {
            setDataViewchg(object, data);
        }
    } else
    {
        if (object)
        {
            setDataViewchg(object, "");
        }
    }
}

function setDataViewchg(currObject, value)
{

    var tagName = currObject.tagName;
	//9NT1606_12_5_RETRO_12_3_28176165 Change start
   /*var s1 = value.indexOf("(");
    var s2 = value.indexOf(")");*/
    var s1 = value.lastIndexOf("_OB_"); //FCUBS_14.1_UNICREDIT S.P.A._BUG_29596225_RETRO_19394034 modified
    var s2 = value.lastIndexOf("_CB_"); //FCUBS_14.1_UNICREDIT S.P.A._BUG_29596225_RETRO_19394034 modified
	//9NT1606_12_5_RETRO_12_3_28176165 Change end
    if (s1 >= 0)
    {
        var curval = value.substring(0, s1);
        var preval = value.substring(s1 + 4, s2); //FCUBS_14.1_UNICREDIT S.P.A._BUG_29596225_RETRO_19394034 modified

        if (currObject)
        {
            if (currObject.id)
            {
                var id = currObject.id ;//+ "I"; //REDWOOD_CHANGES
                if (document.getElementById(id))
                {
                    //document.getElementById(id).style.color = modified; //REDWOOD_CHANGES
                    document.getElementById(id).classList.add(modified)	 //REDWOOD_CHANGES
                    document.getElementById(id).title = preval;
                }
            }            
            value = curval;           
            //View changes for Select, Check and Radio in Authscreen--Starts     
//REDWOOD_CHANGES
           /* if(tagName != "SELECT" && currObject.type.toUpperCase() != "CHECKBOX" && currObject.type.toUpperCase() != "RADIO" ){
                //currObject.style.color = modified;  
                currObject.classList.add(modified);
                currObject.title = preval;
            }          */  
            if (tagName.toUpperCase() == "OJ-SWITCH") {          
                currObject.disabled = false;
                //currObject.parentNode.style.color = modified;  
                currObject.parentElement.classList.add(modified);
                currObject.disabled = true;
            }  
           if (tagName.toUpperCase() == 'OJ-RADIO-SET') {  
                currObject.disabled = false;				   
                //currObject.parentNode.style.color = modified; 
                currObject.parentElement.classList.add(modified);
                var l = document.getElementsByName(currObject.name).length;
                for( var i=0;i<l;i++){
                    if(document.getElementsByName(currObject.name)[i].value == preval){
                            currObject.title = getInnerText(document.getElementsByName(currObject.name)[i].parentNode)
                           // document.getElementsByName(currObject.name)[i].parentNode.style.color = deleted;  
                             document.getElementsByName(currObject.name)[i].parentElement.classList.add(deleted);
                    }	
                }
                currObject.disabled = true;
            }            
           /* if(tagName == "SELECT"){
                currObject.disabled = false;
                var l = currObject.options.length;
                for (var i=0;i<l;i++){
                    if(currObject.options[i].value == preval){
                        currObject.title= currObject.options[i].innerHTML;        
				//currObject.options[i].style.color = deleted; 
                                 currObject.options[i].classList.add(deleted);
                    }
                    if(currObject.options[i].value == value){
                        //currObject.options[i].style.color = modified;  
                         currObject.options[i].classList.add(modified);
                        
                    }                    
                }  
                currObject.className="";
                currObject.classList.add(modified);
                currObject.setAttribute("onchange",function(){   
                    for (var index = 0; index < currObject.options.length; index++){
                        if (currObject.options[index].value == value){
                            currObject.selectedIndex = index;
                        }
                    }    
                });
            }    */      
//REDWOOD_CHANGES  
            //View changes for Select, Check and Radio in Authscreen--Ends
        }
        
    }

    switch (tagName.toUpperCase())
    {		  
//REDWOOD_CHANGES
    //case 'INPUT':
    case "OJ-INPUT-TEXT": //OJET Migration Sudipta need to check
    case "OJ-INPUT-PASSWORD":
    case "OJ-RADIOSET":
    case "OJ-TEXT-AREA":	
//REDWOOD_CHANGES
        {
            var DBC = NVL(currObject.getAttribute("DBC"));
            if (DBC)
            {	 
//REDWOOD_CHANGES
               // var type = currObject.type;
               // switch (type.toUpperCase())
               // {
               // case 'TEXT':
                ///    {	  
//REDWOOD_CHANGES
                        if (currObject.getAttribute("DBC") == 'CONTSTAT')
                        {
                            var l_ContractAuditDesc = fnGetContractAuditDesc(value);
                            if (l_ContractAuditDesc) currObject.value = l_ContractAuditDesc;
                            else currObject.value = value;
                        } else if (currObject.getAttribute("DBC") == 'PROCESSTAT')
                        {
                            var l_ProcessAuditDesc = fnGetProcessAuditDesc(value);
                            if (l_ProcessAuditDesc) currObject.value = l_ProcessAuditDesc;
                            else currObject.value = value;
                        } else currObject.value = value;

                        if (document.getElementsByName("IMG_" + DBC)[0] != null)
                        {
                            if (value.indexOf("\\") == -1 && value.lastIndexOf("_") > 0)
                            { //the image at the web server.                        
                                document.getElementsByName("IMG_" + DBC)[0].src = "Sign_Images/" + value;
                                currObject.value = value.substring(value.lastIndexOf("_") + 1, value.length);
                            } else if (value.indexOf("\\") > 0) //the image at the local m/c
                            document.getElementsByName("IMG_" + DBC)[0].src = value;

                            document.getElementsByName("IMG_" + DBC)[0].style.width = "75px";
                            document.getElementsByName("IMG_" + DBC)[0].style.height = "75px";
                            //currObject.value = value.substring(value.lastIndexOf("_"),value.length);
                        } else if (document.getElementsByName("FILE_" + DBC)[0] != null)
                        {
                            document.getElementsByName("FILE_" + DBC)[0].href = "Sign_Images/" + value;
                            setInnerText(document.getElementsByName("FILE_" + DBC)[0], value);
                        }	 
//REDWOOD_CHANGES
                       // break;
                   /// }
               // case 'FILE':

               // case 'HIDDEN':
                 //   {
                  ///      currObject.value = value;
                  //      fireHTMLEvent(currObject, "onpropertychange");
                  //      break;
                 //   }
//                case 'PASSWORD':
//                    {
//                        currObject.value = value;
//                        break;
//                    }
//                case 'CHECKBOX':
//                    {
//                        if (currObject.getAttribute("ON"))
//                        {
//                            if (value == currObject.getAttribute("ON"))
//                            {
//                                currObject.checked = true;
//                            }
//                        } else
//                        {
//                            if (value == CHECK_B0X_SELECTED_VALUE)
//                            {
//                                currObject.checked = true;
//                            }
//                        }
//
//                        if (currObject.getAttribute("OFF"))
//                        {
//                            if (value == currObject.getAttribute("OFF"))
//                            {
//                                currObject.checked = false;
//                            }
//                        } else if (value == CHECK_B0X_UNSELECTED_VALUE)
//                        {
//                            currObject.checked = false;
//                        }
//
//                        showAuditData(currObject, value);
//                        break;
//                    }
//
//                case 'RADIO':
//                    {
//                        setRadioButtonData(currObject, value);
//                        break;
//                    }
//                }	   
//REDWOOD_CHANGES
                        break;
           }	 
//REDWOOD_CHANGES
        }
    case 'OJ-SELECT-SINGLE':
        {
            var DBC = NVL(currObject.getAttribute("DBC"));
            if (DBC)
            {
                setSelectedIndex(currObject, value);
            }		 

                        break;
        }case "OJ-SELECT-SINGLE": {
            var DBC = NVL(currObject.getAttribute("DBC"));
            if (DBC) {
                if (value != "") {
                        currObject.value = value;
                }
            }
                        break;
                    }
        case 'INPUT': {
            if (currObject.type.toUpperCase() == 'HIDDEN') {
                if (value == "") {
                    if (currObject.getAttribute("DEFAULT")) {
                        currObject.value = currObject.getAttribute("DEFAULT");
                    }
                } else {
                    currObject.value = value;
                }
            }
                        break;
                    }
        case 'SELECT': {
            var DBC = NVL(currObject.getAttribute("DBC"));
            if (DBC) {
                setSelectedIndex(currObject, value);
            }
                        break;
                    }
          case "OJ-INPUT-DATE-TIME":
          case "OJ-INPUT-DATE":{
            var DBC = NVL(currObject.getAttribute("DBC"));
   
               if (DBC) {
               
                    currObject.value =value;
                }
            
            break;
        }
        case "OJ-INPUT-NUMBER": {
            var DBC = NVL(currObject.getAttribute("DBC"));
            if (DBC) {
                if(value == ""){
                   // currObject.value = null;
                }else{
                    currObject.value =Number(value);
                }
            }
            break;
        }
        case 'OJ-SWITCH': {
            if (value == "") {
                if (currObject.getAttribute("DEFAULT"))
                    currObject.value = true;
                else 
                    currObject.value = false;
                break;
            }
            if (currObject.getAttribute("ON")) {
                if (value == currObject.getAttribute("ON")) {
                    currObject.value = true;
                }
            }
            else {
                if (value == CHECK_B0X_SELECTED_VALUE) {
                    currObject.value = true;
                }
            }
            if (currObject.getAttribute("OFF")) {
                if (value == currObject.getAttribute("OFF")) {
                    currObject.value = false;
                }
            }
            else if (value == CHECK_B0X_UNSELECTED_VALUE) {
                currObject.checked = false;
            }
            break;
        }
        case 'TEXTAREA': {
            var DBC = NVL(currObject.getAttribute("DBC"));
            if (DBC) {
                currObject.value = value;
            }
            break;
        }
   //REDWOOD_CHANGES

    }
}

function setDataInSEViewchg(idPrefix, dataNode)
{

    var childNode = null;
    if (dataNode)
    {
        for (var nodeIndex = 0; nodeIndex < dataNode.childNodes.length; nodeIndex++)
        {
            childNode = dataNode.childNodes[nodeIndex];
            if (isNodeATable(childNode))
            {
                displayData(childNode.nodeName, childNode);
            } else
            {
                if (document.getElementById(idPrefix + childNode.nodeName) != null)
                {
                    if (document.getElementById(idPrefix + childNode.nodeName).type.toUpperCase() != 'RADIO')
                    {
                        document.getElementById(idPrefix + childNode.nodeName).value = "";
                    }
                    setFieldDataViewchg(document.getElementById(idPrefix + childNode.nodeName), getNodeText(childNode));
                }
            }
        }
    }
    return;
}

function setDataInMETableViewchg(tableId, parentTableName, parentIndex)
{

    var tableName = tableId.substring(4, tableId.length);
    // Delete All the rows in the given table.[To Refresh the View]
    deleteAllRows(tableId);

    if (gAction == "AUTHQUERY")
    {
        var node = getNode_auth(parentTableName, parentIndex);
    } else
    {
        var node = getNode(parentTableName, parentIndex);
    }

    if (node)
    {
        var rowIndex = 0;
        for (var nodeIndex = 0; nodeIndex < node.childNodes.length; nodeIndex++)
        {
            var currNode = node.childNodes[nodeIndex];
            if (isNodeATable(currNode) && currNode.nodeName == tableName)
            {
                tableObject = document.getElementById(tableId);
                // Added By Murali as part of retro from 9NT496
                if (tableObject)
                { // FC 7.1.0.0.BARCGB.4 .0 ITR1 SFR -- 294 
                    // The if loop added for creating/displaying row only if this 
                    // table has got it's elements.
                    if (currNode.childNodes.length > 0)
                    {
                        addNewRow(tableId);
                        setRowDataViewchg(tableObject.tBodies[0].rows[rowIndex], currNode);
                        rowIndex++;
                    }
                }
            } else
            {
                // setDatainSe
                //displayData(currNode.nodeName, currNode);
            }
        }
    }

}

//Added for viewing changes
function setRowDataViewchg(rowObject, currNode)
{
    var cells = rowObject.cells;
    //for(cellObject in cells) {
    for (var cellIndex = 0; cellIndex < cells.length; cellIndex++)
    {
        setCellDataViewchg(cells[cellIndex], currNode);
    }
}

function setCellDataViewchg(cellObject, currNode) {
    var Action = currNode.getAttribute("ACTION");
    if (Action) {
        if (Action == 'N') var color = Added;
        if (Action == 'D') var color = deleted;
        if (Action == 'M') var color = modified;
    }
    
    var inputElems = cellObject.getElementsByTagName("INPUT");
    for(var inputEleIdx = 0; inputEleIdx < inputElems.length; ++inputEleIdx) {
        var currObject = inputElems[inputEleIdx];
        var DBC = NVL(currObject.getAttribute("DBC"));
        if (DBC) {
            var type = currObject.type;
            var nodeValue = NVL(selectSingleNode(currNode, DBC));
            if (selectSingleNode(currNode, DBC) == null) {
                if (selectSingleNode(currNode, "./*[@Type='SINGLE']")) {
                    if (selectSingleNode(currNode, "./*[@Type='SINGLE']/" + DBC))
                        nodeValue = selectSingleNode(currNode, "./*[@Type='SINGLE']/" + DBC);
                }
            }
            if (!nodeValue) {
                continue;
            }
            var fieldValue = "";
            if (nodeValue.childNodes[0]) {
                fieldValue = nodeValue.childNodes[0].nodeValue;
            }
			var fldValue = fieldValue; //25401641  Changes
            switch (type.toUpperCase()) {
                case 'TEXT':
                case 'HIDDEN':
                    if (Action == 'M') {
						//9NT1606_12_5_RETRO_12_3_28176165 Changes Start
                        /*var s1 = fieldValue.indexOf("(");
                        var s2 = fieldValue.indexOf(")");*/
			var s1 = fieldValue.lastIndexOf("_OB_"); //FCUBS_14.1_UNICREDIT S.P.A._BUG_29596225_RETRO_19394034 modified
                        var s2 = fieldValue.lastIndexOf("_CB_"); //FCUBS_14.1_UNICREDIT S.P.A._BUG_29596225_RETRO_19394034 modified
						 //9NT1606_12_5_RETRO_12_3_28176165 Changes End
                        if (s1 >= 0) {
                            var curval = fieldValue.substring(0, s1);
                            var preval = fieldValue.substring(s1 + 4, s2);//FCUBS_14.1_UNICREDIT S.P.A._BUG_29596225_RETRO_19394034 modified
							//Bug 16552546 Changes Starts
							if (inputElems[inputEleIdx+1].id){       
								
								if (document.getElementById(inputElems[inputEleIdx+1].id)){					
									document.getElementById(inputElems[inputEleIdx+1].id).style.color = modified;
									document.getElementById(inputElems[inputEleIdx+1].id).title = preval;
								}
							}
							//Bug 16552546 Changes Ends
                            if (currObject) {
                                currObject.style.color = color;
                                currObject.title = preval;
                                fieldValue = curval;
                                if (typeof(currObject.parentNode.childNodes[1]) != "undefined" && currObject.parentNode.childNodes[1].tagName == "INPUT") {
                                    currObject.parentNode.childNodes[1].style.color = color;
                                    currObject.parentNode.childNodes[1].title = preval;
                                }
                            }
                        }
                    } else {
                        if (currObject.style) {
                            if (color) {
                                currObject.style.color = color;
                                if (typeof(currObject.parentNode.childNodes[1]) != "undefined" && currObject.parentNode.childNodes[1].tagName == "INPUT") {
                                    currObject.parentNode.childNodes[1].style.color = color;
                                }
                            }
                        }
                    }
                    currObject.value = fieldValue;
                    if(type.toUpperCase() == 'HIDDEN') {
                        fireHTMLEvent(currObject, "onpropertychange");
                    }
					/*25401641 Starts*/
					if(action == 'M' && fldValue.indexOf("(") >= 0){
						if (currObject.id) {
							var id = currObject.id + "I";
							if (document.getElementById(id)) {
								document.getElementById(id).style.color = color;
							}
						}
					}
					/*25401641  Ends*/
                    break;
                case 'CHECKBOX':
                    if (currObject.getAttribute("ON")) {
                        if (fieldValue == currObject.getAttribute("ON")) {
                            currObject.checked = true;
                        }
                    } else {
                        if (fieldValue == CHECK_B0X_SELECTED_VALUE) {
                            currObject.checked = true;
                        }
                    }
                
                    if (currObject.getAttribute("OFF")) {
                        if (fieldValue == currObject.getAttribute("OFF")) {
                            currObject.checked = false;
                        }
                    } else if (fieldValue == CHECK_B0X_UNSELECTED_VALUE) {
                        currObject.checked = false;
                    }
                    break;
                case 'RADIO':
                    if (fieldValue == RADIO_BUTTON_SELECTED_VALUE) {
                        currObject.checked = true;
                    } else {
                        currObject.checked = false;
                    }
            }
        }
    }
    
    var selectElems = cellObject.getElementsByTagName("SELECT");
    for(var selectEleIdx = 0; selectEleIdx < selectElems.length; ++selectEleIdx) {
        var currObject = selectElems[selectEleIdx];
        var DBC = NVL(currObject.getAttribute("DBC"));
        if (DBC) {
            var nodeValue = NVL(selectSingleNode(currNode, DBC));
            var fieldValue = getNodeText(nodeValue);
			//9NT1606_12_5_RETRO_12_3_28176165 Change Start
            /*var s1 = fieldValue.indexOf("(");
            var s2 = fieldValue.indexOf(")");*/    
	    var s1 = fieldValue.lastIndexOf("_OB_"); //FCUBS_14.1_UNICREDIT S.P.A._BUG_29596225_RETRO_19394034 modified
            var s2 = fieldValue.lastIndexOf("_CB_"); //FCUBS_14.1_UNICREDIT S.P.A._BUG_29596225_RETRO_19394034 modified
			//9NT1606_12_5_RETRO_12_3_28176165 Change End
            if (s1 >= 0){
                var curval = fieldValue.substring(0, s1);
                var preval = fieldValue.substring(s1 + 4, s2) //FCUBS_14.1_UNICREDIT S.P.A._BUG_29596225_RETRO_19394034 modified
                currObject.disabled = false;
                var l = currObject.options.length;
                for (var i=0;i<l;i++){
                    if(currObject.options[i].value == preval){
                        currObject.title= currObject.options[i].innerHTML;        
                        currObject.options[i].style.color = deleted;                  
                    }
                    if(currObject.options[i].value == curval){
                        currObject.options[i].style.color = modified;               
                    }
                }
                currObject.setAttribute("onchange",function(){   
                    for (var index = 0; index < currObject.parentNode.options.length; index++) {
                        if (currObject.parentNode.options[index].value == curval){
                            currObject.parentNode.selectedIndex = index;
                        }
                    }    
                });
                setSelectedIndex(currObject, curval);
            }
        }
    }
    
    var textareaElem = cellObject.getElementsByTagName("TEXTAREA");
    setTableTextAreaData(textareaElem,currNode);
/*
    var elementList = cellObject.all;

    for (var elementIndex = 0; elementIndex < elementList.length; elementIndex++)
    {
        var currObject = elementList[elementIndex];
        var tagName = currObject.tagName;
        var Action = currNode.getAttribute("ACTION");
        if (Action)
        {
            if (Action == 'N') var color = Added;
            if (Action == 'D') var color = deleted;
            if (Action == 'M') var color = modified;
        }

        switch (tagName.toUpperCase())
        {
        case 'INPUT':
            {
                var DBC = NVL(currObject.getAttribute("DBC"));
                if (DBC)
                {
                    var type = currObject.type;
                    var nodeValue = NVL(selectSingleNode(currNode, DBC));
                    //set values of childnodes if any.
                    //typically used for description(or display fields)
                    if (selectSingleNode(currNode, DBC) == null)
                    {
                        if (selectSingleNode(currNode, "./*[@Type='SINGLE']"))
                        {
                            if (selectSingleNode(currNode, "./*[@Type='SINGLE']/" + DBC)) nodeValue = selectSingleNode(currNode, "./*[@Type='SINGLE']/" + DBC);

                        }
                    }
                    if (!nodeValue)
                    {
                        continue;
                    }
                    var fieldValue = "";
                    if (nodeValue.childNodes[0])
                    {
                        fieldValue = nodeValue.childNodes[0].nodeValue;
                    }
                    switch (type.toUpperCase())
                    {
                    case 'TEXT':
                    case 'HIDDEN':
                    {
                        if (Action == 'M') {
                            var s1 = fieldValue.indexOf("(");
                            var s2 = fieldValue.indexOf(")");
                            if (s1 >= 0) {
                                var curval = fieldValue.substring(0, s1);
                                var preval = fieldValue.substring(s1 + 1, s2)
                                if (currObject) {
                                    currObject.style.color = color;
                                    currObject.title = preval;
                                    fieldValue = curval;
                                    if (typeof(currObject.parentNode.childNodes[1]) != "undefined" && currObject.parentNode.childNodes[1].tagName == "INPUT") {
                                        currObject.parentNode.childNodes[1].style.color = color;
                                        currObject.parentNode.childNodes[1].title = preval;
                                    }
                                }
                            }
                        } else {
                            if (currObject.style) {
                                if (color) {
                                    currObject.style.color = color;
                                    if (typeof(currObject.parentNode.childNodes[1]) != "undefined" && currObject.parentNode.childNodes[1].tagName == "INPUT") {
                                        currObject.parentNode.childNodes[1].style.color = color;
                                    }
                                }
                            }
                        }
                        currObject.value = fieldValue;
                        break;
                    }

                    /*case 'HIDDEN':
                        {
                            currObject.value = fieldValue;
                            break;
                        }
                    */
                    /*
                    case 'CHECKBOX':
                        {

                            if (currObject.getAttribute("ON"))
                            {
                                if (fieldValue == currObject.getAttribute("ON"))
                                {
                                    currObject.checked = true;
                                }
                            } else
                            {
                                if (fieldValue == CHECK_B0X_SELECTED_VALUE)
                                {
                                    currObject.checked = true;
                                }
                            }

                            if (currObject.getAttribute("OFF"))
                            {
                                if (fieldValue == currObject.getAttribute("OFF"))
                                {
                                    currObject.checked = false;
                                }
                            } else if (fieldValue == CHECK_B0X_UNSELECTED_VALUE)
                            {
                                currObject.checked = false;
                            }
                            break;
                        }

                    case 'RADIO':
                        {
                            if (fieldValue == RADIO_BUTTON_SELECTED_VALUE)
                            {
                                currObject.checked = true;
                            } else
                            {
                                currObject.checked = false;
                            }
                            break;
                        }
                    }
                    break;
                }
            }

        case 'SELECT':
            {
                var DBC = NVL(currObject.getAttribute("DBC"));
                if (DBC)
                {
                    var nodeValue = NVL(selectSingleNode(currNode, DBC));
                    //var fieldValue = nodeValue.childNodes.item(0).nodeValue;
                    //Code changed by sankarg 06/05/05
                    var fieldValue = getNodeText(nodeValue);
                    var s1 = fieldValue.indexOf("(");
                    var s2 = fieldValue.indexOf(")");    
                    if (s1 >= 0){
                        var curval = fieldValue.substring(0, s1);
                        var preval = fieldValue.substring(s1 + 1, s2)
                        currObject.disabled = false;
                        var l = currObject.options.length;
                        for (var i=0;i<l;i++){
                            if(currObject.options[i].value == preval){
                                currObject.title= currObject.options[i].innerHTML;        
                                currObject.options[i].style.color = deleted;                  
                            }
                            if(currObject.options[i].value == curval){
                                currObject.options[i].style.color = modified;               
                            }                    
                        }  
                        currObject.setAttribute("onchange",function(){   
                            for (var index = 0; index < currObject.parentNode.options.length; index++){
                                if (currObject.parentNode.options[index].value == curval){
                                    currObject.parentNode.selectedIndex = index;
                                }
                            }    
                        });
                    }
                    setSelectedIndex(currObject, curval);
                }
                break;
            }
        case 'TEXTAREA':
            {
                var DBC = NVL(currObject.getAttribute("DBC"));
                if (DBC)
                {
                    var nodeValue = NVL(selectSingleNode(currNode,DBC));
                    var fieldValue = getNodeText(nodeValue);
                    currObject.value = fieldValue;
                }
                break;
            }
        }

    }
*/
}

function buildIsControl()
{
    var operation = gAction;
    if (! (operation.indexOf("AUTH") != -1))
    {
        
        dbFCJDOM = loadXMLDoc(msgxml);
        isControl = new Array();
        if (selectNodes(dbFCJDOM,"//FN[@ISCONTROL=1]"))
        {
            var queryDataSources = selectNodes(dbFCJDOM,"//FN[@ISCONTROL=1]");
            for (var i = 0; i < queryDataSources.length; i++)
            {
                isControl[queryDataSources[i].getAttribute("TYPE")] = 1;
            }
        }
    } else isControl = new Array();
}

function fnPasteControlFieldValues()
{
    if (isControlFieldsArrValues.length > 0)
    {
        for (var i = 0; i < isControlFieldsArrValues.length; i++)
        {
            document.getElementById([isControlFieldsArrValues[i]]).value = isControlFieldsArrValues[isControlFieldsArrValues[i]];
        }
    }
}
//REDWOOD_CHANGES start
function appendOJInputData(FldSetObject, blockId, id, isME) {
    var tagNameList = ["OJ-INPUT-TEXT", "OJ-SWITCH", "OJ-RADIOSET", "OJ-INPUT-PASSWORD", "OJ-INPUT-NUMBER", "OJ-TEXT-AREA","OJ-SELECT-SINGLE","OJ-INPUT-DATE","OJ-INPUT-DATE-TIME"];
    for (var k = 0;k < tagNameList.length;k++) {
        var currObject = FldSetObject.getElementsByTagName(tagNameList[k]);
        if (currObject && currObject.length != 0)
            for (var i = 0;i < currObject.length;i++) {
                var type = currObject[i].getAttribute("type");
                var DBT = currObject[i].getAttribute("DBT");
                var DBC = currObject[i].getAttribute("DBC");
                if (isME) {
                    DBT = blockId; //Sudipta
                    if (DBC == null || typeof DBC == "undefined")
                        continue 
                }
                else if ((DBT == null || typeof DBT == "undefined") && (DBC == null || typeof DBC == "undefined"))
				{
                    continue;
				}
//REDWOOD_35903742 starts
				if (DBT && DBT != "" && isME == false) {  //redwood_35894402  add ISME condition
					id=dbIndexArray[DBT];
				}
//REDWOOD_35903742 ends
            /*    if (typeof type == "undefined")
                    break;*/

                switch (currObject[i].tagName.toUpperCase()) {
                    case "OJ-SWITCH": {
                        //appendCheckBoxValue(currObject[i], id, blockId);
                         if (DBT && DBT != "") {
                        appendCheckBoxValue(currObject[i], id, DBT);
                         }
                        break 
                    }
                   case "INPUT": {
                       if(currObject[i].type.toUpperCase()=='HIDDEN') {
                           //appendTextFieldValue(currObject[i], id, blockId);
                            if (DBT && DBT != "") {
                           appendTextFieldValue(currObject[i], id, DBT);
                            }
                       }
                         break;
                   }
                    default : {
                        if(currObject[i].id.toLowerCase().indexOf( 'oj-searchselect-filter') == -1)
                            //appendTextFieldValue(currObject[i], id, blockId);
                             if (DBT && DBT != "") {
                            appendTextFieldValue(currObject[i], id, DBT);
                             }
                        break; 
                    }
                }
            }

    }  
}
function addRowsFromDOM(htmlTableObj, parentNodeName, nodeList, isNew) {

    if( nodeList.length ==meArrayForAddDelete[parentNodeName]().length ){
      return;
    }
        
    var ojTableObj = document.getElementById(parentNodeName);
    if (ojTableObj) {
        var templateObj = ojTableObj.getElementsByTagName("template")[0];
        var tdObj = templateObj.content.querySelectorAll("td");
    }
    for(var i = 0;i<nodeList.length;i++){
        var singleRec = nodeList[i];
        
        var singleRecObj = Object.assign( {
        },
        multipleEntryFieldList[parentNodeName]);
        if (gAction != '' && gAction != 'EXECUTEQUERY'  ) {
            singleRecObj['readOnly'] = false;
        }else{
             singleRecObj['readOnly'] = true;
        }
        
    
        
        /*REDWOOD_35313042 switch the for loops
		for(var k=0; k<singleRec.childNodes.length;k++){
            var nodeName = singleRec.childNodes[k].nodeName;
            if(multipleEntryIDs.includes(nodeName)){
                continue;
            }
        */
	//REDWOOD_35313042
		for(var tdObjCnt = 0; tdObjCnt<tdObj.length ; tdObjCnt++) {
                var tdObjElem = tdObj[tdObjCnt].children[0].children[0];
				var fieldavail=true;//REDWOOD_35313042
                if(tdObjElem &&tdObjElem.tagName.toUpperCase() == "DIV") { //only for number
                    tdObjElem = tdObj[tdObjCnt].children[0].children[0].children[0];
                }
			//REDWOOD_35313042
				for(var k=0; k<singleRec.childNodes.length;k++){
				var nodeName = singleRec.childNodes[k].nodeName;
				if(multipleEntryIDs.includes(nodeName)){
				continue;
				}
			//REDWOOD_35313042
                if(tdObjElem.getAttribute("dbc") == nodeName) { //REDWOOD_35264640
					fieldavail=false;//REDWOOD_35313042
					if (gAction != '' && gAction != 'EXECUTEQUERY' && gAction != 'REVERSE' && gAction != 'REMOTEAUTH' && gAction != 'VIEW' && gAction != 'AUTH') {
                        if (tdObjElem.tagName.toUpperCase() == "OJ-INPUT-TEXT") {
                            var len = tdObjElem.getElementsByTagName("OJ-BUTTON").length;
                            for (var btnIndx = 0;btnIndx < len;btnIndx++) {
                                if (tdObjElem.getElementsByTagName("OJ-BUTTON")[btnIndx]) {
                                    tdObjElem.getElementsByTagName("OJ-BUTTON")[btnIndx].setAttribute("disabled", false);
                                }
                            }

                        }
					}
                
                    if(tdObjElem.tagName.toUpperCase() == "OJ-INPUT-NUMBER") {
                        if(getNodeText(singleRec.childNodes[k])!=null && getNodeText(singleRec.childNodes[k])!=''){
                            singleRecObj[nodeName] = Number(getNodeText(singleRec.childNodes[k]));
                        }
                       
                    } else if(tdObjElem.tagName.toUpperCase() == "OJ-SWITCH") {
                        if(getNodeText(singleRec.childNodes[k])!=null && getNodeText(singleRec.childNodes[k])!=''){
                            if(tdObjElem.getAttribute("ON") == getNodeText(singleRec.childNodes[k])) {
                                singleRecObj[nodeName] = true;
                            } else {
                                singleRecObj[nodeName] = false;
                            }
                        }
                    }  else if(tdObjElem.tagName.toUpperCase() == "OJ-SELECT-SINGLE") {
                        var selValueFound = false;
                        var defaultSelValue;
                        for(var selectLength=0;selectLength<selectControl[tdObjElem.id].length;selectLength++) {
                            if (selectControl[tdObjElem.id][selectLength].value == getNodeText(singleRec.childNodes[k])) {
                                singleRecObj[nodeName] = getNodeText(singleRec.childNodes[k]);
                                selValueFound = true;
                                break;
                            }
                            if(selectControl[tdObjElem.id][selectLength].defaultValue) {
                                defaultSelValue = selectControl[tdObjElem.id][selectLength].defaultValue;
                            }
                        }
                        if(!selValueFound) {
                            if(defaultSelValue) {
                                singleRecObj[nodeName] = defaultSelValue;
                            } else {
                                singleRecObj[nodeName] = selectControl[tdObjElem.id][0].value;
                            }
                        }
                    } else {
                        singleRecObj[nodeName] = getNodeText(singleRec.childNodes[k]);
                    }
                    break;
                }
                
					if (tdObjElem.tagName.toUpperCase() == "OJ-BUTTON") {
						if( gAction != '' && gAction != 'EXECUTEQUERY' && gAction != 'REVERSE' && gAction != 'REMOTEAUTH' && gAction != 'VIEW' && gAction != 'AUTH' ){
						tdObjElem.setAttribute("disabled",false);
						}else{
						tdObjElem.setAttribute("disabled",true);
						}
                    }
            }
//REDWOOD_35313042
			if (fieldavail)
			{
				var DBC = NVL(tdObjElem.getAttribute("DBC"));
					if (DBC) {
                    DBC = DBC.toUpperCase(); 
                    var nodeValue = NVL(selectSingleNode(singleRec,DBC));
        
                    if (selectSingleNode(singleRec,DBC) == null) {
                        if (selectSingleNode(singleRec,"./*[@Type='SINGLE']")) {
                            if (selectSingleNode(singleRec,"./*[@Type='SINGLE']/" + DBC)) 
								nodeValue = selectSingleNode(singleRec,"./*[@Type='SINGLE']/" + DBC);
							singleRecObj[DBC]=nodeValue.childNodes[0].nodeValue;
                        }
                    }
					}
			} //REDWOOD_35313042
        }
        
       // var jsonObj =  xmlToJson(singleRec);
        //debugger;
         meArrayForAddDelete[parentNodeName].push(singleRecObj);
       // document.getElementById(parentNodeName).refresh();
         
        //         document.getElementById('paging_'+parentNodeName).refresh();
    //var rowIndex =l_tableObj.tBodies[0].rows.length;
   // l_tableObj.tBodies[0].rows[rowIndex-1].cells[0].focus();
    // document.getElementById(tableName).refresh();
   // newRow = callAddNewRow(tableName, index);
  //  document.getElementById(tableName).refresh();
      //   showTable(true);
    }
//REDWOOD_35313042 starts
	setTimeout(function(){
		var timer=0;
		var mainTableObj = getTableObjForBlock(parentNodeName);
		if (mainTableObj.tBodies[0].rows.length>0){
		if(mainTableObj.tBodies[0].rows[0].cells[0].innerHTML =='No data to display.'){
		 timer=20;
		}}	
		else {timer=50;}
		setTimeout(function(){
		
			for(var rowLength=0;rowLength<mainTableObj.tBodies[0].rows.length;rowLength++) {
					if ((gAction=="MODIFY" && isDeletRow)&& (gAction != '' && gAction != 'EXECUTEQUERY' && gAction != 'REVERSE' && gAction != 'REMOTEAUTH' && gAction != 'VIEW' && gAction != 'AUTH')){//REDWOOD_35327971 //REDWOOD_35303668
					enableRowElements( getTableObjForBlock(parentNodeName).tBodies[0].rows[rowLength]);
					}//REDWOOD_35327971
				if(mainTableObj.tBodies[0].rows[0].cells[0].children[0]){
				if(mainTableObj.tBodies[0].rows[0].cells[0].children[0].tagName.toUpperCase()=='OJ-SELECTOR') {
							if(mainTableObj.tBodies[0].rows[0].cells[0].getElementsByTagName("INPUT")[0].checked == false){//redwood_35303675 starts
								mainTableObj.tBodies[0].rows[0].cells[0].getElementsByTagName("INPUT")[0].click();
							} //redwood_35303675 ends
				}
				}
			}
			if(isDeletRow){isDeletRow=false;}//REDWOOD_35327971
		},timer);	
    },0);
//REDWOOD_35313042 Ends
}

//OJET Migration
function xmlToJson(xml) {
	
	// Create the return object
	var obj = {};

	if (xml.nodeType == 1) { // element
		// do attributes
		/*if (xml.attributes.length > 0) {
		obj["@attributes"] = {};
			for (var j = 0; j < xml.attributes.length; j++) {
				var attribute = xml.attributes.item(j);
				obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
			}
		}*/
	} else if (xml.nodeType == 3) { // text
		obj = xml.nodeValue;
	}

	// do children
	if (xml.hasChildNodes()) {
		for(var i = 0; i < xml.childNodes.length; i++) {
			var item = xml.childNodes.item(i);
			var nodeName = item.nodeName;
			if (typeof(obj[nodeName]) == "undefined") {
				obj[nodeName] = xmlToJson(item);
			} else {
				if (typeof(obj[nodeName].push) == "undefined") {
					var old = obj[nodeName];
					obj[nodeName] = [];
					obj[nodeName].push(old);
				}
				obj[nodeName].push(xmlToJson(item));
			}
		}
	}
	return obj;
};
function handleOjetMEPagination(event, tname) {
 if (arguments.callee.caller && arguments.callee.caller.caller && arguments.callee.caller.caller.toString()) {
        if (arguments.callee.caller.caller.toString().indexOf("fnDeleteRowForMultipleEntry") >0) {
            return true;
        }
}

    var position;
    var l_gotoVal = 0;
    var srcElem = event.srcElement;
    // if span - all cases
        //if inner text is a no. --> goto case
        //else next prev case --> parent node -->a srcElem = srcElem.parentNode
    if (srcElem.tagName.toUpperCase() == 'SPAN') {
        var spanVal = getInnerText(srcElem);
        if(isNaN(spanVal) ){
            srcElem = srcElem.parentNode;
        }else {
            position = N_GOTO;
            l_gotoVal = Number(spanVal);
        }
    }
    if (srcElem.tagName.toUpperCase() == 'A') {
        if (srcElem.getAttribute("data-oj-pagenum") != null) {
            position = N_GOTO;
            l_gotoVal = Number(srcElem.getAttribute("data-oj-pagenum")) + 1;
        }
        else if (srcElem.className.includes('oj-pagingcontrol-nav-last')) {
            position = N_LAST;
        }
        else if (srcElem.className.includes('oj-pagingcontrol-nav-next')) {
            position = N_NEXT;
        }
        else if (srcElem.className.includes('oj-pagingcontrol-nav-previous')) {
            position = N_PREVIOUS;
        }
        else if (srcElem.className.includes('oj-pagingcontrol-nav-first')) {
            position = N_FIRST;
        }
    }
    Navigate(position, tname.id, l_gotoVal);
}
            
function Navigate(type, tname,l_gotoVal) {//OJET Migration
    mainWin.fnUpdateScreenSaverInterval();
//    var l_totalPg = Number(getInnerText(document.getElementById("TotPage__" + tname)));
//    if (l_totalPg == 1)
//        return;
    var htmlTableObj = getTableObjForBlock(tname);
    //var pgsize = Number(htmlTableObj.getAttribute("pgsize"));
    var nodeName =tname ;// htmlTableObj.id;
    appendTableValue(htmlTableObj, 1, nodeName);//12.0.3 ME changes
    var pgsize = getPgSize(nodeName);/*12.0.4 UI performance changes */
     var query = getXPathQuery(nodeName);
    var nodeList = selectNodes(dbDataDOM, getXPathQuery(nodeName));
    
    //var l_gotoVal = Number(document.getElementById("goto__" + nodeName).value);

    //var currPage = getInnerText(document.getElementById("CurrPage__" + nodeName));

    //if (!fnEventsHandler('fnPreNavigate_' + tname))
    //    return;

    switch (type) {
        case N_FIRST:
            dbIndexArray[nodeName] = 1;
            break;
        case N_PREVIOUS:
            dbIndexArray[nodeName] = dbIndexArray[nodeName] - pgsize;
            if (dbIndexArray[nodeName] <= 0)
                dbIndexArray[nodeName] = 1;
            break;
        case N_NEXT:
            dbIndexArray[nodeName] = dbIndexArray[nodeName] + pgsize;
            /*12.0.4 UI performance changes starts*/
          /*  if (nodeList.length < dbIndexArray[nodeName]) {
                var startId = (Number(currPage) * pgsize) + 1;
                fnGetPartialDataXMLFromFCJXML(startId, nodeName, query, false, nodeList.length, false, '');//Got the Next 30 Records. appending is pending   
                nodeList = selectNodes(dbDataDOM, getXPathQuery(nodeName));
            }*/
            /*12.0.4 UI performance changes ends*/
            if (dbIndexArray[nodeName] > nodeList.length)
                dbIndexArray[nodeName] = nodeList.length;
            break;
        case N_LAST:
        /*12.0.4 UI performance changes starts*/

//        var prevPgLen =  (l_totalPg - 1)  * pgsize;
//        if(nodeList.length < (prevPgLen+1)) {
//            fnGetPartialDataXMLFromFCJXML(nodeList.length + 1, nodeName, query, true, nodeList.length, false, '');
//            nodeList = selectNodes(dbDataDOM, getXPathQuery(nodeName));
//        }
            /*12.0.4 UI performance changes ends*/
            var dataLength=meArrayForAddDelete[nodeName]().length;
            if (dataLength % pgsize == 0) {
              //  dbIndexArray[nodeName] = Number(Math.floor(nodeList.length / pgsize) * pgsize);
              dbIndexArray[nodeName] = Number(Math.floor(dataLength / pgsize) * pgsize) ;
            }
            else {
                dbIndexArray[nodeName] = Number(Math.floor(dataLength / pgsize) * pgsize) + 1;
            }
            break;
        case N_GOTO:
           /* if ((isNaN(l_gotoVal) || l_gotoVal == '' || document.getElementById("goto__" + nodeName).value.indexOf(".") !=  - 1 || l_gotoVal <= 0 || l_gotoVal > l_totalPg)) {
                alert(mainWin.getItemDesc("LBL_PAGE_NO_BLANK"));
                document.getElementById("goto__" + nodeName).value = "";
                return;
            }*/
            SetDBIndexForGOTO(nodeName, l_gotoVal,  pgsize, nodeList);
            break;
        default :
            return;
    }

    //showTabData(strCurrentTabId);
    //fnCheckToggleChkBox(tname);
    //checkAnFocusSelectedRow(tname);
//	 if(document.getElementById("go__" + nodeName).disabled != true && getIEVersionNumber()== 9 ){ //21603599 starts
//        fireHTMLEvent(document.getElementById("go__" + nodeName), "onmouseover");
//        fireHTMLEvent(document.getElementById("go__" + nodeName), "onmouseout");
//    }//21603599  ends
//    if ((gAction == 'EXECUTEQUERY' || gAction == "") && functionId != "CLRU") {
//        var pviewmode = viewModeAction
//        viewModeAction = true;
//        disableAllElements("INPUT");
//        //fnEnableBlockCheckBox();
//        fnEnableElement(document.getElementById('BTN_EXIT_IMG'));
//        viewModeAction = pviewmode;
//    }
    showDescendants(tname);
    //fnEventsHandler('fnPostNavigate_' + tname);
    return;
}

//REDWOOD_CHANGES ends