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

<!-- Group Handler -->
<xsl:template match="FIELD/TYPE[text()='FIELDSET']">
   	<xsl:if test="$gPosition='absolute'">
   		<xsl:call-template name="FieldSetHandler">
			    <xsl:with-param name="curr_fld" select=".." />
   		</xsl:call-template>
   	</xsl:if>
</xsl:template>

<!-- Handler for FIELDSET -->
<xsl:template name="FieldSetHandler">
	<xsl:param name="curr_fld" select="." />
   	<FIELDSET CLASS="absFIELDSET" z-index="-1">
		<xsl:attribute name="STYLE">
			<xsl:variable name="row" select="substring-before($curr_fld/ABS_POS,',')" />
			<xsl:variable name="col" select="substring-after($curr_fld/ABS_POS,',')" />
			<xsl:text>{position:absolute;left:</xsl:text>
			<xsl:value-of select="$col" />
			<xsl:text>;top:</xsl:text>
			<xsl:value-of select="$row" />
			<xsl:text>;WIDTH:</xsl:text>
			<xsl:value-of select="$curr_fld/WIDTH" />
			<xsl:text>px;HEIGHT:</xsl:text>
			<xsl:value-of select="$curr_fld/HEIGHT" />
			<xsl:text>px;z-index:-1</xsl:text>
			<xsl:text>;}</xsl:text>
		</xsl:attribute>

		<LEGEND CLASS="absFIELDSETLegend">
   			<xsl:value-of select="$curr_fld/LEGEND" />
   		</LEGEND>
    </FIELDSET>
</xsl:template>

<!-- Group Handler -->
<xsl:template match="FIELD/TYPE[text()='GROUP']">

   	<xsl:if test="$gPosition='absolute'">
        <SPAN  CLASS="absSPANGroup">
		    <xsl:call-template name="pos_handler">
			     <xsl:with-param name="curr_fld" select=".." />
		    </xsl:call-template>

	   		<xsl:call-template name="dispGroupField" />
        </SPAN>
   	</xsl:if>
   	<xsl:if test="$gPosition!='absolute'">
   		<TD CLASS="colTDGroup">
	   		<xsl:call-template name="dispGroupField" />
   		</TD>
   	</xsl:if>
</xsl:template>

<!-- Takes care of features common in Group Field of Absolute/Column Positioning -->
<xsl:template name="dispGroupField">
    <NOBR>
        <LABEL>
	        <xsl:call-template name="ATTR_Handler">
			    <xsl:with-param name="curr_fld" select=".." />
	   	   	</xsl:call-template>
        	<xsl:value-of select="../LABEL" />
        </LABEL>
    </NOBR>
</xsl:template>

<!-- Label Handler -->
<xsl:template match="FIELD/TYPE[text()='LABEL']">
   	<xsl:if test="$gPosition='absolute'">
        <SPAN  CLASS="absSPANLabel">
		    <xsl:call-template name="pos_handler">
			     <xsl:with-param name="curr_fld" select=".." />
		    </xsl:call-template>

	   		<xsl:call-template name="dispLabelField" />
        </SPAN>
   	</xsl:if>
   	<xsl:if test="$gPosition!='absolute'">
   		<TD CLASS="colTDLabel">
			<!-- yugandhar added this for hidden field Label-->
			<xsl:if test="count(../HIDDEN)&gt;=1 and ../HIDDEN = -1">
				<xsl:attribute name="CLASS">
					<xsl:text>DispNone</xsl:text>
				</xsl:attribute>
			</xsl:if>
	   		<xsl:call-template name="dispLabelField" />
   		</TD>
   	</xsl:if>
</xsl:template>

<!-- Takes care of features common in Label Field of Absolute/Column Positioning -->
<xsl:template name="dispLabelField">
  <NOBR> 
	    <LABEL CLASS="LABELNormal">
	
	        <xsl:call-template name="ATTR_Handler">
			    <xsl:with-param name="curr_fld" select=".." />
	   	   	</xsl:call-template>

        	<xsl:if test="count(../HIDDEN) &gt;= 1 and ../HIDDEN = -1">
                <xsl:attribute name="CLASS">
                    <xsl:text>hidden</xsl:text>
                </xsl:attribute>
        	</xsl:if>
	   	   	
	        <xsl:call-template name="dispLabelCaption">
			    <xsl:with-param name="curr_fld" select=".." />
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

</xsl:template>

