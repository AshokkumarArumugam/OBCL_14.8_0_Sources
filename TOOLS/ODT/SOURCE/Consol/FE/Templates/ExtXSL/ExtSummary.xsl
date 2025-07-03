<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:variable name="Brn_Neo" select="''"/>
    <xsl:output method="html"/>
    <xsl:variable name="gPosition" select="'template'"/>
    <xsl:variable name="cQuery" select="'Q'"/>
    <xsl:variable name="cResult" select="'R'"/>
    <xsl:variable name="cAdvanced" select="'A'"/>
    <xsl:variable name="cAll" select="'All'"/>
<!-- Start of ExtLabels.xsl -->
   <xsl:variable name="saveCriteria_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_TOOLBAR_SAVE~~'), '@@')" />
   <xsl:variable name="savedQry_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_SAVED_QUERY~~'), '@@')" />
   <xsl:variable name="clearAll_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_CLEAR_ALL~~'), '@@')" />
   <xsl:variable name="export_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_EXPORT~~'), '@@')" />
   <xsl:variable name="advanced_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_ADVANCED~~'), '@@')" />
   <!--Changed for 17079537 -->
   <xsl:variable name="search_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_SEARCH~~'), '@@')" /> 
   <!-- bug id 14842317 change starts  -->
    <xsl:variable name="search_CaseSensitive" select="substring-before(substring-after($XslLabels, 'LBL_CASE_SENSITIVE~~'), '@@')" />  
   <!-- bug id 14842317 change ends  -->
   <xsl:variable name="reset_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_RESET~~'), '@@')" /> 
   <xsl:variable name="recordsPerPage_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_RECORDS_PER_PAGE~~'), '@@')" /> 
   <xsl:variable name="gotoPage_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_GOTO_PAGE~~'), '@@')" /> 
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
<!-- End of ExtLabels.xsl -->

