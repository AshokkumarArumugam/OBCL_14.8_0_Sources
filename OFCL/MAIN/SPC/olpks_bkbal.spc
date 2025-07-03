CREATE OR REPLACE PACKAGE olpks_bkbal
AS

/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_bkbal.SPC
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
----------------------------------------------------------------------------------------------------
*/

/*----------------------------------CHANGE HISTORY----------------------------------

19-OCT-2005	FLEXCUBE V.CL Release 7.0 Changes by Aarthi
		New package created to compute and store the book dated average balances.
10-Apr-2006	FLEXCUBE V.CL Release 7.0 Changes by Aarthi
		Modified the copyright year.
22-dec-2007 FLEXCUBE V.CL Release 7.3 ITR2 SFR#93,CITIUS-LS#473, Bkbal LN Changes
26-MAY-2008 FLEXCUBE V.CL RELEASE 7.4 RETRO CHANGES CITIUS-LS-CITIUSLD46200062,CITIUS Till#581 Fcy changes
15-MAR-2010 PBG CONSOLIDATION,SLT BO Reports(Net income report) Related Changes
------------------------------------END CHANGE HISTORY-------------------------------------
*/

FUNCTION Fn_populate_bkbal
		(p_branch			IN	VARCHAR2,
		p_module			IN	VARCHAR2,
		p_date			IN	DATE,
		p_product			IN	VARCHAR2,
		p_commit_frequency	IN	NUMBER,
		p_error_code		IN OUT	VARCHAR2,
		p_error_parameter		IN OUT	VARCHAR2)	
RETURN BOOLEAN;

FUNCTION Fn_insert_bkbal
		(p_contract_ref_no	IN	VARCHAR2,
		p_date			IN	DATE,
		p_ccy				IN	VARCHAR2,
		p_component			IN	VARCHAR2,
		p_amount_lcy			IN	NUMBER,--25-Jul-2006 Madhu CITIUS Till#581 Fcy changes--26-MAY-2008 FLEXCUBE V.CL RELEASE 7.4 RETRO CHANGES CITIUS-LS-CITIUSLD46200062
		p_amount			IN	NUMBER,
		p_unit_head			IN	VARCHAR2,
		p_error_code		IN OUT	VARCHAR2,
		p_error_parameter		IN OUT	VARCHAR2)	
RETURN BOOLEAN;

FUNCTION Fn_populate_mtd_bal
		(p_branch			IN	VARCHAR2,
		p_date			IN	DATE,
                p_module		IN	VARCHAR2,--22-dec-2007 FLEXCUBE V.CL Release 7.3 ITR2 SFR#93,CITIUS-LS#473
		p_commit_frequency	IN	NUMBER,
		p_error_code		IN OUT	VARCHAR2,
		p_error_parameter		IN OUT	VARCHAR2)	
RETURN BOOLEAN;

FUNCTION Fn_populate_ytd_bal
		(p_branch			IN	VARCHAR2,
		p_date			IN	DATE,
                p_module		IN	VARCHAR2,--22-dec-2007 FLEXCUBE V.CL Release 7.3 ITR2 SFR#93,CITIUS-LS#473
		p_month			IN	VARCHAR2,
		p_year			IN	NUMBER,
		p_commit_frequency	IN	NUMBER,
		p_error_code		IN OUT	VARCHAR2,
		p_error_parameter		IN OUT	VARCHAR2)	
RETURN BOOLEAN;

FUNCTION Fn_get_avg_bal
		(p_contract_ref_no	IN	VARCHAR2,
		p_date			IN	DATE,
		p_month			IN	VARCHAR2,
		p_year			IN	NUMBER,
		p_balance_type		IN	VARCHAR2,
		p_amount_type		IN	VARCHAR2,--25-Jul-2006 Madhu CITIUS Till#581 Fcy changes--26-MAY-2008 FLEXCUBE V.CL RELEASE 7.4 RETRO CHANGES CITIUS-LS-CITIUSLD46200062
		p_avg_bal			OUT	NUMBER,
		p_error_code		IN OUT	VARCHAR2,
		p_error_parameter		IN OUT	VARCHAR2)	
RETURN BOOLEAN;
----15-MAR-2010 PBG CONSOLIDATION,SLT BO Reports(Net income report) related changes STARTS
 FUNCTION Fn_pop_net_income_detail
 			(
 			p_branch	IN	VARCHAR2,
 			p_commit_frequency	IN	NUMBER,
 			p_error_code		IN OUT	VARCHAR2,
			p_error_parameter	IN OUT	VARCHAR2
 			)
 RETURN BOOLEAN ;
 ---15-MAR-2010 PBG CONSOLIDATION,SLT BO Reports(Net income report) related changes ENDS
END olpks_bkbal;
/
create or replace synonym olpkss_bkbal for olpks_bkbal
/