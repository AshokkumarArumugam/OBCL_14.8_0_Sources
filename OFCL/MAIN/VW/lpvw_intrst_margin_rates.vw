CREATE OR REPLACE FORCE VIEW lpvw_intrst_margin_rates AS
/*
----------------------------------------------------------------------------------------------------
**
** File Name	: lpvw_intrst_margin_rates.vw
**
** Module	: LL
**
**This source is part of the Oracle Banking Corporate Lending  Software Product. 
**Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
**No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted 
**in any form or by any means, electronic, mechanical, photographic, graphic, optic recording
**or otherwise, translated in any language or computer language, without the prior written permission 
**of Oracle and/or its affiliates. 
**Oracle Financial Services Software Limited.
**Oracle Park, Off Western Express Highway,
**Goregaon (East), 
**Mumbai - 400 063, India.
-------------------------------------- Change history ---------------------------------------------
Change History
23-MAR-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol2 Tag05 Different margin for participants.
*/
SELECT M.CONTRACT_REF_NO, 
       M.COMPONENT,
	   M.MARGIN_COMPONENT, 
	   I.VALUE_DATE, 
	   M.EVENT_SEQ_NO, 
	   M.MARGIN_RATE, 
	   M.BORROWER_CONTRACT_REF_NO
 FROM lptbs_contract_interest_detail I, lptbs_contract_margin_detail M
  WHERE I.CONTRACT_REF_NO = M.CONTRACT_REF_NO
  AND I.COMPONENT       = M.COMPONENT
  AND I.VALUE_DATE      = M.VALUE_DATE
  AND M.VALUE_DATE = (SELECT MAX(VALUE_DATE)
                          FROM lptbs_contract_margin_detail
                          WHERE CONTRACT_REF_NO = M.CONTRACT_REF_NO
                           AND COMPONENT       = M.COMPONENT
                           AND MARGIN_COMPONENT = M.MARGIN_COMPONENT
                           AND VALUE_DATE       <= I.VALUE_DATE)
  AND M.EVENT_SEQ_NO = (SELECT MAX(EVENT_SEQ_NO)
                          FROM lptbs_contract_margin_detail
                          WHERE CONTRACT_REF_NO = M.CONTRACT_REF_NO
                           AND COMPONENT       = M.COMPONENT
                           AND MARGIN_COMPONENT = M.MARGIN_COMPONENT
                           AND VALUE_DATE       = M.VALUE_DATE)

/
/* creating synonym for lpvw_intrst_margin_rates view */
CREATE OR REPLACE SYNONYM lpvws_intrst_margin_rates FOR lpvw_intrst_margin_rates
/