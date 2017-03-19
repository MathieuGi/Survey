/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package sendsurvey;

import java.io.IOException;
import java.util.UUID;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.mail.MessagingException;

/**
 *
 * @author mathgira
 */
public class SendSurvey {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) throws IOException, MessagingException {
        try {
            HttpRequests.testGet();
        } catch (Exception ex) {
            Logger.getLogger(SendSurvey.class.getName()).log(Level.SEVERE, null, ex);
        }
        ContactList contacts = new ContactList();
        contacts.readContactList();
        contacts.generateTokens();
        System.out.println(contacts.contactsList.size());
        
        for(int i = 1; i < contacts.contactsList.size(); i++){
            //SendEmail.sendEmail(contacts.contactsList.get(i));
            CrunchifyJavaMailExample.generateAndSendEmail(contacts.contactsList.get(i));
            //HttpRequests.addUser(contacts.contactsList.get(i));
        }
        
    }
    
}
