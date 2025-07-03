<?xml version="1.0" ?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0"
                xmlns:sp="urn:oasis:names:tc:SPML:2:0"
                xmlns:dsml="urn:oasis:names:tc:DSML:2:0:core"
                exclude-result-prefixes="sp dsml">
    <xsl:output method="xml" indent="yes" omit-xml-declaration="yes"/>
    <xsl:strip-space elements="*"/>
    <xsl:param name="msgID" select="''"/>
    <xsl:param name="makerID" select="''"/>
    <xsl:param name="headOffice" select="''"/>
    <xsl:param name="source" select="''"/>
    <xsl:param name="ubsoris" select="''"/>
    <xsl:param name="entityID" select="''"/>
    <xsl:template match="/">
        <FCUBS_REQ_ENV xmlns="http://sms.ofss.com/ws/SMSUserService/CreateUserMaintSMS"
                       schemaLocation="http://sms.ofss.com/ws/SMSUserService/CreateUserMaintSMS/SM-CreateUserMaintSMS-Req-IO-MSG.XSD">
            <FCUBS_HEADER>
                <SOURCE>
                    <xsl:value-of select="$source"/>
                </SOURCE>
                <UBSCOMP><xsl:value-of select="$ubsoris"/></UBSCOMP>
                <MSGID>
                    <xsl:value-of select="$msgID"/>
                </MSGID>
                <CORRELID></CORRELID>
                <USERID>
                    <xsl:value-of select="$makerID"/>
                </USERID>
                <ENTITY>
                    <xsl:value-of select="$entityID"/>
                </ENTITY>
                <BRANCH>
                    <xsl:value-of select="$headOffice"/>
                </BRANCH>
                <MODULEID>SM</MODULEID>
                <SERVICE>SMSUserService</SERVICE>
                <OPERATION>CreateUserMaintSMS</OPERATION>
                <FUNCTIONID></FUNCTIONID>
                <ACTION></ACTION>
                <xsl:for-each select="sp:addRequest">
                    <DESTINATION>
                        <xsl:value-of select="@targetID"/>
                    </DESTINATION>
                </xsl:for-each>
            </FCUBS_HEADER>
            <FCUBS_BODY>
				<USR-Full>
					<xsl:for-each select="sp:addRequest/sp:data/dsml:attr">
						<xsl:if test='@name!="objectclass"'>
							<xsl:if test='@name="USERID"'>
								<xsl:element name="USER_ID">
									<xsl:value-of select="normalize-space(.)"/>
								</xsl:element>                                        
							</xsl:if>
							<xsl:if test='@name="LDAPUSR"'>                                        
								<xsl:element name="LDAP_USER">
									<xsl:value-of select="normalize-space(.)"/>
								</xsl:element>
							</xsl:if>
							<xsl:if test='@name="USERNAME"'>
								<xsl:element name="USER_NAME">
									<xsl:value-of select="normalize-space(.)"/>
								</xsl:element>
							</xsl:if>
							<xsl:if test='@name="USERPASSWORD"'>
								<xsl:element name="PASSWORD">
									<xsl:value-of select="normalize-space(.)"/>
								</xsl:element>
							</xsl:if>
							<xsl:if test='@name="STARTDATE"'>
								<xsl:element name="START_DATE">
									<xsl:value-of select="normalize-space(.)"/>
								</xsl:element>
							</xsl:if>
							<xsl:if test='@name="SALT"'>
								<xsl:element name="SALT">
									<xsl:value-of select="normalize-space(.)"/>
								</xsl:element>
							</xsl:if>
							<xsl:if test='@name="EMAIL"'>
								<xsl:element name="USER_EMAIL">
									<xsl:value-of select="normalize-space(.)"/>
								</xsl:element>
							</xsl:if>                                    
							<xsl:if test='@name="HOMEENTITY"'>
								<xsl:element name="HOMEEN">
									<xsl:value-of select="normalize-space(.)"/>
								</xsl:element>
							</xsl:if>
						</xsl:if>
					</xsl:for-each>
					<USER_STATUS>E</USER_STATUS>
					<User-Entity>
					<xsl:for-each select="sp:addRequest/sp:data/dsml:attr">
						<xsl:if test='@name!="objectclass"'>
						<xsl:if test='@name="USERID"'>
							<xsl:element name="USER_ID">
								 <xsl:value-of select="normalize-space(.)"/>
							</xsl:element>
						</xsl:if>
						<xsl:if test='@name="HOMEENTITY"'>
							<xsl:element name="ENTITY_ID">
								<xsl:value-of select="normalize-space(.)"/>
							</xsl:element>
						</xsl:if>
						</xsl:if>
					</xsl:for-each>
					</User-Entity>
					<Userlog-Details>
						<xsl:for-each select="sp:addRequest/sp:data/dsml:attr">
						<xsl:if test='@name!="objectclass"'>
							<xsl:if test='@name="USERID"'>
								 <xsl:element name="USER_ID">
									<xsl:value-of select="normalize-space(.)"/>
								 </xsl:element>
							</xsl:if>
						</xsl:if>
						</xsl:for-each>
						<NO_SUCCESSIVE_LOGINS>0</NO_SUCCESSIVE_LOGINS>
						<NO_CUMULATIVE_LOGINS>0</NO_CUMULATIVE_LOGINS>
					</Userlog-Details>
				</USR-Full>
            </FCUBS_BODY>
        </FCUBS_REQ_ENV>
    </xsl:template>
</xsl:stylesheet>