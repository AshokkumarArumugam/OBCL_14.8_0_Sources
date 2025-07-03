create or replace view olvw_modules AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : olvw_modules.VW
**
** Module       : Oracle Lending										
**
** This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
-----------------------------------------------------------------------------------------------
*/
SELECT * FROM smtbs_modules where module_id in('BK','LF','OL','LP','FC','LB','TX','TL')
/
create or replace synonym olvws_modules for olvw_modules
/