/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product
** Copyright ? 2008 - 2011  Oracle and/or its affiliates.  All rights reserved.
** 												
** No part of this work may be reproduced, stored in a retrieval system,
** adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise,
** translated in any language or computer language,
** without the prior written permission of Oracle and/or its affiliates.
**
**
** Oracle Financial Services Software Limited.
** Oracle Park, Off Western Express Highway,
** Goregaon (East),
** Mumbai - 400 063, India.
------------------------------------------------------------------------------------------
*/
/*
**  
**  Written by         : 
**  Date of creation   : 
**  File Name          : SSDUSRDF_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 
**
**  Last Modified By   :  Arpita Gupta
**  Last modified on   :  30th may 2017
**  Search String      :  ALPHA SUPPORTING SERVICES S.A._26146836
**  Reason             :  Changes done so that password validation will happen only when LDAP is not enabled
**
**  Last Modified By   :  Yogendra Moganti
**  Last modified on   :  20-July-2017
**  Search String      :  Bug_26438443
**  Reason             :  Bug 26438443 - SSDUSRDF- START DATE DEFAULTED IN WRONG DATE FORMAT USER CREATION SCREEN 
**
**  Last Modified By   :  Arpita Gupta
**  Last modified on   :  25 July 2017
**  Search String      :  ALPHA SUPPORTING SERVICES S.A._26516496 
**  Reason             :  Changes done so that on copy invalid details will not get copied

**  Last Modified By   :  Arunkumar R
**  Last modified on   :  27 July 2018
**  Search String      :  Fix for 28250842
**  Reason             :  Changes done to correct the password object id to disable the password field on LDAP Authenication

**  Last Modified By   :  Gopikannan
**  Last modified on   :  01 March 2021
**  Search String      :  Bug#31223767 
**  Reason             :  Bug 31223767 - SSDUSRDF:ALLOWING TO CREATE THE USER WITH SPACE

** Modified  By         : Manoj
** Modified  On         : 07-Apr-2023
** Modified Reason      : Redwood Changes done 
** Search String        : Redwood_changes
***************************************************************************************************************************
*/

//------------------------------------------------------------------------------
// VARIABLE DECLARATIONS
//------------------------------------------------------------------------------
var fcjRequestDOM;
var fcjResponseDOM;
var l_entityId;
var l_entityDesc;
var g_previousPassword = ""; 
var isPasswordValid = true;
var g_actualPassword = "";
var gErrCodes = "";
var g_usrId;
//var coreFnSaveAll = fnSaveAll;
//var coreFnvalidate= fnValidate;
var autoGenPassReq = mainWin.autoGenPassReq;

