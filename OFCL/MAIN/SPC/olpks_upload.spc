CREATE OR REPLACE PACKAGE  olpks_upload
/*----------------------------------------------------------------------------------------------------
**
** File Name    : olpks_upload.SPC
**
** Module       : SETTLEMENT INSTRUCTIONS
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
/*  CHANGE HISTORY

02-JUL-03  FCC 4.3 AUG 2003  CEEMEA Changes for TIDE  added one more overloaded function fn_upload_settlements for usiing the PL-SQL tables
08-MAY-06  FLEXCUBE V.CL Release 7.0 LOT2 ITR1 SFR#40
           Variable gsourcecode added.

*/
AS

TYPE tbl_settle_type IS TABLE OF oltbs_upload_settlements%ROWTYPE INDEX BY BINARY_INTEGER;--02-JUL-03  FCC 4.3 AUG 2003  CEEMEA Changes for TIDE
gsourcecode oltbs_upload_master.source_code%type;--FLEXCUBE V.CL Release 7.0 LOT2 ITR1 SFR#40

FUNCTION fn_check_val_ac
	(l_rec_contractis	IN OLTB_SETTLEMENTS%ROWTYPE,
	 each_settlement  IN oltbs_upload_settlements%ROWTYPE
	)
RETURN NUMBER	;

FUNCTION validate_sndr_to_rcvr_info
				    (SR1 IN VARCHAR2,
				     SR2 IN VARCHAR2,
				     SR3 IN VARCHAR2,
				     SR4 IN VARCHAR2,
				     SR5 IN VARCHAR2,
				     SR6 IN VARCHAR2)
RETURN BOOLEAN;



FUNCTION fn_upload_settlements
	(
	p_module			IN		smtb_modules.module_id%TYPE,
	p_branch_code		IN		oltbs_upload_settlements.branch_code%TYPE,
	p_source_code		IN		oltbs_upload_settlements.source_code%TYPE,
	p_source_ref		IN		oltbs_upload_settlements.source_ref%TYPE,
	p_contract_ref_no		IN		lftbs_contract_charges.contract_reference_no%TYPE,
	p_apply_settlements	IN	   	CHAR,
	p_error_code		IN OUT 	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2,
	P_reference_no		IN		oltbs_upload_settlements.reference_no%type := NULL) --9-May-2002 Fcc4.0 June-2002 changes for Duplicate recognition of FT contracts

RETURN boolean;
FUNCTION fn_check_if_null (    PAR1 IN VARCHAR2,
				     PAR2 IN VARCHAR2,
				     PAR3 IN VARCHAR2,
				     PAR4 IN VARCHAR2,
				     PAR5 IN VARCHAR2)
RETURN BOOLEAN ;

FUNCTION valid (code IN VARCHAR2)

RETURN BOOLEAN ;
--02-JUL-03  FCC 4.3 AUG 2003  CEEMEA Changes for TIDE STARTS
FUNCTION fn_upload_settlements
	(
	p_module			IN		smtb_modules.module_id%TYPE,
	p_apply_settlements	IN	   	CHAR,
	p_contract_ref_no	IN		lftbs_contract_charges.contract_reference_no%TYPE,
	tb_settle			IN		TBL_SETTLE_TYPE,
	p_error_code		IN OUT 	VARCHAR2,
	p_error_parameter	IN OUT	VARCHAR2,
	P_reference_no		IN		oltbs_upload_settlements.reference_no%type := NULL
	)
RETURN boolean ;
--02-JUL-03  FCC 4.3 AUG 2003  CEEMEA Changes for TIDE ENDS

END olpks_upload ;
/
CREATE or replace SYNONYM olpkss_upload  FOR olpks_upload
/