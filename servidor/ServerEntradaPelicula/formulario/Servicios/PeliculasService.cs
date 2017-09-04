using formulario.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace formulario.Servicios
{
    public class PeliculasService : IPeliculasService
    {
        private IPeliculasRepository peliculasRepository;
        public PeliculasService(IPeliculasRepository _peliculasRepository)
        {
            this.peliculasRepository = _peliculasRepository;
        }

        public Pelicula Get(long id)
        {
            return peliculasRepository.Get(id);
        }

        public IQueryable<Pelicula> Get()
        {
            return peliculasRepository.Get();
        }

        public Pelicula Create(Pelicula pelicula)
        {
            return peliculasRepository.Create(pelicula);
        }

        public void Put(Pelicula pelicula)
        {
            peliculasRepository.Put(pelicula);
        }

        public Pelicula Delete(long id)
        {
            return peliculasRepository.Delete(id);
        }
    }
}