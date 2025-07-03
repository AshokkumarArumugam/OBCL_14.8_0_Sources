CREATE OR REPLACE PACKAGE olpks_settlement_upload
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name    : olpks_settlement_upload.SPC
**
** Module       : SECURITIES
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

FUNCTION	fn_settlement_upload
		(p_source_code	IN		cotms_source.source_code%TYPE,
		p_err_code		IN OUT	varchar2,
		p_err_params	IN OUT	varchar2)
RETURN boolean;

END olpks_settlement_upload;
/
CREATE or replace SYNONYM olpkss_settlement_upload for olpks_settlement_upload
/