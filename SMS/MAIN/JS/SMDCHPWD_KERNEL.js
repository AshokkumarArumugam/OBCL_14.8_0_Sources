/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product
** Copyright © 2008 - 2011  Oracle and/or its affiliates.  All rights reserved.
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
**  File Name          : SMDCHPWD_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : 
**  Last modified on   : 
**  Full Version       : 
**  Reason             : 

**  Last Modified By   : Anoop R
**  Last modified on   : 23-Jun-2014
**  Search String      : 1203_19046779
**  Reason             : Enable to reset the password field of first record if the AUTO_GEN_PASS_REQ flag in cstb_param is N.

**  Last Modified By        : Akshita
**  Last Modified Reason    : Redwood Changes
**  Search String           : Redwood_Changes
****************************************************************************************************************************/
/*FCUBS10.5.2 Password Encryption For SMDCHPWD */
var autoGenPassReq =mainWin.autoGenPassReq;

function fnPostNew_KERNEL(){    
    document.getElementById("BLK_USERMASTER__SEQ_NO").value = "1";    
    gAction ="DEFAULT";  
    appendData();     
    fcjRequestDOM = buildUBSXml();
    fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);   
    gAction ="";
    if (!fnProcessResponse()) {      
       gAction ="NEW"; 
       return false;
    }    
    gAction ="NEW";
    //document.getElementById("BTN_SINGLE_VIEW_BLK_USERDETAIL").className ="hidden"; //Redwood_Change
	fnDisableElement(document.getElementById("BTN_SINGLE_VIEW_BLK_USERDETAIL")); //Redwood_Change
    return true;
}

function fnPostLoad_KERNEL(){     
    var length = selectNodes(dbDataDOM,"//BLK_USERDETAIL").length ;
    if(typeof(autoGenPassReq) !="undefined" && autoGenPassReq=="Y"){        
        for (var i=0;i<length;i++){         
            fnDisableElement(getElementsByOjName("USRPWD")[i]); //Redwood_Change
        }
    }
    //document.getElementById("BTN_SINGLE_VIEW_BLK_USERDETAIL").className ="hidden"; //Redwood_Change
	fnDisableElement(document.getElementById("BTN_SINGLE_VIEW_BLK_USERDETAIL"));//Redwood_Change
    return true;
}

function fnPostExecuteQuery_KERNEL(){     
     var length = selectNodes(dbDataDOM,"//BLK_USERDETAIL").length ;
     for (var i=0;i<length;i++){         
        getElementsByOjName("USRPWD")[i].value = getNodeText(selectSingleNode(dbDataDOM,"//BLK_USERDETAIL[@ID='"+(i+1)+"']").childNodes[3]); //Redwood_Change
     }
     return true;
}

function fnPostAddRow_BLK_USERDETAIL_KERNEL(){
	//setTimeout(function(){ 
    var seqno_value = document.getElementById("BLK_USERMASTER__SEQ_NO").value; 
    var l = getElementsByOjName("SEQ_NO").length; //Redwood_Changes
    var length = selectNodes(dbDataDOM,"//BLK_USERDETAIL").length ;
    for(var i=0;i<l;i++){
        getElementsByOjName("SEQ_NO")[i].value = seqno_value; //Redwood_Change
        fnDisableElement(getElementsByOjName("USRNAME")[i]); //Redwood_Change
    }      
    if(typeof(autoGenPassReq) !="undefined" && autoGenPassReq=="Y"){       
        for (var i=0;i<length;i++){   
			/*Fix for 15843286 starts*/
            fnDisableElement(getElementsByOjName("USRPWD")[i]); //Redwood_Change
        }
    }
     if(typeof(autoGenPassReq) !="undefined" && autoGenPassReq=="N"){        
        for (var i=0;i<length;i++){         
            fnDisableElement(getElementsByOjName("RSTPWD")[i]);     //Redwood_Change      
        }
	        for(var i=0;i<length-1;i++){  
            if(usr_pwd[i+1] != undefined)
                getElementsByOjName("USRPWD")[i].value = usr_pwd[i+1];     //Redwood_Change   
        }/*Fix for 15843286 ends*/
    }
	//},0);
    return true;
}

