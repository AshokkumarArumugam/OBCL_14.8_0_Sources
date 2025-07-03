CREATE OR REPLACE PACKAGE olpks_oldvamnd_utils_cluster AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_oldvamnd_utils_cluster.spc
  **
  ** Module     : Loans and Deposits
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

  Changed By         :  Anub mathew
  Change Description : Added hook for fn_reverse
  Search String      :  OFCL_12.3_27455251
  
  Changed By         :  Gomathi G
  Change Description :  Added hook for Fn_current_amendment
  Search String      :  OBCL_14.3_SUPPORT_BUG#31016365 
  
  Changed By         : Gomathi G
  Changed On         : 01-APR-2021
  Change Description : Provided Pre and post hooks to derive the notes present for the customer/account number and display while saving.
  Search String      : OBCL_14.3_SUPPORT_BUG#32644113

  Changed By         : Akhila Samson
  Changed On         : 13-Mar-2023
  Change Description : Added hook for Pr_New_Version
  Search String      : OBCL_14.7_SUPP#35088099

-------------------------------------------------------------------------------------------------------
  */

      /*
        #   The following need to be performed for VAMB
        #
        #   Check if ICCF has been picked up. If not, do so
        #   Check if tax has been picked up and computed. If not, do so
        #   Check if settlements have been picked up. If not, do so
        #   Update event log
        #   Update contract_amend_due
        #   Pass VAMB related entries
        #   Post the details
        */
        FUNCTION  Fn_Pre_Vamb(p_Source           IN VARCHAR2,
                       p_Source_Operation IN VARCHAR2,
                       p_Function_Id      IN VARCHAR2,
                       p_Action_Code      IN VARCHAR2,
                       p_oldvamnd         IN  olpks_oldvamnd_main.ty_oldvamnd,
                       p_prev_oldvamnd    IN olpks_oldvamnd_main.ty_oldvamnd,
                       p_wrk_oldvamnd     IN OUT olpks_oldvamnd_main.ty_oldvamnd,
                       p_Err_Code         IN OUT VARCHAR2,
                       p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

        FUNCTION  Fn_Post_Vamb(p_Source           IN VARCHAR2,
                       p_Source_Operation IN VARCHAR2,
                       p_Function_Id      IN VARCHAR2,
                       p_Action_Code      IN VARCHAR2,
                       p_oldvamnd         IN  olpks_oldvamnd_main.ty_oldvamnd,
                       p_prev_oldvamnd    IN olpks_oldvamnd_main.ty_oldvamnd,
                       p_wrk_oldvamnd     IN OUT olpks_oldvamnd_main.ty_oldvamnd,
                       p_Err_Code         IN OUT VARCHAR2,
                       p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;					   
		--OFCL_12.3_27455251 starts			   
		FUNCTION Fn_Pre_Reverse(p_Source           IN VARCHAR2,
                   p_Source_Operation IN VARCHAR2,
                   p_Function_Id      IN VARCHAR2,
                   p_Action_Code      IN VARCHAR2,
                   p_oldvamnd         IN olpks_oldvamnd_main.ty_oldvamnd,
                   p_prev_oldvamnd    IN olpks_oldvamnd_main.ty_oldvamnd,
                   p_wrk_oldvamnd     IN OUT olpks_oldvamnd_main.ty_oldvamnd,
                   p_Err_Code         IN OUT VARCHAR2,
                   p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN ;
		FUNCTION Fn_Post_Reverse(p_Source           IN VARCHAR2,
                   p_Source_Operation IN VARCHAR2,
                   p_Function_Id      IN VARCHAR2,
                   p_Action_Code      IN VARCHAR2,
                   p_oldvamnd         IN olpks_oldvamnd_main.ty_oldvamnd,
                   p_prev_oldvamnd    IN olpks_oldvamnd_main.ty_oldvamnd,
                   p_wrk_oldvamnd     IN OUT olpks_oldvamnd_main.ty_oldvamnd,
                   p_Err_Code         IN OUT VARCHAR2,
                   p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
		--OFCL_12.3_27455251 ends
    --OBCL_14.3_SUPPORT_BUG#31016365 STARTS
     FUNCTION Fn_Pre_Current_Amendment  (p_Source           IN VARCHAR2,
                       p_Source_Operation IN VARCHAR2,
                       p_Function_Id      IN VARCHAR2,
                       p_Action_Code      IN VARCHAR2,
                       p_wrk_oldvamnd     IN OUT olpks_oldvamnd_main.ty_oldvamnd,
                       p_Installment_Deposit IN VARCHAR2,  
                       p_Err_Code         IN OUT VARCHAR2,
                       p_Err_Params       IN OUT VARCHAR2)
                       RETURN BOOLEAN ;
					   
    FUNCTION Fn_Current_Amendment  (p_Source           IN VARCHAR2,
                       p_Source_Operation IN VARCHAR2,
                       p_Function_Id      IN VARCHAR2,
                       p_Action_Code      IN VARCHAR2,
                       p_wrk_oldvamnd     IN OUT olpks_oldvamnd_main.ty_oldvamnd,
                       p_Installment_Deposit IN VARCHAR2,
                       p_Err_Code         IN OUT VARCHAR2,
                       p_Err_Params       IN OUT VARCHAR2,
                       p_fn_call_id       IN OUT NUMBER,
                       p_Tb_Cluster_data  IN OUT GLOBAL.Ty_Tb_Cluster_Data)
                       RETURN BOOLEAN ;
					   
        FUNCTION Fn_Post_Current_Amendment  (p_Source           IN VARCHAR2,
                       p_Source_Operation IN VARCHAR2,
                       p_Function_Id      IN VARCHAR2,
                       p_Action_Code      IN VARCHAR2,
                       p_wrk_oldvamnd     IN OUT olpks_oldvamnd_main.ty_oldvamnd,
                       p_Installment_Deposit IN VARCHAR2,
                       p_Err_Code         IN OUT VARCHAR2,
                       p_Err_Params       IN OUT VARCHAR2)
                       RETURN BOOLEAN ;
    --OBCL_14.3_SUPPORT_BUG#31016365  ENDS
	--OBCL_14.3_SUPPORT_BUG#32644113 changes starts
	  FUNCTION Fn_pre_Default(p_Source           IN Cotms_Source.Source_Code%TYPE,
                      p_Source_Operation IN VARCHAR2,
                      p_Function_Id      IN VARCHAR2,
                      p_Action_Code      IN VARCHAR2,
                      p_Oldvamnd         IN Olpks_Oldvamnd_Main.Ty_Oldvamnd,
                      p_Wrk_Oldvamnd     IN OUT NOCOPY Olpks_Oldvamnd_Main.Ty_Oldvamnd,
                      p_Err_Code         IN OUT VARCHAR2,
                      p_Err_Params       IN OUT VARCHAR2) 
	RETURN BOOLEAN;
	FUNCTION Fn_post_Default(p_Source           IN Cotms_Source.Source_Code%TYPE,
                      p_Source_Operation IN VARCHAR2,
                      p_Function_Id      IN VARCHAR2,
                      p_Action_Code      IN VARCHAR2,
                      p_Oldvamnd         IN Olpks_Oldvamnd_Main.Ty_Oldvamnd,
                      p_Wrk_Oldvamnd     IN OUT NOCOPY Olpks_Oldvamnd_Main.Ty_Oldvamnd,
                      p_Err_Code         IN OUT VARCHAR2,
                      p_Err_Params       IN OUT VARCHAR2) 
	RETURN BOOLEAN;
	--OBCL_14.3_SUPPORT_BUG#32644113 changes ends
	--OBCL_14.7_SUPP#35088099 Start
	FUNCTION Pr_Pre_New_Version(p_Source           IN VARCHAR2,
                          p_Source_Operation IN VARCHAR2,
                          p_Function_Id      IN VARCHAR2,
                          p_Action_Code      IN VARCHAR2,
                          p_Wrk_Oldvamnd     IN OUT Olpks_Oldvamnd_Main.Ty_Oldvamnd,
                          p_Err_Code         IN OUT VARCHAR2,
                          p_Err_Params       IN OUT VARCHAR2) 
	RETURN BOOLEAN;
	
	FUNCTION Pr_Post_New_Version(p_Source           IN VARCHAR2,
                          p_Source_Operation IN VARCHAR2,
                          p_Function_Id      IN VARCHAR2,
                          p_Action_Code      IN VARCHAR2,
                          p_Wrk_Oldvamnd     IN OUT Olpks_Oldvamnd_Main.Ty_Oldvamnd,
                          p_Err_Code         IN OUT VARCHAR2,
                          p_Err_Params       IN OUT VARCHAR2) 
	RETURN BOOLEAN;
	
	--OBCL_14.7_SUPP#35088099 End
END olpks_oldvamnd_utils_cluster;
/
CREATE OR REPLACE SYNONYM  olpkss_oldvamnd_utils_cluster FOR olpks_oldvamnd_utils_cluster
/