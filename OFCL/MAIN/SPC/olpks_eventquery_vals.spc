CREATE OR REPLACE PACKAGE olpks_eventquery_vals IS
  /*------------------------------------------------------------------------------------------
  ** This source is part of the Oracle Banking Software Product.
  ** Copyright © 2011 - 2013  Oracle and/or its affiliates.  All rights reserved.
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
  ----------------------------------------------------------------------------------------*/

  FUNCTION Fn_Eventquery_Validate(p_Fccref    IN VARCHAR2,
                                  p_Esn       IN NUMBER,
                                  p_Parentfid IN VARCHAR2,
                                  p_Err_Code  IN OUT VARCHAR2,
                                  p_Err_Param IN OUT VARCHAR2) RETURN BOOLEAN;

END olpks_eventquery_vals;
/