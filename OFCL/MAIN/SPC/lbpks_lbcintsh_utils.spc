CREATE OR REPLACE PACKAGE lbpks_lbcintsh_utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_lbcintsh_kernel.spc
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
  
  Changed By         : JayaramN
  Date               : 19-May-2021
  Change Description : Multiple Issues in Manual payment Screen
  Search String      : OBCL14.4:Bug#31769564:Manual_Payment_Screen_Issues

  -------------------------------------------------------------------------------------------------------
  */

g_AMOUNT_DUE  oltbs_amount_due.AMOUNT_DUE%type;
g_AMOUNT_SETTLED  oltbs_amount_due.AMOUNT_SETTLED%type;
g_COMPONENT  oltbs_amount_due.COMPONENT%type;
PROCEDURE Pr_Skip_Handler  (P_Stage  IN  VARCHAR2);

  FUNCTION Fn_det_assign_values(     p_Source       IN VARCHAR2,
                                     p_Function_Id  IN VARCHAR2,
                                     p_Action_Code  IN VARCHAR2,
                                     p_wrk_lbcintsh IN OUT lbpks_lbcintsh_Main.Ty_lbcintsh,
                                     p_err_code     IN OUT Varchar2,
                                     p_err_param    IN OUT Varchar2) RETURN BOOLEAN;

  FUNCTION Fn_pop_part_share_amt(     p_Source       IN VARCHAR2,
                                     p_Function_Id  IN VARCHAR2,
                                     p_Action_Code  IN VARCHAR2,
                                     p_MAIN_Function IN VARCHAR2,
                                     p_wrk_lbcintsh IN OUT lbpks_lbcintsh_Main.Ty_lbcintsh,
                                     p_err_code     IN OUT Varchar2,
                                     p_err_param    IN OUT Varchar2) RETURN BOOLEAN;


FUNCTION Fn_Query  ( p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Main_Function    IN  VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_Key_Tags_Vals   IN  OUT VARCHAR2,
p_QryData_Reqd IN  VARCHAR2 ,
p_lbcintsh IN   lbpks_lbcintsh_Main.Ty_lbcintsh,
p_wrk_lbcintsh IN OUT   lbpks_lbcintsh_Main.Ty_lbcintsh,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Upload  ( p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
                        p_Main_Function    IN  VARCHAR2,
                        p_Child_Function    IN  VARCHAR2,
                        p_lbcintsh IN   lbpks_lbcintsh_Main.Ty_lbcintsh,
                        p_wrk_lbcintsh IN OUT   lbpks_lbcintsh_Main.Ty_lbcintsh,
                        p_Err_Code          IN OUT VARCHAR2,
                        p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Validate  ( p_Source    IN  VARCHAR2,
                       p_Source_Operation  IN     VARCHAR2,
                       p_Function_Id       IN     VARCHAR2,
                       p_Action_Code       IN     VARCHAR2,
                       p_Child_Function    IN  VARCHAR2,
                       p_Wrk_lbcintsh IN OUT  lbpks_lbcintsh_Main.Ty_lbcintsh,
                       p_Err_Code          IN OUT VARCHAR2,
                       p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;

END lbpks_lbcintsh_utils;
/