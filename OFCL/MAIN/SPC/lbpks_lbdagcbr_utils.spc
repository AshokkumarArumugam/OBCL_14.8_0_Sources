create or replace package lbpks_lbdagcbr_utils is
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_lbdagcbr_utils.spc
  **
  ** Module     : LB
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

  Changed By         : Jayaram N
  Date               : 21-Jan-2020
  Change Description : Primary Delayed Compensation Changes
  Search String      : OBCL14.4:SFR#29959798:Primary_Delayed_Compensation

  -------------------------------------------------------------------------------------------------------
  */
    function pr_change_investors(p_Source           IN VARCHAR2,
                          p_Source_Operation IN VARCHAR2,
                          p_Function_Id      IN VARCHAR2,
                          p_Action_Code      IN VARCHAR2,
                          p_Child_Function   IN VARCHAR2,
                          p_lbdagcbr         IN lbpks_lbdagcbr_main.ty_lbdagcbr,
                         -- p_prev_lbdagcbr    IN OUT lbpks_lbdagcbr_main.ty_lbdagcbr,
                          p_wrk_lbdagcbr     IN OUT lbpks_lbdagcbr_main.ty_lbdagcbr,
                          p_Err_Code         IN OUT VARCHAR2,
                          p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN; 
    function PR_UPDATE_TRNSFROR_TRNSFREE(p_Source           IN VARCHAR2,
                          p_Source_Operation IN VARCHAR2,
                          p_Function_Id      IN VARCHAR2,
                          p_Action_Code      IN VARCHAR2,
                          p_Child_Function   IN VARCHAR2,
                          p_lbdagcbr         IN lbpks_lbdagcbr_main.ty_lbdagcbr,
                         -- p_prev_lbdagcbr    IN OUT lbpks_lbdagcbr_main.ty_lbdagcbr,
                          p_wrk_lbdagcbr     IN OUT lbpks_lbdagcbr_main.ty_lbdagcbr,
                          p_Err_Code         IN OUT VARCHAR2,
                          p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN; 
    function FN_PROCESS_ENRICHMENT(p_transferor		in	varchar2,
                         p_transferee		in	varchar2,
                         p_ext_tradeid		in	varchar2,
                         p_ext_ticket_id	in	varchar2,
                         p_ext_agency_ref	in	varchar2,
                         p_error_code		in out	varchar2,
                         p_error_param		in out	varchar2) RETURN BOOLEAN; 
end lbpks_lbdagcbr_utils;
/
CREATE OR REPLACE SYNONYM lbpkss_lbdagcbr_utils FOR lbpks_lbdagcbr_utils
/