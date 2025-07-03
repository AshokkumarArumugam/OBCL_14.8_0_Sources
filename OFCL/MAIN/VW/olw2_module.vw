CREATE OR REPLACE FORCE VIEW olw2_module ( MODNAME, 
MODTYPE, GENERIC, MODID, OWNER
 ) AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : olw2_module.VW
**
** Module       : CORE ENTITIES										
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
-----------------------------------------------------------------------------------------------
*/
 select
    decode (owner, user, '', owner || '.') || modname modname,
    decode (modtype, 'REPORT', 1, 'QUERY', 2, 'PL/SQL Library', 4, 0) modtype,
    decode (product, 'SQL*ReportWriter', 0, 1) generic,
    modid,
    owner
  from olvw_tool_module
  where
    product = 'SQL*ReportWriter' or
    modtype = 'QUERY'            or
    modtype = 'PL/SQL Library'
/
Create OR REPLACE Synonym olw2s_module For olw2_module
/