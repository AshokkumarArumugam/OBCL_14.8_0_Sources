<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
       <!-- Takes care of features common in Audit Bar for Absolute/Column Positioning -->
       <xsl:variable name = "Brn_Neo" select = "normalize-space(//FORM/@MASTER)"/> 
       <xsl:param name="isChildFunc"/>
       <xsl:param name="typeString"/>
       <xsl:template name="Audit_tmp">
              <xsl:variable name="auditId" select="/FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']/ID"/>

            <xsl:if test = "$Brn_Neo = ''">
              <xsl:if test="count(//*[name() = 'SCREEN' and @NAME =  $screen]/*[name() ='SUBSCREEN']/FORM) &gt; 0">
                    <xsl:call-template name = "showCallFormButtons_tmp"></xsl:call-template>
              </xsl:if>
            </xsl:if>
                    <div class="DIVAudit" id="DIV_{$auditId}">
                        <xsl:if test="count(/FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']) = 0 and ($gBlkButCount &gt; 0 or $gBlkButImgCount &gt; 0)">
                            <xsl:attribute name="id"><xsl:text>DIV_AUDIT_BUTTONS</xsl:text></xsl:attribute>                        
                        </xsl:if>
                        
                        
                        <table class="TABLEAudit" width="99%" border="0" cellspacing="0" cellpadding="0" DBT="{/FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']/DBT}" summary="Audit information">
                        
                                <xsl:if test="count(/FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']) &gt; 0">
                                       <xsl:if test = "$Brn_Neo = ''"> 
                                          <xsl:variable name = "AuditType">
                                            <xsl:value-of select = "/FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']/TYPE"/>
                                          </xsl:variable>
                                          
                                          <xsl:if test = "($AuditType = 'M' and ($typeString != 'T' and $typeString != 'P'))">
                                              <xsl:apply-templates select="/FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']" mode="AuditEntry_Neo_tmp"/>
                                         </xsl:if>                           
                                        <xsl:if test = "($AuditType = 'T' and ($typeString != 'T' and $typeString != 'P'))">
                                             <xsl:apply-templates select="/FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']" mode="AuditEntry_Neo_Online_tmp"/> 
                                        </xsl:if>                           
                                                                             
                                    </xsl:if>
                                </xsl:if>
                                          <xsl:if test="($typeString = 'T' or $typeString = 'P' )"> 
                                                <xsl:if test=" (  $isChildFunc='N' and  $screen='CVS_MAIN' )">
                                                 <xsl:call-template name="AuditEntry_Neo_Process_tmp"/>
                                                 </xsl:if>
                                                <xsl:if test="($isChildFunc!='N' or $screen!='CVS_MAIN')">
                                                  <xsl:call-template name="StdBtnEntry_tmp"/> 
                                                   </xsl:if>
                                          </xsl:if>
                                       <xsl:if test="(count(/FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']) = 0 and ($typeString != 'T' and $typeString != 'P'))">
                                            <xsl:call-template name="Without_AuditEntry_tmp"/>
                                        </xsl:if>
                                
                                <xsl:if test = "$Brn_Neo != ''"> 
                                    <xsl:call-template name="StdBtnEntry_tmp"/> 
                                </xsl:if>
                        </table>
                        
                    </div>
                    <xsl:if test = "//FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']/TYPE = 'T'">
                        <xsl:call-template name = "CacheAuditValues_tmp"/>
                    </xsl:if>
              
       </xsl:template>
       
        <xsl:template name = "showCallFormButtons_tmp">
            <xsl:variable name="noOfRows">
                <xsl:if test="count(//*[name() = 'SCREEN' and @NAME =  $screen]/CS_BUTTON_ROWS) &gt; 0">
                    <xsl:if test="normalize-space(//*[name() = 'SCREEN' and @NAME =  $screen]/CS_BUTTON_ROWS) != ''">
                        <xsl:value-of select="//*[name() = 'SCREEN' and @NAME =  $screen]/CS_BUTTON_ROWS"/>
                    </xsl:if>
                    <xsl:if test="normalize-space(//*[name() = 'SCREEN' and @NAME =  $screen]/CS_BUTTON_ROWS) = ''">
                        <xsl:value-of select="1"/>
                    </xsl:if>
                </xsl:if>
                <xsl:if test="count(//*[name() = 'SCREEN' and @NAME =  $screen]/CS_BUTTON_ROWS) = 0">
                    <xsl:value-of select="1"/>
                </xsl:if>
            </xsl:variable>

            <xsl:variable name="noOfButtons" select="count(//*[name() = 'SCREEN' and @NAME =  $screen]/*[name() ='SUBSCREEN']/FORM)"/>
            <xsl:variable name="buttonsPerRow" select="//*[name() = 'SCREEN' and @NAME =  $screen]/CS_BUTTONS_PER_ROW"/>

            <div class="DIVSubSystem" id="DIVSubSystem">
                <ul>
                        <xsl:for-each select = "//*[name() = 'SCREEN' and @NAME =  $screen]/*[name() ='SUBSCREEN']/FORM">                    
                            <xsl:variable name = "fnc" select = "FUNCTION"></xsl:variable>
                            <xsl:variable name = "lbl" select = "LABEL"></xsl:variable>
                            <li id="{@id}">
                                <a href="#" onclick = "{$fnc}" class="BUTTONSubSystem"><span><xsl:value-of select = "$lbl" /></span></a>
                            </li>
                        </xsl:for-each>  
                </ul>
            </div>
            
        </xsl:template>


       <xsl:template match="BLOCK" mode="AuditEntry_Neo_tmp">        
            <tr>
                <td class="THEADAudit" style="width:95%">
                    <table class="TABLEAudit" summary="" cellpadding="0" cellspacing="0" border="0" style="width:99%;">
                        <tr>            
                        <td><label class="LABELAudit" >Input by :</label></td>
                        <td><input readonly="readonly" class="TEXTAudit" type="text" name="MAKER_ID" id="{DBT}__MAKER_ID" DBT="{DBT}" DBC="MAKER_ID" MAXLENGTH="12" SIZE="12" /></td>
                        <td><label class="LABELAudit" >DateTime :</label></td>
                        <td>
                            <INPUT TYPE="HIDDEN" name="MAKER_DT_STAMP" id="{DBT}__MAKER_DT_STAMP" DBT="{DBT}" DBC="MAKER_DT_STAMP" onpropertychange="fnFormatTimeStamp(this)"/>
                            <input readonly="readonly"  class="TEXTAudit" type="text" name="MAKER_DT_STAMPI" id="MAKER_DT_STAMPI" MAXLENGTH="19" SIZE="22" />
                        </td>
                        <td><label class="LABELAudit" >Mod No. :</label></td>
                        <td><input readonly="readonly"  class="TEXTAudit" type="text" name="MOD_NO" id="{DBT}__MOD_NO" DBT="{DBT}" DBC="MOD_NO" MAXLENGTH="4" SIZE="3" /></td>
                        <td><label class="LABELCheckAudit">
                                <INPUT TYPE="CHECKBOX" name="RECORD_STAT" id="{DBT}__RECORD_STAT" DBT="{DBT}" DBC="RECORD_STAT" DISABLED="true" onclick="fnWhenAuditChange()"/>
                                Open
                            </label>
                        </td>                                   
                        <td><input Type="reset" style="visibility:HIDDEN;width:1px;height:1px" id="id_reset_1"/></td>
                            <xsl:for-each select="//BLOCK[@SCREEN = $screen and ID = 'BLK_STD_BUTTONS_IMG']/FIELD/TYPE[text()='BUTTON']">
                        <td class="TDAuditButton" width="90%" rowspan="2" valign="middle">                                    
                                    <xsl:call-template name="dispStdButtonField_img_tmp"/>
                        </td>
                            </xsl:for-each>
                    </tr>
                    <tr>
                        <td><label class="LABELAudit" for="a4">Authorized by :</label></td>
                        <td><input readonly="readonly"  class="TEXTAudit" type="text" name="CHECKER_ID" id="{DBT}__CHECKER_ID" DBT="{DBT}" DBC="CHECKER_ID" MAXLENGTH="12" SIZE="12" /></td>
                        <td><label class="LABELAudit" for="a2">DateTime :</label></td>
                        <td>
                            <INPUT TYPE="HIDDEN" name="CHECKER_DT_STAMP" id="{DBT}__CHECKER_DT_STAMP" DBT="{DBT}" DBC="CHECKER_DT_STAMP" onpropertychange="fnFormatTimeStamp(this)"/>
                            <input readonly="readonly"  class="TEXTAudit" type="text" name="CHECKER_DT_STAMPI" id="CHECKER_DT_STAMPI" MAXLENGTH="19" SIZE="22" />
                        </td>
                        <td><xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text></td>
                        <td><xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text></td>
                        <td><label class="LABELCheckAudit">
                                <input type="checkbox" name="AUTH_STAT" id="{DBT}__AUTH_STAT" DBT="{DBT}" DBC="AUTH_STAT" DISABLED="true" onclick="fnWhenAuditChange()"/>
                                Authorized
                            </label>
                        </td>
                        <td><INPUT TYPE="HIDDEN" name="ONCE_AUTH" id="{DBT}__ONCE_AUTH" DBT="{DBT}" DBC="ONCE_AUTH"/></td>
                    </tr>
                </table>
            </td>
        </tr>
       </xsl:template>
       
       
       <!-- Added By Fahad as part of Process Screens -->
       
       <xsl:template name="AuditEntry_Neo_Process_tmp">
          <td CLASS="THEADAudit" style="width:95%">
                 <TABLE CLASS="TABLEAudit" summary=""
                        cellpadding="0" cellspacing="0" border="0"
                        style="width:99%;">

                        <TR CLASS="TRAudit">
                                <TD CLASS="TDAudit" style="vertical-align:top" >
                                    <NOBR>
                                             <LABEL CLASS="LABELAudit" style="margin-top:0px;">Remarks</LABEL>
                                    </NOBR>                        
                                </TD>
                               <TD CLASS="fieldAudit">
                                      <NOBR>
                                             <TEXTAREA CLASS="TEXTAREASmall"                                                    
                                                    name="AUDIT_FIELD"
                                                    ROWS="2"
                                                    COLS="35"
                                                    id="AUDIT_FIELD"
                                                    READONLY="false"/>
                                      </NOBR>
                               </TD>
                               
                               <TD CLASS="TDAudit">
                                    <NOBR>
                                            <BUTTON CLASS="INPUTButton" ID="BTN_AUDIT" NAME="BTN_AUDIT" onclick="fnBpelAudit()">Audit</BUTTON>
                                    </NOBR>
                               </TD>                               
                               
                               <TD CLASS="fieldAudit">
                                      <NOBR>    
                                                <SELECT CLASS="SELECTList" ID="PROCESS_ACTIONS" STYLE="width:200px;">
                                                    <OPTION CLASS="SELECTListOption" VALUE="ACCEPT">ACCEPT</OPTION>                                                    
                                                </SELECT>                                                
                                      </NOBR>
                               </TD>
                                <xsl:for-each select="//BLOCK[@SCREEN = $screen and ID = 'BLK_STD_BUTTONS_IMG']/FIELD/TYPE[text()='BUTTON']">
                                    <td class="TDAuditButton" rowspan="2" valign="middle">
                                                <xsl:call-template name="dispStdButtonField_img_tmp"/>
                                    </td>
                                </xsl:for-each>
                                  
                                  
                        </TR>
                 </TABLE>
          </td>
    </xsl:template>

       
       
       
       

