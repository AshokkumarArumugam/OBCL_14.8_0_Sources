CREATE OR REPLACE package olpks_ops_tax IS
/*----------------------------------------------------------------------------------------------------
**
** File Name    : olpks_ops_tax.SPC
**
** Module       : LD
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/



FUNCTION fn_tax_liq_entry (
   p_contract_ref_no IN oltbs_contract.contract_ref_no%TYPE,
   p_event_seq_no IN oltbs_contract.latest_event_seq_no%TYPE,
   p_event_code IN oltbs_contract.curr_event_code%TYPE,
   p_error_code IN OUT VARCHAR2,
   p_error_parameter IN OUT VARCHAR2
) RETURN boolean;

-------------------------------------------------------------------------------------------------------

FUNCTION fn_receipt_reversal
(
p_contract_ref_no			IN		oltbs_contract_receipt_liq.contract_ref_no%TYPE,
p_liq_event_seq_no		IN		oltbs_contract_receipt_liq.liq_event_seq_no%TYPE,
p_event_seq_no			IN		oltbs_contract_receipt_liq.event_seq_no%TYPE,
p_maker_id				IN		oltbs_contract_event_log.maker_id%TYPE,
p_application_date		IN		DATE,
p_process_code			IN		oltbs_contract_control.process_code%TYPE,
p_error_code 			IN OUT	ertb_msgs.err_code%TYPE,
p_error_parameter 		IN OUT 	VARCHAR2
)
RETURN BOOLEAN;

END olpks_ops_tax;
/
CREATE or replace SYNONYM olpkss_ops_tax FOR olpks_ops_tax
/