using System.Threading.Tasks;
using Angular7AspNetCore.Helpers;
using Angular7AspNetCore.Models;

namespace Angular7AspNetCore.Data
{
    public interface IInvestmentsRepository
    {
        Task<PagedList<Investment>> GetInvestments(InvestmentParams investmentParams);
        Task<Investment> GetInvestment(int id);
    }
}
