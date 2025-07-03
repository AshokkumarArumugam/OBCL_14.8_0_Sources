CREATE OR REPLACE PACKAGE Tcpks_Tcdrcrpt_Main AS

   /*-----------------------------------------------------------------------------------------------------
   **
   ** File Name  : Tcpks_Tcdrcrpt_Main.SPC
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
   TYPE Ty_Tcdrcrpt_Params IS RECORD(
      Release_Code VARCHAR2(4000),
      Env_Code     VARCHAR2(4000),
      Rc_Code      VARCHAR2(4000),
      Exec_By      VARCHAR2(4000));

   TYPE Ty_Tb_v_Tctb_Rc_Exec_Master IS TABLE OF Tctb_Rc_Exec_Master%ROWTYPE INDEX BY BINARY_INTEGER;

   TYPE Ty_Tcdrcrpt_Stats IS RECORD(
      Total_Rc_Codes    NUMBER,
      Failed_Rc_Codes   NUMBER,
      Success_Rc_Codes  NUMBER,
      Uploaded_Rc_Codes NUMBER);

   TYPE Ty_Tcdrcrpt IS RECORD(
      v_Tcdrcrpt_Params     Ty_Tcdrcrpt_Params,
      v_Tctb_Rc_Exec_Master Ty_Tb_v_Tctb_Rc_Exec_Master,
      v_Tcdrcrpt_Stats      Ty_Tcdrcrpt_Stats);

   FUNCTION Fn_Process_Request(p_Action_Code IN VARCHAR2) RETURN BOOLEAN;

END Tcpks_Tcdrcrpt_Main;
/
Create or Replace Synonym Tcpkss_Tcdrcrpt_Main for Tcpks_Tcdrcrpt_Main;
/