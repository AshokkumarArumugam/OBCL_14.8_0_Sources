
package com.ofss.ucm.docservice;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.JAXBElement;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementRef;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for Application complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="Application">
 *   &lt;complexContent>
 *     &lt;extension base="{http://imaging.oracle/}Definition">
 *       &lt;sequence>
 *         &lt;element name="fieldDefinitions" minOccurs="0">
 *           &lt;complexType>
 *             &lt;complexContent>
 *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                 &lt;sequence>
 *                   &lt;element name="fieldDefinition" type="{http://imaging.oracle/}fieldDefinition" maxOccurs="unbounded" minOccurs="0"/>
 *                 &lt;/sequence>
 *               &lt;/restriction>
 *             &lt;/complexContent>
 *           &lt;/complexType>
 *         &lt;/element>
 *         &lt;element name="applicationPermissions" type="{http://imaging.oracle/}DefinitionPermissions" minOccurs="0"/>
 *         &lt;element name="documentPermissions" type="{http://imaging.oracle/}DocumentPermissions" minOccurs="0"/>
 *         &lt;element name="security" minOccurs="0">
 *           &lt;complexType>
 *             &lt;complexContent>
 *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                 &lt;sequence>
 *                   &lt;element name="securityItem" type="{http://imaging.oracle/}DefinitionSecurity" maxOccurs="unbounded" minOccurs="0"/>
 *                 &lt;/sequence>
 *               &lt;/restriction>
 *             &lt;/complexContent>
 *           &lt;/complexType>
 *         &lt;/element>
 *         &lt;element name="documentSecurity" minOccurs="0">
 *           &lt;complexType>
 *             &lt;complexContent>
 *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                 &lt;sequence>
 *                   &lt;element name="documentSecurityItem" type="{http://imaging.oracle/}DocumentSecurity" maxOccurs="unbounded" minOccurs="0"/>
 *                 &lt;/sequence>
 *               &lt;/restriction>
 *             &lt;/complexContent>
 *           &lt;/complexType>
 *         &lt;/element>
 *         &lt;element name="lifecyclePolicy" type="{http://imaging.oracle/}LifecyclePolicy" minOccurs="0"/>
 *         &lt;element name="bpelConfig" type="{http://imaging.oracle/}BpelConfig" minOccurs="0"/>
 *         &lt;element name="history" minOccurs="0">
 *           &lt;complexType>
 *             &lt;complexContent>
 *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                 &lt;sequence>
 *                   &lt;element name="historyItem" type="{http://imaging.oracle/}AuditEvent" maxOccurs="unbounded" minOccurs="0"/>
 *                 &lt;/sequence>
 *               &lt;/restriction>
 *             &lt;/complexContent>
 *           &lt;/complexType>
 *         &lt;/element>
 *       &lt;/sequence>
 *     &lt;/extension>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "Application", propOrder = {
    "fieldDefinitions",
    "applicationPermissions",
    "documentPermissions",
    "security",
    "documentSecurity",
    "lifecyclePolicy",
    "bpelConfig",
    "history"
})
public class Application
    extends Definition
{

    protected Application.FieldDefinitions fieldDefinitions;
    @XmlElementRef(name = "applicationPermissions", type = JAXBElement.class)
    protected JAXBElement<DefinitionPermissions> applicationPermissions;
    @XmlElementRef(name = "documentPermissions", type = JAXBElement.class)
    protected JAXBElement<DocumentPermissions> documentPermissions;
    @XmlElementRef(name = "security", type = JAXBElement.class)
    protected JAXBElement<Application.Security> security;
    @XmlElementRef(name = "documentSecurity", type = JAXBElement.class)
    protected JAXBElement<Application.DocumentSecurity> documentSecurity;
    @XmlElementRef(name = "lifecyclePolicy", type = JAXBElement.class)
    protected JAXBElement<LifecyclePolicy> lifecyclePolicy;
    @XmlElementRef(name = "bpelConfig", type = JAXBElement.class)
    protected JAXBElement<BpelConfig> bpelConfig;
    protected Application.History history;

    /**
     * Gets the value of the fieldDefinitions property.
     * 
     * @return
     *     possible object is
     *     {@link Application.FieldDefinitions }
     *     
     */
    public Application.FieldDefinitions getFieldDefinitions() {
        return fieldDefinitions;
    }

    /**
     * Sets the value of the fieldDefinitions property.
     * 
     * @param value
     *     allowed object is
     *     {@link Application.FieldDefinitions }
     *     
     */
    public void setFieldDefinitions(Application.FieldDefinitions value) {
        this.fieldDefinitions = value;
    }

    /**
     * Gets the value of the applicationPermissions property.
     * 
     * @return
     *     possible object is
     *     {@link JAXBElement }{@code <}{@link DefinitionPermissions }{@code >}
     *     
     */
    public JAXBElement<DefinitionPermissions> getApplicationPermissions() {
        return applicationPermissions;
    }

    /**
     * Sets the value of the applicationPermissions property.
     * 
     * @param value
     *     allowed object is
     *     {@link JAXBElement }{@code <}{@link DefinitionPermissions }{@code >}
     *     
     */
    public void setApplicationPermissions(JAXBElement<DefinitionPermissions> value) {
        this.applicationPermissions = ((JAXBElement<DefinitionPermissions> ) value);
    }

    /**
     * Gets the value of the documentPermissions property.
     * 
     * @return
     *     possible object is
     *     {@link JAXBElement }{@code <}{@link DocumentPermissions }{@code >}
     *     
     */
    public JAXBElement<DocumentPermissions> getDocumentPermissions() {
        return documentPermissions;
    }

    /**
     * Sets the value of the documentPermissions property.
     * 
     * @param value
     *     allowed object is
     *     {@link JAXBElement }{@code <}{@link DocumentPermissions }{@code >}
     *     
     */
    public void setDocumentPermissions(JAXBElement<DocumentPermissions> value) {
        this.documentPermissions = ((JAXBElement<DocumentPermissions> ) value);
    }

    /**
     * Gets the value of the security property.
     * 
     * @return
     *     possible object is
     *     {@link JAXBElement }{@code <}{@link Application.Security }{@code >}
     *     
     */
    public JAXBElement<Application.Security> getSecurity() {
        return security;
    }

    /**
     * Sets the value of the security property.
     * 
     * @param value
     *     allowed object is
     *     {@link JAXBElement }{@code <}{@link Application.Security }{@code >}
     *     
     */
    public void setSecurity(JAXBElement<Application.Security> value) {
        this.security = ((JAXBElement<Application.Security> ) value);
    }

    /**
     * Gets the value of the documentSecurity property.
     * 
     * @return
     *     possible object is
     *     {@link JAXBElement }{@code <}{@link Application.DocumentSecurity }{@code >}
     *     
     */
    public JAXBElement<Application.DocumentSecurity> getDocumentSecurity() {
        return documentSecurity;
    }

    /**
     * Sets the value of the documentSecurity property.
     * 
     * @param value
     *     allowed object is
     *     {@link JAXBElement }{@code <}{@link Application.DocumentSecurity }{@code >}
     *     
     */
    public void setDocumentSecurity(JAXBElement<Application.DocumentSecurity> value) {
        this.documentSecurity = ((JAXBElement<Application.DocumentSecurity> ) value);
    }

    /**
     * Gets the value of the lifecyclePolicy property.
     * 
     * @return
     *     possible object is
     *     {@link JAXBElement }{@code <}{@link LifecyclePolicy }{@code >}
     *     
     */
    public JAXBElement<LifecyclePolicy> getLifecyclePolicy() {
        return lifecyclePolicy;
    }

    /**
     * Sets the value of the lifecyclePolicy property.
     * 
     * @param value
     *     allowed object is
     *     {@link JAXBElement }{@code <}{@link LifecyclePolicy }{@code >}
     *     
     */
    public void setLifecyclePolicy(JAXBElement<LifecyclePolicy> value) {
        this.lifecyclePolicy = ((JAXBElement<LifecyclePolicy> ) value);
    }

    /**
     * Gets the value of the bpelConfig property.
     * 
     * @return
     *     possible object is
     *     {@link JAXBElement }{@code <}{@link BpelConfig }{@code >}
     *     
     */
    public JAXBElement<BpelConfig> getBpelConfig() {
        return bpelConfig;
    }

    /**
     * Sets the value of the bpelConfig property.
     * 
     * @param value
     *     allowed object is
     *     {@link JAXBElement }{@code <}{@link BpelConfig }{@code >}
     *     
     */
    public void setBpelConfig(JAXBElement<BpelConfig> value) {
        this.bpelConfig = ((JAXBElement<BpelConfig> ) value);
    }

    /**
     * Gets the value of the history property.
     * 
     * @return
     *     possible object is
     *     {@link Application.History }
     *     
     */
    public Application.History getHistory() {
        return history;
    }

    /**
     * Sets the value of the history property.
     * 
     * @param value
     *     allowed object is
     *     {@link Application.History }
     *     
     */
    public void setHistory(Application.History value) {
        this.history = value;
    }


    /**
     * <p>Java class for anonymous complex type.
     * 
     * <p>The following schema fragment specifies the expected content contained within this class.
     * 
     * <pre>
     * &lt;complexType>
     *   &lt;complexContent>
     *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
     *       &lt;sequence>
     *         &lt;element name="documentSecurityItem" type="{http://imaging.oracle/}DocumentSecurity" maxOccurs="unbounded" minOccurs="0"/>
     *       &lt;/sequence>
     *     &lt;/restriction>
     *   &lt;/complexContent>
     * &lt;/complexType>
     * </pre>
     * 
     * 
     */
    @XmlAccessorType(XmlAccessType.FIELD)
    @XmlType(name = "", propOrder = {
        "documentSecurityItem"
    })
    public static class DocumentSecurity {

        @XmlElement(nillable = true)
        protected List<com.ofss.ucm.docservice.DocumentSecurity> documentSecurityItem;

        /**
         * Gets the value of the documentSecurityItem property.
         * 
         * <p>
         * This accessor method returns a reference to the live list,
         * not a snapshot. Therefore any modification you make to the
         * returned list will be present inside the JAXB object.
         * This is why there is not a <CODE>set</CODE> method for the documentSecurityItem property.
         * 
         * <p>
         * For example, to add a new item, do as follows:
         * <pre>
         *    getDocumentSecurityItem().add(newItem);
         * </pre>
         * 
         * 
         * <p>
         * Objects of the following type(s) are allowed in the list
         * {@link com.ofss.ucm.docservice.DocumentSecurity }
         * 
         * 
         */
        public List<com.ofss.ucm.docservice.DocumentSecurity> getDocumentSecurityItem() {
            if (documentSecurityItem == null) {
                documentSecurityItem = new ArrayList<com.ofss.ucm.docservice.DocumentSecurity>();
            }
            return this.documentSecurityItem;
        }

    }


    /**
     * <p>Java class for anonymous complex type.
     * 
     * <p>The following schema fragment specifies the expected content contained within this class.
     * 
     * <pre>
     * &lt;complexType>
     *   &lt;complexContent>
     *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
     *       &lt;sequence>
     *         &lt;element name="fieldDefinition" type="{http://imaging.oracle/}fieldDefinition" maxOccurs="unbounded" minOccurs="0"/>
     *       &lt;/sequence>
     *     &lt;/restriction>
     *   &lt;/complexContent>
     * &lt;/complexType>
     * </pre>
     * 
     * 
     */
    @XmlAccessorType(XmlAccessType.FIELD)
    @XmlType(name = "", propOrder = {
        "fieldDefinition"
    })
    public static class FieldDefinitions {

        @XmlElement(nillable = true)
        protected List<FieldDefinition> fieldDefinition;

        /**
         * Gets the value of the fieldDefinition property.
         * 
         * <p>
         * This accessor method returns a reference to the live list,
         * not a snapshot. Therefore any modification you make to the
         * returned list will be present inside the JAXB object.
         * This is why there is not a <CODE>set</CODE> method for the fieldDefinition property.
         * 
         * <p>
         * For example, to add a new item, do as follows:
         * <pre>
         *    getFieldDefinition().add(newItem);
         * </pre>
         * 
         * 
         * <p>
         * Objects of the following type(s) are allowed in the list
         * {@link FieldDefinition }
         * 
         * 
         */
        public List<FieldDefinition> getFieldDefinition() {
            if (fieldDefinition == null) {
                fieldDefinition = new ArrayList<FieldDefinition>();
            }
            return this.fieldDefinition;
        }

    }


    /**
     * <p>Java class for anonymous complex type.
     * 
     * <p>The following schema fragment specifies the expected content contained within this class.
     * 
     * <pre>
     * &lt;complexType>
     *   &lt;complexContent>
     *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
     *       &lt;sequence>
     *         &lt;element name="historyItem" type="{http://imaging.oracle/}AuditEvent" maxOccurs="unbounded" minOccurs="0"/>
     *       &lt;/sequence>
     *     &lt;/restriction>
     *   &lt;/complexContent>
     * &lt;/complexType>
     * </pre>
     * 
     * 
     */
    @XmlAccessorType(XmlAccessType.FIELD)
    @XmlType(name = "", propOrder = {
        "historyItem"
    })
    public static class History {

        protected List<AuditEvent> historyItem;

        /**
         * Gets the value of the historyItem property.
         * 
         * <p>
         * This accessor method returns a reference to the live list,
         * not a snapshot. Therefore any modification you make to the
         * returned list will be present inside the JAXB object.
         * This is why there is not a <CODE>set</CODE> method for the historyItem property.
         * 
         * <p>
         * For example, to add a new item, do as follows:
         * <pre>
         *    getHistoryItem().add(newItem);
         * </pre>
         * 
         * 
         * <p>
         * Objects of the following type(s) are allowed in the list
         * {@link AuditEvent }
         * 
         * 
         */
        public List<AuditEvent> getHistoryItem() {
            if (historyItem == null) {
                historyItem = new ArrayList<AuditEvent>();
            }
            return this.historyItem;
        }

    }


    /**
     * <p>Java class for anonymous complex type.
     * 
     * <p>The following schema fragment specifies the expected content contained within this class.
     * 
     * <pre>
     * &lt;complexType>
     *   &lt;complexContent>
     *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
     *       &lt;sequence>
     *         &lt;element name="securityItem" type="{http://imaging.oracle/}DefinitionSecurity" maxOccurs="unbounded" minOccurs="0"/>
     *       &lt;/sequence>
     *     &lt;/restriction>
     *   &lt;/complexContent>
     * &lt;/complexType>
     * </pre>
     * 
     * 
     */
    @XmlAccessorType(XmlAccessType.FIELD)
    @XmlType(name = "", propOrder = {
        "securityItem"
    })
    public static class Security {

        @XmlElement(nillable = true)
        protected List<DefinitionSecurity> securityItem;

        /**
         * Gets the value of the securityItem property.
         * 
         * <p>
         * This accessor method returns a reference to the live list,
         * not a snapshot. Therefore any modification you make to the
         * returned list will be present inside the JAXB object.
         * This is why there is not a <CODE>set</CODE> method for the securityItem property.
         * 
         * <p>
         * For example, to add a new item, do as follows:
         * <pre>
         *    getSecurityItem().add(newItem);
         * </pre>
         * 
         * 
         * <p>
         * Objects of the following type(s) are allowed in the list
         * {@link DefinitionSecurity }
         * 
         * 
         */
        public List<DefinitionSecurity> getSecurityItem() {
            if (securityItem == null) {
                securityItem = new ArrayList<DefinitionSecurity>();
            }
            return this.securityItem;
        }

    }

}
