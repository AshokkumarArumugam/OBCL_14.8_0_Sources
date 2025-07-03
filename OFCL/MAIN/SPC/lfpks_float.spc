CREATE OR REPLACE PACKAGE lfpks_float IS
/*----------------------------------------------------------------------------------------------------
**
** File Name    : lfpks_float
**
** Module       : INTEREST, COMMISSION, CHARGES, FEES (ICCF)
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
/*
CHANGE HISTORY

06-MAR-2003 FCC 4.2 APRIL 2003 PLNCITI SFR #9195   Floating Rate table structures have changed.
						Corresponding changes in upload process for Kondor+

*/



	
	-- FCC 4.2 APRIL 2003 PLNCITI SFR #9195 Floating Rate table structures Changes..Starts
	/*
	
	FUNCTION update_prev_amt_next_date (
		branchCode IN CFTMS_FLOATING_RATE.branch_code%TYPE,
		rateCode IN CFTMS_FLOATING_RATE.rate_code%TYPE,
		ccyCode IN CFTMS_FLOATING_RATE.ccy_code%TYPE,
		amountSlab IN CFTMS_FLOATING_RATE.amount_slab%TYPE,
		effectiveDate IN CFTMS_FLOATING_RATE.effective_date%TYPE,
		errCode OUT ertbs_msgs.err_code%type)
		RETURN BOOLEAN;
	*/

	FUNCTION update_prev_amt_next_date 
	(
		branchCode    IN  Cftms_float_rate_master.branch_code%TYPE,
		rateCode 	  IN  Cftms_float_rate_master.rate_code%TYPE,
		ccyCode 	  IN  Cftms_float_rate_master.ccy_code%TYPE,
		amountSlab    IN  Cftms_float_rate_master.amount_slab%TYPE,
		effectiveDate IN  Cftms_float_rate_master.effective_date%TYPE,
		borrowlendind IN  Cftms_float_rate_master.borrow_lend_ind%TYPE,
		errCode 	  OUT ertbs_msgs.err_code%type
		)
		RETURN BOOLEAN;

	/*
	FUNCTION update_internal_field(
		branchCode IN CFTMS_FLOATING_RATE.branch_code%TYPE,
		rateCode IN CFTMS_FLOATING_RATE.rate_code%TYPE,
		ccyCode IN CFTMS_FLOATING_RATE.ccy_code%TYPE,
		amountSlab IN CFTMS_FLOATING_RATE.amount_slab%TYPE,
		effectiveDate IN CFTMS_FLOATING_RATE.effective_date%TYPE,
		actionCode IN CHAR,
		errCode OUT ertbs_msgs.err_code%type)
		RETURN BOOLEAN;
	*/
		FUNCTION update_internal_field(
		branchCode    IN Cftms_float_rate_master.branch_code%TYPE,
		rateCode      IN Cftms_float_rate_master.rate_code%TYPE,
		ccyCode       IN Cftms_float_rate_master.ccy_code%TYPE,
		amountSlab    IN Cftms_float_rate_master.amount_slab%TYPE,
		effectiveDate IN Cftms_float_rate_master.effective_date%TYPE,
		borrowlendind IN  Cftms_float_rate_master.borrow_lend_ind%TYPE,
		actionCode    IN CHAR,
		errCode      OUT ertbs_msgs.err_code%type)
		RETURN BOOLEAN;

	-- FCC 4.2 APRIL 2003 PLNCITI SFR #9195 Floating Rate table structures Changes..Ends
	FUNCTION update_float_int_fields(
		branchCode IN CFTMS_FLOATING_RATE.branch_code%TYPE,
		rateCode IN CFTMS_FLOATING_RATE.rate_code%TYPE)
		RETURN BOOLEAN;
END lfpks_float;
/
CREATE or replace SYNONYM lfpkss_float FOR lfpks_float
/