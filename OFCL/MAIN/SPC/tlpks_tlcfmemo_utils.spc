CREATE OR REPLACE PACKAGE Tlpks_Tlcfmemo_Utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : tlpks_tlcfmemo_utils.spc
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
  
  Changed By         : Jayaram N
  Date               : 07-Apr-2020
  Change Description : SLT:LS:LOR_Adjustments
  Search String      : OBCL14.4:SFR#29959798:LOR_Adjustments 
  
  -------------------------------------------------------------------------------------------------------
  */

  PROCEDURE Pr_Skip_Handler(p_Stage IN VARCHAR2);

  FUNCTION Fn_Query(p_Source           IN VARCHAR2,
                    p_Source_Operation IN VARCHAR2,
                    p_Function_Id      IN VARCHAR2,
                    p_Action_Code      IN VARCHAR2,
                    p_Main_Function    IN VARCHAR2,
                    p_Key_Tags_Vals    IN VARCHAR2,
                    p_Qrydata_Reqd     IN VARCHAR2,
                    p_Wrk_Tlcfmemo     IN OUT Tlpks_Tlcfmemo_Main.Ty_Tlcfmemo,
                    p_Err_Code         IN OUT VARCHAR2,
                    p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Validate(p_Source           IN VARCHAR2,
                       p_Source_Operation IN VARCHAR2,
                       p_Function_Id      IN VARCHAR2,
                       p_Action_Code      IN VARCHAR2,
                       p_Main_Function    IN VARCHAR2,
                       p_Tlcfmemo         IN Tlpks_Tlcfmemo_Main.Ty_Tlcfmemo,
                       p_Prev_Tlcfmemo    IN Tlpks_Tlcfmemo_Main.Ty_Tlcfmemo,
                       p_Wrk_Tlcfmemo     IN OUT Tlpks_Tlcfmemo_Main.Ty_Tlcfmemo,
                       p_Err_Code         IN OUT VARCHAR2,
                       p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Upload(p_Source           IN VARCHAR2,
                     p_Source_Operation IN VARCHAR2,
                     p_Function_Id      IN VARCHAR2,
                     p_Action_Code      IN VARCHAR2,
                     p_Main_Function    IN VARCHAR2,
                     --p_Child_Function   IN VARCHAR2,
                     -- p_Multi_Trip_Id    IN VARCHAR2,
                     p_Tlcfmemo      IN Tlpks_Tlcfmemo_Main.Ty_Tlcfmemo,
                     p_Prev_Tlcfmemo IN Tlpks_Tlcfmemo_Main.Ty_Tlcfmemo,
                     p_Wrk_Tlcfmemo  IN OUT Tlpks_Tlcfmemo_Main.Ty_Tlcfmemo,
                     p_Err_Code      IN OUT VARCHAR2,
                     p_Err_Params    IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Pickup(p_Source        IN VARCHAR2,
                     p_Action_Code   IN VARCHAR2,
                     p_Main_Function IN VARCHAR2,
                     p_Wrk_Tlcfmemo  IN OUT Tlpks_Tlcfmemo_Main.Ty_Tlcfmemo,
                     p_Err_Code      IN OUT VARCHAR2,
                     p_Err_Params    IN OUT VARCHAR2) RETURN BOOLEAN;
					 
  
--OBCL14.4:SFR#29959798:LOR_Adjustments - Start
  FUNCTION Fn_LOR_Adjustments(v_dd_ref_no        IN Oltbs_Contract.Contract_ref_no%TYPE,
                              v_esn              IN Oltbs_Contract.Latest_Event_Seq_No%TYPE,
                              v_trade_ref_no     IN Oltbs_Contract.Contract_ref_no%TYPE,
                              p_Action_Code      IN VARCHAR2,
                              p_Main_Function    IN VARCHAR2,
                              p_Wrk_Tlcfmemo     IN OUT Tlpks_Tlcfmemo_Main.Ty_Tlcfmemo,
                              p_Err_Code         IN OUT VARCHAR2,
                              p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
							  
  FUNCTION Fn_Manual_LOR_Adjustment(  v_trade_ref_no     IN Oltbs_Contract.Contract_ref_no%TYPE,
									  v_esn              IN Oltbs_Contract.Latest_Event_Seq_No%TYPE,
									  p_Err_Code         IN OUT VARCHAR2,
									  p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN; 							  
--OBCL14.4:SFR#29959798:LOR_Adjustments - End
					 

END Tlpks_Tlcfmemo_Utils;
/