<!-- Button Handler -->
<xsl:template match="FIELD/TYPE[text()='BUTTON']">
   	<xsl:if test="$gPosition='absolute'">
    	<NOBR> 
	        <DIV CLASS="absDIVButton" >
			    <xsl:call-template name="pos_handler">
				     <xsl:with-param name="curr_fld" select=".." />
			    </xsl:call-template>
			    
		   		<xsl:call-template name="dispButtonField" />
	        </DIV>
        </NOBR>
   	</xsl:if>
   	<xsl:if test="$gPosition!='absolute'">
	    <TD CLASS="colTDButton" >
    		<NOBR> 
	   		<xsl:call-template name="dispButtonField" />
    		</NOBR> 
	    </TD>
   	</xsl:if>
</xsl:template>

<!-- Takes care of features common in Button Field of Absolute/Column Positioning -->
<xsl:template name="dispButtonField">
    <!-- Display Required Flag -->
    <SPAN CLASS="SPANFlag" style="display:none;">*</SPAN>
	
	<!-- Display Button -->
    <BUTTON CLASS="INPUTButton" >
        <xsl:call-template name="ATTR_Handler">
		    <xsl:with-param name="curr_fld" select=".." />
   	   	</xsl:call-template>

        <xsl:call-template name="dispLabelCaption">
		    <xsl:with-param name="curr_fld" select=".." />
   	   	</xsl:call-template>

     	<xsl:if test="count(../SRC) &gt; 0">
			<!-- Display Image -->
		    <IMG id="{../NAME}_IMG" SRC="{../SRC}" >
		     	<xsl:if test="count(../ALT) &gt; 0">
		  		    <xsl:attribute name="ALT">
			          	<xsl:value-of select="../ALT" />
			        </xsl:attribute>
		        </xsl:if>
		    </IMG>
		</xsl:if>        
    </BUTTON>
</xsl:template>

<!-- IMG Handler -->
<xsl:template match="FIELD/TYPE[text()='IMG']">
   	<xsl:if test="$gPosition='absolute'">
    	<NOBR> 
	        <DIV CLASS="absDIVImg" >
			    <xsl:call-template name="pos_handler">
				     <xsl:with-param name="curr_fld" select=".." />
			    </xsl:call-template>
			    
		   		<xsl:call-template name="dispImgField" />
	        </DIV>
        </NOBR>
   	</xsl:if>
   	<xsl:if test="$gPosition!='absolute'">
	    <TD CLASS="colTDImg" >
    		<NOBR> 
	   		<xsl:call-template name="dispImgField" />
    		</NOBR> 
	    </TD>
   	</xsl:if>
</xsl:template>

<!-- Takes care of features common in Img Field of Absolute/Column Positioning -->
<xsl:template name="dispImgField">
    <!-- Display Required Flag -->
    <SPAN CLASS="SPANFlag" style="display:none;">*</SPAN>
	
	<!-- Display Image -->
    <IMG CLASS="IMGButton" SRC="{../SRC}">
        <xsl:call-template name="ATTR_Handler">
		    <xsl:with-param name="curr_fld" select=".." />
   	   	</xsl:call-template>
     	<xsl:if test="count(../ALT) &gt; 0">
  		    <xsl:attribute name="ALT">
	          	<xsl:value-of select="../ALT" />
	        </xsl:attribute>
        </xsl:if>
    </IMG>
</xsl:template>

<!-- Named template to Handle field positioning -->
<xsl:template name="pos_handler">
<xsl:param name="curr_fld" />

	<xsl:choose>
		<xsl:when test="count($curr_fld/REL_POS) &gt; 0"> <!-- Relative position Specified -->
		<xsl:attribute name="STYLE">
			<xsl:variable name="row" select="substring-before($curr_fld/REL_POS,',')" />
			<xsl:variable name="col" select="substring-after($curr_fld/REL_POS,',')" />
			<xsl:text>{position:relative;left:</xsl:text>
			<xsl:value-of select="$col" />
			<xsl:text>;top:</xsl:text>
		    <xsl:value-of select="$row" />
			<xsl:text>;}</xsl:text>
		</xsl:attribute>
		</xsl:when>
		<xsl:when test="count($curr_fld/ABS_POS) &gt; 0"> <!-- Absolute position Specified -->
		<xsl:attribute name="STYLE">
			<xsl:variable name="row" select="substring-before($curr_fld/ABS_POS,',')" />
			<xsl:variable name="col" select="substring-after($curr_fld/ABS_POS,',')" />
			<xsl:text>{position:absolute;left:</xsl:text>
			<xsl:value-of select="$col" />
			<xsl:text>;top:</xsl:text>
			<xsl:value-of select="$row" />
			<xsl:text>;}</xsl:text>
		</xsl:attribute>
		</xsl:when>
	</xsl:choose>
