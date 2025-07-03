CREATE OR REPLACE PACKAGE  olpk_modulus
AS
/*---------------------------------------------------------------------------------
**
** File Name	: olpk_modulus.SPC
**
** Module		: PAYMENTS
**
This source is part of the Oracle Banking Corporate Lending  Software Product.   
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.

----------------------------------------------------------------------------------------
*/
FUNCTION fn_unmask
	(
	p_string 	VARCHAR2,
	p_mask 		VARCHAR2
	)
RETURN VARCHAR2;

FUNCTION FN_MOD_10
	(
	p_number	NUMBER
	)
RETURN BOOLEAN;

FUNCTION FN_MOD_11
	(
	p_number	NUMBER
	)
RETURN BOOLEAN;

FUNCTION FN_MOD_11_POWER_2
	(
	p_number 	NUMBER
	)
RETURN BOOLEAN;

END olpk_modulus;
/
CREATE OR REPLACE SYNONYM olpks_modulus FOR olpk_modulus
/