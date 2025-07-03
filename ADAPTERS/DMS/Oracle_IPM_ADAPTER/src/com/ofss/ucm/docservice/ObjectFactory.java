
package com.ofss.ucm.docservice;

import javax.xml.bind.JAXBElement;
import javax.xml.bind.annotation.XmlElementDecl;
import javax.xml.bind.annotation.XmlRegistry;
import javax.xml.datatype.XMLGregorianCalendar;
import javax.xml.namespace.QName;


/**
 * This object contains factory methods for each 
 * Java content interface and Java element interface 
 * generated in the com.ofss.ucm.docservice package. 
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

    private final static QName _DeleteDocumentResponse_QNAME = new QName("http://imaging.oracle/", "deleteDocumentResponse");
    private final static QName _GetDocuments_QNAME = new QName("http://imaging.oracle/", "getDocuments");
    private final static QName _GetTargetApplication_QNAME = new QName("http://imaging.oracle/", "getTargetApplication");
    private final static QName _LifecyclePolicy_QNAME = new QName("http://imaging.oracle/", "lifecyclePolicy");
    private final static QName _GetTargetApplicationResponse_QNAME = new QName("http://imaging.oracle/", "getTargetApplicationResponse");
    private final static QName _DeleteDocuments_QNAME = new QName("http://imaging.oracle/", "deleteDocuments");
    private final static QName _NameId_QNAME = new QName("http://imaging.oracle/", "nameId");
    private final static QName _ValidationError_QNAME = new QName("http://imaging.oracle/", "ValidationError");
    private final static QName _ValidationException_QNAME = new QName("http://imaging.oracle/", "ValidationException");
    private final static QName _SetAnnotationsResponse_QNAME = new QName("http://imaging.oracle/", "setAnnotationsResponse");
    private final static QName _Application_QNAME = new QName("http://imaging.oracle/", "application");
    private final static QName _GetAnnotations_QNAME = new QName("http://imaging.oracle/", "getAnnotations");
    private final static QName _GetSupportingContentResponse_QNAME = new QName("http://imaging.oracle/", "getSupportingContentResponse");
    private final static QName _CopyDocument_QNAME = new QName("http://imaging.oracle/", "copyDocument");
    private final static QName _ListTargetApplicationsResponse_QNAME = new QName("http://imaging.oracle/", "listTargetApplicationsResponse");
    private final static QName _MoveDocument_QNAME = new QName("http://imaging.oracle/", "moveDocument");
    private final static QName _Document_QNAME = new QName("http://imaging.oracle/", "document");
    private final static QName _CreateDocument_QNAME = new QName("http://imaging.oracle/", "createDocument");
    private final static QName _UpdateDocumentResponse_QNAME = new QName("http://imaging.oracle/", "updateDocumentResponse");
    private final static QName _Security_QNAME = new QName("http://imaging.oracle/", "security");
    private final static QName _SetSupportingContentResponse_QNAME = new QName("http://imaging.oracle/", "setSupportingContentResponse");
    private final static QName _SubmitToWorkflowResponse_QNAME = new QName("http://imaging.oracle/", "submitToWorkflowResponse");
    private final static QName _DeleteDocumentsResponse_QNAME = new QName("http://imaging.oracle/", "deleteDocumentsResponse");
    private final static QName _SetSupportingContent_QNAME = new QName("http://imaging.oracle/", "setSupportingContent");
    private final static QName _LockDocumentResponse_QNAME = new QName("http://imaging.oracle/", "lockDocumentResponse");
    private final static QName _GetSupportingContent_QNAME = new QName("http://imaging.oracle/", "getSupportingContent");
    private final static QName _SectionSet_QNAME = new QName("http://imaging.oracle/", "sectionSet");
    private final static QName _CopyDocumentResponse_QNAME = new QName("http://imaging.oracle/", "copyDocumentResponse");
    private final static QName _SubmitToWorkflow_QNAME = new QName("http://imaging.oracle/", "submitToWorkflow");
    private final static QName _GetDocumentsResponse_QNAME = new QName("http://imaging.oracle/", "getDocumentsResponse");
    private final static QName _GetDocumentVersionResponse_QNAME = new QName("http://imaging.oracle/", "getDocumentVersionResponse");
    private final static QName _HasStatusChanged_QNAME = new QName("http://imaging.oracle/", "hasStatusChanged");
    private final static QName _DocumentSecurity_QNAME = new QName("http://imaging.oracle/", "documentSecurity");
    private final static QName _SetAnnotations_QNAME = new QName("http://imaging.oracle/", "setAnnotations");
    private final static QName _MoveDocumentResponse_QNAME = new QName("http://imaging.oracle/", "moveDocumentResponse");
    private final static QName _BpelConfig_QNAME = new QName("http://imaging.oracle/", "bpelConfig");
    private final static QName _StoragePolicyItem_QNAME = new QName("http://imaging.oracle/", "storagePolicyItem");
    private final static QName _UnlockDocumentResponse_QNAME = new QName("http://imaging.oracle/", "unlockDocumentResponse");
    private final static QName _HasStatusChangedResponse_QNAME = new QName("http://imaging.oracle/", "hasStatusChangedResponse");
    private final static QName _GetAnnotationsResponse_QNAME = new QName("http://imaging.oracle/", "getAnnotationsResponse");
    private final static QName _GetDocumentVersion_QNAME = new QName("http://imaging.oracle/", "getDocumentVersion");
    private final static QName _UpdateDocument_QNAME = new QName("http://imaging.oracle/", "updateDocument");
    private final static QName _ModifyPageOrderResponse_QNAME = new QName("http://imaging.oracle/", "modifyPageOrderResponse");
    private final static QName _LockDocument_QNAME = new QName("http://imaging.oracle/", "lockDocument");
    private final static QName _CreateDocumentResponse_QNAME = new QName("http://imaging.oracle/", "createDocumentResponse");
    private final static QName _GetDocument_QNAME = new QName("http://imaging.oracle/", "getDocument");
    private final static QName _ListTargetApplications_QNAME = new QName("http://imaging.oracle/", "listTargetApplications");
    private final static QName _DeleteDocument_QNAME = new QName("http://imaging.oracle/", "deleteDocument");
    private final static QName _FieldDefinition_QNAME = new QName("http://imaging.oracle/", "fieldDefinition");
    private final static QName _ModifyPageOrder_QNAME = new QName("http://imaging.oracle/", "modifyPageOrder");
    private final static QName _UnlockDocument_QNAME = new QName("http://imaging.oracle/", "unlockDocument");
    private final static QName _GetDocumentResponse_QNAME = new QName("http://imaging.oracle/", "getDocumentResponse");
    private final static QName _ImagingException_QNAME = new QName("http://imaging.oracle/", "ImagingException");
    private final static QName _DocumentDocumentPermissions_QNAME = new QName("", "documentPermissions");
    private final static QName _DocumentProperties_QNAME = new QName("", "properties");
    private final static QName _DocumentFieldValues_QNAME = new QName("", "fieldValues");
    private final static QName _LifecyclePolicyStoragePolicy_QNAME = new QName("", "storagePolicy");
    private final static QName _ApplicationBpelConfig_QNAME = new QName("", "bpelConfig");
    private final static QName _ApplicationLifecyclePolicy_QNAME = new QName("", "lifecyclePolicy");
    private final static QName _ApplicationDocumentSecurity_QNAME = new QName("", "documentSecurity");
    private final static QName _ApplicationApplicationPermissions_QNAME = new QName("", "applicationPermissions");
    private final static QName _ApplicationSecurity_QNAME = new QName("", "security");
    private final static QName _DocumentPropertiesVolume_QNAME = new QName("", "volume");
    private final static QName _DocumentPropertiesVolumeDate_QNAME = new QName("", "volumeDate");
    private final static QName _PayloadItemValue_QNAME = new QName("", "value");
    private final static QName _BpelConfigPayloadMapping_QNAME = new QName("", "payloadMapping");

    /**
     * Create a new ObjectFactory that can be used to create new instances of schema derived classes for package: com.ofss.ucm.docservice
     * 
     */
    public ObjectFactory() {
    }

    /**
     * Create an instance of {@link SetSupportingContent }
     * 
     */
    public SetSupportingContent createSetSupportingContent() {
        return new SetSupportingContent();
    }

    /**
     * Create an instance of {@link TypedValue }
     * 
     */
    public TypedValue createTypedValue() {
        return new TypedValue();
    }

    /**
     * Create an instance of {@link GetDocumentVersionResponse }
     * 
     */
    public GetDocumentVersionResponse createGetDocumentVersionResponse() {
        return new GetDocumentVersionResponse();
    }

    /**
     * Create an instance of {@link Document }
     * 
     */
    public Document createDocument() {
        return new Document();
    }

    /**
     * Create an instance of {@link CreateDocumentResponse }
     * 
     */
    public CreateDocumentResponse createCreateDocumentResponse() {
        return new CreateDocumentResponse();
    }

    /**
     * Create an instance of {@link Application.History }
     * 
     */
    public Application.History createApplicationHistory() {
        return new Application.History();
    }

    /**
     * Create an instance of {@link Application }
     * 
     */
    public Application createApplication() {
        return new Application();
    }

    /**
     * Create an instance of {@link CopyDocument }
     * 
     */
    public CopyDocument createCopyDocument() {
        return new CopyDocument();
    }

    /**
     * Create an instance of {@link PayloadItem }
     * 
     */
    public PayloadItem createPayloadItem() {
        return new PayloadItem();
    }

    /**
     * Create an instance of {@link CopyDocumentResponse }
     * 
     */
    public CopyDocumentResponse createCopyDocumentResponse() {
        return new CopyDocumentResponse();
    }

    /**
     * Create an instance of {@link LifecyclePolicy.StoragePolicy }
     * 
     */
    public LifecyclePolicy.StoragePolicy createLifecyclePolicyStoragePolicy() {
        return new LifecyclePolicy.StoragePolicy();
    }

    /**
     * Create an instance of {@link PageChange }
     * 
     */
    public PageChange createPageChange() {
        return new PageChange();
    }

    /**
     * Create an instance of {@link DefinitionSecurity }
     * 
     */
    public DefinitionSecurity createDefinitionSecurity() {
        return new DefinitionSecurity();
    }

    /**
     * Create an instance of {@link ImagingFaultInfo.FaultDetails }
     * 
     */
    public ImagingFaultInfo.FaultDetails createImagingFaultInfoFaultDetails() {
        return new ImagingFaultInfo.FaultDetails();
    }

    /**
     * Create an instance of {@link LockDocument }
     * 
     */
    public LockDocument createLockDocument() {
        return new LockDocument();
    }

    /**
     * Create an instance of {@link DocumentPermissions }
     * 
     */
    public DocumentPermissions createDocumentPermissions() {
        return new DocumentPermissions();
    }

    /**
     * Create an instance of {@link FieldValue }
     * 
     */
    public FieldValue createFieldValue() {
        return new FieldValue();
    }

    /**
     * Create an instance of {@link GetSupportingContent }
     * 
     */
    public GetSupportingContent createGetSupportingContent() {
        return new GetSupportingContent();
    }

    /**
     * Create an instance of {@link SetSupportingContentResponse }
     * 
     */
    public SetSupportingContentResponse createSetSupportingContentResponse() {
        return new SetSupportingContentResponse();
    }

    /**
     * Create an instance of {@link BpelConfig.PayloadMapping }
     * 
     */
    public BpelConfig.PayloadMapping createBpelConfigPayloadMapping() {
        return new BpelConfig.PayloadMapping();
    }

    /**
     * Create an instance of {@link ListTargetApplicationsResponse }
     * 
     */
    public ListTargetApplicationsResponse createListTargetApplicationsResponse() {
        return new ListTargetApplicationsResponse();
    }

    /**
     * Create an instance of {@link ImagingFaultInfo }
     * 
     */
    public ImagingFaultInfo createImagingFaultInfo() {
        return new ImagingFaultInfo();
    }

    /**
     * Create an instance of {@link DeleteDocumentResponse }
     * 
     */
    public DeleteDocumentResponse createDeleteDocumentResponse() {
        return new DeleteDocumentResponse();
    }

    /**
     * Create an instance of {@link AuditEvent }
     * 
     */
    public AuditEvent createAuditEvent() {
        return new AuditEvent();
    }

    /**
     * Create an instance of {@link AuditEvent.Properties }
     * 
     */
    public AuditEvent.Properties createAuditEventProperties() {
        return new AuditEvent.Properties();
    }

    /**
     * Create an instance of {@link HasStatusChanged }
     * 
     */
    public HasStatusChanged createHasStatusChanged() {
        return new HasStatusChanged();
    }

    /**
     * Create an instance of {@link DocumentSectionSet }
     * 
     */
    public DocumentSectionSet createDocumentSectionSet() {
        return new DocumentSectionSet();
    }

    /**
     * Create an instance of {@link Document.FieldValues }
     * 
     */
    public Document.FieldValues createDocumentFieldValues() {
        return new Document.FieldValues();
    }

    /**
     * Create an instance of {@link DeleteDocuments }
     * 
     */
    public DeleteDocuments createDeleteDocuments() {
        return new DeleteDocuments();
    }

    /**
     * Create an instance of {@link GetDocumentVersion }
     * 
     */
    public GetDocumentVersion createGetDocumentVersion() {
        return new GetDocumentVersion();
    }

    /**
     * Create an instance of {@link FieldDefinition }
     * 
     */
    public FieldDefinition createFieldDefinition() {
        return new FieldDefinition();
    }

    /**
     * Create an instance of {@link FieldDefinition.PickList }
     * 
     */
    public FieldDefinition.PickList createFieldDefinitionPickList() {
        return new FieldDefinition.PickList();
    }

    /**
     * Create an instance of {@link ModifyPageOrder }
     * 
     */
    public ModifyPageOrder createModifyPageOrder() {
        return new ModifyPageOrder();
    }

    /**
     * Create an instance of {@link UpdateDocumentResponse }
     * 
     */
    public UpdateDocumentResponse createUpdateDocumentResponse() {
        return new UpdateDocumentResponse();
    }

    /**
     * Create an instance of {@link GetTargetApplication }
     * 
     */
    public GetTargetApplication createGetTargetApplication() {
        return new GetTargetApplication();
    }

    /**
     * Create an instance of {@link SetAnnotationsResponse }
     * 
     */
    public SetAnnotationsResponse createSetAnnotationsResponse() {
        return new SetAnnotationsResponse();
    }

    /**
     * Create an instance of {@link CreateDocument }
     * 
     */
    public CreateDocument createCreateDocument() {
        return new CreateDocument();
    }

    /**
     * Create an instance of {@link SubmitToWorkflow }
     * 
     */
    public SubmitToWorkflow createSubmitToWorkflow() {
        return new SubmitToWorkflow();
    }

    /**
     * Create an instance of {@link MoveDocument }
     * 
     */
    public MoveDocument createMoveDocument() {
        return new MoveDocument();
    }

    /**
     * Create an instance of {@link SetAnnotations }
     * 
     */
    public SetAnnotations createSetAnnotations() {
        return new SetAnnotations();
    }

    /**
     * Create an instance of {@link com.ofss.ucm.docservice.DocumentSecurity }
     * 
     */
    public com.ofss.ucm.docservice.DocumentSecurity createDocumentSecurity() {
        return new com.ofss.ucm.docservice.DocumentSecurity();
    }

    /**
     * Create an instance of {@link GetDocument }
     * 
     */
    public GetDocument createGetDocument() {
        return new GetDocument();
    }

    /**
     * Create an instance of {@link Application.Security }
     * 
     */
    public Application.Security createApplicationSecurity() {
        return new Application.Security();
    }

    /**
     * Create an instance of {@link StorageStage }
     * 
     */
    public StorageStage createStorageStage() {
        return new StorageStage();
    }

    /**
     * Create an instance of {@link GetDocuments }
     * 
     */
    public GetDocuments createGetDocuments() {
        return new GetDocuments();
    }

    /**
     * Create an instance of {@link Application.DocumentSecurity }
     * 
     */
    public Application.DocumentSecurity createApplicationDocumentSecurity() {
        return new Application.DocumentSecurity();
    }

    /**
     * Create an instance of {@link ListTargetApplications }
     * 
     */
    public ListTargetApplications createListTargetApplications() {
        return new ListTargetApplications();
    }

    /**
     * Create an instance of {@link UnlockDocumentResponse }
     * 
     */
    public UnlockDocumentResponse createUnlockDocumentResponse() {
        return new UnlockDocumentResponse();
    }

    /**
     * Create an instance of {@link ValidationError }
     * 
     */
    public ValidationError createValidationError() {
        return new ValidationError();
    }

    /**
     * Create an instance of {@link Document.History }
     * 
     */
    public Document.History createDocumentHistory() {
        return new Document.History();
    }

    /**
     * Create an instance of {@link GetTargetApplicationResponse }
     * 
     */
    public GetTargetApplicationResponse createGetTargetApplicationResponse() {
        return new GetTargetApplicationResponse();
    }

    /**
     * Create an instance of {@link BpelConfig }
     * 
     */
    public BpelConfig createBpelConfig() {
        return new BpelConfig();
    }

    /**
     * Create an instance of {@link GetSupportingContentResponse }
     * 
     */
    public GetSupportingContentResponse createGetSupportingContentResponse() {
        return new GetSupportingContentResponse();
    }

    /**
     * Create an instance of {@link GetAnnotations }
     * 
     */
    public GetAnnotations createGetAnnotations() {
        return new GetAnnotations();
    }

    /**
     * Create an instance of {@link HasStatusChangedResponse }
     * 
     */
    public HasStatusChangedResponse createHasStatusChangedResponse() {
        return new HasStatusChangedResponse();
    }

    /**
     * Create an instance of {@link GetDocumentResponse }
     * 
     */
    public GetDocumentResponse createGetDocumentResponse() {
        return new GetDocumentResponse();
    }

    /**
     * Create an instance of {@link MoveDocumentResponse }
     * 
     */
    public MoveDocumentResponse createMoveDocumentResponse() {
        return new MoveDocumentResponse();
    }

    /**
     * Create an instance of {@link GetDocumentsResponse }
     * 
     */
    public GetDocumentsResponse createGetDocumentsResponse() {
        return new GetDocumentsResponse();
    }

    /**
     * Create an instance of {@link UnlockDocument }
     * 
     */
    public UnlockDocument createUnlockDocument() {
        return new UnlockDocument();
    }

    /**
     * Create an instance of {@link DefinitionPermissions }
     * 
     */
    public DefinitionPermissions createDefinitionPermissions() {
        return new DefinitionPermissions();
    }

    /**
     * Create an instance of {@link UpdateDocument }
     * 
     */
    public UpdateDocument createUpdateDocument() {
        return new UpdateDocument();
    }

    /**
     * Create an instance of {@link LifecyclePolicy }
     * 
     */
    public LifecyclePolicy createLifecyclePolicy() {
        return new LifecyclePolicy();
    }

    /**
     * Create an instance of {@link DeleteDocumentsResponse }
     * 
     */
    public DeleteDocumentsResponse createDeleteDocumentsResponse() {
        return new DeleteDocumentsResponse();
    }

    /**
     * Create an instance of {@link ImagingFaultDetail }
     * 
     */
    public ImagingFaultDetail createImagingFaultDetail() {
        return new ImagingFaultDetail();
    }

    /**
     * Create an instance of {@link NameId }
     * 
     */
    public NameId createNameId() {
        return new NameId();
    }

    /**
     * Create an instance of {@link ModifyPageOrderResponse }
     * 
     */
    public ModifyPageOrderResponse createModifyPageOrderResponse() {
        return new ModifyPageOrderResponse();
    }

    /**
     * Create an instance of {@link GetAnnotationsResponse }
     * 
     */
    public GetAnnotationsResponse createGetAnnotationsResponse() {
        return new GetAnnotationsResponse();
    }

    /**
     * Create an instance of {@link DeleteDocument }
     * 
     */
    public DeleteDocument createDeleteDocument() {
        return new DeleteDocument();
    }

    /**
     * Create an instance of {@link LockDocumentResponse }
     * 
     */
    public LockDocumentResponse createLockDocumentResponse() {
        return new LockDocumentResponse();
    }

    /**
     * Create an instance of {@link ValidationFaultInfo }
     * 
     */
    public ValidationFaultInfo createValidationFaultInfo() {
        return new ValidationFaultInfo();
    }

    /**
     * Create an instance of {@link Application.FieldDefinitions }
     * 
     */
    public Application.FieldDefinitions createApplicationFieldDefinitions() {
        return new Application.FieldDefinitions();
    }

    /**
     * Create an instance of {@link DocumentProperties }
     * 
     */
    public DocumentProperties createDocumentProperties() {
        return new DocumentProperties();
    }

    /**
     * Create an instance of {@link SubmitToWorkflowResponse }
     * 
     */
    public SubmitToWorkflowResponse createSubmitToWorkflowResponse() {
        return new SubmitToWorkflowResponse();
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link DeleteDocumentResponse }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "deleteDocumentResponse")
    public JAXBElement<DeleteDocumentResponse> createDeleteDocumentResponse(DeleteDocumentResponse value) {
        return new JAXBElement<DeleteDocumentResponse>(_DeleteDocumentResponse_QNAME, DeleteDocumentResponse.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link GetDocuments }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "getDocuments")
    public JAXBElement<GetDocuments> createGetDocuments(GetDocuments value) {
        return new JAXBElement<GetDocuments>(_GetDocuments_QNAME, GetDocuments.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link GetTargetApplication }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "getTargetApplication")
    public JAXBElement<GetTargetApplication> createGetTargetApplication(GetTargetApplication value) {
        return new JAXBElement<GetTargetApplication>(_GetTargetApplication_QNAME, GetTargetApplication.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link LifecyclePolicy }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "lifecyclePolicy")
    public JAXBElement<LifecyclePolicy> createLifecyclePolicy(LifecyclePolicy value) {
        return new JAXBElement<LifecyclePolicy>(_LifecyclePolicy_QNAME, LifecyclePolicy.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link GetTargetApplicationResponse }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "getTargetApplicationResponse")
    public JAXBElement<GetTargetApplicationResponse> createGetTargetApplicationResponse(GetTargetApplicationResponse value) {
        return new JAXBElement<GetTargetApplicationResponse>(_GetTargetApplicationResponse_QNAME, GetTargetApplicationResponse.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link DeleteDocuments }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "deleteDocuments")
    public JAXBElement<DeleteDocuments> createDeleteDocuments(DeleteDocuments value) {
        return new JAXBElement<DeleteDocuments>(_DeleteDocuments_QNAME, DeleteDocuments.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link NameId }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "nameId")
    public JAXBElement<NameId> createNameId(NameId value) {
        return new JAXBElement<NameId>(_NameId_QNAME, NameId.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link ValidationError }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "ValidationError")
    public JAXBElement<ValidationError> createValidationError(ValidationError value) {
        return new JAXBElement<ValidationError>(_ValidationError_QNAME, ValidationError.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link ValidationFaultInfo }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "ValidationException")
    public JAXBElement<ValidationFaultInfo> createValidationException(ValidationFaultInfo value) {
        return new JAXBElement<ValidationFaultInfo>(_ValidationException_QNAME, ValidationFaultInfo.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link SetAnnotationsResponse }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "setAnnotationsResponse")
    public JAXBElement<SetAnnotationsResponse> createSetAnnotationsResponse(SetAnnotationsResponse value) {
        return new JAXBElement<SetAnnotationsResponse>(_SetAnnotationsResponse_QNAME, SetAnnotationsResponse.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link Application }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "application")
    public JAXBElement<Application> createApplication(Application value) {
        return new JAXBElement<Application>(_Application_QNAME, Application.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link GetAnnotations }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "getAnnotations")
    public JAXBElement<GetAnnotations> createGetAnnotations(GetAnnotations value) {
        return new JAXBElement<GetAnnotations>(_GetAnnotations_QNAME, GetAnnotations.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link GetSupportingContentResponse }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "getSupportingContentResponse")
    public JAXBElement<GetSupportingContentResponse> createGetSupportingContentResponse(GetSupportingContentResponse value) {
        return new JAXBElement<GetSupportingContentResponse>(_GetSupportingContentResponse_QNAME, GetSupportingContentResponse.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link CopyDocument }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "copyDocument")
    public JAXBElement<CopyDocument> createCopyDocument(CopyDocument value) {
        return new JAXBElement<CopyDocument>(_CopyDocument_QNAME, CopyDocument.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link ListTargetApplicationsResponse }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "listTargetApplicationsResponse")
    public JAXBElement<ListTargetApplicationsResponse> createListTargetApplicationsResponse(ListTargetApplicationsResponse value) {
        return new JAXBElement<ListTargetApplicationsResponse>(_ListTargetApplicationsResponse_QNAME, ListTargetApplicationsResponse.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link MoveDocument }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "moveDocument")
    public JAXBElement<MoveDocument> createMoveDocument(MoveDocument value) {
        return new JAXBElement<MoveDocument>(_MoveDocument_QNAME, MoveDocument.class, null, value);
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
     * Create an instance of {@link JAXBElement }{@code <}{@link CreateDocument }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "createDocument")
    public JAXBElement<CreateDocument> createCreateDocument(CreateDocument value) {
        return new JAXBElement<CreateDocument>(_CreateDocument_QNAME, CreateDocument.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link UpdateDocumentResponse }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "updateDocumentResponse")
    public JAXBElement<UpdateDocumentResponse> createUpdateDocumentResponse(UpdateDocumentResponse value) {
        return new JAXBElement<UpdateDocumentResponse>(_UpdateDocumentResponse_QNAME, UpdateDocumentResponse.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link DefinitionSecurity }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "security")
    public JAXBElement<DefinitionSecurity> createSecurity(DefinitionSecurity value) {
        return new JAXBElement<DefinitionSecurity>(_Security_QNAME, DefinitionSecurity.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link SetSupportingContentResponse }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "setSupportingContentResponse")
    public JAXBElement<SetSupportingContentResponse> createSetSupportingContentResponse(SetSupportingContentResponse value) {
        return new JAXBElement<SetSupportingContentResponse>(_SetSupportingContentResponse_QNAME, SetSupportingContentResponse.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link SubmitToWorkflowResponse }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "submitToWorkflowResponse")
    public JAXBElement<SubmitToWorkflowResponse> createSubmitToWorkflowResponse(SubmitToWorkflowResponse value) {
        return new JAXBElement<SubmitToWorkflowResponse>(_SubmitToWorkflowResponse_QNAME, SubmitToWorkflowResponse.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link DeleteDocumentsResponse }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "deleteDocumentsResponse")
    public JAXBElement<DeleteDocumentsResponse> createDeleteDocumentsResponse(DeleteDocumentsResponse value) {
        return new JAXBElement<DeleteDocumentsResponse>(_DeleteDocumentsResponse_QNAME, DeleteDocumentsResponse.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link SetSupportingContent }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "setSupportingContent")
    public JAXBElement<SetSupportingContent> createSetSupportingContent(SetSupportingContent value) {
        return new JAXBElement<SetSupportingContent>(_SetSupportingContent_QNAME, SetSupportingContent.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link LockDocumentResponse }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "lockDocumentResponse")
    public JAXBElement<LockDocumentResponse> createLockDocumentResponse(LockDocumentResponse value) {
        return new JAXBElement<LockDocumentResponse>(_LockDocumentResponse_QNAME, LockDocumentResponse.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link GetSupportingContent }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "getSupportingContent")
    public JAXBElement<GetSupportingContent> createGetSupportingContent(GetSupportingContent value) {
        return new JAXBElement<GetSupportingContent>(_GetSupportingContent_QNAME, GetSupportingContent.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link DocumentSectionSet }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "sectionSet")
    public JAXBElement<DocumentSectionSet> createSectionSet(DocumentSectionSet value) {
        return new JAXBElement<DocumentSectionSet>(_SectionSet_QNAME, DocumentSectionSet.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link CopyDocumentResponse }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "copyDocumentResponse")
    public JAXBElement<CopyDocumentResponse> createCopyDocumentResponse(CopyDocumentResponse value) {
        return new JAXBElement<CopyDocumentResponse>(_CopyDocumentResponse_QNAME, CopyDocumentResponse.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link SubmitToWorkflow }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "submitToWorkflow")
    public JAXBElement<SubmitToWorkflow> createSubmitToWorkflow(SubmitToWorkflow value) {
        return new JAXBElement<SubmitToWorkflow>(_SubmitToWorkflow_QNAME, SubmitToWorkflow.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link GetDocumentsResponse }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "getDocumentsResponse")
    public JAXBElement<GetDocumentsResponse> createGetDocumentsResponse(GetDocumentsResponse value) {
        return new JAXBElement<GetDocumentsResponse>(_GetDocumentsResponse_QNAME, GetDocumentsResponse.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link GetDocumentVersionResponse }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "getDocumentVersionResponse")
    public JAXBElement<GetDocumentVersionResponse> createGetDocumentVersionResponse(GetDocumentVersionResponse value) {
        return new JAXBElement<GetDocumentVersionResponse>(_GetDocumentVersionResponse_QNAME, GetDocumentVersionResponse.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link HasStatusChanged }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "hasStatusChanged")
    public JAXBElement<HasStatusChanged> createHasStatusChanged(HasStatusChanged value) {
        return new JAXBElement<HasStatusChanged>(_HasStatusChanged_QNAME, HasStatusChanged.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link com.ofss.ucm.docservice.DocumentSecurity }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "documentSecurity")
    public JAXBElement<com.ofss.ucm.docservice.DocumentSecurity> createDocumentSecurity(com.ofss.ucm.docservice.DocumentSecurity value) {
        return new JAXBElement<com.ofss.ucm.docservice.DocumentSecurity>(_DocumentSecurity_QNAME, com.ofss.ucm.docservice.DocumentSecurity.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link SetAnnotations }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "setAnnotations")
    public JAXBElement<SetAnnotations> createSetAnnotations(SetAnnotations value) {
        return new JAXBElement<SetAnnotations>(_SetAnnotations_QNAME, SetAnnotations.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link MoveDocumentResponse }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "moveDocumentResponse")
    public JAXBElement<MoveDocumentResponse> createMoveDocumentResponse(MoveDocumentResponse value) {
        return new JAXBElement<MoveDocumentResponse>(_MoveDocumentResponse_QNAME, MoveDocumentResponse.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link BpelConfig }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "bpelConfig")
    public JAXBElement<BpelConfig> createBpelConfig(BpelConfig value) {
        return new JAXBElement<BpelConfig>(_BpelConfig_QNAME, BpelConfig.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link StorageStage }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "storagePolicyItem")
    public JAXBElement<StorageStage> createStoragePolicyItem(StorageStage value) {
        return new JAXBElement<StorageStage>(_StoragePolicyItem_QNAME, StorageStage.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link UnlockDocumentResponse }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "unlockDocumentResponse")
    public JAXBElement<UnlockDocumentResponse> createUnlockDocumentResponse(UnlockDocumentResponse value) {
        return new JAXBElement<UnlockDocumentResponse>(_UnlockDocumentResponse_QNAME, UnlockDocumentResponse.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link HasStatusChangedResponse }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "hasStatusChangedResponse")
    public JAXBElement<HasStatusChangedResponse> createHasStatusChangedResponse(HasStatusChangedResponse value) {
        return new JAXBElement<HasStatusChangedResponse>(_HasStatusChangedResponse_QNAME, HasStatusChangedResponse.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link GetAnnotationsResponse }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "getAnnotationsResponse")
    public JAXBElement<GetAnnotationsResponse> createGetAnnotationsResponse(GetAnnotationsResponse value) {
        return new JAXBElement<GetAnnotationsResponse>(_GetAnnotationsResponse_QNAME, GetAnnotationsResponse.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link GetDocumentVersion }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "getDocumentVersion")
    public JAXBElement<GetDocumentVersion> createGetDocumentVersion(GetDocumentVersion value) {
        return new JAXBElement<GetDocumentVersion>(_GetDocumentVersion_QNAME, GetDocumentVersion.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link UpdateDocument }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "updateDocument")
    public JAXBElement<UpdateDocument> createUpdateDocument(UpdateDocument value) {
        return new JAXBElement<UpdateDocument>(_UpdateDocument_QNAME, UpdateDocument.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link ModifyPageOrderResponse }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "modifyPageOrderResponse")
    public JAXBElement<ModifyPageOrderResponse> createModifyPageOrderResponse(ModifyPageOrderResponse value) {
        return new JAXBElement<ModifyPageOrderResponse>(_ModifyPageOrderResponse_QNAME, ModifyPageOrderResponse.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link LockDocument }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "lockDocument")
    public JAXBElement<LockDocument> createLockDocument(LockDocument value) {
        return new JAXBElement<LockDocument>(_LockDocument_QNAME, LockDocument.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link CreateDocumentResponse }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "createDocumentResponse")
    public JAXBElement<CreateDocumentResponse> createCreateDocumentResponse(CreateDocumentResponse value) {
        return new JAXBElement<CreateDocumentResponse>(_CreateDocumentResponse_QNAME, CreateDocumentResponse.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link GetDocument }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "getDocument")
    public JAXBElement<GetDocument> createGetDocument(GetDocument value) {
        return new JAXBElement<GetDocument>(_GetDocument_QNAME, GetDocument.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link ListTargetApplications }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "listTargetApplications")
    public JAXBElement<ListTargetApplications> createListTargetApplications(ListTargetApplications value) {
        return new JAXBElement<ListTargetApplications>(_ListTargetApplications_QNAME, ListTargetApplications.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link DeleteDocument }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "deleteDocument")
    public JAXBElement<DeleteDocument> createDeleteDocument(DeleteDocument value) {
        return new JAXBElement<DeleteDocument>(_DeleteDocument_QNAME, DeleteDocument.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link FieldDefinition }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "fieldDefinition")
    public JAXBElement<FieldDefinition> createFieldDefinition(FieldDefinition value) {
        return new JAXBElement<FieldDefinition>(_FieldDefinition_QNAME, FieldDefinition.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link ModifyPageOrder }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "modifyPageOrder")
    public JAXBElement<ModifyPageOrder> createModifyPageOrder(ModifyPageOrder value) {
        return new JAXBElement<ModifyPageOrder>(_ModifyPageOrder_QNAME, ModifyPageOrder.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link UnlockDocument }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "unlockDocument")
    public JAXBElement<UnlockDocument> createUnlockDocument(UnlockDocument value) {
        return new JAXBElement<UnlockDocument>(_UnlockDocument_QNAME, UnlockDocument.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link GetDocumentResponse }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "getDocumentResponse")
    public JAXBElement<GetDocumentResponse> createGetDocumentResponse(GetDocumentResponse value) {
        return new JAXBElement<GetDocumentResponse>(_GetDocumentResponse_QNAME, GetDocumentResponse.class, null, value);
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

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link LifecyclePolicy.StoragePolicy }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "", name = "storagePolicy", scope = LifecyclePolicy.class)
    public JAXBElement<LifecyclePolicy.StoragePolicy> createLifecyclePolicyStoragePolicy(LifecyclePolicy.StoragePolicy value) {
        return new JAXBElement<LifecyclePolicy.StoragePolicy>(_LifecyclePolicyStoragePolicy_QNAME, LifecyclePolicy.StoragePolicy.class, LifecyclePolicy.class, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link BpelConfig }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "", name = "bpelConfig", scope = Application.class)
    public JAXBElement<BpelConfig> createApplicationBpelConfig(BpelConfig value) {
        return new JAXBElement<BpelConfig>(_ApplicationBpelConfig_QNAME, BpelConfig.class, Application.class, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link LifecyclePolicy }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "", name = "lifecyclePolicy", scope = Application.class)
    public JAXBElement<LifecyclePolicy> createApplicationLifecyclePolicy(LifecyclePolicy value) {
        return new JAXBElement<LifecyclePolicy>(_ApplicationLifecyclePolicy_QNAME, LifecyclePolicy.class, Application.class, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link DocumentPermissions }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "", name = "documentPermissions", scope = Application.class)
    public JAXBElement<DocumentPermissions> createApplicationDocumentPermissions(DocumentPermissions value) {
        return new JAXBElement<DocumentPermissions>(_DocumentDocumentPermissions_QNAME, DocumentPermissions.class, Application.class, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link Application.DocumentSecurity }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "", name = "documentSecurity", scope = Application.class)
    public JAXBElement<Application.DocumentSecurity> createApplicationDocumentSecurity(Application.DocumentSecurity value) {
        return new JAXBElement<Application.DocumentSecurity>(_ApplicationDocumentSecurity_QNAME, Application.DocumentSecurity.class, Application.class, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link DefinitionPermissions }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "", name = "applicationPermissions", scope = Application.class)
    public JAXBElement<DefinitionPermissions> createApplicationApplicationPermissions(DefinitionPermissions value) {
        return new JAXBElement<DefinitionPermissions>(_ApplicationApplicationPermissions_QNAME, DefinitionPermissions.class, Application.class, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link Application.Security }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "", name = "security", scope = Application.class)
    public JAXBElement<Application.Security> createApplicationSecurity(Application.Security value) {
        return new JAXBElement<Application.Security>(_ApplicationSecurity_QNAME, Application.Security.class, Application.class, value);
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
     * Create an instance of {@link JAXBElement }{@code <}{@link String }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "", name = "value", scope = PayloadItem.class)
    public JAXBElement<String> createPayloadItemValue(String value) {
        return new JAXBElement<String>(_PayloadItemValue_QNAME, String.class, PayloadItem.class, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link BpelConfig.PayloadMapping }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "", name = "payloadMapping", scope = BpelConfig.class)
    public JAXBElement<BpelConfig.PayloadMapping> createBpelConfigPayloadMapping(BpelConfig.PayloadMapping value) {
        return new JAXBElement<BpelConfig.PayloadMapping>(_BpelConfigPayloadMapping_QNAME, BpelConfig.PayloadMapping.class, BpelConfig.class, value);
    }

}
