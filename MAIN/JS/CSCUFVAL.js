/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product
** Copyright © 2004 - 2015  Oracle and/or its affiliates.  All rights reserved.
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
---------------------------------------------------------------------------------------
 Caution Don't Delete this. This is used by the Version control utility.

    ********************************** START OF LOG HISTORY **************************************
    $Log: Template.js.v $
    Revision 1.2  2005/02/22 09:30:48  IDSENTHILL
    1.2:Relesing to vercon

    Revision 1.1.1.0  2005/02/22 09:02:34  IDSENTHILL
    All the preAction functions should return a flag indicating the caller to proceed or not.

    Revision 1.1  2005/02/08 12:33:59  IDSENTHILL
    1.1:Relesing to vercon

    Revision 1.0.1.0  2005/02/07 07:39:16  IDSENTHILL
    Usage of AVCS Begin.

    Revision 1.0  2005/02/02 08:10:26  IDSENTHILL
    Initial Checkin

    **  Changed By         :  Gunjan Kumar Jain
    **  Changed On         :  21-Jan-2011
    **  Change Description :  Cross Browser Changes(Cancel button was not working.)
    **  Search Tag         :  FCUBS11.2_Cross_Browser#1
    
    **  Changed By         :  Nand Dhakar
    **  Changed On         :  22-Feb-2011
    **  Change Description :  Changed for Auto_Lov fix 
    **  Search Tag         :  Changed for Auto_Lov fix  
    
    **  Changed By         :  Guruprasad Bhat
    **  Changed On         :  03-July-2013
    **  Change Description :  LOV Serach to be hidden incase value is not an lov
    **  Search Tag         :  Fix for bug: 17016893

    **  Changed By         :  Anoop R
    **  Changed On         :  10-Oct-2013
    **  Change Description :  Code modified to remove the auto LOV
    **  Search Tag         :  1202_INTERNAL_17586672 
     
    **  Changed By         :  Anoop R
    **  Changed On         :  08-Jul-2014
    **  Change Description :  Lov chnages done for cube entity and validation type LOV. Lov should populate both value and description
                              (cube entity query should be written  to populate two columns insted of single column)    
    **  Search Tag         :  1203_19172237 

    **  Changed By         :  Anmol
    **  Changed On         :  29-Oct-2014
    **  Change Description :  LOV Serach to be hidden incase value is not an lov
    **  Search Tag         :  Fix for Bug#19678051
    
    **  Changed By         :  Anmol
    **  Changed On         :  14-Nov-2014
    **  Change Description :  Fix for LOV popup
    **  Search Tag         :  20029766

    **  Changed By         :  Manoj S
    **  Changed On         :  08-Jun-2023
    **  Change Description :  Fix for Redwood changes
    **  Search Tag         :  Redwood changes
    ********************************** END   OF LOG HISTORY **************************************

*/
//------------------------------------------------------------------------------
// VARIABLE DECLARATIONS
//------------------------------------------------------------------------------

var fcjRequestDOM;
var fcjResponseDOM;

var gErrCodes = "";

/*
 * Called to perform some neccessary operation before the fnLoad() Window event
 * Specific to the functionid
 */
function fnPreLoad() {
    debugs("In fnPreLoad", "A");
}
/*
 * Called to perform some neccessary operation after the fnNew() Window event
 * Specific to the functionid
 */
function fnPostLoad() {
    debugs("In fnPostLoad", "A");
}
/*
 * Called to perform some neccessary operation before the fnNew() Action event
 * Specific to the functionid
 */
function fnPreNew() {
    var newAction = true;
    debugs("In fnPreNew", "A");
    return newAction;
}
/*
 * Called to perform some neccessary operation after the fnNew() Action event
 * Specific to the functionid
 */
function fnPostNew() {
    debugs("In fnPostNew", "A");
}
/*
 * Called to perform some neccessary operation before the fnUlock() Action event
 * Specific to the functionid
 */
function fnPreUnlock() {
    var unlock = true;
    debugs("In fnPreUnlock", "A");
    return unlock;
}
/*
 * Called to perform some neccessary operation after the fnUlock() Action event
 * Specific to the functionid
 */
function fnPostUnlock() {
    debugs("In fnPostUnlock", "A");
}
/*
 * Called to perform some neccessary operation before the fnAuthorize() Action event
 * Specific to the functionid
 */
function fnPreAuthorize() {
    var authorize = true;
    debugs("In fnPreAuthorize", "A");
    return authorize;
}
/*
 * Called to perform some neccessary operation after the fnAuthorize() Action event
 * Specific to the functionid
 */
