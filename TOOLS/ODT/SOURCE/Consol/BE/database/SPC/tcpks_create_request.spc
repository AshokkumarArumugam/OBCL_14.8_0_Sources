CREATE OR REPLACE PACKAGE TCPKS_CREATE_REQUEST AS
   /*-----------------------------------------------------------------------------------------------------
   **
   ** File Name  : Tcpks_Create_Request.spc
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
   FUNCTION Fn_Create(p_Tc_Code          IN VARCHAR2
                     ,p_Req_Xnl_Type     IN VARCHAR2
                     ,p_Action_On_Ovd    IN VARCHAR2
                     ,p_Auto_Auth        IN VARCHAR2
                     ,p_Exchange_Pattern IN VARCHAR2
                     ,p_Request          IN OUT NOCOPY CLOB) RETURN BOOLEAN;
END tcpks_create_request;
/
CREATE OR REPLACE SYNONYM  tcpkss_create_request FOR tcpks_create_request;
/