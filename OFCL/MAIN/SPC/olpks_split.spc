CREATE OR REPLACE PACKAGE olpks_split AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_split.SPC
**
** Module		: CORE
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

FUNCTION fn_create_split_master
		
			(
			pContractRefNo	IN		oltbs_contract.contract_ref_no%Type,
			pEventSeqNo		IN		oltbs_contract.latest_event_seq_no%Type,
			pEventCode		IN		oltbs_contract.curr_event_code%Type,
			pTagList		IN		Varchar2,
			pCcyList		IN		Varchar2,
			pAmtList		IN		Varchar2,
			pErrCode		IN OUT	Varchar2,
			pParam		IN OUT	Varchar2	
			)
Return Boolean;

FUNCTION fn_validate_split
		(
		pContractRefNo	IN		oltbs_contract.contract_ref_no%Type,
		pEventSeqNo		IN		oltbs_contract.latest_event_seq_no%Type,
		pErrCode		IN OUT	Varchar2,
		pParam		IN OUT	Varchar2
		)
Return Boolean ;

FUNCTION  fn_create_split_tags
	(
	pContractRefNo	IN			oltbs_contract.contract_ref_no%Type,
	pEsn			IN		oltbs_contract.latest_event_seq_no%Type,
	pErrorCode		IN	OUT	Varchar2,
	pErrorParams	IN	OUT	Varchar2
	)
	Return Boolean;

PROCEDURE pr_delete_split
		(
		pRefNo	IN	oltbs_contract.contract_ref_no%Type,
		pEsn		IN	oltbs_contract.latest_event_seq_no%Type
		);

FUNCTION fn_split_handoff
	(
	pModule			IN		oltbs_contract.module_code%TYPE,
	pContractRefNo		IN		oltbs_contract.contract_ref_no%TYPE,
	pEventSeqNo			IN		oltbs_contract.latest_event_seq_no%TYPE,
	pAcHandoff			IN OUT 	olpkss_accounting.tbl_achoff,
	pErrCode			IN OUT	varchar2,	
	pParam			IN OUT	varchar2
	)
	RETURN boolean;

END olpks_split;
/
CREATE or replace SYNONYM olpkss_split FOR olpks_split
/