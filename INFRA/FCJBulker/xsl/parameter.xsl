<?xml version= "1.0" encoding= "UTF-8" ?>
<!--
*OFSS-COPYRIGHT BEGIN
*
*
*
* This source is part of the Oracle Flexcube Universal Banking Software System Software Product. 
* Copyright © 2016 , 2016, Oracle and/or its affiliates.  All rights reserved. 
*
* No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by
* any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any
* language or computer language, without the prior written permission of Oracle and/or its affiliates. 
*
* Oracle Financial Services Software Limited.
* Oracle Park, Off Western Express Highway,
* Goregaon (East), 
* Mumbai - 400 063, India.
*
*OFSS COPYRIGHT END
**      OFSS CHANGE HISTORY
**
**	Modified By   :
** 	Modified on   :
** 	Description   :
** 	Search String :
**
**       OFSS CHANGE HISTORY END

-->

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0"  xmlns="urn:swift:sag:xsd:fta.param.1.0">
	<xsl:output method="xml" encoding="UTF-8" indent="yes" />

	<xsl:param name="Responder"/>
	<xsl:param name="Service"/>
	<xsl:param name="RequestType"/>
	<xsl:param name="AckIndicator"/>
	<xsl:param name="AckResponder"/>
	<xsl:param name="AckRequestType"/>
	<xsl:param name="NonRepudiation"/>
	<xsl:param name="Sign"/>
	<xsl:param name="Priority"/>
	<xsl:param name="CopyIndicator"/>
	<xsl:param name="AuthNotifInd"/>
	<xsl:param name="Algorithm"/>
	<xsl:param name="Value"/>
	<xsl:param name="OverridesFlag"/>
	<xsl:param name="DataFileLAU"/>
	<xsl:param name="SwiftTime"/>
	<xsl:param name="Requestor"/>
	<xsl:param name="TransferRef"/>
	<xsl:param name="LogicalName"/>
	<xsl:param name="Size"/>

	<xsl:template match="/">
		<Parameters>
			<xsl:if test="$DataFileLAU='true'">
				<xsl:if test="$Algorithm!=''">
					<Signature>
						<Algorithm>
							<xsl:value-of select="$Algorithm" />
						</Algorithm>
						<Value>
							<xsl:value-of select="$Value" />
						</Value>
					</Signature>
				</xsl:if>
			</xsl:if>
			<RequestDetails>
				<xsl:if test="$SwiftTime!=''">
					<SwiftTime>
						<xsl:value-of select="$SwiftTime" />
					</SwiftTime>
				</xsl:if>
				
				<FileRequestHeader>
					<xsl:if test="$Requestor!=''">
						<Requestor>
							<xsl:value-of select="$Requestor" />
						</Requestor>	
					</xsl:if>
					<xsl:if test="$Responder!=''">
						<Responder>
							<xsl:value-of select="$Responder" />
						</Responder>	
					</xsl:if>
					<xsl:if test="$Service!=''">
						<Service>
							<xsl:value-of select="$Service" />
						</Service>
					</xsl:if>
					<xsl:if test="$RequestType!=''">
						<RequestType>
							<xsl:value-of select="$RequestType" />
						</RequestType>
					</xsl:if>
					<!--<Priority>Normal</Priority>	-->
					<xsl:if test="$Priority!=''">	
					<Priority>
						<xsl:value-of select="$Priority" />
					</Priority>
				</xsl:if>
				</FileRequestHeader>
				
				<xsl:if test="$Requestor!=''">
					<Requestor>
						<xsl:value-of select="$Requestor" />
					</Requestor>	
				</xsl:if>
				
				<xsl:if test="$Responder!=''">
					<Responder>
						<xsl:value-of select="$Responder" />
					</Responder>	
				</xsl:if>
				
				<xsl:if test="$Service!=''">
					<Service>
						<xsl:value-of select="$Service" />
					</Service>
				</xsl:if>
				
				<xsl:if test="$TransferRef!=''">
					<TransferRef>
						<xsl:value-of select="$TransferRef" />
					</TransferRef>
				</xsl:if>
				
				<xsl:if test="$LogicalName!=''">
					<LogicalName>
						<xsl:value-of select="$LogicalName" />
					</LogicalName>
				</xsl:if>
				
				<xsl:if test="$Size!=''">
					<Size>
						<xsl:value-of select="$Size" />
					</Size>
				</xsl:if>
				
			</RequestDetails>
			<xsl:if test="$OverridesFlag='true'">
				<Overrides>
				<xsl:if test="$Responder!=''">
					<Responder>
						<xsl:value-of select="$Responder" />
					</Responder>	
				</xsl:if>
				
				<xsl:if test="$Service!=''">
					<Service>
						<xsl:value-of select="$Service" />
					</Service>
				</xsl:if>
				
				<xsl:if test="$RequestType!=''">
					<RequestType>
						<xsl:value-of select="$RequestType" />
					</RequestType>
				</xsl:if>
				<xsl:if test="$AckIndicator!=''">
					<AckIndicator>
						<xsl:value-of select="$AckIndicator" />
					</AckIndicator>
				</xsl:if>
				<xsl:if test="$AckResponder!=''">
					<AckResponder>
						<xsl:value-of select="$AckResponder" />
					</AckResponder>
				</xsl:if>
				<xsl:if test="$AckRequestType!=''">
					<AckRequestType>
						<xsl:value-of select="$AckRequestType" />
					</AckRequestType>
				</xsl:if>
				<xsl:if test="$NonRepudiation!=''">
					<NonRepudiation>
						<xsl:value-of select="$NonRepudiation" />
					</NonRepudiation>
				</xsl:if>	
				<xsl:if test="$Sign!=''">	
					<Sign>
						<xsl:value-of select="$Sign" />
					</Sign>
				</xsl:if>	
				<xsl:if test="$Priority!=''">	
					<Priority>
						<xsl:value-of select="$Priority" />
					</Priority>
				</xsl:if>	
				<xsl:if test="$CopyIndicator!=''">
					<CopyIndicator>
						<xsl:value-of select="$CopyIndicator" />
					</CopyIndicator>
				</xsl:if>
				<xsl:if test="$AuthNotifInd!=''">				
					<AuthNotifInd>
						<xsl:value-of select="$AuthNotifInd" />
					</AuthNotifInd>
					</xsl:if>
				
				</Overrides>
			</xsl:if>
		</Parameters>
	</xsl:template>
</xsl:stylesheet>