create or replace package olpks_rate_propagation is
  /*------------------------------------------------------------------------------------------
     **
     ** This source is part of the Oracle Banking Software Product.
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
  ---------------------------------------------------------------------------------------------
  CHANGE HISTORY

  SFR Number         :
  Changed By         :
  Search String      : ofcl_conversion
  ---------------------------------------------------------------------------------------------*/
  PROCEDURE pr_prop_rates(p_Source       IN VARCHAR2,
                          p_Function_Id  IN VARCHAR2,
                          p_Action_Code  IN VARCHAR2,
                          p_wrk_cfdfltri IN cfpks_cfdfltri_Main.Ty_cfdfltri);

end olpks_rate_propagation;
/
create or replace synonym olpkss_rate_propagation for olpks_rate_propagation
/