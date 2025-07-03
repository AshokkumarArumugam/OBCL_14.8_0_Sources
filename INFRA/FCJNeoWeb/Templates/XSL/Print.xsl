<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method='html'/>
    <xsl:param name="summaryLabels"/>
    <xsl:param name="lblPrint"/>
    <xsl:param name="lblPrintPreview"/>
    <xsl:param name="param-shift-width" select="18"/>
     <xsl:param name="screenWidth"/>
    <xsl:variable name="labelWidth">
	  <xsl:value-of select="0.40 * (number($screenWidth) div 3 )"></xsl:value-of>
    </xsl:variable>
    <xsl:template match="/root">
        <div id='PRNpreview'>
            <!--<h2 class='hh4'>Print Preview</h2>-->
            <h2 class='hh4'><xsl:value-of select="$lblPrintPreview"/></h2>
            <div>
                <div>
                    <div>
                        <OJ-BUTTON slot="end" onclick='fnPrintValue();'>
                        <xsl:value-of select="$lblPrint"/>
                        </OJ-BUTTON>
                    </div>
                </div>
            </div>
            <xsl:apply-templates select="*[@Type]" mode="parent"/>
        </div>
    </xsl:template>

    <xsl:template match="*[@Type]" mode="parent">
        <xsl:variable name="currNode" select="."/>
        <div id="PrintScr">
        <div class='oj-sm-width-full sectionPanel'><div class='partitionPanel'><div class='oj-flex-item '><div class='oj-flex'>
        
            <!--<div class="DIVColumnTripple">-->
            <xsl:call-template name="fldSetTemplate">
                <xsl:with-param name="currNode" select="$currNode"/>
            </xsl:call-template>
        
            </div></div></div></div>
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
        
        <div>
            <div ><oj-form-layout max-columns="1" direction="column" label-edge='start' user-assistance-density="compact">
            <h2 class="hh4">
                <xsl:value-of select="@LABEL"/>
            </h2>
            <xsl:apply-templates select="$currNode/*[@FIELD]"/>
            <xsl:apply-templates select="$currNode/*[@Type]" mode="child"/>
            </oj-form-layout></div>
        </div>
    </xsl:template>

    <xsl:template match="*[@FIELD]">
    
        <div>
        
        <oj-label-value label-width="{$labelWidth}px">
            <oj-label slot="label">
                <xsl:value-of select="@LABEL"/>
            </oj-label>
            <!--Fix for 18045473 Starts -->
          <xsl:if test="string-length(.) &lt; 100 ">
            <oj-input-text  slot="value" readonly="readonly">
                 <xsl:attribute name="size">
                      <xsl:value-of select="string-length(.)+10"/>
                </xsl:attribute>
                <xsl:attribute name="value">
                    <xsl:value-of select="."/>
                </xsl:attribute>
            </oj-input-text>
            </xsl:if>
			<xsl:if test="string-length(.) &gt; 100 ">
			<!--Redwood_35250290 start-->
            <!--<oj-text-area  slot="value" readonly="readonly">-->
			<oj-text-area  slot="value" readonly="readonly" max-rows="-1">
			<!--Redwood_35250290 end-->
				<xsl:attribute name="ROWS">
                    <xsl:value-of select="string-length(.) div 50"/>
                </xsl:attribute>
                <!--Fix for 33159917 Starts-->
                 <xsl:if test="(string-length(.) - string-length(translate(., '&#xA;', ''))) &gt; (string-length(.) div 50) ">
                    <xsl:attribute name="ROWS">
                        <xsl:value-of select="string-length(.)+1- string-length(translate(., '&#xA;', ''))"/>
                    </xsl:attribute>
                </xsl:if>
                <!--Fix for 33159917 Ends-->
                <xsl:attribute name="COLS">
                   <xsl:text>100</xsl:text>               
                </xsl:attribute> 			
                <xsl:attribute name="value">
                    <xsl:value-of select="."/>
                </xsl:attribute>
				 <xsl:value-of select="."/>
            </oj-text-area>
            </xsl:if>
            
            <!--Fix for 18045473 Ends -->
            </oj-label-value>
            
        </div>
        
    </xsl:template>
</xsl:stylesheet>