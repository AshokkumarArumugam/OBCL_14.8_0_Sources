CREATE OR REPLACE PACKAGE tlpks_fmem_upload
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name    : tlpks_fmem_upload.spc
**
** Module       : SECONDARY LOAN TRADING
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
**
----------------------------------------------------------------------------------------------------
*/

/*----------------------------------CHANGE HISTORY----------------------------------

25-JUN-2008 FLEXCUBE V.CL 7.4 Release, this package is created newly for Funding memo CSV Upload.
17-Feb-2010 FLEXCUBE V.CL Release 7.6 CITIUS RETRO CITIUS-LS#7021
---------------------------------------------------------------------------------------------------
*/


TYPE v_primary_data IS RECORD
	(
	contract_ref_no		TLTB_FMEM_MASTER.contract_ref_no%type,
	EVENT_SEQ_NO		TLTB_FMEM_MASTER.event_seq_no%type
	);
TYPE v_primary_data1 IS RECORD
	(
	contract_ref_no		TLTB_FMEM_MASTER.contract_ref_no%TYPE
	);
TYPE v_bug_data_rec IS RECORD
	(
	ROW_NUMBER	NUMBER,
	table_name	VARCHAR2(100),
	bug_desc	VARCHAR2(32767),
	bug_type	VARCHAR2(1)
	);

TYPE tb_table_column IS TABLE OF VARCHAR2(30)
INDEX BY BINARY_INTEGER;

TYPE tb_column_pos IS TABLE OF NUMBER
INDEX BY VARCHAR2(32767);

TYPE tb_table_data IS TABLE OF VARCHAR2(32767)
INDEX BY BINARY_INTEGER;

TYPE tb_table_data1 IS TABLE OF VARCHAR2(32767)
INDEX BY BINARY_INTEGER;

TYPE tb_dummy_table IS TABLE OF VARCHAR2(100)
INDEX BY BINARY_INTEGER;

TYPE tb_bug_table IS TABLE OF v_bug_data_rec
INDEX BY BINARY_INTEGER;


FUNCTION fn_get_tab_columns(p_table_name VARCHAR2, p_column OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION fn_get_tab_data(
		p_table_name    IN 	VARCHAR2,
		p_where		IN 	tlpks_fmem_upload.v_primary_data,
		---p_where1	IN	tlpks_fmem_upload.v_primary_data1,
		p_column	IN 	VARCHAR2,
		p_table_data	OUT	tlpks_fmem_upload.tb_table_data,
		p_err 		OUT	VARCHAR2
	)
	RETURN BOOLEAN;

FUNCTION fn_upload
	(
	p_contract_ref_no	IN	VARCHAR2			,
	p_event_seq_no		IN	NUMBER				,
	p_table_name		IN	VARCHAR2			,--table name
	p_table_data		IN OUT	tlpks_fmem_upload.tb_table_data	,--table data
	p_column_list		IN	VARCHAR2			,--list column
	p_err_desc		IN OUT	tlpks_fmem_upload.tb_bug_table	,
	p_err_code		IN OUT	VARCHAR2			,
	p_err_msg		IN OUT	VARCHAR
	)
RETURN BOOLEAN;

FUNCTION fn_put_data(
		p_table_data	IN	tlpks_fmem_upload.tb_table_data1,
		p_table_name	IN	VARCHAR2			,
		p_column_list	IN	VARCHAR2			,
		p_err		OUT	VARCHAR2
		)
RETURN BOOLEAN;

PROCEDURE pr_log_exception
	(
	p_contract_ref_no	IN	TLTB_FMEM_MASTER.contract_ref_no%type,
	p_err_code		IN	VARCHAR2,
	p_err_param		IN	VARCHAR2,
	p_tbl_name		IN	VARCHAR2,
	p_event_code            IN      VARCHAR2,
	p_event_seq_no		IN	NUMBER
	);
	
FUNCTION fn_validate_data
	(
	p_branch_tkt_allowed	IN	CHAR					,
	p_contract_ref_no	IN	TLTB_FMEM_MASTER.contract_ref_no%type	,
	p_actual_settl_date	IN	DATE					,
	p_event_seq_no		IN	TLTB_FMEM_MASTER.event_seq_no%type	,
	p_pkg_upld_error	OUT	VARCHAR2				,
	pkg_upload_exception	OUT	TLTB_FMEM_EXCEPTION%rowtype
	)
RETURN BOOLEAN;

FUNCTION fn_insert_errors  --Used for bulk insert from PL/SQL table to tltbs_fmem_exception table for handling the errors
	(
	p_contract_ref_no	IN	tltbs_fmem_exception.CONTRACT_REF_NO%TYPE,
	--p_tbl_upload_exception	IN	tltbs_fmem_exception%ROWTYPE		,
	p_err_code		IN OUT 	VARCHAR2				,
	p_err_params		IN OUT 	VARCHAR2
	)
RETURN BOOLEAN;	

FUNCTION fn_del_prev_recs
	(p_contract_ref_no	IN	VARCHAR2		,
	p_event_seq_no		IN	NUMBER			,
	p_err_code		IN OUT 	VARCHAR2		,
	p_err_params		IN OUT 	VARCHAR2
	)
RETURN BOOLEAN;

--17-Feb-2010 FLEXCUBE V.CL Release 7.6 CITIUS RETRO CITIUS-LS#7021 start
FUNCTION fn_pop_settlement_detail
	(
	P_contract_Ref_No	IN	tltbs_contract_master.contract_ref_no%type,
	P_Event_seq_no		IN	tltbs_settlement_master.event_seq_no%type,
	p_rec_contract_master	IN	tltbs_contract_master%rowtype,
	p_actual_settl_date	IN	tltbs_settlement_master.actual_settl_date%type,
	p_error_code		IN OUT	varchar2,
	p_Error_Params		IN OUT	varchar2
	)
RETURN BOOLEAN;
--17-Feb-2010 FLEXCUBE V.CL Release 7.6 CITIUS RETRO CITIUS-LS#7021 end

END tlpks_fmem_upload;
/
CREATE or replace SYNONYM tlpkss_fmem_upload FOR tlpks_fmem_upload
/