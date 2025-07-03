
package com.ofss.ucm.contentservice;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlSeeAlso;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for renderOptions complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="renderOptions">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="fitMode" type="{http://imaging.oracle/}fitMode" minOccurs="0"/>
 *         &lt;element name="format" type="{http://imaging.oracle/}outputFormat" minOccurs="0"/>
 *         &lt;element name="rotation" type="{http://imaging.oracle/}rotationStop" minOccurs="0"/>
 *         &lt;element name="scaleFactor" type="{http://www.w3.org/2001/XMLSchema}int"/>
 *         &lt;element name="pageNumber" type="{http://www.w3.org/2001/XMLSchema}int"/>
 *         &lt;element name="withAnnotations" type="{http://www.w3.org/2001/XMLSchema}boolean"/>
 *         &lt;element name="boundRect" type="{http://imaging.oracle/}RenderBoundRect" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "renderOptions", propOrder = {
    "fitMode",
    "format",
    "rotation",
    "scaleFactor",
    "pageNumber",
    "withAnnotations",
    "boundRect"
})
@XmlSeeAlso({
    RenderResult.class
})
public class RenderOptions {

    protected FitMode fitMode;
    protected OutputFormat format;
    protected RotationStop rotation;
    protected int scaleFactor;
    protected int pageNumber;
    protected boolean withAnnotations;
    protected RenderBoundRect boundRect;

    /**
     * Gets the value of the fitMode property.
     * 
     * @return
     *     possible object is
     *     {@link FitMode }
     *     
     */
    public FitMode getFitMode() {
        return fitMode;
    }

    /**
     * Sets the value of the fitMode property.
     * 
     * @param value
     *     allowed object is
     *     {@link FitMode }
     *     
     */
    public void setFitMode(FitMode value) {
        this.fitMode = value;
    }

    /**
     * Gets the value of the format property.
     * 
     * @return
     *     possible object is
     *     {@link OutputFormat }
     *     
     */
    public OutputFormat getFormat() {
        return format;
    }

    /**
     * Sets the value of the format property.
     * 
     * @param value
     *     allowed object is
     *     {@link OutputFormat }
     *     
     */
    public void setFormat(OutputFormat value) {
        this.format = value;
    }

    /**
     * Gets the value of the rotation property.
     * 
     * @return
     *     possible object is
     *     {@link RotationStop }
     *     
     */
    public RotationStop getRotation() {
        return rotation;
    }

    /**
     * Sets the value of the rotation property.
     * 
     * @param value
     *     allowed object is
     *     {@link RotationStop }
     *     
     */
    public void setRotation(RotationStop value) {
        this.rotation = value;
    }

    /**
     * Gets the value of the scaleFactor property.
     * 
     */
    public int getScaleFactor() {
        return scaleFactor;
    }

    /**
     * Sets the value of the scaleFactor property.
     * 
     */
    public void setScaleFactor(int value) {
        this.scaleFactor = value;
    }

    /**
     * Gets the value of the pageNumber property.
     * 
     */
    public int getPageNumber() {
        return pageNumber;
    }

    /**
     * Sets the value of the pageNumber property.
     * 
     */
    public void setPageNumber(int value) {
        this.pageNumber = value;
    }

    /**
     * Gets the value of the withAnnotations property.
     * 
     */
    public boolean isWithAnnotations() {
        return withAnnotations;
    }

    /**
     * Sets the value of the withAnnotations property.
     * 
     */
    public void setWithAnnotations(boolean value) {
        this.withAnnotations = value;
    }

    /**
     * Gets the value of the boundRect property.
     * 
     * @return
     *     possible object is
     *     {@link RenderBoundRect }
     *     
     */
    public RenderBoundRect getBoundRect() {
        return boundRect;
    }

    /**
     * Sets the value of the boundRect property.
     * 
     * @param value
     *     allowed object is
     *     {@link RenderBoundRect }
     *     
     */
    public void setBoundRect(RenderBoundRect value) {
        this.boundRect = value;
    }

}