<xsl:template name="StdBtnEntry_tmp">
    <table class="TABLEAudit" width="99%" border="0" cellspacing="0" cellpadding="0">
    <tr><td class="TDAuditButton" width="90%" rowspan="2" valign="middle"></td>

        <xsl:if test="$gBlkButCount &gt; 0">
            <TD class="TableTdAuditMain" align="right">
                <xsl:apply-templates select="/FORM/BLOCK[@SCREEN=$screen and ID='BLK_STD_BUTTONS']" mode="BlockStdButtons_tmp"/>
            </TD>
        </xsl:if>
        <xsl:if test="$gBlkButImgCount &gt; 0">
            <TD class="TableTdAuditMain" align="right">
                <xsl:apply-templates select="/FORM/BLOCK[@SCREEN=$screen and ID='BLK_STD_BUTTONS_IMG']" mode="BlockStdButtonsImg_tmp"/>
            </TD>
        </xsl:if>

    </tr></table>
</xsl:template>

<xsl:template match="BLOCK" mode="BlockStdButtonsImg_tmp">
                <TD>
                    <input Type="reset" style="visibility:HIDDEN;width:1px;height:1px" id="id_reset_1"/>
                </TD>
                <xsl:for-each select="./FIELD/TYPE[text()='BUTTON']">
                    <TD CLASS="TDstdButtonImg" align="right">
                        <xsl:call-template name="dispStdButtonField_img_tmp"/>
                    </TD>
                </xsl:for-each>
