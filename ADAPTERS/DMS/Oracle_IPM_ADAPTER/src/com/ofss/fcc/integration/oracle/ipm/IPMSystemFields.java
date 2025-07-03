/*
 * File Name: IPMSystemFields.java
 *  
 *
 * © Copyright 2007-2009 Oracle Financial Services Software Limited.
 *                       10-11, SDF I, SEEPZ, Andheri (East),
 *                       Mumbai - 400 096.
 *                       India
 *
 * This source is part of the General Framework and is copyrighted by
 * Oracle Financial Services Software Limited.
 *
 * All rights reserved.  No part of this work may be reproduced, stored in a
 * retrieval system, adopted or transmitted in any form or by any means,
 * electronic, mechanical, photographic, graphic, optic recording or otherwise,
 * translated in any language or computer language, without the prior written
 * permission of Oracle Financial Services Software Limited.
 */
/**
 * 
 */
package com.ofss.fcc.integration.oracle.ipm;

/**
 * @author VineetR
 * Serializable Value object to transfer the 'Big 6' IPM system fields.  
 */
public class IPMSystemFields
{

	private String	lucid;
	private String	mimetype;
	private String	tableName;
	private String	rowIdentifier;
	private String	ssProviderId;
	private String	indexProvider;

	public void setLUCID(String lucid)
	{
		this.lucid = lucid;
	}

	public void setMIMETYPE(String mimetype)
	{
		this.mimetype = mimetype;
	}

	public void setTABLENAME(String tableName)
	{
		this.tableName = tableName;
	}

	public void setROWIDENTIFIER(String rowIdentifier)
	{
		this.rowIdentifier = rowIdentifier;
	}

	public void setSSPROVIDERID(String ssProviderId)
	{
		this.ssProviderId = ssProviderId;
	}

	public void setINDEXPROVIDER(String indexProvider)
	{
		this.indexProvider = indexProvider;
	}

	public String getLUCID()
	{
		return lucid;
	}

	public String getMIMETYPE()
	{
		return mimetype;
	}

	public String getTABLENAME()
	{
		return tableName;
	}

	public String getROWIDENTIFIER()
	{
		return rowIdentifier;
	}

	public String getSSPROVIDERID()
	{
		return ssProviderId;
	}

	public String getINDEXPROVIDER()
	{
		return indexProvider;
	}
}
