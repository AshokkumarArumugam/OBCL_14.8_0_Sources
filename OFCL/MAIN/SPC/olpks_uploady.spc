CREATE OR REPLACE PACKAGE olpks_uploady
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_uploady.SPC
**
** Module		: INTERFACES
**
This source is part of the Oracle Banking Corporate Lending  Software Product.   
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
--------------------------------------------------------------------------------------------------------------------
CHANGE HISTORY
FCC 		FILE 		DATE			SITE			REMARKS
VERSION	VERSION
4.3			1.0		21-MAR-2003		BANGALORE		Initial Version - FCC 4.3 Trestel Changes

4.3.1		1.0		22-SEP-2003		BANGALORE		Interface changes - Added new procedures gen_err_xml and get_reply_details
26-DEC-2003 	FCC 4.4 dec2003 CHanges for ITR2 SFR 220
09-Apr-2004 	FCC 4.5 Lot2 Retro changes - Inclusion of SHO ERR,CREATE,DROP SYNONYM
10-APR-2004		FCC 4.5 Lot2 Retro changes   Adding the Branch Code to the Procedure called from the Job 
								and ensuring that this is used for GLOBAL.PR_INIT instead of 
								hardcoding the branch
07-JAN-2009 FLEXCUBE V.CL Release 7.4 ITR1 SFR#<2>, <29-SEP-2008>, <CITIUPG73100414> changes, 
		a)Invalid correction.
		b)Copyright changed.
		c)PLC46040118 Passed new parameter p_branch_code  in Fn_submit_job to handle multibranch upload jobs for Trestel.
14-Dec-2011 Flexcube V.CL Release 7.10 FS Tag14,Adjustments - S2 to Flexcube Interface change:Automation of adjustments upload for S2 adjustments feed
06-Jun-2016 OFCL standalone changes, commented not required code. Search string--- OFCL12.2 Not required
------------------------------------------------------------------------------------------------------------------------
*/

pkg_system					oltms_rec_details.cod_system%TYPE;
--pkg_branch					sttms_cust_account.branch_code%TYPE; -- OFCL12.2 Not required
pkg_branch					oltbs_account.branch_code%TYPE; -- OFCL12.2 Not required
pkg_msg_map					VARCHAR2(3);
pkg_operation				VARCHAR2(1);
pkg_source_ref				VARCHAR2(35);
pkg_contract_ref_no			VARCHAR2(35);
pkg_contractRefNo				oltbs_contract.contract_ref_no%TYPE;
pkg_txnbrn sttm_core_branch.branch_code%TYPE;
pkg_offsetbrn sttm_core_branch.branch_code%TYPE;
pkg_txnacc					oltbs_teller_master.TXN_ACCOUNT%TYPE;
pkg_offsetacc				oltbs_teller_master.OFFSET_ACCOUNT%TYPE;
pkg_deprod					oltbs_teller_master.PRODUCT_CODE%TYPE;
pkg_slno					VARCHAR2(5);
pkg_operation_code			VARCHAR2(35);

TYPE			pkg_tbl_upl_liq
IS
TABLE			OF
oltbs_upload_liq%ROWTYPE
INDEX BY BINARY_INTEGER;


TYPE record_type IS RECORD(
translation		VARCHAR2(500) ,
transalation_type_list	VARCHAR2(500) ,
default_values		VARCHAR2(500)
);

TYPE   rec_table_type IS TABLE
OF
record_type  INDEX BY VARCHAR2(100);
l_trans_tab rec_table_type;

TYPE			table_type
IS
TABLE			OF
VARCHAR2(100)	INDEX BY VARCHAR2(100);

TYPE			tab_table_type
IS
TABLE			OF
table_type		INDEX BY VARCHAR2(100);

TYPE			tab_tab_table_type
IS
TABLE			OF
tab_table_type		INDEX BY VARCHAR2(100);

--
--FCC 4.4 dec2003 CHanges for ITR2 SFR 220
--
TYPE			tbl_iftb_txnfin
IS
TABLE			OF
OLTB_TXNFIN%ROWTYPE
INDEX BY BINARY_INTEGER;

--
--FCC 4.4 dec2003 CHanges for ITR2 SFR 220
--



PROCEDURE pr_process_upload
	(
	--
	--26-DEC-2003 	FCC 4.4 dec2003 CHanges for ITR2 SFR 220
	--
	--p_process		VARCHAR2,
	p_process		oltbs_process_status.process%TYPE,
	p_func_id		oltbs_process_status.function_id%TYPE,
	p_process_seq	oltbs_process_status.process_seq%TYPE,
	--
	--26-DEC-2003 	FCC 4.4 dec2003 CHanges for ITR2 SFR 220
	--
	p_sleep_freq	NUMBER,
	p_branch		oltms_branch.BRANCH_CODE%TYPE 	-- FCC 4.5 Lot2 Retro changes
	);

--07-JAN-2009 FLEXCUBE V.CL Release 7.4 ITR1 SFR#<2>, <29-SEP-2008>, <CITIUPG73100414> changes start here	
/*
PROCEDURE pr_process_reply
	(
	p_process		VARCHAR2,
	p_sleep_freq		NUMBER
	);
*/
PROCEDURE pr_process_reply
	(
	p_process		VARCHAR2,
	p_sleep_freq		NUMBER, 
 p_branch VARCHAR2
	);
