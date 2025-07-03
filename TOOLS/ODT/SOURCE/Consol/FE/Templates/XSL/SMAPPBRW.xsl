<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method='html' />
    <xsl:param name="imgPath"/>
        <xsl:param name="noScript"/>
    <xsl:param name="screen"/> <!--Added By Fahad as part of IPFB Changes -->
    <xsl:template match="/">
        <xsl:apply-templates select="MENU"/>
    </xsl:template>
    <xsl:template match="MENU">
        <a name="hrefMenu"></a>
		<xsl:if test="$screen!='SMBPLORIG'">  <!--12.0.2 SOATEAM -->
        <ul id="treemenu1" class="treeview">
            <xsl:apply-templates select="*" mode="root"/>
        </ul>
        <!-- 12.0.2 SOATEAM Starts-->
		</xsl:if> 
		<xsl:if test="$screen='SMBPLORIG'">
			<ul id="treemenu3" class="treeview">
				<xsl:apply-templates select="*" mode="root"/>
			</ul>
		</xsl:if><!-- 12.0.2 SOATEAM Ends--> 
        <!--Added IF Condition By Fahad as part of IPFB Changes-->
        <xsl:if test="$screen!='SMBPLBRW'">
            <xsl:call-template name="extractRights"/>
        </xsl:if> 
    </xsl:template>
		
		<xsl:template name="extractRights">                        
			<textarea style="display:none" id = "finalFunctionRights">
                            <xsl:for-each select="//LEAF">
                                    <xsl:value-of select="@FNID"/>
                                    <xsl:text>=</xsl:text>
                                    <xsl:value-of select="@RIGHTS"/>
                                    <xsl:text>;</xsl:text>
                            </xsl:for-each>
                        </textarea>
                        <!--
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
                        -->
                
		</xsl:template>
		    	
    	<xsl:template name="DisplayNodes">
			<xsl:param name="NodeType" select="." />
			<xsl:param name="NodeId" select="." />
			<!--<B><xsl:value-of select = "$NodeType"/></B>
			<B><xsl:value-of select = "$NodeId"/></B>
			-->
			<xsl:if test="$NodeType='root'">
	                <!--<div class="MenuLDiv">-->
                        <li>
					  <a class="Astd" tabIndex ="0" href="#" id = "F{$NodeId}A"> 
					 	  <!-- To display in Expanded mode on startup, uncomment this line and comment next line 
                                                    <img src="{$imgPath}/ar_mn_white.gif" alt="Expand this group" name="F{$NodeId}" border="0" id="F{$NodeId}" /> 
                                                  -->
                                                  <!--<img src="{$imgPath}/ar_mn_black.gif" alt="Expand this group" name="F{$NodeId}" border="0" id="F{$NodeId}" /> 
		                  <xsl:text> </xsl:text>-->				  
						  <xsl:value-of select="@LABEL" />
					  </a>
					<!--</div>-->
                                <!-- To display in Expanded mode on startup, uncomment this line and comment next line
                                    <span class="branch" id ="{$NodeId}" style="display:block"> 
                                -->
                                <!--<span class="branch" id ="{$NodeId}"  style="height:0px;display:none;visibility:hidden"> -->
					<xsl:if test="$screen!='SMBPLORIG'">  <!-- 12.0.2 SOATEAM -->
                    <ul id="treemenu1">
                    <xsl:apply-templates select="*" mode="child">
                    </xsl:apply-templates>
                    </ul>
					<!--12.0.2 SOATEAM Changes Starts -->
					</xsl:if> 
					<xsl:if test="$screen='SMBPLORIG'">
						<ul id="treemenu3">
							<xsl:apply-templates select="*" mode="child">
							</xsl:apply-templates>
						</ul>
					</xsl:if> <!-- 12.0.2 SOATEAM Changes Ends -->
                    </li>
			    <!--</span>-->
		    </xsl:if> 
       		<xsl:if test="$NodeType='child'"> 
       		    <!--<div class="MenuL2Div">-->
                    <li>
					  <a class="Astd" href="#" id = "F{$NodeId}A"> 
                                                <!-- To display in Expanded mode on startup, uncomment this line and comment next line 
						  <img src="{$imgPath}/ar_mn_brown.gif" alt="Expand this group" name="F{$NodeId}" border="0" id="F{$NodeId}"/>
                                                -->
                                                <!--<img src="{$imgPath}/ar_mn_green.gif" alt="Expand this group" name="F{$NodeId}" border="0" id="F{$NodeId}"/>
    		  			  <xsl:text> </xsl:text>-->
						  <xsl:value-of select="@LABEL" />
					  </a>
				<!--</div>-->
                            <!-- To display in Expanded mode on startup, uncomment this line and comment next line 
                                <span class="branch" id ="{$NodeId}" style="display:block"> 
                            -->
                            <!--<span class="branch" id ="{$NodeId}" style="height:0px;display:none;visibility:hidden"> -->
					<xsl:if test="$screen!='SMBPLORIG'">
                            <ul id="treemenu1">
		    		<xsl:apply-templates select="*" mode="child">
    	    		</xsl:apply-templates>
                        </ul>
					</xsl:if> 						
					<xsl:if test="$screen='SMBPLORIG'">
                        <ul id="treemenu3">
							<xsl:apply-templates select="*" mode="child">
							</xsl:apply-templates>
                        </ul>
					</xsl:if> 	 
    	    	<!--</span>                -->
                </li>
		   </xsl:if>
		 </xsl:template>
		 
        <xsl:template name="DisplayLeafs">
    		<xsl:param name="winHref" select="." />
                <xsl:param name="cusFunc" select="."/>
    		<xsl:param name="finalRights" select="." />
    		<xsl:param name="txnType" select="." />
                <xsl:param name="UIName" select="." />
                <xsl:param name="criteria" select="."/> <!--Added By Fahad as part of IPFB Changes -->
                <xsl:param name="search" select="."/> <!--Added By Fahad as part of IPFB Changes -->
                <xsl:param name="typeString" select="."/> <!--Added By Fahad as part of IPFB Changes -->
                <xsl:param name="taskCount" select="."/> <!-- ctcb -->
                
                <!--Added IF Condition By Fahad as part of IPFB Changes-->
                <xsl:if test="$screen='SMBPLBRW'">
                    <!--<div class="MenuL3Div">-->
                    	<!-- CTCB ADDED ** count="{$taskCount}" ** -->
                        <li>
                            <xsl:if test="($cusFunc!='null') and ($cusFunc!= '')">
                 <!-- 12.0.2-->           
				<a id ="{$winHref}|{$cusFunc}"  class="Astd" title="{$winHref} | {$cusFunc}" href="javascript:dispHref('{$winHref}','{$UIName}','{$finalRights}','{$txnType}');">
				<xsl:value-of select="@LABEL" />
                                </a>
                            </xsl:if>
                            <xsl:if test="($cusFunc='null') or ($cusFunc ='')">
                              <!-- 12.0.2-->           
				<a id ="{$winHref}" class="Astd" title="{$winHref}" href="javascript:dispHref('{$winHref}','{$UIName}','{$finalRights}','{$txnType}');">
				<xsl:value-of select="@LABEL" />
                                </a>
                            </xsl:if>
                  <!--</div>-->
                  </li>
                </xsl:if>
                <!--Added IF Condition By Fahad as part of IPFB Changes-->
                <xsl:if test="($screen!='SMBPLBRW')">
                    <xsl:if test="$typeString!='T'">                
                        <!--<div class="MenuL3Div">-->
                        <li>
                            <xsl:if test="($cusFunc!='null') and ($cusFunc!= '')">
                               <!-- 12.0.2-->      
				<a id ="{$winHref}|{$cusFunc}" class="Astd" title="{$winHref} | {$cusFunc}" href="javascript:dispHref('{$winHref}','{$UIName}','{$finalRights}','{$txnType}');">
				<xsl:value-of select="@LABEL" />
                                </a>
                            </xsl:if>
                            <xsl:if test="($cusFunc='null') or ($cusFunc ='')">
                               <!-- 12.0.2-->      
				<a id ="{$winHref}" class="Astd" title="{$winHref}" href="javascript:dispHref('{$winHref}','{$UIName}','{$finalRights}','{$txnType}');">
				<xsl:value-of select="@LABEL" />
                                </a>
                            </xsl:if>
                        </li>
			<!--</div>-->
                    </xsl:if>
                </xsl:if>
		</xsl:template>
		
		<xsl:template match="NODE" mode="root">
			<xsl:if test="((@TASKMENU!='Y') and ($screen!='SMBPLORIG')) or  ((@TASKMENU='Y') and ($screen='SMBPLORIG'))">
			<xsl:call-template name="DisplayNodes">
				<xsl:with-param name="NodeType" select="'root'"/>
				<xsl:with-param name="NodeId" select="generate-id(current())"/>
    		</xsl:call-template>
			</xsl:if>
		</xsl:template>
		
		<xsl:template match="NODE" mode="child">
			<xsl:call-template name="DisplayNodes">
				<xsl:with-param name="NodeType" select="'child'"/>
				<xsl:with-param name="NodeId" select="generate-id(current())"/>
    		</xsl:call-template>
    </xsl:template>    	
    	
		<xsl:template match="LEAF" mode="root">
    <xsl:if test="((@TASKMENU!='Y') and ($screen!='SMBPLORIG')) or  ((@TASKMENU='Y') and ($screen='SMBPLORIG'))">
			<xsl:call-template name="DisplayLeafs">
				<xsl:with-param name="winHref" select="@FNID"/>
                                <xsl:with-param name="cusFunc" select="@USER_FNID"/>
				<xsl:with-param name="finalRights" select="@RIGHTS"/>
				<xsl:with-param name="txnType" select="@TXNTYPE"/>
                                <xsl:with-param name="UIName" select="@UINAME"/>
                                <xsl:with-param name="criteria" select="@CRITERIA"/> <!--Added IF COndition By Fahad as part of IPFB Changes-->
                                <xsl:with-param name="search" select="@SEARCH"/> <!--Added IF COndition By Fahad as part of IPFB Changes-->
                                <xsl:with-param name="typeString" select="@TYPSTR"/> <!--Added IF COndition By Fahad as part of IPFB Changes-->
                                <xsl:with-param name="taskCount" select="@taskCount"/> <!-- CTCB taskcount will be an attribute in the <a> tag 
                                and can be obtained by during onclick event to check if count is zero and to do pagination --> 
	    	</xsl:call-template>
        </xsl:if>
		</xsl:template>
	
		<xsl:template match="LEAF" mode="child">
			<xsl:call-template name="DisplayLeafs">
			<xsl:with-param name="winHref" select="@FNID"/>
                        <xsl:with-param name="cusFunc" select="@USER_FNID"/>
			<xsl:with-param name="finalRights" select="@RIGHTS"/>
			<xsl:with-param name="txnType" select="@TXNTYPE"/>
                        <xsl:with-param name="UIName" select="@UINAME"/>
                        <xsl:with-param name="criteria" select="@CRITERIA"/> <!--Added IF COndition By Fahad as part of IPFB Changes-->
                        <xsl:with-param name="search" select="@SEARCH"/> <!--Added IF COndition By Fahad as part of IPFB Changes-->
                        <xsl:with-param name="typeString" select="@TYPSTR"/> <!--Added IF COndition By Fahad as part of IPFB Changes-->                       
                        <xsl:with-param name="taskCount" select="@taskCount"/>         <!-- ctcb -->               
		    </xsl:call-template>
		</xsl:template>

</xsl:stylesheet>
