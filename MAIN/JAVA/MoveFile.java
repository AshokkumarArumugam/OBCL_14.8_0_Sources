CREATE OR REPLACE AND COMPILE JAVA SOURCE NAMED "MoveFile" AS
/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright © 2009 - 2013  Oracle and/or its affiliates.  All rights reserved.
** 												
** No part of this work may be reproduced, stored in a retrieval system,
** adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise,
** translated in any language or computer language,
** without the prior written permission of Oracle and/or its affiliates.
** 
** 
** Oracle Financial Services Software Limited.
** Oracle Park, Off Western Express Highway,
** Goregaon (East),
** Mumbai - 400 063, India.
------------------------------------------------------------------------------------------
*/
/*
  -------------------------------------------------------------------------------------------------------
  CHANGE HISTORY
  
  Changed By         :  VENKATAB
  Change Description :  20-FEB-2009 18:31:43
  
  -------------------------------------------------------------------------------------------------------
  */import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.zip.CRC32;
import java.util.zip.Adler32;
import java.util.zip.CheckedInputStream;

public class MoveFile {

 /**
 * This Method Uses CRC32 Alogrithm to calculate CRC Value for the given absolute file path  
 * @param filepath
 * @return
 * @throws IOException
 */
  
 public static String createChecksum(String filepath) throws IOException {
		  int bufferSize = 4 * 1024;
       File file=new File(filepath);
		 InputStream in = new FileInputStream(file);
		CRC32 checksum = new CRC32();
		checksum.reset();
		byte[] buffer = new byte[bufferSize];
		int bytesRead;
		while ((bytesRead = in.read(buffer)) >= 0) {
			checksum.update(buffer, 0, bytesRead);
		}
		in.close();
	 	return  Long.toHexString(checksum.getValue()); 
		
	}
  
 	/**
	 * This Method Uses Adler32 Alogrithm to calculate CRC Value for the given absolute file path 
	 * @param absFilePath
	 * @return
	 */ 
public static String createAdlerChecksum(String absFilePath)  {
   String chksum=null;
	    try{
			      FileInputStream fis = null;
			      CheckedInputStream cis = null;
			      Adler32 adler = null;
			      long sizeOfFile = 0;
				      try{
					        fis = new FileInputStream(absFilePath);  
					        adler = new Adler32();
					        cis = new CheckedInputStream(fis, adler);
					        sizeOfFile = new File(absFilePath).length();
				       }
				      catch (Exception e){
					        return "File Not Found";
				      }
	      byte[] buffer = new byte[1024];
	      while(cis.read(buffer)>=0){
			        Long checksum = cis.getChecksum().getValue();
			        chksum = checksum.toString();
	        return chksum;
	      }
	    }
	    catch(IOException e){
	      return "IO Exception Raised..";
	    }
		return chksum;
	  }
	
  
  
};
/
