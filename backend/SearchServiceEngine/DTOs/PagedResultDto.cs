using System.Collections.Generic;

namespace SearchServiceEngine.DTOs
{
    /// <summary>
    /// DTO genérico para resultados paginados.
    /// </summary>
    /// <typeparam name="T">Tipo de los elementos de la página.</typeparam>
    public class PagedResultDto<T>
    {
        /// <summary>
        /// Elementos de la página actual.
        /// </summary>
        public IEnumerable<T> Data { get; set; } = new List<T>();
        /// <summary>
        /// Total de elementos en la consulta.
        /// </summary>
        public int Total { get; set; }
        /// <summary>
        /// Página actual (1-based).
        /// </summary>
        public int Page { get; set; }
        /// <summary>
        /// Tamaño de página.
        /// </summary>
        public int PageSize { get; set; }
        /// <summary>
        /// Total de páginas.
        /// </summary>
        public int TotalPages { get; set; }
        /// <summary>
        /// ¿Hay página siguiente?
        /// </summary>
        public bool HasNextPage { get; set; }
        /// <summary>
        /// ¿Hay página anterior?
        /// </summary>
        public bool HasPreviousPage { get; set; }
    }
}