function fnPostDeleteRow_BLK_USERDETAIL_KERNEL(){     
    var length = selectNodes(dbDataDOM,"//BLK_USERDETAIL").length ;
    if(typeof(autoGenPassReq) !="undefined" && autoGenPassReq=="Y"){        
        for (var i=0;i<length;i++){         
	    // 1203_19046779 starts
           // fnDisableElement(getElementsByOjName("BLK_USERDETAIL__USRPWD")[i]); //Redwood_Change
	      fnDisableElement(getElementsByOjName("USRPWD")[i]);            //Redwood_Change          
           // fnDisableElement(getElementsByOjName("BLK_USERDETAIL__USRNAME")[i]); //Redwood_Change
	      fnDisableElement(getElementsByOjName("USRNAME")[i]); //Redwood_Change
	    // 1203_19046779 ends
        }
    }
     if(typeof(autoGenPassReq) !="undefined" && autoGenPassReq=="N"){
        for (var i=0;i<length;i++){         
	    // 1203_19046779 starts
            // fnDisableElement(getElementsByOjName("BLK_USERDETAIL__RSTPWD")[i]);  //Redwood_Change
	      fnDisableElement(getElementsByOjName("RSTPWD")[i]);     //Redwood_Change               
            // fnDisableElement(getElementsByOjName("BLK_USERDETAIL__USRNAME")[i]);	 //Redwood_Change	
	      fnDisableElement(getElementsByOjName("USRNAME")[i]);  //Redwood_Change
	    // 1203_19046779 ends
          if(usr_pwd[i+1] != undefined)
                getElementsByOjName("BLK_USERDETAIL__USRPWD")[i].value = usr_pwd[i+1]; //Redwood_Change
        }
    }
    return true;
}

function fnPostUnlock_KERNEL(){ 
setTimeout(function(){   //REDWOOD_CHANGES
    var length = selectNodes(dbDataDOM,"//BLK_USERDETAIL").length ;
    for (var i=0;i<length;i++){         
        getElementsByOjName("USRPWD")[i].value = getNodeText(selectSingleNode(dbDataDOM,"//BLK_USERDETAIL[@ID='"+(i+1)+"']").childNodes[3]); //Redwood_Change
        fnDisableElement(getElementsByOjName("USRNAME")[i]); //Redwood_Change
    }   
    if(typeof(autoGenPassReq) !="undefined" && autoGenPassReq=="Y"){
        for (var i=0;i<length;i++){         
          //  fnDisableElement(getElementsByOjName("BLK_USERDETAIL__USRPWD")[i]);//Redwood_Change
	      fnDisableElement(getElementsByOjName("USRPWD")[i]);                  //1203_19046779 added //Redwood_Change
        }
    }
    if(typeof(autoGenPassReq) !="undefined" && autoGenPassReq=="N"){
        for (var i=0;i<length;i++){         
          //  fnDisableElement(getElementsByOjName("BLK_USERDETAIL__RSTPWD")[i]);//Redwood_Change
	      fnDisableElement(getElementsByOjName("RSTPWD")[i]);                 //1203_19046779 added  //Redwood_Change
        }
    }
	},0);//REDWOOD_CHANGES
    //document.getElementById("BTN_SINGLE_VIEW_BLK_USERDETAIL").className ="hidden"; //Redwood_Change
	fnDisableElement(document.getElementById("BTN_SINGLE_VIEW_BLK_USERDETAIL")); //Redwood_Change
    return true;
}

var usr_pwd = new Array();
function fnvalidatePwd(event){
    var event = window.event||event;
    var str = getEventSourceElement(event).value;    
    usr_pwd[getRowIndex(event)-1] = str;
    if(str != ""){
        var recNum = getRowIndex(event)+((Number(getInnerText(document.getElementById("CurrPage__BLK_USERDETAIL")))-1)*25);
        setNodeText(selectSingleNode(dbDataDOM,"//BLK_USERDETAIL[@ID='"+recNum+"']").childNodes[3], str);
    }
    return true;
}

function fnvalidateFpwd(event){
    var event = window.event||event;
    if(getEventSourceElement(event).value == false) //Redwood_Change
        getEventSourceElement(event).value = true; //Redwood_Change
    return true;
}
