CREATE OR REPLACE PACKAGE olpks_oldstats_utils IS

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

 **Changed By         : Usha Rani Kota
 **Date               : 10-Nov-2021
 **Change Description : Added changes for status movement for Rule Based Role To Head Mapping. Fixed for the bug no. 33574859 
 **Search String      : OBCL 14.5_RTHRuleBased_OLDSTATSChanges_33574859
   -------------------------------------------------------------------------------------------------------
   */


  FUNCTION fn_ld_liq_validations (p_oldstats       IN   olpks_oldstats_main.ty_oldstats,
                                  p_Function_Id    IN     VARCHAR2,
                                  p_Err_Code       IN  OUT VARCHAR2,
                                  p_Err_Params     IN  OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION fn_replicate_roles(p_prod IN VARCHAR2/*p_oldstats       IN   olpks_oldstats_main.ty_oldstats,

                            p_Function_Id     IN VARCHAR2


                            ,p_Err_Code        IN OUT VARCHAR2
                            ,p_Err_Params      IN OUT VARCHAR2*/) RETURN BOOLEAN;

FUNCTION fn_replicate (p_prod IN VARCHAR2) 
	RETURN BOOLEAN ;

--OBCL 14.5_RTHRuleBased_OLDSTATSChanges_33574859 >> Starts  

Function FN_RTH_RULE_VALIDATIONS( p_Function_Id       IN     VARCHAR2,
                                  P_Action_Code       IN     VARCHAR2,
                                  p_wrk_oldstats IN OUT  olpks_oldstats_main.ty_oldstats,
                                  p_Err_Code       IN  OUT VARCHAR2,
                                  p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;
--OBCL 14.5_RTHRuleBased_OLDSTATSChanges_33574859 << Ends
END olpks_oldstats_utils;
/
CREATE OR REPLACE SYNONYM olpkss_oldstats_utils FOR olpks_oldstats_utils
/