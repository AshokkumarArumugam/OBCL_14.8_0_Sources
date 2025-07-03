create or replace package olpks_status_rule_gen_cluster is
  /*----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_status_rule_gen_cluster.spc
  **
  ** Module   : OL
  **
    This source is part of the Oracle Flexcube Corporate Lending  Software Product.
    Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.
    No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates.

    Oracle Financial Services Software Limited.
    Oracle Park, Off Western Express Highway,
    Goregaon (East),
    Mumbai - 400 063, India.

    **Changed By         : Gomathi G
    **Date               : 15-JUL-2020
    **Change Description : Provided Hooks for status change cluster and custom elements
    **Search String      : OBCL_14.3_SUPPORT_Bug#31623678
    
    **Changed By         : Abhinav Kumar
    **Date               : 08-Oct-2024
    **Change Description : Provided Hooks for status change cluster and custom elements
    **Search String      : Bug#37143543
    
  **Changed By         : Abhinav Kumar
  **Date               : 22-Oct-2024
  **Change Description : Provided Hooks for status change cluster and custom elements for Procedure Gen
  **Search String      : Bug#37195447
	 ----------------------------------------------------------------------------------------------------
  */

	
	--OBCL_14.3_SUPPORT_Bug#31623678 starts
	FUNCTION fn_gen_fnderivestatus(p_fn_call_id      IN OUT NUMBER,
						           p_Tb_Cluster_data IN OUT GLOBAL.Ty_Tb_Cluster_Data)
									 
    RETURN BOOLEAN;
	--OBCL_14.3_SUPPORT_Bug#31623678 ends
  
  --Bug#37143543 Changes Starts
  FUNCTION fn_pre_gen_body RETURN BOOLEAN; 
  FUNCTION fn_post_gen_body RETURN BOOLEAN;
  --Bug#37143543 Changes Ends
  --Bug#37195447 Changes Starts
  PROCEDURE pre_gen(s VARCHAR2, n_lf SMALLINT := 1);
  PROCEDURE post_gen(s VARCHAR2, n_lf SMALLINT := 1);
  --Bug#37195447 Changes Ends
end olpks_status_rule_gen_cluster;
/
CREATE or replace SYNONYM olpkss_status_rule_gen_cluster FOR olpks_status_rule_gen_cluster
/
