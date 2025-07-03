 /*------------------------------------------------------------------------------------------
 **Modified By            : Akshara Jorigal
** Modified On           : 18-Oct-2017
** Modified Reason       : While modifying User (without visiting the Rights tab (MSDUSRDF)), no records 
                           should be inserted in smtb_msgs_rights. Same has been incorporated in the code. 
 ** Retro String          : Bug_26828200
** Search String         : 9NT1606_12_4_RETRO_12_2_26861794

**   Modified By            : Avneesh
**   Modified On            : 19-Jan-2018
**   Modified Reason        : Bug 27393028 - INFRA - PROBLEM WITH USER PREFERENCES SCREEN - AMOUNT FORMATTING
**   Retro Source           : 9NT1606_12_1_SYGNITY S.A.
**   Search String          : 9NT1606_14_0_RETRO_12_1_27393028
**
** Modified By           : Akshara Jorigal
** Modified On           : 7-Feb-2018
** Modified Reason       : Fix provided to show proper amount format while querying from summary or detail screen.
** Retro String          : Bug_27476948
** Search String         : 9NT1606_14_0_RETRO_12_1_27491039
**
** Modified By           : Girish M
** Modified On           : 09-Oct-2023
** Modified Reason       : Fields were not enabled after populate in dashboard
** Search String         : REDWOOD_35887744 


 
 ***************************************************************************************************************************
*/
//------------------------------------------------------------------------------


var fcjRequestDOM;
var fcjResponseDOM;
//var g_previousPassword = ""; 
//var isPasswordValid = true;
//var g_actualPassword = "";

var msgrights = "N";  //9NT1606_12_4_RETRO_12_2_26861794
var gErrCodes = "";

var coreFnSaveAll = fnSaveAll;
var coreFnvalidate= fnValidate;
var autoGenPassReq = mainWin.autoGenPassReq;
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
    debugs("In fnPostLoad", "A");
        /* Code Fix for Bug No: 17070676 Starts */
    /* if (mainWin.extPwd == "Y")
     {
       // document.getElementById("BLK_USR__USRPWD").value = 'PASSWORD';
       // fnDisableElement(document.getElementById("BLK_USR__USRPWD"));
        
     }
     /*else
     {
        fnEnableElement(document.getElementById("BLK_USR__USRPWD"));
     }*/
    
    /* Code Fix for Bug No: 17070676 Ends*/
        
        /* FCUBS 12.0.2 Screensaver Changes Starts*/
   /*     if (mainWin.scrSaverReq == "N") 
        {
            /*document.getElementById("BLK_USR__SCREENSAVERTIMEOUTI").className="hidden"; 
            getPreviousSibling(document.getElementById("BLK_USR__SCREENSAVERTIMEOUTI")).className ="LBLinv";
            document.getElementById("BLK_USR__SCREENSAVERTIMEOUTI").parentNode.parentNode.className ="LBLinv";*/
           // document.getElementById("BLK_USR__SCREENSAVERTIMEOUTI").parentNode.parentNode.style.display = "none"; 
   /*     }
        /* Code Fix for Bug No: 16919786 Starts*/
   /*     else if ( mainWin.scrSaverReq == "Y" && mainWin.scrSaverModifiableFlag=="N" ) 
        {
            document.getElementById("BLK_USR__SCREENSAVERTIMEOUTI").parentNode.parentNode.style.display = "none"; 
        }
        /* Code Fix for Bug No: 16919786 Ends*/ 
    /*    else 
        {
            /*document.getElementById("BLK_USR__SCREENSAVERTIMEOUTI").value = mainWin.scrTimeout ;*/
     /*    if (document.getElementById("BLK_USR__SCREENSAVERTIMEOUTI").parentNode.parentNode.style.display == "none")
            {
            document.getElementById("BLK_USR__SCREENSAVERTIMEOUTI").parentNode.parentNode.style.display = "block"; 
            }
        }
    /* FCUBS 12.0.2 Screensaver Changes Ends*/  
    //9NT1606_14_0_RETRO_12_1_27491039 changes starts
    /*
	//9NT1606_14_0_RETRO_12_1_27393028 start
	var x = document.getElementById("BLK_USR__AMOUNT_FORMAT");
    var option = document.createElement("option");
    option.text = ",";
	option.value = ", ";
	x.remove(3);
    x.add(option);
    */
    	//9NT1606_14_0_RETRO_12_1_27491039 changes end
	//9NT1606_14_0_RETRO_12_1_27393028 ends
     
   /*FCUBS10.5.2 Password Encryption For SMDUSRDF */
 /*   if(typeof(autoGenPassReq) !="undefined" && autoGenPassReq=="Y"){
        fnDisableElement(document.getElementById("BLK_USR__USRPWD"));
    }*/
    if(mainWin.rofcInstalled=="N"){
        
         document.getElementById("TAB_ROFC").style.visibility="HIDDEN";
        
    
    }

