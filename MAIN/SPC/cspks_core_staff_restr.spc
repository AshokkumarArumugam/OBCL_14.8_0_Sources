create or replace package cspks_core_staff_restr as
  /*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright ©2024  Oracle and/or its affiliates.  All rights reserved.
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
  
  ** Created  By             : Chaitanya Pundlik
  ** Last Modified On        : 17-Dec-2024
  ** Last Modified Reason    : Using staff restrictions as part of common-core
  ** Bug No                  : 36924146 
  -------------------------------------------------------------------------------------------------------
  */
 
	PROCEDURE Pr_Set_Skip_Kernel;
    PROCEDURE Pr_Set_Activate_Kernel;
    PROCEDURE Pr_Set_Skip_Cluster;
    PROCEDURE Pr_Set_Activate_Cluster;

    FUNCTION Fn_Skip_Custom  RETURN BOOLEAN;
    FUNCTION Fn_Skip_Kernel  RETURN BOOLEAN;
    FUNCTION Fn_Skip_Cluster RETURN BOOLEAN;
 
    Function fn_staff_restr(
	                      p_cust_no     IN sttm_core_customer.customer_no%TYPE,
						  p_cust_ac_no  IN sttm_core_account.cust_account_no%TYPE,
                          p_err_param   IN OUT VARCHAR2,
                          p_err_code    IN OUT VARCHAR2) return VARCHAR2;
end cspks_core_staff_restr;
/
