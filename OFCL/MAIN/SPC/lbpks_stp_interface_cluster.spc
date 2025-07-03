CREATE OR REPLACE PACKAGE Lbpks_Stp_Interface_Cluster AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_stp_interface_cluster.spc
  **
  ** Module     : Syndication Loans and Commitments
  ** 
  ** This source is part of the Oracle Banking Software Product.
  ** Oracle Banking Corporate Lending  Software Product.   Copyright © 2018.  All rights reserved
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
  Created By         :  Prakash Ravi
  Change Description :  BUG#30717110_forward_port Changes
  
  **  Changed By         :
  **  Changed On         :
  **  Change Description :
  **  Search String      :
    Date               : 08-Sep-2020
    Changed By         : Vineeth T M
    Change Description : HOOK REQUEST :: STP ENHANCEMENTS IN LB FOR CUSTOM ICCF FIELDS(forward port)
    Search String      : bug#31825343 Changes
  -------------------------------------------------------------------------------------------------------
  */

  FUNCTION Fn_Pre_Stp_Processing(p_Err_Code        IN OUT VARCHAR2,
                                 p_Err_Param       IN OUT VARCHAR2,
                                 p_Contract_Ref_No IN VARCHAR2 DEFAULT NULL,
                                 p_Tranche_Ref_No  IN VARCHAR2 DEFAULT NULL,
                                 p_Branch          IN Oltms_Branch.Branch_Code%TYPE DEFAULT NULL,
                                 p_Tb_Cluster_Data IN OUT Global.Ty_Tb_Cluster_Data)
    RETURN BOOLEAN;

  FUNCTION Fn_Post_Stp_Processing(p_Err_Code        IN OUT VARCHAR2,
                                  p_Err_Param       IN OUT VARCHAR2,
                                  p_Contract_Ref_No IN VARCHAR2 DEFAULT NULL,
                                  p_Tranche_Ref_No  IN VARCHAR2 DEFAULT NULL,
                                  p_Branch          IN Oltms_Branch.Branch_Code%TYPE DEFAULT NULL,
                                  p_Tb_Cluster_Data IN OUT Global.Ty_Tb_Cluster_Data)
    RETURN BOOLEAN;

    --bug#31825343 Changes starts
    function fn_pre_handoff_Amend_due(p_Borr_Ref_No           in Oltbs_Contract.Contract_Ref_No%TYPE,
                           p_Borr_Esn               in Oltbs_Contract.Latest_Event_Seq_No%TYPE,
                           l_Rec_Self_Participant   in lbpks_stp_interface.p_Rec_Self_Participant,
                           p_Error_Code             in out VARCHAR2,
                           p_Error_Params           in out VARCHAR2,          
                           l_fn_call_id             in out NUMBER,
                           l_Tb_Cluster_data         IN OUT  global.Ty_Tb_Cluster_Data)
   return boolean;
   
   function fn_post_handoff_Amend_due(p_Borr_Ref_No           in Oltbs_Contract.Contract_Ref_No%TYPE,
                           p_Borr_Esn               in Oltbs_Contract.Latest_Event_Seq_No%TYPE,
                           l_Rec_Self_Participant   in lbpks_stp_interface.p_Rec_Self_Participant,
                           p_Error_Code             in out VARCHAR2,
                           p_Error_Params           in out VARCHAR2,          
                           l_fn_call_id             in out NUMBER,
                           l_Tb_Cluster_data         IN OUT  global.Ty_Tb_Cluster_Data)
   return boolean;
   --bug#31825343 Changes ends

END Lbpks_Stp_Interface_Cluster;
/
CREATE OR REPLACE Synonym Lbpkss_Stp_Interface_Cluster FOR Lbpks_Stp_Interface_Cluster
/