<?xml version="1.0"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:import href="Col_Detail.xsl"/>
	<xsl:import href="Abs_Detail.xsl"/>	
       <xsl:import href="GlobalTabs.xsl"/>
       
	<xsl:output method='html' />

	<xsl:param name="screen" />
	<xsl:param name="scr_height" />
	<xsl:param name="scr_width" />
  <xsl:param name="imgPath"/> <!-- Kals on March 02 , imgPath is parameterised -->
	<xsl:param name="funcId"/>
       <xsl:variable  name="imgPath_XSL">
          <xsl:choose>
                 <xsl:when test="$imgPath != ''">
                        <xsl:value-of select="$imgPath"/>
                 </xsl:when>
                 <xsl:otherwise>
                        <xsl:value-of select = "'Images'"/>
                 </xsl:otherwise>
          </xsl:choose>        
      </xsl:variable>
  
  <!-- sundar added...May 11..to differentiate Branch and Neo Uixml -->
   <xsl:variable name = "Brn_Neo" select = "normalize-space(//FORM/@MASTER)"/> 

	<!-- reading the screen and tabpage attributes !-->
	<xsl:variable name="gPosition"		select="/FORM/SCREEN[@NAME=$screen]/@POSITION" />


	<xsl:variable name="gHeight_form"		select="/FORM/SCREEN[@NAME=$screen]/@HEIGHT" />
	<xsl:variable name="gWidth_form"		select="/FORM/SCREEN[@NAME=$screen]/@WIDTH" />


	<xsl:variable name="gHeight"		select="$scr_height" />
	<xsl:variable name="gWidth"		select="$scr_width - 2" />

	<xsl:variable name="gHdrHeight"		select="/FORM/SCREEN[@NAME=$screen]/HEADER/PAGE/@HEIGHT" />
	<xsl:variable name="gAllTabHgt"		select="/FORM/SCREEN[@NAME=$screen]/TABPAGE_ALL/@HEIGHT"/>
	<xsl:variable name="gContexHgt"		select="35"/>

	  <xsl:variable name="gHdrHgt">
           <xsl:choose>
              <xsl:when test="$gHdrHeight &gt; 0">
                <xsl:value-of select="$gHdrHeight"/>
              </xsl:when>
              <xsl:otherwise>
                <xsl:text>0</xsl:text>
              </xsl:otherwise>
            </xsl:choose>
         </xsl:variable>

         <xsl:variable name="gTabAllHgt">
           <xsl:choose>
              <xsl:when test="$gAllTabHgt &gt; 0">
                <xsl:value-of select="$gAllTabHgt"/>
              </xsl:when>
              <xsl:otherwise>
                <xsl:text>0</xsl:text>
              </xsl:otherwise>
            </xsl:choose>
         </xsl:variable>
  
       
       <xsl:template match="/">
		<xsl:apply-templates select="FORM/SCREEN[@NAME=$screen]" />
	</xsl:template>

       

	<xsl:template match="SCREEN">

			
			<xsl:if test="count(TAB/PAGE) &gt; 0">
				<DIV id="UiDesign" CLASS="Rad_DivMAIN" style="position:{$gPosition};left:0px;top:0px;width:{$gWidth_form}px;height:{$gHeight_form}px;">
        <!-- Sundar added on Jun 10...to set the boundary of the screen in the Design screen -->
        <img src="{$imgPath_XSL}/border.gif" style="position:absolute;left:{$gWidth_form}px;top:0px;width:2px;height:{$gHeight_form - 5}px"></img>
        <img src="{$imgPath_XSL}/border.gif" style="position:absolute;left:0px;top:{$gHeight_form - 7}px;width:{$gWidth_form}px;height:2px"></img>
					<xsl:apply-templates select="HEADER/PAGE" mode="absolute"></xsl:apply-templates>						

					<xsl:if test="count(TAB/PAGE) &gt; 0">						
						<div id="DIV_SYS_TBL_TABS" style="padding-top:15px;width:{$gWidth_form}px;">						
							<xsl:call-template name="DisplayTabs"/> 
						</div>
                                          
                                          <DIV id="UiDesignTabContent" CLASS="Rad_DivTabPageCont" style="overflow-y:auto;width:{$gWidth - 10}px;height:{$gHeight - $gHdrHgt - $gTabAllHgt -45}px;">
						<!--<DIV id="UiDesignTabContent" CLASS="Rad_DivTabPageCont" style="overflow:scroll;width:{$gWidth - 10}px;height:{$gHeight - $gHdrHeight - $gAllTabHgt -45}px;"> !-->
							<xsl:apply-templates select="TAB/PAGE" mode="abs_content"> 					
								<xsl:with-param name="layout">uidesign</xsl:with-param>
							</xsl:apply-templates>
						</DIV>
					</xsl:if> 
					
				</DIV>
			</xsl:if>
			
                     <!--
			<DIV CLASS="Rad_absDIVPage" id="TBLPageAll" style="position:{$gPosition};top:{$gHeight - $gHdrHeight - $gAllTabHgt +95}px;left:0px;overflow:scroll;width:{$gWidth -10}px;height:{$gAllTabHgt}px;">
                     !-->
                     
                     <DIV CLASS="Rad_absDIVPage" id="TBLPageAll" style="position:{$gPosition};top:{$gHeight_form - $gHdrHgt - $gTabAllHgt +95}px;left:0px;overflow-y:auto;width:{$gWidth_form -10}px;height:{$gTabAllHgt}px;">				
				<xsl:if test="count(TAB/PAGE) = 0">
					<xsl:attribute name="style">
						<xsl:text>position:absolute;top:0px;left:0px;width:</xsl:text>						
						<xsl:value-of select="$gWidth_form - 10"/>
						<xsl:text>px;height:</xsl:text>
						<xsl:value-of select="$gHeight_form -5"/>
<!--						<xsl:text>px;border: '2px solid #118ddc';overflow-y:auto;</xsl:text> -->
						<xsl:text>px;overflow-y:auto;</xsl:text> 
					</xsl:attribute>					
				</xsl:if>
        <!-- Sundar added on Jun 10...to set the boundary of the screen in the Design screen -->        
        <img src="{$imgPath_XSL}/border.gif" style="position:absolute;left:{$gWidth_form}px;top:0px;width:2px;height:{$gHeight_form - 5}px"></img>
        <img src="{$imgPath_XSL}/border.gif" style="position:absolute;left:0px;top:{$gHeight_form - 7}px;width:{$gWidth_form}px;height:2px"></img>
				<xsl:call-template name="AbsolutePageHandler" >
					<xsl:with-param name="curr_page">All</xsl:with-param>
					<xsl:with-param name="layout">uidesign</xsl:with-param>
				</xsl:call-template>				
				
			</DIV>		
			
		
		
		<xsl:call-template name="generateScript"/>
		
	</xsl:template>	

	<xsl:template name="generateScript">		
		<script language="javascript" DEFER="DEFER">
			<!--
			<xsl:for-each select="/FORM/SCREEN[@NAME=$screen]">
				window.dialogHeight = "<xsl:value-of select="@HEIGHT" />";
				window.dialogWidth = "<xsl:value-of select="@WIDTH" />";
				document.title = "<xsl:value-of select="@TITLE" />";			
			</xsl:for-each>
			!-->

			window.dialogHeight = window.screen.height;
			window.dialogWidth = window.screen.width;
		</script>	
	</xsl:template>
</xsl:stylesheet>