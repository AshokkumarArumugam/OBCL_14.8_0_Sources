
package com.ofss.ucm.contentservice;

import javax.xml.bind.annotation.XmlEnum;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for imagingFaultType.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * <p>
 * <pre>
 * &lt;simpleType name="imagingFaultType">
 *   &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
 *     &lt;enumeration value="SYSTEM"/>
 *     &lt;enumeration value="USAGE"/>
 *     &lt;enumeration value="SECURITY"/>
 *     &lt;enumeration value="DATABASE"/>
 *   &lt;/restriction>
 * &lt;/simpleType>
 * </pre>
 * 
 */
@XmlType(name = "imagingFaultType")
@XmlEnum
public enum ImagingFaultType {

    SYSTEM,
    USAGE,
    SECURITY,
    DATABASE;

    public String value() {
        return name();
    }

    public static ImagingFaultType fromValue(String v) {
        return valueOf(v);
    }

}
