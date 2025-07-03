CREATE OR REPLACE PACKAGE olpks_link AS
  /*----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_link.SPC
  **
  ** Module : LOANS and DEPOSITS
  **
    This source is part of the Oracle Banking Corporate Lending  Software Product.
    Copyright ? 2019 , Oracle and/or its affiliates.  All rights reserved.
    No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates.
  
    Oracle Financial Services Software Limited.
    Oracle Park, Off Western Express Highway,
    Goregaon (East),
    Mumbai - 400 063, India.
  
  
    Change History:
  
    Changed By      : Krithika G
    Change Description  : Changes done for 12.5 ELCM
  
    **Changed By         : Krithika G
      **Change Description : OBCL 14.0 EOD Batch Changes
      **Search String      : OBCL_14.0_Batch_Changes
  
    **Changed By         : Baljinder Singh
    **SFR Number         : 27808369
    **Change Description : During deletion of Contract linked with commitment, increase was happening for Non-revolving line linked to commitment
    **Search String      : 27808369
  
    **Changed By         : Krithika G
   **Change Description : on DLNK event Block should not happen
   **Search String      : OBCL_14.1_Issue_No_108_PS
   
   **Changed By         : Vineeth T M
   **Changed On         : 27-Apr-2021
   **Change Description : Event Block should not happen for DLNK fired with manual liqd of Drawdown
   **Search String      : OBCL_14.4_LS_DLNK_EL Changes
  
  **Changed By         : Chandra Achuta
  **Date               : 02-JUN-2022
  **Change Description : Hook request for error code skip case.
  **Search String      : Bug#34224604  
  
  **Changed By         : Abhik Das
  **Date               : 11-Jul-2024
  **Change Description : Added Flag to Reinstate Commitment in case of Reprice.
					     --fwdport of Bug#36538465
  **Search String      : OBCL_14.7_INTERNAL_fwdport_Bug#36751842_Changes
  ----------------------------------------------------------------------------------------------------
  */
  /* CHANGE_HISTORY
  
  FCC 3.8 Retro (SFR 742) added 2 more parameters in fn_update_os_bal for taking care
  of the updation of commitment balance while deleting a loan when it is linked to this commitment
  
  16/02/2002  FCC 3.9 ITR1 SFR #191 - for non-revolving commitments, o/s bal is getting updated wrongly
  
  19-MAR-2003  FCC4.2 APR 2003 LS changes
      -- Moved fn_update_linkages_FOR_PAYMENT from package body to spec
  29-DEC-2004 FCC 4.6.1 JAN 2005 RETRO CHANGES - SFR # PLC40130074
        New function fn_check_commitment_avail added. This function is used to restrict the usage
        of commitment in the following case :- When a commitment has an interest or charge comp.
        whose basis amt. is the unutilised amt, then as per schedule the interest will be liquidated.
        But when a back valued Loan using this commitment whose value date is before the interest
        liquidation schedule, then commitment charge will come down due to utilisation. To avoid this,
        we don't allow usage of a commitment in a bak valued loan if any of its schedules are liquidated.
  - FCC 4.6.1 JAN 2005 ITR-1 SFR-196 For changing copyright clause / release name
  03-AUG-2007 FCC V.CL Release 7.3 SPLIT Re Price changes(new function is introduced which will be called from lbpks_reprice pckg)
  06-Aug-2008 FCC V.CL Release 7.4 STP exchange rate amendment changes, New function (fn_link_during_exrate_amend) has been added,
                        this function will process the new exchange rate which is maintained
                        in exchange rate maintenance screen and pass the link or dlink on the commitment.
                        This could be called online(During auth of OLDEXAMD screen, batch and STP
  29-JUN-2009 FLEXCUBE V.CL Release 7.5 lot2 ITR2 SFR#8 CITIPBGIT<SFR#170> Changes, for capitalisation type of contracts,
                    during capitalisation system should pass the LINK event on the commitment for utilization.
  31-AUG-2009 FLEXCUBE V.CL Release 7.5 LOT3 FS Tag 03 Commitment Linkage Amendment changes
  09-DEC-2009 FLEXCUBE V.CL Release 7.6 PBG CONSOLIDATION, 14-OCT-2009 CITIUS-LS#6763 Pay recv liquidations for LD module.
  */
  
  FUNCTION Fn_Skip_Custom RETURN BOOLEAN;--29640526 change
  
	--Bug#34224604  Changes Starts
	PROCEDURE Pr_Set_Skip_Kernel;
	PROCEDURE Pr_Set_Activate_Kernel;
	PROCEDURE Pr_Set_Skip_Cluster;
	PROCEDURE Pr_Set_Activate_Cluster;
	FUNCTION Fn_Skip_Kernel RETURN BOOLEAN;
	--Bug#34224604  Changes Ends
  g_reinstate_comm VARCHAR(1)  := 'N';----OBCL_14.7_INTERNAL_fwdport_Bug#36751842_Changes
  TYPE ty_util_rec IS RECORD(
    linked_to_branch oltbs_contract_linkages.linked_to_branch%TYPE,
    linked_to_ref    oltbs_contract_linkages.linked_to_ref%TYPE,
    utilised_amount  oltbs_contract_linkages.converted_linked_amount%TYPE,
    available_amount oltbs_contract_linkages.converted_linked_amount%TYPE);

  TYPE ty_tab_util IS TABLE OF ty_util_rec INDEX BY BINARY_INTEGER;

  FUNCTION fn_link_during_book(pm_reference  IN oltbs_contract.contract_ref_no%TYPE,
                               pm_version    IN oltbs_contract.latest_version_no%TYPE,
                               pm_esn        IN oltbs_contract.latest_event_seq_no%TYPE,
                               pm_auth_stat  IN CHAR,
                               pm_value_date IN DATE,
                               pm_err_code   IN OUT ertbs_msgs.err_code%TYPE,
                               pm_params     IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION fn_link_during_payment(pm_reference  IN oltbs_contract.contract_ref_no%TYPE,
                                  pm_version    IN oltbs_contract.latest_version_no%TYPE,
                                  pm_esn        IN oltbs_contract.latest_event_seq_no%TYPE,
                                  pm_amount     IN oltbs_contract_master.amount%TYPE,
                                  pm_auth_stat  IN CHAR,
                                  pm_value_date IN DATE,
                                  pm_err_code   IN OUT ertbs_msgs.err_code%TYPE,
                                  pm_params     IN OUT VARCHAR2,
                                  p_supress_elcm  VARCHAR2 DEFAULT 'N') --OBCL_14.4_LS_DLNK_EL Changes)
    RETURN BOOLEAN;

  FUNCTION fn_adjust_comm_util(pm_reference  IN oltbs_contract.contract_ref_no%TYPE,
                               pm_esn        IN oltbs_contract.contract_ref_no%TYPE,
                               pm_act_code   IN VARCHAR2,
                               pm_comm_ccy   IN oltbs_contract.contract_ccy%TYPE,
                               pm_amount     IN oltbs_contract_master.amount%TYPE,
                               pm_value_date IN DATE,
                               pm_auth_stat  IN CHAR,
                               pm_err_code   IN OUT ertbs_msgs.err_code%TYPE,
                               pm_params     IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION fn_delete_link_for_event(pm_reference IN oltbs_contract.contract_ref_no%TYPE,
                                    pm_esn       IN oltbs_contract.latest_event_seq_no%TYPE,
                                    pm_event     IN oltbs_contract.curr_event_code%TYPE,
                                    pm_version   IN oltbs_contract.latest_version_no%TYPE
                                    --- TRLRABO - TIL NO. 340
                                    
                                    -- Changed date passed to value date as it should be vd for back valued
                                    -- contracts and not current date
                                   ,
                                    pm_value_date IN date
                                    
                                    --- TRLRABO - TIL NO. 340
                                   ,
                                    pm_err_code IN OUT ertbs_msgs.err_code%TYPE,
                                    pm_params   IN OUT VARCHAR2 ,
                                    p_supress_elcm  VARCHAR2 DEFAULT 'N') --OBCL_14.4_LS_DLNK_EL Changes
    RETURN BOOLEAN;

  --Krithika
  FUNCTION Fn_Multi_Linkages(Pcontractrefno  IN Oltbs_Contract.Contract_Ref_No%TYPE,
                             Platestesn      IN Oltbs_Contract.Latest_Event_Seq_No%TYPE,
                             Platestvsn      IN Oltbs_Contract.Latest_Version_No%TYPE,
                             p_Mode          IN VARCHAR2,
                             p_Retovr        IN VARCHAR2,
                             p_Event         IN VARCHAR2,
                             p_Princ_Amt     IN NUMBER,
                             Perrorcode      IN OUT Ertbs_Msgs.Err_Code%TYPE,
                             p_force_process IN VARCHAR2 DEFAULT 'N') -----27808369
   RETURN BOOLEAN;
  --Krithika Changes ends

  FUNCTION fn_reverse_link_for_event(pm_reference    IN oltbs_contract.contract_ref_no%TYPE,
                                     pm_reversed_esn IN oltbs_contract.latest_event_seq_no%TYPE,
                                     pm_reversal_esn IN oltbs_contract.latest_event_seq_no%TYPE,
                                     pm_version      IN oltbs_contract.latest_version_no%TYPE,
                                     pm_auth_stat    IN CHAR,
                                     pm_event_code   IN oltbs_contract.curr_event_code%TYPE,
                                     pm_err_code     IN OUT ertbs_msgs.err_code%TYPE,
                                     pm_params       IN OUT VARCHAR2,
                                     p_supress_elcm  VARCHAR2 DEFAULT 'N') --OBCL_14.1_Issue_No_108_PS
   RETURN BOOLEAN;

  /*FUNCTION fn_link_during_DSBR(pm_reference  IN oltbs_contract.contract_ref_no%TYPE,
  pm_version    IN oltbs_contract.latest_version_no%TYPE,
  pm_esn        IN oltbs_contract.latest_event_seq_no%TYPE,
  pm_auth_stat  IN CHAR,
  pm_value_date IN DATE,
  pm_err_code   IN OUT ertbs_msgs.err_code%TYPE,
  pm_params     IN OUT VARCHAR2) RETURN BOOLEAN;*/

  FUNCTION fn_link_during_dsbr(pm_reference        IN oltbs_contract.contract_ref_no%TYPE,
                               pm_version          IN oltbs_contract.latest_version_no%TYPE,
                               pm_dsbr_amount      IN oltbs_contract_linkages.linked_amount%TYPE,
                               pm_dsbr_conv_amount IN oltbs_contract_linkages.converted_linked_amount%TYPE,
                               pm_action           IN VARCHAR2,
                               pm_value_date       IN DATE,
                               pm_esn              IN oltbs_contract.latest_event_seq_no%TYPE,
                               pm_auth_stat        IN CHAR,
                               pm_err_code         IN OUT ertbs_msgs.err_code%TYPE,
                               pm_params           IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION fn_link_during_amend(pm_reference   IN oltbs_contract.contract_ref_no%TYPE,
                                pm_old_version IN oltbs_contract.latest_version_no%TYPE,
                                pm_value_date  IN DATE,
                                pm_esn         IN oltbs_contract.latest_event_seq_no%TYPE,
                                pm_auth_stat   IN CHAR,
                                pm_err_code    IN OUT ertbs_msgs.err_code%TYPE,
                                pm_params      IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION fn_process_a_contract(pm_reference    IN oltbs_contract.contract_ref_no%TYPE,
                                 pm_linkage_type IN CHAR,
                                 pm_chk_revol    IN CHAR := 'N',
                                 pm_linked_ccy   IN oltbs_contract.contract_ccy%TYPE,
                                 pm_amount       IN oltbs_contract_master.amount%TYPE,
                                 pm_act_code     IN VARCHAR2,
                                 pm_value_date   IN DATE,
                                 pm_auth_stat    IN CHAR,
                                 pm_updated      IN OUT CHAR,
                                 pm_linked_esn   IN OUT oltbs_contract.latest_event_seq_no%TYPE,
                                 pm_err_code     IN OUT ertbs_msgs.err_code%TYPE,
                                 pm_params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION fn_update_linkages(pm_branch      IN oltbs_contract.branch%TYPE,
                              pm_reference   IN oltbs_contract.contract_ref_no%TYPE,
                              pm_version     IN oltbs_contract.latest_version_no%TYPE,
                              pm_cont_esn    IN oltbs_contract.latest_event_seq_no%TYPE,
                              pm_linked_ref  IN oltbs_contract_linkages.linked_to_ref%TYPE,
                              pm_linked_esn  IN oltbs_contract.latest_event_seq_no%TYPE,
                              pm_link_type   IN oltbs_contract_linkages.linkage_type%TYPE,
                              pm_amount      IN oltbs_contract_master.amount%TYPE,
                              pm_conv_amt    IN oltbs_contract_master.amount%TYPE,
                              pm_upd_con_tbl IN CHAR,
                              pm_amt_blk_no  IN oltbs_contract_linkages.amount_block_number%TYPE
                              --- TRLRABO - TIL NO. 340
                              
                              --- Commitment Interest on reducing balance , related changes
                             ,
                              pm_vd IN date
                              
                              --- TRLRABO - TIL NO. 340
                             ,
                              pm_event       IN CHAR --FCC 3.9 ITR1 SFR #191
                             ,
                              pm_err_code    IN OUT ertbs_msgs.err_code%TYPE,
                              pm_params      IN OUT VARCHAR2,
                              p_supress_elcm VARCHAR2 DEFAULT 'N')
    RETURN BOOLEAN; --OBCL_14.1_Issue_No_108_PS

  --29-JUN-2009 FLEXCUBE V.CL Release 7.5 lot2 ITR2 SFR#8 CITIPBGIT<SFR#170> Change starts here
  FUNCTION fn_update_linkages_for_capit(pm_branch     IN oltbs_contract.branch%TYPE,
                                        pm_reference  IN oltbs_contract.contract_ref_no%TYPE,
                                        pm_version    IN oltbs_contract.latest_version_no%TYPE,
                                        pm_cont_esn   IN oltbs_contract.latest_event_seq_no%TYPE,
                                        pm_linked_ref IN oltbs_contract_linkages.linked_to_ref%TYPE,
                                        pm_linked_esn IN oltbs_contract.latest_event_seq_no%TYPE,
                                        pm_link_type  IN oltbs_contract_linkages.linkage_type%TYPE,
                                        pm_amount     IN oltbs_contract_master.amount%TYPE,
                                        pm_conv_amt   IN oltbs_contract_master.amount%TYPE,
                                        pm_amt_blk_no IN oltbs_contract_linkages.amount_block_number%TYPE,
                                        pm_vd         IN DATE,
                                        pm_err_code   IN OUT ertbs_msgs.err_code%TYPE,
                                        pm_params     IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --29-JUN-2009 FLEXCUBE V.CL Release 7.5 lot2 ITR2 SFR#8 CITIPBGIT<SFR#170> Change ends here

  FUNCTION fn_get_util(pm_reference IN oltbs_contract.contract_ref_no%TYPE,
                       pm_version   IN oltbs_contract.latest_version_no%TYPE,
                       pm_util_tab  IN OUT ty_tab_util) RETURN BOOLEAN;

  FUNCTION fn_get_util(pm_reference IN oltbs_contract.contract_ref_no%TYPE,
                       pm_version   IN oltbs_contract.latest_version_no%TYPE,
                       pm_link_type IN oltbs_contract_linkages.linkage_type%TYPE,
                       pm_util_tab  IN OUT ty_tab_util) RETURN BOOLEAN;

  FUNCTION fn_get_util_for_link(pm_branch       IN oltbs_contract.branch%TYPE,
                                pm_reference    IN oltbs_contract.contract_ref_no%TYPE,
                                pm_linkage_type IN oltbs_contract_linkages.linkage_type%TYPE,
                                pm_amt_avail    IN OUT oltbs_contract_master.amount%TYPE,
                                pm_amt_util     IN OUT oltbs_contract_master.amount%TYPE)
    RETURN BOOLEAN;

  FUNCTION fn_update_os_bal(pm_reference IN oltbs_contract.contract_ref_no%TYPE)
    RETURN BOOLEAN;

  -- fcc 3.8 retro (citiplc sfr 742 starts) : added this function
  FUNCTION fn_update_os_bal(pm_linked_ref IN oltbs_contract.contract_ref_no%TYPE,
                            pm_reference  IN oltbs_contract.contract_ref_no%TYPE, --PLNCITI TILL#3289 added the 2 params
                            pm_event      IN varchar2) RETURN BOOLEAN;
  -- fcc 3.8 retro (citiplc sfr 742 starts) : added this function

  FUNCTION fn_link_during_maturity(pm_reference IN oltbs_contract.contract_ref_no%TYPE,
                                   pm_version   IN oltbs_contract.latest_version_no%TYPE,
                                   pm_err_code  IN OUT ertbs_msgs.err_code%TYPE,
                                   pm_params    IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION fn_link_during_undo_maturity(pm_reference IN oltbs_contract.contract_ref_no%TYPE,
                                        pm_version   IN oltbs_contract.latest_version_no%TYPE,
                                        pm_err_code  IN OUT ertbs_msgs.err_code%TYPE,
                                        pm_params    IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION fn_link_during_authorize(pm_reference IN oltbs_contract.contract_ref_no%TYPE,
                                    pm_esn       IN oltbs_contract.latest_event_seq_no%TYPE,
                                    pm_err_code  IN OUT ertbs_msgs.err_code%TYPE,
                                    pm_params    IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION fn_link_during_rollover(pm_reference  IN oltbs_contract.contract_ref_no%TYPE,
                                   pm_version    IN oltbs_contract.latest_version_no%TYPE,
                                   pm_esn        IN oltbs_contract.latest_event_seq_no%TYPE,
                                   pm_amount     IN oltbs_contract_master.amount%TYPE,
                                   pm_auth_stat  IN CHAR,
                                   pm_value_date IN DATE,
                                   pm_err_code   IN OUT ertbs_msgs.err_code%TYPE,
                                   pm_params     IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --sitaram
  FUNCTION fn_delete_availment(pm_reference IN oltbs_contract.contract_ref_no%TYPE,
                               pm_version   IN oltbs_contract.latest_version_no%TYPE,
                               pm_esn       IN oltbs_contract.latest_event_seq_no%TYPE,
                               pm_event     IN oltbs_contract.curr_event_code%TYPE,
                               pm_amount    IN oltbs_contract_master.amount%TYPE,
                               pm_err_code  IN OUT ertbs_msgs.err_code%TYPE,
                               pm_params    IN OUT VARCHAR2) RETURN BOOLEAN;

  --19-MAR-2003 FCC4.2 APR 2003 LS changes start
  FUNCTION fn_update_linkages_FOR_PAYMENT(pm_branch      IN oltbs_contract.branch%TYPE,
                                          pm_reference   IN oltbs_contract.contract_ref_no%TYPE,
                                          pm_version     IN oltbs_contract.latest_version_no%TYPE,
                                          pm_cont_esn    IN oltbs_contract.latest_event_seq_no%TYPE,
                                          pm_linked_ref  IN oltbs_contract_linkages.linked_to_ref%TYPE,
                                          pm_linked_esn  IN oltbs_contract.latest_event_seq_no%TYPE,
                                          pm_link_type   IN oltbs_contract_linkages.linkage_type%TYPE,
                                          pm_amount      IN oltbs_contract_master.amount%TYPE,
                                          pm_conv_amt    IN oltbs_contract_master.amount%TYPE,
                                          pm_upd_con_tbl IN CHAR,
                                          pm_amt_blk_no  IN oltbs_contract_linkages.amount_block_number%TYPE,
                                          --- TRLRABO - TIL NO. 340
                                          
                                          --- Commitment Interest on reducing balance , related changes
                                          pm_vd         IN date,
                                          PM_EVENT_CODE IN VARCHAR2,
                                          --3.8 SFR #475
                                          --- TRLRABO - TIL NO. 340
                                          pm_conv_paid_amt IN oltbs_contract_master.amount%TYPE, --03-MAR-2003 CITIPLC change for LS
                                          pm_err_code      IN OUT ertbs_msgs.err_code%TYPE,
                                          pm_params        IN OUT VARCHAR2,
                                          p_supress_elcm  VARCHAR2 DEFAULT 'N') --OBCL_14.4_LS_DLNK_EL Changes
    RETURN BOOLEAN;
  --19-MAR-2003 FCC4.2 APR 2003 LS changes end
  --FCC 4.6.1 JAN 2005 RETRO CHANGES - SFR # PLC40130074
  FUNCTION fn_check_commitment_avail(pm_reference     IN oltbs_contract.contract_ref_no%TYPE,
                                     pm_version       IN oltbs_contract.latest_version_no%TYPE,
                                     pm_value_dt      IN oltbs_contract_master.value_date%TYPE,
                                     p_error_code     IN OUT VARCHAR2,
                                     p_error_param    IN OUT VARCHAR2,
                                     p_diff_amount    IN oltbs_contract_master.amount%TYPE := 0,
                                     p_ignore_bal_chk IN VARCHAR2 := 'N')
    RETURN BOOLEAN;
  --FCC 4.6.1 JAN 2005 RETRO CHANGES - SFR # PLC40130074

  --FCC V.CL Release 7.3 SPLIT Re Price changes starts
  FUNCTION Fn_update_link_during_roll(pm_branch        IN oltbs_contract.branch%TYPE,
                                      pm_reference     IN oltbs_contract.contract_ref_no%TYPE,
                                      pm_version       IN oltbs_contract.latest_version_no%TYPE,
                                      pm_cont_esn      IN oltbs_contract.latest_event_seq_no%TYPE,
                                      pm_linked_ref    IN oltbs_contract_linkages.linked_to_ref%TYPE,
                                      pm_linked_esn    IN oltbs_contract.latest_event_seq_no%TYPE,
                                      pm_link_type     IN oltbs_contract_linkages.linkage_type%TYPE,
                                      pm_amount        IN oltbs_contract_master.amount%TYPE --This amount should be negative for ROLL event..
                                     ,
                                      pm_conv_amt      IN oltbs_contract_master.amount%TYPE,
                                      pm_conv_paid_amt IN oltbs_contract_master.amount%TYPE,
                                      pm_event_code    IN VARCHAR2,
                                      pm_value_date    IN VARCHAR2,
                                      pm_err_code      IN OUT ertbs_msgs.err_code%TYPE,
                                      pm_params        IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --FCC V.CL Release 7.3 SPLIT Re Price changes ends

  -- 06-Aug-2008 FCC V.CL Release 7.4 STP exchange rate amendment changes start here
  FUNCTION fn_link_during_exrate_amend(pm_reference    IN oltbs_contract.contract_ref_no%TYPE,
                                       pm_batch_online IN VARCHAR2,
                                       pm_err_code     IN OUT ertbs_msgs.err_code%TYPE,
                                       pm_params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  -- 06-Aug-2008 FCC V.CL Release 7.4 STP exchange rate amendment changes end here

  --31-AUG-2009 FLEXCUBE V.CL Release 7.5 LOT3 FS Tag 03 Change starts here
  FUNCTION Fn_Linkage_Amendment(pm_reference    IN oltbs_contract.contract_ref_no%TYPE,
                                pm_version      IN oltbs_contract.latest_version_no%TYPE,
                                pm_value_date   IN DATE,
                                pm_new_comm_rec IN OLTB_CONTRACT_LINKAGES%ROWTYPE,
                                pm_old_comm_rec IN OLTB_CONTRACT_LINKAGES%ROWTYPE,
                                pm_esn          IN oltbs_contract.latest_event_seq_no%TYPE,
                                pm_err_code     IN OUT ertbs_msgs.err_code%TYPE,
                                pm_params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --31-AUG-2009 FLEXCUBE V.CL Release 7.5 LOT3 FS Tag 03 Change ends here

  --09-DEC-2009 FLEXCUBE V.CL Release 7.6 PBG CONSOLIDATION, CITIUS-LS#6763 Starts
  FUNCTION fn_link_during_payrecv(p_reference  IN oltbs_contract.contract_ref_no%TYPE,
                                  p_esn        IN oltbs_contract.latest_event_seq_no%Type,
                                  p_value_date IN OLTB_PAYRECV_PAID.paid_date%type,
                                  p_err_code   IN OUT VARCHAR2,
                                  p_params     IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --09-DEC-2009 FLEXCUBE V.CL Release 7.6 PBG CONSOLIDATION, CITIUS-LS#6763 Ends

  --OBCL_14.0_Batch_Changes

  FUNCTION fn_update_linkages_batch(pm_branch      IN oltbs_contract.branch%TYPE,
                                    pm_reference   IN oltbs_contract.contract_ref_no%TYPE,
                                    pm_version     IN oltbs_contract.latest_version_no%TYPE,
                                    pm_cont_esn    IN oltbs_contract.latest_event_seq_no%TYPE,
                                    pm_linked_ref  IN oltbs_contract_linkages.linked_to_ref%TYPE,
                                    pm_linked_esn  IN oltbs_contract.latest_event_seq_no%TYPE,
                                    pm_link_type   IN oltbs_contract_linkages.linkage_type%TYPE,
                                    pm_amount      IN oltbs_contract_master.amount%TYPE,
                                    pm_conv_amt    IN oltbs_contract_master.amount%TYPE,
                                    pm_upd_con_tbl IN CHAR,
                                    pm_amt_blk_no  IN oltbs_contract_linkages.amount_block_number%TYPE
                                    --- TRLRABO - TIL NO. 340
                                    
                                    --- Commitment Interest on reducing balance , related changes
                                   ,
                                    pm_vd IN DATE
                                    
                                    --- TRLRABO - TIL NO. 340
                                   ,
                                    pm_event    IN CHAR --FCC 3.9 ITR1 SFR #191
                                   ,
                                    pm_err_code IN OUT ertbs_msgs.err_code%TYPE,
                                    pm_params   IN OUT VARCHAR2)
    RETURN BOOLEAN;

--OBCL_14.0_Batch_Changes Ends

END olpks_link;
/
CREATE or replace SYNONYM olpkss_link FOR olpks_link
/