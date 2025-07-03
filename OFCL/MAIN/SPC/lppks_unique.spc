CREATE OR REPLACE PACKAGE lppks_unique  IS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: lppks_unique.SPC
**
** Module		: LOAN SYNDICATION
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

/*
------------------------------------------CHANGE HISTORY----------------------------------
FCC 4.2 FEB 2003 CITIPLC DEV
	THIS PACKAGE SPECIFICATION CATERS TO CHECKING FOR VARIOUS CONDITIONS LIKE
	UNIQUE PRODUCT CODE, ACTIVE CONTRACTS FOR THE PRODUCT AND WAS DEVELOPED ON THE LINES OF 
	THE SAME SUB-SYSTEM OF LD MODULE...
*/


	FUNCTION fn_pdtcode ( pdt_code  IN VARCHAR2) RETURN BOOLEAN ;

	FUNCTION fn_contracts_active (pdt_code IN VARCHAR2) RETURN BOOLEAN ;
End lppks_unique;
/
create or replace synonym lppkss_unique for lppks_unique
/