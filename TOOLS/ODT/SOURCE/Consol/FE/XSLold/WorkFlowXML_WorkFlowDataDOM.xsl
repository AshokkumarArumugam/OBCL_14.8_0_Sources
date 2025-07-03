<?xml version ="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:template match="/WFDEFN">
		<RAD_UDS_HDR ID="1" Type="SINGLE">
			<TXT_PRODUCT_CODE><xsl:value-of select = "@functionId"/></TXT_PRODUCT_CODE>
			<xsl:apply-templates select = "WORKFLOW">
			</xsl:apply-templates>			
		</RAD_UDS_HDR>
	</xsl:template>

	<xsl:template match = "WORKFLOW">
		<xsl:variable name = "OnlineOrOffline"  select = "@method_type"/>
		<xsl:if test = "$OnlineOrOffline = 'Online'">
			<ONLINE_STAGE_MAINT_SE ID="1" Type="SINGLE">
				  <TXT_WF_TYPE>Online</TXT_WF_TYPE> 
				  <TXT_WF_DESC><xsl:value-of select = "DESC"/></TXT_WF_DESC> 
				  <xsl:apply-templates select = "STAGE" mode = "Online">	
				  </xsl:apply-templates>
			</ONLINE_STAGE_MAINT_SE>
		</xsl:if>
		<xsl:if test = "$OnlineOrOffline = 'Offline'">
			<OFFLINE_STAGE_MAINT_SE ID="1" Type="SINGLE">
				  <TXT_WF_TYPE>Offline</TXT_WF_TYPE> 
				  <TXT_WF_DESC><xsl:value-of select = "DESC"/></TXT_WF_DESC> 
				  <xsl:apply-templates select = "STAGE" mode = "Offline">	
				  </xsl:apply-templates>
			</OFFLINE_STAGE_MAINT_SE>
		</xsl:if>
	</xsl:template>

	<!-- Handle Online Stages -->
	<xsl:template  match = "STAGE" mode = "Online">
		<ONLINE_STAGE_MAINT ID = "{position()}" TYPE="MULTIPLE">
			 <TXT_STG_NO><xsl:value-of select = "@NO"/></TXT_STG_NO> 
			  <STG_TYPE><xsl:value-of select = "TYPE"/></STG_TYPE> 
			  <TXT_STG_DESC><xsl:value-of select = "DESC"/></TXT_STG_DESC> 
			  <TXT_INCLUDE>Y</TXT_INCLUDE> 
			  <TXT_STG_ACTION><xsl:value-of select = "ACTION"/></TXT_STG_ACTION> 
			  <TXT_STG_ADV_XML><xsl:value-of select = "ADVICE"/></TXT_STG_ADV_XML> 
			  <TXT_STG_UI_XML><xsl:value-of select = "UIXML"/></TXT_STG_UI_XML> 
			  <SEL_REPLY_RES><xsl:value-of select = "REPLY_RES"/></SEL_REPLY_RES> 

			  <xsl:apply-templates select = "./*/REASON" mode = "Online">
			  </xsl:apply-templates>			  
		</ONLINE_STAGE_MAINT>
	</xsl:template>

	<!-- Handle online reason Codes -->
	<xsl:template match = "REASON" mode = "Online">
		<xsl:variable name = "RsnCode" select = "substring-before(@CODE, '_')"/>
		
		<xsl:variable name = "RsnType">
			<xsl:if test = "$RsnCode = 'F'">
				<xsl:value-of select = "'Failure'"/>		
			</xsl:if>
			<xsl:if test = "$RsnCode = 'O'">
				<xsl:value-of select = "'Override'"/>		
			</xsl:if>
			<xsl:if test = "$RsnCode = 'U'">
				<xsl:value-of select = "'Undo'"/>		
			</xsl:if>
			<xsl:if test = "$RsnCode = 'S'">
				<xsl:value-of select = "'Success'"/>		
			</xsl:if>
		</xsl:variable>

		  <ONLINE_RSNCODES ID="{position()}" TYPE="MULTIPLE">
			  <TXT_SNO_TAB><xsl:value-of select = "position()"/> </TXT_SNO_TAB> 
			  <TXT_RCODETYPE><xsl:value-of select = "$RsnType"/></TXT_RCODETYPE> 
			  <TXT_REASONCODE><xsl:value-of select = "@CODE"/></TXT_REASONCODE> 
			  <TXT_REASONDESC><xsl:value-of select = "DESC"/></TXT_REASONDESC> 
			  <TXT_INCLUDE>Y</TXT_INCLUDE> 
        <SEL_ACTION_DESC><xsl:value-of select = "ACTION_DESC"/></SEL_ACTION_DESC>
			  <xsl:variable name = "CustomActionYN" select = "CUSTOM"/>
			  <xsl:variable name  = "Action" select = "ACTION"/>
			  <xsl:variable name = "LeftString" select = "substring-before($Action, '(')"/> 

			  <xsl:if test = "$CustomActionYN = 'Y'">
				  <xsl:if test = "$LeftString != ''">
					  <TXT_CUST_ACTION><xsl:value-of select = "$LeftString"/></TXT_CUST_ACTION> 			  
				  </xsl:if>	
				  <xsl:if test = "$LeftString = ''">
					  <TXT_CUST_ACTION><xsl:value-of select = "$Action"/></TXT_CUST_ACTION> 			  
				  </xsl:if>
          <SEL_ACTION_HIDDEN></SEL_ACTION_HIDDEN>
			  </xsl:if>
			  <xsl:if test = "$CustomActionYN = 'N'">			  
				  <TXT_CUST_ACTION></TXT_CUST_ACTION> 			  
			  </xsl:if>



			  <SEL_NEXT_STEP><xsl:value-of select = "NEXTSTEP"/></SEL_NEXT_STEP> 
			  <xsl:variable name = "strLen" select = "string-length($LeftString)"/>
			  <xsl:if test = "$strLen = 0">
			       <xsl:if test = "$CustomActionYN = 'N'">	
					<SEL_ACTION><xsl:value-of select = "$Action"/></SEL_ACTION>
           <SEL_ACTION_HIDDEN><xsl:value-of select = "$Action"/></SEL_ACTION_HIDDEN>
				</xsl:if>

			  </xsl:if>
			  <!-- has user Roles -->
			  <xsl:if test = "$strLen &gt; 0">
			       <xsl:if test = "$CustomActionYN = 'N'">	
					<SEL_ACTION><xsl:value-of select = "substring-before($Action, '(')"/></SEL_ACTION>
					<SEL_ACTION_HIDDEN><xsl:value-of select = "substring-before($Action, '(')"/></SEL_ACTION_HIDDEN>          
				</xsl:if>

			  </xsl:if>
			  
			   <xsl:variable name = "UserRolesTemp" select = "substring-after($Action, '(')"/>
			   <xsl:variable name = "commaSepStr" select = "substring-before($UserRolesTemp, ')')"/>

			<xsl:if test="substring-before($Action,'(') != ''">
				<!-- Call  User Roles Handler -->
				<xsl:call-template name="OnlineUserRoles">
					<xsl:with-param name="roles" select="$commaSepStr"/>
					<xsl:with-param name="id" select="1"/>
				</xsl:call-template>
			</xsl:if>	
			  
		</ONLINE_RSNCODES>		
	</xsl:template>


	<!-- Handle Online User Roles -->
	<xsl:template name="OnlineUserRoles">
		<xsl:param name="roles" select="."/>
		<xsl:param name="id" select="."/>

		<xsl:variable name="role" select="substring-before($roles,',')"/>	
		<xsl:if test="$role = ''">
			<ONLINE_USERROLES ID="{$id}" Type="MULTIPLE">
				 <xsl:variable name = "UserOrRole" select = "substring-before($roles,'~')"/>
				 <xsl:variable name = "UserOrRole_Value" select = "substring-after($roles,'~')"/>
				<TXT_Slno><xsl:value-of select="$id"/></TXT_Slno>				 
				 <xsl:if test = "$UserOrRole = 'R'">
					  <SEL_TYPE><xsl:value-of select = "'R'"/></SEL_TYPE> 
					  <TXT_USER></TXT_USER> 
					  <TXT_ROLE><xsl:value-of select = "$UserOrRole_Value"/></TXT_ROLE>
				 </xsl:if>
				 <xsl:if test = "$UserOrRole = 'U'">
					  <SEL_TYPE><xsl:value-of select = "'U'"/></SEL_TYPE> 
					  <TXT_USER><xsl:value-of select = "$UserOrRole_Value"/></TXT_USER> 
					  <TXT_ROLE></TXT_ROLE>
				 </xsl:if>				  

			</ONLINE_USERROLES>
		</xsl:if>
		<xsl:if test="$role != ''">			
			<ONLINE_USERROLES ID="{$id}" Type="MULTIPLE">
				 <xsl:variable name = "UserOrRole" select = "substring-before($role,'~')"/>
				 <xsl:variable name = "UserOrRole_Value" select = "substring-after($role,'~')"/>					
				<TXT_Slno><xsl:value-of select="$id"/></TXT_Slno>
				 <xsl:if test = "$UserOrRole = 'R'">
					  <SEL_TYPE><xsl:value-of select = "'R'"/></SEL_TYPE> 
					  <TXT_USER></TXT_USER> 
					  <TXT_ROLE><xsl:value-of select = "$UserOrRole_Value"/></TXT_ROLE>
				 </xsl:if>
				 <xsl:if test = "$UserOrRole = 'U'">
					  <SEL_TYPE><xsl:value-of select = "'U'"/></SEL_TYPE> 
					  <TXT_USER><xsl:value-of select = "$UserOrRole_Value"/></TXT_USER> 
					  <TXT_ROLE></TXT_ROLE>
				 </xsl:if>
			</ONLINE_USERROLES>
			<xsl:variable name="role2" select="substring-after($roles,',')"/>
			<xsl:call-template name="OnlineUserRoles">
				<xsl:with-param name="roles" select="$role2"/>
				<xsl:with-param name="id" select="$id+1"/>
			</xsl:call-template>
		</xsl:if>
	</xsl:template>


