CREATE OR REPLACE PACKAGE olpks_oldprliq_utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_oldprliq_utils.spc
  **
  ** Module     : Loans and Deposits
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
  Changed By         :
  Change Description :

	**Changed By         : Chandra Achuta
	**Date               : 23-MAR-2021
	**Change Description : Added code for working of page version.
	**Search String      : Bug#32666702
  -------------------------------------------------------------------------------------------------------
  */
  g_page_version_esn_prliq        NUMBER;    --Bug#32666702   Code Added
  FUNCTION Fn_Upload_Db(p_Source           IN VARCHAR2,
                        p_Source_Operation IN VARCHAR2,
                        p_Function_Id      IN VARCHAR2,
                        p_Action_Code      IN VARCHAR2,
                        p_Child_Function   IN VARCHAR2,
                        p_Multi_Trip_Id    IN VARCHAR2,
                        p_oldprliq         IN olpks_oldprliq_main.ty_oldprliq,
                        p_prev_oldprliq    IN olpks_oldprliq_main.ty_oldprliq,
                        p_wrk_oldprliq     IN OUT olpks_oldprliq_main.ty_oldprliq,
                        p_Err_Code         IN OUT VARCHAR2,
                        p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Query(p_Source           IN VARCHAR2,
                    p_Source_Operation IN VARCHAR2,
                    p_Function_Id      IN VARCHAR2,
                    p_Action_Code      IN VARCHAR2,
                    p_Child_Function   IN VARCHAR2,
                    p_Full_Data        IN VARCHAR2 DEFAULT 'Y',
                    p_With_Lock        IN VARCHAR2 DEFAULT 'N',
                    p_QryData_Reqd     IN VARCHAR2,
                    p_oldprliq         IN olpks_oldprliq_main.ty_oldprliq,
                    p_wrk_oldprliq     IN OUT olpks_oldprliq_main.ty_oldprliq,
                    p_Err_Code         IN OUT VARCHAR2,
                    p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Delete(p_Source           IN VARCHAR2,
                     p_Source_Operation IN VARCHAR2,
                     p_Function_Id      IN VARCHAR2,
                     p_Action_Code      IN VARCHAR2,
                     p_Child_Function   IN VARCHAR2,
                     p_oldprliq         IN olpks_oldprliq_main.ty_oldprliq,
                     p_prev_oldprliq    IN OUT olpks_oldprliq_main.ty_oldprliq,
                     p_wrk_oldprliq     IN OUT olpks_oldprliq_main.ty_oldprliq,
                     p_Err_Code         IN OUT VARCHAR2,
                     p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Reverse(p_Source           IN VARCHAR2,
                      p_Source_Operation IN VARCHAR2,
                      p_Function_Id      IN VARCHAR2,
                      p_Action_Code      IN VARCHAR2,
                      p_Child_Function   IN VARCHAR2,
                      p_oldprliq         IN olpks_oldprliq_main.ty_oldprliq,
                      p_prev_oldprliq    IN OUT olpks_oldprliq_main.ty_oldprliq,
                      p_wrk_oldprliq     IN OUT olpks_oldprliq_main.ty_oldprliq,
                      p_Err_Code         IN OUT VARCHAR2,
                      p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Populate(p_Source           IN VARCHAR2,
                       p_Source_Operation IN VARCHAR2,
                       p_Function_Id      IN VARCHAR2,
                       p_Action_Code      IN VARCHAR2,
                       p_Child_Function   IN VARCHAR2,
                       p_Full_Data        IN VARCHAR2 DEFAULT 'Y',
                       p_With_Lock        IN VARCHAR2 DEFAULT 'N',
                       p_QryData_Reqd     IN VARCHAR2,
                       p_oldprliq         IN olpks_oldprliq_main.ty_oldprliq,
                       p_wrk_oldprliq     IN OUT olpks_oldprliq_main.ty_oldprliq,
                       p_Err_Code         IN OUT VARCHAR2,
                       p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Subsys_Pickup(p_Source           IN VARCHAR2,
                                   p_Source_Operation IN VARCHAR2,
                                   p_Function_Id      IN VARCHAR2,
                                   p_Action_Code      IN VARCHAR2,
                                   p_oldprliq         IN olpks_oldprliq_main.ty_oldprliq,
                                   p_prev_oldprliq    IN olpks_oldprliq_main.ty_oldprliq,
                                   p_wrk_oldprliq     IN OUT olpks_oldprliq_main.ty_oldprliq,
                                   p_Err_Code         IN OUT VARCHAR2,
                                   p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
END olpks_oldprliq_utils;
/
CREATE OR REPLACE SYNONYM olpkss_oldprliq_utils FOR olpks_oldprliq_utils
/