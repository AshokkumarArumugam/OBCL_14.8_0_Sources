CREATE OR REPLACE PACKAGE Cspks_Creator AS
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
   -------------------------------------------------------------------------------------------------------
    CHANGE HISTORY
    SFR No                   :Revamped Version
    Changed By             :Radha
    Change Description  :Code Cleaned Up

   -------------------------------------------------------------------------------------------------------
   */

   FUNCTION Fn_Create(p_Source_Code IN VARCHAR2
                     ,p_Action_Code IN VARCHAR2 DEFAULT 'NEW'
                     ,p_Status      IN OUT VARCHAR2
                     ,p_Reply_Type  IN VARCHAR2 DEFAULT 'F'
                     ,p_Err_Code    IN OUT VARCHAR2
                     ,p_Err_Param   IN OUT VARCHAR2
                     ,p_Audit_Flag  IN VARCHAR2 DEFAULT 'N') RETURN BOOLEAN; --Audit trail changes
   FUNCTION Fn_Build_Header(p_Status     IN VARCHAR2
                           ,p_Header_Xml IN OUT VARCHAR2
                           ,p_Err_Code   IN OUT VARCHAR2
                           ,p_Err_Param  IN OUT VARCHAR2) RETURN BOOLEAN;

   FUNCTION Fn_Build_Field_Tag(p_Function_Id IN VARCHAR2
                              ,p_Field_Tag   IN OUT NOCOPY CLOB
                              ,p_Err_Code    IN OUT VARCHAR2
                              ,p_Err_Param   IN OUT VARCHAR2) RETURN BOOLEAN;
   FUNCTION Fn_Create_Error_Warning_Nodes(p_Status        IN VARCHAR2
                                         ,p_Type          IN VARCHAR2
                                         ,p_Append_To_Res IN BOOLEAN
                                         ,p_Err_Nodes     IN OUT NOCOPY CLOB
                                         ,p_Err_Code      IN OUT VARCHAR2
                                         ,p_Err_Param     IN OUT VARCHAR2) RETURN BOOLEAN;
END Cspks_Creator;
/
Create Or Replace Synonym Cspkss_Creator for Cspks_Creator
/
