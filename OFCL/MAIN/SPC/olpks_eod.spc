CREATE OR REPLACE PACKAGE olpks_eod 
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_eod.SPC
**
** Module		: MESSAGES
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
CHANGE HISTORY

13-MAR-2003		 		-- FCC 4.5 LOT1 ITR2 SFR 34.. Added date parameter..and Code aligned
19-OCT-2007 FCC V.CL 7.3 UK CONSOLIDATION RETRO changed Copyright

  **Changed By         : Vineeth T M
  **Date               : 23-JUN-2021
  **Change Description : Archival of tables used for external system calls 
  **Search String      : OBCL_14.5_EXT_SYS_PURGE changes
  
  **Changed By         : Vineeth T M
  **Date               : 18-OCT-2023
  **Change Description : Archival of tables used for OBCLPM replication
  **Search String      : Bug#35899419 changes

*/
--Bug#35899419 changes start
TYPE TY_REPL_REQ_MASTER IS TABLE OF OLTBS_REPL_REQ_MASTER%ROWTYPE;
Type ty_msgid IS TABLE OF OLTMS_MO_PRODUCT_REPL_ARC.MSGID%type INDEX BY BINARY_INTEGER;
--Bug#35899419 changes end
FUNCTION	getUnsentMessages
	(
	pBranch		IN			VARCHAR2,
	pDcnList		IN OUT		VARCHAR2, 
	pErrMsg		IN OUT		VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION	getHeldMessages
	(
	pBranch		IN			VARCHAR2, 
	pDcnList		IN OUT		VARCHAR2,
	pErrMsg		IN OUT		VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION archiveMessages
	(
	pBranch		IN			VARCHAR2,
	p_process_date	IN			VARCHAR2, 		-- FCC 4.5 LOT1 ITR2 SFR 34
	pErrMsg		IN OUT		VARCHAR2
	)
RETURN BOOLEAN;
--30-AUG-2007 FCC-7.3-RETRO-CITIUK-4.4-RETRO#290 Start Here
FUNCTION archiveTLMmessages
	(
	pBranch		IN		VARCHAR2,
	p_process_date	IN		VARCHAR2, 		-- FCC 4.5 LOT1 ITR2 SFR
	pErrMsg		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
--30-AUG-2007 FCC-7.3-RETRO-CITIUK-4.4-RETRO#290 End Here

FUNCTION	myToDate
	(
	pYYDDD		IN			VARCHAR2
	)
RETURN DATE;

FUNCTION Fn_Mvhist_Bulk(Pbranch  IN oltms_Branch.Branch_Code%TYPE,
                          Perrcode OUT Ertbs_Msgs.Err_Code%TYPE)
    RETURN BOOLEAN;
 --OBCL_14.5_EXT_SYS_PURGE changes start
Function fn_archive_external(Pbranch  IN oltms_Branch.Branch_Code%TYPE) 
        return boolean;
--OBCL_14.5_EXT_SYS_PURGE changes end

PRAGMA RESTRICT_REFERENCES(myToDate, WNDS, WNPS);

END olpks_eod;
/
CREATE or replace SYNONYM olpkss_eod FOR olpks_eod
/