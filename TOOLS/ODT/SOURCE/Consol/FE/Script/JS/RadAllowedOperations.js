/*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : RadAllowedOperations.js
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
//dlgArg = dialogArguments;
var adminFuncsArray = parent.adminFuncsArray;
//var roleFunction=parent.roleFunction;
var roleRights = parent.groleRights;
//var roleRights="";
var roleFunction = "";
roleRights = "111";

function fnAllowedOperations(funcID) {
    // Function Genration
    if (funcID == "RDDFNCGN" || funcID == "RDDLNPGE") {
        if (roleRights.charAt(2) == '0') {
            document.getElementsByName("saveRADXml")[0].className = "BUTTONToolbarD";
            document.getElementsByName("saveRADXml")[0].disabled = true;
            document.getElementsByName("genFiles")[0].className = "BUTTONToolbarD";
            document.getElementsByName("genFiles")[0].disabled = true;
            document.getElementsByName("depFiles")[0].className = "BUTTONToolbarD";
            document.getElementsByName("depFiles")[0].disabled = true;
            document.getElementsByName("chekinFiles")[0].className = "BUTTONToolbarD";
            document.getElementsByName("chekinFiles")[0].disabled = true;
        }
        else if (roleRights.charAt(2) == '1') {
            document.getElementsByName("saveRADXml")[0].className = "BUTTONToolbar";
            document.getElementsByName("saveRADXml")[0].disabled = false;
            document.getElementsByName("genFiles")[0].className = "BUTTONToolbar";
            document.getElementsByName("genFiles")[0].disabled = false;
            document.getElementsByName("depFiles")[0].className = "BUTTONToolbar";
            document.getElementsByName("depFiles")[0].disabled = false;
            document.getElementsByName("chekinFiles")[0].className = "BUTTONToolbar";
            document.getElementsByName("chekinFiles")[0].disabled = false;
        }
    }
    // Data Extraction
    else if (funcID == "RDDDTEXT") {
        if (roleRights.charAt(1) == '0') {
            document.getElementsByName("UPGRADE")[0].disabled = true;
        }
        else if (roleRights.charAt(1) == '1') {
            document.getElementsByName("UPGRADE")[0].disabled = false;
        }

    }
    // Source Refresh
    else if (funcID == "RDDSRCRF") {
    }
    //Child Refresh
    else if (funcID == "RDDCHDRF") {
    }
    //Screen Customizer
    else if (funcID == "RDDSCRDF") {
    }
    //Bulk Generation
    else if (funcID == "RDDBLKGN") {
        if (roleRights.charAt(1) == '0') {
            document.getElementsByName("ok")[0].disabled = true;
        }
        else if (roleRights.charAt(1) == '1') {
            document.getElementsByName("ok")[0].disabled = false;
        }

    }
    //Field Locator
    else if (funcID == "RDDFLDLC") {
        if (roleRights.charAt(1) == '0') {
            document.getElementsByName("FLD_FIND")[0].disabled = true;
        }
        else if (roleRights.charAt(1) == '1') {
            document.getElementsByName("FLD_FIND")[0].disabled = false;
        }
    }

    else if (funcID == "RDDVWCHG") {
    }
    //Notifications
    else if (funcID == "RDDNOTIF") {
        if (roleRights.charAt(2) == '0') {
            document.getElementsByName("save")[0].className = "BUTTONToolbarD";
            document.getElementsByName("save")[0].disabled = true;
            document.getElementsByName("genFiles")[0].className = "BUTTONToolbarD";
            document.getElementsByName("genFiles")[0].disabled = true;
            document.getElementsByName("depFiles")[0].className = "BUTTONToolbarD";
            document.getElementsByName("depFiles")[0].disabled = true;
            document.getElementsByName("chekinFiles")[0].className = "BUTTONToolbarD";
            document.getElementsByName("chekinFiles")[0].disabled = true;
        }
        else if (roleRights.charAt(2) == '1') {
            document.getElementsByName("save")[0].className = "BUTTONToolbar";
            document.getElementsByName("save")[0].disabled = false;
            document.getElementsByName("genFiles")[0].className = "BUTTONToolbar";
            document.getElementsByName("genFiles")[0].disabled = false;
            document.getElementsByName("depFiles")[0].className = "BUTTONToolbar";
            document.getElementsByName("depFiles")[0].disabled = false;
            document.getElementsByName("chekinFiles")[0].className = "BUTTONToolbar";
            document.getElementsByName("chekinFiles")[0].disabled = false;
        }

    }
    //Notification Trigeers
    else if (funcID == "RDDNFTRG") {
        if (roleRights.charAt(1) != '1') {
            parent.frames("admin")[0].document.getElementsByName("new")[0].disabled = true;
            parent.frames("admin")[0].document.getElementsByName("new")[0].className = "BUTTONToolbarD";
        }
        else if (roleRights.charAt(1) == '1') {
            parent.frames("admin")[0].document.getElementsByName("new")[0].disabled = false;
            parent.frames("admin")[0].document.getElementsByName("new")[0].className = "BUTTONToolbar";
        }
        if (roleRights.charAt(2) != '1') {
            parent.frames("admin")[0].document.getElementsByName("UnLck")[0].disabled = true;
            parent.frames("admin")[0].document.getElementsByName("UnLck")[0].className = "BUTTONToolbarD";
            parent.frames("admin")[0].document.getElementsByName("save")[0].disabled = true;
            parent.frames("admin")[0].document.getElementsByName("save")[0].className = "BUTTONToolbarD";

        }
        else if (roleRights.charAt(2) == '1') {
            parent.frames("admin")[0].document.getElementsByName("UnLck")[0].disabled = false;
            parent.frames("admin")[0].document.getElementsByName("UnLck")[0].className = "BUTTONToolbar";
            parent.frames("admin")[0].document.getElementsByName("save")[0].disabled = false;
            parent.frames("admin")[0].document.getElementsByName("save")[0].className = "BUTTONToolbar";
        }
    }

}