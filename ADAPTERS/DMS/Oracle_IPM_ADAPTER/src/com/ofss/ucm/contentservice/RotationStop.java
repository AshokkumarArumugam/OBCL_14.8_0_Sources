
package com.ofss.ucm.contentservice;

import javax.xml.bind.annotation.XmlEnum;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for rotationStop.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * <p>
 * <pre>
 * &lt;simpleType name="rotationStop">
 *   &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
 *     &lt;enumeration value="ZERO"/>
 *     &lt;enumeration value="NINETY"/>
 *     &lt;enumeration value="ONE_EIGHTY"/>
 *     &lt;enumeration value="TWO_SEVENTY"/>
 *   &lt;/restriction>
 * &lt;/simpleType>
 * </pre>
 * 
 */
@XmlType(name = "rotationStop")
@XmlEnum
public enum RotationStop {

    ZERO,
    NINETY,
    ONE_EIGHTY,
    TWO_SEVENTY;

    public String value() {
        return name();
    }

    public static RotationStop fromValue(String v) {
        return valueOf(v);
    }

}