if (mainWin.extPwd == "Y")
    if (parent.screenArgs['PARENT_FUNC_ID'] == "STDBRREF") {
        fnPostLoad_CVS_MAIN_VIEWLOG();
    }    
    
     return true;
}

//9NT1501 :: FC UBS 12.0.0 : itr2 changes starts
function fnshowUserd(){
      appendData();
      g_prev_gAction = gAction;
      gAction='DASHFUNCPICKUP';
      fcjRequestDOM = buildUBSXml();
      servletURL = "FCClientHandler";
      fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
      gAction = '';             
      var msgStatus=fnProcessResponse();    
     if(msgStatus!="SUCCESS"){          
       
    return false;
     }
     gAction=g_prev_gAction; 
     var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
     setDataXML(getXMLString(pureXMLDOM));
     showData(dbStrRootTableName, 1);
     fnEnableElement(document.getElementById("cmdDelRow_BLK_DSHDET"));
	   setTimeout( function(){ //REDWOOD_35887744 
     enableForm();
	   },10); //REDWOOD_35887744 
return true;
}
//9NT1501 :: FC UBS 12.0.0 : itr2 changes ends


function fnPostNew_KERNEL(){
    
    
    /* FCUBS 12.0.2 Screensaver Changes Starts */
       // if (mainWin.scrSaverReq == "Y") 
     //   {
       //     document.getElementById("BLK_USR__SCREENSAVERTIMEOUTI").value = mainWin.scrTimeout ;
        
        /*document.getElementById("BLK_USR__SCREENSAVERTIMEOUTI").className="hidden"; 
            getPreviousSibling(document.getElementById("BLK_USR__SCREENSAVERTIMEOUTI")).className ="LBLinv";
            document.getElementById("BLK_USR__SCREENSAVERTIMEOUTI").parentNode.parentNode.className ="LBLinv";
            document.getElementById("BLK_USR__SCREENSAVERTIMEOUTI").parentNode.parentNode.style.display = "none";
        }
        
        /*else 
        {
        document.getElementById("BLK_USR__SCREENSAVERTIMEOUTI").value = mainWin.scrTimeout ;
        
        if (document.getElementById("BLK_USR__SCREENSAVERTIMEOUTI").parentNode.parentNode.style.display == "none")
            {
            document.getElementById("BLK_USR__SCREENSAVERTIMEOUTI").parentNode.parentNode.style.display = "block"; 
            } */
        //}
        
    /* FCUBS 12.0.2 Screensaver Changes Ends*/  
    
    /* Code Fix for Bug No: 17070676 Starts */  
     //alert(mainWin.extPwd);
   /*  if (mainWin.extPwd == "Y")
     {
        document.getElementById("BLK_USR__USRPWD").value = 'PASSWORD';
        fnDisableElement(document.getElementById("BLK_USR__USRPWD"));
        
     }
     else
     {
        fnEnableElement(document.getElementById("BLK_USR__USRPWD"));
     }
    */
     /*Code Fix for Bug No: 17070676 Ends*/
    
  //  document.getElementById("BLK_USR__STRTDATE").value = mainWin.AppDate; //1203_20021393 commented
  //  document.getElementById("BLK_USR__STRTDATEI").value = mainWin.AppDate;  //1203_20021393
    document.getElementById("BLK_USR__HOMEBRN").value = mainWin.CurrentBranch;
    document.getElementById("BLK_USR__USRLANG").value = mainWin.LangCode;
  /*  if (mainWin.extPwd == "N") {                    //Code Fix for Bug No: 17070676 Starts                          
    document.getElementById("BLK_USR__USRPWD").value = 'PASSWORD';
    }       */                                        //Code Fix for Bug No: 17070676 Ends
  //  document.getElementById("BLK_USR__TIMELEVELI").value = 9;
   // document.getElementById("BLK_USR__NO_CUMULATIVE_LOGINS").value = 0;//Code Fix for OSDC Bug No: 17600654
   // document.getElementById("BLK_USR__NO_SUCCESSIVE_LOGINS").value = 0;//Code Fix for OSDC Bug No: 17600654
   // if (mainWin.extPwd == "N") {                    //Code Fix for Bug No: 17070676 Starts      
   // document.getElementById("BLK_USR__FORCPWDCHG").checked = true;
   // fnDisableElement(document.getElementById("BLK_USR__FORCPWDCHG"));
    //}                                               //Code Fix for Bug No: 17070676 Ends    
    //fnDisableElement(document.getElementById("BLK_USR__CUSTNO"));//1201_INGNDBL_17003021
    
        
    
        /*FCUBS10.5.2 Password Encryption For SMDUSRDF */
      /*  if (mainWin.extPwd == "N") {                    //Code Fix for Bug No: 17070676 Starts
        if(typeof(autoGenPassReq) !="undefined" && autoGenPassReq=="Y"){
            fnDisableElement(document.getElementById("BLK_USR__USRPWD"));
        }
        }     */      //Code Fix for Bug No: 17070676 Ends
      //  fnDisableElement(document.getElementById("BLK_USR__MFAID"));//9NT1606_FCUBS_12.1.0.0.0 MFA Changes
        return true;
}

