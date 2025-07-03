/*
 *File Name: ConfigurationManager.java
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
 Modification History
Date				Modification Tag		Modified By			Remarks
-----				-----------------			-----------					--------
05-03-2012	FCUBS 12.0 				AnirudhG				Upgrading adapter to meet Oracle Web Centre Imaging Webservice implementation
29-03-2012	FCUBS 12.0					AnirudhG				Installation WSDL URL loaded and verified. Bug - 13887300
04-05-2012	FCUBS 12.0					AnirudhG				Removing Hard delete option. Bug - 14005554
*/
package com.ofss.fcc.integration.oracle.ipm;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.Properties;

import com.ofss.fcc.utility.FCSMSUtility;
import com.ofss.infra.web.dms.ConfigurationException;
import com.ofss.fcc.common.BranchConfig;
import org.apache.commons.codec.binary.Base64;

public final class ConfigurationManager {
		private String application;
		private boolean permanentDelete = false;
		private String loginUserName;
		private String loginPassword;
		private boolean maintainSession;
        private URL loginWSDL_URL;
        private URL docWSDL_URL;
        private URL docContentWSDL_URL;
        
       	public ConfigurationManager(Properties configuration)
			throws ConfigurationException {
		if (configuration == null) {
			throw new ConfigurationException("No configuration map received.");
		} else {
			validateConfiguration(configuration);
		}
	}

	public String getApplication() {
		return application;
	}

	public boolean isPermanentDelete() {
		return permanentDelete;
	}
	
	public boolean getMaintainSession() {
		return maintainSession;
	}
	
	public String getLoginUserName() {
		return loginUserName;
	}

	public String getLoginPassword() {
		return loginPassword;
	}
        
        public URL getLoginWSDL_URL() {
            return loginWSDL_URL;
        }
    
        public URL getDocWSDL_URL() {
            return docWSDL_URL;
        }
    
        public URL getDocContentWSDL_URL() {
            return docContentWSDL_URL;
        }

	private void validateConfiguration(Properties configuration)
			throws ConfigurationException {
		validateEndpointAddresses(configuration);
		validateSecurityProperties(configuration);
		validateOtherProperties(configuration);
	}

	private void validateEndpointAddresses(Properties configuration)
			throws ConfigurationException {
		String loginServiceEndpointAddress = configuration
				.getProperty("OracleIPM11G.LoginService.EndpointAddress");
		String docContentServiceEndpointAddress = configuration
				.getProperty("OracleIPM11G.DocumentContentService.EndpointAddress");
		String docServiceEndpointAddress = configuration
				.getProperty("OracleIPM11G.DocumentService.EndpointAddress");
		
		try {
			loginWSDL_URL = new URL(loginServiceEndpointAddress);             
    		} catch (MalformedURLException urlEx) {
			throw new ConfigurationException(
					"Oracle IPM Webservice LoginService endpoint address is an invalid URL.",
					urlEx);
		}
		
                try {
                        docWSDL_URL = new URL(docServiceEndpointAddress);
                } catch (MalformedURLException urlEx) {
                        throw new ConfigurationException(
                                        "Oracle IPM Webservice Document endpoint address is an invalid URL.",
                                        urlEx);
                }
                
                try {
			docContentWSDL_URL = new URL(docContentServiceEndpointAddress);
		} catch (MalformedURLException urlEx) {
			throw new ConfigurationException(
					"Oracle IPM Webservice DocumentContent endpoint address is an invalid URL.",
					urlEx);
		}				
	}
	
	private void validateSecurityProperties(Properties configuration)
			throws ConfigurationException {
		String authenticationUserName = configuration.getProperty("OracleIPM11G.Authentication.UserName");
		String authenticationPassword = configuration.getProperty("OracleIPM11G.Authentication.Password");
		
		boolean isValidUserId = authenticationUserName != null
				&& !authenticationUserName.equals("");
		boolean isValidUserPassword = authenticationPassword != null
				&& !authenticationPassword.equals("");

		if (isValidUserId && isValidUserPassword) {
			try {
				loginUserName = new String(FCSMSUtility.decrypt(Base64.decodeBase64(authenticationUserName.getBytes()), BranchConfig.getInstance().getSeed_enc_array()));						 
				loginPassword = new String(FCSMSUtility.decrypt(Base64.decodeBase64(authenticationPassword.getBytes()), BranchConfig.getInstance().getSeed_enc_array()));
			} catch (Exception ex) {
				throw new ConfigurationException(
						"Unable to run the decryption routine.", ex);
			}
		} else {
			throw new ConfigurationException(
					"The Oracle IPM user id and/or password is missing.");
		}
		
	}
	
	private void validateOtherProperties(Properties configuration) throws ConfigurationException {
		application = configuration.getProperty("OracleIPM11G.Application");
		String sess = configuration.getProperty("OracleIPM11G.MaintainSession").trim();
		//String permDel = configuration.getProperty("OracleIPM11G.PermanentDelete").trim();//14005554
		
		//if(permDel.length() != 1 || sess.length() != 1 || (application == null || application.equals(""))){//14005554
		if(sess.length() != 1 || (application == null || application.equals(""))){
			throw new ConfigurationException(
					"Oracle IPM Session Maintenance OR Application Name not configured correctly.");
		} else{
			maintainSession  = sess.equalsIgnoreCase("Y") ? true : false;
			//permanentDelete  = permDel.equalsIgnoreCase("Y") ? true : false;//14005554
		}
	}
}
