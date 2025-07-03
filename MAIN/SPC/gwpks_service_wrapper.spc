CREATE OR REPLACE PACKAGE Gwpks_Service_Wrapper AS
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

   SFR No             :Initial Version
   Changed By         :Radha
   Change Description :New Service Package

   -------------------------------------------------------------------------------------------------------
   */

   FUNCTION Fn_Process_Msg(p_Request_No  IN NUMBER
                          ,p_Header      IN OUT Gwpks_Service_Router.Ty_Header
                          ,p_Addl_Header IN OUT Gwpks_Service_Router.Ty_Header
                          ,p_Status      IN OUT VARCHAR2
                          ,p_Err_Code    IN OUT VARCHAR2
                          ,p_Err_Param   IN OUT VARCHAR2) RETURN BOOLEAN;

END Gwpks_Service_Wrapper;
/
Create Or Replace Synonym Gwpkss_Service_Wrapper for Gwpks_Service_Wrapper
/
