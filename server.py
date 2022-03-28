#!/usr/bin/env python3

import asyncio
import websockets
import json
from pprint import pprint

async def hello(websocket, path):
    input = await websocket.recv()
    try:
        payload = JSON.loads(input)
    except Exception as e:
        print("omgfbbqwtf??")
        return
    
    pprint(payload)
    if payload["type"] == "update":
        payload["type"] = "ack";

    await websocket.send(JSON.dumps(payload))
    print("> {}".format(payload))

if __name__ == "__main__":
    port = 8765
    print("starting server on port {}".format(port))
    start_server = websockets.serve(hello, 'localhost', port)
    asyncio.get_event_loop().run_until_complete(start_server)
    asyncio.get_event_loop().run_forever()


