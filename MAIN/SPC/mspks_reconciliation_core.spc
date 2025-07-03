CREATE OR REPLACE PACKAGE MSPKS_RECONCILIATION_CORE 
AS
/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright © 1997 - 2009  Oracle and/or its affiliates.  All rights reserved.
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
-----------------------------------------------------------------------------------------
CHANGE HISTORY
  
  	
  -------------------------------------------------------------------------------------------------------
 */
  
  PROCEDURE PR_PROCESS_NOTIFICATION;

END MSPKS_RECONCILIATION_CORE;
/

Create or replace SYNONYM MSPKSS_RECONCILIATION for MSPKS_RECONCILIATION_CORE
/
