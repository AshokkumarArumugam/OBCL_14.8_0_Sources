CREATE OR REPLACE FORCE VIEW olvw_borrower_repair_msgqueue ( BORROWER_CONTRACT_REF_NO, 
BORROWER_EVENT_SEQ_NO ) AS 
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
--01-MAY-2008 CITIUS#1131, Added N also in the repair queue.
(SELECT	distinct	borrower_contract_ref_no,
					borrower_event_seq_no
		FROM	olvws_part_dly_msg_out
		WHERE	msg_status = 'R'
		AND     media = 'MAIL'
		--CITIUS#1131 CHANGES START
		UNION ALL
		SELECT	distinct	borrower_contract_ref_no,
					borrower_event_seq_no
		FROM	olvws_part_dly_msg_out
		--WHERE	msg_status ='U'--CITIUS#1131, Added N also
		WHERE	msg_status ='N' --CITIUS#1131, Added N also
		AND     media = 'MAIL'
		UNION ALL
		select distinct reference_no , esn
	from OLTB_DLY_MSG_OUT a where msg_status in(/*'U',*/'R','N') --CITIUS#1131, Added N also.
	and media = 'MAIL'
and exists(select 1 from OLTB_CONTRACT b where a.reference_no = b.contract_ref_no  and b.module_code = 'LB')
)
ORDER BY 1
--CITIUS#1131 CHANGES END
/

CREATE OR REPLACE SYNONYM olvws_borrower_repair_msgqueue FOR olvw_borrower_repair_msgqueue
/