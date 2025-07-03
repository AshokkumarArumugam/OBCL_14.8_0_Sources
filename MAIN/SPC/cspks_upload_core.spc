CREATE OR REPLACE PACKAGE cspks_upload_core AS
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

-------------------------------------------------------------------------------
    g_halt_on_exception     EXCEPTION;

    g_halt_error_code       varchar2(1000) := NULL;
    g_halt_error_parameter      varchar2(1000) := NULL;
-------------------------------------------------------------------------------
   --KERNEL 8.0 CHANGES
    TYPE ty_tb_source_pref IS TABLE OF cotms_source_pref%ROWTYPE INDEX BY VARCHAR2(30);
    --KERNEL 8.0 CHANGES

FUNCTION fn_what_to_do
    (
    p_action_on_override    IN  char, -- R/H/P
    p_action_on_exception   IN  char, -- R/H
    p_status_on_save    IN  char, -- H/U/A
    p_what_to_do        OUT     char, -- R/H/P
    p_auth_status       OUT char, -- U/A
    p_error_code        IN OUT  varchar2,
    p_error_parameter   IN OUT  varchar2
    )
    RETURN boolean;


 --KERNEL 8.0 CHANGES
    FUNCTION fn_what_to_do(p_source          IN VARCHAR2,
                           p_module          IN VARCHAR2,
                           p_what_to_do      OUT CHAR, -- R/H/P
                           p_auth_status     OUT CHAR, -- U/A
                           p_error_code      IN OUT VARCHAR2,
                           p_error_parameter IN OUT VARCHAR2) RETURN BOOLEAN;



  FUNCTION Fn_Get_Source_Details(p_Module                  IN cotm_source_pref.MODULE_CODE%TYPE,
                                 p_Source_Code             IN cotm_source_pref.Source_Code%TYPE,
                                 p_Action_On_Override      OUT CHAR,
                                 p_Action_On_Exception     OUT CHAR,
                                 p_Action_On_Upload_Status OUT CHAR
                                 ) RETURN BOOLEAN;



    --KERNEL 8.0 CHANGES
	    --Bug#21320116 changes start
PROCEDURE pr_init ( p_source    IN VARCHAR2 ,
                    p_function_id   IN VARCHAR2 ) ;
    --Bug#21320116 changes ends
   
END cspks_upload_core;
/
create or replace synonym cspkss_upload_core for cspks_upload_core
/