/***************************************************************************************************************************
**  This source is part of the FLEXCUBE Software Product. 
**  Copyright (c) 2008 ,2016, Oracle and/or its affiliates.
**  All rights reserved.
**  
**  No part of this work may be reproduced, stored in a retrieval system, 
**  adopted or transmitted in any form or by any means, electronic, mechanical, photographic, 
**  graphic, optic recording or otherwise, translated in any language or computer language, 
**  without the prior written permission of Oracle and/or its affiliates.
**  
**  Oracle Financial Services Software Limited.
**  Oracle Park, Off Western Express Highway,
**  Goregaon (East),
**  Mumbai - 400 063,
**  India.
**  
**  Written by         : 
**  Date of creation   : 
**  File Name          : MSDRLDFN_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : Vrunda Pathare
**  Last modified on   : 07-APR-2023
**  Full Version       : REDWOOD CHANGES
**  Reason             : REDWOOD_CHANGES
****************************************************************************************************************************/
var fcjRequestDOM;
var fcjResponseDOM;
var objHTTP;



function fnPostNew_KERNEL() {

    fnDisableElement(document.getElementById("cmdAddRow_BLK_BLOCK3"));
    fnDisableElement(document.getElementById("cmdDelRow_BLK_BLOCK3"));


}


function fnPostCopy_KERNEL() {
	// var rowlength = document.getElementById("BLK_MSTM_EMS_ROUTING_RULE_DETAIL").tBodies[0].rows.length; //REDWOOD_CHANGES
	 var rowlength = getOjTableRowsLength("BLK_MSTM_EMS_ROUTING_RULE_DETAIL"); //REDWOOD_CHANGES
	 var j=0;
	 for(j=0;j<rowlength;j++)
	 {
	 
	 //if(document.getElementsByName("LOPTYPE")[j].value=="E") //REDWOOD_CHANGES
	if(getElementsByOjName("LOPTYPE")[j].value=="E")	 //REDWOOD_CHANGES
	 {
	//fnDisableElement(document.getElementsByName("LEFTOPERANT")[j]); //REDWOOD_CHANGES
	fnDisableElement(getElementsByOjName("LEFTOPERANT")[j]); //REDWOOD_CHANGES
	//getElementsByOjName("LEFTOPERANT")[checked_rownum].style.visibility = "hidden"; //REDWOOD_CHANGES  
	 }
	 
	//if(document.getElementsByName("ROPTYPE")[j].value=="E") //REDWOOD_CHANGES
	if(getElementsByOjName("ROPTYPE")[j].value=="E")	//REDWOOD_CHANGES
	 {
	//fnDisableElement(document.getElementsByName("RIGHTOPERANT")[j]); //REDWOOD_CHANGES
	fnDisableElement(getElementsByOjName("RIGHTOPERANT")[j]); //REDWOOD_CHANGES
	//getElementsByOjName("RIGHTOPERANT")[checked_rownum].style.visibility = "hidden"; //REDWOOD_CHANGES 
	 }
	 
	 }
	 
	 
		return true;
}
function fnPostUnlock_KERNEL(){
 //var rowlength = document.getElementById("BLK_MSTM_EMS_ROUTING_RULE_DETAIL").tBodies[0].rows.length; //REDWOOD_CHANGES
	var rowlength = getOjTableRowsLength("BLK_MSTM_EMS_ROUTING_RULE_DETAIL"); //REDWOOD_CHANGES
		
	var j=0;
	 for(j=0;j<rowlength;j++)
	 {
	 
	 //if(document.getElementsByName("LOPTYPE")[j].value=="E") //REDWOOD_CHANGES
	 if(getElementsByOjName("LOPTYPE")[j].value=="E") //REDWOOD_CHANGES

	 {
	//fnDisableElement(document.getElementsByName("LEFTOPERANT")[j]); //REDWOOD_CHANGES
	fnDisableElement(getElementsByOjName("LEFTOPERANT")[j]); //REDWOOD_CHANGES
	//getElementsByOjName("LEFTOPERANT")[checked_rownum].style.visibility = "hidden"; //REDWOOD_CHANGES
  
	 }
	 
	//if(document.getElementsByName("ROPTYPE")[j].value=="E") //REDWOOD_CHANGES
	if(getElementsByOjName("ROPTYPE")[j].value=="E") //REDWOOD_CHANGES

	 {
	//fnDisableElement(document.getElementsByName("RIGHTOPERANT")[j]); //REDWOOD_CHANGES
	fnDisableElement(getElementsByOjName("RIGHTOPERANT")[j]); //REDWOOD_CHANGES
	//getElementsByOjName("RIGHTOPERANT")[checked_rownum].style.visibility = "hidden"; //REDWOOD_CHANGES
 
	 }
	 
	 }
	 
	 
		return true;

}

