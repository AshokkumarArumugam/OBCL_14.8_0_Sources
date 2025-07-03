
package com.ofss.ucm.contentservice;

import javax.xml.bind.annotation.XmlEnum;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for renditionOutput.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * <p>
 * <pre>
 * &lt;simpleType name="renditionOutput">
 *   &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
 *     &lt;enumeration value="TIFF"/>
 *     &lt;enumeration value="ORIGINALORTIFF"/>
 *   &lt;/restriction>
 * &lt;/simpleType>
 * </pre>
 * 
 */
@XmlType(name = "renditionOutput")
@XmlEnum
public enum RenditionOutput {

    TIFF,
    ORIGINALORTIFF;

    public String value() {
        return name();
    }

    public static RenditionOutput fromValue(String v) {
        return valueOf(v);
    }

}
