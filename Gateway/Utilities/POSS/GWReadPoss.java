package com.iflex.fcubs.gw.ejb;


import java.sql.*;

import oracle.jdbc.OracleCallableStatement;
import java.io.*;



public class GWReadPoss {
    public GWReadPoss() {
    }

    static final String JDBC_DRIVER = "oracle.jdbc.OracleDriver";
    static final String JDBC_DRIVER = "oracle.jdbc.OracleDriver";
	    static final String DB_URL = "jdbc:oracle:thin:@10.184.74.141:1521:STANDBY";
	    static final String DB_URL_POSS = "jdbc:oracle:thin:@10.184.74.141:1521:KERPOSS1";

	       //  Database credentials
	    static final String USER = "FCUBSPOSS111";
	    static final String PASS = "FCUBSPOSS111";

	    static final String USER_POSS = "FCUBSPOSS111";
	    static final String PASS_POSS = "FCUBSPOSS111";


    public static void main(String[] args) {

        GWReadPoss redposs=new GWReadPoss();

        redposs.replay();

    }

    public void replay() {

       try
       {
        DataInputStream dis=new DataInputStream(System.in);
        InputStreamReader ir=new InputStreamReader(dis);

        BufferedReader br=new BufferedReader(ir);
        System.out.println("hei");
        //String s=br.readLine();
        //System.out.println("hei"+s);
       }
       catch(Exception e) {
           System.out.println(e);
       }

        Connection conn = null;
        Connection conn_poss = null;
        String l_storedProcedureName1 = "pr_write_to_host";
        OracleCallableStatement stmt = null;
       /* String l_storedProcedureName2 = "GWPKS_POSS.writeToHost";
        */
        PreparedStatement l_ps,l_ps1 = null;
        ResultSet l_rs,l_rs1 =null;

        String GET_POSS = "select * from gwtb_poss_log where replaycomplete='N' and replayreqd ='Y'";

        try{
             //STEP 2: Register JDBC driver
             Class.forName("oracle.jdbc.OracleDriver");

             //STEP 3: Open a connection
             System.out.println("Connecting to database...");
             conn = DriverManager.getConnection(DB_URL,USER,PASS);

            conn_poss = DriverManager.getConnection(DB_URL_POSS,USER_POSS,PASS_POSS);

             //STEP 4: Execute a query
             System.out.println("Creating statement...");

             l_ps=conn.prepareCall(GET_POSS);
              l_rs= l_ps.executeQuery();
              while(l_rs.next()){
                  String SequenceNumber =  l_rs.getString(1);
                  String Source =  l_rs.getString(2);
                  String Service =  l_rs.getString(3);
                  String Operation =  l_rs.getString(4);
                  String Req =  l_rs.getString(5);
                  String Instrxml =  l_rs.getString(6);
                  String resprecieved =  l_rs.getString(7);
                  String REPLAYREQD =  l_rs.getString(8);
                  String error =  l_rs.getString(9);
                  String errorcode =  l_rs.getString(10);
                  String errordesc =  l_rs.getString(11);
                  String oraclescn =  l_rs.getString(12);
                  String REPLAYCOMPLETE =  l_rs.getString(13);
                  String REF_NO_LIST =  l_rs.getString(14);
                  String USER_ID =  l_rs.getString(15);
                  String BRANCH =  l_rs.getString(16);

                  System.out.println("SequenceNumber"+SequenceNumber);
                  System.out.println("Before");
                  String updateString1 = "update gwtb_poss_log set replaycomplete = 'Y' where SEQUENCENUMBER = '"+SequenceNumber+"'";
                  Statement stmt1;
                  stmt1 = conn.createStatement();

                  System.out.println("after"+updateString1);
                                          stmt1.executeUpdate(updateString1);
                  stmt1.close();
                  System.out.println("after");

                  stmt =(OracleCallableStatement)conn_poss.prepareCall("{call " + l_storedProcedureName1 + "(?,?,?,?,?,?,?,?,?,?,?)}");
                  stmt.setString(1,SequenceNumber);
                  stmt.setString(2,Source);
                  stmt.setString(3,Service);
                  stmt.setString(4,Operation);
                  stmt.setString(5,Req);
                  stmt.setString(6,Instrxml);
                  stmt.setString(7,resprecieved);
                  stmt.setString(8,REPLAYREQD);
                  //stmt.setString(9,error);
                  //stmt.setString(10,errorcode);
                  //stmt.setString(11,errordesc);
                  //stmt.setString(12,REPLAYCOMPLETE);
                  stmt.setString(9,REF_NO_LIST);
                  stmt.setString(10,USER_ID);
                  stmt.setString(11,BRANCH);

                  stmt.executeUpdate();

                  stmt.close();




              }

             conn.close();
             conn_poss.close();

          }catch(SQLException se){

             //se.printStackTrace();
          }catch(Exception e){

             //e.printStackTrace();
          }finally{


             try{
                if(conn!=null)
                   conn.close();
                 conn_poss.close();
             }catch(SQLException se){
                //se.printStackTrace();
             }
          }
          System.out.println("Goodbye!");
    }
}