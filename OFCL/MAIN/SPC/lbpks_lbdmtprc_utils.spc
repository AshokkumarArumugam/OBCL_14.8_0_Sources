CREATE OR REPLACE PACKAGE  lbpks_lbdmtprc_utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_lbdmtprc_utils.spc
  **
  ** Module     : Syndication Loans and Commitments
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

FUNCTION Fn_Default_And_Validate (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_lbdmtprc IN   lbpks_lbdmtprc_Main.Ty_lbdmtprc,
p_Prev_lbdmtprc IN OUT lbpks_lbdmtprc_Main.Ty_lbdmtprc,
p_wrk_lbdmtprc IN OUT  lbpks_lbdmtprc_Main.Ty_lbdmtprc,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Subsys_Pickup (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_action_code       IN     VARCHAR2,
p_lbdmtprc IN lbpks_lbdmtprc_Main.Ty_lbdmtprc,
p_Prev_lbdmtprc IN OUT  lbpks_lbdmtprc_Main.Ty_lbdmtprc,
p_Wrk_lbdmtprc IN OUT  lbpks_lbdmtprc_Main.Ty_lbdmtprc,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;


FUNCTION Fn_Upload_Db (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_Multi_Trip_Id    IN  VARCHAR2,
p_lbdmtprc IN lbpks_lbdmtprc_Main.Ty_lbdmtprc,
p_Prev_lbdmtprc IN lbpks_lbdmtprc_Main.Ty_lbdmtprc,
p_Wrk_lbdmtprc IN OUT  lbpks_lbdmtprc_Main.Ty_lbdmtprc,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;


FUNCTION Fn_Process (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_Multi_Trip_Id    IN  VARCHAR2,
p_lbdmtprc IN lbpks_lbdmtprc_Main.Ty_lbdmtprc,
p_Prev_lbdmtprc IN lbpks_lbdmtprc_Main.Ty_lbdmtprc,
p_Wrk_lbdmtprc IN OUT  lbpks_lbdmtprc_Main.Ty_lbdmtprc,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;



FUNCTION Fn_Query  ( p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_Full_Data     IN  VARCHAR2 DEFAULT 'Y',
p_With_Lock     IN  VARCHAR2 DEFAULT 'N',
p_QryData_Reqd IN  VARCHAR2 ,
p_lbdmtprc IN   lbpks_lbdmtprc_Main.Ty_lbdmtprc,
p_wrk_lbdmtprc IN OUT   lbpks_lbdmtprc_Main.Ty_lbdmtprc,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;

END lbpks_lbdmtprc_utils;
/
CREATE OR REPLACE SYNONYM lbpkss_lbdmtprc_utils FOR lbpks_lbdmtprc_utils
/