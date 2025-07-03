create or replace package lbpks_rollover_cluster is
  /*----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_rollover_cluster.SPC
  **
  ** Module   : LB
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
    Created On         : 28-Jun-2022
    Search String      : Bug#34323658   
    Change Reason      : Hook provided for FN_ROLL_A_CONTRACT_OVER
	
  */
  FUNCTION fn_pre_roll_a_contract_over(p_Contract_Ref_No      IN Oltbs_Contract.Contract_Ref_No%TYPE,
										p_Processing_Date      IN DATE,
										p_Authorization_Status IN Oltbs_Contract.Auth_Status%TYPE,
										p_Error_Code           IN OUT VARCHAR2,
										p_Error_Parameter      IN OUT VARCHAR2)
    Return Boolean;

  FUNCTION fn_post_roll_a_contract_over(p_Contract_Ref_No      IN Oltbs_Contract.Contract_Ref_No%TYPE,
										p_Processing_Date      IN DATE,
										p_Authorization_Status IN Oltbs_Contract.Auth_Status%TYPE,
										p_Error_Code           IN OUT VARCHAR2,
										p_Error_Parameter      IN OUT VARCHAR2)
    Return Boolean;

end lbpks_rollover_cluster;
/