function fnPreSave_KERNEL() {
        //var rowlength = document.getElementById("BLK_MSTM_EMS_ROUTING_RULE_DETAIL").tBodies[0].rows.length; //REDWOOD_CHANGES
		var rowlength = getOjTableRowsLength("BLK_MSTM_EMS_ROUTING_RULE_DETAIL"); //REDWOOD_CHANGES

        var LOGICALNOT="";
        var SCOPSTART;
        var LOPTYPE;
        var LEFTOPERANT;
        var OPERATO;
        var RIGHTOPERANT;
        var ROPTYPE;
        var SCOPEEND;
        var LOGICALOPERATOR;
        var LOGICALOPERATOR1;
        var Expressionbuilt = "";
        var str_scope;
        var end_scope;
        var Block_var1;
        var Block_var2;
        var LOPDATATYPE;
        var ROPDATATYPE;

        var PARAMNAME;
        var PARAMVALUE;
        var PARAMTYPE;
   
var params_string="";
var params_map ={};

var params_map_key="";
        for (var j = 0; j < rowlength; j++) {

          //  LOGICALNOT = document.getElementsByName("LOGICALNOT")[j].value;

            //SCOPSTART = document.getElementsByName("SCOPSTART")[j].value; //REDWOOD_CHANGES
			SCOPSTART = getElementsByOjName("SCOPSTART")[j].value; //REDWOOD_CHANGES
            
			//LOPTYPE = document.getElementsByName("LOPTYPE")[j].value; //REDWOOD_CHANGES
			LOPTYPE = getElementsByOjName("LOPTYPE")[j].value; //REDWOOD_CHANGES

            //LOPDATATYPE = document.getElementsByName("LOPDATATYPE")[j].value; //REDWOOD_CHANGES
            LOPDATATYPE = getElementsByOjName("LOPDATATYPE")[j].value; //REDWOOD_CHANGES
            
			//LEFTOPERANT = document.getElementsByName("LEFTOPERANT")[j].value; //REDWOOD_CHANGES
			LEFTOPERANT = getElementsByOjName("LEFTOPERANT")[j].value; //REDWOOD_CHANGES
            
			//OPERATO = document.getElementsByName("OPERATO")[j].value; //REDWOOD_CHANGES
			OPERATO = getElementsByOjName("OPERATO")[j].value; //REDWOOD_CHANGES
            
			//RIGHTOPERANT = document.getElementsByName("RIGHTOPERANT")[j].value; //REDWOOD_CHANGES
			RIGHTOPERANT = getElementsByOjName("RIGHTOPERANT")[j].value; //REDWOOD_CHANGES
            
			//ROPTYPE = document.getElementsByName("ROPTYPE")[j].value; //REDWOOD_CHANGES
			ROPTYPE = getElementsByOjName("ROPTYPE")[j].value; //REDWOOD_CHANGES
            
			//ROPDATATYPE = document.getElementsByName("ROPDATATYPE")[j].value; //REDWOOD_CHANGES
			ROPDATATYPE = getElementsByOjName("ROPDATATYPE")[j].value; //REDWOOD_CHANGES
            
			//SCOPEEND = document.getElementsByName("SCOPEEND")[j].value; //REDWOOD_CHANGES
			SCOPEEND = getElementsByOjName("SCOPEEND")[j].value; //REDWOOD_CHANGES
            
			//LOGICALOPERATOR = document.getElementsByName("LOGICALOPERATOR")[j].value; //REDWOOD_CHANGES
			LOGICALOPERATOR = getElementsByOjName("LOGICALOPERATOR")[j].value; //REDWOOD_CHANGES
			
			if (LOPTYPE == "P") {
             //   params = params + LEFTOPERANT + "#" ;
                if(!(LEFTOPERANT in params_map))
				{
				params_map[LEFTOPERANT]=LEFTOPERANT;
				}
            }
            if (ROPTYPE == "P") {
               // params = params + RIGHTOPERANT + "#";
             if(!(RIGHTOPERANT in params_map))
				{
				params_map[RIGHTOPERANT]=RIGHTOPERANT;
				}
            }
			
			   //if(!(document.getElementsByName("ROPEXP_PARAMETERS")[j].value in params_map)) //REDWOOD_CHANGES
				if(!(getElementsByOjName("ROPEXP_PARAMETERS")[j].value in params_map))				
				{
				//params_map[document.getElementsByName("ROPEXP_PARAMETERS")[j].value]=document.getElementsByName("ROPEXP_PARAMETERS")[j].value; //REDWOOD_CHANGES
				  params_map[getElementsByOjName("ROPEXP_PARAMETERS")[j].value]=getElementsByOjName("ROPEXP_PARAMETERS")[j].value; //REDWOOD_CHANGES
				
				}
				
				//if(!(document.getElementsByName("LOPEXP_PARAMETERS")[j].value in params_map)) //REDWOOD_CHANGES
				if(!(getElementsByOjName("LOPEXP_PARAMETERS")[j].value in params_map)) //REDWOOD_CHANGES

				{
				//params_map[document.getElementsByName("LOPEXP_PARAMETERS")[j].value]=document.getElementsByName("LOPEXP_PARAMETERS")[j].value; //REDWOOD_CHANGES
				  params_map[getElementsByOjName("LOPEXP_PARAMETERS")[j].value]=getElementsByOjName("LOPEXP_PARAMETERS")[j].value; //REDWOOD_CHANGES			
				}
			//params=params+document.getElementsByName("ROPEXP_PARAMETERS")[j].value+document.getElementsByName("LOPEXP_PARAMETERS")[j].value; //REDWOOD_CHANGES
            if (LOPTYPE == "P" &&   LOPDATATYPE == "S" )  {
               // Block_var1 = document.getElementsByName("LEFTOPERANT")[j].value; //REDWOOD_CHANGES
				Block_var1 = getElementsByOjName("LEFTOPERANT")[j].value; //REDWOOD_CHANGES

                LEFTOPERANT = "ValueOf"+" "+"{"+" "+ "'" + Block_var1 + "'"+" "+"}" ;
            } else if (LOPTYPE == "P" && LOPDATATYPE == "M") {
				//Block_var1 = document.getElementsByName("LEFTOPERANT")[j].value; //REDWOOD_CHANGES
				Block_var1 = getElementsByOjName("LEFTOPERANT")[j].value; //REDWOOD_CHANGES

                LEFTOPERANT = "ValueOf"+" "+"{"+" "+  Block_var1 + " "+"}" ;
			}else if( LOPTYPE == "C" &&   LOPDATATYPE == "S"  ) {
			     //Block_var1 = document.getElementsByName("LEFTOPERANT")[j].value; //REDWOOD_CHANGES
			     Block_var1 = getElementsByOjName("LEFTOPERANT")[j].value; //REDWOOD_CHANGES
                
				LEFTOPERANT =  "'" + Block_var1 + "'" ;			
			} else if(LOPTYPE == "C" && LOPDATATYPE == "M"  ) {
			     //Block_var1 = document.getElementsByName("LEFTOPERANT")[j].value; //REDWOOD_CHANGES
			     Block_var1 = getElementsByOjName("LEFTOPERANT")[j].value; //REDWOOD_CHANGES
                
				LEFTOPERANT =   Block_var1  ;			
			}

            if (ROPTYPE == "P"  &&   ROPDATATYPE == "S"  )  {
                //Block_var2 = document.getElementsByName("RIGHTOPERANT")[j].value; //REDWOOD_CHANGES
                Block_var2 = getElementsByOjName("RIGHTOPERANT")[j].value; //REDWOOD_CHANGES
                
				RIGHTOPERANT = "ValueOf"+" "+"{"+" "+"'"+ Block_var2 + "'"+" "+"}";

            }else if (ROPTYPE == "P"  && ROPDATATYPE == "M"  )  {
                //Block_var2 = document.getElementsByName("RIGHTOPERANT")[j].value; //REDWOOD_CHANGES
				Block_var2 = getElementsByOjName("RIGHTOPERANT")[j].value; //REDWOOD_CHANGES

                RIGHTOPERANT = "ValueOf"+" "+"{"+" "+ Block_var2 + " "+"}";

            }else if(ROPTYPE == "C" &&   ROPDATATYPE == "S" ){
			    //Block_var2 = document.getElementsByName("RIGHTOPERANT")[j].value; //REDWOOD_CHANGES
			    Block_var2 = getElementsByOjName("RIGHTOPERANT")[j].value; //REDWOOD_CHANGES
            
				RIGHTOPERANT = "'"+ Block_var2 + "'";
			
			}else if(ROPTYPE == "C" && ROPDATATYPE == "M"  ) {
			    //Block_var2 = document.getElementsByName("RIGHTOPERANT")[j].value; //REDWOOD_CHANGES
			    Block_var2 = getElementsByOjName("RIGHTOPERANT")[j].value; //REDWOOD_CHANGES
               
			   RIGHTOPERANT =  Block_var2 ;
			}

            if (j + 1 <= rowlength - 1) {
                //if (document.getElementsByName("LOGICALOPERATOR")[j].value == "") { //REDWOOD_CHANGES
                if (getElementsByOjName("LOGICALOPERATOR")[j].value == "") { //REDWOOD_CHANGES
                
				document.getElementById("BLK_MSTM_RULE_EXPRESSION__FINALEXPRESSION").value = "";
                    alert("Logical Operator cannot be null for the expression detail" + (j + 1));
                    return false;
                }
            } else if (j == rowlength - 1) {
                //if (document.getElementsByName("LOGICALOPERATOR")[j].value != "") { //REDWOOD_CHANGES
				  if (getElementsByOjName("LOGICALOPERATOR")[j].value != "") { //REDWOOD_CHANGES

                    document.getElementById("BLK_MSTM_RULE_EXPRESSION__FINALEXPRESSION").value = "";
                    alert("Logical Operator should be null for the expression detail" + (j + 1));
                    return false;
                }
            }
            Expressionbuilt = fn_finalExpression(Expressionbuilt, LOGICALNOT, SCOPSTART, LEFTOPERANT, OPERATO, RIGHTOPERANT, SCOPEEND, LOGICALOPERATOR);

          

            str_scope = fn_occurofchar(Expressionbuilt, "(");
            end_scope = fn_occurofchar(Expressionbuilt, ")");

//if(document.getElementsByName("LOPTYPE")[j].value!="E") //REDWOOD_CHANGES
if(getElementsByOjName("LOPTYPE")[j].value!="E") //REDWOOD_CHANGES

{
            //document.getElementsByName("LOPEXP_PARAMETERS")[j].value = ""; //REDWOOD_CHANGES
			getElementsByOjName("LOPEXP_PARAMETERS")[j].value = ""; //REDWOOD_CHANGES
}

//if(document.getElementsByName("ROPTYPE")[j].value!="E") //REDWOOD_CHANGES
if(getElementsByOjName("ROPTYPE")[j].value!="E") //REDWOOD_CHANGES

{
            //document.getElementsByName("ROPEXP_PARAMETERS")[j].value = ""; //REDWOOD_CHANGES 
			getElementsByOjName("ROPEXP_PARAMETERS")[j].value = "";  //REDWOOD_CHANGES
			
}

//if(document.getElementsByName("EXPRESSIONSECTION")[j].value=="") //REDWOOD_CHANGES
if(getElementsByOjName("EXPRESSIONSECTION")[j].value=="") //REDWOOD_CHANGES
{
            //document.getElementsByName("EXPRESSIONSECTION")[j].value = j + 1; //REDWOOD_CHANGES
			getElementsByOjName("EXPRESSIONSECTION")[j].value = j + 1; //REDWOOD_CHANGES
}


        }

      
        if (str_scope != end_scope) {
            alert('Scope is not proper');
            return false;
        }
		
		for(params_map_key in params_map)
		{
		if(params_map_key!="")
		{
		if(params_string=="")
		{
		params_string="#"+params_map[params_map_key]+"#";
		}
		else{
			params_string=params_string+params_map[params_map_key]+"#";
		
		}
		}
		}
		
		  //document.getElementsByName("CUSTOM_PARAMETERS")[0].value = params_string; //REDWOOD_CHANGES
		getElementsByOjName("CUSTOM_PARAMETERS")[0].value = params_string; //REDWOOD_CHANGES
		
		
        document.getElementById("BLK_MSTM_RULE_EXPRESSION__FINALEXPRESSION").value = Expressionbuilt;
        return true;
    }
    //function fn_populate_ropparamname starts

	
	function fn_editloperand()
	{
	setTimeout( function(){  
	 document.getElementById("BLK_MSTM_RULE_EXPRESSION__EXPRSSIONFOR").value = 'L';

	 //var rowlength = document.getElementById("BLK_MSTM_EMS_ROUTING_RULE_DETAIL").tBodies[0].rows.length;
	 var rowlength = getOjTableRowsLength("BLK_MSTM_EMS_ROUTING_RULE_DETAIL");
	 
	 var expression_split=[];
	 var count = 0;
	var checked_rownum;
	var old_expression="";
	
 	
	for (var j = 0; j < rowlength; j++) {
        //if (document.getElementById("BLK_MSTM_EMS_ROUTING_RULE_DETAIL").tBodies[0].rows[j].cells[0].getElementsByTagName("INPUT")[0].checked) { //REDWOOD_CHANGES
		if (getTableObjForBlock("BLK_MSTM_EMS_ROUTING_RULE_DETAIL").tBodies[0].rows[j].cells[0].getElementsByTagName("INPUT")[0].checked) { //REDWOOD_CHANGES

            checked_rownum = j;
            ++count;
        }

    }
	if (count > 1) {
        alert("Please select only one row");
        return false;
    } else if (count == 0) {
        alert("Please select a row");
        return false;
    }
	
	 //if (document.getElementsByName("LOPTYPE")[checked_rownum].value != "E") { //REDWOOD_CHANGES
		if (getElementsByOjName("LOPTYPE")[checked_rownum].value != "E") { //REDWOOD_CHANGES

        alert("Only left operand of Expression type is editable");
		return false;
    }
	
	//old_expression=document.getElementsByName("LEFTOPERANT")[checked_rownum].value; //REDWOOD_CHANGES
	old_expression=getElementsByOjName("LEFTOPERANT")[checked_rownum].value; //REDWOOD_CHANGES
	

	 if (old_expression != null && old_expression.indexOf("IndexOf")>=0) {
      
		//document.getElementsByName("PREDEFINEDFUNCTIONS")[0].value="I"; //REDWOOD_CHANGES
		getElementsByOjName("PREDEFINEDFUNCTIONS")[0].value="I"; //REDWOOD_CHANGES

		fn_predeffn();
		expression_split=old_expression.split(" ");
        
		//document.getElementById("BLK_BLOCK3").tBodies[0].rows[0].cells[2].getElementsByTagName("INPUT")[0].value = expression_split[2].replace(/(')/g,""); //REDWOOD_CHANGES
		getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[0].cells[2].getElementsByTagName("oj-input-text")[0].value = expression_split[2].replace(/(')/g,""); //REDWOOD_CHANGES

        //document.getElementById("BLK_BLOCK3").tBodies[0].rows[1].cells[2].getElementsByTagName("INPUT")[0].value = expression_split[4].replace(/(')/g,""); //REDWOOD_CHANGES
		getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[1].cells[2].getElementsByTagName("oj-input-text")[0].value = expression_split[4].replace(/(')/g,""); //REDWOOD_CHANGES
        
		//document.getElementById("BLK_BLOCK3").tBodies[0].rows[2].cells[2].getElementsByTagName("INPUT")[0].value = expression_split[6].replace(/(')/g,""); //REDWOOD_CHANGES
		getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[2].cells[2].getElementsByTagName("oj-input-text")[0].value = expression_split[6].replace(/(')/g,""); //REDWOOD_CHANGES

       

    } else if (old_expression != null && old_expression.indexOf("Substring")>=0) {
    
		//document.getElementsByName("PREDEFINEDFUNCTIONS")[0].value="S"; //REDWOOD_CHANGES
		getElementsByOjName("PREDEFINEDFUNCTIONS")[0].value="S"; //REDWOOD_CHANGES

		fn_predeffn();
		expression_split=old_expression.split(" ");
		//expression_split=old_expression.split("\'");
        //document.getElementById("BLK_BLOCK3").tBodies[0].rows[0].cells[2].getElementsByTagName("INPUT")[0].value = expression_split[2].replace(/(')/g,""); //REDWOOD_CHANGES
		getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[0].cells[2].getElementsByTagName("oj-input-text")[0].value = expression_split[2].replace(/(')/g,""); //REDWOOD_CHANGES
        
		//document.getElementById("BLK_BLOCK3").tBodies[0].rows[1].cells[2].getElementsByTagName("INPUT")[0].value = expression_split[4].replace(/(')/g,""); //REDWOOD_CHANGES
		getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[1].cells[2].getElementsByTagName("oj-input-text")[0].value = expression_split[4].replace(/(')/g,""); //REDWOOD_CHANGES

        //document.getElementById("BLK_BLOCK3").tBodies[0].rows[2].cells[2].getElementsByTagName("INPUT")[0].value = expression_split[6].replace(/(')/g,""); //REDWOOD_CHANGES
		getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[2].cells[2].getElementsByTagName("oj-input-text")[0].value = expression_split[6].replace(/(')/g,""); //REDWOOD_CHANGES

     

    } else if ( old_expression != null && old_expression.indexOf("Length")>=0) {

		//document.getElementsByName("PREDEFINEDFUNCTIONS")[0].value="L"; //REDWOOD_CHANGES
		getElementsByOjName("PREDEFINEDFUNCTIONS")[0].value="L"; //REDWOOD_CHANGES
		fn_predeffn();
		expression_split=old_expression.split(" ");
        //document.getElementById("BLK_BLOCK3").tBodies[0].rows[0].cells[2].getElementsByTagName("INPUT")[0].value = expression_split[2].replace(/(')/g,""); //REDWOOD_CHANGES
		getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[0].cells[2].getElementsByTagName("oj-input-text")[0].value = expression_split[2].replace(/(')/g,""); //REDWOOD_CHANGES
    } else if ( old_expression != null && old_expression.indexOf("Replace")>=0) {
		//document.getElementsByName("PREDEFINEDFUNCTIONS")[0].value="R"; //REDWOOD_CHANGES
		getTableObjForBlock("PREDEFINEDFUNCTIONS")[0].value="R"; //REDWOOD_CHANGES
		fn_predeffn();
		expression_split=old_expression.split(" ");
        //document.getElementById("BLK_BLOCK3").tBodies[0].rows[0].cells[2].getElementsByTagName("INPUT")[0].value = expression_split[2].replace(/(')/g,""); //REDWOOD_CHANGES
		getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[0].cells[2].getElementsByTagName("oj-input-text")[0].value = expression_split[2].replace(/(')/g,""); //REDWOOD_CHANGES
        
		//document.getElementById("BLK_BLOCK3").tBodies[0].rows[1].cells[2].getElementsByTagName("INPUT")[0].value = expression_split[4].replace(/(')/g,""); //REDWOOD_CHANGES
		getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[1].cells[2].getElementsByTagName("oj-input-text")[0].value = expression_split[4].replace(/(')/g,""); //REDWOOD_CHANGES
        
		//document.getElementById("BLK_BLOCK3").tBodies[0].rows[2].cells[2].getElementsByTagName("INPUT")[0].value = expression_split[6].replace(/(')/g,""); //REDWOOD_CHANGES
		getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[2].cells[2].getElementsByTagName("oj-input-text")[0].value = expression_split[6].replace(/(')/g,""); //REDWOOD_CHANGES
   
   } else if (old_expression != null && old_expression.indexOf("ReplaceAll")>=0) {
	
        //document.getElementsByName("PREDEFINEDFUNCTIONS")[0].value="RA"; //REDWOOD_CHANGES
		getElementsByOjName("PREDEFINEDFUNCTIONS")[0].value="RA"; //REDWOOD_CHANGES
		fn_predeffn();
		expression_split=old_expression.split(" ");
        //document.getElementById("BLK_BLOCK3").tBodies[0].rows[0].cells[2].getElementsByTagName("INPUT")[0].value = expression_split[2].replace(/(')/g,""); //REDWOOD_CHANGES
        getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[0].cells[2].getElementsByTagName("oj-input-text")[0].value = expression_split[2].replace(/(')/g,""); //REDWOOD_CHANGES
        
		//document.getElementById("BLK_BLOCK3").tBodies[0].rows[1].cells[2].getElementsByTagName("INPUT")[0].value = expression_split[4].replace(/(')/g,""); //REDWOOD_CHANGES
		getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[1].cells[2].getElementsByTagName("oj-input-text")[0].value = expression_split[4].replace(/(')/g,""); //REDWOOD_CHANGES
        
		//document.getElementById("BLK_BLOCK3").tBodies[0].rows[2].cells[2].getElementsByTagName("INPUT")[0].value = expression_split[6].replace(/(')/g,""); //REDWOOD_CHANGES
		getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[2].cells[2].getElementsByTagName("oj-input-text")[0].value = expression_split[6].replace(/(')/g,""); //REDWOOD_CHANGES
		
    } else if (old_expression != null && old_expression.indexOf("ToUpperCase")>=0) {
	
	    //document.getElementsByName("PREDEFINEDFUNCTIONS")[0].value="U"; //REDWOOD_CHANGES
		getElementsByOjName("PREDEFINEDFUNCTIONS")[0].value="U"; //REDWOOD_CHANGES

		fn_predeffn();
		expression_split=old_expression.split(" ");
        //document.getElementById("BLK_BLOCK3").tBodies[0].rows[0].cells[2].getElementsByTagName("INPUT")[0].value = expression_split[2].replace(/(')/g,""); //REDWOOD_CHANGES
		getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[0].cells[2].getElementsByTagName("oj-input-text")[0].value = expression_split[2].replace(/(')/g,""); //REDWOOD_CHANGES
    
    } else if (old_expression != null && old_expression.indexOf("ToLowerCase")>=0) {
	
	  //document.getElementsByName("PREDEFINEDFUNCTIONS")[0].value="O"; //REDWOOD_CHANGES
	  getElementsByOjName("PREDEFINEDFUNCTIONS")[0].value="O"; //REDWOOD_CHANGES

	  fn_predeffn();
	  expression_split=old_expression.split(" ");
      // document.getElementById("BLK_BLOCK3").tBodies[0].rows[0].cells[2].getElementsByTagName("INPUT")[0].value = expression_split[2].replace(/(')/g,""); //REDWOOD_CHANGES
      getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[0].cells[2].getElementsByTagName("oj-input-text")[0].value = expression_split[2].replace(/(')/g,""); //REDWOOD_CHANGES
		

    } else if (old_expression != null && old_expression.indexOf("Trim")>=0) {
   
	  //document.getElementsByName("PREDEFINEDFUNCTIONS")[0].value="T"; //REDWOOD_CHANGES
	  getElementsByOjName("PREDEFINEDFUNCTIONS")[0].value="T"; //REDWOOD_CHANGES
   
	  fn_predeffn();
	  expression_split=old_expression.split(" ");
      //document.getElementById("BLK_BLOCK3").tBodies[0].rows[0].cells[2].getElementsByTagName("INPUT")[0].value = expression_split[2].replace(/(')/g,""); //REDWOOD_CHANGES
	  getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[0].cells[2].getElementsByTagName("oj-input-text")[0].value = expression_split[2].replace(/(')/g,""); //REDWOOD_CHANGES
   
    }
	
		},50);  	
	}
	
	
	
	
	
	function fn_editroperand()
	{
	document.getElementById("BLK_MSTM_RULE_EXPRESSION__EXPRSSIONFOR").value='R';
	 
	 //var rowlength = document.getElementById("BLK_MSTM_EMS_ROUTING_RULE_DETAIL").tBodies[0].rows.length; //REDWOOD_CHANGES
	 var rowlength = getOjTableRowsLength("BLK_MSTM_EMS_ROUTING_RULE_DETAIL"); //REDWOOD_CHANGES
	 
	 var expression_split=[];
	 var count = 0;
	 var checked_rownum;
	 var old_expression="";
	setTimeout( function(){ 	
	 for (var j = 0; j < rowlength; j++) {
       // if (document.getElementById("BLK_MSTM_EMS_ROUTING_RULE_DETAIL").tBodies[0].rows[j].cells[0].getElementsByTagName("INPUT")[0].checked) { //REDWOOD_CHANGES
		if (getTableObjForBlock("BLK_MSTM_EMS_ROUTING_RULE_DETAIL").tBodies[0].rows[j].cells[0].getElementsByTagName("INPUT")[0].checked) { //REDWOOD_CHANGES

            checked_rownum = j;
            ++count;
        }

    }
	if (count > 1) {
        alert("Please select only one row");
        return false;
    } else if (count == 0) {
        alert("Please select a row");
        return false;
    }
	
	 //if (document.getElementsByName("ROPTYPE")[checked_rownum].value != "E") { //REDWOOD_CHANGES
		if (getElementsByOjName("ROPTYPE")[checked_rownum].value != "E") { //REDWOOD_CHANGES
		 
        alert("Only right operand of Expression type is editable");
		return false;
    }
	
	//old_expression=document.getElementsByName("RIGHTOPERANT")[checked_rownum].value; //REDWOOD_CHANGES
	old_expression=getElementsByOjName("RIGHTOPERANT")[checked_rownum].value; //REDWOOD_CHANGES
	
		},50);  
	 if (old_expression.indexOf("IndexOf")>=0) {
      
		//document.getElementsByName("PREDEFINEDFUNCTIONS")[0].value="I"; //REDWOOD_CHANGES
		getElementsByOjName("PREDEFINEDFUNCTIONS")[0].value="I"; //REDWOOD_CHANGES

		fn_predeffn();
		expression_split=old_expression.split(" ");
        //document.getElementById("BLK_BLOCK3").tBodies[0].rows[0].cells[2].getElementsByTagName("INPUT")[0].value = expression_split[2].replace(/(')/g,""); //REDWOOD_CHANGES
		getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[0].cells[2].getElementsByTagName("oj-input-text")[0].value = expression_split[2].replace(/(')/g,""); //REDWOOD_CHANGES
        
		//document.getElementById("BLK_BLOCK3").tBodies[0].rows[1].cells[2].getElementsByTagName("INPUT")[0].value = expression_split[4].replace(/(')/g,""); //REDWOOD_CHANGES
		getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[1].cells[2].getElementsByTagName("oj-input-text")[0].value = expression_split[4].replace(/(')/g,""); //REDWOOD_CHANGES
       
	   //document.getElementById("BLK_BLOCK3").tBodies[0].rows[2].cells[2].getElementsByTagName("INPUT")[0].value = expression_split[6].replace(/(')/g,""); //REDWOOD_CHANGES
		getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[2].cells[2].getElementsByTagName("oj-input-text")[0].value = expression_split[6].replace(/(')/g,""); //REDWOOD_CHANGES

       

    } else if (old_expression.indexOf("Substring")>=0) {
    
		//document.getElementsByName("PREDEFINEDFUNCTIONS")[0].value="S"; //REDWOOD_CHANGES
		getElementsByOjName("PREDEFINEDFUNCTIONS")[0].value="S"; //REDWOOD_CHANGES

		fn_predeffn();
		expression_split=old_expression.split(" ");
        //document.getElementById("BLK_BLOCK3").tBodies[0].rows[0].cells[2].getElementsByTagName("INPUT")[0].value = expression_split[2].replace(/(')/g,""); //REDWOOD_CHANGES
		getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[0].cells[2].getElementsByTagName("oj-input-text")[0].value = expression_split[2].replace(/(')/g,""); //REDWOOD_CHANGES

        //document.getElementById("BLK_BLOCK3").tBodies[0].rows[1].cells[2].getElementsByTagName("INPUT")[0].value = expression_split[4].replace(/(')/g,""); //REDWOOD_CHANGES
        getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[1].cells[2].getElementsByTagName("oj-input-text")[0].value = expression_split[4].replace(/(')/g,""); //REDWOOD_CHANGES
        
		//document.getElementById("BLK_BLOCK3").tBodies[0].rows[2].cells[2].getElementsByTagName("INPUT")[0].value = expression_split[6].replace(/(')/g,""); //REDWOOD_CHANGES
		getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[2].cells[2].getElementsByTagName("oj-input-text")[0].value = expression_split[6].replace(/(')/g,""); //REDWOOD_CHANGES

     

    } else if (old_expression.indexOf("Length")>=0) {

		//document.getElementsByName("PREDEFINEDFUNCTIONS")[0].value="L"; //REDWOOD_CHANGES
		getElementsByOjName("PREDEFINEDFUNCTIONS")[0].value="L"; //REDWOOD_CHANGES

		fn_predeffn();
		expression_split=old_expression.split(" ");
        //document.getElementById("BLK_BLOCK3").tBodies[0].rows[0].cells[2].getElementsByTagName("INPUT")[0].value = expression_split[2].replaceAll("\'",""); //REDWOOD_CHANGES
        getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[0].cells[2].getElementsByTagName("oj-input-text")[0].value = expression_split[2].replaceAll("\'",""); //REDWOOD_CHANGES

    } else if (old_expression.indexOf("Replace")>=0) {
		//document.getElementsByName("PREDEFINEDFUNCTIONS")[0].value="R"; //REDWOOD_CHANGES
		getElementsByOjName("PREDEFINEDFUNCTIONS")[0].value="R"; //REDWOOD_CHANGES
		fn_predeffn();
		expression_split=old_expression.split(" ");
        //document.getElementById("BLK_BLOCK3").tBodies[0].rows[0].cells[2].getElementsByTagName("INPUT")[0].value = expression_split[2].replace(/(')/g,""); //REDWOOD_CHANGES
        getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[0].cells[2].getElementsByTagName("oj-input-text")[0].value = expression_split[2].replace(/(')/g,""); //REDWOOD_CHANGES
        
		//document.getElementById("BLK_BLOCK3").tBodies[0].rows[1].cells[2].getElementsByTagName("INPUT")[0].value = expression_split[4].replace(/(')/g,""); //REDWOOD_CHANGES
		getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[1].cells[2].getElementsByTagName("oj-input-text")[0].value = expression_split[4].replace(/(')/g,""); //REDWOOD_CHANGES
        
		//document.getElementById("BLK_BLOCK3").tBodies[0].rows[2].cells[2].getElementsByTagName("INPUT")[0].value = expression_split[6].replace(/(')/g,""); //REDWOOD_CHANGES
		getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[2].cells[2].getElementsByTagName("oj-input-text")[0].value = expression_split[6].replace(/(')/g,""); //REDWOOD_CHANGES

    } else if (old_expression.indexOf("ReplaceAll")>=0) {
	
        //document.getElementsByName("PREDEFINEDFUNCTIONS")[0].value="RA";
		getElementsByOjName("PREDEFINEDFUNCTIONS")[0].value="RA";
		fn_predeffn();
		expression_split=old_expression.split(" ");
        //document.getElementById("BLK_BLOCK3").tBodies[0].rows[0].cells[2].getElementsByTagName("INPUT")[0].value = expression_split[2].replace(/(')/g,""); //REDWOOD_CHANGES
        getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[0].cells[2].getElementsByTagName("oj-input-text")[0].value = expression_split[2].replace(/(')/g,""); //REDWOOD_CHANGES
        
		//document.getElementById("BLK_BLOCK3").tBodies[0].rows[1].cells[2].getElementsByTagName("INPUT")[0].value = expression_split[4].replace(/(')/g,""); //REDWOOD_CHANGES
		getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[1].cells[2].getElementsByTagName("oj-input-text")[0].value = expression_split[4].replace(/(')/g,""); //REDWOOD_CHANGES

        //document.getElementById("BLK_BLOCK3").tBodies[0].rows[2].cells[2].getElementsByTagName("INPUT")[0].value = expression_split[6].replace(/(')/g,""); //REDWOOD_CHANGES
        getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[2].cells[2].getElementsByTagName("oj-input-text")[0].value = expression_split[6].replace(/(')/g,""); //REDWOOD_CHANGES
		
    } else if (old_expression.indexOf("ToUpperCase")>=0) {
	
	    //document.getElementsByName("PREDEFINEDFUNCTIONS")[0].value="U"; //REDWOOD_CHANGES
	    getElementsByOjName("PREDEFINEDFUNCTIONS")[0].value="U"; //REDWOOD_CHANGES

		fn_predeffn();
		expression_split=old_expression.split(" ");
        //document.getElementById("BLK_BLOCK3").tBodies[0].rows[0].cells[2].getElementsByTagName("INPUT")[0].value = expression_split[2].replace(/(')/g,""); //REDWOOD_CHANGES
        getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[0].cells[2].getElementsByTagName("oj-input-text")[0].value = expression_split[2].replace(/(')/g,""); //REDWOOD_CHANGES
    

    } else if (old_expression.indexOf("ToLowerCase")>=0) {
	
		//document.getElementsByName("PREDEFINEDFUNCTIONS")[0].value="O"; //REDWOOD_CHANGES
		getElementsByOjName("PREDEFINEDFUNCTIONS")[0].value="O"; //REDWOOD_CHANGES
		
		fn_predeffn();
		expression_split=old_expression.split(" ");
        //document.getElementById("BLK_BLOCK3").tBodies[0].rows[0].cells[2].getElementsByTagName("INPUT")[0].value = expression_split[2].replace(/(')/g,""); //REDWOOD_CHANGES
        getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[0].cells[2].getElementsByTagName("oj-input-text")[0].value = expression_split[2].replace(/(')/g,""); //REDWOOD_CHANGES
		
    } else if (old_expression.indexOf("Trim")>=0) {
   
		//document.getElementsByName("PREDEFINEDFUNCTIONS")[0].value="T"; //REDWOOD_CHANGES
		getElementsByOjName("PREDEFINEDFUNCTIONS")[0].value="T"; //REDWOOD_CHANGES
		
		fn_predeffn();
		expression_split=old_expression.split(" ");
        //document.getElementById("BLK_BLOCK3").tBodies[0].rows[0].cells[2].getElementsByTagName("INPUT")[0].value = expression_split[2].replace(/(')/g,""); //REDWOOD_CHANGES
        getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[0].cells[2].getElementsByTagName("oj-input-text")[0].value = expression_split[2].replace(/(')/g,""); //REDWOOD_CHANGES
   
    }
	
	
	}
	
	
	
	
	
function fn_populate_ropparamname() {
   // var rowlength = document.getElementById("BLK_MSTM_EMS_ROUTING_RULE_DETAIL").tBodies[0].rows.length; //REDWOOD_CHANGES
    var rowlength = getOjTableRowsLength("BLK_MSTM_EMS_ROUTING_RULE_DETAIL"); //REDWOOD_CHANGES

    //var rowlength_param = document.getElementById("BLK_BLOCK3").tBodies[0].rows.length; //REDWOOD_CHANGES
	var rowlength_param = getOjTableRowsLength("BLK_BLOCK3"); //REDWOOD_CHANGES

    var count = 0;
    var checked_rownum;
    var predefinedfnname;
setTimeout( function(){ 
    for (var j = 0; j < rowlength; j++) {
       // if (document.getElementById("BLK_MSTM_EMS_ROUTING_RULE_DETAIL").tBodies[0].rows[j].cells[0].getElementsByTagName("INPUT")[0].checked) { //REDWOOD_CHANGES
		if (getTableObjForBlock("BLK_MSTM_EMS_ROUTING_RULE_DETAIL").tBodies[0].rows[j].cells[0].getElementsByTagName("INPUT")[0].checked) { //REDWOOD_CHANGES

            checked_rownum = j;
            ++count;
        }

    }
 
    //if (document.getElementsByName("ROPTYPE")[checked_rownum].value == "E") { //REDWOOD_CHANGES
	if (getElementsByOjName("ROPTYPE")[checked_rownum].value == "E") { //REDWOOD_CHANGES

        //fnDisableElement(document.getElementsByName("RIGHTOPERANT")[checked_rownum]); //REDWOOD_CHANGES
        fnDisableElement(getElementsByOjName("RIGHTOPERANT")[checked_rownum]); //REDWOOD_CHANGES
		//getElementsByOjName("RIGHTOPERANT")[checked_rownum].style.visibility = "hidden"; //REDWOOD_CHANGES

    } else {
        //fnEnableElement(document.getElementsByName("RIGHTOPERANT")[checked_rownum]); //REDWOOD_CHANGES
        fnEnableElement(getElementsByOjName("RIGHTOPERANT")[checked_rownum]); //REDWOOD_CHANGES
		//getElementsByOjName("RIGHTOPERANT")[checked_rownum].style.visibility = "visible"; //REDWOOD_CHANGES

    }

},50); 
}

//function fn_populate_ropparamname ends

//fn_predeffn starts
function fn_predeffn() {
   // var rowlength = document.getElementById("BLK_MSTM_EMS_ROUTING_RULE_DETAIL").tBodies[0].rows.length; //REDWOOD_CHANGES
	var rowlength = getOjTableRowsLength("BLK_MSTM_EMS_ROUTING_RULE_DETAIL"); //REDWOOD_CHANGES
    var count = 0;
    var checked_rownum;
    var predefinedfnname;
    //var rowlength_param = document.getElementById("BLK_BLOCK3").tBodies[0].rows.length; //REDWOOD_CHANGES
    var rowlength_param = getOjTableRowsLength("BLK_BLOCK3"); //REDWOOD_CHANGES
    
	/*for (var t = 0; t < rowlength_param; t++) {
        document.getElementById("BLK_BLOCK3").deleteRow(0);
    }*/

   var rows = rowlength_param; //REDWOOD_CHANGES
   if(rows>0){
    deleteAllRows("BLK_BLOCK3");  
   }

    //predefinedfnname = document.getElementsByName("PREDEFINEDFUNCTIONS")[0].value; //REDWOOD_CHANGES
    predefinedfnname = getElementsByOjName("PREDEFINEDFUNCTIONS")[0].value; //REDWOOD_CHANGES
    
	if (predefinedfnname == "I") {


        var k = 0;

        for (var r = 0; r < 3; r++) {
            fnAddRow('BLK_BLOCK3');
        }
		setTimeout( function(){   
        //document.getElementById("BLK_BLOCK3").tBodies[0].rows[k].cells[1].getElementsByTagName("INPUT")[0].value = "Source_String"; //REDWOOD_CHANGES
        getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[k].cells[1].getElementsByTagName("oj-input-text")[0].value = "Source_String"; //REDWOOD_CHANGES
        
		//document.getElementById("BLK_BLOCK3").tBodies[0].rows[k].cells[3].getElementsByTagName("INPUT")[0].value = "Parameter"; //REDWOOD_CHANGES
		getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[k].cells[3].getElementsByTagName("oj-input-text")[0].value = "Parameter"; //REDWOOD_CHANGES


        //document.getElementById("BLK_BLOCK3").tBodies[0].rows[++k].cells[1].getElementsByTagName("INPUT")[0].value = "Search_Value"; //REDWOOD_CHANGES
        getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[++k].cells[1].getElementsByTagName("oj-input-text")[0].value = "Search_Value"; //REDWOOD_CHANGES
        
		//document.getElementById("BLK_BLOCK3").tBodies[0].rows[k].cells[3].getElementsByTagName("INPUT")[0].value = "Constant"; //REDWOOD_CHANGES
		getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[k].cells[3].getElementsByTagName("oj-input-text")[0].value = "Constant"; //REDWOOD_CHANGES

        //document.getElementById("BLK_BLOCK3").tBodies[0].rows[++k].cells[1].getElementsByTagName("INPUT")[0].value = "Start_Pos"; //REDWOOD_CHANGES
        getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[++k].cells[1].getElementsByTagName("oj-input-text")[0].value = "Start_Pos"; //REDWOOD_CHANGES

        //document.getElementById("BLK_BLOCK3").tBodies[0].rows[k].cells[3].getElementsByTagName("INPUT")[0].value = "Constant"; //REDWOOD_CHANGES
        getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[k].cells[3].getElementsByTagName("oj-input-text")[0].value = "Constant"; //REDWOOD_CHANGES
		},50);  
 } else if (predefinedfnname == "S") {

      
	  var k = 0;

        for (var r = 0; r < 3; r++) {
            fnAddRow('BLK_BLOCK3');
        }

		setTimeout( function(){      
		//document.getElementById("BLK_BLOCK3").tBodies[0].rows[k].cells[1].getElementsByTagName("INPUT")[0].value = "Source_String"; //REDWOOD_CHANGES
        getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[k].cells[1].getElementsByTagName("oj-input-text")[0].value = "Source_String"; //REDWOOD_CHANGES

        //document.getElementById("BLK_BLOCK3").tBodies[0].rows[k].cells[3].getElementsByTagName("INPUT")[0].value = "Parameter"; //REDWOOD_CHANGES
        getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[k].cells[3].getElementsByTagName("oj-input-text")[0].value = "Parameter"; //REDWOOD_CHANGES


        //document.getElementById("BLK_BLOCK3").tBodies[0].rows[++k].cells[1].getElementsByTagName("INPUT")[0].value = "Start_Pos"; //REDWOOD_CHANGES
        getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[++k].cells[1].getElementsByTagName("oj-input-text")[0].value = "Start_Pos"; //REDWOOD_CHANGES

        //document.getElementById("BLK_BLOCK3").tBodies[0].rows[k].cells[3].getElementsByTagName("INPUT")[0].value = "Constant"; //REDWOOD_CHANGES
        getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[k].cells[3].getElementsByTagName("oj-input-text")[0].value = "Constant"; //REDWOOD_CHANGES

        //document.getElementById("BLK_BLOCK3").tBodies[0].rows[++k].cells[1].getElementsByTagName("INPUT")[0].value = "End_Pos"; //REDWOOD_CHANGES
        getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[++k].cells[1].getElementsByTagName("oj-input-text")[0].value = "End_Pos"; //REDWOOD_CHANGES
       
	   //document.getElementById("BLK_BLOCK3").tBodies[0].rows[k].cells[3].getElementsByTagName("INPUT")[0].value = "Constant"; //REDWOOD_CHANGES
	   getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[k].cells[3].getElementsByTagName("oj-input-text")[0].value = "Constant"; //REDWOOD_CHANGES
		},50);  
 
	} else if (predefinedfnname == "L") {

        var k = 0;
        for (var r = 0; r < 1; r++) {
            fnAddRow('BLK_BLOCK3');
        }
        setTimeout( function(){  
		//document.getElementById("BLK_BLOCK3").tBodies[0].rows[k].cells[1].getElementsByTagName("INPUT")[0].value = "Source_String"; //REDWOOD_CHANGES
        getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[k].cells[1].getElementsByTagName("oj-input-text")[0].value = "Source_String"; //REDWOOD_CHANGES
        
        
		//document.getElementById("BLK_BLOCK3").tBodies[0].rows[k].cells[3].getElementsByTagName("INPUT")[0].value = "Parameter"; //REDWOOD_CHANGES
		getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[k].cells[3].getElementsByTagName("oj-input-text")[0].value = "Parameter"; //REDWOOD_CHANGES
		},50);  

    } else if (predefinedfnname == "R") {

        var k = 0;
        for (var r = 0; r < 3; r++) {
            fnAddRow('BLK_BLOCK3');
        }
		setTimeout( function(){  
        //document.getElementById("BLK_BLOCK3").tBodies[0].rows[k].cells[1].getElementsByTagName("INPUT")[0].value = "Source_String"; //REDWOOD_CHANGES
        getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[k].cells[1].getElementsByTagName("oj-input-text")[0].value = "Source_String"; //REDWOOD_CHANGES

        //document.getElementById("BLK_BLOCK3").tBodies[0].rows[k].cells[3].getElementsByTagName("INPUT")[0].value = "Parameter"; //REDWOOD_CHANGES
        getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[k].cells[3].getElementsByTagName("oj-input-text")[0].value = "Parameter"; //REDWOOD_CHANGES

        //document.getElementById("BLK_BLOCK3").tBodies[0].rows[++k].cells[1].getElementsByTagName("INPUT")[0].value = "Old_Char"; //REDWOOD_CHANGES
        getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[++k].cells[1].getElementsByTagName("oj-input-text")[0].value = "Old_Char"; //REDWOOD_CHANGES

        //document.getElementById("BLK_BLOCK3").tBodies[0].rows[k].cells[3].getElementsByTagName("INPUT")[0].value = "Constant"; //REDWOOD_CHANGES
        getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[k].cells[3].getElementsByTagName("oj-input-text")[0].value = "Constant"; //REDWOOD_CHANGES

        //document.getElementById("BLK_BLOCK3").tBodies[0].rows[++k].cells[1].getElementsByTagName("INPUT")[0].value = "New_Char "; //REDWOOD_CHANGES
        getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[++k].cells[1].getElementsByTagName("oj-input-text")[0].value = "New_Char "; //REDWOOD_CHANGES

        //document.getElementById("BLK_BLOCK3").tBodies[0].rows[k].cells[3].getElementsByTagName("INPUT")[0].value = "Constant"; //REDWOOD_CHANGES
        getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[k].cells[3].getElementsByTagName("oj-input-text")[0].value = "Constant"; //REDWOOD_CHANGES
		},50);  
    } else if (predefinedfnname == "RA") {

        var k = 0;
        for (var r = 0; r < 3; r++) {
            fnAddRow('BLK_BLOCK3');
        }
		setTimeout( function(){         
	   // document.getElementById("BLK_BLOCK3").tBodies[0].rows[k].cells[1].getElementsByTagName("INPUT")[0].value = "Source_String"; //REDWOOD_CHANGES
        getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[k].cells[1].getElementsByTagName("oj-input-text")[0].value = "Source_String"; //REDWOOD_CHANGES

        //document.getElementById("BLK_BLOCK3").tBodies[0].rows[k].cells[3].getElementsByTagName("INPUT")[0].value = "Parameter"; //REDWOOD_CHANGES
        getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[k].cells[3].getElementsByTagName("oj-input-text")[0].value = "Parameter"; //REDWOOD_CHANGES

        //document.getElementById("BLK_BLOCK3").tBodies[0].rows[++k].cells[1].getElementsByTagName("INPUT")[0].value = "Regex"; //REDWOOD_CHANGES
        getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[++k].cells[1].getElementsByTagName("oj-input-text")[0].value = "Regex"; //REDWOOD_CHANGES

        //document.getElementById("BLK_BLOCK3").tBodies[0].rows[k].cells[3].getElementsByTagName("INPUT")[0].value = "Constant"; //REDWOOD_CHANGES
        getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[k].cells[3].getElementsByTagName("oj-input-text")[0].value = "Constant"; //REDWOOD_CHANGES

        //document.getElementById("BLK_BLOCK3").tBodies[0].rows[++k].cells[1].getElementsByTagName("INPUT")[0].value = "Replacement_String "; //REDWOOD_CHANGES
        getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[++k].cells[1].getElementsByTagName("oj-input-text")[0].value = "Replacement_String "; //REDWOOD_CHANGES

        //document.getElementById("BLK_BLOCK3").tBodies[0].rows[k].cells[3].getElementsByTagName("INPUT")[0].value = "Constant"; //REDWOOD_CHANGES
        getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[k].cells[3].getElementsByTagName("oj-input-text")[0].value = "Constant"; //REDWOOD_CHANGES
		},50);  
    } else if (predefinedfnname == "U") {

        var k = 0;
        for (var r = 0; r < 1; r++) {
            fnAddRow('BLK_BLOCK3');
        }
        setTimeout( function(){  
		//document.getElementById("BLK_BLOCK3").tBodies[0].rows[k].cells[1].getElementsByTagName("INPUT")[0].value = "Source_String"; //REDWOOD_CHANGES
        getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[k].cells[1].getElementsByTagName("oj-input-text")[0].value = "Source_String"; //REDWOOD_CHANGES

        //document.getElementById("BLK_BLOCK3").tBodies[0].rows[k].cells[3].getElementsByTagName("INPUT")[0].value = "Parameter"; //REDWOOD_CHANGES
        getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[k].cells[3].getElementsByTagName("oj-input-text")[0].value = "Parameter"; //REDWOOD_CHANGES
		},50);  

    } else if (predefinedfnname == "O") {

        var k = 0;
        for (var r = 0; r < 1; r++) {
            fnAddRow('BLK_BLOCK3');
        }
        setTimeout( function(){  
		//document.getElementById("BLK_BLOCK3").tBodies[0].rows[k].cells[1].getElementsByTagName("INPUT")[0].value = "Source_String"; //REDWOOD_CHANGES
		getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[k].cells[1].getElementsByTagName("oj-input-text")[0].value = "Source_String"; //REDWOOD_CHANGES
        
		//document.getElementById("BLK_BLOCK3").tBodies[0].rows[k].cells[3].getElementsByTagName("INPUT")[0].value = "Parameter"; //REDWOOD_CHANGES
		getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[k].cells[3].getElementsByTagName("oj-input-text")[0].value = "Parameter"; //REDWOOD_CHANGES
		},50);  

    } else if (predefinedfnname == "T") {

        var k = 0;
        for (var r = 0; r < 1; r++) {
            fnAddRow('BLK_BLOCK3');
        }
        setTimeout( function(){  
		//document.getElementById("BLK_BLOCK3").tBodies[0].rows[k].cells[1].getElementsByTagName("INPUT")[0].value = "Source_String"; //REDWOOD_CHANGES
		getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[k].cells[1].getElementsByTagName("oj-input-text")[0].value = "Source_String"; //REDWOOD_CHANGES
        
		//document.getElementById("BLK_BLOCK3").tBodies[0].rows[k].cells[3].getElementsByTagName("INPUT")[0].value = "Parameter"; //REDWOOD_CHANGES
		getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[k].cells[3].getElementsByTagName("oj-input-text")[0].value = "Parameter"; //REDWOOD_CHANGES
		},50);  
    }

}

//fn_predeffn ends 



//function fn_populate_lopparamname starts

function fn_populate_lopparamname() {
    //var rowlength = document.getElementById("BLK_MSTM_EMS_ROUTING_RULE_DETAIL").tBodies[0].rows.length; //REDWOOD_CHANGES
	var rowlength = getOjTableRowsLength("BLK_MSTM_EMS_ROUTING_RULE_DETAIL"); //REDWOOD_CHANGES

    var count = 0;
    var checked_rownum;
    var predefinedfnname;
setTimeout( function(){   
    for (var j = 0; j < rowlength; j++) {
        //if (document.getElementById("BLK_MSTM_EMS_ROUTING_RULE_DETAIL").tBodies[0].rows[j].cells[0].getElementsByTagName("INPUT")[0].checked) { //REDWOOD_CHANGES
		if (getTableObjForBlock("BLK_MSTM_EMS_ROUTING_RULE_DETAIL").tBodies[0].rows[j].cells[0].getElementsByTagName("INPUT")[0].checked) { //REDWOOD_CHANGES

            checked_rownum = j;
            ++count;
        }

    }

    //if (document.getElementsByName("LOPTYPE")[checked_rownum].value == "E") { //REDWOOD_CHANGES
	if (getElementsByOjName("LOPTYPE")[checked_rownum].value == "E") { //REDWOOD_CHANGES

        //fnDisableElement(document.getElementsByName("LEFTOPERANT")[checked_rownum]); //REDWOOD_CHANGES
        fnDisableElement(getElementsByOjName("LEFTOPERANT")[checked_rownum]); //REDWOOD_CHANGES
		//getElementsByOjName("LEFTOPERANT")[checked_rownum].style.visibility = "hidden"; //REDWOOD_CHANGES



    } else {
        //fnEnableElement(document.getElementsByName("LEFTOPERANT")[checked_rownum]); //REDWOOD_CHANGES
        fnEnableElement(getElementsByOjName("LEFTOPERANT")[checked_rownum]); //REDWOOD_CHANGES
		//getElementsByOjName("LEFTOPERANT")[checked_rownum].style.visibility = "visible"; //REDWOOD_CHANGES
    }

},50);  
}

//function fn_populate_lopparamname ends
function fn_occurofchar(a, b) {
    Str = a;


    var matchesCount = Str.split(b).length - 1;
    return matchesCount;
}

function fn_operand_updater(PARAMVALUE, EXPRSSIONFOR, i) {
    if (EXPRSSIONFOR == "L") {
        //document.getElementsByName("LEFTOPERANT")[i].value = PARAMVALUE; //REDWOOD_CHANGES
        getElementsByOjName("LEFTOPERANT")[i].value = PARAMVALUE; //REDWOOD_CHANGES

    } else if (EXPRSSIONFOR == "R") {
        //document.getElementsByName("RIGHTOPERANT")[i].value = PARAMVALUE; //REDWOOD_CHANGES
        getElementsByOjName("RIGHTOPERANT")[i].value = PARAMVALUE; //REDWOOD_CHANGES

    }

}

function fn_finalExpression(Expressionbuilt, LOGICALNOT, SCOPSTART, LEFTOPERANT, OPERATO, RIGHTOPERANT, SCOPEEND, LOGICALOPERATOR)

{
    var space = " ";


if(Expressionbuilt=="")
{
 var total_expre =  LOGICALNOT + "" + space + SCOPSTART + space + "" + LEFTOPERANT + space + "" + OPERATO + "" + space + RIGHTOPERANT + "" + space + SCOPEEND + space + "" + LOGICALOPERATOR;
}
else{
 var total_expre = Expressionbuilt + "" + LOGICALNOT + "" + space + SCOPSTART + space + "" + LEFTOPERANT + space + "" + OPERATO + "" + space + RIGHTOPERANT + "" + space + SCOPEEND + space + "" + LOGICALOPERATOR;

}
   


    return total_expre;
}

function fn_buildExpression() {

    //var rowlength = document.getElementById("BLK_MSTM_EMS_ROUTING_RULE_DETAIL").tBodies[0].rows.length; //REDWOOD_CHANGES
	var rowlength = getOjTableRowsLength("BLK_MSTM_EMS_ROUTING_RULE_DETAIL"); //REDWOOD_CHANGES
    
	//var param_rowlength = document.getElementById("BLK_MSTM_EMS_ROUTING_RULE_DETAIL").tBodies[0].rows.length; //REDWOOD_CHANGES
	var param_rowlength = getOjTableRowsLength("BLK_MSTM_EMS_ROUTING_RULE_DETAIL"); //REDWOOD_CHANGES

    var count = 0;
    var checked_rownum;
    var builtexp;
    var param_name;
    var param_value;
    var param_type;
    var predefinef_funcname;
    var paramdef;
    var space=" ";
    //predefinef_funcname = document.getElementsByName("PREDEFINEDFUNCTIONS")[0].value; //REDWOOD_CHANGES
    predefinef_funcname = getElementsByOjName("PREDEFINEDFUNCTIONS")[0].value; //REDWOOD_CHANGES

var temp_expparam="";
setTimeout( function(){
    for (var j = 0; j < rowlength; j++) {
        //if (document.getElementById("BLK_MSTM_EMS_ROUTING_RULE_DETAIL").tBodies[0].rows[j].cells[0].getElementsByTagName("INPUT")[0].checked) { //REDWOOD_CHANGES
        if (getTableObjForBlock("BLK_MSTM_EMS_ROUTING_RULE_DETAIL").tBodies[0].rows[j].cells[0].getElementsByTagName("INPUT")[0].checked) { //REDWOOD_CHANGES

            checked_rownum = j;
            ++count;
        }

    }




    if (count > 1) {
        alert("Please select only one row");
        return false;
    } else if (count == 0) {
        alert("Please select a row");
        return false;
    }

    if (predefinef_funcname == "") {

        alert("Please choose a predefined function");
        return false;
    }


    //if (document.getElementsByName("EXPRSSIONFOR")[0].value == "L") { //REDWOOD_CHANGES
    if (getElementsByOjName("EXPRSSIONFOR")[0].value == "L") { //REDWOOD_CHANGES

        //if (document.getElementsByName("LOPTYPE")[checked_rownum].value != "E") { //REDWOOD_CHANGES
        if (getElementsByOjName("LOPTYPE")[checked_rownum].value != "E") { //REDWOOD_CHANGES

            alert("Build expression is only for expression type");
            return false;
        }

        if (predefinef_funcname == 'I' || predefinef_funcname == 'L') {
            //if (document.getElementsByName('LOPDATATYPE')[checked_rownum].value != "M") { //REDWOOD_CHANGES
            if (getElementsByOjName('LOPDATATYPE')[checked_rownum].value != "M") { //REDWOOD_CHANGES

                alert("The LOPDATATYPE should be a number for the selected pre-defined function");
                return false;
            }

        } else {
            //if (document.getElementsByName('LOPDATATYPE')[checked_rownum].value != "S") { //REDWOOD_CHANGES
            if (getElementsByOjName('LOPDATATYPE')[checked_rownum].value != "S") { //REDWOOD_CHANGES

                alert("The LOPDATATYPE should be a string for the selected pre-defined function");
                return false;
            }
        }

    //} else if (document.getElementsByName("EXPRSSIONFOR")[0].value == "R") { //REDWOOD_CHANGES
    } else if (getElementsByOjName("EXPRSSIONFOR")[0].value == "R") { //REDWOOD_CHANGES
        //if (document.getElementsByName("ROPTYPE")[checked_rownum].value != "E") { //REDWOOD_CHANGES
        if (getElementsByOjName("ROPTYPE")[checked_rownum].value != "E") { //REDWOOD_CHANGES

            alert("Build expression is only for expression type");
            return false;
        }

        if (predefinef_funcname == 'I' || predefinef_funcname == 'L') {
            //if (document.getElementsByName('ROPDATATYPE')[checked_rownum].value != "M") { //REDWOOD_CHANGES
            if (getElementsByOjName('ROPDATATYPE')[checked_rownum].value != "M") { //REDWOOD_CHANGES

                alert("The ROPDATATYPE should be a number for the selected pre-defined function");
                return false;
            }

        } else {
            //if (document.getElementsByName('ROPDATATYPE')[checked_rownum].value != "S") { //REDWOOD_CHANGES
            if (getElementsByOjName('ROPDATATYPE')[checked_rownum].value != "S") { //REDWOOD_CHANGES

                alert("The ROPDATATYPE should be a string for the selected pre-defined function");
                return false;
            }
        }

	
    }


    if (predefinef_funcname == 'I') {

        setTimeout( function(){
		//param_name1 = document.getElementById("BLK_BLOCK3").tBodies[0].rows[0].cells[1].getElementsByTagName("INPUT")[0].value; //REDWOOD_CHANGES
        param_name1 = getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[0].cells[1].getElementsByTagName("oj-input-text")[0].value; //REDWOOD_CHANGES

        //param_name2 = document.getElementById("BLK_BLOCK3").tBodies[0].rows[1].cells[1].getElementsByTagName("INPUT")[0].value; //REDWOOD_CHANGES
        param_name2 = getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[1].cells[1].getElementsByTagName("oj-input-text")[0].value; //REDWOOD_CHANGES

        //param_name3 = document.getElementById("BLK_BLOCK3").tBodies[0].rows[2].cells[1].getElementsByTagName("INPUT")[0].value; //REDWOOD_CHANGES
        param_name3 = getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[2].cells[1].getElementsByTagName("oj-input-text")[0].value; //REDWOOD_CHANGES


        //param_val1 = document.getElementById("BLK_BLOCK3").tBodies[0].rows[0].cells[2].getElementsByTagName("INPUT")[0].value; //REDWOOD_CHANGES
        param_val1 = getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[0].cells[2].getElementsByTagName("oj-input-text")[0].value; //REDWOOD_CHANGES

        //param_val2 = document.getElementById("BLK_BLOCK3").tBodies[0].rows[1].cells[2].getElementsByTagName("INPUT")[0].value; //REDWOOD_CHANGES
        param_val2 = getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[1].cells[2].getElementsByTagName("oj-input-text")[0].value; //REDWOOD_CHANGES

        //param_val3 = document.getElementById("BLK_BLOCK3").tBodies[0].rows[2].cells[2].getElementsByTagName("INPUT")[0].value; //REDWOOD_CHANGES
        param_val3 = getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[2].cells[2].getElementsByTagName("oj-input-text")[0].value; //REDWOOD_CHANGES

        //param_type1 = document.getElementById("BLK_BLOCK3").tBodies[0].rows[0].cells[3].getElementsByTagName("INPUT")[0].value; //REDWOOD_CHANGES
        param_type1 = getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[0].cells[3].getElementsByTagName("oj-input-text")[0].value; //REDWOOD_CHANGES
        
		//param_type2 = document.getElementById("BLK_BLOCK3").tBodies[0].rows[1].cells[3].getElementsByTagName("INPUT")[0].value; //REDWOOD_CHANGES
		param_type2 = getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[1].cells[3].getElementsByTagName("oj-input-text")[0].value; //REDWOOD_CHANGES
        
		//param_type3 = document.getElementById("BLK_BLOCK3").tBodies[0].rows[2].cells[3].getElementsByTagName("INPUT")[0].value; //REDWOOD_CHANGES
		param_type3 = getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[2].cells[3].getElementsByTagName("oj-input-text")[0].value; //REDWOOD_CHANGES
        
		temp_expparam =  param_val1 ;
        //   builtexp =  param_val1 + "." + "indexOf" + "(" + "\\\"" + param_val2 + "\\\"" + "," + param_val3 + ")";
        builtexp = "IndexOf" + space + "{" + space + "\'" + param_val1 + "\'" + space + "," + space + "\'" + param_val2 + "'" + space + "," + space + "\'" + param_val3 + "\'" + space + "}";
       // paramdef = "IndexOf" + "," + param_name1 + "#" + param_val1 + "#" + param_type1 + "#" + "," + param_name2 + "#" + param_val2 + "#" + param_type2 + "#" + "," + param_name3 + "#" + param_val3 + "#" + param_type3 + "#";
		},50); 

    } else if (predefinef_funcname == 'S') {

        setTimeout( function(){
		//param_name1 = document.getElementById("BLK_BLOCK3").tBodies[0].rows[0].cells[1].getElementsByTagName("INPUT")[0].value; //REDWOOD_CHANGES
        param_name1 = getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[0].cells[1].getElementsByTagName("oj-input-text")[0].value; //REDWOOD_CHANGES

        //param_name2 = document.getElementById("BLK_BLOCK3").tBodies[0].rows[1].cells[1].getElementsByTagName("INPUT")[0].value; //REDWOOD_CHANGES
        param_name2 = getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[1].cells[1].getElementsByTagName("oj-input-text")[0].value; //REDWOOD_CHANGES

        //param_name3 = document.getElementById("BLK_BLOCK3").tBodies[0].rows[2].cells[1].getElementsByTagName("INPUT")[0].value; //REDWOOD_CHANGES
        param_name3 = getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[2].cells[1].getElementsByTagName("oj-input-text")[0].value; //REDWOOD_CHANGES

        //param_val1 = document.getElementById("BLK_BLOCK3").tBodies[0].rows[0].cells[2].getElementsByTagName("INPUT")[0].value; //REDWOOD_CHANGES
        param_val1 = getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[0].cells[2].getElementsByTagName("oj-input-text")[0].value; //REDWOOD_CHANGES

        //param_val2 = document.getElementById("BLK_BLOCK3").tBodies[0].rows[1].cells[2].getElementsByTagName("INPUT")[0].value; //REDWOOD_CHANGES
        param_val2 = getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[1].cells[2].getElementsByTagName("oj-input-text")[0].value; //REDWOOD_CHANGES

        //param_val3 = document.getElementById("BLK_BLOCK3").tBodies[0].rows[2].cells[2].getElementsByTagName("INPUT")[0].value; //REDWOOD_CHANGES
        param_val3 = getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[2].cells[2].getElementsByTagName("oj-input-text")[0].value; //REDWOOD_CHANGES

        //param_type1 = document.getElementById("BLK_BLOCK3").tBodies[0].rows[0].cells[3].getElementsByTagName("INPUT")[0].value; //REDWOOD_CHANGES
        param_type1 = getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[0].cells[3].getElementsByTagName("oj-input-text")[0].value; //REDWOOD_CHANGES

        //param_type2 = document.getElementById("BLK_BLOCK3").tBodies[0].rows[1].cells[3].getElementsByTagName("INPUT")[0].value; //REDWOOD_CHANGES
        param_type2 = getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[1].cells[3].getElementsByTagName("oj-input-text")[0].value; //REDWOOD_CHANGES

        //param_type3 = document.getElementById("BLK_BLOCK3").tBodies[0].rows[2].cells[3].getElementsByTagName("INPUT")[0].value; //REDWOOD_CHANGES
        param_type3 = getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[2].cells[3].getElementsByTagName("oj-input-text")[0].value; //REDWOOD_CHANGES
        
		temp_expparam =  param_val1 ;
        //  builtexp =  param_val1 + "." + "substring" + "(" + "\\\"" + param_val2 + "\\\"" + "," + param_val3 + ")";
        builtexp = "Substring" + space + "{" + space + "\'" + param_val1 + "\'" + space + "," + space + "\'" + param_val2 + "'" + space + "," + space + "\'" + param_val3 + "\'" + space + "}";
       // paramdef = "Substring" + "," + param_name1 + "#" + param_val1 + "#" + param_type1 + "#" + "," + param_name2 + "#" + param_val2 + "#" + param_type2 + "#" + "," + param_name3 + "#" + param_val3 + "#" + param_type3 + "#";
		},50); 

    } else if (predefinef_funcname == 'L') {


        setTimeout( function(){
		//param_name1 = document.getElementById("BLK_BLOCK3").tBodies[0].rows[0].cells[1].getElementsByTagName("INPUT")[0].value; //REDWOOD_CHANGES
        param_name1 = getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[0].cells[1].getElementsByTagName("oj-input-text")[0].value; //REDWOOD_CHANGES
        
		//param_val1 = document.getElementById("BLK_BLOCK3").tBodies[0].rows[0].cells[2].getElementsByTagName("INPUT")[0].value; //REDWOOD_CHANGES
		param_val1 = getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[0].cells[2].getElementsByTagName("oj-input-text")[0].value; //REDWOOD_CHANGES
        
		//param_type1 = document.getElementById("BLK_BLOCK3").tBodies[0].rows[0].cells[3].getElementsByTagName("INPUT")[0].value; //REDWOOD_CHANGES
		param_type1 = getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[0].cells[3].getElementsByTagName("oj-input-text")[0].value; //REDWOOD_CHANGES
        
		temp_expparam =  param_val1 ;
        //builtexp =  param_val1  + "." + "length()";
        builtexp = "Length" + space + "{" + space + "\'" + param_val1 + "\'" + space + "}";
       // paramdef = "Length" + "," + param_name1 + "#" + param_val1 + "#" + param_type1 + "#";
		},50); 

    } else if (predefinef_funcname == 'R') {
        
		setTimeout( function(){
		//param_name1 = document.getElementById("BLK_BLOCK3").tBodies[0].rows[0].cells[1].getElementsByTagName("INPUT")[0].value; //REDWOOD_CHANGES
		param_name1 = getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[0].cells[1].getElementsByTagName("oj-input-text")[0].value; //REDWOOD_CHANGES
        
		//param_name2 = document.getElementById("BLK_BLOCK3").tBodies[0].rows[1].cells[1].getElementsByTagName("INPUT")[0].value; //REDWOOD_CHANGES
		param_name2 = getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[1].cells[1].getElementsByTagName("oj-input-text")[0].value; //REDWOOD_CHANGES
        
		//param_name3 = document.getElementById("BLK_BLOCK3").tBodies[0].rows[2].cells[1].getElementsByTagName("INPUT")[0].value; //REDWOOD_CHANGES
		param_name3 = getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[2].cells[1].getElementsByTagName("oj-input-text")[0].value; //REDWOOD_CHANGES

       // param_val1 = document.getElementById("BLK_BLOCK3").tBodies[0].rows[0].cells[2].getElementsByTagName("INPUT")[0].value; //REDWOOD_CHANGES
        param_val1 = getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[0].cells[2].getElementsByTagName("oj-input-text")[0].value; //REDWOOD_CHANGES
        
		//param_val2 = document.getElementById("BLK_BLOCK3").tBodies[0].rows[1].cells[2].getElementsByTagName("INPUT")[0].value; //REDWOOD_CHANGES
		param_val2 = getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[1].cells[2].getElementsByTagName("oj-input-text")[0].value; //REDWOOD_CHANGES
        
		//param_val3 = document.getElementById("BLK_BLOCK3").tBodies[0].rows[2].cells[2].getElementsByTagName("INPUT")[0].value; //REDWOOD_CHANGES
		param_val3 = getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[2].cells[2].getElementsByTagName("oj-input-text")[0].value; //REDWOOD_CHANGES

        //param_type1 = document.getElementById("BLK_BLOCK3").tBodies[0].rows[0].cells[3].getElementsByTagName("INPUT")[0].value; //REDWOOD_CHANGES
        param_type1 = getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[0].cells[3].getElementsByTagName("oj-input-text")[0].value; //REDWOOD_CHANGES
        
		//param_type2 = document.getElementById("BLK_BLOCK3").tBodies[0].rows[1].cells[3].getElementsByTagName("INPUT")[0].value; //REDWOOD_CHANGES
		param_type2 = getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[1].cells[3].getElementsByTagName("oj-input-text")[0].value; //REDWOOD_CHANGES
        
		//param_type3 = document.getElementById("BLK_BLOCK3").tBodies[0].rows[2].cells[3].getElementsByTagName("INPUT")[0].value; //REDWOOD_CHANGES
		param_type3 = getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[2].cells[3].getElementsByTagName("oj-input-text")[0].value; //REDWOOD_CHANGES
        
		temp_expparam =  param_val1 ;
        /* builtexp =  param_val1  + "." + "replace" + "(" + "\\\"" + param_val2 + "\\\"" + "," + "\\\"" + param_val3 + "\\\"" + ")";*/
        builtexp = "Replace" + space + "{" + space + "\'" + param_val1 + "\'" + space + "," + space + "\'" + param_val2 + "'" + space + "," + space + "\'" + param_val3 + "\'" + space + "}";
       // paramdef = "Replace" + "," + param_name1 + "#" + param_val1 + "#" + param_type1 + "#" + "," + param_name2 //+ "#" + param_val2 + "#" + param_type2 + "#" + "," + param_name3 + "#" + param_val3 + "#" + param_type3 + //"#";
		},50); 

    } else if (predefinef_funcname == 'RA') {

        setTimeout( function(){
		//param_name1 = document.getElementById("BLK_BLOCK3").tBodies[0].rows[0].cells[1].getElementsByTagName("INPUT")[0].value; //REDWOOD_CHANGES
        param_name1 = getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[0].cells[1].getElementsByTagName("oj-input-text")[0].value; //REDWOOD_CHANGES

        //param_name2 = document.getElementById("BLK_BLOCK3").tBodies[0].rows[1].cells[1].getElementsByTagName("INPUT")[0].value; //REDWOOD_CHANGES
        param_name2 = getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[1].cells[1].getElementsByTagName("oj-input-text")[0].value; //REDWOOD_CHANGES

        //param_name3 = document.getElementById("BLK_BLOCK3").tBodies[0].rows[2].cells[1].getElementsByTagName("INPUT")[0].value; //REDWOOD_CHANGES
        param_name3 = getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[2].cells[1].getElementsByTagName("oj-input-text")[0].value; //REDWOOD_CHANGES


        //param_val1 = document.getElementById("BLK_BLOCK3").tBodies[0].rows[0].cells[2].getElementsByTagName("INPUT")[0].value; //REDWOOD_CHANGES
        param_val1 = getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[0].cells[2].getElementsByTagName("oj-input-text")[0].value; //REDWOOD_CHANGES

        //param_val2 = document.getElementById("BLK_BLOCK3").tBodies[0].rows[1].cells[2].getElementsByTagName("INPUT")[0].value; //REDWOOD_CHANGES
        param_val2 = getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[1].cells[2].getElementsByTagName("oj-input-text")[0].value; //REDWOOD_CHANGES

        //param_val3 = document.getElementById("BLK_BLOCK3").tBodies[0].rows[2].cells[2].getElementsByTagName("INPUT")[0].value; //REDWOOD_CHANGES
        param_val3 = getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[2].cells[2].getElementsByTagName("oj-input-text")[0].value; //REDWOOD_CHANGES

        //param_type1 = document.getElementById("BLK_BLOCK3").tBodies[0].rows[0].cells[3].getElementsByTagName("INPUT")[0].value; //REDWOOD_CHANGES
        param_type1 = getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[0].cells[3].getElementsByTagName("oj-input-text")[0].value; //REDWOOD_CHANGES
        
		//param_type2 = document.getElementById("BLK_BLOCK3").tBodies[0].rows[1].cells[3].getElementsByTagName("INPUT")[0].value; //REDWOOD_CHANGES
		param_type2 = getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[1].cells[3].getElementsByTagName("oj-input-text")[0].value; //REDWOOD_CHANGES
        
		//param_type3 = document.getElementById("BLK_BLOCK3").tBodies[0].rows[2].cells[3].getElementsByTagName("INPUT")[0].value; //REDWOOD_CHANGES
		param_type3 = getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[2].cells[3].getElementsByTagName("oj-input-text")[0].value; //REDWOOD_CHANGES
		
		temp_expparam =  param_val1 ;
        /*builtexp = param_val1 + "." + "replaceAll" + "(" + "\\\"" + param_val2 + "\\\"" + "," + "\\\"" + param_val3 + "\\\"" + ")";*/

        builtexp = "ReplaceAll" + space + "{" + space + "\'" + param_val1 + "\'" + space + "," + space + "\'" + param_val2 + "'" + space + "," + space + "\'" + param_val3 + "\'" + space + "}";

     //   paramdef = "ReplaceAll" + "," + param_name1 + "#" + param_val1 + "#" + param_type1 + "#" + "," + //param_name2 + "#" + param_val2 + "#" + param_type2 + "#" + "," + param_name3 + "#" + param_val3 + "#" + //param_type3 + "#";
		},50); 

    } else if (predefinef_funcname == 'U') {
        
		setTimeout( function(){
		//param_name1 = document.getElementById("BLK_BLOCK3").tBodies[0].rows[0].cells[1].getElementsByTagName("INPUT")[0].value; //REDWOOD_CHANGES
		param_name1 = getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[0].cells[1].getElementsByTagName("oj-input-text")[0].value; //REDWOOD_CHANGES
        
		//param_val1 = document.getElementById("BLK_BLOCK3").tBodies[0].rows[0].cells[2].getElementsByTagName("INPUT")[0].value; //REDWOOD_CHANGES
		param_val1 = getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[0].cells[2].getElementsByTagName("oj-input-text")[0].value; //REDWOOD_CHANGES
        
		//param_type1 = document.getElementById("BLK_BLOCK3").tBodies[0].rows[0].cells[3].getElementsByTagName("INPUT")[0].value; //REDWOOD_CHANGES
		param_type1 = getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[0].cells[3].getElementsByTagName("oj-input-text")[0].value; //REDWOOD_CHANGES
        
		temp_expparam =  param_val1 ;

        builtexp = "ToUpperCase" + space + "{" + space + "\'" + param_val1 + "\'" + space + "}";
        //  builtexp =  param_val1 + "." + "toUpperCase()";

     //   paramdef = "toUpperCase" + "," + param_name1 + "#" + param_val1 + "#" + param_type1 + "#";
		},50); 

    } else if (predefinef_funcname == 'O') {
        setTimeout( function(){
		//param_name1 = document.getElementById("BLK_BLOCK3").tBodies[0].rows[0].cells[1].getElementsByTagName("INPUT")[0].value; //REDWOOD_CHANGES
        param_name1 = getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[0].cells[1].getElementsByTagName("oj-input-text")[0].value; //REDWOOD_CHANGES

        //param_val1 = document.getElementById("BLK_BLOCK3").tBodies[0].rows[0].cells[2].getElementsByTagName("INPUT")[0].value; //REDWOOD_CHANGES
        param_val1 = getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[0].cells[2].getElementsByTagName("oj-input-text")[0].value; //REDWOOD_CHANGES

        //param_type1 = document.getElementById("BLK_BLOCK3").tBodies[0].rows[0].cells[3].getElementsByTagName("INPUT")[0].value; //REDWOOD_CHANGES
        param_type1 = getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[0].cells[3].getElementsByTagName("oj-input-text")[0].value; //REDWOOD_CHANGES

        temp_expparam =  param_val1 ;
        //builtexp = param_val1 + "." + "toLowerCase()";
        builtexp = "ToLowerCase" + space + "{" + space + "\'" + param_val1 + "\'" + space + "}";

       // paramdef = "toLowerCase" + "," + param_name1 + "#" + param_val1 + "#" + param_type1 + "#";
		},50); 

    } else if (predefinef_funcname == 'T') {
        setTimeout( function(){
		//param_name1 = document.getElementById("BLK_BLOCK3").tBodies[0].rows[0].cells[1].getElementsByTagName("INPUT")[0].value; //REDWOOD_CHANGES
		param_name1 = getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[0].cells[1].getElementsByTagName("oj-input-text")[0].value; //REDWOOD_CHANGES
        
		//param_val1 = document.getElementById("BLK_BLOCK3").tBodies[0].rows[0].cells[2].getElementsByTagName("INPUT")[0].value; //REDWOOD_CHANGES
		param_val1 = getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[0].cells[2].getElementsByTagName("oj-input-text")[0].value; //REDWOOD_CHANGES
        
		//param_type1 = document.getElementById("BLK_BLOCK3").tBodies[0].rows[0].cells[3].getElementsByTagName("INPUT")[0].value; //REDWOOD_CHANGES
		param_type1 = getTableObjForBlock("BLK_BLOCK3").tBodies[0].rows[0].cells[3].getElementsByTagName("oj-input-text")[0].value; //REDWOOD_CHANGES
		
		temp_expparam=  param_val1 ;
        
		// builtexp =  param_val1  + "." + "trim()";
        builtexp = "Trim" + space + "{" + space + "\'" + param_val1 + "\'" + space + "}";

     //   paramdef = "trim" + "," + param_name1 + "#" + param_val1 + "#" + param_type1 + "#";
		},50); 

    }
setTimeout( function(){
    //if (document.getElementsByName("EXPRSSIONFOR")[0].value == "L") { //REDWOOD_CHANGES
	  if (getElementsByOjName("EXPRSSIONFOR")[0].value == "L") { //REDWOOD_CHANGES

		//document.getElementsByName("LOPEXP_PARAMETERS")[checked_rownum].value=temp_expparam; //REDWOOD_CHANGES
		getElementsByOjName("LOPEXP_PARAMETERS")[checked_rownum].value=temp_expparam; //REDWOOD_CHANGES
        
		//document.getElementsByName("LEFTOPERANT")[checked_rownum].value = builtexp; //REDWOOD_CHANGES
		getElementsByOjName("LEFTOPERANT")[checked_rownum].value = builtexp; //REDWOOD_CHANGES
        
    } else if (document.getElementsByName("EXPRSSIONFOR")[0].value == "R") {

		//document.getElementsByName("ROPEXP_PARAMETERS")[checked_rownum].value=temp_expparam; //REDWOOD_CHANGES
		getElementsByOjName("ROPEXP_PARAMETERS")[checked_rownum].value=temp_expparam; //REDWOOD_CHANGES
        
		//document.getElementsByName("RIGHTOPERANT")[checked_rownum].value = builtexp; //REDWOOD_CHANGES
		getElementsByOjName("RIGHTOPERANT")[checked_rownum].value = builtexp; //REDWOOD_CHANGES
  
    }
	},50);
	},50); 
}