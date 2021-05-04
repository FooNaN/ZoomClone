from flask import Flask, request, make_response
from uuid import uuid4
app = Flask(__name__)

@app.route("/api/main/create_room", methods=["POST"])
def create_room():
    """
    Create room and connect the user who created it

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

    json = request.get_json()
    user_id = json["user_id"]
    room_id = uuid4() # generate random room id
    # do room creation here
    response = make_response({"room_id": room_id, "status": 0}, 200)
    response.mimetype = "application/json"
    return response

@app.route("/api/main/connect_user", methods=["POST"])
def connect_user():
    """
    Connect user to specified room

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

    json = request.get_json()
    user_id = json["user_id"]
    room_id = json["user_id"]
    # do user connection here
    response = make_response({"status": 0}, 200)
    response.mimetype = "application/json"
    return response

if __name__ == "__main__":
    app.run()