<!-- Offline Handlers -->
	<!-- Handle Online Stages -->
	<xsl:template  match = "STAGE" mode = "Offline">
		<OFFLINE_STAGE_MAINT ID = "{position()}" TYPE="MULTIPLE">
			 <TXT_STGNO_OFF><xsl:value-of select = "@NO"/></TXT_STGNO_OFF> 
			  <STG_TYPE_OFF><xsl:value-of select = "TYPE"/></STG_TYPE_OFF> 
			  <TXT_STG_DESC_OFF><xsl:value-of select = "DESC"/></TXT_STG_DESC_OFF> 
			  <TXT_INCLUDE_OFF>Y</TXT_INCLUDE_OFF> 
			  <TXT_STG_ACTION_OFF><xsl:value-of select = "ACTION"/></TXT_STG_ACTION_OFF> 
			  <TXT_STG_ADV_XML_OFF><xsl:value-of select = "ADVICE"/></TXT_STG_ADV_XML_OFF> 
			  <TXT_STG_UI_XML_OFF><xsl:value-of select = "UIXML"/></TXT_STG_UI_XML_OFF> 
			  <SEL_REPLY_RES_OFF><xsl:value-of select = "REPLY_RES"/></SEL_REPLY_RES_OFF> 

			  <xsl:apply-templates select = "./*/REASON" mode = "Offline">
			  </xsl:apply-templates>			  
		</OFFLINE_STAGE_MAINT>
	</xsl:template>

	<!-- Handle Offline reason Codes -->
	<xsl:template match = "REASON" mode = "Offline">
		<xsl:variable name = "RsnCode" select = "substring-before(@CODE, '_')"/>
		
		<xsl:variable name = "RsnType">
			<xsl:if test = "$RsnCode = 'F'">
				<xsl:value-of select = "'Failure'"/>		
			</xsl:if>
			<xsl:if test = "$RsnCode = 'O'">
				<xsl:value-of select = "'Override'"/>		
			</xsl:if>
			<xsl:if test = "$RsnCode = 'U'">
				<xsl:value-of select = "'Undo'"/>		
			</xsl:if>
			<xsl:if test = "$RsnCode = 'S'">
				<xsl:value-of select = "'Success'"/>		
			</xsl:if>
		</xsl:variable>

		  <OFFLINE_RSNCODES ID="{position()}" TYPE="MULTIPLE">
			  <TXT_SNO_OFF><xsl:value-of select = "position()"/> </TXT_SNO_OFF> 
			  <TXT_RCODETYPE_OFF><xsl:value-of select = "$RsnType"/></TXT_RCODETYPE_OFF> 
			  <TXT_REASONCODE_OFF><xsl:value-of select = "@CODE"/></TXT_REASONCODE_OFF> 
			  <TXT_REASONDESC_OFF><xsl:value-of select = "DESC"/></TXT_REASONDESC_OFF> 
        <SEL_ACTION_DESC_OFF><xsl:value-of select = "ACTION_DESC"/></SEL_ACTION_DESC_OFF>
			  <TXT_INCLUDE_OFF>Y</TXT_INCLUDE_OFF> 
			  <xsl:variable name  = "Action" select = "ACTION"/>
			  <xsl:variable name = "LeftString" select = "substring-before($Action, '(')"/> 
			  <xsl:variable name = "strLen" select = "string-length($LeftString)"/>
			  <xsl:variable name = "CustomActionYN" select = "CUSTOM"/>
			  <xsl:if test = "$CustomActionYN = 'Y'">
        
         <SEL_ACTION_HIDDEN_OFF></SEL_ACTION_HIDDEN_OFF>
				  <xsl:if test = "$LeftString != ''">
					  <TXT_CUST_ACTION_OFF><xsl:value-of select = "$LeftString"/></TXT_CUST_ACTION_OFF> 			  
				  </xsl:if>	
				  <xsl:if test = "$LeftString = ''">
					  <TXT_CUST_ACTION_OFF><xsl:value-of select = "$Action"/></TXT_CUST_ACTION_OFF> 			  
				  </xsl:if>	
			  </xsl:if>
			  <xsl:if test = "$CustomActionYN = 'N'">			  
				  <TXT_CUST_ACTION_OFF></TXT_CUST_ACTION_OFF> 			  
			  </xsl:if>

			  
			  <SEL_NEXT_STEP_OFF><xsl:value-of select = "NEXTSTEP"/></SEL_NEXT_STEP_OFF> 

			  <xsl:if test = "$strLen = 0">
				  <xsl:if test = "$CustomActionYN = 'N'">			  
					<SEL_ACTION_OFF><xsl:value-of select = "$Action"/></SEL_ACTION_OFF>
          <SEL_ACTION_HIDDEN_OFF><xsl:value-of select = "$Action"/></SEL_ACTION_HIDDEN_OFF>          
				  </xsl:if>	
			  </xsl:if>
			  <!-- has user Roles -->
			  <xsl:if test = "$strLen &gt; 0">
				  <xsl:if test = "$CustomActionYN = 'N'">			  
					<SEL_ACTION_OFF><xsl:value-of select = "substring-before($Action, '(')"/></SEL_ACTION_OFF>
					<SEL_ACTION_HIDDEN_OFF><xsl:value-of select = "substring-before($Action, '(')"/></SEL_ACTION_HIDDEN_OFF>
          
				  </xsl:if>	
			  </xsl:if>
			  
			   <xsl:variable name = "UserRolesTemp" select = "substring-after($Action, '(')"/>
			   <xsl:variable name = "commaSepStr" select = "substring-before($UserRolesTemp, ')')"/>

			<xsl:if test="substring-before($Action,'(') != ''">
				<!-- Call  User Roles Handler -->
				<xsl:call-template name="OfflineUserRoles">
					<xsl:with-param name="roles" select="$commaSepStr"/>
					<xsl:with-param name="id" select="1"/>
				</xsl:call-template>
			</xsl:if>	
			  
		</OFFLINE_RSNCODES>		
	</xsl:template>
  
  
  
	<!-- Handle Offline User Roles -->
	<xsl:template name="OfflineUserRoles">
		<xsl:param name="roles" select="."/>
		<xsl:param name="id" select="."/>

		<xsl:variable name="role" select="substring-before($roles,',')"/>	
		<xsl:if test="$role = ''">
			<OFFLINE_USERROLES ID="{$id}" Type="MULTIPLE">
				 <xsl:variable name = "UserOrRole" select = "substring-before($roles,'~')"/>
				 <xsl:variable name = "UserOrRole_Value" select = "substring-after($roles,'~')"/>
				<TXT_Slno><xsl:value-of select="$id"/></TXT_Slno>				 
				 <xsl:if test = "$UserOrRole = 'R'">
					  <SEL_TYPE><xsl:value-of select = "'R'"/></SEL_TYPE> 
					  <TXT_USER></TXT_USER> 
					  <TXT_ROLE><xsl:value-of select = "$UserOrRole_Value"/></TXT_ROLE>
				 </xsl:if>
				 <xsl:if test = "$UserOrRole = 'U'">
					  <SEL_TYPE><xsl:value-of select = "'U'"/></SEL_TYPE> 
					  <TXT_USER><xsl:value-of select = "$UserOrRole_Value"/></TXT_USER> 
					  <TXT_ROLE></TXT_ROLE>
				 </xsl:if>				  

			</OFFLINE_USERROLES>
		</xsl:if>
		<xsl:if test="$role != ''">			
			<OFFLINE_USERROLES ID="{$id}" Type="MULTIPLE">
				 <xsl:variable name = "UserOrRole" select = "substring-before($role,'~')"/>
				 <xsl:variable name = "UserOrRole_Value" select = "substring-after($role,'~')"/>					
				<TXT_Slno_USER><xsl:value-of select="$id"/></TXT_Slno_USER>
				 <xsl:if test = "$UserOrRole = 'R'">
					  <SEL_TYPE_OFF><xsl:value-of select = "'R'"/></SEL_TYPE_OFF> 
					  <TXT_USER_OFF></TXT_USER_OFF> 
					  <TXT_ROLE_OFF><xsl:value-of select = "$UserOrRole_Value"/></TXT_ROLE_OFF>
				 </xsl:if>
				 <xsl:if test = "$UserOrRole = 'U'">
					  <SEL_TYPE_OFF><xsl:value-of select = "'U'"/></SEL_TYPE_OFF> 
					  <TXT_USER_OFF><xsl:value-of select = "$UserOrRole_Value"/></TXT_USER_OFF> 
					  <TXT_ROLE_OFF></TXT_ROLE_OFF>
				 </xsl:if>
			</OFFLINE_USERROLES>
			<xsl:variable name="role2" select="substring-after($roles,',')"/>
			<xsl:call-template name="OfflineUserRoles">
				<xsl:with-param name="roles" select="$role2"/>
				<xsl:with-param name="id" select="$id+1"/>
			</xsl:call-template>
		</xsl:if>
	</xsl:template>
  
  

</xsl:stylesheet>