package com.ofss.fcc.integration.custom.dms;

import com.ofss.fcc.common.FBContext;
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
import com.ofss.infra.web.dms.IDocumentService;

public class CustomDocumentService  implements IDocumentService {
	
	private static void dbg(FBContext fbContext1, String msg) {
        fbContext1.getBrnLogger().dbg("CustomDocumentService --> " + msg);
    }
	
	@Override
	public CanonicalDocumentDeleteResponse deleteDocument(FBContext fbContext, 
			DocumentKeys documentKeys) throws ApplicationException {
		
		return null;
		
	}
	
	@Override
	public CanonicalDocumentDownloadResponse downloadDocument(FBContext fbContext, 
			DocumentKeys documentKeys) throws ApplicationException {
		return null;
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
		return null;
	}
	
}
