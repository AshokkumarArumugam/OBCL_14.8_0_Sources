CREATE OR REPLACE PACKAGE olpks_liq AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_liq.SPC
**
** Module	: LOANS and DEPOSITS
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
change history

27/01/2002	FCC 3.9 LATAM TAX ON PRINCIPAL LIQUIDATION. Now tax is computed on principal during liquidation.
				  Tax is computed not only on Principal liquidation but the interest earned till payment value date.
				  And this tax on principal multiplied by the minimum of (no of days from contract value date,1).
--10-MAR-2006 	FLEXCUBE V.CL Release 7.1  Changes By Bincy 				  
			Added one Function Fn_get_tax_in_compccy_new For calculating tax for each rule	  
06-NOV-2008 CITIUS-LS#SRT1451 CITIUS-LS#1287,STP Consolidation,By Swapnasish,Tax Refund Changes.
				 System cant able to find record from oltbs_contract when actual contract is in pl/sql table.

change history
*/


FUNCTION	fn_compute_tax
			(
			pContractRefNo				IN		oltbs_contract.contract_ref_no%type,
			pEventCode					IN		oltbs_contract_event_log.Event_code%type,
			pEventSeqNo					IN		oltbs_contract.latest_event_seq_no%type,
			pCompLiquidatedList		IN		Varchar2,
			pLiquidatedAmountList	IN		Varchar2,
			pCompCcyList				IN		Varchar2,
			pValDtOfLiqList			IN		Varchar2,
			pTotalTax					OUT	Varchar2,
			pErrorCode					OUT	Varchar2
			)
Return Boolean; 

Function fn_get_tax_in_compccy
			(
			pContractRefNo			IN			Varchar2,
			pEventCode				IN			Varchar2,
			pEventSeqNo				IN			Number,
			pValueDate				IN			Date,
			pCompLiquidated		IN			Varchar2,
			pLiquidatedAmount		IN			Number,
			pBasisAmount			IN			Number,
			pCompCcy					IN			Varchar2,
			pTaxInCompCcy			OUT		Number,
			pErrorCode				IN	OUT	Varchar2
			) 
Return Boolean; 

-- 27/01/2002  FCC3.9 LATAM Changes starts
FUNCTION fn_principal_amount (p_ref_no	IN		VARCHAR2
				, p_pmt_dt		IN		DATE
				, p_pmt_amt		IN		NUMBER
				, p_pmt_amt_final	OUT 		NUMBER
				, p_errcodes	IN OUT	VARCHAR2
				, p_errparams	IN OUT	VARCHAR2)
RETURN BOOLEAN;
-- 27/01/2002  FCC3.9 LATAM Changes ends

--10-MAR-2006 FLEXCUBE V.CL Release 7.1  Added By Bincy Starts
FUNCTION Fn_get_tax_in_compccy_new
		(
		pContractRefNo			IN			Varchar2,
		pEventCode			IN			Varchar2,
		pEventSeqNo			IN			Number,
		pValueDate			IN			Date,
		pCompLiquidated			IN			Varchar2,
		pLiquidatedAmount		IN			Number,
		pBasisAmount			IN			Number,
		pCompCcy			IN			Varchar2,
		pTaxRule			IN			Varchar2,
		pTaxInCompCcy			OUT			Number,
		pErrorCode			IN	OUT		Varchar2,
                --06-NOV-2008 CITIUS-LS#SRT1451 CITIUS-LS#1287 Start By Swapnasish
                pCustomerno			IN	varchar2 DEFAULT '!@#',--CITIUS-LS#1287
		pmodule				IN	varchar2 DEFAULT '!@'  --CITIUS-LS#1287
                --06-NOV-2008 CITIUS-LS#SRT1451 CITIUS-LS#1287 End By Swapnasish
		) 
RETURN Boolean;
--10-MAR-2006 FLEXCUBE V.CL Release 7.1  Added By Bincy Ends

End olpks_liq;
/
Create or replace Synonym olpkss_liq for olpks_liq
/