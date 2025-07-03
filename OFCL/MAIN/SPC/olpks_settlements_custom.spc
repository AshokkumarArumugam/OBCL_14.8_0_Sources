CREATE OR REPLACE PACKAGE olpks_settlements_custom AS
  /*-----------------------------------------------------------------------------------------------------
    **
    ** File Name  : olpks_settlements_custom.spc
    **
    ** Module     : Loans and Deposits
    **
    ** This source is part of the Oracle FLEXCUBE Software Product.
    ** Copyright (R) 2019 , Oracle and/or its affiliates.  All rights reserved
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
  
    **SFR Number         :
    **Changed By         :
    **Change Description :
    **Search String      :
	
	**Changed By         : Vineeth T M
	**Date			   	 : 27-Sep-2022	
	**Change Description : Added hook for fn_insert_details 
	**Search String      : OBCL_14.5_SUPP#34637411 Changes
  
    -------------------------------------------------------------------------------------------------------
  */
 
   FUNCTION fn_pre_referral(
		p_cont_ref_no 				IN		VARCHAR2,
		p_event_seq_no 				IN		NUMBER,
		p_tag_list 					IN OUT	VARCHAR2,
		p_replicate 				IN		VARCHAR2,
		p_replicate_other_tags 		IN		VARCHAR2,
		p_tag_ccy_list 				IN OUT		VARCHAR2,
		p_pay_receive_list 			IN OUT		VARCHAR2,
		p_ac_branch_list 			IN OUT		VARCHAR2,
		p_account_list 				IN OUT		VARCHAR2,
		p_acc_ccy_list 				IN OUT		VARCHAR2,
		p_ex_rate_list				IN OUT		VARCHAR2,
		p_settlement_amt_list 		IN OUT		VARCHAR2,
		p_value_date_list 			IN OUT		VARCHAR2,
		p_payment_by_list 			IN OUT		VARCHAR2,
		p_transfer_type_list 		IN OUT		VARCHAR2,
		p_instr_type_list 			IN OUT		VARCHAR2,
		p_instr_no_list 			IN OUT		VARCHAR2,
		p_cover_reqd_list 			IN OUT		VARCHAR2,
		p_charges_details_list 		IN OUT		VARCHAR2,
		p_our_corresp_list 			IN OUT		VARCHAR2,
		p_receiver_list 			IN OUT		VARCHAR2,
		p_int_reim_inst_list 		IN OUT		VARCHAR2,
		p_rcvr_corresp_list 		IN OUT		VARCHAR2,
		p_intermediary_list 		IN OUT		VARCHAR2,
		p_acc_with_instn_list 		IN OUT		VARCHAR2,
		p_pay_details_list 			IN OUT		VARCHAR2,
		p_sndr_to_rcvr_list 		IN OUT		VARCHAR2,
		p_ordering_inst_list 		IN OUT		VARCHAR2,
		p_ordering_cust_list 		IN OUT		VARCHAR2,
		p_benef_inst_list 			IN OUT		VARCHAR2,
		p_ult_benef_list 			IN OUT		VARCHAR2,
		p_instruction_type_list		IN OUT		VARCHAR2,
		p_instruction_status_list	IN OUT		VARCHAR2,
		p_msg_nettable_list			IN OUT 	VARCHAR2,
		p_recv_ordering_inst_list	IN OUT 	VARCHAR2,
		p_recv_ordering_cust_list	IN OUT 	VARCHAR2,
		p_acc_cif_list				IN OUT		VARCHAR2,
		p_recv_intermediary_list	IN OUT		VARCHAR2,
		p_field72_conf_list			IN OUT		VARCHAR2,
		p_error_code 				IN OUT		VARCHAR2
		)
