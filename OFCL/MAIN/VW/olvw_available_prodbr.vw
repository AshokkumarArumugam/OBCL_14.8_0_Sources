CREATE OR REPLACE force VIEW olvw_available_prodbr ( USER_ID, 
PRODUCT_CODE, BRANCH_CODE ) AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : olvw_available_prodbr.VW
**
** Module       : CORE ENTITIES
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
/*
CHANGE HISTORY
*/
SELECT
  B.user_id
  , A.product_code
  , A.branch_code
 FROM olvws_product_branches A
 ,olvws_user_products B
 WHERE B.product_code = A.product_code
/
create or replace synonym olvws_available_prodbr for olvw_available_prodbr
/