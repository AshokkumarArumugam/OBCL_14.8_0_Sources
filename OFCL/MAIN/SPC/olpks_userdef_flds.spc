Create or replace package olpks_userdef_flds as
/*----------------------------------------------------------------------------------------------------
**
** File Name    : olpks_userdef_flds.SPC
**
** Module       : USER DEFINED
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

-- 29-JULY-2003 FCC 4.3 AUG 2003 DEVELOPMENT REQUIREMENTS
	OVERLOADED THE FUNCTION fn_populate_udf_on_auth FOR VERSION CHANGES OF CUSTOMER/CUSTOMER ACCOUNTS/CUSTOMER ADDRESSES

13-AUG-2003	FCC 4.3 AUG 2003 	BOUAT SFR 90	olfn_date_type added to ty_fld_rec to format the date according the date type 
					                  maintained in oltms_user_fields.

14-NOV-2003 FCC 4.4 DEC 2003 PYPROD TIL#86 If a GL is created and deleted, UDF details are not removed.Hence two procedures 
                                           pr_delete_udf ,pr_get_rec_key are being added.
*/



type ty_elem_rec is record(
                            elem_id varchar2(35),
                            elem_type char(1),
                            elem_source varchar2(255),
                            elem_pos binary_integer);

type ty_fld_rec is record(  field_name varchar2(35),
                            field_type char(1),
		      	    field_scope char(1),
                            olfn_date_type varchar2(11),	-- FCC 4.3 AUG 2003 	BOUAT SFR 90
          			    elem_pos binary_integer
                         ); 

                            
type ty_elem_tab is table of ty_elem_rec index by binary_integer;
type ty_is_tab is table of oltbs_settlements%rowtype index by binary_integer;
type ty_int_tab is table of lftbs_contract_interest%rowtype index by binary_integer;
type ty_fld_tab is table of ty_fld_rec index by binary_integer;

type ty_chg_tab is table of lftbs_contract_charges%rowtype index by binary_integer;
type ol_ty_mis_tab is table of oltbs_class_mapping%rowtype index by binary_integer;

type ty_num_tab is table of number index by binary_integer;
type ty_char_tab is table of varchar2(32767) index by binary_integer;
type ty_date_tab is table of date index by binary_integer;

TYPE TY_CLIENT_TAB IS TABLE OF oltms_user_fields%ROWTYPE
INDEX BY BINARY_INTEGER;

-- Global Session wide Variables 
g_elem_tab ty_elem_tab;
g_is_tab   ty_is_tab;
g_int_tab  ty_int_tab;
g_chg_tab  ty_chg_tab;
g_mis_tab  ol_ty_mis_tab;
g_fld_tab  ty_fld_tab;

-- Actual Field Values
g_char_tab ty_char_tab;
g_num_tab  ty_num_tab;
g_date_tab ty_date_tab;

-- Element Values as passed by the client.
g_char_elem ty_char_tab;
g_num_elem ty_num_tab;
g_date_elem ty_date_tab;

g_flds_reqd varchar2(32767); -- List of fields for the current Brn+function

g_err_tab ty_char_tab;
g_ovd_tab ty_char_tab;
g_key_val  varchar2(32767);


-- pr_init : Clears all global structures. Reset Counts
--           Sets up static element table
procedure pr_init(p_brn varchar2,p_func_id varchar2,
                  p_func_type varchar2,
		  p_elem_tab in out ty_elem_tab,
		  p_key_tab in out ty_char_tab
		  );

/* pr_set_elem_values : Takes values from the form and stores them 
                        in the appropriate Server PL/SQL tables. */
                        
Function fn_set_elem_values(p_brn varchar2,
                            p_func_id varchar2,
                            p_key_val varchar2,
                            p_char_vals ty_char_tab,
			    			p_date_vals ty_date_tab,
                            p_num_vals  ty_num_tab,
                            p_err_code in out varchar2,
                            p_param in out varchar2)
return boolean;

--
-- FCC4.0 june 2002 itr1 
--

Function fn_set_elem_values(p_brn varchar2,
                            p_func_id varchar2,
                            p_key_val varchar2,
                            p_char_vals ty_char_tab,
            			    p_date_vals ty_date_tab,
                            p_num_vals  ty_num_tab,
                            p_last_auth	varchar2,
                            p_err_code in out varchar2,
                            p_param in out varchar2)
return boolean;
--
--	FCC4.0 june 2002 itr1 
--

/* pr_derive_udf : gets values from the form and derives Udf values */

function fn_derive_udfs(p_brn varchar2,
                        p_func_id varchar2,
                        p_err_code in out varchar2,
                        p_param    in out varchar2)
return boolean;


/* pr_validate_udfs : Checks if UDF Values are correct given inputs */
function fn_validate_udfs(p_brn varchar2,
                          p_func_id   varchar2,
                          p_udf_char  in out ty_char_tab,
			              p_udf_date  in out ty_date_tab,
                          p_udf_num   in out ty_num_tab,
                          p_err_tab   in out ty_char_tab,
			              p_ovd_tab    in out ty_char_tab 
			 			) 