--07-JAN-2009 FLEXCUBE V.CL Release 7.4 ITR1 SFR#<2>, <29-SEP-2008>, <CITIUPG73100414> changes end here
FUNCTION fn_upload_contract
	(
		p_module          			 IN 		VARCHAR2,
		p_type_of_interface			 IN		VARCHAR2,
		p_system					 IN		VARCHAR2,
		p_rectype_list				 IN OUT	VARCHAR2,
		p_field_list		   		 IN OUT	VARCHAR2,
		p_value_list		   		 IN OUT	VARCHAR2,
		p_txnfin_values_table 		 	 IN		olpks_upload_services.value_list_tab_tab_table_type,
		p_cotms_pref				 IN		cotms_source_pref%ROWTYPE,
		p_error_code				 IN OUT	VARCHAR2,
		p_error_parameter			 	 IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_submit_job
	(
	p_branch_code	IN		VARCHAR2,--07-JAN-2009 FLEXCUBE V.CL Release 7.4 ITR1 SFR#<2>, <29-SEP-2008>, <CITIUPG73100414> changes	here
	p_func_id		IN	VARCHAR2,
	p_err_code		IN OUT	VARCHAR2,
	p_err_param		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_upload
(
	p_system	  		IN 		VARCHAR2,
	p_module          	IN 		VARCHAR2,
	p_process_seq_no  	IN 		VARCHAR2,
	p_external_ref_no 	IN 		VARCHAR2,
	p_iftb_txnfin_rec		IN		oltbs_txnfin%ROWTYPE,
	p_process_type		IN 		VARCHAR2,
	p_error_code	  	IN OUT 	VARCHAR2,
	p_error_parameter 	IN OUT 	VARCHAR2
)
RETURN BOOLEAN ;
PROCEDURE gen_err_xml
	(
	p_incoming_queue  IN VARCHAR2,
	p_outgoing_queue  OUT VARCHAR2,
	p_err_xml   OUT VARCHAR2
	);
PROCEDURE get_reply_details
	(
	p_process_type	IN 	  	VARCHAR2,
	p_seq_no		IN OUT	VARCHAR2,
	p_update_flag	IN 		VARCHAR2,
	p_source		OUT 	VARCHAR2,
	p_rectype		OUT 	VARCHAR2,
	p_key			OUT 	VARCHAR2,
	p_data			OUT 	VARCHAR2,
	p_xmlrootname	OUT		VARCHAR2,
	p_xmlinfo		OUT 	VARCHAR2,
	p_dtdorxsd		OUT 	VARCHAR2,
	p_qname			OUT 	VARCHAR2,
	p_empty_tags	OUT 	VARCHAR2,
	p_err_flag		OUT   	VARCHAR2
	);

--14-Dec-2011 Flexcube V.CL Release 7.10 FS Tag14,Adjustments - S2 to Flexcube Interface change start
FUNCTION Fn_pass_S2_adj
	(
		p_filepath 	IN 	varchar2,
		p_filename 	IN 	varchar2,
		p_err_code	IN OUT 	varchar2,
		p_err_param 	IN OUT 	varchar2
	)
RETURN BOOLEAN;
FUNCTION Fn_read_S2_file(	
			p_filepath 	in 	varchar2,
			p_filename 	in 	varchar2,
			p_err_code 	out 	varchar2,
			p_param 	out 	varchar2
			)
RETURN BOOLEAN;
FUNCTION Fn_upload_S2_adj
	(
		p_batch_no	OUT	oltbs_upload_adjustment.batch_no%TYPE,
		p_err_code	IN OUT	VARCHAR2,
		p_err_param 	IN OUT  VARCHAR2
	)
RETURN BOOLEAN;
FUNCTION Fn_validate_S2_adj(
			p_contract_ref_no 	IN 		oltbs_contract_master.contract_ref_no%type,
			p_batch_no            	IN 		oltbs_upload_adjustment.batch_no%type,
			p_serial_no		IN 		oltbs_upload_adjustment.serial_no%type,
			p_currency		OUT		oltbs_upload_adjustment.currency%type,
			p_err_code		OUT		ertbs_msgs.err_code%TYPE,
			p_err_param		OUT		VARCHAR2,
			p_err_msg		OUT 		VARCHAR2
                        )
RETURN BOOLEAN;
PROCEDURE Pr_S2_adj_log_exception
(
	p_contract_ref_no		IN	VARCHAR2,
	p_batch_no			IN	NUMBER,
	p_rowid				IN	VARCHAR2,
	p_err_code 			IN	VARCHAR2,
	p_err_type			IN	CHAR,
	p_err_param 			IN	VARCHAR2
);
--14-Dec-2011 Flexcube V.CL Release 7.10 FS Tag14,Adjustments - S2 to Flexcube Interface change end
--------------------------------------------------------------------------------------------------------------------
END olpks_uploady;
/
CREATE or replace SYNONYM olpkss_uploady FOR olpks_uploady

-- FCC 4.5 Lot2 Retro changes 
-- End
/