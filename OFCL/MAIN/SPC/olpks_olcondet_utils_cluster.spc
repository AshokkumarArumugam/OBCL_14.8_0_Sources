create or replace package Olpks_Olcondet_Utils_cluster is
  /*----------------------------------------------------------------------------------------------------
  **
  ** File Name  : Olpks_Olcondet_Utils_cluster.SPC
  **
  ** Module   : OL
  **
    This source is part of the Oracle Flexcube Corporate Lending  Software Product.
    Copyright © 2016 , Oracle and/or its affiliates.  All rights reserved.
    No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, 
	mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written 
	permission of Oracle and/or its affiliates.
  
    Oracle Financial Services Software Limited.
    Oracle Park, Off Western Express Highway,
    Goregaon (East),
    Mumbai - 400 063, India.
  ----------------------------------------------------------------------------------------------------
    Created By         : Rashmi B V
    Changed On         : 25-Aug-2022
    Search String      : Bug#34528124    
    Change Reason      : Hook provided for function FN_DFLT_OTH_TABS 
	
	CHANGE HISTORY
	
	Changed By         : Vineeth T M
    Changed On         : 02-Dec-2022
    Search String      : OBCL_14.6_SUPP#34856562 Changes    
    Change Reason      : Hook provided for function Fn_pre_Default_Validate 
	
  -----------------------------------------------------------------------------------------------------
  */
  FUNCTION fn_pre_Dflt_Oth_Tabs(p_Source       IN VARCHAR2,
                            p_Action_Code  IN VARCHAR2,
                            p_Function_Id  IN VARCHAR2,
                            p_Product      IN VARCHAR2,
                            p_Module       IN VARCHAR2,
                            p_Comp         IN VARCHAR2,
                            p_Wrk_Olcondet IN OUT Olpks_Olcondet_Main.Ty_Olcondet,
                            p_Err_Code     IN OUT VARCHAR2,
                            p_Err_Params   IN OUT VARCHAR2)
    Return Boolean;

 FUNCTION fn_post_Dflt_Oth_Tabs(p_Source       IN VARCHAR2,
                            p_Action_Code  IN VARCHAR2,
                            p_Function_Id  IN VARCHAR2,
                            p_Product      IN VARCHAR2,
                            p_Module       IN VARCHAR2,
                            p_Comp         IN VARCHAR2,
                            p_Wrk_Olcondet IN OUT Olpks_Olcondet_Main.Ty_Olcondet,
                            p_Err_Code     IN OUT VARCHAR2,
                            p_Err_Params   IN OUT VARCHAR2)
    Return Boolean;

    --OBCL_14.6_SUPP#34856562 Changes start
  FUNCTION Fn_pre_Pre_Default_Validate(p_Source       IN VARCHAR2,
                                   p_Action_Code  IN VARCHAR2,
                                   p_Function_Id  IN VARCHAR2,
                                   p_Event_Seq_No IN VARCHAR2,
                                   p_Wrk_Olcondet IN OUT Olpks_Olcondet_Main.Ty_Olcondet,
                                   p_Err_Code     IN OUT VARCHAR2,
                                   p_Err_Params   IN OUT VARCHAR2)
    RETURN BOOLEAN;
    
  FUNCTION Fn_post_Pre_Default_Validate(p_Source       IN VARCHAR2,
                                   p_Action_Code  IN VARCHAR2,
                                   p_Function_Id  IN VARCHAR2,
                                   p_Event_Seq_No IN VARCHAR2,
                                   p_Wrk_Olcondet IN OUT Olpks_Olcondet_Main.Ty_Olcondet,
                                   p_Err_Code     IN OUT VARCHAR2,
                                   p_Err_Params   IN OUT VARCHAR2)
    RETURN BOOLEAN;
        --OBCL_14.6_SUPP#34856562 Changes end

end Olpks_Olcondet_Utils_cluster;
/