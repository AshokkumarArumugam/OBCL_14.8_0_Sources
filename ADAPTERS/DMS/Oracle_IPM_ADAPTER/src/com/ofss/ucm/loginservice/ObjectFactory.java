
package com.ofss.ucm.loginservice;

import javax.xml.bind.JAXBElement;
import javax.xml.bind.annotation.XmlElementDecl;
import javax.xml.bind.annotation.XmlRegistry;
import javax.xml.namespace.QName;


/**
 * This object contains factory methods for each 
 * Java content interface and Java element interface 
 * generated in the com.ofss.ucm.loginservice package. 
 * <p>An ObjectFactory allows you to programatically 
 * construct new instances of the Java representation 
 * for XML content. The Java representation of XML 
 * content can consist of schema derived interfaces 
 * and classes representing the binding of schema 
 * type definitions, element declarations and model 
 * groups.  Factory methods for each of these are 
 * provided in this class.
 * 
 */
@XmlRegistry
public class ObjectFactory {

    private final static QName _GetUserRolesResponse_QNAME = new QName("http://imaging.oracle/", "getUserRolesResponse");
    private final static QName _GetUserGroups_QNAME = new QName("http://imaging.oracle/", "getUserGroups");
    private final static QName _GetUserInfoResponse_QNAME = new QName("http://imaging.oracle/", "getUserInfoResponse");
    private final static QName _GetUserInfo_QNAME = new QName("http://imaging.oracle/", "getUserInfo");
    private final static QName _GetUserRoles_QNAME = new QName("http://imaging.oracle/", "getUserRoles");
    private final static QName _Login_QNAME = new QName("http://imaging.oracle/", "login");
    private final static QName _SecurityMember_QNAME = new QName("http://imaging.oracle/", "SecurityMember");
    private final static QName _LoginResponse_QNAME = new QName("http://imaging.oracle/", "loginResponse");
    private final static QName _LogoutResponse_QNAME = new QName("http://imaging.oracle/", "logoutResponse");
    private final static QName _ImagingException_QNAME = new QName("http://imaging.oracle/", "ImagingException");
    private final static QName _Logout_QNAME = new QName("http://imaging.oracle/", "logout");
    private final static QName _GetUserGroupsResponse_QNAME = new QName("http://imaging.oracle/", "getUserGroupsResponse");

    /**
     * Create a new ObjectFactory that can be used to create new instances of schema derived classes for package: com.ofss.ucm.loginservice
     * 
     */
    public ObjectFactory() {
    }

    /**
     * Create an instance of {@link ImagingFaultInfo }
     * 
     */
    public ImagingFaultInfo createImagingFaultInfo() {
        return new ImagingFaultInfo();
    }

    /**
     * Create an instance of {@link SecurityMember }
     * 
     */
    public SecurityMember createSecurityMember() {
        return new SecurityMember();
    }

    /**
     * Create an instance of {@link Logout }
     * 
     */
    public Logout createLogout() {
        return new Logout();
    }

    /**
     * Create an instance of {@link LoginResponse }
     * 
     */
    public LoginResponse createLoginResponse() {
        return new LoginResponse();
    }

    /**
     * Create an instance of {@link LogoutResponse }
     * 
     */
    public LogoutResponse createLogoutResponse() {
        return new LogoutResponse();
    }

    /**
     * Create an instance of {@link GetUserGroupsResponse }
     * 
     */
    public GetUserGroupsResponse createGetUserGroupsResponse() {
        return new GetUserGroupsResponse();
    }

    /**
     * Create an instance of {@link GetUserRolesResponse }
     * 
     */
    public GetUserRolesResponse createGetUserRolesResponse() {
        return new GetUserRolesResponse();
    }

    /**
     * Create an instance of {@link GetUserGroups }
     * 
     */
    public GetUserGroups createGetUserGroups() {
        return new GetUserGroups();
    }

    /**
     * Create an instance of {@link GetUserInfoResponse }
     * 
     */
    public GetUserInfoResponse createGetUserInfoResponse() {
        return new GetUserInfoResponse();
    }

