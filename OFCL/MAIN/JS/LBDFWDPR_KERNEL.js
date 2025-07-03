

var fcjRequestDOM;
var fcjResponseDOM;
var gErrCodes = "";
var dbStrRootTableName = dataSrcLocationArray[0];
var coreFnSaveAll = fnSaveAll;
var coreFnvalidate= fnValidate;
fnValidate = function () {
    if (!coreFnvalidate()){
        fnPreSave_KERNEL();
        return false;
    } else
        return true;
}

fnSaveAll = function(v_scrName){
    if(!coreFnSaveAll(v_scrName) && (typeof(v_scrName) == "undefined" || v_scrName == '')){
        fnPostSave_KERNEL();
        return false;
    }else
        return true;
}

function fnPostLoad_KERNEL(){
fnEnableElement(document.getElementById("BLK_MSSFWDPR__CONTRACT_REF_NO"));
return true;
}

function fnPostNew_KERNEL(){
    
    return true;
}

function fnPreUnlock_KERNEL(){
    
   return true;
}
function fnPostUnlock_KERNEL(){

                              
    return true;
}


function fnPostCopy_KERNEL(){
    return true;
}

function fnPreSave_KERNEL(){
   
    return isValid;
}



function fnPostSave_KERNEL()
{
   
    return true;
}

function fnPreEnterQuery_KERNEL()
{
fnEnableElement(document.getElementById("BLK_MSSFWDPR__CONTRACT_REF_NO"));
return true;
}

function fnPostEnterQuery_KERNEL()
{
return true;
}

function fnPostExecuteQuery_KERNEL() {
fnEnableElement(document.getElementById("BLK_MSSFWDPR__BTN_DISPLAY"));
return true;
}

function fnPreExecuteQuery_KERNEL() {
fnEnableElement(document.getElementById("BLK_MSSFWDPR__CONTRACT_REF_NO"));
return true;
}

function fndisplaymsg() {
var moduleCode=document.getElementById("BLK_MSSFWDPR__TXT_MODULE_CODE").value;
if(moduleCode =='LT' || moduleCode == 'TL'){
   fnSubScreenMain('LBDFWDPR', 'LBDFWDPR', 'CVS_GWDMSG_LT', false); 
}else{
    if(moduleCode == 'LD' || moduleCode == 'FT' || moduleCode == 'OL' || moduleCode == 'TL'){
         fnSubScreenMain('LBDFWDPR', 'LBDFWDPR', 'CVS_FWDMSG', false); 
    }else{
         fnSubScreenMain('LBDFWDPR', 'LBDFWDPR', 'CVS_FWDMSG', false); 
    }
}

return true;
}

function fn_fwdmsg_view() {
return true;
}

function fn_resendToSc() {//BLK_FWD_MSG_QUEUE__BTN_RESEND

//var Obj = document.getElementById("BLK_FWD_MSG_QUEUE").tBodies[0].rows;
//if (Obj.length > 0 && gAction == "MODIFY") {
//    for (var i = 0;i <= Obj.length;i++) {
//     
//    var scChecked= document.getElementById("BLK_FWD_MSG_QUEUE").tBodies[0].rows[i].cells[6].getElementsByTagName("INPUT")[0].value;
//    }
//}

return true;
}

function fn_fwdmsg_comments() {
return true;
}

function fn_resend() {

var g_prev_gAction = gAction;
    appendData(document.getElementById("TBLPage" + strCurrentTabId));    
    if (gAction == "NEW" || gAction == "MODIFY") {
        if (selectNodes(dbDataDOM,"//UDTBS_FUNC_UDF_UPLOAD_DETAIL").length == 0) {
            gAction = "RESEND";
            fcjRequestDOM = buildUBSXml();
            fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);    
            if (fcjResponseDOM) {
                var msgStatus =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
                if (msgStatus == 'FAILURE') {
                    var messageNode = selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
                }else if (msgStatus == "WARNING" || msgStatus == "SUCCESS" ) {
                    var messageNode = selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
                }    
                var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
                setDataXML(getXMLString(pureXMLDOM));
                showData(dbStrRootTableName, 1);
                gAction = g_prev_gAction;
            }
            if(!fnProcessResponse())
                return false;    
        }
    }   
return true;
}

function fn_gwdmsg_view() {
return true;
}

function fn_resendToScLT() {
//var Obj = document.getElementById("BLK_FWD_MSG_QUEUE_LT").tBodies[0].rows;
//if (Obj.length > 0 && gAction == "MODIFY") {
//    for (var i = 0;i <= Obj.length;i++) {
//     
//    var scChecked= document.getElementById("BLK_FWD_MSG_QUEUE").tBodies[0].rows[i].cells[6].getElementsByTagName("INPUT")[0].value;
//    var check;
//    }
//}
return true;
}

function fn_gwdmsg_comments() {
return true;
}

function fn_resendLT() {
var g_prev_gAction = gAction;
    appendData(document.getElementById("TBLPage" + strCurrentTabId));    
    if (gAction == "NEW" || gAction == "MODIFY") {
        if (selectNodes(dbDataDOM,"//UDTBS_FUNC_UDF_UPLOAD_DETAIL").length == 0) {
            gAction = "RESEND";
            fcjRequestDOM = buildUBSXml();
            fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);    
            if (fcjResponseDOM) {
                var msgStatus =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
                if (msgStatus == 'FAILURE') {
                    var messageNode = selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
                }else if (msgStatus == "WARNING" || msgStatus == "SUCCESS" ) {
                    var messageNode = selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
                }    
                var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
                setDataXML(getXMLString(pureXMLDOM));
                showData(dbStrRootTableName, 1);
                gAction = g_prev_gAction;
            }
            if(!fnProcessResponse())
                return false;    
        }
    }   
return true;
}





