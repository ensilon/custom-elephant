package net.coplanar.eleph;

import java.io.IOException;

import javax.websocket.EncodeException;
import javax.websocket.CloseReason;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;
import java.util.List;
import javax.json.JsonObjectBuilder;
import javax.json.JsonObject;
//import javax.json.JsonArray;
import javax.json.Json;

import net.coplanar.beanz.TsCellz;
import net.coplanar.ents.TsCell;

import javax.ejb.EJB;

/**
 * Servlet implementation class Tsc
 */
@ServerEndpoint(value = "/Tsc",
    encoders= { MessageEncoder.class },
    decoders= { MessageDecoder.class }
)
public class Tsc  {
       
	@EJB(lookup="java:app/eleph-brain/TsCellz!net.coplanar.beanz.TsCellz") TsCellz tscell;
	
    @OnMessage
    public void dispatch(Message message, Session session) throws IOException, EncodeException {
        //System.out.println("Say hello to '" + name + "'");
    	switch (message.getType()) {
    	case "cell-list":
    		this.cellList(session);
    		break;
    	case "cell-update":
    		this.cellUpdate(message.getPayload());
    		break;
    	default:
    		System.out.println("dispatch: unknown message type");
    	}
        return;
    }

    private void cellList(Session session) throws IOException, EncodeException {
    	Message response = new Message();
    	response.setType("cell-list");
    	    	
        List<TsCell> mylist = tscell.getAllTsCells();
        StringBuffer sb = new StringBuffer();
        for (TsCell acell : mylist ) {
            JsonObjectBuilder builder = Json.createObjectBuilder();

        	sb.append(acell.getId() + " ");
        	builder.add("cellid", acell.getId());
        	JsonObject cellJson = builder.build();
 
        	response.setPayload(cellJson);
        
        	session.getBasicRemote().sendObject(response);
        }
    	System.out.println("cell list:" + sb.toString());
    }
    
    private void cellUpdate(JsonObject obj) {
    	
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
