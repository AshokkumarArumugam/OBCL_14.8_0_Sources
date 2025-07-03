CREATE OR REPLACE PACKAGE olpks_olcprmnt_utils AS
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
---------------------------------------------------------------------------------------------------
   CHANGE HISTORY

   Changed By         :  SYSTEM
   Change Description :  20-JAN-2009 08:32:51

   -------------------------------------------------------------------------------------------------------
   */
   FUNCTION Fn_Get_Txn_Codes(p_Source               IN Cotms_Source.Source_Code%TYPE
                            ,p_Module               IN VARCHAR2
                            ,p_olcprmnt             IN olpks_olcprmnt_main.ty_olcprmnt
                            ,p_Select_From_Db       IN VARCHAR2 DEFAULT 'Y'
                            ,p_Mitm_Product_Default IN OLTM_PRODUCT_DEFAULT%ROWTYPE
                            ,p_Tb_Txn_Codes         IN OUT olpks_olcprmnt_main.ty_tb__oltms_default_codes__mi
                            ,p_Err_Code             IN OUT VARCHAR2
                            ,p_Err_Params           IN OUT VARCHAR2) RETURN BOOLEAN;

END olpks_olcprmnt_utils;
/
CREATE OR REPLACE SYNONYM olpkss_olcprmnt_utils FOR olpks_olcprmnt_utils
/