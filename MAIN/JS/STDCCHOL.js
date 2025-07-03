/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright © 2011 - 2015  Oracle and/or its affiliates.  All rights reserved.
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
--------------------------------------------------------------------------------------------
 Caution Don't Delete this. This is used by the Version control utility.

    ********************************** START OF LOG HISTORY **************************************
    $Log: Template.js.v $
    Revision 1.2  2005/02/22 09:30:48  IDSENTHILL
    1.2:Relesing to vercon

    Revision 1.1.1.0  2005/02/22 09:02:34  IDSENTHILL
    All the preAction functions should return a flag indicating the caller to proceed or not.

    Revision 1.1  2005/02/08 12:33:59  IDSENTHILL
    1.1:Relesing to vercon

    Revision 1.0.1.0  2005/02/07 07:39:16  IDSENTHILL
    Usage of AVCS Begin.

    Revision 1.0  2005/02/02 08:10:26  IDSENTHILL
    Initial Checkin
	
    Modified by : SIDDHARTHAP
    Modified Reason : FCUBS11.1 ITR1 SFR#259 (CB Changes)
    Search String : FCUBS11.1 SFR#259

	Modified by : Dolly Chopra
    Modified Reason :FCUBS11.2,ITR2 Cross Browser Changes
    Search String : FC11.2,ITR2 SFR512
	
	Modified by 	: Satyakam Jena
    Modified Reason : FCUBS11.3,ITR1 Cross Browser Changes
    Search String 	: Bug#11932847 
	
    Modified by 	: Karan Gaba
    Modified Reason : FCUBS 11.4 ITR1 holidays are not getting displayed with proper colour
    Search String 	: FCUBS 11.4 ITR1 SFR#13340747 
	
**  Modified by       : Geeta Adhikari
**  Modified Reason   : Bug#21066833
**  Search String     : FCUBS_12.1.0_21066833

	Changed By      	: Vrishti Ghosh
	Modified on     	: 24-Jan-2017
	Description     	: Issue: NOT ABLE TO IDENTIFY ALREADY MARKED CCY HOLIDAYS AFTER UNLOCK 
							Fix: The displayCalendar() function was not getting called after unlocking the record. Hence the calendar was not getting displayed in proper color format.
						  Added the call for the same in fnPostFocus_KERNEL()
	Search string   	: RETRO_12_3_25436193
	
**  Modified By         : Ambika Selvaraj
**  Modified On         : 27-Oct-2017
**  Modified Reason     : STDCCHOL - Changes in CCY holiday calendar don't provide an audit trail/changes list during Authorization 
**  Search String       : 9NT1606_12_4_RETRO_12_3_26524831

    ********************************** END   OF LOG HISTORY **************************************

*/
//------------------------------------------------------------------------------
// VARIABLE DECLARATIONS
//------------------------------------------------------------------------------

