<?xml version="1.0"?>
<!--

Author: HITESH VERMA

-->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html"/>
    <xsl:param name="screen"/>
    <xsl:param name="functionId"/>
    <xsl:param name="uiXML"/>
    <xsl:param name="imgPath"/>
    <xsl:param name="displaySize"/>
    <xsl:param name="thirdChar"/>
    <xsl:param name="XslLabels"/>
    <xsl:param name="applicationName"/>
    <xsl:param name="noScript"/>
    <xsl:param name="CurTabId"/>
    <xsl:param name="fetchSize"/>
    <xsl:param name="tablename"/>
<!-- Start of ExtLabels.xsl -->
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
   <!--<xsl:variable name="noScript" select="substring-before(substring-after($XslLabels, 'LBL_NOSCRIPT_LABEL~~'), '@@')" /> Already coming from parameters -->
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
   <xsl:variable name="select_all_rows" select="substring-before(substring-after($XslLabels, 'LBL_SELECT_ALL_ROWS~~'), '@@')" />
   <xsl:variable name="select_row" select="substring-before(substring-after($XslLabels, 'LBL_SELECT_ROW~~'), '@@')" />
   <xsl:variable name="reject" select="substring-before(substring-after($XslLabels, 'LBL_REJECT~~'), '@@')" />
   <xsl:variable name="calendar" select="substring-before(substring-after($XslLabels, 'LBL_CALENDAR~~'), '@@')" />
   <xsl:variable name="page_footer" select="substring-before(substring-after($XslLabels, 'LBL_PAGE_FOOTER~~'), '@@')" />
   <xsl:variable name="empty_col" select="substring-before(substring-after($XslLabels, 'LBL_EMPTY_COLUMN~~'), '@@')" />
   <xsl:variable name="end_table" select="substring-before(substring-after($XslLabels, 'LBL_END_TABLE~~'), '@@')" />
<!-- End of ExtLabels.xsl -->

<!-- Start of ExtSection.xsl -->
    
    <!--Start of ExtSubPartition.xsl-->
