package net.coplanar.beanz;

import javax.ejb.Stateless;
//import javax.ejb.LocalBean;
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
    public TsCell getTsCell(int id ) {
    	TypedQuery<TsCell> query = em.createQuery(
                "SELECT tsc FROM TsCell tsc WHERE id = :id", TsCell.class);
    	query.setParameter("id", id);

    	List<TsCell> resultList = query.getResultList();

        if (resultList.isEmpty() || resultList.size() == 0) {
            return null;
        } else {
            return resultList.get(0);
        }
    }
}