using System;
using System.ComponentModel.DataAnnotations;

namespace Angular7AspNetCore.Dtos
{
    public class InvestmentDto
    {
        public int Id { get; set; }

        [Required]
        public string InvestmentCode { get; set; }

        [Required]
        public string InvestmentName { get; set; }

        [Required]
        public string Market { get; set; }

        [Required]
        public string Currency { get; set; }

        [Required]
        public decimal Price { get; set; }

        [Required]
        public DateTime PriceUpdatedUtc { get; set; }
    }
}
