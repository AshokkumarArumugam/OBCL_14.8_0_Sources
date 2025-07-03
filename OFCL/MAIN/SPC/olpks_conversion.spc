create or replace package olpks_conversion
is
/*
--------------------------------------------------------------------------------------------------------
**
** File Name  : olpks_conversion.SPC
**
** Module   : COVNERSION
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
   
/*Change history
--08-DEC-2011 CITIUS-LS#12038 CFPI - Conversion related changes.
--This package has been created for CFPI conversion
05-SEP-2012 EURCITIPLC#14747: Added conversion_src to be added in stubs for two conversions at 
in the same environemtn
*/


	conversion		varchar2(1)	:=	'N';
	conversion_src          varchar2(35);
	function fn_summa(	a	varchar2)return boolean;
end olpks_conversion; 
/