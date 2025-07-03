<?xml version="1.0"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:param name="funcId"/>
    <xsl:param name="tablename"/>
    <xsl:param name="XslLabels"/>
    <xsl:template match="/">
        <xsl:apply-templates select="FORM"/>
    </xsl:template>
    
    <xsl:template match="FORM">
        <xsl:apply-templates select="SUMMARY"/>
    </xsl:template>
    
    <xsl:template match="SUMMARY">
        <xsl:apply-templates select="SUMBLOCK"/>
    </xsl:template>
    <xsl:template match="SUMBLOCK">
        <table id="{$tablename}" width="100%"  cellspacing="1" cellpadding="0" class="widgetonetbl colw" summary="Category1">
            <tbody>
                <tr>
                    <xsl:apply-templates select="FIELD" mode="th"/>
                </tr>
                <tr>
                    <xsl:apply-templates select="FIELD" mode="td"/>
                </tr>
                <tr>
                    <xsl:apply-templates select="FIELD" mode="td"/>
                </tr>
                <tr>
                    <xsl:apply-templates select="FIELD" mode="td"/>
                </tr>
                <tr>
                    <xsl:apply-templates select="FIELD" mode="td"/>
                </tr>
                <tr>
                    <xsl:apply-templates select="FIELD" mode="td"/>
                </tr>
            </tbody>
        </table>
        <span class="bl"></span> <span class="br"></span>
        <xsl:call-template name="generateScript"/>
    </xsl:template> 
    
    <xsl:template match="FIELD" mode="th">
        <th scope="col"><xsl:value-of select="LBL"/></th>
    </xsl:template>
    
    <xsl:template match="FIELD" mode="td">
        <xsl:variable name="fldName" select="NAME"/>
        <xsl:variable name="fldType" select="TYPE"/>
        <xsl:if test="TYPE = 'AMOUNT' or (TYPE = 'TEXT' and DTYPE = 'NUMBER')">
            <td name="{$fldName}" type="{$fldType}" scope="row" class="numeric">&#160;</td>
        </xsl:if>
        <xsl:if test="TYPE != 'AMOUNT' and DTYPE != 'NUMBER'">
            <td name="{$fldName}" type="{$fldType}" scope="row">&#160;</td>
        </xsl:if>
    </xsl:template>
     
    <xsl:template name="generateScript">
        <script type="text/javascript" DEFER="DEFER">
            summaryScreen = 'Y';
            gscrPos = 'template';
            g_scrType = 'M';
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
        <!--<noscript>
            <xsl:value-of select="$noScript"/>
        </noscript>-->
    </xsl:template>

    <!-- Start of ExtLabels.xsl -->
    <xsl:variable name="export_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_EXPORT~~'), '@@')" />
    <xsl:variable name="advanced_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_ADVANCED~~'), '@@')" />
    <xsl:variable name="search_SummaryAudit" select="substring-before(substring-after($XslLabels, 'LBL_SEARCH~~'), '@@')" />   
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
       
</xsl:stylesheet>