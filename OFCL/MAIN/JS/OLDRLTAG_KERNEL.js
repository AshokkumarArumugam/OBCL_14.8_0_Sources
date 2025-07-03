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
**  File Name          : OLDRLTAG_KERNEL.js
**  Purpose            : 
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : ANUSHA K
**  Last modified on   : 29-MAY-2019
**  Search string      : obcl_14.2_supp_#29835247  changes
**  Reason             : function name in js and rad are not same

**  Last Modified By   : SUDHARSHINI BALAJI
**  Last modified on   : 20-FEB-2021
**  Search string      : Bug#32206878
**  Reason             : Added code for Bug#32206878 changes

**  Last Modified By   : Mohan Pal
**  Last modified on   : 10-Mar-2023
**  Search string      : Bug#35159321
**  Reason             : added Backend DB call on click of 'Derivation' button

**  Last Modified By   : Revathi Dharmalingam
**  Last modified on   : 01-Aug-2024
**  Search string      : OBCL_14.7_SUPPORT_BUG#36828652
**  Reason             : Added code to display the proper error message popup to screen.

****************************************************************************************************************************/
function fnDerivation(){  //obcl_14.2_supp_#29835247  changes
	//function fnpopschdls(){ obcl_14.2_supp_#29835247  changes

   //STDCUENT subscreen Start
     var e = mainWin.event || e;
	currRow = getRowIndex(e);
	
	//Bug#35159321 added starts
	appendData(document.getElementById('TBLPageAll'));
	g_prev_gAction = gAction;  	
	gAction = 'DERIVATION';	
	fcjRequestDOM = buildUBSXml(); 
	fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
		if(fcjResponseDOM) 
		{
		  var msgStatus   =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
			  if (msgStatus == 'FAILURE') 
			  {
				var messageNode = selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
			  }
			  else if (msgStatus == "WARNING" ||msgStatus == "SUCCESS" )       
			  {     
				var messageNode = selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");     
			  } 
			
		  var pureXMLDOM  = fnGetDataXMLFromFCJXML(fcjResponseDOM,1);
		  setDataXML(getXMLString(pureXMLDOM));
		  showData(dbStrRootTableName, 1); 
		}  
		gAction=g_prev_gAction;
	//Bug#35159321 added ends
	
	fnSubScreenMain('OLDRLTAG', 'OLDRLTAG', 'CVS_SUBSCREEN',false);
	//STDCUENT subscreen  End

}
function fnPostLoad_CVS_SUBSCREEN_KERNEL()
{
	     getElementsByOjName("AMOUNTRULETYPE")[0].disabled =false;
		 getElementsByOjName("CCYRULETYPE")[0].disabled  =false;	 
         getElementsByOjName("BTN_DEFAULT")[0].disabled = false;
	    getElementsByOjName("BTN_EXECUTE")[0].disabled = false;
		getElementsByOjName("BTN_ERRORS")[0].disabled = false;
		getElementsByOjName("DRVAMOUNTRULE")[0].readOnly=false;
		getElementsByOjName("AMTERRTXT")[0].readOnly=false;
		getElementsByOjName("BTN_DFLT")[0].disabled = false;
	    getElementsByOjName("BTN_EXE")[0].disabled = false;
		getElementsByOjName("BTN_ERR")[0].disabled = false;
		getElementsByOjName("DRVCCYRULE")[0].readOnly=false;
		getElementsByOjName("CCYERRTXT")[0].readOnly=false;
		
return true;
}	   
function fnSetActionAmount()
{	
	if (getElementsByOjName("AMOUNTRULETYPE")[0].value == false)
	{
		//alert('Amount Rule Type Checkbox is not selected');
		showErrorAlerts('IN-HEAR-454');//NLS change -Removal of hardcoded alerts
		getElementsByOjName("BTN_DEFAULT")[0].disabled = true;
	    getElementsByOjName("BTN_EXECUTE")[0].disabled = true;
		getElementsByOjName("BTN_ERRORS")[0].disabled = true;
		getElementsByOjName("DRVAMOUNTRULE")[0].readOnly=true;
		getElementsByOjName("AMTERRTXT")[0].readOnly=true;
	}
	else
	{
		getElementsByOjName("BTN_DEFAULT")[0].disabled = false;
	    getElementsByOjName("BTN_EXECUTE")[0].disabled = false;
		getElementsByOjName("BTN_ERRORS")[0].disabled = false;
		getElementsByOjName("DRVAMOUNTRULE")[0].readOnly=false;
		getElementsByOjName("AMTERRTXT")[0].readOnly=false;
    }
	appendData(document.getElementById('TBLPageAll'));
	g_prev_gAction = gAction;  	
	gAction = 'SETACTA';	
	fcjRequestDOM = buildUBSXml(); 
	fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
		if(fcjResponseDOM) 
		{
		  var msgStatus   =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
			  if (msgStatus == 'FAILURE') 
			  {
				var messageNode = selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
			  }
			  else if (msgStatus == "WARNING" ||msgStatus == "SUCCESS" )       
			  {     
				var messageNode = selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");     
			  } 
			
		  var pureXMLDOM  = fnGetDataXMLFromFCJXML(fcjResponseDOM,1);
		  setDataXML(getXMLString(pureXMLDOM));
		  showData(dbStrRootTableName, 1); 
		}  
	  
			  if(msgStatus == 'FAILURE')
			  {
				  //OBCL_14.7_SUPPORT_BUG#36828652 Changes Starts
				  //var returnVal = displayResponse(messageNode);
				  var returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'E');
				   //OBCL_14.7_SUPPORT_BUG#36828652 Changes Ends
				  getElementsByOjName("BTN_EXECUTE")[0].disabled = true;
				  getElementsByOjName("BTN_ERRORS")[0].disabled = true;
			  }

			  if (msgStatus == "SUCCESS" )  
			  {	
				  getElementsByOjName("BTN_DEFAULT")[0].disabled = true;
				  getElementsByOjName("BTN_EXECUTE")[0].disabled = false;
				  getElementsByOjName("BTN_ERRORS")[0].disabled = true;
			  }
		   gAction=g_prev_gAction;
}

