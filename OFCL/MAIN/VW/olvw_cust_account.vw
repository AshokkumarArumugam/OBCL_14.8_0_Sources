CREATE OR REPLACE force VIEW olvw_cust_account ( CUST_AC_NO,
/*-----------------------------------------------------------------------------------------------
**
** File Name    : olvw_cust_account.VW
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
 AC_DESC, BRANCH_CODE ) --AS select distinct cust_ac_no,ac_desc,branch_code from sttms_cust_account
as select distinct ac_gl_no,ac_gl_desc,branch_code from oltb_account
/