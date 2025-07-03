
package com.ofss.ucm.loginservice;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlSchemaType;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for ImagingFaultInfo complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="ImagingFaultInfo">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="exceptionCode" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="exceptionLabel" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="faultType" type="{http://imaging.oracle/}imagingFaultType" minOccurs="0"/>
 *         &lt;element name="stackTraceId" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="faultDetails" minOccurs="0">
 *           &lt;complexType>
 *             &lt;complexContent>
 *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                 &lt;sequence>
 *                   &lt;element name="faultDetail" type="{http://imaging.oracle/}ImagingFaultDetail" maxOccurs="unbounded" minOccurs="0"/>
 *                 &lt;/sequence>
 *               &lt;/restriction>
 *             &lt;/complexContent>
 *           &lt;/complexType>
 *         &lt;/element>
 *         &lt;element name="localizedErrorMessage" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "ImagingFaultInfo", propOrder = {
    "exceptionCode",
    "exceptionLabel",
    "faultType",
    "stackTraceId",
    "faultDetails",
    "localizedErrorMessage"
})
public class ImagingFaultInfo {

    protected String exceptionCode;
    protected String exceptionLabel;
    @XmlSchemaType(name = "string")
    protected ImagingFaultType faultType;
    protected String stackTraceId;
    protected ImagingFaultInfo.FaultDetails faultDetails;
    protected String localizedErrorMessage;

    /**
     * Gets the value of the exceptionCode property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getExceptionCode() {
        return exceptionCode;
    }

    /**
     * Sets the value of the exceptionCode property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setExceptionCode(String value) {
        this.exceptionCode = value;
    }

    /**
     * Gets the value of the exceptionLabel property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getExceptionLabel() {
        return exceptionLabel;
    }

    /**
     * Sets the value of the exceptionLabel property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setExceptionLabel(String value) {
        this.exceptionLabel = value;
    }

    /**
     * Gets the value of the faultType property.
     * 
     * @return
     *     possible object is
     *     {@link ImagingFaultType }
     *     
     */
    public ImagingFaultType getFaultType() {
        return faultType;
    }

    /**
     * Sets the value of the faultType property.
     * 
     * @param value
     *     allowed object is
     *     {@link ImagingFaultType }
     *     
     */
    public void setFaultType(ImagingFaultType value) {
        this.faultType = value;
    }

    /**
     * Gets the value of the stackTraceId property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getStackTraceId() {
        return stackTraceId;
    }

    /**
     * Sets the value of the stackTraceId property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setStackTraceId(String value) {
        this.stackTraceId = value;
    }

    /**
     * Gets the value of the faultDetails property.
     * 
     * @return
     *     possible object is
     *     {@link ImagingFaultInfo.FaultDetails }
     *     
     */
    public ImagingFaultInfo.FaultDetails getFaultDetails() {
        return faultDetails;
    }

    /**
     * Sets the value of the faultDetails property.
     * 
     * @param value
     *     allowed object is
     *     {@link ImagingFaultInfo.FaultDetails }
     *     
     */
    public void setFaultDetails(ImagingFaultInfo.FaultDetails value) {
        this.faultDetails = value;
    }

    /**
     * Gets the value of the localizedErrorMessage property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getLocalizedErrorMessage() {
        return localizedErrorMessage;
    }

    /**
     * Sets the value of the localizedErrorMessage property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setLocalizedErrorMessage(String value) {
        this.localizedErrorMessage = value;
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
     *         &lt;element name="faultDetail" type="{http://imaging.oracle/}ImagingFaultDetail" maxOccurs="unbounded" minOccurs="0"/>
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
        "faultDetail"
    })
    public static class FaultDetails {

        protected List<ImagingFaultDetail> faultDetail;

        /**
         * Gets the value of the faultDetail property.
         * 
         * <p>
         * This accessor method returns a reference to the live list,
         * not a snapshot. Therefore any modification you make to the
         * returned list will be present inside the JAXB object.
         * This is why there is not a <CODE>set</CODE> method for the faultDetail property.
         * 
         * <p>
         * For example, to add a new item, do as follows:
         * <pre>
         *    getFaultDetail().add(newItem);
         * </pre>
         * 
         * 
         * <p>
         * Objects of the following type(s) are allowed in the list
         * {@link ImagingFaultDetail }
         * 
         * 
         */
        public List<ImagingFaultDetail> getFaultDetail() {
            if (faultDetail == null) {
                faultDetail = new ArrayList<ImagingFaultDetail>();
            }
            return this.faultDetail;
        }

    }

}
