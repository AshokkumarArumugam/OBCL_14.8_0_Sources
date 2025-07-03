CREATE OR REPLACE PACKAGE gipks_gidifprc_utils AS
   /*------------------------------------------------------------------------------------------
   **
   ** File Name    : gipks_gidifprc_utils.spc
   **
   ** Module       : GI
   **
   ** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
   ** Copyright Â© 2006,2015 , Oracle and/or its affiliates.  All rights reserved.
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

   /* CHANGE HISTORY
   
        Created By         : Vipan Kumar
        Created On         : 08-AUG-2017
        Created Reason     : RETRO: Utils package for GIDIFPRC Extensible Screen
   
   */
   ------------------------------------------------------------------------------------------
   FUNCTION fn_main(p_source           IN cotms_source.source_code%TYPE
                   ,p_source_operation IN VARCHAR2
                   ,p_action_code      IN VARCHAR2
                   ,p_multi_trip_id    IN OUT VARCHAR2
                   ,p_gidifprc         IN gipks_gidifprc_main.ty_gidifprc
                   ,p_wrk_gidifprc     IN OUT gipks_gidifprc_main.ty_gidifprc
                   ,p_status           IN OUT VARCHAR2
                   ,p_err_code         IN OUT VARCHAR2
                   ,p_err_params       IN OUT VARCHAR2)
   
    RETURN BOOLEAN;

   FUNCTION fn_update_gitm_int_def(p_date           IN DATE
                                  ,p_interface_code IN gitm_interface_definition.interface_code%TYPE
                                  ,p_err_code       IN OUT VARCHAR2
                                  ,p_err_params     IN OUT VARCHAR2) RETURN BOOLEAN;

END gipks_gidifprc_utils;
/
CREATE OR REPLACE SYNONYM gipkss_gidifprc_utils FOR gipks_gidifprc_utils
/