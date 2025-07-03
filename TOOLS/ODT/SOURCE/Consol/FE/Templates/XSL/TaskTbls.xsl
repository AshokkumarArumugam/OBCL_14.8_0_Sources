<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:param name="taskList"/>						  
    <xsl:output method='html' />
    <xsl:param name="imgPath"/>	
    <xsl:param name="collapsed"/>    
    <xsl:param name="search_results"/>
    <xsl:param name="start_time"/>
    <xsl:param name="posting_date"/>
    <xsl:param name="stage_status"/>
	<xsl:param name="txn_seq_no"/>
    <xsl:param name="brn"/>
    <xsl:param name="ccy"/>
    <xsl:param name="locked_by"/>
    <xsl:param name="assigned_to"/>
    <xsl:param name="maker"/>
    <xsl:param name="amount"/>
    <xsl:param name="account"/>
    <xsl:param name="ref"/>
    <xsl:param name="branch"/>
    <xsl:param name="in_progress"/>
    <xsl:param name="waiting_manual_ass"/>
    <xsl:param name="completed"/>
    <xsl:param name="deleted"/>
    <xsl:param name="send_to_host"/>
    <xsl:param name="reversed"/>
    <xsl:param name="failed"/>
    <xsl:param name="approved"/>
    <xsl:param name="rejected"/>
	<xsl:param name="pending_rev_auth"/>
    <xsl:param name="makerId_SummaryAudit"/>
    
	<xsl:template match="/">
		<xsl:call-template name="mainTemplate1"/>
	</xsl:template>

	<xsl:template name="mainTemplate" match="TASKLIST">
            <div class="DIVpage" style="padding-bottom:3px; width:99.5%;text-align:left; " id = 'TASKLIST_CAP1'>
                <h2 class="SPNpageH" id="TASKLIST_CAP2" tabindex="0">
                    <a id="TASKLIST_CAP" name="#" tabindex="0" accesskey="4"><xsl:value-of select="$search_results"/></a>
                </h2>
            </div>
            <div id="vTabDB_TELLER">
                <div id="FIRSTASKDIV" style="margin: 0px; padding: 0px; clear: left; top: 0px; overflow-y:auto;">
                    <div class="TASKLIST_CAP" id="ID_TASKLIST" align="top" style="width: 100%;" summary="{$taskList}">
                        <xsl:call-template name="getTLRecords"/>
                    </div>
                </div>
            </div>
	</xsl:template>
        <xsl:template name="mainTemplate1" match="TASKLIST">
           <div id="dashboardContainer" style="overflow:auto;clear:both;">
                <a name="hrefWorkFlow"></a>
                <table id="dashtable" width="100%" cellspacing="7" cellpadding="0" border="0" role="presentation" summary="{$taskList}">
                    <tbody>
                        <xsl:call-template name="getTLRecords1"/>
                    </tbody>
                </table>
           </div>
	</xsl:template>
                                    
	<xsl:template name="getTLRecords">
            <xsl:for-each select="//TLREC">
                <xsl:variable name="currWFName" select="WFName"/>
                <xsl:variable name="prevWFName">
                        <xsl:choose>
                                <xsl:when test="position() = 1">
                                        <xsl:text>HELLO</xsl:text>
                                </xsl:when>
                                <xsl:otherwise>
                                                <xsl:variable name="currIndex" select="position()-1"/>
                                        <xsl:value-of select="//TLREC[$currIndex]/WFName"/>
                                </xsl:otherwise>
                        </xsl:choose>
                </xsl:variable>
                
                <xsl:if test="$currWFName != $prevWFName">
                    <xsl:call-template name="sectionheading">
                        <xsl:with-param name="WFNAME" select="$currWFName"/>
                    </xsl:call-template>
                    <table class="TBLone"  cellSpacing="0" cellPadding="0" width="100%" border="0">
                        <xsl:attribute name="summary">
                            <xsl:value-of select="TKDisc"/> 
                        </xsl:attribute>
                        <xsl:attribute name="id">
                            <xsl:value-of select="WFName"/>
                        </xsl:attribute>
                        <thead>
                            <xsl:call-template name="dataheading"/>
                        </thead>
                        <tbody>
                            <xsl:for-each select="//TLREC[WFName = $currWFName]">
                                <xsl:call-template name="data1"/>
                            </xsl:for-each>
                        </tbody>
                    </table>
                </xsl:if>
            </xsl:for-each>
	</xsl:template>
        <xsl:template name="getTLRecords1">
            <xsl:for-each select="//TLREC">
                <xsl:variable name="currWFName" select="WFName"/>
                <xsl:variable name="prevWFName">
                        <xsl:choose>
                                <xsl:when test="position() = 1">
                                        <xsl:text>HELLO</xsl:text>
                                </xsl:when>
                                <xsl:otherwise>
                                                <xsl:variable name="currIndex" select="position()-1"/>
                                        <xsl:value-of select="//TLREC[$currIndex]/WFName"/>
                                </xsl:otherwise>
                        </xsl:choose>
                </xsl:variable>
                
                <xsl:if test="$currWFName != $prevWFName">
				<tr>
					<td valign="top">
						<div id="widgetonecontainer1" class="widgetonecontainer" aria-labelledby="widgetoneheading1" role="group">
							<xsl:call-template name="sectionheading1">
								<xsl:with-param name="WFNAME" select="$currWFName"/>
							</xsl:call-template>
							<div id="csc">
								<span class="tr"></span>
									<div class="widgetonetblbox">
										<table class="widgetonetbl colw"  cellSpacing="1" cellPadding="0" width="100%" border="0">
											<xsl:attribute name="summary">
												<xsl:value-of select="TKDisc"/> 
											</xsl:attribute>
											<xsl:attribute name="id">
												<xsl:value-of select="WFName"/>
											</xsl:attribute>
											<tbody>
												<xsl:call-template name="dataheading1"/>
												<xsl:for-each select="//TLREC[WFName = $currWFName]">
													<xsl:call-template name="data1"/>
												</xsl:for-each>
											</tbody>
										</table>
									</div>
								<span class="bl"></span>
								<span class="br"></span>
							</div>
						</div>
					</td>
				</tr>
                </xsl:if>
            </xsl:for-each>
	</xsl:template>
				
	<xsl:template name="sectionheading">
		<xsl:param name="WFNAME"/>
		<div class="DIVcaption1">
                    <xsl:attribute name="onclick">
                        <xsl:text>toggleTbody(this, '</xsl:text>
                        <xsl:value-of select="$WFNAME"/>
                        <xsl:text>')</xsl:text>
                    </xsl:attribute>
                    <xsl:attribute name="onkeydown">
                        <xsl:text>handleWorkFlowKeyDown(event, '</xsl:text>
                        <xsl:value-of select="$WFNAME"/>
                        <xsl:text>')</xsl:text>
                    </xsl:attribute>
                    <a  class="Astd SPNtext" href="#">
                        <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                        <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
                        <img src="{$imgPath}/taskopen.gif" alt="{$collapsed}" id="imgEx" border="0" />
                        <xsl:text> </xsl:text>
                        <xsl:value-of select="TKDisc"/> 
                        <xsl:text> (</xsl:text>
                        <xsl:value-of select="count(//TLREC[WFName= $WFNAME])"/>
                        <xsl:text>)</xsl:text>
                    </a>
		</div>
	</xsl:template>
        <xsl:template name="sectionheading1">
		<xsl:param name="WFNAME"/>
		<h2 class="widgetoneheading current">
                        <xsl:value-of select="TKDisc"/> 
                        <xsl:text> (</xsl:text>
                        <xsl:value-of select="count(//TLREC[WFName= $WFNAME])"/>
                        <xsl:text>)</xsl:text>
		</h2>
                <!--<div id="csc"> -->
                <span class="tr"></span>
	</xsl:template>
				
	<xsl:template name="dataheading">
            <tr>
                <th class="TBLoneTH" scope="col"><span class="SPNtext"><xsl:value-of select="$ref"/></span></th>
				<th class="TBLoneTH" scope="col"><span class="SPNtext"><xsl:value-of select="$txn_seq_no"/></span></th>
                <th class="TBLoneTH" scope="col"><span class="SPNtext"><xsl:value-of select="$brn"/></span></th> 
                <th class="TBLoneTH" scope="col"><span class="SPNtext"><xsl:value-of select="$account"/></span></th>
                <th class="TBLoneTH" scope="col"><span class="SPNtext"><xsl:value-of select="$ccy"/></span></th> 
              <!--  <th class="TBLoneTH" scope="col"><span class="SPNtext"><xsl:value-of select="$branch"/></span></th> 
                <th class="TBLoneTH" scope="col"><span class="SPNtext"><xsl:value-of select="$account"/></span></th> -->
                <th class="TBLoneTH" scope="col"><span class="SPNtext"><xsl:value-of select="$amount"/></span></th>
                <th class="TBLoneTH" scope="col"><span class="SPNtext"><xsl:value-of select="$maker"/></span></th>
                <th class="TBLoneTH" scope="col"><span class="SPNtext"><xsl:value-of select="$assigned_to"/></span></th>
                <th class="TBLoneTH" scope="col"><span class="SPNtext"><xsl:value-of select="$locked_by"/></span></th>
                <th class="TBLoneTH" scope="col"><span class="SPNtext"><xsl:value-of select="$stage_status"/></span></th>
                <th class="TBLoneTH" scope="col"><span class="SPNtext"><xsl:value-of select="$posting_date"/></span></th>
                <th class="TBLoneTH" scope="col"><span class="SPNtext"><xsl:value-of select="$start_time"/></span></th>
            </tr>
	</xsl:template>
        <xsl:template name="dataheading1">
            <tr>
                <th scope="col"><xsl:value-of select="$ref"/></th>
                <th scope="col"><xsl:value-of select="$txn_seq_no"/></th>
                <th scope="col"><xsl:value-of select="$brn"/></th> 
                <th scope="col"><xsl:value-of select="$account"/></th>
                <th scope="col"><xsl:value-of select="$ccy"/></th> 
                <th scope="col"><xsl:value-of select="$amount"/></th>
                <th scope="col"><xsl:value-of select="$maker"/></th>
                <th scope="col"><xsl:value-of select="$assigned_to"/></th>
                <th scope="col"><xsl:value-of select="$locked_by"/></th>
                <th scope="col"><xsl:value-of select="$stage_status"/></th>
                <th scope="col"><xsl:value-of select="$posting_date"/></th>
                <th scope="col"><xsl:value-of select="$start_time"/></th>
            </tr>
	</xsl:template>
	
	<xsl:template name="data">
            <tr>
                <xsl:attribute name="onkeydown">
                    <xsl:text>return handleWorkFlowKeyDown(event, '</xsl:text>
                    <xsl:value-of select="WFName"/> 
                    <xsl:text>')</xsl:text>
                </xsl:attribute>
		<xsl:if test="position() mod 2 = 0">
                    <xsl:attribute name="class">
                        <xsl:text>TBLoneTR</xsl:text>
                    </xsl:attribute>
                    <xsl:attribute name="onblur">
                        <xsl:text>this.className='TBLoneTR'</xsl:text>
                    </xsl:attribute>
                    <xsl:attribute name="onmouseover">
                        <xsl:text>this.className='TBLoneTRhover'</xsl:text>
                    </xsl:attribute>
                    <xsl:attribute name="onfocus">
                        <xsl:text>this.className='TBLoneTRhover'</xsl:text>
                    </xsl:attribute>
                    <xsl:attribute name="onmouseout">
                        <xsl:text>this.className='TBLoneTR'</xsl:text>
                    </xsl:attribute>
	 	</xsl:if>
	 	<xsl:if test="position() mod 2 != 0">
                    <xsl:attribute name="class">
                        <xsl:text>TBLoneTRalt</xsl:text>
                    </xsl:attribute>
                    <xsl:attribute name="onblur">
                        <xsl:text>this.className='TBLoneTRalt'</xsl:text>
                    </xsl:attribute>
                    <xsl:attribute name="onmouseover">
                        <xsl:text>this.className='TBLoneTRhover'</xsl:text>
                    </xsl:attribute>
                    <xsl:attribute name="onfocus">
                        <xsl:text>this.className='TBLoneTRhover'</xsl:text>
                    </xsl:attribute>
                    <xsl:attribute name="onmouseout">
                        <xsl:text>this.className='TBLoneTRalt'</xsl:text>
                    </xsl:attribute>
	 	</xsl:if>
                <td>
                    <xsl:call-template name="dispXREF">
                        <xsl:with-param name="xref">
                            <xsl:value-of select="XREF"/>
                        </xsl:with-param>
                        <xsl:with-param name="funcid">
                            <xsl:value-of select="WFName"/> 
                        </xsl:with-param>
                        <xsl:with-param name="StageStatus">
                            <xsl:value-of select="StageStatus"/> 
                        </xsl:with-param>
                        <xsl:with-param name="TxnStatus">
                            <xsl:value-of select="TxnStatus"/> 
                        </xsl:with-param>
                        <xsl:with-param name="txnBranch">
                            <xsl:value-of select="Branch"/> 
                        </xsl:with-param>
                    </xsl:call-template>
                </td> 
				<td><span class="SPNtext" tabindex='0'><xsl:value-of select="TxnSeqNo"/></span></td>
                <!--<td><span class="SPNtext" tabindex='0'><xsl:value-of select="Branch"/></span></td>  -->             
                <td><span class="SPNtext" tabindex='0'><xsl:value-of select="Brn"/></span></td>               
                <td><span class="SPNtext" tabindex='0'><xsl:value-of select="Account"/></span></td> 
				<td><span class="SPNtext" tabindex='0'><xsl:value-of select="Ccy"/></span></td>
                <td><span class="SPNtext" tabindex='0'><xsl:value-of select="Amount"/></span></td>
                <td><span class="SPNtext" tabindex='0'><xsl:value-of select="MakerID"/></span></td>
                <td><span class="SPNtext" tabindex='0'><xsl:value-of select="AssignedTo"/></span></td>
                <td><span class="SPNtext" tabindex='0'><xsl:value-of select="LockedBy"/></span></td>
                <td>
                    <span class="SPNtext" tabindex='0'>
                        <xsl:choose>
                            <xsl:when test ="StageStatus ='IPR'"><xsl:value-of select="$in_progress"/></xsl:when>
                            <xsl:when test ="StageStatus ='COM'"><xsl:value-of select="$completed"/></xsl:when>
							<xsl:when test ="(StageStatus='WTS')and (Reversal ='N')"><xsl:value-of select="$in_progress"/></xsl:when>
                            <!--<xsl:when test ="StageStatus ='WTS'"><xsl:value-of select="$in_progress"/></xsl:when>-->
                            <xsl:when test ="StageStatus ='WMA'"><xsl:value-of select="$waiting_manual_ass"/></xsl:when>
                            <xsl:when test ="StageStatus ='DIS'"><xsl:value-of select="$deleted"/></xsl:when>
                            <xsl:when test ="StageStatus ='STH'"><xsl:value-of select="$send_to_host"/></xsl:when>
                            <xsl:when test ="(StageStatus='WTS')and (Reversal ='Y')"><xsl:value-of select="$pending_rev_auth"/></xsl:when>                        
							<xsl:when test ="TxnStatus ='REV'"><xsl:value-of select="$reversed"/></xsl:when>
                            <xsl:when test ="(TxnStatus ='FAL') and (StageStatus != 'AUTREJ')"><xsl:value-of select="$failed"/></xsl:when>	<!-- FCUBS11.1 Authorizer assignment for approval Changes -->
                            <xsl:when test ="StageStatus ='AUTAPP'"><xsl:value-of select="$approved"/></xsl:when>	
                            <xsl:when test ="StageStatus ='AUTREJ'"><xsl:value-of select="$rejected"/></xsl:when>
                            <xsl:otherwise>N.A</xsl:otherwise>
                        </xsl:choose>
                    </span>
                </td>
                <td id = "StartDateTD"><span class="SPNtext" tabindex='0'><xsl:value-of select="PostingDate"/></span></td>
                <td id = "PostingDateTD"><span class="SPNtext" tabindex='0'><xsl:value-of select="WFStartTime"/></span></td>
            </tr>
	</xsl:template>
    <xsl:template name="data1"> <!--my change-->
            <tr>
               <!-- <xsl:attribute name="onkeydown">
                    <xsl:text>return handleWorkFlowKeyDown(event, '</xsl:text>
                    <xsl:value-of select="WFName"/> 
                    <xsl:text>')</xsl:text>
                </xsl:attribute>
		<xsl:if test="position() mod 2 = 0">
                    <xsl:attribute name="class">
                        <xsl:text>TBLoneTR</xsl:text>
                    </xsl:attribute>
                    <xsl:attribute name="onblur">
                        <xsl:text>this.className='TBLoneTR'</xsl:text>
                    </xsl:attribute>
                    <xsl:attribute name="onmouseover">
                        <xsl:text>this.className='TBLoneTRhover'</xsl:text>
                    </xsl:attribute>
                    <xsl:attribute name="onfocus">
                        <xsl:text>this.className='TBLoneTRhover'</xsl:text>
                    </xsl:attribute>
                    <xsl:attribute name="onmouseout">
                        <xsl:text>this.className='TBLoneTR'</xsl:text>
                    </xsl:attribute>
	 	</xsl:if>
	 	<xsl:if test="position() mod 2 != 0">
                    <xsl:attribute name="class">
                        <xsl:text>TBLoneTRalt</xsl:text>
                    </xsl:attribute>
                    <xsl:attribute name="onblur">
                        <xsl:text>this.className='TBLoneTRalt'</xsl:text>
                    </xsl:attribute>
                    <xsl:attribute name="onmouseover">
                        <xsl:text>this.className='TBLoneTRhover'</xsl:text>
                    </xsl:attribute>
                    <xsl:attribute name="onfocus">
                        <xsl:text>this.className='TBLoneTRhover'</xsl:text>
                    </xsl:attribute>
                    <xsl:attribute name="onmouseout">
                        <xsl:text>this.className='TBLoneTRalt'</xsl:text>
                    </xsl:attribute>
	 	</xsl:if>-->
                <td scope="row" >
                    <xsl:call-template name="dispXREF1">
                        <xsl:with-param name="xref">
                            <xsl:value-of select="XREF"/>
                        </xsl:with-param>
                        <xsl:with-param name="funcid">
                            <xsl:value-of select="WFName"/> 
                        </xsl:with-param>
                        <xsl:with-param name="StageStatus">
                            <xsl:value-of select="StageStatus"/> 
                        </xsl:with-param>
                        <xsl:with-param name="TxnStatus">
                            <xsl:value-of select="TxnStatus"/> 
                        </xsl:with-param>
                        <xsl:with-param name="txnBranch">
                            <xsl:value-of select="Branch"/> 
                        </xsl:with-param>
                    </xsl:call-template>
                </td> 
				<td scope="row"><span ><xsl:value-of select="TxnSeqNo"/></span></td>
                <!--<td><span class="SPNtext" tabindex='0'><xsl:value-of select="Branch"/></span></td>  -->             
                <td scope="row"><span><xsl:value-of select="Brn"/></span></td>               
                <td scope="row"><span ><xsl:value-of select="Account"/></span></td> 
                <td scope="row"><span ><xsl:value-of select="Ccy"/></span></td>
                <td scope="row"><span ><xsl:value-of select="Amount"/></span></td>
                <td scope="row"><span ><xsl:value-of select="MakerID"/></span></td>
                <td scope="row"><span ><xsl:value-of select="AssignedTo"/></span></td>
                <td scope="row" ><span ><xsl:value-of select="LockedBy"/></span></td>
                <td scope="row">
                    <span >
                        <xsl:choose>
                            <xsl:when test ="StageStatus ='IPR'"><xsl:value-of select="$in_progress"/></xsl:when>
                            <xsl:when test ="StageStatus ='COM'"><xsl:value-of select="$completed"/></xsl:when>
							<xsl:when test ="(StageStatus='WTS')and (Reversal ='N')"><xsl:value-of select="$in_progress"/></xsl:when>
                            <!--<xsl:when test ="StageStatus ='WTS'"><xsl:value-of select="$in_progress"/></xsl:when>-->
                            <xsl:when test ="StageStatus ='WMA'"><xsl:value-of select="$waiting_manual_ass"/></xsl:when>
                            <xsl:when test ="StageStatus ='DIS'"><xsl:value-of select="$deleted"/></xsl:when>
                            <xsl:when test ="StageStatus ='STH'"><xsl:value-of select="$send_to_host"/></xsl:when>
                            <xsl:when test ="(StageStatus='WTS')and (Reversal ='Y')"><xsl:value-of select="$pending_rev_auth"/></xsl:when>                        
							<xsl:when test ="TxnStatus ='REV'"><xsl:value-of select="$reversed"/></xsl:when>
                            <xsl:when test ="(TxnStatus ='FAL') and (StageStatus != 'AUTREJ')"><xsl:value-of select="$failed"/></xsl:when>	<!-- FCUBS11.1 Authorizer assignment for approval Changes -->
                            <xsl:when test ="StageStatus ='AUTAPP'"><xsl:value-of select="$approved"/></xsl:when>	
                            <xsl:when test ="StageStatus ='AUTREJ'"><xsl:value-of select="$rejected"/></xsl:when>
                            <xsl:otherwise>N.A</xsl:otherwise>
                        </xsl:choose>
                    </span>
                </td>
                <td scope="row" id = "StartDateTD"><span ><xsl:value-of select="PostingDate"/></span></td>
                <td scope="row" id = "PostingDateTD"><span ><xsl:value-of select="WFStartTime"/></span></td>
            </tr>
	</xsl:template>


	<xsl:template name="dispXREF">
		<xsl:param name="xref"/>
                <xsl:param name="txnBranch"/>
		<xsl:param name="funcid"/>
		<xsl:param name="StageStatus"/>
		<xsl:param name="TxnStatus"/>
		<xsl:choose>
                    <xsl:when test ="('STH'= $StageStatus)">
                        <xsl:value-of select="$xref"/>
                    </xsl:when>
                    
                    <xsl:when test ="('COM' = $TxnStatus)">
                        <A class="Astd" href="javascript:loadScreenForRev('{$xref}','{$txnBranch}','{$funcid}')"><xsl:value-of select="$xref"/></A>
                    </xsl:when>
                    
                    <xsl:when test ="('TNK' = $TxnStatus)">
                        <A class="Astd" href="javascript:loadScreenForRev('{$xref}','{$txnBranch}','{$funcid}')"><xsl:value-of select="$xref"/></A>
                    </xsl:when>
                    
                    <xsl:when test ="('RTK' = $TxnStatus)">
                        <A class="Astd" href="javascript:loadScreenForRev('{$xref}','{$txnBranch}','{$funcid}')"><xsl:value-of select="$xref"/></A>
                    </xsl:when>
                    
                    <xsl:when test ="('RUT' = $TxnStatus)">
                        <A class="Astd" href="javascript:loadScreenForRev('{$xref}','{$txnBranch}','{$funcid}')"><xsl:value-of select="$xref"/></A>
                    </xsl:when>
                    
                    <xsl:when test ="('UTK' = $TxnStatus)">
                        <A class="Astd" href="javascript:loadScreenForRev('{$xref}','{$txnBranch}','{$funcid}')"><xsl:value-of select="$xref"/></A>
                    </xsl:when>
                    
                    <xsl:when test ="('REV' = $TxnStatus)">
                        <A class="Astd" href="javascript:loadScreenForView('{$xref}','{$txnBranch}','{$funcid}')"><xsl:value-of select="$xref"/></A><!--//FCUBS10.3_WebBranch Changes-->
                    </xsl:when>
                    
                    <xsl:when test ="('FAL' = $TxnStatus)">
                        <A class="Astd" href="javascript:loadScreenForView('{$xref}','{$txnBranch}','{$funcid}')"><xsl:value-of select="$xref"/></A>
                    </xsl:when>
                    
                    <xsl:when test ="('AUTAPP' = $StageStatus)">
                        <A class="Astd" href="javascript:loadScreenForView('{$xref}','{$txnBranch}','{$funcid}')"><xsl:value-of select="$xref"/></A>	<!-- FCUBS11.1 Authorizer assignment for approval Changes -->
                    </xsl:when>
                    
                    <xsl:when test ="('AUTREJ' = $StageStatus)">
                        <A class="Astd" href="javascript:loadScreenForView('{$xref}','{$txnBranch}','{$funcid}')"><xsl:value-of select="$xref"/></A>	<!-- FCUBS11.1 Authorizer assignment for approval Changes -->
                    </xsl:when>
                    <xsl:otherwise>
			<!--Changed for pending task # start-->
                        <A class="Astd" href="javascript:loadScreen('{$xref}','{$txnBranch}','{$funcid}','{$TxnStatus}','{$StageStatus}')"><xsl:value-of select="$xref"/></A>
			<!--Changed for pending task # end-->
                    </xsl:otherwise>
		</xsl:choose>
	</xsl:template>
    <xsl:template name="dispXREF1"><!-- my change-->
		<xsl:param name="xref"/>
                <xsl:param name="txnBranch"/>
		<xsl:param name="funcid"/>
		<xsl:param name="StageStatus"/>
		<xsl:param name="TxnStatus"/>
		<xsl:choose>
                    <xsl:when test ="('STH'= $StageStatus)">
                        <xsl:value-of select="$xref"/>
                    </xsl:when>
                    
                    <xsl:when test ="('COM' = $TxnStatus)">
                        <A class="Anorm" href="javascript:loadScreenForRev('{$xref}','{$txnBranch}','{$funcid}')"><xsl:value-of select="$xref"/></A>
                    </xsl:when>
                    
                    <xsl:when test ="('TNK' = $TxnStatus)">
                        <A class="Anorm" href="javascript:loadScreenForRev('{$xref}','{$txnBranch}','{$funcid}')"><xsl:value-of select="$xref"/></A>
                    </xsl:when>
                    
                    <xsl:when test ="('RTK' = $TxnStatus)">
                        <A class="Anorm" href="javascript:loadScreenForRev('{$xref}','{$txnBranch}','{$funcid}')"><xsl:value-of select="$xref"/></A>
                    </xsl:when>
                    
                    <xsl:when test ="('RUT' = $TxnStatus)">
                        <A class="Anorm" href="javascript:loadScreenForRev('{$xref}','{$txnBranch}','{$funcid}')"><xsl:value-of select="$xref"/></A>
                    </xsl:when>
                    
                    <xsl:when test ="('UTK' = $TxnStatus)">
                        <A class="Anorm" href="javascript:loadScreenForRev('{$xref}','{$txnBranch}','{$funcid}')"><xsl:value-of select="$xref"/></A>
                    </xsl:when>
                    
                    <xsl:when test ="('REV' = $TxnStatus)">
                        <A class="Anorm" href="javascript:loadScreenForView('{$xref}','{$txnBranch}','{$funcid}')"><xsl:value-of select="$xref"/></A><!--//FCUBS10.3_WebBranch Changes-->
                    </xsl:when>
                    
                    <xsl:when test ="('FAL' = $TxnStatus)">
                        <A class="Anorm" href="javascript:loadScreenForView('{$xref}','{$txnBranch}','{$funcid}')"><xsl:value-of select="$xref"/></A>
                    </xsl:when>
                    
                    <xsl:when test ="('AUTAPP' = $StageStatus)">
                        <A class="Anorm" href="javascript:loadScreenForView('{$xref}','{$txnBranch}','{$funcid}')"><xsl:value-of select="$xref"/></A>	<!-- FCUBS11.1 Authorizer assignment for approval Changes -->
                    </xsl:when>
                    
                    <xsl:when test ="('AUTREJ' = $StageStatus)">
                        <A class="Anorm" href="javascript:loadScreenForView('{$xref}','{$txnBranch}','{$funcid}')"><xsl:value-of select="$xref"/></A>	<!-- FCUBS11.1 Authorizer assignment for approval Changes -->
                    </xsl:when>
                    <xsl:otherwise>
			<!--Changed for pending task # start-->
                        <A class="Anorm" href="javascript:loadScreen('{$xref}','{$txnBranch}','{$funcid}','{$TxnStatus}','{$StageStatus}')"><xsl:value-of select="$xref"/></A>
			<!--Changed for pending task # end-->
                    </xsl:otherwise>
		</xsl:choose>
	</xsl:template>
</xsl:stylesheet>
