var subScreen='N';
function fnPostLoad_CVS_AUTH_KERNEL(screenArgs) {
    subScreen = 'Y';
    if(!fnProcessAuthOnLoad(screenArgs))
        return false;
        document.getElementById("BLK_OLTBS_CONTRACT__OLCAUT__BTN_AUTHORIZE").disabled = false;        
	gAction = 'AUTH';
	fnEnableElement(document.getElementById("BLK_OLTBS_CONTRACT__OLCAUT__BTN_AUTHORIZE"));
	return true;
}
function fnOnlineAuth() {
    var gprev = gAction;
    gAction = 'AUTH';
   
       if (!fnOnlineAuthorize(subScreen)) {		
		var l_msgStat =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
		if (l_msgStat == 'SUCCESS') {
		
		document.getElementById("BLK_OLTBS_CONTRACT__OLCAUT__BTN_AUTHORIZE").disabled = true;
            
			disableForm();
		}		
        gAction = gprev;
        return true;
    }
}

