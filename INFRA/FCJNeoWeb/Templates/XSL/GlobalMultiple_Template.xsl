<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  
  
<xsl:template name="MultipleHandler_template">
    <xsl:param name="secId" select="." />
    <xsl:param name="partId" select="." />
    <xsl:param name="tabId" select="." />
    <xsl:param name="loc" select="." />
    
    <!--<xsl:variable name="partWidth" select="/FORM/SCREEN[@NAME = $screen]/TAB/PAGE[@NAME = $tabId]/SECTION[@ID = $secId]/PARTITION[@ID = $partId]/@WIDTH"/>-->
    <xsl:variable name="partWidth">
        <xsl:if test="$loc='header'">
            <xsl:value-of select="/FORM/SCREEN[@NAME = $screen]/HEADER/PAGE[@NAME = $tabId]/SECTION[@ID = $secId]/PARTITION[@ID = $partId]/@WIDTH"/>
        </xsl:if>
        <xsl:if test="$loc!='header'">
            <xsl:value-of select="/FORM/SCREEN[@NAME = $screen]/TAB/PAGE[@NAME = $tabId]/SECTION[@ID = $secId]/PARTITION[@ID = $partId]/@WIDTH"/>
        </xsl:if>
    </xsl:variable>
        
    <xsl:variable name="halfWidth" select="$gWidth*(1 div 2)"/>
    <xsl:variable name="twoThirdWidth" select="$gWidth*(2 div 3)"/>
    <xsl:variable name="meWidth" select="WIDTH"/>
    <xsl:variable name="multipleWidth">
      <xsl:choose>
        <xsl:when test="$gWidth &gt; $meWidth">
          <xsl:value-of select="$meWidth"/>
        </xsl:when>
        <xsl:when test="$gWidth &lt; $meWidth">
          <xsl:value-of select="$twoThirdWidth"/>
        </xsl:when>
        <xsl:otherwise>
          <xsl:value-of select="$twoThirdWidth"/>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:variable>
    <xsl:variable name="multipleHeight">
      <xsl:choose>
        <xsl:when test="normalize-space(HEIGHT) = ''">
          <xsl:value-of select="150"/>
        </xsl:when>
        <xsl:when test="string(number(HEIGHT)) = 'NaN'">
          <xsl:value-of select="150"/>
        </xsl:when>
        <xsl:otherwise>
          <xsl:value-of select="string(number(HEIGHT))"/>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:variable>
<!--    <fieldset class="FIELDSETPlaceholder"><legend><xsl:text disable-output-escaping="yes">&#160;</xsl:text></legend>-->
<!--    <div class="DIVMultipleSmall">  -->
    <div name="dataContainer" id="dataContainer_{ID}">
    <xsl:variable name="l_scr_type" select="/FORM/SCREEN[@NAME=$screen]/@TMP_SCR_TYPE" />
    
    <xsl:choose>
        <xsl:when test="$partWidth = '100' and $l_scr_type='large'"> 
            <xsl:attribute name="class">
                <xsl:value-of select="'DIVMultipleBig'" />
            </xsl:attribute>
        </xsl:when>
        <xsl:when test="$partWidth = '100' and $l_scr_type!='large'"> 
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

        <!--<xsl:call-template name="MultipleHandler_Head_tmp">
            <xsl:with-param name="curr_blk" select="."/>
            <xsl:with-param name="partWidth" select="$partWidth"/>
        </xsl:call-template>-->

        <div id="tableContainer" style="height:200px; overflow:scroll" onscroll="toggleSelectBoxes(this,'{ID}Header')">
            <xsl:choose>
                <xsl:when test="$partWidth = '100' and $l_scr_type='large'"> 
                    <xsl:attribute name="class">
                        <xsl:value-of select="'DIVMultipleBigInner'" />
                    </xsl:attribute>
                </xsl:when>
                <xsl:when test="$partWidth = '100' and $l_scr_type!='large'"> 
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
            
            <table border="0" cellspacing="0" cellpadding="0" ID="{ID}" caption="{LABEL}" class="TABLEMultiple" summary="{LABEL}" role="presentation"  onkeydown="return addRowShortcut(this, event)">
               
                <xsl:attribute name="DBT">
                        <xsl:value-of select="./DBT"/>
                    </xsl:attribute>
                <xsl:attribute name="DATAPAGESIZE">
                    <xsl:value-of select="./DATAPAGESIZE"/>
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
<!--</fieldset>-->
  
