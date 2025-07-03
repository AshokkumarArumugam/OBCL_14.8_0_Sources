CREATE OR REPLACE PACKAGE olpks_services_0
AS
/*------------------------------------------------------------------------------------------------------------------------
**
** File Name	: olpks_services_0.SPC
**
** Module		: Settlement Msg Generation

This source is part of the Oracle Banking Corporate Lending  Software Product.   
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
-------------------------------------------------------------------------------------------------------------------------
*/
/*------------------------------------------------------------------------------------------------------------------------
--CHANGE HISTORY

--Date			Version		FCC Version		Site		Description
--14-NOV-2003		1.0			4.0		BANGALORE	Initial Version for FCC4.4 Dec 2003 MS Changes.
--28-Mar-2004		4.5lot2			4.5		Citi London 	New parameter p_rntc_mesg_date added in fn_get_settle_msg_date 	
--08-DEC-2005  Flexcube V.CL Release 7.0  Changes done for Settlemnt Pickup using MNEMONIC by Mithilesh
-------------------------------------------------------------------------------------------------------------------------
*/
TYPE rec_ccy_dates IS RECORD
	(
	ccy_code	  			VARCHAR2(3),
	ccy_from_date				DATE,
	ccy_to_date				DATE
	);

TYPE	tbl_ccy_dates	IS TABLE OF rec_ccy_dates	INDEX BY BINARY_INTEGER;

--Flexcube V.CL Release 7.0, New function Add by MIT on 051208 Start

FUNCTION fn_get_mnemonic
(
     p_cust_no    IN  oltms_instr.Counterparty%TYPE,
     p_ssn        IN  oltms_instr.settlement_seq_no%TYPE,
     p_error_code OUT VARCHAR2,
     p_error_msg  OUT VARCHAR2
)
RETURN VARCHAR2;

FUNCTION fn_get_ssn
(
     p_cust_no    IN  oltms_instr.Counterparty%TYPE,
     p_mnemonic   IN  oltms_instr.ssi_mnemonic%TYPE,
     p_error_code OUT VARCHAR2,
     p_error_msg  OUT VARCHAR2
)
RETURN NUMBER;

--Flexcube V.CL Release 7.0, New function Add by MIT on 051208 End

FUNCTION	fn_get_settle_msg_date
	(
	p_branch_code		IN		oltms_branch.branch_code%TYPE,
	p_ccy_code		IN		cytms_ccy_defn.ccy_code%TYPE,
	p_due_date		IN		DATE,
	p_pay_mesg_date		OUT		DATE,
	p_recv_mesg_date	OUT		DATE,
	p_rntc_mesg_date	OUT		DATE,
	p_error_code		IN OUT		VARCHAR2,
	p_error_parameter 	IN OUT		VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_recalc_settle_days
	(
	p_branch_code		IN		oltms_branch.branch_code%TYPE,
	p_application_date	IN		DATE,
	p_error_code		IN OUT		VARCHAR2,
	p_error_parameter	IN OUT		VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_populate_pending_tbl
	(
	p_session_id		IN		NUMBER,
	p_error_code		IN OUT		ertbs_msgs.err_code%TYPE,
	p_error_parameter 	IN OUT		VARCHAR2
	)
RETURN BOOLEAN;

--------------------------------------------------------------------------------------------------------------------------
END olpks_services_0;
/
CREATE or replace SYNONYM olpkss_services_0 FOR olpks_services_0
/