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

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fn="http://www.w3.org/2005/02/xpath-functions" xmlns:Sw="urn:swift:snl:ns.Sw" xmlns:SwInt="urn:swift:snl:ns.SwInt" xmlns:SwGbl="urn:swift:snl:ns.SwGbl" xmlns:SwSec="urn:swift:snl:ns.SwSec">

	<!--
	<xsl:namespace-alias stylesheet-prefix="Sw" result-prefix=""/>
	<xsl:namespace-alias stylesheet-prefix="SwInt" result-prefix=""/>
	<xsl:namespace-alias stylesheet-prefix="SwGbl" result-prefix=""/>
	<xsl:namespace-alias stylesheet-prefix="SwSec" result-prefix=""/>
	-->
	<xsl:output method="xml" indent="yes" encoding="UTF-8"/>

	<xsl:param name="UserDN"/>
	<xsl:param name="ResponseCrypto"/>
	<xsl:param name="NrIndicator"/>
	<xsl:param name="EventEp"/>
	<xsl:param name="TransferEp"/>
	<xsl:param name="Partition"/>
	<xsl:param name="TransferKey" />
	<xsl:param name="LocalRef" />
	<xsl:param name="TransactionRef"/>
	<xsl:param name="OperationType"/>
	<xsl:param name="PhysicalName"/>
	<xsl:param name="CompressionType"/>
	<xsl:param name="FileDesc" />
	<xsl:param name="FileInfo" />
	<xsl:param name="AckIndicator"/>
	<xsl:param name="Size" />
	<xsl:param name="DigestAlgo"/>
	<xsl:param name="DigestVal" />
	<xsl:param name="TransferAnswer" />
	<xsl:param name="RejectDesc" />
	<xsl:param name="IsSnF"/>
	<xsl:param name="SnFRef"/>
	<xsl:param name="CRCValue"/>
	<!--Start Swift7.0 changes for Product List -->
	<xsl:param name="VendorName"/>
	<xsl:param name="ProductName"/>
	<xsl:param name="ProductVersion"/>
	<!--End Swift7.0 changes for Product List -->
	
	<xsl:variable name="MsgId" ><xsl:value-of select="/Sw:HandleFileRequest/Sw:FileRequestHandle/Sw:FileRequestE2EControl/Sw:MsgId" /></xsl:variable>
	<xsl:variable name="CreationTime" ><xsl:value-of select="/Sw:HandleFileRequest/Sw:FileRequestHandle/Sw:FileRequestE2EControl/Sw:CreationTime" /></xsl:variable>

	<xsl:template match="/">
		<Sw:HandleFileResponse>
			<SwSec:AuthorisationContext>
				<SwSec:UserDN><xsl:value-of select="$UserDN"/></SwSec:UserDN>
			</SwSec:AuthorisationContext>
			<Sw:FileResponse>
				<xsl:if test="($ResponseCrypto!='') or ($NrIndicator!='') or ($EventEp!='')
						   or ($TransferEp!='') or ($Partition!='') or ($TransferKey!='') or ($LocalRef!='')">
					<xsl:call-template name="FileResponseControl"></xsl:call-template>
				</xsl:if>
				<xsl:if test="($MsgId!='') or ($CreationTime!='') or (count(/Sw:HandleFileRequest/Sw:FileRequestHandle/Sw:FileRequestE2EControl/Sw:PDIndication)!=0)">
					<xsl:call-template name="FileResponseE2EControl"></xsl:call-template>
				</xsl:if>

				<xsl:call-template name="FileResponseHeader"></xsl:call-template>

				<Sw:FileOpResponse>
					<xsl:choose>
						<xsl:when test="$IsSnF='True'">
					 		<NotifyFileOpResponse/>  
						 </xsl:when>
						 
						 <xsl:otherwise>
						 	<xsl:if test="$OperationType='PUT'">
						 		<xsl:call-template name="PutFileOpResponse"></xsl:call-template>   
						 	</xsl:if>
						 
						 	<xsl:if test="$OperationType='GET'">
						 		<xsl:call-template name="GetFileOpResponse"></xsl:call-template>
						 	</xsl:if>
						 </xsl:otherwise>
					</xsl:choose>
					
				</Sw:FileOpResponse>
			</Sw:FileResponse>
		</Sw:HandleFileResponse>
	</xsl:template>

	<xsl:template name="FileResponseControl">
		<Sw:FileResponseControl>
		
			<xsl:choose>
			<xsl:when test= "count(/Sw:HandleFileRequest/Sw:FileRequestHandle/Sw:FileRequestDescriptor/SwInt:NonRep/SwInt:NRType)!=0" >
				<SwInt:ResponseCrypto>TRUE</SwInt:ResponseCrypto>
				<SwInt:NRIndicator>TRUE</SwInt:NRIndicator>
			</xsl:when>	
			<xsl:otherwise>
				<xsl:if test="$ResponseCrypto!=''">
					<SwInt:ResponseCrypto><xsl:value-of select="$ResponseCrypto"/></SwInt:ResponseCrypto>
				</xsl:if>
				<xsl:if test="$NrIndicator!=''">
					<SwInt:NRIndicator><xsl:value-of select="$NrIndicator"/></SwInt:NRIndicator>
				</xsl:if>
			</xsl:otherwise>
			</xsl:choose>
			<xsl:if test="$EventEp!=''">
				<Sw:EventEP><xsl:value-of select="$EventEp"/></Sw:EventEP>
			</xsl:if>
			<xsl:if test="$TransferEp!=''">
				<Sw:TransferEP><xsl:value-of select="$TransferEp"/></Sw:TransferEP>
			</xsl:if>
			<xsl:if test="$Partition!=''">
				<Sw:Partition><xsl:value-of select="$Partition"/></Sw:Partition>
			</xsl:if>
			<xsl:if test="$TransferKey!=''">
				<Sw:TransferKey><xsl:value-of select="$TransferKey"/></Sw:TransferKey>
			</xsl:if>
			<xsl:if test="$LocalRef!=''">
				<Sw:LocalRef><xsl:value-of select="$LocalRef"/></Sw:LocalRef>
			</xsl:if>
			<!--Start Swift7.0 changes for Product List -->
			<xsl:call-template name="ProductList"></xsl:call-template>			
			<!--End Swift7.0 changes for Product List -->
	    </Sw:FileResponseControl>
	</xsl:template>
	<!--Start Swift7.0 changes for Product List -->
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
	<!--End Swift7.0 changes for Product List -->
	<xsl:template name="FileResponseE2EControl">
		<Sw:FileResponseE2EControl>
			<xsl:if test="$MsgId!=''">
				<Sw:MsgId><xsl:value-of select="$MsgId"/></Sw:MsgId>
			</xsl:if>
			<xsl:if test="$CreationTime!=''">
				<Sw:CreationTime><xsl:value-of select="$CreationTime"/></Sw:CreationTime>
			</xsl:if>
			<xsl:if test="count(/Sw:HandleFileRequest/Sw:FileRequestHandle/Sw:FileRequestE2EControl/Sw:PDIndication)!=0">
				<Sw:PDIndication>
					<xsl:if test="count(/Sw:HandleFileRequest/Sw:FileRequestHandle/Sw:FileRequestE2EControl/Sw:PDIndication/Sw:EmissionList)!=0">
						<Sw:EmissionList>
								<xsl:for-each select='/Sw:HandleFileRequest/Sw:FileRequestHandle/Sw:FileRequestE2EControl/Sw:PDIndication/Sw:EmissionList/Sw:EmissionTime'>
									<Sw:EmissionTime><xsl:value-of select="."/></Sw:EmissionTime>
								</xsl:for-each>
						</Sw:EmissionList>
					</xsl:if>
				</Sw:PDIndication>
			</xsl:if>
		</Sw:FileResponseE2EControl>
	</xsl:template>

	<xsl:template name="FileResponseHeader">
		<Sw:FileResponseHeader>
			<SwInt:Responder><xsl:value-of select='/Sw:HandleFileRequest/Sw:FileRequestHandle/Sw:FileRequestHeader/SwInt:Responder'/></SwInt:Responder>
			<SwInt:ResponseRef><xsl:value-of select="$TransactionRef"/></SwInt:ResponseRef>
		</Sw:FileResponseHeader>
	</xsl:template>

	<xsl:template name="PutFileOpResponse">
		<Sw:PutFileResponse>
		<!--Start Swift7.0 changes for Inbound SignatureList -->
			<Sw:TransferAnswer><xsl:value-of select="$TransferAnswer"/></Sw:TransferAnswer>
			<xsl:choose>
			<xsl:when test="($TransferAnswer!='') and ($TransferAnswer='Rejected')">
					<Sw:RejectDescription><xsl:value-of select="$RejectDesc"/></Sw:RejectDescription>
					<Sw:RejectInfo><xsl:value-of select="$RejectDesc"/></Sw:RejectInfo>
			</xsl:when>
			<xsl:otherwise>
				<Sw:PhysicalName><xsl:value-of select="$PhysicalName"/></Sw:PhysicalName>
			</xsl:otherwise>
			</xsl:choose>
		<!--End Swift7.0 changes for Inbound SignatureList -->
		</Sw:PutFileResponse>
	</xsl:template>

	<xsl:template name="GetFileOpResponse">
		<xsl:choose>
			<xsl:when test="($TransferAnswer!='') and ($TransferAnswer='Rejected')">
				<Sw:GetFileResponse>
					<Sw:TransferAnswer>Rejected</Sw:TransferAnswer>
					<Sw:RejectDescription><xsl:value-of select="$RejectDesc"/></Sw:RejectDescription>
					<Sw:RejectInfo><xsl:value-of select="$RejectDesc"/></Sw:RejectInfo>
				</Sw:GetFileResponse>
			</xsl:when>
			<xsl:otherwise>
				<Sw:GetFileResponse>
					<Sw:TransferAnswer>Accepted</Sw:TransferAnswer>
					<Sw:PhysicalName><xsl:value-of select="$PhysicalName"/></Sw:PhysicalName>
					<xsl:if test="$FileDesc!=''">
						<Sw:FileDescription> <xsl:value-of select="$FileDesc"/></Sw:FileDescription>
					</xsl:if>
					<Sw:FileInfo>SwCompression=<xsl:value-of select="$CompressionType"/>
					<xsl:if test="$CRCValue!=''">
					;CRCValue=<xsl:value-of select="$CRCValue"/>
					</xsl:if>
					</Sw:FileInfo>					
					
					<xsl:if test="$AckIndicator!=''">
						<Sw:AckIndicator><xsl:value-of select="$AckIndicator"/></Sw:AckIndicator>
						<Sw:AckServerInfo>
						<SwInt:Responder><xsl:value-of select='/Sw:HandleFileRequest/Sw:FileRequestHandle/Sw:FileRequestHeader/SwInt:Responder'/></SwInt:Responder>
						<!-- Start Swift 7.0 changes for RequestType -->
						<SwInt:RequestType><xsl:value-of select='/Sw:HandleFileRequest/Sw:FileRequestHandle/Sw:FileRequestHeader/SwInt:RequestType'/></SwInt:RequestType>
						<!-- End Swift 7.0 changes for RequestType -->
						</Sw:AckServerInfo>
					</xsl:if>
					<xsl:if test="$Size!=''">
						<Sw:Size><xsl:value-of select="$Size"/></Sw:Size>
					</xsl:if>
					<xsl:if test="($DigestAlgo!='') and ($DigestVal!='')">
						<Sw:Digest>
							<Sw:DigestAlgorithm><xsl:value-of select="$DigestAlgo"/></Sw:DigestAlgorithm>
							<Sw:DigestValue><xsl:value-of select="$DigestVal"/></Sw:DigestValue>
						</Sw:Digest>
					</xsl:if>					
				</Sw:GetFileResponse>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>	
</xsl:stylesheet>