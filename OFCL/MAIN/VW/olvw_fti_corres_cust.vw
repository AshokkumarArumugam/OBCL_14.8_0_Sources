CREATE OR REPLACE force VIEW olvw_fti_corres_cust AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_fti_corres_cust.VW
**
** Module      : Interfaces
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
/*
Change History
22-NOV-2003 FCC 4.4 DEC 2003 RETRO CITIPLC SFR PLC43040042 - Added location to the view definition
*/
SELECT 
	distinct a.customer_no,
	b.short_name, a.location
FROM 
	oltm_customer b,
	OLTM_CUST_ADDRESS_MS a
WHERE 	a.customer_no=b.customer_no
AND	A.media = 'FTI'
AND	a.record_stat = 'O'
/
CREATE or replace SYNONYM olvws_fti_corres_cust FOR olvw_fti_corres_cust
/