function fnPreUnlock_KERNEL(){
    
    /* Code Fix for Bug No: 17070676 Starts*/
     //alert(mainWin.extPwd);
  /*   if (mainWin.extPwd == "N")
     {
        fnEnableElement(document.getElementById("BLK_USR__USRPWD"));
        g_previousPassword = document.getElementById("BLK_USR__USRPWD").value.toUpperCase();
        
     }
    /* Code Fix for Bug No: 17070676 Ends*/
    
    
    return true;
}
function fnPostUnlock_KERNEL(){

    //9NT1606_FCUBS_12.1.0.0.0 MFA Changes begins
/*if (document.getElementById("BLK_USR__MFAENABLED").value == 'N')
    {
                fnDisableElement(document.getElementById("BLK_USR__MFAID"));
                document.getElementById('BLK_USR__MFAID').value = '';
    }
if (document.getElementById("BLK_USR__MFAENABLED").value == 'L')
    {
                fnDisableElement(document.getElementById("BLK_USR__MFAID"));
    }
   //9NT1606_FCUBS_12.1.0.0.0 MFA Changes ends

        
    /* Code Fix for Bug No: 17070676 Starts*/
     //alert(mainWin.extPwd);
    /* if (mainWin.extPwd == "Y")
     {
        //document.getElementById("BLK_USR__USRPWD").value = 'PASSWORD' ;
        fnDisableElement(document.getElementById("BLK_USR__USRPWD"));
        
     }
     
    /* Code Fix for Bug No: 17070676 Ends*/
    
        
      /* FCUBS10.5.2 Password Encryption For SMDUSRDF */
      /*  if (mainWin.extPwd == "N") {                    //Code Fix for Bug No: 17070676 Starts
        if(typeof(autoGenPassReq) !="undefined" && autoGenPassReq=="Y"){
            fnDisableElement(document.getElementById("BLK_USR__USRPWD"));
        }
    if (document.getElementById("BLK_USR__FORCPWDCHG").checked)
        fnDisableElement(document.getElementById("BLK_USR__FORCPWDCHG"));
        }   */                                        //Code Fix for Bug No: 17070676 Ends
    return true;
}
//9NT1501 :: FC UBS 12.0.0 : itr2 changes starts
function fnPostLoad_CVS_DSHBD_KERNEL(){
if(gAction==''){
document.getElementById("BLK_DSHMST__BTN_POPULATE").style.visibility="hidden";
}else{
fnEnableElement(document.getElementById("BLK_DSHMST__BTN_POPULATE"));
}
document.getElementById("cmdAddRow_BLK_DSHDET").disabled=true;
document.getElementById("cmdAddRow_BLK_DSHDET").style.visibility="hidden";
return true;
}

//9NT1501 :: FC UBS 12.0.0 : itr2 changes ends

