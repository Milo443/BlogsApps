using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BlogsApps.Server.Models
{
    public class Comments
    {
        //ID
        [Key]
        public int ComentsId { get; set; }

        //Content
        [Column(TypeName = "nvarchar(100)")]
        public required string Content { get; set; }

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
        public DateOnly PubDate { get; set; }

    }
}
