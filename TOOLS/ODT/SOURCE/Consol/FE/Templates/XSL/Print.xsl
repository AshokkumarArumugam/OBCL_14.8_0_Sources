<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method='html'/>
    <xsl:param name="summaryLabels"/>
    <xsl:param name="lblPrint"/>
    <xsl:param name="lblPrintPreview"/>
    <xsl:param name="param-shift-width" select="18"/>
    <xsl:template match="/root">
        <div id='PRNpreview' class='DIVHeader'>
            <!--<h2 class='hh4'>Print Preview</h2>-->
            <h2 class='hh4'><xsl:value-of select="$lblPrintPreview"/></h2>
            <div class='DIVThreeColSectionContainer'>
                <div class='DIVColumnTripple'>
                    <div class='DIVpage' style='width:99.5%;'>
                        <button class='BTNtext' onclick='fnPrintValue();'><xsl:value-of select="$lblPrint"/></button>
                    </div>
                </div>
            </div>
            <xsl:apply-templates select="*[@Type]" mode="parent"/>
        </div>
    </xsl:template>

    <xsl:template match="*[@Type]" mode="parent">
        <xsl:variable name="currNode" select="."/>
        <div class="DIVThreeColSectionContainer" id="PrintScr">
            <!--<div class="DIVColumnTripple">-->
            <xsl:call-template name="fldSetTemplate">
                <xsl:with-param name="currNode" select="$currNode"/>
            </xsl:call-template>
            <!--</div>-->
        </div>
    </xsl:template>

    <xsl:template match="*[@Type]" mode="child">
        <xsl:variable name="currNode" select="."/>
        <xsl:call-template name="fldSetTemplate">
            <xsl:with-param name="currNode" select="$currNode"/>
        </xsl:call-template>
    </xsl:template>

    <xsl:template name="fldSetTemplate">
        <xsl:param name="currNode"/>
        <div class="DIVdlg">
            <h2 class="hh4">
                <xsl:value-of select="@LABEL"/>
            </h2>
            <xsl:apply-templates select="$currNode/*[@FIELD]"/>
            <xsl:apply-templates select="$currNode/*[@Type]" mode="child"/>
        </div>
    </xsl:template>

    <xsl:template match="*[@FIELD]">
        <div class="DIVtext">
            <label class="LBLstd" for="pr">
                <xsl:value-of select="@LABEL"/>
            </label>
            <input id="pr" class="TXTro" readonly="readonly">
                <xsl:attribute name="value">
                    <xsl:value-of select="."/>
                </xsl:attribute>
            </input>
        </div>
    </xsl:template>
</xsl:stylesheet>