CREATE OR REPLACE PACKAGE lfpks_lfctrchg_utils_custom AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: lfpks_lfctrchg_utils_custom.SPC
**
** Module		: Oracle Lending
**
	This source is part of the Oracle Flexcube Corporate Lending  Software Product.   
	Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/

  FUNCTION Fn_Upload(p_Source           IN Cotms_Source.Source_Code%TYPE,
                     p_Module           IN VARCHAR2,
                     p_Action_Code      IN VARCHAR2,
                     p_Function_Id      IN VARCHAR2,
                     p_Product_Code     IN VARCHAR2,
                     p_Fcc_Ref          IN VARCHAR2,
                     p_Event_Seq_No     IN VARCHAR2,
                     p_wrk_lfctrchg     IN OUT lfpks_lfctrchg_main.ty_lfctrchg,
					 p_fn_call_id       IN NUMBER,
					 p_Tb_Custom_data   IN OUT GLOBAL.Ty_Tb_Custom_Data,
                     p_Err_Code         IN OUT VARCHAR2,
                     p_Err_Params       IN OUT VARCHAR2) 
  RETURN BOOLEAN;


END lfpks_lfctrchg_utils_custom;
/


CREATE or replace SYNONYM lfpkss_lfctrchg_utils_custom FOR lfpks_lfctrchg_utils_custom
/