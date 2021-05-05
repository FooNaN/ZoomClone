from flask import Flask, request, make_response
import requests as requests_lib
from uuid import uuid4
app = Flask(__name__)

@app.route("/api/main/create_room", methods=["POST"])
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
        status: <int> [unused]
    }
    """
    # deconstruct request JSON
    user_id = request.get_json()["user_id"]

    # generate random room id
    room_id = uuid4()

    # make request to signaling server API
    signaling_response = requests_lib.post("localhost:3000/api/signaling/create_room", json={"room_id": room_id}) # temporary code
    if (signaling_response.json()["status"] == 1):
        # if room with this id exists (very unlikely)
        # temporary code
        response = make_response({"room_id": "", "status": 1}, status=200)
        response.mimetype = "application/json"
        return response

    # generate response as JSON
    response = make_response({"room_id": room_id, "status": 0}, status=200)
    response.mimetype = "application/json"
    return response

@app.route("/api/main/connect_user", methods=["POST"])
def connect_user():
    """
    API to connect user to specified room

    Input JSON structure:
    {
        user_id: <string>
        room_id: <string>
    }

    Output JSON strucrure
    {
        status: <int> [unused]
    }
    """
    # deconstruct request JSON
    user_id = request.get_json()["user_id"]
    room_id = request.get_json()["room_id"]

    # do user connection here

    # generate response as JSON
    response = make_response({"status": 0}, status=200)
    response.mimetype = "application/json"
    return response

if __name__ == "__main__":
    app.run()
