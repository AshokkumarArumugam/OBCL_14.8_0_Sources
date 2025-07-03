<?xml version="1.0" ?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    <xsl:strip-space elements="*"/>
    <xsl:output method="xml" indent="yes" omit-xml-declaration="no"/>
    <xsl:param name="msgID" select="''"/>
    <xsl:param name="makerID" select="''"/>
    <xsl:param name="headOffice" select="''"/>
    <xsl:param name="source" select="''"/>
    <xsl:param name="ubsoris" select="''"/>
    <xsl:param name="entityID" select="''"/>
    <xsl:template match="/">
        <FCUBS_REQ_ENV xmlns="http://sms.ofss.com/ws/SMSUserService/ModifyUserMaintSMS"
                       schemaLocation="http://sms.ofss.com/ws/SMSUserService/ModifyUserMaintSMS/SM-ModifyUserMaintSMS-Req-IO-MSG.XSD">
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
                <OPERATION>ModifyUserMaintSMS</OPERATION>
                <FUNCTIONID></FUNCTIONID>
                <ACTION></ACTION>
                <xsl:for-each select="//FCUBS_HEADER/SOURCE">
                    <DESTINATION>
                        <xsl:value-of select="."/>
                    </DESTINATION>
                </xsl:for-each>
            </FCUBS_HEADER>
            <FCUBS_BODY>
                <xsl:apply-templates select="//FCUBS_BODY/USR-Full"/>
            </FCUBS_BODY>
        </FCUBS_REQ_ENV>
    </xsl:template>
    <xsl:template match="node()">
        <xsl:if test='not(name(.)="MODNO")'>
            <xsl:element name="{local-name()}" namespace="{namespace-uri()}">
                <xsl:apply-templates select="@*|node()|text()"/>
            </xsl:element>
        </xsl:if>
    </xsl:template>
    <xsl:template match="@*">
        <xsl:copy/>
    </xsl:template>
    <xsl:template match="text()" priority="1">
        <xsl:value-of select="."/>
    </xsl:template>
</xsl:stylesheet>



