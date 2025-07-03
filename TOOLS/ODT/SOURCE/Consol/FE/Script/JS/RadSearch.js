/*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : RadSearch.js
  **
  ** 
  ** This source is part of the Oracle FLEXCUBE Software System and is copyrighted by Oracle Financial Services Software Limited.
  ** 
  ** 
  ** All rights reserved. No part of this work may be reproduced, stored in a retrieval system,
  ** adopted or transmitted in any form or by any means, electronic, mechanical, photographic,
  ** graphic, optic recording or otherwise, translated in any language or computer language,
  ** without the prior written permission of Oracle Financial Services Software Limited.
  ** 
  ** Oracle Financial Services Software Limited.
  ** 10-11, SDF I, SEEPZ, Andheri (East),
  ** Mumbai - 400 096.
  ** India
  ** Copyright © 2012 - 2013 Oracle Financial Services Software Limited. All rights reserved.
  -------------------------------------------------------------------------------------------------------
  CHANGE HISTORY
  
  SFR Number         :  
  Changed By         :  
  Change Description :  
  
  -------------------------------------------------------------------------------------------------------
*/
/* Algorithm:
    1) Search for exact matches in the dom
	2) Sarach for first N matching the word given
*/
var radSrEnterCount = 0;
var radPrSrEnterCount = 0;
var prevSrVal;

