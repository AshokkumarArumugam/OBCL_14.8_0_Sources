CREATE OR REPLACE VIEW Olzm_Fin_Centre_Holiday AS
/*-------------------------------------------------------------------------------------------------
**
** File Name	: Olzm_Fin_Centre_Holiday.vw
**
** Module	: LOANS SYNDICATION
**
**This source is part of the Oracle Flexcube Corporate Lending  Software Product. 
**Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
**No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted 
**in any form or by any means, electronic, mechanical, photographic, graphic, optic recording
**or otherwise, translated in any language or computer language, without the prior written permission 
**of Oracle and/or its affiliates. 
**Oracle Financial Services Software Limited.
**Oracle Park, Off Western Express Highway,
**Goregaon (East), 
**Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
SELECT Financial_Center Fin_Centre, YEAR, MONTH, Holiday_List
  FROM Sttms_Fic_Holiday
/
create or replace synonym Oltm_Fin_Centre_Holiday for Olzm_Fin_Centre_Holiday
/
create or replace synonym Oltms_Fin_Centre_Holiday for Olzm_Fin_Centre_Holiday
/