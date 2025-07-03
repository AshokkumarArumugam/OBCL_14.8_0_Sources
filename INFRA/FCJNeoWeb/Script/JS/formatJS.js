/*----------------------------------------------------------------------------------------------------
**
** File Name    : formatJS.js
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

Copyright © 2004-2009  by Oracle Financial Services Software Limited..
---------------------------------------------------------------------------------------------------- 

*/
function ccyarray()
{}

function load_ccy(c, d, f)
{
    set_ccy_det(c, d, f);
}

ccytab = new ccyarray();

function ccytable(ccy_decimals, format_mask)
{
    this.decimals = ccy_decimals;
    this.format_mask = format_mask;
}

function get_ccy_decimals(ccy_code)
{

    return ccytab[ccy_code].decimals;

}

function get_ccy_mask(ccy_code)
{
    return ccytab[document.f1.ccy.value].format_mask;

}

function set_ccy_det(ccy_code, decimals, format_mask)
{
    ccytab[ccy_code] = new ccytable(decimals, format_mask);
}

function show_det_old()
{
    var d, f, c, origNo, formattedNumber;
    c = document.f1.ccy.value;
    origNo = document.f1.txtAmt.value;

    if (ccytab[c])
    {
        d = get_ccy_decimals(c);
        f = get_ccy_mask(c);
        document.f1.decs.value = d;
        document.f1.mask.value = f;
        alert(d);

        if (f == 'I') formattedNumber = formatFinal(d, origNo, "I");
        else formattedNumber = formatFinal(d, origNo, "N");
    } else
    {
        document.f1.decs.value = "";
        document.f1.mask.value = "";
        formattedNumber = formatFinal(2, origNo, "I");
    }
    alert(f);

    alert("in js : " + formattedNumber);
}

function csfn_format_amt(ccy, amt)
{
    var d, f, formattedNumber;

    if (ccytab[ccy])
    {
        d = get_ccy_decimals(ccy);
        f = get_ccy_mask(ccy);

        if (f == 'I') formattedNumber = formatFinal(d, amt, "I");
        else formattedNumber = formatFinal(d, amt, "A");
    } else
    {
        formattedNumber = formatFinal(2, amt, "I");
    }

    return formattedNumber;
}

function fnRound(amt, ccy)
{
    orgNo = amt.value;
    if (ccytab[ccy])
    {
        d = get_ccy_decimals(ccy);
        amt.value = fnRound_Vb(orgNo, d);
    } else
    {
        finalNum = amt.value = fnRound_Vb(orgNo, 2);
        amt.value = finalNum;
    }
    return true;
}

function show_det(amt, cur)
{
    origNo = amt.value;
    c = cur;
    var finalNumber;
    finalNumber = csfn_format_amt(c, origNo);
    amt.value = finalNumber;
    amt.style.textAlign = 'right';
}
