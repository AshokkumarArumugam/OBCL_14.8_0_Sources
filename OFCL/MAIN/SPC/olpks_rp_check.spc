CREATE OR REPLACE PACKAGE olpks_rp_check AS
  /*----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_rp_check.SPC
  **
  ** Module   : OL
  **
    This source is part of the Oracle Banking Corporate Lending  Software Product.
    Copyright ? 2021 , Oracle and/or its affiliates.  All rights reserved.
    No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates.

    Oracle Financial Services Software Limited.
    Oracle Park, Off Western Express Highway,
    Goregaon (East),
    Mumbai - 400 063, India.


  ----------------------------------------------------------------------------------------------------
  */
  /*
      Name            : olpks_rp_check
      Description     : Relationship Pricing Integration - Package for external services offered to a customer.
      Author          : Aishwarya
      Date Created    : 09-DEC-2020

   CHANGE HISTORY:
-------------------------------------------------------------------------------------------------------*/
FUNCTION Fn_check_rp(p_Ref            IN VARCHAR2,
					 p_Brn            IN VARCHAR2,
                     p_Customer_No    IN VARCHAR2,
                     p_Prod           IN VARCHAR2, 
					 p_Module         IN VARCHAR2,
					 p_Ccy            IN VARCHAR2,
					 p_acc_ext_system IN VARCHAR2,
					 p_Batch          IN VARCHAR2,
					 p_Diff_Amt       IN NUMBER,
					 p_Diff_Days      IN NUMBER,
                     p_Err_Code       IN OUT VARCHAR2,
                     p_Err_Params     IN OUT VARCHAR2) RETURN BOOLEAN;

FUNCTION Fn_insert_rp_details(p_Ref            IN VARCHAR2,
							  p_Ccy            IN VARCHAR2,
							  p_Customer_No    IN VARCHAR2,
							  p_Module         IN VARCHAR2,
							  p_Prod           IN VARCHAR2,
							  p_Brn            IN VARCHAR2,
							  p_Price_Code     IN VARCHAR2,
							  p_Ede_code       IN VARCHAR2,
							  p_ede_val_lst    IN VARCHAR2,
							  p_Process_No     IN NUMBER,
							  p_Msgid          IN VARCHAR2, 
							  p_acc_ext_system IN VARCHAR2,
							  p_Txn_Ccy        IN VARCHAR2,
							  p_Err_Code       IN OUT VARCHAR2,
							  p_Err_Params     IN OUT VARCHAR2) RETURN BOOLEAN;

FUNCTION fn_get_ede_value (p_ede_code        IN VARCHAR2,
                           p_contract_ref_no IN VARCHAR2,
						   p_Diff_Amt        IN NUMBER,
						   p_Diff_Days       IN NUMBER,
						   p_ede_expression  IN CLOB,
						   p_ede_type        IN VARCHAR2)
RETURN VARCHAR2;
FUNCTION fn_get_rp_rates(p_contract_ref_no  IN VARCHAR2,
						 p_component        IN VARCHAR2,
						 p_comp_type        IN VARCHAR2,
						 p_rate             IN OUT NUMBER,  
						 p_spread           IN OUT NUMBER,
						 p_min_rate         IN OUT NUMBER,
						 p_max_rate         IN OUT NUMBER,
						 p_rate_sign        IN OUT VARCHAR2,
						 p_min_rate_sign    IN OUT VARCHAR2,
						 p_max_rate_sign    IN OUT VARCHAR2,
						 p_rp_rate_applied  IN OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION fn_get_rp_rates(p_contract_ref_no  IN VARCHAR2,
						 p_component        IN VARCHAR2,
						 p_comp_type        IN VARCHAR2,
						 p_rate             IN OUT NUMBER,  
						 p_amount           IN OUT NUMBER,
						 p_waive            IN OUT VARCHAR2
						 )
RETURN BOOLEAN;

FUNCTION fn_check_rp_enabled(p_contract_ref_no IN  VARCHAR2,
							   p_source_system OUT VARCHAR2,
							   p_batch         OUT VARCHAR2
							)
 RETURN BOOLEAN;

END olpks_rp_check;
/
CREATE OR REPLACE SYNONYM olpkss_rp_check for olpks_rp_check
/