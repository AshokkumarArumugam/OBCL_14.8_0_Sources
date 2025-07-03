CREATE OR REPLACE PACKAGE lbvds_services IS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: lbvds_services.SPC
**
** Module		: LOANS SYNDICATION
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
---------------------------------------------------------------------------------------------------------------
/*
change History

Ver	Date		Site			Desc
20-MAY-2008 FLEXCUBE V.CL Release 7.4 RT changes by Geetly to replicate the functioning of olvds_services for LS Module
24-SEP-2008 FLEXCUBE V.CL Release 7.4 Retro Changes CITIUS-LS-CITIUSLD46200209 User first performed a full interest payment, and then performed a value-dated amendment to 
		increase the maturity date; system did-not split the paid schedules, which should not be a case.  
*/
---------------------------------------------------------------------------------------------------------------



TYPE amt_paid_rec IS RECORD( p_component	oltbs_amount_due_cs.component%TYPE,
			     p_amt_paid		oltbs_amount_due_cs.amount_settled%TYPE);

TYPE ty_amt_paid IS TABLE OF amt_paid_rec INDEX BY BINARY_INTEGER;
amount_check char(1);
	--24-SEP-2008 FLEXCUBE V.CL Release 7.4 Retro Changes CITIUS-LS-CITIUSLD46200209 START
	g_fully_paid VARCHAR2(1):= 'N';
	--24-SEP-2008 FLEXCUBE V.CL Release 7.4 Retro Changes CITIUS-LS-CITIUSLD46200209 END
FUNCTION fn_redefine_maturity_sch
			(
			p_reference_no 		IN 	oltbs_contract.contract_ref_no%type,
			p_version_no 		IN 	oltbs_contract_master.version_no%type,
			p_contract_type 	IN 	VARCHAR2,
			p_value_Date		IN 	DATE, 
			p_effective_date 	IN 	Date,
			p_effective_amount	IN 	Number,
			p_ty_amt_paid 		IN OUT olvds_services.ty_amt_paid,
			p_error_code 		IN OUT VARCHAR2
			) 
RETURN BOOLEAN;

FUNCTION fn_redefine_schedule(p_action  IN VARCHAR2,
			p_rowid		IN ROWID,
			p_effective_date IN DATE,
			p_sch_count	IN NUMBER, 
			p_amount	IN NUMBER) 
RETURN BOOLEAN;

FUNCTION fn_min_recaldt(p_reference oltbs_contract.contract_ref_no%TYPE,
                        p_mindate OUT oltbs_amount_due_cs.due_date%TYPE
                       )
RETURN BOOLEAN;

END lbvds_services;
/