<?xml version ="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:str="http://www.w3.org/1999/XSL/Transform">
  <xsl:param name="MasterXmlName"/>  
  <!--<xsl:param name="l_ModCode"/>                -->
   <xsl:template match="/"> 
    <LABELS_MAIN ID="1" TYPE="SINGLE">
      <TXT_LANGUAGE>
        <xsl:value-of select="@LANG"/>
      </TXT_LANGUAGE>
      <xsl:apply-templates select="//COMMONS"/>
       <xsl:apply-templates select="//LABELS_MODULE"/> 
           
        <xsl:variable name = "Mcode" select = "//MODULE/@ID"/>
        <xsl:variable name = "MXmlName" select = "//MODULE/MASTERXML/@ID"/>

      <xsl:for-each select="//MODULE/MASTERXML/FUNCTION">
          <xsl:variable name = "Fid" select = "@ID"/>                 
          <CUSTOMLABELS ID="{position()}" Type="MULTIPLE">
              <TXT_SLNO><xsl:value-of select="position()"/></TXT_SLNO>	           
              <TXT_MODULE_ID><xsl:value-of select="$Mcode"/></TXT_MODULE_ID> 
              <TXT_MASTERXML_NAME><xsl:value-of select="$MXmlName"/></TXT_MASTERXML_NAME> 
              <TXT_FUNCTIONID><xsl:value-of select="$Fid"/></TXT_FUNCTIONID>
              
              <xsl:call-template name = "CustomLabels">
                <xsl:with-param name = "FunctionId" select = "$Fid"/>            
              </xsl:call-template>
           </CUSTOMLABELS>
                 
      </xsl:for-each>
      
    </LABELS_MAIN>
  </xsl:template>
  
  <xsl:template name = "CustomLabels">
    <xsl:param name = "FunctionId" select = "."/>

    <xsl:for-each select = "//FUNCTION[@ID = $FunctionId]/CUSTOM">

        <LBL_VALUE ID="{position()}" Type="MULTIPLE">
        <TXT_SLNO><xsl:value-of select = "position()"/></TXT_SLNO> 
        <TXT_LABELID><xsl:value-of select = "@LABELID"/></TXT_LABELID> 
        
        <TXT_DEFLABEL>
              <!--<xsl:call-template name="str:replace">
                <xsl:with-param name="text">
                  <xsl:value-of select="@ID"/>
                </xsl:with-param>
              </xsl:call-template>-->
              <xsl:value-of select = "."/>
         </TXT_DEFLABEL>
        <TXT_LABELVAL></TXT_LABELVAL> 
        </LBL_VALUE>
       </xsl:for-each> 
  </xsl:template>
  
  <xsl:template match="COMMONS">
    <COMMONS ID="{@ID}" Type="MULTIPLE">
      <TXT_SLNO>
        <xsl:value-of select="position()"/>
      </TXT_SLNO>
      <TXT_LABELID>
        <xsl:value-of select="@LABELID"/>
      </TXT_LABELID>
      <TXT_LABELVALUE></TXT_LABELVALUE>
      
       <TXT_DEFVALUE>
              <xsl:value-of select="."/> 
              <!--<xsl:call-template name="str:replace">
                <xsl:with-param name="text">
                  <xsl:value-of select="@LABELID"/>
                </xsl:with-param>
              </xsl:call-template>-->
         </TXT_DEFVALUE>
      
      
    </COMMONS>
  </xsl:template>
  <xsl:template match="CUSTOM/LABELID">
    <xsl:param name="parent" select="."/>
    <CUSTOMLABELS Type="MULTIPLE">
      <TXT_SLNO>
        <xsl:value-of select="1"/>
      </TXT_SLNO>
      <TXT_FUNCTIONID>
        <xsl:value-of select="$parent/@FUNCTIONID"/>
      </TXT_FUNCTIONID>
      <TXT_LABELID>
        <xsl:value-of select="@ID"/>
      </TXT_LABELID>
      <TXT_LABELVALUE><!--<xsl:value-of select="."/>--></TXT_LABELVALUE>
      <TXT_DEFVALUE>
        <xsl:value-of select="."/>
      </TXT_DEFVALUE>
      <!-- </xsl:for-each>  -->
    </CUSTOMLABELS>
  </xsl:template>
  
  <xsl:template match="COMMONS">
    <COMMONS ID="{@ID}" Type="MULTIPLE">
      <TXT_SLNO>
        <xsl:value-of select="position()"/>
      </TXT_SLNO>
      <TXT_LABELID>
        <xsl:value-of select="@LABELID"/>
      </TXT_LABELID>
      <TXT_LABELVALUE></TXT_LABELVALUE>
      
       <TXT_DEFVALUE>
              <xsl:value-of select="."/>
              <!--<xsl:call-template name="str:replace">
                <xsl:with-param name="text">
                  <xsl:value-of select="@LABELID"/>
                </xsl:with-param>
              </xsl:call-template>-->
         </TXT_DEFVALUE>
      
      
    </COMMONS>
  </xsl:template>
   <xsl:template match="LABELS_MODULE">      
    <MODULE_DETAILS ID="{position()}" Type="MULTIPLE">
      <TXT_SLNO>
        <xsl:value-of select="position()"/>
      </TXT_SLNO>
      <TXT_MODULE_CODE>
        <xsl:value-of select="@MODULE_CODE"/>
      </TXT_MODULE_CODE>
      <TXT_MODULE_NAME>
           <xsl:value-of select="MODULE_NAME"/>
      <!--  <xsl:value-of select="substring($MasterXmlName,1,string-length($MasterXmlName)-2)"/> -->
      </TXT_MODULE_NAME>
      <!-- <xsl:variable name="moduleId" select="@MODULE_CODE"/> -->
       <xsl:variable name="moduleIdTemp" select="@MODULE_CODE"/> 
       
       <xsl:variable name="moduleId">
          <xsl:if test = "$moduleIdTemp != ''">
            <xsl:value-of select = "concat($moduleIdTemp , '__')"/>                        
          </xsl:if>
          <xsl:if test = "$moduleIdTemp = ''">
            <xsl:value-of select = "''"/>
          </xsl:if>          
       </xsl:variable>
       
       
      <xsl:apply-templates select="SCREEN">
        <xsl:with-param name="moduleId">
          <!-- <xsl:value-of select="@MODULE_CODE"/> -->
          <xsl:value-of select="$moduleId"/>          
        </xsl:with-param>
      </xsl:apply-templates>
      <xsl:apply-templates select="BLOCK[@ID !='BLK_STDBUTTONS' and @ID !='BLK_CST_BUTTONS']">
        <xsl:with-param name="moduleId">
          <!-- <xsl:value-of select="@MODULE_CODE"/> -->
          <xsl:value-of select="$moduleId"/>                    
        </xsl:with-param>
      </xsl:apply-templates>
      <xsl:for-each select="SCREEN">
        <xsl:variable name="scrId" select="@NAME"/>
        <STANDARDBUTTONS ID="{position()}" TYPE="MULTIPLE">
          <TXT_SEQ_NO>
            <xsl:value-of select="position()"/>
          </TXT_SEQ_NO>
          <TXT_SCR_NAME>
            <xsl:value-of select="$scrId"/>
          </TXT_SCR_NAME>
          <xsl:for-each select="//BLOCK[@SCREEN=$scrId and (@ID = 'BLK_STDBUTTONS' or @ID ='BLK_CST_BUTTONS')]">
            <xsl:if test="@ID='BLK_STDBUTTONS' and count(FIELD) &gt; 0">
              <xsl:for-each select="FIELD">
                <STDBUTTONS ID="{position()}" TYPE="MULTIPLE">
                  <xsl:variable name="stdBtnLbl-case">
                    <xsl:call-template name="str:to-lower">
                      <xsl:with-param name="text">
                        <xsl:value-of select="concat('LBL__',$moduleId, $MasterXmlName ,$scrId,'__',@NAME)"/>
                      </xsl:with-param>
                    </xsl:call-template>
                  </xsl:variable>
                  <TXT_SEQUENCE_NO>
                    <xsl:value-of select="position()"/>
                  </TXT_SEQUENCE_NO>
                  <TXT_BTN_NAME>
                    <xsl:value-of select="@NAME"/>
                  </TXT_BTN_NAME>
                  <xsl:if test="LABEL/@ID = ''">
                    <TXT_BTN_LBLID>
                      <xsl:value-of select="$stdBtnLbl-case"/>
                    </TXT_BTN_LBLID>
         <TXT_DEFVALUE>
              <xsl:value-of select="LABEL"/>
              <!--<xsl:call-template name="str:replace">
                <xsl:with-param name="text">
                  <xsl:value-of select="@NAME"/>
                </xsl:with-param>
              </xsl:call-template>-->
         </TXT_DEFVALUE>
                    <TXT_BTN_LBLVAL></TXT_BTN_LBLVAL>
                  </xsl:if>
                  <xsl:if test="LABEL/@ID != ''">
                    <TXT_BTN_LBLID>
                      <xsl:value-of select="LABEL/@ID"/>
                    </TXT_BTN_LBLID>
                    <!-- select from the commons !-->
                    <xsl:variable name="LblValue">
                      <xsl:call-template name="str:CommonLabel">
                        <xsl:with-param name="LabelId">
                          <xsl:value-of select="LABEL/@ID"/>
                        </xsl:with-param>
                      </xsl:call-template>
                    </xsl:variable>
                    <TXT_BTN_LBLVAL></TXT_BTN_LBLVAL>
         <TXT_DEFVALUE>
                     <xsl:value-of select="$LblValue"/>
              <!--<xsl:call-template name="str:replace">
                <xsl:with-param name="text">
                  <xsl:value-of select="@NAME"/>
                </xsl:with-param>
              </xsl:call-template>-->
         </TXT_DEFVALUE>
                  </xsl:if>
                </STDBUTTONS>
              </xsl:for-each>
            </xsl:if>
            <xsl:if test="@ID='BLK_CST_BUTTONS' and count(FIELD) &gt; 0">
              <xsl:for-each select="FIELD">
                <CSTBUTTONS ID="{position()}" TYPE="MULTIPLE">
                  <xsl:variable name="stdBtnLbl-case">
                    <xsl:call-template name="str:to-lower">
                      <xsl:with-param name="text">
                        <xsl:value-of select="concat('LBL__',$moduleId, $MasterXmlName ,$scrId,'__',@NAME)"/>
                      </xsl:with-param>
                    </xsl:call-template>
                  </xsl:variable>
                  <TXT_SEQUENCE_NO>
                    <xsl:value-of select="position()"/>
                  </TXT_SEQUENCE_NO>
                  <TXT_BTN_NAME>
                    <xsl:value-of select="@NAME"/>
                  </TXT_BTN_NAME>
                  <xsl:if test="LABEL/@ID = ''">
                    <TXT_BTN_LBLID>
                      <xsl:value-of select="$stdBtnLbl-case"/>
                    </TXT_BTN_LBLID>
                     <TXT_DEFVALUE>
                             <xsl:value-of select="LABEL"/>
                             <!--<xsl:call-template name="str:replace">
                             <xsl:with-param name="text">
                              <xsl:value-of select="@NAME"/>
                            </xsl:with-param>
                           </xsl:call-template>-->
                       </TXT_DEFVALUE>
                    <TXT_BTN_LBLVAL></TXT_BTN_LBLVAL>
                  </xsl:if>
                  <xsl:if test="LABEL/@ID != ''">
                    <TXT_BTN_LBLID>
                      <xsl:value-of select="LABEL/@ID"/>
                    </TXT_BTN_LBLID>
                    <xsl:variable name="LblValue">
                      <xsl:call-template name="str:CommonLabel">
                        <xsl:with-param name="LabelId">
                          <xsl:value-of select="LABEL/@ID"/>
                        </xsl:with-param>
                      </xsl:call-template>
                    </xsl:variable>
                    <TXT_BTN_LBLVAL></TXT_BTN_LBLVAL>
                     <TXT_DEFVALUE>
                             <xsl:value-of select="$LblValue"/>
                             <!--<xsl:call-template name="str:replace">
                             <xsl:with-param name="text">
                              <xsl:value-of select="@NAME"/>
                            </xsl:with-param>
                           </xsl:call-template>-->
                       </TXT_DEFVALUE>
                  </xsl:if>
                </CSTBUTTONS>
              </xsl:for-each>
            </xsl:if>
          </xsl:for-each>
        </STANDARDBUTTONS>
      </xsl:for-each>
      <xsl:apply-templates select="WORKFLOW">
        <xsl:with-param name="moduleId">
         <!--  <xsl:value-of select="@MODULE_CODE"/> -->
         <xsl:value-of select="$moduleId"/>         
        </xsl:with-param>
      </xsl:apply-templates>
    </MODULE_DETAILS>
  </xsl:template>
  <xsl:template name="str:CommonLabel">
    <xsl:param name="LabelId" select="."/>
    <xsl:variable name="common_lbl" select="//COMMONS[@LABELID = $LabelId]"/>
    <xsl:if test="$common_lbl != ''">
      <xsl:value-of select="$common_lbl"/>
    </xsl:if>
    <xsl:if test="count(//COMMONS[@LABELID = $LabelId]) = 0">
      <xsl:value-of select="LABEL"/>
    </xsl:if>
  </xsl:template>
  <xsl:template match="WORKFLOW">
    <xsl:param name="moduleId" select="."/>
    <xsl:variable name="WfType" select="@TYPE"/>
    <xsl:variable name="WfType-case">
      <xsl:call-template name="str:to-lower">
        <xsl:with-param name="text">
          <xsl:value-of select="concat('LBL__',$moduleId, $MasterXmlName ,$WfType)"/>
        </xsl:with-param>
      </xsl:call-template>
    </xsl:variable>
    <WORKFLOW ID="{position()}" TYPE="MULTIPLE">
      <TXT_SEQ_NO>
        <xsl:value-of select="position()"/>
      </TXT_SEQ_NO>
      <TXT_WF_TYPE>
        <xsl:value-of select="$WfType"/>
      </TXT_WF_TYPE>
      <xsl:if test="LABEL/@ID = ''">
        <TXT_LBLID>
          <xsl:value-of select="$WfType-case"/>
        </TXT_LBLID>
        <TXT_LBLVAL></TXT_LBLVAL>
        <TXT_DEFVALUE>
          <xsl:value-of select="LABEL"/>
          <!--<xsl:call-template name="str:replace">
            <xsl:with-param name="text">
              <xsl:value-of select="$WfType"/>
            </xsl:with-param>
          </xsl:call-template>-->
        </TXT_DEFVALUE>
      </xsl:if>
      <xsl:if test="LABEL/@ID != ''">
        <xsl:variable name="LblValue">
          <xsl:call-template name="str:CommonLabel">
            <xsl:with-param name="LabelId">
              <xsl:value-of select="LABEL/@ID"/>
            </xsl:with-param>
          </xsl:call-template>
        </xsl:variable>
        <TXT_LBLID>
          <xsl:value-of select="LABEL/@ID"/>
        </TXT_LBLID>
        <TXT_LBLVAL></TXT_LBLVAL>
        <TXT_DEFVALUE>
          <xsl:value-of select="$LblValue"/>
          <!--<xsl:call-template name="str:replace">
            <xsl:with-param name="text">
              <xsl:value-of select="$WfType"/>
            </xsl:with-param>
          </xsl:call-template>-->
        </TXT_DEFVALUE>
      </xsl:if>
      <xsl:for-each select="STGDESC">
        <xsl:variable name="StgType" select="@TYPE"/>
        <xsl:variable name="StgType-case">
          <xsl:call-template name="str:to-lower">
            <xsl:with-param name="text">
              <xsl:value-of select="concat('LBL__',$moduleId, $MasterXmlName ,$WfType,'__',$StgType)"/>
            </xsl:with-param>
          </xsl:call-template>
        </xsl:variable>
        <STGDESC ID="{position()}" TYPE="MULTIPLE">
          <TXT_SEQ_NO>
            <xsl:value-of select="position()"/>
          </TXT_SEQ_NO>
          <TXT_STG_TYPE>
            <xsl:value-of select="$StgType"/>
          </TXT_STG_TYPE>
          <xsl:if test="LABEL/@ID = ''">
            <TXT_LABELID>
              <xsl:value-of select="$StgType-case"/>
            </TXT_LABELID>
            <TXT_LABELVALUE></TXT_LABELVALUE>
            <TXT_DEFVALUE>
              <xsl:value-of select="LABEL"/>
              <!--<xsl:call-template name="str:replace">
                <xsl:with-param name="text">
                  <xsl:value-of select="$StgType"/>
                </xsl:with-param>
              </xsl:call-template>-->
            </TXT_DEFVALUE>
          </xsl:if>
          <xsl:if test="LABEL/@ID != ''">
            <xsl:variable name="LblValue">
              <xsl:call-template name="str:CommonLabel">
                <xsl:with-param name="LabelId">
                  <xsl:value-of select="LABEL/@ID"/>
                </xsl:with-param>
              </xsl:call-template>
            </xsl:variable>
            <TXT_LABELID>
              <xsl:value-of select="LABEL/@ID"/>
            </TXT_LABELID>
            <TXT_LABELVALUE></TXT_LABELVALUE>
            <TXT_DEFVALUE>
              <xsl:value-of select="$LblValue"/>
              <!--<xsl:call-template name="str:replace">
                <xsl:with-param name="text">
                  <xsl:value-of select="$StgType"/>
                </xsl:with-param>
              </xsl:call-template>-->
            </TXT_DEFVALUE>
          </xsl:if>
        </STGDESC>
      </xsl:for-each>
      <xsl:for-each select="RSNCODEMNT">
        <xsl:variable name="RsnCode" select="@TYPE"/>
        <xsl:variable name="RsnType-case">
          <xsl:call-template name="str:to-lower">
            <xsl:with-param name="text">
              <xsl:value-of select="concat('LBL__',$moduleId, $MasterXmlName ,$WfType,'__',$RsnCode)"/>
            </xsl:with-param>
          </xsl:call-template>
        </xsl:variable>
        <RSNCODEMNT ID="{position()}" TYPE="MULTIPLE">
          <TXT_RSNCODE_SNO>
            <xsl:value-of select="position()"/>
          </TXT_RSNCODE_SNO>
          <TXT_RSNCODE>
            <xsl:value-of select="$RsnCode"/>
          </TXT_RSNCODE>
          <xsl:if test="LABEL/@ID = ''">
            <TXT_LABELID>
              <xsl:value-of select="$RsnType-case"/>
            </TXT_LABELID>
            <TXT_LABELVALUE></TXT_LABELVALUE>
            <TXT_DEFVALUE>
              <xsl:value-of select="LABEL"/>
              <!--<xsl:call-template name="str:replace">
                <xsl:with-param name="text">
                  <xsl:value-of select="$RsnCode"/>
                </xsl:with-param>
              </xsl:call-template>-->
            </TXT_DEFVALUE>
          </xsl:if>
          <xsl:if test="LABEL/@ID != ''">
            <xsl:variable name="LblValue">
              <xsl:call-template name="str:CommonLabel">
                <xsl:with-param name="LabelId">
                  <xsl:value-of select="LABEL/@ID"/>
                </xsl:with-param>
              </xsl:call-template>
            </xsl:variable>
            <TXT_LABELID>
              <xsl:value-of select="LABEL/@ID"/>
            </TXT_LABELID>
            <TXT_LABELVALUE></TXT_LABELVALUE>
            <TXT_DEFVALUE>
              <xsl:value-of select="$LblValue"/>
              <!--<xsl:call-template name="str:replace">
                <xsl:with-param name="text">
                  <xsl:value-of select="$RsnCode"/>
                </xsl:with-param>
              </xsl:call-template>-->
            </TXT_DEFVALUE>
          </xsl:if>
        </RSNCODEMNT>
      </xsl:for-each>
      <xsl:for-each select="WFACTION">
        <xsl:variable name="ActCode" select="@TYPE"/>
        <xsl:variable name="ActCode-case">
          <xsl:call-template name="str:to-lower">
            <xsl:with-param name="text">
              <xsl:value-of select="concat('LBL__',$moduleId, $MasterXmlName , $WfType,'__',$ActCode)"/>
            </xsl:with-param>
          </xsl:call-template>
        </xsl:variable>
        <WFACTION ID="{position()}" TYPE="MULTIPLE">
          <TXT_ACTION_SNO>
            <xsl:value-of select="position()"/>
          </TXT_ACTION_SNO>
          <TXT_ACTCODE>
            <xsl:value-of select="$ActCode"/>
          </TXT_ACTCODE>
          <xsl:if test="LABEL/@ID = ''">
            <TXT_LABELID>
              <xsl:value-of select="$ActCode-case"/>
            </TXT_LABELID>
            <TXT_LABELVALUE></TXT_LABELVALUE>
            <TXT_DEFVALUE>
              <xsl:value-of select="LABEL"/>
              <!--<xsl:call-template name="str:replace">
                <xsl:with-param name="text">
                  <xsl:value-of select="$ActCode"/>
                </xsl:with-param>
              </xsl:call-template>-->
            </TXT_DEFVALUE>
          </xsl:if>
          <xsl:if test="LABEL/@ID != ''">
            <xsl:variable name="LblValue">
              <xsl:call-template name="str:CommonLabel">
                <xsl:with-param name="LabelId">
                  <xsl:value-of select="LABEL/@ID"/>
                </xsl:with-param>
              </xsl:call-template>
            </xsl:variable>
            <TXT_LABELID>
              <xsl:value-of select="LABEL/@ID"/>
            </TXT_LABELID>
            <TXT_LABELVALUE></TXT_LABELVALUE>
            <TXT_DEFVALUE>
              <xsl:value-of select="$LblValue"/>
              <!--<xsl:call-template name="str:replace">
                <xsl:with-param name="text">
                  <xsl:value-of select="$ActCode"/>
                </xsl:with-param>
              </xsl:call-template>-->
            </TXT_DEFVALUE>
          </xsl:if>
        </WFACTION>
      </xsl:for-each>
    </WORKFLOW>
  </xsl:template>
  <xsl:template match="SCREEN">
    <xsl:param name="moduleId" select="."/>
    <xsl:variable name="scrId" select="@NAME"/>
    <xsl:variable name="scrId-case">
      <xsl:call-template name="str:to-lower">
        <xsl:with-param name="text">
          <xsl:value-of select="concat('LBL__',$moduleId, $MasterXmlName ,@NAME)"/>
        </xsl:with-param>
      </xsl:call-template>
    </xsl:variable>
    <SCREENS ID="{position()}" TYPE="MULTIPLE">
      <!--Reddy Prasad -->
      <xsl:variable name="scrName">
        <xsl:call-template name="str:to-lower">
          <xsl:with-param name="text">
            <xsl:value-of select="@NAME"/>
          </xsl:with-param>
        </xsl:call-template>
      </xsl:variable>
      <TXT_SLNO>
        <xsl:value-of select="position()"/>
      </TXT_SLNO>
      <TXT_SCREENID>
        <xsl:value-of select="@NAME"/>
      </TXT_SCREENID>
      <xsl:if test="LABEL/@ID = ''">
        <TXT_LABELID>
          <xsl:value-of select="$scrId-case"/>
        </TXT_LABELID>
        <TXT_LABELVALUE></TXT_LABELVALUE>
        <TXT_DEFVALUE>
          <xsl:value-of select="LABEL"/>
          <!--<xsl:call-template name="str:replace">
            <xsl:with-param name="text">
              <xsl:value-of select="@NAME"/>
            </xsl:with-param>
          </xsl:call-template>-->
        </TXT_DEFVALUE>
      </xsl:if>
      <xsl:if test="LABEL/@ID != ''">
        <xsl:variable name="LblValue">
          <xsl:call-template name="str:CommonLabel">
            <xsl:with-param name="LabelId">
              <xsl:value-of select="LABEL/@ID"/>
            </xsl:with-param>
          </xsl:call-template>
        </xsl:variable>
        <TXT_LABELID>
          <xsl:value-of select="LABEL/@ID"/>
        </TXT_LABELID>
        <TXT_LABELVALUE></TXT_LABELVALUE>
        <TXT_DEFVALUE>
          <xsl:value-of select="$LblValue"/>
          <!--<xsl:call-template name="str:replace">
            <xsl:with-param name="text">
              <xsl:value-of select="@NAME"/>
            </xsl:with-param>
          </xsl:call-template>-->
        </TXT_DEFVALUE>
      </xsl:if>
      <xsl:for-each select="TABS/PAGE">
        <xsl:variable name="tabLblId-case">
          <xsl:call-template name="str:to-lower">
            <xsl:with-param name="text">
              <xsl:value-of select="concat('LBL__',$moduleId, $MasterXmlName ,$scrId,'__',@ID)"/>
            </xsl:with-param>
          </xsl:call-template>
        </xsl:variable>
        <TABPAGES ID="{position()}" TYPE="MULTIPLE">
          <TXT_SLNO>
            <xsl:value-of select="position()"/>
          </TXT_SLNO>
          <TXT_TABPAGEID>
            <xsl:value-of select="@ID"/>
          </TXT_TABPAGEID>
          <xsl:if test="@LBL_ID = ''">
            <TXT_LABEL>
              <xsl:value-of select="$tabLblId-case"/>
            </TXT_LABEL>
            <TXT_TABLABELVALUE></TXT_TABLABELVALUE>
            <TXT_DEFVALUE>
              <xsl:value-of select="."/>
              <!--<xsl:call-template name="str:replace">
                <xsl:with-param name="text">
                  <xsl:value-of select="@ID"/>
                </xsl:with-param>
              </xsl:call-template>-->
            </TXT_DEFVALUE>
          </xsl:if>
          <xsl:if test="@LBL_ID != ''">
            <xsl:variable name="LblValue">
              <xsl:call-template name="str:CommonLabel">
                <xsl:with-param name="LabelId">
                  <xsl:value-of select="@LBL_ID"/>
                </xsl:with-param>
              </xsl:call-template>
            </xsl:variable>
            <TXT_LABEL>
              <xsl:value-of select="@LBL_ID"/>
            </TXT_LABEL>
            <TXT_TABLABELVALUE></TXT_TABLABELVALUE>
            <TXT_DEFVALUE>
              <xsl:value-of select="$LblValue"/>
              <!--<xsl:call-template name="str:replace">
                <xsl:with-param name="text">
                  <xsl:value-of select="@ID"/>
                </xsl:with-param>
              </xsl:call-template>-->
            </TXT_DEFVALUE>
          </xsl:if>
        </TABPAGES>
      </xsl:for-each>
      <xsl:if test="count(TABS/PAGE[@ID = 'All']) = 0">
        <xsl:variable name="L_count" select="count(TABS/PAGE)"/>
        <TABPAGES ID="{$L_count +1}" Type="MULTIPLE">
          <TXT_SLNO>
            <xsl:value-of select="$L_count + 1 "/>
          </TXT_SLNO>
          <TXT_TABPAGEID>All
            <xsl:value-of select="@ID"/>
          </TXT_TABPAGEID>
          <TXT_LABEL>
            <xsl:call-template name="str:to-lower">
              <xsl:with-param name="text">
                <xsl:value-of select="concat('LBL__',$moduleId, $MasterXmlName ,$scrName ,'__','All')"/>
              </xsl:with-param>
            </xsl:call-template>
          </TXT_LABEL>
          <TXT_IS_HDR>TABPAGE_ALL</TXT_IS_HDR>
          <TXT_TABLABELVALUE>
            <xsl:call-template name="str:replace">
              <xsl:with-param name="text">
                <!-- <xsl:value-of select="@ID"/> -->
                <xsl:text>All</xsl:text>
              </xsl:with-param>
            </xsl:call-template>
          </TXT_TABLABELVALUE>
          <TXT_DEFVALUE>
            <xsl:call-template name="str:replace">
              <xsl:with-param name="text">
                <xsl:value-of select="@ID"/>
              </xsl:with-param>
            </xsl:call-template>
          </TXT_DEFVALUE>
        </TABPAGES>
      </xsl:if>
    </SCREENS>
  </xsl:template>
  <xsl:template match="BLOCK">
    <xsl:param name="moduleId" select="."/>
    <xsl:variable name="blkId" select="@ID"/>
    <!-- Reddy Prasad -->
    <xsl:variable name="blkId-case">
      <xsl:call-template name="str:to-lower">
        <xsl:with-param name="text">
          <xsl:value-of select="concat('LBL__',$moduleId,@ID)"/>
        </xsl:with-param>
      </xsl:call-template>
    </xsl:variable>
    <!-- Reddy Prasad-->
    <BLOCKS ID="{position()}" Type="MULTIPLE">
      <TXT_SLNO>
        <xsl:value-of select="position()"/>
      </TXT_SLNO>
      <TXT_BLOCK_ID>
        <!--  <xsl:value-of select="@ID"/> -->
        <xsl:call-template name="str:to-upper">
          <xsl:with-param name="text" select="@ID"/>
        </xsl:call-template>
      </TXT_BLOCK_ID>
      <!-- Reddy Prasad -->
      <xsl:if test="count(LABEL) = 0">
        <TXT_BLKLABEL>
          <xsl:value-of select="$blkId-case"/>
        </TXT_BLKLABEL>
        <TXT_BLKLABELVALUE>
          <!--<xsl:call-template name="str:replace">
            <xsl:with-param name="text">
              <xsl:value-of select="@ID"/>
            </xsl:with-param>
          </xsl:call-template>-->
        </TXT_BLKLABELVALUE>
       <TXT_DEFVALUE>
          <xsl:value-of select="LABEL"/>
       </TXT_DEFVALUE>   
      </xsl:if>
      <xsl:if test="LABEL/@ID = ''">
        <TXT_BLKLABEL>
          <xsl:value-of select="$blkId-case"/>
        </TXT_BLKLABEL>
        <TXT_BLKLABELVALUE></TXT_BLKLABELVALUE>
         
         <TXT_DEFVALUE>
          <xsl:value-of select="LABEL"/>
          <!--<xsl:call-template name="str:replace">
            <xsl:with-param name="text">
              <xsl:value-of select="@ID"/>
            </xsl:with-param>
          </xsl:call-template>-->
        </TXT_DEFVALUE> 
       
      </xsl:if>
      <xsl:if test="LABEL/@ID != ''">
        <xsl:variable name="LblValue">
          <xsl:call-template name="str:CommonLabel">
            <xsl:with-param name="LabelId">
              <xsl:value-of select="LABEL/@ID"/>
            </xsl:with-param>
          </xsl:call-template>
        </xsl:variable>
        <TXT_BLKLABEL>
          <xsl:value-of select="LABEL/@ID"/>
        </TXT_BLKLABEL>
        <TXT_BLKLABELVALUE></TXT_BLKLABELVALUE>
        
         <TXT_DEFVALUE>
          <xsl:value-of select="$LblValue"/>
          <!--<xsl:call-template name="str:replace">
            <xsl:with-param name="text">
              <xsl:value-of select="@ID"/>
            </xsl:with-param>
          </xsl:call-template>-->
        </TXT_DEFVALUE>
      </xsl:if>
     
      
      <!-- Reddy Prasad-->
      <xsl:apply-templates select="FIELD">
        <xsl:with-param name="moduleId">
          <xsl:value-of select="$moduleId"/>
        </xsl:with-param>
        <xsl:with-param name="blkId">
          <xsl:value-of select="$blkId"/>
        </xsl:with-param>
      </xsl:apply-templates>
    </BLOCKS>
  </xsl:template>
  <xsl:template match="FIELD">
    <xsl:param name="moduleId" select="."/>
    <xsl:param name="blkId" select="."/>
    <FIELDS ID="{position()}" Type="MULTIPLE">
      <xsl:variable name="fldLbl-case">
        <xsl:call-template name="str:to-lower">
          <xsl:with-param name="text">
            <xsl:value-of select="concat('LBL__',$moduleId,$blkId,'__',@NAME)"/>
          </xsl:with-param>
        </xsl:call-template>
      </xsl:variable>
      <TXT_SLNO>
        <xsl:value-of select="position()"/>
      </TXT_SLNO>
      <TXT_FIELDNAME>
        <!-- <xsl:value-of select="@NAME"/> -->
        <xsl:call-template name="str:to-upper">
          <xsl:with-param name="text" select="@NAME"/>
        </xsl:call-template>
      </TXT_FIELDNAME>
      <xsl:if test="LABEL/@ID = ''">
        <TXT_FIELDLABEL>
          <xsl:value-of select="$fldLbl-case"/>
        </TXT_FIELDLABEL>
        <TXT_FIELDLABELVALUE></TXT_FIELDLABELVALUE>
        <TXT_DEFVALUE>
          <xsl:value-of select="LABEL"/>
          <!--<xsl:call-template name="str:replace">
            <xsl:with-param name="text">
              <xsl:value-of select="@NAME"/>
            </xsl:with-param>
          </xsl:call-template>-->
        </TXT_DEFVALUE>
      </xsl:if>
      <xsl:if test="LABEL/@ID != ''">
        <xsl:variable name="LblValue">
          <xsl:call-template name="str:CommonLabel">
            <xsl:with-param name="LabelId">
              <xsl:value-of select="LABEL/@ID"/>
            </xsl:with-param>
          </xsl:call-template>
        </xsl:variable>
        <TXT_FIELDLABEL>
          <xsl:value-of select="LABEL/@ID"/>
        </TXT_FIELDLABEL>
        <TXT_FIELDLABELVALUE></TXT_FIELDLABELVALUE>
        <TXT_DEFVALUE>
          <xsl:value-of select="$LblValue"/>
          <!--<xsl:call-template name="str:replace">
            <xsl:with-param name="text">
              <xsl:value-of select="@NAME"/>
            </xsl:with-param>
          </xsl:call-template>-->
        </TXT_DEFVALUE>
      </xsl:if>
      <TXT_FIELD_TYPE>
        <xsl:value-of select="@TYPE"/>
      </TXT_FIELD_TYPE>
      <xsl:variable name="fldName" select="@NAME"/>
      <xsl:if test="@TYPE = 'SELECT' and count(OPTION) &gt; 0">
        <xsl:for-each select="OPTION">
          <xsl:variable name="otpLbl-case">
            <xsl:call-template name="str:to-lower">
              <xsl:with-param name="text">
                <xsl:value-of select="concat('LBL__',$moduleId,$blkId,'__',$fldName,'__',@VALUE)"/>
              </xsl:with-param>
            </xsl:call-template>
          </xsl:variable>
          <FIELDS_SELECT ID="{position()}" TYPE="MULTIPLE">
            <TXT_SLNO>
              <xsl:value-of select="position()"/>
            </TXT_SLNO>
            <TXT_OPT_VALUE>
              <xsl:value-of select="@VALUE"/>
            </TXT_OPT_VALUE>
            <xsl:if test="@LBL_ID = ''">
              <TXT_LABELID>
                <xsl:value-of select="$otpLbl-case"/>
              </TXT_LABELID>
              <TXT_LABELVALUE></TXT_LABELVALUE>
              <TXT_DEFVALUE>
                <xsl:value-of select="."/>
                <!--<xsl:call-template name="str:replace">
                  <xsl:with-param name="text">
                    <xsl:value-of select="@VALUE"/>
                  </xsl:with-param>
                </xsl:call-template>-->
              </TXT_DEFVALUE>
            </xsl:if>
            <xsl:if test="@LBL_ID != ''">
              <xsl:variable name="LblValue">
                <xsl:call-template name="str:CommonLabel">
                  <xsl:with-param name="LabelId">
                    <xsl:value-of select="@LBL_ID"/>
                  </xsl:with-param>
                </xsl:call-template>
              </xsl:variable>
              <TXT_LABELID>
                <xsl:value-of select="@LBL_ID"/>
              </TXT_LABELID>
              <TXT_LABELVALUE></TXT_LABELVALUE>
              <TXT_DEFVALUE>
                <xsl:value-of select="$LblValue"/>
                <!--<xsl:call-template name="str:replace">
                  <xsl:with-param name="text">
                    <xsl:value-of select="@VALUE"/>
                  </xsl:with-param>
                </xsl:call-template>-->
              </TXT_DEFVALUE>
            </xsl:if>
          </FIELDS_SELECT>
        </xsl:for-each>
      </xsl:if>
      <xsl:if test="@TYPE = 'RADIO' and count(OPTION) &gt; 0">
        <xsl:for-each select="OPTION">
          <xsl:variable name="RadLbl-case">
            <xsl:call-template name="str:to-lower">
              <xsl:with-param name="text">
                <xsl:value-of select="concat('LBL__',$moduleId,$blkId,'__',$fldName,'__',@VALUE)"/>
              </xsl:with-param>
            </xsl:call-template>
          </xsl:variable>
          <FIELDS_RADIO ID="{position()}" TYPE="MULTIPLE">
            <TXT_SLNO>
              <xsl:value-of select="position()"/>
            </TXT_SLNO>
            <TXT_OPT_VALUE>
              <xsl:value-of select="@VALUE"/>
            </TXT_OPT_VALUE>
            <xsl:if test="@LBL_ID = ''">
              <TXT_LABELID>
                <xsl:value-of select="$RadLbl-case"/>
              </TXT_LABELID>
              <TXT_LABELVALUE></TXT_LABELVALUE>
              <TXT_DEFVALUE>
                <xsl:value-of select="."/>
                <!--<xsl:call-template name="str:replace">
                  <xsl:with-param name="text">
                    <xsl:value-of select="@VALUE"/>
                  </xsl:with-param>
                </xsl:call-template>-->
              </TXT_DEFVALUE>
            </xsl:if>
            <xsl:if test="@LBL_ID != ''">
              <xsl:variable name="LblValue">
                <xsl:call-template name="str:CommonLabel">
                  <xsl:with-param name="LabelId">
                    <xsl:value-of select="@LBL_ID"/>
                  </xsl:with-param>
                </xsl:call-template>
              </xsl:variable>
              <TXT_LABELID>
                <xsl:value-of select="@LBL_ID"/>
              </TXT_LABELID>
              <TXT_LABELVALUE></TXT_LABELVALUE>
              <TXT_DEFVALUE>
                <xsl:value-of select="$LblValue"/>
                <!--<xsl:call-template name="str:replace">
                  <xsl:with-param name="text">
                    <xsl:value-of select="@VALUE"/>
                  </xsl:with-param>
                </xsl:call-template>-->
              </TXT_DEFVALUE>
            </xsl:if>
          </FIELDS_RADIO>
        </xsl:for-each>
      </xsl:if>
      <xsl:if test="@TYPE = 'LOV' and count(LOV) &gt; 0">
        <xsl:for-each select="LOV">
          <xsl:variable name="lovLbl-case">
            <xsl:call-template name="str:to-lower">
              <xsl:with-param name="text">
                <xsl:value-of select="concat('LBL__',$moduleId,$blkId,'__',$fldName,'__',@ID)"/>
              </xsl:with-param>
            </xsl:call-template>
          </xsl:variable>
          <FIELDS_LOV ID="{position()}" Type="MULTIPLE">
            <TXT_SNO>
              <xsl:value-of select="position()"/>
            </TXT_SNO>
            <xsl:if test="LABEL/@ID = ''">
              <TXT_LABEL_LOV>
                <xsl:value-of select="$lovLbl-case"/>
              </TXT_LABEL_LOV>
              <TXT_TITLE_LOV></TXT_TITLE_LOV>
              <TXT_DEFVALUE>
                <xsl:value-of select="./LABEL"/>
                <!--<xsl:call-template name="str:replace">
                  <xsl:with-param name="text">
                    <xsl:value-of select="$lovLbl-case"/>
                  </xsl:with-param>
                </xsl:call-template>-->
              </TXT_DEFVALUE>
            </xsl:if>
            <xsl:if test="LABEL/@ID != ''">
              <xsl:variable name="LblValue">
                <xsl:call-template name="str:CommonLabel">
                  <xsl:with-param name="LabelId">
                    <xsl:value-of select="LABEL/@ID"/>
                  </xsl:with-param>
                </xsl:call-template>
              </xsl:variable>
              <TXT_LABEL_LOV>
                <xsl:value-of select="LABEL/@ID"/>
              </TXT_LABEL_LOV>
              <TXT_TITLE_LOV></TXT_TITLE_LOV>
              <TXT_DEFVALUE>
                <xsl:value-of select="$LblValue"/>
                <!--<xsl:call-template name="str:replace">
                  <xsl:with-param name="text">
                    <xsl:value-of select="$LblValue"/>
                  </xsl:with-param>
                </xsl:call-template>-->
              </TXT_DEFVALUE>
            </xsl:if>
            <xsl:for-each select="FIELDS_LOV_QRYCOLS">
              <xsl:variable name="colHeadLbl-case">
                <xsl:call-template name="str:to-lower">
                  <xsl:with-param name="text">
                    <xsl:value-of select="concat('LBL__',$moduleId,$blkId,'__',$fldName,'__',../@ID,'__',TXT_QRY_COL/@NAME)"/>
                  </xsl:with-param>
                </xsl:call-template>
              </xsl:variable>
              <FIELDS_LOV_QRYCOLS ID="{@ID}" Type="MULTIPLE">
                <TXT_SNO>
                  <xsl:value-of select="position()"/>
                </TXT_SNO>
                <TXT_QRY_COL>
                  <xsl:value-of select="TXT_QRY_COL/@NAME"/>
                </TXT_QRY_COL>
                <xsl:if test="TXT_QRY_COL/@LBL_ID = ''">
                  <TXT_LBL_COL_HEADING>
                    <xsl:value-of select="$colHeadLbl-case"/>
                  </TXT_LBL_COL_HEADING>
                  <TXT_COL_HEADING>
                  </TXT_COL_HEADING>
                  <TXT_DEFVALUE>
                    <xsl:value-of select="TXT_QRY_COL"/>
                    <!--<xsl:call-template name="str:replace">
                      <xsl:with-param name="text">
                        <xsl:value-of select="TXT_QRY_COL"/>
                      </xsl:with-param>
                    </xsl:call-template>-->
                  </TXT_DEFVALUE>
                </xsl:if>
                <xsl:if test="TXT_QRY_COL/@LBL_ID != ''">
                  <xsl:variable name="LblValue">
                    <xsl:call-template name="str:CommonLabel">
                      <xsl:with-param name="LabelId">
                        <xsl:value-of select="TXT_QRY_COL/@LBL_ID"/>
                      </xsl:with-param>
                    </xsl:call-template>
                  </xsl:variable>
                  <TXT_LBL_COL_HEADING>
                    <xsl:value-of select="TXT_QRY_COL/@LBL_ID"/>
                  </TXT_LBL_COL_HEADING>
                  <TXT_COL_HEADING></TXT_COL_HEADING>
                  <TXT_DEFVALUE>
                    <xsl:value-of select="$LblValue"/>
                    <!--<xsl:call-template name="str:replace">
                      <xsl:with-param name="text">
                        <xsl:value-of select="TXT_QRY_COL"/>
                      </xsl:with-param>
                    </xsl:call-template>-->
                  </TXT_DEFVALUE>
                </xsl:if>
              </FIELDS_LOV_QRYCOLS>
            </xsl:for-each>
          </FIELDS_LOV>
        </xsl:for-each>
      </xsl:if>
    </FIELDS>
  </xsl:template>
  <!-- Template to convert to lower case -->
  <xsl:template name="str:to-lower">
    <xsl:param name="text"/>
    <xsl:variable name="lcletters">abcdefghijklmnopqrstuvwxyz </xsl:variable>
    <xsl:variable name="ucletters">ABCDEFGHIJKLMNOPQRSTUVWXYZ</xsl:variable>
    <xsl:value-of select="translate($text, $ucletters, $lcletters)"/>
  </xsl:template>
  <!-- Template to convert to upper case -->
  <xsl:template name="str:to-upper">
    <xsl:param name="text"/>
    <xsl:variable name="lcletters">abcdefghijklmnopqrstuvwxyz </xsl:variable>
    <xsl:variable name="ucletters">ABCDEFGHIJKLMNOPQRSTUVWXYZ</xsl:variable>
    <xsl:value-of select="translate($text,  $lcletters , $ucletters)"/>
  </xsl:template>
  <!-- handler to replace undescore characters -->
  <xsl:template name="str:replace">
    <xsl:param name="text"/>
    <xsl:variable name="lcletters">abcdefghijklmnopqrstuvwxyz </xsl:variable>
    <xsl:variable name="ucletters">ABCDEFGHIJKLMNOPQRSTUVWXYZ_</xsl:variable>
    <xsl:value-of select="translate($text, $ucletters, $lcletters)"/>
  </xsl:template>
</xsl:stylesheet>
