function fnPreShowDashboardCol_CSSNGUID_KERNEL(screenArgs) {
	var currFld = screenArgs["OBJECT"];
	var urlToLaunch = currFld.parentNode.parentNode.parentNode.cells[2].childNodes[0].getElementsByTagName("INPUT")[0].value;
	mainWin.openPlatoWindow(urlToLaunch);
	return false;
}