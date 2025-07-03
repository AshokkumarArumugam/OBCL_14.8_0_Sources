CREATE OR REPLACE PACKAGE Gwpks_Parser AS
   /*------------------------------------------------------------------------------------------
   **
   ** This source is part of the Oracle FLEXCUBE Software Product.
   ** Copyright (R) 2016 , Oracle and/or its affiliates.  All rights reserved
   **
   **
   ** No part of this work may be reproduced, stored in a retrieval system, adopted
   ** or transmitted in any form or by any means, electronic, mechanical,
   ** photographic, graphic, optic recording or otherwise, translated in any
   ** language or computer language, without the prior written permission of
   ** Oracle and/or its affiliates.
   **
   ** Oracle Financial Services Software Limited.
   ** Oracle Park, Off Western Express Highway,
   ** Goregaon (East),
   ** Mumbai - 400 063, India
   ** India
------------------------------------------------------------------------------------------
*/
/*
---------------------------------------------------------------------------------------------------
   CHANGE HISTORY
   SFR No             :Initial Version
   Changed By         :Radha
   Change Description :New XML Parser
   -------------------------------------------------------------------------------------------------------
   */

   FUNCTION Fn_Parser(p_Source_Code IN VARCHAR2
                     ,p_Err_Code    IN OUT VARCHAR2
                     ,p_Err_Param   IN OUT VARCHAR2) RETURN BOOLEAN;

END Gwpks_Parser;
/
CREATE OR REPLACE SYNONYM Gwpkss_Parser FOR Gwpks_Parser
/