RETURN BOOLEAN;
	
   FUNCTION fn_post_referral(
		p_cont_ref_no 				IN		VARCHAR2,
		p_event_seq_no 				IN		NUMBER,
		p_tag_list 					IN OUT	VARCHAR2,
		p_replicate 				IN		VARCHAR2,
		p_replicate_other_tags 		IN		VARCHAR2,	
		p_tag_ccy_list 				IN OUT		VARCHAR2,
		p_pay_receive_list 			IN OUT		VARCHAR2,
		p_ac_branch_list 			IN OUT		VARCHAR2,
		p_account_list 				IN OUT		VARCHAR2,
		p_acc_ccy_list 				IN OUT		VARCHAR2,
		p_ex_rate_list				IN OUT		VARCHAR2,
		p_settlement_amt_list 		IN OUT		VARCHAR2,
		p_value_date_list 			IN OUT		VARCHAR2,
		p_payment_by_list 			IN OUT		VARCHAR2,
		p_transfer_type_list 		IN OUT		VARCHAR2,
		p_instr_type_list 			IN OUT		VARCHAR2,
		p_instr_no_list 			IN OUT		VARCHAR2,
		p_cover_reqd_list 			IN OUT		VARCHAR2,
		p_charges_details_list 		IN OUT		VARCHAR2,
		p_our_corresp_list 			IN OUT		VARCHAR2,
		p_receiver_list 			IN OUT		VARCHAR2,
		p_int_reim_inst_list 		IN OUT		VARCHAR2,
		p_rcvr_corresp_list 		IN OUT		VARCHAR2,
		p_intermediary_list 		IN OUT		VARCHAR2,
		p_acc_with_instn_list 		IN OUT		VARCHAR2,
		p_pay_details_list 			IN OUT		VARCHAR2,
		p_sndr_to_rcvr_list 		IN OUT		VARCHAR2,
		p_ordering_inst_list 		IN OUT		VARCHAR2,
		p_ordering_cust_list 		IN OUT		VARCHAR2,
		p_benef_inst_list 			IN OUT		VARCHAR2,
		p_ult_benef_list 			IN OUT		VARCHAR2,
		p_instruction_type_list		IN OUT		VARCHAR2,
		p_instruction_status_list	IN OUT		VARCHAR2,
		p_msg_nettable_list			IN OUT 	VARCHAR2,
		p_recv_ordering_inst_list	IN OUT 	VARCHAR2,
		p_recv_ordering_cust_list	IN OUT 	VARCHAR2,
		p_acc_cif_list				IN OUT		VARCHAR2,
		p_recv_intermediary_list	IN OUT		VARCHAR2,
		p_field72_conf_list			IN OUT		VARCHAR2,
		p_error_code 				IN OUT		VARCHAR2
		)
RETURN BOOLEAN;

--OBCL_14.5_SUPP#34637411 Changes start
FUNCTION Fn_Pre_Insert_Details(p_Cont_Ref_No          IN VARCHAR2,
                             p_Event_Seq_No         IN NUMBER,
                             p_Tag                  IN VARCHAR2,
                             p_Tag_Ccy              IN VARCHAR2,
                             p_Version_Flag         IN VARCHAR2,
                             p_Ccy_Restrict         IN VARCHAR2,
                             p_Pay_Recv_Flag        IN VARCHAR2,
                             p_Xfer_Type_Flag       IN VARCHAR2,
                             p_Settle_Ccy           IN VARCHAR2,
                             p_Cparty               IN VARCHAR2,
                             p_Module               IN VARCHAR2,
                             p_Branch               IN VARCHAR2,
                             p_Pay_By_Flag          IN VARCHAR2,
                             p_Instr_Type           IN VARCHAR2,
                             p_Instr_No             IN VARCHAR2,
                             p_Change_Ac_Flag       IN VARCHAR2,
                             p_Change_Rate_Flag     IN VARCHAR2,
                             p_Party_Info_Flag      IN VARCHAR2,
                             p_Pay_Details          IN VARCHAR2,
                             p_Charge_Details       IN VARCHAR2,
                             p_By_Order_Of          IN VARCHAR2,
                             p_Ult_Ben              IN VARCHAR2,
                             p_Product              IN VARCHAR2, 
                             p_Seq_No               IN NUMBER, 
                             p_Enrich_Settl_On_Save IN VARCHAR2, 
                             p_Error_Code           IN OUT VARCHAR2)
    RETURN BOOLEAN;

FUNCTION Fn_Post_Insert_Details(p_Cont_Ref_No          IN VARCHAR2,
                             p_Event_Seq_No         IN NUMBER,
                             p_Tag                  IN VARCHAR2,
                             p_Tag_Ccy              IN VARCHAR2,
                             p_Version_Flag         IN VARCHAR2,
                             p_Ccy_Restrict         IN VARCHAR2,
                             p_Pay_Recv_Flag        IN VARCHAR2,
                             p_Xfer_Type_Flag       IN VARCHAR2,
                             p_Settle_Ccy           IN VARCHAR2,
                             p_Cparty               IN VARCHAR2,
                             p_Module               IN VARCHAR2,
                             p_Branch               IN VARCHAR2,
                             p_Pay_By_Flag          IN VARCHAR2,
                             p_Instr_Type           IN VARCHAR2,
                             p_Instr_No             IN VARCHAR2,
                             p_Change_Ac_Flag       IN VARCHAR2,
                             p_Change_Rate_Flag     IN VARCHAR2,
                             p_Party_Info_Flag      IN VARCHAR2,
                             p_Pay_Details          IN VARCHAR2,
                             p_Charge_Details       IN VARCHAR2,
                             p_By_Order_Of          IN VARCHAR2,
                             p_Ult_Ben              IN VARCHAR2,
                             p_Product              IN VARCHAR2, 
                             p_Seq_No               IN NUMBER, 
                             p_Enrich_Settl_On_Save IN VARCHAR2, 
                             p_Error_Code           IN OUT VARCHAR2)
    RETURN BOOLEAN;
 --OBCL_14.5_SUPP#34637411 Changes end

END olpks_settlements_custom;
/