var fcjRequestDOM;
var fcjResponseDOM;
var isDisplayVisited = false;
var gErrCodes = "";
var curYear;
var gCCYRef         = null;
var gYearRef           = null;
var gWeeklyHol1        = 0;
var gWeeklyHol2        = 6;
var gCSSReadOnly    = "TextReadonly";
var gCSSHoliday        = "TextHoliday";
var gLblYearOf;
var monthNames    = new Array(12);
var temporary = '';
monthNames[0]    = "JAN";
monthNames[1]     = "FEB";
monthNames[2]     = "MAR";
monthNames[3]     = "APR";
monthNames[4]     = "MAY";
monthNames[5]     = "JUN";
monthNames[6]     = "JUL";
monthNames[7]     = "AUG";
monthNames[8]     = "SEP";
monthNames[9]     = "OCT";
monthNames[10]     = "NOV";
monthNames[11]     = "DEC";
var gyearValue    = "";
var gCcyReference = "";
var gIsUnlock = false;
var gModified = '#1f77FF'; //9NT1606_12_4_RETRO_12_3_26524831 
amendArr[0] = "STTMS_CCY_HOL_MASTER__JAN_0_0";
amendArr[1] = "STTMS_CCY_HOL_MASTER__JAN_0_1";
amendArr[2] = "STTMS_CCY_HOL_MASTER__JAN_0_2";
amendArr[3] = "STTMS_CCY_HOL_MASTER__JAN_0_3";
amendArr[4] = "STTMS_CCY_HOL_MASTER__JAN_0_4";
amendArr[5] = "STTMS_CCY_HOL_MASTER__JAN_0_5";
amendArr[6] = "STTMS_CCY_HOL_MASTER__JAN_0_6";
amendArr[7] = "STTMS_CCY_HOL_MASTER__JAN_1_0";
amendArr[8] = "STTMS_CCY_HOL_MASTER__JAN_1_1";
amendArr[9] = "STTMS_CCY_HOL_MASTER__JAN_1_2";
amendArr[10] = "STTMS_CCY_HOL_MASTER__JAN_1_3";
amendArr[11] = "STTMS_CCY_HOL_MASTER__JAN_1_4";
amendArr[12] = "STTMS_CCY_HOL_MASTER__JAN_1_5";
amendArr[13] = "STTMS_CCY_HOL_MASTER__JAN_1_6";
amendArr[14] = "STTMS_CCY_HOL_MASTER__JAN_2_0";
amendArr[15] = "STTMS_CCY_HOL_MASTER__JAN_2_1";
amendArr[16] = "STTMS_CCY_HOL_MASTER__JAN_2_2";
amendArr[17] = "STTMS_CCY_HOL_MASTER__JAN_2_3";
amendArr[18] = "STTMS_CCY_HOL_MASTER__JAN_2_4";
amendArr[19] = "STTMS_CCY_HOL_MASTER__JAN_2_5";
amendArr[20] = "STTMS_CCY_HOL_MASTER__JAN_2_6";
amendArr[21] = "STTMS_CCY_HOL_MASTER__JAN_3_0";
amendArr[22] = "STTMS_CCY_HOL_MASTER__JAN_3_1";
amendArr[23] = "STTMS_CCY_HOL_MASTER__JAN_3_2";
amendArr[24] = "STTMS_CCY_HOL_MASTER__JAN_3_3";
amendArr[25] = "STTMS_CCY_HOL_MASTER__JAN_3_4";
amendArr[26] = "STTMS_CCY_HOL_MASTER__JAN_3_5";
amendArr[27] = "STTMS_CCY_HOL_MASTER__JAN_3_6";
amendArr[28] = "STTMS_CCY_HOL_MASTER__JAN_4_0";
amendArr[29] = "STTMS_CCY_HOL_MASTER__JAN_4_1";
amendArr[30] = "STTMS_CCY_HOL_MASTER__JAN_4_2";
amendArr[31] = "STTMS_CCY_HOL_MASTER__JAN_4_3";
amendArr[32] = "STTMS_CCY_HOL_MASTER__JAN_4_4";
amendArr[33] = "STTMS_CCY_HOL_MASTER__JAN_4_5";
amendArr[34] = "STTMS_CCY_HOL_MASTER__JAN_4_6";
amendArr[35] = "STTMS_CCY_HOL_MASTER__JAN_5_0";
amendArr[36] = "STTMS_CCY_HOL_MASTER__JAN_5_1";
amendArr[37] = "STTMS_CCY_HOL_MASTER__JAN_5_2";
amendArr[38] = "STTMS_CCY_HOL_MASTER__JAN_5_3";
amendArr[39] = "STTMS_CCY_HOL_MASTER__JAN_5_4";
amendArr[40] = "STTMS_CCY_HOL_MASTER__JAN_5_5";
amendArr[41] = "STTMS_CCY_HOL_MASTER__JAN_5_6";
amendArr[42] = "STTMS_CCY_HOL_MASTER__FEB_0_0";
amendArr[43] = "STTMS_CCY_HOL_MASTER__FEB_0_1";
amendArr[44] = "STTMS_CCY_HOL_MASTER__FEB_0_2";
amendArr[45] = "STTMS_CCY_HOL_MASTER__FEB_0_3";
amendArr[46] = "STTMS_CCY_HOL_MASTER__FEB_0_4";
amendArr[47] = "STTMS_CCY_HOL_MASTER__FEB_0_5";
amendArr[48] = "STTMS_CCY_HOL_MASTER__FEB_0_6";
amendArr[49] = "STTMS_CCY_HOL_MASTER__FEB_1_0";
amendArr[50] = "STTMS_CCY_HOL_MASTER__FEB_1_1";
amendArr[51] = "STTMS_CCY_HOL_MASTER__FEB_1_2";
amendArr[52] = "STTMS_CCY_HOL_MASTER__FEB_1_3";
amendArr[53] = "STTMS_CCY_HOL_MASTER__FEB_1_4";
amendArr[54] = "STTMS_CCY_HOL_MASTER__FEB_1_5";
amendArr[55] = "STTMS_CCY_HOL_MASTER__FEB_1_6";
amendArr[56] = "STTMS_CCY_HOL_MASTER__FEB_2_0";
amendArr[57] = "STTMS_CCY_HOL_MASTER__FEB_2_1";
amendArr[58] = "STTMS_CCY_HOL_MASTER__FEB_2_2";
amendArr[59] = "STTMS_CCY_HOL_MASTER__FEB_2_3";
amendArr[60] = "STTMS_CCY_HOL_MASTER__FEB_2_4";
amendArr[61] = "STTMS_CCY_HOL_MASTER__FEB_2_5";
amendArr[62] = "STTMS_CCY_HOL_MASTER__FEB_2_6";
amendArr[63] = "STTMS_CCY_HOL_MASTER__FEB_3_0";
amendArr[64] = "STTMS_CCY_HOL_MASTER__FEB_3_1";
amendArr[65] = "STTMS_CCY_HOL_MASTER__FEB_3_2";
amendArr[66] = "STTMS_CCY_HOL_MASTER__FEB_3_3";
amendArr[67] = "STTMS_CCY_HOL_MASTER__FEB_3_4";
amendArr[68] = "STTMS_CCY_HOL_MASTER__FEB_3_5";
amendArr[69] = "STTMS_CCY_HOL_MASTER__FEB_3_6";
amendArr[70] = "STTMS_CCY_HOL_MASTER__FEB_4_0";
amendArr[71] = "STTMS_CCY_HOL_MASTER__FEB_4_1";
amendArr[72] = "STTMS_CCY_HOL_MASTER__FEB_4_2";
amendArr[73] = "STTMS_CCY_HOL_MASTER__FEB_4_3";
amendArr[74] = "STTMS_CCY_HOL_MASTER__FEB_4_4";
amendArr[75] = "STTMS_CCY_HOL_MASTER__FEB_4_5";
amendArr[76] = "STTMS_CCY_HOL_MASTER__FEB_4_6";
amendArr[77] = "STTMS_CCY_HOL_MASTER__FEB_5_0";
amendArr[78] = "STTMS_CCY_HOL_MASTER__FEB_5_1";
amendArr[79] = "STTMS_CCY_HOL_MASTER__FEB_5_2";
amendArr[80] = "STTMS_CCY_HOL_MASTER__FEB_5_3";
amendArr[81] = "STTMS_CCY_HOL_MASTER__FEB_5_4";
amendArr[82] = "STTMS_CCY_HOL_MASTER__FEB_5_5";
amendArr[83] = "STTMS_CCY_HOL_MASTER__FEB_5_6";
amendArr[84] = "STTMS_CCY_HOL_MASTER__MAR_0_0";
amendArr[85] = "STTMS_CCY_HOL_MASTER__MAR_0_1";
amendArr[86] = "STTMS_CCY_HOL_MASTER__MAR_0_2";
amendArr[87] = "STTMS_CCY_HOL_MASTER__MAR_0_3";
amendArr[88] = "STTMS_CCY_HOL_MASTER__MAR_0_4";
amendArr[89] = "STTMS_CCY_HOL_MASTER__MAR_0_5";
amendArr[90] = "STTMS_CCY_HOL_MASTER__MAR_0_6";
amendArr[91] = "STTMS_CCY_HOL_MASTER__MAR_1_0";
amendArr[92] = "STTMS_CCY_HOL_MASTER__MAR_1_1";
amendArr[93] = "STTMS_CCY_HOL_MASTER__MAR_1_2";
amendArr[94] = "STTMS_CCY_HOL_MASTER__MAR_1_3";
amendArr[95] = "STTMS_CCY_HOL_MASTER__MAR_1_4";
amendArr[96] = "STTMS_CCY_HOL_MASTER__MAR_1_5";
amendArr[97] = "STTMS_CCY_HOL_MASTER__MAR_1_6";
amendArr[98] = "STTMS_CCY_HOL_MASTER__MAR_2_0";
amendArr[99] = "STTMS_CCY_HOL_MASTER__MAR_2_1";
amendArr[100] = "STTMS_CCY_HOL_MASTER__MAR_2_2";
amendArr[101] = "STTMS_CCY_HOL_MASTER__MAR_2_3";
amendArr[102] = "STTMS_CCY_HOL_MASTER__MAR_2_4";
amendArr[103] = "STTMS_CCY_HOL_MASTER__MAR_2_5";
amendArr[104] = "STTMS_CCY_HOL_MASTER__MAR_2_6";
amendArr[105] = "STTMS_CCY_HOL_MASTER__MAR_3_0";
amendArr[106] = "STTMS_CCY_HOL_MASTER__MAR_3_1";
amendArr[107] = "STTMS_CCY_HOL_MASTER__MAR_3_2";
amendArr[108] = "STTMS_CCY_HOL_MASTER__MAR_3_3";
amendArr[109] = "STTMS_CCY_HOL_MASTER__MAR_3_4";
amendArr[110] = "STTMS_CCY_HOL_MASTER__MAR_3_5";
amendArr[111] = "STTMS_CCY_HOL_MASTER__MAR_3_6";
amendArr[112] = "STTMS_CCY_HOL_MASTER__MAR_4_0";
amendArr[113] = "STTMS_CCY_HOL_MASTER__MAR_4_1";
amendArr[114] = "STTMS_CCY_HOL_MASTER__MAR_4_2";
amendArr[115] = "STTMS_CCY_HOL_MASTER__MAR_4_3";
amendArr[116] = "STTMS_CCY_HOL_MASTER__MAR_4_4";
amendArr[117] = "STTMS_CCY_HOL_MASTER__MAR_4_5";
amendArr[118] = "STTMS_CCY_HOL_MASTER__MAR_4_6";
amendArr[119] = "STTMS_CCY_HOL_MASTER__MAR_5_0";
amendArr[120] = "STTMS_CCY_HOL_MASTER__MAR_5_1";
amendArr[121] = "STTMS_CCY_HOL_MASTER__MAR_5_2";
amendArr[122] = "STTMS_CCY_HOL_MASTER__MAR_5_3";
amendArr[123] = "STTMS_CCY_HOL_MASTER__MAR_5_4";
amendArr[124] = "STTMS_CCY_HOL_MASTER__MAR_5_5";
amendArr[125] = "STTMS_CCY_HOL_MASTER__MAR_5_6";
amendArr[126] = "STTMS_CCY_HOL_MASTER__APR_0_0";
amendArr[127] = "STTMS_CCY_HOL_MASTER__APR_0_1";
amendArr[128] = "STTMS_CCY_HOL_MASTER__APR_0_2";
amendArr[129] = "STTMS_CCY_HOL_MASTER__APR_0_3";
amendArr[130] = "STTMS_CCY_HOL_MASTER__APR_0_4";
amendArr[131] = "STTMS_CCY_HOL_MASTER__APR_0_5";
amendArr[132] = "STTMS_CCY_HOL_MASTER__APR_0_6";
amendArr[133] = "STTMS_CCY_HOL_MASTER__APR_1_0";
amendArr[134] = "STTMS_CCY_HOL_MASTER__APR_1_1";
amendArr[135] = "STTMS_CCY_HOL_MASTER__APR_1_2";
amendArr[136] = "STTMS_CCY_HOL_MASTER__APR_1_3";
amendArr[137] = "STTMS_CCY_HOL_MASTER__APR_1_4";
amendArr[138] = "STTMS_CCY_HOL_MASTER__APR_1_5";
amendArr[139] = "STTMS_CCY_HOL_MASTER__APR_1_6";
amendArr[140] = "STTMS_CCY_HOL_MASTER__APR_2_0";
amendArr[141] = "STTMS_CCY_HOL_MASTER__APR_2_1";
amendArr[142] = "STTMS_CCY_HOL_MASTER__APR_2_2";
amendArr[143] = "STTMS_CCY_HOL_MASTER__APR_2_3";
amendArr[144] = "STTMS_CCY_HOL_MASTER__APR_2_4";
amendArr[145] = "STTMS_CCY_HOL_MASTER__APR_2_5";
amendArr[146] = "STTMS_CCY_HOL_MASTER__APR_2_6";
amendArr[147] = "STTMS_CCY_HOL_MASTER__APR_3_0";
amendArr[148] = "STTMS_CCY_HOL_MASTER__APR_3_1";
amendArr[149] = "STTMS_CCY_HOL_MASTER__APR_3_2";
amendArr[150] = "STTMS_CCY_HOL_MASTER__APR_3_3";
amendArr[151] = "STTMS_CCY_HOL_MASTER__APR_3_4";
amendArr[152] = "STTMS_CCY_HOL_MASTER__APR_3_5";
amendArr[153] = "STTMS_CCY_HOL_MASTER__APR_3_6";
amendArr[154] = "STTMS_CCY_HOL_MASTER__APR_4_0";
amendArr[155] = "STTMS_CCY_HOL_MASTER__APR_4_1";
amendArr[156] = "STTMS_CCY_HOL_MASTER__APR_4_2";
amendArr[157] = "STTMS_CCY_HOL_MASTER__APR_4_3";
amendArr[158] = "STTMS_CCY_HOL_MASTER__APR_4_4";
amendArr[159] = "STTMS_CCY_HOL_MASTER__APR_4_5";
amendArr[160] = "STTMS_CCY_HOL_MASTER__APR_4_6";
amendArr[161] = "STTMS_CCY_HOL_MASTER__APR_5_0";
amendArr[162] = "STTMS_CCY_HOL_MASTER__APR_5_1";
amendArr[163] = "STTMS_CCY_HOL_MASTER__APR_5_2";
amendArr[164] = "STTMS_CCY_HOL_MASTER__APR_5_3";
amendArr[165] = "STTMS_CCY_HOL_MASTER__APR_5_4";
amendArr[166] = "STTMS_CCY_HOL_MASTER__APR_5_5";
amendArr[167] = "STTMS_CCY_HOL_MASTER__APR_5_6";
amendArr[168] = "STTMS_CCY_HOL_MASTER__MAY_0_0";
amendArr[169] = "STTMS_CCY_HOL_MASTER__MAY_0_1";
amendArr[170] = "STTMS_CCY_HOL_MASTER__MAY_0_2";
amendArr[171] = "STTMS_CCY_HOL_MASTER__MAY_0_3";
amendArr[172] = "STTMS_CCY_HOL_MASTER__MAY_0_4";
amendArr[173] = "STTMS_CCY_HOL_MASTER__MAY_0_5";
amendArr[174] = "STTMS_CCY_HOL_MASTER__MAY_0_6";
amendArr[175] = "STTMS_CCY_HOL_MASTER__MAY_1_0";
amendArr[176] = "STTMS_CCY_HOL_MASTER__MAY_1_1";
amendArr[177] = "STTMS_CCY_HOL_MASTER__MAY_1_2";
amendArr[178] = "STTMS_CCY_HOL_MASTER__MAY_1_3";
amendArr[179] = "STTMS_CCY_HOL_MASTER__MAY_1_4";
amendArr[180] = "STTMS_CCY_HOL_MASTER__MAY_1_5";
amendArr[181] = "STTMS_CCY_HOL_MASTER__MAY_1_6";
amendArr[182] = "STTMS_CCY_HOL_MASTER__MAY_2_0";
amendArr[183] = "STTMS_CCY_HOL_MASTER__MAY_2_1";
amendArr[184] = "STTMS_CCY_HOL_MASTER__MAY_2_2";
amendArr[185] = "STTMS_CCY_HOL_MASTER__MAY_2_3";
amendArr[186] = "STTMS_CCY_HOL_MASTER__MAY_2_4";
amendArr[187] = "STTMS_CCY_HOL_MASTER__MAY_2_5";
amendArr[188] = "STTMS_CCY_HOL_MASTER__MAY_2_6";
amendArr[189] = "STTMS_CCY_HOL_MASTER__MAY_3_0";
amendArr[190] = "STTMS_CCY_HOL_MASTER__MAY_3_1";
amendArr[191] = "STTMS_CCY_HOL_MASTER__MAY_3_2";
amendArr[192] = "STTMS_CCY_HOL_MASTER__MAY_3_3";
amendArr[193] = "STTMS_CCY_HOL_MASTER__MAY_3_4";
amendArr[194] = "STTMS_CCY_HOL_MASTER__MAY_3_5";
amendArr[195] = "STTMS_CCY_HOL_MASTER__MAY_3_6";
amendArr[196] = "STTMS_CCY_HOL_MASTER__MAY_4_0";
amendArr[197] = "STTMS_CCY_HOL_MASTER__MAY_4_1";
amendArr[198] = "STTMS_CCY_HOL_MASTER__MAY_4_2";
amendArr[199] = "STTMS_CCY_HOL_MASTER__MAY_4_3";
amendArr[200] = "STTMS_CCY_HOL_MASTER__MAY_4_4";
amendArr[201] = "STTMS_CCY_HOL_MASTER__MAY_4_5";
amendArr[202] = "STTMS_CCY_HOL_MASTER__MAY_4_6";
amendArr[203] = "STTMS_CCY_HOL_MASTER__MAY_5_0";
amendArr[204] = "STTMS_CCY_HOL_MASTER__MAY_5_1";
amendArr[205] = "STTMS_CCY_HOL_MASTER__MAY_5_2";
amendArr[206] = "STTMS_CCY_HOL_MASTER__MAY_5_3";
amendArr[207] = "STTMS_CCY_HOL_MASTER__MAY_5_4";
amendArr[208] = "STTMS_CCY_HOL_MASTER__MAY_5_5";
amendArr[209] = "STTMS_CCY_HOL_MASTER__MAY_5_6";
amendArr[210] = "STTMS_CCY_HOL_MASTER__JUN_0_0";
amendArr[211] = "STTMS_CCY_HOL_MASTER__JUN_0_1";
amendArr[212] = "STTMS_CCY_HOL_MASTER__JUN_0_2";
amendArr[213] = "STTMS_CCY_HOL_MASTER__JUN_0_3";
amendArr[214] = "STTMS_CCY_HOL_MASTER__JUN_0_4";
amendArr[215] = "STTMS_CCY_HOL_MASTER__JUN_0_5";
amendArr[216] = "STTMS_CCY_HOL_MASTER__JUN_0_6";
amendArr[217] = "STTMS_CCY_HOL_MASTER__JUN_1_0";
amendArr[218] = "STTMS_CCY_HOL_MASTER__JUN_1_1";
amendArr[219] = "STTMS_CCY_HOL_MASTER__JUN_1_2";
amendArr[220] = "STTMS_CCY_HOL_MASTER__JUN_1_3";
amendArr[221] = "STTMS_CCY_HOL_MASTER__JUN_1_4";
amendArr[222] = "STTMS_CCY_HOL_MASTER__JUN_1_5";
amendArr[223] = "STTMS_CCY_HOL_MASTER__JUN_1_6";
amendArr[224] = "STTMS_CCY_HOL_MASTER__JUN_2_0";
amendArr[225] = "STTMS_CCY_HOL_MASTER__JUN_2_1";
amendArr[226] = "STTMS_CCY_HOL_MASTER__JUN_2_2";
amendArr[227] = "STTMS_CCY_HOL_MASTER__JUN_2_3";
amendArr[228] = "STTMS_CCY_HOL_MASTER__JUN_2_4";
amendArr[229] = "STTMS_CCY_HOL_MASTER__JUN_2_5";
amendArr[230] = "STTMS_CCY_HOL_MASTER__JUN_2_6";
amendArr[231] = "STTMS_CCY_HOL_MASTER__JUN_3_0";
amendArr[232] = "STTMS_CCY_HOL_MASTER__JUN_3_1";
amendArr[233] = "STTMS_CCY_HOL_MASTER__JUN_3_2";
amendArr[234] = "STTMS_CCY_HOL_MASTER__JUN_3_3";
amendArr[235] = "STTMS_CCY_HOL_MASTER__JUN_3_4";
amendArr[236] = "STTMS_CCY_HOL_MASTER__JUN_3_5";
amendArr[237] = "STTMS_CCY_HOL_MASTER__JUN_3_6";
amendArr[238] = "STTMS_CCY_HOL_MASTER__JUN_4_0";
amendArr[239] = "STTMS_CCY_HOL_MASTER__JUN_4_1";
amendArr[240] = "STTMS_CCY_HOL_MASTER__JUN_4_2";
amendArr[241] = "STTMS_CCY_HOL_MASTER__JUN_4_3";
amendArr[242] = "STTMS_CCY_HOL_MASTER__JUN_4_4";
amendArr[243] = "STTMS_CCY_HOL_MASTER__JUN_4_5";
amendArr[244] = "STTMS_CCY_HOL_MASTER__JUN_4_6";
amendArr[245] = "STTMS_CCY_HOL_MASTER__JUN_5_0";
amendArr[246] = "STTMS_CCY_HOL_MASTER__JUN_5_1";
amendArr[247] = "STTMS_CCY_HOL_MASTER__JUN_5_2";
amendArr[248] = "STTMS_CCY_HOL_MASTER__JUN_5_3";
amendArr[249] = "STTMS_CCY_HOL_MASTER__JUN_5_4";
amendArr[250] = "STTMS_CCY_HOL_MASTER__JUN_5_5";
amendArr[251] = "STTMS_CCY_HOL_MASTER__JUN_5_6";
amendArr[252] = "STTMS_CCY_HOL_MASTER__JUL_0_0";
amendArr[253] = "STTMS_CCY_HOL_MASTER__JUL_0_1";
amendArr[254] = "STTMS_CCY_HOL_MASTER__JUL_0_2";
amendArr[255] = "STTMS_CCY_HOL_MASTER__JUL_0_3";
amendArr[256] = "STTMS_CCY_HOL_MASTER__JUL_0_4";
amendArr[257] = "STTMS_CCY_HOL_MASTER__JUL_0_5";
amendArr[258] = "STTMS_CCY_HOL_MASTER__JUL_0_6";
amendArr[259] = "STTMS_CCY_HOL_MASTER__JUL_1_0";
amendArr[260] = "STTMS_CCY_HOL_MASTER__JUL_1_1";
amendArr[261] = "STTMS_CCY_HOL_MASTER__JUL_1_2";
amendArr[262] = "STTMS_CCY_HOL_MASTER__JUL_1_3";
amendArr[263] = "STTMS_CCY_HOL_MASTER__JUL_1_4";
amendArr[264] = "STTMS_CCY_HOL_MASTER__JUL_1_5";
amendArr[265] = "STTMS_CCY_HOL_MASTER__JUL_1_6";
amendArr[266] = "STTMS_CCY_HOL_MASTER__JUL_2_0";
amendArr[267] = "STTMS_CCY_HOL_MASTER__JUL_2_1";
amendArr[268] = "STTMS_CCY_HOL_MASTER__JUL_2_2";
amendArr[269] = "STTMS_CCY_HOL_MASTER__JUL_2_3";
amendArr[270] = "STTMS_CCY_HOL_MASTER__JUL_2_4";
amendArr[271] = "STTMS_CCY_HOL_MASTER__JUL_2_5";
amendArr[272] = "STTMS_CCY_HOL_MASTER__JUL_2_6";
amendArr[273] = "STTMS_CCY_HOL_MASTER__JUL_3_0";
amendArr[274] = "STTMS_CCY_HOL_MASTER__JUL_3_1";
amendArr[275] = "STTMS_CCY_HOL_MASTER__JUL_3_2";
amendArr[276] = "STTMS_CCY_HOL_MASTER__JUL_3_3";
amendArr[277] = "STTMS_CCY_HOL_MASTER__JUL_3_4";
amendArr[278] = "STTMS_CCY_HOL_MASTER__JUL_3_5";
amendArr[279] = "STTMS_CCY_HOL_MASTER__JUL_3_6";
amendArr[280] = "STTMS_CCY_HOL_MASTER__JUL_4_0";
amendArr[281] = "STTMS_CCY_HOL_MASTER__JUL_4_1";
amendArr[282] = "STTMS_CCY_HOL_MASTER__JUL_4_2";
amendArr[283] = "STTMS_CCY_HOL_MASTER__JUL_4_3";
amendArr[284] = "STTMS_CCY_HOL_MASTER__JUL_4_4";
amendArr[285] = "STTMS_CCY_HOL_MASTER__JUL_4_5";
amendArr[286] = "STTMS_CCY_HOL_MASTER__JUL_4_6";
amendArr[287] = "STTMS_CCY_HOL_MASTER__JUL_5_0";
amendArr[288] = "STTMS_CCY_HOL_MASTER__JUL_5_1";
amendArr[289] = "STTMS_CCY_HOL_MASTER__JUL_5_2";
amendArr[290] = "STTMS_CCY_HOL_MASTER__JUL_5_3";
amendArr[291] = "STTMS_CCY_HOL_MASTER__JUL_5_4";
amendArr[292] = "STTMS_CCY_HOL_MASTER__JUL_5_5";
amendArr[293] = "STTMS_CCY_HOL_MASTER__JUL_5_6";
amendArr[294] = "STTMS_CCY_HOL_MASTER__AUG_0_0";
amendArr[295] = "STTMS_CCY_HOL_MASTER__AUG_0_1";
amendArr[296] = "STTMS_CCY_HOL_MASTER__AUG_0_2";
amendArr[297] = "STTMS_CCY_HOL_MASTER__AUG_0_3";
amendArr[298] = "STTMS_CCY_HOL_MASTER__AUG_0_4";
amendArr[299] = "STTMS_CCY_HOL_MASTER__AUG_0_5";
amendArr[300] = "STTMS_CCY_HOL_MASTER__AUG_0_6";
amendArr[301] = "STTMS_CCY_HOL_MASTER__AUG_1_0";
amendArr[302] = "STTMS_CCY_HOL_MASTER__AUG_1_1";
amendArr[303] = "STTMS_CCY_HOL_MASTER__AUG_1_2";
amendArr[304] = "STTMS_CCY_HOL_MASTER__AUG_1_3";
amendArr[305] = "STTMS_CCY_HOL_MASTER__AUG_1_4";
amendArr[306] = "STTMS_CCY_HOL_MASTER__AUG_1_5";
amendArr[307] = "STTMS_CCY_HOL_MASTER__AUG_1_6";
amendArr[308] = "STTMS_CCY_HOL_MASTER__AUG_2_0";
amendArr[309] = "STTMS_CCY_HOL_MASTER__AUG_2_1";
amendArr[310] = "STTMS_CCY_HOL_MASTER__AUG_2_2";
amendArr[311] = "STTMS_CCY_HOL_MASTER__AUG_2_3";
amendArr[312] = "STTMS_CCY_HOL_MASTER__AUG_2_4";
amendArr[313] = "STTMS_CCY_HOL_MASTER__AUG_2_5";
amendArr[314] = "STTMS_CCY_HOL_MASTER__AUG_2_6";
amendArr[315] = "STTMS_CCY_HOL_MASTER__AUG_3_0";
amendArr[316] = "STTMS_CCY_HOL_MASTER__AUG_3_1";
amendArr[317] = "STTMS_CCY_HOL_MASTER__AUG_3_2";
amendArr[318] = "STTMS_CCY_HOL_MASTER__AUG_3_3";
amendArr[319] = "STTMS_CCY_HOL_MASTER__AUG_3_4";
amendArr[320] = "STTMS_CCY_HOL_MASTER__AUG_3_5";
amendArr[321] = "STTMS_CCY_HOL_MASTER__AUG_3_6";
amendArr[322] = "STTMS_CCY_HOL_MASTER__AUG_4_0";
amendArr[323] = "STTMS_CCY_HOL_MASTER__AUG_4_1";
amendArr[324] = "STTMS_CCY_HOL_MASTER__AUG_4_2";
amendArr[325] = "STTMS_CCY_HOL_MASTER__AUG_4_3";
amendArr[326] = "STTMS_CCY_HOL_MASTER__AUG_4_4";
amendArr[327] = "STTMS_CCY_HOL_MASTER__AUG_4_5";
amendArr[328] = "STTMS_CCY_HOL_MASTER__AUG_4_6";
amendArr[329] = "STTMS_CCY_HOL_MASTER__AUG_5_0";
amendArr[330] = "STTMS_CCY_HOL_MASTER__AUG_5_1";
amendArr[331] = "STTMS_CCY_HOL_MASTER__AUG_5_2";
amendArr[332] = "STTMS_CCY_HOL_MASTER__AUG_5_3";
amendArr[333] = "STTMS_CCY_HOL_MASTER__AUG_5_4";
amendArr[334] = "STTMS_CCY_HOL_MASTER__AUG_5_5";
amendArr[335] = "STTMS_CCY_HOL_MASTER__AUG_5_6";
amendArr[336] = "STTMS_CCY_HOL_MASTER__SEP_0_0";
amendArr[337] = "STTMS_CCY_HOL_MASTER__SEP_0_1";
amendArr[338] = "STTMS_CCY_HOL_MASTER__SEP_0_2";
amendArr[339] = "STTMS_CCY_HOL_MASTER__SEP_0_3";
amendArr[340] = "STTMS_CCY_HOL_MASTER__SEP_0_4";
amendArr[341] = "STTMS_CCY_HOL_MASTER__SEP_0_5";
amendArr[342] = "STTMS_CCY_HOL_MASTER__SEP_0_6";
amendArr[343] = "STTMS_CCY_HOL_MASTER__SEP_1_0";
amendArr[344] = "STTMS_CCY_HOL_MASTER__SEP_1_1";
amendArr[345] = "STTMS_CCY_HOL_MASTER__SEP_1_2";
amendArr[346] = "STTMS_CCY_HOL_MASTER__SEP_1_3";
amendArr[347] = "STTMS_CCY_HOL_MASTER__SEP_1_4";
amendArr[348] = "STTMS_CCY_HOL_MASTER__SEP_1_5";
amendArr[349] = "STTMS_CCY_HOL_MASTER__SEP_1_6";
amendArr[350] = "STTMS_CCY_HOL_MASTER__SEP_2_0";
amendArr[351] = "STTMS_CCY_HOL_MASTER__SEP_2_1";
amendArr[352] = "STTMS_CCY_HOL_MASTER__SEP_2_2";
amendArr[353] = "STTMS_CCY_HOL_MASTER__SEP_2_3";
amendArr[354] = "STTMS_CCY_HOL_MASTER__SEP_2_4";
amendArr[355] = "STTMS_CCY_HOL_MASTER__SEP_2_5";
amendArr[356] = "STTMS_CCY_HOL_MASTER__SEP_2_6";
amendArr[357] = "STTMS_CCY_HOL_MASTER__SEP_3_0";
amendArr[358] = "STTMS_CCY_HOL_MASTER__SEP_3_1";
amendArr[359] = "STTMS_CCY_HOL_MASTER__SEP_3_2";
amendArr[360] = "STTMS_CCY_HOL_MASTER__SEP_3_3";
amendArr[361] = "STTMS_CCY_HOL_MASTER__SEP_3_4";
amendArr[362] = "STTMS_CCY_HOL_MASTER__SEP_3_5";
amendArr[363] = "STTMS_CCY_HOL_MASTER__SEP_3_6";
amendArr[364] = "STTMS_CCY_HOL_MASTER__SEP_4_0";
amendArr[365] = "STTMS_CCY_HOL_MASTER__SEP_4_1";
amendArr[366] = "STTMS_CCY_HOL_MASTER__SEP_4_2";
amendArr[367] = "STTMS_CCY_HOL_MASTER__SEP_4_3";
amendArr[368] = "STTMS_CCY_HOL_MASTER__SEP_4_4";
amendArr[369] = "STTMS_CCY_HOL_MASTER__SEP_4_5";
amendArr[370] = "STTMS_CCY_HOL_MASTER__SEP_4_6";
amendArr[371] = "STTMS_CCY_HOL_MASTER__SEP_5_0";
amendArr[372] = "STTMS_CCY_HOL_MASTER__SEP_5_1";
amendArr[373] = "STTMS_CCY_HOL_MASTER__SEP_5_2";
amendArr[374] = "STTMS_CCY_HOL_MASTER__SEP_5_3";
amendArr[375] = "STTMS_CCY_HOL_MASTER__SEP_5_4";
amendArr[376] = "STTMS_CCY_HOL_MASTER__SEP_5_5";
amendArr[377] = "STTMS_CCY_HOL_MASTER__SEP_5_6";
amendArr[378] = "STTMS_CCY_HOL_MASTER__OCT_0_0";
amendArr[379] = "STTMS_CCY_HOL_MASTER__OCT_0_1";
amendArr[380] = "STTMS_CCY_HOL_MASTER__OCT_0_2";
amendArr[381] = "STTMS_CCY_HOL_MASTER__OCT_0_3";
amendArr[382] = "STTMS_CCY_HOL_MASTER__OCT_0_4";
amendArr[383] = "STTMS_CCY_HOL_MASTER__OCT_0_5";
amendArr[384] = "STTMS_CCY_HOL_MASTER__OCT_0_6";
amendArr[385] = "STTMS_CCY_HOL_MASTER__OCT_1_0";
amendArr[386] = "STTMS_CCY_HOL_MASTER__OCT_1_1";
amendArr[387] = "STTMS_CCY_HOL_MASTER__OCT_1_2";
amendArr[388] = "STTMS_CCY_HOL_MASTER__OCT_1_3";
amendArr[389] = "STTMS_CCY_HOL_MASTER__OCT_1_4";
amendArr[390] = "STTMS_CCY_HOL_MASTER__OCT_1_5";
amendArr[391] = "STTMS_CCY_HOL_MASTER__OCT_1_6";
amendArr[392] = "STTMS_CCY_HOL_MASTER__OCT_2_0";
amendArr[393] = "STTMS_CCY_HOL_MASTER__OCT_2_1";
amendArr[394] = "STTMS_CCY_HOL_MASTER__OCT_2_2";
amendArr[395] = "STTMS_CCY_HOL_MASTER__OCT_2_3";
amendArr[396] = "STTMS_CCY_HOL_MASTER__OCT_2_4";
amendArr[397] = "STTMS_CCY_HOL_MASTER__OCT_2_5";
amendArr[398] = "STTMS_CCY_HOL_MASTER__OCT_2_6";
amendArr[399] = "STTMS_CCY_HOL_MASTER__OCT_3_0";
amendArr[400] = "STTMS_CCY_HOL_MASTER__OCT_3_1";
amendArr[401] = "STTMS_CCY_HOL_MASTER__OCT_3_2";
amendArr[402] = "STTMS_CCY_HOL_MASTER__OCT_3_3";
amendArr[403] = "STTMS_CCY_HOL_MASTER__OCT_3_4";
amendArr[404] = "STTMS_CCY_HOL_MASTER__OCT_3_5";
amendArr[405] = "STTMS_CCY_HOL_MASTER__OCT_3_6";
amendArr[406] = "STTMS_CCY_HOL_MASTER__OCT_4_0";
amendArr[407] = "STTMS_CCY_HOL_MASTER__OCT_4_1";
amendArr[408] = "STTMS_CCY_HOL_MASTER__OCT_4_2";
amendArr[409] = "STTMS_CCY_HOL_MASTER__OCT_4_3";
amendArr[410] = "STTMS_CCY_HOL_MASTER__OCT_4_4";
amendArr[411] = "STTMS_CCY_HOL_MASTER__OCT_4_5";
amendArr[412] = "STTMS_CCY_HOL_MASTER__OCT_4_6";
amendArr[413] = "STTMS_CCY_HOL_MASTER__OCT_5_0";
amendArr[414] = "STTMS_CCY_HOL_MASTER__OCT_5_1";
amendArr[415] = "STTMS_CCY_HOL_MASTER__OCT_5_2";
amendArr[416] = "STTMS_CCY_HOL_MASTER__OCT_5_3";
amendArr[417] = "STTMS_CCY_HOL_MASTER__OCT_5_4";
amendArr[418] = "STTMS_CCY_HOL_MASTER__OCT_5_5";
amendArr[419] = "STTMS_CCY_HOL_MASTER__OCT_5_6";
amendArr[420] = "STTMS_CCY_HOL_MASTER__NOV_0_0";
amendArr[421] = "STTMS_CCY_HOL_MASTER__NOV_0_1";
amendArr[422] = "STTMS_CCY_HOL_MASTER__NOV_0_2";
amendArr[423] = "STTMS_CCY_HOL_MASTER__NOV_0_3";
amendArr[424] = "STTMS_CCY_HOL_MASTER__NOV_0_4";
amendArr[425] = "STTMS_CCY_HOL_MASTER__NOV_0_5";
amendArr[426] = "STTMS_CCY_HOL_MASTER__NOV_0_6";
amendArr[427] = "STTMS_CCY_HOL_MASTER__NOV_1_0";
amendArr[428] = "STTMS_CCY_HOL_MASTER__NOV_1_1";
amendArr[429] = "STTMS_CCY_HOL_MASTER__NOV_1_2";
amendArr[430] = "STTMS_CCY_HOL_MASTER__NOV_1_3";
amendArr[431] = "STTMS_CCY_HOL_MASTER__NOV_1_4";
amendArr[432] = "STTMS_CCY_HOL_MASTER__NOV_1_5";
amendArr[433] = "STTMS_CCY_HOL_MASTER__NOV_1_6";
amendArr[434] = "STTMS_CCY_HOL_MASTER__NOV_2_0";
amendArr[435] = "STTMS_CCY_HOL_MASTER__NOV_2_1";
amendArr[436] = "STTMS_CCY_HOL_MASTER__NOV_2_2";
amendArr[437] = "STTMS_CCY_HOL_MASTER__NOV_2_3";
amendArr[438] = "STTMS_CCY_HOL_MASTER__NOV_2_4";
amendArr[439] = "STTMS_CCY_HOL_MASTER__NOV_2_5";
amendArr[440] = "STTMS_CCY_HOL_MASTER__NOV_2_6";
amendArr[441] = "STTMS_CCY_HOL_MASTER__NOV_3_0";
amendArr[442] = "STTMS_CCY_HOL_MASTER__NOV_3_1";
amendArr[443] = "STTMS_CCY_HOL_MASTER__NOV_3_2";
amendArr[444] = "STTMS_CCY_HOL_MASTER__NOV_3_3";
amendArr[445] = "STTMS_CCY_HOL_MASTER__NOV_3_4";
amendArr[446] = "STTMS_CCY_HOL_MASTER__NOV_3_5";
amendArr[447] = "STTMS_CCY_HOL_MASTER__NOV_3_6";
amendArr[448] = "STTMS_CCY_HOL_MASTER__NOV_4_0";
amendArr[449] = "STTMS_CCY_HOL_MASTER__NOV_4_1";
amendArr[450] = "STTMS_CCY_HOL_MASTER__NOV_4_2";
amendArr[451] = "STTMS_CCY_HOL_MASTER__NOV_4_3";
amendArr[452] = "STTMS_CCY_HOL_MASTER__NOV_4_4";
amendArr[453] = "STTMS_CCY_HOL_MASTER__NOV_4_5";
amendArr[454] = "STTMS_CCY_HOL_MASTER__NOV_4_6";
amendArr[455] = "STTMS_CCY_HOL_MASTER__NOV_5_0";
amendArr[456] = "STTMS_CCY_HOL_MASTER__NOV_5_1";
amendArr[457] = "STTMS_CCY_HOL_MASTER__NOV_5_2";
amendArr[458] = "STTMS_CCY_HOL_MASTER__NOV_5_3";
amendArr[459] = "STTMS_CCY_HOL_MASTER__NOV_5_4";
amendArr[460] = "STTMS_CCY_HOL_MASTER__NOV_5_5";
amendArr[461] = "STTMS_CCY_HOL_MASTER__NOV_5_6";
amendArr[462] = "STTMS_CCY_HOL_MASTER__DEC_0_0";
amendArr[463] = "STTMS_CCY_HOL_MASTER__DEC_0_1";
amendArr[464] = "STTMS_CCY_HOL_MASTER__DEC_0_2";
amendArr[465] = "STTMS_CCY_HOL_MASTER__DEC_0_3";
amendArr[466] = "STTMS_CCY_HOL_MASTER__DEC_0_4";
amendArr[467] = "STTMS_CCY_HOL_MASTER__DEC_0_5";
amendArr[468] = "STTMS_CCY_HOL_MASTER__DEC_0_6";
amendArr[469] = "STTMS_CCY_HOL_MASTER__DEC_1_0";
amendArr[470] = "STTMS_CCY_HOL_MASTER__DEC_1_1";
amendArr[471] = "STTMS_CCY_HOL_MASTER__DEC_1_2";
amendArr[472] = "STTMS_CCY_HOL_MASTER__DEC_1_3";
amendArr[473] = "STTMS_CCY_HOL_MASTER__DEC_1_4";
amendArr[474] = "STTMS_CCY_HOL_MASTER__DEC_1_5";
amendArr[475] = "STTMS_CCY_HOL_MASTER__DEC_1_6";
amendArr[476] = "STTMS_CCY_HOL_MASTER__DEC_2_0";
amendArr[477] = "STTMS_CCY_HOL_MASTER__DEC_2_1";
amendArr[478] = "STTMS_CCY_HOL_MASTER__DEC_2_2";
amendArr[479] = "STTMS_CCY_HOL_MASTER__DEC_2_3";
amendArr[480] = "STTMS_CCY_HOL_MASTER__DEC_2_4";
amendArr[481] = "STTMS_CCY_HOL_MASTER__DEC_2_5";
amendArr[482] = "STTMS_CCY_HOL_MASTER__DEC_2_6";
amendArr[483] = "STTMS_CCY_HOL_MASTER__DEC_3_0";
amendArr[484] = "STTMS_CCY_HOL_MASTER__DEC_3_1";
amendArr[485] = "STTMS_CCY_HOL_MASTER__DEC_3_2";
amendArr[486] = "STTMS_CCY_HOL_MASTER__DEC_3_3";
amendArr[487] = "STTMS_CCY_HOL_MASTER__DEC_3_4";
amendArr[488] = "STTMS_CCY_HOL_MASTER__DEC_3_5";
amendArr[489] = "STTMS_CCY_HOL_MASTER__DEC_3_6";
amendArr[490] = "STTMS_CCY_HOL_MASTER__DEC_4_0";
amendArr[491] = "STTMS_CCY_HOL_MASTER__DEC_4_1";
amendArr[492] = "STTMS_CCY_HOL_MASTER__DEC_4_2";
amendArr[493] = "STTMS_CCY_HOL_MASTER__DEC_4_3";
amendArr[494] = "STTMS_CCY_HOL_MASTER__DEC_4_4";
amendArr[495] = "STTMS_CCY_HOL_MASTER__DEC_4_5";
amendArr[496] = "STTMS_CCY_HOL_MASTER__DEC_4_6";
amendArr[497] = "STTMS_CCY_HOL_MASTER__DEC_5_0";
amendArr[498] = "STTMS_CCY_HOL_MASTER__DEC_5_1";
amendArr[499] = "STTMS_CCY_HOL_MASTER__DEC_5_2";
amendArr[500] = "STTMS_CCY_HOL_MASTER__DEC_5_3";
amendArr[501] = "STTMS_CCY_HOL_MASTER__DEC_5_4";
amendArr[502] = "STTMS_CCY_HOL_MASTER__DEC_5_5";
amendArr[503] = "STTMS_CCY_HOL_MASTER__DEC_5_6";


