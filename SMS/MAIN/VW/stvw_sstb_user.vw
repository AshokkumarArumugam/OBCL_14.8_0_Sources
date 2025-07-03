CREATE OR REPLACE FORCE VIEW STVW_SSTB_USER as 
/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright © 2018 - 2018  Oracle and/or its affiliates.  All rights reserved.
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
**  Modified By       : Somesh
**  Modified On       : 16-03-2018
**  Created  Reason   : 14.1 MASKING - View should not be altered. Used for masking functionality
**  Search String     : FCUBS14.1_MASK
** 
**  Modified By       : Ambika S
**  Modified On       : 27-Mar-2018
**  Created  Reason   : Dummy Checkin For recreation of view as a new column is added in SSTB_USER
****************************************************************************************************************************
*/
SELECT * FROM SSTB_USER
/
CREATE OR REPLACE SYNONYM STVWS_SSTB_USER FOR STVW_SSTB_USER
/