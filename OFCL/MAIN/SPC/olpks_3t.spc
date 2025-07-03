CREATE OR REPLACE PACKAGE olpks_3t
AS
/* **-----------------------------------------------------------------------------------------
**
** File Name   : olpks_3t.SPC
**
**Module       : MIS
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
**-------------------------------------------------------------------------------------
06-Jun-2016 OFCL standalone changes, commented not required code. Search string--- OFCL12.2 Not required
*/


FUNCTION	fn_read_mis_data_string
(
	p_mis_column_list	IN	varchar2
,	p_mis_data_string	IN	varchar2
,	p_mis_rec		OUT	oltbs_class_mapping%rowtype
,	p_err_code		OUT	varchar2
)
RETURN BOOLEAN;

FUNCTION	fn_ins_mitb_class_mapping
(	p_mitb_class_mapping_rec	IN		oltbs_class_mapping%rowtype
,	p_err_code				IN OUT	varchar2
,	p_err_param				IN OUT	varchar2
)
RETURN BOOLEAN;

FUNCTION	fn_update_mitb_class_mapping
(	p_mitb_class_mapping_rec	IN	oltbs_class_mapping%rowtype
,	p_err_code			IN OUT	varchar2
,	p_err_param			IN OUT	varchar2
)
RETURN BOOLEAN;

FUNCTION 	fn_delete_mis
(
	p_reference_no			IN	OLTB_CLASS_MAPPING.UNIT_REF_NO%type,
	p_err_code			OUT	varchar2
)
RETURN BOOLEAN;

FUNCTION 	fn_derive_mis_from
(	p_target_ref_no		IN	oltbs_class_mapping.unit_ref_no%type
,	p_target_ref_branch	IN	oltbs_class_mapping.branch_code%type
,	p_target_ref_ccy	IN	oltbs_class_mapping.ccy%type
,	p_target_unit_type	IN	oltbs_class_mapping.unit_type%type
,	p_source_ref_1		IN	oltbs_class_mapping.unit_ref_no%type
,	p_source_ref_2		IN	oltbs_class_mapping.unit_ref_no%type
,	p_derived_mis_rec	IN OUT	oltbs_class_mapping%rowtype
,	p_err_code		IN OUT	VARCHAR2
,	p_err_param		IN OUT	VARCHAR2
)
RETURN	BOOLEAN;

FUNCTION	fn_copy_class_mapping
(	p_target_ref_no		IN	oltbs_class_mapping.unit_ref_no%type
,	p_source_ref_no		IN	oltbs_class_mapping.unit_ref_no%type
,	p_mitb_class_mapping_rec	IN OUT	oltbs_class_mapping%rowtype
,	p_err_code			IN OUT	VARCHAR2
,	p_err_param			IN OUT	VARCHAR2
)
RETURN BOOLEAN;


PROCEDURE pr_mis_pickup
		(
		p_branch				IN		oltms_branch.branch_code%TYPE,
		p_user				IN		smtbs_user.user_id%TYPE,
		p_ref_no				IN		oltbs_class_mapping.unit_ref_no%TYPE,
		/*p_cust_no				IN		sttms_cust_account.cust_no%TYPE,
		p_ccy					IN		sttms_cust_account.ccy%TYPE,*/-- OFCL12.2 Not required
		p_cust_no				IN		oltb_account.cust_no%TYPE,
		p_ccy					IN		oltb_account.AC_GL_CCY%TYPE,
		p_error				IN OUT	VARCHAR2
		);


END olpks_3t;
/
Create or replace synonym olpkss_3t for olpks_3t
/