CREATE OR REPLACE PACKAGE MSPKS_BULK_UTILS IS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : mspks_bulk_utils.spc
  **
  ** Module     : Messaging
     **
     ** This source is part of the Oracle FLEXCUBE Software Product.
     ** Copyright (R) 2008,2016 , Oracle and/or its affiliates.  All rights reserved
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

  Created             : Paranthaman Rajendran
  Description      : Messaging Bulking utility


  -------------------------------------------------------------------------------------------------------
  */
   TYPE ty_bulking IS RECORD(
    process_no       VARCHAR2(32),
    page_number      NUMBER,
    page_size        NUMBER,
    max_file_size    NUMBER,
    max_number_rec   NUMBER,
    avg_msg_size     NUMBER,
    total_number_rec NUMBER,
    total_files      NUMBER,
    total_size       NUMBER,
    err_code         VARCHAR2(15),
    err_param        VARCHAR2(55),
    err_desc         VARCHAR2(255));
  PROCEDURE PR_UPDATE_IN_BULK_STATUS(P_STATUS      OUT VARCHAR2,
                                     P_ERROR_CODE  OUT VARCHAR2,
                                     P_ERROR_PARAM OUT VARCHAR2,
                                     P_ERR_DESC    OUT VARCHAR2);
   FUNCTION fn_bulker_enabled RETURN BOOLEAN;
  Function fn_file_id_update(p_bulk       IN MSPKS_BULK_UTILS.ty_bulking,
                             P_filenumber OUT NUMBER,
                             P_processno  OUT VARCHAR2
                             ) return boolean;

  FUNCTION fn_update_file_dtls(p_no_of_records IN NUMBER,
                               p_file_number   IN VARCHAR2,
                               P_PROCESS_NO    IN VARCHAR2,
                               P_ERROR_CODE    OUT VARCHAR2,
                               P_ERROR_PARAM   OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION fn_include_files(P_max_msg_size number,
                            p_current_size number,
                            p_avg_msg_size number,
                            --p_current_file_no IN OUT number,
                            p_current_row_no IN OUT number,
                            aa_bulk  MSPKS_BULK_UTILS.ty_bulking,
                             p_Err_Code    OUT VARCHAR2,
                               p_Err_Params   OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION fn_exclude_files(P_max_msg_size number,
                            p_current_size number,
                            p_avg_msg_size number,
                            --p_current_file_no IN OUT number,
                            p_current_row_no IN OUT number,
                            aa_bulk  MSPKS_BULK_UTILS.ty_bulking,
                             p_Err_Code    OUT VARCHAR2,
                               p_Err_Params   OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION fn_exclude_sequential(P_max_msg_size number,
                                 p_current_size number,
                                 p_avg_msg_size number,
                                 --p_current_file_no IN OUT number,
                                 p_current_row_no IN OUT number,
                                 aa_bulk MSPKS_BULK_UTILS.ty_bulking,
                                  p_Err_Code    OUT VARCHAR2,
                               p_Err_Params   OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION fn_include_sequential(P_max_msg_size number,
                                 p_current_size number,
                                 p_avg_msg_size number,
                                 --p_current_file_no IN OUT number,
                                 p_current_row_no IN OUT number,
                                 aa_bulk MSPKS_BULK_UTILS.ty_bulking,
                                  p_Err_Code    OUT VARCHAR2,
                               p_Err_Params   OUT VARCHAR2)
    RETURN BOOLEAN;

  PROCEDURE PR_GROUP_TXN_FOR_BULKING(P_BULK_PREFERENCE VARCHAR2,
                                     P_MAX_FILE_SIZE   NUMBER,
                                     P_MAX_TXN_NUMBER  NUMBER,
                                     P_ERROR_CODE      OUT VARCHAR2,
                                     P_ERROR_PARAM     OUT VARCHAR2,
                                     P_ERR_DESC        OUT VARCHAR2,
                                     P_NUMBER_REC      OUT NUMBER,
                                     p_number_files    OUT NUMBER,
                                     P_processnumber   OUT VARCHAR2,
                                     P_STATUS          OUT VARCHAR2);



  PROCEDURE PR_REGEN_BLKING_PROCESS(P_BULK_PREFERENCE VARCHAR2,
                                    P_MAX_FILE_SIZE   NUMBER,
                                    P_MAX_TXN_NUMBER  NUMBER,
                                    P_ERROR_CODE      OUT VARCHAR2,
                                    P_ERROR_PARAM     OUT VARCHAR2,
                                    P_ERR_DESC        OUT VARCHAR2,
                                    P_NUMBER_REC      OUT NUMBER,
                                    p_number_files    OUT NUMBER,
                                    P_processnumber   IN OUT VARCHAR2,
                                    P_STATUS          OUT VARCHAR2,
                                    P_ACTION          VARCHAR2);

  PROCEDURE FETCH_REC(P_NO IN VARCHAR, P_ID IN VARCHAR, clobDest OUT CLOB, P_DILIMETER IN VARCHAR);

  PROCEDURE PR_update_file_creation(p_file_name           in varchar2,
                                    P_FILE_REFERECENCE_NO IN VARCHAR2,
                                    P_STATUS              IN VARCHAR2,
                                    p_bulk_rule_name      IN VARCHAR2,
                                    p_file_id             IN VARCHAR2,
                                    P_ERROR_CODE          IN OUT VARCHAR2,
                                    P_ERROR_DESC          IN OUT VARCHAR2,
                                    P_ERROR_PARAM         IN OUT VARCHAR2);

  PROCEDURE PR_update_file_sending(P_STATUS              IN VARCHAR2,
                                   P_ERROR_CODE          IN OUT VARCHAR2,
                                   P_ERROR_DESC          IN OUT VARCHAR2,
                                   P_ERROR_PARAM         IN  OUT VARCHAR2,
                                   P_FILE_NAME           IN VARCHAR2);

--PROCEDURE PR_INIT_DBG(P_REF_NO VARCHAR2);

END MSPKS_BULK_UTILS;
/
CREATE OR REPLACE SYNONYM mspkss_bulk_utils FOR mspks_bulk_utils
/