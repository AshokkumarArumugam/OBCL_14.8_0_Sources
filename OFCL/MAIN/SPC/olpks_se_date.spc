CREATE OR REPLACE PACKAGE olpks_se_date
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name    : olpks_se_date.SPC
**
** Module       : SECURITIES
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


/*---------------------------------------------------------------------------
*/

TYPE g_day_count_record_type IS RECORD
	(
	coupon_period_start_date	date,
	coupon_period_end_date		date,
	numerator_method			VARCHAR2(15),
	denominator_method			VARCHAR2(15),
	denominator_basis			VARCHAR2(1),
	include_to_date				VARCHAR2(1),
	coupon_frequency_in_months	integer
	);

/*---------------------------------------------------------------------------
*/

FUNCTION fn_compute_day_count
	(
	p_date_1				IN		date,
	p_date_2				IN		date,
	p_day_count_record		IN		g_day_count_record_type,
	p_number_of_days		OUT		integer,
	p_day_count				OUT		number,
	p_error_code			IN OUT	varchar2,	
	p_error_parameter		IN OUT	varchar2
	)
	RETURN boolean;

FUNCTION fn_compute_number_of_days
	(
	p_date_1				IN		date,
	p_date_2				IN		date,
	p_numerator_method		IN		VARCHAR2,
	p_number_of_days		OUT		integer,
	p_error_code			IN OUT	varchar2,	
	p_error_parameter		IN OUT	varchar2
	)
	RETURN boolean;

FUNCTION fn_get_next_leap_date
	(
	p_basis_date			IN		date,
	p_next_leap_date		OUT		date,
	p_error_code			IN OUT	varchar2,	
	p_error_parameter		IN OUT	varchar2
	)
	RETURN boolean;

FUNCTION fn_get_next_periodic_date
	(
	p_basis_date			IN		date,
	p_frequency				IN		varchar2,
	p_start_day				IN		integer,
	p_start_month			IN		integer,
	p_next_periodic_date	OUT		date,
	p_error_code			IN OUT	varchar2,	
	p_error_parameter		IN OUT	varchar2
	)
	RETURN boolean;

FUNCTION fn_fcube_add_months
	(
	p_date_1				IN		date,
	p_add_months			IN		integer,
	p_periodicity_start_day	IN		integer,
	p_date_2				OUT		date,
	p_error_code			IN OUT	varchar2,
	p_error_parameter		IN OUT	varchar2
	)
	RETURN boolean;


FUNCTION fn_add_months
	(
	p_date_1				IN		date,
	p_add_months			IN		integer,
	p_adhere_to_month_end	IN		varchar2,
	p_date_2				OUT		date,
	p_error_code			IN OUT	varchar2,
	p_error_parameter		IN OUT	varchar2
	)
	RETURN boolean;

FUNCTION fn_months_between
	(
	p_date_1				IN		date,
	p_date_2				IN		date,
	p_months_between		OUT		number,
	p_error_code			IN OUT	varchar2,	
	p_error_parameter		IN OUT	varchar2
	)
	RETURN boolean;

/*---------------------------------------------------------------------------
*/

END olpks_se_date;
/
CREATE or replace SYNONYM olpkss_date_se FOR olpks_se_date
/