/*
 * Called to perform some neccessary operation before the fnLoad() Window event
 * Specific to the functionid
 */
function fnPreLoad() {
    debugs("In fnPreLoad", "A");
}
/*
 * Called to perform some neccessary operation after the fnNew() Window event
 * Specific to the functionid
 */
function fnPostLoad() {
    debugs("In fnPostLoad", "A");

   // if (parent.ShowSummary =='TRUE')9NT1606_12_4_RETRO_12_3_26524831 
    if (parent.ShowSummary =='TRUE' || gAction=="VIEWMNTLOG") //9NT1606_12_4_RETRO_12_3_26524831 
    {
        displayCalendar();
    }
    gYearRef = document.getElementById("STTMS_CCY_HOL_MASTER__YEAR").value;
	//document.getElementById("divAddDel_BLK_STTMS_CCY_HOLIDAY").disabled = true;
    document.getElementById("dataContainer_BLK_STTMS_CCY_HOLIDAY").style.display="none";
    //fnCalHolHeading();


}
/*
 * Called to perform some neccessary operation before the fnNew() Action event
 * Specific to the functionid
 */
function fnPreNew() {
    var newAction = true;
    debugs("In fnPreNew", "A");
    return newAction;
}
/*
 * Called to perform some neccessary operation after the fnNew() Action event
 * Specific to the functionid
 */
