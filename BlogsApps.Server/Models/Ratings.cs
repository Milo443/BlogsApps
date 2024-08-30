using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BlogsApps.Server.Models
{
    public class Ratings
    {
        //ID
        [Key]
        public int RatingId { get; set; }

        //Value
        [Required]
        public int Value { get; set; }

        //Author is user ID
        public int UserId { get; set; }
        [ForeignKey("UserId")]
        public Users? Users { get; set; }

        //Post ID
        public int PostId { get; set; }
        [ForeignKey("PostId")]
        public Posts? Posts { get; set; }

        //PubDate
        [DataType(DataType.Date)]
        public required DateOnly PubDate { get; set; }

    }

    
}
