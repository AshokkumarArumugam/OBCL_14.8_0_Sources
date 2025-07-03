CREATE OR REPLACE FORCE VIEW lbvw_contract_mnemonic
(contract_ref_no , ssi_mnemonic)--Flexcube V.CL 7.3 Settlement Changes sept
 AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: lbvw_contract_mnemonic.vw
**
** Module	: LOANS SYNDICATION
**
This source is part of the Oracle Banking Corporate Lending  Software Product. 
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted 
in any form or by any means, electronic, mechanical, photographic, graphic, optic recording
or otherwise, translated in any language or computer language, without the prior written permission 
of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
/*--------------------------------Change History -------------------------------------------------
30-Jul-2007 FLEXCUBE V.CL Release 7.3, Created
10-Aug-2007 FLEXCUBE V.CL Release 7.3 changes
25-Sep-2007 FLEXCUBE V.CL Release 7.3 changes
26-feb-2007 Flexcube V.CL 7.3 Settlement Changes
--------------------------------------------------------------------------------------------------
*/
 /*(contract_ref_no , ssi_mnemonic)
 AS
  SELECT DISTINCT a.contract_ref_no , a.ssi_mnemonic
  FROM lbtbs_borr_settle_curr_det a , oltbs_contract b
  WHERE a.ssi_mnemonic is NOT NULL
  AND  a.contract_ref_no 	= b.contract_ref_no
  AND  a.version_no 		= b.latest_version_no
  --AND  b.product_type 		IN ('L','C')
  AND  b.product_type 		<> 'F'
  AND  (b.contract_status 	IN ('A','Y') or (b.contract_status = 'V' AND b.auth_status = 'U'))
  UNION
  SELECT DISTINCT a.contract_ref_no , a.ssi_mnemonic
  FROM lbtbs_participant_ratio a , oltbs_contract b
  WHERE a.ssi_mnemonic is NOT NULL
  AND  a.contract_ref_no = b.contract_ref_no
  --AND  b.product_type IN ('L','C')
  AND  b.product_type 		<> 'F'
  --AND  b.contract_status IN ('A','Y')
   AND  (b.contract_status 	IN ('A','Y') or (b.contract_status = 'V' AND b.auth_status = 'U'))
  UNION
  SELECT DISTINCT a.contract_ref_no , a.ssi_mnemonic
  FROM lbtbs_part_settle_curr_det a , oltbs_contract b
  WHERE a.ssi_mnemonic is NOT NULL
  AND  a.contract_ref_no = b.contract_ref_no
  --AND  b.product_type IN ('L','C')
  AND  b.product_type 		<> 'F'
  --AND  b.contract_status IN ('A','Y')
 AND  (b.contract_status 	IN ('A','Y') or (b.contract_status = 'V' AND b.auth_status = 'U'))*/
 /*--Flexcube V.CL 7.3 Settlement Changes starts
  SELECT DISTINCT c.tranche_ref_no , a.ssi_mnemonic
  FROM lbtbs_borr_settle_curr_det a , oltbs_contract b , oltbs_contract_master c
  WHERE a.ssi_mnemonic is NOT NULL
  AND  a.contract_ref_no 	= b.contract_ref_no
  AND  a.version_no 		= b.latest_version_no
  AND  a.contract_ref_no 	= c.contract_ref_no
  AND  c.version_no 		= b.latest_version_no
  AND  (b.contract_status 	IN ('A','Y') or (b.contract_status = 'V' AND b.auth_status = 'U'))
  UNION
  SELECT DISTINCT c.tranche_ref_no , a.ssi_mnemonic
  FROM lbtbs_participant_ratio a , oltbs_contract b , oltbs_contract_master c
  WHERE a.ssi_mnemonic is NOT NULL
  AND  a.contract_ref_no = b.contract_ref_no
  AND  a.contract_ref_no 	= c.contract_ref_no
  AND  c.version_no 		= b.latest_version_no
  AND  (b.contract_status 	IN ('A','Y') or (b.contract_status = 'V' AND b.auth_status = 'U'))
  UNION
  SELECT DISTINCT c.tranche_ref_no , a.ssi_mnemonic
  FROM lbtbs_part_settle_curr_det a , oltbs_contract b , oltbs_contract_master c
  WHERE a.ssi_mnemonic is NOT NULL
  AND  a.contract_ref_no = b.contract_ref_no
  AND  a.contract_ref_no 	= c.contract_ref_no
  AND  c.version_no 		= b.latest_version_no
 AND  (b.contract_status 	IN ('A','Y') or (b.contract_status = 'V' AND b.auth_status = 'U'))*/
 SELECT DISTINCT contract_ref_no , ssi_mnemonic
 FROM lbtb_propagate_mnemonic--Flexcube V.CL 7.3 Settlement Changes ends
/