    /**
     * Create an instance of {@link GetUserInfo }
     * 
     */
    public GetUserInfo createGetUserInfo() {
        return new GetUserInfo();
    }

    /**
     * Create an instance of {@link GetUserRoles }
     * 
     */
    public GetUserRoles createGetUserRoles() {
        return new GetUserRoles();
    }

    /**
     * Create an instance of {@link Login }
     * 
     */
    public Login createLogin() {
        return new Login();
    }

    /**
     * Create an instance of {@link ImagingFaultDetail }
     * 
     */
    public ImagingFaultDetail createImagingFaultDetail() {
        return new ImagingFaultDetail();
    }

    /**
     * Create an instance of {@link ImagingFaultInfo.FaultDetails }
     * 
     */
    public ImagingFaultInfo.FaultDetails createImagingFaultInfoFaultDetails() {
        return new ImagingFaultInfo.FaultDetails();
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link GetUserRolesResponse }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "getUserRolesResponse")
    public JAXBElement<GetUserRolesResponse> createGetUserRolesResponse(GetUserRolesResponse value) {
        return new JAXBElement<GetUserRolesResponse>(_GetUserRolesResponse_QNAME, GetUserRolesResponse.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link GetUserGroups }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "getUserGroups")
    public JAXBElement<GetUserGroups> createGetUserGroups(GetUserGroups value) {
        return new JAXBElement<GetUserGroups>(_GetUserGroups_QNAME, GetUserGroups.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link GetUserInfoResponse }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "getUserInfoResponse")
    public JAXBElement<GetUserInfoResponse> createGetUserInfoResponse(GetUserInfoResponse value) {
        return new JAXBElement<GetUserInfoResponse>(_GetUserInfoResponse_QNAME, GetUserInfoResponse.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link GetUserInfo }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "getUserInfo")
    public JAXBElement<GetUserInfo> createGetUserInfo(GetUserInfo value) {
        return new JAXBElement<GetUserInfo>(_GetUserInfo_QNAME, GetUserInfo.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link GetUserRoles }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "getUserRoles")
    public JAXBElement<GetUserRoles> createGetUserRoles(GetUserRoles value) {
        return new JAXBElement<GetUserRoles>(_GetUserRoles_QNAME, GetUserRoles.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link Login }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "login")
    public JAXBElement<Login> createLogin(Login value) {
        return new JAXBElement<Login>(_Login_QNAME, Login.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link SecurityMember }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "SecurityMember")
    public JAXBElement<SecurityMember> createSecurityMember(SecurityMember value) {
        return new JAXBElement<SecurityMember>(_SecurityMember_QNAME, SecurityMember.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link LoginResponse }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "loginResponse")
    public JAXBElement<LoginResponse> createLoginResponse(LoginResponse value) {
        return new JAXBElement<LoginResponse>(_LoginResponse_QNAME, LoginResponse.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link LogoutResponse }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "logoutResponse")
    public JAXBElement<LogoutResponse> createLogoutResponse(LogoutResponse value) {
        return new JAXBElement<LogoutResponse>(_LogoutResponse_QNAME, LogoutResponse.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link ImagingFaultInfo }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "ImagingException")
    public JAXBElement<ImagingFaultInfo> createImagingException(ImagingFaultInfo value) {
        return new JAXBElement<ImagingFaultInfo>(_ImagingException_QNAME, ImagingFaultInfo.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link Logout }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "logout")
    public JAXBElement<Logout> createLogout(Logout value) {
        return new JAXBElement<Logout>(_Logout_QNAME, Logout.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link GetUserGroupsResponse }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://imaging.oracle/", name = "getUserGroupsResponse")
    public JAXBElement<GetUserGroupsResponse> createGetUserGroupsResponse(GetUserGroupsResponse value) {
        return new JAXBElement<GetUserGroupsResponse>(_GetUserGroupsResponse_QNAME, GetUserGroupsResponse.class, null, value);
    }

}
