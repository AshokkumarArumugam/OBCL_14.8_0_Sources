CREATE OR REPLACE PACKAGE gipks_in_pkg_generator_custom AS
/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright © 2013 - 2022 Oracle and/or its affiliates.  All rights reserved.
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
-------------------------------------------------------------------------------------
CHANGE HISTORY

New package

Created By         : Akshada Muneshwar
Created On         : 19-Dec-2018
Created Reason     : Hook has been provided at the beginning of the function Fn_Create_External_Tables
Search String      : Bug#29124530

Created By         : Karthik V
Created On         : 02-Feb-2022
Created Reason     : FCUBS_14.6 Autonomous Database impact GI changes
Search String      : Bug_33960935_FCUBS_14.6 Autonomous Database impact GI changes
--------------------------------------------------------------------------------------------------------
*/
---Bug#29124530 starts----
  FUNCTION Fn_Create_External_Tables(p_Interface_Code IN VARCHAR2,
                                     p_File_Name      IN VARCHAR2,
                                     Act_File_Name    IN VARCHAR2,
                                     p_Err_Code       IN OUT VARCHAR,
                                     p_Err_Params     IN OUT VARCHAR,
									 p_fn_call_id         IN NUMBER,
					                 p_tb_custom_Data     IN OUT GLOBAL.Ty_Tb_custom_Data)
RETURN BOOLEAN;
----Bug#29124530 ends---
--Bug_33960935_FCUBS_14.6 Autonomous Database impact GI changes Starts
  FUNCTION Fn_Create_External_Tables_Uri(p_Interface_Code IN VARCHAR2,
                                     p_File_Name      IN VARCHAR2,
                                     Act_File_Name    IN VARCHAR2,
                                     p_Err_Code       IN OUT VARCHAR,
                                     p_Err_Params     IN OUT VARCHAR,
									 p_fn_call_id         IN NUMBER,
					                 p_tb_custom_Data     IN OUT GLOBAL.Ty_Tb_custom_Data)
RETURN BOOLEAN;
--Bug_33960935_FCUBS_14.6 Autonomous Database impact GI changes Ends
END gipks_in_pkg_generator_custom;
/
CREATE OR REPLACE SYNONYM gipkss_in_pkg_generator_custom FOR gipks_in_pkg_generator_custom
/