<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
       <!-- Takes care of features common in Audit Bar for Absolute/Column Positioning -->
       <xsl:variable name = "Brn_Neo" select = "normalize-space(//FORM/@MASTER)"/> 
       
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
                        
                        
                        <!--<table class="TABLEAudit" width="99%" border="0" cellspacing="0" cellpadding="0" DBT="{/FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']/DBT}" summary="Audit information">-->
                        <table summary="" cellpadding="0" cellspacing="0" border="0" width="99%" >                        
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
                                                <xsl:if test=" (  $isChildFunc='N' )">
						<!-- Retro from FC_UBS_V.UM_10.2.0.0.LoanOrigination.1.0 Start -->
						 <td CLASS="THEADAudit" style="width:95%">
							<xsl:apply-templates select="/FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']" mode="AuditEntry_Neo_Online_tmp_bpel"/>                                                
						<!-- Retro from FC_UBS_V.UM_10.2.0.0.LoanOrigination.1.0 End -->	
                                                 <xsl:call-template name="AuditEntry_Neo_Process_tmp"/>
						 </td>       <!-- Retro from FC_UBS_V.UM_10.2.0.0.LoanOrigination.1.0  -->                                                                                           
                                                 </xsl:if>
                                                <xsl:if test="($isChildFunc!='N' )">
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
		<td width="98%" valign="top">
			<fieldset class="FSTcell">
				<legend>Untitled group</legend>
				<div class="DIVText">
					<label for="{DBT}__MAKER_ID" class="LABELNormal">
						<xsl:value-of select="$makerId" />
					</label>
					<input type="TEXT" class="TEXTAudit1" name="MAKER_ID" id="{DBT}__MAKER_ID" tabindex="-1" dbt="{DBT}" dbc="MAKER_ID" readonly="readonly" maxlength="12" size="12"/>
				</div>
				<div class="DIVText">
					<label for="{DBT}__MAKER_DT_STAMP" class="LABELNormal">
						<xsl:value-of select="$DtStamp" />
					</label>
					<INPUT TYPE="HIDDEN" name="MAKER_DT_STAMP" id="{DBT}__MAKER_DT_STAMP" DBT="{DBT}" DBC="MAKER_DT_STAMP" onpropertychange="fnFormatTimeStamp(this)"/>
					<input type="TEXT" class="TEXTAudit1" name="MAKER_DT_STAMPI" id="MAKER_DT_STAMPI" tabindex="-1" readonly="readonly" maxlength="19" size="22"/>
				</div>
			</fieldset>
			<fieldset class="FSTcell">
				<legend>Untitled group</legend>
				<div class="DIVText">
					<label for="{DBT}__CHECKER_ID" class="LABELNormal">
						<xsl:value-of select="$checkerId" />
					</label>
					<input type="TEXT" class="TEXTAudit1" name="CHECKER_ID" id="{DBT}__CHECKER_ID" tabindex="-1" dbt="{DBT}" dbc="CHECKER_ID" readonly="readonly" maxlength="12" size="12"/>
				</div>
				<div class="DIVText">
					<label for="CHECKER_DT_STAMPI" class="LABELNormal">
						<xsl:value-of select="$DtStamp" />
					</label>
					<input TYPE="HIDDEN" name="CHECKER_DT_STAMP" id="{DBT}__CHECKER_DT_STAMP" DBT="{DBT}" DBC="CHECKER_DT_STAMP" onpropertychange="fnFormatTimeStamp(this)"/>
					<input type="TEXT" class="TEXTAudit1" name="CHECKER_DT_STAMPI" id="CHECKER_DT_STAMPI" tabindex="-1" readonly="readonly" maxlength="19" size="22"/>
				</div>
			</fieldset>
			<fieldset class="FSTcell">
				<legend>Untitled group</legend>
				<div class="DIVText">
					<label for="{DBT}__MOD_NO" class="LABELNormal">
						<xsl:value-of select="$modNo" />
					</label>
					<input type="TEXT" class="TEXTAudit1 numeric" name="MOD_NO" id="{DBT}__MOD_NO" tabindex="-1" dbt="{DBT}" dbc="MOD_NO" readonly="readonly" maxlength="4" size="3"/>
				</div>
			</fieldset>
			<fieldset class="FSTcell">
				<legend>Untitled group</legend>
				<div class="DIVText">
					<label class="LABELCheckAudit" for="{DBT}__AUTH_STAT">
            <input type="checkbox" name="AUTH_STAT" id="{DBT}__AUTH_STAT" DBT="{DBT}" DBC="AUTH_STAT" DISABLED="true" onclick="fnWhenAuditChange()"/>
            <xsl:value-of select="$authStat" />
          </label>
					<input TYPE="HIDDEN" name="ONCE_AUTH" id="{DBT}__ONCE_AUTH" DBT="{DBT}" DBC="ONCE_AUTH"/>
				</div>
				<div class="DIVText">
					<label class="LABELCheckAudit" for="{DBT}__RECORD_STAT">
            <input TYPE="CHECKBOX" name="RECORD_STAT" id="{DBT}__RECORD_STAT" DBT="{DBT}" DBC="RECORD_STAT" DISABLED="true" onclick="fnWhenAuditChange()"/>
            <xsl:value-of select="$recStat" />
          </label>
				</div>
			</fieldset>
		</td>
		<td class="TDbtnfooter">
			<input Type="reset" style="visibility:HIDDEN;width:1px;height:1px" id="id_reset_1"/>
			<xsl:for-each select="//BLOCK[@SCREEN = $screen and ID = 'BLK_STD_BUTTONS_IMG']/FIELD/TYPE[text()='BUTTON']">
					<xsl:call-template name="dispStdButtonField_img_tmp"/>
			</xsl:for-each>
		</td>
		</tr>
</xsl:template>            
       
       <!-- Added By Fahad as part of Process Screens -->
       
       <!-- Added By Fahad as part of Process Screens -->
       
       <xsl:template name="AuditEntry_Neo_Process_tmp">
          <td CLASS="THEADAudit" style="width:95%">
                 <TABLE CLASS="TABLEAudit" summary=""
                        cellpadding="0" cellspacing="0" border="0"
                        style="width:99%;">

                        <TR CLASS="TRAudit">
                                <TD CLASS="TDAudit" style="vertical-align:top" >
                                    <NOBR>
                                             <LABEL CLASS="LABELAudit" style="margin-top:0px;"><xsl:value-of select="$remarks" /></LABEL>
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
                               <TD CLASS="TDAudit" style="vertical-align:top" >
                                    <NOBR>
                                             <LABEL CLASS="LABELAudit" style="margin-top:0px;"><xsl:value-of select="$priority" /></LABEL>
                                    </NOBR>                        
                                </TD>
                               <TD CLASS="fieldAudit" >
                                    <NOBR>
                                            <SELECT CLASS="SELECTList" ID="DROP_PRIORITYLIST" STYLE="width:70px;">
											<OPTION CLASS="SELECTListOption" VALUE="0" DEFAULT="0"></OPTION>
											<OPTION CLASS="SELECTListOption" VALUE="1"><xsl:value-of select="$normal" /></OPTION>
                                            <OPTION CLASS="SELECTListOption" VALUE="2"><xsl:value-of select="$high" /></OPTION>
                                            </SELECT>
                                    </NOBR>
                               </TD>
                               <TD CLASS="TDAudit" STYLE="display: none;">
                                    <NOBR>
                                            <BUTTON CLASS="INPUTButton" ID="BTN_GETPRIORITY" NAME="BTN_GETPRIORITY" STYLE="width:85px;" onclick="fnShowGetPriority()"><xsl:value-of select="$getPriority" /></BUTTON>
                               
                                    </NOBR>
                               </TD>
                               
                               <TD CLASS="TDAudit">
                                    <NOBR>
                                            <BUTTON CLASS="INPUTButton" ID="BTN_ERRSCR" NAME="BTN_ERRSCR" STYLE="width:70px;" onclick="fnShowErrorScreen()"><xsl:value-of select="$showErr" /></BUTTON>
                               
                                    </NOBR>
                               </TD>                                  
                               <TD CLASS="TDAudit">
                                    <NOBR>
                                            <BUTTON CLASS="INPUTButton" ID="BTN_AUDIT" NAME="BTN_AUDIT" onclick="fnBpelAudit()"><xsl:value-of select="$audit" /></BUTTON>
                                    </NOBR>
                               </TD>                               
                               
                               <TD CLASS="fieldAudit">
                                      <NOBR>    
                                                <SELECT CLASS="SELECTList" ID="PROCESS_ACTIONS" STYLE="width:200px;">
                                                    <OPTION CLASS="SELECTListOption" VALUE="ACCEPT"><xsl:value-of select="$accept" /></OPTION>                                                    
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
    <table class="TABLEAudit" width="99%" border="0" cellspacing="0" cellpadding="0" summary="">
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
            <xsl:attribute name="VALUE">
                <xsl:value-of select="$exit"/>
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
            <xsl:attribute name="VALUE">
                <xsl:value-of select="$ok"/>
            </xsl:attribute>
        </input>
    </xsl:if>
    
    
