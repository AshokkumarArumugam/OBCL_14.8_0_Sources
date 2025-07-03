CREATE OR REPLACE PACKAGE olpks_oldflrcl_utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_oldflrcl_utils.spc
  **
  ** Module     : LD
  **
  ** This source is part of the Oracle Banking Software Product.
  ** Copyright (R) 2008,2015 , Oracle and/or its affiliates.  All rights reserved
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

	**Changed By         : Meha
    **Date               : 17-Sep-2019
    **Change Description : Floor and Ceiling Changes
    **Search String      : OBCL_14.4_FLRCLG

  -------------------------------------------------------------------------------------------------------
  */

	FUNCTION Fn_Check_Contract_Auth(p_Source           IN VARCHAR2,
                                  p_Source_Operation IN VARCHAR2,
                                  p_Function_Id      IN VARCHAR2,
                                  p_Action_Code      IN VARCHAR2,
                                  p_Child_Function   IN VARCHAR2,
                                  p_oldflrcl         IN olpks_oldflrcl_main.ty_oldflrcl,
                                  p_prev_oldflrcl    IN OUT olpks_oldflrcl_main.ty_oldflrcl,
                                  p_wrk_oldflrcl     IN OUT olpks_oldflrcl_main.ty_oldflrcl,
                                  p_Err_Code         IN OUT VARCHAR2,
                                  p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

	FUNCTION Fn_Populate_Header(p_Source           IN VARCHAR2,
                              p_Source_Operation IN VARCHAR2,
                              p_Function_Id      IN VARCHAR2,
                              p_Action_Code      IN VARCHAR2,
                              p_Child_Function   IN VARCHAR2,
                              p_oldflrcl         IN olpks_oldflrcl_main.ty_oldflrcl,
                              p_wrk_oldflrcl     IN OUT olpks_oldflrcl_main.ty_oldflrcl,
                              p_Err_Code         IN OUT VARCHAR2,
                              p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
	--OBCL_14.4_FLRCLG Changes Starts
	Function Fn_Validate(p_Source            In Varchar2,
						  p_Source_Operation IN Varchar2,
						  p_Function_Id      IN Varchar2,
						  p_Action_Code      IN Varchar2,
						  p_Child_Function   IN Varchar2,
						  p_oldflrcl         IN olpks_oldflrcl_main.ty_oldflrcl,
						  p_wrk_oldflrcl     IN Out olpks_oldflrcl_main.ty_oldflrcl,
						  p_Err_Code         IN Out Varchar2,
						  p_Err_Params       IN Out Varchar2)
	Return Boolean;
	--OBCL_14.4_FLRCLG Changes Ends
	

END olpks_oldflrcl_utils;
/