function fnPostCopy_KERNEL(){
    /* Code Fix for Bug No: 17070676 Starts*/
     //alert(mainWin.extPwd);
    /* if (mainWin.extPwd == "Y")
     {
        document.getElementById("BLK_USR__USRPWD").value = 'PASSWORD';
        fnDisableElement(document.getElementById("BLK_USR__USRPWD"));
     }
     /* Code Fix for Bug No: 17070676 Ends*/
    
   // document.getElementById("BLK_USR__NO_CUMULATIVE_LOGINS").value = 0; //Code Fix for OSDC Bug No: 17600654
   // document.getElementById("BLK_USR__NO_SUCCESSIVE_LOGINS").value = 0; //Code Fix for OSDC Bug No: 17600654
   // document.getElementById("BLK_USR__STRTDATE").value = mainWin.AppDate;  //9NT1606_INTERNAL_17895362
    //if (mainWin.extPwd == "N") {                    //Code Fix for Bug No: 17070676 Starts                          
    //document.getElementById("BLK_USR__USRPWD").value = 'PASSWORD';//9NT1606_IPKRASK_18286495_1203_18356333 commented
  //  document.getElementById("BLK_USR__USRPWD").value = "";  // 9NT1606_IPKRASK_18286495_1203_18356333 added
    //document.getElementById("BLK_USR__STATCHNGDON").value= "";
  //  document.getElementById("BLK_USR__PWDCHNGDON").value= "";
 //   document.getElementById("BLK_USR__LASTSIGNDON").value= "";
    //document.getElementsByName("TXTSTATUSCHGON")[0].value= "";
   // document.getElementsByName("TXTPWDCHGON")[0].value= "";
  //  document.getElementsByName("TXTLASTSGNDON")[0].value= "";
 //   fnEnableElement(document.getElementById("BLK_USR__USRPWD")); 
  //  document.getElementById("BLK_USR__FORCPWDCHG").checked = true;    
  //  fnDisableElement(document.getElementById("BLK_USR__FORCPWDCHG")); 
                                                  //Code Fix for Bug No: 17070676 Ends
    
    
    /*FCUBS10.5.2 Password Encryption For SMDUSRDF */
   /* if (mainWin.extPwd == "N") {
    if(typeof(autoGenPassReq) !="undefined" && autoGenPassReq=="Y"){
    fnDisableElement(document.getElementById("BLK_USR__USRPWD"));
    }   */ 
    //}
    
    //9NT1606_FCUBS_12.1.0.0.0 MFA Changes begins
//if (document.getElementById("BLK_USR__MFAENABLED").value == 'N')
//    {
//                fnDisableElement(document.getElementById("BLK_USR__MFAID"));
//                document.getElementById('BLK_USR__MFAID').value = '';
//    }
//if (document.getElementById("BLK_USR__MFAENABLED").value == 'L')
//
//    {
//
//                fnDisableElement(document.getElementById("BLK_USR__MFAID"));
//    }
    //9NT1606_FCUBS_12.1.0.0.0 MFA Changes ends
    
    
    return true;
}
//9NT1501 :: FC UBS 12.0.0 : itr2 sfr#14042566 changes starts
function fnPreSave_CVS_DSHBD_KERNEL(){
if (!fnValidateMandatory()) {
mask();
showAlerts(fnBuildAlertXML(gErrCodes.substring(0, gErrCodes.length - 1), 'I', '', replaceStr.substring(0, replaceStr.length - 1)), 'I');
alertAction = "UNMASK";
gErrCodes = "";
replaceStr = "";
return false;
} 
return true;
}
// 9NT1501 :: FC UBS 12.0.0 : itr2 sfr#14042566 changes ends

