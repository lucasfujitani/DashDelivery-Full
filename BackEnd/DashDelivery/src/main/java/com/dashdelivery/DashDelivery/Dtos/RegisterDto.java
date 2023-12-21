package com.dashdelivery.DashDelivery.Dtos;

import com.dashdelivery.DashDelivery.Enum.UserRole;
import jakarta.validation.constraints.NotNull;

public record RegisterDto(@NotNull String email, @NotNull String password, @NotNull UserRole role ) {
}
