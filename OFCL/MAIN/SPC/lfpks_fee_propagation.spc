CREATE OR REPLACE PACKAGE lfpks_fee_propagation
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name    : lfpks_fee_propagation.SPC
**
** Module       : CF
This source is part of the Oracle Banking Corporate Lending  Software Product.   
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
/* Change History - Start
04-Jan-2005 Rajiv Kumar Phase2 -- Package created to do Fee Calculation
23-MAY-06 FLEXCUBE V.CL RELEASE 7.0 LOT2 ITR2 SFR#28 FIXES.
Change History - End*/

FUNCTION fn_participant_propagation
	(
	p_contract_ref_no		IN		oltbs_contract.contract_ref_no%Type,
	p_error_code		IN OUT	Varchar2,
	p_error_parameter		IN OUT	Varchar2
	)
	Return Boolean;

FUNCTION fn_propagate_for_a_participant
	(
	p_participant_crn		IN		oltbs_contract.contract_ref_no%Type,
	p_error_code		IN OUT	Varchar2,
	p_error_parameter		IN OUT	Varchar2
	)
	Return Boolean;

FUNCTION fn_participants_liqd
	(
	p_contract_ref_no		IN		oltbs_contract.contract_ref_no%Type,
	p_processing_date		IN		Date,
	p_error_code		IN OUT	Varchar2,
	p_error_parameter		IN OUT	Varchar2
	)
	Return Boolean;

FUNCTION fn_liqd_for_a_participant
	(
	p_participant_crn		IN		oltbs_contract.contract_ref_no%Type,
	p_processing_date		IN		Date,
	p_error_code		IN OUT	Varchar2,
	p_error_parameter		IN OUT	Varchar2
	)
	Return Boolean;

FUNCTION fn_participants_accrual
	(
	p_contract_ref_no		IN		oltbs_contract.contract_ref_no%Type,
	p_processing_date		IN		Date,
	p_fee_collection_mode	IN		lftbs_contract_fee.fee_collection_mode%Type,
	p_error_code		IN OUT	Varchar2,
	p_error_parameter		IN OUT	Varchar2
	)
	Return Boolean;

FUNCTION fn_accr_for_a_participant
	(
	p_participant_crn		IN		oltbs_contract.contract_ref_no%Type,
	p_processing_date		IN		Date,
	p_fee_collection_mode	IN		lftbs_contract_fee.fee_collection_mode%Type,
	p_error_code		IN OUT	Varchar2,
	p_error_parameter		IN OUT	Varchar2
	)
	Return Boolean;

--Added on 07-May-2005 for FCC 6.2.2.2 for FS TAG 21
FUNCTION Fn_Get_Component_Ratio
(
	p_contract_ref_no 	IN		VARCHAR2
,	p_customer_no		IN		VARCHAR2
,	p_component			IN		VARCHAR2
,	p_value_date		IN		DATE
,	p_component_ratio		IN OUT	NUMBER
,	p_error_code		IN OUT	VARCHAR2
,	p_error_parameter		IN OUT	VARCHAR2	
) RETURN BOOLEAN;
--Addition for FS TAG 21 ends

--FLEXCUBE V.CL RELEASE 7.0 LOT2 ITR2 SFR#28 Changes from here	
FUNCTION fn_propogate_tax
	(
	p_contract_ref_no		IN	  oltbs_contract.contract_ref_no%TYPE,
	p_processing_date		IN	DATE,	
	p_error_code			IN OUT	   VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	)
	RETURN BOOLEAN;
--FLEXCUBE V.CL RELEASE 7.0 LOT2 ITR2 SFR#28 Changes from here	
END lfpks_fee_propagation;
/
Create or replace Synonym lfpkss_fee_propagation for lfpks_fee_propagation
/