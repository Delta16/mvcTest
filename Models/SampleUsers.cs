using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;

namespace MvcCoreDesign.Models
{
    public class SampleUsers : DropCreateDatabaseIfModelChanges<UserEntities>
    {
        protected override void Seed(UserEntities context)
        {
            var users = new List<UserAccount>
            {
                new UserAccount{UserName = "user1", 
                                Password="pass1", 
                                FirstName="John", 
                                LastName="Doe", 
                                Email="john.doe@gmail.com",
                                IsAdmin= false},

                new UserAccount{UserName = "admin", 
                                Password="pass", 
                                FirstName="Kate", 
                                LastName="Smith", 
                                Email="kate.smith@gmail.com",
                                IsAdmin= true}
            };
            users.ForEach(u => context.Users.Add(u));
        }
    }
}