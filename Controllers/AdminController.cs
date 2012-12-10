using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MvcCoreDesign.Models;

namespace MvcCoreDesign.Controllers
{
    public class AdminController : Controller
    {
        private UserEntities db = new UserEntities();

        //
        // GET: /Admin/
        public ViewResult Index()
        {
            return View(db.Users.ToList());
        }

        //
        // GET: /Admin/Details/5

        public ViewResult Details(int id)
        {
            UserAccount useraccount = db.Users.Find(id);
            return View(useraccount);
        }

        //
        // GET: /Admin/Create

        public ActionResult Create()
        {
            return View();
        } 

        //
        // POST: /Admin/Create

        [HttpPost]
        public ActionResult Create(UserAccount useraccount)
        {
            if (ModelState.IsValid)
            {
                db.Users.Add(useraccount);
                db.SaveChanges();
                return RedirectToAction("Index");  
            }

            return View(useraccount);
        }
        
        //
        // GET: /Admin/Edit/5
 
        public ActionResult Edit(int id)
        {
            UserAccount useraccount = db.Users.Find(id);
            return View(useraccount);
        }

        //
        // POST: /Admin/Edit/5

        [HttpPost]
        public ActionResult Edit(UserAccount useraccount)
        {
            if (ModelState.IsValid)
            {
                db.Entry(useraccount).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(useraccount);
        }

        //
        // GET: /Admin/Delete/5
 
        public ActionResult Delete(int id)
        {
            UserAccount useraccount = db.Users.Find(id);
            return View(useraccount);
        }

        //
        // POST: /Admin/Delete/5

        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteConfirmed(int id)
        {            
            UserAccount useraccount = db.Users.Find(id);
            db.Users.Remove(useraccount);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}