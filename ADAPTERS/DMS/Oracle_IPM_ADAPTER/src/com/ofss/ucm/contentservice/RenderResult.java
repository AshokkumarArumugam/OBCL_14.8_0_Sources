
package com.ofss.ucm.contentservice;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for renderResult complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="renderResult">
 *   &lt;complexContent>
 *     &lt;extension base="{http://imaging.oracle/}renderOptions">
 *       &lt;sequence>
 *         &lt;element name="docPageCount" type="{http://www.w3.org/2001/XMLSchema}int"/>
 *         &lt;element name="pages" type="{http://imaging.oracle/}renderPage" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element name="mimeType" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="fileName" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="originalFilename" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="totalPageCount" type="{http://www.w3.org/2001/XMLSchema}int"/>
 *         &lt;element name="document" type="{http://imaging.oracle/}Document" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/extension>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "renderResult", propOrder = {
    "docPageCount",
    "pages",
    "mimeType",
    "fileName",
    "originalFilename",
    "totalPageCount",
    "document"
})
public class RenderResult
    extends RenderOptions
{

    protected int docPageCount;
    @XmlElement(nillable = true)
    protected List<RenderPage> pages;
    protected String mimeType;
    protected String fileName;
    protected String originalFilename;
    protected int totalPageCount;
    protected Document document;

    /**
     * Gets the value of the docPageCount property.
     * 
     */
    public int getDocPageCount() {
        return docPageCount;
    }

    /**
     * Sets the value of the docPageCount property.
     * 
     */
    public void setDocPageCount(int value) {
        this.docPageCount = value;
    }

    /**
     * Gets the value of the pages property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the pages property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getPages().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link RenderPage }
     * 
     * 
     */
    public List<RenderPage> getPages() {
        if (pages == null) {
            pages = new ArrayList<RenderPage>();
        }
        return this.pages;
    }

    /**
     * Gets the value of the mimeType property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getMimeType() {
        return mimeType;
    }

    /**
     * Sets the value of the mimeType property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setMimeType(String value) {
        this.mimeType = value;
    }

    /**
     * Gets the value of the fileName property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getFileName() {
        return fileName;
    }

    /**
     * Sets the value of the fileName property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setFileName(String value) {
        this.fileName = value;
    }

    /**
     * Gets the value of the originalFilename property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getOriginalFilename() {
        return originalFilename;
    }

    /**
     * Sets the value of the originalFilename property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setOriginalFilename(String value) {
        this.originalFilename = value;
    }

    /**
     * Gets the value of the totalPageCount property.
     * 
     */
    public int getTotalPageCount() {
        return totalPageCount;
    }

    /**
     * Sets the value of the totalPageCount property.
     * 
     */
    public void setTotalPageCount(int value) {
        this.totalPageCount = value;
    }

    /**
     * Gets the value of the document property.
     * 
     * @return
     *     possible object is
     *     {@link Document }
     *     
     */
    public Document getDocument() {
        return document;
    }

    /**
     * Sets the value of the document property.
     * 
     * @param value
     *     allowed object is
     *     {@link Document }
     *     
     */
    public void setDocument(Document value) {
        this.document = value;
    }

}
