/*----------------------------------------------------------------------------------------------------
**
** File Name    : ExtDashboardBuildXML.js
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
Copyright © 2004-2012   by Oracle Financial Services Software Limited..
----------------------------------------------------------------------------------------------------
*/
function buildSummaryQueryXML() {
    var strCriteria = "";
    if (totalpages == 1) totalpages = 0;
    var summaryFN = msgxml_sum.substring(msgxml_sum.indexOf("<FN"), msgxml_sum.indexOf("</FN>"));
    var sumfldTag = summaryFN.substring(summaryFN.indexOf(">") + 1, summaryFN.length);
    var queryOrderBy = defaultOrderByClause;
    //var l_strCriteria = getCriteriaList();
    var l_strCriteria = getCriteriaList();
    var sumPkFlds = "";
    for (var i = 0; i < queryFields.length; i++) {
        sumPkFlds = sumPkFlds + queryFields[i].substring(queryFields[i].lastIndexOf("__") + 2, queryFields[i].length) + "~";
    }
    strCriteria = '<FCJMSG SRC="' + mainWin.AppSource + '" ';
    strCriteria += 'BRANCH = "' + mainWin.CurrentBranch + '" ';
    strCriteria += 'USERID = "' + mainWin.UserId + '" ';
    strCriteria += 'MODULEID = "' + mainWin.CurrentModule + '" ';
    strCriteria += 'SUMPKFIELDS = "' + sumPkFlds + '" >';
    strCriteria += '<MAINTQRY TYPE="N" ROOTTABLE = "' + g_SummaryBlock + '" QUERYFROM="" QUERYORDERBY = "' + queryOrderBy + '" CURRENTPAGE = "' + currentpage + '" FETCHSIZE = "' + fetchSize + '" TOTALPAGES = "' + totalpages + '" SUMFN= "' + sumfldTag + '">';
    strCriteria += l_strCriteria;
    strCriteria += '</MAINTQRY><FCUBS_HEADER><SQNO>'+seqNo+'</SQNO><DEBUG_MODE>'+mainWin.DebugWindowFlg+'</DEBUG_MODE></FCUBS_HEADER></FCJMSG>';
    var localDOM = loadXMLDoc(strCriteria);
    return localDOM;
}

function getCriteriaList(){
    var criteria = '';
    if(functionId == 'SMSINSDB'){
		//sfr#17233148  FOR RETRO Fix for 17211541
        criteria  = '<SUMTABLE>' + g_SummaryBlock + '</SUMTABLE><WHERE><![CDATA[CUSTOMER_NO~ OR~ CUSTOMER_NO~ ]]></WHERE><ORDERBY></ORDERBY><ADVVALUES><![CDATA[' + mainWin.custData[0] +'~~'+mainWin.accDataArray[0] +'~]]></ADVVALUES><ADOPT><![CDATA[  = ~  ~   = ~ ]]></ADOPT><ORDEBYOPT><![CDATA[]]></ORDEBYOPT>'
       //criteria  = '<TABLE ID="' + g_SummaryBlock + '">CUSTOMER_NO>' + mainWin.custData[0] + '</TABLE>';
    }else if(functionId == 'SMSTRNDB'){
        criteria = '<TABLE ID="' + g_SummaryBlock + '">AC_NO>' + mainWin.accDataArray[0] + '</TABLE>';
    } else{
        criteria = '<TABLE ID="' + g_SummaryBlock + '"></TABLE>';
    }
    return criteria;
}