<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    
    
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
    
</xsl:stylesheet>
