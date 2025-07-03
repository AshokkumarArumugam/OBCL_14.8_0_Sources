
package com.ofss.ucm.contentservice;

import javax.xml.bind.JAXBElement;
import javax.xml.bind.annotation.XmlElementDecl;
import javax.xml.bind.annotation.XmlRegistry;
import javax.xml.datatype.XMLGregorianCalendar;
import javax.xml.namespace.QName;


/**
 * This object contains factory methods for each 
 * Java content interface and Java element interface 
 * generated in the com.ofss.ucm.contentservice package. 
 * <p>An ObjectFactory allows you to programatically 
 * construct new instances of the Java representation 
 * for XML content. The Java representation of XML 
 * content can consist of schema derived interfaces 
 * and classes representing the binding of schema 
 * type definitions, element declarations and model 
 * groups.  Factory methods for each of these are 
 * provided in this class.
 * 
 */
@XmlRegistry
public class ObjectFactory {

    private final static QName _RetrieveVersion_QNAME = new QName("http://imaging.oracle/", "retrieveVersion");
    private final static QName _Retrieve_QNAME = new QName("http://imaging.oracle/", "retrieve");
    private final static QName _RetrieveRendition_QNAME = new QName("http://imaging.oracle/", "retrieveRendition");
    private final static QName _RenderPage_QNAME = new QName("http://imaging.oracle/", "RenderPage");
    private final static QName _RenderOptions_QNAME = new QName("http://imaging.oracle/", "RenderOptions");
    private final static QName _Document_QNAME = new QName("http://imaging.oracle/", "document");
    private final static QName _RetrieveRenditionResponse_QNAME = new QName("http://imaging.oracle/", "retrieveRenditionResponse");
    private final static QName _RetrieveVersionRendition_QNAME = new QName("http://imaging.oracle/", "retrieveVersionRendition");
    private final static QName _UploadDocumentResponse_QNAME = new QName("http://imaging.oracle/", "uploadDocumentResponse");
    private final static QName _RetrieveVersionResponse_QNAME = new QName("http://imaging.oracle/", "retrieveVersionResponse");
    private final static QName _UploadDocument_QNAME = new QName("http://imaging.oracle/", "uploadDocument");
    private final static QName _Rendition_QNAME = new QName("http://imaging.oracle/", "Rendition");
    private final static QName _RetrieveResponse_QNAME = new QName("http://imaging.oracle/", "retrieveResponse");
    private final static QName _RetrieveVersionPageResponse_QNAME = new QName("http://imaging.oracle/", "retrieveVersionPageResponse");
    private final static QName _RetrievePageResponse_QNAME = new QName("http://imaging.oracle/", "retrievePageResponse");
    private final static QName _RenderResult_QNAME = new QName("http://imaging.oracle/", "RenderResult");
    private final static QName _RetrievePage_QNAME = new QName("http://imaging.oracle/", "retrievePage");
    private final static QName _RetrieveVersionPage_QNAME = new QName("http://imaging.oracle/", "retrieveVersionPage");
    private final static QName _RetrieveVersionRenditionResponse_QNAME = new QName("http://imaging.oracle/", "retrieveVersionRenditionResponse");
    private final static QName _ImagingException_QNAME = new QName("http://imaging.oracle/", "ImagingException");
    private final static QName _DocumentPropertiesVolume_QNAME = new QName("", "volume");
    private final static QName _DocumentPropertiesVolumeDate_QNAME = new QName("", "volumeDate");
    private final static QName _DocumentDocumentPermissions_QNAME = new QName("", "documentPermissions");
    private final static QName _DocumentProperties_QNAME = new QName("", "properties");
    private final static QName _DocumentFieldValues_QNAME = new QName("", "fieldValues");

    /**
     * Create a new ObjectFactory that can be used to create new instances of schema derived classes for package: com.ofss.ucm.contentservice
     * 
     */
    public ObjectFactory() {
    }

    /**
     * Create an instance of {@link Rendition }
     * 
     */
    public Rendition createRendition() {
        return new Rendition();
    }

