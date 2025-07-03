CREATE OR REPLACE PACKAGE Tlpks_Slt_Interface_Cluster AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : Tlpks_Slt_Interface_Cluster.spc
  **
  ** Module     : Secondary Loan Trading
  **
  ** This source is part of the Oracle Banking Software Product.
  ** Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved
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
  SFR Number         : 
  Changed By         : 
  Change Description : 
  Search String      : 
  
  **Changed By         : Jayaram N
  **Date               : 23-Jul-2021
  **Change Description : HOOK REQUIRED FOR AMORTIZATION OF PREMIUM/DISCOUNT AMOUNT DURING PURCHASE OF LOAN 
  **Search String      : Bug#33118218
  
  -------------------------------------------------------------------------------------------------------
  */  
  
  --Bug#33118218:Changes Starts
  FUNCTION Fn_upload_pram_npvami
	(
		p_branch		IN  CHAR ,
		p_trade_ref_no	IN  tltbs_contract_master.contract_ref_no%TYPE DEFAULT 'ALL' ,
		p_seq_no		IN  NUMBER DEFAULT 0 ,
		l_error_code 	IN  OUT	VARCHAR2 ,
	    l_error_params 	IN  OUT	VARCHAR2 ,
		fn_call_id		IN OUT NUMBER,
		P_TB_CLUSTER_DATA IN OUT GLOBAL.TY_TB_CLUSTER_DATA
	)
	RETURN BOOLEAN;
  --Bug#33118218:Changes Ends

END Tlpks_Slt_Interface_Cluster;
/
CREATE OR REPLACE Synonym Tlpkss_Slt_Interface_Cluster FOR Tlpks_Slt_Interface_Cluster
/