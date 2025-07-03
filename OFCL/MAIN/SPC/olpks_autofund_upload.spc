CREATE OR REPLACE PACKAGE olpks_autofund_upload
AS
/*---------------------------------------------------------------------------------------------------------
**
** File Name		: olpks_autofund_upload.SPC --LDAUTFUN.SPC
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
---------------------------------------------------------------------------------------------------------------
/*CHANGE HISTORY START

DATE			FILE		FCC 		SITE			DESCRIPTION
				VERSION		VERSION

31-MAR-2003		1.0			4.2			BANGALORE 		Initial Version Written for Funding Automation Changes
06-NOV-2008 CITIUS-LS#SRT1451 CITIUS Till#633,STP Consolidation,By Swapnasish,Base rate funding Changes.														for CITILATAM-OPS Changes.
03-SEP-2009 FCC V.CL RELEASE 7.5 LOT1.2 SLT Treasury Funding Changes
19-FEB-2010 FLEXCUBE V.CL Release 7.6 Funding Allocation Changes
24-FEB-2010 FLEXCUBE V.CL Release 7.6 Funding Allocation Changes,added a new function fn_get_reference_no specification
11-MAR-2010 FLEXCUBE V.CL Release 7.6 CITIUS-LS#7193 Funding Allocation related fixes
13-AUG-2010 FLEXCUBE V.CL 7.7 retro CITIUS-LS#7257 Loans should be considered for the funding allocation,Pool funding should pameterized so that only funding     should be called from batch.
CHANGE HISTORY END 
*/
---------------------------------------------------------------------------------------------------------------
FUNCTION fn_create_offset_contract
	(
	p_contract_ref_no 	IN VARCHAR2,
	p_errcode	IN OUT VARCHAR2,
	p_errparam	IN OUT VARCHAR2
	)
RETURN BOOLEAN;
--06-NOV-2008 CITIUS-LS#SRT1451 CITIUS Till#633 Start By Swapnasish
FUNCTION fn_create_baserate_offsets
	(
	p_branch	IN oltbs_contract_master.branch%TYPE,--03-SEP-2009 FCC V.CL RELEASE 7.5 LOT1.2 SLT Treasury Funding Changes,added
	p_desk_type	IN VARCHAR2,--19-FEB-2010 FLEXCUBE V.CL Release 7.6 Funding Allocation Changes
	p_errcode	IN OUT VARCHAR2,
	p_errparam	IN OUT VARCHAR2
	)
RETURN BOOLEAN;
--06-NOV-2008 CITIUS-LS#SRT1451 CITIUS Till#633 End By Swapnasish
--19-FEB-2010 FLEXCUBE V.CL Release 7.6 Funding Allocation Changes starts
FUNCTION fn_pool_funding
			(
				p_branch	IN 	oltbs_contract_master.branch%TYPE,
				p_proc		IN 	VARCHAR2, --CITIUS-LS#7257 F-Funding L-Alloc A-All
				p_errcode	IN OUT 	VARCHAR2,
				p_errparam	IN OUT 	VARCHAR2
			)
RETURN BOOLEAN;
FUNCTION fn_long_term_fund_alloc
				(
				p_branch	IN	oltbs_contract_master.branch%TYPE,
				p_value_date	IN	sttm_dates.today%TYPE,
				p_product_type	IN	oltbs_contract_master.product_type%TYPE,--11-MAR-2010 FLEXCUBE V.CL Release 7.6 CITIUS-LS#7193 changes
				p_errcode	IN OUT	VARCHAR2,
				p_errparam	IN OUT	VARCHAR2
				)
RETURN BOOLEAN;
FUNCTION fn_pass_acc_entries
				(
				p_branch		IN	oltbs_contract_master.branch%TYPE,	
				p_value_date		IN	oltbs_contract_master.value_date%TYPE,
				p_product_type		IN      oltbs_contract.product_type%TYPE, --11-MAR-2010 FLEXCUBE V.CL Release 7.6 CITIUS-LS#7193 changes
				p_error_code  		IN OUT	VARCHAR2,
				p_error_param 		IN OUT	VARCHAR2
				)
		
RETURN BOOLEAN;
--19-FEB-2010 FLEXCUBE V.CL Release 7.6 Funding Allocation Changes ends
--24-FEB-2010 FLEXCUBE V.CL Release 7.6 Funding Allocation Changes,added
FUNCTION fn_get_reference_no
			    (
				pm_Branch 	IN 	oltbs_long_term_alloc.ac_branch%TYPE,
				pm_Batch 	IN 	oltbs_long_term_alloc.Batch_no%TYPE,
				pm_appl_date	IN 	DATE,
				pm_refno	IN OUT 	oltbs_long_term_alloc.trn_ref_no%TYPE,
				perrorcode	IN OUT	VARCHAR2
				)
RETURN BOOLEAN;
--24-FEB-2010 FLEXCUBE V.CL Release 7.6 Funding Allocation Changes,added
END olpks_autofund_upload;
/
CREATE or replace SYNONYM olpkss_autofund_upload FOR olpks_autofund_upload
/