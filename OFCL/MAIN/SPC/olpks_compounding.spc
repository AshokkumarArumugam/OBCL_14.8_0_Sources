CREATE OR REPLACE PACKAGE olpks_compounding IS
/*------------------------------------------------------------------------------------------------
**
** File Name	: olpks_compounding.SPC
**
** Module		: Loans and Deposits
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
-----------------------------------------------------------------------------------------------
*/



/*
17-AUG-2004 FCC 4.6 Sep04 Retro (India)  New package to handle Compounding of Interest 
*/

FUNCTION fn_split_compound_recs
(
	p_ignore_hols			IN		VARCHAR2,
	p_hol_compound		IN		VARCHAR2,
	p_holiday_ccy			IN		VARCHAR2,	
	p_ty_int			IN OUT		lfpkss_computation.ty_int,
	p_error_code			IN OUT		VARCHAR2
) 
RETURN BOOLEAN;
FUNCTION fn_split_penalty_recs
(
	p_hol_compound			IN		VARCHAR2,
	p_holiday_ccy			IN		VARCHAR2,	
	p_grace_days			IN		oltms_product_master_ld.grace_days%TYPE,
	p_processing_date		IN		DATE,
	p_ty_int			IN OUT		lfpkss_computation.ty_int,
	p_error_code			IN OUT		VARCHAR2
) 
RETURN BOOLEAN;
FUNCTION	fn_add_penal_rec
			(
			p_contract_ref_no	IN	VARCHAR2,
			p_component		IN	VARCHAR2,
			p_hol_compound		IN	VARCHAR2,
			p_grace_days		IN	oltms_product_master_ld.grace_days%TYPE,
			p_schedule_date		IN	DATE,
			p_processing_date	IN	DATE,
			p_error_code		IN OUT	VARCHAR2
			)
RETURN BOOLEAN;

END olpks_compounding;

/

CREATE or replace SYNONYM olpkss_compounding FOR olpks_compounding

/