<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
 <xsl:param name="screen"/>

	<xsl:template match="/">
			<xsl:apply-templates select="MENU"></xsl:apply-templates>
	</xsl:template>

	<xsl:template match="MENU">
		<a name="hrefTasks"></a>
	<xsl:if test="$screen!='SMBPLDBD'">
		<ul id="treemenu2" class="treeview">
			<xsl:apply-templates select="*"></xsl:apply-templates>
		</ul>
	</xsl:if> 
	<xsl:if test="$screen='SMBPLDBD'">
		<ul id="treemenu4" class="treeview">
			<xsl:apply-templates select="*"></xsl:apply-templates>
		</ul>
	</xsl:if> 	
	</xsl:template>

	<xsl:template match="*">
		<xsl:variable name="NodeId" select="generate-id(current())"/>
		<xsl:if test="count(descendant::*) > 0"> <!--  has child nodes -->
			<li id="submenu">
		<xsl:if test="$screen!='SMBPLDBD'">
			<a class="Astd" href="#" id="F{$NodeId}A" menuid="{@ID}" onclick="javascript:return showQueueTabs('{@QUEUENAMES}',false,'event');">
     <xsl:value-of select="@LABEL"/>
    </a>
		</xsl:if> 
		<xsl:if test="$screen='SMBPLDBD'">
			<a class="Astd" href="#" id="F{$NodeId}A" menuid="{@ID}" onclick="javascript:return showQueueTabs('{@QUEUENAMES}',true,'event');">
			 <xsl:value-of select="@LABEL"/>
			</a>
		</xsl:if> 
				<ul id="treemenu">
					<xsl:apply-templates select="*"></xsl:apply-templates>
				</ul>		
			</li>
		</xsl:if>
		<xsl:if test="count(descendant::*) &lt; 1"> <!--  no child nodes -->
			<xsl:choose>
				<xsl:when test="@SEARCH = 'Y'">
					<li>
						<a class="Astd" count="" title="" processCode="{@PROCESSCODE}" onclick="javascript:return displaySearchPane('{@PROCESSCODE}','event');" href="#" id="F{$NodeId}A">
							<xsl:value-of select="@LABEL" />
						</a>
					</li>
				</xsl:when>
				<xsl:otherwise>
					<li>
      <xsl:if test="@ISDASHBOARD = 'N'">
       <!--  has child nodes -->
       <a class="Astd" count="" title="" queueId="{@QUEUEID}"
          onclick="javascript:return displayQueueTasksProxy('{@queueId}','{@LABEL}', 'event');"
          href="#" id="{@queueId}">
							<xsl:value-of select="@LABEL" />
						</a>
      </xsl:if>
      <xsl:if test="@ISDASHBOARD = 'Y'">
       <!--  has child nodes -->
       <a class="Astd" count="" title="" queueId="{@QUEUEID}"
          onclick="javascript:return displayDashboardQueue('{@queueNames}', '{@queueTypes}','{@bamUrl}','{@filedList}','{@actions}','{@desc}','event');"
          href="#" id="{@queueId}">
        <xsl:value-of select="@LABEL"/>
       </a>
      </xsl:if>
					</li>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:if>
	</xsl:template>
	
</xsl:stylesheet>
