using formulario.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace formulario.Repository
{
    public class PeliculasRepository : IPeliculasRepository
    {
        public Pelicula Create(Pelicula pelicula)
        {
            return ApplicationDbContext.applicationDbContext.Peliculas.Add(pelicula);
        }

        public Pelicula Get(long id)
        {
            return ApplicationDbContext.applicationDbContext.Peliculas.Find(id);
        }

        public IQueryable<Pelicula> Get()
        {
            IList<Pelicula> lista = new List<Pelicula>(ApplicationDbContext.applicationDbContext.Peliculas);

            return lista.AsQueryable();
        }


        public void Put(Pelicula pelicula)
        {
            if (ApplicationDbContext.applicationDbContext.Peliculas.Count(e => e.Id == pelicula.Id) == 0)
            {
                throw new NoEncontradoException("No he encontrado la entidad");
            }
            ApplicationDbContext.applicationDbContext.Entry(pelicula).State = EntityState.Modified;
        }

        public Pelicula Delete(long id)
        {
            Pelicula pelicula = ApplicationDbContext.applicationDbContext.Peliculas.Find(id);
            if (pelicula == null)
            {
                throw new NoEncontradoException("No he encontrado la entidad");
            }

            ApplicationDbContext.applicationDbContext.Peliculas.Remove(pelicula);
            return pelicula;
        }
    }
}