CREATE OR REPLACE FORCE VIEW lbvw_tranche_coll_amount AS
/*-------------------------------------------------------------------------------------- 
**  
**  File Name :lbvw_tranche_coll_amount.VW 
**  
**  Module    :LS-Loan Syndication and commitments
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
---------------------------------------------------------------------------------------
*/
/*
CHANGE HISTORY
17-SEP-2010 FLEXCUBE V.CL Release 7.7 ITR2 SFR#19 changes,changed column Global_avl_amount to Gross_avl_amount
*/
(SELECT
A.TRANCHE_REF_NO,         
A.EFFECTIVE_DATE,         
A.COLLATERAL_CODE        ,
A.GROSS_AVL_AMOUNT      ,		
A.INELIGIBLE_AMOUNT      ,
A.PERCENT_OF_INVENTORY   ,
A.NET_AVL_AMOUNT         ,
B.RECORD_STAT,
B.AUTH_STAT
FROM lbtm_tranche_coll_amount A, lbtm_tranche_coll_effdate B
WHERE A.TRANCHE_REF_NO = B.TRANCHE_REF_NO
AND A.EFFECTIVE_DATE = B.EFFECTIVE_DATE
)
/