function fnPostNew() {
        debugs("In fnPostNew", "A");
        //document.getElementById("divAddDel_BLK_STTMS_CCY_HOLIDAY").style.display = "none";
        gCCYRef  = document.getElementById("STTMS_CCY_HOL_MASTER__CCY");
        gYearRef = document.getElementById("STTMS_CCY_HOL_MASTER__YEAR");
		 curYear = mainWin.AppDate.substring(0,4);
        document.getElementById('STTMS_CCY_HOL_MASTER__YEAR').value= curYear;
		fireHTMLEvent(document.getElementById("STTMS_CCY_HOL_MASTER__YEAR"), "onpropertychange");//FCUBS_12.1.0_21066833
		document.getElementById("BLK_STTMS_CCY_HOLIDAY").disabled = true;
        isDisplayVisited = false;
        gIsUnlock = false;
        //fnCalHolHeading();
}
/*
 * Called to perform some neccessary operation before the fnUlock() Action event
 * Specific to the functionid
 */
function fnPreUnlock() {
    var unlock = true;
    debugs("In fnPreUnlock", "A");
    return unlock;
}
/*
 * Called to perform some neccessary operation after the fnUlock() Action event
 * Specific to the functionid
 */
function fnPostUnlock() {
    debugs("In fnPostUnlock", "A");
    //document.getElementById("divAddDel_BLK_STTMS_CCY_HOLIDAY").style.display = "none";
    document.getElementsByName("BTN_GO")[0].disabled = true;
    gCCYRef    = document.getElementById("STTMS_CCY_HOL_MASTER__CCY");
    gYearRef   = document.getElementById("STTMS_CCY_HOL_MASTER__YEAR");
	gIsUnlock  = true;
    displayCalendar();
    //fnCalHolHeading();
}
/*
 * Called to perform some neccessary operation before the fnAuthorize() Action event
 * Specific to the functionid
 */
