create or replace package cspks_core_staff_restr_custom As
  /*-----------------------------------------------------------------------------------
  **
  ** File Name    :  cspks_core_staff_restr_custom
  **
  ** Module       :  Core
  **
  ** This source is part of the FLEXCUBE Corporate - Corporate Banking Software System
  ** and is copyrighted by Oracle Financial Services Software Limited.
  **
  ** All rights reserved.  No part of this work may be reproduced,
  ** stored in a retrieval system, adopted or transmitted in any form or by
  ** any means,electronic, mechanical, photographic, graphic, optic
  ** recording or otherwise,translated in any language or computer
  ** language, without the prior written permission of
  ** Oracle Financial Services Software Limited.
  **
  ** Oracle Financial Services Software Limited
  ** 10-11, SDF I, SEEPZ, Andheri (East),
  ** MUMBAI - 400 096.
  ** INDIA
  **
  ** Copyright © 1997- 2013 by Oracle Financial Services Software Limited.
  **
  ----------------------------------------------------------------------------------------
  CHANGE HISTORY
** Created  By             : Chaitanya Pundlik
** Last Modified On        : 17-Dec-2024
** Last Modified Reason    : Using staff restrictions as part of common-core
** Bug No                  : 36924146 
   -------------------------------------------------------------------------------------------------------
*/ 
 FUNCTION fn_pre_staff_restr(
                          p_cust_no     IN sttm_core_customer.customer_no%TYPE,
						  p_cust_ac_no  IN sttm_core_account.cust_account_no%TYPE,
                          p_err_param   IN OUT VARCHAR2,
                          p_err_code    IN OUT VARCHAR2) return boolean;
						 
 FUNCTION fn_post_staff_restr(
                          p_cust_no     IN sttm_core_customer.customer_no%TYPE,
						  p_cust_ac_no  IN sttm_core_account.cust_account_no%TYPE,
                          p_err_param   IN OUT VARCHAR2,
                          p_err_code    IN OUT VARCHAR2) return boolean;			 
END cspks_core_staff_restr_custom;
/
CREATE OR REPLACE SYNONYM cspkss_core_staff_restr_custom for cspks_core_staff_restr_custom
/
