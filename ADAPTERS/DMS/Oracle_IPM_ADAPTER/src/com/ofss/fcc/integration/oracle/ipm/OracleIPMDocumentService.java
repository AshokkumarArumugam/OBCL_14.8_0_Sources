/*
 * File Name: OracleIPMDocumentService.java
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
Date					Modification Tag		Modified By			Remarks
-----					-----------------			-----------					--------
05-03-2012		FCUBS 12.0 				AnirudhG				Upgrading adapter to meet Oracle Web Centre Imaging Webservice implementation
29-03-2012		FCUBS 12.0					AnirudhG				Installation WSDL URL loaded and verified. Bug - 13887300
----------------------------------------------------------------------------------------------------
 */
package com.ofss.fcc.integration.oracle.ipm;

import com.ofss.fcc.common.FBContext;

import java.io.IOException;
import java.io.InputStream;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.StringTokenizer;

import javax.xml.ws.BindingProvider;
import javax.xml.ws.handler.MessageContext;

import com.ofss.infra.web.dms.ApplicationException;
import com.ofss.infra.web.dms.CanonicalDocumentDeleteResponse;
import com.ofss.infra.web.dms.CanonicalDocumentDownloadResponse;
import com.ofss.infra.web.dms.CanonicalDocumentSearchResponse;
import com.ofss.infra.web.dms.CanonicalDocumentUploadResponse;
import com.ofss.infra.web.dms.CanonicalProbeServiceResponse;
import com.ofss.infra.web.dms.ConfigurationException;
import com.ofss.infra.web.dms.DocumentKeys;
import com.ofss.infra.web.dms.IDocumentService;
import com.ofss.infra.web.dms.InputBusinessDocument;
import com.ofss.infra.web.dms.SearchCriteria;
import com.ofss.ucm.contentservice.DocumentContentService;

import com.ofss.ucm.contentservice.DocumentContentService_Service;
import com.ofss.ucm.contentservice.Rendition;
import com.ofss.ucm.contentservice.RenditionOutput;
import com.ofss.ucm.docservice.DocumentAbility;
import com.ofss.ucm.docservice.DocumentService;

import com.ofss.ucm.docservice.CreateDocument;
import com.ofss.ucm.docservice.CreateDocumentResponse;
import com.ofss.ucm.docservice.DeleteDocument;
import com.ofss.ucm.docservice.DocumentService_Service;
import com.ofss.ucm.docservice.ImagingException;
import com.ofss.ucm.docservice.ListTargetApplications;
import com.ofss.ucm.docservice.ListTargetApplicationsResponse;
import com.ofss.ucm.docservice.NameId;
import com.ofss.ucm.docservice.ValidationException;
import com.ofss.ucm.loginservice.LoginService;
import com.ofss.ucm.loginservice.LoginService_Service;

import javax.xml.namespace.QName;

public final class OracleIPMDocumentService implements IDocumentService
{
		private ConfigurationManager configManager;
	LoginService_Service loginService_Service;
	DocumentContentService_Service documentContentService_Service;
	DocumentService_Service documentService_Service;

    private static void dbg(FBContext fbContext1, String msg) {
        fbContext1.getBrnLogger().dbg("OracleIPMDocumentService." + msg);
        //fbContext1.getBrnLogger().flush();
    }
        
        public OracleIPMDocumentService() throws ConfigurationException {
		try {
			Properties configParameters = new Properties();
			InputStream inStream = getClass().getResourceAsStream(
					"OracleIPMAdapter.properties");
			configParameters.load(inStream);
			inStream.close();
			configManager = new ConfigurationManager(configParameters);
                        try{	
                            loginService_Service = new LoginService_Service(configManager.getLoginWSDL_URL(), new QName("http://imaging.oracle/",
				"LoginService"));
                               
                            documentContentService_Service = new DocumentContentService_Service(configManager.getDocContentWSDL_URL(), 
                                                         new QName("http://imaging.oracle/", "DocumentContentService"));
                                
                            documentService_Service = new DocumentService_Service(configManager.getDocWSDL_URL(),new QName("http://imaging.oracle/", "DocumentService"));
                        }catch(javax.xml.ws.WebServiceException WSE){
		            throw new ConfigurationException("Failed to initialize the WebCenter webservice", WSE);
		        }
		} catch (IOException ioEx) {
			throw new ConfigurationException("Failed to read the properties.",
					ioEx);
            } 
	}

