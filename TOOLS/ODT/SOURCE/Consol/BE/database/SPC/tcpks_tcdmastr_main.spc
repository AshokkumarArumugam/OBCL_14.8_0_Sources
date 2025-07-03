CREATE OR REPLACE PACKAGE TCPKS_TCDMASTR_MAIN AS
   /*-----------------------------------------------------------------------------------------------------
   **
   ** File Name  : tcpks_Tcdmastr_Main.spc
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

   TYPE Ty_Tcdmastr IS RECORD(
      v_Tctm_Tc_Master Tctm_Tc_Master%ROWTYPE);
   FUNCTION Fn_Process_Request(p_Action_Code IN VARCHAR2) RETURN BOOLEAN;

END tcpks_tcdmastr_main;
/
CREATE OR REPLACE SYNONYM  tcpkss_tcdmastr_main FOR tcpks_tcdmastr_main;
/

 