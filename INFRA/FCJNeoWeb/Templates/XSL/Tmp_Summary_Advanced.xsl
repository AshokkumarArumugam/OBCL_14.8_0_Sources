<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <!-- <xsl:import href="GlobalCore.xsl"/> -->
    <!--<xsl:import href="GlobalCore_RAD.xsl"/>-->
    <!--<xsl:variable name="imgPath_XSL" select="'Images/Flexblue'"/>-->
    <!--<xsl:import href="ExtLabels.xsl"/>-->
    <!-- Start of ExtLabels.xsl -->
    <xsl:variable name="advanced_SummaryAudit"
                  select="substring-before(substring-after($summaryLabels, 'LBL_ADVANCED~~'), '@@')"/>
    <xsl:variable name="search_SummaryAudit"
                  select="substring-before(substring-after($summaryLabels, 'LBL_SEARCH~~'), '@@')"/>
    <xsl:variable name="reset_SummaryAudit"
                  select="substring-before(substring-after($summaryLabels, 'LBL_RESET~~'), '@@')"/>
    <xsl:variable name="recordsPerPage_SummaryAudit"
                  select="substring-before(substring-after($summaryLabels, 'LBL_RECORDS_PER_PAGE~~'), '@@')"/>
    <xsl:variable name="gotoPage_SummaryAudit"
                  select="substring-before(substring-after($summaryLabels, 'LBL_GOTO_PAGE~~'), '@@')"/>
    <xsl:variable name="of_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_OF~~'), '@@')"/>
    <xsl:variable name="query_SummaryAudit"
                  select="substring-before(substring-after($summaryLabels, 'LBL_QRY_QUERY~~'), '@@')"/>
    <xsl:variable name="refresh_SummaryAudit"
                  select="substring-before(substring-after($summaryLabels, 'LBL_REFRESH~~'), '@@')"/>
    <xsl:variable name="result_SummaryAudit"
                  select="substring-before(substring-after($summaryLabels, 'LBL_RESULT~~'), '@@')"/>
    <!-- bug id 14842317 change starts  -->
    <xsl:variable name="search_CaseSensitive"
                  select="substring-before(substring-after($summaryLabels, 'LBL_CASE_SENSITIVE~~'), '@@')"/>
    <!-- bug id 14842317 change ends  -->
    <xsl:variable name="makerId_SummaryAudit"
                  select="substring-before(substring-after($summaryLabels, 'LBL_MAKERID~~'), '@@')"/>
    <xsl:variable name="checkerId_SummaryAudit"
                  select="substring-before(substring-after($summaryLabels, 'LBL_CHECKER_ID~~'), '@@')"/>
    <xsl:variable name="recordStat_SummaryAudit"
                  select="substring-before(substring-after($summaryLabels, 'LBL_RECORD_STAT~~'), '@@')"/>
    <xsl:variable name="authStat_SummaryAudit"
                  select="substring-before(substring-after($summaryLabels, 'LBL_AUTHORISATION_STATUS~~'), '@@')"/>
    <xsl:variable name="makerDate_SummaryAudit"
                  select="substring-before(substring-after($summaryLabels, 'LBL_MAKER_DT_STAMP~~'), '@@')"/>
    <xsl:variable name="checkerDate_SummaryAudit"
                  select="substring-before(substring-after($summaryLabels, 'LBL_CHECKER_DT_STAMP~~'), '@@')"/>
    <xsl:variable name="lableA_SummaryAudit"
                  select="substring-before(substring-after($summaryLabels, 'LBL_A~~'), '@@')"/>
    <xsl:variable name="lableU_SummaryAudit"
                  select="substring-before(substring-after($summaryLabels, 'LBL_SUMMARY_U~~'), '@@')"/>
    <xsl:variable name="lableO_SummaryAudit"
                  select="substring-before(substring-after($summaryLabels, 'LBL_O~~'), '@@')"/>
    <xsl:variable name="lableC_SummaryAudit"
                  select="substring-before(substring-after($summaryLabels, 'LBL_C~~'), '@@')"/>
    <xsl:variable name="unauthorized_SummaryAudit"
                  select="substring-before(substring-after($summaryLabels, 'LBL_UN_AUTH_FLG~~'), '@@')"/>
    <xsl:variable name="open_SummaryAudit"
                  select="substring-before(substring-after($summaryLabels, 'LBL_OPEN~~'), '@@')"/>
    <xsl:variable name="closed_SummaryAudit"
                  select="substring-before(substring-after($summaryLabels, 'LBL_CLOSED~~'), '@@')"/>
    <xsl:variable name="authStat_Audit"
                  select="substring-before(substring-after($summaryLabels, 'LBL_AUTHORIZED~~'), '@@')"/>
    <xsl:variable name="authorized_SummaryAudit"
                  select="substring-before(substring-after($summaryLabels, 'LBL_AUTHORIZED~~'), '@@')"/>
    <xsl:variable name="exit_SummaryAudit"
                  select="substring-before(substring-after($summaryLabels, 'LBL_EXIT~~'), '@@')"/>
    <xsl:variable name="ok_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_OK~~'), '@@')"/>
    <xsl:variable name="cancle_SummaryAudit"
                  select="substring-before(substring-after($summaryLabels, 'LBL_CANCEL~~'), '@@')"/>
    <xsl:variable name="fields_SummaryAudit"
                  select="substring-before(substring-after($summaryLabels, 'LBL_FIELDS~~'), '@@')"/>
    <xsl:variable name="operator_SummaryAudit"
                  select="substring-before(substring-after($summaryLabels, 'LBL_OPERATOR~~'), '@@')"/>
    <xsl:variable name="value_SummaryAudit"
                  select="substring-before(substring-after($summaryLabels, 'LBL_VALUE~~'), '@@')"/>
    <xsl:variable name="and_SummaryAudit"
                  select="substring-before(substring-after($summaryLabels, 'LBL_AND~~'), '@@')"/>
    <xsl:variable name="accept_SummaryAudit"
                  select="substring-before(substring-after($summaryLabels, 'LBL_ACCEPT~~'), '@@')"/>
    <xsl:variable name="clearQuery_SummaryAudit"
                  select="substring-before(substring-after($summaryLabels, 'LBL_CLEAR_QUERY~~'), '@@')"/>
    <xsl:variable name="orderBy_SummaryAudit"
                  select="substring-before(substring-after($summaryLabels, 'LBL_ORDER_BY~~'), '@@')"/>
    <xsl:variable name="ascending_SummaryAudit"
                  select="substring-before(substring-after($summaryLabels, 'LBL_ASCENDING~~'), '@@')"/>
    <xsl:variable name="descending_SummaryAudit"
                  select="substring-before(substring-after($summaryLabels, 'LBL_DESCENDING~~'), '@@')"/>
    <xsl:variable name="to_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_TO~~'), '@@')"/>
    <xsl:variable name="or_SummaryAudit" select="substring-before(substring-after($summaryLabels, 'LBL_OR~~'), '@@')"/>
    <!--12.0.4 performance changes starts-->
    <xsl:variable name="recommendeCriteria"
                  select="substring-before(substring-after($summaryLabels, 'LBL_RECOMMENDED~~'), '@@')"/>
    <!-- 12.1 summary performance changes new start -->
    <!--12.0.4 performance changes ends-->
    <xsl:variable name="ok" select="substring-before(substring-after($summaryLabels, 'LBL_OK~~'), '@@')"/>
    <xsl:variable name="exit" select="substring-before(substring-after($summaryLabels, 'LBL_EXIT~~'), '@@')"/>
    <xsl:variable name="cancel" select="substring-before(substring-after($summaryLabels, 'LBL_CANCEL~~'), '@@')"/>
    <xsl:variable name="vernoOfLbl" select="substring-before(substring-after($summaryLabels, 'LBL_OF~~'), '@@')"/>
    <xsl:variable name="lock_SummaryAudit"
                  select="substring-before(substring-after($summaryLabels, 'LBL_SUM_LOCK~~'), '@@')"/>
    <xsl:variable name="checkboxYes"
                  select="substring-before(substring-after($summaryLabels, 'LBL_CHECKBOX_YES~~'), '@@')"/>
    <xsl:variable name="checkboxNo"
                  select="substring-before(substring-after($summaryLabels, 'LBL_CHECKBOX_NO~~'), '@@')"/>
    <xsl:variable name="mandatory"
                  select="substring-before(substring-after($summaryLabels, 'LBL_INFRA_MANDATORY~~'), '@@')"/>
    <xsl:variable name="noScript"
                  select="substring-before(substring-after($summaryLabels, 'LBL_NOSCRIPT_LABEL~~'), '@@')"/>
    <xsl:variable name="summary" select="substring-before(substring-after($summaryLabels, 'LBL_SUMMARY~~'), '@@')"/>
    <xsl:variable name="expand_group"
                  select="substring-before(substring-after($summaryLabels, 'LBL_EXPAND_GROUP~~'), '@@')"/>
    <xsl:variable name="lov" select="substring-before(substring-after($summaryLabels, 'LBL_LIST_OF_VALUES~~'), '@@')"/>
    <xsl:variable name="previous"
                  select="substring-before(substring-after($summaryLabels, 'LBL_INFRA_PREVIOUS~~'), '@@')"/>
    <xsl:variable name="next" select="substring-before(substring-after($summaryLabels, 'LBL_NEXT~~'), '@@')"/>
    <xsl:variable name="first" select="substring-before(substring-after($summaryLabels, 'LBL_FIRST~~'), '@@')"/>
    <xsl:variable name="last" select="substring-before(substring-after($summaryLabels, 'LBL_LAST~~'), '@@')"/>
    <xsl:variable name="add_row" select="substring-before(substring-after($summaryLabels, 'LBL_ADDROW~~'), '@@')"/>
    <xsl:variable name="delete_row"
                  select="substring-before(substring-after($summaryLabels, 'LBL_DELETEROW~~'), '@@')"/>
    <xsl:variable name="single_rec_view"
                  select="substring-before(substring-after($summaryLabels, 'LBL_SINGLE_REC_VIEW~~'), '@@')"/>
    <xsl:variable name="lock" select="substring-before(substring-after($summaryLabels, 'LBL_LOCK~~'), '@@')"/>
    <xsl:variable name="columns" select="substring-before(substring-after($summaryLabels, 'LBL_COLUMNS~~'), '@@')"/>
    <xsl:variable name="narrative" select="substring-before(substring-after($summaryLabels, 'LBL_NARRATIVE~~'), '@@')"/>
    <xsl:variable name="select_all_rows"
                  select="substring-before(substring-after($summaryLabels, 'LBL_SELECT_ALL_ROWS~~'), '@@')"/>
    <xsl:variable name="page_footer"
                  select="substring-before(substring-after($summaryLabels, 'LBL_PAGE_FOOTER~~'), '@@')"/>
    <xsl:variable name="end_table" select="substring-before(substring-after($summaryLabels, 'LBL_END_TABLE~~'), '@@')"/>
    <!-- End of ExtLabels.xsl -->
    <xsl:variable name="Brn_Neo" select="''"/>
    <xsl:output method="html"/>
    <xsl:variable name="gPosition" select="'template'"/>
    <xsl:variable name="cQuery" select="'Q'"/>
    <xsl:variable name="cResult" select="'R'"/>
    <xsl:variable name="cAdvanced" select="'A'"/>
    <xsl:variable name="cAll" select="'All'"/>
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
    <xsl:param name="summaryLabels"/>
    <xsl:param name="applicationName"/>
    <!-- Main template -->
    <xsl:template match="/">
    <body>
            <xsl:variable name="no_Of_flds" select="count(//SUMMARY/SUMBLOCK[@TABPAGE = 'QUERY']/FIELD/TYPE)"/>
            <xsl:if test="no_Of_flds &lt; 2">
            <xsl:text disable-output-escaping="yes">&lt;TR&gt;</xsl:text>
        </xsl:if>
            <xsl:call-template name="Advanced_Summary"/>
            <xsl:if test="no_Of_flds &lt; 2">
            <xsl:text disable-output-escaping="yes">&lt;/TR&gt;</xsl:text>
        </xsl:if>
            <xsl:call-template name="dispButtonField"/>
        </body>
    <!--<xsl:call-template name="generateScript"/>-->
  </xsl:template>
    <!-- Takes care of features common in Button Field of Absolute/Column Positioning -->
    <xsl:template name="dispButtonField"><!--
    <div id="PageFoot">
            --><!--HTML5 Changes 3/OCT/2016--><!--
        <div class="DIVfooter">
                <h2 class="LBLinv">
                    <xsl:value-of select="$page_footer"/>
                </h2>
            <div class="DIVAudit">          
                    <TABLE class="TABLEAudit" width="100%" border="0" cellspacing="0" cellpadding="0"
                           role="presentation">
                        --><!--HTML5 Changes 3/OCT/2016--><!--
                <TR>
                <TD width="10%"></TD>
                <TD class="TDAuditButton" width="90%" rowspan="2" valign="center">
                                <button id="BTN_OK" onclick="fnSave_sum('CVS_ADVANCED', event)" class="BTNfooter"
                                        onblur="this.className='BTNfooter'" onmouseover="this.className='BTNfooterH'"
                                       onfocus="this.className='BTNfooterH'" onmouseout="this.className='BTNfooter'">
                            <xsl:value-of select="$ok_SummaryAudit"/>
                    </button>                
                                <button id="BTN_EXIT" onClick="fnExit_sum('CVS_ADVANCED')" class="BTNfooter"
                                        onblur="this.className='BTNfooter'" onmouseover="this.className='BTNfooterH'"
                                        onfocus="this.className='BTNfooterH'" onmouseout="this.className='BTNfooter'"
                                        onkeydown="return fnHandleSumBtn(event)">
                            <xsl:value-of select="$cancle_SummaryAudit"/>
                    </button>			
                </TD>
              </TR>
            </TABLE>         
        </div>
      </div>
        </div>-->
  </xsl:template>
    <xsl:template name="Advanced_Summary">
    <!-- Display the content of advanced tab -->    
    <!-- <DIV ID="PageHead" style="width:50em; overflow-x:auto; overflow-y:hidden">-->
    
    <DIV id="DIVMainTmp">
            <!--HTML5 Changes 3/OCT/2016-->
            <!--<xsl:variable name = "AuditBlk" select = "//BLOCK[ID ='BLK_AUDIT']"/>-->
            <div id="mainTabContainer" style="width: 100%;">
                <div id="TblAdvanced" class="oj-flex">
                    <div class=" oj-sm-width-1/4 sectionPanel">
                        <div class="partitionPanel partitionRightMargin">
                            <!--<div  id="idRecommendedFieldFldSet">
                        <fieldset  class= "oj-flex-item oj-sm-padding-5x-horizontal">
                          	<h4>
                        		<xsl:value-of select="$recommendeCriteria"/>
                    		</h4>
                    
                            <oj-list-view id="idRecommendedField" data-oj-binding-provider="none"  selection-mode="single" on-selected-changed="[[handleSelectedChanged]]">
                                <ul>
                                <xsl:variable name="mstrDataSrc" select="normalize-space(//SUMMARY/SUMMARY_DATA_BLK)"/>
                                    <xsl:for-each select="//SUMMARY/SUMBLOCK[@TABPAGE = 'RESULT']/FIELD">
                                       <xsl:if test="count(MIN_CHAR)>0 and MIN_CHAR!=''">
                                        <xsl:variable name="tDataSrc" select="$mstrDataSrc"/>
                                        <xsl:variable name="A_DBC" select="NAME"/>
                                        <xsl:variable name="A_Dtype" select="DTYPE"/>
                                        <xsl:variable name="A_fldType" select="TYPE"/>
                                        <xsl:variable name="labelLink" select="LABEL_LINK"/>
                                        <xsl:if test="TYPE != 'HIDDEN'">
                                         <li elmid="{$mstrDataSrc}__{NAME}" DTYPE="{$A_Dtype}" TYPE="{$A_fldType}">
                                            <xsl:attribute name="MIN_CHAR">
                                                <xsl:value-of select="MIN_CHAR"/>
                                            </xsl:attribute>
                                            <xsl:attribute name="NAME">
                                                <xsl:value-of select="NAME"/>
                                            </xsl:attribute>
                                           <oj-list-item-layout>
                                               <span class="oj-typography-body-md oj-text-color-primary">
                                                   <xsl:value-of select="LBL"/>
                                                            <xsl:if test="count(MIN_CHAR) > 0 and MIN_CHAR != ''">
                                                <xsl:if test="TYPE != 'SELECT'">
                                                    <xsl:text>(</xsl:text>
                                                    <xsl:value-of select="MIN_CHAR"></xsl:value-of>
                                                    <xsl:text>)</xsl:text>
                                                </xsl:if>
                                            </xsl:if>
                                                </span>
                                            </oj-list-item-layout>
                                        </li>
                                          </xsl:if>
                                      </xsl:if>
                                      </xsl:for-each>
                                </ul>
                            </oj-list-view>
                           
                        </fieldset>
                    </div>-->
                            <fieldset class="oj-flex-item oj-sm-padding-5x-start">
                                <h4 id='lblAdvFldSet'>
                                    <xsl:value-of select="$search_CaseSensitive"/>
                                </h4>
                                <oj-list-view id="idSelectField" data-oj-binding-provider="none"
                                              aria-label="{$fields_SummaryAudit}" selection-mode="single"
                                              on-selected-changed="[[handleSelectedChanged]]">
                                    <ul>
                                        <xsl:variable name="mstrDataSrc_temp"
                                                      select="normalize-space(//SUMBLOCK[@TABPAGE = 'QUERY']/FIELD/DBT)"/>
                                        <xsl:variable name="mstrDataSrc">
                                                <xsl:if test="$mstrDataSrc_temp != ''">
                                                    <xsl:value-of select="$mstrDataSrc_temp"/>
                                                </xsl:if>
                                                <xsl:if test="$mstrDataSrc_temp = ''">
                                                    <xsl:value-of select="normalize-space(//BLOCK[ID ='BLK_AUDIT']/DBT)"/>
                                                </xsl:if>
                                            </xsl:variable>
											<xsl:variable name="l_audit_type" select="normalize-space(//BLOCK[ID ='BLK_AUDIT']/TYPE)" />
											<xsl:if test="$l_audit_type = 'M'">
											<li value="{$mstrDataSrc}.RECORD_STAT" DTYPE="CHAR">
                                                        <oj-list-item-layout>
                                                            <span class="oj-typography-body-md oj-text-color-primary">
                                                                <xsl:value-of select="$recordStat_SummaryAudit"/>
                                                            </span>
                                                        </oj-list-item-layout>
                                            </li>
											<li value="{$mstrDataSrc}.AUTH_STAT" DTYPE="CHAR">
                                                        <oj-list-item-layout>
                                                            <span class="oj-typography-body-md oj-text-color-primary">
                                                                <xsl:value-of select="$authStat_SummaryAudit"/>
                                                            </span>
                                                        </oj-list-item-layout>
                                            </li>
											</xsl:if>
                                        <xsl:for-each select="//SUMBLOCK[@TABPAGE = 'QUERY']/FIELD">
                                            <xsl:if test="count(DBT) > 0">
                                                    <xsl:variable name="tDataSrc" select="$mstrDataSrc"/>
                                                    <xsl:variable name="A_DBC" select="DBC"/>
                                                    <xsl:variable name="DType_Qry" select="DTYPE"/>
                                                    <xsl:variable name="A_fldType" select="TYPE"/>
                                                    <xsl:variable name="A_Dtype">
                                                        <xsl:if test="normalize-space($DType_Qry) != ''">
                                                            <xsl:value-of select="$DType_Qry"/>
                                                        </xsl:if>
                                                        <xsl:if test="normalize-space($DType_Qry) = ''">
                                                            <xsl:value-of select="//BLOCK//FIELD[DBT=$tDataSrc][DBC=$A_DBC]/DTYPE"/>
                                                        </xsl:if>
                                                    </xsl:variable>
                                                    <xsl:variable name="dType" select="DTYPE"/>
                                                    <xsl:if test="count(LABEL_LINK) > 0">
                                                        <xsl:variable name="labelLink" select="LABEL_LINK"/>
                                                    </xsl:if>
                                                    <xsl:if test="TYPE != 'HIDDEN'">
                                                    <li elmid="{$mstrDataSrc}__{DBC}" DTYPE="{$A_Dtype}"
                                                        TYPE="{$A_fldType}">
                                                        <oj-list-item-layout>
                                                            <span class="oj-typography-body-md oj-text-color-primary">
                                                                <xsl:value-of select="LABEL"/>
                                                            </span>
                                                        </oj-list-item-layout>
                                                    </li>
                                                    </xsl:if>
                                                </xsl:if>
                                        
                                        
                                      </xsl:for-each>
                                    </ul>
                                </oj-list-view>
                            </fieldset>
                        </div>
                    </div>
                    <div class=" oj-sm-width-3/4 sectionPanel">
                        <div class="partitionPanel">
                            <fieldset class="oj-flex-item oj-sm-padding-5x-start">
                                <h4 class="">
                                    <xsl:value-of select="$query_SummaryAudit"/>
                                </h4>
                                <div id="advanceQuerySection" class="oj-sm-margin-4x-bottom">
                                    <xsl:variable name="mstrDataSrc_temp"
                                                  select="normalize-space(//SUMBLOCK[@TABPAGE = 'QUERY']/FIELD/DBT)"/>
                                    <xsl:variable name="mstrDataSrc">
                                                <xsl:if test="$mstrDataSrc_temp != ''">
                                                    <xsl:value-of select="$mstrDataSrc_temp"/>
                                                </xsl:if>
                                                <xsl:if test="$mstrDataSrc_temp = ''">
                                                    <xsl:value-of select="normalize-space(//BLOCK[ID ='BLK_AUDIT']/DBT)"/>
                                                </xsl:if>
                                            </xsl:variable>
                                    <xsl:for-each select="//SUMBLOCK[@TABPAGE = 'QUERY']/FIELD">
                                            <xsl:if test="count(DBT) > 0">
                                                    <xsl:variable name="tDataSrc" select="$mstrDataSrc"/>
                                                    <xsl:variable name="A_DBC" select="DBC"/>
                                                    <xsl:variable name="DType_Qry" select="DTYPE"/>
                                                    <xsl:variable name="A_fldType" select="TYPE"/>
                                                    <xsl:variable name="A_Dtype">
                                                        <xsl:if test="normalize-space($DType_Qry) != ''">
                                                            <xsl:value-of select="$DType_Qry"/>
                                                        </xsl:if>
                                                        <xsl:if test="normalize-space($DType_Qry) = ''">
                                                            <xsl:value-of select="//BLOCK//FIELD[DBT=$tDataSrc][DBC=$A_DBC]/DTYPE"/>
                                                        </xsl:if>
                                                    </xsl:variable>
                                                    <xsl:variable name="dType" select="DTYPE"/>
                                                    <xsl:if test="count(LABEL_LINK) > 0">
                                                        <xsl:variable name="labelLink" select="LABEL_LINK"/>
                                                    </xsl:if>
                                        <xsl:if test="TYPE != 'HIDDEN'">
                                          <div id="{$mstrDataSrc}__{DBC}_DIV" style="display:none">
                                                    <oj-label-value label-edge="start" label-width="10%"
                                                                    class="ojLabelValueClass">
                                                        <oj-label slot="label">
                                                            <xsl:value-of select="$operator_SummaryAudit"/>
                                                        </oj-label>
                                                        <div slot="value" class="oj-flex-bar oj-sm-width-full">
                                                            <div class="oj-flex-item oj-sm-margin-1x-end hfieldset-max-width">
                                                                <oj-select-single id="{$mstrDataSrc}__{DBC}"
                                                                                  adv_search="Y"
                                                                                  on-value-changed="[[operatorValueChangedHandler]]">
                                                                    <xsl:attribute name="data">
                                                            <xsl:if test="((TYPE = 'TEXT'and $A_Dtype !='NUMBER') or TYPE='SELECT' or TYPE='TEXTAREA' or TYPE='RESTRICTED_TEXT' or TYPE='RADIO')">
                                                            <xsl:text>[[advSelectOperatorArrayProvider]]</xsl:text>
                                                            </xsl:if>
                                                             <xsl:if test="TYPE = 'DATE' or (TYPE='TEXT' and $A_Dtype='NUMBER') or TYPE='AMOUNT'">
                                                            <xsl:text>[[advDateOperatorArrayProvider]]</xsl:text>
                                                            </xsl:if>
                                                            </xsl:attribute>
                                                                </oj-select-single>
                                                            </div>
                                                            <div class="oj-sm-margin-1x-end hfieldset-max-width"
                                                                 style="width:10%; text-align:center;">
                                                                <oj-label class="oj-sm-align-items-center">
                                                                    <xsl:value-of select="$value_SummaryAudit"/>
                                                                </oj-label>
                                                            </div>
                                                            <xsl:if test=" TYPE='SELECT'  or TYPE='RADIO' ">
                                                     <div class="oj-flex-item oj-sm-margin-1x-end hfieldset-max-width">
                                                                    <oj-select-single id="{$mstrDataSrc}__{DBC}_FROM"
                                                                                      adv_search="Y">
                                                                        <xsl:attribute name="data">
                                                             <xsl:text>[[parent.arrProvider</xsl:text>
                                                            <xsl:value-of select="concat($mstrDataSrc,'__',DBC)"/>
                                                             <xsl:text>]]</xsl:text>
                                                            </xsl:attribute>
                                                                    </oj-select-single>
                                                                </div>
                                                     </xsl:if>
                                                            <xsl:if test=" (TYPE='TEXT'  or TYPE='RESTRICTED_TEXT'  or TYPE='TEXTAREA') and $A_Dtype !='NUMBER'">
                                                     <div class="oj-flex-item oj-sm-margin-1x-end hfieldset-max-width">
                                                                    <oj-input-text id="{$mstrDataSrc}__{DBC}_FROM">
                                                                        <oj-button slot="end" title="{$lov}"
                                                                                   display="icons" chroming="borderless"
                                                                                   tabindex="0" type="button"
                                                                                   on-oj-action="[[fnShowValues.bind(null,'{$mstrDataSrc}__{NAME}_FROM',event)]]">
                                                                            <span slot="startIcon" tabindex="-1"
                                                                                  class="oj-ux-ico-search">
                                                                                <span class="LBLinv">
                                                                                    <xsl:value-of select="$lov"/>
                                                                                </span>
                                                                            </span>
                                                                        </oj-button>
                                                                    </oj-input-text>
                                                                </div>
                                                     </xsl:if>
                                                            <xsl:if test=" TYPE='DATE'">
                                                         <div class="oj-flex-item oj-sm-margin-1x-end hfieldset-max-width">
                                                                    <oj-input-date day-formatter="[[dayFormatter]]"
                                                                                   id="{$mstrDataSrc}__{DBC}_FROM"></oj-input-date>
                                                                </div>
                                                        
                                                        <div id="{$mstrDataSrc}__{DBC}_TODIV" class="oj-flex-bar">
                                                                    <div class="oj-flex-bar-start oj-sm-padding-5x-start oj-sm-margin-1x-end hfieldset-max-width"
                                                                         style="width:20%; text-align:center;">
                                                                        <oj-label class="oj-sm-align-items-center">
                                                                            <xsl:value-of select="$to_SummaryAudit"/>
                                                                        </oj-label>
                                                                    </div>
                                                                    <div class="oj-flex-bar-end oj-sm-margin-1x-end hfieldset-max-width">
                                                                        <oj-input-date day-formatter="[[dayFormatter]]"
                                                                                       id="{$mstrDataSrc}__{DBC}_TO"></oj-input-date>
                                                                    </div>
                                                                </div>
                                                     </xsl:if>
                                                            <xsl:if test="TYPE='TEXT' and DTYPE='NUMBER'">
                                                        <div class="oj-flex-item oj-sm-margin-1x-end hfieldset-max-width">
                                                                    <oj-input-text id="{$mstrDataSrc}__{DBC}_FROM">
                                                                        <oj-button slot="end" title="{$lov}"
                                                                                   display="icons" chroming="borderless"
                                                                                   tabindex="0" type="button"
                                                                                   on-oj-action="[[fnShowValues.bind(null,'{$mstrDataSrc}__{NAME}_FROM',event)]]">
                                                                            <span slot="startIcon" tabindex="-1"
                                                                                  class="oj-ux-ico-search">
                                                                                <span class="LBLinv">
                                                                                    <xsl:value-of select="$lov"/>
                                                                                </span>
                                                                            </span>
                                                                        </oj-button>
                                                                    </oj-input-text>
                                                                </div>
                                                         <div id="{$mstrDataSrc}__{DBC}_TODIV" class="oj-flex-bar">
                                                                    <div class="oj-flex-item oj-sm-margin-1x-end hfieldset-max-width">
                                                                        <oj-label class="oj-sm-align-items-center">
                                                                            <xsl:value-of select="$to_SummaryAudit"/>
                                                                        </oj-label>
                                                                    </div>
                                                                    <div class="oj-flex-bar-start oj-sm-padding-5x-start oj-sm-margin-1x-end hfieldset-max-width">
                                                                        <oj-input-text id="{$mstrDataSrc}__{DBC}_TO">
                                                                            <oj-button slot="end" title="{$lov}"
                                                                                       display="icons"
                                                                                       chroming="borderless"
                                                                                       tabindex="0" type="button"
                                                                                       on-oj-action="[[fnShowValues.bind(null,'{$mstrDataSrc}__{NAME}_FROM',event)]]">
                                                                                <span slot="startIcon" tabindex="-1"
                                                                                      class="oj-ux-ico-search">
                                                                                    <span class="LBLinv">
                                                                                        <xsl:value-of select="$lov"/>
                                                                                    </span>
                                                                                </span>
                                                                            </oj-button>
                                                                        </oj-input-text>
                                                                    </div>
                                                                </div>
                                                        
                                                       </xsl:if>
                                                        </div>
                                                    </oj-label-value>
                                                </div>
                                        
                                          </xsl:if>
                                      </xsl:if>
                                      </xsl:for-each>
                                </div>
                                <div>
                                    <oj-button class="oj-sm-margin-2x-end"
                                               on-oj-action="[[fnAcceptQuery.bind(null,'AND')]]">
                                        <xsl:value-of select="$and_SummaryAudit"/>
                                    </oj-button>
                                    <oj-button class="oj-sm-margin-2x-end"
                                               on-oj-action="[[fnAcceptQuery.bind(null,'OR')]]">
                                        <xsl:value-of select="$or_SummaryAudit"/>
                                    </oj-button>
                                    <oj-button class="oj-sm-margin-2x-end"
                                               on-oj-action="[[fnAcceptQuery.bind(null,'(')]]">
                                               <xsl:text>(</xsl:text></oj-button>
                                    <oj-button class="oj-sm-margin-2x-end"
                                               on-oj-action="[[fnAcceptQuery.bind(null,')')]]"><xsl:text>)</xsl:text>
                                               </oj-button>
                                    <oj-button on-oj-action="[[fnAcceptQuery.bind(null,'')]]"
                                               calss="action-button-primary">
                                        <xsl:value-of select="$accept_SummaryAudit"/>
                                    </oj-button>
                                </div>
                                <div id="idadvQuryHeaderTableDiv" class="oj-sm-padding-2x-top">
                                    <h2>
                                        <xsl:value-of select="$query_SummaryAudit"/>
                                    </h2>
                                    <oj-table id='idadvQuryHeaderTable' columns="[[advHeaderObj]]" display="grid"
                                              class="oj-sm-width-full" user-assistance-density="compact">
                                        <xsl:attribute name="selection-mode">
                                       <xsl:text>{"row": "multiple"}</xsl:text>
                                 </xsl:attribute>
                                        <xsl:attribute name="data">
                                     <xsl:text>[[advQuerydataprovider]]</xsl:text> 
                                </xsl:attribute>
                                    </oj-table>
                                </div>
                                <div class="oj-sm-padding-2x-top">
                                    <oj-button on-oj-action="[[fnClearQuery.bind(null)]]">
                                        <xsl:value-of select="$clearQuery_SummaryAudit"/>
                                    </oj-button>
                                </div>
                            </fieldset>
                            <fieldset class="oj-flex-item oj-sm-padding-5x-start">
                                <div class="oj-sm-padding-2x-top">
                                    <h4 class="">
                                        <xsl:value-of select="$orderBy_SummaryAudit"/>
                                    </h4>
                                    <oj-label-value label-edge="start" label-width="10%" class="ojLabelValueClass">
                                        <oj-label slot="label">
                                            <xsl:value-of select="$orderBy_SummaryAudit"/>
                                        </oj-label>
                                        <div slot="value" class="oj-flex-bar oj-sm-width-full">
                                            <div class="oj-flex-item oj-sm-margin-1x-end hfieldset-max-width">
                                                <oj-select-single id="idSelectSortDirection"
                                                                  data="[[advOrderBySelectProvider]]" adv_search="Y"
                                                                  value=" ASC"></oj-select-single>
                                            </div>
                                            <div class="oj-flex-item oj-sm-margin-1x-end hfieldset-max-width">
                                                <oj-button on-oj-action="[[fnAcceptOrderBy.bind(null)]]"
                                                           calss="action-button-primary">
                                                    <xsl:value-of select="$accept_SummaryAudit"/>
                                                </oj-button>
                                            </div>
                                        </div>
                                    </oj-label-value>
                                </div>
                                <div id="idadvOrderHeaderTableDIV" class="oj-sm-padding-2x-top">
                                    <h2>
                                        <xsl:value-of select="$query_SummaryAudit"/>
                                    </h2>
                                    <oj-table id='idadvOrderHeaderTable' columns="[[advOrderByHeaderObj]]"
                                              display="grid" class="oj-sm-width-full" user-assistance-density="compact">
                                        <xsl:attribute name="selection-mode">
                                       <xsl:text>{"row": "multiple"}</xsl:text>
                                 </xsl:attribute>
                                        <xsl:attribute name="data">
                                     <xsl:text>[[advOrderBydataprovider]]</xsl:text> 
                                </xsl:attribute>
                                    </oj-table>
                                </div>
                                <div class="oj-sm-padding-2x-top">
                                    <oj-button on-oj-action="[[fnClearOrderBy.bind(null)]]"
                                               calss="action-button-primary">
                                        <xsl:value-of select="$clearQuery_SummaryAudit"/>
                                    </oj-button>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                </div>
                <div class="DIVfooter" id="DIVFooter">
                    <oj-button id="BTN_EXIT" on-oj-action="[[fnExit_sum.bind(null,'CVS_ADVANCED')]]"
                               class="oj-sm-margin-2x-end">
                        <xsl:value-of select="$cancle_SummaryAudit"/>
                    </oj-button>
                    <oj-button id="BTN_OK" calss="action-button-primary"
                               on-oj-action="[[fnSave_sum.bind(null,'CVS_ADVANCED',event)]]">
                        <xsl:value-of select="$ok_SummaryAudit"/>
                    </oj-button>
                </div>
            </div>
            <!--<TABLE class="TBLone" ID="TblAdvanced" border="0" cellspacing="7" cellpadding="0" role="presentation"
                   width="100%">
                -->
            <!-- 12.1 summary performance changes new start -->
            <!--
            <TR>       
                    -->
            <!--<td width="5%" valign="top">
                        -->
            <!--12.0.4 summary performance chages start -->
            <!--
                      <fieldset class="FSTdlg" id="idRecommendedFieldFldSet">
                            <label class="LBLinv" for="idRecommendedField">
                                <xsl:value-of select="$recommendeCriteria"/>
                            </label>
                            <SELECT name="select" SIZE="10" id="idRecommendedField" title="{$recommendeCriteria}"
                                    class="SELstd"
                                    onChange="fngetSelectedFields('idRecommendedField');fnFillOperators(event);fnCheckCustomLov();">
                                <xsl:variable name="mstrDataSrc" select="normalize-space(//SUMMARY/SUMMARY_DATA_BLK)"/>
                                <xsl:for-each select="//SUMMARY/SUMBLOCK[@TABPAGE = 'RESULT']/FIELD">
                                    <xsl:if test="count(MIN_CHAR)>0 and MIN_CHAR!=''">
                                        <xsl:variable name="tDataSrc" select="$mstrDataSrc"/>
                                        <xsl:variable name="A_DBC" select="NAME"/>
                                        <xsl:variable name="A_Dtype" select="DTYPE"/>
                                        <xsl:variable name="A_fldType" select="TYPE"/>
                                        <xsl:variable name="labelLink" select="LABEL_LINK"/>
										-->
            <!--9NT1606_12_2_RETRO_12_0_2_23654633 changes-->
            <!--
										<xsl:if test="TYPE != 'HIDDEN'">
                                        <OPTION value="{NAME}" DTYPE="{$A_Dtype}" TYPE="{$A_fldType}"
                                                blk_name="{$mstrDataSrc}__{NAME}">
                                            <xsl:value-of select="LBL"/>
                                                -->
            <!-- Fix for 21118575 -->
            <!--
                                                <xsl:if test="count(MIN_CHAR) > 0 and MIN_CHAR != ''">
                                                <xsl:if test="TYPE != 'SELECT'">
                                                    <xsl:text>(</xsl:text>
                                                    <xsl:value-of select="MIN_CHAR"></xsl:value-of>
                                                    <xsl:text>)</xsl:text>
                                                </xsl:if>
                                            </xsl:if>
                                        </OPTION>
										</xsl:if>
                                    </xsl:if>
                                </xsl:for-each> 
                        </SELECT>
                    </fieldset>
                        -->
            <!--12.0.4 summary performance chages end -->
            <!--
                        -->
            <!-- bug id 14842317 change starts  -->
            <!--
                        -->
            <!-- <fieldset class="FSTdlg"><legend><xsl:value-of select="$fields_SummaryAudit"/></legend>-->
            <!--
                        <fieldset class="FSTdlg">
                            <legend id='lblAdvFldSet'>
                                <xsl:value-of select="$search_CaseSensitive"/>
                            </legend>
                            -->
            <!-- 12.1 summary performance changes new end -->
            <!--
                            -->
            <!-- bug id 14842317 change ends  -->
            <!--
                            <label class="LBLinv" for="idSelectField">
                                <xsl:value-of select="$fields_SummaryAudit"/>
                            </label>
                            <SELECT name="select" SIZE="25" id="idSelectField" title="{$fields_SummaryAudit}"
                                    class="SELstd"
                                    onChange="fngetSelectedFields('idSelectField');fnFillOperators(event);fnCheckCustomLov();">
                                -->
            <!--12.0.4 summary performance chages -->
            <!--
                            <xsl:variable name="mstrDataSrc" select="normalize-space(//SUMMARY/SUMMARY_DATA_BLK)"/>
                            <xsl:for-each select="//SUMMARY/SUMBLOCK[@TABPAGE = 'RESULT']/FIELD">
                                <xsl:if test="count(MIN_CHAR)= 0 or MIN_CHAR=''">
                                    <xsl:variable name="tDataSrc" select="$mstrDataSrc"/>
                                    <xsl:variable name="A_DBC" select="NAME"/>
                                    <xsl:variable name="A_Dtype" select="DTYPE"/>
                                    <xsl:variable name="A_fldType" select="TYPE"/>
                                    <xsl:variable name="labelLink" select="LABEL_LINK"/>
                                    <OPTION value="{NAME}" DTYPE="{$A_Dtype}" TYPE="{$A_fldType}"
                                            blk_name="{$mstrDataSrc}__{NAME}">
                                        <xsl:value-of select="LBL"/>
                                    </OPTION>
                                </xsl:if>
                            </xsl:for-each>                   
                        </SELECT>
                    </fieldset>
                    </td>-->
            <!--
                <td width="95%" valign="top">
                        <fieldset class="FSTdlg">
                            <legend>
                                <xsl:value-of select="$query_SummaryAudit"/>
                            </legend>
                            -->
            <!--HTML5 Changes 3/OCT/2016-->
            <!--
                        <div class="DIVText">
                            <span id="operator">
                                    <label class="LBLauto" for="idSelectOp">
                                        <xsl:value-of select="$operator_SummaryAudit"/>
                                    </label>
                                    <xsl:text disable-output-escaping="yes">�</xsl:text>
                                    <SELECT name="select2" class="SELstd" id="idSelectOp"
                                            title="{$operator_SummaryAudit}" onchange="fnCheckOperator()"></SELECT>
                                </span>
                                <xsl:text disable-output-escaping="yes">�</xsl:text>
                                <xsl:text disable-output-escaping="yes">�</xsl:text>
                                <span id="fieldValue" class="advSearchSpan">
                                    -->
            <!--HTML5 changes 14/NOV/2016-->
            <!--
                                    <label for="idTextFieldValue">
                                        <xsl:value-of select="$value_SummaryAudit"/>
                                    </label>
                                    <INPUT TYPE="TEXT" id="idTextFieldValue" name="idTextFieldValue"
                                           title="{$value_SummaryAudit}" class="TXTstd"></INPUT>
                                    <BUTTON id="cmdLOV" onClick="fnBuildAdvLOV('idTextFieldValue', event)"
                                            title="{$lov}" class="BTNimg" onblur="this.className='BTNimg'"
                                            onmouseover="this.className='BTNimgH'" onfocus="this.className='BTNimgH'"
                                      onmouseout="this.className='BTNimg'">
                                        <span tabindex="-1" class="ICOlov">
                                            <span class="LBLinv">
                                                <xsl:value-of select="$lov"/>
                                            </span>
                                        </span>
                                </BUTTON>  
                            </span>
                                <xsl:text disable-output-escaping="yes">�</xsl:text>
                                <xsl:text disable-output-escaping="yes">�</xsl:text>
                            <span id="to">
                                    <label for="idTextFieldValue2">
                                        <xsl:value-of select="$to_SummaryAudit"/>
                                    </label>
                                    <INPUT TYPE="TEXT" id="idTextFieldValue2" name="idTextFieldValue2"
                                           readonly="readonly" title="{$to_SummaryAudit}" class="TXTro"></INPUT>
                                    <BUTTON id="cmdLOV" onClick="fnBuildAdvLOV('idTextFieldValue2', event)"
                                            disabled="disabled" title="{$lov}" class="BTNhide">
                                        <span tabindex="-1" class="ICOlov">
                                            <span class="LBLinv">
                                                <xsl:value-of select="$lov"/>
                                            </span>
                                        </span>
                                </BUTTON>
                            </span>
                        </div>
                            <xsl:text disable-output-escaping="yes">�</xsl:text>
                            -->
            <!--Murali <div class="DIVText"> Murali-->
            <!--
                        <div class="DIVText"  style="margin:5px 0px 5px 0px; width:99%">
                            <span class="Fleft">
                                    <button onblur="this.className='BTNtext'" onfocus="this.className='BTNtextH'"
                                            onmouseout="this.className='BTNtext'"
                                            onmouseover="this.className='BTNtextH'" class="BTNtext"
                                            onclick="fnAcceptQuery('AND')">
                                        <xsl:text disable-output-escaping="yes">�</xsl:text>
                                        <xsl:value-of select="$and_SummaryAudit"/>
                                        <xsl:text disable-output-escaping="yes">�</xsl:text>
                                </button>
                                    <button onblur="this.className='BTNtext'" onfocus="this.className='BTNtextH'"
                                            onmouseout="this.className='BTNtext'"
                                            onmouseover="this.className='BTNtextH'" class="BTNtext"
                                            onclick="fnAcceptQuery('OR')">
                                        <xsl:text disable-output-escaping="yes">�</xsl:text>
                                        <xsl:value-of select="$or_SummaryAudit"/>
                                        <xsl:text disable-output-escaping="yes">�</xsl:text>
                                </button>
                                    <button onblur="this.className='BTNtext'" onfocus="this.className='BTNtextH'"
                                            onmouseout="this.className='BTNtext'"
                                            onmouseover="this.className='BTNtextH'" class="BTNtext"
                                            onclick="fnAcceptQuery('(')">
                                        <xsl:text disable-output-escaping="yes">�</xsl:text>
                                       (
                                        <xsl:text disable-output-escaping="yes">�</xsl:text>
                                </button>
                                    <button onblur="this.className='BTNtext'" onfocus="this.className='BTNtextH'"
                                            onmouseout="this.className='BTNtext'"
                                            onmouseover="this.className='BTNtextH'" class="BTNtext"
                                            onclick="fnAcceptQuery(')')">
                                        <xsl:text disable-output-escaping="yes">�</xsl:text>
                                       )
                                        <xsl:text disable-output-escaping="yes">�</xsl:text>
                                </button>
                                    <xsl:text disable-output-escaping="yes">�</xsl:text>
                                    <xsl:text disable-output-escaping="yes">�</xsl:text>
                                    <button onblur="this.className='BTNtext'" onfocus="this.className='BTNtextH'"
                                            onmouseout="this.className='BTNtext'"
                                            onmouseover="this.className='BTNtextH'" class="BTNtext"
                                            onclick="fnAcceptQuery('')">
                                    <xsl:value-of select="$accept_SummaryAudit"/>
                                </button>
                            </span>
                        </div>
                            <div class="DIVMultipleBig" style="margin-left:0px; margin-right:0px;width:100%">
                                -->
            <!--HTML5 Changes 3/OCT/2016-->
            <!--
                            <div class="DIVmultiplebox">
                                    <div class="DIVGridME">
                                        -->
            <!--HTML5 Changes 3/OCT/2016-->
            <!--
                                        <span>
                                            <h2 class="hh4" style="margin:0px">
                                                <xsl:value-of select="$query_SummaryAudit"/>
                                            </h2>
                                        </span>
                                        -->
            <!--HTML5 Changes 3/OCT/2016-->
            <!--
                                </div>
                                    -->
            <!--static header change start -->
            <!--
                                <div style="BACKGROUND: #f3f1ec;">
                                        <div class="DIVMultipleSmallInnerH">
                                            -->
            <!--HTML5 Changes 3/OCT/2016-->
            <!--
                                            <table summary="{$accept_SummaryAudit}" class="TBLone"
                                                   id="idadvQuryHeaderTable" readonly="true" border="0" cellpadding="0"
                                                   cellspacing="0">
                                                -->
            <!--HTML5 Changes 3/OCT/2016-->
            <!--
                                      <tbody>
                                        <tr>
                                                        <td scope="col" class="THgrid1">
                                                            <div>
                                                                -->
            <!--HTML5 Changes Start-->
            <!--
                                                                <label class="LBLChkRadSel NewChkbox"
                                                                       for="QUERY_CHKBOX">
                                                                    <span class="LBLinv">
                                                                        <xsl:value-of select="$select_all_rows"/>
                                                                    </span>
                                                                    <input title="{$select_all_rows}" type="checkbox"
                                                                           id="QUERY_CHKBOX"
                                                                           onclick="fnCheckUncheckAll(event)"></input>
                                                                    <div class="DIVChkRadSel">
                                                                        <span></span>
                                                                    </div>
                                                                    -->
            <!--HTML5 changes 24/OCT/2016-->
            <!--
                                              </label>
                                                                -->
            <!--HTML5 Changes End-->
            <!--
                                                            </div>
                                                        </td>
                                                        <td scope="col" class="THgrid">
                                                            <div>
                                                                <span class="SPNtext">
                                                                    <xsl:value-of select="$fields_SummaryAudit"/>
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td scope="col" class="THgrid">
                                                            <div>
                                                                <span class="SPNtext">
                                                                    <xsl:value-of select="$operator_SummaryAudit"/>
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td scope="col" class="THgrid">
                                                            <div>
                                                                <span class="SPNtext">
                                                                    <xsl:value-of select="$value_SummaryAudit"/>
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td class="THgrid" width="100%">
                                                            <div>
                                                                <span class="LBLinv"></span>
                                                            </div>
                                                        </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    </div>
                                    </div>
                                    <div class="DIVMultipleSmallInner">
                                        -->
            <!--HTML5 Changes 3/OCT/2016-->
            <!--
                                        -->
            <!--static header change end -->
            <!--
                                        <table summary="{$accept_SummaryAudit}" class="TBLone" id="idadvQuryTable"
                                               readonly="true" border="0" cellpadding="0" cellspacing="0">
                                            -->
            <!--HTML5 Changes 3/OCT/2016-->
            <!--
                                            -->
            <!--<colgroup span="6"></colgroup>
                                        <thead>
                                            <tr>
                                                <td id="Table_Options" class="Textleft" colspan="5">
                                                    <div></div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="col" class="THgrid1">
                                                    <input title="{$select_all_rows}" type="checkbox" id="QUERY_CHKBOX" onclick="fnCheckUncheckAll(event)">
                                                        <span class="LBLinv"><xsl:value-of select="$select_all_rows"/></span> 
                                                    </input>
                                                </th>
                                                <th scope="col" class="THgrid">
                                                    <span class="SPNtext"><xsl:value-of select="$fields_SummaryAudit"/></span>
                                                </th>						
                                                <th scope="col" class="THgrid">
                                                    <span class="SPNtext"><xsl:value-of select="$operator_SummaryAudit"/></span>
                                                </th>
                                                <th scope="col" class="THgrid">
                                                    <span class="SPNtext"><xsl:value-of select="$value_SummaryAudit" /></span>
                                                </th>              
                                                <th class="THgrid" width="100%"> <span class="LBLinv"></span></th>
                                            </tr>
                                        </thead>  static header change-->
            <!--
                                        <tbody></tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                            <div class="DIVText" style="padding-top:3px;">
                                -->
            <!--HTML5 Changes 3/OCT/2016-->
            <!--
                                <button onclick="fnClearQuery()" class="BTNtext" onMouseOver="this.className='BTNtextH'"
                                        onMouseOut="this.className='BTNtext'" onFocus="this.className='BTNtextH'"
                                        onBlur="this.className='BTNtext'">
                                <xsl:value-of select="$clearQuery_SummaryAudit"/>                   
                            </button>
                        </div>
                    </fieldset>    
                        <fieldset class="FSTdlg">
                            <legend>
                                <xsl:value-of select="$orderBy_SummaryAudit"/>
                            </legend>
                            -->
            <!--HTML5 Changes 3/OCT/2016-->
            <!--
                        <div class="DIVText">
                                <xsl:text disable-output-escaping="yes">�</xsl:text>
                                <xsl:text disable-output-escaping="yes">�</xsl:text>
                                <label class="LBLauto" for="idSelectSortDirection">
                                    <xsl:value-of select="$orderBy_SummaryAudit"/>
                                </label>
                                <SELECT name="select3" class="SELstd" id="idSelectSortDirection"
                                        title="{$orderBy_SummaryAudit}">
                                    <OPTION VALUE=" ASC" SELECTED="SELECTED">
                                        <xsl:value-of select="$ascending_SummaryAudit"/>
                                    </OPTION>
                                    <OPTION VALUE=" DESC">
                                        <xsl:value-of select="$descending_SummaryAudit"/>
                                    </OPTION>
                            </SELECT>
                                <xsl:text disable-output-escaping="yes">�</xsl:text>
                                <xsl:text disable-output-escaping="yes">�</xsl:text>
                                <button onclick="fnAcceptOrderBy()" class="BTNtext"
                                        onMouseOver="this.className='BTNtextH'" onMouseOut="this.className='BTNtext'"
                                        onFocus="this.className='BTNtextH'" onBlur="this.className='BTNtext'">
                                <xsl:value-of select="$accept_SummaryAudit"/>
                            </button>
                        </div>
                            <div class="DIVMultipleBig" style="margin-left:0px; margin-right:0px;width:100%">
                                -->
            <!--HTML5 Changes 3/OCT/2016-->
            <!--
                            <div class="DIVmultiplebox">
                                    <div class="DIVGridME">
                                        -->
            <!--HTML5 Changes 3/OCT/2016-->
            <!--
                                        <span>
                                            <h2 class="hh4" style="margin:0px">
                                                <xsl:value-of select="$query_SummaryAudit"/>
                                            </h2>
                                        </span>
                                        -->
            <!--HTML5 Changes 3/OCT/2016-->
            <!--
                                </div>
                                    -->
            <!--static header change start -->
            <!--
                               <div style="BACKGROUND: #f3f1ec;">
                                        <div class="DIVMultipleSmallInnerH">
                                            -->
            <!--HTML5 Changes 3/OCT/2016-->
            <!--
                                            <table summary="{$accept_SummaryAudit}" class="TBLone"
                                                   id="idadvOrderHeaderTable" readonly="true" border="0" cellpadding="0"
                                                   cellspacing="0">
                                                -->
            <!--HTML5 Changes 3/OCT/2016-->
            <!--
                                    <tbody>
                                      <tr>
                                                        <td scope="col" class="THgrid1">
                                                            <div>
                                                                -->
            <!--HTML5 Changes Start-->
            <!--
                                                                <label class="LBLChkRadSel NewChkbox"
                                                                       for="ORDER_CHKBOX">
                                                                    <span class="LBLinv">
                                                                        <xsl:value-of select="$select_all_rows"/>
                                                                    </span>
                                                                    <input title="{$select_all_rows}" type="checkbox"
                                                                           id="ORDER_CHKBOX"
                                                                           onclick="fnCheckUncheckAll(event)"></input>
                                                                    <div class="DIVChkRadSel">
                                                                        <span></span>
                                                                    </div>
                                                                    -->
            <!--HTML5 changes 24/OCT/2016-->
            <!--
                                              </label>
                                                                -->
            <!--HTML5 Changes End-->
            <!--
                                                            </div>
                                                        </td>
                                                        <td scope="col" class="THgrid">
                                                            <div>
                                                                <span class="SPNtext">
                                                                    <xsl:value-of select="$fields_SummaryAudit"/>
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td scope="col" class="THgrid">
                                                            <div>
                                                                <span class="SPNtext">
                                                                    <xsl:value-of select="$value_SummaryAudit"/>
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td class="THgrid" width="100%">
                                                            <div>
                                                                <span class="LBLinv"></span>
                                                            </div>
                                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                                </div>
                                    -->
            <!--static header change end -->
            <!--
                                    <div class="DIVMultipleSmallInner">
                                        -->
            <!--HTML5 Changes 3/OCT/2016-->
            <!--
                                        <table summary="{$accept_SummaryAudit}" class="TBLone" id="idadvOrderTable"
                                               readonly="true" border="0" cellpadding="0" cellspacing="0">
                                            -->
            <!--HTML5 Changes 3/OCT/2016-->
            <!--
                                            -->
            <!--<colgroup span="6"></colgroup>
                                        <thead>
                                            <tr>
                                                <td id="Table_Options" class="Textleft" colspan="4">
                                                    <div></div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="col" class="THgrid1">
                                                    <input title="{$select_all_rows}" type="checkbox" id="ORDER_CHKBOX" onclick="fnCheckUncheckAll(event)">
                                                        <span class="LBLinv"><xsl:value-of select="$select_all_rows"/></span> 
                                                    </input>
                                                </th>
                                              			
                                                <th scope="col" class="THgrid">
                                                    <span class="SPNtext"><xsl:value-of select="$fields_SummaryAudit"/></span>
                                                </th>
                                                <th scope="col" class="THgrid">
                                                    <span class="SPNtext"><xsl:value-of select="$value_SummaryAudit" /></span>
                                                </th> 
                                                 <th class="THgrid" width="100%"> <span class="LBLinv"></span></th>
                                            </tr>
                                        </thead> static header change-->
            <!--
                                        <tbody></tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                            -->
            <!-- <div class="DIVText">
                            <TEXTAREA name="textarea" rows="5" class="TXAstd" id="idTAOrderBy" style="width:99%"></TEXTAREA>
                        </div>-->
            <!--
                            <div class="DIVText" style="padding-top:3px;">
                                -->
            <!--HTML5 Changes 3/OCT/2016-->
            <!--
                                <button onCLick="fnClearOrderBy()" class="BTNtext"
                                        onMouseOver="this.className='BTNtextH'" onMouseOut="this.className='BTNtext'"
                                        onFocus="this.className='BTNtextH'" onBlur="this.className='BTNtext'">
                                <xsl:value-of select="$clearQuery_SummaryAudit"/>                   
                            </button>
                        </div>
                    </fieldset>
                </td>
            </TR>
            </TABLE>-->
        </DIV>
</xsl:template>
    <xsl:template name="generateScript">
    <!-- Script to be run for summary screens -->   
    <script type="text/javascript" DEFER="DEFER">
            document.title = "
            <xsl:value-of select="$advanced_SummaryAudit"/>
            "; var gMasterDS = "
            <xsl:value-of select="substring-after(/FORM/SUMMARY/ADVANCED/DBT,'#')"/>
            ";
        </script>
    <noscript>
            <xsl:value-of select="$noScript"/>
        </noscript>
  </xsl:template>
</xsl:stylesheet>
