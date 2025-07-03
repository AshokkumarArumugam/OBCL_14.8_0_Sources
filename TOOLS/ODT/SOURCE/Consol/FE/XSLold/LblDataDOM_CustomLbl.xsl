<?xml version ="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:str="http://www.w3.org/1999/XSL/Transform"
                xml:space="default">
  <xsl:output method="xml" indent="yes" cdata-section-elements="CUSTOM"/>
  <xsl:param name="Language"/>
  <!--
  <xsl:variable name = "EngorOther">
    <xsl:if test = "$Language = 'English'">
      <xsl:value-of select = 'TXT_LABELVALUE'/>
    </xsl:if>
    <xsl:if test = "$Language != 'English'">
      <xsl:value-of select = 'TXT_DEFVALUE'/>
    </xsl:if>
    
    
  </xsl:variable>
  -->
  <xsl:variable name = "EngorOther">
      <xsl:value-of select = 'TXT_LABELVALUE'/>
  </xsl:variable>
  
  <xsl:template match="/LABELS">
    <xsl:variable name = "ModId" select = "//TXT_MODULE_ID"/>
    <xsl:variable name = "MasterXML" select = "//TXT_MASTERXML_NAME"/>
    <MODULE ID = "{$ModId}">
      <MASTERXML ID = "{$MasterXML}">
          <xsl:for-each select="CUSTOMLABELS/TXT_FUNCTIONID[not(.=preceding::TXT_FUNCTIONID)]">
            <xsl:variable name="test" select="."/>
              <FUNCTION ID="{$test}">
                <xsl:apply-templates select="//CUSTOMLABELS[TXT_FUNCTIONID = $test]">
                </xsl:apply-templates>
            </FUNCTION>
          </xsl:for-each>
      </MASTERXML>
     </MODULE> 
  </xsl:template>
  <xsl:template match="CUSTOMLABELS">
      <xsl:for-each select = "LBL_VALUE">

        <xsl:variable name="CustomLabel">
          <xsl:call-template name="str:to-lower">
            <xsl:with-param name="text">
              <xsl:value-of select="./TXT_LABELID"/>
            </xsl:with-param>
          </xsl:call-template>
        </xsl:variable>
      
      <CUSTOM ID = "{position()}" LABELID="{$CustomLabel}">
        <xsl:value-of select="TXT_LABELVAL"/>
      </CUSTOM>
     </xsl:for-each> 
    
  </xsl:template>
  <!-- Template to convert to lower case -->
  <xsl:template name="str:to-lower">
    <xsl:param name="text"/>
    <xsl:variable name="lcletters">abcdefghijklmnopqrstuvwxyz</xsl:variable>
    <xsl:variable name="ucletters">ABCDEFGHIJKLMNOPQRSTUVWXYZ</xsl:variable>
    <xsl:value-of select="translate($text, $ucletters, $lcletters)"/>
  </xsl:template>
     <!-- Template to convert to upper case -->
     <xsl:template name="str:to-upper">
            <xsl:param name="text"/>
            <xsl:variable name="lcletters">abcdefghijklmnopqrstuvwxyz </xsl:variable>
            <xsl:variable name="ucletters">ABCDEFGHIJKLMNOPQRSTUVWXYZ</xsl:variable>
            <xsl:value-of select="translate($text,  $lcletters , $ucletters)"/>
     </xsl:template>
  
</xsl:stylesheet>
