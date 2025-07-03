CREATE OR REPLACE PACKAGE olpks_oldfftmp_utils IS
  /*------------------------------------------------------------------------------------------
  ** This source is part of the Oracle Banking Software Product.
  ** Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.
  **
  ** No part of this work may be reproduced, stored in a retrieval system,
  ** adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise,
  ** translated in any language or computer language,
  ** without the prior written permission of Oracle and/or its affiliates.
  **
  **
  ** Oracle Financial Services Software Limited.
  ** Oracle Park, Off Western Express Highway,
  ** Goregaon (East),
  ** Mumbai - 400 063, India.
  ------------------------------------------------------------------------------------------
  */
  /*
  -------------------------------------------------------------------------------------------------------
  CHANGE HISTORY

  SFR Number         :
  Changed By         :
  Change Description :

  -------------------------------------------------------------------------------------------------------
  */
  FUNCTION fn_validate(p_Source           IN VARCHAR2,
                    p_Source_Operation IN VARCHAR2,
                    p_Function_Id      IN VARCHAR2,
                    p_Action_Code      IN VARCHAR2,

                    p_oldfftmp         IN olpks_oldfftmp_main.ty_oldfftmp,
                    p_wrk_oldfftmp     IN OUT olpks_oldfftmp_main.ty_oldfftmp,
                    p_Err_Code         IN OUT VARCHAR2,
                    p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
 FUNCTION fn_check_import_file(p_source    cotms_source.source_code%TYPE,
                                 p_Function_Id       IN     VARCHAR2,
                                 p_wrk_oldfftmp  In Out olpks_oldfftmp_main.ty_oldfftmp,
                                 arg_source1 VARCHAR2,
                                 arg_source2 VARCHAR2,
                                 p_Err_Code          IN OUT VARCHAR2,
                                 p_Err_Params        IN OUT VARCHAR2 )
   RETURN BOOLEAN ;
   
   
FUNCTION FN_IMPORT_DOS_FILE (p_source    cotms_source.source_code%TYPE,
                                 p_Function_Id       IN     VARCHAR2,
                                 p_wrk_oldfftmp  In Out olpks_oldfftmp_main.ty_oldfftmp,
                                 p_Err_Code          IN OUT VARCHAR2,
                                 p_Err_Params        IN OUT VARCHAR2 )
                                 
   RETURN BOOLEAN   ;
  End olpks_oldfftmp_utils;
/