</xsl:template>
  
<xsl:template name="MultipleHandler_tmp">
    <xsl:param name="curr_blk" select="."/>
    <xsl:param name="mWidth" select="."/>
    <xsl:param name="mHeight" select="."/>
    <xsl:param name="partWidth" select="."/>
    <xsl:variable name="row" select="substring-before($curr_blk/ABS_POS,',')"/>
    <xsl:variable name="col" select="substring-after($curr_blk/ABS_POS,',')"/>

    <xsl:variable name="spanCnt">
        <xsl:value-of select="count($curr_blk/FIELD)"/>
    </xsl:variable>
    <colgroup span="{$spanCnt}"></colgroup>
    <thead id="{$curr_blk/ID}Header">
      <tr>
        
        <xsl:if test="count(./DBT) &gt;= 1">
            <xsl:attribute name="DBT">
                <xsl:value-of select="./DBT"/>
            </xsl:attribute>
            <xsl:attribute name="DATAPAGESIZE">
                <xsl:value-of select="$curr_blk/DATAPAGESIZE"/>
            </xsl:attribute>
        </xsl:if>
        <td colspan="{$spanCnt}" >
            <xsl:call-template name="MultipleHandler_Head_tmp">
                <xsl:with-param name="curr_blk" select="."/>
                <xsl:with-param name="partWidth" select="$partWidth"/>
            </xsl:call-template>
        </td>
    </tr>
    
    <tr>
        
        <xsl:if test="count(./DBT) &gt;= 1">
            <xsl:attribute name="DBT">
                <xsl:value-of select="./DBT"/>
            </xsl:attribute>
            <xsl:attribute name="DATAPAGESIZE">
                <xsl:value-of select="$curr_blk/DATAPAGESIZE"/>
            </xsl:attribute>
        </xsl:if>        
        <th class="TBODYTDMultipleCheckbox" scope="col">
            <label class="LBLinv" for="Checkbox_Title"><span class="LBLinv"><xsl:value-of select="$select_all_rows"/></span></label><input name="" type="checkbox" class="INPUTCheck" id = "Checkbox_Title" OnClick="fnToggleAllOrNoneME('{$curr_blk/ID}',this)" title="{$select_all_rows}"/>
        </th>            
                <xsl:for-each select="$curr_blk/FIELD">
                    <xsl:sort select="@COL" data-type="number" order="ascending"/>
                    
                    <xsl:if test="(count(./HIDDEN) &gt;= 1 and ./HIDDEN = -1) or (./TYPE = 'HIDDEN')">
                    <th  class="TDnone"></th>
                    </xsl:if>
                    
                    
                    <xsl:if test="((count(./HIDDEN) = 1 and ./HIDDEN = 0) or count(./HIDDEN) = 0) and (./TYPE != 'HIDDEN')">
                        <th class="THEADTHMultiple"  scope="col">
						<span style="white-space:nowrap;">
                        <xsl:if test="count(./DD) &gt; 0 and ./DD = -1">
                                <xsl:value-of select="./LABEL"/>
                        </xsl:if>
                        <xsl:if test="count(./DD) = 0">
                            <xsl:value-of select="./LABEL"/>
                        </xsl:if>
                        <!-- Added by Binson-->
                        <xsl:if test="./REQUIRED = 0">
                            <!--<img src="Images/star_disabled.gif" title="" ALT=""/>-->
                            <SPAN class="stardisabled"></SPAN><!--Data Uri changes -->
                        </xsl:if>
                        <xsl:if test="./REQUIRED = -1">
                            <!--<img src="Images/star.gif" title="{$mandatory}" ALT="{$mandatory}"/>  -->
                            <SPAN class="star" title="{$mandatory}"></SPAN><!--Data Uri changes -->
                        </xsl:if>                        
                        <!-- Added by Binson - End-->
                        </span>
                    </th>
                    </xsl:if>
                
                    
                </xsl:for-each>
        
        <!--<th class="THEADTHMultiple" width="99%"><xsl:text disable-output-escaping="yes">&#160;</xsl:text></th> -->
    </tr>
    </thead>
    <tbody>
        <xsl:if test="count(./DBT) &gt;= 1">
            <xsl:call-template name="detail_row_tmp">
                <xsl:with-param name="node_name" select="$curr_blk"/>
                <xsl:with-param name="num_rows" select="string('1')"/>
            </xsl:call-template>
        </xsl:if>
        <xsl:if test="count(./DBT) &lt;= 0">
            <xsl:call-template name="detail_row_tmp">
                <xsl:with-param name="node_name" select="$curr_blk"/>
                <xsl:with-param name="num_rows" select="$curr_blk/NUM_ROWS"/>
            </xsl:call-template>
        </xsl:if>
    </tbody>
    <tfoot>
            <tr><td colspan="{$spanCnt}" tabindex="0"><span class="LBLinv"><xsl:value-of select = "$end_table"/></span><xsl:text disable-output-escaping="yes">&#160;</xsl:text></td></tr>
    </tfoot>
    <!-- </table> -->
