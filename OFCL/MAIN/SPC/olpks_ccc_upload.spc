CREATE OR REPLACE PACKAGE olpks_ccc_upload
AS
/*
/*----------------------------------------------------------------------------------------------------
**
** File Name    : olpks_ccc_upload.spc
**
** Module : CONVERSION PACKAGE
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------

/*
Change History:
25-JUN-2012:CITIUS#14155: New unit created for CCC specific upload
15-OCT-2012:CITIUS#15098: Source synchronisation
26-FEB-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 RETRO CITIUS#16055 Changes:Added the function fn_upl_contract_disclosure.
*/
FUNCTION fn_upl_rate (
		indir_name varchar2,
		outdir_name varchar2, 
		file_name varchar2)
RETURN BOOLEAN;

FUNCTION fn_upl_property (
				indir_name	VARCHAR2,
				outdir_name	VARCHAR2,
				file_name	VARCHAR2
			)
RETURN BOOLEAN;

FUNCTION fn_upl_Adjustment(
				indir_name varchar2,
				outdir_name varchar2, 
				file_name varchar2)
RETURN BOOLEAN;

FUNCTION fn_upl_penalty_comp(
				indir_name varchar2,
				outdir_name varchar2, 
				file_name varchar2
				)
RETURN BOOLEAN;
FUNCTION fn_upl_penalty_waiver(
				indir_name varchar2,
				outdir_name varchar2, 
				file_name varchar2
				)
RETURN BOOLEAN;

FUNCTION fn_upl_insure_mast (
				indir_name	VARCHAR2,
				outdir_name	VARCHAR2,
				file_name	VARCHAR2
			)
RETURN BOOLEAN;

FUNCTION fn_upl_insure_hist (
				indir_name	VARCHAR2,
				outdir_name	VARCHAR2,
				file_name	VARCHAR2
			)
RETURN BOOLEAN;


FUNCTION fn_upl_notes (
				indir_name	VARCHAR2,
				outdir_name	VARCHAR2,
				file_name	VARCHAR2
			)
RETURN BOOLEAN;

FUNCTION fn_upl_notes_hist (
				indir_name	VARCHAR2,
				outdir_name	VARCHAR2,
				file_name	VARCHAR2
			)
RETURN BOOLEAN;

FUNCTION fn_upl_coverage (
				indir_name	VARCHAR2,
				outdir_name	VARCHAR2,
				file_name	VARCHAR2
			)
RETURN BOOLEAN;

FUNCTION fn_upl_coverage_hist (
				indir_name	VARCHAR2,
				outdir_name	VARCHAR2,
				file_name	VARCHAR2
			)
RETURN BOOLEAN;



FUNCTION fn_upload_tax_master (
				indir_name	VARCHAR2,
				outdir_name	VARCHAR2,
				file_name	VARCHAR2
			)
RETURN BOOLEAN;



FUNCTION fn_upload_tax_history (
				indir_name	VARCHAR2,
				outdir_name	VARCHAR2,
				file_name	VARCHAR2
				)
RETURN BOOLEAN;

FUNCTION fn_upl_poolfund (
				indir_name	VARCHAR2,
				outdir_name	VARCHAR2,
				file_name	VARCHAR2
				)
RETURN BOOLEAN;

FUNCTION fn_upl_escrow_bal (
				indir_name	VARCHAR2,
				outdir_name	VARCHAR2,
				file_name	VARCHAR2
				)
RETURN BOOLEAN;

FUNCTION fn_upl_contract_flrclg (
				indir_name	VARCHAR2,
				outdir_name	VARCHAR2,
				file_name	VARCHAR2
				)			
RETURN BOOLEAN;
FUNCTION fn_upl_penal_comp(upload_status	VARCHAR2)
RETURN BOOLEAN;

FUNCTION fn_upl_penal_waiver(upload_status	VARCHAR2)
RETURN BOOLEAN;
FUNCTION fn_upl_disclosure_code(indir_name varchar2, 
				outdir_name varchar2, 
				file_name varchar2)
RETURN BOOLEAN ;
--26-FEB-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 RETRO CITIUS#16055 Changes Start
FUNCTION fn_upl_contract_disclosure(indir_name VARCHAR2,
				outdir_name VARCHAR2,
				file_name VARCHAR2)
RETURN BOOLEAN ;
--26-FEB-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 RETRO CITIUS#16055 Changes End

pkg_rec_key		VARCHAR2(2000) DEFAULT NULL;
pkg_upload_type		VARCHAR2(35) DEFAULT NULL;
pkg_source_code		cstbs_param.param_val%TYPE; --1st sep sk changes here
pkg_contract_type	VARCHAR2(4) :=   'ORG';

END olpks_ccc_upload;
/