	@Override
	public CanonicalDocumentDeleteResponse deleteDocument(FBContext fbContext, 
			DocumentKeys documentKeys) throws ApplicationException {
		CanonicalDocumentDeleteResponse canonicalResponse = new CanonicalDocumentDeleteResponse();
		String documentId = documentKeys.getDocumentID();
		canonicalResponse.setDocumentDeleted(false);
                dbg(fbContext, "Deleting document - "+documentId);
		if (configManager.isPermanentDelete()) {
			try {
				DocumentService documentService = documentService_Service
						.getDocumentServicePort();
				Map requestContext = ((BindingProvider) documentService)
						.getRequestContext();				
				requestContext.put(BindingProvider.USERNAME_PROPERTY,
						configManager.getLoginUserName());
				requestContext.put(BindingProvider.PASSWORD_PROPERTY,
						configManager.getLoginPassword());
				if (documentId != null && !documentId.equalsIgnoreCase("")){
					DeleteDocument dd = new DeleteDocument();
					dd.setDocumentId(documentId);
					documentService.deleteDocument(dd);
				}
				canonicalResponse.setDocumentDeleted(true);
			} catch (ImagingException imgExcep) {
				canonicalResponse.setDocumentDeleted(false);
        			dbg(fbContext, "Error while Deleting document - "+imgExcep.getMessage());
                                throw new ApplicationException(
						"Exception while delete document", imgExcep);
			} catch (Throwable thr) {
				canonicalResponse.setDocumentDeleted(false);
                                dbg(fbContext, "Error while Deleting document - "+thr.getMessage());
				thr.printStackTrace();
				throw new ApplicationException("IPM delete Failed", thr);
			}
		} else {
                        dbg(fbContext, "Deleting document - success");
			canonicalResponse.setDocumentDeleted(true);
		}
		return canonicalResponse;
	}

	@Override
	public CanonicalDocumentDownloadResponse downloadDocument(FBContext fbContext, 
			DocumentKeys documentKeys) throws ApplicationException {

		CanonicalDocumentDownloadResponse canonicalResponse = new CanonicalDocumentDownloadResponse();
		Rendition rend = null;
		String documentId = documentKeys.getDocumentID();
                dbg(fbContext, "Downloading document - "+documentId);
		byte[] b = null;
		try {
			DocumentContentService documentContentService = documentContentService_Service
					.getDocumentContentServicePort();
			Map requestContext = ((BindingProvider) documentContentService)
					.getRequestContext();			
			requestContext.put(BindingProvider.USERNAME_PROPERTY,
					configManager.getLoginUserName());
			requestContext.put(BindingProvider.PASSWORD_PROPERTY,
					configManager.getLoginPassword());

			if (documentId != null && !documentId.equalsIgnoreCase("")) {
				rend = documentContentService.retrieveRendition(documentId,
						true, true, RenditionOutput.ORIGINALORTIFF, null);
				canonicalResponse.setFileContent(rend.getContent());
				canonicalResponse.setFileName(rend.getOriginalFilename());
                                dbg(fbContext, "Downloading document - success");
			}

		} catch (com.ofss.ucm.contentservice.ImagingException imgExcep) {
			canonicalResponse.setExceptionMessage(imgExcep.toString());
                        dbg(fbContext, "Error while Downloading document - "+imgExcep.getMessage());
                        throw new ApplicationException(
					"Exception while retreiving document", imgExcep);
		} catch (Throwable thr) {
			canonicalResponse.setExceptionMessage(thr.toString());
                        dbg(fbContext, "Error while Downloading document - "+thr.getMessage());
                        throw new ApplicationException("IPM download Failed", thr);
		}
		return canonicalResponse;
	}

	@Override
	public CanonicalProbeServiceResponse probeService(FBContext fbContext )
			throws ApplicationException {
		dbg(fbContext, "Probing Service");
		return null;
	}

	@Override
	public CanonicalDocumentSearchResponse searchDocuments(FBContext fbContext, 
			SearchCriteria searchCriteria) throws ApplicationException {
		CanonicalDocumentSearchResponse canonicalResponse = new CanonicalDocumentSearchResponse();
		dbg(fbContext, "Searching Document");
		return canonicalResponse;
	}

