using System.ComponentModel.DataAnnotations;

namespace Angular7AspNetCore.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
