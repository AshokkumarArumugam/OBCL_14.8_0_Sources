CREATE OR REPLACE PACKAGE olpks_oldpsupl_utils AS


/*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_oldpsupl_utils.spc
  **
  ** Module     : OL
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

  -------------------------------------------------------------------------------------------------------
*/

  FUNCTION fn_validate(p_Source           IN VARCHAR2,
                       p_Source_Operation IN VARCHAR2,
                       p_function_id     IN VARCHAR2,
                       p_Action_Code      IN VARCHAR2,
                       p_contract_ref_no IN VARCHAR2,
                       p_error           IN OUT VARCHAR2,
                       p_error_param     IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Delete(p_Source           IN VARCHAR2,
                     p_Source_Operation IN VARCHAR2,
                     p_Function_Id      IN VARCHAR2,
                     p_Action_Code      IN VARCHAR2,
                     p_Child_Function   IN VARCHAR2,
                     p_oldpsupl         IN olpks_oldpsupl_Main.Ty_oldpsupl,
                     p_Prev_oldpsupl    IN OUT olpks_oldpsupl_Main.Ty_oldpsupl,
                     p_Wrk_oldpsupl     IN OUT olpks_oldpsupl_Main.Ty_oldpsupl,
                     p_Err_Code         IN OUT VARCHAR2,
                     p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;


 FUNCTION Fn_save (p_Source           IN VARCHAR2,
                     p_Source_Operation IN VARCHAR2,
                     p_Function_Id      IN VARCHAR2,
                     p_Action_Code      IN VARCHAR2,
                     p_Child_Function   IN VARCHAR2,
                     p_oldpsupl         IN olpks_oldpsupl_Main.Ty_oldpsupl,
                     p_Prev_oldpsupl    IN OUT olpks_oldpsupl_Main.Ty_oldpsupl,
                     p_Wrk_oldpsupl     IN OUT olpks_oldpsupl_Main.Ty_oldpsupl,
                     p_Err_Code         IN OUT VARCHAR2,
                     p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN ;            



END olpks_oldpsupl_utils;
/
CREATE OR REPLACE Synonym olpkss_oldpsupl_utils FOR olpks_oldpsupl_utils
/