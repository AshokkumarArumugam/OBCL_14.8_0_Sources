CREATE OR REPLACE force VIEW olvw_recon_master ( BRANCH,
ACCOUNT, CCY, RECONNO, REF_NO,
EVENT_SEQ_NO, AMOUNT, AMOUNT_TO_RECON, ENTRYDATE,INTERNAL_REMARKS,EXTERNAL_REMARKS,
VALUE_DATE,FUTURE_LIQ_AMOUNT,GAAP_INDICATOR
 ) AS 
/*-----------------------------------------------------------------------------------------------
**
** File Name    : olvw_recon_master.VW
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
08/MAY/2002 FCC4.0 ASPAC CHANGES #Related to future liquidation of Unreconciled Amount.
30/jul/2003 FCC4.3 AUG 2003 GAAP changes for RECON
*/
SELECT
 A.BRANCH
,A.ACCOUNT
,A.CCY
,A.RECONNO
,A.REF_NO
,A.EVENT_SEQ_NO
,A.AMOUNT
,A.AMOUNT_TO_RECON
,A.ENTRYDATE
,A.INTERNAL_REMARKS--added in 3.8 rel for acdrecon changes
,A.EXTERNAL_REMARKS--added in 3.8 rel for acdrecon changes
,B.VALUE_DT
,A.FUTURE_LIQ_AMOUNT --FCC4.0 JUNE 2002 ASPAC CHANGES
,A.GAAP_INDICATOR -- FCC4.3 AUG 2003 GAAP changes for RECON
FROM oltbs_recon_master A,
olvws_all_ac_entries B
WHERE
A.REF_NO = B.TRN_REF_NO AND
A.EVENT_SEQ_NO = B.EVENT_SR_NO AND
B.AC_ENTRY_SR_NO = (select max(C.AC_ENTRY_SR_NO) from olvws_all_ac_entries C
		   where  C.TRN_REF_NO = B.TRN_REF_NO
		   and    C.EVENT_SR_NO =B.EVENT_SR_NO)--3.8 CHANGES FOR ALLREADY EXISTING BUG IN WHICH THE VIEW RETURNS DOUBLE ROWS
/

CREATE or replace SYNONYM olvws_recon_master FOR  olvw_recon_master
/