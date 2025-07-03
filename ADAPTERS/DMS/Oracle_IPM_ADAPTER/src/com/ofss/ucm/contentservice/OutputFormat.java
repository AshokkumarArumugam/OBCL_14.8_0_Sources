
package com.ofss.ucm.contentservice;

import javax.xml.bind.annotation.XmlEnum;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for outputFormat.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * <p>
 * <pre>
 * &lt;simpleType name="outputFormat">
 *   &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
 *     &lt;enumeration value="NATIVE"/>
 *     &lt;enumeration value="GIF"/>
 *     &lt;enumeration value="JPEG"/>
 *     &lt;enumeration value="PNG"/>
 *     &lt;enumeration value="TIFF"/>
 *   &lt;/restriction>
 * &lt;/simpleType>
 * </pre>
 * 
 */
@XmlType(name = "outputFormat")
@XmlEnum
public enum OutputFormat {

    NATIVE,
    GIF,
    JPEG,
    PNG,
    TIFF;

    public String value() {
        return name();
    }

    public static OutputFormat fromValue(String v) {
        return valueOf(v);
    }

}
