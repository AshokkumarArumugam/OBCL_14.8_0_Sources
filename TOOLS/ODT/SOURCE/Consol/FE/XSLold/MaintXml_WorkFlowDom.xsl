<?xml version ="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
       <xsl:template match="/UDTMAINT">
              <RAD_UDS_HDR ID="1" Type="SINGLE">
                     <TXT_PRODUCT_CODE>
                            
                     </TXT_PRODUCT_CODE>
                     <xsl:apply-templates select="WORKFLOW_MAINT/WORKFLOW[@TYPE='Online']" mode ='Online' />
                     <xsl:apply-templates select="WORKFLOW_MAINT/WORKFLOW[@TYPE='Offline']" mode ='Offline' />
                     
              </RAD_UDS_HDR>
       </xsl:template>
       
       <xsl:template match="WORKFLOW_MAINT/WORKFLOW[@TYPE='Online']" mode ='Online' >
              <ONLINE_STAGE_MAINT_SE ID="{position()}" Type="SINGLE">
                     <TXT_WF_TYPE>Online</TXT_WF_TYPE>
                     <TXT_WF_DESC></TXT_WF_DESC>
                     <xsl:for-each select ="STAGES/STAGE[@INCLUDE = 'Y']">
                            <ONLINE_STAGE_MAINT ID="{position()}" TYPE="MULTIPLE">
                                   <TXT_STG_NO>
                                          <xsl:value-of select="position()"/>
                                   </TXT_STG_NO>
                                   <STG_TYPE>
                                          <xsl:value-of select="."/>
                                   </STG_TYPE>
                                   <TXT_STG_DESC>
                                          <xsl:value-of select="."/>
                                   </TXT_STG_DESC>
                                   <TXT_INCLUDE>
                                          <xsl:value-of select="@INCLUDE"/>
                                   </TXT_INCLUDE>
                                   <TXT_STG_ACTION>
                                   </TXT_STG_ACTION>
                                   <TXT_STG_ADV_XML>
                                   </TXT_STG_ADV_XML>
                                   <TXT_STG_UI_XML>
                                   </TXT_STG_UI_XML>
                                   <SEL_REPLY_RES>
                                   </SEL_REPLY_RES>                                           
                                   <xsl:for-each select ="//WORKFLOW[@TYPE='Online']/REASONCODES/REASON_CODE[@INCLUDE = 'Y']">                               
                                          <ONLINE_RSNCODES ID="{position()}"  TYPE="MULTIPLE">                                                        
                                                 <TXT_SNO_TAB>
                                                        <xsl:value-of select="position()"/>
                                                 </TXT_SNO_TAB>
                                                 <TXT_RCODETYPE>
                                                        <xsl:variable name="RsnCodeType1"
                                                       select="@type"/>
                                                        <xsl:if test="$RsnCodeType1 = 'S'">Success</xsl:if>
                                                        <xsl:if  test="$RsnCodeType1 = 'F'">Failure</xsl:if>
                                                        <xsl:if  test="$RsnCodeType1 = 'O'">Override</xsl:if>
                                                        <xsl:if  test="$RsnCodeType1 = 'U'">Undo</xsl:if>
                                                 </TXT_RCODETYPE>
                                    <TXT_REASONCODE>
                                          <xsl:value-of select="."/>
                                    </TXT_REASONCODE>
                                    <TXT_REASONDESC></TXT_REASONDESC>
                                    <TXT_INCLUDE>
                                          <xsl:value-of select="@INCLUDE"/>
                                    </TXT_INCLUDE>
                                    <TXT_CUST_ACTION></TXT_CUST_ACTION>
                                    <SEL_ACTION></SEL_ACTION>
                                    <SEL_NEXT_STEP></SEL_NEXT_STEP>                                                                               
                            </ONLINE_RSNCODES> 
                      </xsl:for-each>      
                </ONLINE_STAGE_MAINT>  
                </xsl:for-each>
            </ONLINE_STAGE_MAINT_SE>
       </xsl:template>         
         
       <xsl:template match="WORKFLOW_MAINT/WORKFLOW[@TYPE='Offline']"  mode ='Offline'> 
              <OFFLINE_STAGE_MAINT_SE ID="{position()}" Type="MULTIPLE">
                     <TXT_WF_TYPE>Offline</TXT_WF_TYPE>
                     <TXT_WF_DESC></TXT_WF_DESC>
                     <xsl:for-each select ="STAGES/STAGE[@INCLUDE = 'Y']">
                     <OFFLINE_STAGE_MAINT ID="{position()}"
                                  TYPE="MULTIPLE">
                     <TXT_STGNO_OFF>
                            <xsl:value-of select="position()"/>
                     </TXT_STGNO_OFF>
                     <STG_TYPE_OFF>
                            <xsl:value-of select="."/>
                     </STG_TYPE_OFF>
                     <TXT_STG_DESC_OFF>
                            <xsl:value-of select="."/>
                     </TXT_STG_DESC_OFF>
                     <TXT_INCLUDE_OFF>
                            <xsl:value-of select="@INCLUDE"/>
                     </TXT_INCLUDE_OFF> 
                     <TXT_STG_ACTION_OFF> </TXT_STG_ACTION_OFF> 
                     <TXT_STG_ADV_XML_OFF> </TXT_STG_ADV_XML_OFF>
                     <TXT_STG_UI_XML_OFF> </TXT_STG_UI_XML_OFF> 
                     <SEL_REPLY_RES_OFF>  </SEL_REPLY_RES_OFF>                      
                      <xsl:for-each select ="//WORKFLOW[@TYPE='Offline']/REASONCODES/REASON_CODE[@INCLUDE = 'Y']">                               
                            <OFFLINE_RSNCODES ID="{position()}"  TYPE="MULTIPLE">                                                            
                                   <TXT_SNO_OFF>
                                          <xsl:value-of select="position()"/>
                                    </TXT_SNO_OFF>
                                    <TXT_RCODETYPE_OFF>
                                          <xsl:variable name="RsnCodeType2"
                                                       select="@type"/>
                                          <xsl:if test="$RsnCodeType2 = 'S'">Success</xsl:if>
                                          <xsl:if  test="$RsnCodeType2 = 'F'">Failure</xsl:if>
                                          <xsl:if  test="$RsnCodeType2 = 'O'">Override</xsl:if>
                                          <xsl:if  test="$RsnCodeType2 = 'U'">Undo</xsl:if>
                                    </TXT_RCODETYPE_OFF>
                                    <TXT_REASONCODE_OFF>
                                          <xsl:value-of select="."/>
                                    </TXT_REASONCODE_OFF>
                                    <TXT_REASONDESC_OFF></TXT_REASONDESC_OFF>
                                    <TXT_INCLUDE_OFF>
                                          <xsl:value-of select="@INCLUDE"/>
                                    </TXT_INCLUDE_OFF>
                                    <TXT_CUST_ACTION_OFF></TXT_CUST_ACTION_OFF>
                                    <SEL_ACTION_OFF></SEL_ACTION_OFF>
                                    <SEL_NEXT_STEP_OFF></SEL_NEXT_STEP_OFF> 
                            </OFFLINE_RSNCODES>                      
                       </xsl:for-each>                        
                </OFFLINE_STAGE_MAINT>                   
              </xsl:for-each> 
            </OFFLINE_STAGE_MAINT_SE>
          </xsl:template>                
</xsl:stylesheet>
