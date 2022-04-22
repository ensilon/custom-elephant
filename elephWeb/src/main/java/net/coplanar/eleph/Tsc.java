package net.coplanar.eleph;

import javax.websocket.CloseReason;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;
import java.util.List;

import net.coplanar.beanz.TsCellz;
import net.coplanar.ents.TsCell;

import javax.ejb.EJB;

/**
 * Servlet implementation class Tsc
 */
@ServerEndpoint("/Tsc")
public class Tsc  {
       
	@EJB(lookup="java:app/eleph-brain/TsCellz!net.coplanar.beanz.TsCellz") TsCellz tscell;
	
    @OnMessage
    public String sayHello(String name) {
        System.out.println("Say hello to '" + name + "'");
        List<TsCell> mylist = tscell.getAllTsCells();
        return (name);
    }

    @OnOpen
    public void helloOnOpen(Session session) {
        System.out.println("WebSocket opened: " + session.getId());
    }

    @OnClose
    public void helloOnClose(CloseReason reason) {
        System.out.println("WebSocket connection closed with CloseCode: " + reason.getCloseCode());
    }

}
