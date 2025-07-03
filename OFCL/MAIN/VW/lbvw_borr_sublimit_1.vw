CREATE OR REPLACE FORCE VIEW lbvw_borr_sublimit_1(TRANCHE_REF_NO, BORROWER, PRODUCT, CCY_CODE, LIMIT_AMT, VERSION_NO, AVAIL_AMT)
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: lbvw_borr_sublimit_1.VW
**
** Module      : Syndication Loans and Commitments
**
This source is part of the Oracle Banking Corporate Lending  Software Product. 
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted 
in any form or by any means, electronic, mechanical, photographic, graphic, optic recording
or otherwise, translated in any language or computer language, without the prior written permission 
of Oracle and/or its affiliates. 
**
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
Change History 
--09-May-2006 FLEXCUBE V.CL Release 7.0, LOT2 ITR1 SFR#29, Created the view for borrower sublimit
----------------------------------------------------------------------------------------------------
*/
(
SELECT A.TRANCHE_REF_NO, A.BORROWER, A.DRAWDOWN_PRODUCT, A.CCY_CODE, A.LIMIT_AMT, a.version_no, A.LIMIT_AMT AVAIL_AMT
FROM lbtbs_borr_prod_limit A )
/
create or replace synonym lbvws_borr_sublimit_1 for lbvw_borr_sublimit_1
/