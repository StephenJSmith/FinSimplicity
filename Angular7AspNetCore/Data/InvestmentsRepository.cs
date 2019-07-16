using System.Linq;
using System.Threading.Tasks;
using Angular7AspNetCore.Helpers;
using Angular7AspNetCore.Models;
using Microsoft.EntityFrameworkCore;

namespace Angular7AspNetCore.Data
{
    public class InvestmentsRepository : IInvestmentsRepository
    {
        private readonly DataContext _context;

        public InvestmentsRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<PagedList<Investment>> GetInvestments(InvestmentParams investmentParams)
        {
            var investments = _context.Investments
                .OrderBy(i => i.InvestmentCode)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(investmentParams.InvestmentCode))
            {
                investments = investments.Where(i => 
                    i.InvestmentCode.ToLower().StartsWith(investmentParams.InvestmentCode.ToLower()));
            }

            if (!string.IsNullOrWhiteSpace(investmentParams.Market))
            {
                investments = investments.Where(i => 
                    i.Market.ToLower() == investmentParams.Market.ToLower());
            }

            if (!string.IsNullOrWhiteSpace(investmentParams.Currency))
            {
                investments = investments.Where(i => 
                    i.Currency .ToLower() == investmentParams.Currency.ToLower());
            }

            if (!string.IsNullOrWhiteSpace(investmentParams.OrderBy))
            {
                switch (investmentParams.OrderBy)
                {
                    case "price":
                        investments = investments.OrderByDescending(i => i.Price);
                        break;

                    case "updated":
                        investments = investments.OrderByDescending(i => i.PriceUpdatedUtc);
                        break;

                    default:
                        investments = investments.OrderBy(i => i.InvestmentCode);
                        break;
                }
            }

            return await PagedList<Investment>.CreateAsync(
                investments,
                investmentParams.PageNumber,
                investmentParams.PageSize
            );
        }

        public async Task<Investment> GetInvestment(int id)
        {
            var investment = await _context.Investments.FirstOrDefaultAsync(i => i.Id == id);

            return investment;
        }
    }
}
