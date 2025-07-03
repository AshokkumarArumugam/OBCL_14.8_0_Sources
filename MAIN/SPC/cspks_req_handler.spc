CREATE OR REPLACE PACKAGE Cspks_Req_Handler AS
   /*------------------------------------------------------------------------------------------
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
   -------------------------------------------------------------------------------------------------------
   CHANGE HISTORY

   SFR No                   :Revamped Version
   Changed By               :Radha
   Change Description       :Code Cleaned Up

   -------------------------------------------------------------------------------------------------------
   */

   FUNCTION Fn_Process_Msg(p_Request_No IN NUMBER
                          ,p_Status     IN OUT VARCHAR2
                          ,p_Err_Code   IN OUT VARCHAR2
                          ,p_Err_Param  IN OUT VARCHAR2) RETURN BOOLEAN;

END Cspks_Req_Handler;
/
Create or Replace Synonym Cspkss_Req_Handler for Cspks_Req_Handler
/