function fnSetActionCurrency()
{	
	if (getElementsByOjName("CCYRULETYPE")[0].value == false)
	{
		//alert('Currency Rule Type Checkbox is not selected');
		showErrorAlerts('IN-HEAR-455');//NLS change -Removal of hardcoded alerts
	//Bug#32206878 changes	getElementsByOjName("BTN_DEFAULT")[0].disabled = true;
	// Bug#32206878 changes   getElementsByOjName("BTN_EXECUTE")[0].disabled = true;
	//Bug#32206878 changes	getElementsByOjName("BTN_ERRORS")[0].disabled = true;
		
	    getElementsByOjName("BTN_EXE")[0].disabled = true;//Bug#32206878 changes
		getElementsByOjName("BTN_ERR")[0].disabled = true;//Bug#32206878 changes
		getElementsByOjName("DRVCCYRULE")[0].readOnly=true;
		getElementsByOjName("CCYERRTXT")[0].readOnly=true;
	}
	else
	{
//Bug#32206878 changes	getElementsByOjName("BTN_DEFAULT")[0].disabled = false;
//Bug#32206878 changes    getElementsByOjName("BTN_EXECUTE")[0].disabled = false;
//Bug#32206878 changes	getElementsByOjName("BTN_ERRORS")[0].disabled = false;
		getElementsByOjName("DRVCCYRULE")[0].readOnly=false;
		getElementsByOjName("CCYERRTXT")[0].readOnly=false;
    }
	appendData(document.getElementById('TBLPageAll'));	
	g_prev_gAction = gAction;  	
	gAction = 'SETACTC';
	fcjRequestDOM = buildUBSXml(); 
	fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
		if(fcjResponseDOM) 
		{
		  var msgStatus   =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
			  if (msgStatus == 'FAILURE') 
			  {
				var messageNode = selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
			  }
			  else if (msgStatus == "WARNING" ||msgStatus == "SUCCESS" )       
			  {     
				var messageNode = selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");     
			  } 
			
		  var pureXMLDOM  = fnGetDataXMLFromFCJXML(fcjResponseDOM,1);
		  setDataXML(getXMLString(pureXMLDOM));
		  showData(dbStrRootTableName, 1); 
		}  
	  
			  if(msgStatus == 'FAILURE')
			  {
				  //OBCL_14.7_SUPPORT_BUG#36828652 Changes Starts
				  //var returnVal = displayResponse(messageNode);
				  var returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'E');
				   //OBCL_14.7_SUPPORT_BUG#36828652 Changes Ends
				  getElementsByOjName("BTN_EXE")[0].disabled = true;
				  getElementsByOjName("BTN_ERR")[0].disabled = true;
			  }

			  if (msgStatus == "SUCCESS" )  
			  {
	//Bug#32206878 changes	 getElementsByOjName("BTN_DEFLT")[0].disabled = true;
	 getElementsByOjName("BTN_DFLT")[0].disabled = true;//Bug#32206878 changes
				  getElementsByOjName("BTN_EXE")[0].disabled = false;
				  getElementsByOjName("BTN_ERR")[0].disabled = true;	
			  }
		   gAction=g_prev_gAction;
}
function fnAmountExecute()
{     
	appendData(document.getElementById('TBLPageAll'));
	g_prev_gAction = gAction;  	
	gAction = 'EXECAMT';
	fcjRequestDOM = buildUBSXml(); 
	fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
		if(fcjResponseDOM) 
		{
		  var msgStatus   =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
			  if (msgStatus == 'FAILURE') 
			  {
				var messageNode = selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
			  }
			  else if (msgStatus == "WARNING" ||msgStatus == "SUCCESS" )       
			  {     
				var messageNode = selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");     
			  } 
			
		  var pureXMLDOM  = fnGetDataXMLFromFCJXML(fcjResponseDOM,1);
		  setDataXML(getXMLString(pureXMLDOM));
		  showData(dbStrRootTableName, 1); 
		}  
	  
			  if(msgStatus == 'FAILURE')
			  {
				  //OBCL_14.7_SUPPORT_BUG#36828652 Changes Starts
				  //var returnVal = displayResponse(messageNode);
				  var returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'E');
				   //OBCL_14.7_SUPPORT_BUG#36828652 Changes Ends
				  getElementsByOjName("BTN_DEFAULT")[0].disabled = true;
				  getElementsByOjName("BTN_EXECUTE")[0].disabled = false;
				  getElementsByOjName("BTN_ERRORS")[0].disabled = true;
			  }

			  if (msgStatus == "SUCCESS" )  
			  {
				 getElementsByOjName("BTN_DEFAULT")[0].disabled = true;
				 getElementsByOjName("BTN_EXECUTE")[0].disabled = true;
				 getElementsByOjName("BTN_ERRORS")[0].disabled = false;	
			  }
		   gAction=g_prev_gAction;
}

