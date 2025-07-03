<?xml version ="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="/RAD_UDS_HDR">
		<xsl:variable name = "FunctionId" select = "TXT_PRODUCT_CODE"/>	
		<WFDEFN name="" functionId="{$FunctionId}">
			 <xsl:apply-templates select = "ONLINE_STAGE_MAINT_SE"/>
			 <xsl:apply-templates select = "OFFLINE_STAGE_MAINT_SE"/>
		</WFDEFN>
	</xsl:template>

	<!-- Online Handler -->
	<xsl:template match = "ONLINE_STAGE_MAINT_SE">
		<WORKFLOW method_type="Online" initiator="">
		 <DESC><xsl:value-of select = "TXT_WF_DESC"/></DESC>	
		  <xsl:apply-templates select = "ONLINE_STAGE_MAINT"/>	
		</WORKFLOW>
	</xsl:template>

	<!-- Online Stages Handler -->
	<xsl:template match = "ONLINE_STAGE_MAINT">
    <xsl:variable name="StgInclude" select = "TXT_INCLUDE"/> 
    <xsl:if test="$StgInclude = 'Y'">

          <xsl:variable name = "StgNum" select = "TXT_STG_NO"/>
          <STAGE NO="{$StgNum}">
              <TYPE>   <xsl:value-of select = "STG_TYPE"/>           </TYPE> 
              <DESC>   <xsl:value-of select = "TXT_STG_DESC"/>       </DESC> 
              <ACTION> <xsl:value-of select = "TXT_STG_ACTION"/>     </ACTION> 
              <ADVICE> <xsl:value-of select = "TXT_STG_ADV_XML"/>    </ADVICE> 
              <UIXML>  <xsl:value-of select = "TXT_STG_UI_XML"/>    </UIXML> 
              <REPLY_RES><xsl:value-of select = "SEL_REPLY_RES"/>   </REPLY_RES> 
               
               <xsl:variable name = "No_Suc_Codes" select = "count(ONLINE_RSNCODES[TXT_RCODETYPE ='Success'])"/>
               <xsl:variable name = "No_Override_Codes" select = "count(ONLINE_RSNCODES[TXT_RCODETYPE ='Override'])"/>
               <xsl:variable name = "No_Undo_Codes" select = "count(ONLINE_RSNCODES[TXT_RCODETYPE ='Undo'])"/>
               <xsl:variable name = "No_Failure_Codes" select = "count(ONLINE_RSNCODES[TXT_RCODETYPE ='Failure'])"/>
      
      
               <xsl:if test = "$No_Suc_Codes &gt; 0"> 
              <ONSUCCESS>
                <xsl:apply-templates select="ONLINE_RSNCODES[TXT_RCODETYPE ='Success']">
                </xsl:apply-templates>
              </ONSUCCESS>
                </xsl:if> 
               <xsl:if test = "$No_Override_Codes &gt; 0"> 
              <ONOVERRIDE>
                <xsl:apply-templates select="ONLINE_RSNCODES[TXT_RCODETYPE ='Override']">
                </xsl:apply-templates>
              </ONOVERRIDE>
                </xsl:if> 
               <xsl:if test = "$No_Undo_Codes &gt; 0"> 
              <ONUNDO>
                <xsl:apply-templates select="ONLINE_RSNCODES[TXT_RCODETYPE ='Undo']">
                </xsl:apply-templates>
              </ONUNDO>
                </xsl:if> 
               <xsl:if test = "$No_Suc_Codes &gt; 0"> 
              <ONFAILURE>
                <xsl:apply-templates select="ONLINE_RSNCODES[TXT_RCODETYPE ='Failure']">
                </xsl:apply-templates>
              </ONFAILURE>
                </xsl:if> 
               
          </STAGE>
          
    </xsl:if>              
	</xsl:template>

	<!-- Online  Reason Codes Handler -->
	<xsl:template match  = "ONLINE_RSNCODES">
		<xsl:variable name = "RsnCode" select = "TXT_REASONCODE"/>
		<xsl:variable name = "Action"  select = "SEL_ACTION"/>
		<xsl:variable name = "UserRoles" select =  "ONLINE_USERROLES"/>
		<xsl:variable name = "CustomAction" select = "TXT_CUST_ACTION"/>
    <xsl:variable name="RsnCodeInclude" select = "TXT_INCLUDE"/>
    <xsl:if test="$RsnCodeInclude = 'Y'">
            <!-- Note .. CustomAction Shud be trimmed out to remove blank string ... -->
            <REASON CODE="{$RsnCode}">
              <ACTION>
                   <xsl:if test = "$CustomAction != ''">
                  <xsl:value-of select = "$CustomAction"/>
                    </xsl:if>	
                   <xsl:if test = "$CustomAction = ''">
                  <xsl:value-of select = "$Action"/>
                    </xsl:if>	
        
                <xsl:if test = "$UserRoles != ''">
                  <xsl:value-of select = "'('"/>
                  
                  <xsl:for-each   select = "ONLINE_USERROLES">
                    <xsl:variable name = "User_Or_Role" select = "SEL_TYPE"/>
                    <xsl:variable name = "User" select = "TXT_USER"/>
                    <xsl:variable name = "Role" select = "TXT_ROLE"/>				
                    
                    <xsl:value-of select = "$User_Or_Role"/>
                    <xsl:value-of select = "'~'"/>
                    <xsl:if test = "$User != ''"> 
                      <xsl:value-of select = "$User"/>
                    </xsl:if>	
        
                    <xsl:if test = "$Role!= ''"> 
                      <xsl:value-of select = "$Role"/>
                    </xsl:if>
                    <xsl:if test = "position() != last()">
                      <xsl:value-of select = "','"/>
                    </xsl:if>
                    
                              
                  </xsl:for-each>
                  <xsl:value-of select = "')'"/>				
                </xsl:if>
              </ACTION>
              
              <xsl:if test = "$CustomAction != ''">
                <CUSTOM>Y</CUSTOM>
              </xsl:if>	
              <xsl:if test = "$CustomAction = ''">
                <CUSTOM>N</CUSTOM>
              </xsl:if>	

              <NEXTSTEP><xsl:value-of select = "SEL_NEXT_STEP"/></NEXTSTEP>
              <DESC><xsl:value-of select = "TXT_REASONDESC"/></DESC>
              <ACTION_DESC><xsl:value-of select = "SEL_ACTION_DESC"/></ACTION_DESC>      
            </REASON>		
        </xsl:if>    
	</xsl:template>


	<!-- Offline Handlers -->

	<!-- Offline Handler -->
	<xsl:template match = "OFFLINE_STAGE_MAINT_SE">
		<WORKFLOW method_type="Offline" initiator="">
		 <DESC><xsl:value-of select = "TXT_WF_DESC"/></DESC>	
		  <xsl:apply-templates select = "OFFLINE_STAGE_MAINT"/>	
		</WORKFLOW>
	</xsl:template>

	<!-- Offline Stages Handler -->
	<xsl:template match = "OFFLINE_STAGE_MAINT">
        <xsl:variable name="StgInclude" select = "TXT_INCLUDE_OFF"/>
        <xsl:if test="$StgInclude = 'Y'">
            <xsl:variable name = "StgNum" select = "TXT_STGNO_OFF"/>
            <STAGE NO="{$StgNum}">
                <TYPE>   <xsl:value-of select = "STG_TYPE_OFF"/>           </TYPE> 
                <DESC>   <xsl:value-of select = "TXT_STG_DESC_OFF"/>       </DESC> 
                <ACTION> <xsl:value-of select = "TXT_STG_ACTION_OFF"/>     </ACTION> 
                <ADVICE> <xsl:value-of select = "TXT_STG_ADV_XML_OFF"/>    </ADVICE> 
                <UIXML>  <xsl:value-of select = "TXT_STG_UI_XML_OFF"/>    </UIXML> 
                <REPLY_RES><xsl:value-of select = "SEL_REPLY_RES_OFF"/>   </REPLY_RES> 
                 
                 <xsl:variable name = "No_Suc_Codes" select = "count(OFFLINE_RSNCODES[TXT_RCODETYPE_OFF ='Success'])"/>
                 <xsl:variable name = "No_Override_Codes" select = "count(OFFLINE_RSNCODES[TXT_RCODETYPE_OFF ='Override'])"/>
                 <xsl:variable name = "No_Undo_Codes" select = "count(OFFLINE_RSNCODES[TXT_RCODETYPE_OFF ='Undo'])"/>
                 <xsl:variable name = "No_Failure_Codes" select = "count(OFFLINE_RSNCODES[TXT_RCODETYPE_OFF ='Failure'])"/>
        
        
                 <xsl:if test = "$No_Suc_Codes &gt; 0"> 
                <ONSUCCESS>
                  <xsl:apply-templates select="OFFLINE_RSNCODES[TXT_RCODETYPE_OFF ='Success']">
                  </xsl:apply-templates>
                </ONSUCCESS>
                  </xsl:if> 
                 <xsl:if test = "$No_Override_Codes &gt; 0"> 
                <ONOVERRIDE>
                  <xsl:apply-templates select="OFFLINE_RSNCODES[TXT_RCODETYPE_OFF ='Override']">
                  </xsl:apply-templates>
                </ONOVERRIDE>
                  </xsl:if> 
                 <xsl:if test = "$No_Undo_Codes &gt; 0"> 
                <ONUNDO>
                  <xsl:apply-templates select="OFFLINE_RSNCODES[TXT_RCODETYPE_OFF ='Undo']">
                  </xsl:apply-templates>
                </ONUNDO>
                  </xsl:if> 
                 <xsl:if test = "$No_Suc_Codes &gt; 0"> 
                <ONFAILURE>
                  <xsl:apply-templates select="OFFLINE_RSNCODES[TXT_RCODETYPE_OFF ='Failure']">
                  </xsl:apply-templates>
                </ONFAILURE>
                  </xsl:if> 
                 
            </STAGE>
    </xsl:if>            
            
	</xsl:template>

	<!-- Offline  Reason Codes Handler -->
	<xsl:template match  = "OFFLINE_RSNCODES">
		<xsl:variable name = "RsnCode" select = "TXT_REASONCODE_OFF"/>
		<xsl:variable name = "Action"  select = "SEL_ACTION_OFF"/>
		<xsl:variable name = "UserRoles" select =  "OFFLINE_USERROLES"/>
		<xsl:variable name = "CustomAction" select = "TXT_CUST_ACTION_OFF"/>
    <xsl:variable name = "RsnCodeInclude" select = "TXT_INCLUDE_OFF"/>
    <xsl:if test="$RsnCodeInclude = 'Y'">
    
            <REASON CODE="{$RsnCode}">
              <ACTION>
                  <!-- <xsl:value-of select = "$Action"/> -->
        
                  <xsl:if test = "$CustomAction != ''">
                    <xsl:value-of select = "$CustomAction"/>
                   </xsl:if>	
                   <xsl:if test = "$CustomAction = ''">
                      <xsl:value-of select = "$Action"/>
                   </xsl:if>	
                
                
                
                <xsl:if test = "$UserRoles != ''">
                  <xsl:value-of select = "'('"/>
                  
                  <xsl:for-each   select = "OFFLINE_USERROLES">
                    <xsl:variable name = "User_Or_Role" select = "SEL_TYPE_OFF"/>
                    <xsl:variable name = "User" select = "TXT_USER_OFF"/>
                    <xsl:variable name = "Role" select = "TXT_ROLE_OFF"/>				
                    
                    <xsl:value-of select = "$User_Or_Role"/>
                    <xsl:value-of select = "'~'"/>
                    <xsl:if test = "$User != ''"> 
                      <xsl:value-of select = "$User"/>
                    </xsl:if>	
        
                    <xsl:if test = "$Role!= ''"> 
                      <xsl:value-of select = "$Role"/>
                    </xsl:if>
        
                    <xsl:if test = "position() != last()">
                      <xsl:value-of select = "','"/>
                    </xsl:if>	
        
                              
                  </xsl:for-each>
                  <xsl:value-of select = "')'"/>				
                </xsl:if>
              </ACTION>
        
              <xsl:if test = "$CustomAction != ''">
                <CUSTOM>Y</CUSTOM>
              </xsl:if>	
              <xsl:if test = "$CustomAction = ''">
                <CUSTOM>N</CUSTOM>
              </xsl:if>	      
              <NEXTSTEP><xsl:value-of select = "SEL_NEXT_STEP_OFF"/></NEXTSTEP>
              <DESC><xsl:value-of select = "TXT_REASONDESC_OFF"/></DESC>
              <ACTION_DESC><xsl:value-of select = "SEL_ACTION_DESC_OFF"/></ACTION_DESC>
              
            </REASON>		
        </xsl:if>    
	</xsl:template>



</xsl:stylesheet>