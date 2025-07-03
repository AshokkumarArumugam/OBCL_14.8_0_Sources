<?xml version="1.0"?>
<!--

**  Modified By          : Vignesh MG
**  Modified On          : 23-Jan-2020
**  Change Description   : INFRA CHANGES FOR OBTR 14.4 ENHANCEMENTS
**  Search String        : 30620131

**  Modified By          : Selvam Manickam
**  Modified On          : 26-Apr-2023
**  Change Description   : AMOUNT VALUE IS NOT SHOWING IN SUMMARY SCREEN.
**  Search String        : redwood_35299973
**
**  Modified By          : Shayam Sundar Ragunathan
**  Modified On          : 08-May-2023
**  Change Description   : Check box values not displaying properly
**  Search String        : REDWOOD_35239225
**
**  Modified By          : Girish M
**  Modified On          : 11-May-2023
**  Change Description   : DATE TIME support added for summary screen
**  Search String        : REDWOOD_35322134
**
**  Modified By          : Selvam Manickam
**  Modified On          : 11-May-2023
**  Change Description   : In the summary screen footer parts last button was not showing fully. Ex:-Only Sp is displayed instead of Spool
						   Extent conveyor-belt to show extra buttons(callform/subscreen): oj-md-9 to oj-md-10
**  Search String        : REDWOOD_35298529

**  Modified By          : Nagendra Babu
**  Modified On          : 22-May-2023
**  Change Description   : STSCIF Upon doing order by, system does not open correct record.
**  Search String        : REDWOOD_35283566 


-->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:variable name="Brn_Neo" select="''"/>
    <xsl:output method="html"/>
    <xsl:variable name="gPosition" select="'template'"/>
    <xsl:variable name="cQuery" select="'Q'"/>
    <xsl:variable name="cResult" select="'R'"/>
    <xsl:variable name="cAdvanced" select="'A'"/>
    <xsl:variable name="cAll" select="'All'"/>
    <xsl:param name="largeScreenWidth"/>
    <xsl:param name="mediumScreenWidth"/>
    <xsl:param name="screenHeight"/>
    <xsl:param name="dateFormat"/><!--HTML5 Changes -->
    <xsl:param name="dateDelimiterReqd"/> <!--9NT1606_14_0_RETRO_12_0_3_27393036 changes-->
<!-- Start of ExtLabels.xsl -->
 <xsl:variable name="search_results" select="substring-before(substring-after($XslLabels, 'LBL_SEARCH_RESULT~~'), '@@')" />
 <xsl:variable name="search_criteria" select="substring-before(substring-after($XslLabels, 'LBL_SEARCH_CRITERIA~~'), '@@')" />
   <xsl:variable name="saveCriteria_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_TOOLBAR_SAVE~~'), '@@')" />
   <xsl:variable name="savedQry_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_SAVED_QUERY~~'), '@@')" />
   <xsl:variable name="clearAll_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_CLEAR_ALL~~'), '@@')" />
   <xsl:variable name="export_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_EXPORT~~'), '@@')" />
   <xsl:variable name="exportAll_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_EXPORT_ALL~~'), '@@')" />
   <xsl:variable name="advanced_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_ADVANCED~~'), '@@')" />
   <!--Changed for 17079537 -->
   <xsl:variable name="search_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_SEARCH~~'), '@@')" /> 
   <!-- bug id 14842317 change starts  -->
   <xsl:variable name="search_CaseSensitive" select="substring-before(substring-after($XslLabels, 'LBL_CASE_SENSITIVE~~'), '@@')" />  
   <!-- 12.1 summary performance changes new start -->
   <xsl:variable name="optional_field" select="substring-before(substring-after($XslLabels, 'LBL_OPTIONAL~~'), '@@')" />  
   <xsl:variable name="recommended_field" select="substring-before(substring-after($XslLabels, 'LBL_RECOMMENDED~~'), '@@')" />   
   <!-- 12.1 summary performance changes new end -->
   	<!-- bug id 14842317 change ends  -->
   <xsl:variable name="reset_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_RESET~~'), '@@')" /> 
   <xsl:variable name="recordsPerPage_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_RECORDS_PER_PAGE~~'), '@@')" /> 
   <xsl:variable name="gotoPage_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_GOTO_PAGE~~'), '@@')" /> 
   <xsl:variable name="page_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_PAGE~~'), '@@')" /> 
   <xsl:variable name="of_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_OF~~'), '@@')" /> 
   <xsl:variable name="query_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_QRY_QUERY~~'), '@@')" />
   <xsl:variable name="refresh_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_REFRESH~~'), '@@')" />
   <xsl:variable name="result_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_RESULT~~'), '@@')" />
   <xsl:variable name="makerId_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_MAKERID~~'), '@@')" />
   <xsl:variable name="checkerId_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_CHECKER_ID~~'), '@@')" />
   <xsl:variable name="recordStat_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_RECORD_STAT~~'), '@@')" />
   <xsl:variable name="authStat_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_AUTHORISATION_STATUS~~'), '@@')" />
   <xsl:variable name="makerDate_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_MAKER_DT_STAMP~~'), '@@')" />
   <xsl:variable name="checkerDate_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_CHECKER_DT_STAMP~~'), '@@')" />
   <xsl:variable name="lableA_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_A~~'), '@@')" />
   <xsl:variable name="lableU_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_SUMMARY_U~~'), '@@')" />
   <xsl:variable name="lableO_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_O~~'), '@@')" />
   <xsl:variable name="lableC_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_C~~'), '@@')" />
   <xsl:variable name="unauthorized_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_UN_AUTH_FLG~~'), '@@')" />
   <xsl:variable name="open_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_OPEN~~'), '@@')" />
   <xsl:variable name="closed_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_CLOSED~~'), '@@')" />
   <xsl:variable name="authStat_Audit" select="substring-before(substring-after($XslLabels, 'LBL_AUTHORIZED~~'), '@@')" />
   <xsl:variable name="authorized_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_AUTHORIZED~~'), '@@')" />
   <xsl:variable name="exit_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_EXIT~~'), '@@')" />

   <xsl:variable name="ok_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_OK~~'), '@@')" />
   <xsl:variable name="cancle_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_CANCEL~~'), '@@')" />
   <xsl:variable name="fields_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_FIELDS~~'), '@@')" />
   <xsl:variable name="operator_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_OPERATOR~~'), '@@')" />
   <xsl:variable name="value_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_VALUE~~'), '@@')" />
   <xsl:variable name="and_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_AND~~'), '@@')" />
   <xsl:variable name="accept_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_ACCEPT~~'), '@@')" />
   <xsl:variable name="clearQuery_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_CLEAR_QUERY~~'), '@@')" />
   <xsl:variable name="orderBy_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_ORDER_BY~~'), '@@')" />
   <xsl:variable name="ascending_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_ASCENDING~~'), '@@')" />
   <xsl:variable name="descending_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_DESCENDING~~'), '@@')" />
   <xsl:variable name="to_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_TO~~'), '@@')" />
   <xsl:variable name="or_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_OR~~'), '@@')" />
   <xsl:variable name="ok" select="substring-before(substring-after($XslLabels, 'LBL_OK~~'), '@@')" />
   <xsl:variable name="exit" select="substring-before(substring-after($XslLabels, 'LBL_EXIT~~'), '@@')" />
   <xsl:variable name="cancel" select="substring-before(substring-after($XslLabels, 'LBL_CANCEL~~'), '@@')" />
   <xsl:variable name="vernoOfLbl" select="substring-before(substring-after($XslLabels, 'LBL_OF~~'), '@@')" />
   <xsl:variable name="lock_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_SUM_LOCK~~'), '@@')" />
   <xsl:variable name="checkboxYes" select="substring-before(substring-after($XslLabels, 'LBL_CHECKBOX_YES~~'), '@@')" />
   <xsl:variable name="checkboxNo" select="substring-before(substring-after($XslLabels, 'LBL_CHECKBOX_NO~~'), '@@')" />
  
   <xsl:variable name="mandatory" select="substring-before(substring-after($XslLabels, 'LBL_INFRA_MANDATORY~~'), '@@')" />
   <xsl:variable name="noScript" select="substring-before(substring-after($XslLabels, 'LBL_NOSCRIPT_LABEL~~'), '@@')" />
   <xsl:variable name="summary" select="substring-before(substring-after($XslLabels, 'LBL_SUMMARY~~'), '@@')" />
   <xsl:variable name="expand_group" select="substring-before(substring-after($XslLabels, 'LBL_EXPAND_GROUP~~'), '@@')" />
   <xsl:variable name="lov" select="substring-before(substring-after($XslLabels, 'LBL_LIST_OF_VALUES~~'), '@@')" />
   <xsl:variable name="previous" select="substring-before(substring-after($XslLabels, 'LBL_INFRA_PREVIOUS~~'), '@@')" />
   <xsl:variable name="next" select="substring-before(substring-after($XslLabels, 'LBL_NEXT~~'), '@@')" />
   <xsl:variable name="first" select="substring-before(substring-after($XslLabels, 'LBL_FIRST~~'), '@@')" />
   <xsl:variable name="last" select="substring-before(substring-after($XslLabels, 'LBL_LAST~~'), '@@')" />
   <xsl:variable name="add_row" select="substring-before(substring-after($XslLabels, 'LBL_ADDROW~~'), '@@')" />
   <xsl:variable name="delete_row" select="substring-before(substring-after($XslLabels, 'LBL_DELETEROW~~'), '@@')" />
   <xsl:variable name="single_rec_view" select="substring-before(substring-after($XslLabels, 'LBL_SINGLE_REC_VIEW~~'), '@@')" />
   <xsl:variable name="lock" select="substring-before(substring-after($XslLabels, 'LBL_LOCK~~'), '@@')" />
   <xsl:variable name="columns" select="substring-before(substring-after($XslLabels, 'LBL_COLUMNS~~'), '@@')" />
   <xsl:variable name="narrative" select="substring-before(substring-after($XslLabels, 'LBL_NARRATIVE~~'), '@@')" />
   <xsl:variable name="calendar" select="substring-before(substring-after($XslLabels, 'LBL_CALENDAR~~'), '@@')" />
   <xsl:variable name="select_all_rows" select="substring-before(substring-after($XslLabels, 'LBL_SELECT_ALL_ROWS~~'), '@@')" />
   <xsl:variable name="select_row" select="substring-before(substring-after($XslLabels, 'LBL_SELECT_ROW~~'), '@@')" />
   <xsl:variable name="page_footer" select="substring-before(substring-after($XslLabels, 'LBL_PAGE_FOOTER~~'), '@@')" />
   <xsl:variable name="end_table" select="substring-before(substring-after($XslLabels, 'LBL_END_TABLE~~'), '@@')" />
   <!--12.0.3 Summary to detail changes starts-->
   <xsl:variable name="detail_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_DETAIL~~'), '@@')" />
   <!--12.0.3 Summary to detail changes ends-->
    <xsl:variable name="lockColumns" select="substring-before(substring-after($XslLabels, 'LBL_LOCK_COLUMNS~~'), '@@')" /> <!--12.1 lock column changes-->
<!-- End of ExtLabels.xsl -->
 <xsl:variable name="l_scr_type" select="/FORM/SUMMARY/@TMP_SCR_TYPE"/>
<xsl:variable name ="screenWidth">
	 <xsl:choose>
          <xsl:when test="$l_scr_type = 'L'">
		  <xsl:value-of select="number($largeScreenWidth) - 2"></xsl:value-of><!--HTML5 Changes -->
		  </xsl:when>
		   <xsl:otherwise>
		    <xsl:value-of select="number($mediumScreenWidth) "></xsl:value-of>
			</xsl:otherwise>
			</xsl:choose>
	</xsl:variable>
	<xsl:variable name ="labelWidth">
	 <xsl:choose>
          <xsl:when test="$l_scr_type = 'L'">
		  <xsl:value-of select="0.40 * (number($screenWidth) div 3 )"></xsl:value-of>
		  </xsl:when>
		   <xsl:otherwise>
		    <xsl:value-of select="0.40 * (number($screenWidth) div 2) "></xsl:value-of>
			</xsl:otherwise>
			</xsl:choose>
	</xsl:variable>
<!-- Start of ExtSummaryInput.xsl -->  
<xsl:template name="typeHandlerResultProcess">
        <xsl:param name="fType"/>
        <xsl:param name="fldNode"/> 
        <xsl:variable name="dbt" select="../../../SUMMARY_DATA_BLK"/>
        <xsl:variable name="dbc" select="$fldNode/NAME"/>
        <xsl:variable name="fldName" select="$fldNode/NAME"/>
            <!--<xsl:choose>
            --><!--Fix for 18260762 - removed check for AMOUNT field--><!--
                --><!--<xsl:when test="$fType='DATE' or ($fType ='TEXT' and ($fldNode/DTYPE='NUMERIC' or $fldNode/DTYPE = 'NUMBER'))">
                    <xsl:call-template name="dispLabelHidden"/>
                </xsl:when>--><!--
                 <xsl:when test="$fType = 'CHECKBOX'">
                         <xsl:call-template name="dispCheckboxField">
                            <xsl:with-param name="dbt" select="$dbt"/>
                            <xsl:with-param name="dbc" select="$dbc"/>
                            <xsl:with-param name="fldName" select="$fldName"/>
                            <xsl:with-param name="fldNode" select="$fldNode"/>
                        </xsl:call-template>
                    
                </xsl:when>
                 
            </xsl:choose>-->
            <xsl:if test="$fType = 'CHECKBOX'">
                <xsl:call-template name="dispCheckboxField">
                    <xsl:with-param name="dbt" select="$dbt"/>
                    <xsl:with-param name="dbc" select="$dbc"/>
                    <xsl:with-param name="fldName" select="$fldName"/>
                    <xsl:with-param name="fldNode" select="$fldNode"/>
                </xsl:call-template>
            </xsl:if>
            <xsl:if test="($fType ='TEXT' and $fldNode/DTYPE != 'NUMERIC' and $fldNode/DTYPE != 'NUMBER') or $fType='AMOUNT' or $fType='DATE' or $fType='ACCOUNT' or $fType='BRANCH' or $fType='CURRENCY' or $fType='CUSTOMER' or $fType='MASK' or $fType='RESTRICTED_TEXT' or $fType='DATETIME' "> <!--REDWOOD_35322134-->
                <xsl:call-template name="dispEntityField">
                    <xsl:with-param name="EntityType" select="$fType"/>
                    <xsl:with-param name="dbt" select="$dbt"/>
                    <xsl:with-param name="dbc" select="$dbc"/>
                    <xsl:with-param name="fldName" select="$fldName"/>
                    <xsl:with-param name="fldNode" select="$fldNode"/>
                </xsl:call-template>
            </xsl:if>
            <xsl:if test="$fType ='TEXT' and ($fldNode/DTYPE='NUMERIC' or $fldNode/DTYPE = 'NUMBER')">
                <xsl:call-template name="dispEntityField">
                    <xsl:with-param name="EntityType" select="'NUMBERTEXT'"/>
                    <xsl:with-param name="dbt" select="$dbt"/>
                    <xsl:with-param name="dbc" select="$dbc"/>
                    <xsl:with-param name="fldName" select="$fldName"/>
                    <xsl:with-param name="fldNode" select="$fldNode"/>
                </xsl:call-template>
            </xsl:if>
            <xsl:if test="$fType = 'SELECT'">
                <xsl:call-template name="dispSelectField">
                    <xsl:with-param name="dbt" select="$dbt"/>
                    <xsl:with-param name="dbc" select="$dbc"/>
                    <xsl:with-param name="fldName" select="$fldName"/>
                    <xsl:with-param name="fldNode" select="$fldNode"/>
                </xsl:call-template>
            </xsl:if>
            <xsl:if test="$fType = 'RADIO'">
                <xsl:call-template name="dispRadioToSelectField">
                    <xsl:with-param name="dbt" select="$dbt"/>
                    <xsl:with-param name="dbc" select="$dbc"/>
                    <xsl:with-param name="fldName" select="$fldName"/>
                    <xsl:with-param name="fldNode" select="$fldNode"/>
                </xsl:call-template>
            </xsl:if>           
            <xsl:if test="$fType = 'TEXTAREA'">
                <xsl:call-template name="dispTextareaField">
                    <xsl:with-param name="position">column</xsl:with-param>
                    <xsl:with-param name="dbt" select="$dbt"/>
                    <xsl:with-param name="dbc" select="$dbc"/>
                    <xsl:with-param name="fldName" select="$fldName"/>
                    <xsl:with-param name="fldNode" select="$fldNode"/>
                </xsl:call-template>
            </xsl:if>
            <xsl:if test="$fType = 'FILE'">
                <xsl:call-template name="dispFileField">
                    <xsl:with-param name="dbt" select="$dbt"/>
                    <xsl:with-param name="dbc" select="$dbc"/>
                    <xsl:with-param name="fldName" select="$fldName"/>
                    <xsl:with-param name="fldNode" select="$fldNode"/>
                </xsl:call-template>
            </xsl:if>
            <xsl:if test="$fType = 'BUTTON'">
                <xsl:call-template name="dispButtonField">
                    <xsl:with-param name="dbt" select="$dbt"/>
                    <xsl:with-param name="dbc" select="$dbc"/>
                    <xsl:with-param name="fldName" select="$fldName"/>
                    <xsl:with-param name="fldNode" select="$fldNode"/>
                </xsl:call-template>
            </xsl:if>
            <xsl:if test="$fType = 'HIDDEN'">                
                <xsl:call-template name="dispHiddenField">
                    <xsl:with-param name="dbt" select="$dbt"/>
                    <xsl:with-param name="dbc" select="$dbc"/>
                    <xsl:with-param name="fldName" select="$fldName"/>
                    <xsl:with-param name="fldNode" select="$fldNode"/>
                </xsl:call-template>
            </xsl:if>
            
