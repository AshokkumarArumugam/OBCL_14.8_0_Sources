CREATE OR REPLACE PACKAGE stpks_core_extentity AS
/*
------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright ? 2006 Oracle and/or its affiliates.  All rights reserved.
**
** No part of this work may be reproduced, stored in a retrieval system,
** adopted or transmitted in any form or by any means, electronic, mechanical,
** photographic, graphic, optic recording or otherwise,
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
------------------------------------------------------------------------------------------
CHANGE HISTORY

**  Modified By        : Mohammed Taqhee
**  Modified On        : 20-Sep-2016
**  Modified Reason    : ROFC_MINICORE changes
**  Search String      : FCUBS_12.3.0.0.0::ROFCMINICORE
---------------------------------------------------------------------------------------------
*/

FUNCTION fn_core_account_entity(p_acc_rec   IN sttms_core_account%ROWTYPE
                               ,p_err_code  IN OUT VARCHAR2
                               ,p_err_param IN OUT VARCHAR2) RETURN BOOLEAN;

FUNCTION fn_core_customer_entity(p_cust_rec   IN sttms_core_customer%ROWTYPE
                                ,p_err_code  IN OUT VARCHAR2
                                ,p_err_param IN OUT VARCHAR2) RETURN BOOLEAN;

FUNCTION fn_core_gl_entity(p_gl_rec   IN sttms_core_glmaster%ROWTYPE
                          ,p_err_code  IN OUT VARCHAR2
                          ,p_err_param IN OUT VARCHAR2) RETURN BOOLEAN;

FUNCTION fn_core_trncode_entity(p_trncd_rec   IN sttms_core_trn_code%ROWTYPE
                               ,p_err_code  IN OUT VARCHAR2
                               ,p_err_param IN OUT VARCHAR2) RETURN BOOLEAN;
END stpks_core_extentity;
/
CREATE OR REPLACE SYNONYM stpkss_core_extentity for stpks_core_extentity
/