function fnPostAuthorize() {
    debugs("In fnPostAuthorize", "A");
}
/*
 * Called to perform some neccessary operation before the fnCopy() Action event
 * Specific to the functionid
 */
function fnPreCopy() {
    var copy = true;
    debugs("In fnPreCopy", "A");
    return copy;
}
/*
 * Called to perform some neccessary operation after the fnCopy() Action event
 * Specific to the functionid
 */
function fnPostCopy() {
    debugs("In fnPostCopy", "A");
}
/*
 * Called to perform some neccessary operation before the fnClose() Window event
 * Specific to the functionid
 */
function fnPreClose() {
    var close = true;
    debugs("In fnPreClose", "A");
    return close;
}
/*
 * Called to perform some neccessary operation after the fnClose() Window event
 * Specific to the functionid
 */
function fnPostClose() {
    debugs("In fnPostClose", "A");
}
/*
 * Called to perform some neccessary operation before the fnReOpen() Window event
 * Specific to the functionid
 */
function fnPreReOpen() {
    var reOpen = true;
    debugs("In fnPreReOpen", "A");
    return reOpen;
}
/*
 * Called to perform some neccessary operation after the fnReOpen() Window event
 * Specific to the functionid
 */
function fnPostReOpen() {
    debugs("In fnPostReOpen", "A");
}
/*
 * Called to perform some neccessary operation before the fnDelete() Action event
 * Specific to the functionid
 */
function fnPreDelete() {
    var deleteAction = true;
    debugs("In fnPreDelete", "A");
    return deleteAction;
}
/*
 * Called to perform some neccessary operation after the fnDelete() Action event
 * Specific to the functionid
 */
function fnPostDelete() {
    debugs("In fnPostDelete", "A");
}
/*
 * Called to perform some neccessary operation before the fnEnterQuery() Action event
 * Specific to the functionid
 */
function fnPreEnterQuery() {
    var execute = true;
    debugs("In fnPreEnterQuery", "A");
    return execute;
}
/*
 * Called to perform some neccessary operation after the fnEnterQuery() Action event
 * Specific to the functionid
 */
function fnPostEnterQuery() {
    debugs("In fnPostEnterQuery", "A");
}
/*
 * Called to perform some neccessary operation before the fnExecuteQuery() Action event
 * Specific to the functionid
 */
function fnPreExecuteQuery() {
    var execute = true;
    debugs("In fnPreExecuteQuery", "A");
    return execute;
}
/*
 * Called to perform some neccessary operation after the fnExecuteQuery() Action event
 * Specific to the functionid
 */
function fnPostExecuteQuery() {
    debugs("In fnPostExecuteQuery", "A");
}

/*
 * Called to perform some neccessary operation before the fnSave() Action event and
 * this function has to return a success/failure flag to fnSave function.
 * Specific to the functionid.
 */
function fnPreSave() {
    if(!fnValidate())
        return false;

    debugs("In fnPreSave", "A");
    var isValid = true;
    // Do Mandatory validations


    // Do basic datatype validations


    // Get all the Messages from Previuos Validate and now
    // display all
    if (!isValid) {
        //Call Functions in Util
        var msg = buildMessage(gErrCodes);
        alertMessage(msg);
        return false;
    }

    return isValid;
}
/*
 * Called to perform some neccessary operation after the fnSave() Action event
 * Specific to the functionid
 */
function fnPostSave() {
    debugs("In fnPostSave", "A");
}

/*
 * Before Navigating to the next/prev record.
 */
function fnPreGoToRec() {
    var navigate = true;
    return navigate;
}

/*
 * After Navigating to the next/prev record.
 */

function fnPostGoToRec() {

}

function fnSave_CVS_UDF(){
     fnSaveSubScreenData();
}

function fnExit_CVS_UDF(event){ //FCUBS11.2_Cross_Browser#1
 //FCUBS11.1 CB Changes Start
   // self.close();
fnExitSubScreen(event);
//FCUBS11.1 CB Changes End

}


function fnPostLoad_CVS_UDF(screenArgs) {

    document.getElementById("cmdAddRow_BLK_UDTBS_FUNC_UDF_UPLOAD_DETAIL").style.visibility="hidden";
    document.getElementById("cmdDelRow_BLK_UDTBS_FUNC_UDF_UPLOAD_DETAIL").style.visibility="hidden";
    document.getElementById("BTN_SINGLE_VIEW_BLK_UDTBS_FUNC_UDF_UPLOAD_DETAIL").style.visibility="hidden";

//1203_19172237  Starts
    bStrRootTableName=screenArgs['DBSTRROOTTABLENAME'];
    showData(dbStrRootTableName, 1);
    //showTabData();
//1203_19172237  Ends
setTimeout(function(){//Redwood changes
    fnsetLovDate();
},300);//Redwood changes
    if (gAction == ""){

        //disableAllElements("INPUT"); //Redwood changes commented
        //enableAllElements("BUTTON"); //Redwood changes commented
        
        disableAllElements("oj-input-text"); //Redwood changes added
        enableAllElements("oj-button"); //Redwood changes added
        
    }


}

