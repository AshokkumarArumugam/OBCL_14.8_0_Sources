CREATE OR REPLACE PACKAGE olpks_oldmndsb_utils_cluster AS
  /*-----------------------------------------------------------------------------------------------------
    **
    ** File Name  : olpks_oldmndsb_utils_cluster.spc
    **
    ** Module     : Loans and Deposits
    **
    ** This source is part of the Oracle FLEXCUBE Software Product.
    ** Copyright (R) 2021 , Oracle and/or its affiliates.  All rights reserved
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
  
    
  Changed By         : Gomathi G
  Changed On         : 01-APR-2021
  Change Description : Provided Pre and post hooks to derive the notes present for the customer/account number and display while saving.
  Search String      : OBCL_14.3_SUPPORT_BUG#32644113
    -------------------------------------------------------------------------------------------------------
  */
	--OBCL_14.3_SUPPORT_BUG#32644113 changes starts
	  FUNCTION Fn_pre_Default_And_Validate(p_Source           IN VARCHAR2,
                                   p_Source_Operation IN VARCHAR2,
                                   p_Function_Id      IN VARCHAR2,
                                   p_Action_Code      IN VARCHAR2,
                                   p_Child_Function   IN VARCHAR2,
                                   p_Oldmndsb         IN Olpks_Oldmndsb_Main.Ty_Oldmndsb,
                                   p_Prev_Oldmndsb    IN Olpks_Oldmndsb_Main.Ty_Oldmndsb,
                                   p_Wrk_Oldmndsb     IN OUT Olpks_Oldmndsb_Main.Ty_Oldmndsb,
                                   p_Err_Code         IN OUT VARCHAR2,
                                   p_Err_Params       IN OUT VARCHAR2)
	RETURN BOOLEAN;
	FUNCTION Fn_post_Default_And_Validate(p_Source           IN VARCHAR2,
                                   p_Source_Operation IN VARCHAR2,
                                   p_Function_Id      IN VARCHAR2,
                                   p_Action_Code      IN VARCHAR2,
                                   p_Child_Function   IN VARCHAR2,
                                   p_Oldmndsb         IN Olpks_Oldmndsb_Main.Ty_Oldmndsb,
                                   p_Prev_Oldmndsb    IN Olpks_Oldmndsb_Main.Ty_Oldmndsb,
                                   p_Wrk_Oldmndsb     IN OUT Olpks_Oldmndsb_Main.Ty_Oldmndsb,
                                   p_Err_Code         IN OUT VARCHAR2,
                                   p_Err_Params       IN OUT VARCHAR2)
	RETURN BOOLEAN;
	--OBCL_14.3_SUPPORT_BUG#32644113 changes ends
END olpks_oldmndsb_utils_cluster;
/
CREATE OR REPLACE SYNONYM  olpkss_oldmndsb_utils_cluster FOR olpks_oldmndsb_utils_cluster
/