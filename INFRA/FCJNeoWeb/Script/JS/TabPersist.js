/*----------------------------------------------------------------------------------------------------
**
**
** File Name    : TabPersist.js
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

Copyright © 2007-2009  by Oracle Financial Services Software Limited.. 

---------------------------------------------------------------------------------------------------------*/

var enablepersistence = true;
var persisttype = "local";

function get_cookie(Name)
{
    var search = Name + "=";
    var returnvalue = "";
    if (document.cookie.length > 0)
    {
        offset = document.cookie.indexOf(search);
        if (offset != -1)
        {
            offset += search.length;
            end = document.cookie.indexOf(";", offset);
            if (end == -1) end = document.cookie.length;
            returnvalue = unescape(document.cookie.substring(offset, end));
        }
    }
    return returnvalue;
}

function savetabstate()
{
    var cookiename = (persisttype == "sitewide") ? "tabcontent": window.location.pathname;
    var cookievalue = (persisttype == "sitewide") ? tabsourceindex + "|" + previoustab + ";path=/": tabsourceindex + "|" + previoustab;
    document.cookie = cookiename + "=" + cookievalue;
}