function fnPostLoad_KERNEL(){
//    debugs("In fnPostLoad", "A");
 
if (mainWin.extPwd == "Y")
     {
        document.getElementById("BLK_USER__USER_PASSWORD").value = 'XXXXXXXX';//ALPHA SUPPORTING SERVICES S.A._26146836 uncommented
        fnDisableElement(document.getElementById("BLK_USER__USER_PASSWORD"));
        
     }
     else
     {
        fnEnableElement(document.getElementById("BLK_USER__USER_PASSWORD"));
     }
    
    /* Code Fix for Bug No: 17070676 Ends*/
        
        /* FCUBS 12.0.2 Screensaver Changes Starts*/
        if (mainWin.scrSaverReq == "N") 
        {
            /*document.getElementById("BLK_USR__SCREENSAVERTIMEOUTI").className="hidden"; 
            getPreviousSibling(document.getElementById("BLK_USR__SCREENSAVERTIMEOUTI")).className ="LBLinv";
            document.getElementById("BLK_USR__SCREENSAVERTIMEOUTI").parentNode.parentNode.className ="LBLinv";*/
           //\ document.getElementById("BLK_USER__SCREEN_SAVER_TIMEOUTI").parentNode.parentNode.style.display = "none"; 
        }
        /* Code Fix for Bug No: 16919786 Starts*/
        else if ( mainWin.scrSaverReq == "Y" && mainWin.scrSaverModifiableFlag=="N" ) 
        {
            //document.getElementById("BLK_USER__SCREEN_SAVER_TIMEOUTI").parentNode.parentNode.style.display = "none";//REDWOOD Changes 
			document.getElementById("BLK_USER__SCREEN_SAVER_TIMEOUT").parentNode.parentNode.style.display = "none";//REDWOOD Changes 
        }
        /* Code Fix for Bug No: 16919786 Ends*/ 
        else 
        {
            /*document.getElementById("BLK_USR__SCREENSAVERTIMEOUTI").value = mainWin.scrTimeout ;*/
			//REDWOOD Changes
         /*if (document.getElementById("BLK_USER__SCREEN_SAVER_TIMEOUTI").parentNode.parentNode.style.display == "none")
            {
            document.getElementById("BLK_USER__SCREEN_SAVER_TIMEOUTI").parentNode.parentNode.style.display = "block"; 
            }*/
			if (document.getElementById("BLK_USER__SCREEN_SAVER_TIMEOUT").parentNode.parentNode.style.display == "none"){
				document.getElementById("BLK_USER__SCREEN_SAVER_TIMEOUT").parentNode.parentNode.style.display = "block"; 
            }
			//REDWOOD Changes
        }
    /* FCUBS 12.0.2 Screensaver Changes Ends*/  
     
   /*FCUBS10.5.2 Password Encryption For SMDUSRDF */
    if(typeof(autoGenPassReq) !="undefined" && autoGenPassReq=="Y"){
        fnDisableElement(document.getElementById("BLK_USER__USER_PASSWORD"));
    }
    if (parent.screenArgs['PARENT_FUNC_ID'] == "STDBRREF") {
        fnPostLoad_CVS_MAIN_VIEWLOG();
    }    
    
     return true;
}

