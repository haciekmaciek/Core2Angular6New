using Angular4.DBContext;
using Angular4.Models;
using System;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Net.Http;
using System.Web.Http;

namespace Angular4.Controllers
{
    [RoutePrefix("api/UserAPI")]
    public class UserAPIController : BaseAPIController
    {
        
        public IHttpActionResult Get()
        {
            try
            {
                return Ok(UserDB.Users.AsEnumerable());
            }
            catch(Exception ex)
            {
                return InternalServerError(ex);
            }
        }
        [Route("SearchAll")]
        [ActionName("SearchAll")]
        public IHttpActionResult GetByFirstLastName(string lastName, string firstName)
        {
            try
            {
                UserModel userModel = new UserModel();
                var userList = UserDB.Users.Where(m => (String.IsNullOrEmpty(lastName) || m.LastName.Contains(lastName)) && (String.IsNullOrEmpty(firstName) || m.FirstName.Contains(firstName))).AsEnumerable();
                return Ok(userList);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
        [Route("Search")]
        [ActionName("Search")]
        public IHttpActionResult GetByName(string lastName, string firstName, int skip, int top, bool count, string orderBy=null)
        {
            try
            {
                UserModel userModel = new UserModel();
                var userList = UserDB.Users.Where(m => (String.IsNullOrEmpty(lastName) || m.LastName.Contains(lastName)) && (String.IsNullOrEmpty(firstName) || m.FirstName.Contains(firstName)));            
                GetColumnName2(orderBy, ref userList);
                var dane = userList.Skip(skip).Take(top).AsEnumerable();
                userModel.Users = dane;
                userModel.UsersCount = GetByNameCount(lastName,firstName);
                return Ok(userModel);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
        private void GetColumnName(string orderBy, ref IQueryable<User> data)
        {
            if (orderBy != null)
            {
                string[] columnSort = orderBy.Split(' ');
                if (columnSort.Count() > 0)
                {
                    switch (columnSort[0])
                    {
                        case "FirstName": data = columnSort.Count() > 1 ? data.OrderByDescending(m => m.FirstName) : data.OrderBy(m => m.FirstName); break;
                        case "LastName": data = columnSort.Count() > 1 ? data.OrderByDescending(m => m.LastName) : data.OrderBy(m => m.LastName); break;
                        case "Gender": data = columnSort.Count() > 1 ? data.OrderByDescending(m => m.Gender) : data.OrderBy(m => m.Gender); break;
                        default: data = columnSort.Count() > 1 ? data.OrderByDescending(m => m.LastName) : data.OrderBy(m => m.LastName); break;
                    }
                }
            }
            else
            {
                data = data.OrderBy(m => m.FirstName);
            }
        }
        private void GetColumnName2(string orderBy, ref IQueryable<User> data)
        {
            if (orderBy != null)
            {
                string[] columnSort = orderBy.Split(' ');
                if (columnSort.Count() > 0)
                {
                    Expression<Func<User, Object>> orderByExpression = null;
                    switch (columnSort[0])
                    {
                        case "FirstName": orderByExpression = m=>m.FirstName; break;
                        case "LastName": orderByExpression = m => m.LastName; break;
                        case "Gender": orderByExpression = m => m.Gender;  break;
                        default: orderByExpression = m => m.LastName;  break;
                    }
                    data = columnSort.Count() > 1 ? data.OrderByDescending(orderByExpression) : data.OrderBy(orderByExpression);
                }
            }
            else
            {
                data = data.OrderBy(m => m.LastName);
            }
        }
        public int GetByNameCount(string lastName, string firstName)
       {
                return UserDB.Users.Where(m => (String.IsNullOrEmpty(lastName) || m.LastName.Contains(lastName)) && (String.IsNullOrEmpty(firstName) || m.FirstName.Contains(firstName))).Count();
        }
        public IHttpActionResult Post([FromBody]User value)
        {
            UserDB.Users.Add(value);             
            return Ok(UserDB.SaveChanges());
        }

        public IHttpActionResult Put(int id, [FromBody]User value)
        {
            UserDB.Entry(value).State = EntityState.Modified;
            return Ok(UserDB.SaveChanges());
        }
        public IHttpActionResult Delete(int id)
        {
            UserDB.Users.Remove(UserDB.Users.FirstOrDefault(x => x.Id == id));
            return Ok(UserDB.SaveChanges());
        }
    }
}
