CREATE OR REPLACE FORCE VIEW lbvw_component_mapping ( SYNDICATION_REF_NO, 
BORROWER_LEG_REF_NO, CONTRACT_REF_NO, PARTICIPANT_PRODUCT_CODE, BORROWER_PRODUCT_CODE, 
PARTICIPANT_COMPONENT, BORROWER_COMPONENT, COMPONENT_NO, PARTY_ID, 
RATE, RATE_CODE, SPREAD, CUST_MARGIN, 
MIN_RATE, MAX_RATE, RESET_TENOR, BORROW_LEND_IND, 
RATE_CYCLE_TYPE, WAIVER, DRAWDOWN_NO, RATE_TYPE, 
AMOUNT, EVENT, EVENT_SEQ_NO, PICKUP_EVENT_SEQUENCE_NO, 
CURRENCY, INTEREST_BASIS, SHOWN_IN_CONTRACT_MAIN_SCREEN, COMP_TYPE
 ) AS
/*----------------------------------------------------------------------------------------------------
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
 (
SELECT a.syndication_ref_no,
 a.borrower_leg_ref_no,
 a.contract_ref_no,
 a.product_code,
 b.product_code,
 a.component,
 c.component,
 a.component_no,
 a.PARTY_ID,
 a.RATE ,
 a.RATE_CODE,
 a.SPREAD ,
 a.CUST_MARGIN,
 a.MIN_RATE ,
 a.MAX_RATE ,
 a.RESET_TENOR,
 a.BORROW_LEND_IND,
 a.RATE_CYCLE_TYPE,
 a.WAIVER ,
 a.DRAWDOWN_NO,
 a.RATE_TYPE,
 a.AMOUNT ,
 a.EVENT,
 a.EVENT_SEQ_NO ,
 a.PICKUP_EVENT_SEQUENCE_NO ,
 a.CURRENCY ,
 a.INTEREST_BASIS ,
 a.SHOWN_IN_CONTRACT_MAIN_SCREEN,
 'I'
FROM oltbs_party_component_details  a,
 oltbs_contract  b,
 lftms_product_iccf  c
WHERE a.borrower_leg_ref_no = b.contract_ref_no
AND b.product_code = c.product
AND a.component_no = c.component_no
AND   a.event_seq_no = (SELECT MAX(event_seq_no)
	          FROM   oltbs_party_component_details d
          WHERE  d.borrower_leg_ref_no = a.borrower_leg_ref_no)
UNION
SELECT d.syndication_ref_no,
 d.borrower_leg_ref_no,
 d.contract_ref_no,
 d.party_product_code,
 (SELECT sypks_utils.get_product(D.BORROWER_LEG_REF_NO) FROM DUAL),
 a.component,
  c.component,
 a.component_no,
 d.PARTY_ID,
 0,
 NULL,
 0 ,
 0,
 0 ,
 0 ,
 0,
 NULL,
 NULL,
 NULL ,
 d.DRAWDOWN_NUMBER,
 NULL,
 0,
 NULL,
 d.EVENT_SEQ_NO ,
 0 ,
 NULL,
 0,
 NULL,
'C'
FROM lftms_product_charge  a,
 lftms_product_charge c,
 oltbs_contract_party     d
WHERE (SELECT sypks_utils.get_product(D.BORROWER_LEG_REF_NO) FROM DUAL) = c.product
AND a.component_no = c.component_no
AND   d.party_product_code = a.product
AND   d.event_seq_no = (SELECT MAX(event_seq_no)
          FROM   oltbs_contract_party e
          WHERE  e.borrower_leg_ref_no = d.borrower_leg_ref_no)
 )
/
CREATE OR REPLACE SYNONYM lbvws_component_mapping  FOR lbvw_component_mapping 
/