</xsl:template>

<xsl:template name="ATTR_Handler">
<xsl:param name="curr_fld" select="." />
	    <xsl:if test="count($curr_fld/VALUE) &gt; 0">
  		    <xsl:attribute name="VALUE">
	            <xsl:value-of select="$curr_fld/VALUE" />
   		    </xsl:attribute>
	    </xsl:if>
        <xsl:attribute name="DBT">
            <xsl:value-of select="$curr_fld/DBT" />
        </xsl:attribute>
     	<xsl:attribute name="DBC">
          	<xsl:value-of select="$curr_fld/DBC" />
        </xsl:attribute>
        <xsl:attribute name="NAME">
		    <xsl:value-of select="$curr_fld/NAME" />
	    </xsl:attribute>
        <xsl:attribute name="ID">
        	<xsl:if test="count($curr_fld/DBT) &gt; 0">
			    <xsl:value-of select="concat($curr_fld/DBT,'__',$curr_fld/DBC)" />
		    </xsl:if>
        	<xsl:if test="count(../DBT) &lt; 1">
			    <xsl:value-of select="concat(../DBT,'__',$curr_fld/DBC)" />
		    </xsl:if>
	    </xsl:attribute>
        <xsl:attribute name="SIZE">
		    <xsl:value-of select="$curr_fld/SIZE" />
	    </xsl:attribute>
        <xsl:if test="count($curr_fld/READ_ONLY) &gt; 0 and $curr_fld/READ_ONLY = -1">
      	    <xsl:attribute name="READONLY">true</xsl:attribute>
      	    <xsl:attribute name="CLASS">TextReadonly</xsl:attribute>       	     
        </xsl:if>
        <xsl:if test="count($curr_fld/DISABLED) &gt; 0 and $curr_fld/DISABLED = -1">
      	    <xsl:attribute name="DISABLED">DISABLED</xsl:attribute>
      	    <xsl:attribute name="CLASS">TextDisabled</xsl:attribute>
        </xsl:if>
        <xsl:if test="count($curr_fld/HIDDEN) &gt; 0 and $curr_fld/HIDDEN = -1">
  		    <xsl:attribute name="CLASS">hidden</xsl:attribute>
        </xsl:if>
     	<xsl:if test="count($curr_fld/ACCESSKEY) &gt; 0">
  		    <xsl:attribute name="ACCESSKEY">
	          	<xsl:value-of select="$curr_fld/ACCESSKEY" />
	        </xsl:attribute>
        </xsl:if>
		<xsl:apply-templates select="$curr_fld/EVENT"/>
		<xsl:apply-templates select="$curr_fld/CUSTOM"/>

		<!-- Changes added By Senthil for adding the attributed REQUIRED and
		     DTYPE to the HTML. This will used to perform mandatory and data
		     type validations. -->
        <xsl:attribute name="REQUIRED">
		    <xsl:value-of select="$curr_fld/REQUIRED" />
	    </xsl:attribute>
        <xsl:attribute name="DTYPE">
		    <xsl:value-of select="$curr_fld/DTYPE" />
	    </xsl:attribute>
	    
	    <!-- yugandhar added this for Multiple entry fields REFFIELD element -->
		<xsl:if test="$curr_fld/REFFIELD !=''">
  			<xsl:attribute name="REFFIELD">
				<xsl:value-of select="$curr_fld/REFFIELD" />
   			</xsl:attribute>
		</xsl:if>
		<!-- yugandhar added this for CHECKBOX default ON&OFF values-->
		<xsl:if test="$curr_fld/CHKVALUE/ON != ''">
	  		<xsl:attribute name="ON">
				<xsl:value-of select="$curr_fld/CHKVALUE/ON" />
		        </xsl:attribute>
	        </xsl:if>
		<xsl:if test="$curr_fld/CHKVALUE/OFF != ''">
	  		<xsl:attribute name="OFF">
				<xsl:value-of select="$curr_fld/CHKVALUE/OFF" />
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

