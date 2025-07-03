CREATE OR REPLACE PACKAGE cypks_misc_cluster AS
  /*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright 漏 2011 - 2013  Oracle and/or its affiliates.  All rights reserved.
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

   CHANGE HISTORY

   Created By         : Saisudha Rathinavelu
   Created On         : 12-Sep-2016
   Reason             : Retro for hook change bug id 22305208.
   Search String      : 12.2_RETRO_Bug#23656661
 ------------------------------------------------------------------------------------------
*/

  PROCEDURE Pr_Skip_Handler(p_Stage in VARCHAR2);

  FUNCTION Fn_Pre_propagateRates( pHO IN STTMS_CORE_BRANCH.branch_code%TYPE,
                                pCCY1 IN CYTMS_CCY_DEFN.ccy_code%TYPE,
	                            pCCY2 IN CYTMS_CCY_DEFN.ccy_code%TYPE,
								p_rate_type IN CYTM_RATES.RATE_TYPE%TYPE) 
                                RETURN BOOLEAN; 

FUNCTION Fn_Post_propagateRates( pHO IN STTMS_CORE_BRANCH.branch_code%TYPE,
                                 pCCY1 IN CYTMS_CCY_DEFN.ccy_code%TYPE,
	                             pCCY2 IN CYTMS_CCY_DEFN.ccy_code%TYPE,
								 p_rate_type IN CYTM_RATES.RATE_TYPE%TYPE) 
                                 RETURN BOOLEAN;

END cypks_misc_Cluster;
/
create or replace synonym cypkss_misc_cluster for cypks_misc_cluster
/