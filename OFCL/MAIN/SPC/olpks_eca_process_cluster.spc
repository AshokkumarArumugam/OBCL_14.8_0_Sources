CREATE OR REPLACE PACKAGE olpks_eca_process_cluster AS
  /*----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_eca_process_cluster.SPC
  **
  ** Module    : OL
  **
    This source is part of the Oracle Banking Corporate Lending  Software Product.
    Copyright Â© 2019 , Oracle and/or its affiliates.  All rights reserved.
    No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or     otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates.
  
    Oracle Financial Services Software Limited.
    Oracle Park, Off Western Express Highway,
    Goregaon (East),
    Mumbai - 400 063, India.
  ------------------------------CHANGE HISTORY--------------------------------------------------------
  
  Change History
  
  **Changed By         : Kavitha Asokan
  **Date               : 06-SEP-2022
  **Change Description : OL Loan account is tracked for receivable, the corresponding ECA requests sent from 
						 OBCL to FCUBS will be enhanced to be sent with track receivables data. 
						 Hook to enrich the ECA request with Track Receivable data for Bilateral Loans created in OBCL.

  **Search String      : Bug#34559860
  
  
  ------------------------------------------------------------------------------------------------------
  */

  FUNCTION fn_pre_insert_tables(p_Eca_Queue_Rec IN OUT Olpks_Eca_Process.Ty_Eca_Queue)
    RETURN BOOLEAN;
  FUNCTION fn_post_insert_tables(p_Eca_Queue_Rec IN OUT Olpks_Eca_Process.Ty_Eca_Queue)
    RETURN BOOLEAN;
	
  FUNCTION fn_pre_pragma_insert_tables(p_Eca_Queue_Rec IN OUT Olpks_Eca_Process.Ty_Eca_Queue)
    RETURN BOOLEAN;
  FUNCTION fn_post_pragma_insert_tables(p_Eca_Queue_Rec IN OUT Olpks_Eca_Process.Ty_Eca_Queue)
    RETURN BOOLEAN;
	
END olpks_eca_process_cluster;
/
CREATE OR REPLACE Synonym olpkss_eca_process_cluster FOR olpks_eca_process_cluster
/