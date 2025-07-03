CREATE OR REPLACE PACKAGE olpks_escrow
AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_escrow.SPC
  **
  ** Module     : LD
  **
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
  -------------------------------------------------------------------------------------------------------
  CHANGE HISTORY
  
  18-MAY-2012 Flexcube V.CL Release 7.11,FS Volume-01 Tag06 Changes : New package for escrow account functionality
  -------------------------------------------------------------------------------------------------------
  */

TYPE ent_values_tab IS TABLE OF VARCHAR2(32767)
INDEX BY BINARY_INTEGER;

TYPE 	typ_contract_esc 
IS	TABLE OF	oltbs_contract_escrow_linkages%ROWTYPE
INDEX 	BY		BINARY_INTEGER;

TYPE 	typ_v2_contract_esc 
IS	TABLE OF	oltbs_contract_escrow_linkages%ROWTYPE
INDEX 	BY		oltbs_contract_escrow_linkages.AC_GL_NO%TYPE;

TYPE typ_tab_ac_gl IS TABLE OF oltbs_contract_escrow_linkages.AC_GL_NO%TYPE
INDEX BY BINARY_INTEGER;

FUNCTION  Fn_process_accbal_upload
		(
			p_brn			IN		VARCHAR2
		,	p_external_system	IN		VARCHAR2
		,	p_interface_code	IN		VARCHAR2			
		,	p_errcode		IN OUT		VARCHAR2
		,	p_errparam		IN OUT		VARCHAR2
		)
RETURN BOOLEAN;

FUNCTION  Fn_update_escrow_balance 
		(
			p_brn			IN		oltms_branch.branch_code%TYPE
		,	p_errcode		IN OUT		VARCHAR2
		,	p_errparam		IN OUT		VARCHAR2
		)
RETURN BOOLEAN;

FUNCTION  Fn_get_escrow_balance 
		(
			p_contract_ref_no	IN		oltbs_contract.contract_ref_no%TYPE
		,	p_tbl_contract_esc	OUT		typ_v2_contract_esc
		,	p_errcode		IN OUT		VARCHAR2
		,	p_errparam		IN OUT		VARCHAR2
		)
RETURN BOOLEAN;

FUNCTION fn_validate_esc_udf
		(
			p_ac_gl_no	IN	VARCHAR2
		,	p_ac_or_gl      IN	VARCHAR2
		,	p_branch        IN	VARCHAR2
		,	p_udf_value     IN	VARCHAR2
		)
RETURN NUMBER;

FUNCTION fn_validate_escrow_balance
		(
			p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE
		)
RETURN BOOLEAN;

END olpks_escrow;
/
CREATE OR REPLACE SYNONYM olpkss_escrow FOR olpks_escrow
/