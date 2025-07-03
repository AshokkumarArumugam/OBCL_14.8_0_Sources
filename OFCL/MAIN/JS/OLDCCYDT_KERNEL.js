function fnPostNew_KERNEL(){
	document.getElementById("BLK_CCY_SETTLE_MASTER__BRANCH").value=mainWin.CurrentBranch;
	return true;
}

function fnPostLoad_KERNEL() {
	document.getElementById("BLK_CCY_SETTLE_MASTER__BRANCH").value="";
	return true;
}

function fnPostCopy_KERNEL(){
	document.getElementById("BLK_CCY_SETTLE_MASTER__BRANCH").value=mainWin.CurrentBranch;
	document.getElementById("BLK_CCY_SETTLE_MASTER__CCY_NAME").value="";
	return true;
}