CREATE OR REPLACE PACKAGE olpks_bo_conv
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name    : olpks_bo_conv.SPC
**
** Module       : CORE
**
This source is part of the Oracle Banking Corporate Lending  Software Product.
Copyright ? 2019 , Oracle and/or its affiliates.  All rights reserved.
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates.

Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East),
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
/*
CHANGE HISTORY

21-MAY-2002 FCC4.0 JUNE 2002 PLNCITI TIL #100801 Added overloaded functions fn_convert,fn_convert_1..Bsk

*/




FUNCTION fn_convert
	(
	pBranch 		IN		VARCHAR2,
	pCcy1 			IN 		VARCHAR2,
	pCcy2 			IN 		VARCHAR2,
	pAmount1 		IN 		NUMBER,
	pRounding		IN		VARCHAR2
	)
	RETURN NUMBER;


FUNCTION fn_convert
	(
	pBranch 		IN		VARCHAR2,
	pFinCycle		IN		VARCHAR2,
	pPeriodCode		IN		VARCHAR2,
	pCcy1 			IN 		VARCHAR2,
	pCcy2 			IN 		VARCHAR2,
	pAmount1 		IN 		NUMBER,
	pRounding		IN		VARCHAR2
	)
	RETURN NUMBER;


--FCC4.0 JUNE 2002 PLNCITI TIL #100801 Added overloaded functions fn_convert,fn_convert_1..Starts..Bsk
FUNCTION fn_convert
	(
	pBranch 		IN		VARCHAR2,
	pCcy1 			IN 		VARCHAR2,
	pCcy2 			IN 		VARCHAR2,
	pdate			IN		DATE,
	pAmount1 		IN 		NUMBER,
	pRounding		IN		VARCHAR2
	)
	RETURN NUMBER;


FUNCTION fn_convert_1
	(
	pBranch 		IN		VARCHAR2,
	pCcy1 			IN 		VARCHAR2,
	pCcy2 			IN 		VARCHAR2,
	pdate			IN		DATE,
	pRounding		IN		VARCHAR2
	)
	RETURN NUMBER;

FUNCTION fn_convert_1
	(
	pCcy1 			IN 		VARCHAR2,
	pCcy2 			IN 		VARCHAR2,
	pamount1		IN		NUMBER,
	pamount2		IN		NUMBER
	)
	RETURN NUMBER;


--FCC4.0 JUNE 2002 PLNCITI TIL #100801 Added overloaded functions fn_convert,fn_convert_1 ..Ends..Bsk

END olpks_bo_conv;
/
CREATE OR REPLACE SYNONYM olpks_bo_convs FOR olpks_bo_conv
/
CREATE OR REPLACE SYNONYM olpkss_bo_conv FOR olpks_bo_conv
/