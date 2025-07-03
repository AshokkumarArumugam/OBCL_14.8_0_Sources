CREATE OR REPLACE PACKAGE  olpks_wht_yend
AS
/*-------------------------------------------------------------------------------------------------
**
** File Name	: olpks_wht_yend.SPC
**
** Module		: LOANS AND DEPOSITS
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.

17-AUG-2004 FCC 4.6 Sep04 Retro (India) NEW PACKAGE
**
----------------------------------------------------------------------------------------------------
*/



/* ***************************                 	 CHANGE HISTORY 			*****************************




*********************************************************************************************************************
*/


TYPE contract_struct IS  RECORD
	(
	module				oltbs_contract.module_code%TYPE,
	product				oltbs_contract.product_code%TYPE,
	product_type			oltbs_contract.product_type%TYPE,
	latest_event_seq_no		oltbs_contract.latest_event_seq_no%TYPE,
	latest_version_no		oltbs_contract.latest_version_no%TYPE,
	contract_status			oltbs_contract.contract_status%TYPE,
	user_defined_status		oltbs_contract.user_defined_status%TYPE,
	customer			oltbs_contract.counterparty%TYPE,
	contract_ccy			oltbs_contract.contract_ccy%TYPE,
	book_date			date,
	value_date			date,
	maturity_type			oltbs_contract_master.maturity_type%TYPE,	--02-FEB-2002 FCC3.9 LATAM
	memo_accruals			oltms_product_status_master.memo_accruals%TYPE,  --FCC 4.1 Oct-2002 Status A/c for Loans changes
	limit_track_reqd		oltbs_contract_master.limit_track_reqd%TYPE    --fcc 4.3 aug 2003 mm module changes
	);

FUNCTION fn_yend_tax
(
	p_brn			IN 	oltms_branch.branch_code%TYPE ,
	p_module			IN		oltms_branch_parameters.module_code%TYPE,
	p_product		IN	oltbs_contract.product_code%TYPE,
	p_processing_date	IN	DATE,
	p_error_code		IN OUT	varchar2,
	p_error_parameter	IN OUT	varchar2
	)
RETURN BOOLEAN 	;


FUNCTION fn_yend_all_products
(
	p_brn				IN 		oltms_branch.branch_code%TYPE ,
	p_module			IN		oltms_branch_parameters.module_code%TYPE,	
	p_processing_date		IN		DATE,
	p_error_code		IN OUT	varchar2,
	p_error_parameter		IN OUT	varchar2
	)
RETURN BOOLEAN;

END olpks_wht_yend;
/
CREATE or replace SYNONYM olpkss_wht_yend FOR olpks_wht_yend
/