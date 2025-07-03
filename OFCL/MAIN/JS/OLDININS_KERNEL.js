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
**  Written by         : ANUSHA SURENDRAN
**  Date of creation   : 
**  File Name          : LDDININS_KERNEL.js
**  Purpose            : Corporate_Lending_12.2.0.0.0
**  Called From        : 
**  
**  CHANGE LOG
**  Last Modified By   : Kavitha Asokan
**  Last modified on   : 23-Feb-2023
**  Full Version       : 
**  Reason             : Bug#34958820 - REDWOOD ADOPTION
****************************************************************************************************************************/
function fnPostAddRow_BLK_INS_NOTES_MASTER_KERNEL(){
	fnUpdateNoteSeqno();
}
function fnPostDeleteRow_BLK_INS_NOTES_MASTER_KERNEL(){
	fnUpdateNoteSeqno();
}
function fnPostAddRow_BLK_INS_COVERAGE_MASTER_KERNEL(){
	fnUpdateCoverageSeqno();
}
function fnPostDeleteRow_BLK_INS_COVERAGE_MASTER_KERNEL(){
	fnUpdateCoverageSeqno();
}
/*function fnPostLoad_CVS_NOTES_KERNEL()
{
	fnUpdateNoteSeqno();
	fnEnableElement(document.getElementById('BLK_INS_NOTES_MASTER'));
	//alert("called");
}
function fnPostLoad_CVS_COVERAGE_KERNEL()
{
	fnUpdateCoverageSeqno();
	fnEnableElement(document.getElementById('BLK_INS_COVERAGE_MASTER'));
	//alert("called");
}*/
function fnUpdateNoteSeqno(){
	//var cnt = document.getElementById('BLK_INS_NOTES_MASTER').tBodies[0].rows.length; //Bug#34958820 
	var cnt = getTableObjForBlock('BLK_INS_NOTES_MASTER').tBodies[0].rows.length; //Bug#34958820
	for(var i=1;i<=cnt;i++){
	   if (i == 1){
	        var blkfld = 'BLK_INS_NOTES_MASTER__NOTSEQNO';
	        var blkfldI = 'BLK_INS_NOTES_MASTER__NOTSEQNO'; Bug#34958820 
	    }
		else{
	       var blkfld = 'BLK_INS_NOTES_MASTER__NOTSEQNO'.concat(i-1);
	       var blkfldI = 'BLK_INS_NOTES_MASTER__NOTSEQNO'.concat(i-1);  Bug#34958820 
	}
	document.getElementById(blkfld).value = i;
	document.getElementById(blkfldI).value = i; Bug#34958820 
	}
}
function fnUpdateCoverageSeqno(){
	//var cnt = document.getElementById('BLK_INS_COVERAGE_MASTER').tBodies[0].rows.length; //Bug#34958820 
	var cnt = getTableObjForBlock('BLK_INS_COVERAGE_MASTER').tBodies[0].rows.length; //Bug#34958820 
	for(var i=1;i<=cnt;i++){
	   if (i == 1){
	        var blkfld = 'BLK_INS_COVERAGE_MASTER__CVRGSEQNO';
	        var blkfldI = 'BLK_INS_COVERAGE_MASTER__CVRGSEQNO'; Bug#34958820
	    }
		else{
	       var blkfld = 'BLK_INS_COVERAGE_MASTER__CVRGSEQNO'.concat(i-1);
	       var blkfldI = 'BLK_INS_COVERAGE_MASTER__CVRGSEQNO'.concat(i-1); Bug#34958820
	}
	document.getElementById(blkfld).value = i;
	document.getElementById(blkfldI).value = i; Bug#34958820
	}
}
