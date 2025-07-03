
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
 * <p>Java class for LifecyclePolicy complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="LifecyclePolicy">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="retentionPolicy" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="storagePolicy" minOccurs="0">
 *           &lt;complexType>
 *             &lt;complexContent>
 *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                 &lt;sequence>
 *                   &lt;element name="storagePolicyItem" type="{http://imaging.oracle/}StorageStage" maxOccurs="unbounded" minOccurs="0"/>
 *                 &lt;/sequence>
 *               &lt;/restriction>
 *             &lt;/complexContent>
 *           &lt;/complexType>
 *         &lt;/element>
 *         &lt;element name="supportingContentVolume" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "LifecyclePolicy", propOrder = {
    "retentionPolicy",
    "storagePolicy",
    "supportingContentVolume"
})
public class LifecyclePolicy {

    protected String retentionPolicy;
    @XmlElementRef(name = "storagePolicy", type = JAXBElement.class)
    protected JAXBElement<LifecyclePolicy.StoragePolicy> storagePolicy;
    protected String supportingContentVolume;

    /**
     * Gets the value of the retentionPolicy property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getRetentionPolicy() {
        return retentionPolicy;
    }

    /**
     * Sets the value of the retentionPolicy property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setRetentionPolicy(String value) {
        this.retentionPolicy = value;
    }

    /**
     * Gets the value of the storagePolicy property.
     * 
     * @return
     *     possible object is
     *     {@link JAXBElement }{@code <}{@link LifecyclePolicy.StoragePolicy }{@code >}
     *     
     */
    public JAXBElement<LifecyclePolicy.StoragePolicy> getStoragePolicy() {
        return storagePolicy;
    }

    /**
     * Sets the value of the storagePolicy property.
     * 
     * @param value
     *     allowed object is
     *     {@link JAXBElement }{@code <}{@link LifecyclePolicy.StoragePolicy }{@code >}
     *     
     */
    public void setStoragePolicy(JAXBElement<LifecyclePolicy.StoragePolicy> value) {
        this.storagePolicy = ((JAXBElement<LifecyclePolicy.StoragePolicy> ) value);
    }

    /**
     * Gets the value of the supportingContentVolume property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSupportingContentVolume() {
        return supportingContentVolume;
    }

    /**
     * Sets the value of the supportingContentVolume property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSupportingContentVolume(String value) {
        this.supportingContentVolume = value;
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
     *         &lt;element name="storagePolicyItem" type="{http://imaging.oracle/}StorageStage" maxOccurs="unbounded" minOccurs="0"/>
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
        "storagePolicyItem"
    })
    public static class StoragePolicy {

        @XmlElement(nillable = true)
        protected List<StorageStage> storagePolicyItem;

        /**
         * Gets the value of the storagePolicyItem property.
         * 
         * <p>
         * This accessor method returns a reference to the live list,
         * not a snapshot. Therefore any modification you make to the
         * returned list will be present inside the JAXB object.
         * This is why there is not a <CODE>set</CODE> method for the storagePolicyItem property.
         * 
         * <p>
         * For example, to add a new item, do as follows:
         * <pre>
         *    getStoragePolicyItem().add(newItem);
         * </pre>
         * 
         * 
         * <p>
         * Objects of the following type(s) are allowed in the list
         * {@link StorageStage }
         * 
         * 
         */
        public List<StorageStage> getStoragePolicyItem() {
            if (storagePolicyItem == null) {
                storagePolicyItem = new ArrayList<StorageStage>();
            }
            return this.storagePolicyItem;
        }

    }

}
