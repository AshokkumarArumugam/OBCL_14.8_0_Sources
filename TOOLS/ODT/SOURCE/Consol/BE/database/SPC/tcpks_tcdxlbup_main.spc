CREATE OR REPLACE PACKAGE Tcpks_Tcdxlbup_Main AS
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

   TYPE Ty_Tb_v_Tctb_Tc_Bulk_Tcs IS TABLE OF Tctb_Tc_Bulk_Tcs%ROWTYPE INDEX BY BINARY_INTEGER;

   TYPE Ty_Tcdxlbup IS RECORD(
      v_Tctb_Tc_Bulk_Master Tctb_Tc_Bulk_Master%ROWTYPE,
      v_Tctb_Tc_Bulk_Tcs    Ty_Tb_v_Tctb_Tc_Bulk_Tcs,
      v_Tctb_Block_Details  Tcpks_Tcdxlupd_Main.Ty_Tb_v_Tctb_Block_Details,
      v_Tctb_Block_Data     Tcpks_Tcdxlupd_Main.Ty_Tb_v_Tctb_Block_Data);

   FUNCTION Fn_Process_Request(p_Action_Code IN VARCHAR2) RETURN BOOLEAN;

END Tcpks_Tcdxlbup_Main;
/