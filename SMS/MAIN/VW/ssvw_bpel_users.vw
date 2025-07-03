CREATE OR REPLACE view SSVW_BPEL_USERS
AS 
/*----------------------------------------------------------------------------------------------------
**
** File Name     : smvw_core_product.VW
**
** Module        : SMS
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
SELECT USER_ID,LDAP_USER,USER_NAME,USER_EMAIL,'SYSTEM' USER_MANAGER,USER_PASSWORD,SALT,USER_STATUS FROM SSTB_USER WHERE USER_ID NOT IN ('WORKFLOWSYSTEM','BPELADMIN')
UNION ALL
SELECT 'WORKFLOWSYSTEM' USER_ID,'' LDAP_USER,'WORKFLOWSYSTEM' USER_NAME,'' USER_EMAIL,'WORKFLOWSYSTEM' USER_MANAGER,'PASSWORD' USER_PASSWORD,'' SALT,'E' USER_STATUS FROM DUAL
UNION ALL
SELECT 'BPELADMIN' USER_ID,'' LDAP_USER,'BPELADMIN' USER_NAME,'' USER_EMAIL,'BPELADMIN' USER_MANAGER,'PASSWORD' USER_PASSWORD,'' SALT,'E' USER_STATUS FROM DUAL
WITH READ ONLY;
/