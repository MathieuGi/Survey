/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package sendsurvey;

import java.util.*;
import javax.mail.*;
import javax.mail.internet.*;
import javax.activation.*;

public class SendEmail {

   public static void sendEmail(List<String> contactInfos) {    
      // Recipient's email ID needs to be mentioned.
      String to = contactInfos.get(2);

      // Sender's email ID needs to be mentioned
      String from = "math.girardon@gmail.com";

      // Assuming you are sending email from localhost
      String host = "localhost";

      // Get system properties
      Properties properties = System.getProperties();

      // Setup mail server
      properties.setProperty("smtp.gmail.com", host);

      // Get the default Session object.
      Session session = Session.getDefaultInstance(properties);

      try {
         // Create a default MimeMessage object.
         MimeMessage message = new MimeMessage(session);

         // Set From: header field of the header.
         message.setFrom(new InternetAddress(from));

         // Set To: header field of the header.
         message.addRecipient(Message.RecipientType.TO, new InternetAddress(to));

         // Set Subject: header field
         message.setSubject("This is a test for the dad's project");

         // Now set the actual message
         message.setText("This is actual message for " + contactInfos.get(0) + " " + contactInfos.get(1) + " thank you to follow this link : http://localhost:2000/survey/" + contactInfos.get(3));

         // Send message
         Transport.send(message);
         System.out.println("Sent message successfully....");
      }catch (MessagingException mex) {
         mex.printStackTrace();
      }
   }
}