return integer;                          
                        
                        
function fn_bld_udf_sp(p_func_id varchar2,p_err_code in out varchar2,
                        p_param in out varchar2)
return boolean;

function fn_get_udf_val(p_func_id varchar2,
                        p_fld_name varchar2,
                        p_key_val varchar2,
						p_scope varchar2 := NULL)
return varchar2;

--
-- CITI4.0 ITR1 changes start: Parallel maintenance changes start
--
FUNCTION fn_get_udf_val
	(
	p_func_id			IN		VARCHAR2,
	p_fld_name			IN		VARCHAR2,
	p_key_val			IN		VARCHAR2,
	p_scope				IN		VARCHAR2 := NULL,
	p_refer_work_table	IN		VARCHAR2						
	)
	RETURN VARCHAR2;

FUNCTION fn_populate_udf_on_auth
		(	
		pCallfuncid		IN	varchar2,
		p_lrk			IN	varchar2
		)
RETURN BOOLEAN;

-- 29-JULY-2003 FCC 4.3 AUG 2003 DEVELOPMENT REQUIREMENTS START
-- OVERLOADED THE FUNCTION fn_populate_udf_on_auth FOR VERSION CHANGES OF CUSTOMER/CUSTOMER ACCOUNTS/CUSTOMER ADDRESSES
FUNCTION fn_populate_udf_on_auth
		(	
		pCallfuncid		IN	varchar2,
		p_lrk			IN	varchar2,
		p_version		IN	number
		)
RETURN BOOLEAN;
-- 29-JULY-2003 FCC 4.3 AUG 2003 DEVELOPMENT REQUIREMENTS END

--
-- CITI4.0 ITR1 changes end
--


-- PRAGMA RESTRICT_REFERENCES(fn_get_udf_val,WNDS,WNPS);

function fn_find_fields(p_fld_name varchar2) return integer;

procedure pr_store_udf(p_func_id varchar2,
                       p_fld_name varchar2,
                       p_key_val varchar2,
                       p_scope   varchar2,
                       p_char_fld varchar2);

procedure pr_store_udf(p_func_id varchar2,
                       p_fld_name varchar2,
                       p_key_val varchar2,
                       p_scope   varchar2,
                       p_num_fld number);
                       

procedure pr_store_udf(p_func_id varchar2,
                       p_fld_name varchar2,
                       p_key_val varchar2,
                       p_scope   varchar2,
                       p_date_fld date);
                       
--
-- CITI4.0 ITR1 changes start: Parallel maintenance changes start
--
PROCEDURE pr_store_udf
	(
	p_func_id			IN		VARCHAR2,
	p_fld_name 			IN		VARCHAR2,
	p_key_val			IN		VARCHAR2,
	p_scope				IN		VARCHAR2,
	p_char_fld			IN		VARCHAR2,
	p_parallel_maint	IN		VARCHAR2
	);

PROCEDURE pr_store_udf
	(
	p_func_id			IN		VARCHAR2,
	p_fld_name			IN		VARCHAR2,
	p_key_val			IN		VARCHAR2,
	p_scope 			IN		VARCHAR2,
	p_num_fld			IN		NUMBER,
	p_parallel_maint	IN		VARCHAR2
	);
                       
PROCEDURE pr_store_udf
	(
	p_func_id			IN		VARCHAR2,
	p_fld_name			IN		VARCHAR2,
	p_key_val			IN		VARCHAR2,
	p_scope				IN		VARCHAR2,
	p_date_fld			IN		DATE,
	p_parallel_maint	IN		VARCHAR2
	);
--                       
-- CITI4.0 ITR1 changes end
--

procedure pr_log_ovd(o varchar2);

procedure pr_log_err(e varchar2);

procedure pr_store_changed_values(p_func_id varchar2);

procedure pr_fetch_vals(p_table_rows out ty_client_tab,
                        p_field_tab  out ty_fld_tab,
                        p_char_tab   out ty_char_tab,
                        p_num_tab    out ty_num_tab,
                        p_date_tab   out ty_date_tab,
                        p_rec_key    out varchar2);
                        

function fn_save_validations(p_brn varchar2,
                             p_lang    varchar2,
                             p_func_id varchar2,
                             p_rec_key varchar2,
                             p_ovd_tab in out ty_char_tab,
                             p_err_tab in out ty_char_tab)
return integer;

--FCC 4.4 DEC 2003 PYPROD TIL#86 STARTS
PROCEDURE pr_delete_udf(p_func_id 	varchar2,
                        p_rec_key 	varchar2
			     );
PROCEDURE pr_get_rec_key(p_func_id		IN		Varchar2,
				 p_rec_key_tab	IN OUT 	ty_char_tab);
--FCC 4.4 DEC 2003 PYPROD TIL#86 ENDS


end olpks_userdef_flds;
/
create or replace synonym olpkss_userdef_flds for olpks_userdef_flds
/