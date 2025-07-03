<?xml version="1.0"?>
<!--====================================================================================================
**
** File Name    : GlobalCore.xsl
**
** Module       : FCJWeb
**
** This source is part of the FLEXCUBE Corporate - Corporate Banking
** Software System and is copyrighted by i-flex solutions limited.

** All rights reserved.  No part of this work may be reproduced,
** stored in a retrieval system, adopted or transmitted in any form
** or by any means, electronic, mechanical, photographic, graphic,
** optic recording or otherwise, translated in any language or
** computer language, without the prior written permission  from i-flex
** solutions limited.

** i-flex solutions limited.,
** 10-11, SDF I, SEEPZ, Andheri (East),
** MUMBAI - 400 096.
** INDIA.

Copyright (c) 2004 - 2006 by i-flex solutions limited..
====================================================================================================
 Caution Don't Delete this. This is used by the Version control utility.

	********************************** START OF LOG HISTORY **************************************
	$Log: GlobalCore.xsl.v $
	Revision 1.2  2005/02/08 12:32:10  IDSENTHILL
	1.2:Relesing to vercon

	Revision 1.1.1.0  2005/02/05 09:40:44  IDSENTHILL
	Usage of AVCS Begin.

	Revision 1.1  2004/12/10 10:58:13  ID10499
	1.1:Relesing to vercon

	Revision 1.0.1.0  2004/12/10 10:46:35  ID10499
	sending for peer review

	Revision 1.0  2004/12/09 11:00:13  ID10499
	Initial Checkin

	********************************** END   OF LOG HISTORY **************************************

-->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<!-- Takes care of features common in Label Field of Absolute/Column Positioning -->
	<xsl:template name="dispLabelField">
    <xsl:param name="dbt"/>
    <xsl:param name="dbc"/>
    <xsl:param name="fldName"/>
    <xsl:param name="fldNode"/>

		<NOBR> 
			<LABEL CLASS="LABELNormal">
          <xsl:value-of select="../LABEL"></xsl:value-of>
          <!--<SPAN class="SPANFlag" title="Required Field" style="VISIBILITY: hidden">*</SPAN>-->
          <xsl:call-template name="RequiredFieldHandler">
                 <xsl:with-param name="curr_fld" select="$fldNode" />
          </xsl:call-template>
          
			</LABEL>
		</NOBR>
		
	</xsl:template>

	
	<xsl:template name="dispLabelCaption">
		
		<xsl:param name="curr_fld" select="." />
	
		<!-- Labels with Access Key are being underlined -->
 		<xsl:if test="count($curr_fld/ACCESSKEY) &gt; 0 and contains($curr_fld/LABEL , $curr_fld/ACCESSKEY)">
    			<xsl:value-of select="substring-before($curr_fld/LABEL,$curr_fld/ACCESSKEY)" />
    			<U>
    			<xsl:value-of select="$curr_fld/ACCESSKEY" />
    			</U>
    			<xsl:value-of select="substring-after($curr_fld/LABEL,$curr_fld/ACCESSKEY)" />
		</xsl:if>
 		<xsl:if test="count($curr_fld/ACCESSKEY) = 0 or not(contains($curr_fld/LABEL , $curr_fld/ACCESSKEY))">
			<xsl:value-of select="$curr_fld/LABEL" />
		</xsl:if>

		<!-- if no label is present , keep &nbsp to complete the TD. !-->
		<xsl:if test="$curr_fld/LABEL = ''">
			<xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
		</xsl:if>
              
       </xsl:template>
	<xsl:template name="ATTR_Handler_lbs">

		<xsl:param name="curr_fld" select="." />
		
		<xsl:attribute name="NAME">
			    <xsl:value-of select="$curr_fld/NAME" />
		</xsl:attribute>
		

		<xsl:if test="count($curr_fld/HIDDEN) &gt; 0 and $curr_fld/HIDDEN = -1">
			<xsl:attribute name="CLASS">hidden</xsl:attribute>
		</xsl:if>

		<xsl:if test="count($curr_fld/ACCESSKEY) &gt; 0">
			    <xsl:attribute name="ACCESSKEY">
				<xsl:value-of select="$curr_fld/ACCESSKEY" />
			</xsl:attribute>
		</xsl:if>
		
	</xsl:template>


	<!-- Handler for Events -->
	<xsl:template match="EVENT">
		<xsl:attribute name="{./NAME}" >
   			<xsl:value-of select="./FUNCTION" />
   		</xsl:attribute>
	</xsl:template>

	<!-- Handler for Custom Attributes -->
	<xsl:template match="CUSTOM">
		<xsl:for-each select="*">
			<xsl:attribute name="{name()}" >
	   			<xsl:value-of select="." />
	   		</xsl:attribute>
		</xsl:for-each>
	</xsl:template>
    
</xsl:stylesheet>

