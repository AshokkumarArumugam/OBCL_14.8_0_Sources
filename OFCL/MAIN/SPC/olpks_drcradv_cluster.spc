CREATE OR REPLACE PACKAGE olpks_drcradv_cluster AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_drcradv_cluster.spc
  **
  ** Module     : Loans and Deposits
  **
  ** This source is part of the Oracle FLEXCUBE Software Product.
  ** Copyright (R) 2008,2018 , Oracle and/or its affiliates.  All rights reserved
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
    -- Created by    : Gomathi G
	-- Created       : 24-SEP-2019
	-- Purpose       : Extensible hooks for OL advices
	-- Serach string : OBCL_14.3_BUG#29583867
 CHANGE HISTORY
  -------------------------------------------------------------------------------------------------------
  */
--OBCL_14.3_BUG#29583867 STARTS
FUNCTION fn_pre_drcr_adv
				( p_msg_row		IN	oltbs_dly_msg_out%ROWTYPE
				, p_drcr_ind	IN	CHAR
				, p_msg_info	IN	CHAR
				, p_err_code	IN OUT	ertbs_msgs.err_code%TYPE
				) RETURN BOOLEAN;
FUNCTION fn_post_drcr_adv
				( p_msg_row		IN	oltbs_dly_msg_out%ROWTYPE
				, p_drcr_ind	IN	CHAR
				, p_msg_info	IN	CHAR
				, p_err_code	IN OUT	ertbs_msgs.err_code%TYPE
				) RETURN BOOLEAN;

--OBCL_14.3_BUG#29583867 ENDS
END olpks_drcradv_cluster;
/
CREATE OR REPLACE SYNONYM olpkss_drcradv_cluster FOR olpks_drcradv_cluster
/