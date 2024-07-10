using API.Data.Repository;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace API.Data.Base
{
    public abstract class AbstractRepository<TEntity> : IGenericRepository<TEntity> where TEntity : class
    {
        protected readonly DbContext DbContext;

        protected AbstractRepository(DbContext context)
        {
            DbContext = context;
        }

        public virtual void SetState(TEntity entity, EntityState state)
        {
            DbContext.Entry(entity).State = state;
        }

        public virtual Task<TEntity?> GetAsync(Expression<Func<TEntity, bool>>? filter = null, params Expression<Func<TEntity, object>>[]? includes)
        {
            IQueryable<TEntity> query = DbContext.Set<TEntity>();

            if (includes != null)
                foreach (Expression<Func<TEntity, object>> include in includes)
                    query = query.Include(include);

            if (filter != null)
                query = query.Where(filter);

            return query.FirstOrDefaultAsync();
        }

        public virtual async Task<TEntity> AddAsync(TEntity entity)
        {
            SetState(entity, EntityState.Added);
            await DbContext.SaveChangesAsync();
            SetState(entity, EntityState.Detached);// remove a referência do contexto para evitar problemas.

            return entity;
        }

        public virtual async Task<TEntity> UpdateAsync(TEntity entity)
        {
            SetState(entity, EntityState.Modified);
            await DbContext.SaveChangesAsync();
            SetState(entity, EntityState.Detached);// remove a referência do contexto para evitar problemas.
            return entity;
        }

        public virtual async Task DeleteAsync(TEntity entity)
        {
            SetState(entity, EntityState.Deleted);// remove a referência do contexto para evitar problemas.
            DbContext.Set<TEntity>().Remove(entity);
            await DbContext.SaveChangesAsync();
        }

        public virtual Task<IQueryable<TEntity>> GetAllAsync(Expression<Func<TEntity, bool>>? filter = null, Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>>?
            orderBy = null,
            params Expression<Func<TEntity, object>>[]? includes)
        {
            IQueryable<TEntity> query = DbContext.Set<TEntity>();

            if (includes != null)
                foreach (Expression<Func<TEntity, object>> include in includes)
                    query = query.Include(include);

            if (filter != null)
                query = query.Where(filter);

            if (orderBy != null)
                query = orderBy(query);

            return Task.FromResult(query);
        }

        public virtual Task<int> CountAsync(Expression<Func<TEntity, bool>>? filter)
        {
            return filter != null ? DbContext.Set<TEntity>().Where(filter).CountAsync() : DbContext.Set<TEntity>().CountAsync();
        }

        public virtual async Task<int> NextValueAsync<TModel>(string fieldName, Expression<Func<TModel, bool>>? filter = null)
        where TModel : class
        {
            var entityType = this.DbContext.Model.FindEntityType(typeof(TModel));

            if (entityType == null)
            {
                throw new InvalidOperationException($"Entity type {typeof(TModel)} not found in the DbContext model.");
            }

            var query = filter != null ? this.DbContext.Set<TModel>().Where(filter).AsQueryable() : this.DbContext.Set<TModel>().AsQueryable();

            int? maxFieldValue = await query.MaxAsync(entity => EF.Property<int?>(entity, fieldName));

            return maxFieldValue.HasValue ? maxFieldValue.Value + 1 : 1;
        }
    }
}
