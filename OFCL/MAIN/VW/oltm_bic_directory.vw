CREATE OR REPLACE FORCE VIEW oltm_bic_directory
(
	BIC_CODE,
	BANK_NAME,
	--INTERNAL_ADDRESS,
	CUSTOMER_NO,
	SK_ARRANGEMENT,
	GEN_MT103,
	GEN_MT103P,
	USE_SMALL_FX,
	RECORD_STAT,
	AUTH_STAT,
	ONCE_AUTH,
	CUST_DD_MSG_PREF,
	BANK_DD_MSG_PREF
	--FCC V.CL 7.3 UK CONSOLIDATION RETRO START
	--FCC-7.3-RETRO-CITIUK-4.4-RETRO#136 Changes Starts
	--11/02/2004	FCC4.4	CITIPLC	PLC44100025 Start
	,RTGS_MEMBER
	,RTGS_BIC       
	--11/02/2004	FCC4.4	CITIPLC	PLC44100025 Ends
	--FCC-7.3-RETRO-CITIUK-4.4-RETRO#136 Changes Ends
	--FCC V.CL 7.3 UK CONSOLIDATION RETRO END
)
AS
/* -----------------------------------------------------------------------------------------------
**
 ** File Name    : oltm_bic_directory.VW
 **
 ** This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
 No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
 Oracle Financial Services Software Limited.
 Oracle Park, Off Western Express Highway,
 Goregaon (East), 
 Mumbai - 400 063, India.
 Change History Starts-----------------------------------------------------
 23-JAN-2003 FCC4.2 Retro April 2003 CITIPLC PLC40100045. NVL added for SK_ARRANGEMENT.
 23-JAN-2003 FCC 4.4 DEC 2003 CITIPLC SFR PLC43050050. View defn was changed in production to read from 
         OLTM_BRANCH_BIC_DIRECTORY only. Have taken CITIPLC production version directly.    
 21-JAN-2004 FCC4.5 April 2004 CITIPLC SFR PLC43120002.   As part of 4.3 change to add 2 new columns to OLTM_BRANCH_BIC, the view
                 also needs to be changes
 25-MAY-2004 FCC 4.5 LOT2 ITR2 SFR 3 .. code Commented and the same will be released in PLC site specific folder.
 03-DEC-2004 FCC 4.6.1 JAN 2005 Added RTGBS_MEMBER,ONCE_AUTH columns 
 19-JAN-2005 FCC 4.6.1 JAN 2005 ITR-1 SFR-196 For changing copyright clause / release name
 22-OCT-2007 FCC V.CL 7.3 UK CONSOLIDATION RETRO START
      FCC-7.3-RETRO-CITIUK-4.4-RETRO#136 Changes
      11/02/2004  FCC4.4  CITIPLC  PLC44100025  add all columns added in OLTM_BRANCH_BIC_DIRECTORY in the view	
 22-OCT-2007 FCC V.CL 7.3 UK CONSOLIDATION RETRO END
 
   **Changed By         : Reghuraj Vadakkedath
  **Date               : 19-FEB-2021
  **Change Description : OLTM_BRANCH_BIC changes
  **Search String      : Bug#31825782
------------------------------------CHANGE HISTORY ENDS---------------------------------------------
*/
--
SELECT 
  a.BIC_CODE,
  a.BANK_NAME,
  --a.INTERNAL_ADDRESS,
--  b.CUSTOMER_NO, --BUG#31825782
  a.CUSTOMER_NO,  --BUG#31825782
  --NVL(b.SK_ARRANGEMENT,'N'), -- FCC4.2 Retro April 2003 CITIPLC PLC40100045 changes --BUG#31825782
  NVL(a.SK_ARRANGEMENT,'N'),-- FCC4.2 Retro April 2003 CITIPLC PLC40100045 changes --BUG#31825782
--  b.GEN_MT103,--BUG#31825782
  a.GEN_MT103,--BUG#31825782
 -- b.GEN_MT103P,--BUG#31825782
  a.GEN_MT103P,--BUG#31825782
--  b.USE_SMALL_FX,
  NULL USE_SMALL_FX,--BUG#31825782
  --decode(b.RECORD_STAT,'C','C',decode(a.RECORD_STAT,'C','C','O')),--BUG#31825782
  decode(a.RECORD_STAT,'C','C',decode(a.RECORD_STAT,'C','C','O')),--BUG#31825782
--  decode(b.AUTH_STAT,'U','U',decode(a.AUTH_STAT,'U','U','A')),--BUG#31825782
  decode(a.AUTH_STAT,'U','U',decode(a.AUTH_STAT,'U','U','A')),--BUG#31825782
--  decode(b.ONCE_AUTH,'U','U',decode(a.ONCE_AUTH,'U','U','A')),  -- FCC 4.6.1 JAN 2005 --BUG#31825782
    decode(a.ONCE_AUTH,'U','U',decode(a.ONCE_AUTH,'U','U','A')),  -- FCC 4.6.1 JAN 2005 --BUG#31825782
--  b.cust_dd_msg_pref,  --BUG#31825782
  NULL cust_dd_msg_pref,   --BUG#31825782
--  b.bank_dd_msg_pref, --BUG#31825782
  NULL bank_dd_msg_pref,    --BUG#31825782
  --FCC V.CL 7.3 UK CONSOLIDATION RETRO START
  --FCC-7.3-RETRO-CITIUK-4.4-RETRO#136 Changes Starts
  --11/02/2004  FCC4.4  CITIPLC PLC44100025 Start
--  b.RTGS_MEMBER,--BUG#31825782
  NULL RTGS_MEMBER,--BUG#31825782
--  b.RTGS_BIC  --BUG#31825782
  NULL RTGS_BIC --BUG#31825782
  --11/02/2004  FCC4.4  CITIPLC PLC44100025 Ends
  --FCC-7.3-RETRO-CITIUK-4.4-RETRO#136 Changes Ends
  --FCC V.CL 7.3 UK CONSOLIDATION RETRO END
FROM ISTMS_BIC_DIRECTORY a -- , OLTM_BRANCH_BIC b --BUG#31825782
--WHERE a.bic_code = b.bic_code  --BUG#31825782
--and b.branch_code = global.current_branch --BUG#31825782
/
create or replace synonym oltms_bic_directory for oltm_bic_directory
/