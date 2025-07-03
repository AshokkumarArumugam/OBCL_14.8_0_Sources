CREATE OR REPLACE PACKAGE Aepks_Eoc_Scheduler AS
   /*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright © ? 2008 - 2011  Oracle and/or its affiliates.  All rights reserved.
** 												
** No part of this work may be reproduced, stored in a retrieval system,
** adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise,
** translated in any language or computer language,
** without the prior written permission of Oracle and/or its affiliates.
** 
** 
** Oracle Financial Services Software Limited.
** Oracle Park, Off Western Express Highway,
** Goregaon (East),
** Mumbai - 400 063, India.
------------------------------------------------------------------------------------------
*/
/*
   -------------------------------------------------------------------------------------------------------
   CHANGE HISTORY

   SFR Number         :
   Changed By         :
   Change Description :

   -------------------------------------------------------------------------------------------------------
   */

   PROCEDURE Pr_Eoc_Branch_Scheduler(p_Param_Names VARCHAR2
                                    ,p_Param_Vals  VARCHAR2);
   PROCEDURE Pr_Eoc_Batch_Scheduler(p_Param_Names VARCHAR2
                                   ,p_Param_Vals  VARCHAR2);

END Aepks_Eoc_Scheduler;
/
CREATE OR REPLACE SYNONYM Aepkss_Eoc_Scheduler FOR Aepks_Eoc_Scheduler
/
