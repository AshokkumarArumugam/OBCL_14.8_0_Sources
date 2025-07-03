create or replace package olpks_payment as

/*----------------------------------------------------------------------------------------------------
**
** File Name  : olpks_payment.spc
**
** Module    : LOANS and DEPOSITS
**
**  This source is part of the Oracle Banking Corporate Lending  Software Product.
**  Copyright ? 2019 , Oracle and/or its affiliates.  All rights reserved.
**  No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, ** photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle ** and/or its affiliates.
**
**  Oracle Financial Services Software Limited.
**  Oracle Park, Off Western Express Highway,
**   Goregaon (East),
**  Mumbai - 400 063, India.
  SFR Number         : 25075539
  Search String      : OFCL_12.3.0.0.0_25075539
  Changed By         : K.PRIYADARSHINI
  Change Description : changed the oltb_contract_upload tables to oltbs_contract_liq_summary in all functions using it.
   SFR Number         : 25048915
  Search String      : OFCL_12.3.0.0.0_25048915
  Changed By         : Ravi Ranjan
  Change Description : Adding Fn_Sgen_Ovd to call from OLDREFND function id 
  
  Search String      : OFCL_14.1.0.0.0_OlSimulation
  Changed By         : Arunadevi Rajendran
  Change Description : OL Payment simulation
  
  Search String      : OBCL_14.2_RESD
  Changed By         : Vigneshram S
  Change Description : OL Payment Residual amount waiver  
  
  Search String      : OBCL_14.2_Prepayment_Sch_Changes
  Changed By         : Meha
  Change Description : OBCL_14.2_Prepayment_Sch_Changes  
----------------------------------------------------------------------------------------------------*/

  TYPE ty_tb_cont_liqd IS TABLE OF oltbs_contract_liq%ROWTYPE INDEX BY oltbs_contract_liq.component%TYPE;

 --OFCL_12.3.0.0.0_25075539 changes
  TYPE ty_tb_cont_liqd_summ IS TABLE OF oltbs_contract_liq_summary%ROWTYPE INDEX BY oltbs_contract_liq.component%TYPE;
--TYPE ty_tb_cont_liqd_upld IS TABLE OF oltbs_upload_liq%ROWTYPE INDEX BY oltbs_upload_liq.component%TYPE;

  Type ty_pymnt_rekey_dtls is record(p_value_date                OLTB_CONTRACT_LIQ_SUMMARY.VALUE_DATE%type,
   				     p_total_paid                OLTB_CONTRACT_LIQ_SUMMARY.TOTAL_PAID%type);

  TYPE ty_pmnt_upld IS RECORD(
    lcy_eqvt_total_paid    NUMBER,
    lcy_eqvt_tot_prepaid   NUMBER,
    lcy_eqvt_limit_amount  NUMBER,
    lcy_eqvt_lq_face_value NUMBER,
    od_amt                 NUMBER);

  TYPE p_ty_node IS TABLE OF VARCHAR2(30) INDEX BY VARCHAR2(30);

FUNCTION fn_initialise(p_contract_ref_no IN VARCHAR2,
                       p_errcode         IN OUT VARCHAR2,
                       p_params          IN OUT VARCHAR2) RETURN BOOLEAN;

function fn_payment_adv(cur_rec    oltbs_dly_msg_out%ROWTYPE) return integer;

FUNCTION Fn_Mandatory_Check(p_wrk_oldpmnt IN olpks_oldpmnt_main.ty_oldpmnt)
RETURN BOOLEAN;

 --OFCL_12.3.0.0.0_25075539 changes starts
FUNCTION fn_validations(p_ty_cont_liq_summ IN ty_tb_cont_liqd_summ,
                        p_liq_sum     IN oltbs_contract_liq_summary%ROWTYPE,
                        p_ty_pmnt     IN OUT ty_pmnt_upld)
RETURN BOOLEAN;
 --OFCL_12.3.0.0.0_25075539 changes ends

FUNCTION Fn_Copy_Liq_Sum(p_wrk_oldpmnt     IN olpks_oldpmnt_main.ty_oldpmnt,
                         p_Base_Liq_Sum    IN OUT oltbs_contract_liq_summary%ROWTYPE)
RETURN BOOLEAN;

FUNCTION Fn_Copy_Cont_Liq(p_wrk_oldpmnt     IN olpks_oldpmnt_main.ty_oldpmnt,
                          p_Cont_Liq        IN OUT Ty_Tb_Cont_Liqd)
