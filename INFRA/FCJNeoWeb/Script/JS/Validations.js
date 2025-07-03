/*----------------------------------------------------------------------------------------------------
**
** File Name    : Validations.js
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

Copyright © 2004-2010  by Oracle Financial Services Software Limited..
----------------------------------------------------------------------------------------------------
*/

var TempStr;
var NewStr;
var OrgLen;
var LastPos;
var StartPos;
var Cnt;
var i;

/** 
       * This function is used to find out the starting character position
       * from the string excluding white spaces 
       */
function findStartPosition()
{
    for (i = 0; i < OrgLen; i++)
    {
        if (TempStr.charAt(i) != ' ')
        {
            break;
        }
    }
    return (i)
}

/** 
       * This function is used to find out the last character position
       * from the string excluding white spaces 
       */
function findLastPosition()
{
    for (i = OrgLen - 1; i >= 0; i--)
    {
        if (TempStr.charAt(i) != ' ')
        {
            break;
        }
    }
    return (i)
}

/** 
       * Counting No. of Occurences
       */
function findOccurances(AStr, ASearch)
{
    var StrLen
    var SearchLen
    var noofOccurences
    var TempOccur
    var i

    TempOccur = new String(AStr)

    StrLen = getLength(AStr);
    SearchLen = getLength(ASearch);
    noofOccurences = 0;

    for (i = 0; i < StrLen; i++)
    {
        if (TempOccur.substring(i, i + SearchLen) == ASearch)
        {
            noofOccurences += 1
        }
    }

    return (noofOccurences)
}

/** 
       * This function finds the Length of String     
       */
function getLength(Astr)
{
    TempStr = new String(Astr);
    return (TempStr.length)
}

/** 
       * Split Function
       */
function stringSplit(AStr, ASplit)
{
    return (AStr.split(ASplit))
}

/** 
       * This function is used to return the same string
       * except the first character in upper case and rest of
       * the characters in lower case.
       */
function stringProper(AStr)
{
    var StrHold
    var StrLen
    var TempStr
    var Cnt
    var ValStr;
    StrLen = AStr.length;
    Cnt = 0;
    StrHold = "";
    ValStr = "";

    if (StrLen > 0)
    {
        for (i = 0; i < StrLen; i++)
        {
            TempStr = AStr.charAt(i);
            if (TempStr != ' ' && TempStr.length > 0 && Cnt == 0)
            {
                ValStr = AStr.charAt(i);
                StrHold = StrHold + ValStr.toUpperCase();
                Cnt = 1;
            } else
            {
                ValStr = AStr.charAt(i);
                StrHold = StrHold + ValStr.toLowerCase();
            }
        }
    }
    return (StrHold)
}

/** 
       * This function is used to squeeze of second parameter
       * in the first parameter string. 
       */
function stringSqueeze(AStr, ARemove)
{
    var temp = ""
    var c
    for (var i = 0; i < AStr.length; i++)
    {
        c = AStr.charAt(i);
        if (c != ARemove) temp += c;
    }
    return temp
}

/** 
       * This function Replaces particular letter or word in a string
       * with the other letter or word
       */
function stringReplace(AStr, strReplaceWhat, strReplaceWith)
{
    var strReturnValue = ""
    var strCharacter
    var intLoop
    for (intLoop = 0; intLoop < AStr.length; intLoop++)
    {
        strCharacter = AStr.charAt(intLoop);
        if (strCharacter != strReplaceWhat)
        {
            strReturnValue += strCharacter
        } else
        {
            strReturnValue = strReturnValue + strReplaceWith
        }
    }
    return strReturnValue
}

/** 
       * This function Checks the Null Status
       */
function isNull(AStr)
{
    if (getLength(AStr) <= 0)
    {
        return true;
    } else
    {
        return false;
    }
}

/** 
       * This function Checks for Numeric Value
       */
function isNumeric(ANum)
{
    var dotPresent = false;
    //return false is changed to return true by Sankarganesh 22/03/05
    if (getLength(trim(ANum)) <= 0)
        return true;
    //Code Added to Accept Negative Number by Sankarganesh 25/05/05
    if ((ANum.charAt(0) == '-' & ANum.length != 1))
    {
        ANum = ANum.substring(1, ANum.length);
    }
    for (i = 0; i < ANum.length; i++)
    {
        if (ANum.charAt(i) != 0)
        {
            if (isNaN(ANum.charAt(i)) == true)//fix for 16906832
            {
                //Change made to Skip '.' by Sankarganesh 03/03/2005
                if (!dotPresent)
                {
                    if (ANum.charAt(i) != '.')
                    {
                        return false;
                    }
                } else
                {
                    return false;
                }
            }
        }
        if (ANum.charAt(i) == '.')
        {
            dotPresent = true;
            if(ANum.length == 1)
                return false;
        }
    }
    return true;
}