</xsl:template>

<xsl:template name="dispStdButtonField_img_tmp">   
    <xsl:if test="normalize-space(../NAME) = 'BTN_EXIT'">
        <input type="button" class="BUTTONExit" >
            <xsl:call-template name="ATTR_Handler_tmp">
                <xsl:with-param name="curr_fld" select=".." />
            </xsl:call-template>
            <xsl:attribute name="ID">
                <xsl:value-of select="concat(../NAME,'_IMG')"/>
            </xsl:attribute>
            <xsl:attribute name="value">
                <xsl:value-of select="../LABEL"/>
            </xsl:attribute>
        </input>
    </xsl:if>
    
    <xsl:if test="normalize-space(../NAME) = 'BTN_OK'">
        <input type="button" class="BUTTONOk" >
            <xsl:call-template name="ATTR_Handler_tmp">
                <xsl:with-param name="curr_fld" select=".." />
            </xsl:call-template>
            <xsl:attribute name="ID">
                <xsl:value-of select="concat(../NAME,'_IMG')"/>
            </xsl:attribute>
            <xsl:attribute name="value">
                <xsl:value-of select="../LABEL"/>
            </xsl:attribute>
        </input>
    </xsl:if>
    
    
</xsl:template>


       <xsl:template name="Without_AuditEntry_tmp">        
            <tr>
                <td class="THEADAudit" style="width:95%">
                    <table class="TABLEAudit" summary="" cellpadding="0" cellspacing="0" border="0" style="width:99%;">
                        <tr>            
                        <td><xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text></td>
                        <td><xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text></td>
                        <td><xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text></td>
                        <td><xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text></td>
                        <td><xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text></td>
                        <td><xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text></td>
                        <td><xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text></td>
                        <td><input Type="reset" style="visibility:HIDDEN;width:1px;height:1px" id="id_reset_1"/></td>
                            <xsl:for-each select="//BLOCK[@SCREEN = $screen and ID = 'BLK_STD_BUTTONS_IMG']/FIELD/TYPE[text()='BUTTON']">
                        <td class="TDAuditButton" width="90%" rowspan="2" valign="middle">                                    
                                    <xsl:call-template name="dispStdButtonField_img_tmp"/>
                        </td>
                            </xsl:for-each>
                    </tr>
                    <tr>
                        <td><xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text></td>
                        <td><xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text></td>
                        <td><xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text></td>
                        <td><xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text></td>
                        <td><xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text></td>
                        <td><xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text></td>
                        <td><xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text></td>
                        <td><xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text></td>
                    </tr>
                </table>
            </td>
        </tr>
    </xsl:template>

<!--



