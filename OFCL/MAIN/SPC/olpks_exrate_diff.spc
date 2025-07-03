CREATE OR REPLACE PACKAGE olpks_exrate_diff
AS

/*----------------------------------------------------------------------------------------------------
**
** File Name    : olpks_exrate_diff.SPC
**
** Module       : ACCOUNTING
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

FUNCTION ACFN_EXRATE_DIFF (p_brn			IN		VARCHAR2
				, p_errcodes	IN OUT	VARCHAR2
				, p_errparams	IN OUT	VARCHAR2)
RETURN BOOLEAN;

--fcc4.0 june2002 added
FUNCTION  FN_OPS_ENTRY(p_brn		IN		VARCHAR2
			, p_errcodes	IN OUT	VARCHAR2
			, p_errparams	IN OUT	VARCHAR2)
RETURN BOOLEAN;

TYPE rec_ops_onl IS RECORD (
			module				smtbs_modules.module_id%TYPE,
			trn_ref_no			oltbs_daily_log_ac.trn_ref_no%TYPE,
			trn_code			oltbs_daily_log_ac.trn_code%TYPE,
		   	drcr_ind			oltbs_daily_log_ac.drcr_ind%TYPE,
		 	ac_no				oltbs_daily_log_ac.ac_no%TYPE,	
		 	ac_branch			oltbs_daily_log_ac.ac_branch%TYPE,	
		 	ccy				oltbs_daily_log_ac.ac_ccy%TYPE,
		 	fcy_amount			oltbs_daily_log_ac.fcy_amount%TYPE,
		  	lcy_amount			oltbs_daily_log_ac.lcy_amount%TYPE,		 			 	
		  	value_Dt			oltbs_daily_log_ac.value_dt%TYPE,
			pnl_account		 	oltbs_acc_reval.pnl_account%TYPE,			
			--FCC 4,3 AUG 2003 CHANGES
			online_cif			oltbs_daily_log_ac.related_customer%TYPE,
			mis_unit_Ref_no			oltbs_class_mapping.online_mis_ref_no%TYPE,
			mis_unit_type			oltbs_class_mapping.online_mis_unit_type%TYPE,
			onl_mis_unit_ref_no		oltbs_class_mapping.online_mis_ref_no%TYPE,
			onl_mis_unit_type		oltbs_class_mapping.online_mis_unit_type%TYPE			
			--FCC 4,3 AUG 2003 CHANGES
			);			
			
TYPE tbl_onlhoff IS TABLE OF rec_ops_onl INDEX BY BINARY_INTEGER;

FUNCTION FN_OPS_ENTRY_ONL(			
			p_hoff_to_ops   IN      olpks_exrate_diff.tbl_onlhoff, -- contain the reval legs info
			p_hofftbl	IN OUT  olpkss_accounting.tbl_achoff,
			p_err_code	IN OUT	VARCHAR2,
			p_err_param	IN OUT	VARCHAR2 
			)
RETURN BOOLEAN;	
Function fn_get_mis_ref_no(	p_branch		IN		VARCHAR2
				,p_ccy_code		IN		VARCHAR2
				,p_cif			IN		VARCHAR2
				,p_unit_ref		IN		VARCHAR2
				,p_unit_type		IN		VARCHAR2
				,p_mis_group		IN		VARCHAR2
				,p_mis_unit_ref		OUT		VARCHAR2
				,p_errcodes		IN OUT		VARCHAR2
				,p_errprams		IN OUT		VARCHAR2
			)
Return boolean;
						  
end olpks_exrate_diff;
/