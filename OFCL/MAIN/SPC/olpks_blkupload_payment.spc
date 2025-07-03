create or replace PACKAGE olpks_blkupload_payment AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_blkupload_function.spc
  **
  ** Module     : Oracle Lending
  **
  ** This source is part of the Oracle FLEXCUBE Software Product.
  ** Copyright (R) 2008,2019 , Oracle and/or its affiliates.  All rights reserved
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

  -------------------------------------------------------------------------------------------------------
  */
  
  TYPE				g_upl_ratio_record_type1
IS RECORD			(
				source_code			lbtbs_upl_nonprorata_ratio.source_code%TYPE,
				branch_code			lbtbs_upl_nonprorata_ratio.branch_code%TYPE,				
				external_ref_no			lbtbs_upl_nonprorata_ratio.external_ref_no%TYPE,
				participant			lbtbs_upl_nonprorata_ratio.participant%TYPE,
				payment_seq_no			lbtbs_upl_nonprorata_ratio.payment_seq_no%TYPE,
				value_date			lbtbs_upl_nonprorata_ratio.value_date%TYPE,
				principal_nonprorata_ratio		lbtbs_upl_nonprorata_ratio.principal_nonprorata_ratio%TYPE
				);

TYPE				g_upl_ratio_table_type1
IS TABLE OF			g_upl_ratio_record_type1
INDEX BY			BINARY_INTEGER;

PROCEDURE pr_blk_upd_payment(p_branch IN VARCHAR2,p_seq_no IN NUMBER);	 

END olpks_blkupload_payment;
/