CREATE OR REPLACE PACKAGE olpks_rollover_cluster AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_rollover_cluster.SPC
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

	FUNCTION fn_pre_roll_a_contract_over
	(
 	p_contract_ref_no	IN 	oltbs_contract.contract_ref_no%TYPE,
	p_processing_date	IN	date,
	p_authorization_status	IN	oltbs_contract.auth_status%TYPE,
	p_error_code		IN OUT	varchar2,
	p_error_parameter	IN OUT	varchar2
	)
	RETURN boolean; 
	
	FUNCTION fn_post_roll_a_contract_over
	(
 	p_contract_ref_no	IN 	oltbs_contract.contract_ref_no%TYPE,
	p_processing_date	IN	date,
	p_authorization_status	IN	oltbs_contract.auth_status%TYPE,
	p_error_code		IN OUT	varchar2,
	p_error_parameter	IN OUT	varchar2
	)
	RETURN boolean; 
	
END olpks_rollover_cluster;
/


CREATE or replace SYNONYM olpkss_rollover_cluster FOR olpks_rollover_cluster
/