<!-- Start of ExtSummaryInput.xsl -->  
    <xsl:template name="typeHandler">
        <xsl:param name="fType"/>
        <xsl:param name="fldNode"/>
        <xsl:variable name="dbt" select="../../../SUMMARY_DATA_BLK"/>
        <xsl:variable name="dbc" select="$fldNode/NAME"/>
        <xsl:variable name="fldName" select="$fldNode/NAME"/>
        <div class="DIVText">
            <xsl:choose>
                <xsl:when test="$fType='AMOUNT' or $fType='DATE' or ($fType ='TEXT' and ($fldNode/DTYPE='NUMERIC' or $fldNode/DTYPE = 'NUMBER'))">
                    <xsl:call-template name="dispLabelHidden"/>
                </xsl:when>
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
                    <b class="LBLstd"/>
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
        <xsl:variable name="relFld" select="$fldNode/RELATED_FIELD"/>
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
        </INPUT>
        <!--<INPUT TYPE="TEXT" CLASS="TXTstd numeric" title="{$fldNode/LBL}" onactivate="acceptInputAmount('{$fldNode/NAME}', '{$relatedFld}', event)" onbeforedeactivate="validateInputAmount('{$fldNode/NAME}', '{$relatedFld}', event)">-->
        <label class="LBLstd" for=""><xsl:value-of select="$fldNode/LBL"></xsl:value-of></label>
        <INPUT TYPE="TEXT" CLASS="TXTstd numeric" title="{$fldNode/LBL}">
            <xsl:call-template name="ATTR_InputEntity_Handler">
                <xsl:with-param name="curr_fld" select="$fldNode"/>
            </xsl:call-template>
            <xsl:attribute name="MIN_VAL">
                <xsl:value-of select="$fldNode/MIN_VAL"/>
            </xsl:attribute>
            <xsl:attribute name="MAX_VAL">
                <xsl:value-of select="$fldNode/MAX_VAL"/>
            </xsl:attribute>
            <!--<xsl:if test="../MIN_VAL != '' and ../MAX_VAL != ''">
                <xsl:attribute name="onblur">
                    <xsl:text disable-output-escaping="yes">fnValidateRange(this)</xsl:text>
                </xsl:attribute>
            </xsl:if>-->
            <xsl:attribute name = "onblur">
                <xsl:text disable-output-escaping="yes">validateInputAmount('</xsl:text>
                <xsl:value-of select="$fldNode/NAME"/>
                <xsl:text disable-output-escaping="yes">', '</xsl:text>
                <xsl:value-of select="$relatedFld"/>
                <xsl:text disable-output-escaping="yes">', event);fnValidateRange(this);</xsl:text>
            </xsl:attribute>
            <xsl:if test="number($fldNode/SIZE) > 25">
                <xsl:attribute name="SIZE">
                    <xsl:value-of select="16"/>
                </xsl:attribute>
            </xsl:if>
        </INPUT>
        <xsl:if test="count($fldNode/READ_ONLY) = 0 or $fldNode/READ_ONLY != -1">
            <BUTTON CLASS="BTNimg " title="{$lov}" tabindex="-1" onMouseOver="this.className='BTNimgH'" onMouseOut="this.className='BTNimg'" onFocus="this.className='BTNimgH'" onBlur="this.className='BTNimg'">
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
                <span tabindex="-1" class="ICOlov">
                <span class ="LBLinv"><xsl:value-of select = "$lov"/></span>
                </span>
            </BUTTON>               
        </xsl:if>
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
        <INPUT TYPE="HIDDEN" data_type="DATE" onpropertychange="displayDate(this)">
            <xsl:call-template name="ATTR_HiddenEntity_Handler">
                <xsl:with-param name="curr_fld" select="$fldNode"/>
            </xsl:call-template>
        </INPUT>
        <!--<INPUT TYPE="TEXT" CLASS="TXTstd" onactivate="acceptInputDate('{$fldNode/NAME}', event)" onbeforedeactivate="validateInputDate('{$fldNode/NAME}', event)">-->
        <label class="LBLstd" for=""><xsl:value-of select="$fldNode/LBL"></xsl:value-of></label>
        <INPUT TYPE="TEXT" CLASS="TXTstd" onblur="validateInputDate('{$fldNode/NAME}', event)">
            <xsl:call-template name="ATTR_InputEntity_Handler">
                <xsl:with-param name="curr_fld" select="$fldNode"/>
            </xsl:call-template>
            <xsl:attribute name="SIZE">
                <xsl:value-of select="11"/>
            </xsl:attribute>
            <xsl:attribute name="TITLE">
              <xsl:value-of select="$calendar"/>
            </xsl:attribute>
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
        </INPUT>
        <xsl:if test="count($fldNode/READ_ONLY) = 0 or $fldNode/READ_ONLY != -1">
            <BUTTON CLASS="BTNimg " title="{$calendar}" tabindex="-1" onMouseOver="this.className='BTNimgH'" onMouseOut="this.className='BTNimg'" onFocus="this.className='BTNimgH'" onBlur="this.className='BTNimg'" onclick="disp_cal('{$fldNode/NAME}', event)" >                    
                <span tabindex="-1" class="ICOcalendar">                
                <span class ="LBLinv"><xsl:value-of select = "$calendar"/></span>
                </span>
            </BUTTON>               
        </xsl:if>
    </xsl:template>

    <xsl:template name="dispNumberField">
        <xsl:param name="dbt"/>
        <xsl:param name="dbc"/>
        <xsl:param name="fldName"/>
        <xsl:param name="fldNode"/>
        <INPUT TYPE="HIDDEN" onpropertychange="displayFormattedNumber(this)">
            <xsl:call-template name="ATTR_HiddenEntity_Handler">
                <xsl:with-param name="curr_fld" select="$fldNode"/>
            </xsl:call-template>
        </INPUT>
        <!--<INPUT TYPE="TEXT" CLASS="TXTstd numeric" title="{$fldNode/LBL}" onactivate="acceptInputAmount('{$fldNode/NAME}', '{$relatedFld}', event)" onbeforedeactivate="validateInputAmount('{$fldNode/NAME}', '{$relatedFld}', event)">-->
        <label class="LBLstd" for=""><xsl:value-of select="$fldNode/LBL"></xsl:value-of></label>
        <input type="text" class="TXTstd numeric" onblur="validateInputNumber(this)">
            <xsl:call-template name="ATTR_InputEntity_Handler">
                <xsl:with-param name="curr_fld" select="$fldNode" />
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
        </input>
        <xsl:if test="count($fldNode/READ_ONLY) = 0 or $fldNode/READ_ONLY != -1">
            <BUTTON CLASS="BTNimg " title="{$lov}" tabindex="-1" onMouseOver="this.className='BTNimgH'" onMouseOut="this.className='BTNimg'" onFocus="this.className='BTNimgH'" onBlur="this.className='BTNimg'">
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
                <span tabindex="-1" class="ICOlov"><span class ="LBLinv"><xsl:value-of select = "$lov"/></span></span>
            </BUTTON>               
        </xsl:if>
    </xsl:template>

    <xsl:template name="dispMaskField">
        <xsl:param name="EntityType"/>
        <xsl:param name="dbt"/>
        <xsl:param name="dbc"/>
        <xsl:param name="fldName"/>
        <xsl:param name="fldNode"/>
        <label class="LBLinv" for=""></label>
        <INPUT TYPE="HIDDEN" onpropertychange="displayValue(this)">
            <xsl:call-template name="ATTR_HiddenEntity_Handler">
                <xsl:with-param name="curr_fld" select="$fldNode"/>
            </xsl:call-template>
        </INPUT>
        <!--<INPUT TYPE="TEXT" CLASS="TXTstd" mask="{$fldNode/MASK}" onactivate="acceptInputValue('{$fldNode/NAME}')" onbeforedeactivate="validateInputValue('{$fldNode/NAME}');">-->
        <label class="LBLstd" for=""></label><INPUT TYPE="TEXT" CLASS="TXTstd" mask="{$fldNode/MASK}" onblur="validateInputValue('{$fldNode/NAME}');">
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
        <INPUT TYPE="TEXT" CLASS="TXTstd">
            <xsl:if test="../TYPE = 'RESTRICTED_TEXT' and ((count(../UPPERCASE) &gt; 0 and ../UPPERCASE = -1) or (count(../CASE) &gt; 0 and ../CASE = 'UPPER'))">        
                <xsl:if test="count(../LOV) &gt; 0 and count(../INPUT_LOV) = 0">
                    <xsl:attribute name="onblur">
                        <xsl:text>validateRestrictedTextValue(this);fnToUppercase(this, event);fnBuildAutoSummaryLOV('</xsl:text>
                        <xsl:value-of select="normalize-space(../NAME)"/>
                        <xsl:text>','</xsl:text>
                        <xsl:call-template name="replaceApos">
                            <xsl:with-param name="inputString" select="../LBL"/>
                        </xsl:call-template>
                        <xsl:text>','</xsl:text>
                        <xsl:value-of select="normalize-space(../DTYPE)"/>
                        <xsl:text>')</xsl:text>
                    </xsl:attribute>
                </xsl:if>
                <xsl:if test="count(../LOV) = 0 and count(../INPUT_LOV) = 0">
                    <xsl:attribute name="onblur">validateRestrictedTextValue(this);fnToUppercase(this, event)</xsl:attribute>
                </xsl:if>
            </xsl:if>
            <xsl:if test="../TYPE != 'RESTRICTED_TEXT' and ((count(../UPPERCASE) &gt; 0 and ../UPPERCASE = -1) or (count(../CASE) &gt; 0 and ../CASE = 'UPPER'))">
                <xsl:if test="count(../LOV) &gt; 0 and count(../INPUT_LOV) = 0">
                    <xsl:attribute name="onblur">
                        <xsl:text>fnToUppercase(this, event);fnBuildAutoSummaryLOV('</xsl:text>
                        <xsl:value-of select="normalize-space(../NAME)"/>
                        <xsl:text>','</xsl:text>
                        <xsl:call-template name="replaceApos">
                            <xsl:with-param name="inputString" select="../LBL"/>
                        </xsl:call-template>
                        <xsl:text>','</xsl:text>
                        <xsl:value-of select="normalize-space(../DTYPE)"/>
                        <xsl:text>')</xsl:text>
                    </xsl:attribute>
                </xsl:if>
                <xsl:if test="count(../LOV) = 0 and count(../INPUT_LOV) = 0">
                    <xsl:attribute name="onblur">fnToUppercase(this, event)</xsl:attribute>
                </xsl:if>
            </xsl:if>
            <xsl:if test="../TYPE = 'RESTRICTED_TEXT' and ((count(../UPPERCASE) &lt;= 0 or ../UPPERCASE = 0) and (count(../CASE) &lt;= 0 or ../CASE != 'UPPER'))">
                <xsl:if test="count(../LOV) &gt; 0 and count(../INPUT_LOV) = 0">
                    <xsl:attribute name="onblur">
                        <xsl:text>validateRestrictedTextValue(this);fnBuildAutoSummaryLOV('</xsl:text>
                        <xsl:value-of select="normalize-space(../NAME)"/>
                        <xsl:text>','</xsl:text>
                        <xsl:call-template name="replaceApos">
                            <xsl:with-param name="inputString" select="../LBL"/>
                        </xsl:call-template>
                        <xsl:text>','</xsl:text>
                        <xsl:value-of select="normalize-space(../DTYPE)"/>
                        <xsl:text>')</xsl:text>
                    </xsl:attribute>
                </xsl:if>
                <xsl:if test="count(../LOV) = 0 and count(../INPUT_LOV) = 0">
                    <xsl:attribute name="onblur">validateRestrictedTextValue(this)</xsl:attribute>
                </xsl:if>
            </xsl:if>
            <xsl:if test="../TYPE != 'RESTRICTED_TEXT' and ((count(../UPPERCASE) &lt;= 0 or ../UPPERCASE = 0) and (count(../CASE) &lt;= 0 or ../CASE != 'UPPER'))">
                <xsl:if test="count(../LOV) &gt; 0 and count(../INPUT_LOV) = 0">
                    <xsl:attribute name="onblur">
                        <xsl:text>fnBuildAutoSummaryLOV('</xsl:text>
                        <xsl:value-of select="normalize-space(../NAME)"/>
                        <xsl:text>','</xsl:text>
                        <xsl:call-template name="replaceApos">
                            <xsl:with-param name="inputString" select="../LBL"/>
                        </xsl:call-template>
                        <xsl:text>','</xsl:text>
                        <xsl:value-of select="normalize-space(../DTYPE)"/>
                        <xsl:text>')</xsl:text>
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
        </INPUT>
        <xsl:call-template name="LovHandler">
            <xsl:with-param name="curr_fld" select="$fldNode"/>
            <xsl:with-param name="EntityType" select="$EntityType"/>
        </xsl:call-template>
        <xsl:if test="count($fldNode/LOV) = 0 ">
            <xsl:if test="count($fldNode/POPUPEDIT) > 0 and (count($fldNode/READ_ONLY) = 0 or $fldNode/READ_ONLY = 0)">
                <BUTTON CLASS="BTNimg" tabindex="-1"
                		title="{$narrative}"
                        onMouseOver="this.className='BTNimgH'"
                        onMouseOut="this.className='BTNimg'"
                        onFocus="this.className='BTNimgH'"
                        onBlur="this.className='BTNimg'">
                    <xsl:call-template name="Popup_Handler"><xsl:with-param name="fldNode" select="$fldNode"/></xsl:call-template>
                    <span tabindex="-1" class="ICOnarrative"><span class ="LBLinv"><xsl:value-of select = "$narrative"/></span></span>                        
                </BUTTON>
            </xsl:if>
        </xsl:if>
    </xsl:template>
    
    <xsl:template name="dispTextField">
        <xsl:param name="EntityType"/>
        <xsl:param name="dbt"/>
        <xsl:param name="dbc"/>
        <xsl:param name="fldName"/>
        <xsl:param name="fldNode"/>
        <INPUT TYPE="TEXT" CLASS="TXTstd">
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
             <!--Changes for AUTO LOV start-->
            <xsl:if test="(count($fldNode/UPPERCASE) > 0 and $fldNode/UPPERCASE = -1) or (count($fldNode/CASE) > 0 and $fldNode/CASE = 'UPPER')">
                <xsl:attribute name="onblur">
                    <xsl:text>fnToUppercase(this,event);fnBuildAutoSummaryLOV('</xsl:text>
                    <xsl:value-of select="normalize-space(../NAME)"/>
                    <xsl:text>','</xsl:text>
                    <xsl:call-template name="replaceApos">
                        <xsl:with-param name="inputString" select="../LBL"/>
                    </xsl:call-template>
                    <xsl:text>','</xsl:text>
                    <xsl:value-of select="normalize-space(../DTYPE)"/>
                    <xsl:text>')</xsl:text>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="(count($fldNode/UPPERCASE) &lt;= 0 or $fldNode/UPPERCASE = 0) and (count($fldNode/CASE) &lt;= 0 or $fldNode/CASE != 'UPPER')">
                <xsl:attribute name="onblur">
                    <xsl:text>fnBuildAutoSummaryLOV('</xsl:text>
                    <xsl:value-of select="normalize-space(../NAME)"/>
                    <xsl:text>','</xsl:text>
                    <xsl:call-template name="replaceApos">
                        <xsl:with-param name="inputString" select="../LBL"/>
                    </xsl:call-template>
                    <xsl:text>','</xsl:text>
                    <xsl:value-of select="normalize-space(../DTYPE)"/>
                    <xsl:text>')</xsl:text>
                </xsl:attribute>
            </xsl:if>            
            <!--Changes for AUTO LOV end-->
            <xsl:if test="number($fldNode/SIZE) > 25">
                <xsl:attribute name="SIZE">
                    <xsl:value-of select="16"/>
                </xsl:attribute>
            </xsl:if>
        </INPUT>
        <xsl:call-template name="LovHandler">
            <xsl:with-param name="curr_fld" select="$fldNode"/>
            <xsl:with-param name="EntityType" select="$EntityType"/>
        </xsl:call-template>
        <xsl:if test="count($fldNode/LOV) = 0 ">
            <xsl:if test="count($fldNode/POPUPEDIT) > 0 and (count($fldNode/READ_ONLY) = 0 or $fldNode/READ_ONLY = 0)">
                <BUTTON CLASS="BTNimg" tabindex="-1"
                        onMouseOver="this.className='BTNimgH'"
                        onMouseOut="this.className='BTNimg'"
                        onFocus="this.className='BTNimgH'"
                        onBlur="this.className='BTNimg'">
                    <xsl:call-template name="Popup_Handler"><xsl:with-param name="fldNode" select="$fldNode"/></xsl:call-template>
                    <span tabindex="-1" class="ICOnarrative"><span class ="LBLinv"><xsl:value-of select = "$narrative"/></span></span>   
                </BUTTON>
            </xsl:if>
        </xsl:if>
        <!-- Added By Murali, assigning the text field size to 25 & adding popup button -->
        <xsl:if test="count($fldNode/POPUPEDIT) = 0">
            <xsl:if test="number($fldNode/SIZE) > 25">
                <BUTTON CLASS="BTNimg" tabindex="-1"
                		title="{$narrative}"
                        onMouseOver="this.className='BTNimgH'"
                        onMouseOut="this.className='BTNimg'"
                        onFocus="this.className='BTNimgH'"
                        onBlur="this.className='BTNimg'">
                    <xsl:call-template name="Popup_Handler"><xsl:with-param name="fldNode" select="$fldNode"/></xsl:call-template>
                    <span tabindex="-1" class="ICOnarrative"><span class ="LBLinv"><xsl:value-of select = "$narrative"/></span></span>   
                </BUTTON>
            </xsl:if>
        </xsl:if>
    </xsl:template>
    <!-- Takes care of features common in Text Field of Absolute/Column Positioning -->
    <xsl:template name="dispSelectField">
        <xsl:param name="dbt"/>
        <xsl:param name="dbc"/>
        <xsl:param name="fldName"/>
        <xsl:param name="fldNode"/>
        <SELECT CLASS="SELstd">
            <xsl:attribute name="ID">
                <xsl:value-of select="concat($dbt,'__',$dbc)"></xsl:value-of>
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
            <xsl:if test="count($fldNode/WIDTH) > 0">
                <xsl:attribute name="STYLE">
                    <xsl:text>{width:</xsl:text>
                    <xsl:value-of select="$fldNode/WIDTH"/>
                    <xsl:text>;}</xsl:text>
                </xsl:attribute>
            </xsl:if>
            <xsl:for-each select="$fldNode/OPTION">
                <OPTION VALUE="{@VALUE}">
                    <xsl:if test="(@VALUE)=''">
                        <xsl:attribute name="SELECTED">SELECTED</xsl:attribute>
                        <xsl:attribute name="DEFAULT">
                            <xsl:value-of select="@VALUE"/>
                        </xsl:attribute>
                    </xsl:if>
                    <xsl:value-of select="."/>
                </OPTION>
            </xsl:for-each>
            <xsl:variable name="dfltReqd">
                <xsl:for-each select="$fldNode/OPTION">
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
                <OPTION VALUE="" SELECTED="SELECTED" DEFAULT="">
                </OPTION>
            </xsl:if>
        </SELECT>
    </xsl:template>
    <!-- Takes care of features common in Checkbox Field of Absolute/Column Positioning -->
    <xsl:template name="dispCheckboxField">
        <xsl:param name="dbt"/>
        <xsl:param name="dbc"/>
        <xsl:param name="fldName"/>
        <xsl:param name="fldNode"/>
        <label  class="LBLauto" for="{$dbt}__{$dbc}">
        <INPUT TYPE="CHECKBOX" DBC="{$dbc}" DBT="{$dbt}" NAME="{$fldName}" id="{$dbt}__{$dbc}" >
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
        <xsl:value-of select="$fldNode/LBL"/>
        </label>
    </xsl:template>
    <!-- Takes care of features common in Textarea Field of Absolute/Column Positioning -->
    <xsl:template name="dispTextareaField">
        <xsl:param name="position" select="."/>
        <xsl:param name="dbt"/>
        <xsl:param name="dbc"/>
        <xsl:param name="fldName"/>
        <xsl:param name="fldNode"/>
        <TEXTAREA CLASS="TXAstd">
            <xsl:call-template name="ATTR_Handler">
                <xsl:with-param name="curr_fld" select="$fldNode"/>
                <xsl:with-param name="curr_fld_dbt" select="$dbt"/>
                <xsl:with-param name="curr_fld_dbc" select="$dbc"/>
                <xsl:with-param name="curr_fld_name" select="$fldName"/>
            </xsl:call-template>
            <xsl:if test="$position = 'absolute'">
                <xsl:attribute name="STYLE">
                    <xsl:text>{width:</xsl:text>
                    <xsl:value-of select="$fldNode/WIDTH"/>
                    <xsl:text>px;height:</xsl:text>
                    <xsl:value-of select="$fldNode/HEIGHT"/>
                    <xsl:text>px;}</xsl:text>
                </xsl:attribute>
            </xsl:if>
        </TEXTAREA>
        <!--Fix for 16497868- Textarea support in Summary screen-->
         <xsl:call-template name="LovHandler">
            <xsl:with-param name="curr_fld" select="$fldNode"/>
        </xsl:call-template>
        <xsl:if test="count($fldNode/POPUPEDIT) > 0 and (count($fldNode/READ_ONLY) = 0 or $fldNode/READ_ONLY = 0)">
            <BUTTON CLASS="BTNimg" tabindex="-1" onMouseOver="this.className='BTNimgH'" onMouseOut="this.className='BTNimg'" onFocus="this.className='BTNimgH'" onBlur="this.className='BTNimg'" title="{$narrative}">
                        <xsl:call-template name="Popup_Handler"><xsl:with-param name="fldNode" select="$fldNode"/></xsl:call-template>
                        <span tabindex="-1" class="ICOnarrative"><span class ="LBLinv"><xsl:value-of select = "$narrative"/></span></span>   
            </BUTTON>
        </xsl:if>
    </xsl:template>
    <!-- Takes care of features common in FILE Field of Absolute/Column Positioning -->
    <xsl:template name="dispFileField">
        <xsl:param name="dbt"/>
        <xsl:param name="dbc"/>
        <xsl:param name="fldName"/>
        <xsl:param name="fldNode"/>
        <label class="LBLstd" for=""></label>
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
            <xsl:value-of select="concat($curr_fld/../../SUMMARY_DATA_BLK,'__',$curr_fld/NAME)"/>
            <xsl:text>I</xsl:text>
        </xsl:attribute>
        <xsl:attribute name="NAME">
            <xsl:value-of select="$curr_fld/NAME"/>
            <xsl:text>I</xsl:text>
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
        <xsl:attribute name="REQUIRED">
            <xsl:value-of select="$curr_fld/REQD"/>
        </xsl:attribute>
        <xsl:if test="count($curr_fld/REQD) = 0 or $curr_fld/REQD = '0'">
        <xsl:attribute name="aria-required">
        <xsl:text>false</xsl:text>
        </xsl:attribute>
    </xsl:if>
    <xsl:if test="count($curr_fld/REQD) &gt; 0 and $curr_fld/REQD = -1">
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
        <xsl:if test="$curr_fld/TYPE='TEXT' or $curr_fld/TYPE='RESTRICTED_TEXT' or $curr_fld/TYPE='TEXTAREA'">
            <BUTTON CLASS="BTNimg" title="{$lov}" tabindex="-1" onMouseOver="this.className='BTNimgH'" onMouseOut="this.className='BTNimg'" onFocus="this.className='BTNimgH'" onBlur="this.className='BTNimg'">
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
                <span tabindex="-1" class="ICOlov"><span class ="LBLinv"><xsl:value-of select = "$lov"/></span></span>
            </BUTTON>
        </xsl:if>
        <xsl:if test="count($curr_fld/LOV) = 0 ">
            <xsl:if test="$EntityType = 'ACCOUNT' ">
                <BUTTON CLASS="BTNimg" title="{$lov}" tabindex="-1" ONCLICK="Account.show_lov()"
                        onMouseOver="this.className='BTNimgH'"
                        onMouseOut="this.className='BTNimg'"
                        onFocus="this.className='BTNimgH'"
                        onBlur="this.className='BTNimg'">
                    <span tabindex="-1" class="ICOlov"><span class ="LBLinv"><xsl:value-of select = "$lov"/></span></span>
                </BUTTON>
            </xsl:if>
            <xsl:if test="$EntityType = 'BRANCH' ">
                <BUTTON CLASS="BTNimg" title="{$lov}" tabindex="-1" ONCLICK="Branch.show_lov()"
                	onMouseOver="this.className='BTNimgH'"
                        onMouseOut="this.className='BTNimg'"
                        onFocus="this.className='BTNimgH'"
                        onBlur="this.className='BTNimg'">
                    <span tabindex="-1" class="ICOlov"><span class ="LBLinv"><xsl:value-of select = "$lov"/></span></span>
                </BUTTON>
            </xsl:if>
            <xsl:if test="$EntityType = 'CURRENCY' ">
                <BUTTON CLASS="BTNimg" tabindex="-1" ONCLICK="Currency.show_lov()"
                onMouseOver="this.className='BTNimgH'" title="{$lov}"
                        onMouseOut="this.className='BTNimg'"
                        onFocus="this.className='BTNimgH'"
                        onBlur="this.className='BTNimg'">
                    <span tabindex="-1" class="ICOlov"><span class ="LBLinv"><xsl:value-of select = "$lov"/></span></span>
                </BUTTON>
            </xsl:if>
            <xsl:if test="$EntityType = 'CUSTOMER' ">
                <BUTTON CLASS="BTNimg" tabindex="-1" title="{$lov}" ONCLICK="Customer.show_lov()" nMouseOver="this.className='BTNimgH'"
                        onMouseOut="this.className='BTNimg'"
                        onFocus="this.className='BTNimgH'"
                        onBlur="this.className='BTNimg'">
                    <span tabindex="-1" class="ICOlov"><span class ="LBLinv"><xsl:value-of select = "$lov"/></span></span>
                </BUTTON>
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
            <xsl:value-of select="concat($curr_fld/../../SUMMARY_DATA_BLK,'__',$curr_fld/NAME)"/>
        </xsl:attribute>
        <xsl:attribute name="DBT">
            <xsl:value-of select="$curr_fld_dbt"/>
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
        <xsl:attribute name="REQUIRED">
            <xsl:value-of select="$curr_fld/REQUIRED"/>
        </xsl:attribute>
        <xsl:if test="count($curr_fld/REQD) = 0 or $curr_fld/REQD = '0'">
        <xsl:attribute name="aria-required">
        <xsl:text>false</xsl:text>
        </xsl:attribute>
    </xsl:if>
    <xsl:if test="count($curr_fld/REQD) &gt; 0 and $curr_fld/REQD = -1">
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
        <INPUT TYPE="HIDDEN">
            <xsl:call-template name="ATTR_Handler">
                <xsl:with-param name="curr_fld" select="$fldNode"/>
                <xsl:with-param name="curr_fld_dbt" select="$dbt"/>
                <xsl:with-param name="curr_fld_dbc" select="$dbc"/>
                <xsl:with-param name="curr_fld_name" select="$fldName"/>
            </xsl:call-template>
        </INPUT>
    </xsl:template>
    <xsl:template name="dispRadioToSelectField">
        <xsl:param name="dbt"/>
        <xsl:param name="dbc"/>
        <xsl:param name="fldName"/>
        <xsl:param name="fldNode"/>
        <SELECT CLASS="SELstd">
            <xsl:attribute name="ID">
                <xsl:value-of select="concat($dbt,'__',$dbc)"></xsl:value-of>
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
            <OPTION VALUE=""></OPTION>
            <xsl:for-each select="$fldNode/OPTION">
                <OPTION VALUE="{VALUE}">
                    <xsl:if test="@VALUE = ''">
                        <xsl:attribute name="SELECTED">SELECTED</xsl:attribute>
                    </xsl:if>
                    <xsl:value-of select="LBL"/>
                </OPTION>
            </xsl:for-each>
        </SELECT>
    </xsl:template>
<!-- End of ExtSummaryInput.xsl -->

<!-- Start of ExtSummaryCore.xsl -->
<!-- Takes care of features common in Label Field of Absolute/Column Positioning -->
<xsl:template name="dispLabelField">
    <xsl:param name="dbt"/>
    <xsl:param name="dbc"/>
    <xsl:param name="fldName"/>
    <xsl:param name="fldNode"/>
    
    <LABEL CLASS="LBLstd">
        <xsl:value-of select="$fldNode/LBL"></xsl:value-of>
        <!--<xsl:call-template name="RequiredFieldHandler">
            <xsl:with-param name="curr_fld" select="$fldNode" />
        </xsl:call-template>-->
    </LABEL>
</xsl:template>

<xsl:template name="dispLabelHidden">
    <LABEL CLASS="LBLinv"></LABEL>
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
    <TABLE class="TABLEAudit" cellSpacing="0" cellPadding="0" width="99%" border="0" summary="">
        <TR>
            <TD vAlign="top">
                <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
            </TD>        
            <TD class="TDAuditButton" vAlign="top" width="90%">
                <INPUT class="BTNfooter" id="BTN_EXIT" onclick="fnExit_sum('',event)" type="button" onmouseover="this.className='BTNfooterH'" onblur="this.className='BTNfooter'" onfocus="this.className='BTNfooterH'" onmouseout="this.className='BTNfooter'" value="{$exit_SummaryAudit}" onkeydown="return fnHandleSumBtn(event)"/>
                <!--<IMG id="BTN_EXIT_IMG'" style="display:none" src="Images/Exit2.gif" name="BTN_EXIT_IMG"/>-->
            </TD>
        </TR>
    </TABLE>
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
                                <label class="LBLstd">
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
        <div id="toolbarSummary" class="DIVnav" style="display: block;">
                 <ul id="navTB">
                    <li id="SaveCriteria" name="SaveCriteria" class="BTNIconSave" style="display: none;">
                        <a href="#" class="TBitem" onclick="fnOpenCriteriaScr(event)" onkeydown="fnHandleScrBtn(event)"><xsl:value-of select="$saveCriteria_SummaryAudit"/></a>
                    </li>
                    <li id="SavedQry" name="SavedQry" class="BTNIconEnterQuery" style="display: block;">
                        <a href="#" class="TBitem" onclick="fnQueryCriteria('QUERYCRITERIA',event)" onkeydown="fnHandleScrBtn(event)"><xsl:value-of select="$savedQry_SummaryAudit"/></a>
                    </li>
                    <li id="Export" class="BTNIconExport" name="Export" style="display: none;">
                        <a href="#" class="TBitem" onclick="fnExportToExcel()" onkeydown="fnHandleScrBtn(event)"><xsl:value-of select="$export_SummaryAudit"/></a>
                    </li>
                    <li id="Search" class="BTNIconExecuteQuery" name="Search" style="display: block;">
                        <a href="#" class="TBitem" onclick="fnExecuteQuery_sum('Y',event)" onkeydown="fnHandleScrBtn(event)"><xsl:value-of select="$search_SummaryAudit"/></a>
                    </li>
                    <li id="AdvSearch" class="BTNIconAdancedSearch" name="AdvSearch" style="display: block;">
                        <a href="#" id="advSearch" class="TBitem" onclick="fnSubScreenMain('{$functionId}','{$uixml}','CVS_ADVANCED','')" onkeydown="fnHandleScrBtn(event)"><xsl:value-of select="$advanced_SummaryAudit"/></a>
                    </li>
                    <li id="Refresh" class="BTNIconRefresh" name="Refresh" style="display: none;">
                        <a href="#" class="TBitem" onclick="fnRefreshSummary(event)" onkeydown="fnHandleScrBtn(event)"><xsl:value-of select="$refresh_SummaryAudit"/></a>
                    </li>
                    <li class="BTNIconReset" style="display: block;">
                        <a href="#" class="TBitem" onclick="fnResetQry(event)" onkeydown="fnHandleScrBtn(event)"><xsl:value-of select="$reset_SummaryAudit"/></a>
                    </li>
                    <li class="BTNIconClearAll" style="display: block;">
                        <a href="#" class="TBitem" onclick="fnResetAll(event)" onkeydown="fnHandleScrBtn(event)"><xsl:value-of select="$clearAll_SummaryAudit"/></a>
                    </li>
                 </ul>
        </div>
        <DIV id="ScrollYes">
         <div id="PageHead" class="DIVTwoColLyt">            
                <xsl:call-template name="QueryContent"/>
            </div>
            <xsl:call-template name="ResultProcess"/>            
        </DIV>
        <DIV class="DIVfooter" id="ScrollNo">
            <h2 class="LBLinv"><xsl:value-of select="$page_footer"/></h2>
            <xsl:call-template name="Sum_Custom_Btn"/>
            <div class="DIVAudit">
                <xsl:call-template name="disp_Exit_Btn"/>
            </div>
        </DIV>
        <xsl:call-template name="generateScript"/>
    </xsl:template>
    
    <xsl:template name="Sum_Custom_Btn">
        <xsl:if test="(count(//SUMBUTTONS) > 0)">
            <xsl:variable name="noOfButtons" select="count(//SUMBUTTONS/BUTTON)"/>
            <xsl:variable name="buttonsPerRow" select="//SUMBUTTONS/BUTTONS_PER_ROW"/>
            <div class="DIVAbutton" id="SUM_CUST_BTNS" style="width:790px;padding-left:2px;">
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
                        </li>
                    </xsl:for-each>
                </ul>
        </div>
        </xsl:if>
    </xsl:template>
       
    <xsl:template name="QueryContent">        
        <fieldset class="FSTdlg">
            <legend><xsl:value-of select="$search_CaseSensitive"/></legend>
            <xsl:if test="count(@TMP_SCR_TYPE) &gt; 0 and @TMP_SCR_TYPE = 'L'">
                    <div class="DIVThreeColSectionContainer" id="TblQuery">
                    <xsl:variable name="no_Of_flds" select="count(SUMBLOCK[@TABPAGE = 'QUERY']/FIELD)"/>
                    <xsl:variable name="no_Of_vis_flds" select="count(SUMBLOCK[@TABPAGE = 'QUERY']/FIELD[TYPE!='HIDDEN'])"/>
                    <xsl:if test="$no_Of_flds > 0">
                    <div class="DIVColumnOne">
                        <fieldset class="FSTcell"><legend></legend>
                            <xsl:for-each select="SUMBLOCK[@TABPAGE = 'QUERY']/FIELD[TYPE!='HIDDEN']/TYPE">
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
                        </fieldset>
                    </div>       
                    <div class="DIVColumnOne">
                        <fieldset class="FSTcell"><legend></legend>
                             <xsl:for-each select="SUMBLOCK[@TABPAGE = 'QUERY']/FIELD[TYPE!='HIDDEN']/TYPE">
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
                        </fieldset>
                    </div>
                    <div class="DIVColumnOne">
                        <fieldset class="FSTcell"><legend></legend>
                             <xsl:for-each select="SUMBLOCK[@TABPAGE = 'QUERY']/FIELD[TYPE!='HIDDEN']/TYPE">
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
                    </xsl:if>                    
                </div>
            </xsl:if>
            <xsl:if test="count(@TMP_SCR_TYPE) = 0 or @TMP_SCR_TYPE != 'L'">
                 <div class="DIVTwoColSectionContainer" id="TblQuery">
                    <xsl:variable name="no_Of_flds" select="count(SUMBLOCK[@TABPAGE = 'QUERY']/FIELD)"/>
                    <xsl:variable name="no_Of_vis_flds" select="count(SUMBLOCK[@TABPAGE = 'QUERY']/FIELD[TYPE!='HIDDEN'])"/>
                    <xsl:if test="$no_Of_flds > 0">
                    <div class="DIVColumnOne">
                        <fieldset class="FSTcell"><legend></legend>
                            <xsl:for-each select="SUMBLOCK[@TABPAGE = 'QUERY']/FIELD[TYPE!='HIDDEN']/TYPE">
                                <xsl:variable name="pos" select="position()"/>
                                <xsl:variable name="dbt" select="../../../SUMMARY_DATA_BLK"/>
                                <xsl:variable name="dbc" select="../NAME"/>
                                <xsl:variable name="fldName" select="../NAME"/>
                                <xsl:if test="$pos mod 2 = 1 and $pos &lt; 15">                             
                                        <xsl:call-template name="typeHandler">
                                            <xsl:with-param name="fType" select="."/>
                                            <xsl:with-param name="fldNode" select=".."/>
                                        </xsl:call-template>
                                </xsl:if>
                            </xsl:for-each>
                        </fieldset>
                    </div>       
                    <div class="DIVColumnOne">
                        <fieldset class="FSTcell"><legend></legend>
                             <xsl:for-each select="SUMBLOCK[@TABPAGE = 'QUERY']/FIELD[TYPE!='HIDDEN']/TYPE">
                                <xsl:variable name="pos" select="position()"/>
                                <xsl:variable name="dbt" select="../../../SUMMARY_DATA_BLK"/>
                                <xsl:variable name="dbc" select="../NAME"/>
                                <xsl:variable name="fldName" select="../NAME"/>
                                <xsl:if test="($pos mod 2 = 0) and $pos &lt; 15">
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
                    </xsl:if>                    
                </div>
            </xsl:if>
        </fieldset>
       </xsl:template>
       
       <xsl:template name="ResultProcess"> 
            <xsl:variable name="spanCnt">
                <xsl:value-of select="count(SUMBLOCK[@TABPAGE = 'RESULT']/FIELD)"/>
            </xsl:variable>
                   <DIV id="QryRslts" class="DIVtblbox1" style="width: 786px; height:200px; overflow:scroll" onkeydown="return handleSumkeys(event)" >
                        <TABLE class="TBLone" ID="TBL_QryRslts" cellspacing="0" cellpadding="0" border="0" width = "100%" summary="{$summary}">
                            <colgroup span="{$spanCnt}"></colgroup>
                            <THEAD> 
                                <tr>
                                    <td colspan="{$spanCnt}" id="Table_Options"> 
                                        <div id="TblInnerDiv" style="width:100%">
                                            <label class="LBLnw" title="{$recordsPerPage_SummaryAudit}" for="">
                                                <xsl:value-of select="$recordsPerPage_SummaryAudit"/>
                                                <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                                            </label>                            
                                            <SELECT CLASS="SELstd" NAME="Records" title="{$recordsPerPage_SummaryAudit}" TYPE="number" SIZE="" MAXLENGTH="3">
                                                <OPTION VALUE="15">15</OPTION>
                                                <OPTION VALUE="25">25</OPTION>
                                                <OPTION VALUE="50">50</OPTION>
                                            </SELECT> 
                                            <button class="BTNimgD" title="{$first}" name="navFirst" tabindex="-1" onclick="doNavigate(gcNAV_FIRST, event)" ><span tabindex="-1" class="ICOfirst"></span></button>
                                            <button class="BTNimgD" title="{$previous}" name="navPrev" tabindex="-1" onclick="doNavigate(gcNAV_PREVIOUS, event)" ><span tabindex="-1" class="ICOprevious"></span></button>
                                            <span class="SPNtext" id="CurPage" name="CurPage">1</span>
                                            <span class="SPNtext" id="ofLabel">
                                                <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                                                <xsl:value-of select="$of_SummaryAudit"/>
                                                <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                                            </span>
                                            <span class="SPNtext" id="TotPgCnt" name="TotPgCnt">1</span> 
                                            <button class="BTNimgD"  title="{$next}" name="navNext" tabindex="-1" onclick="doNavigate(gcNAV_NEXT, event)"><span tabindex="-1" class="ICOnext"></span></button>
                                            <button class="BTNimgD"  title="{$last}" name="navLast" tabindex="-1" onclick="doNavigate(gcNAV_LAST, event)"><span tabindex="-1" class="ICOlast"></span></button>
                                            <label class="LBLinv" for="goto" ><xsl:value-of select="$gotoPage_SummaryAudit"/></label>
                                            <input class="TXTstd" id="goto" name="gotopage" READONLY="true" size="1" type="text"></input>
                                            <button class="BTNtextD" onclick="goToPage(event)" disabled="true" name="go" onkeydown="return handleSumkeys(event)" ><xsl:value-of select="$gotoPage_SummaryAudit"/></button>
                                        </div>
                                    </td>
                                </tr>
                                <TR onkeydown="return fnHandleSumTH(event)">
                                    <!--<xsl:if test="TYPE = 'B' or TYPE = 'U'">-->
                                        <TH  class="TBLoneTH1" scope="col" nowrap="nowrap">
                                            <label class="LBLauto" for="RSLT_CHKBOX"><span class="LBLinv"><xsl:value-of select="$select_all_rows"/></span><INPUT id="RSLT_CHKBOX" TYPE="CHECKBOX" NAME="RSLT_CHKBOX" class="CHKstd" onclick="fnCheckUncheckAll()" disabled="true" title="{$select_all_rows}"/></label>
                                        </TH>
                                    <!--</xsl:if>-->
                                    
                                    <xsl:for-each select="SUMBLOCK[@TABPAGE = 'RESULT']/FIELD">
                                        <xsl:variable name="dbt" select="../../SUMMARY_DATA_BLK"/>
                                        <xsl:variable name="dbc" select="NAME"/>
                                        <xsl:variable name="fldName" select="NAME"/>
                                                <xsl:variable name="fldNode" select="."/>                                                
                                                <TH class="TBLoneTH" TYPE="{$fldNode/TYPE}"  name="{$fldName}" tabIndex = "0" nowrap="nowrap" scope="col" order="asc">
                                                    <xsl:attribute name="ID"><xsl:value-of select="concat($dbt,'__',$dbc)"/></xsl:attribute>
                                                    <xsl:attribute name="NAME"><xsl:value-of select="$fldName"/></xsl:attribute>
                                                    <xsl:attribute name="DBT"><xsl:value-of select="$dbt"/></xsl:attribute>
                                                    <xsl:attribute name="DBC"><xsl:value-of select="$dbc"/></xsl:attribute>
                                                    <xsl:attribute name="DTYPE"><xsl:value-of select="$fldNode/DTYPE"/></xsl:attribute>
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
                                                    <A class="Astd"  href="#" onclick='fnSortRecs(event)' order="ASC" onkeydown="return fnhandleSubScrBtn(event)">
                                                        <SPAN class="SPNup hide">
                                                            <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                                                            <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                                                            <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                                                            <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                                                        </SPAN>
                                                        <xsl:value-of select="$fldNode/LBL"/>
                                                    </A>
                                                </TH>

                                    </xsl:for-each>
                                </TR>
                            </THEAD>
                        <TBODY>
                            <xsl:call-template name="TRLOOP"></xsl:call-template>
                        </TBODY>
                    </TABLE>
                </DIV>
    </xsl:template>
    
    
    <xsl:template name="TRLOOP">
    
        <xsl:param name="count" select="0"/>
        <xsl:if test="$count &lt; 15">
            <xsl:variable name="modval" select="($count mod 2)" />    
            <xsl:if test="$modval = 0">            
                <TR  class="TBLoneTR" onblur="this.className='TBLoneTR'" onmouseover="this.className='TBLoneTRhover'" onfocus="this.className='TBLoneTRhover'" onmouseout="this.className='TBLoneTR'" ondblclick="fnShowDetail({$count}, event)" onClick="fnSelCheckBox(event, {$count})" oncontextmenu="fnShowContextMenu()" onkeydown=" return fnHandleSumRslt({$count}, event)">
                    <!--<xsl:if test="TYPE = 'B' or TYPE = 'U'">-->
                      <!--  <TD class="TBLoneTD1" width="10px">-->
                      <TD class="TBLoneTD1" scope="row">
                            <label class="LBLauto" for="RSLT_CHKBOX{$count}"><span class="LBLinv"><xsl:value-of select="concat($select_row,$count)"/></span><INPUT class="CHKstd" type="checkbox" name="RSLT_CHKBOX" id="RSLT_CHKBOX{$count}" onclick="fnToggleChkBox(this)" disabled="true" title="{concat($select_row,$count)}"/></label>
                        </TD>
                    <!--</xsl:if>-->
                    <xsl:for-each select="SUMBLOCK[@TABPAGE = 'RESULT']/FIELD">
                        <xsl:variable name="fldName" select="NAME"/>
                        <xsl:variable name="fldType" select="TYPE"/>
                        <xsl:if test="TYPE = 'AMOUNT' or DTYPE = 'NUMBER'">
                            <TD class="numeric" name="{$fldName}" type="{$fldType}" onkeydown='fnShowDetail_key({$count}, event)'>
                                <a href="#;return false" class='Astd' tabindex ='-1'>
                                    <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                                </a>
                            </TD>
                        </xsl:if>
                        <xsl:if test="count(TYPE) = 0 or (count(TYPE) &gt; 0 and TYPE != 'AMOUNT' and DTYPE != 'NUMBER')">
                            <TD name="{$fldName}" type="{$fldType}" onkeydown='fnShowDetail_key({$count}, event)'>
                                <xsl:if test="TYPE = 'RADIO' or TYPE = 'SELECT' or TYPE = 'CHECKBOX'">
                                    <xsl:attribute name="type">
                                        <xsl:text>ABV</xsl:text>
                                    </xsl:attribute>
                                </xsl:if>
                                <a href="#;return false" class='Astd' tabindex ='-1'>
                                    <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                                </a>
                            </TD>
                        </xsl:if>
                    </xsl:for-each>
                </TR>
            </xsl:if>
            <xsl:if test="$modval = 1">           
                <TR class="TBLoneTRalt" onblur="this.className='TBLoneTRalt'" onmouseover="this.className='TBLoneTRhover'" onfocus="this.className='TBLoneTRhover'" onmouseout="this.className='TBLoneTRalt'" ondblclick="fnShowDetail({$count}, event)" onClick="fnSelCheckBox(event, {$count})" oncontextmenu="fnShowContextMenu(event)" onkeydown="return fnHandleSumRslt({$count}, event)">
                    <!--<xsl:if test="TYPE = 'B' or TYPE = 'U'">-->
                        <!--<TD class="TBLoneTD1" width="10px">-->
                        <TD class="TBLoneTD1" scope="row" >
                            <label class="LBLauto" for="RSLT_CHKBOX{$count}"><span class="LBLinv"><xsl:value-of select="concat($select_row,$count)"/></span><INPUT class="CHKstd" type="checkbox" name="RSLT_CHKBOX" id="RSLT_CHKBOX{$count}" onclick="fnToggleChkBox(this)" disabled="true" title="{concat($select_row,$count)}"/></label>
                        </TD>
                    <!--</xsl:if>-->
                    <xsl:for-each select="SUMBLOCK[@TABPAGE = 'RESULT']/FIELD">
                        <xsl:variable name="fldName" select="NAME"/>
                        <xsl:variable name="fldType" select="TYPE"/>
                        <xsl:if test="TYPE = 'AMOUNT' or DTYPE = 'NUMBER'">
                            <TD class="numeric" name="{$fldName}" type="{$fldType}" onkeydown='fnShowDetail_key({$count}, event)'>
                                <a href="#;return false" class="Astd" tabindex ='-1'>
                                    <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                                </a>
                            </TD>
                        </xsl:if>
                        <xsl:if test="count(TYPE) = 0 or (count(TYPE) &gt; 0 and TYPE != 'AMOUNT' and DTYPE != 'NUMBER')">
                            <TD name="{$fldName}" type="{$fldType}" onkeydown='fnShowDetail_key({$count}, event)'>
                                <xsl:if test="TYPE = 'RADIO' or TYPE = 'SELECT' or TYPE = 'CHECKBOX'">
                                    <xsl:attribute name="type">
                                        <xsl:text>ABV</xsl:text>
                                    </xsl:attribute>
                                </xsl:if>
                                <a href="#;return false" class="Astd" tabindex ='-1'>
                                    <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                                </a>
                            </TD>
                        </xsl:if>
                    </xsl:for-each>
                </TR>                
            </xsl:if>
    
            <xsl:call-template name="TRLOOP">
                <xsl:with-param name="count" select="$count + 1"/>
            </xsl:call-template>
        </xsl:if>
  </xsl:template>
  
  
  <xsl:template name="generateScript">
    <script type="text/javascript" DEFER="DEFER">
        summaryScreen = 'Y';
        gscrPos = 'template';
        g_scrType = 'M';
        <xsl:if test="count(@TMP_SCR_TYPE) &gt; 0 and @TMP_SCR_TYPE = 'L'">
        g_scrType = 'L';
        </xsl:if>
        //imgpath = "<xsl:value-of select="$imgPath_XSL"/>";
        l_LablesArr = new Array();
        OptionValue = new Array();
        fieldType = new Array();
        relatedField   = new Array();
 
         <xsl:for-each select="SUMBLOCK[@TABPAGE='RESULT']/FIELD">
                <xsl:variable name="fName"><xsl:value-of select="NAME"/></xsl:variable>
                <xsl:variable name="fNameTmp"><xsl:value-of select="concat('&quot;', $fName , '&quot;')"/></xsl:variable>
                <xsl:if test="TYPE = 'SELECT'">
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
  
</xsl:stylesheet>
