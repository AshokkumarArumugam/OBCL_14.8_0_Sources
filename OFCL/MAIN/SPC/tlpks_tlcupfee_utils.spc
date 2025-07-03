CREATE OR REPLACE PACKAGE Tlpks_Tlcupfee_Utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : tlpks_tlcupfee_utils.spc
  **
  ** Module     : Secondary Loan Trading
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
  FUNCTION Fn_Validate(p_Source           IN VARCHAR2,
                       p_Source_Operation IN VARCHAR2,
                       p_Function_Id      IN VARCHAR2,
                       p_Action_Code      IN VARCHAR2,
                       p_Wrk_Tlcupfee     IN OUT Tlpks_Tlcupfee_Main.Ty_Tlcupfee,
                       p_Err_Code         IN OUT VARCHAR2,
                       p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Upload(p_Source           IN VARCHAR2,
                     p_Source_Operation IN VARCHAR2,
                     p_Function_Id      IN VARCHAR2,
                     p_Action_Code      IN VARCHAR2,
                     p_Prev_Tlcupfee    IN Tlpks_Tlcupfee_Main.Ty_Tlcupfee,
                     p_Tlcupfee         IN Tlpks_Tlcupfee_Main.Ty_Tlcupfee,
                     p_Wrk_Tlcupfee     IN OUT Tlpks_Tlcupfee_Main.Ty_Tlcupfee,
                     p_Err_Code         IN OUT VARCHAR2,
                     p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Pickup(p_Source           IN VARCHAR2,
                     p_Source_Operation IN VARCHAR2,
                     p_Function_Id      IN VARCHAR2,
                     p_Action_Code      IN VARCHAR2,
                     p_Tlcupfee         IN Tlpks_Tlcupfee_Main.Ty_Tlcupfee,
                     p_Wrk_Tlcupfee     IN OUT Tlpks_Tlcupfee_Main.Ty_Tlcupfee,
                     p_Err_Code         IN OUT VARCHAR2,
                     p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
END Tlpks_Tlcupfee_Utils;
/