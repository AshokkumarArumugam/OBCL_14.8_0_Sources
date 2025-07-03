/***************************************************************************************************************************
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product
** Copyright © 2008 - 2015  Oracle and/or its affiliates.  All rights reserved.
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
**  
**  Written by         : 
**  Date of creation   : 
**  File Name          : SMDMBEAN_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 
****************************************************************************************************************************/
function fnPost(fcjMsgDOM, serverURL, functionID){
    var responseDOM = null;

    if (!mainWin.isSessionActive()) {
        event.returnValue = false;
         responseDOM = loadXMLDoc("<SESSION>EXPIRED</SESSION>");
        return responseDOM;
    }

    if (fcjMsgDOM == null) {
        displayError("EXTPOST-001"); 
        return responseDOM;
    }
    //dlgArg.mainWin.frames['FrameMenu'].fnShowProcess();

    //var strFormData = fcjMsgDOM.xml;
    var strFormData = getXMLString(fcjMsgDOM);
    var objHTTP = createHTTPActiveXObject();
    try{ //Network error handling start
    objHTTP.open("POST","FCMbeanClientServlet?funcid=SMDMBEAN&actionType=FETCHBEAN", false);
    objHTTP.setRequestHeader("Content-Type", "application/xml");
    objHTTP.setRequestHeader("charset", "utf-8");
    objHTTP.setRequestHeader("X-CSRFTOKEN", mainWin.CSRFtoken);
    objHTTP.send(strFormData);
    }
     catch(exp){
          mainWin.handleNetWorkErr(exp);
        } //Network error handling end
    fcjResponseDOM = null;
    if (objHTTP.status == 200){
            mainWin.inactiveTime = 0;
            var csrfNode = selectSingleNode(objHTTP.responseXML,"//CSRF");
            if(csrfNode != null && getNodeText(csrfNode) == "SM-00420"){
                alert(getNodeText(csrfNode)+mainWin.getItemDesc("LBL_REQUEST_TAMPERED"));
            }else{
                fcjResponseDOM = loadXMLDoc(getXMLString(objHTTP.responseXML));
                var tempRes = fcjResponseDOM;
                fcjResponseDOM= buildResponse(fcjResponseDOM)
                return fcjResponseDOM;
        }
    }
}

function buildResponse(){
 if(fcjResponseDOM){
       var xml = getXMLString(fcjResponseDOM);
       var resxml=xml.substring(0,xml.indexOf('</REC><MISC>'));
       resxml=resxml+showMbeanarrayData();        
       resxml=  resxml+ xml.substring(xml.indexOf('</REC><MISC>'));  
       fcjResponseDOM = loadXMLDoc(resxml);
   }
    return fcjResponseDOM;
}

function fnReset(){

 resetElements();
   gAction = "";
fnEnableElement(document.getElementById("BLK_ONLINEACTIONS__BTN_REFRESH"));
fnEnableElement(document.getElementById("BLK_ONLINEACTIONS__FUNCTIONID"));
fnEnableElement(document.getElementById("BLK_ONLINEACTIONS__ACTION"));
document.getElementById("BLK_ONLINEACTIONS__ACTION").value="";
document.getElementById("BLK_ONLINEACTIONS__FUNCTIONID").value="";

}

function fnRefresh(){
    gAction = "EXECUTEQUERY";
    fcjMsgDOM = buildUBSXml();
     fnPost(fcjMsgDOM, 'MbeanFetchDataServlet', 'SMDMBEAN');
     if (!fnProcessResponse()) {
        gAction = "";
        return false;
      }
}

function fnPostExecuteQuery_KERNEL(){
    fnEnableElement(document.getElementById("BLK_ONLINEACTIONS__BTN_RESET"));
    document.getElementById("BTN_SINGLE_VIEW_"+dataSrcLocationArray[1]).style.visibility='hidden';
    document.getElementById("cmdAddRow_"+dataSrcLocationArray[1]).style.visibility='hidden';
    document.getElementById("cmdDelRow_"+dataSrcLocationArray[1]).style.visibility='hidden';
    document.getElementById("BTN_SINGLE_VIEW_"+dataSrcLocationArray[2]).style.visibility='hidden';
    document.getElementById("cmdAddRow_"+dataSrcLocationArray[2]).style.visibility='hidden';
    document.getElementById("cmdDelRow_"+dataSrcLocationArray[2]).style.visibility='hidden';
    return true;
}

/* Added to show the current MbeanArray data without signing out*/
function showMbeanarrayData(){
    var mbeanFunction   = new Array();
    var mbeanOpteration = new Array();  
    var qfunctionID     = document.getElementById("BLK_ONLINEACTIONS__FUNCTIONID").value;
    var qAction         = document.getElementById("BLK_ONLINEACTIONS__ACTION").value;    
    var res_xml         = "";
   
    for(var j=0;j<mainWin.mBeanArray.length;j++){    
        var mBeanValue      = mainWin.mBeanArray[j].split('~');   
        mbeanFunction[j]    = mBeanValue[1];
        mbeanOpteration[j]  = mBeanValue[2];
        
        if(qfunctionID != "" && qAction != ""){
            if(qfunctionID.toUpperCase()  == mbeanFunction[j] && qAction.toUpperCase()  == mbeanOpteration[j]){
                res_xml +=  getcDataNode(j);                
                continue;
            }              
            }              
        if(qfunctionID == "" && qAction != ""){        
            if(qAction.toUpperCase()  == mbeanOpteration[j]){
                res_xml +=  getcDataNode(j);               
                 continue;
            }        
            }        
        if(qfunctionID != "" && qAction == ""){       
            if(qfunctionID.toUpperCase()  == mbeanFunction[j]){
                res_xml +=  getcDataNode(j);               
                continue;
            }       
        }
        if(qfunctionID == "" && qAction == "") {   
            res_xml +=  getcDataNode(j);              
            continue;
        }  
    }   
    return res_xml;
}

function getcDataNode(i){   
    var mBean_Value     = mainWin.mBean_Array[i].split('~');      
    var mbeanFID        = mBean_Value[1];
    var mbeanAction     = mBean_Value[2];
    var mBeanCount      = mBean_Value[3];    
    var min_Time        = mBean_Value[4]; 
    var max_Time        = mBean_Value[5];              
    var ExecutionTime   = mBean_Value[6];           
    var cDataNode       =  '<REC TYPE='+'"'+dataSrcLocationArray[2]+'"'+'>' + '<FV><![CDATA['+mbeanFID+"~"+ mbeanAction+"~"+'FCUBS_UI_MBEAN'+"~"+ max_Time+"~"+min_Time +"~"+ExecutionTime+"~"+ mBeanCount+"~"+''+']]>'+'</FV></REC>';        
    return cDataNode;
}

function fnPostFocus_KERNEL() {
    //showToolbar("", "", "");
    return true;
}
