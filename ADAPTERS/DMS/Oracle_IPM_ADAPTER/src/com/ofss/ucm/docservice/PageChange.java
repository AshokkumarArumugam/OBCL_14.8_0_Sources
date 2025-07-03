
package com.ofss.ucm.docservice;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for pageChange complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="pageChange">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="changeType" type="{http://imaging.oracle/}changeType" minOccurs="0"/>
 *         &lt;element name="currentPageNumber" type="{http://www.w3.org/2001/XMLSchema}int"/>
 *         &lt;element name="newPageNumber" type="{http://www.w3.org/2001/XMLSchema}int"/>
 *         &lt;element name="uploadToken" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "pageChange", propOrder = {
    "changeType",
    "currentPageNumber",
    "newPageNumber",
    "uploadToken"
})
public class PageChange {

    protected ChangeType changeType;
    protected int currentPageNumber;
    protected int newPageNumber;
    protected String uploadToken;

    /**
     * Gets the value of the changeType property.
     * 
     * @return
     *     possible object is
     *     {@link ChangeType }
     *     
     */
    public ChangeType getChangeType() {
        return changeType;
    }

    /**
     * Sets the value of the changeType property.
     * 
     * @param value
     *     allowed object is
     *     {@link ChangeType }
     *     
     */
    public void setChangeType(ChangeType value) {
        this.changeType = value;
    }

    /**
     * Gets the value of the currentPageNumber property.
     * 
     */
    public int getCurrentPageNumber() {
        return currentPageNumber;
    }

    /**
     * Sets the value of the currentPageNumber property.
     * 
     */
    public void setCurrentPageNumber(int value) {
        this.currentPageNumber = value;
    }

    /**
     * Gets the value of the newPageNumber property.
     * 
     */
    public int getNewPageNumber() {
        return newPageNumber;
    }

    /**
     * Sets the value of the newPageNumber property.
     * 
     */
    public void setNewPageNumber(int value) {
        this.newPageNumber = value;
    }

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

}
