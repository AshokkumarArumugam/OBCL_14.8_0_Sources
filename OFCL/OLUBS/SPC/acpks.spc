CREATE OR REPLACE PACKAGE ACPKS
AS

/*----------------------------------------------------------------------------------------------------
**
** File Name	: acpks.SPC
**
** Module		: OL
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
------------------------------CHANGE HISTORY--------------------------------------------------------

Changed By          : 
Change Description  : 
Search Tag          : 
Change Date         : 
------------------------------------------------------------------------------------------------------
*/



TYPE tbl_AcHoff IS TABLE OF OLTBS_HANDOFF%ROWTYPE INDEX BY BINARY_INTEGER;

FUNCTION fn_acservice(pBranch     IN OLTBS_HANDOFF.ac_branch%TYPE,
                        pBranchDate IN DATE,
                        pLCY        IN OLTBS_HANDOFF.ac_ccy%TYPE,
                        pTranRefNo  IN OLTBS_HANDOFF.trn_ref_no%TYPE,
                        pEventSeqNo IN OLTBS_HANDOFF.event_sr_no%TYPE,
                        pActionCode IN CHAR,
                        pUserId     IN OLTBS_HANDOFF.user_id%TYPE,
                        pErrCode    IN OUT VARCHAR2,
                        pParam      IN OUT VARCHAR2)
return BOOLEAN;
						
FUNCTION fn_achandoff(pTrnRefNo   IN OLTBS_HANDOFF.TRN_REF_NO%TYPE,
                        pEventSeqNo IN OLTBS_HANDOFF.EVENT_SR_NO%TYPE,
                        pBranchDate IN DATE,
                        pHandoff    IN OUT ACPKS.TBL_ACHOFF,
                        pActionCode IN CHAR,
                        pSuspense   IN CHAR,
                        pBalancing  IN CHAR,
                        pUserId     IN CHAR,
                        pErrCode    IN OUT VARCHAR2,
                        pParam      IN OUT VARCHAR2) 
return BOOLEAN;
						 
								 
END;
/
CREATE OR REPLACE SYNONYM ACPKSS FOR ACPKS
/