function fnPostNew_KERNEL(){

//REDWOOD Changes
//fnDisableElement(document.getElementById("BLK_USERLOG_DETAILS__NO_CUMULATIVE_LOGINSI"))
//fnDisableElement(document.getElementById("BLK_USERLOG_DETAILS__NO_SUCCESSIVE_LOGINSI"))
fnDisableElement(document.getElementById("BLK_USERLOG_DETAILS__NO_CUMULATIVE_LOGINS"))
fnDisableElement(document.getElementById("BLK_USERLOG_DETAILS__NO_SUCCESSIVE_LOGINS"))
//REDWOOD Changes
fnDisableElement(document.getElementById("BLK_USERLOG_DETAILS__LAST_SIGNED_ON"))
    
document.getElementById("BLK_USER__START_DATE").value = mainWin.AppDate; //1203_20021393 commented
fireHTMLEvent(document.getElementById("BLK_USER__START_DATE"), "onpropertychange"); //Bug_26438443
//document.getElementById("BLK_USER__START_DATEI").value = mainWin.AppDate; //Bug_26438443  commented
    
if (mainWin.extPwd == "Y")
    /* FCUBS 12.0.2 Screensaver Changes Starts */
        if (mainWin.scrSaverReq == "Y") 
        {
            //document.getElementById("BLK_USER__SCREEN_SAVER_TIMEOUTI").value = mainWin.scrTimeout ;//REDWOOD Changes
			document.getElementById("BLK_USER__SCREEN_SAVER_TIMEOUT").value = mainWin.scrTimeout ;//REDWOOD Changes
        }
        
    /* FCUBS 12.0.2 Screensaver Changes Ends*/  
    
    /* Code Fix for Bug No: 17070676 Starts */  
     //alert(mainWin.extPwd);
     if (mainWin.extPwd == "Y")
     {
        document.getElementById("BLK_USER__USER_PASSWORD").value = 'XXXXXXXX';//ALPHA SUPPORTING SERVICES S.A._26146836 uncommented
        fnDisableElement(document.getElementById("BLK_USER__USER_PASSWORD"));
        
     }
     else
     {
        fnEnableElement(document.getElementById("BLK_USER__USER_PASSWORD"));
     }
    
     /*Code Fix for Bug No: 17070676 Ends*/
    
   
    if (mainWin.extPwd == "N") {                    //Code Fix for Bug No: 17070676 Starts                          
    document.getElementById("BLK_USER__USER_PASSWORD").value = '';
    }                                               //Code Fix for Bug No: 17070676 Ends
   // document.getElementById("BLK_USR__TIMELEVEL").value = 9;
   //REDWOOD Changes Starts
   /*
    document.getElementById("BLK_USERLOG_DETAILS__NO_CUMULATIVE_LOGINSI").value = 0;//Code Fix for OSDC Bug No: 17600654
    document.getElementById("BLK_USERLOG_DETAILS__NO_SUCCESSIVE_LOGINSI").value = 0;//Code Fix for OSDC Bug No: 17600654
	*/
	document.getElementById("BLK_USERLOG_DETAILS__NO_CUMULATIVE_LOGINS").value = 0;
    document.getElementById("BLK_USERLOG_DETAILS__NO_SUCCESSIVE_LOGINS").value = 0;
	//REDWOOD Changes Ends
    if (mainWin.extPwd == "N") {                    //Code Fix for Bug No: 17070676 Starts      
    //document.getElementById("BLK_USER__FORCE_PASSWD_CHANGE").checked = true;//REDWOOD Changes
		document.getElementById("BLK_USER__FORCE_PASSWD_CHANGE").value = "1";//REDWOOD Changes
    fnDisableElement(document.getElementById("BLK_USER__FORCE_PASSWD_CHANGE"));
    }                                               //Code Fix for Bug No: 17070676 Ends    
    //fnDisableElement(document.getElementById("BLK_USR__CUSTNO"));//1201_INGNDBL_17003021
    
        
    
        /*FCUBS10.5.2 Password Encryption For SSDUSRDF */
        if (mainWin.extPwd == "N") {                    //Code Fix for Bug No: 17070676 Starts
        if(typeof(autoGenPassReq) !="undefined" && autoGenPassReq=="Y"){
            fnDisableElement(document.getElementById("BLK_USER__USER_PASSWORD"));
        }
        }    
        
        //Code Fix for Bug No: 17070676 Ends
        fnDisableElement(document.getElementById("BLK_USER__MFA_ID"));//9NT1606_FCUBS_12.1.0.0.0 MFA Changes
        return true;
}
//
function fnPreUnlock_KERNEL(){
    
//REDWOOD Changes    
//fnDisableElement(document.getElementById("BLK_USERLOG_DETAILS__NO_CUMULATIVE_LOGINSI"))
//fnDisableElement(document.getElementById("BLK_USERLOG_DETAILS__NO_SUCCESSIVE_LOGINSI"))

fnDisableElement(document.getElementById("BLK_USERLOG_DETAILS__NO_CUMULATIVE_LOGINS"))
fnDisableElement(document.getElementById("BLK_USERLOG_DETAILS__NO_SUCCESSIVE_LOGINS"))
fnDisableElement(document.getElementById("BLK_USERLOG_DETAILS__LAST_SIGNED_ON"))
    /* Code Fix for Bug No: 17070676 Starts*/
     //alert(mainWin.extPwd);
     if (mainWin.extPwd == "N")
     {
        fnEnableElement(document.getElementById("BLK_USER__USER_PASSWORD"));
        g_previousPassword = document.getElementById("BLK_USER__USER_PASSWORD").value.toUpperCase();
        
     }
    /* Code Fix for Bug No: 17070676 Ends*/
    
    
    return true;
}