function fnCurrencyExecute()
{
	appendData(document.getElementById('TBLPageAll'));
	g_prev_gAction = gAction;  	
	gAction = 'EXECCCY';
	fcjRequestDOM = buildUBSXml(); 
	fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
		if(fcjResponseDOM) 
		{
		  var msgStatus   =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
			  if (msgStatus == 'FAILURE') 
			  {
				var messageNode = selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
			  }
			  else if (msgStatus == "WARNING" ||msgStatus == "SUCCESS" )       
			  {     
				var messageNode = selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");     
			  } 
			
		  var pureXMLDOM  = fnGetDataXMLFromFCJXML(fcjResponseDOM,1);
		  setDataXML(getXMLString(pureXMLDOM));
		  showData(dbStrRootTableName, 1); 
		}  
	  
			  if(msgStatus == 'FAILURE')
			  {
				  //OBCL_14.7_SUPPORT_BUG#36828652 Changes Starts
				  //var returnVal = displayResponse(messageNode);
				  var returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'E');
				   //OBCL_14.7_SUPPORT_BUG#36828652 Changes Ends
		//Bug#32206878 changes getElementsByOjName("BTN_DEFLT")[0].disabled = true;
				  getElementsByOjName("BTN_DFLT")[0].disabled = true;//Bug#32206878 changes
				  getElementsByOjName("BTN_EXE")[0].disabled = false;
				  getElementsByOjName("BTN_ERR")[0].disabled = true;
			  }

			  if (msgStatus == "SUCCESS" )  
			  {
		//Bug#32206878 changes	 getElementsByOjName("BTN_DEFLT")[0].disabled = true;
		 getElementsByOjName("BTN_DFLT")[0].disabled = true;//Bug#32206878 changes
						
				 getElementsByOjName("BTN_EXE")[0].disabled = true;
				 getElementsByOjName("BTN_ERR")[0].disabled = false;	
			  }
		   gAction=g_prev_gAction;
}

