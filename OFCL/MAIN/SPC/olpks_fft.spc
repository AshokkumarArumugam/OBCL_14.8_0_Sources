CREATE OR REPLACE PACKAGE olpks_fft AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_fft.SPC
**
** Module		: MESSAGES
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


	FUNCTION fn_format_msg ( pDCN IN VARCHAR2 , pNewMsg IN OUT VARCHAR2) RETURN BOOLEAN;
END olpks_fft;
/
CREATE or replace SYNONYM olpkss_fft FOR olpks_fft
/