package net.coplanar.beanz;

import javax.ejb.Stateless;
import javax.ejb.LocalBean;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import net.coplanar.ents.TsCell;

@Stateless
public class TsCellz {
    // Injected database connection:
    @PersistenceContext private EntityManager em;
 
    // Stores a new guest:
    public void persist(TsCell tscell) {
        em.persist(tscell);
    }

    // Retrieves all the guests:
    public List<TsCell> getAllTsCells() {
        TypedQuery<TsCell> query = em.createQuery(
            "SELECT tsc FROM TsCell tsc ORDER BY tsc.id", TsCell.class);
        return query.getResultList();
    }
}