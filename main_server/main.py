from flask import Flask, request
from uuid import uuid4
app = Flask(__name__)

@app.route("/create_room", methods=["POST"])
def create_room():
    """
    Create room and connect the user who created it

    Input JSON structure:
    {
        peer_id: <string>
    }
    output JSON structure:
    {
        room_id: <string>
        status: <int>
    }
    """

    json = request.get_json()
    peer_id = json["peer_id"]
    room_id = uuid4() # generate random room id
    # do room creation here
    return {"room_id": room_id, "status": 0}

@app.route("/connect_peer", methods=["POST"])
def connect_peer():
    """
    Connect user to specified room

    Input JSON structure:
    {
        peer_id: <string>
        room_id: <string>
    }
    Output JSON strucrure
    {
        status: <int>
    }
    """

    json = request.get_json()
    peer_id = json["peer_id"]
    room_id = json["peer_id"]
    # do peer connection here
    return {"status": 0}

if __name__ == "__main__":
    app.run()
