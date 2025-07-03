CREATE OR REPLACE PACKAGE CFPKS_FLOATRATE AS
/*------------------------------------------------------------------------------------------
**
** This source is part of the Oracle FLEXCUBE Software Product.
** Copyright (R) 2016 , Oracle and/or its affiliates.  All rights reserved
**
**
** No part of this work may be reproduced, stored in a retrieval system, adopted
** or transmitted in any form or by any means, electronic, mechanical,
** photographic, graphic, optic recording or otherwise, translated in any
** language or computer language, without the prior written permission of
** Oracle and/or its affiliates.
**
** Oracle Financial Services Software Limited.
** Oracle Park, Off Western Express Highway,
** Goregaon (East),
** Mumbai - 400 063, India
** India
------------------------------------------------------------------------------------------
*/
/*
-------------------------------------------------------------------------------------------*/
FUNCTION fn_cfupdate_slabs(
	p_branch_code			IN			CFTMS_FLOATING_RATE.branch_code%TYPE,
	p_rate_code				IN			CFTMS_FLOATING_RATE.rate_code%TYPE,
	p_ccy_code				IN			CFTMS_FLOATING_RATE.ccy_code%TYPE,
	p_amt_slab				IN			CFTMS_FLOATING_RATE.amount_slab%TYPE,
	p_effective_date		IN			CFTMS_FLOATING_RATE.effective_date%TYPE,
	p_int_rate				IN			CFTMS_FLOATING_RATE.int_rate%TYPE,
	p_action_code			IN			Varchar2,
	p_err_codes				IN OUT	Varchar2,
	p_err_params			IN OUT	Varchar2)

	RETURN BOOLEAN ;

-- 4.1 rel - New funtion for New Float Rate maintenance
FUNCTION fn_new_cfupdate_slabs(
	p_branch_code			IN			CFTMS_FLOAT_RATE_MASTER.branch_code%TYPE,
	p_rate_code				IN			CFTMS_FLOAT_RATE_MASTER.rate_code%TYPE,
	p_ccy_code				IN			CFTMS_FLOAT_RATE_MASTER.ccy_code%TYPE,
	p_amt_slab				IN			CFTMS_FLOAT_RATE_MASTER.amount_slab%TYPE,
	p_effective_date		IN				CFTMS_FLOAT_RATE_MASTER.effective_date%TYPE,
	p_int_rate				IN			CFTMS_FLOAT_RATE_DETAIL.int_rate%TYPE,
	p_borrow_lend_ind			IN			CFTMS_FLOAT_RATE_MASTER.borrow_lend_ind%type,
	p_action_code			IN			Varchar2,
	p_err_codes				IN OUT	Varchar2,
	p_err_params			IN OUT	Varchar2)

RETURN BOOLEAN;

END CFPKS_FLOATRATE;
/
drop synonym cfpkss_floatrate
/
create synonym cfpkss_floatrate for cfpks_floatrate
/