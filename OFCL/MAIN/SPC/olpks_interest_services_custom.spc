CREATE OR REPLACE PACKAGE olpks_interest_services_custom AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_interest_services_custom.spc
**
** Module		: LOANS AND DEPOSITS
**
	This source is part of the Oracle Flexcube Corporate Lending  Software Product.
	Copyright Â© 2022 , Oracle and/or its affiliates.  All rights reserved.
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

  **  Modified By     : Navoneel Nandan
  **  Modified On     : 17-Aug-2022
  **  Modified Reason : Hooks provided to modify the RAP component rate
  **  Search String   : Bug#34500369
------------------------------------END CHANGE HISTORY-------------------------------------
*/
  --Bug#34500369 starts
  FUNCTION fn_pre_compute_cosif_rate(
                                 p_contract_ref_no IN lftbs_contract_interest.contract_reference_no%TYPE,
                                 p_component       IN lftbs_contract_interest.component%TYPE,
                                 p_start_date      IN lftbs_contract_interest.value_date%TYPE,
                                 p_end_date        IN lftbs_contract_interest.value_date%TYPE,
                                 p_calc_from_basis IN lftbs_contract_interest.interest_basis%TYPE,
                                 p_calc_to_basis   IN lftbs_contract_interest.interest_basis%TYPE,
                                 p_rate            IN OUT lftbs_contract_interest.rate%TYPE) RETURN BOOLEAN;
  FUNCTION fn_post_compute_cosif_rate(
                                 p_contract_ref_no IN lftbs_contract_interest.contract_reference_no%TYPE,
                                 p_component       IN lftbs_contract_interest.component%TYPE,
                                 p_start_date      IN lftbs_contract_interest.value_date%TYPE,
                                 p_end_date        IN lftbs_contract_interest.value_date%TYPE,
                                 p_calc_from_basis IN lftbs_contract_interest.interest_basis%TYPE,
                                 p_calc_to_basis   IN lftbs_contract_interest.interest_basis%TYPE,
                                 p_rate            IN OUT lftbs_contract_interest.rate%TYPE) RETURN BOOLEAN;
  --Bug#34500369 ends
END olpks_interest_services_custom;
/
CREATE OR REPLACE SYNONYM olpkss_interest_services_custom FOR olpks_interest_services_custom;
/