/** 
       * This function Checks for Alpha Value
       */
function isAlpha(AStr)
{
    /* Changed for validating only for ~ character*/
    var inTheStr1 = "~"; 
    var inTheStr2 = "^";//Fix for 16999792
    if ((AStr.indexOf(inTheStr1) > -1) || (AStr.indexOf(inTheStr2) > -1))//Fix for 16999792
    {
        return false;
    }
    return true;

    /*
     // -  and _ added by aakriti for MUTBdemo
		inTheStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz,.#@-_&$()/:%;*'"
		tempChar = "";
		
		 //return false is changed to return true by Sankarganesh 22/03/05
		 if (getLength(trim(AStr))<=0) return true
		 
		for(i=0;i<AStr.length;i++) {
			if (AStr.charAt(i)!=0) {
				tempChar = AStr.charAt(i)
	 
				if ((inTheStr.indexOf(tempChar)) < 0) {
					return(false)
				}			
			 }  
		}   
     	return(true)	
		*/
}

/** 
       * This function Checks for Alpha Numeric Value
       */
function isAlphaNumeric(AStr)
{
    /* Changed for validating only for ~ character*/
    var inTheStr = "~";
    if (AStr.indexOf(inTheStr) > -1)
    {
        return false;
    }
    return true;

}

/** 
       * This function Checks for Upper case Alpha Numeric Value
       */
function isUCAlphaNumeric(AStr)
{
    inTheStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    tempChar = "";

    //return false is changed to return true by Sankarganesh 22/03/05
    if (getLength(trim(AStr)) <= 0) return true;

    for (i = 0; i < AStr.length; i++)
    {
        if (AStr.charAt(i) != 0)
        {
            tempChar = AStr.charAt(i);
            if ((inTheStr.indexOf(tempChar)) < 0)
            {
                return (false);
            }
        }
    }
    return (true);
}

/**
       * To check Whether no record is selected to Authorize 
       * Returns True if nothing selected
       */
function isNoEntrySelected()
{
    var intSelectedCount = 0;
    for (var iLoop = 0; iLoop < checkBoxValues.length; iLoop++)
    {
        if (checkBoxValues[iLoop] == "-1")
        {
            intSelectedCount++;
        }
        if (intSelectedCount >= 1)
        {
            break;
        }
    }

    if (intSelectedCount == 0)
    {
        return true;
    } else
    {
        return false;
    }
}

/**
       * To check Whether Multiple records are selected to Authorize 
       * Returns True if multiple selected
       */
function isMultipleEntrySelected()
{
    var intSelectedCount = 0;

    for (var iLoop = 0; iLoop < checkBoxValues.length; iLoop++)
    {
        if (checkBoxValues[iLoop] == -1)
        {
            intSelectedCount++;
        }
        if (intSelectedCount > 1)
        {
            break;
        }
    }

    if (intSelectedCount > 1)
    {
        return true;
    } else
    {
        return false;
    }
}

/**
       * To check Whether Selected Entry Maker is same as Checker. 
       * Those Entries should be omitted in Authorization
       * Returns True if Same 
       */
function isMakerCheckerSame(makerID)
{
    //if Same
    if (makerID == mainWin.UserId) return true;
    else return false;
}

/**
       * To check Whether Selected Entry is Already Authorized
       * Returns True if already authorized
       */
function isSelectedEntryAuthorized(authValue)
{
    //Authorized
    if (authValue == "A") return true;
    else return false;
}

/**
    * To Check the validity of a Operation before Proceeding.
    * Returns true if the operation is permitted.
    */