<xsl:template match="BLOCK" mode="AuditEntry_Neo_Online_tmp">        
        <xsl:variable name="contractStatus" select = "//FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']/CONTRACT_STATUS"/>
        <xsl:variable name="authStatus" select = "//FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']/AUTH_STATUS"/>
        <xsl:variable name="paymentStatus" select = "//FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']/PAYMENT_STATUS"/>
        <xsl:variable name="collectionStatus" select = "//FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']/COLLECTION_STATUS"/>
        <xsl:variable name="ProcessStatus" select = "//FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']/PROCESS_STATUS"/>
        <tr>
            <td class="THEADAudit" style="width:95%">
                <table class="TABLEAudit" summary="" cellpadding="0" cellspacing="0" border="0" style="width:99%;">
                    <tr>
                        <td><label class="LABELAudit" >Input by :</label></td>
                        <td><input readonly="readonly" class="TEXTAudit" type="text" name="MAKERID" id="{DBT}__MAKERID" DBT="{DBT}" DBC="MAKERID" MAXLENGTH="12" SIZE="12" /></td>
                        <td><label class="LABELAudit" >Date Time :</label></td>
                        <td>
                            <INPUT TYPE="HIDDEN" name="MAKERSTAMP" id="{DBT}__MAKERSTAMP" DBT="{DBT}" DBC="MAKERSTAMP" onpropertychange="fnFormatTimeStamp(this)"/>
                            <input readonly="readonly"  class="TEXTAudit" type="text" name="MAKERSTAMPI" id="MAKERSTAMPI" MAXLENGTH="19" SIZE="22" />
                        </td>
                        <td><label class="LABELAudit" >Authorized By :</label></td>
						<td><input readonly="readonly" class="TEXTAudit" type="text" name="CHECKERID" id="{DBT}__CHECKERID" DBT="{DBT}" DBC="CHECKERID" MAXLENGTH="12" SIZE="12" /></td>
                        <td><label class="LABELAudit" >Date Time :</label></td>
                        <td>
                            <INPUT TYPE="HIDDEN" name="CHECKERSTAMP" id="{DBT}__CHECKERSTAMP" DBT="{DBT}" DBC="CHECKERSTAMP" onpropertychange="fnFormatTimeStamp(this)"/>
                            <input readonly="readonly"  class="TEXTAudit" type="text" name="CHECKERSTAMPI" id="CHECKERSTAMPI" MAXLENGTH="19" SIZE="22" />
                        </td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <xsl:variable name="tempCount" select="0" />
                            <td> 
                            <xsl:if test = "$contractStatus = -1">
                                <label class="LABELAudit" >Contract Status:</label>  
                                <INPUT readonly="readonly" class="TEXTAudit" type="text" name="CONTSTAT" DBT="{DBT}" DBC="CONTSTAT"  id="{DBT}__CONTSTAT" MAXLENGTH="15" SIZE="15"  /> 
                            </xsl:if>  
                            </td>
                            <td>
                            <xsl:if test = "$contractStatus = 0 and $paymentStatus = -1 and $collectionStatus = -1">
                                <label class="LABELAudit" >Collection Status:</label>  
                                <INPUT readonly="readonly" class="TEXTAudit" type="text" name="COLLECTION_STATUS" DBT="{DBT}" DBC="COLLECTION_STATUS"  id="{DBT}__COLLECTION_STATUS" MAXLENGTH="12" SIZE="12"/> 
                            </xsl:if>                                          
                            </td>
                            <td>
                            <xsl:if test = "$contractStatus = 0 and $paymentStatus = 0 and $collectionStatus = -1">
                                <label class="LABELAudit" >Collection Status:</label>
                                <INPUT readonly="readonly" class="TEXTAudit" type="text" name="COLLECTION_STATUS" DBT="{DBT}" DBC="COLLECTION_STATUS"  id="{DBT}__COLLECTION_STATUS" MAXLENGTH="12" SIZE="12"/> 
                            </xsl:if>  
                            </td>
                            <td>
                            <xsl:if test = "$contractStatus = 0 and $paymentStatus = -1 and $collectionStatus = 0" >
                                <label class="LABELAudit" >Payment Status:</label>  
                                <INPUT readonly="readonly" class="TEXTAudit" type="text" name="PAYMENT_STATUS" DBT="{DBT}" DBC="PAYMENT_STATUS"  id="{DBT}__PAYMENT_STATUS" MAXLENGTH="12" SIZE="12"/> 
                            </xsl:if>  
                            </td>
                            <td>
                            <xsl:if test = "$contractStatus = 0 and $paymentStatus = 0 and $collectionStatus = 0 and ProcessStatus = -1">
                                <label class="LABELAudit" >Process  Status:</label>   
                                <INPUT readonly="readonly" class="TEXTAudit" name="PROCESSTAT" DBT="{DBT}" DBC="PROCESSTAT"  id="{DBT}__PROCESSTAT" MAXLENGTH="25" SIZE="22"/> 
                            </xsl:if>  
                            </td>
                        
                            <td> 
                            <xsl:if test = "$authStatus = -1">
                                <label class="LABELCheckAudit"> 
                                <INPUT  TYPE="CHECKBOX" name="AUTHSTAT" DBT="{DBT}" DBC="AUTHSTAT"  id="{DBT}__AUTHSTAT"  ON="A" OFF="U" READONLY="true" MAXLENGTH="15" SIZE="17"/>
                                Authorized</label> 
                            </xsl:if> 
                            </td>
                            <xsl:if test = "$authStatus = 0 and $collectionStatus = -1 and $paymentStatus = -1 and $contractStatus = -1">
                                <td> <label class="LABELAudit" >Collection Status:</label>   </td>
                                <td> <INPUT readonly="readonly" class="TEXTAudit" name="COLLECTION_STATUS" DBT="{DBT}" DBC="COLLECTION_STATUS"  id="{DBT}__COLLECTION_STATUS" MAXLENGTH="12" SIZE="12"/> </td>
                            </xsl:if>
                            <xsl:if test = "$authStatus = 0 and $collectionStatus = -1 and $paymentStatus = -1 and $contractStatus = 0">
                                <td> <label class="LABELAudit" >Payment Status:</label>  </td>
                                <td> <INPUT readonly="readonly" class="TEXTAudit" name="PAYMENT_STATUS" DBT="{DBT}" DBC="PAYMENT_STATUS"  id="{DBT}__PAYMENT_STATUS" MAXLENGTH="12" SIZE="12"/> </td>
                            </xsl:if>
                            <xsl:if test = "$authStatus = 0 and $collectionStatus = 0 and $paymentStatus = 0 and $contractStatus = 0 and  ProcessStatus = -1">
                                <td> <label class="LABELAudit" >Process Status:</label>   </td>
                                <td> <INPUT readonly="readonly" class="TEXTAudit" name="PROCESSTAT" DBT="{DBT}" DBC="PROCESSTAT"  id="{DBT}___PROCESSTAT" READONLY="true" MAXLENGTH="25" SIZE="22"/>  </td>
                            </xsl:if>
                        
                        
			</tr>
                        <xsl:variable name = "Reversal" select = "//FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']/REVERSAL"/>
                            
                                <xsl:if test = "$Reversal = -1">                             
                                    <tr>
                                    <td> <label class="LABELAudit" >Reversal:</label> </td>
                                    <td> <INPUT readonly="readonly" class="TEXTAudit" name="REVR_MAKERID" id="{DBT}__REVR_MAKERID" DBT="{DBT}" DBC="REVR_MAKERID" MAXLENGTH="12" SIZE="12"/> </td>
                                    <td> 
                                        <INPUT TYPE="HIDDEN" name="REVR_MAKERSTAMP" id="{DBT}__REVR_MAKERSTAMP" DBT="{DBT}" DBC="REVR_MAKERSTAMP" onpropertychange="fnFormatTimeStamp(this)"/>
                                        <INPUT readonly="readonly" class="TEXTAudit" name="REVR_MAKERSTAMPI" id="REVR_MAKERSTAMPI" MAXLENGTH="19" SIZE="22"/>
                                    </td>
                                    <td> <INPUT readonly="readonly" class="TEXTAudit" name="REVR_CHECKERID" id="{DBT}__REVR_CHECKERID" DBT="{DBT}" DBC="REVR_CHECKERID"  MAXLENGTH="12" SIZE="12"/> </td>
                                    <td> 
                                        <INPUT TYPE="HIDDEN" name="REVR_CHECKERSTAMP" id="{DBT}__REVR_CHECKERSTAMP" DBT="{DBT}" DBC="REVR_CHECKERSTAMP" onpropertychange="fnFormatTimeStamp(this)"/>                                                        
                                        <INPUT readonly="readonly" class="TEXTAudit" name="REVR_CHECKERSTAMPI" id="REVR_CHECKERSTAMPI" MAXLENGTH="19" SIZE="22"/>
                                    </td>
                            
                            
                            
                                <xsl:variable name="tdcount" select="0" />
                                <xsl:if test = "$contractStatus = -1 and $paymentStatus = 0 and $collectionStatus = -1 and $authStatus = -1">
                                    <td><label class="LABELAudit" >Collection Status:</label>   </td>
                                    <td><INPUT readonly="readonly" class="TEXTAudit" name="COLLECTION_STATUS" DBT="{DBT}" DBC="COLLECTION_STATUS"  id="{DBT}__COLLECTION_STATUS" MAXLENGTH="15" SIZE="17"/></td>
                                    
                                </xsl:if>
                                <xsl:if test = "$contractStatus = -1 and $paymentStatus = -1 and $collectionStatus = 0 and $authStatus = -1">
                                    <td><label class="LABELAudit" >Payment Status:</label> </td>
                                    <td><INPUT readonly="readonly" class="TEXTAudit" name="PAYMENT_STATUS" DBT="{DBT}" DBC="PAYMENT_STATUS"  id="{DBT}__PAYMENT_STATUS" MAXLENGTH="15" SIZE="17"/></td>
                                </xsl:if>  
                                <xsl:if test = "$contractStatus = 0 and $paymentStatus = -1 and $collectionStatus = -1 and $authStatus = -1">
                                    <td><label class="LABELAudit" >Payment Status:</label> </td>
                                    <td><INPUT readonly="readonly" class="TEXTAudit" name="PAYMENT_STATUS" DBT="{DBT}" DBC="PAYMENT_STATUS"  id="{DBT}__PAYMENT_STATUS"  MAXLENGTH="15" SIZE="17"/></td>
                                </xsl:if>  
                                <xsl:if test = "$contractStatus = -1 and $paymentStatus = -1 and $collectionStatus = -1 and $authStatus = 0">
                                    <td><label class="LABELAudit" >Payment Status:</label>       </td>
                                    <td><INPUT readonly="readonly" class="TEXTAudit" name="PAYMENT_STATUS" DBT="{DBT}" DBC="PAYMENT_STATUS"  id="{DBT}__PAYMENT_STATUS" MAXLENGTH="15" SIZE="17"/></td>
                                </xsl:if>  
                                <xsl:if test = "$contractStatus = -1 and $paymentStatus = 0 and $collectionStatus = 0 and $authStatus = -1 and $ProcessStatus = -1">
                                    <td><label class="LABELAudit" >Process Status:</label> </td>
                                    <td><INPUT readonly="readonly" class="TEXTAudit" name="PROCESSTAT" DBT="{DBT}" DBC="PROCESSTAT"  id="{DBT}__PROCESSTAT" MAXLENGTH="25" SIZE="22"/></td>
                                </xsl:if>  
                                <xsl:if test = "$contractStatus = 0 and $paymentStatus = -1 and $collectionStatus = -1 and $authStatus = 0 and $ProcessStatus = -1">
                                    <td><label class="LABELAudit" >Process Status:</label></td>
                                    <td><INPUT readonly="readonly" class="TEXTAudit" name="PROCESSTAT" DBT="{DBT}" DBC="PROCESSTAT"  id="{DBT}__PROCESSTAT" MAXLENGTH="25" SIZE="22"/></td>
                                </xsl:if>
                                </tr>
                            </xsl:if>  

			
			<tr>
                        
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>       
                            <td><input Type="reset" style="visibility:HIDDEN;width:1px;height:1px" id="id_reset_1"/></td>
                                <xsl:for-each select="//BLOCK[@SCREEN = $screen and ID = 'BLK_STD_BUTTONS_IMG']/FIELD/TYPE[text()='BUTTON']">
				<td class="TDAuditButton" width="90%" rowspan="2" valign="middle">                                    
                                    <xsl:call-template name="dispStdButtonField_img_tmp"/>
				</td>
				</xsl:for-each>
			</tr>
			
		</table>
		</td>
	</tr>
