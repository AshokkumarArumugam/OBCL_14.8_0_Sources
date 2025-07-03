CREATE OR REPLACE FORCE VIEW olvw_all_addresses ( ADDRESS_ID, 
MEDIA, NAME ) AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : olvw_all_addresses.VW
**
** Module       : MESSAGING SUBSYSTEM										**
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
-----------------------------------------------------------------------------------------------
*/
SELECT ADDRESS_ID,MEDIA,NAME FROM OLTM_OTHER_ADDRESSES WHERE MEDIA = 'GCN' AND RECORD_STAT = 'O' AND AUTH_STAT = 'A'
UNION ALL
SELECT ADDRESS1,MEDIA,NAME FROM OLTM_CUST_ADDRESS_MS WHERE MEDIA = 'GCN' AND RECORD_STAT = 'O' AND AUTH_STAT = 'A'
/
CREATE OR REPLACE SYNONYM olvws_all_addresses FOR olvw_all_addresses
/