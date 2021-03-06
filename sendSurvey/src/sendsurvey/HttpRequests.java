/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package sendsurvey;

import java.net.*;
import java.io.*;
import java.util.List;
import javax.net.ssl.HttpsURLConnection;
import org.json.simple.JSONObject;

/**
 *
 * @author mathgira
 */
public class HttpRequests {

    public static void testGet() throws Exception {
        URL oracle = new URL("http://localhost:3000/api/survey/azerty2/survey");
        BufferedReader in = new BufferedReader(
                new InputStreamReader(oracle.openStream()));

        String inputLine;
        while ((inputLine = in.readLine()) != null) {
            System.out.println(inputLine);
        }
        in.close();
    }

    public static void addUser(List<String> user) throws ProtocolException, MalformedURLException, IOException {
        String url = "http://localhost:3000/admin/create-user";
        String charset = "UTF-8"; 
        String param1 = user.get(2);
        String param2 = user.get(3);

        HttpURLConnection connection = (HttpURLConnection) new URL(url).openConnection();
        connection.setDoOutput(true); // Triggers POST.
        connection.setRequestMethod("POST");
        connection.setRequestProperty("Accept-Charset", charset);
        connection.setRequestProperty("Content-Type", "application/json;charset=UTF-8");
        
        connection.connect();

        // surveyId fixé, à revoir pour qu'il soit sélectionné 
        JSONObject obj = new JSONObject();
        obj.put("email", param1);
        obj.put("token", param2);
        obj.put("surveyId", 1);
        
        try (OutputStream output = connection.getOutputStream()) {
            OutputStreamWriter osw = new OutputStreamWriter(output, charset);
            osw.write(obj.toString());
            osw.flush();
            osw.close();
        }
        
        
        connection.getInputStream();
        
    }

}
