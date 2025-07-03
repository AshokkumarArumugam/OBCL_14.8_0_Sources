CREATE OR REPLACE PACKAGE Copks_eoc_Utils AS
  /*-----------------------------------------------------------------------------------------------------
   **
   ** File Name  : Copks_eoc_Utils.spc
   **
   ** Module     : Flexcube
   **
   ** This source is part of the Oracle FLEXCUBE Software Product.
   ** Copyright (R) 2016 , Oracle and/or its affiliates.  All rights reserved
   **
   **
   ** No part of this work may be reproduced, stored in a retrieval system, adopted
   ** or transmitted in any form or by any means, electronic, mechanical,
   ** photographic, graphic, optic recording or otherwise, translated in any
   ** language or computer language, without the prior written permission of
   ** Oracle and/or its affiliates.
   **
   ** Oracle Financial Services Software Limited.
   ** Oracle Park, Off Western Express Highway,
   ** Goregaon (East),
   ** Mumbai - 400 063, India
   ** India
      -------------------------------------------------------------------------------------------------------
      CHANGE HISTORY

     
      -------------------------------------------------------------------------------------------------------
      */

    

      
     procedure pr_update_eod_stat(p_branch in varchar2,p_module_id in varchar2,p_process in varchar2, p_err_code in out varchar2,
                            p_err_params in out varchar2);

  
END Copks_eoc_Utils;
/