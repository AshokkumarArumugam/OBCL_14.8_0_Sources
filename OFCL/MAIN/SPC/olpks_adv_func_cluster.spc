CREATE OR REPLACE PACKAGE olpks_adv_func_cluster AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_adv_func_cluster.spc
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
  -------------------------------------------------------------------------------------------------------
  */
  /*----------------------------------CHANGE HISTORY----------------------------------------------------

  **Changed By         : Abhinav Kumar
  **Date               : 18-Aug-2021
  **Change Description : Provided Hook to add the additional info for the Advice Generation
  **Search String      : OBCL_14.5_Support_Bug#33238288_Changes

  ------------------------------------END CHANGE HISTORY------------------------------------------------*/  
--OBCL_14.3_BUG#29583867 starts
  FUNCTION pre_bilnotc (cur_rec oltbs_dly_msg_out%ROWTYPE)
RETURN BOOLEAN;

FUNCTION post_bilnotc (cur_rec oltbs_dly_msg_out%ROWTYPE)
RETURN BOOLEAN;

FUNCTION pre_amndadv(cur_rec oltbs_dly_msg_out%rowtype)
RETURN BOOLEAN;

FUNCTION post_amndadv(cur_rec oltbs_dly_msg_out%rowtype)
RETURN BOOLEAN;
--OBCL_14.3_BUG#29583867 ends

--OBCL_14.5_Support_Bug#33238288_Changes Starts
FUNCTION fn_pre_gen_brvn_adv(P_CUR  oltbs_dly_msg_out%ROWTYPE) 
  RETURN BOOLEAN;
FUNCTION fn_post_gen_brvn_adv(P_CUR  oltbs_dly_msg_out%ROWTYPE) 
  RETURN BOOLEAN;
--OBCL_14.5_Support_Bug#33238288_Changes Ends
  
END olpks_adv_func_cluster;
/
CREATE OR REPLACE SYNONYM olpkss_adv_func_cluster FOR olpks_adv_func_cluster
/