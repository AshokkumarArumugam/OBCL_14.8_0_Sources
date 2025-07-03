CREATE or replace VIEW tlvw_trade_customer AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: tlvw_trade_customer.VW
**
** Module	: TL
**
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
------------------------------------------------------------------------------------------
*/
SELECT a.contract_ref_no, a.agency_id customer_no, 'A' mnemonic_for,a.version_no
  FROM tltbs_contract_master a, oltbs_contract b
 WHERE a.contract_ref_no = b.contract_ref_no
   and a.version_no = b.latest_version_no
   AND a.agency_id IS NOT NULL
UNION
SELECT a.contract_ref_no, a.counterparty customer_no, 'T' mnemonic_for,a.version_no
  FROM tltbs_contract_master a, oltbs_contract b
 WHERE a.contract_ref_no = b.contract_ref_no
   AND a.version_no = b.latest_version_no
/
create OR REPLACE synonym tlvws_trade_customer for tlvw_trade_customer
/