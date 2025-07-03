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

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:Sw="urn:swift:snl:ns.Sw" xmlns:SwInt="urn:swift:snl:ns.SwInt" xmlns:SwGbl="urn:swift:snl:ns.SwGbl" xmlns:SwSec="urn:swift:snl:ns.SwSec">

	<xsl:output method="xml" indent="yes" encoding="UTF-8"/>

	<xsl:param name="UserDN"/>
	<xsl:param name="Requestor"/>
	<xsl:param name="Responder"/>
	<xsl:param name="Service"/>
	<xsl:param name="PhysicalName"/>
	<xsl:param name="MsgId"/>
	<xsl:param name="LogicalName"/>
	<xsl:param name="TransactionRef"/>
	<xsl:param name="DeliveryMode"/>
	<xsl:param name="DeliveryNotif"/>
	<xsl:param name="NotifQueue"/>
	<xsl:param name="RequestCrypto"/>
	<xsl:param name="ReqNrIndicator"/>
	<xsl:param name="CompressionType"/>
	<xsl:param name="RequestType"/>
	<xsl:param name="TransferEp"/>
	<xsl:param name="CreationTime"/>
	<xsl:param name="CRCValue"/>
	<xsl:param name="TotalNbOfTxn"/>
	<xsl:param name="BADelNotifReqType"/>
	<xsl:param name="DigestAlgo"/>
	<xsl:param name="DigestVal"/>
	<xsl:param name="RMAChecked"/>
	<!--Start Swift7.0 changes for Product List -->
	<xsl:param name="VendorName"/>
	<xsl:param name="ProductName"/>
	<xsl:param name="ProductVersion"/>
	
	<xsl:param name="BAVendorName"/>
	<xsl:param name="BAProductName"/>
	<xsl:param name="BAProductVersion"/>
	
	<!--End Swift7.0 changes for Product List -->

	<xsl:template match="/">
		<Sw:ExchangeFileRequest>
			<SwSec:AuthorisationContext>
				<SwSec:UserDN><xsl:value-of select="$UserDN"/></SwSec:UserDN>
			</SwSec:AuthorisationContext>
			<Sw:FileRequest>
			
				<xsl:call-template name="FileRequestControl"></xsl:call-template>
				
				<xsl:if test="($MsgId!='') or ($CreationTime!='')">
					<xsl:call-template name="FileRequestE2EControl"></xsl:call-template>
				</xsl:if>
				<xsl:call-template name="FileRequestHeader"></xsl:call-template>
				<xsl:call-template name="FileOpRequest"></xsl:call-template>
			</Sw:FileRequest>
		</Sw:ExchangeFileRequest>
	</xsl:template>

	<xsl:template name="FileRequestE2EControl">
		<Sw:FileRequestE2EControl>
			<xsl:if test="$MsgId!=''">
				<Sw:MsgId><xsl:value-of select="$MsgId"/></Sw:MsgId>
			</xsl:if>
			<xsl:if test="$CreationTime!=''">
				<Sw:CreationTime><xsl:value-of select="$CreationTime"/></Sw:CreationTime>
			</xsl:if>
			<xsl:if test="$TotalNbOfTxn!=''">
			<Sw:HeaderInfo>
			<ApplSpcfc xmlns="urn:swift:xsd:ApplSpcfc.TxsCntr.01">
			<TxsCntr>
			<TtlNbOfTxs><xsl:value-of select="$TotalNbOfTxn"/></TtlNbOfTxs>
			</TxsCntr>
			</ApplSpcfc>
			</Sw:HeaderInfo>
			</xsl:if>
		</Sw:FileRequestE2EControl>
	</xsl:template>

	<xsl:template name="FileRequestHeader">
		<Sw:FileRequestHeader>
			<SwInt:Requestor><xsl:value-of select="$Requestor"/></SwInt:Requestor>
			<SwInt:Responder><xsl:value-of select="$Responder"/></SwInt:Responder>
			<SwInt:Service><xsl:value-of select="$Service"/></SwInt:Service>	
			<SwInt:RequestType><xsl:value-of select="$RequestType"/></SwInt:RequestType>	
			<SwInt:RequestRef><xsl:value-of select="$TransactionRef"/></SwInt:RequestRef>
		</Sw:FileRequestHeader>
	</xsl:template>

	<xsl:template name="FileOpRequest">
		<Sw:FileOpRequest>
			<Sw:PutFileRequest>
			
				<xsl:if test="$DeliveryNotif != 'FALSE'">
					<xsl:if test="$BADelNotifReqType != ''">
						<Sw:AckIndicator><xsl:value-of select="$DeliveryNotif"/></Sw:AckIndicator>

						<Sw:AckServerInfo>
								<SwInt:Responder><xsl:value-of select="$Requestor"/></SwInt:Responder>
								<SwInt:RequestType><xsl:value-of select="$BADelNotifReqType"/></SwInt:RequestType>
						</Sw:AckServerInfo>
					</xsl:if>
				</xsl:if>
				
				<Sw:PhysicalName><xsl:value-of select="$PhysicalName"/></Sw:PhysicalName>
				<Sw:LogicalName><xsl:value-of select="$LogicalName"/></Sw:LogicalName>
				<!--<Sw:FileInfo>SwCompression=Zip</Sw:FileInfo>-->
				<Sw:FileInfo>SwCompression=<xsl:value-of select="$CompressionType"/>
				<xsl:if test="$CRCValue!=''">;CRCValue=<xsl:value-of select="$CRCValue"/>;</xsl:if>
				</Sw:FileInfo>
				<xsl:if test="($DigestAlgo!='') and ($DigestVal!='')">
				<Sw:Digest>
				<Sw:DigestAlgorithm><xsl:value-of select="$DigestAlgo"/></Sw:DigestAlgorithm>
				<Sw:DigestValue><xsl:value-of select="$DigestVal"/></Sw:DigestValue>
				</Sw:Digest>
			</xsl:if>
			</Sw:PutFileRequest>
		</Sw:FileOpRequest>
	</xsl:template>
	
	<xsl:template name="FileRequestControl">
			<Sw:FileRequestControl> 
				<SwInt:RequestCrypto><xsl:value-of select="$RequestCrypto"/></SwInt:RequestCrypto>
				<SwInt:NRIndicator><xsl:value-of select="$ReqNrIndicator"/></SwInt:NRIndicator>
				<xsl:if test="$DeliveryMode='SnF'">
					<SwInt:DeliveryCtrl>
						<SwInt:DeliveryMode><xsl:value-of select="$DeliveryMode"/></SwInt:DeliveryMode>
						<SwInt:NotifQueue><xsl:value-of select="$NotifQueue"/></SwInt:NotifQueue>
						<Sw:DeliveryNotif><xsl:value-of select="$DeliveryNotif"/></Sw:DeliveryNotif>
					</SwInt:DeliveryCtrl>
				</xsl:if>
				<xsl:if test="$TransferEp!=''">
					<Sw:TransferEP><xsl:value-of select="$TransferEp"/></Sw:TransferEP>
				</xsl:if>
				<!--Start Swift7.0 changes for Product List -->
				<xsl:call-template name="ProductList"></xsl:call-template>
				<!--End Swift7.0 changes for Product List -->

				
			<!--START :Changes made for RMA validation SWIFT 7.0 changes -->	
			<xsl:if test="$RMAChecked!=''">
				<Sw:RMAChecked><xsl:value-of select="$RMAChecked"/></Sw:RMAChecked>
			</xsl:if>
            <!--END :Changes made for RMA validation SWIFT 7.0 changes -->	
				
			</Sw:FileRequestControl> 
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
	<!--End Swift7.0 changes for Product List -->	
	<!--Start Swift7.0 changes for BA Product List By charu -->
		<xsl:if test="$BAVendorName !='' or $BAProductName != '' or $BAProductVersion != ''" >
			<Sw:ProductInfo> 
				<xsl:if test="$BAVendorName!=''">
					<Sw:VendorName><xsl:value-of select="$BAVendorName"/></Sw:VendorName>
				</xsl:if>
				<xsl:if test="$BAProductName!=''">
					<Sw:ProductName><xsl:value-of select="$BAProductName"/></Sw:ProductName>
				</xsl:if>
				<xsl:if test="$BAProductVersion!=''">
					<Sw:ProductVersion><xsl:value-of select="$BAProductVersion"/></Sw:ProductVersion>
				</xsl:if>				
			</Sw:ProductInfo>
		</xsl:if>	
		<!-- End Swift7.0 changes for BA Product List -->
	</xsl:template>
	<!--End Swift7.0 changes for Product List -->

</xsl:stylesheet>

