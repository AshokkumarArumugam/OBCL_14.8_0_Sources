
package com.ofss.ucm.contentservice;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.JAXBElement;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElementRef;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for Document complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="Document">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="name" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="id" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="properties" type="{http://imaging.oracle/}DocumentProperties" minOccurs="0"/>
 *         &lt;element name="fieldValues" minOccurs="0">
 *           &lt;complexType>
 *             &lt;complexContent>
 *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                 &lt;sequence>
 *                   &lt;element name="fieldValue" type="{http://imaging.oracle/}FieldValue" maxOccurs="unbounded" minOccurs="0"/>
 *                 &lt;/sequence>
 *               &lt;/restriction>
 *             &lt;/complexContent>
 *           &lt;/complexType>
 *         &lt;/element>
 *         &lt;element name="documentPermissions" type="{http://imaging.oracle/}DocumentPermissions" minOccurs="0"/>
 *         &lt;element name="history" minOccurs="0">
 *           &lt;complexType>
 *             &lt;complexContent>
 *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                 &lt;sequence>
 *                   &lt;element name="auditEvent" type="{http://imaging.oracle/}AuditEvent" maxOccurs="unbounded" minOccurs="0"/>
 *                 &lt;/sequence>
 *               &lt;/restriction>
 *             &lt;/complexContent>
 *           &lt;/complexType>
 *         &lt;/element>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "Document", propOrder = {
    "name",
    "id",
    "properties",
    "fieldValues",
    "documentPermissions",
    "history"
})
public class Document {

    protected String name;
    protected String id;
    @XmlElementRef(name = "properties", type = JAXBElement.class)
    protected JAXBElement<DocumentProperties> properties;
    @XmlElementRef(name = "fieldValues", type = JAXBElement.class)
    protected JAXBElement<Document.FieldValues> fieldValues;
    @XmlElementRef(name = "documentPermissions", type = JAXBElement.class)
    protected JAXBElement<DocumentPermissions> documentPermissions;
    protected Document.History history;

    /**
     * Gets the value of the name property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getName() {
        return name;
    }

    /**
     * Sets the value of the name property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setName(String value) {
        this.name = value;
    }

    /**
     * Gets the value of the id property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getId() {
        return id;
    }

    /**
     * Sets the value of the id property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setId(String value) {
        this.id = value;
    }

    /**
     * Gets the value of the properties property.
     * 
     * @return
     *     possible object is
     *     {@link JAXBElement }{@code <}{@link DocumentProperties }{@code >}
     *     
     */
    public JAXBElement<DocumentProperties> getProperties() {
        return properties;
    }

    /**
     * Sets the value of the properties property.
     * 
     * @param value
     *     allowed object is
     *     {@link JAXBElement }{@code <}{@link DocumentProperties }{@code >}
     *     
     */
    public void setProperties(JAXBElement<DocumentProperties> value) {
        this.properties = ((JAXBElement<DocumentProperties> ) value);
    }

    /**
     * Gets the value of the fieldValues property.
     * 
     * @return
     *     possible object is
     *     {@link JAXBElement }{@code <}{@link Document.FieldValues }{@code >}
     *     
     */
    public JAXBElement<Document.FieldValues> getFieldValues() {
        return fieldValues;
    }

    /**
     * Sets the value of the fieldValues property.
     * 
     * @param value
     *     allowed object is
     *     {@link JAXBElement }{@code <}{@link Document.FieldValues }{@code >}
     *     
     */
    public void setFieldValues(JAXBElement<Document.FieldValues> value) {
        this.fieldValues = ((JAXBElement<Document.FieldValues> ) value);
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
     * Gets the value of the history property.
     * 
     * @return
     *     possible object is
     *     {@link Document.History }
     *     
     */
    public Document.History getHistory() {
        return history;
    }

    /**
     * Sets the value of the history property.
     * 
     * @param value
     *     allowed object is
     *     {@link Document.History }
     *     
     */
    public void setHistory(Document.History value) {
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
     *         &lt;element name="fieldValue" type="{http://imaging.oracle/}FieldValue" maxOccurs="unbounded" minOccurs="0"/>
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
        "fieldValue"
    })
    public static class FieldValues {

        protected List<FieldValue> fieldValue;

        /**
         * Gets the value of the fieldValue property.
         * 
         * <p>
         * This accessor method returns a reference to the live list,
         * not a snapshot. Therefore any modification you make to the
         * returned list will be present inside the JAXB object.
         * This is why there is not a <CODE>set</CODE> method for the fieldValue property.
         * 
         * <p>
         * For example, to add a new item, do as follows:
         * <pre>
         *    getFieldValue().add(newItem);
         * </pre>
         * 
         * 
         * <p>
         * Objects of the following type(s) are allowed in the list
         * {@link FieldValue }
         * 
         * 
         */
        public List<FieldValue> getFieldValue() {
            if (fieldValue == null) {
                fieldValue = new ArrayList<FieldValue>();
            }
            return this.fieldValue;
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
     *         &lt;element name="auditEvent" type="{http://imaging.oracle/}AuditEvent" maxOccurs="unbounded" minOccurs="0"/>
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
        "auditEvent"
    })
    public static class History {

        protected List<AuditEvent> auditEvent;

        /**
         * Gets the value of the auditEvent property.
         * 
         * <p>
         * This accessor method returns a reference to the live list,
         * not a snapshot. Therefore any modification you make to the
         * returned list will be present inside the JAXB object.
         * This is why there is not a <CODE>set</CODE> method for the auditEvent property.
         * 
         * <p>
         * For example, to add a new item, do as follows:
         * <pre>
         *    getAuditEvent().add(newItem);
         * </pre>
         * 
         * 
         * <p>
         * Objects of the following type(s) are allowed in the list
         * {@link AuditEvent }
         * 
         * 
         */
        public List<AuditEvent> getAuditEvent() {
            if (auditEvent == null) {
                auditEvent = new ArrayList<AuditEvent>();
            }
            return this.auditEvent;
        }

    }

}
