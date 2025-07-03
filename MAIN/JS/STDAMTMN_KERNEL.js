/***************************************************************************************************************************
**  This source is part of the FLEXCUBE Software System and is copyrighted by 
**  Oracle Financial Services Software Limited.
**  
**  All rights reserved.  No part of this work may be reproduced, stored in a retrieval system, 
**  adopted or transmitted in any form or by any means, electronic, mechanical, photographic, 
**  graphic, optic recording or otherwise, translated in any language or computer language, 
**  without the prior written permission of Oracle Financial Services Software Limited.
**  
**  Oracle Financial Services Software Limited.
**  10-11, SDF I, SEEPZ, Andheri (East),
**  Mumbai - 400 096.
**  India.
**  
**  Copyright (c) 2008 - 2013 by Oracle Financial Services Software Limited. All rights reserved.
**  
**  Written by         : 
**  Date of creation   : 
**  File Name          : STDAMTMN_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 
****************************************************************************************************************************/

var fcjRequestDOM;
var fcjResponseDOM;

var gErrCodes = "";

function fnPreLoad()
{
    debugs("In fnPreLoad", "A");
}

function fnPostLoad()
{
    debugs("In fnPostLoad", "A");
}

function fnPreNew()
{
    var newAction = true;
    debugs("In fnPreNew", "A");
    return newAction;
}

function fnPostNew_KERNEL()
{
document.getElementById("BLK_CSTMS_AMTWORD_LANG").value = mainWin.Language;
}

function fnPreUnlock()
{
    var unlock = true;
    debugs("In fnPreUnlock", "A");
    return unlock;
}

function fnPostUnlock()
{
    debugs("In fnPostUnlock", "A");
}

function fnPreAuthorize()
{
    var authorize = true;
    debugs("In fnPreAuthorize", "A");
    return authorize;
}

function fnPostAuthorize()
{
    debugs("In fnPostAuthorize", "A");
}

function fnPreCopy()
{
    var copy = true;
    debugs("In fnPreCopy", "A");
    return copy;
}

function fnPostCopy()
{
    debugs("In fnPostCopy", "A");
}

function fnPreClose()
{
    var close = true;
    debugs("In fnPreClose", "A");
    return close;
}

function fnPostClose()
{
    debugs("In fnPostClose", "A");
}

function fnPreReOpen()
{
    var reOpen = true;
    debugs("In fnPreReOpen", "A");
    return reOpen;
}

function fnPostReOpen()
{
    debugs("In fnPostReOpen", "A");
}

function fnPreDelete()
{
    var deleteAction = true;
    debugs("In fnPreDelete", "A");
    return deleteAction;
}

function fnPostDelete()
{
    debugs("In fnPostDelete", "A");
}

function fnPreEnterQuery()
{
    var execute = true;
    debugs("In fnPreEnterQuery", "A");
    return execute;
}

function fnPostEnterQuery()
{
    debugs("In fnPostEnterQuery", "A");
}

function fnPreExecuteQuery()
{
    var execute = true;
    debugs("In fnPreExecuteQuery", "A");
    return execute;
}

function fnPostExecuteQuery()
{
    debugs("In fnPostExecuteQuery", "A");
}

function fnPreSave()
{
    debugs("In fnPreSave", "A");
    var isValid = true;
    isValid = isValid & fnValidateMandatory();
    isValid = isValid & fnValidateDataType();
    if (!isValid)
    {
        var msg = buildMessage(gErrCodes);
        alertMessage(msg);
        return false;
    }

    return isValid;
}

function fnPostSave()
{
    debugs("In fnPostSave", "A");
}

function fnPreGoToRec()
{
    var navigate = true;
    return navigate;
}

function fnPostGoToRec()
{

}