// Function to set the lov n date to the value field.
function fnsetLovDate(){

          //var misTable1 = document.getElementById("BLK_UDTBS_FUNC_UDF_UPLOAD_DETAIL"); //Redwood changes commented
          var misTable1 = getTableObjForBlock("BLK_UDTBS_FUNC_UDF_UPLOAD_DETAIL"); //Redwood changes added
          var misRows1 = misTable1.tBodies[0].rows;
          var rowIndex = 0;

           for(var nodeIndex = 0; nodeIndex <  misRows1.length; nodeIndex++) {
            //1203_19172237  Starts
            /* if (misRows1[nodeIndex].cells[6].getElementsByTagName("INPUT")[0].value != "V"){
                 getNextSibling(misRows1[nodeIndex].cells[2].getElementsByTagName("INPUT")[0]).style.visibility="hidden";
                 //Changed for Auto_Lov fix
                 //misRows1[nodeIndex].cells[2].getElementsByTagName("INPUT")[0].setAttribute("onblur", "", 0); -- Code commented as part of Fix for bug: 17016893
                 misRows1[nodeIndex].cells[2].getElementsByTagName("INPUT")[0].onchange = "";  //1202_INTERNAL_17586672 changes
                 //misRows1[nodeIndex].cells[2].getElementsByTagName("INPUT")[0].removeAttribute('onblur');  -- Code commented as part of Fix for bug: 17016893
                 // Fix for bug: 17016893 Starts
                 misRows1[nodeIndex].cells[2].getElementsByTagName("INPUT")[0].setAttribute("onchange", "", 0);
                 misRows1[nodeIndex].cells[2].getElementsByTagName("INPUT")[0].removeAttribute('onchange');
                 // Fix for bug: 17016893 Ends
                 //Changed for Auto_Lov fix
            }*/
        
         //Fix for Bug#19678051  commented the below starts
             /* if ((misRows1[nodeIndex].cells[6].getElementsByTagName("INPUT")[0].value == "V") ||
                (misRows1[nodeIndex].cells[5].getElementsByTagName("INPUT")[0].value == "C"))            
             {
               
               document.getElementById("BLK_UDTBS_FUNC_UDF_UPLOAD_DETAIL").tBodies[0].rows[nodeIndex].cells[2].getElementsByTagName("INPUT")[0].nextSibling.setAttribute("onclick",'fn_lovfld()');
               document.getElementById("BLK_UDTBS_FUNC_UDF_UPLOAD_DETAIL").tBodies[0].rows[nodeIndex].cells[2].getElementsByTagName("INPUT")[0].nextSibling.onclick=fn_lovfld;
             }*/
             //Fix for Bug#19678051  commented the below ends
             //Fix for Bug#19678051  added starts
             
            // if ((misRows1[nodeIndex].cells[6].getElementsByTagName("INPUT")[0].value != "V") &&  //Redwood changes commented
              //  (misRows1[nodeIndex].cells[5].getElementsByTagName("INPUT")[0].value != "C")) //Redwood changes commented
//Redwood changes starts
if ((misRows1[nodeIndex].cells[6].getElementsByTagName("oj-input-text")[0].value != "V") &&
                (misRows1[nodeIndex].cells[5].getElementsByTagName("oj-input-text")[0].value != "C"))
//Redwood changes ends
                //&& (misRows1[nodeIndex].cells[5].getElementsByTagName("INPUT")[0].value != "S"))           
            {
             {
           //   misRows1[nodeIndex].cells[2].getElementsByTagName("INPUT")[0].nextSibling.style.visibility="hidden"; //Redwood changes commented
             //          misRows1[nodeIndex].cells[2].getElementsByTagName("INPUT")[0].onchange = "";         //20029766 changes - onblur to onchange //Redwood changes commented
//Redwood changes starts
 misRows1[nodeIndex].cells[2].getElementsByTagName("oj-input-text")[0].children[0].children[1].children[0].style.visibility="hidden";
                       misRows1[nodeIndex].cells[2].getElementsByTagName("oj-input-text")[0].setAttribute('onchange',"");         //20029766 changes - onblur to onchange 
//Redwood changes ends
               
                  }      
              //   misRows1[nodeIndex].cells[1].getElementsByTagName("INPUT")[0].readOnly = true;  //Redwood changes commented
                   misRows1[nodeIndex].cells[1].getElementsByTagName("oj-input-text")[0].readOnly = true; //Redwood changes added

               /*setting action on click of lov button to call function fn_lovfld()*/ 
            //   document.getElementById("BLK_UDTBS_FUNC_UDF_UPLOAD_DETAIL").tBodies[0].rows[nodeIndex].cells[2].getElementsByTagName("INPUT")[0].nextSibling.setAttribute("onclick",'fn_lovfld(event)');  //Redwood changes commented
              // document.getElementById("BLK_UDTBS_FUNC_UDF_UPLOAD_DETAIL").tBodies[0].rows[nodeIndex].cells[2].getElementsByTagName("INPUT")[0].nextSibling.onclick=fn_lovfld;  //Redwood changes commented
//Redwood changes starts
               getTableObjForBlock("BLK_UDTBS_FUNC_UDF_UPLOAD_DETAIL").tBodies[0].rows[nodeIndex].cells[2].getElementsByTagName("oj-input-text")[0].children[0].children[1].children[0].setAttribute("onclick",'fn_lovfld(event)');
               getTableObjForBlock("BLK_UDTBS_FUNC_UDF_UPLOAD_DETAIL").tBodies[0].rows[nodeIndex].cells[2].getElementsByTagName("oj-input-text")[0].children[0].children[1].children[0].onclick=fn_lovfld;
//Redwood changes ends
             }
          //  else if  ((misRows1[nodeIndex].cells[6].getElementsByTagName("INPUT")[0].value == "V") || //Redwood changes commented
            //    (misRows1[nodeIndex].cells[5].getElementsByTagName("INPUT")[0].value == "C")) //Redwood changes commented
//Redwood changes starts             
 else if  ((misRows1[nodeIndex].cells[6].getElementsByTagName("oj-input-text")[0].value == "V") ||
                (misRows1[nodeIndex].cells[5].getElementsByTagName("oj-input-text")[0].value == "C"))
//Redwood changes ends
            // || (misRows1[nodeIndex].cells[5].getElementsByTagName("INPUT")[0].value == "D"))
             {
              // misRows1[nodeIndex].cells[2].getElementsByTagName("INPUT")[0].nextSibling.style.visibility="visible"; //Redwood changes commented
               //document.getElementById("BLK_UDTBS_FUNC_UDF_UPLOAD_DETAIL").tBodies[0].rows[nodeIndex].cells[2].getElementsByTagName("INPUT")[0].nextSibling.setAttribute("onclick",'fn_lovfld(event)'); //Redwood changes commented
               //document.getElementById("BLK_UDTBS_FUNC_UDF_UPLOAD_DETAIL").tBodies[0].rows[nodeIndex].cells[2].getElementsByTagName("INPUT")[0].nextSibling.onclick=fn_lovfld; //Redwood changes commented
//Redwood changes starts  
 misRows1[nodeIndex].cells[2].getElementsByTagName("oj-input-text")[0].children[0].children[1].children[0].style.visibility="visible";
              getTableObjForBlock("BLK_UDTBS_FUNC_UDF_UPLOAD_DETAIL").tBodies[0].rows[nodeIndex].cells[2].getElementsByTagName("oj-input-text")[0].children[0].children[1].children[0].setAttribute("onclick",'fn_lovfld(event)');
              getTableObjForBlock("BLK_UDTBS_FUNC_UDF_UPLOAD_DETAIL").tBodies[0].rows[nodeIndex].cells[2].getElementsByTagName("oj-input-text")[0].children[0].children[1].children[0].onclick=fn_lovfld;
//Redwood changes ends
             }  
             //Fix for Bug#19678051  added ends
            else             
             {
              //   misRows1[nodeIndex].cells[2].getElementsByTagName("INPUT")[0].nextSibling.style.visibility="hidden"; //Redwood changes commented
         //misRows1[nodeIndex].cells[2].getElementsByTagName("INPUT")[0].onchange = ""; //Redwood changes commented
//Redwood changes starts 
misRows1[nodeIndex].cells[2].getElementsByTagName("oj-input-text")[0].children[0].children[1].children[0].style.visibility="hidden";
         misRows1[nodeIndex].cells[2].getElementsByTagName("oj-input-text")[0].setAttribute('onchange',''); 
//Redwood changes ends
            }
       //1203_19172237 ends
//            misRows1[nodeIndex].cells[1].getElementsByTagName("INPUT")[0].readOnly = true; //Redwood changes commented
              misRows1[nodeIndex].cells[1].getElementsByTagName("oj-input-text")[0].readOnly = true;  //Redwood changes added

          }

}
    
