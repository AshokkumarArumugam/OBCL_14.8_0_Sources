CREATE OR REPLACE FORCE  VIEW olvw_all_accounts
/*(
AC_NATIVE, AC_GL_NO, PKEY, BRANCH_CODE, AC_GL_CCY, AC_OR_GL, CUST_NO, 
GL_ACLASS_TYPE, AC_GL_DESC, AC_STAT_NO_CR, AC_STAT_NO_DR, GL_STAT_BLOCKED, 
AC_STAT_STOP_PAY, AC_STAT_DORMANT, AC_STAT_FROZEN, GL_STAT_DE_POST, GL_BRANCH_RES, 
GL_CCY_RES, ALT_AC_NO, CUST_NAME1, GL_CATEGORY, RECON_TYPE, AC_CLASS, AC_NATURAL_GL, 
CUSTOMER_CAT, OFFLINE_LIMIT, AC_GL_REC_STATUS, AC_OPEN_DATE, AUTH_STAT, 
IBAN_AC_NO, ONCE_AUTH, AC_STAT_DECEASED, INTERNAL_GL_TYPE,
 AC_STAT_UNKNOWN_ADDRESS, AC_STAT_TEMPORARY_CLOSED,
LD_REFINANCE_GL,ONLINE_UPDATE
)*/
AS
SELECT 
	b.AC_NATIVE,
	b.AC_GL_NO,
	--b.PKEY,
	br.branch_code,
	b.AC_GL_CCY,
	b.AC_OR_GL,
	b.CUST_NO,
	b.GL_ACLASS_TYPE,
	b.AC_GL_DESC,
	b.AC_STAT_NO_CR,
	b.AC_STAT_NO_DR,
	b.GL_STAT_BLOCKED,
	--b.AC_STAT_STOP_PAY,
	b.AC_STAT_DORMANT,
	b.AC_STAT_FROZEN,
	--b.GL_STAT_DE_POST,
	--b.GL_BRANCH_RES,
	--b.GL_CCY_RES,
	--b.ALT_AC_NO,
	b.CUST_NAME1,
	b.GL_CATEGORY,
	--b.RECON_TYPE,
	b.AC_CLASS,
	--b.AC_NATURAL_GL,
	--b.CUSTOMER_CAT,
	--b.OFFLINE_LIMIT,
	b.AC_GL_REC_STATUS,	
	b.AC_OPEN_DATE,
	b.AUTH_STAT,
	b.IBAN_AC_NO,
	b.ONCE_AUTH,
	--b.AC_STAT_DECEASED,
	'C' INTERNAL_GL_TYPE
	--b.AC_STAT_UNKNOWN_ADDRESS,
	--b.AC_STAT_TEMPORARY_CLOSED
	--,b.LD_REFINANCE_GL 
	--,b.ONLINE_UPDATE 
from oltb_account b, oltms_branch br
where 	(	( 	b.ac_or_gl = 'A'
			AND b.branch_code = br.branch_code
			AND b.once_auth = 'Y'
		)
		OR
		(	b.ac_or_gl = 'G'
			AND EXISTS	( SELECT 1 FROM sytv_gl_master g
						WHERE g.gl_code = b.ac_gl_no
						/*AND 	(	(	g.BRANCH_RESTRICTION = 'A'
									AND EXISTS 	( SELECT 1 FROM oltms_gl_brn_disallow a
												WHERE a.gl_code = b.ac_gl_no
												AND a.branch_disallow = br.branch_code
											)
								)
							OR
								( 	g.BRANCH_RESTRICTION = 'D'
									AND NOT EXISTS ( SELECT 1 FROM oltms_gl_brn_disallow d
												WHERE d.gl_code	= b.ac_gl_no
												AND d.branch_disallow = br.branch_code
											)
								)*/
							)
					)
			AND NOT EXISTS
				(
					SELECT	1
					FROM 	sytv_gl_master g
					WHERE	g.gl_code = b.ac_gl_no
					--AND	g.customer = 'C'
				)
		)
	--)
and 	br.branch_code = global.current_branch
and 	b.ac_gl_rec_status = 'O';
create or replace synonym olvws_all_accounts for olvw_all_accounts
/