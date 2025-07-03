/*------------------------------------------------------------------------------------------
** This source is part of the Oracle BANKING Software Product.
** Copyright (R) 2019-2021, Oracle and/or its affiliates.  All rights reserved.
** 												
** No part of this work may be reproduced, stored in a retrieval system,
** adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise,
** translated in any language or computer language,
** without the prior written permission of Oracle and/or its affiliates.
** 
** 
** Oracle Financial Services Software Limited.
** Oracle Park, Off Western Express Highway,
** Goregaon (East),
** Mumbai - 400 063, India.
------------------------------------------------------------------------------------------
*/
/*
**  
**  Written by         : 
**  Date of creation   : 
**  File Name          : MSDHPROF_KERNEL.js
**  Purpose            : 
**  Called From        : 

****************************************************************************************************************************/

function fnPostNew_KERNEL() {
	document.getElementById('BLK_HTTP_HEADER_PROFILE_MASTER__HOST_CODE').value = mainWin.HostCode;
	return true;
}

function fnPostEnterQuery_KERNEL() {	
	document.getElementById('BLK_HTTP_HEADER_PROFILE_MASTER__HOST_CODE').value = mainWin.HostCode;
	return true;
}

function fnPostCopy_KERNEL() {	
	document.getElementById('BLK_HTTP_HEADER_PROFILE_MASTER__HOST_CODE').value = mainWin.HostCode;
	return true;
}