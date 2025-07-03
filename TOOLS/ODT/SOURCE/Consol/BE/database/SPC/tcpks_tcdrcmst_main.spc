CREATE OR REPLACE PACKAGE TCPKS_TCDRCMST_MAIN AS
   /*-----------------------------------------------------------------------------------------------------
   **
   ** File Name  : TCpks_TCDRCMST_Main.SPC
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
   TYPE Ty_Tb_v_Tctm_Rc_Tcs IS TABLE OF Tctm_Rc_Tcs%ROWTYPE INDEX BY BINARY_INTEGER;
   TYPE Ty_Tb_v_Tctm_Tc_Master IS TABLE OF Tctm_Tc_Master%ROWTYPE INDEX BY BINARY_INTEGER;

   TYPE Ty_Tcdrcmst IS RECORD(
      v_Tctm_Rc_Master Tctm_Rc_Master%ROWTYPE,
      v_Tctm_Rc_Tcs    Ty_Tb_v_Tctm_Rc_Tcs,
      v_Tctm_Tc_Master Ty_Tb_v_Tctm_Tc_Master);

   FUNCTION Fn_Process_Request(p_Action_Code IN VARCHAR2) RETURN BOOLEAN;

END tcpks_tcdrcmst_main;
/
CREATE OR REPLACE SYNONYM  tcpkss_tcdrcmst_main FOR tcpks_tcdrcmst_main;
/

 