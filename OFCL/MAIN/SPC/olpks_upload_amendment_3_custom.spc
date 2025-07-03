CREATE OR REPLACE PACKAGE olpks_upload_amendment_3_custom AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_upload_amendment_3_custom.SPC
**
** Module		: Oracle Lending
**
	This source is part of the Oracle Flexcube Corporate Lending  Software Product.   
	Copyright © 2024 , Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/

/*----------------------------------CHANGE HISTORY----------------------------------
  Date               : 05-Jan-2024
  Changed By         : Balaji Gopal
  Change Description : Pre /Post Hook functions are created which are invoked in the Olpks_Upload_Amendment_3.Fn_Custchange_Reversal
  Search String      : Bug#36145641
------------------------------------END CHANGE HISTORY-------------------------------------
*/


  -- Bug#36145641 Starts Here
  FUNCTION Fn_Pre_Custchange_Reversal(p_crn            IN VARCHAR2,
                                      p_event_no       IN NUMBER,
                                      p_new_customer   IN VARCHAR2,
                                      p_oldmis_rec     IN oltbs_class_mapping%ROWTYPE,
                                      p_err_code       IN OUT VARCHAR2,
                                      p_err_param      IN OUT VARCHAR2)
  RETURN BOOLEAN;

  FUNCTION Fn_Post_Custchange_Reversal(p_crn            IN VARCHAR2,
                                       p_event_no       IN NUMBER,
                                       p_new_customer   IN VARCHAR2,
                                       p_oldmis_rec     IN oltbs_class_mapping%ROWTYPE,
                                       p_err_code       IN OUT VARCHAR2,
                                       p_err_param      IN OUT VARCHAR2)
  RETURN BOOLEAN;
  -- Bug#36145641 Ends Here

END olpks_upload_amendment_3_custom;
/
CREATE or replace SYNONYM olpkss_upload_amendment_3_custom FOR olpks_upload_amendment_3_custom
/