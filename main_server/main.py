from flask import Flask, request
from uuid import uuid4
app = Flask(__name__)

@app.route("/create_room", methods=["POST"])
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
        status: <int>
    }
    """

    json = request.get_json()
    user_id = json["user_id"]
    room_id = uuid4() # generate random room id
    # do room creation here
    return {"room_id": room_id, "status": 0}

@app.route("/connect_user", methods=["POST"])
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
        status: <int>
    }
    """

    json = request.get_json()
    user_id = json["user_id"]
    room_id = json["user_id"]
    # do user connection here
    return {"status": 0}

if __name__ == "__main__":
    app.run()
