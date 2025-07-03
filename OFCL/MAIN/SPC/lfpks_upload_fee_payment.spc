CREATE OR REPLACE PACKAGE lfpks_upload_fee_payment AS

/*----------------------------------------------------------------------------------------------------
**
** File Name   : lfpks_upload_fee_payment.SPC
**
**Module       : CF
**
This source is part of the Oracle Banking Corporate Lending  Software Product.   
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
/*------------------------------------------------------------------------------
CHANGE HISTORY
23-May-2009 FLEXCUBE V.CL Release 7.5 lot2 FS Tag23 - fee payment upload
------------------------------------------------------------------------------
*/

FUNCTION fn_upload_for_a_branch
	(
	p_source_code		IN		oltbs_ext_contract_stat.source%TYPE,
 	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2,
	p_ext_contract_ref_no	IN		lftbs_upload_cont_liq_summary.ext_contract_ref_no%TYPE default '%'
	)
	RETURN BOOLEAN;

END lfpks_upload_fee_payment;
/
CREATE or replace SYNONYM lfpkss_upload_fee_payment FOR lfpks_upload_fee_payment
/