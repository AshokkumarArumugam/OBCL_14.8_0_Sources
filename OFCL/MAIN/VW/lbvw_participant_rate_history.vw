CREATE OR REPLACE FORCE VIEW lbvw_participant_rate_history
AS 
/*----------------------------------------------------------------------------------------------------
**
** File Name    : lbvw_participant_rate_history.vw
**
** Module       : LS
**
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
/*-----------------------------------------------------START CHANGE HISTORY-----------------------------------------------
08-SEP-2006 FLEXCUBE V.CL Release 7.1 FS 17.0 Competitive Participant Bidding by Bincy
	    Created the View for Participant Bidding History		
*/
SELECT  a.contract_ref_no,a.participant,b.rate_type,a.component,
	b.fixed_rate_type,b.rate_code_usage,b.rate_code,
	a.base_rate,a.spread,b.margin,a.value_date
  FROM lbtbs_part_bidding_details a,lftbs_contract_interest_detail b
 WHERE a.contract_ref_no = b.contract_ref_no
   AND a.component	 = b.component 
   AND a.value_date	 = b.value_date
   AND a.value_date	 = (SELECT MAX(value_date)
			     FROM lbtbs_part_bidding_details c
			    WHERE c.contract_ref_no = a.contract_ref_no
			      AND c.participant     = a.participant 
			      AND c.component       = a.component
			      AND c.value_date	   <= b.value_date )
   AND a.event_seq_no	 = (SELECT max(event_seq_no )
   			      FROM lbtbs_part_bidding_details c
			     WHERE c.contract_ref_no = a.contract_ref_no 
			       AND c.participant     = a.participant
			       AND c.component	     = a.component  
			       AND c.value_date	     = a.value_date )


/


CREATE OR REPLACE SYNONYM lbvws_participant_rate_history FOR lbvw_participant_rate_history
/