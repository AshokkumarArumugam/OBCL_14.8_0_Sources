CREATE OR REPLACE PACKAGE lbpks_interest_custom AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: lbpks_interest_custom.SPC
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
------------------------------------END CHANGE HISTORY-------------------------------------
*/

FUNCTION FN_PRE_WRITE_CONT_INTEREST(p_contract_reference_no IN	oltbs_computation_handoff.contract_ref_no%TYPE,
									p_component 		  IN  oltbs_computation_handoff.component%TYPE,
									p_effective_date	  IN  oltbs_computation_handoff.effective_date%TYPE,
									p_rate 			  IN  oltbs_computation_handoff.rate%TYPE,
									p_spread		  IN	NUMBER DEFAULT NULL,
									p_tb_custom_data  IN OUT	Global.ty_tb_custom_data) RETURN BOOLEAN;
									
FUNCTION FN_POST_WRITE_CONT_INTEREST(p_contract_reference_no IN	oltbs_computation_handoff.contract_ref_no%TYPE,
									p_component 		  IN  oltbs_computation_handoff.component%TYPE,
									p_effective_date	  IN  oltbs_computation_handoff.effective_date%TYPE,
									p_rate 			  IN  oltbs_computation_handoff.rate%TYPE,
									p_spread		  IN	NUMBER DEFAULT NULL,
									p_tb_custom_data  IN OUT	Global.ty_tb_custom_data) RETURN BOOLEAN;

END lbpks_interest_custom;
/


CREATE or replace SYNONYM lbpkss_interest_custom FOR lbpks_interest_custom
/