function fnPostUnlock_KERNEL(){


//     document.getElementById("BLK_USER__START_DATE").value = mainWin.AppDate; //1203_20021393 commented
//     document.getElementById("BLK_USER__START_DATEI").value = mainWin.AppDate;
    //9NT1606_FCUBS_12.1.0.0.0 MFA Changes begins
    fnEnableElement(document.getElementById("BLK_USER__MFA_ENBLD"));
      fnEnableElement(document.getElementById("BLK_USER__START_DATE"));
      fnEnableElement(document.getElementById("BLK_USER__END_DATE"));
if (document.getElementById("BLK_USER__MFA_ENBLD").value == 'N')
    {
                fnDisableElement(document.getElementById("BLK_USER__MFA_ID"));
                document.getElementById('BLK_USER__MFA_ID').value = '';
    }
if (document.getElementById("BLK_USER__MFA_ENBLD").value == 'L')
    {
                fnDisableElement(document.getElementById("BLK_USER__MFA_ID"));
    }
   //9NT1606_FCUBS_12.1.0.0.0 MFA Changes ends

        
    /* Code Fix for Bug No: 17070676 Starts*/
     //alert(mainWin.extPwd);
     if (mainWin.extPwd == "Y")
     {
        document.getElementById("BLK_USER__USER_PASSWORD").value = 'XXXXXXXX' ;//ALPHA SUPPORTING SERVICES S.A._26146836 uncommented,28250842
        fnDisableElement(document.getElementById("BLK_USER__USER_PASSWORD"));
        
     }
     
    /* Code Fix for Bug No: 17070676 Ends*/
    
        
      /* FCUBS10.5.2 Password Encryption For SSDUSRDF */
        if (mainWin.extPwd == "N") {                    //Code Fix for Bug No: 17070676 Starts
        if(typeof(autoGenPassReq) !="undefined" && autoGenPassReq=="Y"){
            fnDisableElement(document.getElementById("BLK_USER__USER_PASSWORD"));
        }
	//if (document.getElementById("BLK_USER__FORCE_PASSWD_CHANGE").checked)//REDWOOD Changes
	if (document.getElementById("BLK_USER__FORCE_PASSWD_CHANGE").value)//REDWOOD Changes
        fnDisableElement(document.getElementById("BLK_USER__FORCE_PASSWD_CHANGE"));
        }                                           //Code Fix for Bug No: 17070676 Ends
    return true;
}

