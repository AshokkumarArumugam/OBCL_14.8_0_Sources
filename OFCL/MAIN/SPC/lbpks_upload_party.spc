CREATE OR REPLACE PACKAGE lbpks_upload_party AS
/*-----------------------------------------------------------------------------------
**
** File Name	: lbpks_upload_party.SPC
** Module	: LOAN SYNDICATION
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
-------------------------------------------------------------------------------------
*/


/*------------------------------------------CHANGE HISTORY----------------------------------
DATE		VERSION NO	CODE		DESCRIPTION
------------------------------------------END CHANGE HISTORY----------------------------------
*/

gErrList		VARCHAR2(10000);
gErrParamList	VARCHAR2(10000);
gOvList		VARCHAR2(10000);
gOvParamList	VARCHAR2(10000);
--gExtRefNo		oltbs_upload_master.ext_contract_ref_no%TYPE;
--gSourceCode		oltbs_upload_master.source_code%TYPE;
gOvdSeqNo		NUMBER := 0;
gErrSeqNo		NUMBER := 0;
gModule			oltbs_contract.module_code%TYPE;
gCparty			oltbs_contract.counterparty%TYPE;
FUNCTION fn_upload_parties(
 pModule   IN  oltbs_contract.module_code%TYPE,
 p_drawdown_Number           IN  lbvws_party_contracts.drawdown_number%TYPE,
 p_syndication_ref_no    IN  lbvws_party_contracts.syndication_ref_no%TYPE,
 p_borrower_ref_no  IN  lbvws_party_contracts.borrower_ref_no%TYPE,
 p_error_code  IN OUT VARCHAR2,
 p_error_parameter  IN OUT VARCHAR2
 )
RETURN BOOLEAN;
FUNCTION fn_upload_contract
	(
	p_upload_contract_record	IN 	lbvws_party_contracts%ROWTYPE,
	p_error_code			IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	)
RETURN BOOLEAN ;
FUNCTION fn_linkages_upload
		(
		p_upload_contract_record 	IN		lbvws_party_contracts%ROWTYPE,
		p_linked_to_ref_no     		OUT		oltbs_contract_linkages.linked_to_ref%TYPE,
		p_rec_linkage			OUT		oltbs_contract_linkages%ROWTYPE,
		p_error_code			IN OUT	VARCHAR2,
		p_error_parameter			IN OUT	VARCHAR2
		)
RETURN BOOLEAN;
FUNCTION fn_populate_contract_tables
		(
		p_upload_contract_record IN lbvws_party_contracts%ROWTYPE,
		pContStat			IN		VARCHAR2,
		p_lcy_eqvt			IN 		NUMBER,
		p_linked_to_ref_no	IN		oltbs_contract_linkages.linked_to_ref%TYPE,
		p_main_comp			IN		oltbs_contract_master.main_comp%TYPE,
		p_rec_linkage		IN		oltbs_contract_linkages%ROWTYPE,
		p_error_code		IN OUT	VARCHAR2,
		p_error_parameter		IN OUT 	VARCHAR2
		)
RETURN BOOLEAN;
FUNCTION fn_upload_participant_interest
	(
	p_syndication_ref_no	IN	oltbs_party_component_details.syndication_ref_no%TYPE,
	p_borrower_leg_ref_no	IN	oltbs_party_component_details.borrower_leg_ref_no%TYPE,
	p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
	p_participant_product	IN	oltbs_contract.product_code%TYPE,
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter	IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
FUNCTION fn_explode_schedules
		(
		pCubeRefNo		IN		lbvws_party_contracts.contract_Ref_no%TYPE,
		pUpMastRec		IN		lbvws_party_contracts%ROWTYPE,
		pMainComp		IN		oltbs_contract_master.main_comp%TYPE,
		p_error_code		IN OUT	VARCHAR2,
		p_error_parameter	IN OUT	VARCHAR2
		)
RETURN BOOLEAN;
PROCEDURE pr_append_errlist
	(
	pErrorCode		IN 	VARCHAR2,
	pErrorParams	IN	VARCHAR2
	);
END lbpks_upload_party;
-----------------------------------------------------------------------
/