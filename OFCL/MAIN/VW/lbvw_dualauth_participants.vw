CREATE OR REPLACE FORCE VIEW lbvw_dualauth_participants
(borrower_contract_ref_no, customer_no, customer_name)
AS
/*----------------------------------------------------------------------------------------------------
This source is part of the Oracle Banking Corporate Lending  Software Product. 
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted 
in any form or by any means, electronic, mechanical, photographic, graphic, optic recording
or otherwise, translated in any language or computer language, without the prior written permission 
of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
--CITIUS-LS#6105 changes
SELECT DISTINCT(a.borrower_contract_ref_no), c.customer_no,c.customer_name1
FROM   lptbs_contract_master a,oltbs_contract b,oltms_customer c,lbtbs_consol_transfer d
WHERE  a.contract_ref_no	 		= 	b.contract_ref_no
AND    a.version_no         			= 	b.latest_version_no
AND    NVL(rounding_participant,'N')		<>	'Y'
AND    c. customer_no 				= 	a.counterparty
AND    c.record_stat        			= 	'O'
AND    c.auth_stat          			= 	'A'
AND    c.customer_no 				= 	d.participant
AND    NVL(c.dual_auth_for_assignment,'N')	=	'Y'
AND    a.version_no 				= 	(
						  		SELECT max(version_no)
						  		FROM   lptbs_contract_master 
						  		WHERE  contract_ref_no = a.contract_ref_no
						  	)
/
create or replace synonym lbvws_dualauth_participants for lbvw_dualauth_participants
/