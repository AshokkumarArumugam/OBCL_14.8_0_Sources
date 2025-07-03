/*----------------------------------------------------------------------------------------------------
**
** File Name    : GlobalConstants.js
**
** Module       : FCJWeb
**
** This source is part of the Oracle Flexcube Universal Banking
** Software System and is copyrighted by Oracle Financial Services Software Limited.

** All rights reserved.  No part of this work may be reproduced,
** stored in a retrieval system, adopted or transmitted in any form
** or by any means, electronic, mechanical, photographic, graphic,
** optic recording or otherwise, translated in any language or
** computer language, without the prior written permission  from Oracle Financial Services
** Software Limited.

** Oracle Financial Services Software Limited.,
** 10-11, SDF I, SEEPZ, Andheri (East),
** MUMBAI - 400 096.
** INDIA.

Copyright © 2004-2011   by Oracle Financial Services Software Limited..
---------------------------------------------------------------------------------------------------- 
*/
/* Delimiters used in MSG - Dont Remove*/
var gcQueryRowDelim = "|";
var gcQueryColDelim = "~";
var gcQueryTokenDelim = ":";
var gcFNTokenDelim = "~";
var gcFVTokenDelim = "~";

var gDenomBlockName = "BLK_DENOMINATION_DETAILS";

//11.0 denom defaulting changes starts
var gFXDenomBlockName = "BLK_DENOMINATION_DETAILS_FX";
var gDenomSEBlockName = "BLK_DENOMINATION_SE";
var gFXDenomSEBlockName = "BLK_DENOMINATION_FXSE";
//11.0 denom defaulting changes ends
var gNonCcyBlockName = "BLK_TCDENOMINATION_DETAILS"; //Kernel 10.3 changes
var gIBDenomBlockName = "BLK_DENOMINATION_DETAILS";
var gDenomBalBlockName = "BLK_DETB_DENOM_BALANCING";
var gNonCcyBalBlockName = "BLK_DETB_NONCCY_BALANCING";
var gTCBalBlockName = "BLK_TCDENOM_DETAILS";
//FC10.5 HELP FILES CHANGES FOR BRANCH
var gChargeBlockName = "BLK_CHARGE_DETAILS";
var gMisBlockName = "BLK_MIS_DETAILS";
var gUdfBlockName = "BLK_UDF_DETAILS";

//Changed for pending task # start
var gTxn = "";
var gStage = "";
//Changed for pending task # end