//1203_19172237  Starts
function fn_lovfld(evnt){
    var e = window.event || evnt; //Fix for Bug#19678051  added
    var currRowIndex = getRowIndex(e);    
    var rowIndex = currRowIndex - 1;
   // var tblEventRef = document.getElementById("BLK_UDTBS_FUNC_UDF_UPLOAD_DETAIL").tBodies[0];   

//Redwood changes starts
    var tblEventRef = getTableObjForBlock("BLK_UDTBS_FUNC_UDF_UPLOAD_DETAIL").tBodies[0];  
//Redwood changes ends

    var rowRef      = tblEventRef.rows;
    //var l_valtyp = rowRef[rowIndex].cells[5].getElementsByTagName("INPUT")[0].value;
    //var l_qryval = rowRef[rowIndex].cells[2].getElementsByTagName("INPUT")[0].value; //Fix for Bug#19678051  added

//Redwood changes starts
    var l_valtyp = rowRef[rowIndex].cells[5].getElementsByTagName("oj-input-text")[0].value;
    var l_qryval = rowRef[rowIndex].cells[2].getElementsByTagName("oj-input-text")[0].value; //Fix for Bug#19678051  added
//Redwood changes ends

    //var reductionFlds = "LOV!TEXT!LOV~LOV_DESC!TEXT!LOV_DESC"; // Fix for Bug#19678051  commented
    var reductionFlds; //Fix for Bug#19678051  added
    var l_lov = "";     
    var title = ""; //"List of Values"; Fix for Bug#19678051  commented
    var colHeading = ""; //"Value~Description"; Fix for Bug#19678051  commented
    var dtyp = "STRING~STRING";
    var returnfld = "FIELD_VAL"; 
    var query = "";  //Fix for Bug#19678051  added //Fix for Bug#19678051  added
    var queryFld =  "FIELD_VALUE"; //Fix for Bug#19678051  added


    
    /*l_lov = new lov(query,reductionFlds,dtyp,returnfld,title,colHeading,"Form1","FIELD_NAME!STRING","50","10","ORACLE","~"); */
    
    //Fix for Bug#19678051 
    /*switch (l_valtyp)
     {
        case "C":
            l_lov.show_lov('','','',title,colHeading, colHeading, 'CSCUFVAL', 'LOV_CUBEENTITY' );     
            break;
        default:
            l_lov.show_lov('','','',title,colHeading, colHeading, 'CSCUFVAL', 'LOV_UDF' );     
            break;
      } */
       switch (l_valtyp)
     {
            case "C":
                query = "select * from ("+l_qryval+")";             
                //reductionFlds = "LOV!TEXT!LOV"; //Bug#18187127  
                reductionFlds = "LOV!TEXT!LOV~LOV_DESC!TEXT!LOV_DESC";
                //dtyp = "STRING";
                dtyp = "STRING~STRING";
                title = "List of Values";
                colHeading = "Value~Description"; 
                returnfld = "FIELD_VAL~FIELD_DESC";
                l_lov = new lov(query,reductionFlds,dtyp,returnfld,title,colHeading,"Form1","FIELD_NAME!STRING","50","10","ORACLE","~"); //Bug#18187127 
                //l_lov.show_lov('','','',title,colHeading, colHeading, 'CSCCNFDM', 'LOV_FLD_VAL2' );     
                l_lov.show_lov('','','',title,colHeading, colHeading, 'CSCUFVAL', 'LOV_CUBEENTITY', e);      //Bug#18187127 
                break;          
          default:
          //case "V":       
                query = "select lov  from udtm_lov  where field_name= ?";
                reductionFlds = "LOV!TEXT!LOV~LOV_DESC!TEXT!FIELD_VAL_DESC";
                dtyp = "STRING~STRING";
                title = "List of Values";
                colHeading = "Value~Description";
                returnfld = "FIELD_VAL~FIELD_DESC";
                l_lov = new lov(query,reductionFlds,dtyp,returnfld,title,colHeading,"Form1","FIELD_NAME!STRING","50","10","ORACLE","~"); 
                //l_lov.show_lov('','','',title,colHeading, colHeading );
                l_lov.show_lov('','','',title,colHeading, colHeading, 'CSCUFVAL', 'LOV_UDF',e); //Bug#18187127
                break;

      } 
}
//1203_19172237 ends
