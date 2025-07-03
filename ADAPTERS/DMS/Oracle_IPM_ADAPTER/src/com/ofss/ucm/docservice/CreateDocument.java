
package com.ofss.ucm.docservice;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for createDocument complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="createDocument">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="uploadToken" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="applicationId" type="{http://imaging.oracle/}NameId" minOccurs="0"/>
 *         &lt;element name="fieldValues" type="{http://imaging.oracle/}FieldValue" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element name="submitToWorkflow" type="{http://www.w3.org/2001/XMLSchema}boolean"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "createDocument", propOrder = {
    "uploadToken",
    "applicationId",
    "fieldValues",
    "submitToWorkflow"
})
public class CreateDocument {

    protected String uploadToken;
    protected NameId applicationId;
    protected List<FieldValue> fieldValues;
    protected boolean submitToWorkflow;

    /**
     * Gets the value of the uploadToken property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getUploadToken() {
        return uploadToken;
    }

    /**
     * Sets the value of the uploadToken property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setUploadToken(String value) {
        this.uploadToken = value;
    }

    /**
     * Gets the value of the applicationId property.
     * 
     * @return
     *     possible object is
     *     {@link NameId }
     *     
     */
    public NameId getApplicationId() {
        return applicationId;
    }

    /**
     * Sets the value of the applicationId property.
     * 
     * @param value
     *     allowed object is
     *     {@link NameId }
     *     
     */
    public void setApplicationId(NameId value) {
        this.applicationId = value;
    }

    /**
     * Gets the value of the fieldValues property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the fieldValues property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getFieldValues().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link FieldValue }
     * 
     * 
     */
    public List<FieldValue> getFieldValues() {
        if (fieldValues == null) {
            fieldValues = new ArrayList<FieldValue>();
        }
        return this.fieldValues;
    }

    /**
     * Gets the value of the submitToWorkflow property.
     * 
     */
    public boolean isSubmitToWorkflow() {
        return submitToWorkflow;
    }

    /**
     * Sets the value of the submitToWorkflow property.
     * 
     */
    public void setSubmitToWorkflow(boolean value) {
        this.submitToWorkflow = value;
    }

}
