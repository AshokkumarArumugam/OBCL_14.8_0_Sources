CREATE OR REPLACE PACKAGE Lbpks_Lbcintrs_Utils_Cluster AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_lbcintrs_utils_cluster.spc
  **
  ** Module     : The ICCF
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
  
  **Changed By         : Vineeth T M
  **Date               : 14-Aug-2020
  **Change Description : hook request for Resolve rate/VAMI Floating Rates/Multiple Rate CodeRoundUp RoundDown.(forward port)
  **Search String      : bug#31458621 changes
  
  -------------------------------------------------------------------------------------------------------
  */

  
  
 --bug#31458621 changes start
  FUNCTION fn_pre_upload(p_Source             IN Cotms_Source.Source_Code%TYPE,
                                     p_Function_Id        IN VARCHAR2,
                                     p_Module             IN VARCHAR2,
                                     p_Action_Code        IN VARCHAR2,
                   p_calling_function   IN VARCHAR2,
                   p_product_code     IN VARCHAR2,  
                                     p_Fcc_Ref            IN VARCHAR2,
                   p_event_seq_no     IN NUMBER,
                                     p_Wrk_Lbcintrs       IN OUT Lbpks_Lbcintrs_Main.Ty_Lbcintrs,
                                     p_Err_Code           IN OUT VARCHAR2,
                                     p_Err_Params         IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION fn_post_upload(p_Source             IN Cotms_Source.Source_Code%TYPE,
                                     p_Function_Id        IN VARCHAR2,
                                     p_Module             IN VARCHAR2,
                                     p_Action_Code        IN VARCHAR2,
                   p_calling_function   IN VARCHAR2,
                   p_product_code     IN VARCHAR2,  
                                     p_Fcc_Ref            IN VARCHAR2,
                   p_event_seq_no     IN NUMBER,
                                     p_Wrk_Lbcintrs       IN OUT Lbpks_Lbcintrs_Main.Ty_Lbcintrs,
                                     p_Err_Code           IN OUT VARCHAR2,
                                     p_Err_Params         IN OUT VARCHAR2)
    RETURN BOOLEAN; 
  --bug#31458621 changes end
  
END Lbpks_Lbcintrs_Utils_Cluster;
/
CREATE OR REPLACE Synonym Lbpkss_Lbcintrs_Utils_Cluster FOR Lbpks_Lbcintrs_Utils_Cluster
/