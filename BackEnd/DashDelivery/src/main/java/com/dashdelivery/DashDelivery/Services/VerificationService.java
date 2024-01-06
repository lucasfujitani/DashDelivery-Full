package com.dashdelivery.DashDelivery.Services;


import com.dashdelivery.DashDelivery.Models.Verificacao;
import com.dashdelivery.DashDelivery.Repositories.VerificacaoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class VerificationService {


    @Autowired
    private JavaMailSender mailSender;


    @Autowired
    private VerificacaoRepositorio verificacaoRepositorio;


    public void sendVerificationCode(String email) {
        String code = generateVerificationCode();

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Seu Código de Verificação");
        message.setText("Código de Verificação: " + code);
        mailSender.send(message);

        Verificacao verificacao = new Verificacao();
        verificacao.setEmail(email);
        verificacao.setCodigo(code);
        verificacaoRepositorio.save(verificacao);

    }


    public boolean validateVerificationCode(String email, String codigo) {
        List<Verificacao> verificacoes = verificacaoRepositorio.findByEmail(email);

        if (verificacoes.isEmpty()) {

            return false;
        }


        Verificacao verificacaoMaisRecente = verificacoes.stream()
                .filter(v -> v.getTimestamp() != null)
                .max(Comparator.comparing(Verificacao::getTimestamp))
                .orElse(null);

        if (verificacaoMaisRecente != null && verificacaoMaisRecente.getCodigo().equals(codigo)) {
            // Opcional: invalidar o código após a verificação
            return true;
        }
        return false;
    }



    private String generateVerificationCode() {
        return Integer.toString(new Random().nextInt(899999) + 100000);
    }
}

