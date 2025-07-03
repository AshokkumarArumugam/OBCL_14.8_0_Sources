create or replace package lfpks_feecalc_custom is
  /*----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lfpks_feecalc_custom.SPC
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
 
	Changed By         : Mohan Pal
	Changed On         : 30-Jun-2022
	Search String      : Bug#34328155   
	Change Reason      : Hook provided for Fn_Populate_Fee_Calc
  ----------------------------------------------------------------------------------------------------
  */
  FUNCTION fn_pre_pickup_basis_amt(p_contract_ref_no IN oltbs_contract.contract_ref_no%Type,
                               p_value_date      IN oltbs_contract_master.value_date%Type,
                               p_component       IN lftbs_contract_fee.component%Type,
                               p_start_date      IN lftbs_contract_fee.start_date%Type Default Null,
                               p_end_date        IN lftbs_contract_fee.end_date%Type Default Null,
                               p_basis_amount    IN OUT lftbs_contract_fee_vd_changes.basis_amount%Type,
                               p_error_code      IN OUT Varchar2,
                               p_error_parameter IN OUT Varchar2)
    Return Boolean;

  FUNCTION fn_post_pickup_basis_amt(p_contract_ref_no IN oltbs_contract.contract_ref_no%Type,
                               p_value_date      IN oltbs_contract_master.value_date%Type,
                               p_component       IN lftbs_contract_fee.component%Type,
                               p_start_date      IN lftbs_contract_fee.start_date%Type Default Null,
                               p_end_date        IN lftbs_contract_fee.end_date%Type Default Null,
                               p_basis_amount    IN OUT lftbs_contract_fee_vd_changes.basis_amount%Type,
                               p_error_code      IN OUT Varchar2,
                               p_error_parameter IN OUT Varchar2)
    Return Boolean;
	
	FUNCTION fn_pre_check_component(p_contract_ref_no   IN oltbs_contract.contract_ref_no%Type,
                              p_value_date        IN oltbs_contract_master.value_date%Type,
                              p_component         IN lftbs_contract_fee.component%Type,
                              p_process_till_date IN Date,
                              p_process_comp      IN OUT Varchar2,
                              p_pop_pay_recv      IN OUT Varchar2, 
                              p_error_code        IN OUT Varchar2,
                              p_error_parameter   IN OUT Varchar2)
    Return Boolean;
	
	FUNCTION fn_post_check_component(p_contract_ref_no   IN oltbs_contract.contract_ref_no%Type,
                              p_value_date        IN oltbs_contract_master.value_date%Type,
                              p_component         IN lftbs_contract_fee.component%Type,
                              p_process_till_date IN Date,
                              p_process_comp      IN OUT Varchar2,
                              p_pop_pay_recv      IN OUT Varchar2, 
                              p_error_code        IN OUT Varchar2,
                              p_error_parameter   IN OUT Varchar2)
    Return Boolean;
    ---Bug#34328155 STRATS
    FUNCTION Fn_pre_Populate_Fee_Calc(p_Contract_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                p_Value_Date      IN Oltbs_Contract_Master.Value_Date%TYPE,
                                p_Component       IN Lftbs_Contract_Fee.Component%TYPE,
                                p_Pickup_Esn      IN Lftbs_Contract_Fee.Event_Seq_No%TYPE,
                                p_Component_Ccy   IN Lftbs_Contract_Fee.Component_Ccy%TYPE,
                                p_Basis_Tag       IN Lftms_Product_Fee.Basis_Amount_Tag%TYPE,
                                p_Pop_Pay_Recv    IN VARCHAR2, 
                                p_Error_Code      IN OUT VARCHAR2,
                                p_Error_Parameter IN OUT VARCHAR2)
    RETURN BOOLEAN;
    
    FUNCTION Fn_post_Populate_Fee_Calc(p_Contract_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                p_Value_Date      IN Oltbs_Contract_Master.Value_Date%TYPE,
                                p_Component       IN Lftbs_Contract_Fee.Component%TYPE,
                                p_Pickup_Esn      IN Lftbs_Contract_Fee.Event_Seq_No%TYPE,
                                p_Component_Ccy   IN Lftbs_Contract_Fee.Component_Ccy%TYPE,
                                p_Basis_Tag       IN Lftms_Product_Fee.Basis_Amount_Tag%TYPE,
                                p_Pop_Pay_Recv    IN VARCHAR2, 
                                p_Error_Code      IN OUT VARCHAR2,
                                p_Error_Parameter IN OUT VARCHAR2)
    RETURN BOOLEAN;
    
    ---Bug#34328155 ENDS

end lfpks_feecalc_custom;
/