</xsl:template>


       <xsl:template name="Without_AuditEntry_tmp">        
            <tr>
                <td class="THEADAudit" style="width:95%">
                    <table class="TABLEAudit" summary="" cellpadding="0" cellspacing="0" border="0" style="width:99%;">
                        <tr>            
                        <td><xsl:text disable-output-escaping="yes">&#160;</xsl:text></td>
                        <td><xsl:text disable-output-escaping="yes">&#160;</xsl:text></td>
                        <td><xsl:text disable-output-escaping="yes">&#160;</xsl:text></td>
                        <td><xsl:text disable-output-escaping="yes">&#160;</xsl:text></td>
                        <td><xsl:text disable-output-escaping="yes">&#160;</xsl:text></td>
                        <td><xsl:text disable-output-escaping="yes">&#160;</xsl:text></td>
                        <td><xsl:text disable-output-escaping="yes">&#160;</xsl:text></td>
                        <td><input Type="reset" style="visibility:HIDDEN;width:1px;height:1px" id="id_reset_1"/></td>
                            <xsl:for-each select="//BLOCK[@SCREEN = $screen and ID = 'BLK_STD_BUTTONS_IMG']/FIELD/TYPE[text()='BUTTON']">
                        <td class="TDAuditButton" width="90%" rowspan="2" valign="middle">                                    
                                    <xsl:call-template name="dispStdButtonField_img_tmp"/>
                        </td>
                            </xsl:for-each>
                    </tr>
                    <tr>
                        <td><xsl:text disable-output-escaping="yes">&#160;</xsl:text></td>
                        <td><xsl:text disable-output-escaping="yes">&#160;</xsl:text></td>
                        <td><xsl:text disable-output-escaping="yes">&#160;</xsl:text></td>
                        <td><xsl:text disable-output-escaping="yes">&#160;</xsl:text></td>
                        <td><xsl:text disable-output-escaping="yes">&#160;</xsl:text></td>
                        <td><xsl:text disable-output-escaping="yes">&#160;</xsl:text></td>
                        <td><xsl:text disable-output-escaping="yes">&#160;</xsl:text></td>
                        <td><xsl:text disable-output-escaping="yes">&#160;</xsl:text></td>
                    </tr>
                </table>
            </td>
        </tr>
    </xsl:template>




       <xsl:template match="BLOCK" mode="AuditEntry_Neo_Online_tmp">        
        <xsl:variable name="contractStatus" select = "//FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']/CONTRACT_STATUS"/>
        <xsl:variable name="authStatus" select = "//FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']/AUTH_STATUS"/>
        <xsl:variable name="paymentStatus" select = "//FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']/PAYMENT_STATUS"/>
        <xsl:variable name="collectionStatus" select = "//FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']/COLLECTION_STATUS"/>
        <xsl:variable name="ProcessStatus" select = "//FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']/PROCESS_STATUS"/>
        <xsl:variable name="dealStatus" select = "//FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']/DEAL_STATUS"/>
            <tr><td width="98%" valign="top">
                <fieldset class="FSTcell">
                	<legend>Untitled group</legend>
					<div class="DIVText">
                    	<label class="LABELNormal" for="{DBT}__MAKERID"><xsl:value-of select="$makerId"/></label>
                        <INPUT TYPE="TEXT" CLASS="TEXTAudit1" name="MAKERID" id="{DBT}__MAKERID" tabindex="-1" DBT="{DBT}" DBC="MAKERID" READONLY="true" MAXLENGTH="12" SIZE="12"/>
                   	</div>
                    <div class="DIVText">
                    	<LABEL CLASS="LABELNormal" for="{DBT}__MAKERSTAMPI"><xsl:value-of select="$DtStamp"/></LABEL>
                        <INPUT TYPE="HIDDEN" name="MAKERSTAMP" id="{DBT}__MAKERSTAMP" DBT="{DBT}" DBC="MAKERSTAMP" onpropertychange="fnFormatTimeStamp(this)"/>
                        <INPUT TYPE="TEXT" CLASS="TEXTAudit1" name="MAKERSTAMPI" id="{DBT}__MAKERSTAMPI" tabindex="-1" READONLY="true" MAXLENGTH="19" SIZE="22"/>
					</div>
               	</fieldset>
                <fieldset class="FSTcell">
					<legend>Untitled group</legend>
					<div class="DIVText">
                    	<label class="LABELNormal" for="{DBT}__CHECKERID"><xsl:value-of select="$checkerId"/></label>
                        <INPUT TYPE="TEXT" CLASS="TEXTAudit1" name="CHECKERID" id="{DBT}__CHECKERID" tabindex="-1" DBT="{DBT}" DBC="CHECKERID" READONLY="true" MAXLENGTH="12" SIZE="12"/>
					</div>
					<div class="DIVText">
                    	<LABEL CLASS="LABELNormal" for="CHECKERSTAMPI"><xsl:value-of select="$DtStamp"/></LABEL>
                        <INPUT TYPE="HIDDEN" name="CHECKERSTAMP" id="{DBT}__CHECKERSTAMP" DBT="{DBT}" DBC="CHECKERSTAMP" onpropertychange="fnFormatTimeStamp(this)"/> 
                        <INPUT TYPE="TEXT" CLASS="TEXTAudit1" name="CHECKERSTAMPI" id="CHECKERSTAMPI" tabindex="-1" READONLY="true" MAXLENGTH="19" SIZE="22"/>
					</div>
              	</fieldset>
                <!--<fieldset class="FSTcell">
                	<legend>Untitled group</legend>
					<div class="DIVText">
                        <xsl:if test = "$contractStatus = -1">
                            <LABEL CLASS="LABELNormal"><xsl:value-of select="$contractStat"/></LABEL>                                          
                        </xsl:if>  
                        <xsl:if test = "$contractStatus = 0 and $paymentStatus = -1 and $collectionStatus = -1">
                            <LABEL CLASS="LABELNormal"><xsl:value-of select="$collectionStat"/></LABEL>                                          
                        </xsl:if>                                          
                        <xsl:if test = "$contractStatus = 0 and $paymentStatus = 0 and $collectionStatus = -1">
                            <LABEL CLASS="LABELNormal"><xsl:value-of select="$collectionStat"/></LABEL>                                          
                        </xsl:if>  
                        <xsl:if test = "$contractStatus = 0 and $paymentStatus = -1 and $collectionStatus = 0" >
                            <LABEL CLASS="LABELNormal"><xsl:value-of select="$paymentStat"/></LABEL>                                          
                        </xsl:if>  
                        <xsl:if test = "$contractStatus = 0 and $paymentStatus = 0 and $collectionStatus = 0 and ProcessStatus = -1">
                            <LABEL CLASS="LABELNormal"><xsl:value-of select="$processStat"/></LABEL>                                          
                        </xsl:if> 
                        <xsl:if test = "$dealStatus = -1">
                            <LABEL CLASS="LABELNormal"><xsl:value-of select="$dealStat"/></LABEL>                                          
                        </xsl:if>
					</div>
              	</fieldset>-->
                <fieldset class="FSTcell">
                  	<legend>Untitled group</legend>
                    <div class="DIVText">
                    	<xsl:if test = "$contractStatus = -1">
                           	<LABEL CLASS="LABELAudit1" for="{DBT}__CONTSTAT"><xsl:value-of select="$contractStat"/></LABEL>
							<INPUT TYPE="TEXT"  CLASS="TEXTAudit1" name="CONTSTAT" tabindex="-1" DBT="{DBT}" DBC="CONTSTAT"  id="{DBT}__CONTSTAT" READONLY="true" MAXLENGTH="15" SIZE="15"  />
                        </xsl:if> 
                        <xsl:if test = "$contractStatus = 0 and $paymentStatus = -1 and $collectionStatus = -1">
                        	<LABEL CLASS="LABELAudit1" for="{DBT}__COLLECTION_STATUS"><xsl:value-of select="$collectionStat"/></LABEL>
							<INPUT TYPE="TEXT"  CLASS="TEXTAudit1" name="COLLECTION_STATUS" tabindex="-1" DBT="{DBT}" DBC="COLLECTION_STATUS"  id="{DBT}__COLLECTION_STATUS" READONLY="true" MAXLENGTH="12" SIZE="12"/>
                        </xsl:if>                                            
                        <xsl:if test = "$contractStatus = 0 and $paymentStatus = 0 and $collectionStatus = -1">
                        	<LABEL CLASS="LABELAudit1" for="{DBT}__COLLECTION_STATUS"><xsl:value-of select="$collectionStat"/></LABEL>
							<INPUT TYPE="TEXT"  CLASS="TEXTAudit1" name="COLLECTION_STATUS" tabindex="-1" DBT="{DBT}" DBC="COLLECTION_STATUS"  id="{DBT}__COLLECTION_STATUS" READONLY="true" MAXLENGTH="12" SIZE="12"/>
                        </xsl:if> 
                        <xsl:if test = "$contractStatus = 0 and $paymentStatus = -1 and $collectionStatus = 0 " >
                        	<LABEL CLASS="LABELAudit1" for="{DBT}__PAYMENT_STATUS"><xsl:value-of select="$paymentStat"/></LABEL>
                            <INPUT TYPE="TEXT"  CLASS="TEXTAudit1" name="PAYMENT_STATUS" tabindex="-1" DBT="{DBT}" DBC="PAYMENT_STATUS"  id="{DBT}__PAYMENT_STATUS" READONLY="true" MAXLENGTH="12" SIZE="12"/>
                        </xsl:if> 
                        <xsl:if test = "$contractStatus = 0 and $paymentStatus = 0 and $collectionStatus = 0 and $ProcessStatus = -1">
                        	<LABEL CLASS="LABELAudit1" for="{DBT}__PROCESSTAT"><xsl:value-of select="$processStat"/></LABEL>
							<INPUT TYPE="TEXT"  CLASS="TEXTAudit1" name="PROCESSTAT" tabindex="-1" DBT="{DBT}" DBC="PROCESSTAT"  id="{DBT}__PROCESSTAT" READONLY="true" MAXLENGTH="25" SIZE="22"/>
                        </xsl:if> 
                        <xsl:if test = "$dealStatus = -1">
                        	<LABEL CLASS="LABELAudit1" for="{DBT}__DEAL_STATUS"><xsl:value-of select="$dealStat"/></LABEL>
							<INPUT TYPE="TEXT"  CLASS="TEXTAudit1" name="DEAL_STATUS" tabindex="-1" DBT="{DBT}" DBC="DEAL_STATUS"  id="{DBT}__DEAL_STATUS" READONLY="true" MAXLENGTH="25" SIZE="22"/>
                        </xsl:if>
                        <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
					</div>
              	</fieldset>
                <fieldset class="FSTcell">
                	<legend>Untitled group</legend>
					<div class="DIVText">
                    	<xsl:if test = "$authStatus = -1">
                        <label class="LABELCheckAudit" for="{DBT}__AUTHSTAT">
						<INPUT  TYPE="CHECKBOX" CLASS="CHECKBOXAudit" name="AUTHSTAT" DBT="{DBT}" DBC="AUTHSTAT"  id="{DBT}__AUTHSTAT"  ON="A" OFF="U" READONLY="true" MAXLENGTH="15" SIZE="17"/>
						<xsl:value-of select="$authStat" /></label>
                            </xsl:if> 
                            <xsl:if test = "$authStatus = 0 and $collectionStatus = -1 and $paymentStatus = -1 and $contractStatus = -1">
                                <LABEL CLASS="LABELNormal"><xsl:value-of select="$collectionStat"/></LABEL>                                        
                            </xsl:if>
                            <xsl:if test = "$authStatus = 0 and $collectionStatus = -1 and $paymentStatus = -1 and $contractStatus = 0">
                                <LABEL CLASS="LABELNormal"><xsl:value-of select="$paymentStat"/></LABEL>                                        
                            </xsl:if>
                            <xsl:if test = "$authStatus = 0 and $collectionStatus = 0 and $paymentStatus = 0 and $contractStatus = 0 and  ProcessStatus = -1">
                                <LABEL CLASS="LABELNormal"><xsl:value-of select="$processStat"/></LABEL>                                        
                            </xsl:if>
                            <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
			</div>
                    </fieldset>
                    
                    <fieldset class="FSTcell">
                        <legend>Untitled group</legend>
			<div class="DIVText">
                            <xsl:if test = "$authStatus = 0 and $collectionStatus = -1 and $paymentStatus = -1 and $contractStatus = -1">
                                <LABEL CLASS="LABELAudit1" for="{DBT}__COLLECTION_STATUS"></LABEL>
				<INPUT TYPE="TEXT"  CLASS="TEXTAudit1" name="COLLECTION_STATUS" tabindex="-1" DBT="{DBT}" DBC="COLLECTION_STATUS"  id="{DBT}__COLLECTION_STATUS" READONLY="true" MAXLENGTH="12" SIZE="12"/>
                            </xsl:if>
                            <xsl:if test = "$authStatus = 0 and $collectionStatus = -1 and $paymentStatus = -1 and $contractStatus = 0">
                                <LABEL CLASS="LABELAudit1" for="{DBT}__PAYMENT_STATUS"></LABEL>
				<INPUT TYPE="TEXT"  CLASS="TEXTAudit1" name="PAYMENT_STATUS" tabindex="-1" DBT="{DBT}" DBC="PAYMENT_STATUS"  id="{DBT}__PAYMENT_STATUS" READONLY="true" MAXLENGTH="12" SIZE="12"/>
                            </xsl:if>
                            <xsl:if test = "$authStatus = 0 and $collectionStatus = 0 and $paymentStatus = 0 and $contractStatus = 0 and  $ProcessStatus = -1">
                                <LABEL CLASS="LABELAudit1" for="{DBT}___PROCESSTAT"></LABEL>
				<INPUT TYPE="TEXT"  CLASS="TEXTAudit1" name="PROCESSTAT" tabindex="-1" DBT="{DBT}" DBC="PROCESSTAT"  id="{DBT}___PROCESSTAT" READONLY="true" MAXLENGTH="25" SIZE="22"/>
                            </xsl:if>
                            <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
			</div>
                    </fieldset>
                    <xsl:variable name = "Reversal" select = "//FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']/REVERSAL"/>
			<xsl:if test = "$Reversal = -1">
			<fieldset class="FIELDSETNormalAudit" style="clear:both"> <!--12_0_1_RETRO_12_2_23656318-->
                            <legend><xsl:value-of select="$reversal"/></legend>
                            <fieldset class="FSTcell">
                                <div class="DIVText">
                                    <LABEL CLASS="LABELNormal" for="{DBT}__REVR_MAKERID"><xsl:value-of select="$makerId"/></LABEL>
                                    <INPUT TYPE="TEXT" CLASS="TEXTAudit1" name="REVR_MAKERID" id="{DBT}__REVR_MAKERID" tabindex="-1" DBT="{DBT}" DBC="REVR_MAKERID" READONLY="true" MAXLENGTH="12" SIZE="12"/>					
                                </div>
                                <div class="DIVText">
                                    <LABEL CLASS="LABELNormal" for="REVR_MAKERSTAMPI"><xsl:value-of select="$DtStamp"/></LABEL>
                                    <INPUT TYPE="HIDDEN" name="MAKERSTAMP" id="{DBT}__REVR_MAKERSTAMP" DBT="{DBT}" DBC="REVR_MAKERSTAMP" onpropertychange="fnFormatTimeStamp(this)"/>
                                    <INPUT TYPE="TEXT" CLASS="TEXTAudit1" name="REVR_MAKERSTAMPI" id="REVR_MAKERSTAMPI" tabindex="-1" READONLY="true" MAXLENGTH="19" SIZE="22"/>
                                </div>
                            </fieldset>
                            <fieldset class="FSTcell">
                                <legend>Untitled group</legend>
				<div class="DIVText">
                                    <label class="LABELNormal" for="{DBT}__REVR_CHECKERID"><xsl:value-of select="$checkerId"/></label>
                                    <INPUT TYPE="TEXT" CLASS="TEXTAudit1" name="REVR_CHECKERID" id="{DBT}__REVR_CHECKERID" tabindex="-1"
                                                                                    DBT="{DBT}" DBC="REVR_CHECKERID" READONLY="true" MAXLENGTH="12" SIZE="12"/>
                                </div>
                                <div class="DIVText">
                                    <LABEL CLASS="LABELNormal" for="REVR_CHECKERSTAMPI"><xsl:value-of select="$DtStamp"/></LABEL>
                                    <INPUT TYPE="HIDDEN" name="REVR_CHECKERSTAMP" id="{DBT}__REVR_CHECKERSTAMP" DBT="{DBT}" DBC="REVR_CHECKERSTAMP" onpropertychange="fnFormatTimeStamp(this)"/>                                                        
                                    <INPUT TYPE="TEXT" CLASS="TEXTAudit1" name="REVR_CHECKERSTAMPI" id="REVR_CHECKERSTAMPI" tabindex="-1" READONLY="true" MAXLENGTH="19" SIZE="22"/>
                                </div>
                            </fieldset>
                            <fieldset class="FSTcell">
                                <legend>Untitled group</legend>
                                <div class="DIVText">
                                    <xsl:if test = "$contractStatus = -1 and $paymentStatus = 0 and $collectionStatus = -1 and $authStatus = -1">
                                        <LABEL CLASS="LABELAudit1"><xsl:value-of select="$collectionStat"/></LABEL>                                          
                                    </xsl:if>  
                                    <xsl:if test = "$contractStatus = -1 and $paymentStatus = -1 and $collectionStatus = 0 and $authStatus = -1">
                                        <LABEL CLASS="LABELAudit1"><xsl:value-of select="$paymentStat"/></LABEL>                                          
                                    </xsl:if>  
                                    <xsl:if test = "$contractStatus = 0 and $paymentStatus = -1 and $collectionStatus = -1 and $authStatus = -1">
                                        <LABEL CLASS="LABELAudit1"><xsl:value-of select="$paymentStat"/></LABEL>                                          
                                    </xsl:if>  
                                    <xsl:if test = "$contractStatus = -1 and $paymentStatus = -1 and $collectionStatus = -1 and $authStatus = 0">
                                        <LABEL CLASS="LABELAudit1"><xsl:value-of select="$paymentStat"/></LABEL>                                          
                                    </xsl:if>  
                                    <xsl:if test = "$contractStatus = -1 and $paymentStatus = 0 and $collectionStatus = 0 and $authStatus = -1 and $ProcessStatus = -1">
                                        <LABEL CLASS="LABELAudit1"><xsl:value-of select="$processStat"/></LABEL>                                          
                                    </xsl:if>  
                                    <xsl:if test = "$contractStatus = 0 and $paymentStatus = -1 and $collectionStatus = -1 and $authStatus = 0 and $ProcessStatus = -1">
                                        <LABEL CLASS="LABELAudit1"><xsl:value-of select="$processStat"/></LABEL>                                          
                                    </xsl:if>
                                </div>
                            </fieldset>
                            <fieldset class="FSTcell">
                                <legend>Untitled group</legend>
                                <div class="DIVText">
                                    <xsl:if test = "$contractStatus = -1 and $paymentStatus = 0 and $collectionStatus = -1 and $authStatus = -1">
                                        <INPUT TYPE="TEXT"  CLASS="TEXTAudit1" name="COLLECTION_STATUS" tabindex="-1" DBT="{DBT}" DBC="COLLECTION_STATUS"  id="{DBT}__COLLECTION_STATUS" READONLY="true" MAXLENGTH="15" SIZE="17"/>
                                    </xsl:if>  
                                    <xsl:if test = "$contractStatus = -1 and $paymentStatus = -1 and $collectionStatus = 0 and $authStatus = -1">
                                        <INPUT TYPE="TEXT"  CLASS="TEXTAudit1" name="PAYMENT_STATUS" tabindex="-1" DBT="{DBT}" DBC="PAYMENT_STATUS"  id="{DBT}__PAYMENT_STATUS" READONLY="true" MAXLENGTH="15" SIZE="17"/>
                                    </xsl:if>  
                                    <xsl:if test = "$contractStatus = 0 and $paymentStatus = -1 and $collectionStatus = -1 and $authStatus = -1">
                                        <INPUT TYPE="TEXT"  CLASS="TEXTAudit1" name="PAYMENT_STATUS" tabindex="-1" DBT="{DBT}" DBC="PAYMENT_STATUS"  id="{DBT}__PAYMENT_STATUS" READONLY="true" MAXLENGTH="15" SIZE="17"/>
                                    </xsl:if>  
                                    <xsl:if test = "$contractStatus = -1 and $paymentStatus = -1 and $collectionStatus = -1 and $authStatus = 0">
                                        <INPUT TYPE="TEXT"  CLASS="TEXTAudit1" name="PAYMENT_STATUS" tabindex="-1" DBT="{DBT}" DBC="PAYMENT_STATUS"  id="{DBT}__PAYMENT_STATUS" READONLY="true" MAXLENGTH="15" SIZE="17"/>
                                    </xsl:if>  
                                    <xsl:if test = "$contractStatus = -1 and $paymentStatus = 0 and $collectionStatus = 0 and $authStatus = -1 and $ProcessStatus = -1">
                                        <INPUT TYPE="TEXT"  CLASS="TEXTAudit1" name="PROCESSTAT" tabindex="-1" DBT="{DBT}" DBC="PROCESSTAT"  id="{DBT}__PROCESSTAT" READONLY="true" MAXLENGTH="25" SIZE="22"/>
                                    </xsl:if>  
                                    <xsl:if test = "$contractStatus = 0 and $paymentStatus = -1 and $collectionStatus = -1 and $authStatus = 0 and $ProcessStatus = -1">
                                        <INPUT TYPE="TEXT"  CLASS="TEXTAudit1" name="PROCESSTAT" tabindex="-1" DBT="{DBT}" DBC="PROCESSTAT"  id="{DBT}__PROCESSTAT" READONLY="true" MAXLENGTH="25" SIZE="22"/>
                                    </xsl:if>
                                </div>
                            </fieldset>
			</fieldset>
			</xsl:if>
			</td>
			<td>
				<input Type="reset" style="visibility:HIDDEN;width:1px;height:1px" id="id_reset_1"/>
				<xsl:for-each select="//BLOCK[@SCREEN = $screen and ID = 'BLK_STD_BUTTONS_IMG']/FIELD/TYPE[text()='BUTTON']">
						<xsl:call-template name="dispStdButtonField_img_tmp"/>
				</xsl:for-each>
            </td></tr>
       </xsl:template>

       <xsl:template match="BLOCK" mode="AuditEntry_Neo_Online_tmp_bpel">        
        <xsl:variable name="contractStatus" select = "//FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']/CONTRACT_STATUS"/>
        <xsl:variable name="authStatus" select = "//FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']/AUTH_STATUS"/>
        <xsl:variable name="paymentStatus" select = "//FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']/PAYMENT_STATUS"/>
        <xsl:variable name="collectionStatus" select = "//FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']/COLLECTION_STATUS"/>
        <xsl:variable name="ProcessStatus" select = "//FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']/PROCESS_STATUS"/>
        <xsl:variable name="dealStatus" select = "//FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']/DEAL_STATUS"/>
                <div style="position:absolute;background-color:cornsilk;visibility:hidden">
                <TABLE  summary="" cellpadding="0" cellspacing="0" border="0" >
                            <TR>
                                     <TD><xsl:text disable-output-escaping="yes">&#160;</xsl:text></TD>
                                   <TD>
                                                 <label class="LABELAudit1" ><xsl:value-of select="$makerId"/></label>
                                   </TD>
                                   
                                   <TD>
                                                 <LABEL CLASS="LABELAudit1"><xsl:value-of select="$DtStamp"/></LABEL>
                                   </TD>
                          
                                    <TD>
                                                 <LABEL CLASS="LABELAudit1"><xsl:value-of select="$checkerId"/></LABEL>
                                   </TD>
                                   <TD>
                                                 <LABEL CLASS="LABELAudit1"><xsl:value-of select="$DtStamp"/></LABEL>
                                   </TD>
                                <TD>
                                        <xsl:if test = "$contractStatus = -1">
                                          <LABEL CLASS="LABELAudit1"><xsl:value-of select="$contractStat"/></LABEL>                                          
                                        </xsl:if>  
                                        <xsl:if test = "$contractStatus = 0 and $paymentStatus = -1 and $collectionStatus = -1">
                                          <LABEL CLASS="LABELAudit1"><xsl:value-of select="$collectionStat"/></LABEL>                                          
                                        </xsl:if>                                          
                                        <xsl:if test = "$contractStatus = 0 and $paymentStatus = 0 and $collectionStatus = -1">
                                          <LABEL CLASS="LABELAudit1"><xsl:value-of select="$collectionStat"/></LABEL>                                          
                                        </xsl:if>  
                                        <xsl:if test = "$contractStatus = 0 and $paymentStatus = -1 and $collectionStatus = 0" >
                                          <LABEL CLASS="LABELAudit1"><xsl:value-of select="$paymentStat"/></LABEL>                                          
                                        </xsl:if>  
                                        <xsl:if test = "$contractStatus = 0 and $paymentStatus = 0 and $collectionStatus = 0 and ProcessStatus = -1">
                                          <LABEL CLASS="LABELAudit1"><xsl:value-of select="$processStat"/></LABEL>                                          
                                        </xsl:if> 
                                        <xsl:if test = "$dealStatus = -1">
                                          <LABEL CLASS="LABELAudit1"><xsl:value-of select="$dealStat"/></LABEL>                                          
                                        </xsl:if> 
                                 </TD>
                                      
                                   <TD>
                                     <xsl:if test = "$authStatus = -1">
                                            <label class="LABELCheckAudit" for="{DBT}__AUTHSTAT">
                                            <INPUT  TYPE="CHECKBOX" CLASS="CHECKBOXAudit" name="AUTHSTAT" DBT="{DBT}" DBC="AUTHSTAT"  id="{DBT}__AUTHSTAT"  ON="A" OFF="U" READONLY="true" MAXLENGTH="15" SIZE="17"/>
                                            <xsl:value-of select="$authStat" />
                                            </label>
                                     </xsl:if> 
                                     <xsl:if test = "$authStatus = 0 and $collectionStatus = -1 and $paymentStatus = -1 and $contractStatus = -1">
                                        <LABEL CLASS="LABELAudit1"><xsl:value-of select="$collectionStat"/></LABEL>                                        
                                     </xsl:if>
                                     
                                     <xsl:if test = "$authStatus = 0 and $collectionStatus = -1 and $paymentStatus = -1 and $contractStatus = 0">
                                        <LABEL CLASS="LABELAudit1"><xsl:value-of select="$paymentStat"/></LABEL>                                        
                                     </xsl:if>

                                     <xsl:if test = "$authStatus = 0 and $collectionStatus = 0 and $paymentStatus = 0 and $contractStatus = 0 and  ProcessStatus = -1">
                                        <LABEL CLASS="LABELAudit1"><xsl:value-of select="$processStat"/></LABEL>                                        
                                     </xsl:if>
                                    </TD>
                                   
				</TR>
				<TR>
                           <TD> <xsl:text disable-output-escaping="yes">&#160;</xsl:text></TD>
                             <TD>
                                   <INPUT TYPE="TEXT"
                                      CLASS="TEXTAudit1"
                                      name="MAKERID"
                                      id="{DBT}__MAKERID"
                                      tabindex="-1"
                                      DBT="{DBT}"
                                      DBC="MAKERID"
                                      READONLY="true"
                                      MAXLENGTH="12" SIZE="12"/>
                               </TD>
                               <TD>
                                      <INPUT TYPE="HIDDEN" name="MAKERSTAMP" id="{DBT}__MAKERSTAMP" DBT="{DBT}" DBC="MAKERSTAMP" onpropertychange="fnFormatTimeStamp(this)"/>
                                      <INPUT TYPE="TEXT" CLASS="TEXTAudit1" name="MAKERSTAMPI" id="MAKERSTAMPI" tabindex="-1" READONLY="true" MAXLENGTH="19" SIZE="22"/>
                                </TD>
                                <TD>
                                       <INPUT TYPE="TEXT" CLASS="TEXTAudit1" name="CHECKERID" id="{DBT}__CHECKERID" tabindex="-1" DBT="{DBT}"
                                          DBC="CHECKERID" READONLY="true" MAXLENGTH="12" SIZE="12"/>
                                 </TD>
                                 <TD>
                                        <INPUT TYPE="HIDDEN" name="CHECKERSTAMP" id="{DBT}__CHECKERSTAMP" DBT="{DBT}" DBC="CHECKERSTAMP" onpropertychange="fnFormatTimeStamp(this)"/>                                                        
                                        <INPUT TYPE="TEXT" CLASS="TEXTAudit1" name="CHECKERSTAMPI" id="CHECKERSTAMPI" tabindex="-1" READONLY="true" MAXLENGTH="19" SIZE="22"/>
                                 </TD>
                                  <TD>
                                        <xsl:if test = "$contractStatus = -1">
                                                <INPUT TYPE="TEXT"  CLASS="TEXTAudit1" name="CONTSTAT" tabindex="-1" DBT="{DBT}" DBC="CONTSTAT"  id="{DBT}__CONTSTAT" READONLY="true" MAXLENGTH="15" SIZE="15"  />
                                           </xsl:if> 
                                        <xsl:if test = "$contractStatus = 0 and $paymentStatus = -1 and $collectionStatus = -1">
                                                <INPUT TYPE="TEXT"  CLASS="TEXTAudit1" name="COLLECTION_STATUS" tabindex="-1" DBT="{DBT}" DBC="COLLECTION_STATUS"  id="{DBT}__COLLECTION_STATUS" READONLY="true" MAXLENGTH="12" SIZE="12"/>
                                           </xsl:if>                                            
                                        <xsl:if test = "$contractStatus = 0 and $paymentStatus = 0 and $collectionStatus = -1">
                                                <INPUT TYPE="TEXT"  CLASS="TEXTAudit1" name="COLLECTION_STATUS" tabindex="-1" DBT="{DBT}" DBC="COLLECTION_STATUS"  id="{DBT}__COLLECTION_STATUS" READONLY="true" MAXLENGTH="12" SIZE="12"/>
                                           </xsl:if> 
                                        <xsl:if test = "$contractStatus = 0 and $paymentStatus = -1 and $collectionStatus = 0 " >
                                                <INPUT TYPE="TEXT"  CLASS="TEXTAudit1" name="PAYMENT_STATUS" tabindex="-1" DBT="{DBT}" DBC="PAYMENT_STATUS"  id="{DBT}__PAYMENT_STATUS" READONLY="true" MAXLENGTH="12" SIZE="12"/>
                                           </xsl:if> 
                                        <xsl:if test = "$contractStatus = 0 and $paymentStatus = 0 and $collectionStatus = 0 and $ProcessStatus = -1">
                                                <INPUT TYPE="TEXT"  CLASS="TEXTAudit1" name="PROCESSTAT" tabindex="-1" DBT="{DBT}" DBC="PROCESSTAT"  id="{DBT}__PROCESSTAT" READONLY="true" MAXLENGTH="25" SIZE="22"/>
                                        </xsl:if> 
                                        <xsl:if test = "$dealStatus = -1">
                                                <INPUT TYPE="TEXT"  CLASS="TEXTAudit1" name="DEAL_STATUS" tabindex="-1" DBT="{DBT}" DBC="DEAL_STATUS"  id="{DBT}__DEAL_STATUS" READONLY="true" MAXLENGTH="25" SIZE="22"/>
                                        </xsl:if>
                                    </TD>
                                    <TD> 
                                     <xsl:if test = "$authStatus = 0 and $collectionStatus = -1 and $paymentStatus = -1 and $contractStatus = -1">
                                                <INPUT TYPE="TEXT"  CLASS="TEXTAudit1" name="COLLECTION_STATUS" tabindex="-1" DBT="{DBT}" DBC="COLLECTION_STATUS"  id="{DBT}__COLLECTION_STATUS" READONLY="true" MAXLENGTH="12" SIZE="12"/>
                                     </xsl:if>
                                     <xsl:if test = "$authStatus = 0 and $collectionStatus = -1 and $paymentStatus = -1 and $contractStatus = 0">
                                                <INPUT TYPE="TEXT"  CLASS="TEXTAudit1" name="PAYMENT_STATUS" tabindex="-1" DBT="{DBT}" DBC="PAYMENT_STATUS"  id="{DBT}__PAYMENT_STATUS" READONLY="true" MAXLENGTH="12" SIZE="12"/>
                                     </xsl:if>
                                     <xsl:if test = "$authStatus = 0 and $collectionStatus = 0 and $paymentStatus = 0 and $contractStatus = 0 and  $ProcessStatus = -1">
                                                <INPUT TYPE="TEXT"  CLASS="TEXTAudit1" name="PROCESSTAT" tabindex="-1" DBT="{DBT}" DBC="PROCESSTAT"  id="{DBT}___PROCESSTAT" READONLY="true" MAXLENGTH="25" SIZE="22"/>
                                     </xsl:if>

									 <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                                    </TD>                                    
					</TR>
                <xsl:variable name = "Reversal" select = "//FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']/REVERSAL"/>

                    <TR>                            
                             <TD STYLE = "color:#CCCCCC;">
                                  <xsl:if test = "$Reversal = -1">                             
                                                 <LABEL CLASS="LABELAudit1"><xsl:value-of select="$reversal"/></LABEL>
                                  </xsl:if>                                          
                                  <xsl:if test = "$Reversal = 0">                    
                                    <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                                  </xsl:if>                                          
                              </TD>
                             <TD>
                                  <xsl:if test = "$Reversal = -1">                             
                                         <INPUT TYPE="TEXT" CLASS="TEXTAudit1" name="REVR_MAKERID" id="{DBT}__REVR_MAKERID" tabindex="-1"
                                            DBT="{DBT}" DBC="REVR_MAKERID" READONLY="true" MAXLENGTH="12" SIZE="12"/>
                                  </xsl:if>           
                                  <xsl:if test = "$Reversal = 0">                    
                                    <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                                  </xsl:if>                                          
                               </TD>
                               <TD>
                                  <xsl:if test = "$Reversal = -1">
                                        <INPUT TYPE="HIDDEN" name="REVR_MAKERSTAMP" id="{DBT}__REVR_MAKERSTAMP" DBT="{DBT}" DBC="REVR_MAKERSTAMP" onpropertychange="fnFormatTimeStamp(this)"/>
                                        <INPUT TYPE="TEXT" CLASS="TEXTAudit1" name="REVR_MAKERSTAMPI" id="REVR_MAKERSTAMPI" tabindex="-1" READONLY="true" MAXLENGTH="19" SIZE="22"/>
                                  </xsl:if>                                          
                                  <xsl:if test = "$Reversal = 0">                    
                                    <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                                  </xsl:if>                                          
                                </TD>
                                <TD>
                                  <xsl:if test = "$Reversal = -1">                             
                                         <INPUT TYPE="TEXT" CLASS="TEXTAudit1" name="REVR_CHECKERID" id="{DBT}__REVR_CHECKERID" tabindex="-1"
                                            DBT="{DBT}" DBC="REVR_CHECKERID" READONLY="true" MAXLENGTH="12" SIZE="12"/>
                                  </xsl:if>                                          
                                  <xsl:if test = "$Reversal = 0">                    
                                    <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                                  </xsl:if>                                          
                                 </TD>
                                 <TD>
                                  <xsl:if test = "$Reversal = -1">                             
                                          <INPUT TYPE="HIDDEN" name="REVR_CHECKERSTAMP" id="{DBT}__REVR_CHECKERSTAMP" DBT="{DBT}" DBC="REVR_CHECKERSTAMP" onpropertychange="fnFormatTimeStamp(this)"/>                                                        
                                          <INPUT TYPE="TEXT" CLASS="TEXTAudit1" name="REVR_CHECKERSTAMPI" id="REVR_CHECKERSTAMPI" tabindex="-1" READONLY="true" MAXLENGTH="19" SIZE="22"/>
                                  </xsl:if>                                                                                 
                                  <xsl:if test = "$Reversal = 0">                    
                                    <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                                  </xsl:if>                                          
                                 </TD>
                                  <TD>
                                        <xsl:if test = "$contractStatus = -1 and $paymentStatus = 0 and $collectionStatus = -1 and $authStatus = -1">
                                        <LABEL CLASS="LABELAudit1"><xsl:value-of select="$collectionStat"/></LABEL>                                          
                                      </xsl:if>  
                                      <xsl:if test = "$contractStatus = -1 and $paymentStatus = -1 and $collectionStatus = 0 and $authStatus = -1">
                                        <LABEL CLASS="LABELAudit1"><xsl:value-of select="$paymentStat"/></LABEL>                                          
                                      </xsl:if>  
                                        <xsl:if test = "$contractStatus = 0 and $paymentStatus = -1 and $collectionStatus = -1 and $authStatus = -1">
                                        <LABEL CLASS="LABELAudit1"><xsl:value-of select="$paymentStat"/></LABEL>                                          
                                      </xsl:if>  
                                        <xsl:if test = "$contractStatus = -1 and $paymentStatus = -1 and $collectionStatus = -1 and $authStatus = 0">
                                        <LABEL CLASS="LABELAudit1"><xsl:value-of select="$paymentStat"/></LABEL>                                          
                                      </xsl:if>  
                                      <xsl:if test = "$contractStatus = -1 and $paymentStatus = 0 and $collectionStatus = 0 and $authStatus = -1 and $ProcessStatus = -1">
                                        <LABEL CLASS="LABELAudit1"><xsl:value-of select="$processStat"/></LABEL>                                          
                                      </xsl:if>  
                                      <xsl:if test = "$contractStatus = 0 and $paymentStatus = -1 and $collectionStatus = -1 and $authStatus = 0 and $ProcessStatus = -1">
                                        <LABEL CLASS="LABELAudit1"><xsl:value-of select="$processStat"/></LABEL>                                          
                                      </xsl:if>  
                                      
                                  </TD>
                                    <TD> 
                                        <xsl:if test = "$contractStatus = -1 and $paymentStatus = 0 and $collectionStatus = -1 and $authStatus = -1">
                                                <INPUT TYPE="TEXT"  CLASS="TEXTAudit1" name="COLLECTION_STATUS" tabindex="-1" DBT="{DBT}" DBC="COLLECTION_STATUS"  id="{DBT}__COLLECTION_STATUS" READONLY="true" MAXLENGTH="15" SIZE="17"/>
                                        </xsl:if>  
                                        <xsl:if test = "$contractStatus = -1 and $paymentStatus = -1 and $collectionStatus = 0 and $authStatus = -1">
                                                <INPUT TYPE="TEXT"  CLASS="TEXTAudit1" name="PAYMENT_STATUS" tabindex="-1" DBT="{DBT}" DBC="PAYMENT_STATUS"  id="{DBT}__PAYMENT_STATUS" READONLY="true" MAXLENGTH="15" SIZE="17"/>
                                        </xsl:if>  
                                        <xsl:if test = "$contractStatus = 0 and $paymentStatus = -1 and $collectionStatus = -1 and $authStatus = -1">
                                                <INPUT TYPE="TEXT"  CLASS="TEXTAudit1" name="PAYMENT_STATUS" tabindex="-1" DBT="{DBT}" DBC="PAYMENT_STATUS"  id="{DBT}__PAYMENT_STATUS" READONLY="true" MAXLENGTH="15" SIZE="17"/>
                                        </xsl:if>  
                                        <xsl:if test = "$contractStatus = -1 and $paymentStatus = -1 and $collectionStatus = -1 and $authStatus = 0">
                                                <INPUT TYPE="TEXT"  CLASS="TEXTAudit1" name="PAYMENT_STATUS" tabindex="-1" DBT="{DBT}" DBC="PAYMENT_STATUS"  id="{DBT}__PAYMENT_STATUS" READONLY="true" MAXLENGTH="15" SIZE="17"/>
                                        </xsl:if>  
                                        <xsl:if test = "$contractStatus = -1 and $paymentStatus = 0 and $collectionStatus = 0 and $authStatus = -1 and $ProcessStatus = -1">
                                                <INPUT TYPE="TEXT"  CLASS="TEXTAudit1" name="PROCESSTAT" tabindex="-1" DBT="{DBT}" DBC="PROCESSTAT"  id="{DBT}__PROCESSTAT" READONLY="true" MAXLENGTH="25" SIZE="22"/>
                                        </xsl:if>  
										<xsl:if test = "$contractStatus = 0 and $paymentStatus = -1 and $collectionStatus = -1 and $authStatus = 0 and $ProcessStatus = -1">
                                                <INPUT TYPE="TEXT"  CLASS="TEXTAudit1" name="PROCESSTAT" tabindex="-1" DBT="{DBT}" DBC="PROCESSTAT"  id="{DBT}__PROCESSTAT" READONLY="true" MAXLENGTH="25" SIZE="22"/>
                                        </xsl:if>  
                                    </TD>   
                                
                                <td>
                                <input Type="reset" style="visibility:HIDDEN;width:1px;height:1px" id="id_reset_1"/></td>

                 </TR>
              </TABLE>
				</div>
       </xsl:template>

    <xsl:template name = "CacheAuditValues_tmp">
    <script type = "text/javascript"  DEFER="DEFER"> 
        var l_OnlineAuditVals = new Array()
        //Added By Saidul;Label desc has been extracted for the contract status.
        var LBL_CONSTAT_ACTIVE  = mainWin.getItemDesc("LBL_CONSTAT_ACTIVE");
        var LBL_CONSTAT_CLOSED  = mainWin.getItemDesc("LBL_CONSTAT_CLOSED");
        var LBL_CONSTAT_EXERCISED  = mainWin.getItemDesc("LBL_CONSTAT_EXERCISED");
        var LBL_CONSTAT_HOLD  = mainWin.getItemDesc("LBL_CONSTAT_HOLD");
        var LBL_CONSTAT_KNOCKEDIN  = mainWin.getItemDesc("LBL_CONSTAT_KNOCKEDIN");
        var LBL_CONSTAT_CANCELLED  = mainWin.getItemDesc("LBL_CONSTAT_CANCELLED");
        var LBL_CONSTAT_LIQUIDATED  = mainWin.getItemDesc("LBL_CONSTAT_LIQUIDATED");
        var LBL_CONSTAT_REVERSED  = mainWin.getItemDesc("LBL_CONSTAT_REVERSED");
        var LBL_CONSTAT_KNOCKEDOUT  = mainWin.getItemDesc("LBL_CONSTAT_KNOCKEDOUT");
        var LBL_CONSTAT_EXPIRED  = mainWin.getItemDesc("LBL_CONSTAT_EXPIRED");
        var LBL_CONSTAT_UNINITIATED  = mainWin.getItemDesc("LBL_CONSTAT_UNINITIATED");
        var LBL_CONSTAT_OPEN  = mainWin.getItemDesc("LBL_CONSTAT_OPEN");
        var LBL_CONSTAT_REV_INITIATED  = mainWin.getItemDesc("LBL_CONSTAT_REV_INITIATED");
        var LBL_CONSTAT_REV_PARTIALLY  = mainWin.getItemDesc("LBL_CONSTAT_REV_PARTIALLY");
        var LBL_CONSTAT_LAUNCH_INITIATED  = mainWin.getItemDesc("LBL_CONSTAT_LAUNCH_INITIATED");
        var LBL_CONSTAT_LAUNCHED_PARTIALLY  = mainWin.getItemDesc("LBL_CONSTAT_LAUNCHED_PARTIALLY");
        var LBL_CONSTAT_CAN_INITIATED  = mainWin.getItemDesc("LBL_CONSTAT_CAN_INITIATED");
        var LBL_CONSTAT_CAN_PARTIALLY  = mainWin.getItemDesc("LBL_CONSTAT_CAN_PARTIALLY");
        var LBL_CONSTAT_LAUNCHED  = mainWin.getItemDesc("LBL_CONSTAT_LAUNCHED");
        var LBL_CONSTAT_TERMINATED  = mainWin.getItemDesc("LBL_CONSTAT_TERMINATED");
        var LBL_CONSTAT_REDEEMED  = mainWin.getItemDesc("LBL_CONSTAT_REDEEMED");
        var LBL_CONSTAT_CLOSED_PARTIALLY  = mainWin.getItemDesc("LBL_CONSTAT_CLOSED_PARTIALLY");
        var LBL_CONSTAT_PROCESSED  = mainWin.getItemDesc("LBL_PROCESSTAT_PROCESSED");
        var LBL_CONSTAT_SUGGESTED = mainWin.getItemDesc("LBL_CONSTAT_SUGGESTED");
        var LBL_CONSTAT_RESIDUED = mainWin.getItemDesc("LBL_CONSTAT_RESIDUED");
        
    l_OnlineAuditVals["A"]=LBL_CONSTAT_ACTIVE;
	l_OnlineAuditVals["C"]=LBL_CONSTAT_CLOSED;
	l_OnlineAuditVals["E"]=LBL_CONSTAT_EXERCISED;
	l_OnlineAuditVals["H"]=LBL_CONSTAT_HOLD;
	l_OnlineAuditVals["I"]=LBL_CONSTAT_KNOCKEDIN;
	l_OnlineAuditVals["K"]=LBL_CONSTAT_CANCELLED;
	l_OnlineAuditVals["L"]=LBL_CONSTAT_LIQUIDATED;
	l_OnlineAuditVals["R"]=LBL_CONSTAT_REVERSED;
	l_OnlineAuditVals["S"]=LBL_CONSTAT_CLOSED;
	l_OnlineAuditVals["V"]=LBL_CONSTAT_REVERSED;
	l_OnlineAuditVals["W"]=LBL_CONSTAT_KNOCKEDOUT;
	l_OnlineAuditVals["X"]=LBL_CONSTAT_EXPIRED;
	l_OnlineAuditVals["Y"]=LBL_CONSTAT_UNINITIATED;
	l_OnlineAuditVals["O"]=LBL_CONSTAT_OPEN;
	l_OnlineAuditVals["T"]= LBL_CONSTAT_TERMINATED;
        
        // Start Cont Stat Vaules are added by Saidul For TN Team.        
        l_OnlineAuditVals["F"]=LBL_CONSTAT_REV_INITIATED;
        l_OnlineAuditVals["J"]=LBL_CONSTAT_REV_PARTIALLY;
        l_OnlineAuditVals["B"]=LBL_CONSTAT_LAUNCH_INITIATED;
        l_OnlineAuditVals["G"]=LBL_CONSTAT_LAUNCHED_PARTIALLY;
        l_OnlineAuditVals["D"]=LBL_CONSTAT_CAN_INITIATED;
        l_OnlineAuditVals["Z"]=LBL_CONSTAT_CAN_PARTIALLY;
        l_OnlineAuditVals["Q"]=LBL_CONSTAT_LAUNCHED;
        // End Cont Stat Vaules are added by Saidul For TN Team.
        l_OnlineAuditVals["N"] = LBL_CONSTAT_REDEEMED;
        l_OnlineAuditVals["M"] = LBL_CONSTAT_CLOSED_PARTIALLY;
        l_OnlineAuditVals["P"] = LBL_CONSTAT_PROCESSED;        
        l_OnlineAuditVals["s"]=LBL_CONSTAT_SUGGESTED;
        l_OnlineAuditVals["r"]=LBL_CONSTAT_RESIDUED;
        
        var l_OnlineAuditDesc = new Array()
        l_OnlineAuditDesc[LBL_CONSTAT_ACTIVE]="A";
	l_OnlineAuditDesc[LBL_CONSTAT_CLOSED]="C";
	l_OnlineAuditDesc[LBL_CONSTAT_EXERCISED]="E";
	l_OnlineAuditDesc[LBL_CONSTAT_HOLD]="H";
	l_OnlineAuditDesc[LBL_CONSTAT_KNOCKEDIN]="I";
	l_OnlineAuditDesc[LBL_CONSTAT_CANCELLED]="K";
	l_OnlineAuditDesc[LBL_CONSTAT_LIQUIDATED]="L";
	l_OnlineAuditDesc[LBL_CONSTAT_REVERSED]="R";
	l_OnlineAuditDesc[LBL_CONSTAT_CLOSED]="S";
	l_OnlineAuditDesc[LBL_CONSTAT_REVERSED]="V";
	l_OnlineAuditDesc[LBL_CONSTAT_KNOCKEDOUT]="W";
	l_OnlineAuditDesc[LBL_CONSTAT_EXPIRED]="X";
	l_OnlineAuditDesc[LBL_CONSTAT_UNINITIATED]="Y";
	l_OnlineAuditDesc[LBL_CONSTAT_OPEN]="O"; 
        l_OnlineAuditDesc[LBL_CONSTAT_TERMINATED]="T"; 

        // Start Cont Stat  Vaules are added by Saidul For TN Team.
	l_OnlineAuditDesc[LBL_CONSTAT_REV_INITIATED]="F";
	l_OnlineAuditDesc[LBL_CONSTAT_REV_PARTIALLY]="J";
	l_OnlineAuditDesc[LBL_CONSTAT_LAUNCH_INITIATED]="B";
	l_OnlineAuditDesc[LBL_CONSTAT_LAUNCHED_PARTIALLY]="G";
	l_OnlineAuditDesc[LBL_CONSTAT_CAN_INITIATED]="D";
	l_OnlineAuditDesc[LBL_CONSTAT_CAN_PARTIALLY]="Z";
        l_OnlineAuditDesc[LBL_CONSTAT_LAUNCHED]="Q";
        
        // End Cont Stat  Vaules are added by Saidul For TN Team.
        l_OnlineAuditDesc[LBL_CONSTAT_REDEEMED] = "N";
        l_OnlineAuditDesc[LBL_CONSTAT_CLOSED_PARTIALLY] = "M";
        l_OnlineAuditDesc[LBL_CONSTAT_PROCESSED] = "P";
        l_OnlineAuditDesc[LBL_CONSTAT_SUGGESTED]="s";
        l_OnlineAuditDesc[LBL_CONSTAT_RESIDUED]="r";
        
        var l_OnlineProcessStatusVals = new Array();
        //Added By Saidul;Label desc has been extracted for the process status.
        var LBL_PROCESSTAT_PEND_AUTH  = mainWin.getItemDesc("LBL_PROCESSTAT_PEND_AUTH");
        var LBL_PROCESSTAT_PEND_RELEASE  = mainWin.getItemDesc("LBL_PROCESSTAT_PEND_RELEASE");
        var LBL_PROCESSTAT_PROCESSED  = mainWin.getItemDesc("LBL_PROCESSTAT_PROCESSED");
        var LBL_PROCESSTAT_FAILED_VERIFICATION  = mainWin.getItemDesc("LBL_PROCESSTAT_FAILED_VERIFICATION");
        var LBL_PROCESSTAT_HOLD  = mainWin.getItemDesc("LBL_PROCESSTAT_HOLD");
        var LBL_PROCESSTAT_SUPPRESSED	= mainWin.getItemDesc("LBL_PROCESSTAT_SUPPRESSED"); 
        var LBL_PROCESSTAT_CANCELLED	= mainWin.getItemDesc("LBL_CONSTAT_CANCELLED"); 
        
        l_OnlineProcessStatusVals["N"] = LBL_PROCESSTAT_PEND_AUTH;
        l_OnlineProcessStatusVals["A"] = LBL_PROCESSTAT_PEND_RELEASE;
        l_OnlineProcessStatusVals["P"] = LBL_PROCESSTAT_PROCESSED;
        l_OnlineProcessStatusVals["F"] = LBL_PROCESSTAT_FAILED_VERIFICATION;
        l_OnlineProcessStatusVals["H"] = LBL_PROCESSTAT_HOLD;
        l_OnlineProcessStatusVals["V"] = LBL_PROCESSTAT_SUPPRESSED;
        l_OnlineProcessStatusVals["C"] = LBL_CONSTAT_CANCELLED;
        
        var l_OnlineProcessStatusDesc = new Array();
        l_OnlineProcessStatusDesc[LBL_PROCESSTAT_PEND_AUTH]="N";
        l_OnlineProcessStatusDesc[LBL_PROCESSTAT_PEND_RELEASE]="A";
        l_OnlineProcessStatusDesc[LBL_PROCESSTAT_PROCESSED]="P";
        l_OnlineProcessStatusDesc[LBL_PROCESSTAT_FAILED_VERIFICATION]="F";
        l_OnlineProcessStatusDesc[LBL_PROCESSTAT_HOLD]="H";
        l_OnlineProcessStatusDesc[LBL_PROCESSTAT_SUPPRESSED]="V";
        l_OnlineProcessStatusDesc[LBL_CONSTAT_CANCELLED]="C";

  </script>
    <noscript>
        <xsl:value-of select="$noScript"/>
    </noscript>
    </xsl:template>

</xsl:stylesheet>