function fnPreAuthorize() {
    var authorize = true;
    debugs("In fnPreAuthorize", "A");
    return authorize;
}
/*
 * Called to perform some neccessary operation after the fnAuthorize() Action event
 * Specific to the functionid
 */
function fnPostAuthorize() {
    debugs("In fnPostAuthorize", "A");
    document.getElementById("STTMS_CCY_HOL_MASTER__YEAR").value = gYearRef;
    fireHTMLEvent(document.getElementById("STTMS_CCY_HOL_MASTER__YEAR"), "onpropertychange");//FCUBS_12.1.0_21066833
	displayCalendar();
    //fnCalHolHeading();
}

//RETRO_12_3_25436193 --Starts
function fnPostFocus() 
{
    if(gAction != 'NEW')
	   displayCalendar();
	   
	return true;
}
//RETRO_12_3_25436193 --Ends

/*
 * Called to perform some neccessary operation before the fnCopy() Action event
 * Specific to the functionid
 */
function fnPreCopy() {
    var copy = true;
    debugs("In fnPreCopy", "A");


    return copy;
}
/*
 * Called to perform some neccessary operation after the fnCopy() Action event
 * Specific to the functionid
 */
var gIsCopy = false;
function fnPostCopy() {
    debugs("In fnPostCopy", "A");
    document.getElementById("STTMS_CCY_HOL_MASTER__YEAR").value = gYearRef;
    fireHTMLEvent(document.getElementById("STTMS_CCY_HOL_MASTER__YEAR"), "onpropertychange");//FCUBS_12.1.0_21066833
    var l_prevAction = gAction;
    gAction = "";
    displayCalendar();
    gAction = l_prevAction;
    document.getElementsByName("BTN_GO")[0].disabled = true;
    gIsCopy = true;
    document.getElementById("STTMS_CCY_HOL_MASTER__CCY").focus();
    //document.getElementById("divAddDel_BLK_STTMS_CCY_HOLIDAY").style.display = "none";
    document.getElementById("BLK_STTMS_CCY_HOLIDAY").disabled = true;
    //fnCalHolHeading();


}

