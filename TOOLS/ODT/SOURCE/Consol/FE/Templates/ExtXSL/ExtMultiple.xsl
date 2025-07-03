<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

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
	            <!--<xsl:call-template name="MultipleHandler_Head_tmp">
	                <xsl:with-param name="curr_blk" select="."/>
	                <xsl:with-param name="partWidth" select="$partWidth"/>
	            </xsl:call-template>-->
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
	                
	                <table border="0" cellspacing="0" cellpadding="0" ID="{./BLOCK}" caption="{./LBL}" class="TBLgrid" type="ME" summary="{./LBL}" role="presentation" onkeydown="return addRowShortcut(this, event)">
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
                    <button class="BTNicon2D" tabindex="-1" title="{$first}" name="nFirst__{$curr_blk/BLOCK}" id="nFirst__{$curr_blk/BLOCK}" onclick="Navigate(N_FIRST,'{$curr_blk/BLOCK}')" type="navBtn" disabled="disabled">
                       <span tabindex="-1" class="ICOfirst"><span class="LBLinv"><xsl:value-of select = "$first"/></span></span>   
                    </button>					
                    <button class="BTNicon2D" tabindex="-1" title="{$previous}" name="nPrev__{$curr_blk/BLOCK}" id="nPrev__{$curr_blk/BLOCK}" onclick="Navigate(N_PREVIOUS,'{$curr_blk/BLOCK}')" type="navBtn" disabled="disabled">
                        <span tabindex="-1" class="ICOprevious"><span class="LBLinv"><xsl:value-of select = "$previous"/></span></span>
                    </button>
                    <span id= "CurrPage__{$curr_blk/BLOCK}" name="CurrPage__{$curr_blk/BLOCK}" class="SPNtext">1</span>
                    <span class="SPNtext">
                        <xsl:value-of select="$of_SummaryAudit"/>
                    </span>
                    <span id ="TotPage__{$curr_blk/BLOCK}" name="TotPage__{$curr_blk/BLOCK}" class="SPNtext">1</span><span><xsl:text disable-output-escaping="yes">&#160;</xsl:text></span>
                    <button class="BTNicon2D" tabindex="-1" title="{$next}" name="nNext__{$curr_blk/BLOCK}" id="nNext__{$curr_blk/BLOCK}" onclick="Navigate(N_NEXT,'{$curr_blk/BLOCK}')" type="navBtn" disabled="disabled">
                        <span tabindex="-1" class="ICOnext"><span class="LBLinv"><xsl:value-of select = "$next"/></span></span>
                    </button>
                    <button class="BTNicon2D" tabindex="-1" title="{$last}" name="nLast__{$curr_blk/BLOCK}" id="nLast__{$curr_blk/BLOCK}" onclick="Navigate(N_LAST,'{$curr_blk/BLOCK}')" type="navBtn" disabled="disabled">
                        <span tabindex="-1" class="ICOlast"><span class="LBLinv"><xsl:value-of select = "$last"/></span></span>
                    </button>
                </span>              
                <label class="LBLstd" for="goto"></label><input id="goto__{$curr_blk/BLOCK}" title="{$gotoPage_SummaryAudit}" type="text" size="1" class="TXTro" value="" READONLY="true" />                
                <button class="BTNtextD" title="{$gotoPage_SummaryAudit}" name="go__{$curr_blk/BLOCK}" id="go__{$curr_blk/BLOCK}" value="Go" onclick="Navigate(N_GOTO,'{$curr_blk/BLOCK}')" disabled="true">
                    <xsl:value-of select="$gotoPage_SummaryAudit"/>                                    
                </button>
            </span>       
            <xsl:if test="count($curr_blk/READ_ONLY) = 0 or  (count($curr_blk/READ_ONLY) &gt; 0 and $curr_blk/READ_ONLY != -1)">
                <button class="BTNimgD" tabindex="-1" name="cmdAddRow_{$curr_blk/BLOCK}" id="cmdAddRow_{$curr_blk/BLOCK}" onClick="fnAddRow('{$curr_blk/BLOCK}')" title="{$add_row}" disabled = "true">
                   <span tabindex="-1" class="ICOadd"><span class="LBLinv"><xsl:value-of select = "$add_row"/></span></span>
                </button>
                <button class="BTNimgD" tabindex="-1"  name="cmdDelRow_{$curr_blk/BLOCK}" id="cmdDelRow_{$curr_blk/BLOCK}" onClick="fnDeleteRow('{$curr_blk/BLOCK}')" title="{$delete_row}" disabled = "true">
                    <span tabindex="-1" class="ICOremove"><span class="LBLinv"><xsl:value-of select = "$delete_row"/></span></span>
                </button>
            </xsl:if>
            <button class="BTNimgD" tabindex="-1" name="BTN_SINGLE_VIEW_{$curr_blk/BLOCK}" id="BTN_SINGLE_VIEW_{$curr_blk/BLOCK}" onClick="fnShowSingleViewForME('{$curr_blk/BLOCK}')" title="{$single_rec_view}" disabled = "true">
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
            <td colspan="{$spanCnt}" class="Textleft" id="Table_Options">
                <xsl:call-template name="MultipleHandler_Head_tmp">
                    <xsl:with-param name="curr_blk" select="."/>
                    <xsl:with-param name="partWidth" select="$partWidth"/>
                </xsl:call-template>              
            </td>
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
                <td class="TDgrid1" scope="row">
                    <label class="LBLauto">
                    <xsl:attribute name="for">
                            <xsl:value-of select="concat('chkDeleteRow__',./BLOCK)"></xsl:value-of>
                        </xsl:attribute>
                    <span class="LBLinv"><xsl:value-of select="$select_row"/></span>
                    <input name="chkDeleteRow" type="checkbox" parentDBT="{./BLOCK}" onclick="fnMulipleEntryRow_onClick(event)" title="{$select_row}">
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
            <tr><td colspan="{$spanCnt}" tabindex="0"><span class="LBLinv"><xsl:value-of select = "$end_table"/><xsl:value-of select = "$last"/></span><xsl:text disable-output-escaping="yes">&#160;</xsl:text></td></tr>
        </tfoot>

    </xsl:template>
</xsl:stylesheet>
