using System.Collections.Generic;

namespace Crispy.Models.Accounts
{
    public class AddToRole
    {
        public string Id { get; set; }
        public IEnumerable<string> Roles { get; set; }
    }
}
