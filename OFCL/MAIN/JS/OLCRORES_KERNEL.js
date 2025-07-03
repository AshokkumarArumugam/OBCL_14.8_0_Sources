/***************************************************************************************************************************
**  This source is part of the FLEXCUBE Software Product. 
**  Copyright (c) 2008 ,2016, Oracle and/or its affiliates.
**  All rights reserved.
**  
**  No part of this work may be reproduced, stored in a retrieval system, 
**  adopted or transmitted in any form or by any means, electronic, mechanical, photographic, 
**  graphic, optic recording or otherwise, translated in any language or computer language, 
**  without the prior written permission of Oracle and/or its affiliates.
**  
**  Oracle Financial Services Software Limited.
**  Oracle Park, Off Western Express Highway,
**  Goregaon (East),
**  Mumbai - 400 063,
**  India.
**  
**  Written by         : 
**  Date of creation   : 
**  File Name          : OLCRORES_KERNEL.js
**  Purpose            : 
**  Called From        : 

****************************************************************************************************************************/
var lAction; 
function fnPostLoad_CVS_ROLRESD_KERNEL(screenArgs){	
	document.getElementById('cmdAddRow_BLK_OLTB_CONTRACT_LIQ_RESD').style.visibility='hidden';
	document.getElementById('cmdDelRow_BLK_OLTB_CONTRACT_LIQ_RESD').style.visibility='hidden';	
	return true;
}

