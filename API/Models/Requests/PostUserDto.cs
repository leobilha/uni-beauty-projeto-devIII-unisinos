using System.ComponentModel.DataAnnotations;

namespace API.Models.Requests
{
    public class PostUserDto
    {
        [Required(ErrorMessage = "O nome é obrigatório.")]
        public string Name { get; set; }

        [Required(ErrorMessage = "O e-mail é obrigatório.")]
        [EmailAddress(ErrorMessage = "E-mail inválido.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "A senha é obrigatória.")]
        public string Password { get; set; }

        [Required(ErrorMessage = "O documento é obrigatório.")]
        [StringLength(14, ErrorMessage = "O documento pode ter no máximo 14 caracteres.")]
        public string Document { get; set; }

        [Required(ErrorMessage = "O tipo é obrigatório.")]
        public string Type { get; set; }
    }
}
