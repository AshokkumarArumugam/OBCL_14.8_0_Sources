CREATE OR REPLACE PACKAGE  tlpks_tldprliq_utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : tlpks_tldprliq_utils.spc
  **
  ** Module     : TL
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
  
  
PROCEDURE Pr_Skip_Handler  (P_Stage  IN  VARCHAR2);

FUNCTION Fn_Check_Mandatory(p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_Pk_Or_Full     IN  VARCHAR2 DEFAULT 'FULL',
p_tldprliq IN   tlpks_tldprliq_Main.ty_tldprliq,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;


FUNCTION Fn_Default_And_Validate (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_tldprliq IN   tlpks_tldprliq_Main.Ty_tldprliq,
p_Prev_tldprliq IN OUT tlpks_tldprliq_Main.Ty_tldprliq,
p_wrk_tldprliq IN OUT  tlpks_tldprliq_Main.Ty_tldprliq,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;




FUNCTION Fn_Enrich (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_tldprliq IN tlpks_tldprliq_Main.Ty_tldprliq,
p_Prev_tldprliq IN OUT  tlpks_tldprliq_Main.Ty_tldprliq,
p_Wrk_tldprliq IN OUT  tlpks_tldprliq_Main.Ty_tldprliq,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION fn_authorize(p_Source    IN  VARCHAR2,
                               p_Source_Operation  IN     VARCHAR2,
                               p_Function_Id       IN     VARCHAR2,
                               p_Action_Code       IN     VARCHAR2,
       p_borrower IN tltbs_fmem_lor_int_params.borrower%type,
       p_cusip_no IN tltbs_fmem_lor_int_params.cusip_no%type,
       p_end_date    IN tltbs_fmem_lor_int_params.end_date%type,
       p_lor_sequence IN tltbs_fmem_lor_int_params.lor_sequence%type, 
       p_Err_Code       IN  OUT VARCHAR2,
       p_Err_Params     IN  OUT VARCHAR2)return BOOLEAN;

FUNCTION Fn_Upload_Db (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_Multi_Trip_Id    IN  VARCHAR2,
p_tldprliq IN tlpks_tldprliq_Main.Ty_tldprliq,
p_Prev_tldprliq IN tlpks_tldprliq_Main.Ty_tldprliq,
p_Wrk_tldprliq IN OUT  tlpks_tldprliq_Main.Ty_tldprliq,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;


FUNCTION Fn_Process (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_Multi_Trip_Id    IN  VARCHAR2,
p_tldprliq IN tlpks_tldprliq_Main.Ty_tldprliq,
p_Prev_tldprliq IN tlpks_tldprliq_Main.Ty_tldprliq,
p_Wrk_tldprliq IN OUT  tlpks_tldprliq_Main.Ty_tldprliq,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Query  ( p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_tldprliq IN   tlpks_tldprliq_Main.Ty_tldprliq,
p_wrk_tldprliq IN OUT   tlpks_tldprliq_Main.Ty_tldprliq,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;

END tlpks_tldprliq_utils;
/
CREATE OR REPLACE SYNONYM tlpkss_tldprliq_utils FOR tlpks_tldprliq_utils
/