function fnAmountErrors()
{  
   appendData(document.getElementById('TBLPageAll'));
	g_prev_gAction = gAction;  	
	gAction = 'ERRSAMT';
	fcjRequestDOM = buildUBSXml(); 
	fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
		if(fcjResponseDOM) 
		{
		  var msgStatus   =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
			  if (msgStatus == 'FAILURE') 
			  {
				var messageNode = selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
			  }
			  else if (msgStatus == "WARNING" ||msgStatus == "SUCCESS" )       
			  {     
				var messageNode = selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");     
			  } 
			
		  var pureXMLDOM  = fnGetDataXMLFromFCJXML(fcjResponseDOM,1);
		  setDataXML(getXMLString(pureXMLDOM));
		  showData(dbStrRootTableName, 1); 
		}  
	  
			  if(msgStatus == 'FAILURE')
			  {
				  //OBCL_14.7_SUPPORT_BUG#36828652 Changes Starts
				  //var returnVal = displayResponse(messageNode);
				  var returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'E');
				   //OBCL_14.7_SUPPORT_BUG#36828652 Changes Ends
				  getElementsByOjName("BTN_DEFAULT")[0].disabled = true;
				  getElementsByOjName("BTN_EXECUTE")[0].disabled = true;
				  getElementsByOjName("BTN_ERRORS")[0].disabled = false;
			  }

			  if (msgStatus == "SUCCESS" )  
			  {
				getElementsByOjName("BTN_DEFAULT")[0].disabled = true;
				 getElementsByOjName("BTN_EXECUTE")[0].disabled = true;
				 getElementsByOjName("BTN_ERRORS")[0].disabled = true;	
			  }
		   gAction=g_prev_gAction;

    
}

function fnCurrencyErrors()
{
	appendData(document.getElementById('TBLPageAll'));
	g_prev_gAction = gAction;  	
	gAction = 'ERRSCCY';
	fcjRequestDOM = buildUBSXml(); 
	fcjResponseDOM = fnPost(fcjRequestDOM,servletURL,functionId);
		if(fcjResponseDOM) 
		{
		  var msgStatus   =getNodeText( selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
			  if (msgStatus == 'FAILURE') 
			  {
				var messageNode = selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
			  }
			  else if (msgStatus == "WARNING" ||msgStatus == "SUCCESS" )       
			  {     
				var messageNode = selectSingleNode(fcjResponseDOM,"FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");     
			  } 
			
		  var pureXMLDOM  = fnGetDataXMLFromFCJXML(fcjResponseDOM,1);
		  setDataXML(getXMLString(pureXMLDOM));
		  showData(dbStrRootTableName, 1); 
		}  
	  
			  if(msgStatus == 'FAILURE')
			  {
				  //OBCL_14.7_SUPPORT_BUG#36828652 Changes Starts
				  //var returnVal = displayResponse(messageNode);
				  var returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'E');
				   //OBCL_14.7_SUPPORT_BUG#36828652 Changes Ends
		//Bug#32206878 changes	 getElementsByOjName("BTN_DEFLT")[0].disabled = true;
	 getElementsByOjName("BTN_DFLT")[0].disabled = true;//Bug#32206878 changes
				 			  
				  getElementsByOjName("BTN_EXE")[0].disabled = true;
				  getElementsByOjName("BTN_ERR")[0].disabled = false;
			  }

			  if (msgStatus == "SUCCESS" )  
			  {
	//Bug#32206878 changes	getElementsByOjName("BTN_DEFLT")[0].disabled = true;
		getElementsByOjName("BTN_DFLT")[0].disabled = true;
						 
			 getElementsByOjName("BTN_EXE")[0].disabled = true;
				 getElementsByOjName("BTN_ERR")[0].disabled = true;
			  }
		   gAction=g_prev_gAction;
}