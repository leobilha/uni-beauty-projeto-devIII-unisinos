using System;
using System.Linq;
using System.Linq.Expressions;

namespace API.Data.Repository
{
    public interface IGenericRepository<TEntity> where TEntity : class
    {
        /// <summary>
        /// Recupera uma determinada entidade com os relacionamentos informados.
        /// </summary>
        /// <param name="filter"></param>
        /// <param name="includeProperties"></param>
        /// <returns></returns>
        Task<TEntity?> GetAsync(Expression<Func<TEntity, bool>>? filter = null,
            params Expression<Func<TEntity, object>>[]? includes);

        /// <summary>
        /// Adiciona uma determinada entidade.
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        Task<TEntity> AddAsync(TEntity entity);

        /// <summary>
        /// Atualiza uma determinada entidade.
        /// </summary>
        /// <param name="entity"></param>
        Task<TEntity> UpdateAsync(TEntity entity);

        /// <summary>
        /// Remove uma determinada entidade.
        /// </summary>
        /// <param name="entity"></param>
        Task DeleteAsync(TEntity entity);

        /// <summary>
        /// Recupera uma coleção de entidades conforme o predicado informado e com os relacionamentos informados.
        /// </summary>
        /// <param name="filter"></param>
        /// <param name="orderBy"></param>
        /// <param name="includes"></param>
        /// <returns></returns>
        Task<IQueryable<TEntity>> GetAllAsync(Expression<Func<TEntity, bool>>? filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>>? orderBy = null, params Expression<Func<TEntity, object>>[]? includes);

        /// <summary>
        /// Totaliza o total de entidades conforme o predicado informado.
        /// </summary>
        /// <param name="filter"></param>
        /// <returns></returns>
        Task<int> CountAsync(Expression<Func<TEntity, bool>>? filter = null);
        Task<int> NextValueAsync<TModel>(string fieldName, Expression<Func<TModel, bool>>? filter = null) where TModel : class;
    }
}