RETURN BOOLEAN;

FUNCTION Fn_Populate_Blk_Pmt(p_Cont_Liq     IN OUT Ty_Tb_Cont_Liqd,
                             p_Base_Liq_Sum IN OUT oltbs_contract_liq_summary%ROWTYPE)
RETURN BOOLEAN;

FUNCTION Fn_Auto_Allocate(p_Prod         IN oltms_product_liq_order.Product%TYPE,
                          p_Cont_Liq    IN OUT Ty_Tb_Cont_Liqd,
                          p_Base_Liq_Sum IN oltbs_contract_liq_summary%ROWTYPE)
RETURN BOOLEAN;

FUNCTION Fn_Insert_Master_Tables(p_Cont_Liq     IN Ty_Tb_Cont_Liqd,
                                 p_Base_Liq_Sum IN oltbs_contract_liq_summary%ROWTYPE)
RETURN BOOLEAN;

FUNCTION Fn_Settlement_Pickup(p_Contract_Refno IN VARCHAR2,
                              p_Esn            IN NUMBER)
RETURN BOOLEAN;

FUNCTION Fn_Presave(p_Cont_Liq     IN Ty_Tb_Cont_Liqd,
                    p_Base_Liq_Sum IN oltbs_contract_liq_summary%ROWTYPE,
                    p_Ty_Pmnt      IN OUT Ty_Pmnt_Upld)
RETURN BOOLEAN;

FUNCTION Fn_Save(p_Ty_Cont_Liq  IN OUT Ty_Tb_Cont_Liqd,
                 p_Base_Liq_Sum IN OUT oltbs_contract_liq_summary%ROWTYPE)
RETURN BOOLEAN;

FUNCTION fn_payment_auth(p_contract_ref_no   IN VARCHAR2,
                         p_source_code       IN VARCHAR2,
                         p_pymnt_rekey_dtls  IN OUT ty_pymnt_rekey_dtls,
                         p_is_msg_gen_reqd IN VARCHAR2,
                         p_err_tbl           IN OUT ovpks.tbl_error)
RETURN BOOLEAN;

FUNCTION fn_delete_vami_pmnt(p_contract_ref_no IN OUT VARCHAR2,
   			     p_event_seq_no IN NUMBER,
			     p_source	IN VARCHAR2,
			     p_action	IN VARCHAR2)
RETURN BOOLEAN;

FUNCTION fn_reverse_payment(p_contract_ref_no IN OUT VARCHAR2,
 			    p_event_seq_no IN NUMBER,
			    p_source	IN VARCHAR2,
 		    	    p_function_id IN VARCHAR2,
			    p_rev_chk IN VARCHAR2,
                    	    p_override_flag   OUT VARCHAR2)
RETURN BOOLEAN;
--OFCL_12.3.0.0.0_25048915
FUNCTION Fn_Sgen_Ovd(Pcontractrefno IN oltbs_contract.Contract_Ref_No%TYPE,
                       Pesn           IN oltbs_contract.Latest_Event_Seq_No%TYPE,
                       Psgendate      IN DATE) RETURN Boolean ;
--OFCL_12.3.0.0.0_25048915
--OFCL_14.1.0.0.0_OlSimulation
FUNCTION fn_mesg_gen_on_auth(pref_no   IN VARCHAR2,
                               pesn      IN NUMBER,
                               p_errcode IN OUT VARCHAR2,
                               p_params  IN OUT VARCHAR2) RETURN BOOLEAN;
--OFCL_14.1.0.0.0_OlSimulation


FUNCTION Fn_Resd_waiv_Liq(p_wrk_oldpmnt IN OUT olpks_oldpmnt_main.ty_oldpmnt) RETURN BOOLEAN; --OBCL_14.2_RESD 

--OBCL_14.2_Prepayment_Sch_Changes Starts
Function Fn_Redefine_Maturity_Sch(p_Reference_No 	In oltbs_contract.Contract_Ref_No%Type
								 ,p_Esn		 		In oltbs_contract_liq_summary.event_seq_no%Type
								 ,p_Version_No      In oltbs_contract_master.Version_No%Type
								 ,p_Contract_Type   In Varchar2
								 ,p_Value_Date      In Date
								 ,p_Effective_Date  In Date													
								 ,p_Error_Code      In Out Varchar2)
Return Boolean;
--OBCL_14.2_Prepayment_Sch_Changes Ends

end olpks_payment;
/
create or replace synonym olpkss_payment for olpks_payment
/