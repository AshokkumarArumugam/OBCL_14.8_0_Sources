/*----------------------------------------------------------------------------------------------------
**
** File Name    : STDCRPOL.js
**
** Module       : FCJWeb
**
** This source is part of the FLEXCUBE Corporate - Corporate Banking
** Software System and is copyrighted byOracle Financial Services Software Limited.

** All rights reserved.  No part of this work may be reproduced,
** stored in a retrieval system, adopted or transmitted in any form
** or by any means, electronic, mechanical, photographic, graphic,
** optic recording or otherwise, translated in any language or
** computer language, without the prior written permission  from  Oracle Financial Services
** Software  Limited.

**Oracle Financial Services Software Limited.,
** 10-11, SDF I, SEEPZ, Andheri (East),
** MUMBAI - 400 096.
** INDIA.

---------------------------------------------------------------------------------------------------- 

*/
//------------------------------------------------------------------------------
// VARIABLE DECLARATIONS
//------------------------------------------------------------------------------

function fnPostCopy_KERNEL() {
	debugs( "In fnPostCopy", "A");
	document.getElementById("BLK_COLLATERALS_POOL__POOL_CODE").value = "";
	document.getElementById("BLK_COLLATERALS_POOL__POOL_DESCRIPTION").value = "";
	return true;
	
 }
