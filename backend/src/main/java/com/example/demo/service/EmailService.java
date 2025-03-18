package com.example.demo.service;

import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import org.sprinframework.beans.factory.annotation.Value;
import org.sprinframework.stereotype.Service;

@Service
public class EmailService {

    @Value("$(spring.sendgrid.api-key)")
    private String apiKey;

    public void sendEmail(String toEmail, String subject, String content) {
        Email from = new Email("sendotp@example.com");
        Email to = new Email(toEmail);
        Content contentObj = new Content("text/plain", content);
        Mail mail = new Mail(from, subject, to, contentObj);
        SendGrid sg = SendGrid(apiKey);
        Request request = new Request();
        try {
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());
            sg.api(request);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
}
