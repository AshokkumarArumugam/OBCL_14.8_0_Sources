CREATE OR REPLACE view STVW_STTM_CORE_ACCOUNT as 
/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright © 2018 - 2021  Oracle and/or its affiliates.  All rights reserved.
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
************************************************Change History********************************************************
**  Log Number        : 
**  Modified By       : Pattan Klaesha
**  Modified On       : 01-03-2018
**  Created  Reason   : 14.1 MASKING - View should not be altered. Used for masking functionality
**  Search String     : FCUBS14.1_MASK
**  
**  Modified By       : Nalandhan Gunasekaran
**  Modified On       : 26-Mar-2018
**  Modified  Reason  : Dummy Checkin For recreation of view as the new column add in STTM_CORE_ACCOUNT
**  
**  Modified By       : Ramki
**  Modified On       : 08-Oct-2021
**  Modified  Reason  : Dummy Checkin For #33394577
****************************************************************************************************************************
*/
SELECT * FROM STTM_CORE_ACCOUNT
/
CREATE OR REPLACE SYNONYM STVWS_STTM_CORE_ACCOUNT FOR STVW_STTM_CORE_ACCOUNT
/