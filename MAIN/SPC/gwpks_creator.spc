CREATE OR REPLACE PACKAGE Gwpks_Creator AS
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
   Change Description :New XML Creator
   -------------------------------------------------------------------------------------------------------
   */

   FUNCTION Fn_Create(p_Source_Code IN VARCHAR2
                     ,p_Action_Code IN VARCHAR2 DEFAULT 'NEW'
                     ,p_Status      IN OUT VARCHAR2
                     ,p_Reply_Type  IN VARCHAR2 DEFAULT 'F'
                     ,p_Err_Code    IN OUT VARCHAR2
                     ,p_Err_Param   IN OUT VARCHAR2) RETURN BOOLEAN;
   FUNCTION Fn_Build_Header(p_Status     IN VARCHAR2
                           ,p_Header_Xml IN OUT VARCHAR2
                           ,p_Err_Code   IN OUT VARCHAR2
                           ,p_Err_Params IN OUT VARCHAR2) RETURN BOOLEAN;
END Gwpks_Creator;
/
CREATE OR REPLACE SYNONYM Gwpkss_Creator FOR Gwpks_Creator
/