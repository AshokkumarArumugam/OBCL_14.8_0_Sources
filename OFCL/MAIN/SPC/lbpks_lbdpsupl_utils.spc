CREATE OR REPLACE PACKAGE lbpks_lbdpsupl_utils AS


/*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_lbdpsupl_utils.spc
  **
  ** Module     : LB
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
                     p_lbdpsupl         IN lbpks_lbdpsupl_Main.Ty_lbdpsupl,
                     p_Prev_lbdpsupl    IN OUT lbpks_lbdpsupl_Main.Ty_lbdpsupl,
                     p_Wrk_lbdpsupl     IN OUT lbpks_lbdpsupl_Main.Ty_lbdpsupl,
                     p_Err_Code         IN OUT VARCHAR2,
                     p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
        
  
 FUNCTION Fn_save (p_Source           IN VARCHAR2,
                     p_Source_Operation IN VARCHAR2,
                     p_Function_Id      IN VARCHAR2,
                     p_Action_Code      IN VARCHAR2,
                     p_Child_Function   IN VARCHAR2,
                     p_lbdpsupl         IN lbpks_lbdpsupl_Main.Ty_lbdpsupl,
                     p_Prev_lbdpsupl    IN OUT lbpks_lbdpsupl_Main.Ty_lbdpsupl,
                     p_Wrk_lbdpsupl     IN OUT lbpks_lbdpsupl_Main.Ty_lbdpsupl,
                     p_Err_Code         IN OUT VARCHAR2,
                     p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN ;            
                     

  
END lbpks_lbdpsupl_utils;
/
CREATE OR REPLACE SYNONYM lbpkss_lbdpsupl_utils FOR lbpks_lbdpsupl_utils
/