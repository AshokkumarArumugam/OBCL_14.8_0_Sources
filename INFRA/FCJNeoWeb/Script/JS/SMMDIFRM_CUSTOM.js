/*----------------------------------------------------------------------------------------------------
**
** File Name    : SMMDIFRM_CUSTOM.js
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

Copyright © 2004-2013   by Oracle Financial Services Software Limited..
**  Modified By          : Neethu Sreedharan
**  Modified On          : 22-Aug-2016
**  Modified Reason      : Hook given to show the menu expanded on load and on change 
                           branch showHideVtab(e) needs to be called in SMMDIFRM_CUSTOM.js 
**  Retro Source         : 9NT1606_12_0_3_FHB_EXO-BIT_HUNGARY
**  Search String        : 9NT1606_12_2_RETRO_12_0_3_23654778
----------------------------------------------------------------------------------------------------
*/
function preSignOff() {
  mBean_required  ='N';
  return true;
}

function postSignOff() {
  return true;
}

function fnStartWebSocket(){
    return true; 
}

//9NT1606_12_2_RETRO_12_0_3_23654778 starts
function expandMenu(e){
      return true;    
}
//9NT1606_12_2_RETRO_12_0_3_23654778 ends

//TERMINAL_NAME_ENH_14.1 starts
function fnPostLogin(){
      return true;    
}
//TERMINAL_NAME_ENH_14.1 ends