function fnValidateOperation()
{
    var bolResult = true;
    var valuesFound = true;
    var value = "";
    var message = "";
    var oprType = gAction;

    for (var iLoop = 0; iLoop < pkFields.length; iLoop++)
    {
        value = document.getElementById(pkFields[iLoop]).value;
        if (value == null || value == "") return false;
    }
    if (valuesFound)
    {
        if (document.getElementById("DIV_BLK_AUDIT"))
        {
            var l_auditTable = document.getElementById("DIV_BLK_AUDIT").children[0].getAttribute("DBT");
            var l_RecordStat = document.getElementById(l_auditTable + "__RECORD_STAT");
            var l_AuthStat = document.getElementById(l_auditTable + "__AUTH_STAT");
            //Saidul Added for online validations.START
            //var l_Form = document.forms[0];
            if (document.getElementsByName("AUTHSTAT")[0]) l_AuthStat = document.getElementById(l_auditTable + "__AUTHSTAT");
            //Saidul Added for online validations. END
            if (l_RecordStat && l_AuthStat && oprType != 'DELETE')
            {
                //For CLOSE Operation
                if (oprType == 'CLOSE')
                {
                    //Record_stat - unchecked (Closed)
                    //Auth_stat - Checked(Authorized)
                    if (!l_RecordStat.checked && l_AuthStat.checked)
                    {
                        try
                        {
                            //Record is already Closed
                            appendErrorCode('FC-MAINT05', null);
                            message = buildMessage(gErrCodes);
                            alertMessage(message);
                            return false;
                        } catch(e)
                        {
                            return false;
                        }
                    }

                    //Record_stat - Unchecked (Closed)
                    //Auth_stat - UnChecked(Not-Authorized)
                    else if (!l_RecordStat.checked && !l_AuthStat.checked)
                    {
                        try
                        {
                            //FCERROR: Close already initiated, Please authorize!
                            appendErrorCode('FC-MAINT12', null);
                            message = buildMessage(gErrCodes);
                            //alertMessage(message);
                            //Alert is removed by Saidul and Message box has been added.
                            var attr = "E";
                            message = "FC-MAINT12" + " " + message;
                            returnVal = window.showModalDialog("OVRDMSGS.jsp?type=" + attr, message, "dialogLeft:325;dialogTop:270;dialogHeight:200px;dialogWidth:400px;resizable:no;scroll:no;status:no");
                            return false;//TODO
                        } catch(e)
                        {
                            return false;
                        }
                    }

                    //Record_stat - Checked (Open)
                    //Auth_stat - UnChecked(Not-Authorized)

                    else if (l_RecordStat.checked && !l_AuthStat.checked)
                    {
                        try
                        {
                            //FCERROR:Close not possible as Unauthorized modifications exist;
                            appendErrorCode('FC-MAINT11', null);
                            message = buildMessage(gErrCodes);
                            //alertMessage(message);
                            //Alert is removed by Saidul and Message box has been added.
                            var attr = "E";
                            message = "FC-MAINT11" + " " + message;
                            returnVal = window.showModalDialog("OVRDMSGS.jsp?type=" + attr, message, "dialogLeft:325;dialogTop:270;dialogHeight:200px;dialogWidth:400px;resizable:no;scroll:no;status:no");
                            return false;//TODO
                        } catch(e)
                        {
                            return false;
                        }
                    }

                }

                //For REOPEN Operation               
                if (oprType == 'REOPEN')
                {
                    //Record_stat - Checked (Open)
                    //Auth_stat - Checked(Authorized)                    
                    if (l_RecordStat.checked && l_AuthStat.checked)
                    {
                        try
                        {
                            //The Record is already Open!");
                            appendErrorCode('FC-MAINT10', null);
                            message = buildMessage(gErrCodes);
                            alertMessage(message);
                            return false;
                        } catch(e)
                        {
                            return false;
                        }
                    }

                    //Record_stat - Checked (Open)
                    //Auth_stat - UnChecked(Not-Authorized)                    
                    else if (l_RecordStat.checked && !l_AuthStat.checked)
                    {
                        try
                        {
                            //FCERROR: Record not authorized, Please authorize!");
                            appendErrorCode('FC-MAINT09', null);
                            message = buildMessage(gErrCodes);
                            alertMessage(message);
                            return false;
                        } catch(e)
                        {
                            return false;
                        }
                    }

                    //Record_stat - Unchecked (Closed)
                    //Auth_stat - UnChecked(Not-Authorized)
                    else if (!l_RecordStat.checked && !l_AuthStat.checked)
                    {
                        try
                        {
                            //Record is set for Close, Reopen is not possible at this stage!");
                            appendErrorCode('FC-MAINT08', null);
                            message = buildMessage(gErrCodes);
                            //alertMessage(message);
                            //Alert is removed by Saidul and Message box has been added.
                            var attr = "E";
                            message = "FC-MAINT08" + " " + message;
                            returnVal = window.showModalDialog("OVRDMSGS.jsp?type=" + attr, message, "dialogLeft:325;dialogTop:270;dialogHeight:200px;dialogWidth:400px;resizable:no;scroll:no;status:no");
                            return false;//TODO
                        } catch(e)
                        {
                            return false;
                        }
                    }

                }

                //	For EDIT Operation
                if (oprType == 'MODIFY')
                {

                    // Close Initiated and Not authorized    //if condition added for online screens temproarily
                    if (! ((l_RecordStat == null) || (l_AuthStat == null)))
                    {
                        if ((!l_RecordStat.checked) && (!l_AuthStat.checked))
                        {
                            //Record is set for Close, Edit is not possible!");
                            appendErrorCode('FC-MAINT31', null);
                            message = buildMessage(gErrCodes);
                            alertMessage(message);
                            return false;
                        }

                        // Closed and authorized
                        if ((!l_RecordStat.checked) && (l_AuthStat.checked))
                        {
                            //Record is Closed");
                            appendErrorCode('FC-MAINT05', null);
                            message = buildMessage(gErrCodes);
                            alertMessage(message);
                            return false;
                        }
                    }
                }

                //For AUTHQUERY Operation

                if (oprType == 'AUTHQUERY')
                {
                    // Already Authorized

                    if ((l_AuthStat && l_AuthStat.checked) || (document.getElementById("CSTB_CONTRACT_EVENT_LOG__AUTH_STATUS") && document.getElementById("CSTB_CONTRACT_EVENT_LOG__AUTH_STATUS".checked)))
                    {
                        //Record is already authorized");
                        appendErrorCode('FC-MAINT07', null);
                        message = buildMessage(gErrCodes);
                        alertMessage(message);
                        return false;
                    }
                }

            } //Reddy Prasad
            else if (oprType == 'DELETE')
            { // For DELETE Operation
                // Already Authorized                
                if (l_AuthStat)
                {
                    if (l_AuthStat.checked)
                    {
                        //Record is already authorized");
                        appendErrorCode('FC-MAINT15', null);
                        message = buildMessage(gErrCodes);
                        alertMessage(message);
                        return false;
                    }

                }
                var currentUser = mainWin.UserId;

                var l_MakerId_Name = "MAKER_ID";
                if (document.getElementsByName("MAKERID")[0]) l_MakerId_Name = "MAKERID";
                if (document.getElementsByName("REVR_MAKERID")[0]) var l_RevMakerId_Name = "REVR_MAKERID";
                if (document.getElementsByName("CONTSTAT")[0]) var l_ContStat = document.getElementById(l_auditTable + "__CONTSTAT");

                if (document.getElementById(l_auditTable + "__" + l_MakerId_Name))
                {
                    var recordUser = document.getElementById(l_auditTable + "__" + l_MakerId_Name).value;
                    if (typeof(l_RevMakerId_Name) != 'undefined') var reversalUser = document.getElementById(l_auditTable + "__" + l_RevMakerId_Name).value;

                    if (reversalUser && l_ContStat && l_ContStat.value == "Reversed" && currentUser.toUpperCase() != reversalUser.toUpperCase())
                    {
                        //Cannot delete other than reversal user;
                        appendErrorCode('FC-MAINT16', null);
                        //Alert is removed by Saidul and Message box has been added.
                        var attr = "E";
                        message = buildMessage(gErrCodes);
                        message = "FC-MAINT16" + " " + message;
                        returnVal = window.showModalDialog("OVRDMSGS.jsp?type=" + attr, message, "dialogLeft:325;dialogTop:270;dialogHeight:200px;dialogWidth:400px;resizable:no;scroll:no;status:no");
                        //alertMessage(message);
                        return false;//TODO
                    } else
                    {
                        if (currentUser.toUpperCase() != recordUser.toUpperCase())
                        {
                            if (typeof(l_ContStat) != 'undefined' && l_ContStat && l_ContStat.value == "Reversed")
                            {
                                return true;
                            } else
                            { //Cannot delete other users Modifications;
                                appendErrorCode('FC-MAINT16', null);
                                //Alert is removed by Saidul and Message box has been added.
                                var attr = "E";
                                message = buildMessage(gErrCodes);
                                message = "FC-MAINT16" + " " + message;
                                returnVal = window.showModalDialog("OVRDMSGS.jsp?type=" + attr, message, "dialogLeft:325;dialogTop:270;dialogHeight:200px;dialogWidth:400px;resizable:no;scroll:no;status:no");
                                //alertMessage(message);
                                return false;//TODO
                            }
                        }
                    }
                }

            } //end of delete operation handling.
        }
    }
    return bolResult;
}