    /**
     * Create an instance of {@link RetrieveVersionRendition }
     * 
     */
    public RetrieveVersionRendition createRetrieveVersionRendition() {
        return new RetrieveVersionRendition();
    }

    /**
     * Create an instance of {@link AuditEvent.Properties }
     * 
     */
    public AuditEvent.Properties createAuditEventProperties() {
        return new AuditEvent.Properties();
    }

    /**
     * Create an instance of {@link RenderResult }
     * 
     */
    public RenderResult createRenderResult() {
        return new RenderResult();
    }

    /**
     * Create an instance of {@link RetrieveVersionPage }
     * 
     */
    public RetrieveVersionPage createRetrieveVersionPage() {
        return new RetrieveVersionPage();
    }

    /**
     * Create an instance of {@link RenderPage }
     * 
     */
    public RenderPage createRenderPage() {
        return new RenderPage();
    }

    /**
     * Create an instance of {@link RetrieveResponse }
     * 
     */
    public RetrieveResponse createRetrieveResponse() {
        return new RetrieveResponse();
    }

    /**
     * Create an instance of {@link Document }
     * 
     */
    public Document createDocument() {
        return new Document();
    }

    /**
     * Create an instance of {@link RetrieveRenditionResponse }
     * 
     */
    public RetrieveRenditionResponse createRetrieveRenditionResponse() {
        return new RetrieveRenditionResponse();
    }

    /**
     * Create an instance of {@link RetrieveVersionPageResponse }
     * 
     */
    public RetrieveVersionPageResponse createRetrieveVersionPageResponse() {
        return new RetrieveVersionPageResponse();
    }

    /**
     * Create an instance of {@link Retrieve }
     * 
     */
    public Retrieve createRetrieve() {
        return new Retrieve();
    }

    /**
     * Create an instance of {@link ImagingFaultInfo.FaultDetails }
     * 
     */
    public ImagingFaultInfo.FaultDetails createImagingFaultInfoFaultDetails() {
        return new ImagingFaultInfo.FaultDetails();
    }

    /**
     * Create an instance of {@link FieldValue }
     * 
     */
    public FieldValue createFieldValue() {
        return new FieldValue();
    }

    /**
     * Create an instance of {@link ImagingFaultInfo }
     * 
     */
    public ImagingFaultInfo createImagingFaultInfo() {
        return new ImagingFaultInfo();
    }

    /**
     * Create an instance of {@link RetrievePageResponse }
     * 
     */
    public RetrievePageResponse createRetrievePageResponse() {
        return new RetrievePageResponse();
    }

    /**
     * Create an instance of {@link RetrievePage }
     * 
     */
    public RetrievePage createRetrievePage() {
        return new RetrievePage();
    }

    /**
     * Create an instance of {@link ImagingFaultDetail }
     * 
     */
    public ImagingFaultDetail createImagingFaultDetail() {
        return new ImagingFaultDetail();
    }

    /**
     * Create an instance of {@link DocumentPermissions }
     * 
     */
    public DocumentPermissions createDocumentPermissions() {
        return new DocumentPermissions();
    }

    /**
     * Create an instance of {@link TypedValue }
     * 
     */
    public TypedValue createTypedValue() {
        return new TypedValue();
    }

    /**
     * Create an instance of {@link RetrieveVersionResponse }
     * 
     */
    public RetrieveVersionResponse createRetrieveVersionResponse() {
        return new RetrieveVersionResponse();
    }

    /**
     * Create an instance of {@link RetrieveVersionRenditionResponse }
     * 
     */
    public RetrieveVersionRenditionResponse createRetrieveVersionRenditionResponse() {
        return new RetrieveVersionRenditionResponse();
    }

    /**
     * Create an instance of {@link RenderOptions }
     * 
     */
    public RenderOptions createRenderOptions() {
        return new RenderOptions();
    }

    /**
     * Create an instance of {@link RetrieveRendition }
     * 
     */
    public RetrieveRendition createRetrieveRendition() {
        return new RetrieveRendition();
    }

    /**
     * Create an instance of {@link UploadDocumentResponse }
     * 
     */
    public UploadDocumentResponse createUploadDocumentResponse() {
        return new UploadDocumentResponse();
    }

