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
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0" xmlns:Sw="urn:swift:snl:ns.Sw" xmlns:SwInt="urn:swift:snl:ns.SwInt" xmlns:SwGbl="urn:swift:snl:ns.SwGbl" xmlns:SwSec="urn:swift:snl:ns.SwSec">
	<xsl:output method="xml" indent="yes" encoding="UTF-8"/>
	
	<xsl:param name="UserDN"/>
	<xsl:param name="CreationTime"/>
	<xsl:param name="ResponderDN"/>
	
	<xsl:variable name="TransferStatus"> <xsl:value-of select="/Sw:HandleFileEventRequest/Sw:FileStatus/Sw:TransferStatus" /></xsl:variable>
	<xsl:variable name="DigestAlgo"><xsl:value-of select="/Sw:HandleFileEventRequest/Sw:FileStatus/Sw:FileStatusDetails/Sw:Digest/Sw:DigestAlgorithm" /></xsl:variable>
	<xsl:variable name="DigestVal"><xsl:value-of select="/Sw:HandleFileEventRequest/Sw:FileStatus/Sw:FileStatusDetails/Sw:Digest/Sw:DigestValue" /></xsl:variable>
	

	<!--Start Swift7.0 changes for Product List -->
	<xsl:param name="VendorName"/>
	<xsl:param name="ProductName"/>
	<xsl:param name="ProductVersion"/>
	<!--End Swift7.0 changes for Product List -->
	
	<xsl:template match="/">
		
		<Sw:ExchangeFileRequest>
			<SwSec:AuthorisationContext>
				<SwSec:UserDN><xsl:value-of select="$UserDN"/></SwSec:UserDN>
			</SwSec:AuthorisationContext>
			<Sw:FileRequest> 
				<xsl:call-template name="FileRequestControl"></xsl:call-template>
				<xsl:call-template name="FileRequestE2EControl"></xsl:call-template>
				<xsl:call-template name="FileRequestHeader"></xsl:call-template>
				<Sw:FileOpRequest> 
					<xsl:call-template name="AckFileRequest"></xsl:call-template>   
				</Sw:FileOpRequest>
			</Sw:FileRequest>
		</Sw:ExchangeFileRequest>
	</xsl:template>
	

	<xsl:template name="FileRequestE2EControl">
		<Sw:FileRequestE2EControl>
			<xsl:if test="count(/Sw:HandleFileEventRequest/Sw:FileStatus/Sw:MsgId)!=0">
				<Sw:MsgId><xsl:value-of select="/Sw:HandleFileEventRequest/Sw:FileStatus/Sw:MsgId"/></Sw:MsgId>
			</xsl:if>
			<Sw:CreationTime><xsl:value-of select="$CreationTime"/></Sw:CreationTime>		
		</Sw:FileRequestE2EControl>
	</xsl:template>
	
	
	<xsl:template name="FileRequestHeader">
		<Sw:FileRequestHeader>
			<SwInt:Requestor><xsl:value-of select="/Sw:HandleFileEventRequest/Sw:FileStatus/Sw:FileRequestHeader/SwInt:Responder"/></SwInt:Requestor>
			<SwInt:Responder><xsl:value-of select="$ResponderDN"/></SwInt:Responder>
			<SwInt:Service><xsl:value-of select="/Sw:HandleFileEventRequest/Sw:FileStatus/Sw:FileRequestHeader/SwInt:Service"/></SwInt:Service>
			<xsl:choose>
			<xsl:when test= "count(/Sw:HandleFileEventRequest/Sw:FileStatus/Sw:FileStatusDetails/Sw:AckServerInfo/SwInt:RequestType)!=0">
				<SwInt:RequestType><xsl:value-of select="/Sw:HandleFileEventRequest/Sw:FileStatus/Sw:FileStatusDetails/Sw:AckServerInfo/SwInt:RequestType"/></SwInt:RequestType>
			</xsl:when>
			<xsl:otherwise>
				<xsl:if test="count(/Sw:HandleFileEventRequest/Sw:FileStatus/Sw:FileRequestHeader/SwInt:RequestType)!=0">
					<SwInt:RequestType><xsl:value-of select="/Sw:HandleFileEventRequest/Sw:FileStatus/Sw:FileRequestHeader/SwInt:RequestType"/></SwInt:RequestType>
				</xsl:if>
			</xsl:otherwise>
			</xsl:choose>
			<xsl:if test="count(/Sw:HandleFileEventRequest/Sw:FileStatus/Sw:FileRequestHeader/SwInt:Priority)!=0">
				<SwInt:Priority><xsl:value-of select="/Sw:HandleFileEventRequest/Sw:FileStatus/Sw:FileRequestHeader/SwInt:Priority"/></SwInt:Priority>
			</xsl:if>
			<xsl:if test="count(/Sw:HandleFileEventRequest/Sw:FileStatus/Sw:FileRequestHeader/SwInt:RequestRef)!=0">
				<SwInt:RequestRef><xsl:value-of select="/Sw:HandleFileEventRequest/Sw:FileStatus/Sw:FileRequestHeader/SwInt:RequestRef"/></SwInt:RequestRef>
			</xsl:if>
		</Sw:FileRequestHeader>
	</xsl:template>
	
	<xsl:template name="AckFileRequest">
		<Sw:AckFileRequest>
			<Sw:TransferRef><xsl:value-of select="/Sw:HandleFileEventRequest/Sw:FileStatus/Sw:TransferRef"/></Sw:TransferRef>
			<xsl:if test="($DigestAlgo!='') and ($DigestVal!='')">
				<Sw:Digest>
				<Sw:DigestAlgorithm><xsl:value-of select="$DigestAlgo"/></Sw:DigestAlgorithm>
				<Sw:DigestValue><xsl:value-of select="$DigestVal"/></Sw:DigestValue>
				</Sw:Digest>
			</xsl:if>
			<xsl:choose>
				<xsl:when test="($TransferStatus='Completed') or ($TransferStatus='Accepted')">
					<Sw:Accepted>TRUE</Sw:Accepted>
				</xsl:when>
				<xsl:otherwise>
					<Sw:Accepted>FALSE</Sw:Accepted>
				</xsl:otherwise>
			</xsl:choose>
			<!--<Sw:Accepted>TRUE</Sw:Accepted>-->
		</Sw:AckFileRequest>
	</xsl:template>
	
	<xsl:template name="FileRequestControl">
		<!--<xsl:if test="count(/Sw:HandleFileEventRequest/Sw:FileStatus/Sw:FileStatusDetails/SwInt:NonRep/SwInt:NRType) !=0">-->
		<Sw:FileRequestControl> 
			<SwInt:RequestCrypto>TRUE</SwInt:RequestCrypto>
			<SwInt:NRIndicator>TRUE</SwInt:NRIndicator>
			<xsl:call-template name="ProductList"></xsl:call-template>
		</Sw:FileRequestControl> 
		<!--</xsl:if>-->
		
	</xsl:template>

	<xsl:template name="ProductList">
		<Sw:ProductList> 
			<xsl:call-template name="ProductInfo"></xsl:call-template>	
		</Sw:ProductList>
	</xsl:template>
	<xsl:template name="ProductInfo">
		<Sw:ProductInfo> 
				<Sw:VendorName><xsl:value-of select="$VendorName"/></Sw:VendorName>
				<Sw:ProductName><xsl:value-of select="$ProductName"/></Sw:ProductName>
				<Sw:ProductVersion><xsl:value-of select="$ProductVersion"/></Sw:ProductVersion>
		</Sw:ProductInfo>
	</xsl:template>
</xsl:stylesheet>