function fnPreSave_KERNEL(){
    var isValid = true;
   /* if(typeof(autoGenPassReq) !="undefined" && autoGenPassReq=="Y"){
        if(document.getElementById("BLK_USR__USERMAIL").value == ""){
            alert(mainWin.getItemDesc("LBL_EMAIL_REQ"));
            return false;
        }        
    }
    /* Code Fix for Bug No: 17070676 Starts- LDAP Disable password validation on pwd_ext being Y*/
  /*  if (mainWin.extPwd == "N")
    {
        if (!fnValidatePassword()) {
        return false;
        }
        
    if(typeof(autoGenPassReq) !="undefined" && autoGenPassReq=="N"){
            if(document.getElementById("BLK_USR__USRPWD").value == ""){
            alert(mainWin.getItemDesc("LBL_PASSWD_REQ"));
            return false;
            }
        }   
    }   
    /* Code Fix for Bug No: 17070676 Ends*/
        //9NT1606_12_4_RETRO_12_2_26861794
        if (msgrights =='N'){
	var removeNode = selectNodes(dbDataDOM, getXPathQuery("BLK_MSGSRIGHTS"));  
     for (var i = 0; i < removeNode.length; i++) {
	removeNode[i].parentNode.removeChild(removeNode[i]);
                 }
             }  
//9NT1606_12_4_RETRO_12_2_26861794
     if(!fnValidateUserID()){
        return false;
    }

    /* if(mainWin.SSO_REQ !='Y') /* 9NT1606_INTERNAL_17886078 starts. This will never be used coz of SSO
        {
            if(typeof(autoGenPassReq) !="undefined" && autoGenPassReq=="N")
            {
                if(document.getElementById("BLK_USR__USRPWD").value == "")
                {
                    alert(mainWin.getItemDesc("LBL_PASSWD_REQ"));
                    return false;
                }
            }
        }                    // 9NT1606_INTERNAL_17886078 ends.
       */
    return isValid;
}

function fnPreSave_Child_KERNEL(){
    var isValid = true;   
    if (!isValid)    {
        var msg = buildMessage(gErrCodes);
        alertMessage(msg);
        return false;
    }
    return isValid;
}

function fnPostSave_KERNEL()
{
   // if(gAction=='NEW')
     //   document.getElementById("BLK_USR__USRPWD").value=g_actualPassword;
    return true;
}

function fnValidateLDAPUser() {
   /* var l_user_id = document.getElementById("BLK_USR__USRID").value;
    var l_ldap_user = document.getElementById("BLK_USR__LDAPUSR").value;    
    if (l_user_id == '') {   
        showErrorAlerts('IN-HEAR-395');
        return false;
    }    
    if (l_ldap_user == '') {    ;
        showErrorAlerts('IN-HEAR-396');
        return false;
    }   
    
    var g_prev_gAction = gAction;
    appendData(document.getElementById("TBLPage" + strCurrentTabId));    
    if (gAction == "NEW" || gAction == "MODIFY") {
        if (selectNodes(dbDataDOM,"//UDTBS_FUNC_UDF_UPLOAD_DETAIL").length == 0) {
            gAction = "DEFAULT";
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
    document.getElementById("BLK_USR__LDAPUSR").focus();*/
    return true;
}

/*function fnValidatePassword() {
    var l_givenPassword = document.getElementById("BLK_USR__USRPWD").value.toUpperCase();
        if (gAction == 'MODIFY' && g_previousPassword == l_givenPassword) {     
        return true;
    }
    g_actualPassword = l_givenPassword; 
    appendData(document.getElementById("TBLPage" + strCurrentTabId));
    return true;
}*/

/*
function isPasswordRestricted() {
    var l_prevAction = gAction;
    appendData(document.getElementById("TBLPage" + strCurrentTabId));
    if (selectNodes(dbDataDOM,"//UDTBS_FUNC_UDF_UPLOAD_DETAIL").length == 0) {
            gAction = "CUSTOM";
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
            }
            if (!fnProcessResponse())            {
                gAction = l_prevAction;
                return false;
            }       
    }
    gAction = l_prevAction;
    return true;
}
*/


/*function fnFormatPwdTimeStamp(source) {
    var objDtStamp = source;
    if(objDtStamp && objDtStamp.value) {
        var objDtStampValue = objDtStamp.value;
        var datePart = objDtStampValue.substring(0, 10);
        var timePart = objDtStampValue.substring(10);
        var mb3Date = new MB3Date(datePart, gDateFormatDSO);
        var formattedTS = mb3Date.getShortDate() + timePart;
        document.getElementsByName("TXTPWDCHGON")[0].value = formattedTS;
    }
    return;
}
*/
/*
function fnFormatSignedTimeStamp(source) {
    var objDtStamp = source;
    if(objDtStamp && objDtStamp.value) {
        var objDtStampValue = objDtStamp.value;
        var datePart = objDtStampValue.substring(0, 10);
        var timePart = objDtStampValue.substring(10);
        var mb3Date = new MB3Date(datePart, gDateFormatDSO);
        var formattedTS = mb3Date.getShortDate() + timePart;
        document.getElementsByName("TXTLASTSGNDON")[0].value = formattedTS;
    }
    return;
}
*/
function fnPostLoad_CVS_GL_KERNEL() {
    document.getElementsByTagName("THEAD")[0].rows[0].cells[0].getElementsByTagName("INPUT")[0].disabled = true;
    showTabData();      
    return;
}
/*function  fn_Pwd_OnChange(){
    document.getElementById("BLK_USR__FORCPWDCHG").checked = true;
    fnDisableElement(document.getElementById("BLK_USR__FORCPWDCHG")); 
}*/