</xsl:template>

<xsl:template name="detail_row_tmp">
    <xsl:param name="node_name" select="."/>
    <xsl:param name="num_rows" select="."/>
    <tr>
        <td scope="row" class="TBODYTDMultipleFirst">
            <label class="LBLauto" for="chkDeleteRow"><span class="LBLinv"><xsl:value-of select="$select_row"/></span><input name="chkDeleteRow" type="checkbox" id="chkDeleteRow" onclick="fnMulipleEntryRow_onClick(event)" title="{$select_row}"/></label>
        </td>
        
        
        
        <xsl:for-each select="$node_name/FIELD">
            <xsl:sort select="@COL" data-type="number" order="ascending"/>
            <xsl:apply-templates select="TYPE" mode="template"/>
        </xsl:for-each>
        <!-- <th class="TBODYTDMultipleLast" width="99%"><xsl:text disable-output-escaping="yes">&#160;</xsl:text></th> -->
    </tr>
</xsl:template>
<!--
<xsl:template match="EVENT" mode="template">
    <xsl:attribute name="{./NAME}" >
      <xsl:value-of select="./FUNCTION" />
    </xsl:attribute>
</xsl:template>
-->
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
    <!-- <table width="100%" border="0" cellpadding="0" cellspacing="0" ID="{$curr_blk/ID}"> -->
    <!--
    <xsl:variable name="l_scr_type" select="/FORM/SCREEN[@NAME=$screen]/@TMP_SCR_TYPE" />
    <xsl:choose>
        <xsl:when test="$partWidth = '100' and $l_scr_type='large'"> 
            <xsl:attribute name="class">
                <xsl:value-of select="'TABLEMultipleBig'" />
            </xsl:attribute>
        </xsl:when>
        <xsl:when test="$partWidth = '100' and $l_scr_type!='large'"> 
            <xsl:attribute name="class">
                <xsl:value-of select="'TABLEMultipleMedium'" />
            </xsl:attribute>
        </xsl:when>
        <xsl:when test="$partWidth = '66'">
            <xsl:attribute name="class">
                <xsl:value-of select="'TABLEMultipleMedium'" />
            </xsl:attribute>
        </xsl:when>
        <xsl:otherwise>
            <xsl:attribute name="class">
                <xsl:value-of select="'TABLEMultipleSmall'" />
            </xsl:attribute>
        </xsl:otherwise>
    </xsl:choose>
    -->
        <div class="HeaderMultiple">
        <!--<caption class="HeaderMultiple" >-->
            <span class="Fleft">
            <h2 class="hh4"><xsl:value-of select="LABEL"/></h2>    
            <!-- Added for pagination of multiple entry block - starts -->
            <xsl:if test="$paginationReq = 'Y'">
                <button class="BTNtext" title="First" name="nFirst__{$curr_blk/ID}" id="nFirst__{$curr_blk/ID}" tabindex="-1" onclick="fnMoveNextAndPrevPgOfMultipleEntry('{$curr_blk/@TABPAGE}','{$curr_blk/DBT}','{$curr_blk/ID}','FIRST', 'TRUE')" onMouseOver="this.className='BTNtextH'" onMouseOut="this.className='BTNtext'" onFocus="this.className='BTNtextH'" onBlur="this.className='BTNtext'" type="navBtn" >
                    <xsl:value-of select="$first_SummaryAudit"/>
                </button>
                <button class="BTNtext" title="Previous" name="nPrev__{$curr_blk/ID}" id="nPrev__{$curr_blk/ID}" tabindex="-1" onClick="fnMoveNextAndPrevPgOfMultipleEntry('{$curr_blk/@TABPAGE}','{$curr_blk/DBT}','{$curr_blk/ID}','PREV', 'TRUE')" onMouseOver="this.className='BTNtextH'" onMouseOut="this.className='BTNtext'" onFocus="this.className='BTNtextH'" onBlur="this.className='BTNtext'" type="navBtn">
                        <xsl:value-of select="$previous_SummaryAudit"/>
                </button>
                <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                <span id= "CurrPage__{$curr_blk/ID}" name="CurrPage__{$curr_blk/ID}" class="SPNtext"><label class="LABELSummaryHead" for="CurrPage__{$curr_blk/ID}">1</label></span> 
                <span id= "PageSize__{$curr_blk/ID}" name="PageSize__{$curr_blk/ID}" class="SPNtext" value = "15"></span>
                <label class="LABELSummaryHead" for="TotPage__{$curr_blk/ID}">
                   <xsl:value-of select="$of_SummaryAudit"/>
                </label>
                <span id ="TotPage__{$curr_blk/ID}" name="TotPage__{$curr_blk/ID}" class="SPNtext"><label class="LABELSummaryHead" for="TotPage__{$curr_blk/ID}">1</label></span>
                <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                <button class="BTNtext" title="Next" name="nNext__{$curr_blk/ID}" id="nNext__{$curr_blk/ID}" tabindex="-1" onClick="fnMoveNextAndPrevPgOfMultipleEntry('{$curr_blk/@TABPAGE}','{$curr_blk/DBT}','{$curr_blk/ID}','NEXT', 'TRUE')" onMouseOver="this.className='BTNtextH'" onMouseOut="this.className='BTNtext'" onFocus="this.className='BTNtextH'" onBlur="this.className='BTNtext'" type="navBtn">
                        <xsl:value-of select="$next_SummaryAudit"/>
                </button>
                <button class="BTNtext" title="Last" name="nLast__{$curr_blk/ID}" id="nLast__{$curr_blk/ID}" tabindex="-1" onClick="fnMoveNextAndPrevPgOfMultipleEntry('{$curr_blk/@TABPAGE}','{$curr_blk/DBT}','{$curr_blk/ID}','LAST', 'TRUE')" onMouseOver="this.className='BTNtextH'" onMouseOut="this.className='BTNtext'" onFocus="this.className='BTNtextH'" onBlur="this.className='BTNtext'" type="navBtn">
                        <xsl:value-of select="$last_SummaryAudit"/>
                </button>
                
                <!-- TO PROVIDE THE GO TO PAGE - START -->
                <!--<img src="{$imgPath_XSL}/spacer.gif" height="1" width="10" alt=" "/>-->
                <span style="height:1px;width:10px" class="ImgSpacer"></span><!--Data Uri Changes -->
                <label class="LABELSummaryHead" for="GoTo__{$curr_blk/ID}"></label>
                <input id="GoTo__{$curr_blk/ID}" type="number" size="1" class="TEXTSummaryHeader" name = "gotopage" value="1"/>
                <button class="BUTTONMultiple" title="Go" name="GoTo__{$curr_blk/ID}" id="GoTo__{$curr_blk/ID}" 
                onClick="goToPage('{$curr_blk/@TABPAGE}','{$curr_blk/DBT}','{$curr_blk/ID}')" onMouseOver="this.className='BUTTONMultipleHover'" 
                onMouseOut="this.className='BUTTONMultiple'" onFocus="this.className='BUTTONMultipleHover'" onBlur="this.className='BUTTONInline'" 
                type="navBtn" value="Go">
                        <!--<img class="IMGInline" src="{$imgPath_XSL}/BTNNext.gif" id="imgLast_{$curr_blk/ID}" />-->
                        <sup><xsl:text>GO</xsl:text></sup>
                </button>
                <!-- TO PROVIDE THE GO TO PAGE - END -->
                
                <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
            </xsl:if>
                <!-- Added by Binson-->
                <xsl:if test="./REQUIRED = 0">
                    <!--<img src="Images/star_disabled.gif" title="" ALT=""/>-->
                    <SPAN class="stardisabled"></SPAN><!--Data Uri changes -->
                </xsl:if>
                <xsl:if test="./REQUIRED = -1">
                    <!--<img src="Images/star.gif" title="{$mandatory}" ALT="{$mandatory}"/>-->
                    <SPAN class="star" title="{$mandatory}"></SPAN><!--Data Uri changes -->
                </xsl:if>                        
                <!-- Added by Binson - End-->
            </span>
            <!-- Added for pagination of multiple entry block - ends -->
            <xsl:if test="count($curr_blk/READ_ONLY) = 0 or  (count($curr_blk/READ_ONLY) &gt; 0 and $curr_blk/READ_ONLY != -1)">
                <button class="BUTTONInline" name="cmdAddRow_{$curr_blk/ID}" id="cmdAddRow_{$curr_blk/ID}" tabindex="-1" onClick="fnInsertNewRowForMultipleEntry('{$curr_blk/@TABPAGE}','{$curr_blk/DBT}','{$curr_blk/ID}')" onMouseOver="this.className='BUTTONMultipleHover'" onMouseOut="this.className='BUTTONMultiple'" onFocus="this.className='BUTTONMultipleHover'" onBlur="this.className='BUTTONInline'" title="{$add_row}">
                    <!--<img class="IMGInline" src="{$imgPath_XSL}/Icons/BTNAddrow.gif" id="imgAdd_{$curr_blk/ID}" alt="{$add_row}"/>-->
                    <SPAN class="IMGInline ImgAddRow" title="{$add_row}"></SPAN><!-- Data Uri Changes -->
                </button>
                <button class="BUTTONInline"  name="cmdDelRow_{$curr_blk/ID}" id="cmdDelRow_{$curr_blk/ID}" tabindex="-1" onClick="fnDeleteRowForMultipleEntry('{$curr_blk/ID}','{$curr_blk/DBT}')" onMouseOver="this.className='BUTTONMultipleHover'" onMouseOut="this.className='BUTTONMultiple'" onFocus="this.className='BUTTONMultipleHover'" onBlur="this.className='BUTTONInline'" title="{$delete_row}">
                    <!--<img class="IMGInline" src="{$imgPath_XSL}/Icons/BTNRemoveRow.gif" id="imgAdd_{$curr_blk/ID}" alt="{$delete_row}"/>-->
                    <SPAN class="IMGInline ImgDelRow" title="{$delete_row}"></SPAN><!-- Data Uri Changes -->
                </button>
            </xsl:if>
            <button class="BUTTONInline" name="BTN_SINGLE_VIEW_{$curr_blk/ID}" id="BTN_SINGLE_VIEW_{$curr_blk/ID}" tabindex="-1" onClick="fnShowSingleViewForME('{$curr_blk/ID}')" onMouseOver="this.className='BUTTONMultipleHover'" onMouseOut="this.className='BUTTONMultiple'" onFocus="this.className='BUTTONMultipleHover'" onBlur="this.className='BUTTONInline'" title="{$single_rec_view}">
                <!--<img class="IMGInline" src="{$imgPath_XSL}/Icons/BTNViewRow.gif" id="imgView_{$curr_blk/ID}" alt="{$single_rec_view}"/>-->
                <span class="IMGInline BtnViewRow" id="imgView_{$curr_blk/ID}" title="{$single_rec_view}"></span><!-- Data Uri changes -->
            </button>
        <!--</caption>-->
        </div>
    
    <!-- </table> -->
</xsl:template>

</xsl:stylesheet>
