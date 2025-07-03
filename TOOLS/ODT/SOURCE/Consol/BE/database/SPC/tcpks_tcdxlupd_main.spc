CREATE OR REPLACE PACKAGE Tcpks_Tcdxlupd_Main AS
   /*-----------------------------------------------------------------------------------------------------
   **
   ** File Name  : tcpks_tcdxlupd_Main.spc
   **
   ** Module     : Core
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

   TYPE Ty_Tb_v_Tctb_Block_Details IS TABLE OF Tctb_Block_Details%ROWTYPE INDEX BY BINARY_INTEGER;
   TYPE Ty_Tb_v_Tctb_Block_Data IS TABLE OF Tctb_Block_Data%ROWTYPE INDEX BY BINARY_INTEGER;

   TYPE Ty_Tb_v_Tctm_Block_Details IS TABLE OF Tctm_Block_Details%ROWTYPE INDEX BY BINARY_INTEGER;
   TYPE Ty_Tb_v_Tctm_Block_Data IS TABLE OF Tctm_Block_Data%ROWTYPE INDEX BY BINARY_INTEGER;

   TYPE Ty_Tcdxlupd IS RECORD(
      v_Tctb_Tc_Master     Tctb_Tc_Master%ROWTYPE,
      v_Tctb_Block_Details Ty_Tb_v_Tctb_Block_Details,
      v_Tctb_Block_Data    Ty_Tb_v_Tctb_Block_Data);

   FUNCTION Fn_Main(p_Action_Code IN VARCHAR2
                   ,p_Tcdxlupd    IN OUT Ty_Tcdxlupd) RETURN BOOLEAN;
   FUNCTION Fn_Process_Request(p_Action_Code IN VARCHAR2) RETURN BOOLEAN;

END tcpks_tcdxlupd_main;
/
CREATE OR REPLACE SYNONYM  tcpkss_tcdxlupd_main FOR tcpks_tcdxlupd_main;
/