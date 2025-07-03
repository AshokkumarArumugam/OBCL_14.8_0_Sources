import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;



import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathFactory;

import org.w3c.dom.Document;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;


public class GWChngPOSSState {
    public GWChngPOSSState() {
    }

    public static void main(String[] args) {
    try
    {

        String fileloc,curstate,newstate;

  
            
        System.out.println("Enter the server state xml location");
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

                  
        fileloc=br.readLine();
        System.out.println("Enter the current state");
        curstate=br.readLine();
        System.out.println("Enter the new state");
        newstate=br.readLine();
        
                    
                
        Document doc = DocumentBuilderFactory.newInstance()
                .newDocumentBuilder().parse(new InputSource(fileloc));
                

           XPath xpath = XPathFactory.newInstance().newXPath();
           NodeList nodes = (NodeList)xpath.evaluate
               ("//State/Server", doc, XPathConstants.NODESET);
               
              if ( nodes.item(0).getTextContent().equalsIgnoreCase(curstate)&& newstate.equals("S")||newstate.equals("R")||newstate.equals("A") )
              {
                nodes.item(0).setTextContent(newstate);
              }
              else {
                  nodes.item(0).setTextContent("A");
              }




           Transformer xformer = TransformerFactory.newInstance().newTransformer();
           xformer.transform
               (new DOMSource(doc), new StreamResult(new File(fileloc)));


                
                

        
            
        
        
    }
    catch(Exception e) {
        System.out.println(e);
    }
    }
}
