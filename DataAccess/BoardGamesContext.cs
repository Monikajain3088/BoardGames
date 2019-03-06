using DataAccess.DataModel;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccessr
{
    public partial class BoardGamesContext : DbContext
    {
        public BoardGamesContext()
        {
        }

        public BoardGamesContext(DbContextOptions<BoardGamesContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Game> Game { get; set; }
        public virtual DbSet<User> User { get; set; }
        public virtual DbSet<Visitor> Visitor { get; set; }
        public virtual DbSet<VisitorGamesRating> VisitorGamesRating { get; set; }
        public virtual DbSet<GameVisitorRaingDetailsSP> GameVisitorRaingDetailsSP { get; set; }
        public virtual DbSet<GamesRatingDetailsSP> GamesRatingDetailsSP { get; set; }
        

        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    if (!optionsBuilder.IsConfigured)
        //    {
        //        optionsBuilder.UseSqlServer("Server=tcp:aspnetcoretest.database.windows.net,1433;Initial Catalog=BoardGames;Persist Security Info=False;User ID=Admin_Monika;Password=ILoveYou2;MultipleActiveResultSets=true;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
        //    }
        //}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.2-servicing-10034");

            modelBuilder.Entity<Game>(entity =>
            {
                entity.Property(e => e.CreatedBy)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.GameName)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.EmailId)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.LoginId)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(100);
            });

            modelBuilder.Entity<Visitor>(entity =>
            {
                entity.Property(e => e.EmailId)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.Fname)
                    .IsRequired()
                    .HasColumnName("FName")
                    .HasMaxLength(100);

                entity.Property(e => e.Lname)
                    .HasColumnName("LName")
                    .HasMaxLength(100);
            });

            modelBuilder.Entity<VisitorGamesRating>(entity =>
            {
                entity.HasKey(e => e.VisitorRatingId);

                entity.Property(e => e.ModifiedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.HasOne(d => d.Game)
                    .WithMany(p => p.VisitorGamesRating)
                    .HasForeignKey(d => d.GameId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_VisitorGamesRating_Game");

                entity.HasOne(d => d.Visitor)
                    .WithMany(p => p.VisitorGamesRating)
                    .HasForeignKey(d => d.VisitorId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_VisitorGamesRating_Visitor");
            });
        }
    }
}