	@Override
	public CanonicalDocumentUploadResponse uploadDocument(FBContext fbContext, 
			InputBusinessDocument inputDocument) throws ApplicationException {
		CanonicalDocumentUploadResponse canonicalResponse = new CanonicalDocumentUploadResponse();
		String fileName = inputDocument.getFileName();
		byte[] fileContent = inputDocument.getFileContent();
		String cookieStr = null;
		String uploadToken = null;
		String documentID = null;
                dbg(fbContext, "Uploading Document - "+fileName);
		try {
			if (fileName == null || fileName.equals("")) {
                                dbg(fbContext, "Error in Uploading Document - file name is invalid.");
				throw new ApplicationException("The file name is invalid.");
			}
			if (fileContent == null || fileContent.equals("")) {
                                dbg(fbContext, "Error in Uploading Document - file has no content.");
                                throw new ApplicationException("The file has no content.");
			}

			cookieStr = doLoginForSessID();
			if (cookieStr == null || cookieStr.equals("")) {
                                dbg(fbContext, "Error in Uploading Document - Failed to login to the IPM Service");
                                throw new ApplicationException(
						"Failed to login to the IPM Service");
			} else {
                                dbg(fbContext, "Logged in to the IPM Service, now uploading file content");
				uploadToken = uploadFileContent(inputDocument, cookieStr);
			}

			if (uploadToken == null || uploadToken.equals("")) {
                                dbg(fbContext, "Error in Uploading Document - Failed to upload the Document's contents to the IPM Server");
                                throw new ApplicationException(
						"Failed to upload the Document's contents to the IPM Server");
			} else {
                                dbg(fbContext, "Success upload file content, now creating document Id");
                                documentID = createDocumentEntity(uploadToken, cookieStr);
			}

			if (documentID != null && (!documentID.equals(""))) {
				canonicalResponse.setDocumentID(documentID);
			}
		} catch (Throwable thr) {
			canonicalResponse.setExceptionMessage(thr.toString());
                        dbg(fbContext, "Error in Uploading Document - "+thr.getMessage());
                        throw new ApplicationException("IPM Upload Failed", thr);
		} finally {
                    try{
                        logout(cookieStr);
                    } catch(Throwable thr){
                        dbg(fbContext, "Error in Loggin Out of Webcenter webservice - "+thr.getMessage());
                    }
		}

		return canonicalResponse;
	}

	private void logout(String sessionCookie) throws ApplicationException {
		try {
			LoginService loginService = loginService_Service
					.getLoginServicePort();

			Map requestContext = ((BindingProvider) loginService)
					.getRequestContext();
			requestContext.put(BindingProvider.USERNAME_PROPERTY,
					configManager.getLoginUserName());
			requestContext.put(BindingProvider.PASSWORD_PROPERTY,
					configManager.getLoginPassword());
			requestContext.put(BindingProvider.SESSION_MAINTAIN_PROPERTY,
					configManager.getMaintainSession());

			Map<String, List> map = new HashMap<String, List>();
			map.put("Cookie", Collections.singletonList(sessionCookie));
			requestContext.put(MessageContext.HTTP_REQUEST_HEADERS, map);

			loginService.logout();
		} catch (com.ofss.ucm.loginservice.ImagingException imgExcep) {
			throw new ApplicationException(
					"Exception while logging out of IPM service", imgExcep);
		} catch (Throwable thr) {
			thr.printStackTrace();
			throw new ApplicationException("IPM Logout Failed", thr);
		}
	}

	private String doLoginForSessID() throws ApplicationException {
		String cookieStr = null;
		try {
			LoginService loginService = loginService_Service
					.getLoginServicePort();
			Map requestContext = ((BindingProvider) loginService)
					.getRequestContext();
			requestContext.put(BindingProvider.USERNAME_PROPERTY,
					configManager.getLoginUserName());
			requestContext.put(BindingProvider.PASSWORD_PROPERTY,
					configManager.getLoginPassword());
			requestContext.put(BindingProvider.SESSION_MAINTAIN_PROPERTY,
					configManager.getMaintainSession());

			loginService.login();

			Map responseContext = ((BindingProvider) loginService)
					.getResponseContext();
			Map HttpRespHdrs = (Map) responseContext
					.get(MessageContext.HTTP_RESPONSE_HEADERS);
			List cookiesList = (List) HttpRespHdrs.get("Set-Cookie");
			String strSessID = (String) cookiesList.get(0);
			StringTokenizer strtoken = new StringTokenizer(strSessID, ";");
			cookieStr = strtoken.nextToken();

		} catch (com.ofss.ucm.loginservice.ImagingException imgExcep) {			
			throw new ApplicationException(
					"Exception while logging into IPM service", imgExcep);
		} catch (Throwable thr) {
			thr.printStackTrace();
			throw new ApplicationException("IPM Login Failed", thr);
		}

		return cookieStr;
	}

