/*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : RadCBMenu.js
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
var dhtmlgoodies_slideSpeed = 200;// Higher value = faster
var dhtmlgoodies_timer = 10;// Lower value = faster
var objectIdToSlideDown = false;
var dhtmlgoodies_activeId = false;
var dhtmlgoodies_slideInProgress = false;
var dhtmlgoodies_slideInProgress = false;
var dhtmlgoodies_expandMultiple = false;

function showHideContent(e, inputId) {
    if (dhtmlgoodies_slideInProgress)
        return;
    dhtmlgoodies_slideInProgress = true;
    if (!inputId)
        inputId = this.id;
    inputId = inputId + '';
    var numericId = inputId.replace(/[^0-9]/g, '');
    var answerDiv = document.getElementById('idAppBrw');
    objectIdToSlideDown = false;

    if (!answerDiv.style.display || answerDiv.style.display == 'none') {
        if (dhtmlgoodies_activeId && dhtmlgoodies_activeId != numericId && !dhtmlgoodies_expandMultiple) {
            objectIdToSlideDown = numericId;
            slideContent(dhtmlgoodies_activeId, (dhtmlgoodies_slideSpeed *  - 1));
        }
        else {
            answerDiv.style.display = 'block';
            answerDiv.style.visibility = 'visible';
            answerDiv.style.zIndex = 400;
            slideContent(numericId, dhtmlgoodies_slideSpeed);
            document.getElementById('vTabCN_EXPLORE').style.height = screen.height - 250 + 'px';
        }
    }
    else {
        slideContent(numericId, (dhtmlgoodies_slideSpeed *  - 1));
        dhtmlgoodies_activeId = false;
    }
}

function slideContent(inputId, direction) {
	 
    var obj = document.getElementById('idAppBrw' );
    var contentObj = document.getElementById('vTabCN_EXPLORE');
    height = obj.clientHeight;
    if (height == 0)
        height = obj.offsetHeight;
    height = height + direction;
    rerunFunction = true;
    if (height > contentObj.offsetHeight) {
        height = contentObj.offsetHeight;
        rerunFunction = false;
    }
    if (height <= 1) {
        height = 1;
        rerunFunction = false;
    }

    if(height==1){
    	 document.getElementById("LAND_BROWSER").title='Expand Menu' ;
		 document.getElementById("LAND_BROWSER").className= 'hamMenu';
    }
    else{
    	 document.getElementById("LAND_BROWSER").title='Collapse Menu';
		 document.getElementById("LAND_BROWSER").className= 'hamMenu selected';
    }
    obj.style.height = height + 'px';
    var topPos = height - contentObj.offsetHeight;
    if (topPos > 0)
        topPos = 0;
    contentObj.style.top = topPos + 'px';
    if (rerunFunction) {
        setTimeout('slideContent(' + inputId + ',' + direction + ')', dhtmlgoodies_timer);
    }
    else {
        if (height <= 1) {
            obj.style.display = 'none';
            if (objectIdToSlideDown && objectIdToSlideDown != inputId) {
                document.getElementById('idAppBrw' ).style.display = 'block';
                document.getElementById('idAppBrw').style.visibility = 'visible';
                slideContent(objectIdToSlideDown, dhtmlgoodies_slideSpeed);
            }
            else {
                dhtmlgoodies_slideInProgress = false;
            }
        }
        else {
            dhtmlgoodies_activeId = inputId;
            dhtmlgoodies_slideInProgress = false;
        }
    }
}


function initShowHideDivs() {
    var divs = document.getElementsByTagName('DIV');
    var divCounter = 1;
    for (var no = 0;no < divs.length;no++) {
        if (divs[no].className == 'dhtmlgoodies_question') {
            divs[no].onclick = showHideContent;
            divs[no].id = 'dhtmlgoodies_q' + divCounter;
            var answer = divs[no].nextSibling;
            while (answer && answer.tagName != 'DIV') {
                answer = answer.nextSibling;
            }
            answer.id = 'idAppBrw' ;
            answer.className = 'DIVvtabP' ;
            contentDiv = answer.getElementsByTagName('DIV')[0];
            contentDiv.style.top = 0 - contentDiv.offsetHeight + 'px';
            contentDiv.className = 'tabcontent';
            contentDiv.id = 'vTabCN_EXPLORE';
            answer.style.display = 'none';
            answer.style.height = '1px';
            answer.style.width = '100%';
            divCounter++;
        }
    }
}
//window.onload = initShowHideDivs;
function fnAcessLanding(e) {
    var evnt = window.event || e;
    var srcElement = getEventSourceElement(evnt);
    if ((evnt.keyCode == 40)) {
        if (srcElement.id == "OPTIONS_MENU" || srcElement.id == "LAND_WINDOWS") {
            if (srcElement.parentNode.getElementsByTagName("A")[1]) {
                srcElement.parentNode.getElementsByTagName("A")[1].focus();
                disableCommonKeys(evnt);
                return false;
            }
        }
        else {
            try {
                getNextSibling(srcElement).focus();
            }
            catch (e) {
                if (getNextSibling(srcElement) != null)
                    if (getNextSibling(getNextSibling(srcElement)) != null)
                        getNextSibling(getNextSibling(srcElement)).focus();
            }
        }
    }
    else if ((evnt.keyCode == 38)) {
        try {
            try {
                getPreviousSibling(srcElement).focus();

            }
            catch (e) {
                getPreviousSibling(getPreviousSibling(srcElement)).focus();

            }
        }
        catch (e) {
            srcElement.parentNode.parentNode.getElementsByTagName("A")[0].focus();
        }
    }
    else if ((evnt.keyCode == 37)) {
        if (getPreviousSibling(srcElement.parentNode) != null && getPreviousSibling(srcElement.parentNode).tagName == "LI") {
            getPreviousSibling(srcElement.parentNode).getElementsByTagName("A")[0].focus();
            preventpropagate(evnt);
            return false;
        }
    }
    else if ((evnt.keyCode == 39)) {
        if (getNextSibling(srcElement.parentNode) != null && getNextSibling(srcElement.parentNode).tagName == "LI") {
            getNextSibling(srcElement.parentNode).getElementsByTagName("A")[0].focus();
            preventpropagate(evnt);
            return false;
        }
    }
}

function disableDefault() {
    event.returnValue = false;
    return false;
}