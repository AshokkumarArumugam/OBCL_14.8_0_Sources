create or replace package Lfpks_Fee_Prop_Bulk_cluster is
  /*----------------------------------------------------------------------------------------------------
  **
  ** File Name  : Lfpks_Fee_Prop_Bulk_cluster.SPC
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
    Created On         : 22-Jun-2022
    Search String      : Bug#34303884   
    Change Reason      : Hook provided for Get_Fee_Amt
	
  */
  FUNCTION fn_pre_Get_Fee_Amt(p_Contract_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
                          p_Participant_Crn IN Lptbs_Contract_Master.Contract_Ref_No%TYPE,
                          p_Component_Row   IN Lftbs_Contract_Fee%ROWTYPE,
                          p_Sch_Date        IN Oltbs_Amount_Due_Cs.Due_Date%TYPE,
                          p_Component_Ratio IN Lbtbs_Participant_Ratio.Component_Ratio%TYPE,
                          p_Inc_Feecalc     IN Lppkss_Upload.t_Cftb_Contract_Fee_Calc,
                          Po_Amount_Due     OUT Oltbs_Amount_Due_Cs.Amount_Due%TYPE,
                          p_Error_Code      IN OUT VARCHAR2,
                          p_Error_Parameter IN OUT VARCHAR2)
    Return Boolean;

 FUNCTION fn_post_Get_Fee_Amt(p_Contract_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
                          p_Participant_Crn IN Lptbs_Contract_Master.Contract_Ref_No%TYPE,
                          p_Component_Row   IN Lftbs_Contract_Fee%ROWTYPE,
                          p_Sch_Date        IN Oltbs_Amount_Due_Cs.Due_Date%TYPE,
                          p_Component_Ratio IN Lbtbs_Participant_Ratio.Component_Ratio%TYPE,
                          p_Inc_Feecalc     IN Lppkss_Upload.t_Cftb_Contract_Fee_Calc,
                          Po_Amount_Due     IN OUT Oltbs_Amount_Due_Cs.Amount_Due%TYPE,
                          p_Error_Code      IN OUT VARCHAR2,
                          p_Error_Parameter IN OUT VARCHAR2)
    Return Boolean;

end Lfpks_Fee_Prop_Bulk_cluster;
/