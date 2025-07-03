CREATE OR REPLACE PACKAGE olpks_utility_upload IS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_utility_upload.SPC
**
** Module	: CORE SERVICES
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
/*----------------------------------------------------------------------------------------------------
CHANGE HISTORY
26-JUN-2012 CITIUS#14537 changes - New Utility Screen for patches
-----------------------------------------------------------------------------------------------------
*/


FUNCTION fn_validate_actliqd
			(
			p_seq_no			IN NUMBER
			,p_source			IN VARCHAR2
			,p_patch_type 		IN VARCHAR2
			,p_classification 	IN VARCHAR2
			)
RETURN BOOLEAN;

FUNCTION fn_validate_cusip
			(
			p_seq_no			IN NUMBER
			,p_source			IN VARCHAR2
			,p_patch_type 		IN VARCHAR2
			,p_classification 	IN VARCHAR2
			)
RETURN BOOLEAN;

FUNCTION fn_validate_tax
			(
			p_seq_no			IN NUMBER
			,p_source			IN VARCHAR2
			,p_patch_type 		IN VARCHAR2
			,p_classification 	IN VARCHAR2
			)
RETURN BOOLEAN;

FUNCTION fn_change_cont_status
			(
			p_seq_no			IN NUMBER
			,p_source			IN VARCHAR2
			,p_patch_type 		IN VARCHAR2
			,p_classification 	IN VARCHAR2
			)
RETURN BOOLEAN;

FUNCTION fn_change_tax_details
			(
			p_seq_no			IN NUMBER
			,p_source			IN VARCHAR2
			,p_patch_type 		IN VARCHAR2
			,p_classification 	IN VARCHAR2
			)
RETURN BOOLEAN;

FUNCTION fn_change_cusip_a2b
			(
			p_seq_no			IN NUMBER
			,p_source			IN VARCHAR2
			,p_patch_type 		IN VARCHAR2
			,p_classification 	IN VARCHAR2
			)
RETURN BOOLEAN;

FUNCTION fn_change_cusip_a2b_plc
			(
			p_seq_no			IN NUMBER
			,p_source			IN VARCHAR2
			,p_patch_type 		IN VARCHAR2
			,p_classification 	IN VARCHAR2
			)
RETURN BOOLEAN;

FUNCTION fn_change_cusip_link
			(
			p_seq_no			IN NUMBER
			,p_source			IN VARCHAR2
			,p_patch_type 		IN VARCHAR2
			,p_classification 	IN VARCHAR2
			)
RETURN BOOLEAN;

FUNCTION fn_change_cusip_rlink
			(
			p_seq_no			IN NUMBER
			,p_source			IN VARCHAR2
			,p_patch_type 		IN VARCHAR2
			,p_classification 	IN VARCHAR2
			)
RETURN BOOLEAN;

END olpks_utility_upload;
/
create or replace synonym olpkss_utility_upload for olpks_utility_upload
/