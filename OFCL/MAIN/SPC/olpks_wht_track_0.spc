CREATE OR REPLACE PACKAGE olpks_wht_track_0
AS
/*---------------------------------------------------------------------------------------------------------
**
** File Name	: olpks_wht_track_0.SPC
**
** Module		: LOANS and DEPOSITS
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
**
-------------------------------------------------------------------------------------------------------------
*/
/* Change History
17-FEB-2004 FCC4.5 APR 2004 LATAM OPUAT#116..If the contract is booked and liquidated
  today itself then the WHT processing should happen as part of the contract Initiation..						
*/


FUNCTION fn_mexican_tax_creation
	(	
		p_processing_branch	IN		oltbs_contract_master.branch%TYPE,
		p_processing_date		IN		DATE,
		p_processing_product	IN		oltbs_contract_master.product%TYPE,
		p_commit_frequency	IN		oltbs_automatic_process_master.bod_commit_count%TYPE,
		p_error_code		IN OUT	VARCHAR2,
		p_error_param		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_mexican_tax_event_process
	(
		p_contract_dtls		IN		oltbs_contract_master%ROWTYPE,
		p_processing_date		IN		DATE,
		p_event_code		IN		oltbs_contract.curr_event_code%TYPE,
		p_error_code		IN OUT	VARCHAR2,
		p_error_param		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

--FCC4.5 APR 2004 LATAM OPUAT#116 changes start
FUNCTION Fn_process_tax_for_a_contract
			(
			p_processing_branch	IN		oltbs_contract_master.branch%TYPE,
			p_processing_date		IN		DATE,
			p_processing_product	IN		oltbs_contract_master.product%TYPE,
			p_contract_ref_no		IN      	oltbs_contract_master.contract_ref_no%TYPE,
			p_process_till_date	IN		oltbs_contract_wht_master.prev_processed_till_date%TYPE,
			p_version_no		IN 		oltbs_contract.latest_version_no%TYPE,
			p_error_code		IN OUT 	VARCHAR2,
			p_error_param		IN OUT 	VARCHAR2
			)
RETURN BOOLEAN;
--FCC4.5 APR 2004 LATAM OPUAT#116 changes end


END olpks_wht_track_0;
/
CREATE or replace SYNONYM olpkss_wht_track_0 FOR olpks_wht_track_0
/