/*function fnPreLoad_CVS_USERHOLIDAY_KERNEL() {
    var winParams = new Object();
    winParams.mainWin = parent.window;
    var funcid = '';
    screenArgs = new Array();
    screenArgs['SCREEN_NAME'] = 'SUMMARY';
    screenArgs['DESCRIPTION'] = 'User Holiday Summary'; 
    screenArgs['FUNCTION_ID'] = 'SMSUSHOL';
    funcid = 'SMSUSHOL'; 
    screenArgs['DESCRIPTION'] = 'User Holiday Summary';
    screenArgs['LANG'] = mainWin.LangCode;
    screenArgs['UI_XML'] = 'SUMMARY';
    screenArgs['PARENT_FUNC_ID'] = 'SMDUSRDF';
    var user_id = document.getElementById("BLK_USR__USRID").value;
    screenArgs['USER_ID'] = user_id;
    parent.screenArgs = screenArgs;
}*/

function fnPostLoad_CVS_MAIN_VIEWLOG() {
    var codes = new Array();
    createDOM(dbStrRootTableName);
    codes = parent.screenArgs['KEY'].split("|");
    if (codes.length > 0){
        document.getElementsByName("USRID")[0].value = codes[0];
    }
    document.getElementsByName("MODNO")[0].value = parent.screenArgs['MOD_NO'];
    gAction = 'VIEWMNTLOG';
    functionId = 'SMDUSRDF' ;
    var relationArray = new Array();            
    relationArray['BLK_USR'] = ""; 
   // relationArray['BLK_RESTR_PWD'] = "BLK_USR~N"; 
    relationArray['BLK_MSGSRIGHTS'] = "BLK_USR~1"; 
    relationArray['BLK_USERTILLS'] = "BLK_USR~N"; 
    relationArray['BLK_USERACCCLASS'] = "BLK_USR~N"; 
    relationArray['BLK_USERGLREST'] = "BLK_USR~N"; 
    relationArray['BLK_USERLIMITSROLE'] = "BLK_USR~N"; 
    relationArray['BLK_USERBRANCHES'] = "BLK_USR~N"; 
    relationArray['BLK_USERPRODUCTS'] = "BLK_USR~N"; 
    relationArray['BLK_USERACCESSPRODUCTS'] = "BLK_USR~N"; 
    relationArray['BLK_USERFUNCDISALLOW'] = "BLK_USR~N"; 
    relationArray['BLK_USERROLE'] = "BLK_USR~N"; 
    relationArray['BLK_USERSFUNCTIONS'] = "BLK_USR~N"; 
    relationArray['BLK_QUEUERIGHTS'] = "BLK_MSGSRIGHTS~N"; 
    relationArray['BLK_USERGLEXCEPT'] = "BLK_USERGLREST~N"; 

    var dataSrcLocationArray = new Array();     
    dataSrcLocationArray[0] = "BLK_USR"; 
    //dataSrcLocationArray[1] = "BLK_RESTR_PWD"; 
    dataSrcLocationArray[2] = "BLK_MSGSRIGHTS"; 
    dataSrcLocationArray[3] = "BLK_USERTILLS"; 
    dataSrcLocationArray[4] = "BLK_USERACCCLASS"; 
    dataSrcLocationArray[5] = "BLK_USERGLREST"; 
    dataSrcLocationArray[6] = "BLK_USERLIMITSROLE"; 
    dataSrcLocationArray[7] = "BLK_USERBRANCHES"; 
    dataSrcLocationArray[8] = "BLK_USERPRODUCTS"; 
    dataSrcLocationArray[9] = "BLK_USERACCESSPRODUCTS"; 
    dataSrcLocationArray[10] = "BLK_USERFUNCDISALLOW"; 
    dataSrcLocationArray[11] = "BLK_USERROLE"; 
    dataSrcLocationArray[12] = "BLK_USERSFUNCTIONS"; 
    dataSrcLocationArray[13] = "BLK_QUEUERIGHTS"; 
    dataSrcLocationArray[14] = "BLK_USERGLEXCEPT"; 

    appendTextFieldValue(document.getElementsByName('USRID')[0], 1, 'BLK_USR'); 
    appendTextFieldValue(document.getElementsByName('MODNO')[0], 1, 'BLK_USR'); 
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
    if(fcjResponseDOM){
        var msgStatus   =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
        if (msgStatus == 'FAILURE') {
            var messageNode = selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
            var returnVal = displayResponse(messageNode);
        }
        if(msgStatus == 'SUCCESS') {
            var authResDom = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
            setDataXML(getXMLString(authResDom));
            mainWin.Authdom = null;
            resetIndex();
            //showTabData_Viewchg();
            viewMnt = true;
            showData();
            gAction = "";
        }
    disableForm();
    }
}