/*
 * Called to perform some neccessary operation before the fnClose() Window event
 * Specific to the functionid
 */
function fnPreClose() {
    var close = true;
    debugs("In fnPreClose", "A");
    return close;
}
/*
 * Called to perform some neccessary operation after the fnClose() Window event
 * Specific to the functionid
 */
function fnPostClose() {
    debugs("In fnPostClose", "A");
    document.getElementById("STTMS_CCY_HOL_MASTER__YEAR").value = gYearRef;
    fireHTMLEvent(document.getElementById("STTMS_CCY_HOL_MASTER__YEAR"), "onpropertychange");//FCUBS_12.1.0_21066833
	displayCalendar();
    //fnCalHolHeading();
}
/*
 * Called to perform some neccessary operation before the fnReOpen() Window event
 * Specific to the functionid
 */
function fnPreReOpen() {
    var reOpen = true;
    debugs("In fnPreReOpen", "A");
    return reOpen;
}
/*
 * Called to perform some neccessary operation after the fnReOpen() Window event
 * Specific to the functionid
 */
function fnPostReOpen() {
    debugs("In fnPostReOpen", "A");
    document.getElementById("STTMS_CCY_HOL_MASTER__YEAR").value = gYearRef;
	fireHTMLEvent(document.getElementById("STTMS_CCY_HOL_MASTER__YEAR"), "onpropertychange");//FCUBS_12.1.0_21066833
    displayCalendar();
    //fnCalHolHeading();
}
/*
 * Called to perform some neccessary operation before the fnDelete() Action event
 * Specific to the functionid
 */
function fnPreDelete() {
    var deleteAction = true;
    debugs("In fnPreDelete", "A");
    return deleteAction;
}
/*
 * Called to perform some neccessary operation after the fnDelete() Action event
 * Specific to the functionid
 */
function fnPostDelete() {
    debugs("In fnPostDelete", "A");
    fnResetStyle();
    //fnCalHolHeading();
}
/*
 * Called to perform some neccessary operation before the fnEnterQuery() Action event
 * Specific to the functionid
 */
function fnPreEnterQuery() {
    fnResetStyle();
    var execute = true;
    debugs("In fnPreEnterQuery", "A");
    return execute;
}
/*
 * Called to perform some neccessary operation after the fnEnterQuery() Action event
 * Specific to the functionid
 */
function fnPostEnterQuery() {
    debugs("In fnPostEnterQuery", "A");
    gCCYRef = document.getElementById("STTMS_CCY_HOL_MASTER__CCY");
	document.getElementById("STTMS_CCY_HOL_MASTER__CCY").setAttribute("onfocusout","fnsetyear()");
    //displayCalendar();
    //fnCalHolHeading();
}

function fnsetyear(){
	document.getElementById("STTMS_CCY_HOL_MASTER__YEAR").focus();
	}

/*
 * Called to perform some neccessary operation before the fnExecuteQuery() Action event
 * Specific to the functionid
 */
function fnPreExecuteQuery() {
    var execute = true;
    debugs("In fnPreExecuteQuery", "A");
    return execute;
}
/*
 * Called to perform some neccessary operation after the fnExecuteQuery() Action event
 * Specific to the functionid
 */
function fnPostExecuteQuery() {
    debugs("In fnPostExecuteQuery", "A");
    gYearRef = document.getElementById("STTMS_CCY_HOL_MASTER__YEAR").value;
	displayCalendar();

}

/*
 * Called to perform some neccessary operation before the fnSave() Action event and
 * this function has to return a success/failure flag to fnSave function.
 * Specific to the functionid.
 */
function fnPreSave() {
	if(!fnValidate())
        return false;


    debugs("In fnPreSave", "A");

    //Validation to check whether the calendar is input
    if(gAction =='NEW' && isDisplayVisited == false) {
       //alert("Please Input the Calendar values.");
	   showErrorAlerts('IN-HEAR-402');//NLS change -Removal of hardcoded alerts
       return false;
    }

    var isValid = true;

    setChildKeyValues("STTMS_CCY_HOL_MASTER","CCY","CCY");
    setChildKeyValues("STTMS_CCY_HOL_MASTER","YEAR","YEAR");

    var isValid     = true;
    //var yearVal   = document.getElementById("YEAR").value;
    var yearVal     = document.getElementById("STTMS_CCY_HOL_MASTER__YEAR").value;
    var gCCYRef     = document.getElementById("STTMS_CCY_HOL_MASTER__CCY").value;

    gyearValue    = yearVal;
    gYearRef      = yearVal;
    gCcyReference = gCCYRef;

    // Year Validations
    isValid = fnValidateYear(yearVal);

    // Do Mandatory validations
    

    // Do basic datatype validations
    

    // Get all the Messages from Previuos Validate and now
    // display all
    if (!isValid) {
        //Call Functions in Util
        var msg = buildMessage(gErrCodes);
        alertMessage(msg);
        return false;
    }

    if (gIsCopy)
    {
        var currMonthCell = null;
        for(var monthCnt = 0; monthCnt < 12 ;monthCnt++)
        {
            currMonthCell = document.getElementById("BLK_STTMS_CCY_HOLIDAY").tBodies[0].rows[monthCnt].cells[1].getElementsByTagName("INPUT")[0];
            currMonthCell.value = gCCYRef.value;
        }
    }

    return isValid;
}
/*
 * Called to perform some neccessary operation after the fnSave() Action event
 * Specific to the functionid
 */
function fnPostSave() {
    debugs("In fnPostSave", "A");

  /*  document.getElementById("YEAR").value = gyearValue;
    document.getElementById("STTMS_CCY_HOL_MASTER__CCY").value = gCcyReference;
    document.getElementById("STTMS_CCY_HOL_MASTER__YEAR").value = gYearRef;*/
   if (gIsUnlock)
   {
      gAction = 'EXECUTEQUERY';
      fnEnterQuery();
      document.getElementById("STTMS_CCY_HOL_MASTER__CCY").value = gCcyReference;
      document.getElementById("STTMS_CCY_HOL_MASTER__YEAR").value = gyearValue;
      fnExecuteQuery(null);
      gAction = '';
   }
   displayCalendar();
   //fnCalHolHeading();
}

/*
 * Before Navigating to the next/prev record.
 */
function fnPreGoToRec() {
    var navigate = true;
    return navigate;
}

/*
 * After Navigating to the next/prev record.
 */

function fnPostGoToRec() {

}

/***************************************************
 STDCCHOL function specific functions starts here
 ***************************************************/

/*
 *Returns number of days of a given month
 *inMonth - Numeric equvalent of Month
 *inYear  - Current Year
 */
function fnGetDays(inMonth,inYear)
{
    var noDays   = new Array(12);

    noDays[0]    = 31; // January
    noDays[1]    = (fnLeapYear(inYear)) ? 29 : 28; // February
    noDays[2]    = 31; // March
    noDays[3]    = 30; // April
    noDays[4]    = 31; // May
    noDays[5]    = 30; // June
    noDays[6]    = 31; // July
    noDays[7]    = 31; // August
    noDays[8]    = 30; // September
    noDays[9]    = 31; // October
    noDays[10]   = 30; // November
    noDays[11]   = 31; // December

    // return number of days in the specified month (parameter)
    return noDays[inMonth];
 }

/*
 *Returns the Function names
 */
function fnGetMonthName(inMonth)
{
    // return name of specified month (parameter)
    return monthNames[inMonth];
}

/*
 *Returns numeric equvalent of the given month
 */
function fnGetMonthIndex(monthName)
{
    for(var monCnt = 0; monCnt < monthNames.length; monCnt++)
    {
        if(monthNames[monCnt] == monthName)
        {
            return monCnt;
        }
    }
    return -1;
}

/*
 * Function which fills the Calendar values corresponding the year entered
 * and
 * Value of gAction
 */