<xsl:template name="sprtHandler">
    
        <xsl:param name="subpartCount" select="."/>
        <xsl:param name="SPRT_Index" select="."/>
        <xsl:param name="footer" select="."/>
    
        <xsl:if test="$footer != 'Y'">
        
            <xsl:if test="$SPRT_Index &lt;= $subpartCount">
                <DIV class="DIVSubColumnOne">
                    <xsl:call-template name="FldSetTypeHandler">
                        <xsl:with-param name="sprtReqd" select="'Y'"/>
                        <xsl:with-param name="SPRT_Index" select="$SPRT_Index"/>
                    </xsl:call-template>
                </DIV>
                <xsl:call-template name="sprtHandler">
                    <xsl:with-param name="SPRT_Index" select="$SPRT_Index + 1"/>
                    <xsl:with-param name="subpartCount" select="$subpartCount"/>
                    <xsl:with-param name="footer" select="'N'"/>
                </xsl:call-template>
            </xsl:if>
        </xsl:if>
        
        <xsl:if test="$footer = 'Y'">
            <xsl:if test="$SPRT_Index &lt;= $subpartCount">
                <!--<td>--><fieldset class="FSTcell" block="{./BLOCK}" type="{@TYPE}" view="{@VIEW}">
        
             <xsl:if test="LBL != ''">
                <xsl:attribute name = "class">
                    <xsl:value-of select = "'FSTstd'"/>
                </xsl:attribute>
            </xsl:if>
        
            <legend><xsl:value-of select="LBL"/></legend>
                    <xsl:call-template name="FldSetTypeHandler">
                        <xsl:with-param name="sprtReqd" select="'Y'"/>
                        <xsl:with-param name="SPRT_Index" select="$SPRT_Index"/>
                    </xsl:call-template>
                <!--</td>--></fieldset>
                <xsl:call-template name="sprtHandler">
                    <xsl:with-param name="footer" select="'Y'"/>
                    <xsl:with-param name="SPRT_Index" select="$SPRT_Index + 1"/>
                    <xsl:with-param name="subpartCount" select="$subpartCount"/>
                </xsl:call-template>
            </xsl:if>
        </xsl:if>
        
    </xsl:template>
    <!--End of ExtSubPartition.xsl-->
    
    <xsl:template name="MEHandlerDashboard">
        <xsl:variable name="spanCnt">
            <xsl:value-of select="count(FIELD)"/>
        </xsl:variable>
        <TABLE id="{$tablename}" width="100%"  cellspacing="1" cellpadding="0" class="widgetonetbl colw" summary="Category1">
            <colgroup span="{$spanCnt}"></colgroup>
            <THEAD> 
                <TR onkeydown="return fnHandleSumTH(event)">
                    <xsl:for-each select="FIELD">
                        <xsl:variable name="dbt" select="../BLOCK"/>
                        <xsl:variable name="dbc" select="NAME"/>
                        <xsl:variable name="fldName" select="NAME"/>
                        <xsl:variable name="fldNode" select="."/>                                                
                        <TH  TYPE="{$fldNode/TYPE}"  name="{$fldName}" scope="col" order="asc">
                            <!--<xsl:attribute name="ID"><xsl:value-of select="concat($dbt,'__',$dbc)"/></xsl:attribute>-->
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
                            <xsl:value-of select="$fldNode/LBL"/>
                            <!--<A href="#" onclick='fnSortRecs(event)' order="ASC" onkeydown="return fnhandleSubScrBtn(event)">
                                <SPAN class="SPNup hide">
                                    <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                                    <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                                    <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                                    <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                                </SPAN>
                                <xsl:value-of select="$fldNode/LBL"/>
                            </A>-->
                        </TH>
                    </xsl:for-each>
                </TR>
            </THEAD>
            <TBODY>
                <xsl:call-template name="TRLOOP">
                    <xsl:with-param name="count" select="0"/>
                </xsl:call-template>
            </TBODY>
        </TABLE>
    </xsl:template>
    
    <xsl:template name="TRLOOP">
        <xsl:param name="count" select="."/>
        <xsl:if test="$count &lt; $fetchSize">
            <TR>
                <xsl:for-each select="FIELD">
                    <xsl:variable name="fldName" select="NAME"/>
                    <xsl:variable name="fldType" select="TYPE"/>
                    <xsl:if test="TYPE = 'AMOUNT' or DTYPE = 'NUMBER'">
                        <TD scope="row" class="numeric" name="{$fldName}" type="{$fldType}">
                            <xsl:if test="count(LINK) &gt; 0">
                                <a href="#;return false" tabindex ='-1'>
                                    <xsl:if test="LINK/TYPE = 'S'">
                                        <xsl:attribute name="onclick">
                                            <xsl:text>fnShowDetailScreen(this,'</xsl:text>
                                            <xsl:value-of select="LINK/FID"/>
                                            <xsl:text>', event)</xsl:text>
                                        </xsl:attribute>
                                    </xsl:if>
                                    <xsl:if test="LINK/TYPE = 'C'">
                                        <xsl:attribute name="onclick">
                                            <xsl:text>fnShowDashboardRow(this,event)</xsl:text>
                                        </xsl:attribute>
                                    </xsl:if>
                                    <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                                </a>
                            </xsl:if>
                            <xsl:if test="count(LINK) = 0">
                                <span><xsl:text disable-output-escaping="yes">&#160;</xsl:text></span>
                            </xsl:if>
                        </TD>
                    </xsl:if>
                    <xsl:if test="count(TYPE) = 0 or (count(TYPE) &gt; 0 and TYPE != 'AMOUNT' and DTYPE != 'NUMBER')">
                        <TD  scope="row" name="{$fldName}" type="{$fldType}" >
                            <xsl:if test="TYPE = 'RADIO' or TYPE = 'SELECT' or TYPE = 'CHECKBOX'">
                                <xsl:attribute name="type">
                                    <xsl:text>ABV</xsl:text>
                                </xsl:attribute>
                            </xsl:if>
                            <xsl:if test="count(LINK) &gt; 0">
                                <a href="#;return false" tabindex ='-1'>
                                    <xsl:if test="LINK/TYPE = 'S'">
                                        <xsl:attribute name="onclick">
                                            <xsl:text>fnShowDetailScreen(this,'</xsl:text>
                                            <xsl:value-of select="LINK/FID"/>
                                            <xsl:text>', event)</xsl:text>
                                        </xsl:attribute>
                                    </xsl:if>
                                    <xsl:if test="LINK/TYPE = 'C'">
                                        <xsl:attribute name="onclick">
                                            <xsl:text>fnShowDashboardRow(this,event)</xsl:text>
                                        </xsl:attribute>
                                    </xsl:if>
                                    <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                                </a>
                            </xsl:if>
                            <xsl:if test="count(LINK) = 0">
                                <span><xsl:text disable-output-escaping="yes">&#160;</xsl:text></span>
                            </xsl:if>
                        </TD>
                    </xsl:if>
                </xsl:for-each>
            </TR>
            <xsl:call-template name="TRLOOP">
                <xsl:with-param name="count" select="$count + 1"/>
            </xsl:call-template>
        </xsl:if>
    </xsl:template>

    <!--Start of ExtFldsetType.xsl-->

    <!-- Start of ExtMultiple.xsl -->
    <xsl:template name="MEHandler">
        <xsl:param name="partWidth" select="."/>
        <xsl:variable name="halfWidth" select="(1 div 2)"/>
        <xsl:variable name="twoThirdWidth" select="(2 div 3)"/>
        <xsl:variable name="multipleWidth">
            <xsl:value-of select="$twoThirdWidth"/>
        </xsl:variable>
        <xsl:variable name="multipleHeight">
            <xsl:choose>
                <xsl:when test="normalize-space(./HEIGHT) = ''">
                    <xsl:value-of select="150"/>
                </xsl:when>
                <xsl:when test="string(number(./HEIGHT)) = 'NaN'">
                    <xsl:value-of select="150"/>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:value-of select="string(number(./HEIGHT))"/>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:variable>
        <div name="dataContainer" id="dataContainer_{./BLOCK}">
            <!--<xsl:variable name="l_scr_type" select="/FORM/SCREEN[@NAME=$screen]/@TMP_SCR_TYPE" />-->
            <xsl:choose>
                <xsl:when test="count(@HIDDEN) &gt; 0 and @HIDDEN='Y'">
                    <xsl:attribute name="class">
                        <xsl:value-of select="'dispNone'" />
                    </xsl:attribute>
                </xsl:when>
                <xsl:when test="$partWidth = '100' and $l_scr_type='L'"> 
                    <xsl:attribute name="class">
                        <xsl:value-of select="'DIVMultipleBig'" />
                    </xsl:attribute>
                </xsl:when>
                <xsl:when test="$partWidth = '100' and $l_scr_type!='L'"> 
                    <xsl:attribute name="class">
                        <xsl:value-of select="'DIVMultipleMedium'" />
                    </xsl:attribute>
                </xsl:when>
                <xsl:when test="$partWidth = '66'">
                    <xsl:attribute name="class">
                        <xsl:value-of select="'DIVMultipleMedium'" />
                    </xsl:attribute>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:attribute name="class">
                        <xsl:value-of select="'DIVMultipleSmall'" />
                    </xsl:attribute>
                </xsl:otherwise>
            </xsl:choose>
        	<div class="DIVmultiplebox">
                    <h2 class="hh4"><xsl:value-of select= "./LBL"/></h2>
	            <div id="tableContainer" style="Height:{$multipleHeight}px;" onscroll="toggleSelectBoxes(this,'{./BLOCK}Header')">
	                <xsl:choose>
	                    <xsl:when test="$partWidth = '100' and $l_scr_type='L'"> 
	                        <xsl:attribute name="class">
	                            <xsl:value-of select="'DIVMultipleBigInner'" />
	                        </xsl:attribute>
	                    </xsl:when>
	                    <xsl:when test="$partWidth = '100' and $l_scr_type!='L'"> 
	                        <xsl:attribute name="class">
	                            <xsl:value-of select="'DIVMultipleMediumInner'" />
	                        </xsl:attribute>
	                    </xsl:when>
	                    <xsl:when test="$partWidth = '66'">
	                        <xsl:attribute name="class">
	                            <xsl:value-of select="'DIVMultipleMediumInner'" />
	                        </xsl:attribute>
	                    </xsl:when>
	                    <xsl:otherwise>
	                        <xsl:attribute name="class">
	                            <xsl:value-of select="'DIVMultipleSmallInner'" />
	                        </xsl:attribute>
	                    </xsl:otherwise>
	                </xsl:choose>
	                
	                <table border="0" cellspacing="0" cellpadding="0" ID="{./BLOCK}" caption="{./LBL}" class="TBLgrid" type="ME" summary="{./LBL}" onkeydown="return addRowShortcut(this, event);">
	                <xsl:attribute name="DBT">
	                    <xsl:value-of select="./BLOCK"/>
	                </xsl:attribute>
	                <xsl:attribute name="pgsize">
	                    <xsl:if test="count(./PGSIZE) = 0">
	                        <xsl:value-of select= "15"/>
	                    </xsl:if>
	                    <xsl:if test="count(./PGSIZE) != 0">
	                        <xsl:value-of select= "./PGSIZE"/>
	                    </xsl:if>
	                </xsl:attribute>
	                <xsl:apply-templates select="EVENT" mode="template"/>
	                
	                <xsl:call-template name="MultipleHandler_tmp">
	                    <xsl:with-param name="curr_blk" select="."/>
	                    <xsl:with-param name="mWidth" select="$multipleWidth"/>
	                    <xsl:with-param name="mHeight" select="$multipleHeight"/>
	                    <xsl:with-param name="partWidth" select="$partWidth"/>
	                </xsl:call-template>
	                </table>
	            </div>
            </div>
        </div>
    </xsl:template>
    
    <xsl:template name="MultipleHandler_Head_tmp" >
        <xsl:param name="curr_blk" select="."/>
        <xsl:param name="partWidth" select="."/>
        <xsl:variable name="mHgt">
          <xsl:choose>
            <xsl:when test="normalize-space($curr_blk/HEIGHT) = ''">
              <xsl:value-of select="150"/>
            </xsl:when>
            <xsl:when test="string(number($curr_blk/HEIGHT)) = 'NaN'">
              <xsl:value-of select="150"/>
            </xsl:when>
            <xsl:otherwise>
              <xsl:value-of select="normalize-space($curr_blk/HEIGHT)"/>
            </xsl:otherwise>
          </xsl:choose>
        </xsl:variable>
        <!--Pagination of ME -->
        <!--<div class="DIVpage">
            <span class="DIVpageH">-->
        <div class="DIVgrid">
            <span class="Fleft">
                <span class="FleftBtns">                             
                    <button class="BTNicon2D" title="{$first}" name="nFirst__{$curr_blk/BLOCK}" id="nFirst__{$curr_blk/BLOCK}" tabindex="-1" onclick="Navigate(N_FIRST,'{$curr_blk/BLOCK}')" type="navBtn" disabled="disabled">
                       <span tabindex="-1" class="ICOfirst">
                        <span class="LBLinv"><xsl:value-of select = "$first"/></span>
                       </span>   
                    </button>					
                    <button class="BTNicon2D" title="{$previous}" name="nPrev__{$curr_blk/BLOCK}" id="nPrev__{$curr_blk/BLOCK}" tabindex="-1" onclick="Navigate(N_PREVIOUS,'{$curr_blk/BLOCK}')" type="navBtn" disabled="disabled">
                        <span tabindex="-1" class="ICOprevious">
                         <span class="LBLinv"><xsl:value-of select = "$previous"/></span>
                        </span>
                    </button>
                    <span id= "CurrPage__{$curr_blk/BLOCK}" name="CurrPage__{$curr_blk/BLOCK}" class="SPNtext">1</span>
                    <span class="SPNtext">
                        <xsl:value-of select="$of_SummaryAudit"/>
                    </span>
                    <span id ="TotPage__{$curr_blk/BLOCK}" name="TotPage__{$curr_blk/BLOCK}" class="SPNtext">1</span><span><xsl:text disable-output-escaping="yes">&#160;</xsl:text></span>
                    <button class="BTNicon2D" title="{$next}" name="nNext__{$curr_blk/BLOCK}" id="nNext__{$curr_blk/BLOCK}" tabindex="-1" onclick="Navigate(N_NEXT,'{$curr_blk/BLOCK}')" type="navBtn" disabled="disabled">
                        <span tabindex="-1" class="ICOnext">
                         <span class="LBLinv"><xsl:value-of select = "$next"/></span>
                        </span>
                    </button>
                    <button class="BTNicon2D" title="{$last}" name="nLast__{$curr_blk/BLOCK}" id="nLast__{$curr_blk/BLOCK}" tabindex="-1" onclick="Navigate(N_LAST,'{$curr_blk/BLOCK}')" type="navBtn" disabled="disabled">
                        <span tabindex="-1" class="ICOlast">
                        <span class="LBLinv"><xsl:value-of select = "$last"/></span>
                        </span>
                    </button>
                </span>            
                <label class="LBLinv" for="goto"></label><input id="goto__{$curr_blk/BLOCK}"  title="{$gotoPage_SummaryAudit}" type="text" size="1" class="TXTro" value="" READONLY="true" />
                <button class="BTNtextD" title="{$gotoPage_SummaryAudit}" name="go__{$curr_blk/BLOCK}" id="go__{$curr_blk/BLOCK}" value="Go" onclick="Navigate(N_GOTO,'{$curr_blk/BLOCK}')" disabled="true">
                    <xsl:value-of select="$gotoPage_SummaryAudit"/>                                  
                </button>
            </span>        
            <xsl:if test="count($curr_blk/READ_ONLY) = 0 or  (count($curr_blk/READ_ONLY) &gt; 0 and $curr_blk/READ_ONLY != -1)">
                <button class="BTNimgD" name="cmdAddRow_{$curr_blk/BLOCK}" id="cmdAddRow_{$curr_blk/BLOCK}" tabindex="-1" onClick="fnAddRow('{$curr_blk/BLOCK}')" title="{$add_row}" disabled = "true">
                   <span tabindex="-1" class="ICOadd">
                   <span class="LBLinv"><xsl:value-of select = "$add_row"/></span>
                   </span>
                </button>
                <button class="BTNimgD"  name="cmdDelRow_{$curr_blk/BLOCK}" id="cmdDelRow_{$curr_blk/BLOCK}" tabindex="-1" onClick="fnDeleteRow('{$curr_blk/BLOCK}')" title="{$delete_row}" disabled = "true">
                    <span tabindex="-1" class="ICOremove"><span class="LBLinv"><xsl:value-of select = "$delete_row"/></span></span>
                </button>
            </xsl:if>
            <button class="BTNimgD" name="BTN_SINGLE_VIEW_{$curr_blk/BLOCK}" id="BTN_SINGLE_VIEW_{$curr_blk/BLOCK}" tabindex="-1" onClick="fnShowSingleViewForME('{$curr_blk/BLOCK}')" title="{$single_rec_view}" disabled = "true">
                <span tabindex="-1" class="ICOsingleview"><span class="LBLinv"><xsl:value-of select = "$single_rec_view"/></span></span>                 
            </button>
        </div>
    </xsl:template>
    
    <xsl:template name="MultipleHandler_tmp">
        <xsl:param name="curr_blk" select="."/>
        <xsl:param name="mWidth" select="."/>
        <xsl:param name="mHeight" select="."/>
        <xsl:param name="partWidth" select="."/>
        <xsl:variable name="spanCnt">
            <xsl:value-of select="count($curr_blk/FIELD)+2"/>
        </xsl:variable>
        <colgroup span="{$spanCnt}"></colgroup>
        <thead id="{$curr_blk/BLOCK}Header">
            <tr>
            <xsl:if test="count(./BLOCK) &gt;= 1">
                <xsl:attribute name="DBT">
                    <xsl:value-of select="./BLOCK"/>
                </xsl:attribute>
            </xsl:if>
            <th colspan="{$spanCnt}" scope="col" class="Textleft" id="Table_Options">
                <xsl:call-template name="MultipleHandler_Head_tmp">
                    <xsl:with-param name="curr_blk" select="."/>
                    <xsl:with-param name="partWidth" select="$partWidth"/>
                </xsl:call-template>              
            </th>
            </tr>
            <tr>
            <xsl:if test="count(./BLOCK) &gt;= 1">
                <xsl:attribute name="DBT">
                    <xsl:value-of select="./BLOCK"/>
                </xsl:attribute>
            </xsl:if>        
            <th class="THgrid1" scope="col">
                <input type="checkbox" class="CHKstd" id = "{./BLOCK}_CHK_ME" OnClick="fnToggleAllOrNoneME('{./BLOCK}',this, event)" title="{$select_all_rows}"/><span class="LBLinv"><xsl:value-of select="$select_all_rows"/></span>
            </th>
            <xsl:for-each select="$curr_blk/FIELD">
                <xsl:if test="(count(./HIDDEN) &gt;= 1 and ./HIDDEN = -1) or (./TYPE = 'HIDDEN')">
                    <th  class="TDnone"></th>
                </xsl:if>
                <xsl:if test="((count(./HIDDEN) = 1 and ./HIDDEN = 0) or count(./HIDDEN) = 0) and (./TYPE != 'HIDDEN')">
                    <th class="THgrid"  scope="col">                        
                            <xsl:if test="count(./DD) &gt; 0 and ./DD = -1">
                                    <xsl:if test="count(./REQD) = 0 or ./REQD != -1" >
                                        <span class="SPNtext"><xsl:value-of select="./LBL"/>
                                        </span>
                                    </xsl:if>
                                    <xsl:if test="./REQD = -1">
                                        <span class="SPNtext star"><xsl:value-of select="./LBL"/>
                                        </span>
                                    </xsl:if>                      
                            </xsl:if>
                            <xsl:if test="count(./DD) = 0">
                                    <xsl:if test="count(./REQD) = 0 or ./REQD != -1" >
                                        <span class="SPNtext"><xsl:value-of select="./LBL"/></span>
                                    </xsl:if>
                                    <xsl:if test="./REQD = -1">
                                        <span class="SPNtext star"><xsl:value-of select="./LBL"/></span>
                                    </xsl:if>                      
                            </xsl:if>
                    </th>
                </xsl:if>
            </xsl:for-each>
            <th class="THgrid" width="99%"><xsl:text disable-output-escaping="yes">&#160;</xsl:text><span class="LBLinv"><xsl:value-of select="$empty_col"/></span></th>
        </tr>
        </thead>
        <tbody>
            <tr>
                <td class="TDgrid1">
                    <label class="LBLauto">
                    <xsl:attribute name="for">
                        <xsl:value-of select="concat('chkDeleteRow__',./BLOCK)"></xsl:value-of>
                    </xsl:attribute>
                    <span class="LBLinv"><xsl:value-of select="$select_row"/></span>
                    <input name="chkDeleteRow" type="checkbox"  parentDBT="{./BLOCK}" onclick="fnMulipleEntryRow_onClick(event)" title="{$select_row}">
                    <xsl:attribute name="id">
                            <xsl:value-of select="concat('chkDeleteRow__',./BLOCK)"></xsl:value-of>
                        </xsl:attribute>
                    </input>
                    </label>
                </td>
                <xsl:for-each select="./FIELD">
                    <xsl:apply-templates select="TYPE" mode="template"/>
                </xsl:for-each>
                <td class="TDgrid" width="99%"><xsl:text disable-output-escaping="yes">&#160;</xsl:text></td>
            </tr>
        </tbody>
        <tfoot>
            <tr><td colspan="{$spanCnt}" tabindex="0"><span class="LBLinv"><xsl:value-of select = "$end_table"/></span><xsl:text disable-output-escaping="yes">&#160;</xsl:text></td></tr>
        </tfoot>
    </xsl:template>
    <!-- End of ExtMultiple.xsl -->
    <xsl:template name="FldSetTypeHandler">
        <xsl:param name="sprtReqd" select="."/>
        <xsl:param name="SPRT_Index" select="."/>
        
        <xsl:if test="@TYPE = 'SE'">
            <xsl:call-template name="SEHandler">
                <xsl:with-param name="sprtReqd" select="$sprtReqd"/>
                <xsl:with-param name="SPRT_Index" select="$SPRT_Index"/>
            </xsl:call-template>
        </xsl:if>
        
        <xsl:if test="@TYPE = 'ME' and @VIEW='ME'">
            <xsl:if test="count(../../../FIDNAME) &gt; 0">
                <xsl:call-template name="MEHandlerDashboard"/>
            </xsl:if>
            <xsl:if test="count(../../../FIDNAME) &gt; 0">
                <xsl:call-template name="MEHandler">
                    <xsl:with-param name="partWidth" select="../@WIDTH"/>
                </xsl:call-template>
            </xsl:if>
        </xsl:if>
        
        <xsl:if test="@TYPE = 'ME' and @VIEW='SE'">
                <xsl:call-template name="MESVHandler">
                    <xsl:with-param name="sprtReqd" select="$sprtReqd"/>
                    <xsl:with-param name="SPRT_Index" select="$SPRT_Index"/>
                </xsl:call-template>
            </xsl:if>
        
        <xsl:if test="@TYPE = 'VC'">
            <xsl:call-template name="VCHandler"/>
        </xsl:if>
    </xsl:template>
    
    
    <xsl:template name="SEHandler">
        <xsl:param name="sprtReqd" select="."/>
        <xsl:param name="SPRT_Index" select="."/> <!-- Count will indicate the current sp no!-->
        <xsl:if test="$sprtReqd = 'N'">
            <xsl:apply-templates select="FIELD" mode="withoutSubPart">
                <xsl:sort select="@INDEX" data-type="number" order="ascending"/>
            </xsl:apply-templates>
        </xsl:if>
        <xsl:if test="$sprtReqd = 'Y'">
            <xsl:apply-templates select="FIELD[@SPRT = $SPRT_Index]" mode="withSubPart">
                <xsl:sort select="@INDEX" data-type="number" order="ascending"/>
            </xsl:apply-templates>
        </xsl:if>
    </xsl:template>
    
    
    <xsl:template name="MESVHandler">
        <xsl:param name="sprtReqd" select="."/>
        <xsl:param name="SPRT_Index" select="."/>
        <xsl:variable name="blkId" select="./BLOCK"/>
        <xsl:variable name="blockId">
            <xsl:if test="contains($blkId,'_TMP')">
                <xsl:value-of select="substring-before($blkId,'_TMP')"/>
            </xsl:if>
            <xsl:if test="not(contains($blkId,'_TMP'))">
                <xsl:value-of select="$blkId"/>
            </xsl:if>
        </xsl:variable>
        <DIV ID="{$blockId}" type="ME" VIEW="SE">
            <xsl:if test="count(./NAV_BTN_REQ) > 0 and ./NAV_BTN_REQ = 'Y'">
                <xsl:if test="$sprtReqd = 'Y'">
                    <xsl:if test="$SPRT_Index = 1">
                        <xsl:if test="count(./READ_ONLY) > 0 and ./READ_ONLY = -1">
                            <div class="DIVpage" id="MESV_{$blockId}">
                                <button class="BTNicon2D" title="{$previous}" name="BTN_PREV_{$blockId}" onClick="fnMovePrevMESV('{$blockId}')" disabled="disabled">
                                    <span tabindex="-1" class="ICOprevious">
                                    <span class="LBLinv"><xsl:value-of select = "$previous"/></span></span>
                                </button>
                                <span id= "CurrPageSV__{$blockId}" name="CurrPage__{$blockId}" class="SPNtext">1<xsl:text disable-output-escaping="yes">&#160;</xsl:text></span>
                                <span class="SPNtext">
                                    <xsl:value-of select="$of_SummaryAudit"/>
                                </span>
                                <span id ="TotPageSV__{$blockId}" name="TotPage__{$blockId}" class="SPNtext"><xsl:text disable-output-escaping="yes">&#160;</xsl:text>1</span>
                                <button class="BTNicon2D" title="{$next}" name="BTN_NEXT_{$blockId}" onClick="fnMoveNextMESV('{$blockId}')"  disabled="disabled">
                                    <span tabindex="-1" class="ICOnext">
                                     <span class="LBLinv"><xsl:value-of select = "$next"/></span> </span>
                                </button>
                            </div>
                        </xsl:if>
                        <xsl:if test="count(./READ_ONLY) = 0 or ./READ_ONLY = 0">
                            <div class="DIVpage" id="MESV_{$blockId}">
                                <button class="BTNicon2D" title="{$previous}" name="BTN_PREV_{$blockId}" onClick="fnMovePrevMESV('{$blockId}')" disabled="disabled">
                                     <span tabindex="-1" class="ICOprevious">
                                     <span class="LBLinv"><xsl:value-of select = "$previous"/></span></span>
                                </button>
                                <span id= "CurrPageSV__{$blockId}" name="CurrPageSV__{$blockId}" class="SPNtext">1<xsl:text disable-output-escaping="yes">&#160;</xsl:text></span>
                                <span class="SPNtext">
                                    <xsl:value-of select="$of_SummaryAudit"/><xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                                </span>
                                <span id ="TotPageSV__{$blockId}" name="TotPageSV__{$blockId}" class="SPNtext">1</span>
                                <button class="BTNicon2D" title="{$next}" name="BTN_NEXT_{$blockId}" onClick="fnMoveNextMESV('{$blockId}')" disabled="disabled">
                                    <span tabindex="-1" class="ICOnext">
                                     <span class="LBLinv"><xsl:value-of select = "$next"/></span></span>
                                </button>
                                <button class="BTNhide" oldClassName = "BTNimg" title="{$add_row}" name="BTN_ADD_{$blockId}" disabled ="true" onClick="fnAddRowMESV('{$blockId}')">
                                    <span tabindex="-1" class="ICOadd">
                                     <span class="LBLinv"><xsl:value-of select = "$add_row"/></span></span>                                    
                                </button>
                                <button class="BTNhide" oldClassName = "BTNimg"  title="{$delete_row}" name="BTN_REMOVE_{$blockId}" disabled ="true" onClick="fnDelRowMESV('{$blockId}')">
                                    <span tabindex="-1" class="ICOremove"><span class="LBLinv"><xsl:value-of select = "$delete_row"/></span></span>
                                </button>
                            </div>
                        </xsl:if>
                    </xsl:if>
                </xsl:if>
                <xsl:if test="$sprtReqd != 'Y'">
                    <xsl:if test="count(./READ_ONLY) > 0 and ./READ_ONLY = -1">
                        <div class="DIVpage" id="MESV_{$blockId}">
                            <button class="BTNicon2D" title="{$previous}" name="BTN_PREV_{$blockId}" onClick="fnMovePrevMESV('{$blockId}')" disabled="disabled">
                               <span tabindex="-1" class="ICOprevious">
                               <span class="LBLinv"><xsl:value-of select = "$previous"/></span></span>
                            </button>
                            <span id= "CurrPageSV__{$blockId}" name="CurrPageSV__{$blockId}" class="SPNtext">1<xsl:text disable-output-escaping="yes">&#160;</xsl:text></span>
                            <span class="SPNtext">
                                <xsl:value-of select="$of_SummaryAudit"/>
                            </span>
                            <span id ="TotPageSV__{$blockId}" name="TotPageSV__{$blockId}" class="SPNtext"><xsl:text disable-output-escaping="yes">&#160;</xsl:text>1</span>
                            <button class="BTNicon2D" title="{$next}" name="BTN_NEXT_{$blockId}" onClick="fnMoveNextMESV('{$blockId}')" disabled="disabled">
                                 <span tabindex="-1" class="ICOnext">
                                 <span><xsl:value-of select = "$next"/></span></span>
                            </button>
                        </div>
                    </xsl:if>
                    <xsl:if test="count(./READ_ONLY) = 0 or ./READ_ONLY = 0">
                        <div class="DIVpage" id="MESV_{$blockId}">
                            <button class="BTNicon2D" title="{$previous}" name="BTN_PREV_{$blockId}" onClick="fnMovePrevMESV('{$blockId}')" disabled="disabled">
                                 <span tabindex="-1" class="ICOprevious"><span class="LBLinv"><xsl:value-of select = "$previous"/></span></span>
                            </button>
                            <span id= "CurrPageSV__{$blockId}" name="CurrPageSV__{$blockId}" class="SPNtext">1<xsl:text disable-output-escaping="yes">&#160;</xsl:text></span>
                            <span class="SPNtext">
                                <xsl:value-of select="$of_SummaryAudit"/><xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                            </span>
                            <span id ="TotPageSV__{$blockId}" name="TotPageSV__{$blockId}" class="SPNtext">1</span>
                            <button class="BTNicon2D" title="{$next}" name="BTN_NEXT_{$blockId}" onClick="fnMoveNextMESV('{$blockId}')" disabled="disabled">
                                <span tabindex="-1" class="ICOnext">
                                <span class="LBLinv"><xsl:value-of select = "$next"/></span></span>
                            </button>
                            <button class="BTNhide" oldClassName = "BTNimg" title="{$add_row}" name="BTN_ADD_{$blockId}" disabled ="true"  onClick="fnAddRowMESV('{$blockId}')">
                                <span tabindex="-1" class="ICOadd"><span class="LBLinv"><xsl:value-of select = "$add_row"/></span></span>
                            </button>
                            <button class="BTNhide" oldClassName = "BTNimg" title="{$delete_row}" name="BTN_REMOVE_{$blockId}" disabled ="true" onClick="fnDelRowMESV('{$blockId}')">
                                <span tabindex="-1" class="ICOremove"><span class="LBLinv"><xsl:value-of select = "$delete_row"/></span></span>
                            </button>
                        </div>
                    </xsl:if>
                </xsl:if>
                <xsl:call-template name="SEHandler">
                    <xsl:with-param name="sprtReqd" select="$sprtReqd"/>
                    <xsl:with-param name="SPRT_Index" select="$SPRT_Index"/>
                </xsl:call-template>
            </xsl:if>
            <xsl:if test="count(./NAV_BTN_REQ) = 0 or ./NAV_BTN_REQ != 'Y'">
                <xsl:call-template name="SEHandler">
                    <xsl:with-param name="sprtReqd" select="$sprtReqd"/>
                    <xsl:with-param name="SPRT_Index" select="$SPRT_Index"/>
                </xsl:call-template>
            </xsl:if>
        </DIV>
    </xsl:template>
    <xsl:template name="VCHandler">
        <div class="DIVpage" id="DIVVerisonBtns">
            <button class="BTNicon2D" onclick="fnChangeVersion('First')" LABEL_VALUE="" ID="" DBT="" DBC="" DTYPE="" name="BTN_FIRST_VER" title="{$first}">
                <span tabindex="-1" class="ICOfirst">
                 <span class="LBLinv"><xsl:value-of select = "$first"/></span>
                </span>
            </button>
            <button class="BTNicon2D" onclick="fnChangeVersion('Previous')" LABEL_VALUE="" ID="" DBT="" DBC="" DTYPE="" name="BTN_PREV_VER" title="{$previous}">
                <span tabindex="-1" class="ICOprevious">
               <span class="LBLinv"><xsl:value-of select = "$previous"/></span></span>
            </button>
            <xsl:for-each select="./FIELD">
                <xsl:if test="./NAME = 'VERNO'">
                    <label class="LBLstd" for="{../BLOCK}__{./NAME}"></label>
                    <input type="text" class="TEXTPaging" LABEL_VALUE="" ID="{../BLOCK}__{./NAME}" DBT="{../BLOCK}" DBC="{./NAME}" NAME="VERNO" DTYPE="VARCHAR2" REQUIRED="0" size="1">
                        <xsl:if test="normalize-space(./READ_ONLY) = -1">
                            <xsl:attribute name="READONLY">true</xsl:attribute>
                            <xsl:attribute name="READONLY1">true</xsl:attribute>
                        </xsl:if>
                    </input>
                </xsl:if>
            </xsl:for-each>
            <label class="LBLstd" for=""></label>
            <input type="text" class="TEXTPaging" value="{$vernoOfLbl}" size="1" READONLY="true" READONLY1="true"/>
            <xsl:for-each select="./FIELD">
                <xsl:if test="./NAME = 'LATEST_VERNO'">
                    <label class="LBLstd" for="{../BLOCK}__{./NAME}"></label>
                    <input type="text" class="TEXTPaging" LABEL_VALUE="" ID="{../BLOCK}__{./NAME}" DBT="{../BLOCK}" DBC="{./NAME}" NAME="LATEST_VERNO" DTYPE="VARCHAR2" REQUIRED="0" size="1">
                        <xsl:if test="normalize-space(./READ_ONLY) = -1">
                            <xsl:attribute name="READONLY">true</xsl:attribute>
                            <xsl:attribute name="READONLY1">true</xsl:attribute>
                        </xsl:if>
                    </input>
                </xsl:if>
            </xsl:for-each>
            <button class="BTNicon2D" onclick="fnChangeVersion('Next')" LABEL_VALUE="" ID="" DBT="" DBC="" DTYPE="" name="BTN_NEXT_VER" title="{$next}">
                <span class="ICOnext">
                <span class="LBLinv"><xsl:value-of select = "$next"/></span></span>
            </button>
            <button class="BTNicon2D" onclick="fnChangeVersion('Last')" LABEL_VALUE="" ID="" DBT="" DBC="" DTYPE="" name="BTN_LAST_VER" title="{$last}">
                <span class="ICOlast">
                <span class="LBLinv"><xsl:value-of select = "$last"/></span>
                </span>
            </button>
             <xsl:text disable-output-escaping="yes">&#160;</xsl:text>                
            <label class="LBLstd" for=""></label>
            <input id="Goto_version" type="text" size="1" class="TXTstd" value="" disabled="true" />
            <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
            <button class="BTNtextD" title="{$gotoPage_SummaryAudit}" name="BTN_GO_VER" value="Go" onclick="fnChangeVersion('GOTO')" disabled="true">
                <xsl:value-of select="$gotoPage_SummaryAudit"/>                    
            </button>
        </div>
    </xsl:template>
    <!--End of ExtFldsetType.xsl-->
    
    <!--Start of ExtFields.xsl-->
    <xsl:template match="FIELD" mode="hFieldSet" >
        <xsl:apply-templates select="TYPE" mode="template_fldset">
            <xsl:with-param name="l_pos" select="position()"/>
        </xsl:apply-templates>
    </xsl:template>

    <xsl:template match="FIELD" mode="withoutSubPart" >
        <xsl:if test="./TYPE != 'CHECKBOX' and ./TYPE != 'RADIO'">
            <div class="DIVText">
                <xsl:call-template name="dispFields_tmp" />
            </div>
        </xsl:if>
        <xsl:if test="./TYPE = 'RADIO'">
            <div class="DIVRadio" role="group" aria-labelledby="groupidpercentage">
                <xsl:call-template name="dispFields_tmp" />
            </div>
        </xsl:if>
        <xsl:if test="./TYPE = 'CHECKBOX'">
            <div class="DIVCheck">
                <xsl:call-template name="dispFields_tmp" />
            </div>
        </xsl:if>
    </xsl:template>

    <xsl:template match="FIELD" mode="withSubPart">
        <xsl:if test="./TYPE != 'CHECKBOX' and ./TYPE != 'RADIO'">
            <div class="DIVText">
                <xsl:call-template name="dispFields_tmp" />
            </div>
        </xsl:if>
        <xsl:if test="./TYPE = 'RADIO'">
            <div class="DIVRadio" role="group" aria-labelledby="groupidpercentage">
                <xsl:call-template name="dispFields_tmp" />
            </div>
        </xsl:if>
        <xsl:if test="./TYPE = 'CHECKBOX'">
            <div class="DIVCheck" role="group" aria-labelledby="groupidpymt">
                <xsl:call-template name="dispFields_tmp" />
            </div>
        </xsl:if>
    </xsl:template>

    <xsl:template name="dispFields_tmp">
        <xsl:apply-templates select="TYPE" mode="template"/>
    </xsl:template>
    
    <xsl:template match="TYPE[text()='TEXT' or text()='LINK' or text()='AMOUNT' or text()='DATE' or text()='ACCOUNT' or text()='BRANCH' or text()='CURRENCY' or text()='CUSTOMER' or text()='MASK' or text()='RESTRICTED_TEXT' or text()='DATETIME' or text()='DISPMASK']" mode="template">
        <xsl:if test="../../@TYPE != 'ME' or ../../@VIEW = 'SE'">  
            <xsl:choose>
                <xsl:when test="../TYPE = 'AMOUNT' or ../TYPE = 'DATE' or ../TYPE = 'DATETIME' or (../TYPE = 'TEXT' and (../DTYPE = 'NUMBER' or ../DTYPE = 'NUMERIC'))">
                    <xsl:call-template name="dispHiddenLabel_tmp"/>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:call-template name="dispNormalLabel_tmp"/>
                </xsl:otherwise>
            </xsl:choose> 
            <xsl:choose>
                <xsl:when test="../TYPE = 'TEXT' and (../DTYPE = 'NUMBER' or ../DTYPE = 'NUMERIC')">
                    <xsl:call-template name="dispEntityField_tmp" >
                        <xsl:with-param name="EntityType" select="'NUMBERTEXT'"/>
                    </xsl:call-template>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:call-template name="dispEntityField_tmp" >
                        <xsl:with-param name="EntityType" select="../TYPE"/>
                    </xsl:call-template>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:if>
        <xsl:if test="(../../@TYPE = 'ME' and ../../@VIEW != 'SE') or (../../@TYPE = 'ME' and count(../../@VIEW) = 0)"> 
            <td class="TDgrid" nowrap="nowrap">
                <xsl:call-template name="dispHiddenLabel_tmp"/>
                <xsl:choose>
                    <xsl:when test="../TYPE = 'TEXT' and (../DTYPE = 'NUMBER' or ../DTYPE = 'NUMERIC')">
                        <xsl:call-template name="dispEntityField_tmp" >
                            <xsl:with-param name="EntityType" select="'NUMBERTEXT'"/>
                        </xsl:call-template>
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:call-template name="dispEntityField_tmp" >
                            <xsl:with-param name="EntityType" select="../TYPE"/>
                        </xsl:call-template>
                    </xsl:otherwise>
                </xsl:choose>
            </td>
        </xsl:if>
    </xsl:template>
    
    <!-- 13/10/08 OCX Related modification starts -->
    <xsl:template match="TYPE[text()='OCX']" mode="template">
        <xsl:call-template name="dispOCX"/>
    </xsl:template>
    <!-- 13/10/08 OCX Related modification ends -->
    
    <xsl:template match="FIELD/TYPE[text()='RADIO']" mode="template">
        <xsl:if test="../../@TYPE != 'ME' or ../../@VIEW = 'SE'">
            <xsl:variable name="rFldNode" select=".."/>
            <xsl:variable name = "Left_or_Right" select = "$rFldNode/@COL"/>
            <xsl:call-template name="dispRadioLabel_tmp"/>
            <div class="DIVchkrad">
                <xsl:for-each select="../OPTION[@COL=1]">
                    <xsl:sort select="@ROW" data-type="number" order="ascending"/>
                    <xsl:variable name="row" select="@ROW"/>
                    <xsl:apply-templates select="../OPTION[@ROW = $row]" mode="template">
                        <xsl:with-param name = "Left_or_Right" select = "$Left_or_Right"/>   
                        <xsl:with-param name = "row" select = "position()"/>
                    </xsl:apply-templates>
                </xsl:for-each>
            </div>
        </xsl:if>
    </xsl:template>
    
    <xsl:template match="OPTION" mode="template">
        <xsl:param name = "Left_or_Right" select = "."/>
        <xsl:param name = "row" select = "."/>
        <label class="LBLauto">
            <xsl:attribute name="for">
                <xsl:if test="$row != '1'">
                    <xsl:if test="../../BLOCK != ''">
                         <xsl:value-of select="concat(../../BLOCK,'__',../NAME,$row)"/>
                    </xsl:if>
                    <xsl:if test="../BLOCK = ''">
                         <xsl:value-of select="concat(../NAME,$row)"/>
                    </xsl:if>
                </xsl:if>
                <xsl:if test="$row = '1'">
                    <xsl:if test="../../BLOCK != ''">
                         <xsl:value-of select="concat(../../BLOCK,'__',../NAME)"/>
                    </xsl:if>
                    <xsl:if test="../BLOCK = ''">
                         <xsl:value-of select="../NAME"/>
                    </xsl:if>
                </xsl:if>
            </xsl:attribute>
            <input type="radio" class="RADstd" disabled="true"> 
                <xsl:call-template name="ATTR_Handler_tmp">
                    <xsl:with-param name="curr_fld" select=".."/>
                </xsl:call-template>
                <xsl:if test="$row != '1'">
                    <xsl:attribute name="ID">
                        <xsl:if test="../../BLOCK != ''">
                            <xsl:value-of select="concat(../../BLOCK,'__',../NAME,$row)"/>
                        </xsl:if>
                        <xsl:if test="../BLOCK = ''">
                            <xsl:value-of select="concat(../NAME,$row)"/>
                        </xsl:if>
                    </xsl:attribute>
                </xsl:if>
                <xsl:if test = "$Left_or_Right ='1'">
                    <xsl:attribute name = "align">
                      <xsl:value-of select = "'center'"/>
                    </xsl:attribute>
                </xsl:if> 
                <xsl:attribute name="VALUE"><xsl:value-of select = "VALUE"/></xsl:attribute>
                <xsl:if test="count(SELECTED) &gt; 0 and SELECTED=-1">
                    <xsl:attribute name="CHECKED">CHECKED</xsl:attribute>
                    <xsl:attribute name="DEFAULT">yes</xsl:attribute>
                </xsl:if>    
                <xsl:attribute name="LABEL_VALUE">
                    <xsl:value-of select="LBL"/>
                </xsl:attribute>     
            </input>
            <xsl:value-of select="LBL"/>
        </label>
    </xsl:template>   
    
    <xsl:template match="FIELD/TYPE[text()='DESCRIPTION']" mode="template">
        
        <xsl:if test="../../@TYPE != 'ME' or ../../@VIEW = 'SE'">              
            <xsl:call-template name="dispNormalLabel_tmp"/>
            <xsl:call-template name="dispEntityField_tmp" >
                <xsl:with-param name="EntityType" select="../TYPE"/>
            </xsl:call-template>
        </xsl:if>
    </xsl:template>

    <xsl:template match="FIELD/TYPE[text()='CHECKBOX']" mode="template">
        <xsl:if test="../../@TYPE != 'ME' or ../../@VIEW = 'SE'">
             <xsl:if test="../../@ID != 'FLD_AUDIT1'">
                <b class="LBLstd" id="groupidpymt">
                    <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                    <!--<img src="{$imgPath_XSL}/star_disabled.gif" title=""/>-->
                </b>
             </xsl:if>
                <div class="DIVchkrad">
                    <xsl:call-template name="dispCheckboxField_tmp"/>
                </div>
        </xsl:if>
        <xsl:if test="(../../@TYPE = 'ME' and ../../@VIEW != 'SE') or (../../@TYPE = 'ME' and count(../../@VIEW) = 0)">
            <td class="TDgrid" nowrap="nowrap">
                <xsl:call-template name="dispCheckboxField_tmp"/>
            </td>
        </xsl:if>
    </xsl:template>
    
    <xsl:template match="FIELD/TYPE[text()='TEXTAREA']" mode="template">
        
        <xsl:if test="../../@TYPE != 'ME' or ../../@VIEW = 'SE'">
            <xsl:call-template name="dispNormalLabel_tmp"/>
            <xsl:call-template name="dispTextareaField_tmp">
                <xsl:with-param name="position">column</xsl:with-param>                                   
            </xsl:call-template>
        </xsl:if>
    
        <xsl:if test="(../../@TYPE = 'ME' and ../../@VIEW != 'SE') or (../../@TYPE = 'ME' and count(../../@VIEW) = 0)">                     
            <td class="TDgrid" nowrap="nowrap">
                <xsl:call-template name="dispHiddenLabel_tmp"/>
                <xsl:call-template name="dispTextareaField_tmp">
                    <xsl:with-param name="position">column</xsl:with-param>                                   
                </xsl:call-template>
            </td>
        </xsl:if>
    
    </xsl:template>
    
    <xsl:template match="FIELD/TYPE[text()='HIDDEN']" mode="template">
    
        <xsl:if test="(../../@TYPE = 'ME' and ../../@VIEW != 'SE') or (../../@TYPE = 'ME' and count(../../@VIEW) = 0)">              
            <td class="TDnone">
                <label class="LBLinv" for=""></label>
                <INPUT TYPE="HIDDEN">
                <xsl:call-template name="ATTR_Handler_tmp">
                    <xsl:with-param name="curr_fld" select=".."/>
                </xsl:call-template>
                </INPUT>
            </td>
        </xsl:if>
        
        <xsl:if test="../../@TYPE != 'ME' or ../../@VIEW = 'SE'">              
            
                <label class="LBLinv" for=""></label>
                <INPUT TYPE="HIDDEN">
                <xsl:call-template name="ATTR_Handler_tmp">
                    <xsl:with-param name="curr_fld" select=".."/>
                </xsl:call-template>
                </INPUT>
            
        </xsl:if>
    </xsl:template>

    <xsl:template match="FIELD/TYPE[text()='ROSELECT']" mode="template">
        <div class="invisible">
            <xsl:call-template name="dispSelectField_tmp"/>
        </div>
        <LABEL class="LBLstd">
            <xsl:attribute name="for">
                <xsl:value-of select="concat(../../BLOCK,'__',../NAME)"></xsl:value-of>
                <xsl:text>I</xsl:text>
            </xsl:attribute>
            <xsl:value-of select="../LBL"/>
        </LABEL>
        <INPUT class="TXTro" tabIndex="-1" viewMode="Y" INPUT_LOV="N">                       
            <xsl:attribute name="title">
                <xsl:value-of select="../LBL"/>
            </xsl:attribute>
            <xsl:call-template name="ATTR_InputEntity_Handler_tmp">
                <xsl:with-param name="curr_fld" select=".." />
            </xsl:call-template>
            <xsl:attribute name="SIZE">
                <xsl:variable name="strSize">
                    <xsl:for-each select="../OPTION">
                        <xsl:sort select="string-length(.)" order="descending" data-type="number"/>
                        <xsl:if test="position() = 1">
                            <xsl:value-of select="string-length(.)"/>
                        </xsl:if>                        
                    </xsl:for-each>
                </xsl:variable>
                <xsl:value-of select="$strSize"/>
            </xsl:attribute>
        </INPUT>
    </xsl:template>

    <xsl:template name="RequiredFieldHandler_me">
        <xsl:param name="curr_fld" select="."/>
        <xsl:if test="$curr_fld/REQD='-1'">
            <SPAN class="SPANFlag">*</SPAN>
        </xsl:if>
        <xsl:if test="$curr_fld/REQD!='-1'">
            <SPAN class="SPANFlag" style="visibility:hidden;">*</SPAN>
        </xsl:if>
    </xsl:template>
    
    <xsl:template match="FIELD/TYPE[text()='SELECT']" mode="template">
        
        <xsl:if test="../../@TYPE != 'ME' or ../../@VIEW = 'SE'">
            <div class="DIVList" >
                <xsl:call-template name="dispNormalLabel_tmp"/>
                <xsl:call-template name="dispSelectField_tmp"/>
            </div>
        </xsl:if>
        
        <xsl:if test="(../../@TYPE = 'ME' and ../../@VIEW != 'SE') or (../../@TYPE = 'ME' and count(../../@VIEW) = 0)">
            <td>
                <xsl:call-template name="dispSelectField_tmp"/>
            </td>
        </xsl:if>
    </xsl:template>
    
    <xsl:template match="FIELD/TYPE[text()='BUTTON']" mode="template">
        <xsl:choose>
            <xsl:when test="contains(../NAME, 'BTN_NEXT_BLK_') or contains(../NAME, 'BTN_PREV_BLK_') or contains(../NAME, 'BTN_ADD_BLK_') or contains(../NAME, 'BTN_REMOVE_BLK_')">
            </xsl:when>
            <xsl:otherwise>
                <xsl:if test="(../../@TYPE = 'ME' and ../../@VIEW != 'SE') or (../../@TYPE = 'ME' and count(../../@VIEW) = 0)"> 
                    <td class="TDgrid" nowrap="nowrap">
                        <xsl:call-template name="dispButtonField_tmp"/>
                    </td>
                </xsl:if>
                <xsl:if test="../../@TYPE != 'ME' or ../../@VIEW = 'SE'">              
                    <div class="DIVText" > <label class="LBLstd"></label>
                        <xsl:call-template name="dispButtonField_tmp"/>
                    </div>
                </xsl:if>
            </xsl:otherwise>
        </xsl:choose>
        
    </xsl:template>
    
    <xsl:template match="FIELD/TYPE[text()='FILE']" mode="template">
        <xsl:if test="../../@TYPE != 'ME' or ../../@VIEW = 'SE'">
            <xsl:call-template name="dispNormalLabel_tmp"/>
            <xsl:call-template name="dispFileField_tmp"/>
        </xsl:if>
    
        <xsl:if test="(../../@TYPE = 'ME' and ../../@VIEW != 'SE') or (../../@TYPE = 'ME' and count(../../@VIEW) = 0)">
            <td class="TDgrid" nowrap="nowrap">
                <xsl:call-template name="dispFileField_tmp"/>
            </td>
        </xsl:if>
    </xsl:template>
    
    <xsl:template match="FIELD/TYPE[text()='IMG']" mode="template">
        <xsl:if test="../../@TYPE != 'ME' or ../../@VIEW = 'SE'">              
            <xsl:call-template name="dispNormalLabel_tmp"/>
            <xsl:call-template name="dispImgField_tmp"/>
        </xsl:if>
    
        <xsl:if test="(../../@TYPE = 'ME' and ../../@VIEW != 'SE') or (../../@TYPE = 'ME' and count(../../@VIEW) = 0)">                            
            <td class="TDgrid" nowrap="nowrap">
                <xsl:call-template name="dispImgField_tmp"/>
            </td>
        </xsl:if>
    </xsl:template>
    
    <xsl:template match="FIELD/TYPE[text()='PASSWORD']" mode="template">
        <xsl:if test="../../@TYPE != 'ME' or ../../@VIEW = 'SE'">  
            <xsl:call-template name="dispNormalLabel_tmp"/>
            <xsl:call-template name="dispPasswordField_tmp"/>
        </xsl:if>
        
        <xsl:if test="(../../@TYPE = 'ME' and ../../@VIEW != 'SE') or (../../@TYPE = 'ME' and count(../../@VIEW) = 0)"> 
            <td class="TDgrid" nowrap="nowrap">
                <xsl:call-template name="dispHiddenLabel_tmp"/>
                <xsl:call-template name="dispPasswordField_tmp"/>
            </td>
        </xsl:if>
    </xsl:template>
     
     <xsl:template match="FIELD/TYPE[text()='LINK_TYPE']" mode="template">
        <xsl:if test="../../@TYPE != 'ME' or ../../@VIEW = 'SE'">  
            <label class="LBLstd"></label>
            <xsl:call-template name="dispLinkType_tmp"/>
        </xsl:if>
        
        <xsl:if test="(../../@TYPE = 'ME' and ../../@VIEW != 'SE') or (../../@TYPE = 'ME' and count(../../@VIEW) = 0)"> 
            <td class="TDgrid" nowrap="nowrap">
            </td>
        </xsl:if>    
    </xsl:template>
    
    <xsl:template match="FIELD/TYPE[text()='GROUP' or text()='LABEL']" mode="template">
        <xsl:if test="../../@TYPE != 'ME' or ../../@VIEW = 'SE'">  
            <xsl:call-template name="dispLabelOnlyField_tmp"/>
        </xsl:if>
        
        <xsl:if test="(../../@TYPE = 'ME' and ../../@VIEW != 'SE') or (../../@TYPE = 'ME' and count(../../@VIEW) = 0)"> 
            <td class="TDgrid" nowrap="nowrap">
                <xsl:call-template name="dispLabelOnlyField_tmp"/>
            </td>
        </xsl:if>
    </xsl:template>

    <xsl:template match="TYPE[text()='TEXT' or text()='LINK' or text()='AMOUNT' or text()='DATE' or text()='ACCOUNT' or text()='BRANCH' or text()='CURRENCY' or text()='CUSTOMER' or text()='MASK' or text()='RESTRICTED_TEXT']" mode="template_fldset">
        <xsl:param name="l_pos"/>        
        <td>
            <xsl:if test="count(../CALENDARTEXT) = 0">
                <!--<xsl:if test="../LBL != ''">-->
                    <xsl:choose>
                        <xsl:when test="../TYPE = 'AMOUNT' or ../TYPE = 'DATE' or ../TYPE = 'DATETIME' or (../TYPE = 'TEXT' and (../DTYPE = 'NUMBER' or ../DTYPE = 'NUMERIC'))">
                            <xsl:call-template name="dispHiddenLabel_tmp"/>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:call-template name="dispNormalLabel_tmp"/>
                        </xsl:otherwise>
                    </xsl:choose> 
                <!--</xsl:if>-->
            </xsl:if>
            
            <xsl:call-template name="dispEntityField_tmp" >
                <xsl:with-param name="EntityType" select="../TYPE"/>
            </xsl:call-template>
        </td>
    </xsl:template>
    
    <xsl:template match="FIELD/TYPE[text()='BUTTON']" mode="template_fldset">
        <xsl:param name="l_pos"/>        
        <td>
        <xsl:call-template name="dispButtonField_tmp"/>
        </td>
    </xsl:template>        
    
    <xsl:template match="FIELD/TYPE[text()='HIDDEN']" mode="template_fldset">
        <xsl:param name="l_pos"/>        
        <td>
            <label class="LBLinv" for=""></label>
            <INPUT TYPE="HIDDEN">
            <xsl:call-template name="ATTR_Handler_tmp">
                <xsl:with-param name="curr_fld" select=".."/>
            </xsl:call-template>
            </INPUT>
        </td>
    </xsl:template>
    
    <xsl:template match="FIELD/TYPE[text()='GROUP' or text()='LABEL']" mode="template_fldset">
        <xsl:param name="l_pos"/>        
        <xsl:if test="count(../CALENDARTEXT) = 0">
            <td>
                <label >
                    <xsl:call-template name="ATTR_Handler_tmp">
                        <xsl:with-param name="curr_fld" select=".." />
                    </xsl:call-template>
                    <xsl:value-of select="../LBL" />
                </label>
            </td>
        </xsl:if>
    </xsl:template>
    
    <xsl:template match="FIELD/TYPE[text()='CHECKBOX']" mode="template_fldset">
        <xsl:param name="l_pos"/>        
        <td>
            <xsl:call-template name="dispCheckboxField_tmp_fldset"/>
        </td>
    </xsl:template>
    
    <xsl:template match="FIELD/TYPE[text()='TEXTAREA']" mode="template_fldset">
        <xsl:if test="count(../CALENDARTEXT) = 0">
            <!--<xsl:if test="../LBL != ''">-->
                <td>
                    <xsl:call-template name="dispNormalLabel_tmp"/>
                </td>
            </xsl:if>
        <!--</xsl:if>-->
        <td>
            <xsl:call-template name="dispTextareaField_tmp">
                <xsl:with-param name="position">column</xsl:with-param>                                   
            </xsl:call-template>
        </td>
    </xsl:template>
    
    <xsl:template match="FIELD/TYPE[text()='FILE']" mode="template_fldset">
        <xsl:if test="count(../CALENDARTEXT) = 0">
            <!--<xsl:if test="../LBL != ''">-->
                <td>
                    <xsl:call-template name="dispNormalLabel_tmp"/>
                </td>
            <!--</xsl:if>-->
        </xsl:if>
        <td>
            <xsl:call-template name="dispFileField_tmp"/>
        </td>
    </xsl:template>
    
    <xsl:template match="FIELD/TYPE[text()='IMG']" mode="template_fldset">
        <xsl:if test="count(../CALENDARTEXT) = 0">
            <!--<xsl:if test="../LBL != ''">-->
                <td>
                    <xsl:call-template name="dispNormalLabel_tmp"/>
                </td>
            <!--</xsl:if>-->
        </xsl:if>
        <td>
            <xsl:call-template name="dispImgField_tmp"/>
        </td>
    </xsl:template>
    
    <xsl:template match="FIELD/TYPE[text()='PASSWORD']" mode="template_fldset">
        <xsl:if test="count(../CALENDARTEXT) = 0">
            <!--<xsl:if test="../LBL != ''">-->
                <td>
                    <xsl:call-template name="dispNormalLabel_tmp"/>
                </td>
            <!--</xsl:if>-->
        </xsl:if>
        <td>
            <xsl:call-template name="dispPasswordField_tmp"/>
        </td>
    </xsl:template>    
    
    <xsl:template match="FIELD/TYPE[text()='SELECT']" mode="template_fldset">
        <xsl:if test="count(../CALENDARTEXT) = 0">
            <!--<xsl:if test="../LBL != ''">-->
                <td>
                    <xsl:call-template name="dispNormalLabel_tmp"/>
                </td>
            <!--</xsl:if>-->
        </xsl:if>
        <td>
            <xsl:call-template name="dispSelectField_tmp"/>
        </td>
    </xsl:template>
    
    
    <xsl:template match="FIELD/TYPE[text()='RADIO']" mode="template_fldset">
            <xsl:variable name="rFldNode" select=".."/>
            <xsl:variable name = "Left_or_Right" select = "$rFldNode/@COL"/>
            <td>
                <label class="LBLauto">
                    <xsl:attribute name="for">
                        <xsl:if test="../../BLOCK != ''">
                            <xsl:value-of select="concat(../../BLOCK,'__',../NAME)"></xsl:value-of>
                        </xsl:if>
                        <xsl:if test="../BLOCK = ''">
                            <xsl:value-of select="../NAME"></xsl:value-of>
                        </xsl:if>
                    </xsl:attribute>
                    <xsl:for-each select="../OPTION[@COL=1]">
                        <xsl:sort select="@ROW" data-type="number" order="ascending"/>
                        <xsl:variable name="row" select="@ROW"/>
                        <xsl:apply-templates select="../OPTION[@ROW = $row]" mode="template_fldset">
                            <xsl:with-param name = "Left_or_Right" select = "$Left_or_Right"/>                                                                                                                    
                        </xsl:apply-templates>
                    </xsl:for-each>
                </label>
            </td>
    </xsl:template>
    
    <xsl:template match="OPTION" mode="template_fldset">
        <xsl:param name = "Left_or_Right" select = "."/>
        <label class="LBLauto" for="">
        <xsl:attribute name="for">
            <xsl:if test="../../BLOCK != ''">
                <xsl:value-of select="concat(../../BLOCK,'__',../NAME)"></xsl:value-of>
            </xsl:if>
            <xsl:if test="../BLOCK = ''">
                <xsl:value-of select="../NAME"></xsl:value-of>
            </xsl:if>
        </xsl:attribute>
        <input type="radio" class="LBLauto" disabled="true">
        <xsl:call-template name="ATTR_Handler_tmp">
            <xsl:with-param name="curr_fld" select=".."/>
        </xsl:call-template>
        <xsl:if test = "$Left_or_Right ='1'">
            <xsl:attribute name = "align">
              <xsl:value-of select = "'center'"/>
            </xsl:attribute>
        </xsl:if> 
        <xsl:attribute name="VALUE"><xsl:value-of select = "VALUE"/></xsl:attribute>
        <xsl:if test="count(SELECTED) &gt; 0 and SELECTED=-1">
            <xsl:attribute name="CHECKED">CHECKED</xsl:attribute>
            <xsl:attribute name="DEFAULT">yes</xsl:attribute>
        </xsl:if>    
        <xsl:attribute name="LABEL_VALUE">
            <xsl:value-of select="LBL"/>
        </xsl:attribute>     
        </input>
        <xsl:value-of select="LBL"/>
        </label>
    </xsl:template>   
    
    <xsl:template match="FIELD/TYPE[text()='DESCRIPTION']" mode="template_fldset">
        <xsl:if test="count(../CALENDARTEXT) = 0">
            <!--<xsl:if test="../LBL != ''">-->
                <td>
                    <xsl:call-template name="dispNormalLabel_tmp"/>
                </td>
            <!--</xsl:if>-->
        </xsl:if>
        <td>
            <xsl:call-template name="dispEntityField_tmp" >
                <xsl:with-param name="EntityType" select="../TYPE"/>
            </xsl:call-template>
        </td>
    </xsl:template>

    <xsl:template name="dispNormalLabel_tmp" >
        <xsl:if test="count(../REQD) = 0 or ../REQD = '0'">        
            <xsl:if test="../LBL != ''">
                <label class="LBLstd">
                    <xsl:attribute name="FOR">
                        <xsl:if test="../../BLOCK != ''">
                             <xsl:value-of select="concat(../../BLOCK,'__',../NAME)"></xsl:value-of>
                        </xsl:if>
                        <xsl:if test="../BLOCK = ''">
                             <xsl:value-of select="../NAME"></xsl:value-of>
                        </xsl:if>
                    </xsl:attribute>
                    <xsl:value-of select="../LBL"/>
                </label>
            </xsl:if>
            <xsl:if test="../LBL = ''">
                <label class="LBLstd LBLinv2">
                    <xsl:attribute name="FOR">
                        <xsl:if test="../../BLOCK != ''">
                             <xsl:value-of select="concat(../../BLOCK,'__',../NAME)"></xsl:value-of>
                        </xsl:if>
                        <xsl:if test="../BLOCK = ''">
                             <xsl:value-of select="../NAME"></xsl:value-of>
                        </xsl:if>
                    </xsl:attribute>
                    <xsl:value-of select="../../LBL"/>
                </label>                
            </xsl:if>
        </xsl:if>
        
        <xsl:if test="count(../REQD) &gt; 0 and ../REQD = '-1'">
            <label class="LBLstd star">
                <xsl:attribute name="FOR">
                    <xsl:if test="../../BLOCK != ''">
                         <xsl:value-of select="concat(../../BLOCK,'__',../NAME)"></xsl:value-of>
                    </xsl:if>
                    <xsl:if test="../BLOCK = ''">
                         <xsl:value-of select="../NAME"></xsl:value-of>
                    </xsl:if>
                </xsl:attribute>
                <xsl:value-of select="../LBL"/>
            </label>
        </xsl:if>
    </xsl:template>
    
    <xsl:template name="dispHiddenLabel_tmp" >
        <xsl:if test="count(../REQD) = 0 or ../REQD = '0'">
        <label class="LBLinv">
            <xsl:attribute name="FOR">
                <xsl:if test="../../BLOCK != ''">
                     <xsl:value-of select="../NAME"></xsl:value-of>
                </xsl:if>
                <xsl:if test="../BLOCK = ''">
                     <xsl:value-of select="../NAME"></xsl:value-of>
                </xsl:if>
            </xsl:attribute>
        </label>
        </xsl:if>
        
        <xsl:if test="count(../REQD) &gt; 0 and ../REQD = '-1'">
            <label class="LBLinv">
                <xsl:attribute name="FOR">
                    <xsl:if test="../../BLOCK != ''">
                         <xsl:value-of select="../NAME"></xsl:value-of>
                    </xsl:if>
                    <xsl:if test="../BLOCK = ''">
                         <xsl:value-of select="../NAME"></xsl:value-of>
                    </xsl:if>
                </xsl:attribute>
            </label>
        </xsl:if>
    </xsl:template>

    <xsl:template name="dispRadioLabel_tmp" >
        <xsl:if test="count(../REQD) = 0 or ../REQD = '0'">
        <b class="LBLstd" id="groupidpercentage">
            <xsl:value-of select="../LBL"/>
        </b>
        </xsl:if>
        <xsl:if test="count(../REQD) &gt; 0 and ../REQD = '-1'">
            <b class="LBLstd star">
            <xsl:value-of select="../LBL"/>
            </b>
        </xsl:if>
    </xsl:template>
    <!--End of ExtFields.xsl-->
    
    <xsl:template match="FLDSET">
        <xsl:param name="sprtReqd" select="."/>
        <xsl:param name="subpartCount" select="."/>
        <xsl:choose>
            <xsl:when test="HREQ = '-1'">
                <xsl:call-template name="HorzFldSet"/>
            </xsl:when>
            <xsl:otherwise>
                <fieldset class="FSTcell" block="{./BLOCK}" type="{./@TYPE}" view="{./@VIEW}">
                    <xsl:if test="@TYPE = 'ME' and @VIEW = 'SE'">
                        <xsl:attribute name="MESVNODE">
                            <xsl:text>false</xsl:text>
                        </xsl:attribute>
                    </xsl:if>
                    <xsl:if test="(LBL != '') and (@TYPE = 'SE' or @VIEW = 'SE')">
                        <xsl:attribute name = "class">
                            <xsl:value-of select = "'FSTstd'"/>
                        </xsl:attribute>
                        <legend><xsl:value-of select="LBL"/></legend>
                    </xsl:if>
                    <xsl:if test="LBL = ''">
                        <legend><xsl:text disable-output-escaping="yes">&#160;</xsl:text></legend>
                    </xsl:if>
                    <xsl:if test="$sprtReqd = 'Y'">
                        <xsl:call-template name="sprtHandler">
                            <xsl:with-param name="SPRT_Index" select="1"/>
                            <xsl:with-param name="subpartCount" select="$subpartCount"/>
                            </xsl:call-template>
                    </xsl:if>
                    <xsl:if test="$sprtReqd = 'N'">
                        <xsl:call-template name="FldSetTypeHandler">
                            <xsl:with-param name="SPRT_Index" select="0"/>
                            <xsl:with-param name="sprtReqd" select="'N'"/>
                        </xsl:call-template>
                    </xsl:if>
                </fieldset>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    
    
    
    <xsl:template match="FLDSET" mode="footer">
        <xsl:if test="count(../SPRTCNT) = 0 or ../SPRTCNT = '0'">
            <xsl:call-template name="FldSetTypeHandler" >
                <xsl:with-param name="sprtReqd" select="'N'"/>
                <xsl:with-param name="SPRT_Index" select="0"/>
            </xsl:call-template>
        </xsl:if>
        <xsl:if test="count(../SPRTCNT) > 0 and ../SPRTCNT != '0'">
            <xsl:call-template name="sprtHandler">
                <xsl:with-param name="footer" select="'Y'"/>
                <xsl:with-param name="SPRT_Index" select="1"/>
                <xsl:with-param name="subpartCount" select="../SPRTCNT"/>
            </xsl:call-template>
        </xsl:if>
    </xsl:template>
    <xsl:template name="HorzFldSet">
        <fieldset class="FSTcell" block="{./BLOCK}" type="{@TYPE}" view="{@VIEW}">
            <xsl:if test="LBL != ''">
                <xsl:attribute name = "class">
                    <xsl:value-of select = "'FSTstd'"/>
                </xsl:attribute>
            </xsl:if>
            <legend><xsl:value-of select="LBL"/></legend>
            <div class="DIVText">
                <table border="0" cellpadding="0" cellspacing="0" summary="">
                    <tr>
                        <xsl:apply-templates select="./FIELD" mode="hFieldSet">
                            <xsl:sort select="@INDEX" data-type="number" order="ascending"/>
                        </xsl:apply-templates>
                    </tr>
                </table>
            </div>
        </fieldset>
    </xsl:template>
    <!-- End of ExtFldset.xsl -->
    <xsl:template match="PART">
        <xsl:variable name="partWidth" select="@WIDTH"/>
        <div>
            <xsl:call-template name="parDivHandler">
                <xsl:with-param name="partWidth" select="$partWidth"/>
            </xsl:call-template>
            <xsl:choose>
                <xsl:when test="FSREQ = 'Y'">
                    <fieldset class="FSTstd">
                        <legend>
                            <xsl:value-of select="LBL"/>
                        </legend>
                        <!-- partition without sub partition !-->
                        <xsl:if test="count(./SPRTCNT) = 0 or ./SPRTCNT = '0'">
                            <xsl:apply-templates select="FLDSET">
                                <xsl:with-param name="sprtReqd" select="'N'"/>
                                <xsl:with-param name="subpartCount" select="'0'"/>
                                <xsl:sort select="./@INDEX" data-type="number" order="ascending"/>
                            </xsl:apply-templates>
                        </xsl:if>
                        
                        <!-- partition with sub partition !-->
                        <xsl:if test="count(./SPRTCNT) &gt; 0 and ./SPRTCNT != '0'">
                            <xsl:apply-templates select="FLDSET">
                                <xsl:with-param name="sprtReqd" select="'Y'"/>
                                <xsl:with-param name="subpartCount" select="./SPRTCNT"/>
                                <xsl:sort select="./@INDEX" data-type="number" order="ascending"/>
                            </xsl:apply-templates>
                        </xsl:if>
                    </fieldset>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:if test="count(./SPRTCNT) = 0 or ./SPRTCNT = '0'">
                        <xsl:apply-templates select="FLDSET">
                            <xsl:with-param name="sprtReqd" select="'N'"/>
                            <xsl:with-param name="subpartCount" select="'0'"/>
                            <xsl:sort select="./@INDEX" data-type="number" order="ascending"/>
                        </xsl:apply-templates>
                    </xsl:if>
                    <xsl:if test="count(./SPRTCNT) &gt; 0 and ./SPRTCNT != '0'">
                        <xsl:apply-templates select="FLDSET">
                            <xsl:with-param name="sprtReqd" select="'Y'"/>
                            <xsl:with-param name="subpartCount" select="./SPRTCNT"/>
                            <xsl:sort select="./@INDEX" data-type="number" order="ascending"/>
                        </xsl:apply-templates>
                    </xsl:if>
                </xsl:otherwise>
            </xsl:choose>
        </div>
    </xsl:template>
    
    <!--Partition handler for footer !-->
    <xsl:template match="PART" mode="footer">
        <xsl:if test="count(./SPRTCNT) &gt; 0 and ./SPRTCNT != '0'">
            <xsl:apply-templates select="FLDSET" mode="footer"/>
        </xsl:if>
        <xsl:if test="count(./SPRTCNT) = 0 or ./SPRTCNT = '0'">
            <xsl:if test="@WIDTH != '66'">
                <xsl:apply-templates select="FLDSET" mode="footer"/>
            </xsl:if>
            <xsl:if test="@WIDTH = '66'">
                <xsl:apply-templates select="FLDSET" mode="footer"/>
            </xsl:if>
        </xsl:if>
    </xsl:template>
    
    <!-- Choosing Partition Div CSS class!-->
    <xsl:template name="parDivHandler">
        <xsl:param name="partWidth" select="."/>
        <xsl:choose>
            <xsl:when test="$partWidth = '100' and $l_scr_type='L'">
                <xsl:attribute name="class">
                    <xsl:value-of select="'DIVColumnTripple'"/>
                </xsl:attribute>
            </xsl:when>
            <xsl:when test="$partWidth = '100' and $l_scr_type!='L'">
                <xsl:attribute name="class">
                    <xsl:value-of select="'DIVColumnDouble'"/>
                </xsl:attribute>
            </xsl:when>
            <xsl:when test="$partWidth = '66'">
                <xsl:attribute name="class">
                    <xsl:value-of select="'DIVColumnDouble'"/>
                </xsl:attribute>
            </xsl:when>
            <xsl:otherwise>
                <xsl:attribute name="class">
                    <xsl:value-of select="'DIVColumnOne'"/>
                </xsl:attribute>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>    
    <!-- End of ExtPartition.xsl -->
    
    <xsl:template match="SECTION">
        <div class="TwoColSectionContainer">
            <xsl:if test="$l_scr_type = 'L'">
                <xsl:attribute name="class">
                    <!--<xsl:value-of select="'DIVThreeColSectionContainer'"/>-->
                    <xsl:text>DIVThreeColSectionContainer</xsl:text>
                </xsl:attribute>
            </xsl:if>
            <xsl:apply-templates select="PART"></xsl:apply-templates>
        </div>
    </xsl:template>
    
    <!-- Section handler for footer !-->
    <xsl:template match="SECTION" mode="footer">
        <xsl:apply-templates select="PART" mode="footer"/>
    </xsl:template>
<!-- End of ExtSection.xsl -->

<!-- Start of ExtCore.xsl -->
<xsl:template name="dispEntityField_tmp" >
    <xsl:param name="EntityType" />
    <xsl:choose>
        <xsl:when test="$EntityType = 'AMOUNT'">
            <xsl:call-template name="dispAmountField_tmp" />
        </xsl:when>
        <xsl:when test="$EntityType = 'DATE'">
            <xsl:call-template name="dispDateField_tmp" />
        </xsl:when>   
        <xsl:when test="$EntityType = 'DATETIME'">
            <xsl:call-template name="dispDateTimeField_tmp" />
        </xsl:when>   
        <xsl:when test="$EntityType = 'MASK'">
            <xsl:call-template name="dispMaskField_tmp" />
        </xsl:when>
        <xsl:when test="$EntityType = 'DISPMASK'">
            <xsl:call-template name="dispMaskingField_tmp" />
        </xsl:when>
        <xsl:when test="$EntityType = 'DESCRIPTION'">
            <xsl:call-template name="dispDescriptionField_tmp" />
        </xsl:when>
        <xsl:when test="$EntityType = 'NUMBERTEXT'">
            <xsl:call-template name="dispNumberField_tmp" />
        </xsl:when>
        <xsl:otherwise>
            <xsl:call-template name="dispTextField_tmp" />
        </xsl:otherwise>
    </xsl:choose>

</xsl:template>

<xsl:template name="dispAmountField_tmp">
    <xsl:variable name="relFld" select="../RELATED_FIELD"/>
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
    <INPUT TYPE="HIDDEN" onpropertychange="displayAmount(this, '{$relatedFld}')" related_ccy = "{$relatedFld}">    
        <xsl:call-template name="ATTR_HiddenEntity_Handler_tmp">
            <xsl:with-param name="curr_fld" select=".." />
        </xsl:call-template>
    </INPUT>
    <label class="LBLinv">
        <xsl:attribute name="for">
            <xsl:value-of select="concat(../../BLOCK,'__',../NAME)"></xsl:value-of>
            <xsl:text>I</xsl:text>
        </xsl:attribute>
        <xsl:if test="(../../@TYPE != 'ME' or ../../@VIEW = 'SE')">
            <xsl:if test="count(../REQD) = 0 or ../REQD = '0'">
                <xsl:attribute name="class">
                    <xsl:text>LBLstd</xsl:text>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="count(../REQD) &gt; 0 and ../REQD = '-1'">
                <xsl:attribute name="class">
                    <xsl:text>LBLstd star </xsl:text>
                </xsl:attribute>
            </xsl:if>
            <xsl:value-of select="../LBL"/>
        </xsl:if>
    </label>
    <INPUT TYPE="TEXT" class="TXTro numeric" title="{../LBL}" readOnly="true">
        <xsl:call-template name="ATTR_InputEntity_Handler_tmp">
            <xsl:with-param name="curr_fld" select=".." />
        </xsl:call-template>
        <xsl:attribute name="MAXLENGTH1">
            <xsl:if test="not(contains(../MAXLENGTH,','))">
                <xsl:value-of select="../MAXLENGTH"/>
            </xsl:if>
            <xsl:if test="contains(../MAXLENGTH,',')">
                <xsl:value-of select="substring-before(../MAXLENGTH,',') - substring-after(../MAXLENGTH,',')"/>
            </xsl:if>
        </xsl:attribute>
        <xsl:if test="normalize-space(../MIN_VAL) != ''">      
            <xsl:attribute name="MIN_VAL">
                <xsl:value-of select="../MIN_VAL"/>
            </xsl:attribute>
        </xsl:if>
        <xsl:if test="normalize-space(../MAX_VAL) != ''">    
            <xsl:attribute name="MAX_VAL">
                <xsl:value-of select="../MAX_VAL"/>
            </xsl:attribute>
        </xsl:if>
        <xsl:attribute name = "onblur">
            <xsl:text disable-output-escaping="yes">validateInputAmount('</xsl:text>
            <xsl:value-of select="../NAME"/>
            <xsl:text disable-output-escaping="yes">', '</xsl:text>
            <xsl:value-of select="$relatedFld"/>
            <xsl:text disable-output-escaping="yes">', event);fnValidateRange(this)</xsl:text>
        </xsl:attribute>
        <xsl:if test="(../../@TYPE = 'ME' and ../../@VIEW != 'SE') or (../../@TYPE = 'ME' and count(../../@VIEW) = 0)">
            <xsl:attribute name="title">
                <xsl:value-of select="../LBL"/>
            </xsl:attribute>
        </xsl:if>
    </INPUT>
    <xsl:call-template name="LovHandler_tmp">
        <xsl:with-param name="curr_fld" select=".." />
    </xsl:call-template>
</xsl:template>

<xsl:template name="ATTR_HiddenEntity_Handler_tmp">
    <xsl:param name="curr_fld" select="." />
    <xsl:if test="count($curr_fld/VALUE) &gt; 0">
        <xsl:attribute name="VALUE">
            <xsl:value-of select="$curr_fld/VALUE" />
        </xsl:attribute>
        <xsl:attribute name="DEFAULT">
            <xsl:value-of select="$curr_fld/VALUE" />
        </xsl:attribute>
    </xsl:if>
    <xsl:if test="count($curr_fld/@CONTROL) = 0 or $curr_fld/@CONTROL = 'N'">
        <xsl:attribute name="DBT">
            <xsl:value-of select="$curr_fld/../BLOCK" />
        </xsl:attribute>
        <xsl:attribute name="DBC">
            <xsl:value-of select="$curr_fld/NAME" />
        </xsl:attribute>
    </xsl:if>
    <xsl:attribute name="NAME">
        <xsl:value-of select="$curr_fld/NAME" />
    </xsl:attribute>
    <xsl:attribute name="ID">
        <xsl:value-of select="concat($curr_fld/../BLOCK,'__',$curr_fld/NAME)" />
    </xsl:attribute>
    <xsl:attribute name="REQUIRED">
        <xsl:value-of select="$curr_fld/REQD" />
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
    <xsl:attribute name="LABEL_VALUE">
        <xsl:value-of select="$curr_fld/LBL" />
    </xsl:attribute>
    <xsl:variable name="refFld" select="$curr_fld/REF_FIELD"/>
    <xsl:variable name="referFld">
        <xsl:if test="$refFld != ''">
            <xsl:if test="contains($refFld,'__')">
                <xsl:value-of select="substring-after($refFld,'__')"/>
            </xsl:if>
            <xsl:if test="not(contains($refFld,'__'))">
                <xsl:value-of select="$refFld"/>
            </xsl:if>
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

    <xsl:apply-templates select="$curr_fld/CUSTOM" mode="template"/>
    <xsl:if  test="($curr_fld/../@TYPE = 'ME') and ($curr_fld/../@VIEW = 'SE')">
        <xsl:attribute name="MEBLOCKID"><xsl:value-of select="$curr_fld/../BLOCK"/></xsl:attribute>
    </xsl:if>  
</xsl:template>


<xsl:template name="ATTR_InputEntity_Handler_tmp">
    <xsl:param name="curr_fld" select="." />
    <xsl:attribute name="ID">
        <xsl:value-of select="concat($curr_fld/../BLOCK,'__',$curr_fld/NAME)" />
        <xsl:text>I</xsl:text>
    </xsl:attribute>
    <xsl:if test="count($curr_fld/VALUE) &gt; 0">        
        <xsl:attribute name="DEFAULT">
            <xsl:value-of select="$curr_fld/VALUE" />
        </xsl:attribute>
    </xsl:if>
    <xsl:attribute name="NAME">
        <xsl:value-of select="$curr_fld/NAME" />
        <xsl:text>I</xsl:text>
    </xsl:attribute>
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
    <xsl:if test="normalize-space($curr_fld/TYPE) != 'AMOUNT'">
        <xsl:attribute name="MAXLENGTH">
            <xsl:if test="count($curr_fld/MAXLENGTH) != 0">
                <xsl:value-of select="$curr_fld/MAXLENGTH" />
            </xsl:if>
            <xsl:if test="count($curr_fld/MAXLENGTH) = 0">
                <xsl:if test="count($curr_fld/SIZE) != 0">
                    <xsl:value-of select="$curr_fld/SIZE" />
                </xsl:if>
                <xsl:if test="count($curr_fld/SIZE) = 0 and $curr_fld/TYPE= 'DATE'">
                    <xsl:text>16</xsl:text>
                </xsl:if>
            </xsl:if>
        </xsl:attribute>
    </xsl:if>
    <xsl:if test="count($curr_fld/READ_ONLY) &gt; 0 and $curr_fld/READ_ONLY = -1">
        <xsl:attribute name="READONLY">true</xsl:attribute>
	<xsl:attribute name="READONLY1">true</xsl:attribute>
        <xsl:attribute name="TABINDEX">-1</xsl:attribute>                
        <xsl:attribute name="class">TXTro</xsl:attribute>
        <xsl:if test="$curr_fld/TYPE[text() != 'MASK'] and $curr_fld/TYPE[text() != 'DATE']" >
            <xsl:attribute name="class">
                <xsl:text>TXTro numeric</xsl:text>
            </xsl:attribute>
        </xsl:if>
    </xsl:if>
    <xsl:if test="count($curr_fld/DISABLED) &gt; 0 and $curr_fld/DISABLED = -1">
        <xsl:attribute name="DISABLED">DISABLED</xsl:attribute>
        <xsl:attribute name="class">TXTro</xsl:attribute>
    </xsl:if>
   
    
    <xsl:if test="count($curr_fld/ACCESSKEY) &gt; 0 and normalize-space($curr_fld/ACCESSKEY) != ''">
        <xsl:attribute name="ACCESSKEY">
            <xsl:value-of select="$curr_fld/ACCESSKEY" />
        </xsl:attribute>
    </xsl:if>
    <xsl:apply-templates select="$curr_fld/EVENT" mode="template"/>
    <xsl:if  test="($curr_fld/../@TYPE = 'ME') and ($curr_fld/../@VIEW = 'SE')">
        <xsl:attribute name="MEBLOCKID"><xsl:value-of select="$curr_fld/../BLOCK"/></xsl:attribute>
    </xsl:if>  

</xsl:template>


<xsl:template match="EVENT" mode="template">
    <xsl:attribute name="{./NAME}">
        <xsl:if test="$thirdChar != 'C' or ($thirdChar = 'C' and ../NAME != 'BTN_OK' and ../NAME != 'BTN_EXIT') or ($thirdChar = 'C' and count(../NAME) = 0)">
            <xsl:value-of select="./FUNCTION" />
        </xsl:if>
        <xsl:if test="$thirdChar = 'C' and (../NAME = 'BTN_OK' or ../NAME = 'BTN_EXIT')">
            <xsl:if test="../NAME = 'BTN_OK'">
                <xsl:text>fnSave_</xsl:text><xsl:value-of select="$screen"/><xsl:text>()</xsl:text>
            </xsl:if>
            <xsl:if test="../NAME = 'BTN_EXIT'">
                <xsl:text>fnExit_</xsl:text><xsl:value-of select="$screen"/><xsl:text>()</xsl:text>
            </xsl:if>
        </xsl:if>
    </xsl:attribute>
</xsl:template>

<xsl:template match="CUSTOM" mode="template">
    <xsl:for-each select="*">
        <xsl:attribute name="{name()}" >
            <xsl:value-of select="." />
        </xsl:attribute>
    </xsl:for-each>
</xsl:template>

<xsl:template name="dispNumberField_tmp">
    <xsl:param name="EntityType"/>
    <INPUT TYPE="HIDDEN" onpropertychange="displayFormattedNumber(this)">    
        <xsl:call-template name="ATTR_HiddenEntity_Handler_tmp">
            <xsl:with-param name="curr_fld" select=".." />
        </xsl:call-template>
    </INPUT>    
    <label class="LBLinv">
        <xsl:attribute name="for">
            <xsl:value-of select="concat(../../BLOCK,'__',../NAME)"></xsl:value-of>
            <xsl:text>I</xsl:text>
        </xsl:attribute>
        <xsl:if test="(../../@TYPE != 'ME' or ../../@VIEW = 'SE')">
            <xsl:if test="count(../REQD) = 0 or ../REQD = '0'">
                <xsl:attribute name="class">
                    <xsl:text>LBLstd</xsl:text>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="count(../REQD) &gt; 0 and ../REQD = '-1'">
                <xsl:attribute name="class">
                    <xsl:text>LBLstd star </xsl:text>
                </xsl:attribute>
            </xsl:if>
            <xsl:value-of select="../LBL"/>
        </xsl:if>
    </label>
    <input type="text" class="TXTro numeric" title="{../LBL}" onblur="validateInputNumber(this)">
	<xsl:attribute name="viewMode">Y</xsl:attribute>
        <xsl:attribute name="readOnly">true</xsl:attribute>
        <xsl:call-template name="ATTR_InputEntity_Handler_tmp">
            <xsl:with-param name="curr_fld" select=".." />
        </xsl:call-template>
        <xsl:if test="normalize-space(../MIN_VAL) != ''">
            <xsl:attribute name="MIN_VAL">
                <xsl:value-of select="../MIN_VAL"/>
            </xsl:attribute>
        </xsl:if>
        <xsl:if test="normalize-space(../MAX_VAL) != ''">        
            <xsl:attribute name="MAX_VAL">
                <xsl:value-of select="../MAX_VAL"/>
            </xsl:attribute>
        </xsl:if>
        <xsl:if test="normalize-space(../MAX_DECIMALS) != ''">                
            <xsl:attribute name="MAX_DECIMALS">
                <xsl:value-of select="../MAX_DECIMALS"/>
            </xsl:attribute>
        </xsl:if>
        <xsl:if test="(../../@TYPE = 'ME' and ../../@VIEW != 'SE') or (../../@TYPE = 'ME' and count(../../@VIEW) = 0)">
            <xsl:attribute name="title">
                <xsl:value-of select="../LBL"/>
            </xsl:attribute>
        </xsl:if>
    </input>
    <xsl:call-template name="LovHandler_tmp">
        <xsl:with-param name="curr_fld" select=".." />
        <xsl:with-param name="EntityType" select="$EntityType" />
    </xsl:call-template>
    <xsl:if test="count(../POPUPEDIT) &gt; 0 or (number(../MAXLENGTH) &gt; $displaySize)">
        <BUTTON class="BTNhide" oldClassName = "BTNimg" title="{$narrative}" disabled="true">
            <xsl:if test="count(../READ_ONLY) = 0 or ../READ_ONLY = 0">
                <xsl:attribute name="tabindex">-1</xsl:attribute>
            </xsl:if>
            <xsl:call-template name="Popup_Handler_tmp" />
            <span class="ICOnarrative">
                <xsl:if test="count(../READ_ONLY) = 0 or ../READ_ONLY = 0">
                    <xsl:attribute name="tabindex">-1</xsl:attribute>
                </xsl:if>    
                <span><xsl:value-of select = "$narrative"/></span>
            </span>   
        </BUTTON>
    </xsl:if>
</xsl:template>

<xsl:template name="dispTextField_tmp">
    <xsl:param name="EntityType"/>
    <input type="text" class="TXTro">
	<xsl:attribute name="viewMode">Y</xsl:attribute>
        <xsl:attribute name="readOnly">true</xsl:attribute>
        <xsl:if test="../TYPE = 'RESTRICTED_TEXT' and ((count(../UPPERCASE) &gt; 0 and ../UPPERCASE = -1) or (count(../CASE) &gt; 0 and ../CASE = 'UPPER'))">
        <!-- Changes for AUTO_LOV start-->
            <xsl:if test="count(../LOV) &gt; 0 and count(../INPUT_LOV) = 0">
                <xsl:attribute name="onblur">
                    <xsl:text>validateRestrictedTextValue(this);fnToUppercase(this, event);</xsl:text>
                    <xsl:call-template name="dispAutoLov">
                        <xsl:with-param name="curr_node" select=".."/>
                    </xsl:call-template>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="count(../OFFLINE_LOV) &gt; 0 and count(../INPUT_LOV) = 0">
                <xsl:attribute name="onblur">
                    <xsl:text>validateRestrictedTextValue(this);fnToUppercase(this, event);</xsl:text>
                    <xsl:call-template name="dispOfflineAutoLov">
                        <xsl:with-param name="curr_node" select=".."/>
                    </xsl:call-template>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="count(../LOV) = 0 and count(../OFFLINE_LOV) = 0 and count(../INPUT_LOV) = 0">
                <xsl:attribute name="onblur">validateRestrictedTextValue(this);fnToUppercase(this, event)</xsl:attribute>
            </xsl:if>
        <!-- Changes for AUTO_LOV end-->
        </xsl:if>
        <xsl:if test="../TYPE != 'RESTRICTED_TEXT' and ((count(../UPPERCASE) &gt; 0 and ../UPPERCASE = -1) or (count(../CASE) &gt; 0 and ../CASE = 'UPPER'))">
        <!-- Changes for AUTO_LOV start-->
            <xsl:if test="count(../LOV) &gt; 0 and count(../INPUT_LOV) = 0">
                <xsl:attribute name="onblur">
                    <xsl:text>fnToUppercase(this, event);</xsl:text>
                    <xsl:call-template name="dispAutoLov">
                        <xsl:with-param name="curr_node" select=".."/>
                    </xsl:call-template>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="count(../OFFLINE_LOV) &gt; 0 and count(../INPUT_LOV) = 0">
                <xsl:attribute name="onblur">
                    <xsl:text>fnToUppercase(this, event);</xsl:text>
                    <xsl:call-template name="dispOfflineAutoLov">
                        <xsl:with-param name="curr_node" select=".."/>
                    </xsl:call-template>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="count(../LOV) = 0 and count(../OFFLINE_LOV) = 0 and count(../INPUT_LOV) = 0">
                <xsl:attribute name="onblur">fnToUppercase(this, event)</xsl:attribute>
            </xsl:if>
        <!-- Changes for AUTO_LOV end-->
        </xsl:if>
        <xsl:if test="../TYPE = 'RESTRICTED_TEXT' and ((count(../UPPERCASE) &lt;= 0 or ../UPPERCASE = 0) and (count(../CASE) &lt;= 0 or ../CASE != 'UPPER'))">
        <!-- Changes for AUTO_LOV start-->
            <xsl:if test="count(../LOV) &gt; 0 and count(../INPUT_LOV) = 0">
                <xsl:attribute name="onblur">
                    <xsl:text>validateRestrictedTextValue(this);</xsl:text>
                    <xsl:call-template name="dispAutoLov">
                        <xsl:with-param name="curr_node" select=".."/>
                    </xsl:call-template>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="count(../OFFLINE_LOV) &gt; 0 and count(../INPUT_LOV) = 0">
                <xsl:attribute name="onblur">
                    <xsl:text>validateRestrictedTextValue(this);</xsl:text>
                    <xsl:call-template name="dispOfflineAutoLov">
                        <xsl:with-param name="curr_node" select=".."/>
                    </xsl:call-template>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="count(../LOV) = 0 and count(../INPUT_LOV) = 0">
            <xsl:attribute name="onblur">validateRestrictedTextValue(this)</xsl:attribute>
        </xsl:if>
        <!-- Changes for AUTO_LOV end-->
        </xsl:if>
        <xsl:if test="../TYPE != 'RESTRICTED_TEXT' and ((count(../UPPERCASE) &lt;= 0 or ../UPPERCASE = 0) and (count(../CASE) &lt;= 0 or ../CASE != 'UPPER'))">
        <!-- Changes for AUTO_LOV start-->
            <xsl:if test="count(../LOV) &gt; 0 and count(../INPUT_LOV) = 0">
                <xsl:attribute name="onblur">
                    <xsl:call-template name="dispAutoLov">
                        <xsl:with-param name="curr_node" select=".."/>
                    </xsl:call-template>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="count(../OFFLINE_LOV) &gt; 0 and count(../INPUT_LOV) = 0">
                <xsl:attribute name="onblur">
                    <xsl:call-template name="dispOfflineAutoLov">
                        <xsl:with-param name="curr_node" select=".."/>
                    </xsl:call-template>
                </xsl:attribute>
            </xsl:if>
        <!-- Changes for AUTO_LOV end-->
        </xsl:if>
        <xsl:call-template name="ATTR_Handler_tmp">
            <xsl:with-param name="curr_fld" select=".." />
        </xsl:call-template>
    
        <xsl:attribute name="MAXLENGTH">
            <xsl:if test="count(../MAXLENGTH) != 0">
                <xsl:if test="normalize-space(../MAX_DECIMALS) != ''  and normalize-space(../MAX_DECIMALS) > 0">
                    <xsl:value-of select="number(../MAXLENGTH) + 1" />                                    
                </xsl:if>
                <xsl:if test="normalize-space(../MAX_DECIMALS) = ''">
                    <xsl:value-of select="number(../MAXLENGTH)" />
                </xsl:if>
            </xsl:if>
            <xsl:if test="count(../MAXLENGTH) = 0">
                <xsl:value-of select="../SIZE" />
            </xsl:if>
        </xsl:attribute>
        
        <xsl:if test="(../../@TYPE = 'ME' and ../../@VIEW != 'SE') or (../../@TYPE = 'ME' and count(../../@VIEW) = 0)">
            <xsl:attribute name="title">
                <xsl:value-of select="../LBL"/>
                <!--<xsl:if test="../REQD='-1'"> * </xsl:if>-->
            </xsl:attribute>
        </xsl:if>
    </input>
    <xsl:call-template name="LovHandler_tmp">
        <xsl:with-param name="curr_fld" select=".." />
        <xsl:with-param name="EntityType" select="$EntityType" />
    </xsl:call-template>
    <xsl:if test="count(../POPUPEDIT) &gt; 0 or (number(../MAXLENGTH) &gt; $displaySize)">
        <BUTTON class="BTNhide" oldClassName = "BTNimg" disabled="true">
            <xsl:if test="count(../READ_ONLY) = 0 or ../READ_ONLY = 0">
                <xsl:attribute name="tabindex">-1</xsl:attribute>
            </xsl:if>
            <xsl:call-template name="Popup_Handler_tmp" />
            <span class="ICOnarrative">
                <xsl:if test="count(../READ_ONLY) = 0 or ../READ_ONLY = 0">
                    <xsl:attribute name="tabindex">-1</xsl:attribute>
                </xsl:if>
                <span class="LBLinv"><xsl:value-of select = "$narrative"/></span>
            </span>   
        </BUTTON> 
    </xsl:if>
        <!--</xsl:if>-->
        <!--HOTKEY-->
    <xsl:if test="count(../@HOTKEY) &gt; 0 and ../@HOTKEY = 'Y'">
        <xsl:attribute name="onkeydown">
            <xsl:text>fnLaunchHotkyFunc(true,'</xsl:text><xsl:value-of select="../@FUNCTIONID"/><xsl:text>')</xsl:text>
        </xsl:attribute>
        <BUTTON class="BTNimg" disabled="true" onclick="fnLaunchHotkyFunc(false,'{../@FUNCTIONID}')">
            <span tabindex="-1" class="ICOcustinfo"></span> 
        </BUTTON>
    </xsl:if>
        <!-- HOTKEY  END-->
</xsl:template>

<!-- MASK ENHANCEMENT CHANGES -->
<xsl:template name="dispMaskingField_tmp">
    <xsl:param name="EntityType"/>
    <input type="text" class="TXTro">
	<xsl:attribute name="viewMode">Y</xsl:attribute>
        <xsl:attribute name="readOnly">true</xsl:attribute>
        <xsl:call-template name="ATTR_Handler_tmp">
            <xsl:with-param name="curr_fld" select=".." />
        </xsl:call-template>
        <xsl:attribute name="MAXLENGTH">
            <xsl:if test="count(../MAXLENGTH) != 0">
                <xsl:if test="normalize-space(../MAX_DECIMAL) != ''  and normalize-space(../MAX_DECIMAL) > 0">
                    <xsl:value-of select="number(../MAXLENGTH) + 1" />                                    
                </xsl:if>
                <xsl:if test="normalize-space(../MAX_DECIMAL) = ''">
                    <xsl:value-of select="number(../MAXLENGTH)" />
                </xsl:if>
            </xsl:if>
            <xsl:if test="count(../MAXLENGTH) = 0">
                <xsl:value-of select="../SIZE" />
            </xsl:if>		
        </xsl:attribute>
            
	<xsl:attribute name="SIZE">		
            <xsl:choose>
		<xsl:when test="(../NAME = 'MAKER' or  ../NAME = 'CHECKER') and ../SIZE &lt; ../MAXLENGTH">
                    <xsl:text>12</xsl:text>
                </xsl:when>				
		<xsl:otherwise>				
                    <xsl:value-of select="../SIZE" />
		</xsl:otherwise>				
            </xsl:choose>
        </xsl:attribute>
    
        <xsl:if test="(count(../UPPERCASE) &gt; 0 and ../UPPERCASE = -1) or (count(../CASE) &gt; 0 and ../CASE = 'UPPER')">
            <xsl:if test="count(../MASK_ID) &gt; 0">
                <xsl:attribute name="onBlur">fnToUppercase(this, event);fnFormatUnmask(this)</xsl:attribute>
                <xsl:attribute name="MASK_ID"><xsl:value-of select="../MASK_ID" /></xsl:attribute>
            </xsl:if>
            <xsl:if test="count(../MASK_ID) = 0">
                <xsl:attribute name="onBlur">fnToUppercase(this, event)</xsl:attribute>
            </xsl:if>
        </xsl:if>
        <xsl:if test="(count(../UPPERCASE) &lt;= 0 or ../UPPERCASE = 0) and (count(../CASE) &lt;= 0 or ../CASE != 'UPPER')">
            <xsl:if test="count(../MASK_ID) &gt; 0">
                <xsl:attribute name="onBlur">fnFormatUnmask(this)</xsl:attribute>
                <xsl:attribute name="MASK_ID"><xsl:value-of select="../MASK_ID" /></xsl:attribute>
            </xsl:if>
        </xsl:if>
        <xsl:if test="(../../@TYPE = 'ME' and ../../@VIEW != 'SE') or (../../@TYPE = 'ME' and count(../../@VIEW) = 0)">
            <xsl:attribute name="title">
                <xsl:value-of select="../LBL"/>
                <!--<xsl:if test="../REQD='-1'"> * </xsl:if>-->
            </xsl:attribute>
        </xsl:if>
    </input>    
    <xsl:call-template name="LovHandler_tmp">
        <xsl:with-param name="curr_fld" select=".." />
        <xsl:with-param name="EntityType" select="$EntityType" />
    </xsl:call-template>
    <xsl:if test="count(../POPUPEDIT) &gt; 0 or (number(../MAXLENGTH) &gt; $displaySize)">
        <BUTTON class="BTNhide" oldClassName = "BTNimg" title="{$narrative}" disabled="true">
            <xsl:if test="count(../READ_ONLY) = 0 or ../READ_ONLY = 0">
                <xsl:attribute name="tabindex">-1</xsl:attribute>
            </xsl:if>
            <xsl:call-template name="Popup_Handler_tmp" />
            <span class="ICOnarrative">
                <xsl:if test="count(../READ_ONLY) = 0 or ../READ_ONLY = 0">
                    <xsl:attribute name="tabindex">-1</xsl:attribute>
                </xsl:if>
                <span class ="LBLinv"><xsl:value-of select = "$narrative"/></span>
            </span>   
        </BUTTON>
    </xsl:if>
</xsl:template>

<xsl:template name="ATTR_Handler_tmp">
    <xsl:param name="curr_fld" select="." />

    <xsl:attribute name="LABEL_VALUE">
        <xsl:value-of select="$curr_fld/LBL"/>
    </xsl:attribute>
    <xsl:attribute name="title">
        <xsl:value-of select="$curr_fld/LBL"/>
    </xsl:attribute>
    <xsl:attribute name="ID">
        <xsl:if test="count($curr_fld/../BLOCK) &gt; 0">
            <xsl:value-of select="concat($curr_fld/../BLOCK,'__',$curr_fld/NAME)" />
        </xsl:if>
    </xsl:attribute>
    <xsl:if test="count($curr_fld/@CONTROL) = 0 or $curr_fld/@CONTROL = 'N'">
        <xsl:attribute name="DBT">
            <xsl:value-of select="$curr_fld/../BLOCK" />
        </xsl:attribute>
        <xsl:attribute name="DBC">
            <xsl:value-of select="$curr_fld/NAME" />
        </xsl:attribute>
    </xsl:if>
    <xsl:if test="count($curr_fld/@UDF) != 0 or $curr_fld/@UDF = 'Y'">
        <xsl:attribute name="onbeforedeactivate">
            <xsl:text>fnUpdateUDFDBField(this)</xsl:text>
        </xsl:attribute>
    </xsl:if>
    <xsl:attribute name="NAME">
        <xsl:value-of select="$curr_fld/NAME" />
    </xsl:attribute>
		
    <xsl:attribute name="DTYPE">
        <xsl:value-of select="$curr_fld/DTYPE" />
    </xsl:attribute>

    <xsl:if test="count($curr_fld/VALUE) &gt; 0">
        <xsl:attribute name="VALUE">
            <xsl:value-of select="$curr_fld/VALUE" />
        </xsl:attribute>
        <xsl:if test="$curr_fld/TYPE != 'RADIO' and $curr_fld/TYPE != 'SELECT' and $curr_fld/TYPE != 'CHECKBOX' and normalize-space($curr_fld/VALUE) != ''">
            <xsl:attribute name="DEFAULT">
                <xsl:value-of select="$curr_fld/VALUE" />
            </xsl:attribute>
        </xsl:if>
    </xsl:if>
    <xsl:choose>
        <xsl:when test="number($curr_fld/SIZE) > 23">
            <xsl:attribute name="SIZE">
                <xsl:value-of select="23"/>
            </xsl:attribute>
        </xsl:when>
        <xsl:otherwise>
            <xsl:attribute name="SIZE">
                <xsl:if test="count(../POPUPEDIT) &gt; 0 or (count($curr_fld/MAXLENGTH) &gt;0 and $curr_fld/MAXLENGTH = '')">
                    <xsl:value-of select="$curr_fld/SIZE" />
                </xsl:if>
                <xsl:if test="count(../POPUPEDIT) = 0">
                    <xsl:if test="number($curr_fld/MAXLENGTH) &gt; $displaySize">
                        <xsl:value-of select="number($curr_fld/SIZE) - 4" />
                    </xsl:if>
                    <xsl:if test="number($curr_fld/MAXLENGTH) &lt;= $displaySize">
                        <xsl:value-of select="$curr_fld/SIZE" />
                    </xsl:if>
                </xsl:if>
            </xsl:attribute>
        </xsl:otherwise>
    </xsl:choose>
    <xsl:if test="count($curr_fld/READ_ONLY) &gt; 0 and $curr_fld/READ_ONLY = -1">
        <xsl:attribute name="TABINDEX">-1</xsl:attribute>  
        <xsl:if test="$curr_fld/TYPE != 'RADIO' and $curr_fld/TYPE != 'CHECKBOX' and $curr_fld/TYPE != 'TEXTAREA'">   
            <xsl:attribute name="class">TXTro</xsl:attribute>       	     
            <!--<xsl:attribute name="disabled">true</xsl:attribute>-->
            <xsl:if test="count($curr_fld/INPUT_LOV) > 0">
                <xsl:attribute name="INPUT_LOV"><xsl:value-of select = "'Y'"/></xsl:attribute>
            </xsl:if>
            <xsl:if test="count($curr_fld/INPUT_LOV) = 0 and $curr_fld/TYPE != 'TEXTAREA'">
                <xsl:attribute name="class">TXTro</xsl:attribute>       	     
                <!--<xsl:attribute name="disabled">true</xsl:attribute>-->
                <xsl:attribute name="INPUT_LOV"><xsl:value-of select = "'N'"/></xsl:attribute>
            </xsl:if>        
            <xsl:attribute name="READONLY">true</xsl:attribute>
            <xsl:attribute name="READONLY1">true</xsl:attribute>
        </xsl:if>
    </xsl:if>

      <xsl:if test="count($curr_fld/DISABLED) &gt; 0 and $curr_fld/DISABLED = -1">
        <xsl:attribute name="DISABLED">DISABLED</xsl:attribute>
        
        <xsl:if test="$curr_fld/TYPE != 'RADIO' and $curr_fld/TYPE != 'CHECKBOX'">
            <xsl:attribute name="class">TXTro</xsl:attribute>
        </xsl:if>
    </xsl:if>

    <xsl:if test = "$curr_fld[TYPE = 'CHECKBOX'] or $curr_fld[TYPE = 'SELECT']">
        <xsl:if test="count($curr_fld/READ_ONLY) &gt; 0 and $curr_fld/READ_ONLY = -1">
            <xsl:attribute name="DISABLED"/>
            <xsl:attribute name="READONLY">true</xsl:attribute>
            <xsl:attribute name="READONLY1">true</xsl:attribute>
        </xsl:if>
    </xsl:if>

    <xsl:if test="count($curr_fld/ACCESSKEY) &gt; 0 and normalize-space($curr_fld/ACCESSKEY) != ''">
        <xsl:attribute name="ACCESSKEY">
            <xsl:value-of select="$curr_fld/ACCESSKEY" />
        </xsl:attribute>
    </xsl:if>

    <xsl:apply-templates select="$curr_fld/EVENT" mode="template"/>
    <xsl:apply-templates select="$curr_fld/CUSTOM" mode="template" />
    
    <xsl:attribute name="REQUIRED">
        <xsl:value-of select="$curr_fld/REQD" />
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
        <xsl:if test="contains($refFld,'__')">
            <xsl:value-of select="substring-after($refFld,'__')"/>
        </xsl:if>
        <xsl:if test="not(contains($refFld,'__'))">
            <xsl:value-of select="$refFld"/>
        </xsl:if>
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

    <xsl:if test="count($curr_fld/HIDDEN) &gt; 0 and $curr_fld/HIDDEN = -1">
        <xsl:attribute name="class">hidden</xsl:attribute>
    </xsl:if>
    <xsl:if test="count($curr_fld/AMENDABLE) &gt; 0">
        <xsl:attribute name="AMENDABLE">
            <xsl:value-of select="$curr_fld/AMENDABLE"/>
        </xsl:attribute>
    </xsl:if>
      
    <xsl:if test="count($curr_fld/SUBSYSTEM) &gt; 0">
        <xsl:attribute name="SUBSYSTEM">
            <xsl:value-of select="$curr_fld/SUBSYSTEM"/>
        </xsl:attribute>
    </xsl:if>
    
    <xsl:if  test="($curr_fld/../@TYPE = 'ME') and ($curr_fld/../@VIEW = 'SE')">
        <xsl:attribute name="MEBLOCKID"><xsl:value-of select="$curr_fld/../BLOCK"/></xsl:attribute>
    </xsl:if>  
      
</xsl:template>


<xsl:template name="LovHandler_tmp">
    <xsl:param name="curr_fld" />
    <xsl:param name="EntityType" />
    
    <xsl:if test="count($curr_fld/LOV) &gt; 0 ">
        <BUTTON class="BTNhide" oldClassName = "BTNimg" title="{$lov}" disabled="true" tabindex="-1">
            <xsl:if test="count($curr_fld/INPUT_LOV) &gt; 0">
                <xsl:attribute name="tabindex">
                    <xsl:text>0</xsl:text>
                </xsl:attribute>
            </xsl:if>
            <xsl:call-template name="dispLov">
                <xsl:with-param name="curr_fld" select="$curr_fld"/>
                <xsl:with-param name="functionName" select="'disp_lov'"/>
            </xsl:call-template>
            
            <xsl:if test="count($curr_fld/READ_ONLY) &gt; 0 and $curr_fld/READ_ONLY = -1 and count($curr_fld/INPUT_LOV) = 0">
                <xsl:attribute name="DISABLED"/>
            </xsl:if>
            <span tabindex="-1" class="ICOlov"><span class ="LBLinv"><xsl:value-of select = "$lov"/></span></span>
        </BUTTON>
    </xsl:if>

    <!-- FCUBS10.3_WebBranch Changes chandra starts-->

    <xsl:if test="count($curr_fld/OFFLINE_LOV) &gt; 0 ">
        <BUTTON class="BTNhide" oldClassName = "BTNimg" title="{$lov}" disabled="true" tabindex="-1">
            <xsl:call-template name="dispOfflineLov">
                <xsl:with-param name="curr_fld" select="$curr_fld"/>
                <xsl:with-param name="functionName" select="'disp_offlinelov'"/>
            </xsl:call-template>
            <xsl:if test="count($curr_fld/READ_ONLY) &gt; 0 and $curr_fld/READ_ONLY = -1 and count($curr_fld/INPUT_LOV) = 0">
                <xsl:attribute name="DISABLED"/>
            </xsl:if>
            <span tabindex="-1" class="ICOlov"><span class ="LBLinv"><xsl:value-of select = "$lov"/></span></span>
        </BUTTON>
    </xsl:if>
    <!-- FCUBS10.3_WebBranch Changes chandra ends-->
    
    <xsl:if test="count($curr_fld/LOV) = 0 ">
        <xsl:if test="$EntityType = 'ACCOUNT' ">
            <BUTTON class="BTNhide" oldClassName = "BTNimg" title="{$lov}" ONCLICK="Account.show_lov()" disabled="true" tabindex="-1">
              <span tabindex="-1" class="ICOlov"><span class ="LBLinv"><xsl:value-of select = "$lov"/></span></span>
            </BUTTON>
        </xsl:if>
        
        <xsl:if test="$EntityType = 'BRANCH' ">
            <BUTTON class="BTNhide" oldClassName = "BTNimg"  title="{$lov}" ONCLICK="Branch.show_lov()" disabled="true" tabindex="-1">
            <span tabindex="-1" class="ICOlov"><span class ="LBLinv"><xsl:value-of select = "$lov"/></span></span>
            </BUTTON>
        </xsl:if>
        
        <xsl:if test="$EntityType = 'CURRENCY' ">
            <BUTTON class="BTNhide"  oldClassName = "BTNimg" title="{$lov}" ONCLICK="Currency.show_lov()" disabled="true" tabindex="-1">
            <span tabindex="-1" class="ICOlov"><span class ="LBLinv"><xsl:value-of select = "$lov"/></span></span>
            </BUTTON>
        </xsl:if>
        
        <xsl:if test="$EntityType = 'CUSTOMER' ">
            <BUTTON class="BTNhide" oldClassName = "BTNimg" title="{$lov}" ONCLICK="Customer.show_lov()" disabled="true" tabindex="-1">
            <span tabindex="-1" class="ICOlov"><span class ="LBLinv"><xsl:value-of select = "$lov"/></span></span>
            </BUTTON>
        </xsl:if>
    </xsl:if>
</xsl:template>

<xsl:template name="Popup_Handler_tmp">
    <xsl:attribute name="ONCLICK">
        <xsl:text>show_editor('</xsl:text>
        <xsl:value-of select="concat(../../BLOCK,'__',../NAME)"/>
        <xsl:text>','</xsl:text>
        <xsl:if test="count(../MAXLENGTH) != 0">
            <xsl:value-of select="../MAXLENGTH" />
        </xsl:if>
        <xsl:if test="count(../MAXLENGTH) = 0">
            <xsl:value-of select="../SIZE" />
        </xsl:if>
        <xsl:text>','</xsl:text>
        <xsl:if test="normalize-space(../POPUPEDIT/TITLE) != ''">
            <xsl:call-template name="replaceApos">
                <xsl:with-param name="inputString" select="../POPUPEDIT/TITLE"/>
            </xsl:call-template>
            <!--<xsl:value-of select="../POPUPEDIT/TITLE" />-->
        </xsl:if>
        <xsl:if test="normalize-space(../POPUPEDIT/TITLE) = ''">
            <xsl:call-template name="replaceApos">
                <xsl:with-param name="inputString" select="../LBL"/>
            </xsl:call-template>
            <!--<xsl:value-of select="../LBL" />-->
        </xsl:if>        
        <xsl:text>', event);</xsl:text>
    </xsl:attribute>
</xsl:template>

<xsl:template name="dispAutoLov">
    <xsl:param name="curr_node"/>
    <xsl:text>disp_auto_lov('</xsl:text>
    <xsl:value-of select="$functionId"/>
    <xsl:text>','</xsl:text>
    <xsl:value-of select="normalize-space($curr_node/../BLOCK)"/>
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
    <xsl:text>', event)</xsl:text>
</xsl:template>

<xsl:template name="dispLov">
    <xsl:param name="curr_fld"/>
    <xsl:param name="functionName"/>
    <xsl:attribute name="onclick">
        <xsl:value-of select="$functionName"/>
        <xsl:text>('</xsl:text>
        <xsl:value-of select="$functionId"/>
        <xsl:text>','</xsl:text>
        <xsl:value-of select="normalize-space($curr_fld/../BLOCK)"/>
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

<xsl:template name="dispOfflineLov">
    <xsl:param name="curr_fld"/>
    <xsl:param name="functionName"/>
    <xsl:attribute name="onclick">
        <xsl:value-of select="$functionName"/>
        <xsl:text>('</xsl:text>
        <xsl:value-of select="$functionId"/>
        <xsl:text>','</xsl:text>
        <xsl:value-of select="normalize-space($curr_fld/../BLOCK)"/>
        <xsl:text>','</xsl:text>
        <xsl:value-of select="normalize-space($curr_fld/NAME)"/>
        <xsl:text>','</xsl:text>
        <xsl:call-template name="replaceApos">
            <xsl:with-param name="inputString" select="normalize-space($curr_fld/LBL)"/>
        </xsl:call-template>
        <xsl:text>','</xsl:text>
        <xsl:value-of select="normalize-space($curr_fld/OFFLINE_LOV/NAME)"/>
        <xsl:text>','</xsl:text>
        <xsl:call-template name="replaceApos">
            <xsl:with-param name="inputString" select="normalize-space($curr_fld/OFFLINE_LOV/TITLE)"/>
        </xsl:call-template>
        <xsl:text>','</xsl:text>
        <xsl:call-template name="replaceApos">
            <xsl:with-param name="inputString" select="normalize-space($curr_fld/OFFLINE_LOV/COL_HEADING)"/>
        </xsl:call-template>
        <xsl:text>','</xsl:text>
        <xsl:call-template name="replaceApos">
            <xsl:with-param name="inputString" select="normalize-space($curr_fld/OFFLINE_LOV/RED_FIELD)"/>
        </xsl:call-template>
        <xsl:text>', '', event)</xsl:text>
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

<xsl:template name="dispLabelCaption_tmp">
    <xsl:param name="curr_fld" select="." />
    <xsl:if test="count($curr_fld/ACCESSKEY) &gt; 0 and normalize-space($curr_fld/ACCESSKEY) != ''">    
        <xsl:value-of select="substring-before($curr_fld/LBL,$curr_fld/ACCESSKEY)"/>
        <U><xsl:value-of select="$curr_fld/ACCESSKEY" /></U>
        <xsl:value-of select="substring-after($curr_fld/LBL,$curr_fld/ACCESSKEY)" />
    </xsl:if>
    <xsl:if test="count($curr_fld/ACCESSKEY) = 0 or (count($curr_fld/ACCESSKEY) &gt; 0 and normalize-space($curr_fld/ACCESSKEY) = '') or not(contains($curr_fld/LBL , $curr_fld/ACCESSKEY))">
        <xsl:value-of select="$curr_fld/LBL" />
    </xsl:if>
    <xsl:if test="$curr_fld/LBL = ''">
        <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
    </xsl:if>
    
</xsl:template>

<xsl:template name="dispCheckboxField_tmp">

    <xsl:if test="../../@TYPE != 'ME' or ../../@VIEW = 'SE'"> 
        <xsl:if test="../LBL != ''">
            <label class="LBLauto">
                <xsl:attribute name="for">
                    <xsl:if test="../../BLOCK != ''">
                         <xsl:value-of select="concat(../../BLOCK,'__',../NAME)"></xsl:value-of>
                    </xsl:if>
                    <xsl:if test="../BLOCK = ''">
                         <xsl:value-of select="../NAME"></xsl:value-of>
                    </xsl:if>
                </xsl:attribute>
                <input type="checkbox" class="CHKstd" disabled="true">
                    <xsl:call-template name="ATTR_Handler_tmp">
                        <xsl:with-param name="curr_fld" select=".." />
                    </xsl:call-template>
                    <xsl:if test="count(../CHECKED) &gt; 0 and ../CHECKED = -1">
                        <xsl:attribute name="CHECKED">CHECKED</xsl:attribute>
                        <xsl:attribute name="DEFAULT">yes</xsl:attribute>
                    </xsl:if>
                </input>
                <xsl:value-of select="../LBL"/>
            </label>
        </xsl:if>
        <xsl:if test="../LBL = ''">
            <label class="LBLauto LBLinv2">
                <xsl:attribute name="for">
                    <xsl:if test="../../BLOCK != ''">
                         <xsl:value-of select="concat(../../BLOCK,'__',../NAME)"></xsl:value-of>
                    </xsl:if>
                    <xsl:if test="../BLOCK = ''">
                         <xsl:value-of select="../NAME"></xsl:value-of>
                    </xsl:if>
                </xsl:attribute>
                <input type="checkbox" class="CHKstd" disabled="true">
                    <xsl:call-template name="ATTR_Handler_tmp">
                        <xsl:with-param name="curr_fld" select=".." />
                    </xsl:call-template>
                    <xsl:if test="count(../CHECKED) &gt; 0 and ../CHECKED = -1">
                        <xsl:attribute name="CHECKED">CHECKED</xsl:attribute>
                        <xsl:attribute name="DEFAULT">yes</xsl:attribute>
                    </xsl:if>
                </input>
                <xsl:value-of select="../../LBL"/>
            </label>
        </xsl:if>
    </xsl:if>

    <xsl:if test="(../../@TYPE = 'ME' and ../../@VIEW != 'SE') or (../../@TYPE = 'ME' and count(../../@VIEW) = 0)">
        <label class="LBLauto">
            <xsl:attribute name="for">
                <xsl:if test="../../BLOCK != ''">
                     <xsl:value-of select="concat(../../BLOCK,'__',../NAME)"></xsl:value-of>
                </xsl:if>
                <xsl:if test="../BLOCK = ''">
                     <xsl:value-of select="../NAME"></xsl:value-of>
                </xsl:if>
            </xsl:attribute>
            <span class="LBLinv">
                <xsl:value-of select="../NAME"></xsl:value-of>
            </span>
            <input type="checkbox" class="CHKstd" disabled="true">
                <xsl:call-template name="ATTR_Handler_tmp">
                    <xsl:with-param name="curr_fld" select=".." />
                </xsl:call-template>
                <xsl:if test="count(../CHECKED) &gt; 0 and ../CHECKED = -1">
                    <xsl:attribute name="CHECKED">CHECKED</xsl:attribute>
                    <xsl:attribute name="DEFAULT">yes</xsl:attribute>
                </xsl:if>
                <xsl:attribute name="title">
                    <xsl:value-of select="../LBL"/>
                </xsl:attribute>
            </input>
            <!--<xsl:value-of select="../LBL"/>-->
        </label>
    </xsl:if>

</xsl:template>


<xsl:template name="dispDateField_tmp">
    <xsl:variable name="refFld" select="../REF_FIELD"/>
    <xsl:variable name="referFld">
        <xsl:if test="contains($refFld,'__')">
            <xsl:value-of select="substring-after($refFld,'__')"/>
        </xsl:if>
        <xsl:if test="not(contains($refFld,'__'))">
            <xsl:value-of select="$refFld"/>
        </xsl:if>
    </xsl:variable>

    <INPUT TYPE="HIDDEN" data_type="DATE" onpropertychange="displayDate(this)">
        <xsl:call-template name="ATTR_HiddenEntity_Handler_tmp">
            <xsl:with-param name="curr_fld" select=".." />
        </xsl:call-template>
    </INPUT>
    <label class="LBLinv">
        <xsl:attribute name="for">
            <xsl:value-of select="concat(../../BLOCK,'__',../NAME)"></xsl:value-of>
            <xsl:text>I</xsl:text>
        </xsl:attribute>
         <xsl:if test="(../../@TYPE != 'ME' or ../../@VIEW = 'SE')">
            <xsl:if test="count(../REQD) = 0 or ../REQD = '0'">
                <xsl:attribute name="class">
                    <xsl:text>LBLstd</xsl:text>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="count(../REQD) &gt; 0 and ../REQD = '-1'">
                <xsl:attribute name="class">
                    <xsl:text>LBLstd star </xsl:text>
                </xsl:attribute>
            </xsl:if>
            <xsl:value-of select="../LBL"/>
        </xsl:if>
    </label>
    <INPUT TYPE="TEXT" class="TXTro" title="{../LBL}"  onblur="validateInputDate('{../NAME}', event)" readOnly="true" >
    
    <xsl:call-template name="ATTR_InputEntity_Handler_tmp">
        <xsl:with-param name="curr_fld" select=".." />
    </xsl:call-template>
    <xsl:attribute name="SIZE">
        <xsl:value-of select="11"/>
    </xsl:attribute>
    <xsl:if test="(../../@TYPE = 'ME' and ../../@VIEW != 'SE') or (../../@TYPE = 'ME' and count(../../@VIEW) = 0)">
        <xsl:attribute name="title">
            <xsl:value-of select="../LBL"/>
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
    </INPUT>
    <xsl:if test="count(../LOV) = 0">      
        <xsl:if test="count(../READ_ONLY) = 0 or ../READ_ONLY != -1">            
            <button class="BTNhide" oldClassName = "BTNimg" title="{$calendar}" onclick="disp_cal('{../NAME}', event)" disabled="true" tabindex="-1">
            <span tabindex="-1" class="ICOcalendar">            
            <span class ="LBLinv"><xsl:value-of select = "$calendar"/></span>
            </span>
            </button>
        </xsl:if>
    </xsl:if>
    <xsl:if test="count(../LOV) &gt; 0">
        <xsl:call-template name="LovHandler_tmp">
            <xsl:with-param name="curr_fld" select=".." />
        </xsl:call-template>
    </xsl:if>
</xsl:template>

<xsl:template name="dispDateTimeField_tmp">
    <INPUT TYPE="HIDDEN" data_type="DATE" onpropertychange="fnFormatTimeStamp(this)">
        <xsl:call-template name="ATTR_HiddenEntity_Handler_tmp">
            <xsl:with-param name="curr_fld" select=".." />
        </xsl:call-template>
    </INPUT>
    <label class="LBLinv">
        <xsl:attribute name="for">
            <xsl:value-of select="concat(../../BLOCK,'__',../NAME)"></xsl:value-of>
            <xsl:text>I</xsl:text>
        </xsl:attribute>
        <xsl:if test="(../../@TYPE != 'ME' or ../../@VIEW = 'SE')">
            <xsl:attribute name="class">
                <xsl:text>LBLstd</xsl:text>
            </xsl:attribute>
            <xsl:value-of select="../LBL"/>
        </xsl:if>
    </label>
    <INPUT TYPE="TEXT" class="TXTro">
        <xsl:call-template name="ATTR_InputEntity_Handler_tmp">
            <xsl:with-param name="curr_fld" select=".." />
        </xsl:call-template>
        <xsl:attribute name="SIZE">
            <xsl:value-of select="20"/>
        </xsl:attribute>
    </INPUT>
</xsl:template>

<xsl:template name="dispTextareaField_tmp" >
    <xsl:param name="position" select="."/>

    <TEXTAREA class="TXAro" tabindex="0">
        <xsl:attribute name="ROWS">
            <xsl:if test="../ROWS = ''">
                <xsl:text>2</xsl:text>
            </xsl:if>
            <xsl:if test="../ROWS != ''">
                <xsl:value-of select="../ROWS"/>
            </xsl:if>
        </xsl:attribute>
        <xsl:attribute name="COLS">
            <xsl:if test="../COLS = ''">
                <xsl:text>20</xsl:text>
            </xsl:if>
            <xsl:if test="../COLS != ''">
                <xsl:value-of select="../COLS"/>
            </xsl:if>
        </xsl:attribute>
        <xsl:call-template name="ATTR_Handler_tmp">
            <xsl:with-param name="curr_fld" select=".." /> 
        </xsl:call-template>
        <xsl:attribute name="readOnly">true</xsl:attribute>
        <xsl:attribute name="MAXLENGTH">
            <xsl:if test="count(../MAXLENGTH) != 0">
                <xsl:value-of select="../MAXLENGTH" />
            </xsl:if>
            <xsl:if test="count(../MAXLENGTH) = 0">
                <xsl:value-of select="../SIZE" />
            </xsl:if>
        </xsl:attribute>
        
        <!-- for ME text fields needs add title and * !--> 
        <xsl:if test="(../../@TYPE = 'ME' and ../../@VIEW != 'SE') or (../../@TYPE = 'ME' and count(../../@VIEW) = 0)">
            <xsl:attribute name="title">
                <xsl:value-of select="../LBL"/>
            <!--<xsl:if test="../REQD='-1'"> * </xsl:if>-->
            </xsl:attribute>
        </xsl:if> 
    </TEXTAREA>
    
    <xsl:if test="count(../POPUPEDIT) &gt; 0 and (count(../READ_ONLY) = 0 or ../READ_ONLY = 0)">
         <BUTTON class="BTNhide" oldClassName = "BTNimg"  disabled="true" title="{$narrative}" tabindex="-1">
            <xsl:call-template name="Popup_Handler_tmp" />
            <span class="ICOnarrative" tabindex="-1"><span class ="LBLinv"><xsl:value-of select = "$narrative"/></span></span>   
        </BUTTON>
    </xsl:if>
    
</xsl:template>


<xsl:template name="dispSelectField_tmp">
    
    <SELECT class="SELro">
        <xsl:if test="../TYPE = 'ROSELECT'">
            <xsl:attribute name="ROSELECT">true</xsl:attribute>
            <xsl:attribute name="onpropertychange">fnShowROSelectValue(this)</xsl:attribute>
        </xsl:if>
        <xsl:if test="../TYPE != 'ROSELECT'">
            <xsl:attribute name="disabled">true</xsl:attribute>
        </xsl:if>
    
    <xsl:attribute name="ID">
        <xsl:value-of select="concat(../BLOCK,'__',../NAME)"></xsl:value-of>
    </xsl:attribute>
    
    <xsl:call-template name="ATTR_Handler_tmp">
        <xsl:with-param name="curr_fld" select=".." />
    </xsl:call-template>
    

    <xsl:if test="(../../@TYPE = 'ME' and ../../@VIEW != 'SE') or (../../@TYPE = 'ME' and count(../../@VIEW) = 0)">
        <xsl:attribute name="title">
            <xsl:value-of select="../LBL"/>
            <!--<xsl:if test="../REQD='-1'"> * </xsl:if>-->
        </xsl:attribute>
    </xsl:if>
    
    <xsl:if test="count(../MULTIPLE) &gt; 0 and ../MULTIPLE = -1">
        <xsl:attribute name="MULTIPLE">MULTIPLE</xsl:attribute>
    </xsl:if>
    
    <!--Added by Binson -->
    <xsl:if test="count(../WIDTH) &gt; 0">
        <xsl:attribute name="STYLE">
            <xsl:text>{width:</xsl:text>
                <xsl:value-of select="../WIDTH" />
            <xsl:text>px;}</xsl:text>
        </xsl:attribute>
    </xsl:if>
    
    <xsl:for-each select="../OPTION">
        <OPTION VALUE="{@VALUE}">
            <xsl:if test="count(@SELECTED) &gt; 0 and @SELECTED=-1">
                <xsl:attribute name="SELECTED">SELECTED</xsl:attribute>
                <xsl:attribute name="DEFAULT">
                    <xsl:value-of select="@VALUE"/>
                </xsl:attribute>
            </xsl:if>
            <xsl:value-of select="." />
        </OPTION>
    </xsl:for-each>
    </SELECT>
</xsl:template>

<xsl:template name="dispButtonField_tmp">
    <BUTTON class="BTNtext" disabled = "true">
        <xsl:call-template name="ATTR_Handler_tmp">
            <xsl:with-param name="curr_fld" select=".." />
   	</xsl:call-template>
        <xsl:choose>
            <xsl:when test="contains(../NAME,'BTN_PREV') or contains(../NAME,'BTN_NEXT') or contains(../NAME,'BTN_NEXT') or contains(../NAME,'BTN_REMOVE')">
                <xsl:attribute name="class">BTNimg</xsl:attribute>
                <xsl:variable name="l_btnimg">
                    <xsl:if test="contains(../NAME,'BTN_PREV')"><xsl:value-of select="'ICOprevious'"/></xsl:if>
                    <xsl:if test="contains(../NAME,'BTN_NEXT')"><xsl:value-of select="'ICOnext'"/></xsl:if>
                    <xsl:if test="contains(../NAME,'BTN_ADD')"><xsl:value-of select="'ICOadd'"/></xsl:if>
                    <xsl:if test="contains(../NAME,'BTN_REMOVE')"><xsl:value-of select="'ICOremove'"/></xsl:if>
                </xsl:variable>
                <xsl:if test="count(../../BLOCK) = 0">
                    <xsl:attribute name="ID"><xsl:value-of select="../ID" /></xsl:attribute>
                    <xsl:attribute name="NAME"><xsl:value-of select="../NAME" /></xsl:attribute>
                </xsl:if>
                 <span tabindex="-1" class="{$l_btnimg}"></span>                   
            </xsl:when>
            <xsl:otherwise>
                <xsl:if test="count(../SRC) &gt; 0">
                    <xsl:attribute name="class">BTNtext</xsl:attribute>                   
                    <xsl:if test="count(../../BLOCK) = 0">
                        <xsl:attribute name="ID"><xsl:value-of select="../NAME" /></xsl:attribute>
                        <xsl:attribute name="NAME"><xsl:value-of select="../NAME" /></xsl:attribute>
                    </xsl:if>
                    <xsl:variable name="l_srcimg" select="../className"/>
                    <span tabindex="-1" class="{$l_srcimg}"></span>  
                    <!--<img class="IMGInline" src="{$imgPath_XSL}/{$l_srcimg}"/>-->
                </xsl:if>
            </xsl:otherwise>
        </xsl:choose>
       <xsl:value-of select="../LBL"/>
    </BUTTON>
</xsl:template>

<xsl:template name="dispFileField_tmp">
    
    <label class="LBLstd" for=""></label>
    <INPUT TYPE="File" class="TXTro"  size="10" readOnly="true" >
        <xsl:call-template name="ATTR_Handler_tmp">
            <xsl:with-param name="curr_fld" select=".." />
        </xsl:call-template>

        <xsl:if test="(../../@TYPE = 'ME' and ../../@VIEW != 'SE') or (../../@TYPE = 'ME' and count(../../@VIEW) = 0)">
            <xsl:attribute name="title">
                <xsl:value-of select="../LBL"/>
            </xsl:attribute>
        </xsl:if>
    </INPUT>
    
</xsl:template>

<xsl:template name="dispMaskField_tmp">
    <xsl:param name="EntityType"/>
    <label class="LBLinv" for=""></label>
    <INPUT TYPE="HIDDEN" onpropertychange="displayValue(this)">
        <xsl:call-template name="ATTR_HiddenEntity_Handler_tmp">
            <xsl:with-param name="curr_fld" select=".." />
        </xsl:call-template>
    </INPUT>

    <!--<INPUT TYPE="TEXT" class="TXTro" mask="{../MASK}" onactivate="acceptInputValue('{../NAME}')" onbeforedeactivate="validateInputValue('{../NAME}');" readOnly="true" >-->
    <label class="LBLstd" for=""></label><INPUT TYPE="TEXT" class="TXTro" mask="{../MASK}" onblur="validateInputValue('{../NAME}');" readOnly="true" >
        <xsl:call-template name="ATTR_InputEntity_Handler_tmp">
            <xsl:with-param name="curr_fld" select=".." />
        </xsl:call-template>
    
    <xsl:if test="(../../@TYPE = 'ME' and ../../@VIEW != 'SE') or (../../@TYPE = 'ME' and count(../../@VIEW) = 0)">  
        <xsl:attribute name="title">
            <xsl:value-of select="../LBL"/>
            <xsl:if test="count(../REQD) &gt; 0 and ../REQD = '-1'"> * </xsl:if>
        </xsl:attribute>
    </xsl:if>
    
    </INPUT>
</xsl:template>

<xsl:template name="dispPasswordField_tmp">    
    <Input type="PASSWORD" class="TXTro" onpaste="return false;" readOnly="true" >
        <xsl:call-template name="ATTR_Handler_tmp">
            <xsl:with-param name="curr_fld" select=".." />
        </xsl:call-template>
    
        <xsl:attribute name="MAXLENGTH">
            <xsl:if test="count(../MAXLENGTH) != 0">
                <xsl:value-of select="../MAXLENGTH" />
            </xsl:if>
            <xsl:if test="count(../MAXLENGTH) = 0">
                <xsl:value-of select="../SIZE" />
            </xsl:if>
        </xsl:attribute>
    
        <xsl:if test="(../../@TYPE = 'ME' and ../../@VIEW != 'SE') or (../../@TYPE = 'ME' and count(../../@VIEW) = 0)">
            <xsl:attribute name="title">
                <xsl:value-of select="../LBL"/>
                <!-- <xsl:if test="../REQD='-1'"> * </xsl:if> -->
            </xsl:attribute>
        </xsl:if>
    </Input>
</xsl:template>

<xsl:template name="dispLabelOnlyField_tmp">
    <label class="LBLauto">
        <xsl:if test="../TYPE[text()='GROUP']">
            <xsl:attribute name="class">
                <xsl:value-of select="'LABELGroup'"/>
            </xsl:attribute>
        </xsl:if>
        <xsl:call-template name="ATTR_Handler_tmp">
            <xsl:with-param name="curr_fld" select=".." />
        </xsl:call-template>
        <xsl:value-of select="../LBL" />
    </label>
</xsl:template>
<xsl:template name="dispImgField_tmp">
	<!-- Display Image -->
    <IMG CLASS="IMGButton" SRC="{../SRC}">
        <xsl:call-template name="ATTR_Handler_tmp">
          <xsl:with-param name="curr_fld" select=".." />
        </xsl:call-template>
        <xsl:if test="count(../ALT) &gt; 0">
            <xsl:attribute name="ALT">
                <xsl:value-of select="../ALT" />
            </xsl:attribute>
        </xsl:if>
    </IMG>
</xsl:template>


<xsl:template name="dispDescriptionField_tmp">
    <xsl:param name="EntityType"/>

    <label class="LBLauto">
    <xsl:call-template name="ATTR_Handler_tmp">
        <xsl:with-param name="curr_fld" select=".." />
    </xsl:call-template>

    <xsl:if test="count(../VALUE) &gt; 0">
        <xsl:value-of select="../VALUE" />
    </xsl:if>
    </label>

</xsl:template>

<xsl:template name="dispLinkType_tmp">
    <xsl:variable name="paramList">
        <xsl:for-each select="../CUSTOM/*"><xsl:value-of select="name()"/>=<xsl:value-of select="."/>&amp;</xsl:for-each>
    </xsl:variable>

    <a class="" onclick="fnLaunchLinkWindow(this,'{$paramList}');">
        <xsl:attribute name="href">
            <xsl:if test="contains(../LABEL_LINK,'http://')"><xsl:value-of select="../LABEL_LINK"/></xsl:if>
            <xsl:if test="not(contains(../LABEL_LINK,'http://'))">http://<xsl:value-of select="../LABEL_LINK"/></xsl:if>
        </xsl:attribute>
        <span class="Astd">
        <xsl:if test="../LBL != ''">
            <xsl:value-of select="../LBL" />
        </xsl:if>

        <xsl:if test="../LBL = ''">
            <xsl:value-of select="../LABEL_LINK" />
        </xsl:if>
        </span>
    </a>
    
</xsl:template>
<xsl:template name="dispCheckboxField_tmp_fldset">
    <xsl:if test="../LBL != ''">
        <label class="LBLauto">
            <xsl:attribute name="for">
                <xsl:if test="../../BLOCK != ''">
                     <xsl:value-of select="concat(../../BLOCK,'__',../NAME)"></xsl:value-of>
                </xsl:if>
                <xsl:if test="../BLOCK = ''">
                     <xsl:value-of select="../NAME"></xsl:value-of>
                </xsl:if>
            </xsl:attribute>
            <input type="checkbox" class="INPUTCheckInline" disabled="true">
                <xsl:call-template name="ATTR_Handler_tmp">
                    <xsl:with-param name="curr_fld" select=".." />
                </xsl:call-template>
                <xsl:if test="count(../CHECKED) &gt; 0 and ../CHECKED = -1">
                    <xsl:attribute name="CHECKED">CHECKED</xsl:attribute>
                    <xsl:attribute name="DEFAULT">yes</xsl:attribute>
                </xsl:if>
            </input>
            <xsl:value-of select="../LBL"/>
        </label>
    </xsl:if>
    <xsl:if test="../LBL = ''">
        <label class="LBLauto LBLinv2">
            <xsl:attribute name="for">
                <xsl:if test="../../BLOCK != ''">
                     <xsl:value-of select="concat(../../BLOCK,'__',../NAME)"></xsl:value-of>
                </xsl:if>
                <xsl:if test="../BLOCK = ''">
                     <xsl:value-of select="../NAME"></xsl:value-of>
                </xsl:if>
            </xsl:attribute>
            <input type="checkbox" class="INPUTCheckInline" disabled="true">
                <xsl:call-template name="ATTR_Handler_tmp">
                    <xsl:with-param name="curr_fld" select=".." />
                </xsl:call-template>
                <xsl:if test="count(../CHECKED) &gt; 0 and ../CHECKED = -1">
                    <xsl:attribute name="CHECKED">CHECKED</xsl:attribute>
                    <xsl:attribute name="DEFAULT">yes</xsl:attribute>
                </xsl:if>
            </input>
            <xsl:value-of select="../../LBL"/>
        </label>
    </xsl:if>
</xsl:template>
<!-- 13/10/08 OCX Related modification starts -->
<xsl:template name="dispOCX">
    <xsl:variable name="fieldName" select="../NAME"/>
    <OBJECT>
        <xsl:attribute name="ID">
            <xsl:value-of select="$fieldName"/>
        </xsl:attribute>
        <xsl:attribute name="CLASSID">
            <xsl:value-of select="../OBJECT/@CLASSID"/> 
        </xsl:attribute>
    </OBJECT>
</xsl:template>
<!-- 13/10/08 OCX Related modification ends -->
<xsl:template name="StdBtnEntry_tmp">
    <xsl:if test="/FORM/SCREEN[@NAME = $screen]/EXIT_BTN = '1'">
        <input type="button" ID = "BTN_EXIT_IMG" name="BTN_EXIT" VALUE = "{$exit}" class="BTNfooter" onclick="fnExitAll('', event) " onkeydown="return handleScrObj(this,event)" onmouseover="this.className='BTNfooterH'" onblur="this.className='BTNfooter'" onfocus="this.className='BTNfooterH'" onmouseout="this.className='BTNfooter'">
            <xsl:if test="/FORM/SCREEN[@NAME = $screen]/@MAIN_WIN != 'Y' or $thirdChar = 'C'">
                <xsl:attribute name="onclick">
                    <xsl:text>fnExitAll('</xsl:text><xsl:value-of select="$screen"/><xsl:text>', event)</xsl:text>
                </xsl:attribute>
            </xsl:if>
        </input>
    </xsl:if>
    <xsl:if test="/FORM/SCREEN[@NAME = $screen]/EXIT_BTN = '2'">
        <input type="button" name="BTN_OK" ID = "BTN_OK" VALUE = "{$ok}" class="BTNfooter" onclick="fnSaveAll('', event)">
            <xsl:if test="/FORM/SCREEN[@NAME = $screen]/@MAIN_WIN != 'Y' or $thirdChar = 'C' or $functionId='EXTAUTHORIZE'">
                <xsl:attribute name="onclick">
                    <xsl:text>fnSaveAll('</xsl:text><xsl:value-of select="$screen"/><xsl:text>', event)</xsl:text>
                </xsl:attribute>
            </xsl:if>
        </input>
        <input type="button" name="BTN_EXIT" ID = "BTN_EXIT_IMG" VALUE = "{$exit}" class="BTNfooter" onclick="fnExitAll('', event)" onkeydown="return handleScrObj(this,event)" onmouseover="this.className='BTNfooterH'" onblur="this.className='BTNfooter'" onfocus="this.className='BTNfooterH'" onmouseout="this.className='BTNfooter'">
            <xsl:if test="/FORM/SCREEN[@NAME = $screen]/@MAIN_WIN != 'Y' or $thirdChar = 'C' or $functionId='EXTAUTHORIZE'">
                <xsl:attribute name="onclick">
                    <xsl:text>fnExitAll('</xsl:text><xsl:value-of select="$screen"/><xsl:text>', event)</xsl:text>
                </xsl:attribute>
            </xsl:if>
        </input>
    </xsl:if>
    <xsl:if test="/FORM/SCREEN[@NAME = $screen]/EXIT_BTN = '3'">
        <input type="button" name="BTN_OK" ID = "BTN_OK" VALUE = "{$ok}" class="BTNfooter" onclick="fnSaveAll('', event)">
            <xsl:if test="/FORM/SCREEN[@NAME = $screen]/@MAIN_WIN != 'Y' or $thirdChar = 'C' or $functionId='EXTAUTHORIZE'">
                <xsl:attribute name="onclick">
                    <xsl:text>fnSaveAll('</xsl:text><xsl:value-of select="$screen"/><xsl:text>', event)</xsl:text>
                </xsl:attribute>
            </xsl:if>
        </input>
	<input type="button" name="BTN_REJECT" ID = "BTN_REJECT" VALUE = "{$reject}" class="BTNfooter" onclick="fnRejectAll('', event)">
            <xsl:if test="/FORM/SCREEN[@NAME = $screen]/@MAIN_WIN != 'Y' or $thirdChar = 'C' or $functionId='EXTAUTHORIZE'">
                <xsl:attribute name="onclick">
                    <xsl:text>fnRejectAll('</xsl:text><xsl:value-of select="$screen"/><xsl:text>', event)</xsl:text>
                </xsl:attribute>
            </xsl:if>
        </input>
        <input type="button" name="BTN_EXIT" ID = "BTN_EXIT_IMG" VALUE = "{$exit}" class="BTNfooter" onclick="fnExitAll('', event)" onkeydown="return handleScrObj(this,event)" onmouseover="this.className='BTNfooterH'" onblur="this.className='BTNfooter'" onfocus="this.className='BTNfooterH'" onmouseout="this.className='BTNfooter'">
            <xsl:if test="/FORM/SCREEN[@NAME = $screen]/@MAIN_WIN != 'Y' or $thirdChar = 'C' or $functionId='EXTAUTHORIZE'">
                <xsl:attribute name="onclick">
                    <xsl:text>fnExitAll('</xsl:text><xsl:value-of select="$screen"/><xsl:text>', event)</xsl:text>
                </xsl:attribute>
            </xsl:if>
        </input>
    </xsl:if>
</xsl:template>
<!-- End of ExtCore.xsl -->

    <xsl:variable name="uixml">
        <xsl:if test="$uiXML != ''">
            <xsl:value-of select="$uiXML"/>
        </xsl:if>
        <xsl:if test="$uiXML = ''">
            <xsl:value-of select="$functionId"/>
        </xsl:if>
    </xsl:variable>
    <xsl:variable name="l_scr_type" select="/FORM/SCREEN[@NAME=$screen]/@TMP_SCR_TYPE"/>
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
    
    <xsl:template match="/">
        <xsl:apply-templates select="FORM/SCREEN[@NAME=$screen]"/>
    </xsl:template>
    
    <xsl:template match="SCREEN">
        <xsl:apply-templates select="BODY/TAB[@ID=$CurTabId]">
        </xsl:apply-templates>
    </xsl:template>
    
    <xsl:template match="BODY/TAB">
        <a name="href{@ID}"></a>
        <xsl:apply-templates select="SECTION"/>
    </xsl:template>
    
    <xsl:template name="dispOfflineAutoLov">
        <xsl:param name="curr_node"/>
        <xsl:text>disp_auto_offlinelov('</xsl:text>
        <xsl:value-of select="$functionId"/>
        <xsl:text>','</xsl:text>
        <xsl:value-of select="normalize-space($curr_node/../BLOCK)"/>
        <xsl:text>','</xsl:text>
        <xsl:value-of select="normalize-space($curr_node/NAME)"/>
        <xsl:text>','</xsl:text>
        <xsl:call-template name="replaceApos">
            <xsl:with-param name="inputString" select="normalize-space($curr_node/LBL)"/>
        </xsl:call-template>
        <xsl:text>','</xsl:text>
        <xsl:value-of select="normalize-space($curr_node/OFFLINE_LOV/NAME)"/>
        <xsl:text>','</xsl:text>
        <xsl:call-template name="replaceApos">
            <xsl:with-param name="inputString" select="normalize-space($curr_node/OFFLINE_LOV/TITLE)"/>
        </xsl:call-template>
        <xsl:text>','</xsl:text>
        <xsl:call-template name="replaceApos">
            <xsl:with-param name="inputString" select="normalize-space($curr_node/OFFLINE_LOV/COL_HEADING)"/>
        </xsl:call-template>
        <xsl:text>','</xsl:text>
        <xsl:call-template name="replaceApos">
            <xsl:with-param name="inputString" select="normalize-space($curr_node/OFFLINE_LOV/RED_FIELD)"/>
        </xsl:call-template>
        <xsl:text>', event)</xsl:text>
    </xsl:template>
    
</xsl:stylesheet>
