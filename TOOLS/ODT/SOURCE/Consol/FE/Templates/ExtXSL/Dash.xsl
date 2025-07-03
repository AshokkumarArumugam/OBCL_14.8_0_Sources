<?xml version="1.0"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
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
        <div id="csc"><span class="tr"></span>
            <div class="widgetonecontainer">
                <h2 class="widgetoneheading"><xsl:value-of select="LBL"/></h2>
                    <div class="widgetonetblbox">
                        <table width="100%"  cellspacing="1" cellpadding="0" class="widgetonetbl colw" summary="Category1">
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
                        </table>
                    </div>
                    <table summary="" style="margin: 0px 5px 5px 0px;" border="0" cellpadding="0" cellspacing="0">
                        <tbody>
                            <tr>
                                <td>&#160;</td>
                                <td valign="middle"><button class="Abut" disabled="disabled" title="Previous"><img src="Images/widgetonePrevious.gif" alt="Previous" title="Previous"></img></button></td>
                                <td>&#160;</td>							
                                <td valign="middle"><button class="Abut" disabled="disabled" title="Next"><img src="Images/widgetoneNext.gif" alt="Next" title="Next"></img></button></td>
                                <td>&#160;</td>
                                <td valign="middle"><button class="Abut" title="Refresh"><img src="Images/widgetoneRefresh.gif" alt="Refresh" title="Refresh"></img></button></td>
                                <td style="text-align: right;" valign="middle" width="95%"><a href="#" class="Afoot">more...</a></td>
                                <span class="bl"></span> <span class="br"></span>
                            </tr>
                        </tbody>
                    </table>
            </div>
        </div>
    </xsl:template>
    
    <xsl:template match="FIELD" mode="th">
        <th scope="col"><xsl:value-of select="LBL"/></th>
    </xsl:template>
    
    <xsl:template match="FIELD" mode="td">
        <xsl:if test="TYPE = 'AMOUNT' or (TYPE = 'TEXT' and DTYPE = 'NUMBER')">
            <td scope="row" class="numeric">&#160;</td>
        </xsl:if>
        <xsl:if test="TYPE != 'AMOUNT' and DTYPE != 'NUMBER'">
            <td scope="row">&#160;</td>
        </xsl:if>
    </xsl:template>
     
</xsl:stylesheet>