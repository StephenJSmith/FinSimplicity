using Angular7AspNetCore.Dtos;
using Angular7AspNetCore.Models;
using AutoMapper;

namespace Angular7AspNetCore.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Investment, InvestmentDto>();
        }
    }
}
