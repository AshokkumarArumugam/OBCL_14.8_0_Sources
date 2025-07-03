CREATE OR REPLACE view smvw_core_aclass
AS 
/*----------------------------------------------------------------------------------------------------
**
** File Name     : smvw_core_aclass.VW
**
** Module        : Core
**
** This source is part of the FLEXCUBE Corporate - Corporate Banking Software System
** and is copyrighted by Oracle Financial Services Software Limited.
**
**All rights reserved.  No part of this work may be reproduced, 
**stored in a retrieval system, adopted or transmitted in any form or by 
**any means,electronic, mechanical, photographic, graphic, optic 
**recording or otherwise,translated in any language or computer 
**language, without the prior written permission of 
**Oracle Financial Services Software Limited.
**
** Oracle Financial Services Software Limited.
** 10-11, SDF I, SEEPZ, Andheri (East),
** MUMBAI - 400 096.
** INDIA
**
** Copyright © 2013 - 2014 Oracle Financial Services Software Limited.
** -------------------------------------------------------------------------------------------------------*/
SELECT a."TYPE_NAME" ACCOUNT_CLASS,
               a."TYPE_VALUE" DESCRIPTION
               from STTM_STATIC_TYPE a 
               where a.type='AC_CLASS' and a.record_stat = 'O'
               and a.once_auth = 'Y'
			   order by type_name
/
CREATE OR REPLACE SYNONYM smvws_core_aclass FOR smvw_core_aclass 
/