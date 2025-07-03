CREATE OR REPLACE PACKAGE GIPKS_OUT_PKG_GENERATOR IS
  /*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright © 2016  Oracle and/or its affiliates.  All rights reserved.
** 												
** No part of this work may be reproduced, stored in a retrieval system,
** adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise,
** translated in any language or computer language,
** without the prior written permission of Oracle and/or its affiliates.
** 
** 
** Oracle Financial Services Software Limited.
** Oracle Park, Off Western Express Highway,
** Goregaon (East),
** Mumbai - 400 063, India.
------------------------------------------------------------------------------------------
*/
/*
  -------------------------------------------------------------------------------------------------------
  CHANGE HISTORY

  SFR Number         :
  Changed By         :
  Change Description :

  -------------------------------------------------------------------------------------------------------
  */

  -- Purpose : TO GENERATE OUTGOING GI PACKAGE

  -- Public type declarations
  FUNCTION FN_GENERATE_PKG(p_source     cotms_source.source_code%TYPE,
                           p_branch     IN GITM_INTERFACE_DEFINITION.branch_code%TYPE,
                           p_ext_system IN GITM_INTERFACE_DEFINITION.external_system%TYPE,
                           p_intf_code  IN GITM_INTERFACE_DEFINITION.interface_code%TYPE,
                           p_err_code   IN OUT VARCHAR2,
                           p_err_params IN OUT VARCHAR2)

   RETURN BOOLEAN;

  FUNCTION Fn_Drop_Pkg(p_source     cotms_source.source_code%TYPE,
                       p_branch     IN GITM_INTERFACE_DEFINITION.branch_code%TYPE,
                       p_ext_system IN GITM_INTERFACE_DEFINITION.external_system%TYPE,
                       p_intf_code  IN GITM_INTERFACE_DEFINITION.interface_code%TYPE,
                       p_err_code   IN OUT VARCHAR2,
                       p_err_params IN OUT VARCHAR2) RETURN BOOLEAN;

END GIPKS_OUT_PKG_GENERATOR;
/