    /**
     * Create an instance of {@link AuditEvent }
     * 
     */
    public AuditEvent createAuditEvent() {
        return new AuditEvent();
    }

    /**
     * Create an instance of {@link RetrieveVersion }
     * 
     */
    public RetrieveVersion createRetrieveVersion() {
        return new RetrieveVersion();
    }

    /**
     * Create an instance of {@link RenderBoundRect }
     * 
     */
    public RenderBoundRect createRenderBoundRect() {
        return new RenderBoundRect();
    }

    /**
     * Create an instance of {@link Document.History }
     * 
     */
    public Document.History createDocumentHistory() {
        return new Document.History();
    }

    /**
     * Create an instance of {@link DocumentProperties }
     * 
     */
    public DocumentProperties createDocumentProperties() {
        return new DocumentProperties();
    }

    /**
     * Create an instance of {@link Document.FieldValues }
     * 
     */
    public Document.FieldValues createDocumentFieldValues() {
        return new Document.FieldValues();
    }

    /**
     * Create an instance of {@link UploadDocument }
     * 
     */
    public UploadDocument createUploadDocument() {
        return new UploadDocument();
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link RetrieveVersion }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "retrieveVersion")
    public JAXBElement<RetrieveVersion> createRetrieveVersion(RetrieveVersion value) {
        return new JAXBElement<RetrieveVersion>(_RetrieveVersion_QNAME, RetrieveVersion.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link Retrieve }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "retrieve")
    public JAXBElement<Retrieve> createRetrieve(Retrieve value) {
        return new JAXBElement<Retrieve>(_Retrieve_QNAME, Retrieve.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link RetrieveRendition }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "retrieveRendition")
    public JAXBElement<RetrieveRendition> createRetrieveRendition(RetrieveRendition value) {
        return new JAXBElement<RetrieveRendition>(_RetrieveRendition_QNAME, RetrieveRendition.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link RenderPage }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "RenderPage")
    public JAXBElement<RenderPage> createRenderPage(RenderPage value) {
        return new JAXBElement<RenderPage>(_RenderPage_QNAME, RenderPage.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link RenderOptions }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "RenderOptions")
    public JAXBElement<RenderOptions> createRenderOptions(RenderOptions value) {
        return new JAXBElement<RenderOptions>(_RenderOptions_QNAME, RenderOptions.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link Document }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "document")
    public JAXBElement<Document> createDocument(Document value) {
        return new JAXBElement<Document>(_Document_QNAME, Document.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link RetrieveRenditionResponse }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "retrieveRenditionResponse")
    public JAXBElement<RetrieveRenditionResponse> createRetrieveRenditionResponse(RetrieveRenditionResponse value) {
        return new JAXBElement<RetrieveRenditionResponse>(_RetrieveRenditionResponse_QNAME, RetrieveRenditionResponse.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link RetrieveVersionRendition }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "retrieveVersionRendition")
    public JAXBElement<RetrieveVersionRendition> createRetrieveVersionRendition(RetrieveVersionRendition value) {
        return new JAXBElement<RetrieveVersionRendition>(_RetrieveVersionRendition_QNAME, RetrieveVersionRendition.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link UploadDocumentResponse }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "uploadDocumentResponse")
    public JAXBElement<UploadDocumentResponse> createUploadDocumentResponse(UploadDocumentResponse value) {
        return new JAXBElement<UploadDocumentResponse>(_UploadDocumentResponse_QNAME, UploadDocumentResponse.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link RetrieveVersionResponse }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "retrieveVersionResponse")
    public JAXBElement<RetrieveVersionResponse> createRetrieveVersionResponse(RetrieveVersionResponse value) {
        return new JAXBElement<RetrieveVersionResponse>(_RetrieveVersionResponse_QNAME, RetrieveVersionResponse.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link UploadDocument }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "uploadDocument")
    public JAXBElement<UploadDocument> createUploadDocument(UploadDocument value) {
        return new JAXBElement<UploadDocument>(_UploadDocument_QNAME, UploadDocument.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link Rendition }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "Rendition")
    public JAXBElement<Rendition> createRendition(Rendition value) {
        return new JAXBElement<Rendition>(_Rendition_QNAME, Rendition.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link RetrieveResponse }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "retrieveResponse")
    public JAXBElement<RetrieveResponse> createRetrieveResponse(RetrieveResponse value) {
        return new JAXBElement<RetrieveResponse>(_RetrieveResponse_QNAME, RetrieveResponse.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link RetrieveVersionPageResponse }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "retrieveVersionPageResponse")
    public JAXBElement<RetrieveVersionPageResponse> createRetrieveVersionPageResponse(RetrieveVersionPageResponse value) {
        return new JAXBElement<RetrieveVersionPageResponse>(_RetrieveVersionPageResponse_QNAME, RetrieveVersionPageResponse.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link RetrievePageResponse }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "retrievePageResponse")
    public JAXBElement<RetrievePageResponse> createRetrievePageResponse(RetrievePageResponse value) {
        return new JAXBElement<RetrievePageResponse>(_RetrievePageResponse_QNAME, RetrievePageResponse.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link RenderResult }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "RenderResult")
    public JAXBElement<RenderResult> createRenderResult(RenderResult value) {
        return new JAXBElement<RenderResult>(_RenderResult_QNAME, RenderResult.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link RetrievePage }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "retrievePage")
    public JAXBElement<RetrievePage> createRetrievePage(RetrievePage value) {
        return new JAXBElement<RetrievePage>(_RetrievePage_QNAME, RetrievePage.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link RetrieveVersionPage }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "retrieveVersionPage")
    public JAXBElement<RetrieveVersionPage> createRetrieveVersionPage(RetrieveVersionPage value) {
        return new JAXBElement<RetrieveVersionPage>(_RetrieveVersionPage_QNAME, RetrieveVersionPage.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link RetrieveVersionRenditionResponse }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "retrieveVersionRenditionResponse")
    public JAXBElement<RetrieveVersionRenditionResponse> createRetrieveVersionRenditionResponse(RetrieveVersionRenditionResponse value) {
        return new JAXBElement<RetrieveVersionRenditionResponse>(_RetrieveVersionRenditionResponse_QNAME, RetrieveVersionRenditionResponse.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link ImagingFaultInfo }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "ImagingException")
    public JAXBElement<ImagingFaultInfo> createImagingException(ImagingFaultInfo value) {
        return new JAXBElement<ImagingFaultInfo>(_ImagingException_QNAME, ImagingFaultInfo.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link String }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "", name = "volume", scope = DocumentProperties.class)
    public JAXBElement<String> createDocumentPropertiesVolume(String value) {
        return new JAXBElement<String>(_DocumentPropertiesVolume_QNAME, String.class, DocumentProperties.class, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link XMLGregorianCalendar }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "", name = "volumeDate", scope = DocumentProperties.class)
    public JAXBElement<XMLGregorianCalendar> createDocumentPropertiesVolumeDate(XMLGregorianCalendar value) {
        return new JAXBElement<XMLGregorianCalendar>(_DocumentPropertiesVolumeDate_QNAME, XMLGregorianCalendar.class, DocumentProperties.class, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link DocumentPermissions }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "", name = "documentPermissions", scope = Document.class)
    public JAXBElement<DocumentPermissions> createDocumentDocumentPermissions(DocumentPermissions value) {
        return new JAXBElement<DocumentPermissions>(_DocumentDocumentPermissions_QNAME, DocumentPermissions.class, Document.class, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link DocumentProperties }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "", name = "properties", scope = Document.class)
    public JAXBElement<DocumentProperties> createDocumentProperties(DocumentProperties value) {
        return new JAXBElement<DocumentProperties>(_DocumentProperties_QNAME, DocumentProperties.class, Document.class, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link Document.FieldValues }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "", name = "fieldValues", scope = Document.class)
    public JAXBElement<Document.FieldValues> createDocumentFieldValues(Document.FieldValues value) {
        return new JAXBElement<Document.FieldValues>(_DocumentFieldValues_QNAME, Document.FieldValues.class, Document.class, value);
    }

}
