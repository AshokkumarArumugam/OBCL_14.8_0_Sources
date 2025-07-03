CREATE OR REPLACE PACKAGE Tcpks_Base_Migration AS

   /*-----------------------------------------------------------------------------------------------------
   **
   ** File Name  : Tcpks_Base_Migration.spc
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
   FUNCTION Fn_Migrate_From_Base(p_Release_Code IN VARCHAR2) RETURN BOOLEAN;

END Tcpks_Base_Migration;
/
CREATE OR REPLACE SYNONYM Tcpkss_Base_Migration FOR Tcpks_Base_Migration;
/