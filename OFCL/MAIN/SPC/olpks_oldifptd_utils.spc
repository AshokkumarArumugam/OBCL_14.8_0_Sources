CREATE OR REPLACE PACKAGE olpks_oldifptd_utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_oldifptd_utils.spc
  **
  ** Module     : Loans and Deposits
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
  
  Changed By         : Meha
  Change Description : OBDX changes
  Search String		 : OBCL_14.4_OBDX
  
  -------------------------------------------------------------------------------------------------------
  */
 
Function Fn_Query(	p_Source 		In  Varchar2,                             
					p_Function_Id 	In  Varchar2,
					p_Action_Code 	In  Varchar2,    
					p_Oldifptd 		In   	 Olpks_Oldifptd_Main.Ty_Oldifptd,
					p_Wrk_Oldifptd 	In Out   Olpks_Oldifptd_Main.Ty_Oldifptd,
					P_Wrk_Oldpmnt 	In Out   Olpks_Oldpmnt_Main.Ty_Oldpmnt,
					P_Wrk_Oldfeelq	In Out   Olpks_Oldfeelq_Main.Ty_Oldfeelq,					
					p_Err_Code 		In Out Varchar2,
					p_Err_Params 	In Out Varchar2)Return Boolean ;
--OBCL_14.4_OBDX Changes Starts					
Function Fn_Subsys_Pickup(p_Source           In Varchar2,
						p_Source_Operation In Varchar2,
						p_Function_Id      In Varchar2,
						p_Action_Code      In Varchar2,
						p_oldifptd         In olpks_oldifptd_main.ty_oldifptd,
						p_prev_oldifptd    In olpks_oldifptd_main.ty_oldifptd,
						p_wrk_oldifptd     In Out olpks_oldifptd_main.ty_oldifptd,
						p_Err_Code         In Out Varchar2,						
						p_Err_Params       In Out Varchar2)Return Boolean;
						
Function Fn_Subsys_Upload(p_Source           In Varchar2,
                            p_Source_Operation In Varchar2,
                            p_Function_Id      In Varchar2,
                            p_Action_Code      In Varchar2,
                            p_oldifptd         In olpks_oldifptd_main.ty_oldifptd,
                            p_prev_oldifptd    In olpks_oldifptd_main.ty_oldifptd,
                            p_wrk_oldifptd     In Out olpks_oldifptd_main.ty_oldifptd,							
                            p_Err_Code         In Out Varchar2,
                            p_Err_Params       In Out Varchar2)
    Return Boolean;						
						
--OBCL_14.4_OBDX Changes Ends						
END olpks_oldifptd_utils;
/
CREATE OR REPLACE SYNONYM olpkss_oldifptd_utils FOR olpks_oldifptd_utils
/