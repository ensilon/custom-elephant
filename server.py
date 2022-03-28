#!/usr/bin/env python3

import asyncio
import websockets
import JSON
from pprint import pprint

async def hello(websocket, path):
    input = await websocket.recv()
    try:
        payload = JSON.loads(input)
    catch(Exception as e):
        print("omgfbbqwtf??")
        continue
    
    pprint(payload)


    greeting = { what: "i am a robot" }
    await websocket.send(JSON.dumps(greeting))
    print("> {}".format(greeting))

start_server = websockets.serve(hello, 'localhost', 8765)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()


