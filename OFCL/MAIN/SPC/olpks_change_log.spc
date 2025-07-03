CREATE OR REPLACE PACKAGE olpks_change_log
IS
/*----------------------------------------------------------------------------------------------------
**
** File Name    : olpks_change_log
**
** Module       : CORE SERVICES
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

/*----change history starts
26-feb-08	SSI Mnemonic Propogation - UK Changes start
*/----change history ends

----------------------------------------------------------------------------------------------------



	TYPE ty_change_log IS TABLE OF oltbs_obj_item_desc.object_desc%type
		INDEX BY BINARY_INTEGER;
	TYPE ty_old_value IS TABLE OF
		oltbs_contract_change_log.old_display_value%type
		INDEX BY BINARY_INTEGER;
	TYPE ty_new_value IS TABLE OF
		oltbs_contract_change_log.new_display_value%type
		INDEX BY BINARY_INTEGER;
	TYPE ty_column_name IS TABLE OF USER_TAB_COLUMNS.column_name%type
		INDEX BY BINARY_INTEGER;
	TYPE ty_data_type IS TABLE OF USER_TAB_COLUMNS.data_type%type
		INDEX BY BINARY_INTEGER;
	TYPE ty_data_precision IS TABLE OF USER_TAB_COLUMNS.data_precision%type
		INDEX BY BINARY_INTEGER;
	TYPE ty_varchar2 IS TABLE OF VARCHAR2(2000)
		INDEX BY BINARY_INTEGER;
	TYPE ty_char IS TABLE OF CHAR(1)
		INDEX BY BINARY_INTEGER;
	TYPE ty_number IS TABLE OF NUMBER
		INDEX BY BINARY_INTEGER;
	TYPE ty_date IS TABLE OF DATE
		INDEX BY BINARY_INTEGER;
	TYPE ty_general IS TABLE OF VARCHAR2(35)
		INDEX BY BINARY_INTEGER;
	--SSI Mnemonic Propogation - UK Changes start
	TYPE ty_rec_change_log IS RECORD
	(
	field_changed			VARCHAR2(35),
	field_description		VARCHAR2(35),
	old_value				VARCHAR2(35),
	old_display_value		VARCHAR2(35),
	new_value				VARCHAR2(35),
	new_display_value 		VARCHAR2(35)
	);
	
	TYPE ty_change_log_dtls IS TABLE OF ty_rec_change_log INDEX BY BINARY_INTEGER;
	
	--SSI Mnemonic Propogation - UK Changes end
	FUNCTION fn_populate_change_log (p_ty_change_log IN OUT TY_CHANGE_LOG
				, p_ty_old_value IN OUT TY_OLD_VALUE
				, p_ty_new_value IN OUT TY_NEW_VALUE
				, p_language IN SMTBS_LANGUAGE.lang_code%TYPE
				, p_table_name IN VARCHAR2
				, p_missing_key_col IN VARCHAR2
				, p_old_where_clause IN VARCHAR2
				, p_new_where_clause IN VARCHAR2
				, p_no_of_missing_keyvals OUT NUMBER
				, p_end_pos  OUT NUMBER) RETURN BOOLEAN ;

	FUNCTION fn_update_change_log ( p_cont_ref_no IN VARCHAR2
					, p_event_seq_no IN NUMBER
					, p_table_list IN VARCHAR2
					, p_language IN VARCHAR2
					, p_missing_key_col_list IN VARCHAR2
					, p_old_where_clause_list IN VARCHAR2
					, p_new_where_clause_list IN VARCHAR2
					, p_app_date IN DATE
					, p_error_code OUT VARCHAR2) RETURN BOOLEAN;
 /* Sitaram New function added to highlight the changes between two versions */

	FUNCTION fn_highlight_change_log ( p_cont_ref_no IN VARCHAR2
					, p_event_seq_no IN NUMBER
					, p_table_list IN VARCHAR2
					, p_language IN VARCHAR2
					, p_missing_key_col_list IN VARCHAR2
					, p_old_where_clause_list IN VARCHAR2
					, p_new_where_clause_list IN VARCHAR2
					, p_app_date IN DATE
					, p_error_code OUT VARCHAR2) RETURN BOOLEAN;
---------------------------------------------------------------

	FUNCTION fn_get_sskeys ( p_table_name IN VARCHAR2
					    , p_where_clause IN VARCHAR2
					    , p_missing_key_col IN VARCHAR2
						 , p_no_of_missing_keyvals OUT NUMBER
					    , p_key_tab IN OUT olpks_change_log.ty_general )
				RETURN BOOLEAN;
	--SSI Mnemonic Propogation - UK Changes start
	FUNCTION Fn_log_ssi	(
 p_branch varchar2,
					p_module          	varchar2,
 p_counterparty varchar2,
					p_currency        	varchar2,
					p_product_code      varchar2,
					p_settlement_seq_no number,
					p_mod_no			number,
					p_operation_type	Varchar2,
					p_err_code          Varchar2,
					p_err_param         Varchar2
				)
	RETURN BOOLEAN;
	
	FUNCTION Fn_log_changes(
							p_contract_ref_no          Varchar2,
							p_event_seq_no             Varchar2,
							p_function_id              Varchar2,
							p_table_list               Varchar2,
							p_replace_list             Varchar2,
							p_pop_change_log		   Varchar2,
							p_tb_change_log 	IN OUT ty_change_log_dtls,
							p_err_code                 Varchar2,
							p_err_param                Varchar2
							)
	RETURN BOOLEAN; 
	--SSI Mnemonic Propogation - UK Changes ENDS
	
END olpks_change_log;
/
CREATE or replace SYNONYM olpkss_change_log FOR olpks_change_log
/