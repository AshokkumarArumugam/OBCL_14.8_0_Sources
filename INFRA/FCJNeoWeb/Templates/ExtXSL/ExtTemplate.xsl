<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html"/>
    <xsl:param name="screen"/>
    <xsl:param name="functionId"/>
    <xsl:param name="uiXML"/>
    <xsl:param name="imgPath"/>
    <xsl:param name="displaySize"/>
    <xsl:param name="thirdChar"/>
    <xsl:param name="XslLabels"/>
    <xsl:param name="globalVariables"/>
    <!--12.0.3 Defaulting global variables-->
    <xsl:param name="applicationName"/>
    <xsl:param name="noScript"/>
    <xsl:param name="CurTabId"/>
    <xsl:param name="largeScreenWidth"/>
    <xsl:param name="mediumScreenWidth"/>
    <xsl:param name="prevSeqNo"/>
    <xsl:param name="screenHeight"/>
	
    <!-- Start of ExtLabels.xsl -->
    <xsl:variable name="advanced_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_ADVANCED~~'), '@@')"/>
    <xsl:variable name="search_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_SEARCH~~'), '@@')"/>
    <xsl:variable name="reset_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_RESET~~'), '@@')"/>
    <xsl:variable name="recordsPerPage_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_RECORDS_PER_PAGE~~'), '@@')"/>
    <xsl:variable name="gotoPage_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_GOTO_PAGE~~'), '@@')"/>
    <xsl:variable name="of_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_OF~~'), '@@')"/>
    <xsl:variable name="query_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_QRY_QUERY~~'), '@@')"/>
    <xsl:variable name="refresh_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_REFRESH~~'), '@@')"/>
    <xsl:variable name="result_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_RESULT~~'), '@@')"/>
    <xsl:variable name="makerId_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_MAKERID~~'), '@@')"/>
    <xsl:variable name="checkerId_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_CHECKER_ID~~'), '@@')"/>
    <xsl:variable name="recordStat_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_RECORD_STAT~~'), '@@')"/>
    <xsl:variable name="authStat_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_AUTHORISATION_STATUS~~'), '@@')"/>
    <xsl:variable name="makerDate_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_MAKER_DT_STAMP~~'), '@@')"/>
    <xsl:variable name="checkerDate_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_CHECKER_DT_STAMP~~'), '@@')"/>
    <xsl:variable name="lableA_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_A~~'), '@@')"/>
    <xsl:variable name="lableU_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_SUMMARY_U~~'), '@@')"/>
    <xsl:variable name="lableO_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_O~~'), '@@')"/>
    <xsl:variable name="lableC_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_C~~'), '@@')"/>
    <xsl:variable name="unauthorized_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_UN_AUTH_FLG~~'), '@@')"/>
    <xsl:variable name="open_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_OPEN~~'), '@@')"/>
    <xsl:variable name="closed_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_CLOSED~~'), '@@')"/>
    <xsl:variable name="authStat_Audit" select="substring-before(substring-after($XslLabels, 'LBL_AUTHORIZED~~'), '@@')"/>
    <xsl:variable name="authorized_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_AUTHORIZED~~'), '@@')"/>
    <xsl:variable name="exit_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_EXIT~~'), '@@')"/>
    <xsl:variable name="ok_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_OK~~'), '@@')"/>
    <xsl:variable name="cancle_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_CANCEL~~'), '@@')"/>
    <xsl:variable name="fields_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_FIELDS~~'), '@@')"/>
    <xsl:variable name="operator_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_OPERATOR~~'), '@@')"/>
    <xsl:variable name="value_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_VALUE~~'), '@@')"/>
    <xsl:variable name="and_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_AND~~'), '@@')"/>
    <xsl:variable name="accept_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_ACCEPT~~'), '@@')"/>
    <xsl:variable name="clearQuery_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_CLEAR_QUERY~~'), '@@')"/>
    <xsl:variable name="orderBy_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_ORDER_BY~~'), '@@')"/>
    <xsl:variable name="ascending_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_ASCENDING~~'), '@@')"/>
    <xsl:variable name="descending_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_DESCENDING~~'), '@@')"/>
    <xsl:variable name="to_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_TO~~'), '@@')"/>
    <xsl:variable name="or_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_OR~~'), '@@')"/>
    <xsl:variable name="ok" select="substring-before(substring-after($XslLabels, 'LBL_OK~~'), '@@')"/>
    <xsl:variable name="exit" select="substring-before(substring-after($XslLabels, 'LBL_EXIT~~'), '@@')"/>
    <xsl:variable name="cancel" select="substring-before(substring-after($XslLabels, 'LBL_CANCEL~~'), '@@')"/>
    <xsl:variable name="vernoOfLbl" select="substring-before(substring-after($XslLabels, 'LBL_OF~~'), '@@')"/>
    <xsl:variable name="lock_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_SUM_LOCK~~'), '@@')"/>
    <xsl:variable name="checkboxYes" select="substring-before(substring-after($XslLabels, 'LBL_CHECKBOX_YES~~'), '@@')"/>
    <xsl:variable name="checkboxNo" select="substring-before(substring-after($XslLabels, 'LBL_CHECKBOX_NO~~'), '@@')"/>
    <xsl:variable name="mandatory" select="substring-before(substring-after($XslLabels, 'LBL_INFRA_MANDATORY~~'), '@@')"/>
    <!--<xsl:variable name="noScript" select="substring-before(substring-after($XslLabels, 'LBL_NOSCRIPT_LABEL~~'), '@@')" /> Already coming from parameters -->
    <xsl:variable name="summary" select="substring-before(substring-after($XslLabels, 'LBL_SUMMARY~~'), '@@')"/>
    <xsl:variable name="expand_group" select="substring-before(substring-after($XslLabels, 'LBL_EXPAND_GROUP~~'), '@@')"/>
    <xsl:variable name="lov" select="substring-before(substring-after($XslLabels, 'LBL_LIST_OF_VALUES~~'), '@@')"/>
    <xsl:variable name="previous" select="substring-before(substring-after($XslLabels, 'LBL_INFRA_PREVIOUS~~'), '@@')"/>
    <xsl:variable name="next" select="substring-before(substring-after($XslLabels, 'LBL_NEXT~~'), '@@')"/>
    <xsl:variable name="first" select="substring-before(substring-after($XslLabels, 'LBL_FIRST~~'), '@@')"/>
    <xsl:variable name="last" select="substring-before(substring-after($XslLabels, 'LBL_LAST~~'), '@@')"/>
    <xsl:variable name="add_row" select="substring-before(substring-after($XslLabels, 'LBL_ADDROW~~'), '@@')"/>
    <xsl:variable name="delete_row" select="substring-before(substring-after($XslLabels, 'LBL_DELETEROW~~'), '@@')"/>
    <xsl:variable name="single_rec_view" select="substring-before(substring-after($XslLabels, 'LBL_SINGLE_REC_VIEW~~'), '@@')"/>
    <xsl:variable name="lock" select="substring-before(substring-after($XslLabels, 'LBL_LOCK~~'), '@@')"/>
    <xsl:variable name="columns" select="substring-before(substring-after($XslLabels, 'LBL_COLUMNS~~'), '@@')"/>
    <xsl:variable name="narrative" select="substring-before(substring-after($XslLabels, 'LBL_NARRATIVE~~'), '@@')"/>
    <xsl:variable name="select_all_rows" select="substring-before(substring-after($XslLabels, 'LBL_SELECT_ALL_ROWS~~'), '@@')"/>
    <xsl:variable name="select_row" select="substring-before(substring-after($XslLabels, 'LBL_SELECT_ROW~~'), '@@')"/>
    <xsl:variable name="reject" select="substring-before(substring-after($XslLabels, 'LBL_REJECT~~'), '@@')"/>
    <xsl:variable name="calendar" select="substring-before(substring-after($XslLabels, 'LBL_CALENDAR~~'), '@@')"/>
    <xsl:variable name="page_footer" select="substring-before(substring-after($XslLabels, 'LBL_PAGE_FOOTER~~'), '@@')"/>
    <xsl:variable name="empty_col" select="substring-before(substring-after($XslLabels, 'LBL_EMPTY_COLUMN~~'), '@@')"/>
    <xsl:variable name="end_table" select="substring-before(substring-after($XslLabels, 'LBL_END_TABLE~~'), '@@')"/>
    <xsl:variable name="expand_section" select="substring-before(substring-after($XslLabels, 'LBL_EXPAND_SECTION~~'), '@@')"/>
    <xsl:variable name="collapse_section" select="substring-before(substring-after($XslLabels, 'LBL_COLLAPSE_SECTION~~'), '@@')"/>
    <!-- added for 17388325 start -->
    <xsl:variable name="currentVersion" select="substring-before(substring-after($XslLabels, 'LBL_CURRENT_VERSION~~'), '@@')"/>
    <xsl:variable name="totalVersion" select="substring-before(substring-after($XslLabels, 'LBL_TOTAL_VERSION~~'), '@@')"/>
    <xsl:variable name ="screenWidth">	 
		  <xsl:value-of select="number($largeScreenWidth)"></xsl:value-of>
    </xsl:variable>
  <xsl:template match="/">
        <xsl:apply-templates select="FORM/SCREEN/BODY/TAB/SECTION">
          <xsl:with-param name="curr_blk" select="FORM/SCREEN/BODY/TAB/SECTION"/>
        </xsl:apply-templates>
    </xsl:template>
  <xsl:template match="SECTION">
    <xsl:param name="curr_blk" select="."/>
    <!--Fix for 20805413 start -->
    <div>
     <xsl:attribute name="id">
        <xsl:text>testwin</xsl:text>
        <xsl:value-of select="@ID"/>
     </xsl:attribute>  
	<!--Fix for 20805413 end -->
    <xsl:attribute name="style">
				<xsl:text>width:</xsl:text>
				<xsl:value-of select="$screenWidth"/>
				<xsl:text>px</xsl:text>
			</xsl:attribute>
    <!--<xsl:if test="count(./LBL)>0">
     <legend>
        <xsl:value-of select="./LBL"/>
    </legend>
    </xsl:if>-->
      <!--xsl:attribute name="id">
          <xsl:value-of select="concat(../@ID,'__',@ID)"/>
      </xsl:attribute>-->
      <iframe src="" allowtransparency="true" frameborder="0" scrolling="no" title="0">
      <xsl:if test="position()=1">
        <xsl:choose>
            <xsl:when test="$prevSeqNo > 0">
                <xsl:attribute name="tempSrc">
                  <xsl:value-of select="concat('TempForward.jsp?action=SMSStartLogServlet&amp;funcid=',./FUNCID,'&amp;srcType=',./TYPE,'&amp;sectionName=',@ID,'&amp;uiName=&amp;msgType=WORKFLOW&amp;actionType=initiate&amp;timestamp=&amp;numeric=&amp;parentArgs=&amp;dashboardArgs=&amp;inTime=&amp;txnBranch=&amp;debugFlag=N&amp;userLevelDbgEnabled=N')"/><!--Fix for 20805413-->
                </xsl:attribute>
            </xsl:when>
        <xsl:otherwise>      
            <xsl:attribute name="src">
              <xsl:value-of select="concat('TempForward.jsp?action=SMSStartLogServlet&amp;funcid=',./FUNCID,'&amp;srcType=',./TYPE,'&amp;sectionName=',@ID,'&amp;uiName=&amp;msgType=WORKFLOW&amp;actionType=initiate&amp;timestamp=&amp;numeric=&amp;parentArgs=&amp;dashboardArgs=&amp;inTime=&amp;txnBranch=&amp;debugFlag=N&amp;userLevelDbgEnabled=N')"/><!--Fix for 20805413-->
            </xsl:attribute>
        </xsl:otherwise>
    </xsl:choose>
       
      </xsl:if>
      <xsl:if test="position()!=1">
    
        <xsl:attribute name="tempSrc">
          <xsl:value-of select="concat('TempForward.jsp?action=SMSStartLogServlet&amp;funcid=',./FUNCID,'&amp;srcType=',./TYPE,'&amp;sectionName=',@ID,'&amp;uiName=&amp;msgType=WORKFLOW&amp;actionType=initiate&amp;timestamp=&amp;numeric=&amp;parentArgs=&amp;dashboardArgs=&amp;inTime=&amp;txnBranch=&amp;debugFlag=N&amp;userLevelDbgEnabled=N')"/><!--Fix for 20805413-->
        </xsl:attribute>
        <!--Fix for 20805413 start-->
		<xsl:attribute name="onload">
            <xsl:text disable-output-escaping="yes">setLang(this);</xsl:text>
        </xsl:attribute>
        <!--Fix for 20805413 end-->
        <!--<xsl:if test="$prevSeqNo !=''">
        <xsl:attribute name="src">
          <xsl:value-of select="concat('TempForward.jsp?action=SMSStartLogServlet&amp;funcid=',./FUNCID,'&amp;srcType=',./TYPE,'&amp;uiName=&amp;msgType=WORKFLOW&amp;actionType=initiate&amp;timestamp=&amp;numeric=&amp;parentArgs=&amp;dashboardArgs=&amp;inTime=&amp;txnBranch=&amp;debugFlag=N&amp;userLevelDbgEnabled=N')"/>
        </xsl:attribute>
        </xsl:if>-->
      </xsl:if>
        <xsl:attribute name="id">
        <xsl:text>ifr_LaunchWin_</xsl:text>
        <xsl:value-of select="@ID"/>
        </xsl:attribute>  
        <xsl:attribute name="prevSeqNo">
            <xsl:value-of select="$prevSeqNo"/>
        </xsl:attribute>
        <xsl:attribute name="style">
          <xsl:text>width:</xsl:text>
          <xsl:value-of select="number($screenWidth) - 30"/>
          <xsl:text>px;z-index:10;height:0px</xsl:text>
        </xsl:attribute>
        <xsl:attribute name="TYPE">
            <xsl:value-of select="./TYPE"/>
        </xsl:attribute>
      </iframe>
    </div>
  </xsl:template>
</xsl:stylesheet>
