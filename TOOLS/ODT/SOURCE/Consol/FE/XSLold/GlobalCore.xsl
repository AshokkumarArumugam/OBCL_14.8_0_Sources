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

	

	<!-- Group Handler 
	<xsl:template match="FIELD/TYPE[text()='GROUP']">

   		
   		<xsl:if test="$gPosition='column'">
   			<TD CLASS="colTDGroup">
	   			<xsl:call-template name="dispGroupField" />
   			</TD>
   		</xsl:if>
	</xsl:template>  -->

	<!-- Takes care of features common in Group Field of Absolute/Column Positioning 
	<xsl:template name="dispGroupField">
		<NOBR>
			<LABEL>
				<xsl:call-template name="ATTR_Handler">
					<xsl:with-param name="curr_fld" select=".." />
	   	   		</xsl:call-template>
        			<xsl:value-of select="../LABEL" />
			</LABEL>
		</NOBR>
	</xsl:template>  -->


	<!-- Label Handler 
	<xsl:template match="FIELD/TYPE[text()='LABEL']">
   		<xsl:if test="$gPosition='column'">
   			<TD CLASS="colTDLabel">
			
	   			<xsl:call-template name="dispLabelField" />
   			</TD>
   		</xsl:if>
	</xsl:template>
	-->

	<!-- Takes care of features common in Label Field of Absolute/Column Positioning -->
	<xsl:template name="dispLabelField">
		
		<NOBR> 
			<LABEL CLASS="LABELNormal">
	
				<xsl:call-template name="ATTR_Handler_lbs">
				    <xsl:with-param name="curr_fld" select=".." />
				</xsl:call-template>
                            
                            <xsl:attribute name="FOR">
                                          <xsl:if test="../DBT != ''">
                                                 <xsl:value-of select="concat(../DBT,'__',../DBC)"></xsl:value-of>
                                          </xsl:if>
                                          <xsl:if test="../DBT = ''">
                                                 <xsl:value-of select="../DBC"></xsl:value-of>
                                          </xsl:if>
				</xsl:attribute>
                         <xsl:attribute name="value"> 
                        	 <xsl:value-of select="../LABEL"></xsl:value-of>
                         </xsl:attribute>         
				<!--
				<xsl:if test="count(../HIDDEN) &gt;= 1 and ../HIDDEN = -1">
					<xsl:attribute name="CLASS">
						<xsl:text>hidden</xsl:text>
					</xsl:attribute>
				</xsl:if>
				!-->
				
				<xsl:call-template name="dispLabelCaption">
					<xsl:with-param name="curr_fld" select=".." />
				</xsl:call-template>
                            
                            <xsl:call-template name="RequiredFieldHandler">
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

		<!-- if no label is present , keep &nbsp to complete the TD. !-->
		<xsl:if test="$curr_fld/LABEL = ''">
			<xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
		</xsl:if>
              
       </xsl:template>


	<!-- Button Handler -->
  
	<xsl:template match="FIELD/TYPE[text()='BUTTON']">   
   		<xsl:if test="$gPosition='column'">
        
			<TD CLASS="colTDButton" >
    				<NOBR> 
                                   <xsl:call-template name="dispButtonField" />
    				</NOBR> 
			</TD>
   		</xsl:if>
	</xsl:template>

	<!-- Takes care of features common in Button Field of Absolute/Column Positioning -->
	<xsl:template name="dispButtonField">
		
		<!-- Display Button -->
              <!--
              <SPAN CLASS="SPANFlag" style="visibility:hidden;" title="Required Field">*</SPAN>!-->
		<BUTTON CLASS="INPUTButton" >      
                     <xsl:if test="count(../SRC) &gt; 0">            
                            <xsl:attribute name="CLASS">INPUTStdButton_img</xsl:attribute>
                     </xsl:if>
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
   		
   		<xsl:if test="$gPosition!='column'">
			<TD CLASS="colTDImg" >
    				<NOBR> 
	   				<xsl:call-template name="dispImgField" />
    				</NOBR> 
			</TD>
   		</xsl:if>
	</xsl:template>

	<!-- Takes care of features common in Img Field of Absolute/Column Positioning -->
	<xsl:template name="dispImgField">
		<!--
		<SPAN CLASS="SPANFlag" style="display:none;">*</SPAN>!-->	
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

	<!-- Takes care of features common in Button Field of Absolute/Column Positioning -->
  <xsl:template name="dispStdButtonField">
      <!-- Display Required Flag 
      <SPAN CLASS="SPANFlag" style="visibility:hidden;">*</SPAN> -->	
      <!-- Display Button -->
      <BUTTON CLASS="INPUTStdButton" >
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

  <!-- Takes care of features common in Button Field of Absolute/Column Positioning -->
  <xsl:template name="dispStdButtonField_img">    
      <!-- Display Button -->
      <BUTTON CLASS="INPUTStdButton_img" >
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
		
		<!--<xsl:apply-templates select="$curr_fld/EVENT"/>
		<xsl:apply-templates select="$curr_fld/CUSTOM"/>-->
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