	private String uploadFileContent(InputBusinessDocument inputDocument,
			String sessionCookie) throws ApplicationException {
		String token = null;
		try {
			DocumentContentService documentContentService = documentContentService_Service
					.getDocumentContentServicePort();
			Map requestContext = ((BindingProvider) documentContentService)
					.getRequestContext();
			requestContext.put(BindingProvider.USERNAME_PROPERTY,
					configManager.getLoginUserName());
			requestContext.put(BindingProvider.PASSWORD_PROPERTY,
					configManager.getLoginPassword());
			requestContext.put(BindingProvider.SESSION_MAINTAIN_PROPERTY,
					configManager.getMaintainSession());

			Map<String, List> map = new HashMap<String, List>();
			map.put("Cookie", Collections.singletonList(sessionCookie));
			requestContext.put(MessageContext.HTTP_REQUEST_HEADERS, map);

			token = documentContentService
					.uploadDocument(inputDocument.getFileContent(),
							inputDocument.getFileName());

		} catch (com.ofss.ucm.contentservice.ImagingException imgExcep) {
			throw new ApplicationException(
					"Exception while uploading document content into IPM service",
					imgExcep);
		} catch (Throwable thr) {
			thr.printStackTrace();
			throw new ApplicationException("IPM Doc Content Failed", thr);
		}

		return token;
	}

	private String createDocumentEntity(String token, String sessionCookie)
			throws ApplicationException {
		String documentId = null;
		try {
			DocumentService documentService = documentService_Service
					.getDocumentServicePort();

			Map requestContext = ((BindingProvider) documentService)
					.getRequestContext();
			requestContext.put(BindingProvider.USERNAME_PROPERTY,
					configManager.getLoginUserName());
			requestContext.put(BindingProvider.PASSWORD_PROPERTY,
					configManager.getLoginPassword());
			requestContext.put(BindingProvider.SESSION_MAINTAIN_PROPERTY,
					configManager.getMaintainSession());

			Map<String, List> map = new HashMap<String, List>();
			map.put("Cookie", Collections.singletonList(sessionCookie));
			requestContext.put(MessageContext.HTTP_REQUEST_HEADERS, map);

			NameId appNameId = null;// List the viewable applications to confirm
									// that "Invoices" exists

			ListTargetApplications lta = new ListTargetApplications();
			lta.setAbility(DocumentAbility.CREATEDOCUMENT);
			ListTargetApplicationsResponse ltra = documentService.listTargetApplications(lta);
			List<NameId> appsList = ltra.getAppNameIds();
			for (NameId nameId : appsList) {
				if (nameId.getName().equals(configManager.getApplication())) {
					appNameId = nameId;
				}
			}
			if (appNameId == null) {
				throw new ApplicationException(
						"No such application in IPM server.");
			}
			
			CreateDocument cd = new CreateDocument();
			cd.setUploadToken(token);
			cd.setApplicationId(appNameId);
			CreateDocumentResponse cdr = documentService.createDocument(cd);
			documentId = cdr.getDocumentId();
			

		} catch (ImagingException imgExcep) {
			throw new ApplicationException(
					"Exception while creating document entity into IPM service",
					imgExcep);
		} catch (ApplicationException appExcep) {
			throw new ApplicationException(
					"Exception while creating document entity into IPM service",
					appExcep);
		} catch (ValidationException validateExcep) {
			throw new ApplicationException(
					"Exception while creating document entity into IPM service",
					validateExcep);
		} catch (Throwable thr) {
			thr.printStackTrace();
			throw new ApplicationException("IPM doc entity Failed", thr);
		}
		return documentId;
	}

}
