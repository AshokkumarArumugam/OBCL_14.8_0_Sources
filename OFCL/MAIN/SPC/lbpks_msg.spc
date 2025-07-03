CREATE OR REPLACE package lbpks_msg AS
  /*----------------------------------------------------------------------------------------------
  **
  ** File Name : lbpks_msg.SPC
  **
  ** Module    : LS (Loan Syndication)
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
  FUNCTION fn_ft_related_tables(p_product_code      IN  VARCHAR2,
                                p_contract_ref      IN  VARCHAR2,
                                p_cr_acc_branch     IN  VARCHAR2,
                                p_cr_amount         IN  VARCHAR2,
                                p_cr_ccy            IN  VARCHAR2,
                                p_cr_account        IN  VARCHAR2,
                                p_dr_acc_branch     IN  VARCHAR2,
                                p_dr_amount         IN  VARCHAR2,
                                p_dr_ccy            IN  VARCHAR2,
                                p_dr_account        IN  VARCHAR2,
                                p_lcy_equiv         IN  NUMBER,
                                p_lcy_rate          IN  NUMBER,
                                p_cust_no           IN  VARCHAR2,  
                                p_netting_ref_no    IN  VARCHAR2,  
                                l_VALUE_DATE        IN  DATE,
                                p_settlement_date   IN  DATE,   
                                p_serial            IN  oltbs_contract.serial_no%TYPE,  
                                P_ft_master_rec     OUT OLTBS_FTTB_CONTRACT_MASTER%ROWTYPE,
                                P_cstb_contract_rec OUT oltbs_contract%ROWTYPE,
                                p_err               OUT VARCHAR2,
                                p_err_params        OUT VARCHAR2) RETURN BOOLEAN;
  ----------------------------------------------------------------------
  FUNCTION fn_populate_ft_details(p_Ins_Amnd_Del      IN  VARCHAR2,
                                  p_netting_ref_no    IN  VARCHAR2,
                                  P_ft_master_rec     OUT OLTBS_FTTB_CONTRACT_MASTER%ROWTYPE,
                                  P_cstb_contract_rec OUT oltbs_contract%ROWTYPE,
                                  p_err               OUT VARCHAR2, 
                                  p_err_params        OUT VARCHAR2) RETURN BOOLEAN;
  ----------------------------------------------------------------------
  --MT103 TUNING INLINE WITH <GBPUBSW> START ADDED BY NAJEEB ON 18-JAN-2005
  FUNCTION fn_update_other_details(p_cont_ref_no    IN     VARCHAR2, 
                                   p_event_seq_no   IN     NUMBER, 
                                   p_error_code     IN OUT VARCHAR2, 
                                   p_err_params     IN OUT VARCHAR2) RETURN BOOLEAN;
  --MT103 TUNING INLINE WITH <GBPUBSW> START ADDED BY NAJEEB ON 18-JAN-2005
  ----------------------------------------------------------------------
  FUNCTION fn_delete_for_borr_cont(p_borr_contract IN VARCHAR2,  
                                   --p_del_rev IN VARCHAR2,  --FCC 6.2.2 MTR2 SFR#9 changes by Satya
                                   p_err OUT VARCHAR2, 
                                   p_err_params OUT VARCHAR2) RETURN BOOLEAN;
  ----------------------------------------------------------------------
END lbpks_msg;
/
CREATE or replace SYNONYM lbpkss_msg FOR lbpks_msg
/