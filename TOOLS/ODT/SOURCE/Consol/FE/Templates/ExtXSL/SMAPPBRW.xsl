<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method='html' />
	<xsl:param name="imgPath"/>
        <xsl:param name="noScript"/>
        <xsl:param name="screen"/> <!--Added By Fahad as part of IPFB Changes -->
		<xsl:template match="/">
	  		<xsl:apply-templates select="*" mode="root">
    		</xsl:apply-templates>
                <!--Added IF Condition By Fahad as part of IPFB Changes-->
                <xsl:if test="$screen!='SMBPLBRW'">
                    <xsl:call-template name="extractRights"/>
    		 </xsl:if> 
		</xsl:template>
		
		<xsl:template name="extractRights">                        
			<script type="text/javascript" DEFER="DEFER">
				function fnGetFinalRights(){
					<xsl:for-each select="//LEAF">
						this['<xsl:value-of select="@FNID"/>']='<xsl:value-of select="@RIGHTS"/>';
					</xsl:for-each>
				}
    		</script>
                <noscript>
                    <xsl:value-of select="$noScript"/>
                </noscript>
		</xsl:template>
		    	
    	<xsl:template name="DisplayNodes">
			<xsl:param name="NodeType" select="." />
			<xsl:param name="NodeId" select="." />
			<!--<B><xsl:value-of select = "$NodeType"/></B>
			<B><xsl:value-of select = "$NodeId"/></B>
			-->
			<xsl:if test="$NodeType='root'">
	                <div class="MenuLDiv">
					  <a style="color:#26313B;display:block;" href="javascript:showBranch('{$NodeId}');swapFolder('F{$NodeId}','root','F{$NodeId}A')" id = "F{$NodeId}A"> 
					 	  <!-- To display in Expanded mode on startup, uncomment this line and comment next line 
                                                    <img src="{$imgPath}/ar_mn_white.gif" alt="Expand this group" name="F{$NodeId}" border="0" id="F{$NodeId}" /> 
                                                  -->
                                                  <img src="{$imgPath}/ar_mn_black.gif" alt="{$expand_group}" name="F{$NodeId}" border="0" id="F{$NodeId}" /> 
		                  <xsl:text> </xsl:text>				  
						  <xsl:value-of select="@LABEL" />
					  </a>
					</div>
                                <!-- To display in Expanded mode on startup, uncomment this line and comment next line
                                    <span class="branch" id ="{$NodeId}" style="display:block"> 
                                -->
                                <span class="branch" id ="{$NodeId}"  style="height:0px;display:none;visibility:hidden"> 
                    <xsl:apply-templates select="*" mode="child">
                    </xsl:apply-templates>
			    </span>
		    </xsl:if> 
       		<xsl:if test="$NodeType='child'"> 
       		    <div class="MenuL2Div">
					  <a style="display:block;" href="javascript:showBranch('{$NodeId}');swapFolder('F{$NodeId}','child','F{$NodeId}A')" id = "F{$NodeId}A"> 
                                                <!-- To display in Expanded mode on startup, uncomment this line and comment next line 
						  <img src="{$imgPath}/ar_mn_brown.gif" alt="Expand this group" name="F{$NodeId}" border="0" id="F{$NodeId}"/>
                                                -->
                                                <img src="{$imgPath}/ar_mn_green.gif" alt="{$expand_group}" name="F{$NodeId}" border="0" id="F{$NodeId}"/>
    		  			  <xsl:text> </xsl:text>
						  <xsl:value-of select="@LABEL" />
					  </a>
				</div>
                            <!-- To display in Expanded mode on startup, uncomment this line and comment next line 
                                <span class="branch" id ="{$NodeId}" style="display:block"> 
                            -->
                            <span class="branch" id ="{$NodeId}" style="height:0px;display:none;visibility:hidden"> 
		    		<xsl:apply-templates select="*" mode="child">
    	    		</xsl:apply-templates>
    	    	</span>                
		   </xsl:if>
		 </xsl:template>
		 
        <xsl:template name="DisplayLeafs">
    		<xsl:param name="winHref" select="." />
    		<xsl:param name="finalRights" select="." />
    		<xsl:param name="txnType" select="." />
                <xsl:param name="UIName" select="." />
                <xsl:param name="criteria" select="."/> <!--Added By Fahad as part of IPFB Changes -->
                <xsl:param name="search" select="."/> <!--Added By Fahad as part of IPFB Changes -->
                <xsl:param name="typeString" select="."/> <!--Added By Fahad as part of IPFB Changes -->
                <xsl:param name="taskCount" select="."/> <!-- ctcb -->
                
                <!--Added IF Condition By Fahad as part of IPFB Changes-->
                <xsl:if test="$screen='SMBPLBRW'">
                    <div class="MenuL3Div">
                    	<!-- CTCB ADDED ** count="{$taskCount}" ** -->
                        <a style="display:block;" count="{$taskCount}" title="{$winHref}" onclick="javascript:taskDisplay('{$criteria}','{$search}');"          
                            href="#">
                        <img src="{$imgPath}/ar_mn_blue.gif" alt="{$expand_group}" border="0"/>
                        <xsl:text> </xsl:text>
                        <xsl:value-of select="@LABEL"/>
                        </a>
                  </div>
                </xsl:if>
                <!--Added IF Condition By Fahad as part of IPFB Changes-->
                <xsl:if test="($screen!='SMBPLBRW')">
                    <xsl:if test="$typeString!='T'">                
                        <div class="MenuL3Div">
                        <!--12.0.2-->
				<a style="display:block;" id ="{$winHref}" title="{$winHref}" href="javascript:dispHref('{$winHref}','{$UIName}','{$finalRights}','{$txnType}');">
				<img src="{$imgPath}/ar_mn_blue.gif" alt="{$expand_group}" border="0" onclick="dispHref('{$winHref}','{$UIName}','{$finalRights}','{$txnType}');"/>
				<xsl:text> </xsl:text>
				<xsl:value-of select="@LABEL" />
                                </a>
			</div>
                    </xsl:if>
                </xsl:if>
		</xsl:template>
		
		<xsl:template match="NODE" mode="root">
			<xsl:call-template name="DisplayNodes">
				<xsl:with-param name="NodeType" select="'root'"/>
				<xsl:with-param name="NodeId" select="generate-id(current())"/>
    		</xsl:call-template>
		</xsl:template>
		
		<xsl:template match="NODE" mode="child">
			<xsl:call-template name="DisplayNodes">
				<xsl:with-param name="NodeType" select="'child'"/>
				<xsl:with-param name="NodeId" select="generate-id(current())"/>
    		</xsl:call-template>
       	</xsl:template>    	
    	
		<xsl:template match="LEAF" mode="root">
			<xsl:call-template name="DisplayLeafs">
				<xsl:with-param name="winHref" select="@FNID"/>
				<xsl:with-param name="finalRights" select="@RIGHTS"/>
				<xsl:with-param name="txnType" select="@TXNTYPE"/>
                                <xsl:with-param name="UIName" select="@UINAME"/>
                                <xsl:with-param name="criteria" select="@CRITERIA"/> <!--Added IF COndition By Fahad as part of IPFB Changes-->
                                <xsl:with-param name="search" select="@SEARCH"/> <!--Added IF COndition By Fahad as part of IPFB Changes-->
                                <xsl:with-param name="typeString" select="@TYPESTRING"/> <!--Added IF COndition By Fahad as part of IPFB Changes-->
                                <xsl:with-param name="taskCount" select="@taskCount"/> <!-- CTCB taskcount will be an attribute in the <a> tag 
                                and can be obtained by during onclick event to check if count is zero and to do pagination --> 
	    	</xsl:call-template>
		</xsl:template>
	
		<xsl:template match="LEAF" mode="child">
			<xsl:call-template name="DisplayLeafs">
			<xsl:with-param name="winHref" select="@FNID"/>
			<xsl:with-param name="finalRights" select="@RIGHTS"/>
			<xsl:with-param name="txnType" select="@TXNTYPE"/>
                        <xsl:with-param name="UIName" select="@UINAME"/>
                        <xsl:with-param name="criteria" select="@CRITERIA"/> <!--Added IF COndition By Fahad as part of IPFB Changes-->
                        <xsl:with-param name="search" select="@SEARCH"/> <!--Added IF COndition By Fahad as part of IPFB Changes-->
                        <xsl:with-param name="typeString" select="@TYPESTRING"/> <!--Added IF COndition By Fahad as part of IPFB Changes-->                       
                        <xsl:with-param name="taskCount" select="@taskCount"/>         <!-- ctcb -->               
		    </xsl:call-template>
		</xsl:template>

</xsl:stylesheet>
