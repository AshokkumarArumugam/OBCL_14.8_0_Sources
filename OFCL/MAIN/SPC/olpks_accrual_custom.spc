CREATE OR REPLACE PACKAGE olpks_accrual_custom AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_accrual_custom.SPC
**
** Module		: LOANS AND DEPOSITS
**
	This source is part of the Oracle Flexcube Corporate Lending  Software Product.   
	Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/

/*----------------------------------CHANGE HISTORY----------------------------------
**SFR Number         :
**Changed By         :
**Change Description :
**Search String      :


  **  Changed By         : Chandra Prasath.N
  **  Changed On         : 10-Feb-2022
  **  Change Description : Added hooks for custom changes of IOFMORA
  **  Search String      : Bug#33858554
  
------------------------------------END CHANGE HISTORY-------------------------------------
*/
FUNCTION fn_pre_accrue_during_penalty
  (
  p_contract_ref_no IN  oltbs_contract.contract_ref_no%TYPE,
  p_processing_date IN  date,
  p_authorization_status  IN  oltbs_contract.auth_status%TYPE,
  p_handoff_action_code IN  char,
  p_list_of_components  IN  varchar2,
  p_error_code    IN OUT  varchar2,
  p_error_parameter IN OUT  varchar2
  )
  RETURN boolean;

FUNCTION fn_post_accrue_during_penalty
  (
  p_contract_ref_no IN  oltbs_contract.contract_ref_no%TYPE,
  p_processing_date IN  date,
  p_authorization_status  IN  oltbs_contract.auth_status%TYPE,
  p_handoff_action_code IN  char,
  p_list_of_components  IN  varchar2,
  p_error_code    IN OUT  varchar2,
  p_error_parameter IN OUT  varchar2
  )
  RETURN boolean;
END olpks_accrual_custom;
/

CREATE or replace SYNONYM olpkss_accrual_custom FOR olpks_accrual_custom
/