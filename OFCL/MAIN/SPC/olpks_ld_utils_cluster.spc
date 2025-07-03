CREATE OR REPLACE PACKAGE olpks_ld_utils_cluster AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_ld_utils_cluster.spc
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
	-- Created       : 23-SEP-2019
	-- Purpose       : Extensible hooks for OL advices
	-- Serach string : OBCL_14.3_BUG#29583867
  CHANGE HISTORY
  -------------------------------------------------------------------------------------------------------
  */
--OBCL_14.3_BUG#29583867 STARTS
    FUNCTION fn_pre_enquiry_advice(p_out_dlymsg_record IN oltbs_dly_msg_out%ROWTYPE,
                             p_prop_date         IN DATE,
                             p_comps             IN VARCHAR2,
                             p_amount_due        IN VARCHAR2,
                             p_tda_comps         IN VARCHAR2,
                             p_tda_amount_due    IN VARCHAR2,
                             p_errcodes          IN OUT VARCHAR2) RETURN BOOLEAN ;
							 
    FUNCTION fn_post_enquiry_advice(p_out_dlymsg_record IN oltbs_dly_msg_out%ROWTYPE,
                             p_prop_date         IN DATE,
                             p_comps             IN VARCHAR2,
                             p_amount_due        IN VARCHAR2,
                             p_tda_comps         IN VARCHAR2,
                             p_tda_amount_due    IN VARCHAR2,
                             p_errcodes          IN OUT VARCHAR2) RETURN BOOLEAN ;
							 --OBCL_14.3_BUG#29583867 ENDS
END olpks_ld_utils_cluster;
/
CREATE OR REPLACE SYNONYM olpkss_ld_utils_cluster FOR olpks_ld_utils_cluster
/