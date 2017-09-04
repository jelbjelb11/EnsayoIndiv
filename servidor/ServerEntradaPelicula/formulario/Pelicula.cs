using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace formulario
{
    public class Pelicula
    {
        public long Id { get; set; }
        public string Titulo { get; set; }
        public int Duracion { get; set; }
        public string Idioma { get; set; }
        public bool tresD { get; set; }
    }
}