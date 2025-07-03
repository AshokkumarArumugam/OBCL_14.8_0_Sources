CREATE OR REPLACE force VIEW olvw_cb2_tax_instalment
AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : olvw_cb2_tax_instalment.VW
**
** Module       : Interface
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
-----------------------------------------------------------------------------------------------
*/
/* CHANGE HISTORY : 
*/
SELECT CONTRACT_REF_NO,RULE,AMOUNT,CURRENCY,VALUE_DATE
FROM txtbs_txnrule_detail D
WHERE EVENT_SEQ_NO = 
(SELECT MAX(EVENT_SEQ_NO) FROM txtbs_txnrule_detail D1
 WHERE D.RULE=D1.RULE AND D.CONTRACT_rEF_NO=D1.CONTRACT_rEF_NO
 AND D.VALUE_DATE=D1.VALUE_DATE)
/