function displayCalendar()
{
    isDisplayVisited = true;
    var inYear  = document.getElementById("STTMS_CCY_HOL_MASTER__YEAR").value;
	var strCell   = "";
    var row       = 0;
    var col          = 0;
    var currObj   = null;
    var monthName = "";
    var noDays    = 0;
    var firstDay  = 0;
    var firstDayInstance = null;
    var monthList = "";
    var isValid   = true;
    var tabIndex = 1;
    var modifiedMonthList = ""; //9NT1606_12_4_RETRO_12_3_26524831 

    //To populate the calendar only when the year and Currency both are entered.
    if(inYear != "")
    {
        if(isNumeric(inYear))
        {
            if(gAction =='NEW' )
            {
                //Delete all the existing vlaues from Multiple Entry Block
                //deleteAllRows("BLK_STTMS_CCY_HOLIDAY");

                //To delete the Existing List of Holiday values
                for(var monthCnt = 0; monthCnt<12; monthCnt++)
                {
                    //gets the first day's instance of the given Month
                    firstDayInstance = getDateObject(inYear,monthCnt,1);
                    //gets the Month name
                    monthName = fnGetMonthName(monthCnt);
                    //gets the numbers of days for the given Month
                    noDays = fnGetDays(monthCnt, inYear);
                    //gets the integer equavalent of the particular day
                    firstDay = firstDayInstance.getDay();
                    // sets to the first daycnt of the month
                    col = firstDay;
                    //resets the row
                    row = 0;
                    monthList = "";
                    for(var dayCnt = 1; dayCnt <= noDays ; dayCnt++)
                    {
                        strCell = monthName + "_" + row + "_" + col;
						//FCUBS11.1 SFR#259 STARTS
                        //currObj = eval("document.form1." + strCell);
						//currObj = eval(strCell);--FC11.2,ITR2 SFR512
						currObj = eval(document.getElementsByName(strCell)[0]);//FC11.2,ITR2 SFR512
						//FCUBS11.1 SFR#259 ENDS
                        currObj.value = "";
                        currObj.className = gCSSReadOnly;
                        currObj.value = dayCnt;
                        currObj.tabIndex = tabIndex;
						/*FC11.2,ITR2 SFR512 STARTS
                        currObj.detachEvent('onkeydown',fnToggleFromKey);
                        currObj.setAttribute('onkeydown',"fnToggleFromKey()");
						FC11.2,ITR2 SFR512 ENDS*/
						currObj.removeAttribute('onkeydown');//FC11.2,ITR2 SFR512

                        tabIndex++;

                        if(col == gWeeklyHol1 || col == gWeeklyHol2)
                        {
                            currObj.className = gCSSHoliday;
                            monthList += "H";
                        }
                        else
                        {
                            monthList += "W";
                        }

                        if(col == 6)
                        {
                            col = 0;
                            row = row + 1;
                        }
                        else
                        {
                            col = col + 1;
                        }
                    }

                    var currRow = addNewRow("BLK_STTMS_CCY_HOLIDAY");
                    currRow.cells[1].getElementsByTagName("INPUT")[0].value = gCCYRef.value;
                    currRow.cells[2].getElementsByTagName("INPUT")[0].value = gYearRef.value;
                    currRow.cells[3].getElementsByTagName("INPUT")[0].value = monthCnt+1;
                    currRow.cells[4].getElementsByTagName("INPUT")[0].value = monthList;

                    //To clear the Existing unchanged values in the calendar
                    for(var tempCol = 0; tempCol < firstDay; tempCol++)
                    {
                        strCell   = monthName + "_0_" + tempCol;
                        				//FCUBS11.1 SFR#259STARTS
                //currObj = eval("document.form1." + strCell);
				//currObj = eval(strCell);--FC11.2,ITR2 SFR512
				 currObj = eval(document.getElementsByName(strCell)[0]);//FC11.2,ITR2 SFR512
				//FCUBS11.1 SFR#259 ENDS
                        currObj.value         = "";
                        currObj.className    = gCSSReadOnly;
                    }

                    if(col != 6) { col--; }

                    while(row <= 5)
                    {
                        for(var tempCol = col+1; tempCol < 7; tempCol++)
                        {
                            strCell   = monthName + "_" + row + "_" + tempCol;
                           				//FCUBS11.1 SFR#259STARTS
                //currObj = eval("document.form1." + strCell);
				//currObj = eval(strCell);--FC11.2,ITR2 SFR512
						currObj = eval(document.getElementsByName(strCell)[0]);//FC11.2,ITR2 SFR512
				//FCUBS11.1 SFR#259 ENDS
                            currObj.value         = "";
                            currObj.className    = gCSSReadOnly;
                        }

                        tempCol = 0;
                        col     = -1;
                        row++;
                    }
                }
            }

            else if(gAction == "EXECUTEQUERY" || gAction == 'MODIFY' || gAction == '')
            {

                var tblRef = document.getElementById('BLK_STTMS_CCY_HOLIDAY').tBodies[0];
                var dayStatus = '';

                for(var monthCnt = 0; monthCnt<12; monthCnt++)
                {
                    //gets the first day's instance of the given Month
                    firstDayInstance = getDateObject(inYear,monthCnt,1);
                    //gets the Month name
                    monthName        = fnGetMonthName(monthCnt);
                    //gets the numbers of days for the given Month
                    noDays            = fnGetDays(monthCnt,inYear);// FCUBS 10.5 STR1 SFR#271 02-07-2009
                    //gets the integer equavalent of the particular day
                    firstDay        = firstDayInstance.getDay();
                    col = firstDay; // sets to the first daycnt of the month
                    row = 0;
					//Bug#11932847 Starts
					//monthList =    tblRef.rows[monthCnt].cells[4].getElementsByTagName("INPUT")[0].value;
                   // monthList =    tblRef.rows[monthCnt].cells[3].getElementsByTagName("INPUT")[0].value; //FCUBS 11.4 ITR1 SFR#13340747
				   //FCUBS 11.4 ITR1 SFR#13340747  Starts
					if(typeof(tblRef.rows[monthCnt].cells[4].getElementsByTagName("INPUT")[0]) == 'undefined'){
                        monthList =    tblRef.rows[monthCnt].cells[4].getElementsByTagName("TEXTAREA")[0].value;
                    }else {
                    monthList =    tblRef.rows[monthCnt].cells[4].getElementsByTagName("INPUT")[0].value;
                    }
					//FCUBS 11.4 ITR1 SFR#13340747  Ends
					//Bug#11932847 Ends
                    for(var dayCnt = 1; dayCnt <= noDays ; dayCnt++)
                    {
                        dayStatus = monthList.charAt((dayCnt-1));
                        strCell   = monthName + "_" + row + "_" + col;
                        				//FCUBS11.1 SFR#259STARTS
                //currObj = eval("document.form1." + strCell);
				//currObj = eval(strCell);--FC11.2,ITR2 SFR512
						currObj = eval(document.getElementsByName(strCell)[0]);//FC11.2,ITR2 SFR512
				//FCUBS11.1 SFR#259 ENDS
                        currObj.value = "";
                        currObj.value = dayCnt;
                        currObj.tabIndex = tabIndex;
                        /*FC11.2,ITR2 SFR512 STARTS
                        currObj.detachEvent('onkeydown',fnToggleFromKey);
                        currObj.setAttribute('onkeydown',"fnToggleFromKey()");
						FC11.2,ITR2 SFR512 ENDS*/
						currObj.removeAttribute('onkeydown');//FC11.2,ITR2 SFR512
                        tabIndex++;
                        if(dayStatus == 'H')
                        {
                            currObj.className = gCSSHoliday;
                        }
                        else
                        {
                            currObj.className    = gCSSReadOnly;
                        }

                        if(col == 6)
                        {
                            col = 0;
                            row = row + 1;
                        }
                        else
                        {
                            col = col + 1;
                        }
                    }

                    //To clear the Existing unchanged values and style of the calendar
                    for(var tempCol = 0; tempCol < firstDay; tempCol++)
                    {
                        strCell   = monthName + "_0_" + tempCol;
                        				//FCUBS11.1 SFR#259STARTS
                //currObj = eval("document.form1." + strCell);
				//currObj = eval(strCell);--FC11.2,ITR2 SFR512
						currObj = eval(document.getElementsByName(strCell)[0]);//FC11.2,ITR2 SFR512
				//FCUBS11.1 SFR#259 ENDS
                        currObj.value         = "";
                        currObj.className    = gCSSReadOnly;
                    }

                    if(col != 6) { col--; }

                    while(row <= 5)
                    {
                        tempCol = 0;
                        for(var tempCol = col+1; tempCol < 7; tempCol++)
                        {
                            strCell   = monthName + "_" + row + "_" + tempCol;
                            				//FCUBS11.1 SFR#259STARTS
                //currObj = eval("document.form1." + strCell);
				//currObj = eval(strCell);--FC11.2,ITR2 SFR512
						currObj = eval(document.getElementsByName(strCell)[0]);//FC11.2,ITR2 SFR512
				//FCUBS11.1 SFR#259 ENDS
                            currObj.value         = "";
                            currObj.className    = gCSSReadOnly;
                        }

                        //tempCol = 0;
                        col     = -1;
                        row++;
                    }
                }
            }
			 else if (gAction=="VIEWMNTLOG") //9NT1606_12_4_RETRO_12_3_26524831 starts
            {
                var tblRef = document.getElementById('BLK_STTMS_CCY_HOLIDAY').tBodies[0];
                var dayStatus = '';
                var modDayStatus = '';
                var regExp = new RegExp('[^HW]','g');
                var title = "";

                for(var monthCnt = 0; monthCnt<12; monthCnt++)
                {
                    modifiedMonthList="";
                    //gets the first day's instance of the given Month
                    firstDayInstance = getDateObject(inYear,monthCnt,1);
                    //gets the Month name
                    monthName        = fnGetMonthName(monthCnt);
                    //gets the numbers of days for the given Month
                    noDays = fnGetDays(monthCnt, inYear);
                    //gets the integer equavalent of the particular day
                    firstDay        = firstDayInstance.getDay();
                    col = firstDay; // sets to the first daycnt of the month
                    row = 0;
                    if(typeof(tblRef.rows[monthCnt].cells[4].getElementsByTagName("INPUT")[0]) == 'undefined')
                    {
                        monthList =    tblRef.rows[monthCnt].cells[4].getElementsByTagName("TEXTAREA")[0].value;
                        var innerHTML = tblRef.rows[monthCnt].cells[4].getElementsByTagName("TEXTAREA")[0].getAttribute("oldInnerHTML");
                        var el = document.createElement(innerHTML);
                        if (el.title != '') 
                        {
                            title = el.title;
                            if (!regExp.test(title) && title.length == monthList.length )
                            {
                                modifiedMonthList = title;
        }
                        }
                    }
        else
                    {
                        monthList =    tblRef.rows[monthCnt].cells[4].getElementsByTagName("INPUT")[0].value;
                        if (tblRef.rows[monthCnt].cells[4].getElementsByTagName("INPUT")[0].title !='') 
                        {
                            title = tblRef.rows[monthCnt].cells[4].getElementsByTagName("INPUT")[0].title;
                            if (!regExp.test(title) && title.length == monthList.length )
                            {
                                modifiedMonthList = tblRef.rows[monthCnt].cells[4].getElementsByTagName("INPUT")[0].title;
                            }
                        }
                    }
                    for(var dayCnt = 1; dayCnt <= noDays ; dayCnt++)
                    {
                        dayStatus = monthList.charAt((dayCnt-1));
                        if (modifiedMonthList != ''){
                            modDayStatus= modifiedMonthList.charAt((dayCnt-1));
                        }
                        else{
                            modDayStatus = monthList.charAt((dayCnt-1));
                        }
                        strCell   = monthName + "_" + row + "_" + col;
                        currObj = eval(document.getElementsByName(strCell)[0]);
                        currObj.value = "";
                        currObj.value = dayCnt;
                        currObj.tabIndex = tabIndex;
                        currObj.removeAttribute('onkeydown');
                        tabIndex++;
                        if(dayStatus == 'H')
                        {
                            currObj.className = gCSSHoliday;
                        }
                        else
                        {
                            currObj.className    = gCSSReadOnly;
                        }
                        if (dayStatus !=modDayStatus)
                        {
                            currObj.style.color = gModified;
                            currObj.title = modDayStatus;
                        }
                        if(col == 6)
                        {
                            col = 0;
                            row = row + 1;
                        }
                        else
                        {
                            col = col + 1;
                        }
                    }
                    //To clear the Existing unchanged values and style of the calendar
                    for(var tempCol = 0; tempCol < firstDay; tempCol++)
                    {
                        strCell   = monthName + "_0_" + tempCol;
                        currObj = eval(document.getElementsByName(strCell)[0]);//FC11.2,ITR2 SFR512
                        currObj.value         = "";
                        currObj.className    = gCSSReadOnly;
                    }

                    if(col != 6) { col--; }

                    while(row <= 5)
                    {
                        tempCol = 0;
                        for(var tempCol = col+1; tempCol < 7; tempCol++)
                        {
                            strCell   = monthName + "_" + row + "_" + tempCol;
                            currObj = eval(document.getElementsByName(strCell)[0]);
                            currObj.value         = "";
                            currObj.className    = gCSSReadOnly;
                        }
                        col     = -1;
                        row++;
                    }
                }

            } //9NT1606_12_4_RETRO_12_3_26524831 ends
        }
        else
        {//Year is no numeric value
            appendErrorCode('ST-COM015','YEAR');
            isValid = false;
        }
    }
    else
    {//Year is left blank
        appendErrorCode('ST-COM013','YEAR');
        isValid = false;
    }

    if(isValid == false)
    {
        var msg = buildMessage(gErrCodes);
        alertMessage(msg);
        document.getElementsByName("YEAR")[0].select();
    }

    gYearRef.tabIndex = tabIndex++;
    document.getElementById("STTMS_CCY_HOL_MASTER__CCY").tabIndex = tabIndex++;
    document.getElementsByName("BTN_EXIT")[0].tabIndex   = tabIndex++;
 /*   if(document.getElementById("STTMS_CCY_HOL_MASTER__CCY").disabled == false) {
        document.getElementById("STTMS_CCY_HOL_MASTER__CCY").disabled = true;
    }*/
    if(document.getElementById("STTMS_CCY_HOL_MASTER__YEAR").readOnly == false) {
    document.getElementById("STTMS_CCY_HOL_MASTER__YEAR").readOnly = true;
    }
	if(document.getElementsByName("BTN_LEFT")[0].disabled == false) {
        document.getElementsByName("BTN_LEFT")[0].disabled = true;
    }
    if(document.getElementsByName("BTN_RIGHT")[0].disabled == false) {
        document.getElementsByName("BTN_RIGHT")[0].disabled = true;
    }
}

