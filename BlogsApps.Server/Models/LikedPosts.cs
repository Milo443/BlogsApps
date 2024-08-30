using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BlogsApps.Server.Models
{
    public class LikedPosts
    {
        //ID
        [Key]
        public int LikedPostId { get; set; }

        //Author is user ID
        public int UserId { get; set; }
        [ForeignKey("UserId")]
        public Users? Users { get; set; }

        //Post ID
        public int PostId { get; set; }
        [ForeignKey("PostId")]
        public Posts? Posts { get; set; }
    }
}
