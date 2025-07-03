<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:import href="ExtMultiple.xsl"/>


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
            <xsl:call-template name="MEHandler">
                <xsl:with-param name="partWidth" select="../@WIDTH"/>
            </xsl:call-template>
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
                                     <span class="LBLinv"><xsl:value-of select = "$previous"/></span>
                                    </span>
                                </button>
                                <span id= "CurrPageSV__{$blockId}" name="CurrPage__{$blockId}" class="SPNtext">1<xsl:text disable-output-escaping="yes">&#160;</xsl:text></span>
                                <span class="SPNtext">
                                    <xsl:value-of select="$of_SummaryAudit"/>
                                </span>
                                <span id ="TotPageSV__{$blockId}" name="TotPage__{$blockId}" class="SPNtext"><xsl:text disable-output-escaping="yes">&#160;</xsl:text>1</span>
                                <button class="BTNicon2D" title="{$next}" name="BTN_NEXT_{$blockId}" onClick="fnMoveNextMESV('{$blockId}')"  disabled="disabled">
                                    <span tabindex="-1" class="ICOnext">
                                    <span class="LBLinv"><xsl:value-of select = "$next"/></span>
                                    </span>
                                </button>
                            </div>
                        </xsl:if>
                        <xsl:if test="count(./READ_ONLY) = 0 or ./READ_ONLY = 0">
                            <div class="DIVpage" id="MESV_{$blockId}">
                                <button class="BTNicon2D" title="{$previous}" name="BTN_PREV_{$blockId}" onClick="fnMovePrevMESV('{$blockId}')" disabled="disabled">
                                     <span tabindex="-1" class="ICOprevious">
                                      <span class="LBLinv"><xsl:value-of select = "$previous"/></span>
                                     </span>
                                </button>
                                <span id= "CurrPageSV__{$blockId}" name="CurrPageSV__{$blockId}" class="SPNtext">1<xsl:text disable-output-escaping="yes">&#160;</xsl:text></span>
                                <span class="SPNtext">
                                    <xsl:value-of select="$of_SummaryAudit"/><xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                                </span>
                                <span id ="TotPageSV__{$blockId}" name="TotPageSV__{$blockId}" class="SPNtext">1</span>
                                <button class="BTNicon2D" title="{$next}" name="BTN_NEXT_{$blockId}" onClick="fnMoveNextMESV('{$blockId}')" disabled="disabled">
                                    <span tabindex="-1" class="ICOnext"> <span class="LBLinv"><xsl:value-of select = "$next"/></span></span>
                                </button>
                                <button class="BTNhide" oldClassName = "BTNimg" title="{$add_row}" name="BTN_ADD_{$blockId}" disabled ="true" onClick="fnAddRowMESV('{$blockId}')">
                                    <span tabindex="-1" class="ICOadd"><span class="LBLinv"><xsl:value-of select = "$add_row"/></span></span>
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
                                <span class="LBLinv"><xsl:value-of select = "$previous"/></span>
                               </span>
                            </button>
                            <span id= "CurrPageSV__{$blockId}" name="CurrPageSV__{$blockId}" class="SPNtext">1<xsl:text disable-output-escaping="yes">&#160;</xsl:text></span>
                            <span class="SPNtext">
                                <xsl:value-of select="$of_SummaryAudit"/>
                            </span>
                            <span id ="TotPageSV__{$blockId}" name="TotPageSV__{$blockId}" class="SPNtext"><xsl:text disable-output-escaping="yes">&#160;</xsl:text>1</span>
                            <button class="BTNicon2D" title="{$next}" name="BTN_NEXT_{$blockId}" onClick="fnMoveNextMESV('{$blockId}')" disabled="disabled">
                                 <span tabindex="-1" class="ICOnext"><span class="LBLinv"><xsl:value-of select = "$next"/></span></span>
                            </button>
                        </div>
                    </xsl:if>
                    <xsl:if test="count(./READ_ONLY) = 0 or ./READ_ONLY = 0">
                        <div class="DIVpage" id="MESV_{$blockId}">
                            <button class="BTNicon2D" title="{$previous}" name="BTN_PREV_{$blockId}" onClick="fnMovePrevMESV('{$blockId}')" disabled="disabled">
                                 <span tabindex="-1" class="ICOprevious">
                                  <span class="LBLinv"><xsl:value-of select = "$previous"/></span>
                                 </span>
                            </button>
                            <span id= "CurrPageSV__{$blockId}" name="CurrPageSV__{$blockId}" class="SPNtext">1<xsl:text disable-output-escaping="yes">&#160;</xsl:text></span>
                            <span class="SPNtext">
                                <xsl:value-of select="$of_SummaryAudit"/><xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                            </span>
                            <span id ="TotPageSV__{$blockId}" name="TotPageSV__{$blockId}" class="SPNtext">1</span>
                            <button class="BTNicon2D" title="{$next}" name="BTN_NEXT_{$blockId}" onClick="fnMoveNextMESV('{$blockId}')" disabled="disabled">
                                <span tabindex="-1" class="ICOnext"><span class="LBLinv"><xsl:value-of select = "$next"/></span></span>
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
                 <span class="LBLinv"><xsl:value-of select = "$previous"/></span>
                </span>
            </button>
            <xsl:for-each select="./FIELD">
                <xsl:if test="./NAME = 'VERNO'">
                    <input type="text" class="TEXTPaging" LABEL_VALUE="" ID="{../BLOCK}__{./NAME}" DBT="{../BLOCK}" DBC="{./NAME}" NAME="VERNO" DTYPE="VARCHAR2" REQUIRED="0" size="1">
                        <xsl:if test="normalize-space(./READ_ONLY) = -1">
                            <xsl:attribute name="READONLY">true</xsl:attribute>
                            <xsl:attribute name="READONLY1">true</xsl:attribute>
                        </xsl:if>
                    </input>
                </xsl:if>
            </xsl:for-each>
            <input type="text" class="TEXTPaging" value="{$vernoOfLbl}" size="1" READONLY="true" READONLY1="true"/>
            <xsl:for-each select="./FIELD">
                <xsl:if test="./NAME = 'LATEST_VERNO'">
                    <input type="text" class="TEXTPaging" LABEL_VALUE="" ID="{../BLOCK}__{./NAME}" DBT="{../BLOCK}" DBC="{./NAME}" NAME="LATEST_VERNO" DTYPE="VARCHAR2" REQUIRED="0" size="1">
                        <xsl:if test="normalize-space(./READ_ONLY) = -1">
                            <xsl:attribute name="READONLY">true</xsl:attribute>
                            <xsl:attribute name="READONLY1">true</xsl:attribute>
                        </xsl:if>
                    </input>
                </xsl:if>
            </xsl:for-each>
            <button class="BTNicon2D" onclick="fnChangeVersion('Next')" LABEL_VALUE="" ID="" DBT="" DBC="" DTYPE="" name="BTN_NEXT_VER" title="{$next}">
                <span class="ICOnext"><span class="LBLinv"><xsl:value-of select = "$next"/></span></span>
            </button>
            <button class="BTNicon2D" onclick="fnChangeVersion('Last')" LABEL_VALUE="" ID="" DBT="" DBC="" DTYPE="" name="BTN_LAST_VER" title="{$last}">
                <span class="ICOlast">
                 <span class="LBLinv"><xsl:value-of select = "$last"/></span>
                </span>
            </button>
             <xsl:text disable-output-escaping="yes">&#160;</xsl:text>                
            <input id="Goto_version" type="text" size="1" class="TXTstd" value="" disabled="true" />
            <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
            <button class="BTNtextD" title="{$gotoPage_SummaryAudit}" name="BTN_GO_VER" value="Go" onclick="fnChangeVersion('GOTO')" disabled="true">
                <xsl:value-of select="$gotoPage_SummaryAudit"/>                    
            </button>
        </div>
    </xsl:template>
</xsl:stylesheet>
