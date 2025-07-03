CREATE OR REPLACE PACKAGE TCPKS_TCDCRREQ_MAIN AS
   /*-----------------------------------------------------------------------------------------------------
   **
   ** File Name  : Tcpks_Tcdcrreq_Main.spc
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

   TYPE Ty_Tcdcrreq IS RECORD(
      v_Tctb_Tc_Master  Tctb_Tc_Master%ROWTYPE,
      v_Tctm_Tc_Master  Tctm_Tc_Master%ROWTYPE,
      v_Rdtb_Ui_Columns Rdtb_Ui_Columns%ROWTYPE);

   FUNCTION Fn_Process_Request(p_Action_Code IN VARCHAR2) RETURN BOOLEAN;

END tcpks_tcdcrreq_main;
/
CREATE OR REPLACE SYNONYM tcpkss_tcdcrreq_main FOR tcpks_tcdcrreq_main;
/