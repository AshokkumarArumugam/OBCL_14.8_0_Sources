<?xml version='1.0'?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:output version="1.0" method="xml" indent="yes" omit-xml-declaration="no" />
<xsl:template match="/FORM"> 
<HELP>
    <xsl:apply-templates select="SCREEN">
         
    </xsl:apply-templates>

</HELP>
</xsl:template>

<xsl:template match="SCREEN">
   <xsl:variable name="scrnName" select="@NAME"/>
   <SCREEN NAME="{@NAME}" TITLE="{@TITLE}">
         <xsl:apply-templates select="//BLOCK[@SCREEN=$scrnName and @TYPE='Single Entry' or @TYPE='Multiple Entry']" />         
          <xsl:apply-templates select="//BLOCK[@SCREEN=$scrnName and @TYPE='Audit Entry']" />
   </SCREEN>

</xsl:template>

<xsl:template match="BLOCK[@TYPE='Single Entry' or @TYPE='Multiple Entry']">
     <xsl:apply-templates select="FIELD[TYPE!='BUTTON' and TYPE!='LABEL' and TYPE!='HIDDEN' and TYPE!='CHECKBOX' and TYPE!='RADIO']" >
     </xsl:apply-templates>
</xsl:template>

<xsl:template match="BLOCK[@TYPE!='Single Entry' and @TYPE!='Multiple Entry']">
   
</xsl:template>

<xsl:template match="FIELD">
       <FIELD NAME="{./NAME}">
          <LABEL>
             <xsl:value-of select="LABEL" />
          </LABEL>
          <SHORT_DESC> </SHORT_DESC>
          <LONG_DESC></LONG_DESC>
       </FIELD>
</xsl:template>

<xsl:template match="BLOCK[@TYPE='Audit Entry']">
    <FIELD NAME="MAKER_ID" ROW="2" HREF="GlobalAuditEntry.xml" ALIAS="MAKER_ID">
			<LABEL>Maker ID</LABEL>
    </FIELD>
    <FIELD NAME="MAKER_DT_STAMP" ROW="2" HREF="GlobalAuditEntry.xml" ALIAS="MAKER_DT_STAMP">
			<LABEL>Maker TimeStamp</LABEL>
    </FIELD>
    <FIELD NAME="CHECKER_ID" ROW="2" HREF="GlobalAuditEntry.xml" ALIAS="CHECKER_ID">
			<LABEL>Checker ID</LABEL>
    </FIELD>
    <FIELD NAME="CHECKER_DT_STAMP" ROW="2" HREF="GlobalAuditEntry.xml" ALIAS="CHECKER_DT_STAMP">
			<LABEL>Checker TimeStamp</LABEL>
    </FIELD>
    <FIELD NAME="MOD_NO" ROW="2" HREF="GlobalAuditEntry.xml" ALIAS="MOD_NO">
			<LABEL>Modification Number</LABEL>
    </FIELD>
 </xsl:template>

<!--<xsl:template match="BLOCK">
   <xsl:variable name="bType" select="@TYPE"/>
   <xsl:if test="$bType='Single Entry'">
    		<xsl:call-template name="FieldHandler">
			    <xsl:with-param name="curr_fld" select="." />
   		</xsl:call-template>
   </xsl:if>
</xsl:template>-->

<!--
<xsl:template match="SCREEN">
   <xsl:variable name="sName" select="@NAME"/>
      <xsl:variable name="sTitle" select="@TITLE"/>
      <SCREEN NAME="{$sName}" TITLE="{$sTitle}">
      </SCREEN>
</xsl:template>
-->
</xsl:stylesheet>