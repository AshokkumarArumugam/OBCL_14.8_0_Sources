CREATE OR REPLACE PACKAGE TRPKS_CORE AS
  /*------------------------------------------------------------------------------------------
  **
  ** This source is part of the Oracle FLEXCUBE Software Product.
  ** Copyright (R) 2016 , Oracle and/or its affiliates.  All rights reserved
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
  ------------------------------------------------------------------------------------------
  */

  TYPE poss_refno_list IS TABLE OF VARCHAR2(32767) INDEX BY VARCHAR2(20);
  g_poss_list     poss_refno_list;
  g_poss_list_VAR VARCHAR2(32767);
  
  
 PROCEDURE  pr_init_refno(p_seq_no IN  VARCHAR2);
 PROCEDURE pr_push_refno(p_seq_no IN VARCHAR2, p_ref_no IN VARCHAR2);
 
 function FN_GET_PROCESS_REFNO(pBranchCode  IN STTMS_CORE_BRANCH.branch_code%TYPE,
                                pProcessCode IN VARCHAR2,
                                pDate        IN DATE,
                                pSerial      OUT VARCHAR2,
                                pReferenceNo OUT VARCHAR2,
                                pErrorCode   OUT ERTBS_MSGS.err_code%TYPE)
    return boolean;

  function FN_GET_PROCESS_REFNO(pBranchCode  IN STTMS_CORE_BRANCH.branch_code%TYPE,
                                pProcessCode IN VARCHAR2,
                                l_seq        OUT VARCHAR2,
                                pErrorCode   OUT ERTBS_MSGS.err_code%TYPE)
    return boolean;

END TRPKS_CORE;
/
CREATE OR REPLACE SYNONYM TRPKSS_CORE FOR TRPKS_CORE
/