using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WorldAround.Domain.Models;

public class CommentModel
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public DateTime CreateDate { get; set; }
    public string Text { get; set; }
}