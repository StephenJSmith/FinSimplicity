using System.Collections.Generic;
using System.Threading.Tasks;
using Angular7AspNetCore.Data;
using Angular7AspNetCore.Dtos;
using Angular7AspNetCore.Helpers;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Angular7AspNetCore.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class InvestmentsController : ControllerBase
    {
        private readonly IInvestmentsRepository _repo;
        private readonly IMapper _mapper;

        public InvestmentsController(
            IInvestmentsRepository repo,
            IMapper mapper
        )
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetInvestments([FromQuery]InvestmentParams investmentParams)
        {
            var investments = await _repo.GetInvestments(investmentParams);
            var dtoToReturn = _mapper.Map<IEnumerable<InvestmentDto>>(investments);
            Response.AddPagination(investments.CurrentPage, investments.PageSize,
                investments.TotalCount, investments.TotalPages);

            return Ok(dtoToReturn);
        } 

        [HttpGet("{id}")]
        public async Task<IActionResult> GetInvestment(int id)
        {
            var investmentFromRepo = await _repo.GetInvestment(id);
            var dtoToReturn = _mapper.Map<InvestmentDto>(investmentFromRepo);

            return Ok(dtoToReturn);
        }
    }
}
