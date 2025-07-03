<?xml version="1.0" ?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0"
                xmlns:sp="urn:oasis:names:tc:SPML:2:0"
                xmlns:sp1="urn:oasis:names:tc:SPML:2:0:suspend"
                xmlns:sp2="urn:oasis:names:tc:SPML:2:0:password"
                xmlns:dsml="urn:oasis:names:tc:DSML:2:0:core"
                exclude-result-prefixes="sp dsml sp1 sp2">
    <xsl:output method="xml" indent="yes" omit-xml-declaration="no"/>
    <xsl:param name="msgID" select="''"/>
    <xsl:param name="makerID" select="''"/>
    <xsl:param name="headOffice" select="''"/>
    <xsl:param name="source" select="''"/>
    <xsl:param name="ubsoris" select="''"/>
    <xsl:param name="entityID" select="''"/>
    <xsl:template match="/">
        <FCUBS_REQ_ENV xmlns="http://sms.ofss.com/ws/SMSUserService/QueryUserMaintSMS"
                       schemaLocation="http://sms.ofss.com/ws/SMSUserService/QueryUserMaintSMS/SM-QueryUserMaintSMS-Req-IO-MSG.XSD">
            <FCUBS_HEADER>
                <SOURCE>
                    <xsl:value-of select="$source"/>
                </SOURCE>
                <UBSCOMP>
                    <xsl:value-of select="$ubsoris"/>
                </UBSCOMP>
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
                <OPERATION>QueryUserMaintSMS</OPERATION>
                <FUNCTIONID></FUNCTIONID>
                <ACTION></ACTION>
            </FCUBS_HEADER>
            <FCUBS_BODY>
                <USR-Full>
                    <USER_ID>
                                <xsl:for-each select="sp:modifyRequest/sp:psoID | sp:deleteRequest/sp:psoID | sp1:suspendRequest/sp1:psoID |sp1:resumeRequest/sp1:psoID | sp2:setPasswordRequest/sp2:psoID">
                                    <xsl:value-of select="@ID"/>
                                </xsl:for-each>
                    </USER_ID>
                </USR-Full>
            </FCUBS_BODY>
        </FCUBS_REQ_ENV>
    </xsl:template>
</xsl:stylesheet>
