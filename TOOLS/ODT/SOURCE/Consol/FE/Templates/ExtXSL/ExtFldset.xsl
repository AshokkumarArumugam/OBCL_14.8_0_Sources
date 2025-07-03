<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:import href="ExtSubPartition.xsl"/>
    <xsl:import href="ExtFldsetType.xsl"/>
    <xsl:import href="ExtFields.xsl"/>
    
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
    
        <!--<fieldset class="FSTcell" block="{./BLOCK}" type="{@TYPE}" view="{@VIEW}">
        
             <xsl:if test="LBL != ''">
                <xsl:attribute name = "class">
                    <xsl:value-of select = "'FSTstd'"/>
                </xsl:attribute>
            </xsl:if>
        
            <legend><xsl:value-of select="LBL"/></legend>-->
            
            <xsl:if test="count(../SPRTCNT) = 0 or ../SPRTCNT = '0'">
                <xsl:call-template name="FldSetTypeHandler" >
                    <xsl:with-param name="sprtReqd" select="'N'"/>
                    <xsl:with-param name="SPRT_Index" select="0"/>
                </xsl:call-template>
            </xsl:if>
            
            <xsl:if test="count(../SPRTCNT) > 0 and ../SPRTCNT != '0'">
               <!-- <table class="TABLEFooter" cellpadding="0" cellspacing="0" border="0" width="100%" summary="">
                    <tr>-->
                        <xsl:call-template name="sprtHandler">
                            <xsl:with-param name="footer" select="'Y'"/>
                            <xsl:with-param name="SPRT_Index" select="1"/>
                            <xsl:with-param name="subpartCount" select="../SPRTCNT"/>
                        </xsl:call-template>
                    <!--</tr>
                </table>-->
            </xsl:if>
        <!--</fieldset>-->
        
        
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
                    <table border="0" cellpadding="0" cellspacing="0" role="presentation">
                        <tbody role="group" aria-labelledby="{./BLOCK}">
                            <tr>
                                <xsl:apply-templates select="./FIELD" mode="hFieldSet">
                                <xsl:sort select="@INDEX" data-type="number" order="ascending"/>
                                </xsl:apply-templates>
                            </tr>
                            </tbody>
                    </table>
                </div>
                
            </fieldset>
        
    </xsl:template>
    
    <!--
    <xsl:template name="displayLabelFieldSet_tmp">
        <xsl:value-of select="LBL"/>
    </xsl:template>
    !-->
</xsl:stylesheet>