/*function fnvalidateMail(event){
    var str = event.srcElement.value;
    var at="@";
    var dot=".";
    var lat=str.indexOf(at);
    var lstr=str.length;
    var ldot=str.indexOf(dot);   
    if(str == ""){
        return;
    }
    
    if (str.indexOf(at)==-1 || str.indexOf(at)==0 || str.indexOf(at)==lstr){
       alert(mainWin.getItemDesc("LBL_INVALID_EMAIL"));
       event.srcElement.value ="";
       event.srcElement.focus();
       return false;
    }

    if (str.indexOf(dot)==-1 || str.indexOf(dot)==0 || str.indexOf(dot)==lstr){
        alert(mainWin.getItemDesc("LBL_INVALID_EMAIL"));
        event.srcElement.value ="";
        event.srcElement.focus();
        return false;
    }

     if (str.indexOf(at,(lat+1))!=-1){
        alert(mainWin.getItemDesc("LBL_INVALID_EMAIL"));
        event.srcElement.value ="";
        event.srcElement.focus();
        return false;
     }

     if (str.substring(lat-1,lat)==dot || str.substring(lat+1,lat+2)==dot){
        alert(mainWin.getItemDesc("LBL_INVALID_EMAIL"));
        event.srcElement.value ="";
        event.srcElement.focus();
        return false;
     }

     if (str.indexOf(dot,(lat+2))==-1){
        alert(mainWin.getItemDesc("LBL_INVALID_EMAIL"));
        event.srcElement.value ="";
        event.srcElement.focus();
        return false;
     }
    
     if (str.indexOf(" ")!=-1){
        alert(mainWin.getItemDesc("LBL_INVALID_EMAIL"));
        event.srcElement.value ="";
        event.srcElement.focus();
        return false;
     }
     return true;   
}
*/
function fnValidateUserID(event){
    var userId = document.getElementById("BLK_USR__USRID").value;
    document.getElementById("BLK_USR__USRID").value = userId.toUpperCase();
    var userId_length = document.getElementById("BLK_USR__USRID").value.length;
    //FCUBS_12.0.1-Removing USERID length validation starts
    /*if(userId != ""){
        if(userId_length<6 || userId_length>12){
            alert(mainWin.getItemDesc("LBL_USERID_LENGTH"));
            return false;
        }
    }*/
    //FCUBS_12.0.1-Removing USERID length validation ends
    //var invalidChar = "~!#$%^&()+=[]\\\';,./{}|\":<>?"; 
	var invalidChar = "~!#$%^&()+=[]\\\';,/{}|\":<>?";  //Common_Entity_Length_Changes
    for (var i = 0; i < userId_length; i++) {
    if (invalidChar.indexOf(userId.charAt(i)) != -1) {
            alert(mainWin.getItemDesc("LBL_USERID_INV"));
            return false;
            }
    }
    return true;
}

function fnOnchange()
{
/*
 var l_length = getTableObjForBlock("BLK_DSHDET").tBodies[0].rows.length;
 for(var i=0;i<l_length;i++)
 {
 fnDeleteRowForMultipleEntry("BLK_DSHDET");
 }
 */
return true;
}

