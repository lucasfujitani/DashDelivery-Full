package com.dashdelivery.DashDelivery.Controllers;


import com.dashdelivery.DashDelivery.Dtos.VerificacaoDto;
import com.dashdelivery.DashDelivery.Models.Verificacao;
import com.dashdelivery.DashDelivery.Services.VerificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
@RestController
@RequestMapping("verification")
@CrossOrigin(origins = "*")
public class VerificationController {

    @Autowired
    private VerificationService verificationService;

    @PostMapping("/send-code")
    public ResponseEntity<?> sendCode(@RequestBody Verificacao verificacao) {
        verificationService.sendVerificationCode(verificacao.getEmail());
        return ResponseEntity.ok("Código enviado para " + verificacao.getEmail());
    }

    @PostMapping("/validate-code")
    public ResponseEntity<?> validateCode(@RequestBody VerificacaoDto verificationDto) {
        boolean isValid = verificationService.validateVerificationCode(
                verificationDto.getEmail(),
                verificationDto.getCodigo()
        );

        if (isValid) {
            return ResponseEntity.ok("Código validado com sucesso!");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Código de verificação inválido.");
        }
    }
}