</xsl:template>
-->


       <xsl:template match="BLOCK" mode="AuditEntry_Neo_Online_tmp">        
        <xsl:variable name="contractStatus" select = "//FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']/CONTRACT_STATUS"/>
        <xsl:variable name="authStatus" select = "//FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']/AUTH_STATUS"/>
        <xsl:variable name="paymentStatus" select = "//FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']/PAYMENT_STATUS"/>
        <xsl:variable name="collectionStatus" select = "//FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']/COLLECTION_STATUS"/>
        <xsl:variable name="ProcessStatus" select = "//FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']/PROCESS_STATUS"/>
        <xsl:variable name="dealStatus" select = "//FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']/DEAL_STATUS"/>
              <td CLASS="THEADAudit" style="width:95%">
                <TABLE  summary="" cellpadding="0" cellspacing="0" border="0" >
                            <TR>
                                     <TD><xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text></TD>
                                   <TD>
                                                 <label class="LABELAudit1" >Input by</label>
                                   </TD>
                                   
                                   <TD>
                                                 <LABEL CLASS="LABELAudit1">Date Time</LABEL>
                                   </TD>
                          
                                    <TD>
                                                 <LABEL CLASS="LABELAudit1">Authorized By</LABEL>
                                   </TD>
                                   <TD>
                                                 <LABEL CLASS="LABELAudit1">Date Time</LABEL>
                                   </TD>
                                <TD>
                                        <xsl:if test = "$contractStatus = -1">
                                          <LABEL CLASS="LABELAudit1">Contract Status</LABEL>                                          
                                        </xsl:if>  
                                        <xsl:if test = "$contractStatus = 0 and $paymentStatus = -1 and $collectionStatus = -1">
                                          <LABEL CLASS="LABELAudit1">Collection Status</LABEL>                                          
                                        </xsl:if>                                          
                                        <xsl:if test = "$contractStatus = 0 and $paymentStatus = 0 and $collectionStatus = -1">
                                          <LABEL CLASS="LABELAudit1">Collection Status</LABEL>                                          
                                        </xsl:if>  
                                        <xsl:if test = "$contractStatus = 0 and $paymentStatus = -1 and $collectionStatus = 0" >
                                          <LABEL CLASS="LABELAudit1">payment Status</LABEL>                                          
                                        </xsl:if>  
                                        <xsl:if test = "$contractStatus = 0 and $paymentStatus = 0 and $collectionStatus = 0 and ProcessStatus = -1">
                                          <LABEL CLASS="LABELAudit1">Process  Status</LABEL>                                          
                                        </xsl:if> 
                                        <xsl:if test = "$dealStatus = -1">
                                          <LABEL CLASS="LABELAudit1">Deal Status</LABEL>                                          
                                        </xsl:if> 
                                 </TD>
                                      
                                   <TD>
                                     <xsl:if test = "$authStatus = -1">
                                            <label class="LABELCheckAudit">
                                            <INPUT  TYPE="CHECKBOX" CLASS="CHECKBOXAudit" name="AUTHSTAT" DBT="{DBT}" DBC="AUTHSTAT"  id="{DBT}__AUTHSTAT"  ON="A" OFF="U" READONLY="true" MAXLENGTH="15" SIZE="17"/>
                                            Authorized
                                            </label>
                                     </xsl:if> 
                                     <xsl:if test = "$authStatus = 0 and $collectionStatus = -1 and $paymentStatus = -1 and $contractStatus = -1">
                                        <LABEL CLASS="LABELAudit1">Collection Status</LABEL>                                        
                                     </xsl:if>
                                     
                                     <xsl:if test = "$authStatus = 0 and $collectionStatus = -1 and $paymentStatus = -1 and $contractStatus = 0">
                                        <LABEL CLASS="LABELAudit1">Payment Status</LABEL>                                        
                                     </xsl:if>

                                     <xsl:if test = "$authStatus = 0 and $collectionStatus = 0 and $paymentStatus = 0 and $contractStatus = 0 and  ProcessStatus = -1">
                                        <LABEL CLASS="LABELAudit1">Process Status</LABEL>                                        
                                     </xsl:if>
                                    </TD>
                                   
				</TR>
				<TR>
                           <TD> <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text></TD>
                             <TD>
                                   <INPUT TYPE="TEXT"
                                      CLASS="TEXTAudit1"
                                      name="MAKERID"
                                      id="{DBT}__MAKERID"
                                      DBT="{DBT}"
                                      DBC="MAKERID"
                                      READONLY="true"
                                      MAXLENGTH="12" SIZE="12"/>
                               </TD>
                               <TD>
                                      <INPUT TYPE="HIDDEN" name="MAKERSTAMP" id="{DBT}__MAKERSTAMP" DBT="{DBT}" DBC="MAKERSTAMP" onpropertychange="fnFormatTimeStamp(this)"/>
                                      <INPUT TYPE="TEXT" CLASS="TEXTAudit1" name="MAKERSTAMPI" id="MAKERSTAMPI" READONLY="true" MAXLENGTH="19" SIZE="22"/>
                                </TD>
                                <TD>
                                       <INPUT TYPE="TEXT" CLASS="TEXTAudit1" name="CHECKERID" id="{DBT}__CHECKERID" DBT="{DBT}"
                                          DBC="CHECKERID" READONLY="true" MAXLENGTH="12" SIZE="12"/>
                                 </TD>
                                 <TD>
                                        <INPUT TYPE="HIDDEN" name="CHECKERSTAMP" id="{DBT}__CHECKERSTAMP" DBT="{DBT}" DBC="CHECKERSTAMP" onpropertychange="fnFormatTimeStamp(this)"/>                                                        
                                        <INPUT TYPE="TEXT" CLASS="TEXTAudit1" name="CHECKERSTAMPI" id="CHECKERSTAMPI" READONLY="true" MAXLENGTH="19" SIZE="22"/>
                                 </TD>
                                  <TD>
                                        <xsl:if test = "$contractStatus = -1">
                                                <INPUT TYPE="TEXT"  CLASS="TEXTAudit1" name="CONTSTAT" DBT="{DBT}" DBC="CONTSTAT"  id="{DBT}__CONTSTAT" READONLY="true" MAXLENGTH="15" SIZE="15"  />
                                           </xsl:if> 
                                        <xsl:if test = "$contractStatus = 0 and $paymentStatus = -1 and $collectionStatus = -1">
                                                <INPUT TYPE="TEXT"  CLASS="TEXTAudit1" name="COLLECTION_STATUS" DBT="{DBT}" DBC="COLLECTION_STATUS"  id="{DBT}__COLLECTION_STATUS" READONLY="true" MAXLENGTH="12" SIZE="12"/>
                                           </xsl:if>                                            
                                        <xsl:if test = "$contractStatus = 0 and $paymentStatus = 0 and $collectionStatus = -1">
                                                <INPUT TYPE="TEXT"  CLASS="TEXTAudit1" name="COLLECTION_STATUS" DBT="{DBT}" DBC="COLLECTION_STATUS"  id="{DBT}__COLLECTION_STATUS" READONLY="true" MAXLENGTH="12" SIZE="12"/>
                                           </xsl:if> 
                                        <xsl:if test = "$contractStatus = 0 and $paymentStatus = -1 and $collectionStatus = 0 " >
                                                <INPUT TYPE="TEXT"  CLASS="TEXTAudit1" name="PAYMENT_STATUS" DBT="{DBT}" DBC="PAYMENT_STATUS"  id="{DBT}__PAYMENT_STATUS" READONLY="true" MAXLENGTH="12" SIZE="12"/>
                                           </xsl:if> 
                                        <xsl:if test = "$contractStatus = 0 and $paymentStatus = 0 and $collectionStatus = 0 and $ProcessStatus = -1">
                                                <INPUT TYPE="TEXT"  CLASS="TEXTAudit1" name="PROCESSTAT" DBT="{DBT}" DBC="PROCESSTAT"  id="{DBT}__PROCESSTAT" READONLY="true" MAXLENGTH="25" SIZE="22"/>
                                        </xsl:if> 
                                        <xsl:if test = "$dealStatus = -1">
                                                <INPUT TYPE="TEXT"  CLASS="TEXTAudit1" name="DEAL_STATUS" DBT="{DBT}" DBC="DEAL_STATUS"  id="{DBT}__DEAL_STATUS" READONLY="true" MAXLENGTH="25" SIZE="22"/>
                                        </xsl:if>
                                    </TD>
                                    <TD> 
                                     <xsl:if test = "$authStatus = 0 and $collectionStatus = -1 and $paymentStatus = -1 and $contractStatus = -1">
                                                <INPUT TYPE="TEXT"  CLASS="TEXTAudit1" name="COLLECTION_STATUS" DBT="{DBT}" DBC="COLLECTION_STATUS"  id="{DBT}__COLLECTION_STATUS" READONLY="true" MAXLENGTH="12" SIZE="12"/>
                                     </xsl:if>
                                     <xsl:if test = "$authStatus = 0 and $collectionStatus = -1 and $paymentStatus = -1 and $contractStatus = 0">
                                                <INPUT TYPE="TEXT"  CLASS="TEXTAudit1" name="PAYMENT_STATUS" DBT="{DBT}" DBC="PAYMENT_STATUS"  id="{DBT}__PAYMENT_STATUS" READONLY="true" MAXLENGTH="12" SIZE="12"/>
                                     </xsl:if>
                                     <xsl:if test = "$authStatus = 0 and $collectionStatus = 0 and $paymentStatus = 0 and $contractStatus = 0 and  $ProcessStatus = -1">
                                                <INPUT TYPE="TEXT"  CLASS="TEXTAudit1" name="PROCESSTAT" DBT="{DBT}" DBC="PROCESSTAT"  id="{DBT}___PROCESSTAT" READONLY="true" MAXLENGTH="25" SIZE="22"/>
                                     </xsl:if>

									 <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
                                    </TD>                                    
					</TR>
                <xsl:variable name = "Reversal" select = "//FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']/REVERSAL"/>

                    <TR>                            
                             <TD STYLE = "color:#CCCCCC;">
                                  <xsl:if test = "$Reversal = -1">                             
                                                 <LABEL CLASS="LABELAudit1">Reversal</LABEL>
                                  </xsl:if>                                          
                                  <xsl:if test = "$Reversal = 0">                    
                                    <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
                                  </xsl:if>                                          
                              </TD>
                             <TD>
                                  <xsl:if test = "$Reversal = -1">                             
                                         <INPUT TYPE="TEXT" CLASS="TEXTAudit1" name="REVR_MAKERID" id="{DBT}__REVR_MAKERID"
                                            DBT="{DBT}" DBC="REVR_MAKERID" READONLY="true" MAXLENGTH="12" SIZE="12"/>
                                  </xsl:if>           
                                  <xsl:if test = "$Reversal = 0">                    
                                    <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
                                  </xsl:if>                                          
                               </TD>
                               <TD>
                                  <xsl:if test = "$Reversal = -1">                             
                                        <INPUT TYPE="HIDDEN" name="REVR_MAKERSTAMP" id="{DBT}__REVR_MAKERSTAMP" DBT="{DBT}" DBC="REVR_MAKERSTAMP" onpropertychange="fnFormatTimeStamp(this)"/>
                                        <INPUT TYPE="TEXT" CLASS="TEXTAudit1" name="REVR_MAKERSTAMPI" id="REVR_MAKERSTAMPI" READONLY="true" MAXLENGTH="19" SIZE="22"/>
                                  </xsl:if>                                          
                                  <xsl:if test = "$Reversal = 0">                    
                                    <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
                                  </xsl:if>                                          
                                </TD>
                                <TD>
                                  <xsl:if test = "$Reversal = -1">                             
                                         <INPUT TYPE="TEXT" CLASS="TEXTAudit1" name="REVR_CHECKERID" id="{DBT}__REVR_CHECKERID"
                                            DBT="{DBT}" DBC="REVR_CHECKERID" READONLY="true" MAXLENGTH="12" SIZE="12"/>
                                  </xsl:if>                                          
                                  <xsl:if test = "$Reversal = 0">                    
                                    <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
                                  </xsl:if>                                          
                                 </TD>
                                 <TD>
                                  <xsl:if test = "$Reversal = -1">                             
                                          <INPUT TYPE="HIDDEN" name="REVR_CHECKERSTAMP" id="{DBT}__REVR_CHECKERSTAMP" DBT="{DBT}" DBC="REVR_CHECKERSTAMP" onpropertychange="fnFormatTimeStamp(this)"/>                                                        
                                          <INPUT TYPE="TEXT" CLASS="TEXTAudit1" name="REVR_CHECKERSTAMPI" id="REVR_CHECKERSTAMPI" READONLY="true" MAXLENGTH="19" SIZE="22"/>
                                  </xsl:if>                                                                                 
                                  <xsl:if test = "$Reversal = 0">                    
                                    <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
                                  </xsl:if>                                          
                                 </TD>
                                  <TD>
                                        <xsl:if test = "$contractStatus = -1 and $paymentStatus = 0 and $collectionStatus = -1 and $authStatus = -1">
                                        <LABEL CLASS="LABELAudit1">Collection Status</LABEL>                                          
                                      </xsl:if>  
                                      <xsl:if test = "$contractStatus = -1 and $paymentStatus = -1 and $collectionStatus = 0 and $authStatus = -1">
                                        <LABEL CLASS="LABELAudit1">Payment Status</LABEL>                                          
                                      </xsl:if>  
                                        <xsl:if test = "$contractStatus = 0 and $paymentStatus = -1 and $collectionStatus = -1 and $authStatus = -1">
                                        <LABEL CLASS="LABELAudit1">Payment Status</LABEL>                                          
                                      </xsl:if>  
                                        <xsl:if test = "$contractStatus = -1 and $paymentStatus = -1 and $collectionStatus = -1 and $authStatus = 0">
                                        <LABEL CLASS="LABELAudit1">Payment Status</LABEL>                                          
                                      </xsl:if>  
                                      <xsl:if test = "$contractStatus = -1 and $paymentStatus = 0 and $collectionStatus = 0 and $authStatus = -1 and $ProcessStatus = -1">
                                        <LABEL CLASS="LABELAudit1">Process Status</LABEL>                                          
                                      </xsl:if>  
                                      <xsl:if test = "$contractStatus = 0 and $paymentStatus = -1 and $collectionStatus = -1 and $authStatus = 0 and $ProcessStatus = -1">
                                        <LABEL CLASS="LABELAudit1">Process Status</LABEL>                                          
                                      </xsl:if>  
                                      
                                  </TD>
                                    <TD> 
                                        <xsl:if test = "$contractStatus = -1 and $paymentStatus = 0 and $collectionStatus = -1 and $authStatus = -1">
                                                <INPUT TYPE="TEXT"  CLASS="TEXTAudit1" name="COLLECTION_STATUS" DBT="{DBT}" DBC="COLLECTION_STATUS"  id="{DBT}__COLLECTION_STATUS" READONLY="true" MAXLENGTH="15" SIZE="17"/>
                                        </xsl:if>  
                                        <xsl:if test = "$contractStatus = -1 and $paymentStatus = -1 and $collectionStatus = 0 and $authStatus = -1">
                                                <INPUT TYPE="TEXT"  CLASS="TEXTAudit1" name="PAYMENT_STATUS" DBT="{DBT}" DBC="PAYMENT_STATUS"  id="{DBT}__PAYMENT_STATUS" READONLY="true" MAXLENGTH="15" SIZE="17"/>
                                        </xsl:if>  
                                        <xsl:if test = "$contractStatus = 0 and $paymentStatus = -1 and $collectionStatus = -1 and $authStatus = -1">
                                                <INPUT TYPE="TEXT"  CLASS="TEXTAudit1" name="PAYMENT_STATUS" DBT="{DBT}" DBC="PAYMENT_STATUS"  id="{DBT}__PAYMENT_STATUS" READONLY="true" MAXLENGTH="15" SIZE="17"/>
                                        </xsl:if>  
                                        <xsl:if test = "$contractStatus = -1 and $paymentStatus = -1 and $collectionStatus = -1 and $authStatus = 0">
                                                <INPUT TYPE="TEXT"  CLASS="TEXTAudit1" name="PAYMENT_STATUS" DBT="{DBT}" DBC="PAYMENT_STATUS"  id="{DBT}__PAYMENT_STATUS" READONLY="true" MAXLENGTH="15" SIZE="17"/>
                                        </xsl:if>  
                                        <xsl:if test = "$contractStatus = -1 and $paymentStatus = 0 and $collectionStatus = 0 and $authStatus = -1 and $ProcessStatus = -1">
                                                <INPUT TYPE="TEXT"  CLASS="TEXTAudit1" name="PROCESSTAT" DBT="{DBT}" DBC="PROCESSTAT"  id="{DBT}__PROCESSTAT" READONLY="true" MAXLENGTH="25" SIZE="22"/>
                                        </xsl:if>  
										<xsl:if test = "$contractStatus = 0 and $paymentStatus = -1 and $collectionStatus = -1 and $authStatus = 0 and $ProcessStatus = -1">
                                                <INPUT TYPE="TEXT"  CLASS="TEXTAudit1" name="PROCESSTAT" DBT="{DBT}" DBC="PROCESSTAT"  id="{DBT}__PROCESSTAT" READONLY="true" MAXLENGTH="25" SIZE="22"/>
                                        </xsl:if>  
                                    </TD>   
                                
                                <td>
                                <input Type="reset" style="visibility:HIDDEN;width:1px;height:1px" id="id_reset_1"/></td>

                                <xsl:for-each select="//BLOCK[@SCREEN = $screen and ID = 'BLK_STD_BUTTONS_IMG']/FIELD/TYPE[text()='BUTTON']">
                                    <td class="TDAuditButton" width="90%" rowspan="2" valign="middle">                                    
                                        <xsl:call-template name="dispStdButtonField_img_tmp"/>
                                    </td>
                                </xsl:for-each>
                                 
                 </TR>
              </TABLE>

              </td>
       </xsl:template>


    <xsl:template name = "CacheAuditValues_tmp">
    <script language = "javascript"  DEFER="DEFER"> 
    var l_OnlineAuditVals = new Array()
        l_OnlineAuditVals["A"]="Active";
	l_OnlineAuditVals["C"]="Closed";
	l_OnlineAuditVals["E"]="Exercised";
	l_OnlineAuditVals["H"]="Hold";
	l_OnlineAuditVals["I"]="Knocked In";
	l_OnlineAuditVals["K"]="Cancelled";
	l_OnlineAuditVals["L"]="Liquidated";
	l_OnlineAuditVals["R"]="Reversed";
	l_OnlineAuditVals["S"]="Closed";
	l_OnlineAuditVals["V"]="Reversed";
	l_OnlineAuditVals["W"]="Knocked Out";
	l_OnlineAuditVals["X"]="Expired";
	l_OnlineAuditVals["Y"]="Uninitiated";
	l_OnlineAuditVals["O"]="Open";
    var l_OnlineAuditDesc = new Array()
        l_OnlineAuditDesc["Active"]="A";
	l_OnlineAuditDesc["Closed"]="C";
	l_OnlineAuditDesc["Exercised"]="E";
	l_OnlineAuditDesc["Hold"]="H";
	l_OnlineAuditDesc["Knocked In"]="I";
	l_OnlineAuditDesc["Cancelled"]="K";
	l_OnlineAuditDesc["Liquidated"]="L";
	l_OnlineAuditDesc["Reversed"]="R";
	l_OnlineAuditDesc["Closed"]="S";
	l_OnlineAuditDesc["Reversed"]="V";
	l_OnlineAuditDesc["Knocked Out"]="W";
	l_OnlineAuditDesc["Expired"]="X";
	l_OnlineAuditDesc["Uninitiated"]="Y";
	l_OnlineAuditDesc["Open"]="O";   
    var l_OnlineProcessStatusVals = new Array();
        l_OnlineProcessStatusVals["N"] = "Pending Authorization";
        l_OnlineProcessStatusVals["A"] = "Pending Release";
        l_OnlineProcessStatusVals["P"] = "Processed";
        l_OnlineProcessStatusVals["F"] = "Failed Verification";
        l_OnlineProcessStatusVals["H"] = "Hold";
    var l_OnlineProcessStatusDesc = new Array();
        l_OnlineProcessStatusDesc["Pending Authorization"]="N";
        l_OnlineProcessStatusDesc["Pending Release"]="A";
        l_OnlineProcessStatusDesc["Processed"]="P";
        l_OnlineProcessStatusDesc["Failed Verification"]="F";
        l_OnlineProcessStatusDesc["Hold"]="H";
  </script>
    </xsl:template>

</xsl:stylesheet>
