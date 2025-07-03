CREATE OR REPLACE PACKAGE RDPKS_RDDENVDF_MAIN AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : RDpks_RDdenvdF_Main.SPC
  **
  ** Module     : TOOLS
  **
  ** This source is part of the Oracle FLEXCUBE Software System and is copyrighted by Oracle Financial Services Software Limited.
  **
  **
  ** All rights reserved. No part of this work may be reproduced, stored in a retrieval system,
  ** adopted or transmitted in any form or by any means, electronic, mechanical, photographic,
  ** graphic, optic recording or otherwise, translated in any language or computer language,
  ** without the prior written permission of Oracle Financial Services Software Limited.
  **
  ** Oracle Financial Services Software Limited.
  ** 10-11, SDF I, SEEPZ, Andheri (East),
  ** Mumbai - 400 096.
  ** India
  ** Copyright © 2012 - 2013 Oracle Financial Services Software Limited. All rights reserved.
  -------------------------------------------------------------------------------------------------------
  CHANGE HISTORY
  
  SFR Number         :
  Changed By         :
  Change Description :
  
  -------------------------------------------------------------------------------------------------------
  */
  TYPE Ty_Rddenvdf IS RECORD(
    v_Rdtm_Env_Master Rdtm_Env_Master%ROWTYPE);

  FUNCTION Fn_Process_Request(p_Action_Code IN VARCHAR2) RETURN BOOLEAN;

END rdpks_rddenvdf_main;
/
CREATE OR REPLACE SYNONYM  rdpkss_rddenvdf_main FOR rdpks_rddenvdf_main;
/

 