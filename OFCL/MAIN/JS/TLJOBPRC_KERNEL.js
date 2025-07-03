/***************************************************************************************************************************
 **  This source is part of the FLEXCUBE Software Product.
 **  Copyright (c) 2007 ,2013, Oracle and/or its affiliates.
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
 **  Written by         :  SUSHIL PANDEY
 **  Date of creation :
 **  File Name          : TLJOBPRC_KERNEL.js
 **  Purpose            :
 **  Called From        :
 **
 ****************************************************************************************************************************/
var  currRowIndex= "";
var fcjRequestDOM;
var fcjResponseDOM;

var BRANCH_CODE= '';
var TXT_TLS_PROCESS='';
var TXT_PROCESS_NAME='';
var TXT_REF_NO= '';
var TXT_USER_ID='';
var TXT_LBTL_PROC='';
var TXT_TRADE_TLS='';
var TXT_TLS_REF_NO='';
var TXT_TLLB_IFACE='';
var TXT_REDN_HOFF='';
var TXT_TICKET_ID='';
var TXT_TR_FILE_NAME='';


function fnPostLoad_KERNEL() {
showToolbar("","","");
fnEnableElement(document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLS_PROCESS"));
fnEnableElement(document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLS_PROCESS2"));
fnEnableElement(document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLS_PROCESS3"));
fnEnableElement(document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLS_PROCESS4"));
fnEnableElement(document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLS_PROCESS5"));
fnEnableElement(document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLS_PROCESS6"));
fnEnableElement(document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLS_PROCESS7"));
fnEnableElement(document.getElementById("BLK_BRANCH_PARAMETERS__TXT_PROCESS_NAME"));
fnEnableElement(document.getElementById("BLK_BRANCH_PARAMETERS__TXT_USER_ID"));
//fnEnableElement(document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TR_FILE_NAME"));
//fnEnableElement(document.getElementById("BLK_BRANCH_PARAMETERS__BTN_RUN"));
//TLS Ref No Hidden
document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLS_REF_NO").parentElement.style.visibility = 'hidden';
document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLS_REF_NO").style.visibility = 'hidden';
document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLS_REF_NO").parentNode.style.display = "none";
document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLS_REF_NO").style.display = "none";

fnEnableElement(document.getElementById("BLK_BRANCH_PARAMETERS__TXT_REF_NO"));

//LB-TL Process LOV
document.getElementById("BLK_BRANCH_PARAMETERS__TXT_LBTL_PROC").parentElement.style.visibility = 'hidden';
document.getElementById("BLK_BRANCH_PARAMETERS__TXT_LBTL_PROC").style.visibility = 'hidden';
document.getElementById("BLK_BRANCH_PARAMETERS__TXT_LBTL_PROC").parentNode.style.display = "none";
document.getElementById("BLK_BRANCH_PARAMETERS__TXT_LBTL_PROC").style.display = "none";

//Trade Ref No 
document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TRADE_TLS").parentElement.style.visibility = 'hidden';
document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TRADE_TLS").style.visibility = 'hidden';
document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TRADE_TLS").parentNode.style.display = "none";
document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TRADE_TLS").style.display = "none";

//TL-LB IFACE
document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLLB_IFACE").parentElement.style.visibility = 'hidden';
document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLLB_IFACE").style.visibility = 'hidden';
document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLLB_IFACE").parentNode.style.display = "none";
document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLLB_IFACE").style.display = "none";

//REDN HandOff
document.getElementById("BLK_BRANCH_PARAMETERS__TXT_REDN_HOFF").parentElement.style.visibility = 'hidden';
document.getElementById("BLK_BRANCH_PARAMETERS__TXT_REDN_HOFF").style.visibility = 'hidden';
document.getElementById("BLK_BRANCH_PARAMETERS__TXT_REDN_HOFF").parentNode.style.display = "none";
document.getElementById("BLK_BRANCH_PARAMETERS__TXT_REDN_HOFF").style.display = "none";

//REDN HandOff
document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TICKET_ID").parentElement.style.visibility = 'hidden';
document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TICKET_ID").style.visibility = 'hidden';
document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TICKET_ID").parentNode.style.display = "none";
document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TICKET_ID").style.display = "none";





//BLK_BRANCH_PARAMETERS__TXT_LBTL_PROC,BLK_BRANCH_PARAMETERS__TXT_TRADE_TLS,BLK_BRANCH_PARAMETERS__TXT_TLLB_IFACE,BLK_BRANCH_PARAMETERS__TXT_REDN_HOFF
//BLK_BRANCH_PARAMETERS__TXT_TICKET_ID,BLK_BRANCH_PARAMETERS__TXT_REF_NO


return true;
}


function fnProcessTLS() {
 // var tls_process=document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLS_PROCESS").value;
 
  
  if (document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLS_PROCESS").value) {//L
      document.getElementById("BLK_BRANCH_PARAMETERS__TXT_PROCESS_NAME").value='LQTTRD';
      
      document.getElementById("BLK_BRANCH_PARAMETERS__TXT_REF_NO").parentElement.style.visibility = 'visible';
      document.getElementById("BLK_BRANCH_PARAMETERS__TXT_REF_NO").style.visibility = 'visible';
      document.getElementById("BLK_BRANCH_PARAMETERS__TXT_REF_NO").parentNode.style.display = "block"
      document.getElementById("BLK_BRANCH_PARAMETERS__TXT_REF_NO").style.display = "";
      
      //TLS Ref No Hidden
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLS_REF_NO").parentElement.style.visibility = 'hidden';
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLS_REF_NO").style.visibility = 'hidden';
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLS_REF_NO").parentNode.style.display = "none";
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLS_REF_NO").style.display = "none";

    fnEnableElement(document.getElementById("BLK_BRANCH_PARAMETERS__TXT_REF_NO"));

//LB-TL Process LOV
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_LBTL_PROC").parentElement.style.visibility = 'hidden';
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_LBTL_PROC").style.visibility = 'hidden';
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_LBTL_PROC").parentNode.style.display = "none";
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_LBTL_PROC").style.display = "none";

//Trade Ref No 
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TRADE_TLS").parentElement.style.visibility = 'hidden';
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TRADE_TLS").style.visibility = 'hidden';
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TRADE_TLS").parentNode.style.display = "none";
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TRADE_TLS").style.display = "none";

//TL-LB IFACE
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLLB_IFACE").parentElement.style.visibility = 'hidden';
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLLB_IFACE").style.visibility = 'hidden';
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLLB_IFACE").parentNode.style.display = "none";
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLLB_IFACE").style.display = "none";

//REDN HandOff
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_REDN_HOFF").parentElement.style.visibility = 'hidden';
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_REDN_HOFF").style.visibility = 'hidden';
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_REDN_HOFF").parentNode.style.display = "none";
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_REDN_HOFF").style.display = "none";

//REDN HandOff
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TICKET_ID").parentElement.style.visibility = 'hidden';
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TICKET_ID").style.visibility = 'hidden';
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TICKET_ID").parentNode.style.display = "none";
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TICKET_ID").style.display = "none";
      
      document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLS_REF_NO").value=null;
      document.getElementById("BLK_BRANCH_PARAMETERS__TXT_REF_NO").value=null;
      document.getElementById("BLK_BRANCH_PARAMETERS__TXT_LBTL_PROC").value=null;
      document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TRADE_TLS").value=null;
      document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLLB_IFACE").value=null;
      document.getElementById("BLK_BRANCH_PARAMETERS__TXT_REDN_HOFF").value=null;
      document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TICKET_ID").value=null;
      
  }else if (document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLS_PROCESS2").value){//D
      document.getElementById("BLK_BRANCH_PARAMETERS__TXT_PROCESS_NAME").value='DRFTRD';
      
      document.getElementById("BLK_BRANCH_PARAMETERS__TXT_REF_NO").parentElement.style.visibility = 'hidden';
      document.getElementById("BLK_BRANCH_PARAMETERS__TXT_REF_NO").style.visibility = 'hidden';
      document.getElementById("BLK_BRANCH_PARAMETERS__TXT_REF_NO").parentNode.style.display = "none"
      document.getElementById("BLK_BRANCH_PARAMETERS__TXT_REF_NO").style.display = "none";
      
      //TLS Ref No Hidden
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLS_REF_NO").parentElement.style.visibility = 'hidden';
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLS_REF_NO").style.visibility = 'hidden';
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLS_REF_NO").parentNode.style.display = "none";
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLS_REF_NO").style.display = "none";

   

//LB-TL Process LOV
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_LBTL_PROC").parentElement.style.visibility = 'hidden';
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_LBTL_PROC").style.visibility = 'hidden';
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_LBTL_PROC").parentNode.style.display = "none";
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_LBTL_PROC").style.display = "none";

//Trade Ref No 
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TRADE_TLS").parentElement.style.visibility = 'visible';
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TRADE_TLS").style.visibility = 'visible';
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TRADE_TLS").parentNode.style.display = "block";
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TRADE_TLS").style.display = "";

//TL-LB IFACE
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLLB_IFACE").parentElement.style.visibility = 'hidden';
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLLB_IFACE").style.visibility = 'hidden';
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLLB_IFACE").parentNode.style.display = "none";
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLLB_IFACE").style.display = "none";

//REDN HandOff
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_REDN_HOFF").parentElement.style.visibility = 'hidden';
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_REDN_HOFF").style.visibility = 'hidden';
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_REDN_HOFF").parentNode.style.display = "none";
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_REDN_HOFF").style.display = "none";

//REDN HandOff
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TICKET_ID").parentElement.style.visibility = 'hidden';
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TICKET_ID").style.visibility = 'hidden';
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TICKET_ID").parentNode.style.display = "none";
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TICKET_ID").style.display = "none";
      

      fnEnableElement(document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TRADE_TLS"));
      
      
      
      

      document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLS_REF_NO").value=null;
      document.getElementById("BLK_BRANCH_PARAMETERS__TXT_REF_NO").value=null;
      document.getElementById("BLK_BRANCH_PARAMETERS__TXT_LBTL_PROC").value=null;
      document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TRADE_TLS").value=null;
      document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLLB_IFACE").value=null;
      document.getElementById("BLK_BRANCH_PARAMETERS__TXT_REDN_HOFF").value=null;
      document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TICKET_ID").value=null;
      
  }else if (document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLS_PROCESS3").value){//S
      document.getElementById("BLK_BRANCH_PARAMETERS__TXT_PROCESS_NAME").value='LTLSPR';
      
        document.getElementById("BLK_BRANCH_PARAMETERS__TXT_REF_NO").parentElement.style.visibility = 'hidden';
      document.getElementById("BLK_BRANCH_PARAMETERS__TXT_REF_NO").style.visibility = 'hidden';
      document.getElementById("BLK_BRANCH_PARAMETERS__TXT_REF_NO").parentNode.style.display = "none"
      document.getElementById("BLK_BRANCH_PARAMETERS__TXT_REF_NO").style.display = "none";
      
      //TLS Ref No Hidden
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLS_REF_NO").parentElement.style.visibility = 'hidden';
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLS_REF_NO").style.visibility = 'hidden';
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLS_REF_NO").parentNode.style.display = "none";
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLS_REF_NO").style.display = "none";

   

//LB-TL Process LOV
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_LBTL_PROC").parentElement.style.visibility = 'hidden';
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_LBTL_PROC").style.visibility = 'hidden';
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_LBTL_PROC").parentNode.style.display = "none";
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_LBTL_PROC").style.display = "none";

//Trade Ref No 
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TRADE_TLS").parentElement.style.visibility = 'hidden';
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TRADE_TLS").style.visibility = 'hidden';
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TRADE_TLS").parentNode.style.display = "none";
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TRADE_TLS").style.display = "none";

//TL-LB IFACE
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLLB_IFACE").parentElement.style.visibility = 'visible';
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLLB_IFACE").style.visibility = 'visible';
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLLB_IFACE").parentNode.style.display = "block";
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLLB_IFACE").style.display = "";

//REDN HandOff
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_REDN_HOFF").parentElement.style.visibility = 'hidden';
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_REDN_HOFF").style.visibility = 'hidden';
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_REDN_HOFF").parentNode.style.display = "none";
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_REDN_HOFF").style.display = "none";

//REDN HandOff
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TICKET_ID").parentElement.style.visibility = 'hidden';
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TICKET_ID").style.visibility = 'hidden';
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TICKET_ID").parentNode.style.display = "none";
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TICKET_ID").style.display = "none";
      
  
      fnEnableElement(document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLLB_IFACE"));
      
      
      document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLS_REF_NO").value=null;
      document.getElementById("BLK_BRANCH_PARAMETERS__TXT_REF_NO").value=null;
      document.getElementById("BLK_BRANCH_PARAMETERS__TXT_LBTL_PROC").value=null;
      document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TRADE_TLS").value=null;
      document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLLB_IFACE").value=null;
      document.getElementById("BLK_BRANCH_PARAMETERS__TXT_REDN_HOFF").value=null;
      document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TICKET_ID").value=null;
  
  }else if (document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLS_PROCESS4").value){//C
      document.getElementById("BLK_BRANCH_PARAMETERS__TXT_PROCESS_NAME").value='CMRDHF';
      
        document.getElementById("BLK_BRANCH_PARAMETERS__TXT_REF_NO").parentElement.style.visibility = 'hidden';
      document.getElementById("BLK_BRANCH_PARAMETERS__TXT_REF_NO").style.visibility = 'hidden';
      document.getElementById("BLK_BRANCH_PARAMETERS__TXT_REF_NO").parentNode.style.display = "none"
      document.getElementById("BLK_BRANCH_PARAMETERS__TXT_REF_NO").style.display = "none";
      
      //TLS Ref No Hidden
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLS_REF_NO").parentElement.style.visibility = 'hidden';
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLS_REF_NO").style.visibility = 'hidden';
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLS_REF_NO").parentNode.style.display = "none";
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLS_REF_NO").style.display = "none";

   

//LB-TL Process LOV
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_LBTL_PROC").parentElement.style.visibility = 'hidden';
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_LBTL_PROC").style.visibility = 'hidden';
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_LBTL_PROC").parentNode.style.display = "none";
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_LBTL_PROC").style.display = "none";

//Trade Ref No 
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TRADE_TLS").parentElement.style.visibility = 'hidden';
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TRADE_TLS").style.visibility = 'hidden';
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TRADE_TLS").parentNode.style.display = "none";
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TRADE_TLS").style.display = "none";

//TL-LB IFACE
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLLB_IFACE").parentElement.style.visibility = 'hidden';
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLLB_IFACE").style.visibility = 'hidden';
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLLB_IFACE").parentNode.style.display = "none";
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLLB_IFACE").style.display = "none";

//REDN HandOff
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_REDN_HOFF").parentElement.style.visibility = 'visible';
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_REDN_HOFF").style.visibility = 'visible';
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_REDN_HOFF").parentNode.style.display = "block";
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_REDN_HOFF").style.display = "";

//REDN HandOff
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TICKET_ID").parentElement.style.visibility = 'hidden';
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TICKET_ID").style.visibility = 'hidden';
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TICKET_ID").parentNode.style.display = "none";
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TICKET_ID").style.display = "none";
      

      fnEnableElement(document.getElementById("BLK_BRANCH_PARAMETERS__TXT_REDN_HOFF"));
      
      document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLS_REF_NO").value=null;
      document.getElementById("BLK_BRANCH_PARAMETERS__TXT_REF_NO").value=null;
      document.getElementById("BLK_BRANCH_PARAMETERS__TXT_LBTL_PROC").value=null;
      document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TRADE_TLS").value=null;
      document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLLB_IFACE").value=null;
      document.getElementById("BLK_BRANCH_PARAMETERS__TXT_REDN_HOFF").value=null;
      document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TICKET_ID").value=null;
  }
  else if (document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLS_PROCESS5").value){//T
      document.getElementById("BLK_BRANCH_PARAMETERS__TXT_PROCESS_NAME").value='TRCLAS';
      
     document.getElementById("BLK_BRANCH_PARAMETERS__TXT_REF_NO").parentElement.style.visibility = 'hidden';
      document.getElementById("BLK_BRANCH_PARAMETERS__TXT_REF_NO").style.visibility = 'hidden';
      document.getElementById("BLK_BRANCH_PARAMETERS__TXT_REF_NO").parentNode.style.display = "none"
      document.getElementById("BLK_BRANCH_PARAMETERS__TXT_REF_NO").style.display = "none";
      
      //TLS Ref No Hidden
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLS_REF_NO").parentElement.style.visibility = 'hidden';
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLS_REF_NO").style.visibility = 'hidden';
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLS_REF_NO").parentNode.style.display = "none";
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLS_REF_NO").style.display = "none";

   

//LB-TL Process LOV
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_LBTL_PROC").parentElement.style.visibility = 'visible';
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_LBTL_PROC").style.visibility = 'visible';
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_LBTL_PROC").parentNode.style.display = "block";
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_LBTL_PROC").style.display = "";

//Trade Ref No 
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TRADE_TLS").parentElement.style.visibility = 'hidden';
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TRADE_TLS").style.visibility = 'hidden';
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TRADE_TLS").parentNode.style.display = "none";
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TRADE_TLS").style.display = "none";

//TL-LB IFACE
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLLB_IFACE").parentElement.style.visibility = 'hidden';
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLLB_IFACE").style.visibility = 'hidden';
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLLB_IFACE").parentNode.style.display = "none";
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLLB_IFACE").style.display = "none";

//REDN HandOff
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_REDN_HOFF").parentElement.style.visibility = 'hidden';
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_REDN_HOFF").style.visibility = 'hidden';
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_REDN_HOFF").parentNode.style.display = "none";
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_REDN_HOFF").style.display = "none";

//REDN HandOff
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TICKET_ID").parentElement.style.visibility = 'hidden';
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TICKET_ID").style.visibility = 'hidden';
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TICKET_ID").parentNode.style.display = "none";
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TICKET_ID").style.display = "none";
      

      fnEnableElement(document.getElementById("BLK_BRANCH_PARAMETERS__TXT_LBTL_PROC"));
      
      document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLS_REF_NO").value=null;
      document.getElementById("BLK_BRANCH_PARAMETERS__TXT_REF_NO").value=null;
      document.getElementById("BLK_BRANCH_PARAMETERS__TXT_LBTL_PROC").value=null;
      document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TRADE_TLS").value=null;
      document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLLB_IFACE").value=null;
      document.getElementById("BLK_BRANCH_PARAMETERS__TXT_REDN_HOFF").value=null;
      document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TICKET_ID").value=null;
  }else if (document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLS_PROCESS6").value){//K
      document.getElementById("BLK_BRANCH_PARAMETERS__TXT_PROCESS_NAME").value='TKTSTL';
      
     document.getElementById("BLK_BRANCH_PARAMETERS__TXT_REF_NO").parentElement.style.visibility = 'hidden';
      document.getElementById("BLK_BRANCH_PARAMETERS__TXT_REF_NO").style.visibility = 'hidden';
      document.getElementById("BLK_BRANCH_PARAMETERS__TXT_REF_NO").parentNode.style.display = "none"
      document.getElementById("BLK_BRANCH_PARAMETERS__TXT_REF_NO").style.display = "none";
      
      //TLS Ref No Hidden
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLS_REF_NO").parentElement.style.visibility = 'hidden';
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLS_REF_NO").style.visibility = 'hidden';
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLS_REF_NO").parentNode.style.display = "none";
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLS_REF_NO").style.display = "none";

   

//LB-TL Process LOV
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_LBTL_PROC").parentElement.style.visibility = 'hidden';
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_LBTL_PROC").style.visibility = 'hidden';
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_LBTL_PROC").parentNode.style.display = "none";
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_LBTL_PROC").style.display = "none";

//Trade Ref No 
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TRADE_TLS").parentElement.style.visibility = 'hidden';
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TRADE_TLS").style.visibility = 'hidden';
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TRADE_TLS").parentNode.style.display = "none";
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TRADE_TLS").style.display = "none";

//TL-LB IFACE
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLLB_IFACE").parentElement.style.visibility = 'hidden';
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLLB_IFACE").style.visibility = 'hidden';
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLLB_IFACE").parentNode.style.display = "none";
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLLB_IFACE").style.display = "none";

//REDN HandOff
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_REDN_HOFF").parentElement.style.visibility = 'hidden';
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_REDN_HOFF").style.visibility = 'hidden';
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_REDN_HOFF").parentNode.style.display = "none";
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_REDN_HOFF").style.display = "none";

//REDN HandOff
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TICKET_ID").parentElement.style.visibility = 'visible';
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TICKET_ID").style.visibility = 'visible';
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TICKET_ID").parentNode.style.display = "block";
    document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TICKET_ID").style.display = "";

      fnEnableElement(document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TICKET_ID"));
     
  }else{
       
      document.getElementById("BLK_BRANCH_PARAMETERS__TXT_PROCESS_NAME").value='';
      fnDisableElement(document.getElementById("BLK_BRANCH_PARAMETERS__TXT_REF_NO"));
      fnDisableElement(document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TRADE_TLS"));
      fnDisableElement(document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TICKET_ID"));
      fnDisableElement(document.getElementById("BLK_BRANCH_PARAMETERS__TXT_REDN_HOFF"));
      fnDisableElement(document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLLB_IFACE"));
      fnDisableElement(document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLS_REF_NO"));
  }
  
			
		
		
  
  return true;
	

}

function fnRun(){
	
    var g_prev_gAction = gAction;
    gAction = "RUN";

    var headerNode = '<FCUBS_REQ_ENV><FCUBS_HEADER><SOURCE/><UBSCOMP/><USERID/><BRANCH/><SERVICE/><OPERATION/><MULTITRIPID/>';
    headerNode += '<FUNCTIONID/><ACTION/><MSGSTAT/><MODULEID/><ENTITY/><MSGID/></FCUBS_HEADER><FCUBS_BODY/></FCUBS_REQ_ENV>';
    exlRequestDOM =loadXMLDoc(headerNode);
    setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/SOURCE"), "FLEXCUBE");
    setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/UBSCOMP"), "FCUBS");
    setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/USERID"),mainWin.UserId);
    setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/BRANCH"), mainWin.CurrentBranch);
    setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/FUNCTIONID"), "TLJOBPRC");
    setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/ACTION"),gAction);
    setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/MODULEID"),"TL");
    setNodeText(selectSingleNode(exlRequestDOM,"FCUBS_REQ_ENV/FCUBS_HEADER/ENTITY"),mainWin.entity);

    var bodyReq = fnPrepareBody();
    
    
    var node = selectSingleNode(exlRequestDOM,"//FCUBS_BODY");
    node.parentNode.replaceChild(bodyReq.cloneNode(true), node);
    fcjResponseDOM = fnPost(exlRequestDOM, servletURL, functionId);
    if (fcjResponseDOM) 
	{
        var msgStatus = getNodeText(selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_HEADER/MSGSTAT"));
        if (msgStatus == "FAILURE") 
		{
            var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_ERROR_RESP");
        } 
		else if (msgStatus == "WARNING" || msgStatus == "SUCCESS") 
		{
              var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
        }
    }
	var pureXMLDOM = fnGetDataXMLFromFCJXML(fcjResponseDOM, 1);
	setDataXML(getXMLString(pureXMLDOM));
	showData(dbStrRootTableName, 1);
    
    if (msgStatus == "FAILURE") 
	{
        var returnVal = displayResponse(getXMLString(messageNode), msgStatus, 'E');
        return false;
    }
	//OFCL_12.3.0.0.0_25096590 changes starts
	else if (msgStatus == "WARNING" )
			{
				var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
				var returnVal = displayResponse(getXMLString(messageNode), msgStatus, "O", "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
	}else if(msgStatus=="SUCCESS"){
                           var messageNode = selectSingleNode(fcjResponseDOM, "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
                            var returnVal = displayResponse(getXMLString(messageNode), msgStatus, "I", "FCUBS_RES_ENV/FCUBS_BODY/FCUBS_WARNING_RESP");
        }
    return true;
        
}

function fnPrepareBody() {
        var msgxml_ftclose = "<FCUBS_BODY>";
            msgxml_ftclose += '    <FLD>'; 
            msgxml_ftclose += '      <FN PARENT="" RELATION_TYPE="1" TYPE="BLK_BRANCH_PARAMETERS">BRANCH_CODE~TXT_TLS_PROCESS~TXT_PROCESS_NAME~TXT_REF_NO~TXT_USER_ID~TXT_TR_FILE_NAME~TXT_LBTL_PROC~TXT_TRADE_TLS~TXT_TLS_REF_NO~TXT_TLLB_IFACE~TXT_REDN_HOFF~TXT_TICKET_ID</FN>';                        
            msgxml_ftclose += '    </FLD>';
            msgxml_ftclose += '<REC RECID="1" TYPE="BLK_BRANCH_PARAMETERS"><FV/></REC></FCUBS_BODY>';
    reqDom=loadXMLDoc(msgxml_ftclose);
    fnGetScreenData();
    var blkCdtSecNd = "";
    var blkCdtSecNd = reqDom.createCDATASection("~"+TXT_TLS_PROCESS+"~"+TXT_PROCESS_NAME+"~"+TXT_REF_NO+"~"+TXT_USER_ID+"~"+TXT_TR_FILE_NAME+"~"+TXT_LBTL_PROC+"~"+TXT_TRADE_TLS+"~"+TXT_TLS_REF_NO+"~"+TXT_TLLB_IFACE+"~"+TXT_REDN_HOFF+"~"+TXT_TICKET_ID);
    selectSingleNode(selectSingleNode(reqDom,"//REC[@RECID='1'][@TYPE='BLK_BRANCH_PARAMETERS']"),"FV").appendChild(blkCdtSecNd);
    return selectSingleNode(reqDom,"//FCUBS_BODY");

}

function fnGetScreenData(){
    
    if(document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLS_PROCESS").value){
         TXT_TLS_PROCESS=document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLS_PROCESS").value;
    }else if (document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLS_PROCESS2").value){
         TXT_TLS_PROCESS=document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLS_PROCESS2").value;
    }else if (document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLS_PROCESS3").value){
         TXT_TLS_PROCESS=document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLS_PROCESS3").value;
    }else if (document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLS_PROCESS4").value){
         TXT_TLS_PROCESS=document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLS_PROCESS4").value;
    }else if (document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLS_PROCESS5").value){
         TXT_TLS_PROCESS=document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLS_PROCESS5").value;
    }else if (document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLS_PROCESS6").value){
         TXT_TLS_PROCESS=document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLS_PROCESS6").value;
    }else if (document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLS_PROCESS7").value){
         TXT_TLS_PROCESS=document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLS_PROCESS7").value;
    }
   
    TXT_PROCESS_NAME=document.getElementById("BLK_BRANCH_PARAMETERS__TXT_PROCESS_NAME").value;
    TXT_REF_NO=document.getElementById("BLK_BRANCH_PARAMETERS__TXT_REF_NO").value;
    TXT_USER_ID=document.getElementById("BLK_BRANCH_PARAMETERS__TXT_USER_ID").value;
    TXT_LBTL_PROC=document.getElementById("BLK_BRANCH_PARAMETERS__TXT_LBTL_PROC").value;
    TXT_TRADE_TLS=document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TRADE_TLS").value;
    TXT_TLS_REF_NO=document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLS_REF_NO").value;
    TXT_TLLB_IFACE=document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TLLB_IFACE").value;
    TXT_REDN_HOFF=document.getElementById("BLK_BRANCH_PARAMETERS__TXT_REDN_HOFF").value;
    TXT_TICKET_ID=document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TICKET_ID").value;
    TXT_TR_FILE_NAME=document.getElementById("BLK_BRANCH_PARAMETERS__TXT_TR_FILE_NAME").value;
}


function fnUserChange(){
    
    fnEnableElement(document.getElementById("BLK_BRANCH_PARAMETERS__BTN_RUN"));
    return true;
   
}



