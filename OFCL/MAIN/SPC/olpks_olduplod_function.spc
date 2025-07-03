CREATE OR REPLACE PACKAGE olpks_olduplod_function AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_olduplod_function.spc
  **
  ** Module     : Oracle Lending
  **
  ** This source is part of the Oracle FLEXCUBE Software Product.
  ** Copyright (R) 2008,2019 , Oracle and/or its affiliates.  All rights reserved
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
  
	**Changed By         : Chandra Achuta
	**Date               : 14-JUL-2022
	**Change Description : HOOK Request for supporting the upload route of LFDACFIN screen
	**Search String      : BUG#34349837


    Changed BY         : Pallavi R
    Changed on         : 29-Aug-2024
    Changed Reason     : Log the exceptions with upload id
    Search String      : OBCL_14.7_RABO_#36935170_2 Changes	
  -------------------------------------------------------------------------------------------------------
  */
  
  --Bug#34349837  Changes starts
  PROCEDURE Pr_Set_Skip_Kernel;
  PROCEDURE Pr_Set_Activate_Kernel;
  PROCEDURE Pr_Set_Skip_Cluster;
  PROCEDURE Pr_Set_Activate_Cluster;
  FUNCTION Fn_Skip_Kernel RETURN BOOLEAN;
  --Bug#34349837  Changes Ends  
 g_Upload_Id Oltbs_Upload_Exception_Cs.Upload_Id%TYPE := NULL;--OBCL_14.7_RABO_#36935170_2 Changes
  FUNCTION Fn_upload(p_Source           IN VARCHAR2,
                     p_Source_Operation IN VARCHAR2,
                     p_Function_Id      IN VARCHAR2,
                     p_Action_Code      IN VARCHAR2,
                     p_Child_Function   IN VARCHAR2,
                     p_Multi_Trip_Id    IN VARCHAR2,
                     p_olduplod         IN olpks_olduplod_Main.Ty_olduplod,
                     p_Prev_olduplod    IN olpks_olduplod_Main.Ty_olduplod,
                     p_Wrk_olduplod     IN OUT olpks_olduplod_Main.Ty_olduplod,
                     p_Err_Code         IN OUT VARCHAR2,
                     p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  Procedure pr_upload_entity;					 

END olpks_olduplod_function;
/
create or replace synonym olpkss_olduplod_function for olpks_olduplod_function
/