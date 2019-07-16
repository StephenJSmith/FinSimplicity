using System;

namespace Angular7AspNetCore.Helpers
{
    public class InvestmentParams
    {
        private const int MaxPageSize = 50;

        public int PageNumber { get; set; } = 1;

        private int _pageSize = 20;
        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = Math.Min(value, MaxPageSize);
        }

        public string InvestmentCode { get; set; }
        public string Market { get; set; }
        public string Currency { get; set; }
        public string OrderBy { get; set; }
    }
}