</xsl:template>
    <xsl:template name="typeHandler">
        <xsl:param name="fType"/>
        <xsl:param name="fldNode"/>
        <xsl:variable name="dbt" select="$fldNode/../../SUMMARY_DATA_BLK"/>
        <xsl:variable name="dbc" select="$fldNode/NAME"/>
        <xsl:variable name="fldName" select="$fldNode/NAME"/>
        <div>
        <oj-label-value label-edge="start" label-width="{$labelWidth}px">
            <xsl:choose>
            <!--Fix for 18260762 - removed check for AMOUNT field-->
                <!--<xsl:when test="$fType='DATE' or ($fType ='TEXT' and ($fldNode/DTYPE='NUMERIC' or $fldNode/DTYPE = 'NUMBER'))">
                    <xsl:call-template name="dispLabelHidden"/>
                </xsl:when>-->
                <xsl:when test="$fType = 'BUTTON'">
                    <div class="DIVText"></div>
                </xsl:when>
                <xsl:when test="$fType = 'HIDDEN'">
                    <xsl:attribute name="class">
                        <xsl:text>DispNone</xsl:text>
                    </xsl:attribute>
                    <xsl:call-template name="dispLabelHidden"/>
                </xsl:when>
                <xsl:when test="$fType = 'CHECKBOX'">
                    <xsl:attribute name="class">
                        <xsl:text>DIVCheck</xsl:text>
                    </xsl:attribute>
                    <b class="LBLstd" style="width:{$labelWidth}px;"/><!-- 12.1 screen height change -->
                    <div class="DIVchkrad">                        
                        <xsl:call-template name="dispCheckboxField">
                            <xsl:with-param name="dbt" select="$dbt"/>
                            <xsl:with-param name="dbc" select="$dbc"/>
                            <xsl:with-param name="fldName" select="$fldName"/>
                            <xsl:with-param name="fldNode" select="$fldNode"/>
                        </xsl:call-template>
                    </div>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:if test="$fType = 'SELECT' or $fType = 'RADIO'">
                        <xsl:attribute name="class">
                            <xsl:text>DIVList</xsl:text>
                        </xsl:attribute>
                    </xsl:if>
                    <xsl:call-template name="dispLabelField">
                        <xsl:with-param name="dbt" select="$dbt"/>
                        <xsl:with-param name="dbc" select="$dbc"/>
                        <xsl:with-param name="fldName" select="$fldName"/>
                        <xsl:with-param name="fldNode" select="$fldNode"/>
                    </xsl:call-template>
                </xsl:otherwise>
            </xsl:choose>
            <xsl:if test="($fType ='TEXT' and $fldNode/DTYPE != 'NUMERIC' and $fldNode/DTYPE != 'NUMBER') or $fType='AMOUNT' or $fType='DATE' or $fType='ACCOUNT' or $fType='BRANCH' or $fType='CURRENCY' or $fType='CUSTOMER' or $fType='MASK' or $fType='RESTRICTED_TEXT'">
                <xsl:call-template name="dispEntityField">
                    <xsl:with-param name="EntityType" select="$fType"/>
                    <xsl:with-param name="dbt" select="$dbt"/>
                    <xsl:with-param name="dbc" select="$dbc"/>
                    <xsl:with-param name="fldName" select="$fldName"/>
                    <xsl:with-param name="fldNode" select="$fldNode"/>
                </xsl:call-template>
            </xsl:if>
            <xsl:if test="$fType ='TEXT' and ($fldNode/DTYPE='NUMERIC' or $fldNode/DTYPE = 'NUMBER')">
                <xsl:call-template name="dispEntityField">
                    <xsl:with-param name="EntityType" select="'NUMBERTEXT'"/>
                    <xsl:with-param name="dbt" select="$dbt"/>
                    <xsl:with-param name="dbc" select="$dbc"/>
                    <xsl:with-param name="fldName" select="$fldName"/>
                    <xsl:with-param name="fldNode" select="$fldNode"/>
                </xsl:call-template>
            </xsl:if>
            <xsl:if test="$fType = 'SELECT'">
                <xsl:call-template name="dispSelectField">
                    <xsl:with-param name="dbt" select="$dbt"/>
                    <xsl:with-param name="dbc" select="$dbc"/>
                    <xsl:with-param name="fldName" select="$fldName"/>
                    <xsl:with-param name="fldNode" select="$fldNode"/>
                </xsl:call-template>
            </xsl:if>
            <xsl:if test="$fType = 'RADIO'">
                <xsl:call-template name="dispRadioToSelectField">
                    <xsl:with-param name="dbt" select="$dbt"/>
                    <xsl:with-param name="dbc" select="$dbc"/>
                    <xsl:with-param name="fldName" select="$fldName"/>
                    <xsl:with-param name="fldNode" select="$fldNode"/>
                </xsl:call-template>
            </xsl:if>           
            <xsl:if test="$fType = 'TEXTAREA'">
                <xsl:call-template name="dispTextareaField">
                    <xsl:with-param name="position">column</xsl:with-param>
                    <xsl:with-param name="dbt" select="$dbt"/>
                    <xsl:with-param name="dbc" select="$dbc"/>
                    <xsl:with-param name="fldName" select="$fldName"/>
                    <xsl:with-param name="fldNode" select="$fldNode"/>
                </xsl:call-template>
            </xsl:if>
            <xsl:if test="$fType = 'FILE'">
                <xsl:call-template name="dispFileField">
                    <xsl:with-param name="dbt" select="$dbt"/>
                    <xsl:with-param name="dbc" select="$dbc"/>
                    <xsl:with-param name="fldName" select="$fldName"/>
                    <xsl:with-param name="fldNode" select="$fldNode"/>
                </xsl:call-template>
            </xsl:if>
            <xsl:if test="$fType = 'BUTTON'">
                <xsl:call-template name="dispButtonField">
                    <xsl:with-param name="dbt" select="$dbt"/>
                    <xsl:with-param name="dbc" select="$dbc"/>
                    <xsl:with-param name="fldName" select="$fldName"/>
                    <xsl:with-param name="fldNode" select="$fldNode"/>
                </xsl:call-template>
            </xsl:if>
            <xsl:if test="$fType = 'HIDDEN'">                
                <xsl:call-template name="dispHiddenField">
                    <xsl:with-param name="dbt" select="$dbt"/>
                    <xsl:with-param name="dbc" select="$dbc"/>
                    <xsl:with-param name="fldName" select="$fldName"/>
                    <xsl:with-param name="fldNode" select="$fldNode"/>
                </xsl:call-template>
            </xsl:if>
            </oj-label-value>
        </div>
    </xsl:template>
    <!-- Generic Entity Handler -->
    <xsl:template name="dispEntityField">
        <xsl:param name="EntityType"/>
        <xsl:param name="dbt"/>
        <xsl:param name="dbc"/>
        <xsl:param name="fldName"/>
        <xsl:param name="fldNode"/>
        <!-- Call the appropriate template based on the entity -->
        <xsl:choose>
            <xsl:when test="$EntityType = 'AMOUNT'">
                <xsl:call-template name="dispAmountField">
                    <xsl:with-param name="EntityType" select="$EntityType"/>
                    <xsl:with-param name="dbt" select="$dbt"/>
                    <xsl:with-param name="dbc" select="$dbc"/>
                    <xsl:with-param name="fldName" select="$fldName"/>
                    <xsl:with-param name="fldNode" select="$fldNode"/>
                </xsl:call-template>
            </xsl:when>
            <xsl:when test="$EntityType = 'ACCOUNT'">
                <xsl:call-template name="dispTextField">
                    <xsl:with-param name="EntityType" select="$EntityType"/>
                    <xsl:with-param name="dbt" select="$dbt"/>
                    <xsl:with-param name="dbc" select="$dbc"/>
                    <xsl:with-param name="fldName" select="$fldName"/>
                    <xsl:with-param name="fldNode" select="$fldNode"/>
                </xsl:call-template>
            </xsl:when>
            <xsl:when test="$EntityType = 'BRANCH'">
                <xsl:call-template name="dispTextField">
                    <xsl:with-param name="EntityType" select="$EntityType"/>
                    <xsl:with-param name="dbt" select="$dbt"/>
                    <xsl:with-param name="dbc" select="$dbc"/>
                    <xsl:with-param name="fldName" select="$fldName"/>
                    <xsl:with-param name="fldNode" select="$fldNode"/>
                </xsl:call-template>
            </xsl:when>
            <xsl:when test="$EntityType = 'CURRENCY'">
                <xsl:call-template name="dispTextField">
                    <xsl:with-param name="EntityType" select="$EntityType"/>
                    <xsl:with-param name="dbt" select="$dbt"/>
                    <xsl:with-param name="dbc" select="$dbc"/>
                    <xsl:with-param name="fldName" select="$fldName"/>
                    <xsl:with-param name="fldNode" select="$fldNode"/>
                </xsl:call-template>
            </xsl:when>
            <xsl:when test="$EntityType = 'CUSTOMER'">
                <xsl:call-template name="dispTextField">
                    <xsl:with-param name="EntityType" select="$EntityType"/>
                    <xsl:with-param name="dbt" select="$dbt"/>
                    <xsl:with-param name="dbc" select="$dbc"/>
                    <xsl:with-param name="fldName" select="$fldName"/>
                    <xsl:with-param name="fldNode" select="$fldNode"/>
                </xsl:call-template>
            </xsl:when>
            <xsl:when test="$EntityType = 'DATE'">
                <xsl:call-template name="dispDateField">
                    <xsl:with-param name="dbt" select="$dbt"/>
                    <xsl:with-param name="dbc" select="$dbc"/>
                    <xsl:with-param name="fldName" select="$fldName"/>
                    <xsl:with-param name="fldNode" select="$fldNode"/>
                </xsl:call-template>
            </xsl:when>
            <xsl:when test="$EntityType = 'MASK'">
                <xsl:call-template name="dispMaskField">
                    <xsl:with-param name="dbt" select="$dbt"/>
                    <xsl:with-param name="dbc" select="$dbc"/>
                    <xsl:with-param name="fldName" select="$fldName"/>
                    <xsl:with-param name="fldNode" select="$fldNode"/>
                </xsl:call-template>
            </xsl:when>
            <xsl:when test="$EntityType = 'RESTRICTED_TEXT'">
                <xsl:call-template name="dispRestrictedTextField">
                    <xsl:with-param name="dbt" select="$dbt"/>
                    <xsl:with-param name="dbc" select="$dbc"/>
                    <xsl:with-param name="fldName" select="$fldName"/>
                    <xsl:with-param name="fldNode" select="$fldNode"/>
                </xsl:call-template>
            </xsl:when>
			 <xsl:when test="$EntityType = 'DATETIME'"> <!--REDWOOD_35322134-->
                <xsl:call-template name="dispTextField">
                    <xsl:with-param name="EntityType" select="$EntityType"/>
                    <xsl:with-param name="dbt" select="$dbt"/>
                    <xsl:with-param name="dbc" select="$dbc"/>
                    <xsl:with-param name="fldName" select="$fldName"/>
                    <xsl:with-param name="fldNode" select="$fldNode"/>
                </xsl:call-template>
            </xsl:when>
            <xsl:when test="$EntityType = 'NUMBERTEXT'">
                <xsl:call-template name="dispNumberField">
                    <xsl:with-param name="dbt" select="$dbt"/>
                    <xsl:with-param name="dbc" select="$dbc"/>
                    <xsl:with-param name="fldName" select="$fldName"/>
                    <xsl:with-param name="fldNode" select="$fldNode"/>
                </xsl:call-template>
            </xsl:when>
            <xsl:otherwise>
                <xsl:call-template name="dispTextField">
                    <xsl:with-param name="dbt" select="$dbt"/>
                    <xsl:with-param name="dbc" select="$dbc"/>
                    <xsl:with-param name="fldName" select="$fldName"/>
                    <xsl:with-param name="fldNode" select="$fldNode"/>
                </xsl:call-template>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    <!-- Takes care of features common in Amount Field of Absolute/Column Positioning -->
    <xsl:template name="dispAmountField">
        <xsl:param name="dbt"/>
        <xsl:param name="dbc"/>
        <xsl:param name="fldName"/>
        <xsl:param name="fldNode"/>
        <xsl:param name="EntityType"/>
        <!--Fix for 18260762 Starts -->
        <!--<xsl:variable name="relFld" select="$fldNode/RELATED_FIELD"/>
        <xsl:variable name="relatedFld1">
            <xsl:if test="contains($relFld,'__')">
                <xsl:value-of select="substring-after($relFld,'__')"/>
            </xsl:if>
            <xsl:if test="not(contains($relFld,'__'))">
                <xsl:value-of select="$relFld"/>
            </xsl:if>
        </xsl:variable>
        <xsl:variable name="relatedFld">
            <xsl:if test="contains($relatedFld1,'__')">
                <xsl:value-of select="substring-after($relatedFld1,'__')"/>
            </xsl:if>
            <xsl:if test="not(contains($relatedFld1,'__'))">
                <xsl:value-of select="$relatedFld1"/>
            </xsl:if>
        </xsl:variable>
        <INPUT TYPE="HIDDEN" onpropertychange="displayAmount(this, '{$relatedFld}')">
            <xsl:call-template name="ATTR_HiddenEntity_Handler">
                <xsl:with-param name="curr_fld" select="$fldNode"/>
            </xsl:call-template>
        </INPUT> -->
        <!--<INPUT TYPE="TEXT" CLASS="TXTstd numeric" title="{$fldNode/LBL}" onactivate="acceptInputAmount('{$fldNode/NAME}', '{$relatedFld}', event)" onbeforedeactivate="validateInputAmount('{$fldNode/NAME}', '{$relatedFld}', event)">-->
        <!--<label class="LBLstd" for=""> -->
        <!--Fix for 17235409 start-->
          <!--<xsl:attribute name="for">
            <xsl:value-of select="concat($fldNode/../../SUMMARY_DATA_BLK,'__',$fldNode/NAME)" />
            <xsl:text>I</xsl:text>
          </xsl:attribute> -->
          <!--Fix for 17235409 end-->
        <!--<xsl:value-of select="$fldNode/LBL"></xsl:value-of></label> -->
        
        <oj-input-text  slot="value" TYPE="TEXT"  title="{$fldNode/LBL}">
            <!--<xsl:call-template name="ATTR_InputEntity_Handler">
                <xsl:with-param name="curr_fld" select="$fldNode"/>
            </xsl:call-template>
            <xsl:attribute name="MIN_VAL">
                <xsl:value-of select="$fldNode/MIN_VAL"/>
            </xsl:attribute>
            <xsl:attribute name="MAX_VAL">
                <xsl:value-of select="$fldNode/MAX_VAL"/>
            </xsl:attribute>-->
            <!--<xsl:if test="../MIN_VAL != '' and ../MAX_VAL != ''">
                <xsl:attribute name="onblur">
                    <xsl:text disable-output-escaping="yes">fnValidateRange(this)</xsl:text>
                </xsl:attribute>
            </xsl:if>-->
            <!--<xsl:attribute name = "onblur">
                <xsl:text disable-output-escaping="yes">validateInputAmount('</xsl:text>
                <xsl:value-of select="$fldNode/NAME"/>
                <xsl:text disable-output-escaping="yes">', '</xsl:text>
                <xsl:value-of select="$relatedFld"/>
                <xsl:text disable-output-escaping="yes">', event);fnValidateRange(this);</xsl:text>
            </xsl:attribute>-->
            <xsl:attribute name="ID">
              <xsl:value-of select="concat($fldNode/../../SUMMARY_DATA_BLK,'__',$fldNode/NAME)"/>
            </xsl:attribute>
            <xsl:attribute name="CUSTOMLOV">
              <xsl:if test="count($fldNode/LOV) > 0">
                  <xsl:text>Y</xsl:text>
              </xsl:if>
              <xsl:if test="count($fldNode/LOV) = 0">
                   <xsl:text>N</xsl:text>
              </xsl:if>
            </xsl:attribute>
            <xsl:if test="count($fldNode/LOV) > 0">
              <xsl:attribute name="CUSTOMLOVID">
                <xsl:value-of select="normalize-space($fldNode/LOV/NAME)"/>
              </xsl:attribute>
            </xsl:if>
            <xsl:attribute name="NAME">
                <xsl:value-of select="$fldNode/NAME"/>
            </xsl:attribute>
            <xsl:attribute name = "onblur">
                <xsl:text disable-output-escaping="yes">validateSummaryNumberfield('</xsl:text>
                <xsl:value-of select="concat($fldNode/../../SUMMARY_DATA_BLK,'__',$fldNode/NAME)"/>
                <xsl:text disable-output-escaping="yes">', event)</xsl:text>
            </xsl:attribute> 
			<!--redwood_35299973 start-->
			<xsl:if test="$fldNode/../@TABPAGE='RESULT'">
              <xsl:attribute name="value">
                 <xsl:text>{{row.data.</xsl:text>
                    <xsl:value-of select="$fldName"/>
                <xsl:text>}}</xsl:text> 
                </xsl:attribute>
                <xsl:attribute name="readonly_temp">
                    <xsl:text>{{row.data.readOnly}}</xsl:text>
                </xsl:attribute>
                 <xsl:attribute name="class">
                    <xsl:text>hideBorder oj-helper-text-align-end</xsl:text>
                 </xsl:attribute>
            </xsl:if>
			<!--redwood_35299973 end-->
            <xsl:if test="count($fldNode/LOV) > 0 ">    
               <xsl:attribute name = "onchange">
                  <xsl:call-template name="dispAutoLov">
                      <xsl:with-param name="curr_node" select="$fldNode"/>
                  </xsl:call-template>
                </xsl:attribute>
            </xsl:if>
        <!--Fix for 18556691 start-->
        <xsl:attribute name="DBT">
        <xsl:value-of select="$fldNode/../../SUMMARY_DATA_BLK"/>
        </xsl:attribute>
        <xsl:attribute name="DBC">
        <xsl:value-of select="$fldNode/NAME"/>
        </xsl:attribute>
        <!--Fix for 18556691 ends-->
            <!--Fix for 18260762 ends -->
            <xsl:if test="number($fldNode/SIZE) > 25">
                <xsl:attribute name="SIZE">
                    <xsl:value-of select="16"/>
                </xsl:attribute>
            </xsl:if>
			<!-- 12.1 summary performance changes new start -->
            <xsl:if test="count($fldNode/MIN_CHAR) = 0 or $fldNode/MIN_CHAR != ''">
                <xsl:attribute name="MIN_CHAR">
                    <xsl:value-of select="$fldNode/MIN_CHAR"/>
                </xsl:attribute>
            </xsl:if>
			<!-- 12.1 summary performance changes new end -->
                         <xsl:call-template name="LovHandler">
                    <xsl:with-param name="curr_fld" select="$fldNode"/>
            <xsl:with-param name="EntityType" select="$EntityType"/>
                </xsl:call-template>
        <xsl:if test="count($fldNode/LOV) = 0 ">
            <xsl:if test="count($fldNode/POPUPEDIT) > 0 and (count($fldNode/READ_ONLY) = 0 or $fldNode/READ_ONLY = 0)">
                <oj-button  slot="end"  display="icons" chroming="borderless" oldClassName="BTNimg" tabindex="0" type="button">
                    <xsl:call-template name="Popup_Handler"><xsl:with-param name="fldNode" select="$fldNode"/></xsl:call-template>
                    <span slot="startIcon" tabindex="-1" class="oj-ux-ico-oracle-chat-outline"></span>   
               </oj-button>
         </xsl:if>  
        </xsl:if>
        </oj-input-text>
        
  
        <!--<xsl:if test="(count($fldNode/READ_ONLY) = 0 or $fldNode/READ_ONLY != -1) and (count($fldNode/LOV) &gt; 0 and $fldNode/LOV = 'Y')">-->
       
    </xsl:template>

    <xsl:template name="dispDateField">
        <xsl:param name="dbt"/>
        <xsl:param name="dbc"/>
        <xsl:param name="fldName"/>
        <xsl:param name="fldNode"/>
        <xsl:variable name="refFld" select="$fldNode/REF_FIELD"/>
        <xsl:variable name="referFld">
            <xsl:if test="contains($refFld,'__')">
                <xsl:value-of select="substring-after($refFld,'__')"/>
            </xsl:if>
            <xsl:if test="not(contains($refFld,'__'))">
                <xsl:value-of select="$refFld"/>
            </xsl:if>
        </xsl:variable>
        <!--<INPUT TYPE="HIDDEN" data_type="DATE" onpropertychange="displayDate(this)">
            <xsl:call-template name="ATTR_HiddenEntity_Handler">
                <xsl:with-param name="curr_fld" select="$fldNode"/>
            </xsl:call-template>
        </INPUT>-->
        <!--<INPUT TYPE="TEXT" CLASS="TXTstd" onactivate="acceptInputDate('{$fldNode/NAME}', event)" onbeforedeactivate="validateInputDate('{$fldNode/NAME}', event)">-->
       <!--  <oj-label-value label-edge="start" label-width="{$labelWidth}px">
        <oj-label slot="label" class="LBLstd" for="" >
      
          <xsl:attribute name="for">
            <xsl:value-of select="concat($fldNode/../../SUMMARY_DATA_BLK,'__',$fldNode/NAME)" />
            <xsl:text>I</xsl:text>
          </xsl:attribute>
          
        <xsl:value-of select="$fldNode/LBL"></xsl:value-of></oj-label>
        -->
         <oj-input-date slot="value" title="{../LBL}" placeholder="{$dateFormat}"  day-formatter="[[dayFormatter]]" converter="[[dateConverter]]"><!--HTML5 Changes -->
            <xsl:call-template name="ATTR_InputEntity_Handler">
                <xsl:with-param name="curr_fld" select="$fldNode"/>
            </xsl:call-template>
            <xsl:attribute name="SIZE">
                <xsl:value-of select="11"/>
            </xsl:attribute>
            <xsl:attribute name="TITLE">
              <xsl:value-of select="$calendar"/>
            </xsl:attribute>
            <xsl:if test="$fldNode/../@TABPAGE='RESULT'">
              <xsl:attribute name="value">
                 <xsl:text>{{row.data.</xsl:text>
                    <xsl:value-of select="$fldName"/>
                <xsl:text>}}</xsl:text> 
                </xsl:attribute>
                <xsl:attribute name="readonly_temp">
                    <xsl:text>{{row.data.readOnly}}</xsl:text>
                </xsl:attribute>
                 <xsl:attribute name="class">
                    <xsl:text>hideBorder</xsl:text>
                 </xsl:attribute>
            </xsl:if>
            <xsl:if test="$refFld !=''">
                <xsl:attribute name="REF_FIELD">
                    <xsl:if test="contains($referFld,'__')">
                        <xsl:value-of select="substring-after($referFld,'__')"/>
                    </xsl:if>
                    <xsl:if test="not(contains($referFld,'__'))">
                        <xsl:value-of select="$referFld"/>
                    </xsl:if>
                </xsl:attribute>
            </xsl:if>
       </oj-input-date>
        <!--<xsl:if test="count($fldNode/READ_ONLY) = 0 or $fldNode/READ_ONLY != -1">
            <BUTTON CLASS="BTNimg " title="{$calendar}" tabindex="0" type="button" onMouseOver="this.className='BTNimgH'" onMouseOut="this.className='BTNimg'" onFocus="this.className='BTNimgH'" onBlur="this.className='BTNimg'" onclick="disp_cal('{$fldNode/NAME}', event)" >                    
                <span tabindex="-1" class="ICOcalendar">                
                <span class ="LBLinv"><xsl:value-of select = "$calendar"/></span>
                </span>
            </BUTTON>               
        </xsl:if>-->
       
    </xsl:template>

    <xsl:template name="dispNumberField">
        <xsl:param name="dbt"/>
        <xsl:param name="dbc"/>
        <xsl:param name="fldName"/>
        <xsl:param name="fldNode"/>
         <xsl:param name="EntityType"/>
        <!--<INPUT TYPE="HIDDEN" onpropertychange="displayFormattedNumber(this)">
            <xsl:call-template name="ATTR_HiddenEntity_Handler">
                <xsl:with-param name="curr_fld" select="$fldNode"/>
            </xsl:call-template>
        </INPUT>-->
        <!--<INPUT TYPE="TEXT" CLASS="TXTstd numeric" title="{$fldNode/LBL}" onactivate="acceptInputAmount('{$fldNode/NAME}', '{$relatedFld}', event)" onbeforedeactivate="validateInputAmount('{$fldNode/NAME}', '{$relatedFld}', event)">-->
        <!--<label class="LBLstd" for="" style="width:{$labelWidth}px;">
        --><!--Fix for 17235409 start--><!--
          <xsl:attribute name="for">
            <xsl:value-of select="concat($fldNode/../../SUMMARY_DATA_BLK,'__',$fldNode/NAME)" />
            <xsl:text>I</xsl:text>
          </xsl:attribute>
          --><!--Fix for 17235409 end--><!--
        <xsl:value-of select="$fldNode/LBL"></xsl:value-of></label>
        -->
        
        <oj-input-text slot="value" type="text" >
            <!--<xsl:call-template name="ATTR_InputEntity_Handler">
                <xsl:with-param name="curr_fld" select="$fldNode" />
            </xsl:call-template>-->
                <xsl:call-template name="ATTR_Handler">
                <xsl:with-param name="curr_fld" select="$fldNode" />
                <xsl:with-param name="curr_fld_dbt" select="$dbt"/>
                <xsl:with-param name="curr_fld_dbc" select="$dbc"/>
                <xsl:with-param name="curr_fld_name" select="$fldName"/>
            </xsl:call-template>
            
            <xsl:if test="normalize-space($fldNode/MIN_VAL) != ''">
                <xsl:attribute name="MIN_VAL">
                    <xsl:value-of select="$fldNode/MIN_VAL"/>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="normalize-space($fldNode/MAX_VAL) != ''">        
                <xsl:attribute name="MAX_VAL">
                    <xsl:value-of select="$fldNode/MAX_VAL"/>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="normalize-space($fldNode/MAX_DECIMALS) != ''">                
                <xsl:attribute name="MAX_DECIMALS">
                    <xsl:value-of select="$fldNode/MAX_DECIMALS"/>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="number($fldNode/SIZE) > 25">
                <xsl:attribute name="SIZE">
                    <xsl:value-of select="16"/>
                </xsl:attribute>
            </xsl:if>
            <xsl:attribute name="CUSTOMLOV">
              <xsl:if test="count($fldNode/LOV) > 0">
                  <xsl:text>Y</xsl:text>
              </xsl:if>
              <xsl:if test="count($fldNode/LOV) = 0">
                   <xsl:text>N</xsl:text>
              </xsl:if>
            </xsl:attribute>
            <xsl:if test="count($fldNode/LOV) > 0">
              <xsl:attribute name="CUSTOMLOVID">
                <xsl:value-of select="normalize-space(../LOV/NAME)"/>
              </xsl:attribute>
            </xsl:if>
            <xsl:if test="count($fldNode/LOV) > 0 ">
                <xsl:attribute name="onchange">
                    <xsl:call-template name="dispAutoLov">
                        <xsl:with-param name="curr_node" select="$fldNode"/>
                    </xsl:call-template>
                </xsl:attribute>
            </xsl:if>
             <xsl:if test="$fldNode/../@TABPAGE='RESULT'">
              <xsl:attribute name="value">
                 <xsl:text>{{row.data.</xsl:text>
                    <xsl:value-of select="$fldName"/>
                <xsl:text>}}</xsl:text> 
                </xsl:attribute>
                <xsl:attribute name="readonly_temp">
                    <xsl:text>{{row.data.readOnly}}</xsl:text>
                </xsl:attribute>
                 <xsl:attribute name="class">
                    <xsl:text>hideBorder oj-helper-text-align-end</xsl:text>
                 </xsl:attribute>
            </xsl:if>
            
        
        <xsl:if test="$fldNode/../@TABPAGE!='RESULT'">
           <xsl:attribute name="class">oj-form-control-text-align-right</xsl:attribute>
            <xsl:call-template name="LovHandler">
                <xsl:with-param name="curr_fld" select="$fldNode"/>
                <xsl:with-param name="EntityType" select="$EntityType"/>
            </xsl:call-template>
          <xsl:if test="count($fldNode/LOV) =0">
                <xsl:if test="count($fldNode/POPUPEDIT) > 0 and (count($fldNode/READ_ONLY) = 0 or $fldNode/READ_ONLY = 0)">
                    <oj-button  slot="end"  display="icons" chroming="borderless" oldClassName="BTNimg" tabindex="0" type="button">
                        <xsl:call-template name="Popup_Handler"><xsl:with-param name="fldNode" select="$fldNode"/></xsl:call-template>
                        <span slot="startIcon" tabindex="-1" class="oj-ux-ico-oracle-chat-outline"></span>   
           </oj-button>
          </xsl:if>
            </xsl:if>
            <!-- Added By Murali, assigning the text field size to 25 & adding popup button -->
            <xsl:if test="count($fldNode/POPUPEDIT) = 0">
                <xsl:if test="number($fldNode/SIZE) > 25">
                    <oj-button  slot="end"  display="icons" chroming="borderless" oldClassName="BTNimg" tabindex="0" type="button">
                        <xsl:call-template name="Popup_Handler"><xsl:with-param name="fldNode" select="$fldNode"/></xsl:call-template>
                       <span slot="startIcon" tabindex="-1" class="oj-ux-ico-oracle-chat-outline"></span>   
           </oj-button>
           
          </xsl:if>
          </xsl:if>
        </xsl:if>
        </oj-input-text>
        
      
        
    </xsl:template>

    <xsl:template name="dispMaskField">
        <xsl:param name="EntityType"/>
        <xsl:param name="dbt"/>
        <xsl:param name="dbc"/>
        <xsl:param name="fldName"/>
        <xsl:param name="fldNode"/>
        <label class="LBLinv" for=""></label>
        <OJ-INPUT-TEXT style="display:none;" onpropertychange="displayValue(this)">
            <xsl:call-template name="ATTR_HiddenEntity_Handler">
                <xsl:with-param name="curr_fld" select="$fldNode"/>
            </xsl:call-template>
        </OJ-INPUT-TEXT>
        <!--<INPUT TYPE="TEXT" CLASS="TXTstd" mask="{$fldNode/MASK}" onactivate="acceptInputValue('{$fldNode/NAME}')" onbeforedeactivate="validateInputValue('{$fldNode/NAME}');">-->
        <label class="LBLstd" for="" style="width:{$labelWidth}px;"></label><INPUT TYPE="TEXT" CLASS="TXTstd" mask="{$fldNode/MASK}" onblur="validateInputValue('{$fldNode/NAME}');">
            <xsl:call-template name="ATTR_InputEntity_Handler">
                <xsl:with-param name="curr_fld" select="$fldNode"/>
            </xsl:call-template>
        </INPUT>
    </xsl:template>

    <xsl:template name="dispRestrictedTextField">
        <xsl:param name="EntityType"/>
        <xsl:param name="dbt"/>
        <xsl:param name="dbc"/>
        <xsl:param name="fldName"/>
        <xsl:param name="fldNode"/>
        <!-- Changes for AUTO_LOV start-->
       <oj-input-text slot="value" type="TEXT">
            <xsl:attribute name="CUSTOMLOV">
              <xsl:if test="count(../LOV) > 0">
                  <xsl:text>Y</xsl:text>
              </xsl:if>
              <xsl:if test="count(../LOV) = 0">
                   <xsl:text>N</xsl:text>
              </xsl:if>
            </xsl:attribute> 
            <xsl:if test="count(../LOV) > 0">
              <xsl:attribute name="CUSTOMLOVID">
                <xsl:value-of select="normalize-space(../LOV/NAME)"/>
              </xsl:attribute>
            </xsl:if>
            <xsl:if test="../TYPE = 'RESTRICTED_TEXT' and ((count(../UPPERCASE) &gt; 0 and ../UPPERCASE = -1) or (count(../CASE) &gt; 0 and ../CASE = 'UPPER'))">        
                <xsl:if test="count(../LOV) &gt; 0 and count(../INPUT_LOV) = 0">
                    <xsl:attribute name="onblur">
                        <xsl:text>validateRestrictedTextValue(this);fnToUppercase(this, event);</xsl:text>                        
                    </xsl:attribute>
                    <xsl:attribute name="onchange">
                      <xsl:call-template name="dispAutoLov">
                        <xsl:with-param name="curr_node" select=".."/>
                      </xsl:call-template>
                    </xsl:attribute>
                </xsl:if>
                <xsl:if test="count(../LOV) = 0 and count(../INPUT_LOV) = 0">
                    <xsl:attribute name="onblur">validateRestrictedTextValue(this);fnToUppercase(this, event)</xsl:attribute>
                </xsl:if>
            </xsl:if>
            <xsl:if test="../TYPE != 'RESTRICTED_TEXT' and ((count(../UPPERCASE) &gt; 0 and ../UPPERCASE = -1) or (count(../CASE) &gt; 0 and ../CASE = 'UPPER'))">
                <xsl:if test="count(../LOV) &gt; 0 and count(../INPUT_LOV) = 0">
                    <xsl:attribute name="onblur">
                        <xsl:text>fnToUppercase(this, event);</xsl:text>                        
                    </xsl:attribute>
                    <xsl:attribute name="onchange">
                      <xsl:call-template name="dispAutoLov">
                        <xsl:with-param name="curr_node" select=".."/>
                      </xsl:call-template>
                    </xsl:attribute>
                </xsl:if>
                <xsl:if test="count(../LOV) = 0 and count(../INPUT_LOV) = 0">
                    <xsl:attribute name="onblur">fnToUppercase(this, event)</xsl:attribute>
                </xsl:if>
            </xsl:if>
            <xsl:if test="../TYPE = 'RESTRICTED_TEXT' and ((count(../UPPERCASE) &lt;= 0 or ../UPPERCASE = 0) and (count(../CASE) &lt;= 0 or ../CASE != 'UPPER'))">
                <xsl:if test="count(../LOV) &gt; 0 and count(../INPUT_LOV) = 0">
                    <xsl:attribute name="onblur">
                        <xsl:text>validateRestrictedTextValue(this);</xsl:text>                        
                    </xsl:attribute>
                    <xsl:attribute name="onchange">
                      <xsl:call-template name="dispAutoLov">
                        <xsl:with-param name="curr_node" select=".."/>
                      </xsl:call-template>
                    </xsl:attribute>
                </xsl:if>
                <xsl:if test="count(../LOV) = 0 and count(../INPUT_LOV) = 0">
                    <xsl:attribute name="onblur">validateRestrictedTextValue(this)</xsl:attribute>
                </xsl:if>
            </xsl:if>
            <xsl:if test="../TYPE != 'RESTRICTED_TEXT' and ((count(../UPPERCASE) &lt;= 0 or ../UPPERCASE = 0) and (count(../CASE) &lt;= 0 or ../CASE != 'UPPER'))">
                <xsl:if test="count(../LOV) &gt; 0 and count(../INPUT_LOV) = 0">                    
                    <xsl:attribute name="onchange">
                      <xsl:call-template name="dispAutoLov">
                        <xsl:with-param name="curr_node" select=".."/>
                      </xsl:call-template>
                    </xsl:attribute>
                </xsl:if>
            </xsl:if>
            <!-- Changes for AUTO_LOV end-->
    
            <xsl:call-template name="ATTR_Handler">
                <xsl:with-param name="curr_fld" select="$fldNode"/>
                <xsl:with-param name="curr_fld_dbt" select="$dbt"/>
                <xsl:with-param name="curr_fld_dbc" select="$dbc"/>
                <xsl:with-param name="curr_fld_name" select="$fldName"/>
            </xsl:call-template>
            <xsl:if test="$fldNode/TYPE='RESTRICTEED_TEXT'and ($fldNode/DTYPE='NUMERIC' or $fldNode/DTYPE = 'NUMBER')">
                <xsl:attribute name="CLASS">
                    <xsl:text>TXTstd numeric</xsl:text>
                </xsl:attribute>
            </xsl:if>
            <xsl:attribute name="MAXLENGTH">
                <xsl:if test="count($fldNode/MAXLENGTH) != 0">
                    <xsl:value-of select="$fldNode/MAXLENGTH"/>
                </xsl:if>
                <xsl:if test="count($fldNode/MAXLENGTH) = 0">
                    <xsl:value-of select="$fldNode/SIZE"/>
                </xsl:if>
            </xsl:attribute>
            <!-- 12.1 summary performance changes new start -->
            <xsl:if test="count($fldNode/MIN_CHAR) = 0 or $fldNode/MIN_CHAR != ''">
                <xsl:attribute name="MIN_CHAR">
                    <xsl:value-of select="$fldNode/MIN_CHAR"/>
                </xsl:attribute>
            </xsl:if>
            <!-- 12.1 summary performance changes new end  -->
      <xsl:if test="$fldNode/../@TABPAGE='RESULT'">
              <xsl:attribute name="value">
                 <xsl:text>{{row.data.</xsl:text>
                    <xsl:value-of select="$fldName"/>
                <xsl:text>}}</xsl:text> 
                </xsl:attribute>
                <xsl:attribute name="readonly_temp">
                    <xsl:text>{{row.data.readOnly}}</xsl:text>
                </xsl:attribute>
                 <xsl:attribute name="class">
                    <xsl:text>hideBorder</xsl:text>
                 </xsl:attribute>
            </xsl:if>
        <xsl:call-template name="LovHandler">
            <xsl:with-param name="curr_fld" select="$fldNode"/>
            <xsl:with-param name="EntityType" select="$EntityType"/>
        </xsl:call-template>
        <xsl:if test="count($fldNode/LOV) = 0 ">
            <xsl:if test="count($fldNode/POPUPEDIT) > 0 and (count($fldNode/READ_ONLY) = 0 or $fldNode/READ_ONLY = 0)">
                <oj-button  slot="end"  display="icons" chroming="borderless" oldClassName="BTNimg" tabindex="0" type="button">
                    <xsl:call-template name="Popup_Handler"><xsl:with-param name="fldNode" select="$fldNode"/></xsl:call-template>
                    <span slot="startIcon" tabindex="-1" class="oj-ux-ico-oracle-chat-outline"></span>                        
               </oj-button>
            </xsl:if>
        </xsl:if>
        </oj-input-text>
    </xsl:template>
    
    <xsl:template name="dispTextField">
        <xsl:param name="EntityType"/>
        <xsl:param name="dbt"/>
        <xsl:param name="dbc"/>
        <xsl:param name="fldName"/>
        <xsl:param name="fldNode"/>
         <oj-input-text slot="value" type="TEXT">
            <xsl:call-template name="ATTR_Handler">
                <xsl:with-param name="curr_fld" select="$fldNode"/>
                <xsl:with-param name="curr_fld_dbt" select="$dbt"/>
                <xsl:with-param name="curr_fld_dbc" select="$dbc"/>
                <xsl:with-param name="curr_fld_name" select="$fldName"/>
            </xsl:call-template>
           
            <xsl:attribute name="MAXLENGTH">
                <xsl:if test="count($fldNode/MAXLENGTH) != 0">
                    <xsl:value-of select="$fldNode/MAXLENGTH"/>
                </xsl:if>
                <xsl:if test="count($fldNode/MAXLENGTH) = 0">
                    <xsl:value-of select="$fldNode/SIZE"/>
                </xsl:if>
            </xsl:attribute>            
            
            <xsl:attribute name="CUSTOMLOV">
              <xsl:if test="count($fldNode/LOV) > 0">
                  <xsl:text>Y</xsl:text>
              </xsl:if>
              <xsl:if test="count($fldNode/LOV) = 0">
                   <xsl:text>N</xsl:text>
              </xsl:if>
            </xsl:attribute>
            <xsl:if test="count($fldNode/LOV) > 0">
              <xsl:attribute name="CUSTOMLOVID">
                <xsl:value-of select="normalize-space($fldNode/LOV/NAME)"/>
              </xsl:attribute>
            </xsl:if>
           
            <xsl:if test="$fldNode/../@TABPAGE='RESULT'">
              <xsl:attribute name="value">
                 <xsl:text>{{row.data.</xsl:text>
                    <xsl:value-of select="$fldName"/>
                <xsl:text>}}</xsl:text> 
                </xsl:attribute>
                <xsl:attribute name="readonly_temp">
                    <xsl:text>{{row.data.readOnly}}</xsl:text>
                </xsl:attribute>
                  <xsl:attribute name="class">
                    <xsl:text>hideBorder</xsl:text>
                 </xsl:attribute>
            </xsl:if>
             <!--Changes for AUTO LOV start-->
            <xsl:if test="(count($fldNode/UPPERCASE) > 0 and $fldNode/UPPERCASE = -1) or (count($fldNode/CASE) > 0 and $fldNode/CASE = 'UPPER')">
              <xsl:attribute name="onblur">
                  <xsl:text>fnToUppercase(this,event);</xsl:text>                  
              </xsl:attribute>
              <xsl:if test="count($fldNode/LOV) > 0 ">
                <xsl:attribute name="onchange">
                  <xsl:call-template name="dispAutoLov">
                    <xsl:with-param name="curr_node" select=".."/>
                  </xsl:call-template>
                </xsl:attribute>
              </xsl:if>
            </xsl:if>
            <xsl:if test="(count($fldNode/UPPERCASE) &lt;= 0 or $fldNode/UPPERCASE = 0) and (count($fldNode/CASE) &lt;= 0 or $fldNode/CASE != 'UPPER')">
                <xsl:if test="count($fldNode/LOV) > 0 ">
                <xsl:attribute name="onchange">
                    <xsl:call-template name="dispAutoLov">
                        <xsl:with-param name="curr_node" select="$fldNode"/>
                    </xsl:call-template>
                </xsl:attribute>
              </xsl:if>
            </xsl:if>            
            <!--Changes for AUTO LOV end-->
            <xsl:if test="number($fldNode/SIZE) > 25">
                <xsl:attribute name="SIZE">
                    <xsl:value-of select="16"/>
                </xsl:attribute>
            </xsl:if>
			<!-- 12.1 summary performance changes new start -->
            <xsl:if test="count($fldNode/MIN_CHAR) = 0 or $fldNode/MIN_CHAR != ''">
                <xsl:attribute name="MIN_CHAR">
                    <xsl:value-of select="$fldNode/MIN_CHAR"/>
                </xsl:attribute>
            </xsl:if>
			<!-- 12.1 summary performance changes new end  -->
        <xsl:if test="$fldNode/../@TABPAGE!='RESULT'">       
            <xsl:call-template name="LovHandler">
                <xsl:with-param name="curr_fld" select="$fldNode"/>
                <xsl:with-param name="EntityType" select="$EntityType"/>
            </xsl:call-template>
            <xsl:if test="count($fldNode/LOV) = 0 ">
                <xsl:if test="count($fldNode/POPUPEDIT) > 0 and (count($fldNode/READ_ONLY) = 0 or $fldNode/READ_ONLY = 0)">
                    <oj-button  slot="end"  display="icons" chroming="borderless" oldClassName="BTNimg" tabindex="0" type="button">
                        <xsl:call-template name="Popup_Handler"><xsl:with-param name="fldNode" select="$fldNode"/></xsl:call-template>
                        <span slot="startIcon" tabindex="-1" class="oj-ux-ico-oracle-chat-outline"></span>   
                   </oj-button>
                </xsl:if>
            </xsl:if>
            <!-- Added By Murali, assigning the text field size to 25 & adding popup button -->
            <xsl:if test="count($fldNode/POPUPEDIT) = 0">
                <xsl:if test="number($fldNode/SIZE) > 25">
                    <oj-button  slot="end"  display="icons" chroming="borderless" oldClassName="BTNimg" tabindex="0" type="button">
                        <xsl:call-template name="Popup_Handler"><xsl:with-param name="fldNode" select="$fldNode"/></xsl:call-template>
                       <span slot="startIcon" tabindex="-1" class="oj-ux-ico-oracle-chat-outline"></span>   
                  </oj-button>
                </xsl:if>
            </xsl:if>
        </xsl:if>
        </oj-input-text>
    </xsl:template>
    <!-- Takes care of features common in Text Field of Absolute/Column Positioning -->
    <xsl:template name="dispSelectField">
        <xsl:param name="dbt"/>
        <xsl:param name="dbc"/>
        <xsl:param name="fldName"/>
        <xsl:param name="fldNode"/>
        <oj-select-single slot="value">
            <xsl:attribute name="ID">
                <xsl:value-of select="concat($dbt,'__',$dbc)"></xsl:value-of> <!-- 1203 oghag fix--><!--Fix for 18409775 -->
            </xsl:attribute>
            <xsl:call-template name="ATTR_Handler">
                <xsl:with-param name="curr_fld" select="$fldNode"/>
                <xsl:with-param name="curr_fld_dbt" select="$dbt"/>
                <xsl:with-param name="curr_fld_dbc" select="$dbc"/>
                <xsl:with-param name="curr_fld_name" select="$fldName"/>
            </xsl:call-template>
            <xsl:attribute name="title">
                <xsl:value-of select="$fldNode/LBL"/>
            </xsl:attribute>
			<!-- 12.1 summary performance changes new start -->
            <xsl:if test="count($fldNode/MIN_CHAR) = 0 or $fldNode/MIN_CHAR != ''">
                <xsl:attribute name="MIN_CHAR">
                    <xsl:value-of select="$fldNode/MIN_CHAR"/>
                </xsl:attribute>
            </xsl:if>
             <xsl:if test="$fldNode/../@TABPAGE='RESULT'">
              <xsl:attribute name="value">
                 <xsl:text>{{row.data.</xsl:text>
                    <xsl:value-of select="$fldName"/>
                <xsl:text>}}</xsl:text> 
                </xsl:attribute>
                <xsl:attribute name="readonly_temp">
                    <xsl:text>{{row.data.readOnly}}</xsl:text>
                </xsl:attribute>
                 <xsl:attribute name="class">
                    <xsl:text>hideBorder</xsl:text>
                 </xsl:attribute>
                
            </xsl:if>
			<!-- 12.1 summary performance changes new end -->
            <xsl:if test="count($fldNode/WIDTH) > 0">
                <xsl:attribute name="STYLE">
                    <xsl:text>{width:</xsl:text>
                    <xsl:value-of select="$fldNode/WIDTH"/>
                    <xsl:text>;}</xsl:text>
                </xsl:attribute>
            </xsl:if>
            <!--<xsl:for-each select="$fldNode/OPTION">
                <OPTION VALUE="{@VALUE}">
                    <xsl:if test="(@VALUE)=''">
                        <xsl:attribute name="SELECTED">SELECTED</xsl:attribute>
                        <xsl:attribute name="DEFAULT">
                            <xsl:value-of select="@VALUE"/>
                        </xsl:attribute>
                    </xsl:if>
                    <xsl:value-of select="."/>
                </OPTION>
            </xsl:for-each>-->
            
            
            
            
       </oj-select-single>
       <xsl:call-template name="generateSelectScript">
                <xsl:with-param name="selectNode" select="$fldNode"/>
    </xsl:call-template>
    </xsl:template>
    
    <xsl:template name="generateSelectScript">
    <xsl:param name="selectNode"></xsl:param>
    <script type="text/javascript" DEFER="DEFER">
   
     selectControl['<xsl:value-of select="concat($selectNode/../../SUMMARY_DATA_BLK,'__',$selectNode/NAME)"></xsl:value-of>'] = [];
     
            <xsl:variable name="dfltReqd">
                <xsl:for-each select="$selectNode/OPTION">
                    <xsl:variable name="tempDfltChk">
                        <xsl:if test="(@VALUE)=''">
                            <xsl:value-of select="'N'"/>
                        </xsl:if>
                        <xsl:if test="(@VALUE)!=''">
                            <xsl:value-of select="'Y'"/>
                        </xsl:if>
                    </xsl:variable>
                    <xsl:value-of select="$tempDfltChk"/>
                </xsl:for-each>
            </xsl:variable>
            <xsl:if test="not(contains($dfltReqd, 'N'))">
               var obj = { 'value':  '', 'label': '' };
               selectControl['<xsl:value-of select="concat($selectNode/../../SUMMARY_DATA_BLK,'__',$selectNode/NAME)"></xsl:value-of>'].push(obj);
            </xsl:if>
     
    <xsl:for-each select="$selectNode/OPTION">
      var obj = { 'value':  '<xsl:value-of select="@VALUE"/>', 'label': '<xsl:value-of select="."/>' };
       <xsl:if test="count(@SELECTED) > 0 and @SELECTED=-1">
       obj = { 'value':  '<xsl:value-of select="@VALUE"/>', 'label': '<xsl:value-of select="."/>' ,'defaultValue':  '<xsl:value-of select="@VALUE"/>'};
            </xsl:if>
     selectControl['<xsl:value-of select="concat($selectNode/../../SUMMARY_DATA_BLK,'__',$selectNode/NAME)"></xsl:value-of>'].push(obj);
     </xsl:for-each>
       arrProvider<xsl:value-of select="concat($selectNode/../../SUMMARY_DATA_BLK,'__',$selectNode/NAME)"></xsl:value-of>= new tempArrayDataProvider(selectControl['<xsl:value-of select="concat($selectNode/../../SUMMARY_DATA_BLK,'__',$selectNode/NAME)"></xsl:value-of>'], {
                  keyAttributes: "value",
              });
            
    </script>
    </xsl:template>
    <!-- Takes care of features common in Checkbox Field of Absolute/Column Positioning -->
    <xsl:template name="dispCheckboxField">
        <xsl:param name="dbt"/>
        <xsl:param name="dbc"/>
        <xsl:param name="fldName"/>
        <xsl:param name="fldNode"/><!--
        <label  class="LBLChkRadSel NewChkbox" for="{$dbt}__{$dbc}">--><!--HTML5 Changes--><!--
        <INPUT TYPE="CHECKBOX" DBC="{$dbc}" DBT="{$dbt}" NAME="{$fldName}" id="{$dbt}__{$dbc}" >--><!-- 1203 oghag fix--><!--Fix for 18409775 --><!--
            <xsl:if test="count($fldNode/CHECKED) > 0 and $fldNode/CHECKED = -1">
                <xsl:attribute name="CHECKED">CHECKED</xsl:attribute>
            </xsl:if>
            <xsl:if test="count($fldNode/CUSTOM) > 0">
                <xsl:attribute name="ON">
                    <xsl:value-of select="$fldNode/CUSTOM/ON"/>
                </xsl:attribute>
                <xsl:attribute name="OFF">
                    <xsl:value-of select="$fldNode/CUSTOM/OFF"/>
                </xsl:attribute>
            </xsl:if>
        </INPUT>
        <div class="DIVChkRadSel"><span></span></div>--><!--HTML5 changes 24/OCT/2016--><!--HTML5 Changes--><!--
        <xsl:value-of select="$fldNode/LBL"/>
        </label>-->
        <oj-switch DBC="{$dbc}" DBT="{$dbt}" NAME="{$fldName}">
            <xsl:if test="count($fldNode/CUSTOM) > 0">
                <xsl:attribute name="ON">
                    <xsl:value-of select="$fldNode/CUSTOM/ON"/>
                </xsl:attribute>
                <xsl:attribute name="OFF">
                    <xsl:value-of select="$fldNode/CUSTOM/OFF"/>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="$fldNode/../@TABPAGE='RESULT'">
                <xsl:attribute name="oj_switch_readonly">
                    <xsl:text>{{row.data.readOnly}}</xsl:text>
                </xsl:attribute>
                <xsl:attribute name="translations.switch-on">
                    <xsl:value-of select="$checkboxYes"/>
                </xsl:attribute>
                <xsl:attribute name="translations.switch-off">
                    <xsl:value-of select="$checkboxNo"/>
                </xsl:attribute>
		<!--REDWOOD_35239225 Starts-->
                <xsl:attribute name="value">
                    <xsl:text>{{row.data.</xsl:text>
                        <xsl:value-of select="$fldName"/>
                    <xsl:text>}}</xsl:text>
                </xsl:attribute>
		<!--REDWOOD_35239225 Ends-->
            </xsl:if>
        </oj-switch>
    </xsl:template>
    <!-- Takes care of features common in Textarea Field of Absolute/Column Positioning -->
    <xsl:template name="dispTextareaField">
        <xsl:param name="EntityType"/>
        <xsl:param name="dbt"/>
        <xsl:param name="dbc"/>
        <xsl:param name="fldName"/>
        <xsl:param name="fldNode"/>
        <div slot="value">
         <oj-text-area slot="value">
            <xsl:call-template name="ATTR_Handler">
                <xsl:with-param name="curr_fld" select="$fldNode"/>
                <xsl:with-param name="curr_fld_dbt" select="$dbt"/>
                <xsl:with-param name="curr_fld_dbc" select="$dbc"/>
                <xsl:with-param name="curr_fld_name" select="$fldName"/>
            </xsl:call-template>
            <xsl:if test="$fldNode/../@TABPAGE='RESULT'">
              <xsl:attribute name="value">
                 <xsl:text>{{row.data.</xsl:text>
                    <xsl:value-of select="$fldName"/>
                <xsl:text>}}</xsl:text> 
                </xsl:attribute>
                <xsl:attribute name="readonly_temp">
                    <xsl:text>{{row.data.readOnly}}</xsl:text>
                </xsl:attribute>
                  <xsl:attribute name="class">
                    <xsl:text>hideBorder</xsl:text>
                 </xsl:attribute>
            </xsl:if>
        </oj-text-area>        
        <xsl:if test="$fldNode/../@TABPAGE!='RESULT'">       
            <xsl:if test="(count($fldNode/READ_ONLY) = 0 or $fldNode/READ_ONLY != -1)">
              <xsl:if test="count($fldNode/LOV) =0">
                 <oj-button class="inputNumLovIcon" display="icons" chroming="borderless" oldClassName="BTNimg" tabindex="0" type="button">
                    <xsl:attribute name="onclick">
                        <xsl:text>fnBuildExtSummaryLOV('</xsl:text>
                        <xsl:value-of select="$fldNode/NAME"/>
                        <xsl:text>','</xsl:text>
                        <xsl:call-template name="replaceApos">
                            <xsl:with-param name="inputString" select="$fldNode/LBL"/>
                        </xsl:call-template>
                        <xsl:text>','</xsl:text>
                        <xsl:value-of select="$fldNode/DTYPE"/>
                        <xsl:text>', '', event)</xsl:text>
                    </xsl:attribute>
                      <span slot="startIcon" tabindex="-1" class="oj-ux-ico-search"><span class ="LBLinv"><xsl:value-of select = "$lov"/></span></span>
               </oj-button>
              </xsl:if>
            </xsl:if>
        </xsl:if>
        </div>
    </xsl:template>
    <!-- Takes care of features common in FILE Field of Absolute/Column Positioning -->
    <xsl:template name="dispFileField">
        <xsl:param name="dbt"/>
        <xsl:param name="dbc"/>
        <xsl:param name="fldName"/>
        <xsl:param name="fldNode"/>
        <label class="LBLstd" for="" style="width:{$labelWidth}px;"></label>
        <INPUT TYPE="File" CLASS="TextFile">
            <xsl:call-template name="ATTR_Handler">
                <xsl:with-param name="curr_fld" select="$fldNode"/>
                <xsl:with-param name="curr_fld_dbt" select="$dbt"/>
                <xsl:with-param name="curr_fld_dbc" select="$dbc"/>
                <xsl:with-param name="curr_fld_name" select="$fldName"/>
            </xsl:call-template>
        </INPUT>
    </xsl:template>
    <!-- Display Date attribute handler -->
    <xsl:template name="ATTR_InputEntity_Handler">
        <xsl:param name="curr_fld" select="."/>
        <xsl:attribute name="ID">
            <xsl:value-of select="concat($curr_fld/../../SUMMARY_DATA_BLK,'__',$curr_fld/NAME)"/><!-- 1203 oghag fix--><!--Fix for 18409775 --><!--
            <xsl:text>I</xsl:text>-->
        </xsl:attribute>
        <xsl:attribute name="NAME">
            <xsl:value-of select="$curr_fld/NAME"/>
            <!--<xsl:text>I</xsl:text>-->
        </xsl:attribute>
        <xsl:attribute name="SIZE">
            <xsl:value-of select="$curr_fld/SIZE"/>
        </xsl:attribute>
        <xsl:attribute name="MAXLENGTH">
            <xsl:if test="count($curr_fld/MAXLENGTH) != 0">
                <xsl:value-of select="$curr_fld/MAXLENGTH"/>
            </xsl:if>
            <xsl:if test="count($curr_fld/MAXLENGTH) = 0">
                <xsl:if test="count($curr_fld/SIZE) != 0">
                    <xsl:value-of select="$curr_fld/SIZE"/>
                </xsl:if>
                <xsl:if test="count($curr_fld/SIZE) = 0 and $curr_fld/TYPE= 'DATE'">
                    <xsl:text>16</xsl:text>
                </xsl:if>
            </xsl:if>
        </xsl:attribute>
        <xsl:if test="count($curr_fld/MIN_CHAR) = 0 or $curr_fld/MIN_CHAR != ''">
                <xsl:attribute name="MIN_CHAR">
                    <xsl:value-of select="$curr_fld/MIN_CHAR"/>
                </xsl:attribute>
            </xsl:if>
        <xsl:attribute name="DBC">
            <xsl:value-of select="$curr_fld/NAME"/>
        </xsl:attribute>
        <xsl:if test="count($curr_fld/ACCESSKEY) > 0">
            <xsl:attribute name="ACCESSKEY">
                <xsl:value-of select="$curr_fld/ACCESSKEY"/>
            </xsl:attribute>
        </xsl:if>
        <xsl:apply-templates select="$curr_fld/EVENT"/>
    </xsl:template>
    <!-- Hidden Date Handler -->
    <xsl:template name="ATTR_HiddenEntity_Handler">
        <xsl:param name="curr_fld" select="."/>
        <xsl:if test="count($curr_fld/VALUE) > 0">
            <xsl:attribute name="VALUE">
                <xsl:value-of select="$curr_fld/VALUE"/>
            </xsl:attribute>
        </xsl:if>
        <xsl:attribute name="DBT">
            <xsl:value-of select="$curr_fld/../../SUMMARY_DATA_BLK"/>
        </xsl:attribute>
        <xsl:attribute name="DBC">
            <xsl:value-of select="$curr_fld/NAME"/>
        </xsl:attribute>
        <xsl:attribute name="NAME">
            <xsl:value-of select="$curr_fld/NAME"/>
        </xsl:attribute>
        <xsl:attribute name="ID">
            <xsl:value-of select="concat($curr_fld/../../SUMMARY_DATA_BLK,'__',$curr_fld/NAME)"/>
        </xsl:attribute>
       
        <xsl:if test="count($curr_fld/REQD) = 0 or $curr_fld/REQD = '0'">
        <xsl:attribute name="aria-required">
        <xsl:text>false</xsl:text>
        </xsl:attribute>
    </xsl:if>
    <xsl:if test="count($curr_fld/REQD) &gt; 0 and $curr_fld/REQD = -1">
        <xsl:attribute name="REQUIRED">
            <xsl:value-of select="$curr_fld/REQD"/>
        </xsl:attribute>
        <xsl:attribute name="aria-required">
        <xsl:text>true</xsl:text>
        </xsl:attribute>
    </xsl:if>
        <xsl:variable name="refFld" select="$curr_fld/REF_FIELD"/>
        <xsl:variable name="referFld">
            <xsl:if test="$refFld != ''">
                <xsl:value-of select="substring-after($refFld,'__')"/>
            </xsl:if>
        </xsl:variable>
        <xsl:if test="$refFld != ''">
            <xsl:attribute name="REF_FIELD">
                <xsl:if test="contains($referFld,'__')">
                    <xsl:value-of select="substring-after($referFld,'__')"/>
                </xsl:if>
                <xsl:if test="not(contains($referFld,'__'))">
                    <xsl:value-of select="$referFld"/>
                </xsl:if>
            </xsl:attribute>
        </xsl:if>
        <xsl:apply-templates select="$curr_fld/CUSTOM"/>
    </xsl:template>
    <!-- Handler for Required Flag -->
    <!--<xsl:template name="RequiredFieldHandler">
        <xsl:param name="curr_fld" select="."/>
        <img src="{$imgPath_XSL}/star_disabled.gif" alt=""/>
    </xsl:template>-->
    <xsl:template name="LovHandler">
        <xsl:param name="curr_fld"/>
        <xsl:param name="EntityType"/>
         <!--Fix for 16497868- Textarea support in Summary screen-->
		<!-- 12.1 summary performance changes new start -->
                <xsl:if test="$curr_fld/../@TABPAGE!='RESULT'">
                 <xsl:if test="$curr_fld/TYPE='TEXT' or $curr_fld/TYPE='RESTRICTED_TEXT' or $curr_fld/TYPE='TEXTAREA' or $curr_fld/TYPE='AMOUNT' ">
           <!-- <xsl:if test="count($curr_fld/LOV) &gt; 0 and $curr_fld/LOV = 'Y'">-->
			<!-- 12.1 summary performance changes new end -->
          <xsl:if test="count($curr_fld/LOV) =0">
            <oj-button  slot="end"  display="icons" chroming="borderless" oldClassName="BTNimg" title="{$lov}"  tabindex="0" type="button">
                <xsl:attribute name="onclick">
                    <xsl:text>fnBuildExtSummaryLOV('</xsl:text>
                    <xsl:value-of select="$curr_fld/NAME"/>
                    <xsl:text>','</xsl:text>
                    <xsl:call-template name="replaceApos">
                        <xsl:with-param name="inputString" select="$curr_fld/LBL"/>
                    </xsl:call-template>
                    <xsl:text>','</xsl:text>
                    <xsl:value-of select="$curr_fld/DTYPE"/>
                    <xsl:text>', '', event)</xsl:text>
                </xsl:attribute>
                <span slot="startIcon" tabindex="-1" class="oj-ux-ico-search"><span class ="LBLinv"><xsl:value-of select = "$lov"/></span></span>
            </oj-button>
            </xsl:if>
            <xsl:if test="count($curr_fld/LOV) > 0">
                <oj-button  slot="end"  display="icons" chroming="borderless" oldClassName="BTNimg" title="{$lov}"  tabindex="0" type="button">
                <xsl:call-template name="dispLov">
                    <xsl:with-param name="curr_fld" select="$curr_fld"/>
                    <xsl:with-param name="functionName" select="'disp_lov'"/>
                </xsl:call-template>
                 <span slot="startIcon" tabindex="-1" class="oj-ux-ico-search">
                    <span class="LBLinv">
                        <xsl:value-of select="$lov"/>
                    </span>
                </span>
           </oj-button>
         </xsl:if>
        </xsl:if>
        <xsl:if test="count($curr_fld/LOV) = 0 ">
            <xsl:if test="$EntityType = 'ACCOUNT' ">
                  <oj-button  slot="end"  display="icons" chroming="borderless" oldClassName="BTNimg" title="{$lov}"  tabindex="0" type="button" ONCLICK="Account.show_lov()">
                       
                    <span slot="startIcon" tabindex="-1" class="oj-ux-ico-search"><span class ="LBLinv"><xsl:value-of select = "$lov"/></span></span>
               </oj-button>
            </xsl:if>
            <xsl:if test="$EntityType = 'BRANCH' ">
                 <oj-button  slot="end"  display="icons" chroming="borderless" oldClassName="BTNimg" title="{$lov}"  tabindex="0" type="button" ONCLICK="Branch.show_lov()">
                      <span slot="startIcon" tabindex="-1" class="oj-ux-ico-search"><span class ="LBLinv"><xsl:value-of select = "$lov"/></span></span>
                </oj-button>
            </xsl:if>
            <xsl:if test="$EntityType = 'CURRENCY' ">
                <oj-button  slot="end"  display="icons" chroming="borderless" oldClassName="BTNimg" title="{$lov}"  tabindex="0" type="button" ONCLICK="Currency.show_lov()">
                     <span slot="startIcon" tabindex="-1" class="oj-ux-ico-search"><span class ="LBLinv"><xsl:value-of select = "$lov"/></span></span>
               </oj-button>
            </xsl:if>
            <xsl:if test="$EntityType = 'CUSTOMER' ">
                <oj-button  slot="end"  display="icons" chroming="borderless" oldClassName="BTNimg" title="{$lov}"  tabindex="0" type="button"  ONCLICK="Customer.show_lov()" >
                     <span slot="startIcon" tabindex="-1" class="oj-ux-ico-search"><span class ="LBLinv"><xsl:value-of select = "$lov"/></span></span>
                </oj-button>
            </xsl:if>
            </xsl:if>
        </xsl:if>
                
       
    </xsl:template>
    <!-- Handler for POPUP Editor -->
    <xsl:template name="Popup_Handler">
        <xsl:param name="fldNode"/>
        <xsl:attribute name="ONCLICK">
            <xsl:text>show_editor('</xsl:text>
            <xsl:value-of select="concat(../../../SUMMARY_DATA_BLK,'__',$fldNode/NAME)"/>
            <xsl:text>','</xsl:text>
            <xsl:if test="count($fldNode/MAXLENGTH) != 0">
                <xsl:value-of select="$fldNode/MAXLENGTH"/>
            </xsl:if>
            <xsl:if test="count($fldNode/MAXLENGTH) = 0">
                <xsl:value-of select="$fldNode/SIZE"/>
            </xsl:if>
            <xsl:text>','</xsl:text>
            <xsl:if test="normalize-space($fldNode/POPUPEDIT/TITLE) =''">
                <xsl:call-template name="replaceApos">
                    <xsl:with-param name="inputString" select="$fldNode/LBL"/>
                </xsl:call-template>
            </xsl:if>
            <xsl:if test="normalize-space($fldNode/POPUPEDIT/TITLE) !=''">
                <xsl:call-template name="replaceApos">
                    <xsl:with-param name="inputString" select="$fldNode/POPUPEDIT/TITLE"/>
                </xsl:call-template>
            </xsl:if>            
            <xsl:text>', event);</xsl:text>
        </xsl:attribute>
    </xsl:template>
    
    <xsl:template name="replaceApos">
        <xsl:param name="inputString"/>
        <xsl:variable name="apos" select='"&apos;"'/>
        <xsl:choose>
            <xsl:when test="contains($inputString,$apos)">
                <xsl:value-of select="substring-before($inputString,$apos)"/>
                <xsl:text>\'</xsl:text>
                <xsl:call-template name="replaceApos">
                    <xsl:with-param name="inputString" select="substring-after($inputString,$apos)"/>
                </xsl:call-template>
            </xsl:when>
            <xsl:otherwise>
                <xsl:value-of select="$inputString"/>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>

    <xsl:template name="UPPERCASE">
        <xsl:param name="event_func" select="."/>
        <xsl:attribute name="onChange">
            <xsl:value-of select="$event_func"/>
        </xsl:attribute>
    </xsl:template>
    <xsl:template name="ATTR_Handler">
        <xsl:param name="curr_fld" select="."/>
        <xsl:param name="curr_fld_dbt"/>
        <xsl:param name="curr_fld_dbc"/>
        <xsl:param name="curr_fld_name"/>
        <xsl:attribute name="LABEL_VALUE">
            <xsl:value-of select="$curr_fld/LBL"/>
        </xsl:attribute>
        <xsl:attribute name="title">
            <xsl:value-of select="$curr_fld/LBL"/>
        </xsl:attribute>
        <xsl:attribute name="ID">
            <xsl:value-of select="concat($curr_fld/../../SUMMARY_DATA_BLK,'__',$curr_fld/NAME)"/><!-- 1203 oghag fix --><!--Fix for 18409775 -->
        </xsl:attribute>
        <xsl:attribute name="DBT">
            <xsl:value-of select="$curr_fld/../../SUMMARY_DATA_BLK"/>
        </xsl:attribute>
        <xsl:attribute name="DBC">
            <xsl:value-of select="$curr_fld_dbc"/>
        </xsl:attribute>
        <xsl:attribute name="NAME">
            <xsl:value-of select="$curr_fld_name"/>
        </xsl:attribute>
        <xsl:attribute name="DTYPE">
            <xsl:value-of select="$curr_fld/DTYPE"/>
        </xsl:attribute>
        <xsl:if test="count($curr_fld/VALUE) > 0">
            <xsl:attribute name="VALUE">
                <xsl:value-of select="$curr_fld/VALUE"/>
            </xsl:attribute>
        </xsl:if>
        <!-- Added By Murali, assigning the text field size to 25 & adding popup button-->
        <xsl:if test="number($curr_fld/SIZE) > 20">
            <xsl:attribute name="SIZE">
                <xsl:value-of select="20"/>
            </xsl:attribute>
        </xsl:if>
        <xsl:if test="number($curr_fld/SIZE) &lt; 23">
            <xsl:attribute name="SIZE">
                <xsl:value-of select="$curr_fld/SIZE"/>
            </xsl:attribute>
        </xsl:if>
        <xsl:if test="$curr_fld[TYPE = 'TEXTAREA']">
            <xsl:attribute name="ROWS">
                <xsl:value-of select="$curr_fld/ROWS"/>
            </xsl:attribute>
            <xsl:attribute name="COLS">
                <xsl:value-of select="$curr_fld/COLS"/>
            </xsl:attribute>
        </xsl:if>
        <xsl:if test="count($curr_fld/ACCESSKEY) > 0">
            <xsl:attribute name="ACCESSKEY">
                <xsl:value-of select="$curr_fld/ACCESSKEY"/>
            </xsl:attribute>
        </xsl:if>
        <xsl:apply-templates select="$curr_fld/EVENT"/>
        <xsl:apply-templates select="$curr_fld/CUSTOM"/>
        
        
        <xsl:if test="count($curr_fld/REQD) = 0 or $curr_fld/REQD = '0'">
        <xsl:attribute name="aria-required">
        <xsl:text>false</xsl:text>
        </xsl:attribute>
    </xsl:if>
    <xsl:if test="count($curr_fld/REQD) &gt; 0 and $curr_fld/REQD = -1">
        <xsl:attribute name="REQUIRED">
            <xsl:value-of select="$curr_fld/REQUIRED"/>
        </xsl:attribute>
        <xsl:attribute name="aria-required">
        <xsl:text>true</xsl:text>
        </xsl:attribute>
    </xsl:if>
        <xsl:variable name="refFld" select="$curr_fld/REF_FIELD"/>
        <xsl:variable name="referFld">
            <xsl:if test="$refFld != ''">
                <xsl:value-of select="substring-after($refFld,'__')"/>
            </xsl:if>
        </xsl:variable>
        <xsl:if test="$refFld != ''">
            <xsl:attribute name="REF_FIELD">
                <xsl:if test="contains($referFld,'__')">
                    <xsl:value-of select="substring-after($referFld,'__')"/>
                </xsl:if>
                <xsl:if test="not(contains($referFld,'__'))">
                    <xsl:value-of select="$referFld"/>
                </xsl:if>
            </xsl:attribute>
        </xsl:if>
        <xsl:if test="count($curr_fld/HIDDEN) > 0 and $curr_fld/HIDDEN = -1">
            <xsl:attribute name="CLASS">hidden</xsl:attribute>
        </xsl:if>
        <xsl:if test="count($curr_fld/AMENDABLE) > 0">
            <xsl:attribute name="AMENDABLE">
                <xsl:value-of select="$curr_fld/AMENDABLE"/>
            </xsl:attribute>
        </xsl:if>
        <xsl:if test="count($curr_fld/SUBSYSTEM) > 0">
            <xsl:attribute name="SUBSYSTEM">
                <xsl:value-of select="$curr_fld/SUBSYSTEM"/>
            </xsl:attribute>
        </xsl:if>
        <xsl:if test="$curr_fld/TYPE != 'AMOUNT' and $curr_fld/DTYPE = 'NUMBER'">
            <xsl:attribute name="MIN_VAL">
                <xsl:value-of select="$curr_fld/MIN_VAL"/>
            </xsl:attribute>
            <xsl:attribute name="MAX_VAL">
                <xsl:value-of select="$curr_fld/MAX_VAL"/>
            </xsl:attribute>
            <xsl:attribute name="MAX_DECIMALS">
                <xsl:value-of select="$curr_fld/MAX_DECIMAL"/>
            </xsl:attribute>
            <xsl:attribute name="onblur">
                <xsl:text disable-output-escaping="yes">fnValidateRange(this)</xsl:text>
            </xsl:attribute>
        </xsl:if>
    </xsl:template>

    <!-- Handler for Events -->
    <xsl:template match="EVENT">
        <xsl:attribute name="{./NAME}">
            <xsl:value-of select="./FUNCTION"/>
        </xsl:attribute>
    </xsl:template>

    <!-- Handler for Custom Attributes -->
    <xsl:template match="CUSTOM">
        <xsl:for-each select="*">
            <xsl:attribute name="{name()}">
                <xsl:value-of select="."/>
            </xsl:attribute>
        </xsl:for-each>
    </xsl:template>

    <!-- Takes care of features common in Button Field of Absolute/Column Positioning -->
    <xsl:template name="dispButtonField">
        <xsl:param name="dbt"/>
        <xsl:param name="dbc"/>
        <xsl:param name="fldName"/>
        <xsl:param name="fldNode"/>
        <BUTTON CLASS="BTNtext" nMouseOver="this.className='BTNtextH'"
                        onMouseOut="this.className='BTNtext'"
                        onFocus="this.className='BTNtextH'"
                        onBlur="this.className='BTNtext'">
            <xsl:call-template name="ATTR_Handler">
                <xsl:with-param name="curr_fld" select="$fldNode"/>
                <xsl:with-param name="curr_fld_dbt" select="$dbt"/>
                <xsl:with-param name="curr_fld_dbc" select="$dbc"/>
                <xsl:with-param name="curr_fld_name" select="$fldName"/>
            </xsl:call-template>
            <xsl:value-of select="$fldNode/LBL"/>
            <xsl:if test="count($fldNode/SRC) > 0">
                <!-- Display Image -->
                <span tabindex="-1" class="{$fldNode/className}">
                <!--<IMG id="{$fldNode/NAME}_IMG" SRC="{$fldNode/SRC}">-->
                    <xsl:if test="count($fldNode/ALT) > 0">
                        <xsl:attribute name="ALT">
                            <xsl:value-of select="$fldNode/ALT"/>
                        </xsl:attribute>
                    </xsl:if>
                <!--</IMG>-->
                </span>
            </xsl:if>
        </BUTTON>
    </xsl:template>
    <xsl:template name="dispRadioField">
        <xsl:param name="dbt"/>
        <xsl:param name="dbc"/>
        <xsl:param name="fldName"/>
        <xsl:param name="fldNode"/>
        <xsl:variable name="Left_or_Right" select="$fldNode/@COL"/>
        <xsl:variable name="radioColSpan" select="count($fldNode/OPTION)"/>
        <FIELDSET class="FSTstd">
            <legend>
                <b>
                    <xsl:call-template name="dispLabelField"/>
                </b>
            </legend>
            <table summary="" cellspacing="0" cellpadding="0" border="0"
                   style="table-layout:fixed;width:77%;">
                <xsl:if test="$Left_or_Right ='1'">
                    <xsl:attribute name="style">
                        <xsl:value-of select="'table-layout:fixed;width:79%;'"/>
                    </xsl:attribute>
                </xsl:if>
                <xsl:for-each select="$fldNode/OPTION[@COL=1]">
                    <xsl:sort select="@ROW" data-type="number"
                              order="ascending"/>
                    <xsl:variable name="row" select="@ROW"/>
                    <tr>
                        <xsl:apply-templates select="$fldNode/OPTION[@ROW = $row]" mode="column">
                            <xsl:with-param name="radioColSpan" select="$radioColSpan"/>
                            <xsl:with-param name="Left_or_Right" select="$Left_or_Right"/>
                        </xsl:apply-templates>
                    </tr>
                </xsl:for-each>
            </table>
        </FIELDSET>
    </xsl:template>
    <!--radio option handler-->
    <xsl:template match="OPTION" mode="column">
        <xsl:param name="radioColSpan" select="."/>
        <xsl:param name="Left_or_Right" select="."/>
        <td WIDTH="*"></td>
        <td align="left">
            <xsl:if test="$Left_or_Right ='1'">
                <xsl:attribute name="align">
                    <xsl:value-of select="'center'"/>
                </xsl:attribute>
            </xsl:if>
            <LABEL class="LBLauto" for="">
                <INPUT TYPE="RADIO" CLASS="RADstd">
                    <xsl:attribute name="VALUE">
                        <xsl:value-of select="VALUE"/>
                    </xsl:attribute>
                    <xsl:if test="count(SELECTED) > 0 and SELECTED='-1'">
                        <xsl:attribute name="CHECKED">CHECKED</xsl:attribute>
                    </xsl:if>
                </INPUT>
                <xsl:value-of select="LBL"/>
            </LABEL>
        </td>
    </xsl:template>
    <xsl:template name="dispHiddenField">
        <xsl:param name="dbt"/>
        <xsl:param name="dbc"/>
        <xsl:param name="fldName"/>
        <xsl:param name="fldNode"/>
        <label class="LBLinv" for=""></label>
         <oj-input-text slot="value" type="HIDDEN" style="display:none;">
            <xsl:call-template name="ATTR_Handler">
                <xsl:with-param name="curr_fld" select="$fldNode"/>
                <xsl:with-param name="curr_fld_dbt" select="$dbt"/>
                <xsl:with-param name="curr_fld_dbc" select="$dbc"/>
                <xsl:with-param name="curr_fld_name" select="$fldName"/>
            </xsl:call-template>  
            <xsl:if test="$fldNode/../@TABPAGE='RESULT'">
              <xsl:attribute name="value">
                 <xsl:text>{{row.data.</xsl:text>
                    <xsl:value-of select="$fldName"/>
                <xsl:text>}}</xsl:text> 
                </xsl:attribute>
                <xsl:attribute name="readonly_temp">
                    <xsl:text>{{row.data.readOnly}}</xsl:text>
                </xsl:attribute>
                  <xsl:attribute name="class">
                    <xsl:text>hideBorder</xsl:text>
                 </xsl:attribute>
            </xsl:if>
        </oj-input-text>
    </xsl:template>
    <xsl:template name="dispRadioToSelectField">
        <xsl:param name="dbt"/>
        <xsl:param name="dbc"/>
        <xsl:param name="fldName"/>
        <xsl:param name="fldNode"/>
        <oj-select-single slot="value">
       <xsl:if test="$fldNode/../@TABPAGE='RESULT'">
              <xsl:attribute name="value">
                 <xsl:text>{{row.data.</xsl:text>
                    <xsl:value-of select="$fldName"/>
                <xsl:text>}}</xsl:text> 
                </xsl:attribute>
                <xsl:attribute name="readonly_temp">
                    <xsl:text>{{row.data.readOnly}}</xsl:text>
                </xsl:attribute>
                 <xsl:attribute name="class">
                    <xsl:text>hideBorder</xsl:text>
                 </xsl:attribute>
            </xsl:if>
            <xsl:attribute name="ID">
                <xsl:value-of select="concat($dbt,'__',$dbc)"></xsl:value-of><!-- 1203 oghag fix--><!--Fix for 18409775 -->
            </xsl:attribute>
            <xsl:call-template name="ATTR_Handler">
                <xsl:with-param name="curr_fld" select="$fldNode"/>
                <xsl:with-param name="curr_fld_dbt" select="$dbt"/>
                <xsl:with-param name="curr_fld_dbc" select="$dbc"/>
                <xsl:with-param name="curr_fld_name" select="$fldName"/>
            </xsl:call-template>
            <xsl:attribute name="title">
                <xsl:value-of select="$fldNode/LBL"/>
            </xsl:attribute>
            <!--<OPTION VALUE=""></OPTION>
            <xsl:for-each select="$fldNode/OPTION">
                <OPTION VALUE="{VALUE}">
                    <xsl:if test="@VALUE = ''">
                        <xsl:attribute name="SELECTED">SELECTED</xsl:attribute>
                    </xsl:if>
                    <xsl:value-of select="LBL"/>
                </OPTION>
            </xsl:for-each>-->
        </oj-select-single>
        <xsl:call-template name="generateRadioToSelectScript">
                <xsl:with-param name="selectNode" select="$fldNode"/>
    </xsl:call-template>
    </xsl:template>
<!-- End of ExtSummaryInput.xsl -->
 <xsl:template name="generateRadioToSelectScript">
    <xsl:param name="selectNode"></xsl:param>
    <script type="text/javascript" DEFER="DEFER">
     selectControl['<xsl:value-of select="concat($selectNode/../../SUMMARY_DATA_BLK,'__',$selectNode/NAME)"></xsl:value-of>'] = [];
     var obj = { 'value':  '', 'label': '' };
     selectControl['<xsl:value-of select="concat($selectNode/../../SUMMARY_DATA_BLK,'__',$selectNode/NAME)"></xsl:value-of>'].push(obj);
        
    <xsl:for-each select="$selectNode/OPTION">
      var obj = { 'value':  '<xsl:value-of select="VALUE"/>', 'label': '<xsl:value-of select="LBL"/>' };
        <xsl:if test="@VALUE = ''">
       obj = { 'value':  '<xsl:value-of select="VALUE"/>', 'label': '<xsl:value-of select="LBL"/>' ,'defaultValue':  '<xsl:value-of select="VALUE"/>'};
       </xsl:if>
     selectControl['<xsl:value-of select="concat($selectNode/../../SUMMARY_DATA_BLK,'__',$selectNode/NAME)"></xsl:value-of>'].push(obj);
            </xsl:for-each>
       arrProvider<xsl:value-of select="concat($selectNode/../../SUMMARY_DATA_BLK,'__',$selectNode/NAME)"></xsl:value-of>= new tempArrayDataProvider(selectControl['<xsl:value-of select="concat($selectNode/../../SUMMARY_DATA_BLK,'__',$selectNode/NAME)"></xsl:value-of>'], {
                  keyAttributes: "value",
              });
       
    </script>
    </xsl:template>
<!-- End of ExtSummaryInput.xsl -->

<!-- Start of ExtSummaryCore.xsl -->
<!-- Takes care of features common in Label Field of Absolute/Column Positioning -->
<xsl:template name="dispLabelField">
    <xsl:param name="dbt"/>
    <xsl:param name="dbc"/>
    <xsl:param name="fldName"/>
    <xsl:param name="fldNode"/>
    
     <oj-label slot="label"  style="width:{$labelWidth}px;">
        <xsl:value-of select="$fldNode/LBL"></xsl:value-of>
		<!-- 12.1 summary performance changes new start -->
        <xsl:if test="count($fldNode/MIN_CHAR) &gt; 0 and $fldNode/MIN_CHAR != ''">
            <xsl:if test="$fldNode/TYPE != 'SELECT'">
                <xsl:text>(</xsl:text>
                <xsl:value-of select="$fldNode/MIN_CHAR"></xsl:value-of>
                <xsl:text>)</xsl:text>
            </xsl:if>
        </xsl:if>
		<!-- 12.1 summary performance changes new end -->
        <!--<xsl:call-template name="RequiredFieldHandler">
            <xsl:with-param name="curr_fld" select="$fldNode" />
        </xsl:call-template>-->
    </oj-label>
</xsl:template>

<xsl:template name="dispLabelHidden">
    <!--<LABEL CLASS="LBLinv"></LABEL>-->
</xsl:template>

<xsl:template name="dispLabelCaption">
    <xsl:param name="curr_fld" select="." />
    
    <!-- Labels with Access Key are being underlined -->
    <xsl:if test="count($curr_fld/ACCESSKEY) &gt; 0 and contains($curr_fld/LBL , $curr_fld/ACCESSKEY)">
        <xsl:value-of select="substring-before($curr_fld/LBL,$curr_fld/ACCESSKEY)" />
        <U>
            <xsl:value-of select="$curr_fld/ACCESSKEY" />
        </U>
        <xsl:value-of select="substring-after($curr_fld/LABEL,$curr_fld/ACCESSKEY)" />
    </xsl:if>
    <xsl:if test="count($curr_fld/ACCESSKEY) = 0 or not(contains($curr_fld/LBL , $curr_fld/ACCESSKEY))">
        <xsl:value-of select="$curr_fld/LBL" />
    </xsl:if>
    
    <!-- if no label is present , keep &nbsp to complete the TD. !-->
    <xsl:if test="$curr_fld/LBL = ''">
        <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
    </xsl:if>
</xsl:template>

<xsl:template name="ATTR_Handler_lbs">
    <xsl:param name="curr_fld" select="." />
    
    <xsl:attribute name="NAME">
        <xsl:value-of select="$curr_fld/NAME" />
    </xsl:attribute>
    <xsl:if test="count($curr_fld/HIDDEN) &gt; 0 and $curr_fld/HIDDEN = -1">
        <xsl:attribute name="CLASS">hidden</xsl:attribute>
    </xsl:if>
    <xsl:if test="count($curr_fld/ACCESSKEY) &gt; 0">
        <xsl:attribute name="ACCESSKEY">
            <xsl:value-of select="$curr_fld/ACCESSKEY" />
        </xsl:attribute>
    </xsl:if>
</xsl:template>


<!-- Handler for Events -->
<xsl:template match="EVENT">
    <xsl:attribute name="{./NAME}" >
        <xsl:value-of select="./FUNCTION" />
    </xsl:attribute>
</xsl:template>
    
<!-- Handler for Custom Attributes -->
<xsl:template match="CUSTOM">
    <xsl:for-each select="*">
        <xsl:attribute name="{name()}" >
            <xsl:value-of select="." />
        </xsl:attribute>
    </xsl:for-each>
</xsl:template>

<xsl:template name="disp_Exit_Btn">
        <oj-button class="oj-sm-margin-1x" chroming="solid" ID="BTN_EXIT" name="BTN_EXIT" on-oj-action="[[fnExit_sum.bind(null,'',event)]]" label="{$exit_SummaryAudit}"   >
            
            <!--<xsl:value-of select="$exit"/>-->
        </oj-button>
<!--
    <TABLE class="TABLEAudit" cellSpacing="0" cellPadding="0" width="99%" border="0" summary="">
        <TR>
            <TD vAlign="top">
                <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
            </TD>        
            <TD class="TDAuditButton" vAlign="top" width="90%">
                <INPUT class="BTNfooter" id="BTN_EXIT" onclick="fnExit_sum('',event)" type="button" onmouseover="this.className='BTNfooterH'" onblur="this.className='BTNfooter'" onfocus="this.className='BTNfooterH'" onmouseout="this.className='BTNfooter'" value="{$exit_SummaryAudit}" onkeydown="return fnHandleSumBtn(event)"/>
                --><!--<IMG id="BTN_EXIT_IMG'" style="display:none" src="Images/Exit2.gif" name="BTN_EXIT_IMG"/>--><!--
            </TD>
        </TR>
    </TABLE>-->
</xsl:template>
    
<xsl:template name="Custom_Legends">
    <xsl:param name="fsHeight"/>
    <xsl:param name="tdHeight"/>
    <xsl:if test="count(//LEGENDS) > 0">
        <xsl:for-each select="//LEGENDS">
            <xsl:variable name="width">
                <xsl:if test="normalize-space(WIDTH) != ''">
                    <xsl:value-of select="normalize-space(WIDTH)"/>
                </xsl:if>
                <xsl:if test="normalize-space(WIDTH) = ''">
                    <xsl:value-of select="150"/>
                </xsl:if>
            </xsl:variable>        
            <FIELDSET CLASS="FIELDSETAudit">          
                <LEGEND>
                    <xsl:value-of select="LBL"/>
                </LEGEND>          
                    <TABLE border="0" cellspacing="0" cellpadding="0" summary="">
                    <xsl:for-each select="OPTION">
                        <TR>
                            <TD>
                                <label class="LBLstd"  style="width:{$labelWidth}px;">
                                    <xsl:value-of select="@VALUE"/>
                                    -
                                    <xsl:value-of select="(.)"/>
                                </label>
                            </TD>
                        </TR>
                    </xsl:for-each>
                </TABLE>          
            </FIELDSET>        
        </xsl:for-each>
    </xsl:if>
</xsl:template>
<!-- End of ExtSummaryCore.xsl -->

    <xsl:param name="imgPath"/>
    <xsl:variable name="imgPath_XSL">
        <xsl:choose>
            <xsl:when test="$imgPath != ''">
                <xsl:value-of select="$imgPath"/>
            </xsl:when>
            <xsl:otherwise>
                <xsl:value-of select="'Images'"/>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:variable>
    <xsl:param name="functionId"/>
    <xsl:param name="uiXML"/>
    <xsl:variable name="uixml">
        <xsl:if test="$uiXML != ''">
            <xsl:value-of select="$uiXML"/>
        </xsl:if>
        <xsl:if test="$uiXML = ''">
            <xsl:value-of select="$functionId"/>
        </xsl:if>
    </xsl:variable>
    <xsl:param name="XslLabels"/>
    <xsl:param name="applicationName"/>
    
    <!-- Main template -->
    <xsl:template match="/">
        <xsl:apply-templates select="FORM/SUMMARY"/>
    </xsl:template>
    
    <xsl:template match="SUMMARY">
    <div class="oj-flex-bar oj-sm-align-items-center oj-sm-padding-5x-horizontal">
    <div class="oj-flex-bar-start">
     <oj-conveyor-belt id="toolbarSummary" class="convyorBeltContainer oj-sm-margin-2x-vertical">
    
                  
                             
                     <oj-button chroming="borderless"  id="SaveCriteria" name="SaveCriteria" style="display: none;"  on-oj-action="[[fnOpenCriteriaScr.bind(null)]]">
                        <xsl:value-of select="$saveCriteria_SummaryAudit"/> 
                        <span slot='startIcon' class="oj-ux-ico-save"></span>
                    </oj-button> 
                     <oj-button chroming="borderless"  id="SavedQry" name="SavedQry" style="display: flex; "  on-oj-action="[[fnQueryCriteria.bind(null,'QUERYCRITERIA',event)]]">
                         <xsl:value-of select="$savedQry_SummaryAudit"/>
                         <span slot='startIcon' class="oj-ux-ico-save-as"></span>
                    </oj-button> 
                     <oj-button chroming="borderless"  id="Export" name="Export" style="display: none;"  on-oj-action="[[fnExportToExcel.bind(null)]]">
                        <xsl:value-of select="$export_SummaryAudit"/>
                        <span slot='startIcon' class="oj-ux-ico-acl-export"></span>
                    </oj-button> 
                     <oj-button chroming="borderless" on-oj-action="[[fnExecuteQuery_sum.bind(null,'Y',event)]]" id="Search" name="Search" style="display: flex;">
                         <xsl:value-of select="$search_SummaryAudit"/>
                         <span slot='startIcon' class="oj-ux-ico-create-options"></span>
                    </oj-button> 
                     <oj-button chroming="borderless"  id="AdvSearch" name="AdvSearch" style="display: flex;"  on-oj-action="[[fnSubScreenMain.bind(null,'{$functionId}','{$uixml}','CVS_ADVANCED','')]]">
                        <xsl:value-of select="$advanced_SummaryAudit"/>
                        <span slot='startIcon' class="oj-ux-ico-content-item-search"></span>
                    </oj-button> 
                     <oj-button chroming="borderless"  id="Refresh" name="Refresh" style="display: none;"  on-oj-action="[[fnRefreshSummary.bind(null)]]">
                      <xsl:value-of select="$refresh_SummaryAudit"/>
                      <span slot='startIcon' class="oj-ux-ico-refresh"></span>
                    </oj-button> 
                     <oj-button chroming="borderless"  on-oj-action="[[fnResetQry.bind(null)]]" >
                        <xsl:value-of select="$reset_SummaryAudit"/>
                       <span slot='startIcon' class="oj-ux-ico-reset-variable"></span>
                    </oj-button> 
                     <oj-button chroming="borderless"  on-oj-action="[[fnResetAll.bind(null)]]" >
                        <xsl:value-of select="$clearAll_SummaryAudit"/>
                        <span slot='startIcon' class="oj-ux-ico-clipboard-clear"></span>
                    </oj-button> 
                    <!--12.0.3 Summary to detail changes starts-->
                     <oj-button chroming="borderless"  id="Details" style="display: none;"  on-oj-action="[[fnShowMultiDetails.bind(null)]]">
                        <xsl:value-of select="$detail_SummaryAudit"/>
                        <span slot='startIcon' class="oj-ux-ico-file-view-details"></span>
                    </oj-button> 
                    <!--12.0.3 Summary to detail changes ends-->
                     <oj-button chroming="borderless"  id="ExportAll" name="ExportAll" style="display: none;"  on-oj-action="[[fnExportAllToExcel.bind(null)]]">
                        <xsl:value-of select="$exportAll_SummaryAudit"/>
                        <span slot='startIcon' class="oj-ux-ico-export-excel-data"></span>
                    </oj-button> 
                 </oj-conveyor-belt>
                </div>
                <div class="oj-flex-bar-end ">
                <oj-label-value label-edge="start" label-width="{$labelWidth}px" class="oj-sm-margin-top-2x" >
                
                <oj-label  slot="label"  style="width:{$labelWidth}px;" title="{$recordsPerPage_SummaryAudit}" for="">
                <xsl:value-of select="$recordsPerPage_SummaryAudit"/>
                
                </oj-label> 
                <!--<SELECT CLASS="SELstd" NAME="Records" title="{$recordsPerPage_SummaryAudit}" TYPE="number" SIZE="" MAXLENGTH="3">
                   <OPTION VALUE="15">15</OPTION>
                   <OPTION VALUE="25">25</OPTION>
                   <OPTION VALUE="50">50</OPTION>
                </SELECT>--> 
               <oj-select-single  slot="value" name="Records"  style="width:100px;padding-top:5px;padding-right:25px"  >
                <xsl:attribute name="value">
                    <xsl:text>[[recordsPerPage]]</xsl:text>
                </xsl:attribute>
                 <xsl:attribute name="data">
                    <xsl:text>{{recordsPerPageDataProvider}}</xsl:text>
                </xsl:attribute>
              </oj-select-single>
                
                </oj-label-value>
                </div></div>
                
        <DIV id="ScrollYes"  >
		<!-- 12.1 summary performance changes new start -->
         <div id="PageHead">   
		 <!--<xsl:attribute name="screenwidth">
		 <xsl:value-of select="$screenWidth"/>
		 </xsl:attribute>-->
		 
           <div id="TblQuery">
                <xsl:call-template name="QueryContent"/>
           </div>
			<!-- 12.1 summary performance changes new end -->
            </div>
            <xsl:call-template name="ResultProcess"/>            
        </DIV>
        <DIV class="DIVfooter" id="ScrollNo">
            <h2 class="LBLinv"><xsl:value-of select="$page_footer"/></h2>
            <xsl:call-template name="Sum_Custom_Btn"/>
            <!--<div class="DIVAudit">
                <xsl:call-template name="disp_Exit_Btn"/>
            </div>-->
        </DIV>
        <xsl:call-template name="generateScript"/>
    </xsl:template>
      <xsl:template name="Sum_Custom_Btn">
        <div class="convyorBeltContainer">
                <!--30620131 Added id attribute to ul-->
                <div class="oj-flex-bar oj-sm-align-items-center">
				
                 <xsl:if test="(count(//SUMBUTTONS) > 0)">
					<xsl:variable name="noOfButtons" select="count(//SUMBUTTONS/BUTTON)"/>
					<xsl:variable name="buttonsPerRow" select="//SUMBUTTONS/BUTTONS_PER_ROW"/>
                <oj-conveyor-belt id="subSystemConveyorBelt" class="convyorBeltContainer oj-md-10 oj-sm-12 oj-flex-bar-start" arrow-visibility="visible" data-oj-binding-provider="none"> <!--REDWOOD_35298529-->
				
                   <xsl:for-each select="//SUMBUTTONS/BUTTON">
				            <oj-button class="conveyorBeltItem oj-sm-margin-1x" id="{@id}">
                                <span onkeydown="return fnhandleSubScrBtn(event)">
                                    <xsl:if test="BUTTON_EVENT != ''">
										<xsl:attribute name="onclick">
											<xsl:value-of select="BUTTON_EVENT"/>
										</xsl:attribute>
									</xsl:if>
                                    <xsl:value-of select="BUTTON_LBL"/>
                                </span>
                            </oj-button>
                </xsl:for-each>
                </oj-conveyor-belt>
                </xsl:if>
                <div class="footer-btn-container oj-flex-bar-end">
                     <xsl:call-template name="disp_Exit_Btn"/>
                </div>
                </div>
         
        </div>

    
    </xsl:template>
    <!--<xsl:template name="Sum_Custom_Btn">
        <xsl:if test="(count(//SUMBUTTONS) > 0)">
            <xsl:variable name="noOfButtons" select="count(//SUMBUTTONS/BUTTON)"/>
            <xsl:variable name="buttonsPerRow" select="//SUMBUTTONS/BUTTONS_PER_ROW"/>
            <div class="DIVAbutton" id="SUM_CUST_BTNS" style="padding-left:2px;">
                <ul id="CUST_BTNS">
                    <xsl:for-each select="//SUMBUTTONS/BUTTON">
                        <li>
                            <a href="#" class="Abutton" tabindex="0" onblur="this.className='Abutton'" onmouseover="this.className='AbuttonH'" onfocus="this.className='AbuttonH'" onmouseout="this.className='Abutton'" NAME="{BUTTON_NAME}" id="{BUTTON_NAME}" onkeydown="return fnhandleSubScrBtn(event)">
                                <xsl:if test="BUTTON_EVENT != ''">
                                    <xsl:attribute name="onClick">
                                        <xsl:value-of select="BUTTON_EVENT"/>
                                    </xsl:attribute>
                                </xsl:if>
                                <span><xsl:value-of select="BUTTON_LBL"/></span>
                            </a>
                            <xsl:choose>--><!--HTML5 Changes Start--><!--
                                <xsl:when test="position() != last()">
                                    <a class="Abutton">|</a>--><!--Fix for 21627033--><!--
                                </xsl:when>
                            </xsl:choose>--><!--HTML5 Changes End--><!--
                        </li>
                    </xsl:for-each>
                </ul>
        </div>
        </xsl:if>
    </xsl:template>-->
       <!-- 12.1 summary performance changes new start -->
  
    <xsl:template name="QueryContent">  
        <xsl:if test="count(@CRITERIA_SRCH)= 0 or @CRITERIA_SRCH = 'N'">
        <oj-collapsible class="oj-sm-padding-5x-horizontal" expand-area="header" expanded="true" id="queryCollapsible">
             <h4 slot="header">
               <xsl:value-of select="$search_SummaryAudit"/> <xsl:text> (</xsl:text>  <xsl:value-of select="$search_CaseSensitive"/><xsl:text>) </xsl:text>
             </h4>
                <div class="oj-sm-width-full sectionPanel" id="TblOptionlQuery">    
                    <div class="partitionPanel oj-flex oj-sm-padding-5x-horizontal">
                    
                    <xsl:call-template name="DIVThreeColSectionHandler">
                         <xsl:with-param name="currNode" select="SUMBLOCK[@TABPAGE = 'QUERY']/FIELD[TYPE!='HIDDEN']/TYPE"/>
                    </xsl:call-template>                        
                </div>            
                </div>  
                </oj-collapsible>
        </xsl:if>
       <!--<xsl:if test="(count(@TMP_SCR_TYPE) = 0 or @TMP_SCR_TYPE != 'L') and (count(@CRITERIA_SRCH)= 0 or @CRITERIA_SRCH = 'N')">
         <fieldset class="FSTdlg">
            <legend><xsl:value-of select="$search_CaseSensitive"/></legend>
            <div class="DIVTwoColSectionContainer" id="TblOptionlQuery">    
                <xsl:call-template name="DIVTwoColSectionHandler">
                    <xsl:with-param name="currNode" select="SUMBLOCK[@TABPAGE = 'QUERY']/FIELD[TYPE!='HIDDEN']/TYPE"/>
                </xsl:call-template>                        
            </div>            
        </fieldset>
       </xsl:if>-->
        <xsl:if test="count(@CRITERIA_SRCH) &gt; 0 and @CRITERIA_SRCH = 'Y'">
        <oj-collapsible class="oj-sm-padding-5x-horizontal" expand-area="header" expanded="true" id="queryCollapsible">
             <h4 slot="header">
               <xsl:value-of select="$recommended_field"/>
             </h4>
                <div class="oj-sm-width-full sectionPanel" id="TblRcmndedQuery">
                    <xsl:variable name="no_Of_flds" select="count(SUMBLOCK[@TABPAGE = 'QUERY']/FIELD[count(MIN_CHAR)&gt;0 and MIN_CHAR!=''])"/>
                    <xsl:if test="$no_Of_flds > 0">
                    <div class="partitionPanel oj-flex oj-sm-padding-5x-horizontal">
                        <xsl:call-template name="DIVThreeColSectionHandler">
                            <xsl:with-param name="currNode" select="SUMBLOCK[@TABPAGE = 'QUERY']/FIELD[TYPE!='HIDDEN' and (count(MIN_CHAR)&gt;0 and MIN_CHAR!='')]/TYPE"/>
                        </xsl:call-template>
                        </div>
                    </xsl:if>                    
                </div>
          </oj-collapsible>
        <oj-collapsible class="oj-sm-padding-5x-horizontal" expand-area="header" expanded="true" id="queryCollapsible">
             <h4 slot="header">
               <xsl:value-of select="$optional_field"/>
             </h4>
                <div class="oj-sm-width-full sectionPanel" id="TblRcmndedQuery">
                   <xsl:variable name="NoOfFlds" select="count(SUMBLOCK[@TABPAGE = 'QUERY']/FIELD[count(MIN_CHAR)= 0 or MIN_CHAR=''])"/>
                    <xsl:if test="$NoOfFlds > 0">      
                    <div class="partitionPanel oj-flex oj-sm-padding-5x-horizontal">
                         <xsl:call-template name="DIVThreeColSectionHandler">
                            <xsl:with-param name="currNode" select="SUMBLOCK[@TABPAGE = 'QUERY']/FIELD[TYPE!='HIDDEN'and (count(MIN_CHAR)= 0 or MIN_CHAR='')]/TYPE"/>
                        </xsl:call-template>
                        </div>
                    </xsl:if>                    
                </div>
          </oj-collapsible>
       
            <!--<fieldset class="FSTdlg">
                <legend><xsl:value-of select="$recommended_field"/></legend>
                <div class="DIVThreeColSectionContainer" id="TblRcmndedQuery">
                    <xsl:variable name="no_Of_flds" select="count(SUMBLOCK[@TABPAGE = 'QUERY']/FIELD[count(MIN_CHAR)&gt;0 and MIN_CHAR!=''])"/>
                    <xsl:if test="$no_Of_flds > 0">
                        <xsl:call-template name="DIVThreeColSectionHandler">
                            <xsl:with-param name="currNode" select="SUMBLOCK[@TABPAGE = 'QUERY']/FIELD[TYPE!='HIDDEN' and (count(MIN_CHAR)&gt;0 and MIN_CHAR!='')]/TYPE"/>
                        </xsl:call-template>
                    </xsl:if>                    
                </div>
            </fieldset>
            <fieldset class="FSTdlg">
                <legend><xsl:value-of select="$optional_field "/></legend>
                <div class="DIVThreeColSectionContainer" id="TblOptionlQuery">    
                    <xsl:variable name="NoOfFlds" select="count(SUMBLOCK[@TABPAGE = 'QUERY']/FIELD[count(MIN_CHAR)= 0 or MIN_CHAR=''])"/>
                    <xsl:if test="$NoOfFlds > 0">                        
                        <xsl:call-template name="DIVThreeColSectionHandler">
                            <xsl:with-param name="currNode" select="SUMBLOCK[@TABPAGE = 'QUERY']/FIELD[TYPE!='HIDDEN'and (count(MIN_CHAR)= 0 or MIN_CHAR='')]/TYPE"/>
                        </xsl:call-template>                        
                    </xsl:if>                    
                </div>            
            </fieldset>-->
        </xsl:if>
        <!--<xsl:if test="(count(@TMP_SCR_TYPE) = 0 or @TMP_SCR_TYPE != 'L') and (count(@CRITERIA_SRCH) &gt; 0 and @CRITERIA_SRCH = 'Y')">
            <xsl:variable name="no_Of_flds" select="count(SUMBLOCK[@TABPAGE = 'QUERY']/FIELD[count(MIN_CHAR)&gt;0 and MIN_CHAR!=''])"/>
            <xsl:if test="$no_Of_flds > 0">
                <fieldset class="FSTdlg">
                    <legend><xsl:value-of select="$recommended_field"/></legend>
                    <div class="DIVTwoColSectionContainer" id="TblRcmndedQuery">
                        <xsl:call-template name="DIVTwoColSectionHandler">
                            <xsl:with-param name="currNode" select="SUMBLOCK[@TABPAGE = 'QUERY']/FIELD[TYPE!='HIDDEN' and (count(MIN_CHAR)&gt;0 and MIN_CHAR!='')]/TYPE"/>
                        </xsl:call-template>
                    </div>
                </fieldset>
            </xsl:if>    
            <fieldset class="FSTdlg">
                <legend><xsl:value-of select="$optional_field "/></legend>
                <div class="DIVTwoColSectionContainer" id="TblOptionlQuery">    
                    <xsl:variable name="NoOfFlds" select="count(SUMBLOCK[@TABPAGE = 'QUERY']/FIELD[count(MIN_CHAR)= 0 or MIN_CHAR=''])"/>
                    <xsl:if test="$NoOfFlds > 0">                        
                        <xsl:call-template name="DIVTwoColSectionHandler">
                            <xsl:with-param name="currNode" select="SUMBLOCK[@TABPAGE = 'QUERY']/FIELD[TYPE!='HIDDEN'and (count(MIN_CHAR)= 0 or MIN_CHAR='')]/TYPE"/>
                        </xsl:call-template>                        
                    </xsl:if>                    
                </div>            
            </fieldset>
        </xsl:if>-->
    </xsl:template>
    
    <xsl:template name="DIVTwoColSectionHandler">   
        <xsl:param name="currNode"/>
        <div class="DIVColumnOne">
		<xsl:attribute name="style">
			<xsl:text>width:</xsl:text>
			<xsl:value-of select="($screenWidth div 2) -  24"/>
			<xsl:text>px</xsl:text>
		</xsl:attribute>
            <fieldset class="FSTcell">
               <xsl:for-each select="$currNode">
                    <xsl:variable name="pos" select="position()"/>
                    <xsl:variable name="dbt" select="../../../SUMMARY_DATA_BLK"/>
                    <xsl:variable name="dbc" select="../NAME"/>
                    <xsl:variable name="fldName" select="../NAME"/>
                    <xsl:if test="$pos mod 2 = 1">
                        <xsl:call-template name="typeHandler">
                            <xsl:with-param name="fType" select="."/>
                            <xsl:with-param name="fldNode" select=".."/>
                        </xsl:call-template>
                    </xsl:if>
                </xsl:for-each>
            </fieldset>
        </div>
        <div class="DIVColumnOne">
			<xsl:attribute name="style">
			<xsl:text>width:</xsl:text>
			<xsl:value-of select="($screenWidth div 2) - 24"/>
			<xsl:text>px</xsl:text>
		</xsl:attribute>
            <fieldset class="FSTcell">
                <xsl:for-each select="$currNode">
                    <xsl:variable name="pos" select="position()"/>
                    <xsl:variable name="dbt" select="../../../SUMMARY_DATA_BLK"/>
                    <xsl:variable name="dbc" select="../NAME"/>
                    <xsl:variable name="fldName" select="../NAME"/>
                    <xsl:if test="$pos mod 2 = 0">
                        <xsl:call-template name="typeHandler">
                            <xsl:with-param name="fType" select="."/>
                            <xsl:with-param name="fldNode" select=".."/>
                        </xsl:call-template>
                </xsl:if>
                </xsl:for-each>

            </fieldset>
        </div>
         <xsl:for-each select="SUMBLOCK[@TABPAGE = 'QUERY']/FIELD[TYPE='HIDDEN']/TYPE">
            <xsl:variable name="pos" select="position()"/>
            <xsl:variable name="dbt" select="../../../SUMMARY_DATA_BLK"/>
            <xsl:variable name="dbc" select="../NAME"/>
            <xsl:variable name="fldName" select="../NAME"/>
                <xsl:call-template name="typeHandler">
                    <xsl:with-param name="fType" select="."/>
                    <xsl:with-param name="fldNode" select=".."/>
                </xsl:call-template>
         </xsl:for-each>     
    </xsl:template>
     <xsl:template name="DIVThreeColSectionHandler">   
        <xsl:param name="currNode"/>
        <div class="oj-sm-width-1/3">
            <fieldset class="FSTcell">
            <oj-form-layout label-edge="start" user-assistance-density="compact">
                <xsl:for-each select="$currNode">
                    <xsl:variable name="pos" select="position()"/>
                    <xsl:variable name="dbt" select="../../../SUMMARY_DATA_BLK"/>
                    <xsl:variable name="dbc" select="../NAME"/>
                    <xsl:variable name="fldName" select="../NAME"/>
                    <xsl:if test="$pos mod 3 = 1">
                        <xsl:call-template name="typeHandler">
                            <xsl:with-param name="fType" select="."/>
                            <xsl:with-param name="fldNode" select=".."/>
                        </xsl:call-template>
                    </xsl:if>
                 </xsl:for-each>
                 </oj-form-layout>
            </fieldset>
        </div>
        <div class="oj-sm-width-1/3">
            <fieldset class="FSTcell">
            <oj-form-layout label-edge="start" user-assistance-density="compact">
                <xsl:for-each select="$currNode">
                    <xsl:variable name="pos" select="position()"/>
                    <xsl:variable name="dbt" select="../../../SUMMARY_DATA_BLK"/>
                    <xsl:variable name="dbc" select="../NAME"/>
                    <xsl:variable name="fldName" select="../NAME"/>
                    <xsl:if test="$pos mod 3 = 2">
                        <xsl:call-template name="typeHandler">
                            <xsl:with-param name="fType" select="."/>
                            <xsl:with-param name="fldNode" select=".."/>
                        </xsl:call-template>
                    </xsl:if>
                 </xsl:for-each>
                 </oj-form-layout>
            </fieldset>
        </div>
        <div class="oj-sm-width-1/3">
            <fieldset class="FSTcell">
            <oj-form-layout label-edge="start" user-assistance-density="compact">
                <xsl:for-each select="$currNode">
                    <xsl:variable name="pos" select="position()"/>
                    <xsl:variable name="dbt" select="../../../SUMMARY_DATA_BLK"/>
                    <xsl:variable name="dbc" select="../NAME"/>
                    <xsl:variable name="fldName" select="../NAME"/>
                    <xsl:if test="$pos mod 3 = 0">
                        <xsl:call-template name="typeHandler">
                            <xsl:with-param name="fType" select="."/>
                            <xsl:with-param name="fldNode" select=".."/>
                        </xsl:call-template>
                    </xsl:if>
                 </xsl:for-each>
                 </oj-form-layout>
            </fieldset>
        </div>
         <xsl:for-each select="SUMBLOCK[@TABPAGE = 'QUERY']/FIELD[TYPE='HIDDEN']/TYPE">
            <xsl:variable name="pos" select="position()"/>
            <xsl:variable name="dbt" select="../../../SUMMARY_DATA_BLK"/>
            <xsl:variable name="dbc" select="../NAME"/>
            <xsl:variable name="fldName" select="../NAME"/>
                <xsl:call-template name="typeHandler">
                    <xsl:with-param name="fType" select="."/>
                    <xsl:with-param name="fldNode" select=".."/>
                </xsl:call-template>
         </xsl:for-each>     
    </xsl:template>
    
	<!-- 12.1 summary performance changes new end -->
       <xsl:template name="ResultProcess"> 
            <xsl:variable name="spanCnt">
                <xsl:value-of select="count(SUMBLOCK[@TABPAGE = 'RESULT']/FIELD)"/>
            </xsl:variable>
             <xsl:call-template name="generateMEHeaderScript">
                <xsl:with-param name="multipleEntryNode" select="SUMBLOCK[@TABPAGE = 'RESULT']"/>
                
         </xsl:call-template>
            <div class="oj-sm-padding-5x-horizontal">
            <div class="oj-sm-width-full sectionPanel">
            <div class="partitionPanel oj-sm-padding-5x-horizontal">
            <fieldset>
            <oj-form-layout onclick="mainWin.fnUpdateScreenSaverInterval();" label-edge="start" user-assistance-density="compact">
             <!--Static header change start-->
            <div id="summaryDataContainer">
            <div id="Table_NavOptions" class="oj-flex-bar oj-sm-align-items-center oj-sm-margin-2x-start oj-sm-margin-4x-end" onkeydown="return handleSumkeys(event)"><!--HTML5 Changes-->
                <div class="oj-flex-bar-start">
                <!--<oj-label-value label-edge="start" label-width="{$labelWidth}px" >
            
                <oj-label  slot="label"   title="{$recordsPerPage_SummaryAudit}" for="">
                <xsl:value-of select="$recordsPerPage_SummaryAudit"/>
                
                </oj-label> 
                --><!--<SELECT CLASS="SELstd" NAME="Records" title="{$recordsPerPage_SummaryAudit}" TYPE="number" SIZE="" MAXLENGTH="3">
                   <OPTION VALUE="15">15</OPTION>
                   <OPTION VALUE="25">25</OPTION>
                   <OPTION VALUE="50">50</OPTION>
                </SELECT>--><!-- 
               <oj-select-single  slot="value" name="Records" style="width:100px" user-assistance-density="compact">
                <xsl:attribute name="value">
                    <xsl:text>[[recordsPerPage]]</xsl:text>
                </xsl:attribute>
                 <xsl:attribute name="data">
                    <xsl:text>{{recordsPerPageDataProvider}}</xsl:text>
                </xsl:attribute>
              </oj-select-single>
                
                </oj-label-value>-->
                   <h4 slot="header">
                <xsl:value-of select="$search_results"/>
             </h4>
                 <!--<oj-label-value label-edge="start" label-width="{$labelWidth}px" >
                
                <oj-label  slot="label"   title="{$lockColumns}" for="">
                <xsl:value-of select="$search_results"/>
                
                </oj-label> 
                
                </oj-label-value>-->
                <!--<oj-label-value label-edge="start" label-width="{$labelWidth}px">
                <oj-label  slot="label"   title="{$lockColumns}" for="">
                <xsl:value-of select="$lockColumns"/>
                <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                </oj-label> 
                --><!--<SELECT CLASS="SELstd" NAME="Records" title="{$recordsPerPage_SummaryAudit}" TYPE="number" SIZE="" MAXLENGTH="3">
                   <OPTION VALUE="15">15</OPTION>
                   <OPTION VALUE="25">25</OPTION>
                   <OPTION VALUE="50">50</OPTION>
                </SELECT>--><!-- 
               <oj-select-single slot="value" name="Locks" style="width:100px"  on-value-changed="[[lockColumnChangedHandler]]" tableName ="{SUMMARY_DATA_BLK}" >
                <xsl:attribute name="value">
                    <xsl:text>[[lockColumn]]</xsl:text>
                </xsl:attribute>
                 <xsl:attribute name="data">
                    <xsl:text>{{lockColumnDataProvider}}</xsl:text>
                </xsl:attribute>
              </oj-select-single>
              </oj-label-value>-->
               
                <!-- 12.1 summary performance changes new start -->
                </div>
                <div class="oj-flex-bar-end">
                  <oj-label-value label-edge="start" label-width="{$labelWidth}px" >
              
                <oj-label  slot="label"  title="{$lockColumns}" for="">
                <xsl:value-of select="$lockColumns"/>
                
                </oj-label> 
                <!--<SELECT CLASS="SELstd" NAME="Records" title="{$recordsPerPage_SummaryAudit}" TYPE="number" SIZE="" MAXLENGTH="3">
                   <OPTION VALUE="15">15</OPTION>
                   <OPTION VALUE="25">25</OPTION>
                   <OPTION VALUE="50">50</OPTION>
                </SELECT>--> 
               <oj-select-single  slot="value" user-assistance-density="compact" name="Records" style="width:100px"  on-value-changed="[[lockColumnChangedHandler]]" tableName ="{SUMMARY_DATA_BLK}" >
                <xsl:attribute name="value">
                    <xsl:text>[[lockColumn]]</xsl:text>
                </xsl:attribute>
               
                 <xsl:attribute name="data">
                    <xsl:text>{{lockColumnDataProvider}}</xsl:text>
                </xsl:attribute>
              </oj-select-single>
               
                </oj-label-value>
               
                <!--<oj-button  slot="end"  display="icons" chroming="borderless"   title="{$first}" name="navFirst" tabindex="-1" onclick="doNavigate(gcNAV_FIRST, event)" ><span slot="startIcon" class="oj-pagingcontrol-nav-first oj-pagingcontrol-nav-first-icon oj-component-icon"></span></oj-button>
                <oj-button  slot="end"  display="icons" chroming="borderless"   title="{$previous}" name="navPrev" tabindex="-1" onclick="doNavigate(gcNAV_PREVIOUS, event)" ><span slot="startIcon" class="oj-pagingcontrol-nav-previous oj-pagingcontrol-nav-previous-icon oj-component-icon"></span></oj-button>
                <div class="oj-flex oj-sm-align-items-center">
                <span id="CurPage" name="CurPage">1</span>
                <span id="ofLabel">
                   <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                   <xsl:value-of select="$of_SummaryAudit"/>
                   <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                </span>
                <span id="TotPgCnt" name="TotPgCnt">1</span>                
                </div>
                <oj-button  slot="end"  display="icons" chroming="borderless"    title="{$next}" name="navNext" tabindex="-1" onclick="doNavigate(gcNAV_NEXT, event)"><span slot="startIcon" class="oj-pagingcontrol-nav-next oj-pagingcontrol-nav-next-icon oj-component-icon"></span></oj-button>
                <oj-button  slot="end"  display="icons" chroming="borderless"    title="{$last}" name="navLast" tabindex="-1" onclick="doNavigate(gcNAV_LAST, event)"><span slot="startIcon" class="oj-pagingcontrol-nav-last oj-pagingcontrol-nav-last-icon oj-component-icon"></span></oj-button>
                <xsl:text disable-output-escaping="yes">&#160;</xsl:text><label class="LBLinv" for="goto" ><xsl:value-of select="$gotoPage_SummaryAudit"/></label>--><!-- 12.1 summary performance changes new start --><!--
                <input id="goto" name="gotopage" READONLY="true" size="1" type="text" title="{$gotoPage_SummaryAudit}"></input>--><!--HTML5 changes 24/OCT/2016 Fix for 24904397--><!--
                <oj-button title="{$gotoPage_SummaryAudit}" onclick="goToPage(event)" disabled="true" name="go"><xsl:value-of select="$gotoPage_SummaryAudit"/></oj-button>--><!--HTML5 Changes--><!--HTML5 changes 24/OCT/2016 Fix for 24904397-->
                </div>
              </div>
               
                  
            <DIV id="QryRslts" onkeydown="return handleSumkeys(event)" >
                        <!--<TABLE class="TBLone" ID="TBL_QryRslts" cellspacing="0" cellpadding="0" border="0" summary="{$summary}"  style="width:auto;" role="presentation">--><!--Static header change end --><!--HTML5 changes 2/NOV/2016 Fix for 24942076--><!--
                        <TBODY>
                            <xsl:call-template name="TRLOOP"></xsl:call-template>
                        </TBODY>
                    </TABLE>-->
                    
                      <oj-table ID="TBL_QryRslts" caption="{./LBL}" type="ME" display="grid" 
                              summary="{./LBL}" role="presentation" class="oj-sm-width-full oj-density-compact oj-sm-margin-2x-vertical"  style="max-height:350px" >
                        <xsl:attribute name="selection-mode">
                                                    <xsl:text>{"row": "multiple"}</xsl:text>
                                            </xsl:attribute>
                        <!--<xsl:attribute name="scroll-policy-options">
                                                    <xsl:text>{"fetchSize": 10}</xsl:text>
                                            </xsl:attribute>-->
                        <xsl:attribute name="columns">
                                                    <xsl:text>{{</xsl:text>
                                                      <xsl:value-of select="SUMMARY_DATA_BLK"/>
                                                    <xsl:text>columnArray}}</xsl:text>  
                                                     
                                            </xsl:attribute>
                        <xsl:attribute name="data">
                                                    <xsl:text>[[</xsl:text>
                                                    <xsl:value-of select="SUMMARY_DATA_BLK"/>
                                                    <xsl:text>dataprovider]]</xsl:text> 
                                            </xsl:attribute>
                        <xsl:attribute name="DBT">
                            <xsl:value-of select="SUMMARY_DATA_BLK"/>
                        </xsl:attribute>
                        <xsl:attribute name="pgsize">
                            <xsl:if test="count(./PGSIZE) = 0">
                                <xsl:value-of select="15"/>
                            </xsl:if>
                            <xsl:if test="count(./PGSIZE) != 0">
                                <xsl:value-of select="./PGSIZE"/>
                            </xsl:if>
                        </xsl:attribute>
                        <!--<xsl:apply-templates select="EVENT" mode="template"/>
                            <xsl:call-template name="MultipleHandler_tmp">
                                <xsl:with-param name="curr_blk" select="."/>
                                <xsl:with-param name="mWidth" select="$multipleWidth"/>
                                <xsl:with-param name="mHeight" select="$multipleHeight"/>
                                <xsl:with-pZaram name="partWidth" select="$partWidth"/>
                            </xsl:call-template>-->
                        <template_tmp slot='rowTemplate' data-oj-as='row' >
                            <tr ondblclick="fnShowDetail(event)" onkeydown="return fnHandleSumRslt(event)">
                                 <xsl:call-template name="TRLOOP"/>
								 <!--REDWOOD_35283566 Start--> 
								  <td name="sumPKs" type="hidden"  style="display:none">
                                    <OJ-INPUT-TEXT name="sumPKVals" id="sumPKVals" style="display:none;">
                                    <xsl:attribute name="value">
                                        <xsl:text>{{row.data.sumPKVals}}</xsl:text>
                                    </xsl:attribute>
                                     </OJ-INPUT-TEXT>
                                 </td>
								  <!--REDWOOD_35283566 End--> 
                            </tr>
                        </template_tmp>
                        <template slot='rowTemplate' data-oj-as='row' >
                            <tr ondblclick="fnShowDetail(event)" onkeydown=" return fnHandleSumRslt(event)">
                                 <xsl:call-template name="TRLOOP"/>
								  <!--REDWOOD_35283566 Start--> 
								  <td name="sumPKs" type="hidden"  style="display:none">
                                    <OJ-INPUT-TEXT name="sumPKVals" id="sumPKVals" style="display:none;" >
                                    <xsl:attribute name="value">
                                         <xsl:text>{{row.data.sumPKVals}}</xsl:text>
                                    </xsl:attribute>
                                     </OJ-INPUT-TEXT>
                                 </td>
								 <!--REDWOOD_35283566 End--> 
                            </tr>
                        </template>
                          <!--<oj-paging-control id="paging_{./BLOCK}"   page-size="{./PGSIZE}" slot="bottom" onclick="handleOjetMEPagination(event,{./BLOCK})">
                 <xsl:attribute name="data">
                                                    <xsl:text>[[</xsl:text>
                                                    <xsl:value-of select="./BLOCK"/>
                                                    <xsl:text>dataprovider]]</xsl:text> 
                                            </xsl:attribute>
                  </oj-paging-control>-->
                    </oj-table>
                  
            </DIV>
        <div class="oj-flex-bar oj-sm-align-items-center oj-sm-justify-content-flex-start oj-sm-margin-2x-start oj-sm-margin-4x-end" onkeydown="return handleSumkeys(event)">
            <div class="oj-flex-bar-start">
                <div class="oj-pagingcontrol-nav-input-section">               
                    <oj-label for="goto"  class="oj-sm-align-items-center">&#160;<xsl:value-of select="$page_SummaryAudit"/>&#160;</oj-label>                
                    <oj-input-text id="goto"  class="oj-sm-align-items-center" size="1" value="1" onChange="goToPage(event)" title="{$gotoPage_SummaryAudit}"></oj-input-text>
                    <oj-label id="ofLabel"  class="oj-sm-align-items-center">&#160;<xsl:value-of select="$of_SummaryAudit"/>&#160;</oj-label>
                    <oj-label id="TotPgCnt"  class="oj-sm-align-items-center" name="TotPgCnt">1</oj-label>                
                </div>                
                <div class="oj-divider-end oj-sm-margin-2x-start"></div>
            </div>               
            <oj-button  slot="end"  display="icons" chroming="borderless" title="{$first}" name="navFirst" tabindex="-1" on-oj-action="[[doNavigate.bind(null,gcNAV_FIRST, event)]]" ><span slot="startIcon" class="oj-pagingcontrol-nav-first oj-pagingcontrol-nav-first-icon oj-component-icon"></span></oj-button>
            <oj-button  slot="end"  display="icons" chroming="borderless" title="{$previous}" name="navPrev" tabindex="-1" on-oj-action="[[doNavigate.bind(null,gcNAV_PREVIOUS, event)]]" ><span slot="startIcon" class="oj-pagingcontrol-nav-previous oj-pagingcontrol-nav-previous-icon oj-component-icon"></span></oj-button>
                <div class="oj-flex oj-sm-align-items-center">
                <span id="CurPage" name="CurPage">1</span>
                </div>
            <oj-button  slot="end"  display="icons" chroming="borderless" title="{$next}" name="navNext" tabindex="-1" on-oj-action="[[doNavigate.bind(null,gcNAV_NEXT, event)]]"><span slot="startIcon" class="oj-pagingcontrol-nav-next oj-pagingcontrol-nav-next-icon oj-component-icon"></span></oj-button>
            <oj-button  slot="end"  display="icons" chroming="borderless" title="{$last}" name="navLast" tabindex="-1" on-oj-action="[[doNavigate.bind(null,gcNAV_LAST, event)]]"><span slot="startIcon" class="oj-pagingcontrol-nav-last oj-pagingcontrol-nav-last-icon oj-component-icon"></span></oj-button>
                </div>
            </div>
            </oj-form-layout>
            </fieldset>
            </div>
            </div>
            </div>
    </xsl:template>
    
    <xsl:template name="generateMEHeaderScript">
    <xsl:param name="multipleEntryNode"></xsl:param>
    <script type="text/javascript" DEFER="DEFER">
     <xsl:value-of select="$multipleEntryNode/../SUMMARY_DATA_BLK"></xsl:value-of>columnArray =screenKo.observableArray([]); 
     <xsl:value-of select="$multipleEntryNode/../SUMMARY_DATA_BLK"></xsl:value-of>fieldObj= screenKo.observableArray([]); 
    
     multipleEntryFieldList['<xsl:value-of select="$multipleEntryNode/../SUMMARY_DATA_BLK"></xsl:value-of>'] = {};
    <xsl:for-each select="$multipleEntryNode/FIELD">
      <xsl:variable name="colName" select="NAME"/>
      <xsl:variable name="maxLength" select="number(MAXLENGTH)"/>
      <xsl:if test="TYPE != 'DATE'">
        var obj = {
          'headerText': "<xsl:value-of select="LBL"/>",
          'field': "<xsl:value-of select="NAME"/>",
           'resizable': "enabled"
        };
      </xsl:if>
      <xsl:if test="TYPE = 'DATE'">
        var obj = { 'headerText':  "<xsl:value-of select="LBL"/>", 'field': "<xsl:value-of select="NAME"/>" , 'minWidth': "10%"};
      </xsl:if>
      <xsl:if test="TYPE = 'HIDDEN'">
        obj = { 'headerText':  "<xsl:value-of select="LBL"/>", 'field': "<xsl:value-of select="NAME"/>" ,'headerStyle':'display:none'};
      </xsl:if>
      <!-- Remove white spaces from data -->
      <xsl:value-of select="$multipleEntryNode/../SUMMARY_DATA_BLK"></xsl:value-of>columnArray.push(obj);
      multipleEntryFieldList['<xsl:value-of select="$multipleEntryNode/../SUMMARY_DATA_BLK"></xsl:value-of>']['<xsl:value-of select="NAME"/>'] = null;
      <xsl:if test="count(VALUE) > 0 and VALUE != ''">
        <xsl:variable name="trimmedValue" select="normalize-space(VALUE)"/>
        multipleEntryFieldList['<xsl:value-of select="$multipleEntryNode/../SUMMARY_DATA_BLK"></xsl:value-of>']['<xsl:value-of select="NAME"/>'] = '<xsl:value-of select="$trimmedValue"/>';
      </xsl:if>
    </xsl:for-each>
    multipleEntryFieldList['<xsl:value-of select="$multipleEntryNode/../SUMMARY_DATA_BLK"></xsl:value-of>']['readOnly'] = true;
    meArrayForAddDelete['<xsl:value-of select="$multipleEntryNode/../SUMMARY_DATA_BLK"></xsl:value-of>'] = screenKo.observableArray([]);
    
    <xsl:value-of select="$multipleEntryNode/../SUMMARY_DATA_BLK"></xsl:value-of>dataprovider=screenKo.observable( new tempArrayDataProvider( meArrayForAddDelete['<xsl:value-of select="$multipleEntryNode/../SUMMARY_DATA_BLK"></xsl:value-of>']));
       
    </script>
</xsl:template>
  

       <xsl:template name="ResultProcess_old"> 
            <xsl:variable name="spanCnt">
                <xsl:value-of select="count(SUMBLOCK[@TABPAGE = 'RESULT']/FIELD)"/>
            </xsl:variable>
             <!--Static header change start-->
            <div id="Table_NavOptions" class="DIVcaption1" style="width:100%" onkeydown="return handleSumkeys(event)"><!--HTML5 Changes-->
                <xsl:text disable-output-escaping="yes">&#160;</xsl:text> <!-- 12.1 summary performance changes new start -->
                <label class="LBLnw" title="{$recordsPerPage_SummaryAudit}" for="">
                <xsl:value-of select="$recordsPerPage_SummaryAudit"/>
                <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                </label> 
                <SELECT CLASS="SELstd" NAME="Records" title="{$recordsPerPage_SummaryAudit}" TYPE="number" SIZE="" MAXLENGTH="3">
                   <OPTION VALUE="15">15</OPTION>
                   <OPTION VALUE="25">25</OPTION>
                   <OPTION VALUE="50">50</OPTION>
                </SELECT> 
                <xsl:text disable-output-escaping="yes">&#160;</xsl:text> <!-- 12.1 summary performance changes new start -->
                <button class="BTNimgD" title="{$first}" name="navFirst" tabindex="-1" onclick="doNavigate(gcNAV_FIRST, event)" ><span tabindex="-1" class="ICOfirst"></span></button>
                <button class="BTNimgD" title="{$previous}" name="navPrev" tabindex="-1" onclick="doNavigate(gcNAV_PREVIOUS, event)" ><span tabindex="-1" class="ICOprevious"></span></button>
                <span id="CurPage" name="CurPage">1</span>
                <span id="ofLabel">
                   <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                   <xsl:value-of select="$of_SummaryAudit"/>
                   <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                </span>
                <span id="TotPgCnt" name="TotPgCnt">1</span> 
                <button class="BTNimgD"  title="{$next}" name="navNext" tabindex="-1" onclick="doNavigate(gcNAV_NEXT, event)"><span tabindex="-1" class="ICOnext"></span></button>
                <button class="BTNimgD"  title="{$last}" name="navLast" tabindex="-1" onclick="doNavigate(gcNAV_LAST, event)"><span tabindex="-1" class="ICOlast"></span></button>
                <xsl:text disable-output-escaping="yes">&#160;</xsl:text><label class="LBLinv" for="goto" ><xsl:value-of select="$gotoPage_SummaryAudit"/></label><!-- 12.1 summary performance changes new start -->
                <input class="TXTstd" id="goto" name="gotopage" READONLY="true" size="1" type="text" title="{$gotoPage_SummaryAudit}"></input><!--HTML5 changes 24/OCT/2016 Fix for 24904397-->
                <button class="BTNtextD"  title="{$gotoPage_SummaryAudit}" onclick="goToPage(event)" disabled="true" name="go"><xsl:value-of select="$gotoPage_SummaryAudit"/></button><!--HTML5 Changes--><!--HTML5 changes 24/OCT/2016 Fix for 24904397-->
               <xsl:text disable-output-escaping="yes">&#160;</xsl:text> <label class="LBLnw" for="" ><xsl:value-of select="$lockColumns"/></label><xsl:text disable-output-escaping="yes">&#160;</xsl:text> <!--12.1 lock column changes-->                <!-- 12.1 summary performance changes new start -->
                <select class="SELstd" title="{$lockColumns}" NAME="Locks" TYPE="number" SIZE="" MAXLENGTH="3" onchange="fnFreezeColumns(this.value)"><!--HTML5 changes 24/OCT/2016 Fix for 24904397-->
                    <xsl:if test="count(SUMBLOCK[@TABPAGE = 'RESULT']/FIELD[TYPE!='HIDDEN'])&lt;5">
                        <xsl:attribute name="disabled">disabled</xsl:attribute>
                    </xsl:if>                    
                    <option VALUE="0" SELECTED ="SELECTED" DEFAULT= "0">0</option>
                    <option VALUE="1">1</option>
                    <option VALUE="2">2</option>                                    
                    <option VALUE="3">3</option>
                    <option VALUE="4">4</option>
					<!--30620131-->
					<option VALUE="5">5</option>
					<option VALUE="6">6</option>
					<option VALUE="7">7</option>
					<option VALUE="8">8</option>
					<!--30620131-->
                </select>
              </div>
              <div id="rsltsConatiner" style="width:100%" onkeydown="return handleSumkeys(event)"><!--HTML5 Changes-->
                  <div id="sumHeaderContainer" style="BACKGROUND: #f3f1ec;">
                  <div id="QryRsltsHeaderFreeze" class="DIVTblHeader">
                        <TABLE class="TBLone" ID="TBL_QryRsltsHeaderFreeze" cellspacing="0" cellpadding="0" border="0" role="presentation">
                        <TBODY>
                                <TR onkeydown="return fnHandleSumTH(event)">
                                    <!--<xsl:if test="TYPE = 'B' or TYPE = 'U'">-->
                                        <td  class="TBLoneTH1" scope="col" nowrap="nowrap"><div><!--Static header change-->
                                            <label class="LBLChkRadSel NewChkbox" for="RSLT_CHKBOXFreeze"><span class="LBLinv"><xsl:value-of select="$select_all_rows"/></span><INPUT id="RSLT_CHKBOXFreeze" TYPE="CHECKBOX" NAME="RSLT_CHKBOX" onclick="fnCheckUncheckAll()" disabled="true" title="{$select_all_rows}"/><div class="DIVChkRadSel"><span></span></div><!--HTML5 changes 24/OCT/2016--></label><!--HTML5 Changes-->
                                        </div></td><!--Static header change-->
                                    <!--</xsl:if>-->
                                    
                                    <xsl:for-each select="SUMBLOCK[@TABPAGE = 'RESULT']/FIELD">
									<xsl:if test="position() &lt;= 8"><!--30620131 changed to 8-->
                                        <xsl:variable name="dbt" select="../../SUMMARY_DATA_BLK"/>
                                        <xsl:variable name="dbc" select="NAME"/>
                                        <xsl:variable name="fldName" select="NAME"/>
                                                <!-- changes for summary fields of type hidden-->
												<xsl:variable name="fldNode" select="."/>  
                                                <td class="TBLoneTH" TYPE="{$fldNode/TYPE}"  name="{$fldName}"   nowrap="nowrap" scope="col" order="asc">
													<!-- changes for summary fields of type hidden-->
													<xsl:if test="TYPE = 'HIDDEN'">
														<xsl:attribute name="class">TDnone</xsl:attribute>
													</xsl:if>
                                                    <xsl:attribute name="ID"><xsl:value-of select="concat('THFrz_',$dbt,'__',$dbc)"/></xsl:attribute>
                                                    <xsl:attribute name="NAME"><xsl:value-of select="$fldName"/></xsl:attribute>
                                                    <xsl:attribute name="DBT"><xsl:value-of select="$dbt"/></xsl:attribute>
                                                    <xsl:attribute name="DBC"><xsl:value-of select="$dbc"/></xsl:attribute>
                                                    <xsl:attribute name="DTYPE"><xsl:value-of select="$fldNode/DTYPE"/></xsl:attribute>
                                                    <xsl:attribute name="title"><xsl:value-of select="$fldNode/LBL"/></xsl:attribute>
                                                    <xsl:if test="normalize-space($fldNode/TYPE) = 'AMOUNT'">
                                                        <xsl:attribute name="RELATED_FIELD">
                                                            <xsl:value-of select="$fldNode/RELATED_FIELD"/>
                                                        </xsl:attribute>
                                                    </xsl:if>
                                                    <xsl:if test="$fldNode/TYPE = 'CHECKBOX'">
                                                        <xsl:if test="count($fldNode/CUSTOM) &gt; 0">
                                                            <xsl:attribute name="ON"><xsl:value-of select="$fldNode/CUSTOM/ON"/></xsl:attribute>
                                                            <xsl:attribute name="OFF"><xsl:value-of select="$fldNode/CUSTOM/OFF"/></xsl:attribute>
                                                        </xsl:if>
                                                        <xsl:if test="count($fldNode/CUSTOM) = 0">
                                                            <xsl:attribute name="ON"><xsl:text>Y</xsl:text></xsl:attribute>
                                                            <xsl:attribute name="OFF"><xsl:text>N</xsl:text></xsl:attribute>
                                                        </xsl:if>
                                                    </xsl:if>
                                                    <!--Number Format changes starts-->
                                                    
                                                    <xsl:if test="$fldNode/TYPE = 'TEXT' and $fldNode/DTYPE = 'NUMBER'">
                                                        <xsl:if test="count($fldNode/FORMAT_REQD) &gt; 0 and $fldNode/FORMAT_REQD = 'Y'">
                                                            <xsl:attribute name="FORMAT_REQD">  
                                                                <xsl:value-of select="$fldNode/FORMAT_REQD"/>
                                                            </xsl:attribute>
                                                        <xsl:if test="count($fldNode/MAX_DECIMALS) &gt; 0">    
                                                            <xsl:attribute name="MAX_DECIMALS">
                                                                <xsl:value-of select="$fldNode/MAX_DECIMALS"/>
                                                            </xsl:attribute>
                                                        </xsl:if>    
                                                        </xsl:if> 
                                                     </xsl:if>
                                                    <!--Number Format changes ends-->
<div><!--Static header change-->                                                    <A class="Astd"  href="#" onclick='fnSortRecs(event)' order="ASC" onkeydown="return fnhandleSubScrBtn(event)">
                                                        <SPAN class="SPNup hide">
                                                            <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                                                            <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                                                            <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                                                            <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                                                        </SPAN>
                                                        <xsl:value-of select="$fldNode/LBL"/>
                                                    </A>
                                                </div></td><!--Static header change-->
								</xsl:if>
                                    </xsl:for-each>
								
                                </TR>
							<!--Static header change start--></TBODY>
                      </TABLE>
					   </div>                   
				   <div id="QryRsltsHeader" class="DIVtblbox1 DIVTblHeader" onkeydown="return handleSumkeys(event)" onScroll="fnSyncScrollHeader(this)"> <!--Fix for 21824240 -->
                      <TABLE class="TBLone" ID="TBL_QryRsltsHeader" cellspacing="0" cellpadding="0" border="0" summary="{$summary}Header" style="width:auto;" role="presentation">
                        <colgroup span="{$spanCnt}"></colgroup>
                        <TBODY> <!-- static header change end-->
                                <TR onkeydown="return fnHandleSumTH(event)">
                                    <!--<xsl:if test="TYPE = 'B' or TYPE = 'U'">-->
                                        <td  class="TBLoneTH1" scope="col" nowrap="nowrap"><div><!--Static header change-->
                                            <label class="LBLChkRadSel NewChkbox" for="RSLT_CHKBOX"><span class="LBLinv"><xsl:value-of select="$select_all_rows"/></span><INPUT id="RSLT_CHKBOX" TYPE="CHECKBOX" NAME="RSLT_CHKBOX" onclick="fnCheckUncheckAll()" disabled="true" title="{$select_all_rows}"/><div class="DIVChkRadSel"><span></span></div><!--HTML5 changes 24/OCT/2016--></label><!--HTML5 Changes-->
                                        </div></td><!--Static header change-->
                                    <!--</xsl:if>-->
                                    <xsl:for-each select="SUMBLOCK[@TABPAGE = 'RESULT']/FIELD">
                                        <xsl:variable name="dbt" select="../../SUMMARY_DATA_BLK"/>
                                        <xsl:variable name="dbc" select="NAME"/>
                                        <xsl:variable name="fldName" select="NAME"/>
                                                <xsl:variable name="fldNode" select="."/>                                                
                                                <td class="TBLoneTH" TYPE="{$fldNode/TYPE}"  name="{$fldName}" tabIndex = "0" nowrap="nowrap" scope="col" order="asc">
                                                    <xsl:attribute name="ID"><xsl:value-of select="concat('TH_',$dbt,'__',$dbc)"/></xsl:attribute>
                                                    <xsl:attribute name="NAME"><xsl:value-of select="$fldName"/></xsl:attribute>
                                                    <xsl:attribute name="DBT"><xsl:value-of select="$dbt"/></xsl:attribute>
                                                    <xsl:attribute name="DBC"><xsl:value-of select="$dbc"/></xsl:attribute>
                                                    <xsl:attribute name="DTYPE"><xsl:value-of select="$fldNode/DTYPE"/></xsl:attribute>
                                                    <xsl:attribute name="title"><xsl:value-of select="$fldNode/LBL"/></xsl:attribute>
                                                    <xsl:if test="$fldNode/TYPE = 'HIDDEN'"> <!--20911166 -->
                                                                <xsl:attribute name="class">TDnone</xsl:attribute>
                                                    </xsl:if>
                                                    <xsl:if test="normalize-space($fldNode/TYPE) = 'AMOUNT'">
                                                        <xsl:attribute name="RELATED_FIELD">
                                                            <xsl:value-of select="$fldNode/RELATED_FIELD"/>
                                                        </xsl:attribute>
                                                    </xsl:if>
                                                    <xsl:if test="$fldNode/TYPE = 'CHECKBOX'">
                                                        <xsl:if test="count($fldNode/CUSTOM) &gt; 0">
                                                            <xsl:attribute name="ON"><xsl:value-of select="$fldNode/CUSTOM/ON"/></xsl:attribute>
                                                            <xsl:attribute name="OFF"><xsl:value-of select="$fldNode/CUSTOM/OFF"/></xsl:attribute>
                                                        </xsl:if>
                                                        <xsl:if test="count($fldNode/CUSTOM) = 0">
                                                            <xsl:attribute name="ON"><xsl:text>Y</xsl:text></xsl:attribute>
                                                            <xsl:attribute name="OFF"><xsl:text>N</xsl:text></xsl:attribute>
                                                        </xsl:if>
                                                    </xsl:if><div><!--Static header change-->
                                                    <A class="Astd"  href="#" onclick='fnSortRecs(event)' order="ASC" onkeydown="return fnhandleSubScrBtn(event)">
                                                        <SPAN class="SPNup hide">
                                                            <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                                                            <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                                                            <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                                                            <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                                                        </SPAN>
                                                        <xsl:value-of select="$fldNode/LBL"/>
                                                    </A>
                                                </div></td><!--Static header change-->

                                    </xsl:for-each>
                                    <td tabindex="0" class="TBLoneTH" scope="col" title="{$end_table}"><div></div></td><!-- static header change -->
                                </TR>
                            <!--Static header change start--></TBODY>
                      </TABLE>
                   </div>               
                   </div>
				   <div id="bodyContainer">
                   <DIV id="QryRsltsFreeze" style="overflow:hidden;">
                      <TABLE class="TBLone" ID="TBL_QryRsltsFreeze" cellspacing="0" cellpadding="0" border="0" role="presentation"><!--Static header change end -->
                        <TBODY>
                            <xsl:call-template name="TRLOOPFREEZE"></xsl:call-template>
                        </TBODY>
                    </TABLE>
                   </DIV>
                   <DIV id="QryRslts" class="DIVtblbox1" style="overflow:auto;" onkeydown="return handleSumkeys(event)" onScroll="fnSyncScroll(this)">
                        <TABLE class="TBLone" ID="TBL_QryRslts" cellspacing="0" cellpadding="0" border="0" summary="{$summary}"  style="width:auto;" role="presentation"><!--Static header change end --><!--HTML5 changes 2/NOV/2016 Fix for 24942076-->
                        <TBODY>
                            <xsl:call-template name="TRLOOP"></xsl:call-template>
                        </TBODY>
                    </TABLE>
                </DIV>
                </div></div>
    </xsl:template>
    
    
    <xsl:template name="TRLOOP">
     <xsl:for-each select="SUMBLOCK[@TABPAGE = 'RESULT']/FIELD">
                        <xsl:variable name="fldName" select="NAME"/>
                        <xsl:variable name="fldType" select="TYPE"/>
                         <xsl:if test="TYPE = 'HIDDEN'">
                               <TD  name="{$fldName}" type="{$fldType}"  style="display:none">
                         <xsl:call-template name="typeHandlerResultProcess">
                         <xsl:with-param name="fType" select="TYPE"/>
                         <xsl:with-param name="fldNode" select="."/>
                         </xsl:call-template>
                   </TD>
                         </xsl:if>
                            <xsl:if test="TYPE != 'HIDDEN'">
                              <TD  name="{$fldName}" type="{$fldType}" onkeydown="fnShowDetail_key(event); return handleSumkeys(event)">
                         <xsl:call-template name="typeHandlerResultProcess">
                         <xsl:with-param name="fType" select="TYPE"/>
                         <xsl:with-param name="fldNode" select="."/>
                         </xsl:call-template>
                   </TD>
                   </xsl:if>
                   </xsl:for-each><!--
           
                    <xsl:for-each select="SUMBLOCK[@TABPAGE = 'RESULT']/FIELD">
                        <xsl:variable name="fldName" select="NAME"/>
                        <xsl:variable name="fldType" select="TYPE"/>
                      <xsl:if test="TYPE = 'AMOUNT' or (DTYPE = 'NUMBER' and TYPE != 'HIDDEN')">--><!--changes for summary fields of type hidden--><!--
                            <TD  name="{$fldName}" type="{$fldType}"  ><div>--><!--Static header change--><!--
                                <a alt="{$fldName}" href="#;return false"  tabindex ='-1'>
                                    <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                                    <oj-bind-text  >
                                        <xsl:attribute name="value">
                                         <xsl:text>{{row.data.</xsl:text>
                                            <xsl:value-of select="$fldName"/>
                                        <xsl:text>}}</xsl:text> 
                                        </xsl:attribute>
                                    </oj-bind-text>
                                </a>     
                            </div></TD>--><!--Static header change--><!--
                        </xsl:if>
						--><!--changes for summary fields of type hidden--><!--
                        <xsl:if test="TYPE = 'HIDDEN'">
							<TD  name="{$fldName}" type="{$fldType}">
								<a   href="#;return false" tabindex ='-1'>
									<xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                                                                          <oj-bind-text  >
                                                                                <xsl:attribute name="value">
                                                                                 <xsl:text>{{row.data.</xsl:text>
                                                                                    <xsl:value-of select="$fldName"/>
                                                                                <xsl:text>}}</xsl:text> 
                                                                                </xsl:attribute>
                                                                            </oj-bind-text>
                                </a>
                            </TD>
                        </xsl:if>
						--><!--changes for summary fields of type hidden--><!--
                        <xsl:if test="TYPE != 'AMOUNT' and DTYPE != 'NUMBER' and TYPE != 'HIDDEN'">
                            <TD name="{$fldName}" type="{$fldType}"  >
                                <xsl:if test="TYPE = 'RADIO' or TYPE = 'SELECT' or TYPE = 'CHECKBOX'">
                                    <xsl:attribute name="type">
                                        <xsl:text>ABV</xsl:text>
                                    </xsl:attribute>
                                </xsl:if>
                                <div><a alt="{$fldName}" href="#;return false"  tabindex ='-1'>--><!--Static header change--><!--
                                    <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                                     <oj-bind-text  >
                                        <xsl:attribute name="value">
                                         <xsl:text>{{row.data.</xsl:text>
                                            <xsl:value-of select="$fldName"/>
                                        <xsl:text>}}</xsl:text> 
                                        </xsl:attribute>
                                    </oj-bind-text>
                                </a>
                             </div></TD>--><!--Static header change--><!--
                        </xsl:if>
                    </xsl:for-each>
					 

  --></xsl:template>
  <xsl:template name="TRLOOP_OLD">
    
        <xsl:param name="count" select="0"/>
        <xsl:if test="$count &lt; 15">
            <xsl:variable name="modval" select="($count mod 2)" />    
            <xsl:if test="$modval = 0">            
               <!-- <TR  class="TBLoneTR" onblur="this.className='TBLoneTR'" onmouseover="this.className='TBLoneTRhover'" onfocus="this.className='TBLoneTRhover'" onmouseout="this.className='TBLoneTR'" ondblclick="fnShowDetail({$count}, event)" onClick="fnSelCheckBox(event, {$count})" oncontextmenu="fnShowContextMenu()" onkeydown=" return fnHandleSumRslt({$count}, event)">-->
			   <TR  class="TBLoneTR" onblur="fnResetClass({$count})" onmouseover="fnHighlightRow({$count})" onfocus="fnHighlightRow({$count})" onmouseout="fnResetClass({$count})" ondblclick="fnShowDetail({$count}, event)" ontouchstart="fnShowDetailDevice({$count}, event)" onClick="fnSelCheckBox(event, {$count})" oncontextmenu="fnShowContextMenu()" onkeydown=" return fnHandleSumRslt({$count}, event)"><!--HTML5 Changes-->
                    <!--<xsl:if test="TYPE = 'B' or TYPE = 'U'">-->
                      <!--  <TD class="TBLoneTD1" width="10px">-->
                      <TD class="TBLoneTD1" scope="row"><div><!--Static header change-->
                            <label class="LBLChkRadSel NewChkbox" for="RSLT_CHKBOX{$count}"><span class="LBLinv"><xsl:value-of select="concat($select_row,$count)"/></span><INPUT type="checkbox" name="RSLT_CHKBOX" id="RSLT_CHKBOX{$count}" onclick="fnToggleChkBox(this, {$count})" disabled="true" title="{concat($select_row,$count)}"/><div class="DIVChkRadSel"><span></span></div><!--HTML5 changes 24/OCT/2016--></label><!--Fix for 21300673--><!--HTML5 Changes-->
                        </div></TD><!--Static header change-->
                    <!--</xsl:if>-->
                    <xsl:for-each select="SUMBLOCK[@TABPAGE = 'RESULT']/FIELD">
                        <xsl:variable name="fldName" select="NAME"/>
                        <xsl:variable name="fldType" select="TYPE"/>
						  <xsl:if test="TYPE = 'AMOUNT' or (DTYPE = 'NUMBER' and TYPE != 'HIDDEN')"><!--changes for summary fields of type hidden-->
                            <TD class="numeric" name="{$fldName}" type="{$fldType}" onkeydown='fnShowDetail_key({$count}, event)'><div><!--Static header change-->
                                <a alt="{$fldName}" href="#;return false" class='Astd' tabindex ='-1'>
                                    <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                                </a>
                            </div></TD><!--Static header change-->
                        </xsl:if>
						<!--changes for summary fields of type hidden-->
                        <xsl:if test="TYPE = 'HIDDEN'">
							<TD class="TDnone" name="{$fldName}" type="{$fldType}">
								<a class='Astd' href="#;return false" tabindex ='-1'>
									<xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                                </a>
                            </TD>
                        </xsl:if>
						<!--changes for summary fields of type hidden-->
                        <xsl:if test="TYPE != 'AMOUNT' and DTYPE != 'NUMBER' and TYPE != 'HIDDEN'">
                            <TD name="{$fldName}" type="{$fldType}" onkeydown='fnShowDetail_key({$count}, event)'>
                                <xsl:if test="TYPE = 'RADIO' or TYPE = 'SELECT' or TYPE = 'CHECKBOX'">
                                    <xsl:attribute name="type">
                                        <xsl:text>ABV</xsl:text>
                                    </xsl:attribute>
                                </xsl:if>
                                <div><a alt="{$fldName}" href="#;return false" class='Astd' tabindex ='-1'><!--Static header change-->
                                    <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                                </a>
                             </div></TD><!--Static header change-->
                        </xsl:if>
                    </xsl:for-each>
					<TD><div></div></TD><!--static header change-->
                </TR>
            </xsl:if>
            <xsl:if test="$modval = 1">           
                <!--<TR class="TBLoneTRalt" onblur="this.className='TBLoneTRalt'" onmouseover="this.className='TBLoneTRhover'" onfocus="this.className='TBLoneTRhover'" onmouseout="this.className='TBLoneTRalt'" ondblclick="fnShowDetail({$count}, event)" onClick="fnSelCheckBox(event, {$count})" oncontextmenu="fnShowContextMenu(event)" onkeydown="return fnHandleSumRslt({$count}, event)">-->
				<TR class="TBLoneTRalt" onblur="fnResetClass({$count})" onmouseover="fnHighlightRow({$count})" onfocus="fnHighlightRow({$count})" onmouseout="fnResetClass({$count})" ondblclick="fnShowDetail({$count}, event)" ontouchstart="fnShowDetailDevice({$count}, event)" onClick="fnSelCheckBox(event, {$count})" oncontextmenu="fnShowContextMenu(event)" onkeydown="return fnHandleSumRslt({$count}, event)"><!--HTML5 Changes-->
                    <!--<xsl:if test="TYPE = 'B' or TYPE = 'U'">-->
                        <!--<TD class="TBLoneTD1" width="10px">-->
                        <TD class="TBLoneTD1" scope="row" ><div><!--Static header change-->
                            <label class="LBLChkRadSel NewChkbox" for="RSLT_CHKBOX{$count}"><span class="LBLinv"><xsl:value-of select="concat($select_row,$count)"/></span><INPUT type="checkbox" name="RSLT_CHKBOX" id="RSLT_CHKBOX{$count}" onclick="fnToggleChkBox(this, {$count})" disabled="true" title="{concat($select_row,$count)}"/><div class="DIVChkRadSel"><span></span></div><!--HTML5 changes 24/OCT/2016--></label><!--Fix for 21300673--><!--HTML5 Changes-->
                        </div></TD><!--Static header change-->
                    <!--</xsl:if>-->
                    <xsl:for-each select="SUMBLOCK[@TABPAGE = 'RESULT']/FIELD">
                        <xsl:variable name="fldName" select="NAME"/>
                        <xsl:variable name="fldType" select="TYPE"/>
                         <xsl:if test="TYPE = 'AMOUNT' or (DTYPE = 'NUMBER' and TYPE != 'HIDDEN')"><!--changes for summary fields of type hidden-->
                            <TD class="numeric" name="{$fldName}" type="{$fldType}" onkeydown='fnShowDetail_key({$count}, event)'><div><!--Static header change-->
                                <a alt="{$fldName}" href="#;return false" class="Astd" tabindex ='-1'>
                                    <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                                </a>
                            </div></TD><!--Static header change-->
                        </xsl:if>
						<!--changes for summary fields of type hidden-->
                        <xsl:if test="TYPE = 'HIDDEN'">
							<TD class="TDnone" name="{$fldName}" type="{$fldType}">
								<a class='Astd' href="#;return false" tabindex ='-1'>
									<xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                                </a>
                            </TD>
                        </xsl:if>
						<!--changes for summary fields of type hidden-->
                        <xsl:if test="TYPE != 'AMOUNT' and DTYPE != 'NUMBER' and TYPE != 'HIDDEN'">
                            <TD name="{$fldName}" type="{$fldType}" onkeydown='fnShowDetail_key({$count}, event)'>
                                <xsl:if test="TYPE = 'RADIO' or TYPE = 'SELECT' or TYPE = 'CHECKBOX'">
                                    <xsl:attribute name="type">
                                        <xsl:text>ABV</xsl:text>
                                    </xsl:attribute>
                                </xsl:if>
                                <div><a alt="{$fldName}" href="#;return false" class="Astd" tabindex ='-1'><!--Static header change-->
                                    <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                                </a>
                            </div></TD><!--Static header change-->
                        </xsl:if>
                    </xsl:for-each>
					<TD><div></div></TD><!--static header change-->
                </TR>                
            </xsl:if>
    
            <xsl:call-template name="TRLOOP">
                <xsl:with-param name="count" select="$count + 1"/>
            </xsl:call-template>
        </xsl:if>
  </xsl:template>
  
  <xsl:template name="TRLOOPFREEZE">    
        <xsl:param name="count" select="0"/>
        <xsl:if test="$count &lt; 15">
            <xsl:variable name="modval" select="($count mod 2)" />    
            <xsl:if test="$modval = 0">            
                
                <TR  class="TBLoneTR" onblur="fnResetClass({$count})" onmouseover="fnHighlightRow({$count})" onfocus="fnHighlightRow({$count})" onmouseout="fnResetClass({$count})" ondblclick="fnShowDetail({$count}, event)" ontouchstart="fnShowDetailDevice({$count}, event)" onClick="fnSelCheckBox(event, {$count})" oncontextmenu="fnShowContextMenu()" onkeydown=" return fnHandleSumRslt({$count}, event)"><!--HTML5 Changes-->
                    <!--<xsl:if test="TYPE = 'B' or TYPE = 'U'">-->
                      <!--  <TD class="TBLoneTD1" width="10px">-->
                      <TD class="TBLoneTD1" scope="row"><div><!--Static header change-->
                            <label class="LBLChkRadSel NewChkbox" for="RSLT_CHKBOXFrz{$count}"><span class="LBLinv"><xsl:value-of select="concat($select_row,$count)"/></span><INPUT type="checkbox" name="RSLT_CHKBOXFrz" id="RSLT_CHKBOXFrz{$count}" onclick="fnToggleChkBox(this, {$count})" disabled="true" title="{concat($select_row,$count)}"/><div class="DIVChkRadSel"><span></span></div><!--HTML5 changes 24/OCT/2016--></label><!--Fix for 21300673--><!--HTML5 Changes-->
                        </div></TD><!--Static header change-->
                    <!--</xsl:if>-->
                    <xsl:for-each select="SUMBLOCK[@TABPAGE = 'RESULT']/FIELD">
                      <xsl:if test="position() &lt;= 8"><!--30620131 changed to 8-->
                        <xsl:variable name="fldName" select="NAME"/>
                        <xsl:variable name="fldType" select="TYPE"/>
                        <xsl:if test="TYPE = 'AMOUNT' or DTYPE = 'NUMBER'">
                            <TD class="numeric" name="{$fldName}" type="{$fldType}" onkeydown='fnShowDetail_key({$count}, event)'><div><!--Static header change-->
                                <a alt="{$fldName}" href="#;return false" class='Astd' tabindex ='-1'>
                                    <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                                </a>
                            </div></TD><!--Static header change-->
                        </xsl:if>
                        <xsl:if test="count(TYPE) = 0 or (count(TYPE) &gt; 0 and TYPE != 'AMOUNT' and DTYPE != 'NUMBER')">
                            <TD name="{$fldName}" type="{$fldType}" onkeydown='fnShowDetail_key({$count}, event)'>
                                <xsl:if test="TYPE = 'RADIO' or TYPE = 'SELECT' or TYPE = 'CHECKBOX'">
                                    <xsl:attribute name="type">
                                        <xsl:text>ABV</xsl:text>
                                    </xsl:attribute>
                                </xsl:if>
                                <div><a alt="{$fldName}" href="#;return false" class='Astd' tabindex ='-1'><!--Static header change-->
                                    <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                                </a>
                            </div></TD><!--Static header change-->
                        </xsl:if>
                        </xsl:if>
                    </xsl:for-each>
                    <!--<TD width="99%"><div></div></TD>--><!--static header change-->
                </TR>
            </xsl:if>
            <xsl:if test="$modval = 1">           
                <!--<TR class="TBLoneTRalt" onblur="this.className='TBLoneTRalt'" onmouseover="this.className='TBLoneTRhover'" onfocus="this.className='TBLoneTRhover'" onmouseout="this.className='TBLoneTRalt'" ondblclick="fnShowDetail({$count}, event)" onClick="fnSelCheckBox(event, {$count})" oncontextmenu="fnShowContextMenu(event)" onkeydown="return fnHandleSumRslt({$count}, event)">-->
                <TR class="TBLoneTRalt" onblur="fnResetClass({$count})" onmouseover="fnHighlightRow({$count})" onfocus="fnHighlightRow({$count})" onmouseout="fnResetClass({$count})" ondblclick="fnShowDetail({$count}, event)" ontouchstart="fnShowDetailDevice({$count}, event)" onClick="fnSelCheckBox(event, {$count})" oncontextmenu="fnShowContextMenu(event)" onkeydown="return fnHandleSumRslt({$count}, event)"><!--HTML5 Changes-->
                    <!--<xsl:if test="TYPE = 'B' or TYPE = 'U'">-->
                        <!--<TD class="TBLoneTD1" width="10px">-->
                        <TD class="TBLoneTD1" scope="row" ><div><!--Static header change-->
                            <label class="LBLChkRadSel NewChkbox" for="RSLT_CHKBOXFrz{$count}"><span class="LBLinv"><xsl:value-of select="concat($select_row,$count)"/></span><INPUT type="checkbox" name="RSLT_CHKBOXFrz" id="RSLT_CHKBOXFrz{$count}" onclick="fnToggleChkBox(this, {$count})" disabled="true" title="{concat($select_row,$count)}"/><div class="DIVChkRadSel"><span></span></div><!--HTML5 changes 24/OCT/2016--></label><!--Fix for 21300673--><!--HTML5 Changes-->
                        </div></TD><!--Static header change-->
                    <!--</xsl:if>-->
                    <xsl:for-each select="SUMBLOCK[@TABPAGE = 'RESULT']/FIELD">
                    <xsl:if test="position() &lt;= 8"><!--30620131 changed to 8-->
                        <xsl:variable name="fldName" select="NAME"/>
                        <xsl:variable name="fldType" select="TYPE"/>
                        <xsl:if test="TYPE = 'AMOUNT' or DTYPE = 'NUMBER'">
                            <TD class="numeric" name="{$fldName}" type="{$fldType}" onkeydown='fnShowDetail_key({$count}, event)'><div><!--Static header change-->
                                <a alt="{$fldName}" href="#;return false" class="Astd" tabindex ='-1'>
                                    <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                                </a>
                            </div></TD><!--Static header change-->
                        </xsl:if>
                        <xsl:if test="count(TYPE) = 0 or (count(TYPE) &gt; 0 and TYPE != 'AMOUNT' and DTYPE != 'NUMBER')">
                            <TD name="{$fldName}" type="{$fldType}" onkeydown='fnShowDetail_key({$count}, event)'>
                                <xsl:if test="TYPE = 'RADIO' or TYPE = 'SELECT' or TYPE = 'CHECKBOX'">
                                    <xsl:attribute name="type">
                                        <xsl:text>ABV</xsl:text>
                                    </xsl:attribute>
                                </xsl:if>
                                <div><a alt="{$fldName}" href="#;return false" class="Astd" tabindex ='-1'><!--Static header change-->
                                    <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                                </a>
                            </div></TD><!--Static header change-->
                        </xsl:if>
                        </xsl:if>
                    </xsl:for-each>
                    <!--<TD width="99%"><div></div></TD>--><!--static header change-->
                </TR>                
            </xsl:if>
    
            <xsl:call-template name="TRLOOPFREEZE">
                <xsl:with-param name="count" select="$count + 1"/>
            </xsl:call-template>
        </xsl:if>
  </xsl:template>
  
  
  <xsl:template name="generateScript">
    <script type="text/javascript" DEFER="DEFER">
        summaryScreen = 'Y';
        gscrPos = 'template';
        g_scrType = 'M';
        scrollReqd = 'N'; <!-- 12.1 summary performance changes new start -->
        <xsl:if test="count(@TMP_SCR_TYPE) &gt; 0 and @TMP_SCR_TYPE = 'L'">
        g_scrType = 'L';
        </xsl:if>
        <xsl:if test="(count(SUMBLOCK[@TABPAGE = 'QUERY']/FIELD[TYPE!='HIDDEN']) &gt; 14 or @CRITERIA_SRCH = 'N') or (count(SUMBLOCK[@TABPAGE = 'QUERY']/FIELD[TYPE!='HIDDEN']) &gt; 12 and @CRITERIA_SRCH = 'Y')  "> <!-- 12.1 summary performance changes new start -->
          scrollReqd = 'Y';
         </xsl:if>
        //imgpath = "<xsl:value-of select="$imgPath_XSL"/>";
        l_LablesArr = new Array();
        OptionValue = new Array();
        fieldType = new Array();
        relatedField   = new Array();
 
         <xsl:for-each select="SUMBLOCK[@TABPAGE='RESULT']/FIELD">
                <xsl:variable name="fName"><xsl:value-of select="NAME"/></xsl:variable>
                <xsl:variable name="fNameTmp"><xsl:value-of select="concat('&quot;', $fName , '&quot;')"/></xsl:variable>
				<xsl:if test="TYPE = 'SELECT' or TYPE = 'ROSELECT'"> <!--Fix for 18976383-->
                    <xsl:variable name="fldNode" select="." />
                    <xsl:variable name="optionValue">
                        <xsl:for-each select="$fldNode/OPTION">
                            <xsl:variable name="l_optdata">
                                <xsl:if test="@VALUE != '' or text() != ''">
                                    <xsl:value-of select="concat(@VALUE, '__', text(), '~')"/>
                                </xsl:if>
                                <xsl:if test="@VALUE = '' and text() = ''">
                                    <xsl:value-of select="concat('', '')"/>
                                </xsl:if>
                            </xsl:variable>
                            <xsl:value-of select="$l_optdata"/>
                        </xsl:for-each>
                    </xsl:variable>
                    <xsl:variable name="fOptionValueTemp"><xsl:value-of select="concat('&quot;', $optionValue , '&quot;' , ';')"/></xsl:variable>
                    <xsl:variable name="OptionValue"><xsl:value-of select="concat('OptionValue[',$fNameTmp, ']' , '=' , $fOptionValueTemp)"></xsl:value-of></xsl:variable>
                    <xsl:if test="$optionValue != ''">
                        <xsl:value-of select="$OptionValue"/>
                        <xsl:text>&#xa;</xsl:text>
                    </xsl:if>
                </xsl:if>
                <xsl:if test="TYPE = 'RADIO'">
                    <xsl:variable name="fldNode" select="." />
                    <xsl:variable name="optionValue">
                        <xsl:for-each select="$fldNode/OPTION">
                            <xsl:variable name="l_optdata">
                                <xsl:if test="VALUE != '' or LBL != ''">
                                    <xsl:value-of select="concat(VALUE, '__', LBL, '~')"/>
                                </xsl:if>
                                <xsl:if test="VALUE = '' and LBL = ''">
                                    <xsl:value-of select="concat('', '')"/>
                                </xsl:if>
                            </xsl:variable>
                            <xsl:value-of select="$l_optdata"/>
                        </xsl:for-each>
                    </xsl:variable>
                    <xsl:variable name="fOptionValueTemp"><xsl:value-of select="concat('&quot;', $optionValue , '&quot;' , ';')"/></xsl:variable>
                    <xsl:variable name="OptionValue"><xsl:value-of select="concat('OptionValue[',$fNameTmp, ']' , '=' , $fOptionValueTemp)"></xsl:value-of></xsl:variable>
                    <xsl:if test="$optionValue != ''">
                        <xsl:value-of select="$OptionValue"/>
                        <xsl:text>&#xa;</xsl:text>
                    </xsl:if>
                </xsl:if>
                <xsl:if test="TYPE = 'CHECKBOX'">
                    <xsl:variable name="fldNode" select="." />
                    <xsl:variable name="optionValue">
                        <xsl:variable name="l_optdata">
                            <xsl:if test="count($fldNode/CUSTOM) &gt; 0">
                                <xsl:value-of select="concat($fldNode/CUSTOM/ON, '__', $checkboxYes, '~', $fldNode/CUSTOM/OFF, '__', $checkboxNo, '~')"/>
                            </xsl:if>
                            <xsl:if test="count($fldNode/CUSTOM) = 0">
                                <xsl:value-of select="concat('', '')"/>
                            </xsl:if>
                        </xsl:variable>
                        <xsl:value-of select="$l_optdata"/>
                    </xsl:variable>
                    <xsl:variable name="fOptionValueTemp"><xsl:value-of select="concat('&quot;', $optionValue , '&quot;' , ';')"/></xsl:variable>
                    <xsl:variable name="OptionValue"><xsl:value-of select="concat('OptionValue[',$fNameTmp, ']' , '=' , $fOptionValueTemp)"></xsl:value-of></xsl:variable>
                    <xsl:if test="$optionValue != ''">
                        <xsl:value-of select="$OptionValue"/>
                        <xsl:text>&#xa;</xsl:text>
                    </xsl:if>
                </xsl:if>
                <xsl:if test="TYPE = 'AMOUNT' or TYPE = 'DATE' or TYPE = 'DATETIME'">
                    <xsl:variable name="fFieldTypeTemp"><xsl:value-of select="concat('&quot;', TYPE , '&quot;' , ';')"/></xsl:variable>
                    <xsl:variable name="FieldType"><xsl:value-of select="concat('fieldType[',$fNameTmp, ']' , '=' , $fFieldTypeTemp)"/></xsl:variable>
                    <xsl:value-of select="$FieldType"/>
                    <xsl:text>&#xa;</xsl:text>
                </xsl:if>
                <!--Number Format changes starts -->
                
                <xsl:if test="TYPE = 'TEXT' and DTYPE = 'NUMBER'">
                    <xsl:variable name="fFieldTypeTemp"><xsl:value-of select="concat('&quot;', DTYPE , '&quot;' , ';')"/></xsl:variable>
                    <xsl:variable name="FieldType"><xsl:value-of select="concat('fieldType[',$fNameTmp, ']' , '=' , $fFieldTypeTemp)"/></xsl:variable>
                    <xsl:value-of select="$FieldType"/>
                    
                </xsl:if>
                
                <!-- Number Format changes ends-->
                <xsl:if test="TYPE = 'AMOUNT'">
                    <xsl:variable name="rltdFld"><xsl:value-of select="concat('&quot;', RELATED_FIELD, '&quot;', ';')"/></xsl:variable>
                    <xsl:variable name="RelatedFld"><xsl:value-of select="concat('relatedField[', $fNameTmp, ']', '=', $rltdFld)"></xsl:value-of></xsl:variable>
                    <xsl:value-of select="$RelatedFld"/>
                    <xsl:text>&#xa;</xsl:text>
                </xsl:if>
         </xsl:for-each>
         <xsl:for-each select="SUMBLOCK[@TABPAGE = 'QUERY']/FIELD">
                <xsl:variable name="Ord" select="position()"/>
                <xsl:variable name="fDBC">
                       <xsl:value-of select="NAME"/>
                </xsl:variable>
         </xsl:for-each>
  </script>
  <noscript>
    <xsl:value-of select="$noScript"/>
  </noscript>
            
</xsl:template>

<!--12.0.3 change start -->
<xsl:template name="queryScroll"> 
    <script type="text/javascript" DEFER="DEFER">   
        scrollReqd = 'Y';
    </script>
    <noscript>
        <xsl:value-of select="$noScript"/>
    </noscript>
  </xsl:template>
<!--12.0.3 change end -->

<xsl:template name="dispLov">
    <xsl:param name="curr_fld"/>
    <xsl:param name="functionName"/>
    <xsl:attribute name="onclick">
        <xsl:value-of select="$functionName"/>
        <xsl:text>('</xsl:text>
        <!--<xsl:value-of select="substring($functionId,1,2)"/>-->
        <xsl:value-of select="concat(substring($functionId,1,2),'S',substring($functionId,4))"/>
        <xsl:text>','</xsl:text>
        <xsl:value-of select="normalize-space($curr_fld/../../SUMMARY_DATA_BLK)"/>
        <xsl:text>','</xsl:text>
        <xsl:value-of select="normalize-space($curr_fld/NAME)"/>
        <xsl:text>','</xsl:text>
        <xsl:call-template name="replaceApos">
                <xsl:with-param name="inputString" select="normalize-space($curr_fld/LBL)"/>
            </xsl:call-template>
        <xsl:text>','</xsl:text>
        <xsl:value-of select="normalize-space($curr_fld/LOV/NAME)"/>
        <xsl:text>','</xsl:text>
        <xsl:call-template name="replaceApos">
                <xsl:with-param name="inputString" select="normalize-space($curr_fld/LOV/TITLE)"/>
            </xsl:call-template>
        <xsl:text>','</xsl:text>
        <xsl:call-template name="replaceApos">
                <xsl:with-param name="inputString" select="normalize-space($curr_fld/LOV/COL_HEADING)"/>
            </xsl:call-template>
        <xsl:text>','</xsl:text>
        <xsl:call-template name="replaceApos">
                <xsl:with-param name="inputString" select="normalize-space($curr_fld/LOV/RED_FIELD)"/>
            </xsl:call-template>
        <xsl:text>', '', event)</xsl:text>
    </xsl:attribute>    
</xsl:template>

<xsl:template name="dispAutoLov">
    <xsl:param name="curr_node"/>
    <xsl:text>disp_auto_lov('</xsl:text>
    <xsl:value-of select="concat(substring($functionId,1,2),'S',substring($functionId,4))"/>
    <xsl:text>','</xsl:text>
    <xsl:value-of select="normalize-space($curr_node/../../SUMMARY_DATA_BLK)"/>
    <xsl:text>','</xsl:text>
    <xsl:value-of select="normalize-space($curr_node/NAME)"/>
    <xsl:text>','</xsl:text>
    <xsl:call-template name="replaceApos">
            <xsl:with-param name="inputString" select="normalize-space($curr_node/LBL)"/>
        </xsl:call-template>
    <xsl:text>','</xsl:text>
    <xsl:value-of select="normalize-space($curr_node/LOV/NAME)"/>
    <xsl:text>','</xsl:text>
    <xsl:call-template name="replaceApos">
            <xsl:with-param name="inputString" select="normalize-space($curr_node/LOV/TITLE)"/>
        </xsl:call-template>
    <xsl:text>','</xsl:text>
    <xsl:call-template name="replaceApos">
            <xsl:with-param name="inputString" select="normalize-space($curr_node/LOV/COL_HEADING)"/>
        </xsl:call-template>
    <xsl:text>','</xsl:text>
    <xsl:call-template name="replaceApos">
            <xsl:with-param name="inputString" select="normalize-space($curr_node/LOV/RED_FIELD)"/>
        </xsl:call-template>
    <xsl:text>','</xsl:text>
    <xsl:call-template name="replaceApos">
            <xsl:with-param name="inputString" select="normalize-space($curr_node/LOV/EXACT_FETCH)"/>
        </xsl:call-template>
    <xsl:text>', this, event)</xsl:text>
</xsl:template>
</xsl:stylesheet>
