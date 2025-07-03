CREATE OR REPLACE PACKAGE olpks_product_utility
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_product_utility.SPC
**
** Module		: LOANS and DEPOSITS
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.

Copyright © 1997-2001 by i-flex solutions limited.
----------------------------------------------------------------------------------------------------
*/


FUNCTION fn_generate_entry
	(
	p_product		IN	oltms_product.product_code%TYPE,
	p_error_code		IN OUT	varchar2,	
	p_error_parameter	IN OUT	varchar2
	)
	RETURN boolean;

END olpks_product_utility;
/
CREATE or replace SYNONYM olpkss_product_utility FOR olpks_product_utility
/