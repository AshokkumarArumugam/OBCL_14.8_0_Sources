CREATE OR REPLACE PACKAGE olvds_services IS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvds_services.SPC
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
change History

Ver	Date		Site			Desc
1.3	31-jan-2000	fc33stp		Changed fn_redefine_maturity_sch to be in synch with sql
7.3	21-JUN-2007 FLEXCUBE V.CL Release 7.3 Negative DD VAMI Related Changes By Amarnath
18-April-2008 FLEXCUBE V.CL Release 7.4 BAU Commitment Amendment LOT2, SFR#12,System is rescheduling the liquidated schedule in the commitment after extending the maturity date. System should only reschedule the unliquidated schedule till the extended maturity dat
11-AUG-2008	FLEXCUBE V.CL Release 7.4 - STP LD VAMI CHANGES ; Search String "STP LD VAMI CHANGES" 
09-SEP-2008	FLEXCUBE V.CL Release 7.4 - STP LD VAMI CHANGES -- For projection for vami - Search String "FLEXCUBE V.CL Release 7.4- AGENCY CONTRACT -09-SEP-2008"
24-SEP-2008 FLEXCUBE V.CL Release 7.4 Retro Changes CITIUS-LS-CITIUSLD46200209
		User first performed a full interest payment, and then performed a value-dated amendment to 
		increase the maturity date; system did-not split the paid schedules, which should not be a case.
07-OCT-2008 FLEXCUBE V.CL Release 7.4 RT STP SFR#347 , moved the code to lsvds for the retro till no CITIUSLD46200209
04-JUN-2009 FLEXCUBE V.CL Release 7.5 lot2 ITR1 SFR#42 Changes, Calc was going wrong when doing matrity date increase on the maturity date of a loan contract
		Added two default parameters for function fn_redefine_schedule

	**Changed By         : Priyadarshini K
    **Changed On         : 21-Jun-2018
    **Change Description : Added a function fn_reverse_VAMI for handling reversal of VAMI when redefinition is done.                           
    **Search String      : OBCL_14.2_VAMI_Sch changes		
*/



	TYPE amt_paid_rec IS
	RECORD( p_component	oltbs_amount_due_cs.component%TYPE,
			p_amt_paid	oltbs_amount_due_cs.amount_settled%TYPE);

	TYPE ty_amt_paid IS TABLE OF amt_paid_rec
	INDEX BY BINARY_INTEGER;
	amount_check char(1);--FLEXCUBE V.CL Release 7.4 BAU Commitment Amendment LOT2, SFR#12 changes 	
	--07-OCT-2008 FLEXCUBE V.CL Release 7.4 RT STP SFR#347 Comments Starts
	/*
	--24-SEP-2008 FLEXCUBE V.CL Release 7.4 Retro Changes CITIUS-LS-CITIUSLD46200209 START
	g_fully_paid VARCHAR2(1):= 'N';
	--24-SEP-2008 FLEXCUBE V.CL Release 7.4 Retro Changes CITIUS-LS-CITIUSLD46200209 END
	*/
	--07-OCT-2008 FLEXCUBE V.CL Release 7.4 RT STP SFR#347 Comments Ends
FUNCTION fn_redefine_maturity_sch
			(
			p_reference_no 		IN 	oltbs_contract.contract_ref_no%type,
			p_Vamb_Esn			IN    oltbs_contract_event_log.event_seq_no%TYPE, -- STP LD VAMI CHANGES added
			p_version_no 		IN 	oltbs_contract_master.version_no%type,
			p_contract_type 		IN 	VARCHAR2,
			p_value_Date		IN 	DATE, 
			p_effective_date 		IN 	Date,
			p_effective_amount	IN 	Number,
			p_ty_amt_paid 		IN OUT ty_amt_paid,
			p_error_code 		IN OUT VARCHAR2
			) 
RETURN BOOLEAN;

	FUNCTION fn_redefine_schedule(p_action IN VARCHAR2,
				p_rowid				IN ROWID,
				p_effective_date	IN DATE,
				p_sch_count			IN NUMBER, 
				p_amount			IN NUMBER
				,p_flag		IN VARCHAR2 DEFAULT 'N'--04-JUN-2009 FLEXCUBE V.CL Release 7.5 lot2 ITR1 SFR#42 Changes
				,p_date		IN DATE DEFAULT NULL--04-JUN-2009 FLEXCUBE V.CL Release 7.5 lot2 ITR1 SFR#42 Changes
) 
	RETURN BOOLEAN;
--21-JUN-2007 FLEXCUBE V.CL Release 7.3 Negative DD VAMI Related Changes By Amarnath- starts
FUNCTION fn_min_recaldt(p_reference oltbs_contract.contract_ref_no%TYPE,
                        p_mindate OUT oltbs_amount_due_cs.due_date%TYPE
                       )
RETURN BOOLEAN;
--21-JUN-2007 FLEXCUBE V.CL Release 7.3 Negative DD VAMI Related Changes By Amarnath -Ends

-- FLEXCUBE V.CL Release 7.4- AGENCY CONTRACT -09-SEP-2008 starts
FUNCTION fn_Project_Vami
		(
			p_contract_ref_no		IN	oltbs_contract.contract_ref_no%TYPE,
			p_Vamb_Esn			IN	oltbs_contract_event_log.event_seq_no%TYPE,
			p_version_no		IN	oltbs_contract.latest_version_no%TYPE,
			p_effective_date		IN	DATE,
			p_Effective_Amount	IN	oltbs_amount_due_cs.amount_due%TYPE,
			p_error_code		IN OUT 	VARCHAR2,
			p_error_param		IN OUT	VARCHAR2
		)
RETURN BOOLEAN;
-- FLEXCUBE V.CL Release 7.4- AGENCY CONTRACT -09-SEP-2008 ends

--OBCL_14.2_VAMI_sch changes starts
FUNCTION Fn_Reverse_VAMI(Pcontractrefno IN Oltbs_Contract.Contract_Ref_No%TYPE,
                             Peventseqno    IN Oltbs_Contract_Event_Log.Event_Seq_No%TYPE,
                             PvaluedtofVAMI  IN DATE,
                             Pcontracttype  IN Oltbs_Contract_Preference.Contract_Schedule_Type%TYPE,
                             p_err_code IN OUT VARCHAR2
                             ) RETURN BOOLEAN;
--OBCL_14.2_VAMI_sch changes ends  

END olvds_services;
/
create or replace synonym olvdss_services for olvds_services
/