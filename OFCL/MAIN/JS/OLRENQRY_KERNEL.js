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
**Changed By         : Gomathi G
**Date               : 14-MAY-2021
**Change Description : Asigning mainWin.AppDate to format the date as per user preference 
**Search String      : Bug#31400838 
****************************************************************************************************************************/

/*
 * Called to perform some neccessary operation after the fnNew() Window event
 * Specific to the functionid
 */
// Bug#31400838 starts
function fnPostLoad_KERNEL()
{
	document.getElementById("BLK_REPORT__PRM_PROJDATE").value = mainWin.AppDate;
	fireHTMLEvent(document.getElementById("BLK_REPORT__PRM_PROJDATE"),"onpropertychange");
	return true; 
}

//Bug#31400838 ends
