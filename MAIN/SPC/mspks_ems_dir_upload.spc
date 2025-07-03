CREATE OR REPLACE PACKAGE MSPKS_EMS_DIR_UPLOAD IS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : MSPKS_EMS_DIR_UPLOAD.spc
  **
  ** Module     : MS
  **
  ** This source is part of the Oracle FLEXCUBE Software System and is copyrighted by Oracle Financial Services Software Limited.
  **
  **
  ** All rights reserved. No part of this work may be reproduced, stored in a retrieval system,
  ** adopted or transmitted in any form or by any means, electronic, mechanical, photographic,
  ** graphic, optic recording or otherwise, translated in any language or computer language,
  ** without the prior written permission of Oracle Financial Services Software Limited.
  **
  ** Oracle Financial Services Software Limited.
  ** 10-11, SDF I, SEEPZ, Andheri (East),
  ** Mumbai - 400 096.
  ** India
  ** Copyright ?????? 2011 ????????? 2013 Oracle Financial Services Software Limited. All rights reserved.
  -------------------------------------------------------------------------------------------------------
  CHANGE HISTORY
Created             :
  Description      :
 -------------------------------------------------------------------------------------------------------
  */
  PROCEDURE PR_dir_upload(
                                    P_FILE_REFERECENCE_ID IN VARCHAR2,
                                    P_FILE_NAME IN VARCHAR2,
                                    P_STATUS              IN OUT VARCHAR2,
                                    P_ERROR_CODE          IN OUT VARCHAR2,
                                    P_ERROR_DESC          IN OUT VARCHAR2,
                                    P_ERROR_PARAM         IN OUT VARCHAR2);
END MSPKS_EMS_DIR_UPLOAD;
/
CREATE OR REPLACE SYNONYM MSPKSS_EMS_DIR_UPLOAD FOR MSPKS_EMS_DIR_UPLOAD
/