function fnPostCopy_KERNEL(){
    /* Code Fix for Bug No: 17070676 Starts*/
     //alert(mainWin.extPwd);
     if (mainWin.extPwd == "Y")
     {
        document.getElementById("BLK_USER__USER_PASSWORD").value = 'XXXXXXXX';//ALPHA SUPPORTING SERVICES S.A._26146836 uncommented
        fnDisableElement(document.getElementById("BLK_USER__USER_PASSWORD"));
     }
     /* Code Fix for Bug No: 17070676 Ends*/
     
     document.getElementById("BLK_USER__START_DATE").value = mainWin.AppDate; //1203_20021393 commented
     //document.getElementById("BLK_USER__START_DATEI").value = mainWin.AppDate;//REDWOOD Changes
	 document.getElementById("BLK_USER__START_DATE").value = mainWin.AppDate;//REDWOOD Changes
    document.getElementById("BLK_USERLOG_DETAILS__LAST_SIGNED_ON").value = "";
	//REDWOOD Changes
    //document.getElementById("BLK_USERLOG_DETAILS__NO_CUMULATIVE_LOGINSI").value = 0; //Code Fix for OSDC Bug No: 17600654
    //document.getElementById("BLK_USERLOG_DETAILS__NO_SUCCESSIVE_LOGINSI").value = 0; //Code Fix for OSDC Bug No: 17600654
	document.getElementById("BLK_USERLOG_DETAILS__NO_CUMULATIVE_LOGINS").value = 0; 
    document.getElementById("BLK_USERLOG_DETAILS__NO_SUCCESSIVE_LOGINS").value = 0; 
	//REDWOOD Changes
   // document.getElementById("BLK_USR__STRTDATE").value = mainWin.AppDate;  //9NT1606_INTERNAL_17895362
    if (mainWin.extPwd == "N") {                    //Code Fix for Bug No: 17070676 Starts                          
    //document.getElementById("BLK_USR__USRPWD").value = 'PASSWORD';//9NT1606_IPKRASK_18286495_1203_18356333 commented
    document.getElementById("BLK_USER__USER_PASSWORD").value = "";  // 9NT1606_IPKRASK_18286495_1203_18356333 added
    document.getElementById("BLK_USER__STATUS_CHANGED_ON").value= "";
    document.getElementById("BLK_USER__PWD_CHANGED_ON").value= "";
  //  document.getElementById("BLK_USERLOG_DETAILS__LAST_SIGNED_ON").value= "";
   // document.getElementsByName("TXTSTATUSCHGON")[0].value= "";
  //  document.getElementsByName("TXTPWDCHGON")[0].value= "";
//  document.getElementsByName("TXTLASTSGNDON")[0].value= "";
    fnEnableElement(document.getElementById("BLK_USER__USER_PASSWORD")); 
   //document.getElementById("BLK_USER__FORCE_PASSWD_CHANGE").checked = true;//REDWOOD Changes    
   document.getElementById("BLK_USER__FORCE_PASSWD_CHANGE").value = "1";//REDWOOD Changes
    fnDisableElement(document.getElementById("BLK_USER__FORCE_PASSWD_CHANGE")); 
    }                                               //Code Fix for Bug No: 17070676 Ends
    
    
    /*FCUBS10.5.2 Password Encryption For SSDUSRDF */
    if (mainWin.extPwd == "N") {
    if(typeof(autoGenPassReq) !="undefined" && autoGenPassReq=="Y"){
    fnDisableElement(document.getElementById("BLK_USER__USER_PASSWORD"));
    }    
    }
    
    //9NT1606_FCUBS_12.1.0.0.0 MFA Changes begins
    if(document.getElementById("BLK_USER__MFA_ENBLD")!=null){
if (document.getElementById("BLK_USER__MFA_ENBLD").value == 'N')
    {
                fnDisableElement(document.getElementById("BLK_USER__MFA_ID"));
                document.getElementById('BLK_USER__MFA_ID').value = '';
    }
if (document.getElementById("BLK_USER__MFA_ENBLD").value == 'L')

    {

                fnDisableElement(document.getElementById("BLK_USER__MFA_ID"));
    }
    //9NT1606_FCUBS_12.1.0.0.0 MFA Changes ends
    }
    
    return true;
}

