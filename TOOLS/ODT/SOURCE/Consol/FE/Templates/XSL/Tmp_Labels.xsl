<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

   <xsl:variable name="exp_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_EXPORT~~'), '@@')" />
   <xsl:variable name="advanced_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_ADVANCED~~'), '@@')" />
   <xsl:variable name="advance_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_INFRA_ADVANCED~~'), '@@')" />
   <xsl:variable name="search_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_SEARCH~~'), '@@')" />   
   <xsl:variable name="reset_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_RESET~~'), '@@')" /> 
   <xsl:variable name="recordsPerPage_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_RECORDS_PER_PAGE~~'), '@@')" /> 
   <xsl:variable name="gotoPage_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_GOTO_PAGE~~'), '@@')" /> 
   <xsl:variable name="of_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_OF~~'), '@@')" /> 
   <xsl:variable name="query_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_QRY_QUERY~~'), '@@')" />
   <xsl:variable name="refresh_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_REFRESH~~'), '@@')" />
   <xsl:variable name="result_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_RESULT~~'), '@@')" />
   <xsl:variable name="makerId_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_MAKERID~~'), '@@')" />
   <xsl:variable name="checkerId_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_CHECKER_ID~~'), '@@')" />
   <xsl:variable name="recordStat_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_RECORD_STAT~~'), '@@')" />
   <xsl:variable name="authStat_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_AUTHORISATION_STATUS~~'), '@@')" />
   <xsl:variable name="makerDate_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_MAKER_DT_STAMP~~'), '@@')" />
   <xsl:variable name="checkerDate_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_CHECKER_DT_STAMP~~'), '@@')" />
   <xsl:variable name="lableA_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_A~~'), '@@')" />
   <xsl:variable name="lableU_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_SUMMARY_U~~'), '@@')" />
   <xsl:variable name="lableO_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_O~~'), '@@')" />
   <xsl:variable name="lableC_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_C~~'), '@@')" />
   <xsl:variable name="unauthorized_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_UN_AUTH_FLG~~'), '@@')" />
   <xsl:variable name="open_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_OPEN~~'), '@@')" />
   <xsl:variable name="closed_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_CLOSED~~'), '@@')" />
   <xsl:variable name="authStat_Audit" select="substring-before(substring-after($summaryLabels, 'LBL_AUTHORIZED~~'), '@@')" />
   <xsl:variable name="authorized_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_AUTHORIZED~~'), '@@')" />
   <xsl:variable name="exit_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_EXIT~~'), '@@')" />

   <xsl:variable name="ok_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_OK~~'), '@@')" />
   <xsl:variable name="cancle_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_CANCEL~~'), '@@')" />
   <xsl:variable name="fields_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_FIELDS~~'), '@@')" />
   <xsl:variable name="operator_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_OPERATOR~~'), '@@')" />
   <xsl:variable name="value_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_VALUE~~'), '@@')" />
   <xsl:variable name="and_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_AND~~'), '@@')" />
   <xsl:variable name="accept_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_ACCEPT~~'), '@@')" />
   <xsl:variable name="clearQuery_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_CLEAR_QUERY~~'), '@@')" />
   <xsl:variable name="orderBy_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_ORDER_BY~~'), '@@')" />
   <xsl:variable name="ascending_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_ASCENDING~~'), '@@')" />
   <xsl:variable name="descending_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_DESCENDING~~'), '@@')" />
   <xsl:variable name="to_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_TO~~'), '@@')" />
   <xsl:variable name="or_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_OR~~'), '@@')" />
   
   <xsl:variable name="calendar_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_CALENDAR~~'), '@@')" />
   <xsl:variable name="narrative_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_NARRATIVE~~'), '@@')" />
   <xsl:variable name="lov_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_LIST_OF_VALUES~~'), '@@')" />
   <xsl:variable name="previous_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_INFRA_PREVIOUS~~'), '@@')" />
   <xsl:variable name="next_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_NEXT~~'), '@@')" />
   <xsl:variable name="first_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_FIRST~~'), '@@')" />
   <xsl:variable name="last_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_LAST~~'), '@@')" />
   <xsl:variable name="noScript" select="substring-before(substring-after($summaryLabels, 'LBL_NOSCRIPT_LABEL~~'), '@@')" />   
   <xsl:variable name="records" select="substring-before(substring-after($summaryLabels, 'LBL_RECORDS~~'), '@@')" />   
   <xsl:variable name="taskList" select="substring-before(substring-after($summaryLabels, 'LBL_TASKLIST~~'), '@@')" />   
   <xsl:variable name="advSummary" select="substring-before(substring-after($summaryLabels, 'LBL_ADVANCED_SUMMARY~~'), '@@')" />   
   <xsl:variable name="summary" select="substring-before(substring-after($summaryLabels, 'LBL_SUMMARY~~'), '@@')" /> 
   <xsl:variable name="page_footer" select="substring-before(substring-after($summaryLabels, 'LBL_PAGE_FOOTER~~'), '@@')" />
   <xsl:variable name="end_table" select="substring-before(substring-after($summaryLabels, 'LBL_END_TABLE~~'), '@@')" />
    
</xsl:stylesheet>
    
