<?xml version="1.0" encoding="UTF-8"?>
<!--====================================================================================================
**
** File Name    : HelpContent.xsl
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
	$Log: HelpContent.xsl.v $
	Revision 1.0  2005/06/21 08:31:38  IDVINITHAN
	Unit Creation
 
	********************************** END   OF LOG HISTORY **************************************

-->

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method='html' />
	<xsl:variable name="count" select="0"/>	
		<xsl:template match="/">
	  		<xsl:apply-templates select="*" mode="root">
    		</xsl:apply-templates>
		</xsl:template>
		
		<xsl:template name="DisplayNodes">
			<xsl:param name="NodeType" select="." />
			<xsl:param name="NodeId" select="." />
			<xsl:if test="$NodeType='root'">
				<div class="trigger" onClick="showChild('{$NodeId}');swapFolder('F{$NodeId}')">
    		        <img src="Images/closed.gif" border="0" id="F{$NodeId}"/>
    		        <NOBR><xsl:value-of select="@TITLE" /></NOBR>
    			</div>
    	       	<span class="branch" id ="{$NodeId}"> 
    		    <xsl:apply-templates select="*" mode="child">
    	    	</xsl:apply-templates>
			    </span>
		    </xsl:if> 
		 </xsl:template>
    
    	<xsl:template name="DisplayLeafs">
    		<img src="Images/doc.gif"/>
   			<xsl:if test="count(LONG_DESC) &gt;= 1">
	    		<input type="hidden" value='{LONG_DESC}' />
	        </xsl:if>
   			<xsl:if test="count(LONG_DESC) &lt;= 0">
		     	<xsl:variable name="vAlias" select="@ALIAS" />
 				<xsl:variable name="vLongDesc" select="document(@HREF)//FIELD[@NAME=$vAlias]/LONG_DESC" />
	    		<input type="hidden" >
					<xsl:attribute name="value">
						<xsl:value-of select="$vLongDesc" />
					</xsl:attribute>
	    		</input>
	        </xsl:if>
      		<span CLASS="SPANMenuItem" onclick="javascript:dispHref(this.previousSibling.value);">
	      		<NOBR>
   					<xsl:if test="count(LABEL) &gt;= 1">
	      				<xsl:value-of select="LABEL" />
	        		</xsl:if>
		   			<xsl:if test="count(LABEL) &lt;= 0">
				     	<xsl:variable name="vAlias" select="@ALIAS" />
		 				<xsl:variable name="vLabel" select="document(@HREF)//FIELD[@NAME=$vAlias]/LABEL" />
	      					<xsl:value-of select="$vLabel" />
			        </xsl:if>
	      		</NOBR>
			</span><BR/>
		</xsl:template>
    	
		<xsl:template match="SCREEN" mode="root">
			<xsl:call-template name="DisplayNodes">
				<xsl:with-param name="NodeType" select="'root'"/>
				<xsl:with-param name="NodeId" select="generate-id(current())"/>
    		</xsl:call-template>
		</xsl:template>
		
		<xsl:template match="FIELD" mode="child">
			<xsl:call-template name="DisplayLeafs">
		    </xsl:call-template>
		</xsl:template>

</xsl:stylesheet>
