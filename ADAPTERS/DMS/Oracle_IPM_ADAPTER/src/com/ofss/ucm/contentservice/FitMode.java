
package com.ofss.ucm.contentservice;

import javax.xml.bind.annotation.XmlEnum;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for fitMode.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * <p>
 * <pre>
 * &lt;simpleType name="fitMode">
 *   &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
 *     &lt;enumeration value="FITBEST"/>
 *     &lt;enumeration value="FITHEIGHT"/>
 *     &lt;enumeration value="FITWIDTH"/>
 *     &lt;enumeration value="FITSCALE"/>
 *   &lt;/restriction>
 * &lt;/simpleType>
 * </pre>
 * 
 */
@XmlType(name = "fitMode")
@XmlEnum
public enum FitMode {

    FITBEST,
    FITHEIGHT,
    FITWIDTH,
    FITSCALE;

    public String value() {
        return name();
    }

    public static FitMode fromValue(String v) {
        return valueOf(v);
    }

}