//  9NT1501 :: FC UBS 12.0.0 : itr2 changes starts
/*function fnPostAddRow_BLK_DSHDET_KERNEL(){
 if (document.getElementsByName("ROLFN")[0].checked==false)
{
 var l_length = getTableObjForBlock("BLK_DSHDET").tBodies[0].rows.length;
 for(var i=0;i<l_length;i++)
 {
 
fnDisableElement(document.getElementsByName("BTN_CLAUSE")[i]);
 }

}
return true;
}*/

//  9NT1501 :: FC UBS 12.0.0 : itr2 changes ends


function fnLoadClause(event)
{
/*
if (document.getElementsByName("ROLFN")[0].checked==true)// 9NT1501 :: FC UBS 12.0.0 : itr2 changes
{*/
fnMulipleEntryRow_onClick(event);
fnSubScreenMain('SMDUSRDF', 'SMDUSRDF', 'CVS_CLAUSE', false);
/*}*/
return true;
}


function fnClearField(event){

document.getElementById("BLK_WHERE_MASTER__COLUMN_NAME").value="";
return true;
}   

function fnAddClasue(event)
{


document.getElementById("BLK_WHERE_MASTER__WHERE_CL").value=document.getElementById("BLK_WHERE_MASTER__WHERE_CL").value+" "+document.getElementById("BLK_WHERE_MASTER__COLUMN_NAME").value+" "+document.getElementById("BLK_WHERE_MASTER__CONT").value;

return true;
}


//9NT1606_FCUBS_12.1.0.0.0 MFA Changes begins
function fn_enable_mfa()
{

/*if (document.getElementById("BLK_USR__MFAENABLED").value == 'Y')
{
         fnEnableElement(document.getElementById("BLK_USR__MFAID"));
}
if (document.getElementById("BLK_USR__MFAENABLED").value == 'N')
    {
                fnDisableElement(document.getElementById("BLK_USR__MFAID"));
                document.getElementById('BLK_USR__MFAID').value = '';
    }
if (document.getElementById("BLK_USR__MFAENABLED").value == 'L')
    {
                fnDisableElement(document.getElementById("BLK_USR__MFAID"));
    }*/
            return true;
    }
//9NT1606_FCUBS_12.1.0.0.0 MFA Changes ends


function fnPreSave_CVS_CLAUSE_KERNEL(screenArgs)
{
parent.screenArgs['DBWHERECLAUSE'] = document.getElementById("BLK_WHERE_MASTER__WHERE_CL").value;
return true;
}
function fnPostLoad_CVS_CLAUSE_KERNEL(screenArgs)
{
fnEnableElement(document.getElementById("BLK_WHERE_MASTER__WHERE_CL"));
fnEnableElement(document.getElementById("BLK_WHERE_MASTER__CONT"));
fnEnableElement(document.getElementById("BLK_WHERE_MASTER__COLUMN_NAME"));
fnEnableElement(document.getElementById("BLK_WHERE_MASTER__BTN_ADD"));
return true;
}

function fnPostClose_CVS_CLAUSE_KERNEL(){
//9NT1501 :: FC UBS 12.0.0 : itr1 sfr#13930531 starts
 try{
  var l_tableObj =document.getElementById("BLK_DSHDET");
  var totalRows = l_tableObj.tBodies[0].rows.length;
  for (var j = 0; j < l_tableObj.tBodies[0].rows.length; j++) {
  
            if (l_tableObj.tBodies[0].rows[j].cells[0].getElementsByTagName("INPUT")[0].checked == true) {
                document.getElementsByName("DBWHERECLAUSE")[j].value=screenArgs['DBWHERECLAUSE'];
}
}
  }catch(e){
  };
//document.getElementById("BLK_DSHDET__DBWHERECLAUSE").value = screenArgs['DBWHERECLAUSE'] ;
//9NT1501 :: FC UBS 12.0.0 : itr1 sfr#13930531 ends
    return true;
}
//9NT1606_12_4_RETRO_12_2_26861794 starts

function fnPostLoad_CVS_RIGHTS_KERNEL() {
 parent.msgrights = "Y";
return true;
}
//9NT1606_12_4_RETRO_12_2_26861794 ends
