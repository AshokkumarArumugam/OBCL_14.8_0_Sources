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
**  Written by         : Neeraj.Krishna
**  Date of creation   : 01-JAN-2017
**  File Name          : FCDPRMNT_KERNEL.js
**  Purpose            : Development of OFCL_12.4.0.0.0
**  
**  CHANGE LOG
**Changed By         : Gomathi G
**Date               : 11-JUN-2020
**Change Description : To change Date format as per user preference
**Search String      : OBCL_14.3_Support_Bug#31400838

**Changed By         : Akhila Samson
**Date               : 18-MAR-2021
**Change Description : Date format.
**Search String      : Bug#31400838
****************************************************************************************************************************/
function fnPostCopy_KERNEL(){
	debugger;
	document.getElementById('BLK_PRODUCT__PRDTYP').value = 'F';
    return true;

}
 //Bug#31400838 start
 /*
//OBCL_14.3_SUPPORT_BUG#31400838 CHANGES STARTS
function fnPostNew_KERNEL(){

     fireHTMLEvent(document.getElementById("BLK_PRODUCT__PRDSTARTDT"),"onpropertychange"); 
	 return true;
  
}
//OBCL_14.3_SUPPORT_BUG#31400838 CHANGES ENDS*/
// Bug#31400838 End