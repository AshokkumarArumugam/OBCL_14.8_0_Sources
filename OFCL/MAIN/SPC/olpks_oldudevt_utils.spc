CREATE OR REPLACE PACKAGE olpks_oldudevt_utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_oldudevt_kernel.spc
  **
  ** Module     : UD
  **
  ** This source is part of the Oracle Banking Software Product.
  ** Oracle Banking Corporate Lending  Software Product.   Copyright © 2018.  All rights reserved
  **
  **
  ** No part of this work may be reproduced, stored in a retrieval system, adopted
  ** or transmitted in any form or by any means, electronic, mechanical,
  ** photographic, graphic, optic recording or otherwise, translated in any
  ** language or computer language, without the prior written permission of
  ** Oracle and/or its affiliates.
  **
  ** Oracle Financial Services Software Limited.
  ** Oracle Park, Off Western Express Highway,
  ** Goregaon (East),
  ** Mumbai - 400 063, India
  ** India
  -------------------------------------------------------------------------------------------------------
  CHANGE HISTORY
  
  SFR Number         :
  Changed By         :
  Change Description :

**Changed By         : Divya J
**Date               : 10-Mar-2023
**Change Description : UDE Event CUSTOMER LEG IS NOT FIRING WHEN GL is maintained in Settelment Instruction
**Search String      : OBCL_14.6_Support_Bug#35083991

  **Changed By         : Chandra Achuta
  **Date               : 17-May-2023
  **Change Description : Added code to store latest settlement data into the table.
  **Search String      : Bug#35394978   
  -------------------------------------------------------------------------------------------------------
  */
  g_ude_event BOOLEAN := FALSE; --OBCL_14.6_Support_Bug#35083991
  
  FUNCTION Fn_Validate(p_Source           IN VARCHAR2,
                       p_Source_Operation IN VARCHAR2,
                       p_Function_Id      IN VARCHAR2,
                       p_Action_Code      IN VARCHAR2,
                       p_Child_Function   IN VARCHAR2,
                       p_oldudevt         IN olpks_oldudevt_main.ty_oldudevt,
                       p_prev_oldudevt    IN olpks_oldudevt_main.ty_oldudevt,
                       p_wrk_oldudevt     IN OUT olpks_oldudevt_main.ty_oldudevt,
                       p_Err_Code         IN OUT VARCHAR2,
                       p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Subsys_Pickup(p_Source           IN VARCHAR2,
                            p_Source_Operation IN VARCHAR2,
                            p_Function_Id      IN VARCHAR2,
                            p_Action_Code      IN VARCHAR2,
                            p_oldudevt         IN olpks_oldudevt_main.ty_oldudevt,
                            p_prev_oldudevt    IN olpks_oldudevt_main.ty_oldudevt,      --Bug#35394978  Removed OUT parameter
                            p_wrk_oldudevt     IN OUT olpks_oldudevt_main.ty_oldudevt,
                            p_Err_Code         IN OUT VARCHAR2,
                            p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION FN_PROCESS_SUBSYSTEM(p_Function_Id  in VARCHAR2,
                                p_Source       In VARCHAR2,
                                p_wrk_oldudevt IN OUT olpks_oldudevt_main.ty_oldudevt,
                                p_err_code     IN OUT VARCHAR2,
                                p_err_param    IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION FN_VALIDATE_EVENT(p_Function_Id  in VARCHAR2,
                             p_Source       in VARCHAR2,
                             p_wrk_oldudevt IN OUT olpks_oldudevt_main.ty_oldudevt,
                             p_err_code     IN OUT VARCHAR2,
                             p_err_params   IN OUT VARCHAR2) RETURN BOOLEAN;

END olpks_oldudevt_utils;
/