/**
       * Frame the entity list. Called from Summary Screen
       */
function fnBuildExcludedEntities()
{
    var msgDisplay = "";
    if (arrAuthorizedRecordPosition.length != 0)
    {
        for (var i = 0; i < arrAuthorizedRecordPosition.length; i++) msgDisplay = msgDisplay + arrAuthorizedRecordPosition[i] + ",  ";

        //Entities in Rows {0} are already Authorized.
        appendErrorCode('FC-MAINT27', msgDisplay);
        var msg = buildMessage(gErrCodes);
        alertMessage(msg);
    }

    msgDisplay = "";
    if (arrMakerCheckerSamePosition.length != 0)
    {
        for (var i = 0; i < arrMakerCheckerSamePosition.length; i++) msgDisplay = msgDisplay + arrMakerCheckerSamePosition[i] + ",  ";

        //Maker and Checker are Same in rows {0}
        appendErrorCode('FC-MAINT26', msgDisplay);
        var msg = buildMessage(gErrCodes);
        alertMessage(msg);
    }
}

/** This function validate the SWIFT Code.
  --> The SWIFT Code shuld contain either 8 or 11 Characters.
  --> Should not contain any special characters.
  
  Added By C Malaiah on Apr 18,2005.
*/
function fnValidateSwiftCode(swiftCode)
{

    var validate = true;
    if (!isUCAlphaNumeric(swiftCode))
    {
        appendErrorCode('FC-MAINT18', "SWIFT Code");
        validate = false;
    }

    if (getLength(swiftCode) != 8 && getLength(swiftCode) != 11)
    {
        //SWIFT Code length should be 8 or 11
        appendErrorCode('FC-MAINT25', null);
        validate = false;
    }

    return validate;
}
//Functions isNegative(),isPositive(),isInteger() Added by the Sankrganesh 25/05/05
/** 
 * This function Checks for Negative Value
 */
