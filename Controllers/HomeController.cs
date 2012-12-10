using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MvcCoreDesign.Models;

namespace MvcCoreDesign.Controllers
{
    public class HomeController : Controller
    {
        UserEntities db = new UserEntities();
        //
        // GET: /Home/

        public ActionResult Index()
        {
            ViewBag.PageID = "Home";
            return View();
        }

        //
        // GET: /Home/About

        public ActionResult About()
        {
            ViewBag.PageID = "About";
            return View();
        }

        //
        // GET: /Home/Clients

        public ActionResult Clients()
        {
            ViewBag.PageID = "Clients";
            return View();
        }

        //
        // GET: /Home/Services

        public ActionResult Services()
        {
            ViewBag.PageID = "Services";
            return View();
        }

        //
        // GET: /Home/Contact

        public ActionResult Contact()
        {
            ViewBag.PageID = "Contact";
            return View();
        }

        //
        // GET: /Home/Account
        public ActionResult Account()
        {
            ViewBag.PageID = "Account";
            return View();

        }

        [HttpPost]
        public ActionResult Account(UserAccount useraccount)
        {

            UserAccount user = db.Users.Where(u => u.UserName == useraccount.UserName 
                && u.Password == useraccount.Password).SingleOrDefault();
            if (user != null)
            {
                Session["Name"] = user.FirstName + " " + user.LastName;
                Session["LoggedIn"] = true;
                //return View();
                if (user.IsAdmin == true)
                {
                    return RedirectToAction("Index", "Admin");
                }
                else
                {
                    return RedirectToAction("Index", "Home");
                }
            }
            else
            {
                return View(useraccount);
            }
        }

        public ActionResult LogOut()
        {
            Session.Abandon();
            return RedirectToAction("Index", "Home");
        }

             
    }
}