function findFields(event) {
    var matchcount = 0;
    var findFldTxt = getSearchFldText(event);
    if(selected = "BNM"){
    if(selectSingleNode(dom, "//RAD_DATA_BLOCKS[BLOCK_NAME='" + clickedobjects[1] + "']/RAD_BLK_FIELDS[@ID='" + clickedobjects[2] + "']")==null){
    findFldTxt = findFldTxt.substring(0,findFldTxt.length-1);
    clickedobjects[2] = findFldTxt;
    }
    }
    var matchFound = false;
    var functyp = getNodeText(selectSingleNode(dom, "//RAD_FUNCTIONS/FUNCTION_TYPE"));
    if (searchedValue != "") {
        searchedValue.style.background = '#f8f8f8';
        searchedValue.style.color = '#000';
    }
    if (findFldTxt != prevSrVal || (event.keyCode != 13 && event.keyCode != 40)) {
        radSrEnterCount = 0;
    }
    if (event != null) {
        if (event.keyCode == 13 || event.keyCode == 40) {
            if (radPrSrEnterCount == radSrEnterCount) {
                radSrEnterCount = 0;
                radPrSrEnterCount = 0;
            }
        }
    }

    radPrSrEnterCount = radSrEnterCount;
    //exact Match Searching
    if (functyp != "S" && parent.gwinFuncId != "RDDSCRDF") {
        if (selectNodes(dom, "//RAD_DATASOURCES[@ID=" + "'" + findFldTxt.toUpperCase() + "'" + "]").length > 0 && !matchFound) {
            matchcount = matchcount + 1;
            if (matchcount > radSrEnterCount) {
                radSrEnterCount = radSrEnterCount + 1;
                document.getElementById("DSN~" + findFldTxt.toUpperCase()).style.background = '#87CEFA';
                searchedValue = document.getElementById("DSN~" + findFldTxt.toUpperCase());
                document.getElementById("ULDSN").parentNode.firstChild.setAttribute('src', "Images/dhtmlgoodies_minus.png");
                document.getElementById("ULDSN").style.display = "block";
                matchFound = true;
                scrolltoelement(searchedValue);

            }
        }
        if (event.data!= "preview" && selectNodes(dom, "//RAD_DATASOURCES/RAD_FIELDS[@ID=" + "'" + findFldTxt.toUpperCase() + "'" + "]").length > 0 && !matchFound) {
            matchcount = matchcount + 1;
            var fldlen = selectNodes(dom, "//RAD_DATASOURCES/RAD_FIELDS[@ID=" + "'" + findFldTxt.toUpperCase() + "'" + "]").length;
            if ((parseInt(matchcount) + parseInt(fldlen) - 1) > radSrEnterCount) {
                radSrEnterCount = radSrEnterCount + 1;
                var srIndex = parseInt(radSrEnterCount) - parseInt(matchcount);
                var searchFldNode = selectNodes(dom, "//RAD_DATASOURCES/RAD_FIELDS[@ID=" + "'" + findFldTxt.toUpperCase() + "'" + "]")[srIndex];
                var searchParentNode = searchFldNode.parentNode.getAttribute("ID");
                document.getElementById("DSN~" + searchParentNode + "~" + findFldTxt.toUpperCase()).style.background = '#87CEFA';
                searchedValue = document.getElementById("DSN~" + searchParentNode + "~" + findFldTxt.toUpperCase());
                document.getElementById("ULDSN").parentNode.firstChild.setAttribute('src', "Images/dhtmlgoodies_minus.png");
                document.getElementById("ULDSN").style.display = "block";
                document.getElementById("ULDSN~" + searchParentNode).parentNode.firstChild.setAttribute('src', "Images/dhtmlgoodies_minus.png");
                document.getElementById("ULDSN~" + searchParentNode).style.display = "block";
                matchFound = true;
                scrolltoelement(searchedValue);
            }

        }
        if (selectNodes(dom, "//RAD_LOVS[@ID=" + "'" + findFldTxt.toUpperCase() + "'" + "]").length > 0 && !matchFound) {
            matchcount = matchcount + 1;
            if (matchcount > radSrEnterCount) {
                radSrEnterCount = radSrEnterCount + 1;
                document.getElementById("LOV~" + findFldTxt.toUpperCase()).style.background = '#87CEFA';
                searchedValue = document.getElementById("LOV~" + findFldTxt.toUpperCase());
                document.getElementById("ULLOV").parentNode.firstChild.setAttribute('src', "Images/dhtmlgoodies_minus.png");
                document.getElementById("ULLOV").style.display = "block";
                matchFound = true;
                scrolltoelement(searchedValue);
            }
        }
    }
    if (selectNodes(dom, "//RAD_DATA_BLOCKS[@ID=" + "'" + findFldTxt.toUpperCase() + "'" + "]").length > 0 && !matchFound) {
        matchcount = matchcount + 1;
        if (matchcount > radSrEnterCount) {
            radSrEnterCount = radSrEnterCount + 1;
            document.getElementById("BLK~" + findFldTxt.toUpperCase()).style.background = '#87CEFA';
            searchedValue = document.getElementById("BLK~" + findFldTxt.toUpperCase());
            document.getElementById("ULBLK").parentNode.firstChild.setAttribute('src', "Images/dhtmlgoodies_minus.png");
            document.getElementById("ULBLK").style.display = "block";
            matchFound = true;
            scrolltoelement(searchedValue);
        }
    }
    if (selectNodes(dom, "//RAD_DATA_BLOCKS/RAD_BLK_FIELDS[@ID=" + "'" + findFldTxt.toUpperCase() + "'" + "]").length > 0 && !matchFound) {
        matchcount = matchcount + 1;
        var fldlen = selectNodes(dom, "//RAD_DATA_BLOCKS/RAD_BLK_FIELDS[@ID=" + "'" + findFldTxt.toUpperCase() + "'" + "]").length;
        if ((parseInt(matchcount) + parseInt(fldlen) - 1) > radSrEnterCount) {
            radSrEnterCount = radSrEnterCount + 1;
            var srIndex = parseInt(radSrEnterCount) - parseInt(matchcount);
            var searchFldNode = selectNodes(dom, "//RAD_DATA_BLOCKS/RAD_BLK_FIELDS[@ID=" + "'" + findFldTxt.toUpperCase() + "'" + "]")[srIndex];
            var searchParentNode = searchFldNode.parentNode.getAttribute("ID");
            document.getElementById("BLK~" + searchParentNode + "~" + findFldTxt.toUpperCase()).style.background = '#87CEFA';
            searchedValue = document.getElementById("BLK~" + searchParentNode + "~" + findFldTxt.toUpperCase());
            document.getElementById("ULBLK").parentNode.firstChild.setAttribute('src', "Images/dhtmlgoodies_minus.png");
            document.getElementById("ULBLK").style.display = "block";
            document.getElementById("ULBLK~" + searchParentNode).parentNode.firstChild.setAttribute('src', "Images/dhtmlgoodies_minus.png");
            document.getElementById("ULBLK~" + searchParentNode).style.display = "block";
            matchFound = true;
            scrolltoelement(searchedValue);
        }
    }
    if (selectNodes(dom, "//RAD_SCREENS[@ID=" + "'" + findFldTxt.toUpperCase() + "'" + "]").length > 0 && !matchFound) {
        matchcount = matchcount + 1;
        if (matchcount > radSrEnterCount) {
            radSrEnterCount = radSrEnterCount + 1;
            document.getElementById("SCR~" + findFldTxt.toUpperCase()).style.background = '#87CEFA';
            searchedValue = document.getElementById("SCR~" + findFldTxt.toUpperCase());
            document.getElementById("ULSCR").parentNode.firstChild.setAttribute('src', "Images/dhtmlgoodies_minus.png");
            document.getElementById("ULSCR").style.display = "block";
            matchFound = true;
            scrolltoelement(searchedValue);
        }
    }
    if (selectNodes(dom, "//RAD_TABS[@ID=" + "'" + findFldTxt.toUpperCase() + "'" + "]").length > 0 && !matchFound) {
        var searchFldNode = selectSingleNode(dom, "//RAD_TABS[@ID=" + "'" + findFldTxt.toUpperCase() + "'" + "]");
        var searchParentNode = searchFldNode.parentNode.getAttribute("ID");
        var searchGrParentNode = searchFldNode.parentNode.parentNode.getAttribute("ID");
        document.getElementById("SCR~" + searchGrParentNode + "~" + searchParentNode + "~" + findFldTxt.toUpperCase()).style.background = '#87CEFA';
        searchedValue = document.getElementById("SCR~" + searchGrParentNode + "~" + searchParentNode + "~" + findFldTxt.toUpperCase());
        document.getElementById("ULSCR").style.display = "block";
        document.getElementById("ULSCR~" + searchGrParentNode).style.display = "block";
        document.getElementById("ULSCR~" + searchGrParentNode + "~" + searchParentNode).style.display = "block";
        document.getElementById("ULSCR").parentNode.firstChild.setAttribute('src', "Images/dhtmlgoodies_minus.png");
        document.getElementById("ULSCR~" + searchGrParentNode).parentNode.firstChild.setAttribute('src', "Images/dhtmlgoodies_minus.png");
        document.getElementById("ULSCR~" + searchGrParentNode + "~" + searchParentNode).parentNode.firstChild.setAttribute('src', "Images/dhtmlgoodies_minus.png");
        matchFound = true;
        scrolltoelement(searchedValue);

    }
    if (selectNodes(dom, "//RAD_TABS/RAD_SECTIONS[@ID=" + "'" + findFldTxt.toUpperCase() + "'" + "]").length > 0 && !matchFound) {
        var searchFldNode = selectSingleNode(dom, "//RAD_TABS/RAD_SECTIONS[@ID=" + "'" + findFldTxt.toUpperCase() + "'" + "]");
        var searchParentNode = searchFldNode.parentNode.getAttribute("ID");
        var searchGrParentNode = searchFldNode.parentNode.parentNode.getAttribute("ID");
        var searchGrGrParentNode = searchFldNode.parentNode.parentNode.parentNode.getAttribute("ID");
        document.getElementById("SCR~" + searchGrGrParentNode + "~" + searchGrParentNode + "~" + searchParentNode + "~" + findFldTxt.toUpperCase()).style.background = '#87CEFA';
        searchedValue = document.getElementById("SCR~" + searchGrGrParentNode + "~" + searchGrParentNode + "~" + searchParentNode + "~" + findFldTxt.toUpperCase());
        document.getElementById("ULSCR").style.display = "block";
        document.getElementById("ULSCR~" + searchGrGrParentNode).style.display = "block";
        document.getElementById("ULSCR~" + searchGrGrParentNode + "~" + searchGrParentNode).style.display = "block";
        document.getElementById("ULSCR~" + searchGrGrParentNode + "~" + searchGrParentNode + "~" + searchParentNode).style.display = "block";
        document.getElementById("ULSCR").parentNode.firstChild.setAttribute('src', "Images/dhtmlgoodies_minus.png");
        document.getElementById("ULSCR~" + searchGrGrParentNode).parentNode.firstChild.setAttribute('src', "Images/dhtmlgoodies_minus.png");
        document.getElementById("ULSCR~" + searchGrGrParentNode + "~" + searchGrParentNode).parentNode.firstChild.setAttribute('src', "Images/dhtmlgoodies_minus.png");
        document.getElementById("ULSCR~" + searchGrGrParentNode + "~" + searchGrParentNode + "~" + searchParentNode).parentNode.firstChild.setAttribute('src', "Images/dhtmlgoodies_minus.png");
        matchFound = true;
        scrolltoelement(searchedValue);
    }
    if (selectNodes(dom, "//RAD_FIELDSETS[@ID=" + "'" + findFldTxt.toUpperCase() + "'" + "]").length > 0 && !matchFound) {
        matchcount = matchcount + 1;
        if (matchcount > radSrEnterCount) {
            radSrEnterCount = radSrEnterCount + 1;
            document.getElementById("FLD~" + findFldTxt.toUpperCase()).style.background = '#87CEFA';
            searchedValue = document.getElementById("FLD~" + findFldTxt.toUpperCase());
            document.getElementById("ULFLD").parentNode.firstChild.setAttribute('src', "Images/dhtmlgoodies_minus.png");
            document.getElementById("ULFLD").style.display = "block";
            matchFound = true;
            scrolltoelement(searchedValue);
        }
    }

    //Non exact Match Searching
    if (!matchFound) {
        //datasource
        if (event.data!= "preview" && functyp != "S" && parent.gwinFuncId != "RDDSCRDF") {
            var datasource = selectNodes(dom, "//RAD_DATASOURCES");
            for (var ds = 0;ds < datasource.length && !matchFound;ds++) {
                var length = findFldTxt.length;
                var dsName = datasource[ds].getAttribute("ID");
                var filedtext = dsName.substring(0, length);
                if (filedtext.toUpperCase().indexOf(findFldTxt.toUpperCase()) !=  - 1) {
                    matchcount = matchcount + 1;
                    if (matchcount > radSrEnterCount) {
                        radSrEnterCount = radSrEnterCount + 1;
                        document.getElementById("DSN~" + dsName).style.background = '#87CEFA';
                        searchedValue = document.getElementById("DSN~" + dsName);
                        document.getElementById("ULDSN").parentNode.firstChild.setAttribute('src', "Images/dhtmlgoodies_minus.png");
                        document.getElementById("ULDSN").style.display = "block";
                        matchFound = true;
                        scrolltoelement(searchedValue);
                        break;
                    }
                }
                // datasource columns
                var fileds = selectNodes(datasource[ds], "RAD_FIELDS");
                for (var fd = 0;fd < fileds.length && !matchFound;fd++) {
                    var fldName = fileds[fd].getAttribute("ID");
                    var filedtext = fldName.substring(0, length);
                    if (filedtext.toUpperCase().indexOf(findFldTxt.toUpperCase()) !=  - 1) {
                        matchcount = matchcount + 1;
                        if (matchcount > radSrEnterCount) {
                            radSrEnterCount = radSrEnterCount + 1;
                            document.getElementById("DSN~" + dsName + "~" + fldName).style.background = '#87CEFA';
                            searchedValue = document.getElementById("DSN~" + dsName + "~" + fldName);
                            document.getElementById("ULDSN").parentNode.firstChild.setAttribute('src', "Images/dhtmlgoodies_minus.png");
                            document.getElementById("ULDSN").style.display = "block";
                            document.getElementById("ULDSN~" + dsName).parentNode.firstChild.setAttribute('src', "Images/dhtmlgoodies_minus.png");
                            document.getElementById("ULDSN~" + dsName).style.display = "block";
                            matchFound = true;
                            scrolltoelement(searchedValue);
                            break;

                        }
                    }
                }
            }

            // lov
            var datasource = selectNodes(dom, "//RAD_LOVS");
            for (var ds = 0;ds < datasource.length && !matchFound;ds++) {
                var length = findFldTxt.length;
                var dsName = datasource[ds].getAttribute("ID");
                var filedtext = dsName.substring(0, length);
                if (filedtext.toUpperCase().indexOf(findFldTxt.toUpperCase()) !=  - 1) {
                    matchcount = matchcount + 1;
                    if (matchcount > radSrEnterCount) {
                        radSrEnterCount = radSrEnterCount + 1;
                        document.getElementById("LOV~" + dsName).style.background = '#87CEFA';
                        searchedValue = document.getElementById("LOV~" + dsName);
                        document.getElementById("ULLOV").parentNode.firstChild.setAttribute('src', "Images/dhtmlgoodies_minus.png");
                        document.getElementById("ULLOV").style.display = "block";
                        matchFound = true;
                        scrolltoelement(searchedValue);
                        break;
                    }
                }
            }
        }
        // data blocks
        var datasource = selectNodes(dom, "//RAD_DATA_BLOCKS");
        for (var ds = 0;ds < datasource.length && !matchFound;ds++) {
            var length = findFldTxt.length;
            var dsName = datasource[ds].getAttribute("ID");
            var filedtext = dsName.substring(0, length);
            if (filedtext.toUpperCase().indexOf(findFldTxt.toUpperCase()) !=  - 1) {
                matchcount = matchcount + 1;
                if (matchcount > radSrEnterCount) {
                    radSrEnterCount = radSrEnterCount + 1;
                    document.getElementById("BLK~" + dsName).style.background = '#87CEFA';
                    searchedValue = document.getElementById("BLK~" + dsName);
                    document.getElementById("ULBLK").parentNode.firstChild.setAttribute('src', "Images/dhtmlgoodies_minus.png");
                    document.getElementById("ULBLK").style.display = "block";
                    matchFound = true;
                    scrolltoelement(searchedValue);
                    break;
                }
            }
            // data block fileds
            var fileds = selectNodes(datasource[ds], "RAD_BLK_FIELDS");
            for (var fd = 0;fd < fileds.length && !matchFound;fd++) {
                var fldName = fileds[fd].getAttribute("ID");
                var filedtext = fldName.substring(0, length);
                if (filedtext.toUpperCase().indexOf(findFldTxt.toUpperCase()) !=  - 1) {
                    matchcount = matchcount + 1;
                    if (matchcount > radSrEnterCount) {
                        radSrEnterCount = radSrEnterCount + 1;
                        document.getElementById("BLK~" + dsName + "~" + fldName).style.background = '#87CEFA';
                        searchedValue = document.getElementById("BLK~" + dsName + "~" + fldName);
                        document.getElementById("ULBLK").parentNode.firstChild.setAttribute('src', "Images/dhtmlgoodies_minus.png");
                        document.getElementById("ULBLK").style.display = "block";
                        document.getElementById("ULBLK~" + dsName).parentNode.firstChild.setAttribute('src', "Images/dhtmlgoodies_minus.png");
                        document.getElementById("ULBLK~" + dsName).style.display = "block";
                        matchFound = true;
                        scrolltoelement(searchedValue);
                        break;

                    }
                }
            }
        }

        //screens
        var datasource = selectNodes(dom, "//RAD_SCREENS");
        for (var ds = 0;ds < datasource.length && !matchFound;ds++) {
            var length = findFldTxt.length;
            var dsName = datasource[ds].getAttribute("ID");
            var filedtext = dsName.substring(0, length);
            if (filedtext.toUpperCase().indexOf(findFldTxt.toUpperCase()) !=  - 1) {
                matchcount = matchcount + 1;
                if (matchcount > radSrEnterCount) {
                    radSrEnterCount = radSrEnterCount + 1;
                    document.getElementById("SCR~" + dsName).style.background = '#87CEFA';
                    searchedValue = document.getElementById("SCR~" + dsName);
                    document.getElementById("ULSCR").parentNode.firstChild.setAttribute('src', "Images/dhtmlgoodies_minus.png");
                    document.getElementById("ULSCR").style.display = "block";
                    matchFound = true;
                    scrolltoelement(searchedValue);
                    break;
                }
            }
            // TABS
            var scrportion = 'HEADER~BODY~FOOTER';
            scrportion = scrportion.split("~");
            for (var hn = 0;hn < scrportion.length;hn++) {
                var fileds = selectNodes(datasource[ds], scrportion[hn] + "/RAD_TABS");
                for (var fd = 0;fd < fileds.length && !matchFound;fd++) {
                    var fldName = fileds[fd].getAttribute("ID");
                    var filedtext = fldName.substring(0, length);
                    if (filedtext.toUpperCase().indexOf(findFldTxt.toUpperCase()) !=  - 1) {
                        matchcount = matchcount + 1;
                        if (matchcount > radSrEnterCount) {
                            radSrEnterCount = radSrEnterCount + 1;
                            var scrprtn = fileds[fd].parentNode.getAttribute("ID");
                            document.getElementById("SCR~" + dsName + "~" + scrprtn + "~" + fldName).style.background = '#87CEFA';
                            searchedValue = document.getElementById("SCR~" + dsName + "~" + scrprtn + "~" + fldName);
                            document.getElementById("ULSCR").style.display = "block";
                            document.getElementById("ULSCR~" + dsName).style.display = "block";
                            document.getElementById("ULSCR~" + dsName + "~" + scrprtn).style.display = "block";
                            document.getElementById("ULSCR").parentNode.firstChild.setAttribute('src', "Images/dhtmlgoodies_minus.png");
                            document.getElementById("ULSCR~" + dsName).parentNode.firstChild.setAttribute('src', "Images/dhtmlgoodies_minus.png");
                            document.getElementById("ULSCR~" + dsName + "~" + scrprtn).parentNode.firstChild.setAttribute('src', "Images/dhtmlgoodies_minus.png");
                            matchFound = true;
                            scrolltoelement(searchedValue);
                            break;
                        }
                    }
                    //sections
                    var sections = selectNodes(fileds[fd], "RAD_SECTIONS");
                    for (var se = 0;se < sections.length && !matchFound;se++) {
                        var secName = sections[se].getAttribute("ID");
                        var filedtext = secName.substring(0, length);
                        if (filedtext.toUpperCase().indexOf(findFldTxt.toUpperCase()) !=  - 1) {
                            matchcount = matchcount + 1;
                            if (matchcount > radSrEnterCount) {
                                radSrEnterCount = radSrEnterCount + 1;
                                var scrprtn = fileds[fd].parentNode.getAttribute("ID");
                                document.getElementById("SCR~" + dsName + "~" + scrprtn + "~" + fldName + "~" + secName).style.background = '#87CEFA';
                                searchedValue = document.getElementById("SCR~" + dsName + "~" + scrprtn + "~" + fldName + "~" + secName);
                                document.getElementById("ULSCR").style.display = "block";
                                document.getElementById("ULSCR~" + dsName).style.display = "block";
                                document.getElementById("ULSCR~" + dsName + "~" + scrprtn).style.display = "block";
                                document.getElementById("ULSCR~" + dsName + "~" + scrprtn + "~" + fldName).style.display = "block";
                                document.getElementById("ULSCR").parentNode.firstChild.setAttribute('src', "Images/dhtmlgoodies_minus.png");
                                document.getElementById("ULSCR~" + dsName).parentNode.firstChild.setAttribute('src', "Images/dhtmlgoodies_minus.png");
                                document.getElementById("ULSCR~" + dsName + "~" + scrprtn).parentNode.firstChild.setAttribute('src', "Images/dhtmlgoodies_minus.png");
                                document.getElementById("ULSCR~" + dsName + "~" + scrprtn + "~" + fldName).parentNode.firstChild.setAttribute('src', "Images/dhtmlgoodies_minus.png");
                                matchFound = true;
                                scrolltoelement(searchedValue);
                                break;
                            }
                        }
                    }
                }
            }
        }

        //fieldsets		
        var datasource = selectNodes(dom, "//RAD_FIELDSETS");
        for (var ds = 0;ds < datasource.length && !matchFound;ds++) {
            var length = findFldTxt.length;
            var dsName = datasource[ds].getAttribute("ID");
            var filedtext = dsName.substring(0, length);
            if (filedtext.toUpperCase().indexOf(findFldTxt.toUpperCase()) !=  - 1) {
                matchcount = matchcount + 1;
                if (matchcount > radSrEnterCount) {
                    radSrEnterCount = radSrEnterCount + 1;
                    document.getElementById("FLD~" + dsName).style.background = '#87CEFA';
                    searchedValue = document.getElementById("FLD~" + dsName);
                    document.getElementById("ULFLD").parentNode.firstChild.setAttribute('src', "Images/dhtmlgoodies_minus.png");
                    document.getElementById("ULFLD").style.display = "block";
                    matchFound = true;
                    scrolltoelement(searchedValue);
                    break;
                }
            }
        }

    }
    prevSrVal = findFldTxt;

}

function scrolltoelement(ele) {
    var topPos = ele.offsetTop;
   /* if (navigator.appName == 'Microsoft Internet Explorer') {
        document.getElementById('treebody').scrollTop = topPos;
    }
    else {*/
        document.getElementById('treebody').scrollTop = topPos - 175;
  //  }
}

function getSearchFldText(event) {
    var searchFldTxt = document.getElementsByName('FIND')[0].value;
    if (event != null) {
        var keyPressed = event.keyCode;
        if (event.keyCode >= 65 && event.keyCode <= 90) {
            searchFldTxt = searchFldTxt + String.fromCharCode(keyPressed);
        }
        if (event.keyCode == 8) {
            searchFldTxt = searchFldTxt.substr(0, searchFldTxt.length - 1);
        }
    }
    else {
        searchFldTxt = searchFldTxt.substr(0, searchFldTxt.length - 1);
    }
    return searchFldTxt;
}