function isNegative(ANum)
{

    var dotPresent = false;
    if (getLength(trim(ANum)) <= 0) return true
    if ((ANum.charAt(0) == '-' & ANum.length != 1))
    {
        ANum = ANum.substring(1, ANum.length);
    } else
    {
        return (false);
    }
    for (var i = 0; i < ANum.length; i++)
    {
        if (ANum.charAt(i) != 0)
        {
            iif (isNaN(ANum.charAt(i)) == true)//fix for 16906832
            {
                if (!dotPresent)
                {
                    if (ANum.charAt(i) != '.')
                    {
                        return (false)
                    }
                } else
                {
                    return (false);
                }
            }
        }
        if (ANum.charAt(i) == '.')
        {
            dotPresent = true;
        }
    }
    return (true)
}

/** 
 * This function Checks for Possitive Value
 */
function isPositive(ANum)
{
    var dotPresent = false;
    if (getLength(trim(ANum)) <= 0) return true
    for (var i = 0; i < ANum.length; i++)
    {
        if (ANum.charAt(i) != 0)
        {
            if (isNaN(ANum.charAt(i)) == true)//fix for 16906832
            {
                if (!dotPresent)
                {
                    if (ANum.charAt(i) != '.')
                    {
                        return (false)
                    }
                } else
                {
                    return (false);
                }
            }
        }
        if (ANum.charAt(i) == '.')
        {
            dotPresent = true;
        }
    }
    return (true)
}

/** 
 * This function Checks for Integer Value
 */
function isInteger(ANum)
{
    if (getLength(trim(ANum)) <= 0) return true
    if ((ANum.charAt(0) == '-' & ANum.length != 1))
    {
        ANum = ANum.substring(1, ANum.length);
    }
    for (i = 0; i < ANum.length; i++)
    {
        if (ANum.charAt(i) != 0)
        {
            if (isNaN(ANum.charAt(i)) == true)//fix for 16906832
            {
                return (false);
            }
        }

    }
    return (true)
}
