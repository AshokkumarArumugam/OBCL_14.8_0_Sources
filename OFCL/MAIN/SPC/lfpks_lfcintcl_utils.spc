create or replace package lfpks_lfcintcl_utils is
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lfpks_lfcintch_utils.sql
  **
  ** Module     : The ICCF
  **
  ** This source is part of the Oracle Banking Software Product.
  ** Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved
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
  
  Created By         : Avinav Seal
  Created On         : 19-05-2016
  Created Reason     : ofcl_12.1.0.0.0_conversion
  
  **Changed By         : Gomathi G
  **Date               : 02-MAR-2020  
  **Search String      : OBCL_14.3_SUPPORT_BUG#30961793
  -------------------------------------------------------------------------------------------------------
  */
  L_DEFAULT_BASIS_AMOUNT CONSTANT lftms_product_iccf.BASIS_AMOUNT%TYPE :='O';--OBCL_14.1_SUPPORT_BUG#30896070 CHANGES
  FUNCTION Fn_Validate(p_Source       IN Cotms_Source.Source_Code%TYPE,
                     p_Function_Id      IN VARCHAR2,
                     p_Module           IN VARCHAR2,
                     p_Action_Code      IN VARCHAR2,
                     p_wrk_lfcintcl     IN OUT lfpks_lfcintcl_main.ty_lfcintcl,
                     p_Err_Code         IN OUT VARCHAR2,
                     p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION fn_default(p_Source           IN VARCHAR2,
                      p_Source_Operation IN VARCHAR2,
                      p_Function_id      IN VARCHAR2,
                       p_Action_Code      IN VARCHAR2,
                      p_lfcintcl         IN OUT lfpks_lfcintcl_main.ty_lfcintcl,
                      p_loop_count       IN NUMBER,
                      p_Status           IN OUT VARCHAR2,
                       p_Err_Code         IN OUT VARCHAR2,
                       p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
end lfpks_lfcintcl_utils;
/