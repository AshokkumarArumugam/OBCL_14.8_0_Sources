CREATE OR REPLACE PACKAGE lbpks_disclosure
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: lbpks_disclosure.SPC
**
** Module	: LOANS SYNDICATION
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
CHANGE_HISTORY
01-FEB-2007	FLEXCUBE V.CL Release 7.2 Disclosure Changes
	    	New package created for disclosure processing.
21-DEC-2007 FLEXCUBE V.CL Release 7.3 ITR2 SFR#1, CITILS-US#947 - Additional changes for disclosure functionality
1) Allow the unlock of disclosure schedules
2) If the quarterly and yearly schedules overlap for period end date the quarterly schedule will be ignored
3) Default the no of schedules based on the maturity of the tranche.
16-APR-2012 Flexcube V.CL Release 7.11,FS Volume-01 Tag11 Changes : UCC code processing on AUTH. History table population and propagation of Expiry Date.
*/

---------------------------------------------------------

FUNCTION fn_explode_sch
	(p_contract_ref_no	IN    VARCHAR2,
	p_action_code		IN	VARCHAR2,
	p_error_code           	OUT   VARCHAR2,
	p_error_param          	OUT   VARCHAR2)
RETURN BOOLEAN;

---------------------------------------------------------

FUNCTION fn_propagate_sch_dates
	(p_contract_ref_no		IN	VARCHAR2,
	 p_disclosure_code		IN	VARCHAR2,
	 p_error_code			OUT	VARCHAR2,
	 p_error_param			OUT	VARCHAR2
	)
RETURN BOOLEAN;

---------------------------------------------------------

FUNCTION fn_propagate_notes
	(p_contract_ref_no		IN	VARCHAR2,
	 p_error_code			OUT	VARCHAR2,
	 p_error_param			OUT	VARCHAR2
	)
RETURN BOOLEAN;

----------------------------------------------------------

FUNCTION fn_propagate_closure
	(p_contract_ref_no		IN	VARCHAR2,
	 p_disclosure_code		IN	VARCHAR2,
	 p_error_code			OUT	VARCHAR2,
	 p_error_param			OUT	VARCHAR2
	)
RETURN BOOLEAN;

----------------------------------------------------------

FUNCTION fn_auth_contract
	(p_contract_ref_no		IN	VARCHAR2,
	 p_error_code			OUT	VARCHAR2,
	 p_error_param			OUT	VARCHAR2
	)
RETURN BOOLEAN;

----------------------------------------------------------

FUNCTION fn_auth_status
	(p_contract_ref_no		IN	VARCHAR2,
	 p_disclosure_code		IN	VARCHAR2,
	 p_error_code			OUT	VARCHAR2,
	 p_error_param			OUT	VARCHAR2
	)
RETURN BOOLEAN;

----------------------------------------------------------
PROCEDURE pr_backup_contract_tables
	(p_contract_ref_no IN	VARCHAR2);

----------------------------------------------------------

PROCEDURE pr_backup_status_tables
	(p_contract_ref_no IN	VARCHAR2,
	 p_disclosure_code IN	VARCHAR2);

----------------------------------------------------------

PROCEDURE pr_restore_status_tables
	(p_contract_ref_no IN	VARCHAR2,
	 p_disclosure_code IN	VARCHAR2);

-----------------------------------------------------------
--CITIUS-LS#946 Starts
FUNCTION Fn_disclosure_del_backup
				(p_contract_ref_no	IN      VARCHAR2,
				 p_action_code		IN		VARCHAR2,
				 p_error_code       OUT     VARCHAR2,
				 p_error_param      OUT     VARCHAR2
				 )
RETURN BOOLEAN;

FUNCTION Fn_disclosure_restore
				(p_contract_ref_no	IN      VARCHAR2,
				 p_action_code		IN		VARCHAR2,
				 p_error_code       OUT     VARCHAR2,
				 p_error_param      OUT     VARCHAR2
				 )
RETURN BOOLEAN;

FUNCTION Fn_disclosure_backup
				(p_contract_ref_no	IN      VARCHAR2,
				 p_action_code		IN		VARCHAR2,
				 p_error_code       OUT     VARCHAR2,
				 p_error_param      OUT     VARCHAR2
				 )
RETURN BOOLEAN;
--CITIUS-LS#946 Ends
--16-APR-2012 Flexcube V.CL Release 7.11,FS Volume-01 Tag11 Changes Starts
FUNCTION fn_process_ucc	(p_disclosure_code	IN	lbtms_disclosure.disclosure_code%TYPE,	
			 p_error_code       	IN OUT     VARCHAR2,
			 p_error_param      	IN OUT     VARCHAR2
			)
RETURN BOOLEAN;
--16-APR-2012 Flexcube V.CL Release 7.11,FS Volume-01 Tag11 Changes Ends

END lbpks_disclosure;
/
CREATE OR REPLACE SYNONYM lbpkss_disclosure FOR lbpks_disclosure
/