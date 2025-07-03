CREATE OR REPLACE PACKAGE TCPKS_TCDRNREQ_MAIN AS
   /*-----------------------------------------------------------------------------------------------------
   **
   ** File Name  : Tcpks_Tcdrnreq_Main.spc
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

   TYPE Ty_Tcdrnreq IS RECORD(
      v_Tctb_Tc_Exec_Master Tctb_Tc_Exec_Master%ROWTYPE,
      v_Tctm_Tc_Master      Tctm_Tc_Master%ROWTYPE);

   FUNCTION Fn_Update_Response RETURN BOOLEAN;
   FUNCTION Fn_Query_Xml RETURN BOOLEAN;
   FUNCTION Fn_Process_Request(p_Action_Code IN VARCHAR2) RETURN BOOLEAN;
   FUNCTION Fn_Process_Request RETURN BOOLEAN;

END tcpks_tcdrnreq_main;
/
CREATE OR REPLACE SYNONYM tcpkss_tcdrnreq_main FOR tcpks_tcdrnreq_main;
/
 