function fnPreSave_KERNEL(){
    var isValid = true;
	
     if(gAction=='NEW' || gAction=='MODIFY'){
        //var tableObj = document.getElementById("BLK_USER_ENTITY").tBodies[0].rows;//REDWOOD Changes
		//var length=tableObj.length;//REDWOOD Changes
		var length=getOjTableRowsLength("BLK_USER_ENTITY");//REDWOOD Changes
        if(length==0){
             alert("Entity mandatory for user");
             return false;
        }
       // entities[i]=document.getElementById("BLK_USER_ENTITY").tBodies[0].rows[i].cells[1].getElementsByTagName("INPUT")[0].value;
	   //ALPHA SUPPORTING SERVICES S.A._26516496 starts
	   if(gAction=='NEW'){
	   	document.getElementById("BLK_USERLOG_DETAILS__NO_CUMULATIVE_LOGINS").value = 0;
    document.getElementById("BLK_USERLOG_DETAILS__NO_SUCCESSIVE_LOGINS").value = 0;
    }   
//ALPHA SUPPORTING SERVICES S.A._26516496 ends	
	 }
    if(typeof(autoGenPassReq) !="undefined" && autoGenPassReq=="Y"){
        if(document.getElementById("BLK_USER__USER_EMAIL").value == ""){
            alert(mainWin.getItemDesc("LBL_EMAIL_REQ"));
            return false;
        }        
    }
    /* Code Fix for Bug No: 17070676 Starts- LDAP Disable password validation on pwd_ext being Y*/
    if (mainWin.extPwd == "N")
    {
        if (!fnValidatePassword()) {
        return false;
        }
        
    if(typeof(autoGenPassReq) !="undefined" && autoGenPassReq=="N"){
		if(document.getElementById("BLK_USER__USER_PASSWORD").value == ""){
            alert(mainWin.getItemDesc("LBL_PASSWD_REQ"));
            return false;
               }
		   }   
    }   
    /* Code Fix for Bug No: 17070676 Ends*/
        
    if(!fnValidateUserID()){
        return false;
    }

     if(mainWin.SSO_REQ !='Y') /* 9NT1606_INTERNAL_17886078 starts. This will never be used coz of SSO*/
        {
            if(typeof(autoGenPassReq) !="undefined" && autoGenPassReq=="N")
            {
				if(document.getElementById("BLK_USER__USER_PASSWORD").value == "")
                {
                    alert(mainWin.getItemDesc("LBL_PASSWD_REQ"));
                    return false;
                }
			}
        }                    // 9NT1606_INTERNAL_17886078 ends.
       
    return isValid;
}
function fnvalidateMail(event){
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

function fnValidateUserID(event){
    var userId = document.getElementById("BLK_USER__USER_ID").value;
    document.getElementById("BLK_USER__USER_ID").value = userId.toUpperCase();
    var userId_length = document.getElementById("BLK_USER__USER_ID").value.length;
   
//    if(userId != ""){
//        if(userId_length<6 || userId_length>12){
//            alert(mainWin.getItemDesc("LBL_USERID_LENGTH"));
//            return false;
//        }
//    }
    
    //var invalidChar = "~!#$%^&()+=[]\\\';,./{}|\":<>?"; 
	var invalidChar = "~!#$%^&()+=[]\\\';,/{}|\":<>?";  //Common_Entity_Length_Changes
    for (var i = 0; i < userId_length; i++) {
    if (invalidChar.indexOf(userId.charAt(i)) != -1) {
            alert(mainWin.getItemDesc("LBL_USERID_INV"));
            return false;
            }
    }
	
    //Bug#31223767 Starts
    var regexToCheckSpace = /\s/;
    if(regexToCheckSpace.test(userId))
    {	  
      alert(mainWin.getItemDesc("LBL_USERID_INV"));
      return false;
    }
    //Bug#31223767 Ends	
    return true;
}
function fnPostSave_KERNEL()
{
    var action=gAction;
    if(action=='NEW')
        document.getElementById("BLK_USER__USER_PASSWORD").value=g_actualPassword;
	   return true;
}

function  fn_Pwd_OnChange(){
    //document.getElementById("BLK_USER__FORCE_PASSWD_CHANGE").checked = true;//REDWOOD Changes
	document.getElementById("BLK_USER__FORCE_PASSWD_CHANGE").value = "1";//REDWOOD Changes
    fnDisableElement(document.getElementById("BLK_USER__FORCE_PASSWD_CHANGE")); 
}
//
function fnValidateLDAPUser() {
    var l_user_id = document.getElementById("BLK_USER__USER_ID").value;
    var l_ldap_user = document.getElementById("BLK_USER__LDAP_USER").value;    
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
    document.getElementById("BLK_USER__LDAP_USER").focus();
    return true;
}

function fnValidatePassword() {
    var l_givenPassword = document.getElementById("BLK_USER__USER_PASSWORD").value.toUpperCase();
        if (gAction == 'MODIFY' && g_previousPassword == l_givenPassword) {     
        return true;
    }
    g_actualPassword = l_givenPassword; 
    appendData(document.getElementById("TBLPage" + strCurrentTabId));
    return true;
}

//function isPasswordRestricted() {
//    var l_prevAction = gAction;
//    appendData(document.getElementById("TBLPage" + strCurrentTabId));
//  /*  if (selectNodes(dbDataDOM,"//UDTBS_FUNC_UDF_UPLOAD_DETAIL").length == 0) {
//            gAction = "CUSTOM";
//            fcjRequestDOM = buildUBSXml();
//            fcjResponseDOM = fnPost(fcjRequestDOM, servletURL, functionId);
//            if (fcjResponseDOM) {
//                var msgStatus =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
//                if (msgStatus == 'FAILURE') {
//                    var messageNode = selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
//                }else if (msgStatus == "WARNING" || msgStatus == "SUCCESS" ) {
//                    var messageNode = selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
//                }
//                var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
//                setDataXML(getXMLString(pureXMLDOM));
//                showData(dbStrRootTableName, 1);
//            }
//            if (!fnProcessResponse())            {
//                gAction = l_prevAction;
//                return false;
//            }       
//    }*/
//    gAction = l_prevAction;
//    return true;
//}



//function fnFormatPwdTimeStamp(source) {
//    // var objDtStamp=document.getElementById("BLK_USER__PWD_CHANGED_ON").value;
//   var objDtStamp = source;
//    if(objDtStamp && objDtStamp.value) {
//        var objDtStampValue = objDtStamp.value;
//        var datePart = objDtStampValue.substring(0, 10);
//        var timePart = objDtStampValue.substring(10);
//        var mb3Date = new MB3Date(datePart, gDateFormatDSO);
//        var formattedTS = mb3Date.getShortDate() + timePart;
//        document.getElementsByName("TXTPWDCHGON")[0].value = formattedTS;
//    }
//    return;
//}

//function fnFormatStatusTimeStamp(source) {
//    var objDtStamp = source;
//    if(objDtStamp && objDtStamp.value) {
//        var objDtStampValue = objDtStamp.value;
//        var datePart = objDtStampValue.substring(0, 10);
//        var timePart = objDtStampValue.substring(10);
//        var mb3Date = new MB3Date(datePart, gDateFormatDSO);
//        var formattedTS = mb3Date.getShortDate() + timePart;
//        document.getElementsByName("TXTSTATUSCHGON")[0].value = formattedTS;
//    }
//    return;
//}

//function fnFormatSignedTimeStamp(source) {
//    var objDtStamp = source;
//    if(objDtStamp && objDtStamp.value) {
//        var objDtStampValue = objDtStamp.value;
//        var datePart = objDtStampValue.substring(0, 10);
//        var timePart = objDtStampValue.substring(10);
//        var mb3Date = new MB3Date(datePart, gDateFormatDSO);
//        var formattedTS = mb3Date.getShortDate() + timePart;
//        document.getElementsByName("LAST_SIGNED_ON")[0].value = formattedTS;
//    }
//    return;
//}
function fn_entityValueChange() {
    l_entityId = document.getElementById("BLK_USER__HOME_ENTITY").value;
   // l_desc=document.getElementById("BLK_USER_ENTITY__DESCR").value;
    l_userId=document.getElementById("BLK_USER__USER_ID").value;
    var action = gAction;
    //try {

        //var Obj = document.getElementById("BLK_USER_ENTITY").tBodies[0].rows;//REDWOOD Changes
		//if (Obj.length <= 0 && action == "NEW") {//REDWOOD Changes
		if (getOjTableRowsLength("BLK_USER_ENTITY") <= 0 && action == "NEW") {//REDWOOD Changes
            fnAddRow('BLK_USER_ENTITY');
        }
         //if (Obj.length <= 0 && action == "MODIFY") {//REDWOOD Changes
		 if (getOjTableRowsLength("BLK_USER_ENTITY") <= 0 && action == "MODIFY") {//REDWOOD Changes
            fnAddRow('BLK_USER_ENTITY');
        }
        
    setTimeout(function(){
        for (var i = 0;i < getOjTableRowsLength("BLK_USER_ENTITY");i++) {

            //if (l_entityId == document.getElementById("BLK_USER_ENTITY").tBodies[0].rows[i].cells[1].getElementsByTagName("INPUT")[0].value || l_entityId == "") { //Fix for 30404760 //REDWOOD Changes
			if (l_entityId == getTableObjForBlock("BLK_USER_ENTITY").tBodies[0].rows[i].cells[1].getElementsByTagName("oj-input-text")[0].value || l_entityId == "") { //Fix for 30404760 //REDWOOD Changes

                return;
            }
            else {
				//Fix for 30404760 Starts
				//var l = document.getElementsByName("ENTITY_ID").length;//REDWOOD Changes
				var l = getElementsByOjName("ENTITY_ID").length;//REDWOOD Changes
				var elem=getElementsByOjName("ENTITY_ID")[0];
				for(var a=0;a<l;a++){
					//if(document.getElementsByName("ENTITY_ID")[a].value == l_entityId)//REDWOOD Changes
					if(getElementsByOjName("ENTITY_ID")[a].value == l_entityId)//REDWOOD Changes
					{return;}
					else 
					{
						if(elem.length.max<l_entityId.length)
						{	elem.length.max=l_entityId.length;}
					}
				}
				//Fix for 30404760 Ends

                if (action == "MODIFY" && getOjTableRowsLength("BLK_USER_ENTITY")>1) {
                    fnAddRow('BLK_USER_ENTITY');
                }

                //document.getElementById("BLK_USER_ENTITY").tBodies[0].rows[i].cells[1].getElementsByTagName("INPUT")[0].value = l_entityId;//REDWOOD Changes
				getTableObjForBlock("BLK_USER_ENTITY").tBodies[0].rows[i].cells[1].getElementsByTagName("oj-input-text")[0].value = l_entityId;//REDWOOD Changes
               //  document.getElementById("BLK_USER_ENTITY").tBodies[0].rows[i].cells[2].getElementsByTagName("INPUT")[0].value = l_desc;
                //fnDisableElement(document.getElementById("BLK_USER_ENTITY").tBodies[0].rows[i].cells[1].getElementsByTagName("INPUT")[0]);//REDWOOD Changes
				fnDisableElement(getTableObjForBlock("BLK_USER_ENTITY").tBodies[0].rows[i].cells[1].getElementsByTagName("oj-input-text")[0]);//REDWOOD Changes
                 document.getElementById("BLK_USER_ENTITY__USER_ID").value=l_userId;
				
            }
        }
     },0);

    /*}
    catch (e) {

    };*/

    return true;
}

function fn_enable_mfa()
{

if (document.getElementById("BLK_USER__MFA_ENBLD").value == 'Y')
{
         fnEnableElement(document.getElementById("BLK_USER__MFA_ID"));
}
if (document.getElementById("BLK_USER__MFA_ENBLD").value == 'N')
    {
                fnDisableElement(document.getElementById("BLK_USER__MFA_ID"));
                document.getElementById('BLK_USER__MFAID').value = '';
    }
if (document.getElementById("BLK_USER__MFA_ENBLD").value == 'L')
    {
                fnDisableElement(document.getElementById("BLK_USER__MFAID"));
    }
            return true;
    }

//function fnPreSave_KERNEL()
//{
//   var entities=[];         
//   if(gAction=='NEW'){
//        var tableObj = document.getElementById("BLK_USER_ENTITY").tBodies[0].rows;
//        for (var i = 0;i < tableObj.length;i++) {
//        entities[i]=document.getElementById("BLK_USER_ENTITY").tBodies[0].rows[i].cells[1].getElementsByTagName("INPUT")[0].value;
//    }
//    
//    for(var j=0;j<tableObj.length;j++){
//        for(var k=i;k<tableObj.length;k++){
//            if(j!=k && entities[j]==entities[k]){
//            alert("Multiple entities for single user");
//                return false;
//            }
//        }
//    }
//    
//    return true;
//}
//}