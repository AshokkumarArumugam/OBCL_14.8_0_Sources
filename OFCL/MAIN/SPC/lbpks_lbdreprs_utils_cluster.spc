CREATE OR REPLACE PACKAGE lbpks_lbdreprs_utils_cluster AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_lbdreprs_utils_cluster.spc
  **
  ** Module     : Syndication Loans and Commitments
  **
  ** This source is part of the Oracle Banking Software Product.
  ** Copyright Â© 2007 - 2019  Oracle and/or its affiliates.  All rights reserved
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

  -------------------------------------------------------------------------------------------------------
  */ 
  FUNCTION Fn_pre_process_Margin_Comp(p_Source           IN VARCHAR2,
                                p_Function_Id      IN VARCHAR2,
                                p_contract_ref_no IN VARCHAR2,
                                p_Split_Serial_No     IN NUMBER,
                                p_Split_Prod   IN VARCHAR2,
                                P_Serial_No      IN NUMBER,
                                p_Wrk_Lbdreprs IN OUT Lbpks_Lbdreprs_Main.Ty_Lbdreprs,
                                p_Err_Code     IN OUT VARCHAR2,
                                p_Err_Params   IN OUT VARCHAR2)
  RETURN BOOLEAN;

  FUNCTION Fn_post_process_Margin_Comp(p_Source           IN VARCHAR2,
                                p_Function_Id      IN VARCHAR2,
                                p_contract_ref_no IN VARCHAR2,
                                p_Split_Serial_No     IN NUMBER,
                                p_Split_Prod   IN VARCHAR2,
                                P_Serial_No      IN NUMBER,
                                p_Wrk_Lbdreprs IN OUT Lbpks_Lbdreprs_Main.Ty_Lbdreprs,
                                p_Err_Code     IN OUT VARCHAR2,
                                p_Err_Params   IN OUT VARCHAR2)
  RETURN BOOLEAN; 

END lbpks_lbdreprs_utils_cluster;
/
CREATE OR REPLACE Synonym lbpkss_lbdreprs_ltils_cluster FOR lbpks_lbdreprs_utils_cluster
/