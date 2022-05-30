﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WorldAround.Domain.Entities;

namespace WorldAround.Infrastructure.Configuration;

public class ParticipantPermissionConfiguration : IEntityTypeConfiguration<ParticipantPermission>
{
    public void Configure(EntityTypeBuilder<ParticipantPermission> entity)
    {
        entity.HasKey(x => x.Id);

        entity.Property(x => x.Name)
            .HasMaxLength(30);

        entity.Property(x => x.Descripsion)
            .HasMaxLength(250);
    }
}