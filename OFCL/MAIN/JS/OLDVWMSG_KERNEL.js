/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright ï¿½ 2011 ï¿½ 2016  Oracle and/or its affiliates.  All rights reserved.
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
**  File Name          : OLDVWMSG_KERNEL.js
**  Purpose            : 
**  Called From        : 

**  Last Modified By   : Kavitha Asokan
**  Last modified on   : 06-Jun-2024
**  Reason             : Width of the message preview window improved so that a good view of message is available in the preview window 
**  Search String      : Bug#36697755_Fix_1
****************************************************************************************************************************/
function fnPostLoad_KERNEL() 
{
  screenArgs =  parent.mainWin.screenArgs;
  document.getElementById("BLK_VW_MESSAGE__MESSAGE").className = '';
  document.getElementById("BLK_VW_MESSAGE__MESSAGE").style.direction = 'ltr';
  document.getElementById("BLK_VW_MESSAGE__MESSAGE").style.visibility = "visible";
  document.getElementById("BLK_VW_MESSAGE__MESSAGE").getElementsByClassName("oj-textarea-input")[0].style.border = '1px solid rgba( 22,21,19 ,.12)';
  document.getElementById("BLK_VW_MESSAGE__MESSAGE").getElementsByClassName("oj-text-field-container")[0].style.maxWidth = '50rem';  
}