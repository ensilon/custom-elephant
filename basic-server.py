#!/usr/bin/env python3

from bottle import Bottle, route, static_file, run


app = Bottle()
 
@app.route('/hello')
def hello():
    return "Hello World!"

@route('/static/<path:path>')
def callback(path):
    return static_file(path, "/home/martin/src/custom-elephant/static")

if __name__ == "__main__":
     run(app, host='localhost', port=8090)