/*
 * Toggle color when the user duble click on the day
 * and
 * Create holiday list of that particular month
 */
function fnToggleColor(currObj)
{
    if(gAction == "NEW" || gAction == 'MODIFY')
    {
        var currObjName = currObj.name;
        var index = currObjName.indexOf('_');
        var day = 1;

        if(currObj.value != "")
        {
            day = currObj.value;
            var monthName        = currObjName.substring(0, index);
            var month            = fnGetMonthIndex(monthName);
            var loopObj          = null;
            var currMonthCell    = document.getElementById("BLK_STTMS_CCY_HOLIDAY").tBodies[0].rows[month].cells[4].getElementsByTagName("INPUT")[0];
            var inYear           = document.getElementById("BLK_STTMS_CCY_HOLIDAY").tBodies[0].rows[month].cells[2].getElementsByTagName("INPUT")[0].value;
            var firstDayInstance = getDateObject(inYear,month,1);

            col                  = firstDayInstance.getDay();

            if(currObj.className == gCSSReadOnly)
            {
                currObj.className = gCSSHoliday;
                currMonthCell.value = currMonthCell.value.substring(0,day-1) + "H" + currMonthCell.value.substring(day,currMonthCell.value.length)
            }
            else
            {
                currObj.className = gCSSReadOnly;
                currMonthCell.value = currMonthCell.value.substring(0,day-1) + "W" + currMonthCell.value.substring(day,currMonthCell.value.length)
            }
        }
    }
}

/*
 * Funtion to clear the calendar and set its default style
 */
function fnResetStyle()
{
    var monthName = "";
    var strCell   = "";
    var currObj   = null;
    gYearRef      = document.getElementById("STTMS_CCY_HOL_MASTER__YEAR");
	gLblYearOf    = document.getElementsByName("LBL_CURR_YEAR_VAL")[0];

    for(var monthCnt = 0; monthCnt < 12 ;monthCnt++)
    {
        monthName = fnGetMonthName(monthCnt);

        for(var rowCnt = 0; rowCnt < 6; rowCnt++)
        {
            for(var colCnt = 0; colCnt < 7;colCnt++)
            {
                strCell = monthName + "_" + rowCnt + "_" + colCnt;
				//FCUBS11.1 SFR#259STARTS
                //currObj = eval("document.form1." + strCell);
				//currObj = eval(strCell);--FC11.2,ITR2 SFR512
						currObj = eval(document.getElementsByName(strCell)[0]);//FC11.2,ITR2 SFR512
				//FCUBS11.1 SFR#259 ENDS
                currObj.className = gCSSReadOnly;
                currObj.tabIndex  = -1;
            }
        }
    }

    gYearRef.tabIndex = -1;
    document.getElementById("STTMS_CCY_HOL_MASTER__CCY").tabIndex = -1;
    document.getElementsByName("BTN_EXIT")[0].tabIndex = -1;
}

/*
 * Function  to validate year
 */
function fnValidateYear(year)
{
    var isValid = true;
    if(year != '' )
    {
        if(isNumeric(year))
        {
            if(year < 2000)
            {
                appendErrorCode('ST-CCH01','YEAR');
                isValid = true;  //Changed from false to true in order to save calender earlier than 2000.
                document.getElementsByName("YEAR")[0].select();
            }
        }
        else
        {
            appendErrorCode('ST-COM015','YEAR');
            isValid = false;
            document.getElementsByName("YEAR")[0].select();
        }
    }
    return isValid;

}

/*
 * used to toggle the between holiday to working day using SPACEBAR
 */
function fnToggleFromKey()
{
    var srcElem = event.srcElement;
    if(event.keyCode == 32 && srcElem.value != "")
    {
        fnToggleColor(srcElem);
    }
    event.cancelBubble = true;
}

function fnPrevYear()
{
    if(gAction='NEW')
    {
		var curYear1 = document.getElementById('STTMS_CCY_HOL_MASTER__YEAR').value;
		curYear1 = parseInt(curYear1);
		curYear1 = curYear1 - 1;
		document.getElementById('STTMS_CCY_HOL_MASTER__YEAR').value = curYear1;
		fireHTMLEvent(document.getElementById("STTMS_CCY_HOL_MASTER__YEAR"), "onpropertychange");//FCUBS_12.1.0_21066833
    }
}


function fnNextYear()
{
    if(gAction='NEW')
    {
		var curYear2 = document.getElementById('STTMS_CCY_HOL_MASTER__YEAR').value;
		curYear2 = parseInt(curYear2);
		curYear2 = curYear2 + 1;
		document.getElementById('STTMS_CCY_HOL_MASTER__YEAR').value = curYear2;
        fireHTMLEvent(document.getElementById("STTMS_CCY_HOL_MASTER__YEAR"), "onpropertychange");//FCUBS_12.1.0_21066833
	}
}
function fnCalHolHeading() {
    var l_hol_head_list = new Array("LBL_SUNDAY_1", "LBL_MONDAY_1", "LBL_TUESDAY_1", "LBL_WEDNESDAY_1", "LBL_THURSDAY_1", "LBL_FRIDAY_1", "LBL_SATURDAY_1",
                        "LBL_SUNDAY_2", "LBL_MONDAY_2", "LBL_TUESDAY_2", "LBL_WEDNESDAY_2", "LBL_THURSDAY_2", "LBL_FRIDAY_2", "LBL_SATURDAY_2",
                        "LBL_SUNDAY_3", "LBL_MONDAY_3", "LBL_TUESDAY_3", "LBL_WEDNESDAY_3", "LBL_THURSDAY_3", "LBL_FRIDAY_3", "LBL_SATURDAY_3");
    document.getElementById("dataContainer_BLK_STTMS_CCY_HOLIDAY").style.display="none";
    for (var i=0; i<l_hol_head_list.length; i++) {
        document.getElementsByName(l_hol_head_list[i])[0].className = "TEXTCalHead";
    }
}
//FCUBS11.1 SFR#259 STARTS
/*function fnExit() {
    if (gAction != "") {
    	appendErrorCode('ST-COM012',"");
    	if (confirmAction()) {
			resetElements();
            var l_RelLockStatus = true;
            if(gAction =="MODIFY") {
                l_RelLockStatus = releaseLock();
            }
            if (l_RelLockStatus) {

                if (gAction == "ENTERQUERY") {
                    showData(dbStrRootTableName, 1);
                } else {
                    dbDataDOM=null;
                }
                gAction = "";
                disableForm();
                fnEnableSubSysButtons();
                fnSetExitButton(false);
                //fnCalHolHeading();
                showToolbar("","","");
                return
            } else {
                return;
            }
	} else {
            return;
	}

    } else {
        dbDataDOM=null;
        resetElements();
        isExitTriggered = true;
        showToolbar("","","");
        mainWin.fnExit(window);
    }
}
*/
//FCUBS11.1 SFR#259 ENDS
