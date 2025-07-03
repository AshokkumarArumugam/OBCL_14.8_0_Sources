CREATE OR REPLACE PACKAGE RDPKS_REQ_ROUTER AS
   /*-----------------------------------------------------------------------------------------------------
   **
   ** File Name  : Rdpks_Req_Router.spc
   **
   ** Module     : RAD Tool
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
   
   SFR No             :Initial Version
   Changed By         :
   Change Description :
   
   -------------------------------------------------------------------------------------------------------
   */

   PROCEDURE Pr_Create_Clob(p_Clob OUT CLOB);
   PROCEDURE Pr_Reset_Pkg;
   PROCEDURE Pr_Process_Req_Msg(p_Req_Xml  IN CLOB
                               ,p_Rad_Xml  IN CLOB
                               ,p_Res_Xml  IN OUT CLOB
                               ,p_Res_Clob IN OUT CLOB
                               ,p_Status   IN OUT VARCHAR2);

END rdpks_req_router;
/
CREATE OR REPLACE SYNONYM rdpkss_req_router FOR rdpks_req_router;
/

 