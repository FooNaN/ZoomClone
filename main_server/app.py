from flask import Flask, request, make_response
from flask_cors import cross_origin
import requests as requests_lib
from uuid import uuid4
app = Flask(__name__)

@app.route("/api/main/create_room", methods=["POST"])
@cross_origin()
def create_room():
    """
    API to create room and connect the user who created it

    Input JSON structure:
    {
        user_id: <string>
    }

    Output JSON structure:
    {
        room_id: <string>
        operation_status: <int> [unused]
    }
    """
    # deconstruct request JSON
    user_id = request.get_json()["user_id"]

    # generate random room id
    room_id = str(uuid4())

    app.logger.info("Room " + str(room_id) + " created by user " + str(user_id))

    # make request to signaling server API to create empty room
    requests_lib.post("http://localhost:4000/api/signaling/create_room", json={"room_id": room_id}) # temporary code
    # checking if all is ok should be here

    # make request to signaling server API to add user to it
    requests_lib.post("http://localhost:4000/api/signaling/connect_user", json={"user_id": user_id, "room_id": room_id}) # temporary code
    # checking if all is ok should be here

    # generate response as JSON
    response = make_response({"room_id": room_id, "operation_status": 0}, 200)
    response.mimetype = "application/json"
    return response

@app.route("/api/main/connect_user", methods=["POST"])
@cross_origin()
def connect_user():
    """
    API to connect user to specified room

    Input JSON structure:
    {
        user_id: <string>
        room_id: <string>
    }

    Output JSON structure
    {
        operation_status: <int> [unused]
    }
    """
    # deconstruct request JSON
    user_id = request.get_json()["user_id"]
    room_id = request.get_json()["room_id"]

    app.logger.info("Connect user " + str(user_id) + " to room " + str(room_id))

    # make request to signaling server API to add user to room
    requests_lib.post("http://localhost:4000/api/signaling/connect_user", json={"user_id": user_id, "room_id": room_id}) # temporary code
    # checking if all is ok should be here

    # generate response as JSON
    response = make_response({"operation_status": 0}, 200)
    response.mimetype = "application/json"
    return response

if __name__ == "__main__":
    # server runs at localhost:5000
    app.run(host="0.0.0.0", port=5000, debug=True)
