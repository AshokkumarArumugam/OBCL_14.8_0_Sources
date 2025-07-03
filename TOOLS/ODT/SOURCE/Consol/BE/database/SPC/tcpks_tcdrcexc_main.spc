CREATE OR REPLACE PACKAGE TCPKS_TCDRCEXC_MAIN AS
   /*-----------------------------------------------------------------------------------------------------
   **
   ** File Name  : Tcpks_Tcdrcexc_Main.SPC
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
   TYPE Ty_Tb_v_Tctb_Tc_Exec_Master IS TABLE OF Tctb_Tc_Exec_Master%ROWTYPE INDEX BY BINARY_INTEGER;

   TYPE Ty_Tcdrcexc IS RECORD(
      v_Tctb_Rc_Exec_Master Tctb_Rc_Exec_Master%ROWTYPE,
      v_Tctb_Tc_Exec_Master Ty_Tb_v_Tctb_Tc_Exec_Master);

   FUNCTION Fn_Process_Request(p_Action_Code IN VARCHAR2) RETURN BOOLEAN;
END tcpks_tcdrcexc_main;
/
CREATE OR REPLACE SYNONYM tcpkss_tcdrcexc_main FOR tcpks_tcdrcexc_main;
/

 