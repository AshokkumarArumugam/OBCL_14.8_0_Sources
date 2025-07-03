CREATE OR REPLACE PACKAGE lbpks_lbcprtax_utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_lbcprtax_utils.spc
  **
  ** Module     : Syndication Loans and Commitments
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
  
  Date               : 01-Mar-2017
  Changed By         : Krithika G
  Change Description : Changes done to lbpks_lbcprtax_utils
  
  Changed By         : Sowmya Bitra
  Changed On         : 22-Dec-2020
  Search String      : OBCL_14.4_LS_Payment_Gateway_Tax Changes
  Change Reason      : OBCL_14.4_LS_Payment_Gateway_Tax Changes
  -------------------------------------------------------------------------------------------------------
  */

  FUNCTION Fn_Upload(p_Action_Code  IN VARCHAR2,
                     p_Wrk_lbcprtax IN OUT lbpks_lbcprtax_Main.Ty_lbcprtax,
                     p_Err_Code     IN OUT VARCHAR2,
                     p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_SubsysPickup(p_Action_Code   IN VARCHAR2,
                           p_Wrk_lbcprtax  IN OUT lbpks_lbcprtax_Main.Ty_lbcprtax,
                           p_Err_Code      IN OUT VARCHAR2,
                           p_Err_Params    IN OUT VARCHAR2,
                           P_contract_type IN VARCHAR2,
                           P_drawdown      IN LBTBS_CONTRACT_PARTICIPANT.DRAWDOWN_NO%TYPE,
                           P_version_no    IN OUT LBTBS_SYNDICATION_MASTER.VERSION_NO%TYPE
                           
                           ) RETURN BOOLEAN;
  --OBCL_14.4_TAX_Changes :: Starts
  FUNCTION Fn_Validate_Borrower(p_Source        IN Cotms_Source.Source_Code%TYPE,
                                p_Module        IN VARCHAR2,
                                p_Action_Code   IN VARCHAR2,
                                p_Function_Id   IN VARCHAR2,
                                p_Product_Code  IN VARCHAR2,
                                p_Fcc_Ref       IN VARCHAR2,
                                p_Event_Seq_No  IN VARCHAR2,
                                p_Wrk_lbcprtax  IN OUT lbpks_lbcprtax_Main.Ty_lbcprtax,
                                p_Err_Code      IN OUT VARCHAR2,
                                p_Err_Params    IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Upload_Borrower(p_Source        IN Cotms_Source.Source_Code%TYPE,
                              p_Module        IN VARCHAR2,
                              p_Action_Code   IN VARCHAR2,
                              p_Function_Id   IN VARCHAR2,
                              p_Product_Code  IN VARCHAR2,
                              p_Fcc_Ref       IN VARCHAR2,
                              p_Event_Seq_No  IN VARCHAR2,
                              p_Wrk_lbcprtax  IN OUT lbpks_lbcprtax_Main.Ty_lbcprtax,
                              p_Err_Code      IN OUT VARCHAR2,
                              p_Err_Params    IN OUT VARCHAR2)
    RETURN BOOLEAN;                           
  --OBCL_14.4_TAX_Changes :: Ends
  
  --OBCL_14.4_LS_Payment_Gateway_Tax Changes Start
  FUNCTION Fn_Populate_Tax (p_Wrk_lbcprtax IN OUT Lbpks_Lbcprtax_Main.ty_lbcprtax,
                          p_Err_Code     IN OUT VARCHAR2,
                          p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;					  
  --OBCL_14.4_LS_Payment_Gateway_Tax Changes End						  
						  
END lbpks_lbcprtax_utils;
/
CREATE OR REPLACE SYNONYM lbpkss_lbcprtax_utils FOR lbpks_lbcprtax_utils
/