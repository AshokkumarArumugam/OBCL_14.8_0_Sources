CREATE OR REPLACE force  VIEW olvw_recon_details ( BRANCH,
ACCOUNT, CCY, SERNO, RECONNO, 
REF_NO, EVENT_SEQ_NO, AMOUNT, ENTRYDATE,INTERNAL_REMARKS,EXTERNAL_REMARKS, 
VALUE_DATE, GAAP_INDICATOR --30-JUL-2003 FCC4.3 AUG 2003 GAAP changes for RECON
) AS 
/*-----------------------------------------------------------------------------------------------
**
** File Name    : olvw_recon_details.VW
**
** Module       : CORE ENTITIES
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
**
	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
-----------------------------------------------------------------------------------------------
*/
/* 
CHANGE HISTORY
14-SEP-2001 FCC3.8 PLNCITI TIL #3340 Reconciliation report shows duplicate entries
30-JUL-2003 FCC4.3 AUG 2003 GAAP changes for RECON
*/
SELECT
A.BRANCH
,A.ACCOUNT
,A.CCY
,A.SERNO
,A.RECONNO
,A.REF_NO
,A.EVENT_SEQ_NO
,A.AMOUNT
,A.ENTRYDATE
,A.INTERNAL_REMARKS--3.8 FS1.11
,A.EXTERNAL_REMARKS--3.8 FS 1.11
,B.VALUE_DT
,A.GAAP_INDICATOR -- 30-JUL-2003 FCC4.3 AUG 2003 GAAP changes for RECON
FROM oltbs_recon_details A,
olvws_all_ac_entries B
WHERE
A.REF_NO = B.TRN_REF_NO AND
A.EVENT_SEQ_NO = B.EVENT_SR_NO
--AND A.ACCOUNT = B.AC_NO 	--PLNCITI TIL #3340 --3.8 SFR 227 removed the added change
AND B.AC_ENTRY_SR_NO = (select max(C.AC_ENTRY_SR_NO) from olvws_all_ac_entries C
		   where  C.TRN_REF_NO = B.TRN_REF_NO
		   and    C.EVENT_SR_NO =B.EVENT_SR_NO)--3.8 CHANGES FOR ALLREADY EXISTING BUG IN WHICH THE VIEW RETURNS DOUBLE ROWS
/
create or replace synonym olvws_recon_details for olvw_recon_details
/