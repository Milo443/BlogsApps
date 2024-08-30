using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BlogsApps.Server.Models
{
    public class Posts
    {
        //ID
        [Key]
        public int PostId { get; set; }

        //Title
        [Column(TypeName = "nvarchar(100)")]
        public required string Title { get; set; }

        //Content
        [Column(TypeName = "nvarchar(1200)")]
        public required string Content { get; set; }

        //Author is user ID
        public int UserId { get; set; }
        [ForeignKey("UserId")]
        public Users? Users { get; set; }


        //Status
        [Column(TypeName = "nvarchar(100)")]
        public required string Status { get; set; }

        //PubDate
        [DataType(DataType.Date)]
        public required DateOnly PubDate { get; set; }

    }
}
