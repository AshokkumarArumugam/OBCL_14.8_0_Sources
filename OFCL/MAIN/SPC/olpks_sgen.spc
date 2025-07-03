CREATE OR REPLACE PACKAGE olpks_sgen AS

  /*----------------------------------------------------------------------------------------------------
    **
    ** File Name    : olpks_sgen.SPC
    **
    ** Module       : SETTLEMENT INSTRUCTIONS
    **
  This source is part of the Oracle Banking Corporate Lending  Software Product.
  Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.
  No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates.
  
  Oracle Financial Services Software Limited.
  Oracle Park, Off Western Express Highway,
  Goregaon (East),
  Mumbai - 400 063, India.
  ----------------------------------------------------------------------------------------------------
  */

  /*
  30-JULY-2003  FCC 4.3 August 2003 Development. Re-Written ISSGEN for all modules and integrated FX SGEN.
  
  10-OCT-2003 FCC 4.4 Dec 2003 Fast Settlement Change : Moved due_rec_type record variable to packag spec
  
  25-NOV-2003 FCC4.4 Dec 2003 MS changes
  
  --    FCC 4.4 DEC 2003 Fast Settlement Change starts :Moved the record variable to specification
  --
  23-FEB-2004 FCC 4.5 LOT1 FAST Changes
  
  25-MAR-2004   FCC 4.5 apr 2004 changes for RNTC -- ITR1 SFR 11.
  
  25-Jul-2004     FCC 4.6 Retro Form PLC43 Added Function FUNCTION fn_main_for_a_contract
  
  20-AUG-2004 FCC 4.6 Sep04 Release pay_or_receive flag in record type due_rec_type.
  22-AUG-2011 Flexcube V.CL Release 7.10,CITIUK Retro,EURCITIPLC-LS#10150 There are many incorrect entries generated from the Day5 batch. Please see the ITR file where I have hi-lighted one such entry. Please ensure ALL are checked.
  30-AUG-2011 Flexcube V.CL Release 7.10,CITIPBG Retro,TILL#5298 changes,ADDED NEW overloaded function  Fn_get_spot_date  .
  22-MAR-2012 flexcube V.CL Release 7.10,CITIUK Retro,EURCITIPLC-LS#13084 changes, When inputting an increase roll (forward dated) the interest out to the borrower is generated on the forward processor, but the borrower payment does not appear
  01-DEC-2012 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 FS Vol#1 Tag#10 Changes - Fee Processing Changes
  09-MAY-2016 OFCL12.2 Removed unwanted calls to LC,BC,SE
  06-Jun-2016 OFCL standalone changes, commented not required code. Search string--- OFCL12.2 Not required
  03-OCT-2016 -- Search String : OFCL 12.3 changes 
  end_of_input column is fetched from sttms_core_branch_status instead of oltms_branch
  
  ------------------------------------------------------------------------
  
    **  Changed By         : Revathi D
    **  Date               : 24-Dec-2020
    **  Change Description : Added the New job as OLSSGEN for future dated payment messages based on amount due table.                                     
    **  Search String      : OBCL_14.4_SGEN_PAYMENT_ACC_ENTRY_CHANGES 
	
  --------------------------------------------------------------------------------------
  
  */

  TYPE due_rec_type IS RECORD(
    contract_ref_no     oltbs_amount_due_cs.contract_ref_no%type,
    component           oltbs_amount_due_cs.component%type,
    component_type      oltbs_amount_due_cs.component_type%type, --FCC4.4 Dec 2003 MS changes
    amount_tag          oltms_product_event_acct_entry.amt_tag%type,
    due_date            oltbs_amount_due_cs.due_date%type,
    amount_due          oltbs_amount_due_cs.amount_due%type,
    currency_amount_due oltbs_amount_due_cs.currency_amt_due%type,
    account_due         oltbs_amount_due_cs.account_due%type,
    branch_account_due  oltbs_amount_due_cs.branch_account_due%type,
    --account_currency sttms_cust_account.ccy%type, -- OFCL12.2 Not required
    account_currency    oltb_account.AC_GL_CCY%type,
    counterparty        oltbs_amount_due_cs.counterparty%type,
    amount_settled      oltbs_amount_due_cs.amount_settled%type,
    inflow_outflow      oltbs_amount_due_cs.inflow_outflow%type,
    adjusted_amount     oltbs_amount_due_cs.adjusted_amount%type,
    exchange_rate       cytms_rates.mid_rate%type,
    settlement_required VARCHAR2(1),
    msg_event_seq_no    oltbs_contract_event_log.event_seq_no%type,
    ac_or_gl            oltbs_account.ac_or_gl%type,
    pay_receive         oltbs_settlements.pay_receive%type,
    receiver            oltbs_settlements.receiver%type,
    msg_netting         oltms_product_event_acct_entry.netting_indicator%TYPE,
    msg_nettable        oltbs_settlements.msg_nettable%TYPE,
    settlement_msg_date DATE,
    pay_msg_date        OLTB_AMOUNT_DUE_CS.pay_msg_date%TYPE, --FCC 4.4 DEC 2003 ITR-1 CHANGES
    recv_msg_date       OLTB_AMOUNT_DUE_CS.recv_msg_date%TYPE, --FCC 4.4 DEC 2003 ITR-1 CHANGES
    gen_recv_notice     oltbs_settlements.gen_recv_notice%type, --FCC 4.5 apr 2004
    generate_dd_msg     oltbs_settlements.generate_dd_msg%type, --FCC 4.5 APR 2004
    rntc_msg_date       OLTB_AMOUNT_DUE_CS.rntc_msg_date%TYPE, --FCC 4.5 APR 2004
    rntc_event_seq_no   OLTB_AMOUNT_DUE_CS.rntc_event_seq_no%TYPE, --FCC 4.5 APR 2004
    value_date          oltbs_amount_due_cs.due_date%type,
    pay_or_receive      varchar2(1), -- FCC 4.6 Sep04 Release
    event_code          oltbs_contract_event_log.event_code%type --22-MAR-2012 flexcube V.CL Release 7.10,CITIUK Retro,EURCITIPLC-LS#13084 changes
    );
  pkg_msg_event oltbs_contract.CURR_EVENT_CODE%TYPE; --22-AUG-2011 Flexcube V.CL Release 7.10,CITIUK Retro,EURCITIPLC-LS#10150 changes
  g_hold_contract VARCHAR2(1); --OBCL_14.4_FP_Browser_Changes
  TYPE due_tab_type IS TABLE OF due_rec_type INDEX BY BINARY_INTEGER;
  --
  -- FCC 4.4 DEC 2003 Fast Settlement Change ends :Moved the record variable to specification
  --

  -- FCC4.6 Retro Form PLC43 DV Sgen Changes
  FUNCTION fn_main_for_a_contract(p_Contract_Ref_No IN oltbs_contract.contract_ref_no%type, --GSUP FOR ADB FCC4.6 Retro from PLC43
                                  p_processing_date IN DATE,
                                  p_end_of_input    IN sttms_core_branch_status.end_of_input%Type, --OFCL 12.3 changes
								  p_module_code     IN oltbs_contract.module_code%TYPE,--OBCL_14.4_SGEN_PAYMENT_ACC_ENTRY_CHANGES
                                  p_error_code      IN OUT ertbs_msgs.err_code%Type,
                                  p_error_parameter IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION fn_main(p_processing_date IN DATE,
                   p_end_of_input    IN VARCHAR2,
                   p_error_code      IN OUT VARCHAR2,
                   p_error_parameter IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION fn_process_contract_manual(p_contract_ref_no IN oltbs_amount_due_cs.contract_ref_no%TYPE,
                                      p_module          IN oltbs_contract.module_code%TYPE,
                                      p_ccy             IN oltbs_contract.contract_ccy%TYPE,
                                      p_from_date       IN DATE,
                                      p_to_date         IN DATE,
                                      p_processing_date IN DATE,
                                      p_error_code      IN OUT VARCHAR2,
                                      p_error_parameter IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION fn_process_pending_contracts(p_where_clause    IN VARCHAR2,
                                        p_error_code      IN OUT VARCHAR2,
                                        p_error_parameter IN OUT VARCHAR2)
    RETURN BOOLEAN;

  -- FCC 4.5 LOT1 FAST Changes Starts
  FUNCTION fn_main_parallel(p_function_id     IN VARCHAR2,
                            p_end_of_input    IN VARCHAR2,
                            p_error_code      IN OUT VARCHAR2,
                            p_error_parameter IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION fn_sgen_wrapper(p_contract_tbl    IN olpkss_parallel.contracts_table,
                           p_end_of_input    IN VARCHAR2,
                           p_mode            IN VARCHAR2,
                           p_error_code      IN OUT VARCHAR2,
                           p_error_parameter IN OUT VARCHAR2) RETURN BOOLEAN;

  -- FCC 4.5 LOT1 FAST Changes Ends

  --30-AUG-2011 Flexcube V.CL Release 7.10,CITIPBG Retro,TILL#5298 changes start
  FUNCTION Fn_get_spot_date(p_ccy          Varchar2,
                            p_process_date Date,
                            p_spot_date    OUT Date,
                            p_err_code     IN OUT Varchar2,
                            p_err_param    IN OUT Varchar2) RETURN BOOLEAN;
  --30-AUG-2011 Flexcube V.CL Release 7.10,CITIPBG Retro,TILL#5298 changes end;
  --01-DEC-2012 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 FS Vol#1 Tag#10 Changes starts
  FUNCTION Fn_Regen_Msg_On_Unhold(p_contract_ref_no IN oltbs_contract.contract_ref_no%TYPE,
                                  p_value_date      IN DATE,
                                  p_ccy             IN oltbs_contract.contract_ccy%TYPE,
                                  p_seq_no	        IN lbtbs_contract_fwdevent.seq_no%TYPE,--OBCL_14.4_FP_Browser_Changes added
                                  p_Error_Code      IN OUT VARCHAR2,
                                  p_Error_Parameter IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --01-DEC-2012 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 FS Vol#1 Tag#10 Changes ends
    --OBCL_14.4_FP_Browser_Changes :: Starts
    FUNCTION Fn_Regen_Liqd_Msg_On_Unhold(p_contract_ref_no IN OLtbs_Contract.contract_ref_no%TYPE,
                                         p_value_date      IN DATE,
                                         p_ccy             IN oltbs_Contract.contract_ccy%TYPE,
                                         p_event_Code      IN lbtbs_contract_fwdevent.event_code%TYPE,
                                         p_seq_no          IN lbtbs_contract_fwdevent.seq_no%TYPE,
                                         p_Error_Code      IN OUT VARCHAR2,
                                         p_Error_Parameter IN OUT VARCHAR2)
      RETURN BOOLEAN;
    --OBCL_14.4_FP_Browser_Changes :: Ends
	--OBCL_14.4_SGEN_PAYMENT_ACC_ENTRY_CHANGES Starts
	FUNCTION Fn_main(
                   p_Module_Code     IN VARCHAR2,                  
                   p_Processing_Date IN DATE,
                   p_End_of_input    IN VARCHAR2,
                   p_Error_code      IN OUT VARCHAR2,
                   p_Error_parameter IN OUT VARCHAR2) RETURN BOOLEAN;
	--OBCL_14.4_SGEN_PAYMENT_ACC_ENTRY_CHANGES Ends
END olpks_sgen;
/
Create or replace synonym olpkss_sgen for olpks_sgen
/