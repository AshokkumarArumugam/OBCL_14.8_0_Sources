create or replace package copks_eod_gibatch_process as
/*------------------------------------------------------------------------------------------
**
** File Name  : copks_eod_gibatch_process.spc
**
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright © 2011 - 2018 ,  Oracle and/or its affiliates.  All rights reserved.
**
** No part of this work may be reproduced, stored in a retrieval system,
** adopted or transmitted in any form or by any means, electronic, mechanical,
** photographic, graphic, optic recording or otherwise,
** translated in any language or computer language,
** without the prior written permission of Oracle and/or its affiliates.
**
**
** Oracle Financial Services Software Limited.
** Oracle Park, Off Western Express Highway,
** Goregaon (East),
** Mumbai - 400 063, India.
-------------------------------------------------------------------------------------------------------
*/  
PROCEDURE pr_aeod_run_batch(p_Branch     varchar2,
                            p_stage      VARCHAR2,  
                            p_batch      varchar2,                                                     
                            p_err_code   IN OUT VARCHAR2,
                            p_err_params IN OUT VARCHAR2);

end copks_eod_gibatch_process;
/
CREATE OR REPLACE SYNONYM copkss_eod_gibatch_process FOR copks_eod_gibatch_process
/