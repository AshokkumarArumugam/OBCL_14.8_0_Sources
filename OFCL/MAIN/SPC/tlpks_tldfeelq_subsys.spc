CREATE OR REPLACE PACKAGE tlpks_tldfeelq_subsys AS
/*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : tlpks_tldfeelq_subsys.spc
  **
  ** Module     : Secondary Loan Trading
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
  
  SFR Number         :
  Changed By         :
  Change Description :
  
  -------------------------------------------------------------------------------------------------------
  */
  
  FUNCTION fn_subsys_pickup(p_Source           IN VARCHAR2,
                            p_Source_Operation IN VARCHAR2,
                            p_Function_Id      IN VARCHAR2,
                            p_Action_Code      IN VARCHAR2,
                            p_tldfeelq         IN tlpks_tldfeelq_Main.Ty_tldfeelq,
                            p_Prev_tldfeelq    IN tlpks_tldfeelq_Main.Ty_tldfeelq,
                            p_Wrk_tldfeelq     IN OUT tlpks_tldfeelq_Main.Ty_tldfeelq,
                            p_Err_Code         IN OUT VARCHAR2,
                            p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
    
  FUNCTION fn_subsys_upload(p_Source           IN VARCHAR2,
                            p_Source_Operation IN VARCHAR2,
                            p_Function_Id      IN VARCHAR2,
                            p_Action_Code      IN VARCHAR2,
                            p_tldfeelq         IN tlpks_tldfeelq_Main.Ty_tldfeelq,
                            p_Prev_tldfeelq    IN tlpks_tldfeelq_Main.Ty_tldfeelq,
                            p_Wrk_tldfeelq     IN OUT tlpks_tldfeelq_Main.Ty_tldfeelq,
                            p_Err_Code         IN OUT VARCHAR2,
                            p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;  
END tlpks_tldfeelq_subsys;
/
CREATE OR REPLACE SYNONYM tlpkss_tldfeelq_subsys FOR tlpks_tldfeelq_subsys
/