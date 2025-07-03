<%
/*----------------------------------------------------------------------------------------------------
**
** File Name    : compatabilityerror.jsp
**
** Module       : RAD
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
Copyright © 2004-2016 by Oracle Financial Services Software Limited..
----------------------------------------------------------------------------------------------------
**	Created By   : Silambarasan
** 	Modified on   : 20/03/2016
** 	Description   : HTML5 Changes
-------------------------------------------------------------------------------------------------------- -
*/
%>
<!DOCTYPE html>
<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="utf-8"%>

<html class="loginHtml">
    <head>
        <link href="Theme/ExtBROWSER_IE.css" rel="stylesheet" type="text/css"/>
        <link href="Theme/Flexblue.css" rel="stylesheet" type="text/css"/>
        <link href="Theme/ExtFlexblue.css" rel="stylesheet" type="text/css"/>
 
        <script type="text/javascript">
          function debugs(msg, value, funcName) {
          }
          function launchApp() {
              //window.close();
              document.submitform.submit();
              
          }	
 function IsCompViewOn() {
    //Set defaults
    var value = {
        IsIE: false,
        TrueVersion: 0,
        ActingVersion: 0,
        CompatibilityMode: false
    };

    //Try to find the Trident version number
    var trident = navigator.userAgent.match(/Trident\/(\d+)/);
    if (trident) {
        value.IsIE = true;
        //Convert from the Trident version number to the IE version number
        value.TrueVersion = parseInt(trident[1], 10) + 4;
    }

    //Try to find the MSIE number
    var msie = navigator.userAgent.match(/MSIE (\d+)/);
    if (msie) {
        value.IsIE = true;
        //Find the IE version number from the user agent string
        value.ActingVersion = parseInt(msie[1]);
    } else {
        //Must be IE 11 in "edge" mode
        value.ActingVersion = value.TrueVersion;
    }

    //If we have both a Trident and MSIE version number, see if they're different
    if (value.IsIE && value.TrueVersion > 0 && value.ActingVersion > 0) {
        //In compatibility mode if the trident number doesn't match up with the MSIE number
        value.CompatibilityMode = value.TrueVersion != value.ActingVersion;
    }
    if(!value.CompatibilityMode){
     document.submitform.submit();
     }
}
        </script>
    </head>
    <body class="loginBody"  onload="IsCompViewOn()" oncontextmenu="return false;">
    <form action="RadIndex.html" name="submitform"></form>
        <div class="loginHeader" id="header">
            <span class="loginLogo ">
                <span class="LogoOracle" style="display:block" title="ORACLE"></span></span>
        </div>
        <br/>
        <div>
            <table style="width: 100%; border:0px; cellspacing:0px; cellpadding:0px;"  summary="">
                <tr>
                  
                    <td width="100" align="center" valign="top">
                        <img src="Images/Flexblue/Icons/ICDialog.gif" />
                    </td>
                    <%-- Security bug SEC-12-Patch-081 fixes ends--%>
                    <td>
                        <div class="DIVDialog">
                            <table class='TABLEError' style="width: 100%; border:0px; cellspacing:0px; cellpadding:0px;" summary=''>
                                <tr>
                                    <td class='TDErrorID'>
                                        Compatability Setting is enabled 
                                    </td>
                                </tr>
                                 
                                <tr>
                                    <td>
                                        <p class="PErrorDesc">
                                            Please follow below steps to disable Compatibility Setting 
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p class="PErrorDesc">
                                           Goto Tools menu and Click on compatibility view setting 
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p class="PErrorDesc">
                                           Uncheck the display all the websites in compatibility view 
                                        </p>
                                    </td>
                                </tr>
                                 <tr>
                                    <td>
                                        <p class="PErrorDesc">
                                          Click OK to relaunch 
                                        </p>
                                    </td>
                                </tr>
                                <tr><td><p></p></td></tr>
                                <tr>
                                    <td>
                                        <p >
                                             <input class="BTNtext" style="font-size:1.2em" type="submit" name="submit"
                                                   value='OK' id="fc_sbmit" onclick="launchApp()"  tabindex="1" accesskey="l"/>
                                        </p>
                                    </td>
                                </tr>
                            </table>
                           
                        </div>
                    </td>
                </tr>
            </table>
        </div>
        <div id="footer" class="loginFooter">
            <span class="loginCpyText"> 
               Oracle FLEXCUBE Payments : 12.5.0.0.0
             <br></br>
			 Oracle Flexcube Universal Banking <br>    Copyright © 2007, 2017, Oracle and/or its affiliates. All rights reserved.
			 </span>
        </div>
    </body>
</html>