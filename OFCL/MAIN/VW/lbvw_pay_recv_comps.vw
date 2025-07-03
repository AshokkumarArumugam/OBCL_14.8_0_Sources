CREATE OR REPLACE FORCE VIEW lbvw_pay_recv_comps
		(	contract_ref_no,
			source_ref_no, --18-Dec-2006 Madhu CITIUS-LS Till#221, Payable/Receivable Changes
			event_seq_no,
			component,
			component_description
		)
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name    : lbvw_pay_recv_comps.vw
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
09-Aug-2006 FCC V.CL Release 7.1 by Sulav Created view for the BV Interest change
18-Dec-2006 Madhu CITIUS-LS Till#221, Payable/Receivable Changes
30-AUG-2007 Arun  CITIUS-898 Re-Releasing in Production
*/
SELECT	v.contract_ref_no,
	v.source_ref_no, --18-Dec-2006 Madhu CITIUS-LS Till#221, Payable/Receivable Changes
	v.event_seq_no,v.component,
	lbpkss_payrecv.fn_get_comp_desc((SELECT sypks_utils.get_product(V.CONTRACT_REF_NO) FROM DUAL),v.component)  component_description
FROM                                                                        
(
	SELECT	DISTINCT contract_ref_no,
			source_ref_no, --18-Dec-2006 Madhu CITIUS-LS Till#221, Payable/Receivable Changes
			event_seq_no,component
	FROM	lbtb_pay_recv_due_detail
	WHERE	party_type IN ('B','P')
) v
/
CREATE OR REPLACE SYNONYM lbvws_pay_recv_comps FOR lbvw_pay_recv_comps
/