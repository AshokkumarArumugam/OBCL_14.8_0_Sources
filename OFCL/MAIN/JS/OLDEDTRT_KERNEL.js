function fnCalcFinalRate(){
	 var sumTblObj = getTableObjForBlock("BLK_LFTBS_CONTRACT_AGENCY_RATE").tBodies[0].rows;
    var chkd = false;
    for(var j = 0; j < sumTblObj.length; j++){
        var isChkd = sumTblObj[j].cells[0].getElementsByTagName('INPUT')[0].checked; //REDWOOD_CHANGES
		var currentRowIndex=j;
			 if(isChkd)
			break;
        
    }
	
	
	var BaseRate=getTableObjForBlock("BLK_LFTBS_CONTRACT_AGENCY_RATE").tBodies[0].rows[currentRowIndex].cells[4].getElementsByTagName("oj-input-text")[0].value;
	var Spread=getTableObjForBlock("BLK_LFTBS_CONTRACT_AGENCY_RATE").tBodies[0].rows[currentRowIndex].cells[5].getElementsByTagName("oj-input-text")[0].value;
	var FinalRate=getTableObjForBlock("BLK_LFTBS_CONTRACT_AGENCY_RATE").tBodies[0].rows[currentRowIndex].cells[6].getElementsByTagName("oj-input-text")[0]; //REDWOOD_CHANGES
	if(Spread=="")
		Spread=0;
	BaseRate=parseFloat(BaseRate);
	Spread=parseFloat(Spread);
	
	if(Number.isFinite(BaseRate)&&Number.isFinite(Spread)){
		FinalRate.value=BaseRate+Spread;
	}
	else{
		FinalRate.value=0;
	}
	return true;
	
}

function fnPreUnlock_KERNEL() {
	var auth_stat=document.getElementById("BLK_OLTBS_CONTRACT_EVENT_LOG__AUTHSTAT").value;
	if(auth_stat=='U'){
		showAlerts(fnBuildAlertXML('IN-IR005', 'E',"For Unauthorized record not Allowed."),'E');
		return false;
	}
    return true;
}

function fnPostUnlock_KERNEL() {
	var components = getTableObjForBlock("BLK_LFTBS_CONTRACT_INTEREST").tBodies[0].rows;
	if(components.length==0)
		fnDisableElement(document.getElementById("cmdAddRow_BLK_LFTBS_CONTRACT_AGENCY_RATE"));
    return true;
}
/* 
function fnPostAuthorize_KERNEL() {
		screenArgs['CONTRACT_REF_NO'] =getDocummentElementById('');
		screenArgs['SCREEN_NAME'] = 'CVS_AUTH'
        screenArgs['FUNCTION_ID'] = 'OLDEDTAU';
        screenArgs['ACTION'] = 'EXECUTEQUERY';
        screenArgs['UI_XML'] = 'CVS_AUTH';
        screenArgs['PARENT_FUNC_ID'] = 'OLDEDTRT';
        funcid = 'OLDEDTAU';
        parent.screenArgs = screenArgs;
		gAction = "EXECUTEQUERY";
        mainWin.dispHref1("OLDEDTAU", parent.seqNo);	
    return true;
} */